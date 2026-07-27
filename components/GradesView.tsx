import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Award, CheckCircle2, AlertCircle, Save, 
  Sparkles, FileText, Search, GraduationCap, Star, Info, HelpingHand,
  Printer, Download, Eye, X
} from 'lucide-react';
import { ClassDataMap, TrimestreGrade } from '../types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { safeLocalStorage } from '../utils/storage';

interface GradesViewProps {
  onBack: () => void;
  classData?: ClassDataMap;
  setClassData?: React.Dispatch<React.SetStateAction<ClassDataMap>>;
  onSave?: (newData: ClassDataMap) => void;
}

export const GradesView: React.FC<GradesViewProps> = ({ 
  onBack, 
  classData, 
  setClassData, 
  onSave 
}) => {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(() => {
    return safeLocalStorage.getItem('grades_selectedSchool') || null;
  });
  const [selectedClassId, setSelectedClassId] = useState<string | null>(() => {
    return safeLocalStorage.getItem('grades_selectedClassId') || null;
  });
  const [selectedTrimestre, setSelectedTrimestre] = useState<string>(() => {
    return safeLocalStorage.getItem('grades_selectedTrimestre') || "2";
  });

  useEffect(() => {
    if (selectedSchool) safeLocalStorage.setItem('grades_selectedSchool', selectedSchool);
    else safeLocalStorage.removeItem('grades_selectedSchool');
  }, [selectedSchool]);

  useEffect(() => {
    if (selectedClassId) safeLocalStorage.setItem('grades_selectedClassId', selectedClassId);
    else safeLocalStorage.removeItem('grades_selectedClassId');
  }, [selectedClassId]);

  useEffect(() => {
    if (selectedTrimestre) safeLocalStorage.setItem('grades_selectedTrimestre', selectedTrimestre);
  }, [selectedTrimestre]);
  const [searchTerm, setSearchTerm] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // PDF / Print states
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Sync state between props and local state
  const [localClassData, setLocalClassData] = useState<ClassDataMap>(() => {
    if (classData) return classData;
    const stored = safeLocalStorage.getItem('app_classData');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    if (classData) {
      setLocalClassData(classData);
    }
  }, [classData]);

  const schools = ["EE Cordelia Paiva", "CIEP 198", "CIEP 369", "CIEP 320"];

  // Dynamically resolve classes for the selected school
  const schoolClasses = Object.values(localClassData).filter(
    (cls) => cls.school === selectedSchool
  );

  // Reset selected class when school changes
  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(school);
    setSelectedClassId(null);
  };

  const handleGradeChange = (
    studentId: number, 
    field: keyof TrimestreGrade, 
    valueString: string
  ) => {
    let value: number | undefined = valueString === '' ? undefined : parseFloat(valueString);
    
    // Constraint validation
    if (value !== undefined && !isNaN(value)) {
      if (field === 'participation' && value > 2) value = 2;
      if (field === 'assignment' && value > 3) value = 3;
      if (field === 'exam' && value > 5) value = 5;
      if (field === 'recovery' && value > 10) value = 10;
      if (value < 0) value = 0;
    }

    setLocalClassData(prev => {
      const updated = { ...prev };
      const currentClass = updated[selectedClassId!];
      if (currentClass) {
        currentClass.students = currentClass.students.map(student => {
          if (student.id === studentId) {
            const currentTrimGrades = student.trimestreGrades || {};
            const currentTrim = currentTrimGrades[selectedTrimestre] || {};
            return {
              ...student,
              trimestreGrades: {
                ...currentTrimGrades,
                [selectedTrimestre]: {
                  ...currentTrim,
                  [field]: value
                }
              }
            };
          }
          return student;
        });
      }
      return updated;
    });
  };

  const saveGrades = async () => {
    setIsSaving(true);
    // Write to local storage first
    safeLocalStorage.setItem('app_classData', JSON.stringify(localClassData));
    
    // If setClassData prop is passed, update parent state
    if (setClassData) {
      setClassData(localClassData);
    }
    
    // If onSave callback is passed, update remote Firestore
    if (onSave) {
      try {
        await onSave(localClassData);
      } catch (e) {
        console.error("Firestore sync error:", e);
      }
    }
    
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Pre-fills mock realistic grades for presentation/testing purposes
  const simulateMockGrades = () => {
    if (!selectedClassId) return;

    setLocalClassData(prev => {
      const updated = { ...prev };
      const currentClass = updated[selectedClassId];
      if (currentClass) {
        currentClass.students = currentClass.students.map(student => {
          // Generates a mix of high, average, and a few students needing recovery
          const rand = Math.random();
          let part = 0;
          let trab = 0;
          let exam = 0;
          let rec: number | undefined = undefined;

          if (rand > 0.3) {
            // Passing students
            part = parseFloat((1.0 + Math.random() * 1.0).toFixed(1)); // 1.0 to 2.0
            trab = parseFloat((1.5 + Math.random() * 1.5).toFixed(1)); // 1.5 to 3.0
            exam = parseFloat((2.5 + Math.random() * 2.5).toFixed(1)); // 2.5 to 5.0
          } else {
            // Students initially failing, needing recovery
            part = parseFloat((0.5 + Math.random() * 0.8).toFixed(1)); // 0.5 to 1.3
            trab = parseFloat((0.8 + Math.random() * 1.0).toFixed(1)); // 0.8 to 1.8
            exam = parseFloat((1.0 + Math.random() * 1.5).toFixed(1)); // 1.0 to 2.5
            
            // 60% chance they did the recovery and passed
            if (Math.random() > 0.4) {
              rec = parseFloat((5.5 + Math.random() * 3.5).toFixed(1)); // 5.5 to 9.0
            }
          }

          const currentTrimGrades = student.trimestreGrades || {};
          return {
            ...student,
            trimestreGrades: {
              ...currentTrimGrades,
              [selectedTrimestre]: {
                participation: part,
                assignment: trab,
                exam: exam,
                recovery: rec
              }
            }
          };
        });
      }
      return updated;
    });
  };

  // Calculate statistics for the active class/quarter
  const getStatistics = () => {
    if (!selectedClassId) return { total: 0, approved: 0, recovery: 0, classAverage: 0 };
    const currentClass = localClassData[selectedClassId];
    if (!currentClass || !currentClass.students || currentClass.students.length === 0) {
      return { total: 0, approved: 0, recovery: 0, classAverage: 0 };
    }

    const students = currentClass.students;
    let totalGradeSum = 0;
    let approvedCount = 0;
    let recoveryCount = 0;
    let gradedCount = 0;

    students.forEach(student => {
      const grades = student.trimestreGrades?.[selectedTrimestre];
      if (grades) {
        const part = grades.participation || 0;
        const trab = grades.assignment || 0;
        const exam = grades.exam || 0;
        const regTotal = part + trab + exam;
        const finalTotal = grades.recovery !== undefined ? Math.max(regTotal, grades.recovery) : regTotal;

        totalGradeSum += finalTotal;
        gradedCount++;

        if (finalTotal >= 5.0) {
          approvedCount++;
        } else {
          recoveryCount++;
        }
      } else {
        recoveryCount++; // Untouched starts as needing work/recovery visually
      }
    });

    const average = gradedCount > 0 ? totalGradeSum / gradedCount : 0;

    return {
      total: students.length,
      approved: approvedCount,
      recovery: recoveryCount,
      classAverage: parseFloat(average.toFixed(1))
    };
  };

  const stats = getStatistics();

  const currentClassForPrint = selectedClassId ? localClassData[selectedClassId] : null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!printRef.current || !selectedClassId) return;
    setIsGeneratingPdf(true);
    try {
      window.scrollTo(0,0);
      const canvas = await html2canvas(printRef.current, {
        scale: 2.2, // Balance size and quality
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true,
      });
      const imgData = canvas.toDataURL('image/png');
      
      // Landscape A4 (297mm x 210mm)
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const margin = 10;
      const contentWidth = pdfWidth - (2 * margin);
      const contentHeight = (canvas.height * contentWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, Math.min(contentHeight, pdfHeight - (2 * margin)));
      
      const className = currentClassForPrint?.name || 'Turma';
      const trimName = `${selectedTrimestre}o_Trimestre`;
      pdf.save(`Boletim_${className.replace(/\s+/g, '_')}_${trimName}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Houve um erro ao gerar o PDF. Use a opção 'Imprimir / Salvar PDF' e escolha 'Salvar como PDF' na caixa do navegador.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const renderGradesTable = () => {
    if (!selectedClassId) return null;
    const currentClass = localClassData[selectedClassId];
    if (!currentClass) return null;

    const filteredStudents = currentClass.students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(student.id).includes(searchTerm)
    );

    return (
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mt-6">
        {/* Table Top Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="text-emerald-500" size={24} />
              Turma: {currentClass.name} • {selectedTrimestre}º Trimestre
            </h3>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Escola: {currentClass.school}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar aluno..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
              />
            </div>

            {/* Simulated Data */}
            <button
              onClick={simulateMockGrades}
              className="flex items-center gap-1.5 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-xl border border-purple-200 transition-all active:scale-95"
              title="Preenche notas aleatórias para fins de simulação e teste de média/recuperação"
            >
              <Sparkles size={14} /> Simular Notas
            </button>

            {/* Print/PDF Export Button */}
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 transition-all active:scale-95"
              title="Gerar boletim formatado para impressão e exportação em PDF para compartilhar"
            >
              <Printer size={14} /> Gerar PDF / Imprimir
            </button>

            {/* Save Button */}
            <button
              onClick={saveGrades}
              disabled={isSaving}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-black shadow-lg transition-all active:scale-95 ${
                isSaving 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-200'
              }`}
            >
              <Save size={18} /> {isSaving ? 'Salvando...' : 'Salvar Notas'}
            </button>
          </div>
        </div>

        {/* Dynamic Class Info & Rules Alert */}
        <div className="px-6 py-4 border-b border-slate-100 bg-emerald-50/30 flex items-start gap-3">
          <Info className="text-emerald-600 shrink-0 mt-0.5" size={18} />
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            <strong>Regras do Sistema de Notas (SEEDUC-RJ):</strong> Lançamento por trimestre. 
            A nota de <strong className="text-slate-900">Participação vale até 2.0 pts</strong>, o <strong className="text-slate-900">Trabalho vale até 3.0 pts</strong>, e a <strong className="text-slate-900">Prova vale até 5.0 pts</strong>. 
            Se a soma regular for menor que <strong className="text-red-600">5.0 pts</strong>, a nota de <strong className="text-slate-900">Recuperação (máx 10.0 pts)</strong> ficará ativa e substituirá a média final se for maior.
          </p>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-emerald-500 text-white font-bold text-center py-3 text-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} /> Notas salvas e sincronizadas com sucesso com o banco de dados!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-slate-100 divide-x divide-slate-100 bg-white">
          <div className="p-6 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total de Alunos</span>
            <span className="text-3xl font-black text-slate-800">{stats.total}</span>
          </div>
          <div className="p-6 text-center">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block mb-1">Aprovados</span>
            <span className="text-3xl font-black text-emerald-600">{stats.approved}</span>
          </div>
          <div className="p-6 text-center">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">Em Recuperação</span>
            <span className="text-3xl font-black text-red-500">{stats.recovery}</span>
          </div>
          <div className="p-6 text-center">
            <span className="text-xs font-bold text-sky-500 uppercase tracking-wider block mb-1">Média Geral</span>
            <span className="text-3xl font-black text-sky-600">{stats.classAverage}</span>
          </div>
        </div>

        {/* Scrollable Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider text-[11px] font-extrabold select-none">
                <th className="p-4 pl-6">ID</th>
                <th className="p-4">Nome do Aluno</th>
                <th className="p-4 text-center">Participação (Max 2.0)</th>
                <th className="p-4 text-center">Trabalho (Max 3.0)</th>
                <th className="p-4 text-center">Prova (Max 5.0)</th>
                <th className="p-4 text-center bg-slate-100/50">Média Regular</th>
                <th className="p-4 text-center">Recuperação (Max 10.0)</th>
                <th className="p-4 text-center pr-6 bg-slate-100/50">Média Final</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400 font-bold">
                    Nenhum aluno encontrado.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, i) => {
                  const grades = student.trimestreGrades?.[selectedTrimestre] || {};
                  const part = grades.participation ?? '';
                  const trab = grades.assignment ?? '';
                  const exam = grades.exam ?? '';
                  const rec = grades.recovery ?? '';

                  // Calculation logic
                  const pVal = typeof part === 'number' ? part : 0;
                  const tVal = typeof trab === 'number' ? trab : 0;
                  const eVal = typeof exam === 'number' ? exam : 0;
                  const regTotal = pVal + tVal + eVal;
                  
                  const isFailing = regTotal < 5.0;
                  const hasRecovery = typeof rec === 'number';
                  const finalTotal = hasRecovery ? Math.max(regTotal, rec) : regTotal;
                  const isFinalPassing = finalTotal >= 5.0;

                  return (
                    <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-all font-medium text-slate-800 text-sm">
                      <td className="p-4 pl-6 text-xs font-mono text-slate-400">#{student.id}</td>
                      <td className="p-4 font-bold text-slate-900">{student.name}</td>
                      
                      {/* Participation (max 2) */}
                      <td className="p-4 text-center">
                        <input 
                          type="number" 
                          min={0} 
                          max={2} 
                          step={0.1}
                          placeholder="0.0"
                          value={part}
                          onChange={(e) => handleGradeChange(student.id, 'participation', e.target.value)}
                          className="w-16 px-2 py-1 text-center font-bold border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </td>

                      {/* Assignment (max 3) */}
                      <td className="p-4 text-center">
                        <input 
                          type="number" 
                          min={0} 
                          max={3} 
                          step={0.1}
                          placeholder="0.0"
                          value={trab}
                          onChange={(e) => handleGradeChange(student.id, 'assignment', e.target.value)}
                          className="w-16 px-2 py-1 text-center font-bold border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </td>

                      {/* Exam (max 5) */}
                      <td className="p-4 text-center">
                        <input 
                          type="number" 
                          min={0} 
                          max={5} 
                          step={0.1}
                          placeholder="0.0"
                          value={exam}
                          onChange={(e) => handleGradeChange(student.id, 'exam', e.target.value)}
                          className="w-16 px-2 py-1 text-center font-bold border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </td>

                      {/* Regular sum */}
                      <td className="p-4 text-center bg-slate-100/30">
                        <span className={`text-base font-black ${isFailing ? 'text-red-500' : 'text-emerald-600'}`}>
                          {regTotal.toFixed(1)}
                        </span>
                      </td>

                      {/* Recovery (max 10) */}
                      <td className="p-4 text-center">
                        <input 
                          type="number" 
                          min={0} 
                          max={10} 
                          step={0.1}
                          placeholder="-"
                          value={rec}
                          disabled={!isFailing && !hasRecovery}
                          onChange={(e) => handleGradeChange(student.id, 'recovery', e.target.value)}
                          className={`w-16 px-2 py-1 text-center font-bold border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                            isFailing 
                              ? 'border-red-300 bg-red-50 text-red-700 animate-pulse' 
                              : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                          }`}
                        />
                      </td>

                      {/* Final Average */}
                      <td className="p-4 text-center bg-slate-100/30 pr-6">
                        <div className="flex flex-col items-center justify-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-black shadow-sm ${
                            isFinalPassing
                              ? hasRecovery 
                                ? 'bg-teal-100 text-teal-800 border border-teal-200' 
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-red-100 text-red-800 border border-red-200'
                          }`}>
                            {finalTotal.toFixed(1)}
                          </span>
                          
                          {/* Mini badges */}
                          {hasRecovery && isFinalPassing && (
                            <span className="text-[9px] font-extrabold text-teal-600 uppercase mt-1">Recuperado</span>
                          )}
                          {!isFinalPassing && isFailing && (
                            <span className="text-[9px] font-extrabold text-red-500 uppercase mt-1">Reprovado</span>
                          )}
                          {!hasRecovery && isFailing && (
                            <span className="text-[9px] font-extrabold text-amber-500 uppercase mt-1">Abaixo da Média</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 font-sans bg-slate-50 min-h-screen">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 self-start transition-all active:scale-95"
        >
          <ChevronLeft size={20} /> Voltar
        </button>

        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Portal de Gestão do Professor</p>
          <h2 className="text-[10px] font-black text-emerald-600 tracking-wider uppercase mt-0.5">SEEDUC-RJ • Resolução Nº 6392/2025</h2>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
          <Award className="text-emerald-600" size={32} />
          Central de Notas
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Gerenciamento e lançamento oficial de notas escolares por trimestre, com sistema integrado de recuperação automática.
        </p>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. School Selector */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            1. Selecione a Escola
          </h2>
          <div className="space-y-2">
            {schools.map(school => (
              <button
                key={school}
                onClick={() => handleSchoolSelect(school)}
                className={`w-full text-left p-4 rounded-xl font-bold text-sm border flex items-center justify-between transition-all ${
                  selectedSchool === school 
                    ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 shadow-md shadow-emerald-50' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
                }`}
              >
                {school}
                {selectedSchool === school && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Class Selector */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            2. Selecione a Turma Correta
          </h2>
          {!selectedSchool ? (
            <div className="h-[230px] flex flex-col items-center justify-center text-center text-slate-400 p-4">
              <AlertCircle size={28} className="mb-2 text-slate-300" />
              <p className="text-xs font-bold uppercase">Aguardando Seleção de Escola</p>
            </div>
          ) : schoolClasses.length === 0 ? (
            <div className="h-[230px] flex flex-col items-center justify-center text-center text-slate-400 p-4">
              <AlertCircle size={28} className="mb-2 text-slate-300" />
              <p className="text-xs font-bold uppercase">Nenhuma turma cadastrada</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {schoolClasses.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`w-full text-left p-4 rounded-xl font-bold text-sm border flex items-center justify-between transition-all ${
                    selectedClassId === cls.id 
                      ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 shadow-md shadow-emerald-50' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div>
                    <p className="font-extrabold text-sm text-slate-800">{cls.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Série: {cls.grade}º Ano</p>
                  </div>
                  {selectedClassId === cls.id && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Quarter Selector */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            3. Selecione o Trimestre
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: "1", label: "1º Trimestre", info: "05/02 a 18/05 (66 dias letivos)" },
              { id: "2", label: "2º Trimestre", info: "19/05 a 04/09 (67 dias letivos)" },
              { id: "3", label: "3º Trimestre", info: "08/09 a 22/12 (73 dias letivos)" }
            ].map(trim => (
              <button
                key={trim.id}
                onClick={() => setSelectedTrimestre(trim.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  selectedTrimestre === trim.id 
                    ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 shadow-md shadow-emerald-50' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
                }`}
              >
                <p className="font-extrabold text-sm">{trim.label}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5">{trim.info}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grades Table Screen */}
      <div>
        {renderGradesTable()}
      </div>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden !important;
          }
          #print-area-container, #print-area-container * {
            visibility: visible !important;
          }
          #print-area-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}} />

      {/* Print Modal Overlay */}
      <AnimatePresence>
        {isPrintModalOpen && currentClassForPrint && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 print:hidden">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="flex flex-col h-full w-full max-w-5xl bg-slate-100 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Toolbar */}
              <div className="bg-[#f4ece0] text-slate-800 p-4 flex justify-between items-center shadow-md border-b border-slate-300 shrink-0 select-none">
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-tight font-sans flex items-center gap-2 text-slate-800">
                    <FileText className="text-blue-700" size={20} />
                    Exportar / Imprimir Boletim de Notas
                  </h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Resolução SEEDUC-RJ Nº 6392/2025 • A4 Paisagem</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition active:scale-95 disabled:opacity-50"
                  >
                    <Download size={14} />
                    {isGeneratingPdf ? 'Gerando...' : 'Baixar PDF'}
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition active:scale-95"
                  >
                    <Printer size={14} />
                    Imprimir / Salvar PDF
                  </button>
                  <button 
                    onClick={() => setIsPrintModalOpen(false)}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Page View Container */}
              <div className="flex-1 overflow-auto bg-slate-800/80 p-6 flex justify-start md:justify-center items-start">
                
                {/* The Document (A4 Landscape aspect, 297mm x 210mm on screen) */}
                <div 
                  ref={printRef}
                  id="print-area-container"
                  className="bg-white shadow-2xl shrink-0 text-slate-900 border border-slate-300 rounded-sm font-sans"
                  style={{ width: '297mm', minHeight: '210mm', padding: '15mm', boxSizing: 'border-box' }}
                >
                  {/* Official Header */}
                  <div className="border-b-4 border-slate-950 pb-4 mb-6 flex justify-between items-center">
                    <div>
                      <h1 className="font-black text-sm uppercase text-slate-950 tracking-tight leading-none">Governo do Estado do Rio de Janeiro</h1>
                      <h2 className="font-bold text-[10px] uppercase text-slate-600 mt-1">Secretaria de Estado de Educação</h2>
                    </div>
                    <div className="text-right">
                      <span className="inline-block border-2 border-slate-950 px-3 py-1 font-black text-[9px] uppercase text-slate-950">
                        Resolução SEEDUC Nº 6392/2025
                      </span>
                    </div>
                  </div>

                  {/* Document Title */}
                  <div className="text-center mb-6 bg-slate-50 border border-slate-200 p-3 rounded-lg">
                    <h3 className="font-black text-base uppercase text-slate-950 tracking-tight">
                      Boletim de Rendimento Escolar - 2026
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Ensino Regular • Controle Trimestral de Notas</p>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-6 text-[10px] border border-slate-200 p-3 rounded-lg bg-slate-50/40">
                    <div><strong>Escola:</strong> {currentClassForPrint.school}</div>
                    <div><strong>Turma:</strong> {currentClassForPrint.name}</div>
                    <div><strong>Trimestre:</strong> {selectedTrimestre}º Trimestre</div>
                    <div><strong>Componente Curricular:</strong> Educação Física</div>
                    <div><strong>Professor Regente:</strong> André Brito</div>
                    <div><strong>Total Alunos:</strong> {stats.total}</div>
                    <div><strong>Aprovados:</strong> {stats.approved}</div>
                    <div><strong>Média Geral da Turma:</strong> {stats.classAverage}</div>
                  </div>

                  {/* Table */}
                  <div className="overflow-hidden border border-slate-300 rounded">
                    <table className="w-full text-left border-collapse text-[10px]">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 uppercase text-[9px] font-bold">
                          <th className="p-2 border-r border-slate-300 w-8 text-center">Nº</th>
                          <th className="p-2 border-r border-slate-300 w-16 text-center">ID</th>
                          <th className="p-2 border-r border-slate-300">Nome do Aluno</th>
                          <th className="p-2 border-r border-slate-300 text-center w-24">Part. (Max 2.0)</th>
                          <th className="p-2 border-r border-slate-300 text-center w-24">Trab. (Max 3.0)</th>
                          <th className="p-2 border-r border-slate-300 text-center w-24">Prov. (Max 5.0)</th>
                          <th className="p-2 border-r border-slate-300 text-center w-24 bg-slate-50">Média Reg.</th>
                          <th className="p-2 border-r border-slate-300 text-center w-24">Rec. (Max 10.0)</th>
                          <th className="p-2 border-r border-slate-300 text-center w-24 bg-slate-50">Média Final</th>
                          <th className="p-2 text-center w-24">Situação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentClassForPrint.students.map((student, idx) => {
                          const grades = student.trimestreGrades?.[selectedTrimestre] || {};
                          const part = grades.participation ?? 0;
                          const trab = grades.assignment ?? 0;
                          const exam = grades.exam ?? 0;
                          const rec = grades.recovery;

                          const regTotal = part + trab + exam;
                          const hasRecovery = rec !== undefined;
                          const finalTotal = hasRecovery ? Math.max(regTotal, rec) : regTotal;
                          const isApproved = finalTotal >= 5.0;

                          return (
                            <tr key={student.id} className="border-b border-slate-200 hover:bg-slate-50 font-medium text-slate-800">
                              <td className="p-2 border-r border-slate-300 text-center font-bold">{idx + 1}</td>
                              <td className="p-2 border-r border-slate-300 text-center font-mono text-slate-500">#{student.id}</td>
                              <td className="p-2 border-r border-slate-300 font-bold text-slate-900">{student.name}</td>
                              <td className="p-2 border-r border-slate-300 text-center">{part.toFixed(1)}</td>
                              <td className="p-2 border-r border-slate-300 text-center">{trab.toFixed(1)}</td>
                              <td className="p-2 border-r border-slate-300 text-center">{exam.toFixed(1)}</td>
                              <td className="p-2 border-r border-slate-300 text-center bg-slate-50 font-bold">
                                {regTotal.toFixed(1)}
                              </td>
                              <td className="p-2 border-r border-slate-300 text-center">
                                {hasRecovery ? rec.toFixed(1) : '-'}
                              </td>
                              <td className="p-2 border-r border-slate-300 text-center bg-slate-50 font-black text-slate-900">
                                {finalTotal.toFixed(1)}
                              </td>
                              <td className="p-2 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                  isApproved 
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                    : 'bg-red-100 text-red-800 border border-red-200'
                                }`}>
                                  {isApproved ? 'Aprovado' : 'Reprovado'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Signatures */}
                  <div className="grid grid-cols-2 gap-16 mt-16 text-center text-[10px]">
                    <div>
                      <div className="border-t border-slate-400 w-56 mx-auto pt-1"></div>
                      <p className="font-bold uppercase text-slate-800">Prof. André Brito</p>
                      <p className="text-slate-500">CREF 039443 G/RJ</p>
                    </div>
                    <div>
                      <div className="border-t border-slate-400 w-56 mx-auto pt-1"></div>
                      <p className="font-bold uppercase text-slate-800">Assinatura da Direção</p>
                      <p className="text-slate-500">{currentClassForPrint.school} • SEEDUC-RJ</p>
                    </div>
                  </div>

                  {/* Footer metadata */}
                  <div className="mt-12 text-center text-[8px] text-slate-400">
                    Documento emitido eletronicamente pelo Sistema de Gestão de Notas • Rio de Janeiro, {new Date().toLocaleDateString('pt-BR')}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

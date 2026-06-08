import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, GraduationCap, Users, User, Calendar, 
  Plus, Trash2, Search, Printer, FileText, Check, AlertCircle 
} from 'lucide-react';
import { ClassData, Student, OccurrenceData } from '../types';
import { 
  subscribeToClasses, 
  subscribeToOccurrences, 
  saveOccurrenceToFirestore, 
  deleteOccurrenceFromFirestore 
} from '../services/firebaseService';

interface OcorrenciasViewProps {
  onBack: () => void;
}

export const OcorrenciasView: React.FC<OcorrenciasViewProps> = ({ onBack }) => {
  // Sync classes and occurrences
  const [classes, setClasses] = useState<Record<string, ClassData>>({});
  const [occurrences, setOccurrences] = useState<OccurrenceData[]>([]);
  const [loading, setLoading] = useState(true);

  // Selection states
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Form states
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [formType, setFormType] = useState<'class' | 'student'>('class');
  const [formCategory, setFormCategory] = useState<string>('Indisciplina');
  const [formDescription, setFormDescription] = useState<string>('');
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  // Search/Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Load classes & occurrences in real-time
  useEffect(() => {
    setLoading(true);
    const unsubClasses = subscribeToClasses((classData) => {
      setClasses(classData);
      
      // Select first school by default if none selected
      const classList = Object.values(classData) as ClassData[];
      const schools = Array.from(new Set(classList.map(c => c.school))).filter(Boolean);
      if (schools.length > 0 && !selectedSchool) {
        setSelectedSchool(schools[0]);
      }
    });

    const unsubOccurrences = subscribeToOccurrences((occurrenceData) => {
      setOccurrences(occurrenceData);
      setLoading(false);
    });

    return () => {
      unsubClasses();
      unsubOccurrences();
    };
  }, []);

  const classesList = Object.values(classes) as ClassData[];
  const schools = Array.from(new Set(classesList.map(c => c.school))).filter(Boolean);
  const schoolClasses = classesList.filter(c => c.school === selectedSchool);

  // Categories of occurrences
  const categories = [
    'Indisciplina',
    'Falta de Material',
    'Destaque Positivo',
    'Atraso',
    'Conflito entre Alunos',
    'Trabalho Não Entregue',
    'Outros'
  ];

  // Handle registering an occurrence
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) return;
    if (formType === 'student' && !selectedStudent) return;
    if (!formDescription.trim()) return;

    const occurrenceId = `occ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newOccurrence: OccurrenceData = {
      id: occurrenceId,
      date: formDate,
      type: formType,
      classId: selectedClass.id,
      className: selectedClass.name,
      school: selectedSchool,
      studentId: formType === 'student' && selectedStudent ? selectedStudent.id : null,
      studentName: formType === 'student' && selectedStudent ? selectedStudent.name : null,
      description: `[${formCategory}] ${formDescription}`,
      createdAt: Date.now()
    };

    try {
      await saveOccurrenceToFirestore(newOccurrence);
      
      // Save locally to localStorage as fallback/mirror
      const localStored = localStorage.getItem('app_occurrences');
      const localList = localStored ? JSON.parse(localStored) : [];
      localList.push(newOccurrence);
      localStorage.setItem('app_occurrences', JSON.stringify(localList));

      // Reset form
      setFormDescription('');
      setSubmissionFeedback('Ocorrência registrada com sucesso!');
      setTimeout(() => setSubmissionFeedback(null), 3000);
    } catch (err) {
      console.error("Erro ao salvar ocorrência:", err);
      // Fallback local save anyway
      const localStored = localStorage.getItem('app_occurrences');
      const localList = localStored ? JSON.parse(localStored) : [];
      localList.push(newOccurrence);
      localStorage.setItem('app_occurrences', JSON.stringify(localList));
      
      setFormDescription('');
      setSubmissionFeedback('Registrada localmente com sucesso!');
      setTimeout(() => setSubmissionFeedback(null), 3000);
    }
  };

  // Handle deletion
  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza de que deseja excluir esta ocorrência?')) {
      try {
        await deleteOccurrenceFromFirestore(id);
      } catch (err) {
        console.error("Erro ao deletar ocorrência:", err);
      }
      
      // Update local storage too
      const localStored = localStorage.getItem('app_occurrences');
      if (localStored) {
        const localList = JSON.parse(localStored).filter((o: OccurrenceData) => o.id !== id);
        localStorage.setItem('app_occurrences', JSON.stringify(localList));
      }
    }
  };

  // Printable report handler
  const handlePrint = () => {
    window.print();
  };

  // Filtered list of occurrences for current selections
  const currentOccurrences = occurrences.filter(occ => {
    // Basic context filtering (School & Class)
    if (occ.school !== selectedSchool) return false;
    if (selectedClass && occ.classId !== selectedClass.id) return false;
    if (selectedStudent && occ.studentId !== selectedStudent.id) return false;

    // Direct filter categories
    if (filterType !== 'all' && occ.type !== filterType) return false;
    
    // Parse tag from description
    const tagMatch = occ.description.match(/^\[([^\]]+)\]/);
    const occCategory = tagMatch ? tagMatch[1] : 'Outros';
    if (filterCategory !== 'all' && occCategory !== filterCategory) return false;

    // Search Query (Description, Student Name, etc.)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = occ.description.toLowerCase();
      const matchStudName = occ.studentName ? occ.studentName.toLowerCase() : '';
      const matchClassName = occ.className.toLowerCase();
      return matchText.includes(q) || matchStudName.includes(q) || matchClassName.includes(q);
    }

    return true;
  });

  return (
    <div className="relative min-h-[calc(100vh-100px)] bg-neutral-950 text-white rounded-[2rem] border border-white/5 p-4 md:p-8 font-sans overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Screen Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 print:hidden">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all text-neutral-400 hover:text-white"
            title="Voltar"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <FileText size={14} /> Registro e Provas de Prática
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase">
              Ocorrências de Alunos
            </h1>
          </div>
        </div>

        {/* Print Action / Report View Toggle */}
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-5 py-3 rounded-2xl shadow-xl transition-all hover:scale-[1.02] text-sm uppercase tracking-wide"
        >
          <Printer size={16} /> Emitir Relatório (Prova)
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
        
        {/* Left Side: Navigation Map (Schools -> Classes -> Student Selection) */}
        <div className="lg:col-span-5 flex flex-col gap-6 print:hidden">
          
          {/* School Selector */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md">
            <label className="block text-xs font-extrabold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <GraduationCap size={15} className="text-emerald-400" /> Selecionar Escola
            </label>
            <div className="grid grid-cols-1 gap-2">
              {schools.map(school => (
                <button
                  key={school}
                  onClick={() => {
                    setSelectedSchool(school);
                    setSelectedClass(null);
                    setSelectedStudent(null);
                  }}
                  className={`text-left px-4 py-3 rounded-2xl font-bold transition-all flex items-center justify-between text-sm ${
                    selectedSchool === school
                      ? 'bg-emerald-500 text-neutral-950 shadow-lg'
                      : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <span className="truncate">{school}</span>
                  {selectedSchool === school && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>

          {/* Classes Selector under selected school */}
          {selectedSchool && (
            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md">
              <label className="block text-xs font-extrabold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Users size={15} className="text-emerald-400" /> Turmas da Escola
              </label>
              
              {schoolClasses.length === 0 ? (
                <p className="text-neutral-500 text-xs italic">Nenhuma turma cadastrada nesta escola.</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {schoolClasses.map(cls => (
                    <button
                      key={cls.id}
                      onClick={() => {
                        setSelectedClass(cls);
                        setSelectedStudent(null);
                        setFormType('class');
                      }}
                      className={`text-left p-3.5 rounded-2xl transition-all border ${
                        selectedClass?.id === cls.id
                          ? 'bg-white/10 border-emerald-500/50 text-white shadow-md'
                          : 'bg-white/5 border-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <h4 className="font-extrabold text-sm">{cls.name}</h4>
                      <p className="text-[10px] text-neutral-500 mt-0.5 font-mono">{cls.schedule || 'Sem horário'}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Student Selector under selected class */}
          {selectedClass && (
            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md max-h-[350px] overflow-y-auto custom-scroll">
              <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                <label className="block text-xs font-extrabold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                  <User size={15} className="text-emerald-400" /> Lista de Alunos
                </label>
                <button
                  onClick={() => {
                    setSelectedStudent(null);
                    setFormType('class');
                  }}
                  className={`text-[10px] uppercase font-black px-2 py-1 rounded transition-all ${
                    formType === 'class'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  Geral da Turma
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {selectedClass.students && selectedClass.students.length > 0 ? (
                  selectedClass.students.map(student => (
                    <button
                      key={student.id}
                      onClick={() => {
                        setSelectedStudent(student);
                        setFormType('student');
                      }}
                      className={`text-left px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                        selectedStudent?.id === student.id
                          ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold'
                          : 'bg-white/0 hover:bg-white/5 text-neutral-300 hover:text-white border border-transparent'
                      }`}
                    >
                      <span className="truncate">{student.name}</span>
                      {selectedStudent?.id === student.id && <Check size={12} className="text-emerald-400" />}
                    </button>
                  ))
                ) : (
                  <p className="text-neutral-500 text-xs italic">Nenhum aluno cadastrado nesta turma.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Log of Ocorrences & Registration Form */}
        <div className="lg:col-span-7 flex flex-col gap-6 print:w-full">
          
          {/* New Event/Occurrence Form (Invisible in print mode) */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md print:hidden">
            <h2 className="text-lg font-black tracking-tight uppercase flex items-center gap-2 mb-4">
              <Plus size={18} className="text-emerald-500" /> 
              Registrar Ocorrência para: {' '}
              <span className="text-emerald-400">
                {formType === 'student' && selectedStudent 
                  ? selectedStudent.name 
                  : (selectedClass ? `${selectedClass.name} (Geral)` : 'Selecione uma Turma')}
              </span>
            </h2>

            {!selectedClass ? (
              <div className="flex flex-col items-center justify-center p-8 bg-black/10 rounded-2xl border border-dashed border-white/10 text-center">
                <AlertCircle size={32} className="text-neutral-600 mb-2" />
                <p className="text-xs text-neutral-400 uppercase font-bold tracking-widest">
                  Por favor, selecione uma escola e uma turma no painel ao lado para registrar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date Input */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1">
                      Data da Ocorrência
                    </label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3.5 top-3.5 text-neutral-400" />
                      <input
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-500 text-white rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-neutral-300"
                      />
                    </div>
                  </div>

                  {/* Category select */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1">
                      Categoria / Tipo
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 hover:border-white/20 focus:border-emerald-500 text-white rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer text-neutral-300"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-neutral-900 text-white">{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1">
                    Descrição Detalhada do Ocorrido (Fato / Observação)
                  </label>
                  <textarea
                    rows={4}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    required
                    placeholder="Ex: Aluno não trouxe uniforme de Educação Física e se recusou a participar da atividade teórica proposta em sala..."
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-500 text-white rounded-xl p-4 text-xs hover:focus:outline-none focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-neutral-500 text-neutral-300 font-medium"
                  ></textarea>
                </div>

                {/* Message feedback */}
                {submissionFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2"
                  >
                    <Check size={14} /> {submissionFeedback}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={!formDescription.trim()}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 disabled:pointer-events-none text-neutral-950 font-bold py-3 px-6 rounded-2xl text-xs uppercase tracking-wider transition-all self-end flex items-center gap-2"
                >
                  <Plus size={14} /> Salvar Relato
                </button>
              </form>
            )}
          </div>

          {/* Search, Filter & Occurrences List (Transforms into Official Report when printed) */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md flex-grow flex flex-col print:bg-transparent print:border-none print:p-0">
            
            {/* Filter Section (Invisible in print) */}
            <div className="flex flex-col gap-4 mb-6 border-b border-white/5 pb-4 print:hidden">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black tracking-widest uppercase text-neutral-400 flex items-center gap-2">
                  <FileText size={16} className="text-emerald-400" /> Histórico de Relatos / Provas
                </h3>
                <span className="bg-white/5 px-2.5 py-1 rounded-full text-[10px] text-neutral-400 border border-white/5 font-mono">
                  {currentOccurrences.length} registros
                </span>
              </div>

              {/* Filtering Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Text query search */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-3 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Pesquisar relato..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 focus:border-white/25 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none transition-all placeholder:text-neutral-500 text-white"
                  />
                </div>

                {/* Type Filter */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-neutral-950 border border-white/5 hover:border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none transition-all cursor-pointer text-neutral-400"
                >
                  <option value="all">Tipo de Registro: Todos</option>
                  <option value="class">Colegiais / Turma Geral</option>
                  <option value="student">Individuais de Alunos</option>
                </select>

                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-neutral-950 border border-white/5 hover:border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none transition-all cursor-pointer text-neutral-400"
                >
                  <option value="all">Categoria: Todas</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Print Header Block (ONLY VISIBLE ON PRINT) */}
            <div className="hidden print:block text-neutral-950 font-serif mb-8 p-6 border-b-2 border-neutral-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold uppercase tracking-tight">Governo do Estado do Rio de Janeiro</h1>
                  <h2 className="text-lg font-semibold text-neutral-700">Secretaria de Estado de Educação - SEEDUC-RJ</h2>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">Gestão de Apoio a Prática e Resoluções Disciplinares</p>
                </div>
                <div className="text-right text-xs font-sans text-neutral-500 flex flex-col gap-0.5">
                  <span><strong>Emissão:</strong> {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</span>
                  <span><strong>Emitido por:</strong> Prof. André Brito</span>
                </div>
              </div>
              <h3 className="text-xl font-bold uppercase text-center my-6 py-2 bg-neutral-100 rounded tracking-widest border border-neutral-300">
                Relatório de Ocorrências e Fatos Relevantes
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm font-sans mb-4">
                <div>
                  <p><strong>Unidade Escolar:</strong> {selectedSchool || 'Todas as Unidades'}</p>
                  <p><strong>Turma:</strong> {selectedClass ? selectedClass.name : 'Todas as Turmas'}</p>
                </div>
                <div>
                  <p><strong>Foco do Relatório:</strong> {selectedStudent ? `Aluno(a): ${selectedStudent.name}` : 'Acompanhamento Geral'}</p>
                  <p><strong>Total de Registros Localizados:</strong> {currentOccurrences.length} ocorrências</p>
                </div>
              </div>
            </div>

            {/* List of Registered Occurrences */}
            <div className="flex-grow flex flex-col gap-4 overflow-y-auto max-h-[500px] custom-scroll pr-1 print:max-h-none print:overflow-visible print:gap-6">
              {currentOccurrences.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center p-12 text-center text-neutral-500 border border-dashed border-white/5 rounded-2xl print:bg-white print:text-black">
                  <FileText size={28} className="mb-2 text-neutral-600 print:hidden" />
                  <p className="text-xs font-bold uppercase tracking-widest">Nenhuma ocorrência registrada com os filtros aplicados.</p>
                </div>
              ) : (
                currentOccurrences.map((occ) => {
                  // Destructure tag category and description text
                  const matchTag = occ.description.match(/^\[([^\]]+)\]/);
                  const tag = matchTag ? matchTag[1] : 'Outros';
                  const plainDescription = matchTag ? occ.description.replace(/^\[[^\]]+\]\s*/, '') : occ.description;
                  
                  // Style based on tag category
                  const isPositive = tag === 'Destaque Positivo';
                  const isConflict = tag === 'Conflito entre Alunos' || tag === 'Indisciplina';

                  return (
                    <div 
                      key={occ.id} 
                      className="group bg-neutral-900/40 border border-white/5 hover:border-white/10 p-4 rounded-2xl transition-all relative print:bg-neutral-50 print:border-neutral-300 print:p-5 print:shadow-none print:rounded-lg"
                    >
                      {/* Top labels */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[9px] uppercase font-bold py-0.5 px-2 rounded-full border ${
                            isPositive 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 print:bg-emerald-100 print:text-emerald-800' 
                              : isConflict
                              ? 'bg-red-500/10 text-red-400 border-red-500/20 print:bg-red-100 print:text-red-800'
                              : 'bg-white/5 text-neutral-400 border-white/5 print:bg-neutral-100 print:text-neutral-700'
                          }`}>
                            {tag}
                          </span>
                          
                          <span className="text-[10px] text-emerald-400/90 font-bold font-mono">
                            {new Date(occ.date + 'T12:00:00').toLocaleDateString('pt-BR')}
                          </span>

                          <span className="text-neutral-500 text-[10px] font-mono print:text-neutral-600">
                            · {occ.className} · {occ.school}
                          </span>
                        </div>

                        {/* Delete trigger (Invisible in print mode) */}
                        <button
                          onClick={() => handleDelete(occ.id)}
                          className="absolute md:relative right-4 top-4 md:right-0 md:top-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-neutral-500 hover:text-red-400 rounded-xl hover:bg-red-500/10 print:hidden"
                          title="Excluir Ocorrência"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {/* Occurence details */}
                      <div className="text-xs leading-relaxed text-neutral-300 font-medium print:text-neutral-900 print:font-sans">
                        {occ.type === 'student' && occ.studentName && (
                          <div className="font-extrabold text-white mb-1.5 flex items-center gap-1 print:text-black">
                            <span className="text-neutral-500 print:text-neutral-600 font-normal">Estudante Relatado:</span>{' '}
                            {occ.studentName}{' '}
                            <span className="text-[10px] font-mono font-medium text-neutral-500">({occ.studentId})</span>
                          </div>
                        )}
                        <p className="whitespace-pre-line text-[11px] md:text-xs">
                          {plainDescription}
                        </p>
                      </div>

                      {/* Official Signature Lines (ONLY VISIBLE ON PRINT AT THE BOTTOM OF CARDS) */}
                      <div className="hidden print:flex items-center justify-between border-t border-neutral-200 mt-4 pt-3 text-[10px] font-sans text-neutral-500">
                        <span>Doc ID: <span className="font-mono">{occ.id}</span></span>
                        <div className="flex gap-8">
                          <span className="border-b border-neutral-300 w-36 text-center italic text-neutral-400">Rubrica do Professor</span>
                          {occ.type === 'student' && <span className="border-b border-neutral-300 w-36 text-center italic text-neutral-400">Assinatura do Responsável</span>}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Print Footer Block (ONLY VISIBLE ON PRINT AT THE LAST PAGE) */}
            <div className="hidden print:block mt-16 pt-12 border-t border-neutral-300 text-center text-xs font-serif text-neutral-500">
              <div className="flex justify-around items-center mb-12">
                <div className="flex flex-col items-center">
                  <div className="w-48 h-0.5 bg-neutral-300 mb-2"></div>
                  <span>Prof. André Brito</span>
                  <span className="text-[10px] font-sans">Docente de Educação Física</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-48 h-0.5 bg-neutral-300 mb-2"></div>
                  <span>Coordenação Pedagógica</span>
                  <span className="text-[10px] font-sans">Unidade Escolar Vinculada</span>
                </div>
              </div>
              <p className="text-[9px] text-neutral-400 leading-normal font-sans">
                Este documento é uma transcrição oficial de acompanhamento prático emitido através do Portal de Gestão Escolar Autonômica.<br />
                As anotações registradas destinam-se a instrução de processos avaliativos e tomada de decisões sob regência pedagógica da Escola.
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

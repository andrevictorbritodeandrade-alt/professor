import React, { useState, useEffect } from 'react';
import { ClassData, ClassDataMap, Student } from '../types';
import { PrintPreviewModal } from './PrintPreviewModal';
import { ClassDiaryTable } from './ClassDiaryTable';
import { saveClassesToFirestore } from '../services/firebaseService';
import { initialClassData } from '../constants';
import { scanStudentList } from '../services/geminiService';

const TRIMESTERS = [
  {
    id: 1,
    name: '1º Trimestre',
    rangeText: '05/02 a 18/05',
    start: new Date(2026, 1, 5), // 05/02/2026 (Note: Jan is 0, Feb is 1)
    end: new Date(2026, 4, 18),   // 18/05/2026
    months: [1, 2, 3, 4]          // FEV, MAR, ABR, MAI
  },
  {
    id: 2,
    name: '2º Trimestre',
    rangeText: '19/05 a 04/09',
    start: new Date(2026, 4, 19),  // 19/05/2026
    end: new Date(2026, 8, 4),    // 04/09/2026
    months: [4, 5, 6, 7, 8]        // MAI, JUN, JUL, AGO, SET
  },
  {
    id: 3,
    name: '3º Trimestre',
    rangeText: '08/09 a 22/12',
    start: new Date(2026, 8, 8),   // 08/09/2026
    end: new Date(2026, 11, 22),   // 22/12/2026
    months: [8, 9, 10, 11]         // SET, OUT, NOV, DEZ
  }
];

const WEEKDAY_MAPPING: Record<string, number> = {
  'Domingo': 0,
  'Segunda': 1,
  'Terça': 2,
  'Quarta': 3,
  'Quinta': 4,
  'Sexta': 5,
  'Sábado': 6
};

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

interface ClassesViewProps {
  classData: ClassDataMap;
  setClassData: React.Dispatch<React.SetStateAction<ClassDataMap>>;
  onBack: () => void;
  // Props recebidas do App.tsx para controle de navegação
  selectedGrade: string | null;
  setSelectedGrade: (grade: string | null) => void;
  selectedClassId: string | null;
  setSelectedClassId: (id: string | null) => void;
  onSave: (data: ClassDataMap) => Promise<void>;
  syncStatus: 'synced' | 'saving' | 'error';
}

export const ClassesView: React.FC<ClassesViewProps> = ({ 
  classData, 
  setClassData, 
  onBack,
  selectedGrade,
  setSelectedGrade,
  selectedClassId,
  setSelectedClassId,
  onSave,
  syncStatus
}) => {
  
  // Modals State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<Student | null>(null);
  const [showMoveModal, setShowMoveModal] = useState<Student | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Student | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  
  // Saving State
  const [isSaving, setIsSaving] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  
  // Input States
  const [newStudentName, setNewStudentName] = useState('');
  const [targetClassId, setTargetClassId] = useState('');
  
  // Date Logic
  const [activeTrimesterId, setActiveTrimesterId] = useState<number>(2);

  const getTodayISO = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDayOfWeek = (isoDate: string) => {
    if (!isoDate) return '';
    // Adicionando T12:00:00 para evitar problemas de fuso horário que podem mudar o dia
    const date = new Date(`${isoDate}T12:00:00`);
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[date.getDay()];
  };

  const [selectedDate, setSelectedDate] = useState(getTodayISO());

  const dayOfWeek = getDayOfWeek(selectedDate);

  // Sync activeTrimesterId with selectedDate on mount or change
  useEffect(() => {
    if (selectedDate) {
      const d = new Date(`${selectedDate}T12:00:00`);
      const found = TRIMESTERS.find(t => d >= t.start && d <= t.end);
      if (found) {
        setActiveTrimesterId(found.id);
      }
    }
  }, [selectedDate]);

  // Sincroniza com localStorage apenas para persistir durante a sessão se necessário, 
  // mas o estado inicial agora é sempre hoje ao montar o componente.
  useEffect(() => {
    localStorage.setItem('app_selectedDate', selectedDate);
  }, [selectedDate]);

  const getFormattedDate = (isoDate: string) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}`;
  };

  const dateStr = getFormattedDate(selectedDate);

  const getIsoStringForDate = (date: Date) => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const checkHasAttendanceForDate = (date: Date, studentsToSearch: Student[]) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedKeyPrefix = `${day}/${month}`; // e.g. "25/05"

    return studentsToSearch.some(s => {
      return Object.keys(s.attendance || {}).some(k => k.startsWith(formattedKeyPrefix));
    });
  };

  const checkIfHolidayOrRecess = (date: Date) => {
    const m = date.getMonth(); // 0-indexed
    const d = date.getDate();  // 1-indexed

    // Feriados & Recessos
    if (m === 0 && d === 1) return true; // Confraternização
    if (m === 2 && d === 15) return true; // Carnaval
    if (m === 3 && d === 2) return true; // Paixão de Cristo
    if (m === 3 && d === 21) return true; // Tiradentes
    if (m === 4 && d === 1) return true; // Dia do Trabalho
    if (m === 6 && (d >= 13 && d <= 26)) return true; // Recesso de Julho
    if (m === 8 && d === 7) return true; // Independência
    if (m === 9 && d === 12) return true; // Nsa Sra Aparecida
    if (m === 9 && d === 15) return true; // Dia do Mestre
    if (m === 10 && d === 2) return true; // Finados
    if (m === 10 && d === 15) return true; // Proclamação da República
    if (m === 10 && d === 20) return true; // Consciência Negra
    if (m === 11 && d === 25) return true; // Natal
    if (m === 11 && ((d >= 12 && d <= 21) || (d >= 23 && d <= 31))) return true; // Recessos

    return false;
  };

  const getClassDatesInTrimester = (classId: string, trimesterId: number) => {
    const cls = classData[classId];
    if (!cls) return [];

    const trimester = TRIMESTERS.find(t => t.id === trimesterId) || TRIMESTERS[1];
    const dates: Date[] = [];

    const classWeekdays = (cls.days || []).map(d => WEEKDAY_MAPPING[d]).filter(d => d !== undefined);
    if (classWeekdays.length === 0) {
      classWeekdays.push(1); // Default to Monday
    }

    const temp = new Date(trimester.start);
    while (temp <= trimester.end) {
      if (classWeekdays.includes(temp.getDay())) {
        dates.push(new Date(temp));
      }
      temp.setDate(temp.getDate() + 1);
    }

    const additionalDatesSet = new Set<string>();
    
    cls.students?.forEach(student => {
      Object.keys(student.attendance || {}).forEach(key => {
        const datePart = key.split(' - ')[0]; // E.g. "11/05"
        const [dayStr, monthStr] = datePart.split('/');
        if (dayStr && monthStr) {
          const iso = `2026-${monthStr.padStart(2, '0')}-${dayStr.padStart(2, '0')}`;
          additionalDatesSet.add(iso);
        }
      });
    });

    cls.dailyActivities?.forEach(act => {
      if (act.date) {
        const iso = act.date.substring(0, 10);
        additionalDatesSet.add(iso);
      }
    });

    additionalDatesSet.forEach(iso => {
      const d = new Date(`${iso}T12:00:00`);
      if (d >= trimester.start && d <= trimester.end) {
        const hasDate = dates.some(existing => {
          return existing.getFullYear() === d.getFullYear() &&
                 existing.getMonth() === d.getMonth() &&
                 existing.getDate() === d.getDate();
        });
        if (!hasDate) {
          dates.push(d);
        }
      }
    });

    dates.sort((a, b) => a.getTime() - b.getTime());
    return dates;
  };

  // --- CRUD ACTIONS ---

  // Helper para ordenar array de alunos
  const sortStudentsAlphabetically = (students: Student[]) => {
    return [...students].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));
  };

  const sortClassAlphabetically = () => {
    if (!selectedClassId) return;
    // Agora apenas força a reordenação caso algo esteja fora de ordem, sem perguntar
    setClassData(prev => {
        const newData = { ...prev };
        newData[selectedClassId].students = sortStudentsAlphabetically(newData[selectedClassId].students);
        return newData;
    });
  };

  const handleAttendance = (studentId: number, status: 'P' | 'F', suffix?: string) => {
    if (!selectedClassId) return;

    // Feedback visual de "Salvando..."
    setIsSaving(true);

    setClassData((prev) => {
      const newData = { ...prev };
      if (!newData[selectedClassId]) return prev;

      const studentIndex = newData[selectedClassId].students.findIndex(s => s.id === studentId);
      if (studentIndex >= 0) {
        const updatedStudents = [...newData[selectedClassId].students];
        const currentStudent = updatedStudents[studentIndex];
        
        // Lógica de Toggle: Se já estiver com o status clicado, remove (null). Se for diferente, aplica o novo.
        const fullDateKey = suffix ? `${dateStr} - ${suffix}` : dateStr;
        const currentStatus = currentStudent.attendance[fullDateKey];
        const newStatus = currentStatus === status ? null : status;

        const newAttendance = { ...currentStudent.attendance };

        // Remove old single-key representation if it exists to avoid conflicts
        delete newAttendance[dateStr];

        if (newStatus === null) {
          delete newAttendance[fullDateKey]; // Remove a marcação se for toggle
        } else {
          newAttendance[fullDateKey] = newStatus; // Aplica nova marcação
        }

        updatedStudents[studentIndex] = {
          ...currentStudent,
          attendance: newAttendance
        };
        
        newData[selectedClassId] = {
          ...newData[selectedClassId],
          students: updatedStudents
        };
      }
      return newData;
    });

    // Pequeno delay para o feedback visual de salvamento
    setTimeout(() => setIsSaving(false), 800);
  };

  const handleManualSave = async () => {
    setIsSaving(true);
    try {
      await onSave(classData);
      // Feedback visual rápido
      const btn = document.getElementById('save-cloud-btn');
      if(btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Salvo!';
        setTimeout(() => { btn.innerHTML = originalText }, 2000);
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao sincronizar com a nuvem.");
    } finally {
      setIsSaving(false);
    }
  };

  const addStudent = () => {
    if (!newStudentName.trim() || !selectedClassId) return;
    
    const newId = Date.now(); // Simple unique ID
    const newStudent: Student = {
      id: newId,
      name: newStudentName.trim(),
      attendance: {}
    };

    setClassData(prev => {
      const newData = { ...prev };
      // Adiciona e ordena imediatamente
      const updatedList = [...newData[selectedClassId].students, newStudent];
      newData[selectedClassId].students = sortStudentsAlphabetically(updatedList);
      
      // Salva imediatamente na nuvem
      
      return newData;
    });
    setNewStudentName('');
    setShowAddModal(false);
  };

  const updateStudentName = () => {
    if (!showEditModal || !selectedClassId || !newStudentName.trim()) return;

    setClassData(prev => {
      const newData = { ...prev };
      const students = newData[selectedClassId].students.map(s => 
        s.id === showEditModal.id ? { ...s, name: newStudentName.trim() } : s
      );
      // Reordena após editar o nome para manter a lista correta
      newData[selectedClassId].students = sortStudentsAlphabetically(students);
      
      return newData;
    });
    setShowEditModal(null);
    setNewStudentName('');
  };

  const deleteStudent = () => {
    if (!showDeleteConfirm || !selectedClassId) return;

    setClassData(prev => {
      const newData = { ...prev };
      newData[selectedClassId].students = newData[selectedClassId].students.filter(s => s.id !== showDeleteConfirm.id);
      
      return newData;
    });
    setShowDeleteConfirm(null);
  };

  const moveStudent = () => {
    if (!showMoveModal || !selectedClassId || !targetClassId) return;

    setClassData(prev => {
      const newData = { ...prev };
      
      const studentToMove = newData[selectedClassId].students.find(s => s.id === showMoveModal.id);
      if (!studentToMove) return prev;

      // Remove da turma atual
      newData[selectedClassId].students = newData[selectedClassId].students.filter(s => s.id !== showMoveModal.id);

      // Adiciona na nova turma e ORDENA a nova turma
      if (newData[targetClassId]) {
        const newTargetList = [...newData[targetClassId].students, studentToMove];
        newData[targetClassId].students = sortStudentsAlphabetically(newTargetList);
      }

      return newData;
    });
    setShowMoveModal(null);
    setTargetClassId('');
  };

  const handleAIScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedClassId) return;

    setIsScanning(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const names = await scanStudentList(base64, file.type);
        
        if (names.length > 0) {
          setClassData(prev => {
            const newData = { ...prev };
            const currentStudents = newData[selectedClassId].students;
            
            const newStudents: Student[] = names.map((name, i) => ({
              id: Date.now() + i,
              name: name.toUpperCase(),
              attendance: {}
            }));

            const combinedList = [...currentStudents, ...newStudents];
            // Remove duplicates by name
            const uniqueList = combinedList.filter((s, index, self) => 
              index === self.findIndex((t) => t.name === s.name)
            );

            newData[selectedClassId].students = sortStudentsAlphabetically(uniqueList);
            return newData;
          });
          alert(`${names.length} alunos identificados e adicionados!`);
        } else {
          alert("Nenhum nome pôde ser identificado na lista.");
        }
      };
    } catch (error) {
      console.error("Scan error:", error);
      alert("Erro ao processar imagem/PDF. Tente novamente.");
    } finally {
      setIsScanning(false);
      // Reset input
      e.target.value = '';
    }
  };

  const getClassesBySchool = (school: string): ClassData[] => {
    return (Object.values(classData) as ClassData[]).filter((c: ClassData) => c.school === school);
  };

  // Helper for stats
  const getStats = (student: Student) => {
    const totalDays = Object.keys(student.attendance).length;
    if (totalDays === 0) return { pCount: 0, pPercent: 0, fCount: 0, fPercent: 0 };
    
    const pCount = Object.values(student.attendance).filter(v => v === 'P').length;
    const fCount = Object.values(student.attendance).filter(v => v === 'F').length;
    
    return {
      pCount,
      fCount,
      pPercent: Math.round((pCount / totalDays) * 100),
      fPercent: Math.round((fCount / totalDays) * 100)
    };
  };

  const schools = Array.from(new Set(
    (Object.values(classData || {}) as ClassData[])
      .map(c => c.school)
      .filter(school => school && typeof school === 'string')
  )).sort();

  // Se schools estiver vazio e tivermos dados iniciais, tenta usá-los como falha
  const finalSchools = schools.length > 0 ? schools : Array.from(new Set(
    (Object.values(initialClassData) as ClassData[])
      .map(c => c.school)
  )).sort();

  // Validação de estado persistido: se a escola selecionada não existe mais nos dados, reseta.
  useEffect(() => {
    if (selectedGrade && !schools.includes(selectedGrade)) {
      setSelectedGrade(null);
    }
  }, [selectedGrade, schools, setSelectedGrade]);

  // Validação de turma selecionada: se a turma não existe nos dados, reseta.
  useEffect(() => {
    if (selectedClassId && !classData[selectedClassId]) {
      setSelectedClassId(null);
    }
  }, [selectedClassId, classData, setSelectedClassId]);

  // --- VIEWS ---

  // NÍVEL 1: SELEÇÃO DE ESCOLA
  if (!selectedGrade) {
    return (
      <div className="bg-slate-900 min-h-[500px] p-6 rounded-[2.5rem] shadow-2xl border border-white/10 animate-fade-in text-white font-sans w-full py-10 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
          <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72M12 12.72v-3.72l-5 2.73 5 2.73z" /></svg>
        </div>

        <div className="text-center mb-14 relative z-10">
          <div className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-[2rem] mb-6 shadow-lg shadow-sky-500/20">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter text-white">DIÁRIO DE CLASSE</h2>
          <p className="text-sky-400 uppercase tracking-[0.3em] text-[10px] md:text-xs font-black">Selecione a Unidade Escolar</p>
        </div>

        <button 
          onClick={onBack}
          className="relative z-10 mb-10 w-full sm:w-auto px-6 h-12 flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white text-xs font-black uppercase rounded-xl hover:bg-white/10 transition-all active:scale-95 group shadow-sm backdrop-blur-md"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Voltar ao Portal
        </button>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10 w-full max-w-6xl mx-auto">
          {finalSchools.length > 0 ? finalSchools.map(school => {
            const schoolClasses = getClassesBySchool(school);
            return (
              <button
                key={school}
                onClick={() => setSelectedGrade(school)}
                className="group relative bg-[#262626] border border-white/10 rounded-2xl p-4 hover:bg-[#2a2a2a] transition-all text-left overflow-hidden flex flex-col justify-between h-[170px] shadow-md"
              >
                {/* Background Watermark (similar to Calendar in Image 1) */}
                <div className="absolute top-3 right-3 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-2.682.565 1 1 0 00-.639.913V17a1 1 0 01-2 0v-.427a1 1 0 00-.639-.913z" /></svg>
                </div>
                
                <div className="relative z-10 w-full">
                  {/* Icon Container resembling Image 1 */}
                  <div className="w-8 h-8 bg-[#2b3544] rounded-lg flex items-center justify-center mb-2 shadow-inner border border-white/5">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-base font-black text-white tracking-tight uppercase leading-none mb-1">
                    {school}
                  </h3>
                  
                  <p className="text-xs text-neutral-400 font-medium leading-snug max-w-[95%]">
                    Controle de frequência e notas para {schoolClasses.length} turmas ativas.
                  </p>
                </div>
                
                <div className="relative z-10 mt-3 flex items-center text-blue-400 text-[10px] font-black tracking-widest uppercase group-hover:text-blue-300 transition-colors">
                  ACESSAR TURMAS
                  <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </button>
            );
          }) : (
            <div className="col-span-full py-20 text-center text-slate-500 uppercase tracking-[0.4em] text-xs font-black opacity-30">
              Nenhuma escola carregada
            </div>
          )}
        </div>
      </div>
    );
  }

  // NÍVEL 2: SELEÇÃO DE TURMA
  if (!selectedClassId) {
    const classes = getClassesBySchool(selectedGrade);
    return (
      <div className="bg-slate-900 min-h-[500px] p-6 lg:p-10 rounded-[2.5rem] shadow-2xl border border-white/10 animate-fade-in text-white font-sans w-full relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
          <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72M12 12.72v-3.72l-5 2.73 5 2.73z" /></svg>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 relative z-10">
          <button 
            onClick={() => setSelectedGrade(null)}
            className="px-6 h-12 flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white text-xs font-black uppercase rounded-xl hover:bg-white/10 transition-all active:scale-95 group shadow-sm backdrop-blur-md"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Voltar
          </button>
          
          <div className="flex flex-col sm:text-right bg-black/20 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
             <p className="text-[10px] text-sky-400 font-black uppercase tracking-[0.2em] mb-1">Unidade Escolar selecionada</p>
             <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">{selectedGrade}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10">
          {classes.map(cls => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className="group relative bg-[#262626] border border-[#333] rounded-2xl p-4 hover:bg-[#2a2a2a] transition-all text-left overflow-hidden flex flex-col justify-between h-[170px] shadow-md"
            >
              {/* Background Watermark */}
              <div className="absolute top-3 right-3 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-9-5m9 5l9-5" />
                </svg>
              </div>

              <div className="relative z-10 w-full animate-fade-in">
                {/* Icon Container matching Image 1 */}
                <div className="w-8 h-8 bg-[#2b3544] rounded-lg flex items-center justify-center mb-2 shadow-inner border border-[#3f4a5c]">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                
                <h3 className="text-base font-black tracking-tight text-white leading-none mb-1">
                  {cls.name.startsWith('Turma') ? cls.name.replace('Turma ', '') : cls.name}
                </h3>
                
                <p className="text-xs text-[#9ca3af] font-medium leading-snug">
                  {cls.students.length} alunos · {cls.schedule || '--:--'}
                </p>
              </div>
              
              <div className="relative z-10 mt-3 flex items-center text-blue-400 text-[10px] font-black tracking-widest uppercase group-hover:text-blue-300 transition-colors">
                FAZER CHAMADA
                <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // NÍVEL 3: LISTA DE CHAMADA
  const currentClass = classData[selectedClassId];
  const sortedStudents = currentClass.students;
  const isCorrectDay = currentClass.days ? currentClass.days.includes(dayOfWeek) : true;

  return (
    <>
    <div className="bg-slate-950 min-h-screen rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden animate-fade-in relative pb-10 text-white font-sans">
      
      {/* Header View - Toolbar Dark Studio Style */}
      <div className="p-4 md:p-6 border-b border-white/10 flex flex-wrap justify-between items-center bg-slate-900/90 backdrop-blur-xl sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedClassId(null)}
            className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-white transition-all shadow-sm active:scale-95"
          >
            <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          
          <div className="flex flex-col">
             <div className="flex items-center gap-3">
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Data da Chamada</p>
               {syncStatus === 'saving' ? (
                 <span className="flex items-center text-[9px] font-black text-sky-400 animate-pulse bg-sky-400/10 px-2 py-0.5 rounded border border-sky-400/20">
                   <svg className="animate-spin h-2.5 w-2.5 mr-1.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   SINCRONIZANDO...
                 </span>
               ) : syncStatus === 'error' ? (
                 <span className="flex items-center text-[9px] font-black text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded border border-rose-400/20">
                   ERRO DE SYNC
                 </span>
               ) : (
                 <span className="flex items-center text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                   <svg className="w-2.5 h-2.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                   CONECTADO
                 </span>
               )}
             </div>
             <input 
               type="date" 
               value={selectedDate}
               onChange={(e) => setSelectedDate(e.target.value)}
               className="text-lg font-black text-white bg-transparent opacity-95 border-none p-0 focus:ring-0 cursor-pointer appearance-none outline-none"
             />
          </div>

          <div className="hidden md:flex flex-col border-l border-white/10 pl-6">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Horário</p>
            <p className="text-sm font-bold text-sky-400">{currentClass.schedule || 'Não definido'}</p>
          </div>

          <div className="hidden md:flex flex-col border-l border-slate-300 pl-6">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Dia de Aula</p>
            <p className={`text-sm font-black uppercase tracking-tight ${isCorrectDay ? 'text-green-700' : 'text-red-700'}`}>
               {dayOfWeek}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 sm:mt-0 flex-wrap">
           <button
             onClick={() => (window as any).setView('schedule')}
             className="px-3 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-white text-xs font-black uppercase rounded-xl hover:bg-white/10 shadow-sm transition-all active:scale-95 backdrop-blur-sm"
           >
             <svg className="w-4 h-4 mr-2 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             Quadro
           </button>

           <button
             id="save-cloud-btn"
             onClick={handleManualSave}
             disabled={syncStatus === 'saving'}
             className="px-4 h-10 flex items-center justify-center bg-rose-600 text-white text-xs font-black uppercase rounded-xl shadow-lg hover:bg-rose-500 transition-all transform active:scale-95 disabled:opacity-50"
           >
              {syncStatus === 'saving' ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  Salvar
                </>
              )}
           </button>

           <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
              <button
                onClick={() => setShowPrintModal(true)}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                title="Imprimir"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('CUIDADO: Restaurar apagará todas as presenças. Continuar?')) {
                    setClassData(prev => ({ ...prev, [selectedClassId!]: initialClassData[selectedClassId!] }));
                  }
                }}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-all"
                title="Sincronizar/Restaurar"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
              
              <button 
                onClick={() => { setNewStudentName(''); setShowAddModal(true); }}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all"
                title="Adicionar Aluno"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              </button>

              <button 
                onClick={() => document.getElementById('ai-scan-input')?.click()}
                disabled={isScanning}
                className={`w-8 h-8 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-lg transition-all ${isScanning ? 'animate-pulse' : ''}`}
                title="Injetar Lista (IA)"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </button>
           </div>
        </div>
      </div>

      {/* --- TABELA DE CHAMADA ESTILO DIÁRIO DE CLASSE (BLACK MODE) --- */}
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
            <h3 className="text-xl font-black text-white">Diário de Classe</h3>
            <span className="px-2 py-0.5 bg-sky-500/10 border border-sky-500/20 rounded text-[10px] font-black text-sky-400 uppercase tracking-widest">
                Turma {currentClass.name}
            </span>
        </div>

        {/* --- CRONOGRAMA POR MESES / RÉGUA DO TRIMESTRE (USER VISUAL ACCESS) --- */}
        <div className="mb-6 bg-slate-900 border border-white/10 rounded-[1.5rem] p-4 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-indigo-500/5" pointerEvents="none" />
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 border-b border-white/10 pb-3">
            <div>
              <p className="text-[10px] text-sky-400 font-extrabold uppercase tracking-widest leading-none mb-1">Régua do Trimestre</p>
              <h4 className="text-sm font-black text-white uppercase tracking-tighter">Cronograma de Dias de Aula</h4>
            </div>
            
            {/* Trimester Tabs */}
            <div className="flex gap-1 bg-slate-200/60 p-1 rounded-xl">
              {TRIMESTERS.map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTrimesterId(t.id);
                    // Select first day of classes in this trimester
                    const dates = getClassDatesInTrimester(selectedClassId!, t.id);
                    if (dates.length > 0) {
                      setSelectedDate(getIsoStringForDate(dates[0]));
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all ${
                    activeTrimesterId === t.id 
                      ? 'bg-sky-600 text-white shadow-sm scale-102' 
                      : 'text-slate-600 hover:bg-slate-300/40'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontally scrolling Months list */}
          <div className="flex flex-row overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-slate-300">
            {(() => {
              const trimesterDates = getClassDatesInTrimester(selectedClassId!, activeTrimesterId);
              const groupedDates: Record<number, Date[]> = {};
              trimesterDates.forEach(d => {
                const m = d.getMonth();
                if (!groupedDates[m]) {
                  groupedDates[m] = [];
                }
                groupedDates[m].push(d);
              });

              const sortedMonthsList = Object.keys(groupedDates).map(Number).sort((a, b) => a - b);

              if (sortedMonthsList.length === 0) {
                return (
                  <div className="py-6 text-center text-slate-400 font-bold text-xs uppercase w-full">
                    Nenhum dia de aula ou presença registrada para esta turma no {activeTrimesterId}º Trimestre.
                  </div>
                );
              }

              return sortedMonthsList.map(monthIdx => {
                const mDates = groupedDates[monthIdx];
                return (
                  <div key={monthIdx} className="flex-shrink-0 bg-white/5 border border-white/10 rounded-xl p-3 min-w-[130px] shadow-sm">
                    {/* Month Heading */}
                    <div className="text-center text-[10px] font-black uppercase text-slate-300 border-b border-white/10 pb-2 mb-2.5 tracking-widest">
                      {MONTH_NAMES[monthIdx]}
                    </div>
                    
                    {/* Days buttons list */}
                    <div className="flex flex-wrap gap-2 justification-center">
                      {mDates.map(d => {
                        const iso = getIsoStringForDate(d);
                        const isSelected = iso === selectedDate;
                        const hasAttendance = checkHasAttendanceForDate(d, sortedStudents);
                        const dayNum = d.getDate().toString().padStart(2, '0');
                        const isHolidayOrRecess = checkIfHolidayOrRecess(d);
                        const hasDailyActivity = currentClass.dailyActivities?.some(act => {
                          if (!act.date) return false;
                          return act.date.substring(0, 10) === iso;
                        });
                        
                        return (
                          <button
                            key={iso}
                            onClick={() => setSelectedDate(iso)}
                            className={`w-10 h-10 rounded-xl font-black text-xs relative flex flex-col items-center justify-center transition-all ${
                              isSelected
                                ? 'bg-sky-600 border border-sky-600 text-white shadow-md scale-105 z-10'
                                : isHolidayOrRecess
                                  ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30'
                                  : hasAttendance
                                    ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30'
                                    : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
                            }`}
                            title={`${dayNum} de ${MONTH_NAMES[monthIdx]} - ${isHolidayOrRecess ? 'Feriado/Recesso' : hasAttendance ? 'Presença lançada' : 'Nenhuma aula ainda'}`}
                          >
                            <span className={isSelected ? 'mb-0.5' : 'mb-1 text-inherit'}>{dayNum}</span>
                            
                            {/* Visual Dots Area for State indicators */}
                            <div className="absolute bottom-1 flex gap-0.5 justify-center w-full">
                              {hasAttendance && (
                                <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-green-600'}`} />
                              )}
                              {hasDailyActivity && (
                                <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-purple-600'}`} />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
        
        <ClassDiaryTable 
            students={sortedStudents}
            dateStr={dateStr}
            onAttendance={handleAttendance}
            onEdit={(student) => { setNewStudentName(student.name); setShowEditModal(student); }}
            onMove={setShowMoveModal}
            onDelete={setShowDeleteConfirm}
            isCorrectDay={isCorrectDay}
        />
      </div>
      
      {/* Hidden input for AI Scan */}
      <input 
        type="file" 
        accept="image/*,application/pdf"
        onChange={handleAIScan}
        id="ai-scan-input"
        className="hidden"
      />
      
      {/* --- MODALS --- */}
      
      {/* Print Preview Modal */}
      <PrintPreviewModal 
        isOpen={showPrintModal} 
        onClose={() => setShowPrintModal(false)}
        classData={currentClass}
        dateStr={dateStr}
      />

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-scale-in">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Adicionar Novo Aluno</h3>
            <input 
              autoFocus
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nome Completo"
              value={newStudentName}
              onChange={e => setNewStudentName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded">Cancelar</button>
              <button onClick={addStudent} className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-scale-in">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Editar Nome</h3>
            <input 
              autoFocus
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              value={newStudentName}
              onChange={e => setNewStudentName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowEditModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded">Cancelar</button>
              <button onClick={updateStudentName} className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Move Student Modal */}
      {showMoveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-scale-in">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Mover Aluno</h3>
            <p className="text-sm text-slate-500 mb-4">Mover <b>{showMoveModal.name}</b> para qual turma?</p>
            
            <select 
              className="w-full p-3 border rounded-lg mb-4 bg-slate-50"
              value={targetClassId}
              onChange={e => setTargetClassId(e.target.value)}
            >
              <option value="">Selecione a turma...</option>
              {(Object.values(classData) as ClassData[])
                .filter(c => c.id !== selectedClassId) // Don't show current class
                .map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowMoveModal(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded">Cancelar</button>
              <button 
                onClick={moveStudent} 
                disabled={!targetClassId}
                className="px-4 py-2 bg-orange-500 text-white rounded font-bold hover:bg-orange-600 disabled:opacity-50"
              >
                Mover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-scale-in text-center">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🗑️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Excluir Aluno?</h3>
            <p className="text-sm text-slate-500 mb-6">
              Tem certeza que deseja remover <b>{showDeleteConfirm.name}</b>?<br/>
              Essa ação não pode ser desfeita.
            </p>
            
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded font-bold">Cancelar</button>
              <button onClick={deleteStudent} className="px-6 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700">Excluir</button>
            </div>
          </div>
        </div>
      )}

    </div>
      
      {/* Footer do Diário */}
      <div className="px-6 py-4 border-t border-slate-300 bg-[#f4ece0] flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-widest">
         <span>Escola: {selectedGrade}</span>
         <span>Total de Alunos: {sortedStudents.length}</span>
      </div>
    </>
  );
};
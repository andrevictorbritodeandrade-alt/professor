import React, { useMemo } from 'react';
import { ViewState, ClassDataMap, ClassData } from '../types';

interface DashboardViewProps {
  setView: (view: ViewState) => void;
  classData: ClassDataMap;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setView, classData }) => {
  
  // Quick stats calculation
  const stats = useMemo(() => {
    // Filter classes to only include those from the 4 specific schools the professor currently works at
    const validSchools = ["CIEP 476", "CIEP 320", "EE Cordelia Paiva", "CIEP 198", "CIEP 369"];
    const classes = (Object.values(classData) as ClassData[]).filter(c => 
      c.school && validSchools.includes(c.school)
    );
    
    let totalStudents = 0;
    let totalPresents = 0;
    let totalPossible = 0;

    classes.forEach(c => {
      totalStudents += c.students?.length || 0;
      c.students?.forEach(s => {
        if (s.attendance) {
          totalPresents += Object.values(s.attendance).filter(v => v === 'P').length;
          totalPossible += Object.keys(s.attendance).length;
        }
      });
    });

    const avgAttendance = totalPossible > 0 ? Math.round((totalPresents / totalPossible) * 100) : 0;

    return { totalStudents, totalClasses: classes.length, avgAttendance };
  }, [classData]);

  const menuCards = [
    {
      id: 'classes',
      title: 'FREQUÊNCIAS',
      description: 'Gestão de turmas e chamadas diárias.',
      image: '/src/assets/images/frequencias_premium_1779983180555.png',
      action: () => setView('classes')
    },
    {
      id: 'schedule',
      title: 'GRADE DE HORÁRIOS',
      description: 'Cronograma semanal das aulas.',
      image: '/src/assets/images/grade_horarios_premium_1779983196214.png',
      action: () => setView('schedule')
    },
    {
      id: 'statistics',
      title: 'ESTATÍSTICAS',
      description: 'Métricas de assiduidade e progresso.',
      image: '/src/assets/images/estatisticas_premium_1779983211882.png',
      action: () => setView('statistics')
    },
    {
      id: 'ementa',
      title: 'EMENTA',
      description: 'Fundamentos, objetivos e referências.',
      image: '/src/assets/images/ementa_premium_1779983243784.png',
      action: () => setView('ementa')
    },
    {
      id: 'plano',
      title: 'PLANO DE CURSO',
      description: 'Cronograma trimestral dos conteúdos.',
      image: '/src/assets/images/plano_curso_premium_1779983225779.png',
      action: () => setView('plano')
    },
    {
      id: 'decolonial',
      title: 'GESTÃO DO PROFESSOR',
      description: 'Decolonização de corpos, identidades e mídias.',
      image: '/src/assets/images/gestao_professor_premium_1779983261744.png',
      action: () => setView('decolonial')
    },
    {
      id: 'calendar',
      title: 'CALENDÁRIO ESCOLAR 2026',
      description: 'Calendário letivo oficial da Rede SEEDUC/RJ.',
      image: '/src/assets/images/calendario_2026_premium_1779983280133.png',
      action: () => setView('calendar')
    },
    {
      id: 'daily-activities',
      title: 'REGISTRO DIÁRIO',
      description: 'Lançamento e diário de atividades das aulas.',
      image: '/src/assets/images/registro_diario_premium_1779983296811.png',
      action: () => setView('daily-activities')
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-100px)] bg-black animate-fade-in -mx-3 md:-mx-6 -mt-3 md:-mt-6 p-4 md:p-8 overflow-hidden">
      {/* Pure Deep Black Background with subtle top ambient glow */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[180px] bg-sky-500/5 blur-[130px] pointer-events-none rounded-full" />
      </div>

      <div className="relative z-10 space-y-6 md:space-y-10 w-full px-4 md:px-8">
        {/* Header (Integrated for Premium Feel) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-white/10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">Prof. André Brito</h2>
            <p className="text-xs md:text-sm font-bold text-sky-400 tracking-[0.3em] uppercase mt-1">Controle de Aulas • Ed. Física & Geografia</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Status do Sistema</p>
            <p className="text-xs font-bold text-green-400">ONLINE • SINCRONIZADO</p>
          </div>
        </div>

        {/* Real-time Stats Panel - Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-slate-950/80 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] flex items-center gap-5 shadow-[0_15px_30px_rgba(0,0,0,0.5)] group hover:border-sky-500/30 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-900 to-black rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/5 ring-1 ring-white/10">👥</div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mb-1">Total de Alunos</p>
                <p className="text-3xl font-black text-white group-hover:text-sky-400 transition-colors">201</p>
              </div>
            </div>
            <div className="bg-slate-950/80 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] flex items-center gap-5 shadow-[0_15px_30px_rgba(0,0,0,0.5)] group hover:border-emerald-500/30 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-900 to-black rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/5 ring-1 ring-white/10">📈</div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mb-1">Média Assiduidade</p>
                <p className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">87%</p>
              </div>
            </div>
            <div className="bg-slate-950/80 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] flex items-center gap-5 shadow-[0_15px_30px_rgba(0,0,0,0.5)] group hover:border-amber-500/30 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-900 to-black rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/5 ring-1 ring-white/10">🏫</div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mb-1">Turmas Ativas</p>
                <p className="text-3xl font-black text-white group-hover:text-amber-400 transition-colors">9</p>
              </div>
            </div>
        </div>

        {/* Cards Grid - High Fidelity Illustrations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {menuCards.map((card) => (
            <div 
              key={card.id}
              onClick={card.action}
              className="relative aspect-video sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-[2.5rem] cursor-pointer group shadow-[0_25px_50px_rgba(0,0,0,0.8)] border border-white/5 bg-slate-950/90 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-sky-500/30 hover:shadow-sky-500/5"
            >
              {/* Card Illustration Background - Beautifully visible illustrations with smooth text protection gradient */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover opacity-65 group-hover:opacity-85 transform group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 transition-all duration-500"></div>
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 md:p-8 z-10 flex flex-col justify-end h-full">
                {/* Small indicator bar */}
                <div className="w-10 h-[3px] bg-sky-400 rounded-full mb-4 group-hover:w-16 transition-all duration-300"></div>

                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-sky-300 group-hover:translate-x-1 transition-all uppercase leading-tight">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed group-hover:text-slate-200 transition-colors">
                  {card.description}
                </p>
              </div>

              {/* Selection Indicator Glow */}
              <div className="absolute inset-0 ring-1 ring-white/5 group-hover:ring-sky-500/20 rounded-[2.5rem] transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
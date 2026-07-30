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
      action: () => setView('classes'),
      colorName: 'Azul Celeste',
      badgeClass: 'bg-sky-50 text-sky-700 border border-sky-200/60 shadow-sm',
      barBg: 'bg-sky-500',
      hoverBorder: 'hover:border-sky-500/80 hover:shadow-sky-500/10',
      hoverText: 'group-hover:text-sky-200',
      glowGradient: 'from-sky-600/20',
      glowRing: 'group-hover:ring-sky-500/30'
    },
    {
      id: 'schedule',
      title: 'GRADE DE HORÁRIOS',
      description: 'Cronograma semanal das aulas.',
      image: '/src/assets/images/grade_horarios_premium_1779983196214.png',
      action: () => setView('schedule'),
      colorName: 'Esmeralda',
      badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-sm',
      barBg: 'bg-emerald-500',
      hoverBorder: 'hover:border-emerald-500/80 hover:shadow-emerald-500/10',
      hoverText: 'group-hover:text-emerald-200',
      glowGradient: 'from-emerald-600/20',
      glowRing: 'group-hover:ring-emerald-500/30'
    },
    {
      id: 'statistics',
      title: 'ESTATÍSTICAS',
      description: 'Métricas de assiduidade e progresso.',
      image: '/src/assets/images/estatisticas_premium_1779983211882.png',
      action: () => setView('statistics'),
      colorName: 'Índigo Violeta',
      badgeClass: 'bg-indigo-50 text-indigo-700 border border-indigo-200/60 shadow-sm',
      barBg: 'bg-indigo-500',
      hoverBorder: 'hover:border-indigo-500/80 hover:shadow-indigo-500/10',
      hoverText: 'group-hover:text-indigo-200',
      glowGradient: 'from-indigo-600/20',
      glowRing: 'group-hover:ring-indigo-500/30'
    },
    {
      id: 'ementa',
      title: 'EMENTA',
      description: 'Fundamentos, objetivos e referências.',
      image: '/src/assets/images/ementa_premium_1779983243784.png',
      action: () => setView('ementa'),
      colorName: 'Âmbar Dourado',
      badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200/60 shadow-sm',
      barBg: 'bg-amber-400',
      hoverBorder: 'hover:border-amber-500/80 hover:shadow-amber-500/10',
      hoverText: 'group-hover:text-amber-200',
      glowGradient: 'from-amber-600/20',
      glowRing: 'group-hover:ring-amber-500/30'
    },
    {
      id: 'plano',
      title: 'PLANO DE CURSO',
      description: 'Cronograma trimestral dos conteúdos.',
      image: '/src/assets/images/plano_curso_premium_1779983225779.png',
      action: () => setView('plano'),
      colorName: 'Rosa Coral',
      badgeClass: 'bg-rose-50 text-rose-700 border border-rose-200/60 shadow-sm',
      barBg: 'bg-rose-500',
      hoverBorder: 'hover:border-rose-500/80 hover:shadow-rose-500/10',
      hoverText: 'group-hover:text-rose-200',
      glowGradient: 'from-rose-600/20',
      glowRing: 'group-hover:ring-rose-500/30'
    },
    {
      id: 'decolonial',
      title: 'GESTÃO DO PROFESSOR',
      description: 'Decolonização de corpos, identidades e mídias.',
      image: '/src/assets/images/gestao_professor_premium_1779983261744.png',
      action: () => setView('decolonial'),
      colorName: 'Púrpura',
      badgeClass: 'bg-purple-50 text-purple-700 border border-purple-200/60 shadow-sm',
      barBg: 'bg-purple-500',
      hoverBorder: 'hover:border-purple-500/80 hover:shadow-purple-500/10',
      hoverText: 'group-hover:text-purple-200',
      glowGradient: 'from-purple-600/20',
      glowRing: 'group-hover:ring-purple-500/30'
    },
    {
      id: 'calendar',
      title: 'CALENDÁRIO ESCOLAR 2026',
      description: 'Calendário letivo oficial da Rede SEEDUC/RJ.',
      image: '/src/assets/images/calendario_2026_premium_1779983280133.png',
      action: () => setView('calendar'),
      colorName: 'Laranja Flame',
      badgeClass: 'bg-orange-50 text-orange-700 border border-orange-200/60 shadow-sm',
      barBg: 'bg-orange-500',
      hoverBorder: 'hover:border-orange-500/80 hover:shadow-orange-500/10',
      hoverText: 'group-hover:text-orange-200',
      glowGradient: 'from-orange-600/20',
      glowRing: 'group-hover:ring-orange-500/30'
    },
    {
      id: 'daily-activities',
      title: 'REGISTRO DIÁRIO',
      description: 'Lançamento e diário de atividades das aulas.',
      image: '/src/assets/images/registro_diario_premium_1779983296811.png',
      action: () => setView('daily-activities'),
      colorName: 'Menta / Teal',
      badgeClass: 'bg-teal-50 text-teal-700 border border-teal-200/60 shadow-sm',
      barBg: 'bg-teal-400',
      hoverBorder: 'hover:border-teal-500/80 hover:shadow-teal-500/10',
      hoverText: 'group-hover:text-teal-200',
      glowGradient: 'from-teal-600/20',
      glowRing: 'group-hover:ring-teal-500/30'
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-100px)] animate-fade-in -mx-3 md:-mx-6 -mt-3 md:-mt-6 p-4 md:p-8 overflow-hidden">
      {/* Light Overlay to let background slider shine through elegantly */}
      <div className="absolute inset-0 z-0 bg-[#fdfaf6]/10" />

      <div className="relative z-10 space-y-6 md:space-y-10 w-full px-4 md:px-8">
        {/* Header (Integrated for Premium Feel) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-300/80">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Prof. André Brito</h2>
            <p className="text-xs md:text-sm font-bold text-sky-600 tracking-[0.3em] uppercase mt-1">Controle de Aulas • Ed. Física & Geografia</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status do Sistema</p>
            <p className="text-xs font-bold text-green-600">ONLINE • SINCRONIZADO</p>
          </div>
        </div>

        {/* Real-time Stats Panel - Premium Light Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-6 rounded-[2rem] flex items-center gap-5 shadow-md group hover:border-sky-500/50 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-white rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-slate-200">👥</div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mb-1">Total de Alunos</p>
                <p className="text-3xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">201</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-6 rounded-[2rem] flex items-center gap-5 shadow-md group hover:border-emerald-500/50 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-white rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-slate-200">📈</div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mb-1">Média Assiduidade</p>
                <p className="text-3xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">87%</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-6 rounded-[2rem] flex items-center gap-5 shadow-md group hover:border-amber-500/50 transition-all duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-white rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-slate-200">🏫</div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mb-1">Turmas Ativas</p>
                <p className="text-3xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">9</p>
              </div>
            </div>
        </div>

        {/* Cards Grid - High Fidelity Illustrations with Light-Translucent protection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {menuCards.map((card) => (
            <div 
              key={card.id}
              onClick={card.action}
              className={`relative aspect-video sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-[2.5rem] cursor-pointer group shadow-lg border border-slate-200 bg-white/95 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${card.hoverBorder}`}
            >
              {/* Category / Color Tag */}
              <div className="absolute top-4 inset-x-0 flex justify-center z-20 pointer-events-none">
                <span className={`px-3 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm ${card.badgeClass}`}>
                  {card.colorName}
                </span>
              </div>

              {/* Card Illustration Background - Beautifully visible illustrations with smooth text protection gradient */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transform group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Dynamic colored wash overlay */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${card.glowGradient} via-transparent to-transparent opacity-45 group-hover:opacity-75 transition-opacity duration-500 z-[1]`} />
                
                {/* Text protection dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent transition-all duration-500 z-[2]"></div>
              </div>
              
              {/* Content Overlay - Centered and safely framed inside card */}
              <div className="absolute inset-0 p-4 sm:p-5 lg:p-6 z-10 flex flex-col justify-end items-center text-center h-full w-full">
                {/* Small indicator bar */}
                <div className={`w-10 h-[3px] ${card.barBg} rounded-full mb-3 group-hover:w-16 transition-all duration-300 mx-auto`}></div>

                <h3 className={`text-base sm:text-lg lg:text-xl font-black text-white mb-2 tracking-tight ${card.hoverText} transition-all uppercase leading-snug text-center px-1 w-full break-normal [word-break:keep-all] hyphens-none`}>
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-bold leading-relaxed group-hover:text-slate-100 transition-colors text-center px-1 w-full">
                  {card.description}
                </p>
              </div>

              {/* Selection Indicator Glow */}
              <div className={`absolute inset-0 ring-1 ring-slate-900/5 ${card.glowRing} rounded-[2.5rem] transition-all duration-300 z-20`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
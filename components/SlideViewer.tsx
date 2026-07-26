import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, BookOpen, Lightbulb, MessageSquare, Edit3, BookmarkCheck, Award, Users, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CORPO_MIDIA_SLIDES, ALTINHA_FUTVOLEI_SLIDES, SLIDES_PARALIMPICO } from '../data/corpoMidiaSlides';

// Componente para Ilustrações Visuais / Diagramas de cada Slide
const SlideGraphicIllustration: React.FC<{ graphicType?: string }> = ({ graphicType }) => {
  if (!graphicType) return null;

  switch (graphicType) {
    case 'acolhimento_roda':
      return (
        <div className="w-full bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-xl p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="flex-1 space-y-2 text-left">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-indigo-500/30">
              📸 Ilustração Pedagógica: Roda de Conversa
            </span>
            <h4 className="text-lg font-extrabold text-white">Retorno de Férias & Escuta Ativa</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Disposição circular das carteiras estimulando a igualdade de fala entre o professor e os alunos do Ensino Regular.
            </p>
          </div>
          <div className="w-full md:w-56 h-36 bg-slate-900/90 rounded-lg border border-indigo-500/40 p-3 flex flex-col justify-center items-center relative overflow-hidden shrink-0">
            {/* SVG Diagram: Roda de Conversa */}
            <svg viewBox="0 0 200 120" className="w-full h-full">
              <circle cx="100" cy="60" r="40" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="100" cy="60" r="10" fill="#4f46e5" />
              <text x="100" y="63" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">PROF</text>
              {/* Alunos ao redor */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const cx = 100 + 40 * Math.cos(rad);
                const cy = 60 + 40 * Math.sin(rad);
                return (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="6" fill="#10b981" />
                    <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
                  </g>
                );
              })}
            </svg>
            <span className="text-[10px] font-bold text-indigo-300 mt-1">Símbolo: Roda de Diálogo Equitativo</span>
          </div>
        </div>
      );

    case 'acessibilidade_quadro':
      return (
        <div className="w-full bg-slate-900/90 border border-emerald-500/30 rounded-xl p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="flex-1 space-y-2 text-left">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/30">
              ♿ Infográfico: Os 3 Pilares da Acessibilidade
            </span>
            <h4 className="text-lg font-extrabold text-white">Símbolo Internacional de Acessibilidade</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Autonomia, segurança e eliminações de barreiras arquitetônicas, comunicação e atitude social.
            </p>
          </div>
          <div className="w-full md:w-56 h-36 bg-emerald-950/60 rounded-lg border border-emerald-500/40 p-3 flex justify-around items-center shrink-0">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 text-xl mx-auto mb-1">♿</div>
              <span className="text-[10px] font-bold text-emerald-200 block">Física</span>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 text-xl mx-auto mb-1">⠃⠗</div>
              <span className="text-[10px] font-bold text-emerald-200 block">Braille</span>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 text-xl mx-auto mb-1">🤝</div>
              <span className="text-[10px] font-bold text-emerald-200 block">Atitude</span>
            </div>
          </div>
        </div>
      );

    case 'historia_paralimpica':
      return (
        <div className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-amber-500/30 rounded-xl p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="flex-1 space-y-2 text-left">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-amber-500/30">
              🏅 Linha do Tempo: Movimento Paralímpico
            </span>
            <h4 className="text-lg font-extrabold text-white">Stoke Mandeville (1948) ➔ Roma (1960)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Criado pelo Dr. Ludwig Guttmann para a reabilitação de lesionados de guerra, evoluindo para a 2ª maior competição do planeta.
            </p>
          </div>
          <div className="w-full md:w-56 h-36 bg-slate-900 rounded-lg border border-amber-500/40 p-3 flex flex-col justify-center items-center shrink-0">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              {/* Agitos Paralímpicos em SVG */}
              <path d="M 60,30 C 50,20 30,30 40,50 C 50,70 70,60 60,30 Z" fill="#eb172b" />
              <path d="M 100,20 C 90,10 70,20 80,40 C 90,60 110,50 100,20 Z" fill="#0000ff" />
              <path d="M 140,35 C 130,25 110,35 120,55 C 130,75 150,65 140,35 Z" fill="#008200" />
              <text x="100" y="85" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="extrabold">AGITOS PARALÍMPICOS</text>
            </svg>
          </div>
        </div>
      );

    case 'volei_sentado_quadro':
      return (
        <div className="w-full bg-slate-900 border border-sky-500/40 rounded-xl p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="flex-1 space-y-2 text-left">
            <span className="bg-sky-500/20 text-sky-300 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-sky-500/30">
              🏐 Diagrama da Quadra: Vôlei Sentado (World ParaVolley)
            </span>
            <h4 className="text-lg font-extrabold text-white">Quadra 10m x 6m • Rede de 1,15m (M) / 1,05m (F)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Regra do Glúteo: O atleta deve manter o bumbum em contato com o chão ao golpear a bola.
            </p>
          </div>
          <div className="w-full md:w-60 h-36 bg-slate-950 rounded-lg border border-sky-400 p-2 relative flex items-center justify-center shrink-0">
            <svg viewBox="0 0 200 110" className="w-full h-full">
              {/* Quadra */}
              <rect x="20" y="15" width="160" height="80" fill="#0369a1" stroke="#ffffff" strokeWidth="2" />
              {/* Rede */}
              <line x1="100" y1="15" x2="100" y2="95" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3 2" />
              {/* Linha de Ataque (2m) */}
              <line x1="68" y1="15" x2="68" y2="95" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="132" y1="15" x2="132" y2="95" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
              {/* Texto de Medidas */}
              <text x="100" y="10" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">10 METROS</text>
              <text x="10" y="60" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold" transform="rotate(-90 10 60)">6 METROS</text>
              <text x="100" y="60" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="extrabold">REDE 1,15m</text>
            </svg>
          </div>
        </div>
      );

    case 'barreiras_cidade':
      return (
        <div className="w-full bg-slate-900 border border-purple-500/40 rounded-xl p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="flex-1 space-y-2 text-left">
            <span className="bg-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-purple-500/30">
              🏙️ Tipologia: Barreiras da Cidade e da Escola
            </span>
            <h4 className="text-lg font-extrabold text-white">Arquitetônica (Física) vs Atitudinal (Comportamento)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enquanto rampas resolvem a barreira física, a empatia e o fim do preconceito resolvem a barreira atitudinal.
            </p>
          </div>
          <div className="w-full md:w-56 h-36 bg-slate-950 rounded-lg border border-purple-500/40 p-3 flex justify-around items-center shrink-0">
            <div className="text-center">
              <div className="w-12 h-12 bg-rose-500/20 border border-rose-500 rounded-lg flex items-center justify-center text-xl text-rose-300 mb-1">🧱</div>
              <span className="text-[10px] font-bold text-rose-300">Degraus / Buracos</span>
            </div>
            <div className="text-center text-slate-400 font-bold text-xs">VS</div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500 rounded-lg flex items-center justify-center text-xl text-emerald-300 mb-1">♿</div>
              <span className="text-[10px] font-bold text-emerald-300">Rampas & Respeito</span>
            </div>
          </div>
        </div>
      );

    case 'exercicio_quadro':
      return (
        <div className="w-full bg-emerald-950/80 border border-emerald-500/50 rounded-xl p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="flex-1 space-y-2 text-left">
            <span className="bg-emerald-500/30 text-emerald-200 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-400">
              📝 Exercício de Fixação no Caderno
            </span>
            <h4 className="text-lg font-extrabold text-white">Atividade Individual de Estudo Teórico</h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Questões valendo visto de nota para substituição de livro didático.
            </p>
          </div>
          <div className="w-full md:w-48 h-32 bg-emerald-900/90 rounded-lg border-2 border-dashed border-emerald-400 p-3 flex flex-col justify-center items-center text-center shrink-0">
            <Award className="text-amber-400 mb-1" size={28} />
            <span className="text-xs font-black text-white uppercase">Visto Teórico</span>
            <span className="text-[10px] font-bold text-emerald-200 mt-1">100% Cópia no Caderno</span>
          </div>
        </div>
      );

    case 'fechamento_visto':
      return (
        <div className="w-full bg-slate-900 border border-indigo-500/40 rounded-xl p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="flex-1 space-y-2 text-left">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-indigo-500/30">
              ✅ Conferência & Fechamento
            </span>
            <h4 className="text-lg font-extrabold text-white">Visto do Professor e Próxima Aula</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Registro concluído e verificação individual das carteiras.
            </p>
          </div>
          <div className="w-full md:w-48 h-32 bg-indigo-950 rounded-lg border border-indigo-400 p-3 flex flex-col justify-center items-center text-center shrink-0">
            <BookmarkCheck className="text-emerald-400 mb-1" size={32} />
            <span className="text-xs font-black text-white uppercase">Anotações Salvas</span>
            <span className="text-[10px] text-indigo-200">2º Trimestre 2026</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const SlideViewer: React.FC<{ onClose: () => void, slideType?: 'corpo-midia' | 'altinha-futvolei' | 'paralimpico' | string }> = ({ onClose, slideType = 'corpo-midia' }) => {
  const getSlides = () => {
    if (slideType === 'altinha-futvolei') return ALTINHA_FUTVOLEI_SLIDES;
    if (slideType === 'paralimpico') return SLIDES_PARALIMPICO;
    return CORPO_MIDIA_SLIDES;
  };

  const slides = getSlides();
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prev = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = slides[currentSlide];

  const getHeaderTitle = () => {
    if (slideType === 'altinha-futvolei') return 'Altinha & Futevôlei';
    if (slideType === 'paralimpico') return 'Retorno de Férias & Esporte Paralímpico (Teoria & Quadro)';
    return 'Debate: Corpo e Mídia';
  };

  const isTeacherTalk = (slide as any)?.category === 'ROTEIRO_PROFESSOR' || slide.title?.includes('FALA DO PROFESSOR') || slide.title?.includes('ROTEIRO DO PROFESSOR');
  const isBoardCopy = (slide as any)?.category === 'LOUSA_ALUNO' || slide.title?.includes('CONTEÚDO NO QUADRO') || slide.title?.includes('LOUSA');

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 flex flex-col h-screen overflow-hidden text-slate-100">
      {/* Header */}
      <div className="shrink-0 flex justify-between items-center px-6 py-4 bg-slate-800/90 backdrop-blur border-b border-slate-700 shadow-md">
        <div className="flex items-center gap-3">
          <BookOpen className="text-indigo-400" size={24} />
          <div>
            <h1 className="text-xl font-black font-sans tracking-tight uppercase text-slate-100">{getHeaderTitle()}</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Aulas Teóricas de Educação Física • Sem Livro Didático</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <span className="font-extrabold text-sm tracking-widest bg-slate-700/80 px-3 py-1 rounded-full text-indigo-300 border border-slate-600">
              SLIDE {currentSlide + 1} / {slides.length}
            </span>
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-colors">
              <X size={24} />
            </button>
        </div>
      </div>

      {/* Main Slide Area */}
      <div className="flex-1 overflow-hidden p-4 md:p-6 relative flex flex-col justify-center items-center bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-5xl h-full flex flex-col justify-between"
          >
            <div className={`w-full h-full p-6 md:p-10 rounded-2xl shadow-2xl overflow-y-auto flex flex-col justify-between relative transition-all border ${
              isBoardCopy 
                ? 'bg-slate-900/95 border-emerald-500/50 shadow-emerald-950/50' 
                : 'bg-slate-900 border-slate-800'
            }`}>
              {/* Type Badge Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                {isTeacherTalk && (
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
                    <MessageSquare size={16} /> 🗣️ ROTEIRO DO PROFESSOR (Fala, Explicação & Roteiro)
                  </div>
                )}
                {isBoardCopy && (
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
                    <Edit3 size={16} /> ✍️ LOUSA • CÓPIA INTEGRAL NO CADERNO (Matéria do Aluno)
                  </div>
                )}

                {/* Referências de Ensino / BNCC */}
                {(slide as any).referencias && (slide as any).referencias.length > 0 && (
                  <div className="text-[11px] font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-md border border-slate-700 truncate max-w-md">
                    📚 {(slide as any).referencias[0]}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-2xl md:text-4xl font-black mb-2 text-white uppercase tracking-tight leading-tight">{slide.title}</h2>
                {slide.subtitle && <p className="text-lg md:text-xl mb-4 text-indigo-400 font-bold leading-relaxed">{slide.subtitle}</p>}

                {/* Graphic Diagram / Illustration */}
                <SlideGraphicIllustration graphicType={(slide as any).graphicType} />

                {/* Speech Script Box for Teacher Slides */}
                {isTeacherTalk && (slide as any).speechScript && (
                  <div className="mb-6 p-5 bg-amber-950/40 border border-amber-500/40 rounded-xl space-y-3">
                    <span className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
                      <Users size={16} /> Roteiro de Exposição Verbal & Perguntas para a Turma:
                    </span>
                    <ul className="space-y-2.5">
                      {(slide as any).speechScript.map((scriptLine: string, idx: number) => (
                        <li key={idx} className="text-sm md:text-base text-amber-100 font-medium leading-relaxed pl-2 border-l-2 border-amber-500/50">
                          {scriptLine}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Main Content paragraph */}
                {slide.content && (
                  <p className="text-base md:text-lg leading-relaxed text-slate-300 mb-6 bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
                    {slide.content}
                  </p>
                )}
                
                {/* Chalkboard Box for Board Copy Slides */}
                {isBoardCopy && (
                  <div className="my-4 p-6 bg-slate-950 border-2 border-emerald-500/40 rounded-2xl shadow-inner font-sans relative">
                    <div className="absolute top-3 right-4 bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border border-emerald-500/30">
                      REGISTRO NA LOUSA
                    </div>
                    {(slide as any).quadroHeader && (
                      <h3 className="text-xl md:text-2xl font-black text-emerald-400 tracking-tight uppercase mb-4 border-b border-emerald-500/30 pb-2">
                        {(slide as any).quadroHeader}
                      </h3>
                    )}
                    {slide.points && (
                      <ul className="space-y-3">
                        {slide.points.map((p, i) => {
                          const firstColonIndex = p.indexOf(':');
                          if (firstColonIndex !== -1) {
                            const boldPart = p.substring(0, firstColonIndex).replace(/\*\*/g, '');
                            const rest = p.substring(firstColonIndex + 1);
                            return (
                              <li key={i} className="text-sm md:text-lg text-slate-100 leading-relaxed pl-2 border-l-2 border-emerald-500">
                                <strong className="font-extrabold text-emerald-300">{boldPart}:</strong>{rest}
                              </li>
                            );
                          }
                          return (
                            <li key={i} className="text-sm md:text-lg text-slate-100 leading-relaxed pl-2 border-l-2 border-emerald-500">
                              {p}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}

                {/* Generic Points for slides without board box */}
                {!isBoardCopy && slide.points && (
                  <ul className="space-y-3">
                    {slide.points.map((p, i) => {
                      const firstColonIndex = p.indexOf(':');
                      if (firstColonIndex !== -1) {
                           const boldPart = p.substring(0, firstColonIndex).replace(/\*\*/g, '');
                           const rest = p.substring(firstColonIndex + 1);
                           return (
                              <li key={i} className="text-sm md:text-lg text-slate-200 list-disc ml-6 leading-relaxed">
                                  <strong className="font-extrabold text-indigo-300">{boldPart}:</strong>{rest}
                              </li>
                           );
                      }
                      return (
                          <li key={i} className="text-sm md:text-lg text-slate-200 list-disc ml-6 leading-relaxed">
                            {p}
                          </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Teacher Tip Box */}
              {(slide as any).dicaProfessor && (
                <div className="mt-6 p-4 bg-indigo-950/80 border border-indigo-800/60 rounded-xl flex items-start gap-3 text-indigo-200 shadow-md">
                  <Lightbulb size={22} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-amber-400 block mb-1">Dica Pedagógica para o Professor:</span>
                    <p className="text-xs md:text-sm font-medium leading-relaxed text-indigo-100">{(slide as any).dicaProfessor}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls Bar */}
      <div className="shrink-0 p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center max-w-5xl mx-auto w-full">
        <button 
          onClick={prev} 
          disabled={currentSlide === 0} 
          className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl disabled:opacity-30 disabled:hover:bg-slate-800 font-bold transition-all border border-slate-700 shadow-md active:scale-95"
        >
          <ArrowLeft size={20}/> Anterior
        </button>

        <div className="flex gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-indigo-500 w-8' : 'bg-slate-700 hover:bg-slate-600'}`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={next} 
          disabled={currentSlide === slides.length - 1} 
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl disabled:opacity-30 disabled:hover:bg-indigo-600 font-bold transition-all border border-indigo-500 shadow-md active:scale-95"
        >
          Próximo <ArrowRight size={20}/>
        </button>
      </div>
    </div>
  );
};




import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, BookOpen, Lightbulb, MessageSquare, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CORPO_MIDIA_SLIDES, ALTINHA_FUTVOLEI_SLIDES, SLIDES_PARALIMPICO } from '../data/corpoMidiaSlides';

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
    if (slideType === 'paralimpico') return 'Retorno de Férias & Esporte Paralímpico (Teoria)';
    return 'Debate: Corpo e Mídia';
  };

  const isTeacherTalk = slide.title?.includes('FALA DO PROFESSOR');
  const isBoardCopy = slide.title?.includes('CONTEÚDO NO QUADRO');

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 flex flex-col h-screen overflow-hidden text-slate-100">
      {/* Header */}
      <div className="shrink-0 flex justify-between items-center px-6 py-4 bg-slate-800/90 backdrop-blur border-b border-slate-700 shadow-md">
        <div className="flex items-center gap-3">
          <BookOpen className="text-indigo-400" size={24} />
          <h1 className="text-xl font-black font-sans tracking-tight uppercase text-slate-100">{getHeaderTitle()}</h1>
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
      <div className="flex-1 overflow-hidden p-4 md:p-8 relative flex flex-col justify-center items-center bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-5xl h-full flex flex-col justify-between"
          >
            <div className="w-full h-full bg-slate-900 p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-800 overflow-y-auto flex flex-col justify-between relative">
              {/* Type Badge Header */}
              {isTeacherTalk && (
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest mb-4 w-fit">
                  <MessageSquare size={16} /> Momento de Exposição / Fala do Professor (Sem cópia)
                </div>
              )}
              {isBoardCopy && (
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest mb-4 w-fit">
                  <Edit3 size={16} /> Conteúdo Obrigatório para Copiar no Caderno
                </div>
              )}

              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-4 text-white uppercase tracking-tight leading-tight">{slide.title}</h2>
                {slide.subtitle && <p className="text-xl md:text-2xl mb-6 text-indigo-400 font-bold leading-relaxed">{slide.subtitle}</p>}
                {slide.content && <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">{slide.content}</p>}
                
                {slide.points && (
                  <ul className="space-y-4">
                    {slide.points.map((p, i) => {
                      const firstColonIndex = p.indexOf(':');
                      if (firstColonIndex !== -1) {
                           const boldPart = p.substring(0, firstColonIndex).replace(/\*\*/g, '');
                           const rest = p.substring(firstColonIndex + 1);
                           return (
                              <li key={i} className="text-base md:text-xl text-slate-200 list-disc ml-6 leading-relaxed">
                                  <strong className="font-extrabold text-indigo-300">{boldPart}:</strong>{rest}
                              </li>
                           );
                      }
                      return (
                          <li key={i} className="text-base md:text-xl text-slate-200 list-disc ml-6 leading-relaxed">
                            {p}
                          </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Teacher Tip Box */}
              {(slide as any).dicaProfessor && (
                <div className="mt-8 p-4 bg-indigo-950/60 border border-indigo-800/50 rounded-xl flex items-start gap-3 text-indigo-200">
                  <Lightbulb size={22} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-amber-400 block mb-1">Dica Pedagógica para o Professor:</span>
                    <p className="text-sm font-medium leading-relaxed text-indigo-100">{(slide as any).dicaProfessor}</p>
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



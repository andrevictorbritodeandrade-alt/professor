import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  ArrowRight, 
  BookOpen, 
  Users, 
  Presentation, 
  Calendar, 
  Award,
  Sparkles
} from 'lucide-react';

interface PortalViewProps {
  onSelectAccess: (level: 'alunos' | 'professor_login') => void;
}

export const PortalView: React.FC<PortalViewProps> = ({ onSelectAccess }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-between p-4 md:p-8 overflow-y-auto custom-scrollbar">
      {/* Decorative Top Ambient Light Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[120px] bg-sky-500/10 blur-[100px] pointer-events-none rounded-full" />
      
      {/* Top Header Section */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-6 md:mt-12 py-4">
        {/* Soft Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-xl mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
          <span className="text-[10px] md:text-xs font-bold text-cyan-200 tracking-[0.25em] uppercase">
            Plataforma Multidisciplinar • Ano Letivo 2026
          </span>
        </motion.div>

        {/* Core Title (Gradient & High-Contrast) */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-4"
        >
          PORTAL PEDAGÓGICO <br />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 text-transparent bg-clip-text animate-gradient-text uppercase">
            Prof. André Brito
          </span>
        </motion.h1>

        {/* Captivating Intro Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs md:text-base text-slate-300 max-w-2xl font-light leading-relaxed px-4"
        >
          Canal integrado de estudos e acompanhamento acadêmico. 
          Acesse como Aluno para conferir os conteúdos de Educação Física e Geografia, ou como Professor para a gestão de diários e pautas.
        </motion.p>
      </div>

      {/* Selection Grid for Portals */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-8 px-2 md:px-4"
      >
        {/* --- STUDENTS PORTAL PANEL --- */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          onClick={() => onSelectAccess('alunos')}
          className="group relative overflow-hidden rounded-[2.5rem] bg-slate-950/40 border border-white/10 hover:border-cyan-500/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between p-8 md:p-10 transition-all duration-300 cursor-pointer min-h-[350px]"
        >
          {/* Cyan Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-md bg-cyan-400/0 group-hover:bg-cyan-400/80 transition-all duration-500" />

          {/* Top section with Pill-badge + Icon */}
          <div className="flex justify-between items-start">
            <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-extrabold text-cyan-300 uppercase tracking-widest">
              Acesso Alunos
            </span>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Title & Desc */}
          <div className="mt-8">
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider group-hover:text-cyan-300 transition-colors duration-300">
              Alunos
            </h2>
            <p className="text-sm text-slate-400 mt-2 font-light leading-relaxed">
              Consulte os resumos de aulas, slides interativos, biblioteca complementar e cronograma para as turmas de Geografia e Educação Física.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6 pt-6 border-t border-white/5 text-[11px] text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></span>
              Educação Física
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></span>
              Geografia
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></span>
              Biblioteca Escolar
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></span>
              Slides de Aula
            </div>
          </div>

          {/* Action Footer Button */}
          <div className="mt-8 flex items-center justify-between text-cyan-400 font-bold text-xs uppercase tracking-widest pt-2">
            <span>Acessar Painel</span>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </motion.div>

        {/* --- PROFESSOR PORTAL PANEL --- */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          onClick={() => onSelectAccess('professor_login')}
          className="group relative overflow-hidden rounded-[2.5rem] bg-slate-950/40 border border-white/10 hover:border-emerald-500/50 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between p-8 md:p-10 transition-all duration-300 cursor-pointer min-h-[350px]"
        >
          {/* Emerald Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-md bg-emerald-400/0 group-hover:bg-emerald-400/80 transition-all duration-500" />

          {/* Top section with Pill-badge + Icon */}
          <div className="flex justify-between items-start">
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-extrabold text-emerald-300 uppercase tracking-widest">
              Área Restrita
            </span>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Title & Desc */}
          <div className="mt-8">
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider group-hover:text-emerald-300 transition-colors duration-300">
              Professor
            </h2>
            <p className="text-sm text-slate-400 mt-2 font-light leading-relaxed">
              Consulte históricos de pauta, preencha presenças, gerencie planos de curso e analise o desempenho acadêmico das turmas.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6 pt-6 border-t border-white/5 text-[11px] text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80"></span>
              Chamada Eletrônica
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80"></span>
              Diários de Classe
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80"></span>
              Planos Pedagógicos
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80"></span>
              Estatísticas Gerais
            </div>
          </div>

          {/* Action Footer Button */}
          <div className="mt-8 flex items-center justify-between text-emerald-400 font-bold text-xs uppercase tracking-widest pt-2">
            <span>Acessar Painel</span>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Aesthetic Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between mt-auto mb-4 px-4 text-center md:text-left gap-4 text-xs font-mono text-slate-400 border-t border-white/5 pt-6"
      >
        <div className="flex items-center gap-2">
          <Award size={14} className="text-amber-400" />
          <span>Professor André Victor Brito de Andrade • CREF 039443 G/RJ</span>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px]">Portal Sincronizado</span>
          </div>
          <p>© 2026 Rio de Janeiro • Versão 1.1</p>
        </div>
      </motion.div>
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  ArrowRight, 
  Award
} from 'lucide-react';
import heroImage from '../assets/images/theoretical_studies_hero_1785433620164.jpg';

interface PortalViewProps {
  onSelectAccess: (level: 'alunos' | 'professor_login') => void;
}

export const PortalView: React.FC<PortalViewProps> = ({ onSelectAccess }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 90, damping: 15 } 
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-between p-4 md:p-8 overflow-y-auto custom-scrollbar bg-slate-50/50">
      
      {/* Decorative Top Ambient Light Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-400/20 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-400/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Top Header Section */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-6 md:mt-12 py-4">
        
        {/* Artistic Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, type: "spring", damping: 20 }}
          className="relative w-28 h-28 md:w-36 md:h-36 mb-6 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(59,130,246,0.15)] border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer"
        >
          <img src={heroImage} alt="Arte Conteúdos Teóricos" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-6"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-700 tracking-[0.25em] uppercase">
            Plataforma Multidisciplinar • Ano Letivo 2026
          </span>
        </motion.div>

        {/* Core Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", damping: 20 }}
          className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-6 drop-shadow-sm flex flex-col items-center"
        >
          <span className="block text-4xl md:text-6xl lg:text-7xl">CONTEÚDOS TEÓRICOS</span>
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-transparent bg-clip-text uppercase mt-2 inline-block drop-shadow-sm text-2xl md:text-4xl lg:text-5xl">
            Prof. André Brito
          </span>
        </motion.h1>

        {/* Intro Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm md:text-lg text-slate-600 max-w-2xl font-medium leading-relaxed px-4"
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
          className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 hover:border-blue-400 shadow-xl shadow-slate-200/50 flex flex-col justify-between p-8 md:p-10 transition-all duration-300 cursor-pointer min-h-[350px]"
        >
          <div className="absolute left-0 top-1/4 bottom-1/4 w-[4px] rounded-r-md bg-blue-500/0 group-hover:bg-blue-500 transition-all duration-500" />

          {/* Top section with Pill-badge + Icon */}
          <div className="flex justify-between items-start">
            <span className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-extrabold text-blue-700 uppercase tracking-widest">
              Acesso Alunos
            </span>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Title & Desc */}
          <div className="mt-8">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-wider group-hover:text-blue-700 transition-colors duration-300">
              Alunos
            </h2>
            <p className="text-sm text-slate-600 mt-3 font-medium leading-relaxed">
              Consulte os resumos de aulas, slides interativos, biblioteca complementar e cronograma para as turmas de Geografia e Educação Física.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-6 pt-6 border-t border-slate-100 text-xs text-slate-600 font-bold">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Educação Física
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Geografia
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Biblioteca Escolar
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Slides de Aula
            </div>
          </div>

          {/* Action Footer Button */}
          <div className="mt-8 flex items-center justify-between text-blue-700 font-black text-xs uppercase tracking-widest pt-2">
            <span>Acessar Painel</span>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </motion.div>

        {/* --- PROFESSOR PORTAL PANEL --- */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          onClick={() => onSelectAccess('professor_login')}
          className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 hover:border-emerald-400 shadow-xl shadow-slate-200/50 flex flex-col justify-between p-8 md:p-10 transition-all duration-300 cursor-pointer min-h-[350px]"
        >
          <div className="absolute left-0 top-1/4 bottom-1/4 w-[4px] rounded-r-md bg-emerald-500/0 group-hover:bg-emerald-500 transition-all duration-500" />

          {/* Top section with Pill-badge + Icon */}
          <div className="flex justify-between items-start">
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest">
              Área Restrita
            </span>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Title & Desc */}
          <div className="mt-8">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-wider group-hover:text-emerald-700 transition-colors duration-300">
              Professor
            </h2>
            <p className="text-sm text-slate-600 mt-3 font-medium leading-relaxed">
              Consulte históricos de pauta, preencha presenças, gerencie planos de curso e analise o desempenho acadêmico das turmas.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-6 pt-6 border-t border-slate-100 text-xs text-slate-600 font-bold">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Chamada Eletrônica
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Diários de Classe
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Planos Pedagógicos
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Estatísticas Gerais
            </div>
          </div>

          {/* Action Footer Button */}
          <div className="mt-8 flex items-center justify-between text-emerald-700 font-black text-xs uppercase tracking-widest pt-2">
            <span>Acessar Painel</span>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Aesthetic Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between mt-auto mb-4 px-4 text-center md:text-left gap-4 text-xs font-mono text-slate-500 border-t border-slate-200 pt-6 font-medium"
      >
        <div className="flex items-center gap-2">
          <Award size={16} className="text-amber-500" />
          <span>Professor André Victor Brito de Andrade • CREF 039443 G/RJ</span>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Portal Sincronizado</span>
          </div>
          <p>© 2026 Rio de Janeiro • Versão 1.1</p>
        </div>
      </motion.div>
    </div>
  );
};

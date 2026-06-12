import React from 'react';
import { Sparkles, Eye, ShieldAlert, Award } from 'lucide-react';

interface ChalkboardDiagramProps {
  title?: string;
  topic?: string;
  parentTitle?: string;
}

export const ChalkboardDiagram: React.FC<ChalkboardDiagramProps> = ({ title = '', topic = '', parentTitle = '' }) => {
  const normTitle = (title + ' ' + topic).toUpperCase();
  const normParent = parentTitle.toUpperCase();

  // Helper flags based on the parent lesson's sport
  const isParentFutsal = normParent.includes('FUTSAL');
  const isParentVolei = normParent.includes('VÔLEI') || normParent.includes('VOLEIBOL');
  const isParentFutevolei = normParent.includes('FUTEVÔLEI') || normParent.includes('FUTVOLEI') || normParent.includes('ALTINHA');
  const isParentBasquete = normParent.includes('BASQUETE');
  const isParentHandebol = normParent.includes('HANDEBOL');
  const isParentFutebol = normParent.includes('FUTEBOL') && !normParent.includes('FUTSAL') && !normParent.includes('FUTEBOL DE 5') && !normParent.includes('FUTEBOL DE CINCO');
  const isParentFutebol5 = normParent.includes('FUTEBOL DE 5') || normParent.includes('FUTEBOL DE CINCO') || normParent.includes('PARADESPORTO');
  const isParentVoleiSentado = normParent.includes('SENTADO') || (normParent.includes('PARADESPORTO') && normParent.includes('VÔLEI'));

  // Helper patterns for matching, prioritizing parent context to avoid cross-sport false positives (e.g., matching Volley court on Futsal slides containing the word "Posições")
  const isFutevolei = isParentFutevolei || normTitle.includes('FUTEVÔLEI') || normTitle.includes('FUTVOLEI');
  
  const isFutsalMedidas = (isParentFutsal && (
    normTitle.includes('DIMENSÕES') ||
    normTitle.includes('MEDIDAS') ||
    normTitle.includes('ROTEIRO') ||
    normTitle.includes('QUADRA') ||
    normTitle.includes('POSIÇÕES') ||
    normTitle.includes('ATRIBUIÇÕES') ||
    normTitle.includes('REGULAMENTO') ||
    normTitle.includes('CARTÕES') ||
    normTitle.includes('REGRAS')
  )) || (
    normTitle.includes('FUTSAL') && (
      normTitle.includes('DIMENSÕES') ||
      normTitle.includes('MEDIDAS') ||
      normTitle.includes('ROTEIRO') ||
      normTitle.includes('QUADRA')
    )
  );

  const isFutsalTatico = (isParentFutsal && (
    normTitle.includes('SISTEMA') ||
    normTitle.includes('TÁTICO') ||
    normTitle.includes('2-2') ||
    normTitle.includes('3-1') ||
    normTitle.includes('TÁTICA') ||
    normTitle.includes('MOVIMENTAÇÃO') ||
    normTitle.includes('RODÍZIO') ||
    normTitle.includes('MARCAÇÃO') ||
    normTitle.includes('ATAQUE')
  )) || (
    normTitle.includes('SISTEMA TÁTICO 2-2') ||
    normTitle.includes('SISTEMA TÁTICO 3-1') ||
    normTitle.includes('TÁTICO DE PASSE') ||
    (normTitle.includes('FUTSAL') && normTitle.includes('TÁTICA'))
  );

  const isVoleiPosicoes = (isParentVolei && (
    normTitle.includes('POSIÇÕES') ||
    normTitle.includes('RODÍZIO') ||
    normTitle.includes('ATRIBUIÇÕES') ||
    normTitle.includes('REVISÃO') ||
    normTitle.includes('REDE')
  )) || (
    (!isParentFutsal && normTitle.includes('POSIÇÕES')) ||
    normTitle.includes('RODÍZIO') ||
    (normTitle.includes('VÔLEI') && normTitle.includes('MEDIDAS')) ||
    (normTitle.includes('VOLEIBOL') && normTitle.includes('CANTOS'))
  );

  const isVolei6x0 = (isParentVolei && (
    normTitle.includes('6X0') ||
    normTitle.includes('SISTEMA') ||
    normTitle.includes('FLUXO') ||
    normTitle.includes('JOGADA') ||
    normTitle.includes('ATAQUE')
  )) || (
    normTitle.includes('6X0') ||
    (normTitle.includes('VÔLEI') && normTitle.includes('FLUXO')) ||
    normTitle.includes('JOGADA DE ATAQUE')
  );

  const isBasqueteHandebol = isParentBasquete || isParentHandebol ||
    normTitle.includes('BASQUETE') ||
    normTitle.includes('HANDEBOL') ||
    normTitle.includes('CONFRONTANDO AS MEDIDAS');

  const isImpedimento = (isParentFutebol && (
    normTitle.includes('IMPEDIMENTO') ||
    normTitle.includes('REGRA') ||
    normTitle.includes('LINHA')
  )) ||
    normTitle.includes('IMPEDIMENTO') ||
    normTitle.includes('REGRA DO IMPEDIMENTO');

  const isFutebolTatico = (isParentFutebol && (
    normTitle.includes('TÁTICO') ||
    normTitle.includes('SISTEMA') ||
    normTitle.includes('4-4-2') ||
    normTitle.includes('4-3-3') ||
    normTitle.includes('POSICIONAMENTO')
  )) ||
    normTitle.includes('4-4-2') ||
    normTitle.includes('4-3-3') ||
    normTitle.includes('SISTEMAS OFENSIVOS') ||
    normTitle.includes('SISTEMAS DE POSICIONAMENTO');

  const isVoleiSentado = isParentVoleiSentado ||
    normTitle.includes('SENTADO') ||
    (normTitle.includes('PARADESPORTO') && normTitle.includes('VÔLEI'));

  const isFutebol5 = isParentFutebol5 ||
    normTitle.includes('FUTEBOL DE 5') ||
    normTitle.includes('FUTEBOL DE CINCO') ||
    normTitle.includes('GUIZO') ||
    normTitle.includes('ADAPTAÇÕES DE REGRAS');

  // If no match found, render a default board with useful drawing tips
  let diagramType = 'default';
  if (isFutevolei) diagramType = 'futevolei';
  else if (isFutsalMedidas) diagramType = 'futsal_medidas';
  else if (isFutsalTatico) diagramType = 'futsal_tatico';
  else if (isVoleiPosicoes) diagramType = 'volei_posicoes';
  else if (isVolei6x0) diagramType = 'volei_6x0';
  else if (isBasqueteHandebol) diagramType = 'basquete_handebol';
  else if (isImpedimento) diagramType = 'impedimento';
  else if (isFutebolTatico) diagramType = 'futebol_tatico';
  else if (isVoleiSentado) diagramType = 'volei_sentado';
  else if (isFutebol5) diagramType = 'futebol_5';

  // Chalkboard Style (slate-green)
  return (
    <div className="w-full flex flex-col items-center p-3 border-4 border-amber-900 bg-emerald-950 rounded-2xl shadow-xl font-mono text-white relative ring-4 ring-amber-950 max-w-xl mx-auto my-4 shrink-0 transition-all hover:scale-[1.01]">
      {/* Blackboard Title Trim */}
      <div className="absolute top-1 left-3 right-3 flex justify-between items-center text-[9px] text-emerald-400 border-b border-emerald-800 pb-1 select-none">
        <span>🎨 GUIA DE DESENHO FACILITADO (COPIE IGUAL)</span>
        <span className="flex items-center gap-1">
          <Eye size={10} /> AUTISMO ACESSÍVEL
        </span>
      </div>

      {/* SVG Canvas Container */}
      <div className="w-full mt-5 mb-2 bg-[#0d2e1d] rounded-lg border-2 border-dashed border-emerald-800 p-2 overflow-hidden aspect-[4/3] flex items-center justify-center">
        {diagramType === 'futevolei' && (
          <svg viewBox="0 0 400 300" className="w-full h-full text-slate-100 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
            {/* Outline / Court bounds (18x9m proportion 2:1 inside 280x140) */}
            <rect x="60" y="70" width="280" height="140" stroke="white" strokeWidth="2.5" />
            <line x1="200" y1="70" x2="200" y2="210" stroke="yellow" strokeWidth="2.5" /> {/* net */}
            
            {/* Net Post Indicators */}
            <circle cx="200" cy="65" r="4" fill="yellow" stroke="yellow" />
            <circle cx="200" cy="215" r="4" fill="yellow" stroke="yellow" />
            
            {/* Net meshes sketch */}
            <line x1="200" y1="90" x2="200" y2="90" stroke="white" strokeWidth="1" strokeDasharray="3 3"/>
            
            {/* Chalk Text Labels */}
            <text x="200" y="55" fontSize="12" fill="yellow" textAnchor="middle" fontWeight="bold">REDE (Altura: 2,20m)</text>
            
            {/* Horizontal Dimension */}
            <line x1="60" y1="240" x2="340" y2="240" stroke="#a7f3d0" strokeWidth="1.5" />
            <polygon points="60,240 70,235 70,245" fill="#a7f3d0" stroke="none" />
            <polygon points="340,240 330,235 330,245" fill="#a7f3d0" stroke="none" />
            <text x="200" y="258" fontSize="11" fill="#a7f3d0" textAnchor="middle">18 METROS (Linha Lateral)</text>

            {/* Vertical Dimension */}
            <line x1="30" y1="70" x2="30" y2="210" stroke="#a7f3d0" strokeWidth="1.5" />
            <polygon points="30,70 25,80 35,80" fill="#a7f3d0" stroke="none" />
            <polygon points="30,210 25,200 35,200" fill="#a7f3d0" stroke="none" />
            <text x="18" y="145" fontSize="11" fill="#a7f3d0" textAnchor="middle" transform="rotate(-90 18 145)">9 METROS (Fundo)</text>

            {/* Player Positions */}
            <circle cx="120" cy="110" r="8" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2"/>
            <text x="120" y="114" fontSize="9" fill="#38bdf8" textAnchor="middle" fontWeight="bold">A1</text>
            
            <circle cx="140" cy="170" r="8" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2"/>
            <text x="140" y="174" fontSize="9" fill="#38bdf8" textAnchor="middle" fontWeight="bold">A2</text>
            
            <circle cx="280" cy="110" r="8" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="2"/>
            <text x="280" y="114" fontSize="9" fill="#f87171" textAnchor="middle" fontWeight="bold">B1</text>
            
            <circle cx="260" cy="170" r="8" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="2"/>
            <text x="260" y="174" fontSize="9" fill="#f87171" textAnchor="middle" fontWeight="bold">B2</text>

            <text x="130" y="90" fontSize="11" fill="#38bdf8" textAnchor="middle">DUPLA A</text>
            <text x="270" y="90" fontSize="11" fill="#f87171" textAnchor="middle">DUPLA B</text>

            {/* Hint Box inside SVG */}
            <rect x="110" y="10" width="180" height="25" rx="5" fill="#064e3b" stroke="#047857" strokeWidth="1"/>
            <text x="200" y="27" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">💡 PASSO A PASSO NO QUADRO</text>
          </svg>
        )}

        {diagramType === 'futsal_medidas' && (
          <svg viewBox="0 0 400 300" className="w-full h-full text-slate-100 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
            {/* Outline 40x20 proportion (roughly 280x140) */}
            <rect x="60" y="70" width="280" height="140" stroke="white" strokeWidth="2.5" />
            <line x1="200" y1="70" x2="200" y2="210" stroke="white" strokeWidth="2" /> {/* midfield */}
            <circle cx="200" cy="140" r="30" stroke="white" strokeWidth="2" /> {/* center circle */}
            <circle cx="200" cy="140" r="3" fill="white" />{/* kickoff spot */}

            {/* Penalty areas (arcs) R=45 */}
            {/* Draw approximated custom path for penalty zones */}
            <path d="M 60,95 A 45,45 0 0,1 105,140 A 45,45 0 0,1 60,185" stroke="white" strokeWidth="2" />
            <path d="M 340,95 A 45,45 0 0,0 295,140 A 45,45 0 0,0 340,185" stroke="white" strokeWidth="2" />

            {/* Penalty spot dots @ d=42 (6m equivalent approx) */}
            <circle cx="102" cy="140" r="2.5" fill="yellow" />
            <circle cx="298" cy="140" r="2.5" fill="yellow" />
            <text x="105" y="133" fontSize="8" fill="yellow" textAnchor="middle">Pênalti (6m)</text>

            {/* Second Penalty dots at d=70 (10m equivalent approx) */}
            <circle cx="130" cy="140" r="2" fill="yellow" />
            <circle cx="270" cy="140" r="2" fill="yellow" />
            <text x="135" y="152" fontSize="7" fill="yellow" textAnchor="middle">Tiro 10m</text>

            {/* Goals representation */}
            <rect x="48" y="125" width="12" height="30" stroke="red" strokeWidth="2" />
            <rect x="340" y="125" width="12" height="30" stroke="red" strokeWidth="2" />
            <text x="35" y="143" fontSize="9" fill="red" fontWeight="bold">3x2m</text>

            {/* Labels and dims */}
            <text x="200" y="45" fontSize="13" fill="yellow" textAnchor="middle" fontWeight="bold">QUADRA DE FUTSAL OFICIAL</text>
            <text x="200" y="235" fontSize="11" fill="#a7f3d0" textAnchor="middle">Comprimento: 38 a 42 metros</text>
            <text x="200" y="250" fontSize="11" fill="#a7f3d0" textAnchor="middle">Largura: 20 a 25 metros</text>

            {/* Area labels */}
            <text x="75" y="115" fontSize="8" fill="#38bdf8" textAnchor="middle" transform="rotate(-90 75 115)">ÁREA DO GOLEIRO (6m)</text>

            {/* Blackboard guide */}
            <rect x="110" y="10" width="180" height="20" rx="4" fill="#064e3b" stroke="#047857" strokeWidth="1"/>
            <text x="200" y="24" fontSize="9" fill="white" textAnchor="middle">DESENHE UM RETÂNGULO 2:1 NO QUADRO</text>
          </svg>
        )}

        {diagramType === 'futsal_tatico' && (
          <svg viewBox="0 0 400 300" className="w-full h-full text-slate-100 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
            <rect x="40" y="50" width="320" height="180" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="200" y1="50" x2="200" y2="230" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Left Hand: Sistema 2-2 'Quadrado' */}
            <text x="120" y="35" fontSize="13" fill="#38bdf8" textAnchor="middle" fontWeight="bold">SISTEMA 2-2 (Quadrado)</text>
            
            {/* Defensive base */}
            <circle cx="70" cy="100" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2"/>
            <text x="70" y="104" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">D</text>
            <text x="70" y="85" fontSize="8" fill="#e2e8f0" textAnchor="middle">Fixo/Zaga</text>

            <circle cx="70" cy="180" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2"/>
            <text x="70" y="184" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">D</text>
            <text x="70" y="200" fontSize="8" fill="#e2e8f0" textAnchor="middle">Ala Def</text>

            {/* Attack line */}
            <circle cx="150" cy="100" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2"/>
            <text x="150" y="104" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">A</text>
            <text x="150" y="85" fontSize="8" fill="#e2e8f0" textAnchor="middle">Ala Of</text>

            <circle cx="150" cy="180" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2"/>
            <text x="150" y="184" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">A</text>
            <text x="150" y="200" fontSize="8" fill="#e2e8f0" textAnchor="middle">Pivô</text>

            {/* Connecting lines of the square layout */}
            <rect x="70" y="100" width="80" height="80" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />


            {/* Right Hand: Sistema 3-1 'Diamante' */}
            <text x="280" y="35" fontSize="13" fill="#f87171" textAnchor="middle" fontWeight="bold">SISTEMA 3-1 (Diamante)</text>

            {/* Fixo - Back */}
            <circle cx="230" cy="140" r="10" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="2"/>
            <text x="230" y="144" fontSize="10" fill="#f87171" textAnchor="middle" fontWeight="bold">F</text>
            <text x="215" y="144" fontSize="8" fill="#e2e8f0" textAnchor="end">Fixo</text>

            {/* Alas - Side */}
            <circle cx="280" cy="80" r="10" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="2"/>
            <text x="280" y="84" fontSize="10" fill="#f87171" textAnchor="middle" fontWeight="bold">AE</text>
            <text x="280" y="65" fontSize="8" fill="#e2e8f0" textAnchor="middle">Ala Esq</text>

            <circle cx="280" cy="200" r="10" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="2"/>
            <text x="280" y="204" fontSize="10" fill="#f87171" textAnchor="middle" fontWeight="bold">AD</text>
            <text x="280" y="218" fontSize="8" fill="#e2e8f0" textAnchor="middle">Ala Dir</text>

            {/* Pivô - Front */}
            <circle cx="330" cy="140" r="10" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="2"/>
            <text x="330" y="144" fontSize="10" fill="#f87171" textAnchor="middle" fontWeight="bold">P</text>
            <text x="345" y="144" fontSize="8" fill="#e2e8f0" textAnchor="start">Pivô</text>

            {/* Diamond connections */}
            <polygon points="230,140 280,80 330,140 280,200" stroke="rgba(248,113,113,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />

            <text x="200" y="255" fontSize="10" fill="yellow" textAnchor="middle">💡 EXPLIQUE: 2-2 preza consistência; 3-1 promove triangulações.</text>
          </svg>
        )}

        {diagramType === 'volei_posicoes' && (
          <svg viewBox="0 0 400 300" className="w-full h-full text-slate-100 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
            {/* Outline 18m x 9m divided in central net */}
            <rect x="50" y="70" width="300" height="150" stroke="white" strokeWidth="2.5" />
            
            {/* Attack line at 3m (offset = 50px from center on each side) */}
            <line x1="150" y1="70" x2="150" y2="220" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="250" y1="70" x2="250" y2="220" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
            
            {/* Center net line */}
            <line x1="200" y1="70" x2="200" y2="220" stroke="yellow" strokeWidth="3" />
            
            {/* Subtitles/Labels */}
            <text x="200" y="55" fontSize="11" fill="yellow" textAnchor="middle" fontWeight="bold">REDE DIVISÓRIA (2,43m / 2,24m)</text>
            <text x="150" y="235" fontSize="8" fill="#a7f3d0" textAnchor="middle">Linha 3m</text>
            <text x="250" y="235" fontSize="8" fill="#a7f3d0" textAnchor="middle">Linha 3m</text>

            {/* Posições de quadra (Left side team positions) */}
            {/* front row */}
            <circle cx="170" cy="100" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="170" y="104" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">4</text>
            
            <circle cx="170" cy="145" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="170" y="149" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">3</text>
            
            <circle cx="170" cy="190" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="170" y="194" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">2</text>

            {/* back row */}
            <circle cx="100" cy="100" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="100" y="104" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">5</text>
            
            <circle cx="100" cy="145" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="100" y="149" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">6</text>
            
            <circle cx="100" cy="190" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="100" y="194" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">1</text>

            <text x="100" y="215" fontSize="8" fill="#e2e8f0" textAnchor="middle">SAQUE (Pistolo 1)</text>

            {/* Rotation direction arrows in a loop (Clockwise: 1->6->5->4->3->2->1) */}
            {/* Draw a clockwise arrow ring on left side */}
            <path d="M 100,175 A 35,35 0 1,1 100,115" stroke="yellow" strokeWidth="1.5" strokeDasharray="3 3"/>
            {/* Tiny arrow head to show movement */}
            <polygon points="100,115 106,120 96,120 M 100,175 106,170 96,170" fill="yellow" stroke="none" />
            
            <text x="200" y="255" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">🔄 SENTIDO HORÁRIO DO RODÍZIO</text>
            <text x="200" y="270" fontSize="9" fill="yellow" textAnchor="middle">Atenção: Rodízio ocorre ao RECONQUISTAR o direito de saque!</text>
          </svg>
        )}

        {diagramType === 'volei_6x0' && (
          <svg viewBox="0 0 400 300" className="w-full h-full text-slate-100 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
            {/* Half a volleyball court 9x9 (180x180 inside 110-290, 60-240) */}
            <rect x="110" y="60" width="180" height="180" stroke="white" strokeWidth="2.5" />
            <line x1="110" y1="120" x2="290" y2="120" stroke="white" strokeWidth="1.5" strokeDasharray="4 4"/> {/* 3m line */}
            <line x1="110" y1="60" x2="290" y2="60" stroke="yellow" strokeWidth="4" /> {/* Network line */}

            {/* Defenders at the back (5, 6, 1) */}
            <circle cx="140" cy="200" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="140" y="204" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">5</text>

            <circle cx="200" cy="210" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="200" y="214" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">6</text>

            <circle cx="260" cy="200" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="260" y="204" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">1</text>

            {/* Attackers at the front (4, 3, 2). Position 3 is the LIFTER (Levantador) */}
            <circle cx="140" cy="100" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="140" y="104" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">4</text>

            <circle cx="200" cy="90" r="12" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth="3" />
            <text x="200" y="94" fontSize="11" fill="#fbbf24" textAnchor="middle" fontWeight="bold">3</text>
            <text x="200" y="72" fontSize="7" fill="#fbbf24" textAnchor="middle" fontWeight="bold">LEVANTADOR</text>

            <circle cx="260" cy="100" r="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="260" y="104" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">2</text>

            {/* Arrow flow of ball: Reception 6 -> Lifter 3 -> Attack 4 or 2 */}
            {/* Path representing ball movement */}
            <path d="M 200,195 Q 180,140 195,105" stroke="yellow" strokeWidth="2" strokeDasharray="3 3"/>
            <polygon points="195,105 190,111 200,111" fill="yellow" stroke="none"/>
            <text x="175" y="150" fontSize="8" fill="yellow">1º Manchete</text>

            {/* Lifter to Attacker 4 */}
            <path d="M 200,90 Q 170,80 152,95" stroke="#a7f3d0" strokeWidth="2" />
            <polygon points="152,95 158,90 154,101" fill="#a7f3d0" stroke="none"/>
            
            {/* Lifter to Attacker 2 */}
            <path d="M 200,90 Q 230,80 248,95" stroke="#a7f3d0" strokeWidth="2" />
            <polygon points="248,95 246,101 242,90" fill="#a7f3d0" stroke="none"/>
            <text x="200" y="115" fontSize="8" fill="#a7f3d0" textAnchor="middle">2º Levantamento</text>

            <text x="200" y="255" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">SISTEMA 6X0: Levantador flutuante sempre na Posição 3</text>
            <text x="200" y="270" fontSize="9" fill="#a7f3d0" textAnchor="middle">Cooperação: Passe de Manchete ➜ Toque de Dedão ➜ Ataque</text>
          </svg>
        )}

        {diagramType === 'basquete_handebol' && (
          <svg viewBox="0 0 400 300" className="w-full h-full text-slate-100 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
            {/* Left board: Basquete 28x15 */}
            <g transform="translate(10, 0)">
              <rect x="20" y="70" width="160" height="110" stroke="white" strokeWidth="1.5" />
              <path d="M 20,95 A 35,35 0 0,1 55,125 A 35,35 0 0,1 20,155" stroke="#fbbf24" strokeWidth="1.5" /> {/* 3-pts arc */}
              <rect x="20" y="110" width="25" height="30" stroke="white" strokeWidth="1.2" /> {/* garrafão */}
              <circle cx="45" cy="125" r="10" stroke="white" strokeWidth="1" /> {/* jump circle */}
              <circle cx="25" cy="125" r="3" fill="red" stroke="red" /> {/* hoop */}
              
              <text x="100" y="55" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">BASQUETE (28x15m)</text>
              <text x="100" y="195" fontSize="8" fill="#fbbf24" textAnchor="middle">Linha de 3pts: 6.75m</text>
              <text x="100" y="210" fontSize="8" fill="#fbbf24" textAnchor="middle">Altura do Aro: 3.05m</text>
            </g>

            {/* Right board: Handebol 40x20 */}
            <g transform="translate(200, 0)">
              <rect x="10" y="70" width="170" height="110" stroke="white" strokeWidth="1.5" />
              {/* 6m Area */}
              <path d="M 10,90 A 30,30 0 0,1 40,125 A 30,30 0 0,1 10,160" stroke="#f87171" strokeWidth="1.5" />
              {/* 9m Free throw line (dashed) */}
              <path d="M 10,80 A 45,45 0 0,1 55,125 A 45,45 0 0,1 10,170" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
              
              <rect x="2" y="115" width="8" height="20" stroke="red" strokeWidth="1.5" /> {/* goal */}

              <text x="95" y="55" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">HANDEBOL (40x20m)</text>
              <text x="95" y="195" fontSize="8" fill="#f87171" textAnchor="middle">Área restrita goleiro: 6m</text>
              <text x="95" y="210" fontSize="8" fill="#f87171" textAnchor="middle">Tiro livre: Barreira de 9m</text>
            </g>

            <rect x="40" y="235" width="320" height="40" rx="6" fill="#064e3b" stroke="#047857" strokeWidth="1"/>
            <text x="200" y="250" fontSize="10" fill="yellow" textAnchor="middle" fontWeight="bold">⚠️ REGRAS DE DRIBLE:</text>
            <text x="200" y="265" fontSize="9" fill="white" textAnchor="middle">Andada no Basquete: máx 2 passos. Invasão no Handebol: Proibido pisar nos 6m!</text>
          </svg>
        )}

        {diagramType === 'impedimento' && (
          <svg viewBox="0 0 400 300" className="w-full h-full text-slate-100 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
            {/* Outline of lateral field */}
            <rect x="40" y="50" width="320" height="170" stroke="white" strokeWidth="2" strokeDasharray="3 3"/>
            <line x1="200" y1="50" x2="200" y2="220" stroke="white" strokeWidth="1" strokeDasharray="3 3"/> {/* midfield */}

            {/* Goleiro (G) and goal frame */}
            <rect x="360" y="110" width="10" height="50" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.1)"/>
            <circle cx="350" cy="135" r="8" fill="rgba(148,163,184,0.3)" stroke="#94a3b8" strokeWidth="2"/>
            <text x="350" y="139" fontSize="9" fill="#94a3b8" textAnchor="middle" fontWeight="bold">G</text>

            {/* Line of defense (Z1 & Z2) - represents the 'Impediment Line' */}
            <line x1="280" y1="50" x2="280" y2="220" stroke="red" strokeWidth="3" />
            <text x="270" y="65" fontSize="9" fill="red" textAnchor="end" fontWeight="bold">LINHA DE DEFESA (Último Zagueiro)</text>

            <circle cx="280" cy="90" r="9" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="2"/>
            <text x="280" y="94" fontSize="9" fill="#f87171" textAnchor="middle" fontWeight="bold">D1</text>

            <circle cx="280" cy="180" r="9" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="2"/>
            <text x="280" y="184" fontSize="9" fill="#f87171" textAnchor="middle" fontWeight="bold">D2</text>

            {/* Legal Offense player side A: behind line */}
            <circle cx="240" cy="150" r="9" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="2"/>
            <text x="240" y="154" fontSize="9" fill="#38bdf8" textAnchor="middle" fontWeight="bold">A1</text>
            <text x="240" y="170" fontSize="8" fill="#38bdf8" textAnchor="middle" fontWeight="bold">LEGAL ✅</text>

            {/* Offside/Impeded Offense player side B: beyond line */}
            <circle cx="310" cy="110" r="9" fill="rgba(251,146,60,0.2)" stroke="#fb923c" strokeWidth="2"/>
            <text x="310" y="114" fontSize="9" fill="#fb923c" textAnchor="middle" fontWeight="bold">A2</text>
            <text x="318" y="95" fontSize="8" fill="#fb923c" textAnchor="middle" fontWeight="bold">IMPEDIDO ❌</text>

            {/* Mid Pass moment */}
            <circle cx="150" cy="140" r="9" fill="rgba(167,243,208,0.2)" stroke="#a7f3d0" strokeWidth="2"/>
            <text x="150" y="144" fontSize="9" fill="#a7f3d0" textAnchor="middle" fontWeight="bold">M</text>
            <text x="150" y="125" fontSize="7" fill="#e2e8f0" textAnchor="middle">Faz o passe</text>

            {/* Arrow pass to A2 */}
            <path d="M 160,140 Q 230,120 300,111" stroke="yellow" strokeWidth="1.5" strokeDasharray="3 3"/>
            <polygon points="300,111 292,108 295,116" fill="yellow" stroke="none" />
            <circle cx="300" cy="111" r="2" fill="yellow" />

            <text x="200" y="240" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">REGRA DO IMPEDIMENTO NO FUTEBOL</text>
            <text x="200" y="255" fontSize="9" fill="yellow" textAnchor="middle">Aferido no momento de partida do chute (Passe)!</text>
            <text x="200" y="268" fontSize="8" fill="white" textAnchor="middle">Deve ter ≥ 2 defensores (goleiro + 1) na frente do atacante.</text>
          </svg>
        )}

        {diagramType === 'futebol_tatico' && (
          <svg viewBox="0 0 400 300" className="w-full h-full text-slate-100 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
            <rect x="40" y="50" width="320" height="180" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="200" y1="50" x2="200" y2="230" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Left half: 4-4-2 Solid defensive structure */}
            <text x="120" y="38" fontSize="13" fill="#38bdf8" textAnchor="middle" fontWeight="bold">SISTEMA 4-4-2 (Sólido)</text>
            
            {/* 4 defense */}
            <g fill="#38bdf8" stroke="#38bdf8" strokeWidth="1.5">
              <circle cx="55" cy="80" r="6" />
              <circle cx="55" cy="115" r="6" />
              <circle cx="55" cy="160" r="6" />
              <circle cx="55" cy="195" r="6" />
            </g>
            <text x="55" y="65" fontSize="7" fill="#e2e8f0" textAnchor="middle">Defensores</text>

            {/* 4 midfield */}
            <g fill="#38bdf8" stroke="#38bdf8" strokeWidth="1.5">
              <circle cx="110" cy="80" r="6" />
              <circle cx="110" cy="115" r="6" />
              <circle cx="110" cy="160" r="6" />
              <circle cx="110" cy="195" r="6" />
            </g>
            <text x="110" y="65" fontSize="7" fill="#e2e8f0" textAnchor="middle">Meio campo</text>

            {/* 2 attack */}
            <g fill="#38bdf8" stroke="#38bdf8" strokeWidth="1.5">
              <circle cx="165" cy="110" r="6" />
              <circle cx="165" cy="160" r="6" />
            </g>
            <text x="165" y="95" fontSize="7" fill="#e2e8f0" textAnchor="middle">Atacantes (2)</text>

            <line x1="55" y1="80" x2="165" y2="110" stroke="rgba(56,189,248,0.2)" strokeWidth="1" />


            {/* Right half: 4-3-3 Offensive dynamic wingers */}
            <text x="280" y="38" fontSize="13" fill="#f87171" textAnchor="middle" fontWeight="bold">SISTEMA 4-3-3 (Ofensivo)</text>

            {/* 4 defense */}
            <g fill="#f87171" stroke="#f87171" strokeWidth="1.5">
              <circle cx="230" cy="80" r="6" />
              <circle cx="230" cy="115" r="6" />
              <circle cx="230" cy="160" r="6" />
              <circle cx="230" cy="195" r="6" />
            </g>

            {/* 3 midfield */}
            <g fill="#f87171" stroke="#f87171" strokeWidth="1.5">
              <circle cx="280" cy="95" r="6" />
              <circle cx="280" cy="138" r="6" />
              <circle cx="280" cy="180" r="6" />
            </g>
            <text x="280" y="75" fontSize="7" fill="#e2e8f0" textAnchor="middle">Meio (3)</text>

            {/* 3 attack */}
            <g fill="#f87171" stroke="#f87171" strokeWidth="1.5">
              <circle cx="340" cy="75" r="6" /> {/* Ponta E */}
              <circle cx="340" cy="138" r="6" /> {/* Centroavante */}
              <circle cx="340" cy="195" r="6" /> {/* Ponta D */}
            </g>
            <text x="340" y="60" fontSize="7" fill="#e2e8f0" textAnchor="middle">Pontas + CA</text>

            <rect x="40" y="240" width="320" height="30" rx="4" fill="#064e3b" stroke="#047857" strokeWidth="1"/>
            <text x="200" y="258" fontSize="10" fill="yellow" textAnchor="middle">💡 EXPLIQUE NO QUADRO: 4-4-2 sólido; 4-3-3 explora velocidade nas pontas.</text>
          </svg>
        )}

        {diagramType === 'volei_sentado' && (
          <svg viewBox="0 0 400 300" className="w-full h-full text-slate-100 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
            {/* Outline 10m x 6m (proportion 10:6, inside 300x180 approx inside 260x156) */}
            <rect x="70" y="60" width="260" height="156" stroke="white" strokeWidth="2.5" />
            
            {/* Center Net Line height 1.15m (men) / 1.05 (women) */}
            <line x1="200" y1="60" x2="200" y2="216" stroke="yellow" strokeWidth="3.5" />
            <circle cx="200" cy="55" r="4" fill="yellow" stroke="yellow" />
            <circle cx="200" cy="221" r="4" fill="yellow" stroke="yellow" />

            {/* Attack line at 2m (offset about 52px from center) */}
            <line x1="148" y1="60" x2="148" y2="216" stroke="white" strokeWidth="1.5" strokeDasharray="3 3"/>
            <line x1="252" y1="60" x2="252" y2="216" stroke="white" strokeWidth="1.5" strokeDasharray="3 3"/>

            {/* Text labels */}
            <text x="200" y="45" fontSize="13" fill="yellow" textAnchor="middle" fontWeight="bold">VÔLEI SENTADO DE ADAPTAÇÃO</text>
            
            {/* Height text */}
            <text x="200" y="235" fontSize="9" fill="yellow" textAnchor="middle">Rede: 1,15m (Masc) | 1,05m (Fem)</text>

            {/* Dimension Lines */}
            <line x1="70" y1="250" x2="330" y2="250" stroke="#a7f3d0" strokeWidth="1" />
            <polygon points="70,250 80,246 80,254" fill="#a7f3d0" stroke="none" />
            <polygon points="330,250 320,246 320,254" fill="#a7f3d0" stroke="none" />
            <text x="200" y="265" fontSize="10" fill="#a7f3d0" textAnchor="middle">QUADRA DE 10 METROS (Comprimento)</text>

            <line x1="45" y1="60" x2="45" y2="216" stroke="#a7f3d0" strokeWidth="1" />
            <polygon points="45,60 41,70 49,70" fill="#a7f3d0" stroke="none" />
            <polygon points="45,216 41,206 49,206" fill="#a7f3d0" stroke="none" />
            <text x="32" y="138" fontSize="10" fill="#a7f3d0" textAnchor="middle" transform="rotate(-90 32 138)">6 METROS (Largura)</text>

            {/* Rule warning box */}
            <rect x="210" y="105" width="105" height="40" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
            <text x="262" y="122" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">⚠️ MANTER</text>
            <text x="262" y="134" fontSize="8" fill="#ef4444" textAnchor="middle" fontWeight="bold">GLÚTEOS NO CHÃO!</text>

            {/* Attack area label */}
            <text x="174" y="138" fontSize="8" fill="#38bdf8" textAnchor="middle" transform="rotate(-90 174 138)">Ataque: 2m</text>
          </svg>
        )}

        {diagramType === 'futebol_5' && (
          <svg viewBox="0 0 400 300" className="w-full h-full text-slate-100 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
            {/* Outline of Football of 5 / Pitch 40x20 */}
            <rect x="60" y="70" width="280" height="140" stroke="white" strokeWidth="2.5" />
            <line x1="200" y1="70" x2="200" y2="210" stroke="white" strokeWidth="1.5" />
            <circle cx="200" cy="140" r="25" stroke="white" strokeWidth="1.5" />

            {/* Sideboards - Bandas Laterais (Long solid white walls) */}
            <line x1="60" y1="64" x2="340" y2="64" stroke="yellow" strokeWidth="3.5" />
            <line x1="60" y1="216" x2="340" y2="216" stroke="yellow" strokeWidth="3.5" />
            <text x="200" y="52" fontSize="9" fill="yellow" textAnchor="middle" fontWeight="bold">🔲 BANDAS LATERAIS (Muro / Placas guia)</text>

            {/* Goal keepers restricted zone (shorter rectangle 5x2m) */}
            <rect x="60" y="115" width="20" height="50" stroke="white" strokeWidth="1.5" />
            <rect x="320" y="115" width="20" height="50" stroke="white" strokeWidth="1.5" />
            <text x="75" y="105" fontSize="6" fill="white">GK (5x2m)</text>

            {/* Sonic ball with sound rings in midfield */}
            <circle cx="200" cy="140" r="12" fill="none" stroke="#67e8f9" strokeWidth="1" strokeDasharray="2 2" className="animate-ping" />
            <circle cx="200" cy="140" r="7" fill="rgba(103,232,249,0.3)" stroke="#67e8f9" strokeWidth="2" />
            {/* Sparkles of noise */}
            <text x="210" y="132" fontSize="10" fill="#67e8f9" fontWeight="bold">🎼</text>
            <text x="200" y="123" fontSize="8" fill="#67e8f9" textAnchor="middle" fontWeight="bold">BOLA COM GUIZO (SOM)</text>

            {/* Blind players symbol */}
            <g fill="#38bdf8" stroke="#38bdf8" strokeWidth="1.5">
              <circle cx="130" cy="100" r="6" />
              <line x1="126" y1="100" x2="134" y2="100" stroke="white" strokeWidth="2" /> {/* Blindfold */}
              
              <circle cx="160" cy="170" r="6" />
              <line x1="156" y1="170" x2="164" y2="170" stroke="white" strokeWidth="2" /> {/* Blindfold */}

              <circle cx="260" cy="100" r="6" />
              <line x1="256" y1="100" x2="264" y2="100" stroke="white" strokeWidth="2" /> {/* Blindfold */}
            </g>

            {/* Call guide spot behind opposition goal */}
            <star points="360,140" stroke="yellow" strokeWidth="1" />
            <circle cx="360" cy="140" r="4" fill="yellow" />
            <text x="350" y="240" fontSize="8" fill="yellow" textAnchor="end">🔊 Direcionador/Guia (Atrás do Gol)</text>

            {/* Dimensions */}
            <text x="200" y="235" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">FUTEBOL DE 5 (DEFI. VISUAIS)</text>
            <text x="200" y="250" fontSize="9" fill="#a7f3d0" textAnchor="middle">Quadra: 40x20m | Sem lateral | Total Silêncio da Torcida</text>
          </svg>
        )}

        {diagramType === 'default' && (
          <svg viewBox="0 0 400 300" className="w-full h-full text-slate-100 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
            {/* Draw a general physical education playground board sketch */}
            <rect x="50" y="60" width="300" height="160" rx="10" stroke="white" strokeWidth="2" strokeDasharray="3 3"/>
            <circle cx="200" cy="140" r="40" stroke="white" strokeWidth="2" />
            <line x1="200" y1="60" x2="200" y2="220" stroke="white" strokeWidth="2" />

            {/* Little sports assets icons in outline */}
            <circle cx="200" cy="140" r="10" stroke="yellow" strokeWidth="2" strokeDasharray="5 2"/> {/* ball */}
            
            <text x="200" y="90" fontSize="16" fill="yellow" textAnchor="middle" fontWeight="bold">📚 DIÁRIO DE ESBOÇOS</text>
            <text x="200" y="115" fontSize="10" fill="white" textAnchor="middle">Este slide não exige desenhos específicos.</text>
            <text x="200" y="132" fontSize="10" fill="white" textAnchor="middle">Para ver figuras detalhadas de outras aulas, navegue</text>
            <text x="200" y="148" fontSize="10" fill="white" textAnchor="middle">até os slides rotulados como:</text>
            <text x="200" y="170" fontSize="11" fill="#38bdf8" textAnchor="middle" fontWeight="bold">"Roteiro para Desenhar" ou "Quadra e Medidas".</text>

            <rect x="100" y="235" width="200" height="25" rx="5" fill="#064e3b" stroke="#047857" strokeWidth="1"/>
            <text x="200" y="252" fontSize="9" fill="#a7f3d0" textAnchor="middle" fontWeight="bold">🎯 INTERFACE ADAPTADA E ACESSÍVEL</text>
          </svg>
        )}
      </div>

      {/* Blackboard Wooden Chalk shelf / metadata footer */}
      <div className="w-full h-3 bg-amber-900 rounded-b-lg flex justify-around relative">
        {/* Colorful chalk boxes laying on the board bottom shelf */}
        <div className="absolute -top-1.5 left-10 w-6 h-2 bg-white rounded shadow-sm border border-slate-300"></div>
        <div className="absolute -top-1.5 left-20 w-5 h-2 bg-yellow-300 rounded shadow-sm border border-yellow-400"></div>
        <div className="absolute -top-1.5 right-20 w-6 h-2 bg-blue-300 rounded shadow-sm border border-blue-400"></div>
        <div className="absolute -top-1.5 right-10 w-4 h-2 bg-red-400 rounded shadow-sm border border-red-500"></div>
      </div>
      <div className="text-[10px] text-emerald-300 text-center mt-2 px-4 leading-normal">
        <span>Use o roteiro acima para fazer um esboço idêntico no quadro negro físico com giz colorido. Facilita o aprendizado concreto de alunos autistas e cinestésicos!</span>
      </div>
    </div>
  );
};

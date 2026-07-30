import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { safeLocalStorage } from '../utils/storage';
import { 
  BookOpen, Presentation, ChevronLeft, ChevronRight, Home, 
  Info, Printer, LayoutGrid, Calendar, Activity, Shield, 
  Zap, Search, CheckCircle2, FileText, Map, Projector, ShieldAlert, BarChart3, ClipboardList
} from 'lucide-react';
import { PE_PLAN } from '../data/planosPE';
import { PlanoAnualPE } from './PlanoAnualPE';
import { OcorrenciasView } from './OcorrenciasView';
import { GradesView } from './GradesView';
import { ExamRepositoryView } from './ExamRepositoryView';
import { ChalkboardDiagram } from './ChalkboardDiagram';
import { SlidePlayer as ExternalSlidePlayer } from './SlidePlayer';
import { ALTINHA_FUTVOLEI_SLIDES, SLIDES_3TRI, SLIDES_JOGOS_TABULEIRO, SLIDES_GENERICOS, SLIDES_HANDEBOL, SLIDES_POVOS_ORIGINARIOS, SLIDES_PARALIMPICO, SLIDES_AULA_INTERATIVA_EM } from '../data/corpoMidiaSlides';

// ================= DADOS DO CRONOGRAMA =================
const cronograma = PE_PLAN['ilgch'] || [];

// ================= DADOS DOS SLIDES DA AULA =================
export interface Slide {
  tipo: string;
  titulo?: string;
  subtitulo?: string;
  topicos?: string[];
  dicaProfessor?: string;
  imagemDeFundo?: string;
  texto?: string;
  subtexto?: string;
}

export const slidesData: Record<string, Slide[]> = {
  // AULAS 3º TRIMESTRE
  'ilgch_11/09': SLIDES_3TRI['Gênero, Sociedade e Esporte'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_18/09': SLIDES_3TRI['O Apagamento Invisível'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_25/09': SLIDES_3TRI['Divisão Sexista do Corpo'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_09/10': SLIDES_3TRI['Hipersexualização e Espetáculo'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_16/10': SLIDES_3TRI['Equidade Salarial no Esporte'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_23/10': SLIDES_3TRI['As Pioneiras Olímpicas'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_13/11': SLIDES_3TRI['Debate Integrador'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_27/11': SLIDES_3TRI['Síntese Final'].map(s => ({...s, tipo: s.type || 'texto'})),

  // POVOS ORIGINÁRIOS
  'ilgch_26/06': SLIDES_POVOS_ORIGINARIOS.map(s => ({...s, tipo: s.type || 'texto_simples'})),

  // HANDEBOL
  'ap_sexta_12/06': SLIDES_HANDEBOL.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_sexta_19/06': SLIDES_HANDEBOL.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_sexta_26/06': SLIDES_HANDEBOL.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_10/08': SLIDES_HANDEBOL.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_17/08': SLIDES_HANDEBOL.map(s => ({...s, tipo: s.type || 'texto_simples'})),

  // AULAS FUTEVOLEI (REGULAR)
  '8ano_18/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  '8ano_25/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_18/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_25/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_sexta_15/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_sexta_22/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),

  // AULAS 2º TRIMESTRE (JOGOS DE TABULEIRO E RETORNO / INCLUSÃO)
  '8ano_08/06': SLIDES_JOGOS_TABULEIRO.map(s => ({...s, tipo: s.tipo || 'texto'})),
  '8ano_15/06': SLIDES_GENERICOS['Jogos do Mundo'].map((s: any) => ({...s, tipo: s.type || 'texto'})),
  '8ano_22/06': SLIDES_GENERICOS['Jogos Cooperativos'].map((s: any) => ({...s, tipo: s.type || 'texto'})),
  'ap_12/06': SLIDES_JOGOS_TABULEIRO.map(s => ({...s, tipo: s.tipo || 'texto'})),
  '8ano_27/07': SLIDES_PARALIMPICO.map(s => ({...s, tipo: s.category === 'LOUSA_ALUNO' || s.title.includes('QUADRO') ? 'texto_simples' : 'texto'})),
  'ap_27/07': SLIDES_PARALIMPICO.map(s => ({...s, tipo: s.category === 'LOUSA_ALUNO' || s.title.includes('QUADRO') ? 'texto_simples' : 'texto'})),
  'ap_sexta_27/07': SLIDES_PARALIMPICO.map(s => ({...s, tipo: s.category === 'LOUSA_ALUNO' || s.title.includes('QUADRO') ? 'texto_simples' : 'texto'})),
  'ap_sexta_31/07': SLIDES_PARALIMPICO.map(s => ({...s, tipo: s.category === 'LOUSA_ALUNO' || s.title.includes('QUADRO') ? 'texto_simples' : 'texto'})),
  'ciep369_27/07': SLIDES_PARALIMPICO.map(s => ({...s, tipo: s.category === 'LOUSA_ALUNO' || s.title.includes('QUADRO') ? 'texto_simples' : 'texto'})),
  'ciep198_27/07': SLIDES_PARALIMPICO.map(s => ({...s, tipo: s.category === 'LOUSA_ALUNO' || s.title.includes('QUADRO') ? 'texto_simples' : 'texto'})),
  'ciep320_27/07': SLIDES_PARALIMPICO.map(s => ({...s, tipo: s.category === 'LOUSA_ALUNO' || s.title.includes('QUADRO') ? 'texto_simples' : 'texto'})),
  'correcao_fluxo_27/07': SLIDES_PARALIMPICO.map(s => ({...s, tipo: s.category === 'LOUSA_ALUNO' || s.title.includes('QUADRO') ? 'texto_simples' : 'texto'})),
  'ilgch_27/07': SLIDES_PARALIMPICO.map(s => ({...s, tipo: s.category === 'LOUSA_ALUNO' || s.title.includes('QUADRO') ? 'texto_simples' : 'texto'})),
  'ilgch_31/07': SLIDES_AULA_INTERATIVA_EM.map(s => ({...s, tipo: s.type || s.tipo || 'texto_simples'})),

  // AULA 1: INTRO / CULTURA CORPORAL
  'ilgch_22/05': [
    {
      tipo: 'capa',
      titulo: 'Decolonização de Corpos e Espaços',
      subtitulo: 'A Cultura Corporal muito além da quadra.',
      dicaProfessor: 'Deixe esse slide no telão enquanto os alunos entram. Fundo escuro, letras claras.',
      imagemDeFundo: '[Imagem de um mapa urbano mesclado com texturas de pele]'
    },
    {
      tipo: 'texto_simples',
      titulo: 'ILGCH - Decolonização de corpos, estética, mídia e espaços',
      topicos: [
        'ILGCH - Decolonização de corpos, estética, mídia e espaços',
        'Cultura Corporal: Tudo o que move e expressa o humano',
        'Todo corpo é um Marcador, todo corpo é um Mapa',
        'Corpos falam: no andar, no vestir, no expressar',
        'Descobrindo culturas, locais e etnias através dos corpos',
        'Corpos múltiplos: pretos, brancos, amarelos...'
      ],
      dicaProfessor: 'Dica: Explique que o corpo é o primeiro território que ocupamos. Desenhe um mapa mental no quadro ligando: Corpo, Cultura, Território e Identidade.'
    },
    {
      tipo: 'destaque_centro',
      texto: 'A MÍDIA CRIA O PADRÃO.',
      dicaProfessor: 'Gatilho: Pergunte para a turma se eles se sentem representados nas propagandas de perfume ou roupas.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Explorando o Iceberg: O que sustenta o padrão?',
      topicos: [
        'Ponta (Visível): Redes Sociais, Padrões, Filtros',
        'Base (Oculta): Racismo Estrutural, Apagamento histórico',
        'Gatilho: Como a publicidade lucra com nossa insegurança?',
        'Link: A estética como ferramenta de controle do consumo',
        'Debate: Quem define o belo?'
      ],
      dicaProfessor: 'O padrão de beleza eurocêntrico só existe porque invisibiliza o corpo negro como sujeito. Questione o lucro dessa indústria.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Gatilhos para Debate (Mapa Mental)',
      topicos: [
          'Violência Simbólica nas Redes',
          'História contada pelo "Dominador"',
          'Nossa resistência: Corpos que ocupam',
          'Afinal, somos o que postamos?'
      ],
      dicaProfessor: 'Use estes tópicos para desenhar o mapa mental final no quadro.'
    },
    {
       tipo: 'destaque_centro',
       texto: '"O currículo não é militância. É lei federal."',
       subtexto: 'Lei 10.639/03',
       dicaProfessor: 'Escudo legal. Mostre que a aula cumpre uma determinação federal sobre História Afro-Brasileira.'
    }
  ],
  // AULA 2: O RACISMO INVISÍVEL
  'ilgch_29/05': [
     {
      tipo: 'capa',
      titulo: 'O Racismo Invisível',
      subtitulo: 'O apagamento estético na mídia.',
      dicaProfessor: 'Aula de leitura de artigo.',
      imagemDeFundo: '[Imagem de revistas rasgadas]'
    },
    {
      tipo: 'texto_simples',
      titulo: 'O que é Racismo? (Conceitos e Autores)',
      topicos: [
        'Silvio Almeida (Estrutural): Não é mera falha pessoal, mas um processo histórico e político enraizado no tecido social, econômico e jurídico.',
        'Frantz Fanon (Cultural e Psíquico): Prática que desumaniza e aliena o colonizado, forçando-o a desejar e imitar os ideais coloniais e eurocêntricos.',
        'Lélia Gonzalez (Por Denegação): O "neuroticismo" do racismo à brasileira, que simula harmonia social enquanto oculta e estigmatiza estéticas e saberes negros.',
        'Visão Crítica: Uma engrenagem que estrutura quem tem poder de fala, espaços que ocupamos e o ideal do que é considerado belo.'
      ],
      dicaProfessor: 'Explique que o racismo é multidimensional. Use o quadro para esquematizar as três dimensões de Silvio Almeida: Individual, Institucional e Estrutural.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Dinâmica de Hoje',
      topicos: [
        'Leitura Acadêmica Coletiva',
        'Debate: Branquitude como "Universal"',
        'Filtros de embelezamento',
        'Produção em sala'
      ],
      dicaProfessor: 'Explicar a dinâmica de "seminário" da aula.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Racismo Estético e a Mídia',
      topicos: [
        'Como a publicidade molda o desejo',
        'O custo da "beleza ocidental"',
        'Invisibilização de corpos negros',
        'A estética como ferramenta de poder'
      ],
      dicaProfessor: 'Inicie debate sobre propagandas de cosméticos e a falta de diversidade nos filtros.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Colorismo e as Nuances da Aceitação',
      topicos: [
        'A escala de tom de pele e a aceitação social',
        'O quanto a mídia tolera traços negróides',
        'A miscigenação usada para silenciar debates raciais',
        'Como o privilégio se distribui conforme a pigmentação'
      ],
      dicaProfessor: 'Explique o conceito de colorismo. Como traços e tons de pele influenciam o quanto um indivíduo preto é aceito nos espaços de prestígio.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Algoritmos, Filtros e o "Branqueamento Digital"',
      topicos: [
        'A tecnologia imitando os preconceitos do mundo real',
        'Filtros de redes sociais que afinam narizes e clareiam peles',
        'Como a inteligência artificial reproduz padrões eurocêntricos',
        'O impacto psicológico da despersonalização identitária na juventude'
      ],
      dicaProfessor: 'Fale sobre como os filtros do Instagram, TikTok e Snapchat padronizam as estéticas de acordo com traços muito específicos (eurocêntricos).'
    },
    {
      tipo: 'destaque_centro',
      texto: 'O RACISMO TAMBÉM É VISUAL.',
      subtexto: 'Descolonizar o olhar é urgente.',
      dicaProfessor: 'Conclua a aula enfatizando que o combate ao racismo passa pela valorização de todas as estéticas.'
    }
  ],
  // AULA 3: NEGRO VS PRETO E O PARDISMO
  'ilgch_12/06': [
    {
      tipo: 'capa',
      titulo: 'Negro vs Preto & o Pardismo',
      subtitulo: 'Identidade, autodeclaração e as heranças da colonização.',
      dicaProfessor: 'Deixe este slide na tela ao iniciar. Esclareça que hoje faremos uma ponte teórica com a divisão de grupos do trabalho.',
      imagemDeFundo: '[Texturas de estéticas africanas e mapas territoriais]'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Negro, Preto e Pardo: O que diz o IBGE?',
      topicos: [
        'Classificação demográfica: O IBGE utiliza o tom de pele autorrelatado em categorias específicas.',
        'Pretos e Pardos: São as duas categorias de cores registradas no recenseamento nacional.',
        'Negro como Conceito Político: O grupo "Negro" é a união de Pretos e Pardos (Pretos + Pardos = Negros).',
        'Por que importa? Essa soma política consolidou a visibilidade e direcionou as políticas públicas de cotas e reparações.',
        'Fato de Debate: Nem todo pardo se autodeclara negro socialmente, expondo tensões na identidade nacional.'
      ],
      dicaProfessor: 'Mostre no quadro a soma matemática: Pretos + Pardos = População Negra. Discuta a relevância disso em termos de dados e direitos.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'O "Pardismo" e a Hierarquia de Cor',
      topicos: [
        'Mito da Democracia Racial: A mentira de que a mistura de raças eliminou o preconceito no Brasil.',
        'Pardismo como Manutenção de Privilégio: O "mulatismo" foi usado para suavizar o racismo e manter negros desunidos.',
        'Gilberto Freyre (Casa-Grande & Senzala): "Branca para casar, mulata para fuder, preta para trabalhar".',
        'Hierarquia Colonial: A citação de Freyre expõe como cada corpo era destinado a uma função de serventia ou posse.',
        'Colorismo: Quanto mais traços europeus (mais clara a pele), maior a "passabilidade" social.'
      ],
      dicaProfessor: 'Use a frase de Freyre para chocar e mostrar como o racismo brasileiro é estruturado no uso e descarte de corpos.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Alienação: O "Preto Jabuticaba"',
      topicos: [
        'Lélia Gonzalez: O conceito do "Preto Jabuticaba" - aquele que é "preto por fora e branco por dentro, mas ainda tem um caroço".',
        'O "Caroço": Por mais que o indivíduo tente embranquecer seus hábitos e gostos, o racismo estrutural sempre o barrará pelo corpo.',
        'Frantz Fanon: Peles Negras, Máscaras Brancas. A neurose de tentar imitar o opressor para ser aceito.',
        'Alienação Identitária: O desejo de pertencer a um mundo que te rejeita gera adoecimento mental.',
        'Resistência: O processo de "tornar-se negro" (Neusa Santos Souza) como cura e libertação.'
      ],
      dicaProfessor: 'Discuta o "caroço" de Lélia Gonzalez como a barreira intransponível do racismo que não se resolve com "educação" ou "dinheiro".'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Povos Originários e Instruções do Trabalho',
      topicos: [
        'Além da Negritude: A saúde e o território dos indígenas são os pilares da nossa formação.',
        'Determinante de Saúde: O território demarcado é o que evita o adoecimento dos povos nativos.',
        'TRABALHO: Pesquisar os povos originários das 5 regiões do Brasil antes de 1500 até hoje.',
        'Escopo: Cada grupo escolhe 1 região e apresenta no mínimo 3 povos nativos.',
        'Entrega: Seminários visuais ou cartazes focados no cenário atual (conflitos de terra e garimpo).'
      ],
      dicaProfessor: 'Faça a transição da alienação urbana para a resistência territorial dos povos originários. Divida os grupos agora.'
    },
    {
      tipo: 'destaque_centro',
      texto: '"Nossos corpos também têm história e nosso território é a nossa identidade."',
      subtexto: 'Cumprimento pedagógico e integrador da Lei Federal 11.645/08.',
      dicaProfessor: 'Finalize a exposição incentivando os alunos a valorizarem as narrativas antes do período português silencioso.'
    }
  ],
  // AULA FUTSAL (REGULAR - TEÓRICA EXPLICATIVA)
  'ap_01/06': [
    {
      tipo: 'capa',
      titulo: 'Futsal: Regras Gerais',
      subtitulo: 'As posições, funções táticas e a geopolítica do jogo de quadra.',
      dicaProfessor: 'Inicie a aula ressaltando que, antes de ir para a quadra física, precisamos compreender o tabuleiro de xadrez que é a tática do futsal.',
      imagemDeFundo: '[Textura de quadra de futsal ou táticas desenhadas]'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Origem e Evolução do Futsal',
      topicos: [
        'A Origem: Nascido na ACM de Montevidéu, Uruguai, em 1934, criado pelo professor Juan Carlos Ceriani.',
        'O Motivo: A escassez de campos e a necessidade de praticar futebol em locais fechados.',
        'Evolução da Bola: Inicialmente era muito pesada e quicava demais ("bola pesada") para se adaptar à quadra de basquete.',
        'Espaço Urbano: Como o futsal se tornou a expressão máxima do esporte urbano nas periferias globais por demandar menos espaço que o futebol de campo.'
      ],
      dicaProfessor: 'Fale sobre como a falta de espaço nas grandes cidades transformou o futsal no esporte mais jogado do país.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Os 4 Pilares: Posições e Funções',
      topicos: [
        'Goleiro: Não apenas defende. É o primeiro organizador de jogadas (goleiro-linha) e possui regras específicas de posse de bola na sua meia quadra.',
        'Fixo: O pilar defensivo. Responsável pela marcação principal, cobertura das subidas dos alas e início da transição tática.',
        'Alas (Direito e Esquerdo): Os motores da equipe. Velozes, responsáveis pela transição lateral, dribles e recomposição na fase defensiva.',
        'Pivô: O ponto de referência no ataque. Joga de costas para o gol adversário, retém a bola para a infiltração dos alas e finaliza.'
      ],
      dicaProfessor: 'Utilize o quadro negro ou desenhos de giz para ilustrar as zonas de movimentação de cada posição.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Sistemas Táticos Básicos',
      topicos: [
        'Sistema 2-2 (Quadrado): Dois jogadores atrás e dois na frente. Ideal para iniciantes, dá solidez, mas pouca mobilidade.',
        'Sistema 3-1 (Triângulo de Entrada): Um fixo, dois alas abertos e um pivô espetado na frente. É o sistema mais comum e equilibrado do futsal moderno.',
        'Sistema 4-0 (Linha móvel): Sem pivô fixo. Todos os quatro jogadores em constante rotação, exigindo excelente condicionamento e inteligência tática.'
      ],
      dicaProfessor: 'Explique que hoje em dia, as posições são dinâmicas. Um fixo pode virar pivô durante a rotação da jogada.'
    },
    {
      tipo: 'texto_simples',
      titulo: 'Ficha de Trabalho Escrito: Pesquisa Teórica',
      topicos: [
        'Objetivo do Trabalho: Desenvolver autonomia intelectual pesquisando regras oficiais e a história de um esporte de quadra ou campo à sua escolha.',
        'Valor: 3 Pontos adicionais no Diário de Frequência do 2º Trimestre.',
        'Estrutura Obrigatória: 1) Capa formal; 2) Introdução com origem histórica; 3) Desenvolvimento com desenho detalhado da quadra tática e 3 regras fundamentais; 4) Referências.',
        'Entrega Rígida: Verifique prazos e entregue em folhas limpas com identificação completa (Nome, Turma, Chamada).'
      ],
      dicaProfessor: 'Diga que o capricho estético no desenho manual da quadra será altamente considerado na nota.'
    },
    {
      tipo: 'destaque_centro',
      texto: '"A quadra é o espaço da cooperação, onde a tática individual serve ao bem comum da equipe."',
      subtexto: 'Educação Física e Cidadania - CIEP 369 & 320',
      dicaProfessor: 'Faça um encerramento estimulando a autodisciplina nos treinos táticos e o respeito mútuo aos adversários.'
    }
  ]
};

// ================= COMPONENTE EXPORTADO =================
interface DecolonialAppProps {
  onBack: () => void;
  setSlideViewerOpen?: (value: any) => void;
  classData?: any;
  setClassData?: any;
  onSave?: (newData: any) => void;
}

export const DecolonialApp: React.FC<DecolonialAppProps> = ({ 
  onBack, 
  setSlideViewerOpen,
  classData,
  setClassData,
  onSave
}) => {
  const [currentView, setCurrentView] = useState(() => {
    return safeLocalStorage.getItem('decolonial_currentView') || 'menu';
  });
  const [selectedAulaData, setSelectedAulaData] = useState<string | null>(() => {
    return safeLocalStorage.getItem('decolonial_selectedAulaData') || null;
  });
  const [planningSubView, setPlanningSubView] = useState<null | '8ano' | 'ap' | 'ap_sexta' | 'gestao'>(() => {
    return (safeLocalStorage.getItem('decolonial_planningSubView') as any) || null;
  });
  const [selectedAulaPlan, setSelectedAulaPlan] = useState<any>(() => {
    const saved = safeLocalStorage.getItem('decolonial_selectedAulaPlan');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentView) {
      safeLocalStorage.setItem('decolonial_currentView', currentView);
    } else {
      safeLocalStorage.removeItem('decolonial_currentView');
    }
  }, [currentView]);

  useEffect(() => {
    if (selectedAulaData) {
      safeLocalStorage.setItem('decolonial_selectedAulaData', selectedAulaData);
    } else {
      safeLocalStorage.removeItem('decolonial_selectedAulaData');
    }
  }, [selectedAulaData]);

  useEffect(() => {
    if (planningSubView) {
      safeLocalStorage.setItem('decolonial_planningSubView', planningSubView);
    } else {
      safeLocalStorage.removeItem('decolonial_planningSubView');
    }
  }, [planningSubView]);

  useEffect(() => {
    if (selectedAulaPlan) {
      safeLocalStorage.setItem('decolonial_selectedAulaPlan', JSON.stringify(selectedAulaPlan));
    } else {
      safeLocalStorage.removeItem('decolonial_selectedAulaPlan');
    }
  }, [selectedAulaPlan]);

  // --- TELA DE MENU ---
  const renderMenu = () => (
    <div className="relative min-h-[calc(100vh-100px)] -mx-3 md:-mx-6 -mt-3 md:-mt-6 overflow-hidden flex flex-col font-sans">
      {/* Premium Atmospheric Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.5]"
        style={{ backgroundImage: "url('/src/assets/images/gestao_bg_premium_1779985655734.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
      </div>

      {/* Glass Dock / Status Bar at top */}
      <div className="relative z-20 flex justify-center mt-4">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full flex items-center gap-6 shadow-2xl">
          <div className="flex gap-4 border-r border-white/10 pr-6 mr-1">
            <Activity size={14} className="text-white/40" />
            <Shield size={14} className="text-white/40" />
            <Zap size={14} className="text-emerald-500 animate-pulse" />
          </div>
          <div className="flex gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 pb-24">
        <button 
          onClick={onBack} 
          className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-white/70 hover:text-white font-bold transition-all bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 shadow-2xl text-xs backdrop-blur-md uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Painel Principal
        </button>

        <div className="max-w-7xl w-full text-center mb-10 md:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-2 text-emerald-500 uppercase"
            style={{ textShadow: '-2px -2px 0 #fff, 0 -2px 0 #fff, 2px -2px 0 #fff, 2px 0 0 #fff, 2px 2px 0 #fff, 0 2px 0 #fff, -2px 2px 0 #fff, -2px 0 0 #fff, 0 0 10px rgba(255,255,255,0.4)' }}
          >
            Gestão do Professor
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs md:text-sm text-white/50 font-black uppercase tracking-[0.5em]"
          >
            Prof. André Brito
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl">
          {[
            {
              id: 'planejamento',
              title: 'PLANEJAMENTO',
              subtitle: 'Cronograma oficial e resumos.',
              icon: <Calendar className="w-24 h-24 text-white/20 group-hover:text-emerald-400/40 transition-colors duration-500 absolute -bottom-4 -right-4 rotate-12" />,
              gradient: 'from-blue-900 to-blue-950',
              action: () => setCurrentView('planejamento'),
              delay: 0.3
            },
            {
              id: 'plano_anual',
              title: 'PLANO ANUAL',
              subtitle: 'Gestão completa das aulas de PE.',
              icon: <Map className="w-24 h-24 text-white/20 group-hover:text-emerald-400/40 transition-colors duration-500 absolute -bottom-4 -right-4 -rotate-12" />,
              gradient: 'from-emerald-900 to-emerald-950',
              action: () => setCurrentView('plano_anual_pe'),
              delay: 0.4
            },
            {
              id: 'aulas',
              title: 'AULAS (Datashow)',
              subtitle: 'Slides para apresentação.',
              icon: <Projector className="w-24 h-24 text-white/20 group-hover:text-emerald-400/40 transition-colors duration-500 absolute -bottom-4 -right-4 rotate-6" />,
              gradient: 'from-purple-900 to-purple-950',
              action: () => setCurrentView('repositorio_aulas'),
              delay: 0.5
            },
            {
              id: 'ocorrencias',
              title: 'OCORRÊNCIAS',
              subtitle: 'Registro de fatos e relatórios de alunos.',
              icon: <ShieldAlert className="w-24 h-24 text-white/20 group-hover:text-emerald-400/40 transition-colors duration-500 absolute -bottom-4 -right-4 -rotate-6" />,
              gradient: 'from-rose-900 to-rose-950',
              action: () => setCurrentView('ocorrencias'),
              delay: 0.6
            },
            {
              id: 'notas',
              title: 'NOTAS',
              subtitle: 'Acesse notas por trimestre.',
              icon: <BarChart3 className="w-24 h-24 text-white/20 group-hover:text-emerald-400/40 transition-colors duration-500 absolute -bottom-4 -right-4 rotate-12" />,
              gradient: 'from-amber-900 to-amber-950',
              action: () => setCurrentView('notas'),
              delay: 0.7
            },
            {
              id: 'repositorio_provas',
              title: 'REPOSITÓRIO DE PROVAS',
              subtitle: 'Crie e acesse avaliações teóricas.',
              icon: <BookOpen className="w-24 h-24 text-white/20 group-hover:text-emerald-400/40 transition-colors duration-500 absolute -bottom-4 -right-4 -rotate-12" />,
              gradient: 'from-cyan-900 to-cyan-950',
              action: () => setCurrentView('repositorio_provas'),
              delay: 0.8
            }
          ].map((card) => (
            <motion.div 
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.6 }}
              onClick={card.action}
              className={`group relative aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-emerald-500/20 bg-gradient-to-br ${card.gradient}`}
            >
              {/* Card Illustration Fallback (Gradient & Icon) */}
              <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
                {card.icon}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 p-1.5 rounded-full">
                  <CheckCircle2 size={16} className="text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-none tracking-tighter uppercase group-hover:text-emerald-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest group-hover:text-white/90 transition-colors">
                  {card.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlanejamentoMenu = () => (
    <div className="p-8 md:p-12 font-sans bg-white/70 backdrop-blur-md rounded-3xl min-h-[500px] border border-slate-300 flex flex-col items-center justify-center">
      <button onClick={() => { setCurrentView('menu'); setPlanningSubView(null); }} className="mb-8 self-start flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
        <ChevronLeft size={20} /> Voltar ao Menu Decolonial
      </button>

      <header className="mb-12 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]">Escolha a Turma</h2>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {[
          { id: '8ano', label: '801 - 802 - 803', sub: 'Cordelia Paiva - 2ª feiras' },
          { id: 'ap', label: 'AP 101 - CIEP 198', sub: 'CIEP 198 (2ª feiras)' },
          { id: 'ap_sexta', label: 'AP 101 - CIEP 369', sub: 'CIEP 369 (6ª feiras)' },
          { id: 'ap_sexta', label: 'AP 101 e 301 - CIEP 320', sub: 'CIEP 320 (6ª feiras)' },
          { id: 'gestao', label: 'ILGCH - Decolonização de corpos, estética, mídia e espaços', sub: 'CIEP 476 - 6ª feiras' }
        ].map((turma, idx) => (
          <button 
            key={idx}
            onClick={() => setPlanningSubView(turma.id as any)}
            className="p-8 bg-white hover:bg-slate-100 transition-all text-slate-800 rounded-2xl border border-slate-300 hover:border-emerald-500 shadow-sm flex flex-col items-center gap-2 group"
          >
            <span className="font-black text-xl group-hover:text-emerald-600 transition-colors uppercase tracking-tighter">{turma.label}</span>
            <span className="text-sm font-bold text-slate-500">{turma.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // --- RENDER AULA CARD (COMPARTILHADO) ---
  const renderCard = (aula: any, index: number, corHeader: string, corBadge: string, turmaContext: string = 'ilgch') => {
    // Para classes (8ano/ejanem), usamos os fields do PE_PLAN, para ILGCH usamos os do cronograma.
    const isPassar = aula.trabalho === 'passar';
    const isRecolher = aula.trabalho === 'recolher';
    const isConcluido = aula.status === 'eja_concluido' || aula.status === 'concluido';
    const hasDestaque = aula.destaque;
    
    let isPast = false;
    if (aula.data) {
      const parts = aula.data.split('/');
      if (parts.length === 2) {
        const classDate = new Date(2026, parseInt(parts[1]) - 1, parseInt(parts[0]), 23, 59, 59);
        isPast = classDate.getTime() < new Date('2026-06-07T20:01:27Z').getTime();
      }
    }
    
    let baseCardClasses = `flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 relative cursor-pointer group `;
    
    if (hasDestaque) baseCardClasses += ` ring-4 ring-amber-400 ring-offset-2 z-10 scale-[1.02] shadow-xl`;
    else if (isPassar) baseCardClasses += ` ring-4 ring-amber-300 ring-offset-1`;
    else if (isRecolher) baseCardClasses += ` ring-4 ring-emerald-400 ring-offset-1`;

    return (
      <div key={index} onClick={() => setSelectedAulaPlan(aula)} className={baseCardClasses} title="Clique para ver o roteiro da aula">
        
        <div className={`px-4 py-3 flex justify-between items-center ${corHeader} text-white`}>
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-wide">Aula {index + 1}</span>
            {isPast && (
              <span className="flex items-center gap-1 bg-emerald-500/90 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm border border-emerald-400/50">
                <CheckCircle2 size={12} strokeWidth={3} /> Aula Dada
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 font-bold bg-white/20 px-2 py-1 rounded-md text-sm backdrop-blur-sm shadow-sm">
            📅 {aula.data}
          </span>
        </div>
        
        <div className="px-4 pt-3 pb-1">
          <span className={`inline-block px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${corBadge}`}>
            {aula.modulo || 'Aula '}
          </span>
        </div>

        <hr className="mx-4 mt-2 mb-3 border-slate-100" />
        
        <div className="px-4 pb-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-700 transition-colors">{aula.titulo}</h3>
          <p className="text-sm text-slate-600 flex-grow leading-relaxed line-clamp-3">{aula.desc}</p>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
            <span className="bg-blue-50 px-2 py-1 rounded w-full text-center">👆 Ver roteiro e Dinâmica</span>
          </div>
        </div>

        {aula.trabalho && (
          <div className={`p-3 font-bold text-sm flex items-center gap-2 justify-center
            ${isPassar ? 'bg-amber-100 text-amber-900 border-t border-amber-200' : 'bg-emerald-100 text-emerald-900 border-t border-emerald-200'}`}
          >
            {isPassar ? '⚠️ PASSAR TRABALHO (3pts)' : '📥 RECOLHER TRABALHO'}
          </div>
        )}
      </div>
    );
  };


  const renderAulaModal = () => {
    if (!selectedAulaPlan) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm transition-opacity" onClick={() => setSelectedAulaPlan(null)}>
        <div 
          className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          style={{ maxHeight: '90vh' }}
          onClick={e => e.stopPropagation()}
        >
          <div className={`px-6 py-4 flex justify-between items-center ${selectedAulaPlan.tri === '2º Tri' ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
            <div>
              <h3 className="text-xl font-extrabold">{selectedAulaPlan.titulo}</h3>
              <p className="text-sm opacity-90">{selectedAulaPlan.tri} • Aula {selectedAulaPlan.data}</p>
            </div>
            <button 
              onClick={() => setSelectedAulaPlan(null)} 
              className="text-white hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-colors"
              aria-label="Fechar"
            >
              &times;
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-grow bg-slate-50">
            <div className="inline-block px-3 py-1 mb-4 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-700">
              {selectedAulaPlan.modulo}
            </div>
            
            {selectedAulaPlan.status === 'eja_concluido' && (
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-sm">
                <p className="text-sm font-bold text-blue-900 flex items-center gap-2">
                  ✅ Status da Semana:
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  O planejamento agora é aplicar a estrutura de mídia e padrões para as turmas regulares.
                </p>
              </div>
            )}

            <div className="text-slate-700 text-[15px] leading-relaxed space-y-4">
              {selectedAulaPlan.resumo.split('\n').map((paragraph: string, idx: number) => {
                if (!paragraph.trim()) return null;
                
                const isAmparoLegal = paragraph.includes('📜 **Amparo Legal');
                const isDinamica = paragraph.includes('🗣️ **O que falar/Dinâmica');
                const isDinamicaAlt = paragraph.includes('🗣️ **Dinâmica');
                const isObjetivo = paragraph.includes('🎯 **Objetivo da Aula');
                const isLembrete = paragraph.includes('⚠️ **LEMBRETE');
                const isTrabalho = paragraph.includes('⚠️ **TRABALHO');
                const isRecolher = paragraph.includes('📥 **TRABALHO');
                const isReflexão = paragraph.includes('📜 **Reflexão');
                
                const formattedText = paragraph.split('**').map((part, i) => 
                  i % 2 === 1 ? <strong key={i} className="text-slate-900">{part}</strong> : part
                );

                if (isAmparoLegal || isReflexão) {
                  return (
                    <div key={idx} className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg shadow-sm text-amber-900">
                      {formattedText}
                    </div>
                  );
                }

                if (isDinamica || isDinamicaAlt || isObjetivo) {
                   return (
                      <div key={idx} className={`mt-4 p-4 border rounded-lg shadow-sm ${isObjetivo ? 'bg-slate-100 border-slate-200 text-slate-900 font-medium' : 'bg-blue-50/50 border-blue-100 text-slate-800'}`}>
                         {formattedText}
                      </div>
                   );
                }

                if (isLembrete || isTrabalho || isRecolher) {
                   return (
                      <div key={idx} className={`mt-4 p-4 border rounded-lg shadow-sm ${isRecolher ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900 font-bold'}`}>
                         {formattedText}
                      </div>
                   );
                }

                return <p key={idx}>{formattedText}</p>;
              })}
            </div>
          </div>
          
          <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-end">
            <button 
              onClick={() => setSelectedAulaPlan(null)} 
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition-colors shadow-sm"
            >
              Entendido, fechar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPlanejamentoClasses = (turma: '8ano' | 'ap' | 'ap_sexta') => {
    const planos = PE_PLAN[turma] || [];
    const tri1 = planos.filter(aula => aula.tri === '1º Tri');
    const tri2 = planos.filter(aula => aula.tri === '2º Tri');
    const tri3 = planos.filter(aula => aula.tri === '3º Tri');
    
    let title = 'Planejamento: 8º Ano';
    if (turma === 'ap') title = 'Planejamento: AP (Segundas)';
    if (turma === 'ap_sexta') title = 'Planejamento: AP (Sextas)';

    return (
      <div className="p-4 md:p-8 font-sans text-slate-800 relative bg-slate-50 rounded-2xl shadow-2xl">
        <button onClick={() => setPlanningSubView(null)} className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 w-fit transition-all hover:bg-slate-50">
           <ChevronLeft size={20} /> Voltar para Seleção de Turma
        </button>

        <header className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]">{title}</h2>
          <p className="text-slate-500 mt-3 font-black uppercase tracking-widest text-sm">Cronograma de Educação Física e Cultura Corporal</p>
        </header>

        {turma === '8ano' && (
          <div className="mb-8 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl shadow-sm border border-amber-100">
            <p className="text-sm font-black text-amber-900 mb-1 uppercase tracking-widest flex items-center gap-2">
              <Info size={16} /> ADAPTAÇÃO DE ESPAÇO FÍSICO
            </p>
            <p className="text-sm text-amber-800 leading-relaxed font-medium">
              As aulas do 8º ano foram adaptadas para o formato teórico/dentro de sala por falta de espaço físico na escola. 
              O deslocamento para a quadra da praça pública próxima não será realizado com turmas superiores a 30 alunos sem acompanhamento extra, 
              visando a segurança dos estudantes e a responsabilidade docente em via pública.
            </p>
          </div>
        )}
        
        <div className={`space-y-12 ${selectedAulaPlan ? 'blur-sm pointer-events-none' : ''} transition-all duration-300`}>
          {tri1.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-3 bg-blue-500 rounded-full shadow-lg"></div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">1º Trimestre (Final)</h2>
                <div className="flex-grow border-t-2 border-slate-200 border-dashed ml-4"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {tri1.map((aula, idx) => renderCard(aula, idx, 'bg-blue-500', 'bg-blue-50 text-blue-800 border border-blue-200', turma))}
              </div>
            </section>
          )}

          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-3 bg-blue-600 rounded-full shadow-lg"></div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">2º Trimestre</h2>
              <div className="flex-grow border-t-2 border-slate-200 border-dashed ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {tri2.map((aula, idx) => renderCard(aula, idx + (tri1.length), 'bg-blue-600', 'bg-blue-50 text-blue-800 border border-blue-200', turma))}
            </div>
          </section>
          
          <div className="relative py-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-300"></div></div>
            <span className="relative px-6 bg-slate-50 text-slate-400 text-sm font-black uppercase tracking-[0.3em]">Mudança de Trimestre</span>
          </div>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-3 bg-green-600 rounded-full shadow-lg"></div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">3º Trimestre</h2>
              <div className="flex-grow border-t-2 border-slate-200 border-dashed ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {tri3.map((aula, idx) => renderCard(aula, idx, 'bg-green-600', 'bg-green-50 text-green-800 border border-green-200', turma))}
            </div>
          </section>
        </div>
      </div>
    );
  };


  const renderPlanejamento = () => {
    return (
      <div className="relative">
        {renderAulaModal()}
        {!planningSubView && renderPlanejamentoMenu()}
        {planningSubView === 'gestao' && renderPlanejamentoGestao()}
        {(planningSubView === '8ano' || planningSubView === 'ap' || planningSubView === 'ap_sexta') && renderPlanejamentoClasses(planningSubView)}
      </div>
    );
  };


  // --- TELA DE PLANEJAMENTO ---
  const renderPlanejamentoGestao = () => {
    const tri2 = cronograma.filter(aula => aula.tri === '2º Tri');
    const tri3 = cronograma.filter(aula => aula.tri === '3º Tri');

    return (
      <div className="p-4 md:p-8 font-sans text-slate-800 relative bg-slate-50 rounded-2xl shadow-2xl">
        <button onClick={() => setPlanningSubView(null)} className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 w-fit transition-all hover:bg-slate-50">
           <ChevronLeft size={20} /> Voltar para Seleção de Turma
        </button>

        <header className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]">Planejamento: ILGCH</h2>
          <p className="text-slate-500 mt-3 font-black uppercase tracking-widest text-sm">Cultura Corporal e Educação em Direitos Humanos</p>
        </header>

        {/* Conteúdo do Planejamento */}
        <div className={`max-w-7xl mx-auto space-y-8 ${selectedAulaPlan ? 'blur-sm pointer-events-none' : ''} transition-all duration-200`}>
          
          <header className="bg-white rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="bg-slate-900 text-white px-6 py-2 flex items-center gap-3">
               <span className="text-xl">⚖️</span>
               <p className="text-xs md:text-sm font-semibold tracking-wide">
                 Currículo estruturado em cumprimento às <span className="text-amber-400 font-bold">Leis Federais 10.639/03 e 11.645/08</span>.
               </p>
            </div>

            <div className="p-6 md:p-8 relative">
              <div className="relative z-10">
                <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                  Decolonização de Corpos, Identidades, Mídias e Espaços
                </h1>
                <p className="text-base md:text-lg text-slate-600 mb-4 font-medium">
                  Professor <strong className="text-blue-600 font-bold">André Brito</strong> • Turma 1001 (Aulas às Sextas)
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded border border-slate-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span> 
                  Disciplina SEEDUC: Gestão do Professor (Itinerário de Linguagens e Ciências Humanas)
                </div>
              </div>
            </div>
          </header>

          <section>
            <div className="flex items-center gap-3 mb-6 mt-8">
              <div className="h-8 w-3 bg-blue-600 rounded-full shadow-sm"></div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">2º Trimestre</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tri2.map((aula, idx) => renderCard(aula, idx, 'bg-blue-600', 'bg-blue-50 text-blue-800 border border-blue-200', 'ilgch'))}
            </div>
          </section>

          <div className="flex items-center my-12 opacity-50">
            <div className="flex-grow border-t border-slate-300"></div>
            <span className="mx-4 text-slate-400 text-xs font-black uppercase tracking-widest">Avanço de Trimestre</span>
            <div className="flex-grow border-t border-slate-300"></div>
          </div>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-3 bg-green-600 rounded-full shadow-sm"></div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">3º Trimestre</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tri3.map((aula, idx) => renderCard(aula, idx, 'bg-green-600', 'bg-green-50 text-green-800 border border-green-200', 'ilgch'))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // --- TELA SELEÇÃO AULAS ---
  const renderAulasMenu = () => (
    <div className="p-8 md:p-12 font-sans bg-white/70 backdrop-blur-md rounded-3xl min-h-[500px] border border-slate-300 flex flex-col items-center justify-center">
      <button onClick={() => setCurrentView('menu')} className="mb-8 self-start flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
        <ChevronLeft size={20} /> Voltar ao Menu Decolonial
      </button>

      <header className="mb-12 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]">Escolha a Turma</h2>
      </header>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {[
          { id: '8ano', label: '801 - 802 - 803', sub: 'Cordelia Paiva - 2ª feiras' },
          { id: 'ap', label: 'AP 101 - CIEP 198', sub: 'CIEP 198 (2ª feiras)' },
          { id: 'ap_sexta', label: 'AP 101 - CIEP 369', sub: 'CIEP 369 (6ª feiras)' },
          { id: 'ap_sexta', label: 'AP 101 e 301 - CIEP 320', sub: 'CIEP 320 (6ª feiras)' },
          { id: 'gestao', label: 'ILGCH - Decolonização de corpos, estética, mídia e espaços', sub: 'CIEP 476 - 6ª feiras' }
        ].map((turma, idx) => (
          <button 
            key={idx}
            onClick={() => { setPlanningSubView(turma.id as any); setCurrentView('repositorio_aulas_lista'); }}
            className="p-8 bg-white hover:bg-slate-100 transition-all text-slate-800 rounded-2xl border border-slate-300 hover:border-blue-500 shadow-sm flex flex-col items-center gap-2 group"
          >
            <span className="font-black text-xl group-hover:text-blue-600 transition-colors uppercase tracking-tighter">{turma.label}</span>
            <span className="text-sm font-bold text-slate-500">{turma.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
  const renderRepositorioAulas = () => {
    const planningSubViewKey = planningSubView === 'gestao' ? 'ilgch' : planningSubView;
    const activeCronograma = PE_PLAN[planningSubViewKey as any] || [];
    
    return (
    <div className="p-6 md:p-12 font-sans bg-white/70 backdrop-blur-md rounded-2xl border border-slate-300 shadow-xl">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => { setCurrentView('planejamento'); setPlanningSubView(null); }} className="mb-8 flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors bg-white px-4 py-2 rounded-lg shadow-sm w-fit border border-slate-200">
          <ChevronLeft size={20} /> Voltar para Seleção de Turma
        </button>

        <header className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]">
            <LayoutGrid className="text-blue-600 drop-shadow-sm" size={40} /> AULAS PRONTAS ({planningSubView === 'gestao' ? 'ILGCH' : planningSubView})
          </h2>
          <p className="text-slate-500 mt-3 font-black tracking-widest text-sm uppercase">Escolha a aula de hoje para abrir os slides.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCronograma.map((aula, index) => {
            const currentSubView = planningSubViewKey as string;
            const slideKey = `${currentSubView}_${aula.data}`;
            const temSlides = (slidesData as any)[slideKey] !== undefined;
            
            let isPast = false;
            if (aula.data) {
              const parts = aula.data.split('/');
              if (parts.length === 2) {
                const classDate = new Date(2026, parseInt(parts[1]) - 1, parseInt(parts[0]), 23, 59, 59);
                isPast = classDate.getTime() < new Date('2026-06-07T20:01:27Z').getTime();
              }
            }
            
            return (
              <div key={aula.data} className={`bg-white rounded-xl border border-slate-300 overflow-hidden flex flex-col ${temSlides ? 'hover:shadow-lg hover:-translate-y-1 transition-all' : 'opacity-70'}`}>
                <div className={`px-4 py-3 ${temSlides ? 'bg-blue-600' : 'bg-slate-300'} text-white font-bold text-sm flex justify-between uppercase items-center`}>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold tracking-wide">Aula {index + 1}</span>
                    {isPast && (
                      <span className="flex items-center gap-1 bg-emerald-500/90 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm border border-emerald-400/50">
                        <CheckCircle2 size={12} strokeWidth={3} /> Aula Dada
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-md text-[10px] font-black tracking-widest backdrop-blur-sm shadow-sm">
                    📅 {aula.data}
                  </span>
                </div>
                <div className="px-4 pt-4 pb-2">
                  <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${temSlides ? 'bg-blue-50 text-blue-700 font-black border border-blue-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                    {aula.modulo || 'Aula'}
                  </span>
                </div>
                <div className="px-5 pt-2 pb-6 flex-grow flex flex-col justify-center">
                  <h3 className={`text-lg font-black mb-2 uppercase leading-tight ${temSlides ? 'text-slate-800' : 'text-slate-600'}`}>{aula.titulo}</h3>
                  <p className="text-sm font-medium text-slate-500 line-clamp-3">{aula.desc}</p>
                </div>
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 mt-auto flex flex-col gap-2">
                  {temSlides ? (
                    <button 
                      onClick={() => { setSelectedAulaData(slideKey); setCurrentView('player'); }}
                      className="w-full py-2.5 bg-blue-600 text-white hover:bg-blue-700 font-extrabold tracking-wide rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow"
                    >
                      <Presentation size={18} /> PROJETAR SLIDES
                    </button>
                  ) : (
                    <button disabled className="w-full py-2.5 bg-slate-200 text-slate-400 font-black rounded-lg cursor-not-allowed text-xs tracking-widest uppercase transition-all">
                      Ainda não criado
                    </button>
                  )}

                  <button 
                    onClick={() => setSelectedAulaPlan(aula)}
                    className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-extrabold tracking-wide rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm text-xs"
                  >
                    <ClipboardList size={14} className="text-blue-600" /> 🗣️ VER ROTEIRO DE FALA
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    );
  };

  // ROTEADOR
  return (
    <div className="w-full">
      {currentView === 'menu' && renderMenu()}
      {currentView === 'planejamento' && renderPlanejamento()}
      {currentView === 'plano_anual_pe' && <PlanoAnualPE onBack={() => setCurrentView('menu')} />}
      {currentView === 'repositorio_aulas' && renderAulasMenu()}
      {currentView === 'repositorio_aulas_lista' && renderRepositorioAulas()}
      {currentView === 'player' && (
        <ExternalSlidePlayer 
          selectedAulaData={selectedAulaData}
          setSlideViewerOpen={setSlideViewerOpen}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'ocorrencias' && <OcorrenciasView onBack={() => setCurrentView('menu')} />}
      {currentView === 'notas' && (
        <GradesView 
          onBack={() => setCurrentView('menu')} 
          classData={classData}
          setClassData={setClassData}
          onSave={onSave}
        />
      )}
      {currentView === 'repositorio_provas' && <ExamRepositoryView onBack={() => setCurrentView('menu')} />}
    </div>
  );
};

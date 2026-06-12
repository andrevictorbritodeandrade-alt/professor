import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, Presentation, ChevronLeft, ChevronRight, Home, 
  Info, Printer, LayoutGrid, Calendar, Activity, Shield, 
  Zap, Search, CheckCircle2 
} from 'lucide-react';
import { PE_PLAN } from '../data/planosPE';
import { PlanoAnualPE } from './PlanoAnualPE';
import { OcorrenciasView } from './OcorrenciasView';
import { ChalkboardDiagram } from './ChalkboardDiagram';
import { ALTINHA_FUTVOLEI_SLIDES, SLIDES_3TRI, SLIDES_JOGOS_TABULEIRO, SLIDES_GENERICOS } from '../data/corpoMidiaSlides';

// ================= DADOS DO CRONOGRAMA =================
const cronograma = PE_PLAN['ilgch'] || [];

// ================= DADOS DOS SLIDES DA AULA =================
interface Slide {
  tipo: string;
  titulo?: string;
  subtitulo?: string;
  topicos?: string[];
  dicaProfessor?: string;
  imagemDeFundo?: string;
  texto?: string;
  subtexto?: string;
}

const slidesData: Record<string, Slide[]> = {
  // AULAS 3º TRIMESTRE
  'ilgch_04/09': SLIDES_3TRI['Gênero, Sociedade e Esporte'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_11/09': SLIDES_3TRI['O Apagamento Invisível'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_18/09': SLIDES_3TRI['Divisão Sexista do Corpo'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_02/10': SLIDES_3TRI['Hipersexualização e Espetáculo'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_09/10': SLIDES_3TRI['Equidade Salarial no Esporte'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_16/10': SLIDES_3TRI['As Pioneiras Olímpicas'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_06/11': SLIDES_3TRI['Debate Integrador'].map(s => ({...s, tipo: s.type || 'texto'})),
  'ilgch_13/11': SLIDES_3TRI['Síntese Final'].map(s => ({...s, tipo: s.type || 'texto'})),

  // AULAS FUTEVOLEI (REGULAR)
  '8ano_18/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  '8ano_25/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_18/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_25/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_sexta_15/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),
  'ap_sexta_22/05': ALTINHA_FUTVOLEI_SLIDES.map(s => ({...s, tipo: s.type || 'texto_simples'})),

  // AULAS 2º TRIMESTRE (JOGOS DE TABULEIRO)
  '8ano_08/06': SLIDES_JOGOS_TABULEIRO.map(s => ({...s, tipo: s.tipo || 'texto'})),
  '8ano_15/06': SLIDES_GENERICOS['Jogos do Mundo'].map((s: any) => ({...s, tipo: s.type || 'texto'})),
  '8ano_22/06': SLIDES_GENERICOS['Jogos Cooperativos'].map((s: any) => ({...s, tipo: s.type || 'texto'})),
  'ap_12/06': SLIDES_JOGOS_TABULEIRO.map(s => ({...s, tipo: s.tipo || 'texto'})),
  'ap_sexta_19/06': SLIDES_JOGOS_TABULEIRO.map(s => ({...s, tipo: s.tipo || 'texto'})),

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
  'ap_sexta_12/06': [
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
}

export const DecolonialApp: React.FC<DecolonialAppProps> = ({ onBack, setSlideViewerOpen }) => {
  const [currentView, setCurrentView] = useState('menu');
  const [selectedAulaData, setSelectedAulaData] = useState<string | null>(null);
  const [planningSubView, setPlanningSubView] = useState<null | '8ano' | 'ap' | 'ap_sexta' | 'gestao'>(null);
  const [selectedAulaPlan, setSelectedAulaPlan] = useState<any>(null);

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl">
          {[
            {
              id: 'planejamento',
              title: 'PLANEJAMENTO',
              subtitle: 'Cronograma oficial e resumos.',
              image: '/src/assets/images/planejamento_card_premium_1779985671332.png',
              action: () => setCurrentView('planejamento'),
              delay: 0.3
            },
            {
              id: 'plano_anual',
              title: 'PLANO ANUAL',
              subtitle: 'Gestão completa das aulas de PE.',
              image: '/src/assets/images/plano_anual_card_premium_1779985689437.png',
              action: () => setCurrentView('plano_anual_pe'),
              delay: 0.4
            },
            {
              id: 'aulas',
              title: 'AULAS (Datashow)',
              subtitle: 'Slides para apresentação.',
              image: '/src/assets/images/aulas_datashow_card_premium_1779985704354.png',
              action: () => setCurrentView('repositorio_aulas'),
              delay: 0.5
            },
            {
              id: 'ocorrencias',
              title: 'OCORRÊNCIAS',
              subtitle: 'Registro de fatos e relatórios de alunos.',
              image: '/src/assets/images/ocorrencias_card_premium_1780922149802.png',
              action: () => setCurrentView('ocorrencias'),
              delay: 0.6
            }
          ].map((card) => (
            <motion.div 
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.6 }}
              onClick={card.action}
              className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl border border-white/5 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-emerald-500/10"
            >
              {/* Card Illustration */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
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
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest group-hover:text-white/70 transition-colors">
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
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 mt-auto">
                  {temSlides ? (
                    <button 
                      onClick={() => { setSelectedAulaData(slideKey); setCurrentView('player'); }}
                      className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 font-extrabold tracking-wide rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow"
                    >
                      <Presentation size={18} /> PROJETAR SLIDES
                    </button>
                  ) : (
                    <button disabled className="w-full py-3 bg-slate-200 text-slate-400 font-black rounded-lg cursor-not-allowed text-xs tracking-widest uppercase transition-all">
                      Ainda não criado
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    );
  };

  // --- TELA PLAYER DE SLIDES (Estilo Datashow de Alto Contraste) ---
  const SlidePlayer = () => {
    const getSlides = () => {
      if (!selectedAulaData) return null;
      
      const uIndex = selectedAulaData.lastIndexOf('_');
      const tId = uIndex !== -1 ? selectedAulaData.substring(0, uIndex) : '';
      const dStr = uIndex !== -1 ? selectedAulaData.substring(uIndex + 1) : '';
      const isApTurma = tId === 'ap' || tId === 'ap_sexta';

      if (isApTurma) {
        const plans = PE_PLAN[tId] || [];
        const aula = plans.find(a => a.data === dStr);
        if (aula) {
          const isPratica = aula.titulo.toUpperCase().includes('PRÁTICA') && !aula.titulo.toUpperCase().includes('MEIO A MEIO') && !aula.titulo.toUpperCase().includes('TEÓRICA');
          
          if (isPratica) {
            return [
              {
                tipo: 'pratica',
                type: 'pratica',
                titulo: aula.titulo,
                title: aula.titulo,
                texto: aula.desc,
                content: aula.desc,
                subtexto: "🏃‍♂️ PEGAR O MATERIAL DA DISCIPLINA E PARTIR PARA A QUADRA!",
                dicaProfessor: "Professor: Verifique a postura dos alunos, estimule o fairplay e garanta o controle disciplinar na quadra."
              }
            ];
          }

          // Dynamic Slides based on topics - EXACTLY 6 DETAILED SLIDES per topic
          const tUpper = aula.titulo.toUpperCase();
          
          if (tUpper.includes('FUTEVÔLEI')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "História, Regras e a Cultura de Praia no Rio de Janeiro",
                dicaProfessor: "Acolha a turma. Deixe este slide projetado no Datashow enquanto organiza as carteiras."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "📜 Origem e Resistências Urbanas",
                topicos: [
                  "Criado em Copacabana nos anos 60 para burlar a lei de proibição de jogar futebol na areia.",
                  "Tornou-se um símbolo máximo da adaptação cultural carioca às pressões urbanas do pátio público.",
                  "Propaga a agilidade, flexibilidade, espírito de solidariedade e o domínio corporal refinado.",
                  "Hoje é praticado no mundo todo, migrando das areias de praia para as quadras poliesportivas escolares."
                ],
                dicaProfessor: "Explique como a criatividade brasileira consegue contornar leis rígidas inventando esportes de alta categoria."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "📏 Quadra e Medidas Oficiais",
                topicos: [
                  "Formato: Retângulo perfeito de 18 metros de comprimento por exactly 9 metros de largura.",
                  "Divisão central: Uma rede divisória que suspende a 2,20m de altura (masculino) ou 2,00m (feminino).",
                  "Terreno oficial: Areia com profundidade mínima de 30 centímetros para amortecer quedas de saltos.",
                  "Nas escolas, adaptamos perfeitamente para o cimento ou saibro, demarcando as mesmas dimensões espaciais."
                ],
                dicaProfessor: "Destaque a necessidade de raciocínio espacial para dimensionar a força do toque de acordo com a quadra."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Roteiro para Desenhar no Quadro",
                topicos: [
                  "Passo 1: Esboce um grande retângulo na horizontal medindo aproximadamente 50x25cm no quadro.",
                  "Passo 2: Divida o retângulo exatamente ao meio com uma linha vertical, escrevendo 'Rede - 2,20m'.",
                  "Passo 3: Escreva '9m' na linha de fundo, e escreva '18m' na linha lateral para demonstrar a escala.",
                  "Passo 4: Desenhe pequenas bolinhas indicando a dupla 'A' e 'B' distribuídas para cobrir o fundo."
                ],
                dicaProfessor: "Chame um aluno para desenhar a rede no quadro utilizando giz colorido para reter a atenção."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🛡️ Regras Técnicas de Toque e Pontuação",
                topicos: [
                  "É estritamente proibido encostar as mãos, antebraços ou braços na bola sob qualquer circunstância.",
                  "Cada dupla tem o direito de realizar no máximo 3 toques na bola antes de enviá-la para a quadra adversária.",
                  "O mesmo atleta não pode realizar dois toques seguidos na bola (exige cooperação mútua na dupla).",
                  "Partidas de futevôlei costumam ocorrer em 'Rally' simples com sets únicos de 18 pontos."
                ],
                dicaProfessor: "Explique a dinâmica do ombro, peito e coxa como armas técnicas para estabilizar as jogadas."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "🎯 DESAFIO COGNITIVO ESCRITO",
                subtexto: "Copie o desenho da quadra de Futevôlei com suas medidas e responda: por que as mãos são proibidas se o futevôlei usa a rede do Vôlei?",
                dicaProfessor: "Monitore o processo de cópia e escrita nos cadernos individuais de ciclo de aprendizagem AP."
              }
            ];
          }

          if (tUpper.includes('FUTSAL') && tUpper.includes('REGRAS GERAIS')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "Posições de Jogo, Linhas Limites e Regulamento no Piso Liso",
                dicaProfessor: "Projete no Datashow para recepção silenciosa e foco mental na sala de aula."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "📏 Quadra Oficial e Dimensões Técnicas",
                topicos: [
                  "Comprimento oficial: Varia de 38 a 42 metros de extensão longitudinal nas linhas laterais de fundo.",
                  "Largura oficial: Varia de 20 a 25 metros de extensão lateral.",
                  "Balizas (traves de meta): Medem exatamente 3 metros de largura por 2 metros de altura útil.",
                  "Área do goleiro: Um semicírculo circular perfeito com raio de 6 metros medidores a partir de cada poste de trave."
                ],
                dicaProfessor: "Chame atenção para a incrível diferença geométrica e de velocidade entre a quadra lisa e o campo de grama."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Roteiro para Desenhar no Quadro",
                topicos: [
                  "Passo 1: Desenhe um retângulo proporcional de 60x30cm e trace a linha central divisória.",
                  "Passo 2: No meio da linha central, trace o círculo menor de saída correspondendo ao raio de 3m.",
                  "Passo 3: Use o compasso ou giz em arco para desenhar as áreas de meta delimitando os 6m de proteção.",
                  "Passo 4: No topo de cada área, faça um pontinho de Pênalti a 6m e o ponto de segundo pênalti a 10m."
                ],
                dicaProfessor: "Enquanto desenha, instigue os alunos a copiarem a simetria de marcas e linhas limites."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "👥 Posições e Atribuições Técnicas",
                topicos: [
                  "1 Goleiro: Defensor máximo da meta, único com permissão de tocar a bola com as mãos na área restrita.",
                  "1 Fixo: O pilar defensivo central do time, organiza a marcação e aciona passes de transição rápida.",
                  "2 Alas (Esquerdo/Direito): Os motores de movimentação rápida pelas bordas laterais ofensivas do pátio.",
                  "1 Pivô: O atacante de ponta que joga no ataque, de costas para o gol, segurando a bola e servindo os alas."
                ],
                dicaProfessor: "Demonstre no quadro como o pivô precisa jogar flutuando perto da área de meta adversária."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🩹 Regras de Cartões e Tempo Limite",
                topicos: [
                  "Tempo de reposição: Cobranças de lateral, escanteio e faltas devem ser feitas em no máximo 4 segundos.",
                  "Regra do Recuo ao Goleiro: O goleiro só pode reter a bola com os pés por 4 segundos em sua quadra de defesa.",
                  "Acúmulo de Faltas: A partir da 5ª falta coletiva no período, todos os tiros livres viram diretos sem barreira do ponto de 10m.",
                  "Substituições: Livres, ilimitadas e volantes dentro da zona de substituição demacada ao lado do banco."
                ],
                dicaProfessor: "Destaque a necessidade de controle emocional rigoroso nas substituições rápidas do futsal."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "📋 TRABALHO TRIMESTRAL (3 Pontos)",
                subtexto: "Copiar do roteiro no quadro: Pesquisa individual sobre Esportes de Quadra (Capa, Introdução, Desenvolvimento: Desenhar campo/quadra com medidas oficiais, 3 Regras principais e Referências). Entrega: 3ª aula de Vôlei!",
                dicaProfessor: "Insista no valor da nota, na necessidade de capricho no desenho manual e no cronograma rígido."
              }
            ];
          }

          if (tUpper.includes('FUTSAL') && tUpper.includes('SISTEMAS')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "Inteligência Tática: Movimentação Coletiva com Sistemas 2-2 e 3-1",
                dicaProfessor: "Esta é uma aula MEIO A MEIO. Primeiro ensinamos em sala projetada e depois na quadra escolar."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🗺️ O Sistema Tático 2-2 (Quadrado)",
                topicos: [
                  "Estrutura: Dois jogadores posicionados atrás (defensores) e dois jogadores mais avançados (atacantes).",
                  "Indicado para: Equipes de iniciantes ou quadras extremamente estreitas com pouco espaço de manobra lateral.",
                  "Vantagem: Simples cobertura mútua que evita que a defesa fique totalmente exposta em contra-ataques.",
                  "Desvantagem: Cria pouca mobilidade ofensiva, deixando o jogo estático se os atletas não flutuarem."
                ],
                dicaProfessor: "Foque na simplicidade do quadrado no início da explicação tática básica de pátio."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Desenho do Sistema 2-2 no Quadro",
                topicos: [
                  "Passo 1: Esboce a quadra de futsal reduzida.",
                  "Passo 2: Marque dois círculos pretos com a letra 'D' (Defensores) posicionados lado a lado à frente da área metálica.",
                  "Passo 3: Marque dois círculos pretos com a letra 'A' (Atacantes) posicionados em linha lado a lado no ataque.",
                  "Passo 4: Mostre o contra-ataque traçando setas de recuo entre a linha de ataque e defesa."
                ],
                dicaProfessor: "Explore o quadro destacando como a marcação em zona é muito facilitada no sistema quadrado."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "💎 O Sistema Tático 3-1 (Diamante)",
                topicos: [
                  "Estrutura: 1 Fixo recuado centralizado, 2 Alas bem abertos nas extremidades e 1 Pivô à frente.",
                  "Triangulações de Passe: Oferece constantes apoios laterais e diagonais que facilitam trocas rápidas de passe.",
                  "Vantagem: Altamente ofensivo e dinâmico, dificulta a marcação por zona adversária ao abrir o campo.",
                  "Desvantagem: Exige excelente condicionamento físico dos alas para recuar e preencher o vácuo defensivo."
                ],
                dicaProfessor: "Explique como o jogador de futsal profissional precisa flutuar nas posições para abrir as defesas montadas."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Desenho do Sistema 3-1 no Quadro",
                topicos: [
                  "Passo 1: Desenhe a quadra reduzida com giz colorido para os jogadores táticos de quadra.",
                  "Passo 2: Posicione a bolinha do Fixo bem centralizada à frente do goleiro na saída de defesa.",
                  "Passo 3: Posicione o Ala Esquerdo e Ala Direito bem rente às linhas laterais, formando a linha média.",
                  "Passo 4: Posicione o Pivô centralizado à frente, ligando as quatro pontas com linhas tracejadas (diamante)."
                ],
                dicaProfessor: "Trace flechas das alas cruzando para o centro mostrando as transições de triângulo do pivô."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "🏃‍♂️ COMPUTAÇÃO MOTORA ATIVA",
                subtexto: "Vamos descer de forma organizada para a quadra para ensaiarmos drills táticos em grupos de 4 integrantes!",
                dicaProfessor: "Estipule o quarteto tático de futsal antes da liberação e de descermos para o pátio esportivo."
              }
            ];
          }

          if (tUpper.includes('VOLEIBOL') && tUpper.includes('ROTAÇÃO')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "A Engrenagem Tática do Rodízio em Campo Neutro",
                dicaProfessor: "Deixe visível ao receber a turma escolar teórica de vôlei na Baixada Fluminense."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "📏 Quadra Oficial e Áreas do Vôlei",
                topicos: [
                  "Dimensões totais: Formato retangular exato de 18m de comprimento por 9m de largura lateral.",
                  "Campos individuais: Dividido ao meio em duas quadras quadradas simétricas de exactly 9m x 9m.",
                  "Rede divisória: Suspensa por postes, possuindo altura de 2,43m (masculino) e 2,24m (feminino).",
                  "Linha de 3 Metros: Delimita os 3m frontais sob a rede como Zona de Ataque exclusiva para saltadores frontais."
                ],
                dicaProfessor: "Reitere que o voleibol é o único esporte sem contato físico direto ou invasão territorial terrestre."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🔢 As 6 Posições Estruturais de Jogo",
                topicos: [
                  "Posição 1: Localizada no canto de fundo direito - Área de Saque obrigatória da equipe de linha.",
                  "Posições da Rede (Zona de Ataque): Posição 4 (ponta esquerda), Posição 3 (centro da rede) e Posição 2 (saída de rede).",
                  "Posições de Fundo (Zona de Defesa): Posição 5 (fundo esquerdo) de defesa ativa e Posição 6 (defensor central).",
                  "A distribuição dos atletas exige equilíbrio espacial para evitar pontos de recepção descoberta."
                ],
                dicaProfessor: "Grite os números no quadro para fixar a ordem: Rede tem 4, 3, 2 da esquerda para a direita."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🔄 A Dinâmica Mecânica do Rodízio",
                topicos: [
                  "Gatilho: A equipe realiza o rodízio sempre que conquista o direito de saque ao ganhar o ponto do oponente.",
                  "Sentido de Rotação: A movimentação física dos seis jogadores ocorre sempre no sentido HORÁRIO.",
                  "Sequência de Rotação das Posições: O jogador da Posição 1 vai para a 6, o da 6 para a 5, o da 5 para a 4, etc.",
                  "Falta de Posição: O rodízio incorreto ou descompassado anula a posse e repassa 1 ponto automático ao adversário."
                ],
                dicaProfessor: "Frise que enquanto o rodízio ocorre em sentido horários, a numeração das posições corre em sentido anti-horários."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Roteiro para Desenhar no Quadro",
                topicos: [
                  "Passo 1: Esboce a quadra quadrada de 9x9m representativa de um dos lados no meio do quadro.",
                  "Passo 2: Trace a linha de ataque posicionando a medida oficial de 3m escrita embaixo.",
                  "Passo 3: Escreva com caneta em posições circulares os números de 1 a 6 respeitando a ordem correta.",
                  "Passo 4: Desenhe flechas grossas externas indicando o sentido de giro real (sentido horário)."
                ],
                dicaProfessor: "Convide dois alunos para irem ao quadro apontarem o sentido do saque da posição 1."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "🧠 CADERNO ATIVO: MARCAR POSIÇÕES",
                subtexto: "Desenhar a meia quadra de Voleibol no caderno, identificar as posições de 1 a 6 e traçar setas conectando a rotação de saque!",
                dicaProfessor: "Sinalize viciando no caderno individual para atribuir pontuação cognitiva na caderneta de notas."
              }
            ];
          }

          if (tUpper.includes('VOLEIBOL') && tUpper.includes('SISTEMAS')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "Tática Simplificada: Sistema 6x0 e o Aprendizado Cooperativo",
                dicaProfessor: "Esta é uma aula MEIO A MEIO com devolução de trabalhos escolares de 3 pontos."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🏐 Conceito do Sistema Tático 6x0",
                topicos: [
                  "Filosofia: É o sistema ideal de iniciação onde todos fazem tudo (todos defendem, levantam e atacam).",
                  "Ausência de Especialização: Não há funções fixas como levantador mestre ou líbero blindado de fundo.",
                  "O Levantador Flutuante: O jogador que estiver ocupando a Posição 3 (centro da rede) será o levantador oficial.",
                  "Promove a polivalência motora, garantindo que todos aprendam todos os fundamentos técnicos corporais."
                ],
                dicaProfessor: "Reforce o papel cooperativo do vôlei: um esporte construído para compartilhar a bola de forma coletiva."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "📋 O Caminho da Jogada de Ataque 6x0",
                topicos: [
                  "1º Toque (A Recepção): Executada preferencialmente via manchete de fundo (Posições 5, 6, 1) amortecendo o saque.",
                  "2º Toque (O Levantamento): Direcionamento macio e calmo para a Posição 3, que prepara de Toque de Dedos alto.",
                  "3º Toque (O Ataque): O atacante colocado nas extremidades (Posições 4 ou 2) salta e empurra sobre a trave da rede.",
                  "Importância do Controle: Dominar o fluxo evita golpes e arremessos rudes contra a rede de vôlei."
                ],
                dicaProfessor: "Esboce o caminho da bola (Recepção -> Levantamento -> Ataque) com giz colorido para os discentes."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Como Desenhar o Fluxo 6x0 no Quadro",
                topicos: [
                  "Passo 1: Desenhe o quadrado da meia quadra com a linha de 3m de ataque destacada.",
                  "Passo 2: Marque três bolinhas defensivas no fundo (5, 6 e 1), simulando a barreira defensiva aberta.",
                  "Passo 3: Desenhe uma flecha contínua ligando a bola recebida em 6 até as mãos do levantador na posição 3.",
                  "Passo 4: Desenhe duas flechas curvas saindo da posição 3 para as zonas de ataque de pontas 4 e 2."
                ],
                dicaProfessor: "Demonstre como a cooperação tática supera o individualismo de força bruta de saque."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "⚠️ Regulamento e Faltas Técnicas de Toque",
                topicos: [
                  "Dois Toques: Um jogador não pode tocar consecutivamente na bola sob risco de infração técnica primária.",
                  "Retenção (Condução): A bola deve ser limpa e rebatida com agilidade de mãos, proibido segurar ou empurrar.",
                  "Invasão por Cima/Baixo: O pé do atleta não pode cruzar completamente a linha imaginária abaixo da rede centrale.",
                  "Recolhimento Oficial: Entrega programada do Trabalho de Pesquisa (3 pontos) nas dependências escolares hoje!"
                ],
                dicaProfessor: "Efetue o recolhimento com os e-diários escolares de forma organizada e sem interrupções."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "📥 ENTREGAR TRABALHO DE VÔLEI HOJE!",
                subtexto: "Coloque seu Trabalho com Capa na mesa do professor. Em seguida descemos ordenados para treinar o Sistema 6x0 na quadra!",
                dicaProfessor: "Confirme os nomes completos de ciclo de aceleração AP antes de liberar para o pátio esportivo."
              }
            ];
          }

          if (tUpper.includes('BASQUETE') || tUpper.includes('HAND_EBOL') || tUpper.includes('BASQUETE/HANDEBOL')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "Controle de Mão, Regras de Drible e Limites Técnicos nas Quadras",
                dicaProfessor: "Projete Datashow. Traga uma bola para incentivar a manipulação tátil correta para a turma."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🏀 Basquetebol - Dimensões e Dribles",
                topicos: [
                  "Quadra Oficial: Retângulo liso medindo 28 metros de comprimento por 15 metros de largura de linha lateral.",
                  "Aro e Tabela: Suspensos a exatamente 3,05 metros do piso de jogo, desafiando a gravidade mecânica.",
                  "Infração de Caminhada (Andada): Proibido andar ou correr com a bola na mão sem quicar (máximo de 2 passos de bandeja).",
                  "Dois Dribles: Proibido quicar com as duas mãos, segurar a bola, e voltar a quicar individualmente."
                ],
                dicaProfessor: "Simule os dois passos de bandeja no chão da sala de aula para que a turma entenda visualmente."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🤾 Handebol - Dimensões e a Área de 6 Metros",
                topicos: [
                  "Quadra Oficial: Retângulo maior medindo 40 metros de comprimento por 20 metros de largura total.",
                  "Dimensão das Traves: Medida ideal de 3 metros de largura frontal por 2 metros de altura útil.",
                  "Zona de Meta (Área de 6 metros): Área semicircular de livre circulação exclusiva do goleiro.",
                  "Regra de Invasão: Nenhum jogador de campo pode pisar na linha ou dentro da área de 6m para atacar."
                ],
                dicaProfessor: "Explique que para pontuar o jogador de handebol salta de fora e solta a bola no ar antes de tocar o solo da área de meta."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Como Desenhar Ambas as Quadras no Quadro",
                topicos: [
                  "Passo 1 (Basquete): Desenhe o garrafão trapezoidal ou retangular de 4,9m de largura nas cabeceiras.",
                  "Passo 2 (Basquete): Use um traço semicircular delimitando a linha de 3 pontos posicionada a 6,75m.",
                  "Passo 3 (Handebol): Trace a área contínua do goleiro de 6m e a zona pontilhada de Tiro Livre a 9m.",
                  "Passo 4: Coloque marcadores visuais no cinto de defesa para ilustrar sistemas de barreira."
                ],
                dicaProfessor: "Giz colorido ajudará a distinguir as demarcações de basquete e handebol no mesmo plano de quadro."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🎯 Sistemas de Pontuação e Defesa",
                topicos: [
                  "Basquete: Cesta vale 3 pontos (fora da linha de 6,75m), 2 pontos (dentro) e 1 ponto (lance livre de falta).",
                  "Handebol: Cada gol vale 1 ponto de meta, arremessado de fora da barreira restritiva de 6 metros.",
                  "Sistemas de Defesa no Handebol: Barreira compacta em linha de 6m (Sistemas 6-0 ou 5-1 dinâmicos).",
                  "Faltas Técnicas: No handebol falta grave impede o avanço segurando o braço, gerando exclusão de 2 minutos."
                ],
                dicaProfessor: "Aborde a exclusão de 2 minutos como penalidade pedagógica de autocontrole individual das faltas."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "🧠 CONFRONTANDO AS MEDIDAS",
                subtexto: "Copiar do quadro os tamanhos de quadra de Basquete e Handebol! Qual desses esportes exige maior controle espacial nas linhas?",
                dicaProfessor: "Monitore o processo de anotações técnicas no caderno do estudante de ciclo de aprendizagem."
              }
            ];
          }

          if (tUpper.includes('FUTEBOL') && tUpper.includes('LIMITES')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "A Explicação do Campo Aberto e da Regra do Impedimento",
                dicaProfessor: "Deixe ativo no Datashow para guiar o início da fundamentação teórica em pátios gigantes."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🏟️ O Campo Oficial de Gramado",
                topicos: [
                  "Dimensões do Gramado: Comprimento oficial de 90m a 120m por largura que varia de 45m a 90m.",
                  "Padrão FIFA Internacional: Medidas rigorosamente padronizadas em 105 metros por 68 metros.",
                  "Composição das Equipes: 11 jogadores titulares em campo por equipe, com substituições paradas por súmula.",
                  "Carga de Demanda Espacial: Áreas gigantes exigem distribuição coordenada de fôlego corporal."
                ],
                dicaProfessor: "Aborde a enorme diferença de tamanho e fôlego entre as quadras escolares normais e um estádio gramado."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🏁 A Regra Máxima do Impedimento",
                topicos: [
                  "Função da Regra: Evita o anti-jogo de um atacante que ficaria fixado livre de marcação na frente do gol oponente.",
                  "Condição Básica: O atacante deve possuir pelo menos dois adversários (incluindo o goleiro) entre ele e a linha de fundo.",
                  "Instante Crítico: O impedimento é aferido estritamente na fração de segundo em que o companheiro realiza o Passe.",
                  "Posicionamento Livre: Se o atacante corre por trás da linha de zaga APÓS o chute, a jogada é legal e validada."
                ],
                dicaProfessor: "Zele pela compreensão analítica e cognitiva dos jovens sobre o momento espacial do passe."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Como Desenhar o Impedimento no Quadro",
                topicos: [
                  "Passo 1: Trace uma linha horizontal longa no quadro representando a 'Linha de Defesa' (último zagueiro).",
                  "Passo 2: Desenhe um círculo com letra 'A' (Atacante) posicionado adiante da linha de zaga da defesa.",
                  "Passo 3: Faça uma flecha de movimento partindo da bolinha do Meia 'M' lançando o círculo de bola de jogo.",
                  "Passo 4: Escreva grande acima da linha: 'VÁLIDO antes da zaga, IMPEDIDO além da linha no instante do toque!'."
                ],
                dicaProfessor: "Use imãs ou gizes coloridos no quadro de metal para exemplificar o avanço livre das equipes."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🎴 Regulação de Cartões e Ética",
                topicos: [
                  "Cartão Amarelo: Aplicado a entradas duras descuidas, faltas táticas acumuladas ou atitudes desrespeitosas.",
                  "Cartão Vermelho: Expulsão direta decorrente de agressões corporais violentas, termos antiéticos ou faltas graves.",
                  "Consequência de Expulsão: O time penalizado é obrigado a jogar desfalcado de um integrante até o fim da partida.",
                  "Fairplay Escolar: Buscar o controle de bola competitivo de forma civilizada, sem empurrões contra os alambrados."
                ],
                dicaProfessor: "Reitere que o esporte de campo ensina autocontrole de nervos nas maiores dimensões físicas."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "⚽ DESAFIO DE CADERNO DE CAMPO",
                subtexto: "Copiar o exemplo ilustrativo do Impedimento e traçar as bolinhas corretas do ataque e da defesa com suas réguas!",
                dicaProfessor: "Assegure-se de que os estudantes de ciclo AP copiem com simetria e foco geométrico."
              }
            ];
          }

          if (tUpper.includes('FUTEBOL') && tUpper.includes('DESENHOS')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "Estruturação Coletiva: Sistemas de Posicionamento 4-4-2 e 4-3-3",
                dicaProfessor: "Deixe visível no Datashow. Hoje lançamos as diretrizes do Trabalho Trimestral do 3º Período!"
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🧱 Sistema Tático 4-4-2 (Solidez Mecânica)",
                topicos: [
                  "Composição das Linhas: 4 defensores (2 laterais, 2 zagueiros), 4 meio-campistas e 2 atacantes especialistas.",
                  "Equilíbrio Estrutural: É a formação mais clássica do futebol, vedando com facilidade as entradas de meio de campo.",
                  "Vantagem: Facilita transições seguras, pois sempre há apoio numérico nas beiras das grandes áreas.",
                  "Desvantagem: Pode sobrecarregar os laterais, exigindo grande recuo defensivo se os armadores não avançarem."
                ],
                dicaProfessor: "Explique como o sistema tático seguro 4-4-2 preza pelo contra-ataque firme."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Como Desenhar o 4-4-2 no Quadro",
                topicos: [
                  "Passo 1: Esboce um grande retângulo verde horizontal ilustrando o campo defensivo de jogo.",
                  "Passo 2: Desenhe a linha traseira de 4 defensores alinhados cobrindo transversalmente as traves.",
                  "Passo 3: Desenhe as 4 bolinhas de meio de campo em losango (1 primeiro volante, 2 alas flutuantes, 1 meia).",
                  "Passo 4: Coloque 2 atacantes bem centralizados dentro da grande área do time oponente."
                ],
                dicaProfessor: "Destaque a simetria de posicionamento espacial ao dispor as bolinhas de giz."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🏹 Sistema Tático 4-3-3 (Largura e Ofensiva)",
                topicos: [
                  "Composição das Linhas: 4 defensores, 3 meio-campistas de marcação e 3 atacantes de profundidade rápida.",
                  "Pontas de Lança: Dois atacantes de beirada de linha jogam colados nas pontas para abrir espaço defensivo central.",
                  "Vantagem: Grande força agressiva lateral, oferecendo transição imediata de passes de beirada e cruzamento médio.",
                  "Desvantagem: Deixa o meio-campo desguarnecido se os dois alas ofensivos de ponta não recuarem para fechar."
                ],
                dicaProfessor: "Frise que o sistema 4-3-3 exige pontas habilidosos para correrem rente à lateral."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Como Desenhar o 4-3-3 no Quadro",
                topicos: [
                  "Passo 1: Esboce a demarcação das bolinhas do campo ofensivo do vácuo oponente.",
                  "Passo 2: Coloque 4 defensores alinhados na retaguarda defensiva.",
                  "Passo 3: Insira 3 meio-campistas formando um triângulo invertido (1 pivô defensivo e 2 auxiliares de passe).",
                  "Passo 4: Posicione 3 atacantes: dois colados rasteiros nas linhas laterais (pontas) e 1 centroavante central."
                ],
                dicaProfessor: "Use flechas pontilhadas dinâmicas para mostrar as diagonais dos pontas em direção ao centro de área."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "📋 TRABALHO TRIMESTRAL (3 Pts)",
                subtexto: "Roteiro: Desenhar um campo tático de futebol em papel avulso. Posicionar seus jogadores nas táticas 4-4-2 e 4-3-3 de forma organizada. Explicar por escrito qual tática acha mais defensiva ou ofensiva! Entrega: Aula de Futebol de 5.",
                dicaProfessor: "Guie o processo de transição teórica estimulando o esmero no traçado individual do aluno de aceleração."
              }
            ];
          }

          if (tUpper.includes('INCLUSÃO') && tUpper.includes('PARALÍMPICO')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "Como Adaptações de Regras Rompem as Barreiras de Mobilidade",
                dicaProfessor: "Projete nos canais Datashow para incentivar a solidariedade, o respeito mútuo e a equidade."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "♿ Paradesporto e Inclusão de Base",
                topicos: [
                  "Definição: Adaptação das regras clássicas, espaços e bolas para incluir pessoas com limitações motoras.",
                  "O Foco nas Potencialidades: O esporte inclusivo busca maximizar o que o atleta CONSEGUE realizar de forma limpa.",
                  "Fomento ao Respeito: Combate os preconceitos estruturais históricos nas quadras e espaços degradados periféricos.",
                  "O Fairplay de Inserção: Valoriza o esporte como ferramenta ativa e universal de cooperação de direitos."
                ],
                dicaProfessor: "Mostre que a limitação motora é sobreposta quando as ferramentas pedagógicas são pensadas para todos."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🏐 Modalidade: Vôlei Sentado",
                topicos: [
                  "Destinação: Praticado por indivíduos com comprometimento motor inferior ou amputação de membros.",
                  "Dimensões de Quadra: Retângulo menor medindo exactly 10 metros de comprimento por 6 metros de largura útil.",
                  "Altura da Rede divisória: Reduzida drasticamente para 1,15m (masculino) e 1,05m (feminino).",
                  "Regra de Glúteos: É obrigatório manter os glúteos tocando no cimento/piso no estrito instante de toque na bola."
                ],
                dicaProfessor: "Destaque a força dos membros superiores exigida para se deslocar e sustentar o saque sentado."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Como Desenhar a Quadra de Vôlei Sentado",
                topicos: [
                  "Passo 1: Esboce um retângulo menor no quadro denotando a quadra de 10x6 metros.",
                  "Passo 2: Desenhe a linha mediana de divisão com postes de eixos muito rentes à base.",
                  "Passo 3: Represente os atletas esboçando linhas de palito com um círculo espesso colado no solo.",
                  "Passo 4: Desenhe a linha pontilhada da zona de ataque a exactly 2 metros da rede lateral de voleibol."
                ],
                dicaProfessor: "Mostre visualmente no quadro por que as posições sentadas dificultam ataques longos."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🏙️ Barreiras Arquitetônicas Infantis",
                topicos: [
                  "Análise Situacional: Por que nossas calçadas e pátios escolares muitas vezes impedem cadeirantes de circular?",
                  "Direito de Cidadania: Calçadas lisas e rampas de acesso não são favores estatais, são direitos assegurados por lei.",
                  "O papel do esporte: Mudar nossa percepção para apoiar a equidade dentro da comunidade de vizinhos da Baixada.",
                  "Prática de Hoje: Reflexão analítica e simulação de movimentos por cooperação visual no pátio."
                ],
                dicaProfessor: "Conduza uma reflexão sutil sobre a falta de acessibilidade nas vilas vizinhas."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "🤝 IGUALDADE ATIVA DE DIREITOS",
                subtexto: "Como o esporte escolar ensina as pessoas a focarem no que cada corpo consegue fazer, em vez de focar nas limitações?",
                dicaProfessor: "Conduza uma rápida escuta coletiva de encerramento da aula presencial de diversidade."
              }
            ];
          }

          if (tUpper.includes('INCLUSÃO') && tUpper.includes('FUTEBOL DE 5')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "Atenção Acústica: O Mecanismo da Bola de Guizos e o Chamador",
                dicaProfessor: "Esta é uma aula MEIO A MEIO crucial de encerramento trimestral de trabalhos de outubros!"
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "👁️ Condições de Jogo e Equidade",
                topicos: [
                  "Público-Alvo: Atletas de campo com cegueira ou restrições graves na acuidade de visão ocular total.",
                  "O Uso de Vendas: Os 4 atletas de linha jogam com vendas seladas, garantindo igualdade de sensibilidade acústica.",
                  "O Goleiro vidente: O arqueiro possui visão completa, mas sua mobilidade tática é restrita à área lateral de gol.",
                  "A Quadra de Linha: Usualmente disputado em quadra de gramado sintético com placas de barreira lateral."
                ],
                dicaProfessor: "Explique como os atletas de ponta dependem unicamente da audição para se mover e chutar com eficácia."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🔊 O Silêncio Total do Ambiente",
                topicos: [
                  "Bola Sonora: Contém pequenos guizos de reverberação acústica interna que emitem som metálico ao rolar.",
                  "Rigidez do Silêncio: A torcida, técnicos e o professor devem manter rigoroso recolhimento silencioso na partida.",
                  "O Som do Jogo: O barulho do guizo auxilia o cego a discernir a velocidade e a distância correta da bola de jogo.",
                  "Faltas acústicas: Conversas na quadra atrapalham as trajetórias de passes, provocando anulação direta."
                ],
                dicaProfessor: "Estipule a prática acústica do silêncio no pátio escolar como disciplina coletiva máxima."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🗣️ O Chamador de Gol e Orientações",
                topicos: [
                  "Função do Chamador: Assistente posicionado atrás da meta adversária que comanda por voz os ataques.",
                  "Terminologia Útil: Utiliza comandos breves e de alta direção: 'Esquerda, chuta!', 'Goleiro posicionado na trave!'.",
                  "Mecânica de Jogo: O time só ataca de forma livre orientando-se pelas vozes coordenadas e som do guizo.",
                  "Recolhimento dos Desenhos de Mapeamento Tático de Futebol (Valor: 3 pontos) programados para hoje!"
                ],
                dicaProfessor: "Organize o recolhimento das folhas manuscritas de desenho tático na mesa pedagógica."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Como Desenhar o Futebol de 5 no Quadro",
                topicos: [
                  "Passo 1: Esboce a quadra de futsal retangular longa com tamanho de 40x20 metros.",
                  "Passo 2: Trace retângulos pretos bem finos nas linhas laterais (representando as placas que impedem saída de bola).",
                  "Passo 3: Desenhe uma estrela na posição do Chamador posicionado centralizado exatamente atrás das traves.",
                  "Passo 4: Marque os quatro eixos dos defensores e as trajetórias do guizo em linhas espirais onduladas."
                ],
                dicaProfessor: "Instigue os alunos a observarem como as barreiras de borracha mudam toda a velocidade de passes."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "📥 ENTREGAR TRABALHO DE FUTEBOL",
                subtexto: "Desenho Tático e Respostas na mesa do professor. Descemos e colocaremos vendas nos olhos para a atividade acústica de passe!",
                dicaProfessor: "Garanta vendas ou panos de segurança macios e evite colisões correndo devagar no pátio."
              }
            ];
          }

          if (tUpper.includes('FUTEBOL DE VÁRZEA') || tUpper.includes('CIDADANIA')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "A Herança Territorial nos Subúrbios e Favelas e Projetos Sociais",
                dicaProfessor: "Esta é uma aula MEIO A MEIO com profunda carga ética e conceitual de inclusão popular."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🏘️ A Várzea Como Resistência de Classe",
                topicos: [
                  "Surgimento Histórico: Nascido nas frentes operárias periféricas do Rio como contraposição ao futebol de clubes de elite.",
                  "Popularização de Base: Espetáculo de lazer urbano que unificava famílias e operários nas manhãs de domingos populares.",
                  "O Terrão Comunitário: O cimento ou terra batida adaptados como espaço de esporte livre sem taxas de filiação.",
                  "Preservação Cultural: Um patrimônio valioso da história corporal carioca e representatividade de vizinhos."
                ],
                dicaProfessor: "Aborde como os deparos de terra das comunidades revelaram os maiores gênios de bola do país."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🛡️ O Autogoverno e o Fairplay do Povo",
                topicos: [
                  "Mediação de Conflitos: Na ausência de árbitro profissional federado, os jogadores resolvem conflitos de forma pacífica.",
                  "Importância da Palavra: O acordo verbal mútua regulamenta se foi pênalti ou saída. Exige maturidade moral.",
                  "Disciplina Horizontal: Aquele que trapaceia ou age com brutalidade excessiva é expulso pela própria vizinhança.",
                  "Fairplay Escolar: Aplicar o mesmo nível de autorregulamento consciente dentro do pátio ou quadra de aula."
                ],
                dicaProfessor: "Reforce o papel de cidadania: no esporte e na vida urbana, as palavras e acordos devem ser respeitados devidamente."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Como Cadastrar a Linha do Lazer no Quadro",
                topicos: [
                  "Passo 1: Escreva grande no topo: 'Linha Histórica do Lazer e Acolhimento Social'.",
                  "Passo 2: Desenhe bifurcações ligando Futebol de Clubes (Privatizador) vs Futebol de Várzea (Democrático).",
                  "Passo 3: Esboce diagramas listando os valores essenciais de cidadania: Solidariedade, Ética e Foco Coletivo.",
                  "Passo 4: Destaque o pátio escolar de Baixada como o espaço contemporâneo da várzea cidadã."
                ],
                dicaProfessor: "Estimule a escrita reflexiva no caderno sobre a área habitada pelo estudante."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🤝 Os Projetos Sociais Desportivos",
                topicos: [
                  "Atuação Crítica: Projetos comunitários usam treinos de passes para orientar jovens contra vulnerabilidades.",
                  "Suporte Curricular: Ensinam a rotina esportiva do autocontrole técnico, agilidade, perseverança e conduta solidária.",
                  "Promoção de Saúde: Alternativa ativa ao sedentarismo e à exposição descontrolada a telas digitais de pátio.",
                  "Última Chamada: Prazo final pedagógico para entrega de trabalhos desenhados de outubros!"
                ],
                dicaProfessor: "Dê feedback individualizado estimulante para os discentes que regularizaram as pendências de notas."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "⚽ INTEGRANDO O COLETIVO",
                subtexto: "Descemos de forma solidária para treinar drills de passe cooperativo em duplas integradoras na quadra de cimento!",
                dicaProfessor: "Mantenha o pátio amigável, barrando posturas egoístas ou provocações competitivas desmedidas."
              }
            ];
          }

          if (tUpper.includes('AVALIAÇÃO')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "Aferição Geral de Conhecimentos da Educação Física Regular",
                dicaProfessor: "Projete durante a aplicação eletrônica ou física da avaliação trimestral em sala."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "📝 Normas de Organização e Respeito",
                topicos: [
                  "Avaliação teórica individual baseada estritamente nas regras e desenhos anotados ao longo dos trimestres.",
                  "Permitido apenas o uso de caneta azul ou preta de escrita manual legível para a correção justa.",
                  "Proibida terminantemente qualquer forma de conversa com colegas de carteira ou consulta secundária.",
                  "O celular deve permanecer desligado e guardado para garantir integridade e concentração do ambiente."
                ],
                dicaProfessor: "Garanta a guarda ativa e atenda as necessidades das turmas com foco acolhedor e escuta."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "💡 O Valor do Conhecimento Esportivo",
                topicos: [
                  "A Educação Física compreende a história corporal do país além das frentes mecânicas musculares.",
                  "Demonstrar domínio sobre as regras de rodízio, marcação e impedimento consolida sua inteligência de quadra.",
                  "A avaliação é uma oportunidade para fixar pontos e mostrar seu avanço acadêmico regular.",
                  "Trabalho de persistência: use seu tempo com calma, lendo as questões com dedicação minuciosa."
                ],
                dicaProfessor: "Conforte alunos que apresentam maior estresse nas fases de prova individual."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Como Esquematizar as Respostas no Quadro",
                topicos: [
                  "Passo 1: Escreva os Horários limites de entrega e tempo restante em contagem regressiva.",
                  "Passo 2: Escreva o cabeçalho completo estruturado padrão SEEDUC-RJ 2026 para cópia na folha de provas.",
                  "Passo 3: Mantenha as diretrizes de correção do professor bem visíveis na lousa.",
                  "Passo 4: Escreva uma frase inspiradora de dedicação e calma intelectual."
                ],
                dicaProfessor: "Insista com simpatia no valor de assinar o papel com letra de imprensa limpa."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🧠 Concentração e Foco de Prova",
                topicos: [
                  "Respire fundo antes de passar as canetas nas opções de caixas de alternativas.",
                  "Se houver dúvidas conceituais, faça rascunhos de quadras de vôlei e futsal na margem da folha.",
                  "O silêncio absoluto é um acordo ético de cooperação geral para o raciocínio das equipes.",
                  "Uma excelente prova individual avaliativa a todos os discentes regulares!"
                ],
                dicaProfessor: "Zele pelo silêncio pacífico na sala de aula até a entrega de todos os roteiros individuais."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "🤫 SEU FOCO É SUA INTELIGÊNCIA",
                subtexto: "Responda as questões com esmero e autonomia. Entregue e permaneça em silêncio auxiliando o colega ao lado!",
                dicaProfessor: "Efetue o recolhimento das avaliações à medida que o tempo avança de forma cordial."
              }
            ];
          }

          if (tUpper.includes('RECUPERAÇÃO')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "Auxílio Didático Presencial e Consolidação de Frequência de Notas",
                dicaProfessor: "Projete enquanto reitera os conceitos pedagógicos críticos com os alunos com médias pendentes."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🔄 Reforço de Conteúdo de Campo e Quadra",
                topicos: [
                  "Revisão detalhada das regras básicas e condutas esportivas do Futsal, Vôlei e futebol.",
                  "Oportunidade para aplicação de avaliações remanescentes e segundas chamadas trimestrais.",
                  "Consolidação e verificação das frequências de diário eletrônico do Governo do Estado do Rio de Janeiro.",
                  "Entrega e atualização de relatórios teóricos manuais de auxílio curricular."
                ],
                dicaProfessor: "Preste apoio prioritário aos alunos que demonstram maiores fragilidades na leitura e retenção."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Gráficos de Conteúdo de Recuperação no Quadro",
                topicos: [
                  "Passo 1: Escreva termos de equivalência estrutural no quadro (ex: Vôlei = Rodízio, Futsal = Quadra de 40m).",
                  "Passo 2: Faça esquemas conceituais sobre a ética esportiva contra posturas rudes de quadra.",
                  "Passo 3: Escreva no quadro os critérios que o aluno deve seguir para conseguir reaver sua meta de notas.",
                  "Passo 4: Forneça pequenos exercícios avaliativos práticos para testar a retenção individual imediata."
                ],
                dicaProfessor: "Use o espaço do quadro como painel acolhedor de saberes dinâmicos compartilhados."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🗓️ Diário Eletrônico SEEDUC e Frequências",
                topicos: [
                  "Verificação transparente de presenças acumuladas no ciclo letivo do Governo do Estado do Rio de Janeiro 2026.",
                  "Justificativas de faltas: oportunidade de apresentar atestados médicos ou relatórios de amparo.",
                  "Garantir a média azul é um direito que conquistamos com dedicação, assiduidade e foco integral.",
                  "O apoio do professor está disponível para tirar todas as dúvidas remanescentes da matéria regular."
                ],
                dicaProfessor: "Auxilie na computação de dados com transparência escolar pedagógica."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "💡 Oportunidades de Projeto Extraclasse",
                topicos: [
                  "Mecanismos de trabalhos extras para reaver notas de pátio em Educação Física.",
                  "Importância de manter a rotina física de alongamentos mesmo fora do calendário escolar.",
                  "Reiterar o respeito absoluto aos professores, funcionários e materiais didáticos das salas.",
                  "Próximos passos curriculares: encerramento pedagógico e planejamento de ano e frentes coletivas."
                ],
                dicaProfessor: "Abrace a inclusão estimulando os que estão em recuperação a se sentirem acolhidos pelo aprendizado."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "🔍 GARANTA SUA MÉDIA AZUL",
                subtexto: "Consulte o professor individualmente para regularizar pendências de notas ou faltas neste período final!",
                dicaProfessor: "Zele pela transparência didática entregando os feedbacks individuais com zelo e de forma acolhedora."
              }
            ];
          }

          if (tUpper.includes('CONSELHO DE CLASSE') || tUpper.includes('CONSELHO')) {
            return [
              {
                tipo: 'capa',
                type: 'capa',
                titulo: aula.titulo,
                title: aula.titulo,
                subtitulo: "Diálogo Pedagógico Coletivo, Autoavaliação e Divulgação de Desempenho",
                dicaProfessor: "Use para apoiar um ambiente transparente e deliberativo com os discentes de ciclo AP."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🗣️ Parâmetros de Autoavaliação Discente",
                topicos: [
                  "O que aprendemos sobre fairplay, disciplina de pátio e cooperação ética ao longo do ano?",
                  "Seu comportamento individual foi respeitoso perante a diversidade estrutural dos colegas de classe?",
                  "Os conceitos teóricos (impedimento, posições de vôlei e futsal) ficaram esclarecidos em sua mente?",
                  "Divulgação e consulta transparente de notas finais de Educação Física."
                ],
                dicaProfessor: "Coordene a roda de bate-papo de forma organizada permitindo que cada um expresse sua opinião."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "✍️ Fluxograma de Crescimento no Quadro",
                topicos: [
                  "Passo 1: Escreva na lousa os pilares do Conselho: Conquistas, Desafios, Metas para o Ano Novo.",
                  "Passo 2: Peça aos alunos para listarem 3 conquistas esportivas de equipe alcançadas nas aulas de quadra.",
                  "Passo 3: Escreva feedbacks construtivos coletivos sinalizando as melhorias disciplinares e de foco escolar.",
                  "Passo 4: Desenhe o gráfico mental da evolução de cooperação do pátio desde o início do período letivo."
                ],
                dicaProfessor: "Anote as impressões sinceras no quadro negro com empatia e comemoração aos progressos."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "📋 Consolidação Acadêmica e Boletins",
                topicos: [
                  "Atribuição e fechamento de médias gerais da escola baseadas em pesquisas e atitudes físicas.",
                  "Discussão respeitosa sobre o diário eletrônico escolar e direito de voz das equipes.",
                  "Superação de limites: como o esporte te ajudou a ser um cidadão mais cooperativo e tolerante.",
                  "Fechamento formal das notas de Educação Física e amparos didáticos finais."
                ],
                dicaProfessor: "Zele pela fidedignidade de notas de acordo com os critérios informados."
              },
              {
                tipo: 'texto_simples',
                type: 'texto_simples',
                titulo: "🤝 Gratidão de Equipe e Valores Sociais",
                topicos: [
                  "Celebrar as amizades construídas no pátio e nas dinâmicas de tabuleiros de sala.",
                  "Entender as regras como limites de segurança que nos auxiliam a conviver civilizadamente.",
                  "O compromisso com o estudo constante e com o autocuidado corporal de saúde primária.",
                  "Desejo de excelentes trajetórias acadêmicas e crescimento comunitário com cidadania ativa."
                ],
                dicaProfessor: "Agradeça com palavras motivacionais pela caminhada e convivência com a turma AP."
              },
              {
                tipo: 'destaque_centro',
                type: 'destaque_centro',
                texto: "📢 RETORNO DIDÁTICO FINAL",
                subtexto: "Consulte suas notas registradas no portal e entenda as conquistas alcançadas sob o prisma da superação de limites!",
                dicaProfessor: "Transmita otimismo e oriente sobre os passos pedagógicos de fechamento."
              }
            ];
          }

          // Generic Dynamic AP fallback (Exactly 6 Slides for robust default support)
          return [
            {
              tipo: 'capa',
              type: 'capa',
              titulo: aula.titulo,
              title: aula.titulo,
              subtitulo: `${aula.modulo} • ${aula.tri}`,
              dicaProfessor: "Projete Datashow. Slide inicial de acolhimento pedagógico e metas da aula."
            },
            {
              tipo: 'texto_simples',
              type: 'texto_simples',
              titulo: "🎯 Diretivas de Aula",
              topicos: [
                aula.desc,
                "Siga com capricho e atenção as tarefas descritas no quadro pelo professor nas dependências.",
                "Colabore ativamente com a ordem da sala, limpeza e a integridade de seus colegas discentes de linha."
              ],
              dicaProfessor: "Resuma em formato sucinto os propósitos curriculares gerais do plano de aula."
            },
            {
              tipo: 'texto_simples',
              type: 'texto_simples',
              titulo: "✍️ Roteiro para Desenhar no Quadro",
              topicos: [
                "Passo 1: Escreva o título da aula do dia e a data nas margens superiores da lousa.",
                "Passo 2: Divida o quadro em duas partes: de um lado conteúdo teórico de cópia obrigatória, do outro esquemas de exercícios.",
                "Passo 3: Esboce com retângulos os caminhos táticos que usaremos nas partidas ou vivências.",
                "Passo 4: Coloque marcadores visuais coloridos indicando a ordem do fluxo nas práticas de pátio."
              ],
              dicaProfessor: "Mantenha o quadro limpo e estipule a cópia organizada como disciplina cognitiva de sala."
            },
            {
              tipo: 'texto_simples',
              type: 'texto_simples',
              titulo: "🛡️ Regras e Diretivas de Conduta Ativa",
              topicos: [
                "A cooperação mútua é o fundamento maior de qualquer prática desportiva da grade regular carioca 2026.",
                "Respeitar a palavra do colega, aceitar a demarcação das linhas e zelar pelo fairplay escolar rígido.",
                "Manter o autocuidado físico e usar roupas limpas adequadas para as práticas de pátio.",
                "Não deixar garrafas de água ou papéis acumulados nas áreas de jogos e arquibancadas."
              ],
              dicaProfessor: "Reitere com simpatia as regras básicas de convivência civilizada de grupo."
            },
            {
              tipo: 'texto_simples',
              type: 'texto_simples',
              titulo: "💡 O Esporte Como Ferramenta de Vida",
              topicos: [
                "Praticar esportes melhora o foco mental, reduz o estresse diário escolar e fortalece o músculo cardiorrespiratório.",
                "Ensina a gerenciar perdas e vitórias com equilíbrio intelectual emocional e maturidade moral de base.",
                "Une a turma em objetivos cooperativos comuns rompendo barreiras de inclusão social.",
                "Lembrete teórico: preste total atenção nas anotações de aula para obter notas azuis constantes."
              ],
              dicaProfessor: "Converse sobre os benefícios mentais de longo prazo decorrentes de hábitos ativos."
            },
            {
              tipo: 'destaque_centro',
              type: 'destaque_centro',
              texto: "Reflexão Escolar do Dia",
              subtexto: "Como o estudo reflexivo de hoje contribui para sua cidadania e integração?",
              dicaProfessor: "Conduza uma rápida escuta coletiva de encerramento da aula presencial de diversidade."
            }
          ];
        }
      }

      // 1. If physical slides exist, return them
      if ((slidesData as any)[selectedAulaData]) {
        return (slidesData as any)[selectedAulaData];
      }
      
      // 2. Otherwise parse plans dynamically
      const lastUnderscoreIndex = selectedAulaData.lastIndexOf('_');
      if (lastUnderscoreIndex === -1) return null;
      const turmaId = selectedAulaData.substring(0, lastUnderscoreIndex);
      const dateStr = selectedAulaData.substring(lastUnderscoreIndex + 1);
      
      const plans = PE_PLAN[turmaId] || [];
      const aula = plans.find(a => a.data === dateStr);
      if (!aula) return null;

      const resumo = aula.resumo || '';

      const cleanMarkerText = (text: string) => {
        return text.split('\n')
          .map(l => l.replace(/^[•\s\-\*]+/g, '').trim())
          .filter(Boolean);
      };

      let objetivo = aula.desc || '';
      const objMatch = resumo.match(/🎯 \*\*Objetivo da Aula:\*\*(.*?)(?=(🗣️|📜|⚠️|📥|$))/s);
      if (objMatch) {
        objetivo = objMatch[1].trim();
      }

      let dinamica = '';
      const dinMatch = resumo.match(/(🗣️ \*\*Dinâmica:\*\*|🗣️ \*\*O que falar\/Dinâmica:\*\*|🗣️ \*\*Prática:\*\*)(.*?)(?=(📜|⚠️|📥|$))/s);
      if (dinMatch) {
        dinamica = dinMatch[2].trim();
      }

      let reflexao = '';
      const refMatch = resumo.match(/📜 \*\*Reflexão:\*\*(.*?)(?=(⚠️|📥|$))/s);
      if (refMatch) {
         reflexao = refMatch[1].trim();
      }

      let trabalho = '';
      const trabMatch = resumo.match(/(⚠️ \*\*TRABALHO:\*\*|📥 \*\*TRABALHO:\*\*|⚠️ \*\*TRABALHO TRIMESTRAL:\*\*|📥 \*\*TRABALHO:\*\*|⚠️ \*\*LEMBRETE\*\*)(.*?)$/s);
      if (trabMatch) {
         trabalho = trabMatch[2].trim();
      }

      const deck: any[] = [
        {
          tipo: 'capa',
          title: aula.titulo,
          subtitle: `${aula.modulo} • ${aula.tri}`,
          dicaProfessor: 'Deixe esse slide visível enquanto os alunos organizam os lugares.'
        }
      ];

      if (objetivo) {
        deck.push({
          tipo: 'texto_simples',
          title: '🎯 Objetivo da Aula',
          topicos: cleanMarkerText(objetivo),
          dicaProfessor: 'Compartilhe o foco de estudo e metas com a classe.'
        });
      }

      if (dinamica) {
        deck.push({
          tipo: 'texto_simples',
          title: '🗣️ Dinâmica e Atividades',
          topicos: cleanMarkerText(dinamica),
          dicaProfessor: 'Gerencie a divisão das equipes e a execução das tarefas.'
        });
      }

      if (reflexao) {
        deck.push({
          tipo: 'destaque_centro',
          texto: 'Reflexão Coletiva',
          subtexto: reflexao,
          dicaProfessor: 'Fomente a criticidade, ouvindo as impressões dos alunos.'
        });
      }

      if (trabalho) {
        deck.push({
          tipo: 'texto_simples',
          title: '⚠️ Tarefa / Trabalho',
          topicos: cleanMarkerText(trabalho),
          dicaProfessor: 'Explique os critérios de pontuação e data limite de entrega.'
        });
      }

      return deck;
    };

    const rawSlides = getSlides();
    
    // Obter o título da aula ativa para enriquecer as slides com contexto do esporte e evitar falsos positivos de diagramas táticos
    let activeAulaTitle = '';
    if (selectedAulaData) {
      const lastUnderscoreIndex = selectedAulaData.lastIndexOf('_');
      if (lastUnderscoreIndex !== -1) {
        const turmaId = selectedAulaData.substring(0, lastUnderscoreIndex);
        const dateStr = selectedAulaData.substring(lastUnderscoreIndex + 1);
        const plans = PE_PLAN[turmaId] || [];
        const aula = plans.find(a => a.data === dateStr);
        if (aula) {
          activeAulaTitle = aula.titulo;
        }
      }
    }

    const slides = rawSlides ? rawSlides.map((s: any) => ({
      ...s,
      parentTitle: s.parentTitle || activeAulaTitle
    })) : null;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDica, setShowDica] = useState(false);

    // Navegação Teclado
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'Escape') setCurrentView('repositorio_aulas');
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    });

    if (!slides) return null;

    const nextSlide = () => { setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1)); setShowDica(false); };
    const prevSlide = () => { setCurrentIndex((prev) => Math.max(prev - 1, 0)); setShowDica(false); };
    const handlePrint = () => { window.print(); };

    const slideAtual: any = slides[currentIndex];

    // Renderização dos Tipos de Slide Visual Limpo
    const renderSlideContent = () => {
      // Map legacy "tipo" to "type" from data
      const slideType = slideAtual.type || slideAtual.tipo || 'texto';
      const isIlgch = selectedAulaData ? selectedAulaData.startsWith('ilgch') : false;

      const slideTitle = slideAtual.title || slideAtual.titulo || '';
      const slideContent = slideAtual.content || slideAtual.texto || '';
      const combinedText = (slideTitle + ' ' + slideContent).toUpperCase();
      const parentTitleText = (slideAtual.parentTitle || '').toUpperCase();

      const isParentFutsal = parentTitleText.includes('FUTSAL');
      const isParentVolei = parentTitleText.includes('VÔLEI') || parentTitleText.includes('VOLEIBOL');
      const isParentFutevolei = parentTitleText.includes('FUTEVÔLEI') || parentTitleText.includes('FUTVOLEI') || parentTitleText.includes('ALTINHA');
      const isParentBasquete = parentTitleText.includes('BASQUETE');
      const isParentHandebol = parentTitleText.includes('HANDEBOL');
      const isParentFutebol = parentTitleText.includes('FUTEBOL') && !parentTitleText.includes('FUTSAL') && !parentTitleText.includes('FUTEBOL DE 5') && !parentTitleText.includes('FUTEBOL DE CINCO');
      const isParentFutebol5 = parentTitleText.includes('FUTEBOL DE 5') || parentTitleText.includes('FUTEBOL DE CINCO') || parentTitleText.includes('PARADESPORTO');
      const isParentVoleiSentado = parentTitleText.includes('SENTADO') || (parentTitleText.includes('PARADESPORTO') && parentTitleText.includes('VÔLEI'));

      const isFutevolei = isParentFutevolei || combinedText.includes('FUTEVÔLEI') || combinedText.includes('FUTVOLEI');

      const isFutsalMedidas = (isParentFutsal && (
        combinedText.includes('DIMENSÕES') ||
        combinedText.includes('MEDIDAS') ||
        combinedText.includes('ROTEIRO') ||
        combinedText.includes('QUADRA') ||
        combinedText.includes('POSIÇÕES') ||
        combinedText.includes('ATRIBUIÇÕES') ||
        combinedText.includes('REGULAMENTO') ||
        combinedText.includes('CARTÕES') ||
        combinedText.includes('REGRAS')
      )) || (
        combinedText.includes('FUTSAL') && (
          combinedText.includes('DIMENSÕES') ||
          combinedText.includes('MEDIDAS') ||
          combinedText.includes('ROTEIRO') ||
          combinedText.includes('QUADRA')
        )
      );

      const isFutsalTatico = (isParentFutsal && (
        combinedText.includes('SISTEMA') ||
        combinedText.includes('TÁTICO') ||
        combinedText.includes('2-2') ||
        combinedText.includes('3-1') ||
        combinedText.includes('TÁTICA') ||
        combinedText.includes('MOVIMENTAÇÃO') ||
        combinedText.includes('RODÍZIO') ||
        combinedText.includes('MARCAÇÃO') ||
        combinedText.includes('ATAQUE')
      )) || (
        combinedText.includes('SISTEMA TÁTICO 2-2') ||
        combinedText.includes('SISTEMA TÁTICO 3-1') ||
        combinedText.includes('TÁTICO DE PASSE') ||
        (combinedText.includes('FUTSAL') && combinedText.includes('TÁTICA'))
      );

      const isVoleiPosicoes = (isParentVolei && (
        combinedText.includes('POSIÇÕES') ||
        combinedText.includes('RODÍZIO') ||
        combinedText.includes('ATRIBUIÇÕES') ||
        combinedText.includes('REVISÃO') ||
        combinedText.includes('REDE')
      )) || (
        (!isParentFutsal && combinedText.includes('POSIÇÕES')) ||
        combinedText.includes('RODÍZIO') ||
        (combinedText.includes('VÔLEI') && combinedText.includes('MEDIDAS')) ||
        (combinedText.includes('VOLEIBOL') && combinedText.includes('CANTOS'))
      );

      const isVolei6x0 = (isParentVolei && (
        combinedText.includes('6X0') ||
        combinedText.includes('SISTEMA') ||
        combinedText.includes('FLUXO') ||
        combinedText.includes('JOGADA') ||
        combinedText.includes('ATAQUE')
      )) || (
        combinedText.includes('6X0') ||
        (combinedText.includes('VÔLEI') && combinedText.includes('FLUXO')) ||
        combinedText.includes('JOGADA DE ATAQUE')
      );

      const isBasqueteHandebol = isParentBasquete || isParentHandebol ||
        combinedText.includes('BASQUETE') ||
        combinedText.includes('HANDEBOL') ||
        combinedText.includes('CONFRONTANDO AS MEDIDAS');

      const isImpedimento = (isParentFutebol && (
        combinedText.includes('IMPEDIMENTO') ||
        combinedText.includes('REGRA') ||
        combinedText.includes('LINHA')
      )) ||
        combinedText.includes('IMPEDIMENTO') ||
        combinedText.includes('REGRA DO IMPEDIMENTO');

      const isFutebolTatico = (isParentFutebol && (
        combinedText.includes('TÁTICO') ||
        combinedText.includes('SISTEMA') ||
        combinedText.includes('4-4-2') ||
        combinedText.includes('4-3-3') ||
        combinedText.includes('POSICIONAMENTO')
      )) ||
        combinedText.includes('4-4-2') ||
        combinedText.includes('4-3-3') ||
        combinedText.includes('SISTEMAS OFENSIVOS') ||
        combinedText.includes('SISTEMAS DE POSICIONAMENTO');

      const isVoleiSentado = isParentVoleiSentado ||
        combinedText.includes('SENTADO') ||
        (combinedText.includes('PARADESPORTO') && combinedText.includes('VÔLEI'));

      const isFutebol5 = isParentFutebol5 ||
        combinedText.includes('FUTEBOL DE 5') ||
        combinedText.includes('FUTEBOL DE CINCO') ||
        combinedText.includes('GUIZO') ||
        combinedText.includes('ADAPTAÇÕES DE REGRAS');

      const hasDiagram = isFutevolei || isFutsalMedidas || isFutsalTatico || isVoleiPosicoes || isVolei6x0 || isBasqueteHandebol || isImpedimento || isFutebolTatico || isVoleiSentado || isFutebol5;

      switch (slideType) {
        case 'capa':
        case 'hero':
          return isIlgch ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 md:p-12 bg-slate-950 min-h-[450px]">
              <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase leading-tight">
                {slideAtual.title || slideAtual.titulo}
              </h1>
              <p className="text-xl md:text-4xl font-medium text-amber-400">
                {slideAtual.subtitle || slideAtual.subtitulo}
              </p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 md:p-12 bg-white min-h-[450px] border-b-8 border-blue-600">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 uppercase leading-tight">
                {slideAtual.title || slideAtual.titulo}
              </h1>
              <div className="h-1.5 w-24 bg-blue-600 mb-6 rounded"></div>
              <p className="text-xl md:text-3xl font-extrabold text-blue-600">
                {slideAtual.subtitle || slideAtual.subtitulo}
              </p>
            </div>
          );
        
        case 'text':
        case 'texto':
        case 'texto_simples':
        case 'list':
          return isIlgch ? (
            <div className="w-full h-full flex flex-col justify-center p-6 md:p-16 bg-[#0B1120] min-h-[450px]">
              <h2 className="text-3xl md:text-5xl font-black text-emerald-400 mb-8 border-l-8 border-emerald-500 pl-4">
                {slideAtual.title || slideAtual.titulo}
              </h2>
              {slideAtual.content && (
                <p className="text-2xl md:text-3xl font-bold text-slate-200 mb-6">{slideAtual.content}</p>
              )}
              <ul className="space-y-6 max-w-5xl">
                {(slideAtual.points || slideAtual.topicos || slideAtual.content?.split('\n').filter(Boolean))?.map((topico: string, idx: number) => (
                  <li key={idx} className="text-xl md:text-3xl font-bold text-slate-200 flex items-start gap-4 leading-tight">
                    <span className="text-emerald-400 mt-1">»</span> {topico}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center p-6 md:p-12 bg-white min-h-[450px]">
              {hasDiagram ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 border-l-8 border-blue-600 pl-4 tracking-tight leading-tight">
                      {slideAtual.title || slideAtual.titulo}
                    </h2>
                    {slideAtual.content && (
                      <p className="text-lg md:text-xl font-extrabold text-blue-900 mb-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">{slideAtual.content}</p>
                    )}
                    <ul className="space-y-4 max-w-xl">
                      {(slideAtual.points || slideAtual.topicos || slideAtual.content?.split('\n').filter(Boolean))?.map((topico: string, idx: number) => (
                        <li key={idx} className="text-base md:text-lg font-bold text-slate-700 flex items-start gap-3 leading-relaxed">
                          <span className="text-blue-600 mt-1 font-bold shrink-0">●</span> <span>{topico}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-6 flex items-center justify-center w-full">
                    <ChalkboardDiagram title={slideAtual.title || slideAtual.titulo} topic={slideAtual.title || slideAtual.titulo} parentTitle={slideAtual.parentTitle} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 border-l-8 border-blue-600 pl-4 tracking-tight">
                    {slideAtual.title || slideAtual.titulo}
                  </h2>
                  {slideAtual.content && (
                    <p className="text-xl md:text-2xl font-extrabold text-blue-900 mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">{slideAtual.content}</p>
                  )}
                  <ul className="space-y-6 max-w-5xl">
                    {(slideAtual.points || slideAtual.topicos || slideAtual.content?.split('\n').filter(Boolean))?.map((topico: string, idx: number) => (
                      <li key={idx} className="text-xl md:text-2xl font-bold text-slate-700 flex items-start gap-4 leading-relaxed">
                        <span className="text-blue-600 mt-1 font-bold">●</span> {topico}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );

        case 'destaque_centro':
          return isIlgch ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center bg-[#0B1120] min-h-[450px]">
               <h2 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase max-w-6xl">
                 {slideAtual.texto || slideAtual.content}
               </h2>
               {(slideAtual.subtexto || slideAtual.subtitle) && (
                 <p className="mt-8 text-2xl md:text-4xl text-emerald-400 font-bold border-b-4 border-emerald-400 pb-2">
                   {slideAtual.subtexto || slideAtual.subtitle}
                 </p>
               )}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center bg-blue-50 min-h-[450px] border-y-8 border-blue-200">
               <h2 className="text-4xl md:text-5xl font-extrabold text-blue-950 leading-tight uppercase max-w-6xl tracking-tight">
                 {slideAtual.texto || slideAtual.content}
               </h2>
               {(slideAtual.subtexto || slideAtual.subtitle) && (
                 <p className="mt-8 text-xl md:text-3xl text-blue-600 font-black border-b-4 border-blue-600 pb-2 uppercase tracking-wider">
                   {slideAtual.subtexto || slideAtual.subtitle}
                 </p>
               )}
            </div>
          );

        case 'pratica':
          return (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center bg-[#F8FAFC] min-h-[450px]">
              <div className="max-w-4xl bg-amber-50 border-4 border-dashed border-amber-500 rounded-3xl p-8 md:p-12 shadow-2xl relative">
                {/* Comic-style badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-500 border-2 border-amber-600 text-slate-900 font-black px-6 py-2 rounded-full uppercase tracking-widest text-[11px] md:text-xs shadow-md">
                  ⚡ ATIVIDADE PRÁTICA EM QUADRA ⚡
                </div>
                <div className="text-6xl md:text-8xl mb-6 select-none animate-bounce">🏃‍♂️⚽️🏆</div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-6 leading-tight">
                  {slideAtual.title || slideAtual.titulo || "Aula Prática"}
                </h2>
                <div className="h-1 w-20 bg-amber-500 mx-auto mb-6 rounded"></div>
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed mb-6">
                  {slideAtual.content || slideAtual.texto}
                </p>
                {slideAtual.subtexto && (
                  <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl text-xs md:text-sm font-black text-blue-600 uppercase tracking-wide shadow-sm inline-block">
                    👉 {slideAtual.subtexto}
                  </div>
                )}
              </div>
            </div>
          );

        default:
          return isIlgch ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center bg-[#0B1120] min-h-[450px]">
              <h2 className="text-3xl md:text-5xl font-black text-emerald-400 mb-8">
                {slideAtual.title || slideAtual.titulo}
              </h2>
              <p className="text-xl md:text-3xl font-bold text-slate-200">
                {slideAtual.content || slideAtual.texto}
              </p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center bg-white min-h-[450px]">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
                {slideAtual.title || slideAtual.titulo}
              </h2>
              <p className="text-xl md:text-2xl font-bold text-slate-700">
                {slideAtual.content || slideAtual.texto}
              </p>
            </div>
          );
      }
    };

    const isIlgch = selectedAulaData ? selectedAulaData.startsWith('ilgch') : false;

    return (
      <div className={`fixed inset-0 ${isIlgch ? 'bg-slate-950' : 'bg-slate-100'} z-[99999] flex flex-col font-sans`}>
        
        {/* CSS para Impressão */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            .no-print { display: none !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        `}} />

        {/* Header do Player */}
        <div className={`h-16 flex justify-between items-center px-6 absolute top-0 w-full z-[100000] ${isIlgch ? 'bg-black/50 text-white' : 'bg-white/80 border-b border-slate-200 text-slate-800'} backdrop-blur no-print`}>
          <div className="flex gap-4">
            <button 
              onClick={() => setCurrentView('repositorio_aulas_lista')} 
              className={`px-4 py-2 rounded font-bold text-sm transition-all shadow-sm ${isIlgch ? 'text-white bg-white/20 hover:bg-white/30' : 'text-slate-700 bg-slate-200 hover:bg-slate-300'}`}
            >
              Voltar
            </button>
            <button onClick={handlePrint} className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-bold text-sm shadow-sm transition-all">
              <Printer size={16} /> Salvar PDF
            </button>
          </div>
          <div className={`font-bold tracking-widest text-xs px-3 py-1 rounded shadow-sm ${isIlgch ? 'text-white bg-black/50' : 'text-slate-800 bg-slate-200'}`}>
            {currentIndex + 1} / {slides.length}
          </div>
        </div>

        {/* Slide Content */}
        <div className="flex-grow w-full h-full relative" id="print-area">
          {renderSlideContent()}
        </div>

        {/* Setas Laterais Flutuantes (Estilo Datashow/Apresentador profissional) */}
        <button 
          onClick={prevSlide} 
          disabled={currentIndex === 0} 
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 md:w-20 md:h-20 ${isIlgch ? 'bg-slate-900/60 hover:bg-emerald-600/90 text-white border-slate-700/50' : 'bg-white/80 hover:bg-blue-600/90 text-slate-800 hover:text-white border-slate-300'} rounded-full flex items-center justify-center disabled:opacity-10 transition-all border shadow-2xl z-[100000] no-print cursor-pointer`}
          title="Slide Anterior (Tecla Seta Esquerda)"
        >
          <ChevronLeft size={36} className="md:w-12 md:h-12" />
        </button>

        <button 
          onClick={nextSlide} 
          disabled={currentIndex === slides.length - 1} 
          className={`absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 md:w-20 md:h-20 ${isIlgch ? 'bg-slate-900/60 hover:bg-emerald-600/90 text-white border-slate-700/50' : 'bg-white/80 hover:bg-blue-600/90 text-slate-800 hover:text-white border-slate-300'} rounded-full flex items-center justify-center disabled:opacity-10 transition-all border shadow-2xl z-[100000] no-print cursor-pointer`}
          title="Próximo Slide (Tecla Seta Direita)"
        >
          <ChevronRight size={36} className="md:w-12 md:h-12" />
        </button>

        {/* Controles Base e Dica */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-[100000] no-print">
          <div className="max-w-xl">
            <button 
              onClick={() => setShowDica(!showDica)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs mb-2 backdrop-blur border shadow-md animate-pulse cursor-pointer ${isIlgch ? 'text-slate-300 hover:text-white bg-slate-800/85 border-slate-700' : 'text-slate-700 hover:text-slate-900 bg-white/90 border-slate-300'}`}
            >
              <Info size={14} /> {showDica ? 'Esconder Dica' : 'Ver Dica de Fala'}
            </button>
            {showDica && (
              <div className={`p-5 rounded-xl shadow-2xl max-h-[160px] overflow-y-auto border-2 ${isIlgch ? 'bg-slate-900 border-emerald-500' : 'bg-white border-blue-500'}`}>
                <span className={`font-bold text-xs uppercase tracking-wider block mb-1 ${isIlgch ? 'text-emerald-400' : 'text-blue-600'}`}>Seu Roteiro:</span>
                <p className={`text-base md:text-lg font-medium leading-snug ${isIlgch ? 'text-white' : 'text-slate-800'}`}>{slideAtual.dicaProfessor}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button 
              onClick={prevSlide} 
              disabled={currentIndex === 0} 
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center disabled:opacity-30 border-4 border-white shadow-xl transition-colors ${isIlgch ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={nextSlide} 
              disabled={currentIndex === slides.length - 1} 
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center disabled:opacity-30 border-4 border-white shadow-xl transition-colors ${isIlgch ? 'bg-white text-emerald-900 hover:bg-slate-200' : 'bg-white text-blue-900 hover:bg-slate-200'}`}
            >
              <ChevronRight size={32} />
            </button>
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
      {currentView === 'player' && <SlidePlayer />}
      {currentView === 'ocorrencias' && <OcorrenciasView onBack={() => setCurrentView('menu')} />}
    </div>
  );
};

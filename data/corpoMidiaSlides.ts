export const SLIDES_JOGOS_TABULEIRO = [
  { 
    tipo: 'capa',
    title: 'Jogos de Tabuleiro, Cartas e Mentais',
    subtitle: 'A importância dos jogos de salão na Educação Física',
    dicaProfessor: 'Deixe na tela inicial. Fundo leve, imagens de peças de xadrez ou cartas.'
  },
  {
    tipo: 'texto_simples',
    title: 'Por que jogar na Educação Física?',
    points: [
      'Desenvolvimento mental: estímulo do raciocínio lógico, memória e tomada de decisão rápida e estratégica.',
      'Controle emocional: ensino da paciência, de saber ganhar e também de saber lidar com a derrota.',
      'Interação social: desenvolvimento da socialização fora do ambiente das telas e das redes sociais.',
      'Educação Motora: jogos como Jenga e Pega varetas estimulam a coordenação motora fina.',
      'Esportes da mente: modalides consagradas como Xadrez são consideradas esportes de mente pela exigência e alta concentração.'
    ],
    dicaProfessor: 'Lembrete: o cérebro também comanda nosso corpo. Educação Física abrange a complexidade humana. Dialogar sobre a necessidade de exercitar a mente.'
  },
  {
    tipo: 'texto_simples',
    title: 'Jogos Notáveis',
    points: [
      'Uno e Baralho: Clássicos e dinâmicos para grupos e raciocínio imediato.',
      'Xadrez e Dama: Jogos de estratégia antecipada em longo prazo (esportes de mente).',
      'Sudoku e Tangram: Jogos solitários que desafiam a lógica numérica e espacial geométrica.',
      'Pega Varetas e Jenga: A exigência do corpo na sustentação (micro-motricidade e força isométrica controlada).',
      'Jogo da Memória: Excelentes para estimular funções frontais do cérebro.'
    ],
    dicaProfessor: 'Reúna a turma e pergunto: Qual jogo vocês costumam se dar melhor? Já experimentaram algum desses?'
  }
];

// Factory para novos tipos de slides
const createSlide = (title: string, subtitle: string, content: string, type: string = 'text', theme: string = 'hero') => ({
  title,
  subtitle,
  content,
  type,
  theme
});

export const SLIDES_GENERICOS = {
  'Jogos do Mundo': [
     {
       type: 'capa',
       title: 'Jogos do Mundo: Uma Volta ao Planeta',
       subtitle: 'A herança cultural, histórica e regras dos esportes intelectuais',
       dicaProfessor: 'Organize a sala para um debate. Deixe esse slide no telão enquanto os alunos se organizam.'
     },
     {
       type: 'texto_simples',
       title: '1. Continente Africano',
       subtitle: 'Mancala, Seega e Fanorona',
       content: 'O continente berço da humanidade nos legou formas matemáticas brilhantes de partilha, distribuição e agilidade lógica.',
       points: [
         'Mancala (Oware / Kalah): Semeadura estratégica. O objetivo é colher mais sementes. Semeia-se de forma consecutiva e captura-se ao terminar em cavas específicas.',
         'Seega: Jogo egípcio de posicionamento de peças no deserto. Os jogadores intercalam posições para cercar e eliminar o oponente pelos flancos.',
         'Fanorona: Conhecido jogo de Madagascar com grade geométrica. A captura das peças vizinhas acontece por aproximação ou por recuo rápido na linha.'
       ],
       dicaProfessor: 'Foque em ressaltar que a Mancala é um jogo de semeadura e colheita, que reflete cooperação e economia agrária africana.'
     },
     {
       type: 'texto_simples',
       title: '2. Continente Asiático',
       subtitle: 'Go (Weiqi), Shogi e Mahjong',
       content: 'Estratégia abstrata, análise espacial paciente de territórios e cálculos de probabilidade mental.',
       points: [
         'Go (Weiqi): A complexidade máxima com regras simples. Dois povos demarcam territórios flutuando pedras pretas e brancas em um grid milenar.',
         'Shogi: O Xadrez Japonês. Possibilita a regra inovadora de Drop — você pode posicionar qualquer peça capturada do adversário de volta ao jogo sob seu comando.',
         'Mahjong: Jogo tradicional com peças de bambu/marfim. O objetivo é ordenar melds (sequências ou trincas idênticas) e finalizar com um par perfeito.'
       ],
       dicaProfessor: 'Explique como a regra do Drop no Shogi torna o jogo altamente incisivo e dinâmico.'
     },
     {
       type: 'texto_simples',
       title: '3. Continente Europeu',
       subtitle: 'Xadrez Clássico, Damas e Sueca',
       content: 'O continente que refinou sistemas táticos feudais, esportes mentais olímpicos e hierarquias de poder.',
       points: [
         'Xadrez Clássico: Batalha geométrica com o intuito de dar Xeque-Mate no Rei. Cada classe de peça representa o sistema medieval europeu.',
         'Damas: Jogo ágil focado na diagonal. Saltos obrigatórios de captura com a recompensa de promover a peça comum a Dama livre ao cruzar o tabuleiro.',
         'Sueca: Clássico jogo de baralho em duplas. Vence quem obtiver a maior pontuação acumulada nas vazas definindo um naipe de trunfo surpresa.'
       ],
       dicaProfessor: 'Instigue os alunos explicando que o Xadrez clássico é um esporte da mente olímpico mundial.'
     },
     {
       type: 'texto_simples',
       title: '4. Continente Americano',
       subtitle: 'Truco, Patolli e Conquian',
       content: 'Uma combinação rica de misticismo, teatro e agilidade verbal para desequilibrar o oponente.',
       points: [
         'Truco: O rei do blefe e da expressão corporal na América do Sul. Vence quem convencer o rival que possui as melhores cartas na rodada.',
         'Patolli: Herança mística Azteca. Um jogo ritual de corrida no formato de cruz, utilizando feijões marcados como dados divinos.',
         'Conquian: Precursor astuto de rummy e buraco no México. Jogado com baralho espanhol de 40 cartas para compor de forma matemática trincas e sequências.'
       ],
       dicaProfessor: 'Fale de como o Truco utiliza da dramatização humana e gesticulação facial para intimidar o rival.'
     },
     {
       type: 'texto_simples',
       title: '5. Continente da Oceania',
       subtitle: 'Mu Torere, Surakarta e Hawaiian Kōnane',
       content: 'Desenhos simétricos conectados com as estrelas e a natureza, focados em asfixia espacial do rival.',
       points: [
         'Mu Torere: Jogo Maori (Nova Zelândia) jogado em uma grade de estrela de 8 pontas. O objetivo supremo é encurralar e travar o rival impedindo-o de mover.',
         'Surakarta: Jogo tradicional da Indonésia/Oceania com loops de curvas na borda. Só se capturam peças rivais deslizando taticamente através dos círculos.',
         'Hawaiian Kōnane: Semelhante a damas mas com pedras vulcânicas pretas e brancas na grelha. Salta-se peças para capturas abundantes até que não haja jogadas.'
       ],
       dicaProfessor: 'Discuta sobre a extraordinária facilidade visual e profundidade matemática do Mu Torere que intriga IA modernas.'
     },
     {
       type: 'texto_simples',
       title: 'Próxima Aula: Apresentação Científica',
       subtitle: 'Criação dos Grupos e Oficinas de Trabalho',
       content: 'Iremos formar grupos e produzir nossos próprios jogos de tabuleiro globais para experimentação prática.',
       points: [
         'Divisão da Turma: Organizar grupos estáveis de 4 a 5 alunos.',
         'Escolha do Tema: Cada grupo escolhe um jogo internacional de interesse para pesquisar a fundo suas regras e construir de forma artesanal.',
         'Oficina em Sala: Na próxima semana (22/06), traremos materiais recicláveis (cartolina, tampinhas, papelão) para desenhar e jogar!'
       ],
       dicaProfessor: 'Divida os grupos de forma respeitosa e garanta uma variedade cultural para as oficinas.'
     }
  ],
  'Futebol de Botão': [
    createSlide('Futebol de Botão', 'Arte na mesa', 'Uma invenção brasileira que une tática, paciência e habilidade.', 'capa', 'hero'),
    createSlide('Regras e Tática', 'Como dominar o flick', 'O campo de botão é um campo de xadrez em alta velocidade.', 'text', 'cards'),
  ],
  'Jogos Cooperativos': [
       createSlide('Jogos Cooperativos', 'Ninguém perde', 'A importância de crescer em conjunto.', 'capa', 'hero'),
       createSlide('A Ilha', 'Cooperação radical', 'Todos precisam caber no mesmo espaço reduzido.', 'text', 'cards'),
  ]
};

export const CORPO_MIDIA_SLIDES = [
  { title: "DEBATE: CORPO E MÍDIA", subtitle: "Desconstruindo estereótipos com Frantz Fanon e Cida Bento.", type: "text", theme: "hero" },
  { title: "O PONTO DE PARTIDA", content: "Uma reflexão sociológica sobre como a TV e a internet limitam as narrativas sobre corpos negros e periféricos.", type: "text", theme: "quote" },
  { title: "NOSSOS GUIAS TEÓRICOS", points: [
    "**FRANTZ FANON (Sociogenia):** A experiência vivida do negro é marcada pela marcação histórica e social de inferioridade.",
    "**FRANTZ FANON (Epidermização):** A internalização da inferioridade baseada na cor da pele como constructo social.",
    "**CIDA BENTO (Pacto Narcísico):** Mecanismo de autopreservação branca que privilegia seus pares em detrimento da meritocracia real.",
    "**CIDA BENTO (Branquitude):** O poder de definir o que é o 'normal' ou 'humano' universal, excluindo o outro."
  ], type: "list", theme: "theory" },
  { title: "FANON: A SOCIOGENIA", content: "A experiência vivida do negro é marcada pela epidermização da inferioridade – uma construção social que domina o psiquismo.", type: "text", hasImage: true },
  { title: "CIDA BENTO: O PACTO", content: "O Pacto Narcísico da branquitude atua como um sistema que garante privilégios e a manutenção da estrutura de poder, invisibilizando o racismo.", type: "text", hasImage: true },
  { title: "COMO O ESTEREÓTIPO ATUA?", points: ["**HIPERSEXUALIZAÇÃO:** Redução do corpo apenas ao desejo.", "**MARGINALIZAÇÃO:** O corpo negro fora do centro da narrativa.", "**SUBSERVIÊNCIA:** Papéis subalternos reforçados."], type: "list", theme: "cards" },
  { title: "DADOS DA REALIDADE", content: "Fonte: Agência Brasil / Perfil Racial da Imprensa Brasileira.", type: "chart" },
  { title: "CITAÇÃO", content: '"Oh, meu corpo, faça de mim sempre um homem que questiona!" - Frantz Fanon', type: "text", theme: "hero" },
  { title: "EVOLUÇÃO DA REPRESENTAÇÃO", points: ["**DÉCADAS 70-80:** Papéis predominantemente caricatos.", "**ANOS 90-2000:** Primeiros avanços com protagonistas.", "**ATUALMENTE:** Narrativas diversas e combate ao pacto."], type: "list", theme: "timeline" },
  { title: "UM NOVO OLHAR: RESISTÊNCIA", content: "Criadores de conteúdo e jornalistas independentes estão quebrando o pacto narcísico e produzindo novos significados.", type: "text", hasImage: true },
  { title: "CONCLUSÃO E DEBATE", content: "Como podemos descolonizar o nosso olhar midiático e construir novas representações para corpos negros?", type: "text", theme: "hero" }
];


export const SLIDES_3TRI = {
  'Gênero, Sociedade e Esporte': [
    { title: "Gênero, Sociedade e Esporte", subtitle: "O debate do século XXI", type: "hero", dicaProfessor: "Introduza o tema com leveza, perguntando o que eles entendem por 'esporte de menino' vs 'esporte de menina'." },
    { title: "Construção Social", content: "Por que dividimos o esporte por gênero? É biológico ou histórico?", type: "text", dicaProfessor: "Explique brevemente que esportes são construções históricas." },
    { title: "O que é Feminino no Esporte?", points: ["Regras históricas", "Inclusão vs Exclusão", "Papéis sociais"], type: "list", dicaProfessor: "Use exemplos de como regras foram alteradas para incluir ou excluir mulheres." },
    { title: "Reflexão Final", content: "O esporte tem gênero?", type: "hero", dicaProfessor: "Pergunte a opinião deles para iniciar o debate." }
  ],
  'O Apagamento Invisível': [
    { title: "O Apagamento Invisível", subtitle: "Mulheres na Ciência", type: "hero", dicaProfessor: "Contextualize a importância de mulheres na história da ciência." },
    { title: "O Efeito Matilda", content: "Quando o Nobel é dado a homens pelo trabalho de mulheres.", type: "text", dicaProfessor: "Explique o termo efeito Matilda." },
    { title: "Grandes Esquecidas", points: ["Rosalind Franklin", "Lise Meitner", "Jocelyn Bell Burnell"], type: "list", dicaProfessor: "Fale brevemente sobre cada uma delas." },
    { title: "Reflexão", content: "De quem são as glórias da ciência?", type: "hero", dicaProfessor: "Debata sobre autoria e reconhecimento." }
  ],
  'Divisão Sexista do Corpo': [
    { title: "Divisão Sexista", subtitle: "O peso do preconceito", type: "hero", dicaProfessor: "Fale sobre como corpos são julgados." },
    { title: "Corpos de Atletas", points: ["Hipertrofia feminina", "Estética vs Performance", "O julgamento do público"], type: "list", dicaProfessor: "Questione por que esforço feminino é tratado como 'luta contra própria natureza'." },
    { title: "Reflexão", content: "Prática corporal tem gênero?", type: "hero", dicaProfessor: "Finalize perguntando se eles acham que exercício tem gênero." }
  ],
  'Hipersexualização e Espetáculo': [
    { title: "Hipersexualização", subtitle: "O espetáculo do corpo", type: "hero", dicaProfessor: "Inicie debate sobre consumo de mídia esportiva." },
    { title: "Foco na Mídia", content: "Foco na aparência ou na técnica?", type: "text", dicaProfessor: "Analise como imprensa cobra performance masculina e beleza feminina." },
    { title: "Impactos", points: ["Traje versus performance", "Comercialização", "Resistência política"], type: "list", dicaProfessor: "Cite exemplos de uniformes." },
    { title: "Esporte como Espetáculo", content: "Apenas técnica ou apelo comercial?", type: "hero", dicaProfessor: "Reflita sobre valor comercial do corpo." }
  ],
  'Equidade Salarial no Esporte': [
    { title: "Equidade Salarial", subtitle: "Luta por direitos", type: "hero", dicaProfessor: "Aborde o tema econômico." },
    { title: "O Ciclo Vicioso", points: ["Falta de investimento", "Horários ruins", "Baixa audiência"], type: "list", dicaProfessor: "Desenhe no quadro como esse ciclo se mantém." },
    { title: "Igualdade é possível?", content: "Luta global por direitos.", type: "hero", dicaProfessor: "Finalize discutindo a luta das atletas pelo mundo." }
  ],
  'As Pioneiras Olímpicas': [
    { title: "Pioneiras Olímpicas", subtitle: "Legado no Brasil", type: "hero", dicaProfessor: "Apresente Aída dos Santos e Maria Lenk." },
    { title: "Proibições Históricas", points: ["Decreto de Vargas", "Corpo feminino", "Luta pelo esporte"], type: "list", dicaProfessor: "Explique o decreto de Vargas." },
    { title: "O Preço da Liberdade", content: "Eram proibidas de atuar.", type: "hero", dicaProfessor: "Reflita sobre a importância da coragem delas." }
  ],
  'Debate Integrador': [
    { title: "Debate Final", subtitle: "Consolidando o ano", type: "hero", dicaProfessor: "Inicie debate sobre o percurso do ano." },
    { title: "Pontos Chave", points: ["O que ficou?", "O que mudou?", "O futuro no ILGCH"], type: "list", dicaProfessor: "Instigue-os a falar pontos mais impactantes." },
    { title: "O que levamos?", content: "Pense no ano.", type: "hero", dicaProfessor: "Finalize reforçando o pensamento crítico." }
  ],
  'Síntese Final': [
    { title: "Síntese Final", subtitle: "Nosso percurso", type: "hero", dicaProfessor: "Finalize o percurso da disciplina." },
    { title: "Review", content: "Os eixos do ano: Gênero, Ciência, Esporte.", type: "text", dicaProfessor: "Dê visão panorâmica do que foi estudado." },
    { title: "Rumo ao Futuro", content: "Estamos prontos para os próximos passos?", type: "hero", dicaProfessor: "Encerre com fala inspiradora." }
  ]
};

export const ALTINHA_FUTVOLEI_SLIDES = [
  {
    title: "Altinha & Futevôlei",
    subtitle: "Da Roda para a Rede: Uma jornada pelas areias",
    type: "text",
    theme: "hero"
  },
  {
    title: "As Origens",
    content: "Como a paixão nacional pelo futebol encontrou seu espaço na praia.",
    type: "text",
    theme: "hero"
  },
  {
    title: "História nas Areias Cariocas",
    points: [
      "Futevôlei (Anos 60): Nasceu nas praias de Copacabana. Foi uma forma criativa encontrada pelos banhistas para burlar a lei da época que proibia jogar futebol perto da água, utilizando as quadras de vôlei já montadas na areia.",
      "Altinha (Anos 90/00): Popularizou-se mais tarde, com forte presença em Ipanema. Nasceu não como um jogo de pontos, mas como uma exibição de controle, cooperação e espetáculo visual, mantendo a bola no ar sem usar as mãos."
    ],
    type: "list"
  },
  {
    title: "A Arte da Altinha",
    content: "A Altinha é essencialmente um jogo cooperativo. Não há vencedores ou perdedores, o objetivo é coletivo: não deixar a bola cair no chão. Forma-se uma \"roda\" amigável onde os jogadores utilizam extrema técnica, tempo de bola e criatividade para manter a redonda em movimento constante e fluido.",
    type: "text"
  },
  {
    title: "Fundamentos da Altinha",
    points: [
      "Chapa: O passe mais seguro e utilizado na roda. Garante que a bola vá na direção correta, com controle e altura ideal para o próximo parceiro.",
      "Peito e Cabeça: Fundamentais para recepção. Usados para amortecer bolas altas ou fortes, \"matando\" a bola no peito e preparando-a para o toque seguinte.",
      "Acrobacias: Puxetas, bicicletas e voleios. Muito utilizadas para salvar bolas difíceis que estão caindo fora do alcance, além de garantir o \"show\" da roda."
    ],
    type: "list"
  },
  {
    title: "O Desafio do Futevôlei",
    content: "Ao contrário da Altinha, o Futevôlei é puramente competitivo. Jogado geralmente em duplas, o grande objetivo é fazer a bola tocar na areia da quadra adversária. Exige os mesmos excelentes fundamentos de controle corporal da Altinha, mas adiciona a complexidade da rede de 2,20m, limites de quadra, regras de saque e pontuação.",
    type: "text"
  },
  {
    title: "Fundamentos do Futevôlei",
    points: [
      "Saque: O início da disputa do ponto. Exige precisão e força para dificultar ao máximo a recepção da equipe adversária do outro lado da rede.",
      "Recepção & Passe: O primeiro toque após o saque. Crucial para colocar a bola em jogo, geralmente usando o peito para levantar a bola perfeitamente para o parceiro.",
      "Ataque: A finalização da jogada. Pode ser uma \"pingada\" sutil buscando o espaço vazio, ou um forte \"shark attack\" para vencer a defense rival."
    ],
    type: "list"
  },
  {
    title: "A Progressão",
    content: "Construindo a intimidade com a bola antes de enfrentar a rede.",
    type: "text",
    theme: "hero"
  },
  {
    title: "O Caminho do Aprendizado",
    points: [
      "1. Controle: Domínio individual da bola. Embaixadinhas, domínio de coxa, peito e toques na parede.",
      "2. A Roda: Prática da Altinha. Foco total em passes cooperativos, leitura corporal e tempo de bola.",
      "3. Direção: Treinar passes com um alvo fixo na roda, simulando o que será o levantamento na quadra.",
      "4. A Rede: Introdução do obstáculo visual e físico. Transição para o jogo de duplas com regras oficiais."
    ],
    type: "list"
  },
  {
    title: "Por que começar pela Altinha?",
    points: [
      "Desenvolve a \"intimidade\": com a bola sem a pressão psicológica de perder pontos.",
      "Aumenta significativamente: o tempo de reação, reflexo e leitura da trajetória da bola.",
      "Condiciona e prepara: as articulações e a musculatura para a movimentação pesada na areia.",
      "Ensina instintivamente: a importância da altura e da velocidade ideais de um passe.",
      "É extremamente inclusivo: e divertido desde o primeiro dia de prática."
    ],
    type: "list"
  },
  {
    title: "Resumo Comparativo",
    points: [
      "Objetivo Principal: Altinha (Manter a bola no ar) vs Futevôlei (Fazer a bola cair na quadra rival).",
      "Dinâmica de Jogo: Altinha (100% Cooperativa) vs Futevôlei (Altamente Competitiva).",
      "Estrutura & Espaço: Altinha (Roda livre em qualquer lugar) vs Futevôlei (Quadra demarcada com rede de 2,20m).",
      "Limite de Toques: Altinha (Ilimitados dentro da roda) vs Futevôlei (Máximo de 3 toques por equipe)."
    ],
    type: "list"
  },
  {
    title: "Fim de Papo!",
    subtitle: "A teoria está feita. Dúvidas antes do aquecimento?",
    content: "Partiu Areia! ☀️",
    type: "text",
    theme: "hero"
  }
];

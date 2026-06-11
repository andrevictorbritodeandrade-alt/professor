
export interface AulaPlan {
    data: string;
    tri: string;
    modulo: string;
    titulo: string;
    desc: string;
    trabalho?: 'passar' | 'recolher' | null;
    status?: string;
    destaque?: boolean;
    resumo: string;
}

const COMMON_RESUMOS: Record<string, string> = {
    'Futevôlei': `🎯 **Objetivo da Aula:** Apresentar a realidade das aulas (falta de quadra) e introduzir a história e técnica do futevôlei.\n\n🗣️ **Dinâmica:**\n• Conversa franca sobre o uso da sala de aula como espaço de esporte tático.\n• Slides sobre as regras básicas do Futevôlei.\n\n📜 **Reflexão:** Como adaptar um esporte de praia para o contexto urbano da Baixada?`,
    'Futepátio': `🎯 **Objetivo da Aula:** Desenvolver coordenação e controle de bola em espaço reduzido.\n\n🗣️ **Prática:**\n• Montagem de "mesas" no pátio ou uso de bancos.\n• Jogo 1x1 ou 2x2 com regras de controle (no máximo 3 toques).\n\n📜 **Reflexão:** A criatividade como ferramenta de resistência à falta de infraestrutura escolar.`,
    'Mancala': `🎯 **Objetivo da Aula:** Estudo de matrizes civilizatórias africanas através do jogo.\n\n🗣️ **Dinâmica:**\n• Explicar que Mancala não é sobre guerra (como xadrez), mas sobre agricultura e distribuição.\n• Jogar em duplas nas carteiras com sementes/feijões.\n\n📜 **Amparo Legal:** Cumprimento da Lei 10.639/03.`,
    'Várzea': `🎯 **Objetivo da Aula:** Analisar a história social do futebol no Brasil.\n\n🗣️ **Dinâmica:**\n• Debate sobre a elitização do futebol (Vasco vs Clubes aristocráticos).\n• Torneio de Futebol de Botão adaptado com tampinhas.\n\n📜 **Reflexão:** Por que o futebol da várzea é o berço da nossa cultura corporal?`,
    'E-Sports': `🎯 **Objetivo da Aula:** Debater o impacto das telas na saúde física.\n\n🗣️ **Dinâmica:**\n• Debate sobre o lucro das desenvolvedoras de games.\n• Prática: "Stop" (Adedonha) Esportivo no caderno.\n\n📜 **Reflexão:** O esporte como ferramenta de desconexão digital.`,
    'Onça': `🎯 **Objetivo da Aula:** Valorizar a cultura Bororo/Guarani.\n\n🗣️ **Dinâmica:**\n• Desenhar o tabuleiro no caderno.\n• Jogo de estratégia: 1 onça vs 14 cachorros.\n\n📜 **Amparo Legal:** Cumprimento da Lei 11.645/08.`,
    'Tabuleiros': `🎯 **Objetivo da Aula:** Desenvolver raciocínio tático e paciência.\n\n🗣️ **Dinâmica:**\n• Torneio livre em sala.\n• Professor como instrutor orientador.`,
    'Paralímpico': `🎯 **Objetivo da Aula:** Empatia e adaptação física.\n\n🗣️ **Dinâmica:**\n• Vôlei de Balão Sentado na sala.\n• Debate sobre barreiras arquitetônicas na Baixada.`,
    'Padrões': `🎯 **Objetivo da Aula:** Crítica aos padrões de beleza irreais.\n\n🗣️ **Dinâmica:**\n• Jogo "Quem sou eu?" com personalidades negras/indígenas.\n• Debate sobre racismo estético.`,
    'Lutas': `🎯 **Objetivo da Aula:** Diferenciar Luta de Briga.\n\n🗣️ **Dinâmica:**\n• Vídeo/Debate sobre a criminalização da Capoeira.\n• Vivência: "Briga de Galo" segura.\n\n⚠️ **TRABALHO:** Construção do tabuleiro de Shisima ou Mancala.`,
    'Precisão': `🎯 **Objetivo da Aula:** Foco e controle motor.\n\n🗣️ **Dinâmica:**\n• Arremesso de precisão em lixeiras com distâncias variadas.`,
    'Ilha': `🎯 **Objetivo da Aula:** Fomentar o trabalho em equipe.\n\n🗣️ **Dinâmica:**\n• Jogo "A Ilha" na sala (jornais no chão).`,
    'Shisima': `🎯 **Objetivo da Aula:** Praticar a lógica matemática queniana.\n\n🗣️ **Dinâmica:**\n• Organizar torneio com tabuleiros recicláveis.\n\n📥 **TRABALHO:** Recolher os tabuleiros.`,
    'Postura': `🎯 **Objetivo da Aula:** Prevenção de dores e vícios posturais.\n\n🗣️ **Dinâmica:**\n• Guia de ginástica laboral na cadeira escolar.`,
    'Olimpíadas': `🎯 **Objetivo da Aula:** Entender que o esporte não é neutro.\n\n🗣️ **Dinâmica:**\n• Jogo da Forca com termos de ética e política.`,
    'Dominó': `🎯 **Objetivo da Aula:** Tradição cultural e probabilidade básica.\n\n🗣️ **Dinâmica:**\n• Torneio de Dominó em groups.`,
    'Apartheid': `🎯 **Objetivo da Aula:** Estudar o esporte como ferramenta política.\n\n🗣️ **Dinâmica:**\n• Debate sobre o banimento da África do Sul das Olimpíadas.\n\n⚠️ **TRABALHO:** Pesquisa: Atletas Negros Contra o Racismo.`,
    'Música': `🎯 **Objetivo da Aula:** Conectar ritmo e história.\n\n🗣️ **Dinâmica:**\n• Percussão corporal rítmica nas carteiras.`,
    'Cidade': `🎯 **Objetivo da Aula:** Conectar geografia urbana e lazer.\n\n🗣️ **Dinâmica:**\n• Debate: Por que faltam praças seguras na periferia?\n\n📥 **TRABALHO:** Entrega da pesquisa sobre Atletas Negros.`,
    'Avaliação': `🎯 **Objetivo da Aula:** Sistematização do conhecimento anual.\n\n🗣️ **Dinâmica:**\n• Aplicação de avaliação teórica e tempo livre.`,
    'Final': `🎯 **Objetivo da Aula:** Finalizar o ciclo letivo com reflexão coletiva.`
};

export const PE_PLAN: Record<string, AulaPlan[]> = {
    '8ano': [
        { 
            data: '18/05', tri: '1º Tri', modulo: 'Esportes de Rede', titulo: 'Teoria: Futevôlei', desc: 'Introdução ao futevôlei (Até slide 4 no quadro).', 
            resumo: `🎯 **Objetivo da Aula:** Introduzir a modalidade em sala.\n\n🗣️ **Dinâmica:**\n• Apresentação do esporte e história.\n• Passar conteúdo teórico no quadro até o **Slide 4**.\n\n📜 **Reflexão:** Como as regras do futevôlei se assemelham ao vôlei tradicional?` 
        },
        { 
            data: '25/05', tri: '2º Tri', modulo: 'Esportes de Rede', titulo: 'Teoria: Futevôlei (Cont.)', desc: 'Continuidade teórica (Até slide 7 no quadro).', 
            resumo: `🎯 **Objetivo da Aula:** Aprofundar o conhecimento tático.\n\n🗣️ **Dinâmica:**\n• Retomada das regras.\n• Continuidade do conteúdo no quadro até o **Slide 7**.\n\n📜 **Reflexão:** A importância do posicionamento em esportes de rede.` 
        },
        { 
            data: '01/06', tri: '2º Tri', modulo: 'Jogos de Salão', titulo: 'Jogos e Concentração', desc: 'Introdução de jogos de tabuleiro, cartas e mentais.', 
            trabalho: 'passar',
            resumo: `🎯 **Objetivo da Aula:** Estimular o raciocínio lógico e concentração.\n\n🗣️ **Dinâmica:**\n• Vivência prática em sala: Uno, Pega Varetas, Dominó, Ludo e Dama.\n\n⚠️ **TRABALHO TRIMESTRAL:** "Apresentar e reproduzir em sala, jogos de tabuleiro, cartas, mentais ou de concentração de outros países/continentes". Grupos de até 5 pessoas.` 
        },
        { 
            data: '08/06', tri: '2º Tri', modulo: 'Jogos de Salão', titulo: 'Teoria: Jogos de Tabuleiro', desc: 'A importância desses jogos na Education Física (Slides).', 
            resumo: `🎯 **Objetivo da Aula:** Fundamentar o uso de jogos de salão pedagogicamente.\n\n🗣️ **Dinâmica:**\n• Aula teórica com slides.\n• Por que jogos de cartas e tabuleiro estão na Ed. Física? (Mental e Motor).\n\n📜 **Reflexão:** O esporte vai além do esforço físico braçal.` 
        },
        { 
            data: '15/06', tri: '2º Tri', modulo: 'Jogos de Tabuleiro', titulo: 'Jogos do Mundo', desc: 'Aula do Professor sobre jogos de tabuleiro de outros países.', 
            resumo: `🎯 **Objetivo da Aula:** Ampliar o repertório cultural sobre jogos de tabuleiro.\n\n🗣️ **Dinâmica:**\n• Apresentação de jogos internacionais e suas origens.\n• Preparação para as apresentações dos grupos na próxima aula.` 
        },
        { 
            data: '22/06', tri: '2º Tri', modulo: 'Trabalho Acadêmico', titulo: 'Apresentação: Jogos do Mundo', desc: 'Início das apresentações em grupo (Aprox. 3 grupos).', 
            destaque: true,
            resumo: `🎯 **Objetivo da Aula:** Avaliar a pesquisa e reprodução dos jogos internacionais.\n\n🗣️ **Dinâmica:**\n• Apresentação e experimentação dos jogos propostos pelos 3 primeiros grupos.\n\n📜 **Reflexão:** A diversidade cultural através dos jogos tradicionais.` 
        },
        { 
            data: '29/06', tri: '2º Tri', modulo: 'Trabalho Acadêmico', titulo: 'Apresentação: Jogos do Mundo (Fin.)', desc: 'Restante da apresentação dos grupos.', 
            resumo: `🎯 **Objetivo da Aula:** Conclusão das apresentações trimestrais.\n\n🗣️ **Dinâmica:**\n• Apresentação dos grupos restantes.\n• Coleta das reflexões escritas sobre o trabalho.\n\n📥 **TRABALHO:** Recolher o roteiro dos jogos apresentados.` 
        },
        { 
            data: '06/07', tri: '2º Tri', modulo: 'Competição', titulo: 'Torneio de Dama', desc: 'Competição rápida em estilo mata-mata em sala.', 
            resumo: `🎯 **Objetivo da Aula:** Aplicar táticas de jogo em ambiente competitivo saudável.\n\n🗣️ **Dinâmica:**\n• Torneio de Dama "Mata-mata" realizado inteiramente no espaço da sala de aula.\n\n📜 **Reflexão:** Lidar com a vitória e a derrota em jogos estratégicos.` 
        },
        { data: '27/07', tri: '2º Tri', modulo: 'Inclusão', titulo: 'Esporte Paralímpico', desc: 'Acessibilidade e Vôlei Sentado.', resumo: COMMON_RESUMOS['Paralímpico'] },
        { data: '03/08', tri: '2º Tri', modulo: 'Inclusão', titulo: 'Teoria: Paralimpismo', desc: 'Aprofundamento sobre esportes adaptados (Teoria).', resumo: `🎯 **Objetivo da Aula:** Compreender a história e as classificações funcionais do esporte paralímpico.\n\n🗣️ **Dinâmica:**\n• Aula expositiva em sala sobre as categorias paralímpicas.\n• Debate sobre acessibilidade no esporte de alto rendimento.\n\n📜 **Reflexão:** O esporte adaptado como ferramenta de inclusão e superação de barreiras.` },
        { data: '10/08', tri: '2º Tri', modulo: 'Sociedade', titulo: 'Mídias e Padrões', desc: 'Racismo estético e padrões de beleza.', resumo: `🎯 **Objetivo da Aula:** Crítica aos padrões de beleza irreais e racismo estético.\n\n🗣️ **Dinâmica:**\n• Debate sobre a representação do corpo na mídia.\n• Atividade de identificação de padrões em propagandas.\n\n📜 **Reflexão:** Como a mídia influência nossa percepção sobre o próprio corpo?` },
        { data: '17/08', tri: '2º Tri', modulo: 'Lutas', titulo: 'Lutas do Brasil', desc: 'Resistência através da Capoeira e lutas indígenas.', resumo: `🎯 **Objetivo da Aula:** Estudar as lutas como ferramentas de libertação no Brasil.\n\n🗣️ **Dinâmica:**\n• Exibição de vídeos sobre a Capoeira e a Luta Marajoara.\n• Debate sobre a proibição histórica da Capoeira.\n\n📜 **Reflexão:** De que forma a luta preserva a identidade de um povo?` },
        { data: '24/08', tri: '2º Tri', modulo: 'Avaliação', titulo: 'Avaliação Teórica', desc: 'Aplicação da prova formal do 2º trimestre.', resumo: `🎯 **Objetivo da Aula:** Sistematização e verificação de aprendizagem do trimestre.\n\n🗣️ **Dinâmica:**\n• Aplicação individual de prova escrita abrangendo Futevôlei, Jogos de Tabuleiro e Inclusão.` },
        { data: '31/08', tri: '2º Tri', modulo: 'Recuperação', titulo: '2ª Chamada / Recuperação', desc: 'Oportunidade para alunos ausentes e reforço de notas.', resumo: `🎯 **Objetivo da Aula:** Garantir o direito à avaliação e reforçar conteúdos críticos.\n\n🗣️ **Dinâmica:**\n• Realização de provas substitutivas.\n• Atendimento individual para recuperação paralela.` },
        { 
            data: '14/09', tri: '3º Tri', modulo: 'Lutas', titulo: 'Lutas do Mundo', desc: 'Origens e filosofias das artes marciais globais.', 
            resumo: `🎯 **Objetivo da Aula:** Conhecer a diversidade das lutas mundiais.\n\n🗣️ **Dinâmica:**\n• Apresentação das bases do Judô, Karatê e Muay Thai.\n• Comparação entre os sistemas de honra e disciplina.\n\n📜 **Reflexão:** O que diferencia uma arte marcial de uma briga de rua?` 
        },
        { 
            data: '21/09', tri: '3º Tri', modulo: 'Atividade Prática', titulo: 'Pega-Pé (Inclusivo)', desc: 'Aula prática de agilidade e estratégia em sala/pátio adaptado.', 
            resumo: `🎯 **Objetivo da Aula:** Desenvolver reflexo e consciência corporal.\n\n🗣️ **Dinâmica:**\n• Jogo de perseguição adaptado para o espaço da sala de aula (sentados ou em movimento controlado).` 
        },
        { 
            data: '28/09', tri: '3º Tri', modulo: 'Geopolítica', titulo: 'Olimpíadas e Política', desc: 'Fatos históricos e as Olimpíadas Modernas.', 
            trabalho: 'passar',
            resumo: `🎯 **Objetivo da Aula:** Analisar o esporte como palco de manifestações políticas.\n\n⚠\uFE0F **TRABALHO:** Apresentar fatos históricos importantes durante as Olimpíadas Modernas. Escolher 1 fato e apresentar para a turma (Grupos de até 5 pessoas).` 
        },
        { 
            data: '05/10', tri: '3º Tri', modulo: 'Cinema/História', titulo: 'Filme: Invictus', desc: 'Cine-debate sobre Mandela e o Rugby.', 
            resumo: `🎯 **Objetivo da Aula:** Compreender o papel do esporte na unificação de uma nação pós-conflito.\n\n🗣️ **Dinâmica:**\n• Exibição de trechos selecionados do filme Invictus.\n• Início da discussão sobre o contexto sul-africano.` 
        },
        { 
            data: '19/10', tri: '3º Tri', modulo: 'Geopolítica', titulo: 'Apartheid e Segregação', desc: 'Regime do apartheid e influência no esporte.', 
            resumo: `🎯 **Objetivo da Aula:** Discutir sistemas de segregação e resistência esportiva.\n\n🗣️ **Dinâmica:**\n• Debate sobre modelos de segregação mundiais.\n• Como o esporte ajudou a derrubar o Apartheid?` 
        },
        { 
            data: '26/10', tri: '3º Tri', modulo: 'Trabalho Acadêmico', titulo: 'Apresentação: Fatos Olímpicos', desc: 'Início das apresentações dos grupos (3 primeiros).', 
            destaque: true,
            resumo: `🎯 **Objetivo da Aula:** Avaliar a pesquisa sobre o histórico político das Olimpíadas.\n\n🗣️ **Dinâmica:**\n• Apresentação dos 3 primeiros grupos.\n• Debate após cada exposição.` 
        },
        { 
            data: '09/11', tri: '3º Tri', modulo: 'Trabalho Acadêmico', titulo: 'Apresentação: Fatos Olímpicos (Fin.)', desc: 'Continuidade das apresentações dos trabalhos.', 
            resumo: `🎯 **Objetivo da Aula:** Conclusão do seminário sobre história olímpica.\n\n🗣️ **Dinâmica:**\n• Apresentação dos grupos restantes.\n• Fechamento dos conceitos de geopolítica esportiva.` 
        }
    ],
    'ap': [
        { 
            data: '18/05', tri: '1º Tri', modulo: 'Esportes de Rede', titulo: 'Futevôlei: Teoria (Aula 1/2 - TEÓRICA)', desc: 'Conceitos gerais de Futevôlei no quadro (Até slide 4).', 
            resumo: `🎯 **Objetivo da Aula:** Introduzir a modalidade em sala.\n\n🗣️ **Dinâmica:**\n• Apresentação do esporte e história.\n• Conteúdo no quadro até o **Slide 4**.\n\n📜 **Reflexão:** Como se assemelha ao vôlei?` 
        },
        { 
            data: '25/05', tri: '2º Tri', modulo: 'Esportes de Rede', titulo: 'Futevôlei: Prática (Aula 2/2 - PRÁTICA)', desc: 'Prática de passes de perna e cabeça na quadra/pátio.', 
            resumo: `🎯 **Objetivo da Aula:** Vivência motora prática.\n\n🗣️ **Dinâmica:**\n• Prática na quadra de vôlei com passes adaptados empurrando a bola com pé e cabeça.` 
        },
        { 
            data: '01/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Regras Gerais (Aula 1/4 - TEÓRICA)', desc: 'Dimensões da quadra, limites de posse e funções táticas no time.', 
            resumo: `🎯 **Objetivo da Aula:** Conhecer regras fundamentais do Futsal.\n\n🗣️ **Dinâmica (Quadro):**\n• Desenhar a quadra, áreas de goleiro e posições escolares (goleiro, fixo, alas, pivô).` 
        },
        { 
            data: '08/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Condução e Domínio (Aula 2/4 - PRÁTICA)', desc: 'Treino prático de passes e controle de bola individual na quadra.', 
            resumo: `🎯 **Objetivo da Aula:** Desenvolver condução de bola coordenada.\n\n🗣️ **Dinâmica (Prática):**\n• Drills de controle e passes em duplas na quadra.` 
        },
        { 
            data: '15/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Sistemas de Jogo (Aula 3/4 - MEIO A MEIO)', desc: 'Sistemas táticos fáceis (2-2 e 3-1) na sala de aula e drills em quadra. Passagem do Trabalho.', 
            trabalho: 'passar',
            resumo: `🎯 **Objetivo da Aula:** Compreender sistemas posicionais e orientar sobre o Trabalho.\n\n🗣️ **Dinâmica (Quadro/Prática):**\n• Explicação simples dos sistemas 2-2 e 3-1.\n• Passes e chutes em quadra com posicionamento em triângulo.\n\n⚠️ **TRABALHO DE PESQUISA (Valor: 3 pontos) - Copiar do Quadro:**\n\n📋 **O QUE FAZER:** Pesquisa **teórica** individual. Escolha um esporte de quadra ou campo (Futsal, Basquete, Handebol ou Vôlei).\n\n🔍 **ONDE PESQUISAR:** No Google, livros ou sites esportivos oficiais.\n\n📑 **ESTRUTURA OBRIGATÓRIA:**\n1. **Capa:** Nome do CIEP, Educação Física, seu nome, número de chamada, turma (AP) e ano (2026).\n2. **Introdução:** Quem criou o esporte, onde e em que ano nasceu.\n3. **Desenvolvimento:**\n   - Desenhar a quadra/campo e colocar os tamanhos oficiais (metros).\n   - Escrever as **3 regras principais** do esporte.\n   - Listar os principais movimentos (ex: passe, drible, arremesso).\n4. **Referências:** Escrever quais sites ou livros usou.` 
        },
        { 
            data: '22/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Jogo Coletivo (Aula 4/4 - PRÁTICA)', desc: 'Jogo livre focado em passes, conduta social ética e controle de turma.', 
            resumo: `🎯 **Objetivo da Aula:** Aplicar as regras em cooperação de equipe.\n\n🗣️ **Dinâmica (Prática):**\n• Jogo escolar de futsal em quadra focado no controle de comportamento.` 
        },
        { 
            data: '29/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Regras de Rotação (Aula 1/4 - TEÓRICA)', desc: 'Estudo das posições da quadra (1 a 6) e regras de rodízio e pontuação.', 
            resumo: `🎯 **Objetivo da Aula:** Compreender o sentido horário do rodízio no Voleibol.\n\n🗣️ **Dinâmica (Quadro):**\n• Desenho das posições da quadra de vôlei e fluxo de rodízio.` 
        },
        { 
            data: '06/07', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Recepção e Toque (Aula 2/4 - PRÁTICA)', desc: 'Base corporal de recepção na quadra: manchete e toque de dedos.', 
            resumo: `🎯 **Objetivo da Aula:** Desenvolver recepção estável.\n\n🗣️ **Dinâmica (Prática):**\n• Exercício prático de manchete de dedão e passe de toque.` 
        },
        { 
            data: '27/07', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Sistemas de Jogo (Aula 3/4 - MEIO A MEIO)', desc: 'Mecânica do sistema 6x0 em sala e prática de posse em quadra. Recolhimento do Trabalho.', 
            trabalho: 'recolher',
            resumo: `🎯 **Objetivo da Aula:** Assimilar movimentação tática simples e recolher trabalhos escolares.\n\n🗣️ **Dinâmica (Quadro/Prática):**\n• Explicação rápida do sistema simples sem especialização (6x0).\n• Jogo de voleibol facilitado com controle de posse.\n\n📥 **TRABALHO:** Recolher a Pesquisa Escolar (3 pts) sobre Esportes de Campo e Quadra.` 
        },
        { 
            data: '03/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Mini-Torneio (Aula 4/4 - PRÁTICA)', desc: 'Partidas simplificadas focadas em passes coletivos da equipe.', 
            resumo: `🎯 **Objetivo da Aula:** Fixar regras em formato competitivo integrado.\n\n🗣️ **Dinâmica (Prática):**\n• Mini-torneio de voleibol adaptado com bola macia.` 
        },
        { 
            data: '10/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Basquete/Handebol: Regras Rápidas (Aula 1/2 - TEÓRICA)', desc: 'Regras de drible e condução do basquete e área de goleiro do handebol.', 
            resumo: `🎯 **Objetivo da Aula:** Entender regras estruturais das quadras de basquete e handebol.\n\n🗣️ **Dinâmica (Quadro):**\n• Estudo de infrações (andada, duplo drible no basquete, invasão de área no handebol).` 
        },
        { 
            data: '17/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Basquete/Handebol: Prática (Aula 2/2 - PRÁTICA)', desc: 'Passes de peito, arremesso ao cesto e passes táticos escolares.', 
            resumo: `🎯 **Objetivo da Aula:** Vivenciar arremessos e recepções de bola.\n\n🗣️ **Dinâmica (Prática):**\n• Drills de finalização em passes em diagonal.` 
        },
        { 
            data: '24/08', tri: '2º Tri', modulo: 'Avaliação', titulo: 'Avaliação Teórica: Esportes de Quadra (SALA - sem prática)', desc: 'Aplicação da avaliação escrita individual na sala de aula.', 
            resumo: `🎯 **Objetivo da Aula:** Sistematizar saberes cognitivos de Futsal, Vôlei e Basquetebol.\n\n🗣️ **Dinâmica:**\n• Aplicação de prova escrita individual em sala.` 
        },
        { 
            data: '31/08', tri: '2º Tri', modulo: 'Recuperação', titulo: 'Recuperação e Segunda Chamada (SALA - sem prática)', desc: 'Oportunidade para reposição de notas e revisão de diário.', 
            resumo: `🎯 **Objetivo da Aula:** Oferecer recuperação paralela de notas críticas.\n\n🗣️ **Dinâmica:**\n• Atendimento individual focado e repetição de avaliações.` 
        },
        { 
            data: '14/09', tri: '3º Tri', modulo: 'Esportes de Campo', titulo: 'Futebol: Limites e Regras (Aula 1/4 - TEÓRICA)', desc: 'Marcações de campo e regras básicas (Impedimento tático de forma fácil).', 
            resumo: `🎯 **Objetivo da Aula:** Compreender regras conceituais do futebol de campo aberto.\n\n🗣️ **Dinâmica (Quadro):**\n• Linha de impedimento explicada de forma desenhada no quadro.` 
        },
        { 
            data: '21/09', tri: '3º Tri', modulo: 'Esportes de Campo', titulo: 'Futebol: Passes e Domínio (Aula 2/4 - PRÁTICA)', desc: 'Prática de domínio de sola/peito e precisão de passes no pátio/campo.', 
            resumo: `🎯 **Objetivo da Aula:** Controlar a bola em campos abertos ou pátios amplos.\n\n🗣️ **Dinâmica (Prática):**\n• Roda de bobinho e drills de controle motor de bola pesada.` 
        },
        { 
            data: '28/09', tri: '3º Tri', modulo: 'Esportes de Campo', titulo: 'Futebol: Desenhos Táticos (Aula 3/4 - MEIO A MEIO)', desc: 'Desenhos clássicos de equipes (4-4-2 e 4-3-3). Passagem de Trabalho.', 
            trabalho: 'passar',
            resumo: `🎯 **Objetivo da Aula:** Compreender formações clássicas no quadro e passar Trabalho.\n\n🗣️ **Dinâmica (Quadro/Prática):**\n• Desenho das táticas 4-4-2 e 4-3-3 no quadro e jogo de posicionamento tático fixo em quadra.\n\n⚠️ **TRABALHO TRIMESTRAL (Valor: 3 pontos) - Copiar do Quadro:**\n\n📋 **O QUE FAZER:** Desenho de Mapeamento Tático Simples. Fazer individual no caderno ou papel avulso.\n\n📑 **ESTRUTURA TÉCNICA:**\n1. **Capa:** Nome, número, turma e matéria (Educação Física).\n2. **Desenho:** Desenhar um campo de futebol completo com as marcações de linhas.\n3. **Táticas:** Desenhar o seu time posicionado em duas táticas diferentes (ex: 4-4-2 e 4-3-3), usando bolinhas com números para representar os jogadores.\n4. **Explicação:** Escrever em 1 ou 2 linhas qual dessas táticas você acha mais defensiva e qual é mais ofensiva.` 
        },
        { 
            data: '05/10', tri: '3º Tri', modulo: 'Esportes de Campo', titulo: 'Futebol: Jogo Coletivo (Aula 4/4 - PRÁTICA)', desc: 'Práticas de jogo amplo, passes distribuídos e esporte de lazer comunitário.', 
            resumo: `🎯 **Objetivo da Aula:** Aplicar regras integradas em jogo tático.\n\n🗣️ **Dinâmica (Prática):**\n• Jogo coletivo no pátio/campo focando em passes contínuos.` 
        },
        { 
            data: '19/10', tri: '3º Tri', modulo: 'Inclusão Desportiva', titulo: 'Inclusão: Esporte Paralímpico (Aula 1/4 - TEÓRICA)', desc: 'Acessibilidade na Educação Física e regras de inclusão.', 
            resumo: `🎯 **Objetivo da Aula:** Entender o conceito de paradesporto e barreira física.\n\n🗣️ **Dinâmica (Quadro):**\n• Debate conceitual sobre limitações de mobilidade e a inclusão social no esporte.` 
        },
        { 
            data: '26/10', tri: '3º Tri', modulo: 'Inclusão Desportiva', titulo: 'Inclusão: Vôlei Sentado (Aula 2/4 - PRÁTICA)', desc: 'Vivência de locomoção com glúteos tocando o chão de forma cooperativa.', 
            resumo: `🎯 **Objetivo da Aula:** Exercitar o tronco superior em deslocamento sentado.\n\n🗣️ **Dinâmica (Prática):**\n• Jogo de voleibol facilitado com rede baixa onde os alunos jogam sentados.` 
        },
        { 
            data: '09/11', tri: '3º Tri', modulo: 'Inclusão Desportiva', titulo: 'Inclusão: Futebol de 5 (Aula 3/4 - MEIO A MEIO)', desc: 'Compreensão de sinalizações auditivas e guias silenciosos. Recolhimento de Trabalho.', 
            trabalho: 'recolher',
            resumo: `🎯 **Objetivo da Aula:** Desenvolver atenção sensorial auditiva e recolher trabalhos.\n\n🗣️ **Dinâmica (Quadro/Prática):**\n• Conceito do guia e bola de guizo.\n• Drills de passes com vendas nos olhos e guia verbal.\n\n📥 **TRABALHO:** Recolher o Trabalho de Mapeamento Tático Simples (3 pts).` 
        },
        { 
            data: '16/11', tri: '3º Tri', modulo: 'Inclusão Desportiva', titulo: 'Inclusão: Esportes Adaptados (Aula 4/4 - PRÁTICA)', desc: 'Basquete adaptado e jogos corporais coordenados finais.', 
            resumo: `🎯 **Objetivo da Aula:** Fechamento motor prático integrado.\n\n🗣️ **Dinâmica (Prática):**\n• Circuitos divertidos de arremessos em nível integrado.` 
        },
        { 
            data: '23/11', tri: '3º Tri', modulo: 'Avaliação', titulo: 'Avaliação Teórica: Esportes de Campo (SALA - sem prática)', desc: 'Aplicação da avaliação escrita conceitual em sala de aula.', 
            resumo: `🎯 **Objetivo da Aula:** Sistematização de saberes do 3º período.\n\n🗣️ **Dinâmica:**\n• Prova conceitual sobre futebol de várzea e esportes adaptados.` 
        },
        { 
            data: '30/11', tri: '3º Tri', modulo: 'Recuperação', titulo: 'Recuperação Trimestral Final (SALA - sem prática)', desc: 'Aplicação de provas pendentes e fechamento anual.', 
            resumo: `🎯 **Objetivo da Aula:** Consolidar médias e apoiar alunos com dúvidas gerais.\n\n🗣️ **Dinâmica:**\n• Entrega de notas finais escolares em sala.` 
        }
    ],
    'ap_sexta': [
        { 
            data: '15/05', tri: '1º Tri', modulo: 'Esportes de Rede', titulo: 'Futevôlei: Teoria (Aula 1/2 - TEÓRICA)', desc: 'Regras de pontos e conceitos básicos (Até slide 4 no quadro).', 
            resumo: `🎯 **Objetivo da Aula:** Introduzir a modalidade em sala.\n\n🗣️ **Dinâmica:**\n• Apresentação de slides técnicos no quadro.` 
        },
        { 
            data: '22/05', tri: '2º Tri', modulo: 'Esportes de Rede', titulo: 'Futevôlei: Prática (Aula 2/2 - PRÁTICA)', desc: 'Vivência técnica de recepção com pernas e passes rápidos.', 
            resumo: `🎯 **Objetivo da Aula:** Desenvolver movimentos de recepção tática na quadra.` 
        },
        { 
            data: '12/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Regras Gerais (Aula 1/4 - TEÓRICA)', desc: 'Funções de goleiro, fixo, alas e pivô no futsal. Passagem do Trabalho.', 
            trabalho: 'passar',
            resumo: `🎯 **Objetivo da Aula:** Compreender as posições e passar instrução tática do trabalho.\n\n🗣️ **Dinâmica (Quadro):**\n• Desenho das áreas de meta oficiais e as funções de cada atleta.\n\n⚠️ **TRABALHO DE PESQUISA (Valor: 3 pontos) - Copiar do Quadro:**\n\n📋 **O QUE FAZER:** Pesquisa **teórica** individual. Escolha um esporte de quadra ou campo (Futsal, Basquete, Handebol ou Vôlei).\n\n🔍 **ONDE PESQUISAR:** No Google, livros ou sites esportivos oficiais.\n\n📑 **ESTRUTURA OBRIGATÓRIA:**\n1. **Capa:** Nome do CIEP, Educação Física, seu nome, número de chamada, com turma e ano (2026).\n2. **Introdução:** Quem criou o esporte, onde e em que ano nasceu.\n3. **Desenvolvimento:**\n   - Desenhar a quadra/campo e colocar os tamanhos oficiais (metros).\n   - Escrever as **3 regras principais** do esporte.\n   - Listar os principais movimentos (ex: passe, drible, arremesso).\n4. **Referências:** Escrever quais sites ou livros usou.` 
        },
        { 
            data: '19/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Passes e Controle (Aula 2/4 - PRÁTICA)', desc: 'Controle de passes de bola rápidos e condução de equipe em rodízio.', 
            resumo: `🎯 **Objetivo da Aula:** Praticar fundamentos coordenados na quadra.\n\n🗣️ **Dinâmica (Prática):**\n• Treinos de passes curtos sob pressão em duplas na quadra.` 
        },
        { 
            data: '26/06', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Rotações de Linha (Aula 3/4 - MEIO A MEIO)', desc: 'Esquema tático posicional 2-2 e passes táticos em triângulo.', 
            resumo: `🎯 **Objetivo da Aula:** Conhecer as posições de retaguarda e ataque em quadra.` 
        },
        { 
            data: '03/07', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Futsal: Partidas e Jogo Técnico (Aula 4/4 - PRÁTICA)', desc: 'Jogo livre escolar de futsal e controle de turma. Recolhimento do Trabalho.', 
            trabalho: 'recolher',
            resumo: `🎯 **Objetivo da Aula:** Praticar o espírito esportivo e recolher trabalhos escolares.\n\n🗣️ **Dinâmica (Prática):**\n• Jogo tático final focado em disciplina e espírito coletivo.\n\n📥 **TRABALHO:** Recolher a Pesquisa Escolar (3 pts) sobre Esportes de Campo e Quadra.` 
        },
        { 
            data: '31/07', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Regras de Quadra (Aula 1/4 - TEÓRICA)', desc: 'Sentido do rodízio escolar (1 a 6) e limites de 3 toques na bola.', 
            resumo: `🎯 **Objetivo da Aula:** Dominar o andamento das regras de quadra no Voleibol.\n\n🗣️ **Dinâmica (Quadro):**\n• Desenho visual dos postes da rede e o rodízio.` 
        },
        { 
            data: '07/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Passe de manchete (Aula 2/4 - PRÁTICA)', desc: 'Fundamento técnico da manchete correta e controle de passes direcionados.', 
            resumo: `🎯 **Objetivo da Aula:** Dominar a manchete sem errar a precisão corporal.` 
        },
        { 
            data: '14/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Saques e Levantamento (Aula 3/4 - MEIO A MEIO)', desc: 'Mecânica do saque por baixo em sala e treino tático coordenado na quadra.', 
            resumo: `🎯 **Objetivo da Aula:** Praticar saques fáceis sobre a rede posicionada.` 
        },
        { 
            data: '21/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Voleibol: Jogos de Equipe (Aula 4/4 - PRÁTICA)', desc: 'Partidas com passe obrigatório e mini campeonato de voleibol.', 
            resumo: `🎯 **Objetivo da Aula:** Integrar passes e rodízio em situação real de jogo escolar.` 
        },
        { 
            data: '28/08', tri: '2º Tri', modulo: 'Esportes de Campo e Quadra', titulo: 'Basquete/Handebol: Prática Rápida (Aula 1/1 - MEIO A MEIO)', desc: 'Fundamentos expressos corporais rápidos de finalização na tabela/gol.', 
            resumo: `🎯 **Objetivo da Aula:** Conhecer dinâmicas de basquete e handebol com controle de drible.` 
        },
        { 
            data: '04/09', tri: '2º Tri', modulo: 'Recuperação', titulo: 'Recuperação e Segunda Chamada (SALA - sem prática)', desc: 'Reposição de prova final presencial em sala de aula.', 
            resumo: `🎯 **Objetivo da Aula:** Sanar pendências e fechar as médias do segundo período.\n\n🗣️ **Dinâmica:**\n• Avaliações individualizadas na sala.` 
        },
        { 
            data: '11/09', tri: '3º Tri', modulo: 'Esportes de Campo', titulo: 'Futebol: Regras Escolares (Aula 1/4 - TEÓRICA)', desc: 'Funcionamento de faltas, saídas e barreira tática de impedimento fácil.', 
            resumo: `🎯 **Objetivo da Aula:** Conhecer regras táticas fundamentais do futebol.\n\n🗣️ **Dinâmica (Quadro):**\n• Desenho das áreas de escanteio e a linha tática de impedimento.` 
        },
        { 
            data: '18/09', tri: '3º Tri', modulo: 'Esportes de Campo', titulo: 'Futebol: Passes Direcionados (Aula 2/4 - PRÁTICA)', desc: 'Domínio de sola e condução coordenada com parte interna do pé no pátio.', 
            resumo: `🎯 **Objetivo da Aula:** Reforçar habilidades motoras básicas de controle de bola.` 
        },
        { 
            data: '25/09', tri: '3º Tri', modulo: 'Esportes de Campo', titulo: 'Futebol: Posicionamentos (Aula 3/4 - MEIO A MEIO)', desc: 'Mapeamento das táticas 4-4-2 e 4-3-3 na teoria e na prática. Passagem de Trabalho.', 
            trabalho: 'passar',
            resumo: `🎯 **Objetivo da Aula:** Analisar esquemas com bolinhas metálicas no quadro e orientar Trabalho.\n\n🗣️ **Dinâmica (Quadro/Prática):**\n• Desenho das posições de campo 4-4-2 e 4-3-3 no quadro e treino de ataque tático no pátio.\n\n⚠️ **TRABALHO TRIMESTRAL (Valor: 3 pontos) - Copiar do Quadro:**\n\n📋 **O QUE FAZER:** Desenho de Mapeamento Tático Simples. Fazer individual no caderno ou papel avulso.\n\n📑 **ESTRUTURA TÉCNICA:**\n1. **Capa:** Nome, número, turma e matéria (Educação Física).\n2. **Desenho:** Desenhar um campo de futebol completo com as marcações de linhas.\n3. **Táticas:** Desenhar o seu time posicionado em duas táticas diferentes (ex: 4-4-2 e 4-3-3), usando bolinhas com números para representar os jogadores.\n4. **Explicação:** Escrever em 1 ou 2 linhas qual dessas táticas você acha mais defensiva e qual é mais ofensiva.` 
        },
        { 
            data: '09/10', tri: '3º Tri', modulo: 'Esportes de Campo', titulo: 'Futebol: Coletivos de Equipes (Aula 4/4 - PRÁTICA)', desc: 'Partidas com passes integrados e controle de cooperação discente.', 
            resumo: `🎯 **Objetivo da Aula:** Desenvolver fair-play e controle individual emocional.\n\n🗣️ **Dinâmica (Prática):**\n• Partidas de futebol integradas e controle escolar de comportamento.` 
        },
        { 
            data: '16/10', tri: '3º Tri', modulo: 'Inclusão Desportiva', titulo: 'Inclusão: Esportes Adaptados (Aula 1/4 - TEÓRICA)', desc: 'A inclusão social pelas práticas paralímpicas na Educação Física.', 
            resumo: `🎯 **Objetivo da Aula:** Integrar conceitos de paradesporto e limitações corporais.` 
        },
        { 
            data: '23/10', tri: '3º Tri', modulo: 'Inclusão Desportiva', titulo: 'Inclusão: Vôlei Sentado (Aula 2/4 - PRÁTICA)', desc: 'Toques de vôlei na quadra sentados mantendo glúteos tocando o chão.', 
            resumo: `🎯 **Objetivo da Aula:** Dominar a mobilidade restrita corporal sentados.` 
        },
        { 
            data: '30/10', tri: '3º Tri', modulo: 'Inclusão Desportiva', titulo: 'Inclusão: Futebol de 5 (Aula 3/4 - MEIO A MEIO)', desc: 'Dribles e passes na quadra usando bola de guizo com olhos vendados.', 
            resumo: `🎯 **Objetivo da Aula:** Exercitar a percepção auditiva no desporto inclusivo.` 
        },
        { 
            data: '06/11', tri: '3º Tri', modulo: 'Inclusão Desportiva', titulo: 'Inclusão: Basquete Cadeira (Aula 4/4 - PRÁTICA)', desc: 'Basquete adaptado de precisão de arremessos ao cesto.', 
            resumo: `🎯 **Objetivo da Aula:** Praticar movimentos integrados de arremesso cooperativo.` 
        },
        { 
            data: '27/11', tri: '3º Tri', modulo: 'Esportes de Campo', titulo: 'Futebol de Várzea e Cidadania (Aula Única - MEIO A MEIO)', desc: 'Cultura da várzea periférica e projetos sociais nos subúrbios rurais. Recolhimento de Trabalho.', 
            trabalho: 'recolher',
            resumo: `🎯 **Objetivo da Aula:** Estudo social comunitário esportivo e recolhimento de trabalhos.\n\n🗣️ **Dinâmica (Teoria/Prática):**\n• O papel da várzea na favela e subúrbio.\n• Drills finais cooperativos em quadra.\n\n📥 **TRABALHO:** Recolher o Trabalho de Mapeamento Tático Simples (3 pts).` 
        },
        { 
            data: '04/12', tri: '3º Tri', modulo: 'Avaliação', titulo: 'Avaliação Teórica: Esportes de Campo e de Quadra (SALA - sem prática)', desc: 'Aplicação da prova conceitual em sala de aula.', 
            resumo: `🎯 **Objetivo da Aula:** Avaliação global teórica dos desportos regulamentados.\n\n🗣️ **Dinâmica:**\n• Prova conceitual sobre futsal, basquete, vôlei e futebol.` 
        },
        { 
            data: '11/12', tri: '3º Tri', modulo: 'Conselho de Classe', titulo: 'Conselho de Classe e Fechamento (SALA - sem prática)', desc: 'Fechamento de diários pedagógicos, autoavaliação e médias.', 
            resumo: `🎯 **Objetivo da Aula:** Oferecer devolutiva didática final aos discentes.` 
        },
        { 
            data: '18/12', tri: '3º Tri', modulo: 'Recuperação', titulo: 'Recuperação Final e Encerramento (SALA - sem prática)', desc: 'Consolidação das notas finais por recuperação paralela.', 
            resumo: `🎯 **Objetivo da Aula:** Conclusão letiva do ano com suporte final de conselho e recuperação.` 
        }
    ],
    'ilgch': [
        { data: '08/05', tri: '2º Tri', modulo: 'Introdução', titulo: 'Acolhimento', desc: 'Conhecimento das turmas e recepção.', status: 'concluido', resumo: `🎯 **Objetivo da Aula:** Conhecimento das turmas e introdução leve.\n\n🗣️ **Dinâmica:**\n• Recepção dos alunos.\n• Observações sobre a liberação antecipada (Recuperação).` },
        { data: '15/05', tri: '2º Tri', modulo: 'Introdução', titulo: 'O que é ILGCH?', desc: 'Apresentação da disciplina e eixos formativos.', status: 'concluido', resumo: `🎯 **Objetivo da Aula:** Apresentar a disciplina e seus eixos.\n\n🗣️ **Dinâmica:**\n• O que significa Itinerário Formativo?\n• Ciências Humanas e Sociais Aplicadas.\n\n📜 **Reflexão:** Como a sociedade molda o indivíduo?` },
        { data: '22/05', tri: '2º Tri', modulo: 'Identidade', titulo: 'Identidade e Sociedade', desc: 'Debate sobre Frantz Fanon e Cida Bento.', status: 'concluido', resumo: `🎯 **Objetivo da Aula:** Debater construções identitárias.\n\n🗣️ **Dinâmica:**\n• Leitura sobre Fanon.\n• Conceito de branquitude por Cida Bento.\n\n📜 **Reflexão:** A identidade é algo dado ou construído?` },
        { data: '29/05', tri: '2º Tri', modulo: 'Racismo', titulo: 'Racismo Estrutural e Recreativo', desc: 'Debate sobre o racismo invisível e estrutural, exemplos na segregação, África do Sul, Brasil, Jim Crow e Blackface.', resumo: `🎯 **Objetivo da Aula:** Compreender as nuances do racismo invisível e estrutural.\n\n🗣️ **Dinâmica:**\n• Apresentação de slides com casos reais: Segregação, África do Sul, Jim Crow e Blackface no Brasil e no mundo.\n\n📜 **Reflexão:** Como o humor recreativo mascara preconceitos estruturais?` },
        { data: '12/06', tri: '2º Tri', modulo: 'Identidade', titulo: 'Negro vs Preto e o Pardismo no Brasil', desc: 'Autodeclaração, pardismo e Fanon. Passar trabalho sobre os povos originários.', trabalho: 'passar', resumo: `🎯 **Objetivo da Aula:** Diferenciar negro e preto politicamente e estatisticamente.\n\n🗣️ **Dinâmica:**\n• O mito da democracia racial e o "pardismo" influenciado pelas reflexões de Fanon.\n• Divisão dos grupos.\n\n⚠️ **TRABALHO:** Povos originários das 5 regiões do Brasil antes da grande invasão e o cenário atual. (Cada grupo apresenta no mínimo 3 povos).` },
        { data: '19/06', tri: '2º Tri', modulo: 'Povos Originários', titulo: 'Ailton Krenak', desc: 'A representatividade de Ailton Krenak e suas "ideias para adiar o fim do mundo".', resumo: `🎯 **Objetivo da Aula:** Conhecer o pensamento do líder indígena Ailton Krenak.\n\n🗣️ **Dinâmica:**\n• A importância da obra de Krenak.\n• Sua entrada na Academia Brasileira de Letras.\n\n📜 **Reflexão:** O que significa "adiar o fim do mundo"?` },
        { data: '26/06', tri: '2º Tri', modulo: 'Povos Originários', titulo: 'Formação das Sociedades Globais', desc: 'A contribuição dos povos originários em cada continente.', resumo: `🎯 **Objetivo da Aula:** Analisar a fundação das sociedades sob a ótica dos povos nativos.\n\n🗣️ **Dinâmica:**\n• O apagamento dos nativos.\n• Estruturas sociais, econômicas e culturais antes de 1500.\n\n📜 **Reflexão:** O que a nossa sociedade atual deve às engenharias dos povos nativos?` },
        { data: '03/07', tri: '2º Tri', modulo: 'Seminários', titulo: 'Apresentação: Povos Originários (P1)', destaque: true, desc: 'Apresentação dos 3 primeiros grupos sobre povos das 5 regiões do Brasil.', resumo: `🎯 **Objetivo da Aula:** Socializar conhecimento sobre a cultura e atual situação de grupos originários do Brasil.\n\n🗣️ **Dinâmica:**\n• Apresentação dos 3 primeiros grupos.\n• O que mudou neles antes de 1500 para hoje?` },
        { data: '10/07', tri: '2º Tri', modulo: 'Seminários', titulo: 'Apresentação: Povos Originários (P2)', destaque: true, desc: 'Apresentação dos últimos 2 grupos sobre povos originários.', resumo: `🎯 **Objetivo da Aula:** Concluir as apresentações avaliativas.\n\n🗣️ **Dinâmica:**\n• Apresentação dos 2 grupos restantes.\n• Fechamento e análise comparada das etnias pesquisadas.` },
        { data: '17/07', tri: '2º Tri', modulo: 'Políticas Públicas', titulo: 'Território e Saúde Pública', desc: 'O território como acesso base a políticas públicas e promoção da saúde.', resumo: `🎯 **Objetivo da Aula:** Relacionar a posse de terras ou territorialidade com a prestação do serviço de bem-estar social.\n\n🗣️ **Dinâmica:**\n• Mapeamento do acesso ao SUS conforme as regiões e favelização.\n• Como o direito ao território previne o adoecimento do povo?` },
        { data: '31/07', tri: '2º Tri', modulo: 'Mídias', titulo: 'Redes Sociais, Ativismo e Algoritmos', desc: 'Ativismo virtual x presencial. A bolha dos algoritmos.', resumo: `🎯 **Objetivo da Aula:** Entender como a internet molda o que recebemos de causa social.\n\n🗣️ **Dinâmica:**\n• Debate sobre ativismo de sofá.\n• Cancelamento nas mídias sociais.` },
        { data: '07/08', tri: '2º Tri', modulo: 'Cultura', titulo: 'Apropriação vs Intercâmbio', desc: 'A fronteira da apropriação cultural na moda, no esporte e na música.', resumo: `🎯 **Objetivo da Aula:** Destrinchar de quem é a arte e por qual preço se adquire.\n\n🗣️ **Dinâmica:**\n• Elementos tradicionais que viraram produtos comerciais.\n• Respeito e herança.` },
        { data: '14/08', tri: '2º Tri', modulo: 'Revisão', titulo: 'Revisão Geral e Plantão', desc: 'Repasse completo pro trimestre (Racismo, Autodeclaração, Krenak, Políticas Públicas).', resumo: `🎯 **Objetivo da Aula:** Sistematização de saberes (Povos Originários, Lutas Sociais, Identidade).` },
        { data: '21/08', tri: '2º Tri', modulo: 'Avaliação', titulo: 'Avaliação Teórica', desc: 'Prova final do Itinerário Formativo sobre Ciências Humanas.', resumo: `🎯 **Objetivo da Aula:** Verificar o amadurecimento crítico do aluno.` },
        { data: '28/08', tri: '2º Tri', modulo: 'Recuperação', titulo: 'Recuperação e 2ª Chamada', desc: 'Consolidação de notas e oportunidade para reavaliação.', resumo: `🎯 **Objetivo da Aula:** Recuperação de notas dos alunos que não alcançaram a média.` },
        { data: '04/09', tri: '3º Tri', modulo: 'Gênero e Esporte', titulo: 'Gênero, Sociedade e Esporte', desc: 'Início do conteúdo trimestral novo. Evolução dos papéis das mulheres na cena esportiva.', resumo: `🎯 **Objetivo da Aula:** Questionar a divisão de esporte de 'menino' e de 'menina'.\n\n🗣️ **Dinâmica:**\n• Aula expositiva abrindo as próximas rodas de debate do ano.` },
        { data: '11/09', tri: '3º Tri', modulo: 'Gênero e Ciência', titulo: 'O Apagamento Invisível', desc: 'Apagamento histórico de mulheres na ciência.', resumo: `🎯 **Objetivo da Aula:** Discutir a exclusão histórica de corpos femininos do ecossistema científico.\n\n🗣️ **Dinâmica:**\n• O "Efeito Matilda".\n• Discussão sobre desigualdade estrutural de gênero no meio acadêmico.\n\n📜 **Reflexão:** De quem são as patentes e glórias das grandes inovações humanas?` },
        { data: '18/09', tri: '3º Tri', modulo: 'Gênero e Esporte', titulo: 'Divisão Sexista do Corpo', desc: 'Preconceitos em torno do esporte.', resumo: `🎯 **Objetivo da Aula:** Desconstruir rótulos que delimitam as práticas esportivas legítimas para cada gênero.\n\n🗣️ **Dinâmica:**\n• Por que modalidades olímpicas eram proibidas para mulheres?\n• O preconceito com corpos femininos atléticos.\n\n📜 **Reflexão:** Prática corporal tem gênero?` },
        { data: '25/09', tri: '3º Tri', modulo: 'Trabalho Acadêmico', titulo: 'Pioneiras da Mudança', desc: 'Passagem do trabalho.', trabalho: 'passar', resumo: `🎯 **Objetivo da Aula:** Definir os parâmetros e temas das apresentações finais.\n\n🗣️ **Dinâmica:**\n• Divisão dos grupos (de até 5 alunos).\n• Escolha do tema: Pioneira (ciência, filosofia ou esporte).\n\n⚠️ **TRABALHO:** Pesquisa profunda sobre uma pioneira em sua área. (Grupos 1, 2 e 3 apresentam no dia 23/10; 4 e 5 no dia 30/10).` },
        { data: '02/10', tri: '3º Tri', modulo: 'Gênero e Mídia', titulo: 'Hipersexualização e Espetáculo', desc: 'Representação visual nas mídias.', resumo: `🎯 **Objetivo da Aula:** Desenvolver olhar crítico sobre as mídias esportivas e de entretenimento.\n\n🗣️ **Dinâmica:**\n• Análise de coberturas jornalísticas (foco nos trajes vs técnica).\n• A imposição comercial de padrões estéticos absurdos.\n\n📜 **Reflexão:** O esporte feminino é consumido pela técnica ou pelo apelo puramente estético?` },
        { data: '09/10', tri: '3º Tri', modulo: 'Direitos e Igualdade', titulo: 'Equidade Salarial no Esporte', desc: 'Disparidade de investimentos e patrocínio.', resumo: `🎯 **Objetivo da Aula:** Discutir economia e direitos de arena.\n\n🗣️ **Dinâmica:**\n• Comparação salarial e infraestrutura de federações.\n• Luta global por premiações idênticas.\n\n📜 **Reflexão:** Por que marcas pagam menos por visualização de torneios femininos?` },
        { data: '16/10', tri: '3º Tri', modulo: 'Gênero e História', titulo: 'As Pioneiras Olímpicas', desc: 'O legado de Maria Lenk, Aída dos Santos.', resumo: `🎯 **Objetivo da Aula:** Reconhecer a história do desporto nacional feminino.\n\n🗣️ **Dinâmica:**\n• Apresentação do legado de Aída dos Santos e Maria Lenk.\n• A proibição oficial do esporte para mulheres no Brasil (Vargas).\n\n📜 **Reflexão:** Qual o preço que as primeiras mulheres brasileiras pagaram?` },
        { data: '23/10', tri: '3º Tri', modulo: 'Seminários', titulo: 'Apre: Pioneiras (P1)', destaque: true, desc: 'Apresentação dos grupos 1, 2 e 3.', resumo: `🎯 **Objetivo da Aula:** Desenvolver raciocínio crítico coletivo.\n\n🗣️ **Dinâmica:**\n• Apresentação visual e oral dos 3 primeiros grupos.\n• Debate mediado pelo professor.` },
        { data: '30/10', tri: '3º Tri', modulo: 'Seminários', titulo: 'Apre: Pioneiras (P2)', destaque: true, desc: 'Apresentação dos grupos 4 e 5.', resumo: `🎯 **Objetivo da Aula:** Concluir os seminários avaliativos.\n\n🗣️ **Dinâmica:**\n• Apresentação dos grupos 4 e 5.\n• Síntese integrativa.` },
        { data: '06/11', tri: '3º Tri', modulo: 'Integração', titulo: 'Debate Integrador', desc: 'Consolidação das discussões de gênero do ano.', resumo: `🎯 **Objetivo da Aula:** Consolidar aprendizados sobre Gênero, Ciência e Esporte.\n\n🗣️ **Dinâmica:**\n• Roda de debate final sobre os principais pontos discutidos no trimestre.` },
        { data: '13/11', tri: '3º Tri', modulo: 'Integração', titulo: 'Síntese Final: Disciplina', desc: 'Review dos eixos ILGCH do ano.', resumo: `🎯 **Objetivo da Aula:** Visão geral do percurso formativo da disciplina.\n\n🗣️ **Dinâmica:**\n• Revisão temática.\n• Feedback coletivo.` },
        { data: '27/11', tri: '3º Tri', modulo: 'Avaliação', titulo: 'Avaliação Final', desc: 'Avaliação conceitual escrita.', resumo: `🎯 **Objetivo da Aula:** Verificação crítica de saberes do ano letivo.\n\n🗣️ **Dinâmica:**\n• Prova escrita analítica.` },
        { data: '04/12', tri: '3º Tri', modulo: 'Recuperação', titulo: 'Recuperação Final', desc: 'Fechamento de diários e notas.', resumo: `🎯 **Objetivo da Aula:** Fechamento final e recuperação paralela.` }

    ]
};

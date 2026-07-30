import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, Printer } from 'lucide-react';
import { safeLocalStorage } from '../utils/storage';
import { PE_PLAN } from '../data/planosPE';
import { ChalkboardDiagram } from './ChalkboardDiagram';
import { Slide, slidesData } from './DecolonialApp';
import { SLIDES_PARALIMPICO } from '../data/corpoMidiaSlides';

interface SlidePlayerProps {
  selectedAulaData: string | null;
  setSlideViewerOpen: (open: { type: 'decolonial_player' | 'corpo-midia' | 'altinha-futvolei' } | null) => void;
  setCurrentView: (view: any) => void;
}

export const SlidePlayer: React.FC<SlidePlayerProps> = ({ 
  selectedAulaData, 
  setSlideViewerOpen, 
  setCurrentView 
}) => {
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

        if (tUpper.includes('HANDEBOL') && tUpper.includes('REGRAS GERAIS')) {
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
                "Área do goleiro: A área contínua do goleiro delimitada pela linha de 6 metros.",
                "Linha pontilhada: Fica a 9 marca a zona de tiro livre."
              ],
              dicaProfessor: "Chame atenção para a incrível diferença geométrica e de velocidade entre a quadra lisa e o campo de grama."
            },
            {
              tipo: 'texto_simples',
              type: 'texto_simples',
              titulo: "✍️ Roteiro para Desenhar no Quadro",
              topicos: [
                "Passo 1: Desenhe um retângulo proporcional de 60x30cm e trace a linha central divisória.",
                "Passo 2: Trace a área contínua do goleiro de 6m.",
                "Passo 3: Trace a zona pontilhada de Tiro Livre a 9m.",
                "Passo 4: No topo de cada área, faça a linha de 7m exata (linha do pênalti)."
              ],
              dicaProfessor: "Enquanto desenha, instigue os alunos a copiarem a simetria de marcas e linhas limites."
            },
            {
              tipo: 'texto_simples',
              type: 'texto_simples',
              titulo: "👥 Posições e Atribuições Técnicas",
              topicos: [
                "1 Goleiro: Defensor máximo da meta, único com permissão de tocar a bola com as pernas na área restrita.",
                "Armador Central: O pilar central do time, organiza a criação e aciona passes de transição.",
                "Alas/Meias (Esquerdo/Direito): Os motores de arremesso pelas laterais ofensivas.",
                "Pontas: Jogadores leves que atuam nas extremidades da quadra (cantos).",
                "Pivô: O atacante que infiltra na barreira adversária perto da área de 6 metros."
              ],
              dicaProfessor: "Demonstre no quadro como o pivô precisa jogar infiltrado perto da área de meta adversária."
            },
            {
              tipo: 'texto_simples',
              type: 'texto_simples',
              titulo: "🩹 Regras de Punições e Passos",
              topicos: [
                "Limite de passos: O jogador só pode dar no máximo 3 passos segurando a bola sem quicá-la no chão.",
                "Regra de Invasão: Nenhum jogador de linha pode pisar na linha ou dentro da área de 6m para atacar.",
                "Punição: Exclusões de 2 minutos para faltas consideradas desleais ou excessivamente agressivas.",
                "Substituições: Livres e ilimitadas dentro da zona de substituição demacada."
              ],
              dicaProfessor: "Destaque a necessidade de controle emocional rigoroso na dinâmica dos 2 minutos do handebol."
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

        if (tUpper.includes('HANDEBOL') && tUpper.includes('ROTAÇÕES DE LINHA')) {
          return [
            {
              tipo: 'capa',
              type: 'capa',
              titulo: aula.titulo,
              title: aula.titulo,
              subtitulo: "Inteligência Tática: Movimentação Coletiva com Sistemas de Bloqueio",
              dicaProfessor: "Esta é uma aula MEIO A MEIO. Primeiro ensinamos em sala projetada e depois na quadra escolar."
            },
            {
              tipo: 'texto_simples',
              type: 'texto_simples',
              titulo: "🗺️ O Sistema Tático 6-0 (Linha Clássica)",
              topicos: [
                "Estrutura: Seis jogadores posicionados de forma defensiva acompanhando a linha de 6 metros.",
                "Indicado para: Equipes de iniciantes; forma uma muralha sólida para evitar arremessos fáceis de proximidade.",
                "Vantagem: Simples cobertura e bloqueio eficiente contra as infiltrações de pivôs e pontas adversários.",
                "Desvantagem: Permite arremessos de longa distância (9m) livres, já que não há marcadores avançados."
              ],
              dicaProfessor: "Foque na simplicidade da linha 6-0 no início da explicação tática básica de pátio."
            },
            {
              tipo: 'texto_simples',
              type: 'texto_simples',
              titulo: "✍️ Desenho do Sistema 6-0 no Quadro",
              topicos: [
                "Passo 1: Esboce a quadra de handebol e marque a área do goleiro de 6m bem visível.",
                "Passo 2: Marque seis círculos unidos acompanhando o contorno de toda a linha curvada de seis metros.",
                "Passo 3: Insira setas que mostrem a barreira defensiva deslizando para o lado em que a bola estiver na quadra.",
                "Passo 4: Mostre o contra-ataque rápido subindo pelas laterais caso ocorra uma interceptação no passe."
              ],
              dicaProfessor: "Explore o quadro destacando como a marcação em zona é muito facilitada no sistema 6-0."
            },
            {
              tipo: 'texto_simples',
              type: 'texto_simples',
              titulo: "💎 O Sistema Tático 5-1 (Um à frente)",
              topicos: [
                "Estrutura: 5 jogadores recuados na linha de 6m e 1 jogador que flutua mais à frente, perto da linha de 9m (o 'Bico').",
                "Triangulações de Passe: O 'bico' atrapalha e pressiona intensamente a troca de bola dos armadores adversários.",
                "Vantagem: Altamente ativo e dinâmico, forçando o adversário aos errar passes na meia distância.",
                "Desvantagem: Exige excelente condicionamento físico do atleta que vai correr adiantado pressionando ('bico')."
              ],
              dicaProfessor: "Explique como o jogador 'bico' de handebol profissional precisa dar combates constantes abrindo espaços."
            },
            {
              tipo: 'texto_simples',
              type: 'texto_simples',
              titulo: "✍️ Desenho do Sistema 5-1 no Quadro",
              topicos: [
                "Passo 1: Desenhe a quadra reduzida com giz colorido e a área contínua de 6m e de 9m.",
                "Passo 2: Posicione cinco bolinhas da defesa seguindo o curvamento da área do goleiro, bem compactas.",
                "Passo 3: Mova um jogador (geralmente o Central) para um pouco a frente dos defensores, para perseguir a bola.",
                "Passo 4: Demonstre a intenção de atrapalhar armadores rivais, causando interceptações fáceis para correria de contra-ataque."
              ],
              dicaProfessor: "Trace flechas a partir do Bico subindo na pressão e da linha de 5 na basculação de bloco."
            },
            {
              tipo: 'destaque_centro',
              type: 'destaque_centro',
              texto: "🏃‍♂️ COMPUTAÇÃO MOTORA ATIVA",
              subtexto: "Vamos descer de forma organizada para a quadra para ensaiarmos drills táticos em grupos limitando arremessos!",
              dicaProfessor: "Estipule o paredão defensivo tático de handebol antes da liberação e de descermos para o pátio esportivo."
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
              dicaProfessor: "Use flechas pontilhadas dinâmicas para mostrar as diagonais dos pontas in direção ao centro de área."
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

        if ((tUpper.includes('INCLUSÃO') && tUpper.includes('PARALÍMPICO')) || tUpper.includes('RETORNO')) {
          return SLIDES_PARALIMPICO.map(s => ({
            ...s,
            tipo: s.category === 'LOUSA_ALUNO' || s.title.includes('QUADRO') ? 'texto_simples' : 'texto',
            type: s.category === 'LOUSA_ALUNO' || s.title.includes('QUADRO') ? 'texto_simples' : 'texto',
            titulo: s.title,
            title: s.title,
            subtitulo: s.subtitle,
            topicos: s.points,
            content: s.content,
            dicaProfessor: s.dicaProfessor
          }));
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
              dicaProfessor: "Garanta la guarda ativa e atenda as necessidades das turmas com foco acolhedor e escuta."
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
              dicaProfessor: "Projete enquanto reitera os conceitos pedagogicos críticos com os alunos com médias pendentes."
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
                "Passo 1: Escreva termos de equivalência estrutural no quadro (ex: Vôlei = Rodízio, Handebol = Quadra de 40m).",
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
                "Os conceitos teóricos (impedimento, posições de vôlei e handebol) ficaram esclarecidos em sua mente?",
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

  const [currentIndex, setCurrentIndex] = useState(() => {
    const key = selectedAulaData ? `decolonial_slideIndex_${selectedAulaData}` : 'decolonial_slideIndex';
    const saved = safeLocalStorage.getItem(key);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showDica, setShowDica] = useState(false);

  useEffect(() => {
    const key = selectedAulaData ? `decolonial_slideIndex_${selectedAulaData}` : 'decolonial_slideIndex';
    safeLocalStorage.setItem(key, currentIndex.toString());
  }, [currentIndex, selectedAulaData]);

  useEffect(() => {
    if (setSlideViewerOpen) {
      setSlideViewerOpen({ type: 'decolonial_player' });
    }
    return () => {
      if (setSlideViewerOpen) {
        setSlideViewerOpen(null);
      }
    };
  }, [setSlideViewerOpen]);

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

    const isVoleiSentadoLocal = isParentVoleiSentado ||
      combinedText.includes('SENTADO') ||
      (combinedText.includes('PARADESPORTO') && combinedText.includes('VÔLEI'));

    const isFutebol5 = isParentFutebol5 ||
      combinedText.includes('FUTEBOL DE 5') ||
      combinedText.includes('FUTEBOL DE CINCO') ||
      combinedText.includes('GUIZO') ||
      combinedText.includes('ADAPTAÇÕES DE REGRAS');

    const hasDiagram = isFutevolei || isFutsalMedidas || isFutsalTatico || isVoleiPosicoes || isVolei6x0 || isBasqueteHandebol || isImpedimento || isFutebolTatico || isVoleiSentadoLocal || isFutebol5;

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
            <h2 className="text-3xl md:text-5xl font-black text-emerald-400 mb-6 border-l-8 border-emerald-500 pl-4">
              {slideAtual.title || slideAtual.titulo}
            </h2>
            {(slideAtual.subtitle || slideAtual.subtitulo) && (
              <p className="text-lg md:text-2xl font-bold text-amber-300 mb-6 bg-amber-950/40 px-4 py-2 rounded-xl border border-amber-500/30 w-fit">{slideAtual.subtitle || slideAtual.subtitulo}</p>
            )}
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
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}} />

      <div className={`h-16 flex justify-between items-center px-4 md:px-6 absolute top-0 w-full z-[100000] ${isIlgch ? 'bg-black/80 text-white border-b border-white/10' : 'bg-white/90 border-b border-slate-200 text-slate-800'} backdrop-blur no-print`}>
        <div className="flex items-center gap-2 md:gap-3">
          <button 
            onClick={() => setCurrentView('repositorio_aulas_lista')} 
            className={`px-3 py-1.5 rounded-lg font-black text-xs transition-all shadow-sm ${isIlgch ? 'text-white bg-white/20 hover:bg-white/30' : 'text-slate-700 bg-slate-200 hover:bg-slate-300'}`}
          >
            ← Voltar
          </button>
          <button onClick={handlePrint} className="flex items-center gap-1.5 text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg font-black text-xs shadow-sm transition-all">
            <Printer size={15} /> Salvar PDF
          </button>

          <div className={`flex items-center gap-1 p-1 rounded-lg border shadow-sm ml-1 ${isIlgch ? 'bg-slate-900/90 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-800'}`}>
            <button 
              onClick={prevSlide} 
              disabled={currentIndex === 0} 
              className={`p-1.5 rounded-md disabled:opacity-25 transition-all cursor-pointer ${isIlgch ? 'hover:bg-slate-800 text-emerald-400' : 'hover:bg-slate-200 text-blue-600'}`}
              title="Slide Anterior (Seta Esquerda)"
            >
              <ChevronLeft size={18} />
            </button>
            
            <span className="text-xs font-black px-2 tracking-wider">
              {currentIndex + 1} / {slides.length}
            </span>

            <button 
              onClick={nextSlide} 
              disabled={currentIndex === slides.length - 1} 
              className={`p-1.5 rounded-md disabled:opacity-25 transition-all cursor-pointer ${isIlgch ? 'hover:bg-slate-800 text-emerald-400' : 'hover:bg-slate-200 text-blue-600'}`}
              title="Próximo Slide (Seta Direita)"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className={`font-black tracking-widest text-xs px-3 py-1.5 rounded-lg shadow-sm ${isIlgch ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/30' : 'text-blue-700 bg-blue-50 border border-blue-200'}`}>
          SLIDE {currentIndex + 1} DE {slides.length}
        </div>
      </div>

      <div className="flex-grow w-full h-full relative pt-16" id="print-area">
        {renderSlideContent()}
      </div>

      {slideAtual?.dicaProfessor && (
        <div className="absolute bottom-4 left-4 max-w-lg z-[100000] no-print">
          <button 
            onClick={() => setShowDica(!showDica)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs backdrop-blur border shadow-md cursor-pointer transition-all ${isIlgch ? 'text-slate-300 hover:text-white bg-slate-900/90 border-slate-700' : 'text-slate-700 hover:text-slate-900 bg-white/95 border-slate-300'}`}
          >
            <Info size={14} className="text-amber-400" /> {showDica ? 'Esconder Dica do Prof' : '💡 Dica de Fala do Prof'}
          </button>
          {showDica && (
            <div className={`mt-2 p-4 rounded-xl shadow-2xl max-h-[160px] overflow-y-auto border-2 ${isIlgch ? 'bg-slate-900 border-emerald-500 text-slate-100' : 'bg-white border-blue-500 text-slate-800'}`}>
              <span className={`font-bold text-xs uppercase tracking-wider block mb-1 ${isIlgch ? 'text-emerald-400' : 'text-blue-600'}`}>Roteiro de Fala:</span>
              <p className="text-sm font-medium leading-snug">{slideAtual.dicaProfessor}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

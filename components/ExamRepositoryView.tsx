import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, FileText, CheckCircle2, Download, Printer, Search } from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple_choice' | 'discursive';
  text: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}

interface Exam {
  id: string;
  title: string;
  subject: string;
  classes: string[];
  trimester: string;
  totalPoints: number;
  questions: Question[];
}

const EXAMS: Exam[] = [
  {
    id: 'exam_esportes_ap',
    title: 'Avaliação Teórica: Esportes de Quadra e Rede (Handebol, Futsal e Vôlei)',
    subject: 'Educação Física',
    classes: ['AP 101 - CIEP 198', 'AP 101 - CIEP 369', 'AP 101 e 301 - CIEP 320'],
    trimester: '2º Trimestre',
    totalPoints: 5.0,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        text: 'Qual é a principal função da linha de 6 metros na quadra de handebol?',
        options: [
          'A) É a linha onde se cobram os tiros livres.',
          'B) É a área exclusiva do goleiro, onde nenhum outro jogador pode pisar.',
          'C) É a marca de onde os armadores devem realizar os passes.',
          'D) É o local exato do meio de campo.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        text: 'Em relação às posições táticas no Futsal, assinale a opção que descreve corretamente uma das funções:',
        options: [
          'A) O Fixo atua principalmente no ataque, próximo ao gol adversário.',
          'B) O Pivô joga mais recuado, auxiliando o goleiro.',
          'C) Os Alas jogam pelas laterais da quadra, ajudando na defesa e no ataque.',
          'D) No Futsal, não existem posições definidas, todos os jogadores atacam juntos.'
        ],
        correctAnswer: 'C',
        points: 0.5
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        text: 'No Futevôlei, o esporte possui uma dinâmica semelhante ao Vôlei. No entanto, em relação aos toques na bola, é correto afirmar que:',
        options: [
          'A) É permitido usar as mãos e os braços para realizar passes e recepções.',
          'B) Os jogadores utilizam principalmente pés, coxas, peito e cabeça para manter a bola no ar.',
          'C) Cada equipe pode dar apenas um toque na bola antes de passá-la para o outro lado.',
          'D) A bola pode quicar no chão da quadra antes de ser tocada pelo jogador.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        text: 'No Handebol, qual jogador é considerado o "cérebro" do time e atua na linha de 9m organizando as jogadas?',
        options: [
          'A) O Pivô',
          'B) O Ponta',
          'C) O Armador Central',
          'D) O Goleiro'
        ],
        correctAnswer: 'C',
        points: 0.5
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        text: 'Sobre o limite de posse e toques no Voleibol, é correto afirmar:',
        options: [
          'A) Cada equipe pode dar quantos toques quiser antes de passar a bola.',
          'B) A equipe tem um limite máximo de 3 toques para devolver a bola à quadra adversária (não contando o bloqueio).',
          'C) A bola pode tocar no chão uma vez antes de ser rebatida.',
          'D) Um mesmo jogador pode dar dois toques consecutivos na bola.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q6',
        type: 'discursive',
        text: 'Desenhe uma quadra de Handebol contendo as linhas de 6 metros e 9 metros. Em seguida, desenhe e posicione corretamente os 7 jogadores de uma equipe (incluindo o goleiro) para representar o sistema tático defensivo 5:1.',
        points: 0.5
      },
      {
        id: 'q7',
        type: 'discursive',
        text: 'No Futsal, além do goleiro, estudamos as funções táticas de linha. Cite as posições escolares do Futsal (Fixo, Alas e Pivô) e explique a função principal de uma delas.',
        points: 0.5
      },
      {
        id: 'q8',
        type: 'discursive',
        text: 'Quais são as principais funções desempenhadas pelo Pivô no Futsal e no Handebol? Aponte uma semelhança no estilo de jogo dessa posição nos dois esportes.',
        points: 0.5
      },
      {
        id: 'q9',
        type: 'discursive',
        text: 'O Futevôlei foi um dos primeiros esportes de rede praticados no trimestre. Cite duas partes do corpo que foram estimuladas e praticadas para realizar a recepção e o passe da bola.',
        points: 0.5
      },
      {
        id: 'q10',
        type: 'discursive',
        text: 'Tanto o Handebol quanto o Futsal possuem regras rígidas sobre as áreas próximas ao gol (linha de 6m). O que acontece no Handebol se um jogador de ataque pisar nessa área durante um arremesso?',
        points: 0.5
      }
    ]
  },
  {
    id: 'exam_povos_orig',
    title: 'Avaliação Teórica: Povos Originários e Sociedade Global',
    subject: 'ILGCH - Decolonização de corpos, estética, mídia e espaços',
    classes: ['ILGCH - CIEP 476'],
    trimester: '2º Trimestre',
    totalPoints: 5.0,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        text: 'Segundo a perspectiva apresentada, por que a ideia de "descobrimento" do Brasil é considerada um mito?',
        options: [
          'A) Porque as terras eram completamente vazias e ninguém as habitava.',
          'B) Porque os europeus já sabiam o caminho para a Índia.',
          'C) Porque houve uma invasão de territórios já amplamente habitados e estruturados por milhares de anos.',
          'D) Porque as terras foram compradas amigavelmente pelos colonizadores.'
        ],
        correctAnswer: 'C',
        points: 0.5
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        text: 'Qual destas afirmações sobre o mundo antes de 1500 é CORRETA?',
        options: [
          'A) Na América existiam apenas pequenos grupos sem organização.',
          'B) Metrópoles gigantescas como Tenochtitlán eram maiores que as cidades europeias da época.',
          'C) A África não possuía universidades ou rotas comerciais globais.',
          'D) Na Oceania, os navegadores desconheciam a leitura das estrelas.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        text: 'Qual foi o principal manejo agrícola citado que permitiu a sobrevivência e estabilidade nutricional no mundo até os dias de hoje?',
        options: [
          'A) Apenas a domesticação do trigo e da cevada.',
          'B) A domesticação essencial da mandioca e do milho pelos povos nativos.',
          'C) A invenção de fertilizantes químicos.',
          'D) A criação de pastos para grandes rebanhos de gado na Amazônia.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        text: 'O que era a "Terra Preta de Índio"?',
        options: [
          'A) Um tipo de solo infértil encontrado no deserto.',
          'B) Uma biotecnologia milenar que fertilizou vastas regiões da Amazônia.',
          'C) Um pigmento usado apenas para pintura corporal.',
          'D) Uma lenda sobre a origem da chuva.'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        text: 'Qual antropólogo brasileiro inspirou a reflexão de que o Brasil não era um vazio demográfico?',
        options: [
          'A) Gilberto Freyre',
          'B) Darcy Ribeiro',
          'C) Florestan Fernandes',
          'D) Sérgio Buarque de Holanda'
        ],
        correctAnswer: 'B',
        points: 0.5
      },
      {
        id: 'q6',
        type: 'discursive',
        text: 'A estimativa é que existissem cerca de 5 milhões de habitantes no território que hoje é o Brasil em 1500. Mencione uma evidência da complexidade de comunicação e infraestrutura desses povos.',
        points: 0.5
      },
      {
        id: 'q7',
        type: 'discursive',
        text: 'Explique a diferença entre a estrutura social e a tomada de decisão dos povos originários em comparação com a rigidez hierárquica feudal da Europa.',
        points: 0.5
      },
      {
        id: 'q8',
        type: 'discursive',
        text: 'Como os povos Macro-Jê do interior se diferenciavam na organização territorial em relação aos povos da Amazônia?',
        points: 0.5
      },
      {
        id: 'q9',
        type: 'discursive',
        text: 'De acordo com a aula, qual é a nossa grande dívida tecnológica na área de sustentabilidade e medicina para com os povos originários?',
        points: 0.5
      },
      {
        id: 'q10',
        type: 'discursive',
        text: 'O que as "chinampas" astecas e os terraços agrícolas incas representam em termos de conhecimento matemático e adaptativo?',
        points: 0.5
      }
    ]
  }
];

export const ExamRepositoryView = ({ onBack }: { onBack: () => void }) => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showPrintWarning, setShowPrintWarning] = useState(false);

  const handlePrint = () => {
    if (window.self !== window.top) {
      setShowPrintWarning(true);
      setTimeout(() => setShowPrintWarning(false), 5000);
    }
    try {
      window.print();
    } catch (e) {
      console.error("Print failed", e);
    }
  };

  return (
    <>
      <style>{`
        @media print {
          @page { size: portrait; margin: 15mm; }
          body { 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact; 
            background: white !important; 
          }
          .print\\:hidden { display: none !important; }
          .print-avoid-break { break-inside: avoid; page-break-inside: avoid; }
          /* Reset backgrounds and shadows for print */
          .print\\:bg-white { background-color: white !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-none { border: none !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:m-0 { margin: 0 !important; }
        }
      `}</style>
      <div className="p-6 md:p-12 font-sans bg-white/70 backdrop-blur-md rounded-2xl border border-slate-300 shadow-xl min-h-screen print:p-0 print:shadow-none print:border-none print:bg-white print:min-h-0">
        <div className="max-w-6xl mx-auto print:max-w-none">
          <button 
            onClick={selectedExam ? () => setSelectedExam(null) : onBack} 
            className="mb-8 flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors bg-white px-4 py-2 rounded-lg shadow-sm w-fit border border-slate-200 print:hidden"
          >
            <ChevronLeft size={20} /> {selectedExam ? 'Voltar para Lista de Provas' : 'Voltar para Gestão'}
          </button>

          {!selectedExam ? (
          <>
            <header className="mb-12 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]">
                <FileText className="text-blue-600 drop-shadow-sm" size={40} /> REPOSITÓRIO DE PROVAS
              </h2>
              <p className="text-slate-500 mt-3 font-black tracking-widest text-sm uppercase">Crie, edite e imprima as avaliações com base nos conteúdos teóricos.</p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              {EXAMS.map(exam => (
                <motion.div 
                  key={exam.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-6 border border-slate-300 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  onClick={() => setSelectedExam(exam)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                        {exam.title}
                      </h3>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-md uppercase">
                        {exam.totalPoints.toFixed(1)} Pts
                      </span>
                    </div>
                    
                    <p className="text-sm font-bold text-slate-500 mb-2">{exam.subject}</p>
                    <p className="text-xs text-slate-400 mb-4">{exam.trimester}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exam.classes.map(cls => (
                        <span key={cls} className="bg-slate-100 border border-slate-200 text-slate-600 text-xs px-2 py-1 rounded-md font-medium">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-2 text-blue-600 font-bold text-sm">
                    Ver Avaliação <ChevronLeft className="rotate-180" size={16} />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden print:border-none print:shadow-none">
            <div className="bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden print:hidden">
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase print:text-2xl">{selectedExam.title}</h2>
                    <p className="text-slate-300 mt-2 font-medium print:text-black">{selectedExam.subject} • {selectedExam.trimester}</p>
                  </div>
                  <div className="flex gap-3 print:hidden relative">
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                      <Printer size={16} /> Imprimir Prova
                    </button>
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                      <Download size={16} /> Baixar PDF
                    </button>

                    {showPrintWarning && (
                      <div className="absolute top-full mt-4 right-0 w-64 bg-amber-100 border border-amber-300 text-amber-900 text-sm font-medium p-4 rounded-lg shadow-lg z-50 flex items-start gap-3">
                        <div className="shrink-0 mt-0.5">⚠️</div>
                        <p>Para imprimir ou salvar em PDF, abra o aplicativo em uma <strong>nova guia</strong> clicando no ícone superior direito do navegador.</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedExam.classes.map(cls => (
                    <span key={cls} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium print:bg-transparent print:text-black print:border print:border-black print:rounded-sm">
                      Turma: {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-12 print:p-0 print:space-y-6">
              {/* Título da Prova apenas na Impressão */}
              <div className="hidden print:block text-center border-b-2 border-slate-900 pb-4 mb-4">
                <h2 className="text-xl font-extrabold uppercase tracking-tight">{selectedExam.title}</h2>
                <p className="text-sm font-bold uppercase text-slate-600 mt-1">{selectedExam.subject} • {selectedExam.trimester}</p>
              </div>

              {/* Cabeçalho da Prova para o Aluno preencher */}
              <div className="border-2 border-slate-900 p-6 rounded-xl space-y-4 mb-8 bg-white print:border-black print:text-black print:p-4 print:mb-4 print:space-y-2">
                <div className="flex flex-col md:flex-row justify-between gap-6 print:flex-row print:gap-4">
                  <div className="flex-1 space-y-5 print:space-y-3">
                    <div className="flex items-end gap-2 border-b border-slate-400 print:border-black pb-1">
                      <span className="font-black text-slate-800 uppercase whitespace-nowrap text-lg print:text-xs">Escola:</span>
                      <div className="flex-1 h-6 print:h-5"></div>
                    </div>
                    <div className="flex items-end gap-2 border-b border-slate-400 print:border-black pb-1">
                      <span className="font-black text-slate-800 uppercase whitespace-nowrap text-lg print:text-xs">Aluno(a):</span>
                      <div className="flex-1 h-6 print:h-5"></div>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex flex-col gap-5 print:w-1/4 print:gap-3">
                    <div className="flex items-end gap-2 border-b border-slate-400 print:border-black pb-1">
                      <span className="font-black text-slate-800 uppercase whitespace-nowrap text-lg print:text-xs">Turma:</span>
                      <div className="flex-1 h-6 print:h-5"></div>
                    </div>
                    <div className="flex items-end gap-2 border-b border-slate-400 print:border-black pb-1">
                      <span className="font-black text-slate-800 uppercase whitespace-nowrap text-lg print:text-xs">Data:</span>
                      <div className="flex-1 h-6 print:h-5"></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-4 border-t-2 border-slate-200 print:border-black print:grid-cols-2 print:mt-4 print:pt-2 print:gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-800 uppercase text-lg print:text-xs">Professor:</span>
                    <span className="text-slate-700 uppercase font-bold text-lg print:text-xs">André Brito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-800 uppercase text-lg print:text-xs">Disciplina:</span>
                    <span className="text-slate-700 uppercase font-bold text-lg print:text-xs">Educação Física</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end border-b border-slate-200 pb-4 print:border-black print:mt-2">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight print:text-sm print:text-black">Caderno de Questões</h3>
                <p className="font-bold text-slate-500 uppercase tracking-wider text-sm print:text-xs print:text-black">
                  {selectedExam.questions.length} Questões ({selectedExam.totalPoints.toFixed(1)} Pontos Totais)
                </p>
              </div>

              {selectedExam.questions.map((q, idx) => (
                <div key={q.id} className="relative pl-8 md:pl-12 border-l-4 border-slate-200 hover:border-blue-500 transition-colors print-avoid-break print:border-l-0 print:pl-0 print:mb-4">
                  <span className="absolute -left-5 md:-left-6 top-0 bg-white border-4 border-slate-200 text-slate-600 font-black rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl shadow-sm print:static print:w-auto print:h-auto print:border-none print:bg-transparent print:text-black print:mb-1 print:text-xs print:font-extrabold">
                    Questão {idx + 1}
                  </span>
                  
                  <div className="mb-4 print:mb-2">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-lg text-slate-900 font-medium leading-relaxed print:text-xs print:font-semibold">{q.text}</h4>
                      <span className="shrink-0 bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md print:bg-transparent print:text-black print:text-[10px] print:font-bold">
                        {q.points.toFixed(1)} pts
                      </span>
                    </div>
                  </div>

                  {q.type === 'multiple_choice' && q.options && (
                    <div className="space-y-3 mt-6 print:space-y-1 print:mt-2">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = q.correctAnswer === opt.charAt(0);
                        return (
                          <div 
                            key={oIdx} 
                            className={`p-4 rounded-xl border-2 transition-all ${isCorrect ? 'border-emerald-500 bg-emerald-50/50 print:!border-slate-200 print:!bg-white' : 'border-slate-200 bg-slate-50 print:!bg-white print:!border-slate-200'}`}
                          >
                            <div className="flex items-start gap-3">
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5 print:hidden" size={20} />
                                  <div className="hidden print:block w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5 print:w-4 print:h-4 print:border" />
                                </>
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5 print:w-4 print:h-4 print:border" />
                              )}
                              <span className={`text-base ${isCorrect ? 'text-emerald-900 font-semibold print:!text-slate-900 print:!font-normal' : 'text-slate-700 print:!text-slate-900'} print:text-xs`}>
                                {opt}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'discursive' && (
                    <div className="mt-6 space-y-4 print:mt-2 print:space-y-2">
                      <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl min-h-[120px] flex items-center justify-center print:border-solid print:border-slate-300 print:bg-white print:min-h-[80px] print:p-2">
                        <span className="text-slate-400 font-medium text-sm print:hidden">Espaço para resposta do aluno (5 a 8 linhas)</span>
                      </div>
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl print:hidden">
                        <p className="text-sm text-amber-800 font-medium">
                          <strong>Gabarito Esperado (Professor):</strong> A resposta deve ser elaborada com base nos conceitos apresentados nos slides e anotações teóricas da aula.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

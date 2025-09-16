# Template Padrão para Atividades Educacionais

Este documento serve como o template oficial para a criação de novas atividades interativas. Ele combina as melhores práticas de UI/UX, gamificação, gerenciamento de mídia e coleta de dados, garantindo uma experiência consistente para os alunos e um desenvolvimento padronizado.

**Como usar:**
1.  Copie o código HTML abaixo para um novo arquivo (ex: `nova_atividade.html`) na pasta `/pages`.
2.  Preencha a seção `// --- CONFIGURAÇÃO DA ATIVIDADE ---` com os dados específicos da nova atividade (título, matéria, blocos, questões).
3.  Implemente a lógica de interação específica da sua atividade na seção `<!-- ÁREA DE INTERAÇÃO DA QUESTÃO -->`.
4.  Crie a estrutura de pastas e os arquivos de mídia correspondentes dentro da pasta `/media`, seguindo o padrão definido.

---

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- O título é preenchido dinamicamente -->
    <title>Atividade Educacional</title>
    
    <!-- Dependências Padrão (React, TailwindCSS, Fontes) -->
    <link href="https://fonts.googleapis.com/css2?family=Comic+Sans+MS:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        /* Definição da fonte local OpenDyslexic */
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('../media/fonts/OpenDyslexic-Regular.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('../media/fonts/OpenDyslexic-Bold.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
        }
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('../media/fonts/OpenDyslexic-Italic.otf') format('opentype');
          font-weight: normal;
          font-style: italic;
        }
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('../media/fonts/OpenDyslexic-Bold-Italic.otf') format('opentype');
          font-weight: bold;
          font-style: italic;
        }

        /* Estilos Globais e de Acessibilidade */
        body {
            font-family: 'Comic Sans MS', cursive, sans-serif;
        }
        .font-dyslexic {
            font-family: 'OpenDyslexic', 'Comic Sans MS', cursive, sans-serif;
        }
        /* Animações sutis para feedback */
        .correct-answer-animation {
            animation: pulse-green 0.8s ease-in-out;
        }
        @keyframes pulse-green {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
            50% { transform: scale(1.05); box-shadow: 0 0 10px 10px rgba(34, 197, 94, 0); }
        }
        .wrong-answer-animation {
            animation: shake-red 0.5s ease-in-out;
        }
        @keyframes shake-red {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef } = React;

        const backgroundMusicPlaylist = [
            '../media/musicas/theme_1.mp3',
            '../media/musicas/theme_2.mp3',
            '../media/musicas/theme_3.mp3'
        ];

        const MusicPlayer = () => {
            const audioRef = useRef(null);
            const [isPlaying, setIsPlaying] = useState(() => localStorage.getItem('musicIsPlaying') === 'true');
            const [currentTrackIndex, setCurrentTrackIndex] = useState(() => parseInt(localStorage.getItem('musicTrackIndex'), 10) || 0);

            useEffect(() => {
                localStorage.setItem('musicIsPlaying', isPlaying);
                if (isPlaying) {
                    audioRef.current.play().catch(e => console.error("Erro ao tocar música:", e));
                } else {
                    audioRef.current.pause();
                }
            }, [isPlaying]);

            useEffect(() => {
                localStorage.setItem('musicTrackIndex', currentTrackIndex);
                if (audioRef.current) {
                    audioRef.current.src = backgroundMusicPlaylist[currentTrackIndex];
                    if (isPlaying) {
                        audioRef.current.play().catch(e => console.error("Erro ao tocar música:", e));
                    }
                }
            }, [currentTrackIndex]);

            const handleNextTrack = () => {
                setCurrentTrackIndex(prevIndex => (prevIndex + 1) % backgroundMusicPlaylist.length);
            };

            const handleAudioEnded = () => {
                handleNextTrack();
            };

            useEffect(() => {
                const audio = audioRef.current;
                audio.volume = 0.5;
                audio.addEventListener('ended', handleAudioEnded);
                return () => {
                    audio.removeEventListener('ended', handleAudioEnded);
                };
            }, []);

            return (
                <div className="fixed bottom-4 right-4 bg-white/20 backdrop-blur-md text-white p-3 rounded-full shadow-lg flex items-center gap-3 z-50">
                    <audio ref={audioRef} src={backgroundMusicPlaylist[currentTrackIndex]} />
                    <button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 transition-all flex items-center justify-center">
                        {isPlaying ? '❚❚' : '▶'}
                    </button>
                    <button onClick={handleNextTrack} className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 transition-all flex items-center justify-center">
                        {'⏭'}
                    </button>
                </div>
            );
        };

        // ===================================================================================
        // --- CONFIGURAÇÃO DA ATIVIDADE ---
        // Preencha esta seção para definir o conteúdo e comportamento da atividade.
        // ===================================================================================
        const activityConfig = {
            title: "Quiz de História do Brasil", // Título que aparecerá na aba e na tela inicial
            subject: "historia",                 // Usado para o caminho da mídia (ex: /media/historia/...)
            activity: "quiz_brasil_colonial",    // Nome único da atividade, usado para mídia e CSV
            emoji: "📜",                         // Emoji principal da atividade
            primaryColor: "purple",              // Cor tema (usada em botões e gradientes)
        };

        const activityBlocks = [
            {
                id: 1,
                title: "Chegada dos Portugueses",
                difficulty: "Iniciante",
                emoji: "⛵",
                color: "from-blue-400 to-cyan-500",
                description: "O início da história, a chegada e os primeiros contatos.",
                questions: [
                    {
                        id: "bloco_1_questao_1",
                        statement: "Quem liderou a primeira expedição portuguesa que chegou oficialmente ao Brasil em 1500?",
                        options: [
                            { id: "a", text: "Vasco da Gama" },
                            { id: "b", text: "Pedro Álvares Cabral", correct: true },
                            { id: "c", text: "Cristóvão Colombo" }
                        ],
                    },
                    // Adicionar mais 4 questões para completar o bloco de 5
                ]
            },
            {
                id: 2,
                title: "Capitanias Hereditárias",
                difficulty: "Iniciante",
                emoji: "🗺️",
                color: "from-green-400 to-teal-500",
                description: "A primeira forma de administração do território brasileiro.",
                questions: [
                    {
                        id: "bloco_2_questao_1",
                        statement: "Qual era o principal objetivo do sistema de Capitanias Hereditárias?",
                        options: [
                            { id: "a", text: "Distribuir ouro para a população" },
                            { id: "b", text: "Povoar e defender o território", correct: true },
                            { id: "c", text: "Criar um novo rei para o Brasil" }
                        ],
                    },
                    // Adicionar mais 4 questões
                ]
            },
            // Adicionar mais blocos (intermediário, avançado) conforme necessário
        ];
        // ===================================================================================
        // --- FIM DA CONFIGURAÇÃO ---
        // ===================================================================================


        // --- SISTEMA DE GERENCIAMENTO DE MÍDIA ---
        // Gera os caminhos para os arquivos de áudio e imagem de forma padronizada.
        const MediaManager = {
            basePath: '../media',
            subject: activityConfig.subject,
            activity: activityConfig.activity,
            
            getQuestionMedia: function(blockNum, questionNum) {
                const blockPath = `${this.basePath}/${this.subject}/${this.activity}/bloco_${blockNum}`;
                return {
                    audio: {
                        enunciado: `${blockPath}/questao_${questionNum}_enunciado.mp3`,
                        explicacao: `${blockPath}/questao_${questionNum}_explicacao.mp3`
                    },
                    images: {
                        ilustracao: `${blockPath}/imagens/questao_${questionNum}_ilustracao.png`
                    }
                };
            },
            getFeedbackSound: function(type) {
                // Sons de feedback (acerto/erro)
                return `${this.basePath}/sons/feedback/${type}.mp3`;
            }
        };
        
        // Adiciona a propriedade 'media' a cada questão dinamicamente
        activityBlocks.forEach(block => {
            block.questions.forEach((question, index) => {
                question.media = MediaManager.getQuestionMedia(block.id, index + 1);
            });
        });


        // --- SISTEMA DE FEEDBACK SONORO ---
        // Centraliza a reprodução de sons para consistência.
        const SoundSystem = {
            play: (src) => {
                try {
                    const audio = new Audio(src);
                    audio.play().catch(e => console.warn("Reprodução de áudio bloqueada pelo navegador."));
                } catch (e) {
                    console.error("Erro ao tentar tocar o som:", src, e);
                }
            },
            success: () => {
                // Exemplo: Escolher um som de sucesso aleatório
                const soundId = Math.floor(Math.random() * 3) + 1; // 1, 2 ou 3
                SoundSystem.play(`../media/sons/feedback/acertos/acerto_${soundId}.mp3`);
            },
            error: () => {
                const soundId = Math.floor(Math.random() * 3) + 1; // 1, 2 ou 3
                SoundSystem.play(`../media/sons/feedback/erros/erro_${soundId}.mp3`);
            },
            click: () => {
                SoundSystem.play('../media/sons/feedback/click.mp3');
            }
        };


        // --- COMPONENTES REACT ---

        // Componente para a Tela Inicial
        const InitialScreen = ({ onStart, studentName, setStudentName, font, setFont }) => (
            <div className={`min-h-screen bg-gradient-to-br from-${activityConfig.primaryColor}-500 via-purple-500 to-pink-500 flex items-center justify-center p-4`}>
                <MusicPlayer />
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">{activityConfig.emoji}</div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{activityConfig.title}</h1>
                        <p className="text-gray-600">🚀 Uma nova aventura de aprendizado! 🎯</p>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-bold text-gray-700 mb-2">👤 Qual é o seu nome?</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl text-lg text-center focus:outline-none focus:border-purple-500 transition-colors duration-300"
                                placeholder="Digite seu nome aqui"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && onStart(studentName)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">🔤 Fonte para dislexia:</span>
                            <button
                                onClick={() => {
                                    const newFont = font === 'Comic Sans MS' ? 'OpenDyslexic' : 'Comic Sans MS';
                                    setFont(newFont);
                                    localStorage.setItem('selectedFont', newFont === 'OpenDyslexic' ? 'dyslexic' : 'normal');
                                }}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${font === 'OpenDyslexic' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {font === 'OpenDyslexic' ? '✅ Ativada' : '⚪ Desativada'}
                            </button>
                        </div>
                        <button
                            onClick={() => onStart(studentName)}
                            className={`w-full bg-gradient-to-r from-${activityConfig.primaryColor}-500 to-pink-500 text-white font-bold py-4 rounded-xl text-lg transition-all duration-300 hover:from-${activityConfig.primaryColor}-600 hover:to-pink-600 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                            disabled={!studentName.trim()}
                        >
                            🎯 COMEÇAR AVENTURA! 🚀
                        </button>
                        <button
                            onClick={() => window.location.href = '../index.html'}
                            className="w-full bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-all duration-300 hover:bg-gray-400 hover:shadow-lg"
                        >
                            🏠 Voltar ao Portal
                        </button>
                    </div>
                </div>
            </div>
        );

        // Componente para a Tela de Seleção de Blocos
        const BlockSelectionScreen = ({ studentName, onSelectBlock, onFinishSession }) => {
            const groupedLevels = {};
            activityBlocks.forEach(block => {
                if (!groupedLevels[block.difficulty]) {
                    groupedLevels[block.difficulty] = [];
                }
                groupedLevels[block.difficulty].push(block);
            });

            return (
                <div className={`min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4`}>
                    <MusicPlayer />
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-5xl font-bold text-white mb-2">🚀 Olá, {studentName}! 🚀</h1>
                            <p className="text-2xl text-white opacity-90">Escolha um bloco para começar!</p>
                        </div>
                        
                        {Object.entries(groupedLevels).map(([levelName, blocksInLevel]) => (
                            <div key={levelName} className="mb-12">
                                <h2 className="text-4xl font-bold text-center text-white mb-8">
                                    {levelName === 'Iniciante' && '🌱'} 
                                    {levelName === 'Intermediário' && '⚡'} 
                                    {levelName === 'Avançado' && '🔥'} 
                                    {' ' + levelName}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {blocksInLevel.map((block) => (
                                        <div 
                                            key={block.id}
                                            className="bg-white rounded-3xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
                                            onClick={() => onSelectBlock(block)}
                                        >
                                            <div className="text-center">
                                                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">{block.emoji}</div>
                                                <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${block.color} bg-clip-text text-transparent`}>
                                                    {block.title}
                                                </h3>
                                                <p className="text-gray-600 mb-4 text-lg">{block.description}</p>
                                                <div className="bg-gray-100 rounded-xl p-4 mb-4">
                                                    <p className="text-sm text-gray-600">⏱️ {block.questions.length} questões</p>
                                                </div>
                                                <button className={`w-full bg-gradient-to-r ${block.color} text-white font-bold py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-lg group-hover:scale-105`}>
                                                    🚀 COMEÇAR
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-6">
                            <button
                                onClick={onFinishSession}
                                className="bg-green-500 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:bg-green-600 hover:shadow-lg mr-4"
                            >
                                💾 Finalizar Sessão & Baixar Resultados
                            </button>
                            <button
                                onClick={() => window.location.href = '../index.html'}
                                className="bg-gray-500 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:bg-gray-600 hover:shadow-lg"
                            >
                                🏠 Voltar ao Portal
                            </button>
                        </div>
                    </div>
                </div>
            );
        };

        // Componente para a Tela da Atividade
        const ActivityScreen = ({ block, onBack, onComplete }) => {
            const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
            const [selectedOption, setSelectedOption] = useState(null);
            const [isCorrect, setIsCorrect] = useState(null);
            const [startTime, setStartTime] = useState(Date.now());
            const [audioError, setAudioError] = useState({});

            const question = block.questions[currentQuestionIndex];

            const handleAudioError = (audioType) => {
                setAudioError(prev => ({ ...prev, [audioType]: true }));
            };

            const handleAnswer = (option) => {
                if (selectedOption) return; // Impede múltiplas respostas

                SoundSystem.click();
                setSelectedOption(option);
                const correct = option.correct === true;
                setIsCorrect(correct);

                if (correct) {
                    SoundSystem.success();
                } else {
                    SoundSystem.error();
                }

                onComplete({
                    block,
                    question,
                    isCorrect: correct,
                    timeSpent: Math.round((Date.now() - startTime) / 1000)
                });

                setTimeout(() => {
                    if (currentQuestionIndex < block.questions.length - 1) {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                        setSelectedOption(null);
                        setIsCorrect(null);
                        setStartTime(Date.now());
                        setAudioError({});
                    } else {
                        // Bloco concluído - pode ir para uma tela de resumo do bloco
                        alert("Bloco concluído!");
                        onBack();
                    }
                }, correct ? 2000 : 3000);
            };

            return (
                <div className={`min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4`}>
                    <MusicPlayer />
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold text-gray-800">{block.emoji} {block.title}</h1>
                                <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">⬅️ Voltar</button>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div className={`bg-gradient-to-r ${block.color} h-4 rounded-full`} style={{ width: `${((currentQuestionIndex + 1) / block.questions.length) * 100}%` }}></div>
                            </div>
                            <div className="text-center font-bold text-gray-700 mt-2">📊 Questão {currentQuestionIndex + 1} de {block.questions.length}</div>
                        </div>

                        {/* Corpo da Questão */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <p className="text-2xl font-bold text-gray-800 mb-6">{question.statement}</p>

                            {/* Controles de Áudio Padronizados */}
                            <div className="media-controls mb-6 bg-gray-50 p-4 rounded-lg border">
                                <label className="block text-sm font-semibold text-blue-700 mb-2">🔊 Ouvir Enunciado:</label>
                                {!audioError.enunciado ? (
                                    <audio controls className="w-full" onError={() => handleAudioError('enunciado')} src={question.media.audio.enunciado}>Your browser does not support the audio element.</audio>
                                ) : (
                                    <div className="text-gray-500 italic text-sm">Áudio do enunciado indisponível.</div>
                                )}
                                <label className="block text-sm font-semibold text-green-700 mb-2 mt-4">💡 Ouvir Explicação (após responder):</label>
                                {!audioError.explicacao && selectedOption ? (
                                    <audio controls className="w-full" onError={() => handleAudioError('explicacao')} src={question.media.audio.explicacao}>Your browser does not support the audio element.</audio>
                                ) : (
                                    <div className="text-gray-500 italic text-sm">{selectedOption ? "Áudio da explicação indisponível." : "Responda para liberar a explicação."}</div>
                                )}
                            </div>

                            {/* ====================================================================== */}
                            {/* ÁREA DE INTERAÇÃO DA QUESTÃO (EXEMPLO: QUIZ DE MÚLTIPLA ESCOLHA)      */}
                            {/* Adapte esta seção para o tipo de interação da sua atividade.         */}
                            {/* ====================================================================== */}
                            <div className="space-y-4">
                                {question.options.map(option => {
                                    let buttonClass = "w-full p-5 text-left rounded-lg border-2 text-lg transition-all duration-200 ";
                                    if (selectedOption) {
                                        if (option.correct) {
                                            buttonClass += "bg-green-100 border-green-400 text-green-800 correct-answer-animation";
                                        } else if (option.id === selectedOption.id) {
                                            buttonClass += "bg-red-100 border-red-400 text-red-800 wrong-answer-animation";
                                        } else {
                                            buttonClass += "bg-gray-100 border-gray-200 opacity-60";
                                        }
                                    } else {
                                        buttonClass += "bg-white border-gray-300 hover:border-purple-500 hover:bg-purple-50";
                                    }

                                    return (
                                        <button key={option.id} onClick={() => handleAnswer(option)} disabled={!!selectedOption} className={buttonClass}>
                                            <span className="font-bold mr-3">{option.id.toUpperCase()})</span>
                                            {option.text}
                                        </button>
                                    );
                                })}
                            </div>
                            {/* ====================================================================== */}
                            {/* FIM DA ÁREA DE INTERAÇÃO                                               */}
                            {/* ====================================================================== */}
                        </div>
                    </div>
                </div>
            );
        };


        // Componente Principal da Aplicação
        const AtividadeTemplate = () => {
            const [studentName, setStudentName] = useState(localStorage.getItem('studentName') || '');
            const [font, setFont] = useState(localStorage.getItem('selectedFont') === 'dyslexic' ? 'OpenDyslexic' : 'Comic Sans MS');
            const [currentScreen, setCurrentScreen] = useState('initial'); // initial, blockSelection, activity
            const [selectedBlock, setSelectedBlock] = useState(null);
            const [sessionResults, setSessionResults] = useState([]);

            useEffect(() => {
                document.title = activityConfig.title;
                document.body.className = font === 'OpenDyslexic' ? 'font-dyslexic' : '';
            }, [font]);

            const handleStart = (name) => {
                if (name.trim()) {
                    setStudentName(name);
                    localStorage.setItem('studentName', name);
                    setCurrentScreen('blockSelection');
                }
            };

            const handleSelectBlock = (block) => {
                setSelectedBlock(block);
                setCurrentScreen('activity');
            };
            
            const handleCompleteQuestion = (result) => {
                const newResult = {
                    Nome: studentName,
                    Materia: activityConfig.subject,
                    Atividade: activityConfig.activity,
                    Bloco: `${result.block.difficulty}_Bloco_${result.block.id}`,
                    Questao: result.question.id,
                    Tempo_Execucao: result.timeSpent + 's',
                    Acertos: result.isCorrect ? 1 : 0,
                    Erros: result.isCorrect ? 0 : 1,
                    Score: result.isCorrect ? '100%' : '0%'
                };
                setSessionResults(prev => [...prev, newResult]);
            };

            const handleFinishSession = () => {
                if (sessionResults.length === 0) {
                    alert("Nenhuma atividade foi completada para gerar o relatório.");
                    return;
                }
                
                const header = 'Nome,Materia,Atividade,Bloco,Questao,Tempo_Execucao,Acertos,Erros,Score
';
                const csvContent = sessionResults.map(r => Object.values(r).join(',')).join('
');
                const fullContent = header + csvContent;
                
                const blob = new Blob([fullContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.href = url;
                
                const dateStr = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
                const studentNameForFile = studentName.replace(/[^a-zA-Z0-9]/g, '_');
                link.download = `${activityConfig.activity}_${studentNameForFile}_${dateStr}.csv`;
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                alert(`🎉 Dados exportados com sucesso!`);
            };

            switch (currentScreen) {
                case 'initial':
                    return <InitialScreen onStart={handleStart} studentName={studentName} setStudentName={setStudentName} font={font} setFont={setFont} />;
                case 'blockSelection':
                    return <BlockSelectionScreen studentName={studentName} onSelectBlock={handleSelectBlock} onFinishSession={handleFinishSession} />;
                case 'activity':
                    return <ActivityScreen block={selectedBlock} onBack={() => setCurrentScreen('blockSelection')} onComplete={handleCompleteQuestion} />;
                default:
                    return <InitialScreen onStart={handleStart} studentName={studentName} setStudentName={setStudentName} font={font} setFont={setFont} />;
            }
        };

        ReactDOM.render(<AtividadeTemplate />, document.getElementById('root'));
    </script>
</body>
</html>
```
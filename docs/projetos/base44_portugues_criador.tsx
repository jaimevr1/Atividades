import React, { useState } from 'react';
import { Sparkles, Wand2, Book, Trash2, Download, Share2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InvokeLLM } from '@/integrations/Core';

const storyElements = {
  personagens: [
    { id: 'p1', text: 'Steve (Minecraft)', emoji: '🧱', theme: 'minecraft' },
    { id: 'p2', text: 'Alex (Minecraft)', emoji: '⛏️', theme: 'minecraft' },
    { id: 'p3', text: 'Jogador de Roblox', emoji: '🎮', theme: 'roblox' },
    { id: 'p4', text: 'YouTuber Famoso', emoji: '🎬', theme: 'youtube' },
    { id: 'p5', text: 'Enderman', emoji: '👾', theme: 'minecraft' },
    { id: 'p6', text: 'Avatar Mágico', emoji: '🧙', theme: 'roblox' },
  ],
  personalidades: [
    { id: 'pe1', text: 'Corajoso', emoji: '💪', color: 'from-red-400 to-orange-500' },
    { id: 'pe2', text: 'Engraçado', emoji: '😄', color: 'from-yellow-400 to-amber-500' },
    { id: 'pe3', text: 'Inteligente', emoji: '🧠', color: 'from-blue-400 to-cyan-500' },
    { id: 'pe4', text: 'Amigável', emoji: '🤗', color: 'from-green-400 to-emerald-500' },
    { id: 'pe5', text: 'Curioso', emoji: '🔍', color: 'from-purple-400 to-pink-500' },
    { id: 'pe6', text: 'Criativo', emoji: '🎨', color: 'from-indigo-400 to-violet-500' },
  ],
  objetivos: [
    { id: 'o1', text: 'Encontrar um tesouro perdido', emoji: '💎' },
    { id: 'o2', text: 'Salvar um amigo em perigo', emoji: '🦸' },
    { id: 'o3', text: 'Vencer uma competição épica', emoji: '🏆' },
    { id: 'o4', text: 'Construir algo incrível', emoji: '🏗️' },
    { id: 'o5', text: 'Descobrir um mistério', emoji: '🕵️' },
    { id: 'o6', text: 'Fazer novos amigos', emoji: '👥' },
  ],
  antagonistas: [
    { id: 'a1', text: 'Creeper explosivo', emoji: '💥', theme: 'minecraft' },
    { id: 'a2', text: 'Hacker misterioso', emoji: '👤', theme: 'roblox' },
    { id: 'a3', text: 'Dragão do End', emoji: '🐉', theme: 'minecraft' },
    { id: 'a4', text: 'Robô malvado', emoji: '🤖', theme: 'roblox' },
    { id: 'a5', text: 'Bruxa travessa', emoji: '🧙‍♀️', theme: 'minecraft' },
    { id: 'a6', text: 'Vilão invejoso', emoji: '😈', theme: 'geral' },
  ],
};

const categories = [
  { id: 'personagens', name: 'PERSONAGEM', icon: '👤', color: 'from-blue-500 to-cyan-500' },
  { id: 'personalidades', name: 'PERSONALIDADE', icon: '✨', color: 'from-purple-500 to-pink-500' },
  { id: 'objetivos', name: 'OBJETIVO', icon: '🎯', color: 'from-green-500 to-emerald-500' },
  { id: 'antagonistas', name: 'ANTAGONISTA', icon: '⚔️', color: 'from-red-500 to-orange-500' },
];

export default function ConstrutorHistorias() {
  const [selectedElements, setSelectedElements] = useState({
    personagens: null,
    personalidades: null,
    objetivos: null,
    antagonistas: null,
  });
  const [generatedStory, setGeneratedStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, item, category) => {
    setDraggedItem({ item, category });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCategory) => {
    e.preventDefault();
    if (draggedItem && draggedItem.category === targetCategory) {
      setSelectedElements(prev => ({
        ...prev,
        [targetCategory]: draggedItem.item,
      }));
    }
    setDraggedItem(null);
  };

  const removeElement = (category) => {
    setSelectedElements(prev => ({
      ...prev,
      [category]: null,
    }));
  };

  const clearAll = () => {
    setSelectedElements({
      personagens: null,
      personalidades: null,
      objetivos: null,
      antagonistas: null,
    });
    setGeneratedStory('');
  };

  const canGenerate = Object.values(selectedElements).every(el => el !== null);

  const generateStory = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    setGeneratedStory('');

    try {
      const prompt = `Você é um contador de histórias para crianças de 9-11 anos.

Crie uma história CURTA e DIVERTIDA com os seguintes elementos:
- Personagem principal: ${selectedElements.personagens.text}
- Personalidade: ${selectedElements.personalidades.text}
- Objetivo: ${selectedElements.objetivos.text}
- Antagonista/Desafio: ${selectedElements.antagonistas.text}

REGRAS IMPORTANTES:
- A história deve ter NO MÁXIMO 10 linhas
- Use linguagem simples e divertida
- Inclua uma lição positiva
- Tenha começo, meio e fim
- Seja criativa e emocionante
- Use emojis quando apropriado (máximo 3)

Escreva apenas a história, sem título ou introdução.`;

      const response = await InvokeLLM({
        prompt: prompt,
      });

      setGeneratedStory(response);
    } catch (error) {
      setGeneratedStory('Ops! Algo deu errado ao criar a história. Tente novamente! 😊');
    }

    setIsGenerating(false);
  };

  const downloadStory = () => {
    const text = `🎭 MINHA HISTÓRIA CRIADA 🎭\n\n${generatedStory}\n\n---\nCriado com o Construtor de Histórias`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minha-historia.txt';
    a.click();
  };

  if (showTutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
        <Card className="max-w-3xl w-full bg-white/95 backdrop-blur-xl p-8 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="text-7xl mb-4">📚</div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Construtor de Histórias
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Arraste os elementos e crie histórias incríveis com ajuda da inteligência artificial!
            </p>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 my-8">
              <h3 className="font-bold text-xl text-gray-800 mb-4">Como funciona?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-gray-800">Escolha os elementos</p>
                    <p className="text-sm text-gray-600">Arraste personagem, personalidade, objetivo e antagonista</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-gray-800">Gere sua história</p>
                    <p className="text-sm text-gray-600">Clique no botão mágico e deixe a IA criar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-gray-800">Leia e compartilhe</p>
                    <p className="text-sm text-gray-600">Aproveite sua história personalizada!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="font-semibold text-gray-800">Crie quantas quiser</p>
                    <p className="text-sm text-gray-600">Teste combinações diferentes!</p>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setShowTutorial(false)}
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl"
            >
              Começar a Criar! <Wand2 className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-6 shadow-2xl border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Book className="w-8 h-8 text-yellow-300" />
              <div>
                <h1 className="text-3xl font-black text-white">Construtor de Histórias</h1>
                <p className="text-white/80 text-sm">Monte sua história e deixe a mágica acontecer!</p>
              </div>
            </div>
            <Button
              onClick={clearAll}
              variant="outline"
              className="bg-white/20 hover:bg-white/30 border-white/30 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar Tudo
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side - Element Selection */}
          <div className="space-y-4">
            {categories.map(category => {
              const categoryData = category.id;
              const elements = storyElements[categoryData];
              
              return (
                <Card key={category.id} className="bg-white/95 backdrop-blur-xl shadow-xl border-2 border-white/50 overflow-hidden">
                  <div className={`bg-gradient-to-r ${category.color} p-4`}>
                    <h3 className="text-white font-black text-lg flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.name}
                    </h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {elements.map(element => (
                        <div
                          key={element.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, element, categoryData)}
                          className="bg-gradient-to-r from-gray-100 to-white px-4 py-2 rounded-xl font-bold text-gray-800 cursor-move hover:scale-110 transition-all shadow-md border-2 border-gray-200 hover:border-purple-400 flex items-center gap-2"
                        >
                          <span className="text-xl">{element.emoji}</span>
                          <span className="text-sm">{element.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Right Side - Story Builder */}
          <div className="space-y-4">
            {/* Drop Zones */}
            <Card className="bg-white/95 backdrop-blur-xl shadow-xl border-2 border-white/50 p-6">
              <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                Elementos da História
              </h2>
              
              <div className="space-y-3">
                {categories.map(category => {
                  const selected = selectedElements[category.id];
                  
                  return (
                    <div
                      key={category.id}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, category.id)}
                      className={`rounded-xl p-4 border-2 border-dashed transition-all min-h-[80px] ${
                        selected 
                          ? `bg-gradient-to-r ${category.color} border-white` 
                          : 'bg-gray-50 border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <p className={`font-bold text-sm ${selected ? 'text-white' : 'text-gray-500'}`}>
                              {category.name}
                            </p>
                            {selected ? (
                              <p className="text-white font-bold flex items-center gap-2">
                                <span className="text-xl">{selected.emoji}</span>
                                {selected.text}
                              </p>
                            ) : (
                              <p className="text-gray-400 text-xs">Arraste um elemento aqui</p>
                            )}
                          </div>
                        </div>
                        {selected && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeElement(category.id)}
                            className="text-white hover:bg-white/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={generateStory}
                disabled={!canGenerate || isGenerating}
                className="w-full h-14 mt-6 text-lg font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Criando sua história mágica...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Gerar História Mágica!
                    <Sparkles className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </Card>

            {/* Generated Story */}
            {(generatedStory || isGenerating) && (
              <Card className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 shadow-xl border-2 border-yellow-400 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                    <Book className="w-6 h-6 text-purple-600" />
                    Sua História
                  </h2>
                  {generatedStory && (
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={downloadStory}
                        className="bg-white hover:bg-gray-100"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="animate-bounce text-6xl">✨</div>
                    <p className="text-lg font-semibold text-gray-700">A mágica está acontecendo...</p>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl p-6 shadow-inner">
                    <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
                      {generatedStory}
                    </p>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        {!generatedStory && (
          <Card className="mt-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4">
            <div className="flex items-center justify-between text-white mb-2">
              <span className="font-semibold">Progresso</span>
              <span>{Object.values(selectedElements).filter(el => el !== null).length} / 4 elementos</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(Object.values(selectedElements).filter(el => el !== null).length / 4) * 100}%` }}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
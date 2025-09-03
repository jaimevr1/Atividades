import React, { useState } from 'react';
import Button from './components/ui/Button';
import Card from './components/ui/Card';
import ProgressBar from './components/ui/ProgressBar';
import Badge from './components/ui/Badge';
import Modal from './components/ui/Modal';
import CelebrationModal from './components/feedback/CelebrationModal';
import AudioController from './components/audio/AudioController';

const EducationalGamesShowcase = () => {
  const [activeDemo, setActiveDemo] = useState('portal');
  const [showModal, setShowModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedFont, setSelectedFont] = useState('modern');

  const demos = [
    {
      id: 'portal',
      title: '🎯 Portal Principal',
      description: 'Página inicial com seleção de atividades e fontes acessíveis',
      color: 'from-purple-500 to-pink-500',
      link: '../index.html'
    },
    {
      id: 'constructor',
      title: '📚 Construtor de História',
      description: 'Jogo de arrastar e soltar para organizar eventos históricos',
      color: 'from-orange-500 to-red-500',
      link: '../pages/construtor_historia_brasil.html'
    },
    {
      id: 'race',
      title: '🏃‍♂️ Corrida da História',
      description: 'Quiz cronometrado de eventos históricos brasileiros',
      color: 'from-blue-500 to-purple-500',
      link: '../pages/corrida_historia_brasil.html'
    },
    {
      id: 'detective',
      title: '🕵️‍♂️ Detective da História',
      description: 'Investigação de mistérios da Independência do Brasil',
      color: 'from-amber-500 to-orange-500',
      link: '../pages/detective_historia_independencia.html'
    },
    {
      id: 'math',
      title: '🧮 Quiz de Matemática',
      description: 'Identificação de operações matemáticas com problemas contextualizados',
      color: 'from-green-500 to-blue-500',
      link: '../pages/operacoes_matematicas.html'
    }
  ];

  const features = [
    {
      title: 'Design Kid-Friendly',
      description: 'Cores suaves, cantos arredondados e elementos visuais apropriados para crianças de 7-11 anos',
      icon: '🎨',
      demo: () => (
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-2xl">
                🎯
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Exemplo de Card</h3>
                <p className="text-gray-600">Design moderno e atrativo</p>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      title: 'Fontes Acessíveis',
      description: 'Opções de OpenDyslexic, Quicksand e Poppins para diferentes necessidades',
      icon: '🔤',
      demo: () => (
        <div className="space-y-3">
          {[
            { key: 'modern', label: 'Moderna (Poppins)', class: 'font-modern' },
            { key: 'playful', label: 'Divertida (Quicksand)', class: 'font-playful' },
            { key: 'dyslexic', label: 'Acessível (OpenDyslexic)', class: 'font-dyslexic' }
          ].map((font) => (
            <button
              key={font.key}
              onClick={() => setSelectedFont(font.key)}
              className={`w-full p-3 rounded-xl border-2 transition-all ${font.class} ${
                selectedFont === font.key 
                  ? 'border-purple-400 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              {font.label}
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Sistema de Progresso',
      description: 'Barras de progresso, badges e celebrações para motivar o aprendizado',
      icon: '🏆',
      demo: () => (
        <div className="space-y-4">
          <ProgressBar progress={75} max={100} label="Progresso do Jogo" />
          <div className="flex flex-wrap gap-2">
            <Badge type="gold" icon="🏆">Ouro</Badge>
            <Badge type="silver" icon="🥈">Prata</Badge>
            <Badge type="bronze" icon="🥉">Bronze</Badge>
            <Badge type="speed" icon="⚡">Velocidade</Badge>
          </div>
          <Button 
            variant="success" 
            onClick={() => setShowCelebration(true)}
            className="w-full"
          >
            🎉 Mostrar Celebração
          </Button>
        </div>
      )
    },
    {
      title: 'Responsivo Mobile',
      description: 'Layout adaptável para tablets e smartphones com controles touch-friendly',
      icon: '📱',
      demo: () => (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="primary" size="lg">Mobile OK</Button>
            <Button variant="secondary" size="lg">Touch Ready</Button>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Redimensione a janela para ver a responsividade
          </p>
        </div>
      )
    },
    {
      title: 'Interações Modernas',
      description: 'Animações suaves, hover effects e transições que encantam sem distrair',
      icon: '✨',
      demo: () => (
        <div className="grid grid-cols-2 gap-4">
          <Card interactive className="text-center p-4">
            <div className="text-3xl mb-2">🎮</div>
            <p className="text-sm font-semibold">Hover me!</p>
          </Card>
          <Card interactive className="text-center p-4">
            <div className="text-3xl mb-2">🌟</div>
            <p className="text-sm font-semibold">Click me!</p>
          </Card>
        </div>
      )
    },
    {
      title: 'Componentes Reutilizáveis',
      description: 'Sistema de design consistente com componentes modulares',
      icon: '🧩',
      demo: () => (
        <div className="space-y-3">
          <Button variant="primary" icon="🚀">Botão Primário</Button>
          <Button variant="secondary" icon="⭐">Botão Secundário</Button>
          <Button variant="success" icon="✅" onClick={() => setShowModal(true)}>
            Abrir Modal
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-4 ${
      selectedFont === 'dyslexic' ? 'font-dyslexic' : 
      selectedFont === 'playful' ? 'font-playful' : 'font-modern'
    }`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            🎓 Jogos Educativos Modernos
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Design kid-friendly para crianças de 7-11 anos com foco em acessibilidade
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {demos.map((demo) => (
              <a
                key={demo.id}
                href={demo.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 bg-gradient-to-r ${demo.color} text-white rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
              >
                {demo.title}
              </a>
            ))}
          </div>
        </div>

        {/* Features Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
              </div>
              <div className="mt-auto">
                {feature.demo()}
              </div>
            </Card>
          ))}
        </div>

        {/* Design Principles */}
        <Card className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            🎨 Princípios de Design
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '👁️', title: 'Visão Confortável', desc: 'Cores suaves que não cansam os olhos' },
              { icon: '📱', title: 'Mobile First', desc: 'Otimizado para dispositivos móveis' },
              { icon: '♿', title: 'Acessibilidade', desc: 'Fontes especiais e alto contraste' },
              { icon: '🎯', title: 'Foco no Usuário', desc: 'Interface intuitiva para crianças' }
            ].map((principle, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-purple-100">
                <div className="text-3xl mb-2">{principle.icon}</div>
                <h4 className="font-bold text-gray-800 mb-1">{principle.title}</h4>
                <p className="text-sm text-gray-600">{principle.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Color Palette */}
        <Card className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            🌈 Paleta de Cores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Primary', color: 'bg-purple-500', hex: '#667eea' },
              { name: 'Secondary', color: 'bg-pink-500', hex: '#764ba2' },
              { name: 'Success', color: 'bg-green-500', hex: '#10b981' },
              { name: 'Warning', color: 'bg-yellow-500', hex: '#f59e0b' },
              { name: 'Error', color: 'bg-red-500', hex: '#ef4444' },
              { name: 'Info', color: 'bg-blue-500', hex: '#3b82f6' }
            ].map((colorItem, index) => (
              <div key={index} className="text-center">
                <div className={`w-full h-20 ${colorItem.color} rounded-2xl mb-2 shadow-lg`}></div>
                <p className="font-semibold text-gray-800 text-sm">{colorItem.name}</p>
                <p className="text-gray-500 text-xs">{colorItem.hex}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            ✨ Desenvolvido com foco na experiência educativa de qualidade
          </p>
          <div className="flex justify-center space-x-4">
            <span className="text-2xl animate-bounce">🎓</span>
            <span className="text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>📚</span>
            <span className="text-2xl animate-bounce" style={{animationDelay: '0.4s'}}>🎯</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="🎉 Exemplo de Modal"
      >
        <p className="text-gray-600 mb-4">
          Este é um exemplo de modal moderno com backdrop blur e animações suaves.
        </p>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Confirmar
          </Button>
        </div>
      </Modal>

      <CelebrationModal
        isVisible={showCelebration}
        message="Você explorou os componentes modernos!"
        onClose={() => setShowCelebration(false)}
        type="success"
      />

      {/* Audio Controller */}
      <AudioController
        backgroundMusicFiles={[]}
        volume={0.1}
        autoPlay={false}
      />
    </div>
  );
};

export default EducationalGamesShowcase;
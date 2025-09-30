// Playlist global de música de fundo persistente
const backgroundMusicPlaylist = [
    'media/musicas/theme_1.mp3',
    'media/musicas/theme_2.mp3',
    'media/musicas/theme_3.mp3',
    'media/musicas/theme_4.mp3',
    'media/musicas/theme_5.mp3',
    'media/musicas/theme_6.mp3',
    'media/musicas/theme_7.mp3',
    'media/musicas/theme_8.mp3',
    'media/musicas/theme_9.mp3'
];

// Sistema de música global persistente
window.PersistentMusicSystem = {
    audioElement: null,
    isPlaying: false,
    currentTrackIndex: 0,
    volume: 0.5,
    fadingOut: false,

    init: function() {
        // Se já existe um elemento de áudio global, não criar outro
        if (this.audioElement) return;

        // Criar elemento de áudio global
        this.audioElement = document.createElement('audio');
        this.audioElement.volume = this.volume;
        this.audioElement.loop = false;
        document.body.appendChild(this.audioElement);

        // Carregar estado do localStorage
        this.isPlaying = localStorage.getItem('musicIsPlaying') === 'true';
        this.currentTrackIndex = parseInt(localStorage.getItem('musicTrackIndex'), 10) || 0;

        // Configurar evento de fim da música
        this.audioElement.addEventListener('ended', () => {
            this.nextTrack();
        });

        // Configurar fonte da música atual
        this.updateSource();

        // Se deveria estar tocando, começar a tocar
        if (this.isPlaying) {
            this.play();
        }
    },

    updateSource: function() {
        if (this.audioElement) {
            const basePath = window.location.pathname.includes('/pages/') ? '../' : '';
            this.audioElement.src = basePath + backgroundMusicPlaylist[this.currentTrackIndex];
        }
    },

    play: function() {
        if (this.audioElement && !this.fadingOut) {
            this.isPlaying = true;
            localStorage.setItem('musicIsPlaying', 'true');
            this.audioElement.play().catch(e => console.warn('Erro ao reproduzir música:', e));
        }
    },

    pause: function() {
        if (this.audioElement) {
            this.isPlaying = false;
            localStorage.setItem('musicIsPlaying', 'false');
            this.audioElement.pause();
        }
    },

    toggle: function() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },

    nextTrack: function() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % backgroundMusicPlaylist.length;
        localStorage.setItem('musicTrackIndex', this.currentTrackIndex);
        this.updateSource();
        if (this.isPlaying) {
            this.play();
        }
    },

    setVolume: function(volume) {
        this.volume = volume;
        if (this.audioElement) {
            this.audioElement.volume = volume;
        }
    },

    fadeOut: function(callback) {
        if (!this.audioElement) return;

        this.fadingOut = true;
        const originalVolume = this.audioElement.volume;
        const fadeStep = originalVolume / 20; // 20 steps

        const fadeInterval = setInterval(() => {
            if (this.audioElement.volume > fadeStep) {
                this.audioElement.volume -= fadeStep;
            } else {
                this.audioElement.volume = 0;
                clearInterval(fadeInterval);
                if (callback) callback();
            }
        }, 50);
    },

    fadeIn: function(targetVolume = this.volume) {
        if (!this.audioElement) return;

        this.fadingOut = false;
        this.audioElement.volume = 0;
        const fadeStep = targetVolume / 20; // 20 steps

        const fadeInterval = setInterval(() => {
            if (this.audioElement.volume < targetVolume - fadeStep) {
                this.audioElement.volume += fadeStep;
            } else {
                this.audioElement.volume = targetVolume;
                clearInterval(fadeInterval);
            }
        }, 50);
    },

    // Reduzir volume temporariamente (para áudios das atividades)
    duckVolume: function() {
        this.setVolume(0.2);
    },

    // Restaurar volume normal
    restoreVolume: function() {
        this.setVolume(0.5);
    }
};

// Inicializar o sistema assim que a página carregar
document.addEventListener('DOMContentLoaded', function() {
    window.PersistentMusicSystem.init();
});

// Também inicializar se já carregou
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.PersistentMusicSystem.init();
    });
} else {
    window.PersistentMusicSystem.init();
}

// Expor para uso global
window.musicPlayerSetVolume = function(volume) {
    window.PersistentMusicSystem.setVolume(volume);
};
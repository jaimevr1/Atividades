// Text typing effect implementation for educational activities
class TextTypeEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.text = options.text || element.getAttribute('data-text') || '';
    this.textArray = Array.isArray(this.text) ? this.text : [this.text];
    this.typingSpeed = options.typingSpeed || parseInt(element.getAttribute('data-typing-speed')) || 50;
    this.initialDelay = options.initialDelay || parseInt(element.getAttribute('data-initial-delay')) || 0;
    this.pauseDuration = options.pauseDuration || parseInt(element.getAttribute('data-pause-duration')) || 2000;
    this.deletingSpeed = options.deletingSpeed || parseInt(element.getAttribute('data-deleting-speed')) || 30;
    this.loop = options.loop !== undefined ? options.loop : element.getAttribute('data-loop') !== 'false';
    this.showCursor = options.showCursor !== undefined ? options.showCursor : element.getAttribute('data-show-cursor') !== 'false';
    this.cursorCharacter = options.cursorCharacter || element.getAttribute('data-cursor-character') || '|';
    this.currentIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.timeout = null;
    
    this.init();
  }
  
  init() {
    // Create content and cursor elements
    this.contentElement = document.createElement('span');
    this.contentElement.className = 'text-type__content';
    this.element.appendChild(this.contentElement);
    
    if (this.showCursor) {
      this.cursorElement = document.createElement('span');
      this.cursorElement.className = 'text-type__cursor';
      this.cursorElement.textContent = this.cursorCharacter;
      this.element.appendChild(this.cursorElement);
      
      // Start cursor blinking
      this.startCursorBlink();
    }
    
    // Start typing effect after initial delay
    setTimeout(() => this.typeText(), this.initialDelay);
  }
  
  typeText() {
    const currentText = this.textArray[this.currentIndex];
    
    if (this.isDeleting) {
      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % this.textArray.length;
        setTimeout(() => this.typeText(), 50); // Small delay before typing next text
      } else {
        this.currentCharIndex--;
        this.contentElement.textContent = currentText.substring(0, this.currentCharIndex);
        this.timeout = setTimeout(() => this.typeText(), this.deletingSpeed);
      }
    } else {
      if (this.currentCharIndex < currentText.length) {
        this.contentElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
        this.currentCharIndex++;
        this.timeout = setTimeout(() => this.typeText(), this.typingSpeed);
      } else {
        // Pause after finishing the text
        setTimeout(() => {
          if (this.textArray.length > 1) {
            this.isDeleting = true;
            this.timeout = setTimeout(() => this.typeText(), 500); // Delay before deleting
          } else {
            // If there's only one text, optionally loop
            if (this.loop) {
              this.isDeleting = true;
              this.timeout = setTimeout(() => this.typeText(), 500); // Delay before deleting
            }
          }
        }, this.pauseDuration);
      }
    }
  }
  
  startCursorBlink() {
    let isVisible = true;
    this.cursorElement.style.opacity = '1';
    
    this.blinkInterval = setInterval(() => {
      if (isVisible) {
        this.cursorElement.style.opacity = '0';
      } else {
        this.cursorElement.style.opacity = '1';
      }
      isVisible = !isVisible;
    }, 500);
  }
  
  destroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.blinkInterval) {
      clearInterval(this.blinkInterval);
    }
    this.element.innerHTML = this.textArray[this.currentIndex];
  }
}

// Initialize TextTypeEffect on elements with the data-text-type attribute
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-text-type]');
  elements.forEach(el => {
    new TextTypeEffect(el);
  });
});

// Export for use as a module if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TextTypeEffect;
}
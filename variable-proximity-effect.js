// Variable Proximity Effect - Highlight text based on mouse proximity
class VariableProximityEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.label = options.label || element.getAttribute('data-label') || element.textContent || '';
    this.fromFontVariationSettings = options.fromFontVariationSettings || 
      element.getAttribute('data-from-font-variation-settings') || "'wght' 400, 'opsz' 9";
    this.toFontVariationSettings = options.toFontVariationSettings || 
      element.getAttribute('data-to-font-variation-settings') || "'wght' 1000, 'opsz' 40";
    this.radius = options.radius || parseInt(element.getAttribute('data-radius')) || 50;
    this.falloff = options.falloff || element.getAttribute('data-falloff') || 'linear';
    this.container = options.container || 
      (element.closest('[data-proximity-container]') || document.body);
    
    // Parse font variation settings
    this.fromSettings = this.parseFontVariationSettings(this.fromFontVariationSettings);
    this.toSettings = this.parseFontVariationSettings(this.toFontVariationSettings);
    
    // Initialize
    this.init();
  }
  
  parseFontVariationSettings(settingsStr) {
    const settings = new Map();
    settingsStr
      .split(',')
      .map(s => s.trim())
      .forEach(s => {
        const [name, value] = s.split(' ');
        settings.set(name.replace(/['"]/g, ''), parseFloat(value));
      });
    return settings;
  }
  
  init() {
    // Split text into individual characters
    this.element.innerHTML = '';
    this.letters = [];
    
    const words = this.label.split(' ');
    let letterIndex = 0;
    
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      
      word.split('').forEach(letter => {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = letter;
        letterSpan.style.display = 'inline-block';
        letterSpan.style.fontVariationSettings = this.fromFontVariationSettings;
        letterSpan.setAttribute('data-letter-index', letterIndex);
        wordSpan.appendChild(letterSpan);
        this.letters.push(letterSpan);
        letterIndex++;
      });
      
      if (wordIndex < words.length - 1) {
        const spaceSpan = document.createElement('span');
        spaceSpan.style.display = 'inline-block';
        spaceSpan.innerHTML = '&nbsp;';
        wordSpan.appendChild(spaceSpan);
      }
      
      this.element.appendChild(wordSpan);
    });
    
    // Add mouse move listener to container
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.container.addEventListener('mousemove', this.handleMouseMove);
    
    // Add touch move listener as well
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.container.addEventListener('touchmove', this.handleTouchMove);
  }
  
  handleMouseMove(e) {
    this.updateLetterEffects(e.clientX, e.clientY);
  }
  
  handleTouchMove(e) {
    if (e.touches.length > 0) {
      this.updateLetterEffects(e.touches[0].clientX, e.touches[0].clientY);
    }
  }
  
  updateLetterEffects(mouseX, mouseY) {
    const containerRect = this.container.getBoundingClientRect();
    const containerX = containerRect.left;
    const containerY = containerRect.top;
    
    this.letters.forEach(letter => {
      const rect = letter.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - containerX;
      const letterCenterY = rect.top + rect.height / 2 - containerY;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - letterCenterX, 2) + 
        Math.pow(mouseY - letterCenterY, 2)
      );
      
      if (distance >= this.radius) {
        letter.style.fontVariationSettings = this.fromFontVariationSettings;
        return;
      }
      
      const falloffValue = this.calculateFalloff(distance);
      
      // Interpolate each font variation setting
      const newSettings = Array.from(this.fromSettings.entries()).map(([axis, fromValue]) => {
        const toValue = this.toSettings.get(axis) || fromValue;
        const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
        return `'${axis}' ${interpolatedValue}`;
      }).join(', ');
      
      letter.style.fontVariationSettings = newSettings;
    });
  }
  
  calculateFalloff(distance) {
    const norm = Math.min(Math.max(1 - distance / this.radius, 0), 1);
    switch (this.falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (this.radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  }
  
  destroy() {
    this.container.removeEventListener('mousemove', this.handleMouseMove);
    this.container.removeEventListener('touchmove', this.handleTouchMove);
    this.element.innerHTML = this.label;
  }
}

// Initialize VariableProximityEffect on elements with the data-proximity attribute
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-proximity]');
  elements.forEach(el => {
    new VariableProximityEffect(el);
  });
});

// Export for use as a module if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VariableProximityEffect;
}
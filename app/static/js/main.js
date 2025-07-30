/**
 * Haim Yafim's Vault Terminal - Main JavaScript
 * Enhanced functionality for the Fallout-themed personal website
 */

// ===== UTILITY FUNCTIONS =====
const utils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if user prefers reduced motion
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    // Generate random terminal-style text animation
    async typeText(element, text, speed = 50) {
        if (this.prefersReducedMotion()) {
            element.textContent = text;
            return;
        }

        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }
};

// ===== MAIN APPLICATION CLASS =====
class VaultTerminal {
    constructor() {
        this.isInitialized = false;
        this.highContrastMode = false;
        this.terminalSounds = null;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('> Initializing Vault-Tec Terminal...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }

        this.isInitialized = true;
    }

    setupEventListeners() {
        // Enhanced email click functionality
        this.setupEmailClick();
        
        // Accessibility toggle
        this.setupAccessibilityToggle();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Terminal animations
        this.setupTerminalAnimations();
        
        // Responsive handlers
        this.setupResponsiveHandlers();
        
        // Error handling
        this.setupErrorHandling();

        // Terminal commands
        this.initTerminalCommands();

        // Initialize mantra typing animation
        setTimeout(() => {
            this.initMantraTyping();
        }, 2000); // Start after 2 seconds

        console.log('> Vault Terminal Systems Online');
    }

    setupEmailClick() {
        const emailLink = document.querySelector('a[href^="mailto"]');
        if (emailLink) {
            emailLink.addEventListener('click', (e) => {
                // Enhanced terminal-style alert
                this.showTerminalMessage('> Initiating Pip-Boy COMM protocol...', 'info');
                
                // Optional: Add analytics or tracking here
                console.log('> Email communication initiated');
            });
        }
    }

    setupAccessibilityToggle() {
        const toggleButton = document.querySelector('.accessibility-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleHighContrast();
            });
        }
    }

    setupKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt + C for high contrast toggle
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                this.toggleHighContrast();
            }
            
            // Alt + H for home/top navigation
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                document.querySelector('h1').focus();
            }
        });

        // Improve focus visibility for keyboard users
        this.enhanceFocusVisibility();
    }

    setupTerminalAnimations() {
        // Animate terminal output on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateTerminalSection(entry.target);
                    // Randomly add glitch effect to sections
                    if (Math.random() < 0.3) {
                        this.addGlitchEffect(entry.target);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
        
        // Initialize Matrix rain effect
        this.initMatrixRain();
    }

    setupResponsiveHandlers() {
        // Handle orientation changes
        const handleOrientationChange = utils.debounce(() => {
            console.log('> Adjusting terminal display...');
            this.adjustForViewport();
        }, 250);

        window.addEventListener('resize', handleOrientationChange);
        window.addEventListener('orientationchange', handleOrientationChange);
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('> Terminal Error:', e.error);
            this.showTerminalMessage('> System error detected. Running diagnostics...', 'error');
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('> Unhandled Promise Rejection:', e.reason);
            this.showTerminalMessage('> Network anomaly detected...', 'warning');
        });
    }

    // ===== FEATURE METHODS =====
    toggleHighContrast() {
        this.highContrastMode = !this.highContrastMode;
        document.body.classList.toggle('high-contrast', this.highContrastMode);
        
        const message = this.highContrastMode 
            ? '> High contrast mode activated' 
            : '> High contrast mode deactivated';
        
        this.showTerminalMessage(message, 'info');
        
        // Store preference
        try {
            localStorage.setItem('vault-high-contrast', this.highContrastMode);
        } catch (e) {
            console.warn('> Unable to store contrast preference');
        }
    }

    showTerminalMessage(message, type = 'info') {
        // Create a terminal-style notification
        const notification = document.createElement('div');
        notification.className = `terminal-notification terminal-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-color);
            border: 1px solid var(--primary-color);
            padding: 1rem;
            border-radius: 3px;
            box-shadow: 0 0 10px var(--glow-color);
            z-index: 1000;
            font-family: var(--font-main);
            color: var(--primary-color);
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }
        }, 3000);
    }

    async animateTerminalSection(section) {
        if (utils.prefersReducedMotion()) return;

        const outputs = section.querySelectorAll('.terminal-output p');
        
        for (let output of outputs) {
            if (!output.classList.contains('animated')) {
                output.style.opacity = '0';
                output.style.transform = 'translateX(-10px)';
                
                await new Promise(resolve => setTimeout(resolve, 100));
                
                output.style.transition = 'all 0.5s ease-out';
                output.style.opacity = '1';
                output.style.transform = 'translateX(0)';
                output.classList.add('animated');
            }
        }
    }

    enhanceFocusVisibility() {
        // Add custom focus styles for better keyboard navigation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes focus-pulse {
                0%, 100% { box-shadow: 0 0 5px var(--primary-color); }
                50% { box-shadow: 0 0 15px var(--primary-color); }
            }
            
            *:focus-visible {
                outline: 2px solid var(--primary-color) !important;
                outline-offset: 2px !important;
                animation: focus-pulse 2s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
    }

    adjustForViewport() {
        // Adjust layout for different viewport sizes
        const sections = document.querySelectorAll('.section');
        const isSmallScreen = window.innerWidth < 768;
        
        sections.forEach(section => {
            if (isSmallScreen) {
                section.style.margin = '1rem 0';
            } else {
                section.style.margin = '2rem 0';
            }
        });
    }

    // ===== MATRIX RAIN EFFECTS =====
    initMatrixRain() {
        if (utils.prefersReducedMotion()) return;
        
        const matrixContainer = document.getElementById('matrix-rain');
        if (!matrixContainer) return;

        const characters = '01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
        const columns = Math.floor(window.innerWidth / 20);
        
        // Create matrix columns
        for (let i = 0; i < columns; i++) {
            this.createMatrixColumn(matrixContainer, characters, i);
        }
    }

    createMatrixColumn(container, characters, columnIndex) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${columnIndex * 20}px`;
        column.style.animationDuration = `${Math.random() * 3 + 2}s`;
        column.style.animationDelay = `${Math.random() * 2}s`;
        
        // Generate random characters for this column
        let text = '';
        const length = Math.floor(Math.random() * 20) + 10;
        for (let i = 0; i < length; i++) {
            text += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        column.textContent = text;
        
        container.appendChild(column);
        
        // Remove and recreate column after animation
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
                this.createMatrixColumn(container, characters, columnIndex);
            }
        }, 5000 + Math.random() * 3000);
    }

    addGlitchEffect(element) {
        if (utils.prefersReducedMotion()) return;
        
        element.classList.add('glitch');
        
        // Remove glitch effect after random duration
        setTimeout(() => {
            element.classList.remove('glitch');
        }, 200 + Math.random() * 500);
    }

    // ===== FALLOUT TERMINAL COMMANDS =====
    initTerminalCommands() {
        // Add some interactive terminal commands
        document.addEventListener('keydown', (e) => {
            // Ctrl + Shift + T for terminal easter egg
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.showTerminalEasterEgg();
            }
        });
    }

    // ===== TYPING ANIMATION =====
    async initMantraTyping() {
        const mantraElement = document.getElementById('mantra-text');
        if (!mantraElement) return;

        const mantraText = '☉Healthy body, Peaceful mind, Happy journey☉';
        const cursor = mantraElement.querySelector('.typing-cursor');
        
        // Clear any existing content except cursor
        mantraElement.innerHTML = '<span class="typing-cursor" aria-hidden="true">_</span>';
        
        if (utils.prefersReducedMotion()) {
            // For users who prefer reduced motion, just show the text immediately
            mantraElement.innerHTML = this.formatMantraText(mantraText);
            return;
        }

        // Typing animation
        let currentText = '';
        
        for (let i = 0; i < mantraText.length; i++) {
            currentText += mantraText.charAt(i);
            
            // Format the text with special styling for sun symbols
            const formattedText = this.formatMantraText(currentText);
            mantraElement.innerHTML = formattedText + '<span class="typing-cursor" aria-hidden="true">_</span>';
            
            // Variable typing speed for more natural feel
            const char = mantraText.charAt(i);
            let delay = 80; // Base delay
            
            if (char === ' ') delay = 150; // Longer pause for spaces
            if (char === ',') delay = 300; // Even longer for commas
            if (char === '☉') delay = 200; // Special delay for sun symbols
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        // Animation complete - remove cursor and add glow effect
        setTimeout(() => {
            mantraElement.innerHTML = this.formatMantraText(mantraText);
            mantraElement.classList.add('mantra-complete', 'mantra-glow');
            
            // Remove glow class after animation
            setTimeout(() => {
                mantraElement.classList.remove('mantra-glow');
            }, 2000);
        }, 1000);
    }

    formatMantraText(text) {
        // Add special styling to sun symbols
        return text.replace(/☉/g, '<span class="sun-symbol">☉</span>');
    }

    showTerminalEasterEgg() {
        const messages = [
            '> VAULT-TEC INDUSTRIES TERMINAL',
            '> ACCESS GRANTED',
            '> USER: HAIM YAFIM',
            '> SECURITY CLEARANCE: OVERSEER',
            '> WELCOME TO THE WASTELAND',
            '> HAVE A PLEASANT DAY!'
        ];
        
        let index = 0;
        const showMessage = () => {
            if (index < messages.length) {
                this.showTerminalMessage(messages[index], 'info');
                index++;
                setTimeout(showMessage, 1000);
            }
        };
        
        showMessage();
    }

    // ===== INITIALIZATION HELPERS =====
    loadUserPreferences() {
        try {
            const savedContrast = localStorage.getItem('vault-high-contrast');
            if (savedContrast === 'true') {
                this.toggleHighContrast();
            }
        } catch (e) {
            console.warn('> Unable to load user preferences');
        }
    }
}

// ===== CSS ANIMATIONS =====
const cssAnimations = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

// Inject animations
const styleSheet = document.createElement('style');
styleSheet.textContent = cssAnimations;
document.head.appendChild(styleSheet);

// ===== INITIALIZE APPLICATION =====
const vaultTerminal = new VaultTerminal();

// Load user preferences when ready
document.addEventListener('DOMContentLoaded', () => {
    vaultTerminal.loadUserPreferences();
});

// Export for potential future modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VaultTerminal, utils };
} 
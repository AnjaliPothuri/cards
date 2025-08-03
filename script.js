// Friendship Card JavaScript for Abhilash

// DOM Elements
const floatingElements = document.getElementById('floatingElements');
const mainCard = document.getElementById('mainCard');
const cardFront = document.getElementById('cardFront');
const cardInside = document.getElementById('cardInside');
const secretModal = document.getElementById('secretModal');
const finalModal = document.getElementById('finalModal');

// Statistics
let secretsFound = 0;
let clicksCount = 0;
let laughCount = 0;

// Secret Messages Data
const secretMessages = {
    1: {
        title: "Secret Message #1",
        message: "You are no.1 waste fellow! 😄",
        emoji: "🤪"
    },
    2: {
        title: "Secret Message #2",
        message: "It's a top secret you know! 🤫",
        emoji: "🤐"
    },
    3: {
        title: "Secret Message #3",
        message: "enti antey... 🤔",
        emoji: "🤷‍♂️"
    },
    4: {
        title: "Secret Message #4",
        message: "nuv pedha pichodivi! 😂",
        emoji: "🤣"
    },
    5: {
        title: "Secret Message #5",
        message: "One more message to you... 💝",
        emoji: "💌"
    },
    6: {
        title: "Secret Message #6",
        message: "Thank you for always being there for me, I feel very grateful to have your madness in my Life! 💖",
        emoji: "💖"
    }
};

// Easter Egg Messages
const easterEggMessages = [
    "Found you! 🥚",
    "Another secret! 🥚",
    "You're getting good at this! 🥚"
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    setupEventListeners();
    showWelcomeMessage();
    updateStats();
    initializeSecretStates();
});

// Initialize secret states
function initializeSecretStates() {
    // First secret is always available
    document.getElementById('secret1').classList.add('available');
    
    // All other secrets start as locked
    for (let i = 2; i <= 6; i++) {
        document.getElementById(`secret${i}`).classList.add('locked');
    }
}

// Create floating elements animation
function createFloatingElements() {
    const elements = ['💖', '💝', '💕', '💗', '💓', '💞', '🤝', '🎉', '✨', '🌟'];
    
    setInterval(() => {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDuration = (Math.random() * 3 + 3) + 's';
        element.style.animationDelay = Math.random() * 2 + 's';
        
        floatingElements.appendChild(element);
        
        // Remove element after animation
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 6000);
    }, 300);
}

// Setup event listeners
function setupEventListeners() {
    // Close modals when clicking outside
    secretModal.addEventListener('click', function(e) {
        if (e.target === secretModal) {
            closeSecretModal();
        }
    });
    
    finalModal.addEventListener('click', function(e) {
        if (e.target === finalModal) {
            closeFinalModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSecretModal();
            closeFinalModal();
        }
    });
    
    // Track clicks
    document.addEventListener('click', function() {
        clicksCount++;
        updateStats();
    });
}

// Show welcome message
function showWelcomeMessage() {
    setTimeout(() => {
        showNotification('Welcome Abhilash! Click around to find secret messages! 🕵️', 'success');
    }, 1000);
}

// Open main card
function openCard() {
    cardFront.style.display = 'none';
    cardInside.classList.add('active');
    
    // Add confetti effect
    createConfetti();
    
    showNotification('Opening your special card... 💝', 'info');
}

// Close main card
function closeCard() {
    cardInside.classList.remove('active');
    cardFront.style.display = 'block';
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#667eea', '#ffd700', '#28a745', '#ff4757'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = 'confettiFall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
}

// Add confetti animation to CSS
const confettiCSS = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;

const style = document.createElement('style');
style.textContent = confettiCSS;
document.head.appendChild(style);

// Reveal secret message
function revealSecret(secretId) {
    const secretElement = document.getElementById(`secret${secretId}`);
    const secret = secretMessages[secretId];
    
    // Check if this secret can be revealed (must find previous secrets first)
    if (secretId > 1 && secretsFound < secretId - 1) {
        showNotification(`🔒 You need to find secret #${secretId - 1} first! Keep exploring! 🔍`, 'info');
        return;
    }
    
    if (secret && !secretElement.classList.contains('revealed')) {
        secretElement.classList.add('revealed');
        secretsFound++;
        updateStats();
        
        // Show secret in modal with falling animation
        document.getElementById('secretTitle').textContent = secret.title;
        document.getElementById('secretText').textContent = secret.message;
        secretModal.style.display = 'block';
        
        // Add falling animation to modal content
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.animation = 'modalFall 0.8s ease-out forwards';
        
        // Special notification for the 6th secret
        if (secretId === 6) {
            showNotification(`🎉🌟 CONGRATULATIONS! You found the FINAL SPECIAL MESSAGE! 🌟🎉`, 'success');
        } else {
            showNotification(`🎉 Found secret message #${secretId}! ${secret.emoji}`, 'success');
        }
        
        // Update the next secret to show it's now available
        if (secretId < 6) {
            const nextSecret = document.getElementById(`secret${secretId + 1}`);
            const nextContent = nextSecret.querySelector('.secret-content p');
            const nextSmall = nextSecret.querySelector('.secret-content small');
            
            // Remove locked class and add available class
            nextSecret.classList.remove('locked');
            nextSecret.classList.add('available');
            
            // Special highlight for the 6th secret (final message)
            if (secretId === 5) {
                nextSecret.classList.add('highlighted');
                nextContent.textContent = `🌟 FINAL SPECIAL MESSAGE 🌟`;
                nextSmall.textContent = `Click to reveal the most important message! 💖`;
                showNotification('🌟 The final special message is now available! 🌟', 'success');
            } else {
                nextContent.textContent = `Secret #${secretId + 1} is now available! 🔓`;
                nextSmall.textContent = `Click to reveal the next secret!`;
            }
            
            // Add falling animation for the next secret
            nextSecret.style.animation = 'nextSecretFall 1.5s ease-out forwards';
            setTimeout(() => {
                nextSecret.style.animation = '';
            }, 1500);
        }
        
        // Check if all secrets found
        if (secretsFound === 6) {
            setTimeout(() => {
                showNotification('🎉 Congratulations! You found all the secret messages! 🎉', 'success');
                showFinalMessage();
            }, 2000);
        }
    } else if (secretElement.classList.contains('revealed')) {
        // If already revealed, just show the message again
        document.getElementById('secretTitle').textContent = secret.title;
        document.getElementById('secretText').textContent = secret.message;
        secretModal.style.display = 'block';
    }
}

// Close secret modal
function closeSecretModal() {
    secretModal.style.display = 'none';
}

// Send virtual hug
function sendVirtualHug() {
    showNotification('🤗 Sending you a big virtual hug, Abhilash! 🤗', 'success');
    
    // Create hug animation
    const hug = document.createElement('div');
    hug.innerHTML = '🤗';
    hug.style.position = 'fixed';
    hug.style.fontSize = '4rem';
    hug.style.left = '50%';
    hug.style.top = '50%';
    hug.style.transform = 'translate(-50%, -50%)';
    hug.style.zIndex = '1000';
    hug.style.animation = 'hugAnimation 2s ease-out forwards';
    hug.style.pointerEvents = 'none';
    
    document.body.appendChild(hug);
    
    setTimeout(() => {
        if (hug.parentNode) {
            hug.parentNode.removeChild(hug);
        }
    }, 2000);
}

// Add hug animation to CSS
const hugCSS = `
    @keyframes hugAnimation {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
`;

const hugStyle = document.createElement('style');
hugStyle.textContent = hugCSS;
document.head.appendChild(hugStyle);

// Play prank
function playPrank() {
    laughCount++;
    updateStats();
    
    showNotification('😂 Haha! Got you! 😂', 'info');
    
    // Create laugh animation
    const laugh = document.createElement('div');
    laugh.innerHTML = '😂';
    laugh.style.position = 'fixed';
    laugh.style.fontSize = '3rem';
    laugh.style.left = Math.random() * 80 + 10 + '%';
    laugh.style.top = Math.random() * 80 + 10 + '%';
    laugh.style.zIndex = '1000';
    laugh.style.animation = 'laughAnimation 3s ease-out forwards';
    laugh.style.pointerEvents = 'none';
    
    document.body.appendChild(laugh);
    
    setTimeout(() => {
        if (laugh.parentNode) {
            laugh.parentNode.removeChild(laugh);
        }
    }, 3000);
}

// Add laugh animation to CSS
const laughCSS = `
    @keyframes laughAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;

const laughStyle = document.createElement('style');
laughStyle.textContent = laughCSS;
document.head.appendChild(laughStyle);

// Show final message
function showFinalMessage() {
    finalModal.style.display = 'block';
    showNotification('🎉 Special message for you, Abhilash! 🎉', 'success');
}

// Close final modal
function closeFinalModal() {
    finalModal.style.display = 'none';
}

// Trigger easter egg
function triggerEasterEgg(eggId) {
    const message = easterEggMessages[eggId - 1] || "Found an easter egg! 🥚";
    showNotification(message, 'info');
    
    // Create egg animation
    const egg = document.getElementById(`egg${eggId}`);
    egg.style.transform = 'scale(1.5) rotate(360deg)';
    egg.style.opacity = '1';
    
    setTimeout(() => {
        egg.style.transform = 'scale(1) rotate(0deg)';
        egg.style.opacity = '0.3';
    }, 1000);
}

// Share card
function shareCard() {
    if (navigator.share) {
        navigator.share({
            title: 'Special Friendship Card for Abhilash! 💖',
            text: 'Check out this amazing friendship card!',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        const text = 'Special Friendship Card for Abhilash! 💖 Check out this amazing card: ' + url;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Link copied to clipboard! 📋', 'success');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Link copied to clipboard! 📋', 'success');
        }
    }
}

// Update statistics
function updateStats() {
    document.getElementById('secretsFound').textContent = secretsFound;
    document.getElementById('clicksCount').textContent = clicksCount;
    document.getElementById('laughCount').textContent = laughCount;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4757' : type === 'info' ? '#667eea' : '#28a745'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add special effects on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.header');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add click effects
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('action-btn') || e.target.classList.contains('secret-message')) {
        createRippleEffect(e);
    }
});

// Create ripple effect
function createRippleEffect(event) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = event.clientX + 'px';
    ripple.style.top = event.clientY + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add ripple animation to CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const rippleStyle = document.createElement('style');
rippleStyle.textContent = rippleCSS;
document.head.appendChild(rippleStyle);

// Export functions for global access
window.openCard = openCard;
window.closeCard = closeCard;
window.revealSecret = revealSecret;
window.closeSecretModal = closeSecretModal;
window.sendVirtualHug = sendVirtualHug;
window.playPrank = playPrank;
window.showFinalMessage = showFinalMessage;
window.closeFinalModal = closeFinalModal;
window.triggerEasterEgg = triggerEasterEgg;
window.shareCard = shareCard; 
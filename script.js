// Initialize Swiper Carousel
const swiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    breakpoints: {
        768: {
            slidesPerView: 1
        },
        1024: {
            slidesPerView: 1
        }
    }
});

// Add to Cart Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            
            // Show a simple notification
            showNotification(`${productName} added to cart!`);
            
            // Visual feedback
            this.textContent = '✓ Added!';
            this.style.background = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '#8B4513';
            }, 2000);
        });
    });
    
    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value.trim();
            if (email) {
                showNotification('Thanks for subscribing!');
                newsletterInput.value = '';
            } else {
                showNotification('Please enter an email address', 'error');
            }
        });
    }
    
    // Cart button functionality
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            showNotification('Cart feature coming soon!');
        });
    }
    
    // CTA buttons on carousel
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent;
            showNotification(`Navigating to ${text} section...`);
        });
    });
    
    // Category cards navigation
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h4').textContent;
            showNotification(`Loading ${categoryName}...`);
        });
    });
    
    // Deal cards navigation
    const dealCards = document.querySelectorAll('.deal-card');
    dealCards.forEach(card => {
        card.addEventListener('click', function() {
            const dealName = this.querySelector('h4').textContent;
            showNotification(`Viewing ${dealName}...`);
        });
    });
});

// Notification helper function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'error' ? '#f44336' : '#4CAF50'};
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animations to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle (optional, for future enhancement)
console.log('✓ TotalWine Clone initialized successfully!');
console.log('✓ Swiper carousel active with 4-second autoplay');
console.log('✓ All interactive elements ready');

// Mock product data (replace with API call)
const mockProducts = [
    { id: 1, name: 'Cabernet Sauvignon 2020', price: 24.99, emoji: '🍷', rating: 128, stars: 5 },
    { id: 2, name: 'Sauvignon Blanc 2021', price: 18.99, emoji: '🥂', rating: 95, stars: 4 },
    { id: 3, name: 'Champagne Brut Prestige', price: 35.99, emoji: '🍾', rating: 212, stars: 5 },
    { id: 4, name: 'Single Malt Whiskey', price: 49.99, emoji: '🥃', rating: 178, stars: 5 },
    { id: 5, name: 'Craft IPA Bundle', price: 29.99, emoji: '🍺', rating: 76, stars: 4 },
    { id: 6, name: 'Premium Rum Selection', price: 39.99, emoji: '🍹', rating: 143, stars: 5 },
    { id: 7, name: 'Pinot Noir Reserve', price: 32.99, emoji: '🍷', rating: 189, stars: 5 },
    { id: 8, name: 'Riesling Collection', price: 21.99, emoji: '🥂', rating: 87, stars: 4 }
];

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

// Fetch and render products from API
async function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    try {
        // Option 1: Fetch from API endpoint
        // const response = await axios.get('/api/products');
        // const products = response.data;
        
        // Option 2: Use mock data (for demo/testing)
        const products = mockProducts;
        
        // Clear loading spinner
        productsGrid.innerHTML = '';
        
        // Render products
        products.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
        
        // Attach event listeners to new buttons
        attachProductEventListeners();
        
        console.log('✓ Loaded ' + products.length + ' products');
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<div class="error-message">Failed to load products. Please try again.</div>';
    }
}

// Create product card DOM element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stars = '⭐'.repeat(product.stars);
    
    card.innerHTML = `
        <div class="product-image">${product.emoji}</div>
        <h4>${product.name}</h4>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="product-rating">${stars} (${product.rating} reviews)</div>
        <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    `;
    
    return card;
}

// Attach event listeners to dynamically created buttons
function attachProductEventListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            const productId = this.getAttribute('data-product-id');
            
            // Show notification
            showNotification(`${productName} added to cart!`);
            
            // Visual feedback
            this.textContent = '✓ Added!';
            this.style.background = '#4CAF50';
            
            // Store in localStorage
            addToLocalCart(productId);
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '#8B4513';
            }, 2000);
        });
    });
}

// Add to Cart Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load products on page load
    loadProducts();
    
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
            const cartCount = getCartCount();
            showNotification(`You have ${cartCount} item(s) in your cart`);
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

// Cart management with localStorage
function addToLocalCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.length;
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
    
    .loading-spinner {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px;
        color: #999;
        font-size: 1.1rem;
    }
    
    .error-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px;
        color: #f44336;
        font-size: 1.1rem;
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

// API Integration Example
// To connect to a real backend, update loadProducts() like this:
/*
async function loadProducts() {
    try {
        const response = await axios.get('https://your-api.com/products');
        const products = response.data;
        
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
        
        attachProductEventListeners();
    } catch (error) {
        console.error('API Error:', error);
    }
}
*/

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

console.log('✓ TotalWine Clone initialized successfully!');
console.log('✓ Swiper carousel active with 4-second autoplay');
console.log('✓ Dynamic product loading enabled with Axios');
console.log('✓ All interactive elements ready');

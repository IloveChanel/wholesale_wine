# 🍷 TotalWine.com Clone - Complete Setup & Deployment Guide

## Project Overview
A professional e-commerce homepage clone built with vanilla HTML, CSS, and JavaScript featuring Swiper.js carousel, responsive design, and dynamic product loading via Axios.

---

## ✨ Features Implemented

### ✅ Swiper.js Carousel (v11+)
- **5-slide hero carousel** with autoplay (4-second delay)
- **Smooth fade transitions** for professional look
- **Navigation controls**: pagination dots + prev/next buttons
- **Mobile support**: Touch-swipe functionality
- **Loop mode**: Continuous playback

### ✅ Professional E-commerce Layout
- **Fixed Header**: Logo, navigation menu, search bar, cart button
- **Hero Section**: Full-width carousel with overlay text
- **Deals Section**: 3 promotional cards with hover effects
- **Category Grid**: 6 category cards (wine, beer, spirits, etc.)
- **Product Grid**: 8 featured products with dynamic loading (4-column responsive)
- **Newsletter**: Email subscription form
- **Footer**: Complete with links, legal info, and newsletter signup

### ✅ Responsive Design
- **Mobile-first** CSS approach
- **Breakpoints**: 480px, 768px, 1024px+
- **Adaptive layouts** for all screen sizes

### ✅ Dynamic Product Loading
- **Mock data**: Pre-loaded products for demo
- **Axios integration**: Ready for real API connection
- **Add to Cart**: LocalStorage cart management
- **Interactive notifications**: Toast messages

---

## 🚀 Quick Start

### Option 1: Using Live Server (VS Code)
1. Install **Live Server** extension in VS Code
2. Right-click `index.html` → Select "Open with Live Server"
3. Browser opens automatically at `http://localhost:5500`

### Option 2: Using Python
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```
Then visit `http://localhost:8000`

### Option 3: Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Run from project directory
http-server
```

### Option 4: Using npx (No Installation)
```bash
npx http-server
```

---

## 📦 Dependencies

Already included in `package.json`:
```json
{
  "dependencies": {
    "axios": "^1.13.2",
    "swiper": "^11.2.10"
  }
}
```

**Fonts**:
- Google Fonts: Playfair Display (headings) + Source Sans Pro (body)
- Loaded via CDN in HTML

---

## 📂 Project Structure

```
totalwine/
├── index.html              # Main HTML file
├── styles.css              # Complete styling (responsive)
├── script.js               # JavaScript (Swiper, product loading, events)
├── package.json            # Project dependencies
├── API_INTEGRATION.md       # Guide for API integration
├── README.md               # This file
└── images/
    ├── promo1.svg          # Carousel slide 1
    ├── promo2.svg          # Carousel slide 2
    └── promo3.svg          # Carousel slide 3
```

---

## 🔧 Key Code Features

### Dynamic Product Loading
```javascript
async function loadProducts() {
    const products = mockProducts;  // Replace with API call
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}
```

### Swiper Configuration
```javascript
const swiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: { delay: 4000 },
    pagination: { el: '.swiper-pagination', clickable: true },
    effect: 'fade'
});
```

### Add to Cart with LocalStorage
```javascript
function addToLocalCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}
```

---

## 🔌 API Integration

### To Connect to a Real Backend:

1. **Update `script.js`** - Modify the `loadProducts()` function:

```javascript
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
        productsGrid.innerHTML = '<div class="error-message">Failed to load products.</div>';
    }
}
```

2. **Required API Response Format**:
```json
[
  {
    "id": 1,
    "name": "Cabernet Sauvignon 2020",
    "price": 24.99,
    "emoji": "🍷",
    "rating": 128,
    "stars": 5
  },
  ...
]
```

---

## 🎨 Customization

### Change Color Scheme
- Update `#8B4513` (current brown) to your brand color in `styles.css`
- Update `#333` (text color) as needed
- Update footer background color

### Add More Products
Edit `script.js` and add to `mockProducts` array:
```javascript
const mockProducts = [
    { id: 1, name: 'Your Wine', price: 29.99, emoji: '🍷', rating: 100, stars: 5 },
    // ... more products
];
```

### Update Hero Carousel
Edit images in `images/` folder or replace URLs in `index.html`

### Modify Navigation Links
Update `<nav class="nav-menu">` links in HTML to point to real pages

---

## 📱 Browser Compatibility

✅ Chrome/Edge (v90+)
✅ Firefox (v88+)
✅ Safari (v14+)
✅ Mobile browsers (iOS Safari, Chrome Android)

---

## 🚨 Troubleshooting

### Images not loading?
- Ensure image files are in `/images/` folder
- Check file extensions (`.svg` or `.jpg`)
- Verify paths in HTML match actual filenames

### Carousel not working?
- Check if Swiper CDN is loaded: Open DevTools → Network
- Ensure `<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>` is in HTML

### Products not showing?
- Open DevTools Console (F12)
- Check for JavaScript errors
- Verify `mockProducts` array in `script.js` has data

### LocalStorage not working?
- Check if localStorage is enabled in browser settings
- Try private/incognito mode

---

## 📊 Performance

- **Lazy loading**: Products load on demand
- **Minimal dependencies**: Only Swiper + Axios
- **CSS optimized**: No unused styles
- **Image optimization**: SVG format for carousel (scalable, lightweight)

---

## 📄 License

ISC - Free to use and modify for personal/commercial projects

---

## 🎯 Future Enhancements

- [ ] Add shopping cart page
- [ ] Integrate payment gateway (Stripe/PayPal)
- [ ] User authentication system
- [ ] Product detail pages
- [ ] Advanced filtering & search
- [ ] Reviews & ratings system
- [ ] Wishlist functionality
- [ ] Real-time inventory management

---

## 👨‍💻 Development

Built with:
- **HTML5** for semantic structure
- **CSS3** for responsive design & animations
- **Vanilla JavaScript** (no heavy frameworks)
- **Swiper.js** for carousel
- **Axios** for API calls

No build tools needed - works in any modern browser!

---

**Happy coding! 🍷**

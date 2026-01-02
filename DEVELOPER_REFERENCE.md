# 👨‍💻 Developer Quick Reference

## 🚀 First Time Setup

```bash
# 1. Navigate to project directory
cd totalwine

# 2. View all files
ls -la

# 3. Start a local server (choose one):
# Option A: Python
python -m http.server 8000

# Option B: Node
node server.js

# Option C: npx
npx http-server

# 4. Open browser to http://localhost:8000
```

---

## 📝 Common Tasks

### Add a New Product
**File**: `script.js` (Line 3)

```javascript
const mockProducts = [
    // ... existing products
    { 
        id: 9, 
        name: 'New Wine Name', 
        price: 29.99, 
        emoji: '🍷', 
        rating: 50, 
        stars: 5 
    }
];
```

### Change Primary Color
**File**: `styles.css`

Search & replace `#8B4513` with your color:
- Header
- Buttons
- Links
- Footer text

### Update Carousel Images
**File**: `index.html` (Lines 30-50)

```html
<img src="images/your-image.jpg" alt="Description">
```

Or replace SVG files in `/images/` folder.

### Add Navigation Link
**File**: `index.html` (Line 20)

```html
<a href="#section-id" class="nav-link">New Link</a>
```

### Connect Real API
**File**: `script.js` (Line 125)

```javascript
async function loadProducts() {
    const response = await axios.get('https://your-api.com/products');
    const products = response.data;
    // ... rest of function
}
```

---

## 🐛 Debugging Guide

### Console Messages
Check console (F12) for these messages:
```
✓ TotalWine Clone initialized successfully!
✓ Swiper carousel active with 4-second autoplay
✓ Dynamic product loading enabled with Axios
✓ All interactive elements ready
```

### Check Cart Data
```javascript
// In browser console:
console.log(JSON.parse(localStorage.getItem('cart')));
```

### Test Product Loading
```javascript
// In browser console:
console.log(mockProducts);
console.log('Total products:', mockProducts.length);
```

### Verify Swiper
```javascript
// In browser console:
console.log(swiper);
swiper.slideNext();  // Test next button
```

---

## 🎨 CSS Customization Map

| Element | CSS Class | File/Line |
|---------|-----------|-----------|
| Header | `.header` | styles.css:50 |
| Logo | `.logo` | styles.css:63 |
| Navigation | `.nav-link` | styles.css:71 |
| Cart button | `.cart-btn` | styles.css:85 |
| Carousel | `.hero-swiper` | styles.css:105 |
| Product card | `.product-card` | styles.css:290 |
| Footer | `.footer` | styles.css:370 |

---

## 📱 Responsive Breakpoints

```css
/* Mobile (max-width: 480px) */
@media (max-width: 480px) { ... }

/* Tablet (max-width: 768px) */
@media (max-width: 768px) { ... }

/* Desktop (max-width: 1024px) */
@media (max-width: 1024px) { ... }

/* Large screens (min-width: 1025px) */
/* Default styles */
```

---

## 🔧 JavaScript Function Map

| Function | File | Purpose |
|----------|------|---------|
| `loadProducts()` | script.js:125 | Fetch & render products |
| `createProductCard()` | script.js:150 | Build product DOM |
| `attachProductEventListeners()` | script.js:170 | Setup click handlers |
| `showNotification()` | script.js:225 | Display toast message |
| `addToLocalCart()` | script.js:260 | Save to localStorage |
| `getCartCount()` | script.js:268 | Get cart size |

---

## 🔌 API Integration Checklist

```javascript
// Step 1: Update loadProducts()
async function loadProducts() {
    const response = await axios.get('https://your-api.com/products');
    const products = response.data;
    // ... rest remains same
}

// Step 2: Expected API response format
[
    {
        "id": 1,
        "name": "Product Name",
        "price": 24.99,
        "emoji": "🍷",
        "rating": 128,
        "stars": 5
    }
]

// Step 3: Test in console
axios.get('https://your-api.com/products')
    .then(r => console.log(r.data))
    .catch(e => console.error(e));
```

---

## 🧪 Quick Test Commands

```javascript
// Test 1: Load products manually
loadProducts();

// Test 2: Create sample product card
const testProduct = mockProducts[0];
const card = createProductCard(testProduct);
console.log(card);

// Test 3: Add to cart
addToLocalCart(1);
console.log(getCartCount());

// Test 4: Show notification
showNotification('Test notification');

// Test 5: Check Swiper status
console.log('Current slide:', swiper.activeIndex);
console.log('Is autoplay active:', swiper.autoplay.running);

// Test 6: Manual slide navigation
swiper.slideNext();
swiper.slidePrev();
swiper.slideTo(2);

// Test 7: Trigger event
document.querySelector('.cart-btn').click();
```

---

## 📂 File Organization

```
totalwine/
├── index.html              ← Main HTML (edit here for structure)
├── styles.css              ← All styling (edit here for design)
├── script.js               ← All JavaScript (edit here for logic)
├── package.json            ← Dependencies reference
├── server.js               ← Local Node server
│
├── Documentation/
│   ├── README.md           ← Quick overview
│   ├── PROJECT_SUMMARY.md  ← Complete summary (start here)
│   ├── DEPLOYMENT.md       ← Setup & customization
│   ├── API_INTEGRATION.md  ← API guide
│   ├── FILE_INDEX.md       ← This file's index
│   └── TESTING.md          ← Test checklist
│
├── images/                 ← All images
│   ├── promo1.svg
│   ├── promo2.svg
│   └── promo3.svg
│
└── Quick Start/
    ├── QUICKSTART.bat      ← Windows quick start
    └── QUICKSTART.sh       ← Mac/Linux quick start
```

---

## 💡 Performance Tips

### Optimize Images
```bash
# Use imageoptim or TinyPNG for JPGs
# Use SVGO for SVGs
```

### Cache Headers
```javascript
// In server.js, add:
res.setHeader('Cache-Control', 'public, max-age=3600');
```

### Code Splitting (Future)
```javascript
// Load API endpoint dynamically
const apiUrl = new URL(document.location);
const API_BASE = apiUrl.searchParams.get('api') || '/api';
```

---

## 🔐 Security Checklist

- ✅ No API keys in frontend code
- ✅ Input validation on email form
- ✅ XSS protection (no innerHTML with user data)
- ✅ CSRF protection (if backend needed)
- ✅ HTTPS on production
- ✅ CORS properly configured

---

## 📊 Monitoring & Analytics

### Add Google Analytics
```html
<!-- Add to <head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Track Events
```javascript
// Track product click
button.addEventListener('click', function() {
    gtag('event', 'add_to_cart', {
        product_id: productId,
        product_name: productName
    });
});
```

---

## 🚀 Deployment Checklist

Before deploying:
- [ ] All images optimized
- [ ] No console errors
- [ ] API endpoint configured
- [ ] Environment variables set
- [ ] Analytics set up
- [ ] SEO meta tags reviewed
- [ ] SSL certificate ready
- [ ] Cache headers configured
- [ ] Minification done (if using build tool)
- [ ] Testing completed

---

## 📞 Helpful Commands

```bash
# Check for JavaScript errors
npm run lint  # (if eslint configured)

# Run tests
npm test  # (if test framework added)

# Build/minify
npm run build  # (if webpack configured)

# Start development server
npm start  # (if configured in package.json)

# Check all dependencies
npm list

# Update dependencies
npm update
```

---

## 🎯 Next Development Steps

1. **Connect Real Backend**
   - Update `loadProducts()` in script.js
   - Test with real API endpoint
   - Add error handling for timeouts

2. **Add Shopping Cart Page**
   - Create `cart.html`
   - Implement cart display logic
   - Add checkout flow

3. **User Authentication**
   - Add login/register forms
   - Implement session management
   - Secure API calls with tokens

4. **Payment Integration**
   - Integrate Stripe or PayPal
   - Add payment form
   - Handle payment confirmation

5. **Inventory Management**
   - Track product stock
   - Display availability
   - Handle out-of-stock items

---

## 📚 Resources

- **Swiper.js Docs**: https://swiperjs.com/
- **Axios Docs**: https://axios-http.com/
- **MDN Web Docs**: https://developer.mozilla.org/
- **Can I Use**: https://caniuse.com/
- **CSS Tricks**: https://css-tricks.com/

---

## ⚡ Quick Copy-Paste Snippets

### Add Event Listener
```javascript
document.querySelector('selector').addEventListener('click', function() {
    showNotification('Action completed!');
});
```

### Fetch from API
```javascript
const response = await axios.get('https://api.example.com/products');
console.log(response.data);
```

### LocalStorage Operation
```javascript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('key'));

// Remove
localStorage.removeItem('key');

// Clear all
localStorage.clear();
```

### Show Loading Spinner
```javascript
const spinner = document.querySelector('.loading-spinner');
spinner.style.display = 'block';  // Show
spinner.style.display = 'none';   // Hide
```

---

**Happy Coding! 🚀**


// API_INTEGRATION.md

# TotalWine Clone - API Integration Guide

## Overview
The project now uses **Axios** to fetch products dynamically from an API instead of hardcoding them in HTML. This enables real-time data updates, scalability, and separation of concerns.

## Current Setup (Mock Data)
By default, products are loaded from a `mockProducts` array in `script.js`. This is perfect for:
- Local development and testing
- Prototyping without a backend
- Static data when an API isn't available

## Connecting to a Real API

### Step 1: Set Up Your Backend Endpoint
Your API should return JSON in this format:

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
  {
    "id": 2,
    "name": "Sauvignon Blanc 2021",
    "price": 18.99,
    "emoji": "🥂",
    "rating": 95,
    "stars": 4
  }
]
```

### Step 2: Update script.js
Replace the mock data call with your API endpoint:

**Current (Mock Data):**
```javascript
async function loadProducts() {
    try {
        // const response = await axios.get('/api/products');
        // const products = response.data;
        
        const products = mockProducts;  // Currently using mock data
        // ...
    }
}
```

**Updated (Real API):**
```javascript
async function loadProducts() {
    try {
        const response = await axios.get('https://your-api.com/api/products');
        const products = response.data;
        
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
        
        attachProductEventListeners();
        console.log('✓ Loaded ' + products.length + ' products');
    } catch (error) {
        console.error('Error loading products:', error);
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.innerHTML = '<div class="error-message">Failed to load products. Please try again.</div>';
    }
}
```

## API Endpoints Reference

### Get All Products
```
GET /api/products
Response: Array of product objects
```

### Get Product by Category
```
GET /api/products?category=red-wine
Response: Filtered array of products
```

### Get Product by ID
```
GET /api/products/1
Response: Single product object
```

### Add to Cart (Optional)
```
POST /api/cart
Body: { productId: 1, quantity: 1 }
Response: { success: true, cartCount: 5 }
```

## CORS Configuration
If your API is on a different domain, ensure CORS is enabled:

**Node.js/Express Example:**
```javascript
const cors = require('cors');
app.use(cors());
```

**Python/Flask Example:**
```python
from flask_cors import CORS
CORS(app)
```

## Error Handling
The code already includes error handling that:
- Catches failed API requests
- Displays user-friendly error messages
- Logs errors to console for debugging
- Falls back gracefully if data can't be loaded

## Axios Features Used

### 1. GET Request (Fetch Products)
```javascript
axios.get('/api/products')
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
```

### 2. POST Request (Add to Cart)
```javascript
axios.post('/api/cart', { productId: 1, quantity: 1 })
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
```

### 3. Request with Headers
```javascript
axios.get('/api/products', {
    headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
});
```

### 4. Request with Timeout
```javascript
axios.get('/api/products', { timeout: 5000 })  // 5 second timeout
```

## Example Backend (Node.js/Express)

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample products data
const products = [
    { id: 1, name: 'Cabernet Sauvignon 2020', price: 24.99, emoji: '🍷', rating: 128, stars: 5 },
    { id: 2, name: 'Sauvignon Blanc 2021', price: 18.99, emoji: '🥂', rating: 95, stars: 4 },
];

// GET all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// GET product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

app.listen(3001, () => console.log('API running on port 3001'));
```

## Testing with Postman
1. Set method to `GET`
2. Enter URL: `http://localhost:3001/api/products`
3. Click "Send"
4. Verify JSON response

## Performance Tips

### 1. Cache Products Locally
```javascript
function loadProducts() {
    const cached = localStorage.getItem('products');
    if (cached) {
        return renderProducts(JSON.parse(cached));
    }
    
    axios.get('/api/products')
        .then(res => {
            localStorage.setItem('products', JSON.stringify(res.data));
            renderProducts(res.data);
        });
}
```

### 2. Pagination (if API returns many products)
```javascript
// Fetch page 1, 10 items per page
axios.get('/api/products?page=1&limit=10')
    .then(res => renderProducts(res.data));
```

### 3. Search/Filter Products
```javascript
axios.get('/api/products?search=wine&minPrice=10&maxPrice=50')
    .then(res => renderProducts(res.data));
```

## Troubleshooting

### Issue: CORS Error
**Solution:** Ensure API has CORS headers enabled, or use a proxy

### Issue: Timeout Error
**Solution:** Increase timeout or check server performance

### Issue: 404 Not Found
**Solution:** Verify API endpoint URL and check server logs

### Issue: Products Not Loading
**Check:**
1. Open browser DevTools (F12)
2. Look at Network tab - verify API request completes
3. Check Console tab for error messages
4. Verify API response format matches expected schema

## Next Steps

1. **Create Backend API** using Node.js, Python, or your preferred framework
2. **Update API Endpoint URL** in `script.js`
3. **Test Thoroughly** using browser DevTools
4. **Deploy Both Frontend & Backend** to production
5. **Monitor Performance** using application metrics

## Resources

- [Axios Documentation](https://axios-http.com/docs/intro)
- [RESTful API Best Practices](https://restfulapi.net/)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [JSON Schema Validator](https://jsonschemavalidator.net/)

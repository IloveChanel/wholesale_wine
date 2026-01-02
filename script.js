// ============================================
// INITIALIZE ALL CAROUSELS ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Hero Swiper
  const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: { delay: 4000 },
    pagination: { el: '.swiper-pagination', clickable: true },
    effect: 'fade',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  // Initialize Wine Selection Swiper
  const wineSwiper = new Swiper('.wine-swiper', {
    slidesPerView: 7,
    spaceBetween: 40,
    loop: true,
    speed: 12000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    centeredSlides: false,
    navigation: {
      nextEl: '.wine-next',
      prevEl: '.wine-prev'
    },
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 20 },
      640: { slidesPerView: 3, spaceBetween: 25 },
      1024: { slidesPerView: 5, spaceBetween: 30 },
      1280: { slidesPerView: 7, spaceBetween: 40 }
    }
  });

  // Initialize Top Picks Swiper
  const topPicksSwiper = new Swiper('.toppicks-swiper', {
    slidesPerView: 7,
    spaceBetween: 40,
    loop: true,
    speed: 12000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    centeredSlides: false,
    navigation: {
      nextEl: '.toppicks-next',
      prevEl: '.toppicks-prev'
    },
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 20 },
      640: { slidesPerView: 3, spaceBetween: 25 },
      1024: { slidesPerView: 5, spaceBetween: 30 },
      1280: { slidesPerView: 7, spaceBetween: 40 }
    }
  });

  // Initialize Spirits Swiper
  const spiritsSwiper = new Swiper('.spirits-swiper', {
    slidesPerView: 7,
    spaceBetween: 40,
    loop: true,
    speed: 12000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    centeredSlides: false,
    navigation: {
      nextEl: '.spirits-next',
      prevEl: '.spirits-prev'
    },
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 20 },
      640: { slidesPerView: 3, spaceBetween: 25 },
      1024: { slidesPerView: 5, spaceBetween: 30 },
      1280: { slidesPerView: 7, spaceBetween: 40 }
    }
  });

  // Initialize Featured Specials Swiper
  const featuredSpecials = new Swiper('.featured-swiper-carousel', {
    slidesPerView: 5,
    spaceBetween: 8,
    loop: true,
    centeredSlides: false,
    autoplay: { delay: 4000, disableOnInteraction: false },
    navigation: {
      nextEl: '.carousel-next',
      prevEl: '.carousel-prev'
    },
    breakpoints: {
      0: { slidesPerView: 1.5, spaceBetween: 8, centeredSlides: false },
      768: { slidesPerView: 3, spaceBetween: 8, centeredSlides: false },
      1024: { slidesPerView: 5, spaceBetween: 8, centeredSlides: false }
    }
  });

  // Load products (if grid exists)
  const productsGrid = document.getElementById('productsGrid');
  if (productsGrid) {
    const mockProducts = [
      { id: 1, name: 'Premium Red Wine', price: '$24.99', image: 'images/wine_bottle.png' },
      { id: 2, name: 'White Wine Selection', price: '$22.99', image: 'images/wine_bottle.png' },
      { id: 3, name: 'Rosé Collection', price: '$19.99', image: 'images/wine_bottle.png' },
      { id: 4, name: 'Premium Spirits', price: '$39.99', image: 'images/wine_bottle.png' }
    ];

    productsGrid.innerHTML = mockProducts.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p class="featured-price">${product.price}</p>
      </div>
    `).join('');
  }
});


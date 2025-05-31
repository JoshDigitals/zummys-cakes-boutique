// Animations JavaScript

// Intersection Observer for scroll-based animations
document.addEventListener('DOMContentLoaded', () => {
  // Elements to animate when they come into view
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          let animationClass = el.dataset.animation || 'animate-fade-in-up';
          let delay = el.dataset.delay || 0;
          
          setTimeout(() => {
            el.classList.add(animationClass);
            el.style.opacity = '1';
          }, delay);
          
          // Unobserve after animation
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }
  
  // Initialize AOS-like scroll animations
  initializeScrollAnimations();
  
  // Initialize Parallax effects
  initializeParallax();
});

// Initialize custom scroll animations (similar to AOS)
function initializeScrollAnimations() {
  // Select all elements to animate
  const elements = document.querySelectorAll('[data-scroll]');
  
  if (elements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const animation = el.dataset.scroll;
        const delay = el.dataset.scrollDelay || 0;
        const duration = el.dataset.scrollDuration || '0.8s';
        
        // Apply animation
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.animation = `${animation} ${duration} forwards`;
        }, delay);
        
        // Unobserve after animation
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// Initialize parallax effect
function initializeParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  function updateParallax() {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(el => {
      const speed = el.dataset.parallax || 0.2;
      const offset = scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }
  
  // Update on scroll
  window.addEventListener('scroll', updateParallax);
  
  // Initial update
  updateParallax();
}

// Hero Animation Sequence
function animateHero() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroImage = document.querySelector('.hero-image img');
  const heroCategories = document.querySelectorAll('.hero-category');
  
  if (!heroTitle || !heroSubtitle || !heroImage) return;
  
  // Reset animations
  [heroTitle, heroSubtitle, heroImage, ...heroCategories].forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
  });
  
  // Animate subtitle
  setTimeout(() => {
    heroSubtitle.style.opacity = '1';
    heroSubtitle.style.transform = 'translateY(0)';
    heroSubtitle.style.transition = 'opacity 0.8s, transform 0.8s';
  }, 200);
  
  // Animate title
  setTimeout(() => {
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'translateY(0)';
    heroTitle.style.transition = 'opacity 0.8s, transform 0.8s';
  }, 400);
  
  // Animate image
  setTimeout(() => {
    heroImage.style.opacity = '1';
    heroImage.style.transform = 'translateY(0)';
    heroImage.style.transition = 'opacity 0.8s, transform 0.8s';
  }, 600);
  
  // Animate categories
  heroCategories.forEach((category, index) => {
    setTimeout(() => {
      category.style.opacity = '1';
      category.style.transform = 'translateY(0)';
      category.style.transition = 'opacity 0.8s, transform 0.8s';
    }, 800 + (index * 200));
  });
}

// Product Card Hover Animation
function setupProductHoverEffects() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const image = card.querySelector('.product-image img');
      image.style.transform = 'scale(1.1)';
      
      const actions = card.querySelector('.product-actions');
      if (actions) {
        actions.style.bottom = '0';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const image = card.querySelector('.product-image img');
      image.style.transform = 'scale(1)';
      
      const actions = card.querySelector('.product-actions');
      if (actions) {
        actions.style.bottom = '-50px';
      }
    });
  });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  // Setup product hover effects
  setupProductHoverEffects();
  
  // Add scroll reveal animation to products
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Add scroll reveal animation to categories
  const categoryItems = document.querySelectorAll('.category-item');
  categoryItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Add scroll reveal animation to menu items
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
});
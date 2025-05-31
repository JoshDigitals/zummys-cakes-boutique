// Slider JavaScript

// Hero Slider
const heroSlider = {
  currentSlide: 0,
  slides: document.querySelectorAll('.hero-slide'),
  dots: document.querySelectorAll('.pagination-dot'),
  prevBtn: document.querySelector('.slider-prev'),
  nextBtn: document.querySelector('.slider-next'),
  autoplayInterval: null,
  
  init() {
    // Set up event listeners
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Start autoplay
    this.startAutoplay();
    
    // Pause autoplay on hover
    const sliderWrapper = document.querySelector('.hero-slider');
    sliderWrapper.addEventListener('mouseenter', () => this.stopAutoplay());
    sliderWrapper.addEventListener('mouseleave', () => this.startAutoplay());
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  },
  
  prevSlide() {
    this.goToSlide(this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1);
  },
  
  nextSlide() {
    this.goToSlide(this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1);
  },
  
  goToSlide(index) {
    // Deactivate current slide
    this.slides[this.currentSlide].classList.remove('active');
    this.dots[this.currentSlide].classList.remove('active');
    
    // Activate new slide
    this.currentSlide = index;
    this.slides[this.currentSlide].classList.add('active');
    this.dots[this.currentSlide].classList.add('active');
    
    // Reset autoplay
    this.stopAutoplay();
    this.startAutoplay();
  },
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 6000); // Change slide every 6 seconds
  },
  
  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  },
  
  handleSwipe(startX, endX) {
    const threshold = 50; // Minimum distance for swipe
    
    if (startX - endX > threshold) {
      // Swiped left, show next slide
      this.nextSlide();
    } else if (endX - startX > threshold) {
      // Swiped right, show previous slide
      this.prevSlide();
    }
  }
};

// Testimonial Slider
const testimonialSlider = {
  currentSlide: 0,
  slides: document.querySelectorAll('.testimonial-slide'),
  dots: document.querySelectorAll('.testimonial-dot'),
  autoplayInterval: null,
  
  init() {
    // Set up event listeners for dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Start autoplay
    this.startAutoplay();
    
    // Pause autoplay on hover
    const sliderWrapper = document.querySelector('.testimonial-slider');
    sliderWrapper.addEventListener('mouseenter', () => this.stopAutoplay());
    sliderWrapper.addEventListener('mouseleave', () => this.startAutoplay());
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  },
  
  goToSlide(index) {
    // Deactivate current slide
    this.slides[this.currentSlide].classList.remove('active');
    this.dots[this.currentSlide].classList.remove('active');
    
    // Activate new slide
    this.currentSlide = index;
    this.slides[this.currentSlide].classList.add('active');
    this.dots[this.currentSlide].classList.add('active');
    
    // Reset autoplay
    this.stopAutoplay();
    this.startAutoplay();
  },
  
  nextSlide() {
    this.goToSlide(this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1);
  },
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  },
  
  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  },
  
  handleSwipe(startX, endX) {
    const threshold = 50; // Minimum distance for swipe
    
    if (startX - endX > threshold) {
      // Swiped left, show next slide
      this.nextSlide();
    } else if (endX - startX > threshold) {
      // Swiped right, show previous slide
      let prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
      this.goToSlide(prevIndex);
    }
  }
};

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  heroSlider.init();
  testimonialSlider.init();
});
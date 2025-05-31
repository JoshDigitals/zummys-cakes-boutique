// Main JavaScript File

// DOM Elements
const body = document.body;
const preloader = document.querySelector('.preloader');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const searchToggle = document.querySelector('.search-toggle');
const searchDropdown = document.querySelector('.search-dropdown');
const backToTopBtn = document.getElementById('back-to-top');
const header = document.querySelector('.header');

// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('hidden');
    
    // Start animations after preloader is hidden
    startPageAnimations();
  }, 1000);
});

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (mobileMenu.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
});

// Search Toggle
searchToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  searchDropdown.classList.toggle('active');
});

// Close search dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    searchDropdown.classList.remove('active');
  }
});

// Prevent search dropdown from closing when clicking inside it
searchDropdown.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Back to Top Button
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
  
  // Header background on scroll
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Initialize Google Map
function initMap() {
  const mapCenter = { lat: 40.7128, lng: -74.0060 }; // New York coordinates (change to your location)
  
  const map = new google.maps.Map(document.getElementById('map'), {
    center: mapCenter,
    zoom: 15,
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "weight": "2.00"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#9c9c9c"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#7b7b7b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#46bcec"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#c8d7d4"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#070707"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      }
    ]
  });
  
  // Add marker
  const marker = new google.maps.Marker({
    position: mapCenter,
    map: map,
    title: 'PANADERÍA',
    icon: {
      url: 'images/map-marker.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  });
  
  // Add info window
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div class="map-info-window">
        <h3>PANADERÍA</h3>
        <p>123 Bakery Street, New York, NY 10001</p>
        <p>Open: 7AM - 7PM</p>
      </div>
    `
  });
  
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

// Make initMap globally available
window.initMap = initMap;

// Start animations for page elements
function startPageAnimations() {
  // Initialize Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe product cards
  document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
  });
  
  // Observe category items
  document.querySelectorAll('.category-item').forEach(item => {
    observer.observe(item);
  });
  
  // Observe menu items
  document.querySelectorAll('.menu-item').forEach(item => {
    observer.observe(item);
  });
  
  // Observe promo section
  document.querySelector('.promo-image')?.classList.add('animate');
  document.querySelector('.promo-content')?.classList.add('animate');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      mobileMenuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.style.overflow = '';
    }
  });
});
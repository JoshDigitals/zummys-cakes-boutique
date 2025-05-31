// Search JavaScript

// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');
const mobileSearchInput = document.querySelector('.mobile-search-input');
const searchForm = document.querySelector('.search-form');
const mobileSearchForm = document.querySelector('.mobile-search-form');

// Sample products data (in a real application, this would come from a database or API)
const products = [
  {
    id: 1,
    name: 'French Bread',
    category: 'Bread',
    price: '$3.50',
    image: 'images/french-bread.jpg'
  },
  {
    id: 2,
    name: 'Princess Cake',
    category: 'Cakes',
    price: '$12.99',
    image: 'images/princess-cake.jpg'
  },
  {
    id: 3,
    name: 'Coffee Custom',
    category: 'Beverages',
    price: '$5.00',
    image: 'images/coffee-cup.jpg'
  },
  {
    id: 4,
    name: 'Chocolate Cookie',
    category: 'Cookies',
    price: '$2.50',
    image: 'images/chocolate-cookie.jpg'
  },
  {
    id: 5,
    name: 'Salmon Sandwich',
    category: 'Sandwiches',
    price: '$12.50',
    image: 'images/salmon-sandwich.jpg'
  },
  {
    id: 6,
    name: 'Coffee Arabica',
    category: 'Coffee',
    price: '$8.50',
    image: 'images/coffee-arabica.jpg'
  },
  {
    id: 7,
    name: 'Pain Baguette',
    category: 'Bread',
    price: '$3.00',
    image: 'images/pain-baguette.jpg'
  },
  {
    id: 8,
    name: 'Focaccia Ciabatta',
    category: 'Bread',
    price: '$5.50',
    image: 'images/focaccia-ciabatta.jpg'
  },
  {
    id: 9,
    name: 'Croissant',
    category: 'Pastry',
    price: '$3.50',
    image: 'images/croissant.png'
  },
  {
    id: 10,
    name: 'Espresso',
    category: 'Coffee',
    price: '$4.00',
    image: 'images/coffee.png'
  }
];

// Search function
function performSearch(query) {
  // Clear previous results
  searchResults.innerHTML = '';
  
  if (!query.trim()) {
    return;
  }
  
  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  });
  
  // Display results
  if (filteredProducts.length === 0) {
    searchResults.innerHTML = `
      <div class="search-no-results">
        <p>No products found for "${query}"</p>
      </div>
    `;
  } else {
    filteredProducts.forEach(product => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('search-result-item');
      
      resultItem.innerHTML = `
        <div class="result-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="result-content">
          <h3 class="result-title">${product.name}</h3>
          <p class="result-category">${product.category}</p>
          <p class="result-price">${product.price}</p>
        </div>
      `;
      
      resultItem.addEventListener('click', () => {
        // In a real application, this would navigate to the product page
        alert(`You clicked on ${product.name}`);
      });
      
      searchResults.appendChild(resultItem);
    });
  }
  
  // Style the search results
  searchResults.style.display = 'block';
  
  // Add event listener to close search results when clicking outside
  document.addEventListener('click', closeSearchResults);
}

// Close search results
function closeSearchResults(e) {
  if (!e.target.closest('.search-container') && !e.target.closest('.search-results')) {
    searchResults.style.display = 'none';
    document.removeEventListener('click', closeSearchResults);
  }
}

// Event listeners
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch(searchInput.value);
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    if (e.target.value.length >= 2) {
      performSearch(e.target.value);
    } else {
      searchResults.innerHTML = '';
      searchResults.style.display = 'none';
    }
  });
}

if (mobileSearchForm) {
  mobileSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real application, this would perform the search and redirect to a search results page
    alert(`Searching for: ${mobileSearchInput.value}`);
  });
}

// Add styles for search results
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .search-results {
      margin-top: 1rem;
      max-height: 300px;
      overflow-y: auto;
      display: none;
    }
    
    .search-result-item {
      display: flex;
      gap: 1rem;
      padding: 0.75rem;
      border-bottom: 1px solid var(--light-gray);
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .search-result-item:hover {
      background-color: var(--light-gray);
    }
    
    .search-result-item:last-child {
      border-bottom: none;
    }
    
    .result-image {
      width: 50px;
      height: 50px;
      border-radius: var(--border-radius-sm);
      overflow: hidden;
    }
    
    .result-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .result-content {
      flex: 1;
    }
    
    .result-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--heading-color);
      margin-bottom: 0.25rem;
    }
    
    .result-category {
      font-size: 0.8rem;
      color: var(--text-light);
      margin-bottom: 0.25rem;
    }
    
    .result-price {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--primary-color);
    }
    
    .search-no-results {
      padding: 1rem;
      text-align: center;
      color: var(--text-light);
      font-size: 0.9rem;
    }
  </style>
`);
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all necessary elements
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearch');
  const searchSuggestions = document.getElementById('searchSuggestions');
  const productsContainer = document.getElementById('productsContainer');
  const productCards = document.querySelectorAll('.product-card');
  const noResults = document.getElementById('noResults');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const resultsCount = document.getElementById('resultsCount');
  const resetFiltersBtn = document.getElementById('resetFilters');
  
  // Price range elements
  const minPriceSlider = document.getElementById('minPrice');
  const maxPriceSlider = document.getElementById('maxPrice');
  const minPriceInput = document.getElementById('minPriceInput');
  const maxPriceInput = document.getElementById('maxPriceInput');
  const minPriceDisplay = document.getElementById('minPriceDisplay');
  const maxPriceDisplay = document.getElementById('maxPriceDisplay');
  const applyFilterBtn = document.getElementById('applyFilter');
  const sliderTrack = document.getElementById('sliderTrack');
  
  // Current filters
  let currentCategory = 'all';
  let currentMinPrice = 0;
  let currentMaxPrice = 150;
  let currentSearchTerm = '';

  // All product data for search suggestions
  const products = Array.from(productCards).map(card => ({
    name: card.querySelector('.product-title').textContent.toLowerCase(),
    element: card
  }));

  // ======================
  // PRICE RANGE SLIDER
  // ======================
  
  function updateSliderTrack() {
    const min = parseInt(minPriceSlider.value);
    const max = parseInt(maxPriceSlider.value);
    const rangeMin = parseInt(minPriceSlider.min);
    const rangeMax = parseInt(minPriceSlider.max);
    
    const percentMin = ((min - rangeMin) / (rangeMax - rangeMin)) * 100;
    const percentMax = ((max - rangeMin) / (rangeMax - rangeMin)) * 100;
    
    sliderTrack.style.background = `linear-gradient(to right, 
      #e2e8f0 0%, 
      #e2e8f0 ${percentMin}%, 
      #667eea ${percentMin}%, 
      #667eea ${percentMax}%, 
      #e2e8f0 ${percentMax}%, 
      #e2e8f0 100%)`;
  }

  // Sync slider with input
  minPriceSlider.addEventListener('input', function() {
    let minVal = parseInt(this.value);
    let maxVal = parseInt(maxPriceSlider.value);
    
    if (minVal >= maxVal) {
      minVal = maxVal - 5;
      this.value = minVal;
    }
    
    minPriceInput.value = minVal;
    minPriceDisplay.textContent = '$' + minVal;
    updateSliderTrack();
  });

  maxPriceSlider.addEventListener('input', function() {
    let maxVal = parseInt(this.value);
    let minVal = parseInt(minPriceSlider.value);
    
    if (maxVal <= minVal) {
      maxVal = minVal + 5;
      this.value = maxVal;
    }
    
    maxPriceInput.value = maxVal;
    maxPriceDisplay.textContent = '$' + maxVal;
    updateSliderTrack();
  });

  // Sync input with slider
  minPriceInput.addEventListener('input', function() {
    let minVal = parseInt(this.value) || 0;
    let maxVal = parseInt(maxPriceInput.value) || 150;
    
    if (minVal >= maxVal) {
      minVal = maxVal - 5;
      this.value = minVal;
    }
    
    if (minVal < 0) minVal = 0;
    if (minVal > 150) minVal = 150;
    
    minPriceSlider.value = minVal;
    minPriceDisplay.textContent = '$' + minVal;
    updateSliderTrack();
  });

  maxPriceInput.addEventListener('input', function() {
    let maxVal = parseInt(this.value) || 150;
    let minVal = parseInt(minPriceInput.value) || 0;
    
    if (maxVal <= minVal) {
      maxVal = minVal + 5;
      this.value = maxVal;
    }
    
    if (maxVal < 0) maxVal = 0;
    if (maxVal > 150) maxVal = 150;
    
    maxPriceSlider.value = maxVal;
    maxPriceDisplay.textContent = '$' + maxVal;
    updateSliderTrack();
  });

  // Apply filter button
  applyFilterBtn.addEventListener('click', function() {
    currentMinPrice = parseInt(minPriceSlider.value);
    currentMaxPrice = parseInt(maxPriceSlider.value);
    filterProducts();
    
    // Animation feedback
    this.innerHTML = '<i class="fas fa-check"></i> Applied!';
    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-check"></i> Apply Filter';
    }, 1000);
  });

  // Initialize slider track
  updateSliderTrack();

  // ======================
  // SEARCH FUNCTIONALITY
  // ======================
  
  // Real-time search
  searchInput.addEventListener('input', function(e) {
    currentSearchTerm = e.target.value.toLowerCase().trim();
    
    // Show/hide clear button
    if (currentSearchTerm) {
      clearSearchBtn.classList.add('visible');
    } else {
      clearSearchBtn.classList.remove('visible');
    }

    // Show suggestions
    if (currentSearchTerm.length > 0) {
      showSuggestions(currentSearchTerm);
    } else {
      searchSuggestions.classList.remove('show');
    }

    // Filter products
    filterProducts();
  });

  // Clear search
  clearSearchBtn.addEventListener('click', function() {
    searchInput.value = '';
    currentSearchTerm = '';
    clearSearchBtn.classList.remove('visible');
    searchSuggestions.classList.remove('show');
    filterProducts();
    searchInput.focus();
  });

  // Show search suggestions
  function showSuggestions(searchTerm) {
    const suggestions = products.filter(product => 
      product.name.includes(searchTerm)
    );

    // Get unique suggestions
    const uniqueSuggestions = [...new Set(suggestions.map(s => s.name))];

    if (uniqueSuggestions.length > 0) {
      searchSuggestions.innerHTML = uniqueSuggestions
        .slice(0, 5)
        .map(suggestion => `
          <div class="suggestion-item" data-suggestion="${suggestion}">
            <i class="fas fa-search"></i>
            <span>${highlightMatch(capitalizeWords(suggestion), searchTerm)}</span>
          </div>
        `).join('');
      
      searchSuggestions.classList.add('show');

      // Add click handlers to suggestions
      document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
          const suggestion = this.dataset.suggestion;
          searchInput.value = capitalizeWords(suggestion);
          currentSearchTerm = suggestion;
          searchSuggestions.classList.remove('show');
          filterProducts();
        });
      });
    } else {
      searchSuggestions.classList.remove('show');
    }
  }

  // Highlight matching text
  function highlightMatch(text, search) {
    const regex = new RegExp(`(${escapeRegex(search)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  // Escape special regex characters
  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Capitalize words
  function capitalizeWords(str) {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Close suggestions when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
      searchSuggestions.classList.remove('show');
    }
  });

  // ======================
  // CATEGORY FILTER
  // ======================
  
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active state
      categoryBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Get category
      currentCategory = this.dataset.category;
      
      // Filter products
      filterProducts();
    });
  });

  // ======================
  // FILTER PRODUCTS
  // ======================
  
  function filterProducts() {
    let visibleCount = 0;

    productCards.forEach(card => {
      const productName = card.querySelector('.product-title').textContent.toLowerCase();
      const productCategory = card.dataset.category;
      const productPrice = parseFloat(card.dataset.price);
      
      // Check search match
      const matchesSearch = !currentSearchTerm || productName.includes(currentSearchTerm);
      
      // Check category match
      const matchesCategory = currentCategory === 'all' || productCategory === currentCategory;
      
      // Check price match
      const matchesPrice = productPrice >= currentMinPrice && productPrice <= currentMaxPrice;
      
      // Show or hide card
      if (matchesSearch && matchesCategory && matchesPrice) {
        card.classList.remove('hidden');
        visibleCount++;
        
        // Highlight search terms in product title and description
        if (currentSearchTerm) {
          highlightInCard(card, currentSearchTerm);
        } else {
          removeHighlights(card);
        }
      } else {
        card.classList.add('hidden');
      }
    });

    // Update results count
    updateResultsCount(visibleCount);

    // Show/hide no results message
    if (visibleCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }

  // Update results count
  function updateResultsCount(count) {
    if (count === 0) {
      resultsCount.textContent = 'No products found';
    } else if (count === productCards.length) {
      resultsCount.textContent = `Showing all ${count} products`;
    } else {
      resultsCount.textContent = `Showing ${count} of ${productCards.length} products`;
    }
  }

  // Highlight search terms in card
  function highlightInCard(card, searchTerm) {
    const title = card.querySelector('.product-title');
    const description = card.querySelector('.product-description');
    
    if (title && !title.dataset.original) {
      title.dataset.original = title.textContent;
    }
    if (description && !description.dataset.original) {
      description.dataset.original = description.textContent;
    }
    
    if (title && title.dataset.original) {
      title.innerHTML = highlightMatch(title.dataset.original, searchTerm);
    }
    if (description && description.dataset.original) {
      description.innerHTML = highlightMatch(description.dataset.original, searchTerm);
    }
  }

  // Remove highlights from card
  function removeHighlights(card) {
    const title = card.querySelector('.product-title');
    const description = card.querySelector('.product-description');
    
    if (title && title.dataset.original) {
      title.textContent = title.dataset.original;
    }
    if (description && description.dataset.original) {
      description.textContent = description.dataset.original;
    }
  }

  // ======================
  // RESET FILTERS
  // ======================
  
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', function() {
      // Reset all filters
      currentCategory = 'all';
      currentMinPrice = 0;
      currentMaxPrice = 150;
      currentSearchTerm = '';
      
      // Reset UI
      categoryBtns.forEach(btn => {
        if (btn.dataset.category === 'all') {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      
      searchInput.value = '';
      clearSearchBtn.classList.remove('visible');
      
      minPriceSlider.value = 0;
      maxPriceSlider.value = 150;
      minPriceInput.value = 0;
      maxPriceInput.value = 150;
      minPriceDisplay.textContent = '$0';
      maxPriceDisplay.textContent = '$150';
      
      updateSliderTrack();
      filterProducts();
    });
  }

  // ======================
  // BUY BUTTON & NOTIFICATIONS
  // ======================
  
  const buyButtons = document.querySelectorAll('.buy-btn');
  
  buyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productName = this.dataset.product;
      const productPrice = this.dataset.price;
      
      // Create and show notification
      showNotification(productName, productPrice);
      
      // Add animation to button
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 100);
    });
  });

  // Show notification
  function showNotification(productName, productPrice) {
    const notificationContainer = document.getElementById('notification-container');
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div class="notification-icon">
        <i class="fas fa-check"></i>
      </div>
      <div class="notification-content">
        <div class="notification-title">Added to Cart!</div>
        <div class="notification-message">${productName} - $${productPrice}</div>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
      notification.remove();
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // ======================
  // KEYBOARD NAVIGATION
  // ======================
  
  searchInput.addEventListener('keydown', function(e) {
    const suggestions = document.querySelectorAll('.suggestion-item');
    
    if (e.key === 'Escape') {
      searchSuggestions.classList.remove('show');
      searchInput.blur();
    }
    
    if (e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault();
      suggestions[0].click();
    }
  });

  // Initialize results count
  updateResultsCount(productCards.length);
});
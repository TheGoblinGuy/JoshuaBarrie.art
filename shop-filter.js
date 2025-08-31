// shop-filter.js

// This function will be called from script.js after products are loaded
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      productCards.forEach(card => {
        // This is a simple filter. You would need to add a data-type="original" attribute to your product cards based on Shopify data.
        if (filter === 'all') {
          card.style.display = 'block';
        } else {
          if (card.getAttribute('data-type') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}

// You would need to modify the createProductCard function in script.js to add the data-type attribute.
// function createProductCard(product) {
//   const productType = product.title.toLowerCase().includes('original') ? 'original' : 'print';
//   return `
//     <div class="product-card" data-type="${productType}">
//       ...
//     </div>
//   `;
// }

// script.js

// Your Shopify store's unique domain (from the Buy Button channel)
const domain = 'your-store-name.myshopify.com'; // REPLACE THIS

// Function to create a product card HTML
function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.images[0]?.src}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.variants[0]?.price}</p>
      <div id="product-component-${product.id}"></div>
    </div>
  `;
}

// Function to initialize the Shopify Buy Button for a single product
function initBuyButton(product, componentId) {
  const client = ShopifyBuy.buildClient({
    domain: domain,
    storefrontAccessToken: 'your-storefront-access-token' // GET THIS FROM SHOPIFY
  });

  ShopifyBuy.UI.onReady(client).then(function(ui) {
    ui.createComponent('product', {
      id: product.id,
      node: document.getElementById(componentId),
      moneyFormat: '%24%7B%7Bamount%7D%7D',
      options: {
        "product": {
          "styles": {
            "product": {
              "@media (min-width: 601px)": {
                "max-width": "100%",
                "margin-left": "0",
                "margin-bottom": "50px"
              }
            },
            "button": {
              "background-color": "#000000",
              ":hover": {
                "background-color": "#333333"
              },
              ":focus": {
                "background-color": "#333333"
              }
            }
          },
          "contents": {
            "img": false, // We use our own image
            "title": false, // We use our own title
            "price": false // We use our own price
          },
          "text": {
            "button": "Add to Cart"
          }
        },
        "cart": {
          "contents": {
            "button": true
          },
          "text": {
            "title": "Your Cart",
            "empty": "Your cart is empty."
          },
          "popup": false // Redirect to Shopify checkout instead
        },
        "toggle": {
          "styles": {
            "toggle": {
              "background-color": "#000000",
              ":hover": {
                "background-color": "#333333"
              },
              ":focus": {
                "background-color": "#333333"
              }
            }
          }
        }
      }
    });
  });
}

// Main function to fetch products and build the page
async function fetchProducts() {
  try {
    // This is a proxy to avoid CORS issues. You'll need a simple serverless function for this.
    const response = await fetch(`https://your-proxy-function.vercel.app/api/products?domain=${domain}`);
    const products = await response.json();

    const featuredContainer = document.getElementById('featured-container');
    featuredContainer.innerHTML = ''; // Clear loading text

    // Take the first 3 products for the homepage
    const featuredProducts = products.slice(0, 3);

    featuredProducts.forEach(product => {
      const productCardHtml = createProductCard(product);
      featuredContainer.insertAdjacentHTML('beforeend', productCardHtml);
      // Initialize the buy button for this product
      initBuyButton(product, `product-component-${product.id}`);
    });

  } catch (error) {
    console.error("Error loading products:", error);
    document.getElementById('featured-container').innerHTML = '<p>Sorry, the artwork is not available right now.</p>';
  }
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', fetchProducts);

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

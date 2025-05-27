
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;
  
    // Initialize cart on page load
    document.addEventListener('DOMContentLoaded', function() {
      updateCart();
    });
  
    function addToCart(product, price, image = '') {
      // Check if product already exists in cart
      const existingItem = cart.find(item => item.product === product);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ 
          product, 
          price, 
          quantity: 1,
          image
        });
      }
      
      cartTotal += price;
      saveCart();
      updateCart();
      
      // Show a quick notification
      showNotification(`${product} added to cart!`);
    }
  
    function removeFromCart(index) {
      const item = cart[index];
      cartTotal -= item.price * item.quantity;
      cart.splice(index, 1);
      saveCart();
      updateCart();
    }
  
    function updateCart() {
      const cartItems = document.getElementById('cart-items');
      const cartCount = document.getElementById('cart-count');
      const cartTotalElement = document.getElementById('cart-total');
  
      cartItems.innerHTML = '';
      
      if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartCount.textContent = '0';
        cartTotalElement.textContent = '0.00';
        return;
      }
  
      cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <div class="cart-item-image">
            ${item.image ? `<img src="${item.image}" alt="${item.product}" style="width:50px;height:50px;object-fit:cover;">` : ''}
          </div>
          <div class="cart-item-details">
            <h4>${item.product}</h4>
            <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button class="remove-item" onclick="removeFromCart(${index})">
            <i class="fas fa-trash"></i>
          </button>
        `;
        cartItems.appendChild(cartItem);
      });
  
      cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
      cartTotalElement.textContent = cartTotal.toFixed(2);
    }
  
    function toggleCart() {
      const cartDiv = document.getElementById('cart');
      cartDiv.style.display = cartDiv.style.display === 'none' ? 'block' : 'none';
    }
  
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('cartTotal', cartTotal.toString());
    }
  
    function checkout() {
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      alert(`Proceeding to checkout with total: $${cartTotal.toFixed(2)}`);
      // In a real implementation, you would redirect to a checkout page
    }
  
    function showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add('show');
      }, 10);
      
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    }
  
    function toggleNav() {
      const nav = document.getElementById("nav-links");
      nav.classList.toggle("active");
    }
  

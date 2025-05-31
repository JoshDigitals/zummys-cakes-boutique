// Cart functionality
class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    init() {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('bakeryCart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateTotal();
        }

        // Initialize UI elements
        this.cartIcon = document.querySelector('.cart-icon');
        this.cartCount = document.querySelector('.cart-count');
        this.cartOverlay = document.querySelector('.cart-overlay');
        this.cartSidebar = document.querySelector('.cart-sidebar');
        this.cartItems = document.querySelector('.cart-items');
        this.totalAmount = document.querySelector('.total-amount');
        this.checkoutBtn = document.querySelector('.checkout-btn');

        // Add event listeners
        document.addEventListener('click', (e) => this.handleClick(e));
        this.updateCartCount();
        this.renderCart();
    }

    handleClick(e) {
        // Add to cart button
        if (e.target.closest('.add-to-cart-btn')) {
            const btn = e.target.closest('.add-to-cart-btn');
            const productId = btn.dataset.productId;
            const productName = btn.dataset.productName;
            const productPrice = parseFloat(btn.dataset.productPrice);
            this.addItem({ id: productId, name: productName, price: productPrice, quantity: 1 });
            this.animateCartIcon();
        }

        // Cart icon - open cart
        if (e.target.closest('.cart-icon')) {
            this.openCart();
        }

        // Close cart
        if (e.target.closest('.cart-close') || 
            (this.cartOverlay.classList.contains('active') && !e.target.closest('.cart-sidebar'))) {
            this.closeCart();
        }

        // Quantity buttons
        if (e.target.closest('.quantity-btn')) {
            const btn = e.target.closest('.quantity-btn');
            const itemId = btn.closest('.cart-item').dataset.productId;
            if (btn.classList.contains('quantity-increase')) {
                this.updateQuantity(itemId, 1);
            } else if (btn.classList.contains('quantity-decrease')) {
                this.updateQuantity(itemId, -1);
            }
        }

        // Remove item button
        if (e.target.closest('.cart-item-remove')) {
            const itemId = e.target.closest('.cart-item').dataset.productId;
            this.removeItem(itemId);
        }
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push(product);
        }
        this.updateCart();
    }

    updateQuantity(productId, change) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.updateCart();
            }
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCart();
    }

    updateCart() {
        this.updateTotal();
        this.updateCartCount();
        this.renderCart();
        this.saveCart();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (this.totalAmount) {
            this.totalAmount.textContent = `$${this.total.toFixed(2)}`;
        }
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        if (this.cartCount) {
            this.cartCount.textContent = count;
        }
    }

    renderCart() {
        if (!this.cartItems) return;

        this.cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn quantity-decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn quantity-increase">+</button>
                    </div>
                </div>
                <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }

    saveCart() {
        localStorage.setItem('bakeryCart', JSON.stringify(this.items));
    }

    openCart() {
        this.cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        this.cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    animateCartIcon() {
        this.cartIcon.classList.add('shake');
        setTimeout(() => this.cartIcon.classList.remove('shake'), 500);
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
});

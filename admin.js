// Admin Dashboard JavaScript
class ProductManager {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('products')) || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderProducts();
        this.updateStats();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addProduct();
        });

        // Image upload
        document.getElementById('image-input').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('image-preview');
                preview.src = e.target.result;
                preview.style.display = 'block';
                document.querySelector('.image-upload p').textContent = 'Image selected';
            };
            reader.readAsDataURL(file);
        }
    }

    addProduct() {
        const form = document.getElementById('product-form');
        const imageInput = document.getElementById('image-input');
        
        // Get form data
        const productData = {
            id: Date.now(),
            name: document.getElementById('product-name').value,
            price: parseFloat(document.getElementById('product-price').value),
            stock: parseInt(document.getElementById('product-stock').value),
            category: document.getElementById('product-category').value,
            scent: document.getElementById('product-scent').value,
            description: document.getElementById('product-description').value,
            image: document.getElementById('image-preview').src || 'assets/image-placeholder.jpg',
            dateAdded: new Date().toISOString()
        };

        // Add to products array
        this.products.push(productData);
        
        // Save to localStorage
        localStorage.setItem('products', JSON.stringify(this.products));
        
        // Update display
        this.renderProducts();
        this.updateStats();
        
        // Reset form
        form.reset();
        document.getElementById('image-preview').style.display = 'none';
        document.querySelector('.image-upload p').textContent = 'Click to upload image';
        
        // Show success message
        this.showNotification('Product added successfully!', 'success');
    }

    renderProducts() {
        const container = document.getElementById('products-container');
        
        if (this.products.length === 0) {
            container.innerHTML = '<p style="color: #fff; text-align: center;">No products added yet.</p>';
            return;
        }

        container.innerHTML = this.products.map(product => `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)} • Stock: ${product.stock} • ${product.category}</p>
                    <p>${product.scent ? 'In-A-Scent: ' + product.scent : ''}</p>
                </div>
                <div class="product-actions">
                    <button class="btn-edit" onclick="productManager.editProduct(${product.id})">Edit</button>
                    <button class="btn-delete" onclick="productManager.deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return;

        // Fill form with product data
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-scent').value = product.scent;
        document.getElementById('product-description').value = product.description;
        
        if (product.image && product.image !== 'assets/image-placeholder.jpg') {
            document.getElementById('image-preview').src = product.image;
            document.getElementById('image-preview').style.display = 'block';
        }

        // Remove product from array (will be re-added when form is submitted)
        this.deleteProduct(id, false);
        
        // Scroll to form
        document.querySelector('.add-product-form').scrollIntoView({ behavior: 'smooth' });
    }

    deleteProduct(id, showConfirm = true) {
        if (showConfirm && !confirm('Are you sure you want to delete this product?')) {
            return;
        }

        this.products = this.products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(this.products));
        
        this.renderProducts();
        this.updateStats();
        
        if (showConfirm) {
            this.showNotification('Product deleted successfully!', 'success');
        }
    }

    updateStats() {
        const totalProducts = this.products.length;
        const inStock = this.products.filter(p => p.stock > 0).length;
        const lowStock = this.products.filter(p => p.stock > 0 && p.stock <= 5).length;
        const avgPrice = totalProducts > 0 ? 
            this.products.reduce((sum, p) => sum + p.price, 0) / totalProducts : 0;

        document.getElementById('total-products').textContent = totalProducts;
        document.getElementById('in-stock').textContent = inStock;
        document.getElementById('low-stock').textContent = lowStock;
        document.getElementById('avg-price').textContent = '$' + avgPrice.toFixed(2);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 'bold',
            zIndex: '10000',
            maxWidth: '300px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        // Set background color
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Add to page and animate
        document.body.appendChild(notification);
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Export products for gallery page
    exportProducts() {
        return this.products;
    }
}

// Initialize product manager
const productManager = new ProductManager();

// Make products available globally for gallery page
window.getProducts = () => productManager.exportProducts();
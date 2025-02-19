document.addEventListener('DOMContentLoaded', () => {
    /** === Smooth Scrolling for Navigation Links === **/
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith("#")) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.warn(`No section found with ID '${targetId}'`);
                }
            }
        });
    });

    /** === Floating Frame Hover Effect === **/
    const frames = document.querySelectorAll('.frame');

    frames.forEach(frame => {
        frame.addEventListener('mouseover', () => {
            frame.classList.add('floating');
        });
        frame.addEventListener('mouseout', () => {
            frame.classList.remove('floating');
        });
    });

    /** === Carousel Functionality (Fix for Missing Elements) === **/
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (track && prevButton && nextButton) {
        let currentIndex = 0;
        const items = document.querySelectorAll('.carousel-item');

        nextButton.addEventListener('click', () => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                track.style.transform = `translateX(-${currentIndex * 260}px)`;
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                track.style.transform = `translateX(-${currentIndex * 260}px)`;
            }
        });
    } else {
        console.warn("Carousel elements not found on this page. Skipping carousel script.");
    }

    /** === On Sale Now Section === **/
    // Sample data for products (replace with your actual data)
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 12; // Number of items per page

    // DOM Elements
    const productGrid = document.querySelector(".product-grid");
    const ownerPanel = document.getElementById("owner-panel");
    const ownerSignInButton = document.getElementById("owner-sign-in");
    const productForm = document.getElementById("product-form");
    const closePanelButton = document.getElementById("close-panel");
    const productSelect = document.getElementById("product-select");
    const loadProductButton = document.getElementById("load-product");
    const deleteProductButton = document.getElementById("delete-product");
    const productNameInput = document.getElementById("product-name");
    const productPriceInput = document.getElementById("product-price");
    const productImageInput = document.getElementById("product-image");
    const productColorsInput = document.getElementById("product-colors");
    const productDescriptionInput = document.getElementById("product-description");

    // Function to display products
    function displayProducts(page = 1) {
        productGrid.innerHTML = ""; // Clear existing items

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);

        paginatedProducts.forEach((product, index) => {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <p>${product.name}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                ${product.colors ? `<div class="options">
                    <select>
                        <option value="">Select Color</option>
                        ${product.colors.split(",").map(color => `<option value="${color.trim()}">${color.trim()}</option>`).join("")}
                    </select>
                </div>` : ""}
                <div class="options">
                    <button onclick="addToCart(${index}, 'single')">Buy Single</button>
                    <button onclick="addToCart(${index}, 'bulk')">Buy Bulk</button>
                </div>
            `;
            productGrid.appendChild(productItem);
        });

        // Update page indicator
        document.getElementById("page-indicator").textContent = `Page ${page}`;
    }

    // Function to populate the product dropdown
    function populateProductDropdown() {
        productSelect.innerHTML = '<option value="">-- Select a Product --</option>';
        products.forEach((product, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }

    // Function to load product details into the form
    function loadProductDetails(index) {
        const product = products[index];
        productNameInput.value = product.name;
        productPriceInput.value = product.price;
        productImageInput.value = product.image;
        productColorsInput.value = product.colors || "";
        productDescriptionInput.value = product.description || "";
    }

    // Event listener for "Load Product" button
    loadProductButton.addEventListener("click", () => {
        const selectedIndex = productSelect.value;
        if (selectedIndex !== "") {
            loadProductDetails(selectedIndex);
        } else {
            alert("Please select a product to load.");
        }
    });

    // Event listener for "Delete Product" button
    deleteProductButton.addEventListener("click", () => {
        const selectedIndex = productSelect.value;
        if (selectedIndex !== "") {
            if (confirm("Are you sure you want to delete this product?")) {
                products.splice(selectedIndex, 1);
                localStorage.setItem("products", JSON.stringify(products));
                populateProductDropdown();
                productForm.reset();
                displayProducts(currentPage);
                alert("Product deleted successfully!");
            }
        } else {
            alert("Please select a product to delete.");
        }
    });

    // Function to handle form submission (add/update product)
    function handleProductFormSubmit(event) {
        event.preventDefault();
        const name = productNameInput.value;
        const price = parseFloat(productPriceInput.value);
        const image = productImageInput.value;
        const colors = productColorsInput.value;
        const description = productDescriptionInput.value;

        const product = { name, price, image, colors, description };

        // Check if product already exists (update) or add new
        const selectedIndex = productSelect.value;
        if (selectedIndex !== "") {
            // Update existing product
            products[selectedIndex] = product;
            alert("Product updated successfully!");
        } else {
            // Add new product
            products.push(product);
            alert("Product added successfully!");
        }

        localStorage.setItem("products", JSON.stringify(products));
        populateProductDropdown();
        productForm.reset();
        displayProducts(currentPage);
    }

    // Event listener for form submission
    productForm.addEventListener("submit", handleProductFormSubmit);

    // Function to open owner panel
    function openOwnerPanel() {
        ownerPanel.style.display = "block";
        populateProductDropdown();
    }

    // Function to close owner panel
    function closeOwnerPanel() {
        ownerPanel.style.display = "none";
        productForm.reset();
    }

    // Event Listeners
    ownerSignInButton.addEventListener("click", openOwnerPanel);
    closePanelButton.addEventListener("click", closeOwnerPanel);

    // Pagination buttons
    const nextPageButton = document.getElementById("next-page");
    const prevPageButton = document.getElementById("prev-page");

    if (nextPageButton) {
        nextPageButton.addEventListener("click", () => {
            const totalPages = Math.ceil(products.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts(currentPage);
            }
        });
    }

    if (prevPageButton) {
        prevPageButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                displayProducts(currentPage);
            }
        });
    }

    // Initial load
    displayProducts();
});

// Function to add item to cart (placeholder)
window.addToCart = function(index, type) {
    const product = products[index];
    alert(`Added ${product.name} (${type}) to cart!`);
};

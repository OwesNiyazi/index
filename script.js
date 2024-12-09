document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.getElementById("itemsContainer");
    const num = document.getElementById("num");
    const billItemsContainer = document.getElementById("billItemsContainer");
    const totalAmount = document.getElementById("totalAmount");
    let count = 0;
    let totalPrice = 0;

    // Array of objects containing product data
    const products = [
       { id: 1, name: 'MOBile', price: '19.99', imageUrl: 'https://m.media-amazon.com/images/I/71DoeQ838GL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 2, name: 'Flip', price: '29.99', imageUrl: 'https://m.media-amazon.com/images/I/71pKVhll1IL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 3, name: 'Product 3', price: '39.99', imageUrl: 'https://m.media-amazon.com/images/I/71ceEkr+QQL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 4, name: 'Product 4', price: '49.99', imageUrl: 'https://m.media-amazon.com/images/I/6175SlKKECL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 5, name: 'Product 5', price: '59.99', imageUrl: 'https://m.media-amazon.com/images/I/717JX3femML._AC_UY327_FMwebp_QL65_.jpg' },

       { id: 6, name: 'Product 1', price: '19.99', imageUrl: 'https://m.media-amazon.com/images/I/71DoeQ838GL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 7, name: 'Product 2', price: '29.99', imageUrl: 'https://m.media-amazon.com/images/I/71pKVhll1IL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 8, name: 'Product 3', price: '39.99', imageUrl: 'https://m.media-amazon.com/images/I/71ceEkr+QQL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 9, name: 'Product 4', price: '49.99', imageUrl: 'https://m.media-amazon.com/images/I/6175SlKKECL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 10, name: 'Product 5', price: '59.99', imageUrl: 'https://m.media-amazon.com/images/I/717JX3femML._AC_UY327_FMwebp_QL65_.jpg' },

       { id: 11, name: 'Product 1', price: '19.99', imageUrl: 'https://m.media-amazon.com/images/I/71DoeQ838GL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 12, name: 'Product 2', price: '29.99', imageUrl: 'https://m.media-amazon.com/images/I/71pKVhll1IL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 13, name: 'Product 3', price: '39.99', imageUrl: 'https://m.media-amazon.com/images/I/71ceEkr+QQL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 14, name: 'Product 4', price: '49.99', imageUrl: 'https://m.media-amazon.com/images/I/6175SlKKECL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 15, name: 'Product 5', price: '59.99', imageUrl: 'https://m.media-amazon.com/images/I/717JX3femML._AC_UY327_FMwebp_QL65_.jpg' },

       { id: 16, name: 'Product 1', price: '19.99', imageUrl: 'https://m.media-amazon.com/images/I/71DoeQ838GL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 17, name: 'Product 2', price: '29.99', imageUrl: 'https://m.media-amazon.com/images/I/71pKVhll1IL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 18, name: 'Product 3', price: '39.99', imageUrl: 'https://m.media-amazon.com/images/I/71ceEkr+QQL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 19, name: 'Product 4', price: '49.99', imageUrl: 'https://m.media-amazon.com/images/I/6175SlKKECL._AC_UY327_FMwebp_QL65_.jpg' },
       { id: 20, name: 'Product 5', price: '59.99', imageUrl: 'https://m.media-amazon.com/images/I/717JX3femML._AC_UY327_FMwebp_QL65_.jpg' }
    ];

    // Generate product cards
    products.forEach(product => {
       const productCard = document.createElement("div");
       productCard.classList.add("cart-item");

       productCard.innerHTML = `
          <img src="${product.imageUrl}" alt="Product Image">
          <div class="cart-item-info">
             <span class="cart-item-name">${product.name}</span>
             <span class="cart-item-price">$${product.price}</span>
             <button class="cart-button" data-id="${product.id}">Add+</button>
          </div>
       `;

       itemsContainer.appendChild(productCard);
    });

    // Add event listener to each button
    itemsContainer.addEventListener("click", (event) => {
       if (event.target.classList.contains("cart-button")) {
          const button = event.target;
          const productId = button.dataset.id;
          const product = products.find(p => p.id === parseInt(productId));
          const isAdding = button.textContent === "Add+"; // Check if "Add+" or "Remove"

          if (isAdding) {
             count++;
             totalPrice += parseFloat(product.price);
             button.textContent = "Remove";
             button.style.backgroundColor = "#e5533d"; // Change color for "Remove"

             // Add item to bill desk
             const billItem = document.createElement("div");
             billItem.classList.add("bill-item");
             billItem.innerHTML = `
                <img src="${product.imageUrl}" alt="Product Image">
                <div class="bill-item-info">
                   <span class="item-name">${product.name}</span>
                   <span class="item-price">$${product.price}</span>
                   <div class="item-controls">
                       <button onclick="decrementQuantity(this)">-</button>
                       <span class="item-quantity">1</span>
                       <button onclick="incrementQuantity(this)">+</button>
                   </div>
                </div>
             `;
             billItemsContainer.appendChild(billItem);
          } else {
             count--;
             totalPrice -= parseFloat(product.price);
             button.textContent = "Add+";
             button.style.backgroundColor = "#ffed47"; // Reset color for "Add"

             // Remove from bill desk
             const billItem = Array.from(billItemsContainer.children).find(item => item.querySelector(".item-name").textContent === product.name);
             billItemsContainer.removeChild(billItem);
          }

          // Update cart count and total price
          num.textContent = count;
          totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
       }
    });
 });

 function toggleBillDesk() {
    const billDesk = document.getElementById("billDesk");
    billDesk.style.display = billDesk.style.display === "none" || billDesk.style.display === "" ? "block" : "none";
 }

 function incrementQuantity(button) {
    const quantitySpan = button.closest('.item-controls').querySelector('.item-quantity');
    const currentQuantity = parseInt(quantitySpan.textContent);
    quantitySpan.textContent = currentQuantity + 1;
    updateTotalAmount();
 }

 function decrementQuantity(button) {
    const quantitySpan = button.closest('.item-controls').querySelector('.item-quantity');
    const currentQuantity = parseInt(quantitySpan.textContent);
    if (currentQuantity > 1) {
       quantitySpan.textContent = currentQuantity - 1;
    }
    updateTotalAmount();
 }

 function updateTotalAmount() {
    const quantities = document.querySelectorAll(".item-quantity");
    let total = 0;

    quantities.forEach((quantityElement) => {
       const quantity = parseInt(quantityElement.textContent);
       const price = parseFloat(quantityElement.closest('.bill-item').querySelector('.item-price').textContent.replace('$', ''));
       total += quantity * price;
    });

    const totalAmount = document.getElementById("totalAmount");
    totalAmount.textContent = `$${total.toFixed(2)}`;
 }
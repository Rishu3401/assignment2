document.addEventListener("DOMContentLoaded", function() {
    const chocolates = [
        { name: "Snickers", price: 2.5, image: "snickers.jpg" },
        { name: "Dairymilk", price: 3.0, image: "dairymilk.jpg" },
        { name: "choco3", price: 2.0, image: "cadbury.jpg" },
        { name: "choco4", price: 3.5, image: "munch.jpg" },
        { name: "choco5", price: 4.0, image: "nutties.jpg" },
        { name: "choco6", price: 2.8, image: "bounty.jpg" },
        { name: "choco7", price: 3.2, image: "dark.jpg" },
        { name: "choco8", price: 2.3, image: "gems.jpg" },
        { name: "choco9", price: 3.7, image: "kitkat.jpg" },
        { name: "choco10", price: 4.5, image: "fuse.jpg" },
        { name: "choco11", price: 4.5, image: "musegold.jpg" },
    ];
    

    const cart = [];

    function displayChocolates() {
        const chocolatesContainer = document.querySelector('.chocolates-container');

        chocolates.forEach(chocolate => {
            const chocolateDiv = document.createElement('div');
            chocolateDiv.innerHTML = `
                <h3>${chocolate.name}</h3>
                <img src="${chocolate.image}" alt="${chocolate.name}" />
                <p>Price: ₹${chocolate.price}</p>
                <button class="add-to-cart-btn" data-name="${chocolate.name}" data-price="${chocolate.price}">Add to Cart</button>
            `;
            chocolateDiv.querySelector('.add-to-cart-btn').addEventListener('click', addToCart);
            chocolatesContainer.appendChild(chocolateDiv);
        });
    }

    function addToCart(event) {
        const chocolateName = event.target.dataset.name;
        const price = parseFloat(event.target.dataset.price);

        const totalQuantity = getTotalQuantity();
        const sameChocolatesInCart = findCartChocolates(chocolateName).length;

        if (totalQuantity < 8 && sameChocolatesInCart < 8) {
            const existingItem = cart.find(item => item.name === chocolateName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: chocolateName, price, quantity: 1 });
            }

            displayCart();
        } else {
            alert('You can add a maximum of 8 chocolates in total or 8 of the same type.');
        }
    }

    function findCartChocolates(chocolateName) {
        return cart.filter(item => item.name === chocolateName);
    }

    function getTotalQuantity() {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    function removeFromCart(chocolateName) {
        const itemIndex = cart.findIndex(item => item.name === chocolateName);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
            displayCart();
        }
    }

    function displayCart() {
        const cartItems = document.querySelector('.cart-items');
        const totalPrice = document.getElementById('total-price');
        const totalQuantityElement = document.getElementById('total-quantity');
        cartItems.innerHTML = '';

        let total = 0;
        let totalQuantity = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => removeFromCart(item.name));
            cartItem.textContent = `${item.name} - Quantity: ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`;
            cartItem.appendChild(removeButton);
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
            totalQuantity += item.quantity;
        });

        totalPrice.textContent = 'Total: ₹' + total.toFixed(2);
        totalQuantityElement.textContent = 'Total Quantity: ' + totalQuantity;
    }

    displayChocolates();
});
// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart

  const productAdd = products.find((item) => item.id === id);

  const productExistCart = cart.find((item) => item.id === id);

  let productOutOfStock = null;

  // 2. Add found product to the cart array
  if (productAdd && productExistCart) {
    productAdd.quantity++;
  } else if (productAdd && !productExistCart) {
    productAdd.quantity = 1;
    cart.push(productAdd);
  } else {
    productOutOfStock = true;
  }

  console.log(cart);

  applyPromotionsCart();
  calculateTotal();
  printCart();
}

// Exercise 2
function cleanCart() {
  cart.length = 0;
  total = 0;
  printCart();
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart
  let totalWithDiscount = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    totalWithDiscount += item.subtotalWithDiscount
      ? item.subtotalWithDiscount
      : item.price * item.quantity;
  }

  total = totalWithDiscount.toFixed(2);
}

// Exercise 4
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    if (item.offer && item.quantity >= item.offer.number) {
      item.subtotalWithDiscount =
        (item.price - (item.offer.percent * item.price) / 100) * item.quantity;
    } else {
      item.subtotalWithDiscount = 0;
    }
  }
}

// Exercise 5
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom

  // Get DOM refrerences
  const cartList = document.getElementById("cart_list");
  const showTotal = document.getElementById("total_price");
  const countProduct = document.getElementById("count_product");

  // Clean cart
  cartList.innerHTML = "";

  // Variables for HTML table
  let cartTableHTML = "";
  let productCount = 0;

  cart.forEach((item) => {
    // Build HTML table
    cartTableHTML += `
            <tr>
                <th scope="row">${item.name}</th>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>${item.subtotalWithDiscount.toFixed(2)}</td>
                <td><button class="btn btn-danger" onclick="removeFromCart(${
                  item.id
                })" style="margin-right: 30px">Remove</button></td>
            </tr>
        `;

    // Product counter
    productCount += item.quantity;
  });

  // Insert HTML table
  cartList.innerHTML = cartTableHTML;

  // Show final price and product count in the shopping cart DOM
  showTotal.innerHTML = total;
  countProduct.innerHTML = productCount;
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {

  itemToDelete = id;
  let foundItem = cart.find((item) => item.id === itemToDelete);

  if (foundItem.quantity > 1) {
    foundItem.quantity--;
  } else {
    cart.splice(foundItem, 1);
  }

  applyPromotionsCart();
  calculateTotal();
  printCart();
}

function open_modal() {
  printCart();
}

let domain = window.location.origin;

let toysData = [
  {
    imgSrc: "assets/hello-kitty.jpg",
    name: "Hello Kitty",
  },
  {
    imgSrc: "assets/alligator-toy.jpeg",
    name: "Alligator Toy",
  },
  {
    imgSrc: "assets/legos.jpeg",
    name: "Legos",
  },
  {
    imgSrc: "assets/karate-belt.jpeg",
    name: "Karate Belt",
  },
  {
    imgSrc: "assets/trophy.jpeg",
    name: "Trophy",
  },
];

let totalDomNode = document.querySelector(".total");
let searchButton = document.querySelector("header button");
let cartContainer = document.querySelector(".cart-container");

let cartInLocalStorage = localStorage.getItem("cart");

let cart = cartInLocalStorage === null ? [] : JSON.parse(cartInLocalStorage);

function getTotalCartItems() {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].quantity;
  }
  return sum;
}

function getClickedToyInCart(toyName) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].toy.name === toyName) {
      return cart[i];
    }
  }
  return null;
}

function add(toyData, spanDomNode) {
  let clickedToyInCart = getClickedToyInCart(toyData.name);
  // check if cart contains toy
  if (clickedToyInCart !== null) {
    // increment the quantity of this specific toy in the cart
    clickedToyInCart.quantity++;
    // update the total for the item itself
    spanDomNode.innerText = clickedToyInCart.quantity;
  } else {
    // add a new toy to the cart
    cart.push({
      toy: toyData,
      quantity: 1,
    });
    // update the total for the item itself
    spanDomNode.innerText = 1;
  }
  // update the cart total
  totalDomNode.innerText = getTotalCartItems();
  console.log(cart);
}

function removeToyFromCart(toyName) {
  // get the index of the toy in the cart
  let indexOfToyInCart;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].toy.name === toyName) {
      indexOfToyInCart = i;
    }
  }
  // remove the item from the cart
  cart.splice(indexOfToyInCart, 1);
}

function subtract(toyData, spanDomNode) {
  let clickedToyInCart = getClickedToyInCart(toyData.name);
  if (clickedToyInCart !== null) {
    // if its quantity is 1, remove it from the cart
    if (clickedToyInCart.quantity === 1) {
      // remove clicked toy from cart
      removeToyFromCart(toyData.name);
      // update the total for the item itself
      spanDomNode.innerText = 0;
    } else {
      // decrement the quantity
      clickedToyInCart.quantity--;
      // update the total for the item itself
      spanDomNode.innerText = clickedToyInCart.quantity;
    }
    // update the cart total
    totalDomNode.innerText = getTotalCartItems();
  }
  console.log(cart);
}

searchButton.addEventListener("click", function () {
  // grab the text that the user typed
  let input = document.querySelector("header input");
  let searchText = input.value.toLowerCase();

  // grab all of the name texts
  let nameTexts = document.querySelectorAll("ul li div p");

  // loop through each name text
  for (let i = 0; i < nameTexts.length; i++) {
    let currentnameText = nameTexts[i];
    // if the name text does not contain the search text, then make remove its whole li (list item) (which is a grandparent of the name text)
    if (currentnameText.innerText.toLowerCase().includes(searchText)) {
      currentnameText.parentElement.parentElement.style.display = "flex";
    } else {
      currentnameText.parentElement.parentElement.style.display = "none";
    }
  }
});

cartContainer.addEventListener("click", function () {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = `${domain}/cart.html`;
});

totalDomNode.innerText = getTotalCartItems();

for (let i = 0; i < toysData.length; i++) {
  // create all elements
  let li = document.createElement("li");
  let img = document.createElement("img");
  let div = document.createElement("div");
  let name = document.createElement("p");
  let minus = document.createElement("i");
  let span = document.createElement("span");
  let plus = document.createElement("i");

  // populate the data for all elements
  img.src = toysData[i].imgSrc;
  name.innerText = toysData[i].name;
  minus.classList = "fa-solid fa-circle-minus";
  minus.addEventListener("click", function () {
    subtract(toysData[i], span);
  });
  span.innerText = "0";
  plus.classList = "fa-solid fa-circle-plus";
  plus.addEventListener("click", function () {
    add(toysData[i], span);
  });

  // append name and button to div
  div.append(name);
  div.append(minus);
  div.append(span);
  div.append(plus);

  // append img and div to li
  li.append(img);
  li.append(div);

  // append li to ul (which is in the DOM)
  document.querySelector("main ul").append(li);
}

let productDescriptions = document.querySelectorAll("li div");

for (let i = 0; i < cart.length; i++) {
  let name = cart[i].toy.name;
  let quantity = cart[i].quantity;

  for (let j = 0; j < productDescriptions.length; j++) {
    console.log(productDescriptions[j].innerHTML);
    if (productDescriptions[j].innerHTML.includes(name)) {
      productDescriptions[j].children[2].innerText = quantity;
      break;
    }
  }
}

let cart = [];

function getClickedToyInCart(toyName) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].toy.name === toyName) {
      return cart[i];
    }
  }
  return null;
}

function totalCartItems() {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].quantity;
  }
  return sum;
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
  console.log(cart);
  // update the cart total
  document.querySelector(".total").innerText = totalCartItems();
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
    document.querySelector(".total").innerText = totalCartItems();
  }
  console.log(cart);
}

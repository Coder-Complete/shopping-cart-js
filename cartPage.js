let cart = JSON.parse(localStorage.getItem("cart"));

function getTotalCartItems() {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].quantity;
  }
  return sum;
}

let totalCartItems = getTotalCartItems();

document.querySelector(".total").innerText = totalCartItems;

let sectionTotal = document.createElement("section");
sectionTotal.innerHTML = `
  <h3>Subtotal (${totalCartItems} items): $1233
  <input type="checkbox" id="contains-gift"/>
  <label for="contains-gift">This order contains a gift</label>
  <button>Proceed to checkout</button>
`;

document.body.append(sectionTotal);

let sectionCart = document.createElement("section");
sectionCart.innerHTML = `
  <h1>Shopping Cart</h1>
  <button>Deselect all items</button>
  <hr>
  <ul class="shopping-list"></ul>
`;

document.body.append(sectionCart);

for (let i = 0; i < cart.length; i++) {
  let li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox"/>
    <img src="${cart[i].toy.imgSrc}"/>
    <div>
      <h3>${cart[i].toy.name}</h3>
      <p class='green'>In Stock</p>
      <p><span class='prime'>prime</span> & <span class='free-returns'>FREE Returns</span></p>
      <input type="checkbox" id='is-a-gift-${i}'/>
      <label for='is-a-gift-${i}'>This is a gift <span class='learn-more'>Learn more</span></label>
      <p><b>Color:</b> Lychee Pattern Black</p>
      <input type="text" value=${cart[i].quantity}>
      <button>Delete</button>
      <button>Save for later</button>
    </div>
    <div>
      <h3><b>$169.99</b></h3>
      <div>
        <p>Save $50.00</p>
        <button>Clip Coupon</button>
      </div>
    </div>
    <hr>
  `;

  document.querySelector(".shopping-list").append(li);
}

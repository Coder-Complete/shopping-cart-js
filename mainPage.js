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

function getDomNodeInnerTextNumber(domNode) {
  return Number(domNode.innerText);
}

let totalDomNode = document.querySelector(".total");

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
    // handleSubtractClick(span);
    subtract(toysData[i], span);
  });
  span.innerText = "0";
  plus.classList = "fa-solid fa-circle-plus";
  plus.addEventListener("click", function () {
    // handleAddClick(span);
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

let searchButton = document.querySelector("header button");
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

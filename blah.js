function display(data) {
  console.log(data);
}
function printHello() {
  console.log("hello");
}
function blockFor300ms() {
  // 300ms of instructions
}

setTimeout(printHello, 0);

const futureData = fetch("https://twitter.com/regis/tweets/1");
futureData.then(display);

blockFor300ms();

console.log("Me first!");

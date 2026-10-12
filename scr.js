function soo() {
  return { sar: 1 };
}
console.log(typeof soo().sar);

function goo(a, b) {
  console.log(a * b);
  return a * b;
}
const bar = goo.bind(null, 2);
bar(2);

const details = {
  message: 'Hello',
};
function getMes() {
  return this.message;
}
console.log(getMes.call(details));

for (var i = 0; i < 10; i++) {}
console.log(i);
/*
  setTimeout(function () {
    console.log(i);
    }, 1000);

let name = 'John';

function printName() {
  console.log(name);
}

setTimeout(() => {
  let name = 'Pet';
  printName();
}, 1000);
//printName();
var user = {
  name: 'Pet',
  printMessage() {
    console.log('Hello ', this.name);
  },
};
var printMessage = user.printMessage;
printMessage();

let f = function g() {
  return 2;
};
console.log(typeof f()); */

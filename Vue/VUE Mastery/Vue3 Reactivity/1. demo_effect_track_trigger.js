let price = 5;
let quantity = 2;
let total = 0;

let effect = () => {
  total = price * quantity;
};

let dep = new Set();

function track() {
  dep.add(effect);
}

function trigger() {
  dep.forEach((effect) => effect());
}

track();
effect();
console.log(`total is: ${total}`);
quantity = 3;
trigger();
console.log(`total is: ${total}`);

// 需要对每一个属性都收集依赖（effect/副作用）
let product = { price: 5, quantity: 2 };
let total = 0;

// 定义一个依赖图
let depsMap = new Map();
/**
 * {
 *    price: Set[effect1, effect2]
 *
 * }
 *
 */

// track 收集依赖
function track(key) {
  // 获取依赖集合
  let dep = depsMap.get(key);
  if (!dep) {
    // 未收集过则初始化
    depsMap.set(key, (dep = new Set()));
  }

  // 在依赖集合里添加 effect
  dep.add(effect);
}

// trigger 触发依赖
function trigger(key) {
  // 获取依赖集合
  let dep = depsMap.get(key);
  if (dep) {
    // 依次触发收集到的 effect
    dep.forEach((effect) => {
      effect();
    });
  }
}

const effect = () => {
  console.log(product);
  total = product.price * product.quantity;
};

track('quantity');
effect();
console.log(`total is: ${total}`);
console.log(`depsMap is:`, depsMap);

product.quantity = 20;
trigger('quantity');
console.log(`total is: ${total}`);

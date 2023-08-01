// 如果有多个（响应式）对象，需要收集每个对象及其各个属性的目标图
// 需要对每一个属性都收集依赖（effect/副作用）
let product = { price: 5, quantity: 2 };
let user = { name: 'kobe', age: 18 };
let total = 0;

// 定义一个目标图
let targetMap = new WeakMap();
/**
 * {
 *    (Object)product: {price: Set[effect1, effect2]}
 *
 * }
 *
 */

// track 收集依赖
function track(target, key) {
  // 获取对象目标图
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // 未收集过则初始化目标图
    targetMap.set(target, (depsMap = new Map()));
  }
  // 获取依赖集合
  let dep = depsMap.get(key);
  if (!dep) {
    // 未收集过则初始化依赖图
    depsMap.set(key, (dep = new Set()));
  }

  // 在依赖集合里添加 effect
  dep.add(effect);
}

// trigger 触发依赖
function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) return;
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
  total = product.price * product.quantity;
};

track(product, 'quantity');
effect();
console.log(`total is: ${total}`);
console.log(`targetMap is:`, targetMap, targetMap.get(product));

product.quantity = 20;
trigger(product, 'quantity');
console.log(`total is: ${total}`);

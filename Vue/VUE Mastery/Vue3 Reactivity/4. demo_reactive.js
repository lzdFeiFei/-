// 定义一个目标图
let targetMap = new WeakMap();

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

// 不需要手动触发依赖的收集和重新调用，通过 proxy 代理 get 和 set 方法来实现

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      if (oldValue !== value) {
        Reflect.set(target, key, value, receiver);
        trigger(target, key);
      }
    }
  };

  return new Proxy(target, handler);
}

let product = reactive({ price: 5, quantity: 2 });
let total = 0;

const effect = () => {
  total = product.price * product.quantity;
};

effect();
console.log(`total is: ${total}`);

product.quantity = 20;
console.log(`total is: ${total}`);

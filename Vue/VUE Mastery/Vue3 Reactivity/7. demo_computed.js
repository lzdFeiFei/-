// 定义一个目标图
let targetMap = new WeakMap();

// 1. 不一定所有的函数都叫 effect
// 2. 如果不处理，那么 effect 一直存在，在其外部获取对象属性也会 执行 track
let activeEffect = null;

function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
}

// track 收集依赖
function track(target, key) {
  if (activeEffect) {
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
    dep.add(activeEffect);
    // console.log(key, dep);
  }
}

let triggerCount = 0;
// trigger 触发依赖
function trigger(target, key) {
  if (key === 'value') {
    triggerCount += 1;
    console.log('triggerCount', triggerCount);
  }
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

function ref(raw) {
  const r = {
    get value() {
      track(r, 'value');
      return raw;
    },
    set value(newVal) {
      if (raw !== newVal) {
        raw = newVal;
        trigger(r, 'value');
      }
    }
  };
  return r;
}

const computed = (getter) => {
  const result = ref();

  effect(() => (result.value = getter()));

  return result;
};

const p = { price: 5, quantity: 2 };
let product = reactive(p);
let salePrice = computed(() => product.price * 0.9);
let total = computed(() => product.price * product.quantity);

console.log(`Before Updated total 10: ${total.value}; SalePrice 4.5: ${salePrice.value}`);

product.quantity = 3;
console.log(`Before Updated total 15: ${total.value}; SalePrice 4.5: ${salePrice.value}`);

product.price = 10;
console.log(`Before Updated total 30: ${total.value}; SalePrice 9: ${salePrice.value}`);

// console.log(targetMap, targetMap.get(p));

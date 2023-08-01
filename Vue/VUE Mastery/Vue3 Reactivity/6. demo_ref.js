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

const p = { price: 5, quantity: 2 };
let product = reactive(p);
let salePrice = ref(0);
let total = 0;

const bb = () => {
  total = salePrice.value * product.quantity;
};
effect(bb);

const aa = () => {
  salePrice.value = product.price * 0.9;
};
effect(aa);

// console.log(`Before Updated total 10: ${total}; SalePrice 4.5: ${salePrice.value}`);

// product.quantity = 3;
// console.log(`Before Updated total 15: ${total}; SalePrice 4.5: ${salePrice.value}`);

// product.price = 10;
// console.log(`Before Updated total 30: ${total}; SalePrice 9: ${salePrice.value}`);

// console.log(targetMap, targetMap.get(p));

/**
 * bug 原因：
 *  1. bb => 获取 salePrice.value ， 执行 track ，因此depsMap 收集了依赖 value Set(2) { [Function: bb] }
 *  2. aa => salePrice.value 触发 trigger，此时 activeEffect 是 aa
 *  3. trigger 触发后 首先执行了 depsMap 里的 bb 函数；
 *  4. 执行 bb 又一次获取了 salePrice.value，这次执行 track 收集到的是 activeEffect 是 aa， 因此有 value Set(2) { [Function: bb], [Function: aa] }；
 *  5. 此时 trigger 尚未执行完毕，bb 执行完毕后 因为新增了 aa 函数，因此又会开始执行 aa 函数
 *  6. 重新执行 aa 又会触发 trigger， 因此在第一次 trigger 尚未执行完毕时，又开始执行了一个新的 trigger
 *  7. 所以导致了无限重复步骤 2-6，因此出现问题
 *
 * 根本原因： salePrice 的 trigger 函数触发问题
 *
 * 解决方法：
 *   ref里 set 方法 判断 raw 和 newVal 是否相等
 */
// 调换两个 effect 函数的先后顺序可以避免这个问题，顺序影响依赖收集的先后顺序

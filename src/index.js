/* eslint-disable no-constant-condition */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

// original
if (true) {
  console.log("####### Original #######");

  let price = 1000;
  const quantity = 2;
  const total = price * quantity;

  console.log(`[Before] 총 가격은 ${total}원`);

  price = 7777;

  console.log(`[After] 총 가격은 ${total}원`);
}

console.log("");

// Example 1
if (true) {
  console.log("####### Example 1 #######");

  let price = 1000;
  const quantity = 2;

  const total = {
    [Symbol.toPrimitive](hint) {
      const _total = price * quantity;

      return hint === "string" ? _total.toString() : _total;
    },
  };

  console.log(`[Before] 총 가격은 ${total}원`);

  price = 7777;

  console.log(`[After] 총 가격은 ${total}원`);
}

console.log("");

// Example 2
if (true) {
  console.log("####### Example 2 #######");

  const obj = {
    price: 1000,
    quantity: 2,
    get total() {
      return this.price * this.quantity;
    },
  };

  console.log(`[Before] 총 가격은 ${obj.total}원`);

  obj.price = 7777;

  console.log(`[After] 총 가격은 ${obj.total}원`);
}

console.log("");

// Example 3
if (true) {
  console.log("####### Example 3 #######");

  let obj = {
    price: 1000,
    quantity: 2,
  };

  let total = null;

  const update = () => {
    total = obj.price * obj.quantity;
  };

  update();

  obj = new Proxy(obj, {
    set(target, key, value, receiver) {
      const ret = Reflect.set(target, key, value, receiver);

      update();

      return ret;
    },
  });

  console.log(`[Before] 총 가격은 ${total}원`);

  obj.price = 7777;

  console.log(`[After] 총 가격은 ${total}원`);
}

console.log("");

// Example
if (true) {
  console.log("####### Example 4 #######");

  const obj = {
    set price(price) {
      this._price = price;
      this.update();
    },

    set quantity(quantity) {
      this._quantity = quantity;
      this.update();
    },

    update() {
      this.total = this._quantity * this._price;
    },
  };

  obj.price = 1000;
  obj.quantity = 2;

  console.log(`[Before] 총 가격은 ${obj.total}원`);

  obj.price = 7777;

  console.log(`[After] 총 가격은 ${obj.total}원`);
}

// Example 5
if (true) {
  console.log("####### Example 5 #######");

  const createStateMachine = () => {
    let state = {};

    const callbacks = [];

    const get = () => ({ ...state });

    const set = (newState) => {
      state = { ...state, ...newState };

      callbacks.forEach((fn) => fn());
    };

    const subscribe = (cb) => {
      callbacks.push(cb);
    };

    return { get, set, subscribe };
  };

  const { get, set, subscribe } = createStateMachine();

  subscribe(() => {
    const { price, quantity } = get();
    const total = price * quantity;

    console.log(` 총 가격은 ${total}원`);
  });

  set({ price: 1000, quantity: 2 });

  set({ price: 7777 });
}

console.log("");

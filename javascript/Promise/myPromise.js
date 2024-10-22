const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(executor) {
  this.status = PENDING;
  this.value = undefined;
  this.reason = undefined;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  function resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;

      this.onFulfilledCallbacks.forEach((callback) => {
        callback(value);
      });
    }
  }

  function reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;

      this.onRejectedCallbacks.forEach((callback) => {
        callback(reason);
      });
    }
  }

  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  if (onFulfilled === undefined) onFulfilled = (val) => val;
  if (onRejected === undefined)
    onRejected = (reason) => {
      throw reason;
    };
  const that = this;
  if (this.status === FULFILLED) {
    const np = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(that.value);
          resolvePromise(np, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });

    return np;
  }

  if (this.status === REJECTED) {
    const np = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onRejected(that.value);
          resolvePromise(np, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });

    return np;
  }

  if (this.status === PENDING) {
    const np = new Promise((resolve, reject) => {
      this.onFulfilledCallbacks.push(function (value) {
        setTimeout(() => {
          try {
            const x = onFulfilled(value);
            resolvePromise(np, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
      this.onRejectedCallbacks.push(function (reason) {
        setTimeout(() => {
          try {
            const x = onRejected(reason);
            resolvePromise(np, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    });
    return np;
  }
};

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    throw new TypeError("same promise");
  }

  if (x instanceof Promise) {
    x.then(resolve, reject);
  } else if (typeof x === "object" || typeof x === "function") {
    if (x === null) resolve(x);

    let then = x.then;

    if (typeof then === "function") {
      // 当resolve一个thenable对象时 存在一个微任务的情况 和遇到Promise的情况一致
      setTimeout(() => {
        then.call(
          x,
          function (value) {
            resolve(value);
          },
          function (reason) {
            reject(reason);
          }
        );
      }, 0);
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

Promise.resolve = function (value) {
  if (value instanceof Promise) {
    return value;
  }
  return new Promise((resolve) => resolve(value));
};

Promise.reject = function (reason) {
  if (reason instanceof Promise) {
    return reason;
  }
  return new Promise((resolve, reject) => reject(reason));
};

Promise.all = function (promises) {
  const result = [];
  let count = 0;
  if (!Array.isArray(promises) || promises.length === 0) {
    return Promise.resolve([]);
  } else {
    const p = new Promise((resolve, reject) => {
      promises.forEach((item, index) => {
        const promise = Promise.resolve(item);
        promise.then(
          (val) => {
            result[index] = val;
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
    return p;
  }
};

Promise.race = function (promises) {
  if (!Array.isArray(promises) || promises.length === 0) {
    return Promise.resolve();
  } else {
    const p = new Promise((resolve, reject) => {
      promises.forEach((item, index) => {
        const promise = Promise.resolve(item);
        promise.then(
          (val) => {
            resolve(val);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
    return p;
  }
};
// 返回了一个数组 包含了所有promise的状态 {status: 'fulfilled' | 'rejected' , value: ''}
Promise.allSettled = function (promises) {
  const result = [];
  let count = 0;
  if (!Array.isArray(promises) || promises.length === 0) {
    return Promise.resolve();
  } else {
    return new Promise((resolve, reject) => {
      promises.forEach((item, index) => {
        const p = Promise.resolve(item);
        p.then(
          (val) => {
            result[index] = {
              status: "fulfilled",
              value: val,
            };
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            result[index] = {
              status: "rejected",
              reason: reason,
            };
            count++;
            if (count === promises.length) resolve(result);
          }
        );
      });
    });
  }
};

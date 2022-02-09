var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const import_meta = {};
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$3(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$3(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$3(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return val == null ? "" : isArray$1(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray$1(val) && !isPlainObject$2(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString$3 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$2 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$3(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
let activeEffectScope;
const effectScopeStack = [];
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      try {
        this.on();
        return fn();
      } finally {
        this.off();
      }
    }
  }
  on() {
    if (this.active) {
      effectScopeStack.push(this);
      activeEffectScope = this;
    }
  }
  off() {
    if (this.active) {
      effectScopeStack.pop();
      activeEffectScope = effectScopeStack[effectScopeStack.length - 1];
    }
  }
  stop(fromParent) {
    if (this.active) {
      this.effects.forEach((e) => e.stop());
      this.cleanups.forEach((cleanup) => cleanup());
      if (this.scopes) {
        this.scopes.forEach((e) => e.stop(true));
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope) {
  scope = scope || activeEffectScope;
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    if (!effectStack.length || !effectStack.includes(this)) {
      try {
        effectStack.push(activeEffect = this);
        enableTracking();
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        resetTracking();
        effectStack.pop();
        const n = effectStack.length;
        activeEffect = n > 0 ? effectStack[n - 1] : void 0;
      }
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (!isTracking()) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = createDep());
  }
  trackEffects(dep);
}
function isTracking() {
  return shouldTrack && activeEffect !== void 0;
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect of isArray$1(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap3 = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap3(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap3(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap3 = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap3(value), wrap3(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap3 = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap3(value[0]), wrap3(value[1])] : wrap3(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (isTracking()) {
    ref2 = toRaw(ref2);
    if (!ref2.dep) {
      ref2.dep = createDep();
    }
    {
      trackEffects(ref2.dep);
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep);
    }
  }
}
function isRef(r2) {
  return Boolean(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  const ret = isArray$1(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
Promise.resolve();
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray$1(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen2, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen2, parentJob);
  }
}
function flushPostFlushCbs(seen2) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen2) {
  isFlushPending = false;
  isFlushing = true;
  flushPreFlushCbs(seen2);
  queue.sort((a, b) => getId(a) - getId(b));
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen2);
    }
  }
}
function emit$1(instance, event, ...rawArgs) {
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => a.trim());
    } else if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(render2.length > 1 ? render2(props, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit
      } : { attrs, slots, emit }) : render2(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$3(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen2) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen2 = seen2 || new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  if (isRef(value)) {
    traverse(value.value, seen2);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen2);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen2);
    });
  } else if (isPlainObject$2(value)) {
    for (const key in value) {
      traverse(value[key], seen2);
    }
  }
  return value;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      const child = children[0];
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        hook(el, done);
        if (hook.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        onLeave(el, done);
        if (onLeave.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment));
    } else if (keepComment || child.type !== Comment) {
      ret.push(child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay: delay2 = 200,
    timeout,
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve2, reject) => {
          const userRetry = () => resolve2(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      const onError = (err) => {
        pendingRequest = null;
        handleError(err, instance, 13, !errorComponent);
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance);
        }).catch((err) => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      const loaded = ref(false);
      const error = ref();
      const delayed = ref(!!delay2);
      if (delay2) {
        setTimeout(() => {
          delayed.value = false;
        }, delay2);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err = new Error(`Async component timed out after ${timeout}ms.`);
            onError(err);
            error.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          queueJob(instance.parent.update);
        }
      }).catch((err) => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, { vnode: { ref: ref2, props, children } }) {
  const vnode = createVNode(comp, props, children);
  vnode.ref = ref2;
  return vnode;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$3(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base2 = instance.type;
  const { mixins, extends: extendsOptions } = base2;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base2);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base2;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions$1(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions$1(resolved, base2, optionMergeStrategies);
  }
  cache.set(base2, resolved);
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions$1(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  const normalized = withCtx((...args) => {
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }
    if (dir.deep) {
      traverse(value);
    }
    bindings.push({
      dir,
      instance,
      value,
      oldValue: void 0,
      arg,
      modifiers
    });
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach((r2, i) => setRef(r2, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$3(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString3 = isString$3(ref2);
    const _isRef = isRef(ref2);
    if (_isString3 || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString3 ? refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString3) {
                refs[ref2] = [refValue];
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString3) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (isRef(ref2)) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
let hasMismatch = false;
const isSVGContainer = (container) => /svg/.test(container.namespaceURI) && container.tagName !== "foreignObject";
const isComment = (node) => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
  const { mt: mountComponent, p: patch, o: { patchProp: patchProp2, nextSibling, parentNode, remove: remove2, insert, createComment } } = rendererInternals;
  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
      patch(null, vnode, container);
      flushPostFlushCbs();
      return;
    }
    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    if (hasMismatch && true) {
      console.error(`Hydration completed but contains mismatches.`);
    }
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    const isFragmentStart = isComment(node) && node.data === "[";
    const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
    const { type, ref: ref2, shapeFlag } = vnode;
    const domType = node.nodeType;
    vnode.el = node;
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3) {
          nextNode = onMismatch();
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (domType !== 1) {
          nextNode = onMismatch();
        } else {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent)
              vnode.children += nextNode.outerHTML;
            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return nextNode;
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
        }
        break;
      default:
        if (shapeFlag & 1) {
          if (domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized);
          nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
          if (isAsyncWrapper(vnode)) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
        } else
          ;
    }
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs } = vnode;
    const forcePatchValue = type === "input" && dirs || type === "option";
    if (forcePatchValue || patchFlag !== -1) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        if (forcePatchValue || !optimized || patchFlag & (16 | 32)) {
          for (const key in props) {
            if (forcePatchValue && key.endsWith("value") || isOn(key) && !isReservedProp(key)) {
              patchProp2(el, key, null, props[key], false, void 0, parentComponent);
            }
          }
        } else if (props.onClick) {
          patchProp2(el, "onClick", null, props.onClick, false, void 0, parentComponent);
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
      if (shapeFlag & 16 && !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
        while (next) {
          hasMismatch = true;
          const cur = next;
          next = next.nextSibling;
          remove2(cur);
        }
      } else if (shapeFlag & 8) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
          el.textContent = vnode.children;
        }
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l = children.length;
    for (let i = 0; i < l; i++) {
      const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
      if (node) {
        node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
      } else if (vnode.type === Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;
        patch(null, vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
    if (next && isComment(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      hasMismatch = true;
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAsyncAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove2(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove2(node);
    patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
    return next;
  };
  const locateClosingAsyncAnchor = (node) => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment(node)) {
        if (node.data === "[")
          match++;
        if (node.data === "]") {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  return [hydrate, hydrateNode];
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
    if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
      el = vnode.el = hostCloneNode(vnode.el);
    } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
    const update = instance.update = effect.run.bind(effect);
    update.id = instance.uid;
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(void 0, instance.update);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      removeFragment(el, anchor);
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveDynamicComponent(component) {
  if (isString$3(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString$3(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$3(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$3(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$3(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(Fragment, null, child.slice());
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
function renderList(source, renderItem, cache, index2) {
  let ret;
  const cached = cache && cache[index2];
  if (isArray$1(source) || isString$3(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index2] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE) {
    return createVNode("slot", name === "default" ? null : { name }, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(Fragment, { key: props.key || `_${name}` }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = extend(Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => () => queueJob(i.update),
  $nextTick: (i) => nextTick.bind(i.proxy),
  $watch: (i) => instanceWatch.bind(i)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  }
};
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
function getComponentName(Component) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const version = "3.2.28";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector3) => doc.querySelector(selector3),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  cloneNode(el) {
    const cloned = el.cloneNode(true);
    if (`_value` in el) {
      cloned._value = el._value;
    }
    return cloned;
  },
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && end) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$3(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString$3(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      el[key] = includeBooleanAttr(value);
      return;
    } else if (value == null && type === "string") {
      el[key] = "";
      el.removeAttribute(key);
      return;
    } else if (type === "number") {
      try {
        el[key] = 0;
      } catch (_a2) {
      }
      el.removeAttribute(key);
      return;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
}
let _getNow = Date.now;
let skipTimestampCheck = false;
if (typeof window !== "undefined") {
  if (_getNow() > document.createEvent("Event").timeStamp) {
    _getNow = () => performance.now();
  }
  const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
  skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
}
let cachedNow = 0;
const p = Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  return [hyphenate(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    const timeStamp = e.timeStamp || _getNow();
    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$3(value)) {
    return false;
  }
  return key in el;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Transition.props = /* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(TRANSITION + "Delay");
  const transitionDurations = getStyleProperties(TRANSITION + "Duration");
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(ANIMATION + "Delay");
  const animationDurations = getStyleProperties(ANIMATION + "Duration");
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  return (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) {
      return fn(event);
    }
  };
};
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = extend({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, container instanceof SVGElement);
    }
  };
  return app;
};
function normalizeContainer(container) {
  if (isString$3(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
/*!
  * vue-router v4.0.12
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const PolySymbol = (name) => hasSymbol ? Symbol(name) : "_vr_" + name;
const matchedRouteKey = /* @__PURE__ */ PolySymbol("rvlm");
const viewDepthKey = /* @__PURE__ */ PolySymbol("rvd");
const routerKey = /* @__PURE__ */ PolySymbol("r");
const routeLocationKey = /* @__PURE__ */ PolySymbol("rl");
const routerViewLocationKey = /* @__PURE__ */ PolySymbol("rvl");
const isBrowser = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === "Module";
}
const assign$1 = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = Array.isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop$2 = () => {
};
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const searchPos = location2.indexOf("?");
  const hashPos = location2.indexOf("#", searchPos > -1 ? searchPos : 0);
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base2) {
  if (!base2 || !pathname.toLowerCase().startsWith(base2.toLowerCase()))
    return pathname;
  return pathname.slice(base2.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : a === b;
}
function isEquivalentArray(a, b) {
  return Array.isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (position === 1 || segment === ".")
      continue;
    if (segment === "..")
      position--;
    else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base2) {
  if (!base2) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base2 = baseEl && baseEl.getAttribute("href") || "/";
      base2 = base2.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base2 = "/";
    }
  }
  if (base2[0] !== "/" && base2[0] !== "#")
    base2 = "/" + base2;
  return removeTrailingSlash(base2);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base2, location2) {
  return base2.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset2) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset2.behavior,
    left: elRect.left - docRect.left - (offset2.left || 0),
    top: elRect.top - docRect.top - (offset2.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base2, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base2.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base2.slice(hashPos)) ? base2.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base2);
  return path + search + hash;
}
function useHistoryListeners(base2, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base2, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index2 = listeners.indexOf(callback);
      if (index2 > -1)
        listeners.splice(index2, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign$1({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base2) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base2, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      position: history2.length - 1,
      replaced: true,
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base2.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base2 : base2.slice(hashIndex)) + to : createBaseLocation() + base2 + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        console.error(err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const state = assign$1({}, history2.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign$1({}, historyState.value, history2.state, {
      forward: to,
      scroll: computeScrollPosition()
    });
    changeLocation(currentState.current, currentState, true);
    const state = assign$1({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base2) {
  base2 = normalizeBase(base2);
  const historyNavigation = useHistoryStateNavigation(base2);
  const historyListeners = useHistoryListeners(base2, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign$1({
    location: "",
    base: base2,
    go,
    createHref: createHref.bind(null, base2)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = /* @__PURE__ */ PolySymbol("nf");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(type, params) {
  {
    return assign$1(new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign$1({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [90];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match)
      return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (Array.isArray(param) && !repeatable)
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          const text = Array.isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path;
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff)
      return diff;
    i++;
  }
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp)
      return comp;
    i++;
  }
  return bScore.length - aScore.length;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Invalid path "${path}"`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign$1(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign$1({}, mainNormalizedRecord, {
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if ("children" in mainNormalizedRecord) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      originalRecord = originalRecord || matcher;
      insertMatcher(matcher);
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop$2;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index2 = matchers.indexOf(matcherRef);
      if (index2 > -1) {
        matchers.splice(index2, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i = 0;
    while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0)
      i++;
    matchers.splice(i, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign$1(paramsFromLocation(currentLocation.params, matcher.keys.filter((k) => !k.optional).map((k) => k.name)), location2.params);
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign$1({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || {} : { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "boolean" ? props : props[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign$1(meta, record.meta), {});
}
function mergeOptions(defaults2, partialOptions) {
  const options = {};
  for (const key in defaults2) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults2[key];
  }
  return options;
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!Array.isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = Array.isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = Array.isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
function useCallbacks() {
  let handlers2 = [];
  function add2(handler) {
    handlers2.push(handler);
    return () => {
      const i = handlers2.indexOf(handler);
      if (i > -1)
        handlers2.splice(i, 1);
    };
  }
  function reset2() {
    handlers2 = [];
  }
  return {
    add: add2,
    list: () => handlers2,
    reset: reset2
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false)
        reject(createRouterError(4, {
          from,
          to
        }));
      else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function")
          enterCallbackArray.push(valid);
        resolve2();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, next);
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => router.resolve(unref(props.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index2 > -1)
      return index2;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      return router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop$2);
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const depth = inject(viewDepthKey, 0);
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth]);
    provide(viewDepthKey, depth + 1);
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[props.name];
      const currentName = props.name;
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[props.name];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(ViewComponent, assign$1({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return normalizeSlot(slots.default, { Component: component, route }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign$1({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign$1(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      matcherLocation = assign$1({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign$1({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign$1({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign$1({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign$1({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign$1({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign$1(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      return assign$1({
        query: to.query,
        hash: to.hash,
        params: to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(assign$1(locationAsObject(shouldRedirect), {
        state: data,
        force,
        replace: replace2
      }), redirectedFrom || targetLocation);
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(from, from, true, false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? error : triggerError(error, toLocation, from)).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(failure2, 2)) {
          return pushWithRedirect(assign$1(locationAsObject(failure2.to), {
            state: data,
            force,
            replace: replace2
          }), redirectedFrom || toLocation);
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (Array.isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list())
      guard(to, from, failure);
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign$1({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign$1(shouldRedirect, { replace: true }), toLocation).catch(noop$2);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, 4 | 8)) {
          return error;
        }
        if (isNavigationFailure(error, 2)) {
          pushWithRedirect(error.to, toLocation).then((failure) => {
            if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop$2);
          return Promise.reject();
        }
        if (info.delta)
          routerHistory.go(-info.delta, false);
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(toLocation, from, false);
        if (failure) {
          if (info.delta) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop$2);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve3, reject) => {
      readyHandlers.add([resolve3, reject]);
    });
  }
  function markAsReady(err) {
    if (ready)
      return;
    ready = true;
    setupListeners();
    readyHandlers.list().forEach(([resolve3, reject]) => err ? reject(err) : resolve3());
    readyHandlers.reset();
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = new Set();
  const router = {
    currentRoute,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app) {
      const router2 = this;
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router2;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      app.provide(routerKey, router2);
      app.provide(routeLocationKey, reactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  return router;
}
function runGuardQueue(guards) {
  return guards.reduce((promise2, guard) => promise2.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter() {
  return inject(routerKey);
}
function useRoute() {
  return inject(routeLocationKey);
}
const ClientOnly$1 = defineComponent({
  setup(_, ctx) {
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a2, _b2;
      return isMounted.value ? (_b2 = (_a2 = ctx.slots).default) === null || _b2 === void 0 ? void 0 : _b2.call(_a2) : null;
    };
  }
});
const scriptRel = "modulepreload";
const seen = {};
const base = "/";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", rej);
      });
    }
  })).then(() => baseModule());
};
const pagesComponents = {
  "v-7446daa2": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-7446daa2" */
    "./index.html.0e46f546.js"
  ), true ? [] : void 0)),
  "v-98df26d6": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-98df26d6" */
    "./2020-3-16-vscode-plugin.html.b31a2ade.js"
  ), true ? [] : void 0)),
  "v-0151cd4a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-0151cd4a" */
    "./2020-3-16-windows-plugin.html.bbc84cf6.js"
  ), true ? [] : void 0)),
  "v-ebe80ef8": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-ebe80ef8" */
    "./2020-3-18-electron-mirror-down.html.94aa5ecf.js"
  ), true ? [] : void 0)),
  "v-a36afcfe": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-a36afcfe" */
    "./2021-2-23-proxy.html.a0350193.js"
  ), true ? [] : void 0)),
  "v-810351b2": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-810351b2" */
    "./2022-1-11md-test.html.1faf3dae.js"
  ), true ? [] : void 0)),
  "v-71182a26": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-71182a26" */
    "./2020-3-16-chrome-plugin.html.43fb1c98.js"
  ), true ? [] : void 0)),
  "v-3706649a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3706649a" */
    "./404.html.40d01cb8.js"
  ), true ? [] : void 0)),
  "v-8daa1a0e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./index.html.70be61c0.js"
  ), true ? [] : void 0)),
  "v-01560935": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-01560935" */
    "./index.html.abd3745a.js"
  ), true ? [] : void 0))
};
const pagesData$2 = {
  "v-7446daa2": () => __vitePreload(() => import(
    /* webpackChunkName: "v-7446daa2" */
    "./index.html.1fd23b06.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-98df26d6": () => __vitePreload(() => import(
    /* webpackChunkName: "v-98df26d6" */
    "./2020-3-16-vscode-plugin.html.c50de34b.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-0151cd4a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-0151cd4a" */
    "./2020-3-16-windows-plugin.html.db0b559a.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-ebe80ef8": () => __vitePreload(() => import(
    /* webpackChunkName: "v-ebe80ef8" */
    "./2020-3-18-electron-mirror-down.html.b42ca17b.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-a36afcfe": () => __vitePreload(() => import(
    /* webpackChunkName: "v-a36afcfe" */
    "./2021-2-23-proxy.html.b75fe8a0.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-810351b2": () => __vitePreload(() => import(
    /* webpackChunkName: "v-810351b2" */
    "./2022-1-11md-test.html.b5b5e167.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-71182a26": () => __vitePreload(() => import(
    /* webpackChunkName: "v-71182a26" */
    "./2020-3-16-chrome-plugin.html.946ae82a.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-3706649a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3706649a" */
    "./404.html.93146c89.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-8daa1a0e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./index.html.97f4289c.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-01560935": () => __vitePreload(() => import(
    /* webpackChunkName: "v-01560935" */
    "./index.html.7c8b0471.js"
  ), true ? [] : void 0).then(({ data }) => data)
};
const pagesData$1 = ref(pagesData$2);
const pageDataEmpty$1 = readonly({
  key: "",
  path: "",
  title: "",
  lang: "",
  frontmatter: {},
  excerpt: "",
  headers: []
});
const pageData$1 = ref(pageDataEmpty$1);
const usePageData$1 = () => pageData$1;
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updatePageData = (data) => {
    pagesData$1.value[data.key] = () => Promise.resolve(data);
    if (data.key === pageData$1.value.key) {
      pageData$1.value = data;
    }
  };
}
const pageFrontmatterSymbol$1 = Symbol("");
const usePageFrontmatter = () => {
  const pageFrontmatter = inject(pageFrontmatterSymbol$1);
  if (!pageFrontmatter) {
    throw new Error("usePageFrontmatter() is called without provider.");
  }
  return pageFrontmatter;
};
const pageHeadSymbol$1 = Symbol("");
const usePageHead$1 = () => {
  const pageHead = inject(pageHeadSymbol$1);
  if (!pageHead) {
    throw new Error("usePageHead() is called without provider.");
  }
  return pageHead;
};
const pageHeadTitleSymbol$1 = Symbol("");
const pageLangSymbol$1 = Symbol("");
const usePageLang$1 = () => {
  const pageLang = inject(pageLangSymbol$1);
  if (!pageLang) {
    throw new Error("usePageLang() is called without provider.");
  }
  return pageLang;
};
const routeLocaleSymbol$1 = Symbol("");
const useRouteLocale = () => {
  const routeLocale = inject(routeLocaleSymbol$1);
  if (!routeLocale) {
    throw new Error("useRouteLocale() is called without provider.");
  }
  return routeLocale;
};
const siteData$2 = {
  "base": "/",
  "lang": "zh-CN",
  "title": "\u4F60\u597D\uFF0C VuePress \uFF01",
  "description": "\u8FD9\u662F\u6211\u7684\u7B2C\u4E00\u4E2A VuePress \u7AD9\u70B9",
  "head": [],
  "locales": {}
};
const siteData$1 = ref(siteData$2);
const useSiteData$1 = () => siteData$1;
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updateSiteData = (data) => {
    siteData$1.value = data;
  };
}
const siteLocaleDataSymbol$1 = Symbol("");
const updateHeadSymbol$1 = Symbol("");
const Content$1 = (props) => {
  let key;
  if (props.pageKey) {
    key = props.pageKey;
  } else {
    const page = usePageData$1();
    key = page.value.key;
  }
  const component = pagesComponents[key];
  if (component) {
    return h(component);
  }
  return h("div", "404 Not Found");
};
Content$1.displayName = "Content";
Content$1.props = {
  pageKey: {
    type: String,
    required: false
  }
};
const layoutComponents = {
  "404": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "layout-404" */
    "./404.8c71580f.js"
  ), true ? [] : void 0)),
  "Layout": defineAsyncComponent(() => __vitePreload(() => Promise.resolve().then(function() {
    return Layout;
  }), true ? void 0 : void 0)),
  "clientAppEnhanceFiles": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "layout-clientAppEnhanceFiles" */
    "./clientAppEnhance.3b7433c7.js"
  ), true ? [] : void 0))
};
const resolveHeadIdentifier$1 = ([tag, attrs, content]) => {
  if (tag === "meta" && attrs.name) {
    return `${tag}.${attrs.name}`;
  }
  if (["title", "base"].includes(tag)) {
    return tag;
  }
  if (tag === "template" && attrs.id) {
    return `${tag}.${attrs.id}`;
  }
  return JSON.stringify([tag, attrs, content]);
};
const dedupeHead$1 = (head) => {
  const identifierSet = new Set();
  const result = [];
  head.forEach((item) => {
    const identifier = resolveHeadIdentifier$1(item);
    if (!identifierSet.has(identifier)) {
      identifierSet.add(identifier);
      result.push(item);
    }
  });
  return result;
};
const isLinkHttp$1 = (link) => /^(https?:)?\/\//.test(link);
const isLinkMailto = (link) => /^mailto:/.test(link);
const isLinkTel = (link) => /^tel:/.test(link);
const isPlainObject$1 = (val) => Object.prototype.toString.call(val) === "[object Object]";
const removeEndingSlash$1 = (str) => str.replace(/\/$/, "");
const removeLeadingSlash$1 = (str) => str.replace(/^\//, "");
const resolveLocalePath$1 = (locales2, routePath) => {
  const localePaths = Object.keys(locales2).sort((a, b) => {
    const levelDelta = b.split("/").length - a.split("/").length;
    if (levelDelta !== 0) {
      return levelDelta;
    }
    return b.length - a.length;
  });
  for (const localePath of localePaths) {
    if (routePath.startsWith(localePath)) {
      return localePath;
    }
  }
  return "/";
};
const Vuepress = defineComponent({
  name: "Vuepress",
  setup() {
    const page = usePageData$1();
    const layoutComponent = computed(() => {
      let layoutName;
      if (page.value.path) {
        const frontmatterLayout = page.value.frontmatter.layout;
        if (isString$3(frontmatterLayout)) {
          layoutName = frontmatterLayout;
        } else {
          layoutName = "Layout";
        }
      } else {
        layoutName = "404";
      }
      return layoutComponents[layoutName] || resolveComponent(layoutName, false);
    });
    return () => h(layoutComponent.value);
  }
});
const defineClientAppEnhance$1 = (clientAppEnhance) => clientAppEnhance;
const defineClientAppSetup = (clientAppSetup) => clientAppSetup;
const withBase$1 = (url) => {
  if (isLinkHttp$1(url))
    return url;
  const base2 = useSiteData$1().value.base;
  return `${base2}${removeLeadingSlash$1(url)}`;
};
const resolvers$1 = reactive({
  resolvePageData: async (pageKey) => {
    const pageDataResolver = pagesData$1.value[pageKey];
    const pageData2 = await (pageDataResolver === null || pageDataResolver === void 0 ? void 0 : pageDataResolver());
    return pageData2 !== null && pageData2 !== void 0 ? pageData2 : pageDataEmpty$1;
  },
  resolvePageFrontmatter: (pageData2) => pageData2.frontmatter,
  resolvePageHead: (headTitle, frontmatter, siteLocale) => {
    const description = isString$3(frontmatter.description) ? frontmatter.description : siteLocale.description;
    const head = [
      ...isArray$1(frontmatter.head) ? frontmatter.head : [],
      ...siteLocale.head,
      ["title", {}, headTitle],
      ["meta", { name: "description", content: description }]
    ];
    return dedupeHead$1(head);
  },
  resolvePageHeadTitle: (page, siteLocale) => `${page.title ? `${page.title} | ` : ``}${siteLocale.title}`,
  resolvePageLang: (pageData2) => pageData2.lang || "en",
  resolveRouteLocale: (locales2, routePath) => resolveLocalePath$1(locales2, routePath),
  resolveSiteLocaleData: (site, routeLocale) => __spreadValues(__spreadValues({}, site), site.locales[routeLocale])
});
var vars$3 = "";
var externalLinkIcon = "";
const svg = h("svg", {
  "class": "external-link-icon",
  "xmlns": "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  "focusable": "false",
  "x": "0px",
  "y": "0px",
  "viewBox": "0 0 100 100",
  "width": "15",
  "height": "15"
}, [
  h("path", {
    fill: "currentColor",
    d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
  }),
  h("polygon", {
    fill: "currentColor",
    points: "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
  })
]);
const ExternalLinkIcon = defineComponent({
  name: "ExternalLinkIcon",
  props: {
    locales: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    const routeLocale = useRouteLocale();
    const locale = computed(() => {
      var _a2;
      return (_a2 = props.locales[routeLocale.value]) !== null && _a2 !== void 0 ? _a2 : {
        openInNewWindow: "open in new window"
      };
    });
    return () => h("span", [
      svg,
      h("span", {
        class: "external-link-icon-sr-only"
      }, locale.value.openInNewWindow)
    ]);
  }
});
const locales = { "/": { "openInNewWindow": "open in new window" } };
var clientAppEnhance0 = defineClientAppEnhance$1(({ app }) => {
  app.component("ExternalLinkIcon", h(ExternalLinkIcon, { locales }));
});
/*! medium-zoom 1.0.6 | MIT License | https://github.com/francoischalifour/medium-zoom */
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var isSupported = function isSupported2(node) {
  return node.tagName === "IMG";
};
var isNodeList = function isNodeList2(selector3) {
  return NodeList.prototype.isPrototypeOf(selector3);
};
var isNode = function isNode2(selector3) {
  return selector3 && selector3.nodeType === 1;
};
var isSvg = function isSvg2(image) {
  var source = image.currentSrc || image.src;
  return source.substr(-4).toLowerCase() === ".svg";
};
var getImagesFromSelector = function getImagesFromSelector2(selector3) {
  try {
    if (Array.isArray(selector3)) {
      return selector3.filter(isSupported);
    }
    if (isNodeList(selector3)) {
      return [].slice.call(selector3).filter(isSupported);
    }
    if (isNode(selector3)) {
      return [selector3].filter(isSupported);
    }
    if (typeof selector3 === "string") {
      return [].slice.call(document.querySelectorAll(selector3)).filter(isSupported);
    }
    return [];
  } catch (err) {
    throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
  }
};
var createOverlay = function createOverlay2(background) {
  var overlay = document.createElement("div");
  overlay.classList.add("medium-zoom-overlay");
  overlay.style.background = background;
  return overlay;
};
var cloneTarget = function cloneTarget2(template) {
  var _template$getBounding = template.getBoundingClientRect(), top = _template$getBounding.top, left = _template$getBounding.left, width = _template$getBounding.width, height = _template$getBounding.height;
  var clone = template.cloneNode();
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
  clone.removeAttribute("id");
  clone.style.position = "absolute";
  clone.style.top = top + scrollTop + "px";
  clone.style.left = left + scrollLeft + "px";
  clone.style.width = width + "px";
  clone.style.height = height + "px";
  clone.style.transform = "";
  return clone;
};
var createCustomEvent = function createCustomEvent2(type, params) {
  var eventParams = _extends({
    bubbles: false,
    cancelable: false,
    detail: void 0
  }, params);
  if (typeof window.CustomEvent === "function") {
    return new CustomEvent(type, eventParams);
  }
  var customEvent = document.createEvent("CustomEvent");
  customEvent.initCustomEvent(type, eventParams.bubbles, eventParams.cancelable, eventParams.detail);
  return customEvent;
};
var mediumZoom$1 = function mediumZoom(selector3) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var Promise2 = window.Promise || function Promise3(fn) {
    function noop2() {
    }
    fn(noop2, noop2);
  };
  var _handleClick = function _handleClick2(event) {
    var target = event.target;
    if (target === overlay) {
      close();
      return;
    }
    if (images.indexOf(target) === -1) {
      return;
    }
    toggle({ target });
  };
  var _handleScroll = function _handleScroll2() {
    if (isAnimating || !active.original) {
      return;
    }
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (Math.abs(scrollTop - currentScroll) > zoomOptions2.scrollOffset) {
      setTimeout(close, 150);
    }
  };
  var _handleKeyUp = function _handleKeyUp2(event) {
    var key = event.key || event.keyCode;
    if (key === "Escape" || key === "Esc" || key === 27) {
      close();
    }
  };
  var update = function update2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var newOptions = options2;
    if (options2.background) {
      overlay.style.background = options2.background;
    }
    if (options2.container && options2.container instanceof Object) {
      newOptions.container = _extends({}, zoomOptions2.container, options2.container);
    }
    if (options2.template) {
      var template = isNode(options2.template) ? options2.template : document.querySelector(options2.template);
      newOptions.template = template;
    }
    zoomOptions2 = _extends({}, zoomOptions2, newOptions);
    images.forEach(function(image) {
      image.dispatchEvent(createCustomEvent("medium-zoom:update", {
        detail: { zoom }
      }));
    });
    return zoom;
  };
  var clone = function clone2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return mediumZoom(_extends({}, zoomOptions2, options2));
  };
  var attach = function attach2() {
    for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) {
      selectors[_key] = arguments[_key];
    }
    var newImages = selectors.reduce(function(imagesAccumulator, currentSelector) {
      return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
    }, []);
    newImages.filter(function(newImage) {
      return images.indexOf(newImage) === -1;
    }).forEach(function(newImage) {
      images.push(newImage);
      newImage.classList.add("medium-zoom-image");
    });
    eventListeners.forEach(function(_ref) {
      var type = _ref.type, listener = _ref.listener, options2 = _ref.options;
      newImages.forEach(function(image) {
        image.addEventListener(type, listener, options2);
      });
    });
    return zoom;
  };
  var detach = function detach2() {
    for (var _len2 = arguments.length, selectors = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      selectors[_key2] = arguments[_key2];
    }
    if (active.zoomed) {
      close();
    }
    var imagesToDetach = selectors.length > 0 ? selectors.reduce(function(imagesAccumulator, currentSelector) {
      return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
    }, []) : images;
    imagesToDetach.forEach(function(image) {
      image.classList.remove("medium-zoom-image");
      image.dispatchEvent(createCustomEvent("medium-zoom:detach", {
        detail: { zoom }
      }));
    });
    images = images.filter(function(image) {
      return imagesToDetach.indexOf(image) === -1;
    });
    return zoom;
  };
  var on = function on2(type, listener) {
    var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    images.forEach(function(image) {
      image.addEventListener("medium-zoom:" + type, listener, options2);
    });
    eventListeners.push({ type: "medium-zoom:" + type, listener, options: options2 });
    return zoom;
  };
  var off = function off2(type, listener) {
    var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    images.forEach(function(image) {
      image.removeEventListener("medium-zoom:" + type, listener, options2);
    });
    eventListeners = eventListeners.filter(function(eventListener) {
      return !(eventListener.type === "medium-zoom:" + type && eventListener.listener.toString() === listener.toString());
    });
    return zoom;
  };
  var open = function open2() {
    var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref2.target;
    var _animate = function _animate2() {
      var container = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      var viewportWidth = void 0;
      var viewportHeight = void 0;
      if (zoomOptions2.container) {
        if (zoomOptions2.container instanceof Object) {
          container = _extends({}, container, zoomOptions2.container);
          viewportWidth = container.width - container.left - container.right - zoomOptions2.margin * 2;
          viewportHeight = container.height - container.top - container.bottom - zoomOptions2.margin * 2;
        } else {
          var zoomContainer = isNode(zoomOptions2.container) ? zoomOptions2.container : document.querySelector(zoomOptions2.container);
          var _zoomContainer$getBou = zoomContainer.getBoundingClientRect(), _width = _zoomContainer$getBou.width, _height = _zoomContainer$getBou.height, _left = _zoomContainer$getBou.left, _top = _zoomContainer$getBou.top;
          container = _extends({}, container, {
            width: _width,
            height: _height,
            left: _left,
            top: _top
          });
        }
      }
      viewportWidth = viewportWidth || container.width - zoomOptions2.margin * 2;
      viewportHeight = viewportHeight || container.height - zoomOptions2.margin * 2;
      var zoomTarget = active.zoomedHd || active.original;
      var naturalWidth = isSvg(zoomTarget) ? viewportWidth : zoomTarget.naturalWidth || viewportWidth;
      var naturalHeight = isSvg(zoomTarget) ? viewportHeight : zoomTarget.naturalHeight || viewportHeight;
      var _zoomTarget$getBoundi = zoomTarget.getBoundingClientRect(), top = _zoomTarget$getBoundi.top, left = _zoomTarget$getBoundi.left, width = _zoomTarget$getBoundi.width, height = _zoomTarget$getBoundi.height;
      var scaleX = Math.min(naturalWidth, viewportWidth) / width;
      var scaleY = Math.min(naturalHeight, viewportHeight) / height;
      var scale = Math.min(scaleX, scaleY);
      var translateX = (-left + (viewportWidth - width) / 2 + zoomOptions2.margin + container.left) / scale;
      var translateY = (-top + (viewportHeight - height) / 2 + zoomOptions2.margin + container.top) / scale;
      var transform = "scale(" + scale + ") translate3d(" + translateX + "px, " + translateY + "px, 0)";
      active.zoomed.style.transform = transform;
      if (active.zoomedHd) {
        active.zoomedHd.style.transform = transform;
      }
    };
    return new Promise2(function(resolve2) {
      if (target && images.indexOf(target) === -1) {
        resolve2(zoom);
        return;
      }
      var _handleOpenEnd = function _handleOpenEnd2() {
        isAnimating = false;
        active.zoomed.removeEventListener("transitionend", _handleOpenEnd2);
        active.original.dispatchEvent(createCustomEvent("medium-zoom:opened", {
          detail: { zoom }
        }));
        resolve2(zoom);
      };
      if (active.zoomed) {
        resolve2(zoom);
        return;
      }
      if (target) {
        active.original = target;
      } else if (images.length > 0) {
        var _images = images;
        active.original = _images[0];
      } else {
        resolve2(zoom);
        return;
      }
      active.original.dispatchEvent(createCustomEvent("medium-zoom:open", {
        detail: { zoom }
      }));
      scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      isAnimating = true;
      active.zoomed = cloneTarget(active.original);
      document.body.appendChild(overlay);
      if (zoomOptions2.template) {
        var template = isNode(zoomOptions2.template) ? zoomOptions2.template : document.querySelector(zoomOptions2.template);
        active.template = document.createElement("div");
        active.template.appendChild(template.content.cloneNode(true));
        document.body.appendChild(active.template);
      }
      document.body.appendChild(active.zoomed);
      window.requestAnimationFrame(function() {
        document.body.classList.add("medium-zoom--opened");
      });
      active.original.classList.add("medium-zoom-image--hidden");
      active.zoomed.classList.add("medium-zoom-image--opened");
      active.zoomed.addEventListener("click", close);
      active.zoomed.addEventListener("transitionend", _handleOpenEnd);
      if (active.original.getAttribute("data-zoom-src")) {
        active.zoomedHd = active.zoomed.cloneNode();
        active.zoomedHd.removeAttribute("srcset");
        active.zoomedHd.removeAttribute("sizes");
        active.zoomedHd.src = active.zoomed.getAttribute("data-zoom-src");
        active.zoomedHd.onerror = function() {
          clearInterval(getZoomTargetSize);
          console.warn("Unable to reach the zoom image target " + active.zoomedHd.src);
          active.zoomedHd = null;
          _animate();
        };
        var getZoomTargetSize = setInterval(function() {
          if (active.zoomedHd.complete) {
            clearInterval(getZoomTargetSize);
            active.zoomedHd.classList.add("medium-zoom-image--opened");
            active.zoomedHd.addEventListener("click", close);
            document.body.appendChild(active.zoomedHd);
            _animate();
          }
        }, 10);
      } else if (active.original.hasAttribute("srcset")) {
        active.zoomedHd = active.zoomed.cloneNode();
        active.zoomedHd.removeAttribute("sizes");
        active.zoomedHd.removeAttribute("loading");
        var loadEventListener = active.zoomedHd.addEventListener("load", function() {
          active.zoomedHd.removeEventListener("load", loadEventListener);
          active.zoomedHd.classList.add("medium-zoom-image--opened");
          active.zoomedHd.addEventListener("click", close);
          document.body.appendChild(active.zoomedHd);
          _animate();
        });
      } else {
        _animate();
      }
    });
  };
  var close = function close2() {
    return new Promise2(function(resolve2) {
      if (isAnimating || !active.original) {
        resolve2(zoom);
        return;
      }
      var _handleCloseEnd = function _handleCloseEnd2() {
        active.original.classList.remove("medium-zoom-image--hidden");
        document.body.removeChild(active.zoomed);
        if (active.zoomedHd) {
          document.body.removeChild(active.zoomedHd);
        }
        document.body.removeChild(overlay);
        active.zoomed.classList.remove("medium-zoom-image--opened");
        if (active.template) {
          document.body.removeChild(active.template);
        }
        isAnimating = false;
        active.zoomed.removeEventListener("transitionend", _handleCloseEnd2);
        active.original.dispatchEvent(createCustomEvent("medium-zoom:closed", {
          detail: { zoom }
        }));
        active.original = null;
        active.zoomed = null;
        active.zoomedHd = null;
        active.template = null;
        resolve2(zoom);
      };
      isAnimating = true;
      document.body.classList.remove("medium-zoom--opened");
      active.zoomed.style.transform = "";
      if (active.zoomedHd) {
        active.zoomedHd.style.transform = "";
      }
      if (active.template) {
        active.template.style.transition = "opacity 150ms";
        active.template.style.opacity = 0;
      }
      active.original.dispatchEvent(createCustomEvent("medium-zoom:close", {
        detail: { zoom }
      }));
      active.zoomed.addEventListener("transitionend", _handleCloseEnd);
    });
  };
  var toggle = function toggle2() {
    var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref3.target;
    if (active.original) {
      return close();
    }
    return open({ target });
  };
  var getOptions = function getOptions2() {
    return zoomOptions2;
  };
  var getImages = function getImages2() {
    return images;
  };
  var getZoomedImage = function getZoomedImage2() {
    return active.original;
  };
  var images = [];
  var eventListeners = [];
  var isAnimating = false;
  var scrollTop = 0;
  var zoomOptions2 = options;
  var active = {
    original: null,
    zoomed: null,
    zoomedHd: null,
    template: null
  };
  if (Object.prototype.toString.call(selector3) === "[object Object]") {
    zoomOptions2 = selector3;
  } else if (selector3 || typeof selector3 === "string") {
    attach(selector3);
  }
  zoomOptions2 = _extends({
    margin: 0,
    background: "#fff",
    scrollOffset: 40,
    container: null,
    template: null
  }, zoomOptions2);
  var overlay = createOverlay(zoomOptions2.background);
  document.addEventListener("click", _handleClick);
  document.addEventListener("keyup", _handleKeyUp);
  document.addEventListener("scroll", _handleScroll);
  window.addEventListener("resize", close);
  var zoom = {
    open,
    close,
    toggle,
    update,
    clone,
    attach,
    detach,
    on,
    off,
    getOptions,
    getImages,
    getZoomedImage
  };
  return zoom;
};
function styleInject(css2, ref2) {
  if (ref2 === void 0)
    ref2 = {};
  var insertAt = ref2.insertAt;
  if (!css2 || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css2;
  } else {
    style.appendChild(document.createTextNode(css2));
  }
}
var css = ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";
styleInject(css);
var mediumZoom$2 = mediumZoom$1;
const mediumZoomSymbol = Symbol("mediumZoom");
var vars$2 = "";
var mediumZoom2 = "";
const selector$1 = ".theme-default-content > img, .theme-default-content :not(a) > img";
const zoomOptions = {};
const delay$1 = 300;
var clientAppEnhance1 = defineClientAppEnhance$1(({ app, router }) => {
  const zoom = mediumZoom$2(zoomOptions);
  zoom.refresh = (sel = selector$1) => {
    zoom.detach();
    zoom.attach(sel);
  };
  app.provide(mediumZoomSymbol, zoom);
  router.afterEach(() => {
    setTimeout(() => zoom.refresh(), delay$1);
  });
});
const themeData$2 = {
  "postsDir": "/Users/tanjie/Desktop/mo/vuepress-starter/docs/posts",
  "logo": "https://vuejs.org/images/logo.png",
  "navbar": [
    {
      "text": "Home",
      "link": "/"
    },
    {
      "text": "Foo",
      "link": "/foo"
    },
    {
      "text": "Timeline",
      "link": "/timeline"
    }
  ],
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "repo": null,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebar": "auto",
  "sidebarDepth": 2,
  "editLink": true,
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
};
const themeData$1 = ref(themeData$2);
const useThemeData = () => themeData$1;
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updateThemeData = (data) => {
    themeData$1.value = data;
  };
}
const themeLocaleDataSymbol = Symbol("");
const useThemeLocaleData$1 = () => {
  const themeLocaleData = inject(themeLocaleDataSymbol);
  if (!themeLocaleData) {
    throw new Error("useThemeLocaleData() is called without provider.");
  }
  return themeLocaleData;
};
const resolveThemeLocaleData = (theme, routeLocale) => {
  var _a2;
  return __spreadValues(__spreadValues({}, theme), (_a2 = theme.locales) === null || _a2 === void 0 ? void 0 : _a2[routeLocale]);
};
var clientAppEnhance2 = defineClientAppEnhance$1(({ app }) => {
  const themeData2 = useThemeData();
  const routeLocale = app._context.provides[routeLocaleSymbol$1];
  const themeLocaleData = computed(() => resolveThemeLocaleData(themeData2.value, routeLocale.value));
  app.provide(themeLocaleDataSymbol, themeLocaleData);
  Object.defineProperties(app.config.globalProperties, {
    $theme: {
      get() {
        return themeData2.value;
      }
    },
    $themeLocale: {
      get() {
        return themeLocaleData.value;
      }
    }
  });
});
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  props: {
    type: {
      type: String,
      required: false,
      default: "tip"
    },
    text: {
      type: String,
      required: false,
      default: ""
    },
    vertical: {
      type: String,
      required: false,
      default: void 0
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(["badge", __props.type]),
        style: normalizeStyle({
          verticalAlign: __props.vertical
        })
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(__props.text), 1)
        ])
      ], 6);
    };
  }
});
var CodeGroup = defineComponent({
  name: "CodeGroup",
  setup(_, { slots }) {
    const activeIndex = ref(-1);
    const tabRefs = ref([]);
    const activateNext = (i = activeIndex.value) => {
      if (i < tabRefs.value.length - 1) {
        activeIndex.value = i + 1;
      } else {
        activeIndex.value = 0;
      }
      tabRefs.value[activeIndex.value].focus();
    };
    const activatePrev = (i = activeIndex.value) => {
      if (i > 0) {
        activeIndex.value = i - 1;
      } else {
        activeIndex.value = tabRefs.value.length - 1;
      }
      tabRefs.value[activeIndex.value].focus();
    };
    const keyboardHandler = (event, i) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        activeIndex.value = i;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        activateNext(i);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        activatePrev(i);
      }
    };
    return () => {
      var _a2;
      const items = (((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)) || []).filter((vnode) => vnode.type.name === "CodeGroupItem").map((vnode) => {
        if (vnode.props === null) {
          vnode.props = {};
        }
        return vnode;
      });
      if (items.length === 0) {
        return null;
      }
      if (activeIndex.value < 0 || activeIndex.value > items.length - 1) {
        activeIndex.value = items.findIndex((vnode) => vnode.props.active === "" || vnode.props.active === true);
        if (activeIndex.value === -1) {
          activeIndex.value = 0;
        }
      } else {
        items.forEach((vnode, i) => {
          vnode.props.active = i === activeIndex.value;
        });
      }
      return h("div", { class: "code-group" }, [
        h("div", { class: "code-group__nav" }, h("ul", { class: "code-group__ul" }, items.map((vnode, i) => {
          const isActive = i === activeIndex.value;
          return h("li", { class: "code-group__li" }, h("button", {
            ref: (element) => {
              if (element) {
                tabRefs.value[i] = element;
              }
            },
            class: {
              "code-group__nav-tab": true,
              "code-group__nav-tab-active": isActive
            },
            ariaPressed: isActive,
            ariaExpanded: isActive,
            onClick: () => activeIndex.value = i,
            onKeydown: (e) => keyboardHandler(e, i)
          }, vnode.props.title));
        }))),
        items
      ]);
    };
  }
});
const _hoisted_1$d = ["aria-selected"];
const __default__$1 = defineComponent({
  name: "CodeGroupItem"
});
const _sfc_main$f = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$1), {
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["code-group-item", { "code-group-item__active": __props.active }]),
        "aria-selected": __props.active
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_1$d);
    };
  }
}));
function tryOnScopeDispose$1(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
const isClient$1 = typeof window !== "undefined";
const isString$2 = (val) => typeof val === "string";
const noop$1 = () => {
};
function createFilterWrapper$1(filter, fn) {
  function wrapper(...args) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
const bypassFilter$1 = (invoke) => {
  return invoke();
};
var __getOwnPropSymbols$9$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$9$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$9$1 = Object.prototype.propertyIsEnumerable;
var __objRest$5$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$9$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$9$1)
    for (var prop of __getOwnPropSymbols$9$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$9$1.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchWithFilter$1(source, cb, options = {}) {
  const _a2 = options, {
    eventFilter = bypassFilter$1
  } = _a2, watchOptions = __objRest$5$1(_a2, [
    "eventFilter"
  ]);
  return watch(source, createFilterWrapper$1(eventFilter, cb), watchOptions);
}
function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
const defaultWindow$1 = isClient$1 ? window : void 0;
isClient$1 ? window.document : void 0;
isClient$1 ? window.navigator : void 0;
isClient$1 ? window.location : void 0;
function useEventListener$1(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString$2(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow$1;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop$1;
  let cleanup = noop$1;
  const stopWatch = watch(() => unref(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop$1;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose$1(stop);
  return stop;
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow$1 } = options;
  let mediaQuery;
  const matches = ref(false);
  const update = () => {
    if (!window2)
      return;
    if (!mediaQuery)
      mediaQuery = window2.matchMedia(query);
    matches.value = mediaQuery.matches;
  };
  tryOnMounted(() => {
    update();
    if (!mediaQuery)
      return;
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", update);
    else
      mediaQuery.addListener(update);
    tryOnScopeDispose$1(() => {
      if ("removeEventListener" in update)
        mediaQuery.removeEventListener("change", update);
      else
        mediaQuery.removeListener(update);
    });
  });
  return matches;
}
const _global$1 = globalThis || void 0;
const globalKey$1 = "__vueuse_ssr_handlers__";
_global$1[globalKey$1] = _global$1[globalKey$1] || {};
const handlers$1 = _global$1[globalKey$1];
function getSSRHandler$1(key, fallback) {
  return handlers$1[key] || fallback;
}
function guessSerializerType$1(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : Array.isArray(rawInit) ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
const StorageSerializers$1 = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  }
};
function useStorage$1(key, initialValue, storage, options = {}) {
  var _a2;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    shallow,
    window: window2 = defaultWindow$1,
    eventFilter,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const rawInit = unref(initialValue);
  const type = guessSerializerType$1(rawInit);
  const data = (shallow ? shallowRef : ref)(initialValue);
  const serializer = (_a2 = options.serializer) != null ? _a2 : StorageSerializers$1[type];
  if (!storage) {
    try {
      storage = getSSRHandler$1("getDefaultStorage", () => {
        var _a22;
        return (_a22 = defaultWindow$1) == null ? void 0 : _a22.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    if (!storage || event && event.key !== key)
      return;
    try {
      const rawValue = event ? event.newValue : storage.getItem(key);
      if (rawValue == null) {
        data.value = rawInit;
        if (writeDefaults && rawInit !== null)
          storage.setItem(key, serializer.write(rawInit));
      } else if (typeof rawValue !== "string") {
        data.value = rawValue;
      } else {
        data.value = serializer.read(rawValue);
      }
    } catch (e) {
      onError(e);
    }
  }
  read();
  if (window2 && listenToStorageChanges)
    useEventListener$1(window2, "storage", (e) => setTimeout(() => read(e), 0));
  if (storage) {
    watchWithFilter$1(data, () => {
      try {
        if (data.value == null)
          storage.removeItem(key);
        else
          storage.setItem(key, serializer.write(data.value));
      } catch (e) {
        onError(e);
      }
    }, {
      flush,
      deep,
      eventFilter
    });
  }
  return data;
}
function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
}
var _a$1, _b$1;
isClient$1 && (window == null ? void 0 : window.navigator) && ((_a$1 = window == null ? void 0 : window.navigator) == null ? void 0 : _a$1.platform) && /iP(ad|hone|od)/.test((_b$1 = window == null ? void 0 : window.navigator) == null ? void 0 : _b$1.platform);
var __defProp$3$1 = Object.defineProperty;
var __getOwnPropSymbols$3$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$3$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$3$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3$1 = (obj, key, value) => key in obj ? __defProp$3$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3$1.call(b, prop))
      __defNormalProp$3$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$3$1)
    for (var prop of __getOwnPropSymbols$3$1(b)) {
      if (__propIsEnum$3$1.call(b, prop))
        __defNormalProp$3$1(a, prop, b[prop]);
    }
  return a;
};
const initialRect$1 = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 0,
  width: 0
};
__spreadValues$3$1({
  text: ""
}, initialRect$1);
const darkModeSymbol = Symbol("");
const setupDarkMode = () => {
  const themeLocale = useThemeLocaleData();
  const isDarkPreferred = usePreferredDark();
  const darkStorage = useStorage$1("vuepress-color-scheme", "auto");
  const isDarkMode = computed({
    get() {
      if (!themeLocale.value.darkMode) {
        return false;
      }
      if (darkStorage.value === "auto") {
        return isDarkPreferred.value;
      }
      return darkStorage.value === "dark";
    },
    set(val) {
      if (val === isDarkPreferred.value) {
        darkStorage.value = "auto";
      } else {
        darkStorage.value = val ? "dark" : "light";
      }
    }
  });
  provide(darkModeSymbol, isDarkMode);
  updateHtmlDarkClass(isDarkMode);
};
const updateHtmlDarkClass = (isDarkMode) => {
  const update = (value = isDarkMode.value) => {
    const htmlEl = window === null || window === void 0 ? void 0 : window.document.querySelector("html");
    htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.toggle("dark", value);
  };
  onMounted(() => {
    watch(isDarkMode, update, { immediate: true });
  });
  onUnmounted(() => update());
};
const useResolveRouteWithRedirect = (...args) => {
  const router = useRouter();
  const route = router.resolve(...args);
  const lastMatched = route.matched[route.matched.length - 1];
  if (!(lastMatched === null || lastMatched === void 0 ? void 0 : lastMatched.redirect)) {
    return route;
  }
  const { redirect } = lastMatched;
  const resolvedRedirect = isFunction(redirect) ? redirect(route) : redirect;
  const resolvedRedirectObj = isString$3(resolvedRedirect) ? { path: resolvedRedirect } : resolvedRedirect;
  return useResolveRouteWithRedirect(__spreadValues({
    hash: route.hash,
    query: route.query,
    params: route.params
  }, resolvedRedirectObj));
};
const useNavLink = (item) => {
  const resolved = useResolveRouteWithRedirect(item);
  return {
    text: resolved.meta.title || item,
    link: resolved.name === "404" ? item : resolved.fullPath
  };
};
let promise = null;
let promiseResolve = null;
const scrollPromise = {
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve2) => promiseResolve = resolve2);
  },
  resolve: () => {
    promiseResolve === null || promiseResolve === void 0 ? void 0 : promiseResolve();
    promise = null;
    promiseResolve = null;
  }
};
const useScrollPromise = () => scrollPromise;
const sidebarItemsSymbol = Symbol("sidebarItems");
const useSidebarItems = () => {
  const sidebarItems = inject(sidebarItemsSymbol);
  if (!sidebarItems) {
    throw new Error("useSidebarItems() is called without provider.");
  }
  return sidebarItems;
};
const setupSidebarItems = () => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter();
  const sidebarItems = computed(() => resolveSidebarItems(frontmatter.value, themeLocale.value));
  provide(sidebarItemsSymbol, sidebarItems);
};
const resolveSidebarItems = (frontmatter, themeLocale) => {
  var _a2, _b2, _c, _d;
  const sidebarConfig = (_b2 = (_a2 = frontmatter.sidebar) !== null && _a2 !== void 0 ? _a2 : themeLocale.sidebar) !== null && _b2 !== void 0 ? _b2 : "auto";
  const sidebarDepth = (_d = (_c = frontmatter.sidebarDepth) !== null && _c !== void 0 ? _c : themeLocale.sidebarDepth) !== null && _d !== void 0 ? _d : 2;
  if (frontmatter.home || sidebarConfig === false) {
    return [];
  }
  if (sidebarConfig === "auto") {
    return resolveAutoSidebarItems(sidebarDepth);
  }
  if (isArray$1(sidebarConfig)) {
    return resolveArraySidebarItems(sidebarConfig, sidebarDepth);
  }
  if (isPlainObject$1(sidebarConfig)) {
    return resolveMultiSidebarItems(sidebarConfig, sidebarDepth);
  }
  return [];
};
const headerToSidebarItem = (header, sidebarDepth) => ({
  text: header.title,
  link: `#${header.slug}`,
  children: headersToSidebarItemChildren(header.children, sidebarDepth)
});
const headersToSidebarItemChildren = (headers, sidebarDepth) => sidebarDepth > 0 ? headers.map((header) => headerToSidebarItem(header, sidebarDepth - 1)) : [];
const resolveAutoSidebarItems = (sidebarDepth) => {
  const page = usePageData$1();
  return [
    {
      text: page.value.title,
      children: headersToSidebarItemChildren(page.value.headers, sidebarDepth)
    }
  ];
};
const resolveArraySidebarItems = (sidebarConfig, sidebarDepth) => {
  const route = useRoute();
  const page = usePageData$1();
  const handleChildItem = (item) => {
    var _a2;
    let childItem;
    if (isString$3(item)) {
      childItem = useNavLink(item);
    } else {
      childItem = item;
    }
    if (childItem.children) {
      return __spreadProps(__spreadValues({}, childItem), {
        children: childItem.children.map((item2) => handleChildItem(item2))
      });
    }
    if (childItem.link === route.path) {
      const headers = ((_a2 = page.value.headers[0]) === null || _a2 === void 0 ? void 0 : _a2.level) === 1 ? page.value.headers[0].children : page.value.headers;
      return __spreadProps(__spreadValues({}, childItem), {
        children: headersToSidebarItemChildren(headers, sidebarDepth)
      });
    }
    return childItem;
  };
  return sidebarConfig.map((item) => handleChildItem(item));
};
const resolveMultiSidebarItems = (sidebarConfig, sidebarDepth) => {
  var _a2;
  const route = useRoute();
  const sidebarPath = resolveLocalePath$1(sidebarConfig, route.path);
  const matchedSidebarConfig = (_a2 = sidebarConfig[sidebarPath]) !== null && _a2 !== void 0 ? _a2 : [];
  return resolveArraySidebarItems(matchedSidebarConfig, sidebarDepth);
};
const useThemeLocaleData = () => useThemeLocaleData$1();
var index = "";
var clientAppEnhance3 = defineClientAppEnhance$1(({ app, router }) => {
  app.component("Badge", _sfc_main$g);
  app.component("CodeGroup", CodeGroup);
  app.component("CodeGroupItem", _sfc_main$f);
  app.component("NavbarSearch", () => {
    const SearchComponent = app.component("Docsearch") || app.component("SearchBox");
    if (SearchComponent) {
      return h(SearchComponent);
    }
    return null;
  });
  const scrollBehavior = router.options.scrollBehavior;
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait();
    return scrollBehavior(...args);
  };
});
var clientAppEnhance4 = ({ app }) => {
  app.component("Test", defineAsyncComponent(() => __vitePreload(() => import("./Test.2e83cdb1.js"), true ? [] : void 0)));
};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$e = {};
const _hoisted_1$c = /* @__PURE__ */ createTextVNode("\u8FD9\u662F\u81EA\u5B9A\u4E49\u5E03\u5C40 ");
function _sfc_render$1(_ctx, _cache) {
  const _component_Content = resolveComponent("Content");
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$c,
    createVNode(_component_Content)
  ], 64);
}
var CustomLayout = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$1]]);
const ClientOnly = defineComponent({
  setup(_, ctx) {
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a2, _b2;
      return isMounted.value ? (_b2 = (_a2 = ctx.slots).default) === null || _b2 === void 0 ? void 0 : _b2.call(_a2) : null;
    };
  }
});
const pagesData = ref(pagesData$2);
const pageDataEmpty = readonly({
  key: "",
  path: "",
  title: "",
  lang: "",
  frontmatter: {},
  excerpt: "",
  headers: []
});
const pageData = ref(pageDataEmpty);
const usePageData = () => pageData;
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updatePageData = (data) => {
    pagesData.value[data.key] = () => Promise.resolve(data);
    if (data.key === pageData.value.key) {
      pageData.value = data;
    }
  };
}
const pageFrontmatterSymbol = Symbol("");
const pageHeadSymbol = Symbol("");
const usePageHead = () => {
  const pageHead = inject(pageHeadSymbol);
  if (!pageHead) {
    throw new Error("usePageHead() is called without provider.");
  }
  return pageHead;
};
const pageHeadTitleSymbol = Symbol("");
const pageLangSymbol = Symbol("");
const usePageLang = () => {
  const pageLang = inject(pageLangSymbol);
  if (!pageLang) {
    throw new Error("usePageLang() is called without provider.");
  }
  return pageLang;
};
const routeLocaleSymbol = Symbol("");
const siteData = ref(siteData$2);
const useSiteData = () => siteData;
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updateSiteData = (data) => {
    siteData.value = data;
  };
}
const siteLocaleDataSymbol = Symbol("");
const updateHeadSymbol = Symbol("");
const Content = (props) => {
  let key;
  if (props.pageKey) {
    key = props.pageKey;
  } else {
    const page = usePageData();
    key = page.value.key;
  }
  const component = pagesComponents[key];
  if (component) {
    return h(component);
  }
  return h("div", "404 Not Found");
};
Content.displayName = "Content";
Content.props = {
  pageKey: {
    type: String,
    required: false
  }
};
const isArray = Array.isArray;
const isString$1 = (val) => typeof val === "string";
const resolveHeadIdentifier = ([tag, attrs, content]) => {
  if (tag === "meta" && attrs.name) {
    return `${tag}.${attrs.name}`;
  }
  if (["title", "base"].includes(tag)) {
    return tag;
  }
  if (tag === "template" && attrs.id) {
    return `${tag}.${attrs.id}`;
  }
  return JSON.stringify([tag, attrs, content]);
};
const dedupeHead = (head) => {
  const identifierSet = new Set();
  const result = [];
  head.forEach((item) => {
    const identifier = resolveHeadIdentifier(item);
    if (!identifierSet.has(identifier)) {
      identifierSet.add(identifier);
      result.push(item);
    }
  });
  return result;
};
const isLinkHttp = (link) => /^(https?:)?\/\//.test(link);
const isPlainObject = (val) => Object.prototype.toString.call(val) === "[object Object]";
const removeEndingSlash = (str) => str.replace(/\/$/, "");
const removeLeadingSlash = (str) => str.replace(/^\//, "");
const resolveLocalePath = (locales2, routePath) => {
  const localePaths = Object.keys(locales2).sort((a, b) => {
    const levelDelta = b.split("/").length - a.split("/").length;
    if (levelDelta !== 0) {
      return levelDelta;
    }
    return b.length - a.length;
  });
  for (const localePath of localePaths) {
    if (routePath.startsWith(localePath)) {
      return localePath;
    }
  }
  return "/";
};
defineComponent({
  name: "Vuepress",
  setup() {
    const page = usePageData();
    const layoutComponent = computed(() => {
      let layoutName;
      if (page.value.path) {
        const frontmatterLayout = page.value.frontmatter.layout;
        if (isString$1(frontmatterLayout)) {
          layoutName = frontmatterLayout;
        } else {
          layoutName = "Layout";
        }
      } else {
        layoutName = "404";
      }
      return layoutComponents[layoutName] || resolveComponent(layoutName, false);
    });
    return () => h(layoutComponent.value);
  }
});
const defineClientAppEnhance = (clientAppEnhance) => clientAppEnhance;
const withBase = (url) => {
  if (isLinkHttp(url))
    return url;
  const base2 = useSiteData().value.base;
  return `${base2}${removeLeadingSlash(url)}`;
};
function r(r2, e, n) {
  var i, t, o;
  e === void 0 && (e = 50), n === void 0 && (n = {});
  var a = (i = n.isImmediate) != null && i, u = (t = n.callback) != null && t, c = n.maxWait, v = Date.now(), l = [];
  function f() {
    if (c !== void 0) {
      var r3 = Date.now() - v;
      if (r3 + e >= c)
        return c - r3;
    }
    return e;
  }
  var d = function() {
    var e2 = [].slice.call(arguments), n2 = this;
    return new Promise(function(i2, t2) {
      var c2 = a && o === void 0;
      if (o !== void 0 && clearTimeout(o), o = setTimeout(function() {
        if (o = void 0, v = Date.now(), !a) {
          var i3 = r2.apply(n2, e2);
          u && u(i3), l.forEach(function(r3) {
            return (0, r3.resolve)(i3);
          }), l = [];
        }
      }, f()), c2) {
        var d2 = r2.apply(n2, e2);
        return u && u(d2), i2(d2);
      }
      l.push({ resolve: i2, reject: t2 });
    });
  };
  return d.cancel = function(r3) {
    o !== void 0 && clearTimeout(o), l.forEach(function(e2) {
      return (0, e2.reject)(r3);
    }), l = [];
  }, d;
}
const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
var vars$1 = "";
var backToTop = "";
const BackToTop = defineComponent({
  name: "BackToTop",
  setup() {
    const scrollTop = ref(0);
    const show = computed(() => scrollTop.value > 300);
    const onScroll = r(() => {
      scrollTop.value = getScrollTop();
    }, 100);
    onMounted(() => {
      scrollTop.value = getScrollTop();
      window.addEventListener("scroll", () => onScroll());
    });
    const backToTopEl = h("div", { class: "back-to-top", onClick: scrollToTop });
    return () => h(Transition, {
      name: "back-to-top"
    }, {
      default: () => show.value ? backToTopEl : null
    });
  }
});
const clientAppRootComponents = [
  BackToTop
];
const useActiveHeaderLinks = ({ headerLinkSelector: headerLinkSelector2, headerAnchorSelector: headerAnchorSelector2, delay: delay2, offset: offset2 = 5 }) => {
  const router = useRouter();
  const page = usePageData$1();
  const setActiveRouteHash = () => {
    var _a2, _b2, _c, _d;
    const headerLinks = Array.from(document.querySelectorAll(headerLinkSelector2));
    const headerAnchors = Array.from(document.querySelectorAll(headerAnchorSelector2));
    const existedHeaderAnchors = headerAnchors.filter((anchor) => headerLinks.some((link) => link.hash === anchor.hash));
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    const scrollBottom = window.innerHeight + scrollTop;
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const isAtPageBottom = Math.abs(scrollHeight - scrollBottom) < offset2;
    for (let i = 0; i < existedHeaderAnchors.length; i++) {
      const anchor = existedHeaderAnchors[i];
      const nextAnchor = existedHeaderAnchors[i + 1];
      const isTheFirstAnchorActive = i === 0 && scrollTop === 0;
      const hasPassedCurrentAnchor = scrollTop >= ((_b2 = (_a2 = anchor.parentElement.parentElement) === null || _a2 === void 0 ? void 0 : _a2.offsetTop) !== null && _b2 !== void 0 ? _b2 : 0) - offset2;
      const hasNotPassedNextAnchor = !nextAnchor || scrollTop < ((_d = (_c = nextAnchor.parentElement.parentElement) === null || _c === void 0 ? void 0 : _c.offsetTop) !== null && _d !== void 0 ? _d : 0) - offset2;
      const isActive = isTheFirstAnchorActive || hasPassedCurrentAnchor && hasNotPassedNextAnchor;
      if (!isActive)
        continue;
      const routeHash = decodeURIComponent(router.currentRoute.value.hash);
      const anchorHash = decodeURIComponent(anchor.hash);
      if (routeHash === anchorHash)
        return;
      if (isAtPageBottom) {
        for (let j = i + 1; j < existedHeaderAnchors.length; j++) {
          if (routeHash === decodeURIComponent(existedHeaderAnchors[j].hash)) {
            return;
          }
        }
      }
      replaceWithoutScrollBehavior(router, {
        hash: anchorHash,
        force: true
      });
      return;
    }
  };
  const onScroll = r(setActiveRouteHash, delay2);
  onMounted(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
  });
  watch(() => page.value.path, onScroll);
};
const replaceWithoutScrollBehavior = async (router, ...args) => {
  const { scrollBehavior } = router.options;
  router.options.scrollBehavior = void 0;
  await router.replace(...args).finally(() => router.options.scrollBehavior = scrollBehavior);
};
const headerLinkSelector = "a.sidebar-item";
const headerAnchorSelector = ".header-anchor";
const delay = 300;
const offset = 5;
var clientAppSetup0 = defineClientAppSetup(() => {
  useActiveHeaderLinks({
    headerLinkSelector,
    headerAnchorSelector,
    delay,
    offset
  });
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var nprogress$1 = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory();
    }
  })(commonjsGlobal, function() {
    var NProgress = {};
    NProgress.version = "0.2.0";
    var Settings = NProgress.settings = {
      minimum: 0.08,
      easing: "ease",
      positionUsing: "",
      speed: 200,
      trickle: true,
      trickleRate: 0.02,
      trickleSpeed: 800,
      showSpinner: true,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: "body",
      template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };
    NProgress.configure = function(options) {
      var key, value;
      for (key in options) {
        value = options[key];
        if (value !== void 0 && options.hasOwnProperty(key))
          Settings[key] = value;
      }
      return this;
    };
    NProgress.status = null;
    NProgress.set = function(n) {
      var started = NProgress.isStarted();
      n = clamp3(n, Settings.minimum, 1);
      NProgress.status = n === 1 ? null : n;
      var progress = NProgress.render(!started), bar = progress.querySelector(Settings.barSelector), speed = Settings.speed, ease = Settings.easing;
      progress.offsetWidth;
      queue2(function(next) {
        if (Settings.positionUsing === "")
          Settings.positionUsing = NProgress.getPositioningCSS();
        css2(bar, barPositionCSS(n, speed, ease));
        if (n === 1) {
          css2(progress, {
            transition: "none",
            opacity: 1
          });
          progress.offsetWidth;
          setTimeout(function() {
            css2(progress, {
              transition: "all " + speed + "ms linear",
              opacity: 0
            });
            setTimeout(function() {
              NProgress.remove();
              next();
            }, speed);
          }, speed);
        } else {
          setTimeout(next, speed);
        }
      });
      return this;
    };
    NProgress.isStarted = function() {
      return typeof NProgress.status === "number";
    };
    NProgress.start = function() {
      if (!NProgress.status)
        NProgress.set(0);
      var work = function() {
        setTimeout(function() {
          if (!NProgress.status)
            return;
          NProgress.trickle();
          work();
        }, Settings.trickleSpeed);
      };
      if (Settings.trickle)
        work();
      return this;
    };
    NProgress.done = function(force) {
      if (!force && !NProgress.status)
        return this;
      return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
    };
    NProgress.inc = function(amount) {
      var n = NProgress.status;
      if (!n) {
        return NProgress.start();
      } else {
        if (typeof amount !== "number") {
          amount = (1 - n) * clamp3(Math.random() * n, 0.1, 0.95);
        }
        n = clamp3(n + amount, 0, 0.994);
        return NProgress.set(n);
      }
    };
    NProgress.trickle = function() {
      return NProgress.inc(Math.random() * Settings.trickleRate);
    };
    (function() {
      var initial = 0, current = 0;
      NProgress.promise = function($promise) {
        if (!$promise || $promise.state() === "resolved") {
          return this;
        }
        if (current === 0) {
          NProgress.start();
        }
        initial++;
        current++;
        $promise.always(function() {
          current--;
          if (current === 0) {
            initial = 0;
            NProgress.done();
          } else {
            NProgress.set((initial - current) / initial);
          }
        });
        return this;
      };
    })();
    NProgress.render = function(fromStart) {
      if (NProgress.isRendered())
        return document.getElementById("nprogress");
      addClass(document.documentElement, "nprogress-busy");
      var progress = document.createElement("div");
      progress.id = "nprogress";
      progress.innerHTML = Settings.template;
      var bar = progress.querySelector(Settings.barSelector), perc = fromStart ? "-100" : toBarPerc(NProgress.status || 0), parent = document.querySelector(Settings.parent), spinner;
      css2(bar, {
        transition: "all 0 linear",
        transform: "translate3d(" + perc + "%,0,0)"
      });
      if (!Settings.showSpinner) {
        spinner = progress.querySelector(Settings.spinnerSelector);
        spinner && removeElement(spinner);
      }
      if (parent != document.body) {
        addClass(parent, "nprogress-custom-parent");
      }
      parent.appendChild(progress);
      return progress;
    };
    NProgress.remove = function() {
      removeClass(document.documentElement, "nprogress-busy");
      removeClass(document.querySelector(Settings.parent), "nprogress-custom-parent");
      var progress = document.getElementById("nprogress");
      progress && removeElement(progress);
    };
    NProgress.isRendered = function() {
      return !!document.getElementById("nprogress");
    };
    NProgress.getPositioningCSS = function() {
      var bodyStyle = document.body.style;
      var vendorPrefix = "WebkitTransform" in bodyStyle ? "Webkit" : "MozTransform" in bodyStyle ? "Moz" : "msTransform" in bodyStyle ? "ms" : "OTransform" in bodyStyle ? "O" : "";
      if (vendorPrefix + "Perspective" in bodyStyle) {
        return "translate3d";
      } else if (vendorPrefix + "Transform" in bodyStyle) {
        return "translate";
      } else {
        return "margin";
      }
    };
    function clamp3(n, min, max) {
      if (n < min)
        return min;
      if (n > max)
        return max;
      return n;
    }
    function toBarPerc(n) {
      return (-1 + n) * 100;
    }
    function barPositionCSS(n, speed, ease) {
      var barCSS;
      if (Settings.positionUsing === "translate3d") {
        barCSS = { transform: "translate3d(" + toBarPerc(n) + "%,0,0)" };
      } else if (Settings.positionUsing === "translate") {
        barCSS = { transform: "translate(" + toBarPerc(n) + "%,0)" };
      } else {
        barCSS = { "margin-left": toBarPerc(n) + "%" };
      }
      barCSS.transition = "all " + speed + "ms " + ease;
      return barCSS;
    }
    var queue2 = function() {
      var pending = [];
      function next() {
        var fn = pending.shift();
        if (fn) {
          fn(next);
        }
      }
      return function(fn) {
        pending.push(fn);
        if (pending.length == 1)
          next();
      };
    }();
    var css2 = function() {
      var cssPrefixes = ["Webkit", "O", "Moz", "ms"], cssProps = {};
      function camelCase(string) {
        return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match, letter) {
          return letter.toUpperCase();
        });
      }
      function getVendorProp(name) {
        var style = document.body.style;
        if (name in style)
          return name;
        var i = cssPrefixes.length, capName = name.charAt(0).toUpperCase() + name.slice(1), vendorName;
        while (i--) {
          vendorName = cssPrefixes[i] + capName;
          if (vendorName in style)
            return vendorName;
        }
        return name;
      }
      function getStyleProp(name) {
        name = camelCase(name);
        return cssProps[name] || (cssProps[name] = getVendorProp(name));
      }
      function applyCss(element, prop, value) {
        prop = getStyleProp(prop);
        element.style[prop] = value;
      }
      return function(element, properties) {
        var args = arguments, prop, value;
        if (args.length == 2) {
          for (prop in properties) {
            value = properties[prop];
            if (value !== void 0 && properties.hasOwnProperty(prop))
              applyCss(element, prop, value);
          }
        } else {
          applyCss(element, args[1], args[2]);
        }
      };
    }();
    function hasClass(element, name) {
      var list = typeof element == "string" ? element : classList(element);
      return list.indexOf(" " + name + " ") >= 0;
    }
    function addClass(element, name) {
      var oldList = classList(element), newList = oldList + name;
      if (hasClass(oldList, name))
        return;
      element.className = newList.substring(1);
    }
    function removeClass(element, name) {
      var oldList = classList(element), newList;
      if (!hasClass(element, name))
        return;
      newList = oldList.replace(" " + name + " ", " ");
      element.className = newList.substring(1, newList.length - 1);
    }
    function classList(element) {
      return (" " + (element.className || "") + " ").replace(/\s+/gi, " ");
    }
    function removeElement(element) {
      element && element.parentNode && element.parentNode.removeChild(element);
    }
    return NProgress;
  });
})(nprogress$1);
var vars = "";
var nprogress = "";
const useNprogress = () => {
  onMounted(() => {
    const router = useRouter();
    const loadedPages = new Set();
    loadedPages.add(router.currentRoute.value.path);
    nprogress$1.exports.configure({ showSpinner: false });
    router.beforeEach((to) => {
      if (!loadedPages.has(to.path)) {
        nprogress$1.exports.start();
      }
    });
    router.afterEach((to) => {
      loadedPages.add(to.path);
      nprogress$1.exports.done();
    });
  });
};
var clientAppSetup1 = defineClientAppSetup(() => {
  useNprogress();
});
var clientAppSetup2 = defineClientAppSetup(() => {
  setupDarkMode();
  setupSidebarItems();
});
const clientAppSetups = [
  clientAppSetup0,
  clientAppSetup1,
  clientAppSetup2
];
const routeItems = [
  ["v-7446daa2", "/foo/", { "title": "foo" }, ["/foo/index.html", "/foo/index.md"]],
  ["v-98df26d6", "/posts/2020-3-16-vscode-plugin.html", { "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528" }, ["/posts/2020-3-16-vscode-plugin", "/posts/2020-3-16-vscode-plugin.md"]],
  ["v-0151cd4a", "/posts/2020-3-16-windows-plugin.html", { "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350" }, ["/posts/2020-3-16-windows-plugin", "/posts/2020-3-16-windows-plugin.md"]],
  ["v-ebe80ef8", "/posts/2020-3-18-electron-mirror-down.html", { "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5" }, ["/posts/2020-3-18-electron-mirror-down", "/posts/2020-3-18-electron-mirror-down.md"]],
  ["v-a36afcfe", "/posts/2021-2-23-proxy.html", { "title": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3proxy" }, ["/posts/2021-2-23-proxy", "/posts/2021-2-23-proxy.md"]],
  ["v-810351b2", "/posts/2022-1-11md-test.html", { "title": "\u5E38\u7528Markdown\u6F14\u793A" }, ["/posts/2022-1-11md-test", "/posts/2022-1-11md-test.md"]],
  ["v-71182a26", "/posts/2021/2020-3-16-chrome-plugin.html", { "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC" }, ["/posts/2021/2020-3-16-chrome-plugin", "/posts/2021/2020-3-16-chrome-plugin.md"]],
  ["v-3706649a", "/404.html", { "title": "" }, ["/404"]],
  ["v-8daa1a0e", "/", { "title": "" }, ["/index.html"]],
  ["v-01560935", "/timeline/", { "title": "" }, ["/timeline/index.html"]]
];
const pagesRoutes = routeItems.reduce((result, [name, path, meta, redirects]) => {
  result.push({
    name,
    path,
    component: Vuepress,
    meta
  }, ...redirects.map((item) => ({
    path: item,
    redirect: path
  })));
  return result;
}, [
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: Vuepress
  }
]);
const resolvers = reactive({
  resolvePageData: async (pageKey) => {
    const pageDataResolver = pagesData.value[pageKey];
    const pageData2 = await (pageDataResolver === null || pageDataResolver === void 0 ? void 0 : pageDataResolver());
    return pageData2 !== null && pageData2 !== void 0 ? pageData2 : pageDataEmpty;
  },
  resolvePageFrontmatter: (pageData2) => pageData2.frontmatter,
  resolvePageHead: (headTitle, frontmatter, siteLocale) => {
    const description = isString$1(frontmatter.description) ? frontmatter.description : siteLocale.description;
    const head = [
      ...isArray(frontmatter.head) ? frontmatter.head : [],
      ...siteLocale.head,
      ["title", {}, headTitle],
      ["meta", { name: "description", content: description }]
    ];
    return dedupeHead(head);
  },
  resolvePageHeadTitle: (page, siteLocale) => `${page.title ? `${page.title} | ` : ``}${siteLocale.title}`,
  resolvePageLang: (pageData2) => pageData2.lang || "en",
  resolveRouteLocale: (locales2, routePath) => resolveLocalePath(locales2, routePath),
  resolveSiteLocaleData: (site, routeLocale) => __spreadValues(__spreadValues({}, site), site.locales[routeLocale])
});
const historyCreator$1 = createWebHistory;
const createVueRouter$1 = () => {
  const router = createRouter({
    history: historyCreator$1(removeEndingSlash(siteData.value.base)),
    routes: pagesRoutes,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition)
        return savedPosition;
      if (to.hash)
        return { el: to.hash };
      return { top: 0 };
    }
  });
  router.beforeResolve(async (to, from) => {
    var _a2;
    if (to.path !== from.path || from === START_LOCATION_NORMALIZED) {
      [pageData.value] = await Promise.all([
        resolvers.resolvePageData(to.name),
        (_a2 = pagesComponents[to.name]) === null || _a2 === void 0 ? void 0 : _a2.__asyncLoader()
      ]);
    }
  });
  return router;
};
const setupGlobalComponents$1 = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content);
};
const setupGlobalComputed$1 = (app, router) => {
  const routeLocale = computed(() => resolvers.resolveRouteLocale(siteData.value.locales, router.currentRoute.value.path));
  const siteLocaleData = computed(() => resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value));
  const pageFrontmatter = computed(() => resolvers.resolvePageFrontmatter(pageData.value));
  const pageHeadTitle = computed(() => resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value));
  const pageHead = computed(() => resolvers.resolvePageHead(pageHeadTitle.value, pageFrontmatter.value, siteLocaleData.value));
  const pageLang = computed(() => resolvers.resolvePageLang(pageData.value));
  app.provide(routeLocaleSymbol, routeLocale);
  app.provide(siteLocaleDataSymbol, siteLocaleData);
  app.provide(pageFrontmatterSymbol, pageFrontmatter);
  app.provide(pageHeadTitleSymbol, pageHeadTitle);
  app.provide(pageHeadSymbol, pageHead);
  app.provide(pageLangSymbol, pageLang);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $head: { get: () => pageHead.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase }
  });
  return {
    pageData,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    routeLocale,
    siteData,
    siteLocaleData
  };
};
const setupUpdateHead$1 = () => {
  const route = useRoute();
  const head = usePageHead();
  const lang = usePageLang();
  const headTags = ref([]);
  const loadHead = () => {
    head.value.forEach((item) => {
      const tag = queryHeadTag$1(item);
      if (tag) {
        headTags.value.push(tag);
      }
    });
  };
  const updateHead = () => {
    document.documentElement.lang = lang.value;
    headTags.value.forEach((item) => {
      if (item.parentNode === document.head) {
        document.head.removeChild(item);
      }
    });
    headTags.value.splice(0, headTags.value.length);
    head.value.forEach((item) => {
      const tag = createHeadTag$1(item);
      if (tag !== null) {
        document.head.appendChild(tag);
        headTags.value.push(tag);
      }
    });
  };
  provide(updateHeadSymbol, updateHead);
  onMounted(() => {
    loadHead();
    updateHead();
    watch(() => route.path, () => updateHead());
  });
};
const queryHeadTag$1 = ([tagName, attrs, content = ""]) => {
  const attrsSelector = Object.entries(attrs).map(([key, value]) => {
    if (isString$1(value)) {
      return `[${key}="${value}"]`;
    }
    if (value === true) {
      return `[${key}]`;
    }
    return "";
  }).join("");
  const selector3 = `head > ${tagName}${attrsSelector}`;
  const tags = Array.from(document.querySelectorAll(selector3));
  const matchedTag = tags.find((item) => item.innerText === content);
  return matchedTag || null;
};
const createHeadTag$1 = ([tagName, attrs, content]) => {
  if (!isString$1(tagName)) {
    return null;
  }
  const tag = document.createElement(tagName);
  if (isPlainObject(attrs)) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (isString$1(value)) {
        tag.setAttribute(key, value);
      } else if (value === true) {
        tag.setAttribute(key, "");
      }
    });
  }
  if (isString$1(content)) {
    tag.appendChild(document.createTextNode(content));
  }
  return tag;
};
const appCreator$1 = createSSRApp;
const createVueApp$1 = async () => {
  const app = appCreator$1({
    name: "VuepressApp",
    setup() {
      setupUpdateHead$1();
      for (const clientAppSetup of clientAppSetups) {
        clientAppSetup();
      }
      return () => [
        h(RouterView),
        ...clientAppRootComponents.map((comp) => h(comp))
      ];
    }
  });
  const router = createVueRouter$1();
  setupGlobalComponents$1(app);
  setupGlobalComputed$1(app, router);
  for (const clientAppEnhance of clientAppEnhances) {
    await clientAppEnhance({ app, router, siteData });
  }
  app.use(router);
  return {
    app,
    router
  };
};
{
  createVueApp$1().then(({ app, router }) => {
    router.isReady().then(() => {
      app.mount("#app");
    });
  });
}
const hexToRgba = (hex, opacity) => {
  return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
};
var Cover_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$b = { class: "img-box" };
const _hoisted_2$7 = ["src"];
const _sfc_main$d = {
  props: {
    item: Object
  },
  setup(__props) {
    let isLoaded = ref(false);
    const imgLoaded = () => {
      console.log("\u52A0\u8F7D\u5B8C\u6BD5");
      isLoaded.value = true;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$b, [
          createBaseVNode("img", {
            src: __props.item.frontmatter.cover,
            onLoad: imgLoaded,
            loading: "lazy",
            class: normalizeClass([{ isImgLoaded: unref(isLoaded) }, "cover"]),
            alt: "cover"
          }, null, 42, _hoisted_2$7)
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["loading", { isLoaded: unref(isLoaded) }]),
          style: normalizeStyle({ backgroundColor: unref(hexToRgba)(`#${__props.item.frontmatter.primary}`, 0.1) })
        }, null, 6)
      ], 64);
    };
  }
};
var Cover = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-73c88ff5"]]);
var dayjs_min = { exports: {} };
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    var t = 1e3, e = 6e4, n = 36e5, r2 = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h2 = "quarter", c = "year", d = "date", $ = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m = function(t2, e2, n2) {
      var r3 = String(t2);
      return !r3 || r3.length >= e2 ? t2 : "" + Array(e2 + 1 - r3.length).join(n2) + t2;
    }, g = { s: m, z: function(t2) {
      var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r3 = Math.floor(n2 / 60), i2 = n2 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r3, 2, "0") + ":" + m(i2, 2, "0");
    }, m: function t2(e2, n2) {
      if (e2.date() < n2.date())
        return -t2(n2, e2);
      var r3 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r3, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r3 + (s2 ? -1 : 1), f);
      return +(-(r3 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
    }, a: function(t2) {
      return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
    }, p: function(t2) {
      return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r2, Q: h2 }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t2) {
      return t2 === void 0;
    } }, D = "en", v = {};
    v[D] = M;
    var p2 = function(t2) {
      return t2 instanceof _;
    }, S = function(t2, e2, n2) {
      var r3;
      if (!t2)
        return D;
      if (typeof t2 == "string")
        v[t2] && (r3 = t2), e2 && (v[t2] = e2, r3 = t2);
      else {
        var i2 = t2.name;
        v[i2] = t2, r3 = i2;
      }
      return !n2 && r3 && (D = r3), r3 || !n2 && D;
    }, w = function(t2, e2) {
      if (p2(t2))
        return t2.clone();
      var n2 = typeof e2 == "object" ? e2 : {};
      return n2.date = t2, n2.args = arguments, new _(n2);
    }, O = g;
    O.l = S, O.i = p2, O.w = function(t2, e2) {
      return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M2(t2) {
        this.$L = S(t2.locale, null, true), this.parse(t2);
      }
      var m2 = M2.prototype;
      return m2.parse = function(t2) {
        this.$d = function(t3) {
          var e2 = t3.date, n2 = t3.utc;
          if (e2 === null)
            return new Date(NaN);
          if (O.u(e2))
            return new Date();
          if (e2 instanceof Date)
            return new Date(e2);
          if (typeof e2 == "string" && !/Z$/i.test(e2)) {
            var r3 = e2.match(l);
            if (r3) {
              var i2 = r3[2] - 1 || 0, s2 = (r3[7] || "0").substring(0, 3);
              return n2 ? new Date(Date.UTC(r3[1], i2, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s2)) : new Date(r3[1], i2, r3[3] || 1, r3[4] || 0, r3[5] || 0, r3[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t2), this.$x = t2.x || {}, this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return O;
      }, m2.isValid = function() {
        return !(this.$d.toString() === $);
      }, m2.isSame = function(t2, e2) {
        var n2 = w(t2);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return w(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < w(t2);
      }, m2.$g = function(t2, e2, n2) {
        return O.u(t2) ? this[e2] : this.set(n2, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n2 = this, r3 = !!O.u(e2) || e2, h3 = O.p(t2), $2 = function(t3, e3) {
          var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
          return r3 ? i2 : i2.endOf(a);
        }, l2 = function(t3, e3) {
          return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r3 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, g2 = "set" + (this.$u ? "UTC" : "");
        switch (h3) {
          case c:
            return r3 ? $2(1, 0) : $2(31, 11);
          case f:
            return r3 ? $2(1, M3) : $2(0, M3 + 1);
          case o:
            var D2 = this.$locale().weekStart || 0, v2 = (y2 < D2 ? y2 + 7 : y2) - D2;
            return $2(r3 ? m3 - v2 : m3 + (6 - v2), M3);
          case a:
          case d:
            return l2(g2 + "Hours", 0);
          case u:
            return l2(g2 + "Minutes", 1);
          case s:
            return l2(g2 + "Seconds", 2);
          case i:
            return l2(g2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t2) {
        return this.startOf(t2, false);
      }, m2.$set = function(t2, e2) {
        var n2, o2 = O.p(t2), h3 = "set" + (this.$u ? "UTC" : ""), $2 = (n2 = {}, n2[a] = h3 + "Date", n2[d] = h3 + "Date", n2[f] = h3 + "Month", n2[c] = h3 + "FullYear", n2[u] = h3 + "Hours", n2[s] = h3 + "Minutes", n2[i] = h3 + "Seconds", n2[r2] = h3 + "Milliseconds", n2)[o2], l2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === f || o2 === c) {
          var y2 = this.clone().set(d, 1);
          y2.$d[$2](l2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else
          $2 && this.$d[$2](l2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[O.p(t2)]();
      }, m2.add = function(r3, h3) {
        var d2, $2 = this;
        r3 = Number(r3);
        var l2 = O.p(h3), y2 = function(t2) {
          var e2 = w($2);
          return O.w(e2.date(e2.date() + Math.round(t2 * r3)), $2);
        };
        if (l2 === f)
          return this.set(f, this.$M + r3);
        if (l2 === c)
          return this.set(c, this.$y + r3);
        if (l2 === a)
          return y2(1);
        if (l2 === o)
          return y2(7);
        var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[l2] || 1, m3 = this.$d.getTime() + r3 * M3;
        return O.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid())
          return n2.invalidDate || $;
        var r3 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h3 = function(t3, n3, i3, s3) {
          return t3 && (t3[n3] || t3(e2, r3)) || i3[n3].substr(0, s3);
        }, c2 = function(t3) {
          return O.s(s2 % 12 || 12, t3, "0");
        }, d2 = n2.meridiem || function(t3, e3, n3) {
          var r4 = t3 < 12 ? "AM" : "PM";
          return n3 ? r4.toLowerCase() : r4;
        }, l2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h3(n2.monthsShort, a2, f2, 3), MMMM: h3(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h3(n2.weekdaysMin, this.$W, o2, 2), ddd: h3(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
        return r3.replace(y, function(t3, e3) {
          return e3 || l2[t3] || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r3, d2, $2) {
        var l2, y2 = O.p(d2), M3 = w(r3), m3 = (M3.utcOffset() - this.utcOffset()) * e, g2 = this - M3, D2 = O.m(this, M3);
        return D2 = (l2 = {}, l2[c] = D2 / 12, l2[f] = D2, l2[h2] = D2 / 3, l2[o] = (g2 - m3) / 6048e5, l2[a] = (g2 - m3) / 864e5, l2[u] = g2 / n, l2[s] = g2 / e, l2[i] = g2 / t, l2)[y2] || g2, $2 ? D2 : O.a(D2);
      }, m2.daysInMonth = function() {
        return this.endOf(f).$D;
      }, m2.$locale = function() {
        return v[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2)
          return this.$L;
        var n2 = this.clone(), r3 = S(t2, e2, true);
        return r3 && (n2.$L = r3), n2;
      }, m2.clone = function() {
        return O.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), b = _.prototype;
    return w.prototype = b, [["$ms", r2], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
      b[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    }), w.extend = function(t2, e2) {
      return t2.$i || (t2(e2, _, w), t2.$i = true), w;
    }, w.locale = S, w.isDayjs = p2, w.unix = function(t2) {
      return w(1e3 * t2);
    }, w.en = v[D], w.Ls = v, w.p = {}, w;
  });
})(dayjs_min);
var dayjs = dayjs_min.exports;
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
/*!
 * GSAP 3.9.1
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, _defaults = {
  duration: 0.5,
  overwrite: false,
  delay: 0
}, _suppressOverwrites, _bigNum$1 = 1e8, _tinyNum = 1 / _bigNum$1, _2PI = Math.PI * 2, _HALF_PI = _2PI / 4, _gsID = 0, _sqrt = Math.sqrt, _cos = Math.cos, _sin = Math.sin, _isString = function _isString2(value) {
  return typeof value === "string";
}, _isFunction = function _isFunction2(value) {
  return typeof value === "function";
}, _isNumber = function _isNumber2(value) {
  return typeof value === "number";
}, _isUndefined = function _isUndefined2(value) {
  return typeof value === "undefined";
}, _isObject = function _isObject2(value) {
  return typeof value === "object";
}, _isNotFalse = function _isNotFalse2(value) {
  return value !== false;
}, _windowExists$1 = function _windowExists() {
  return typeof window !== "undefined";
}, _isFuncOrString = function _isFuncOrString2(value) {
  return _isFunction(value) || _isString(value);
}, _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
}, _isArray = Array.isArray, _strictNumExp = /(?:-?\.?\d|\.)+/gi, _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, _relExp = /[+-]=-?[.\d]+/, _delimitedValueExp = /[^,'"\[\]\s]+/gi, _unitExp = /[\d.+\-=]+(?:e[-+]\d*)*/i, _globalTimeline, _win$1, _coreInitted, _doc$1, _globals = {}, _installScope = {}, _coreReady, _install = function _install2(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
}, _missingPlugin = function _missingPlugin2(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
}, _warn = function _warn2(message, suppress) {
  return !suppress && console.warn(message);
}, _addGlobal = function _addGlobal2(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
}, _emptyFunc = function _emptyFunc2() {
  return 0;
}, _reservedProps = {}, _lazyTweens = [], _lazyLookup = {}, _lastRenderedFrame, _plugins = {}, _effects = {}, _nextGCFrame = 30, _harnessPlugins = [], _callbackNames = "", _harness = function _harness2(targets) {
  var target = targets[0], harnessPlugin, i;
  _isObject(target) || _isFunction(target) || (targets = [targets]);
  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    i = _harnessPlugins.length;
    while (i-- && !_harnessPlugins[i].targetTest(target)) {
    }
    harnessPlugin = _harnessPlugins[i];
  }
  i = targets.length;
  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }
  return targets;
}, _getCache = function _getCache2(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
}, _getProperty = function _getProperty2(target, property, v) {
  return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
}, _forEachName = function _forEachName2(names, func) {
  return (names = names.split(",")).forEach(func) || names;
}, _round = function _round2(value) {
  return Math.round(value * 1e5) / 1e5 || 0;
}, _roundPrecise = function _roundPrecise2(value) {
  return Math.round(value * 1e7) / 1e7 || 0;
}, _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
  var l = toFind.length, i = 0;
  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) {
  }
  return i < l;
}, _lazyRender = function _lazyRender2() {
  var l = _lazyTweens.length, a = _lazyTweens.slice(0), i, tween;
  _lazyLookup = {};
  _lazyTweens.length = 0;
  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
}, _lazySafeRender = function _lazySafeRender2(animation, time, suppressEvents, force) {
  _lazyTweens.length && _lazyRender();
  animation.render(time, suppressEvents, force);
  _lazyTweens.length && _lazyRender();
}, _numericIfPossible = function _numericIfPossible2(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
}, _passThrough = function _passThrough2(p2) {
  return p2;
}, _setDefaults = function _setDefaults2(obj, defaults2) {
  for (var p2 in defaults2) {
    p2 in obj || (obj[p2] = defaults2[p2]);
  }
  return obj;
}, _setKeyframeDefaults = function _setKeyframeDefaults2(excludeDuration) {
  return function(obj, defaults2) {
    for (var p2 in defaults2) {
      p2 in obj || p2 === "duration" && excludeDuration || p2 === "ease" || (obj[p2] = defaults2[p2]);
    }
  };
}, _merge = function _merge2(base2, toMerge) {
  for (var p2 in toMerge) {
    base2[p2] = toMerge[p2];
  }
  return base2;
}, _mergeDeep = function _mergeDeep2(base2, toMerge) {
  for (var p2 in toMerge) {
    p2 !== "__proto__" && p2 !== "constructor" && p2 !== "prototype" && (base2[p2] = _isObject(toMerge[p2]) ? _mergeDeep2(base2[p2] || (base2[p2] = {}), toMerge[p2]) : toMerge[p2]);
  }
  return base2;
}, _copyExcluding = function _copyExcluding2(obj, excluding) {
  var copy = {}, p2;
  for (p2 in obj) {
    p2 in excluding || (copy[p2] = obj[p2]);
  }
  return copy;
}, _inheritDefaults = function _inheritDefaults2(vars2) {
  var parent = vars2.parent || _globalTimeline, func = vars2.keyframes ? _setKeyframeDefaults(_isArray(vars2.keyframes)) : _setDefaults;
  if (_isNotFalse(vars2.inherit)) {
    while (parent) {
      func(vars2, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }
  return vars2;
}, _arraysMatch = function _arraysMatch2(a1, a2) {
  var i = a1.length, match = i === a2.length;
  while (match && i-- && a1[i] === a2[i]) {
  }
  return i < 0;
}, _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }
  if (lastProp === void 0) {
    lastProp = "_last";
  }
  var prev = parent[lastProp], t;
  if (sortBy) {
    t = child[sortBy];
    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }
  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }
  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }
  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
}, _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }
  if (lastProp === void 0) {
    lastProp = "_last";
  }
  var prev = child._prev, next = child._next;
  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }
  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }
  child._next = child._prev = child.parent = null;
}, _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
  child._act = 0;
}, _uncache = function _uncache2(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    var a = animation;
    while (a) {
      a._dirty = 1;
      a = a.parent;
    }
  }
  return animation;
}, _recacheAncestors = function _recacheAncestors2(animation) {
  var parent = animation.parent;
  while (parent && parent.parent) {
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }
  return animation;
}, _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
}, _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
}, _animationCycle = function _animationCycle2(tTime, cycleDuration) {
  var whole = Math.floor(tTime /= cycleDuration);
  return tTime && whole === tTime ? whole - 1 : whole;
}, _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
}, _setEnd = function _setEnd2(animation) {
  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
}, _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
  var parent = animation._dp;
  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
    _setEnd(animation);
    parent._dirty || _uncache(parent, animation);
  }
  return animation;
}, _postAddChecks = function _postAddChecks2(timeline2, child) {
  var t;
  if (child._time || child._initted && !child._dur) {
    t = _parentToChildTotalTime(timeline2.rawTime(), child);
    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  }
  if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
    if (timeline2._dur < timeline2.duration()) {
      t = timeline2;
      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime);
        t = t._dp;
      }
    }
    timeline2._zTime = -_tinyNum;
  }
}, _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _roundPrecise((_isNumber(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition(timeline2, position, child) : timeline2._time) + child._delay);
  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
  _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
  _isFromOrFromStart(child) || (timeline2._recent = child);
  skipChecks || _postAddChecks(timeline2, child);
  return timeline2;
}, _scrollTrigger = function _scrollTrigger2(animation, trigger2) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger2)) && _globals.ScrollTrigger.create(trigger2, animation);
}, _attemptInitTween = function _attemptInitTween2(tween, totalTime, force, suppressEvents) {
  _initTween(tween, totalTime);
  if (!tween._initted) {
    return 1;
  }
  if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);
    tween._lazy = [totalTime, suppressEvents];
    return 1;
  }
}, _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
}, _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
  var data = _ref2.data;
  return data === "isFromStart" || data === "isStart";
}, _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
  if (repeatDelay && tween._repeat) {
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }
  if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
      return;
    }
    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
    suppressEvents || (suppressEvents = totalTime && !prevIteration);
    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    pt = tween._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
    tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);
      if (!suppressEvents) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
}, _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time) {
  var child;
  if (time > prevTime) {
    child = animation._first;
    while (child && child._start <= time) {
      if (child.data === "isPause" && child._start > prevTime) {
        return child;
      }
      child = child._next;
    }
  } else {
    child = animation._last;
    while (child && child._start >= time) {
      if (child.data === "isPause" && child._start < prevTime) {
        return child;
      }
      child = child._prev;
    }
  }
}, _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress > 0 && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
}, _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
}, _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc,
  totalDuration: _emptyFunc
}, _parsePosition = function _parsePosition2(animation, position, percentAnimation) {
  var labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum$1 ? recent.endTime(false) : animation._dur, i, offset2, isPercent;
  if (_isString(position) && (isNaN(position) || position in labels)) {
    offset2 = position.charAt(0);
    isPercent = position.substr(-1) === "%";
    i = position.indexOf("=");
    if (offset2 === "<" || offset2 === ">") {
      i >= 0 && (position = position.replace(/=/, ""));
      return (offset2 === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
    }
    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }
    offset2 = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
    if (isPercent && percentAnimation) {
      offset2 = offset2 / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
    }
    return i > 1 ? _parsePosition2(animation, position.substr(0, i - 1), percentAnimation) + offset2 : clippedDuration + offset2;
  }
  return position == null ? clippedDuration : +position;
}, _createTweenType = function _createTweenType2(type, params, timeline2) {
  var isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars2 = params[varsIndex], irVars, parent;
  isLegacy && (vars2.duration = params[1]);
  vars2.parent = timeline2;
  if (type) {
    irVars = vars2;
    parent = timeline2;
    while (parent && !("immediateRender" in irVars)) {
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }
    vars2.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars2.runBackwards = 1 : vars2.startAt = params[varsIndex - 1];
  }
  return new Tween(params[0], vars2, params[varsIndex + 1]);
}, _conditionalReturn = function _conditionalReturn2(value, func) {
  return value || value === 0 ? func(value) : func;
}, _clamp = function _clamp2(min, max, value) {
  return value < min ? min : value > max ? max : value;
}, getUnit = function getUnit2(value, v) {
  return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : value.substr(v.index + v[0].length);
}, clamp = function clamp2(min, max, value) {
  return _conditionalReturn(value, function(v) {
    return _clamp(min, max, v);
  });
}, _slice = [].slice, _isArrayLike = function _isArrayLike2(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win$1;
}, _flatten = function _flatten2(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }
  return ar.forEach(function(value) {
    var _accumulator;
    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
}, toArray = function toArray2(value, scope, leaveStrings) {
  return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc$1).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
}, selector = function selector2(value) {
  value = toArray(value)[0] || _warn("Invalid scope") || {};
  return function(v) {
    var el = value.current || value.nativeElement || value;
    return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc$1.createElement("div") : value);
  };
}, shuffle = function shuffle2(a) {
  return a.sort(function() {
    return 0.5 - Math.random();
  });
}, distribute = function distribute2(v) {
  if (_isFunction(v)) {
    return v;
  }
  var vars2 = _isObject(v) ? v : {
    each: v
  }, ease = _parseEase(vars2.ease), from = vars2.from || 0, base2 = parseFloat(vars2.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars2.axis, ratioX = from, ratioY = from;
  if (_isString(from)) {
    ratioX = ratioY = {
      center: 0.5,
      edges: 0.5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }
  return function(i, target, a) {
    var l = (a || vars2).length, distances = cache[l], originX, originY, x, y, d, j, max, min, wrapAt;
    if (!distances) {
      wrapAt = vars2.grid === "auto" ? 0 : (vars2.grid || [1, _bigNum$1])[1];
      if (!wrapAt) {
        max = -_bigNum$1;
        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {
        }
        wrapAt--;
      }
      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
      originY = wrapAt === _bigNum$1 ? 0 : ratios ? l * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum$1;
      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }
      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars2.amount) || parseFloat(vars2.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base2 - l : base2;
      distances.u = getUnit(vars2.amount || vars2.each) || 0;
      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }
    l = (distances[i] - distances.min) / distances.max || 0;
    return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
  };
}, _roundModifier = function _roundModifier2(v) {
  var p2 = Math.pow(10, ((v + "").split(".")[1] || "").length);
  return function(raw) {
    var n = Math.round(parseFloat(raw) / v) * v * p2;
    return (n - n % 1) / p2 + (_isNumber(raw) ? 0 : getUnit(raw));
  };
}, snap = function snap2(snapTo, value) {
  var isArray2 = _isArray(snapTo), radius, is2D;
  if (!isArray2 && _isObject(snapTo)) {
    radius = isArray2 = snapTo.radius || _bigNum$1;
    if (snapTo.values) {
      snapTo = toArray(snapTo.values);
      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius;
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }
  return _conditionalReturn(value, !isArray2 ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function(raw) {
    var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum$1, closest = 0, i = snapTo.length, dx, dy;
    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }
      if (dx < min) {
        min = dx;
        closest = i;
      }
    }
    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
}, random = function random2(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
}, pipe = function pipe2() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }
  return function(value) {
    return functions.reduce(function(v, f) {
      return f(v);
    }, value);
  };
}, unitize = function unitize2(func, unit) {
  return function(value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
}, normalize = function normalize2(min, max, value) {
  return mapRange(min, max, 0, 1, value);
}, _wrapArray = function _wrapArray2(a, wrapper, value) {
  return _conditionalReturn(value, function(index2) {
    return a[~~wrapper(index2)];
  });
}, wrap = function wrap2(min, max, value) {
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap2(0, min.length), max) : _conditionalReturn(value, function(value2) {
    return (range + (value2 - min) % range) % range + min;
  });
}, wrapYoyo = function wrapYoyo2(min, max, value) {
  var range = max - min, total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo2(0, min.length - 1), max) : _conditionalReturn(value, function(value2) {
    value2 = (total + (value2 - min) % total) % total || 0;
    return min + (value2 > range ? total - value2 : value2);
  });
}, _replaceRandom = function _replaceRandom2(value) {
  var prev = 0, s = "", i, nums, end, isArray2;
  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray2 = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray2 ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray2 ? nums : +nums[0], isArray2 ? 0 : +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }
  return s + value.substr(prev, value.length - prev);
}, mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin, outRange = outMax - outMin;
  return _conditionalReturn(value, function(value2) {
    return outMin + ((value2 - inMin) / inRange * outRange || 0);
  });
}, interpolate = function interpolate2(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function(p3) {
    return (1 - p3) * start + p3 * end;
  };
  if (!func) {
    var isString2 = _isString(start), master = {}, p2, i, interpolators, l, il;
    progress === true && (mutate = 1) && (progress = null);
    if (isString2) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;
      for (i = 1; i < l; i++) {
        interpolators.push(interpolate2(start[i - 1], start[i]));
      }
      l--;
      func = function func2(p3) {
        p3 *= l;
        var i2 = Math.min(il, ~~p3);
        return interpolators[i2](p3 - i2);
      };
      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }
    if (!interpolators) {
      for (p2 in end) {
        _addPropTween.call(master, start, p2, "get", end[p2]);
      }
      func = function func2(p3) {
        return _renderPropTweens(p3, master) || (isString2 ? start.p : start);
      };
    }
  }
  return _conditionalReturn(progress, func);
}, _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
  var labels = timeline2.labels, min = _bigNum$1, p2, distance, label;
  for (p2 in labels) {
    distance = labels[p2] - fromTime;
    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p2;
      min = distance;
    }
  }
  return label;
}, _callback = function _callback2(animation, type, executeLazyFirst) {
  var v = animation.vars, callback = v[type], params, scope;
  if (!callback) {
    return;
  }
  params = v[type + "Params"];
  scope = v.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender();
  return params ? callback.apply(scope, params) : callback.call(scope);
}, _interrupt = function _interrupt2(animation) {
  _removeFromParent(animation);
  animation.scrollTrigger && animation.scrollTrigger.kill(false);
  animation.progress() < 1 && _callback(animation, "onInterrupt");
  return animation;
}, _quickTween, _createPlugin = function _createPlugin2(config3) {
  config3 = !config3.name && config3["default"] || config3;
  var name = config3.name, isFunc = _isFunction(config3), Plugin = name && !isFunc && config3.init ? function() {
    this._props = [];
  } : config3, instanceDefaults = {
    init: _emptyFunc,
    render: _renderPropTweens,
    add: _addPropTween,
    kill: _killPropTweensOf,
    modifier: _addPluginModifier,
    rawVars: 0
  }, statics = {
    targetTest: 0,
    get: 0,
    getSetter: _getSetter,
    aliases: {},
    register: 0
  };
  _wake();
  if (config3 !== Plugin) {
    if (_plugins[name]) {
      return;
    }
    _setDefaults(Plugin, _setDefaults(_copyExcluding(config3, instanceDefaults), statics));
    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
    _plugins[Plugin.prop = name] = Plugin;
    if (config3.targetTest) {
      _harnessPlugins.push(Plugin);
      _reservedProps[name] = 1;
    }
    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
  }
  _addGlobal(name, Plugin);
  config3.register && config3.register(gsap, Plugin, PropTween);
}, _255 = 255, _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
}, _hue = function _hue2(h2, m1, m2) {
  h2 += h2 < 0 ? 1 : h2 > 1 ? -1 : 0;
  return (h2 * 6 < 1 ? m1 + (m2 - m1) * h2 * 6 : h2 < 0.5 ? m2 : h2 * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h2) * 6 : m1) * _255 + 0.5 | 0;
}, splitColor = function splitColor2(v, toHSL, forceAlpha) {
  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0, r2, g, b, h2, s, l, max, min, d, wasHSL;
  if (!a) {
    if (v.substr(-1) === ",") {
      v = v.substr(0, v.length - 1);
    }
    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length < 6) {
        r2 = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r2 + r2 + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
      }
      if (v.length === 9) {
        a = parseInt(v.substr(1, 6), 16);
        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
      }
      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);
      if (!toHSL) {
        h2 = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        r2 = l * 2 - g;
        a.length > 3 && (a[3] *= 1);
        a[0] = _hue(h2 + 1 / 3, r2, g);
        a[1] = _hue(h2, r2, g);
        a[2] = _hue(h2 - 1 / 3, r2, g);
      } else if (~v.indexOf("=")) {
        a = v.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }
    a = a.map(Number);
  }
  if (toHSL && !wasHSL) {
    r2 = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r2, g, b);
    min = Math.min(r2, g, b);
    l = (max + min) / 2;
    if (max === min) {
      h2 = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h2 = max === r2 ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r2) / d + 2 : (r2 - g) / d + 4;
      h2 *= 60;
    }
    a[0] = ~~(h2 + 0.5);
    a[1] = ~~(s * 100 + 0.5);
    a[2] = ~~(l * 100 + 0.5);
  }
  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
}, _colorOrderData = function _colorOrderData2(v) {
  var values = [], c = [], i = -1;
  v.split(_colorExp).forEach(function(v2) {
    var a = v2.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
}, _formatColors = function _formatColors2(s, toHSL, orderMatchData) {
  var result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
  if (!colors) {
    return s;
  }
  colors = colors.map(function(color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });
  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;
    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }
  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;
    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }
  return result + shell[l];
}, _colorExp = function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p2;
  for (p2 in _colorLookup) {
    s += "|" + p2 + "\\b";
  }
  return new RegExp(s + ")", "gi");
}(), _hslExp = /hsl[a]?\(/, _colorStringFilter = function _colorStringFilter2(a) {
  var combined = a.join(" "), toHSL;
  _colorExp.lastIndex = 0;
  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
    return true;
  }
}, _tickerActive, _ticker = function() {
  var _getTime = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners = [], _id, _req, _raf, _self, _delta, _i, _tick = function _tick2(v) {
    var elapsed = _getTime() - _lastUpdate, manual = v === true, overlap, dispatch, time, frame;
    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;
    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1e3;
      _self.time = time = time / 1e3;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }
    manual || (_id = _req(_tick2));
    if (dispatch) {
      for (_i = 0; _i < _listeners.length; _i++) {
        _listeners[_i](time, _delta, frame, v);
      }
    }
  };
  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1e3 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists$1()) {
          _win$1 = _coreInitted = window;
          _doc$1 = _win$1.document || {};
          _globals.gsap = gsap;
          (_win$1.gsapVersions || (_win$1.gsapVersions = [])).push(gsap.version);
          _install(_installScope || _win$1.GreenSockGlobals || !_win$1.gsap && _win$1 || {});
          _raf = _win$1.requestAnimationFrame;
        }
        _id && _self.sleep();
        _req = _raf || function(f) {
          return setTimeout(f, _nextTime - _self.time * 1e3 + 1 | 0);
        };
        _tickerActive = 1;
        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? _win$1.cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || 1 / _tinyNum;
      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    },
    fps: function fps(_fps) {
      _gap = 1e3 / (_fps || 240);
      _nextTime = _self.time * 1e3 + _gap;
    },
    add: function add2(callback) {
      _listeners.indexOf(callback) < 0 && _listeners.push(callback);
      _wake();
    },
    remove: function remove2(callback, i) {
      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
    },
    _listeners
  };
  return _self;
}(), _wake = function _wake2() {
  return !_tickerActive && _ticker.wake();
}, _easeMap = {}, _customEaseExp = /^[\d.\-M][\d.\-,\s]/, _quotesExp = /["']/g, _parseObjectInString = function _parseObjectInString2(value) {
  var obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length, index2, val, parsedVal;
  for (; i < l; i++) {
    val = split[i];
    index2 = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index2);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index2 + 1).trim();
  }
  return obj;
}, _valueInParentheses = function _valueInParentheses2(value) {
  var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
}, _configEaseFromString = function _configEaseFromString2(name) {
  var split = (name + "").split("("), ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
}, _invertEase = function _invertEase2(ease) {
  return function(p2) {
    return 1 - ease(1 - p2);
  };
}, _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
  var child = timeline2._first, ease;
  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase2(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase2(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }
    child = child._next;
  }
}, _parseEase = function _parseEase2(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
}, _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut2(p2) {
      return 1 - easeIn(1 - p2);
    };
  }
  if (easeInOut === void 0) {
    easeInOut = function easeInOut2(p2) {
      return p2 < 0.5 ? easeIn(p2 * 2) / 2 : 1 - easeIn((1 - p2) * 2) / 2;
    };
  }
  var ease = {
    easeIn,
    easeOut,
    easeInOut
  }, lowercaseName;
  _forEachName(names, function(name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
    for (var p2 in ease) {
      _easeMap[lowercaseName + (p2 === "easeIn" ? ".in" : p2 === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p2] = ease[p2];
    }
  });
  return ease;
}, _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
  return function(p2) {
    return p2 < 0.5 ? (1 - easeOut(1 - p2 * 2)) / 2 : 0.5 + easeOut((p2 - 0.5) * 2) / 2;
  };
}, _configElastic = function _configElastic2(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p4) {
    return p4 === 1 ? 1 : p1 * Math.pow(2, -10 * p4) * _sin((p4 - p3) * p2) + 1;
  }, ease = type === "out" ? easeOut : type === "in" ? function(p4) {
    return 1 - easeOut(1 - p4);
  } : _easeInOutFromOut(easeOut);
  p2 = _2PI / p2;
  ease.config = function(amplitude2, period2) {
    return _configElastic2(type, amplitude2, period2);
  };
  return ease;
}, _configBack = function _configBack2(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }
  var easeOut = function easeOut2(p2) {
    return p2 ? --p2 * p2 * ((overshoot + 1) * p2 + overshoot) + 1 : 0;
  }, ease = type === "out" ? easeOut : type === "in" ? function(p2) {
    return 1 - easeOut(1 - p2);
  } : _easeInOutFromOut(easeOut);
  ease.config = function(overshoot2) {
    return _configBack2(type, overshoot2);
  };
  return ease;
};
_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
  var power = i < 5 ? i + 1 : i;
  _insertEase(name + ",Power" + (power - 1), i ? function(p2) {
    return Math.pow(p2, power);
  } : function(p2) {
    return p2;
  }, function(p2) {
    return 1 - Math.pow(1 - p2, power);
  }, function(p2) {
    return p2 < 0.5 ? Math.pow(p2 * 2, power) / 2 : 1 - Math.pow((1 - p2) * 2, power) / 2;
  });
});
_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
(function(n, c) {
  var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p2) {
    return p2 < n1 ? n * p2 * p2 : p2 < n2 ? n * Math.pow(p2 - 1.5 / c, 2) + 0.75 : p2 < n3 ? n * (p2 -= 2.25 / c) * p2 + 0.9375 : n * Math.pow(p2 - 2.625 / c, 2) + 0.984375;
  };
  _insertEase("Bounce", function(p2) {
    return 1 - easeOut(1 - p2);
  }, easeOut);
})(7.5625, 2.75);
_insertEase("Expo", function(p2) {
  return p2 ? Math.pow(2, 10 * (p2 - 1)) : 0;
});
_insertEase("Circ", function(p2) {
  return -(_sqrt(1 - p2 * p2) - 1);
});
_insertEase("Sine", function(p2) {
  return p2 === 1 ? 1 : -_cos(p2 * _HALF_PI) + 1;
});
_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }
    var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
    return function(p4) {
      return ((p2 * _clamp(0, max, p4) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];
_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
  return _callbackNames += name + "," + name + "Params,";
});
var GSCache = function GSCache2(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
var Animation = /* @__PURE__ */ function() {
  function Animation2(vars2) {
    this.vars = vars2;
    this._delay = +vars2.delay || 0;
    if (this._repeat = vars2.repeat === Infinity ? -2 : vars2.repeat || 0) {
      this._rDelay = vars2.repeatDelay || 0;
      this._yoyo = !!vars2.yoyo || !!vars2.yoyoEase;
    }
    this._ts = 1;
    _setDuration(this, +vars2.duration, 1, 1);
    this.data = vars2.data;
    _tickerActive || _ticker.wake();
  }
  var _proto = Animation2.prototype;
  _proto.delay = function delay2(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }
    return this._delay;
  };
  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };
  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }
    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };
  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();
    if (!arguments.length) {
      return this._tTime;
    }
    var parent = this._dp;
    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);
      !parent._dp || parent.parent || _postAddChecks(parent, this);
      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }
        parent = parent.parent;
      }
      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }
    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      this._ts || (this._pTime = _totalTime);
      _lazySafeRender(this, _totalTime, suppressEvents);
    }
    return this;
  };
  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
  };
  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  };
  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  };
  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  };
  _proto.timeScale = function timeScale(value) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts;
    }
    if (this._rts === value) {
      return this;
    }
    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
    _recacheAncestors(this.totalTime(_clamp(-this._delay, this._tDur, tTime), true));
    _setEnd(this);
    return this;
  };
  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }
    if (this._ps !== value) {
      this._ps = value;
      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
        this._ts = this._act = 0;
      } else {
        _wake();
        this._ts = this._rts;
        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
      }
    }
    return this;
  };
  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }
    return this._start;
  };
  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };
  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp;
    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };
  _proto.globalTime = function globalTime(rawTime) {
    var animation = this, time = arguments.length ? rawTime : animation.rawTime();
    while (animation) {
      time = animation._start + time / (animation._ts || 1);
      animation = animation._dp;
    }
    return time;
  };
  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }
    return this._repeat === -2 ? Infinity : this._repeat;
  };
  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;
      _onUpdateTotalDuration(this);
      return time ? this.time(time) : this;
    }
    return this._rDelay;
  };
  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }
    return this._yoyo;
  };
  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };
  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };
  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };
  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };
  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };
  _proto.resume = function resume() {
    return this.paused(false);
  };
  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
      return this;
    }
    return this._rts < 0;
  };
  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };
  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp, start = this._start, rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };
  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars2 = this.vars;
    if (arguments.length > 1) {
      if (!callback) {
        delete vars2[type];
      } else {
        vars2[type] = callback;
        params && (vars2[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }
      return this;
    }
    return vars2[type];
  };
  _proto.then = function then(onFulfilled) {
    var self2 = this;
    return new Promise(function(resolve2) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve2() {
        var _then = self2.then;
        self2.then = null;
        _isFunction(f) && (f = f(self2)) && (f.then || f === self2) && (self2.then = _then);
        resolve2(f);
        self2.then = _then;
      };
      if (self2._initted && self2.totalProgress() === 1 && self2._ts >= 0 || !self2._tTime && self2._ts < 0) {
        _resolve();
      } else {
        self2._prom = _resolve;
      }
    });
  };
  _proto.kill = function kill() {
    _interrupt(this);
  };
  return Animation2;
}();
_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
var Timeline = /* @__PURE__ */ function(_Animation) {
  _inheritsLoose(Timeline2, _Animation);
  function Timeline2(vars2, position) {
    var _this;
    if (vars2 === void 0) {
      vars2 = {};
    }
    _this = _Animation.call(this, vars2) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars2.smoothChildTiming;
    _this.autoRemoveChildren = !!vars2.autoRemoveChildren;
    _this._sort = _isNotFalse(vars2.sortChildren);
    _globalTimeline && _addToTimeline(vars2.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars2.reversed && _this.reverse();
    vars2.paused && _this.paused(true);
    vars2.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars2.scrollTrigger);
    return _this;
  }
  var _proto2 = Timeline2.prototype;
  _proto2.to = function to(targets, vars2, position) {
    _createTweenType(0, arguments, this);
    return this;
  };
  _proto2.from = function from(targets, vars2, position) {
    _createTweenType(1, arguments, this);
    return this;
  };
  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);
    return this;
  };
  _proto2.set = function set2(targets, vars2, position) {
    vars2.duration = 0;
    vars2.parent = this;
    _inheritDefaults(vars2).repeatDelay || (vars2.repeat = 0);
    vars2.immediateRender = !!vars2.immediateRender;
    new Tween(targets, vars2, _parsePosition(this, position), 1);
    return this;
  };
  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  };
  _proto2.staggerTo = function staggerTo(targets, duration, vars2, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars2.duration = duration;
    vars2.stagger = vars2.stagger || stagger;
    vars2.onComplete = onCompleteAll;
    vars2.onCompleteParams = onCompleteAllParams;
    vars2.parent = this;
    new Tween(targets, vars2, _parsePosition(this, position));
    return this;
  };
  _proto2.staggerFrom = function staggerFrom(targets, duration, vars2, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars2.runBackwards = 1;
    _inheritDefaults(vars2).immediateRender = _isNotFalse(vars2.immediateRender);
    return this.staggerTo(targets, duration, vars2, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }
      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;
      if (crossingStart) {
        dur || (prevTime = this._zTime);
        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }
      if (this._repeat) {
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration);
        if (tTime === tDur) {
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);
          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }
          time > dur && (time = dur);
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration);
        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime;
          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            return this;
          }
          dur = this._dur;
          tDur = this._tDur;
          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -1e-4;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }
          this._lock = 0;
          if (!this._ts && !prevPaused) {
            return this;
          }
          _propagateYoyoEase(this, isYoyo);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }
      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale;
      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0;
      }
      if (!prevTime && time && !suppressEvents) {
        _callback(this, "onStart");
        if (this._tTime !== tTime) {
          return this;
        }
      }
      if (time >= prevTime && totalTime >= 0) {
        child = this._first;
        while (child) {
          next = child._next;
          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
            if (time !== this._time || !this._ts && !prevPaused) {
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum);
              break;
            }
          }
          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time;
        while (child) {
          next = child._prev;
          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);
            if (time !== this._time || !this._ts && !prevPaused) {
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
              break;
            }
          }
          child = next;
        }
      }
      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
        if (this._ts) {
          this._start = prevStart;
          _setEnd(this);
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && tDur >= this.totalDuration() || !tTime && prevTime) {
        if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
          if (!this._lock) {
            (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
            if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
              _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
              this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
            }
          }
        }
      }
    }
    return this;
  };
  _proto2.add = function add2(child, position) {
    var _this2 = this;
    _isNumber(position) || (position = _parsePosition(this, position, child));
    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function(obj) {
          return _this2.add(obj, position);
        });
        return this;
      }
      if (_isString(child)) {
        return this.addLabel(child, position);
      }
      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }
    return this !== child ? _addToTimeline(this, child, position) : this;
  };
  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }
    if (tweens === void 0) {
      tweens = true;
    }
    if (timelines === void 0) {
      timelines = true;
    }
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum$1;
    }
    var a = [], child = this._first;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }
      child = child._next;
    }
    return a;
  };
  _proto2.getById = function getById2(id) {
    var animations = this.getChildren(1, 1, 1), i = animations.length;
    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };
  _proto2.remove = function remove2(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }
    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }
    _removeLinkedListItem(this, child);
    if (child === this._recent) {
      this._recent = this._last;
    }
    return _uncache(this);
  };
  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }
    this._forcing = 1;
    if (!this._dp && this._ts) {
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }
    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
    this._forcing = 0;
    return this;
  };
  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };
  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };
  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };
  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);
    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }
      child = child._next;
    }
  };
  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }
    return this;
  };
  _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
    var a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive), children;
    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }
      child = child._next;
    }
    return a;
  };
  _proto2.tweenTo = function tweenTo(position, vars2) {
    vars2 = vars2 || {};
    var tl = this, endTime = _parsePosition(tl, position), _vars = vars2, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl, _setDefaults({
      ease: vars2.ease || "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars2.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();
        if (!initted) {
          var duration = vars2.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          initted = 1;
        }
        _onStart && _onStart.apply(tween, onStartParams || []);
      }
    }, vars2));
    return immediateRender ? tween.render(0) : tween;
  };
  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars2) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars2));
  };
  _proto2.recent = function recent() {
    return this._recent;
  };
  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };
  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };
  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };
  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }
    var child = this._first, labels = this.labels, p2;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }
      child = child._next;
    }
    if (adjustLabels) {
      for (p2 in labels) {
        if (labels[p2] >= ignoreBeforeTime) {
          labels[p2] += amount;
        }
      }
    }
    return _uncache(this);
  };
  _proto2.invalidate = function invalidate() {
    var child = this._first;
    this._lock = 0;
    while (child) {
      child.invalidate();
      child = child._next;
    }
    return _Animation.prototype.invalidate.call(this);
  };
  _proto2.clear = function clear2(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }
    var child = this._first, next;
    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }
    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };
  _proto2.totalDuration = function totalDuration(value) {
    var max = 0, self2 = this, child = self2._last, prevStart = _bigNum$1, prev, start, parent;
    if (arguments.length) {
      return self2.timeScale((self2._repeat < 0 ? self2.duration() : self2.totalDuration()) / (self2.reversed() ? -value : value));
    }
    if (self2._dirty) {
      parent = self2.parent;
      while (child) {
        prev = child._prev;
        child._dirty && child.totalDuration();
        start = child._start;
        if (start > prevStart && self2._sort && child._ts && !self2._lock) {
          self2._lock = 1;
          _addToTimeline(self2, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }
        if (start < 0 && child._ts) {
          max -= start;
          if (!parent && !self2._dp || parent && parent.smoothChildTiming) {
            self2._start += start / self2._ts;
            self2._time -= start;
            self2._tTime -= start;
          }
          self2.shiftChildren(-start, false, -Infinity);
          prevStart = 0;
        }
        child._end > max && child._ts && (max = child._end);
        child = prev;
      }
      _setDuration(self2, self2 === _globalTimeline && self2._time > max ? self2._time : max, 1, 1);
      self2._dirty = 0;
    }
    return self2._tDur;
  };
  Timeline2.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
      _lastRenderedFrame = _ticker.frame;
    }
    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) {
        if (_config.autoSleep && _ticker._listeners.length < 2) {
          while (child && !child._ts) {
            child = child._next;
          }
          child || _ticker.sleep();
        }
      }
    }
  };
  return Timeline2;
}(Animation);
_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index2 = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
  pt.b = start;
  pt.e = end;
  start += "";
  end += "";
  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }
  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop);
    start = a[0];
    end = a[1];
  }
  startNums = start.match(_complexStringNumExp) || [];
  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index2, result.index);
    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }
    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0;
      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        s: startNum,
        c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index2 = _complexStringNumExp.lastIndex;
    }
  }
  pt.c = index2 < end.length ? end.substring(index2, end.length) : "";
  pt.fp = funcParam;
  if (_relExp.test(end) || hasRandom) {
    pt.e = 0;
  }
  this._pt = pt;
  return pt;
}, _addPropTween = function _addPropTween2(target, prop, start, end, index2, targets, modifier, stringFilter, funcParam) {
  _isFunction(end) && (end = end(index2 || 0, target, targets));
  var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt;
  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (end.charAt(1) === "=") {
      pt = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + (getUnit(parsedStart) || 0);
      if (pt || pt === 0) {
        end = pt;
      }
    }
  }
  if (parsedStart !== end) {
    if (!isNaN(parsedStart * end) && end !== "") {
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }
    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
}, _processVars = function _processVars2(vars2, index2, target, targets, tween) {
  _isFunction(vars2) && (vars2 = _parseFuncOrString(vars2, tween, index2, target, targets));
  if (!_isObject(vars2) || vars2.style && vars2.nodeType || _isArray(vars2) || _isTypedArray(vars2)) {
    return _isString(vars2) ? _parseFuncOrString(vars2, tween, index2, target, targets) : vars2;
  }
  var copy = {}, p2;
  for (p2 in vars2) {
    copy[p2] = _parseFuncOrString(vars2[p2], tween, index2, target, targets);
  }
  return copy;
}, _checkPlugin = function _checkPlugin2(property, vars2, tween, index2, target, targets) {
  var plugin, pt, ptLookup, i;
  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars2[property] : _processVars(vars2[property], index2, target, targets, tween), tween, index2, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
      i = plugin._props.length;
      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }
  return plugin;
}, _overwritingTween, _initTween = function _initTween2(tween, time) {
  var vars2 = tween.vars, ease = vars2.ease, startAt = vars2.startAt, immediateRender = vars2.immediateRender, lazy = vars2.lazy, onUpdate = vars2.onUpdate, onUpdateParams = vars2.onUpdateParams, callbackScope = vars2.callbackScope, runBackwards = vars2.runBackwards, yoyoEase = vars2.yoyoEase, keyframes = vars2.keyframes, autoRevert = vars2.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites, tl = tween.timeline, cleanVars, i, p2, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index2, harnessVars, overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
  if (yoyoEase && tween._yoyo && !tween._repeat) {
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }
  tween._from = !tl && !!vars2.runBackwards;
  if (!tl || keyframes && !vars2.stagger) {
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars2[harness.prop];
    cleanVars = _copyExcluding(vars2, _reservedProps);
    prevStartAt && _removeFromParent(prevStartAt.render(-1, true));
    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent,
        immediateRender: true,
        lazy: _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate,
        onUpdateParams,
        callbackScope,
        stagger: 0
      }, startAt)));
      time < 0 && !immediateRender && !autoRevert && tween._startAt.render(-1, true);
      if (immediateRender) {
        time > 0 && !autoRevert && (tween._startAt = 0);
        if (dur && time <= 0) {
          time && (tween._zTime = time);
          return;
        }
      } else if (autoRevert === false) {
        tween._startAt = 0;
      }
    } else if (runBackwards && dur) {
      if (prevStartAt) {
        !autoRevert && (tween._startAt = 0);
      } else {
        time && (immediateRender = false);
        p2 = _setDefaults({
          overwrite: false,
          data: "isFromStart",
          lazy: immediateRender && _isNotFalse(lazy),
          immediateRender,
          stagger: 0,
          parent
        }, cleanVars);
        harnessVars && (p2[harness.prop] = harnessVars);
        _removeFromParent(tween._startAt = Tween.set(targets, p2));
        time < 0 && tween._startAt.render(-1, true);
        tween._zTime = time;
        if (!immediateRender) {
          _initTween2(tween._startAt, _tinyNum);
        } else if (!time) {
          return;
        }
      }
    }
    tween._pt = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;
    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
      index2 = fullTargets === targets ? i : fullTargets.indexOf(target);
      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index2, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
        plugin._props.forEach(function(name) {
          ptLookup[name] = pt;
        });
        plugin.priority && (hasPriority = 1);
      }
      if (!harness || harnessVars) {
        for (p2 in cleanVars) {
          if (_plugins[p2] && (plugin = _checkPlugin(p2, cleanVars, tween, index2, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p2] = pt = _addPropTween.call(tween, target, p2, "get", cleanVars[p2], index2, fullTargets, 0, vars2.stringFilter);
          }
        }
      }
      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;
        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
        overwritten = !tween.parent;
        _overwritingTween = 0;
      }
      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }
    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween);
  }
  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten;
  keyframes && time <= 0 && tl.render(_bigNum$1, true, true);
}, _addAliasesToVars = function _addAliasesToVars2(targets, vars2) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p2, i, aliases;
  if (!propertyAliases) {
    return vars2;
  }
  copy = _merge({}, vars2);
  for (p2 in propertyAliases) {
    if (p2 in copy) {
      aliases = propertyAliases[p2].split(",");
      i = aliases.length;
      while (i--) {
        copy[aliases[i]] = copy[p2];
      }
    }
  }
  return copy;
}, _parseKeyframe = function _parseKeyframe2(prop, obj, allProps, easeEach) {
  var ease = obj.ease || easeEach || "power1.inOut", p2, a;
  if (_isArray(obj)) {
    a = allProps[prop] || (allProps[prop] = []);
    obj.forEach(function(value, i) {
      return a.push({
        t: i / (obj.length - 1) * 100,
        v: value,
        e: ease
      });
    });
  } else {
    for (p2 in obj) {
      a = allProps[p2] || (allProps[p2] = []);
      p2 === "ease" || a.push({
        t: parseFloat(prop),
        v: obj[p2],
        e: ease
      });
    }
  }
}, _parseFuncOrString = function _parseFuncOrString2(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
}, _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase", _staggerPropsToSkip = {};
_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
  return _staggerPropsToSkip[name] = 1;
});
var Tween = /* @__PURE__ */ function(_Animation2) {
  _inheritsLoose(Tween2, _Animation2);
  function Tween2(targets, vars2, position, skipInherit) {
    var _this3;
    if (typeof vars2 === "number") {
      position.duration = vars2;
      vars2 = position;
      position = null;
    }
    _this3 = _Animation2.call(this, skipInherit ? vars2 : _inheritDefaults(vars2)) || this;
    var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay2 = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults2 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars2.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars2) ? [targets] : toArray(targets), tl, i, copy, l, p2, curTarget, staggerFunc, staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = [];
    _this3._overwrite = overwrite;
    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay2)) {
      vars2 = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults2 || {}
      });
      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;
      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay2)) {
        l = parsedTargets.length;
        staggerFunc = stagger && distribute(stagger);
        if (_isObject(stagger)) {
          for (p2 in stagger) {
            if (~_staggerTweenProps.indexOf(p2)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p2] = stagger[p2];
            }
          }
        }
        for (i = 0; i < l; i++) {
          copy = _copyExcluding(vars2, _staggerPropsToSkip);
          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i];
          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay2, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
          if (!stagger && l === 1 && copy.delay) {
            _this3._delay = delay2 = copy.delay;
            _this3._start += delay2;
            copy.delay = 0;
          }
          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
          tl._ease = _easeMap.none;
        }
        tl.duration() ? duration = delay2 = 0 : _this3.timeline = 0;
      } else if (keyframes) {
        _inheritDefaults(_setDefaults(tl.vars.defaults, {
          ease: "none"
        }));
        tl._ease = _parseEase(keyframes.ease || vars2.ease || "none");
        var time = 0, a, kf, v;
        if (_isArray(keyframes)) {
          keyframes.forEach(function(frame) {
            return tl.to(parsedTargets, frame, ">");
          });
        } else {
          copy = {};
          for (p2 in keyframes) {
            p2 === "ease" || p2 === "easeEach" || _parseKeyframe(p2, keyframes[p2], copy, keyframes.easeEach);
          }
          for (p2 in copy) {
            a = copy[p2].sort(function(a2, b) {
              return a2.t - b.t;
            });
            time = 0;
            for (i = 0; i < a.length; i++) {
              kf = a[i];
              v = {
                ease: kf.e,
                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
              };
              v[p2] = kf.v;
              tl.to(parsedTargets, v, time);
              time += v.duration;
            }
          }
          tl.duration() < duration && tl.to({}, {
            duration: duration - tl.duration()
          });
        }
      }
      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0;
    }
    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);
      _globalTimeline.killTweensOf(parsedTargets);
      _overwritingTween = 0;
    }
    _addToTimeline(parent, _assertThisInitialized(_this3), position);
    vars2.reversed && _this3.reverse();
    vars2.paused && _this3.paused(true);
    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum;
      _this3.render(Math.max(0, -delay2));
    }
    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }
  var _proto3 = Tween2.prototype;
  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time, tDur = this._tDur, dur = this._dur, tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== totalTime < 0) {
      time = tTime;
      timeline2 = this.timeline;
      if (this._repeat) {
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration);
        if (tTime === tDur) {
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);
          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }
          time > dur && (time = dur);
        }
        isYoyo = this._yoyo && iteration & 1;
        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        if (time === prevTime && !force && this._initted) {
          return this;
        }
        if (iteration !== prevIteration) {
          timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
            this._lock = force = 1;
            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }
      if (!this._initted) {
        if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
          this._tTime = 0;
          return this;
        }
        if (dur !== this._dur) {
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._tTime = tTime;
      this._time = time;
      if (!this._act && this._ts) {
        this._act = 1;
        this._lazy = 0;
      }
      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }
      if (time && !prevTime && !suppressEvents) {
        _callback(this, "onStart");
        if (this._tTime !== tTime) {
          return this;
        }
      }
      pt = this._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      timeline2 && timeline2.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline2._dur * timeline2._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
      if (this._onUpdate && !suppressEvents) {
        totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force);
        _callback(this, "onUpdate");
      }
      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }
    return this;
  };
  _proto3.targets = function targets() {
    return this._targets;
  };
  _proto3.invalidate = function invalidate() {
    this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate();
    return _Animation2.prototype.invalidate.call(this);
  };
  _proto3.kill = function kill(targets, vars2) {
    if (vars2 === void 0) {
      vars2 = "all";
    }
    if (!targets && (!vars2 || vars2 === "all")) {
      this._lazy = this._pt = 0;
      return this.parent ? _interrupt(this) : this;
    }
    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars2, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
      return this;
    }
    var parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p2, pt, i;
    if ((!vars2 || vars2 === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars2 === "all" && (this._pt = 0);
      return _interrupt(this);
    }
    overwrittenProps = this._op = this._op || [];
    if (vars2 !== "all") {
      if (_isString(vars2)) {
        p2 = {};
        _forEachName(vars2, function(name) {
          return p2[name] = 1;
        });
        vars2 = p2;
      }
      vars2 = _addAliasesToVars(parsedTargets, vars2);
    }
    i = parsedTargets.length;
    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];
        if (vars2 === "all") {
          overwrittenProps[i] = vars2;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars2;
        }
        for (p2 in props) {
          pt = curLookup && curLookup[p2];
          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p2) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }
            delete curLookup[p2];
          }
          if (curOverwriteProps !== "all") {
            curOverwriteProps[p2] = 1;
          }
        }
      }
    }
    this._initted && !this._pt && firstPT && _interrupt(this);
    return this;
  };
  Tween2.to = function to(targets, vars2) {
    return new Tween2(targets, vars2, arguments[2]);
  };
  Tween2.from = function from(targets, vars2) {
    return _createTweenType(1, arguments);
  };
  Tween2.delayedCall = function delayedCall(delay2, callback, params, scope) {
    return new Tween2(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay2,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };
  Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };
  Tween2.set = function set2(targets, vars2) {
    vars2.duration = 0;
    vars2.repeatDelay || (vars2.repeat = 0);
    return new Tween2(targets, vars2);
  };
  Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };
  return Tween2;
}(Animation);
_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
_forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
  Tween[name] = function() {
    var tl = new Timeline(), params = _slice.call(arguments, 0);
    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
var _setterPlain = function _setterPlain2(target, property, value) {
  return target[property] = value;
}, _setterFunc = function _setterFunc2(target, property, value) {
  return target[property](value);
}, _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
  return target[property](data.fp, value);
}, _setterAttribute = function _setterAttribute2(target, property, value) {
  return target.setAttribute(property, value);
}, _getSetter = function _getSetter2(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
}, _renderPlain = function _renderPlain2(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
}, _renderBoolean = function _renderBoolean2(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
}, _renderComplexString = function _renderComplexString2(ratio, data) {
  var pt = data._pt, s = "";
  if (!ratio && data.b) {
    s = data.b;
  } else if (ratio === 1 && data.e) {
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s;
      pt = pt._next;
    }
    s += data.c;
  }
  data.set(data.t, data.p, s, data);
}, _renderPropTweens = function _renderPropTweens2(ratio, data) {
  var pt = data._pt;
  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
}, _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
  var pt = this._pt, next;
  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
}, _killPropTweensOf = function _killPropTweensOf2(property) {
  var pt = this._pt, hasNonDependentRemaining, next;
  while (pt) {
    next = pt._next;
    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }
    pt = next;
  }
  return !hasNonDependentRemaining;
}, _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
}, _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
  var pt = parent._pt, next, pt2, first, last;
  while (pt) {
    next = pt._next;
    pt2 = first;
    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }
    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }
    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }
    pt = next;
  }
  parent._pt = first;
};
var PropTween = /* @__PURE__ */ function() {
  function PropTween2(next, target, prop, start, change, renderer2, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer2 || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;
    if (next) {
      next._prev = this;
    }
  }
  var _proto4 = PropTween2.prototype;
  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set;
    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target;
    this.tween = tween;
  };
  return PropTween2;
}();
_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
  return _reservedProps[name] = 1;
});
_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args.forEach(function(config3) {
      return _createPlugin(config3);
    });
  },
  timeline: function timeline(vars2) {
    return new Timeline(vars2);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]);
    var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
    unit === "native" && (unit = "");
    return !target ? target : !property ? function(property2, unit2, uncache2) {
      return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);
    if (target.length > 1) {
      var setters = target.map(function(t) {
        return gsap.quickSetter(t, property, unit);
      }), l = setters.length;
      return function(value) {
        var i = l;
        while (i--) {
          setters[i](value);
        }
      };
    }
    target = target[0] || {};
    var Plugin = _plugins[property], cache = _getCache(target), p2 = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
      var p3 = new Plugin();
      _quickTween._pt = 0;
      p3.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p3.render(1, p3);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p2);
    return Plugin ? setter : function(value) {
      return setter(target, p2, unit ? value + unit : value, cache, 1);
    };
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config2(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults2 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function(pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });
    _effects[name] = function(targets, vars2, tl) {
      return effect(toArray(targets), _setDefaults(vars2 || {}, defaults2), tl);
    };
    if (extendTimeline) {
      Timeline.prototype[name] = function(targets, vars2, position) {
        return this.add(_effects[name](targets, _isObject(vars2) ? vars2 : (position = vars2) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars2, includeDelayedCalls) {
    if (vars2 === void 0) {
      vars2 = {};
    }
    var tl = new Timeline(vars2), child, next;
    tl.smoothChildTiming = _isNotFalse(vars2.smoothChildTiming);
    _globalTimeline.remove(tl);
    tl._dp = 0;
    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;
    while (child) {
      next = child._next;
      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }
      child = next;
    }
    _addToTimeline(_globalTimeline, tl, 0);
    return tl;
  },
  utils: {
    wrap,
    wrapYoyo,
    distribute,
    random,
    snap,
    normalize,
    getUnit,
    clamp,
    splitColor,
    toArray,
    selector,
    mapRange,
    pipe,
    unitize,
    interpolate,
    shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween,
    globals: _addGlobal,
    Tween,
    Timeline,
    Animation,
    getCache: _getCache,
    _removeLinkedListItem,
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};
_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
  return _gsap[name] = Tween[name];
});
_ticker.add(Timeline.updateRoot);
_quickTween = _gsap.to({}, {
  duration: 0
});
var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
  var pt = plugin._pt;
  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }
  return pt;
}, _addModifiers = function _addModifiers2(tween, modifiers) {
  var targets = tween._targets, p2, i, pt;
  for (p2 in modifiers) {
    i = targets.length;
    while (i--) {
      pt = tween._ptLookup[i][p2];
      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          pt = _getPluginPropTween(pt, p2);
        }
        pt && pt.modifier && pt.modifier(modifiers[p2], tween, targets[i], p2);
      }
    }
  }
}, _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
  return {
    name,
    rawVars: 1,
    init: function init4(target, vars2, tween) {
      tween._onInit = function(tween2) {
        var temp, p2;
        if (_isString(vars2)) {
          temp = {};
          _forEachName(vars2, function(name2) {
            return temp[name2] = 1;
          });
          vars2 = temp;
        }
        if (modifier) {
          temp = {};
          for (p2 in vars2) {
            temp[p2] = modifier(vars2[p2]);
          }
          vars2 = temp;
        }
        _addModifiers(tween2, vars2);
      };
    }
  };
};
var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars2, tween, index2, targets) {
    var p2, pt;
    for (p2 in vars2) {
      pt = this.add(target, "setAttribute", (target.getAttribute(p2) || 0) + "", vars2[p2], index2, targets, 0, 0, p2);
      pt && (pt.op = p2);
      this._props.push(p2);
    }
  }
}, {
  name: "endArray",
  init: function init2(target, value) {
    var i = value.length;
    while (i--) {
      this.add(target, i, target[i] || 0, value[i]);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
Tween.version = Timeline.version = gsap.version = "3.9.1";
_coreReady = 1;
_windowExists$1() && _wake();
_easeMap.Power0;
_easeMap.Power1;
_easeMap.Power2;
_easeMap.Power3;
_easeMap.Power4;
_easeMap.Linear;
_easeMap.Quad;
_easeMap.Cubic;
_easeMap.Quart;
_easeMap.Quint;
_easeMap.Strong;
_easeMap.Elastic;
_easeMap.Back;
_easeMap.SteppedEase;
_easeMap.Bounce;
_easeMap.Sine;
_easeMap.Expo;
_easeMap.Circ;
/*!
 * CSSPlugin 3.9.1
 * https://greensock.com
 *
 * Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var _win, _doc, _docElement, _pluginInitted, _tempDiv, _recentSetterPlugin, _windowExists2 = function _windowExists3() {
  return typeof window !== "undefined";
}, _transformProps = {}, _RAD2DEG = 180 / Math.PI, _DEG2RAD = Math.PI / 180, _atan2 = Math.atan2, _bigNum = 1e8, _capsExp = /([A-Z])/g, _horizontalExp = /(?:left|right|width|margin|padding|x)/i, _complexExp = /[\s,\(]\S/, _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, _renderCSSProp = function _renderCSSProp2(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
}, _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
}, _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
}, _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
}, _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
}, _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
}, _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
  return target.style[property] = value;
}, _setterCSSProp = function _setterCSSProp2(target, property, value) {
  return target.style.setProperty(property, value);
}, _setterTransform = function _setterTransform2(target, property, value) {
  return target._gsap[property] = value;
}, _setterScale = function _setterScale2(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
}, _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
}, _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
}, _transformProp = "transform", _transformOriginProp = _transformProp + "Origin", _supports3D, _createElement = function _createElement2(type, ns) {
  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type);
  return e.style ? e : _doc.createElement(type);
}, _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
}, _prefixes = "O,Moz,ms,Ms,Webkit".split(","), _checkPropPrefix = function _checkPropPrefix2(property, element, preferPrefix) {
  var e = element || _tempDiv, s = e.style, i = 5;
  if (property in s && !preferPrefix) {
    return property;
  }
  property = property.charAt(0).toUpperCase() + property.substr(1);
  while (i-- && !(_prefixes[i] + property in s)) {
  }
  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
}, _initCore = function _initCore2() {
  if (_windowExists2() && window.document) {
    _win = window;
    _doc = _win.document;
    _docElement = _doc.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _transformProp + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
    _supports3D = !!_checkPropPrefix("perspective");
    _pluginInitted = 1;
  }
}, _getBBoxHack = function _getBBoxHack2(swapIfPossible) {
  var svg2 = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), oldParent = this.parentNode, oldSibling = this.nextSibling, oldCSS = this.style.cssText, bbox;
  _docElement.appendChild(svg2);
  svg2.appendChild(this);
  this.style.display = "block";
  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox;
      this.getBBox = _getBBoxHack2;
    } catch (e) {
    }
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }
  if (oldParent) {
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
  }
  _docElement.removeChild(svg2);
  this.style.cssText = oldCSS;
  return bbox;
}, _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
  var i = attributesArray.length;
  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
}, _getBBox = function _getBBox2(target) {
  var bounds;
  try {
    bounds = target.getBBox();
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  }
  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true));
  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
}, _isSVG = function _isSVG2(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
}, _removeProperty = function _removeProperty2(target, property) {
  if (property) {
    var style = target.style;
    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp;
    }
    if (style.removeProperty) {
      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
        property = "-" + property;
      }
      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      style.removeAttribute(property);
    }
  }
}, _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;
  plugin._props.push(property);
  return pt;
}, _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
}, _convertToUnit = function _convertToUnit2(target, property, value, unit) {
  var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache, isSVG;
  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }
  curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);
  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
  }
  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }
  if (!parent || parent === _doc || !parent.appendChild) {
    parent = _doc.body;
  }
  cache = parent._gsap;
  if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time) {
    return _round(curValue / cache.width * amount);
  } else {
    (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
    parent === target && (style.position = "static");
    parent.appendChild(_tempDiv);
    px = _tempDiv[measureProperty];
    parent.removeChild(_tempDiv);
    style.position = "absolute";
    if (horizontal && toPercent) {
      cache = _getCache(parent);
      cache.time = _ticker.time;
      cache.width = parent[measureProperty];
    }
  }
  return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
}, _get = function _get2(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore();
  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];
    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }
  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];
    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
    }
  }
  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
}, _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
  if (!start || start === "none") {
    var p2 = _checkPropPrefix(prop, target, 1), s = p2 && _getComputedProperty(target, p2, 1);
    if (s && s !== start) {
      prop = p2;
      start = s;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor");
    }
  }
  var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index2 = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, relative, endValues;
  pt.b = start;
  pt.e = end;
  start += "";
  end += "";
  if (end === "auto") {
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    target.style[prop] = start;
  }
  a = [start, end];
  _colorStringFilter(a);
  start = a[0];
  end = a[1];
  startValues = start.match(_numWithUnitExp) || [];
  endValues = end.match(_numWithUnitExp) || [];
  if (endValues.length) {
    while (result = _numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index2, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }
      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;
        if (relative) {
          endValue = endValue.substr(2);
        }
        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index2 = _numWithUnitExp.lastIndex - endUnit.length;
        if (!endUnit) {
          endUnit = endUnit || _config.units[prop] || startUnit;
          if (index2 === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }
        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        }
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          s: startNum,
          c: relative ? relative * endNum : endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }
    pt.c = index2 < end.length ? end.substring(index2, end.length) : "";
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }
  _relExp.test(end) && (pt.e = 0);
  this._pt = pt;
  return pt;
}, _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
  var split = value.split(" "), x = split[0], y = split[1] || "50%";
  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    value = x;
    x = y;
    y = value;
  }
  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
}, _renderClearProps = function _renderClearProps2(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t, style = target.style, props = data.u, cache = target._gsap, prop, clearTransforms, i;
    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;
      while (--i > -1) {
        prop = props[i];
        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }
        _removeProperty(target, prop);
      }
    }
    if (clearTransforms) {
      _removeProperty(target, _transformProp);
      if (cache) {
        cache.svg && target.removeAttribute("transform");
        _parseTransform(target, 1);
        cache.uncache = 1;
      }
    }
  }
}, _specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;
      plugin._props.push(property);
      return 1;
    }
  }
}, _identity2DMatrix = [1, 0, 0, 1, 0, 0], _rotationalProperties = {}, _isNullTransform = function _isNullTransform2(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
}, _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
  var matrixString = _getComputedProperty(target, _transformProp);
  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
}, _getMatrix = function _getMatrix2(target, force2D) {
  var cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix;
    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;
    if (!parent || !target.offsetParent) {
      addedToDOM = 1;
      nextSibling = target.nextSibling;
      _docElement.appendChild(target);
    }
    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");
    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }
  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
}, _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }
  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }
  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px";
  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }
  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
}, _parseTransform = function _parseTransform2(target, uncache) {
  var cache = target._gsap || new GSCache(target);
  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }
  var style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", origin = _getComputedProperty(target, _transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  matrix = _getMatrix(target, cache.svg);
  if (cache.svg) {
    t1 = (!cache.uncache || origin === "0px 0px") && !uncache && target.getAttribute("data-svg-origin");
    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }
  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;
  if (matrix !== _identity2DMatrix) {
    a = matrix[0];
    b = matrix[1];
    c = matrix[2];
    d = matrix[3];
    x = a12 = matrix[4];
    y = a22 = matrix[5];
    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      }
    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      }
      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      }
      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }
      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }
      scaleX = _round(Math.sqrt(a * a + b * b + c * c));
      scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }
    if (cache.svg) {
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }
  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }
  cache.x = x - ((cache.xPercent = x && (cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y - ((cache.yPercent = y && (cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z + px;
  cache.scaleX = _round(scaleX);
  cache.scaleY = _round(scaleY);
  cache.rotation = _round(rotation) + deg;
  cache.rotationX = _round(rotationX) + deg;
  cache.rotationY = _round(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;
  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }
  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
}, _firstTwoOnly = function _firstTwoOnly2(value) {
  return (value = value.split(" "))[0] + " " + value[1];
}, _addPxTranslate = function _addPxTranslate2(target, start, value) {
  var unit = getUnit(start);
  return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
}, _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;
  _renderCSSTransforms(ratio, cache);
}, _zeroDeg = "0deg", _zeroPx = "0px", _endParenthesis = ") ", _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache) {
  var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }
  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }
  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }
  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }
  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }
  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }
  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }
  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }
  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }
  target.style[_transformProp] = transforms || "translate(0, 0)";
}, _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache) {
  var _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp;
  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);
  if (skewY) {
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }
  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;
    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;
      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }
    a11 = _round(a11);
    a21 = _round(a21);
    a12 = _round(a12);
    a22 = _round(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }
  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }
  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }
  if (xPercent || yPercent) {
    temp = target.getBBox();
    tx = _round(tx + xPercent / 100 * temp.width);
    ty = _round(ty + yPercent / 100 * temp.height);
  }
  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp] = temp);
}, _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue, relative) {
  var cap = 360, isString2 = _isString(endValue), endNum = parseFloat(endValue) * (isString2 && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = relative ? endNum * relative : endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
  if (isString2) {
    direction = endValue.split("_")[1];
    if (direction === "short") {
      change %= cap;
      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }
    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
    }
  }
  plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";
  plugin._props.push(property);
  return pt;
}, _assign = function _assign2(target, source) {
  for (var p2 in source) {
    target[p2] = source[p2];
  }
  return target;
}, _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
  var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p2, startValue, endValue, startNum, endNum, startUnit, endUnit;
  if (startCache.svg) {
    startValue = target.getAttribute("transform");
    target.setAttribute("transform", "");
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);
    _removeProperty(target, _transformProp);
    target.setAttribute("transform", startValue);
  } else {
    startValue = getComputedStyle(target)[_transformProp];
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);
    style[_transformProp] = startValue;
  }
  for (p2 in _transformProps) {
    startValue = startCache[p2];
    endValue = endCache[p2];
    if (startValue !== endValue && exclude.indexOf(p2) < 0) {
      startUnit = getUnit(startValue);
      endUnit = getUnit(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p2, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new PropTween(plugin._pt, endCache, p2, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;
      plugin._props.push(p2);
    }
  }
  _assign(endCache, startCache);
};
_forEachName("padding,margin,Width,Radius", function(name, index2) {
  var t = "Top", r2 = "Right", b = "Bottom", l = "Left", props = (index2 < 3 ? [t, r2, b, l] : [t + l, t + r2, b + r2, b + l]).map(function(side) {
    return index2 < 2 ? name + side : "border" + side + name;
  });
  _specialProps[index2 > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
    var a, vars2;
    if (arguments.length < 4) {
      a = props.map(function(prop) {
        return _get(plugin, prop, property);
      });
      vars2 = a.join(" ");
      return vars2.split(a[0]).length === 5 ? a[0] : vars2;
    }
    a = (endValue + "").split(" ");
    vars2 = {};
    props.forEach(function(prop, i) {
      return vars2[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars2, tween);
  };
});
var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init3(target, vars2, tween, index2, targets) {
    var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p2, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority;
    _pluginInitted || _initCore();
    for (p2 in vars2) {
      if (p2 === "autoRound") {
        continue;
      }
      endValue = vars2[p2];
      if (_plugins[p2] && _checkPlugin(p2, vars2, tween, index2, target, targets)) {
        continue;
      }
      type = typeof endValue;
      specialProp = _specialProps[p2];
      if (type === "function") {
        endValue = endValue.call(tween, index2, target, targets);
        type = typeof endValue;
      }
      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = _replaceRandom(endValue);
      }
      if (specialProp) {
        specialProp(this, target, p2, endValue, tween) && (hasPriority = 1);
      } else if (p2.substr(0, 2) === "--") {
        startValue = (getComputedStyle(target).getPropertyValue(p2) + "").trim();
        endValue += "";
        _colorExp.lastIndex = 0;
        if (!_colorExp.test(startValue)) {
          startUnit = getUnit(startValue);
          endUnit = getUnit(endValue);
        }
        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p2, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index2, targets, 0, 0, p2);
        props.push(p2);
      } else if (type !== "undefined") {
        if (startAt && p2 in startAt) {
          startValue = typeof startAt[p2] === "function" ? startAt[p2].call(tween, index2, target, targets) : startAt[p2];
          _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
          getUnit(startValue + "") || (startValue += _config.units[p2] || getUnit(_get(target, p2)) || "");
          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p2));
        } else {
          startValue = _get(target, p2);
        }
        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);
        if (p2 in _propertyAliases) {
          if (p2 === "autoAlpha") {
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              startNum = 0;
            }
            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }
          if (p2 !== "scale" && p2 !== "transform") {
            p2 = _propertyAliases[p2];
            ~p2.indexOf(",") && (p2 = p2.split(",")[0]);
          }
        }
        isTransformRelated = p2 in _transformProps;
        if (isTransformRelated) {
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars2.parseTransform || _parseTransform(target, vars2.parseTransform);
            smooth = vars2.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
            transformPropTween.dep = 1;
          }
          if (p2 === "scale") {
            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? relative * endNum : endNum - cache.scaleY) || 0);
            props.push("scaleY", p2);
            p2 += "X";
          } else if (p2 === "transformOrigin") {
            endValue = _convertKeywordsToPercentages(endValue);
            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0;
              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
              _addNonTweeningPT(this, style, p2, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }
            continue;
          } else if (p2 === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);
            continue;
          } else if (p2 in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p2, startNum, endValue, relative);
            continue;
          } else if (p2 === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
            continue;
          } else if (p2 === "force3D") {
            cache[p2] = endValue;
            continue;
          } else if (p2 === "transform") {
            _addRawTransformPTs(this, endValue, target);
            continue;
          }
        } else if (!(p2 in style)) {
          p2 = _checkPropPrefix(p2) || p2;
        }
        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p2 in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0);
          endUnit = getUnit(endValue) || (p2 in _config.units ? _config.units[p2] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p2, startValue, endUnit));
          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p2, startNum, relative ? relative * endNum : endNum - startNum, !isTransformRelated && (endUnit === "px" || p2 === "zIndex") && vars2.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;
          if (startUnit !== endUnit && endUnit !== "%") {
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p2 in style)) {
          if (p2 in target) {
            this.add(target, p2, startValue || target[p2], endValue, index2, targets);
          } else {
            _missingPlugin(p2, endValue);
            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p2, startValue, endValue);
        }
        props.push(p2);
      }
    }
    hasPriority && _sortPropTweensByPriority(this);
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    var p2 = _propertyAliases[property];
    p2 && p2.indexOf(",") < 0 && (property = p2);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
  },
  core: {
    _removeProperty,
    _getMatrix
  }
};
gsap.utils.checkPrefix = _checkPropPrefix;
(function(positionAndScale, rotation, others, aliases) {
  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
    _transformProps[name] = 1;
  });
  _forEachName(rotation, function(name) {
    _config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });
  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
  _forEachName(aliases, function(name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
  _config.units[name] = "px";
});
gsap.registerPlugin(CSSPlugin);
var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
gsapWithCSS.core.Tween;
var Articles_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-35848078"), n = n(), popScopeId(), n);
const _hoisted_1$a = { class: "article-wrapper" };
const _hoisted_2$6 = { class: "article-box" };
const _hoisted_3$4 = { class: "article" };
const _hoisted_4$2 = {
  key: 0,
  class: "poster-wrapper"
};
const _hoisted_5$1 = ["href"];
const _hoisted_6 = {
  key: 0,
  class: "category"
};
const _hoisted_7 = {
  key: 1,
  class: "article-info"
};
const _hoisted_8 = { class: "article-title" };
const _hoisted_9 = ["href"];
const _hoisted_10 = { class: "article-con" };
const _hoisted_11 = { class: "article-desc" };
const _hoisted_12 = {
  key: 0,
  class: "article-tags"
};
const _hoisted_13 = { class: "tag" };
const _hoisted_14 = { class: "article-meta" };
const _hoisted_15 = { class: "date" };
const _hoisted_16 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("i", { class: "iconfont icon-rili1" }, null, -1));
const _hoisted_17 = { class: "author" };
const _hoisted_18 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("i", { class: "iconfont icon-zuozhe" }, null, -1));
const _hoisted_19 = ["href"];
const _hoisted_20 = { class: "words" };
const _hoisted_21 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("i", { class: "iconfont icon-tongji" }, null, -1));
const _hoisted_22 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "read" }, [
  /* @__PURE__ */ createTextVNode("\u9605\u8BFB\u5168\u6587 "),
  /* @__PURE__ */ createBaseVNode("i", { class: "iconfont icon-you" })
], -1));
const _sfc_main$c = {
  setup(__props) {
    const handlerStagger = () => {
      var ob = new IntersectionObserver((entries, self2) => {
        let targets = entries.map((entry) => {
          if (entry.isIntersecting) {
            self2.unobserve(entry.target);
            return entry.target;
          }
        }).filter((v) => v);
        if (gsapWithCSS) {
          gsapWithCSS.to(targets, {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "Back.easeOut"
          });
        }
      });
      document.querySelectorAll(".article-box").forEach((box) => {
        ob.observe(box);
      });
      __vitePreload(() => import("./vanilla-tilt.es2015.1c41004c.js"), true ? [] : void 0).then((res) => {
        res.default.init(document.querySelectorAll(".article"), {
          max: 5
        });
      });
    };
    onMounted(() => {
      handlerStagger();
    });
    const posts = { "power": "artiely", "posts": [{ "text": "artiely", "link": "/posts/2020-3-16-vscode-plugin", "frontmatter": { "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528", "data": "2020-12-29T00:00:00.000Z", "summary": "VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026!## \u56FE\u7247\u9884\u89C8> \u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002!## \u5F69\u8679\u7F29\u8FDB> \u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C ...", "description": "VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026!## \u56FE\u7247\u9884\u89C8> \u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002!## \u5F69\u8679\u7F29\u8FDB> \u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C ...", "author": "artiely", "primary": "25262d", "readTime": "6 min read", "words": 1057, "group": 1, "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033.png", "secondary": "dad9d2", "tag": [], "date": "2022-02-07", "password": false, "base64": "fafafa", "text": "6 min read" }, "id": "52466bbc-e8e7-4daf-9359-19219d85b52d" }, { "text": "artiely", "link": "/posts/2021/2020-3-16-chrome-plugin", "frontmatter": { "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC", "data": "2020-12-29T00:00:00.000Z", "summary": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002!\u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84!!\u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49!## \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B ...", "description": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002!\u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84!!\u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49!## \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B ...", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120320.png", "author": "artiely", "primary": "f4f6f6", "secondary": "0b0909", "readTime": "5 min read", "words": 914, "tag": [], "date": "2022-02-07", "password": false, "base64": "fafafa", "text": "5 min read" }, "id": "4bef4363-62c5-43d1-a9d5-034e7e399a8d" }, { "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1934, "password": false, "base64": "fafafa", "text": "10 min read" }, "id": "988fb233-5c0f-4909-a9fd-69851b29d0b9" }, { "text": "artiely", "link": "/posts/2021-2-23-proxy", "frontmatter": { "title": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3proxy", "tag": ["proxy"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20210223114632.png", "base64": "f0df3d", "author": "artiely", "date": "2021-02-23", "data": "2021-2-23", "summary": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "description": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "primary": "ebdb5b", "secondary": "1424a4", "readTime": "13 min read", "words": 2770, "password": false, "text": "14 min read" }, "id": "f544b67e-87c2-4779-958a-238088e7fb8b" }, { "text": "artiely", "link": "/posts/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": ["electron", "javascrip"], "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "data": "2020-3-18", "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "description": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "readTime": "2 min read", "words": 404, "password": false, "text": "3 min read" }, "id": "d9679b91-5b4c-4791-8cd0-cf9e85ee434f" }, { "text": "artiely", "link": "/posts/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": ["windows"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "data": "2020-3-16", "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "description": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "author": "artiely", "readTime": "1 min read", "words": 178, "password": false, "text": "1 min read" }, "id": "c4f4bfa5-b06f-4ea0-b91f-10dd4010dbef" }], "tags": [{ "tag": "\u6653\u9732", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1934, "password": false, "base64": "fafafa", "text": "10 min read" }, "id": "988fb233-5c0f-4909-a9fd-69851b29d0b9" }] }, { "tag": "\u5BDD\u5B89", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1934, "password": false, "base64": "fafafa", "text": "10 min read" }, "id": "988fb233-5c0f-4909-a9fd-69851b29d0b9" }] }, { "tag": "\u5178\u7C4D", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1934, "password": false, "base64": "fafafa", "text": "10 min read" }, "id": "988fb233-5c0f-4909-a9fd-69851b29d0b9" }] }, { "tag": "\u6D45\u4E91", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1934, "password": false, "base64": "fafafa", "text": "10 min read" }, "id": "988fb233-5c0f-4909-a9fd-69851b29d0b9" }] }, { "tag": "\u900D\u9065", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1934, "password": false, "base64": "fafafa", "text": "10 min read" }, "id": "988fb233-5c0f-4909-a9fd-69851b29d0b9" }] }, { "tag": "\u79CB\u534A", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1934, "password": false, "base64": "fafafa", "text": "10 min read" }, "id": "988fb233-5c0f-4909-a9fd-69851b29d0b9" }] }, { "tag": "proxy", "posts": [{ "text": "artiely", "link": "/posts/2021-2-23-proxy", "frontmatter": { "title": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3proxy", "tag": ["proxy"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20210223114632.png", "base64": "f0df3d", "author": "artiely", "date": "2021-02-23", "data": "2021-2-23", "summary": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "description": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "primary": "ebdb5b", "secondary": "1424a4", "readTime": "13 min read", "words": 2770, "password": false, "text": "14 min read" }, "id": "f544b67e-87c2-4779-958a-238088e7fb8b" }] }, { "tag": "electron", "posts": [{ "text": "artiely", "link": "/posts/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": ["electron", "javascrip"], "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "data": "2020-3-18", "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "description": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "readTime": "2 min read", "words": 404, "password": false, "text": "3 min read" }, "id": "d9679b91-5b4c-4791-8cd0-cf9e85ee434f" }] }, { "tag": "javascrip", "posts": [{ "text": "artiely", "link": "/posts/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": ["electron", "javascrip"], "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "data": "2020-3-18", "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "description": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "readTime": "2 min read", "words": 404, "password": false, "text": "3 min read" }, "id": "d9679b91-5b4c-4791-8cd0-cf9e85ee434f" }] }, { "tag": "windows", "posts": [{ "text": "artiely", "link": "/posts/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": ["windows"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "data": "2020-3-16", "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "description": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "author": "artiely", "readTime": "1 min read", "words": 178, "password": false, "text": "1 min read" }, "id": "c4f4bfa5-b06f-4ea0-b91f-10dd4010dbef" }] }], "timeline": [{ "date": "2022-02-07", "posts": [{ "text": "artiely", "link": "/posts/2020-3-16-vscode-plugin", "frontmatter": { "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528", "data": "2020-12-29T00:00:00.000Z", "summary": "VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026!## \u56FE\u7247\u9884\u89C8> \u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002!## \u5F69\u8679\u7F29\u8FDB> \u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C ...", "description": "VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026!## \u56FE\u7247\u9884\u89C8> \u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002!## \u5F69\u8679\u7F29\u8FDB> \u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C ...", "author": "artiely", "primary": "25262d", "readTime": "6 min read", "words": 1057, "group": 1, "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033.png", "secondary": "dad9d2", "tag": [], "date": "2022-02-07", "password": false, "base64": "fafafa", "text": "6 min read" }, "id": "52466bbc-e8e7-4daf-9359-19219d85b52d" }, { "text": "artiely", "link": "/posts/2021/2020-3-16-chrome-plugin", "frontmatter": { "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC", "data": "2020-12-29T00:00:00.000Z", "summary": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002!\u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84!!\u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49!## \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B ...", "description": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002!\u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84!!\u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49!## \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B ...", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120320.png", "author": "artiely", "primary": "f4f6f6", "secondary": "0b0909", "readTime": "5 min read", "words": 914, "tag": [], "date": "2022-02-07", "password": false, "base64": "fafafa", "text": "5 min read" }, "id": "4bef4363-62c5-43d1-a9d5-034e7e399a8d" }] }, { "date": "2022-01-19", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1934, "password": false, "base64": "fafafa", "text": "10 min read" }, "id": "988fb233-5c0f-4909-a9fd-69851b29d0b9" }] }, { "date": "2021-02-23", "posts": [{ "text": "artiely", "link": "/posts/2021-2-23-proxy", "frontmatter": { "title": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3proxy", "tag": ["proxy"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20210223114632.png", "base64": "f0df3d", "author": "artiely", "date": "2021-02-23", "data": "2021-2-23", "summary": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "description": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "primary": "ebdb5b", "secondary": "1424a4", "readTime": "13 min read", "words": 2770, "password": false, "text": "14 min read" }, "id": "f544b67e-87c2-4779-958a-238088e7fb8b" }] }, { "date": "2020-03-18", "posts": [{ "text": "artiely", "link": "/posts/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": ["electron", "javascrip"], "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "data": "2020-3-18", "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "description": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "readTime": "2 min read", "words": 404, "password": false, "text": "3 min read" }, "id": "d9679b91-5b4c-4791-8cd0-cf9e85ee434f" }] }, { "date": "2020-03-16", "posts": [{ "text": "artiely", "link": "/posts/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": ["windows"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "data": "2020-3-16", "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "description": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "author": "artiely", "readTime": "1 min read", "words": 178, "password": false, "text": "1 min read" }, "id": "c4f4bfa5-b06f-4ea0-b91f-10dd4010dbef" }] }] }.posts;
    const link = (link2) => `${link2}.html`;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(posts), (item) => {
          return openBlock(), createElementBlock("div", _hoisted_2$6, [
            createBaseVNode("article", _hoisted_3$4, [
              item.frontmatter ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
                createBaseVNode("a", {
                  href: link(item.link)
                }, [
                  item.frontmatter.category ? (openBlock(), createElementBlock("div", _hoisted_6, [
                    createBaseVNode("span", {
                      class: "category-inner",
                      style: normalizeStyle({
                        backgroundColor: unref(hexToRgba)(`#${item.frontmatter.secondary}`, 0.6),
                        color: `#${item.frontmatter.primary}`
                      })
                    }, toDisplayString(item.frontmatter.category), 5)
                  ])) : createCommentVNode("", true),
                  createVNode(Cover, { item }, null, 8, ["item"])
                ], 8, _hoisted_5$1)
              ])) : createCommentVNode("", true),
              item.frontmatter ? (openBlock(), createElementBlock("div", _hoisted_7, [
                createBaseVNode("h1", _hoisted_8, [
                  createBaseVNode("a", {
                    href: link(item.link)
                  }, toDisplayString(item.frontmatter.title), 9, _hoisted_9)
                ]),
                createBaseVNode("div", _hoisted_10, [
                  createBaseVNode("p", _hoisted_11, toDisplayString(item.frontmatter.summary), 1)
                ]),
                item.frontmatter.tag ? (openBlock(), createElementBlock("div", _hoisted_12, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.frontmatter.tag.slice(0, 3), (tag) => {
                    return openBlock(), createElementBlock("span", _hoisted_13, "#" + toDisplayString(tag), 1);
                  }), 256))
                ])) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("span", _hoisted_15, [
                    _hoisted_16,
                    createTextVNode(" " + toDisplayString(unref(dayjs)(item.frontmatter.date).format("YYYY/MM/DD")), 1)
                  ]),
                  createBaseVNode("span", _hoisted_17, [
                    _hoisted_18,
                    createTextVNode(" " + toDisplayString(item.frontmatter.author), 1)
                  ])
                ]),
                createBaseVNode("a", {
                  class: "more",
                  href: link(item.link)
                }, [
                  createBaseVNode("span", _hoisted_20, [
                    _hoisted_21,
                    createTextVNode(" " + toDisplayString(item.frontmatter.words) + " words /" + toDisplayString(item.frontmatter.readTime), 1)
                  ]),
                  _hoisted_22
                ], 8, _hoisted_19)
              ])) : createCommentVNode("", true)
            ])
          ]);
        }), 256))
      ]);
    };
  }
};
var Articles = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-35848078"]]);
const _sfc_main$b = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Articles);
    };
  }
};
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
const isClient = typeof window !== "undefined";
const isString = (val) => typeof val === "string";
const noop = () => {
};
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$9.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$9.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchWithFilter(source, cb, options = {}) {
  const _a2 = options, {
    eventFilter = bypassFilter
  } = _a2, watchOptions = __objRest$5(_a2, [
    "eventFilter"
  ]);
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
const defaultWindow = isClient ? window : void 0;
isClient ? window.document : void 0;
isClient ? window.navigator : void 0;
isClient ? window.location : void 0;
function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop;
  let cleanup = noop;
  const stopWatch = watch(() => unref(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
const _global = typeof globalThis === "undefined" ? void 0 : globalThis;
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
const handlers = _global[globalKey];
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : Array.isArray(rawInit) ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  }
};
function useStorage(key, initialValue, storage, options = {}) {
  var _a2;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const rawInit = unref(initialValue);
  const type = guessSerializerType(rawInit);
  const data = (shallow ? shallowRef : ref)(initialValue);
  const serializer = (_a2 = options.serializer) != null ? _a2 : StorageSerializers[type];
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a22;
        return (_a22 = defaultWindow) == null ? void 0 : _a22.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    if (!storage || event && event.key !== key)
      return;
    try {
      const rawValue = event ? event.newValue : storage.getItem(key);
      if (rawValue == null) {
        data.value = rawInit;
        if (writeDefaults && rawInit !== null)
          storage.setItem(key, serializer.write(rawInit));
      } else if (typeof rawValue !== "string") {
        data.value = rawValue;
      } else {
        data.value = serializer.read(rawValue);
      }
    } catch (e) {
      onError(e);
    }
  }
  read();
  if (window2 && listenToStorageChanges)
    useEventListener(window2, "storage", (e) => setTimeout(() => read(e), 0));
  if (storage) {
    watchWithFilter(data, () => {
      try {
        if (data.value == null)
          storage.removeItem(key);
        else
          storage.setItem(key, serializer.write(data.value));
      } catch (e) {
        onError(e);
      }
    }, {
      flush,
      deep,
      eventFilter
    });
  }
  return data;
}
function useLocalStorage(key, initialValue, options = {}) {
  const { window: window2 = defaultWindow } = options;
  return useStorage(key, initialValue, window2 == null ? void 0 : window2.localStorage, options);
}
var _a, _b;
isClient && (window == null ? void 0 : window.navigator) && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.platform) && /iP(ad|hone|od)/.test((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.platform);
var __defProp$3 = Object.defineProperty;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
const initialRect = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 0,
  width: 0
};
__spreadValues$3({
  text: ""
}, initialRect);
var ThemeMeta_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$9 = { class: "theme-box" };
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode("div", { class: "trigger" }, " \u4E3B\u9898 ", -1);
const _sfc_main$a = {
  setup(__props) {
    const theme = ref("");
    const themeData2 = useLocalStorage("theme", theme);
    onMounted(() => {
      document.querySelector("html").classList = themeData2.value;
    });
    const handleTheme = (_theme) => {
      theme.value = _theme;
      document.querySelector("html").classList = _theme;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        createBaseVNode("span", {
          class: normalizeClass(["theme-btn", theme.value == "" ? "active" : ""]),
          onClick: _cache[0] || (_cache[0] = ($event) => handleTheme(""))
        }, "\u6653\u9732", 2),
        createBaseVNode("span", {
          class: normalizeClass(["theme-btn", theme.value == "dark" ? "active" : ""]),
          onClick: _cache[1] || (_cache[1] = ($event) => handleTheme("dark"))
        }, "\u5BDD\u5B89", 2),
        createBaseVNode("span", {
          class: normalizeClass(["theme-btn", theme.value == "theme1" ? "active" : ""]),
          onClick: _cache[2] || (_cache[2] = ($event) => handleTheme("theme1"))
        }, "\u5178\u7C4D", 2),
        createBaseVNode("span", {
          class: normalizeClass(["theme-btn", theme.value == "theme2" ? "active" : ""]),
          onClick: _cache[3] || (_cache[3] = ($event) => handleTheme("theme2"))
        }, "\u6D45\u4E91", 2),
        createBaseVNode("span", {
          class: normalizeClass(["theme-btn", theme.value == "theme3" ? "active" : ""]),
          onClick: _cache[4] || (_cache[4] = ($event) => handleTheme("theme3"))
        }, "\u900D\u9065", 2),
        createBaseVNode("span", {
          class: normalizeClass(["theme-btn", theme.value == "theme4" ? "active" : ""]),
          onClick: _cache[5] || (_cache[5] = ($event) => handleTheme("theme4"))
        }, "\u79CB\u534A", 2),
        createBaseVNode("span", {
          class: normalizeClass(["theme-btn", theme.value == "theme5" ? "active" : ""]),
          onClick: _cache[6] || (_cache[6] = ($event) => handleTheme("theme5"))
        }, "\u5341\u6F3E", 2),
        createBaseVNode("span", {
          class: normalizeClass(["theme-btn", theme.value == "theme6" ? "active" : ""]),
          onClick: _cache[7] || (_cache[7] = ($event) => handleTheme("theme6"))
        }, "\u7EFF\u8336", 2),
        createBaseVNode("span", {
          class: normalizeClass(["theme-btn", theme.value == "theme7" ? "active" : ""]),
          onClick: _cache[8] || (_cache[8] = ($event) => handleTheme("theme7"))
        }, "\u7B14\u8BB0", 2),
        createBaseVNode("span", {
          class: normalizeClass(["theme-btn", theme.value == "theme8" ? "active" : ""]),
          onClick: _cache[9] || (_cache[9] = ($event) => handleTheme("theme8"))
        }, "\u6781\u5BA2", 2),
        createBaseVNode("span", {
          class: normalizeClass(["theme-btn", theme.value == "theme9" ? "active" : ""]),
          onClick: _cache[10] || (_cache[10] = ($event) => handleTheme("theme9"))
        }, "\u8F7B\u62DF", 2),
        _hoisted_2$5
      ]);
    };
  }
};
const _hoisted_1$8 = ["href", "rel", "target", "aria-label"];
const __default__ = defineComponent({
  inheritAttrs: false
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const site = useSiteData$1();
    const { item } = toRefs(props);
    const hasHttpProtocol = computed(() => isLinkHttp$1(item.value.link));
    const hasNonHttpProtocol = computed(() => isLinkMailto(item.value.link) || isLinkTel(item.value.link));
    const linkTarget = computed(() => {
      if (hasNonHttpProtocol.value)
        return void 0;
      if (item.value.target)
        return item.value.target;
      if (hasHttpProtocol.value)
        return "_blank";
      return void 0;
    });
    const isBlankTarget = computed(() => linkTarget.value === "_blank");
    const isRouterLink = computed(() => !hasHttpProtocol.value && !hasNonHttpProtocol.value && !isBlankTarget.value);
    const linkRel = computed(() => {
      if (hasNonHttpProtocol.value)
        return void 0;
      if (item.value.rel)
        return item.value.rel;
      if (isBlankTarget.value)
        return "noopener noreferrer";
      return void 0;
    });
    const linkAriaLabel = computed(() => item.value.ariaLabel || item.value.text);
    const shouldBeActiveInSubpath = computed(() => {
      const localeKeys = Object.keys(site.value.locales);
      if (localeKeys.length) {
        return !localeKeys.some((key) => key === item.value.link);
      }
      return item.value.link !== "/";
    });
    const isActiveInSubpath = computed(() => {
      if (!shouldBeActiveInSubpath.value) {
        return false;
      }
      return route.path.startsWith(item.value.link);
    });
    const isActive = computed(() => {
      if (!isRouterLink.value) {
        return false;
      }
      if (item.value.activeMatch) {
        return new RegExp(item.value.activeMatch).test(route.path);
      }
      return isActiveInSubpath.value;
    });
    return (_ctx, _cache) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
      return unref(isRouterLink) ? (openBlock(), createBlock(_component_RouterLink, mergeProps({
        key: 0,
        class: { "router-link-active": unref(isActive) },
        to: unref(item).link,
        "aria-label": unref(linkAriaLabel)
      }, _ctx.$attrs), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "before"),
          createTextVNode(" " + toDisplayString(unref(item).text) + " ", 1),
          renderSlot(_ctx.$slots, "after")
        ]),
        _: 3
      }, 16, ["class", "to", "aria-label"])) : (openBlock(), createElementBlock("a", mergeProps({
        key: 1,
        class: "external-link",
        href: unref(item).link,
        rel: unref(linkRel),
        target: unref(linkTarget),
        "aria-label": unref(linkAriaLabel)
      }, _ctx.$attrs), [
        renderSlot(_ctx.$slots, "before"),
        createTextVNode(" " + toDisplayString(unref(item).text) + " ", 1),
        unref(isBlankTarget) ? (openBlock(), createBlock(_component_ExternalLinkIcon, { key: 0 })) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "after")
      ], 16, _hoisted_1$8));
    };
  }
}));
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const setHeight = (items) => {
      items.style.height = items.scrollHeight + "px";
    };
    const unsetHeight = (items) => {
      items.style.height = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: "dropdown",
        onEnter: setHeight,
        onAfterEnter: unsetHeight,
        onBeforeLeave: setHeight
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});
const normalizePath = (path) => decodeURI(path).replace(/#.*$/, "").replace(/(index)?\.(md|html)$/, "");
const isActiveLink = (link, route) => {
  if (route.hash === link) {
    return true;
  }
  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);
  return currentPath === targetPath;
};
const isActiveSidebarItem = (item, route) => {
  if (item.link && isActiveLink(item.link, route)) {
    return true;
  }
  if (item.children) {
    return item.children.some((child) => isActiveSidebarItem(child, route));
  }
  return false;
};
const _hoisted_1$7 = { class: "sidebar-item-children" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    },
    depth: {
      type: Number,
      required: false,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    const { item, depth } = toRefs(props);
    const route = useRoute();
    const router = useRouter();
    const isActive = computed(() => isActiveSidebarItem(item.value, route));
    const itemClass = computed(() => ({
      "sidebar-item": true,
      "sidebar-heading": depth.value === 0,
      "active": isActive.value,
      "collapsible": item.value.collapsible
    }));
    const isOpen = ref(true);
    const onClick = ref(void 0);
    if (item.value.collapsible) {
      isOpen.value = isActive.value;
      onClick.value = () => {
        isOpen.value = !isOpen.value;
      };
      router.afterEach(() => {
        isOpen.value = isActive.value;
      });
    }
    return (_ctx, _cache) => {
      var _a2;
      const _component_SidebarItem = resolveComponent("SidebarItem", true);
      return openBlock(), createElementBlock("li", null, [
        unref(item).link ? (openBlock(), createBlock(_sfc_main$9, {
          key: 0,
          class: normalizeClass(unref(itemClass)),
          item: unref(item)
        }, null, 8, ["class", "item"])) : (openBlock(), createElementBlock("p", {
          key: 1,
          tabindex: "0",
          class: normalizeClass(unref(itemClass)),
          onClick: _cache[0] || (_cache[0] = (...args) => onClick.value && onClick.value(...args)),
          onKeydown: _cache[1] || (_cache[1] = withKeys((...args) => onClick.value && onClick.value(...args), ["enter"]))
        }, [
          createTextVNode(toDisplayString(unref(item).text) + " ", 1),
          unref(item).collapsible ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(["arrow", isOpen.value ? "down" : "right"])
          }, null, 2)) : createCommentVNode("", true)
        ], 34)),
        ((_a2 = unref(item).children) == null ? void 0 : _a2.length) ? (openBlock(), createBlock(_sfc_main$8, { key: 2 }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("ul", _hoisted_1$7, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(item).children, (child) => {
                return openBlock(), createBlock(_component_SidebarItem, {
                  key: `${unref(depth)}${child.text}${child.link}`,
                  item: child,
                  depth: unref(depth) + 1
                }, null, 8, ["item", "depth"]);
              }), 128))
            ], 512), [
              [vShow, isOpen.value]
            ])
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]);
    };
  }
});
const _hoisted_1$6 = {
  key: 0,
  class: "sidebar-items"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const sidebarItems = useSidebarItems();
    return (_ctx, _cache) => {
      return unref(sidebarItems).length ? (openBlock(), createElementBlock("ul", _hoisted_1$6, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(sidebarItems), (item) => {
          return openBlock(), createBlock(_sfc_main$7, {
            key: item.link || item.text,
            item
          }, null, 8, ["item"]);
        }), 128))
      ])) : createCommentVNode("", true);
    };
  }
});
var Sidebar_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$5 = { class: "dog-sidebar" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", _hoisted_1$5, [
        renderSlot(_ctx.$slots, "top"),
        createVNode(_sfc_main$6),
        renderSlot(_ctx.$slots, "bottom")
      ]);
    };
  }
});
var webPinyin = { exports: {} };
var dictZiWeb = {
  "a": "",
  "\u0101": "\u5416\u9515\u9312",
  "\xE1": "\u55C4",
  "\u01CE": "",
  "\xE0": "",
  "\u0101i": "\u54CE\u54C0\u57C3\u5A2D\u6EBE\u55F3\u92B0\u953F\u566F\u8AF0\u9384",
  "\xE1i": "\u5540\u5A3E\u6371\u7691\u51D2\u9691\u5D66\u6EB0\u560A\u6571\u6573\u769A\u78D1\u764C",
  "\u01CEi": "\u6BD0\u6639\u5A3E\u6B38\u7D60\u55F3\u77EE\u853C\u8EB7\u566F\u6FED\u85F9\u8B6A\u972D\u9744",
  "\xE0i": "\u827E\u4F0C\u6B2C\u7231\u7839\u784B\u5828\u7125\u9698\u55CC\u55F3\u5867\u5AD2\u611B\u788D\u53C6\u66A7\u7477\u50FE\u566F\u58D2\u5B21\u61D3\u8586\u9D31\u61DD\u66D6\u74A6\u8CF9\u9932\u76A7\u77B9\u99A4\u7919\u8B7A\u9440\u9C6B\u9749",
  "\u0101n": "\u5B89\u4F92\u5CD6\u6849\u6C28\u5063\u5EB5\u83F4\u8C19\u557D\u5A95\u843B\u844A\u75F7\u8164\u88FA\u9E4C\u84ED\u8A9D\u978D\u978C\u76E6\u8AF3\u99A3\u9B9F\u76EB\u9D6A\u97FD\u9D95",
  "\xE1n": "\u73B5\u557D\u96F8\u5111",
  "\u01CEn": "\u57B5\u4FFA\u5535\u57EF\u94F5\u63DE\u667B\u7F6F\u92A8",
  "\xE0n": "\u5388\u5C75\u5C7D\u72B4\u5CB8\u54B9\u6309\u6D1D\u834C\u6848\u80FA\u8C7B\u5813\u968C\u667B\u6697\u8C8B\u5111\u930C\u95C7\u9EEF",
  "\u0101ng": "\u80AE\u9AAF",
  "\xE1ng": "\u536C\u5C87\u6602\u663B",
  "\u01CEng": "",
  "\xE0ng": "\u678A\u76CE\u91A0",
  "\u0101o": "\u6CD1\u67EA\u7711\u688E\u8EEA\u719D\u720A",
  "\xE1o": "\u6556\u53AB\u969E\u55F7\u55F8\u5D85\u5ED2\u6160\u6EF6\u7353\u851C\u9068\u9A9C\u646E\u7352\u7488\u78DD\u58BD\u7FF1\u8071\u87AF\u7FF6\u8B37\u8B38\u7FFA\u9CCC\u93D5\u93D6\u9C32\u9DD4\u9F07",
  "\u01CEo": "\u8279\u629D\u82BA\u8884\u7711\u90E9\u957A\u5AAA\u5ABC\u8956",
  "\xE0o": "\u5C99\u6277\u629D\u5773\u5787\u5CB0\u67EA\u50B2\u5961\u8EEA\u5967\u5AEF\u5D85\u6160\u6F9A\u96A9\u58BA\u5DB4\u61CA\u64D9\u6FB3\u93CA\u9A41",
  "ba": "\u7F77",
  "b\u0101": "\u4E37\u516B\u4EC8\u5DF4\u53ED\u6733\u7390\u593F\u5C9C\u6277\u82AD\u5CC7\u67ED\u75A4\u54F1\u54F5\u634C\u7B06\u7C91\u7F93\u8686\u91DF\u8C5D\u9C83\u9B5E",
  "b\xE1": "\u53D0\u72AE\u629C\u59AD\u62D4\u8307\u70A6\u7679\u80C8\u83DD\u8A59\u8DCB\u8EF7\u98B0\u9B43\u9F25",
  "b\u01CE": "\u94AF\u9200\u9776",
  "b\xE0": "\u575D\u5F1D\u7238\u7685\u57BB\u8DC1\u9C83\u9B5E\u9C85\u9C8C\u7F77\u9B81\u9B8A\u8987\u77F2\u9738\u58E9\u705E\u6B1B",
  "b\u0101i": "\u6300\u63B0\u64D8",
  "b\xE1i": "\u767D",
  "b\u01CEi": "\u767E\u4F70\u6822\u74F8\u636D\u7AE1\u7CA8\u7D54\u6446\u64FA\u896C",
  "b\xE0i": "\u5457\u5E8D\u62DD\u8D25\u62DC\u5504\u6557\u7308\u7A17\u7CBA\u85AD\u8D01\u97DB",
  "b\u0101n": "\u6273\u653D\u670C\u80A6\u73ED\u822C\u9881\u6591\u642C\u6592\u9812\u642B\u7622\u9CFB\u878C\u8929\u764D\u8FAC",
  "b\u01CEn": "\u962A\u5742\u5C85\u6604\u677F\u7248\u74EA\u94A3\u7C84\u8228\u9211\u8742\u9B6C\u95C6",
  "b\xE0n": "\u529E\u534A\u4F34\u626E\u5762\u59C5\u6011\u7ECA\u67C8\u79DA\u6E74\u7D46\u8DD8\u9261\u977D\u8FA6\u74E3",
  "b\u0101ng": "\u90A6\u57B9\u5E2E\u6360\u6886\u6D5C\u90AB\u5E47\u5E5A\u7E0D\u5E6B\u97A4",
  "b\u01CEng": "\u7ED1\u7D81\u7253\u8180\u9AC8",
  "b\xE0ng": "\u73A4\u6337\u8684\u508D\u68D2\u68D3\u7865\u8C24\u585D\u6412\u7A16\u84A1\u86D6\u872F\u9551\u7E0D\u8255\u8B17\u938A",
  "b\u0101o": "\u52F9\u5305\u4F68\u5B62\u82DE\u67B9\u80DE\u525D\u7B23\u7172\u9F85\u88E6\u8554\u8912\u8943\u95C1\u9F59",
  "b\xE1o": "\u7A87\u96F9",
  "b\u01CEo": "\u5B9D\u6009\u9971\u4FDD\u9E28\u5BB2\u73E4\u5822\u5AAC\u8446\u5BDA\u98F9\u98FD\u8913\u99C2\u9CF5\u7DE5\u9D07\u8CF2\u85F5\u5BF3\u5BF6\u974C",
  "b\xE0o": "\u52FD\u72B3\u62A5\u6009\u62B1\u8C79\u8DB5\u94C7\u83E2\u86AB\u888C\u5831\u924B\u9C8D\u9AB2\u9AF1\u8663\u9B91\u5124\u66D3\u5697\u66DD\u7206\u72A6\u5FC1\u9464",
  "bei": "\u5457\u5504",
  "b\u0113i": "\u9642\u5351\u676F\u67F8\u76C3\u5EB3\u686E\u60B2\u63F9\u68D3\u6911\u7891\u9E4E\u7B84\u8AC0\u979E\u85E3\u9D6F",
  "b\u011Bi": "\u9273",
  "b\xE8i": "\u8D1D\u5B5B\u72C8\u8C9D\u90B6\u5907\u6601\u676E\u726C\u82DD\u90E5\u94A1\u4FFB\u500D\u6096\u72FD\u505D\u5079\u6896\u73FC\u9101\u5099\u50C3\u60EB\u68D1\u68D3\u7119\u7432\u8EF0\u8F88\u6102\u789A\u7999\u84D3\u86FD\u7295\u8919\u8A96\u9781\u9AB3\u8F29\u92C7\u618A\u7CD2\u97B4\u943E",
  "b\u0113n": "\u6CCD\u8D32\u681F\u55AF\u7287\u8CC1\u951B\u6F30\u931B\u87E6",
  "b\u011Bn": "\u5932\u672C\u82EF\u5959\u755A\u7FC9\u694D",
  "b\xE8n": "\u574B\u574C\u6CCD\u7083\u5034\u6379\u6873\u6E00\u7B28\u9029\u64AA",
  "b\u0113ng": "\u4F3B\u794A\u595F\u5D29\u7D63\u958D\u55D9\u5D6D\u75ED\u5623\u7DB3\u7E43",
  "b\xE9ng": "\u752E\u752D",
  "b\u011Bng": "\u57C4\u57F2\u83F6\u7423\u742B\u7DB3\u7E43\u979B",
  "b\xE8ng": "\u6CF5\u8FF8\u580B\u902C\u63FC\u8DF0\u5874\u7DB3\u750F\u955A\u7E43\u8E66\u93F0",
  "b\u012B": "\u7680\u5C44\u506A\u6BF4\u903C\u6945\u698C\u8C4D\u8795\u9D56\u9CBE\u939E\u9C0F",
  "b\xED": "\u8378\u9F3B\u5B36",
  "b\u01D0": "\u5315\u6BD4\u5936\u673C\u4F4A\u5421\u59A3\u6C98\u7595\u7EB0\u5F7C\u6BDE\u80B6\u67C0\u79D5\u4FFE\u5A1D\u7B14\u7C83\u7D15\u822D\u555A\u5D25\u7B46\u9119\u805B\u8C8F",
  "b\xEC": "\u5E01\u5FC5\u6BD5\u95EC\u95ED\u4F56\u5752\u5E87\u8298\u8BD0\u90B2\u5487\u59BC\u602D\u6036\u7541\u7540\u80B6\u82FE\u54D4\u67F2\u6BD6\u73CC\u7550\u75AA\u7955\u80C7\u835C\u8D32\u965B\u6BD9\u72F4\u7562\u7B13\u7C8A\u8890\u94CB\u5A62\u655D\u65C7\u6890\u7D34\u7FCD\u8406\u841E\u9587\u9588\u9589\u581B\u5F3C\u5F3B\u610A\u610E\u6E62\u7695\u7986\u7B5A\u8A56\u8CB1\u8CC1\u8D51\u55F6\u5F43\u6ED7\u6EED\u714F\u75FA\u75F9\u7764\u7765\u8177\u84D6\u84FD\u870C\u88E8\u8DF8\u924D\u959F\u98F6\u5E63\u5F0A\u719A\u7359\u78A7\u7A2B\u7B85\u7B86\u7DBC\u853D\u912A\u999D\u5E64\u6F77\u7358\u7F7C\u8945\u99DC\u9AF2\u58C1\u5B16\u5EE6\u7BE6\u7BF3\u7E2A\u859C\u89F1\u907F\u9B85\u6583\u6FDE\u8E55\u979E\u9AC0\u5970\u74A7\u9128\u939E\u93CE\u9946\u7E74\u8963\u895E\u97B8\u97E0\u9B53\u8E83\u8E84\u9A46\u9D9D\u6707\u8D14\u9434\u9DDD\u9DE9\u9F0A",
  "bi\u0101n": "\u8FBA\u8FB9\u709E\u782D\u7B3E\u7335\u7F16\u8439\u7178\u7251\u7502\u7BAF\u7CC4\u7DE8\u81F1\u8759\u9795\u7371\u9089\u937D\u9CCA\u908A\u97AD\u9BFE\u9BFF\u7C53\u7C69",
  "bi\u01CEn": "\u8D2C\u75BA\u7A86\u533E\u8CB6\u60FC\u63D9\u78A5\u7A28\u890A\u7CC4\u9D18\u85CA\u89B5\u9DA3",
  "bi\xE0n": "\u535E\u5F01\u5FED\u6283\u6C73\u6C74\u82C4\u91C6\u53D8\u5CC5\u73A3\u5909\u662A\u898D\u5FA7\u7F0F\u904D\u959E\u8FA1\u7DF6\u8251\u8ADA\u8FA7\u8FA8\u8FA9\u8FAB\u8FAE\u8FAF\u8B8A",
  "bi\u0101o": "\u706C\u6753\u6807\u98D1\u9A89\u9ADF\u5F6A\u6DF2\u730B\u813F\u98A9\u50C4\u5882\u5E56\u647D\u6EEE\u8508\u98AE\u9AA0\u6A19\u719B\u8194\u8198\u9E83\u762D\u78E6\u9556\u98DA\u98D9\u5126\u6AA6\u7BFB\u98B7\u700C\u85E8\u8B24\u7202\u81D5\u8D06\u93E2\u7A6E\u9573\u98C8\u98C6\u98CA\u98C7\u9463\u9A6B",
  "bi\xE1o": "\u5AD1",
  "bi\u01CEo": "\u8868\u5A4A\u88F1\u8AD8\u893E\u9336\u6AA6",
  "bi\xE0o": "\u4FF5\u647D\u9CD4",
  "bi\u0113": "\u67ED\u618B\u87DE\u765F\u9CD6\u9C49\u9F08\u864C\u9F9E",
  "bi\xE9": "\u5225\u67F2\u8382\u86C2\u5FB6\u8952\u87DE\u8E69",
  "bi\u011B": "\u765F",
  "bi\xE8": "\u5225\u5F46",
  "b\u012Bn": "\u6C43\u90A0\u73A2\u780F\u5BBE\u5F6C\u68B9\u50A7\u658C\u6915\u6EE8\u7F24\u69DF\u7478\u8C69\u8CD3\u8CD4\u9554\u5110\u6FD2\u983B\u6FF1\u6FF5\u8668\u8C73\u6AB3\u74B8\u7015\u9726\u7E7D\u944C\u986E",
  "b\u01D0n": "",
  "b\xECn": "\u6448\u6BA1\u8191\u9AE9\u5110\u64EF\u9B02\u6BAF\u81CF\u9ACC\u9B13\u9AD5\u9B22",
  "b\u012Bng": "\u51AB\u4ECC\u4ED2\u6C37\u51B0\u5175\u5E77\u681F\u63A4\u68B9\u86C3\u7D63\u69DF\u92F2\u6AB3",
  "b\u01D0ng": "\u4E19\u90B4\u9643\u6032\u62A6\u79C9\u82EA\u661E\u663A\u67C4\u70B3\u997C\u772A\u504B\u5C5B\u5BCE\u68C5\u7415\u7980\u7A1F\u9235\u927C\u9786\u9905\u9920\u979E\u97B8",
  "b\xECng": "\u4E26\u4F75\u5E77\u678B\u57AA\u5EB0\u5002\u6824\u75C5\u7A89\u7ADD\u504B\u50A1\u5BCE\u6452\u8A81\u9BA9\u9750",
  "bo": "\u5575\u8514\u5643",
  "b\u014D": "\u7676\u62E8\u6CE2\u7677\u73BB\u525D\u54F1\u76CB\u7835\u8DB5\u94B5\u997D\u7D34\u7F3D\u83E0\u88B0\u6E8A\u7886\u9262\u50E0\u5D93\u64A5\u64AD\u9911\u78FB\u7921\u8E73\u76AA\u9A4B\u9C4D",
  "b\xF3": "\u4EE2\u5F74\u8091\u9A73\u5E1B\u72DB\u74DD\u82E9\u4FBC\u67ED\u80C9\u90E3\u4EB3\u632C\u6D61\u74DF\u79E1\u88AF\u94B9\u94C2\u6872\u6DFF\u8116\u8236\u8421\u88B9\u535A\u6B95\u6E24\u8467\u9E41\u613D\u640F\u733C\u9251\u9238\u998E\u9C8C\u50F0\u6991\u717F\u7254\u7B94\u818A\u824A\u8A96\u999B\u99C1\u8E23\u92CD\u9548\u58C6\u999E\u99EE\u9B8A\u7A5B\u894F\u8B08\u5697\u61EA\u7C19\u939B\u993A\u9D53\u7CEA\u9AC6\u9AC9\u6B02\u896E\u7934\u946E",
  "b\u01D2": "\u7677\u86BE\u8DDB",
  "b\xF2": "\u5B79\u64D7\u64D8\u6A97\u6A98\u8B52\u8617",
  "b\u016B": "\u5CEC\u5EAF\u900B\u94B8\u6661\u923D\u8AA7\u9914\u933B\u9BC6\u9D4F",
  "b\xFA": "\u9CEA\u8F50\u91AD",
  "b\u01D4": "\u535F\u8865\u54FA\u6355\u636C\u88DC\u9E14",
  "b\xF9": "\u5E03\u4F48\u5425\u6B65\u5498\u6016\u62AA\u6B69\u6B68\u67E8\u949A\u52CF\u57D4\u57D7\u6091\u6357\u8379\u90E8\u57E0\u5A44\u74FF\u9208\u5ECD\u8500\u7B81\u8E04\u90F6\u7BF0\u9922",
  "c\u0101": "\u5693\u64E6\u6503",
  "c\u01CE": "\u7924\u7938",
  "c\xE0": "\u906A\u56C3",
  "c\u0101i": "\u5072\u731C",
  "c\xE1i": "\u624D\u6250\u6750\u8D22\u8CA1\u88C1\u7E94",
  "c\u01CEi": "\u6BDD\u5038\u554B\u57F0\u5A47\u5BC0\u5F69\u63A1\u68CC\u776C\u8DF4\u7DB5\u8E29",
  "c\xE0i": "\u57F0\u5BC0\u83DC\u8521\u7E29",
  "c\u0101n": "\u53C3\u53C4\u98E1\u9A96\u53C5\u55B0\u6E4C\u50AA\u5B20\u9910\u7218\u9A42\u56CB",
  "c\xE1n": "\u6B8B\u8695\u60ED\u6B98\u615A\u6472\u8745\u6159\u883A\u8836",
  "c\u01CEn": "\u60E8\u6701\u6158\u61AF\u7A47\u7BF8\u9EEA\u9EF2",
  "c\xE0n": "\u707F\u5B71\u50AA\u7CB2\u5607\u647B\u510F\u6FAF\u8592\u71E6\u74A8\u8B32\u93D2",
  "c\u0101ng": "\u4ED3\u4EFA\u4F27\u6CA7\u82CD\u73B1\u9E27\u5009\u8231\u5096\u51D4\u5D62\u6EC4\u734A\u84BC\u7472\u6FF8\u7BEC\u8259\u87A5\u9DAC",
  "c\xE1ng": "\u5328\u81E7\u6B0C\u9476",
  "c\xE0ng": "\u8CF6",
  "c\u0101o": "\u64A1\u64CD\u7CD9",
  "c\xE1o": "\u66FA\u66F9\u50AE\u5608\u5D86\u6152\u6F15\u84F8\u69FD\u893F\u825A\u87AC\u93EA",
  "c\u01CEo": "\u5C6E\u8278\u8349\u613A\u6145\u61C6\u9A32",
  "c\xE0o": "\u808F\u9135\u8959\u9F1C",
  "c\xE8": "\u5928\u518A\u518C\u5395\u607B\u62FA\u6D4B\u835D\u6547\u755F\u5074\u53A0\u7B27\u7CA3\u8417\u5EC1\u60FB\u6E2C\u7B56\u8434\u7B5E\u7B74\u84DB\u7BA3\u61A1\u7C0E",
  "c\u0113n": "\u53C3\u53C4\u53C5\u5D7E\u7A47\u7BF8",
  "c\xE9n": "\u5C91\u6C75\u57C1\u6D94\u7B12",
  "c\u0113ng": "\u564C",
  "c\xE9ng": "\u5C42\u66FD\u5C64\u5D92\u6A67\u7AF2\u9A53",
  "c\xE8ng": "\u8E6D",
  "c\u012B": "\u5470\u5472\u73BC\u75B5\u8D80\u5068\u8DD0\u7E12\u9AB4\u9ACA\u8800\u9F79",
  "c\xED": "\u8BCD\u73C1\u5179\u5790\u67CC\u7960\u8328\u74F7\u7CA2\u8A5E\u8F9D\u6148\u7506\u8F9E\u78C1\u96CC\u9E5A\u7CCD\u8FA4\u98FA\u9908\u5B28\u6FE8\u858B\u9D1C\u7920\u8FAD\u9DC0\u9DBF",
  "c\u01D0": "\u6B64\u4F4C\u6CDA\u73BC\u7689\u5559\u8DD0\u9B86",
  "c\xEC": "\u673F\u6B21\u4F7D\u523E\u5E9B\u8326\u6828\u83BF\u7D58\u86D3\u8D50\u8786\u8CDC",
  "c\u014Dng": "\u5306\u56EA\u56F1\u82C1\u5FE9\u679E\u8310\u6031\u60A4\u68C7\u7127\u8471\u6964\u6F17\u8061\u84EF\u8525\u9AA2\u66B0\u6A05\u6A2C\u6F68\u719C\u747D\u7481\u8066\u806A\u779B\u7BF5\u8070\u87CC\u936F\u7E71\u93D3\u93E6\u9A18\u9A44",
  "c\xF3ng": "\u4E1B\u5F94\u5F93\u5A43\u5B6E\u5F96\u5F9E\u60B0\u6DD9\u742E\u7882\u6152\u6F0E\u6F40\u6F48\u8AB4\u8CE8\u8CE9\u6A37\u931D\u85C2\u53E2\u7047\u6B09\u721C",
  "c\u01D2ng": "",
  "c\xF2ng": "\u6121\u6181\u8B25",
  "c\u014Du": "",
  "c\xF3u": "",
  "c\u01D2u": "",
  "c\xF2u": "\u51D1\u6E4A\u50B6\u6971\u8160\u8F8F\u8F33",
  "c\u016B": "\u601A\u7C97\u89D5\u9E81\u9E84\u6A7B\u9E86\u9EA4",
  "c\xFA": "\u5F82\u6B82",
  "c\u01D4": "\u76BB",
  "c\xF9": "\u4FC3\u731D\u8128\u5AA8\u7604\u851F\u8A8E\u8D97\u5648\u61B1\u8E27\u918B\u762F\u8E3F\u7C07\u7E2C\u8DA8\u9F00\u8E59\u8E75\u8E74\u9863",
  "cu\u0101n": "\u6C46\u64BA\u92D1\u9569\u8E7F\u651B\u8EA5\u9479",
  "cu\xE1n": "\u6FFD\u6AD5\u5DD1\u6522\u7052\u6B11\u7A73",
  "cu\xE0n": "\u7A9C\u6BA9\u71B6\u7ABD\u7BE1\u7ABE\u7C12\u7AC4\u7228",
  "cu\u012B": "\u96B9\u5D14\u813A\u50AC\u51D7\u5D5F\u7F1E\u5894\u615B\u6467\u69B1\u6F3C\u69EF\u78EA\u7E17\u93D9",
  "cu\u01D0": "\u6F3C\u71A3\u7480\u8DA1\u76A0",
  "cu\xEC": "\u4F1C\u5FF0\u75A9\u5005\u7C8B\u7D23\u7FC6\u8103\u8106\u5550\u555B\u5D12\u60B4\u6DEC\u8403\u690A\u6BF3\u7120\u7417\u7601\u7CB9\u7DB7\u7FE0\u81B5\u81AC\u6FE2\u7AC1\u894A\u9847\u81CE",
  "c\u016Bn": "\u90A8\u6751\u76B4\u8E06\u6F8A\u7AF4\u81A5",
  "c\xFAn": "\u5B58\u4F9F\u62F5\u58FF\u6F8A",
  "c\u01D4n": "\u520C\u5FD6",
  "c\xF9n": "\u5BF8\u540B\u7C7F",
  "cu\u014D": "\u6413\u7473\u9073\u78CB\u8E49\u919D\u9388",
  "cu\xF3": "\u8658\u5D6F\u5D73\u75E4\u7749\u77EC\u84AB\u7625\u8516\u9E7E\u9142\u9E7A\u9147",
  "cu\u01D2": "\u811E",
  "cu\xF2": "\u5249\u5252\u539D\u590E\u632B\u83A1\u839D\u5EB4\u63AA\u902A\u9509\u84CC\u9519\u7E12\u8ACE\u92BC\u932F",
  "ch\u0101": "\u6260\u6271\u8286\u81FF\u633F\u505B\u55CF\u63D2\u63F7\u9987\u929F\u9538\u8256\u7580\u5693\u9364\u9388\u9937",
  "ch\xE1": "\u79C5\u82F4\u579E\u67FB\u832C\u8336\u6348\u688C\u5D56\u643D\u7339\u976B\u6942\u69CE\u8A67\u5BDF\u6456\u6AAB",
  "ch\u01CE": "\u7D01\u8E45\u9572\u9454",
  "ch\xE0": "\u4EDB\u597C\u6C4A\u5C94\u4F98\u8869\u8BE7\u524E\u59F9\u7D01\u8A6B",
  "ch\u0101i": "\u8286\u809E\u9497\u91F5",
  "ch\xE1i": "\u72B2\u4FAA\u67F4\u8C7A\u7961\u558D\u5115",
  "ch\u01CEi": "\u831D",
  "ch\xE0i": "\u867F\u8883\u8A0D\u7625\u8806\u56C6",
  "ch\u0101n": "\u8FBF\u89C7\u68B4\u6400\u8998\u88E7\u647B\u7DC2\u92D3\u5E68\u895C\u6519",
  "ch\xE1n": "\u82C2\u5A75\u8C17\u55AE\u5B71\u68CE\u6E79\u7985\u998B\u7158\u7F20\u50DD\u5D83\u5D84\u7351\u8749\u8A97\u92CB\u5103\u5B0B\u5EDB\u6F79\u6F7A\u7DFE\u6FB6\u78DB\u79AA\u6BDA\u87B9\u87D0\u913D\u700D\u7E5F\u87EC\u5133\u5296\u7E75\u87FE\u9141\u56B5\u58E5\u5DC9\u703A\u6B03\u7E8F\u7E92\u8E94\u9575\u826C\u8B92\u9471\u995E",
  "ch\u01CEn": "\u4EA7\u522C\u65F5\u4E33\u65BA\u6D50\u5257\u8C04\u5574\u7522\u7523\u94F2\u9610\u8487\u5277\u5D7C\u644C\u6EFB\u563D\u5E5D\u8546\u8AC2\u95B3\u9AA3\u71C0\u7C05\u5181\u7E5F\u91A6\u8B42\u93DF\u95E1\u56C5\u705B\u8B87",
  "ch\xE0n": "\u5FCF\u522C\u5257\u785F\u6472\u5E5D\u5E68\u71C0\u61F4\u5133\u61FA\u7FBC\u97C2\u986B",
  "ch\u0101ng": "\u4F25\u660C\u5000\u5A3C\u6DD0\u7316\u83D6\u960A\u6919\u7429\u88EE\u9520\u9329\u95B6\u9CB3\u95DB\u9BE7\u9F1A",
  "ch\xE1ng": "\u4EE9\u4EE7\u514F\u80A0\u82CC\u9578\u9577\u5C1D\u507F\u5E38\u5F9C\u74FA\u8407\u5834\u751E\u8178\u5617\u5872\u5AE6\u747A\u8193\u511F\u5690\u9CBF\u9C68",
  "ch\u01CEng": "\u6636\u60DD\u5834\u655E\u50D8\u53B0\u5872\u5EE0\u6C05\u92F9",
  "ch\xE0ng": "\u6005\u739A\u7545\u9B2F\u5531\u60B5\u713B\u7452\u66A2\u757C\u8AAF\u97D4",
  "ch\u0101o": "\u6284\u5F28\u600A\u6B29\u949E\u8A2C\u712F\u8D85\u9214\u52E6\u6477\u7DBD\u528B\u6A14\u7ABC",
  "ch\xE1o": "\u724A\u6641\u5DE3\u5DE2\u911B\u9F0C\u6F05\u6A14\u6F6E\u7AB2\u7F7A\u9F02\u8F48\u8B3F",
  "ch\u01CEo": "\u7092\u7727\u7C86\u7123\u717C\u69F1\u9EA8\u5DD0",
  "ch\xE0o": "\u4EE6\u4EEF\u8016\u89D8",
  "ch\u0113": "\u4F21\u8ECA\u4FE5\u7817\u5513\u8397\u7868\u86FC",
  "ch\xE9": "",
  "ch\u011B": "\u626F\u5056\u64A6\u5972",
  "ch\xE8": "\u5C6E\u5F7B\u546B\u577C\u8FE0\u70E2\u70F2\u710E\u8045\u63A3\u63CA\u7869\u9819\u5FB9\u6470\u64A4\u6F88\u52F6\u77AE\u7221",
  "chen": "\u4F27\u5096",
  "ch\u0113n": "\u809C\u62BB\u90F4\u6375\u68FD\u741B\u55D4\u7D9D\u7628\u778B\u8AC3\u8CDD\u8B13",
  "ch\xE9n": "\u5C18\u81E3\u5FF1\u6C89\u8FB0\u9648\u8FE7\u831E\u5BB8\u6815\u8380\u8390\u9673\u6550\u6668\u686D\u68A3\u8A26\u8C0C\u8ED9\u6116\u8DC8\u9202\u7141\u852F\u5875\u6576\u6A04\u760E\u9703\u87B4\u8AF6\u85BC\u9E8E\u66DF\u9DD0",
  "ch\u011Bn": "\u8DBB\u7876\u789C\u588B\u5926\u78E3\u8E38\u9356\u8D02\u91A6",
  "ch\xE8n": "\u886C\u722F\u75A2\u9F80\u5041\u8D82\u8D81\u6987\u7A31\u9F53\u9F54\u512D\u56AB\u7A6A\u8C36\u6AEC\u896F\u8B96",
  "ch\u0113ng": "\u673E\u9637\u6CDF\u67FD\u722F\u51C8\u68E6\u6D7E\u7424\u5041\u6DE8\u7880\u86CF\u667F\u725A\u6436\u8D6A\u50DC\u6186\u645A\u7A31\u9757\u6490\u6491\u7DFD\u6A56\u6A55\u77A0\u8D6C\u9833\u6A89\u7AC0\u7F49\u9397\u77C3\u7A6A\u87F6\u93FF\u9423\u9953\u943A",
  "ch\xE9ng": "\u6C36\u4E1E\u6210\u673E\u5448\u627F\u67A8\u8BDA\u90D5\u4E57\u57CE\u57E9\u5A0D\u5BAC\u5CF8\u6D06\u837F\u57D5\u6330\u665F\u6D67\u73F9\u6381\u73F5\u7A9A\u812D\u94D6\u5818\u60E9\u63E8\u68D6\u6909\u7A0B\u7B6C\u7D7E\u88CE\u584D\u5856\u6E97\u8AA0\u757B\u9172\u92EE\u6195\u649C\u6F82\u6A59\u6A99\u9BCE\u7013\u61F2\u9A2C",
  "ch\u011Bng": "\u4FB1\u5F8E\u609C\u901E\u9A8B\u5EB1\u7748\u88CE\u9A01",
  "ch\xE8ng": "\u79E4\u725A\u7A31\u7AC0\u7A6A",
  "chi": "\u9EB6",
  "ch\u012B": "\u5403\u599B\u54E7\u5F68\u80F5\u86A9\u9E31\u74FB\u7735\u7B1E\u7C9A\u55AB\u8A35\u55E4\u5AB8\u645B\u75F4\u7D7A\u6A06\u5644\u6BA6\u779D\u8ABA\u566D\u87AD\u9D1F\u9D44\u7661\u9B51\u9F5D\u6521\u5F72\u9ED0",
  "ch\xED": "\u5F1B\u6C60\u9A70\u8FDF\u577B\u6CB6\u72CB\u830C\u8FE1\u6301\u67E2\u7AFE\u834E\u4FFF\u6B6D\u801B\u83ED\u86B3\u8D7F\u7B42\u8CBE\u9045\u8DE2\u905F\u99B3\u7B88\u7B8E\u5880\u5FB2\u6F26\u8E1F\u9072\u7BEA\u8B18\u9349\u908C\u9D97\u9D99",
  "ch\u01D0": "\u53FA\u4F2C\u6261\u544E\u8094\u4F88\u5376\u9F7F\u5791\u5953\u62F8\u80E3\u6065\u803B\u8687\u88B3\u8C49\u6B3C\u6B6F\u88B2\u88ED\u8A83\u9279\u892B\u9F52",
  "ch\xEC": "\u5F73\u53F1\u65A5\u4F41\u6758\u707B\u8D64\u996C\u4F99\u62B6\u52C5\u605C\u67C5\u70BD\u52D1\u6347\u7719\u7FC4\u7FC5\u6555\u70FE\u557B\u6E41\u98ED\u50BA\u75F8\u815F\u8A83\u9253\u96F4\u618F\u7608\u7FE4\u906B\u9290\u6157\u6178\u761B\u7FE8\u71BE\u61D8\u8DA9\u9D92\u9DD8",
  "ch\u014Dng": "\u5145\u5FE1\u6C96\u833A\u6D7A\u73EB\u7FC0\u8202\u5603\u644F\u5FB8\u6183\u61A7\u885D\u7F7F\u825F\u8E56",
  "ch\xF3ng": "\u866B\u5D08\u5D07\u75CB\u9680\u6F34\u8908\u7DDF\u8769\u87F2\u721E",
  "ch\u01D2ng": "\u5BA0\u57EB\u5BF5",
  "ch\xF2ng": "\u94F3\u63F0\u9283",
  "chou": "\u9B98",
  "ch\u014Du": "\u62BD\u7270\u5A64\u63AB\u7D2C\u640A\u8DFE\u7633\u7BD8\u9194\u72A8\u72AB",
  "ch\xF3u": "\u601E\u4FE6\u8BEA\u5E31\u6826\u60C6\u68BC\u7564\u7D2C\u7EF8\u83D7\u6906\u7574\u7D52\u6101\u7697\u7A20\u7B79\u88EF\u8A76\u9167\u916C\u7DA2\u8E0C\u5114\u96D4\u568B\u5B26\u5E6C\u61E4\u76E9\u85B5\u6AAE\u71FD\u96E0\u7587\u7C4C\u8E8A\u91BB\u8B90\u8B8E\u96E6",
  "ch\u01D2u": "\u4E12\u4E11\u541C\u677D\u677B\u5062\u7785\u919C\u77C1\u9B57",
  "ch\xF2u": "\u81F0\u905A\u6BA0",
  "chu": "\u6A7B",
  "ch\u016B": "\u51FA\u5C80\u521D\u698B\u6462\u6474\u6A17\u8C99\u6AD6\u9F63",
  "ch\xFA": "\u520D\u9664\u82BB\u801D\u53A8\u6EC1\u84A2\u8C60\u9504\u5AB0\u8021\u84AD\u870D\u8D8E\u924F\u96CF\u7293\u5EDA\u7BE8\u92E4\u6A71\u5E6E\u6AC9\u85F8\u87F5\u8E87\u96DB\u6AE5\u8E70\u9DB5\u8E95",
  "ch\u01D4": "\u51E6\u6775\u7840\u6918\u8655\u50A8\u696E\u7987\u695A\u891A\u6FCB\u5132\u6A9A\u74B4\u790E\u9F6D\u9F7C",
  "ch\xF9": "\u4E8D\u51E6\u7ACC\u6035\u6CCF\u7ECC\u8C56\u6B2A\u70AA\u7AD0\u4FF6\u654A\u57F1\u73FF\u7D40\u83C6\u5097\u9110\u6149\u6410\u6EC0\u89E6\u95A6\u510A\u563C\u8AD4\u61B7\u65B6\u6B5C\u81C5\u9EDC\u89F8\u77D7",
  "chu\u0101": "\u6B3B",
  "chu\u01CE": "",
  "chu\xE0": "",
  "chu\u0101i": "\u640B",
  "chu\xE1i": "\u8197",
  "chu\u01CEi": "",
  "chu\xE0i": "\u555C\u6B3C\u81AA\u8E39",
  "chu\u0101n": "\u5DDB\u5DDD\u6C1A\u7A7F\u732D\u744F",
  "chu\xE1n": "\u8221\u8229\u5276\u8239\u570C\u9044\u50B3\u692F\u693D\u6B42\u66B7\u7BC5\u819E\u8F32",
  "chu\u01CEn": "\u821B\u8348\u5598\u583E\u6B42\u50E2\u8E33",
  "chu\xE0n": "\u6C4C\u4E32\u7394\u948F\u91E7\u732D\u8CD7\u9DA8",
  "chu\u0101ng": "\u5205\u75AE\u7A93\u5275\u7A97\u724E\u6450\u7255\u7621\u7ABB",
  "chu\xE1ng": "\u5E8A\u7240\u55A0\u5647\u6723\u6A66",
  "chu\u01CEng": "\u95EF\u50B8\u78E2\u95D6",
  "chu\xE0ng": "\u6006\u5231\u524F\u5259\u5275\u6134",
  "chu\u012B": "\u5439\u708A\u9FA1",
  "chu\xED": "\u5782\u5015\u57C0\u6858\u9672\u6376\u83D9\u570C\u6425\u68F0\u8144\u69CC\u787E\u9524\u7BA0\u9318\u939A\u9840",
  "chu\u01D0": "",
  "chu\xEC": "\u60D9",
  "ch\u016Bn": "\u829A\u65FE\u6776\u6625\u8405\u5A8B\u6699\u693F\u69C6\u7443\u7BBA\u877D\u6A41\u8F34\u6AC4\u9C06\u9D9E",
  "ch\xFAn": "\u7EAF\u80AB\u9659\u5507\u6D71\u7D14\u83BC\u8123\u6E7B\u7289\u6EE3\u8493\u9E51\u6F18\u84F4\u819E\u9187\u9195\u931E\u9BD9\u9D89",
  "ch\u01D4n": "\u6710\u5046\u8436\u60F7\u7776\u8CF0\u8822",
  "chu\u014D": "\u9034\u8DA0\u8E14\u6233\u7E5B",
  "chu\xF2": "\u8FB6\u5437\u8FB5\u62FA\u54FE\u5A16\u5A15\u555C\u5A65\u5A7C\u60D9\u6DB0\u6DD6\u8F8D\u916B\u7DBD\u8E00\u7BB9\u8F1F\u92DC\u9F8A\u64C9\u78ED\u991F\u7E5B\u6B60\u93C3\u56BD\u9F6A\u9461\u5B4E",
  "da": "\u7E68",
  "d\u0101": "\u5491\u54D2\u8037\u7B1A\u55D2\u642D\u8921\u5660\u58B6\u6498\u939D\u9389",
  "d\xE1": "\u8FBE\u8FCF\u8FD6\u8FDA\u547E\u59B2\u601B\u6C93\u57AF\u709F\u7F8D\u8345\u8359\u7557\u5273\u5312\u60EE\u7563\u7B2A\u9039\u6E9A\u8A5A\u9054\u8DF6\u977C\u619A\u8598\u9791\u71F5\u87FD\u943D\u97C3\u9F96\u9F98",
  "d\u01CE": "",
  "d\xE0": "\u4EA3\u6C4F\u7714",
  "d\u0101i": "\u5446\u5454\u7343\u61DB",
  "d\u01CEi": "\u6B79\u902E\u50A3",
  "d\xE0i": "\u4EE3\u8BD2\u8F6A\u4FA2\u5788\u5CB1\u5E12\u7519\u7ED0\u8FE8\u5E26\u6020\u67CB\u6B86\u73B3\u8D37\u5E2F\u8CA3\u8ED1\u57ED\u5E36\u7D3F\u86AE\u888B\u8EDA\u902E\u91F1\u68E3\u8A52\u8CB8\u8EE9\u7447\u8DE2\u5ED7\u7B89\u53C7\u66C3\u7DFF\u8773\u99D8\u9B98\u9D0F\u6234\u825C\u9EDB\u7C24\u8E5B\u703B\u9734\u8976\u9EF1\u9746",
  "d\u0101n": "\u4E39\u5989\u5358\u7708\u7803\u803C\u803D\u90F8\u8043\u8EAD\u9156\u55AE\u5A85\u6116\u6B9A\u7605\u5330\u7BAA\u891D\u9132\u9815\u510B\u52EF\u64D4\u6BAB\u7514\u7649\u894C\u7C1E\u8078",
  "d\u01CEn": "\u4F14\u5210\u628C\u73AC\u74ED\u80C6\u8874\u75B8\u7D1E\u8D55\u4EB6\u99BE\u64A2\u64A3\u8CE7\u71C0\u9ED5\u81BD\u76BD\u9EF5",
  "d\xE0n": "\u65E6\u4F46\u5E0E\u547E\u6C8A\u6CF9\u72DA\u8BDE\u550C\u67E6\u758D\u8A11\u5557\u5556\u60D4\u60EE\u6DE1\u840F\u86CB\u557F\u5F3E\u6C2E\u8145\u8711\u89DB\u4EB6\u7605\u7A9E\u84DE\u8A95\u50E4\u5649\u99BE\u9AE7\u510B\u563E\u5F48\u619A\u9188\u61BA\u64D4\u6FB9\u79AB\u9924\u99F3\u9D20\u7649\u81BB\u765A\u56AA\u7E75\u8D09\u972E\u994F\u9EEE",
  "d\u0101ng": "\u73F0\u88C6\u7B5C\u7576\u5105\u5679\u6FA2\u74AB\u8960\u7C39\u8261\u87F7\u943A\u95E3",
  "d\u01CEng": "\u515A\u8C20\u7576\u64CB\u8B61\u9EE8\u6529\u7059\u6B13\u8B9C",
  "d\xE0ng": "\u6C39\u51FC\u5735\u5B95\u7800\u57B1\u8361\u6863\u5052\u83EA\u5A78\u5D35\u6113\u74FD\u903F\u5D63\u7576\u96FC\u6F52\u78AD\u5105\u778A\u8569\u8DA4\u58CB\u64CB\u6A94\u7497\u76EA\u7911\u7C1C\u862F\u95E3",
  "d\u0101o": "\u5200\u5202\u5FC9\u6737\u6C18\u8220\u91D6\u9C7D\u88EF\u9B5B\u87A9",
  "d\xE1o": "\u636F",
  "d\u01CEo": "\u5BFC\u5C9B\u9666\u5CF6\u6363\u7977\u7982\u6417\u969D\u5604\u5D8B\u5D8C\u69DD\u5C0E\u96AF\u58D4\u5DB9\u64E3\u8E48\u6AAE\u79B1",
  "d\xE0o": "\u8FBA\u5230\u5E31\u60BC\u68BC\u7118\u76D7\u83FF\u6921\u76DC\u7D69\u9053\u7A32\u7B8C\u7FE2\u5675\u7A3B\u8254\u885C\u6AA4\u885F\u5E6C\u71FE\u7FFF\u8EC7\u74D9\u7E9B",
  "de": "\u65F3",
  "d\u0113": "\u561A",
  "d\xE9": "\u6074\u6DC2\u86AE\u60B3\u60EA\u68CF\u951D\u5FB3\u5FB7\u9340",
  "d\u0113i": "\u561A",
  "d\u011Bi": "",
  "d\xE8n": "\u6265\u627D",
  "d\u0113ng": "\u706F\u767B\u8C4B\u50DC\u5654\u5B01\u71C8\u7492\u7AF3\u7C26\u8260\u8E6C",
  "d\u011Bng": "\u7B49\u6225",
  "d\xE8ng": "\u9093\u51F3\u9127\u96A5\u58B1\u5D9D\u6195\u77AA\u78F4\u956B\u6AC8\u7013\u89B4\u9419",
  "d\u012B": "\u6C10\u4EFE\u4F4E\u5943\u5CBB\u5F7D\u79EA\u889B\u5572\u57DE\u7F9D\u9684\u5824\u6E27\u8D86\u6EF4\u78AE\u6A00\u78FE\u97AE\u93D1",
  "d\xED": "\u625A\u5EF8\u65F3\u72C4\u8091\u7C74\u82D6\u8FEA\u5519\u654C\u6D5F\u6DA4\u837B\u5547\u6891\u7B1B\u89CC\u976E\u6ECC\u84E7\u99B0\u9AE2\u5600\u5AE1\u7FDF\u850B\u8510\u9814\u6575\u7BF4\u955D\u5681\u85E1\u8C74\u8E62\u93D1\u7CF4\u89BF\u9E10",
  "d\u01D0": "\u6C10\u538E\u5758\u8BCB\u90B8\u963A\u5467\u577B\u5F24\u62B5\u62DE\u6791\u67E2\u7274\u7825\u638B\u83E7\u89DD\u8A46\u8EE7\u6974\u805C\u9AB6\u9BF3",
  "d\xEC": "\u5754\u65F3\u6755\u7393\u601F\u67A4\u82D0\u4FE4\u54CB\u57C5\u5E1D\u57CA\u5A23\u9013\u9012\u5059\u688A\u710D\u73F6\u7731\u7976\u7B2C\u83C2\u8C1B\u91F1\u5A82\u63E5\u68E3\u6E27\u7747\u7F14\u8482\u9046\u50C0\u6974\u7998\u8163\u905E\u926A\u5886\u5891\u58AC\u5D7D\u6455\u7590\u78B2\u8515\u8743\u9070\u6178\u750B\u7DE0\u876D\u5DB3\u8AE6\u8ADF\u8E36\u87AE",
  "di\u01CE": "\u55F2",
  "di\u0101n": "\u4F54\u6541\u6382\u508E\u53A7\u5D6E\u6EC7\u69C7\u69D9\u7628\u7AB4\u98A0\u8E4E\u5DC5\u985A\u985B\u766B\u5DD3\u6527\u5DD4\u7672\u9F7B",
  "di\xE1n": "",
  "di\u01CEn": "\u5178\u594C\u70B9\u5A70\u655F\u6923\u8DD5\u7898\u84A7\u8547\u8E2E\u9EDE\u56B8",
  "di\xE0n": "\u7535\u963D\u576B\u5E97\u57AB\u6242\u73B7\u75C1\u94BF\u5A5D\u60E6\u6DC0\u5960\u7414\u6BBF\u75F6\u8714\u923F\u96FB\u588A\u58C2\u6A42\u6A5D\u6FB1\u975B\u78F9\u765C\u7C1F\u9A54",
  "di\u0101o": "\u5201\u53FC\u6C48\u521F\u866D\u51CB\u595D\u5F34\u5F6B\u86C1\u6906\u7431\u8C82\u7889\u9CED\u7797\u932D\u96D5\u9B89\u9CB7\u7C13\u9F26\u9BDB\u9D70",
  "di\u01CEo": "\u625A\u5C4C\u9CE5",
  "di\xE0o": "\u5F14\u4F04\u540A\u9493\u76C4\u7A8E\u8A0B\u6389\u91E3\u94DE\u94EB\u7D69\u921F\u7AE8\u84E7\u8A82\u929A\u92B1\u96FF\u9B61\u8ABF\u7639\u7AB5\u92FD\u85CB\u9443",
  "di\u0113": "\u7239\u8DCC\u893A",
  "di\xE9": "\u4F5A\u6022\u6CC6\u82F5\u8FED\u54A5\u57A4\u5CCC\u604E\u6315\u6633\u67E3\u7ED6\u80C5\u74DE\u7723\u800A\u5551\u621C\u7730\u8C0D\u558B\u581E\u5D3C\u5E49\u60F5\u63F2\u7573\u7D70\u800B\u81F7\u8A44\u8D83\u8DD5\u8EFC\u957B\u53E0\u696A\u6B9C\u7243\u7252\u8DEE\u5D7D\u789F\u8728\u890B\u69E2\u8253\u8776\u7582\u8ADC\u8E40\u9D29\u87B2\u9CBD\u97A2\u66E1\u7589\u9C08\u758A\u6C0E",
  "di\u011B": "",
  "di\xE8": "\u54CB",
  "d\u012Bng": "\u4EC3\u53EE\u5975\u5E04\u738E\u753C\u753A\u7594\u76EF\u8035\u8670\u914A\u91D8\u976A",
  "d\u01D0ng": "\u5975\u827C\u9876\u914A\u9802\u9F0E\u5D7F\u9F11\u6FCE\u85A1\u9424",
  "d\xECng": "\u8BA2\u5FCA\u9964\u77F4\u5B9A\u8A02\u91D8\u98E3\u5576\u639F\u8423\u94E4\u6917\u815A\u7887\u952D\u78A0\u8062\u874A\u92CC\u9320\u78F8\u9841",
  "di\u016B": "\u4E1F\u4E22\u94E5\u98A9\u92A9",
  "d\u014Dng": "\u4E1C\u51AC\u549A\u5CBD\u6771\u82F3\u6638\u6C21\u5032\u9E2B\u57EC\u5A3B\u5D2C\u5D20\u6DB7\u7B17\u83C4\u5F9A\u6C2D\u8740\u9B97\u9F15\u9BDF\u9D87\u9DAB",
  "d\u01D2ng": "\u63F0\u8463\u58A5\u5B1E\u61C2\u7BBD\u856B\u8ACC",
  "d\xF2ng": "\u52A8\u51BB\u4F97\u578C\u59DB\u5CD2\u606B\u630F\u680B\u6D1E\u72EA\u80E8\u8FF5\u51CD\u6219\u70D4\u80F4\u52D5\u5A3B\u5D20\u7850\u68DF\u6E69\u7D67\u8156\u50CD\u52ED\u71D1\u99E7\u9718",
  "d\u014Du": "\u543A\u6793\u4FB8\u5517\u515C\u5160\u8538\u6A77\u7797\u7BFC",
  "d\xF3u": "\u551E",
  "d\u01D2u": "\u4E67\u9627\u6296\u94AD\u9661\u86AA\u9204",
  "d\xF2u": "\u540B\u8C46\u90D6\u6D62\u72F5\u8373\u9017\u997E\u9B25\u68AA\u6BED\u6E0E\u8130\u9158\u75D8\u9597\u7AA6\u9B26\u92C0\u9916\u65A3\u7006\u95D8\u7AC7\u9B2A\u9B2C\u9B2D",
  "d\u016B": "\u53BE\u5262\u9607\u561F\u7763\u918F\u95CD",
  "d\xFA": "\u72EC\u6D9C\u6E0E\u691F\u724D\u728A\u88FB\u8AAD\u7368\u9316\u51DF\u5335\u5B3B\u7006\u6ADD\u6BB0\u7258\u72A2\u74C4\u76BE\u9A33\u9EE9\u8B80\u8C44\u8D15\u97E3\u9AD1\u945F\u97C7\u97E5\u9EF7\u8B9F",
  "d\u01D4": "\u7AFA\u7B03\u5835\u668F\u743D\u8D4C\u7779\u89A9\u8CED\u7BE4",
  "d\xF9": "\u828F\u5992\u675C\u59AC\u59E4\u8370\u79FA\u6675\u6E21\u976F\u9540\u8799\u6581\u6BAC\u934D\u8827\u8839",
  "du\u0101n": "\u8011\u5073\u526C\u5A8F\u7AEF\u890D\u9374",
  "du\u01CEn": "\u77ED",
  "du\xE0n": "\u6BB5\u65AD\u5845\u7F0E\u846E\u6934\u7145\u7456\u8176\u78AB\u953B\u7DDE\u6BC8\u7C16\u935B\u65B7\u8E96\u7C6A",
  "du\u012B": "\u5796\u5806\u5860\u75FD\u78D3\u9566\u9D2D\u9413\u941C",
  "du\u01D0": "\u554D\u9827",
  "du\xEC": "\u961F\u5BF9\u514A\u514C\u5BFE\u6778\u794B\u603C\u966E\u6553\u655A\u968A\u7893\u7D90\u5C0D\u619E\u619D\u6FE7\u6FFB\u85B1\u61DF\u7022\u7029\u8B48\u8B75\u8F5B",
  "d\u016Bn": "\u5428\u60C7\u8733\u58AA\u58AB\u58A9\u64B4\u7364\u5678\u6489\u6A54\u729C\u7905\u8E7E\u8E72\u9A50",
  "d\u01D4n": "\u76F9\u8DB8\u8E89",
  "d\xF9n": "\u4F05\u5749\u5E89\u5FF3\u6C8C\u7096\u76FE\u7818\u9007\u949D\u987F\u9041\u920D\u696F\u9813\u78B7\u906F\u619E\u6F61\u71C9\u8E32",
  "duo": "",
  "du\u014D": "\u591B\u591A\u5484\u54C6\u7553\u525F\u6387\u6560\u656A\u6BF2\u88F0\u8DE2\u5689",
  "du\xF3": "\u4EDB\u593A\u6CB0\u94CE\u526B\u6553\u655A\u55A5\u75E5\u922C\u596A\u51D9\u8E31\u9438",
  "du\u01D2": "\u6735\u6736\u54DA\u579C\u6306\u57F5\u5D1C\u7F0D\u88B3\u692F\u787E\u8D93\u8EB1\u8EB2\u7D9E\u4EB8\u8EC3\u9B0C\u56B2\u5972",
  "du\xF2": "\u6755\u675D\u5234\u5241\u67A4\u6CB2\u964A\u964F\u9973\u579C\u5C2E\u6306\u6305\u67C1\u67C2\u67EE\u6857\u8235\u968B\u5AA0\u60F0\u9693\u8DE2\u8DE5\u8DFA\u98FF\u99B1\u58AE\u619C\u99C4\u58AF\u96B3\u9D7D",
  "\u0113": "\u59B8\u59BF\u5A3F\u5A40\u5C59\u75FE",
  "\xE9": "\u8BB9\u542A\u56EE\u8FD7\u4FC4\u5CC9\u54E6\u5A25\u5CE9\u5CE8\u6D90\u83AA\u73F4\u8A1B\u7692\u774B\u920B\u9507\u9E45\u78C0\u8A90\u92E8\u981F\u989D\u9B64\u984D\u9D5E\u9D5D\u8B4C",
  "\u011B": "\u6799\u5A3F\u7828\u60E1\u980B\u5641\u9A00\u9D48",
  "\xE8": "\u5384\u6239\u6B7A\u5C8B\u9628\u5443\u627C\u82CA\u9638\u545D\u6799\u7810\u8F6D\u54A2\u54B9\u57A9\u59F6\u6D1D\u7808\u530E\u654B\u8685\u997F\u5054\u537E\u580A\u5A3E\u60AA\u7846\u8C14\u8EDB\u9102\u960F\u582E\u5828\u5D3F\u60E1\u6115\u6E42\u843C\u8C5F\u8EF6\u904C\u904F\u922A\u5EC5\u6415\u6424\u6439\u7427\u75F7\u816D\u50EB\u8741\u9537\u9E57\u855A\u907B\u981E\u989A\u9913\u5669\u64DC\u89A8\u8AE4\u95BC\u9929\u9354\u9CC4\u6B5E\u984E\u7918\u6AEE\u9C10\u9D9A\u9C2A\u8B8D\u9F43\u9469\u9F76\u9C77",
  "\u0113i": "\u8BF6\u6B38\u8A92",
  "\xE9i": "\u8BF6\u6B38\u8A92",
  "\u011Bi": "\u8BF6\u6B38\u8A92",
  "\xE8i": "\u8BF6\u6B38\u8A92",
  "\u0113n": "\u5940\u6069\u84BD\u717E",
  "\u011Bn": "\u5CCE",
  "\xE8n": "\u6441",
  "\u0113ng": "\u97A5",
  "\xE9r": "\u513F\u800C\u5150\u6752\u4F95\u5152\u9651\u5CCF\u6D0F\u800F\u834B\u682D\u80F9\u5532\u6895\u88BB\u9E38\u7CAB\u804F\u8F00\u9C95\u96AD\u9AF5\u9B9E\u9D2F\u8F5C",
  "\u011Br": "\u5C12\u5C13\u5C14\u8033\u8FE9\u6D31\u9975\u682E\u6BE6\u73E5\u94D2\u8848\u723E\u927A\u990C\u99EC\u85BE\u9087\u8DB0",
  "\xE8r": "\u4E8C\u5F0D\u5F10\u4F74\u5235\u54A1\u8D30\u8CAE\u8CB3\u8A80\u6A32\u9AF6",
  "f\u0101": "\u51B9\u6CB7\u767A\u767C\u5F42\u9197\u91B1",
  "f\xE1": "\u4E4F\u4F10\u59C2\u577A\u57A1\u6D4C\u75BA\u7F5A\u8337\u9600\u6830\u7B29\u50A0\u7B4F\u7782\u7F70\u95A5\u58A2\u7F78\u6A43\u85C5",
  "f\u01CE": "\u4F71\u6CD5\u5CDC\u781D\u9345\u704B",
  "f\xE0": "\u73D0\u743A\u9AEA\u855F\u9AEE",
  "f\u0101n": "\u5E06\u5FDB\u72BF\u62DA\u7568\u52EB\u5643\u5B0F\u5E61\u61A3\u65D9\u65DB\u7E59\u7FFB\u85E9\u8F53\u98BF\u7C53\u98DC\u9C55",
  "f\xE1n": "\u51E2\u51E3\u51E1\u5325\u674B\u67C9\u77FE\u7C75\u9492\u8224\u70E6\u8227\u7B32\u91E9\u68E5\u7169\u7DD0\u58A6\u6A0A\u8543\u71D4\u74A0\u81B0\u85A0\u894E\u7FB3\u8E6F\u703F\u792C\u8629\u9407\u9422\u881C\u9DED",
  "f\u01CEn": "\u53CD\u6255\u4EEE\u8FD4\u6A4E",
  "f\xE0n": "\u6C3E\u72AF\u597F\u6C4E\u6CDB\u996D\u8303\u8D29\u7548\u8A09\u8ED3\u5A4F\u6873\u68B5\u76D5\u7B35\u8CA9\u8EEC\u98F0\u98EF\u6EFC\u5B0E\u7BC4\u8F3D\u702A",
  "f\u0101ng": "\u531A\u65B9\u90A1\u6C78\u82B3\u678B\u7265\u794A\u94AB\u6DD3\u8684\u580F\u8DBD\u9201\u933A\u9D0B",
  "f\xE1ng": "\u9632\u59A8\u623F\u80AA\u57C5\u9C82\u9B74",
  "f\u01CEng": "\u4EFF\u8BBF\u5F77\u7EBA\u6609\u6618\u74EC\u7706\u5023\u65CA\u772A\u7D21\u822B\u8A2A\u9AE3\u9DAD",
  "f\xE0ng": "\u653E\u8DBD",
  "f\u0113i": "\u98DE\u5983\u975E\u98DB\u5561\u5A53\u5A54\u6E04\u7EEF\u6249\u6590\u6683\u7306\u975F\u88F6\u7DCB\u871A\u970F\u9CB1\u9925\u99A1\u9A11\u9A1B\u9BE1\u98DD",
  "f\xE9i": "\u80A5\u75BF\u6DDD\u8153\u75F1\u8730",
  "f\u011Bi": "\u670F\u80D0\u532A\u8BFD\u595C\u60B1\u6590\u68D0\u69A7\u7FE1\u855C\u8AB9\u7BDA",
  "f\xE8i": "\u5420\u72BB\u82BE\u5E9F\u676E\u67F9\u6CB8\u72D2\u80BA\u80CF\u6632\u80C7\u8D39\u4FF7\u5255\u539E\u75BF\u7829\u966B\u5C5D\u7B30\u8409\u5EC3\u8CBB\u75F1\u9544\u5EE2\u66CA\u6A43\u6A68\u7648\u9F23\u6FF7\u87E6\u6AE0\u9428\u9745",
  "f\u0113n": "\u5429\u5E09\u7EB7\u82AC\u6610\u6C1B\u73A2\u780F\u7AD5\u886F\u7D1B\u7FC2\u68A4\u68FB\u8A1C\u8EAE\u915A\u9216\u96F0\u999A\u6706\u9934\u9959",
  "f\xE9n": "\u5746\u575F\u59A2\u5C8E\u6C7E\u670C\u678C\u7083\u7F92\u86A0\u86A1\u68FC\u711A\u84B6\u96AB\u58B3\u5E69\u6FC6\u7356\u8561\u9B75\u9CFB\u6A68\u71CC\u71D3\u8C6E\u9F22\u7FB5\u9F16\u8C76\u8F52\u943C\u99A9\u9EC2",
  "f\u011Bn": "\u7C89\u9EFA",
  "f\xE8n": "\u574B\u5F05\u594B\u5FFF\u79CE\u507E\u6124\u7CAA\u50E8\u61A4\u7356\u7793\u596E\u6A68\u81B9\u7CDE\u9CBC\u7035\u9C5D",
  "f\u0113ng": "\u4E30\u4EF9\u51E8\u51EC\u5906\u59A6\u6CA3\u6CA8\u51EE\u67AB\u7090\u5C01\u75AF\u76FD\u781C\u98A8\u57C4\u5CF0\u5CEF\u8391\u5051\u687B\u70FD\u7412\u583C\u5D36\u6E22\u7326\u8451\u950B\u6953\u728E\u8702\u71A2\u760B\u78B8\u50FC\u7BC8\u9137\u92D2\u6A92\u8C50\u93BD\u93E0\u9146\u5BF7\u7043\u8634\u973B\u882D\u974A\u98CC\u9EB7",
  "f\xE9ng": "\u5906\u6D72\u9022\u5838\u6E84\u99AE\u6453\u6F28\u7D98\u8242\u7E2B",
  "f\u011Bng": "\u8BBD\u98A8\u8982\u552A\u8AF7",
  "f\xE8ng": "\u51E4\u5949\u4FF8\u687B\u6E57\u7128\u7148\u8D57\u9CEF\u9CF3\u9D0C\u7E2B\u8CF5",
  "f\xF3": "\u4ECF\u4EF8\u5772\u68BB",
  "f\u014Du": "",
  "f\xF3u": "\u7D11",
  "f\u01D2u": "\u7F36\u599A\u70B0\u7F39\u7F3B\u6B95\u96EC\u9D00",
  "f\u016B": "\u4F15\u909E\u544B\u598B\u6299\u59C7\u678E\u739E\u80A4\u6024\u67CE\u7806\u80D5\u8342\u886D\u5A10\u5C03\u634A\u8374\u65C9\u7408\u7D28\u8DBA\u915C\u9EB8\u7A03\u8DD7\u9207\u7B5F\u7D92\u911C\u5B75\u7CB0\u84F2\u6577\u819A\u9CFA\u9EA9\u7CD0\u9EAC\u9EB1\u61EF\u74B7",
  "f\xFA": "\u4E40\u5DFF\u5F17\u6255\u4F0F\u51EB\u7536\u521C\u5B5A\u6276\u82A3\u8299\u82BE\u5488\u59C7\u5B93\u5CAA\u5E17\u602B\u678E\u6CED\u7EC2\u7ECB\u82FB\u8300\u4FD8\u5798\u67B9\u67EB\u67ED\u6C1F\u6D11\u70A5\u73B8\u7549\u7550\u7953\u7F58\u80D5\u832F\u90DB\u97E8\u9CEC\u54F9\u57BA\u683F\u6D6E\u7557\u7829\u83A9\u86A8\u889A\u5310\u6874\u6DAA\u70F0\u7408\u7B26\u7B30\u7D31\u7D3C\u7FC7\u8274\u83D4\u8659\u88B1\u5E45\u68F4\u7D65\u7F66\u844D\u798F\u7D8D\u8240\u8709\u8F90\u9258\u925C\u98AB\u9CE7\u6991\u7A2A\u7B81\u7B99\u7CB0\u8914\u8C67\u97CD\u98B0\u5E5E\u6F93\u8760\u9AF4\u9D14\u8AE8\u8E3E\u8F3B\u9B84\u7641\u8946\u9BB2\u9EFB\u8965\u9D69\u7E80\u9D9D",
  "f\u01D4": "\u961D\u5452\u629A\u752B\u4E76\u5E9C\u5F23\u62CA\u65A7\u4FCC\u4FDB\u67CE\u90D9\u4FEF\u86A5\u91E1\u91DC\u636C\u812F\u8F85\u6928\u7124\u76D9\u8151\u6ECF\u8705\u8150\u8F14\u5638\u64AB\u982B\u9B34\u7C20\u9EFC",
  "f\xF9": "\u8BA3\u4ED8\u5987\u8D1F\u9644\u5490\u577F\u5F7F\u7ACE\u961C\u9A78\u590D\u5CCA\u67CE\u6D11\u7954\u8A03\u8CA0\u8D74\u86A5\u889D\u5069\u51A8\u5A4F\u5A66\u636C\u7D28\u86B9\u5085\u5A8D\u5BCC\u5FA9\u79FF\u842F\u86D7\u8984\u8A42\u8D4B\u6931\u7F1A\u8179\u9C8B\u6991\u79A3\u8907\u8914\u8D59\u7DEE\u8567\u875C\u876E\u8CE6\u99D9\u5B14\u7E1B\u8F39\u9B92\u8CFB\u9351\u9362\u9CC6\u8986\u99A5\u9C12",
  "g\u0101": "\u65EE\u4F3D\u593E\u560E\u5620",
  "g\xE1": "\u9486\u8ECB\u5C1C\u91D3\u560E\u5620\u5676\u9337",
  "g\u01CE": "\u5C15\u738D\u6712\u560E\u5620",
  "g\xE0": "\u5C2C\u9B40",
  "g\u0101i": "\u4F85\u8BE5\u90C2\u9654\u5793\u59DF\u5CD0\u8344\u6650\u8D45\u7561\u7974\u7D6F\u9691\u8A72\u8C65\u8CC5\u8CCC",
  "g\u01CEi": "\u5FCB\u6539\u7D60",
  "g\xE0i": "\u4E10\u4E62\u5304\u5303\u675A\u9499\u6461\u6E89\u8462\u9223\u6224\u6982\u69E9\u84CB\u6F11\u69EA\u74C2",
  "g\u0101n": "\u7518\u5FD3\u8FC0\u653C\u7395\u809D\u5481\u5769\u6CD4\u77F8\u82F7\u67D1\u73B5\u7AFF\u75B3\u9150\u7C93\u51F2\u5C32\u5C34\u7B78\u6F27\u9CF1\u5C36\u5C37\u9B50",
  "g\u01CEn": "\u4EE0\u8289\u76AF\u79C6\u8866\u8D76\u6562\u687F\u7A08\u611F\u6F89\u8D95\u6A44\u64C0\u6FB8\u7BE2\u7C33\u9CE1\u9C64",
  "g\xE0n": "\u4F44\u65F0\u6C75\u76F0\u7EC0\u501D\u51CE\u6DE6\u7D3A\u8A4C\u9AAD\u5E79\u69A6\u6A8A\u7C33\u8D11\u8D63\u8D1B\u7068",
  "g\u0101ng": "\u5188\u51AE\u521A\u7EB2\u809B\u5CA1\u7268\u7598\u77FC\u7F38\u525B\u7F61\u5808\u5D17\u6386\u91ED\u68E1\u7285\u583D\u6443\u7899\u7DB1\u7F41\u92FC\u93A0",
  "g\u01CEng": "\u5C97\u72BA\u5D17",
  "g\xE0ng": "\u7135\u7139\u7B7B\u69D3\u92FC\u6205\u6206\u6207",
  "g\u0101o": "\u768B\u7F94\u7F99\u9AD8\u7690\u9AD9\u81EF\u776A\u69D4\u777E\u69F9\u734B\u6A70\u7BD9\u7CD5\u993B\u6ADC\u97DF\u9DCE\u9F1B\u9DF1",
  "g\u01CEo": "\u5930\u6772\u83D2\u7A01\u641E\u7F1F\u69C0\u69C1\u7A3E\u7A3F\u9550\u7E1E\u85C1\u6ABA\u85F3\u93AC",
  "g\xE0o": "\u543F\u544A\u52C2\u8BF0\u90DC\u5CFC\u796E\u7970\u9506\u7B76\u799E\u8AA5\u92EF",
  "g\u0113": "\u6208\u4EE1\u572A\u6262\u72B5\u7EA5\u6213\u8090\u726B\u54AF\u7D07\u9979\u54E5\u88BC\u9E3D\u5272\u5F41\u6ED2\u6228\u6B4C\u9D1A\u64F1\u8B0C\u9D3F\u93B6",
  "g\xE9": "\u5444\u4F6E\u4F6B\u530C\u630C\u9601\u9769\u654B\u683C\u9B32\u6105\u7332\u81F5\u86D2\u88D3\u9694\u988C\u55DD\u5865\u6EC6\u89E1\u643F\u69C5\u8188\u95A3\u95A4\u7366\u9549\u9788\u97D0\u9ABC\u81C8\u8AFD\u8F35\u64F1\u9BA5\u9BAF\u6ACA\u9391\u9398\u97DA\u8F55\u97B7\u9A14",
  "g\u011B": "\u500B\u54FF\u7B34\u8238\u5605\u55F0\u84CB\u9C84",
  "g\xE8": "\u4E87\u5424\u8316\u867C\u500B\u784C\u94EC\u7B87\u927B",
  "g\u011Bi": "\u7D66",
  "g\u0113n": "\u6839\u8DDF",
  "g\xE9n": "\u54CF",
  "g\u011Bn": "",
  "g\xE8n": "\u4E99\u4E98\u826E\u831B\u63EF\u6404",
  "g\u0113ng": "\u522F\u5E9A\u754A\u6D6D\u8015\u83EE\u6929\u713F\u7D59\u7D5A\u8D53\u9E52\u7DEA\u7E06\u7FAE\u8CE1\u7FB9\u9D8A",
  "g\u011Bng": "\u90E0\u54FD\u57C2\u5CFA\u632D\u7EE0\u803F\u8384\u6897\u7D86\u9CA0\u9ABE\u9BC1",
  "g\xE8ng": "\u5829\u7DEA\u7E06",
  "g\u014Dng": "\u5DE5\u5F13\u516C\u53B7\u529F\u653B\u675B\u4F8A\u7CFF\u7CFC\u80B1\u5BAB\u7D05\u5BAE\u606D\u8EAC\u9F9A\u5311\u5868\u5E4A\u6129\u89E5\u8EB3\u6150\u5314\u78BD\u7BE2\u9AF8\u89F5\u9F8F\u9F94",
  "g\u01D2ng": "\u5EFE\u5DE9\u6C5E\u62F1\u551D\u62F2\u6831\u73D9\u55CA\u8F01\u6F92\u92BE\u978F",
  "g\xF2ng": "\u8D21\u7FBE\u551D\u8CA2\u55CA\u6129\u6150\u7195",
  "g\u014Du": "\u4F5D\u6C9F\u82B6\u94A9\u75C0\u88A7\u7F11\u920E\u6E9D\u9264\u7DF1\u8920\u7BDD\u7C3C\u97B2\u97DD",
  "g\u01D2u": "\u82B6\u5CA3\u72D7\u82DF\u67B8\u73BD\u8009\u8007\u7B31\u8008\u86BC\u8C7F",
  "g\xF2u": "\u5474\u5778\u6784\u8BDF\u8D2D\u57A2\u59E4\u5193\u5542\u5920\u591F\u508B\u8A3D\u5ABE\u5F40\u6406\u8A6C\u9058\u96CA\u69CB\u7179\u89CF\u6480\u7CD3\u89AF\u8CFC",
  "g\u016B": "\u675A\u5471\u5495\u59D1\u5B64\u6CBD\u6CD2\u82FD\u5DED\u5DEC\u67E7\u8F71\u5503\u5502\u7F5B\u9E2A\u7B1F\u83C7\u83F0\u86C4\u84C7\u89DA\u8EF1\u8EF2\u8F9C\u9164\u7A12\u9232\u78C6\u7B8D\u7B9B\u5AF4\u7BD0\u6A6D\u9B95\u9D23",
  "g\xFA": "",
  "g\u01D4": "\u5903\u53E4\u6262\u6287\u6C69\u8BC2\u8C37\u80A1\u726F\u7F5F\u7F96\u9027\u94B4\u50A6\u5552\u6DC8\u8135\u86CA\u55D7\u5C33\u6132\u8A41\u9989\u6BC2\u8CC8\u9237\u9F14\u9F13\u560F\u6996\u76B7\u9E58\u7A40\u7E0E\u7CD3\u85A3\u6FF2\u76BC\u81CC\u8F42\u9936\u6ACE\u7014\u76EC\u77BD\u9DBB\u8831",
  "g\xF9": "\u56FA\u6018\u6545\u51C5\u987E\u580C\u5D13\u5D2E\u688F\u727F\u68DD\u797B\u96C7\u69BE\u75FC\u9522\u50F1\u932E\u9CB4\u9BDD\u9867",
  "gu\u0101": "\u74DC\u522E\u5471\u80CD\u681D\u6870\u94E6\u9E39\u6B44\u7171\u98AA\u8D8F\u5280\u7DFA\u929B\u8AE3\u8E3B\u92BD\u98B3\u9D30\u9A27",
  "gu\xE1": "",
  "gu\u01CE": "\u518E\u53E7\u5459\u5471\u54BC\u5250\u526E\u5BE1",
  "gu\xE0": "\u5366\u576C\u8BD6\u6302\u5569\u639B\u7F63\u88BF\u7D53\u7F6B\u8902\u8A7F",
  "gu\u0101i": "\u4E56",
  "gu\xE1i": "\u53CF",
  "gu\u01CEi": "\u62D0\u67B4\u67FA\u7F6B\u7B89",
  "gu\xE0i": "\u592C\u602A\u6060",
  "gu\u0101n": "\u5173\u7EB6\u5B98\u77DC\u898C\u500C\u77DD\u839E\u6DAB\u68FA\u8484\u7AA4\u959E\u7DB8\u95A2\u761D\u764F\u89B3\u95D7\u9CCF\u95DC\u9C25\u89C0\u9C5E",
  "gu\u01CEn": "\u839E\u9986\u742F\u75EF\u7B66\u65A1\u7BA1\u8F28\u74AD\u8218\u9327\u9928\u9CE4",
  "gu\xE0n": "\u535D\u6BCC\u4E31\u8D2F\u6CF4\u898C\u60BA\u60EF\u63BC\u6DC9\u8CAB\u60B9\u797C\u6163\u645C\u6F45\u9066\u6A0C\u76E5\u7F46\u96DA\u89B3\u8E80\u93C6\u704C\u721F\u74D8\u77D4\u7936\u9E73\u7F50\u89C0\u9475\u6B1F\u9C79\u9E1B",
  "gu\u0101ng": "\u5149\u706E\u709A\u709B\u7097\u54A3\u5799\u59EF\u6304\u6D38\u832A\u6844\u70E1\u73D6\u80F1\u7844\u50D9\u8F04\u6F62\u92A7\u9EC6",
  "gu\u01CEng": "\u5E83\u72B7\u5EE3\u7377\u81E9",
  "gu\xE0ng": "\u4FC7\u6844\u901B\u81E6\u6497",
  "gu\u012B": "\u5F52\u572D\u59AB\u89C4\u90BD\u7688\u8325\u95FA\u5E30\u73EA\u80FF\u4E80\u7845\u7A90\u88BF\u898F\u5AAF\u5EC6\u691D\u7470\u90CC\u5AE2\u646B\u95A8\u9C91\u5B00\u5DB2\u69E3\u69FB\u69FC\u9CFA\u749D\u77A1\u9F9C\u9BAD\u5DC2\u6B78\u96DF\u9B36\u9A29\u6AF0\u6AF7\u74CC\u862C\u9B39",
  "gu\u01D0": "\u5B84\u6C3F\u6739\u8F68\u5E8B\u4F79\u5326\u8BE1\u9652\u579D\u59FD\u6051\u6531\u7678\u8ECC\u9B3C\u5EAA\u796A\u8ED3\u532D\u6677\u6E40\u86EB\u89E4\u8A6D\u53AC\u7C0B\u87E1",
  "gu\xEC": "\u6530\u523F\u523D\u660B\u7085\u6531\u8D35\u6842\u6867\u532E\u772D\u784A\u8DB9\u6922\u7324\u7B40\u8CB4\u6E8E\u84D5\u8DEA\u5331\u7786\u528A\u528C\u5DA1\u648C\u69F6\u879D\u6A3B\u6A9C\u77B6\u79AC\u7C02\u6AC3\u7650\u8958\u9400\u9CDC\u97BC\u944E\u9C56\u9C65",
  "g\u01D4n": "\u4E28\u886E\u60C3\u784D\u7EF2\u889E\u8F8A\u6EDA\u84D8\u88F7\u6EFE\u7DC4\u8509\u78D9\u7DF7\u8F25\u9CA7\u9B8C\u9BC0",
  "g\xF9n": "\u7754\u8B34",
  "guo": "",
  "gu\u014D": "\u5459\u54BC\u54B6\u57DA\u90ED\u556F\u581D\u5D1E\u6E26\u7313\u6947\u8052\u921B\u9505\u588E\u7611\u5613\u5F49\u6FC4\u8748\u934B\u5F4D\u87C8\u61D6\u77CC",
  "gu\xF3": "\u56D7\u56EF\u56F6\u56FB\u56FD\u5700\u654B\u5590\u570B\u5E3C\u63B4\u8158\u6451\u5E57\u6156\u6F0D\u805D\u852E\u8195\u8662\u7C02\u9998",
  "gu\u01D2": "\u679C\u60C8\u6DC9\u83D3\u9983\u6901\u8901\u69E8\u7CBF\u7DB6\u873E\u88F9\u8F20\u991C\u6ACE",
  "gu\xF2": "\u904E\u8142\u9439",
  "h\u0101": "\u867E\u7D26\u94EA\u927F\u8766",
  "h\xE1": "",
  "h\u01CE": "\u5964",
  "h\xE0": "",
  "h\u0101i": "\u548D\u55E8",
  "h\xE1i": "\u90C2\u5B69\u9AB8\u9084\u56A1",
  "h\u01CEi": "\u6D77\u80F2\u70F8\u5870\u917C\u91A2",
  "h\xE0i": "\u4EA5\u598E\u62F8\u9A87\u5BB3\u6C26\u7332\u7D6F\u55D0\u9900\u99ED\u99F4\u995A",
  "han": "\u516F\u7233",
  "h\u0101n": "\u72B4\u4F44\u9878\u54FB\u86B6\u9163\u9807\u5AE8\u8C3D\u61A8\u99A0\u9B7D\u6B5B\u9F3E",
  "h\xE1n": "\u9097\u542B\u6C75\u90AF\u51FD\u80A3\u51FE\u8677\u5505\u5705\u5A22\u6D5B\u7B12\u5D21\u6657\u6892\u6DB5\u7113\u7400\u5BD2\u5D45\u97E9\u6937\u751D\u7B68\u99AF\u872C\u6F8F\u92E1\u97D3",
  "h\u01CEn": "\u4E06\u7F55\u6D6B\u558A\u8C43\u95DE",
  "h\xE0n": "\u4EE0\u5388\u6C49\u5C7D\u5FD3\u625E\u95EC\u653C\u65F0\u65F1\u80A3\u5505\u57BE\u608D\u634D\u6D86\u7302\u839F\u6658\u710A\u83E1\u91EC\u9588\u7694\u7745\u50BC\u86FF\u9894\u99AF\u6496\u6F22\u850A\u872D\u9CF1\u66B5\u71AF\u8F1A\u92B2\u92CE\u61BE\u64BC\u7FF0\u8792\u9837\u9844\u99FB\u8B40\u96D7\u701A\u9DBE",
  "h\u0101ng": "",
  "h\xE1ng": "\u909F\u5994\u82C0\u8FD2\u65BB\u676D\u57B3\u7ED7\u6841\u7B10\u822A\u86A2\u9883\u88C4\u8CA5\u7B55\u7D4E\u980F\u9B67",
  "h\xE0ng": "\u5FFC\u6C86\u7B10",
  "h\u0101o": "\u8320\u84BF\u5686\u8585\u85A7",
  "h\xE1o": "\u4E5A\u6BDC\u547A\u7AD3\u768B\u869D\u6BEB\u6903\u55E5\u7346\u865F\u8C89\u5651\u7354\u8C6A\u5637\u734B\u8AD5\u512B\u568E\u58D5\u6FE0\u7C47\u8814\u8B79",
  "h\u01CEo": "\u90DD",
  "h\xE0o": "\u660A\u4FB4\u6626\u79CF\u54E0\u604F\u608E\u6D69\u8017\u6667\u6DCF\u5090\u7693\u9117\u6EC8\u6EDC\u8055\u865F\u66A0\u66A4\u66AD\u6F94\u769C\u769E\u9550\u66CD\u76A1\u8583\u76A5\u85C3\u93AC\u98A2\u704F\u9865\u9C1D\u705D",
  "h\u0113": "\u8BC3\u62B2\u6B31\u8A36\u55EC\u881A",
  "h\xE9": "\u79BE\u7EA5\u5459\u52BE\u548A\u54BC\u59C0\u6CB3\u90C3\u5CC6\u66F7\u67C7\u72E2\u76C7\u7C7A\u7D07\u9602\u9978\u6546\u76C9\u76CD\u8377\u91DB\u555D\u6DB8\u6E2E\u76D2\u83CF\u8402\u9F81\u559B\u60D2\u7CAD\u8A38\u988C\u6941\u6BFC\u6F95\u84CB\u8A65\u8C88\u8C89\u924C\u9616\u9C84\u6705\u7186\u95A1\u95A4\u9904\u9E56\u9EA7\u5648\u981C\u7BD5\u7FEE\u879B\u9B7A\u7909\u95D4\u97A8\u9F55\u8988\u9DA1\u76AC\u9449\u9FA2",
  "h\u011B": "",
  "h\xE8": "\u548A\u62B2\u578E\u8D3A\u54EC\u8894\u96BA\u5BC9\u7103\u60D2\u7332\u8CC0\u55C3\u7142\u788B\u7187\u8910\u8D6B\u9E64\u7FEF\u5687\u58D1\u764B\u8B1E\u71FA\u7200\u9DAE\u9DB4\u974D\u974E\u9E16\u974F",
  "h\u0113i": "\u9ED2\u9ED1\u55E8\u6F76",
  "h\xE9n": "\u62EB\u75D5\u978E",
  "h\u011Bn": "\u4F77\u54CF\u5F88\u72E0\u8A6A\u5677",
  "h\xE8n": "\u6068\u5677",
  "h\u0113ng": "\u4EA8\u54FC\u6099\u6DA5\u811D",
  "h\xE9ng": "\u59EE\u6046\u6052\u6841\u70C6\u73E9\u80FB\u9E3B\u6497\u6A6B\u8861\u9D34\u9D46\u8605\u9445",
  "h\xE8ng": "\u6099\u5548\u6A6B",
  "hng": "\u54FC",
  "h\u014Dng": "\u53FF\u543D\u544D\u7074\u8F70\u8A07\u70D8\u8EE3\u63C8\u6E39\u7122\u7861\u8C3E\u85A8\u8F37\u569D\u9367\u5DC6\u8F5F",
  "h\xF3ng": "\u53B7\u4EDC\u5F18\u53FF\u5985\u5C78\u5430\u5B8F\u6C6F\u7392\u74E8\u7EAE\u95F3\u5B96\u6CD3\u739C\u82F0\u57AC\u5A02\u6C97\u6D2A\u7AD1\u7D05\u7FBE\u836D\u8679\u6D64\u6D72\u7D18\u7FC3\u803E\u7854\u7D2D\u8C39\u9E3F\u6E31\u6E84\u7AE4\u7CA0\u8453\u8452\u921C\u958E\u7D8B\u7FDD\u8C3C\u6F42\u9277\u9783\u9B5F\u7BCA\u92D0\u5F4B\u9710\u9EC9\u971F\u9D3B\u9ECC",
  "h\u01D2ng": "\u551D\u664E\u55CA\u6129\u6150",
  "h\xF2ng": "\u8BA7\u8A0C\u95A7\u6494\u6F92\u92BE\u857B\u95C2\u9B28\u95C0",
  "h\u014Du": "\u9F41",
  "h\xF3u": "\u77E6\u9107\u5589\u5E3F\u7334\u8454\u760A\u777A\u9297\u7BCC\u7CC7\u7FED\u9ABA\u7FF5\u936D\u9931\u9BF8",
  "h\u01D2u": "\u543C\u543D\u72BC\u5474",
  "h\xF2u": "\u540E\u90C8\u539A\u5795\u5F8C\u6D09\u77E6\u8329\u9005\u5019\u5820\u8C5E\u9C8E\u9C98\u9B9C\u9C5F",
  "h\u016B": "\u4E4E\u4E6F\u5322\u864D\u82B4\u547C\u5780\u5FFD\u6612\u66F6\u6CD8\u82F8\u6057\u70C0\u8294\u8F77\u532B\u553F\u60DA\u6DF4\u8656\u8EE4\u96FD\u5611\u5BE3\u6EF9\u96D0\u5E60\u622F\u6B51\u6231\u81B4\u6232\u8B3C",
  "h\xFA": "\u56EB\u6287\u5F27\u72D0\u74F3\u80E1\u58F6\u96BA\u58F7\u659B\u7100\u5596\u58FA\u5AA9\u6430\u6E56\u7322\u7D57\u846B\u9E44\u695C\u7173\u745A\u74E1\u561D\u851B\u9E55\u9E58\u69F2\u7BB6\u7E0E\u8774\u885A\u9B71\u7E20\u879C\u9190\u9836\u89F3\u9378\u992C\u7910\u9D60\u702B\u9B0D\u9C17\u9D98\u9DA6\u9DBB\u9DAE",
  "h\u01D4": "\u4E55\u6C7B\u864E\u6D52\u4FFF\u6DF2\u8400\u7425\u865D\u6EF8\u933F\u9BF1",
  "h\xF9": "\u4E92\u5F16\u6236\u6238\u6237\u51B1\u8290\u5E0D\u62A4\u6C8D\u6CAA\u5CB5\u6019\u623D\u6608\u66F6\u6791\u59F1\u6018\u795C\u7B0F\u7C90\u5A5F\u6248\u74E0\u695B\u55C3\u55C0\u7D94\u9120\u96FD\u5AED\u5AEE\u6462\u6EEC\u8530\u69F4\u71A9\u9CF8\u6FE9\u7C04\u8C70\u9359\u569B\u9E71\u89F7\u8B77\u9CE0\u9800\u9C6F\u9E0C",
  "hu\u0101": "\u542A\u82B2\u82B1\u7809\u57D6\u5A72\u83EF\u691B\u7874\u848A\u5629\u7CC0\u8AAE\u9335\u8624",
  "hu\xE1": "\u545A\u59E1\u9A85\u83EF\u91EA\u91EB\u94E7\u6ED1\u733E\u5629\u6433\u64B6\u5283\u78C6\u8550\u8796\u92D8\u8B41\u93F5\u9A4A\u9DE8",
  "hu\xE0": "\u593B\u6779\u67A0\u753B\u8BDD\u5D0B\u6866\u83EF\u5A73\u756B\u5B05\u7575\u89DF\u8A71\u5283\u6466\u6A3A\u5AFF\u69EC\u6F85\u8AD9\u8AE3\u9ECA\u7E63\u8219\u8B6E",
  "hu\xE1i": "\u6000\u4F6A\u5F8A\u6DEE\u69D0\u8922\u8E1D\u61D0\u8931\u61F7\u7024\u6AF0\u8032\u8639",
  "hu\xE0i": "\u54B6\u58CA\u58DE\u863E",
  "hu\u0101n": "\u6B22\u72BF\u72DF\u8C86\u6B53\u9D05\u61C1\u9D4D\u9144\u56BE\u5B49\u61FD\u737E\u6B61\u8B99\u8C9B\u9A69",
  "hu\xE1n": "\u73AF\u90C7\u5CD8\u6D39\u72DF\u8341\u57B8\u6853\u8408\u8411\u581A\u5BCF\u7D59\u96C8\u7342\u7D84\u7FA6\u849D\u8C86\u953E\u778F\u571C\u5B1B\u5BF0\u6FB4\u7F33\u9084\u961B\u74B0\u8C72\u9370\u96DA\u956E\u9E6E\u7CEB\u7E6F\u9436\u95E4\u9B1F\u74DB",
  "hu\u01CEn": "\u7746\u7F13\u7DE9",
  "hu\xE0n": "\u5E7B\u5942\u8092\u5950\u5BA6\u5524\u6362\u6D63\u6DA3\u70C9\u60A3\u6899\u7115\u902D\u559A\u559B\u5D48\u610C\u63DB\u6E19\u75EA\u7165\u744D\u7D84\u8C62\u6F36\u7613\u69F5\u9CA9\u64D0\u6FA3\u85E7\u9BC7\u650C\u56BE\u8F58\u9BF6\u9C00",
  "hu\u0101ng": "\u5DDF\u8093\u8352\u8841\u5BBA\u671A\u5843\u614C",
  "hu\xE1ng": "\u7687\u505F\u51F0\u968D\u9EC4\u55A4\u582D\u5A93\u5D32\u5FA8\u60F6\u63D8\u6E5F\u845F\u9051\u9EC3\u697B\u714C\u745D\u58B4\u6F62\u735A\u953D\u71BF\u749C\u7BC1\u824E\u8757\u7640\u78FA\u7A54\u8AFB\u7C27\u87E5\u9360\u992D\u9CC7\u8DAA\u97F9\u9404\u9A1C\u9C09\u9C51\u9DEC",
  "hu\u01CEng": "\u6C7B\u6033\u604D\u70BE\u5BBA\u6644\u595B\u8C0E\u5E4C\u8A64\u7180\u71BF\u7E28\u8B0A\u5164\u6ACE\u720C",
  "hu\xE0ng": "\u6130\u6EC9\u69A5\u66C2\u769D\u93A4\u76A9",
  "hui": "",
  "hu\u012B": "\u7070\u7073\u8BD9\u54B4\u6062\u62FB\u6325\u6D03\u867A\u8886\u6656\u70E3\u73F2\u8C57\u5A4E\u5A88\u63EE\u7FDA\u8F89\u9693\u6689\u6932\u694E\u7147\u743F\u7762\u7988\u8A7C\u58AE\u5E51\u7773\u8918\u5645\u5655\u649D\u7FEC\u8F1D\u9EBE\u5FBD\u96B3\u7008\u8633\u5B48\u9C34",
  "hu\xED": "\u56D8\u56DE\u56EC\u4F6A\u5EFB\u5EFD\u605B\u6D04\u8334\u8FF4\u70E0\u8698\u9025\u75D0\u7F0B\u86D5\u86D4\u8716\u85F1\u9BB0\u7E62",
  "hu\u01D0": "\u867A\u6094\u70E0\u6BC0\u6BC1\u879D\u6BC7\u6A93\u71EC\u8B6D",
  "hu\xEC": "\u5349\u5C77\u5C76\u6C47\u8BB3\u6CCB\u54D5\u6D4D\u7ED8\u8294\u835F\u8BF2\u605A\u6075\u6867\u70E9\u8D3F\u5F57\u6666\u79FD\u5599\u5EC6\u60E0\u6E4F\u7D75\u7F0B\u7FD9\u9613\u532F\u5F5A\u5F59\u6703\u6ED9\u8A6F\u8CC4\u9892\u50E1\u5612\u7623\u8527\u8AA8\u928A\u571A\u5BED\u6167\u6193\u66B3\u69E5\u6F53\u6F70\u8559\u5666\u5B12\u5FBB\u6A5E\u6BA8\u6FAE\u6FCA\u7369\u74A4\u8588\u8589\u8AF1\u982E\u6A85\u6A9C\u71F4\u74AF\u7BF2\u85F1\u992F\u5696\u61F3\u77BA\u7A62\u7E62\u87EA\u6AD8\u7E6A\u7FFD\u8B53\u5136\u93F8\u95E0\u942C\u9767\u8B7F\u986A",
  "h\u016Bn": "\u660F\u662C\u8364\u5A5A\u60DB\u6DBD\u7104\u960D\u68D4\u6B99\u6E63\u8477\u7767\u776F\u8512\u95BD\u8F4B",
  "h\xFAn": "\u5FF6\u6D51\u73F2\u9984\u6E3E\u6E77\u743F\u9B42\u991B\u9F32",
  "h\u01D4n": "",
  "h\xF9n": "\u8BE8\u4FD2\u7703\u5031\u5702\u5A6B\u638D\u711D\u6EB7\u5C21\u6141\u7774\u89E8\u8AE2",
  "hu\u014D": "\u5419\u79F4\u8020\u5290\u6509\u9A1E",
  "hu\xF3": "\u4F78\u59E1\u6D3B\u79EE\u79F3\u8D8F",
  "hu\u01D2": "\u706C\u706B\u4F19\u90A9\u94AC\u9225\u6F37\u7177\u5925",
  "hu\xF2": "\u6C8E\u6216\u8D27\u549F\u4FF0\u6347\u7713\u83B7\u9584\u5268\u5590\u639D\u7978\u8CA8\u60D1\u65E4\u6E71\u798D\u6F37\u7AA2\u84A6\u952A\u5684\u596F\u64ED\u6FCA\u6FE9\u7372\u7BE7\u9343\u970D\u6AB4\u8B0B\u96D8\u77C6\u790A\u7A6B\u956C\u56AF\u5F5F\u7016\u802F\u8267\u85FF\u8816\u56BF\u66E4\u81DB\u7668\u77D0\u944A\u97C4\u9743\u5F60",
  "j\u012B": "\u4E0C\u8BA5\u51FB\u5209\u53FD\u9965\u4E69\u520F\u573E\u673A\u7391\u808C\u82A8\u77F6\u9E21\u6785\u82D9\u54AD\u525E\u5527\u59EC\u5C50\u79EF\u7B04\u98E2\u57FA\u5EB4\u559E\u5D46\u5D47\u5E7E\u6532\u6567\u671E\u7284\u7B53\u7F09\u8D4D\u55D8\u7578\u7A18\u8DFB\u9CEE\u50DF\u6BC4\u7B95\u7DA8\u7DC1\u9288\u5630\u6483\u69E3\u6A2D\u757F\u7DDD\u89ED\u8AC5\u8CEB\u8E11\u8EB8\u9F51\u58BC\u64BD\u6A5F\u6FC0\u74A3\u79A8\u7A4D\u9324\u96AE\u61E0\u64CA\u78EF\u7C0A\u7F81\u8CF7\u6AC5\u802D\u96DE\u8B4F\u97F2\u9D8F\u8B64\u9416\u9951\u766A\u8E8B\u97BF\u9B55\u9DBA\u9DC4\u7F87\u8640\u9447\u8989\u9459\u9F4F\u7F88\u9E04\u898A",
  "j\xED": "\u4E41\u4EBD\u4EBC\u53CA\u5C10\u4F0B\u5409\u5C8C\u5F76\u5FE3\u6C72\u7EA7\u5373\u6781\u7680\u4E9F\u4F76\u8BD8\u90C6\u537D\u53DD\u59DE\u6025\u768D\u7B08\u7D1A\u5832\u63E4\u75BE\u89D9\u506E\u5359\u5536\u6956\u6DC1\u710F\u8C3B\u6222\u68D8\u6975\u6B9B\u6E52\u96C6\u5849\u5AC9\u6131\u696B\u84BA\u874D\u8D8C\u8F91\u69C9\u8024\u818C\u92A1\u5DAF\u6F57\u6FC8\u7620\u7BBF\u8540\u857A\u8AD4\u8D9E\u8E16\u978A\u9E61\u6A9D\u878F\u8F2F\u78FC\u7C0E\u85C9\u894B\u8E50\u9353\u8265\u7C4D\u8F5A\u93F6\u9735\u9F4E\u8EA4\u96E7",
  "j\u01D0": "\u5DF1\u4E2E\u5980\u5C70\u72B1\u6CF2\u866E\u6324\u810A\u638E\u6E08\u9C7E\u5E7E\u621F\u7D66\u5D74\u9E82\u9B62\u64A0\u61BF\u6A76\u64E0\u6FDF\u7A56\u87E3",
  "j\xEC": "\u5F50\u5F51\u65E1\u8BA1\u8BB0\u4F0E\u5756\u5993\u5FCC\u6280\u6C65\u82B0\u9645\u5242\u5B63\u54DC\u578D\u65E2\u6D0E\u7D00\u830D\u8324\u8360\u8A08\u8FF9\u5264\u755F\u7D12\u7EE7\u89CA\u8A18\u5048\u5BC4\u5BC2\u5E3A\u5F9B\u60B8\u65E3\u689E\u6E08\u7EE9\u5848\u60CE\u81EE\u846A\u8507\u517E\u52E3\u75F5\u7D99\u84DF\u88DA\u8DE1\u969B\u9B3E\u9B5D\u6456\u66A8\u6F03\u6F08\u799D\u7A29\u7A4A\u8A8B\u8DFD\u9701\u9B65\u9C9A\u66A9\u7789\u7A37\u8AC5\u9CAB\u5180\u5291\u66C1\u79A8\u7A44\u858A\u8940\u9AFB\u568C\u61E0\u6A95\u6FDF\u7A56\u7E3E\u7E4B\u7F7D\u85BA\u89AC\u9B86\u6AB5\u6AC5\u6AED\u74BE\u8E5F\u9BFD\u9D4B\u9F4C\u5EED\u61FB\u7660\u7A67\u7E6B\u860E\u9AA5\u9BDA\u7031\u7E7C\u862E\u9C40\u863B\u973D\u9C36\u9C3F\u9DD1\u9C6D\u9A65",
  "jia": "",
  "ji\u0101": "\u52A0\u4E6B\u4F3D\u593E\u5B8A\u62B8\u4F73\u62C1\u6CC7\u5F8D\u67B7\u6BE0\u6D43\u73C8\u54FF\u57C9\u633E\u6D79\u75C2\u689C\u7B33\u801E\u8888\u50A2\u7333\u846D\u8DCF\u6935\u728C\u8175\u926B\u5609\u64D6\u9553\u7CD8\u8C6D\u8C91\u9D10\u93B5\u9E9A",
  "ji\xE1": "\u573F\u593E\u5FE6\u6274\u90CF\u62EE\u835A\u90DF\u550A\u605D\u83A2\u621B\u8125\u88B7\u94D7\u621E\u7330\u86F1\u88CC\u9889\u988A\u86FA\u92CF\u982C\u9830\u9D36\u9D4A",
  "ji\u01CE": "\u7532\u5CAC\u53DA\u73BE\u80DB\u659A\u94BE\u5A7D\u5FA6\u659D\u6935\u8CC8\u9240\u698E\u69DA\u7615\u6A9F",
  "ji\xE0": "\u9A7E\u67B6\u5AC1\u5E4F\u8CC8\u69A2\u50F9\u7A3C\u99D5",
  "ji\u0101n": "\u620B\u5978\u5C16\u5E75\u575A\u6B7C\u51BF\u6214\u73AA\u80A9\u8270\u59E7\u59E6\u517C\u5805\u5E34\u60E4\u730F\u7B3A\u83C5\u83FA\u8C5C\u5094\u63C3\u6E54\u724B\u728D\u7F04\u844C\u9592\u9593\u96C3\u976C\u641B\u6937\u693E\u714E\u744A\u7777\u788A\u7F23\u84B9\u8C63\u6F38\u76E3\u7B8B\u852A\u6A2B\u719E\u7A34\u7DD8\u8551\u8573\u92D1\u9CA3\u9CFD\u9E63\u71B8\u7BEF\u7E11\u92FB\u8271\u97AC\u9930\u99A2\u9E89\u7010\u6FFA\u97AF\u9CD2\u9D51\u6BB1\u791B\u7C48\u9D73\u6515\u7038\u9C14\u6AFC\u6BB2\u8B7C\u9C1C\u9DBC\u7937\u7C5B\u97C0\u9C39\u56CF\u8643\u946F\u97C9",
  "ji\u01CEn": "\u56DD\u62E3\u67A7\u4FED\u67EC\u8327\u5039\u6338\u6361\u7B15\u51CF\u526A\u5E34\u63F5\u6898\u68C0\u6E55\u8DBC\u583F\u63C0\u63C3\u691C\u6E1B\u7751\u7877\u88E5\u8A43\u950F\u5F3F\u6695\u7450\u7B67\u7B80\u7D78\u8C2B\u5F45\u6229\u622C\u78B1\u5109\u7FE6\u92C4\u64BF\u6A4F\u7BEF\u6AA2\u85C6\u8947\u8949\u8B07\u8E47\u77BC\u7906\u7C21\u7E6D\u8B2D\u93AB\u9B0B\u9C0E\u9E78\u703D\u8812\u9417\u9427\u9E7B\u7C5B\u8B7E\u897A\u9E7C",
  "ji\xE0n": "\u4EF6\u898B\u4F9F\u5EFA\u996F\u5251\u6D0A\u726E\u8350\u8D31\u4FF4\u5065\u5263\u682B\u6DA7\u73D4\u8230\u5271\u5FA4\u63F5\u88B8\u8C0F\u91F0\u91FC\u5BCB\u65D4\u6701\u6957\u6BFD\u8171\u81F6\u8DC8\u8DF5\u9592\u9593\u8CCE\u9274\u952E\u50E3\u50ED\u6997\u69DB\u6F38\u76E3\u528E\u528D\u58B9\u6F97\u7BAD\u7CCB\u8AD3\u8CE4\u8D9D\u8E10\u8E3A\u5292\u5294\u85A6\u8AEB\u92FB\u9375\u991E\u77B7\u77AF\u78F5\u7900\u87B9\u9373\u97AC\u64F6\u6ABB\u6FFA\u7E5D\u7033\u89B5\u89B8\u8B5B\u93E9\u807B\u8266\u8F5E\u9431\u9452\u9451\u946C\u9473",
  "ji\u0101ng": "\u6C5F\u59DC\u8333\u7555\u8C47\u5C07\u8441\u757A\u646A\u7FDE\u50F5\u6F3F\u8780\u58C3\u7F30\u8591\u6A7F\u6BAD\u87BF\u9CC9\u7585\u7913\u7E6E\u97C1\u9C42",
  "ji\u01CEng": "\u8BB2\u5956\u6868\u508B\u5842\u848B\u5968\u596C\u8523\u69F3\u734E\u8029\u8199\u8B1B\u985C",
  "ji\xE0ng": "\u531E\u5320\u5905\u5F1C\u6D1A\u7EDB\u5C07\u5F36\u5F37\u7D73\u757A\u9171\u52E5\u6EF0\u5D79\u647E\u6F3F\u5F4A\u729F\u7CE1\u91A4\u7CE8\u91AC\u6AE4\u8B3D",
  "ji\u0101o": "\u827D\u4EA4\u90CA\u59E3\u5A07\u5CE7\u6D47\u832E\u832D\u9A84\u80F6\u654E\u55AC\u6912\u7126\u86DF\u8DE4\u50EC\u5610\u8660\u9C9B\u5B0C\u5D95\u5DA3\u618D\u61A2\u6F86\u81A0\u8549\u71CB\u81B2\u7901\u7A5A\u9BAB\u9D41\u9E6A\u7C25\u87ED\u8F47\u940E\u9A55\u9DE6\u9DEE",
  "ji\xE1o": "\u77EF",
  "ji\u01CEo": "\u81EB\u4F7C\u6054\u6322\u72E1\u7EDE\u997A\u6341\u6648\u70C4\u7B05\u768E\u811A\u91E5\u94F0\u6405\u6E6B\u7B4A\u7D5E\u52E6\u656B\u6E6C\u714D\u8173\u8CCB\u50E5\u644E\u6477\u669E\u8E0B\u9278\u9903\u510C\u528B\u5FBA\u649F\u64B9\u6A14\u5FBC\u61BF\u657D\u657F\u71DE\u66D2\u74AC\u77EF\u76A6\u87DC\u7E73\u8B51\u5B42\u7E90\u652A\u705A\u9C4E\u9FA3",
  "ji\xE0o": "\u53EB\u544C\u5CE4\u630D\u8A06\u608E\u73D3\u7A8C\u7B05\u8F7F\u8F83\u654E\u658D\u8990\u7A96\u7B4A\u899A\u6ED8\u8F03\u5602\u5604\u5626\u65A0\u6F16\u9175\u564D\u5DA0\u6F50\u566D\u5B13\u5FBC\u7365\u7644\u85E0\u8DAD\u8F4E\u91AE\u7042\u89BA\u8B65\u76AD\u91C2",
  "jie": "\u50F9",
  "ji\u0113": "\u9636\u7596\u54DC\u7686\u8893\u63A5\u63B2\u75CE\u79F8\u83E8\u968E\u5588\u55BC\u55DF\u5826\u5A98\u5AC5\u6904\u6E5D\u7D50\u813B\u8857\u88D3\u696C\u716F\u744E\u7A2D\u9782\u64D1\u8754\u568C\u7664\u8B2F\u9D9B",
  "ji\xE9": "\u5369\u536A\u5B51\u5C10\u8BA6\u6262\u5227\u5226\u52AB\u5C8A\u6605\u6762\u523C\u52BC\u6770\u758C\u8871\u8BD8\u62EE\u6D01\u72E4\u8FFC\u5022\u6840\u6854\u685D\u6D2F\u7D12\u83AD\u8A10\u5048\u507C\u5551\u5A55\u5D28\u6377\u63B6\u88B7\u88BA\u5091\u5AAB\u5D51\u7D50\u7D5C\u86E3\u9889\u5D65\u6429\u6976\u6ED0\u776B\u7BC0\u8710\u8A70\u8D8C\u8DF2\u9263\u622A\u69A4\u78A3\u7AED\u84F5\u9C92\u5DB1\u6F54\u7FAF\u8AB1\u8E15\u957C\u978A\u9821\u5E6F\u64F3\u5DBB\u64EE\u790D\u937B\u9B9A\u5DC0\u881E\u8818\u883D",
  "ji\u011B": "\u59D0\u6BD1\u5A8E\u89E7\u98F7\u6A9E",
  "ji\xE8": "\u4E2F\u4ECB\u5424\u598E\u5C95\u5E8E\u6212\u5C46\u5C4A\u65BA\u73A0\u754D\u754C\u75A5\u780E\u8878\u8BEB\u501F\u6088\u7D12\u86A7\u5536\u5FA3\u583A\u6950\u743E\u86F6\u89E7\u9AB1\u7297\u8024\u8AA1\u892F\u9B6A\u5DB0\u85C9\u9385\u9DA1",
  "j\u012Bn": "\u5DFE\u4ECA\u4ED0\u65A4\u9485\u7AFB\u91D2\u91D1\u6D25\u77DC\u781B\u8355\u887F\u89D4\u57D0\u73D2\u77DD\u7D1F\u60CD\u740E\u83F3\u583B\u743B\u7B4B\u91FF\u74A1\u9E76\u9EC5\u895F",
  "j\u01D0n": "\u4FAD\u537A\u5DF9\u7D27\u5807\u5A5C\u83EB\u50C5\u53AA\u8C28\u9526\u5AE4\u5ED1\u616C\u6F0C\u7DCA\u84F3\u9991\u69FF\u747E\u5118\u9326\u8B39\u9949",
  "j\xECn": "\u4F12\u52A4\u5997\u8FD1\u8FDB\u6783\u52C1\u6D55\u8369\u6649\u664B\u6D78\u70EC\u7B12\u7D1F\u8D46\u552B\u7972\u9032\u7161\u81F8\u50C5\u5BD6\u6422\u6E8D\u7F19\u9773\u5890\u5AE4\u616C\u6997\u7468\u76E1\u99B8\u50F8\u51DA\u6B4F\u6BA3\u89D0\u5664\u5B10\u6FC5\u7E09\u8CEE\u568D\u58D7\u5B27\u6FDC\u85CE\u71FC\u74B6\u89B2\u8D10\u9F7D",
  "j\u012Bng": "\u5755\u5759\u5DE0\u4EAC\u6CFE\u7ECF\u830E\u4EB0\u79D4\u834A\u8346\u6D87\u7C87\u5A5B\u60CA\u65CD\u65CC\u7304\u7D4C\u83C1\u6676\u7A09\u8148\u844F\u775B\u7CB3\u7D93\u5162\u7B90\u7CBE\u7DA1\u8059\u92DE\u6A78\u9CB8\u9BE8\u9D81\u9D84\u9E96\u9F31\u9A5A\u9EA0",
  "j\u01D0ng": "\u4E95\u4E3C\u9631\u522D\u5753\u5B91\u6C6B\u6C6C\u80BC\u5244\u7A7D\u6B8C\u5106\u981A\u5E5C\u61AC\u64CF\u6F8B\u7484\u61BC\u66BB\u749F\u74A5\u9838\u87FC\u8B66",
  "j\xECng": "\u52A4\u598C\u5F2A\u5F84\u8FF3\u4FD3\u52C1\u5A59\u6D44\u80EB\u501E\u51C8\u5F33\u5F91\u75C9\u7ADE\u8396\u9015\u5A67\u6871\u68B7\u6B91\u6DE8\u7ADF\u7AEB\u811B\u656C\u75D9\u7AE7\u9753\u50B9\u9756\u5883\u734D\u8AA9\u8E01\u9759\u975A\u61BC\u66D4\u955C\u975C\u701E\u9D5B\u93E1\u7AF6\u7AF8",
  "ji\u014Dng": "\u5182\u518B\u5770\u6243\u57DB\u6244\u6D7B\u7D45\u9284\u99C9\u99EB\u860F\u8614",
  "ji\u01D2ng": "\u518F\u56E7\u6CC2\u7085\u8FE5\u4FB0\u70AF\u9008\u6D7B\u70F1\u7D45\u715A\u7A98\u988E\u7D97\u81E6\u50D2\u715B\u71B2\u6F83\u8927\u71DB\u9848\u81E9",
  "ji\xF2ng": "",
  "ji\u016B": "\u4E29\u52FC\u7EA0\u673B\u725E\u7A76\u7CFA\u9E20\u7CFE\u8D73\u9604\u841B\u557E\u63C2\u63EA\u5279\u63EB\u9CE9\u644E\u7A35\u6A1B\u9B0F\u9B2E",
  "ji\xFA": "",
  "ji\u01D4": "\u4E5D\u4E46\u4E45\u4E63\u6C3F\u597A\u6C63\u6766\u7078\u7396\u7CFA\u820F\u97ED\u7D24\u9152\u9579\u97EE",
  "ji\xF9": "\u531B\u65E7\u81FC\u548E\u759A\u67E9\u67FE\u5003\u6344\u6855\u5313\u53A9\u6551\u5C31\u5EC4\u5ED0\u8205\u50E6\u5ECF\u6166\u6BA7\u820A\u9E6B\u5336\u9BE6\u9E94\u6B0D\u9F68\u9DF2",
  "j\u016B": "\u51E5\u4F21\u6285\u8ECA\u530A\u5C45\u5CA8\u6CC3\u72D9\u82F4\u9A79\u4FE5\u6BE9\u75BD\u7717\u7820\u7F5D\u9671\u5A35\u5A6E\u5D0C\u63AC\u68AE\u6DBA\u63DF\u6910\u6BF1\u741A\u8152\u8D84\u8DD4\u8DD9\u9514\u88FE\u96CE\u824D\u871B\u8ACA\u8E18\u8EB9\u92E6\u99D2\u64DA\u92F8\u9B88\u9D21\u6A8B\u97A0\u97AB\u9D8B",
  "j\xFA": "\u5C40\u6CE6\u4FB7\u72CA\u6336\u6854\u5579\u5A45\u6DD7\u7117\u83CA\u90F9\u6908\u6E68\u7291\u8F02\u50EA\u7CB7\u84FB\u8DFC\u95B0\u8D9C\u92E6\u6A58\u99F6\u7E58\u9D59\u8E6B\u9D74\u5DC8\u861C\u9DAA\u9F30\u9F33\u9A67",
  "j\u01D4": "\u5480\u5CA8\u5F06\u4E3E\u67B8\u77E9\u8392\u6319\u6907\u7B65\u6989\u6998\u849F\u9F83\u8065\u8209\u8E3D\u64E7\u6AF8\u9F5F\u6B05\u8977",
  "j\xF9": "\u5DE8\u4E6C\u5DEA\u8BB5\u59D6\u5CA0\u6007\u62D2\u6D30\u82E3\u90AD\u5177\u6010\u601A\u62E0\u661B\u6B6B\u70AC\u73C7\u79EC\u949C\u4FF1\u5028\u5036\u5267\u70E5\u7C94\u801F\u86B7\u8893\u57E7\u57FE\u60E7\u8A4E\u8DDD\u7123\u728B\u8DD9\u9245\u98D3\u84A9\u8661\u8C66\u952F\u5BE0\u6133\u7AAD\u805A\u99CF\u5287\u52EE\u5C66\u8E1E\u9B94\u58C9\u61C5\u64DA\u6FBD\u7AB6\u87B6\u907D\u92F8\u5C68\u98B6\u77BF\u8C97\u7C34\u8E86\u91B5\u5FC2\u61FC\u943B",
  "ju\u0101n": "\u59E2\u52CC\u5A1F\u6350\u6D93\u6718\u688B\u7106\u74F9\u8127\u570F\u88D0\u9E43\u52EC\u92D1\u92D7\u954C\u9799\u93B8\u942B\u8832",
  "ju\u01CEn": "\u545F\u5DFB\u5E23\u57CD\u6372\u83E4\u9529\u81C7\u9308\u95C2",
  "ju\xE0n": "\u5946\u52B5\u594D\u5DFB\u5E23\u5F2E\u5026\u52CC\u6081\u684A\u72F7\u7EE2\u96BD\u5A58\u60D3\u6DC3\u74F9\u7737\u9104\u570F\u68EC\u6926\u774A\u7D6D\u7F65\u8143\u96CB\u7760\u7D79\u98EC\u617B\u8528\u5DB2\u92D7\u990B\u7367\u7E33\u5DC2\u7F82\u8B82",
  "ju\u0113": "\u5658\u6485\u64A7\u5C69\u5C6B",
  "ju\xE9": "\u4E85\u5B52\u5B53\u51B3\u5214\u6C12\u8BC0\u5437\u599C\u5F21\u6289\u6C7A\u82B5\u53D5\u6CEC\u73A8\u73A6\u6317\u73CF\u75A6\u7804\u7EDD\u8673\u57C6\u6354\u6B2E\u8697\u88A6\u5D2B\u5D1B\u6398\u658D\u6877\u8990\u89D6\u8A23\u8D7D\u8DB9\u5095\u53A5\u7133\u77DE\u7D55\u7D76\u899A\u8D89\u920C\u5282\u7474\u8C32\u99C3\u564A\u5DA1\u5DA5\u61B0\u6485\u71A6\u7234\u7357\u761A\u855D\u8568\u89EE\u9D02\u9D03\u5671\u58C6\u61A0\u6A5C\u6A5B\u71CB\u749A\u7235\u81C4\u9562\u6AED\u7E58\u87E8\u87E9\u7211\u8B4E\u8E77\u8E76\u9AC9\u5337\u77CD\u89BA\u940D\u941D\u9CDC\u704D\u721D\u89FC\u7A71\u5F4F\u6204\u652B\u7383\u9DE2\u77E1\u8C9C\u8EA9\u9481",
  "ju\u011B": "\u8E76",
  "ju\xE8": "\u8AB3",
  "j\u016Bn": "\u519B\u541B\u5747\u6C6E\u59F0\u8880\u8ECD\u94A7\u8399\u8690\u687E\u76B2\u921E\u7885\u7B60\u76B8\u76B9\u89A0\u9281\u929E\u9CAA\u9835\u9E87\u9F9C\u9355\u9BB6\u9E8F\u9E95",
  "j\u01D4n": "",
  "j\xF9n": "\u5441\u4FCA\u90E1\u9656\u57C8\u5CFB\u6343\u6D5A\u96BD\u9982\u9A8F\u6659\u710C\u73FA\u68DE\u756F\u7AE3\u8470\u96CB\u5101\u7B98\u7B9F\u8720\u8CD0\u5BEF\u61CF\u9915\u71C7\u6FEC\u99FF\u9D58\u9D54\u9D55\u6508\u651F",
  "k\u0101": "\u5580",
  "k\u01CE": "\u4F67\u5494\u54AF\u57B0\u80E9\u88C3\u9272",
  "k\u0101i": "\u5F00\u5952\u63E9\u950E\u958B\u9426",
  "k\u01CEi": "\u51EF\u5240\u57B2\u607A\u95FF\u8C48\u94E0\u51F1\u5274\u5605\u6168\u8488\u584F\u5D66\u6137\u8F06\u669F\u9534\u9347\u93A7\u95D3\u98BD",
  "k\xE0i": "\u5FFE\u708C\u6B2F\u6B2C\u70D7\u52D3\u6112\u613E\u6FED\u938E",
  "k\u0101n": "\u520A\u681E\u52D8\u9F9B\u582A\u5D41\u6221\u9F95",
  "k\u01CEn": "\u51F5\u519A\u574E\u627B\u4F83\u780D\u83B0\u5058\u57F3\u60C2\u6B3F\u6B41\u69DB\u8F21\u6ABB\u9851\u7AF7\u8F57",
  "k\xE0n": "\u884E\u5D01\u5888\u961A\u77B0\u78E1\u95DE\u7AF7\u9B2B\u77D9",
  "k\u0101ng": "\u5FFC\u95F6\u780A\u7C87\u5EB7\u958C\u5ADD\u5D7B\u6177\u6F2E\u69FA\u7A45\u7CE0\u8EBF\u93EE\u9C47",
  "k\xE1ng": "",
  "k\u01CEng": "",
  "k\xE0ng": "\u4EA2\u4F09\u531F\u909F\u56E5\u6297\u72BA\u95F6\u7095\u94AA\u9227\u958C",
  "k\u0101o": "\u5C3B\u5D6A\u9ADB",
  "k\u01CEo": "\u4E02\u6537\u8003\u62F7\u6D18\u6832\u70E4\u85A7",
  "k\xE0o": "\u6D18\u94D0\u7292\u92AC\u9C93\u9760\u9BB3\u9BCC",
  "k\u0113": "\u533C\u67EF\u7241\u7271\u73C2\u79D1\u8F72\u75B4\u7822\u8DB7\u94B6\u86B5\u94EA\u5D59\u68F5\u75FE\u842A\u8EFB\u988F\u55D1\u6415\u7290\u7A1E\u7AA0\u9233\u69BC\u8596\u927F\u9897\u6A16\u778C\u78D5\u874C\u9826\u7ABC\u9198\u9846\u9AC1\u791A",
  "k\xE9": "\u6BBB\u63E2\u6BBC\u7FD7",
  "k\u011B": "\u5CA2\u70A3\u6E07\u5D51\u6564\u6E34\u8EFB\u959C\u78C6\u5DB1",
  "k\xE8": "\u514B\u523B\u524B\u52C0\u52CA\u5BA2\u5CC7\u606A\u5A14\u5C05\u6088\u8894\u8BFE\u5801\u6C2A\u9A92\u6118\u785E\u7F02\u8849\u55D1\u6119\u6B41\u6E98\u951E\u78A6\u7DD9\u8250\u8AB2\u6FED\u9301\u790A\u9A0D",
  "k\u0113i": "\u524B\u5C05",
  "k\u0113n": "",
  "k\u011Bn": "\u808E\u80AF\u80BB\u57A6\u6073\u5543\u9F82\u8C64\u8C87\u9F88\u58BE\u9339\u61C7",
  "k\xE8n": "\u73E2\u63AF\u784D\u88C9\u8903",
  "k\u0113ng": "\u52A5\u962C\u5748\u5751\u5994\u6333\u7841\u6BB8\u727C\u63C1\u785C\u94FF\u787B\u647C\u8A99\u92B5\u935E\u93D7",
  "k\u011Bng": "\u787B",
  "k\u014Dng": "\u5025\u57EA\u5D06\u60BE\u6DB3\u690C\u787F\u7B9C\u8EBB\u9313\u9D7C",
  "k\u01D2ng": "\u5B54\u5025\u6050\u60BE",
  "k\xF2ng": "\u77FC\u63A7\u7FAB\u979A",
  "k\u014Du": "\u62A0\u82A4\u770D\u7717\u527E\u5F44\u6473\u7798",
  "k\u01D2u": "\u53E3\u52B6\u7AD8",
  "k\xF2u": "\u53E9\u6263\u4F5D\u6010\u6542\u51A6\u5BBC\u5BC7\u91E6\u7A9B\u7B58\u6EF1\u8532\u853B\u7789\u7C06\u9DC7",
  "k\u016B": "\u625D\u5233\u77FB\u90C0\u670F\u67AF\u80D0\u54ED\u684D\u79D9\u7A8B\u5800\u5710\u8DCD\u7A9F\u9AB7\u9BAC",
  "k\xFA": "",
  "k\u01D4": "\u72DC\u82E6\u695B",
  "k\xF9": "\u5E93\u4FC8\u7ED4\u5EAB\u6341\u79D9\u7105\u88B4\u55BE\u785E\u7D5D\u88E4\u7614\u9177\u5EE4\u8932\u56B3",
  "ku\u0101": "\u54B5\u59F1\u6057\u6647\u7D53\u823F\u8A87",
  "ku\u01CE": "\u4F89\u57AE\u6947\u9299",
  "ku\xE0": "\u80EF\u8DB6\u8A87\u8DE8\u9ABB",
  "ku\u01CEi": "\u84AF\u64D3",
  "ku\xE0i": "\u5DDC\u51F7\u5726\u5757\u5FEB\u4FA9\u90D0\u54D9\u6D4D\u72EF\u810D\u6B33\u584A\u8489\u6703\u7B77\u99C3\u9C99\u5108\u58A4\u9136\u5672\u5EE5\u6FAE\u736A\u74AF\u81BE\u65DD\u7CE9\u9C60",
  "ku\u0101n": "\u5BBD\u5BDB\u5BEC\u81D7\u9ACB\u9467\u9AD6",
  "ku\u01CEn": "\u68A1\u6B35\u6B3E\u6B40\u7ABD\u7ABE",
  "ku\xE0n": "",
  "ku\u0101ng": "\u5321\u8FCB\u52BB\u8BD3\u90BC\u5329\u54D0\u6047\u6D2D\u7844\u7B50\u7B7A\u8A86\u8EED",
  "ku\xE1ng": "\u5FF9\u6282\u72C5\u72C2\u8BF3\u8ED6\u8EE0\u8A91\u9D5F",
  "ku\u01CEng": "\u593C\u5123\u61ED",
  "ku\xE0ng": "\u535D\u4E31\u909D\u5739\u7EA9\u51B5\u65F7\u5CB2\u6CC1\u77FF\u663F\u8D36\u6846\u7716\u783F\u7736\u7D4B\u7D56\u8CBA\u8EE6\u9271\u92DB\u913A\u58D9\u9ECB\u61EC\u66E0\u720C\u77CC\u7926\u7A6C\u7E8A\u945B",
  "ku\u012B": "\u4E8F\u5232\u5CBF\u609D\u76D4\u7AA5\u8067\u7ABA\u8667\u985D\u95DA\u5DCB",
  "ku\xED": "\u594E\u6646\u9035\u9108\u9697\u9997\u55B9\u63C6\u8475\u9A99\u6223\u668C\u694F\u6951\u9B41\u777D\u8770\u982F\u6AC6\u85C8\u9368\u9377\u9A24\u5914\u8637\u5DD9\u8641\u72AA\u8EA8",
  "ku\u01D0": "\u5C2F\u7143\u8DEC\u980D\u78C8\u8E5E",
  "ku\xEC": "\u5C2F\u80FF\u532E\u559F\u5ABF\u6127\u6126\u8489\u9988\u5331\u7786\u5633\u5B07\u6192\u6F70\u7BD1\u806D\u8069\u8562\u6BA8\u81AD\u8B09\u77B6\u993D\u7C23\u8075\u7C44\u994B",
  "k\u016Bn": "\u5764\u6606\u5803\u5812\u5A6B\u5D11\u5D10\u665C\u7311\u83CE\u88C8\u711C\u7428\u9AE0\u88E9\u8C87\u951F\u9AE1\u9E4D\u6F49\u872B\u890C\u9AE8\u71B4\u747B\u918C\u9315\u9CB2\u9A09\u9BE4\u9D7E\u9DA4",
  "k\u01D4n": "\u6083\u6346\u9603\u58F8\u68B1\u7975\u7871\u7A07\u88CD\u58FC\u7A1B\u7D91\u95AB\u95B8",
  "k\xF9n": "\u56F0\u6D83\u774F",
  "ku\xF2": "\u6269\u62E1\u6304\u9002\u79EE\u79F3\u94E6\u7B48\u843F\u8440\u86DE\u9614\u5ED3\u6F37\u929B\u564B\u92BD\u9822\u9AFA\u64F4\u6FF6\u95CA\u979F\u97D5\u9729\u97B9\u9B20",
  "la": "\u97A1",
  "l\u0101": "\u5783\u67C6\u782C\u83C8\u641A\u78D6\u908B",
  "l\xE1": "\u65EF\u524C\u782C\u63E6\u78D6\u56B9",
  "l\u01CE": "\u5587\u85DE",
  "l\xE0": "\u524C\u7FCB\u63E6\u6E82\u63E7\u694B\u760C\u8721\u874B\u8FA2\u8FA3\u8772\u81C8\u64F8\u650B\u7209\u81D8\u9B0E\u6AF4\u74CE\u9574\u9BFB\u881F\u945E",
  "l\xE1i": "\u6765\u4F86\u4FEB\u5008\u5D03\u5F95\u6D9E\u83B1\u90F2\u5A61\u5D0D\u5EB2\u5FA0\u68BE\u6DF6\u730D\u840A\u9028\u68F6\u741C\u7B59\u94FC\u7B82\u9338\u9A0B\u9BE0\u9D86\u9EB3",
  "l\u01CEi": "\u8970",
  "l\xE0i": "\u75A0\u5A15\u5F95\u553B\u5A61\u5FA0\u8D49\u7750\u775E\u8D56\u8ABA\u8CDA\u6FD1\u8CF4\u983C\u7658\u9842\u765E\u9D63\u650B\u7028\u702C\u7C41\u85FE\u6AF4\u7669\u7C5F",
  "l\xE1n": "\u5170\u5C9A\u62E6\u680F\u5549\u5A6A\u60CF\u5D50\u847B\u9611\u6695\u84DD\u8C30\u53B1\u6F9C\u8934\u5116\u6593\u7BEE\u61E2\u71E3\u71F7\u85CD\u8955\u9567\u95CC\u74BC\u5E71\u8964\u8B4B\u6514\u703E\u7046\u7C43\u7E7F\u862B\u862D\u6595\u6B04\u8974\u56D2\u7061\u7C63\u6B17\u8B95\u8E9D\u897D\u946D\u97CA",
  "l\u01CEn": "\u89C8\u6D68\u63FD\u7F06\u6984\u6F24\u7F71\u9182\u58C8\u61D2\u89A7\u64E5\u5B3E\u61F6\u5B44\u89BD\u5B4F\u652C\u7060\u6B16\u7226\u9872\u7E9C",
  "l\xE0n": "\u5754\u70C2\u6EE5\u71D7\u5682\u58CF\u6FEB\u7201\u721B\u74D3\u7224\u7226\u7CF7\u9484",
  "l\u0101ng": "\u5577",
  "l\xE1ng": "\u52C6\u90DE\u54F4\u6B34\u72FC\u5ACF\u5ECA\u658F\u6879\u7405\u84C8\u6994\u746F\u7860\u7A02\u9512\u7B64\u8246\u870B\u90D2\u6A03\u8782\u8EB4\u92C3\u93AF\u99FA",
  "l\u01CEng": "\u5D00\u6717\u6716\u70FA\u5871\u84E2\u8A8F\u6724",
  "l\xE0ng": "\u57CC\u6D6A\u83A8\u9606\u7B64\u8497\u8A8F\u95AC",
  "l\u0101o": "\u635E\u7CA9\u6488",
  "l\xE1o": "\u52B4\u52B3\u7262\u7A82\u54F0\u5D02\u6D76\u52DE\u75E8\u94F9\u50D7\u562E\u5D97\u61A6\u61A5\u6725\u7646\u78F1\u7C29\u87E7\u91AA\u9412\u985F\u9ADD",
  "l\u01CEo": "\u8002\u8001\u4F6C\u54BE\u6045\u72EB\u8356\u6833\u73EF\u7853\u94D1\u86EF\u92A0\u9BB1\u8F51",
  "l\xE0o": "\u6D9D\u7D61\u55E0\u8022\u916A\u5AEA\u562E\u61A6\u6A02\u6F87\u8EBC\u6A6F\u802E\u8EC2",
  "le": "\u9979",
  "l\u0113": "\u561E",
  "l\xE8": "\u4EC2\u961E\u53FB\u5FC7\u6250\u6C3B\u827B\u725E\u738F\u6CD0\u7AFB\u7833\u697D\u97F7\u990E\u6A02\u7C15\u9CD3\u9C33\u9C73",
  "lei": "\u561E",
  "l\u0113i": "",
  "l\xE9i": "\u7D6B\u96F7\u5AD8\u7F27\u8502\u6A0F\u757E\u78E5\u6A91\u7E32\u6502\u790C\u956D\u6AD1\u74C3\u7FB8\u7927\u7E8D\u7F4D\u8632\u9433\u8F60\u513D\u9458\u9741\u8646\u9C69\u6B19\u7E9D\u9F3A",
  "l\u011Bi": "\u53BD\u8012\u8BD4\u5792\u6D21\u5841\u7D6B\u50AB\u8A84\u7623\u6A0F\u78CA\u854C\u78E5\u857E\u5121\u58D8\u7657\u790C\u85DF\u6AD1\u6AD0\u77CB\u7928\u7927\u7045\u881D\u863D\u8B84\u58E8\u9478\u9E13",
  "l\xE8i": "\u6CEA\u6D21\u7C7B\u6D99\u6DDA\u7971\u7D6B\u9179\u9287\u981B\u982A\u9311\u6502\u98A3\u985E\u7927\u7E87\u8631\u79B7",
  "l\u0113ng": "\u7A1C",
  "l\xE9ng": "\u5525\u5D1A\u5844\u695E\u7890\u7A1C\u8590",
  "l\u011Bng": "\u51B7",
  "l\xE8ng": "\u5030\u580E\u6123\u7756\u8E1C",
  "li": "",
  "l\u012B": "",
  "l\xED": "\u5215\u675D\u5398\u67C2\u5253\u72F8\u79BB\u8372\u9A8A\u60A1\u68A8\u68B8\u7281\u740D\u83DE\u55B1\u68C3\u7282\u9E42\u527A\u6F13\u775D\u7B63\u7F21\u8243\u84E0\u5AE0\u5B77\u6A06\u7483\u76E0\u7AF0\u8C8D\u729B\u7CCE\u853E\u8935\u92EB\u9CA1\u9ECE\u7BF1\u7E2D\u7F79\u9305\u87CD\u8B27\u91A8\u569F\u85DC\u908C\u91D0\u96E2\u9BCF\u6584\u74C8\u87F8\u93EB\u9BEC\u9D79\u9E97\u9EE7\u56C4\u7055\u863A\u882B\u5B4B\u5EF2\u5299\u9457\u7A72\u7C6C\u7E9A\u9A6A\u9C7A\u9E1D",
  "l\u01D0": "\u793C\u674E\u91CC\u4FDA\u5CDB\u5CE2\u5A0C\u5CF2\u609D\u6D6C\u9026\u7406\u88E1\u9502\u7CB4\u88CF\u8C4A\u92F0\u9CA4\u6FA7\u79AE\u9BC9\u91B4\u8821\u9CE2\u9090\u9C67\u6B1A\u7E9A\u9C71",
  "l\xEC": "\u529B\u5386\u5389\u5C74\u6250\u7ACB\u540F\u625A\u6738\u5229\u52B1\u53D3\u5456\u575C\u675D\u6CA5\u82C8\u4F8B\u53D5\u5CA6\u623E\u67A5\u6CB4\u6CB5\u75A0\u82D9\u8FE3\u4FD0\u4FEA\u6803\u680E\u75AC\u7805\u8318\u8354\u8D72\u8F79\u90E6\u550E\u5A33\u60A7\u681B\u6817\u6D70\u6D96\u7301\u73D5\u782C\u783A\u783E\u79DD\u8389\u8385\u9B32\u5533\u5A6F\u60B7\u7B20\u7C92\u7C9D\u8137\u86B8\u86CE\u5088\u51D3\u53A4\u68D9\u75E2\u86E0\u8A48\u8DDE\u96F3\u53AF\u585B\u6144\u642E\u6EA7\u7759\u849E\u849A\u870A\u925D\u9CE8\u53B2\u66A6\u6B74\u746E\u7D9F\u8727\u9290\u8777\u9549\u52F5\u66C6\u6B77\u7BE5\u96B7\u9D17\u5DC1\u6AAA\u6FFF\u7658\u78FF\u96B8\u9B01\u512E\u64FD\u66DE\u6AD4\u7204\u72A1\u79B2\u8807\u9398\u56A6\u58E2\u650A\u6ADF\u701D\u74C5\u792A\u85F6\u9E97\u6AEA\u720F\u74D1\u76AA\u76ED\u792B\u7CF2\u8823\u5137\u7667\u7930\u7E85\u9148\u9DC5\u9E9C\u56C7\u5B4B\u6526\u89FB\u8E92\u8F62\u6B10\u8B88\u8F63\u652D\u74E5\u9742\u974B",
  "li\u01CE": "\u4FE9\u5006",
  "li\xE1n": "\u5941\u8FDE\u5E18\u601C\u6D9F\u83B2\u9023\u68BF\u8054\u88E2\u4EB7\u55F9\u5EC9\u6169\u6E93\u6F23\u84EE\u5332\u5969\u69CF\u69E4\u7191\u899D\u5286\u5333\u5652\u5AFE\u6190\u78CF\u8068\u806B\u8933\u9CA2\u6FC2\u6FD3\u7E3A\u7FF4\u806E\u8595\u878A\u6AE3\u71EB\u806F\u81C1\u8B30\u8E65\u6AB6\u938C\u9570\u702E\u7C3E\u880A\u9B11\u942E\u9C31\u7C62\u7C68",
  "li\u01CEn": "\u83B6\u655B\u68BF\u740F\u8138\u88E3\u6169\u6459\u6E93\u69E4\u7489\u8539\u5B1A\u859F\u6582\u6AE3\u6B5B\u81C9\u913B\u895D\u7FB7\u861E\u861D\u91B6",
  "li\xE0n": "\u7EC3\u70BC\u604B\u6B93\u50C6\u581C\u5AA1\u6E45\u8430\u94FE\u6459\u695D\u7149\u7453\u6F4B\u7A34\u7DF4\u6FB0\u932C\u6BAE\u934A\u93C8\u7032\u9C0A\u6200\u7E9E",
  "li\u0101ng": "",
  "li\xE1ng": "\u826F\u4FCD\u83A8\u6881\u6DBC\u690B\u8F8C\u7CB1\u7CAE\u589A\u8E09\u6A11\u8F2C\u99FA\u7CE7",
  "li\u01CEng": "\u4E21\u4E24\u5169\u4FE9\u5006\u5521\u5562\u639A\u813C\u88F2\u7DC9\u873D\u9B49\u9B4E",
  "li\xE0ng": "\u4EAE\u501E\u54F4\u60A2\u8C05\u6DBC\u8F86\u55A8\u667E\u6E78\u9753\u8F0C\u8E09\u8AD2\u8F1B\u9344",
  "li\u0101o": "\u8E7D",
  "li\xE1o": "\u8FBD\u7597\u7A8C\u804A\u5C1E\u50DA\u5BE5\u5D7A\u6180\u644E\u6F3B\u818B\u5639\u5AFD\u5BEE\u5D9A\u5D9B\u61AD\u6579\u6A1B\u7360\u7F2D\u907C\u66B8\u6A51\u7499\u81AB\u7642\u7AC2\u9E69\u5C6A\u5EEB\u7C1D\u7E5A\u85D4\u87DF\u87E7\u8C42\u8CFF\u8E58\u720E\u7212\u98C2\u9ACE\u98C9\u9DEF",
  "li\u01CEo": "\u948C\u91D5\u911D\u7F2A\u84FC\u61AD\u7E46\u66E2\u720E\u957D\u7212",
  "li\xE0o": "\u5C25\u5C26\u948C\u7093\u6599\u91D5\u5ED6\u6482\u7AB7\u9563\u9410",
  "lie": "",
  "li\u0113": "",
  "li\xE9": "",
  "li\u011B": "\u5FDA\u6BDF\u6318",
  "li\xE8": "\u5217\u52A3\u52A6\u51BD\u52BD\u59F4\u6312\u6D0C\u8322\u8FFE\u54F7\u57D3\u57D2\u6835\u6D56\u70C8\u70EE\u6369\u730E\u731F\u811F\u68D9\u86DA\u716D\u8057\u8D94\u7D9F\u5DE4\u7366\u98B2\u71E4\u5120\u5DC1\u9BA4\u9D37\u64F8\u7204\u7375\u7209\u72A3\u8E90\u9B1B\u9B23\u9C72",
  "l\u012Bn": "\u62CE",
  "l\xEDn": "\u53B8\u90BB\u963E\u6797\u4E34\u51A7\u5549\u5D0A\u60CF\u667D\u7433\u7CA6\u7884\u7B96\u7CBC\u7D9D\u9130\u96A3\u5D99\u6F7E\u735C\u9074\u65B4\u66BD\u71D0\u7498\u8F9A\u9716\u7584\u77B5\u78F7\u81E8\u7E57\u7FF7\u9E90\u8F54\u58E3\u7036\u93FB\u9CDE\u9A4E\u9C57\u9E9F",
  "l\u01D0n": "\u83FB\u4E83\u50EF\u7B96\u51DC\u51DB\u649B\u5EE9\u5EEA\u61CD\u61D4\u6F9F\u6A81\u6AA9\u765D\u765B",
  "l\xECn": "\u541D\u6061\u608B\u8D41\u711B\u4E83\u75F3\u8CC3\u853A\u735C\u6A49\u7510\u81A6\u95B5\u7584\u85FA\u8E78\u8E8F\u8E99\u8EAA\u8F65",
  "l\xEDng": "\u4F36\u5222\u7075\u5464\u56F9\u577D\u590C\u59C8\u5CBA\u5F7E\u6CE0\u72D1\u82D3\u6624\u670E\u67C3\u73B2\u74F4\u3007\u51CC\u768A\u7831\u79E2\u7ADB\u7F90\u888A\u94C3\u9675\u9E30\u5A48\u5D1A\u6395\u68C2\u6DE9\u740C\u7B2D\u7D37\u7EEB\u7F9A\u7FCE\u8046\u8232\u83F1\u86C9\u8851\u797E\u8A45\u8DC9\u8EE8\u7A1C\u84E4\u88EC\u9234\u959D\u96F6\u9F84\u7DBE\u8506\u8F18\u970A\u99D6\u6FAA\u8576\u9302\u9717\u9B7F\u9CAE\u9D12\u9E77\u71EF\u971D\u971B\u9F62\u9143\u9BEA\u5B41\u9F61\u6AFA\u91BD\u9748\u6B1E\u7227\u9EA2\u9F97",
  "l\u01D0ng": "\u5CBA\u888A\u9886\u9818\u5DBA",
  "l\xECng": "\u53E6\u70A9\u8626",
  "li\u016B": "\u7198\u6F91\u8E53",
  "li\xFA": "\u5218\u7544\u65BF\u6D4F\u6D41\u7559\u65C8\u7409\u7571\u786B\u88D7\u5AB9\u5D67\u65D2\u84A5\u84C5\u9A9D\u644E\u69B4\u6F3B\u7460\u98D7\u5289\u746C\u7624\u78C2\u954F\u99E0\u9E60\u6A4A\u74A2\u7581\u9560\u7645\u87C9\u99F5\u56A0\u61F0\u700F\u85F0\u938F\u93A6\u9E8D\u93D0\u98C0\u9402\u9A2E\u98C5\u9C21\u9DB9\u9A51",
  "li\u01D4": "\u67F3\u6801\u685E\u73CB\u687A\u7EFA\u950D\u7DB9\u71AE\u7F76\u92F6\u6A6E\u5B3C\u61F0\u7F80\u85F0",
  "li\xF9": "\u7A8C\u7FCF\u586F\u5EC7\u905B\u6F91\u78C2\u78DF\u9E68\u93A6\u9724\u993E\u96E1\u98C2\u9B38\u9DDA",
  "lo": "\u54AF",
  "l\xF3ng": "\u9F99\u5C78\u5C28\u5499\u6CF7\u830F\u663D\u680A\u73D1\u80E7\u772C\u783B\u7ADC\u804B\u9686\u6E70\u6EDD\u5D90\u69DE\u6F0B\u7643\u7ABF\u7BED\u9F8D\u5131\u8622\u93E7\u9733\u56A8\u5DC3\u5DC4\u7027\u66E8\u6727\u6AF3\u7216\u74CF\u8971\u77D3\u7932\u7931\u882C\u882A\u9F93\u9F92\u7C60\u807E\u8C45\u8E98\u9747\u9468\u9A61\u9E17",
  "l\u01D2ng": "\u9647\u5785\u5784\u62E2\u7BE2\u7BED\u9F8D\u96B4\u5131\u5FBF\u58DF\u58E0\u650F\u7AC9\u9F93\u7C60\u8E98",
  "l\xF2ng": "\u54E2\u6887\u7866\u5131\u5FBF\u8D1A",
  "lou": "\u55BD\u560D\u779C",
  "l\u014Du": "\u645F",
  "l\xF3u": "\u5245\u5A04\u507B\u5A41\u55BD\u6E87\u848C\u50C2\u697C\u560D\u5BE0\u5ED4\u617A\u6F0A\u851E\u9071\u6A13\u71A1\u8027\u877C\u779C\u802C\u825B\u87BB\u8B31\u8C97\u8EC1\u9AC5\u97BB\u9ACF\u9DDC",
  "l\u01D2u": "\u5D5D\u587F\u5D81\u645F\u750A\u7BD3\u7C0D",
  "l\xF2u": "\u964B\u5C5A\u6F0F\u7618\u9542\u763B\u763A\u93E4",
  "l\u016B": "\u565C\u64B8\u8B22\u5695\u64FC",
  "l\xFA": "\u5362\u5E90\u82A6\u5786\u67A6\u6CF8\u7089\u680C\u80EA\u8F73\u822E\u9E2C\u7388\u823B\u9885\u9229\u9C88\u99BF\u9B72\u76E7\u56A7\u58DA\u5EEC\u650E\u7018\u7379\u74B7\u8606\u66E5\u6AE8\u7210\u74D0\u81DA\u77D1\u7C5A\u7E91\u7F4F\u826B\u8826\u8F64\u946A\u9871\u9AD7\u9C78\u9E15\u9EF8",
  "l\u01D4": "\u5364\u864F\u63B3\u9E75\u7875\u9C81\u865C\u5877\u6EF7\u84FE\u6A10\u6F9B\u9B6F\u64C4\u6A79\u6C07\u78E0\u7A5E\u9565\u7002\u6AD3\u6C0C\u8263\u93C0\u826A\u942A\u9465",
  "l\xF9": "\u5725\u752A\u9646\u4F93\u5774\u5F54\u5F55\u5CCD\u52CE\u8D42\u8F82\u9678\u5A3D\u6DD5\u6DE5\u6E0C\u7849\u83C9\u902F\u9E7F\u6902\u742D\u797F\u7984\u50C7\u5279\u52E0\u76DD\u7769\u7A11\u8CC2\u8DEF\u8F05\u5876\u5ED8\u645D\u6F09\u7B93\u7CB6\u7DD1\u84FC\u850D\u622E\u6A1A\u719D\u8194\u8DA2\u8E1B\u8F98\u9181\u6F5E\u7A4B\u8557\u9304\u9334\u9332\u7490\u7C0F\u87B0\u9D3C\u7C36\u8E57\u8F46\u9A04\u9E6D\u7C2C\u7C35\u93D5\u9BE5\u9D66\u9D71\u9E93\u93F4\u9A3C\u7C59\u89FB\u8642\u9DFA",
  "lu\xE1n": "\u5A08\u5B6A\u5CE6\u631B\u683E\u9E3E\u8114\u6EE6\u92AE\u9D49\u571D\u5971\u5B4C\u5B7F\u5DD2\u6523\u66EB\u6B12\u7053\u7F89\u81E1\u81E0\u571E\u7064\u864A\u947E\u7674\u7675\u9E1E",
  "lu\u01CEn": "\u5375\u89B6",
  "lu\xE0n": "\u4E71\u91E0\u4E7F\u4E82\u858D\u7053",
  "l\u016Bn": "\u6384",
  "l\xFAn": "\u4ED1\u4F26\u56F5\u6CA6\u7EB6\u82B2\u4F96\u8F6E\u502B\u966F\u5707\u5A68\u5D18\u5D19\u6384\u6DEA\u83D5\u68C6\u8140\u7896\u7DB8\u8023\u8726\u8AD6\u8E1A\u8F2A\u78EE\u9300\u9BE9",
  "l\u01D4n": "\u57E8\u60C0\u7896\u7A10\u8023",
  "l\xF9n": "\u60C0\u6EA3\u7896\u8AD6",
  "luo": "\u56C9\u56D6",
  "lu\u014D": "\u634B\u9831\u56C9\u56D6",
  "lu\xF3": "\u5BFD\u7F57\u7321\u8136\u841D\u903B\u6924\u8161\u9523\u7BA9\u9AA1\u9559\u87BA\u650E\u7F85\u89B6\u93CD\u5138\u89BC\u9A3E\u56C9\u651E\u7380\u863F\u908F\u6B0F\u9A58\u9E01\u7C6E\u947C\u9960\u56D6",
  "lu\u01D2": "\u5246\u502E\u7822\u6370\u84CF\u88F8\u8EB6\u7630\u8803\u81DD\u66EA\u652D\u7673",
  "lu\xF2": "\u6CFA\u54AF\u5CC8\u6D1B\u8366\u9A86\u6D1C\u73DE\u6370\u6E03\u784C\u7866\u7B3F\u7D61\u86D2\u8DDE\u8A7B\u645E\u6F2F\u7296\u96D2\u99F1\u78F1\u9BA5\u9D45\u64FD\u6FFC\u650A\u76AA\u8E92\u7E99",
  "l\u01D8": "\u9A74\u95FE\u6988\u95AD\u6C00\u81A2\u779C\u6ADA\u85D8\u9A62",
  "l\u01DA": "\u5415\u5442\u4FA3\u90D8\u4FB6\u6314\u635B\u634B\u65C5\u68A0\u7112\u7963\u507B\u7A06\u94DD\u5C61\u7D7D\u7F15\u50C2\u5C62\u617A\u8182\u891B\u92C1\u5C65\u8190\u8938\u5122\u7E37\u7A6D\u9DDC",
  "l\u01DC": "\u578F\u5F8B\u54F7\u8651\u5D42\u6C2F\u844E\u6EE4\u7DA0\u7DD1\u616E\u7BBB\u819F\u52F4\u7E42\u6FFE\u6AD6\u7208\u535B\u9462",
  "l\xFC\xE8": "\u5BFD\u63A0\u7567\u7565\u950A\u7A24\u5719\u92E2\u92DD",
  "ma": "\u55CE\u561B\u9EBD",
  "m\u0101": "\u4E87\u5988\u5B56\u5E85\u5ABD\u5AF2\u69AA\u879E",
  "m\xE1": "\u83FB\u9EBB\u55CE\u75F2\u75F3\u561B\u5AF2\u8534\u7298\u87C7",
  "m\u01CE": "\u9A6C\u72B8\u6769\u739B\u7801\u99AC\u55CE\u6EA4\u7341\u9064\u746A\u78BC\u879E\u93B7\u9C22\u9DCC",
  "m\xE0": "\u6769\u7943\u9581\u9A82\u508C\u7770\u561C\u69AA\u79A1\u7F75\u879E\u99E1\u9B15",
  "m\xE1i": "\u85B6\u973E",
  "m\u01CEi": "\u4E70\u836C\u8CB7\u562A\u8552\u9DF6",
  "m\xE0i": "\u52A2\u8FC8\u4F45\u58F2\u9EA6\u5356\u551B\u8108\u9EA5\u8847\u52F1\u8CE3\u9081\u9721\u9722",
  "m\u0101n": "\u989F\u9862",
  "m\xE1n": "\u59CF\u6097\u86EE\u7D7B\u8C29\u6172\u6471\u9992\u6A20\u779E\u9794\u8B3E\u9945\u9CD7\u9B18\u9B17\u9C3B\u77D5\u883B",
  "m\u01CEn": "\u5A28\u5C58\u6E80\u6EE1\u6EFF\u87A8\u8954\u87CE\u93CB\u77D5",
  "m\xE0n": "\u66FC\u50C8\u9124\u5881\u5ADA\u5E54\u6162\u6471\u6F2B\u734C\u7F26\u8504\u69FE\u6FAB\u71B3\u6FB7\u9558\u7E35\u93DD\u8630",
  "m\u0101ng": "\u7264",
  "m\xE1ng": "\u9099\u5402\u5FD9\u6C52\u8292\u5C28\u6757\u6767\u76F2\u76F3\u5396\u607E\u7B00\u832B\u54E4\u5A0F\u5EAC\u6D5D\u72F5\u671A\u727B\u786D\u91EF\u94D3\u75DD\u86D6\u92E9\u99F9\u8609",
  "m\u01CEng": "\u83BD\u83BE\u7865\u833B\u58FE\u6F2D\u87D2\u880E",
  "m\xE0ng": "",
  "m\u0101o": "\u8C93",
  "m\xE1o": "\u6BDB\u77DB\u82BC\u6786\u7266\u8305\u8306\u65C4\u7F5E\u6E35\u8EDE\u9155\u5825\u5D4D\u6959\u951A\u7DE2\u927E\u9AE6\u6C02\u729B\u8765\u8C93\u9AF3\u9328\u87CA\u9D9C",
  "m\u01CEo": "\u5187\u536F\u5918\u4E6E\u5CC1\u623C\u6CD6\u6634\u94C6\u7B37\u84E9\u925A",
  "m\xE0o": "\u5183\u7683\u82BC\u5190\u8302\u67D5\u770A\u79CF\u8D38\u65C4\u8004\u88A4\u8992\u5AA2\u5E3D\u843A\u8CBF\u911A\u6117\u6693\u6BF7\u7441\u7780\u8C8C\u912E\u8750\u61CB",
  "me": "\u5E85\u9EBD\u9EBC\u569C",
  "m\u0113": "\u5692",
  "m\xE8": "\u6FF9\u56B0",
  "m\xE9i": "\u5746\u6C92\u679A\u73AB\u82FA\u6802\u7709\u8104\u8393\u6885\u73FB\u8122\u90FF\u5833\u5A92\u5D4B\u6E44\u6E48\u7338\u7742\u847F\u6963\u6973\u7164\u7442\u7996\u815C\u587A\u69D1\u9176\u9545\u9E5B\u92C2\u9709\u7A48\u5FBE\u9387\u6517\u9DA5\u9EF4",
  "m\u011Bi": "\u6BCE\u6BCF\u51C2\u7F8E\u6334\u6D7C\u7F99\u5A84\u5D44\u6E3C\u5ABA\u9541\u5B0D\u71D8\u8EBE\u9382\u9EE3",
  "m\xE8i": "\u59B9\u62BA\u6CAC\u65C0\u6627\u7959\u8882\u771B\u5A9A\u5BD0\u6B99\u75D7\u8DCA\u9B3D\u715D\u7778\u97CE\u9B45\u7BC3\u875E\u569C\u6AD7",
  "m\u0113n": "\u60B6\u691A",
  "m\xE9n": "\u95E8\u4EEC\u626A\u6C76\u600B\u73A7\u9494\u9580\u5011\u9585\u636B\u83DB\u748A\u779E\u7A48\u9346\u4EB9\u6596\u864B",
  "m\xE8n": "\u6097\u60DB\u7116\u60B6\u66AA\u71DC\u9794\u61D1\u61E3",
  "m\u0113ng": "\u63B9\u64DD\u77C7",
  "m\xE9ng": "\u5C28\u753F\u867B\u5EAC\u8394\u840C\u6E95\u76DF\u96FA\u750D\u9133\u511A\u6A57\u77A2\u8544\u8771\u9138\u92C2\u9AF3\u5E6A\u61DC\u61DE\u6FDB\u7374\u66DA\u6726\u6AAC\u6C0B\u791E\u9BCD\u9E72\u8268\u77D2\u9740\u973F\u995B\u986D\u9E0F",
  "m\u011Bng": "\u9EFE\u51A1\u52D0\u731B\u9EFD\u9530\u824B\u8722\u77A2\u61DC\u61DE\u87D2\u9333\u61F5\u8813\u9BED\u77D2\u9F06",
  "m\xE8ng": "\u5B5F\u68A6\u5922\u5923\u61DC\u9725\u7666",
  "m\u012B": "\u54AA\u7787",
  "m\xED": "\u519E\u7962\u8FF7\u88AE\u7315\u8C1C\u84BE\u8A78\u6475\u7787\u8B0E\u919A\u5F4C\u64DF\u77B4\u7E3B\u85CC\u9E8A\u9E8B\u9EBF\u6AB7\u79B0\u9761\u7030\u737C\u862A\u9E9B\u957E\u6202\u6520\u74D5\u863C\u7222\u91BE\u91BF\u9E0D\u91C4",
  "m\u01D0": "\u7C73\u8288\u4F8E\u6CB5\u7F8B\u5F2D\u6D23\u6549\u7C8E\u8112\u6E33\u845E\u851D\u92A4\u5F4C\u6FD4\u5B4A\u6520\u7056",
  "m\xEC": "\u5196\u7CF8\u6C68\u6C95\u5B93\u603D\u6788\u89C5\u5CDA\u7955\u5BBB\u5BC6\u6DE7\u8994\u8993\u5E42\u8C27\u5853\u5E4E\u899B\u5627\u6993\u6EF5\u6F1E\u7190\u8524\u871C\u9F0F\u51AA\u6A12\u5E66\u6FD7\u8B10\u6AC1\u7C1A\u7F83",
  "mi\xE1n": "\u5B80\u8287\u6763\u7720\u5A42\u7EF5\u5A94\u68C9\u7DBF\u7DDC\u81F1\u8752\u5B35\u6AB0\u6ACB\u77C8\u77CA\u77CF",
  "mi\u01CEn": "\u4E0F\u6C45\u514D\u6C94\u9EFE\u52C9\u7704\u5A29\u83AC\u506D\u5195\u52D4\u6E11\u5595\u5A94\u6110\u6E4E\u774C\u7F05\u8442\u9EFD\u7D7B\u817C\u6FA0\u7DEC\u9766\u9BB8",
  "mi\xE0n": "\u9763\u9762\u7251\u7CC6\u9EAB\u9EAA\u9EBA\u9EB5",
  "mi\u0101o": "\u55B5",
  "mi\xE1o": "\u82D7\u5A8C\u63CF\u7784\u9E4B\u5AF9\u7DE2\u9D93",
  "mi\u01CEo": "\u53B8\u4EEF\u52B0\u676A\u7707\u79D2\u6DFC\u6E3A\u7F08\u7BCE\u7DF2\u85D0\u9088",
  "mi\xE0o": "\u5999\u5E99\u7385\u7AD7\u5EBF\u7F2A\u5EDF\u7E46",
  "mi\u0113": "\u4E5C\u5400\u54A9\u54F6\u5B6D",
  "mi\xE9": "",
  "mi\xE8": "\u706D\u70D5\u771C\u8995\u6423\u6EC5\u8511\u858E\u9D13\u5E6D\u61F1\u700E\u7BFE\u6AD7\u7C1A\u7923\u881B\u884A\u9456\u9C74",
  "m\xEDn": "\u6C11\u5FDF\u578A\u59C4\u5CB7\u5FDE\u600B\u65FB\u65FC\u739F\u82E0\u73C9\u76FF\u7807\u7F60\u5D0F\u636A\u6E02\u7418\u741D\u7F17\u668B\u7449\u75FB\u7888\u9231\u7DCD\u7DE1\u8CEF\u9309\u9D16\u9372",
  "m\u01D0n": "\u76BF\u51BA\u5221\u5FDF\u95F5\u5461\u5FDE\u62BF\u6CEF\u9EFE\u52C4\u6543\u95FD\u60AF\u654F\u7B22\u7B3D\u60FD\u6E4F\u6E63\u9594\u9EFD\u610D\u656F\u668B\u50F6\u95A9\u615C\u61AB\u6F63\u7C22\u9CD8\u8820\u9C35",
  "m\xEDng": "\u540D\u660E\u9E23\u6D3A\u7700\u8317\u51A5\u6719\u7733\u94ED\u910D\u5AC7\u6E9F\u733D\u84C2\u8A7A\u669D\u69A0\u9298\u9CF4\u7791\u879F\u89AD",
  "m\u01D0ng": "\u4F72\u59F3\u51D5\u5AC7\u614F\u9169",
  "m\xECng": "\u547D\u63B5",
  "mi\u01D4": "",
  "mi\xF9": "\u8C2C\u7F2A\u7E46\u8B2C",
  "m\u014D": "\u6478\u56A4",
  "m\xF3": "\u5E85\u5C1B\u8C1F\u5AEB\u998D\u6479\u819C\u9AB3\u9EBD\u9EBC\u9B79\u6A45\u7CE2\u5B24\u5B37\u8B28\u8B29\u64F5\u9943\u8611\u9ACD\u9B54\u5298\u6202\u6520\u995D",
  "m\u01D2": "\u61E1",
  "m\xF2": "\u672B\u573D\u6C92\u59BA\u5E13\u6B81\u6B7F\u6B7E\u6CAB\u8309\u964C\u5E1E\u6629\u67BA\u72E2\u768C\u771C\u773F\u781E\u79E3\u8388\u773D\u7D48\u88B9\u7D54\u86E8\u8C83\u55FC\u587B\u5BDE\u6F20\u734F\u84E6\u8C88\u8C8A\u8C89\u9286\u977A\u58A8\u5AFC\u763C\u7790\u7799\u9546\u9B69\u9ED9\u7E38\u9ED8\u700E\u8C98\u569C\u85E6\u87D4\u93CC\u7205\u9A40\u7933\u7E86\u8031",
  "m\u014Du": "\u54DE",
  "m\xF3u": "\u725F\u4F94\u52BA\u5463\u6048\u6544\u6859\u7738\u8C0B\u5825\u86D1\u7F2A\u8E0E\u8B00\u7E46\u936A\u9D3E\u9EB0\u97AA",
  "m\u01D2u": "\u53B6\u67D0",
  "m\xF2u": "",
  "m\xFA": "\u6BEA\u6C01",
  "m\u01D4": "\u6BCD\u4EA9\u7261\u5776\u59C6\u62C7\u7542\u5CD4\u7273\u7546\u7552\u80DF\u5A12\u755D\u755E\u782A\u756E\u9267\u8E07",
  "m\xF9": "\u6728\u4EEB\u76EE\u51E9\u6737\u725F\u6C90\u72C7\u5776\u7091\u7267\u82DC\u6BE3\u83AF\u869E\u94BC\u52DF\u96EE\u5893\u5E59\u5E55\u6154\u6958\u7766\u926C\u6155\u66AF\u66AE\u7F2A\u6A22\u8252\u9702\u7A46\u7E38\u7E46\u97AA",
  "n": "",
  "\u0144": "\u5514\u55EF",
  "\u0148": "\u55EF",
  "na": "",
  "n\u0101": "",
  "n\xE1": "\u79C5\u62CF\u62FF\u6310\u55F1\u8498\u643B\u8ABD\u954E\u93BF",
  "n\u01CE": "\u4E78\u96EB",
  "n\xE0": "\u5436\u59A0\u6290\u7EB3\u80AD\u90CD\u8872\u94A0\u7D0D\u88A6\u637A\u7B1A\u7B1D\u8C7D\u8EDC\u8C80\u9209\u84B3\u9779\u9B76",
  "n\xE1i": "\u8149\u6431\u6468\u5B7B",
  "n\u01CEi": "\u4E43\u5976\u827F\u6C16\u7593\u59B3\u5EFC\u8FFA\u5037\u91E2\u5B2D",
  "n\xE0i": "\u4F74\u5948\u67F0\u800F\u8010\u8418\u6E3F\u9F10\u8926\u879A\u933C",
  "n\u0101n": "\u56DD\u56E1",
  "n\xE1n": "\u7537\u62A9\u678F\u4FBD\u67DF\u5A1A\u7558\u83AE\u5583\u9056\u6694\u6960\u8AF5\u96E3",
  "n\u01CEn": "\u8D67\u63C7\u6E73\u8433\u7175\u8169\u5AE8\u877B\u6201",
  "n\xE0n": "\u59A0\u5A7B\u8AF5\u96E3",
  "n\u0101ng": "\u513E\u56D4",
  "n\xE1ng": "\u4E6A\u6DB3\u6411\u61B9\u56A2\u8830\u995F\u9995\u6B1C\u9962",
  "n\u01CEng": "\u6411\u64C3\u703C\u66E9\u652E\u7062\u9995",
  "n\xE0ng": "\u513E\u9F49",
  "n\u0101o": "\u5B6C",
  "n\xE1o": "\u5476\u6013\u6320\u5CF1\u6861\u7847\u94D9\u7331\u86F2\u8A49\u7899\u644E\u6493\u5DA9\u61B9\u6A48\u7376\u87EF\u5912\u8B4A\u9403\u5DCE\u737F",
  "n\u01CEo": "\u57B4\u607C\u60A9\u8111\u5318\u8133\u5816\u60F1\u5AD0\u7459\u8166\u78AF\u61B9\u7376",
  "n\xE0o": "\u95F9\u5A65\u6DD6\u9599\u9B27\u81D1",
  "ne": "",
  "n\xE9": "",
  "n\xE8": "\u7592\u8BB7\u5436\u6290\u7732\u8A25",
  "n\xE9i": "",
  "n\u011Bi": "\u5A1E\u6D7D\u9981\u812E\u8147\u9912\u9BBE\u9BD8",
  "n\xE8i": "\u5167\u6C1D\u6C1E\u9317",
  "n\xE8n": "\u6041\u5A86\u5AE9\u5AF0",
  "n\xE9ng": "",
  "n\u011Bng": "\u879A",
  "n\xE8ng": "",
  "\u0144g": "\u5514\u55EF",
  "\u0148g": "\u55EF",
  "n\u012B": "\u59AE",
  "n\xED": "\u5C3C\u576D\u6029\u62B3\u7C7E\u502A\u5C54\u79DC\u90F3\u94CC\u57FF\u5A57\u6DE3\u730A\u86AD\u68FF\u86EA\u8DDC\u922E\u8063\u873A\u999C\u89EC\u8C8E\u8F17\u9713\u9CB5\u9BE2\u9E91\u9F6F\u81E1",
  "n\u01D0": "\u4F31\u4F32\u4F60\u62DF\u59B3\u62B3\u72D4\u82E8\u67C5\u5A57\u639C\u65CE\u6672\u68FF\u5B74\u511E\u5117\u96AC\u61DD\u64EC\u6FD4\u85BF\u6AB7\u807B",
  "n\xEC": "\u5C70\u6C3C\u4F32\u6290\u6635\u80D2\u9006\u533F\u7724\u79DC\u5804\u60C4\u5ADF\u6135\u7768\u817B\u66B1\u7E0C\u8ABD\u81A9\u5B3A",
  "ni\u0101n": "\u62C8\u852B",
  "ni\xE1n": "\u5E74\u79CA\u54D6\u59E9\u79E5\u7C98\u6E93\u9C87\u9B8E\u9CB6\u9D47\u9ECF\u9BF0",
  "ni\u01CEn": "\u6D8A\u6DF0\u713E\u8F87\u6990\u8F97\u649A\u64B5\u78BE\u8F26\u7C10\u8E4D\u6506\u8E68\u8E8E",
  "ni\xE0n": "\u5344\u5EFF\u5FF5\u59E9\u5538\u57DD\u60A5\u60D7\u824C",
  "ni\xE1ng": "\u5A18\u5B22\u5B43\u91C0",
  "ni\u01CEng": "",
  "ni\xE0ng": "\u917F\u91B8\u91C0",
  "ni\u01CEo": "\u9E1F\u8311\u8885\u9CE5\u5ACB\u88CA\u8526\u6A22\u5B1D\u892D\u5B32",
  "ni\xE0o": "\u8132",
  "ni\u0113": "\u634F\u63D1",
  "ni\xE9": "\u82F6",
  "ni\u011B": "",
  "ni\xE8": "\u4E5C\u5E07\u573C\u5CCA\u67BF\u9667\u6D85\u75C6\u8042\u81EC\u556E\u639C\u83CD\u9689\u655C\u6E7C\u55EB\u5D72\u8E02\u565B\u6470\u69F7\u8E17\u8E19\u92B8\u954A\u954D\u5DAD\u7BDE\u81F2\u92F7\u931C\u989E\u8E51\u5699\u8076\u93B3\u95D1\u5B7C\u5B7D\u6AF1\u7C4B\u8616\u56C1\u651D\u9F67\u5DD5\u7CF1\u7CF5\u8825\u9448\u56D0\u56D3\u8B98\u8EA1\u9477\u9873\u9480",
  "n\xEDn": "\u56DC\u6041\u810C\u60A8",
  "n\u01D0n": "\u62F0",
  "n\xEDng": "\u549B\u72DE\u82E7\u67E0\u804D\u5BCD\u5BD5\u752F\u5BD7\u5BDC\u5BE7\u511C\u51DD\u6A63\u5680\u5B23\u64F0\u7370\u85B4\u6AB8\u8079\u944F\u9B21\u9E0B",
  "n\u01D0ng": "\u64F0\u77C3",
  "n\xECng": "\u4F5E\u4FAB\u6CDE\u503F\u5BCD\u5BD5\u752F\u5BD7\u5BDC\u5BE7\u6F9D\u64F0\u6FD8",
  "ni\u016B": "\u599E\u5B67",
  "ni\xFA": "\u725C\u725B\u6C7C\u6013",
  "ni\u01D4": "\u5FF8\u626D\u6C91\u72C3\u7EBD\u677B\u7084\u94AE\u7D10\u83A5\u9215\u9775",
  "ni\xF9": "\u629D",
  "n\xF3ng": "\u519C\u4FAC\u54DD\u6D53\u8113\u79FE\u8FB2\u5102\u8FB3\u5665\u6FC3\u857D\u6A82\u71F6\u79AF\u81BF\u7651\u7A60\u895B\u8B68\u91B2\u6B01\u9B1E",
  "n\u01D2ng": "\u7E77",
  "n\xF2ng": "\u630A\u6335\u7651\u9F48",
  "n\xF3u": "\u7FBA",
  "n\u01D2u": "",
  "n\xF2u": "\u6419\u69C8\u8028\u7373\u6ABD\u9392\u941E",
  "n\xFA": "\u5974\u4F2E\u5B65\u5E11\u9A7D\u7B2F\u99D1",
  "n\u01D4": "\u4F2E\u52AA\u5F29\u782E\u80EC",
  "n\xF9": "\u6012\u5089\u6419",
  "nu\xE1n": "\u597B\u6E1C",
  "nu\u01CEn": "\u6E1C\u6E6A\u6696\u7156\u7157\u992A",
  "nu\xE0n": "",
  "nu\xF3": "\u632A\u689B\u50A9\u6A60\u96E3\u513A",
  "nu\u01D2": "\u88B3\u88B2",
  "nu\xF2": "\u800E\u8BFA\u558F\u63BF\u6BED\u903D\u611E\u6419\u6426\u9518\u643B\u6992\u7A2C\u8AFE\u8E43\u7CD1\u9369\u61E7\u61E6\u7CE5\u7A64\u7CEF",
  "n\u01D8": "",
  "n\u01DA": "\u9495\u7C79\u91F9",
  "n\u01DC": "\u6C91\u8842\u6067\u6712\u8844\u804F",
  "n\xFC\xE8": "\u8650\u5A69\u7878\u7627",
  "o": "\u7B7D",
  "\u014D": "\u5594\u5662",
  "\xF3": "\u54E6",
  "\u01D2": "\u5684",
  "\xF2": "\u54E6",
  "ou": "",
  "\u014Du": "\u8BB4\u543D\u6CA4\u6B27\u6BB4\u74EF\u9E25\u5340\u5614\u5878\u6F1A\u6B50\u6BC6\u71B0\u750C\u8192\u9D0E\u6AD9\u85F2\u8B33\u93C2\u9DD7",
  "\xF3u": "",
  "\u01D2u": "\u5418\u79BA\u5076\u8162\u5614\u71B0\u8026\u8545\u85D5",
  "\xF2u": "\u6004\u6CA4\u5614\u616A\u6F1A",
  "p\u0101": "\u6C43\u5991\u82E9\u7685\u8DB4\u8225\u556A\u8469",
  "p\xE1": "\u6777\u722C\u94AF\u63B1\u7436\u7B62\u6F56",
  "p\u01CE": "",
  "p\xE0": "\u6C43\u5E0A\u5E15\u6015\u8899",
  "p\u0101i": "\u62CD",
  "p\xE1i": "\u4FF3\u5F98\u7305\u68D1\u724C\u7B84\u8F2B\u7C32\u7C30\u72A4",
  "p\u01CEi": "\u5EF9",
  "p\xE0i": "\u6CA0\u54CC\u6D3E\u6E12\u6E43\u848E\u9383",
  "p\u0101n": "\u7705\u7568\u8420\u6F58\u6500\u7C53",
  "p\xE1n": "\u4E2C\u723F\u80A8\u67C8\u6D00\u80D6\u772B\u6E74\u76D8\u8DD8\u5ABB\u5E4B\u84B0\u642B\u69C3\u76E4\u78D0\u7E0F\u81B0\u78FB\u8E52\u700A\u87E0\u8E63\u939C\u97B6",
  "p\u01CEn": "\u5762\u76FB",
  "p\xE0n": "\u51B8\u5224\u6C9C\u62DA\u6CEE\u708D\u80A8\u53DB\u7249\u76FC\u80D6\u7554\u8041\u88A2\u8A4A\u6EBF\u9816\u92EC\u95C6\u9D65\u897B\u947B",
  "p\u0101ng": "\u4E53\u6C78\u6C97\u80EE\u96F1\u6EC2\u8196\u9736",
  "p\xE1ng": "\u5390\u5906\u5C28\u5F77\u5E9E\u9004\u5EAC\u8DBD\u823D\u5ACE\u5FAC\u8180\u7BE3\u8783\u9CD1\u9F8E\u9F90\u9C1F",
  "p\u01CEng": "\u55D9\u802A\u89AB",
  "p\xE0ng": "\u7090\u80A8\u80D6\u772B",
  "p\u0101o": "\u629B\u62CB\u812C\u8422\u85E8\u7A6E",
  "p\xE1o": "\u5486\u5789\u5E96\u72CD\u70B0\u722E\u74DF\u888D\u94C7\u530F\u70F0\u888C\u8DC1\u8EF3\u924B\u9784\u891C\u9E83\u9E85",
  "p\u01CEo": "",
  "p\xE0o": "\u5945\u75B1\u76B0\u7832\u888C\u9764\u9EAD\u5697\u791F\u792E",
  "p\u0113i": "\u599A\u5478\u600C\u62B7\u80A7\u67F8\u80DA\u8843\u9185",
  "p\xE9i": "\u962B\u966A\u57F9\u5A44\u6BF0\u8D54\u952B\u88F5\u88F4\u8CE0\u9307",
  "p\u011Bi": "\u4FD6\u7423",
  "p\xE8i": "\u4F02\u5983\u6C9B\u72BB\u4F69\u5E14\u59F5\u65BE\u67ED\u65C6\u6D7F\u73EE\u914D\u6DE0\u68D1\u5A90\u84DC\u8F94\u99B7\u5D8F\u9708\u6508\u8F61",
  "p\u0113n": "\u5674\u6FC6\u6B55",
  "p\xE9n": "\u74EB\u76C6\u6E53\u8450",
  "p\u011Bn": "\u5460\u7FF8",
  "p\xE8n": "\u55AF\u5674",
  "p\u0113ng": "\u4EA8\u5309\u6026\u62A8\u6CD9\u6072\u80D3\u7830\u6888\u70F9\u7851\u7D63\u8EEF\u527B\u959B\u6F30\u562D\u99CD\u78DE",
  "p\xE9ng": "\u8283\u670B\u6337\u7AFC\u5017\u6340\u8391\u580B\u5F38\u6DDC\u88B6\u68DA\u6916\u50B0\u585C\u5873\u6412\u6F28\u75ED\u787C\u7A1D\u84EC\u9E4F\u6A25\u71A2\u6189\u6F8E\u8F23\u7BE3\u7BF7\u81A8\u930B\u97F8\u9AFC\u87DA\u87DB\u9B05\u7E84\u8615\u97FC\u9D6C\u9A2F\u9B14\u945D",
  "p\u011Bng": "\u6367\u6DCE\u768F\u6453",
  "p\xE8ng": "\u63BD\u692A\u78B0\u959B\u69F0\u8E2B\u78DE",
  "pi": "\u698C",
  "p\u012B": "\u4E15\u4F13\u4F3E\u599A\u6279\u7EB0\u90B3\u576F\u5CAF\u6036\u62AB\u62B7\u6788\u708B\u72C9\u72D3\u7812\u6082\u79DB\u79E0\u7D15\u94CD\u9674\u65C7\u7FCD\u801A\u8C7E\u91FD\u921A\u925F\u9294\u78C7\u99D3\u9AEC\u567C\u9303\u930D\u9B7E\u61B5\u7915\u7914\u939E\u9739",
  "p\xED": "\u76AE\u4EF3\u9630\u7EB0\u8298\u9642\u6787\u80B6\u6BD8\u6BD7\u75B2\u7B13\u7D15\u868D\u90EB\u94CD\u5564\u57E4\u5D25\u7308\u86BE\u86BD\u8C7C\u7137\u7435\u7986\u813E\u8157\u88E8\u9239\u9C8F\u7F74\u818D\u8731\u7F77\u96A6\u9B6E\u58C0\u8795\u9B8D\u7BFA\u87B7\u8C94\u979E\u9D67\u7F86\u6707\u9F19\u882F",
  "p\u01D0": "\u5339\u5E80\u758B\u4EF3\u572E\u5421\u82C9\u6082\u8134\u75DE\u92A2\u5D8F\u8AC0\u9D04\u64D7\u567D\u7656\u56AD",
  "p\xEC": "\u5C41\u57E4\u6DE0\u63CA\u5AD3\u5AB2\u7765\u6F4E\u7A2B\u50FB\u6FBC\u568A\u6FDE\u7513\u7588\u8B6C\u95E2\u9DFF\u9E0A",
  "pi\u0101n": "\u56E8\u504F\u5AA5\u6944\u728F\u7BC7\u7FE9\u9342\u9DA3",
  "pi\xE1n": "\u9A88\u80FC\u7F0F\u8141\u6969\u8CC6\u8DF0\u7478\u7DF6\u9ABF\u8E41\u99E2\u74B8\u9A08",
  "pi\u01CEn": "\u8991\u8C1D\u8CB5\u8ADE",
  "pi\xE0n": "\u7335\u9A97\u9B78\u7371\u9A17\u9A19",
  "pi\u0101o": "\u527D\u52E1\u560C\u5AD6\u5F6F\u6153\u7F25\u98D8\u65DA\u7E39\u7FF2\u87B5\u72A5\u98C3\u98C4\u9B52",
  "pi\xE1o": "\u5AD6\u74E2\u85B8\u95DD",
  "pi\u01CEo": "\u83A9\u6B8D\u7F25\u779F\u7BFB\u7E39\u91A5\u76AB\u9860",
  "pi\xE0o": "\u50C4\u5F6F\u5FB1\u9AA0\u9A43\u9C3E",
  "pi\u0113": "\u6C15\u8995\u6F4E\u6486\u66BC\u77A5",
  "pi\u011B": "\u4E3F\u82E4\u9405",
  "pi\xE8": "\u5AF3",
  "p\u012Bn": "\u62DA\u59D8\u62FC\u780F\u7917\u7A66\u99AA\u9A5E",
  "p\xEDn": "\u73AD\u8D2B\u5A26\u8CA7\u7415\u5AD4\u5B2A\u85B2\u56AC\u77C9\u860B\u8819\u98A6\u9870",
  "p\u01D0n": "\u54C1\u6980",
  "p\xECn": "\u725D\u6C56\u8058",
  "p\u012Bng": "\u4E52\u7539\u4FDC\u5A09\u6D84\u782F\u8060\u8275\u9829",
  "p\xEDng": "\u5E73\u8BC4\u51ED\u546F\u576A\u5CBC\u6CD9\u90F1\u5E21\u5EB0\u67B0\u6D34\u73B6\u80D3\u8353\u74F6\u5E32\u6DDC\u7851\u840D\u86B2\u5840\u5E48\u7129\u7501\u7F3E\u84F1\u86E2\u8A55\u99AE\u8EFF\u9C86\u51F4\u7AEE\u927C\u617F\u7BB3\u8F27\u6191\u9B83\u6A98\u7C08\u860B",
  "p\u01D0ng": "\u5C5B",
  "p\xECng": "",
  "p\u014D": "\u948B\u9642\u5761\u5CA5\u6CFA\u6CFC\u91D9\u7FCD\u9887\u6E8C\u9166\u9817\u6F51\u9197\u6FFC\u91B1\u93FA",
  "p\xF3": "\u5A46\u5619\u642B\u8522\u9131\u76A4\u6AC7\u56A9",
  "p\u01D2": "\u53F5\u5C00\u94B7\u7B38\u9255\u7BA5\u99CA\u9AF2",
  "p\xF2": "\u5EF9\u5CB6\u6540\u6622\u6D26\u73C0\u54F1\u70DE\u7836\u7834\u7C95\u5964\u6E50\u733C\u84AA\u9B44",
  "p\u014Du": "\u6299\u5256\u5A1D\u634A",
  "p\xF3u": "\u6294\u6299\u57BA\u634A\u638A\u88D2\u7B81",
  "p\u01D2u": "\u5485\u54E3\u5A44\u638A\u68D3\u7283",
  "p\u016B": "\u6535\u6534\u6251\u62AA\u7087\u67E8\u9660\u75E1\u79FF\u5657\u64B2\u6F7D\u92EA\u9BC6",
  "p\xFA": "\u5724\u530D\u6357\u8386\u83E9\u83D0\u8461\u84B2\u84B1\u50D5\u7B81\u917A\u58A3\u735B\u749E\u6FEE\u77A8\u7A59\u9564\u8D0C\u7E80\u93F7",
  "p\u01D4": "\u5703\u57D4\u6D66\u70F3\u666E\u5711\u6EA5\u669C\u8C31\u8AE9\u64C8\u6A38\u6C06\u6A8F\u9568\u8B5C\u8E7C\u9420",
  "p\xF9": "\u75E1\u8217\u8216\u92EA\u66DD",
  "qi": "\u5550",
  "q\u012B": "\u4E03\u8FC9\u6C8F\u6053\u67D2\u501B\u51C4\u6864\u90EA\u5A38\u60BD\u621A\u637F\u687C\u6DD2\u840B\u55B0\u6532\u6567\u68F2\u6B39\u6B3A\u7D2A\u7F09\u50B6\u8904\u50DB\u5601\u5884\u617D\u69BF\u6F06\u7DC0\u617C\u7DDD\u8AC6\u8E26\u8787\u970B\u8E4A\u9B4C\u93DA\u9D88",
  "q\xED": "\u4E0C\u4E93\u4F0E\u7941\u573B\u5C93\u5C90\u5FEF\u82AA\u4E9D\u6589\u6B67\u7541\u7947\u7948\u80B5\u4FDF\u75A7\u8360\u5258\u658A\u65C2\u7AD2\u8006\u8110\u8694\u8691\u869A\u966D\u9880\u57FC\u5D0E\u5E3A\u6391\u6DC7\u7309\u7566\u8401\u8415\u8DC2\u8EDD\u91EE\u9A90\u9A91\u5D5C\u68CA\u68CB\u7426\u742A\u797A\u86F4\u9691\u612D\u7881\u7895\u7A18\u8900\u951C\u980E\u9B3F\u65D7\u7CB8\u7DA5\u7DA8\u7DA6\u871D\u871E\u9F4A\u7482\u79A5\u8572\u89ED\u87A7\u9321\u9CAF\u61E0\u6FDD\u85BA\u85C4\u913F\u6AB1\u6AC0\u7C2F\u7C31\u81CD\u9A0E\u9A0F\u9CCD\u8604\u9BD5\u9D78\u9D80\u9E92\u7C4F\u8269\u8810\u9B10\u9A39\u9C2D\u7382\u9EA1",
  "q\u01D0": "\u4E5E\u9094\u4F01\u5C7A\u8291\u542F\u5447\u675E\u7398\u76C0\u5518\u8C48\u8D77\u5554\u5553\u555F\u5A4D\u68A9\u7EEE\u88B3\u8DC2\u6675\u68E8\u7DAE\u7DBA\u8AEC\u95D9",
  "q\xEC": "\u6C14\u8BAB\u5FD4\u6271\u6C17\u6C54\u8FC4\u545A\u5F03\u6C7D\u77F5\u829E\u4E9F\u546E\u6CE3\u7081\u76F5\u54A0\u6D13\u7AD0\u6814\u6B2B\u6C23\u8A16\u552D\u710F\u5921\u6112\u68C4\u6E46\u6E47\u847A\u6ECA\u789B\u6456\u66A3\u7508\u78B6\u5650\u6187\u69ED\u8D9E\u5668\u61A9\u78DC\u78E7\u78E9\u85D2\u7918\u7F4A\u87FF\u9411",
  "qi\u0101": "\u62B2\u6390\u88B7\u63E2\u845C\u64D6",
  "qi\xE1": "",
  "qi\u01CE": "\u62E4\u5CE0\u8DD2\u9160\u9790",
  "qi\xE0": "\u5736\u51BE\u533C\u54AD\u5E22\u6070\u6D3D\u80E2\u6B8E\u7848\u6118\u78CD\u9AC2",
  "qi\u0101n": "\u5343\u4EDF\u9621\u5731\u5732\u5977\u6266\u6C58\u828A\u8FC1\u4F65\u5C8D\u6744\u6C67\u833E\u6B26\u7ACF\u81E4\u948E\u62EA\u7275\u7C81\u60AD\u6333\u8688\u8C38\u5A5C\u5B6F\u727D\u91FA\u6394\u8C26\u9206\u50C9\u6106\u7B7E\u925B\u9A9E\u9E50\u6173\u6434\u647C\u6481\u53B1\u78CF\u8AD0\u9077\u9CFD\u8930\u8B19\u9845\u6AB6\u6510\u6511\u6ACF\u7C3D\u93F2\u9D6E\u5B45\u6513\u9A2B\u7C56\u9B1C\u9B1D\u7C64\u97C6",
  "qi\xE1n": "\u4EF1\u5C92\u5FF4\u6272\u62D1\u73AA\u4E79\u524D\u70B6\u8368\u94A4\u6B6C\u8654\u8699\u94B1\u94B3\u5042\u63AE\u63F5\u8EE1\u4E81\u5A8A\u6701\u728D\u8465\u9210\u7154\u9257\u5898\u69A9\u7B9D\u92AD\u648D\u6F5B\u6F5C\u7FAC\u8541\u6A6C\u9322\u9ED4\u9386\u9EDA\u9A1D\u6FF3\u9A1A\u704A\u9C2C",
  "qi\u01CEn": "\u51F5\u80B7\u550A\u6DFA\u5D70\u9063\u69CF\u8181\u8738\u8C34\u7F31\u7E7E\u8B74\u9453",
  "qi\xE0n": "\u6B20\u520B\u4F23\u82A1\u4FD4\u831C\u5029\u6093\u5811\u6385\u5094\u68C8\u6920\u6B3F\u55DB\u614A\u7698\u84A8\u5879\u6B49\u7DAA\u8533\u5119\u69E7\u7BCF\u8F24\u7BDF\u58CD\u5B31\u7E34",
  "qi\u0101ng": "\u7F8C\u6215\u6217\u65A8\u67AA\u73B1\u77FC\u7F97\u7310\u554C\u8DC4\u55F4\u690C\u6EAC\u7347\u8154\u55C6\u6436\u8723\u9516\u5D88\u6227\u6464\u69CD\u7244\u7472\u7FAB\u9535\u7BEC\u8B12\u8E4C\u8E61\u9397\u93D8\u93F9\u9DAC",
  "qi\xE1ng": "\u5F37\u5899\u5AF1\u8537\u6A2F\u6F12\u8503\u58BB\u5B19\u5EE7\u5F4A\u8594\u6AA3\u7246\u8262\u8620",
  "qi\u01CEng": "\u5F37\u7F9F\u6436\u7FA5\u588F\u5F4A\u7E48\u8941\u956A\u7E66\u93F9",
  "qi\xE0ng": "\u6217\u709D\u5534\u8DC4\u55C6\u6227\u646A\u7197\u7FBB",
  "qi\u0101o": "\u5E29\u7857\u90FB\u55BF\u5D6A\u714D\u8DF7\u9125\u9121\u5281\u52EA\u5E53\u6572\u6BC3\u8E0D\u9539\u589D\u78BB\u78DD\u981D\u9AB9\u58BD\u5E67\u6A47\u71C6\u7F32\u6A7E\u78FD\u936C\u936B\u7909\u7E51\u7E70\u8DAC\u8E7A\u8E7B\u93D2\u9430",
  "qi\xE1o": "\u4E54\u4FA8\u5CE4\u834D\u835E\u6865\u785A\u83EC\u55AC\u7744\u50D1\u646E\u69D7\u8C2F\u563A\u58A7\u5AF6\u5DA0\u6194\u6F50\u854E\u9792\u6A35\u6A4B\u71CB\u729E\u7644\u77A7\u7904\u7FF9\u6AF5\u85EE\u8B59\u8DAB\u9408\u97BD\u9866",
  "qi\u01CEo": "\u4E02\u5DE7\u91E5\u6100\u9ADC",
  "qi\xE0o": "\u8BEE\u9657\u5CED\u7A8D\u5062\u6BBB\u6BBC\u8A9A\u9ADA\u50FA\u563A\u64AC\u7BBE\u566D\u64BD\u9798\u97D2\u7909\u7AC5\u7FF9\u97A9\u8E88",
  "qi\u0113": "\u82C6",
  "qi\xE9": "\u767F\u4F3D\u8304\u807A",
  "qi\u011B": "",
  "qi\xE8": "\u5392\u59BE\u602F\u758C\u90C4\u5327\u7A83\u608F\u6308\u6814\u6D2F\u5E39\u60EC\u6DC1\u7B21\u611C\u6904\u7330\u86EA\u8D84\u8DD9\u55DB\u614A\u6705\u7A27\u7BA7\u9532\u7BCB\u8E25\u7A55\u9365\u9BDC\u7ACA\u7C61",
  "q\u012Bn": "\u5153\u4FB5\u94A6\u887E\u9A8E\u83F3\u5A87\u5D5A\u6B3D\u5D70\u7D85\u8A9B\u5D94\u89AA\u9849\u99F8\u9BBC\u5BF4",
  "q\xEDn": "\u5E88\u5FF4\u6272\u82A9\u82B9\u80A3\u77DC\u57D0\u73E1\u77DD\u79E6\u8039\u83E6\u8699\u6366\u83F3\u7434\u7439\u79BD\u8983\u9219\u922B\u96C2\u52E4\u55EA\u5AC0\u6EB1\u9772\u5ED1\u616C\u5659\u5D9C\u64D2\u65B3\u9CF9\u61C4\u6A8E\u6FBF\u763D\u8793\u61C3\u8804\u9D6D",
  "q\u01D0n": "\u5745\u6611\u7B09\u68AB\u8D7E\u5BD1\u9513\u5BDD\u5BD6\u5BE2\u92DF\u87BC",
  "q\xECn": "\u5422\u5423\u628B\u6C81\u551A\u83E3\u63FF\u6407\u64B3\u5BF4\u7019\u85FD",
  "q\u012Bng": "\u9751\u9752\u6C22\u8F7B\u503E\u537F\u90EC\u570A\u57E5\u5BC8\u6C2B\u6DF8\u6E05\u8EFD\u50BE\u7DAA\u873B\u8F15\u9306\u9CAD\u9BD6\u944B",
  "q\xEDng": "\u591D\u7520\u5260\u52CD\u5568\u60C5\u6B91\u7858\u6674\u68FE\u6C30\u845D\u6692\u64CF\u6A08\u64CE\u6AA0\u9EE5",
  "q\u01D0ng": "\u82D8\u9877\u8BF7\u5EBC\u9803\u5ECE\u6F00\u8ACB\u6ABE\u8B26",
  "q\xECng": "\u5E86\u51CA\u6385\u6BB8\u6E39\u7883\u7B90\u7DAE\u9758\u6176\u78EC\u89AA\u512C\u6FEA\u7F44\u6AE6",
  "qi\u014Dng": "",
  "qi\xF3ng": "\u536D\u909B\u5B86\u7A77\u7A79\u8315\u684F\u60F8\u7401\u7B47\u7B3B\u8D79\u712A\u712D\u743C\u823C\u86EC\u86E9\u7162\u718D\u7758\u8DEB\u928E\u778F\u7AAE\u511D\u5B1B\u618C\u6A69\u749A\u85D1\u74CA\u7AC6\u85ED\u74D7",
  "qi\xF2ng": "",
  "qi\u016B": "\u4E18\u4E20\u90B1\u5775\u6058\u79CC\u79CB\u6077\u86AF\u5A9D\u6E6B\u8429\u6978\u6E6C\u5878\u84F2\u9E59\u7BCD\u7DE7\u8775\u7A50\u8DA5\u9F9C\u6A5A\u9CC5\u87D7\u97A6\u97A7\u8612\u9C0C\u9C0D\u9D96\u8824\u9F9D",
  "qi\xFA": "\u53B9\u53F4\u56DA\u624F\u72B0\u738C\u827D\u8281\u6739\u6C53\u808D\u6C42\u866C\u6CC5\u726B\u866F\u4FC5\u89D3\u8A05\u8A04\u914B\u5512\u6D57\u7D0C\u838D\u900E\u9011\u91DA\u6882\u6B8F\u6BEC\u7403\u8D47\u91FB\u9804\u5D37\u5DEF\u6E1E\u6E6D\u76B3\u76DA\u9052\u716A\u7D7F\u86F7\u88D8\u5DF0\u89E9\u8CD5\u7486\u8764\u92B6\u9194\u9B82\u9F3D\u9BC4\u9C3D",
  "qi\u01D4": "\u641D\u7CD7",
  "qi\xF9": "",
  "q\u016B": "\u4F39\u4F49\u5324\u5C96\u8BCE\u9639\u9A71\u547F\u5765\u5C48\u5CB4\u62BE\u6D40\u795B\u80E0\u88AA\u5340\u710C\u7D36\u86C6\u8EAF\u7140\u7B41\u7CAC\u86D0\u8A58\u8D8D\u5D87\u6188\u99C6\u657A\u89D1\u8AB3\u99C8\u9EB9\u9AF7\u9B7C\u8DA8\u9EAF\u89B0\u89B7\u8EC0\u9D8C\u9EB4\u9EE2\u89BB\u9A45\u9C38\u9C4B",
  "q\xFA": "\u4F62\u52AC\u65AA\u6710\u80CA\u83C3\u8850\u9E32\u6DED\u7D47\u7FD1\u86BC\u844B\u8EE5\u8556\u7496\u78F2\u87B6\u9D1D\u74A9\u7FF5\u87DD\u77BF\u9F29\u8627\u5FC2\u7048\u6235\u6B0B\u6C0D\u7220\u7C67\u81DE\u766F\u6B14\u8837\u8862\u8EA3\u883C\u947A\u9E1C",
  "q\u01D4": "\u82E3\u53D6\u7AD8\u5A36\u7D36\u8A53\u7AEC\u877A\u9F8B\u9F72",
  "q\xF9": "\u53BB\u53BA\u521E\u6B2A\u801D\u9612\u89D1\u95B4\u9EAE\u95C3\u9F01\u89B0\u89B7\u89BB",
  "qu\u0101n": "\u594D\u5F2E\u609B\u570F\u68EC\u6926\u7B9E\u9409",
  "qu\xE1n": "\u5168\u6743\u4F7A\u72CB\u8BE0\u59FE\u5CD1\u606E\u6CC9\u6D24\u8343\u62F3\u7277\u8F81\u5573\u57E2\u5A58\u60D3\u6372\u75CA\u7842\u94E8\u6926\u6E76\u7288\u7B4C\u7D5F\u8472\u643C\u697E\u7454\u89E0\u8A6E\u8DE7\u8F07\u8737\u9293\u69EB\u6A29\u8E21\u7E13\u919B\u99E9\u95CE\u9CC8\u9B08\u9A21\u5B49\u5DCF\u9C01\u6B0A\u9F64\u77D4\u8838\u98A7\u9874\u7065",
  "qu\u01CEn": "\u72AD\u72AC\u72AE\u754E\u70C7\u7EFB\u7DA3\u8647",
  "qu\xE0n": "\u529D\u7276\u52E7\u97CF\u52F8\u7065",
  "qu\u0113": "\u7094\u7F3A\u7F3C\u8697\u849B\u9619\u95D5",
  "qu\xE9": "\u7638",
  "qu\xE8": "\u6C4B\u5374\u537B\u57C6\u5D05\u60AB\u7437\u5095\u6560\u656A\u68E4\u785E\u786E\u9615\u5859\u6409\u76B5\u788F\u9619\u9E4A\u6128\u69B7\u58A7\u6164\u78BB\u78BA\u8D9E\u71E9\u95CB\u7910\u95D5\u9D72\u792D",
  "q\u016Bn": "\u590B\u56F7\u9021\u7B98\u6B4F",
  "q\xFAn": "\u5BAD\u5CEE\u5E2C\u88D9\u7FA3\u7FA4\u88E0\u9E87",
  "q\u01D4n": "",
  "r\xE1n": "\u5465\u80B0\u887B\u8887\u86A6\u88A1\u86BA\u7136\u9AE5\u562B\u9AEF\u71C3\u7E4E",
  "r\u01CEn": "\u5184\u5189\u59CC\u82D2\u67D3\u73C3\u5AA3\u8485\u71AF\u6A6A",
  "r\xE0n": "",
  "r\u0101ng": "",
  "r\xE1ng": "\u7A63\u5134\u52F7\u703C\u737D\u8618\u79B3\u74E4\u7A70\u8E9F\u9B24",
  "r\u01CEng": "\u58CC\u58E4\u6518\u7219\u7E95",
  "r\xE0ng": "\u8BA9\u61F9\u8B72\u8B93",
  "r\xE1o": "\u5A06\u835B\u9976\u6861\u5B08\u8558\u6A48\u8953\u9952",
  "r\u01CEo": "\u6270\u5A06\u96A2\u5B08\u64FE",
  "r\xE0o": "\u7ED5\u9076\u7A58\u7E5E",
  "r\xE9": "\u637C",
  "r\u011B": "\u558F\u60F9",
  "r\xE8": "\u70ED\u6E03\u71B1",
  "r\xE9n": "\u4EBB\u4EBA\u4EC1\u58EC\u5FC8\u6732\u5FCE\u79C2\u82A2\u9B5C\u928B\u9D40",
  "r\u011Bn": "\u5FCD\u834F\u6820\u6823\u8375\u79F9\u83CD\u68EF\u7A14\u7D9B\u8EB5\u928B",
  "r\xE8n": "\u5203\u5204\u8BA4\u4EDE\u4EED\u8BB1\u5C7B\u5C83\u6268\u7EAB\u598A\u6752\u7263\u7EB4\u8095\u8F6B\u97E7\u996A\u794D\u59D9\u7D09\u887D\u7D1D\u8A12\u8ED4\u6895\u88B5\u91F0\u91FC\u7D4D\u814D\u9213\u9771\u976D\u97CC\u98EA\u8A8D\u9901",
  "r\u0113ng": "\u6254",
  "r\xE9ng": "\u4ECD\u8FB8\u793D\u82BF\u967E",
  "r\xEC": "\u65E5\u9A72\u56F8\u6C1C\u8875\u91F0\u91FC\u9224\u99B9",
  "r\xF3ng": "\u620E\u809C\u6804\u72E8\u7ED2\u8319\u8338\u8363\u5BB9\u5CF5\u6BE7\u70FF\u509B\u5AB6\u5D58\u6411\u7D68\u7FA2\u5AC6\u5D64\u6408\u69B5\u6EB6\u84C9\u6995\u69AE\u7194\u7462\u7A41\u69E6\u7E19\u877E\u8923\u9555\u878E\u878D\u99E5\u5B2B\u5DB8\u7203\u9394\u701C\u66E7\u8811",
  "r\u01D2ng": "\u5197\u5B82\u5748\u5087\u8EF5\u7E19\u6C04",
  "r\xF2ng": "\u7A43\u7E19",
  "r\xF3u": "\u53B9\u79B8\u67D4\u7C88\u811C\u5A83\u63C9\u6E18\u8447\u697A\u7163\u7448\u816C\u7CC5\u875A\u8E42\u8F2E\u9352\u97A3\u74C7\u9A25\u9C07\u9D94",
  "r\u01D2u": "\u97D6",
  "r\xF2u": "\u8089\u5B8D\u697A\u8B73",
  "r\u016B": "\u5DBF",
  "r\xFA": "\u909A\u5982\u543A\u4F9E\u5E24\u8339\u6310\u6847\u88BD\u94F7\u6E2A\u7B4E\u8498\u92A3\u8560\u8761\u5112\u9D11\u5685\u5B2C\u5B7A\u6FE1\u7373\u85B7\u9D3D\u66D8\u6ABD\u8966\u7E7B\u8815\u98A5\u91B9\u986C\u9C6C",
  "r\u01D4": "\u6C5D\u8097\u4E73\u8FB1\u910F\u64E9",
  "r\xF9": "\u5165\u6256\u6741\u6D33\u55D5\u5AB7\u6EBD\u7F1B\u84D0\u9CF0\u8925\u7E1F",
  "ru\xE1n": "\u5827\u648B\u58D6",
  "ru\u01CEn": "\u962E\u670A\u8F6F\u800E\u5044\u8EDF\u5A86\u744C\u815D\u789D\u7DDB\u8F2D\u6ABD\u74C0\u791D",
  "ru\xE0n": "\u7DDB",
  "ru\xED": "\u82FC\u6875\u7524\u7DCC\u8564",
  "ru\u01D0": "\u60E2\u854B\u854A\u6A64\u7E60\u58E1\u8603\u8602",
  "ru\xEC": "\u514A\u514C\u6290\u6C6D\u82AE\u6798\u7B0D\u868B\u9510\u745E\u8739\u777F\u92B3\u92ED\u53E1\u93F8",
  "r\xFAn": "\u77A4",
  "r\u01D4n": "",
  "r\xF9n": "\u95F0\u6DA6\u958F\u95A0\u6F64\u6A4D\u81B6",
  "ru\xF3": "\u633C\u637C",
  "ru\xF2": "\u53D2\u504C\u5F31\u9100\u5A7C\u6E03\u712B\u6949\u5D76\u84BB\u7BAC\u7BDB\u7207\u9C19\u9C2F\u9DB8",
  "sa": "",
  "s\u0101": "\u4EE8",
  "s\u01CE": "\u8A2F\u9778\u6F75\u9788\u6503\u7051\u8EA0\u7E9A",
  "s\xE0": "\u5345\u6CE7\u9491\u98D2\u810E\u8428\u9212\u644B\u96A1\u99BA\u856F\u98AF\u85A9\u6AD2\u93FE",
  "s\u0101i": "\u6BE2\u6122\u63CC\u6BF8\u816E\u5625\u567B\u9CC3\u984B\u9C13",
  "s\u01CEi": "\u55EE",
  "s\xE0i": "\u8D5B\u50FF\u8CFD\u7C3A",
  "san": "\u58ED",
  "s\u0101n": "\u4E09\u5F0E\u53C1\u53C3\u53C4\u53C5\u6BF6\u6BF5\u5381\u6BFF\u7299\u9B16",
  "s\u01CEn": "\u4ED0\u4F1E\u5098\u7CC1\u9993\u7CDD\u7CE4\u7CE3\u7E56\u93D2\u93FE\u994A",
  "s\xE0n": "\u4FD5\u5E34\u9590\u6F75",
  "s\u0101ng": "\u6852\u6851\u55AA\u69E1",
  "s\u01CEng": "\u55D3\u6421\u78C9\u892C\u98A1\u939F\u9859",
  "s\xE0ng": "\u55AA",
  "s\u0101o": "\u63BB\u6145\u6414\u6E9E\u7F2B\u61C6\u7F32\u87A6\u7E45\u9CCB\u98BE\u9A12\u7E70\u9A37\u9C20\u9C62",
  "s\u01CEo": "\u57FD\u6383\u5AC2",
  "s\xE0o": "\u57FD\u6383\u7619\u61C6\u6C09\u77C2\u9ADE",
  "s\u0113": "\u95AA",
  "s\xE8": "\u8272\u62FA\u6D13\u681C\u6DA9\u556C\u6E0B\u7CA3\u94EF\u96ED\u6B6E\u7417\u55C7\u745F\u6475\u6B70\u92AB\u69ED\u6F81\u5EE7\u61CE\u64CC\u6FC7\u6FCF\u7637\u7A51\u8594\u6F80\u74B1\u7012\u7A61\u938D\u7E6C\u7A6F\u8F56\u93FC\u95DF\u8B45\u98CB",
  "s\u0113n": "\u68EE\u692E\u69EE\u8942",
  "s\u011Bn": "",
  "s\u0113ng": "\u50E7\u9B19",
  "s\xE8ng": "",
  "s\u012B": "\u53B6\u7E9F\u4E1D\u53F8\u7CF9\u7CF8\u79C1\u549D\u6CC0\u4FEC\u6056\u8652\u9E36\u5072\u5082\u5AA4\u6122\u65AF\u7D72\u7F0C\u86F3\u6952\u7997\u9270\u98D4\u51D8\u53AE\u79A0\u7F73\u8724\u92AF\u9536\u5636\u565D\u5EDD\u6495\u6F8C\u78C3\u7DE6\u856C\u92D6\u71CD\u8784\u9376\u87D6\u87F4\u98B8\u9A26\u9BE3\u9401\u9DE5\u9F36",
  "s\xED": "",
  "s\u01D0": "\u6B7B\u6122",
  "s\xEC": "\u5DF3\u4E96\u56DB\u5BFA\u6C5C\u4F40\u5155\u59D2\u6CE4\u7940\u4FA1\u5B60\u676B\u6CD7\u9972\u9A77\u4FDF\u5A30\u67B1\u67F6\u6D20\u726D\u6D0D\u6D98\u8082\u98E4\u68A9\u7B25\u801B\u801C\u91F2\u7AE2\u8997\u55E3\u8086\u8C84\u9236\u923B\u98F4\u98FC\u69B9\u9289\u79A9\u99DF\u857C\u5129\u9A03\u7003",
  "s\u014Dng": "\u5FEA\u6780\u677E\u67A9\u5A00\u67D7\u502F\u51C7\u5D27\u5EBA\u68A5\u6DDE\u83D8\u6121\u63D4\u68C7\u5D69\u7879\u61BD\u6FCD\u6AA7\u9B06",
  "s\xF3ng": "",
  "s\u01D2ng": "\u6002\u609A\u6352\u8038\u7AE6\u50B1\u612F\u6964\u5D77\u6457\u6F0E\u616B\u8073\u99F7",
  "s\xF2ng": "\u5405\u8BBC\u5B8B\u8BF5\u9001\u9882\u8A1F\u980C\u8AA6\u93B9\u9938",
  "s\u014Du": "\u51C1\u6352\u635C\u910B\u55D6\u5EC0\u5ECB\u641C\u6EB2\u7340\u8490\u84C3\u998A\u6449\u98D5\u6457\u953C\u64A8\u8258\u878B\u9199\u93AA\u993F\u98BC\u98BE\u93C9\u9A2A",
  "s\u01D2u": "\u53DC\u53DF\u5081\u68F7\u84C3\u55FE\u778D\u64DE\u85AE\u64FB\u85EA\u6AE2\u7C54",
  "s\xF2u": "\u6B36\u55FD\u64DE\u7636\u64FB",
  "s\u016B": "\u7526\u9165\u7A21\u7A23\u7AA3\u7A4C\u9BC2\u8607\u8613\u6AEF\u56CC",
  "s\xFA": "\u5731\u4FD7",
  "s\u01D4": "",
  "s\xF9": "\u738A\u5919\u8BC9\u6CDD\u8083\u6D2C\u6D91\u73DF\u7D20\u83A4\u901F\u57E3\u6880\u6B90\u7C9B\u9A95\u5083\u68F4\u7C9F\u8A34\u8C21\u55C9\u5851\u5850\u5ACA\u612B\u6EAF\u6EB8\u8085\u9061\u9E54\u50F3\u612C\u6475\u69A1\u8186\u850C\u89EB\u8D9A\u906C\u619F\u6A15\u6A0E\u6F65\u78BF\u92C9\u9917\u6F5A\u7E24\u6A5A\u749B\u7C0C\u7E2E\u85D7\u8B16\u8E5C\u9A4C\u9C50\u9DEB",
  "su\u0101n": "\u72FB\u75E0\u9178",
  "su\u01CEn": "\u5334\u7BF9",
  "su\xE0n": "\u7958\u7B07\u7B6D\u849C\u7B97",
  "su\u012B": "\u590A\u8295\u867D\u5020\u54F8\u5A1E\u6D7D\u837E\u837D\u772D\u6BF8\u6ED6\u7762\u7F1E\u55FA\u71A3\u6FC9\u7E17\u9796\u96D6",
  "su\xED": "\u7EE5\u968B\u968F\u9040\u7D8F\u96A8\u74CD\u9AC4",
  "su\u01D0": "\u81B8\u7021\u9AD3",
  "su\xEC": "\u4E97\u5C81\u7815\u795F\u8C07\u57E3\u5D57\u9042\u6B72\u6B73\u716B\u775F\u788E\u96A7\u5B18\u6FBB\u7A42\u8AB6\u8CE5\u6A96\u71E7\u74B2\u79AD\u7A57\u7A5F\u7E40\u895A\u9083\u65DE\u7E50\u7E78\u8B62\u9406\u93F8\u9429\u97E2",
  "s\u016Bn": "\u72F2\u836A\u5B6B\u55B0\u98E7\u98F1\u640E\u733B\u84C0\u69C2\u8575\u859E",
  "s\u01D4n": "\u627B\u635F\u7B0B\u96BC\u7B4D\u640D\u69AB\u7BB0\u7C28\u93A8\u9DBD",
  "s\xF9n": "\u644C",
  "su\u014D": "\u5506\u5A11\u6331\u838F\u838E\u509E\u6332\u686B\u68AD\u7743\u55CD\u55E6\u7FA7\u84D1\u644D\u8D96\u7C11\u7C14\u7E2E\u9BBB",
  "su\xF3": "",
  "su\u01D2": "\u6240\u4E7A\u5522\u7D22\u7411\u7410\u5AC5\u60E2\u9501\u55E9\u669B\u6E91\u7355\u7463\u8928\u7485\u7E12\u938D\u9396\u93BB\u93C1",
  "su\xF2": "\u9024\u6EB9\u8736",
  "sh\u0101": "\u6740\u6749\u7EB1\u4E77\u524E\u7802\u5526\u6331\u6BBA\u7300\u7C86\u7D17\u838E\u6332\u686C\u6BEE\u94E9\u75E7\u7870\u644B\u8531\u88DF\u699D\u6A27\u9B66\u9CA8\u95B7\u9AFF\u93A9\u9BCA\u9BCB\u7E7A",
  "sh\xE1": "\u5565",
  "sh\u01CE": "\u50BB\u510D",
  "sh\xE0": "\u503D\u553C\u5551\u5E39\u83E8\u8410\u55A2\u55C4\u5EC8\u6B43\u7FDC\u6B70\u7B91\u7FE3\u6FC8\u95AF\u970E",
  "sh\u0101i": "\u7B5B\u7BE9\u8AF0\u7C01\u7C1B\u7C6D",
  "sh\u01CEi": "\u644B",
  "sh\xE0i": "\u6652\u6526\u66EC",
  "sh\u0101n": "\u5C71\u5F61\u9096\u5738\u5220\u522A\u6749\u829F\u59CD\u59D7\u886B\u9490\u57CF\u633B\u67F5\u70B6\u72E6\u73CA\u8222\u75C1\u8120\u8ED5\u7B18\u91E4\u958A\u5093\u8DDA\u527C\u6427\u7154\u5607\u5E53\u717D\u6F78\u6F98\u7A47\u6A86\u7E3F\u81BB\u9BC5\u7FB4\u7FB6",
  "sh\xE1n": "",
  "sh\u01CEn": "\u95EA\u9655\u70B6\u965D\u9583\u9584\u6671\u7154\u7752\u647B\u718C\u89A2",
  "sh\xE0n": "\u8BAA\u6C55\u59CD\u59D7\u759D\u9490\u5261\u8A15\u8D78\u639E\u91E4\u5584\u55AE\u692B\u7985\u928F\u9A9F\u50D0\u912F\u5103\u58A1\u58A0\u64A3\u6F6C\u7F2E\u5B17\u5DA6\u64C5\u657E\u6A3F\u6B5A\u79AA\u81B3\u78F0\u8B06\u8D61\u7E55\u87EE\u87FA\u8B71\u8D0D\u9425\u994D\u9A38\u9CDD\u9CE3\u7057\u9C53\u9C54",
  "shang": "",
  "sh\u0101ng": "\u4F24\u6B87\u5546\u6113\u6E6F\u89DE\u50B7\u7993\u5892\u616F\u6EF3\u6F21\u850F\u6BA4\u71B5\u87AA\u89F4\u8B2A\u9B3A",
  "sh\u01CEng": "\u57A7\u6244\u664C\u57EB\u8D4F\u6A09\u8CDE\u92FF\u93DB\u8D18\u945C",
  "sh\xE0ng": "\u4E04\u5C19\u5C1A\u6066\u7EF1\u7DD4\u979D",
  "sh\u0101o": "\u5A0B\u5F30\u70E7\u83A6\u713C\u8437\u65D3\u7B72\u8244\u8F0E\u8571\u71D2\u9798\u9AFE\u9BB9",
  "sh\xE1o": "\u52FA\u828D\u6753\u82D5\u67D6\u73BF\u97F6",
  "sh\u01CEo": "",
  "sh\xE0o": "\u4F4B\u52AD\u5372\u90B5\u7ECD\u67D6\u54E8\u5A0B\u8891\u7D39\u7744\u7DA4\u6F72",
  "sh\u0113": "\u5953\u5962\u731E\u8D4A\u756D\u756C\u7572\u8F0B\u8CD2\u8CD6\u6AA8",
  "sh\xE9": "\u820C\u4F58\u8675\u9607\u63F2\u86E5\u95CD\u78FC",
  "sh\u011B": "\u820D\u6368",
  "sh\xE8": "\u538D\u8BBE\u793E\u6CCF\u820E\u820D\u5399\u6315\u6D89\u6DBB\u6E09\u8A2D\u8D66\u5F3D\u6151\u6442\u6EE0\u6174\u850E\u6B59\u8802\u97D8\u9A07\u61FE\u651D\u7044\u9E9D\u6B07",
  "sh\xE9i": "\u8AB0",
  "sh\u0113n": "\u7533\u5C7E\u625F\u4F38\u8EAB\u4F81\u519E\u547B\u59BD\u7C76\u7EC5\u7F59\u8BDC\u59FA\u67DB\u6C20\u73C5\u7A7C\u7C78\u5A20\u5CF7\u7521\u7712\u7837\u8398\u53C3\u53C4\u5814\u6552\u6DF1\u7D33\u515F\u53C5\u68FD\u8460\u88D1\u8A37\u5AC0\u6437\u7F67\u84E1\u8A75\u5E53\u7527\u7CC1\u8518\u7CC2\u71CA\u8593\u99EA\u9CB9\u66D1\u7CDD\u7CE3\u9BD3\u9D62\u9BF5\u9C3A",
  "sh\xE9n": "\u795E\u698A\u926E\u9C30",
  "sh\u011Bn": "\u90A5\u5432\u5F1E\u628C\u5BA1\u77E4\u54C2\u77E7\u5BB7\u8C02\u8C09\u5A76\u6DF0\u6E16\u8A20\u68EF\u5BE9\u8AD7\u9823\u9B6B\u66CB\u77AB\u5B38\u700B\u89BE\u8B85",
  "sh\xE8n": "\u80BE\u4FBA\u661A\u80C2\u6D81\u7718\u6E17\u7973\u8124\u8C0C\u814E\u845A\u613C\u614E\u6939\u7606\u8704\u8703\u6EF2\u92E0\u762E\u9EEE",
  "sh\u0113ng": "\u5347\u751F\u9629\u544F\u58F0\u6598\u6607\u67A1\u6CE9\u72CC\u82FC\u6B85\u7272\u73C4\u7AD4\u965E\u66FB\u9679\u6BB8\u7B19\u6E66\u713A\u7525\u924E\u8072\u935F\u9F2A\u9D7F",
  "sh\xE9ng": "\u6E11\u7EF3\u61B4\u6FA0\u7E04\u7E49\u7E69\u8B5D",
  "sh\u011Bng": "\u771A\u5057\u6E3B",
  "sh\xE8ng": "\u5723\u4E57\u5A0D\u80DC\u6660\u665F\u5270\u5269\u52DD\u6909\u8CB9\u5D4A\u741E\u8056\u58AD\u69BA\u8542\u6A73\u8CF8",
  "shi": "\u8FBB\u7C42",
  "sh\u012B": "\u5C38\u5931\u5E08\u5394\u545E\u8671\u8BD7\u90BF\u9E24\u5C4D\u65BD\u6D49\u72EE\u5E2B\u7D41\u91F6\u6E64\u6E7F\u8479\u6EAE\u6EBC\u7345\u8492\u84CD\u8A69\u9247\u5618\u7461\u917E\u9CF2\u5653\u7BB7\u8768\u9CFE\u8937\u9CBA\u6FD5\u9366\u9BF4\u9C24\u9DB3\u8979\u91C3",
  "sh\xED": "\u5341\u9963\u4E6D\u65F6\u7ACD\u5B9F\u5B9E\u65F9\u98E0\u59FC\u5CD5\u70BB\u794F\u8680\u57D8\u5BB2\u6642\u83B3\u5BD4\u6E5C\u9048\u5852\u5D75\u6EA1\u8494\u9250\u5BE6\u69AF\u78A9\u8755\u9CA5\u9B96\u9F2B\u8B58\u9F2D\u9C23",
  "sh\u01D0": "\u53F2\u77E2\u4E68\u8C55\u4F7F\u59CB\u9A76\u5158\u5BA9\u5C4E\u72F6\u75D1\u7B36\u6981\u9242\u99DB",
  "sh\xEC": "\u58EB\u793B\u4E17\u4E16\u4ED5\u5E02\u793A\u534B\u5F0F\u5FD5\u4E8A\u5FEF\u623A\u4E8B\u4F8D\u52BF\u5469\u67F9\u89C6\u8BD5\u9970\u519F\u54B6\u5BA4\u5CD9\u6040\u6043\u62ED\u6630\u662F\u67BE\u67FF\u72E7\u7702\u8D33\u9002\u683B\u70D2\u770E\u7721\u8006\u8210\u83B3\u8F7C\u901D\u94C8\u556B\u57F6\u7564\u79F2\u8996\u91C8\u5D3C\u5D3B\u5F11\u5FA5\u60FF\u63D3\u8C25\u8CB0\u91CA\u52E2\u55DC\u5F12\u6974\u7176\u7757\u7B6E\u8494\u89E2\u8A66\u8EFE\u9230\u9243\u98FE\u8213\u8A93\u9069\u927D\u99B6\u596D\u92B4\u991D\u9919\u566C\u5B15\u6FA8\u6FA4\u8AE1\u8ADF\u907E\u6AA1\u87AB\u8B1A\u7C2D\u896B\u91B3\u91CB\u9C18",
  "sh\u014Du": "\u53CE\u6536\u654A",
  "sh\xF3u": "\u719F",
  "sh\u01D2u": "\u624C\u624B\u5B88\u57A8\u9996\u824F",
  "sh\xF2u": "\u5BFF\u53D7\u72E9\u517D\u552E\u6388\u6DAD\u7EF6\u75E9\u8184\u58FD\u5900\u7626\u7DAC\u563C\u7363\u7378\u93C9",
  "sh\u016B": "\u4E66\u6BB3\u758B\u5FEC\u6292\u7EBE\u53D4\u6778\u67A2\u964E\u59DD\u5010\u500F\u6348\u66F8\u6B8A\u7D13\u5A4C\u6086\u6393\u68B3\u6DD1\u7102\u83FD\u8ED7\u9103\u7421\u758E\u758F\u8212\u6445\u6BF9\u6BFA\u7D80\u8F93\u7479\u8DFE\u8E08\u6A1E\u7DF0\u852C\u8F38\u6A7E\u9B9B\u5135\u6504\u702D\u9D68",
  "sh\xFA": "\u672E\u5C17\u79EB\u5B70\u8D4E\u84A3\u587E\u719F\u74B9\u8D16",
  "sh\u01D4": "\u9F21\u668F\u6691\u7A0C\u9ECD\u7F72\u8700\u9F20\u6578\u6F7B\u85A5\u85AF\u66D9\u7659\u85F7\u8961\u7CEC\u8969\u5C6C\u7C54\u8834\u9C6A\u9C70",
  "sh\xF9": "\u672E\u620D\u675F\u6CAD\u8FF0\u4FB8\u4FDE\u516A\u54B0\u6038\u6037\u6811\u7AD6\u8357\u6055\u6352\u5EBB\u5EB6\u7D49\u8481\u8853\u9683\u5C0C\u88CB\u7AEA\u8167\u9265\u5885\u6F31\u6F44\u6578\u6F8D\u8C4E\u6A39\u6FD6\u9330\u9714\u93E3\u9D90\u866A",
  "shu\u0101": "\u5530",
  "shu\u01CE": "\u800D",
  "shu\xE0": "\u8A9C",
  "shu\u0101i": "\u7F1E\u6454\u7E17",
  "shu\u01CEi": "\u7529",
  "shu\xE0i": "\u5E05\u5E25\u87C0\u535B",
  "shu\u0101n": "\u95E9\u62F4\u9582\u6813\u7D5F",
  "shu\xE0n": "\u6DAE\u8168\u69EB",
  "shu\u0101ng": "\u53CC\u6CF7\u971C\u96D9\u5B40\u7027\u9AA6\u5B47\u9A3B\u6B06\u7935\u9DDE\u9E74\u826D\u9A66\u9E18",
  "shu\u01CEng": "\u723D\u587D\u6161\u6F3A\u7E14\u93EF",
  "shu\xE0ng": "\u7040",
  "shu\xED": "\u8C01\u813D\u8AB0",
  "shu\u01D0": "\u6C35\u6C34\u6C3A\u9596",
  "shu\xEC": "\u5E28\u6329\u635D\u6D97\u6D9A\u5A37\u7971\u7A05\u7A0E\u88DE\u7761\u8AAA\u8AAC",
  "sh\u01D4n": "\u542E\u696F",
  "sh\xF9n": "\u987A\u7734\u821C\u9806\u8563\u6A53\u779A\u77A4\u77AC\u9B0A",
  "shu\u014D": "\u8AAA\u8AAC",
  "shu\xF2": "\u5981\u6D2C\u70C1\u6714\u94C4\u6B36\u77DF\u6420\u84B4\u928F\u612C\u69CA\u7361\u78A9\u6578\u7BBE\u9399\u720D\u9460",
  "ta": "\u4FA4",
  "t\u0101": "\u4ED6\u5B83\u7260\u7942\u8DBF\u94CA\u584C\u6999\u6EBB\u9248\u891F\u95E7",
  "t\xE1": "",
  "t\u01CE": "\u5854\u6E9A\u5896\u736D\u9B99\u9CCE\u737A\u9C28",
  "t\xE0": "\u6C93\u631E\u72E7\u95FC\u7C8F\u5D09\u6DBE\u509D\u55D2\u6428\u905D\u9062\u9618\u69BB\u6BFE\u6F2F\u79A2\u64BB\u6FBE\u8ABB\u8E0F\u9788\u5683\u6A7D\u9314\u6FCC\u8E4B\u979C\u9389\u9391\u95D2\u97B3\u8E79\u8E82\u56BA\u95DF\u95E5\u8B76\u8EA2",
  "t\u0101i": "\u56FC\u5B61\u73C6\u80CE",
  "t\xE1i": "\u65F2\u90B0\u576E\u62AC\u9A80\u67B1\u70B1\u70B2\u83ED\u8DC6\u9C90\u7B88\u81FA\u98B1\u99D8\u5113\u9B90\u5B2F\u64E1\u85B9\u6AAF\u6584\u7C49",
  "t\u01CEi": "\u5964",
  "t\xE0i": "\u592A\u51AD\u5933\u5FD5\u6C4F\u5FF2\u6C70\u6C71\u6001\u80BD\u949B\u6CF0\u8226\u915E\u9226\u6E99\u614B\u71E4",
  "t\u0101n": "\u574D\u8D2A\u6039\u5574\u75D1\u8211\u8CAA\u644A\u6EE9\u563D\u6F6C\u762B\u64F9\u6524\u7058\u7671",
  "t\xE1n": "\u575B\u6619\u5013\u8C08\u90EF\u57EE\u5A52\u60D4\u5F3E\u8983\u6983\u75F0\u952C\u8C2D\u563E\u58B0\u58B5\u5F48\u619B\u6F6D\u8AC7\u9188\u58C7\u66C7\u6A5D\u6FB9\u71C2\u931F\u6A80\u9843\u7F48\u85EB\u58DC\u7E75\u8B5A\u8C9A\u91B0\u8B60\u7F4E",
  "t\u01CEn": "\u5FD0\u5766\u8892\u94BD\u83FC\u6BEF\u50CB\u926D\u55FF\u7DC2\u5103\u61B3\u61BB\u66BA\u9193\u74AE\u8962",
  "t\xE0n": "\u53F9\u70AD\u5013\u57EE\u63A2\u509D\u6E60\u50CB\u5606\u78B3\u8215\u6B4E",
  "t\u0101ng": "\u94F4\u6E6F\u5621\u528F\u7FB0\u876A\u859A\u9557\u8E5A\u93DC\u95DB\u97BA\u9F1E",
  "t\xE1ng": "\u5763\u5510\u5802\u508F\u557A\u6113\u68E0\u910C\u5858\u5D63\u642A\u6E8F\u84CE\u969A\u69B6\u6F1F\u717B\u746D\u799F\u8185\u6A18\u78C4\u7CC3\u819B\u6A56\u7BD6\u7CD6\u8797\u8E3C\u7CDB\u87B3\u8D6F\u91A3\u9395\u9939\u93DC\u95DB\u9944\u9DB6",
  "t\u01CEng": "\u4F16\u5E11\u5052\u50A5\u8025\u8EBA\u954B\u93B2\u513B\u6203\u7059\u66ED\u7223\u77D8\u9482",
  "t\xE0ng": "\u70EB\u94F4\u6465\u71D9\u940B",
  "t\u0101o": "\u5932\u5935\u5F22\u62AD\u6D9B\u7EE6\u638F\u6DAD\u7D5B\u8A5C\u5ACD\u5E4D\u6146\u642F\u6ED4\u69C4\u746B\u97EC\u98F8\u7E1A\u7E27\u6FE4\u8B1F\u8F41\u97B1\u97DC\u9955",
  "t\xE1o": "\u530B\u8FEF\u54B7\u6D2E\u9003\u6843\u9676\u5555\u68BC\u6DD8\u7EF9\u8404\u7979\u88EA\u7DAF\u872A\u9780\u9184\u9789\u92FE\u99E3\u6AAE\u9940\u9A0A\u9F17",
  "t\u01CEo": "\u8BA8\u8A0E",
  "t\xE0o": "\u5957",
  "t\xE8": "\u5FD1\u5FD2\u7279\u8126\u7286\u94FD\u615D\u92F1\u87D8",
  "t\u0113ng": "\u71A5\u81AF\u9F1F",
  "t\xE9ng": "\u75BC\u75CB\u5E50\u817E\u8A8A\u6F1B\u6ED5\u9086\u7E22\u87A3\u99E6\u8B04\u512F\u85E4\u9A30\u7C50\u9C27\u7C58\u8645\u9A63",
  "t\xE8ng": "\u972F",
  "t\u012B": "\u5254\u68AF\u9511\u8E22\u92BB\u64FF\u9DC9\u9DC8\u9AD4",
  "t\xED": "\u82D0\u5397\u8351\u684B\u7EE8\u504D\u73F6\u557C\u5A82\u5A9E\u5D39\u60FF\u6E27\u7A0A\u7F07\u7F64\u9046\u9E48\u55C1\u7445\u7994\u7D88\u777C\u78AE\u8906\u5FB2\u6F3D\u78C3\u7DF9\u855B\u9898\u8DA7\u8E44\u918D\u8B15\u8E4F\u9357\u9CC0\u984C\u9BB7\u9D5C\u9A20\u9BF7\u9D97\u9D99\u79B5\u9DE4",
  "t\u01D0": "\u632E\u5FA5\u8EB0\u9AB5\u918D\u8EC6\u9AD4",
  "t\xEC": "\u623B\u5943\u5C49\u5243\u6711\u4FF6\u501C\u608C\u632E\u6D95\u7723\u7EE8\u9016\u5551\u5C5C\u6090\u60D5\u63A6\u7B39\u9037\u5C5F\u60D6\u63E5\u66FF\u68E3\u7D88\u88FC\u8905\u6B52\u6BA2\u9AF0\u8599\u568F\u9B00\u5694\u74CB\u9B04\u7C4A\u8DAF",
  "ti\u0101n": "\u5929\u5172\u5451\u5A56\u6DFB\u915F\u9754\u9EC7\u975D",
  "ti\xE1n": "\u7530\u5C47\u6CBA\u606C\u7551\u754B\u76F7\u80CB\u94BF\u751B\u751C\u83FE\u6E49\u5861\u6437\u9617\u7471\u78B5\u7DC2\u78CC\u7AB4\u9D2B\u74B3\u95D0\u9DC6\u9DCF",
  "ti\u01CEn": "\u5975\u5FDD\u6B84\u500E\u681D\u553A\u60BF\u6DDF\u7D3E\u94E6\u666A\u7420\u8146\u89CD\u75F6\u7753\u8214\u929B\u9902\u89A5\u8CDF\u92BD\u932A",
  "ti\xE0n": "\u63AD\u83FE\u7420\u7471\u821A",
  "ti\u0101o": "\u65EB\u4F7B\u5EA3\u604C\u689D\u7967\u804E",
  "ti\xE1o": "\u8280\u6737\u5CA7\u5CB9\u82D5\u8FE2\u7952\u689D\u7B24\u8414\u94EB\u84DA\u84E8\u84E7\u9F86\u6A24\u8729\u929A\u8ABF\u92DA\u9797\u9AEB\u9CA6\u9BC8\u93A5\u9F60\u9C37",
  "ti\u01CEo": "\u5BA8\u6640\u6713\u8101\u7A95\u8A82\u65A2\u7AB1\u5B25",
  "ti\xE0o": "\u5541\u773A\u7C9C\u7D69\u899C\u8D92\u7CF6",
  "ti\u0113": "\u6017\u8D34\u841C\u8051\u8CBC\u8DD5",
  "ti\xE9": "",
  "ti\u011B": "\u94C1\u86C8\u9244\u50E3\u9295\u9421\u9435\u9A56",
  "ti\xE8": "\u546B\u98FB\u992E",
  "t\u012Bng": "\u5385\u5E81\u6C40\u542C\u5E8D\u8013\u539B\u70C3\u686F\u70F4\u6E1F\u7D8E\u9793\u8074\u807C\u5EF0\u807D\u5EF3",
  "t\xEDng": "\u9092\u5EF7\u4EAD\u5EAD\u839B\u505C\u5A77\u5D49\u6E1F\u7B73\u8476\u8713\u695F\u69B3\u95AE\u9706\u8064\u874F\u8AEA\u9F2E",
  "t\u01D0ng": "\u5722\u753C\u753A\u4FB9\u4FB1\u5A17\u633A\u6D8F\u6883\u70F6\u73FD\u8121\u94E4\u8247\u988B\u8A94\u92CC\u95AE\u9832",
  "t\xECng": "\u5FCA\u6883\u6FCE",
  "t\u014Dng": "\u56F2\u70B5\u901A\u75CC\u7D67\u55F5\u84EA\u6A0B",
  "t\xF3ng": "\u4EDD\u4F5F\u5F64\u4F97\u5CC2\u5E9D\u54C3\u578C\u5CD2\u5CDD\u72EA\u833C\u664D\u6850\u6D75\u70D4\u783C\u8692\u5045\u75CC\u772E\u79F1\u94DC\u7867\u7AE5\u7CA1\u7D67\u8A77\u8D68\u916E\u9256\u50EE\u52ED\u9275\u9285\u9907\u9C96\u6F7C\u735E\u66C8\u6723\u6A66\u6C03\u71D1\u729D\u81A7\u77B3\u7A5C\u9BA6",
  "t\u01D2ng": "\u4F97\u7EDF\u6345\u6876\u7B52\u7D71\u7B69\u7D82",
  "t\xF2ng": "\u6078\u75DB\u8855\u615F\u6185",
  "tou": "",
  "t\u014Du": "\u5078\u5077\u5A7E\u5AAE\u7DF0\u92C0\u936E",
  "t\xF3u": "\u4EA0\u6295\u9AB0\u982D",
  "t\u01D2u": "\u59B5\u7D0F\u6568\u98F3\u65A2\u9EC8\u8623",
  "t\xF2u": "\u900F\u57F1",
  "tu": "\u6C62",
  "t\u016B": "\u51F8\u5B8A\u79BF\u79C3\u6022\u7A81\u6D8B\u6378\u5817\u6E65\u75DC\u8456\u5D80\u92F5\u9D5A\u9F35",
  "t\xFA": "\u56F3\u56FE\u51C3\u5CF9\u5EA9\u5F92\u6087\u6348\u6D82\u837C\u83B5\u9014\u555A\u5C60\u688C\u83DF\u63EC\u7A0C\u8D83\u5857\u5D5E\u760F\u7B61\u816F\u84A4\u922F\u5717\u5716\u5EDC\u6455\u6F73\u7479\u8DFF\u9174\u58BF\u999F\u6AA1\u934E\u99FC\u9D4C\u9D9F\u9DCB\u9DF5",
  "t\u01D4": "\u571F\u5721\u948D\u550B\u91F7",
  "t\xF9": "\u514E\u8FCC\u5154\u550B\u83B5\u580D\u83DF\u92C0\u9D75",
  "tu\u0101n": "\u6E4D\u732F\u5715\u7153\u8C92",
  "tu\xE1n": "\u56E3\u56E2\u629F\u5278\u5718\u587C\u6171\u6476\u6F19\u69EB\u7BFF\u6AB2\u93C4\u7CF0\u9DD2\u9DFB",
  "tu\u01CEn": "\u757D\u58A5\u7583",
  "tu\xE0n": "\u5F56\u6E6A\u732F\u8916\u8C92",
  "tu\u012B": "\u5FD2\u63A8\u84F7\u85EC\u8B89",
  "tu\xED": "\u5F1A\u9893\u50D3\u96A4\u58A4\u5C35\u6A54\u983A\u9839\u983D\u9B4B\u7A68\u8608\u8E6A",
  "tu\u01D0": "\u4FC0\u8049\u817F\u50D3\u8E46\u9ABD",
  "tu\xEC": "\u4FBB\u9000\u5A27\u717A\u86FB\u8715\u8781\u99FE",
  "t\u016Bn": "\u541E\u5451\u65FD\u6D92\u554D\u671C\u711E\u564B\u619E\u66BE",
  "t\xFAn": "\u5749\u5E89\u5FF3\u829A\u9968\u86CC\u8C58\u8C5A\u8ED8\u98E9\u9C80\u9B68\u9715\u9ED7\u81C0\u81CB",
  "t\u01D4n": "\u6C3D",
  "t\xF9n": "",
  "tu\u014D": "\u4E47\u4EDB\u8BAC\u6258\u6261\u6C51\u9966\u6754\u4F82\u5483\u549C\u62D5\u62D6\u6CB0\u6329\u635D\u838C\u8889\u88A5\u8A17\u5574\u6DB6\u812B\u8131\u98E5\u99B2\u9B60\u9BB5",
  "tu\xF3": "\u9624\u9A6E\u4F57\u9640\u9641\u5768\u5CAE\u6CB1\u6CB2\u72CF\u9A7C\u4FBB\u67C1\u7824\u7823\u8889\u94CA\u9E35\u7D3D\u5836\u5AA0\u8A51\u8DCE\u9161\u78A2\u9248\u99B1\u69D6\u99C4\u92D6\u99DE\u99DD\u6A50\u9B80\u9D15\u9F27\u9A28\u9F0D\u9A52\u9A5D\u9F09",
  "tu\u01D2": "\u5F75\u59A5\u5EB9\u692D\u6955\u5AF7\u64B1\u6A62\u9D4E\u9C16",
  "tu\xF2": "\u675D\u67DD\u6BE4\u553E\u6DB6\u841A\u8DC5\u6BFB\u5D9E\u7BA8\u8600\u7C5C",
  "wa": "\u54C7",
  "w\u0101": "\u5C72\u7A75\u5459\u52B8\u54BC\u54C7\u5F8D\u6316\u6D3C\u5A32\u7556\u7A8A\u5532\u5558\u5AA7\u7A90\u55D7\u74FE\u86D9\u6432\u6E9B\u6F25\u7AAA\u9F03\u6528\u97C8",
  "w\xE1": "\u5A03",
  "w\u01CE": "\u4F64\u90B7\u5493\u7819\u74F8\u6432",
  "w\xE0": "\u5E13\u889C\u5A60\u8049\u55E2\u6432\u817D\u8183\u97CE\u896A\u97E4",
  "wai": "",
  "w\u0101i": "\u5459\u54BC\u6B6A\u558E\u7AF5\u7024",
  "w\u01CEi": "\u5D34",
  "w\xE0i": "\u5916\u9861",
  "w\u0101n": "\u6BCC\u5917\u5F2F\u525C\u57E6\u5A60\u5E35\u6365\u5846\u6E7E\u7755\u873F\u6F6B\u8C4C\u92FA\u5F4E\u58EA\u7063",
  "w\xE1n": "\u4E38\u5213\u6C4D\u7EA8\u8284\u5B8C\u5C8F\u5FE8\u628F\u676C\u73A9\u7B02\u7D08\u6356\u8696\u987D\u70F7\u7413\u8CA6\u9811\u7FEB",
  "w\u01CEn": "\u5918\u5917\u5007\u550D\u633D\u76CC\u839E\u83AC\u57E6\u5A49\u60CB\u6365\u665A\u6665\u689A\u6DB4\u7EFE\u8118\u83C0\u8416\u60CC\u6669\u667C\u6900\u742C\u7696\u7579\u7897\u7BA2\u7DA9\u7DB0\u8F13\u8E20\u92D4\u92FA",
  "w\xE0n": "\u534D\u5350\u59A7\u6764\u6365\u8115\u6394\u8155\u842C\u7D7B\u7D84\u8F10\u69FE\u6FAB\u92C4\u77A3\u858D\u933D\u87C3\u8D03\u93AB\u8D0E",
  "w\u0101ng": "\u5C23\u5C2B\u5C2A\u6C6A\u5C29\u7007",
  "w\xE1ng": "\u4EBE\u5166\u4EFC\u83A3\u869F\u671A",
  "w\u01CEng": "\u7F53\u7F52\u7F51\u5F7A\u5FF9\u6282\u5F83\u5F80\u6789\u7F56\u7F54\u8FEC\u60D8\u83F5\u6680\u68E2\u86E7\u8F8B\u7DB2\u8744\u8AB7\u8F1E\u7007\u9B4D",
  "w\xE0ng": "\u5984\u5FD8\u8FCB\u65FA\u76F3\u5F8D\u671B\u6680\u6722",
  "w\u0113i": "\u5383\u5371\u5A01\u502D\u70D3\u504E\u9036\u9687\u9688\u55B4\u5A99\u5D34\u5D54\u6104\u63CB\u63FB\u8468\u8473\u5FAE\u6933\u6972\u6EA6\u7168\u8A74\u8732\u7E05\u875B\u89A3\u5DB6\u8587\u71F0\u9CC2\u7650\u7653\u5DCD\u9C03\u9C04\u973A",
  "w\xE9i": "\u56D7\u97E6\u5729\u56F2\u56F4\u5E0F\u6CA9\u8FDD\u95F1\u96B9\u5CD7\u5CDE\u6D08\u70BA\u97CB\u6845\u6DA0\u552F\u5E37\u60DF\u7859\u7EF4\u55A1\u570D\u5A81\u5D6C\u5E43\u6E4B\u6E88\u7232\u741F\u9055\u6F4D\u7DAD\u84F6\u912C\u649D\u6F59\u6F7F\u9180\u6FF0\u934F\u95C8\u9BA0\u58DD\u77C0\u89B9\u72A9\u6B08",
  "w\u011Bi": "\u4F1F\u4F2A\u7EAC\u829B\u82C7\u709C\u73AE\u6D27\u5A13\u5C57\u6364\u6D58\u8371\u8BFF\u5049\u507D\u5529\u5D23\u637C\u68B6\u75CF\u784A\u840E\u9697\u9AA9\u5A81\u5D54\u5EC6\u5FAB\u6107\u6E28\u7325\u8466\u848D\u9AAB\u9AAA\u6690\u6932\u7152\u744B\u75FF\u8172\u8249\u97EA\u50DE\u5D89\u64B1\u78A8\u78C8\u9C94\u5BEA\u7DEF\u853F\u8AC9\u8E13\u97D1\u9820\u85B3\u5130\u6FFB\u9361\u9BAA\u7022\u97D9\u98B9\u97E1\u4EB9\u74D7\u6596",
  "w\xE8i": "\u536B\u672A\u4F4D\u5473\u82FF\u70BA\u754F\u80C3\u53DE\u8ECE\u731A\u7859\u83CB\u8C13\u5582\u55A1\u5AA6\u6E2D\u7232\u732C\u715F\u589B\u7786\u78A8\u851A\u873C\u6170\u71AD\u729A\u78D1\u7DED\u875F\u885B\u61C0\u7F7B\u885E\u8B02\u9927\u9B87\u87B1\u893D\u9935\u9B4F\u85EF\u8F4A\u93CF\u9728\u9CDA\u8636\u9956\u74D7\u8B86\u8E97\u8B8F\u8E9B",
  "w\u0113n": "\u6637\u586D\u6E29\u7F0A\u6985\u6B9F\u6EAB\u7465\u8F92\u97EB\u69B2\u761F\u7DFC\u7E15\u8C71\u8F3C\u8F40\u93BE\u9942\u9CC1\u97B0\u9C1B\u9C2E",
  "w\xE9n": "\u6587\u5F63\u82A0\u7086\u739F\u95FB\u7D0B\u8689\u868A\u73F3\u960C\u96EF\u7612\u805E\u99BC\u99C7\u9B70\u9CFC\u9D0D\u87A1\u95BA\u95BF\u87C1\u95C5\u9F24\u7E67\u95E6",
  "w\u011Bn": "\u4F06\u520E\u543B\u5445\u5FDF\u6286\u5461\u5FDE\u6B7E\u80B3\u7D0A\u687D\u8117\u7A33\u7A4F\u7A69",
  "w\xE8n": "\u95EE\u598F\u6C76\u7D0B\u83AC\u554F\u6E02\u63FE\u6435\u7D7B\u9850\u74BA",
  "w\u0113ng": "\u7FC1\u55E1\u6EC3\u9E5F\u806C\u8789\u9393\u9DB2",
  "w\u011Bng": "\u52DC\u5963\u5855\u5D61\u6EC3\u84CA\u66A1\u7788\u651A",
  "w\xE8ng": "\u74EE\u8579\u7515\u7F4B\u9F46",
  "w\u014D": "\u631D\u502D\u83B4\u5529\u6DB9\u6E26\u7327\u8435\u5594\u7A9D\u7AA9\u8717\u64BE\u6FC4\u7DFA\u8778\u8E12\u85B6",
  "w\u01D2": "\u5459\u6211\u54BC\u5A51\u5A50\u6370",
  "w\xF2": "\u4EF4\u6C83\u809F\u5367\u6782\u81E5\u5053\u637E\u6DB4\u5A89\u5E44\u63E1\u6E25\u7125\u786A\u6943\u815B\u65A1\u7783\u6FE3\u74C1\u81D2\u9F8C\u99A7\u9F8F\u9F77",
  "w\u016B": "\u4E4C\u572C\u5F19\u625C\u625D\u6C5A\u6C59\u6C61\u90AC\u545C\u5DEB\u6745\u6747\u65BC\u5C4B\u6D3F\u8BEC\u94A8\u70CF\u526D\u7A8F\u91EB\u60E1\u9114\u55DA\u8A88\u50EB\u6B4D\u8AA3\u7BBC\u92D8\u8790\u9D2E\u93A2\u9C1E",
  "w\xFA": "\u65E0\u6BCB\u5433\u5434\u543E\u5449\u829C\u90DA\u5514\u5A2A\u5CFF\u6D16\u6D6F\u8323\u8381\u68A7\u73F8\u7966\u7121\u94FB\u9E40\u8708\u58B2\u856A\u92D9\u92D8\u6A46\u7491\u87F1\u9BC3\u9D50\u8B55\u9F2F\u9DE1",
  "w\u01D4": "\u4E44\u4E94\u5348\u4EF5\u4F0D\u59A9\u5E91\u5FE4\u6003\u8FD5\u65FF\u6B66\u739D\u4FAE\u5035\u5A12\u6342\u901C\u965A\u554E\u5A2C\u727E\u5825\u73F7\u6440\u7894\u9E49\u7193\u7466\u821E\u5AF5\u5EE1\u61AE\u6F55\u511B\u7512\u81B4\u77B4\u9D61\u8E8C",
  "w\xF9": "\u5140\u52FF\u52A1\u620A\u9622\u5C7C\u6264\u575E\u5C89\u674C\u6C95\u82B4\u5FE2\u65FF\u7269\u77F9\u4FC9\u537C\u6544\u67EE\u8BEF\u52D9\u5514\u5A2A\u609F\u609E\u60AE\u7C85\u8DB6\u6664\u7110\u5A7A\u5D4D\u60E1\u6E1E\u75E6\u9696\u9770\u9A9B\u5862\u5966\u5D68\u6EA9\u96FA\u96FE\u50EB\u5BE4\u7183\u8AA4\u9E5C\u92C8\u7AB9\u971A\u9F3F\u9727\u9F40\u8601\u9A16\u9DA9",
  "x\u012B": "\u5915\u516E\u909C\u5438\u5FDA\u6271\u6C50\u897F\u5E0C\u6278\u5365\u6614\u6790\u77FD\u7A78\u80B8\u80B9\u4FD9\u54A5\u54AD\u5F86\u6038\u6053\u8BF6\u90D7\u997B\u550F\u595A\u5A2D\u5C56\u606F\u6095\u6C25\u6D60\u727A\u72F6\u8383\u553D\u6089\u60DC\u665E\u6878\u6B37\u6DC5\u6E13\u70EF\u7101\u7108\u740B\u7852\u7F9B\u83E5\u8D65\u91F8\u5092\u60C1\u6670\u6673\u711F\u712C\u7280\u774E\u7A00\u7C9E\u7FD6\u7FD5\u823E\u910E\u5380\u5D60\u5FAF\u6EAA\u7155\u7699\u788F\u84A0\u88FC\u9521\u50D6\u69BD\u7184\u7188\u7199\u7361\u7DC6\u8725\u89A1\u8A92\u8C68\u95AA\u990F\u563B\u564F\u5B06\u5B09\u5DB2\u6198\u6F5D\u761C\u78CE\u819D\u51DE\u66BF\u6A28\u6A40\u6B59\u71BB\u71BA\u71B9\u7AB8\u7FB2\u8785\u8787\u932B\u71E8\u72A0\u77A6\u7902\u87CB\u8C40\u8C3F\u8C6F\u8C95\u8E4A\u5DC2\u7CE6\u7E65\u91D0\u96DF\u9BD1\u9D57\u89F9\u8B46\u91AF\u93ED\u940A\u96B5\u56B1\u5DC7\u66E6\u7214\u72A7\u9145\u994E\u89FD\u9F37\u8835\u9E02\u89FF\u9474",
  "x\xED": "\u4E60\u90CB\u5E2D\u7FD2\u88AD\u89CB\u96ED\u55BA\u5AB3\u693A\u84B5\u84C6\u5D8D\u6F1D\u8D98\u69E2\u8582\u96B0\u6A84\u8B35\u93B4\u972B\u9CDB\u98C1\u9A31\u9A3D\u9C3C\u8972\u9A68",
  "x\u01D0": "\u676B\u67B2\u73BA\u5F99\u559C\u8448\u8478\u9222\u9269\u9268\u5C63\u6F07\u84F0\u9291\u6198\u6199\u66BF\u6A72\u6B56\u79A7\u8AF0\u58D0\u7E30\u8B11\u9CC3\u87E2\u8E5D\u91D0\u74BD\u9C13\u74D5\u9C5A\u56CD\u77D6\u7E9A\u8EA7",
  "x\xEC": "\u5338\u534C\u6262\u5C43\u5FFE\u9969\u546C\u5FE5\u602C\u7EC6\u90C4\u9491\u4FC2\u6044\u6B2A\u76FB\u90E4\u5C53\u6B2F\u7EE4\u7D30\u91F3\u960B\u5092\u6461\u691E\u8203\u8204\u8D87\u9699\u613E\u6140\u6ECA\u798A\u7D8C\u84B5\u8D69\u969F\u588D\u7182\u7294\u7A27\u622F\u6F5F\u6F99\u856E\u89A4\u6231\u7E18\u9ED6\u6232\u78F6\u8669\u993C\u9B29\u7E6B\u95DF\u973C\u5C6D\u884B",
  "xi\u0101": "\u5477\u8672\u75A8\u867E\u8C3A\u5084\u9595\u7146\u98AC\u7615\u778E\u8766\u9C15",
  "xi\xE1": "\u5323\u4FA0\u72CE\u4FE0\u5CE1\u67D9\u70A0\u72ED\u965C\u57C9\u5CFD\u70DA\u72F9\u73E8\u796B\u637E\u7856\u7B1A\u7FC8\u823A\u967F\u5FA6\u7864\u9050\u656E\u6687\u7455\u7B6A\u821D\u7615\u78AC\u8F96\u78CD\u8578\u7E16\u879B\u8D6E\u9B7B\u8F44\u935C\u971E\u938B\u9EE0\u9A22\u9DB7",
  "xi\u01CE": "\u9595\u959C",
  "xi\xE0": "\u4E05\u4E0B\u4E64\u5737\u8290\u759C\u590F\u68BA\u5EC8\u7771\u8AD5\u5687\u61D7\u7F45\u5913\u93BC\u93EC",
  "xi\u0101n": "\u4EDA\u4ED9\u5C73\u5148\u597E\u4F61\u5FFA\u6C19\u6774\u6B26\u7946\u79C8\u82EE\u59FA\u67AE\u7C7C\u73D7\u83B6\u6380\u94E6\u641F\u7D85\u8DF9\u9170\u9528\u50CA\u50F2\u5615\u647B\u929B\u66B9\u92BD\u97EF\u5B10\u61B8\u859F\u9341\u7E4A\u893C\u97F1\u9BAE\u8E6E\u99A6\u5B45\u5EEF\u6515\u91B6\u7E8E\u9DB1\u8973\u8E9A\u7E96\u9C7B",
  "xi\xE1n": "\u4F2D\u549E\u95F2\u5481\u59B6\u5F26\u81E4\u8D24\u54B8\u550C\u6326\u6D8E\u73B9\u76F7\u80D8\u5A34\u5A39\u5A71\u7D43\u8237\u86BF\u8854\u5563\u6E7A\u75EB\u86DD\u9591\u9592\u9E47\u55DB\u5ACC\u6E93\u8858\u7509\u929C\u5AFB\u5AFA\u61AA\u648F\u6F96\u7A34\u7FAC\u8AB8\u8CE2\u8AF4\u8F31\u918E\u7647\u764E\u77AF\u85D6\u7925\u9E79\u9E99\u8D12\u9466\u9DF4\u9DFC\u9DF3",
  "xi\u01CEn": "\u5F61\u51BC\u72DD\u663E\u9669\u5D04\u6BE8\u70CD\u7303\u86AC\u967A\u8D7B\u7B45\u5C1F\u5C20\u641F\u7992\u8706\u8DE3\u9291\u7BB2\u96AA\u5DAE\u736B\u736E\u85D3\u934C\u9BAE\u71F9\u9855\u5E70\u6507\u6AF6\u861A\u8B63\u7381\u97C5\u986F\u7066",
  "xi\xE0n": "\u549E\u5C98\u82CB\u898B\u73B0\u7EBF\u81FD\u9650\u59ED\u5BAA\u770C\u9665\u54EF\u57B7\u5A0A\u5CF4\u6D80\u83A7\u8ED0\u9677\u57F3\u665B\u73FE\u784D\u9985\u774D\u7D64\u7D96\u7F10\u7FA1\u586A\u641A\u6E93\u732E\u7CAF\u7FA8\u817A\u50E9\u50F4\u69CF\u7DAB\u8AA2\u61AA\u648A\u7DDA\u92E7\u61B2\u6A4C\u6A7A\u7E23\u930E\u9921\u58CF\u61E2\u8C4F\u9EB2\u7017\u81D4\u737B\u7CEE\u93FE\u9730\u9F38",
  "xi\u0101ng": "\u4E61\u8297\u9999\u90F7\u53A2\u554D\u9109\u910A\u5EC2\u6E58\u7F03\u842B\u8459\u9115\u697F\u7A25\u858C\u7BB1\u7DD7\u81B7\u8944\u5134\u52F7\u5FC0\u9AA7\u9E98\u6B00\u74D6\u9576\u9C5C\u7E95\u9472\u9A64",
  "xi\xE1ng": "\u5905\u74E8\u4F6D\u5EA0\u7F8F\u6819\u7965\u7D74\u7FD4\u8A73\u8DED",
  "xi\u01CEng": "\u4EAB\u4EAF\u54CD\u8683\u9977\u6651\u98E8\u60F3\u9284\u9909\u9C9E\u8801\u9B9D\u9BD7\u97FF\u9957\u995F\u9C76",
  "xi\xE0ng": "\u5411\u59E0\u9879\u73E6\u8C61\u7F3F\u8856\u9805\u50CF\u52E8\u5D91\u6F52\u9297\u95A7\u66CF\u6A61\u8950\u95C2\u56AE\u87D3\u940C\u9C4C",
  "xi\u0101o": "\u7072\u7071\u547A\u67AD\u4FBE\u54D3\u67B5\u9A81\u5BAF\u5BB5\u5EA8\u6D88\u70CB\u7EE1\u83A6\u8653\u900D\u9E2E\u5A4B\u689F\u7107\u7307\u8427\u75DA\u75DF\u7744\u7863\u785D\u7A99\u7FDB\u9500\u55C3\u63F1\u7D83\u86F8\u5610\u6B4A\u6F47\u7187\u7BAB\u8E03\u5635\u61A2\u64A8\u735F\u7362\u7BBE\u92B7\u9704\u9AB9\u5F47\u81AE\u856D\u98B5\u9B48\u9D1E\u7A58\u7C18\u85C3\u87C2\u87CF\u9D35\u56A3\u701F\u7C2B\u87F0\u9AC7\u6AF9\u56BB\u56C2\u9AD0\u9DCD\u8828\u9A4D\u6BCA\u8648",
  "xi\xE1o": "\u59E3\u6D28\u90E9\u5D24\u6DC6\u8A24\u6BBD\u8AB5",
  "xi\u01CEo": "\u5C0F\u6653\u6681\u7B71\u7B7F\u769B\u66C9\u7BE0\u8B0F\u76A2",
  "xi\xE0o": "\u5B5D\u52B9\u54B2\u6054\u4FF2\u54EE\u6548\u6D8D\u7B11\u5578\u509A\u6569\u6BBD\u55C3\u8A68\u560B\u5628\u8A9F\u562F\u8582\u6B57\u71BD\u6585\u6586",
  "xi\u0113": "\u5A0E\u63F3\u7332\u6954\u6B47\u6ECA\u7366\u874E\u880D",
  "xi\xE9": "\u52A6\u534F\u65EA\u5354\u80C1\u57A5\u594A\u5CEB\u604A\u62F9\u633E\u8107\u8105\u810B\u887A\u5055\u659C\u688B\u8C10\u7D5C\u7FD3\u9889\u55CB\u6136\u6140\u641A\u643A\u744E\u7D8A\u7181\u818E\u9C91\u52F0\u64B7\u64D5\u7DF3\u7E00\u7F2C\u8762\u978B\u8AE7\u71F2\u9BAD\u56A1\u64F7\u97B5\u5136\u896D\u5B48\u651C\u8B97\u9FA4",
  "xi\u011B": "\u5199\u51A9\u5BEB\u85DB",
  "xi\xE8": "\u4F33\u707A\u6CFB\u7944\u7EC1\u7F37\u5378\u67BB\u6D29\u70A8\u70A7\u5368\u5C51\u6827\u505E\u5070\u5FA2\u68B0\u70F2\u710E\u79BC\u7D32\u4EB5\u5A9F\u5C5F\u6E2B\u7D4F\u7D6C\u8C22\u50C1\u586E\u89DF\u89E7\u698D\u699D\u69AD\u8909\u977E\u5667\u5BEB\u5C67\u66AC\u6A27\u78BF\u7DE4\u5DB0\u5EE8\u61C8\u6FA5\u736C\u7CCF\u85A4\u85A2\u9082\u97F0\u71EE\u893B\u8B1D\u5911\u7009\u97A2\u97D8\u7023\u7215\u7E72\u87F9\u880F\u9F58\u9F5B\u7E88\u9F65\u9F42\u8EA0\u8E9E",
  "x\u012Bn": "\u5FC4\u5FC3\u90A4\u59A1\u5FFB\u8F9B\u6615\u677A\u6B23\u76FA\u4FFD\u8398\u60DE\u8A22\u920A\u950C\u65B0\u6B46\u5EDE\u92C5\u567A\u5677\u5B1C\u85AA\u99A8\u946B\u99AB",
  "x\xEDn": "\u6794\u8951\u9561\u7925\u9414",
  "x\u01D0n": "\u4F08",
  "x\xECn": "\u9620\u4F29\u56DF\u5B5E\u7098\u8ED0\u812A\u8845\u8A2B\u6116\u712E\u99B8\u9856\u820B\u91C1",
  "x\u012Bng": "\u72CC\u661F\u57B6\u9A8D\u60FA\u7329\u714B\u7446\u8165\u89EA\u7BB5\u7BC2\u8208\u8B03\u9B8F\u66D0\u89F2\u9A02\u76A8\u9BF9",
  "x\xEDng": "\u5211\u90A2\u9967\u5DE0\u5F62\u9649\u4F80\u90C9\u54D8\u578B\u6D10\u8365\u9498\u9658\u5A19\u784E\u94CF\u9203\u86F5\u6ECE\u9276\u9292\u92DE\u9933",
  "x\u01D0ng": "\u7772\u9192\u64E4",
  "x\xECng": "\u674F\u59D3\u5E78\u6027\u8347\u5016\u8395\u5A5E\u60BB\u6DAC\u8455\u7772\u7DC8\u92DE\u5B39\u81D6",
  "xi\u014Dng": "\u51F6\u5302\u5144\u5147\u5308\u828E\u8BBB\u5FF7\u6C79\u54C5\u605F\u6D36\u80F7\u80F8\u8A29\u8A7E\u8CEF",
  "xi\xF3ng": "\u96C4\u718A\u718B",
  "xi\u01D2ng": "\u713D\u7138",
  "xi\xF2ng": "\u8BC7\u8A57\u5910\u657B",
  "xi\u016B": "\u4FE2\u4FEE\u54BB\u5EA5\u70CC\u70CB\u7F9E\u8129\u8119\u9E3A\u81F9\u8C85\u9990\u6A07\u929D\u9AE4\u9AF9\u9380\u9BB4\u9D42\u93C5\u9948\u9C43\u98CD",
  "xi\xFA": "\u82EC",
  "xi\u01D4": "\u673D\u6EEB\u6F43\u7CD4",
  "xi\xF9": "\u79C0\u5CAB\u5CC0\u73DB\u7EE3\u8896\u7407\u9508\u55C5\u6EB4\u7D89\u7493\u890F\u890E\u92B9\u8791\u568A\u7E4D\u93C5\u7E61\u93E5\u93FD\u9F45",
  "x\u016B": "\u5729\u620C\u65F4\u59C1\u759E\u76F1\u6B28\u7809\u80E5\u987B\u7717\u8A0F\u987C\u5066\u8657\u865A\u88C7\u8A31\u8C1E\u5AAD\u63DF\u6B3B\u6E4F\u6E51\u865B\u9808\u6948\u7D87\u980A\u5618\u589F\u7A30\u84F2\u9700\u9B46\u5653\u5B03\u6B54\u7DF0\u7E03\u8566\u8751\u6B58\u85C7\u8ADD\u71F8\u8B43\u9B56\u9A49\u9450\u9B1A",
  "x\xFA": "\u4FC6\u5194\u5F90\u7991\u84A3",
  "x\u01D4": "\u5474\u59C1\u8BE9\u6D52\u6829\u73DD\u55A3\u6E51\u86E1\u668A\u8A61\u6EF8\u7A30\u9126\u7CC8\u8AFF\u9191\u76E8",
  "x\xF9": "\u65ED\u4F35\u5E8F\u65F4\u6C7F\u82A7\u4F90\u5379\u59B6\u6034\u6C80\u53D9\u6053\u6064\u662B\u6710\u6D2B\u57BF\u6647\u6B30\u6B88\u70C5\u73EC\u52D7\u52D6\u5590\u60D0\u639D\u654D\u6558\u6DE2\u70FC\u7EEA\u7EED\u86BC\u9157\u58FB\u5A7F\u6702\u6E86\u77DE\u7D6E\u8053\u8A39\u6149\u6EC0\u7166\u7D9A\u84C4\u8CC9\u69D2\u6F35\u6F4A\u76E2\u7781\u7DD2\u805F\u84FF\u928A\u563C\u735D\u7A38\u7DD6\u85C7\u85DA\u7E8C\u9C6E",
  "xu\u0101n": "\u5405\u8F69\u660D\u54BA\u5BA3\u5F32\u6645\u8ED2\u688B\u8C16\u55A7\u5847\u5A97\u6103\u610B\u63CE\u8432\u8431\u6684\u714A\u7444\u84D2\u777B\u5107\u79A4\u7BAE\u7FE7\u8756\u92D7\u5B1B\u61C1\u857F\u8AE0\u8AFC\u9799\u99E8\u9379\u99FD\u77CE\u7FFE\u85FC\u8610\u8809\u8B5E\u9C1A\u8B82",
  "xu\xE1n": "\u7384\u4F2D\u59B6\u73B9\u75C3\u60AC\u7401\u8701\u5AD9\u6F29\u66B6\u7487\u7E23\u6A88\u74BF\u61F8",
  "xu\u01CEn": "\u54BA\u9009\u70DC\u559B\u6685\u9078\u7663\u766C",
  "xu\xE0n": "\u6030\u6CEB\u6621\u70AB\u7EDA\u7729\u88A8\u94C9\u7404\u7734\u8852\u6E32\u7D62\u6965\u6966\u9249\u5910\u657B\u78B9\u8519\u955F\u98B4\u7E3C\u7E4F\u93C7\u8D19",
  "xu\u0113": "\u75B6\u8486\u9774\u859B\u8FA5\u8FAA\u97BE",
  "xu\xE9": "\u7A74\u6588\u4E74\u5B66\u5CC3\u8313\u6CF6\u8895\u9E34\u6569\u8E05\u5671\u58C6\u5B78\u5DA8\u6FA9\u71E2\u89F7\u9DFD",
  "xu\u011B": "\u5F50\u96EA\u6A30\u81A4\u825D\u8F4C\u9CD5\u9C48",
  "xu\xE8": "\u5437\u5779\u5CA4\u6034\u6CEC\u72D8\u75A6\u6856\u8C11\u6EC8\u8D90\u8B14\u77B2\u7025",
  "x\u016Bn": "\u5743\u52CB\u57D9\u7104\u52DB\u5864\u7147\u7AA8\u52F2\u52F3\u85AB\u5691\u58CE\u736F\u85B0\u66DB\u71FB\u81D0\u77C4\u860D\u58E6\u720B\u7E81\u91BA",
  "x\xFAn": "\u5EF5\u5BFB\u5DE1\u65EC\u674A\u7543\u8BE2\u90C7\u54B0\u59F0\u5CCB\u6042\u6D35\u6D54\u7D03\u8340\u8368\u6812\u686A\u6BE5\u73E3\u5071\u7734\u5C0B\u5FAA\u63D7\u8A62\u9129\u9C9F\u565A\u6F6F\u8541\u6533\u6A33\u71C5\u71D6\u7495\u99E8\u87EB\u87F3\u7213\u9C58\u9C4F\u7065",
  "x\xF9n": "\u5342\u8BAD\u8BAF\u4F28\u6C5B\u8FC5\u9A6F\u4F9A\u5DFA\u5F87\u72E5\u8FFF\u900A\u5B6B\u6B89\u6BE5\u6D5A\u8A0A\u8A13\u8A19\u595E\u5DFD\u6BBE\u7A04\u905C\u99B4\u613B\u5640\u6F60\u8548\u6FEC\u720B\u9868\u9DBD\u9442",
  "ya": "",
  "y\u0101": "\u4E2B\u5727\u5416\u4E9E\u5E98\u62BC\u6792\u57AD\u9E26\u6860\u9E2D\u555E\u5B72\u94D4\u690F\u9D09\u930F\u9D28\u58D3\u9D76\u941A",
  "y\xE1": "\u7259\u4F22\u5391\u5C88\u82BD\u5393\u62C1\u740A\u7B0C\u869C\u5810\u5D15\u5D16\u6DAF\u731A\u91FE\u775A\u8859\u6F04\u9F56",
  "y\u01CE": "\u758B\u538A\u5E8C\u631C\u75A8\u5516\u555E\u6397\u75D6\u96C5\u7602\u8565",
  "y\xE0": "\u529C\u5720\u8F67\u4E9A\u51B4\u897E\u8980\u8BB6\u4E9C\u72BD\u8FD3\u4E9E\u73A1\u8ECB\u59F6\u5A05\u631C\u7811\u4FF9\u6C29\u57E1\u5A6D\u6397\u8A1D\u94D4\u63E0\u6C2C\u7330\u8050\u5714\u693B\u7A0F\u78A3\u7AAB\u6F5D\u78CD\u58D3\u74DB\u9F7E",
  "y\u0101n": "\u6079\u5266\u70DF\u73DA\u80ED\u5D26\u6DCA\u6DF9\u7111\u7109\u83F8\u9609\u6B97\u6E30\u6E6E\u50BF\u6B45\u7159\u787D\u9122\u5AE3\u6F39\u5D96\u6A2E\u9183\u6A6A\u95B9\u95BC\u5B2E\u61E8\u7BF6\u61D5\u81D9\u9EEB\u9EF0",
  "y\xE1n": "\u8BA0\u5383\u5EF6\u95EB\u4E25\u598D\u82AB\u8A01\u8A00\u5CA9\u6616\u6CBF\u708F\u708E\u90D4\u550C\u57CF\u59F8\u5A2B\u72FF\u839A\u5A2E\u68B4\u76D0\u5571\u7402\u784F\u8A2E\u9586\u960E\u55A6\u5D53\u5D52\u7B75\u7D96\u8712\u5869\u63C5\u694C\u8A7D\u789E\u8505\u7FAC\u989C\u53B3\u8664\u95BB\u6A90\u984F\u9854\u56B4\u58DB\u5DCC\u7C37\u6AE9\u58E7\u5DD6\u5DD7\u6B15\u7939\u9E7D\u9EA3",
  "y\u01CEn": "\u5935\u6281\u6C87\u4E75\u5156\u4FE8\u5157\u533D\u5F07\u884D\u5261\u5043\u53A3\u639E\u63A9\u773C\u8412\u90FE\u9153\u9681\u5D43\u611D\u624A\u63DC\u667B\u68EA\u6E30\u6E37\u7430\u9043\u9692\u693C\u787D\u7F68\u88FA\u6F14\u8917\u622D\u7AB4\u8758\u9B47\u565E\u5B10\u8EBD\u7E2F\u6ABF\u9EE1\u53B4\u7517\u9C0B\u9DA0\u9EE4\u513C\u9EEC\u9EED\u9F91\u5B4D\u9869\u9F34\u5DD8\u5DDA\u66EE\u9B58\u9F39\u7939\u9F74\u9EF6",
  "y\xE0n": "\u538C\u599F\u89C3\u726A\u533D\u59F2\u5F65\u5F66\u6D1D\u781A\u5501\u5BB4\u664F\u70FB\u8273\u898E\u9A8C\u5050\u639E\u7114\u730F\u784F\u8C1A\u9681\u55AD\u5830\u6565\u68EA\u6B97\u7131\u7130\u7312\u786F\u96C1\u50BF\u693B\u6E8E\u6EDF\u8C63\u9CEB\u53AD\u5895\u66A5\u7196\u917D\u9CF1\u5B0A\u8C33\u990D\u9D08\u71C4\u8AFA\u8D5D\u9B33\u5688\u5B2E\u66D5\u9D33\u9140\u9A10\u9A13\u56A5\u5B3F\u8276\u8D0B\u8EC5\u66E3\u7213\u91B6\u9A34\u9F5E\u9DC3\u7054\u8D17\u56D0\u89FE\u8B8C\u91BC\u995C\u9A57\u9DF0\u8277\u704E\u91C5\u9A60\u7067\u8B9E\u8C53\u8C54\u7069",
  "y\u0101ng": "\u592E\u59CE\u62B0\u6CF1\u67CD\u6B83\u80E6\u770F\u79E7\u9E2F\u9260\u96F5\u9785\u9348\u9D26",
  "y\xE1ng": "\u626C\u9626\u9633\u65F8\u6768\u7080\u739A\u98CF\u4F6F\u52B7\u6C1C\u75A1\u9496\u579F\u5F89\u661C\u6D0B\u7F8F\u70CA\u73DC\u773B\u967D\u5A78\u5D35\u5D38\u6113\u63DA\u86D8\u656D\u6698\u694A\u716C\u7452\u7993\u760D\u8AF9\u8F30\u935A\u9D39\u98BA\u9C11\u9737\u9E09",
  "y\u01CEng": "\u536C\u4F52\u5489\u5771\u5C9F\u517B\u67CD\u70B4\u6C27\u770F\u75D2\u7D3B\u509F\u52DC\u6967\u8EEE\u6143\u6C31\u8746\u98EC\u990A\u99DA\u61E9\u6501\u7001\u7662\u7922",
  "y\xE0ng": "\u600F\u67CD\u6059\u6837\u70CA\u7F95\u6967\u8A47\u716C\u69D8\u6F3E\u9785\u6A23\u7001",
  "y\u0101o": "\u5E7A\u592D\u5406\u5996\u6796\u6B80\u7945\u7D04\u8A1E\u5593\u847D\u6946\u8170\u9D01\u64BD\u9080\u9D22",
  "y\xE1o": "\u723B\u5C27\u530B\u5C2D\u80B4\u579A\u59DA\u5CE3\u604C\u8F7A\u5004\u70D1\u73E7\u7690\u7A95\u7A91\u94EB\u9683\u509C\u582F\u63FA\u6BBD\u8C23\u8EFA\u55C2\u5AB1\u5FAD\u612E\u6416\u6447\u6EE7\u733A\u9059\u9065\u50E5\u647F\u669A\u69A3\u7464\u7476\u929A\u98D6\u9906\u5DA2\u5DA4\u5FBA\u78D8\u7AAF\u7AB0\u991A\u7E47\u8B21\u8B20\u9390\u9CD0\u98BB\u8628\u908E\u9864\u9C29\u9C59",
  "y\u01CEo": "\u4EF8\u5B8E\u5C86\u62AD\u6773\u6796\u72D5\u82ED\u54AC\u67FC\u7711\u7A85\u7A88\u8200\u5060\u5A79\u5D3E\u6E94\u84D4\u699A\u95C4\u9A15\u9F69\u9DD5",
  "y\xE0o": "\u602E\u7A7E\u836F\u70C4\u888E\u7A94\u7B44\u846F\u8A4F\u612E\u718E\u7627\u899E\u977F\u6A02\u735F\u7BB9\u9E5E\u85AC\u9F3C\u66DC\u71FF\u825E\u85E5\u77C5\u8000\u7E85\u9DC2\u8B91",
  "ye": "\u4EAA",
  "y\u0113": "\u5414\u8036\u503B\u6930\u668D\u6B4B\u7AAB\u564E\u6F71\u64E8\u882E",
  "y\xE9": "\u7237\u8036\u5CEB\u6353\u63F6\u94D8\u723A\u7458\u91FE\u92E3\u9381",
  "y\u011B": "\u4E5F\u51B6\u57DC\u91CE\u5622\u6F1C\u58C4",
  "y\xE8": "\u4E1A\u66F3\u9875\u66F5\u90BA\u591C\u62B4\u4EB1\u62FD\u67BC\u6D02\u9801\u6359\u6654\u67BD\u70E8\u6DB2\u7106\u8C12\u5828\u63F2\u6B97\u814B\u8449\u58B7\u696A\u696D\u7160\u75F7\u998C\u50F7\u66C5\u71C1\u748D\u64D6\u64DB\u66C4\u76A3\u77B1\u7DE4\u9134\u9765\u5DAA\u5DAB\u6FB2\u8B01\u9923\u64EB\u66D7\u77B8\u9371\u64EA\u7217\u790F\u9391\u9941\u9D7A\u9437\u9768\u9A5C\u74DB\u9E08",
  "yi": "\u5F2C",
  "y\u012B": "\u4E00\u4E4A\u5F0C\u8FB7\u8864\u4F0A\u8863\u533B\u541A\u58F1\u4F9D\u794E\u54BF\u6D22\u6098\u6E0F\u7317\u7569\u90FC\u94F1\u58F9\u63D6\u86DC\u7995\u5ADB\u6F2A\u7A26\u92A5\u5B04\u648E\u566B\u5901\u747F\u9E65\u7E44\u6AB9\u6BC9\u91AB\u9EDF\u8B69\u9DD6\u9EF3",
  "y\xED": "\u4E41\u4EEA\u531C\u572F\u5937\u5F75\u8FC6\u519D\u5B90\u675D\u6C82\u8BD2\u4F87\u5B9C\u6021\u6CB6\u72CF\u72CB\u8FE4\u8FF1\u9974\u54A6\u59E8\u5CD3\u605E\u62F8\u67C2\u6D1F\u73C6\u74F5\u8351\u8D3B\u8FFB\u5BA7\u5DF8\u6245\u6818\u684B\u7719\u80F0\u8898\u8CA4\u75CD\u79FB\u8413\u91F6\u692C\u7FA0\u86E6\u8A52\u8CBD\u9057\u5A90\u6686\u6938\u7155\u8A83\u8DE0\u9809\u9890\u98F4\u5100\u71AA\u7BB7\u907A\u5DAC\u5F5B\u5F5C\u8794\u9825\u9824\u5BF2\u5DB7\u7C03\u984A\u9BA7\u9D3A\u5F5E\u5F5D\u8B3B\u93D4\u7C4E\u89FA\u8B89",
  "y\u01D0": "\u4E5A\u4E5B\u4E59\u5DF2\u4EE5\u6261\u8FC6\u9487\u4F41\u653A\u77E3\u82E1\u53D5\u82E2\u8FE4\u8FF1\u5EA1\u8223\u8681\u91D4\u501A\u6246\u7B16\u9018\u914F\u506F\u7317\u5D3A\u6532\u6567\u65D1\u9218\u926F\u9CE6\u88FF\u65D6\u8F22\u5B1F\u657C\u8798\u6AA5\u7912\u8264\u87FB\u9857\u8F59\u9F6E",
  "y\xEC": "\u4E42\u4E49\u4EBF\u5F0B\u5208\u5FC6\u827A\u4EE1\u5307\u808A\u827E\u8BAE\u9623\u4EA6\u4F07\u5C79\u5F02\u5FD4\u8285\u4F3F\u4F5A\u52AE\u5453\u5744\u5F79\u6291\u6759\u8034\u82C5\u8BD1\u9091\u4F7E\u546D\u5479\u59B7\u5CC4\u6008\u603F\u6613\u678D\u6B25\u6CC6\u7088\u79C7\u7ECE\u886A\u8BE3\u9A7F\u4FCB\u5955\u5E1F\u5E20\u5F08\u6633\u67BB\u6D42\u73B4\u75AB\u7FBF\u8F76\u5508\u57BC\u6092\u6339\u683A\u6827\u6B2D\u6D65\u6D73\u76CA\u8898\u88A3\u8C0A\u8CA4\u52DA\u57F6\u57F8\u6098\u60A5\u639C\u6BB9\u7570\u7F9B\u7FCA\u7FCC\u841F\u8A33\u8A32\u8C59\u8C5B\u9038\u91F4\u96BF\u5E46\u6561\u6679\u68ED\u6B94\u6E59\u7132\u712C\u86E1\u8A4D\u8DC7\u8EFC\u9113\u9220\u9AAE\u4E84\u517F\u55CC\u610F\u6EA2\u7348\u75EC\u776A\u7AE9\u7F22\u7FA9\u8084\u88D4\u88DB\u8A63\u52E9\u5AD5\u5ED9\u698F\u6F69\u7617\u8189\u84FA\u8734\u99C5\u5104\u69F8\u6BC5\u71A0\u71A4\u71BC\u761E\u7BD2\u8ABC\u9552\u9E5D\u9E62\u9ED3\u5117\u5293\u571B\u58BF\u5B11\u5DA7\u61B6\u61CC\u66C0\u6BAA\u6FBA\u71DA\u7631\u7796\u7A53\u7E0A\u8257\u858F\u87A0\u8939\u5BF1\u61DD\u6581\u66CE\u6A8D\u6B5D\u71E1\u71F1\u7FF3\u7FFC\u81C6\u8C96\u9BA8\u7654\u85DD\u85D9\u8D00\u93B0\u9571\u7E76\u7E79\u8C77\u972C\u9BE3\u9D83\u9D82\u9D8D\u7037\u8619\u8B70\u8B6F\u91B3\u91B7\u9950\u56C8\u943F\u9DC1\u9DCA\u61FF\u897C\u9A5B\u9DE7\u8649\u9E03\u9DFE\u8B9B\u9F78",
  "y\u012Bn": "\u56D9\u56E0\u9625\u9634\u4F8C\u5794\u59FB\u6D07\u8335\u836B\u97F3\u9A83\u6836\u6B2D\u6C24\u9670\u51D0\u79F5\u88C0\u94DF\u967B\u9682\u5591\u5819\u5A63\u6114\u6E6E\u7B43\u7D6A\u6B45\u6EB5\u798B\u8491\u852D\u6147\u7616\u92A6\u78E4\u7DF8\u9787\u8AF2\u9712\u99F0\u567E\u6FE6\u95C9\u9720\u9F57\u97FE",
  "y\xEDn": "\u5198\u4E51\u4F12\u541F\u573B\u72BE\u82C2\u65A6\u70CE\u57A0\u6CFF\u5701\u5CFE\u72FA\u73E2\u8376\u8A14\u8A1A\u552B\u5A6C\u5BC5\u5D1F\u5D2F\u6DEB\u8A21\u94F6\u921D\u9F82\u6EDB\u7892\u911E\u5924\u8529\u9280\u9F88\u5656\u6BA5\u748C\u8ABE\u569A\u6AAD\u87EB\u972A\u9F66\u9DE3",
  "y\u01D0n": "\u5EF4\u5C39\u5F15\u5432\u996E\u7C8C\u8693\u784D\u8D7A\u6DFE\u920F\u98F2\u96A0\u9777\u98EE\u6704\u8F11\u78E4\u8D9B\u6A83\u763E\u96B1\u5DBE\u6FE5\u7E2F\u87BE\u6ABC\u861F\u6AFD\u766E\u8B94",
  "y\xECn": "\u5EF4\u5370\u831A\u6D15\u80E4\u836B\u57BD\u6880\u5837\u6E5A\u730C\u98F2\u5ED5\u96A0\u98EE\u7AA8\u9173\u616D\u764A\u6197\u6196\u96B1\u9BA3\u61DA",
  "y\u012Bng": "\u5FDC\u65F2\u82F1\u67CD\u8365\u5040\u685C\u73F1\u83BA\u5568\u5A74\u5A96\u6125\u6E36\u7EEC\u6720\u6967\u713D\u7138\u7150\u745B\u5AC8\u78A4\u9533\u5624\u6484\u7507\u7DD3\u7F28\u7F42\u8767\u8CCF\u6A31\u748E\u565F\u7F43\u892E\u9719\u9D2C\u9E66\u5B30\u61C9\u81BA\u97FA\u7516\u9E70\u9D91\u9DA7\u56B6\u5B46\u5B7E\u6516\u7034\u7F4C\u8621\u8B4D\u6AFB\u74D4\u792F\u8B7B\u9DAF\u944D\u7E93\u8833\u9DEA\u8EC8\u9DF9\u9E0E\u9E1A",
  "y\xEDng": "\u5903\u76C1\u8FCE\u8314\u76C8\u8367\u6D67\u803A\u83B9\u55B6\u686F\u8424\u8426\u8425\u86CD\u6E81\u6E8B\u843E\u50CC\u584B\u5D64\u6979\u6EE2\u84E5\u6ECE\u6F46\u7192\u8747\u7469\u799C\u877F\u5B34\u71DF\u7E08\u87A2\u6FD9\u6FDA\u6FF4\u85C0\u89AE\u8B0D\u8D62\u7005\u7203\u8805\u93A3\u5DC6\u650D\u701B\u7020\u702F\u6AFF\u8D0F\u7050\u7C5D\u705C\u7C6F",
  "y\u01D0ng": "\u77E8\u90E2\u6D67\u68AC\u988D\u9895\u9896\u646C\u5F71\u6F41\u763F\u7A4E\u9834\u89AE\u5DCA\u5EEE\u7034\u941B\u766D",
  "y\xECng": "\u5FDC\u6620\u770F\u668E\u786C\u5AB5\u81A1\u9795\u61C9\u7034\u9C66",
  "yo": "\u55B2",
  "y\u014D": "\u5537\u55B2",
  "y\u014Dng": "\u62E5\u75C8\u9095\u5EB8\u50AD\u55C8\u9118\u96CD\u5889\u5ADE\u6175\u6EFD\u69E6\u7245\u7257\u92BF\u5670\u58C5\u64C1\u6FAD\u90FA\u955B\u81C3\u7655\u96DD\u93DE\u9CD9\u5EF1\u7049\u9954\u9C45\u9DDB\u7670",
  "y\xF3ng": "\u5581\u63D8\u9899\u9852\u9C2B",
  "y\u01D2ng": "\u6C38\u752C\u548F\u603A\u6CF3\u4FD1\u52C8\u52C7\u6810\u57C7\u6080\u67E1\u607F\u60E5\u6111\u6E67\u7867\u8A60\u584E\u5D71\u5F6E\u6139\u86F9\u6142\u8E0A\u9CAC\u5670\u6FAD\u8E34\u9BD2",
  "y\xF2ng": "\u7528\u82DA\u783D\u848F\u919F",
  "y\u014Du": "\u4F18\u598B\u5FE7\u6538\u5466\u602E\u6CD1\u5E7D\u5CF3\u6D5F\u900C\u60A0\u7FAA\u9E80\u6EFA\u6182\u512A\u913E\u5698\u61EE\u7000\u7376\u6ACC\u7E8B\u8030\u737F",
  "y\xF3u": "\u5C22\u5198\u5C24\u7531\u7534\u6C7C\u6C8B\u72B9\u90AE\u601E\u6CB9\u80AC\u6023\u65BF\u67DA\u75A3\u5EAE\u79DE\u839C\u83A4\u83B8\u90F5\u94C0\u5064\u86B0\u8A27\u9030\u63C2\u6E38\u7336\u904A\u9C7F\u6962\u7337\u923E\u9C89\u8F0F\u99C0\u8555\u8763\u9B77\u8F36\u9B8B\u7E47\u6AFE",
  "y\u01D2u": "\u53CB\u4E23\u5363\u82C3\u9149\u7F91\u682F\u83A0\u6884\u8048\u94D5\u6E75\u6962\u7989\u870F\u92AA\u69F1\u7256\u7257\u9EDD\u61EE",
  "y\xF2u": "\u53C8\u53F3\u5E7C\u4F51\u4F66\u4F91\u5B67\u6CD1\u72D6\u54CA\u56FF\u59F7\u5BA5\u5CDF\u67DA\u7270\u7950\u8BF1\u8FF6\u5500\u688E\u75CF\u86B4\u4EB4\u8C81\u91C9\u916D\u8A98\u9F2C\u6AFE",
  "y\u016B": "\u8FBC\u625C\u625D\u7EA1\u8FC3\u8FC2\u7A7B\u9653\u7D06\u5539\u6DE4\u76D3\u7600\u7B8A",
  "y\xFA": "\u4E02\u4E90\u4E8E\u9098\u4F03\u4F59\u59A4\u6275\u6745\u6B24\u7397\u7399\u65BC\u76C2\u81FE\u8867\u9C7C\u4E7B\u4FDE\u516A\u6353\u79BA\u7AFD\u8201\u8330\u8676\u5A1B\u5A2F\u5A2A\u5A31\u6859\u72F3\u8C00\u9151\u9980\u6E14\u8438\u91EA\u9683\u9685\u96E9\u9B5A\u5823\u582C\u5A7E\u5A80\u5AAE\u5D33\u5D4E\u5D5B\u63C4\u6970\u6E1D\u6E61\u756C\u8174\u842E\u903E\u9AAC\u611A\u6961\u6986\u6B48\u724F\u745C\u8245\u865E\u89CE\u6F01\u776E\u7AAC\u8206\u8915\u6B76\u7FAD\u854D\u8753\u8ADB\u96D3\u9918\u9B63\u5B29\u61D9\u6F9E\u89A6\u8E30\u6B5F\u74B5\u87B8\u8F3F\u935D\u8B23\u9AC3\u9BBD\u65DF\u7C45\u9A1F\u9BF2\u861B\u8F5D\u9C05\u9DE0\u9E06\u9F75",
  "y\u01D4": "\u4F1B\u5B87\u5C7F\u7FBD\u7A7B\u4FC1\u4FE3\u6327\u79B9\u5704\u7964\u504A\u532C\u5709\u5EBE\u6554\u9105\u659E\u842D\u50B4\u5BD9\u6940\u7440\u7610\u8207\u8A9E\u7AB3\u9828\u9F89\u5673\u5DBC\u61D9\u8C90\u6594\u7A65\u9E8C\u9F6C",
  "y\xF9": "\u8080\u7389\u9A6D\u572B\u807F\u828C\u828B\u543E\u59AA\u5FEC\u6C69\u7079\u996B\u6B25\u80B2\u90C1\u4FDE\u6631\u72F1\u79BA\u79D7\u831F\u4FFC\u53DE\u5CEA\u5F67\u682F\u6D74\u7821\u94B0\u9884\u57DF\u5809\u6086\u60D0\u6365\u6B32\u6DE2\u6DEF\u75CF\u7C96\u7FD1\u88AC\u8C15\u9033\u9608\u5585\u55A9\u55BB\u5A80\u5BD3\u5EBD\u5FA1\u68DB\u68DC\u68EB\u7134\u7419\u741F\u77DE\u7862\u7872\u88D5\u9047\u98EB\u99AD\u9E46\u5967\u6108\u6EEA\u715C\u7A22\u7F6D\u8248\u84AE\u84E3\u8A89\u923A\u9810\u50EA\u5AD7\u5D8E\u622B\u6BD3\u6F9A\u7344\u7609\u7DCE\u871F\u872E\u8A9E\u8F0D\u9289\u96A9\u617E\u6F4F\u71A8\u7A36\u84F9\u8581\u8C6B\u9079\u92CA\u9CFF\u6FA6\u71CF\u71E0\u8577\u85C7\u8AED\u9325\u95BE\u9D27\u9D2A\u9D25\u5125\u7907\u79A6\u9B4A\u9E6C\u7652\u7916\u791C\u7BFD\u91A7\u9D52\u6AF2\u9947\u860C\u8B7D\u942D\u9731\u96E4\u6B0E\u9A48\u9B3B\u7C5E\u9C4A\u9DF8\u9E12\u6B1D\u8EC9\u9B30\u9B31\u706A\u7C72\u7229",
  "yu\u0101n": "\u5917\u56E6\u8099\u9E22\u5248\u51A4\u5F32\u6081\u7722\u9E33\u5BC3\u6DB4\u6E06\u6E01\u6E0A\u6E15\u60CC\u6DF5\u847E\u68E9\u84AC\u870E\u88F7\u9E53\u7BA2\u9CF6\u8735\u99CC\u92FA\u9D1B\u5B3D\u9D77\u7041\u9F18\u9F1D",
  "yu\xE1n": "\u5143\u5186\u8D20\u90A7\u56ED\u59A7\u6C85\u82AB\u676C\u8312\u57A3\u7230\u8C9F\u539F\u54E1\u5706\u7B0E\u8696\u8881\u53A1\u915B\u5086\u559B\u570E\u5A9B\u63F4\u6E72\u7328\u7F18\u9228\u9F0B\u5712\u5713\u586C\u5AB4\u5AC4\u6965\u6E92\u6E90\u733F\u849D\u699E\u69AC\u8F95\u7DE3\u7E01\u875D\u876F\u8924\u9B6D\u571C\u6A7C\u7FB1\u8597\u8788\u9EFF\u8B1C\u8F45\u93B1\u6ADE\u908D\u9A35\u9DA2\u9DB0\u53B5",
  "yu\u01CEn": "\u76F6\u903A\u9060\u85B3\u92FA",
  "yu\xE0n": "\u5917\u59B4\u82D1\u6028\u9662\u57B8\u884F\u5086\u5A9B\u63BE\u7457\u7990\u613F\u88EB\u8911\u566E\u9858",
  "yu\u0113": "\u66F0\u66F1\u625A\u7D04\u5558\u7BB9\u77F1",
  "yu\u011B": "\u54D5\u5666",
  "yu\xE8": "\u6708\u6209\u514A\u5216\u514C\u599C\u5C84\u6288\u793F\u5CB3\u6782\u6CE7\u73A5\u6071\u680E\u54FE\u6085\u60A6\u868F\u868E\u8ECF\u94BA\u9605\u6373\u8DC0\u8DC3\u7CA4\u8D8A\u9205\u697D\u7CB5\u925E\u8AAA\u8AAC\u6A02\u95B2\u95B1\u5B33\u6A3E\u7BD7\u9AFA\u5DBD\u81D2\u9FA0\u64FD\u77C6\u6ADF\u7C46\u7039\u8625\u9EE6\u721A\u79B4\u8DAF\u8E8D\u7C65\u9470\u9E11\u7C70\u9E19",
  "y\u016Bn": "\u6D92\u7F0A\u8480\u6688\u6C32\u7174\u8495\u6C33\u7185\u717E\u596B\u7DFC\u8779\u7E15\u8D5F\u99A7\u8D07",
  "y\xFAn": "\u4E91\u52FB\u5300\u4F1D\u56E9\u5998\u62A3\u6C84\u7EAD\u82B8\u6600\u7547\u7703\u79D0\u8C9F\u90E7\u54E1\u6DA2\u7D1C\u8018\u803A\u9116\u96F2\u612A\u6EB3\u7B60\u7B7C\u84B7\u7189\u6F90\u8553\u92C6\u6A52\u7BD4\u7E1C",
  "y\u01D4n": "\u5141\u962D\u593D\u628E\u72C1\u73A7\u9668\u837A\u6B92\u5597\u9217\u9695\u7174\u6B9E\u7185\u99BB\u78D2\u8CF1\u9723\u9F6B\u9F73",
  "y\xF9n": "\u5B55\u8D20\u8FD0\u679F\u90D3\u607D\u8C9F\u54E1\u83C0\u9106\u915D\u508A\u60F2\u6120\u7F0A\u904B\u614D\u6688\u6985\u7147\u816A\u97EB\u97F5\u891E\u71A8\u7DF7\u7DFC\u8570\u8574\u7E15\u8580\u9196\u919E\u992B\u85F4\u97B0\u97D7\u97DE\u860A\u97FB",
  "z\u0101": "\u5E00\u531D\u6C9E\u8FCA\u5482\u62F6\u685A\u7D25\u7D2E\u9254\u5648\u9B73\u81DC\u81E2",
  "z\xE1": "\u6742\u6CAF\u7838\u507A\u5592\u97F4\u96D1\u894D\u96DC\u56C3\u56CB\u56D0\u96E5",
  "z\u01CE": "\u548B\u507A\u5592",
  "z\u0101i": "\u707D\u707E\u753E\u54C9\u683D\u70D6\u7560\u83D1\u6E3D\u6EA8\u7775\u8CF3",
  "z\u01CEi": "\u5BB0\u5D3D",
  "z\xE0i": "\u518D\u5728\u6257\u6282\u6D05\u50A4\u8F09\u9168\u510E\u7E21",
  "z\u0101n": "\u5142\u648D\u7CCC\u6A75\u7BF8\u7C2A\u7C2E\u9D64\u9415\u941F",
  "z\xE1n": "\u507A\u5592",
  "z\u01CEn": "\u62F6\u661D\u685A\u5BC1\u63DD\u5646\u648D\u5127\u6505\u5139\u6522\u8DB1\u8DB2",
  "z\xE0n": "\u6682\u66AB\u8CDB\u8D5E\u933E\u913C\u6FFD\u8E54\u9142\u74C9\u8D0A\u93E9\u93E8\u74D2\u9147\u56CB\u7052\u8B83\u74DA\u79B6\u7A73\u8978\u8B9A\u9961",
  "z\u0101ng": "\u5328\u7242\u7F98\u8D43\u8CCD\u81E7\u8CD8\u8D13\u9AD2\u8D1C",
  "z\u01CEng": "\u9A75\u99D4",
  "z\xE0ng": "\u5958\u5F09\u810F\u585F\u846C\u81E7\u8535\u92BA\u81D3\u81DF",
  "z\u0101o": "\u50AE\u906D\u7CDF\u8E67\u91A9",
  "z\xE1o": "\u51FF\u947F",
  "z\u01CEo": "\u65E9\u67A3\u6806\u86A4\u68D7\u7485\u6FA1\u74AA\u85BB\u85FB",
  "z\xE0o": "\u7076\u7681\u7682\u5523\u5515\u9020\u688D\u55BF\u6165\u7170\u8241\u566A\u7C09\u71E5\u7AC3\u7AC8\u8B5F\u8DAE\u8E81",
  "z\xE9": "\u5219\u629E\u6CA2\u548B\u6CCE\u8D23\u8FEE\u5247\u5536\u5567\u5E3B\u7B2E\u8234\u8CAC\u6EAD\u6EDC\u776A\u77E0\u98F5\u5616\u5AE7\u5E58\u7BA6\u8536\u6A0D\u6B75\u8ACE\u8D5C\u64C7\u6FA4\u769F\u7794\u7C00\u802B\u790B\u8957\u8B2E\u8CFE\u880C\u7042\u9F5A\u9F70\u9E05",
  "z\xE8": "\u4EC4\u5E82\u6C44\u6603\u6617\u6351\u5074\u5D31\u7A04",
  "z\xE9i": "\u8D3C\u621D\u8CCA\u9C97\u8808\u9C02\u9C61",
  "z\u0113n": "\u648D",
  "z\u011Bn": "\u600E",
  "z\xE8n": "\u8C2E\u8B56",
  "z\u0113ng": "\u66FD\u5897\u912B\u589E\u618E\u7F2F\u6A67\u7494\u7E21\u77F0\u78F3\u7AF2\u7F7E\u7E52\u8B44\u9C5B",
  "z\u011Bng": "",
  "z\xE8ng": "\u9503\u7D9C\u7F2F\u92E5\u71B7\u7511\u8D60\u7E52\u9B35\u8D08\u56CE",
  "zi": "\u55ED",
  "z\u012B": "\u5B56\u5B5C\u753E\u830A\u5179\u5472\u54A8\u59D5\u59FF\u8332\u6825\u7386\u7560\u7D0E\u8D40\u8D44\u5D30\u6DC4\u79F6\u7F01\u83D1\u8C18\u8D7C\u55DE\u5B73\u5D6B\u6914\u6E7D\u6ECB\u7CA2\u8458\u8F8E\u9111\u5B76\u798C\u89DC\u8A3E\u8CB2\u8CC7\u8D91\u9531\u7A35\u7DD5\u7DC7\u922D\u9543\u9F87\u8F1C\u9F12\u6FAC\u858B\u8AEE\u8DA6\u8F3A\u9319\u9AED\u9CBB\u937F\u93A1\u74BE\u983E\u983F\u9BD4\u9D85\u9F4D\u7E83\u9C26\u9F5C",
  "z\xED": "\u84FB",
  "z\u01D0": "\u5B50\u5407\u8293\u59C9\u59CA\u674D\u6C9D\u77F7\u79C4\u80CF\u5470\u79ED\u7C7D\u8014\u8308\u8678\u7B2B\u6893\u91E8\u5559\u7D2B\u6ED3\u8A3F\u699F\u6A74",
  "z\xEC": "\u5B57\u81EA\u8293\u79C4\u6D13\u8321\u8362\u5033\u525A\u6063\u7278\u6E0D\u7726\u7725\u83D1\u80D4\u80FE\u6F2C",
  "z\u014Dng": "\u5B97\u679E\u5027\u9A94\u582B\u5D4F\u5D55\u60FE\u68D5\u7323\u8159\u847C\u6721\u6936\u6F48\u7A2F\u7D9C\u7DC3\u6A05\u71A7\u7DF5\u7FEA\u876C\u8E28\u8E2A\u78EB\u7E4C\u9350\u8C75\u8E64\u9A0C\u9B03\u9A23\u9B09\u9B37\u9BEE\u9BFC\u9441",
  "z\u01D2ng": "\u603B\u500A\u506C\u6374\u60E3\u63D4\u6403\u7127\u50AF\u84D7\u5D78\u6460\u6F40\u7A2F\u7DCF\u719C\u7DEB\u7E02\u71EA\u7E31\u7E3D",
  "z\xF2ng": "\u662E\u75AD\u5F9E\u7314\u7882\u7CBD\u6F68\u7CC9\u7DF5\u7632\u7E26\u7E31\u7E4C\u7CED",
  "z\u014Du": "\u90B9\u9A7A\u8BF9\u90F0\u966C\u63AB\u83C6\u68F8\u68F7\u9112\u7B83\u7DC5\u8ACF\u9139\u9CB0\u9BEB\u9EC0\u9A36\u9F71\u9F7A",
  "z\u01D2u": "\u8D71\u8D70\u640A\u9BD0",
  "z\xF2u": "\u594F\u63CD\u5AB0\u6971",
  "z\u016B": "\u601A\u67E4\u79DF\u83F9\u8445\u84A9",
  "z\xFA": "\u5346\u8DB3\u5005\u54EB\u5D12\u5D2A\u65CF\u690A\u7A21\u7BA4\u8E24\u955E\u9390\u93C3",
  "z\u01D4": "\u8BC5\u963B\u7EC4\u4FCE\u67E4\u723C\u73C7\u7956\u5528\u7D44\u8A5B\u977B\u93BA",
  "z\xF9": "",
  "zu\u0101n": "\u9246\u5297\u8E9C\u945A\u8EA6\u947D",
  "zu\u01CEn": "\u7E64\u7F35\u7E82\u7E89\u7C6B\u7E98",
  "zu\xE0n": "\u63DD\u7BF9\u8CFA\u6525",
  "zu\u012B": "\u539C\u6718\u55FA\u6A36\u87D5\u7E97",
  "zu\xED": "",
  "zu\u01D0": "\u5480\u89DC\u5D8A\u5634\u567F\u6FE2\u74BB",
  "zu\xEC": "\u51A3\u682C\u7D4A\u9154\u666C\u6700\u797D\u775F\u7A21\u7F6A\u8FA0\u69DC\u917B\u855E\u9189\u5DB5\u6A87\u92F7\u930A\u6A8C\u6B08",
  "z\u016Bn": "\u5C0A\u5642\u58AB\u5D9F\u9075\u6A3D\u7E5C\u7F47\u9D8E\u940F\u9CDF\u9C52\u9DF7",
  "z\u01D4n": "\u50D4\u6499\u7E5C\u8B50",
  "z\xF9n": "\u62F5\u6358\u682B\u88B8\u928C\u7033",
  "zuo": "\u5497",
  "zu\u014D": "\u562C\u7A5D",
  "zu\xF3": "\u82F2\u6628\u67EE\u79E8\u838B\u637D\u7B2E\u7A13\u7B70\u923C",
  "zu\u01D2": "\u5DE6\u4F50\u7E53",
  "zu\xF2": "\u4F5C\u5750\u963C\u5C9D\u5C9E\u600D\u4FB3\u67DE\u795A\u80D9\u5511\u5EA7\u888F\u505A\u8444\u8443\u9162\u84D9\u98F5\u8ACE\u7CF3",
  "zh\u0101": "\u5412\u548B\u62AF\u6313\u67E4\u67FB\u54F3\u7D25\u5067\u7D2E\u63F8\u6E23\u6942\u98F5\u5284\u6463\u6F73\u76B6\u6A1D\u89F0\u76BB\u8B47\u9F44\u9F47",
  "zh\xE1": "\u672D\u7534\u8ECB\u95F8\u5273\u86BB\u94E1\u558B\u7160\u7250\u9598\u5284\u7B9A\u9705\u802B\u9358\u8B57",
  "zh\u01CE": "\u538F\u62C3\u82F2\u7728\u781F\u9C8A\u9C9D\u8ACE\u9B93\u9BBA",
  "zh\xE0": "\u4E4D\u5412\u7079\u8BC8\u600D\u54A4\u5953\u67DE\u5BB1\u75C4\u86B1\u55A5\u6EA0\u8A50\u643E\u9C8A\u69A8\u9B93\u91A1",
  "zh\u0101i": "\u4E9D\u54DC\u5908\u7C82\u635A\u658B\u5074\u658E\u6458\u69B8\u9F4A\u568C\u64FF\u9F4B",
  "zh\xE1i": "\u5387\u5B85\u7FDF\u64C7\u6AA1",
  "zh\u01CEi": "\u538F\u62A7\u7A84\u9259",
  "zh\xE0i": "\u8D23\u503A\u7826\u8CAC\u50B5\u5BE8\u7635",
  "zh\u0101n": "\u5CBE\u6017\u67AC\u6CBE\u6BE1\u65C3\u6834\u7C98\u86C5\u98E6\u60C9\u8A40\u8D88\u8A79\u959A\u8C35\u9CFD\u5661\u5DA6\u859D\u9085\u9711\u6C08\u6C0A\u77BB\u89B1\u9E6F\u65DC\u8B6B\u9958\u9CE3\u9A59\u9B59\u9C63\u9E07",
  "zh\xE1n": "\u8B9D",
  "zh\u01CEn": "\u65A9\u98D0\u5C55\u76CF\u65AC\u7416\u640C\u76DE\u5D83\u5D84\u6990\u8F97\u98AD\u5AF8\u9186\u6A4F\u8F3E\u76BD\u9EF5",
  "zh\xE0n": "\u4F54\u6218\u6808\u685F\u7AD9\u5061\u7EFD\u83DA\u5D41\u68E7\u6E5B\u6226\u788A\u50DD\u7DBB\u5D98\u6230\u8665\u8666\u89B1\u8F4F\u8B67\u6B03\u8638\u9A4F",
  "zh\u0101ng": "\u5F21\u5F20\u5F35\u7AE0\u50BD\u9123\u5ADC\u5F70\u615E\u6F33\u7350\u7CBB\u8501\u9067\u66B2\u6A1F\u748B\u9926\u87D1\u93F1\u9A3F\u9C46\u9E9E",
  "zh\u01CEng": "\u4EC9\u4EE7\u514F\u9577\u638C\u6F32\u5E65\u7903\u979D",
  "zh\xE0ng": "\u4E08\u4ED7\u6259\u5E10\u6756\u80C0\u8D26\u7C80\u5E33\u6DB1\u8139\u75EE\u969C\u5887\u5D82\u5E5B\u6F32\u8CEC\u762C\u7634\u7795",
  "zh\u0101o": "\u4F4B\u948A\u59B1\u5DF6\u62DB\u662D\u70A4\u91D7\u5541\u91FD\u924A\u9CED\u99CB\u9363\u76BD",
  "zh\xE1o": "",
  "zh\u01CEo": "\u722B\u627E\u6CBC\u83EC\u7475",
  "zh\xE0o": "\u5146\u8BCF\u679B\u5797\u70A4\u72E3\u8D75\u7B0A\u8081\u5545\u65D0\u68F9\u7F40\u8A54\u7167\u7F69\u7B8C\u8088\u8087\u8D99\u66CC\u6FEF\u71F3\u9BA1\u6AC2\u77BE\u7F84",
  "zhe": "\u55FB",
  "zh\u0113": "\u55FB\u5AEC\u906E\u87AB",
  "zh\xE9": "\u4E47\u5387\u6278\u6754\u6B7D\u77FA\u7813\u7C77\u8674\u54F2\u57D1\u7C8D\u88A9\u5560\u608A\u6662\u6663\u8F84\u5586\u68CF\u8051\u86F0\u8A5F\u6429\u8707\u8C2A\u99B2\u647A\u8F12\u6179\u78D4\u8F19\u92B8\u8F99\u87C4\u569E\u8B2B\u8B3A\u9BBF\u8F4D\u8B81\u8B8B",
  "zh\u011B": "\u8005\u4E7D\u556B\u9517\u8D6D\u8E37\u8936\u937A\u8975",
  "zh\xE8": "\u67D8\u6D59\u9019\u6DDB\u55FB\u8517\u6A1C\u9E67\u87C5\u9DD3",
  "zh\xE8i": "",
  "zh\u0113n": "\u8D1E\u9488\u4FA6\u4FB2\u5E27\u67AE\u6D48\u73CE\u73CD\u80D7\u8C9E\u5E2A\u6862\u771E\u771F\u7827\u796F\u91DD\u5075\u9159\u5BCA\u5E40\u63D5\u6E5E\u8474\u9049\u5AC3\u6438\u659F\u6939\u6968\u6EB1\u7349\u7504\u798E\u8496\u84C1\u9241\u699B\u69D9\u6B9D\u7467\u78AA\u799B\u6F67\u7BB4\u6A3C\u6FB5\u81FB\u85BD\u9331\u8F43\u937C\u7C48\u9C75",
  "zh\xE9n": "",
  "zh\u011Bn": "\u8BCA\u62AE\u6795\u59EB\u5F2B\u6623\u8F78\u5C52\u755B\u75B9\u7715\u8897\u7D3E\u8044\u8419\u7AE7\u88D6\u8999\u8A3A\u8EEB\u5AC3\u7F1C\u69D9\u7A39\u99D7\u7E1D\u7E25\u8FB4\u9B12\u9EF0",
  "zh\xE8n": "\u5733\u9635\u7EBC\u753D\u4FB2\u630B\u9663\u9E29\u632F\u6715\u681A\u7D16\u686D\u7739\u8D48\u5866\u63D5\u7D7C\u6990\u7471\u8AAB\u8CD1\u92F4\u9547\u9707\u9D06\u93AE\u93AD",
  "zh\u0113ng": "\u51E7\u4E89\u4F42\u59C3\u5F81\u6014\u722D\u7CFD\u57E9\u5CE5\u70A1\u72F0\u70DD\u7710\u8100\u94B2\u57E5\u5D1D\u5D22\u6399\u7319\u7741\u8047\u94EE\u5A9C\u63C1\u7B5D\u5FB0\u775C\u84B8\u8E2D\u9266\u5FB4\u7B8F\u7DAA\u931A\u5FB5\u7BDC\u9B07\u7665\u93F3",
  "zh\u011Bng": "\u6C36\u628D\u7CFD\u62EF\u639F\u6678\u6138\u649C\u6574",
  "zh\xE8ng": "\u6C36\u8BC1\u8BE4\u90D1\u653F\u5F8E\u94B2\u6399\u5E41\u8A3C\u5863\u8ACD\u9755\u912D\u6195\u9D0A\u8B49",
  "zh\u012B": "\u4E4B\u652F\u536E\u6C41\u829D\u5DF5\u6C65\u546E\u6CDC\u80A2\u6800\u7957\u79D3\u80D1\u80DD\u887C\u5001\u683A\u75B7\u796C\u8102\u96BB\u6894\u83ED\u6925\u81F8\u6418\u7A19\u7D95\u69B0\u8718\u99B6\u6184\u9CF7\u9D32\u7E54\u9F05\u8635",
  "zh\xED": "\u6267\u4F84\u59B7\u76F4\u79C7\u59EA\u90E6\u5024\u503C\u8040\u91DE\u57F4\u57F7\u6DD4\u804C\u6220\u690D\u7286\u7983\u7D77\u81F7\u8DD6\u74E1\u6455\u646D\u99BD\u5B02\u6179\u6F10\u6F6A\u8E2F\u6A34\u81B1\u7E36\u8077\u87D9\u8E60\u8EC4\u8E91",
  "zh\u01D0": "\u5902\u6B62\u51EA\u52A7\u65E8\u962F\u5741\u5740\u5E0B\u627A\u6C66\u6C9A\u7EB8\u82B7\u5767\u62A7\u676B\u7947\u7949\u830B\u54AB\u6049\u6307\u67B3\u6D14\u780B\u79D6\u8879\u8F75\u6DFD\u75BB\u7D19\u8694\u8A28\u8DBE\u8EF9\u9EF9\u7994\u7B6B\u7D7A\u916F\u588C\u5FB4\u5FB5\u69EF\u85E2\u8967",
  "zh\xEC": "\u81F3\u8296\u5741\u5FD7\u5FEE\u627B\u8C78\u5236\u5394\u5781\u5E19\u5E1C\u65A6\u6CBB\u7099\u8D28\u8FE3\u90C5\u4FE7\u5CD9\u5EA2\u5EA4\u6303\u67E3\u6809\u6D37\u7951\u965F\u5A21\u5F8F\u631A\u6357\u664A\u684E\u6B6D\u72FE\u79E9\u81F4\u889F\u8D3D\u8F7E\u4E7F\u506B\u526C\u5F9D\u63B7\u68BD\u6956\u7318\u7564\u75D3\u75D4\u7730\u79F2\u79F7\u7A92\u7D29\u7FD0\u88A0\u89D7\u8CAD\u94DA\u9E37\u5082\u5D3B\u5F58\u667A\u6EDE\u75E3\u86ED\u9A98\u5BD8\u5ECC\u6431\u6ECD\u7A1A\u7B6B\u7F6E\u8DF1\u8F0A\u9527\u96C9\u5886\u6EEF\u6F4C\u7590\u7608\u805C\u88FD\u899F\u8A8C\u928D\u5E5F\u6184\u6468\u646F\u6F6A\u71AB\u7A3A\u81A3\u89EF\u8CEA\u8E2C\u92B4\u92D5\u64F3\u65D8\u7004\u748F\u7DFB\u96B2\u99E4\u9D19\u5128\u5295\u61E5\u64F2\u64FF\u6ADB\u7A49\u87B2\u61EB\u7E54\u8D04\u6ACD\u74C6\u89F6\u9A2D\u9BEF\u7929\u8C51\u9DA8\u9A3A\u9A47\u8E93\u9DD9\u9455\u8C52",
  "zh\u014Dng": "\u5902\u4F00\u6C77\u5223\u5990\u5F78\u5FEA\u5FE0\u6CC8\u7082\u7EC8\u67CA\u76C5\u8873\u949F\u822F\u8877\u7D42\u9221\u5E52\u8520\u8719\u953A\u92BF\u87A4\u9D24\u87BD\u937E\u6594\u9F28\u8E71\u9418\u7C66",
  "zh\u01D2ng": "\u80BF\u51A2\u55A0\u5C30\u585A\u6B71\u7144\u816B\u7607\u7A2E\u5FB8\u8E35\u7A5C",
  "zh\xF2ng": "\u4EF2\u4F17\u5995\u72C6\u794C\u833D\u8876\u869B\u5045\u773E\u5839\u5A91\u7B57\u8846\u7A2E\u7DDF\u8AE5",
  "zh\u014Du": "\u5DDE\u821F\u8BCC\u4F9C\u5468\u6D32\u70BF\u8BEA\u70D0\u73D8\u8F80\u90EE\u5541\u5A64\u5F9F\u63AB\u6DCD\u77EA\u9031\u9E3C\u558C\u8D52\u8F08\u7FE2\u9282\u8CD9\u8F16\u970C\u99F2\u568B\u76E9\u8B05\u9D43\u9A06\u8B78",
  "zh\xF3u": "\u59AF\u8EF8\u78A1",
  "zh\u01D2u": "\u8098\u5E1A\u759B\u80D5\u83F7\u666D\u776D\u7B92\u9BDE",
  "zh\xF2u": "\u7EA3\u4F37\u546A\u5492\u5B99\u7EC9\u5191\u54AE\u663C\u7D02\u80C4\u836E\u76B1\u914E\u665D\u7C99\u6906\u8464\u8A4B\u8EF8\u7503\u50FD\u76BA\u99CE\u5663\u7E10\u7E47\u85B5\u9AA4\u7C40\u7C55\u7C52\u9A5F",
  "zh\u016B": "\u4F8F\u8BDB\u90BE\u6D19\u8331\u682A\u73E0\u8BF8\u732A\u7843\u79FC\u88BE\u94E2\u7D51\u86DB\u8A85\u8DE6\u69E0\u6F74\u854F\u876B\u9296\u6A65\u8AF8\u8C6C\u99EF\u9BA2\u9D38\u7026\u85F8\u9F04\u6AE7\u6AEB\u9BFA\u8829",
  "zh\xFA": "\u672E\u7AF9\u7AFA\u70A2\u7B01\u833F\u70DB\u7A8B\u9010\u7B1C\u8233\u902B\u7603\u84EB\u6571\u78E9\u7BC9\u7BF4\u6580\u71ED\u880B\u8E85\u9C41\u529A\u5B4E\u705F\u65B8\u66EF\u6B18\u7225\u883E\u9483",
  "zh\u01D4": "\u4E36\u4E3B\u52AF\u5B94\u62C4\u782B\u7F5C\u967C\u5E3E\u6E1A\u7151\u716E\u8A5D\u891A\u5631\u6FD0\u71DD\u9E88\u77A9\u5C6C\u56D1\u9E00\u77DA",
  "zh\xF9": "\u4F2B\u4F47\u4F4F\u7EBB\u82A7\u82CE\u577E\u62C0\u677C\u6CE8\u82E7\u8D2E\u8FEC\u9A7B\u4E7C\u58F4\u67F1\u67F7\u6BB6\u70B7\u795D\u75B0\u771D\u782B\u7969\u7ADA\u8387\u7D35\u7D38\u7F9C\u86C0\u5C0C\u5D40\u8A3B\u8CAF\u8DD3\u8EF4\u94F8\u7B6F\u9252\u98F3\u99B5\u55FB\u58B8\u7BB8\u7FE5\u6A26\u6F8D\u92F3\u99D0\u7BC9\u7BEB\u9E86\u7C17\u6AE1\u9444",
  "zhu\u0101": "\u6293\u631D\u64BE\u6A9B\u81BC\u7C3B\u9AFD",
  "zhu\u01CE": "\u722B",
  "zhu\u0101i": "\u62FD",
  "zhu\u01CEi": "\u8DE9",
  "zhu\xE0i": "\u62FD\u7749",
  "zhu\u0101n": "\u4E13\u53C0\u5C02\u606E\u7816\u8011\u5C08\u5278\u911F\u587C\u5AE5\u6F19\u747C\u750E\u78D7\u819E\u989B\u78DA\u8AEF\u7BFF\u87E4\u9853\u9C44",
  "zhu\u01CEn": "\u5B68\u8EE2\u819E\u7AF1\u8F49",
  "zhu\xE0n": "\u7077\u556D\u8EE2\u581F\u8483\u50B3\u7451\u815E\u50CE\u50DD\u8D5A\u64B0\u7BC6\u9994\u7BF9\u7E33\u8948\u8CFA\u7C28\u8D03\u8B54\u994C\u56C0\u7C51",
  "zhu\u0101ng": "\u5986\u5E84\u599D\u5E92\u8358\u5A24\u6869\u838A\u6889\u6E77\u7CA7\u88C5\u88DD\u6A01\u7CDA",
  "zhu\u01CEng": "\u5958",
  "zhu\xE0ng": "\u58EE\u58EF\u72B6\u72C0\u58F5\u710B\u50EE\u6F34\u649E\u6205\u6206\u6207",
  "zhu\u012B": "\u96B9\u9A93\u9525\u9310\u9A05\u9D7B",
  "zhu\u01D0": "\u6C9D",
  "zhu\xEC": "\u5760\u7B0D\u595E\u5A37\u7F00\u968A\u60F4\u7500\u7F12\u814F\u7577\u787E\u8187\u589C\u7DB4\u8D58\u7E0B\u8AC8\u918A\u9323\u7908\u8D05\u9446",
  "zh\u016Bn": "\u572B\u5B92\u5FF3\u8FCD\u80AB\u7A80\u8C06\u554D\u8AC4\u8860",
  "zh\u01D4n": "\u51C6\u57FB\u51D6\u6E96\u7A15\u7DA7",
  "zh\xF9n": "\u65FD\u8A30\u7A15\u7DA7",
  "zhu\u014D": "\u62D9\u70AA\u502C\u6349\u684C\u68B2\u68C1\u6DBF\u6DD6\u68F3\u68F9\u712F\u7AA7\u69D5\u7A5B\u942F\u7A71",
  "zhu\xF3": "\u5734\u5F74\u6C4B\u72B3\u707C\u5353\u53D5\u59B0\u8301\u65AB\u6D4A\u4E35\u5262\u6354\u6D5E\u70F5\u8BFC\u914C\u5544\u5545\u5A3A\u8049\u65B1\u65AE\u666B\u6913\u7438\u787A\u7AA1\u7F6C\u84D4\u588C\u64AF\u64C6\u65B2\u799A\u5285\u8AC1\u8AD1\u8DA0\u92DC\u5663\u6FC1\u71CB\u7BE7\u64E2\u6580\u65B5\u6FEF\u85CB\u6AE1\u8B36\u956F\u7E73\u9D6B\u7042\u8817\u9432\u7C57\u9DDF\u883F\u7C71",
  "zhu\xF2": "",
  "ch\u01CEng,\u0101n,h\xE0n": "\u5382",
  "d\u012Bng,zh\u0113ng": "\u4E01",
  "b\u01D4,bo": "\u535C",
  "j\u01D0,j\u012B": "\u51E0",
  "le,li\u01CEo": "\u4E86",
  "g\u0101n,g\xE0n": "\u5E72",
  "d\xE0,d\xE0i,t\xE0i": "\u5927",
  "y\u01D4,y\xF9,y\xFA": "\u4E0E",
  "sh\xE0ng,sh\u01CEng": "\u4E0A",
  "w\xE0n,m\xF2": "\u4E07",
  "g\xE8,g\u011B": "\u4E2A\u5404",
  "me,m\xF3,ma,y\u0101o": "\u4E48",
  "gu\u01CEng,\u0101n": "\u5E7F",
  "w\xE1ng,w\xFA": "\u4EA1",
  "n\u01DA,r\u01D4": "\u5973",
  "ch\u0101,ch\xE1,ch\u01CE": "\u53C9",
  "w\xE1ng,w\xE0ng": "\u738B",
  "f\u016B,f\xFA": "\u592B",
  "zh\u0101,z\u0101,zh\xE1": "\u624E",
  "b\xF9,f\u01D2u": "\u4E0D",
  "q\u016B,\u014Du": "\u533A",
  "ch\u0113,j\u016B": "\u8F66",
  "qi\xE8,qi\u0113": "\u5207",
  "w\u01CE,w\xE0": "\u74E6",
  "t\xFAn,zh\u016Bn": "\u5C6F",
  "sh\u01CEo,sh\xE0o": "\u5C11",
  "zh\u014Dng,zh\xF2ng": "\u4E2D",
  "n\xE8i,n\xE0": "\u5185",
  "ji\xE0n,xi\xE0n": "\u89C1",
  "ch\xE1ng,zh\u01CEng": "\u957F",
  "sh\xE9n,sh\xED": "\u4EC0",
  "pi\xE0n,pi\u0101n": "\u7247",
  "p\xFA,p\u016B": "\u4EC6",
  "hu\xE0,hu\u0101": "\u5316",
  "ch\xF3u,qi\xFA": "\u4EC7",
  "zhu\u01CE,zh\u01CEo": "\u722A",
  "j\u01D0n,j\xECn": "\u4EC5",
  "f\xF9,f\u01D4": "\u7236",
  "c\xF3ng,z\xF2ng": "\u4ECE",
  "f\u0113n,f\xE8n": "\u5206",
  "sh\xEC,zh\u012B": "\u6C0F",
  "f\u0113ng,f\u011Bng": "\u98CE",
  "g\u014Du,g\xF2u": "\u52FE",
  "li\xF9,l\xF9": "\u516D",
  "d\u01D2u,d\xF2u": "\u6597",
  "w\xE8i,w\xE9i": "\u4E3A",
  "ch\u01D0,ch\u011B": "\u5C3A",
  "y\u01D4,y\xFA": "\u4E88",
  "d\u01CE,d\xE1": "\u6253",
  "zh\xE8ng,zh\u0113ng": "\u6B63\u75C7\u6323",
  "b\u0101,p\xE1": "\u6252",
  "ji\xE9,ji\u0113": "\u8282\u7ED3",
  "sh\xF9,sh\xFA,zh\xFA": "\u672F",
  "k\u011B,k\xE8": "\u53EF",
  "sh\xED,d\xE0n": "\u77F3",
  "k\u01CE,qi\u01CE": "\u5361",
  "b\u011Bi,b\xE8i": "\u5317",
  "zh\xE0n,zh\u0101n": "\u5360",
  "qi\u011B,j\u016B": "\u4E14",
  "y\xE8,xi\xE9": "\u53F6",
  "h\xE0o,h\xE1o": "\u53F7",
  "zh\u012B,zh\u01D0": "\u53EA",
  "d\u0101o,t\u0101o": "\u53E8",
  "z\u01CEi,z\u01D0,z\u012B": "\u4ED4",
  "l\xECng,l\xEDng,l\u01D0ng": "\u4EE4",
  "l\xE8,yu\xE8": "\u4E50",
  "j\xF9,g\u014Du": "\u53E5",
  "ch\xF9,ch\u01D4": "\u5904",
  "t\xF3u,tou": "\u5934",
  "n\xEDng,n\xECng,zh\xF9": "\u5B81",
  "zh\xE0o,sh\xE0o": "\u53EC",
  "f\u0101,f\xE0": "\u53D1",
  "t\xE1i,t\u0101i": "\u53F0\u82D4",
  "k\xE1ng,g\u0101ng": "\u625B",
  "d\xEC,de": "\u5730",
  "s\u01CEo,s\xE0o": "\u626B",
  "ch\u01CEng,ch\xE1ng": "\u573A",
  "p\u01D4,p\xF2,p\u014D,pi\xE1o": "\u6734",
  "gu\xF2,guo,gu\u014D": "\u8FC7",
  "y\u0101,y\xE0": "\u538B",
  "y\u01D2u,y\xF2u": "\u6709",
  "ku\u0101,ku\xE0": "\u5938",
  "xi\xE9,y\xE1,y\xE9,y\xFA,x\xFA": "\u90AA",
  "ji\xE1,ji\u0101,g\u0101,xi\xE1": "\u5939",
  "hu\xE0,hu\xE1": "\u5212",
  "d\u0101ng,d\xE0ng": "\u5F53",
  "t\xF9,t\u01D4": "\u5410",
  "xi\xE0,h\xE8": "\u5413",
  "t\xF3ng,t\xF2ng": "\u540C",
  "q\u016B,q\u01D4": "\u66F2",
  "ma,m\xE1,m\u01CE": "\u5417",
  "q\u01D0,k\u01CEi": "\u5C82",
  "zh\u016B,sh\xFA": "\u6731",
  "chu\xE1n,zhu\xE0n": "\u4F20",
  "xi\u016B,x\u01D4": "\u4F11",
  "r\xE8n,r\xE9n": "\u4EFB",
  "hu\xE1,hu\xE0,hu\u0101": "\u534E",
  "ji\xE0,ji\xE8,jie": "\u4EF7",
  "f\xE8n,b\u012Bn": "\u4EFD",
  "y\u01CEng,\xE1ng": "\u4EF0",
  "xi\u011B,xu\xE8": "\u8840",
  "s\xEC,sh\xEC": "\u4F3C",
  "h\xE1ng,x\xEDng": "\u884C",
  "hu\xEC,ku\xE0i": "\u4F1A",
  "h\xE9,g\u011B": "\u5408",
  "chu\xE0ng,chu\u0101ng": "\u521B",
  "ch\u014Dng,ch\xF2ng": "\u51B2",
  "q\xED,j\xEC,z\u012B,zh\u0101i": "\u9F50",
  "y\xE1ng,xi\xE1ng": "\u7F8A",
  "b\xECng,b\u012Bng": "\u5E76",
  "h\xE0n,h\xE1n": "\u6C57",
  "t\u0101ng,sh\u0101ng": "\u6C64",
  "x\u012Bng,x\xECng": "\u5174",
  "x\u01D4,h\u01D4": "\u8BB8",
  "l\xF9n,l\xFAn": "\u8BBA",
  "n\xE0,n\u01CE,n\xE8i,n\u0101": "\u90A3",
  "j\xECn,j\u01D0n": "\u5C3D",
  "s\u016Bn,x\xF9n": "\u5B59",
  "x\xEC,h\u016B": "\u620F",
  "h\u01CEo,h\xE0o": "\u597D",
  "t\u0101,ji\u011B": "\u5979",
  "gu\u0101n,gu\xE0n": "\u89C2\u51A0",
  "h\xF3ng,g\u014Dng": "\u7EA2",
  "xi\u0101n,qi\xE0n": "\u7EA4",
  "j\xEC,j\u01D0": "\u7EAA\u6D4E",
  "yu\u0113,y\u0101o": "\u7EA6",
  "n\xF2ng,l\xF2ng": "\u5F04",
  "yu\u01CEn,yu\xE0n": "\u8FDC",
  "hu\xE0i,p\u0113i,p\u012B,p\xE9i": "\u574F",
  "zh\xE9,sh\xE9,zh\u0113": "\u6298",
  "qi\u01CEng,qi\u0101ng,ch\u0113ng": "\u62A2",
  "k\xE9,qi\xE0o": "\u58F3",
  "f\u0101ng,f\xE1ng": "\u574A",
  "b\u01CE,b\xE0": "\u628A",
  "g\u0101n,g\u01CEn": "\u6746",
  "s\u016B,s\xF9": "\u82CF",
  "g\xE0ng,g\u0101ng": "\u6760",
  "g\xE8ng,g\u0113ng": "\u66F4",
  "l\xEC,l\xED": "\u4E3D",
  "h\xE1i,hu\xE1n": "\u8FD8",
  "f\u01D2u,p\u01D0": "\u5426",
  "xi\xE0n,xu\xE1n": "\u53BF",
  "zh\xF9,ch\xFA": "\u52A9",
  "ya,y\u0101": "\u5440",
  "ch\u01CEo,ch\u0101o": "\u5435",
  "yu\xE1n,y\xFAn,y\xF9n": "\u5458",
  "ba,b\u0101": "\u5427",
  "bi\xE9,bi\xE8": "\u522B",
  "d\u012Bng,d\xECng": "\u9489",
  "g\u016B,g\xF9": "\u4F30",
  "h\xE9,h\u0113,h\xE8": "\u4F55",
  "t\u01D0,t\u012B,b\xE8n": "\u4F53",
  "b\xF3,b\u01CEi,b\xE0": "\u4F2F",
  "y\xF2ng,y\u014Dng": "\u4F63",
  "f\xF3,f\xFA,b\xEC,b\xF3": "\u4F5B",
  "d\xF9,d\u01D4": "\u809A",
  "gu\u012B,j\u016Bn,qi\u016B": "\u9F9F",
  "ji\u01CEo,ju\xE9": "\u89D2",
  "ti\xE1o,ti\u0101o": "\u6761",
  "x\xEC,j\xEC": "\u7CFB",
  "y\xECng,y\u012Bng": "\u5E94",
  "zh\xE8,zh\xE8i": "\u8FD9",
  "ji\u0101n,ji\xE0n": "\u95F4\u76D1",
  "m\u0113n,m\xE8n": "\u95F7",
  "d\xEC,t\xEC,tu\xED": "\u5F1F",
  "sh\u0101,sh\xE0": "\u6C99",
  "sh\xE0,sh\u0101": "\u715E",
  "m\xE9i,m\xF2": "\u6CA1",
  "sh\u011Bn,ch\xE9n": "\u6C88",
  "sh\xED,zh\xEC": "\u8BC6",
  "ni\xE0o,su\u012B": "\u5C3F",
  "w\u011Bi,y\u01D0": "\u5C3E",
  "\u0113,\u0101": "\u963F",
  "j\xECn,j\xECng": "\u52B2",
  "z\xF2ng,z\u01D2ng": "\u7EB5",
  "w\xE9n,w\xE8n": "\u7EB9",
  "m\u01D2,m\xF2,m\u0101": "\u62B9",
  "d\u0101n,d\xE0n,d\u01CEn": "\u62C5",
  "ch\u0101i,c\u0101": "\u62C6",
  "j\u016B,g\u014Du": "\u62D8",
  "l\u0101,l\xE1": "\u62C9",
  "b\xE0n,p\xE0n": "\u62CC",
  "z\xE9,zh\xE1i": "\u62E9",
  "q\xED,j\u012B": "\u5176\u5947",
  "ru\xF2,r\u011B": "\u82E5",
  "p\xEDng,p\u0113ng": "\u82F9",
  "zh\u012B,q\xED": "\u679D",
  "gu\xEC,j\u01D4": "\u67DC",
  "s\xE0ng,s\u0101ng": "\u4E27",
  "c\xEC,c\u012B": "\u523A",
  "y\u01D4,y\xF9": "\u96E8\u8BED",
  "b\u0113n,b\xE8n": "\u5954",
  "q\u012B,q\xEC": "\u59BB",
  "zhu\u01CEn,zhu\xE0n,zhu\u01CEi": "\u8F6C",
  "xi\u0113,su\xF2": "\u4E9B",
  "ne,n\xED": "\u5462",
  "ti\u011B,ti\u0113,ti\xE8,": "\u5E16",
  "l\u01D0ng,l\xEDng": "\u5CAD",
  "zh\u012B,zh\xEC": "\u77E5\u7EC7",
  "h\xE9,h\xE8,hu\xF3,hu\xF2,h\xFA": "\u548C",
  "g\xF2ng,g\u014Dng": "\u4F9B\u5171",
  "w\u011Bi,w\u0113i": "\u59D4",
  "c\xE8,z\xE8,zh\u0101i": "\u4FA7",
  "p\xF2,p\u01CEi": "\u8FEB",
  "de,d\xEC,d\xED": "\u7684",
  "c\u01CEi,c\xE0i": "\u91C7",
  "f\xFA,f\xF9": "\u670D",
  "d\u01D0,de": "\u5E95",
  "j\xECng,ch\u0113ng": "\u51C0",
  "ju\xE0n,ju\u01CEn": "\u5377",
  "qu\xE0n,xu\xE0n": "\u5238",
  "d\u0101n,sh\xE0n,ch\xE1n": "\u5355",
  "qi\u01CEn,ji\u0101n": "\u6D45",
  "xi\xE8,y\xEC": "\u6CC4",
  "p\u014D,b\xF3": "\u6CCA",
  "p\xE0o,p\u0101o": "\u6CE1",
  "n\xED,n\xEC": "\u6CE5",
  "z\xE9,sh\xEC": "\u6CFD",
  "k\u014Dng,k\xF2ng,k\u01D2ng": "\u7A7A",
  "l\xE1ng,l\xE0ng": "\u90CE",
  "xi\xE1ng,y\xE1ng": "\u8BE6",
  "l\xEC,d\xE0i": "\u96B6",
  "shu\u0101,shu\xE0": "\u5237",
  "ji\xE0ng,xi\xE1ng": "\u964D",
  "c\u0101n,sh\u0113n,c\u0113n,s\u0101n": "\u53C2",
  "d\xFA,d\xE0i": "\u6BD2",
  "ku\xE0,k\u016B": "\u630E",
  "d\u01CEng,d\xE0ng": "\u6321",
  "ku\xF2,gu\u0101": "\u62EC",
  "sh\xED,sh\xE8": "\u62FE",
  "ti\u0101o,ti\u01CEo": "\u6311",
  "sh\xE8n,sh\xE9n": "\u751A",
  "xi\xE0ng,h\xE0ng": "\u5DF7",
  "n\xE1n,n\u0101": "\u5357",
  "xi\u0101ng,xi\xE0ng": "\u76F8",
  "ch\xE1,zh\u0101": "\u67E5",
  "b\u01CEi,b\xF3,b\xF2": "\u67CF",
  "y\xE0o,y\u0101o": "\u8981",
  "y\xE1n,y\xE0n": "\u7814",
  "q\xEC,qi\xE8": "\u780C",
  "b\xE8i,b\u0113i": "\u80CC",
  "sh\u011Bng,x\u01D0ng": "\u7701",
  "xi\u0101o,xu\u0113": "\u524A",
  "h\u01D2ng,h\u014Dng,h\xF2ng": "\u54C4",
  "m\xE0o,m\xF2": "\u5192",
  "y\u01CE,y\u0101": "\u54D1",
  "s\u012B,s\u0101i": "\u601D",
  "m\u01CE,m\u0101,m\xE0": "\u8682",
  "hu\xE1,hu\u0101": "\u54D7",
  "y\xE8,y\xE0n,y\u0101n": "\u54BD",
  "z\xE1n,z\u01CE": "\u54B1",
  "h\u0101,h\u01CE,h\xE0": "\u54C8",
  "n\u01CE,n\u011Bi,na,n\xE9": "\u54EA",
  "h\u0101i,k\xE9": "\u54B3",
  "g\u01D4,g\u016B": "\u9AA8",
  "g\u0101ng,g\xE0ng": "\u94A2",
  "y\xE0o,yu\xE8": "\u94A5",
  "k\xE0n,k\u0101n": "\u770B",
  "zh\xF2ng,zh\u01D2ng,ch\xF3ng": "\u79CD",
  "bi\xE0n,pi\xE1n": "\u4FBF",
  "zh\xF2ng,ch\xF3ng": "\u91CD",
  "x\xECn,sh\u0113n": "\u4FE1",
  "zhu\u012B,du\u012B": "\u8FFD",
  "d\xE0i,d\u0101i": "\u5F85",
  "sh\xED,s\xEC,y\xEC": "\u98DF",
  "m\xE0i,m\xF2": "\u8109",
  "ji\u0101ng,ji\xE0ng": "\u5C06\u6D46",
  "d\xF9,du\xF3": "\u5EA6",
  "q\u012Bn,q\xECng": "\u4EB2",
  "ch\xE0,ch\u0101,ch\u0101i,c\u012B": "\u5DEE",
  "zh\xE0,zh\xE1": "\u70B8",
  "p\xE0o,p\xE1o,b\u0101o": "\u70AE",
  "s\u01CE,x\u01D0": "\u6D12",
  "x\u01D0,xi\u01CEn": "\u6D17",
  "ju\xE9,ji\xE0o": "\u89C9",
  "bi\u01CEn,pi\u0101n": "\u6241",
  "shu\u014D,shu\xEC,yu\xE8": "\u8BF4",
  "l\u01CEo,m\u01D4": "\u59E5",
  "g\u011Bi,j\u01D0": "\u7ED9",
  "lu\xF2,l\xE0o": "\u7EDC",
  "z\u01CEi,z\xE0i": "\u8F7D",
  "m\xE1i,m\xE1n": "\u57CB",
  "sh\u0101o,sh\xE0o": "\u634E\u7A0D",
  "d\u016B,d\u014Du": "\u90FD",
  "\xE1i,\u0101i": "\u6328",
  "m\xF2,m\xF9": "\u83AB",
  "\xE8,w\xF9,\u011B,w\u016B": "\u6076",
  "xi\xE0o,ji\xE0o": "\u6821",
  "h\xE9,h\xFA": "\u6838",
  "y\u016Bn,y\xF9n": "\u6655",
  "hu\xE0ng,hu\u01CEng": "\u6643",
  "\xE0i,\u0101i": "\u5509",
  "\u0101,\xE1,\u01CE,\xE0,a": "\u554A",
  "b\xE0,ba,p\xED": "\u7F62",
  "zu\xE0n,zu\u0101n": "\u94BB",
  "qi\u0101n,y\xE1n": "\u94C5",
  "ch\xE9ng,sh\xE8ng": "\u4E58",
  "m\xEC,b\xEC": "\u79D8\u6CCC",
  "ch\u0113ng,ch\xE8n,ch\xE8ng": "\u79F0",
  "d\xE0o,d\u01CEo": "\u5012",
  "t\u01CEng,ch\xE1ng": "\u5018",
  "ch\xE0ng,ch\u0101ng": "\u5021",
  "ch\xF2u,xi\xF9": "\u81ED",
  "sh\xE8,y\xE8,y\xEC": "\u5C04",
  "g\u0113,g\xE9": "\u80F3\u6401",
  "shu\u0101i,cu\u012B": "\u8870",
  "li\xE1ng,li\xE0ng": "\u51C9\u91CF",
  "ch\xF9,x\xF9": "\u755C",
  "p\xE1ng,b\xE0ng": "\u65C1\u78C5",
  "zh\u01CEng,zh\xE0ng": "\u6DA8",
  "y\u01D2ng,ch\u014Dng": "\u6D8C",
  "qi\u0101o,qi\u01CEo": "\u6084",
  "ji\u0101,jia,jie": "\u8FE6\u5BB6",
  "d\xFA,d\xF2u": "\u8BFB",
  "sh\xE0n,sh\u0101n": "\u6247",
  "sh\u0101n,sh\xE0n": "\u82EB",
  "b\xE8i,p\u012B": "\u88AB",
  "ti\xE1o,di\xE0o,zh\u014Du": "\u8C03",
  "b\u014D,b\u0101o": "\u5265",
  "n\xE9ng,n\xE0i": "\u80FD",
  "n\xE1n,n\xE0n,nu\xF3": "\u96BE",
  "p\xE1i,p\u01CEi": "\u6392",
  "ji\xE0o,ji\u0101o": "\u6559",
  "j\xF9,j\u016B": "\u636E",
  "zh\xF9,zhu\xF3,zhe": "\u8457",
  "j\u016Bn,j\xF9n": "\u83CC",
  "l\xE8,l\u0113i": "\u52D2",
  "sh\u0101o,s\xE0o": "\u68A2",
  "f\xF9,p\xEC": "\u526F",
  "pi\xE0o,pi\u0101o": "\u7968",
  "sh\xE8ng,ch\xE9ng": "\u76DB",
  "qu\xE8,qi\u0101o,qi\u01CEo": "\u96C0",
  "ch\xED,shi": "\u5319",
  "m\u012B,m\xED": "\u772F",
  "la,l\u0101": "\u5566",
  "sh\xE9,y\xED": "\u86C7",
  "l\xE8i,l\xE9i,l\u011Bi": "\u7D2F",
  "zh\u01CEn,ch\xE1n": "\u5D2D",
  "qu\u0101n,ju\xE0n,ju\u0101n": "\u5708",
  "l\xF3ng,l\u01D2ng": "\u7B3C",
  "d\xE9,d\u011Bi,de": "\u5F97",
  "ji\u01CE,ji\xE0": "\u5047",
  "m\u0101o,m\xE1o": "\u732B",
  "xu\xE1n,xu\xE0n": "\u65CB",
  "zhe,zhu\xF3,zh\xE1o,zh\u0101o": "\u7740",
  "l\u01DC,shu\xE0i": "\u7387",
  "g\xE0i,g\u011B,h\xE9": "\u76D6",
  "l\xEDn,l\xECn": "\u6DCB",
  "q\xFA,j\xF9": "\u6E20",
  "ji\xE0n,ji\u0101n": "\u6E10\u6E85",
  "h\xF9n,h\xFAn": "\u6DF7",
  "s\xF9,xi\u01D4,xi\xF9": "\u5BBF",
  "t\xE1n,d\xE0n": "\u5F39",
  "y\u01D0n,y\xECn": "\u9690",
  "j\u01D0ng,g\u011Bng": "\u9888",
  "l\u01DC,l\xF9": "\u7EFF",
  "q\u016B,c\xF9": "\u8D8B",
  "t\xED,d\u012B,d\u01D0": "\u63D0",
  "ji\u0113,q\xEC": "\u63ED",
  "l\u01D2u,l\u014Du": "\u6402",
  "q\u012B,j\u012B": "\u671F",
  "s\xE0n,s\u01CEn": "\u6563",
  "g\u011B,g\xE9": "\u845B",
  "zh\u0101o,ch\xE1o": "\u671D",
  "lu\xF2,l\xE0,l\xE0o": "\u843D",
  "y\u01D0,y\u012B": "\u6905",
  "g\xF9n,h\xF9n": "\u68CD",
  "zh\xED,shi": "\u6B96",
  "xi\xE0,sh\xE0": "\u53A6",
  "li\xE8,li\u011B": "\u88C2",
  "j\u01D0ng,y\u01D0ng": "\u666F",
  "p\u0113n,p\xE8n": "\u55B7",
  "p\u01CEo,p\xE1o": "\u8DD1",
  "h\u0113,h\xE8,y\xE8": "\u559D",
  "p\xF9,p\u016B": "\u94FA",
  "zh\xF9,zh\xFA": "\u7B51",
  "d\xE1,d\u0101": "\u7B54",
  "b\u01CEo,b\u01D4,p\xF9": "\u5821",
  "\xE0o,y\xF9": "\u5965",
  "f\u0101n,p\u0101n": "\u756A",
  "l\xE0,x\u012B": "\u814A",
  "g\u01CEng,ji\u01CEng": "\u6E2F",
  "c\xE9ng,z\u0113ng": "\u66FE",
  "y\xFA,t\u014Du": "\u6109",
  "qi\xE1ng,qi\u01CEng,ji\xE0ng": "\u5F3A",
  "sh\u01D4,zh\u01D4": "\u5C5E",
  "zh\u014Du,y\xF9": "\u7CA5",
  "sh\xE8,ni\xE8": "\u6444",
  "ti\xE1n,zh\xE8n": "\u586B",
  "m\xE9ng,m\u0113ng,m\u011Bng": "\u8499",
  "j\xECn,j\u012Bn": "\u7981",
  "l\xF9,li\xF9": "\u788C",
  "ti\xE0o,t\xE1o": "\u8DF3",
  "\xE9,y\u01D0": "\u86FE",
  "ji\u011B,ji\xE8,xi\xE8": "\u89E3",
  "sh\xF9,sh\u01D4,shu\xF2": "\u6570",
  "li\u016B,li\xF9": "\u6E9C",
  "s\u0101i,s\xE0i,s\xE8": "\u585E",
  "p\xEC,b\xEC": "\u8F9F",
  "f\xE8ng,f\xE9ng": "\u7F1D",
  "pi\u011B,pi\u0113": "\u6487",
  "m\xF3,m\xFA": "\u6A21",
  "b\u01CEng,b\xE0ng": "\u699C",
  "shang,ch\xE1ng": "\u88F3",
  "xi\u0101n,xi\u01CEn": "\u9C9C",
  "y\xED,n\u01D0": "\u7591",
  "g\u0101o,g\xE0o": "\u818F",
  "pi\u0101o,pi\xE0o,pi\u01CEo": "\u6F02",
  "su\u014D,s\xF9": "\u7F29",
  "q\xF9,c\xF9": "\u8DA3",
  "s\u0101,s\u01CE": "\u6492",
  "t\xE0ng,t\u0101ng": "\u8D9F",
  "h\xE9ng,h\xE8ng": "\u6A2A",
  "m\xE1n,m\xE9n": "\u7792",
  "b\xE0o,p\xF9": "\u66B4",
  "m\xF3,m\u0101": "\u6469",
  "h\xFA,h\u016B,h\xF9": "\u7CCA",
  "p\u012B,p\u01D0": "\u5288",
  "y\xE0n,y\u0101n": "\u71D5",
  "b\xE1o,b\xF3,b\xF2": "\u8584",
  "m\xF3,m\xF2": "\u78E8",
  "ji\u01CEo,zhu\xF3": "\u7F34",
  "c\xE1ng,z\xE0ng": "\u85CF",
  "f\xE1n,p\xF3": "\u7E41",
  "b\xEC,bei": "\u81C2",
  "ch\xE0n,zh\xE0n": "\u98A4",
  "ji\u0101ng,qi\xE1ng": "\u7586",
  "ji\xE1o,ju\xE9,ji\xE0o": "\u56BC",
  "r\u01CEng,r\u0101ng": "\u56B7",
  "l\xF9,l\xF2u": "\u9732",
  "n\xE1ng,n\u0101ng": "\u56CA",
  "h\u0101ng,b\xE8n": "\u592F",
  "\u0101o,w\u0101": "\u51F9",
  "f\xE9ng,p\xEDng": "\u51AF",
  "x\u016B,y\xF9": "\u5401",
  "l\xE8i,l\u0113": "\u808B",
  "l\u016Bn,l\xFAn": "\u62A1",
  "ji\xE8,g\xE0i": "\u82A5",
  "x\u012Bn,x\xECn": "\u82AF",
  "ch\u0101,ch\xE0": "\u6748",
  "xi\u0101o,xi\xE0o": "\u8096",
  "zh\u012B,z\u012B": "\u5431",
  "\u01D2u,\u014Du,\xF2u": "\u5455",
  "n\xE0,n\xE8": "\u5450",
  "qi\xE0ng,qi\u0101ng": "\u545B",
  "t\xFAn,d\xF9n": "\u56E4",
  "k\u0113ng,h\xE1ng": "\u542D",
  "di\xE0n,ti\xE1n": "\u4F43",
  "s\xEC,c\xEC": "\u4F3A",
  "di\xE0n,ti\xE1n,sh\xE8ng": "\u7538",
  "p\xE1o,b\xE0o": "\u5228",
  "du\xEC,ru\xEC,yu\xE8": "\u5151",
  "k\u0113,k\u011B": "\u5777",
  "tu\xF2,t\xE0,zh\xED": "\u62D3",
  "f\xFA,b\xEC": "\u62C2",
  "n\u01D0ng,n\xEDng,n\xECng": "\u62E7",
  "\xE0o,\u01CEo,ni\xF9": "\u62D7",
  "k\u0113,h\u0113": "\u82DB",
  "y\u0101n,y\u01CEn": "\u5944",
  "h\u0113,a,k\u0113": "\u5475",
  "g\u0101,k\u0101": "\u5496",
  "ji\u01CEo,y\xE1o": "\u4FA5",
  "ch\xE0,sh\u0101": "\u5239",
  "n\xFC\xE8,y\xE0o": "\u759F",
  "m\xE1ng,m\xE9ng": "\u6C13",
  "g\u0113,y\xEC": "\u7599",
  "j\u01D4,j\xF9": "\u6CAE",
  "z\xFA,c\xF9": "\u5352",
  "w\u01CEn,yu\u0101n": "\u5B9B",
  "m\xED,m\u01D0": "\u5F25",
  "q\xEC,qi\xE8,xi\xE8": "\u5951",
  "xi\xE9,ji\u0101": "\u631F",
  "du\xF2,du\u01D2": "\u579B",
  "zh\xE0,sh\u0101n,shi,c\xE8": "\u6805",
  "b\xF3,b\xE8i": "\u52C3",
  "zh\xF3u,zh\xF2u": "\u8F74",
  "li\u0113,li\u011B,li\xE9,lie": "\u54A7",
  "yo,y\u014D": "\u54DF",
  "qi\xE0o,xi\xE0o": "\u4FCF",
  "h\xF3u,h\xF2u": "\u4FAF",
  "p\xEDng,b\u01D0ng": "\u5C4F",
  "n\xE0,nu\xF3": "\u5A1C",
  "p\xE1,b\xE0": "\u8019",
  "q\u012B,x\u012B": "\u6816",
  "ji\u01CE,g\u01D4": "\u8D3E",
  "l\xE1o,l\xE0o": "\u5520",
  "b\xE0ng,b\xE8ng": "\u868C",
  "g\u014Dng,zh\u014Dng": "\u86A3",
  "li,l\u01D0,l\u012B": "\u54E9",
  "ju\xE8,ju\xE9": "\u5014",
  "y\u012Bn,y\u0101n,y\u01D0n": "\u6BB7",
  "w\u014D,gu\u014D": "\u6DA1",
  "l\xE0o,lu\xF2": "\u70D9",
  "ni\u01CEn,ni\u0113": "\u637B",
  "y\xE8,y\u0113": "\u6396",
  "ch\u0101n,xi\u0101n,c\xE0n,sh\u01CEn": "\u63BA",
  "d\u01CEn,sh\xE0n": "\u63B8",
  "f\u0113i,f\u011Bi": "\u83F2",
  "qi\xE1n,g\u0101n": "\u4E7E",
  "shu\xF2,sh\xED": "\u7855",
  "lu\u014D,lu\xF3,luo": "\u5570",
  "h\u01D4,xi\xE0": "\u552C",
  "d\u0101ng,ch\u0113ng": "\u94DB",
  "xi\u01CEn,x\u01D0": "\u94E3",
  "ji\u01CEo,ji\xE1o": "\u77EB",
  "ku\u01D0,gu\u012B": "\u5080",
  "j\xEC,zh\xE0i": "\u796D",
  "t\u01CEng,ch\u01CEng": "\u6DCC",
  "ch\xFAn,zh\u016Bn": "\u6DF3",
  "w\xE8i,y\xF9": "\u5C09",
  "du\xF2,hu\u012B": "\u5815",
  "chu\xF2,ch\u0101o": "\u7EF0",
  "b\u0113ng,b\u011Bng,b\xE8ng": "\u7EF7",
  "z\u014Dng,z\xE8ng": "\u7EFC",
  "zhu\xF3,zu\xF3": "\u7422",
  "chu\u01CEi,chu\xE0i,chu\u0101i,tu\xE1n,zhu\u012B": "\u63E3",
  "p\xE9ng,b\u0101ng": "\u5F6D",
  "zhu\u012B,chu\xED": "\u690E",
  "l\xE9ng,l\u0113ng,l\xEDng": "\u68F1",
  "qi\xE0o,qi\xE1o": "\u7FD8",
  "zh\u0101,ch\u0101": "\u55B3",
  "h\xE1,g\xE9": "\u86E4",
  "qi\xE0n,k\xE0n": "\u5D4C",
  "y\u0101n,\u0101": "\u814C",
  "d\u016Bn,du\xEC": "\u6566",
  "ku\xEC,hu\xEC": "\u6E83",
  "s\u0101o,s\u01CEo": "\u9A9A",
  "k\u01CEi,ji\u0113": "\u6977",
  "p\xEDn,b\u012Bn": "\u9891",
  "li\xFA,li\xF9": "\u998F",
  "n\xEC,ni\xE0o": "\u6EBA",
  "ji\u01CEo,ch\u0101o": "\u527F",
  "\xE1o,\u0101o": "\u71AC",
  "m\xE0n,w\xE0n": "\u8513",
  "ch\xE1,ch\u0101": "\u78B4",
  "x\u016Bn,x\xF9n": "\u718F",
  "da,d\xE1": "\u7629",
  "tu\xEC,t\xF9n": "\u892A",
  "li\xE1o,li\u0101o": "\u64A9",
  "cu\u014D,zu\u01D2": "\u64AE",
  "ch\xE1o,zh\u0101o": "\u5632",
  "h\u0113i,m\xF2": "\u563F",
  "zhu\xE0ng,chu\xE1ng": "\u5E62",
  "j\u012B,q\u01D0": "\u7A3D",
  "bi\u011B,bi\u0113": "\u762A",
  "li\xE1o,l\xE0o,l\u01CEo": "\u6F66",
  "ch\xE9ng,d\xE8ng": "\u6F84",
  "l\xE8i,l\xE9i": "\u64C2",
  "m\xF2,m\xE1": "\u87C6",
  "li\xE1o,li\u01CEo": "\u71CE",
  "li\xE0o,li\u01CEo": "\u77AD",
  "s\xE0o,s\u0101o": "\u81CA",
  "m\xED,m\xE9i": "\u7CDC",
  "hu\xF2,hu\u014D,hu\xE1": "\u8C41",
  "p\xF9,b\xE0o": "\u7011",
  "z\u01CEn,cu\xE1n": "\u6512",
  "b\xF2,b\u01D2": "\u7C38",
  "b\xF3,b\xF9": "\u7C3F"
};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
      return test2[n];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
var objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};
var phoneticSymbol = {
  "\u0101": "a1",
  "\xE1": "a2",
  "\u01CE": "a3",
  "\xE0": "a4",
  "\u0113": "e1",
  "\xE9": "e2",
  "\u011B": "e3",
  "\xE8": "e4",
  "\u014D": "o1",
  "\xF3": "o2",
  "\u01D2": "o3",
  "\xF2": "o4",
  "\u012B": "i1",
  "\xED": "i2",
  "\u01D0": "i3",
  "\xEC": "i4",
  "\u016B": "u1",
  "\xFA": "u2",
  "\u01D4": "u3",
  "\xF9": "u4",
  "\xFC": "v0",
  "\u01D8": "v2",
  "\u01DA": "v3",
  "\u01DC": "v4",
  "\u0144": "n2",
  "\u0148": "n3",
  "\uE7C7": "m2"
};
const assign = objectAssign;
const PINYIN_STYLE = {
  NORMAL: 0,
  TONE: 1,
  TONE2: 2,
  TO3NE: 5,
  INITIALS: 3,
  FIRST_LETTER: 4
};
const DEFAULT_OPTIONS = {
  style: PINYIN_STYLE.TONE,
  segment: false,
  heteronym: false
};
const INITIALS = "b,p,m,f,d,t,n,l,g,k,h,j,q,x,r,zh,ch,sh,z,c,s".split(",");
const PHONETIC_SYMBOL = phoneticSymbol;
const RE_PHONETIC_SYMBOL = new RegExp("([" + Object.keys(PHONETIC_SYMBOL).join("") + "])", "g");
const RE_TONE2 = /([aeoiuvnm])([0-4])$/;
function initials(pinyin2) {
  for (let i = 0, l = INITIALS.length; i < l; i++) {
    if (pinyin2.indexOf(INITIALS[i]) === 0) {
      return INITIALS[i];
    }
  }
  return "";
}
class Pinyin$1 {
  constructor(dict) {
    this._dict = dict;
  }
  convert(hans, options) {
    if (typeof hans !== "string") {
      return [];
    }
    options = assign({}, DEFAULT_OPTIONS, options);
    let pys = [];
    let nohans = "";
    for (let i = 0, firstCharCode, words, l = hans.length; i < l; i++) {
      words = hans[i];
      firstCharCode = words.charCodeAt(0);
      if (this._dict[firstCharCode]) {
        if (nohans.length > 0) {
          pys.push([nohans]);
          nohans = "";
        }
        pys.push(this.single_pinyin(words, options));
      } else {
        nohans += words;
      }
    }
    if (nohans.length > 0) {
      pys.push([nohans]);
      nohans = "";
    }
    return pys;
  }
  single_pinyin(han, options) {
    if (typeof han !== "string") {
      return [];
    }
    if (han.length !== 1) {
      return this.single_pinyin(han.charAt(0), options);
    }
    let hanCode = han.charCodeAt(0);
    if (!this._dict[hanCode]) {
      return [han];
    }
    let pys = this._dict[hanCode].split(",");
    if (!options.heteronym) {
      return [Pinyin$1.toFixed(pys[0], options.style)];
    }
    let py_cached = {};
    let pinyins = [];
    for (let i = 0, py, l = pys.length; i < l; i++) {
      py = Pinyin$1.toFixed(pys[i], options.style);
      if (py_cached.hasOwnProperty(py)) {
        continue;
      }
      py_cached[py] = py;
      pinyins.push(py);
    }
    return pinyins;
  }
  static toFixed(pinyin2, style) {
    let tone = "";
    let first_letter;
    let py;
    switch (style) {
      case PINYIN_STYLE.INITIALS:
        return initials(pinyin2);
      case PINYIN_STYLE.FIRST_LETTER:
        first_letter = pinyin2.charAt(0);
        if (PHONETIC_SYMBOL.hasOwnProperty(first_letter)) {
          first_letter = PHONETIC_SYMBOL[first_letter].charAt(0);
        }
        return first_letter;
      case PINYIN_STYLE.NORMAL:
        return pinyin2.replace(RE_PHONETIC_SYMBOL, function($0, $1_phonetic) {
          return PHONETIC_SYMBOL[$1_phonetic].replace(RE_TONE2, "$1");
        });
      case PINYIN_STYLE.TO3NE:
        return pinyin2.replace(RE_PHONETIC_SYMBOL, function($0, $1_phonetic) {
          return PHONETIC_SYMBOL[$1_phonetic];
        });
      case PINYIN_STYLE.TONE2:
        py = pinyin2.replace(RE_PHONETIC_SYMBOL, function($0, $1) {
          tone = PHONETIC_SYMBOL[$1].replace(RE_TONE2, "$2");
          return PHONETIC_SYMBOL[$1].replace(RE_TONE2, "$1");
        });
        return py + tone;
      case PINYIN_STYLE.TONE:
      default:
        return pinyin2;
    }
  }
  compare(hanA, hanB) {
    const pinyinA = this.convert(hanA, DEFAULT_OPTIONS);
    const pinyinB = this.convert(hanB, DEFAULT_OPTIONS);
    return String(pinyinA).localeCompare(String(pinyinB));
  }
  static get STYLE_NORMAL() {
    return PINYIN_STYLE.NORMAL;
  }
  static get STYLE_TONE() {
    return PINYIN_STYLE.TONE;
  }
  static get STYLE_TONE2() {
    return PINYIN_STYLE.TONE2;
  }
  static get STYLE_TO3NE() {
    return PINYIN_STYLE.TO3NE;
  }
  static get STYLE_INITIALS() {
    return PINYIN_STYLE.INITIALS;
  }
  static get STYLE_FIRST_LETTER() {
    return PINYIN_STYLE.FIRST_LETTER;
  }
  static get DEFAULT_OPTIONS() {
    return DEFAULT_OPTIONS;
  }
}
var pinyin$2 = Pinyin$1;
function buildPinyinCache(dict_combo) {
  let hans;
  let uncomboed = {};
  for (let py in dict_combo) {
    hans = dict_combo[py];
    for (let i = 0, han, l = hans.length; i < l; i++) {
      han = hans.charCodeAt(i);
      if (!uncomboed.hasOwnProperty(han)) {
        uncomboed[han] = py;
      } else {
        uncomboed[han] += "," + py;
      }
    }
  }
  return uncomboed;
}
const PINYIN_DICT = buildPinyinCache(dictZiWeb);
const Pinyin = pinyin$2;
const pinyin = new Pinyin(PINYIN_DICT);
webPinyin.exports = pinyin.convert.bind(pinyin);
webPinyin.exports.compare = pinyin.compare.bind(pinyin);
webPinyin.exports.STYLE_NORMAL = Pinyin.STYLE_NORMAL;
webPinyin.exports.STYLE_TONE = Pinyin.STYLE_TONE;
webPinyin.exports.STYLE_TONE2 = Pinyin.STYLE_TONE2;
webPinyin.exports.STYLE_TO3NE = Pinyin.STYLE_TO3NE;
webPinyin.exports.STYLE_INITIALS = Pinyin.STYLE_INITIALS;
webPinyin.exports.STYLE_FIRST_LETTER = Pinyin.STYLE_FIRST_LETTER;
var pinyin$1 = webPinyin.exports;
const calendar = {
  lunarInfo: [
    19416,
    19168,
    42352,
    21717,
    53856,
    55632,
    91476,
    22176,
    39632,
    21970,
    19168,
    42422,
    42192,
    53840,
    119381,
    46400,
    54944,
    44450,
    38320,
    84343,
    18800,
    42160,
    46261,
    27216,
    27968,
    109396,
    11104,
    38256,
    21234,
    18800,
    25958,
    54432,
    59984,
    92821,
    23248,
    11104,
    100067,
    37600,
    116951,
    51536,
    54432,
    120998,
    46416,
    22176,
    107956,
    9680,
    37584,
    53938,
    43344,
    46423,
    27808,
    46416,
    86869,
    19872,
    42416,
    83315,
    21168,
    43432,
    59728,
    27296,
    44710,
    43856,
    19296,
    43748,
    42352,
    21088,
    62051,
    55632,
    23383,
    22176,
    38608,
    19925,
    19152,
    42192,
    54484,
    53840,
    54616,
    46400,
    46752,
    103846,
    38320,
    18864,
    43380,
    42160,
    45690,
    27216,
    27968,
    44870,
    43872,
    38256,
    19189,
    18800,
    25776,
    29859,
    59984,
    27480,
    23232,
    43872,
    38613,
    37600,
    51552,
    55636,
    54432,
    55888,
    30034,
    22176,
    43959,
    9680,
    37584,
    51893,
    43344,
    46240,
    47780,
    44368,
    21977,
    19360,
    42416,
    86390,
    21168,
    43312,
    31060,
    27296,
    44368,
    23378,
    19296,
    42726,
    42208,
    53856,
    60005,
    54576,
    23200,
    30371,
    38608,
    19195,
    19152,
    42192,
    118966,
    53840,
    54560,
    56645,
    46496,
    22224,
    21938,
    18864,
    42359,
    42160,
    43600,
    111189,
    27936,
    44448,
    84835,
    37744,
    18936,
    18800,
    25776,
    92326,
    59984,
    27424,
    108228,
    43744,
    37600,
    53987,
    51552,
    54615,
    54432,
    55888,
    23893,
    22176,
    42704,
    21972,
    21200,
    43448,
    43344,
    46240,
    46758,
    44368,
    21920,
    43940,
    42416,
    21168,
    45683,
    26928,
    29495,
    27296,
    44368,
    84821,
    19296,
    42352,
    21732,
    53600,
    59752,
    54560,
    55968,
    92838,
    22224,
    19168,
    43476,
    41680,
    53584,
    62034,
    54560
  ],
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],
  Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],
  Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],
  festival: {
    "1-1": { title: "\u5143\u65E6\u8282" },
    "2-14": { title: "\u60C5\u4EBA\u8282" },
    "5-1": { title: "\u52B3\u52A8\u8282" },
    "5-4": { title: "\u9752\u5E74\u8282" },
    "6-1": { title: "\u513F\u7AE5\u8282" },
    "9-10": { title: "\u6559\u5E08\u8282" },
    "10-1": { title: "\u56FD\u5E86\u8282" },
    "12-25": { title: "\u5723\u8BDE\u8282" },
    "3-8": { title: "\u5987\u5973\u8282" },
    "3-12": { title: "\u690D\u6811\u8282" },
    "4-1": { title: "\u611A\u4EBA\u8282" },
    "5-12": { title: "\u62A4\u58EB\u8282" },
    "7-1": { title: "\u5EFA\u515A\u8282" },
    "8-1": { title: "\u5EFA\u519B\u8282" },
    "12-24": { title: "\u5E73\u5B89\u591C" }
  },
  lFestival: {
    "12-30": { title: "\u9664\u5915" },
    "1-1": { title: "\u6625\u8282" },
    "1-15": { title: "\u5143\u5BB5\u8282" },
    "2-2": { title: "\u9F99\u62AC\u5934" },
    "5-5": { title: "\u7AEF\u5348\u8282" },
    "7-7": { title: "\u4E03\u5915\u8282" },
    "7-15": { title: "\u4E2D\u5143\u8282" },
    "8-15": { title: "\u4E2D\u79CB\u8282" },
    "9-9": { title: "\u91CD\u9633\u8282" },
    "10-1": { title: "\u5BD2\u8863\u8282" },
    "10-15": { title: "\u4E0B\u5143\u8282" },
    "12-8": { title: "\u814A\u516B\u8282" },
    "12-23": { title: "\u5317\u65B9\u5C0F\u5E74" },
    "12-24": { title: "\u5357\u65B9\u5C0F\u5E74" }
  },
  getFestival() {
    return this.festival;
  },
  getLunarFestival() {
    return this.lFestival;
  },
  setFestival(param = {}) {
    this.festival = param;
  },
  setLunarFestival(param = {}) {
    this.lFestival = param;
  },
  solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],
  sTermInfo: [
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c3598082c95f8c965cc920f",
    "97bd0b06bdb0722c965ce1cfcc920f",
    "b027097bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd0b06bdb0722c965ce1cfcc920f",
    "b027097bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd0b06bdb0722c965ce1cfcc920f",
    "b027097bd097c36b0b6fc9274c91aa",
    "9778397bd19801ec9210c965cc920e",
    "97b6b97bd19801ec95f8c965cc920f",
    "97bd09801d98082c95f8e1cfcc920f",
    "97bd097bd097c36b0b6fc9210c8dc2",
    "9778397bd197c36c9210c9274c91aa",
    "97b6b97bd19801ec95f8c965cc920e",
    "97bd09801d98082c95f8e1cfcc920f",
    "97bd097bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c91aa",
    "97b6b97bd19801ec95f8c965cc920e",
    "97bcf97c3598082c95f8e1cfcc920f",
    "97bd097bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c3598082c95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c3598082c95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd097bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf97c359801ec95f8c965cc920f",
    "97bd097bd07f595b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9210c8dc2",
    "9778397bd19801ec9210c9274c920e",
    "97b6b97bd19801ec95f8c965cc920f",
    "97bd07f5307f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c920e",
    "97b6b97bd19801ec95f8c965cc920f",
    "97bd07f5307f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bd07f1487f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c965cc920e",
    "97bcf7f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b97bd19801ec9210c9274c920e",
    "97bcf7f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c91aa",
    "97b6b97bd197c36c9210c9274c920e",
    "97bcf7f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36c9210c9274c920e",
    "97b6b7f0e47f531b0723b0b6fb0722",
    "7f0e37f5307f595b0b0bc920fb0722",
    "7f0e397bd097c36b0b6fc9210c8dc2",
    "9778397bd097c36b0b70c9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e37f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc9210c8dc2",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9274c91aa",
    "97b6b7f0e47f531b0723b0787b0721",
    "7f0e27f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c91aa",
    "97b6b7f0e47f149b0723b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "9778397bd097c36b0b6fc9210c8dc2",
    "977837f0e37f149b0723b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e37f5307f595b0b0bc920fb0722",
    "7f0e397bd097c35b0b6fc9210c8dc2",
    "977837f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e37f1487f595b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc9210c8dc2",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd097c35b0b6fc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14998082b0787b06bd",
    "7f07e7f0e47f149b0723b0787b0721",
    "7f0e27f0e47f531b0b0bb0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14998082b0723b06bd",
    "7f07e7f0e37f149b0723b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e397bd07f595b0b0bc920fb0722",
    "977837f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e37f1487f595b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e37f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e37f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e37f14898082b072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f149b0723b0787b0721",
    "7f0e27f1487f531b0b0bb0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14998082b0723b06bd",
    "7f07e7f0e47f149b0723b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14998082b0723b06bd",
    "7f07e7f0e37f14998083b0787b0721",
    "7f0e27f0e47f531b0723b0b6fb0722",
    "7f0e37f0e366aa89801eb072297c35",
    "7ec967f0e37f14898082b0723b02d5",
    "7f07e7f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e36665b66aa89801e9808297c35",
    "665f67f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b0721",
    "7f07e7f0e47f531b0723b0b6fb0722",
    "7f0e36665b66a449801e9808297c35",
    "665f67f0e37f14898082b0723b02d5",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e36665b66a449801e9808297c35",
    "665f67f0e37f14898082b072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e26665b66a449801e9808297c35",
    "665f67f0e37f1489801eb072297c35",
    "7ec967f0e37f14998082b0787b06bd",
    "7f07e7f0e47f531b0723b0b6fb0721",
    "7f0e27f1487f531b0b0bb0b6fb0722"
  ],
  nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],
  nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],
  nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],
  lYearDays: function(y) {
    let i, sum = 348;
    for (i = 32768; i > 8; i >>= 1) {
      sum += this.lunarInfo[y - 1900] & i ? 1 : 0;
    }
    return sum + this.leapDays(y);
  },
  leapMonth: function(y) {
    return this.lunarInfo[y - 1900] & 15;
  },
  leapDays: function(y) {
    if (this.leapMonth(y)) {
      return this.lunarInfo[y - 1900] & 65536 ? 30 : 29;
    }
    return 0;
  },
  monthDays: function(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    }
    return this.lunarInfo[y - 1900] & 65536 >> m ? 30 : 29;
  },
  solarDays: function(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    }
    const ms = m - 1;
    if (ms === 1) {
      return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0 ? 29 : 28;
    } else {
      return this.solarMonth[ms];
    }
  },
  toGanZhiYear: function(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey === 0)
      ganKey = 10;
    if (zhiKey === 0)
      zhiKey = 12;
    return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
  },
  toAstro: function(cMonth, cDay) {
    const s = "\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF";
    const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5EA7";
  },
  toGanZhi: function(offset2) {
    return this.Gan[offset2 % 10] + this.Zhi[offset2 % 12];
  },
  getTerm: function(y, n) {
    if (y < 1900 || y > 2100 || n < 1 || n > 24) {
      return -1;
    }
    const _table = this.sTermInfo[y - 1900];
    const _calcDay = [];
    for (let index2 = 0; index2 < _table.length; index2 += 5) {
      const chunk = parseInt("0x" + _table.substr(index2, 5)).toString();
      _calcDay.push(chunk[0], chunk.substr(1, 2), chunk[3], chunk.substr(4, 2));
    }
    return parseInt(_calcDay[n - 1]);
  },
  toChinaMonth: function(m) {
    if (m > 12 || m < 1) {
      return -1;
    }
    let s = this.nStr3[m - 1];
    s += "\u6708";
    return s;
  },
  toChinaDay: function(d) {
    let s;
    switch (d) {
      case 10:
        s = "\u521D\u5341";
        break;
      case 20:
        s = "\u4E8C\u5341";
        break;
      case 30:
        s = "\u4E09\u5341";
        break;
      default:
        s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];
    }
    return s;
  },
  getAnimal: function(y) {
    return this.Animals[(y - 4) % 12];
  },
  solar2lunar: function(yPara, mPara, dPara) {
    let y = parseInt(yPara);
    let m = parseInt(mPara);
    let d = parseInt(dPara);
    if (y < 1900 || y > 2100) {
      return -1;
    }
    if (y === 1900 && m === 1 && d < 31) {
      return -1;
    }
    let objDate;
    if (!y) {
      objDate = new Date();
    } else {
      objDate = new Date(y, parseInt(m) - 1, d);
    }
    let i, leap = 0, temp = 0;
    y = objDate.getFullYear();
    m = objDate.getMonth() + 1;
    d = objDate.getDate();
    let offset2 = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 864e5;
    for (i = 1900; i < 2101 && offset2 > 0; i++) {
      temp = this.lYearDays(i);
      offset2 -= temp;
    }
    if (offset2 < 0) {
      offset2 += temp;
      i--;
    }
    let isTodayObj = new Date(), isToday = false;
    if (isTodayObj.getFullYear() === y && isTodayObj.getMonth() + 1 === m && isTodayObj.getDate() === d) {
      isToday = true;
    }
    let nWeek = objDate.getDay(), cWeek = this.nStr1[nWeek];
    if (nWeek === 0) {
      nWeek = 7;
    }
    const year = i;
    leap = this.leapMonth(i);
    let isLeap = false;
    for (i = 1; i < 13 && offset2 > 0; i++) {
      if (leap > 0 && i === leap + 1 && isLeap === false) {
        --i;
        isLeap = true;
        temp = this.leapDays(year);
      } else {
        temp = this.monthDays(year, i);
      }
      if (isLeap === true && i === leap + 1) {
        isLeap = false;
      }
      offset2 -= temp;
    }
    if (offset2 === 0 && leap > 0 && i === leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    }
    if (offset2 < 0) {
      offset2 += temp;
      --i;
    }
    const month = i;
    const day = offset2 + 1;
    const sm = m - 1;
    const gzY = this.toGanZhiYear(year);
    const firstNode = this.getTerm(y, m * 2 - 1);
    const secondNode = this.getTerm(y, m * 2);
    let gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
    }
    let isTerm = false;
    let Term = null;
    if (firstNode === d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 2];
    }
    if (secondNode === d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 1];
    }
    const dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10;
    const gzD = this.toGanZhi(dayCyclical + d - 1);
    const astro = this.toAstro(m, d);
    const solarDate = y + "-" + m + "-" + d;
    const lunarDate = year + "-" + month + "-" + day;
    const festival = this.festival;
    const lFestival = this.lFestival;
    const festivalDate = m + "-" + d;
    let lunarFestivalDate = month + "-" + day;
    if (month === 12 && day === 29 && this.monthDays(year, month) === 29) {
      lunarFestivalDate = "12-30";
    }
    return {
      date: solarDate,
      lunarDate,
      festival: festival[festivalDate] ? festival[festivalDate].title : null,
      lunarFestival: lFestival[lunarFestivalDate] ? lFestival[lunarFestivalDate].title : null,
      "lYear": year,
      "lMonth": month,
      "lDay": day,
      "Animal": this.getAnimal(year),
      "IMonthCn": (isLeap ? "\u95F0" : "") + this.toChinaMonth(month),
      "IDayCn": this.toChinaDay(day),
      "cYear": y,
      "cMonth": m,
      "cDay": d,
      "gzYear": gzY,
      "gzMonth": gzM,
      "gzDay": gzD,
      "isToday": isToday,
      "isLeap": isLeap,
      "nWeek": nWeek,
      "ncWeek": "\u661F\u671F" + cWeek,
      "isTerm": isTerm,
      "Term": Term,
      "astro": astro
    };
  },
  lunar2solar: function(y, m, d, isLeapMonth) {
    y = parseInt(y);
    m = parseInt(m);
    d = parseInt(d);
    isLeapMonth = !!isLeapMonth;
    const leapMonth = this.leapMonth(y);
    this.leapDays(y);
    if (isLeapMonth && leapMonth !== m) {
      return -1;
    }
    if (y === 2100 && m === 12 && d > 1 || y === 1900 && m === 1 && d < 31) {
      return -1;
    }
    const day = this.monthDays(y, m);
    let _day = day;
    if (isLeapMonth) {
      _day = this.leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) {
      return -1;
    }
    let offset2 = 0;
    let i;
    for (i = 1900; i < y; i++) {
      offset2 += this.lYearDays(i);
    }
    let leap = 0, isAdd = false;
    for (i = 1; i < m; i++) {
      leap = this.leapMonth(y);
      if (!isAdd) {
        if (leap <= i && leap > 0) {
          offset2 += this.leapDays(y);
          isAdd = true;
        }
      }
      offset2 += this.monthDays(y, i);
    }
    if (isLeapMonth) {
      offset2 += day;
    }
    const strap = Date.UTC(1900, 1, 30, 0, 0, 0);
    const calObj = new Date((offset2 + d - 31) * 864e5 + strap);
    const cY = calObj.getUTCFullYear();
    const cM = calObj.getUTCMonth() + 1;
    const cD = calObj.getUTCDate();
    return this.solar2lunar(cY, cM, cD);
  }
};
var Detail_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$4 = { class: "sidebar-box" };
const _hoisted_2$4 = { class: "con" };
const _hoisted_3$3 = { class: "default-content" };
const _sfc_main$4 = {
  setup(__props) {
    const { useLayout } = usePageData().value.frontmatter || {};
    usePageData().value.frontmatter || {};
    console.log(usePageData().value);
    console.log(dayjs(usePageData().value.frontmatter.date).format("YYYY-MM-DD").split("-"));
    const [y, m, d] = dayjs(usePageData().value.frontmatter.date).format("YYYY-MM-DD").split("-");
    console.log(calendar.solar2lunar(y, m, d));
    onMounted(() => {
      Array.from(document.querySelectorAll(".content")).map((v) => {
        let py = pinyin$1(v.innerText.replace("#", ""), {
          style: pinyin$1.STYLE_NORMAL
        }).join(" ");
        v.setAttribute("pinyin", py);
      });
      Array.from(document.querySelectorAll(".default-content img")).map((v) => {
        v.onload = (res) => {
          console.log(v.height / 30);
          v.height = parseInt(v.height / 30) * 30;
        };
      });
    });
    return (_ctx, _cache) => {
      const _component_Content = resolveComponent("Content");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$4, [
          createBaseVNode("div", _hoisted_2$4, [
            createVNode(_sfc_main$5)
          ])
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["md-body sino sino-kai", unref(useLayout)])
        }, [
          createBaseVNode("div", _hoisted_3$3, [
            createVNode(_component_Content)
          ])
        ], 2)
      ], 64);
    };
  }
};
const themeData = ref(themeData$2);
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updateThemeData = (data) => {
    themeData.value = data;
  };
}
var NavBar_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$3 = { class: "header" };
const _hoisted_2$3 = { class: "header-main" };
const _hoisted_3$2 = /* @__PURE__ */ createBaseVNode("div", { class: "logo" }, "Artiely'Blog", -1);
const _hoisted_4$1 = { class: "nav" };
const _hoisted_5 = ["href"];
const _sfc_main$3 = {
  setup(__props) {
    const navBar = [{ "text": "Home", "link": "/" }, { "text": "Foo", "link": "/foo" }, { "text": "Timeline", "link": "/timeline" }];
    const path = ref();
    const getPath = (link) => {
      if (!link || !path.value)
        return;
      return path.value == link || path.value == `${link}/` ? "active" : "";
    };
    onMounted(() => {
      path.value = window.location.pathname;
      console.log("\u{1F680} ~ file: NavBar.vue ~ line 23 ~ onMounted ~ path", path);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("header", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$3, [
          _hoisted_3$2,
          createBaseVNode("nav", _hoisted_4$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(navBar), (item) => {
              return openBlock(), createElementBlock("a", {
                href: item.link,
                class: normalizeClass([getPath(item.link), "link"])
              }, toDisplayString(item.text), 11, _hoisted_5);
            }), 256))
          ])
        ])
      ]);
    };
  }
};
var Footer_vue_vue_type_style_index_0_lang = "";
const _sfc_main$2 = {};
const _hoisted_1$2 = { class: "footer" };
const _hoisted_2$2 = /* @__PURE__ */ createTextVNode(" powered by ");
const _hoisted_3$1 = /* @__PURE__ */ createBaseVNode("a", { href: "https://github.com/artiely" }, " Artiely", -1);
const _hoisted_4 = [
  _hoisted_2$2,
  _hoisted_3$1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("footer", _hoisted_1$2, _hoisted_4);
}
var Footer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render]]);
var Layout_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$1 = { class: "dog" };
const _hoisted_2$1 = { class: "main" };
const _sfc_main$1 = {
  setup(__props) {
    let dynamic = usePageData().value.path == "/" ? _sfc_main$b : _sfc_main$4;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        renderSlot(_ctx.$slots, "header", {}, () => [
          createVNode(_sfc_main$3)
        ]),
        createBaseVNode("div", _hoisted_2$1, [
          renderSlot(_ctx.$slots, "main", {}, () => [
            (openBlock(), createBlock(resolveDynamicComponent(unref(dynamic))))
          ])
        ]),
        renderSlot(_ctx.$slots, "footer", {}, () => [
          createVNode(Footer)
        ]),
        createVNode(_sfc_main$a)
      ]);
    };
  }
};
var Layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$1
});
const _hoisted_1 = /* @__PURE__ */ createTextVNode("header");
const _hoisted_2 = /* @__PURE__ */ createTextVNode("main");
const _hoisted_3 = /* @__PURE__ */ createTextVNode("footer");
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$1, null, {
        header: withCtx(() => [
          _hoisted_1
        ]),
        main: withCtx(() => [
          _hoisted_2
        ]),
        footer: withCtx(() => [
          _hoisted_3
        ]),
        _: 1
      });
    };
  }
};
var clientAppEnhance5 = defineClientAppEnhance$1(({ app }) => {
  app.component("CustomLayout", CustomLayout);
  app.component("CustomHome", _sfc_main);
});
const clientAppEnhances = [
  clientAppEnhance0,
  clientAppEnhance1,
  clientAppEnhance2,
  clientAppEnhance3,
  clientAppEnhance4,
  clientAppEnhance5
];
const historyCreator = createWebHistory;
const createVueRouter = () => {
  const router = createRouter({
    history: historyCreator(removeEndingSlash$1(siteData$1.value.base)),
    routes: pagesRoutes,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition)
        return savedPosition;
      if (to.hash)
        return { el: to.hash };
      return { top: 0 };
    }
  });
  router.beforeResolve(async (to, from) => {
    var _a2;
    if (to.path !== from.path || from === START_LOCATION_NORMALIZED) {
      [pageData$1.value] = await Promise.all([
        resolvers$1.resolvePageData(to.name),
        (_a2 = pagesComponents[to.name]) === null || _a2 === void 0 ? void 0 : _a2.__asyncLoader()
      ]);
    }
  });
  return router;
};
const setupGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly$1);
  app.component("Content", Content$1);
};
const setupGlobalComputed = (app, router) => {
  const routeLocale = computed(() => resolvers$1.resolveRouteLocale(siteData$1.value.locales, router.currentRoute.value.path));
  const siteLocaleData = computed(() => resolvers$1.resolveSiteLocaleData(siteData$1.value, routeLocale.value));
  const pageFrontmatter = computed(() => resolvers$1.resolvePageFrontmatter(pageData$1.value));
  const pageHeadTitle = computed(() => resolvers$1.resolvePageHeadTitle(pageData$1.value, siteLocaleData.value));
  const pageHead = computed(() => resolvers$1.resolvePageHead(pageHeadTitle.value, pageFrontmatter.value, siteLocaleData.value));
  const pageLang = computed(() => resolvers$1.resolvePageLang(pageData$1.value));
  app.provide(routeLocaleSymbol$1, routeLocale);
  app.provide(siteLocaleDataSymbol$1, siteLocaleData);
  app.provide(pageFrontmatterSymbol$1, pageFrontmatter);
  app.provide(pageHeadTitleSymbol$1, pageHeadTitle);
  app.provide(pageHeadSymbol$1, pageHead);
  app.provide(pageLangSymbol$1, pageLang);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $head: { get: () => pageHead.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData$1.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData$1.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase$1 }
  });
  return {
    pageData: pageData$1,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    routeLocale,
    siteData: siteData$1,
    siteLocaleData
  };
};
const setupUpdateHead = () => {
  const route = useRoute();
  const head = usePageHead$1();
  const lang = usePageLang$1();
  const headTags = ref([]);
  const loadHead = () => {
    head.value.forEach((item) => {
      const tag = queryHeadTag(item);
      if (tag) {
        headTags.value.push(tag);
      }
    });
  };
  const updateHead = () => {
    document.documentElement.lang = lang.value;
    headTags.value.forEach((item) => {
      if (item.parentNode === document.head) {
        document.head.removeChild(item);
      }
    });
    headTags.value.splice(0, headTags.value.length);
    head.value.forEach((item) => {
      const tag = createHeadTag(item);
      if (tag !== null) {
        document.head.appendChild(tag);
        headTags.value.push(tag);
      }
    });
  };
  provide(updateHeadSymbol$1, updateHead);
  onMounted(() => {
    loadHead();
    updateHead();
    watch(() => route.path, () => updateHead());
  });
};
const queryHeadTag = ([tagName, attrs, content = ""]) => {
  const attrsSelector = Object.entries(attrs).map(([key, value]) => {
    if (isString$3(value)) {
      return `[${key}="${value}"]`;
    }
    if (value === true) {
      return `[${key}]`;
    }
    return "";
  }).join("");
  const selector3 = `head > ${tagName}${attrsSelector}`;
  const tags = Array.from(document.querySelectorAll(selector3));
  const matchedTag = tags.find((item) => item.innerText === content);
  return matchedTag || null;
};
const createHeadTag = ([tagName, attrs, content]) => {
  if (!isString$3(tagName)) {
    return null;
  }
  const tag = document.createElement(tagName);
  if (isPlainObject$1(attrs)) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (isString$3(value)) {
        tag.setAttribute(key, value);
      } else if (value === true) {
        tag.setAttribute(key, "");
      }
    });
  }
  if (isString$3(content)) {
    tag.appendChild(document.createTextNode(content));
  }
  return tag;
};
const appCreator = createSSRApp;
const createVueApp = async () => {
  const app = appCreator({
    name: "VuepressApp",
    setup() {
      setupUpdateHead();
      for (const clientAppSetup of clientAppSetups) {
        clientAppSetup();
      }
      return () => [
        h(RouterView),
        ...clientAppRootComponents.map((comp) => h(comp))
      ];
    }
  });
  const router = createVueRouter();
  setupGlobalComponents(app);
  setupGlobalComputed(app, router);
  for (const clientAppEnhance of clientAppEnhances) {
    await clientAppEnhance({ app, router, siteData: siteData$1 });
  }
  app.use(router);
  return {
    app,
    router
  };
};
{
  createVueApp().then(({ app, router }) => {
    router.isReady().then(() => {
      app.mount("#app");
    });
  });
}
export { Fragment as F, _export_sfc as _, createVNode as a, createStaticVNode as b, createElementBlock as c, createVueApp, createBaseVNode as d, createTextVNode as e, defineClientAppEnhance as f, openBlock as o, resolveComponent as r, toDisplayString as t, unref as u, withCtx as w };

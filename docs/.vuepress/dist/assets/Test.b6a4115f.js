import { o as openBlock, c as createElementBlock, t as toDisplayString, e as unref } from "./app.6666b12e.js";
const _hoisted_1 = { class: "p" };
const _sfc_main = {
  setup(__props) {
    const nav = [{ "text": "Home", "link": "/" }, { "text": "Foo", "link": "/foo" }];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("p", _hoisted_1, toDisplayString(unref(nav)), 1);
    };
  }
};
export { _sfc_main as default };

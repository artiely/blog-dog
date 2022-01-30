import { o as openBlock, c as createElementBlock, t as toDisplayString, e as unref } from "./app.eece1bb2.js";
const _hoisted_1 = { class: "p" };
const _sfc_main = {
  setup(__props) {
    const nav = [{ "text": "Home", "link": "/" }, { "text": "Foo", "link": "/foo" }, { "text": "Timeline", "link": "/timeline" }];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("p", _hoisted_1, toDisplayString(unref(nav)), 1);
    };
  }
};
export { _sfc_main as default };

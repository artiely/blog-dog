import { o as openBlock, c as createElementBlock, t as toDisplayString, u as unref } from "./app.5c29752a.js";
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

import { f as ref, o as openBlock, c as createElementBlock, a as createBaseVNode, n as normalizeClass, u as unref, g as normalizeStyle, F as Fragment, h as renderList, t as toDisplayString, i as createCommentVNode, e as createVNode, p as pushScopeId, j as popScopeId, k as usePageData, r as resolveComponent, b as createTextVNode } from "./app.c6e2629a.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.21dcd24c.js";
var Cover_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$2 = { class: "img-box" };
const _hoisted_2$2 = ["src"];
const _sfc_main$2 = {
  props: {
    item: Object
  },
  setup(__props) {
    const hexToRgba = (hex, opacity) => {
      return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
    };
    let isLoaded = ref(false);
    const imgLoaded = () => {
      console.log("\u52A0\u8F7D\u5B8C\u6BD5");
      isLoaded.value = true;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$2, [
          createBaseVNode("img", {
            src: __props.item.frontmatter.cover,
            onLoad: imgLoaded,
            class: "cover",
            alt: "cover"
          }, null, 40, _hoisted_2$2)
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["loading", { isLoaded: unref(isLoaded) }]),
          style: normalizeStyle({ backgroundColor: hexToRgba(`#${__props.item.frontmatter.primary}`, 0.8) })
        }, null, 6)
      ], 64);
    };
  }
};
var Cover = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-21fdb6bb"]]);
var Article_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-8b7c29c4"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "article-wrapper" };
const _hoisted_2$1 = { class: "article" };
const _hoisted_3$1 = {
  key: 0,
  class: "poster-wrapper"
};
const _hoisted_4 = {
  key: 0,
  class: "category"
};
const _hoisted_5 = {
  key: 1,
  class: "article-info"
};
const _hoisted_6 = { class: "article-title" };
const _hoisted_7 = ["href"];
const _hoisted_8 = { class: "article-tags" };
const _hoisted_9 = { class: "article-con" };
const _hoisted_10 = { class: "article-desc" };
const _hoisted_11 = { class: "article-meta" };
const _hoisted_12 = { class: "more" };
const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", null, "\u9605\u8BFB\u5168\u6587->", -1));
const _sfc_main$1 = {
  setup(__props) {
    const post = [{ "text": "power by artiely", "children": [{ "text": "artiely", "link": "/post/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": ["electron"], "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "password": false, "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\n\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\n\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "text": "2 min read", "words": 230 }, "id": "4147cd66-d3a9-4cdf-8010-65123f44e560" }, { "text": "artiely", "link": "/post/2020-3-16-vscode-plugin", "frontmatter": { "primary": "7abbe3", "secondary": "85441c", "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528", "tag": ["vscode"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316111222.png", "date": "2020-03-16", "base64": "7cbde7", "category": "Tool", "password": false, "summary": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528\nVS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\n\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033 ...", "text": "4 min read", "words": 782 }, "id": "a9b77092-88dd-4ad0-9053-e4fcf7251bcb" }, { "text": "artiely", "link": "/post/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": ["windows"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "author": "Artiely", "password": false, "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350\nwox\n\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002\nctrl+space(\u7A7A\u683C)\n\u5B98\u7F51\n![](https://gitee.com/artiely/ ...", "text": "1 min read", "words": 101 }, "id": "856ec5e0-14a0-40a8-af76-048240359ef8" }, { "text": "artiely", "link": "/post/2021/2020-3-16-chrome-plugin", "frontmatter": { "primary": "3379fb", "secondary": "cc8604", "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC", "tag": ["chrome"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316133138.png", "date": "2020-03-16", "base64": "3488fd", "category": "Plugin", "password": false, "summary": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC\n\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\n\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120 ...", "text": "4 min read", "words": 605 }, "id": "9c07a328-2149-4bdc-ab3b-66f2f9c9fec7" }], "tags": [{ "tag": "electron", "posts": [{ "text": "artiely", "link": "/post/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": ["electron"], "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "password": false, "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\n\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\n\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "text": "2 min read", "words": 230 }, "id": "4147cd66-d3a9-4cdf-8010-65123f44e560" }] }, { "tag": "vscode", "posts": [{ "text": "artiely", "link": "/post/2020-3-16-vscode-plugin", "frontmatter": { "primary": "7abbe3", "secondary": "85441c", "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528", "tag": ["vscode"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316111222.png", "date": "2020-03-16", "base64": "7cbde7", "category": "Tool", "password": false, "summary": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528\nVS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\n\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033 ...", "text": "4 min read", "words": 782 }, "id": "a9b77092-88dd-4ad0-9053-e4fcf7251bcb" }] }, { "tag": "windows", "posts": [{ "text": "artiely", "link": "/post/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": ["windows"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "author": "Artiely", "password": false, "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350\nwox\n\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002\nctrl+space(\u7A7A\u683C)\n\u5B98\u7F51\n![](https://gitee.com/artiely/ ...", "text": "1 min read", "words": 101 }, "id": "856ec5e0-14a0-40a8-af76-048240359ef8" }] }, { "tag": "chrome", "posts": [{ "text": "artiely", "link": "/post/2021/2020-3-16-chrome-plugin", "frontmatter": { "primary": "3379fb", "secondary": "cc8604", "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC", "tag": ["chrome"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316133138.png", "date": "2020-03-16", "base64": "3488fd", "category": "Plugin", "password": false, "summary": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC\n\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\n\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120 ...", "text": "4 min read", "words": 605 }, "id": "9c07a328-2149-4bdc-ab3b-66f2f9c9fec7" }] }], "timeline": [{ "date": "2020-03-18", "posts": [{ "text": "artiely", "link": "/post/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": ["electron"], "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "password": false, "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\n\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\n\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "text": "2 min read", "words": 230 }, "id": "4147cd66-d3a9-4cdf-8010-65123f44e560" }] }, { "date": "2020-03-16", "posts": [{ "text": "artiely", "link": "/post/2020-3-16-vscode-plugin", "frontmatter": { "primary": "7abbe3", "secondary": "85441c", "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528", "tag": ["vscode"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316111222.png", "date": "2020-03-16", "base64": "7cbde7", "category": "Tool", "password": false, "summary": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528\nVS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\n\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033 ...", "text": "4 min read", "words": 782 }, "id": "a9b77092-88dd-4ad0-9053-e4fcf7251bcb" }, { "text": "artiely", "link": "/post/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": ["windows"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "author": "Artiely", "password": false, "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350\nwox\n\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002\nctrl+space(\u7A7A\u683C)\n\u5B98\u7F51\n![](https://gitee.com/artiely/ ...", "text": "1 min read", "words": 101 }, "id": "856ec5e0-14a0-40a8-af76-048240359ef8" }, { "text": "artiely", "link": "/post/2021/2020-3-16-chrome-plugin", "frontmatter": { "primary": "3379fb", "secondary": "cc8604", "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC", "tag": ["chrome"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316133138.png", "date": "2020-03-16", "base64": "3488fd", "category": "Plugin", "password": false, "summary": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC\n\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\n\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120 ...", "text": "4 min read", "words": 605 }, "id": "9c07a328-2149-4bdc-ab3b-66f2f9c9fec7" }] }] }][0].children;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(post), (item) => {
          return openBlock(), createElementBlock("article", _hoisted_2$1, [
            item.frontmatter ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
              item.frontmatter.category ? (openBlock(), createElementBlock("div", _hoisted_4, [
                createBaseVNode("span", {
                  class: "category-inner",
                  style: normalizeStyle({
                    backgroundColor: `#${item.frontmatter.secondary}`,
                    color: `#${item.frontmatter.primary}`
                  })
                }, toDisplayString(item.frontmatter.category), 5)
              ])) : createCommentVNode("", true),
              createVNode(Cover, { item }, null, 8, ["item"])
            ])) : createCommentVNode("", true),
            item.frontmatter ? (openBlock(), createElementBlock("div", _hoisted_5, [
              createBaseVNode("h1", _hoisted_6, [
                createBaseVNode("a", {
                  href: item.link
                }, toDisplayString(item.frontmatter.title), 9, _hoisted_7)
              ]),
              createBaseVNode("div", _hoisted_8, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item.frontmatter.tag, (tag) => {
                  return openBlock(), createElementBlock("span", null, toDisplayString(tag), 1);
                }), 256))
              ]),
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("p", _hoisted_10, toDisplayString(item.frontmatter.summary), 1)
              ]),
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("span", null, toDisplayString(item.frontmatter.date), 1),
                createBaseVNode("span", null, toDisplayString(item.frontmatter.author), 1)
              ]),
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("span", null, toDisplayString(item.frontmatter.text), 1),
                _hoisted_13
              ])
            ])) : createCommentVNode("", true)
          ]);
        }), 256))
      ]);
    };
  }
};
var Article = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8b7c29c4"]]);
var font = "";
var Layout_vue_vue_type_style_index_0_lang = "";
console.log("123", usePageData().value);
const _sfc_main = {
  components: {
    Article
  },
  setup() {
  },
  created() {
  }
};
const _hoisted_1 = /* @__PURE__ */ createTextVNode(" Home ");
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("span", { class: "text-red-800 hover:text-primary" }, "I am a span", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("h1", { class: "palette-title" }, "\u4F60\u597D\uFF0C\u8C03\u8272\u677F\uFF01", -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Article = resolveComponent("Article");
  const _component_Content = resolveComponent("Content");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    createVNode(_component_Article),
    _hoisted_3,
    createVNode(_component_Content)
  ]);
}
var Layout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Layout as default };

"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var vueRouter = require("vue-router");
var vue = require("vue");
var nprogress$1 = require("nprogress");
var serverRenderer = require("vue/server-renderer");
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  var n = { __proto__: null, [Symbol.toStringTag]: "Module" };
  if (e) {
    Object.keys(e).forEach(function(k) {
      if (k !== "default") {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}
var nprogress__namespace = /* @__PURE__ */ _interopNamespace(nprogress$1);
const ClientOnly = vue.defineComponent({
  setup(_, ctx) {
    const isMounted = vue.ref(false);
    vue.onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a2, _b2;
      return isMounted.value ? (_b2 = (_a2 = ctx.slots).default) === null || _b2 === void 0 ? void 0 : _b2.call(_a2) : null;
    };
  }
});
const pagesComponents = {
  "v-8daa1a0e": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return index_html$5;
  })),
  "v-7446daa2": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return index_html$3;
  })),
  "v-71255a56": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _2020316VscodePlugin_html$2;
  })),
  "v-134ad0ae": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _2020316WindowsPlugin_html$2;
  })),
  "v-357580ba": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _2020318ElectronMirrorDown_html$2;
  })),
  "v-1c426dcc": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _2020316ChromePlugin_html$2;
  })),
  "v-3706649a": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _404_html$2;
  }))
};
const pagesData$1 = {
  "v-8daa1a0e": () => Promise.resolve().then(function() {
    return index_html$1;
  }).then(({ data: data2 }) => data2),
  "v-7446daa2": () => Promise.resolve().then(function() {
    return index_html;
  }).then(({ data: data2 }) => data2),
  "v-71255a56": () => Promise.resolve().then(function() {
    return _2020316VscodePlugin_html;
  }).then(({ data: data2 }) => data2),
  "v-134ad0ae": () => Promise.resolve().then(function() {
    return _2020316WindowsPlugin_html;
  }).then(({ data: data2 }) => data2),
  "v-357580ba": () => Promise.resolve().then(function() {
    return _2020318ElectronMirrorDown_html;
  }).then(({ data: data2 }) => data2),
  "v-1c426dcc": () => Promise.resolve().then(function() {
    return _2020316ChromePlugin_html;
  }).then(({ data: data2 }) => data2),
  "v-3706649a": () => Promise.resolve().then(function() {
    return _404_html;
  }).then(({ data: data2 }) => data2)
};
const pagesData = vue.ref(pagesData$1);
const pageDataEmpty = vue.readonly({
  key: "",
  path: "",
  title: "",
  lang: "",
  frontmatter: {},
  excerpt: "",
  headers: []
});
const pageData = vue.ref(pageDataEmpty);
const usePageData = () => pageData;
const resolvePageData = async (pageKey) => {
  const pageDataResolver = pagesData.value[pageKey];
  if (!pageDataResolver) {
    return pageDataEmpty;
  }
  const pageData2 = await pageDataResolver();
  return pageData2 !== null && pageData2 !== void 0 ? pageData2 : pageDataEmpty;
};
if (false) {
  __VUE_HMR_RUNTIME__.updatePageData = (data2) => {
    pagesData.value[data2.key] = () => Promise.resolve(data2);
    if (data2.key === pageData.value.key) {
      pageData.value = data2;
    }
  };
}
const pageFrontmatterSymbol = Symbol("");
const usePageFrontmatter = () => {
  const pageFrontmatter = vue.inject(pageFrontmatterSymbol);
  if (!pageFrontmatter) {
    throw new Error("usePageFrontmatter() is called without provider.");
  }
  return pageFrontmatter;
};
const resolvePageFrontmatter = (pageData2) => pageData2.frontmatter;
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
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
const resolveLocalePath = (locales, routePath) => {
  const localePaths = Object.keys(locales).sort((a, b) => {
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
const pageHeadSymbol = Symbol("");
const usePageHead = () => {
  const pageHead = vue.inject(pageHeadSymbol);
  if (!pageHead) {
    throw new Error("usePageHead() is called without provider.");
  }
  return pageHead;
};
const resolvePageHead = (headTitle, frontmatter, siteLocale) => {
  const description = isString$1(frontmatter.description) ? frontmatter.description : siteLocale.description;
  const head = [
    ...isArray(frontmatter.head) ? frontmatter.head : [],
    ...siteLocale.head,
    ["title", {}, headTitle],
    ["meta", { name: "description", content: description }]
  ];
  return dedupeHead(head);
};
const pageHeadTitleSymbol = Symbol("");
const resolvePageHeadTitle = (page, siteLocale) => `${page.title ? `${page.title} | ` : ``}${siteLocale.title}`;
const pageLangSymbol = Symbol("");
const usePageLang = () => {
  const pageLang = vue.inject(pageLangSymbol);
  if (!pageLang) {
    throw new Error("usePageLang() is called without provider.");
  }
  return pageLang;
};
const resolvePageLang = (pageData2) => pageData2.lang || "en";
const routeLocaleSymbol = Symbol("");
const resolveRouteLocale = (locales, routePath) => resolveLocalePath(locales, routePath);
const siteData$1 = {
  "base": "/",
  "lang": "zh-CN",
  "title": "\u4F60\u597D\uFF0C VuePress \uFF01",
  "description": "\u8FD9\u662F\u6211\u7684\u7B2C\u4E00\u4E2A VuePress \u7AD9\u70B9",
  "head": [],
  "locales": {}
};
const siteData = vue.ref(siteData$1);
const useSiteData = () => siteData;
if (false) {
  __VUE_HMR_RUNTIME__.updateSiteData = (data2) => {
    siteData.value = data2;
  };
}
const siteLocaleDataSymbol = Symbol("");
const resolveSiteLocaleData = (site, routeLocale) => __spreadValues(__spreadValues({}, site), site.locales[routeLocale]);
const setupUpdateHead = () => {
  vueRouter.useRoute();
  const head = usePageHead();
  const lang = usePageLang();
  {
    const ssrContext = vue.useSSRContext();
    if (ssrContext) {
      ssrContext.head = head.value;
      ssrContext.lang = lang.value;
    }
    return;
  }
};
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
    return vue.h(component);
  }
  return vue.h("div", "404 Not Found");
};
Content.displayName = "Content";
Content.props = {
  pageKey: {
    type: String,
    required: false
  }
};
const layoutComponents = {
  "404": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _404$1;
  })),
  "Layout": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Layout$1;
  })),
  "clientAppEnhanceFiles": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return clientAppEnhance$1;
  }))
};
const Vuepress = vue.defineComponent({
  name: "Vuepress",
  setup() {
    const page = usePageData();
    const layoutComponent = vue.computed(() => {
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
      return layoutComponents[layoutName] || vue.resolveComponent(layoutName, false);
    });
    return () => vue.h(layoutComponent.value);
  }
});
const defineClientAppEnhance = (clientAppEnhance4) => clientAppEnhance4;
const defineClientAppSetup = (clientAppSetup) => clientAppSetup;
const withBase = (url) => {
  if (isLinkHttp(url))
    return url;
  const base = useSiteData().value.base;
  return `${base}${removeLeadingSlash(url)}`;
};
var vars$3 = "";
var externalLinkIcon = "";
const svg = vue.h("svg", {
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
  vue.h("path", {
    fill: "currentColor",
    d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
  }),
  vue.h("polygon", {
    fill: "currentColor",
    points: "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
  })
]);
const ExternalLinkIcon = (_, { slots }) => {
  var _a2;
  return vue.h("span", [svg, (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]);
};
ExternalLinkIcon.displayName = "ExternalLinkIcon";
var clientAppEnhance0 = defineClientAppEnhance(({ app }) => {
  app.component("ExternalLinkIcon", ExternalLinkIcon);
});
var vars$2 = "";
var mediumZoom = "";
var clientAppEnhance1 = defineClientAppEnhance(({ app, router }) => {
  return;
});
const themeData$1 = {
  "post": "/Users/tanjie/Desktop/mo/vuepress-starter/docs/post",
  "logo": "https://vuejs.org/images/logo.png",
  "navbar": [
    {
      "text": "Foo",
      "link": "/foo"
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
const themeData = vue.ref(themeData$1);
const useThemeData = () => themeData;
if (false) {
  __VUE_HMR_RUNTIME__.updateThemeData = (data2) => {
    themeData.value = data2;
  };
}
const themeLocaleDataSymbol = Symbol("");
const useThemeLocaleData$1 = () => {
  const themeLocaleData = vue.inject(themeLocaleDataSymbol);
  if (!themeLocaleData) {
    throw new Error("useThemeLocaleData() is called without provider.");
  }
  return themeLocaleData;
};
const resolveThemeLocaleData = (theme, routeLocale) => {
  var _a2;
  return __spreadValues(__spreadValues({}, theme), (_a2 = theme.locales) === null || _a2 === void 0 ? void 0 : _a2[routeLocale]);
};
var clientAppEnhance2 = defineClientAppEnhance(({ app }) => {
  const themeData2 = useThemeData();
  const routeLocale = app._context.provides[routeLocaleSymbol];
  const themeLocaleData = vue.computed(() => resolveThemeLocaleData(themeData2.value, routeLocale.value));
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
const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        class: ["badge", __props.type],
        style: {
          verticalAlign: __props.vertical
        }
      }, _attrs))}>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${serverRenderer.ssrInterpolate(__props.text)}`);
      }, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/global/Badge.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
var CodeGroup = vue.defineComponent({
  name: "CodeGroup",
  setup(_, { slots }) {
    const activeIndex = vue.ref(-1);
    const tabRefs = vue.ref([]);
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
      return vue.h("div", { class: "code-group" }, [
        vue.h("div", { class: "code-group__nav" }, vue.h("ul", { class: "code-group__ul" }, items.map((vnode, i) => {
          const isActive = i === activeIndex.value;
          return vue.h("li", { class: "code-group__li" }, vue.h("button", {
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
const __default__ = vue.defineComponent({
  name: "CodeGroupItem"
});
const _sfc_main$c = /* @__PURE__ */ vue.defineComponent(__spreadProps(__spreadValues({}, __default__), {
  __ssrInlineRender: true,
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        class: ["code-group-item", { "code-group-item__active": __props.active }],
        "aria-selected": __props.active
      }, _attrs))}>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
}));
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/global/CodeGroupItem.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
function tryOnScopeDispose(fn) {
  if (vue.getCurrentScope()) {
    vue.onScopeDispose(fn);
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
  return vue.watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
function tryOnMounted(fn, sync = true) {
  if (vue.getCurrentInstance())
    vue.onMounted(fn);
  else if (sync)
    fn();
  else
    vue.nextTick(fn);
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
  const stopWatch = vue.watch(() => vue.unref(target), (el) => {
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
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  let mediaQuery;
  const matches = vue.ref(false);
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
    tryOnScopeDispose(() => {
      if ("removeEventListener" in update)
        mediaQuery.removeEventListener("change", update);
      else
        mediaQuery.removeListener(update);
    });
  });
  return matches;
}
const globalKey = "__vueuse_ssr_handlers__";
globalThis[globalKey] = globalThis[globalKey] || {};
const handlers = globalThis[globalKey];
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
  const rawInit = vue.unref(initialValue);
  const type = guessSerializerType(rawInit);
  const data2 = (shallow ? vue.shallowRef : vue.ref)(initialValue);
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
        data2.value = rawInit;
        if (writeDefaults && rawInit !== null)
          storage.setItem(key, serializer.write(rawInit));
      } else if (typeof rawValue !== "string") {
        data2.value = rawValue;
      } else {
        data2.value = serializer.read(rawValue);
      }
    } catch (e) {
      onError(e);
    }
  }
  read();
  if (window2 && listenToStorageChanges)
    useEventListener(window2, "storage", (e) => setTimeout(() => read(e), 0));
  if (storage) {
    watchWithFilter(data2, () => {
      try {
        if (data2.value == null)
          storage.removeItem(key);
        else
          storage.setItem(key, serializer.write(data2.value));
      } catch (e) {
        onError(e);
      }
    }, {
      flush,
      deep,
      eventFilter
    });
  }
  return data2;
}
function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
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
const darkModeSymbol = Symbol("");
const setupDarkMode = () => {
  const themeLocale = useThemeLocaleData();
  const isDarkPreferred = usePreferredDark();
  const darkStorage = useStorage("vuepress-color-scheme", "auto");
  const isDarkMode = vue.computed({
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
  vue.provide(darkModeSymbol, isDarkMode);
  updateHtmlDarkClass(isDarkMode);
};
const updateHtmlDarkClass = (isDarkMode) => {
  const update = (value = isDarkMode.value) => {
    const htmlEl = window === null || window === void 0 ? void 0 : window.document.querySelector("html");
    htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.toggle("dark", value);
  };
  vue.onMounted(() => {
    vue.watch(isDarkMode, update, { immediate: true });
  });
  vue.onUnmounted(() => update());
};
const useResolveRouteWithRedirect = (...args) => {
  const router = vueRouter.useRouter();
  const route = router.resolve(...args);
  const lastMatched = route.matched[route.matched.length - 1];
  if (!(lastMatched === null || lastMatched === void 0 ? void 0 : lastMatched.redirect)) {
    return route;
  }
  const { redirect } = lastMatched;
  const resolvedRedirect = isFunction(redirect) ? redirect(route) : redirect;
  const resolvedRedirectObj = isString$1(resolvedRedirect) ? { path: resolvedRedirect } : resolvedRedirect;
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
    promise = new Promise((resolve) => promiseResolve = resolve);
  },
  resolve: () => {
    promiseResolve === null || promiseResolve === void 0 ? void 0 : promiseResolve();
    promise = null;
    promiseResolve = null;
  }
};
const useScrollPromise = () => scrollPromise;
const sidebarItemsSymbol = Symbol("sidebarItems");
const setupSidebarItems = () => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter();
  const sidebarItems = vue.computed(() => resolveSidebarItems(frontmatter.value, themeLocale.value));
  vue.provide(sidebarItemsSymbol, sidebarItems);
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
  if (isArray(sidebarConfig)) {
    return resolveArraySidebarItems(sidebarConfig, sidebarDepth);
  }
  if (isPlainObject(sidebarConfig)) {
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
  const page = usePageData();
  return [
    {
      text: page.value.title,
      children: headersToSidebarItemChildren(page.value.headers, sidebarDepth)
    }
  ];
};
const resolveArraySidebarItems = (sidebarConfig, sidebarDepth) => {
  const route = vueRouter.useRoute();
  const page = usePageData();
  const handleChildItem = (item) => {
    var _a2;
    let childItem;
    if (isString$1(item)) {
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
  const route = vueRouter.useRoute();
  const sidebarPath = resolveLocalePath(sidebarConfig, route.path);
  const matchedSidebarConfig = (_a2 = sidebarConfig[sidebarPath]) !== null && _a2 !== void 0 ? _a2 : [];
  return resolveArraySidebarItems(matchedSidebarConfig, sidebarDepth);
};
const useThemeLocaleData = () => useThemeLocaleData$1();
const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const themeLocale = useThemeLocaleData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.ssrRenderComponent(vue.unref(ExternalLinkIcon), _attrs, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="sr-only"${_scopeId}>${serverRenderer.ssrInterpolate(vue.unref(themeLocale).openInNewWindow)}</span>`);
          } else {
            return [
              vue.createVNode("span", { class: "sr-only" }, vue.toDisplayString(vue.unref(themeLocale).openInNewWindow), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/global/ExternalLinkIcon.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
var index = "";
var clientAppEnhance3 = defineClientAppEnhance(({ app, router }) => {
  app.component("Badge", _sfc_main$d);
  app.component("CodeGroup", CodeGroup);
  app.component("CodeGroupItem", _sfc_main$c);
  delete app._context.components.ExternalLinkIcon;
  app.component("ExternalLinkIcon", _sfc_main$b);
  app.component("NavbarSearch", () => {
    const SearchComponent = app.component("Docsearch") || app.component("SearchBox");
    if (SearchComponent) {
      return vue.h(SearchComponent);
    }
    return null;
  });
  const scrollBehavior = router.options.scrollBehavior;
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait();
    return scrollBehavior(...args);
  };
});
const clientAppEnhances = [
  clientAppEnhance0,
  clientAppEnhance1,
  clientAppEnhance2,
  clientAppEnhance3
];
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
const BackToTop = vue.defineComponent({
  name: "BackToTop",
  setup() {
    const scrollTop = vue.ref(0);
    const show = vue.computed(() => scrollTop.value > 300);
    const onScroll = r(() => {
      scrollTop.value = getScrollTop();
    }, 100);
    vue.onMounted(() => {
      scrollTop.value = getScrollTop();
      window.addEventListener("scroll", () => onScroll());
    });
    const backToTopEl = vue.h("div", { class: "back-to-top", onClick: scrollToTop });
    return () => vue.h(vue.Transition, {
      name: "back-to-top"
    }, {
      default: () => show.value ? backToTopEl : null
    });
  }
});
const clientAppRootComponents = [
  BackToTop
];
var clientAppSetup0 = defineClientAppSetup(() => {
  return;
});
var vars = "";
var nprogress = "";
const useNprogress = () => {
  vue.onMounted(() => {
    const router = vueRouter.useRouter();
    const loadedPages = new Set();
    loadedPages.add(router.currentRoute.value.path);
    nprogress__namespace.configure({ showSpinner: false });
    router.beforeEach((to) => {
      if (!loadedPages.has(to.path)) {
        nprogress__namespace.start();
      }
    });
    router.afterEach((to) => {
      loadedPages.add(to.path);
      nprogress__namespace.done();
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
  ["v-8daa1a0e", "/", { "title": "hello world" }, ["/index.html", "/README.md"]],
  ["v-7446daa2", "/foo/", { "title": "foo" }, ["/foo/index.html", "/foo/index.md"]],
  ["v-71255a56", "/post/2020-3-16-vscode-plugin.html", { "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528" }, ["/post/2020-3-16-vscode-plugin", "/post/2020-3-16-vscode-plugin.md"]],
  ["v-134ad0ae", "/post/2020-3-16-windows-plugin.html", { "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350" }, ["/post/2020-3-16-windows-plugin", "/post/2020-3-16-windows-plugin.md"]],
  ["v-357580ba", "/post/2020-3-18-electron-mirror-down.html", { "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5" }, ["/post/2020-3-18-electron-mirror-down", "/post/2020-3-18-electron-mirror-down.md"]],
  ["v-1c426dcc", "/post/2021/2020-3-16-chrome-plugin.html", { "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC" }, ["/post/2021/2020-3-16-chrome-plugin", "/post/2021/2020-3-16-chrome-plugin.md"]],
  ["v-3706649a", "/404.html", { "title": "" }, ["/404"]]
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
const provideGlobalComputed = (app, router) => {
  const routeLocale = vue.computed(() => resolveRouteLocale(siteData.value.locales, router.currentRoute.value.path));
  const siteLocaleData = vue.computed(() => resolveSiteLocaleData(siteData.value, routeLocale.value));
  const pageFrontmatter = vue.computed(() => resolvePageFrontmatter(pageData.value));
  const pageHeadTitle = vue.computed(() => resolvePageHeadTitle(pageData.value, siteLocaleData.value));
  const pageHead = vue.computed(() => resolvePageHead(pageHeadTitle.value, pageFrontmatter.value, siteLocaleData.value));
  const pageLang = vue.computed(() => resolvePageLang(pageData.value));
  app.provide(routeLocaleSymbol, routeLocale);
  app.provide(siteLocaleDataSymbol, siteLocaleData);
  app.provide(pageFrontmatterSymbol, pageFrontmatter);
  app.provide(pageHeadTitleSymbol, pageHeadTitle);
  app.provide(pageHeadSymbol, pageHead);
  app.provide(pageLangSymbol, pageLang);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase }
  });
};
const registerGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content);
};
const appCreator = vue.createSSRApp;
const historyCreator = vueRouter.createMemoryHistory;
const createVueApp = async () => {
  const app = appCreator({
    name: "VuepressApp",
    setup() {
      setupUpdateHead();
      for (const clientAppSetup of clientAppSetups) {
        clientAppSetup();
      }
      return () => [
        vue.h(vueRouter.RouterView),
        ...clientAppRootComponents.map((comp) => vue.h(comp))
      ];
    }
  });
  const router = vueRouter.createRouter({
    history: historyCreator(removeEndingSlash(siteData.value.base)),
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
    if (to.path !== from.path || from === vueRouter.START_LOCATION) {
      [pageData.value] = await Promise.all([
        resolvePageData(to.name),
        (_a2 = pagesComponents[to.name]) === null || _a2 === void 0 ? void 0 : _a2.__asyncLoader()
      ]);
    }
  });
  provideGlobalComputed(app, router);
  registerGlobalComponents(app);
  for (const clientAppEnhance4 of clientAppEnhances) {
    await clientAppEnhance4({ app, router, siteData });
  }
  app.use(router);
  return {
    app,
    router
  };
};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$a = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  _push(`<h1${serverRenderer.ssrRenderAttrs(vue.mergeProps({
    id: "hello-world",
    tabindex: "-1"
  }, _attrs))}><a class="header-anchor" href="#hello-world" aria-hidden="true">#</a> hello world</h1>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/index.html.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
var index_html$4 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$8]]);
var index_html$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": index_html$4
});
const _sfc_main$9 = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  _push(`<h1${serverRenderer.ssrRenderAttrs(vue.mergeProps({
    id: "foo",
    tabindex: "-1"
  }, _attrs))}><a class="header-anchor" href="#foo" aria-hidden="true">#</a> foo</h1>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/foo/index.html.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var index_html$2 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$7]]);
var index_html$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": index_html$2
});
const _sfc_main$8 = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h1 id="\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528" aria-hidden="true">#</a> \u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528</h1><p>VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01</p><p>\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026</p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033.png" alt=""> \u4F46\u662F\u5462\uFF0CVS Code \u5E76\u4E0D\u662F\u50CF PyCharm/WebStorm \u90A3\u6837\u5F00\u7BB1\u5373\u7528\u7684\uFF0C\u9700\u8981\u989D\u5916\u5B89\u88C5\u4E00\u4E9B\u63D2\u4EF6\u3001\u638C\u63E1\u4E00\u4E9B\u5FEB\u6377\u952E\u548C\u6280\u5DE7\uFF0C\u624D\u80FD\u987A\u624B\u7684\u7528\u8D77\u6765\u3002</p><p>\u6211\u82B1\u4E86\u4E00\u70B9\u65F6\u95F4\uFF0C\u4E3A\u4F60\u6574\u7406\u4E86\u53EF\u80FD\u662F\u524D\u7AEF\u8D85\u597D\u7528\u7684\u63D2\u4EF6\uFF0C\u6548\u7387\u52A0\u500D\u3002</p><h1 id="\u63A8\u8350\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u63A8\u8350\u63D2\u4EF6" aria-hidden="true">#</a> \u63A8\u8350\u63D2\u4EF6</h1><h2 id="\u6C49\u5316-vs-code" tabindex="-1"><a class="header-anchor" href="#\u6C49\u5316-vs-code" aria-hidden="true">#</a> \u6C49\u5316 VS code</h2><blockquote><p>\u5B89\u88C5\u4E4B\u540E\u4E00\u79D2\u6C49\u5316 VS code \uFF0C\u518D\u4E5F\u4E0D\u7528\u62C5\u5FC3\u770B\u4E0D\u61C2\u82F1\u6587\u3002 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094539.png" alt=""></p></blockquote><h2 id="\u56FE\u7247\u9884\u89C8" tabindex="-1"><a class="header-anchor" href="#\u56FE\u7247\u9884\u89C8" aria-hidden="true">#</a> \u56FE\u7247\u9884\u89C8</h2><blockquote><p>\u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094818.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094929.png" alt=""></p></blockquote><h2 id="\u5F69\u8679\u7F29\u8FDB" tabindex="-1"><a class="header-anchor" href="#\u5F69\u8679\u7F29\u8FDB" aria-hidden="true">#</a> \u5F69\u8679\u7F29\u8FDB</h2><blockquote><p>\u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C\u80FD\u63D0\u793A\u6211\u4EEC\u7684\u7F29\u8FDB\u662F\u5426\u5230\u4F4D\uFF0C\u6BCF\u6B65\u4EA4\u66FF\u56DB\u79CD\u4E0D\u540C\u7684\u989C\u8272\uFF0C\u6CA1\u6709\u5230\u4F4D\u7684\u8BDD\u989C\u8272\u53D8\u7EA2\uFF0C\u770B\u7740\u4EE3\u7801\u6574\u6574\u9F50\u9F50\u7684\u5C31\u5F88\u8212\u5FC3\u3002 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316095145.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316095216.png" alt=""></p></blockquote><h2 id="\u4EE3\u7801\u5206\u4EAB" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5206\u4EAB" aria-hidden="true">#</a> \u4EE3\u7801\u5206\u4EAB</h2><blockquote><p>\u53EF\u4EE5\u628A\u4EE3\u7801\u4FDD\u5B58\u6210\u7F8E\u89C2\u7684\u56FE\u7247\uFF0C\u4E3B\u9898\u4E0D\u540C\uFF0C\u4EE3\u7801\u914D\u8272\u65B9\u6848\u4E5F\u4E0D\u540C\uFF0C\u4E5F\u53EF\u4EE5\u81EA\u5DF1\u8BBE\u7F6E\u8FB9\u6846\u989C\u8272\u3001\u5927\u5C0F\u3001\u9634\u5F71\uFF0C\u5728\u6559\u7A0B\u6216\u8005\u6587\u6863\u4E2D\u63D0\u4F9B\u4EE3\u7801\u793A\u4F8B\u65F6\u633A\u6709\u7528\u7684 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316095553.png" alt=""></p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>ctrl<span class="token operator">+</span>shift<span class="token operator">+</span>p
<span class="token comment">//\u7136\u540E\u8F93\u5165polaceode</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316095831.png" alt=""></p><h2 id="\u5B9E\u65F6\u9884\u89C8" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u65F6\u9884\u89C8" aria-hidden="true">#</a> \u5B9E\u65F6\u9884\u89C8</h2><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316101703.png" alt=""></p><blockquote><p>\u4ED6\u4F1A\u542F\u7528\u4E00\u4E2A\u672C\u5730node\u670D\u52A1\u6258\u7BA1\u4F60\u7684\u8D44\u6E90\uFF0C\u70B9\u51FBgo Live\u9009\u62E9\u4F60\u8981\u8BBF\u95EE\u7684\u8D44\u6E90 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316101814.png" alt=""></p></blockquote><h2 id="\u5FEB\u6377\u952E" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u6377\u952E" aria-hidden="true">#</a> \u5FEB\u6377\u952E</h2><blockquote><p>\u8FD9\u4E2A\u53EF\u4EE5\u6839\u636E\u81EA\u5DF1\u7684\u4E60\u60EF\u548C\u559C\u597D\u6765\u51B3\u5B9A\uFF0C\u53EA\u9700\u8981\u662F\u63D2\u4EF6\u5E02\u573A\u8F93\u5165<code>keymap</code>\u5C31\u53EF\u4EE5\u51FA\u6765\u6240\u6709\u7F16\u8F91\u671F\u7684\u5FEB\u6377\u952E\uFF0C\u9009\u62E9\u4F60\u4E60\u60EF\u7684\u5C31ok\u4E86 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316102430.png" alt=""></p></blockquote><h2 id="\u6837\u5F0F\u8F6C\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#\u6837\u5F0F\u8F6C\u5B9A\u4E49" aria-hidden="true">#</a> \u6837\u5F0F\u8F6C\u5B9A\u4E49</h2><blockquote><p><code>ctrl+\u6837\u5F0F\u540D</code>\u5C31\u53EF\u4EE5\u770B\u5230\u5B9A\u4E49\u7684\u6837\u5F0F\uFF0C\u70B9\u51FB\u5C31\u53EF\u8DF3\u8F6C\u5230\u5B9A\u4E49\u7684\u4F4D\u7F6E <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316103846.png" alt=""> \u5982\u679C\u662Fvue\u53EF\u4EE5\u5B89\u88C5 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316103709.png" alt=""></p></blockquote><h2 id="\u989C\u8272\u7A81\u51FA" tabindex="-1"><a class="header-anchor" href="#\u989C\u8272\u7A81\u51FA" aria-hidden="true">#</a> \u989C\u8272\u7A81\u51FA</h2><blockquote><p>\u9AD8\u4EAEjs,css\u91CC\u7684\u989C\u8272\u503C\uFF0C\u8BA9\u4F60\u4E00\u76EE\u4E86\u7136 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316104309.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316104406.png" alt=""></p></blockquote><h2 id="\u62EC\u53F7\u9AD8\u4EAE" tabindex="-1"><a class="header-anchor" href="#\u62EC\u53F7\u9AD8\u4EAE" aria-hidden="true">#</a> \u62EC\u53F7\u9AD8\u4EAE</h2><blockquote><p>\u7A81\u51FA\u4F60\u7684\u62EC\u53F7\u8BA9\u4F60\u4E00\u76EE\u4E86\u7136\u4F60\u7684\u4EE3\u7801\u5757 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316104653.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316104732.png" alt=""></p></blockquote><h2 id="\u4EE3\u7801\u7F8E\u5316" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u7F8E\u5316" aria-hidden="true">#</a> \u4EE3\u7801\u7F8E\u5316</h2><blockquote><p>\u7528prettier\u683C\u5F0F\u7F8E\u5316\u4EE3\u7801 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316105524.png" alt=""></p></blockquote><h2 id="\u914D\u7F6E\u540C\u6B65" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u540C\u6B65" aria-hidden="true">#</a> \u914D\u7F6E\u540C\u6B65</h2><blockquote><p>\u53EF\u901A\u8FC7github\u767B\u5F55\u540C\u6B65\u4F60\u7684\u914D\u7F6E\u548C\u63D2\u4EF6 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316110305.png" alt=""></p></blockquote><h2 id="\u4E3B\u9898\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u4E3B\u9898\u914D\u7F6E" aria-hidden="true">#</a> \u4E3B\u9898\u914D\u7F6E</h2><blockquote><p>\u4E3B\u9898\u662F\u5F88\u4E3B\u89C2\u7684\u9009\u62E9\u5728\u5E02\u573A\u8F93\u5165theme\u5373\u53EF\u8BD5\u7528\u8FD8\u662F\u56FE\u6807\u4E3B\u9898\u52A0\u5165icon\u5173\u952E\u8BCD\u5373\u53EF</p></blockquote><h2 id="\u5FEB\u6377console" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u6377console" aria-hidden="true">#</a> \u5FEB\u6377console</h2><blockquote><p>\u8C03\u8BD5\u907F\u514D\u4E0D\u4E86\u6253\u5370\u53D8\u91CF\uFF0C\u6211\u4EEC\u53EA\u9700\u8981\u9009\u62E9\u5BF9\u5E94\u7684\u53D8\u91CF <code>ctrl + alt + L</code> \u5373\u53EF\u8F93\u51FA\u4E00\u53E5console.log <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316110847.png" alt=""></p></blockquote><h2 id="\u5F85\u529E\u9AD8\u4EAE" tabindex="-1"><a class="header-anchor" href="#\u5F85\u529E\u9AD8\u4EAE" aria-hidden="true">#</a> \u5F85\u529E\u9AD8\u4EAE</h2><blockquote><p>\u5DE5\u4F5C\u4E2D\u96BE\u514D\u9047\u5230\u4E00\u4E9B\u672A\u5B8C\u6210\u7684\u5F85\u529E\u4E8B\u9879 \u53EF\u4EE5\u901A\u8FC7\u5199\u6CE8\u91CA\u7684\u5F62\u5F0F\u63D0\u9192\u81EA\u5DF1 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316111512.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316111609.png" alt=""></p></blockquote><h2 id="\u5F15\u5165\u4F53\u79EF" tabindex="-1"><a class="header-anchor" href="#\u5F15\u5165\u4F53\u79EF" aria-hidden="true">#</a> \u5F15\u5165\u4F53\u79EF</h2><blockquote><p>\u53EF\u4EE5\u8BA9\u4F60\u77E5\u9053\u5F15\u5165\u7684\u4F53\u79EF\u5927\u5C0F\uFF0C\u8C03\u6574\u5F15\u5165\u4F7F\u4EE3\u7801\u4F53\u79EF\u66F4\u5C0F <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316113433.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316113649.png" alt=""> \u4F18\u5316\u5F15\u5165\u540E\uFF0C\u4E00\u76EE\u4E86\u7136 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316113742.png" alt=""></p></blockquote><p>\u5F85\u7EED.</p><!--]-->`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/post/2020-3-16-vscode-plugin.html.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var _2020316VscodePlugin_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$6]]);
var _2020316VscodePlugin_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2020316VscodePlugin_html$1
});
const _sfc_main$7 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  const _component_ExternalLinkIcon = vue.resolveComponent("ExternalLinkIcon");
  _push(`<!--[--><h1 id="windows-\u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350" tabindex="-1"><a class="header-anchor" href="#windows-\u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350" aria-hidden="true">#</a> windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350</h1><h2 id="wox" tabindex="-1"><a class="header-anchor" href="#wox" aria-hidden="true">#</a> wox</h2><p>\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002 <code>ctrl+space(\u7A7A\u683C)</code><a href="http://www.wox.one/" target="_blank" rel="noopener noreferrer">\u5B98\u7F51`);
  _push(serverRenderer.ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a></p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316185052.png" alt=""></p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316185130.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316202637.png" alt=""></p><h2 id="picgo" tabindex="-1"><a class="header-anchor" href="#picgo" aria-hidden="true">#</a> picgo</h2><p>\u56FE\u7247\u7BA1\u7406\u65B0\u4F53\u9A8C <a href="https://molunerfinn.com/PicGo/" target="_blank" rel="noopener noreferrer">\u5B98\u7F51`);
  _push(serverRenderer.ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316202718.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316202844.png" alt=""></p><h2 id="typora" tabindex="-1"><a class="header-anchor" href="#typora" aria-hidden="true">#</a> typora</h2><p>markdown\u4E66\u5199\u65B0\u4F53\u9A8C <a href="https://www.typora.io/" target="_blank" rel="noopener noreferrer">\u5B98\u7F51`);
  _push(serverRenderer.ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316203133.png" alt=""></p><p>\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo\u914D\u5408\u4F7F\u7528\uFF0C\u8BA9md\u7684\u56FE\u7247\u66F4\u597D\u7684\u7BA1\u7406\u3002</p><p>\u5F85\u7EED.</p><!--]-->`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/post/2020-3-16-windows-plugin.html.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var _2020316WindowsPlugin_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$5]]);
var _2020316WindowsPlugin_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2020316WindowsPlugin_html$1
});
const _sfc_main$6 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h1 id="electron-\u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5" tabindex="-1"><a class="header-anchor" href="#electron-\u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5" aria-hidden="true">#</a> Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5</h1><p>\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200318131627.png" alt=""> \u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1\u5230100\u591Ak\u3002\u800C\u8FD9\u4E2A\u5305\u6709\u5DEE\u4E0D\u591A 50MB\uFF0C\u53EF\u60F3\u800C\u77E5\uFF0C\u5982\u679C\u662F\u4EE5\u51E0k\u7684\u9F9F\u901F\uFF0C\u4E0D\u77E5\u9053\u8981\u4E0B\u8F7D\u5230\u7334\u5E74\u9A6C\u6708\u3002</p><h2 id="\u5C06npm\u5305\u4E0B\u8F7D\u5730\u5740\u6539\u4E3A\u6DD8\u5B9D\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#\u5C06npm\u5305\u4E0B\u8F7D\u5730\u5740\u6539\u4E3A\u6DD8\u5B9D\u5730\u5740" aria-hidden="true">#</a> \u5C06npm\u5305\u4E0B\u8F7D\u5730\u5740\u6539\u4E3A\u6DD8\u5B9D\u5730\u5740</h2><h3 id="\u5168\u5C40\u8BBE\u7F6E\u4E0B\u8F7D\u6E90" tabindex="-1"><a class="header-anchor" href="#\u5168\u5C40\u8BBE\u7F6E\u4E0B\u8F7D\u6E90" aria-hidden="true">#</a> \u5168\u5C40\u8BBE\u7F6E\u4E0B\u8F7D\u6E90</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://npm.taobao.org/mirrors/node
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="\u4E0B\u8F7Dnode\u6E90\u7801\u52A0\u901F" tabindex="-1"><a class="header-anchor" href="#\u4E0B\u8F7Dnode\u6E90\u7801\u52A0\u901F" aria-hidden="true">#</a> \u4E0B\u8F7Dnode\u6E90\u7801\u52A0\u901F</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> config <span class="token builtin class-name">set</span> disturl https://npm.taobao.org/mirrors/node
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="\u5C06electron\u7684\u5730\u5740\u6CE8\u518C\u4E3A\u6DD8\u5B9D\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#\u5C06electron\u7684\u5730\u5740\u6CE8\u518C\u4E3A\u6DD8\u5B9D\u5730\u5740" aria-hidden="true">#</a> \u5C06electron\u7684\u5730\u5740\u6CE8\u518C\u4E3A\u6DD8\u5B9D\u5730\u5740</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> config <span class="token builtin class-name">set</span> ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u4EE5\u4E0A\u4E2A\u4EBA\u4EB2\u6D4B\u6709\u6548\uFF0C\u6700\u91CD\u8981\u7684\u662F\u540E\u9762\u4E24\u6B65\u3002</p><!--]-->`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/post/2020-3-18-electron-mirror-down.html.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var _2020318ElectronMirrorDown_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$4]]);
var _2020318ElectronMirrorDown_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2020318ElectronMirrorDown_html$1
});
const _sfc_main$5 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h1 id="\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC" tabindex="-1"><a class="header-anchor" href="#\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC" aria-hidden="true">#</a> \u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC</h1><h2 id="\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B" tabindex="-1"><a class="header-anchor" href="#\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B" aria-hidden="true">#</a> \u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B</h2><p>\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002</p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120320.png" alt=""></p><p>\u5982\u56FE\u6211\u4EEC\u4E0B\u8F7D\u4E0B\u6765\u53EF\u4EE5\u76F4\u63A5\u70B9\u51FB\u5C31\u5B89\u88C5\u4E86\u3002</p><p>\u5982\u679C\u5B89\u88C5\u5931\u8D25\uFF0C\u5C06\u4E0B\u8F7D\u5305\u590D\u5236\u5230\u4E00\u4E2A\u6307\u5B9A\u7684\u6587\u4EF6\u5939\uFF0C\u91CD\u547D\u540D\u5E76\u89E3\u538B\u3002 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316121739.png" alt=""> \u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316143153.png" alt=""> \u89E3\u538B\u540E\u53EF\u4EE5\u5220\u9664\u538B\u7F29\u5305 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316122002.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316121904.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316121936.png" alt=""> \u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316122132.png" alt=""></p><h2 id="\u5E7F\u544A\u62E6\u622A" tabindex="-1"><a class="header-anchor" href="#\u5E7F\u544A\u62E6\u622A" aria-hidden="true">#</a> \u5E7F\u544A\u62E6\u622A</h2><p>\u53BB\u6B7B\u5427\uFF01\u72D7\u76AE\u818F\u836F\u3002 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316122902.png" alt=""></p><h2 id="\u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55" tabindex="-1"><a class="header-anchor" href="#\u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55" aria-hidden="true">#</a> \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55</h2><p>\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316124229.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316124309.png" alt=""></p><h2 id="\u53EF\u4EE5\u6574\u7406\u4F60\u7684\u6807\u7B7E-\u63A8\u8350" tabindex="-1"><a class="header-anchor" href="#\u53EF\u4EE5\u6574\u7406\u4F60\u7684\u6807\u7B7E-\u63A8\u8350" aria-hidden="true">#</a> \u53EF\u4EE5\u6574\u7406\u4F60\u7684\u6807\u7B7E&lt;\u63A8\u8350&gt;</h2><p>\u6742\u4E71\u6807\u7B7E\u5206\u7C7B\u7BA1\u7406 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316125321.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316125224.png" alt=""></p><h2 id="\u6269\u5C55\u7A0B\u5E8F\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u6269\u5C55\u7A0B\u5E8F\u7BA1\u7406" aria-hidden="true">#</a> \u6269\u5C55\u7A0B\u5E8F\u7BA1\u7406</h2><p>\u8F7B\u677E\u7BA1\u7406\u6269\u5C55\u7A0B\u5E8F\u7684\u5F00\u5173 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316131243.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316131321.png" alt=""></p><h2 id="\u56FE\u7247\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u56FE\u7247\u4E0B\u8F7D" aria-hidden="true">#</a> \u56FE\u7247\u4E0B\u8F7D</h2><p>\u6240\u6709\u56FE\u7247\u8F7B\u677E\u4E0B\u8F7D <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316131845.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316131919.png" alt=""></p><h2 id="\u5212\u8BCD" tabindex="-1"><a class="header-anchor" href="#\u5212\u8BCD" aria-hidden="true">#</a> \u5212\u8BCD</h2><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316132631.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316132547.png" alt=""></p><h2 id="\u524D\u7AEF\u5F00\u53D1\u52A9\u624B" tabindex="-1"><a class="header-anchor" href="#\u524D\u7AEF\u5F00\u53D1\u52A9\u624B" aria-hidden="true">#</a> \u524D\u7AEF\u5F00\u53D1\u52A9\u624B</h2><p>\u96C6\u6210\u4E86\u524D\u7AEF\u5E38\u7528\u5DE5\u5177 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316143527.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316143448.png" alt=""></p><h2 id="\u4F18\u5316github\u6587\u4EF6\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#\u4F18\u5316github\u6587\u4EF6\u76EE\u5F55" aria-hidden="true">#</a> \u4F18\u5316github\u6587\u4EF6\u76EE\u5F55</h2><p>\u53EF\u4EE5\u8BA9\u4F60\u8BBF\u95EE\u7684github\u9879\u76EE\u7ED3\u6784\u5728\u5DE6\u8FB9\u6E05\u6670\u5C55\u793A\u65B9\u4FBF\u67E5\u9605 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316144651.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316144736.png" alt=""></p><h2 id="\u4F18\u5316github\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u4F18\u5316github\u4E0B\u8F7D" aria-hidden="true">#</a> \u4F18\u5316github\u4E0B\u8F7D</h2><p>\u53EF\u4EE5\u5355\u72EC\u4E0B\u8F7D\u67D0\u4E2A\u6587\u4EF6 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316145036.png" alt=""> \u901A\u8FC7\u53CC\u51FB\u9009\u62E9\u8981\u4E0B\u8F7D\u7684\u6587\u4EF6 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316145214.png" alt=""></p><h2 id="\u6CB9\u7334" tabindex="-1"><a class="header-anchor" href="#\u6CB9\u7334" aria-hidden="true">#</a> \u6CB9\u7334</h2><p>\u6CB9\u7334\u7C7B\u4F3C\u4E8E\u662Fchrome\u7684\u4E00\u4E2A\u5916\u6302\u7A0B\u5E8F\u3002\u4ED6\u6709\u5F88\u591A\u5F3A\u5927\u7684\u7EC4\u4EF6\u3002 \u641C\u7D22<code>Tampermonkey</code> \u4E0B\u8F7D,\u5728\u8F6F\u4EF6\u5217\u8868\u6392\u884C\u91CC\u770B\u770B\u6709\u4EC0\u4E48\u4F60\u9700\u8981\u7684\u5427\uFF01</p><h2 id="vimium" tabindex="-1"><a class="header-anchor" href="#vimium" aria-hidden="true">#</a> vimium</h2><p>\u60F3\u4F7F\u7528vim\u4E00\u6837\u4F7F\u7528chrome <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200322122222.png" alt=""></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5E38\u7528\u5FEB\u6377\u952E</span>
<span class="token builtin class-name">shift</span> + ?  <span class="token comment">#\u5E2E\u52A9</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><code>f</code>\u6216\u8005<code>F</code><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200322122553.png" alt=""> \u4F1A\u6807\u8BB0\u6240\u6709\u53EF\u70B9\u51FB\u7684\u5730\u65B9\u8F93\u5165\u5BF9\u5E94\u7684\u5B57\u6BCD\u8DF3\u8F6C</p><p><code>F</code>\u4E3A<code>shift+f</code>\u4F1A\u5728\u65B0\u7684\u6807\u7B7E\u9875\u6253\u5F00\u5BF9\u5E94\u7684\u8FDE\u63A5 <code>j</code> <code>k</code> \u4E0B\u4E0A\u6EDA\u52A8 <code>gg</code>\u5E95\u90E8 <code>G</code>\u5E95\u90E8 <code>J</code> <code>K</code> \u5DE6\u53F3\u6807\u7B7E <code>ctrl + l</code> \u641C\u7D22\u680F \u3002\u3002\u3002\u3002</p><h2 id="sourcegraph" tabindex="-1"><a class="header-anchor" href="#sourcegraph" aria-hidden="true">#</a> sourcegraph</h2><p>\u66F4\u65B9\u4FBF\u7684\u67E5\u770Bgithub\u6E90\u7801 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200322124126.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200322124053.png" alt=""></p><h2 id="https-www-google-com-preferences" tabindex="-1"><a class="header-anchor" href="#https-www-google-com-preferences" aria-hidden="true">#</a> https://www.google.com/preferences</h2><p>\u641C\u7D22\u680F\u8F93\u5165\u4E0A\u9762\u7684\u5730\u5740\uFF0C\u53EF\u4EE5\u4FEE\u6539\u4E00\u4E9Bgoogle\u641C\u7D22\u7684\u914D\u7F6E\uFF0C\u6BD4\u5982\u7ED3\u679C\u6761\u6570\uFF0C\u662F\u5426\u5728\u65B0\u7684\u6807\u7B7E\u9875\u6253\u5F00\u7B49\u3002</p><p>\u5F85\u7EED.</p><!--]-->`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/post/2021/2020-3-16-chrome-plugin.html.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var _2020316ChromePlugin_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$3]]);
var _2020316ChromePlugin_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2020316ChromePlugin_html$1
});
const _sfc_main$4 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/404.html.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var _404_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
var _404_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _404_html$1
});
const data$6 = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "hello world",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "git": {},
  "filePathRelative": "README.md"
};
var index_html$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$6
});
const data$5 = {
  "key": "v-7446daa2",
  "path": "/foo/",
  "title": "foo",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "git": {},
  "filePathRelative": "foo/index.md"
};
var index_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$5
});
const data$4 = {
  "key": "v-71255a56",
  "path": "/post/2020-3-16-vscode-plugin.html",
  "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528",
  "lang": "zh-CN",
  "frontmatter": {
    "primary": "7abbe3",
    "secondary": "85441c",
    "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528",
    "tag": [
      "vscode"
    ],
    "author": "Artiely",
    "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316111222.png",
    "date": "2020-3-16",
    "base64": "7cbde7",
    "category": "Tool"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "\u6C49\u5316 VS code",
      "slug": "\u6C49\u5316-vs-code",
      "children": []
    },
    {
      "level": 2,
      "title": "\u56FE\u7247\u9884\u89C8",
      "slug": "\u56FE\u7247\u9884\u89C8",
      "children": []
    },
    {
      "level": 2,
      "title": "\u5F69\u8679\u7F29\u8FDB",
      "slug": "\u5F69\u8679\u7F29\u8FDB",
      "children": []
    },
    {
      "level": 2,
      "title": "\u4EE3\u7801\u5206\u4EAB",
      "slug": "\u4EE3\u7801\u5206\u4EAB",
      "children": []
    },
    {
      "level": 2,
      "title": "\u5B9E\u65F6\u9884\u89C8",
      "slug": "\u5B9E\u65F6\u9884\u89C8",
      "children": []
    },
    {
      "level": 2,
      "title": "\u5FEB\u6377\u952E",
      "slug": "\u5FEB\u6377\u952E",
      "children": []
    },
    {
      "level": 2,
      "title": "\u6837\u5F0F\u8F6C\u5B9A\u4E49",
      "slug": "\u6837\u5F0F\u8F6C\u5B9A\u4E49",
      "children": []
    },
    {
      "level": 2,
      "title": "\u989C\u8272\u7A81\u51FA",
      "slug": "\u989C\u8272\u7A81\u51FA",
      "children": []
    },
    {
      "level": 2,
      "title": "\u62EC\u53F7\u9AD8\u4EAE",
      "slug": "\u62EC\u53F7\u9AD8\u4EAE",
      "children": []
    },
    {
      "level": 2,
      "title": "\u4EE3\u7801\u7F8E\u5316",
      "slug": "\u4EE3\u7801\u7F8E\u5316",
      "children": []
    },
    {
      "level": 2,
      "title": "\u914D\u7F6E\u540C\u6B65",
      "slug": "\u914D\u7F6E\u540C\u6B65",
      "children": []
    },
    {
      "level": 2,
      "title": "\u4E3B\u9898\u914D\u7F6E",
      "slug": "\u4E3B\u9898\u914D\u7F6E",
      "children": []
    },
    {
      "level": 2,
      "title": "\u5FEB\u6377console",
      "slug": "\u5FEB\u6377console",
      "children": []
    },
    {
      "level": 2,
      "title": "\u5F85\u529E\u9AD8\u4EAE",
      "slug": "\u5F85\u529E\u9AD8\u4EAE",
      "children": []
    },
    {
      "level": 2,
      "title": "\u5F15\u5165\u4F53\u79EF",
      "slug": "\u5F15\u5165\u4F53\u79EF",
      "children": []
    }
  ],
  "git": {},
  "filePathRelative": "post/2020-3-16-vscode-plugin.md"
};
var _2020316VscodePlugin_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$4
});
const data$3 = {
  "key": "v-134ad0ae",
  "path": "/post/2020-3-16-windows-plugin.html",
  "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350",
  "lang": "zh-CN",
  "frontmatter": {
    "primary": "2c62c8",
    "secondary": "d39d37",
    "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350",
    "tag": [
      "windows"
    ],
    "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png",
    "date": "2020-3-16",
    "base64": "3260d0",
    "category": "Tool"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "wox",
      "slug": "wox",
      "children": []
    },
    {
      "level": 2,
      "title": "picgo",
      "slug": "picgo",
      "children": []
    },
    {
      "level": 2,
      "title": "typora",
      "slug": "typora",
      "children": []
    }
  ],
  "git": {},
  "filePathRelative": "post/2020-3-16-windows-plugin.md"
};
var _2020316WindowsPlugin_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$3
});
const data$2 = {
  "key": "v-357580ba",
  "path": "/post/2020-3-18-electron-mirror-down.html",
  "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5",
  "lang": "zh-CN",
  "frontmatter": {
    "primary": "2974d1",
    "secondary": "d68b2e",
    "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5",
    "tag": [
      "electron"
    ],
    "author": "Artiely",
    "date": "2020-3-18",
    "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png",
    "base64": "2e7bd7",
    "category": "electron"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "\u5C06npm\u5305\u4E0B\u8F7D\u5730\u5740\u6539\u4E3A\u6DD8\u5B9D\u5730\u5740",
      "slug": "\u5C06npm\u5305\u4E0B\u8F7D\u5730\u5740\u6539\u4E3A\u6DD8\u5B9D\u5730\u5740",
      "children": [
        {
          "level": 3,
          "title": "\u5168\u5C40\u8BBE\u7F6E\u4E0B\u8F7D\u6E90",
          "slug": "\u5168\u5C40\u8BBE\u7F6E\u4E0B\u8F7D\u6E90",
          "children": []
        },
        {
          "level": 3,
          "title": "\u4E0B\u8F7Dnode\u6E90\u7801\u52A0\u901F",
          "slug": "\u4E0B\u8F7Dnode\u6E90\u7801\u52A0\u901F",
          "children": []
        },
        {
          "level": 3,
          "title": "\u5C06electron\u7684\u5730\u5740\u6CE8\u518C\u4E3A\u6DD8\u5B9D\u5730\u5740",
          "slug": "\u5C06electron\u7684\u5730\u5740\u6CE8\u518C\u4E3A\u6DD8\u5B9D\u5730\u5740",
          "children": []
        }
      ]
    }
  ],
  "git": {},
  "filePathRelative": "post/2020-3-18-electron-mirror-down.md"
};
var _2020318ElectronMirrorDown_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$2
});
const data$1 = {
  "key": "v-1c426dcc",
  "path": "/post/2021/2020-3-16-chrome-plugin.html",
  "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC",
  "lang": "zh-CN",
  "frontmatter": {
    "primary": "3379fb",
    "secondary": "cc8604",
    "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC",
    "tag": [
      "chrome"
    ],
    "author": "Artiely",
    "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316133138.png",
    "date": "2020-3-16",
    "base64": "3488fd",
    "category": "Plugin"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B",
      "slug": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B",
      "children": []
    },
    {
      "level": 2,
      "title": "\u5E7F\u544A\u62E6\u622A",
      "slug": "\u5E7F\u544A\u62E6\u622A",
      "children": []
    },
    {
      "level": 2,
      "title": "\u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55",
      "slug": "\u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55",
      "children": []
    },
    {
      "level": 2,
      "title": "\u53EF\u4EE5\u6574\u7406\u4F60\u7684\u6807\u7B7E<\u63A8\u8350>",
      "slug": "\u53EF\u4EE5\u6574\u7406\u4F60\u7684\u6807\u7B7E-\u63A8\u8350",
      "children": []
    },
    {
      "level": 2,
      "title": "\u6269\u5C55\u7A0B\u5E8F\u7BA1\u7406",
      "slug": "\u6269\u5C55\u7A0B\u5E8F\u7BA1\u7406",
      "children": []
    },
    {
      "level": 2,
      "title": "\u56FE\u7247\u4E0B\u8F7D",
      "slug": "\u56FE\u7247\u4E0B\u8F7D",
      "children": []
    },
    {
      "level": 2,
      "title": "\u5212\u8BCD",
      "slug": "\u5212\u8BCD",
      "children": []
    },
    {
      "level": 2,
      "title": "\u524D\u7AEF\u5F00\u53D1\u52A9\u624B",
      "slug": "\u524D\u7AEF\u5F00\u53D1\u52A9\u624B",
      "children": []
    },
    {
      "level": 2,
      "title": "\u4F18\u5316github\u6587\u4EF6\u76EE\u5F55",
      "slug": "\u4F18\u5316github\u6587\u4EF6\u76EE\u5F55",
      "children": []
    },
    {
      "level": 2,
      "title": "\u4F18\u5316github\u4E0B\u8F7D",
      "slug": "\u4F18\u5316github\u4E0B\u8F7D",
      "children": []
    },
    {
      "level": 2,
      "title": "\u6CB9\u7334",
      "slug": "\u6CB9\u7334",
      "children": []
    },
    {
      "level": 2,
      "title": "vimium",
      "slug": "vimium",
      "children": []
    },
    {
      "level": 2,
      "title": "sourcegraph",
      "slug": "sourcegraph",
      "children": []
    },
    {
      "level": 2,
      "title": "https://www.google.com/preferences",
      "slug": "https-www-google-com-preferences",
      "children": []
    }
  ],
  "git": {},
  "filePathRelative": "post/2021/2020-3-16-chrome-plugin.md"
};
var _2020316ChromePlugin_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$1
});
const data = {
  "key": "v-3706649a",
  "path": "/404.html",
  "title": "",
  "lang": "zh-CN",
  "frontmatter": {
    "layout": "404"
  },
  "excerpt": "",
  "headers": [],
  "git": {},
  "filePathRelative": null
};
var _404_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data
});
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}>404 Not Found</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/404.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var _404 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
var _404$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _404
});
var Cover_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {
  __ssrInlineRender: true,
  props: {
    item: Object
  },
  setup(__props) {
    const hexToRgba = (hex, opacity) => {
      return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
    };
    let isLoaded = vue.ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="img-box" data-v-21fdb6bb><img${serverRenderer.ssrRenderAttr("src", __props.item.frontmatter.cover)} class="cover" alt="cover" data-v-21fdb6bb></div><div class="${serverRenderer.ssrRenderClass([{ isLoaded: vue.unref(isLoaded) }, "loading"])}" style="${serverRenderer.ssrRenderStyle({ backgroundColor: hexToRgba(`#${__props.item.frontmatter.primary}`, 0.8) })}" data-v-21fdb6bb></div><!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Cover.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Cover = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-21fdb6bb"]]);
var Article_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  __ssrInlineRender: true,
  setup(__props) {
    const post = [{ "text": "power by artiely", "children": [{ "text": "artiely", "link": "/post/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": ["electron"], "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "password": false, "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\n\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\n\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "text": "2 min read", "words": 230 }, "id": "4147cd66-d3a9-4cdf-8010-65123f44e560" }, { "text": "artiely", "link": "/post/2020-3-16-vscode-plugin", "frontmatter": { "primary": "7abbe3", "secondary": "85441c", "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528", "tag": ["vscode"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316111222.png", "date": "2020-03-16", "base64": "7cbde7", "category": "Tool", "password": false, "summary": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528\nVS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\n\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033 ...", "text": "4 min read", "words": 782 }, "id": "a9b77092-88dd-4ad0-9053-e4fcf7251bcb" }, { "text": "artiely", "link": "/post/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": ["windows"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "author": "Artiely", "password": false, "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350\nwox\n\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002\nctrl+space(\u7A7A\u683C)\n\u5B98\u7F51\n![](https://gitee.com/artiely/ ...", "text": "1 min read", "words": 101 }, "id": "856ec5e0-14a0-40a8-af76-048240359ef8" }, { "text": "artiely", "link": "/post/2021/2020-3-16-chrome-plugin", "frontmatter": { "primary": "3379fb", "secondary": "cc8604", "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC", "tag": ["chrome"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316133138.png", "date": "2020-03-16", "base64": "3488fd", "category": "Plugin", "password": false, "summary": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC\n\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\n\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120 ...", "text": "4 min read", "words": 605 }, "id": "9c07a328-2149-4bdc-ab3b-66f2f9c9fec7" }], "tags": [{ "tag": "electron", "posts": [{ "text": "artiely", "link": "/post/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": ["electron"], "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "password": false, "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\n\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\n\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "text": "2 min read", "words": 230 }, "id": "4147cd66-d3a9-4cdf-8010-65123f44e560" }] }, { "tag": "vscode", "posts": [{ "text": "artiely", "link": "/post/2020-3-16-vscode-plugin", "frontmatter": { "primary": "7abbe3", "secondary": "85441c", "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528", "tag": ["vscode"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316111222.png", "date": "2020-03-16", "base64": "7cbde7", "category": "Tool", "password": false, "summary": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528\nVS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\n\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033 ...", "text": "4 min read", "words": 782 }, "id": "a9b77092-88dd-4ad0-9053-e4fcf7251bcb" }] }, { "tag": "windows", "posts": [{ "text": "artiely", "link": "/post/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": ["windows"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "author": "Artiely", "password": false, "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350\nwox\n\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002\nctrl+space(\u7A7A\u683C)\n\u5B98\u7F51\n![](https://gitee.com/artiely/ ...", "text": "1 min read", "words": 101 }, "id": "856ec5e0-14a0-40a8-af76-048240359ef8" }] }, { "tag": "chrome", "posts": [{ "text": "artiely", "link": "/post/2021/2020-3-16-chrome-plugin", "frontmatter": { "primary": "3379fb", "secondary": "cc8604", "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC", "tag": ["chrome"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316133138.png", "date": "2020-03-16", "base64": "3488fd", "category": "Plugin", "password": false, "summary": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC\n\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\n\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120 ...", "text": "4 min read", "words": 605 }, "id": "9c07a328-2149-4bdc-ab3b-66f2f9c9fec7" }] }], "timeline": [{ "date": "2020-03-18", "posts": [{ "text": "artiely", "link": "/post/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": ["electron"], "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "password": false, "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\n\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\n\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "text": "2 min read", "words": 230 }, "id": "4147cd66-d3a9-4cdf-8010-65123f44e560" }] }, { "date": "2020-03-16", "posts": [{ "text": "artiely", "link": "/post/2020-3-16-vscode-plugin", "frontmatter": { "primary": "7abbe3", "secondary": "85441c", "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528", "tag": ["vscode"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316111222.png", "date": "2020-03-16", "base64": "7cbde7", "category": "Tool", "password": false, "summary": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528\nVS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\n\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033 ...", "text": "4 min read", "words": 782 }, "id": "a9b77092-88dd-4ad0-9053-e4fcf7251bcb" }, { "text": "artiely", "link": "/post/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": ["windows"], "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "author": "Artiely", "password": false, "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350\nwox\n\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002\nctrl+space(\u7A7A\u683C)\n\u5B98\u7F51\n![](https://gitee.com/artiely/ ...", "text": "1 min read", "words": 101 }, "id": "856ec5e0-14a0-40a8-af76-048240359ef8" }, { "text": "artiely", "link": "/post/2021/2020-3-16-chrome-plugin", "frontmatter": { "primary": "3379fb", "secondary": "cc8604", "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC", "tag": ["chrome"], "author": "Artiely", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316133138.png", "date": "2020-03-16", "base64": "3488fd", "category": "Plugin", "password": false, "summary": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC\n\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\n\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002\n![](https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120 ...", "text": "4 min read", "words": 605 }, "id": "9c07a328-2149-4bdc-ab3b-66f2f9c9fec7" }] }] }][0].children;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "article-wrapper" }, _attrs))} data-v-8b7c29c4><!--[-->`);
      serverRenderer.ssrRenderList(vue.unref(post), (item) => {
        _push(`<article class="article" data-v-8b7c29c4>`);
        if (item.frontmatter) {
          _push(`<div class="poster-wrapper" data-v-8b7c29c4>`);
          if (item.frontmatter.category) {
            _push(`<div class="category" data-v-8b7c29c4><span class="category-inner" style="${serverRenderer.ssrRenderStyle({
              backgroundColor: `#${item.frontmatter.secondary}`,
              color: `#${item.frontmatter.primary}`
            })}" data-v-8b7c29c4>${serverRenderer.ssrInterpolate(item.frontmatter.category)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(serverRenderer.ssrRenderComponent(Cover, { item }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (item.frontmatter) {
          _push(`<div class="article-info" data-v-8b7c29c4><h1 class="article-title" data-v-8b7c29c4><a${serverRenderer.ssrRenderAttr("href", item.link)} data-v-8b7c29c4>${serverRenderer.ssrInterpolate(item.frontmatter.title)}</a></h1><div class="article-tags" data-v-8b7c29c4><!--[-->`);
          serverRenderer.ssrRenderList(item.frontmatter.tag, (tag) => {
            _push(`<span data-v-8b7c29c4>${serverRenderer.ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div><div class="article-con" data-v-8b7c29c4><p class="article-desc" data-v-8b7c29c4>${serverRenderer.ssrInterpolate(item.frontmatter.summary)}</p></div><div class="article-meta" data-v-8b7c29c4><span data-v-8b7c29c4>${serverRenderer.ssrInterpolate(item.frontmatter.date)}</span><span data-v-8b7c29c4>${serverRenderer.ssrInterpolate(item.frontmatter.author)}</span></div><div class="more" data-v-8b7c29c4><span data-v-8b7c29c4>${serverRenderer.ssrInterpolate(item.frontmatter.text)}</span><span data-v-8b7c29c4>\u9605\u8BFB\u5168\u6587-&gt;</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Article.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
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
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Article = vue.resolveComponent("Article");
  const _component_Content = vue.resolveComponent("Content");
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}> Home <span class="text-red-800 hover:text-primary">I am a span</span>`);
  _push(serverRenderer.ssrRenderComponent(_component_Article, null, null, _parent));
  _push(`<h1 class="palette-title">\u4F60\u597D\uFF0C\u8C03\u8272\u677F\uFF01</h1>`);
  _push(serverRenderer.ssrRenderComponent(_component_Content, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Layout = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
var Layout$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Layout
});
var clientAppEnhance = defineClientAppEnhance(({ app, router, siteData: siteData2 }) => {
  console.log({ app, router, siteData: siteData2 });
});
var clientAppEnhance$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": clientAppEnhance
});
exports.createVueApp = createVueApp;

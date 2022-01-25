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
require("@vue/devtools-api");
var core = require("@vueuse/core");
var nprogress$1 = require("nprogress");
var serverRenderer = require("vue/server-renderer");
var pinyin = require("pinyin");
var dayjs = require("dayjs");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
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
var pinyin__default = /* @__PURE__ */ _interopDefaultLegacy(pinyin);
var dayjs__default = /* @__PURE__ */ _interopDefaultLegacy(dayjs);
const ClientOnly = vue.defineComponent({
  setup(_, ctx) {
    const isMounted = vue.ref(false);
    vue.onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a, _b;
      return isMounted.value ? (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a) : null;
    };
  }
});
const pagesComponents = {
  "v-7446daa2": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return index_html$5;
  })),
  "v-98df26d6": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _2020316VscodePlugin_html$2;
  })),
  "v-0151cd4a": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _2020316WindowsPlugin_html$2;
  })),
  "v-ebe80ef8": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _2020318ElectronMirrorDown_html$2;
  })),
  "v-a36afcfe": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _2021223Proxy_html$2;
  })),
  "v-810351b2": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _2022111mdTest_html$2;
  })),
  "v-71182a26": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _2020316ChromePlugin_html$2;
  })),
  "v-3706649a": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _404_html$2;
  })),
  "v-8daa1a0e": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return index_html$3;
  }))
};
const pagesData$1 = {
  "v-7446daa2": () => Promise.resolve().then(function() {
    return index_html$1;
  }).then(({ data: data2 }) => data2),
  "v-98df26d6": () => Promise.resolve().then(function() {
    return _2020316VscodePlugin_html;
  }).then(({ data: data2 }) => data2),
  "v-0151cd4a": () => Promise.resolve().then(function() {
    return _2020316WindowsPlugin_html;
  }).then(({ data: data2 }) => data2),
  "v-ebe80ef8": () => Promise.resolve().then(function() {
    return _2020318ElectronMirrorDown_html;
  }).then(({ data: data2 }) => data2),
  "v-a36afcfe": () => Promise.resolve().then(function() {
    return _2021223Proxy_html;
  }).then(({ data: data2 }) => data2),
  "v-810351b2": () => Promise.resolve().then(function() {
    return _2022111mdTest_html;
  }).then(({ data: data2 }) => data2),
  "v-71182a26": () => Promise.resolve().then(function() {
    return _2020316ChromePlugin_html;
  }).then(({ data: data2 }) => data2),
  "v-3706649a": () => Promise.resolve().then(function() {
    return _404_html;
  }).then(({ data: data2 }) => data2),
  "v-8daa1a0e": () => Promise.resolve().then(function() {
    return index_html;
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
const pageHeadSymbol = Symbol("");
const usePageHead = () => {
  const pageHead = vue.inject(pageHeadSymbol);
  if (!pageHead) {
    throw new Error("usePageHead() is called without provider.");
  }
  return pageHead;
};
const pageHeadTitleSymbol = Symbol("");
const pageLangSymbol = Symbol("");
const usePageLang = () => {
  const pageLang = vue.inject(pageLangSymbol);
  if (!pageLang) {
    throw new Error("usePageLang() is called without provider.");
  }
  return pageLang;
};
const routeLocaleSymbol = Symbol("");
const useRouteLocale = () => {
  const routeLocale = vue.inject(routeLocaleSymbol);
  if (!routeLocale) {
    throw new Error("useRouteLocale() is called without provider.");
  }
  return routeLocale;
};
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
    return Layout;
  })),
  "clientAppEnhanceFiles": vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return clientAppEnhance$1;
  }))
};
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
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
const isLinkMailto = (link) => /^mailto:/.test(link);
const isLinkTel = (link) => /^tel:/.test(link);
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
const Vuepress = vue.defineComponent({
  name: "Vuepress",
  setup() {
    const page = usePageData();
    const layoutComponent = vue.computed(() => {
      let layoutName;
      if (page.value.path) {
        const frontmatterLayout = page.value.frontmatter.layout;
        if (isString(frontmatterLayout)) {
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
const defineClientAppEnhance = (clientAppEnhance7) => clientAppEnhance7;
const defineClientAppSetup = (clientAppSetup) => clientAppSetup;
const withBase = (url) => {
  if (isLinkHttp(url))
    return url;
  const base = useSiteData().value.base;
  return `${base}${removeLeadingSlash(url)}`;
};
const resolvers = vue.reactive({
  resolvePageData: async (pageKey) => {
    const pageDataResolver = pagesData.value[pageKey];
    const pageData2 = await (pageDataResolver === null || pageDataResolver === void 0 ? void 0 : pageDataResolver());
    return pageData2 !== null && pageData2 !== void 0 ? pageData2 : pageDataEmpty;
  },
  resolvePageFrontmatter: (pageData2) => pageData2.frontmatter,
  resolvePageHead: (headTitle, frontmatter, siteLocale) => {
    const description = isString(frontmatter.description) ? frontmatter.description : siteLocale.description;
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
const ExternalLinkIcon = vue.defineComponent({
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
    const locale = vue.computed(() => {
      var _a;
      return (_a = props.locales[routeLocale.value]) !== null && _a !== void 0 ? _a : {
        openInNewWindow: "open in new window"
      };
    });
    return () => vue.h("span", [
      svg,
      vue.h("span", {
        class: "external-link-icon-sr-only"
      }, locale.value.openInNewWindow)
    ]);
  }
});
const locales = { "/": { "openInNewWindow": "open in new window" } };
var clientAppEnhance0 = defineClientAppEnhance(({ app }) => {
  app.component("ExternalLinkIcon", vue.h(ExternalLinkIcon, { locales }));
});
var vars$2 = "";
var mediumZoom = "";
var clientAppEnhance1 = defineClientAppEnhance(({ app, router }) => {
  return;
});
const themeData$1 = {
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
  var _a;
  return __spreadValues(__spreadValues({}, theme), (_a = theme.locales) === null || _a === void 0 ? void 0 : _a[routeLocale]);
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
const _sfc_main$v = /* @__PURE__ */ vue.defineComponent({
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
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/global/Badge.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
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
      var _a;
      const items = (((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)) || []).filter((vnode) => vnode.type.name === "CodeGroupItem").map((vnode) => {
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
const __default__$1 = vue.defineComponent({
  name: "CodeGroupItem"
});
const _sfc_main$u = /* @__PURE__ */ vue.defineComponent(__spreadProps(__spreadValues({}, __default__$1), {
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
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/global/CodeGroupItem.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const darkModeSymbol = Symbol("");
const useDarkMode = () => {
  const isDarkMode = vue.inject(darkModeSymbol);
  if (!isDarkMode) {
    throw new Error("useDarkMode() is called without provider.");
  }
  return isDarkMode;
};
const setupDarkMode = () => {
  const themeLocale = useThemeLocaleData();
  const isDarkPreferred = core.usePreferredDark();
  const darkStorage = core.useStorage("vuepress-color-scheme", "auto");
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
  const resolvedRedirectObj = isString(resolvedRedirect) ? { path: resolvedRedirect } : resolvedRedirect;
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
const useSidebarItems = () => {
  const sidebarItems = vue.inject(sidebarItemsSymbol);
  if (!sidebarItems) {
    throw new Error("useSidebarItems() is called without provider.");
  }
  return sidebarItems;
};
const setupSidebarItems = () => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter();
  const sidebarItems = vue.computed(() => resolveSidebarItems(frontmatter.value, themeLocale.value));
  vue.provide(sidebarItemsSymbol, sidebarItems);
};
const resolveSidebarItems = (frontmatter, themeLocale) => {
  var _a, _b, _c, _d;
  const sidebarConfig = (_b = (_a = frontmatter.sidebar) !== null && _a !== void 0 ? _a : themeLocale.sidebar) !== null && _b !== void 0 ? _b : "auto";
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
    var _a;
    let childItem;
    if (isString(item)) {
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
      const headers = ((_a = page.value.headers[0]) === null || _a === void 0 ? void 0 : _a.level) === 1 ? page.value.headers[0].children : page.value.headers;
      return __spreadProps(__spreadValues({}, childItem), {
        children: headersToSidebarItemChildren(headers, sidebarDepth)
      });
    }
    return childItem;
  };
  return sidebarConfig.map((item) => handleChildItem(item));
};
const resolveMultiSidebarItems = (sidebarConfig, sidebarDepth) => {
  var _a;
  const route = vueRouter.useRoute();
  const sidebarPath = resolveLocalePath(sidebarConfig, route.path);
  const matchedSidebarConfig = (_a = sidebarConfig[sidebarPath]) !== null && _a !== void 0 ? _a : [];
  return resolveArraySidebarItems(matchedSidebarConfig, sidebarDepth);
};
const useThemeLocaleData = () => useThemeLocaleData$1();
var index = "";
var clientAppEnhance3 = defineClientAppEnhance(({ app, router }) => {
  app.component("Badge", _sfc_main$v);
  app.component("CodeGroup", CodeGroup);
  app.component("CodeGroupItem", _sfc_main$u);
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
var clientAppEnhance4 = ({ app }) => {
  app.component("404", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _404$1;
  }))), app.component("Articles", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Articles$1;
  }))), app.component("Cover", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Cover$1;
  }))), app.component("Detail", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Detail;
  }))), app.component("Footer", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Footer$1;
  }))), app.component("Home", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Home;
  }))), app.component("Layout", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Layout;
  }))), app.component("Meta", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Meta;
  }))), app.component("NavBar", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return NavBar;
  }))), app.component("Page", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Page;
  }))), app.component("Sidebar", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Sidebar;
  })));
};
var clientAppEnhance5 = ({ app }) => {
  app.component("Test", vue.defineAsyncComponent(() => Promise.resolve().then(function() {
    return Test;
  })));
};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$t = {};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs) {
  const _component_Content = vue.resolveComponent("Content");
  _push(`<!--[-->\u8FD9\u662F\u81EA\u5B9A\u4E49\u5E03\u5C40 `);
  _push(serverRenderer.ssrRenderComponent(_component_Content, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../CustomLayout.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
var CustomLayout = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["ssrRender", _sfc_ssrRender$b]]);
const hexToRgba = (hex, opacity) => {
  return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
};
var Cover_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$s = {
  __ssrInlineRender: true,
  props: {
    item: Object
  },
  setup(__props) {
    let isLoaded = vue.ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="img-box" data-v-081be67a><img${serverRenderer.ssrRenderAttr("src", __props.item.frontmatter.cover)} loading="lazy" class="${serverRenderer.ssrRenderClass([{ isImgLoaded: vue.unref(isLoaded) }, "cover"])}" alt="cover" data-v-081be67a></div><div class="${serverRenderer.ssrRenderClass([{ isLoaded: vue.unref(isLoaded) }, "loading"])}" style="${serverRenderer.ssrRenderStyle({ backgroundColor: vue.unref(hexToRgba)(`#${__props.item.frontmatter.primary}`, 0.1) })}" data-v-081be67a></div><!--]-->`);
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Cover.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
var Cover = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-081be67a"]]);
var Cover$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Cover
});
var Articles_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$r = {
  __ssrInlineRender: true,
  setup(__props) {
    const posts = { "power": "artiely", "posts": [{ "text": "artiely", "link": "/posts/2020-3-16-vscode-plugin", "frontmatter": { "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528", "data": "2020-12-29T00:00:00.000Z", "summary": "VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026!## \u56FE\u7247\u9884\u89C8> \u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002!## \u5F69\u8679\u7F29\u8FDB> \u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C ...", "description": "VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026!## \u56FE\u7247\u9884\u89C8> \u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002!## \u5F69\u8679\u7F29\u8FDB> \u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C ...", "author": "artiely", "primary": "25262d", "readTime": "6 min read", "words": 1057, "group": 1, "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033.png", "secondary": "dad9d2", "tag": [], "date": "2022-01-25", "password": false, "base64": "fafafa", "text": "6 min read" }, "id": "a483777a-336a-454a-81b3-11d4b4f64f72" }, { "text": "artiely", "link": "/posts/2021/2020-3-16-chrome-plugin", "frontmatter": { "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC", "data": "2020-12-29T00:00:00.000Z", "summary": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002!\u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84!!\u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49!## \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B ...", "description": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002!\u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84!!\u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49!## \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B ...", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120320.png", "author": "artiely", "primary": "f4f6f6", "secondary": "0b0909", "readTime": "5 min read", "words": 914, "tag": [], "date": "2022-01-25", "password": false, "base64": "fafafa", "text": "5 min read" }, "id": "1d316000-2729-4343-b566-810da4bfb28e" }, { "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1702, "password": false, "base64": "fafafa", "text": "9 min read" }, "id": "09a6e779-eb39-4907-a0bb-671e8554de52" }, { "text": "artiely", "link": "/posts/2021-2-23-proxy", "frontmatter": { "title": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3proxy", "tag": "proxy", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20210223114632.png", "base64": "f0df3d", "author": "artiely", "date": "2021-02-23", "data": "2021-2-23", "summary": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "description": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "primary": "ebdb5b", "secondary": "1424a4", "readTime": "13 min read", "words": 2769, "password": false, "text": "14 min read" }, "id": "64295286-ce51-49c0-9dee-179cb5736cfe" }, { "text": "artiely", "link": "/posts/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": "electron,javascrip", "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "data": "2020-3-18", "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "description": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "readTime": "2 min read", "words": 401, "password": false, "text": "2 min read" }, "id": "07d1c7ed-514f-4bb5-8372-13d83312fdf2" }, { "text": "artiely", "link": "/posts/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": "windows", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "data": "2020-3-16", "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "description": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "author": "artiely", "readTime": "1 min read", "words": 178, "password": false, "text": "1 min read" }, "id": "336e7cbd-0393-4c52-be88-840f46745349" }], "tags": [{ "tag": "\u6653\u9732", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1702, "password": false, "base64": "fafafa", "text": "9 min read" }, "id": "09a6e779-eb39-4907-a0bb-671e8554de52" }] }, { "tag": "\u5BDD\u5B89", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1702, "password": false, "base64": "fafafa", "text": "9 min read" }, "id": "09a6e779-eb39-4907-a0bb-671e8554de52" }] }, { "tag": "\u5178\u7C4D", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1702, "password": false, "base64": "fafafa", "text": "9 min read" }, "id": "09a6e779-eb39-4907-a0bb-671e8554de52" }] }, { "tag": "\u6D45\u4E91", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1702, "password": false, "base64": "fafafa", "text": "9 min read" }, "id": "09a6e779-eb39-4907-a0bb-671e8554de52" }] }, { "tag": "\u900D\u9065", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1702, "password": false, "base64": "fafafa", "text": "9 min read" }, "id": "09a6e779-eb39-4907-a0bb-671e8554de52" }] }, { "tag": "\u79CB\u534A", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1702, "password": false, "base64": "fafafa", "text": "9 min read" }, "id": "09a6e779-eb39-4907-a0bb-671e8554de52" }] }, { "tag": "proxy", "posts": [{ "text": "artiely", "link": "/posts/2021-2-23-proxy", "frontmatter": { "title": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3proxy", "tag": "proxy", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20210223114632.png", "base64": "f0df3d", "author": "artiely", "date": "2021-02-23", "data": "2021-2-23", "summary": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "description": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "primary": "ebdb5b", "secondary": "1424a4", "readTime": "13 min read", "words": 2769, "password": false, "text": "14 min read" }, "id": "64295286-ce51-49c0-9dee-179cb5736cfe" }] }, { "tag": "electron,javascrip", "posts": [{ "text": "artiely", "link": "/posts/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": "electron,javascrip", "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "data": "2020-3-18", "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "description": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "readTime": "2 min read", "words": 401, "password": false, "text": "2 min read" }, "id": "07d1c7ed-514f-4bb5-8372-13d83312fdf2" }] }, { "tag": "windows", "posts": [{ "text": "artiely", "link": "/posts/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": "windows", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "data": "2020-3-16", "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "description": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "author": "artiely", "readTime": "1 min read", "words": 178, "password": false, "text": "1 min read" }, "id": "336e7cbd-0393-4c52-be88-840f46745349" }] }], "timeline": [{ "date": "2022-01-25", "posts": [{ "text": "artiely", "link": "/posts/2020-3-16-vscode-plugin", "frontmatter": { "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528", "data": "2020-12-29T00:00:00.000Z", "summary": "VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026!## \u56FE\u7247\u9884\u89C8> \u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002!## \u5F69\u8679\u7F29\u8FDB> \u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C ...", "description": "VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026!## \u56FE\u7247\u9884\u89C8> \u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002!## \u5F69\u8679\u7F29\u8FDB> \u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C ...", "author": "artiely", "primary": "25262d", "readTime": "6 min read", "words": 1057, "group": 1, "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033.png", "secondary": "dad9d2", "tag": [], "date": "2022-01-25", "password": false, "base64": "fafafa", "text": "6 min read" }, "id": "a483777a-336a-454a-81b3-11d4b4f64f72" }, { "text": "artiely", "link": "/posts/2021/2020-3-16-chrome-plugin", "frontmatter": { "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC", "data": "2020-12-29T00:00:00.000Z", "summary": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002!\u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84!!\u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49!## \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B ...", "description": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002!\u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84!!\u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49!## \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B ...", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120320.png", "author": "artiely", "primary": "f4f6f6", "secondary": "0b0909", "readTime": "5 min read", "words": 914, "tag": [], "date": "2022-01-25", "password": false, "base64": "fafafa", "text": "5 min read" }, "id": "1d316000-2729-4343-b566-810da4bfb28e" }] }, { "date": "2022-01-19", "posts": [{ "text": "artiely", "link": "/posts/2022-1-11md-test", "frontmatter": { "useLayout": "sino", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png", "title": "\u5E38\u7528Markdown\u6F14\u793A", "date": "2022-01-19", "tag": ["\u6653\u9732", "\u5BDD\u5B89", "\u5178\u7C4D", "\u6D45\u4E91", "\u900D\u9065", "\u79CB\u534A"], "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...", "author": "artiely", "primary": "d4d4d4", "secondary": "2b2b2b", "readTime": "7 min read", "words": 1702, "password": false, "base64": "fafafa", "text": "9 min read" }, "id": "09a6e779-eb39-4907-a0bb-671e8554de52" }] }, { "date": "2021-02-23", "posts": [{ "text": "artiely", "link": "/posts/2021-2-23-proxy", "frontmatter": { "title": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3proxy", "tag": "proxy", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20210223114632.png", "base64": "f0df3d", "author": "artiely", "date": "2021-02-23", "data": "2021-2-23", "summary": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "description": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...", "primary": "ebdb5b", "secondary": "1424a4", "readTime": "13 min read", "words": 2769, "password": false, "text": "14 min read" }, "id": "64295286-ce51-49c0-9dee-179cb5736cfe" }] }, { "date": "2020-03-18", "posts": [{ "text": "artiely", "link": "/posts/2020-3-18-electron-mirror-down", "frontmatter": { "primary": "2974d1", "secondary": "d68b2e", "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5", "tag": "electron,javascrip", "author": "Artiely", "date": "2020-03-18", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", "base64": "2e7bd7", "category": "electron", "data": "2020-3-18", "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "description": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...", "readTime": "2 min read", "words": 401, "password": false, "text": "2 min read" }, "id": "07d1c7ed-514f-4bb5-8372-13d83312fdf2" }] }, { "date": "2020-03-16", "posts": [{ "text": "artiely", "link": "/posts/2020-3-16-windows-plugin", "frontmatter": { "primary": "2c62c8", "secondary": "d39d37", "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350", "tag": "windows", "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png", "date": "2020-03-16", "base64": "3260d0", "category": "Tool", "data": "2020-3-16", "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "description": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...", "author": "artiely", "readTime": "1 min read", "words": 178, "password": false, "text": "1 min read" }, "id": "336e7cbd-0393-4c52-be88-840f46745349" }] }] }.posts;
    const link = (link2) => `${link2}.html`;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "article-wrapper" }, _attrs))} data-v-47111f50><!--[-->`);
      serverRenderer.ssrRenderList(vue.unref(posts), (item) => {
        _push(`<article class="article" data-v-47111f50>`);
        if (item.frontmatter) {
          _push(`<div class="poster-wrapper" data-v-47111f50><a${serverRenderer.ssrRenderAttr("href", link(item.link))} data-v-47111f50>`);
          if (item.frontmatter.category) {
            _push(`<div class="category" data-v-47111f50><span class="category-inner" style="${serverRenderer.ssrRenderStyle({
              backgroundColor: vue.unref(hexToRgba)(`#${item.frontmatter.secondary}`, 0.6),
              color: `#${item.frontmatter.primary}`
            })}" data-v-47111f50>${serverRenderer.ssrInterpolate(item.frontmatter.category)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(serverRenderer.ssrRenderComponent(Cover, { item }, null, _parent));
          _push(`</a></div>`);
        } else {
          _push(`<!---->`);
        }
        if (item.frontmatter) {
          _push(`<div class="article-info" data-v-47111f50><h1 class="article-title" data-v-47111f50><a${serverRenderer.ssrRenderAttr("href", link(item.link))} data-v-47111f50>${serverRenderer.ssrInterpolate(item.frontmatter.title)}</a></h1>`);
          if (item.frontmatter.tags) {
            _push(`<div class="article-tags" data-v-47111f50><!--[-->`);
            serverRenderer.ssrRenderList(item.frontmatter.tag, (tag) => {
              _push(`<span class="tag" data-v-47111f50>${serverRenderer.ssrInterpolate(tag)}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="article-con" data-v-47111f50><p class="article-desc" data-v-47111f50>${serverRenderer.ssrInterpolate(item.frontmatter.summary)}</p></div><div class="article-meta" data-v-47111f50><span data-v-47111f50>${serverRenderer.ssrInterpolate(item.frontmatter.date)}</span><span data-v-47111f50>${serverRenderer.ssrInterpolate(item.frontmatter.author)}</span></div><div class="more" data-v-47111f50><span data-v-47111f50>${serverRenderer.ssrInterpolate(item.frontmatter.words)}\u5B57/${serverRenderer.ssrInterpolate(parseInt(item.frontmatter.readTime))}\u5206\u949F</span><span class="read" data-v-47111f50>\u9605\u8BFB\u5168\u6587-&gt;</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Articles.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
var Articles = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-47111f50"]]);
var Articles$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Articles
});
const _sfc_main$q = {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.ssrRenderComponent(Articles, _attrs, null, _parent));
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Home.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
var Home = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$q
});
const __default__ = vue.defineComponent({
  inheritAttrs: false
});
const _sfc_main$p = /* @__PURE__ */ vue.defineComponent(__spreadProps(__spreadValues({}, __default__), {
  __ssrInlineRender: true,
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const route = vueRouter.useRoute();
    const site = useSiteData();
    const { item } = vue.toRefs(props);
    const hasHttpProtocol = vue.computed(() => isLinkHttp(item.value.link));
    const hasNonHttpProtocol = vue.computed(() => isLinkMailto(item.value.link) || isLinkTel(item.value.link));
    const linkTarget = vue.computed(() => {
      if (hasNonHttpProtocol.value)
        return void 0;
      if (item.value.target)
        return item.value.target;
      if (hasHttpProtocol.value)
        return "_blank";
      return void 0;
    });
    const isBlankTarget = vue.computed(() => linkTarget.value === "_blank");
    const isRouterLink = vue.computed(() => !hasHttpProtocol.value && !hasNonHttpProtocol.value && !isBlankTarget.value);
    const linkRel = vue.computed(() => {
      if (hasNonHttpProtocol.value)
        return void 0;
      if (item.value.rel)
        return item.value.rel;
      if (isBlankTarget.value)
        return "noopener noreferrer";
      return void 0;
    });
    const linkAriaLabel = vue.computed(() => item.value.ariaLabel || item.value.text);
    const shouldBeActiveInSubpath = vue.computed(() => {
      const localeKeys = Object.keys(site.value.locales);
      if (localeKeys.length) {
        return !localeKeys.some((key) => key === item.value.link);
      }
      return item.value.link !== "/";
    });
    const isActiveInSubpath = vue.computed(() => {
      if (!shouldBeActiveInSubpath.value) {
        return false;
      }
      return route.path.startsWith(item.value.link);
    });
    const isActive = vue.computed(() => {
      if (!isRouterLink.value) {
        return false;
      }
      if (item.value.activeMatch) {
        return new RegExp(item.value.activeMatch).test(route.path);
      }
      return isActiveInSubpath.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = vue.resolveComponent("RouterLink");
      const _component_ExternalLinkIcon = vue.resolveComponent("ExternalLinkIcon");
      if (vue.unref(isRouterLink)) {
        _push(serverRenderer.ssrRenderComponent(_component_RouterLink, vue.mergeProps({
          class: { "router-link-active": vue.unref(isActive) },
          to: vue.unref(item).link,
          "aria-label": vue.unref(linkAriaLabel)
        }, _ctx.$attrs, _attrs), {
          default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              serverRenderer.ssrRenderSlot(_ctx.$slots, "before", {}, null, _push2, _parent2, _scopeId);
              _push2(` ${serverRenderer.ssrInterpolate(vue.unref(item).text)} `);
              serverRenderer.ssrRenderSlot(_ctx.$slots, "after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                vue.renderSlot(_ctx.$slots, "before"),
                vue.createTextVNode(" " + vue.toDisplayString(vue.unref(item).text) + " ", 1),
                vue.renderSlot(_ctx.$slots, "after")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<a${serverRenderer.ssrRenderAttrs(vue.mergeProps({
          class: "external-link",
          href: vue.unref(item).link,
          rel: vue.unref(linkRel),
          target: vue.unref(linkTarget),
          "aria-label": vue.unref(linkAriaLabel)
        }, _ctx.$attrs, _attrs))}>`);
        serverRenderer.ssrRenderSlot(_ctx.$slots, "before", {}, null, _push, _parent);
        _push(` ${serverRenderer.ssrInterpolate(vue.unref(item).text)} `);
        if (vue.unref(isBlankTarget)) {
          _push(serverRenderer.ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        serverRenderer.ssrRenderSlot(_ctx.$slots, "after", {}, null, _push, _parent);
        _push(`</a>`);
      }
    };
  }
}));
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/AutoLink.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      serverRenderer.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/DropdownTransition.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
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
const resolveRepoType = (repo) => {
  if (!isLinkHttp(repo) || /github\.com/.test(repo))
    return "GitHub";
  if (/bitbucket\.org/.test(repo))
    return "Bitbucket";
  if (/gitlab\.com/.test(repo))
    return "GitLab";
  if (/gitee\.com/.test(repo))
    return "Gitee";
  return null;
};
const editLinkPatterns = {
  GitHub: ":repo/edit/:branch/:path",
  GitLab: ":repo/-/edit/:branch/:path",
  Gitee: ":repo/edit/:branch/:path",
  Bitbucket: ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"
};
const resolveEditLinkPatterns = ({ docsRepo, editLinkPattern }) => {
  if (editLinkPattern) {
    return editLinkPattern;
  }
  const repoType = resolveRepoType(docsRepo);
  if (repoType !== null) {
    return editLinkPatterns[repoType];
  }
  return null;
};
const resolveEditLink = ({ docsRepo, docsBranch, docsDir, filePathRelative, editLinkPattern }) => {
  if (!filePathRelative)
    return null;
  const pattern = resolveEditLinkPatterns({ docsRepo, editLinkPattern });
  if (!pattern)
    return null;
  return pattern.replace(/:repo/, isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`).replace(/:branch/, docsBranch).replace(/:path/, removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`));
};
const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
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
    const { item, depth } = vue.toRefs(props);
    const route = vueRouter.useRoute();
    const router = vueRouter.useRouter();
    const isActive = vue.computed(() => isActiveSidebarItem(item.value, route));
    const itemClass = vue.computed(() => ({
      "sidebar-item": true,
      "sidebar-heading": depth.value === 0,
      "active": isActive.value,
      "collapsible": item.value.collapsible
    }));
    const isOpen = vue.ref(true);
    const onClick = vue.ref(void 0);
    if (item.value.collapsible) {
      isOpen.value = isActive.value;
      onClick.value = () => {
        isOpen.value = !isOpen.value;
      };
      router.afterEach(() => {
        isOpen.value = isActive.value;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_SidebarItem = vue.resolveComponent("SidebarItem", true);
      _push(`<li${serverRenderer.ssrRenderAttrs(_attrs)}>`);
      if (vue.unref(item).link) {
        _push(serverRenderer.ssrRenderComponent(_sfc_main$p, {
          class: vue.unref(itemClass),
          item: vue.unref(item)
        }, null, _parent));
      } else {
        _push(`<p tabindex="0" class="${serverRenderer.ssrRenderClass(vue.unref(itemClass))}">${serverRenderer.ssrInterpolate(vue.unref(item).text)} `);
        if (vue.unref(item).collapsible) {
          _push(`<span class="${serverRenderer.ssrRenderClass([isOpen.value ? "down" : "right", "arrow"])}"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      }
      if ((_a = vue.unref(item).children) == null ? void 0 : _a.length) {
        _push(serverRenderer.ssrRenderComponent(_sfc_main$o, null, {
          default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<ul style="${serverRenderer.ssrRenderStyle(isOpen.value ? null : { display: "none" })}" class="sidebar-item-children"${_scopeId}><!--[-->`);
              serverRenderer.ssrRenderList(vue.unref(item).children, (child) => {
                _push2(serverRenderer.ssrRenderComponent(_component_SidebarItem, {
                  key: `${vue.unref(depth)}${child.text}${child.link}`,
                  item: child,
                  depth: vue.unref(depth) + 1
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></ul>`);
            } else {
              return [
                vue.withDirectives(vue.createVNode("ul", { class: "sidebar-item-children" }, [
                  (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(vue.unref(item).children, (child) => {
                    return vue.openBlock(), vue.createBlock(_component_SidebarItem, {
                      key: `${vue.unref(depth)}${child.text}${child.link}`,
                      item: child,
                      depth: vue.unref(depth) + 1
                    }, null, 8, ["item", "depth"]);
                  }), 128))
                ], 512), [
                  [vue.vShow, isOpen.value]
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</li>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/SidebarItem.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarItems = useSidebarItems();
    return (_ctx, _push, _parent, _attrs) => {
      if (vue.unref(sidebarItems).length) {
        _push(`<ul${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "sidebar-items" }, _attrs))}><!--[-->`);
        serverRenderer.ssrRenderList(vue.unref(sidebarItems), (item) => {
          _push(serverRenderer.ssrRenderComponent(_sfc_main$n, {
            key: item.link || item.text,
            item
          }, null, _parent));
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/SidebarItems.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
var Sidebar_vue_vue_type_style_index_0_lang = "";
const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "dog-sidebar" }, _attrs))}>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(serverRenderer.ssrRenderComponent(_sfc_main$m, null, null, _parent));
      serverRenderer.ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</aside>`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Sidebar.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
var Sidebar = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$l
});
var Meta_vue_vue_type_style_index_0_lang = "";
const _sfc_main$k = {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "theme-box" }, _attrs))}><span class="theme-btn">\u6653\u9732</span><span class="theme-btn">\u5BDD\u5B89</span><span class="theme-btn">\u5178\u7C4D</span><span class="theme-btn">\u6D45\u4E91</span><span class="theme-btn">\u900D\u9065</span><span class="theme-btn">\u79CB\u534A</span><span class="theme-btn">\u5341\u6F3E</span><span class="theme-btn">666</span></div>`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Meta.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
var Meta = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$k
});
var Detail_vue_vue_type_style_index_0_lang = "";
const _sfc_main$j = {
  __ssrInlineRender: true,
  setup(__props) {
    const { useLayout } = usePageData().value.frontmatter || {};
    const frontmatter = usePageData().value.frontmatter || {};
    console.log(usePageData().value);
    vue.onMounted(() => {
      Array.from(document.querySelectorAll(".content")).map((v) => {
        let py = pinyin__default["default"](v.innerText.replace("#", ""), {
          style: pinyin__default["default"].STYLE_NORMAL
        }).join(" ");
        v.setAttribute("pinyin", py);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = vue.resolveComponent("Content");
      _push(`<!--[--><div class="sidebar-box"><div class="con">`);
      _push(serverRenderer.ssrRenderComponent(_sfc_main$k, null, null, _parent));
      _push(serverRenderer.ssrRenderComponent(_sfc_main$l, null, null, _parent));
      _push(`</div></div><div class="page-meta"><h1>${serverRenderer.ssrInterpolate(vue.unref(frontmatter).title)}</h1><p><span class="date">${serverRenderer.ssrInterpolate(vue.unref(dayjs__default["default"])(vue.unref(frontmatter).date).format("YY-MM-DD"))}</span><span class="words">${serverRenderer.ssrInterpolate(vue.unref(frontmatter).words)}\u5B57</span><span class="readTime">${serverRenderer.ssrInterpolate(vue.unref(frontmatter).readTime)}</span></p><p><!--[-->`);
      serverRenderer.ssrRenderList(vue.unref(frontmatter).tag, (tag) => {
        _push(`<span class="tag">${serverRenderer.ssrInterpolate(tag)}</span>`);
      });
      _push(`<!--]--></p><p class="summary">${serverRenderer.ssrInterpolate(vue.unref(frontmatter).summary)}</p></div><div class="${serverRenderer.ssrRenderClass([vue.unref(useLayout), "md-body sino sino-kai"])}"><div class="default-content">`);
      _push(serverRenderer.ssrRenderComponent(_component_Content, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Detail.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
var Detail = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$j
});
const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const themeLocale = useThemeLocaleData();
    const isDarkMode = useDarkMode();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${serverRenderer.ssrRenderAttrs(vue.mergeProps({
        class: "toggle-dark-button",
        title: vue.unref(themeLocale).toggleDarkMode
      }, _attrs))}><svg style="${serverRenderer.ssrRenderStyle(!vue.unref(isDarkMode) ? null : { display: "none" })}" class="icon" focusable="false" viewBox="0 0 32 32"><path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path></svg><svg style="${serverRenderer.ssrRenderStyle(vue.unref(isDarkMode) ? null : { display: "none" })}" class="icon" focusable="false" viewBox="0 0 32 32"><path d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z" fill="currentColor"></path></svg></button>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/ToggleDarkModeButton.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
var NavBar_vue_vue_type_style_index_0_lang = "";
const _sfc_main$h = {
  __ssrInlineRender: true,
  setup(__props) {
    const navBar = [{ "text": "Home", "link": "/" }, { "text": "Foo", "link": "/foo" }];
    const themeLocale = useThemeLocaleData$1();
    const enableDarkMode = vue.computed(() => themeLocale.value.darkMode);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "header" }, _attrs))}><span>light</span><span>dark</span><span>theme1</span><span>theme2</span><span>theme3</span><nav class="nav"><!--[-->`);
      serverRenderer.ssrRenderList(vue.unref(navBar), (item) => {
        _push(`<a${serverRenderer.ssrRenderAttr("href", item.link)} class="link">${serverRenderer.ssrInterpolate(item.text)}</a>`);
      });
      _push(`<!--]-->`);
      if (vue.unref(enableDarkMode)) {
        _push(serverRenderer.ssrRenderComponent(_sfc_main$i, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</nav></header>`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/NavBar.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
var NavBar = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$h
});
var Footer_vue_vue_type_style_index_0_lang = "";
const _sfc_main$g = {};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs) {
  _push(`<footer${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "footer" }, _attrs))}> footer </footer>`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Footer.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
var Footer = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$a]]);
var Footer$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Footer
});
var Layout_vue_vue_type_style_index_0_lang = "";
const _sfc_main$f = {
  __ssrInlineRender: true,
  setup(__props) {
    let dynamic = usePageData().value.path == "/" ? _sfc_main$q : _sfc_main$j;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "dog" }, _attrs))}>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "header", {}, () => {
        _push(serverRenderer.ssrRenderComponent(_sfc_main$h, null, null, _parent));
      }, _push, _parent);
      _push(`<div class="main">`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "main", {}, () => {
        serverRenderer.ssrRenderVNode(_push, vue.createVNode(vue.resolveDynamicComponent(vue.unref(dynamic)), null, null), _parent);
      }, _push, _parent);
      _push(`</div>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "footer", {}, () => {
        _push(serverRenderer.ssrRenderComponent(Footer, null, null, _parent));
      }, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Layout.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
var Layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$f
});
const _sfc_main$e = {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.ssrRenderComponent(_sfc_main$f, _attrs, {
        header: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`header`);
          } else {
            return [
              vue.createTextVNode("header")
            ];
          }
        }),
        main: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`main`);
          } else {
            return [
              vue.createTextVNode("main")
            ];
          }
        }),
        footer: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`footer`);
          } else {
            return [
              vue.createTextVNode("footer")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../CustomHome.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
var clientAppEnhance6 = defineClientAppEnhance(({ app }) => {
  app.component("CustomLayout", CustomLayout);
  app.component("CustomHome", _sfc_main$e);
});
const clientAppEnhances = [
  clientAppEnhance0,
  clientAppEnhance1,
  clientAppEnhance2,
  clientAppEnhance3,
  clientAppEnhance4,
  clientAppEnhance5,
  clientAppEnhance6
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
  ["v-7446daa2", "/foo/", { "title": "foo" }, ["/foo/index.html", "/foo/index.md"]],
  ["v-98df26d6", "/posts/2020-3-16-vscode-plugin.html", { "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528" }, ["/posts/2020-3-16-vscode-plugin", "/posts/2020-3-16-vscode-plugin.md"]],
  ["v-0151cd4a", "/posts/2020-3-16-windows-plugin.html", { "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350" }, ["/posts/2020-3-16-windows-plugin", "/posts/2020-3-16-windows-plugin.md"]],
  ["v-ebe80ef8", "/posts/2020-3-18-electron-mirror-down.html", { "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5" }, ["/posts/2020-3-18-electron-mirror-down", "/posts/2020-3-18-electron-mirror-down.md"]],
  ["v-a36afcfe", "/posts/2021-2-23-proxy.html", { "title": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3proxy" }, ["/posts/2021-2-23-proxy", "/posts/2021-2-23-proxy.md"]],
  ["v-810351b2", "/posts/2022-1-11md-test.html", { "title": "\u5E38\u7528Markdown\u6F14\u793A" }, ["/posts/2022-1-11md-test", "/posts/2022-1-11md-test.md"]],
  ["v-71182a26", "/posts/2021/2020-3-16-chrome-plugin.html", { "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC" }, ["/posts/2021/2020-3-16-chrome-plugin", "/posts/2021/2020-3-16-chrome-plugin.md"]],
  ["v-3706649a", "/404.html", { "title": "" }, ["/404"]],
  ["v-8daa1a0e", "/", { "title": "" }, ["/index.html"]]
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
const historyCreator = vueRouter.createMemoryHistory;
const createVueRouter = () => {
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
    var _a;
    if (to.path !== from.path || from === vueRouter.START_LOCATION) {
      [pageData.value] = await Promise.all([
        resolvers.resolvePageData(to.name),
        (_a = pagesComponents[to.name]) === null || _a === void 0 ? void 0 : _a.__asyncLoader()
      ]);
    }
  });
  return router;
};
const setupGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content);
};
const setupGlobalComputed = (app, router) => {
  const routeLocale = vue.computed(() => resolvers.resolveRouteLocale(siteData.value.locales, router.currentRoute.value.path));
  const siteLocaleData = vue.computed(() => resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value));
  const pageFrontmatter = vue.computed(() => resolvers.resolvePageFrontmatter(pageData.value));
  const pageHeadTitle = vue.computed(() => resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value));
  const pageHead = vue.computed(() => resolvers.resolvePageHead(pageHeadTitle.value, pageFrontmatter.value, siteLocaleData.value));
  const pageLang = vue.computed(() => resolvers.resolvePageLang(pageData.value));
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
const appCreator = vue.createSSRApp;
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
  const router = createVueRouter();
  setupGlobalComponents(app);
  setupGlobalComputed(app, router);
  for (const clientAppEnhance7 of clientAppEnhances) {
    await clientAppEnhance7({ app, router, siteData });
  }
  app.use(router);
  return {
    app,
    router
  };
};
const _sfc_main$d = {};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs) {
  const _component_Test = vue.resolveComponent("Test");
  _push(`<!--[--><h1 id="foo" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#foo" aria-hidden="true">#</a> foo</span><span class="suffix"></span></h1>`);
  _push(serverRenderer.ssrRenderComponent(_component_Test, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/foo/index.html.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
var index_html$4 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$9]]);
var index_html$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": index_html$4
});
const _sfc_main$c = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h1 id="\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528" aria-hidden="true">#</a> \u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528</span><span class="suffix"></span></h1><p>VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01</p><p>\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026</p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033.png" alt=""> \u4F46\u662F\u5462\uFF0CVS Code \u5E76\u4E0D\u662F\u50CF PyCharm/WebStorm \u90A3\u6837\u5F00\u7BB1\u5373\u7528\u7684\uFF0C\u9700\u8981\u989D\u5916\u5B89\u88C5\u4E00\u4E9B\u63D2\u4EF6\u3001\u638C\u63E1\u4E00\u4E9B\u5FEB\u6377\u952E\u548C\u6280\u5DE7\uFF0C\u624D\u80FD\u987A\u624B\u7684\u7528\u8D77\u6765\u3002</p><p>\u6211\u82B1\u4E86\u4E00\u70B9\u65F6\u95F4\uFF0C\u4E3A\u4F60\u6574\u7406\u4E86\u53EF\u80FD\u662F\u524D\u7AEF\u8D85\u597D\u7528\u7684\u63D2\u4EF6\uFF0C\u6548\u7387\u52A0\u500D\u3002</p><h2 id="\u63A8\u8350\u63D2\u4EF6" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u63A8\u8350\u63D2\u4EF6" aria-hidden="true">#</a> \u63A8\u8350\u63D2\u4EF6</span><span class="suffix"></span></h2><h2 id="\u6C49\u5316-vs-code" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u6C49\u5316-vs-code" aria-hidden="true">#</a> \u6C49\u5316 VS code</span><span class="suffix"></span></h2><blockquote class="multiquote-1"><p>\u5B89\u88C5\u4E4B\u540E\u4E00\u79D2\u6C49\u5316 VS code \uFF0C\u518D\u4E5F\u4E0D\u7528\u62C5\u5FC3\u770B\u4E0D\u61C2\u82F1\u6587\u3002 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094539.png" alt=""></p></blockquote><h2 id="\u56FE\u7247\u9884\u89C8" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u56FE\u7247\u9884\u89C8" aria-hidden="true">#</a> \u56FE\u7247\u9884\u89C8</span><span class="suffix"></span></h2><blockquote class="multiquote-1"><p>\u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094818.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094929.png" alt=""></p></blockquote><h2 id="\u5F69\u8679\u7F29\u8FDB" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5F69\u8679\u7F29\u8FDB" aria-hidden="true">#</a> \u5F69\u8679\u7F29\u8FDB</span><span class="suffix"></span></h2><blockquote class="multiquote-1"><p>\u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C\u80FD\u63D0\u793A\u6211\u4EEC\u7684\u7F29\u8FDB\u662F\u5426\u5230\u4F4D\uFF0C\u6BCF\u6B65\u4EA4\u66FF\u56DB\u79CD\u4E0D\u540C\u7684\u989C\u8272\uFF0C\u6CA1\u6709\u5230\u4F4D\u7684\u8BDD\u989C\u8272\u53D8\u7EA2\uFF0C\u770B\u7740\u4EE3\u7801\u6574\u6574\u9F50\u9F50\u7684\u5C31\u5F88\u8212\u5FC3\u3002 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316095145.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316095216.png" alt=""></p></blockquote><h2 id="\u4EE3\u7801\u5206\u4EAB" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u4EE3\u7801\u5206\u4EAB" aria-hidden="true">#</a> \u4EE3\u7801\u5206\u4EAB</span><span class="suffix"></span></h2><blockquote class="multiquote-1"><p>\u53EF\u4EE5\u628A\u4EE3\u7801\u4FDD\u5B58\u6210\u7F8E\u89C2\u7684\u56FE\u7247\uFF0C\u4E3B\u9898\u4E0D\u540C\uFF0C\u4EE3\u7801\u914D\u8272\u65B9\u6848\u4E5F\u4E0D\u540C\uFF0C\u4E5F\u53EF\u4EE5\u81EA\u5DF1\u8BBE\u7F6E\u8FB9\u6846\u989C\u8272\u3001\u5927\u5C0F\u3001\u9634\u5F71\uFF0C\u5728\u6559\u7A0B\u6216\u8005\u6587\u6863\u4E2D\u63D0\u4F9B\u4EE3\u7801\u793A\u4F8B\u65F6\u633A\u6709\u7528\u7684 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316095553.png" alt=""></p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>ctrl<span class="token operator">+</span>shift<span class="token operator">+</span>p
<span class="token comment">//\u7136\u540E\u8F93\u5165polaceode</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316095831.png" alt=""></figure><h2 id="\u5B9E\u65F6\u9884\u89C8" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5B9E\u65F6\u9884\u89C8" aria-hidden="true">#</a> \u5B9E\u65F6\u9884\u89C8</span><span class="suffix"></span></h2><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316101703.png" alt=""></figure><blockquote class="multiquote-1"><p>\u4ED6\u4F1A\u542F\u7528\u4E00\u4E2A\u672C\u5730node\u670D\u52A1\u6258\u7BA1\u4F60\u7684\u8D44\u6E90\uFF0C\u70B9\u51FBgo Live\u9009\u62E9\u4F60\u8981\u8BBF\u95EE\u7684\u8D44\u6E90 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316101814.png" alt=""></p></blockquote><h2 id="\u5FEB\u6377\u952E" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5FEB\u6377\u952E" aria-hidden="true">#</a> \u5FEB\u6377\u952E</span><span class="suffix"></span></h2><blockquote class="multiquote-1"><p>\u8FD9\u4E2A\u53EF\u4EE5\u6839\u636E\u81EA\u5DF1\u7684\u4E60\u60EF\u548C\u559C\u597D\u6765\u51B3\u5B9A\uFF0C\u53EA\u9700\u8981\u662F\u63D2\u4EF6\u5E02\u573A\u8F93\u5165<code>keymap</code>\u5C31\u53EF\u4EE5\u51FA\u6765\u6240\u6709\u7F16\u8F91\u671F\u7684\u5FEB\u6377\u952E\uFF0C\u9009\u62E9\u4F60\u4E60\u60EF\u7684\u5C31ok\u4E86 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316102430.png" alt=""></p></blockquote><h2 id="\u6837\u5F0F\u8F6C\u5B9A\u4E49" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u6837\u5F0F\u8F6C\u5B9A\u4E49" aria-hidden="true">#</a> \u6837\u5F0F\u8F6C\u5B9A\u4E49</span><span class="suffix"></span></h2><blockquote class="multiquote-1"><p><code>ctrl+\u6837\u5F0F\u540D</code>\u5C31\u53EF\u4EE5\u770B\u5230\u5B9A\u4E49\u7684\u6837\u5F0F\uFF0C\u70B9\u51FB\u5C31\u53EF\u8DF3\u8F6C\u5230\u5B9A\u4E49\u7684\u4F4D\u7F6E <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316103846.png" alt=""> \u5982\u679C\u662Fvue\u53EF\u4EE5\u5B89\u88C5 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316103709.png" alt=""></p></blockquote><h2 id="\u989C\u8272\u7A81\u51FA" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u989C\u8272\u7A81\u51FA" aria-hidden="true">#</a> \u989C\u8272\u7A81\u51FA</span><span class="suffix"></span></h2><blockquote class="multiquote-1"><p>\u9AD8\u4EAEjs,css\u91CC\u7684\u989C\u8272\u503C\uFF0C\u8BA9\u4F60\u4E00\u76EE\u4E86\u7136 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316104309.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316104406.png" alt=""></p></blockquote><h2 id="\u62EC\u53F7\u9AD8\u4EAE" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u62EC\u53F7\u9AD8\u4EAE" aria-hidden="true">#</a> \u62EC\u53F7\u9AD8\u4EAE</span><span class="suffix"></span></h2><blockquote class="multiquote-1"><p>\u7A81\u51FA\u4F60\u7684\u62EC\u53F7\u8BA9\u4F60\u4E00\u76EE\u4E86\u7136\u4F60\u7684\u4EE3\u7801\u5757 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316104653.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316104732.png" alt=""></p></blockquote><h2 id="\u4EE3\u7801\u7F8E\u5316" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u4EE3\u7801\u7F8E\u5316" aria-hidden="true">#</a> \u4EE3\u7801\u7F8E\u5316</span><span class="suffix"></span></h2><blockquote class="multiquote-1"><p>\u7528prettier\u683C\u5F0F\u7F8E\u5316\u4EE3\u7801 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316105524.png" alt=""></p></blockquote><h2 id="\u914D\u7F6E\u540C\u6B65" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u914D\u7F6E\u540C\u6B65" aria-hidden="true">#</a> \u914D\u7F6E\u540C\u6B65</span><span class="suffix"></span></h2><blockquote class="multiquote-1"><p>\u53EF\u901A\u8FC7github\u767B\u5F55\u540C\u6B65\u4F60\u7684\u914D\u7F6E\u548C\u63D2\u4EF6 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316110305.png" alt=""></p></blockquote><h3 id="\u4E3B\u9898\u914D\u7F6E" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u4E3B\u9898\u914D\u7F6E" aria-hidden="true">#</a> \u4E3B\u9898\u914D\u7F6E</span><span class="suffix"></span></h3><blockquote class="multiquote-1"><p>\u4E3B\u9898\u662F\u5F88\u4E3B\u89C2\u7684\u9009\u62E9\u5728\u5E02\u573A\u8F93\u5165theme\u5373\u53EF\u8BD5\u7528\u8FD8\u662F\u56FE\u6807\u4E3B\u9898\u52A0\u5165icon\u5173\u952E\u8BCD\u5373\u53EF</p></blockquote><h3 id="\u5FEB\u6377console" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5FEB\u6377console" aria-hidden="true">#</a> \u5FEB\u6377console</span><span class="suffix"></span></h3><blockquote class="multiquote-1"><p>\u8C03\u8BD5\u907F\u514D\u4E0D\u4E86\u6253\u5370\u53D8\u91CF\uFF0C\u6211\u4EEC\u53EA\u9700\u8981\u9009\u62E9\u5BF9\u5E94\u7684\u53D8\u91CF <code>ctrl + alt + L</code> \u5373\u53EF\u8F93\u51FA\u4E00\u53E5console.log <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316110847.png" alt=""></p></blockquote><h3 id="\u5F85\u529E\u9AD8\u4EAE" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5F85\u529E\u9AD8\u4EAE" aria-hidden="true">#</a> \u5F85\u529E\u9AD8\u4EAE</span><span class="suffix"></span></h3><blockquote class="multiquote-1"><p>\u5DE5\u4F5C\u4E2D\u96BE\u514D\u9047\u5230\u4E00\u4E9B\u672A\u5B8C\u6210\u7684\u5F85\u529E\u4E8B\u9879 \u53EF\u4EE5\u901A\u8FC7\u5199\u6CE8\u91CA\u7684\u5F62\u5F0F\u63D0\u9192\u81EA\u5DF1 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316111512.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316111609.png" alt=""></p></blockquote><h3 id="\u5F15\u5165\u4F53\u79EF" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5F15\u5165\u4F53\u79EF" aria-hidden="true">#</a> \u5F15\u5165\u4F53\u79EF</span><span class="suffix"></span></h3><blockquote class="multiquote-1"><p>\u53EF\u4EE5\u8BA9\u4F60\u77E5\u9053\u5F15\u5165\u7684\u4F53\u79EF\u5927\u5C0F\uFF0C\u8C03\u6574\u5F15\u5165\u4F7F\u4EE3\u7801\u4F53\u79EF\u66F4\u5C0F <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316113433.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316113649.png" alt=""> \u4F18\u5316\u5F15\u5165\u540E\uFF0C\u4E00\u76EE\u4E86\u7136 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316113742.png" alt=""></p></blockquote><p>\u5F85\u7EED.</p><!--]-->`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/posts/2020-3-16-vscode-plugin.html.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
var _2020316VscodePlugin_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$8]]);
var _2020316VscodePlugin_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2020316VscodePlugin_html$1
});
const _sfc_main$b = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  const _component_ExternalLinkIcon = vue.resolveComponent("ExternalLinkIcon");
  _push(`<!--[--><h1 id="windows-\u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#windows-\u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350" aria-hidden="true">#</a> windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350</span><span class="suffix"></span></h1><h2 id="wox" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#wox" aria-hidden="true">#</a> wox</span><span class="suffix"></span></h2><p>\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002 <code>ctrl+space(\u7A7A\u683C)</code><a href="http://www.wox.one/" target="_blank" rel="noopener noreferrer">\u5B98\u7F51`);
  _push(serverRenderer.ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a></p><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316185052.png" alt=""></figure><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316185130.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316202637.png" alt=""></p><h2 id="picgo" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#picgo" aria-hidden="true">#</a> picgo</span><span class="suffix"></span></h2><p>\u56FE\u7247\u7BA1\u7406\u65B0\u4F53\u9A8C <a href="https://molunerfinn.com/PicGo/" target="_blank" rel="noopener noreferrer">\u5B98\u7F51`);
  _push(serverRenderer.ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316202718.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316202844.png" alt=""></p><h2 id="typora" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#typora" aria-hidden="true">#</a> typora</span><span class="suffix"></span></h2><p>markdown\u4E66\u5199\u65B0\u4F53\u9A8C <a href="https://www.typora.io/" target="_blank" rel="noopener noreferrer">\u5B98\u7F51`);
  _push(serverRenderer.ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316203133.png" alt=""></p><p>\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo\u914D\u5408\u4F7F\u7528\uFF0C\u8BA9md\u7684\u56FE\u7247\u66F4\u597D\u7684\u7BA1\u7406\u3002</p><p>\u5F85\u7EED.</p><!--]-->`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/posts/2020-3-16-windows-plugin.html.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
var _2020316WindowsPlugin_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$7]]);
var _2020316WindowsPlugin_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2020316WindowsPlugin_html$1
});
const _sfc_main$a = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h1 id="electron-\u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#electron-\u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5" aria-hidden="true">#</a> Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5</span><span class="suffix"></span></h1><p>\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200318131627.png" alt=""> \u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1\u5230100\u591Ak\u3002\u800C\u8FD9\u4E2A\u5305\u6709\u5DEE\u4E0D\u591A 50MB\uFF0C\u53EF\u60F3\u800C\u77E5\uFF0C\u5982\u679C\u662F\u4EE5\u51E0k\u7684\u9F9F\u901F\uFF0C\u4E0D\u77E5\u9053\u8981\u4E0B\u8F7D\u5230\u7334\u5E74\u9A6C\u6708\u3002</p><h2 id="\u5C06npm\u5305\u4E0B\u8F7D\u5730\u5740\u6539\u4E3A\u6DD8\u5B9D\u5730\u5740" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5C06npm\u5305\u4E0B\u8F7D\u5730\u5740\u6539\u4E3A\u6DD8\u5B9D\u5730\u5740" aria-hidden="true">#</a> \u5C06npm\u5305\u4E0B\u8F7D\u5730\u5740\u6539\u4E3A\u6DD8\u5B9D\u5730\u5740</span><span class="suffix"></span></h2><h3 id="\u5168\u5C40\u8BBE\u7F6E\u4E0B\u8F7D\u6E90" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5168\u5C40\u8BBE\u7F6E\u4E0B\u8F7D\u6E90" aria-hidden="true">#</a> \u5168\u5C40\u8BBE\u7F6E\u4E0B\u8F7D\u6E90</span><span class="suffix"></span></h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://npm.taobao.org/mirrors/node
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="\u4E0B\u8F7Dnode\u6E90\u7801\u52A0\u901F" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u4E0B\u8F7Dnode\u6E90\u7801\u52A0\u901F" aria-hidden="true">#</a> \u4E0B\u8F7Dnode\u6E90\u7801\u52A0\u901F</span><span class="suffix"></span></h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> config <span class="token builtin class-name">set</span> disturl https://npm.taobao.org/mirrors/node
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="\u5C06electron\u7684\u5730\u5740\u6CE8\u518C\u4E3A\u6DD8\u5B9D\u5730\u5740" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5C06electron\u7684\u5730\u5740\u6CE8\u518C\u4E3A\u6DD8\u5B9D\u5730\u5740" aria-hidden="true">#</a> \u5C06electron\u7684\u5730\u5740\u6CE8\u518C\u4E3A\u6DD8\u5B9D\u5730\u5740</span><span class="suffix"></span></h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> config <span class="token builtin class-name">set</span> ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u4EE5\u4E0A\u4E2A\u4EBA\u4EB2\u6D4B\u6709\u6548\uFF0C\u6700\u91CD\u8981\u7684\u662F\u540E\u9762\u4E24\u6B65\u3002</p><!--]-->`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/posts/2020-3-18-electron-mirror-down.html.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
var _2020318ElectronMirrorDown_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$6]]);
var _2020318ElectronMirrorDown_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2020318ElectronMirrorDown_html$1
});
const _sfc_main$9 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h1 id="\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3-proxy" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3-proxy" aria-hidden="true">#</a> \u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy</span><span class="suffix"></span></h1><p><strong>\u52A0\u7C97</strong> \u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7<a href="/post/2020/2020-9-2-proxy">proxy \u7684\u6DF1\u5165\u7406\u89E3</a>\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0B<code>proxy</code>\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3<code>proxy</code>\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~</p><p>\u7531\u4FED\u5165\u5962</p><h3 id="\u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE-get-set" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE-get-set" aria-hidden="true">#</a> \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09</span><span class="suffix"></span></h3><p>\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570<code>tracePropAccess(obj, propKeys</code>)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002\u5728\u4EE5\u4E0B\u4EE3\u7801\u4E2D\uFF0C\u6211\u4EEC\u5C06\u8BE5\u51FD\u6570\u5E94\u7528\u4E8E\u7C7B\u7684\u5B9E\u4F8B Point\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Point(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>y<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u8FFD\u8E2A\u5C5E\u6027 \`x\` and \`y\`</span>
p <span class="token operator">=</span> <span class="token function">tracePropAccess</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&quot;x&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;y&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>\u6211\u4EEC\u5E0C\u671B\u8BBE\u7F6E\u6216\u83B7\u53D6\u5C5E\u6027\u65F6\u5F97\u5230\u4EE5\u4E0B\u6548\u679C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token operator">&gt;</span> p<span class="token punctuation">.</span>x
<span class="token constant">GET</span> x
<span class="token number">5</span>
<span class="token operator">&gt;</span> p<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">21</span>
<span class="token constant">SET</span> x<span class="token operator">=</span><span class="token number">21</span>
<span class="token number">21</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u57FA\u4E8E<code>proxy</code>\u7684\u7B80\u5355\u5B9E\u73B0</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">tracePropAccess</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> propKeys</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> propKeySet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>propKeys<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>propKeySet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>propKey<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;GET &quot;</span> <span class="token operator">+</span> propKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>propKeySet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>propKey<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;SET &quot;</span> <span class="token operator">+</span> propKey <span class="token operator">+</span> <span class="token string">&quot;=&quot;</span> <span class="token operator">+</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>\u57FA\u4E8E\u4EE5\u4E0A\u6211\u4EEC\u53EF\u4EE5\u5B9E\u73B0\u65E5\u5FD7\u6253\u5370\uFF0C\u6570\u636E\u7EDF\u8BA1\u7B49</p><h3 id="\u83B7\u53D6\u672A\u77E5\u5C5E\u6027\u7684\u8B66\u544A" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u83B7\u53D6\u672A\u77E5\u5C5E\u6027\u7684\u8B66\u544A" aria-hidden="true">#</a> \u83B7\u53D6\u672A\u77E5\u5C5E\u6027\u7684\u8B66\u544A</span><span class="suffix"></span></h3><p>\u5728\u8BBF\u95EE\u5C5E\u6027\u65F6\uFF0CJavaScript \u975E\u5E38\u5BBD\u5BB9\u3002\u4F8B\u5982\uFF0C\u5982\u679C\u60A8\u5C1D\u8BD5\u8BFB\u53D6\u5C5E\u6027\u5E76\u62FC\u5199\u9519\u8BEF\u7684\u540D\u79F0\uFF0C\u5219\u4E0D\u4F1A\u5F97\u5230\u5F02\u5E38\uFF0C\u800C\u4F1A\u5F97\u5230\u7ED3\u679C<code>undefined</code>\u3002\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528\u4EE3\u7406\u83B7\u53D6\u4F8B\u5916\u3002\u5176\u5DE5\u4F5C\u539F\u7406\u5982\u4E0B\u3002\u6211\u4EEC\u4F7F\u4EE3\u7406\u6210\u4E3A\u5BF9\u8C61\u7684\u539F\u578B\u3002</p><p>\u5982\u679C\u5728\u5BF9\u8C61\u4E2D\u627E\u4E0D\u5230\u5C5E\u6027\uFF0Cget \u5219\u4F1A\u89E6\u53D1\u3002\u5982\u679C\u8BE5\u5C5E\u6027\u751A\u81F3\u5728\u4EE3\u7406\u4E4B\u540E\u7684\u539F\u578B\u94FE\u4E2D\u4E0D\u5B58\u5728\uFF0C\u5219\u4F1A\u5F15\u53D1\u5F02\u5E38\u3002\u5426\u5219\uFF0C\u6211\u4EEC\u8FD4\u56DE\u7EE7\u627F\u5C5E\u6027\u7684\u503C\u3002\u6211\u4EEC\u5C06\u64CD\u4F5C\u8F6C\u53D1\u5230\u76EE\u6807\uFF08\u76EE\u6807\u7684\u539F\u578B\u4E5F\u662F\u4EE3\u7406\u7684\u539F\u578B\uFF09\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> PropertyChecker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>
  <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>propKey <span class="token keyword">in</span> target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ReferenceError</span><span class="token punctuation">(</span><span class="token string">&quot;Unknown property: &quot;</span> <span class="token operator">+</span> propKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u8BA9\u6211\u4EEC\u4F7F\u7528<code>PropertyChecker</code>\u521B\u5EFA\u7684\u5BF9\u8C61\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token operator">&gt;</span> <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">__proto__</span><span class="token operator">:</span> PropertyChecker<span class="token punctuation">,</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">123</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token operator">&gt;</span> obj<span class="token punctuation">.</span>foo  <span class="token comment">// \u81EA\u5DF1\u7684\u5C5E\u6027</span>
<span class="token number">123</span>
<span class="token operator">&gt;</span> obj<span class="token punctuation">.</span>fo
<span class="token literal-property property">ReferenceError</span><span class="token operator">:</span> Unknown property<span class="token operator">:</span> fo
<span class="token operator">&gt;</span> obj<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// \u7EE7\u627F\u7684\u65B9\u6CD5</span>
<span class="token string">&#39;[object Object]&#39;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u5982\u679C\u6211\u4EEC<code>PropertyChecker</code>\u4F7F\u7528\u6784\u9020\u51FD\u6570\uFF0C\u5219\u53EF\u4EE5\u901A\u8FC7 extends \u7EE7\u627F\u7C7B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">PropertyChecker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">PropertyChecker</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>
  <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>propKey <span class="token keyword">in</span> target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ReferenceError</span><span class="token punctuation">(</span><span class="token string">&quot;Unknown property: &quot;</span> <span class="token operator">+</span> propKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token keyword">extends</span> <span class="token class-name">PropertyChecker</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>z<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="\u8D1F\u6570\u7EC4\u7D22\u5F15-get" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u8D1F\u6570\u7EC4\u7D22\u5F15-get" aria-hidden="true">#</a> \u8D1F\u6570\u7EC4\u7D22\u5F15\uFF08get\uFF09</span><span class="suffix"></span></h3><p>\u67D0\u4E9B Array \u65B9\u6CD5\u53EF\u8BA9\u60A8\u901A\u8FC7\u5F15\u7528-1 \u83B7\u5F97\u6700\u540E\u4E00\u4E2A\u5143\u7D20\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span>\uFF0C<span class="token string">&#39;b&#39;</span>\uFF0C<span class="token string">&#39;c&#39;</span><span class="token punctuation">]</span>\u3002slice\uFF08<span class="token operator">-</span><span class="token number">1</span>\uFF09
<span class="token punctuation">[</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u901A\u8FC7\u65B9\u62EC\u53F7\u8FD0\u7B97\u7B26\uFF08<code>[]</code>\uFF09\u8BBF\u95EE\u5143\u7D20\u65F6\uFF0C\u8BE5\u65B9\u6CD5\u4E0D\u8D77\u4F5C\u7528\u3002\u4F46\u662F\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u4EE3\u7406\u6765\u6DFB\u52A0\u8BE5\u529F\u80FD\u3002\u4EE5\u4E0B\u51FD\u6570<code>createArray()</code>\u521B\u5EFA\u652F\u6301\u8D1F\u7D22\u5F15\u7684\u6570\u7EC4\u3002\u5B83\u901A\u8FC7\u5C06\u4EE3\u7406\u5305\u88C5 Array \u5B9E\u4F8B\u6765\u5B9E\u73B0\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createArray</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>elements</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span>propKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        propKey <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>target<span class="token punctuation">.</span>length <span class="token operator">+</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> target <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  target<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>elements<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token function">createArray</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// c</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="\u6570\u636E\u7ED1\u5B9A" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u6570\u636E\u7ED1\u5B9A" aria-hidden="true">#</a> \u6570\u636E\u7ED1\u5B9A</span><span class="suffix"></span></h3><p>\u6570\u636E\u7ED1\u5B9A\u662F\u5173\u4E8E\u5BF9\u8C61\u4E4B\u95F4\u7684\u6570\u636E\u540C\u6B65\u3002\u6216\u7528\u4E8E\u4E00\u79CD\u6D41\u884C\u7684\u57FA\u4E8E MVC \u6A21\u5F0F\u7684\u5E93</p><p>\u5E38\u89C1\u7684\u6709 vue,immer,mobx,...</p><p>\u8981\u5B9E\u73B0\u6570\u636E\u7ED1\u5B9A\uFF0C\u60A8\u5FC5\u987B\u89C2\u5BDF\u5E76\u54CD\u5E94\u5BF9\u5BF9\u8C61\u6240\u505A\u7684\u66F4\u6539\u3002\u5728\u4E0B\u9762\u7684\u4EE3\u7801\u7247\u6BB5\u4E2D\uFF0C\u6211\u6982\u8FF0\u4E86\u89C2\u5BDF\u66F4\u6539\u5BF9\u6570\u7EC4\u7684\u5DE5\u4F5C\u65B9\u5F0F\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createObservedArray</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propertyKey<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">callback</span><span class="token punctuation">(</span>propertyKey<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propertyKey<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> observedArray <span class="token operator">=</span> <span class="token function">createObservedArray</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
observedArray<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="\u8BBF\u95EE-restful-\u63A5\u53E3\u670D\u52A1" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u8BBF\u95EE-restful-\u63A5\u53E3\u670D\u52A1" aria-hidden="true">#</a> \u8BBF\u95EE RESTful \u63A5\u53E3\u670D\u52A1</span><span class="suffix"></span></h3><p>\u4EE3\u7406\u53EF\u7528\u4E8E\u521B\u5EFA\u53EF\u4EE5\u5728\u5176\u4E0A\u8C03\u7528\u4EFB\u610F\u65B9\u6CD5\u7684\u5BF9\u8C61\u3002\u5728\u4EE5\u4E0B\u793A\u4F8B\u4E2D\uFF0C\u8BE5\u51FD\u6570<code>createWebService</code>\u521B\u5EFA\u4E00\u4E2A\u8FD9\u6837\u7684\u5BF9\u8C61<code>service</code>\u3002\u8C03\u7528<code>service</code>\u65B9\u6CD5\uFF0C\u68C0\u7D22\u5177\u6709\u76F8\u540C\u540D\u79F0\u7684 Web \u670D\u52A1\u8D44\u6E90\u7684\u5185\u5BB9\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>
<span class="token keyword">const</span> service <span class="token operator">=</span> <span class="token function">createWebService</span><span class="token punctuation">(</span><span class="token string">&#39;http://example.com/data&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u8BFB\u53D6json\u6570\u636E http://example.com/data/employees</span>
service<span class="token punctuation">.</span><span class="token function">employees</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">json</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> employees <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
    \xB7\xB7\xB7
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><code>createWebService</code> \u5B9E\u73B0</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createWebService</span><span class="token punctuation">(</span><span class="token parameter">baseUrl</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">httpGet</span><span class="token punctuation">(</span>baseUrl <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">+</span> propKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><code>httpGet</code> \u5B9E\u73B0</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">httpGet</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token function">onload</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>statusText<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">onerror</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&quot;XMLHttpRequest Error: &quot;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>statusText<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    request<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    request<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><ul><li>\u53E6\u4E00\u79CD\u5B9E\u73B0</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token constant">METHODS</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;http&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> api <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>
  <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> method <span class="token operator">=</span> <span class="token constant">METHODS</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">method</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        propKey<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>method<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> path <span class="token operator">=</span>
        <span class="token string">&quot;/&quot;</span> <span class="token operator">+</span>
        propKey
          <span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>method<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">([a-z])([A-Z])</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&quot;$1/$2&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&quot;/$/&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> finalPath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> args<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> queryOrBody <span class="token operator">=</span> args<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> finalPath<span class="token punctuation">,</span> queryOrBody<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">fetch</span><span class="token punctuation">(</span>finalPath<span class="token punctuation">,</span> <span class="token punctuation">{</span> method<span class="token punctuation">,</span> <span class="token literal-property property">body</span><span class="token operator">:</span> queryOrBody <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// GET /</span>
api<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// GET /users</span>
api<span class="token punctuation">.</span><span class="token function">getUsers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// GET /users/1234/likes</span>
api<span class="token punctuation">.</span><span class="token function">getUsers$Likes</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// GET /users/1234/likes?page=2</span>
api<span class="token punctuation">.</span><span class="token function">getUsers$Likes</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">page</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// POST /items with body</span>
api<span class="token punctuation">.</span><span class="token function">postItems</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Item name&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// api.foobar is not a function</span>
api<span class="token punctuation">.</span><span class="token function">foobar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><ul><li>\u518D\u6765\u4E00\u79CD</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> handlers <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> property<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>target<span class="token punctuation">.</span>init<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u521D\u59CB\u5316\u5BF9\u8C61</span>
      <span class="token punctuation">[</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">method</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        target<span class="token punctuation">[</span>method<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> params <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token string-property property">&quot;content-type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;cors&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">credentials</span><span class="token operator">:</span> <span class="token string">&quot;same-origin&quot;</span><span class="token punctuation">,</span>
            method<span class="token punctuation">,</span>
            <span class="token operator">...</span>params<span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> target<span class="token punctuation">[</span>property<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token constant">API</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> handlers<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> <span class="token constant">API</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">(</span><span class="token string">&quot;XXX&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> <span class="token constant">API</span><span class="token punctuation">.</span><span class="token constant">POST</span><span class="token punctuation">(</span><span class="token string">&quot;XXX&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><ul><li>\u6709\u8DA3\u7684\u65B9\u5F0F</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> www <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">&quot;https://www&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> o <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prop<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;\u{1F680} ~ file: 2021-2-23-proxy.md ~ line 21 ~ get ~ o&quot;</span><span class="token punctuation">,</span> o<span class="token punctuation">,</span> prop<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> o <span class="token operator">===</span> <span class="token string">&quot;function&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">o</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> prop <span class="token operator">!==</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> o<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prop <span class="token operator">===</span> <span class="token string">&quot;then&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token function">fetch</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    target <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    target<span class="token punctuation">.</span>hostname <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">.</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>prop<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> get<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">{</span> get <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBF\u95EE\u767E\u5EA6</span>
www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ==&gt; 200</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u4F7F\u7528 async/await \u8BED\u6CD5\uFF1A</span>
<span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;foo/1111&quot;</span><span class="token punctuation">;</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>ok<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ==&gt; true</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ==&gt; 200</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h3 id="\u64A4\u9500\u5F15\u7528" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u64A4\u9500\u5F15\u7528" aria-hidden="true">#</a> \u64A4\u9500\u5F15\u7528</span><span class="suffix"></span></h3><p>\u53EF\u64A4\u9500\u5F15\u7528\u7684\u5DE5\u4F5C\u65B9\u5F0F\u5982\u4E0B\uFF1A \u4E0D\u5141\u8BB8\u7528\u6237\u76F4\u63A5\u8BBF\u95EE\u5BF9\u8C61\u5C5E\u6027\uFF08\u6216\u8005\u8F6C\u53D1\u4F60\u7684\u670D\u52A1\u5668\u8D44\u6E90\uFF09\uFF0C\u7528\u6237\u5B8C\u6210\u5F15\u7528\u540E\uFF0C\u901A\u8FC7\u64A4\u6D88\u5F15\u7528\uFF08\u5C06\u5176\u5173\u95ED\uFF09\u6765\u4FDD\u62A4\u8D44\u6E90\u3002\u6B64\u540E\uFF0C\u518D\u5F15\u7528\u5C06\u5F15\u53D1\u5F02\u5E38\uFF0C\u5E76\u4E14\u4E0D\u518D\u8F6C\u53D1\u4EFB\u4F55\u5185\u5BB9\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> resource <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">8</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> reference<span class="token punctuation">,</span> revoke <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">createRevocableReference</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u5F15\u7528\u6388\u6743</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reference<span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 11</span>
<span class="token comment">// \u64A4\u9500</span>
<span class="token function">revoke</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reference<span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeError: Revoked</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>\u4EE3\u7406\u975E\u5E38\u9002\u5408\u5B9E\u73B0\u53EF\u64A4\u9500\u5F15\u7528\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u53EF\u4EE5\u62E6\u622A\u548C\u8F6C\u53D1\u64CD\u4F5C\u3002\u8FD9\u662F\u57FA\u4E8E\u4EE3\u7406\u7684\u7B80\u5355\u5B9E\u73B0<code>createRevocableReference</code>\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createRevocableReference</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">reference</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>enabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&#39;Revoked&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token function">has</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> propKey</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>enabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&#39;Revoked&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            \xB7\xB7\xB7
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">revoke</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>\u7B80\u5316</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createRevocableReference</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> handler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token function">get</span><span class="token punctuation">(</span>dummyTarget<span class="token punctuation">,</span> trapName<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>enabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&quot;Revoked&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> Reflect<span class="token punctuation">[</span>trapName<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">reference</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">revoke</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>\u4E0D\u8FC7\u6211\u4EEC\u4E0D\u5FC5\u81EA\u5DF1\u5B9E\u73B0\u64A4\u9500\uFF0C\u56E0\u4E3A <code>proxy</code> \u81EA\u5E26\u6539\u65B9\u6CD5</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createRevocableReference</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// {} \u5C31\u4F1A\u8F6C\u53D1\u6240\u6709</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> proxy<span class="token punctuation">,</span> revoke <span class="token punctuation">}</span> <span class="token operator">=</span> Proxy<span class="token punctuation">.</span><span class="token function">revocable</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">reference</span><span class="token operator">:</span> proxy<span class="token punctuation">,</span> revoke <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="\u521B\u5EFA\u7C7B\u578B\u68C0\u67E5" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u521B\u5EFA\u7C7B\u578B\u68C0\u67E5" aria-hidden="true">#</a> \u521B\u5EFA\u7C7B\u578B\u68C0\u67E5</span><span class="suffix"></span></h3><p>\u9632\u6B62\u7528\u6237\u8F93\u5165\u4E0D\u5408\u6CD5</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Artiely&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> typeSafePerson <span class="token operator">=</span> <span class="token function">createTypeSafeObject</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>

typeSafePerson<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;Mike&quot;</span><span class="token punctuation">;</span> <span class="token comment">// ok</span>
typeSafePerson<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span> <span class="token comment">// ok</span>
typeSafePerson<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token string">&quot;red&quot;</span><span class="token punctuation">;</span> <span class="token comment">// throws an error, different types</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>\u53EA\u9700\u7B80\u5355\u7684\u5224\u65AD\u5F53\u524D\u8D4B\u503C\u7684\u7C7B\u578B\u662F\u5426\u7B49\u4E8E\u4E0A\u6B21\u7684\u7C7B\u578B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createTypeSafeObject</span><span class="token punctuation">(</span><span class="token parameter">object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>object<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> property<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> currentType <span class="token operator">=</span> <span class="token keyword">typeof</span> target<span class="token punctuation">[</span>property<span class="token punctuation">]</span><span class="token punctuation">,</span>
        newType <span class="token operator">=</span> <span class="token keyword">typeof</span> value<span class="token punctuation">;</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>property <span class="token keyword">in</span> target <span class="token operator">&amp;&amp;</span> currentType <span class="token operator">!==</span> newType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
          <span class="token string">&quot;Property &quot;</span> <span class="token operator">+</span> property <span class="token operator">+</span> <span class="token string">&quot; must be a &quot;</span> <span class="token operator">+</span> currentType <span class="token operator">+</span> <span class="token string">&quot;.&quot;</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        target<span class="token punctuation">[</span>property<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="\u5B57\u6BB5\u6821\u9A8C" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5B57\u6BB5\u6821\u9A8C" aria-hidden="true">#</a> \u5B57\u6BB5\u6821\u9A8C</span><span class="suffix"></span></h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token function">validator</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token string">&quot;young&quot;</span><span class="token punctuation">;</span> <span class="token comment">// throws an error</span>
p<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span> <span class="token comment">// throws an error</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">validator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span><span class="token punctuation">(</span>target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> props<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>props <span class="token operator">===</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Number<span class="token punctuation">.</span><span class="token function">isInteger</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> value <span class="token operator">&gt;</span> <span class="token number">200</span> <span class="token operator">||</span> value <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&quot;age should be an integer between 0 and 150&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        target<span class="token punctuation">[</span>props<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="\u7EA7\u8054\u5C5E\u6027" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u7EA7\u8054\u5C5E\u6027" aria-hidden="true">#</a> \u7EA7\u8054\u5C5E\u6027</span><span class="suffix"></span></h3><p>\u6570\u636E\u5BF9\u5E94\u5173\u7CFB</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>JavaScript Street  <span class="token operator">--</span>  <span class="token number">232200</span>
Python Street <span class="token operator">--</span> <span class="token number">234422</span>
Golang Street <span class="token operator">--</span> <span class="token number">231142</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u4E24\u7EC4\u6620\u5C04\u5173\u7CFB\u8868</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> location2postcode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&quot;JavaScript Street&quot;</span><span class="token operator">:</span> <span class="token number">232200</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;Python Street&quot;</span><span class="token operator">:</span> <span class="token number">234422</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;Golang Street&quot;</span><span class="token operator">:</span> <span class="token number">231142</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> postcode2location <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&quot;232200&quot;</span><span class="token operator">:</span> <span class="token string">&quot;JavaScript Street&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;234422&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Python Street&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;231142&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Golang Street&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u4F7F\u7528\u793A\u4F8B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Jon&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token function">postcodeValidate</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
p<span class="token punctuation">.</span>postcode <span class="token operator">=</span> <span class="token number">232200</span>
p<span class="token punctuation">.</span>location
<span class="token operator">&gt;</span>JavaScript Street
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u5B9E\u73B0</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">postcodeValidate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">set</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> property<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>property <span class="token operator">===</span> <span class="token string">&quot;location&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span>postcode <span class="token operator">=</span> location2postcode<span class="token punctuation">[</span>value<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>property <span class="token operator">===</span> <span class="token string">&quot;postcode&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span>location <span class="token operator">=</span> postcode2location<span class="token punctuation">[</span>value<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="\u79C1\u6709\u5316\u5C5E\u6027" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u79C1\u6709\u5316\u5C5E\u6027" aria-hidden="true">#</a> \u79C1\u6709\u5316\u5C5E\u6027</span><span class="suffix"></span></h3><p>\u4F7F\u5E26\u6709<code>_</code>\u7684\u5C5E\u6027\u79C1\u6709\u5316\uFF0C\u5916\u754C\u4E0D\u53EF\u8BBF\u95EE,\u5982\u4E0B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;artiely&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">_age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> objProxy <span class="token operator">=</span> <span class="token function">setPrivateField</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span>_age<span class="token punctuation">;</span> <span class="token comment">//undefined</span>
_age <span class="token keyword">in</span> objProxy<span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">setPrivateField</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> prefix <span class="token operator">=</span> <span class="token string">&quot;_&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">has</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> prop <span class="token operator">===</span> <span class="token string">&quot;string&quot;</span> <span class="token operator">&amp;&amp;</span> prop<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> prop <span class="token keyword">in</span> obj<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">ownKeys</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">ownKeys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span><span class="token parameter">prop</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">typeof</span> prop <span class="token operator">!==</span> <span class="token string">&quot;string&quot;</span> <span class="token operator">||</span> <span class="token operator">!</span>prop<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> prop <span class="token operator">===</span> <span class="token string">&quot;string&quot;</span> <span class="token operator">&amp;&amp;</span> prop<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="\u65E5\u5FD7\u6253\u5370" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u65E5\u5FD7\u6253\u5370" aria-hidden="true">#</a> \u65E5\u5FD7\u6253\u5370</span><span class="suffix"></span></h3><h3 id="\u4EE3\u7406\u5C5E\u6027\u67E5\u627E" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u4EE3\u7406\u5C5E\u6027\u67E5\u627E" aria-hidden="true">#</a> \u4EE3\u7406\u5C5E\u6027\u67E5\u627E</span><span class="suffix"></span></h3><p>\u8D77\u56E0</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;artiely&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// undefined</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> props <span class="token keyword">in</span> target <span class="token operator">?</span> target<span class="token punctuation">[</span>props<span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token string">&quot;\u672A\u8BBE\u7F6E\u503C&quot;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;artiely&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u672A\u8BBE\u7F6E\u7684\u503C</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="\u76D1\u542C\u6BCF\u4E2A\u5F02\u6B65\u7684\u8FC7\u7A0B" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u76D1\u542C\u6BCF\u4E2A\u5F02\u6B65\u7684\u8FC7\u7A0B" aria-hidden="true">#</a> \u76D1\u542C\u6BCF\u4E2A\u5F02\u6B65\u7684\u8FC7\u7A0B</span><span class="suffix"></span></h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> logUpdate <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;log-update&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> asciichart <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;asciichart&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chalk <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;chalk&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> Measured <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;measured&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> timer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Measured<span class="token punctuation">.</span>Timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> history <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">120</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
history<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">monitor</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> propKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> origMethod <span class="token operator">=</span> target<span class="token punctuation">[</span>propKey<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>origMethod<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> stopwatch <span class="token operator">=</span> timer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">origMethod</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">out</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> n <span class="token operator">=</span> stopwatch<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          history<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          history<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span> out<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> service <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">callService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">50</span> <span class="token operator">+</span> <span class="token number">50</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> monitoredService <span class="token operator">=</span> <span class="token function">monitor</span><span class="token punctuation">(</span>service<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  monitoredService
    <span class="token punctuation">.</span><span class="token function">callService</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> fields <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;min&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;max&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;sum&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;variance&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;mean&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;count&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;median&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> histogram <span class="token operator">=</span> timer<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>histogram<span class="token punctuation">;</span>
      <span class="token keyword">const</span> lines <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
        <span class="token operator">...</span>fields<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>
          <span class="token punctuation">(</span><span class="token parameter">field</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
            chalk<span class="token punctuation">.</span><span class="token function">cyan</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;: &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>histogram<span class="token punctuation">[</span>field<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token function">logUpdate</span><span class="token punctuation">(</span>asciichart<span class="token punctuation">.</span><span class="token function">plot</span><span class="token punctuation">(</span>history<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">+</span> lines<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br></div></div><h3 id="\u7F13\u5B58" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u7F13\u5B58" aria-hidden="true">#</a> \u7F13\u5B58</span><span class="suffix"></span></h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">cacheTarget</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> ttl <span class="token operator">=</span> <span class="token number">60</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token constant">CREATED_AT</span> <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token function-variable function">isExpired</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token constant">CREATED_AT</span> <span class="token operator">&gt;</span> ttl <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token function">isExpired</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">undefined</span> <span class="token operator">:</span> target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> cache <span class="token operator">=</span> <span class="token function">cacheTarget</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">25</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">6</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//\u8FD0\u884C\u7ED3\u679C\u5982\u4E0B:</span>
<span class="token number">25</span><span class="token punctuation">;</span>
<span class="token keyword">undefined</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="\u8BA1\u7B97\u5C5E\u6027" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u8BA1\u7B97\u5C5E\u6027" aria-hidden="true">#</a> \u8BA1\u7B97\u5C5E\u6027</span><span class="suffix"></span></h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> bankAccount <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">balance</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Artiely&quot;</span><span class="token punctuation">,</span>
  <span class="token keyword">get</span> <span class="token function">dollars</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BA1\u7B97\u7F8E\u5143&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>balance <span class="token operator">*</span> <span class="token number">0.1547</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> cache <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">currentBalance</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">currentValue</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prop <span class="token operator">===</span> <span class="token string">&quot;dollars&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> value <span class="token operator">=</span>
        cache<span class="token punctuation">.</span>currentBalance <span class="token operator">!==</span> obj<span class="token punctuation">.</span>balance <span class="token operator">?</span> obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">:</span> cache<span class="token punctuation">.</span>currentValue<span class="token punctuation">;</span>

      cache<span class="token punctuation">.</span>currentValue <span class="token operator">=</span> value<span class="token punctuation">;</span>
      cache<span class="token punctuation">.</span>currentBalance <span class="token operator">=</span> obj<span class="token punctuation">.</span>balance<span class="token punctuation">;</span>

      <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> wrappedBankAcount <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>bankAccount<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wrappedBankAcount<span class="token punctuation">.</span>dollars<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wrappedBankAcount<span class="token punctuation">.</span>dollars<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wrappedBankAcount<span class="token punctuation">.</span>dollars<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wrappedBankAcount<span class="token punctuation">.</span>dollars<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// OUTPUT:</span>
<span class="token comment">// \u8BA1\u7B97\u7F8E\u5143</span>
<span class="token comment">// 34.3008459</span>
<span class="token comment">// 34.3008459</span>
<span class="token comment">// 34.3008459</span>
<span class="token comment">// 34.3008459</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><!--]-->`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/posts/2021-2-23-proxy.html.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var _2021223Proxy_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$5]]);
var _2021223Proxy_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2021223Proxy_html$1
});
const _sfc_main$8 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  const _component_ExternalLinkIcon = vue.resolveComponent("ExternalLinkIcon");
  const _component_CodeGroup = vue.resolveComponent("CodeGroup");
  const _component_CodeGroupItem = vue.resolveComponent("CodeGroupItem");
  _push(`<!--[--><h1 id="\u5E38\u7528-markdown-\u6F14\u793A" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5E38\u7528-markdown-\u6F14\u793A" aria-hidden="true">#</a> \u5E38\u7528 Markdown \u6F14\u793A</span><span class="suffix"></span></h1><p><strong>\u52A0\u7C97</strong></p><blockquote class="multiquote-1"><p>$\\underline{\u5982\u65E0\u5FC5\u8981\uFF0C\u52FF\u589E\u5B9E\u4F53}$</p></blockquote><section class="table-container"><table><thead><tr><th>\u5E8F\u53F7</th><th>\u8868\u8FF0</th><th>\u4F5C\u8005</th><th>\u65F6\u671F</th><th>\u5E74\u4EE3</th><th>\u9274\u8D4F</th></tr></thead><tbody><tr><td>01</td><td>\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002</td><td>\u738B\u52C3</td><td>\u5510</td><td>650 \u5E74 \u2014 676 \u5E74</td><td>\u843D\u971E\u4E0E\u5B64\u9E5C\u9F50\u98DE\uFF0C\u79CB\u6C34\u5171\u957F\u5929\u4E00\u8272</td></tr><tr><td>01</td><td>\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002</td><td>\u738B\u52C3</td><td>\u5510</td><td>650 \u5E74 \u2014 676 \u5E74</td><td>\u843D\u971E\u4E0E\u5B64\u9E5C\u9F50\u98DE\uFF0C\u79CB\u6C34\u5171\u957F\u5929\u4E00\u8272</td></tr></tbody></table></section><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png" alt=""></figure><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/20220124184408.png" alt=""></figure><div class="custom-container tip"><p class="custom-container-title">\u6807\u9898</p><p>\u8FD9\u662F\u662F\u4F60</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> bar <span class="token operator">=</span> <span class="token string">&quot;bar&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div><h2 id="\u6ED5\u738B\u9601\u5E8F" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u6ED5\u738B\u9601\u5E8F" aria-hidden="true">#</a> \u6ED5\u738B\u9601\u5E8F</span><span class="suffix"></span></h2><p class="sino-meta sino-small"> \u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510 </p><p>\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD\u5B97\uFF1B\u7D2B\u7535\u9752\u971C\uFF0C\u738B\u5C06\u519B\u4E4B\u6B66\u5E93\u3002\u5BB6\u541B\u4F5C\u5BB0\uFF0C\u8DEF\u51FA\u540D\u533A\uFF1B\u7AE5\u5B50\u4F55\u77E5\uFF0C\u8EAC\u9022\u80DC\u996F\u3002</p><p>\u65F6\u7EF4\u4E5D\u6708\uFF0C\u5E8F\u5C5E\u4E09\u79CB\u3002\u6F66\u6C34\u5C3D\u800C\u5BD2\u6F6D\u6E05\uFF0C\u70DF\u5149\u51DD\u800C\u66AE\u5C71\u7D2B\u3002\u4FE8\u9A96\u9A11\u4E8E\u4E0A\u8DEF\uFF0C\u8BBF\u98CE\u666F\u4E8E\u5D07\u963F\uFF1B\u4E34\u5E1D\u5B50\u4E4B\u957F\u6D32\uFF0C\u5F97\u5929\u4EBA\u4E4B\u65E7\u9986\u3002\u5C42\u5CE6\u8038\u7FE0\uFF0C\u4E0A\u51FA\u91CD\u9704\uFF1B\u98DE\u9601\u6D41\u4E39\uFF0C\u4E0B\u4E34\u65E0\u5730\u3002\u9E64\u6C40\u51EB\u6E1A\uFF0C\u7A77\u5C9B\u5C7F\u4E4B\u8426\u56DE\uFF1B\u6842\u6BBF\u5170\u5BAB\uFF0C\u5373\u5188\u5CE6\u4E4B\u4F53\u52BF\u3002</p><p>\u62AB\u7EE3\u95FC\uFF0C\u4FEF\u96D5\u750D\uFF0C\u5C71\u539F\u65F7\u5176\u76C8\u89C6\uFF0C\u5DDD\u6CFD\u7EA1\u5176\u9A87\u77A9\u3002\u95FE\u960E\u6251\u5730\uFF0C\u949F\u9E23\u9F0E\u98DF\u4E4B\u5BB6\uFF1B\u8238\u8230\u5F25\u6D25\uFF0C\u9752\u96C0\u9EC4\u9F99\u4E4B\u8233\u3002\u4E91\u9500\u96E8\u9701\uFF0C\u5F69\u5F7B\u533A\u660E\u3002\u843D\u971E\u4E0E\u5B64\u9E5C\u9F50\u98DE\uFF0C\u79CB\u6C34\u5171\u957F\u5929\u4E00\u8272\u3002\u6E14\u821F\u5531\u665A\uFF0C\u54CD\u7A77\u5F6D\u8821\u4E4B\u6EE8\uFF1B\u96C1\u9635\u60CA\u5BD2\uFF0C\u58F0\u65AD\u8861\u9633\u4E4B\u6D66\u3002</p><p>\u9065\u895F\u752B\u7545\uFF0C\u9038\u5174\u9044\u98DE\u3002\u723D\u7C41\u53D1\u800C\u6E05\u98CE\u751F\uFF0C\u7EA4\u6B4C\u51DD\u800C\u767D\u4E91\u904F\u3002\u7762\u56ED\u7EFF\u7AF9\uFF0C\u6C14\u51CC\u5F6D\u6CFD\u4E4B\u6A3D\uFF1B\u90BA\u6C34\u6731\u534E\uFF0C\u5149\u7167\u4E34\u5DDD\u4E4B\u7B14\u3002\u56DB\u7F8E\u5177\uFF0C\u4E8C\u96BE\u5E76\u3002\u7A77\u7747\u7704\u4E8E\u4E2D\u5929\uFF0C\u6781\u5A31\u6E38\u4E8E\u6687\u65E5\u3002\u5929\u9AD8\u5730\u8FE5\uFF0C\u89C9\u5B87\u5B99\u4E4B\u65E0\u7A77\uFF1B\u5174\u5C3D\u60B2\u6765\uFF0C\u8BC6\u76C8\u865A\u4E4B\u6709\u6570\u3002\u671B\u957F\u5B89\u4E8E\u65E5\u4E0B\uFF0C\u76EE\u5434\u4F1A\u4E8E\u4E91\u95F4\u3002\u5730\u52BF\u6781\u800C\u5357\u6E9F\u6DF1\uFF0C\u5929\u67F1\u9AD8\u800C\u5317\u8FB0\u8FDC\u3002\u5173\u5C71\u96BE\u8D8A\uFF0C\u8C01\u60B2\u5931\u8DEF\u4E4B\u4EBA\uFF1F\u840D\u6C34\u76F8\u9022\uFF0C\u5C3D\u662F\u4ED6\u4E61\u4E4B\u5BA2\u3002\u6000\u5E1D\u960D\u800C\u4E0D\u89C1\uFF0C\u5949\u5BA3\u5BA4\u4EE5\u4F55\u5E74\uFF1F</p><p>\u55DF\u4E4E\uFF01\u65F6\u8FD0\u4E0D\u9F50\uFF0C\u547D\u9014\u591A\u821B\u3002\u51AF\u5510\u6613\u8001\uFF0C\u674E\u5E7F\u96BE\u5C01\u3002\u5C48\u8D3E\u8C0A\u4E8E\u957F\u6C99\uFF0C\u975E\u65E0\u5723\u4E3B\uFF1B\u7A9C\u6881\u9E3F\u4E8E\u6D77\u66F2\uFF0C\u5C82\u4E4F\u660E\u65F6\uFF1F\u6240\u8D56\u541B\u5B50\u89C1\u673A\uFF0C\u8FBE\u4EBA\u77E5\u547D\u3002\u8001\u5F53\u76CA\u58EE\uFF0C\u5B81\u79FB\u767D\u9996\u4E4B\u5FC3\uFF1F\u7A77\u4E14\u76CA\u575A\uFF0C\u4E0D\u5760\u9752\u4E91\u4E4B\u5FD7\u3002\u914C\u8D2A\u6CC9\u800C\u89C9\u723D\uFF0C\u5904\u6DB8\u8F99\u4EE5\u72B9\u6B22\u3002\u5317\u6D77\u867D\u8D4A\uFF0C\u6276\u6447\u53EF\u63A5\uFF1B\u4E1C\u9685\u5DF2\u901D\uFF0C\u6851\u6986\u975E\u665A\u3002\u5B5F\u5C1D\u9AD8\u6D01\uFF0C\u7A7A\u4F59\u62A5\u56FD\u4E4B\u60C5\uFF1B\u962E\u7C4D\u7316\u72C2\uFF0C\u5C82\u6548\u7A77\u9014\u4E4B\u54ED\uFF01</p><p>\u52C3\uFF0C\u4E09\u5C3A\u5FAE\u547D\uFF0C\u4E00\u4ECB\u4E66\u751F\u3002\u65E0\u8DEF\u8BF7\u7F28\uFF0C\u7B49\u7EC8\u519B\u4E4B\u5F31\u51A0\uFF1B\u6709\u6000\u6295\u7B14\uFF0C\u6155\u5B97\u60AB\u4E4B\u957F\u98CE\u3002\u820D\u7C2A\u7B0F\u4E8E\u767E\u9F84\uFF0C\u5949\u6668\u660F\u4E8E\u4E07\u91CC\u3002\u975E\u8C22\u5BB6\u4E4B\u5B9D\u6811\uFF0C\u63A5\u5B5F\u6C0F\u4E4B\u82B3\u90BB\u3002\u4ED6\u65E5\u8D8B\u5EAD\uFF0C\u53E8\u966A\u9CA4\u5BF9\uFF1B\u4ECA\u5179\u6367\u8882\uFF0C\u559C\u6258\u9F99\u95E8\u3002\u6768\u610F\u4E0D\u9022\uFF0C\u629A\u51CC\u4E91\u800C\u81EA\u60DC\uFF1B\u949F\u671F\u65E2\u9047\uFF0C\u594F\u6D41\u6C34\u4EE5\u4F55\u60ED\uFF1F</p><p>\u545C\u4E4E\uFF01\u80DC\u5730\u4E0D\u5E38\uFF0C\u76DB\u7B75\u96BE\u518D\uFF1B\u5170\u4EAD\u5DF2\u77E3\uFF0C\u6893\u6CFD\u4E18\u589F\u3002\u4E34\u522B\u8D60\u8A00\uFF0C\u5E78\u627F\u6069\u4E8E\u4F1F\u996F\uFF1B\u767B\u9AD8\u4F5C\u8D4B\uFF0C\u662F\u6240\u671B\u4E8E\u7FA4\u516C\u3002\u6562\u7AED\u9119\u6000\uFF0C\u606D\u758F\u77ED\u5F15\uFF1B\u4E00\u8A00\u5747\u8D4B\uFF0C\u56DB\u97F5\u4FF1\u6210\u3002\u8BF7\u6D12\u6F58\u6C5F\uFF0C\u5404\u503E\u9646\u6D77\u4E91\u5C14\uFF1A</p><p>\u6ED5\u738B\u9AD8\u9601\u4E34\u6C5F\u6E1A\uFF0C\u4F69\u7389\u9E23\u9E3E\u7F62\u6B4C\u821E\u3002</p><p>\u753B\u680B\u671D\u98DE\u5357\u6D66\u4E91\uFF0C\u73E0\u5E18\u66AE\u5377\u897F\u5C71\u96E8\u3002</p><p>\u95F2\u4E91\u6F6D\u5F71\u65E5\u60A0\u60A0\uFF0C\u7269\u6362\u661F\u79FB\u51E0\u5EA6\u79CB\u3002</p><p>\u9601\u4E2D\u5E1D\u5B50\u4ECA\u4F55\u5728\uFF1F\u69DB\u5916\u957F\u6C5F\u7A7A\u81EA\u6D41\u3002</p><h2 id="\u5F15\u7528\u5982\u4E0B" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5F15\u7528\u5982\u4E0B" aria-hidden="true">#</a> \u5F15\u7528\u5982\u4E0B\uFF1A</span><span class="suffix"></span></h2><blockquote class="multiquote-1"><p>\u62AB\u7EE3\u95FC\uFF0C\u4FEF\u96D5\u750D\uFF0C\u5C71\u539F\u65F7\u5176\u76C8\u89C6\uFF0C\u5DDD\u6CFD\u7EA1\u5176\u9A87\u77A9\u3002\u95FE\u960E\u6251\u5730\uFF0C\u949F\u9E23\u9F0E\u98DF\u4E4B\u5BB6\uFF1B\u8238\u8230\u5F25\u6D25\uFF0C\u9752\u96C0\u9EC4\u9F99\u4E4B\u8233\u3002\u4E91\u9500\u96E8\u9701\uFF0C\u5F69\u5F7B\u533A\u660E\u3002\u843D\u971E\u4E0E\u5B64\u9E5C\u9F50\u98DE\uFF0C\u79CB\u6C34\u5171\u957F\u5929\u4E00\u8272\u3002\u6E14\u821F\u5531\u665A\uFF0C\u54CD\u7A77\u5F6D\u8821\u4E4B\u6EE8\uFF1B\u96C1\u9635\u60CA\u5BD2\uFF0C\u58F0\u65AD\u8861\u9633\u4E4B\u6D66\u3002</p></blockquote><h2 id="\u94FE\u63A5" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u94FE\u63A5" aria-hidden="true">#</a> \u94FE\u63A5</span><span class="suffix"></span></h2><p><a href="https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax" target="_blank" rel="noopener noreferrer">Markdown \u8BED\u6CD5\u4ECB\u7ECD`);
  _push(serverRenderer.ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a></p><h3 id="\u56FE\u7247\u94FE\u63A5" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u56FE\u7247\u94FE\u63A5" aria-hidden="true">#</a> \u56FE\u7247\u94FE\u63A5</span><span class="suffix"></span></h3><p>\u56FE\u7247\u8FD8\u53EF\u4EE5\u548C\u94FE\u63A5\u5D4C\u5957\u4F7F\u7528\uFF0C\u80FD\u591F\u5B9E\u73B0\u63A8\u8350\u5361\u7247\u7684\u6548\u679C\uFF0C\u7528\u6CD5\u5982\u4E0B\uFF1A</p><figure><a href="https://artiely.gitee.io" target="_blank" rel="noopener noreferrer"><img src="https://gitee.com/artiely/Figure-bed/raw/master/image-20220114095443199.png" alt="">`);
  _push(serverRenderer.ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a><figcaption>\u94FE\u63A5\u548C\u56FE\u7247\u5D4C\u5957</figcaption></figure><p><s>\u8FD9\u662F\u8981\u88AB\u5220\u9664\u7684\u5185\u5BB9\u3002</s></p><h3 id="\u56FE\u7247" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u56FE\u7247" aria-hidden="true">#</a> \u56FE\u7247</span><span class="suffix"></span></h3><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/image-20220114095443199.png" alt=""><figcaption>\u8FD9\u91CC\u5199\u56FE\u7247\u63CF\u8FF0</figcaption></figure><h2 id="\u4EE3\u7801" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u4EE3\u7801" aria-hidden="true">#</a> \u4EE3\u7801</span><span class="suffix"></span></h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token comment">// FileName: HelloWorld.java</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token punctuation">{</span>
  <span class="token comment">// Java \u5165\u53E3\u7A0B\u5E8F\uFF0C\u7A0B\u5E8F\u4ECE\u6B64\u5165\u53E3</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello,World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u5411\u63A7\u5236\u53F0\u6253\u5370\u4E00\u6761\u8BED\u53E5</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u652F\u6301\u4EE5\u4E0B\u8BED\u8A00\u79CD\u7C7B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>bash
clojure\uFF0Ccpp\uFF0Ccs\uFF0Ccss
dart\uFF0Cdockerfile, diff
erlang
go\uFF0Cgradle\uFF0Cgroovy
haskell
java\uFF0Cjavascript\uFF0Cjson\uFF0Cjulia
kotlin
lisp\uFF0Clua
makefile\uFF0Cmarkdown\uFF0Cmatlab
objectivec
perl\uFF0Cphp\uFF0Cpython
r\uFF0Cruby\uFF0Crust
scala\uFF0Cshell\uFF0Csql\uFF0Cswift
tex\uFF0Ctypescript
verilog\uFF0Cvhdl
xml
yaml
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="diff-\u6548\u679C" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#diff-\u6548\u679C" aria-hidden="true">#</a> diff \u6548\u679C</span><span class="suffix"></span></h3><div class="language-diff ext-diff line-numbers-mode"><pre class="language-diff"><code><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> \u65B0\u589E\u9879
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> \u5220\u9664\u9879
</span></span></code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="\u81EA\u5B9A\u4E49\u5BB9\u5668" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u5BB9\u5668" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49\u5BB9\u5668</span><span class="suffix"></span></h2><p><strong>\u8F93\u5165</strong></p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>::: tip
\u8FD9\u662F\u4E00\u4E2A\u63D0\u793A
:::

::: warning
\u8FD9\u662F\u4E00\u4E2A\u8B66\u544A
:::

::: danger
\u8FD9\u662F\u4E00\u4E2A\u5371\u9669\u8B66\u544A
:::

::: details
\u8FD9\u662F\u4E00\u4E2A details \u6807\u7B7E
:::
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>\u8F93\u51FA</strong></p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>\u8FD9\u662F\u4E00\u4E2A\u63D0\u793A</p></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>\u8FD9\u662F\u4E00\u4E2A\u8B66\u544A</p></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>\u8FD9\u662F\u4E00\u4E2A\u5371\u9669\u8B66\u544A</p></div><details class="custom-container details"><p>\u8FD9\u662F\u4E00\u4E2A details \u6807\u7B7E</p></details><ul><li>\u793A\u4F8B 2 \uFF08\u81EA\u5B9A\u4E49\u6807\u9898\uFF09\uFF1A</li></ul><p><strong>\u8F93\u5165</strong></p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>::: danger STOP
\u5371\u9669\u533A\u57DF\uFF0C\u7981\u6B62\u901A\u884C
:::

::: details \u70B9\u51FB\u67E5\u770B\u4EE3\u7801

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span>
<span class="token code-block language-js language-js">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F60\u597D\uFF0CVuePress\uFF01&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>\u8F93\u51FA</strong></p><div class="custom-container danger"><p class="custom-container-title">STOP</p><p>\u5371\u9669\u533A\u57DF\uFF0C\u7981\u6B62\u901A\u884C</p></div><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u4EE3\u7801</summary><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F60\u597D\uFF0CVuePress\uFF01&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></details><h3 id="\u4EE3\u7801\u7EC4" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u4EE3\u7801\u7EC4" aria-hidden="true">#</a> \u4EE3\u7801\u7EC4</span><span class="suffix"></span></h3><p><strong>\u8F93\u5165</strong></p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>:::: code-group
::: code-group-item FOO

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span>
<span class="token code-block language-js language-js"><span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token string">&quot;foo&quot;</span><span class="token punctuation">;</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::
::: code-group-item BAR

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span>
<span class="token code-block language-js language-js"><span class="token keyword">const</span> bar <span class="token operator">=</span> <span class="token string">&quot;bar&quot;</span><span class="token punctuation">;</span></span>
<span class="token punctuation">\`\`\`</span></span>

:::
::::
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><strong>\u8F93\u51FA</strong></p>`);
  _push(serverRenderer.ssrRenderComponent(_component_CodeGroup, null, {
    default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.ssrRenderComponent(_component_CodeGroupItem, { title: "FOO" }, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="language-javascript ext-js line-numbers-mode"${_scopeId2}><pre class="language-javascript"${_scopeId2}><code${_scopeId2}><span class="token keyword"${_scopeId2}>const</span> foo <span class="token operator"${_scopeId2}>=</span> <span class="token string"${_scopeId2}>&quot;foo&quot;</span><span class="token punctuation"${_scopeId2}>;</span>
</code></pre><div class="line-numbers"${_scopeId2}><span class="line-number"${_scopeId2}>1</span><br${_scopeId2}></div></div>`);
            } else {
              return [
                vue.createVNode("div", { class: "language-javascript ext-js line-numbers-mode" }, [
                  vue.createVNode("pre", { class: "language-javascript" }, [
                    vue.createVNode("code", null, [
                      vue.createVNode("span", { class: "token keyword" }, "const"),
                      vue.createTextVNode(" foo "),
                      vue.createVNode("span", { class: "token operator" }, "="),
                      vue.createTextVNode(),
                      vue.createVNode("span", { class: "token string" }, '"foo"'),
                      vue.createVNode("span", { class: "token punctuation" }, ";"),
                      vue.createTextVNode("\n")
                    ])
                  ]),
                  vue.createVNode("div", { class: "line-numbers" }, [
                    vue.createVNode("span", { class: "line-number" }, "1"),
                    vue.createVNode("br")
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(serverRenderer.ssrRenderComponent(_component_CodeGroupItem, { title: "BAR" }, {
          default: vue.withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="language-javascript ext-js line-numbers-mode"${_scopeId2}><pre class="language-javascript"${_scopeId2}><code${_scopeId2}><span class="token keyword"${_scopeId2}>const</span> bar <span class="token operator"${_scopeId2}>=</span> <span class="token string"${_scopeId2}>&quot;bar&quot;</span><span class="token punctuation"${_scopeId2}>;</span>
</code></pre><div class="line-numbers"${_scopeId2}><span class="line-number"${_scopeId2}>1</span><br${_scopeId2}></div></div>`);
            } else {
              return [
                vue.createVNode("div", { class: "language-javascript ext-js line-numbers-mode" }, [
                  vue.createVNode("pre", { class: "language-javascript" }, [
                    vue.createVNode("code", null, [
                      vue.createVNode("span", { class: "token keyword" }, "const"),
                      vue.createTextVNode(" bar "),
                      vue.createVNode("span", { class: "token operator" }, "="),
                      vue.createTextVNode(),
                      vue.createVNode("span", { class: "token string" }, '"bar"'),
                      vue.createVNode("span", { class: "token punctuation" }, ";"),
                      vue.createTextVNode("\n")
                    ])
                  ]),
                  vue.createVNode("div", { class: "line-numbers" }, [
                    vue.createVNode("span", { class: "line-number" }, "1"),
                    vue.createVNode("br")
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          vue.createVNode(_component_CodeGroupItem, { title: "FOO" }, {
            default: vue.withCtx(() => [
              vue.createVNode("div", { class: "language-javascript ext-js line-numbers-mode" }, [
                vue.createVNode("pre", { class: "language-javascript" }, [
                  vue.createVNode("code", null, [
                    vue.createVNode("span", { class: "token keyword" }, "const"),
                    vue.createTextVNode(" foo "),
                    vue.createVNode("span", { class: "token operator" }, "="),
                    vue.createTextVNode(),
                    vue.createVNode("span", { class: "token string" }, '"foo"'),
                    vue.createVNode("span", { class: "token punctuation" }, ";"),
                    vue.createTextVNode("\n")
                  ])
                ]),
                vue.createVNode("div", { class: "line-numbers" }, [
                  vue.createVNode("span", { class: "line-number" }, "1"),
                  vue.createVNode("br")
                ])
              ])
            ]),
            _: 1
          }),
          vue.createVNode(_component_CodeGroupItem, { title: "BAR" }, {
            default: vue.withCtx(() => [
              vue.createVNode("div", { class: "language-javascript ext-js line-numbers-mode" }, [
                vue.createVNode("pre", { class: "language-javascript" }, [
                  vue.createVNode("code", null, [
                    vue.createVNode("span", { class: "token keyword" }, "const"),
                    vue.createTextVNode(" bar "),
                    vue.createVNode("span", { class: "token operator" }, "="),
                    vue.createTextVNode(),
                    vue.createVNode("span", { class: "token string" }, '"bar"'),
                    vue.createVNode("span", { class: "token punctuation" }, ";"),
                    vue.createTextVNode("\n")
                  ])
                ]),
                vue.createVNode("div", { class: "line-numbers" }, [
                  vue.createVNode("span", { class: "line-number" }, "1"),
                  vue.createVNode("br")
                ])
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/posts/2022-1-11md-test.html.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var _2022111mdTest_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$4]]);
var _2022111mdTest_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2022111mdTest_html$1
});
const _sfc_main$7 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h1 id="\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC" aria-hidden="true">#</a> \u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC</span><span class="suffix"></span></h1><h2 id="\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B" aria-hidden="true">#</a> \u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B</span><span class="suffix"></span></h2><p>\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002</p><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120320.png" alt=""></figure><p>\u5982\u56FE\u6211\u4EEC\u4E0B\u8F7D\u4E0B\u6765\u53EF\u4EE5\u76F4\u63A5\u70B9\u51FB\u5C31\u5B89\u88C5\u4E86\u3002</p><p>\u5982\u679C\u5B89\u88C5\u5931\u8D25\uFF0C\u5C06\u4E0B\u8F7D\u5305\u590D\u5236\u5230\u4E00\u4E2A\u6307\u5B9A\u7684\u6587\u4EF6\u5939\uFF0C\u91CD\u547D\u540D\u5E76\u89E3\u538B\u3002</p><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316121739.png" alt=""></figure><p>\u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84</p><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316143153.png" alt=""></figure><p>\u89E3\u538B\u540E\u53EF\u4EE5\u5220\u9664\u538B\u7F29\u5305</p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316122002.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316121904.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316121936.png" alt=""></p><p>\u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49</p><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316122132.png" alt=""></figure><h2 id="\u5E7F\u544A\u62E6\u622A" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5E7F\u544A\u62E6\u622A" aria-hidden="true">#</a> \u5E7F\u544A\u62E6\u622A</span><span class="suffix"></span></h2><p>\u53BB\u6B7B\u5427\uFF01\u72D7\u76AE\u818F\u836F\u3002</p><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316122902.png" alt=""></figure><h2 id="\u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55" aria-hidden="true">#</a> \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55</span><span class="suffix"></span></h2><p>\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B</p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316124229.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316124309.png" alt=""></p><h2 id="\u53EF\u4EE5\u6574\u7406\u4F60\u7684\u6807\u7B7E-\u63A8\u8350" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u53EF\u4EE5\u6574\u7406\u4F60\u7684\u6807\u7B7E-\u63A8\u8350" aria-hidden="true">#</a> \u53EF\u4EE5\u6574\u7406\u4F60\u7684\u6807\u7B7E&lt;\u63A8\u8350&gt;</span><span class="suffix"></span></h2><p>\u6742\u4E71\u6807\u7B7E\u5206\u7C7B\u7BA1\u7406</p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316125321.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316125224.png" alt=""></p><h2 id="\u6269\u5C55\u7A0B\u5E8F\u7BA1\u7406" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u6269\u5C55\u7A0B\u5E8F\u7BA1\u7406" aria-hidden="true">#</a> \u6269\u5C55\u7A0B\u5E8F\u7BA1\u7406</span><span class="suffix"></span></h2><p>\u8F7B\u677E\u7BA1\u7406\u6269\u5C55\u7A0B\u5E8F\u7684\u5F00\u5173</p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316131243.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316131321.png" alt=""></p><h2 id="\u56FE\u7247\u4E0B\u8F7D" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u56FE\u7247\u4E0B\u8F7D" aria-hidden="true">#</a> \u56FE\u7247\u4E0B\u8F7D</span><span class="suffix"></span></h2><p>\u6240\u6709\u56FE\u7247\u8F7B\u677E\u4E0B\u8F7D</p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316131845.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316131919.png" alt=""></p><h2 id="\u5212\u8BCD" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u5212\u8BCD" aria-hidden="true">#</a> \u5212\u8BCD</span><span class="suffix"></span></h2><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316132631.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316132547.png" alt=""></p><h2 id="\u524D\u7AEF\u5F00\u53D1\u52A9\u624B" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u524D\u7AEF\u5F00\u53D1\u52A9\u624B" aria-hidden="true">#</a> \u524D\u7AEF\u5F00\u53D1\u52A9\u624B</span><span class="suffix"></span></h2><p>\u96C6\u6210\u4E86\u524D\u7AEF\u5E38\u7528\u5DE5\u5177</p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316143527.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316143448.png" alt=""></p><h2 id="\u4F18\u5316github\u6587\u4EF6\u76EE\u5F55" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u4F18\u5316github\u6587\u4EF6\u76EE\u5F55" aria-hidden="true">#</a> \u4F18\u5316github\u6587\u4EF6\u76EE\u5F55</span><span class="suffix"></span></h2><p>\u53EF\u4EE5\u8BA9\u4F60\u8BBF\u95EE\u7684github\u9879\u76EE\u7ED3\u6784\u5728\u5DE6\u8FB9\u6E05\u6670\u5C55\u793A\u65B9\u4FBF\u67E5\u9605</p><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316144651.png" alt=""></figure><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316144736.png" alt=""></figure><h2 id="\u4F18\u5316github\u4E0B\u8F7D" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u4F18\u5316github\u4E0B\u8F7D" aria-hidden="true">#</a> \u4F18\u5316github\u4E0B\u8F7D</span><span class="suffix"></span></h2><p>\u53EF\u4EE5\u5355\u72EC\u4E0B\u8F7D\u67D0\u4E2A\u6587\u4EF6</p><p><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316145036.png" alt=""> \u901A\u8FC7\u53CC\u51FB\u9009\u62E9\u8981\u4E0B\u8F7D\u7684\u6587\u4EF6</p><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200316145214.png" alt=""></figure><h2 id="\u6CB9\u7334" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#\u6CB9\u7334" aria-hidden="true">#</a> \u6CB9\u7334</span><span class="suffix"></span></h2><p>\u6CB9\u7334\u7C7B\u4F3C\u4E8E\u662Fchrome\u7684\u4E00\u4E2A\u5916\u6302\u7A0B\u5E8F\u3002\u4ED6\u6709\u5F88\u591A\u5F3A\u5927\u7684\u7EC4\u4EF6\u3002 \u641C\u7D22<code>Tampermonkey</code> \u4E0B\u8F7D,\u5728\u8F6F\u4EF6\u5217\u8868\u6392\u884C\u91CC\u770B\u770B\u6709\u4EC0\u4E48\u4F60\u9700\u8981\u7684\u5427\uFF01</p><h2 id="vimium" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#vimium" aria-hidden="true">#</a> vimium</span><span class="suffix"></span></h2><p>\u60F3\u4F7F\u7528vim\u4E00\u6837\u4F7F\u7528chrome</p><figure><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200322122222.png" alt=""></figure><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5E38\u7528\u5FEB\u6377\u952E</span>
<span class="token builtin class-name">shift</span> + ?  <span class="token comment">#\u5E2E\u52A9</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><code>f</code>\u6216\u8005<code>F</code><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200322122553.png" alt=""> \u4F1A\u6807\u8BB0\u6240\u6709\u53EF\u70B9\u51FB\u7684\u5730\u65B9\u8F93\u5165\u5BF9\u5E94\u7684\u5B57\u6BCD\u8DF3\u8F6C</p><p><code>F</code>\u4E3A<code>shift+f</code>\u4F1A\u5728\u65B0\u7684\u6807\u7B7E\u9875\u6253\u5F00\u5BF9\u5E94\u7684\u8FDE\u63A5 <code>j</code> <code>k</code> \u4E0B\u4E0A\u6EDA\u52A8 <code>gg</code>\u5E95\u90E8 <code>G</code>\u5E95\u90E8 <code>J</code> <code>K</code> \u5DE6\u53F3\u6807\u7B7E <code>ctrl + l</code> \u641C\u7D22\u680F \u3002\u3002\u3002\u3002</p><h2 id="sourcegraph" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#sourcegraph" aria-hidden="true">#</a> sourcegraph</span><span class="suffix"></span></h2><p>\u66F4\u65B9\u4FBF\u7684\u67E5\u770Bgithub\u6E90\u7801 <img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200322124126.png" alt=""><img src="https://gitee.com/artiely/Figure-bed/raw/master/images/20200322124053.png" alt=""></p><h2 id="https-www-google-com-preferences" tabindex="-1"><span class="prefix"></span><span class="content"><a class="header-anchor" href="#https-www-google-com-preferences" aria-hidden="true">#</a> https://www.google.com/preferences</span><span class="suffix"></span></h2><p>\u641C\u7D22\u680F\u8F93\u5165\u4E0A\u9762\u7684\u5730\u5740\uFF0C\u53EF\u4EE5\u4FEE\u6539\u4E00\u4E9Bgoogle\u641C\u7D22\u7684\u914D\u7F6E\uFF0C\u6BD4\u5982\u7ED3\u679C\u6761\u6570\uFF0C\u662F\u5426\u5728\u65B0\u7684\u6807\u7B7E\u9875\u6253\u5F00\u7B49\u3002</p><p>\u5F85\u7EED.</p><!--]-->`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/posts/2021/2020-3-16-chrome-plugin.html.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var _2020316ChromePlugin_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$3]]);
var _2020316ChromePlugin_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _2020316ChromePlugin_html$1
});
const _sfc_main$6 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/404.html.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var _404_html$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$2]]);
var _404_html$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _404_html$1
});
const _sfc_main$5 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../pages/index.html.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var index_html$2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$1]]);
var index_html$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": index_html$2
});
const data$8 = {
  "key": "v-7446daa2",
  "path": "/foo/",
  "title": "foo",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "git": {
    "updatedTime": 1642422505e3,
    "contributors": [
      {
        "name": "artiely",
        "email": "1119696785@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "foo/index.md"
};
var index_html$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$8
});
const data$7 = {
  "key": "v-98df26d6",
  "path": "/posts/2020-3-16-vscode-plugin.html",
  "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "\u5982\u4F55\u4F7F\u4F60\u7684vscode\u66F4\u597D\u7528",
    "data": "2020-12-29T00:00:00.000Z",
    "summary": "VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026!## \u56FE\u7247\u9884\u89C8> \u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002!## \u5F69\u8679\u7F29\u8FDB> \u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C ...",
    "description": "VS Code \u5199\u4EE3\u7801\u662F\u771F\u597D\u7528\u3001\u771F\u723D\u3001\u771F\u9999\uFF01\u60F3\u5FC5\u4F60\u4E5F\u5DF2\u7ECF\u542C\u8FC7\u8EAB\u8FB9\u4E0D\u6B62\u4E00\u4E2A\u4EBA\u8FD9\u4E48\u8BF4\u3002\u6700\u8FD1\u7684 JS 2019 \u62A5\u544A\u4E2D\uFF0CVS Code \u4E5F\u662F\u4EE5\u538B\u5012\u6027\u7684\u4F18\u52BF\u83B7\u80DC\u7B2C\u4E00\uFF0C\u5176\u4ED6\u7684\u7F16\u8F91\u5668\u53EA\u80FD\u88AB\u65E0\u60C5\u78BE\u538B\u5728\u5730\u4E0A\u6469\u64E6\u2026\u2026!## \u56FE\u7247\u9884\u89C8> \u5149\u6807\u60AC\u6D6E\u5728\u56FE\u7247\u8DEF\u5F84\u4E0A\u65F6\uFF0C\u663E\u793A\u56FE\u7247\u9884\u89C8\uFF0C\u8FD9\u6837\u6211\u4EEC\u5728\u6572\u4EE3\u7801\u7684\u65F6\u5019\u4E00\u4E0B\u5B50\u5C31\u80FD\u77E5\u9053\u6709\u6CA1\u6709\u5F15\u7528\u4E86\u6B63\u786E\u7684\u56FE\u7247\u6216\u56FE\u6807\u3002!## \u5F69\u8679\u7F29\u8FDB> \u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C ...",
    "author": "artiely",
    "primary": "25262d",
    "readTime": "6 min read",
    "words": 1049,
    "group": 1,
    "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316094033.png",
    "secondary": "dad9d2"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "\u63A8\u8350\u63D2\u4EF6",
      "slug": "\u63A8\u8350\u63D2\u4EF6",
      "children": []
    },
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
      "children": [
        {
          "level": 3,
          "title": "\u4E3B\u9898\u914D\u7F6E",
          "slug": "\u4E3B\u9898\u914D\u7F6E",
          "children": []
        },
        {
          "level": 3,
          "title": "\u5FEB\u6377console",
          "slug": "\u5FEB\u6377console",
          "children": []
        },
        {
          "level": 3,
          "title": "\u5F85\u529E\u9AD8\u4EAE",
          "slug": "\u5F85\u529E\u9AD8\u4EAE",
          "children": []
        },
        {
          "level": 3,
          "title": "\u5F15\u5165\u4F53\u79EF",
          "slug": "\u5F15\u5165\u4F53\u79EF",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1642991343e3,
    "contributors": [
      {
        "name": "artiely",
        "email": "1119696785@qq.com",
        "commits": 2
      }
    ]
  },
  "filePathRelative": "posts/2020-3-16-vscode-plugin.md"
};
var _2020316VscodePlugin_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$7
});
const data$6 = {
  "key": "v-0151cd4a",
  "path": "/posts/2020-3-16-windows-plugin.html",
  "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350",
  "lang": "zh-CN",
  "frontmatter": {
    "primary": "2c62c8",
    "secondary": "d39d37",
    "title": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350",
    "tag": "windows",
    "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316184815.png",
    "date": "2020-3-16",
    "base64": "3260d0",
    "category": "Tool",
    "data": "2020-3-16",
    "summary": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...",
    "description": "windows \u597D\u7528\u7684\u8F6F\u4EF6\u63A8\u8350## wox\u5E94\u7528\u7BA1\u7406\u65B0\u4F53\u9A8C\u3002ctrl+space(\u7A7A\u683C)!!!## typoramarkdown\u4E66\u5199\u65B0\u4F53\u9A8C\u5E76\u4E14typora\u53EF\u4EE5\u548Cpicgo ...",
    "author": "artiely",
    "readTime": "1 min read",
    "words": 172
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
  "git": {
    "updatedTime": 1642499581e3,
    "contributors": [
      {
        "name": "artiely",
        "email": "1119696785@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "posts/2020-3-16-windows-plugin.md"
};
var _2020316WindowsPlugin_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$6
});
const data$5 = {
  "key": "v-ebe80ef8",
  "path": "/posts/2020-3-18-electron-mirror-down.html",
  "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5",
  "lang": "zh-CN",
  "frontmatter": {
    "primary": "2974d1",
    "secondary": "d68b2e",
    "title": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5",
    "tag": "electron,javascrip",
    "author": "Artiely",
    "date": "2020-3-18",
    "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png",
    "base64": "2e7bd7",
    "category": "electron",
    "data": "2020-3-18",
    "summary": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...",
    "description": "Electron \u955C\u50CF\u4E0B\u8F7D\u6162\u7684\u89E3\u51B3\u529E\u6CD5\u56E0\u4E3A Electron \u7684\u6E90\u5728\u56FD\u5916\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528 npm \u8FDB\u884C\u5B89\u88C5\uFF0C\u7531\u4E8E\u4F17\u6240\u5468\u77E5\u7684\u539F\u56E0\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u4E00\u4E2A\u597D\u7684\u68AF\u5B50\uFF0C\u901A\u5E38\u4E0B\u8F7D\u901F\u5EA6\u53EA\u6709\u51E0 k \u5230\u5341\u51E0 k\u7684\u901F\u5EA6\u3002\u5982\u56FE\uFF1A\u8FD0\u6C14\u975E\u5E38\u597D\u65F6\uFF0C\u53EF\u80FD\u80FD\u8DD1 ...",
    "readTime": "2 min read",
    "words": 396
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
  "git": {
    "updatedTime": 1642499581e3,
    "contributors": [
      {
        "name": "artiely",
        "email": "1119696785@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "posts/2020-3-18-electron-mirror-down.md"
};
var _2020318ElectronMirrorDown_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$5
});
const data$4 = {
  "key": "v-a36afcfe",
  "path": "/posts/2021-2-23-proxy.html",
  "title": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3proxy",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3proxy",
    "tag": "proxy",
    "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20210223114632.png",
    "base64": "f0df3d",
    "author": "artiely",
    "date": "2021-2-23",
    "data": "2021-2-23",
    "summary": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...",
    "description": "\u4ECE\u4F7F\u7528\u573A\u666F\u4E86\u89E3 proxy\u52A0\u7C97\u524D\u9762\u8BB2\u8FC7\u4E00\u7BC7\uFF0C\u73B0\u5728\u5C31\u5E26\u5927\u5BB6\u4E86\u89E3\u4E00\u4E0Bproxy\u7684\u5B9E\u9645\u5E94\u7528\uFF0C\u66F4\u6DF1\u5165\u7684\u4E86\u89E3proxy\u7684\u5999\u7528\u53CA\u4EF7\u503C\u5427\uFF01 \u547C\u5E94\u4E0A\u4E86~\u7531\u4FED\u5165\u5962### \u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u51FD\u6570tracePropAccess(obj, propKeys)\uFF0C\u8BE5\u51FD\u6570 obj \u5728 propKeys \u8BBE\u7F6E\u6216\u83B7\u53D6\u7684\u5C5E\u6027\uFF08\u5176\u952E\u5728 Array \u4E2D\uFF09\u65F6\u8FDB\u884C\u8BB0\u5F55\u3002 ...",
    "primary": "ebdb5b",
    "secondary": "1424a4",
    "readTime": "13 min read",
    "words": 2564
  },
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "\u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE\uFF08get\uFF0Cset\uFF09",
      "slug": "\u8DDF\u8E2A\u5C5E\u6027\u8BBF\u95EE-get-set",
      "children": []
    },
    {
      "level": 3,
      "title": "\u83B7\u53D6\u672A\u77E5\u5C5E\u6027\u7684\u8B66\u544A",
      "slug": "\u83B7\u53D6\u672A\u77E5\u5C5E\u6027\u7684\u8B66\u544A",
      "children": []
    },
    {
      "level": 3,
      "title": "\u8D1F\u6570\u7EC4\u7D22\u5F15\uFF08get\uFF09",
      "slug": "\u8D1F\u6570\u7EC4\u7D22\u5F15-get",
      "children": []
    },
    {
      "level": 3,
      "title": "\u6570\u636E\u7ED1\u5B9A",
      "slug": "\u6570\u636E\u7ED1\u5B9A",
      "children": []
    },
    {
      "level": 3,
      "title": "\u8BBF\u95EE RESTful \u63A5\u53E3\u670D\u52A1",
      "slug": "\u8BBF\u95EE-restful-\u63A5\u53E3\u670D\u52A1",
      "children": []
    },
    {
      "level": 3,
      "title": "\u64A4\u9500\u5F15\u7528",
      "slug": "\u64A4\u9500\u5F15\u7528",
      "children": []
    },
    {
      "level": 3,
      "title": "\u521B\u5EFA\u7C7B\u578B\u68C0\u67E5",
      "slug": "\u521B\u5EFA\u7C7B\u578B\u68C0\u67E5",
      "children": []
    },
    {
      "level": 3,
      "title": "\u5B57\u6BB5\u6821\u9A8C",
      "slug": "\u5B57\u6BB5\u6821\u9A8C",
      "children": []
    },
    {
      "level": 3,
      "title": "\u7EA7\u8054\u5C5E\u6027",
      "slug": "\u7EA7\u8054\u5C5E\u6027",
      "children": []
    },
    {
      "level": 3,
      "title": "\u79C1\u6709\u5316\u5C5E\u6027",
      "slug": "\u79C1\u6709\u5316\u5C5E\u6027",
      "children": []
    },
    {
      "level": 3,
      "title": "\u65E5\u5FD7\u6253\u5370",
      "slug": "\u65E5\u5FD7\u6253\u5370",
      "children": []
    },
    {
      "level": 3,
      "title": "\u4EE3\u7406\u5C5E\u6027\u67E5\u627E",
      "slug": "\u4EE3\u7406\u5C5E\u6027\u67E5\u627E",
      "children": []
    },
    {
      "level": 3,
      "title": "\u76D1\u542C\u6BCF\u4E2A\u5F02\u6B65\u7684\u8FC7\u7A0B",
      "slug": "\u76D1\u542C\u6BCF\u4E2A\u5F02\u6B65\u7684\u8FC7\u7A0B",
      "children": []
    },
    {
      "level": 3,
      "title": "\u7F13\u5B58",
      "slug": "\u7F13\u5B58",
      "children": []
    },
    {
      "level": 3,
      "title": "\u8BA1\u7B97\u5C5E\u6027",
      "slug": "\u8BA1\u7B97\u5C5E\u6027",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1642747376e3,
    "contributors": [
      {
        "name": "artiely",
        "email": "1119696785@qq.com",
        "commits": 2
      }
    ]
  },
  "filePathRelative": "posts/2021-2-23-proxy.md"
};
var _2021223Proxy_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$4
});
const data$3 = {
  "key": "v-810351b2",
  "path": "/posts/2022-1-11md-test.html",
  "title": "\u5E38\u7528Markdown\u6F14\u793A",
  "lang": "zh-CN",
  "frontmatter": {
    "useLayout": "sino",
    "cover": "https://gitee.com/artiely/Figure-bed/raw/master/20220123084210.png",
    "title": "\u5E38\u7528Markdown\u6F14\u793A",
    "date": "2022-01-19T00:00:00.000Z",
    "tag": [
      "\u6653\u9732",
      "\u5BDD\u5B89",
      "\u5178\u7C4D",
      "\u6D45\u4E91",
      "\u900D\u9065",
      "\u79CB\u534A"
    ],
    "summary": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...",
    "description": "\u5E38\u7528Markdown\u6F14\u793A## \u6ED5\u738B\u9601\u5E8F\u3010\u4F5C\u8005\u3011\u738B\u52C3 \uFF08650 \u5E74 \u2014 676 \u5E74\uFF09 \u3010\u671D\u4EE3\u3011\u5510\u8C6B\u7AE0\u6545\u90E1\uFF0C\u6D2A\u90FD\u65B0\u5E9C\u3002\u661F\u5206\u7FFC\u8F78\uFF0C\u5730\u63A5\u8861\u5E90\u3002\u895F\u4E09\u6C5F\u800C\u5E26\u4E94\u6E56\uFF0C\u63A7\u86EE\u8346\u800C\u5F15\u74EF\u8D8A\u3002\u7269\u534E\u5929\u5B9D\uFF0C\u9F99\u5149\u5C04\u725B\u6597\u4E4B\u589F\uFF1B\u4EBA\u6770\u5730\u7075\uFF0C\u5F90\u5B7A\u4E0B\u9648\u8543\u4E4B\u69BB\u3002\u96C4\u5DDE\u96FE\u5217\uFF0C\u4FCA\u91C7\u661F\u9A70\u3002\u53F0\u968D\u6795\u5937\u590F\u4E4B\u4EA4\uFF0C\u5BBE\u4E3B\u5C3D\u4E1C\u5357\u4E4B\u7F8E\u3002\u90FD\u7763\u960E\u516C\u4E4B\u96C5\u671B\uFF0C\u68E8\u621F\u9065\u4E34\uFF1B\u5B87\u6587\u65B0\u5DDE\u4E4B\u61FF\u8303\uFF0C\u895C\u5E37\u6682\u9A7B\u3002\u5341\u65EC\u4F11\u5047\uFF0C\u80DC\u53CB\u5982\u4E91\uFF1B\u5343\u91CC\u9022\u8FCE\uFF0C\u9AD8\u670B\u6EE1\u5EA7\u3002\u817E\u86DF\u8D77\u51E4\uFF0C\u5B5F\u5B66\u58EB\u4E4B\u8BCD ...",
    "author": "artiely",
    "primary": "d4d4d4",
    "secondary": "2b2b2b",
    "readTime": "7 min read",
    "words": 1228
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "\u6ED5\u738B\u9601\u5E8F",
      "slug": "\u6ED5\u738B\u9601\u5E8F",
      "children": []
    },
    {
      "level": 2,
      "title": "\u5F15\u7528\u5982\u4E0B\uFF1A",
      "slug": "\u5F15\u7528\u5982\u4E0B",
      "children": []
    },
    {
      "level": 2,
      "title": "\u94FE\u63A5",
      "slug": "\u94FE\u63A5",
      "children": [
        {
          "level": 3,
          "title": "\u56FE\u7247\u94FE\u63A5",
          "slug": "\u56FE\u7247\u94FE\u63A5",
          "children": []
        },
        {
          "level": 3,
          "title": "\u56FE\u7247",
          "slug": "\u56FE\u7247",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "\u4EE3\u7801",
      "slug": "\u4EE3\u7801",
      "children": [
        {
          "level": 3,
          "title": "diff \u6548\u679C",
          "slug": "diff-\u6548\u679C",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "\u81EA\u5B9A\u4E49\u5BB9\u5668",
      "slug": "\u81EA\u5B9A\u4E49\u5BB9\u5668",
      "children": [
        {
          "level": 3,
          "title": "\u4EE3\u7801\u7EC4",
          "slug": "\u4EE3\u7801\u7EC4",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "updatedTime": 1643022831e3,
    "contributors": [
      {
        "name": "artiely",
        "email": "1119696785@qq.com",
        "commits": 6
      }
    ]
  },
  "filePathRelative": "posts/2022-1-11md-test.md"
};
var _2022111mdTest_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$3
});
const data$2 = {
  "key": "v-71182a26",
  "path": "/posts/2021/2020-3-16-chrome-plugin.html",
  "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "\u8BA9\u4F60\u7684chrome\u5982\u864E\u6DFB\u7FFC",
    "data": "2020-12-29T00:00:00.000Z",
    "summary": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002!\u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84!!\u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49!## \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B ...",
    "description": "\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u6211\u4EEC\u662F\u65E0\u6CD5\u8BBF\u95EE\u8C37\u6B4C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5148\u4E0B\u8F7D\u4E00\u4E2A\u8C37\u6B4C\u8BBF\u95EE\u52A9\u624B\u5E2E\u52A9\u6211\u4EEC\u8BBF\u95EE\u8C37\u6B4C\u5E94\u7528\u5546\u5E97\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7834\u89E3\u7248\u3002\u6B63\u7248\u4E5F\u662F\u53EF\u4EE5\u514D\u8D39\u4F7F\u7528\u7684\uFF0C\u4F46\u662F\u4ED6\u4F1A\u4FEE\u6539\u4F60\u7684\u4E3B\u9875\u5E76\u4E14\u5F3A\u5236\u7ED1\u5B9A\u3002\u6240\u4EE5\u6709\u70B9\u813E\u6C14\u7684\u90FD\u5FCD\u4E0D\u4E86\u3002!\u4F60\u4E5F\u53EF\u4EE5\u653E\u5728\u9ED8\u8BA4\u8DEF\u5F84\u4E0B\uFF0C\u4E0B\u56FE\u662F\u5982\u4F55\u67E5\u770B\u8DEF\u5F84!!\u73B0\u5728\u5C31\u53EF\u4EE5\u8BBF\u95EE\u8C37\u6B4C\u5546\u5E97\u4E86\uFF0C\u5F53\u7136\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u8C37\u6B4C\u641C\u7D22\u7B49!## \u6E05\u6670\u7684\u5386\u53F2\u8BB0\u5F55\u5386\u53F2\u8BB0\u5F55\u6309\u5929\u5206\u7C7B ...",
    "cover": "https://gitee.com/artiely/Figure-bed/raw/master/images/20200316120320.png",
    "author": "artiely",
    "primary": "f4f6f6",
    "secondary": "0b0909",
    "readTime": "5 min read",
    "words": 908
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
  "git": {
    "updatedTime": 1642991343e3,
    "contributors": [
      {
        "name": "artiely",
        "email": "1119696785@qq.com",
        "commits": 2
      }
    ]
  },
  "filePathRelative": "posts/2021/2020-3-16-chrome-plugin.md"
};
var _2020316ChromePlugin_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data: data$2
});
const data$1 = {
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
  data: data$1
});
const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "",
  "lang": "zh-CN",
  "frontmatter": {
    "layout": "Layout"
  },
  "excerpt": "",
  "headers": [],
  "git": {},
  "filePathRelative": null
};
var index_html = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  data
});
const _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}>404 Not Found</div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/404.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var _404 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender]]);
var _404$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _404
});
var clientAppEnhance = defineClientAppEnhance(({ app, router, siteData: siteData2 }) => {
  console.log({ app, router, siteData: siteData2 });
});
var clientAppEnhance$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": clientAppEnhance
});
const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const useEditNavLink = () => {
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return vue.computed(() => {
        var _a, _b, _c;
        const showEditLink = (_b = (_a = frontmatter.value.editLink) != null ? _a : themeLocale2.value.editLink) != null ? _b : true;
        if (!showEditLink) {
          return null;
        }
        const {
          repo,
          docsRepo = repo,
          docsBranch = "main",
          docsDir = "",
          editLinkText
        } = themeLocale2.value;
        if (!docsRepo)
          return null;
        const editLink = resolveEditLink({
          docsRepo,
          docsBranch,
          docsDir,
          filePathRelative: page.value.filePathRelative,
          editLinkPattern: (_c = frontmatter.value.editLinkPattern) != null ? _c : themeLocale2.value.editLinkPattern
        });
        if (!editLink)
          return null;
        return {
          text: editLinkText != null ? editLinkText : "Edit this page",
          link: editLink
        };
      });
    };
    const useLastUpdated = () => {
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return vue.computed(() => {
        var _a, _b, _c, _d;
        const showLastUpdated = (_b = (_a = frontmatter.value.lastUpdated) != null ? _a : themeLocale2.value.lastUpdated) != null ? _b : true;
        if (!showLastUpdated)
          return null;
        if (!((_c = page.value.git) == null ? void 0 : _c.updatedTime))
          return null;
        const updatedDate = new Date((_d = page.value.git) == null ? void 0 : _d.updatedTime);
        return updatedDate.toLocaleString();
      });
    };
    const useContributors = () => {
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return vue.computed(() => {
        var _a, _b, _c, _d;
        const showContributors = (_b = (_a = frontmatter.value.contributors) != null ? _a : themeLocale2.value.contributors) != null ? _b : true;
        if (!showContributors)
          return null;
        return (_d = (_c = page.value.git) == null ? void 0 : _c.contributors) != null ? _d : null;
      });
    };
    const themeLocale = useThemeLocaleData();
    const editNavLink = useEditNavLink();
    const lastUpdated = useLastUpdated();
    const contributors = useContributors();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = vue.resolveComponent("ClientOnly");
      _push(`<footer${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "page-meta" }, _attrs))}>`);
      if (vue.unref(editNavLink)) {
        _push(`<div class="meta-item edit-link">`);
        _push(serverRenderer.ssrRenderComponent(_sfc_main$p, {
          class: "meta-item-label",
          item: vue.unref(editNavLink)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (vue.unref(lastUpdated)) {
        _push(`<div class="meta-item last-updated"><span class="meta-item-label">${serverRenderer.ssrInterpolate(vue.unref(themeLocale).lastUpdatedText)}: </span>`);
        _push(serverRenderer.ssrRenderComponent(_component_ClientOnly, null, {
          default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="meta-item-info"${_scopeId}>${serverRenderer.ssrInterpolate(vue.unref(lastUpdated))}</span>`);
            } else {
              return [
                vue.createVNode("span", { class: "meta-item-info" }, vue.toDisplayString(vue.unref(lastUpdated)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (vue.unref(contributors) && vue.unref(contributors).length) {
        _push(`<div class="meta-item contributors"><span class="meta-item-label">${serverRenderer.ssrInterpolate(vue.unref(themeLocale).contributorsText)}: </span><span class="meta-item-info"><!--[-->`);
        serverRenderer.ssrRenderList(vue.unref(contributors), (contributor, index2) => {
          _push(`<!--[--><span class="contributor"${serverRenderer.ssrRenderAttr("title", `email: ${contributor.email}`)}>${serverRenderer.ssrInterpolate(contributor.name)}</span>`);
          if (index2 !== vue.unref(contributors).length - 1) {
            _push(`<!--[-->, <!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</footer>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/PageMeta.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
  __ssrInlineRender: true,
  setup(__props) {
    const resolveFromFrontmatterConfig = (conf) => {
      if (conf === false) {
        return null;
      }
      if (isString(conf)) {
        return useNavLink(conf);
      }
      if (isPlainObject(conf)) {
        return conf;
      }
      return false;
    };
    const resolveFromSidebarItems = (sidebarItems2, currentPath, offset) => {
      const index2 = sidebarItems2.findIndex((item) => item.link === currentPath);
      if (index2 !== -1) {
        const targetItem = sidebarItems2[index2 + offset];
        if (!(targetItem == null ? void 0 : targetItem.link)) {
          return null;
        }
        return targetItem;
      }
      for (const item of sidebarItems2) {
        if (item.children) {
          const childResult = resolveFromSidebarItems(item.children, currentPath, offset);
          if (childResult) {
            return childResult;
          }
        }
      }
      return null;
    };
    const frontmatter = usePageFrontmatter();
    const sidebarItems = useSidebarItems();
    const route = vueRouter.useRoute();
    const prevNavLink = vue.computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);
      if (prevConfig !== false) {
        return prevConfig;
      }
      return resolveFromSidebarItems(sidebarItems.value, route.path, -1);
    });
    const nextNavLink = vue.computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);
      if (nextConfig !== false) {
        return nextConfig;
      }
      return resolveFromSidebarItems(sidebarItems.value, route.path, 1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (vue.unref(prevNavLink) || vue.unref(nextNavLink)) {
        _push(`<nav${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "page-nav" }, _attrs))}><p class="inner">`);
        if (vue.unref(prevNavLink)) {
          _push(`<span class="prev">`);
          _push(serverRenderer.ssrRenderComponent(_sfc_main$p, { item: vue.unref(prevNavLink) }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (vue.unref(nextNavLink)) {
          _push(`<span class="next">`);
          _push(serverRenderer.ssrRenderComponent(_sfc_main$p, { item: vue.unref(nextNavLink) }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../node_modules/@vuepress/theme-default/lib/client/components/PageNav.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = vue.resolveComponent("Content");
      _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "page" }, _attrs))}>`);
      serverRenderer.ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(`<div class="default-content">`);
      _push(serverRenderer.ssrRenderComponent(_component_Content, null, null, _parent));
      _push(`</div>`);
      _push(serverRenderer.ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(serverRenderer.ssrRenderComponent(_sfc_main$2, null, null, _parent));
      serverRenderer.ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</main>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../../../theme/lib/layouts/Page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Page = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$1
});
const _sfc_main = {
  __ssrInlineRender: true,
  setup(__props) {
    const nav = [{ "text": "Home", "link": "/" }, { "text": "Foo", "link": "/foo" }];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "p" }, _attrs))}>${serverRenderer.ssrInterpolate(vue.unref(nav))}</p>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("../../components/Test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Test = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main
});
exports.createVueApp = createVueApp;

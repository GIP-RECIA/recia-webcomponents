/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = globalThis, be = Dt.ShadowRoot && (Dt.ShadyCSS === void 0 || Dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ye = Symbol(), Ie = /* @__PURE__ */ new WeakMap();
let pn = class {
  constructor(t, n, a) {
    if (this._$cssResult$ = !0, a !== ye) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (be && t === void 0) {
      const a = n !== void 0 && n.length === 1;
      a && (t = Ie.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), a && Ie.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const gn = (e) => new pn(typeof e == "string" ? e : e + "", void 0, ye), Qn = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((a, r, o) => a + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[o + 1], e[0]);
  return new pn(n, e, ye);
}, Zn = (e, t) => {
  if (be) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const a = document.createElement("style"), r = Dt.litNonce;
    r !== void 0 && a.setAttribute("nonce", r), a.textContent = n.cssText, e.appendChild(a);
  }
}, Le = be ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const a of t.cssRules) n += a.cssText;
  return gn(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ta, defineProperty: ea, getOwnPropertyDescriptor: na, getOwnPropertyNames: aa, getOwnPropertySymbols: ra, getPrototypeOf: ia } = Object, F = globalThis, Re = F.trustedTypes, oa = Re ? Re.emptyScript : "", Jt = F.reactiveElementPolyfillSupport, ct = (e, t) => e, Ft = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? oa : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, we = (e, t) => !ta(e, t), De = { attribute: !0, type: String, converter: Ft, reflect: !1, hasChanged: we };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), F.litPropertyMetadata ?? (F.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class et extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = De) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.elementProperties.set(t, n), !n.noAccessor) {
      const a = Symbol(), r = this.getPropertyDescriptor(t, a, n);
      r !== void 0 && ea(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, n, a) {
    const { get: r, set: o } = na(this.prototype, t) ?? { get() {
      return this[n];
    }, set(i) {
      this[n] = i;
    } };
    return { get() {
      return r == null ? void 0 : r.call(this);
    }, set(i) {
      const s = r == null ? void 0 : r.call(this);
      o.call(this, i), this.requestUpdate(t, s, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? De;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ct("elementProperties"))) return;
    const t = ia(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ct("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ct("properties"))) {
      const n = this.properties, a = [...aa(n), ...ra(n)];
      for (const r of a) this.createProperty(r, n[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [a, r] of n) this.elementProperties.set(a, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, a] of this.elementProperties) {
      const r = this._$Eu(n, a);
      r !== void 0 && this._$Eh.set(r, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const a = new Set(t.flat(1 / 0).reverse());
      for (const r of a) n.unshift(Le(r));
    } else t !== void 0 && n.push(Le(t));
    return n;
  }
  static _$Eu(t, n) {
    const a = n.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((n) => n(this));
  }
  addController(t) {
    var n;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((n = t.hostConnected) == null || n.call(t));
  }
  removeController(t) {
    var n;
    (n = this._$EO) == null || n.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const a of n.keys()) this.hasOwnProperty(a) && (t.set(a, this[a]), delete this[a]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Zn(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((n) => {
      var a;
      return (a = n.hostConnected) == null ? void 0 : a.call(n);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((n) => {
      var a;
      return (a = n.hostDisconnected) == null ? void 0 : a.call(n);
    });
  }
  attributeChangedCallback(t, n, a) {
    this._$AK(t, a);
  }
  _$EC(t, n) {
    var o;
    const a = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, a);
    if (r !== void 0 && a.reflect === !0) {
      const i = (((o = a.converter) == null ? void 0 : o.toAttribute) !== void 0 ? a.converter : Ft).toAttribute(n, a.type);
      this._$Em = t, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var o;
    const a = this.constructor, r = a._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const i = a.getPropertyOptions(r), s = typeof i.converter == "function" ? { fromAttribute: i.converter } : ((o = i.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? i.converter : Ft;
      this._$Em = r, this[r] = s.fromAttribute(n, i.type), this._$Em = null;
    }
  }
  requestUpdate(t, n, a) {
    if (t !== void 0) {
      if (a ?? (a = this.constructor.getPropertyOptions(t)), !(a.hasChanged ?? we)(this[t], n)) return;
      this.P(t, n, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, n, a) {
    this._$AL.has(t) || this._$AL.set(t, n), a.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var a;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, i] of this._$Ep) this[o] = i;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, i] of r) i.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], i);
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), (a = this._$EO) == null || a.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(n)) : this._$EU();
    } catch (r) {
      throw t = !1, this._$EU(), r;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var n;
    (n = this._$EO) == null || n.forEach((a) => {
      var r;
      return (r = a.hostUpdated) == null ? void 0 : r.call(a);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((n) => this._$EC(n, this[n]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
et.elementStyles = [], et.shadowRootOptions = { mode: "open" }, et[ct("elementProperties")] = /* @__PURE__ */ new Map(), et[ct("finalized")] = /* @__PURE__ */ new Map(), Jt == null || Jt({ ReactiveElement: et }), (F.reactiveElementVersions ?? (F.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = globalThis, jt = ut.trustedTypes, Ue = jt ? jt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, bn = "$lit$", z = `lit$${Math.random().toFixed(9).slice(2)}$`, yn = "?" + z, sa = `<${yn}>`, K = document, vt = () => K.createComment(""), pt = (e) => e === null || typeof e != "object" && typeof e != "function", wn = Array.isArray, la = (e) => wn(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Qt = `[ 	
\f\r]`, lt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ze = /-->/g, Fe = />/g, X = RegExp(`>|${Qt}(?:([^\\s"'>=/]+)(${Qt}*=${Qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), je = /'/g, He = /"/g, kn = /^(?:script|style|textarea|title)$/i, fa = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), ca = fa(1), J = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), Ye = /* @__PURE__ */ new WeakMap(), G = K.createTreeWalker(K, 129);
function An(e, t) {
  if (!Array.isArray(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ue !== void 0 ? Ue.createHTML(t) : t;
}
const ua = (e, t) => {
  const n = e.length - 1, a = [];
  let r, o = t === 2 ? "<svg>" : "", i = lt;
  for (let s = 0; s < n; s++) {
    const l = e[s];
    let c, f, u = -1, h = 0;
    for (; h < l.length && (i.lastIndex = h, f = i.exec(l), f !== null); ) h = i.lastIndex, i === lt ? f[1] === "!--" ? i = ze : f[1] !== void 0 ? i = Fe : f[2] !== void 0 ? (kn.test(f[2]) && (r = RegExp("</" + f[2], "g")), i = X) : f[3] !== void 0 && (i = X) : i === X ? f[0] === ">" ? (i = r ?? lt, u = -1) : f[1] === void 0 ? u = -2 : (u = i.lastIndex - f[2].length, c = f[1], i = f[3] === void 0 ? X : f[3] === '"' ? He : je) : i === He || i === je ? i = X : i === ze || i === Fe ? i = lt : (i = X, r = void 0);
    const v = i === X && e[s + 1].startsWith("/>") ? " " : "";
    o += i === lt ? l + sa : u >= 0 ? (a.push(c), l.slice(0, u) + bn + l.slice(u) + z + v) : l + z + (u === -2 ? s : v);
  }
  return [An(e, o + (e[n] || "<?>") + (t === 2 ? "</svg>" : "")), a];
};
class gt {
  constructor({ strings: t, _$litType$: n }, a) {
    let r;
    this.parts = [];
    let o = 0, i = 0;
    const s = t.length - 1, l = this.parts, [c, f] = ua(t, n);
    if (this.el = gt.createElement(c, a), G.currentNode = this.el.content, n === 2) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = G.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(bn)) {
          const h = f[i++], v = r.getAttribute(u).split(z), y = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: o, name: y[2], strings: v, ctor: y[1] === "." ? ma : y[1] === "?" ? ha : y[1] === "@" ? va : Wt }), r.removeAttribute(u);
        } else u.startsWith(z) && (l.push({ type: 6, index: o }), r.removeAttribute(u));
        if (kn.test(r.tagName)) {
          const u = r.textContent.split(z), h = u.length - 1;
          if (h > 0) {
            r.textContent = jt ? jt.emptyScript : "";
            for (let v = 0; v < h; v++) r.append(u[v], vt()), G.nextNode(), l.push({ type: 2, index: ++o });
            r.append(u[h], vt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === yn) l.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(z, u + 1)) !== -1; ) l.push({ type: 7, index: o }), u += z.length - 1;
      }
      o++;
    }
  }
  static createElement(t, n) {
    const a = K.createElement("template");
    return a.innerHTML = t, a;
  }
}
function it(e, t, n = e, a) {
  var i, s;
  if (t === J) return t;
  let r = a !== void 0 ? (i = n._$Co) == null ? void 0 : i[a] : n._$Cl;
  const o = pt(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((s = r == null ? void 0 : r._$AO) == null || s.call(r, !1), o === void 0 ? r = void 0 : (r = new o(e), r._$AT(e, n, a)), a !== void 0 ? (n._$Co ?? (n._$Co = []))[a] = r : n._$Cl = r), r !== void 0 && (t = it(e, r._$AS(e, t.values), r, a)), t;
}
class da {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: n }, parts: a } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? K).importNode(n, !0);
    G.currentNode = r;
    let o = G.nextNode(), i = 0, s = 0, l = a[0];
    for (; l !== void 0; ) {
      if (i === l.index) {
        let c;
        l.type === 2 ? c = new xt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new pa(o, this, t)), this._$AV.push(c), l = a[++s];
      }
      i !== (l == null ? void 0 : l.index) && (o = G.nextNode(), i++);
    }
    return G.currentNode = K, r;
  }
  p(t) {
    let n = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(t, a, n), n += a.strings.length - 2) : a._$AI(t[n])), n++;
  }
}
class xt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, n, a, r) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = a, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = it(this, t, n), pt(t) ? t === w || t == null || t === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== J && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : la(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== w && pt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(K.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: n, _$litType$: a } = t, r = typeof a == "number" ? this._$AC(t) : (a.el === void 0 && (a.el = gt.createElement(An(a.h, a.h[0]), this.options)), a);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(n);
    else {
      const i = new da(r, this), s = i.u(this.options);
      i.p(n), this.T(s), this._$AH = i;
    }
  }
  _$AC(t) {
    let n = Ye.get(t.strings);
    return n === void 0 && Ye.set(t.strings, n = new gt(t)), n;
  }
  k(t) {
    wn(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let a, r = 0;
    for (const o of t) r === n.length ? n.push(a = new xt(this.S(vt()), this.S(vt()), this, this.options)) : a = n[r], a._$AI(o), r++;
    r < n.length && (this._$AR(a && a._$AB.nextSibling, r), n.length = r);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var a;
    for ((a = this._$AP) == null ? void 0 : a.call(this, !1, !0, n); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 && (this._$Cv = t, (n = this._$AP) == null || n.call(this, t));
  }
}
class Wt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, a, r, o) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = n, this._$AM = r, this.options = o, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = w;
  }
  _$AI(t, n = this, a, r) {
    const o = this.strings;
    let i = !1;
    if (o === void 0) t = it(this, t, n, 0), i = !pt(t) || t !== this._$AH && t !== J, i && (this._$AH = t);
    else {
      const s = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = it(this, s[a + l], n, l), c === J && (c = this._$AH[l]), i || (i = !pt(c) || c !== this._$AH[l]), c === w ? t = w : t !== w && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    i && !r && this.j(t);
  }
  j(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ma extends Wt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }
}
class ha extends Wt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== w);
  }
}
class va extends Wt {
  constructor(t, n, a, r, o) {
    super(t, n, a, r, o), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = it(this, t, n, 0) ?? w) === J) return;
    const a = this._$AH, r = t === w && a !== w || t.capture !== a.capture || t.once !== a.once || t.passive !== a.passive, o = t !== w && (a === w || r);
    r && this.element.removeEventListener(this.name, this, a), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class pa {
  constructor(t, n, a) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    it(this, t);
  }
}
const Zt = ut.litHtmlPolyfillSupport;
Zt == null || Zt(gt, xt), (ut.litHtmlVersions ?? (ut.litHtmlVersions = [])).push("3.1.4");
const ga = (e, t, n) => {
  const a = (n == null ? void 0 : n.renderBefore) ?? t;
  let r = a._$litPart$;
  if (r === void 0) {
    const o = (n == null ? void 0 : n.renderBefore) ?? null;
    a._$litPart$ = r = new xt(t.insertBefore(vt(), o), o, void 0, n ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class dt extends et {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var n;
    const t = super.createRenderRoot();
    return (n = this.renderOptions).renderBefore ?? (n.renderBefore = t.firstChild), t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ga(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return J;
  }
}
var vn;
dt._$litElement$ = !0, dt.finalized = !0, (vn = globalThis.litElementHydrateSupport) == null || vn.call(globalThis, { LitElement: dt });
const te = globalThis.litElementPolyfillSupport;
te == null || te({ LitElement: dt });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.6");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ba = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, ya = (e) => (...t) => ({ _$litDirective$: e, values: t });
class wa {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, n, a) {
    this._$Ct = t, this._$AM = n, this._$Ci = a;
  }
  _$AS(t, n) {
    return this.update(t, n);
  }
  update(t, n) {
    return this.render(...n);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ie extends wa {
  constructor(t) {
    if (super(t), this.it = w, t.type !== ba.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === w || t == null) return this._t = void 0, this.it = t;
    if (t === J) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const n = [t];
    return n.raw = n, this._t = { _$litType$: this.constructor.resultType, strings: n, values: [] };
  }
}
ie.directiveName = "unsafeHTML", ie.resultType = 1;
const ka = ya(ie);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Aa = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xa = { attribute: !0, type: String, converter: Ft, reflect: !1, hasChanged: we }, _a = (e = xa, t, n) => {
  const { kind: a, metadata: r } = n;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), o.set(n.name, e), a === "accessor") {
    const { name: i } = n;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(i, l, e);
    }, init(s) {
      return s !== void 0 && this.P(i, void 0, e), s;
    } };
  }
  if (a === "setter") {
    const { name: i } = n;
    return function(s) {
      const l = this[i];
      t.call(this, s), this.requestUpdate(i, l, e);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function _t(e) {
  return (t, n) => typeof n == "object" ? _a(e, t, n) : ((a, r, o) => {
    const i = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i ? { ...a, wrapped: !0 } : a), i ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(e, t, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function xn(e) {
  return _t({ ...e, state: !0, attribute: !1 });
}
const Ea = "html,body{padding:0;margin:0;height:100vh;width:100vw;overflow:hidden}info-modal{height:100%;width:100%}.modal-overlay[aria-hidden=true]{visibility:hidden;opacity:0}.modal-overlay[aria-hidden=false]{opacity:1;visibility:visible}.modal-overlay{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;z-index:1;height:100%;width:100%;transition:opacity .2s ease-in-out,visibility .2s ease-in-out;background-color:var(--info-modal-background-modal-overlay-color, rgba(160, 160, 160, .4196078431))}.modal-overlay .modal-container{position:absolute;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;width:fit-content;height:fit-content;padding:0;margin:auto;overflow:hidden;background-color:var(--info-modal-background-modal-container-color, #ffffff);border-radius:28px;border:none;display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;justify-content:center}.modal-overlay .modal-container .modal-header{display:flex;flex-direction:row;justify-content:space-between;padding:1em 1.5em .9em;color:#212121;gap:2em;align-items:center}.modal-overlay .modal-container .modal-header .modal-title{padding:0;margin:0;word-wrap:unset;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.modal-overlay .modal-container .modal-header .close-button{padding:0;margin:0;width:fit-content;height:fit-content;display:flex;flex-direction:row;justify-content:center;overflow:hidden;background:none;border:none}.modal-overlay .modal-container .modal-header .close-button:hover{cursor:pointer}.modal-overlay .modal-container .modal-header .close-button svg{height:1.5em;width:1.5em;color:#757375;-webkit-transition:color .5s;transition:color .5s}.modal-overlay .modal-container .modal-header .close-button svg:hover{color:#212121}.modal-overlay .modal-container .modal-body{padding:0 1.5em;display:flex;flex-direction:column;gap:2em;height:auto;width:auto;overflow-wrap:break-word;overflow-y:scroll;scroll-behavior:smooth;text-align:justify}.modal-overlay .modal-container .modal-footer{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:right;width:auto;padding:.9em 1.5em 1.5em}";
function Be(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function d(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Be(Object(n), !0).forEach(function(a) {
      k(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Be(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function Ht(e) {
  "@babel/helpers - typeof";
  return Ht = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ht(e);
}
function $a(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Sa(e, t) {
  for (var n = 0; n < t.length; n++) {
    var a = t[n];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
  }
}
function Pa(e, t, n) {
  return t && Sa(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function k(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function ke(e, t) {
  return Oa(e) || Ta(e, t) || _n(e, t) || Ia();
}
function Et(e) {
  return Ca(e) || Na(e) || _n(e) || Ma();
}
function Ca(e) {
  if (Array.isArray(e)) return oe(e);
}
function Oa(e) {
  if (Array.isArray(e)) return e;
}
function Na(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Ta(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var a = [], r = !0, o = !1, i, s;
    try {
      for (n = n.call(e); !(r = (i = n.next()).done) && (a.push(i.value), !(t && a.length === t)); r = !0)
        ;
    } catch (l) {
      o = !0, s = l;
    } finally {
      try {
        !r && n.return != null && n.return();
      } finally {
        if (o) throw s;
      }
    }
    return a;
  }
}
function _n(e, t) {
  if (e) {
    if (typeof e == "string") return oe(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return oe(e, t);
  }
}
function oe(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
  return a;
}
function Ma() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ia() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var We = function() {
}, Ae = {}, En = {}, $n = null, Sn = {
  mark: We,
  measure: We
};
try {
  typeof window < "u" && (Ae = window), typeof document < "u" && (En = document), typeof MutationObserver < "u" && ($n = MutationObserver), typeof performance < "u" && (Sn = performance);
} catch {
}
var La = Ae.navigator || {}, Xe = La.userAgent, Ge = Xe === void 0 ? "" : Xe, j = Ae, g = En, Ve = $n, Pt = Sn;
j.document;
var R = !!g.documentElement && !!g.head && typeof g.addEventListener == "function" && typeof g.createElement == "function", Pn = ~Ge.indexOf("MSIE") || ~Ge.indexOf("Trident/"), Ct, Ot, Nt, Tt, Mt, T = "___FONT_AWESOME___", se = 16, Cn = "fa", On = "svg-inline--fa", Q = "data-fa-i2svg", le = "data-fa-pseudo-element", Ra = "data-fa-pseudo-element-pending", xe = "data-prefix", _e = "data-icon", qe = "fontawesome-i2svg", Da = "async", Ua = ["HTML", "HEAD", "STYLE", "SCRIPT"], Nn = function() {
  try {
    return process.env.NODE_ENV === "production";
  } catch {
    return !1;
  }
}(), p = "classic", b = "sharp", Ee = [p, b];
function $t(e) {
  return new Proxy(e, {
    get: function(n, a) {
      return a in n ? n[a] : n[p];
    }
  });
}
var bt = $t((Ct = {}, k(Ct, p, {
  fa: "solid",
  fas: "solid",
  "fa-solid": "solid",
  far: "regular",
  "fa-regular": "regular",
  fal: "light",
  "fa-light": "light",
  fat: "thin",
  "fa-thin": "thin",
  fad: "duotone",
  "fa-duotone": "duotone",
  fab: "brands",
  "fa-brands": "brands",
  fak: "kit",
  fakd: "kit",
  "fa-kit": "kit",
  "fa-kit-duotone": "kit"
}), k(Ct, b, {
  fa: "solid",
  fass: "solid",
  "fa-solid": "solid",
  fasr: "regular",
  "fa-regular": "regular",
  fasl: "light",
  "fa-light": "light",
  fast: "thin",
  "fa-thin": "thin"
}), Ct)), yt = $t((Ot = {}, k(Ot, p, {
  solid: "fas",
  regular: "far",
  light: "fal",
  thin: "fat",
  duotone: "fad",
  brands: "fab",
  kit: "fak"
}), k(Ot, b, {
  solid: "fass",
  regular: "fasr",
  light: "fasl",
  thin: "fast"
}), Ot)), wt = $t((Nt = {}, k(Nt, p, {
  fab: "fa-brands",
  fad: "fa-duotone",
  fak: "fa-kit",
  fal: "fa-light",
  far: "fa-regular",
  fas: "fa-solid",
  fat: "fa-thin"
}), k(Nt, b, {
  fass: "fa-solid",
  fasr: "fa-regular",
  fasl: "fa-light",
  fast: "fa-thin"
}), Nt)), za = $t((Tt = {}, k(Tt, p, {
  "fa-brands": "fab",
  "fa-duotone": "fad",
  "fa-kit": "fak",
  "fa-light": "fal",
  "fa-regular": "far",
  "fa-solid": "fas",
  "fa-thin": "fat"
}), k(Tt, b, {
  "fa-solid": "fass",
  "fa-regular": "fasr",
  "fa-light": "fasl",
  "fa-thin": "fast"
}), Tt)), Fa = /fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/, Tn = "fa-layers-text", ja = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i, Ha = $t((Mt = {}, k(Mt, p, {
  900: "fas",
  400: "far",
  normal: "far",
  300: "fal",
  100: "fat"
}), k(Mt, b, {
  900: "fass",
  400: "fasr",
  300: "fasl",
  100: "fast"
}), Mt)), Mn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], Ya = Mn.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), Ba = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], V = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, kt = /* @__PURE__ */ new Set();
Object.keys(yt[p]).map(kt.add.bind(kt));
Object.keys(yt[b]).map(kt.add.bind(kt));
var Wa = [].concat(Ee, Et(kt), ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", V.GROUP, V.SWAP_OPACITY, V.PRIMARY, V.SECONDARY]).concat(Mn.map(function(e) {
  return "".concat(e, "x");
})).concat(Ya.map(function(e) {
  return "w-".concat(e);
})), mt = j.FontAwesomeConfig || {};
function Xa(e) {
  var t = g.querySelector("script[" + e + "]");
  if (t)
    return t.getAttribute(e);
}
function Ga(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
if (g && typeof g.querySelector == "function") {
  var Va = [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
  Va.forEach(function(e) {
    var t = ke(e, 2), n = t[0], a = t[1], r = Ga(Xa(n));
    r != null && (mt[a] = r);
  });
}
var In = {
  styleDefault: "solid",
  familyDefault: "classic",
  cssPrefix: Cn,
  replacementClass: On,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: "async",
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0
};
mt.familyPrefix && (mt.cssPrefix = mt.familyPrefix);
var ot = d(d({}, In), mt);
ot.autoReplaceSvg || (ot.observeMutations = !1);
var m = {};
Object.keys(In).forEach(function(e) {
  Object.defineProperty(m, e, {
    enumerable: !0,
    set: function(n) {
      ot[e] = n, ht.forEach(function(a) {
        return a(m);
      });
    },
    get: function() {
      return ot[e];
    }
  });
});
Object.defineProperty(m, "familyPrefix", {
  enumerable: !0,
  set: function(t) {
    ot.cssPrefix = t, ht.forEach(function(n) {
      return n(m);
    });
  },
  get: function() {
    return ot.cssPrefix;
  }
});
j.FontAwesomeConfig = m;
var ht = [];
function qa(e) {
  return ht.push(e), function() {
    ht.splice(ht.indexOf(e), 1);
  };
}
var U = se, N = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function Ka(e) {
  if (!(!e || !R)) {
    var t = g.createElement("style");
    t.setAttribute("type", "text/css"), t.innerHTML = e;
    for (var n = g.head.childNodes, a = null, r = n.length - 1; r > -1; r--) {
      var o = n[r], i = (o.tagName || "").toUpperCase();
      ["STYLE", "LINK"].indexOf(i) > -1 && (a = o);
    }
    return g.head.insertBefore(t, a), e;
  }
}
var Ja = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function At() {
  for (var e = 12, t = ""; e-- > 0; )
    t += Ja[Math.random() * 62 | 0];
  return t;
}
function st(e) {
  for (var t = [], n = (e || []).length >>> 0; n--; )
    t[n] = e[n];
  return t;
}
function $e(e) {
  return e.classList ? st(e.classList) : (e.getAttribute("class") || "").split(" ").filter(function(t) {
    return t;
  });
}
function Ln(e) {
  return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Qa(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, '="').concat(Ln(e[n]), '" ');
  }, "").trim();
}
function Xt(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, ": ").concat(e[n].trim(), ";");
  }, "");
}
function Se(e) {
  return e.size !== N.size || e.x !== N.x || e.y !== N.y || e.rotate !== N.rotate || e.flipX || e.flipY;
}
function Za(e) {
  var t = e.transform, n = e.containerWidth, a = e.iconWidth, r = {
    transform: "translate(".concat(n / 2, " 256)")
  }, o = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "), i = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), s = "rotate(".concat(t.rotate, " 0 0)"), l = {
    transform: "".concat(o, " ").concat(i, " ").concat(s)
  }, c = {
    transform: "translate(".concat(a / 2 * -1, " -256)")
  };
  return {
    outer: r,
    inner: l,
    path: c
  };
}
function tr(e) {
  var t = e.transform, n = e.width, a = n === void 0 ? se : n, r = e.height, o = r === void 0 ? se : r, i = e.startCentered, s = i === void 0 ? !1 : i, l = "";
  return s && Pn ? l += "translate(".concat(t.x / U - a / 2, "em, ").concat(t.y / U - o / 2, "em) ") : s ? l += "translate(calc(-50% + ".concat(t.x / U, "em), calc(-50% + ").concat(t.y / U, "em)) ") : l += "translate(".concat(t.x / U, "em, ").concat(t.y / U, "em) "), l += "scale(".concat(t.size / U * (t.flipX ? -1 : 1), ", ").concat(t.size / U * (t.flipY ? -1 : 1), ") "), l += "rotate(".concat(t.rotate, "deg) "), l;
}
var er = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, 0));
          transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
function Rn() {
  var e = Cn, t = On, n = m.cssPrefix, a = m.replacementClass, r = er;
  if (n !== e || a !== t) {
    var o = new RegExp("\\.".concat(e, "\\-"), "g"), i = new RegExp("\\--".concat(e, "\\-"), "g"), s = new RegExp("\\.".concat(t), "g");
    r = r.replace(o, ".".concat(n, "-")).replace(i, "--".concat(n, "-")).replace(s, ".".concat(a));
  }
  return r;
}
var Ke = !1;
function ee() {
  m.autoAddCss && !Ke && (Ka(Rn()), Ke = !0);
}
var nr = {
  mixout: function() {
    return {
      dom: {
        css: Rn,
        insertCss: ee
      }
    };
  },
  hooks: function() {
    return {
      beforeDOMElementCreation: function() {
        ee();
      },
      beforeI2svg: function() {
        ee();
      }
    };
  }
}, M = j || {};
M[T] || (M[T] = {});
M[T].styles || (M[T].styles = {});
M[T].hooks || (M[T].hooks = {});
M[T].shims || (M[T].shims = []);
var P = M[T], Dn = [], ar = function e() {
  g.removeEventListener("DOMContentLoaded", e), Yt = 1, Dn.map(function(t) {
    return t();
  });
}, Yt = !1;
R && (Yt = (g.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(g.readyState), Yt || g.addEventListener("DOMContentLoaded", ar));
function rr(e) {
  R && (Yt ? setTimeout(e, 0) : Dn.push(e));
}
function St(e) {
  var t = e.tag, n = e.attributes, a = n === void 0 ? {} : n, r = e.children, o = r === void 0 ? [] : r;
  return typeof e == "string" ? Ln(e) : "<".concat(t, " ").concat(Qa(a), ">").concat(o.map(St).join(""), "</").concat(t, ">");
}
function Je(e, t, n) {
  if (e && e[t] && e[t][n])
    return {
      prefix: t,
      iconName: n,
      icon: e[t][n]
    };
}
var ne = function(t, n, a, r) {
  var o = Object.keys(t), i = o.length, s = n, l, c, f;
  for (a === void 0 ? (l = 1, f = t[o[0]]) : (l = 0, f = a); l < i; l++)
    c = o[l], f = s(f, t[c], c, t);
  return f;
};
function ir(e) {
  for (var t = [], n = 0, a = e.length; n < a; ) {
    var r = e.charCodeAt(n++);
    if (r >= 55296 && r <= 56319 && n < a) {
      var o = e.charCodeAt(n++);
      (o & 64512) == 56320 ? t.push(((r & 1023) << 10) + (o & 1023) + 65536) : (t.push(r), n--);
    } else
      t.push(r);
  }
  return t;
}
function fe(e) {
  var t = ir(e);
  return t.length === 1 ? t[0].toString(16) : null;
}
function or(e, t) {
  var n = e.length, a = e.charCodeAt(t), r;
  return a >= 55296 && a <= 56319 && n > t + 1 && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (a - 55296) * 1024 + r - 56320 + 65536 : a;
}
function Qe(e) {
  return Object.keys(e).reduce(function(t, n) {
    var a = e[n], r = !!a.icon;
    return r ? t[a.iconName] = a.icon : t[n] = a, t;
  }, {});
}
function ce(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = n.skipHooks, r = a === void 0 ? !1 : a, o = Qe(t);
  typeof P.hooks.addPack == "function" && !r ? P.hooks.addPack(e, Qe(t)) : P.styles[e] = d(d({}, P.styles[e] || {}), o), e === "fas" && ce("fa", t);
}
var It, Lt, Rt, nt = P.styles, sr = P.shims, lr = (It = {}, k(It, p, Object.values(wt[p])), k(It, b, Object.values(wt[b])), It), Pe = null, Un = {}, zn = {}, Fn = {}, jn = {}, Hn = {}, fr = (Lt = {}, k(Lt, p, Object.keys(bt[p])), k(Lt, b, Object.keys(bt[b])), Lt);
function cr(e) {
  return ~Wa.indexOf(e);
}
function ur(e, t) {
  var n = t.split("-"), a = n[0], r = n.slice(1).join("-");
  return a === e && r !== "" && !cr(r) ? r : null;
}
var Yn = function() {
  var t = function(o) {
    return ne(nt, function(i, s, l) {
      return i[l] = ne(s, o, {}), i;
    }, {});
  };
  Un = t(function(r, o, i) {
    if (o[3] && (r[o[3]] = i), o[2]) {
      var s = o[2].filter(function(l) {
        return typeof l == "number";
      });
      s.forEach(function(l) {
        r[l.toString(16)] = i;
      });
    }
    return r;
  }), zn = t(function(r, o, i) {
    if (r[i] = i, o[2]) {
      var s = o[2].filter(function(l) {
        return typeof l == "string";
      });
      s.forEach(function(l) {
        r[l] = i;
      });
    }
    return r;
  }), Hn = t(function(r, o, i) {
    var s = o[2];
    return r[i] = i, s.forEach(function(l) {
      r[l] = i;
    }), r;
  });
  var n = "far" in nt || m.autoFetchSvg, a = ne(sr, function(r, o) {
    var i = o[0], s = o[1], l = o[2];
    return s === "far" && !n && (s = "fas"), typeof i == "string" && (r.names[i] = {
      prefix: s,
      iconName: l
    }), typeof i == "number" && (r.unicodes[i.toString(16)] = {
      prefix: s,
      iconName: l
    }), r;
  }, {
    names: {},
    unicodes: {}
  });
  Fn = a.names, jn = a.unicodes, Pe = Gt(m.styleDefault, {
    family: m.familyDefault
  });
};
qa(function(e) {
  Pe = Gt(e.styleDefault, {
    family: m.familyDefault
  });
});
Yn();
function Ce(e, t) {
  return (Un[e] || {})[t];
}
function dr(e, t) {
  return (zn[e] || {})[t];
}
function q(e, t) {
  return (Hn[e] || {})[t];
}
function Bn(e) {
  return Fn[e] || {
    prefix: null,
    iconName: null
  };
}
function mr(e) {
  var t = jn[e], n = Ce("fas", e);
  return t || (n ? {
    prefix: "fas",
    iconName: n
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function H() {
  return Pe;
}
var Oe = function() {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};
function Gt(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.family, a = n === void 0 ? p : n, r = bt[a][e], o = yt[a][e] || yt[a][r], i = e in P.styles ? e : null;
  return o || i || null;
}
var Ze = (Rt = {}, k(Rt, p, Object.keys(wt[p])), k(Rt, b, Object.keys(wt[b])), Rt);
function Vt(e) {
  var t, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.skipLookups, r = a === void 0 ? !1 : a, o = (t = {}, k(t, p, "".concat(m.cssPrefix, "-").concat(p)), k(t, b, "".concat(m.cssPrefix, "-").concat(b)), t), i = null, s = p;
  (e.includes(o[p]) || e.some(function(c) {
    return Ze[p].includes(c);
  })) && (s = p), (e.includes(o[b]) || e.some(function(c) {
    return Ze[b].includes(c);
  })) && (s = b);
  var l = e.reduce(function(c, f) {
    var u = ur(m.cssPrefix, f);
    if (nt[f] ? (f = lr[s].includes(f) ? za[s][f] : f, i = f, c.prefix = f) : fr[s].indexOf(f) > -1 ? (i = f, c.prefix = Gt(f, {
      family: s
    })) : u ? c.iconName = u : f !== m.replacementClass && f !== o[p] && f !== o[b] && c.rest.push(f), !r && c.prefix && c.iconName) {
      var h = i === "fa" ? Bn(c.iconName) : {}, v = q(c.prefix, c.iconName);
      h.prefix && (i = null), c.iconName = h.iconName || v || c.iconName, c.prefix = h.prefix || c.prefix, c.prefix === "far" && !nt.far && nt.fas && !m.autoFetchSvg && (c.prefix = "fas");
    }
    return c;
  }, Oe());
  return (e.includes("fa-brands") || e.includes("fab")) && (l.prefix = "fab"), (e.includes("fa-duotone") || e.includes("fad")) && (l.prefix = "fad"), !l.prefix && s === b && (nt.fass || m.autoFetchSvg) && (l.prefix = "fass", l.iconName = q(l.prefix, l.iconName) || l.iconName), (l.prefix === "fa" || i === "fa") && (l.prefix = H() || "fas"), l;
}
var hr = /* @__PURE__ */ function() {
  function e() {
    $a(this, e), this.definitions = {};
  }
  return Pa(e, [{
    key: "add",
    value: function() {
      for (var n = this, a = arguments.length, r = new Array(a), o = 0; o < a; o++)
        r[o] = arguments[o];
      var i = r.reduce(this._pullDefinitions, {});
      Object.keys(i).forEach(function(s) {
        n.definitions[s] = d(d({}, n.definitions[s] || {}), i[s]), ce(s, i[s]);
        var l = wt[p][s];
        l && ce(l, i[s]), Yn();
      });
    }
  }, {
    key: "reset",
    value: function() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function(n, a) {
      var r = a.prefix && a.iconName && a.icon ? {
        0: a
      } : a;
      return Object.keys(r).map(function(o) {
        var i = r[o], s = i.prefix, l = i.iconName, c = i.icon, f = c[2];
        n[s] || (n[s] = {}), f.length > 0 && f.forEach(function(u) {
          typeof u == "string" && (n[s][u] = c);
        }), n[s][l] = c;
      }), n;
    }
  }]), e;
}(), tn = [], at = {}, rt = {}, vr = Object.keys(rt);
function pr(e, t) {
  var n = t.mixoutsTo;
  return tn = e, at = {}, Object.keys(rt).forEach(function(a) {
    vr.indexOf(a) === -1 && delete rt[a];
  }), tn.forEach(function(a) {
    var r = a.mixout ? a.mixout() : {};
    if (Object.keys(r).forEach(function(i) {
      typeof r[i] == "function" && (n[i] = r[i]), Ht(r[i]) === "object" && Object.keys(r[i]).forEach(function(s) {
        n[i] || (n[i] = {}), n[i][s] = r[i][s];
      });
    }), a.hooks) {
      var o = a.hooks();
      Object.keys(o).forEach(function(i) {
        at[i] || (at[i] = []), at[i].push(o[i]);
      });
    }
    a.provides && a.provides(rt);
  }), n;
}
function ue(e, t) {
  for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++)
    a[r - 2] = arguments[r];
  var o = at[e] || [];
  return o.forEach(function(i) {
    t = i.apply(null, [t].concat(a));
  }), t;
}
function Z(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  var r = at[e] || [];
  r.forEach(function(o) {
    o.apply(null, n);
  });
}
function I() {
  var e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
  return rt[e] ? rt[e].apply(null, t) : void 0;
}
function de(e) {
  e.prefix === "fa" && (e.prefix = "fas");
  var t = e.iconName, n = e.prefix || H();
  if (t)
    return t = q(n, t) || t, Je(Wn.definitions, n, t) || Je(P.styles, n, t);
}
var Wn = new hr(), gr = function() {
  m.autoReplaceSvg = !1, m.observeMutations = !1, Z("noAuto");
}, br = {
  i2svg: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return R ? (Z("beforeI2svg", t), I("pseudoElements2svg", t), I("i2svg", t)) : Promise.reject("Operation requires a DOM of some kind.");
  },
  watch: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.autoReplaceSvgRoot;
    m.autoReplaceSvg === !1 && (m.autoReplaceSvg = !0), m.observeMutations = !0, rr(function() {
      wr({
        autoReplaceSvgRoot: n
      }), Z("watch", t);
    });
  }
}, yr = {
  icon: function(t) {
    if (t === null)
      return null;
    if (Ht(t) === "object" && t.prefix && t.iconName)
      return {
        prefix: t.prefix,
        iconName: q(t.prefix, t.iconName) || t.iconName
      };
    if (Array.isArray(t) && t.length === 2) {
      var n = t[1].indexOf("fa-") === 0 ? t[1].slice(3) : t[1], a = Gt(t[0]);
      return {
        prefix: a,
        iconName: q(a, n) || n
      };
    }
    if (typeof t == "string" && (t.indexOf("".concat(m.cssPrefix, "-")) > -1 || t.match(Fa))) {
      var r = Vt(t.split(" "), {
        skipLookups: !0
      });
      return {
        prefix: r.prefix || H(),
        iconName: q(r.prefix, r.iconName) || r.iconName
      };
    }
    if (typeof t == "string") {
      var o = H();
      return {
        prefix: o,
        iconName: q(o, t) || t
      };
    }
  }
}, E = {
  noAuto: gr,
  config: m,
  dom: br,
  parse: yr,
  library: Wn,
  findIconDefinition: de,
  toHtml: St
}, wr = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.autoReplaceSvgRoot, a = n === void 0 ? g : n;
  (Object.keys(P.styles).length > 0 || m.autoFetchSvg) && R && m.autoReplaceSvg && E.dom.i2svg({
    node: a
  });
};
function qt(e, t) {
  return Object.defineProperty(e, "abstract", {
    get: t
  }), Object.defineProperty(e, "html", {
    get: function() {
      return e.abstract.map(function(a) {
        return St(a);
      });
    }
  }), Object.defineProperty(e, "node", {
    get: function() {
      if (R) {
        var a = g.createElement("div");
        return a.innerHTML = e.html, a.children;
      }
    }
  }), e;
}
function kr(e) {
  var t = e.children, n = e.main, a = e.mask, r = e.attributes, o = e.styles, i = e.transform;
  if (Se(i) && n.found && !a.found) {
    var s = n.width, l = n.height, c = {
      x: s / l / 2,
      y: 0.5
    };
    r.style = Xt(d(d({}, o), {}, {
      "transform-origin": "".concat(c.x + i.x / 16, "em ").concat(c.y + i.y / 16, "em")
    }));
  }
  return [{
    tag: "svg",
    attributes: r,
    children: t
  }];
}
function Ar(e) {
  var t = e.prefix, n = e.iconName, a = e.children, r = e.attributes, o = e.symbol, i = o === !0 ? "".concat(t, "-").concat(m.cssPrefix, "-").concat(n) : o;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: d(d({}, r), {}, {
        id: i
      }),
      children: a
    }]
  }];
}
function Ne(e) {
  var t = e.icons, n = t.main, a = t.mask, r = e.prefix, o = e.iconName, i = e.transform, s = e.symbol, l = e.title, c = e.maskId, f = e.titleId, u = e.extra, h = e.watchable, v = h === void 0 ? !1 : h, y = a.found ? a : n, $ = y.width, S = y.height, C = r === "fak", A = [m.replacementClass, o ? "".concat(m.cssPrefix, "-").concat(o) : ""].filter(function(D) {
    return u.classes.indexOf(D) === -1;
  }).filter(function(D) {
    return D !== "" || !!D;
  }).concat(u.classes).join(" "), x = {
    children: [],
    attributes: d(d({}, u.attributes), {}, {
      "data-prefix": r,
      "data-icon": o,
      class: A,
      role: u.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat($, " ").concat(S)
    })
  }, O = C && !~u.classes.indexOf("fa-fw") ? {
    width: "".concat($ / S * 16 * 0.0625, "em")
  } : {};
  v && (x.attributes[Q] = ""), l && (x.children.push({
    tag: "title",
    attributes: {
      id: x.attributes["aria-labelledby"] || "title-".concat(f || At())
    },
    children: [l]
  }), delete x.attributes.title);
  var _ = d(d({}, x), {}, {
    prefix: r,
    iconName: o,
    main: n,
    mask: a,
    maskId: c,
    transform: i,
    symbol: s,
    styles: d(d({}, O), u.styles)
  }), B = a.found && n.found ? I("generateAbstractMask", _) || {
    children: [],
    attributes: {}
  } : I("generateAbstractIcon", _) || {
    children: [],
    attributes: {}
  }, W = B.children, Kt = B.attributes;
  return _.children = W, _.attributes = Kt, s ? Ar(_) : kr(_);
}
function en(e) {
  var t = e.content, n = e.width, a = e.height, r = e.transform, o = e.title, i = e.extra, s = e.watchable, l = s === void 0 ? !1 : s, c = d(d(d({}, i.attributes), o ? {
    title: o
  } : {}), {}, {
    class: i.classes.join(" ")
  });
  l && (c[Q] = "");
  var f = d({}, i.styles);
  Se(r) && (f.transform = tr({
    transform: r,
    startCentered: !0,
    width: n,
    height: a
  }), f["-webkit-transform"] = f.transform);
  var u = Xt(f);
  u.length > 0 && (c.style = u);
  var h = [];
  return h.push({
    tag: "span",
    attributes: c,
    children: [t]
  }), o && h.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [o]
  }), h;
}
function xr(e) {
  var t = e.content, n = e.title, a = e.extra, r = d(d(d({}, a.attributes), n ? {
    title: n
  } : {}), {}, {
    class: a.classes.join(" ")
  }), o = Xt(a.styles);
  o.length > 0 && (r.style = o);
  var i = [];
  return i.push({
    tag: "span",
    attributes: r,
    children: [t]
  }), n && i.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [n]
  }), i;
}
var ae = P.styles;
function me(e) {
  var t = e[0], n = e[1], a = e.slice(4), r = ke(a, 1), o = r[0], i = null;
  return Array.isArray(o) ? i = {
    tag: "g",
    attributes: {
      class: "".concat(m.cssPrefix, "-").concat(V.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(m.cssPrefix, "-").concat(V.SECONDARY),
        fill: "currentColor",
        d: o[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(m.cssPrefix, "-").concat(V.PRIMARY),
        fill: "currentColor",
        d: o[1]
      }
    }]
  } : i = {
    tag: "path",
    attributes: {
      fill: "currentColor",
      d: o
    }
  }, {
    found: !0,
    width: t,
    height: n,
    icon: i
  };
}
var _r = {
  found: !1,
  width: 512,
  height: 512
};
function Er(e, t) {
  !Nn && !m.showMissingIcons && e && console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
}
function he(e, t) {
  var n = t;
  return t === "fa" && m.styleDefault !== null && (t = H()), new Promise(function(a, r) {
    if (I("missingIconAbstract"), n === "fa") {
      var o = Bn(e) || {};
      e = o.iconName || e, t = o.prefix || t;
    }
    if (e && t && ae[t] && ae[t][e]) {
      var i = ae[t][e];
      return a(me(i));
    }
    Er(e, t), a(d(d({}, _r), {}, {
      icon: m.showMissingIcons && e ? I("missingIconAbstract") || {} : {}
    }));
  });
}
var nn = function() {
}, ve = m.measurePerformance && Pt && Pt.mark && Pt.measure ? Pt : {
  mark: nn,
  measure: nn
}, ft = 'FA "6.5.2"', $r = function(t) {
  return ve.mark("".concat(ft, " ").concat(t, " begins")), function() {
    return Xn(t);
  };
}, Xn = function(t) {
  ve.mark("".concat(ft, " ").concat(t, " ends")), ve.measure("".concat(ft, " ").concat(t), "".concat(ft, " ").concat(t, " begins"), "".concat(ft, " ").concat(t, " ends"));
}, Te = {
  begin: $r,
  end: Xn
}, Ut = function() {
};
function an(e) {
  var t = e.getAttribute ? e.getAttribute(Q) : null;
  return typeof t == "string";
}
function Sr(e) {
  var t = e.getAttribute ? e.getAttribute(xe) : null, n = e.getAttribute ? e.getAttribute(_e) : null;
  return t && n;
}
function Pr(e) {
  return e && e.classList && e.classList.contains && e.classList.contains(m.replacementClass);
}
function Cr() {
  if (m.autoReplaceSvg === !0)
    return zt.replace;
  var e = zt[m.autoReplaceSvg];
  return e || zt.replace;
}
function Or(e) {
  return g.createElementNS("http://www.w3.org/2000/svg", e);
}
function Nr(e) {
  return g.createElement(e);
}
function Gn(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.ceFn, a = n === void 0 ? e.tag === "svg" ? Or : Nr : n;
  if (typeof e == "string")
    return g.createTextNode(e);
  var r = a(e.tag);
  Object.keys(e.attributes || []).forEach(function(i) {
    r.setAttribute(i, e.attributes[i]);
  });
  var o = e.children || [];
  return o.forEach(function(i) {
    r.appendChild(Gn(i, {
      ceFn: a
    }));
  }), r;
}
function Tr(e) {
  var t = " ".concat(e.outerHTML, " ");
  return t = "".concat(t, "Font Awesome fontawesome.com "), t;
}
var zt = {
  replace: function(t) {
    var n = t[0];
    if (n.parentNode)
      if (t[1].forEach(function(r) {
        n.parentNode.insertBefore(Gn(r), n);
      }), n.getAttribute(Q) === null && m.keepOriginalSource) {
        var a = g.createComment(Tr(n));
        n.parentNode.replaceChild(a, n);
      } else
        n.remove();
  },
  nest: function(t) {
    var n = t[0], a = t[1];
    if (~$e(n).indexOf(m.replacementClass))
      return zt.replace(t);
    var r = new RegExp("".concat(m.cssPrefix, "-.*"));
    if (delete a[0].attributes.id, a[0].attributes.class) {
      var o = a[0].attributes.class.split(" ").reduce(function(s, l) {
        return l === m.replacementClass || l.match(r) ? s.toSvg.push(l) : s.toNode.push(l), s;
      }, {
        toNode: [],
        toSvg: []
      });
      a[0].attributes.class = o.toSvg.join(" "), o.toNode.length === 0 ? n.removeAttribute("class") : n.setAttribute("class", o.toNode.join(" "));
    }
    var i = a.map(function(s) {
      return St(s);
    }).join(`
`);
    n.setAttribute(Q, ""), n.innerHTML = i;
  }
};
function rn(e) {
  e();
}
function Vn(e, t) {
  var n = typeof t == "function" ? t : Ut;
  if (e.length === 0)
    n();
  else {
    var a = rn;
    m.mutateApproach === Da && (a = j.requestAnimationFrame || rn), a(function() {
      var r = Cr(), o = Te.begin("mutate");
      e.map(r), o(), n();
    });
  }
}
var Me = !1;
function qn() {
  Me = !0;
}
function pe() {
  Me = !1;
}
var Bt = null;
function on(e) {
  if (Ve && m.observeMutations) {
    var t = e.treeCallback, n = t === void 0 ? Ut : t, a = e.nodeCallback, r = a === void 0 ? Ut : a, o = e.pseudoElementsCallback, i = o === void 0 ? Ut : o, s = e.observeMutationsRoot, l = s === void 0 ? g : s;
    Bt = new Ve(function(c) {
      if (!Me) {
        var f = H();
        st(c).forEach(function(u) {
          if (u.type === "childList" && u.addedNodes.length > 0 && !an(u.addedNodes[0]) && (m.searchPseudoElements && i(u.target), n(u.target)), u.type === "attributes" && u.target.parentNode && m.searchPseudoElements && i(u.target.parentNode), u.type === "attributes" && an(u.target) && ~Ba.indexOf(u.attributeName))
            if (u.attributeName === "class" && Sr(u.target)) {
              var h = Vt($e(u.target)), v = h.prefix, y = h.iconName;
              u.target.setAttribute(xe, v || f), y && u.target.setAttribute(_e, y);
            } else Pr(u.target) && r(u.target);
        });
      }
    }), R && Bt.observe(l, {
      childList: !0,
      attributes: !0,
      characterData: !0,
      subtree: !0
    });
  }
}
function Mr() {
  Bt && Bt.disconnect();
}
function Ir(e) {
  var t = e.getAttribute("style"), n = [];
  return t && (n = t.split(";").reduce(function(a, r) {
    var o = r.split(":"), i = o[0], s = o.slice(1);
    return i && s.length > 0 && (a[i] = s.join(":").trim()), a;
  }, {})), n;
}
function Lr(e) {
  var t = e.getAttribute("data-prefix"), n = e.getAttribute("data-icon"), a = e.innerText !== void 0 ? e.innerText.trim() : "", r = Vt($e(e));
  return r.prefix || (r.prefix = H()), t && n && (r.prefix = t, r.iconName = n), r.iconName && r.prefix || (r.prefix && a.length > 0 && (r.iconName = dr(r.prefix, e.innerText) || Ce(r.prefix, fe(e.innerText))), !r.iconName && m.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (r.iconName = e.firstChild.data)), r;
}
function Rr(e) {
  var t = st(e.attributes).reduce(function(r, o) {
    return r.name !== "class" && r.name !== "style" && (r[o.name] = o.value), r;
  }, {}), n = e.getAttribute("title"), a = e.getAttribute("data-fa-title-id");
  return m.autoA11y && (n ? t["aria-labelledby"] = "".concat(m.replacementClass, "-title-").concat(a || At()) : (t["aria-hidden"] = "true", t.focusable = "false")), t;
}
function Dr() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: N,
    symbol: !1,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function sn(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: !0
  }, n = Lr(e), a = n.iconName, r = n.prefix, o = n.rest, i = Rr(e), s = ue("parseNodeAttributes", {}, e), l = t.styleParser ? Ir(e) : [];
  return d({
    iconName: a,
    title: e.getAttribute("title"),
    titleId: e.getAttribute("data-fa-title-id"),
    prefix: r,
    transform: N,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: !1,
    extra: {
      classes: o,
      styles: l,
      attributes: i
    }
  }, s);
}
var Ur = P.styles;
function Kn(e) {
  var t = m.autoReplaceSvg === "nest" ? sn(e, {
    styleParser: !1
  }) : sn(e);
  return ~t.extra.classes.indexOf(Tn) ? I("generateLayersText", e, t) : I("generateSvgReplacementMutation", e, t);
}
var Y = /* @__PURE__ */ new Set();
Ee.map(function(e) {
  Y.add("fa-".concat(e));
});
Object.keys(bt[p]).map(Y.add.bind(Y));
Object.keys(bt[b]).map(Y.add.bind(Y));
Y = Et(Y);
function ln(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!R) return Promise.resolve();
  var n = g.documentElement.classList, a = function(u) {
    return n.add("".concat(qe, "-").concat(u));
  }, r = function(u) {
    return n.remove("".concat(qe, "-").concat(u));
  }, o = m.autoFetchSvg ? Y : Ee.map(function(f) {
    return "fa-".concat(f);
  }).concat(Object.keys(Ur));
  o.includes("fa") || o.push("fa");
  var i = [".".concat(Tn, ":not([").concat(Q, "])")].concat(o.map(function(f) {
    return ".".concat(f, ":not([").concat(Q, "])");
  })).join(", ");
  if (i.length === 0)
    return Promise.resolve();
  var s = [];
  try {
    s = st(e.querySelectorAll(i));
  } catch {
  }
  if (s.length > 0)
    a("pending"), r("complete");
  else
    return Promise.resolve();
  var l = Te.begin("onTree"), c = s.reduce(function(f, u) {
    try {
      var h = Kn(u);
      h && f.push(h);
    } catch (v) {
      Nn || v.name === "MissingIcon" && console.error(v);
    }
    return f;
  }, []);
  return new Promise(function(f, u) {
    Promise.all(c).then(function(h) {
      Vn(h, function() {
        a("active"), a("complete"), r("pending"), typeof t == "function" && t(), l(), f();
      });
    }).catch(function(h) {
      l(), u(h);
    });
  });
}
function zr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  Kn(e).then(function(n) {
    n && Vn([n], t);
  });
}
function Fr(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = (t || {}).icon ? t : de(t || {}), r = n.mask;
    return r && (r = (r || {}).icon ? r : de(r || {})), e(a, d(d({}, n), {}, {
      mask: r
    }));
  };
}
var jr = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.transform, r = a === void 0 ? N : a, o = n.symbol, i = o === void 0 ? !1 : o, s = n.mask, l = s === void 0 ? null : s, c = n.maskId, f = c === void 0 ? null : c, u = n.title, h = u === void 0 ? null : u, v = n.titleId, y = v === void 0 ? null : v, $ = n.classes, S = $ === void 0 ? [] : $, C = n.attributes, A = C === void 0 ? {} : C, x = n.styles, O = x === void 0 ? {} : x;
  if (t) {
    var _ = t.prefix, B = t.iconName, W = t.icon;
    return qt(d({
      type: "icon"
    }, t), function() {
      return Z("beforeDOMElementCreation", {
        iconDefinition: t,
        params: n
      }), m.autoA11y && (h ? A["aria-labelledby"] = "".concat(m.replacementClass, "-title-").concat(y || At()) : (A["aria-hidden"] = "true", A.focusable = "false")), Ne({
        icons: {
          main: me(W),
          mask: l ? me(l.icon) : {
            found: !1,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: _,
        iconName: B,
        transform: d(d({}, N), r),
        symbol: i,
        title: h,
        maskId: f,
        titleId: y,
        extra: {
          attributes: A,
          styles: O,
          classes: S
        }
      });
    });
  }
}, Hr = {
  mixout: function() {
    return {
      icon: Fr(jr)
    };
  },
  hooks: function() {
    return {
      mutationObserverCallbacks: function(n) {
        return n.treeCallback = ln, n.nodeCallback = zr, n;
      }
    };
  },
  provides: function(t) {
    t.i2svg = function(n) {
      var a = n.node, r = a === void 0 ? g : a, o = n.callback, i = o === void 0 ? function() {
      } : o;
      return ln(r, i);
    }, t.generateSvgReplacementMutation = function(n, a) {
      var r = a.iconName, o = a.title, i = a.titleId, s = a.prefix, l = a.transform, c = a.symbol, f = a.mask, u = a.maskId, h = a.extra;
      return new Promise(function(v, y) {
        Promise.all([he(r, s), f.iconName ? he(f.iconName, f.prefix) : Promise.resolve({
          found: !1,
          width: 512,
          height: 512,
          icon: {}
        })]).then(function($) {
          var S = ke($, 2), C = S[0], A = S[1];
          v([n, Ne({
            icons: {
              main: C,
              mask: A
            },
            prefix: s,
            iconName: r,
            transform: l,
            symbol: c,
            maskId: u,
            title: o,
            titleId: i,
            extra: h,
            watchable: !0
          })]);
        }).catch(y);
      });
    }, t.generateAbstractIcon = function(n) {
      var a = n.children, r = n.attributes, o = n.main, i = n.transform, s = n.styles, l = Xt(s);
      l.length > 0 && (r.style = l);
      var c;
      return Se(i) && (c = I("generateAbstractTransformGrouping", {
        main: o,
        transform: i,
        containerWidth: o.width,
        iconWidth: o.width
      })), a.push(c || o.icon), {
        children: a,
        attributes: r
      };
    };
  }
}, Yr = {
  mixout: function() {
    return {
      layer: function(n) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = a.classes, o = r === void 0 ? [] : r;
        return qt({
          type: "layer"
        }, function() {
          Z("beforeDOMElementCreation", {
            assembler: n,
            params: a
          });
          var i = [];
          return n(function(s) {
            Array.isArray(s) ? s.map(function(l) {
              i = i.concat(l.abstract);
            }) : i = i.concat(s.abstract);
          }), [{
            tag: "span",
            attributes: {
              class: ["".concat(m.cssPrefix, "-layers")].concat(Et(o)).join(" ")
            },
            children: i
          }];
        });
      }
    };
  }
}, Br = {
  mixout: function() {
    return {
      counter: function(n) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = a.title, o = r === void 0 ? null : r, i = a.classes, s = i === void 0 ? [] : i, l = a.attributes, c = l === void 0 ? {} : l, f = a.styles, u = f === void 0 ? {} : f;
        return qt({
          type: "counter",
          content: n
        }, function() {
          return Z("beforeDOMElementCreation", {
            content: n,
            params: a
          }), xr({
            content: n.toString(),
            title: o,
            extra: {
              attributes: c,
              styles: u,
              classes: ["".concat(m.cssPrefix, "-layers-counter")].concat(Et(s))
            }
          });
        });
      }
    };
  }
}, Wr = {
  mixout: function() {
    return {
      text: function(n) {
        var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = a.transform, o = r === void 0 ? N : r, i = a.title, s = i === void 0 ? null : i, l = a.classes, c = l === void 0 ? [] : l, f = a.attributes, u = f === void 0 ? {} : f, h = a.styles, v = h === void 0 ? {} : h;
        return qt({
          type: "text",
          content: n
        }, function() {
          return Z("beforeDOMElementCreation", {
            content: n,
            params: a
          }), en({
            content: n,
            transform: d(d({}, N), o),
            title: s,
            extra: {
              attributes: u,
              styles: v,
              classes: ["".concat(m.cssPrefix, "-layers-text")].concat(Et(c))
            }
          });
        });
      }
    };
  },
  provides: function(t) {
    t.generateLayersText = function(n, a) {
      var r = a.title, o = a.transform, i = a.extra, s = null, l = null;
      if (Pn) {
        var c = parseInt(getComputedStyle(n).fontSize, 10), f = n.getBoundingClientRect();
        s = f.width / c, l = f.height / c;
      }
      return m.autoA11y && !r && (i.attributes["aria-hidden"] = "true"), Promise.resolve([n, en({
        content: n.innerHTML,
        width: s,
        height: l,
        transform: o,
        title: r,
        extra: i,
        watchable: !0
      })]);
    };
  }
}, Xr = new RegExp('"', "ug"), fn = [1105920, 1112319];
function Gr(e) {
  var t = e.replace(Xr, ""), n = or(t, 0), a = n >= fn[0] && n <= fn[1], r = t.length === 2 ? t[0] === t[1] : !1;
  return {
    value: fe(r ? t[0] : t),
    isSecondary: a || r
  };
}
function cn(e, t) {
  var n = "".concat(Ra).concat(t.replace(":", "-"));
  return new Promise(function(a, r) {
    if (e.getAttribute(n) !== null)
      return a();
    var o = st(e.children), i = o.filter(function(W) {
      return W.getAttribute(le) === t;
    })[0], s = j.getComputedStyle(e, t), l = s.getPropertyValue("font-family").match(ja), c = s.getPropertyValue("font-weight"), f = s.getPropertyValue("content");
    if (i && !l)
      return e.removeChild(i), a();
    if (l && f !== "none" && f !== "") {
      var u = s.getPropertyValue("content"), h = ~["Sharp"].indexOf(l[2]) ? b : p, v = ~["Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit"].indexOf(l[2]) ? yt[h][l[2].toLowerCase()] : Ha[h][c], y = Gr(u), $ = y.value, S = y.isSecondary, C = l[0].startsWith("FontAwesome"), A = Ce(v, $), x = A;
      if (C) {
        var O = mr($);
        O.iconName && O.prefix && (A = O.iconName, v = O.prefix);
      }
      if (A && !S && (!i || i.getAttribute(xe) !== v || i.getAttribute(_e) !== x)) {
        e.setAttribute(n, x), i && e.removeChild(i);
        var _ = Dr(), B = _.extra;
        B.attributes[le] = t, he(A, v).then(function(W) {
          var Kt = Ne(d(d({}, _), {}, {
            icons: {
              main: W,
              mask: Oe()
            },
            prefix: v,
            iconName: x,
            extra: B,
            watchable: !0
          })), D = g.createElementNS("http://www.w3.org/2000/svg", "svg");
          t === "::before" ? e.insertBefore(D, e.firstChild) : e.appendChild(D), D.outerHTML = Kt.map(function(Jn) {
            return St(Jn);
          }).join(`
`), e.removeAttribute(n), a();
        }).catch(r);
      } else
        a();
    } else
      a();
  });
}
function Vr(e) {
  return Promise.all([cn(e, "::before"), cn(e, "::after")]);
}
function qr(e) {
  return e.parentNode !== document.head && !~Ua.indexOf(e.tagName.toUpperCase()) && !e.getAttribute(le) && (!e.parentNode || e.parentNode.tagName !== "svg");
}
function un(e) {
  if (R)
    return new Promise(function(t, n) {
      var a = st(e.querySelectorAll("*")).filter(qr).map(Vr), r = Te.begin("searchPseudoElements");
      qn(), Promise.all(a).then(function() {
        r(), pe(), t();
      }).catch(function() {
        r(), pe(), n();
      });
    });
}
var Kr = {
  hooks: function() {
    return {
      mutationObserverCallbacks: function(n) {
        return n.pseudoElementsCallback = un, n;
      }
    };
  },
  provides: function(t) {
    t.pseudoElements2svg = function(n) {
      var a = n.node, r = a === void 0 ? g : a;
      m.searchPseudoElements && un(r);
    };
  }
}, dn = !1, Jr = {
  mixout: function() {
    return {
      dom: {
        unwatch: function() {
          qn(), dn = !0;
        }
      }
    };
  },
  hooks: function() {
    return {
      bootstrap: function() {
        on(ue("mutationObserverCallbacks", {}));
      },
      noAuto: function() {
        Mr();
      },
      watch: function(n) {
        var a = n.observeMutationsRoot;
        dn ? pe() : on(ue("mutationObserverCallbacks", {
          observeMutationsRoot: a
        }));
      }
    };
  }
}, mn = function(t) {
  var n = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return t.toLowerCase().split(" ").reduce(function(a, r) {
    var o = r.toLowerCase().split("-"), i = o[0], s = o.slice(1).join("-");
    if (i && s === "h")
      return a.flipX = !0, a;
    if (i && s === "v")
      return a.flipY = !0, a;
    if (s = parseFloat(s), isNaN(s))
      return a;
    switch (i) {
      case "grow":
        a.size = a.size + s;
        break;
      case "shrink":
        a.size = a.size - s;
        break;
      case "left":
        a.x = a.x - s;
        break;
      case "right":
        a.x = a.x + s;
        break;
      case "up":
        a.y = a.y - s;
        break;
      case "down":
        a.y = a.y + s;
        break;
      case "rotate":
        a.rotate = a.rotate + s;
        break;
    }
    return a;
  }, n);
}, Qr = {
  mixout: function() {
    return {
      parse: {
        transform: function(n) {
          return mn(n);
        }
      }
    };
  },
  hooks: function() {
    return {
      parseNodeAttributes: function(n, a) {
        var r = a.getAttribute("data-fa-transform");
        return r && (n.transform = mn(r)), n;
      }
    };
  },
  provides: function(t) {
    t.generateAbstractTransformGrouping = function(n) {
      var a = n.main, r = n.transform, o = n.containerWidth, i = n.iconWidth, s = {
        transform: "translate(".concat(o / 2, " 256)")
      }, l = "translate(".concat(r.x * 32, ", ").concat(r.y * 32, ") "), c = "scale(".concat(r.size / 16 * (r.flipX ? -1 : 1), ", ").concat(r.size / 16 * (r.flipY ? -1 : 1), ") "), f = "rotate(".concat(r.rotate, " 0 0)"), u = {
        transform: "".concat(l, " ").concat(c, " ").concat(f)
      }, h = {
        transform: "translate(".concat(i / 2 * -1, " -256)")
      }, v = {
        outer: s,
        inner: u,
        path: h
      };
      return {
        tag: "g",
        attributes: d({}, v.outer),
        children: [{
          tag: "g",
          attributes: d({}, v.inner),
          children: [{
            tag: a.icon.tag,
            children: a.icon.children,
            attributes: d(d({}, a.icon.attributes), v.path)
          }]
        }]
      };
    };
  }
}, re = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function hn(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e;
}
function Zr(e) {
  return e.tag === "g" ? e.children : [e];
}
var ti = {
  hooks: function() {
    return {
      parseNodeAttributes: function(n, a) {
        var r = a.getAttribute("data-fa-mask"), o = r ? Vt(r.split(" ").map(function(i) {
          return i.trim();
        })) : Oe();
        return o.prefix || (o.prefix = H()), n.mask = o, n.maskId = a.getAttribute("data-fa-mask-id"), n;
      }
    };
  },
  provides: function(t) {
    t.generateAbstractMask = function(n) {
      var a = n.children, r = n.attributes, o = n.main, i = n.mask, s = n.maskId, l = n.transform, c = o.width, f = o.icon, u = i.width, h = i.icon, v = Za({
        transform: l,
        containerWidth: u,
        iconWidth: c
      }), y = {
        tag: "rect",
        attributes: d(d({}, re), {}, {
          fill: "white"
        })
      }, $ = f.children ? {
        children: f.children.map(hn)
      } : {}, S = {
        tag: "g",
        attributes: d({}, v.inner),
        children: [hn(d({
          tag: f.tag,
          attributes: d(d({}, f.attributes), v.path)
        }, $))]
      }, C = {
        tag: "g",
        attributes: d({}, v.outer),
        children: [S]
      }, A = "mask-".concat(s || At()), x = "clip-".concat(s || At()), O = {
        tag: "mask",
        attributes: d(d({}, re), {}, {
          id: A,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        }),
        children: [y, C]
      }, _ = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: x
          },
          children: Zr(h)
        }, O]
      };
      return a.push(_, {
        tag: "rect",
        attributes: d({
          fill: "currentColor",
          "clip-path": "url(#".concat(x, ")"),
          mask: "url(#".concat(A, ")")
        }, re)
      }), {
        children: a,
        attributes: r
      };
    };
  }
}, ei = {
  provides: function(t) {
    var n = !1;
    j.matchMedia && (n = j.matchMedia("(prefers-reduced-motion: reduce)").matches), t.missingIconAbstract = function() {
      var a = [], r = {
        fill: "currentColor"
      }, o = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      a.push({
        tag: "path",
        attributes: d(d({}, r), {}, {
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
      });
      var i = d(d({}, o), {}, {
        attributeName: "opacity"
      }), s = {
        tag: "circle",
        attributes: d(d({}, r), {}, {
          cx: "256",
          cy: "364",
          r: "28"
        }),
        children: []
      };
      return n || s.children.push({
        tag: "animate",
        attributes: d(d({}, o), {}, {
          attributeName: "r",
          values: "28;14;28;28;14;28;"
        })
      }, {
        tag: "animate",
        attributes: d(d({}, i), {}, {
          values: "1;0;1;1;0;1;"
        })
      }), a.push(s), a.push({
        tag: "path",
        attributes: d(d({}, r), {}, {
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        }),
        children: n ? [] : [{
          tag: "animate",
          attributes: d(d({}, i), {}, {
            values: "1;0;0;0;0;1;"
          })
        }]
      }), n || a.push({
        tag: "path",
        attributes: d(d({}, r), {}, {
          opacity: "0",
          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        }),
        children: [{
          tag: "animate",
          attributes: d(d({}, i), {}, {
            values: "0;0;1;1;0;0;"
          })
        }]
      }), {
        tag: "g",
        attributes: {
          class: "missing"
        },
        children: a
      };
    };
  }
}, ni = {
  hooks: function() {
    return {
      parseNodeAttributes: function(n, a) {
        var r = a.getAttribute("data-fa-symbol"), o = r === null ? !1 : r === "" ? !0 : r;
        return n.symbol = o, n;
      }
    };
  }
}, ai = [nr, Hr, Yr, Br, Wr, Kr, Jr, Qr, ti, ei, ni];
pr(ai, {
  mixoutsTo: E
});
E.noAuto;
E.config;
var ri = E.library;
E.dom;
E.parse;
E.findIconDefinition;
E.toHtml;
var ii = E.icon;
E.layer;
E.text;
E.counter;
var ge = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var t = "fas", n = "xmark", a = 384, r = 512, o = [128473, 10005, 10006, 10060, 215, "close", "multiply", "remove", "times"], i = "f00d", s = "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z";
  e.definition = {
    prefix: t,
    iconName: n,
    icon: [
      a,
      r,
      o,
      i,
      s
    ]
  }, e.faXmark = e.definition, e.prefix = t, e.iconName = n, e.width = a, e.height = r, e.ligatures = o, e.unicode = i, e.svgPathData = s, e.aliases = o;
})(ge);
var oi = Object.defineProperty, si = Object.getOwnPropertyDescriptor, tt = (e, t, n, a) => {
  for (var r = a > 1 ? void 0 : a ? si(t, n) : t, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (r = (a ? i(t, n, r) : i(r)) || r);
  return a && r && oi(t, n, r), r;
};
let L = class extends dt {
  constructor() {
    super(), this.isOpen = !1, this.titleModal = "", this.debug = !1, this.handleKeyDown = (e) => {
      this.isOpen && e.key === "Escape" && this.closeModal();
    }, ri.add(ge.faXmark);
  }
  firstUpdated() {
    this.modalElement = this.renderRoot.querySelector("#modal"), this.closeButtonElement = this.renderRoot.querySelector(".close-button"), this.modalElement !== null || this.modalElement !== void 0 ? this.log("modal retrieved successfully") : this.log("modal not retrieved"), this.closeButtonElement !== null || this.closeButtonElement !== void 0 ? this.log("close button retrieved successfully") : this.log("close button not retrieved"), this.mainElement = document.querySelector("main"), this.mainElement !== null || this.mainElement !== void 0 ? this.log("main retrieved successfully") : this.log("main not retrieved"), this.modalElement && (this.modalElement.addEventListener("click", this.closeModalWithoutButton.bind(this)), document.addEventListener("keydown", this.handleKeyDown.bind(this))), this.closeButtonElement && (this.closeButtonElement.addEventListener("click", () => this.closeModal()), window.setTimeout(() => {
      this.closeButtonElement.focus();
    }, 100)), this.log("component first updated");
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    var e, t;
    document.removeEventListener("keydown", this.handleKeyDown), (e = this.modalElement) == null || e.removeEventListener("click", this.closeModalWithoutButton), (t = this.closeButtonElement) == null || t.removeEventListener("click", this.closeModal), super.disconnectedCallback();
  }
  log(e) {
    this.debug === !0 && console.log(e);
  }
  openModal() {
    var e, t;
    this.mainElement && (this.modalElement.removeAttribute("aria-hidden"), this.modalElement.setAttribute("aria-hidden", "false"), this.mainElement.inert = !0, this.mainElement.setAttribute("aria-hidden", "true"), this.log(
      "element actif : { type : " + ((e = document.activeElement) == null ? void 0 : e.tagName) + `, 
 classe : ` + ((t = document.activeElement) == null ? void 0 : t.classList)
    ), this.setFocus());
  }
  setFocus() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".close-button");
    window.setTimeout(() => {
      e.focus();
    }, 100);
  }
  closeModal() {
    this.log("main " + this.mainElement), this.log("modal " + this.modalElement), this.modalElement.removeAttribute("aria-hidden"), this.modalElement.setAttribute("aria-hidden", "true"), this.mainElement && (this.mainElement.removeAttribute("aria-hidden"), this.mainElement.setAttribute("aria-hidden", "false"), this.mainElement.inert = !1), this.isOpen = !1;
    const e = this.renderRoot.querySelectorAll("slot");
    window.setTimeout(() => {
      e == null || e.forEach((t) => t.scrollTo(0, 0));
    }, 200), window.setTimeout(() => {
      const t = new CustomEvent("closeModale", {
        bubbles: !0,
        composed: !0
      });
      document.dispatchEvent(t);
    }, 210);
  }
  closeModalWithoutButton(e) {
    e.target === this.modalElement && this.closeModal();
  }
  updated(e) {
    var t;
    e.has("isOpen") && (this.log("isOpen updated"), this.isOpen ? (this.log("isOpen updated : true"), this.openModal(), ((t = this.shadowRoot) == null ? void 0 : t.querySelector(".close-button")).focus()) : (this.log("isOpen updated : false"), this.closeModal()));
  }
  render() {
    const e = `${ii(ge.faXmark).html}`;
    return ca` <div
      id="modal"
      class="modal-overlay"
      aria-modal="true"
      role="dialog"
      aria-labelledby="${this.titleModal}"
      aria-live="assertive"
      aria-hidden="true">
      <div class="modal-container" id="modal-container" role="document">
        <div class="modal-header">
          <h2 class="modal-title" title="${this.titleModal}">${this.titleModal}</h2>

          <button
            id="close-button"
            type="button"
            aria-label="close"
            class="close-button"
            title="Fermer la modale"
            tabindex="0">
            ${ka(e)}
          </button>
        </div>

        <slot name="modal-body" class="modal-body"> </slot>

        <slot name="modal-footer" class="modal-footer"> </slot>
      </div>
    </div>`;
  }
};
L.styles = Qn`
    ${gn(Ea)}
  `;
tt([
  _t({ type: Boolean, reflect: !0 })
], L.prototype, "isOpen", 2);
tt([
  _t({ type: String })
], L.prototype, "titleModal", 2);
tt([
  _t({ type: Boolean })
], L.prototype, "debug", 2);
tt([
  _t()
], L.prototype, "mainElement", 2);
tt([
  xn()
], L.prototype, "modalElement", 2);
tt([
  xn()
], L.prototype, "closeButtonElement", 2);
L = tt([
  Aa("info-modal")
], L);
export {
  L as InfoModal
};
//# sourceMappingURL=info-modal.js.map

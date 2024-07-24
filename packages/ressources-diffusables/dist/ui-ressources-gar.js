var vr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Pf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var wf = { exports: {} };
(function(e) {
  var t = function(n) {
    var r = Object.prototype, s = r.hasOwnProperty, o = Object.defineProperty || function(U, k, j) {
      U[k] = j.value;
    }, i, a = typeof Symbol == "function" ? Symbol : {}, c = a.iterator || "@@iterator", l = a.asyncIterator || "@@asyncIterator", u = a.toStringTag || "@@toStringTag";
    function m(U, k, j) {
      return Object.defineProperty(U, k, {
        value: j,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), U[k];
    }
    try {
      m({}, "");
    } catch {
      m = function(k, j, W) {
        return k[j] = W;
      };
    }
    function p(U, k, j, W) {
      var q = k && k.prototype instanceof g ? k : g, oe = Object.create(q.prototype), Ce = new Ee(W || []);
      return o(oe, "_invoke", { value: re(U, j, Ce) }), oe;
    }
    n.wrap = p;
    function S(U, k, j) {
      try {
        return { type: "normal", arg: U.call(k, j) };
      } catch (W) {
        return { type: "throw", arg: W };
      }
    }
    var I = "suspendedStart", A = "suspendedYield", w = "executing", v = "completed", C = {};
    function g() {
    }
    function O() {
    }
    function L() {
    }
    var y = {};
    m(y, c, function() {
      return this;
    });
    var P = Object.getPrototypeOf, V = P && P(P(ue([])));
    V && V !== r && s.call(V, c) && (y = V);
    var $ = L.prototype = g.prototype = Object.create(y);
    O.prototype = L, o($, "constructor", { value: L, configurable: !0 }), o(
      L,
      "constructor",
      { value: O, configurable: !0 }
    ), O.displayName = m(
      L,
      u,
      "GeneratorFunction"
    );
    function de(U) {
      ["next", "throw", "return"].forEach(function(k) {
        m(U, k, function(j) {
          return this._invoke(k, j);
        });
      });
    }
    n.isGeneratorFunction = function(U) {
      var k = typeof U == "function" && U.constructor;
      return k ? k === O || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (k.displayName || k.name) === "GeneratorFunction" : !1;
    }, n.mark = function(U) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(U, L) : (U.__proto__ = L, m(U, u, "GeneratorFunction")), U.prototype = Object.create($), U;
    }, n.awrap = function(U) {
      return { __await: U };
    };
    function Oe(U, k) {
      function j(oe, Ce, he, De) {
        var Ie = S(U[oe], U, Ce);
        if (Ie.type === "throw")
          De(Ie.arg);
        else {
          var bt = Ie.arg, ke = bt.value;
          return ke && typeof ke == "object" && s.call(ke, "__await") ? k.resolve(ke.__await).then(function($e) {
            j("next", $e, he, De);
          }, function($e) {
            j("throw", $e, he, De);
          }) : k.resolve(ke).then(function($e) {
            bt.value = $e, he(bt);
          }, function($e) {
            return j("throw", $e, he, De);
          });
        }
      }
      var W;
      function q(oe, Ce) {
        function he() {
          return new k(function(De, Ie) {
            j(oe, Ce, De, Ie);
          });
        }
        return W = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        W ? W.then(
          he,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          he
        ) : he();
      }
      o(this, "_invoke", { value: q });
    }
    de(Oe.prototype), m(Oe.prototype, l, function() {
      return this;
    }), n.AsyncIterator = Oe, n.async = function(U, k, j, W, q) {
      q === void 0 && (q = Promise);
      var oe = new Oe(
        p(U, k, j, W),
        q
      );
      return n.isGeneratorFunction(k) ? oe : oe.next().then(function(Ce) {
        return Ce.done ? Ce.value : oe.next();
      });
    };
    function re(U, k, j) {
      var W = I;
      return function(oe, Ce) {
        if (W === w)
          throw new Error("Generator is already running");
        if (W === v) {
          if (oe === "throw")
            throw Ce;
          return ce();
        }
        for (j.method = oe, j.arg = Ce; ; ) {
          var he = j.delegate;
          if (he) {
            var De = ve(he, j);
            if (De) {
              if (De === C) continue;
              return De;
            }
          }
          if (j.method === "next")
            j.sent = j._sent = j.arg;
          else if (j.method === "throw") {
            if (W === I)
              throw W = v, j.arg;
            j.dispatchException(j.arg);
          } else j.method === "return" && j.abrupt("return", j.arg);
          W = w;
          var Ie = S(U, k, j);
          if (Ie.type === "normal") {
            if (W = j.done ? v : A, Ie.arg === C)
              continue;
            return {
              value: Ie.arg,
              done: j.done
            };
          } else Ie.type === "throw" && (W = v, j.method = "throw", j.arg = Ie.arg);
        }
      };
    }
    function ve(U, k) {
      var j = k.method, W = U.iterator[j];
      if (W === i)
        return k.delegate = null, j === "throw" && U.iterator.return && (k.method = "return", k.arg = i, ve(U, k), k.method === "throw") || j !== "return" && (k.method = "throw", k.arg = new TypeError(
          "The iterator does not provide a '" + j + "' method"
        )), C;
      var q = S(W, U.iterator, k.arg);
      if (q.type === "throw")
        return k.method = "throw", k.arg = q.arg, k.delegate = null, C;
      var oe = q.arg;
      if (!oe)
        return k.method = "throw", k.arg = new TypeError("iterator result is not an object"), k.delegate = null, C;
      if (oe.done)
        k[U.resultName] = oe.value, k.next = U.nextLoc, k.method !== "return" && (k.method = "next", k.arg = i);
      else
        return oe;
      return k.delegate = null, C;
    }
    de($), m($, u, "Generator"), m($, c, function() {
      return this;
    }), m($, "toString", function() {
      return "[object Generator]";
    });
    function Rt(U) {
      var k = { tryLoc: U[0] };
      1 in U && (k.catchLoc = U[1]), 2 in U && (k.finallyLoc = U[2], k.afterLoc = U[3]), this.tryEntries.push(k);
    }
    function gt(U) {
      var k = U.completion || {};
      k.type = "normal", delete k.arg, U.completion = k;
    }
    function Ee(U) {
      this.tryEntries = [{ tryLoc: "root" }], U.forEach(Rt, this), this.reset(!0);
    }
    n.keys = function(U) {
      var k = Object(U), j = [];
      for (var W in k)
        j.push(W);
      return j.reverse(), function q() {
        for (; j.length; ) {
          var oe = j.pop();
          if (oe in k)
            return q.value = oe, q.done = !1, q;
        }
        return q.done = !0, q;
      };
    };
    function ue(U) {
      if (U != null) {
        var k = U[c];
        if (k)
          return k.call(U);
        if (typeof U.next == "function")
          return U;
        if (!isNaN(U.length)) {
          var j = -1, W = function q() {
            for (; ++j < U.length; )
              if (s.call(U, j))
                return q.value = U[j], q.done = !1, q;
            return q.value = i, q.done = !0, q;
          };
          return W.next = W;
        }
      }
      throw new TypeError(typeof U + " is not iterable");
    }
    n.values = ue;
    function ce() {
      return { value: i, done: !0 };
    }
    return Ee.prototype = {
      constructor: Ee,
      reset: function(U) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = i, this.done = !1, this.delegate = null, this.method = "next", this.arg = i, this.tryEntries.forEach(gt), !U)
          for (var k in this)
            k.charAt(0) === "t" && s.call(this, k) && !isNaN(+k.slice(1)) && (this[k] = i);
      },
      stop: function() {
        this.done = !0;
        var U = this.tryEntries[0], k = U.completion;
        if (k.type === "throw")
          throw k.arg;
        return this.rval;
      },
      dispatchException: function(U) {
        if (this.done)
          throw U;
        var k = this;
        function j(De, Ie) {
          return oe.type = "throw", oe.arg = U, k.next = De, Ie && (k.method = "next", k.arg = i), !!Ie;
        }
        for (var W = this.tryEntries.length - 1; W >= 0; --W) {
          var q = this.tryEntries[W], oe = q.completion;
          if (q.tryLoc === "root")
            return j("end");
          if (q.tryLoc <= this.prev) {
            var Ce = s.call(q, "catchLoc"), he = s.call(q, "finallyLoc");
            if (Ce && he) {
              if (this.prev < q.catchLoc)
                return j(q.catchLoc, !0);
              if (this.prev < q.finallyLoc)
                return j(q.finallyLoc);
            } else if (Ce) {
              if (this.prev < q.catchLoc)
                return j(q.catchLoc, !0);
            } else if (he) {
              if (this.prev < q.finallyLoc)
                return j(q.finallyLoc);
            } else
              throw new Error("try statement without catch or finally");
          }
        }
      },
      abrupt: function(U, k) {
        for (var j = this.tryEntries.length - 1; j >= 0; --j) {
          var W = this.tryEntries[j];
          if (W.tryLoc <= this.prev && s.call(W, "finallyLoc") && this.prev < W.finallyLoc) {
            var q = W;
            break;
          }
        }
        q && (U === "break" || U === "continue") && q.tryLoc <= k && k <= q.finallyLoc && (q = null);
        var oe = q ? q.completion : {};
        return oe.type = U, oe.arg = k, q ? (this.method = "next", this.next = q.finallyLoc, C) : this.complete(oe);
      },
      complete: function(U, k) {
        if (U.type === "throw")
          throw U.arg;
        return U.type === "break" || U.type === "continue" ? this.next = U.arg : U.type === "return" ? (this.rval = this.arg = U.arg, this.method = "return", this.next = "end") : U.type === "normal" && k && (this.next = k), C;
      },
      finish: function(U) {
        for (var k = this.tryEntries.length - 1; k >= 0; --k) {
          var j = this.tryEntries[k];
          if (j.finallyLoc === U)
            return this.complete(j.completion, j.afterLoc), gt(j), C;
        }
      },
      catch: function(U) {
        for (var k = this.tryEntries.length - 1; k >= 0; --k) {
          var j = this.tryEntries[k];
          if (j.tryLoc === U) {
            var W = j.completion;
            if (W.type === "throw") {
              var q = W.arg;
              gt(j);
            }
            return q;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(U, k, j) {
        return this.delegate = {
          iterator: ue(U),
          resultName: k,
          nextLoc: j
        }, this.method === "next" && (this.arg = i), C;
      }
    }, n;
  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    e.exports
  );
  try {
    regeneratorRuntime = t;
  } catch {
    typeof globalThis == "object" ? globalThis.regeneratorRuntime = t : Function("r", "regeneratorRuntime = r")(t);
  }
})(wf);
/**
* @vue/shared v3.4.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function zo(e, t) {
  const n = new Set(e.split(","));
  return (r) => n.has(r);
}
const _e = {}, Dn = [], Qe = () => {
}, xf = () => !1, ss = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), qo = (e) => e.startsWith("onUpdate:"), xe = Object.assign, Wo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, kf = Object.prototype.hasOwnProperty, ae = (e, t) => kf.call(e, t), Z = Array.isArray, Ln = (e) => os(e) === "[object Map]", $c = (e) => os(e) === "[object Set]", ee = (e) => typeof e == "function", Ne = (e) => typeof e == "string", rn = (e) => typeof e == "symbol", be = (e) => e !== null && typeof e == "object", Bc = (e) => (be(e) || ee(e)) && ee(e.then) && ee(e.catch), Kc = Object.prototype.toString, os = (e) => Kc.call(e), Mf = (e) => os(e).slice(8, -1), zc = (e) => os(e) === "[object Object]", Xo = (e) => Ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Qn = /* @__PURE__ */ zo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), is = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ff = /-(\w)/g, Tt = is((e) => e.replace(Ff, (t, n) => n ? n.toUpperCase() : "")), Uf = /\B([A-Z])/g, at = is(
  (e) => e.replace(Uf, "-$1").toLowerCase()
), qc = is((e) => e.charAt(0).toUpperCase() + e.slice(1)), Cs = is((e) => e ? `on${qc(e)}` : ""), Zt = (e, t) => !Object.is(e, t), xr = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Wc = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, Qs = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Mi = (e) => {
  const t = Ne(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Fi;
const Xc = () => Fi || (Fi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Yo(e) {
  if (Z(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = Ne(r) ? Hf(r) : Yo(r);
      if (s)
        for (const o in s)
          t[o] = s[o];
    }
    return t;
  } else if (Ne(e) || be(e))
    return e;
}
const Gf = /;(?![^(]*\))/g, jf = /:([^]+)/, Vf = /\/\*[^]*?\*\//g;
function Hf(e) {
  const t = {};
  return e.replace(Vf, "").split(Gf).forEach((n) => {
    if (n) {
      const r = n.split(jf);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function as(e) {
  let t = "";
  if (Ne(e))
    t = e;
  else if (Z(e))
    for (let n = 0; n < e.length; n++) {
      const r = as(e[n]);
      r && (t += r + " ");
    }
  else if (be(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const $f = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Bf = /* @__PURE__ */ zo($f);
function Yc(e) {
  return !!e || e === "";
}
const Jc = (e) => !!(e && e.__v_isRef === !0), ne = (e) => Ne(e) ? e : e == null ? "" : Z(e) || be(e) && (e.toString === Kc || !ee(e.toString)) ? Jc(e) ? ne(e.value) : JSON.stringify(e, Qc, 2) : String(e), Qc = (e, t) => Jc(t) ? Qc(e, t.value) : Ln(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, s], o) => (n[Ds(r, o) + " =>"] = s, n),
    {}
  )
} : $c(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ds(n))
} : rn(t) ? Ds(t) : be(t) && !Z(t) && !zc(t) ? String(t) : t, Ds = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    rn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
let ft;
class Zc {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ft, !t && ft && (this.index = (ft.scopes || (ft.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ft;
      try {
        return ft = this, t();
      } finally {
        ft = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ft = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ft = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Kf(e) {
  return new Zc(e);
}
function zf(e, t = ft) {
  t && t.active && t.effects.push(e);
}
function qf() {
  return ft;
}
let mn;
class Jo {
  constructor(t, n, r, s) {
    this.fn = t, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, zf(this, s);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Ut();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (Wf(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Gt();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = Qt, n = mn;
    try {
      return Qt = !0, mn = this, this._runnings++, Ui(this), this.fn();
    } finally {
      Gi(this), this._runnings--, mn = n, Qt = t;
    }
  }
  stop() {
    this.active && (Ui(this), Gi(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Wf(e) {
  return e.value;
}
function Ui(e) {
  e._trackId++, e._depsLength = 0;
}
function Gi(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      el(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function el(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let Qt = !0, Zs = 0;
const tl = [];
function Ut() {
  tl.push(Qt), Qt = !1;
}
function Gt() {
  const e = tl.pop();
  Qt = e === void 0 ? !0 : e;
}
function Qo() {
  Zs++;
}
function Zo() {
  for (Zs--; !Zs && eo.length; )
    eo.shift()();
}
function nl(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && el(r, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const eo = [];
function rl(e, t, n) {
  Qo();
  for (const r of e.keys()) {
    let s;
    r._dirtyLevel < t && (s ?? (s = e.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = t), r._shouldSchedule && (s ?? (s = e.get(r) === r._trackId)) && (r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && eo.push(r.scheduler)));
  }
  Zo();
}
const sl = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, to = /* @__PURE__ */ new WeakMap(), pn = Symbol(""), no = Symbol("");
function We(e, t, n) {
  if (Qt && mn) {
    let r = to.get(e);
    r || to.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = sl(() => r.delete(n))), nl(
      mn,
      s
    );
  }
}
function xt(e, t, n, r, s, o) {
  const i = to.get(e);
  if (!i)
    return;
  let a = [];
  if (t === "clear")
    a = [...i.values()];
  else if (n === "length" && Z(e)) {
    const c = Number(r);
    i.forEach((l, u) => {
      (u === "length" || !rn(u) && u >= c) && a.push(l);
    });
  } else
    switch (n !== void 0 && a.push(i.get(n)), t) {
      case "add":
        Z(e) ? Xo(n) && a.push(i.get("length")) : (a.push(i.get(pn)), Ln(e) && a.push(i.get(no)));
        break;
      case "delete":
        Z(e) || (a.push(i.get(pn)), Ln(e) && a.push(i.get(no)));
        break;
      case "set":
        Ln(e) && a.push(i.get(pn));
        break;
    }
  Qo();
  for (const c of a)
    c && rl(
      c,
      4
    );
  Zo();
}
const Xf = /* @__PURE__ */ zo("__proto__,__v_isRef,__isVue"), ol = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(rn)
), ji = /* @__PURE__ */ Yf();
function Yf() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = le(this);
      for (let o = 0, i = this.length; o < i; o++)
        We(r, "get", o + "");
      const s = r[t](...n);
      return s === -1 || s === !1 ? r[t](...n.map(le)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ut(), Qo();
      const r = le(this)[t].apply(this, n);
      return Zo(), Gt(), r;
    };
  }), e;
}
function Jf(e) {
  rn(e) || (e = String(e));
  const t = le(this);
  return We(t, "has", e), t.hasOwnProperty(e);
}
class il {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    const s = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return r === (s ? o ? dl : fl : o ? ul : ll).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = Z(t);
    if (!s) {
      if (i && ae(ji, n))
        return Reflect.get(ji, n, r);
      if (n === "hasOwnProperty")
        return Jf;
    }
    const a = Reflect.get(t, n, r);
    return (rn(n) ? ol.has(n) : Xf(n)) || (s || We(t, "get", n), o) ? a : je(a) ? i && Xo(n) ? a : a.value : be(a) ? s ? ml(a) : ti(a) : a;
  }
}
class al extends il {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (!this._isShallow) {
      const c = En(o);
      if (!xn(r) && !En(r) && (o = le(o), r = le(r)), !Z(t) && je(o) && !je(r))
        return c ? !1 : (o.value = r, !0);
    }
    const i = Z(t) && Xo(n) ? Number(n) < t.length : ae(t, n), a = Reflect.set(t, n, r, s);
    return t === le(s) && (i ? Zt(r, o) && xt(t, "set", n, r) : xt(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = ae(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && r && xt(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!rn(n) || !ol.has(n)) && We(t, "has", n), r;
  }
  ownKeys(t) {
    return We(
      t,
      "iterate",
      Z(t) ? "length" : pn
    ), Reflect.ownKeys(t);
  }
}
class cl extends il {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Qf = /* @__PURE__ */ new al(), Zf = /* @__PURE__ */ new cl(), ed = /* @__PURE__ */ new al(
  !0
), td = /* @__PURE__ */ new cl(!0), ei = (e) => e, cs = (e) => Reflect.getPrototypeOf(e);
function Ir(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = le(e), o = le(t);
  n || (Zt(t, o) && We(s, "get", t), We(s, "get", o));
  const { has: i } = cs(s), a = r ? ei : n ? ni : ar;
  if (i.call(s, t))
    return a(e.get(t));
  if (i.call(s, o))
    return a(e.get(o));
  e !== s && e.get(t);
}
function Ar(e, t = !1) {
  const n = this.__v_raw, r = le(n), s = le(e);
  return t || (Zt(e, s) && We(r, "has", e), We(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function Tr(e, t = !1) {
  return e = e.__v_raw, !t && We(le(e), "iterate", pn), Reflect.get(e, "size", e);
}
function Vi(e, t = !1) {
  !t && !xn(e) && !En(e) && (e = le(e));
  const n = le(this);
  return cs(n).has.call(n, e) || (n.add(e), xt(n, "add", e, e)), this;
}
function Hi(e, t, n = !1) {
  !n && !xn(t) && !En(t) && (t = le(t));
  const r = le(this), { has: s, get: o } = cs(r);
  let i = s.call(r, e);
  i || (e = le(e), i = s.call(r, e));
  const a = o.call(r, e);
  return r.set(e, t), i ? Zt(t, a) && xt(r, "set", e, t) : xt(r, "add", e, t), this;
}
function $i(e) {
  const t = le(this), { has: n, get: r } = cs(t);
  let s = n.call(t, e);
  s || (e = le(e), s = n.call(t, e)), r && r.call(t, e);
  const o = t.delete(e);
  return s && xt(t, "delete", e, void 0), o;
}
function Bi() {
  const e = le(this), t = e.size !== 0, n = e.clear();
  return t && xt(e, "clear", void 0, void 0), n;
}
function Nr(e, t) {
  return function(r, s) {
    const o = this, i = o.__v_raw, a = le(i), c = t ? ei : e ? ni : ar;
    return !e && We(a, "iterate", pn), i.forEach((l, u) => r.call(s, c(l), c(u), o));
  };
}
function Rr(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, o = le(s), i = Ln(o), a = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, l = s[e](...r), u = n ? ei : t ? ni : ar;
    return !t && We(
      o,
      "iterate",
      c ? no : pn
    ), {
      // iterator protocol
      next() {
        const { value: m, done: p } = l.next();
        return p ? { value: m, done: p } : {
          value: a ? [u(m[0]), u(m[1])] : u(m),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ht(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function nd() {
  const e = {
    get(o) {
      return Ir(this, o);
    },
    get size() {
      return Tr(this);
    },
    has: Ar,
    add: Vi,
    set: Hi,
    delete: $i,
    clear: Bi,
    forEach: Nr(!1, !1)
  }, t = {
    get(o) {
      return Ir(this, o, !1, !0);
    },
    get size() {
      return Tr(this);
    },
    has: Ar,
    add(o) {
      return Vi.call(this, o, !0);
    },
    set(o, i) {
      return Hi.call(this, o, i, !0);
    },
    delete: $i,
    clear: Bi,
    forEach: Nr(!1, !0)
  }, n = {
    get(o) {
      return Ir(this, o, !0);
    },
    get size() {
      return Tr(this, !0);
    },
    has(o) {
      return Ar.call(this, o, !0);
    },
    add: Ht("add"),
    set: Ht("set"),
    delete: Ht("delete"),
    clear: Ht("clear"),
    forEach: Nr(!0, !1)
  }, r = {
    get(o) {
      return Ir(this, o, !0, !0);
    },
    get size() {
      return Tr(this, !0);
    },
    has(o) {
      return Ar.call(this, o, !0);
    },
    add: Ht("add"),
    set: Ht("set"),
    delete: Ht("delete"),
    clear: Ht("clear"),
    forEach: Nr(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    e[o] = Rr(o, !1, !1), n[o] = Rr(o, !0, !1), t[o] = Rr(o, !1, !0), r[o] = Rr(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    r
  ];
}
const [
  rd,
  sd,
  od,
  id
] = /* @__PURE__ */ nd();
function ls(e, t) {
  const n = t ? e ? id : od : e ? sd : rd;
  return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(
    ae(n, s) && s in r ? n : r,
    s,
    o
  );
}
const ad = {
  get: /* @__PURE__ */ ls(!1, !1)
}, cd = {
  get: /* @__PURE__ */ ls(!1, !0)
}, ld = {
  get: /* @__PURE__ */ ls(!0, !1)
}, ud = {
  get: /* @__PURE__ */ ls(!0, !0)
}, ll = /* @__PURE__ */ new WeakMap(), ul = /* @__PURE__ */ new WeakMap(), fl = /* @__PURE__ */ new WeakMap(), dl = /* @__PURE__ */ new WeakMap();
function fd(e) {
  switch (e) {
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
function dd(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : fd(Mf(e));
}
function ti(e) {
  return En(e) ? e : us(
    e,
    !1,
    Qf,
    ad,
    ll
  );
}
function md(e) {
  return us(
    e,
    !1,
    ed,
    cd,
    ul
  );
}
function ml(e) {
  return us(
    e,
    !0,
    Zf,
    ld,
    fl
  );
}
function Cr(e) {
  return us(
    e,
    !0,
    td,
    ud,
    dl
  );
}
function us(e, t, n, r, s) {
  if (!be(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = s.get(e);
  if (o)
    return o;
  const i = dd(e);
  if (i === 0)
    return e;
  const a = new Proxy(
    e,
    i === 2 ? r : n
  );
  return s.set(e, a), a;
}
function Zn(e) {
  return En(e) ? Zn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function En(e) {
  return !!(e && e.__v_isReadonly);
}
function xn(e) {
  return !!(e && e.__v_isShallow);
}
function pl(e) {
  return e ? !!e.__v_raw : !1;
}
function le(e) {
  const t = e && e.__v_raw;
  return t ? le(t) : e;
}
function pd(e) {
  return Object.isExtensible(e) && Wc(e, "__v_skip", !0), e;
}
const ar = (e) => be(e) ? ti(e) : e, ni = (e) => be(e) ? ml(e) : e;
class hl {
  constructor(t, n, r, s) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Jo(
      () => t(this._value),
      () => kr(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r;
  }
  get value() {
    const t = le(this);
    return (!t._cacheable || t.effect.dirty) && Zt(t._value, t._value = t.effect.run()) && kr(t, 4), _l(t), t.effect._dirtyLevel >= 2 && kr(t, 2), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function hd(e, t, n = !1) {
  let r, s;
  const o = ee(e);
  return o ? (r = e, s = Qe) : (r = e.get, s = e.set), new hl(r, s, o || !s, n);
}
function _l(e) {
  var t;
  Qt && mn && (e = le(e), nl(
    mn,
    (t = e.dep) != null ? t : e.dep = sl(
      () => e.dep = void 0,
      e instanceof hl ? e : void 0
    )
  ));
}
function kr(e, t = 4, n, r) {
  e = le(e);
  const s = e.dep;
  s && rl(
    s,
    t
  );
}
function je(e) {
  return !!(e && e.__v_isRef === !0);
}
function st(e) {
  return gl(e, !1);
}
function _d(e) {
  return gl(e, !0);
}
function gl(e, t) {
  return je(e) ? e : new gd(e, t);
}
class gd {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : le(t), this._value = n ? t : ar(t);
  }
  get value() {
    return _l(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || xn(t) || En(t);
    t = n ? t : le(t), Zt(t, this._rawValue) && (this._rawValue, this._rawValue = t, this._value = n ? t : ar(t), kr(this, 4));
  }
}
function se(e) {
  return je(e) ? e.value : e;
}
const bd = {
  get: (e, t, n) => se(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return je(s) && !je(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function bl(e) {
  return Zn(e) ? e : new Proxy(e, bd);
}
var qt = { GJS_DEBUG_TOPICS: "JS ERROR;JS LOG", LESSOPEN: "| /usr/bin/lesspipe %s", USER: "quentin", npm_config_user_agent: "yarn/4.3.1 npm/? node/v20.15.1 linux x64", GIO_MODULE_DIR: "/home/quentin/snap/code/common/.cache/gio-modules", XDG_SESSION_TYPE: "wayland", GIT_ASKPASS: "/snap/code/164/usr/share/code/resources/app/extensions/git/dist/askpass.sh", GTK_EXE_PREFIX_VSCODE_SNAP_ORIG: "", npm_node_execpath: "/tmp/xfs-4684104e/node", GDK_BACKEND_VSCODE_SNAP_ORIG: "", SHLVL: "1", HOME: "/home/quentin", CHROME_DESKTOP: "code-url-handler.desktop", LOCPATH_VSCODE_SNAP_ORIG: "", OLDPWD: "/home/quentin/git/recia-webcomponents", TERM_PROGRAM_VERSION: "1.91.1", DESKTOP_SESSION: "ubuntu", GTK_PATH: "", NVM_BIN: "/home/quentin/.nvm/versions/node/v20.15.1/bin", npm_package_json: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables/package.json", NVM_INC: "/home/quentin/.nvm/versions/node/v20.15.1/include/node", GTK_IM_MODULE_FILE: "/home/quentin/snap/code/common/.cache/immodules/immodules.cache", GIO_LAUNCHED_DESKTOP_FILE: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SHELL_SESSION_MODE: "ubuntu", GRADLE_HOME: "/home/quentin/.sdkman/candidates/gradle/current", GTK_MODULES: "gail:atk-bridge", GSETTINGS_SCHEMA_DIR_VSCODE_SNAP_ORIG: "", VSCODE_GIT_ASKPASS_MAIN: "/snap/code/164/usr/share/code/resources/app/extensions/git/dist/askpass-main.js", VSCODE_GIT_ASKPASS_NODE: "/snap/code/164/usr/share/code/code", MANAGERPID: "3711", SYSTEMD_EXEC_PID: "3889", IM_CONFIG_CHECK_ENV: "1", DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus", COLORTERM: "truecolor", LIBVIRT_DEFAULT_URI: "qemu:///system", GIO_LAUNCHED_DESKTOP_FILE_PID: "16499", NVM_DIR: "/home/quentin/.nvm", IM_CONFIG_PHASE: "1", WAYLAND_DISPLAY: "wayland-0", LOGNAME: "quentin", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", JOURNAL_STREAM: "8:53255", _: "/home/quentin/.nvm/versions/node/v20.15.1/bin/yarn", XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: "/etc/xdg/xdg-ubuntu:/etc/xdg", XDG_SESSION_CLASS: "user", XDG_DATA_DIRS_VSCODE_SNAP_ORIG: "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", USERNAME: "quentin", TERM: "xterm-256color", GNOME_DESKTOP_SESSION_ID: "this-is-deprecated", PATH: "/tmp/xfs-4684104e:/home/quentin/.local/bin:/home/quentin/.nvm/versions/node/v20.15.1/bin:/home/quentin/.sdkman/candidates/java/current/bin:/home/quentin/.sdkman/candidates/gradle/current/bin:/home/quentin/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin:/home/quentin/.local/share/JetBrains/Toolbox/scripts:/home/quentin/.local/share/JetBrains/Toolbox/scripts", SESSION_MANAGER: "local/DELL-QGuillemin:@/tmp/.ICE-unix/3867,unix/DELL-QGuillemin:/tmp/.ICE-unix/3867", SDKMAN_CANDIDATES_DIR: "/home/quentin/.sdkman/candidates", GTK_EXE_PREFIX: "/snap/code/164/usr", INVOCATION_ID: "37d65aa77adf4de6bee60e9a158053dc", npm_package_name: "@gip-recia/ui-ressources-gar", XDG_MENU_PREFIX: "gnome-", BAMF_DESKTOP_FILE_HINT: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SETUP_DISPLAY: ":1", XDG_RUNTIME_DIR: "/run/user/1000", GDK_BACKEND: "x11", DISPLAY: ":0", LOCPATH: "/snap/code/164/usr/lib/locale", LANG: "fr_FR.UTF-8", XDG_CURRENT_DESKTOP: "Unity", GIO_MODULE_DIR_VSCODE_SNAP_ORIG: "", XMODIFIERS: "@im=ibus", XDG_SESSION_DESKTOP: "ubuntu", XAUTHORITY: "/run/user/1000/.mutter-Xwaylandauth.C9O3Q2", LS_COLORS: "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:", VSCODE_GIT_IPC_HANDLE: "/run/user/1000/vscode-git-0200aebe89.sock", SDKMAN_DIR: "/home/quentin/.sdkman", SDKMAN_PLATFORM: "linuxx64", TERM_PROGRAM: "vscode", SSH_AGENT_LAUNCHER: "gnome-keyring", SSH_AUTH_SOCK: "/run/user/1000/keyring/ssh", GSETTINGS_SCHEMA_DIR: "/home/quentin/snap/code/164/.local/share/glib-2.0/schemas", ORIGINAL_XDG_CURRENT_DESKTOP: "ubuntu:GNOME", PROJECT_CWD: "/home/quentin/git/recia-webcomponents", SHELL: "/bin/bash", npm_package_version: "3.0.0", npm_lifecycle_event: "build", QT_ACCESSIBILITY: "1", GDMSESSION: "ubuntu", LESSCLOSE: "/usr/bin/lesspipe %s %s", GTK_PATH_VSCODE_SNAP_ORIG: "", GTK_IM_MODULE_FILE_VSCODE_SNAP_ORIG: "", GJS_DEBUG_OUTPUT: "stderr", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", QT_IM_MODULE: "ibus", JAVA_HOME: "/home/quentin/.sdkman/candidates/java/current", GPG_TTY: "/dev/pts/0", PWD: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables", BERRY_BIN_FOLDER: "/tmp/xfs-4684104e", npm_execpath: "/tmp/xfs-4684104e/yarn", XDG_CONFIG_DIRS: "/etc/xdg/xdg-ubuntu:/etc/xdg", NVM_CD_FLAGS: "", XDG_DATA_DIRS: "/home/quentin/snap/code/164/.local/share:/home/quentin/snap/code/164:/snap/code/164/usr/share:/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", INIT_CWD: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables", NODE_ENV: "production", VITE_BASE_URI: "/", VITE_BASE_API_URL: "/quentin", VITE_RESSOURCES_DIFFUSABLES_API_URI: "/api/ressources-diffusables", VITE_RESSOURCES_DIFFUSABLES_SIZE_API_URI: "/api/ressources-diffusables/size", VITE_USER_INFO_API_URI: "/portail/api/v5-1/userinfo?claims=private&groups=" };
const er = [];
let Ls = !1;
function Ed(e, ...t) {
  if (Ls) return;
  Ls = !0, Ut();
  const n = er.length ? er[er.length - 1].component : null, r = n && n.appContext.config.warnHandler, s = Sd();
  if (r)
    kt(
      r,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, a;
          return (a = (i = o.toString) == null ? void 0 : i.call(o)) != null ? a : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: o }) => `at <${Jl(n, o.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    s.length && o.push(`
`, ...yd(s)), console.warn(...o);
  }
  Gt(), Ls = !1;
}
function Sd() {
  let e = er[er.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function yd(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Od(n));
  }), t;
}
function Od({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${Jl(
    e.component,
    e.type,
    r
  )}`, o = ">" + n;
  return e.props ? [s, ...vd(e.props), o] : [s + o];
}
function vd(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...El(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function El(e, t, n) {
  return Ne(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : je(t) ? (t = El(e, le(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : ee(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = le(t), n ? t : [`${e}=`, t]);
}
function kt(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    fs(s, t, n);
  }
}
function dt(e, t, n, r) {
  if (ee(e)) {
    const s = kt(e, t, n, r);
    return s && Bc(s) && s.catch((o) => {
      fs(o, t, n);
    }), s;
  }
  if (Z(e)) {
    const s = [];
    for (let o = 0; o < e.length; o++)
      s.push(dt(e[o], t, n, r));
    return s;
  }
}
function fs(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const l = o.ec;
      if (l) {
        for (let u = 0; u < l.length; u++)
          if (l[u](e, i, a) === !1)
            return;
      }
      o = o.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      Ut(), kt(
        c,
        null,
        10,
        [e, i, a]
      ), Gt();
      return;
    }
  }
  Id(e, n, s, r);
}
function Id(e, t, n, r = !0) {
  console.error(e);
}
let cr = !1, ro = !1;
const Fe = [];
let Ot = 0;
const Pn = [];
let Wt = null, fn = 0;
const Sl = /* @__PURE__ */ Promise.resolve();
let ri = null;
function yl(e) {
  const t = ri || Sl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ad(e) {
  let t = Ot + 1, n = Fe.length;
  for (; t < n; ) {
    const r = t + n >>> 1, s = Fe[r], o = lr(s);
    o < e || o === e && s.pre ? t = r + 1 : n = r;
  }
  return t;
}
function si(e) {
  (!Fe.length || !Fe.includes(
    e,
    cr && e.allowRecurse ? Ot + 1 : Ot
  )) && (e.id == null ? Fe.push(e) : Fe.splice(Ad(e.id), 0, e), Ol());
}
function Ol() {
  !cr && !ro && (ro = !0, ri = Sl.then(Il));
}
function Td(e) {
  const t = Fe.indexOf(e);
  t > Ot && Fe.splice(t, 1);
}
function Nd(e) {
  Z(e) ? Pn.push(...e) : (!Wt || !Wt.includes(
    e,
    e.allowRecurse ? fn + 1 : fn
  )) && Pn.push(e), Ol();
}
function Ki(e, t, n = cr ? Ot + 1 : 0) {
  for (; n < Fe.length; n++) {
    const r = Fe[n];
    if (r && r.pre) {
      if (e && r.id !== e.uid)
        continue;
      Fe.splice(n, 1), n--, r();
    }
  }
}
function vl(e) {
  if (Pn.length) {
    const t = [...new Set(Pn)].sort(
      (n, r) => lr(n) - lr(r)
    );
    if (Pn.length = 0, Wt) {
      Wt.push(...t);
      return;
    }
    for (Wt = t, fn = 0; fn < Wt.length; fn++) {
      const n = Wt[fn];
      n.active !== !1 && n();
    }
    Wt = null, fn = 0;
  }
}
const lr = (e) => e.id == null ? 1 / 0 : e.id, Rd = (e, t) => {
  const n = lr(e) - lr(t);
  if (n === 0) {
    if (e.pre && !t.pre) return -1;
    if (t.pre && !e.pre) return 1;
  }
  return n;
};
function Il(e) {
  ro = !1, cr = !0, Fe.sort(Rd);
  const t = Qe;
  try {
    for (Ot = 0; Ot < Fe.length; Ot++) {
      const n = Fe[Ot];
      n && n.active !== !1 && (qt.NODE_ENV !== "production" && t(n), kt(
        n,
        n.i,
        n.i ? 15 : 14
      ));
    }
  } finally {
    Ot = 0, Fe.length = 0, vl(), cr = !1, ri = null, (Fe.length || Pn.length) && Il();
  }
}
let Ze = null, Al = null;
function Br(e) {
  const t = Ze;
  return Ze = e, Al = e && e.type.__scopeId || null, t;
}
function Cd(e, t = Ze, n) {
  if (!t || e._n)
    return e;
  const r = (...s) => {
    r._d && na(-1);
    const o = Br(t);
    let i;
    try {
      i = e(...s);
    } finally {
      Br(o), r._d && na(1);
    }
    return i;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Dd(e, t) {
  if (Ze === null)
    return e;
  const n = _s(Ze), r = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [o, i, a, c = _e] = t[s];
    o && (ee(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && Yt(i), r.push({
      dir: o,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: a,
      modifiers: c
    }));
  }
  return e;
}
function an(e, t, n, r) {
  const s = e.dirs, o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const a = s[i];
    o && (a.oldValue = o[i].value);
    let c = a.dir[r];
    c && (Ut(), dt(c, n, 8, [
      e.el,
      a,
      e,
      t
    ]), Gt());
  }
}
function Tl(e, t) {
  e.shapeFlag & 6 && e.component ? Tl(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ht(e, t) {
  return ee(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    xe({ name: e.name }, t, { setup: e })
  ) : e;
}
const Mr = (e) => !!e.type.__asyncLoader, Nl = (e) => e.type.__isKeepAlive;
function Ld(e, t) {
  Rl(e, "a", t);
}
function Pd(e, t) {
  Rl(e, "da", t);
}
function Rl(e, t, n = Pe) {
  const r = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (ds(t, r, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Nl(s.parent.vnode) && wd(r, t, n, s), s = s.parent;
  }
}
function wd(e, t, n, r) {
  const s = ds(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  oi(() => {
    Wo(r[t], s);
  }, n);
}
function ds(e, t, n = Pe, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      Ut();
      const a = gr(n), c = dt(t, n, e, i);
      return a(), Gt(), c;
    });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const jt = (e) => (t, n = Pe) => {
  (!hs || e === "sp") && ds(e, (...r) => t(...r), n);
}, xd = jt("bm"), ms = jt("m"), kd = jt("bu"), Md = jt("u"), Fd = jt("bum"), oi = jt("um"), Ud = jt("sp"), Gd = jt(
  "rtg"
), jd = jt(
  "rtc"
);
function Vd(e, t = Pe) {
  ds("ec", e, t);
}
const Hd = Symbol.for("v-ndc");
function Cl(e, t, n, r) {
  let s;
  const o = n;
  if (Z(e) || Ne(e)) {
    s = new Array(e.length);
    for (let i = 0, a = e.length; i < a; i++)
      s[i] = t(e[i], i, void 0, o);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let i = 0; i < e; i++)
      s[i] = t(i + 1, i, void 0, o);
  } else if (be(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (i, a) => t(i, a, void 0, o)
      );
    else {
      const i = Object.keys(e);
      s = new Array(i.length);
      for (let a = 0, c = i.length; a < c; a++) {
        const l = i[a];
        s[a] = t(e[l], l, a, o);
      }
    }
  else
    s = [];
  return s;
}
const so = (e) => e ? Xl(e) ? _s(e) : so(e.parent) : null, tr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ xe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => so(e.parent),
    $root: (e) => so(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ii(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, si(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = yl.bind(e.proxy)),
    $watch: (e) => fm.bind(e)
  })
), Ps = (e, t) => e !== _e && !e.__isScriptSetup && ae(e, t), $d = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: a, appContext: c } = e;
    let l;
    if (t[0] !== "$") {
      const S = i[t];
      if (S !== void 0)
        switch (S) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (Ps(r, t))
          return i[t] = 1, r[t];
        if (s !== _e && ae(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (l = e.propsOptions[0]) && ae(l, t)
        )
          return i[t] = 3, o[t];
        if (n !== _e && ae(n, t))
          return i[t] = 4, n[t];
        oo && (i[t] = 0);
      }
    }
    const u = tr[t];
    let m, p;
    if (u)
      return t === "$attrs" && We(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (m = a.__cssModules) && (m = m[t])
    )
      return m;
    if (n !== _e && ae(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, ae(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: o } = e;
    return Ps(s, t) ? (s[t] = n, !0) : r !== _e && ae(r, t) ? (r[t] = n, !0) : ae(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o }
  }, i) {
    let a;
    return !!n[i] || e !== _e && ae(e, i) || Ps(t, i) || (a = o[0]) && ae(a, i) || ae(r, i) || ae(tr, i) || ae(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ae(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function zi(e) {
  return Z(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let oo = !0;
function Bd(e) {
  const t = ii(e), n = e.proxy, r = e.ctx;
  oo = !1, t.beforeCreate && qi(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: o,
    methods: i,
    watch: a,
    provide: c,
    inject: l,
    // lifecycle
    created: u,
    beforeMount: m,
    mounted: p,
    beforeUpdate: S,
    updated: I,
    activated: A,
    deactivated: w,
    beforeDestroy: v,
    beforeUnmount: C,
    destroyed: g,
    unmounted: O,
    render: L,
    renderTracked: y,
    renderTriggered: P,
    errorCaptured: V,
    serverPrefetch: $,
    // public API
    expose: de,
    inheritAttrs: Oe,
    // assets
    components: re,
    directives: ve,
    filters: Rt
  } = t;
  if (l && Kd(l, r, null), i)
    for (const ue in i) {
      const ce = i[ue];
      ee(ce) && (r[ue] = ce.bind(n));
    }
  if (s) {
    const ue = s.call(n, n);
    be(ue) && (e.data = ti(ue));
  }
  if (oo = !0, o)
    for (const ue in o) {
      const ce = o[ue], U = ee(ce) ? ce.bind(n, n) : ee(ce.get) ? ce.get.bind(n, n) : Qe, k = !ee(ce) && ee(ce.set) ? ce.set.bind(n) : Qe, j = ot({
        get: U,
        set: k
      });
      Object.defineProperty(r, ue, {
        enumerable: !0,
        configurable: !0,
        get: () => j.value,
        set: (W) => j.value = W
      });
    }
  if (a)
    for (const ue in a)
      Dl(a[ue], r, n, ue);
  if (c) {
    const ue = ee(c) ? c.call(n) : c;
    Reflect.ownKeys(ue).forEach((ce) => {
      Pl(ce, ue[ce]);
    });
  }
  u && qi(u, e, "c");
  function Ee(ue, ce) {
    Z(ce) ? ce.forEach((U) => ue(U.bind(n))) : ce && ue(ce.bind(n));
  }
  if (Ee(xd, m), Ee(ms, p), Ee(kd, S), Ee(Md, I), Ee(Ld, A), Ee(Pd, w), Ee(Vd, V), Ee(jd, y), Ee(Gd, P), Ee(Fd, C), Ee(oi, O), Ee(Ud, $), Z(de))
    if (de.length) {
      const ue = e.exposed || (e.exposed = {});
      de.forEach((ce) => {
        Object.defineProperty(ue, ce, {
          get: () => n[ce],
          set: (U) => n[ce] = U
        });
      });
    } else e.exposed || (e.exposed = {});
  L && e.render === Qe && (e.render = L), Oe != null && (e.inheritAttrs = Oe), re && (e.components = re), ve && (e.directives = ve);
}
function Kd(e, t, n = Qe) {
  Z(e) && (e = io(e));
  for (const r in e) {
    const s = e[r];
    let o;
    be(s) ? "default" in s ? o = rr(
      s.from || r,
      s.default,
      !0
    ) : o = rr(s.from || r) : o = rr(s), je(o) ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[r] = o;
  }
}
function qi(e, t, n) {
  dt(
    Z(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Dl(e, t, n, r) {
  const s = r.includes(".") ? Kl(n, r) : () => n[r];
  if (Ne(e)) {
    const o = t[e];
    ee(o) && hn(s, o);
  } else if (ee(e))
    hn(s, e.bind(n));
  else if (be(e))
    if (Z(e))
      e.forEach((o) => Dl(o, t, n, r));
    else {
      const o = ee(e.handler) ? e.handler.bind(n) : t[e.handler];
      ee(o) && hn(s, o, e);
    }
}
function ii(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: s,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = o.get(t);
  let c;
  return a ? c = a : !s.length && !n && !r ? c = t : (c = {}, s.length && s.forEach(
    (l) => Kr(c, l, i, !0)
  ), Kr(c, t, i)), be(t) && o.set(t, c), c;
}
function Kr(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Kr(e, o, n, !0), s && s.forEach(
    (i) => Kr(e, i, n, !0)
  );
  for (const i in t)
    if (!(r && i === "expose")) {
      const a = zd[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const zd = {
  data: Wi,
  props: Xi,
  emits: Xi,
  // objects
  methods: Xn,
  computed: Xn,
  // lifecycle
  beforeCreate: Ve,
  created: Ve,
  beforeMount: Ve,
  mounted: Ve,
  beforeUpdate: Ve,
  updated: Ve,
  beforeDestroy: Ve,
  beforeUnmount: Ve,
  destroyed: Ve,
  unmounted: Ve,
  activated: Ve,
  deactivated: Ve,
  errorCaptured: Ve,
  serverPrefetch: Ve,
  // assets
  components: Xn,
  directives: Xn,
  // watch
  watch: Wd,
  // provide / inject
  provide: Wi,
  inject: qd
};
function Wi(e, t) {
  return t ? e ? function() {
    return xe(
      ee(e) ? e.call(this, this) : e,
      ee(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function qd(e, t) {
  return Xn(io(e), io(t));
}
function io(e) {
  if (Z(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Xn(e, t) {
  return e ? xe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Xi(e, t) {
  return e ? Z(e) && Z(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : xe(
    /* @__PURE__ */ Object.create(null),
    zi(e),
    zi(t ?? {})
  ) : t;
}
function Wd(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = xe(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Ve(e[r], t[r]);
  return n;
}
function Ll() {
  return {
    app: null,
    config: {
      isNativeTag: xf,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Xd = 0;
function Yd(e, t) {
  return function(r, s = null) {
    ee(r) || (r = xe({}, r)), s != null && !be(s) && (s = null);
    const o = Ll(), i = /* @__PURE__ */ new WeakSet();
    let a = !1;
    const c = o.app = {
      _uid: Xd++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Mm,
      get config() {
        return o.config;
      },
      set config(l) {
      },
      use(l, ...u) {
        return i.has(l) || (l && ee(l.install) ? (i.add(l), l.install(c, ...u)) : ee(l) && (i.add(l), l(c, ...u))), c;
      },
      mixin(l) {
        return o.mixins.includes(l) || o.mixins.push(l), c;
      },
      component(l, u) {
        return u ? (o.components[l] = u, c) : o.components[l];
      },
      directive(l, u) {
        return u ? (o.directives[l] = u, c) : o.directives[l];
      },
      mount(l, u, m) {
        if (!a) {
          const p = Ue(r, s);
          return p.appContext = o, m === !0 ? m = "svg" : m === !1 && (m = void 0), u && t ? t(p, l) : e(p, l, m), a = !0, c._container = l, l.__vue_app__ = c, _s(p.component);
        }
      },
      unmount() {
        a && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(l, u) {
        return o.provides[l] = u, c;
      },
      runWithContext(l) {
        const u = nr;
        nr = c;
        try {
          return l();
        } finally {
          nr = u;
        }
      }
    };
    return c;
  };
}
let nr = null;
function Pl(e, t) {
  if (Pe) {
    let n = Pe.provides;
    const r = Pe.parent && Pe.parent.provides;
    r === n && (n = Pe.provides = Object.create(r)), n[e] = t;
  }
}
function rr(e, t, n = !1) {
  const r = Pe || Ze;
  if (r || nr) {
    const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : nr._context.provides;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && ee(t) ? t.call(r && r.proxy) : t;
  }
}
const wl = {}, xl = () => Object.create(wl), kl = (e) => Object.getPrototypeOf(e) === wl;
function Jd(e, t, n, r = !1) {
  const s = {}, o = xl();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ml(e, t, s, o);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  n ? e.props = r ? s : md(s) : e.type.props ? e.props = s : e.props = o, e.attrs = o;
}
function Qd(e, t, n, r) {
  const {
    props: s,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, a = le(s), [c] = e.propsOptions;
  let l = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let m = 0; m < u.length; m++) {
        let p = u[m];
        if (ps(e.emitsOptions, p))
          continue;
        const S = t[p];
        if (c)
          if (ae(o, p))
            S !== o[p] && (o[p] = S, l = !0);
          else {
            const I = Tt(p);
            s[I] = ao(
              c,
              a,
              I,
              S,
              e,
              !1
            );
          }
        else
          S !== o[p] && (o[p] = S, l = !0);
      }
    }
  } else {
    Ml(e, t, s, o) && (l = !0);
    let u;
    for (const m in a)
      (!t || // for camelCase
      !ae(t, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = at(m)) === m || !ae(t, u))) && (c ? n && // for camelCase
      (n[m] !== void 0 || // for kebab-case
      n[u] !== void 0) && (s[m] = ao(
        c,
        a,
        m,
        void 0,
        e,
        !0
      )) : delete s[m]);
    if (o !== a)
      for (const m in o)
        (!t || !ae(t, m)) && (delete o[m], l = !0);
  }
  l && xt(e.attrs, "set", "");
}
function Ml(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let c in t) {
      if (Qn(c))
        continue;
      const l = t[c];
      let u;
      s && ae(s, u = Tt(c)) ? !o || !o.includes(u) ? n[u] = l : (a || (a = {}))[u] = l : ps(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, i = !0);
    }
  if (o) {
    const c = le(n), l = a || _e;
    for (let u = 0; u < o.length; u++) {
      const m = o[u];
      n[m] = ao(
        s,
        c,
        m,
        l[m],
        e,
        !ae(l, m)
      );
    }
  }
  return i;
}
function ao(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const a = ae(i, "default");
    if (a && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && ee(c)) {
        const { propsDefaults: l } = s;
        if (n in l)
          r = l[n];
        else {
          const u = gr(s);
          r = l[n] = c.call(
            null,
            t
          ), u();
        }
      } else
        r = c;
    }
    i[
      0
      /* shouldCast */
    ] && (o && !a ? r = !1 : i[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === at(n)) && (r = !0));
  }
  return r;
}
const Zd = /* @__PURE__ */ new WeakMap();
function Fl(e, t, n = !1) {
  const r = n ? Zd : t.propsCache, s = r.get(e);
  if (s)
    return s;
  const o = e.props, i = {}, a = [];
  let c = !1;
  if (!ee(e)) {
    const u = (m) => {
      c = !0;
      const [p, S] = Fl(m, t, !0);
      xe(i, p), S && a.push(...S);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!o && !c)
    return be(e) && r.set(e, Dn), Dn;
  if (Z(o))
    for (let u = 0; u < o.length; u++) {
      const m = Tt(o[u]);
      Yi(m) && (i[m] = _e);
    }
  else if (o)
    for (const u in o) {
      const m = Tt(u);
      if (Yi(m)) {
        const p = o[u], S = i[m] = Z(p) || ee(p) ? { type: p } : xe({}, p);
        if (S) {
          const I = Zi(Boolean, S.type), A = Zi(String, S.type);
          S[
            0
            /* shouldCast */
          ] = I > -1, S[
            1
            /* shouldCastTrue */
          ] = A < 0 || I < A, (I > -1 || ae(S, "default")) && a.push(m);
        }
      }
    }
  const l = [i, a];
  return be(e) && r.set(e, l), l;
}
function Yi(e) {
  return e[0] !== "$" && !Qn(e);
}
function Ji(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Qi(e, t) {
  return Ji(e) === Ji(t);
}
function Zi(e, t) {
  return Z(t) ? t.findIndex((n) => Qi(n, e)) : ee(t) && Qi(t, e) ? 0 : -1;
}
const Ul = (e) => e[0] === "_" || e === "$stable", ai = (e) => Z(e) ? e.map(yt) : [yt(e)], em = (e, t, n) => {
  if (t._n)
    return t;
  const r = Cd((...s) => (qt.NODE_ENV !== "production" && Pe && (!n || (n.root, Pe.root)), ai(t(...s))), n);
  return r._c = !1, r;
}, Gl = (e, t, n) => {
  const r = e._ctx;
  for (const s in e) {
    if (Ul(s)) continue;
    const o = e[s];
    if (ee(o))
      t[s] = em(s, o, r);
    else if (o != null) {
      const i = ai(o);
      t[s] = () => i;
    }
  }
}, jl = (e, t) => {
  const n = ai(t);
  e.slots.default = () => n;
}, Vl = (e, t, n) => {
  for (const r in t)
    (n || r !== "_") && (e[r] = t[r]);
}, tm = (e, t, n) => {
  const r = e.slots = xl();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Vl(r, t, n), n && Wc(r, "_", s, !0)) : Gl(t, r);
  } else t && jl(e, t);
}, nm = (e, t, n) => {
  const { vnode: r, slots: s } = e;
  let o = !0, i = _e;
  if (r.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? o = !1 : Vl(s, t, n) : (o = !t.$stable, Gl(t, s)), i = t;
  } else t && (jl(e, t), i = { default: 1 });
  if (o)
    for (const a in s)
      !Ul(a) && i[a] == null && delete s[a];
};
function co(e, t, n, r, s = !1) {
  if (Z(e)) {
    e.forEach(
      (p, S) => co(
        p,
        t && (Z(t) ? t[S] : t),
        n,
        r,
        s
      )
    );
    return;
  }
  if (Mr(r) && !s)
    return;
  const o = r.shapeFlag & 4 ? _s(r.component) : r.el, i = s ? null : o, { i: a, r: c } = e, l = t && t.r, u = a.refs === _e ? a.refs = {} : a.refs, m = a.setupState;
  if (l != null && l !== c && (Ne(l) ? (u[l] = null, ae(m, l) && (m[l] = null)) : je(l) && (l.value = null)), ee(c))
    kt(c, a, 12, [i, u]);
  else {
    const p = Ne(c), S = je(c);
    if (p || S) {
      const I = () => {
        if (e.f) {
          const A = p ? ae(m, c) ? m[c] : u[c] : c.value;
          s ? Z(A) && Wo(A, o) : Z(A) ? A.includes(o) || A.push(o) : p ? (u[c] = [o], ae(m, c) && (m[c] = u[c])) : (c.value = [o], e.k && (u[e.k] = c.value));
        } else p ? (u[c] = i, ae(m, c) && (m[c] = i)) : S && (c.value = i, e.k && (u[e.k] = i));
      };
      i ? (I.id = -1, ze(I, n)) : I();
    }
  }
}
const rm = Symbol("_vte"), sm = (e) => e.__isTeleport, ze = Em;
function om(e) {
  return im(e);
}
function im(e, t) {
  const n = Xc();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: s,
    patchProp: o,
    createElement: i,
    createText: a,
    createComment: c,
    setText: l,
    setElementText: u,
    parentNode: m,
    nextSibling: p,
    setScopeId: S = Qe,
    insertStaticContent: I
  } = e, A = (h, b, N, M = null, x = null, G = null, B = void 0, f = null, d = !!b.dynamicChildren) => {
    if (h === b)
      return;
    h && !zn(h, b) && (M = De(h), W(h, x, G, !0), h = null), b.patchFlag === -2 && (d = !1, b.dynamicChildren = null);
    const { type: _, ref: D, shapeFlag: H } = b;
    switch (_) {
      case _r:
        w(h, b, N, M);
        break;
      case Sn:
        v(h, b, N, M);
        break;
      case ks:
        h == null && C(b, N, M, B);
        break;
      case Je:
        re(
          h,
          b,
          N,
          M,
          x,
          G,
          B,
          f,
          d
        );
        break;
      default:
        H & 1 ? L(
          h,
          b,
          N,
          M,
          x,
          G,
          B,
          f,
          d
        ) : H & 6 ? ve(
          h,
          b,
          N,
          M,
          x,
          G,
          B,
          f,
          d
        ) : (H & 64 || H & 128) && _.process(
          h,
          b,
          N,
          M,
          x,
          G,
          B,
          f,
          d,
          ke
        );
    }
    D != null && x && co(D, h && h.ref, G, b || h, !b);
  }, w = (h, b, N, M) => {
    if (h == null)
      r(
        b.el = a(b.children),
        N,
        M
      );
    else {
      const x = b.el = h.el;
      b.children !== h.children && l(x, b.children);
    }
  }, v = (h, b, N, M) => {
    h == null ? r(
      b.el = c(b.children || ""),
      N,
      M
    ) : b.el = h.el;
  }, C = (h, b, N, M) => {
    [h.el, h.anchor] = I(
      h.children,
      b,
      N,
      M,
      h.el,
      h.anchor
    );
  }, g = ({ el: h, anchor: b }, N, M) => {
    let x;
    for (; h && h !== b; )
      x = p(h), r(h, N, M), h = x;
    r(b, N, M);
  }, O = ({ el: h, anchor: b }) => {
    let N;
    for (; h && h !== b; )
      N = p(h), s(h), h = N;
    s(b);
  }, L = (h, b, N, M, x, G, B, f, d) => {
    b.type === "svg" ? B = "svg" : b.type === "math" && (B = "mathml"), h == null ? y(
      b,
      N,
      M,
      x,
      G,
      B,
      f,
      d
    ) : $(
      h,
      b,
      x,
      G,
      B,
      f,
      d
    );
  }, y = (h, b, N, M, x, G, B, f) => {
    let d, _;
    const { props: D, shapeFlag: H, transition: F, dirs: E } = h;
    if (d = h.el = i(
      h.type,
      G,
      D && D.is,
      D
    ), H & 8 ? u(d, h.children) : H & 16 && V(
      h.children,
      d,
      null,
      M,
      x,
      ws(h, G),
      B,
      f
    ), E && an(h, null, M, "created"), P(d, h, h.scopeId, B, M), D) {
      for (const X in D)
        X !== "value" && !Qn(X) && o(d, X, null, D[X], G, M);
      "value" in D && o(d, "value", null, D.value, G), (_ = D.onVnodeBeforeMount) && St(_, M, h);
    }
    E && an(h, null, M, "beforeMount");
    const T = am(x, F);
    T && F.beforeEnter(d), r(d, b, N), ((_ = D && D.onVnodeMounted) || T || E) && ze(() => {
      _ && St(_, M, h), T && F.enter(d), E && an(h, null, M, "mounted");
    }, x);
  }, P = (h, b, N, M, x) => {
    if (N && S(h, N), M)
      for (let G = 0; G < M.length; G++)
        S(h, M[G]);
    if (x) {
      let G = x.subTree;
      if (b === G) {
        const B = x.vnode;
        P(
          h,
          B,
          B.scopeId,
          B.slotScopeIds,
          x.parent
        );
      }
    }
  }, V = (h, b, N, M, x, G, B, f, d = 0) => {
    for (let _ = d; _ < h.length; _++) {
      const D = h[_] = f ? Xt(h[_]) : yt(h[_]);
      A(
        null,
        D,
        b,
        N,
        M,
        x,
        G,
        B,
        f
      );
    }
  }, $ = (h, b, N, M, x, G, B) => {
    const f = b.el = h.el;
    let { patchFlag: d, dynamicChildren: _, dirs: D } = b;
    d |= h.patchFlag & 16;
    const H = h.props || _e, F = b.props || _e;
    let E;
    if (N && cn(N, !1), (E = F.onVnodeBeforeUpdate) && St(E, N, b, h), D && an(b, h, N, "beforeUpdate"), N && cn(N, !0), (H.innerHTML && F.innerHTML == null || H.textContent && F.textContent == null) && u(f, ""), _ ? de(
      h.dynamicChildren,
      _,
      f,
      N,
      M,
      ws(b, x),
      G
    ) : B || ce(
      h,
      b,
      f,
      null,
      N,
      M,
      ws(b, x),
      G,
      !1
    ), d > 0) {
      if (d & 16)
        Oe(f, H, F, N, x);
      else if (d & 2 && H.class !== F.class && o(f, "class", null, F.class, x), d & 4 && o(f, "style", H.style, F.style, x), d & 8) {
        const T = b.dynamicProps;
        for (let X = 0; X < T.length; X++) {
          const Y = T[X], me = H[Y], Me = F[Y];
          (Me !== me || Y === "value") && o(f, Y, me, Me, x, N);
        }
      }
      d & 1 && h.children !== b.children && u(f, b.children);
    } else !B && _ == null && Oe(f, H, F, N, x);
    ((E = F.onVnodeUpdated) || D) && ze(() => {
      E && St(E, N, b, h), D && an(b, h, N, "updated");
    }, M);
  }, de = (h, b, N, M, x, G, B) => {
    for (let f = 0; f < b.length; f++) {
      const d = h[f], _ = b[f], D = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        d.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (d.type === Je || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !zn(d, _) || // - In the case of a component, it could contain anything.
        d.shapeFlag & 70) ? m(d.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          N
        )
      );
      A(
        d,
        _,
        D,
        null,
        M,
        x,
        G,
        B,
        !0
      );
    }
  }, Oe = (h, b, N, M, x) => {
    if (b !== N) {
      if (b !== _e)
        for (const G in b)
          !Qn(G) && !(G in N) && o(
            h,
            G,
            b[G],
            null,
            x,
            M
          );
      for (const G in N) {
        if (Qn(G)) continue;
        const B = N[G], f = b[G];
        B !== f && G !== "value" && o(h, G, f, B, x, M);
      }
      "value" in N && o(h, "value", b.value, N.value, x);
    }
  }, re = (h, b, N, M, x, G, B, f, d) => {
    const _ = b.el = h ? h.el : a(""), D = b.anchor = h ? h.anchor : a("");
    let { patchFlag: H, dynamicChildren: F, slotScopeIds: E } = b;
    E && (f = f ? f.concat(E) : E), h == null ? (r(_, N, M), r(D, N, M), V(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      b.children || [],
      N,
      D,
      x,
      G,
      B,
      f,
      d
    )) : H > 0 && H & 64 && F && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren ? (de(
      h.dynamicChildren,
      F,
      N,
      x,
      G,
      B,
      f
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (b.key != null || x && b === x.subTree) && Hl(
      h,
      b,
      !0
      /* shallow */
    )) : ce(
      h,
      b,
      N,
      D,
      x,
      G,
      B,
      f,
      d
    );
  }, ve = (h, b, N, M, x, G, B, f, d) => {
    b.slotScopeIds = f, h == null ? b.shapeFlag & 512 ? x.ctx.activate(
      b,
      N,
      M,
      B,
      d
    ) : Rt(
      b,
      N,
      M,
      x,
      G,
      B,
      d
    ) : gt(h, b, d);
  }, Rt = (h, b, N, M, x, G, B) => {
    const f = h.component = Nm(
      h,
      M,
      x
    );
    if (Nl(h) && (f.ctx.renderer = ke), Rm(f, !1, B), f.asyncDep) {
      if (x && x.registerDep(f, Ee, B), !h.el) {
        const d = f.subTree = Ue(Sn);
        v(null, d, b, N);
      }
    } else
      Ee(
        f,
        h,
        b,
        N,
        x,
        G,
        B
      );
  }, gt = (h, b, N) => {
    const M = b.component = h.component;
    if (_m(h, b, N))
      if (M.asyncDep && !M.asyncResolved) {
        ue(M, b, N);
        return;
      } else
        M.next = b, Td(M.update), M.effect.dirty = !0, M.update();
    else
      b.el = h.el, M.vnode = b;
  }, Ee = (h, b, N, M, x, G, B) => {
    const f = () => {
      if (h.isMounted) {
        let { next: D, bu: H, u: F, parent: E, vnode: T } = h;
        {
          const Xe = $l(h);
          if (Xe) {
            D && (D.el = T.el, ue(h, D, B)), Xe.asyncDep.then(() => {
              h.isUnmounted || f();
            });
            return;
          }
        }
        let X = D, Y;
        cn(h, !1), D ? (D.el = T.el, ue(h, D, B)) : D = T, H && xr(H), (Y = D.props && D.props.onVnodeBeforeUpdate) && St(Y, E, D, T), cn(h, !0);
        const me = xs(h), Me = h.subTree;
        h.subTree = me, A(
          Me,
          me,
          // parent may have changed if it's in a teleport
          m(Me.el),
          // anchor may have changed if it's in a fragment
          De(Me),
          h,
          x,
          G
        ), D.el = me.el, X === null && gm(h, me.el), F && ze(F, x), (Y = D.props && D.props.onVnodeUpdated) && ze(
          () => St(Y, E, D, T),
          x
        );
      } else {
        let D;
        const { el: H, props: F } = b, { bm: E, m: T, parent: X } = h, Y = Mr(b);
        if (cn(h, !1), E && xr(E), !Y && (D = F && F.onVnodeBeforeMount) && St(D, X, b), cn(h, !0), H && An) {
          const me = () => {
            h.subTree = xs(h), An(
              H,
              h.subTree,
              h,
              x,
              null
            );
          };
          Y ? b.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !h.isUnmounted && me()
          ) : me();
        } else {
          const me = h.subTree = xs(h);
          A(
            null,
            me,
            N,
            M,
            h,
            x,
            G
          ), b.el = me.el;
        }
        if (T && ze(T, x), !Y && (D = F && F.onVnodeMounted)) {
          const me = b;
          ze(
            () => St(D, X, me),
            x
          );
        }
        (b.shapeFlag & 256 || X && Mr(X.vnode) && X.vnode.shapeFlag & 256) && h.a && ze(h.a, x), h.isMounted = !0, b = N = M = null;
      }
    }, d = h.effect = new Jo(
      f,
      Qe,
      () => si(_),
      h.scope
      // track it in component's effect scope
    ), _ = h.update = () => {
      d.dirty && d.run();
    };
    _.i = h, _.id = h.uid, cn(h, !0), _();
  }, ue = (h, b, N) => {
    b.component = h;
    const M = h.vnode.props;
    h.vnode = b, h.next = null, Qd(h, b.props, M, N), nm(h, b.children, N), Ut(), Ki(h), Gt();
  }, ce = (h, b, N, M, x, G, B, f, d = !1) => {
    const _ = h && h.children, D = h ? h.shapeFlag : 0, H = b.children, { patchFlag: F, shapeFlag: E } = b;
    if (F > 0) {
      if (F & 128) {
        k(
          _,
          H,
          N,
          M,
          x,
          G,
          B,
          f,
          d
        );
        return;
      } else if (F & 256) {
        U(
          _,
          H,
          N,
          M,
          x,
          G,
          B,
          f,
          d
        );
        return;
      }
    }
    E & 8 ? (D & 16 && he(_, x, G), H !== _ && u(N, H)) : D & 16 ? E & 16 ? k(
      _,
      H,
      N,
      M,
      x,
      G,
      B,
      f,
      d
    ) : he(_, x, G, !0) : (D & 8 && u(N, ""), E & 16 && V(
      H,
      N,
      M,
      x,
      G,
      B,
      f,
      d
    ));
  }, U = (h, b, N, M, x, G, B, f, d) => {
    h = h || Dn, b = b || Dn;
    const _ = h.length, D = b.length, H = Math.min(_, D);
    let F;
    for (F = 0; F < H; F++) {
      const E = b[F] = d ? Xt(b[F]) : yt(b[F]);
      A(
        h[F],
        E,
        N,
        null,
        x,
        G,
        B,
        f,
        d
      );
    }
    _ > D ? he(
      h,
      x,
      G,
      !0,
      !1,
      H
    ) : V(
      b,
      N,
      M,
      x,
      G,
      B,
      f,
      d,
      H
    );
  }, k = (h, b, N, M, x, G, B, f, d) => {
    let _ = 0;
    const D = b.length;
    let H = h.length - 1, F = D - 1;
    for (; _ <= H && _ <= F; ) {
      const E = h[_], T = b[_] = d ? Xt(b[_]) : yt(b[_]);
      if (zn(E, T))
        A(
          E,
          T,
          N,
          null,
          x,
          G,
          B,
          f,
          d
        );
      else
        break;
      _++;
    }
    for (; _ <= H && _ <= F; ) {
      const E = h[H], T = b[F] = d ? Xt(b[F]) : yt(b[F]);
      if (zn(E, T))
        A(
          E,
          T,
          N,
          null,
          x,
          G,
          B,
          f,
          d
        );
      else
        break;
      H--, F--;
    }
    if (_ > H) {
      if (_ <= F) {
        const E = F + 1, T = E < D ? b[E].el : M;
        for (; _ <= F; )
          A(
            null,
            b[_] = d ? Xt(b[_]) : yt(b[_]),
            N,
            T,
            x,
            G,
            B,
            f,
            d
          ), _++;
      }
    } else if (_ > F)
      for (; _ <= H; )
        W(h[_], x, G, !0), _++;
    else {
      const E = _, T = _, X = /* @__PURE__ */ new Map();
      for (_ = T; _ <= F; _++) {
        const Ye = b[_] = d ? Xt(b[_]) : yt(b[_]);
        Ye.key != null && X.set(Ye.key, _);
      }
      let Y, me = 0;
      const Me = F - T + 1;
      let Xe = !1, Or = 0;
      const Tn = new Array(Me);
      for (_ = 0; _ < Me; _++) Tn[_] = 0;
      for (_ = E; _ <= H; _++) {
        const Ye = h[_];
        if (me >= Me) {
          W(Ye, x, G, !0);
          continue;
        }
        let Et;
        if (Ye.key != null)
          Et = X.get(Ye.key);
        else
          for (Y = T; Y <= F; Y++)
            if (Tn[Y - T] === 0 && zn(Ye, b[Y])) {
              Et = Y;
              break;
            }
        Et === void 0 ? W(Ye, x, G, !0) : (Tn[Et - T] = _ + 1, Et >= Or ? Or = Et : Xe = !0, A(
          Ye,
          b[Et],
          N,
          null,
          x,
          G,
          B,
          f,
          d
        ), me++);
      }
      const xi = Xe ? cm(Tn) : Dn;
      for (Y = xi.length - 1, _ = Me - 1; _ >= 0; _--) {
        const Ye = T + _, Et = b[Ye], ki = Ye + 1 < D ? b[Ye + 1].el : M;
        Tn[_] === 0 ? A(
          null,
          Et,
          N,
          ki,
          x,
          G,
          B,
          f,
          d
        ) : Xe && (Y < 0 || _ !== xi[Y] ? j(Et, N, ki, 2) : Y--);
      }
    }
  }, j = (h, b, N, M, x = null) => {
    const { el: G, type: B, transition: f, children: d, shapeFlag: _ } = h;
    if (_ & 6) {
      j(h.component.subTree, b, N, M);
      return;
    }
    if (_ & 128) {
      h.suspense.move(b, N, M);
      return;
    }
    if (_ & 64) {
      B.move(h, b, N, ke);
      return;
    }
    if (B === Je) {
      r(G, b, N);
      for (let H = 0; H < d.length; H++)
        j(d[H], b, N, M);
      r(h.anchor, b, N);
      return;
    }
    if (B === ks) {
      g(h, b, N);
      return;
    }
    if (M !== 2 && _ & 1 && f)
      if (M === 0)
        f.beforeEnter(G), r(G, b, N), ze(() => f.enter(G), x);
      else {
        const { leave: H, delayLeave: F, afterLeave: E } = f, T = () => r(G, b, N), X = () => {
          H(G, () => {
            T(), E && E();
          });
        };
        F ? F(G, T, X) : X();
      }
    else
      r(G, b, N);
  }, W = (h, b, N, M = !1, x = !1) => {
    const {
      type: G,
      props: B,
      ref: f,
      children: d,
      dynamicChildren: _,
      shapeFlag: D,
      patchFlag: H,
      dirs: F,
      cacheIndex: E
    } = h;
    if (H === -2 && (x = !1), f != null && co(f, null, N, h, !0), E != null && (b.renderCache[E] = void 0), D & 256) {
      b.ctx.deactivate(h);
      return;
    }
    const T = D & 1 && F, X = !Mr(h);
    let Y;
    if (X && (Y = B && B.onVnodeBeforeUnmount) && St(Y, b, h), D & 6)
      Ce(h.component, N, M);
    else {
      if (D & 128) {
        h.suspense.unmount(N, M);
        return;
      }
      T && an(h, null, b, "beforeUnmount"), D & 64 ? h.type.remove(
        h,
        b,
        N,
        ke,
        M
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (G !== Je || H > 0 && H & 64) ? he(
        _,
        b,
        N,
        !1,
        !0
      ) : (G === Je && H & 384 || !x && D & 16) && he(d, b, N), M && q(h);
    }
    (X && (Y = B && B.onVnodeUnmounted) || T) && ze(() => {
      Y && St(Y, b, h), T && an(h, null, b, "unmounted");
    }, N);
  }, q = (h) => {
    const { type: b, el: N, anchor: M, transition: x } = h;
    if (b === Je) {
      oe(N, M);
      return;
    }
    if (b === ks) {
      O(h);
      return;
    }
    const G = () => {
      s(N), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (h.shapeFlag & 1 && x && !x.persisted) {
      const { leave: B, delayLeave: f } = x, d = () => B(N, G);
      f ? f(h.el, G, d) : d();
    } else
      G();
  }, oe = (h, b) => {
    let N;
    for (; h !== b; )
      N = p(h), s(h), h = N;
    s(b);
  }, Ce = (h, b, N) => {
    const { bum: M, scope: x, update: G, subTree: B, um: f, m: d, a: _ } = h;
    ea(d), ea(_), M && xr(M), x.stop(), G && (G.active = !1, W(B, h, b, N)), f && ze(f, b), ze(() => {
      h.isUnmounted = !0;
    }, b), b && b.pendingBranch && !b.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === b.pendingId && (b.deps--, b.deps === 0 && b.resolve());
  }, he = (h, b, N, M = !1, x = !1, G = 0) => {
    for (let B = G; B < h.length; B++)
      W(h[B], b, N, M, x);
  }, De = (h) => {
    if (h.shapeFlag & 6)
      return De(h.component.subTree);
    if (h.shapeFlag & 128)
      return h.suspense.next();
    const b = p(h.anchor || h.el), N = b && b[rm];
    return N ? p(N) : b;
  };
  let Ie = !1;
  const bt = (h, b, N) => {
    h == null ? b._vnode && W(b._vnode, null, null, !0) : A(
      b._vnode || null,
      h,
      b,
      null,
      null,
      null,
      N
    ), Ie || (Ie = !0, Ki(), vl(), Ie = !1), b._vnode = h;
  }, ke = {
    p: A,
    um: W,
    m: j,
    r: q,
    mt: Rt,
    mc: V,
    pc: ce,
    pbc: de,
    n: De,
    o: e
  };
  let $e, An;
  return {
    render: bt,
    hydrate: $e,
    createApp: Yd(bt, $e)
  };
}
function ws({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function cn({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function am(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Hl(e, t, n = !1) {
  const r = e.children, s = t.children;
  if (Z(r) && Z(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let a = s[o];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = s[o] = Xt(s[o]), a.el = i.el), !n && a.patchFlag !== -2 && Hl(i, a)), a.type === _r && (a.el = i.el);
    }
}
function cm(e) {
  const t = e.slice(), n = [0];
  let r, s, o, i, a;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const l = e[r];
    if (l !== 0) {
      if (s = n[n.length - 1], e[s] < l) {
        t[r] = s, n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        a = o + i >> 1, e[n[a]] < l ? o = a + 1 : i = a;
      l < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), n[o] = r);
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; )
    n[o] = i, i = t[i];
  return n;
}
function $l(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : $l(t);
}
function ea(e) {
  if (e)
    for (let t = 0; t < e.length; t++) e[t].active = !1;
}
const lm = Symbol.for("v-scx"), um = () => rr(lm), Dr = {};
function hn(e, t, n) {
  return Bl(e, t, n);
}
function Bl(e, t, {
  immediate: n,
  deep: r,
  flush: s,
  once: o,
  onTrack: i,
  onTrigger: a
} = _e) {
  if (t && o) {
    const y = t;
    t = (...P) => {
      y(...P), L();
    };
  }
  const c = Pe, l = (y) => r === !0 ? y : (
    // for deep: false, only traverse root-level properties
    Yt(y, r === !1 ? 1 : void 0)
  );
  let u, m = !1, p = !1;
  if (je(e) ? (u = () => e.value, m = xn(e)) : Zn(e) ? (u = () => l(e), m = !0) : Z(e) ? (p = !0, m = e.some((y) => Zn(y) || xn(y)), u = () => e.map((y) => {
    if (je(y))
      return y.value;
    if (Zn(y))
      return l(y);
    if (ee(y))
      return kt(y, c, 2);
  })) : ee(e) ? t ? u = () => kt(e, c, 2) : u = () => (S && S(), dt(
    e,
    c,
    3,
    [I]
  )) : u = Qe, t && r) {
    const y = u;
    u = () => Yt(y());
  }
  let S, I = (y) => {
    S = g.onStop = () => {
      kt(y, c, 4), S = g.onStop = void 0;
    };
  }, A;
  if (hs)
    if (I = Qe, t ? n && dt(t, c, 3, [
      u(),
      p ? [] : void 0,
      I
    ]) : u(), s === "sync") {
      const y = um();
      A = y.__watcherHandles || (y.__watcherHandles = []);
    } else
      return Qe;
  let w = p ? new Array(e.length).fill(Dr) : Dr;
  const v = () => {
    if (!(!g.active || !g.dirty))
      if (t) {
        const y = g.run();
        (r || m || (p ? y.some((P, V) => Zt(P, w[V])) : Zt(y, w))) && (S && S(), dt(t, c, 3, [
          y,
          // pass undefined as the old value when it's changed for the first time
          w === Dr ? void 0 : p && w[0] === Dr ? [] : w,
          I
        ]), w = y);
      } else
        g.run();
  };
  v.allowRecurse = !!t;
  let C;
  s === "sync" ? C = v : s === "post" ? C = () => ze(v, c && c.suspense) : (v.pre = !0, c && (v.id = c.uid), C = () => si(v));
  const g = new Jo(u, Qe, C), O = qf(), L = () => {
    g.stop(), O && Wo(O.effects, g);
  };
  return t ? n ? v() : w = g.run() : s === "post" ? ze(
    g.run.bind(g),
    c && c.suspense
  ) : g.run(), A && A.push(L), L;
}
function fm(e, t, n) {
  const r = this.proxy, s = Ne(e) ? e.includes(".") ? Kl(r, e) : () => r[e] : e.bind(r, r);
  let o;
  ee(t) ? o = t : (o = t.handler, n = t);
  const i = gr(this), a = Bl(s, o.bind(r), n);
  return i(), a;
}
function Kl(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function Yt(e, t = 1 / 0, n) {
  if (t <= 0 || !be(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, je(e))
    Yt(e.value, t, n);
  else if (Z(e))
    for (let r = 0; r < e.length; r++)
      Yt(e[r], t, n);
  else if ($c(e) || Ln(e))
    e.forEach((r) => {
      Yt(r, t, n);
    });
  else if (zc(e)) {
    for (const r in e)
      Yt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && Yt(e[r], t, n);
  }
  return e;
}
const dm = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Tt(t)}Modifiers`] || e[`${at(t)}Modifiers`];
function mm(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || _e;
  let s = n;
  const o = t.startsWith("update:"), i = o && dm(r, t.slice(7));
  i && (i.trim && (s = n.map((u) => Ne(u) ? u.trim() : u)), i.number && (s = n.map(Qs)));
  let a, c = r[a = Cs(t)] || // also try camelCase event handler (#2249)
  r[a = Cs(Tt(t))];
  !c && o && (c = r[a = Cs(at(t))]), c && dt(
    c,
    e,
    6,
    s
  );
  const l = r[a + "Once"];
  if (l) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, dt(
      l,
      e,
      6,
      s
    );
  }
}
function zl(e, t, n = !1) {
  const r = t.emitsCache, s = r.get(e);
  if (s !== void 0)
    return s;
  const o = e.emits;
  let i = {}, a = !1;
  if (!ee(e)) {
    const c = (l) => {
      const u = zl(l, t, !0);
      u && (a = !0, xe(i, u));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !a ? (be(e) && r.set(e, null), null) : (Z(o) ? o.forEach((c) => i[c] = null) : xe(i, o), be(e) && r.set(e, i), i);
}
function ps(e, t) {
  return !e || !ss(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ae(e, t[0].toLowerCase() + t.slice(1)) || ae(e, at(t)) || ae(e, t));
}
function xs(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    propsOptions: [o],
    slots: i,
    attrs: a,
    emit: c,
    render: l,
    renderCache: u,
    props: m,
    data: p,
    setupState: S,
    ctx: I,
    inheritAttrs: A
  } = e, w = Br(e);
  let v, C;
  try {
    if (n.shapeFlag & 4) {
      const O = s || r, L = qt.NODE_ENV !== "production" && S.__isScriptSetup ? new Proxy(O, {
        get(y, P, V) {
          return Ed(
            `Property '${String(
              P
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(y, P, V);
        }
      }) : O;
      v = yt(
        l.call(
          L,
          O,
          u,
          qt.NODE_ENV !== "production" ? Cr(m) : m,
          S,
          p,
          I
        )
      ), C = a;
    } else {
      const O = t;
      qt.NODE_ENV, v = yt(
        O.length > 1 ? O(
          qt.NODE_ENV !== "production" ? Cr(m) : m,
          qt.NODE_ENV !== "production" ? {
            get attrs() {
              return Cr(a);
            },
            slots: i,
            emit: c
          } : { attrs: a, slots: i, emit: c }
        ) : O(
          qt.NODE_ENV !== "production" ? Cr(m) : m,
          null
        )
      ), C = t.props ? a : pm(a);
    }
  } catch (O) {
    sr.length = 0, fs(O, e, 1), v = Ue(Sn);
  }
  let g = v;
  if (C && A !== !1) {
    const O = Object.keys(C), { shapeFlag: L } = g;
    O.length && L & 7 && (o && O.some(qo) && (C = hm(
      C,
      o
    )), g = kn(g, C, !1, !0));
  }
  return n.dirs && (g = kn(g, null, !1, !0), g.dirs = g.dirs ? g.dirs.concat(n.dirs) : n.dirs), n.transition && (g.transition = n.transition), v = g, Br(w), v;
}
const pm = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ss(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, hm = (e, t) => {
  const n = {};
  for (const r in e)
    (!qo(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function _m(e, t, n) {
  const { props: r, children: s, component: o } = e, { props: i, children: a, patchFlag: c } = t, l = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? ta(r, i, l) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let m = 0; m < u.length; m++) {
        const p = u[m];
        if (i[p] !== r[p] && !ps(l, p))
          return !0;
      }
    }
  } else
    return (s || a) && (!a || !a.$stable) ? !0 : r === i ? !1 : r ? i ? ta(r, i, l) : !0 : !!i;
  return !1;
}
function ta(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !ps(n, o))
      return !0;
  }
  return !1;
}
function gm({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const bm = (e) => e.__isSuspense;
function Em(e, t) {
  t && t.pendingBranch ? Z(e) ? t.effects.push(...e) : t.effects.push(e) : Nd(e);
}
const Je = Symbol.for("v-fgt"), _r = Symbol.for("v-txt"), Sn = Symbol.for("v-cmt"), ks = Symbol.for("v-stc"), sr = [];
let et = null;
function Se(e = !1) {
  sr.push(et = e ? null : []);
}
function Sm() {
  sr.pop(), et = sr[sr.length - 1] || null;
}
let ur = 1;
function na(e) {
  ur += e, e < 0 && et && (et.hasOnce = !0);
}
function ql(e) {
  return e.dynamicChildren = ur > 0 ? et || Dn : null, Sm(), ur > 0 && et && et.push(e), e;
}
function Ae(e, t, n, r, s, o) {
  return ql(
    J(
      e,
      t,
      n,
      r,
      s,
      o,
      !0
    )
  );
}
function ym(e, t, n, r, s) {
  return ql(
    Ue(
      e,
      t,
      n,
      r,
      s,
      !0
    )
  );
}
function lo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function zn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Wl = ({ key: e }) => e ?? null, Fr = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ne(e) || je(e) || ee(e) ? { i: Ze, r: e, k: t, f: !!n } : e : null);
function J(e, t = null, n = null, r = 0, s = null, o = e === Je ? 0 : 1, i = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Wl(t),
    ref: t && Fr(t),
    scopeId: Al,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Ze
  };
  return a ? (ci(c, n), o & 128 && e.normalize(c)) : n && (c.shapeFlag |= Ne(n) ? 8 : 16), ur > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  et && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && et.push(c), c;
}
const Ue = Om;
function Om(e, t = null, n = null, r = 0, s = null, o = !1) {
  if ((!e || e === Hd) && (e = Sn), lo(e)) {
    const a = kn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ci(a, n), ur > 0 && !o && et && (a.shapeFlag & 6 ? et[et.indexOf(e)] = a : et.push(a)), a.patchFlag = -2, a;
  }
  if (km(e) && (e = e.__vccOpts), t) {
    t = vm(t);
    let { class: a, style: c } = t;
    a && !Ne(a) && (t.class = as(a)), be(c) && (pl(c) && !Z(c) && (c = xe({}, c)), t.style = Yo(c));
  }
  const i = Ne(e) ? 1 : bm(e) ? 128 : sm(e) ? 64 : be(e) ? 4 : ee(e) ? 2 : 0;
  return J(
    e,
    t,
    n,
    r,
    s,
    i,
    o,
    !0
  );
}
function vm(e) {
  return e ? pl(e) || kl(e) ? xe({}, e) : e : null;
}
function kn(e, t, n = !1, r = !1) {
  const { props: s, ref: o, patchFlag: i, children: a, transition: c } = e, l = t ? Im(s || {}, t) : s, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Wl(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? Z(o) ? o.concat(Fr(t)) : [o, Fr(t)] : Fr(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Je ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && kn(e.ssContent),
    ssFallback: e.ssFallback && kn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && r && Tl(
    u,
    c.clone(u)
  ), u;
}
function uo(e = " ", t = 0) {
  return Ue(_r, null, e, t);
}
function zt(e = "", t = !1) {
  return t ? (Se(), ym(Sn, null, e)) : Ue(Sn, null, e);
}
function yt(e) {
  return e == null || typeof e == "boolean" ? Ue(Sn) : Z(e) ? Ue(
    Je,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Xt(e) : Ue(_r, null, String(e));
}
function Xt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : kn(e);
}
function ci(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (Z(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), ci(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !kl(t) ? t._ctx = Ze : s === 3 && Ze && (Ze.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else ee(t) ? (t = { default: t, _ctx: Ze }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [uo(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Im(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = as([t.class, r.class]));
      else if (s === "style")
        t.style = Yo([t.style, r.style]);
      else if (ss(s)) {
        const o = t[s], i = r[s];
        i && o !== i && !(Z(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function St(e, t, n, r = null) {
  dt(e, t, 7, [
    n,
    r
  ]);
}
const Am = Ll();
let Tm = 0;
function Nm(e, t, n) {
  const r = e.type, s = (t ? t.appContext : e.appContext) || Am, o = {
    uid: Tm++,
    vnode: e,
    type: r,
    parent: t,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Zc(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Fl(r, s),
    emitsOptions: zl(r, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: _e,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: _e,
    data: _e,
    props: _e,
    attrs: _e,
    slots: _e,
    refs: _e,
    setupState: _e,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = mm.bind(null, o), e.ce && e.ce(o), o;
}
let Pe = null;
const li = () => Pe || Ze;
let zr, fo;
{
  const e = Xc(), t = (n, r) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(r), (o) => {
      s.length > 1 ? s.forEach((i) => i(o)) : s[0](o);
    };
  };
  zr = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Pe = n
  ), fo = t(
    "__VUE_SSR_SETTERS__",
    (n) => hs = n
  );
}
const gr = (e) => {
  const t = Pe;
  return zr(e), e.scope.on(), () => {
    e.scope.off(), zr(t);
  };
}, ra = () => {
  Pe && Pe.scope.off(), zr(null);
};
function Xl(e) {
  return e.vnode.shapeFlag & 4;
}
let hs = !1;
function Rm(e, t = !1, n = !1) {
  t && fo(t);
  const { props: r, children: s } = e.vnode, o = Xl(e);
  Jd(e, r, o, t), tm(e, s, n);
  const i = o ? Cm(e, t) : void 0;
  return t && fo(!1), i;
}
function Cm(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, $d);
  const { setup: r } = n;
  if (r) {
    const s = e.setupContext = r.length > 1 ? Lm(e) : null, o = gr(e);
    Ut();
    const i = kt(
      r,
      e,
      0,
      [
        e.props,
        s
      ]
    );
    if (Gt(), o(), Bc(i)) {
      if (i.then(ra, ra), t)
        return i.then((a) => {
          sa(e, a, t);
        }).catch((a) => {
          fs(a, e, 0);
        });
      e.asyncDep = i;
    } else
      sa(e, i, t);
  } else
    Yl(e, t);
}
function sa(e, t, n) {
  ee(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : be(t) && (e.setupState = bl(t)), Yl(e, n);
}
let oa;
function Yl(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && oa && !r.render) {
      const s = r.template || ii(e).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: c } = r, l = xe(
          xe(
            {
              isCustomElement: o,
              delimiters: a
            },
            i
          ),
          c
        );
        r.render = oa(s, l);
      }
    }
    e.render = r.render || Qe;
  }
  {
    const s = gr(e);
    Ut();
    try {
      Bd(e);
    } finally {
      Gt(), s();
    }
  }
}
const Dm = {
  get(e, t) {
    return We(e, "get", ""), e[t];
  }
};
function Lm(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Dm),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function _s(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(bl(pd(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in tr)
        return tr[n](e);
    },
    has(t, n) {
      return n in t || n in tr;
    }
  })) : e.proxy;
}
const Pm = /(?:^|[-_])(\w)/g, wm = (e) => e.replace(Pm, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function xm(e, t = !0) {
  return ee(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Jl(e, t, n = !1) {
  let r = xm(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    r = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return r ? wm(r) : n ? "App" : "Anonymous";
}
function km(e) {
  return ee(e) && "__vccOpts" in e;
}
const ot = (e, t) => hd(e, t, hs);
function ui(e, t, n) {
  const r = arguments.length;
  return r === 2 ? be(t) && !Z(t) ? lo(t) ? Ue(e, null, [t]) : Ue(e, t) : Ue(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && lo(n) && (n = [n]), Ue(e, t, n));
}
const Mm = "3.4.33", Fm = "http://www.w3.org/2000/svg", Um = "http://www.w3.org/1998/Math/MathML", Lt = typeof document < "u" ? document : null, ia = Lt && /* @__PURE__ */ Lt.createElement("template"), Gm = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const s = t === "svg" ? Lt.createElementNS(Fm, e) : t === "mathml" ? Lt.createElementNS(Um, e) : n ? Lt.createElement(e, { is: n }) : Lt.createElement(e);
    return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s;
  },
  createText: (e) => Lt.createTextNode(e),
  createComment: (e) => Lt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Lt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, s, o) {
    const i = n ? n.previousSibling : t.lastChild;
    if (s && (s === o || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === o || !(s = s.nextSibling)); )
        ;
    else {
      ia.innerHTML = r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e;
      const a = ia.content;
      if (r === "svg" || r === "mathml") {
        const c = a.firstChild;
        for (; c.firstChild; )
          a.appendChild(c.firstChild);
        a.removeChild(c);
      }
      t.insertBefore(a, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, jm = Symbol("_vtc");
function Vm(e, t, n) {
  const r = e[jm];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const aa = Symbol("_vod"), Hm = Symbol("_vsh"), $m = Symbol(""), Bm = /(^|;)\s*display\s*:/;
function Km(e, t, n) {
  const r = e.style, s = Ne(n);
  let o = !1;
  if (n && !s) {
    if (t)
      if (Ne(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          n[a] == null && Ur(r, a, "");
        }
      else
        for (const i in t)
          n[i] == null && Ur(r, i, "");
    for (const i in n)
      i === "display" && (o = !0), Ur(r, i, n[i]);
  } else if (s) {
    if (t !== n) {
      const i = r[$m];
      i && (n += ";" + i), r.cssText = n, o = Bm.test(n);
    }
  } else t && e.removeAttribute("style");
  aa in e && (e[aa] = o ? r.display : "", e[Hm] && (r.display = "none"));
}
const ca = /\s*!important$/;
function Ur(e, t, n) {
  if (Z(n))
    n.forEach((r) => Ur(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = zm(e, t);
    ca.test(n) ? e.setProperty(
      at(r),
      n.replace(ca, ""),
      "important"
    ) : e[r] = n;
  }
}
const la = ["Webkit", "Moz", "ms"], Ms = {};
function zm(e, t) {
  const n = Ms[t];
  if (n)
    return n;
  let r = Tt(t);
  if (r !== "filter" && r in e)
    return Ms[t] = r;
  r = qc(r);
  for (let s = 0; s < la.length; s++) {
    const o = la[s] + r;
    if (o in e)
      return Ms[t] = o;
  }
  return t;
}
const ua = "http://www.w3.org/1999/xlink";
function fa(e, t, n, r, s, o = Bf(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ua, t.slice(6, t.length)) : e.setAttributeNS(ua, t, n) : n == null || o && !Yc(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : rn(n) ? String(n) : n
  );
}
function qm(e, t, n, r) {
  if (t === "innerHTML" || t === "textContent") {
    if (n == null) return;
    e[t] = n;
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const i = s === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? "" : String(n);
    (i !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const i = typeof e[t];
    i === "boolean" ? n = Yc(n) : n == null && i === "string" ? (n = "", o = !0) : i === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(t);
}
function Nn(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Wm(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const da = Symbol("_vei");
function Xm(e, t, n, r, s = null) {
  const o = e[da] || (e[da] = {}), i = o[t];
  if (r && i)
    i.value = r;
  else {
    const [a, c] = Ym(t);
    if (r) {
      const l = o[t] = Zm(
        r,
        s
      );
      Nn(e, a, l, c);
    } else i && (Wm(e, a, i, c), o[t] = void 0);
  }
}
const ma = /(?:Once|Passive|Capture)$/;
function Ym(e) {
  let t;
  if (ma.test(e)) {
    t = {};
    let r;
    for (; r = e.match(ma); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : at(e.slice(2)), t];
}
let Fs = 0;
const Jm = /* @__PURE__ */ Promise.resolve(), Qm = () => Fs || (Jm.then(() => Fs = 0), Fs = Date.now());
function Zm(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    dt(
      ep(r, n.value),
      t,
      5,
      [r]
    );
  };
  return n.value = e, n.attached = Qm(), n;
}
function ep(e, t) {
  if (Z(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (r) => (s) => !s._stopped && r && r(s)
    );
  } else
    return t;
}
const pa = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, tp = (e, t, n, r, s, o) => {
  const i = s === "svg";
  t === "class" ? Vm(e, r, i) : t === "style" ? Km(e, n, r) : ss(t) ? qo(t) || Xm(e, t, n, r, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : np(e, t, r, i)) ? (qm(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && fa(e, t, r, i, o, t !== "value")) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), fa(e, t, r, i));
};
function np(e, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e && pa(t) && ee(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return pa(t) && Ne(n) ? !1 : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function jn(e, t, n) {
  const r = /* @__PURE__ */ ht(e, t);
  class s extends fi {
    constructor(i) {
      super(r, i, n);
    }
  }
  return s.def = r, s;
}
const rp = typeof HTMLElement < "u" ? HTMLElement : class {
};
class fi extends rp {
  constructor(t, n = {}, r) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && r ? r(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, yl(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), ba(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    this._ob = new MutationObserver((r) => {
      for (const s of r)
        this._setAttr(s.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (r, s = !1) => {
      const { props: o, styles: i } = r;
      let a;
      if (o && !Z(o))
        for (const c in o) {
          const l = o[c];
          (l === Number || l && l.type === Number) && (c in this._props && (this._props[c] = Mi(this._props[c])), (a || (a = /* @__PURE__ */ Object.create(null)))[Tt(c)] = !0);
        }
      this._numberProps = a, s && this._resolveProps(r), this._applyStyles(i), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((r) => t(r, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, r = Z(n) ? n : Object.keys(n || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && r.includes(s) && this._setProp(s, this[s], !0, !1);
    for (const s of r.map(Tt))
      Object.defineProperty(this, s, {
        get() {
          return this._getProp(s);
        },
        set(o) {
          this._setProp(s, o);
        }
      });
  }
  _setAttr(t) {
    let n = this.hasAttribute(t) ? this.getAttribute(t) : void 0;
    const r = Tt(t);
    this._numberProps && this._numberProps[r] && (n = Mi(n)), this._setProp(r, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, r = !0, s = !0) {
    n !== this._props[t] && (this._props[t] = n, s && this._instance && this._update(), r && (n === !0 ? this.setAttribute(at(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(at(t), n + "") : n || this.removeAttribute(at(t))));
  }
  _update() {
    ba(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ue(this._def, xe({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const r = (o, i) => {
        this.dispatchEvent(
          new CustomEvent(o, {
            detail: i
          })
        );
      };
      n.emit = (o, ...i) => {
        r(o, i), at(o) !== o && r(at(o), i);
      };
      let s = this;
      for (; s = s && (s.parentNode || s.host); )
        if (s instanceof fi) {
          n.parent = s._instance, n.provides = s._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const r = document.createElement("style");
      r.textContent = n, this.shadowRoot.appendChild(r);
    });
  }
}
const ha = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return Z(t) ? (n) => xr(t, n) : t;
};
function sp(e) {
  e.target.composing = !0;
}
function _a(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Us = Symbol("_assign"), op = {
  created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
    e[Us] = ha(s);
    const o = r || s.props && s.props.type === "number";
    Nn(e, t ? "change" : "input", (i) => {
      if (i.target.composing) return;
      let a = e.value;
      n && (a = a.trim()), o && (a = Qs(a)), e[Us](a);
    }), n && Nn(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Nn(e, "compositionstart", sp), Nn(e, "compositionend", _a), Nn(e, "change", _a));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: s, number: o } }, i) {
    if (e[Us] = ha(i), e.composing) return;
    const a = (o || e.type === "number") && !/^0\d/.test(e.value) ? Qs(e.value) : e.value, c = t ?? "";
    a !== c && (document.activeElement === e && e.type !== "range" && (r && t === n || s && e.value.trim() === c) || (e.value = c));
  }
}, ip = /* @__PURE__ */ xe({ patchProp: tp }, Gm);
let ga;
function Ql() {
  return ga || (ga = om(ip));
}
const ba = (...e) => {
  Ql().render(...e);
}, ap = (...e) => {
  const t = Ql().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const s = lp(r);
    if (!s) return;
    const o = t._component;
    !ee(o) && !o.render && !o.template && (o.template = s.innerHTML), s.innerHTML = "";
    const i = n(s, !1, cp(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
  }, t;
};
function cp(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function lp(e) {
  return Ne(e) ? document.querySelector(e) : e;
}
var up = "Expected a function", Ea = NaN, fp = "[object Symbol]", dp = /^\s+|\s+$/g, mp = /^[-+]0x[0-9a-f]+$/i, pp = /^0b[01]+$/i, hp = /^0o[0-7]+$/i, _p = parseInt, gp = typeof vr == "object" && vr && vr.Object === Object && vr, bp = typeof self == "object" && self && self.Object === Object && self, Ep = gp || bp || Function("return this")(), Sp = Object.prototype, yp = Sp.toString, Op = Math.max, vp = Math.min, Gs = function() {
  return Ep.Date.now();
};
function Ip(e, t, n) {
  var r, s, o, i, a, c, l = 0, u = !1, m = !1, p = !0;
  if (typeof e != "function")
    throw new TypeError(up);
  t = Sa(t) || 0, mo(n) && (u = !!n.leading, m = "maxWait" in n, o = m ? Op(Sa(n.maxWait) || 0, t) : o, p = "trailing" in n ? !!n.trailing : p);
  function S(y) {
    var P = r, V = s;
    return r = s = void 0, l = y, i = e.apply(V, P), i;
  }
  function I(y) {
    return l = y, a = setTimeout(v, t), u ? S(y) : i;
  }
  function A(y) {
    var P = y - c, V = y - l, $ = t - P;
    return m ? vp($, o - V) : $;
  }
  function w(y) {
    var P = y - c, V = y - l;
    return c === void 0 || P >= t || P < 0 || m && V >= o;
  }
  function v() {
    var y = Gs();
    if (w(y))
      return C(y);
    a = setTimeout(v, A(y));
  }
  function C(y) {
    return a = void 0, p && r ? S(y) : (r = s = void 0, i);
  }
  function g() {
    a !== void 0 && clearTimeout(a), l = 0, r = c = s = a = void 0;
  }
  function O() {
    return a === void 0 ? i : C(Gs());
  }
  function L() {
    var y = Gs(), P = w(y);
    if (r = arguments, s = this, c = y, P) {
      if (a === void 0)
        return I(c);
      if (m)
        return a = setTimeout(v, t), S(c);
    }
    return a === void 0 && (a = setTimeout(v, t)), i;
  }
  return L.cancel = g, L.flush = O, L;
}
function mo(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function Ap(e) {
  return !!e && typeof e == "object";
}
function Tp(e) {
  return typeof e == "symbol" || Ap(e) && yp.call(e) == fp;
}
function Sa(e) {
  if (typeof e == "number")
    return e;
  if (Tp(e))
    return Ea;
  if (mo(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = mo(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(dp, "");
  var n = pp.test(e);
  return n || hp.test(e) ? _p(e.slice(2), n ? 2 : 8) : mp.test(e) ? Ea : +e;
}
var Np = Ip;
const Zl = /* @__PURE__ */ Pf(Np);
/*!
  * shared v9.13.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const qr = typeof window < "u", sn = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), Rp = (e, t, n) => Cp({ l: e, k: t, s: n }), Cp = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), we = (e) => typeof e == "number" && isFinite(e), Dp = (e) => tu(e) === "[object Date]", Wr = (e) => tu(e) === "[object RegExp]", gs = (e) => ie(e) && Object.keys(e).length === 0, Ge = Object.assign;
let ya;
const di = () => ya || (ya = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Oa(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const Lp = Object.prototype.hasOwnProperty;
function Xr(e, t) {
  return Lp.call(e, t);
}
const Le = Array.isArray, Te = (e) => typeof e == "function", z = (e) => typeof e == "string", ye = (e) => typeof e == "boolean", fe = (e) => e !== null && typeof e == "object", Pp = (e) => fe(e) && Te(e.then) && Te(e.catch), eu = Object.prototype.toString, tu = (e) => eu.call(e), ie = (e) => {
  if (!fe(e))
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t.constructor === Object;
}, wp = (e) => e == null ? "" : Le(e) || ie(e) && e.toString === eu ? JSON.stringify(e, null, 2) : String(e);
function xp(e, t = "") {
  return e.reduce((n, r, s) => s === 0 ? n + r : n + t + r, "");
}
function bs(e) {
  let t = e;
  return () => ++t;
}
function kp(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Lr = (e) => !fe(e) || Le(e);
function Gr(e, t) {
  if (Lr(e) || Lr(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: r, des: s } = n.pop();
    Object.keys(r).forEach((o) => {
      Lr(r[o]) || Lr(s[o]) ? s[o] = r[o] : n.push({ src: r[o], des: s[o] });
    });
  }
}
/*!
  * message-compiler v9.13.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function Mp(e, t, n) {
  return { line: e, column: t, offset: n };
}
function Yr(e, t, n) {
  return { start: e, end: t };
}
const Fp = /\{([0-9a-zA-Z]+)\}/g;
function nu(e, ...t) {
  return t.length === 1 && Up(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(Fp, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const ru = Object.assign, va = (e) => typeof e == "string", Up = (e) => e !== null && typeof e == "object";
function su(e, t = "") {
  return e.reduce((n, r, s) => s === 0 ? n + r : n + t + r, "");
}
const mi = {
  USE_MODULO_SYNTAX: 1,
  __EXTEND_POINT__: 2
}, Gp = {
  [mi.USE_MODULO_SYNTAX]: "Use modulo before '{{0}}'."
};
function jp(e, t, ...n) {
  const r = nu(Gp[e], ...n || []), s = { message: String(r), code: e };
  return t && (s.location = t), s;
}
const Q = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  // Special value for higher-order compilers to pick up the last code
  // to avoid collision of error codes. This should always be kept as the last
  // item.
  __EXTEND_POINT__: 17
}, Vp = {
  // tokenizer error messages
  [Q.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [Q.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [Q.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [Q.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [Q.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [Q.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [Q.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [Q.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [Q.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [Q.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [Q.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [Q.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [Q.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [Q.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [Q.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function Vn(e, t, n = {}) {
  const { domain: r, messages: s, args: o } = n, i = nu((s || Vp)[e] || "", ...o || []), a = new SyntaxError(String(i));
  return a.code = e, t && (a.location = t), a.domain = r, a;
}
function Hp(e) {
  throw e;
}
const Ct = " ", $p = "\r", He = `
`, Bp = "\u2028", Kp = "\u2029";
function zp(e) {
  const t = e;
  let n = 0, r = 1, s = 1, o = 0;
  const i = (P) => t[P] === $p && t[P + 1] === He, a = (P) => t[P] === He, c = (P) => t[P] === Kp, l = (P) => t[P] === Bp, u = (P) => i(P) || a(P) || c(P) || l(P), m = () => n, p = () => r, S = () => s, I = () => o, A = (P) => i(P) || c(P) || l(P) ? He : t[P], w = () => A(n), v = () => A(n + o);
  function C() {
    return o = 0, u(n) && (r++, s = 0), i(n) && n++, n++, s++, t[n];
  }
  function g() {
    return i(n + o) && o++, o++, t[n + o];
  }
  function O() {
    n = 0, r = 1, s = 1, o = 0;
  }
  function L(P = 0) {
    o = P;
  }
  function y() {
    const P = n + o;
    for (; P !== n; )
      C();
    o = 0;
  }
  return {
    index: m,
    line: p,
    column: S,
    peekOffset: I,
    charAt: A,
    currentChar: w,
    currentPeek: v,
    next: C,
    peek: g,
    reset: O,
    resetPeek: L,
    skipToPeek: y
  };
}
const $t = void 0, qp = ".", Ia = "'", Wp = "tokenizer";
function Xp(e, t = {}) {
  const n = t.location !== !1, r = zp(e), s = () => r.index(), o = () => Mp(r.line(), r.column(), r.index()), i = o(), a = s(), c = {
    currentType: 14,
    offset: a,
    startLoc: i,
    endLoc: i,
    lastType: 14,
    lastOffset: a,
    lastStartLoc: i,
    lastEndLoc: i,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, l = () => c, { onError: u } = t;
  function m(f, d, _, ...D) {
    const H = l();
    if (d.column += _, d.offset += _, u) {
      const F = n ? Yr(H.startLoc, d) : null, E = Vn(f, F, {
        domain: Wp,
        args: D
      });
      u(E);
    }
  }
  function p(f, d, _) {
    f.endLoc = o(), f.currentType = d;
    const D = { type: d };
    return n && (D.loc = Yr(f.startLoc, f.endLoc)), _ != null && (D.value = _), D;
  }
  const S = (f) => p(
    f,
    14
    /* TokenTypes.EOF */
  );
  function I(f, d) {
    return f.currentChar() === d ? (f.next(), d) : (m(Q.EXPECTED_TOKEN, o(), 0, d), "");
  }
  function A(f) {
    let d = "";
    for (; f.currentPeek() === Ct || f.currentPeek() === He; )
      d += f.currentPeek(), f.peek();
    return d;
  }
  function w(f) {
    const d = A(f);
    return f.skipToPeek(), d;
  }
  function v(f) {
    if (f === $t)
      return !1;
    const d = f.charCodeAt(0);
    return d >= 97 && d <= 122 || // a-z
    d >= 65 && d <= 90 || // A-Z
    d === 95;
  }
  function C(f) {
    if (f === $t)
      return !1;
    const d = f.charCodeAt(0);
    return d >= 48 && d <= 57;
  }
  function g(f, d) {
    const { currentType: _ } = d;
    if (_ !== 2)
      return !1;
    A(f);
    const D = v(f.currentPeek());
    return f.resetPeek(), D;
  }
  function O(f, d) {
    const { currentType: _ } = d;
    if (_ !== 2)
      return !1;
    A(f);
    const D = f.currentPeek() === "-" ? f.peek() : f.currentPeek(), H = C(D);
    return f.resetPeek(), H;
  }
  function L(f, d) {
    const { currentType: _ } = d;
    if (_ !== 2)
      return !1;
    A(f);
    const D = f.currentPeek() === Ia;
    return f.resetPeek(), D;
  }
  function y(f, d) {
    const { currentType: _ } = d;
    if (_ !== 8)
      return !1;
    A(f);
    const D = f.currentPeek() === ".";
    return f.resetPeek(), D;
  }
  function P(f, d) {
    const { currentType: _ } = d;
    if (_ !== 9)
      return !1;
    A(f);
    const D = v(f.currentPeek());
    return f.resetPeek(), D;
  }
  function V(f, d) {
    const { currentType: _ } = d;
    if (!(_ === 8 || _ === 12))
      return !1;
    A(f);
    const D = f.currentPeek() === ":";
    return f.resetPeek(), D;
  }
  function $(f, d) {
    const { currentType: _ } = d;
    if (_ !== 10)
      return !1;
    const D = () => {
      const F = f.currentPeek();
      return F === "{" ? v(f.peek()) : F === "@" || F === "%" || F === "|" || F === ":" || F === "." || F === Ct || !F ? !1 : F === He ? (f.peek(), D()) : re(f, !1);
    }, H = D();
    return f.resetPeek(), H;
  }
  function de(f) {
    A(f);
    const d = f.currentPeek() === "|";
    return f.resetPeek(), d;
  }
  function Oe(f) {
    const d = A(f), _ = f.currentPeek() === "%" && f.peek() === "{";
    return f.resetPeek(), {
      isModulo: _,
      hasSpace: d.length > 0
    };
  }
  function re(f, d = !0) {
    const _ = (H = !1, F = "", E = !1) => {
      const T = f.currentPeek();
      return T === "{" ? F === "%" ? !1 : H : T === "@" || !T ? F === "%" ? !0 : H : T === "%" ? (f.peek(), _(H, "%", !0)) : T === "|" ? F === "%" || E ? !0 : !(F === Ct || F === He) : T === Ct ? (f.peek(), _(!0, Ct, E)) : T === He ? (f.peek(), _(!0, He, E)) : !0;
    }, D = _();
    return d && f.resetPeek(), D;
  }
  function ve(f, d) {
    const _ = f.currentChar();
    return _ === $t ? $t : d(_) ? (f.next(), _) : null;
  }
  function Rt(f) {
    const d = f.charCodeAt(0);
    return d >= 97 && d <= 122 || // a-z
    d >= 65 && d <= 90 || // A-Z
    d >= 48 && d <= 57 || // 0-9
    d === 95 || // _
    d === 36;
  }
  function gt(f) {
    return ve(f, Rt);
  }
  function Ee(f) {
    const d = f.charCodeAt(0);
    return d >= 97 && d <= 122 || // a-z
    d >= 65 && d <= 90 || // A-Z
    d >= 48 && d <= 57 || // 0-9
    d === 95 || // _
    d === 36 || // $
    d === 45;
  }
  function ue(f) {
    return ve(f, Ee);
  }
  function ce(f) {
    const d = f.charCodeAt(0);
    return d >= 48 && d <= 57;
  }
  function U(f) {
    return ve(f, ce);
  }
  function k(f) {
    const d = f.charCodeAt(0);
    return d >= 48 && d <= 57 || // 0-9
    d >= 65 && d <= 70 || // A-F
    d >= 97 && d <= 102;
  }
  function j(f) {
    return ve(f, k);
  }
  function W(f) {
    let d = "", _ = "";
    for (; d = U(f); )
      _ += d;
    return _;
  }
  function q(f) {
    w(f);
    const d = f.currentChar();
    return d !== "%" && m(Q.EXPECTED_TOKEN, o(), 0, d), f.next(), "%";
  }
  function oe(f) {
    let d = "";
    for (; ; ) {
      const _ = f.currentChar();
      if (_ === "{" || _ === "}" || _ === "@" || _ === "|" || !_)
        break;
      if (_ === "%")
        if (re(f))
          d += _, f.next();
        else
          break;
      else if (_ === Ct || _ === He)
        if (re(f))
          d += _, f.next();
        else {
          if (de(f))
            break;
          d += _, f.next();
        }
      else
        d += _, f.next();
    }
    return d;
  }
  function Ce(f) {
    w(f);
    let d = "", _ = "";
    for (; d = ue(f); )
      _ += d;
    return f.currentChar() === $t && m(Q.UNTERMINATED_CLOSING_BRACE, o(), 0), _;
  }
  function he(f) {
    w(f);
    let d = "";
    return f.currentChar() === "-" ? (f.next(), d += `-${W(f)}`) : d += W(f), f.currentChar() === $t && m(Q.UNTERMINATED_CLOSING_BRACE, o(), 0), d;
  }
  function De(f) {
    return f !== Ia && f !== He;
  }
  function Ie(f) {
    w(f), I(f, "'");
    let d = "", _ = "";
    for (; d = ve(f, De); )
      d === "\\" ? _ += bt(f) : _ += d;
    const D = f.currentChar();
    return D === He || D === $t ? (m(Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, o(), 0), D === He && (f.next(), I(f, "'")), _) : (I(f, "'"), _);
  }
  function bt(f) {
    const d = f.currentChar();
    switch (d) {
      case "\\":
      case "'":
        return f.next(), `\\${d}`;
      case "u":
        return ke(f, d, 4);
      case "U":
        return ke(f, d, 6);
      default:
        return m(Q.UNKNOWN_ESCAPE_SEQUENCE, o(), 0, d), "";
    }
  }
  function ke(f, d, _) {
    I(f, d);
    let D = "";
    for (let H = 0; H < _; H++) {
      const F = j(f);
      if (!F) {
        m(Q.INVALID_UNICODE_ESCAPE_SEQUENCE, o(), 0, `\\${d}${D}${f.currentChar()}`);
        break;
      }
      D += F;
    }
    return `\\${d}${D}`;
  }
  function $e(f) {
    return f !== "{" && f !== "}" && f !== Ct && f !== He;
  }
  function An(f) {
    w(f);
    let d = "", _ = "";
    for (; d = ve(f, $e); )
      _ += d;
    return _;
  }
  function h(f) {
    let d = "", _ = "";
    for (; d = gt(f); )
      _ += d;
    return _;
  }
  function b(f) {
    const d = (_) => {
      const D = f.currentChar();
      return D === "{" || D === "%" || D === "@" || D === "|" || D === "(" || D === ")" || !D || D === Ct ? _ : (_ += D, f.next(), d(_));
    };
    return d("");
  }
  function N(f) {
    w(f);
    const d = I(
      f,
      "|"
      /* TokenChars.Pipe */
    );
    return w(f), d;
  }
  function M(f, d) {
    let _ = null;
    switch (f.currentChar()) {
      case "{":
        return d.braceNest >= 1 && m(Q.NOT_ALLOW_NEST_PLACEHOLDER, o(), 0), f.next(), _ = p(
          d,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), w(f), d.braceNest++, _;
      case "}":
        return d.braceNest > 0 && d.currentType === 2 && m(Q.EMPTY_PLACEHOLDER, o(), 0), f.next(), _ = p(
          d,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), d.braceNest--, d.braceNest > 0 && w(f), d.inLinked && d.braceNest === 0 && (d.inLinked = !1), _;
      case "@":
        return d.braceNest > 0 && m(Q.UNTERMINATED_CLOSING_BRACE, o(), 0), _ = x(f, d) || S(d), d.braceNest = 0, _;
      default: {
        let H = !0, F = !0, E = !0;
        if (de(f))
          return d.braceNest > 0 && m(Q.UNTERMINATED_CLOSING_BRACE, o(), 0), _ = p(d, 1, N(f)), d.braceNest = 0, d.inLinked = !1, _;
        if (d.braceNest > 0 && (d.currentType === 5 || d.currentType === 6 || d.currentType === 7))
          return m(Q.UNTERMINATED_CLOSING_BRACE, o(), 0), d.braceNest = 0, G(f, d);
        if (H = g(f, d))
          return _ = p(d, 5, Ce(f)), w(f), _;
        if (F = O(f, d))
          return _ = p(d, 6, he(f)), w(f), _;
        if (E = L(f, d))
          return _ = p(d, 7, Ie(f)), w(f), _;
        if (!H && !F && !E)
          return _ = p(d, 13, An(f)), m(Q.INVALID_TOKEN_IN_PLACEHOLDER, o(), 0, _.value), w(f), _;
        break;
      }
    }
    return _;
  }
  function x(f, d) {
    const { currentType: _ } = d;
    let D = null;
    const H = f.currentChar();
    switch ((_ === 8 || _ === 9 || _ === 12 || _ === 10) && (H === He || H === Ct) && m(Q.INVALID_LINKED_FORMAT, o(), 0), H) {
      case "@":
        return f.next(), D = p(
          d,
          8,
          "@"
          /* TokenChars.LinkedAlias */
        ), d.inLinked = !0, D;
      case ".":
        return w(f), f.next(), p(
          d,
          9,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return w(f), f.next(), p(
          d,
          10,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return de(f) ? (D = p(d, 1, N(f)), d.braceNest = 0, d.inLinked = !1, D) : y(f, d) || V(f, d) ? (w(f), x(f, d)) : P(f, d) ? (w(f), p(d, 12, h(f))) : $(f, d) ? (w(f), H === "{" ? M(f, d) || D : p(d, 11, b(f))) : (_ === 8 && m(Q.INVALID_LINKED_FORMAT, o(), 0), d.braceNest = 0, d.inLinked = !1, G(f, d));
    }
  }
  function G(f, d) {
    let _ = {
      type: 14
      /* TokenTypes.EOF */
    };
    if (d.braceNest > 0)
      return M(f, d) || S(d);
    if (d.inLinked)
      return x(f, d) || S(d);
    switch (f.currentChar()) {
      case "{":
        return M(f, d) || S(d);
      case "}":
        return m(Q.UNBALANCED_CLOSING_BRACE, o(), 0), f.next(), p(
          d,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return x(f, d) || S(d);
      default: {
        if (de(f))
          return _ = p(d, 1, N(f)), d.braceNest = 0, d.inLinked = !1, _;
        const { isModulo: H, hasSpace: F } = Oe(f);
        if (H)
          return F ? p(d, 0, oe(f)) : p(d, 4, q(f));
        if (re(f))
          return p(d, 0, oe(f));
        break;
      }
    }
    return _;
  }
  function B() {
    const { currentType: f, offset: d, startLoc: _, endLoc: D } = c;
    return c.lastType = f, c.lastOffset = d, c.lastStartLoc = _, c.lastEndLoc = D, c.offset = s(), c.startLoc = o(), r.currentChar() === $t ? p(
      c,
      14
      /* TokenTypes.EOF */
    ) : G(r, c);
  }
  return {
    nextToken: B,
    currentOffset: s,
    currentPosition: o,
    context: l
  };
}
const Yp = "parser", Jp = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Qp(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "�";
    }
  }
}
function Zp(e = {}) {
  const t = e.location !== !1, { onError: n, onWarn: r } = e;
  function s(g, O, L, y, ...P) {
    const V = g.currentPosition();
    if (V.offset += y, V.column += y, n) {
      const $ = t ? Yr(L, V) : null, de = Vn(O, $, {
        domain: Yp,
        args: P
      });
      n(de);
    }
  }
  function o(g, O, L, y, ...P) {
    const V = g.currentPosition();
    if (V.offset += y, V.column += y, r) {
      const $ = t ? Yr(L, V) : null;
      r(jp(O, $, P));
    }
  }
  function i(g, O, L) {
    const y = { type: g };
    return t && (y.start = O, y.end = O, y.loc = { start: L, end: L }), y;
  }
  function a(g, O, L, y) {
    t && (g.end = O, g.loc && (g.loc.end = L));
  }
  function c(g, O) {
    const L = g.context(), y = i(3, L.offset, L.startLoc);
    return y.value = O, a(y, g.currentOffset(), g.currentPosition()), y;
  }
  function l(g, O) {
    const L = g.context(), { lastOffset: y, lastStartLoc: P } = L, V = i(5, y, P);
    return V.index = parseInt(O, 10), g.nextToken(), a(V, g.currentOffset(), g.currentPosition()), V;
  }
  function u(g, O, L) {
    const y = g.context(), { lastOffset: P, lastStartLoc: V } = y, $ = i(4, P, V);
    return $.key = O, L === !0 && ($.modulo = !0), g.nextToken(), a($, g.currentOffset(), g.currentPosition()), $;
  }
  function m(g, O) {
    const L = g.context(), { lastOffset: y, lastStartLoc: P } = L, V = i(9, y, P);
    return V.value = O.replace(Jp, Qp), g.nextToken(), a(V, g.currentOffset(), g.currentPosition()), V;
  }
  function p(g) {
    const O = g.nextToken(), L = g.context(), { lastOffset: y, lastStartLoc: P } = L, V = i(8, y, P);
    return O.type !== 12 ? (s(g, Q.UNEXPECTED_EMPTY_LINKED_MODIFIER, L.lastStartLoc, 0), V.value = "", a(V, y, P), {
      nextConsumeToken: O,
      node: V
    }) : (O.value == null && s(g, Q.UNEXPECTED_LEXICAL_ANALYSIS, L.lastStartLoc, 0, ut(O)), V.value = O.value || "", a(V, g.currentOffset(), g.currentPosition()), {
      node: V
    });
  }
  function S(g, O) {
    const L = g.context(), y = i(7, L.offset, L.startLoc);
    return y.value = O, a(y, g.currentOffset(), g.currentPosition()), y;
  }
  function I(g) {
    const O = g.context(), L = i(6, O.offset, O.startLoc);
    let y = g.nextToken();
    if (y.type === 9) {
      const P = p(g);
      L.modifier = P.node, y = P.nextConsumeToken || g.nextToken();
    }
    switch (y.type !== 10 && s(g, Q.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, ut(y)), y = g.nextToken(), y.type === 2 && (y = g.nextToken()), y.type) {
      case 11:
        y.value == null && s(g, Q.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, ut(y)), L.key = S(g, y.value || "");
        break;
      case 5:
        y.value == null && s(g, Q.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, ut(y)), L.key = u(g, y.value || "");
        break;
      case 6:
        y.value == null && s(g, Q.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, ut(y)), L.key = l(g, y.value || "");
        break;
      case 7:
        y.value == null && s(g, Q.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, ut(y)), L.key = m(g, y.value || "");
        break;
      default: {
        s(g, Q.UNEXPECTED_EMPTY_LINKED_KEY, O.lastStartLoc, 0);
        const P = g.context(), V = i(7, P.offset, P.startLoc);
        return V.value = "", a(V, P.offset, P.startLoc), L.key = V, a(L, P.offset, P.startLoc), {
          nextConsumeToken: y,
          node: L
        };
      }
    }
    return a(L, g.currentOffset(), g.currentPosition()), {
      node: L
    };
  }
  function A(g) {
    const O = g.context(), L = O.currentType === 1 ? g.currentOffset() : O.offset, y = O.currentType === 1 ? O.endLoc : O.startLoc, P = i(2, L, y);
    P.items = [];
    let V = null, $ = null;
    do {
      const re = V || g.nextToken();
      switch (V = null, re.type) {
        case 0:
          re.value == null && s(g, Q.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, ut(re)), P.items.push(c(g, re.value || ""));
          break;
        case 6:
          re.value == null && s(g, Q.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, ut(re)), P.items.push(l(g, re.value || ""));
          break;
        case 4:
          $ = !0;
          break;
        case 5:
          re.value == null && s(g, Q.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, ut(re)), P.items.push(u(g, re.value || "", !!$)), $ && (o(g, mi.USE_MODULO_SYNTAX, O.lastStartLoc, 0, ut(re)), $ = null);
          break;
        case 7:
          re.value == null && s(g, Q.UNEXPECTED_LEXICAL_ANALYSIS, O.lastStartLoc, 0, ut(re)), P.items.push(m(g, re.value || ""));
          break;
        case 8: {
          const ve = I(g);
          P.items.push(ve.node), V = ve.nextConsumeToken || null;
          break;
        }
      }
    } while (O.currentType !== 14 && O.currentType !== 1);
    const de = O.currentType === 1 ? O.lastOffset : g.currentOffset(), Oe = O.currentType === 1 ? O.lastEndLoc : g.currentPosition();
    return a(P, de, Oe), P;
  }
  function w(g, O, L, y) {
    const P = g.context();
    let V = y.items.length === 0;
    const $ = i(1, O, L);
    $.cases = [], $.cases.push(y);
    do {
      const de = A(g);
      V || (V = de.items.length === 0), $.cases.push(de);
    } while (P.currentType !== 14);
    return V && s(g, Q.MUST_HAVE_MESSAGES_IN_PLURAL, L, 0), a($, g.currentOffset(), g.currentPosition()), $;
  }
  function v(g) {
    const O = g.context(), { offset: L, startLoc: y } = O, P = A(g);
    return O.currentType === 14 ? P : w(g, L, y, P);
  }
  function C(g) {
    const O = Xp(g, ru({}, e)), L = O.context(), y = i(0, L.offset, L.startLoc);
    return t && y.loc && (y.loc.source = g), y.body = v(O), e.onCacheKey && (y.cacheKey = e.onCacheKey(g)), L.currentType !== 14 && s(O, Q.UNEXPECTED_LEXICAL_ANALYSIS, L.lastStartLoc, 0, g[L.offset] || ""), a(y, O.currentOffset(), O.currentPosition()), y;
  }
  return { parse: C };
}
function ut(e) {
  if (e.type === 14)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function eh(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (o) => (n.helpers.add(o), o) };
}
function Aa(e, t) {
  for (let n = 0; n < e.length; n++)
    pi(e[n], t);
}
function pi(e, t) {
  switch (e.type) {
    case 1:
      Aa(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Aa(e.items, t);
      break;
    case 6: {
      pi(e.key, t), t.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), t.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function th(e, t = {}) {
  const n = eh(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && pi(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function nh(e) {
  const t = e.body;
  return t.type === 2 ? Ta(t) : t.cases.forEach((n) => Ta(n)), e;
}
function Ta(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const r = e.items[n];
      if (!(r.type === 3 || r.type === 9) || r.value == null)
        break;
      t.push(r.value);
    }
    if (t.length === e.items.length) {
      e.static = su(t);
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
const rh = "minifier";
function Rn(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      Rn(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let r = 0; r < n.length; r++)
        Rn(n[r]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let r = 0; r < n.length; r++)
        Rn(n[r]);
      t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const t = e;
      t.value && (t.v = t.value, delete t.value);
      break;
    }
    case 6: {
      const t = e;
      Rn(t.key), t.k = t.key, delete t.key, t.modifier && (Rn(t.modifier), t.m = t.modifier, delete t.modifier);
      break;
    }
    case 5: {
      const t = e;
      t.i = t.index, delete t.index;
      break;
    }
    case 4: {
      const t = e;
      t.k = t.key, delete t.key;
      break;
    }
    default:
      throw Vn(Q.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: rh,
        args: [e.type]
      });
  }
  delete e.type;
}
const sh = "parser";
function oh(e, t) {
  const { sourceMap: n, filename: r, breakLineCode: s, needIndent: o } = t, i = t.location !== !1, a = {
    filename: r,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: s,
    needIndent: o,
    indentLevel: 0
  };
  i && e.loc && (a.source = e.loc.source);
  const c = () => a;
  function l(w, v) {
    a.code += w;
  }
  function u(w, v = !0) {
    const C = v ? s : "";
    l(o ? C + "  ".repeat(w) : C);
  }
  function m(w = !0) {
    const v = ++a.indentLevel;
    w && u(v);
  }
  function p(w = !0) {
    const v = --a.indentLevel;
    w && u(v);
  }
  function S() {
    u(a.indentLevel);
  }
  return {
    context: c,
    push: l,
    indent: m,
    deindent: p,
    newline: S,
    helper: (w) => `_${w}`,
    needIndent: () => a.needIndent
  };
}
function ih(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), Mn(e, t.key), t.modifier ? (e.push(", "), Mn(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function ah(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(r());
  const s = t.items.length;
  for (let o = 0; o < s && (Mn(e, t.items[o]), o !== s - 1); o++)
    e.push(", ");
  e.deindent(r()), e.push("])");
}
function ch(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(r());
    const s = t.cases.length;
    for (let o = 0; o < s && (Mn(e, t.cases[o]), o !== s - 1); o++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function lh(e, t) {
  t.body ? Mn(e, t.body) : e.push("null");
}
function Mn(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      lh(e, t);
      break;
    case 1:
      ch(e, t);
      break;
    case 2:
      ah(e, t);
      break;
    case 6:
      ih(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "list"
        /* HelperNameMap.LIST */
      )}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
    default:
      throw Vn(Q.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: sh,
        args: [t.type]
      });
  }
}
const uh = (e, t = {}) => {
  const n = va(t.mode) ? t.mode : "normal", r = va(t.filename) ? t.filename : "message.intl", s = !!t.sourceMap, o = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, i = t.needIndent ? t.needIndent : n !== "arrow", a = e.helpers || [], c = oh(e, {
    mode: n,
    filename: r,
    sourceMap: s,
    breakLineCode: o,
    needIndent: i
  });
  c.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), c.indent(i), a.length > 0 && (c.push(`const { ${su(a.map((m) => `${m}: _${m}`), ", ")} } = ctx`), c.newline()), c.push("return "), Mn(c, e), c.deindent(i), c.push("}"), delete e.helpers;
  const { code: l, map: u } = c.context();
  return {
    ast: e,
    code: l,
    map: u ? u.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function fh(e, t = {}) {
  const n = ru({}, t), r = !!n.jit, s = !!n.minify, o = n.optimize == null ? !0 : n.optimize, a = Zp(n).parse(e);
  return r ? (o && nh(a), s && Rn(a), { ast: a, code: "" }) : (th(a, n), uh(a, n));
}
var dh = { GJS_DEBUG_TOPICS: "JS ERROR;JS LOG", LESSOPEN: "| /usr/bin/lesspipe %s", USER: "quentin", npm_config_user_agent: "yarn/4.3.1 npm/? node/v20.15.1 linux x64", GIO_MODULE_DIR: "/home/quentin/snap/code/common/.cache/gio-modules", XDG_SESSION_TYPE: "wayland", GIT_ASKPASS: "/snap/code/164/usr/share/code/resources/app/extensions/git/dist/askpass.sh", GTK_EXE_PREFIX_VSCODE_SNAP_ORIG: "", npm_node_execpath: "/tmp/xfs-4684104e/node", GDK_BACKEND_VSCODE_SNAP_ORIG: "", SHLVL: "1", HOME: "/home/quentin", CHROME_DESKTOP: "code-url-handler.desktop", LOCPATH_VSCODE_SNAP_ORIG: "", OLDPWD: "/home/quentin/git/recia-webcomponents", TERM_PROGRAM_VERSION: "1.91.1", DESKTOP_SESSION: "ubuntu", GTK_PATH: "", NVM_BIN: "/home/quentin/.nvm/versions/node/v20.15.1/bin", npm_package_json: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables/package.json", NVM_INC: "/home/quentin/.nvm/versions/node/v20.15.1/include/node", GTK_IM_MODULE_FILE: "/home/quentin/snap/code/common/.cache/immodules/immodules.cache", GIO_LAUNCHED_DESKTOP_FILE: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SHELL_SESSION_MODE: "ubuntu", GRADLE_HOME: "/home/quentin/.sdkman/candidates/gradle/current", GTK_MODULES: "gail:atk-bridge", GSETTINGS_SCHEMA_DIR_VSCODE_SNAP_ORIG: "", VSCODE_GIT_ASKPASS_MAIN: "/snap/code/164/usr/share/code/resources/app/extensions/git/dist/askpass-main.js", VSCODE_GIT_ASKPASS_NODE: "/snap/code/164/usr/share/code/code", MANAGERPID: "3711", SYSTEMD_EXEC_PID: "3889", IM_CONFIG_CHECK_ENV: "1", DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus", COLORTERM: "truecolor", LIBVIRT_DEFAULT_URI: "qemu:///system", GIO_LAUNCHED_DESKTOP_FILE_PID: "16499", NVM_DIR: "/home/quentin/.nvm", IM_CONFIG_PHASE: "1", WAYLAND_DISPLAY: "wayland-0", LOGNAME: "quentin", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", JOURNAL_STREAM: "8:53255", _: "/home/quentin/.nvm/versions/node/v20.15.1/bin/yarn", XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: "/etc/xdg/xdg-ubuntu:/etc/xdg", XDG_SESSION_CLASS: "user", XDG_DATA_DIRS_VSCODE_SNAP_ORIG: "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", USERNAME: "quentin", TERM: "xterm-256color", GNOME_DESKTOP_SESSION_ID: "this-is-deprecated", PATH: "/tmp/xfs-4684104e:/home/quentin/.local/bin:/home/quentin/.nvm/versions/node/v20.15.1/bin:/home/quentin/.sdkman/candidates/java/current/bin:/home/quentin/.sdkman/candidates/gradle/current/bin:/home/quentin/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin:/home/quentin/.local/share/JetBrains/Toolbox/scripts:/home/quentin/.local/share/JetBrains/Toolbox/scripts", SESSION_MANAGER: "local/DELL-QGuillemin:@/tmp/.ICE-unix/3867,unix/DELL-QGuillemin:/tmp/.ICE-unix/3867", SDKMAN_CANDIDATES_DIR: "/home/quentin/.sdkman/candidates", GTK_EXE_PREFIX: "/snap/code/164/usr", INVOCATION_ID: "37d65aa77adf4de6bee60e9a158053dc", npm_package_name: "@gip-recia/ui-ressources-gar", XDG_MENU_PREFIX: "gnome-", BAMF_DESKTOP_FILE_HINT: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SETUP_DISPLAY: ":1", XDG_RUNTIME_DIR: "/run/user/1000", GDK_BACKEND: "x11", DISPLAY: ":0", LOCPATH: "/snap/code/164/usr/lib/locale", LANG: "fr_FR.UTF-8", XDG_CURRENT_DESKTOP: "Unity", GIO_MODULE_DIR_VSCODE_SNAP_ORIG: "", XMODIFIERS: "@im=ibus", XDG_SESSION_DESKTOP: "ubuntu", XAUTHORITY: "/run/user/1000/.mutter-Xwaylandauth.C9O3Q2", LS_COLORS: "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:", VSCODE_GIT_IPC_HANDLE: "/run/user/1000/vscode-git-0200aebe89.sock", SDKMAN_DIR: "/home/quentin/.sdkman", SDKMAN_PLATFORM: "linuxx64", TERM_PROGRAM: "vscode", SSH_AGENT_LAUNCHER: "gnome-keyring", SSH_AUTH_SOCK: "/run/user/1000/keyring/ssh", GSETTINGS_SCHEMA_DIR: "/home/quentin/snap/code/164/.local/share/glib-2.0/schemas", ORIGINAL_XDG_CURRENT_DESKTOP: "ubuntu:GNOME", PROJECT_CWD: "/home/quentin/git/recia-webcomponents", SHELL: "/bin/bash", npm_package_version: "3.0.0", npm_lifecycle_event: "build", QT_ACCESSIBILITY: "1", GDMSESSION: "ubuntu", LESSCLOSE: "/usr/bin/lesspipe %s %s", GTK_PATH_VSCODE_SNAP_ORIG: "", GTK_IM_MODULE_FILE_VSCODE_SNAP_ORIG: "", GJS_DEBUG_OUTPUT: "stderr", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", QT_IM_MODULE: "ibus", JAVA_HOME: "/home/quentin/.sdkman/candidates/java/current", GPG_TTY: "/dev/pts/0", PWD: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables", BERRY_BIN_FOLDER: "/tmp/xfs-4684104e", npm_execpath: "/tmp/xfs-4684104e/yarn", XDG_CONFIG_DIRS: "/etc/xdg/xdg-ubuntu:/etc/xdg", NVM_CD_FLAGS: "", XDG_DATA_DIRS: "/home/quentin/snap/code/164/.local/share:/home/quentin/snap/code/164:/snap/code/164/usr/share:/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", INIT_CWD: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables", NODE_ENV: "production", VITE_BASE_URI: "/", VITE_BASE_API_URL: "/quentin", VITE_RESSOURCES_DIFFUSABLES_API_URI: "/api/ressources-diffusables", VITE_RESSOURCES_DIFFUSABLES_SIZE_API_URI: "/api/ressources-diffusables/size", VITE_USER_INFO_API_URI: "/portail/api/v5-1/userinfo?claims=private&groups=" };
function mh() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (di().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const on = [];
on[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
on[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
on[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
on[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
on[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
on[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
on[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const ph = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function hh(e) {
  return ph.test(e);
}
function _h(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function gh(e) {
  if (e == null)
    return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function bh(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : hh(t) ? _h(t) : "*" + t;
}
function Eh(e) {
  const t = [];
  let n = -1, r = 0, s = 0, o, i, a, c, l, u, m;
  const p = [];
  p[
    0
    /* Actions.APPEND */
  ] = () => {
    i === void 0 ? i = a : i += a;
  }, p[
    1
    /* Actions.PUSH */
  ] = () => {
    i !== void 0 && (t.push(i), i = void 0);
  }, p[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    p[
      0
      /* Actions.APPEND */
    ](), s++;
  }, p[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (s > 0)
      s--, r = 4, p[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (s = 0, i === void 0 || (i = bh(i), i === !1))
        return !1;
      p[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function S() {
    const I = e[n + 1];
    if (r === 5 && I === "'" || r === 6 && I === '"')
      return n++, a = "\\" + I, p[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; r !== null; )
    if (n++, o = e[n], !(o === "\\" && S())) {
      if (c = gh(o), m = on[r], l = m[c] || m.l || 8, l === 8 || (r = l[0], l[1] !== void 0 && (u = p[l[1]], u && (a = o, u() === !1))))
        return;
      if (r === 7)
        return t;
    }
}
const Na = /* @__PURE__ */ new Map();
function Sh(e, t) {
  return fe(e) ? e[t] : null;
}
function yh(e, t) {
  if (!fe(e))
    return null;
  let n = Na.get(t);
  if (n || (n = Eh(t), n && Na.set(t, n)), !n)
    return null;
  const r = n.length;
  let s = e, o = 0;
  for (; o < r; ) {
    const i = s[n[o]];
    if (i === void 0 || Te(s))
      return null;
    s = i, o++;
  }
  return s;
}
const Oh = (e) => e, vh = (e) => "", Ih = "text", Ah = (e) => e.length === 0 ? "" : xp(e), Th = wp;
function Ra(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Nh(e) {
  const t = we(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (we(e.named.count) || we(e.named.n)) ? we(e.named.count) ? e.named.count : we(e.named.n) ? e.named.n : t : t;
}
function Rh(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Ch(e = {}) {
  const t = e.locale, n = Nh(e), r = fe(e.pluralRules) && z(t) && Te(e.pluralRules[t]) ? e.pluralRules[t] : Ra, s = fe(e.pluralRules) && z(t) && Te(e.pluralRules[t]) ? Ra : void 0, o = (v) => v[r(n, v.length, s)], i = e.list || [], a = (v) => i[v], c = e.named || {};
  we(e.pluralIndex) && Rh(n, c);
  const l = (v) => c[v];
  function u(v) {
    const C = Te(e.messages) ? e.messages(v) : fe(e.messages) ? e.messages[v] : !1;
    return C || (e.parent ? e.parent.message(v) : vh);
  }
  const m = (v) => e.modifiers ? e.modifiers[v] : Oh, p = ie(e.processor) && Te(e.processor.normalize) ? e.processor.normalize : Ah, S = ie(e.processor) && Te(e.processor.interpolate) ? e.processor.interpolate : Th, I = ie(e.processor) && z(e.processor.type) ? e.processor.type : Ih, w = {
    list: a,
    named: l,
    plural: o,
    linked: (v, ...C) => {
      const [g, O] = C;
      let L = "text", y = "";
      C.length === 1 ? fe(g) ? (y = g.modifier || y, L = g.type || L) : z(g) && (y = g || y) : C.length === 2 && (z(g) && (y = g || y), z(O) && (L = O || L));
      const P = u(v)(w), V = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        L === "vnode" && Le(P) && y ? P[0] : P
      );
      return y ? m(y)(V, L) : V;
    },
    message: u,
    type: I,
    interpolate: S,
    normalize: p,
    values: Ge({}, i, c)
  };
  return w;
}
let fr = null;
function Dh(e) {
  fr = e;
}
function Lh(e, t, n) {
  fr && fr.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const Ph = /* @__PURE__ */ wh(
  "function:translate"
  /* IntlifyDevToolsHooks.FunctionTranslate */
);
function wh(e) {
  return (t) => fr && fr.emit(e, t);
}
const ou = mi.__EXTEND_POINT__, ln = bs(ou), xh = {
  NOT_FOUND_KEY: ou,
  // 2
  FALLBACK_TO_TRANSLATE: ln(),
  // 3
  CANNOT_FORMAT_NUMBER: ln(),
  // 4
  FALLBACK_TO_NUMBER_FORMAT: ln(),
  // 5
  CANNOT_FORMAT_DATE: ln(),
  // 6
  FALLBACK_TO_DATE_FORMAT: ln(),
  // 7
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: ln(),
  // 8
  __EXTEND_POINT__: ln()
  // 9
}, iu = Q.__EXTEND_POINT__, un = bs(iu), vt = {
  INVALID_ARGUMENT: iu,
  // 17
  INVALID_DATE_ARGUMENT: un(),
  // 18
  INVALID_ISO_DATE_ARGUMENT: un(),
  // 19
  NOT_SUPPORT_NON_STRING_MESSAGE: un(),
  // 20
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: un(),
  // 21
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: un(),
  // 22
  NOT_SUPPORT_LOCALE_TYPE: un(),
  // 23
  __EXTEND_POINT__: un()
  // 24
};
function wt(e) {
  return Vn(e, null, void 0);
}
function hi(e, t) {
  return t.locale != null ? Ca(t.locale) : Ca(e.locale);
}
let js;
function Ca(e) {
  if (z(e))
    return e;
  if (Te(e)) {
    if (e.resolvedOnce && js != null)
      return js;
    if (e.constructor.name === "Function") {
      const t = e();
      if (Pp(t))
        throw wt(vt.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return js = t;
    } else
      throw wt(vt.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw wt(vt.NOT_SUPPORT_LOCALE_TYPE);
}
function kh(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Le(t) ? t : fe(t) ? Object.keys(t) : z(t) ? [t] : [n]
  ])];
}
function au(e, t, n) {
  const r = z(n) ? n : Jr, s = e;
  s.__localeChainCache || (s.__localeChainCache = /* @__PURE__ */ new Map());
  let o = s.__localeChainCache.get(r);
  if (!o) {
    o = [];
    let i = [n];
    for (; Le(i); )
      i = Da(o, i, t);
    const a = Le(t) || !ie(t) ? t : t.default ? t.default : null;
    i = z(a) ? [a] : a, Le(i) && Da(o, i, !1), s.__localeChainCache.set(r, o);
  }
  return o;
}
function Da(e, t, n) {
  let r = !0;
  for (let s = 0; s < t.length && ye(r); s++) {
    const o = t[s];
    z(o) && (r = Mh(e, t[s], n));
  }
  return r;
}
function Mh(e, t, n) {
  let r;
  const s = t.split("-");
  do {
    const o = s.join("-");
    r = Fh(e, o, n), s.splice(-1, 1);
  } while (s.length && r === !0);
  return r;
}
function Fh(e, t, n) {
  let r = !1;
  if (!e.includes(t) && (r = !0, t)) {
    r = t[t.length - 1] !== "!";
    const s = t.replace(/!/g, "");
    e.push(s), (Le(n) || ie(n)) && n[s] && (r = n[s]);
  }
  return r;
}
const Uh = "9.13.1", Es = -1, Jr = "en-US", La = "", Pa = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Gh() {
  return {
    upper: (e, t) => t === "text" && z(e) ? e.toUpperCase() : t === "vnode" && fe(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && z(e) ? e.toLowerCase() : t === "vnode" && fe(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && z(e) ? Pa(e) : t === "vnode" && fe(e) && "__v_isVNode" in e ? Pa(e.children) : e
  };
}
let cu;
function jh(e) {
  cu = e;
}
let lu;
function Vh(e) {
  lu = e;
}
let uu;
function Hh(e) {
  uu = e;
}
let fu = null;
const $h = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  fu = e;
}, Bh = /* @__NO_SIDE_EFFECTS__ */ () => fu;
let du = null;
const wa = (e) => {
  du = e;
}, Kh = () => du;
let xa = 0;
function zh(e = {}) {
  const t = Te(e.onWarn) ? e.onWarn : kp, n = z(e.version) ? e.version : Uh, r = z(e.locale) || Te(e.locale) ? e.locale : Jr, s = Te(r) ? Jr : r, o = Le(e.fallbackLocale) || ie(e.fallbackLocale) || z(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : s, i = ie(e.messages) ? e.messages : { [s]: {} }, a = ie(e.datetimeFormats) ? e.datetimeFormats : { [s]: {} }, c = ie(e.numberFormats) ? e.numberFormats : { [s]: {} }, l = Ge({}, e.modifiers || {}, Gh()), u = e.pluralRules || {}, m = Te(e.missing) ? e.missing : null, p = ye(e.missingWarn) || Wr(e.missingWarn) ? e.missingWarn : !0, S = ye(e.fallbackWarn) || Wr(e.fallbackWarn) ? e.fallbackWarn : !0, I = !!e.fallbackFormat, A = !!e.unresolving, w = Te(e.postTranslation) ? e.postTranslation : null, v = ie(e.processor) ? e.processor : null, C = ye(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, g = !!e.escapeParameter, O = Te(e.messageCompiler) ? e.messageCompiler : cu, L = Te(e.messageResolver) ? e.messageResolver : lu || Sh, y = Te(e.localeFallbacker) ? e.localeFallbacker : uu || kh, P = fe(e.fallbackContext) ? e.fallbackContext : void 0, V = e, $ = fe(V.__datetimeFormatters) ? V.__datetimeFormatters : /* @__PURE__ */ new Map(), de = fe(V.__numberFormatters) ? V.__numberFormatters : /* @__PURE__ */ new Map(), Oe = fe(V.__meta) ? V.__meta : {};
  xa++;
  const re = {
    version: n,
    cid: xa,
    locale: r,
    fallbackLocale: o,
    messages: i,
    modifiers: l,
    pluralRules: u,
    missing: m,
    missingWarn: p,
    fallbackWarn: S,
    fallbackFormat: I,
    unresolving: A,
    postTranslation: w,
    processor: v,
    warnHtmlMessage: C,
    escapeParameter: g,
    messageCompiler: O,
    messageResolver: L,
    localeFallbacker: y,
    fallbackContext: P,
    onWarn: t,
    __meta: Oe
  };
  return re.datetimeFormats = a, re.numberFormats = c, re.__datetimeFormatters = $, re.__numberFormatters = de, __INTLIFY_PROD_DEVTOOLS__ && Lh(re, n, Oe), re;
}
function _i(e, t, n, r, s) {
  const { missing: o, onWarn: i } = e;
  if (o !== null) {
    const a = o(e, n, t, s);
    return z(a) ? a : t;
  } else
    return t;
}
function qn(e, t, n) {
  const r = e;
  r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function qh(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function Wh(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let r = n + 1; r < t.length; r++)
    if (qh(e, t[r]))
      return !0;
  return !1;
}
function Vs(e) {
  return (n) => Xh(n, e);
}
function Xh(e, t) {
  const n = t.b || t.body;
  if ((n.t || n.type) === 1) {
    const r = n, s = r.c || r.cases;
    return e.plural(s.reduce((o, i) => [
      ...o,
      ka(e, i)
    ], []));
  } else
    return ka(e, n);
}
function ka(e, t) {
  const n = t.s || t.static;
  if (n)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const r = (t.i || t.items).reduce((s, o) => [...s, po(e, o)], []);
    return e.normalize(r);
  }
}
function po(e, t) {
  const n = t.t || t.type;
  switch (n) {
    case 3: {
      const r = t;
      return r.v || r.value;
    }
    case 9: {
      const r = t;
      return r.v || r.value;
    }
    case 4: {
      const r = t;
      return e.interpolate(e.named(r.k || r.key));
    }
    case 5: {
      const r = t;
      return e.interpolate(e.list(r.i != null ? r.i : r.index));
    }
    case 6: {
      const r = t, s = r.m || r.modifier;
      return e.linked(po(e, r.k || r.key), s ? po(e, s) : void 0, e.type);
    }
    case 7: {
      const r = t;
      return r.v || r.value;
    }
    case 8: {
      const r = t;
      return r.v || r.value;
    }
    default:
      throw new Error(`unhandled node type on format message part: ${n}`);
  }
}
const Yh = (e) => e;
let Pr = /* @__PURE__ */ Object.create(null);
const Fn = (e) => fe(e) && (e.t === 0 || e.type === 0) && ("b" in e || "body" in e);
function Jh(e, t = {}) {
  let n = !1;
  const r = t.onError || Hp;
  return t.onError = (s) => {
    n = !0, r(s);
  }, { ...fh(e, t), detectError: n };
}
function Qh(e, t) {
  if (z(e)) {
    ye(t.warnHtmlMessage) && t.warnHtmlMessage;
    const r = (t.onCacheKey || Yh)(e), s = Pr[r];
    if (s)
      return s;
    const { ast: o, detectError: i } = Jh(e, {
      ...t,
      location: dh.NODE_ENV !== "production",
      jit: !0
    }), a = Vs(o);
    return i ? a : Pr[r] = a;
  } else {
    const n = e.cacheKey;
    if (n) {
      const r = Pr[n];
      return r || (Pr[n] = Vs(e));
    } else
      return Vs(e);
  }
}
const Ma = () => "", it = (e) => Te(e);
function Fa(e, ...t) {
  const { fallbackFormat: n, postTranslation: r, unresolving: s, messageCompiler: o, fallbackLocale: i, messages: a } = e, [c, l] = ho(...t), u = ye(l.missingWarn) ? l.missingWarn : e.missingWarn, m = ye(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn, p = ye(l.escapeParameter) ? l.escapeParameter : e.escapeParameter, S = !!l.resolvedMessage, I = z(l.default) || ye(l.default) ? ye(l.default) ? o ? c : () => c : l.default : n ? o ? c : () => c : "", A = n || I !== "", w = hi(e, l);
  p && Zh(l);
  let [v, C, g] = S ? [
    c,
    w,
    a[w] || {}
  ] : mu(e, c, w, i, m, u), O = v, L = c;
  if (!S && !(z(O) || Fn(O) || it(O)) && A && (O = I, L = O), !S && (!(z(O) || Fn(O) || it(O)) || !z(C)))
    return s ? Es : c;
  let y = !1;
  const P = () => {
    y = !0;
  }, V = it(O) ? O : pu(e, c, C, O, L, P);
  if (y)
    return O;
  const $ = n_(e, C, g, l), de = Ch($), Oe = e_(e, V, de), re = r ? r(Oe, c) : Oe;
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const ve = {
      timestamp: Date.now(),
      key: z(c) ? c : it(O) ? O.key : "",
      locale: C || (it(O) ? O.locale : ""),
      format: z(O) ? O : it(O) ? O.source : "",
      message: re
    };
    ve.meta = Ge({}, e.__meta, /* @__PURE__ */ Bh() || {}), Ph(ve);
  }
  return re;
}
function Zh(e) {
  Le(e.list) ? e.list = e.list.map((t) => z(t) ? Oa(t) : t) : fe(e.named) && Object.keys(e.named).forEach((t) => {
    z(e.named[t]) && (e.named[t] = Oa(e.named[t]));
  });
}
function mu(e, t, n, r, s, o) {
  const { messages: i, onWarn: a, messageResolver: c, localeFallbacker: l } = e, u = l(e, r, n);
  let m = {}, p, S = null;
  const I = "translate";
  for (let A = 0; A < u.length && (p = u[A], m = i[p] || {}, (S = c(m, t)) === null && (S = m[t]), !(z(S) || Fn(S) || it(S))); A++)
    if (!Wh(p, u)) {
      const w = _i(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        p,
        o,
        I
      );
      w !== t && (S = w);
    }
  return [S, p, m];
}
function pu(e, t, n, r, s, o) {
  const { messageCompiler: i, warnHtmlMessage: a } = e;
  if (it(r)) {
    const l = r;
    return l.locale = l.locale || n, l.key = l.key || t, l;
  }
  if (i == null) {
    const l = () => r;
    return l.locale = n, l.key = t, l;
  }
  const c = i(r, t_(e, n, s, r, a, o));
  return c.locale = n, c.key = t, c.source = r, c;
}
function e_(e, t, n) {
  return t(n);
}
function ho(...e) {
  const [t, n, r] = e, s = {};
  if (!z(t) && !we(t) && !it(t) && !Fn(t))
    throw wt(vt.INVALID_ARGUMENT);
  const o = we(t) ? String(t) : (it(t), t);
  return we(n) ? s.plural = n : z(n) ? s.default = n : ie(n) && !gs(n) ? s.named = n : Le(n) && (s.list = n), we(r) ? s.plural = r : z(r) ? s.default = r : ie(r) && Ge(s, r), [o, s];
}
function t_(e, t, n, r, s, o) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: s,
    onError: (i) => {
      throw o && o(i), i;
    },
    onCacheKey: (i) => Rp(t, n, i)
  };
}
function n_(e, t, n, r) {
  const { modifiers: s, pluralRules: o, messageResolver: i, fallbackLocale: a, fallbackWarn: c, missingWarn: l, fallbackContext: u } = e, p = {
    locale: t,
    modifiers: s,
    pluralRules: o,
    messages: (S) => {
      let I = i(n, S);
      if (I == null && u) {
        const [, , A] = mu(u, S, t, a, c, l);
        I = i(A, S);
      }
      if (z(I) || Fn(I)) {
        let A = !1;
        const v = pu(e, S, t, I, S, () => {
          A = !0;
        });
        return A ? Ma : v;
      } else return it(I) ? I : Ma;
    }
  };
  return e.processor && (p.processor = e.processor), r.list && (p.list = r.list), r.named && (p.named = r.named), we(r.plural) && (p.pluralIndex = r.plural), p;
}
function Ua(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: s, onWarn: o, localeFallbacker: i } = e, { __datetimeFormatters: a } = e, [c, l, u, m] = _o(...t), p = ye(u.missingWarn) ? u.missingWarn : e.missingWarn;
  ye(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn;
  const S = !!u.part, I = hi(e, u), A = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    s,
    I
  );
  if (!z(c) || c === "")
    return new Intl.DateTimeFormat(I, m).format(l);
  let w = {}, v, C = null;
  const g = "datetime format";
  for (let y = 0; y < A.length && (v = A[y], w = n[v] || {}, C = w[c], !ie(C)); y++)
    _i(e, c, v, p, g);
  if (!ie(C) || !z(v))
    return r ? Es : c;
  let O = `${v}__${c}`;
  gs(m) || (O = `${O}__${JSON.stringify(m)}`);
  let L = a.get(O);
  return L || (L = new Intl.DateTimeFormat(v, Ge({}, C, m)), a.set(O, L)), S ? L.formatToParts(l) : L.format(l);
}
const hu = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function _o(...e) {
  const [t, n, r, s] = e, o = {};
  let i = {}, a;
  if (z(t)) {
    const c = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!c)
      throw wt(vt.INVALID_ISO_DATE_ARGUMENT);
    const l = c[3] ? c[3].trim().startsWith("T") ? `${c[1].trim()}${c[3].trim()}` : `${c[1].trim()}T${c[3].trim()}` : c[1].trim();
    a = new Date(l);
    try {
      a.toISOString();
    } catch {
      throw wt(vt.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (Dp(t)) {
    if (isNaN(t.getTime()))
      throw wt(vt.INVALID_DATE_ARGUMENT);
    a = t;
  } else if (we(t))
    a = t;
  else
    throw wt(vt.INVALID_ARGUMENT);
  return z(n) ? o.key = n : ie(n) && Object.keys(n).forEach((c) => {
    hu.includes(c) ? i[c] = n[c] : o[c] = n[c];
  }), z(r) ? o.locale = r : ie(r) && (i = r), ie(s) && (i = s), [o.key || "", a, o, i];
}
function Ga(e, t, n) {
  const r = e;
  for (const s in n) {
    const o = `${t}__${s}`;
    r.__datetimeFormatters.has(o) && r.__datetimeFormatters.delete(o);
  }
}
function ja(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: s, onWarn: o, localeFallbacker: i } = e, { __numberFormatters: a } = e, [c, l, u, m] = go(...t), p = ye(u.missingWarn) ? u.missingWarn : e.missingWarn;
  ye(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn;
  const S = !!u.part, I = hi(e, u), A = i(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    s,
    I
  );
  if (!z(c) || c === "")
    return new Intl.NumberFormat(I, m).format(l);
  let w = {}, v, C = null;
  const g = "number format";
  for (let y = 0; y < A.length && (v = A[y], w = n[v] || {}, C = w[c], !ie(C)); y++)
    _i(e, c, v, p, g);
  if (!ie(C) || !z(v))
    return r ? Es : c;
  let O = `${v}__${c}`;
  gs(m) || (O = `${O}__${JSON.stringify(m)}`);
  let L = a.get(O);
  return L || (L = new Intl.NumberFormat(v, Ge({}, C, m)), a.set(O, L)), S ? L.formatToParts(l) : L.format(l);
}
const _u = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function go(...e) {
  const [t, n, r, s] = e, o = {};
  let i = {};
  if (!we(t))
    throw wt(vt.INVALID_ARGUMENT);
  const a = t;
  return z(n) ? o.key = n : ie(n) && Object.keys(n).forEach((c) => {
    _u.includes(c) ? i[c] = n[c] : o[c] = n[c];
  }), z(r) ? o.locale = r : ie(r) && (i = r), ie(s) && (i = s), [o.key || "", a, o, i];
}
function Va(e, t, n) {
  const r = e;
  for (const s in n) {
    const o = `${t}__${s}`;
    r.__numberFormatters.has(o) && r.__numberFormatters.delete(o);
  }
}
mh();
var r_ = { GJS_DEBUG_TOPICS: "JS ERROR;JS LOG", LESSOPEN: "| /usr/bin/lesspipe %s", USER: "quentin", npm_config_user_agent: "yarn/4.3.1 npm/? node/v20.15.1 linux x64", GIO_MODULE_DIR: "/home/quentin/snap/code/common/.cache/gio-modules", XDG_SESSION_TYPE: "wayland", GIT_ASKPASS: "/snap/code/164/usr/share/code/resources/app/extensions/git/dist/askpass.sh", GTK_EXE_PREFIX_VSCODE_SNAP_ORIG: "", npm_node_execpath: "/tmp/xfs-4684104e/node", GDK_BACKEND_VSCODE_SNAP_ORIG: "", SHLVL: "1", HOME: "/home/quentin", CHROME_DESKTOP: "code-url-handler.desktop", LOCPATH_VSCODE_SNAP_ORIG: "", OLDPWD: "/home/quentin/git/recia-webcomponents", TERM_PROGRAM_VERSION: "1.91.1", DESKTOP_SESSION: "ubuntu", GTK_PATH: "", NVM_BIN: "/home/quentin/.nvm/versions/node/v20.15.1/bin", npm_package_json: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables/package.json", NVM_INC: "/home/quentin/.nvm/versions/node/v20.15.1/include/node", GTK_IM_MODULE_FILE: "/home/quentin/snap/code/common/.cache/immodules/immodules.cache", GIO_LAUNCHED_DESKTOP_FILE: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SHELL_SESSION_MODE: "ubuntu", GRADLE_HOME: "/home/quentin/.sdkman/candidates/gradle/current", GTK_MODULES: "gail:atk-bridge", GSETTINGS_SCHEMA_DIR_VSCODE_SNAP_ORIG: "", VSCODE_GIT_ASKPASS_MAIN: "/snap/code/164/usr/share/code/resources/app/extensions/git/dist/askpass-main.js", VSCODE_GIT_ASKPASS_NODE: "/snap/code/164/usr/share/code/code", MANAGERPID: "3711", SYSTEMD_EXEC_PID: "3889", IM_CONFIG_CHECK_ENV: "1", DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus", COLORTERM: "truecolor", LIBVIRT_DEFAULT_URI: "qemu:///system", GIO_LAUNCHED_DESKTOP_FILE_PID: "16499", NVM_DIR: "/home/quentin/.nvm", IM_CONFIG_PHASE: "1", WAYLAND_DISPLAY: "wayland-0", LOGNAME: "quentin", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", JOURNAL_STREAM: "8:53255", _: "/home/quentin/.nvm/versions/node/v20.15.1/bin/yarn", XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: "/etc/xdg/xdg-ubuntu:/etc/xdg", XDG_SESSION_CLASS: "user", XDG_DATA_DIRS_VSCODE_SNAP_ORIG: "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", USERNAME: "quentin", TERM: "xterm-256color", GNOME_DESKTOP_SESSION_ID: "this-is-deprecated", PATH: "/tmp/xfs-4684104e:/home/quentin/.local/bin:/home/quentin/.nvm/versions/node/v20.15.1/bin:/home/quentin/.sdkman/candidates/java/current/bin:/home/quentin/.sdkman/candidates/gradle/current/bin:/home/quentin/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin:/home/quentin/.local/share/JetBrains/Toolbox/scripts:/home/quentin/.local/share/JetBrains/Toolbox/scripts", SESSION_MANAGER: "local/DELL-QGuillemin:@/tmp/.ICE-unix/3867,unix/DELL-QGuillemin:/tmp/.ICE-unix/3867", SDKMAN_CANDIDATES_DIR: "/home/quentin/.sdkman/candidates", GTK_EXE_PREFIX: "/snap/code/164/usr", INVOCATION_ID: "37d65aa77adf4de6bee60e9a158053dc", npm_package_name: "@gip-recia/ui-ressources-gar", XDG_MENU_PREFIX: "gnome-", BAMF_DESKTOP_FILE_HINT: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SETUP_DISPLAY: ":1", XDG_RUNTIME_DIR: "/run/user/1000", GDK_BACKEND: "x11", DISPLAY: ":0", LOCPATH: "/snap/code/164/usr/lib/locale", LANG: "fr_FR.UTF-8", XDG_CURRENT_DESKTOP: "Unity", GIO_MODULE_DIR_VSCODE_SNAP_ORIG: "", XMODIFIERS: "@im=ibus", XDG_SESSION_DESKTOP: "ubuntu", XAUTHORITY: "/run/user/1000/.mutter-Xwaylandauth.C9O3Q2", LS_COLORS: "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:", VSCODE_GIT_IPC_HANDLE: "/run/user/1000/vscode-git-0200aebe89.sock", SDKMAN_DIR: "/home/quentin/.sdkman", SDKMAN_PLATFORM: "linuxx64", TERM_PROGRAM: "vscode", SSH_AGENT_LAUNCHER: "gnome-keyring", SSH_AUTH_SOCK: "/run/user/1000/keyring/ssh", GSETTINGS_SCHEMA_DIR: "/home/quentin/snap/code/164/.local/share/glib-2.0/schemas", ORIGINAL_XDG_CURRENT_DESKTOP: "ubuntu:GNOME", PROJECT_CWD: "/home/quentin/git/recia-webcomponents", SHELL: "/bin/bash", npm_package_version: "3.0.0", npm_lifecycle_event: "build", QT_ACCESSIBILITY: "1", GDMSESSION: "ubuntu", LESSCLOSE: "/usr/bin/lesspipe %s %s", GTK_PATH_VSCODE_SNAP_ORIG: "", GTK_IM_MODULE_FILE_VSCODE_SNAP_ORIG: "", GJS_DEBUG_OUTPUT: "stderr", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", QT_IM_MODULE: "ibus", JAVA_HOME: "/home/quentin/.sdkman/candidates/java/current", GPG_TTY: "/dev/pts/0", PWD: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables", BERRY_BIN_FOLDER: "/tmp/xfs-4684104e", npm_execpath: "/tmp/xfs-4684104e/yarn", XDG_CONFIG_DIRS: "/etc/xdg/xdg-ubuntu:/etc/xdg", NVM_CD_FLAGS: "", XDG_DATA_DIRS: "/home/quentin/snap/code/164/.local/share:/home/quentin/snap/code/164:/snap/code/164/usr/share:/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", INIT_CWD: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables", NODE_ENV: "production", VITE_BASE_URI: "/", VITE_BASE_API_URL: "/quentin", VITE_RESSOURCES_DIFFUSABLES_API_URI: "/api/ressources-diffusables", VITE_RESSOURCES_DIFFUSABLES_SIZE_API_URI: "/api/ressources-diffusables/size", VITE_USER_INFO_API_URI: "/portail/api/v5-1/userinfo?claims=private&groups=" };
const s_ = "9.13.1";
function o_() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (di().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const gu = xh.__EXTEND_POINT__, Dt = bs(gu);
Dt(), Dt(), Dt(), Dt(), Dt(), Dt(), Dt(), Dt(), Dt();
const bu = vt.__EXTEND_POINT__, Be = bs(bu), lt = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: bu,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: Be(),
  // 25
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: Be(),
  // 26
  NOT_INSTALLED: Be(),
  // 27
  NOT_AVAILABLE_IN_LEGACY_MODE: Be(),
  // 28
  // directive module errors
  REQUIRED_VALUE: Be(),
  // 29
  INVALID_VALUE: Be(),
  // 30
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: Be(),
  // 31
  NOT_INSTALLED_WITH_PROVIDE: Be(),
  // 32
  // unexpected error
  UNEXPECTED_ERROR: Be(),
  // 33
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: Be(),
  // 34
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: Be(),
  // 35
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: Be(),
  // 36
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: Be(),
  // 37
  // for enhancement
  __EXTEND_POINT__: Be()
  // 38
};
function pt(e, ...t) {
  return Vn(e, null, void 0);
}
const bo = /* @__PURE__ */ sn("__translateVNode"), Eo = /* @__PURE__ */ sn("__datetimeParts"), So = /* @__PURE__ */ sn("__numberParts"), i_ = sn("__setPluralRules"), a_ = /* @__PURE__ */ sn("__injectWithOption"), yo = /* @__PURE__ */ sn("__dispose");
function dr(e) {
  if (!fe(e))
    return e;
  for (const t in e)
    if (Xr(e, t))
      if (!t.includes("."))
        fe(e[t]) && dr(e[t]);
      else {
        const n = t.split("."), r = n.length - 1;
        let s = e, o = !1;
        for (let i = 0; i < r; i++) {
          if (n[i] in s || (s[n[i]] = {}), !fe(s[n[i]])) {
            o = !0;
            break;
          }
          s = s[n[i]];
        }
        o || (s[n[r]] = e[t], delete e[t]), fe(s[n[r]]) && dr(s[n[r]]);
      }
  return e;
}
function Eu(e, t) {
  const { messages: n, __i18n: r, messageResolver: s, flatJson: o } = t, i = ie(n) ? n : Le(r) ? {} : { [e]: {} };
  if (Le(r) && r.forEach((a) => {
    if ("locale" in a && "resource" in a) {
      const { locale: c, resource: l } = a;
      c ? (i[c] = i[c] || {}, Gr(l, i[c])) : Gr(l, i);
    } else
      z(a) && Gr(JSON.parse(a), i);
  }), s == null && o)
    for (const a in i)
      Xr(i, a) && dr(i[a]);
  return i;
}
function Su(e) {
  return e.type;
}
function c_(e, t, n) {
  let r = fe(t.messages) ? t.messages : {};
  "__i18nGlobal" in n && (r = Eu(e.locale.value, {
    messages: r,
    __i18n: n.__i18nGlobal
  }));
  const s = Object.keys(r);
  s.length && s.forEach((o) => {
    e.mergeLocaleMessage(o, r[o]);
  });
  {
    if (fe(t.datetimeFormats)) {
      const o = Object.keys(t.datetimeFormats);
      o.length && o.forEach((i) => {
        e.mergeDateTimeFormat(i, t.datetimeFormats[i]);
      });
    }
    if (fe(t.numberFormats)) {
      const o = Object.keys(t.numberFormats);
      o.length && o.forEach((i) => {
        e.mergeNumberFormat(i, t.numberFormats[i]);
      });
    }
  }
}
function Ha(e) {
  return Ue(_r, null, e, 0);
}
const $a = "__INTLIFY_META__", Ba = () => [], l_ = () => !1;
let Ka = 0;
function za(e) {
  return (t, n, r, s) => e(n, r, li() || void 0, s);
}
const u_ = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = li();
  let t = null;
  return e && (t = Su(e)[$a]) ? { [$a]: t } : null;
};
function yu(e = {}, t) {
  const { __root: n, __injectWithOption: r } = e, s = n === void 0, o = e.flatJson, i = qr ? st : _d, a = !!e.translateExistCompatible;
  let c = ye(e.inheritLocale) ? e.inheritLocale : !0;
  const l = i(
    // prettier-ignore
    n && c ? n.locale.value : z(e.locale) ? e.locale : Jr
  ), u = i(
    // prettier-ignore
    n && c ? n.fallbackLocale.value : z(e.fallbackLocale) || Le(e.fallbackLocale) || ie(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : l.value
  ), m = i(Eu(l.value, e)), p = i(ie(e.datetimeFormats) ? e.datetimeFormats : { [l.value]: {} }), S = i(ie(e.numberFormats) ? e.numberFormats : { [l.value]: {} });
  let I = n ? n.missingWarn : ye(e.missingWarn) || Wr(e.missingWarn) ? e.missingWarn : !0, A = n ? n.fallbackWarn : ye(e.fallbackWarn) || Wr(e.fallbackWarn) ? e.fallbackWarn : !0, w = n ? n.fallbackRoot : ye(e.fallbackRoot) ? e.fallbackRoot : !0, v = !!e.fallbackFormat, C = Te(e.missing) ? e.missing : null, g = Te(e.missing) ? za(e.missing) : null, O = Te(e.postTranslation) ? e.postTranslation : null, L = n ? n.warnHtmlMessage : ye(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, y = !!e.escapeParameter;
  const P = n ? n.modifiers : ie(e.modifiers) ? e.modifiers : {};
  let V = e.pluralRules || n && n.pluralRules, $;
  $ = (() => {
    s && wa(null);
    const E = {
      version: s_,
      locale: l.value,
      fallbackLocale: u.value,
      messages: m.value,
      modifiers: P,
      pluralRules: V,
      missing: g === null ? void 0 : g,
      missingWarn: I,
      fallbackWarn: A,
      fallbackFormat: v,
      unresolving: !0,
      postTranslation: O === null ? void 0 : O,
      warnHtmlMessage: L,
      escapeParameter: y,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    E.datetimeFormats = p.value, E.numberFormats = S.value, E.__datetimeFormatters = ie($) ? $.__datetimeFormatters : void 0, E.__numberFormatters = ie($) ? $.__numberFormatters : void 0;
    const T = zh(E);
    return s && wa(T), T;
  })(), qn($, l.value, u.value);
  function Oe() {
    return [
      l.value,
      u.value,
      m.value,
      p.value,
      S.value
    ];
  }
  const re = ot({
    get: () => l.value,
    set: (E) => {
      l.value = E, $.locale = l.value;
    }
  }), ve = ot({
    get: () => u.value,
    set: (E) => {
      u.value = E, $.fallbackLocale = u.value, qn($, l.value, E);
    }
  }), Rt = ot(() => m.value), gt = /* @__PURE__ */ ot(() => p.value), Ee = /* @__PURE__ */ ot(() => S.value);
  function ue() {
    return Te(O) ? O : null;
  }
  function ce(E) {
    O = E, $.postTranslation = E;
  }
  function U() {
    return C;
  }
  function k(E) {
    E !== null && (g = za(E)), C = E, $.missing = g;
  }
  const j = (E, T, X, Y, me, Me) => {
    Oe();
    let Xe;
    try {
      r_.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, s || ($.fallbackContext = n ? Kh() : void 0), Xe = E($);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, s || ($.fallbackContext = void 0);
    }
    if (X !== "translate exists" && // for not `te` (e.g `t`)
    we(Xe) && Xe === Es || X === "translate exists" && !Xe) {
      const [Or, Tn] = T();
      return n && w ? Y(n) : me(Or);
    } else {
      if (Me(Xe))
        return Xe;
      throw pt(lt.UNEXPECTED_RETURN_TYPE);
    }
  };
  function W(...E) {
    return j((T) => Reflect.apply(Fa, null, [T, ...E]), () => ho(...E), "translate", (T) => Reflect.apply(T.t, T, [...E]), (T) => T, (T) => z(T));
  }
  function q(...E) {
    const [T, X, Y] = E;
    if (Y && !fe(Y))
      throw pt(lt.INVALID_ARGUMENT);
    return W(T, X, Ge({ resolvedMessage: !0 }, Y || {}));
  }
  function oe(...E) {
    return j((T) => Reflect.apply(Ua, null, [T, ...E]), () => _o(...E), "datetime format", (T) => Reflect.apply(T.d, T, [...E]), () => La, (T) => z(T));
  }
  function Ce(...E) {
    return j((T) => Reflect.apply(ja, null, [T, ...E]), () => go(...E), "number format", (T) => Reflect.apply(T.n, T, [...E]), () => La, (T) => z(T));
  }
  function he(E) {
    return E.map((T) => z(T) || we(T) || ye(T) ? Ha(String(T)) : T);
  }
  const Ie = {
    normalize: he,
    interpolate: (E) => E,
    type: "vnode"
  };
  function bt(...E) {
    return j(
      (T) => {
        let X;
        const Y = T;
        try {
          Y.processor = Ie, X = Reflect.apply(Fa, null, [Y, ...E]);
        } finally {
          Y.processor = null;
        }
        return X;
      },
      () => ho(...E),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (T) => T[bo](...E),
      (T) => [Ha(T)],
      (T) => Le(T)
    );
  }
  function ke(...E) {
    return j(
      (T) => Reflect.apply(ja, null, [T, ...E]),
      () => go(...E),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (T) => T[So](...E),
      Ba,
      (T) => z(T) || Le(T)
    );
  }
  function $e(...E) {
    return j(
      (T) => Reflect.apply(Ua, null, [T, ...E]),
      () => _o(...E),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (T) => T[Eo](...E),
      Ba,
      (T) => z(T) || Le(T)
    );
  }
  function An(E) {
    V = E, $.pluralRules = V;
  }
  function h(E, T) {
    return j(() => {
      if (!E)
        return !1;
      const X = z(T) ? T : l.value, Y = M(X), me = $.messageResolver(Y, E);
      return a ? me != null : Fn(me) || it(me) || z(me);
    }, () => [E], "translate exists", (X) => Reflect.apply(X.te, X, [E, T]), l_, (X) => ye(X));
  }
  function b(E) {
    let T = null;
    const X = au($, u.value, l.value);
    for (let Y = 0; Y < X.length; Y++) {
      const me = m.value[X[Y]] || {}, Me = $.messageResolver(me, E);
      if (Me != null) {
        T = Me;
        break;
      }
    }
    return T;
  }
  function N(E) {
    const T = b(E);
    return T ?? (n ? n.tm(E) || {} : {});
  }
  function M(E) {
    return m.value[E] || {};
  }
  function x(E, T) {
    if (o) {
      const X = { [E]: T };
      for (const Y in X)
        Xr(X, Y) && dr(X[Y]);
      T = X[E];
    }
    m.value[E] = T, $.messages = m.value;
  }
  function G(E, T) {
    m.value[E] = m.value[E] || {};
    const X = { [E]: T };
    if (o)
      for (const Y in X)
        Xr(X, Y) && dr(X[Y]);
    T = X[E], Gr(T, m.value[E]), $.messages = m.value;
  }
  function B(E) {
    return p.value[E] || {};
  }
  function f(E, T) {
    p.value[E] = T, $.datetimeFormats = p.value, Ga($, E, T);
  }
  function d(E, T) {
    p.value[E] = Ge(p.value[E] || {}, T), $.datetimeFormats = p.value, Ga($, E, T);
  }
  function _(E) {
    return S.value[E] || {};
  }
  function D(E, T) {
    S.value[E] = T, $.numberFormats = S.value, Va($, E, T);
  }
  function H(E, T) {
    S.value[E] = Ge(S.value[E] || {}, T), $.numberFormats = S.value, Va($, E, T);
  }
  Ka++, n && qr && (hn(n.locale, (E) => {
    c && (l.value = E, $.locale = E, qn($, l.value, u.value));
  }), hn(n.fallbackLocale, (E) => {
    c && (u.value = E, $.fallbackLocale = E, qn($, l.value, u.value));
  }));
  const F = {
    id: Ka,
    locale: re,
    fallbackLocale: ve,
    get inheritLocale() {
      return c;
    },
    set inheritLocale(E) {
      c = E, E && n && (l.value = n.locale.value, u.value = n.fallbackLocale.value, qn($, l.value, u.value));
    },
    get availableLocales() {
      return Object.keys(m.value).sort();
    },
    messages: Rt,
    get modifiers() {
      return P;
    },
    get pluralRules() {
      return V || {};
    },
    get isGlobal() {
      return s;
    },
    get missingWarn() {
      return I;
    },
    set missingWarn(E) {
      I = E, $.missingWarn = I;
    },
    get fallbackWarn() {
      return A;
    },
    set fallbackWarn(E) {
      A = E, $.fallbackWarn = A;
    },
    get fallbackRoot() {
      return w;
    },
    set fallbackRoot(E) {
      w = E;
    },
    get fallbackFormat() {
      return v;
    },
    set fallbackFormat(E) {
      v = E, $.fallbackFormat = v;
    },
    get warnHtmlMessage() {
      return L;
    },
    set warnHtmlMessage(E) {
      L = E, $.warnHtmlMessage = E;
    },
    get escapeParameter() {
      return y;
    },
    set escapeParameter(E) {
      y = E, $.escapeParameter = E;
    },
    t: W,
    getLocaleMessage: M,
    setLocaleMessage: x,
    mergeLocaleMessage: G,
    getPostTranslationHandler: ue,
    setPostTranslationHandler: ce,
    getMissingHandler: U,
    setMissingHandler: k,
    [i_]: An
  };
  return F.datetimeFormats = gt, F.numberFormats = Ee, F.rt = q, F.te = h, F.tm = N, F.d = oe, F.n = Ce, F.getDateTimeFormat = B, F.setDateTimeFormat = f, F.mergeDateTimeFormat = d, F.getNumberFormat = _, F.setNumberFormat = D, F.mergeNumberFormat = H, F[a_] = r, F[bo] = bt, F[Eo] = $e, F[So] = ke, F;
}
const gi = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (e) => e === "parent" || e === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function f_({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r, s) => [
    ...r,
    // prettier-ignore
    ...s.type === Je ? s.children : [s]
  ], []) : t.reduce((n, r) => {
    const s = e[r];
    return s && (n[r] = s()), n;
  }, {});
}
function Ou(e) {
  return Je;
}
const d_ = /* @__PURE__ */ ht({
  /* eslint-disable */
  name: "i18n-t",
  props: Ge({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (e) => we(e) || !isNaN(e)
    }
  }, gi),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: r } = t, s = e.i18n || In({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const o = Object.keys(n).filter((m) => m !== "_"), i = {};
      e.locale && (i.locale = e.locale), e.plural !== void 0 && (i.plural = z(e.plural) ? +e.plural : e.plural);
      const a = f_(t, o), c = s[bo](e.keypath, a, i), l = Ge({}, r), u = z(e.tag) || fe(e.tag) ? e.tag : Ou();
      return ui(u, l, c);
    };
  }
}), qa = d_;
function m_(e) {
  return Le(e) && !z(e[0]);
}
function vu(e, t, n, r) {
  const { slots: s, attrs: o } = t;
  return () => {
    const i = { part: !0 };
    let a = {};
    e.locale && (i.locale = e.locale), z(e.format) ? i.key = e.format : fe(e.format) && (z(e.format.key) && (i.key = e.format.key), a = Object.keys(e.format).reduce((p, S) => n.includes(S) ? Ge({}, p, { [S]: e.format[S] }) : p, {}));
    const c = r(e.value, i, a);
    let l = [i.key];
    Le(c) ? l = c.map((p, S) => {
      const I = s[p.type], A = I ? I({ [p.type]: p.value, index: S, parts: c }) : [p.value];
      return m_(A) && (A[0].key = `${p.type}-${S}`), A;
    }) : z(c) && (l = [c]);
    const u = Ge({}, o), m = z(e.tag) || fe(e.tag) ? e.tag : Ou();
    return ui(m, u, l);
  };
}
const p_ = /* @__PURE__ */ ht({
  /* eslint-disable */
  name: "i18n-n",
  props: Ge({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, gi),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || In({
      useScope: e.scope,
      __useComponent: !0
    });
    return vu(e, t, _u, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[So](...r)
    ));
  }
}), Wa = p_, h_ = /* @__PURE__ */ ht({
  /* eslint-disable */
  name: "i18n-d",
  props: Ge({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, gi),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || In({
      useScope: e.scope,
      __useComponent: !0
    });
    return vu(e, t, hu, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Eo](...r)
    ));
  }
}), Xa = h_;
function __(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function g_(e) {
  const t = (i) => {
    const { instance: a, modifiers: c, value: l } = i;
    if (!a || !a.$)
      throw pt(lt.UNEXPECTED_ERROR);
    const u = __(e, a.$), m = Ya(l);
    return [
      Reflect.apply(u.t, u, [...Ja(m)]),
      u
    ];
  };
  return {
    created: (i, a) => {
      const [c, l] = t(a);
      qr && e.global === l && (i.__i18nWatcher = hn(l.locale, () => {
        a.instance && a.instance.$forceUpdate();
      })), i.__composer = l, i.textContent = c;
    },
    unmounted: (i) => {
      qr && i.__i18nWatcher && (i.__i18nWatcher(), i.__i18nWatcher = void 0, delete i.__i18nWatcher), i.__composer && (i.__composer = void 0, delete i.__composer);
    },
    beforeUpdate: (i, { value: a }) => {
      if (i.__composer) {
        const c = i.__composer, l = Ya(a);
        i.textContent = Reflect.apply(c.t, c, [
          ...Ja(l)
        ]);
      }
    },
    getSSRProps: (i) => {
      const [a] = t(i);
      return { textContent: a };
    }
  };
}
function Ya(e) {
  if (z(e))
    return { path: e };
  if (ie(e)) {
    if (!("path" in e))
      throw pt(lt.REQUIRED_VALUE, "path");
    return e;
  } else
    throw pt(lt.INVALID_VALUE);
}
function Ja(e) {
  const { path: t, locale: n, args: r, choice: s, plural: o } = e, i = {}, a = r || {};
  return z(n) && (i.locale = n), we(s) && (i.plural = s), we(o) && (i.plural = o), [t, a, i];
}
function b_(e, t, ...n) {
  const r = ie(n[0]) ? n[0] : {}, s = !!r.useI18nComponentName;
  (ye(r.globalInstall) ? r.globalInstall : !0) && ([s ? "i18n" : qa.name, "I18nT"].forEach((i) => e.component(i, qa)), [Wa.name, "I18nN"].forEach((i) => e.component(i, Wa)), [Xa.name, "I18nD"].forEach((i) => e.component(i, Xa))), e.directive("t", g_(t));
}
const Iu = /* @__PURE__ */ sn("global-vue-i18n");
function E_(e = {}, t) {
  const n = ye(e.globalInjection) ? e.globalInjection : !0, r = !0, s = /* @__PURE__ */ new Map(), [o, i] = S_(e), a = /* @__PURE__ */ sn("");
  function c(m) {
    return s.get(m) || null;
  }
  function l(m, p) {
    s.set(m, p);
  }
  function u(m) {
    s.delete(m);
  }
  {
    const m = {
      // mode
      get mode() {
        return "composition";
      },
      // allowComposition
      get allowComposition() {
        return r;
      },
      // install plugin
      async install(p, ...S) {
        if (p.__VUE_I18N_SYMBOL__ = a, p.provide(p.__VUE_I18N_SYMBOL__, m), ie(S[0])) {
          const w = S[0];
          m.__composerExtend = w.__composerExtend, m.__vueI18nExtend = w.__vueI18nExtend;
        }
        let I = null;
        n && (I = R_(p, m.global)), b_(p, m, ...S);
        const A = p.unmount;
        p.unmount = () => {
          I && I(), m.dispose(), A();
        };
      },
      // global accessor
      get global() {
        return i;
      },
      dispose() {
        o.stop();
      },
      // @internal
      __instances: s,
      // @internal
      __getInstance: c,
      // @internal
      __setInstance: l,
      // @internal
      __deleteInstance: u
    };
    return m;
  }
}
function In(e = {}) {
  const t = li();
  if (t == null)
    throw pt(lt.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw pt(lt.NOT_INSTALLED);
  const n = y_(t), r = v_(n), s = Su(t), o = O_(e, s);
  if (o === "global")
    return c_(r, e, s), r;
  if (o === "parent") {
    let c = I_(n, t, e.__useComponent);
    return c == null && (c = r), c;
  }
  const i = n;
  let a = i.__getInstance(t);
  if (a == null) {
    const c = Ge({}, e);
    "__i18n" in s && (c.__i18n = s.__i18n), r && (c.__root = r), a = yu(c), i.__composerExtend && (a[yo] = i.__composerExtend(a)), T_(i, t, a), i.__setInstance(t, a);
  }
  return a;
}
function S_(e, t, n) {
  const r = Kf();
  {
    const s = r.run(() => yu(e));
    if (s == null)
      throw pt(lt.UNEXPECTED_ERROR);
    return [r, s];
  }
}
function y_(e) {
  {
    const t = rr(e.isCE ? Iu : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw pt(e.isCE ? lt.NOT_INSTALLED_WITH_PROVIDE : lt.UNEXPECTED_ERROR);
    return t;
  }
}
function O_(e, t) {
  return gs(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function v_(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function I_(e, t, n = !1) {
  let r = null;
  const s = t.root;
  let o = A_(t, n);
  for (; o != null; ) {
    const i = e;
    if (e.mode === "composition" && (r = i.__getInstance(o)), r != null || s === o)
      break;
    o = o.parent;
  }
  return r;
}
function A_(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function T_(e, t, n) {
  ms(() => {
  }, t), oi(() => {
    const r = n;
    e.__deleteInstance(t);
    const s = r[yo];
    s && (s(), delete r[yo]);
  }, t);
}
const N_ = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], Qa = ["t", "rt", "d", "n", "tm", "te"];
function R_(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return N_.forEach((s) => {
    const o = Object.getOwnPropertyDescriptor(t, s);
    if (!o)
      throw pt(lt.UNEXPECTED_ERROR);
    const i = je(o.value) ? {
      get() {
        return o.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(a) {
        o.value.value = a;
      }
    } : {
      get() {
        return o.get && o.get();
      }
    };
    Object.defineProperty(n, s, i);
  }), e.config.globalProperties.$i18n = n, Qa.forEach((s) => {
    const o = Object.getOwnPropertyDescriptor(t, s);
    if (!o || !o.value)
      throw pt(lt.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${s}`, o);
  }), () => {
    delete e.config.globalProperties.$i18n, Qa.forEach((s) => {
      delete e.config.globalProperties[`$${s}`];
    });
  };
}
o_();
jh(Qh);
Vh(yh);
Hh(au);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = di();
  e.__INTLIFY__ = !0, Dh(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const C_ = { class: "cadre-carte-ressource" }, D_ = { class: "nom-ressource-carte-ressource" }, L_ = { class: "liste-attributs-ressource-carte-ressource" }, P_ = { class: "attribut-ressource-carte-ressource" }, w_ = { class: "intitule-attribut-ressource-carte-ressource" }, x_ = { class: "id-principal-ressource-carte-ressource" }, k_ = {
  key: 0,
  class: "attribut-ressource-carte-ressource"
}, M_ = { class: "intitule-attribut-ressource-carte-ressource" }, F_ = { class: "nom-attribut-ressource-carte-ressource" }, U_ = {
  key: 0,
  class: "id-attribut-ressource-carte-ressource"
}, G_ = { class: "intitule-attribut-ressource-carte-ressource" }, j_ = { class: "nom-attribut-ressource-carte-ressource" }, V_ = {
  key: 0,
  class: "id-attribut-ressource-carte-ressource"
}, H_ = {
  key: 1,
  class: "attribut-ressource-carte-ressource"
}, $_ = { class: "intitule-attribut-ressource-carte-ressource" }, B_ = { class: "nom-attribut-ressource-carte-ressource" }, K_ = {
  key: 0,
  class: "id-attribut-ressource-carte-ressource"
}, z_ = {
  key: 2,
  class: "attribut-ressource-carte-ressource"
}, q_ = { class: "intitule-attribut-ressource-carte-ressource" }, W_ = { class: "nom-attribut-ressource-carte-ressource" }, X_ = {
  key: 3,
  class: "attribut-ressource-carte-ressource"
}, Y_ = { class: "intitule-attribut-ressource-carte-ressource" }, J_ = { class: "nom-attribut-ressource-carte-ressource" }, Q_ = { class: "boutons-carte-ressource" }, Z_ = /* @__PURE__ */ ht({
  __name: "CarteRessource.ce",
  props: {
    ressource: { type: Object }
  },
  setup(e) {
    const t = e, n = st(!1), r = st([]);
    ms(() => {
      r.value = t.ressource.distributeursCom.filter(
        (l) => l.nom !== ""
      );
    });
    const { t: s } = In(), o = () => {
      n.value = !n.value;
    }, i = st(!1), a = Zl(() => {
      i.value = !1;
    }, 1500), c = () => {
      let l = `${s("carte-ressource.nom-ressource")}: ${t.ressource.ressource.nom}
${s("carte-ressource.id-gar")}: ${t.ressource.ressource.id}
${s("carte-ressource.editeur")}: ${t.ressource.editeur.nom}`;
      t.ressource.distributeursCom.forEach((u) => {
        l += `
${s("carte-ressource.distributeurCom")}: ${u.nom}`;
      }), navigator.clipboard.writeText(l), i.value = !0, a();
    };
    return (l, u) => (Se(), Ae("div", C_, [
      J("h3", D_, ne(l.ressource.ressource.nom), 1),
      J("ul", L_, [
        J("li", P_, [
          J("span", w_, ne(se(s)("carte-ressource.id-gar")) + " : ", 1),
          J("span", x_, ne(l.ressource.ressource.id), 1)
        ]),
        l.ressource.editeur.nom !== "" || n.value ? (Se(), Ae("li", k_, [
          J("span", M_, ne(se(s)("carte-ressource.editeur")) + " : ", 1),
          J("span", F_, ne(l.ressource.editeur.nom), 1),
          n.value ? (Se(), Ae("span", U_, " " + ne(l.ressource.editeur.id), 1)) : zt("", !0)
        ])) : zt("", !0),
        (Se(!0), Ae(Je, null, Cl(r.value, (m) => (Se(), Ae("li", {
          class: "attribut-ressource-carte-ressource",
          key: m.id
        }, [
          J("span", G_, ne(se(s)("carte-ressource.distributeurCom")) + " : ", 1),
          J("span", j_, ne(m.nom), 1),
          n.value ? (Se(), Ae("span", V_, " " + ne(m.id), 1)) : zt("", !0)
        ]))), 128)),
        n.value ? (Se(), Ae("li", H_, [
          J("span", $_, ne(se(s)("carte-ressource.distributeurTech")) + " : ", 1),
          J("span", B_, ne(l.ressource.distributeurTech.nom), 1),
          n.value ? (Se(), Ae("span", K_, " " + ne(l.ressource.distributeurTech.id), 1)) : zt("", !0)
        ])) : zt("", !0),
        n.value ? (Se(), Ae("li", z_, [
          J("span", q_, ne(se(s)("carte-ressource.affichable")) + " : ", 1),
          J("span", W_, ne(l.ressource.affichable ? se(s)("carte-ressource.oui") : se(s)("carte-ressource.non")), 1)
        ])) : zt("", !0),
        n.value ? (Se(), Ae("li", X_, [
          J("span", Y_, ne(se(s)("carte-ressource.diffusable")) + " : ", 1),
          J("span", J_, ne(l.ressource.diffusable ? se(s)("carte-ressource.oui") : se(s)("carte-ressource.non")), 1)
        ])) : zt("", !0)
      ]),
      J("div", Q_, [
        J("button", { onClick: o }, ne(n.value ? se(s)("carte-ressource.moins-informations") : se(s)("carte-ressource.plus-informations")), 1),
        J("button", {
          class: as([i.value ? "success" : ""]),
          onClick: c
        }, ne(se(s)(i.value ? "carte-ressource.contenu-copie" : "carte-ressource.copier-references")), 3)
      ])
    ]));
  }
}), eg = ".cadre-carte-ressource{text-align:left;background-color:#fff;padding:var(--ui-ressources-gar-padding, 1rem);margin-bottom:var(--ui-ressources-gar-margin, .6rem);border-radius:var(--ui-ressources-gar-card-border-radius, 1rem)}.nom-ressource-carte-ressource{margin-top:0;margin-bottom:var(--ui-ressources-gar-margin, .6rem);color:var(--ui-ressources-gar-ressources-title-color, #25b2f3)}.liste-attributs-ressource-carte-ressource{list-style-type:none;padding:0;margin:0 0 var(--ui-ressources-gar-margin, .6rem) 0}.intitule-attribut-ressource-carte-ressource{font-weight:700}.id-principal-ressource-carte-ressource{word-wrap:break-word}.id-attribut-ressource-carte-ressource{opacity:.5;font-size:smaller;word-wrap:break-word}.boutons-carte-ressource{display:flex;flex-direction:row;justify-content:space-evenly}.boutons-carte-ressource>button{min-width:min(200px,45%);padding:.6rem;font-size:small;font-weight:700;background-color:var(--ui-ressources-gar-button-background-color, #0c9ee1);color:var(--ui-ressources-gar-button-text-color, #ffffff);border:none;border-radius:var(--ui-ressources-gar-button-border-radius, 1.5rem);cursor:pointer}.boutons-carte-ressource>button:not(:first-child){margin-left:calc(var(--ui-ressources-gar-margin, .6rem) / 2)}.boutons-carte-ressource>button:not(:last-child){margin-right:calc(var(--ui-ressources-gar-margin, .6rem) / 2)}.boutons-carte-ressource>button:disabled{background-color:#d3d3d3;cursor:not-allowed}.boutons-carte-ressource>button.success{background-color:var(--ui-ressources-gar-button-background-color-success, #37b61d);color:var(--ui-ressources-gar-button-text-color-success, #ffffff)}@media (min-width: 768px){.boutons-carte-ressource{justify-content:flex-end}}", Hn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, tg = /* @__PURE__ */ Hn(Z_, [["styles", [eg]]]), Za = {
  "carte-ressource": {
    "id-gar": "GAR Identifier",
    "nom-ressource": "Resource name",
    editeur: "Editor",
    distributeurTech: "Technical distributor",
    distributeurCom: "Commercial distributor",
    affichable: "Displayable",
    diffusable: "Sharable",
    oui: "Yes",
    non: "No",
    "plus-informations": "More information",
    "moins-informations": "Less information",
    "copier-references": "Copy references",
    "contenu-copie": "Copied"
  },
  "legende-ressource": {
    "id-gar": {
      intitule: "GAR Identifier",
      definition: "GAR Identifier meaning"
    },
    editeur: {
      intitule: "Editor",
      definition: "Editor meaning"
    },
    distributeurTech: {
      intitule: "Technical distributor",
      definition: "Technical distributor meaning"
    },
    distributeurCom: {
      intitule: "Commercial distributor",
      definition: "Commercial distributor meaning"
    },
    affichable: {
      intitule: "Displayable",
      definition: "Displayable meaning"
    },
    diffusable: {
      intitule: "Sharable",
      definition: "Sharable meaning"
    }
  },
  "liste-ressources": {
    "charger-plus": "Load more",
    chargement: "Loading…",
    "aucune-ressource": "No resource matches your request.",
    erreur: "An error occured. Please contact a ENT referent.",
    "detail-erreur": "Error informations"
  },
  "recherche-ressource": {
    recherche: "Search",
    "elements-affiches": "items displayed"
  }
}, ec = {
  "carte-ressource": {
    "id-gar": "Identifiant GAR",
    "nom-ressource": "Nom de la ressource",
    editeur: "Éditeur",
    distributeurCom: "Distributeur commercial",
    distributeurTech: "Distributeur technique",
    affichable: "Affichable",
    diffusable: "Diffusable",
    oui: "Oui",
    non: "Non",
    "plus-informations": "Plus d'informations",
    "moins-informations": "Moins d'informations",
    "copier-references": "Copier les références",
    "contenu-copie": "Copié"
  },
  "legende-ressource": {
    "id-gar": {
      intitule: "Identifiant GAR",
      definition: "Définition de l'Identifiant GAR"
    },
    editeur: {
      intitule: "Éditeur",
      definition: "Définition de l'éditeur"
    },
    distributeurCom: {
      intitule: "Distributeur commercial",
      definition: "Définition du distributeur commercial"
    },
    distributeurTech: {
      intitule: "Distributeur technique",
      definition: "Définition du distributeur technique"
    },
    affichable: {
      intitule: "Affichable",
      definition: "Définition de affichable"
    },
    diffusable: {
      intitule: "Diffusable",
      definition: "Définition de diffusable"
    }
  },
  "liste-ressources": {
    "charger-plus": "Charger plus",
    chargement: "Chargement…",
    "aucune-ressource": "Aucune ressource ne correspond à votre recherche.",
    erreur: "Une erreur est survenue. Veuillez contacter un référent ENT.",
    "detail-erreur": "Détail de l'erreur "
  },
  "recherche-ressource": {
    recherche: "Recherche",
    "elements-affiches": "éléments affichés"
  }
}, Au = E_({
  legacy: !1,
  allowComposition: !0,
  locale: window.navigator.language,
  fallbackLocale: "en",
  messages: {
    en: Za,
    "en-US": Za,
    fr: ec,
    "fr-FR": ec
  }
}), ng = ["base-api-url", "ressources-diffusables-api-uri", "ressources-diffusables-size-api-uri", "user-info-api-url"], rg = /* @__PURE__ */ ht({
  __name: "I18nHost.ce",
  props: {
    baseApiUrl: { type: String },
    ressourcesDiffusablesApiUri: { type: String },
    ressourcesDiffusablesSizeApiUri: { type: String },
    userInfoApiUrl: { type: String }
  },
  setup(e) {
    return Pl(Iu, Au), (t, n) => (Se(), Ae("page-ressource", {
      "base-api-url": t.baseApiUrl,
      "ressources-diffusables-api-uri": t.ressourcesDiffusablesApiUri,
      "ressources-diffusables-size-api-uri": t.ressourcesDiffusablesSizeApiUri,
      "user-info-api-url": t.userInfoApiUrl
    }, null, 8, ng));
  }
}), sg = { class: "cadre-legende-ressource" }, og = { class: "liste-legendes-legende-ressource" }, ig = { class: "element-legende-ressource" }, ag = { class: "intitule-legende-ressource" }, cg = { class: "definition-legende-ressource" }, lg = { class: "element-legende-ressource" }, ug = { class: "intitule-legende-ressource" }, fg = { class: "definition-legende-ressource" }, dg = { class: "element-legende-ressource" }, mg = { class: "intitule-legende-ressource" }, pg = { class: "definition-legende-ressource" }, hg = { class: "element-legende-ressource" }, _g = { class: "intitule-legende-ressource" }, gg = { class: "definition-legende-ressource" }, bg = { class: "element-legende-ressource" }, Eg = { class: "intitule-legende-ressource" }, Sg = { class: "definition-legende-ressource" }, yg = { class: "element-legende-ressource" }, Og = { class: "intitule-legende-ressource" }, vg = { class: "definition-legende-ressource" }, Ig = /* @__PURE__ */ ht({
  __name: "LegendeRessource.ce",
  setup(e) {
    const { t } = In();
    return (n, r) => (Se(), Ae("div", sg, [
      J("ul", og, [
        J("li", ig, [
          J("span", ag, ne(se(t)("legende-ressource.id-gar.intitule")) + " : ", 1),
          J("span", cg, ne(se(t)("legende-ressource.id-gar.definition")), 1)
        ]),
        J("li", lg, [
          J("span", ug, ne(se(t)("legende-ressource.editeur.intitule")) + " : ", 1),
          J("span", fg, ne(se(t)("legende-ressource.editeur.definition")), 1)
        ]),
        J("li", dg, [
          J("span", mg, ne(se(t)("legende-ressource.distributeurCom.intitule")) + " : ", 1),
          J("span", pg, ne(se(t)("legende-ressource.distributeurCom.definition")), 1)
        ]),
        J("li", hg, [
          J("span", _g, ne(se(t)("legende-ressource.distributeurTech.intitule")) + " : ", 1),
          J("span", gg, ne(se(t)("legende-ressource.distributeurTech.definition")), 1)
        ]),
        J("li", bg, [
          J("span", Eg, ne(se(t)("legende-ressource.affichable.intitule")) + " : ", 1),
          J("span", Sg, ne(se(t)("legende-ressource.affichable.definition")), 1)
        ]),
        J("li", yg, [
          J("span", Og, ne(se(t)("legende-ressource.diffusable.intitule")) + " : ", 1),
          J("span", vg, ne(se(t)("legende-ressource.diffusable.definition")), 1)
        ])
      ])
    ]));
  }
}), Ag = ".cadre-legende-ressource{text-align:left;padding:var(--ui-ressources-gar-padding, 1rem);margin:var(--ui-ressources-gar-margin, .6rem);background-color:#fff;border-radius:var(--ui-ressources-gar-card-border-radius, 1rem)}.liste-legendes-legende-ressource{padding:0;margin:0}.element-legende-ressource{list-style-type:none}.element-legende-ressource:not(:last-child){margin-bottom:var(--ui-ressources-gar-margin, .6rem)}.intitule-legende-ressource{font-weight:700}", Tg = /* @__PURE__ */ Hn(Ig, [["styles", [Ag]]]), Ng = { class: "cadre-liste-ressources" }, Rg = ["ressource"], Cg = {
  key: 0,
  class: "chargement-liste-ressources"
}, Dg = { key: 1 }, Lg = /* @__PURE__ */ J("br", null, null, -1), Pg = { key: 2 }, wg = /* @__PURE__ */ ht({
  __name: "ListeRessources.ce",
  props: {
    ressources: { type: Array },
    erreur: { type: String },
    lectureTerminee: { type: Boolean },
    chargement: { type: [Boolean, null] }
  },
  setup(e) {
    const { t } = In();
    return (n, r) => (Se(), Ae("div", Ng, [
      J("main", null, [
        (Se(!0), Ae(Je, null, Cl(n.ressources, (s) => (Se(), Ae("carte-ressource", {
          key: s.ressource.id,
          ressource: s
        }, null, 8, Rg))), 128))
      ]),
      J("footer", null, [
        n.chargement ? (Se(), Ae("p", Cg, ne(se(t)("liste-ressources.chargement")), 1)) : n.erreur !== "" ? (Se(), Ae("p", Dg, [
          uo(ne(se(t)("liste-ressources.erreur")), 1),
          Lg,
          uo(" " + ne(se(t)("liste-ressources.detail-erreur")) + ": ", 1),
          J("code", null, ne(n.erreur), 1)
        ])) : n.ressources.length === 0 ? (Se(), Ae("p", Pg, ne(se(t)("liste-ressources.aucune-ressource")), 1)) : n.lectureTerminee ? zt("", !0) : (Se(), Ae("button", {
          key: 3,
          class: "page-suivante-liste-ressources",
          onClick: r[0] || (r[0] = (s) => n.$emit("getPageSuivante"))
        }, ne(se(t)("liste-ressources.charger-plus")), 1))
      ])
    ]));
  }
}), xg = ".cadre-liste-ressources{padding:var(--ui-ressources-gar-margin, .6rem)}.cadre-liste-ressources>main{margin-bottom:-var(--ui-ressources-gar-margin,.6rem)}.cadre-liste-ressources>footer{text-align:center}.page-suivante-liste-ressources{width:100%;padding:.6rem;font-size:x-large;font-weight:700;background-color:var(--ui-ressources-gar-button-background-color, #0c9ee1);color:var(--ui-ressources-gar-button-text-color, #ffffff);border:none;border-radius:var(--ui-ressources-gar-button-border-radius, 1.5rem);cursor:pointer}.chargement-liste-ressources{font-size:x-large;font-weight:700}@media (max-width: 1024px){.cadre-liste-ressources{padding-top:0}}@media (min-width: 1024px){.cadre-liste-ressources{height:calc(100% - 2 * var(--ui-ressources-gar-margin, .6rem));overflow-y:scroll;padding-left:0}}", kg = /* @__PURE__ */ Hn(wg, [["styles", [xg]]]);
function Oo(e) {
  this.message = e;
}
Oo.prototype = new Error(), Oo.prototype.name = "InvalidCharacterError";
var tc = typeof window < "u" && window.atob && window.atob.bind(window) || function(e) {
  var t = String(e).replace(/=+$/, "");
  if (t.length % 4 == 1) throw new Oo("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var n, r, s = 0, o = 0, i = ""; r = t.charAt(o++); ~r && (n = s % 4 ? 64 * n + r : r, s++ % 4) ? i += String.fromCharCode(255 & n >> (-2 * s & 6)) : 0) r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r);
  return i;
};
function Mg(e) {
  var t = e.replace(/-/g, "+").replace(/_/g, "/");
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += "==";
      break;
    case 3:
      t += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }
  try {
    return function(n) {
      return decodeURIComponent(tc(n).replace(/(.)/g, function(r, s) {
        var o = s.charCodeAt(0).toString(16).toUpperCase();
        return o.length < 2 && (o = "0" + o), "%" + o;
      }));
    }(t);
  } catch {
    return tc(t);
  }
}
function Qr(e) {
  this.message = e;
}
function Fg(e, t) {
  if (typeof e != "string") throw new Qr("Invalid token specified");
  var n = (t = t || {}).header === !0 ? 0 : 1;
  try {
    return JSON.parse(Mg(e.split(".")[n]));
  } catch (r) {
    throw new Qr("Invalid token specified: " + r.message);
  }
}
Qr.prototype = new Error(), Qr.prototype.name = "InvalidTokenError";
function nc(e, t, n, r, s, o, i) {
  try {
    var a = e[o](i), c = a.value;
  } catch (l) {
    n(l);
    return;
  }
  a.done ? t(c) : Promise.resolve(c).then(r, s);
}
function Ug(e) {
  return function() {
    var t = this, n = arguments;
    return new Promise(function(r, s) {
      var o = e.apply(t, n);
      function i(c) {
        nc(o, r, s, i, a, "next", c);
      }
      function a(c) {
        nc(o, r, s, i, a, "throw", c);
      }
      i(void 0);
    });
  };
}
function Gg(e, t) {
  return jg(e) || Vg(e, t) || Hg(e, t) || $g();
}
function jg(e) {
  if (Array.isArray(e)) return e;
}
function Vg(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r = [], s = !0, o = !1, i, a;
    try {
      for (n = n.call(e); !(s = (i = n.next()).done) && (r.push(i.value), !(t && r.length === t)); s = !0)
        ;
    } catch (c) {
      o = !0, a = c;
    } finally {
      try {
        !s && n.return != null && n.return();
      } finally {
        if (o) throw a;
      }
    }
    return r;
  }
}
function Hg(e, t) {
  if (e) {
    if (typeof e == "string") return rc(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return rc(e, t);
  }
}
function rc(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function $g() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Bg() {
  return vo.apply(this, arguments);
}
function vo() {
  return vo = Ug(/* @__PURE__ */ regeneratorRuntime.mark(function e() {
    var t, n, r, s, o, i, a, c, l, u = arguments;
    return regeneratorRuntime.wrap(function(p) {
      for (; ; )
        switch (p.prev = p.next) {
          case 0:
            return t = u.length > 0 && u[0] !== void 0 ? u[0] : {}, n = t.userInfoApiUrl, r = n === void 0 ? "/uPortal/api/v5-1/userinfo" : n, s = t.propertyTransforms, o = s === void 0 ? {} : s, i = u.length > 1 ? u[1] : void 0, p.prev = 2, p.next = 5, fetch(r, {
              method: "GET",
              credentials: "include"
            });
          case 5:
            if (a = p.sent, a.ok) {
              p.next = 8;
              break;
            }
            throw new Error(a.statusText);
          case 8:
            return p.next = 10, a.text();
          case 10:
            if (c = p.sent, l = Kg(c), Object.entries(o).forEach(function(S) {
              var I = Gg(S, 2), A = I[0], w = I[1];
              l.decoded[A] = w(l.decoded[A]);
            }), !i) {
              p.next = 15;
              break;
            }
            return p.abrupt("return", i(null, l));
          case 15:
            return p.abrupt("return", l);
          case 18:
            if (p.prev = 18, p.t0 = p.catch(2), console.error(p.t0), !i) {
              p.next = 23;
              break;
            }
            return p.abrupt("return", i(p.t0));
          case 23:
            throw p.t0;
          case 24:
          case "end":
            return p.stop();
        }
    }, e, null, [[2, 18]]);
  })), vo.apply(this, arguments);
}
function Kg(e) {
  return {
    encoded: e,
    decoded: Fg(e)
  };
}
function Tu(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: zg } = Object.prototype, { getPrototypeOf: bi } = Object, Ss = /* @__PURE__ */ ((e) => (t) => {
  const n = zg.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), _t = (e) => (e = e.toLowerCase(), (t) => Ss(t) === e), ys = (e) => (t) => typeof t === e, { isArray: $n } = Array, mr = ys("undefined");
function qg(e) {
  return e !== null && !mr(e) && e.constructor !== null && !mr(e.constructor) && ct(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Nu = _t("ArrayBuffer");
function Wg(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Nu(e.buffer), t;
}
const Xg = ys("string"), ct = ys("function"), Ru = ys("number"), Os = (e) => e !== null && typeof e == "object", Yg = (e) => e === !0 || e === !1, jr = (e) => {
  if (Ss(e) !== "object")
    return !1;
  const t = bi(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Jg = _t("Date"), Qg = _t("File"), Zg = _t("Blob"), e1 = _t("FileList"), t1 = (e) => Os(e) && ct(e.pipe), n1 = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || ct(e.append) && ((t = Ss(e)) === "formdata" || // detect form-data instance
  t === "object" && ct(e.toString) && e.toString() === "[object FormData]"));
}, r1 = _t("URLSearchParams"), [s1, o1, i1, a1] = ["ReadableStream", "Request", "Response", "Headers"].map(_t), c1 = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function br(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, s;
  if (typeof e != "object" && (e = [e]), $n(e))
    for (r = 0, s = e.length; r < s; r++)
      t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let a;
    for (r = 0; r < i; r++)
      a = o[r], t.call(null, e[a], a, e);
  }
}
function Cu(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, s;
  for (; r-- > 0; )
    if (s = n[r], t === s.toLowerCase())
      return s;
  return null;
}
const Du = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Lu = (e) => !mr(e) && e !== Du;
function Io() {
  const { caseless: e } = Lu(this) && this || {}, t = {}, n = (r, s) => {
    const o = e && Cu(t, s) || s;
    jr(t[o]) && jr(r) ? t[o] = Io(t[o], r) : jr(r) ? t[o] = Io({}, r) : $n(r) ? t[o] = r.slice() : t[o] = r;
  };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && br(arguments[r], n);
  return t;
}
const l1 = (e, t, n, { allOwnKeys: r } = {}) => (br(t, (s, o) => {
  n && ct(s) ? e[o] = Tu(s, n) : e[o] = s;
}, { allOwnKeys: r }), e), u1 = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), f1 = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, d1 = (e, t, n, r) => {
  let s, o, i;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      i = s[o], (!r || r(i, e, t)) && !a[i] && (t[i] = e[i], a[i] = !0);
    e = n !== !1 && bi(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, m1 = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, p1 = (e) => {
  if (!e) return null;
  if ($n(e)) return e;
  let t = e.length;
  if (!Ru(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, h1 = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && bi(Uint8Array)), _1 = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let s;
  for (; (s = r.next()) && !s.done; ) {
    const o = s.value;
    t.call(e, o[0], o[1]);
  }
}, g1 = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, b1 = _t("HTMLFormElement"), E1 = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, s) {
    return r.toUpperCase() + s;
  }
), sc = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), S1 = _t("RegExp"), Pu = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  br(n, (s, o) => {
    let i;
    (i = t(s, o, e)) !== !1 && (r[o] = i || s);
  }), Object.defineProperties(e, r);
}, y1 = (e) => {
  Pu(e, (t, n) => {
    if (ct(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (ct(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, O1 = (e, t) => {
  const n = {}, r = (s) => {
    s.forEach((o) => {
      n[o] = !0;
    });
  };
  return $n(e) ? r(e) : r(String(e).split(t)), n;
}, v1 = () => {
}, I1 = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, Hs = "abcdefghijklmnopqrstuvwxyz", oc = "0123456789", wu = {
  DIGIT: oc,
  ALPHA: Hs,
  ALPHA_DIGIT: Hs + Hs.toUpperCase() + oc
}, A1 = (e = 16, t = wu.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function T1(e) {
  return !!(e && ct(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const N1 = (e) => {
  const t = new Array(10), n = (r, s) => {
    if (Os(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[s] = r;
        const o = $n(r) ? [] : {};
        return br(r, (i, a) => {
          const c = n(i, s + 1);
          !mr(c) && (o[a] = c);
        }), t[s] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, R1 = _t("AsyncFunction"), C1 = (e) => e && (Os(e) || ct(e)) && ct(e.then) && ct(e.catch), R = {
  isArray: $n,
  isArrayBuffer: Nu,
  isBuffer: qg,
  isFormData: n1,
  isArrayBufferView: Wg,
  isString: Xg,
  isNumber: Ru,
  isBoolean: Yg,
  isObject: Os,
  isPlainObject: jr,
  isReadableStream: s1,
  isRequest: o1,
  isResponse: i1,
  isHeaders: a1,
  isUndefined: mr,
  isDate: Jg,
  isFile: Qg,
  isBlob: Zg,
  isRegExp: S1,
  isFunction: ct,
  isStream: t1,
  isURLSearchParams: r1,
  isTypedArray: h1,
  isFileList: e1,
  forEach: br,
  merge: Io,
  extend: l1,
  trim: c1,
  stripBOM: u1,
  inherits: f1,
  toFlatObject: d1,
  kindOf: Ss,
  kindOfTest: _t,
  endsWith: m1,
  toArray: p1,
  forEachEntry: _1,
  matchAll: g1,
  isHTMLForm: b1,
  hasOwnProperty: sc,
  hasOwnProp: sc,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Pu,
  freezeMethods: y1,
  toObjectSet: O1,
  toCamelCase: E1,
  noop: v1,
  toFiniteNumber: I1,
  findKey: Cu,
  global: Du,
  isContextDefined: Lu,
  ALPHABET: wu,
  generateString: A1,
  isSpecCompliantForm: T1,
  toJSONObject: N1,
  isAsyncFn: R1,
  isThenable: C1
};
function te(e, t, n, r, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), s && (this.response = s);
}
R.inherits(te, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: R.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const xu = te.prototype, ku = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  ku[e] = { value: e };
});
Object.defineProperties(te, ku);
Object.defineProperty(xu, "isAxiosError", { value: !0 });
te.from = (e, t, n, r, s, o) => {
  const i = Object.create(xu);
  return R.toFlatObject(e, i, function(c) {
    return c !== Error.prototype;
  }, (a) => a !== "isAxiosError"), te.call(i, e.message, t, n, r, s), i.cause = e, i.name = e.name, o && Object.assign(i, o), i;
};
const D1 = null;
function Ao(e) {
  return R.isPlainObject(e) || R.isArray(e);
}
function Mu(e) {
  return R.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ic(e, t, n) {
  return e ? e.concat(t).map(function(s, o) {
    return s = Mu(s), !n && o ? "[" + s + "]" : s;
  }).join(n ? "." : "") : t;
}
function L1(e) {
  return R.isArray(e) && !e.some(Ao);
}
const P1 = R.toFlatObject(R, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function vs(e, t, n) {
  if (!R.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = R.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(A, w) {
    return !R.isUndefined(w[A]);
  });
  const r = n.metaTokens, s = n.visitor || u, o = n.dots, i = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && R.isSpecCompliantForm(t);
  if (!R.isFunction(s))
    throw new TypeError("visitor must be a function");
  function l(I) {
    if (I === null) return "";
    if (R.isDate(I))
      return I.toISOString();
    if (!c && R.isBlob(I))
      throw new te("Blob is not supported. Use a Buffer instead.");
    return R.isArrayBuffer(I) || R.isTypedArray(I) ? c && typeof Blob == "function" ? new Blob([I]) : Buffer.from(I) : I;
  }
  function u(I, A, w) {
    let v = I;
    if (I && !w && typeof I == "object") {
      if (R.endsWith(A, "{}"))
        A = r ? A : A.slice(0, -2), I = JSON.stringify(I);
      else if (R.isArray(I) && L1(I) || (R.isFileList(I) || R.endsWith(A, "[]")) && (v = R.toArray(I)))
        return A = Mu(A), v.forEach(function(g, O) {
          !(R.isUndefined(g) || g === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? ic([A], O, o) : i === null ? A : A + "[]",
            l(g)
          );
        }), !1;
    }
    return Ao(I) ? !0 : (t.append(ic(w, A, o), l(I)), !1);
  }
  const m = [], p = Object.assign(P1, {
    defaultVisitor: u,
    convertValue: l,
    isVisitable: Ao
  });
  function S(I, A) {
    if (!R.isUndefined(I)) {
      if (m.indexOf(I) !== -1)
        throw Error("Circular reference detected in " + A.join("."));
      m.push(I), R.forEach(I, function(v, C) {
        (!(R.isUndefined(v) || v === null) && s.call(
          t,
          v,
          R.isString(C) ? C.trim() : C,
          A,
          p
        )) === !0 && S(v, A ? A.concat(C) : [C]);
      }), m.pop();
    }
  }
  if (!R.isObject(e))
    throw new TypeError("data must be an object");
  return S(e), t;
}
function ac(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function Ei(e, t) {
  this._pairs = [], e && vs(e, this, t);
}
const Fu = Ei.prototype;
Fu.append = function(t, n) {
  this._pairs.push([t, n]);
};
Fu.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, ac);
  } : ac;
  return this._pairs.map(function(s) {
    return n(s[0]) + "=" + n(s[1]);
  }, "").join("&");
};
function w1(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Uu(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || w1, s = n && n.serialize;
  let o;
  if (s ? o = s(t, n) : o = R.isURLSearchParams(t) ? t.toString() : new Ei(t, n).toString(r), o) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class cc {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    R.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Gu = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, x1 = typeof URLSearchParams < "u" ? URLSearchParams : Ei, k1 = typeof FormData < "u" ? FormData : null, M1 = typeof Blob < "u" ? Blob : null, F1 = {
  isBrowser: !0,
  classes: {
    URLSearchParams: x1,
    FormData: k1,
    Blob: M1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Si = typeof window < "u" && typeof document < "u", U1 = ((e) => Si && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product), G1 = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", j1 = Si && window.location.href || "http://localhost", V1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Si,
  hasStandardBrowserEnv: U1,
  hasStandardBrowserWebWorkerEnv: G1,
  origin: j1
}, Symbol.toStringTag, { value: "Module" })), mt = {
  ...V1,
  ...F1
};
function H1(e, t) {
  return vs(e, new mt.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, s, o) {
      return mt.isNode && R.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function $1(e) {
  return R.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function B1(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function ju(e) {
  function t(n, r, s, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const a = Number.isFinite(+i), c = o >= n.length;
    return i = !i && R.isArray(s) ? s.length : i, c ? (R.hasOwnProp(s, i) ? s[i] = [s[i], r] : s[i] = r, !a) : ((!s[i] || !R.isObject(s[i])) && (s[i] = []), t(n, r, s[i], o) && R.isArray(s[i]) && (s[i] = B1(s[i])), !a);
  }
  if (R.isFormData(e) && R.isFunction(e.entries)) {
    const n = {};
    return R.forEachEntry(e, (r, s) => {
      t($1(r), s, n, 0);
    }), n;
  }
  return null;
}
function K1(e, t, n) {
  if (R.isString(e))
    try {
      return (t || JSON.parse)(e), R.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const Er = {
  transitional: Gu,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", s = r.indexOf("application/json") > -1, o = R.isObject(t);
    if (o && R.isHTMLForm(t) && (t = new FormData(t)), R.isFormData(t))
      return s ? JSON.stringify(ju(t)) : t;
    if (R.isArrayBuffer(t) || R.isBuffer(t) || R.isStream(t) || R.isFile(t) || R.isBlob(t) || R.isReadableStream(t))
      return t;
    if (R.isArrayBufferView(t))
      return t.buffer;
    if (R.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return H1(t, this.formSerializer).toString();
      if ((a = R.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return vs(
          a ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return o || s ? (n.setContentType("application/json", !1), K1(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Er.transitional, r = n && n.forcedJSONParsing, s = this.responseType === "json";
    if (R.isResponse(t) || R.isReadableStream(t))
      return t;
    if (t && R.isString(t) && (r && !this.responseType || s)) {
      const i = !(n && n.silentJSONParsing) && s;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? te.from(a, te.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: mt.classes.FormData,
    Blob: mt.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
R.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Er.headers[e] = {};
});
const z1 = R.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), q1 = (e) => {
  const t = {};
  let n, r, s;
  return e && e.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), n = i.substring(0, s).trim().toLowerCase(), r = i.substring(s + 1).trim(), !(!n || t[n] && z1[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, lc = Symbol("internals");
function Wn(e) {
  return e && String(e).trim().toLowerCase();
}
function Vr(e) {
  return e === !1 || e == null ? e : R.isArray(e) ? e.map(Vr) : String(e);
}
function W1(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const X1 = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function $s(e, t, n, r, s) {
  if (R.isFunction(r))
    return r.call(this, t, n);
  if (s && (t = n), !!R.isString(t)) {
    if (R.isString(r))
      return t.indexOf(r) !== -1;
    if (R.isRegExp(r))
      return r.test(t);
  }
}
function Y1(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function J1(e, t) {
  const n = R.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(s, o, i) {
        return this[r].call(this, t, s, o, i);
      },
      configurable: !0
    });
  });
}
class qe {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function o(a, c, l) {
      const u = Wn(c);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const m = R.findKey(s, u);
      (!m || s[m] === void 0 || l === !0 || l === void 0 && s[m] !== !1) && (s[m || c] = Vr(a));
    }
    const i = (a, c) => R.forEach(a, (l, u) => o(l, u, c));
    if (R.isPlainObject(t) || t instanceof this.constructor)
      i(t, n);
    else if (R.isString(t) && (t = t.trim()) && !X1(t))
      i(q1(t), n);
    else if (R.isHeaders(t))
      for (const [a, c] of t.entries())
        o(c, a, r);
    else
      t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = Wn(t), t) {
      const r = R.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n)
          return s;
        if (n === !0)
          return W1(s);
        if (R.isFunction(n))
          return n.call(this, s, r);
        if (R.isRegExp(n))
          return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Wn(t), t) {
      const r = R.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || $s(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function o(i) {
      if (i = Wn(i), i) {
        const a = R.findKey(r, i);
        a && (!n || $s(r, r[a], a, n)) && (delete r[a], s = !0);
      }
    }
    return R.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, s = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || $s(this, this[o], o, t, !0)) && (delete this[o], s = !0);
    }
    return s;
  }
  normalize(t) {
    const n = this, r = {};
    return R.forEach(this, (s, o) => {
      const i = R.findKey(r, o);
      if (i) {
        n[i] = Vr(s), delete n[o];
        return;
      }
      const a = t ? Y1(o) : String(o).trim();
      a !== o && delete n[o], n[a] = Vr(s), r[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return R.forEach(this, (r, s) => {
      r != null && r !== !1 && (n[s] = t && R.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((s) => r.set(s)), r;
  }
  static accessor(t) {
    const r = (this[lc] = this[lc] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function o(i) {
      const a = Wn(i);
      r[a] || (J1(s, i), r[a] = !0);
    }
    return R.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
qe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
R.reduceDescriptors(qe.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
R.freezeMethods(qe);
function Bs(e, t) {
  const n = this || Er, r = t || n, s = qe.from(r.headers);
  let o = r.data;
  return R.forEach(e, function(a) {
    o = a.call(n, o, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), o;
}
function Vu(e) {
  return !!(e && e.__CANCEL__);
}
function Bn(e, t, n) {
  te.call(this, e ?? "canceled", te.ERR_CANCELED, t, n), this.name = "CanceledError";
}
R.inherits(Bn, te, {
  __CANCEL__: !0
});
function Hu(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new te(
    "Request failed with status code " + n.status,
    [te.ERR_BAD_REQUEST, te.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Q1(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Z1(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let s = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const l = Date.now(), u = r[o];
    i || (i = l), n[s] = c, r[s] = l;
    let m = o, p = 0;
    for (; m !== s; )
      p += n[m++], m = m % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), l - i < t)
      return;
    const S = u && l - u;
    return S ? Math.round(p * 1e3 / S) : void 0;
  };
}
function e0(e, t) {
  let n = 0;
  const r = 1e3 / t;
  let s = null;
  return function() {
    const i = this === !0, a = Date.now();
    if (i || a - n > r)
      return s && (clearTimeout(s), s = null), n = a, e.apply(null, arguments);
    s || (s = setTimeout(() => (s = null, n = Date.now(), e.apply(null, arguments)), r - (a - n)));
  };
}
const Zr = (e, t, n = 3) => {
  let r = 0;
  const s = Z1(50, 250);
  return e0((o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, c = i - r, l = s(c), u = i <= a;
    r = i;
    const m = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: c,
      rate: l || void 0,
      estimated: l && a && u ? (a - i) / l : void 0,
      event: o,
      lengthComputable: a != null
    };
    m[t ? "download" : "upload"] = !0, e(m);
  }, n);
}, t0 = mt.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    let r;
    function s(o) {
      let i = o;
      return t && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return r = s(window.location.href), function(i) {
      const a = R.isString(i) ? s(i) : i;
      return a.protocol === r.protocol && a.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), n0 = mt.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, s, o) {
      const i = [e + "=" + encodeURIComponent(t)];
      R.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()), R.isString(r) && i.push("path=" + r), R.isString(s) && i.push("domain=" + s), o === !0 && i.push("secure"), document.cookie = i.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function r0(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function s0(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function $u(e, t) {
  return e && !r0(t) ? s0(e, t) : t;
}
const uc = (e) => e instanceof qe ? { ...e } : e;
function yn(e, t) {
  t = t || {};
  const n = {};
  function r(l, u, m) {
    return R.isPlainObject(l) && R.isPlainObject(u) ? R.merge.call({ caseless: m }, l, u) : R.isPlainObject(u) ? R.merge({}, u) : R.isArray(u) ? u.slice() : u;
  }
  function s(l, u, m) {
    if (R.isUndefined(u)) {
      if (!R.isUndefined(l))
        return r(void 0, l, m);
    } else return r(l, u, m);
  }
  function o(l, u) {
    if (!R.isUndefined(u))
      return r(void 0, u);
  }
  function i(l, u) {
    if (R.isUndefined(u)) {
      if (!R.isUndefined(l))
        return r(void 0, l);
    } else return r(void 0, u);
  }
  function a(l, u, m) {
    if (m in t)
      return r(l, u);
    if (m in e)
      return r(void 0, l);
  }
  const c = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: a,
    headers: (l, u) => s(uc(l), uc(u), !0)
  };
  return R.forEach(Object.keys(Object.assign({}, e, t)), function(u) {
    const m = c[u] || s, p = m(e[u], t[u], u);
    R.isUndefined(p) && m !== a || (n[u] = p);
  }), n;
}
const Bu = (e) => {
  const t = yn({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: s, xsrfCookieName: o, headers: i, auth: a } = t;
  t.headers = i = qe.from(i), t.url = Uu($u(t.baseURL, t.url), e.params, e.paramsSerializer), a && i.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let c;
  if (R.isFormData(n)) {
    if (mt.hasStandardBrowserEnv || mt.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if ((c = i.getContentType()) !== !1) {
      const [l, ...u] = c ? c.split(";").map((m) => m.trim()).filter(Boolean) : [];
      i.setContentType([l || "multipart/form-data", ...u].join("; "));
    }
  }
  if (mt.hasStandardBrowserEnv && (r && R.isFunction(r) && (r = r(t)), r || r !== !1 && t0(t.url))) {
    const l = s && o && n0.read(o);
    l && i.set(s, l);
  }
  return t;
}, o0 = typeof XMLHttpRequest < "u", i0 = o0 && function(e) {
  return new Promise(function(n, r) {
    const s = Bu(e);
    let o = s.data;
    const i = qe.from(s.headers).normalize();
    let { responseType: a } = s, c;
    function l() {
      s.cancelToken && s.cancelToken.unsubscribe(c), s.signal && s.signal.removeEventListener("abort", c);
    }
    let u = new XMLHttpRequest();
    u.open(s.method.toUpperCase(), s.url, !0), u.timeout = s.timeout;
    function m() {
      if (!u)
        return;
      const S = qe.from(
        "getAllResponseHeaders" in u && u.getAllResponseHeaders()
      ), A = {
        data: !a || a === "text" || a === "json" ? u.responseText : u.response,
        status: u.status,
        statusText: u.statusText,
        headers: S,
        config: e,
        request: u
      };
      Hu(function(v) {
        n(v), l();
      }, function(v) {
        r(v), l();
      }, A), u = null;
    }
    "onloadend" in u ? u.onloadend = m : u.onreadystatechange = function() {
      !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(m);
    }, u.onabort = function() {
      u && (r(new te("Request aborted", te.ECONNABORTED, s, u)), u = null);
    }, u.onerror = function() {
      r(new te("Network Error", te.ERR_NETWORK, s, u)), u = null;
    }, u.ontimeout = function() {
      let I = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const A = s.transitional || Gu;
      s.timeoutErrorMessage && (I = s.timeoutErrorMessage), r(new te(
        I,
        A.clarifyTimeoutError ? te.ETIMEDOUT : te.ECONNABORTED,
        s,
        u
      )), u = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in u && R.forEach(i.toJSON(), function(I, A) {
      u.setRequestHeader(A, I);
    }), R.isUndefined(s.withCredentials) || (u.withCredentials = !!s.withCredentials), a && a !== "json" && (u.responseType = s.responseType), typeof s.onDownloadProgress == "function" && u.addEventListener("progress", Zr(s.onDownloadProgress, !0)), typeof s.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", Zr(s.onUploadProgress)), (s.cancelToken || s.signal) && (c = (S) => {
      u && (r(!S || S.type ? new Bn(null, e, u) : S), u.abort(), u = null);
    }, s.cancelToken && s.cancelToken.subscribe(c), s.signal && (s.signal.aborted ? c() : s.signal.addEventListener("abort", c)));
    const p = Q1(s.url);
    if (p && mt.protocols.indexOf(p) === -1) {
      r(new te("Unsupported protocol " + p + ":", te.ERR_BAD_REQUEST, e));
      return;
    }
    u.send(o || null);
  });
}, a0 = (e, t) => {
  let n = new AbortController(), r;
  const s = function(c) {
    if (!r) {
      r = !0, i();
      const l = c instanceof Error ? c : this.reason;
      n.abort(l instanceof te ? l : new Bn(l instanceof Error ? l.message : l));
    }
  };
  let o = t && setTimeout(() => {
    s(new te(`timeout ${t} of ms exceeded`, te.ETIMEDOUT));
  }, t);
  const i = () => {
    e && (o && clearTimeout(o), o = null, e.forEach((c) => {
      c && (c.removeEventListener ? c.removeEventListener("abort", s) : c.unsubscribe(s));
    }), e = null);
  };
  e.forEach((c) => c && c.addEventListener && c.addEventListener("abort", s));
  const { signal: a } = n;
  return a.unsubscribe = i, [a, () => {
    o && clearTimeout(o), o = null;
  }];
}, c0 = function* (e, t) {
  let n = e.byteLength;
  if (!t || n < t) {
    yield e;
    return;
  }
  let r = 0, s;
  for (; r < n; )
    s = r + t, yield e.slice(r, s), r = s;
}, l0 = async function* (e, t, n) {
  for await (const r of e)
    yield* c0(ArrayBuffer.isView(r) ? r : await n(String(r)), t);
}, fc = (e, t, n, r, s) => {
  const o = l0(e, t, s);
  let i = 0;
  return new ReadableStream({
    type: "bytes",
    async pull(a) {
      const { done: c, value: l } = await o.next();
      if (c) {
        a.close(), r();
        return;
      }
      let u = l.byteLength;
      n && n(i += u), a.enqueue(new Uint8Array(l));
    },
    cancel(a) {
      return r(a), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, dc = (e, t) => {
  const n = e != null;
  return (r) => setTimeout(() => t({
    lengthComputable: n,
    total: e,
    loaded: r
  }));
}, Is = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Ku = Is && typeof ReadableStream == "function", To = Is && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), u0 = Ku && (() => {
  let e = !1;
  const t = new Request(mt.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
})(), mc = 64 * 1024, No = Ku && !!(() => {
  try {
    return R.isReadableStream(new Response("").body);
  } catch {
  }
})(), es = {
  stream: No && ((e) => e.body)
};
Is && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !es[t] && (es[t] = R.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new te(`Response type '${t}' is not supported`, te.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const f0 = async (e) => {
  if (e == null)
    return 0;
  if (R.isBlob(e))
    return e.size;
  if (R.isSpecCompliantForm(e))
    return (await new Request(e).arrayBuffer()).byteLength;
  if (R.isArrayBufferView(e))
    return e.byteLength;
  if (R.isURLSearchParams(e) && (e = e + ""), R.isString(e))
    return (await To(e)).byteLength;
}, d0 = async (e, t) => {
  const n = R.toFiniteNumber(e.getContentLength());
  return n ?? f0(t);
}, m0 = Is && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: s,
    cancelToken: o,
    timeout: i,
    onDownloadProgress: a,
    onUploadProgress: c,
    responseType: l,
    headers: u,
    withCredentials: m = "same-origin",
    fetchOptions: p
  } = Bu(e);
  l = l ? (l + "").toLowerCase() : "text";
  let [S, I] = s || o || i ? a0([s, o], i) : [], A, w;
  const v = () => {
    !A && setTimeout(() => {
      S && S.unsubscribe();
    }), A = !0;
  };
  let C;
  try {
    if (c && u0 && n !== "get" && n !== "head" && (C = await d0(u, r)) !== 0) {
      let y = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), P;
      R.isFormData(r) && (P = y.headers.get("content-type")) && u.setContentType(P), y.body && (r = fc(y.body, mc, dc(
        C,
        Zr(c)
      ), null, To));
    }
    R.isString(m) || (m = m ? "cors" : "omit"), w = new Request(t, {
      ...p,
      signal: S,
      method: n.toUpperCase(),
      headers: u.normalize().toJSON(),
      body: r,
      duplex: "half",
      withCredentials: m
    });
    let g = await fetch(w);
    const O = No && (l === "stream" || l === "response");
    if (No && (a || O)) {
      const y = {};
      ["status", "statusText", "headers"].forEach((V) => {
        y[V] = g[V];
      });
      const P = R.toFiniteNumber(g.headers.get("content-length"));
      g = new Response(
        fc(g.body, mc, a && dc(
          P,
          Zr(a, !0)
        ), O && v, To),
        y
      );
    }
    l = l || "text";
    let L = await es[R.findKey(es, l) || "text"](g, e);
    return !O && v(), I && I(), await new Promise((y, P) => {
      Hu(y, P, {
        data: L,
        headers: qe.from(g.headers),
        status: g.status,
        statusText: g.statusText,
        config: e,
        request: w
      });
    });
  } catch (g) {
    throw v(), g && g.name === "TypeError" && /fetch/i.test(g.message) ? Object.assign(
      new te("Network Error", te.ERR_NETWORK, e, w),
      {
        cause: g.cause || g
      }
    ) : te.from(g, g && g.code, e, w);
  }
}), Ro = {
  http: D1,
  xhr: i0,
  fetch: m0
};
R.forEach(Ro, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const pc = (e) => `- ${e}`, p0 = (e) => R.isFunction(e) || e === null || e === !1, zu = {
  getAdapter: (e) => {
    e = R.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const s = {};
    for (let o = 0; o < t; o++) {
      n = e[o];
      let i;
      if (r = n, !p0(n) && (r = Ro[(i = String(n)).toLowerCase()], r === void 0))
        throw new te(`Unknown adapter '${i}'`);
      if (r)
        break;
      s[i || "#" + o] = r;
    }
    if (!r) {
      const o = Object.entries(s).map(
        ([a, c]) => `adapter ${a} ` + (c === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = t ? o.length > 1 ? `since :
` + o.map(pc).join(`
`) : " " + pc(o[0]) : "as no adapter specified";
      throw new te(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: Ro
};
function Ks(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Bn(null, e);
}
function hc(e) {
  return Ks(e), e.headers = qe.from(e.headers), e.data = Bs.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), zu.getAdapter(e.adapter || Er.adapter)(e).then(function(r) {
    return Ks(e), r.data = Bs.call(
      e,
      e.transformResponse,
      r
    ), r.headers = qe.from(r.headers), r;
  }, function(r) {
    return Vu(r) || (Ks(e), r && r.response && (r.response.data = Bs.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = qe.from(r.response.headers))), Promise.reject(r);
  });
}
const qu = "1.7.2", yi = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  yi[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const _c = {};
yi.transitional = function(t, n, r) {
  function s(o, i) {
    return "[Axios v" + qu + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, a) => {
    if (t === !1)
      throw new te(
        s(i, " has been removed" + (n ? " in " + n : "")),
        te.ERR_DEPRECATED
      );
    return n && !_c[i] && (_c[i] = !0, console.warn(
      s(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, a) : !0;
  };
};
function h0(e, t, n) {
  if (typeof e != "object")
    throw new te("options must be an object", te.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s], i = t[o];
    if (i) {
      const a = e[o], c = a === void 0 || i(a, o, e);
      if (c !== !0)
        throw new te("option " + o + " must be " + c, te.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new te("Unknown option " + o, te.ERR_BAD_OPTION);
  }
}
const Co = {
  assertOptions: h0,
  validators: yi
}, Bt = Co.validators;
class _n {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new cc(),
      response: new cc()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let s;
        Error.captureStackTrace ? Error.captureStackTrace(s = {}) : s = new Error();
        const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? o && !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + o) : r.stack = o;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = yn(this.defaults, n);
    const { transitional: r, paramsSerializer: s, headers: o } = n;
    r !== void 0 && Co.assertOptions(r, {
      silentJSONParsing: Bt.transitional(Bt.boolean),
      forcedJSONParsing: Bt.transitional(Bt.boolean),
      clarifyTimeoutError: Bt.transitional(Bt.boolean)
    }, !1), s != null && (R.isFunction(s) ? n.paramsSerializer = {
      serialize: s
    } : Co.assertOptions(s, {
      encode: Bt.function,
      serialize: Bt.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i = o && R.merge(
      o.common,
      o[n.method]
    );
    o && R.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (I) => {
        delete o[I];
      }
    ), n.headers = qe.concat(i, o);
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function(A) {
      typeof A.runWhen == "function" && A.runWhen(n) === !1 || (c = c && A.synchronous, a.unshift(A.fulfilled, A.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(A) {
      l.push(A.fulfilled, A.rejected);
    });
    let u, m = 0, p;
    if (!c) {
      const I = [hc.bind(this), void 0];
      for (I.unshift.apply(I, a), I.push.apply(I, l), p = I.length, u = Promise.resolve(n); m < p; )
        u = u.then(I[m++], I[m++]);
      return u;
    }
    p = a.length;
    let S = n;
    for (m = 0; m < p; ) {
      const I = a[m++], A = a[m++];
      try {
        S = I(S);
      } catch (w) {
        A.call(this, w);
        break;
      }
    }
    try {
      u = hc.call(this, S);
    } catch (I) {
      return Promise.reject(I);
    }
    for (m = 0, p = l.length; m < p; )
      u = u.then(l[m++], l[m++]);
    return u;
  }
  getUri(t) {
    t = yn(this.defaults, t);
    const n = $u(t.baseURL, t.url);
    return Uu(n, t.params, t.paramsSerializer);
  }
}
R.forEach(["delete", "get", "head", "options"], function(t) {
  _n.prototype[t] = function(n, r) {
    return this.request(yn(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
R.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(o, i, a) {
      return this.request(yn(a || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  _n.prototype[t] = n(), _n.prototype[t + "Form"] = n(!0);
});
class Oi {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const r = this;
    this.promise.then((s) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; )
        r._listeners[o](s);
      r._listeners = null;
    }), this.promise.then = (s) => {
      let o;
      const i = new Promise((a) => {
        r.subscribe(a), o = a;
      }).then(s);
      return i.cancel = function() {
        r.unsubscribe(o);
      }, i;
    }, t(function(o, i, a) {
      r.reason || (r.reason = new Bn(o, i, a), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Oi(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
}
function _0(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function g0(e) {
  return R.isObject(e) && e.isAxiosError === !0;
}
const Do = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Do).forEach(([e, t]) => {
  Do[t] = e;
});
function Wu(e) {
  const t = new _n(e), n = Tu(_n.prototype.request, t);
  return R.extend(n, _n.prototype, t, { allOwnKeys: !0 }), R.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(s) {
    return Wu(yn(e, s));
  }, n;
}
const Re = Wu(Er);
Re.Axios = _n;
Re.CanceledError = Bn;
Re.CancelToken = Oi;
Re.isCancel = Vu;
Re.VERSION = qu;
Re.toFormData = vs;
Re.AxiosError = te;
Re.Cancel = Re.CanceledError;
Re.all = function(t) {
  return Promise.all(t);
};
Re.spread = _0;
Re.isAxiosError = g0;
Re.mergeConfig = yn;
Re.AxiosHeaders = qe;
Re.formToJSON = (e) => ju(R.isHTMLForm(e) ? new FormData(e) : e);
Re.getAdapter = zu.getAdapter;
Re.HttpStatusCode = Do;
Re.default = Re;
const Xu = async (e) => {
  const { encoded: t } = await Bg({ userInfoApiUrl: e });
  return t;
}, Yu = (e) => e !== "" ? `&operator=OR&idRessource=${e}&nomRessource=${e}&idEditeur=${e}&nomEditeur=${e}&distributeurCom=${e}&nomDistributeurCom=${e}&distributeurTech=${e}&nomDistributeurTech=${e}` : "", b0 = async (e, t, n, r) => await Re.get(`${e}?ressourcesPerPage=20&page=${n}${Yu(r)}`, {
  headers: {
    Authorization: `Bearer ${await Xu(t)}`,
    "content-type": "application/jwt"
  }
}), E0 = async (e, t, n) => await Re.get(`${e}?${Yu(n)}`, {
  headers: {
    Authorization: `Bearer ${await Xu(t)}`,
    "content-type": "application/jwt"
  }
}), S0 = { class: "cadre-page-ressource" }, y0 = { class: "aside-page-ressource" }, O0 = ["nombre-ressources-total", "nombre-ressources-affichees"], v0 = /* @__PURE__ */ J("legende-ressource", { class: "legende-ressource-page-ressource" }, null, -1), I0 = { class: "main-page-ressource" }, A0 = ["ressources", "erreur", "lectureTerminee", "chargement"], T0 = /* @__PURE__ */ ht({
  __name: "PageRessource.ce",
  props: {
    baseApiUrl: { type: String },
    ressourcesDiffusablesApiUri: { type: String },
    ressourcesDiffusablesSizeApiUri: { type: String },
    userInfoApiUrl: { type: String }
  },
  setup(e) {
    const t = e, n = st([]), r = st(""), s = st(0), o = st(0), i = st(!1), a = st(!1), c = st("");
    ms(() => {
      m();
    });
    const l = () => {
      c.value = "", m();
    }, u = (S) => {
      c.value = S.detail[0], m();
    }, m = async () => {
      n.value = [], o.value = 0, r.value = "", a.value = !0;
      try {
        let S = await E0(
          t.baseApiUrl + t.ressourcesDiffusablesSizeApiUri,
          t.userInfoApiUrl,
          c.value
        );
        s.value = S.data.payload, s.value === 0 ? (i.value = !0, a.value = !1) : (i.value = !1, p());
      } catch (S) {
        r.value = S.toString() + (S.response != null ? " | " + S.response.data.message : ""), a.value = !1;
      }
    }, p = async () => {
      if (!i.value) {
        r.value = "", a.value = !0;
        try {
          let S = await b0(
            t.baseApiUrl + t.ressourcesDiffusablesApiUri,
            t.userInfoApiUrl,
            o.value++,
            c.value
          );
          n.value = n.value.concat(S.data.payload), n.value.length === s.value && (i.value = !0);
        } catch (S) {
          r.value = S.toString() + (S.response != null ? " | " + S.response.data.message : "");
        }
        a.value = !1;
      }
    };
    return (S, I) => (Se(), Ae("div", S0, [
      J("aside", y0, [
        J("recherche-ressource", {
          "nombre-ressources-total": s.value,
          "nombre-ressources-affichees": n.value.length,
          onRecommencerRechercheInput: u,
          onReinitialiserRecherche: l,
          ref: "rechercheRessource"
        }, null, 40, O0),
        v0
      ]),
      J("main", I0, [
        J("liste-ressources", {
          ressources: n.value,
          erreur: r.value,
          lectureTerminee: i.value,
          chargement: a.value,
          onGetPageSuivante: p,
          ref: "listeRessource"
        }, null, 40, A0)
      ])
    ]));
  }
}), N0 = ".cadre-page-ressource{display:flex;flex-direction:column;height:100%}.main-page-ressource{height:100%}.legende-ressource-page-ressource{display:none}@media (min-width: 1024px){.cadre-page-ressource{flex-direction:row}.aside-page-ressource{max-height:100%;min-width:20%;overflow-y:hidden;margin-right:-var(--ui-ressources-gar-margin,.6rem)}.main-page-ressource{min-width:80%}.legende-ressource-page-ressource{display:block}}", R0 = /* @__PURE__ */ Hn(T0, [["styles", [N0]]]);
var C0 = { GJS_DEBUG_TOPICS: "JS ERROR;JS LOG", LESSOPEN: "| /usr/bin/lesspipe %s", USER: "quentin", npm_config_user_agent: "yarn/4.3.1 npm/? node/v20.15.1 linux x64", GIO_MODULE_DIR: "/home/quentin/snap/code/common/.cache/gio-modules", XDG_SESSION_TYPE: "wayland", GIT_ASKPASS: "/snap/code/164/usr/share/code/resources/app/extensions/git/dist/askpass.sh", GTK_EXE_PREFIX_VSCODE_SNAP_ORIG: "", npm_node_execpath: "/tmp/xfs-4684104e/node", GDK_BACKEND_VSCODE_SNAP_ORIG: "", SHLVL: "1", HOME: "/home/quentin", CHROME_DESKTOP: "code-url-handler.desktop", LOCPATH_VSCODE_SNAP_ORIG: "", OLDPWD: "/home/quentin/git/recia-webcomponents", TERM_PROGRAM_VERSION: "1.91.1", DESKTOP_SESSION: "ubuntu", GTK_PATH: "", NVM_BIN: "/home/quentin/.nvm/versions/node/v20.15.1/bin", npm_package_json: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables/package.json", NVM_INC: "/home/quentin/.nvm/versions/node/v20.15.1/include/node", GTK_IM_MODULE_FILE: "/home/quentin/snap/code/common/.cache/immodules/immodules.cache", GIO_LAUNCHED_DESKTOP_FILE: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SHELL_SESSION_MODE: "ubuntu", GRADLE_HOME: "/home/quentin/.sdkman/candidates/gradle/current", GTK_MODULES: "gail:atk-bridge", GSETTINGS_SCHEMA_DIR_VSCODE_SNAP_ORIG: "", VSCODE_GIT_ASKPASS_MAIN: "/snap/code/164/usr/share/code/resources/app/extensions/git/dist/askpass-main.js", VSCODE_GIT_ASKPASS_NODE: "/snap/code/164/usr/share/code/code", MANAGERPID: "3711", SYSTEMD_EXEC_PID: "3889", IM_CONFIG_CHECK_ENV: "1", DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus", COLORTERM: "truecolor", LIBVIRT_DEFAULT_URI: "qemu:///system", GIO_LAUNCHED_DESKTOP_FILE_PID: "16499", NVM_DIR: "/home/quentin/.nvm", IM_CONFIG_PHASE: "1", WAYLAND_DISPLAY: "wayland-0", LOGNAME: "quentin", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", JOURNAL_STREAM: "8:53255", _: "/home/quentin/.nvm/versions/node/v20.15.1/bin/yarn", XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: "/etc/xdg/xdg-ubuntu:/etc/xdg", XDG_SESSION_CLASS: "user", XDG_DATA_DIRS_VSCODE_SNAP_ORIG: "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", USERNAME: "quentin", TERM: "xterm-256color", GNOME_DESKTOP_SESSION_ID: "this-is-deprecated", PATH: "/tmp/xfs-4684104e:/home/quentin/.local/bin:/home/quentin/.nvm/versions/node/v20.15.1/bin:/home/quentin/.sdkman/candidates/java/current/bin:/home/quentin/.sdkman/candidates/gradle/current/bin:/home/quentin/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin:/home/quentin/.local/share/JetBrains/Toolbox/scripts:/home/quentin/.local/share/JetBrains/Toolbox/scripts", SESSION_MANAGER: "local/DELL-QGuillemin:@/tmp/.ICE-unix/3867,unix/DELL-QGuillemin:/tmp/.ICE-unix/3867", SDKMAN_CANDIDATES_DIR: "/home/quentin/.sdkman/candidates", GTK_EXE_PREFIX: "/snap/code/164/usr", INVOCATION_ID: "37d65aa77adf4de6bee60e9a158053dc", npm_package_name: "@gip-recia/ui-ressources-gar", XDG_MENU_PREFIX: "gnome-", BAMF_DESKTOP_FILE_HINT: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SETUP_DISPLAY: ":1", XDG_RUNTIME_DIR: "/run/user/1000", GDK_BACKEND: "x11", DISPLAY: ":0", LOCPATH: "/snap/code/164/usr/lib/locale", LANG: "fr_FR.UTF-8", XDG_CURRENT_DESKTOP: "Unity", GIO_MODULE_DIR_VSCODE_SNAP_ORIG: "", XMODIFIERS: "@im=ibus", XDG_SESSION_DESKTOP: "ubuntu", XAUTHORITY: "/run/user/1000/.mutter-Xwaylandauth.C9O3Q2", LS_COLORS: "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:", VSCODE_GIT_IPC_HANDLE: "/run/user/1000/vscode-git-0200aebe89.sock", SDKMAN_DIR: "/home/quentin/.sdkman", SDKMAN_PLATFORM: "linuxx64", TERM_PROGRAM: "vscode", SSH_AGENT_LAUNCHER: "gnome-keyring", SSH_AUTH_SOCK: "/run/user/1000/keyring/ssh", GSETTINGS_SCHEMA_DIR: "/home/quentin/snap/code/164/.local/share/glib-2.0/schemas", ORIGINAL_XDG_CURRENT_DESKTOP: "ubuntu:GNOME", PROJECT_CWD: "/home/quentin/git/recia-webcomponents", SHELL: "/bin/bash", npm_package_version: "3.0.0", npm_lifecycle_event: "build", QT_ACCESSIBILITY: "1", GDMSESSION: "ubuntu", LESSCLOSE: "/usr/bin/lesspipe %s %s", GTK_PATH_VSCODE_SNAP_ORIG: "", GTK_IM_MODULE_FILE_VSCODE_SNAP_ORIG: "", GJS_DEBUG_OUTPUT: "stderr", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", QT_IM_MODULE: "ibus", JAVA_HOME: "/home/quentin/.sdkman/candidates/java/current", GPG_TTY: "/dev/pts/0", PWD: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables", BERRY_BIN_FOLDER: "/tmp/xfs-4684104e", npm_execpath: "/tmp/xfs-4684104e/yarn", XDG_CONFIG_DIRS: "/etc/xdg/xdg-ubuntu:/etc/xdg", NVM_CD_FLAGS: "", XDG_DATA_DIRS: "/home/quentin/snap/code/164/.local/share:/home/quentin/snap/code/164:/snap/code/164/usr/share:/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", INIT_CWD: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables", NODE_ENV: "production", VITE_BASE_URI: "/", VITE_BASE_API_URL: "/quentin", VITE_RESSOURCES_DIFFUSABLES_API_URI: "/api/ressources-diffusables", VITE_RESSOURCES_DIFFUSABLES_SIZE_API_URI: "/api/ressources-diffusables/size", VITE_USER_INFO_API_URI: "/portail/api/v5-1/userinfo?claims=private&groups=" };
const gc = () => {
};
let vi = {}, Ju = {}, Qu = null, Zu = {
  mark: gc,
  measure: gc
};
try {
  typeof window < "u" && (vi = window), typeof document < "u" && (Ju = document), typeof MutationObserver < "u" && (Qu = MutationObserver), typeof performance < "u" && (Zu = performance);
} catch {
}
const {
  userAgent: bc = ""
} = vi.navigator || {}, en = vi, pe = Ju, Ec = Qu, wr = Zu;
en.document;
const Vt = !!pe.documentElement && !!pe.head && typeof pe.addEventListener == "function" && typeof pe.createElement == "function", ef = ~bc.indexOf("MSIE") || ~bc.indexOf("Trident/");
var ge = "classic", tf = "duotone", tt = "sharp", nt = "sharp-duotone", D0 = [ge, tf, tt, nt], L0 = {
  classic: {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  sharp: {
    900: "fass",
    400: "fasr",
    300: "fasl",
    100: "fast"
  },
  "sharp-duotone": {
    900: "fasds"
  }
}, Sc = {
  kit: {
    fak: "kit",
    "fa-kit": "kit"
  },
  "kit-duotone": {
    fakd: "kit-duotone",
    "fa-kit-duotone": "kit-duotone"
  }
}, P0 = ["kit"], w0 = /fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/, x0 = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i, k0 = {
  "Font Awesome 5 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 5 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal"
  },
  "Font Awesome 5 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 5 Duotone": {
    900: "fad"
  }
}, M0 = {
  "Font Awesome 6 Free": {
    900: "fas",
    400: "far"
  },
  "Font Awesome 6 Pro": {
    900: "fas",
    400: "far",
    normal: "far",
    300: "fal",
    100: "fat"
  },
  "Font Awesome 6 Brands": {
    400: "fab",
    normal: "fab"
  },
  "Font Awesome 6 Duotone": {
    900: "fad"
  },
  "Font Awesome 6 Sharp": {
    900: "fass",
    400: "fasr",
    normal: "fasr",
    300: "fasl",
    100: "fast"
  },
  "Font Awesome 6 Sharp Duotone": {
    900: "fasds"
  }
}, F0 = {
  classic: {
    "fa-brands": "fab",
    "fa-duotone": "fad",
    "fa-light": "fal",
    "fa-regular": "far",
    "fa-solid": "fas",
    "fa-thin": "fat"
  },
  sharp: {
    "fa-solid": "fass",
    "fa-regular": "fasr",
    "fa-light": "fasl",
    "fa-thin": "fast"
  },
  "sharp-duotone": {
    "fa-solid": "fasds"
  }
}, U0 = {
  classic: ["fas", "far", "fal", "fat"],
  sharp: ["fass", "fasr", "fasl", "fast"],
  "sharp-duotone": ["fasds"]
}, G0 = {
  classic: {
    fab: "fa-brands",
    fad: "fa-duotone",
    fal: "fa-light",
    far: "fa-regular",
    fas: "fa-solid",
    fat: "fa-thin"
  },
  sharp: {
    fass: "fa-solid",
    fasr: "fa-regular",
    fasl: "fa-light",
    fast: "fa-thin"
  },
  "sharp-duotone": {
    fasds: "fa-solid"
  }
}, j0 = {
  classic: {
    solid: "fas",
    regular: "far",
    light: "fal",
    thin: "fat",
    duotone: "fad",
    brands: "fab"
  },
  sharp: {
    solid: "fass",
    regular: "fasr",
    light: "fasl",
    thin: "fast"
  },
  "sharp-duotone": {
    solid: "fasds"
  }
}, nf = {
  classic: {
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
    "fa-brands": "brands"
  },
  sharp: {
    fa: "solid",
    fass: "solid",
    "fa-solid": "solid",
    fasr: "regular",
    "fa-regular": "regular",
    fasl: "light",
    "fa-light": "light",
    fast: "thin",
    "fa-thin": "thin"
  },
  "sharp-duotone": {
    fa: "solid",
    fasds: "solid",
    "fa-solid": "solid"
  }
}, V0 = ["solid", "regular", "light", "thin", "duotone", "brands"], rf = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], H0 = rf.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), Yn = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, $0 = [...Object.keys(U0), ...V0, "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", Yn.GROUP, Yn.SWAP_OPACITY, Yn.PRIMARY, Yn.SECONDARY].concat(rf.map((e) => "".concat(e, "x"))).concat(H0.map((e) => "w-".concat(e))), B0 = {
  "Font Awesome Kit": {
    400: "fak",
    normal: "fak"
  },
  "Font Awesome Kit Duotone": {
    400: "fakd",
    normal: "fakd"
  }
}, K0 = {
  kit: {
    "fa-kit": "fak"
  },
  "kit-duotone": {
    "fa-kit-duotone": "fakd"
  }
}, z0 = {
  kit: {
    fak: "fa-kit"
  },
  "kit-duotone": {
    fakd: "fa-kit-duotone"
  }
}, yc = {
  kit: {
    kit: "fak"
  },
  "kit-duotone": {
    "kit-duotone": "fakd"
  }
};
const Mt = "___FONT_AWESOME___", Lo = 16, sf = "fa", of = "svg-inline--fa", On = "data-fa-i2svg", Po = "data-fa-pseudo-element", q0 = "data-fa-pseudo-element-pending", Ii = "data-prefix", Ai = "data-icon", Oc = "fontawesome-i2svg", W0 = "async", X0 = ["HTML", "HEAD", "STYLE", "SCRIPT"], af = (() => {
  try {
    return C0.NODE_ENV === "production";
  } catch {
    return !1;
  }
})(), cf = [ge, tt, nt];
function Sr(e) {
  return new Proxy(e, {
    get(t, n) {
      return n in t ? t[n] : t[ge];
    }
  });
}
const lf = {
  ...nf
};
lf[ge] = {
  ...nf[ge],
  ...Sc.kit,
  ...Sc["kit-duotone"]
};
const gn = Sr(lf), wo = {
  ...j0
};
wo[ge] = {
  ...wo[ge],
  ...yc.kit,
  ...yc["kit-duotone"]
};
const pr = Sr(wo), xo = {
  ...G0
};
xo[ge] = {
  ...xo[ge],
  ...z0.kit
};
const bn = Sr(xo), ko = {
  ...F0
};
ko[ge] = {
  ...ko[ge],
  ...K0.kit
};
const Y0 = Sr(ko), J0 = w0, uf = "fa-layers-text", Q0 = x0, Z0 = {
  ...L0
};
Sr(Z0);
const eb = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], zs = Yn, Un = /* @__PURE__ */ new Set();
Object.keys(pr[ge]).map(Un.add.bind(Un));
Object.keys(pr[tt]).map(Un.add.bind(Un));
Object.keys(pr[nt]).map(Un.add.bind(Un));
const tb = [...P0, ...$0], or = en.FontAwesomeConfig || {};
function nb(e) {
  var t = pe.querySelector("script[" + e + "]");
  if (t)
    return t.getAttribute(e);
}
function rb(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
pe && typeof pe.querySelector == "function" && [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]].forEach((t) => {
  let [n, r] = t;
  const s = rb(nb(n));
  s != null && (or[r] = s);
});
const ff = {
  styleDefault: "solid",
  familyDefault: "classic",
  cssPrefix: sf,
  replacementClass: of,
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
or.familyPrefix && (or.cssPrefix = or.familyPrefix);
const Gn = {
  ...ff,
  ...or
};
Gn.autoReplaceSvg || (Gn.observeMutations = !1);
const K = {};
Object.keys(ff).forEach((e) => {
  Object.defineProperty(K, e, {
    enumerable: !0,
    set: function(t) {
      Gn[e] = t, ir.forEach((n) => n(K));
    },
    get: function() {
      return Gn[e];
    }
  });
});
Object.defineProperty(K, "familyPrefix", {
  enumerable: !0,
  set: function(e) {
    Gn.cssPrefix = e, ir.forEach((t) => t(K));
  },
  get: function() {
    return Gn.cssPrefix;
  }
});
en.FontAwesomeConfig = K;
const ir = [];
function sb(e) {
  return ir.push(e), () => {
    ir.splice(ir.indexOf(e), 1);
  };
}
const Kt = Lo, It = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function ob(e) {
  if (!e || !Vt)
    return;
  const t = pe.createElement("style");
  t.setAttribute("type", "text/css"), t.innerHTML = e;
  const n = pe.head.childNodes;
  let r = null;
  for (let s = n.length - 1; s > -1; s--) {
    const o = n[s], i = (o.tagName || "").toUpperCase();
    ["STYLE", "LINK"].indexOf(i) > -1 && (r = o);
  }
  return pe.head.insertBefore(t, r), e;
}
const ib = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function hr() {
  let e = 12, t = "";
  for (; e-- > 0; )
    t += ib[Math.random() * 62 | 0];
  return t;
}
function Kn(e) {
  const t = [];
  for (let n = (e || []).length >>> 0; n--; )
    t[n] = e[n];
  return t;
}
function Ti(e) {
  return e.classList ? Kn(e.classList) : (e.getAttribute("class") || "").split(" ").filter((t) => t);
}
function df(e) {
  return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ab(e) {
  return Object.keys(e || {}).reduce((t, n) => t + "".concat(n, '="').concat(df(e[n]), '" '), "").trim();
}
function As(e) {
  return Object.keys(e || {}).reduce((t, n) => t + "".concat(n, ": ").concat(e[n].trim(), ";"), "");
}
function Ni(e) {
  return e.size !== It.size || e.x !== It.x || e.y !== It.y || e.rotate !== It.rotate || e.flipX || e.flipY;
}
function cb(e) {
  let {
    transform: t,
    containerWidth: n,
    iconWidth: r
  } = e;
  const s = {
    transform: "translate(".concat(n / 2, " 256)")
  }, o = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "), i = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), a = "rotate(".concat(t.rotate, " 0 0)"), c = {
    transform: "".concat(o, " ").concat(i, " ").concat(a)
  }, l = {
    transform: "translate(".concat(r / 2 * -1, " -256)")
  };
  return {
    outer: s,
    inner: c,
    path: l
  };
}
function lb(e) {
  let {
    transform: t,
    width: n = Lo,
    height: r = Lo,
    startCentered: s = !1
  } = e, o = "";
  return s && ef ? o += "translate(".concat(t.x / Kt - n / 2, "em, ").concat(t.y / Kt - r / 2, "em) ") : s ? o += "translate(calc(-50% + ".concat(t.x / Kt, "em), calc(-50% + ").concat(t.y / Kt, "em)) ") : o += "translate(".concat(t.x / Kt, "em, ").concat(t.y / Kt, "em) "), o += "scale(".concat(t.size / Kt * (t.flipX ? -1 : 1), ", ").concat(t.size / Kt * (t.flipY ? -1 : 1), ") "), o += "rotate(".concat(t.rotate, "deg) "), o;
}
var ub = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
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
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
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
  left: calc(-1 * var(--fa-li-width, 2em));
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
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
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
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
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
function mf() {
  const e = sf, t = of, n = K.cssPrefix, r = K.replacementClass;
  let s = ub;
  if (n !== e || r !== t) {
    const o = new RegExp("\\.".concat(e, "\\-"), "g"), i = new RegExp("\\--".concat(e, "\\-"), "g"), a = new RegExp("\\.".concat(t), "g");
    s = s.replace(o, ".".concat(n, "-")).replace(i, "--".concat(n, "-")).replace(a, ".".concat(r));
  }
  return s;
}
let vc = !1;
function qs() {
  K.autoAddCss && !vc && (ob(mf()), vc = !0);
}
var fb = {
  mixout() {
    return {
      dom: {
        css: mf,
        insertCss: qs
      }
    };
  },
  hooks() {
    return {
      beforeDOMElementCreation() {
        qs();
      },
      beforeI2svg() {
        qs();
      }
    };
  }
};
const Ft = en || {};
Ft[Mt] || (Ft[Mt] = {});
Ft[Mt].styles || (Ft[Mt].styles = {});
Ft[Mt].hooks || (Ft[Mt].hooks = {});
Ft[Mt].shims || (Ft[Mt].shims = []);
var At = Ft[Mt];
const pf = [], hf = function() {
  pe.removeEventListener("DOMContentLoaded", hf), ts = 1, pf.map((e) => e());
};
let ts = !1;
Vt && (ts = (pe.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(pe.readyState), ts || pe.addEventListener("DOMContentLoaded", hf));
function db(e) {
  Vt && (ts ? setTimeout(e, 0) : pf.push(e));
}
function yr(e) {
  const {
    tag: t,
    attributes: n = {},
    children: r = []
  } = e;
  return typeof e == "string" ? df(e) : "<".concat(t, " ").concat(ab(n), ">").concat(r.map(yr).join(""), "</").concat(t, ">");
}
function Ic(e, t, n) {
  if (e && e[t] && e[t][n])
    return {
      prefix: t,
      iconName: n,
      icon: e[t][n]
    };
}
var Ws = function(t, n, r, s) {
  var o = Object.keys(t), i = o.length, a = n, c, l, u;
  for (r === void 0 ? (c = 1, u = t[o[0]]) : (c = 0, u = r); c < i; c++)
    l = o[c], u = a(u, t[l], l, t);
  return u;
};
function mb(e) {
  const t = [];
  let n = 0;
  const r = e.length;
  for (; n < r; ) {
    const s = e.charCodeAt(n++);
    if (s >= 55296 && s <= 56319 && n < r) {
      const o = e.charCodeAt(n++);
      (o & 64512) == 56320 ? t.push(((s & 1023) << 10) + (o & 1023) + 65536) : (t.push(s), n--);
    } else
      t.push(s);
  }
  return t;
}
function Mo(e) {
  const t = mb(e);
  return t.length === 1 ? t[0].toString(16) : null;
}
function pb(e, t) {
  const n = e.length;
  let r = e.charCodeAt(t), s;
  return r >= 55296 && r <= 56319 && n > t + 1 && (s = e.charCodeAt(t + 1), s >= 56320 && s <= 57343) ? (r - 55296) * 1024 + s - 56320 + 65536 : r;
}
function Ac(e) {
  return Object.keys(e).reduce((t, n) => {
    const r = e[n];
    return !!r.icon ? t[r.iconName] = r.icon : t[n] = r, t;
  }, {});
}
function Fo(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const {
    skipHooks: r = !1
  } = n, s = Ac(t);
  typeof At.hooks.addPack == "function" && !r ? At.hooks.addPack(e, Ac(t)) : At.styles[e] = {
    ...At.styles[e] || {},
    ...s
  }, e === "fas" && Fo("fa", t);
}
const {
  styles: dn,
  shims: hb
} = At, _b = {
  [ge]: Object.values(bn[ge]),
  [tt]: Object.values(bn[tt]),
  [nt]: Object.values(bn[nt])
};
let Ri = null, _f = {}, gf = {}, bf = {}, Ef = {}, Sf = {};
const gb = {
  [ge]: Object.keys(gn[ge]),
  [tt]: Object.keys(gn[tt]),
  [nt]: Object.keys(gn[nt])
};
function bb(e) {
  return ~tb.indexOf(e);
}
function Eb(e, t) {
  const n = t.split("-"), r = n[0], s = n.slice(1).join("-");
  return r === e && s !== "" && !bb(s) ? s : null;
}
const yf = () => {
  const e = (r) => Ws(dn, (s, o, i) => (s[i] = Ws(o, r, {}), s), {});
  _f = e((r, s, o) => (s[3] && (r[s[3]] = o), s[2] && s[2].filter((a) => typeof a == "number").forEach((a) => {
    r[a.toString(16)] = o;
  }), r)), gf = e((r, s, o) => (r[o] = o, s[2] && s[2].filter((a) => typeof a == "string").forEach((a) => {
    r[a] = o;
  }), r)), Sf = e((r, s, o) => {
    const i = s[2];
    return r[o] = o, i.forEach((a) => {
      r[a] = o;
    }), r;
  });
  const t = "far" in dn || K.autoFetchSvg, n = Ws(hb, (r, s) => {
    const o = s[0];
    let i = s[1];
    const a = s[2];
    return i === "far" && !t && (i = "fas"), typeof o == "string" && (r.names[o] = {
      prefix: i,
      iconName: a
    }), typeof o == "number" && (r.unicodes[o.toString(16)] = {
      prefix: i,
      iconName: a
    }), r;
  }, {
    names: {},
    unicodes: {}
  });
  bf = n.names, Ef = n.unicodes, Ri = Ts(K.styleDefault, {
    family: K.familyDefault
  });
};
sb((e) => {
  Ri = Ts(e.styleDefault, {
    family: K.familyDefault
  });
});
yf();
function Ci(e, t) {
  return (_f[e] || {})[t];
}
function Sb(e, t) {
  return (gf[e] || {})[t];
}
function Jt(e, t) {
  return (Sf[e] || {})[t];
}
function Of(e) {
  return bf[e] || {
    prefix: null,
    iconName: null
  };
}
function yb(e) {
  const t = Ef[e], n = Ci("fas", e);
  return t || (n ? {
    prefix: "fas",
    iconName: n
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function tn() {
  return Ri;
}
const Di = () => ({
  prefix: null,
  iconName: null,
  rest: []
});
function Ts(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    family: n = ge
  } = t, r = gn[n][e], s = pr[n][e] || pr[n][r], o = e in At.styles ? e : null;
  return s || o || null;
}
const Ob = {
  [ge]: Object.keys(bn[ge]),
  [tt]: Object.keys(bn[tt]),
  [nt]: Object.keys(bn[nt])
};
function Ns(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    skipLookups: n = !1
  } = t, r = {
    [ge]: "".concat(K.cssPrefix, "-").concat(ge),
    [tt]: "".concat(K.cssPrefix, "-").concat(tt),
    [nt]: "".concat(K.cssPrefix, "-").concat(nt)
  };
  let s = null, o = ge;
  const i = D0.filter((c) => c !== tf);
  i.forEach((c) => {
    (e.includes(r[c]) || e.some((l) => Ob[c].includes(l))) && (o = c);
  });
  const a = e.reduce((c, l) => {
    const u = Eb(K.cssPrefix, l);
    if (dn[l] ? (l = _b[o].includes(l) ? Y0[o][l] : l, s = l, c.prefix = l) : gb[o].indexOf(l) > -1 ? (s = l, c.prefix = Ts(l, {
      family: o
    })) : u ? c.iconName = u : l !== K.replacementClass && !i.some((m) => l === r[m]) && c.rest.push(l), !n && c.prefix && c.iconName) {
      const m = s === "fa" ? Of(c.iconName) : {}, p = Jt(c.prefix, c.iconName);
      m.prefix && (s = null), c.iconName = m.iconName || p || c.iconName, c.prefix = m.prefix || c.prefix, c.prefix === "far" && !dn.far && dn.fas && !K.autoFetchSvg && (c.prefix = "fas");
    }
    return c;
  }, Di());
  return (e.includes("fa-brands") || e.includes("fab")) && (a.prefix = "fab"), (e.includes("fa-duotone") || e.includes("fad")) && (a.prefix = "fad"), !a.prefix && o === tt && (dn.fass || K.autoFetchSvg) && (a.prefix = "fass", a.iconName = Jt(a.prefix, a.iconName) || a.iconName), !a.prefix && o === nt && (dn.fasds || K.autoFetchSvg) && (a.prefix = "fasds", a.iconName = Jt(a.prefix, a.iconName) || a.iconName), (a.prefix === "fa" || s === "fa") && (a.prefix = tn() || "fas"), a;
}
class vb {
  constructor() {
    this.definitions = {};
  }
  add() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    const s = n.reduce(this._pullDefinitions, {});
    Object.keys(s).forEach((o) => {
      this.definitions[o] = {
        ...this.definitions[o] || {},
        ...s[o]
      }, Fo(o, s[o]);
      const i = bn[ge][o];
      i && Fo(i, s[o]), yf();
    });
  }
  reset() {
    this.definitions = {};
  }
  _pullDefinitions(t, n) {
    const r = n.prefix && n.iconName && n.icon ? {
      0: n
    } : n;
    return Object.keys(r).map((s) => {
      const {
        prefix: o,
        iconName: i,
        icon: a
      } = r[s], c = a[2];
      t[o] || (t[o] = {}), c.length > 0 && c.forEach((l) => {
        typeof l == "string" && (t[o][l] = a);
      }), t[o][i] = a;
    }), t;
  }
}
let Tc = [], Cn = {};
const wn = {}, Ib = Object.keys(wn);
function Ab(e, t) {
  let {
    mixoutsTo: n
  } = t;
  return Tc = e, Cn = {}, Object.keys(wn).forEach((r) => {
    Ib.indexOf(r) === -1 && delete wn[r];
  }), Tc.forEach((r) => {
    const s = r.mixout ? r.mixout() : {};
    if (Object.keys(s).forEach((o) => {
      typeof s[o] == "function" && (n[o] = s[o]), typeof s[o] == "object" && Object.keys(s[o]).forEach((i) => {
        n[o] || (n[o] = {}), n[o][i] = s[o][i];
      });
    }), r.hooks) {
      const o = r.hooks();
      Object.keys(o).forEach((i) => {
        Cn[i] || (Cn[i] = []), Cn[i].push(o[i]);
      });
    }
    r.provides && r.provides(wn);
  }), n;
}
function Uo(e, t) {
  for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), s = 2; s < n; s++)
    r[s - 2] = arguments[s];
  return (Cn[e] || []).forEach((i) => {
    t = i.apply(null, [t, ...r]);
  }), t;
}
function vn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  (Cn[e] || []).forEach((o) => {
    o.apply(null, n);
  });
}
function nn() {
  const e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
  return wn[e] ? wn[e].apply(null, t) : void 0;
}
function Go(e) {
  e.prefix === "fa" && (e.prefix = "fas");
  let {
    iconName: t
  } = e;
  const n = e.prefix || tn();
  if (t)
    return t = Jt(n, t) || t, Ic(vf.definitions, n, t) || Ic(At.styles, n, t);
}
const vf = new vb(), Tb = () => {
  K.autoReplaceSvg = !1, K.observeMutations = !1, vn("noAuto");
}, Nb = {
  i2svg: function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Vt ? (vn("beforeI2svg", e), nn("pseudoElements2svg", e), nn("i2svg", e)) : Promise.reject(new Error("Operation requires a DOM of some kind."));
  },
  watch: function() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const {
      autoReplaceSvgRoot: t
    } = e;
    K.autoReplaceSvg === !1 && (K.autoReplaceSvg = !0), K.observeMutations = !0, db(() => {
      Cb({
        autoReplaceSvgRoot: t
      }), vn("watch", e);
    });
  }
}, Rb = {
  icon: (e) => {
    if (e === null)
      return null;
    if (typeof e == "object" && e.prefix && e.iconName)
      return {
        prefix: e.prefix,
        iconName: Jt(e.prefix, e.iconName) || e.iconName
      };
    if (Array.isArray(e) && e.length === 2) {
      const t = e[1].indexOf("fa-") === 0 ? e[1].slice(3) : e[1], n = Ts(e[0]);
      return {
        prefix: n,
        iconName: Jt(n, t) || t
      };
    }
    if (typeof e == "string" && (e.indexOf("".concat(K.cssPrefix, "-")) > -1 || e.match(J0))) {
      const t = Ns(e.split(" "), {
        skipLookups: !0
      });
      return {
        prefix: t.prefix || tn(),
        iconName: Jt(t.prefix, t.iconName) || t.iconName
      };
    }
    if (typeof e == "string") {
      const t = tn();
      return {
        prefix: t,
        iconName: Jt(t, e) || e
      };
    }
  }
}, rt = {
  noAuto: Tb,
  config: K,
  dom: Nb,
  parse: Rb,
  library: vf,
  findIconDefinition: Go,
  toHtml: yr
}, Cb = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    autoReplaceSvgRoot: t = pe
  } = e;
  (Object.keys(At.styles).length > 0 || K.autoFetchSvg) && Vt && K.autoReplaceSvg && rt.dom.i2svg({
    node: t
  });
};
function Rs(e, t) {
  return Object.defineProperty(e, "abstract", {
    get: t
  }), Object.defineProperty(e, "html", {
    get: function() {
      return e.abstract.map((n) => yr(n));
    }
  }), Object.defineProperty(e, "node", {
    get: function() {
      if (!Vt) return;
      const n = pe.createElement("div");
      return n.innerHTML = e.html, n.children;
    }
  }), e;
}
function Db(e) {
  let {
    children: t,
    main: n,
    mask: r,
    attributes: s,
    styles: o,
    transform: i
  } = e;
  if (Ni(i) && n.found && !r.found) {
    const {
      width: a,
      height: c
    } = n, l = {
      x: a / c / 2,
      y: 0.5
    };
    s.style = As({
      ...o,
      "transform-origin": "".concat(l.x + i.x / 16, "em ").concat(l.y + i.y / 16, "em")
    });
  }
  return [{
    tag: "svg",
    attributes: s,
    children: t
  }];
}
function Lb(e) {
  let {
    prefix: t,
    iconName: n,
    children: r,
    attributes: s,
    symbol: o
  } = e;
  const i = o === !0 ? "".concat(t, "-").concat(K.cssPrefix, "-").concat(n) : o;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: {
        ...s,
        id: i
      },
      children: r
    }]
  }];
}
function Li(e) {
  const {
    icons: {
      main: t,
      mask: n
    },
    prefix: r,
    iconName: s,
    transform: o,
    symbol: i,
    title: a,
    maskId: c,
    titleId: l,
    extra: u,
    watchable: m = !1
  } = e, {
    width: p,
    height: S
  } = n.found ? n : t, I = r === "fak", A = [K.replacementClass, s ? "".concat(K.cssPrefix, "-").concat(s) : ""].filter((L) => u.classes.indexOf(L) === -1).filter((L) => L !== "" || !!L).concat(u.classes).join(" ");
  let w = {
    children: [],
    attributes: {
      ...u.attributes,
      "data-prefix": r,
      "data-icon": s,
      class: A,
      role: u.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(p, " ").concat(S)
    }
  };
  const v = I && !~u.classes.indexOf("fa-fw") ? {
    width: "".concat(p / S * 16 * 0.0625, "em")
  } : {};
  m && (w.attributes[On] = ""), a && (w.children.push({
    tag: "title",
    attributes: {
      id: w.attributes["aria-labelledby"] || "title-".concat(l || hr())
    },
    children: [a]
  }), delete w.attributes.title);
  const C = {
    ...w,
    prefix: r,
    iconName: s,
    main: t,
    mask: n,
    maskId: c,
    transform: o,
    symbol: i,
    styles: {
      ...v,
      ...u.styles
    }
  }, {
    children: g,
    attributes: O
  } = n.found && t.found ? nn("generateAbstractMask", C) || {
    children: [],
    attributes: {}
  } : nn("generateAbstractIcon", C) || {
    children: [],
    attributes: {}
  };
  return C.children = g, C.attributes = O, i ? Lb(C) : Db(C);
}
function Nc(e) {
  const {
    content: t,
    width: n,
    height: r,
    transform: s,
    title: o,
    extra: i,
    watchable: a = !1
  } = e, c = {
    ...i.attributes,
    ...o ? {
      title: o
    } : {},
    class: i.classes.join(" ")
  };
  a && (c[On] = "");
  const l = {
    ...i.styles
  };
  Ni(s) && (l.transform = lb({
    transform: s,
    startCentered: !0,
    width: n,
    height: r
  }), l["-webkit-transform"] = l.transform);
  const u = As(l);
  u.length > 0 && (c.style = u);
  const m = [];
  return m.push({
    tag: "span",
    attributes: c,
    children: [t]
  }), o && m.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [o]
  }), m;
}
function Pb(e) {
  const {
    content: t,
    title: n,
    extra: r
  } = e, s = {
    ...r.attributes,
    ...n ? {
      title: n
    } : {},
    class: r.classes.join(" ")
  }, o = As(r.styles);
  o.length > 0 && (s.style = o);
  const i = [];
  return i.push({
    tag: "span",
    attributes: s,
    children: [t]
  }), n && i.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [n]
  }), i;
}
const {
  styles: Xs
} = At;
function jo(e) {
  const t = e[0], n = e[1], [r] = e.slice(4);
  let s = null;
  return Array.isArray(r) ? s = {
    tag: "g",
    attributes: {
      class: "".concat(K.cssPrefix, "-").concat(zs.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(K.cssPrefix, "-").concat(zs.SECONDARY),
        fill: "currentColor",
        d: r[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(K.cssPrefix, "-").concat(zs.PRIMARY),
        fill: "currentColor",
        d: r[1]
      }
    }]
  } : s = {
    tag: "path",
    attributes: {
      fill: "currentColor",
      d: r
    }
  }, {
    found: !0,
    width: t,
    height: n,
    icon: s
  };
}
const wb = {
  found: !1,
  width: 512,
  height: 512
};
function xb(e, t) {
  !af && !K.showMissingIcons && e && console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
}
function Vo(e, t) {
  let n = t;
  return t === "fa" && K.styleDefault !== null && (t = tn()), new Promise((r, s) => {
    if (n === "fa") {
      const o = Of(e) || {};
      e = o.iconName || e, t = o.prefix || t;
    }
    if (e && t && Xs[t] && Xs[t][e]) {
      const o = Xs[t][e];
      return r(jo(o));
    }
    xb(e, t), r({
      ...wb,
      icon: K.showMissingIcons && e ? nn("missingIconAbstract") || {} : {}
    });
  });
}
const Rc = () => {
}, Ho = K.measurePerformance && wr && wr.mark && wr.measure ? wr : {
  mark: Rc,
  measure: Rc
}, Jn = 'FA "6.6.0"', kb = (e) => (Ho.mark("".concat(Jn, " ").concat(e, " begins")), () => If(e)), If = (e) => {
  Ho.mark("".concat(Jn, " ").concat(e, " ends")), Ho.measure("".concat(Jn, " ").concat(e), "".concat(Jn, " ").concat(e, " begins"), "".concat(Jn, " ").concat(e, " ends"));
};
var Pi = {
  begin: kb,
  end: If
};
const Hr = () => {
};
function Cc(e) {
  return typeof (e.getAttribute ? e.getAttribute(On) : null) == "string";
}
function Mb(e) {
  const t = e.getAttribute ? e.getAttribute(Ii) : null, n = e.getAttribute ? e.getAttribute(Ai) : null;
  return t && n;
}
function Fb(e) {
  return e && e.classList && e.classList.contains && e.classList.contains(K.replacementClass);
}
function Ub() {
  return K.autoReplaceSvg === !0 ? $r.replace : $r[K.autoReplaceSvg] || $r.replace;
}
function Gb(e) {
  return pe.createElementNS("http://www.w3.org/2000/svg", e);
}
function jb(e) {
  return pe.createElement(e);
}
function Af(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    ceFn: n = e.tag === "svg" ? Gb : jb
  } = t;
  if (typeof e == "string")
    return pe.createTextNode(e);
  const r = n(e.tag);
  return Object.keys(e.attributes || []).forEach(function(o) {
    r.setAttribute(o, e.attributes[o]);
  }), (e.children || []).forEach(function(o) {
    r.appendChild(Af(o, {
      ceFn: n
    }));
  }), r;
}
function Vb(e) {
  let t = " ".concat(e.outerHTML, " ");
  return t = "".concat(t, "Font Awesome fontawesome.com "), t;
}
const $r = {
  replace: function(e) {
    const t = e[0];
    if (t.parentNode)
      if (e[1].forEach((n) => {
        t.parentNode.insertBefore(Af(n), t);
      }), t.getAttribute(On) === null && K.keepOriginalSource) {
        let n = pe.createComment(Vb(t));
        t.parentNode.replaceChild(n, t);
      } else
        t.remove();
  },
  nest: function(e) {
    const t = e[0], n = e[1];
    if (~Ti(t).indexOf(K.replacementClass))
      return $r.replace(e);
    const r = new RegExp("".concat(K.cssPrefix, "-.*"));
    if (delete n[0].attributes.id, n[0].attributes.class) {
      const o = n[0].attributes.class.split(" ").reduce((i, a) => (a === K.replacementClass || a.match(r) ? i.toSvg.push(a) : i.toNode.push(a), i), {
        toNode: [],
        toSvg: []
      });
      n[0].attributes.class = o.toSvg.join(" "), o.toNode.length === 0 ? t.removeAttribute("class") : t.setAttribute("class", o.toNode.join(" "));
    }
    const s = n.map((o) => yr(o)).join(`
`);
    t.setAttribute(On, ""), t.innerHTML = s;
  }
};
function Dc(e) {
  e();
}
function Tf(e, t) {
  const n = typeof t == "function" ? t : Hr;
  if (e.length === 0)
    n();
  else {
    let r = Dc;
    K.mutateApproach === W0 && (r = en.requestAnimationFrame || Dc), r(() => {
      const s = Ub(), o = Pi.begin("mutate");
      e.map(s), o(), n();
    });
  }
}
let wi = !1;
function Nf() {
  wi = !0;
}
function $o() {
  wi = !1;
}
let ns = null;
function Lc(e) {
  if (!Ec || !K.observeMutations)
    return;
  const {
    treeCallback: t = Hr,
    nodeCallback: n = Hr,
    pseudoElementsCallback: r = Hr,
    observeMutationsRoot: s = pe
  } = e;
  ns = new Ec((o) => {
    if (wi) return;
    const i = tn();
    Kn(o).forEach((a) => {
      if (a.type === "childList" && a.addedNodes.length > 0 && !Cc(a.addedNodes[0]) && (K.searchPseudoElements && r(a.target), t(a.target)), a.type === "attributes" && a.target.parentNode && K.searchPseudoElements && r(a.target.parentNode), a.type === "attributes" && Cc(a.target) && ~eb.indexOf(a.attributeName))
        if (a.attributeName === "class" && Mb(a.target)) {
          const {
            prefix: c,
            iconName: l
          } = Ns(Ti(a.target));
          a.target.setAttribute(Ii, c || i), l && a.target.setAttribute(Ai, l);
        } else Fb(a.target) && n(a.target);
    });
  }), Vt && ns.observe(s, {
    childList: !0,
    attributes: !0,
    characterData: !0,
    subtree: !0
  });
}
function Hb() {
  ns && ns.disconnect();
}
function $b(e) {
  const t = e.getAttribute("style");
  let n = [];
  return t && (n = t.split(";").reduce((r, s) => {
    const o = s.split(":"), i = o[0], a = o.slice(1);
    return i && a.length > 0 && (r[i] = a.join(":").trim()), r;
  }, {})), n;
}
function Bb(e) {
  const t = e.getAttribute("data-prefix"), n = e.getAttribute("data-icon"), r = e.innerText !== void 0 ? e.innerText.trim() : "";
  let s = Ns(Ti(e));
  return s.prefix || (s.prefix = tn()), t && n && (s.prefix = t, s.iconName = n), s.iconName && s.prefix || (s.prefix && r.length > 0 && (s.iconName = Sb(s.prefix, e.innerText) || Ci(s.prefix, Mo(e.innerText))), !s.iconName && K.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (s.iconName = e.firstChild.data)), s;
}
function Kb(e) {
  const t = Kn(e.attributes).reduce((s, o) => (s.name !== "class" && s.name !== "style" && (s[o.name] = o.value), s), {}), n = e.getAttribute("title"), r = e.getAttribute("data-fa-title-id");
  return K.autoA11y && (n ? t["aria-labelledby"] = "".concat(K.replacementClass, "-title-").concat(r || hr()) : (t["aria-hidden"] = "true", t.focusable = "false")), t;
}
function zb() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: It,
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
function Pc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: !0
  };
  const {
    iconName: n,
    prefix: r,
    rest: s
  } = Bb(e), o = Kb(e), i = Uo("parseNodeAttributes", {}, e);
  let a = t.styleParser ? $b(e) : [];
  return {
    iconName: n,
    title: e.getAttribute("title"),
    titleId: e.getAttribute("data-fa-title-id"),
    prefix: r,
    transform: It,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: !1,
    extra: {
      classes: s,
      styles: a,
      attributes: o
    },
    ...i
  };
}
const {
  styles: qb
} = At;
function Rf(e) {
  const t = K.autoReplaceSvg === "nest" ? Pc(e, {
    styleParser: !1
  }) : Pc(e);
  return ~t.extra.classes.indexOf(uf) ? nn("generateLayersText", e, t) : nn("generateSvgReplacementMutation", e, t);
}
let Nt = /* @__PURE__ */ new Set();
cf.map((e) => {
  Nt.add("fa-".concat(e));
});
Object.keys(gn[ge]).map(Nt.add.bind(Nt));
Object.keys(gn[tt]).map(Nt.add.bind(Nt));
Object.keys(gn[nt]).map(Nt.add.bind(Nt));
Nt = [...Nt];
function wc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!Vt) return Promise.resolve();
  const n = pe.documentElement.classList, r = (u) => n.add("".concat(Oc, "-").concat(u)), s = (u) => n.remove("".concat(Oc, "-").concat(u)), o = K.autoFetchSvg ? Nt : cf.map((u) => "fa-".concat(u)).concat(Object.keys(qb));
  o.includes("fa") || o.push("fa");
  const i = [".".concat(uf, ":not([").concat(On, "])")].concat(o.map((u) => ".".concat(u, ":not([").concat(On, "])"))).join(", ");
  if (i.length === 0)
    return Promise.resolve();
  let a = [];
  try {
    a = Kn(e.querySelectorAll(i));
  } catch {
  }
  if (a.length > 0)
    r("pending"), s("complete");
  else
    return Promise.resolve();
  const c = Pi.begin("onTree"), l = a.reduce((u, m) => {
    try {
      const p = Rf(m);
      p && u.push(p);
    } catch (p) {
      af || p.name === "MissingIcon" && console.error(p);
    }
    return u;
  }, []);
  return new Promise((u, m) => {
    Promise.all(l).then((p) => {
      Tf(p, () => {
        r("active"), r("complete"), s("pending"), typeof t == "function" && t(), c(), u();
      });
    }).catch((p) => {
      c(), m(p);
    });
  });
}
function Wb(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  Rf(e).then((n) => {
    n && Tf([n], t);
  });
}
function Xb(e) {
  return function(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = (t || {}).icon ? t : Go(t || {});
    let {
      mask: s
    } = n;
    return s && (s = (s || {}).icon ? s : Go(s || {})), e(r, {
      ...n,
      mask: s
    });
  };
}
const Yb = function(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    transform: n = It,
    symbol: r = !1,
    mask: s = null,
    maskId: o = null,
    title: i = null,
    titleId: a = null,
    classes: c = [],
    attributes: l = {},
    styles: u = {}
  } = t;
  if (!e) return;
  const {
    prefix: m,
    iconName: p,
    icon: S
  } = e;
  return Rs({
    type: "icon",
    ...e
  }, () => (vn("beforeDOMElementCreation", {
    iconDefinition: e,
    params: t
  }), K.autoA11y && (i ? l["aria-labelledby"] = "".concat(K.replacementClass, "-title-").concat(a || hr()) : (l["aria-hidden"] = "true", l.focusable = "false")), Li({
    icons: {
      main: jo(S),
      mask: s ? jo(s.icon) : {
        found: !1,
        width: null,
        height: null,
        icon: {}
      }
    },
    prefix: m,
    iconName: p,
    transform: {
      ...It,
      ...n
    },
    symbol: r,
    title: i,
    maskId: o,
    titleId: a,
    extra: {
      attributes: l,
      styles: u,
      classes: c
    }
  })));
};
var Jb = {
  mixout() {
    return {
      icon: Xb(Yb)
    };
  },
  hooks() {
    return {
      mutationObserverCallbacks(e) {
        return e.treeCallback = wc, e.nodeCallback = Wb, e;
      }
    };
  },
  provides(e) {
    e.i2svg = function(t) {
      const {
        node: n = pe,
        callback: r = () => {
        }
      } = t;
      return wc(n, r);
    }, e.generateSvgReplacementMutation = function(t, n) {
      const {
        iconName: r,
        title: s,
        titleId: o,
        prefix: i,
        transform: a,
        symbol: c,
        mask: l,
        maskId: u,
        extra: m
      } = n;
      return new Promise((p, S) => {
        Promise.all([Vo(r, i), l.iconName ? Vo(l.iconName, l.prefix) : Promise.resolve({
          found: !1,
          width: 512,
          height: 512,
          icon: {}
        })]).then((I) => {
          let [A, w] = I;
          p([t, Li({
            icons: {
              main: A,
              mask: w
            },
            prefix: i,
            iconName: r,
            transform: a,
            symbol: c,
            maskId: u,
            title: s,
            titleId: o,
            extra: m,
            watchable: !0
          })]);
        }).catch(S);
      });
    }, e.generateAbstractIcon = function(t) {
      let {
        children: n,
        attributes: r,
        main: s,
        transform: o,
        styles: i
      } = t;
      const a = As(i);
      a.length > 0 && (r.style = a);
      let c;
      return Ni(o) && (c = nn("generateAbstractTransformGrouping", {
        main: s,
        transform: o,
        containerWidth: s.width,
        iconWidth: s.width
      })), n.push(c || s.icon), {
        children: n,
        attributes: r
      };
    };
  }
}, Qb = {
  mixout() {
    return {
      layer(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          classes: n = []
        } = t;
        return Rs({
          type: "layer"
        }, () => {
          vn("beforeDOMElementCreation", {
            assembler: e,
            params: t
          });
          let r = [];
          return e((s) => {
            Array.isArray(s) ? s.map((o) => {
              r = r.concat(o.abstract);
            }) : r = r.concat(s.abstract);
          }), [{
            tag: "span",
            attributes: {
              class: ["".concat(K.cssPrefix, "-layers"), ...n].join(" ")
            },
            children: r
          }];
        });
      }
    };
  }
}, Zb = {
  mixout() {
    return {
      counter(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          title: n = null,
          classes: r = [],
          attributes: s = {},
          styles: o = {}
        } = t;
        return Rs({
          type: "counter",
          content: e
        }, () => (vn("beforeDOMElementCreation", {
          content: e,
          params: t
        }), Pb({
          content: e.toString(),
          title: n,
          extra: {
            attributes: s,
            styles: o,
            classes: ["".concat(K.cssPrefix, "-layers-counter"), ...r]
          }
        })));
      }
    };
  }
}, eE = {
  mixout() {
    return {
      text(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const {
          transform: n = It,
          title: r = null,
          classes: s = [],
          attributes: o = {},
          styles: i = {}
        } = t;
        return Rs({
          type: "text",
          content: e
        }, () => (vn("beforeDOMElementCreation", {
          content: e,
          params: t
        }), Nc({
          content: e,
          transform: {
            ...It,
            ...n
          },
          title: r,
          extra: {
            attributes: o,
            styles: i,
            classes: ["".concat(K.cssPrefix, "-layers-text"), ...s]
          }
        })));
      }
    };
  },
  provides(e) {
    e.generateLayersText = function(t, n) {
      const {
        title: r,
        transform: s,
        extra: o
      } = n;
      let i = null, a = null;
      if (ef) {
        const c = parseInt(getComputedStyle(t).fontSize, 10), l = t.getBoundingClientRect();
        i = l.width / c, a = l.height / c;
      }
      return K.autoA11y && !r && (o.attributes["aria-hidden"] = "true"), Promise.resolve([t, Nc({
        content: t.innerHTML,
        width: i,
        height: a,
        transform: s,
        title: r,
        extra: o,
        watchable: !0
      })]);
    };
  }
};
const tE = new RegExp('"', "ug"), xc = [1105920, 1112319], kc = {
  FontAwesome: {
    normal: "fas",
    400: "fas"
  },
  ...M0,
  ...k0,
  ...B0
}, Bo = Object.keys(kc).reduce((e, t) => (e[t.toLowerCase()] = kc[t], e), {}), nE = Object.keys(Bo).reduce((e, t) => {
  const n = Bo[t];
  return e[t] = n[900] || [...Object.entries(n)][0][1], e;
}, {});
function rE(e) {
  const t = e.replace(tE, ""), n = pb(t, 0), r = n >= xc[0] && n <= xc[1], s = t.length === 2 ? t[0] === t[1] : !1;
  return {
    value: Mo(s ? t[0] : t),
    isSecondary: r || s
  };
}
function sE(e, t) {
  const n = e.replace(/^['"]|['"]$/g, "").toLowerCase(), r = parseInt(t), s = isNaN(r) ? "normal" : r;
  return (Bo[n] || {})[s] || nE[n];
}
function Mc(e, t) {
  const n = "".concat(q0).concat(t.replace(":", "-"));
  return new Promise((r, s) => {
    if (e.getAttribute(n) !== null)
      return r();
    const i = Kn(e.children).filter((p) => p.getAttribute(Po) === t)[0], a = en.getComputedStyle(e, t), c = a.getPropertyValue("font-family"), l = c.match(Q0), u = a.getPropertyValue("font-weight"), m = a.getPropertyValue("content");
    if (i && !l)
      return e.removeChild(i), r();
    if (l && m !== "none" && m !== "") {
      const p = a.getPropertyValue("content");
      let S = sE(c, u);
      const {
        value: I,
        isSecondary: A
      } = rE(p), w = l[0].startsWith("FontAwesome");
      let v = Ci(S, I), C = v;
      if (w) {
        const g = yb(I);
        g.iconName && g.prefix && (v = g.iconName, S = g.prefix);
      }
      if (v && !A && (!i || i.getAttribute(Ii) !== S || i.getAttribute(Ai) !== C)) {
        e.setAttribute(n, C), i && e.removeChild(i);
        const g = zb(), {
          extra: O
        } = g;
        O.attributes[Po] = t, Vo(v, S).then((L) => {
          const y = Li({
            ...g,
            icons: {
              main: L,
              mask: Di()
            },
            prefix: S,
            iconName: C,
            extra: O,
            watchable: !0
          }), P = pe.createElementNS("http://www.w3.org/2000/svg", "svg");
          t === "::before" ? e.insertBefore(P, e.firstChild) : e.appendChild(P), P.outerHTML = y.map((V) => yr(V)).join(`
`), e.removeAttribute(n), r();
        }).catch(s);
      } else
        r();
    } else
      r();
  });
}
function oE(e) {
  return Promise.all([Mc(e, "::before"), Mc(e, "::after")]);
}
function iE(e) {
  return e.parentNode !== document.head && !~X0.indexOf(e.tagName.toUpperCase()) && !e.getAttribute(Po) && (!e.parentNode || e.parentNode.tagName !== "svg");
}
function Fc(e) {
  if (Vt)
    return new Promise((t, n) => {
      const r = Kn(e.querySelectorAll("*")).filter(iE).map(oE), s = Pi.begin("searchPseudoElements");
      Nf(), Promise.all(r).then(() => {
        s(), $o(), t();
      }).catch(() => {
        s(), $o(), n();
      });
    });
}
var aE = {
  hooks() {
    return {
      mutationObserverCallbacks(e) {
        return e.pseudoElementsCallback = Fc, e;
      }
    };
  },
  provides(e) {
    e.pseudoElements2svg = function(t) {
      const {
        node: n = pe
      } = t;
      K.searchPseudoElements && Fc(n);
    };
  }
};
let Uc = !1;
var cE = {
  mixout() {
    return {
      dom: {
        unwatch() {
          Nf(), Uc = !0;
        }
      }
    };
  },
  hooks() {
    return {
      bootstrap() {
        Lc(Uo("mutationObserverCallbacks", {}));
      },
      noAuto() {
        Hb();
      },
      watch(e) {
        const {
          observeMutationsRoot: t
        } = e;
        Uc ? $o() : Lc(Uo("mutationObserverCallbacks", {
          observeMutationsRoot: t
        }));
      }
    };
  }
};
const Gc = (e) => {
  let t = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return e.toLowerCase().split(" ").reduce((n, r) => {
    const s = r.toLowerCase().split("-"), o = s[0];
    let i = s.slice(1).join("-");
    if (o && i === "h")
      return n.flipX = !0, n;
    if (o && i === "v")
      return n.flipY = !0, n;
    if (i = parseFloat(i), isNaN(i))
      return n;
    switch (o) {
      case "grow":
        n.size = n.size + i;
        break;
      case "shrink":
        n.size = n.size - i;
        break;
      case "left":
        n.x = n.x - i;
        break;
      case "right":
        n.x = n.x + i;
        break;
      case "up":
        n.y = n.y - i;
        break;
      case "down":
        n.y = n.y + i;
        break;
      case "rotate":
        n.rotate = n.rotate + i;
        break;
    }
    return n;
  }, t);
};
var lE = {
  mixout() {
    return {
      parse: {
        transform: (e) => Gc(e)
      }
    };
  },
  hooks() {
    return {
      parseNodeAttributes(e, t) {
        const n = t.getAttribute("data-fa-transform");
        return n && (e.transform = Gc(n)), e;
      }
    };
  },
  provides(e) {
    e.generateAbstractTransformGrouping = function(t) {
      let {
        main: n,
        transform: r,
        containerWidth: s,
        iconWidth: o
      } = t;
      const i = {
        transform: "translate(".concat(s / 2, " 256)")
      }, a = "translate(".concat(r.x * 32, ", ").concat(r.y * 32, ") "), c = "scale(".concat(r.size / 16 * (r.flipX ? -1 : 1), ", ").concat(r.size / 16 * (r.flipY ? -1 : 1), ") "), l = "rotate(".concat(r.rotate, " 0 0)"), u = {
        transform: "".concat(a, " ").concat(c, " ").concat(l)
      }, m = {
        transform: "translate(".concat(o / 2 * -1, " -256)")
      }, p = {
        outer: i,
        inner: u,
        path: m
      };
      return {
        tag: "g",
        attributes: {
          ...p.outer
        },
        children: [{
          tag: "g",
          attributes: {
            ...p.inner
          },
          children: [{
            tag: n.icon.tag,
            children: n.icon.children,
            attributes: {
              ...n.icon.attributes,
              ...p.path
            }
          }]
        }]
      };
    };
  }
};
const Ys = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function jc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e;
}
function uE(e) {
  return e.tag === "g" ? e.children : [e];
}
var fE = {
  hooks() {
    return {
      parseNodeAttributes(e, t) {
        const n = t.getAttribute("data-fa-mask"), r = n ? Ns(n.split(" ").map((s) => s.trim())) : Di();
        return r.prefix || (r.prefix = tn()), e.mask = r, e.maskId = t.getAttribute("data-fa-mask-id"), e;
      }
    };
  },
  provides(e) {
    e.generateAbstractMask = function(t) {
      let {
        children: n,
        attributes: r,
        main: s,
        mask: o,
        maskId: i,
        transform: a
      } = t;
      const {
        width: c,
        icon: l
      } = s, {
        width: u,
        icon: m
      } = o, p = cb({
        transform: a,
        containerWidth: u,
        iconWidth: c
      }), S = {
        tag: "rect",
        attributes: {
          ...Ys,
          fill: "white"
        }
      }, I = l.children ? {
        children: l.children.map(jc)
      } : {}, A = {
        tag: "g",
        attributes: {
          ...p.inner
        },
        children: [jc({
          tag: l.tag,
          attributes: {
            ...l.attributes,
            ...p.path
          },
          ...I
        })]
      }, w = {
        tag: "g",
        attributes: {
          ...p.outer
        },
        children: [A]
      }, v = "mask-".concat(i || hr()), C = "clip-".concat(i || hr()), g = {
        tag: "mask",
        attributes: {
          ...Ys,
          id: v,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        },
        children: [S, w]
      }, O = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: C
          },
          children: uE(m)
        }, g]
      };
      return n.push(O, {
        tag: "rect",
        attributes: {
          fill: "currentColor",
          "clip-path": "url(#".concat(C, ")"),
          mask: "url(#".concat(v, ")"),
          ...Ys
        }
      }), {
        children: n,
        attributes: r
      };
    };
  }
}, dE = {
  provides(e) {
    let t = !1;
    en.matchMedia && (t = en.matchMedia("(prefers-reduced-motion: reduce)").matches), e.missingIconAbstract = function() {
      const n = [], r = {
        fill: "currentColor"
      }, s = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      n.push({
        tag: "path",
        attributes: {
          ...r,
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        }
      });
      const o = {
        ...s,
        attributeName: "opacity"
      }, i = {
        tag: "circle",
        attributes: {
          ...r,
          cx: "256",
          cy: "364",
          r: "28"
        },
        children: []
      };
      return t || i.children.push({
        tag: "animate",
        attributes: {
          ...s,
          attributeName: "r",
          values: "28;14;28;28;14;28;"
        }
      }, {
        tag: "animate",
        attributes: {
          ...o,
          values: "1;0;1;1;0;1;"
        }
      }), n.push(i), n.push({
        tag: "path",
        attributes: {
          ...r,
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        },
        children: t ? [] : [{
          tag: "animate",
          attributes: {
            ...o,
            values: "1;0;0;0;0;1;"
          }
        }]
      }), t || n.push({
        tag: "path",
        attributes: {
          ...r,
          opacity: "0",
          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        },
        children: [{
          tag: "animate",
          attributes: {
            ...o,
            values: "0;0;1;1;0;0;"
          }
        }]
      }), {
        tag: "g",
        attributes: {
          class: "missing"
        },
        children: n
      };
    };
  }
}, mE = {
  hooks() {
    return {
      parseNodeAttributes(e, t) {
        const n = t.getAttribute("data-fa-symbol"), r = n === null ? !1 : n === "" ? !0 : n;
        return e.symbol = r, e;
      }
    };
  }
}, pE = [fb, Jb, Qb, Zb, eE, aE, cE, lE, fE, dE, mE];
Ab(pE, {
  mixoutsTo: rt
});
rt.noAuto;
rt.config;
const hE = rt.library;
rt.dom;
const Ko = rt.parse;
rt.findIconDefinition;
rt.toHtml;
const _E = rt.icon;
rt.layer;
rt.text;
rt.counter;
var gE = { GJS_DEBUG_TOPICS: "JS ERROR;JS LOG", LESSOPEN: "| /usr/bin/lesspipe %s", USER: "quentin", npm_config_user_agent: "yarn/4.3.1 npm/? node/v20.15.1 linux x64", GIO_MODULE_DIR: "/home/quentin/snap/code/common/.cache/gio-modules", XDG_SESSION_TYPE: "wayland", GIT_ASKPASS: "/snap/code/164/usr/share/code/resources/app/extensions/git/dist/askpass.sh", GTK_EXE_PREFIX_VSCODE_SNAP_ORIG: "", npm_node_execpath: "/tmp/xfs-4684104e/node", GDK_BACKEND_VSCODE_SNAP_ORIG: "", SHLVL: "1", HOME: "/home/quentin", CHROME_DESKTOP: "code-url-handler.desktop", LOCPATH_VSCODE_SNAP_ORIG: "", OLDPWD: "/home/quentin/git/recia-webcomponents", TERM_PROGRAM_VERSION: "1.91.1", DESKTOP_SESSION: "ubuntu", GTK_PATH: "", NVM_BIN: "/home/quentin/.nvm/versions/node/v20.15.1/bin", npm_package_json: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables/package.json", NVM_INC: "/home/quentin/.nvm/versions/node/v20.15.1/include/node", GTK_IM_MODULE_FILE: "/home/quentin/snap/code/common/.cache/immodules/immodules.cache", GIO_LAUNCHED_DESKTOP_FILE: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SHELL_SESSION_MODE: "ubuntu", GRADLE_HOME: "/home/quentin/.sdkman/candidates/gradle/current", GTK_MODULES: "gail:atk-bridge", GSETTINGS_SCHEMA_DIR_VSCODE_SNAP_ORIG: "", VSCODE_GIT_ASKPASS_MAIN: "/snap/code/164/usr/share/code/resources/app/extensions/git/dist/askpass-main.js", VSCODE_GIT_ASKPASS_NODE: "/snap/code/164/usr/share/code/code", MANAGERPID: "3711", SYSTEMD_EXEC_PID: "3889", IM_CONFIG_CHECK_ENV: "1", DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus", COLORTERM: "truecolor", LIBVIRT_DEFAULT_URI: "qemu:///system", GIO_LAUNCHED_DESKTOP_FILE_PID: "16499", NVM_DIR: "/home/quentin/.nvm", IM_CONFIG_PHASE: "1", WAYLAND_DISPLAY: "wayland-0", LOGNAME: "quentin", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", JOURNAL_STREAM: "8:53255", _: "/home/quentin/.nvm/versions/node/v20.15.1/bin/yarn", XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: "/etc/xdg/xdg-ubuntu:/etc/xdg", XDG_SESSION_CLASS: "user", XDG_DATA_DIRS_VSCODE_SNAP_ORIG: "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", USERNAME: "quentin", TERM: "xterm-256color", GNOME_DESKTOP_SESSION_ID: "this-is-deprecated", PATH: "/tmp/xfs-4684104e:/home/quentin/.local/bin:/home/quentin/.nvm/versions/node/v20.15.1/bin:/home/quentin/.sdkman/candidates/java/current/bin:/home/quentin/.sdkman/candidates/gradle/current/bin:/home/quentin/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin:/home/quentin/.local/share/JetBrains/Toolbox/scripts:/home/quentin/.local/share/JetBrains/Toolbox/scripts", SESSION_MANAGER: "local/DELL-QGuillemin:@/tmp/.ICE-unix/3867,unix/DELL-QGuillemin:/tmp/.ICE-unix/3867", SDKMAN_CANDIDATES_DIR: "/home/quentin/.sdkman/candidates", GTK_EXE_PREFIX: "/snap/code/164/usr", INVOCATION_ID: "37d65aa77adf4de6bee60e9a158053dc", npm_package_name: "@gip-recia/ui-ressources-gar", XDG_MENU_PREFIX: "gnome-", BAMF_DESKTOP_FILE_HINT: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SETUP_DISPLAY: ":1", XDG_RUNTIME_DIR: "/run/user/1000", GDK_BACKEND: "x11", DISPLAY: ":0", LOCPATH: "/snap/code/164/usr/lib/locale", LANG: "fr_FR.UTF-8", XDG_CURRENT_DESKTOP: "Unity", GIO_MODULE_DIR_VSCODE_SNAP_ORIG: "", XMODIFIERS: "@im=ibus", XDG_SESSION_DESKTOP: "ubuntu", XAUTHORITY: "/run/user/1000/.mutter-Xwaylandauth.C9O3Q2", LS_COLORS: "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:", VSCODE_GIT_IPC_HANDLE: "/run/user/1000/vscode-git-0200aebe89.sock", SDKMAN_DIR: "/home/quentin/.sdkman", SDKMAN_PLATFORM: "linuxx64", TERM_PROGRAM: "vscode", SSH_AGENT_LAUNCHER: "gnome-keyring", SSH_AUTH_SOCK: "/run/user/1000/keyring/ssh", GSETTINGS_SCHEMA_DIR: "/home/quentin/snap/code/164/.local/share/glib-2.0/schemas", ORIGINAL_XDG_CURRENT_DESKTOP: "ubuntu:GNOME", PROJECT_CWD: "/home/quentin/git/recia-webcomponents", SHELL: "/bin/bash", npm_package_version: "3.0.0", npm_lifecycle_event: "build", QT_ACCESSIBILITY: "1", GDMSESSION: "ubuntu", LESSCLOSE: "/usr/bin/lesspipe %s %s", GTK_PATH_VSCODE_SNAP_ORIG: "", GTK_IM_MODULE_FILE_VSCODE_SNAP_ORIG: "", GJS_DEBUG_OUTPUT: "stderr", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", QT_IM_MODULE: "ibus", JAVA_HOME: "/home/quentin/.sdkman/candidates/java/current", GPG_TTY: "/dev/pts/0", PWD: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables", BERRY_BIN_FOLDER: "/tmp/xfs-4684104e", npm_execpath: "/tmp/xfs-4684104e/yarn", XDG_CONFIG_DIRS: "/etc/xdg/xdg-ubuntu:/etc/xdg", NVM_CD_FLAGS: "", XDG_DATA_DIRS: "/home/quentin/snap/code/164/.local/share:/home/quentin/snap/code/164:/snap/code/164/usr/share:/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", INIT_CWD: "/home/quentin/git/recia-webcomponents/packages/ressources-diffusables", NODE_ENV: "production", VITE_BASE_URI: "/", VITE_BASE_API_URL: "/quentin", VITE_RESSOURCES_DIFFUSABLES_API_URI: "/api/ressources-diffusables", VITE_RESSOURCES_DIFFUSABLES_SIZE_API_URI: "/api/ressources-diffusables/size", VITE_USER_INFO_API_URI: "/portail/api/v5-1/userinfo?claims=private&groups=" };
function Vc(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Pt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vc(Object(n), !0).forEach(function(r) {
      Ke(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Vc(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function bE(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function EE(e) {
  var t = bE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function rs(e) {
  "@babel/helpers - typeof";
  return rs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, rs(e);
}
function Ke(e, t, n) {
  return t = EE(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function SE(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function yE(e, t) {
  if (e == null) return {};
  var n = SE(e, t), r, s;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (s = 0; s < o.length; s++)
      r = o[s], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var OE = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Cf = { exports: {} };
(function(e) {
  (function(t) {
    var n = function(v, C, g) {
      if (!l(C) || m(C) || p(C) || S(C) || c(C))
        return C;
      var O, L = 0, y = 0;
      if (u(C))
        for (O = [], y = C.length; L < y; L++)
          O.push(n(v, C[L], g));
      else {
        O = {};
        for (var P in C)
          Object.prototype.hasOwnProperty.call(C, P) && (O[v(P, g)] = n(v, C[P], g));
      }
      return O;
    }, r = function(v, C) {
      C = C || {};
      var g = C.separator || "_", O = C.split || /(?=[A-Z])/;
      return v.split(O).join(g);
    }, s = function(v) {
      return I(v) ? v : (v = v.replace(/[\-_\s]+(.)?/g, function(C, g) {
        return g ? g.toUpperCase() : "";
      }), v.substr(0, 1).toLowerCase() + v.substr(1));
    }, o = function(v) {
      var C = s(v);
      return C.substr(0, 1).toUpperCase() + C.substr(1);
    }, i = function(v, C) {
      return r(v, C).toLowerCase();
    }, a = Object.prototype.toString, c = function(v) {
      return typeof v == "function";
    }, l = function(v) {
      return v === Object(v);
    }, u = function(v) {
      return a.call(v) == "[object Array]";
    }, m = function(v) {
      return a.call(v) == "[object Date]";
    }, p = function(v) {
      return a.call(v) == "[object RegExp]";
    }, S = function(v) {
      return a.call(v) == "[object Boolean]";
    }, I = function(v) {
      return v = v - 0, v === v;
    }, A = function(v, C) {
      var g = C && "process" in C ? C.process : C;
      return typeof g != "function" ? v : function(O, L) {
        return g(O, v, L);
      };
    }, w = {
      camelize: s,
      decamelize: i,
      pascalize: o,
      depascalize: i,
      camelizeKeys: function(v, C) {
        return n(A(s, C), v);
      },
      decamelizeKeys: function(v, C) {
        return n(A(i, C), v, C);
      },
      pascalizeKeys: function(v, C) {
        return n(A(o, C), v);
      },
      depascalizeKeys: function() {
        return this.decamelizeKeys.apply(this, arguments);
      }
    };
    e.exports ? e.exports = w : t.humps = w;
  })(OE);
})(Cf);
var vE = Cf.exports, IE = ["class", "style"];
function AE(e) {
  return e.split(";").map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t;
  }).reduce(function(t, n) {
    var r = n.indexOf(":"), s = vE.camelize(n.slice(0, r)), o = n.slice(r + 1).trim();
    return t[s] = o, t;
  }, {});
}
function TE(e) {
  return e.split(/\s+/).reduce(function(t, n) {
    return t[n] = !0, t;
  }, {});
}
function Df(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof e == "string")
    return e;
  var r = (e.children || []).map(function(c) {
    return Df(c);
  }), s = Object.keys(e.attributes || {}).reduce(function(c, l) {
    var u = e.attributes[l];
    switch (l) {
      case "class":
        c.class = TE(u);
        break;
      case "style":
        c.style = AE(u);
        break;
      default:
        c.attrs[l] = u;
    }
    return c;
  }, {
    attrs: {},
    class: {},
    style: {}
  });
  n.class;
  var o = n.style, i = o === void 0 ? {} : o, a = yE(n, IE);
  return ui(e.tag, Pt(Pt(Pt({}, t), {}, {
    class: s.class,
    style: Pt(Pt({}, s.style), i)
  }, s.attrs), a), r);
}
var Lf = !1;
try {
  Lf = gE.NODE_ENV === "production";
} catch {
}
function NE() {
  if (!Lf && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function Js(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? Ke({}, e, t) : {};
}
function RE(e) {
  var t, n = (t = {
    "fa-spin": e.spin,
    "fa-pulse": e.pulse,
    "fa-fw": e.fixedWidth,
    "fa-border": e.border,
    "fa-li": e.listItem,
    "fa-inverse": e.inverse,
    "fa-flip": e.flip === !0,
    "fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both",
    "fa-flip-vertical": e.flip === "vertical" || e.flip === "both"
  }, Ke(Ke(Ke(Ke(Ke(Ke(Ke(Ke(Ke(Ke(t, "fa-".concat(e.size), e.size !== null), "fa-rotate-".concat(e.rotation), e.rotation !== null), "fa-pull-".concat(e.pull), e.pull !== null), "fa-swap-opacity", e.swapOpacity), "fa-bounce", e.bounce), "fa-shake", e.shake), "fa-beat", e.beat), "fa-fade", e.fade), "fa-beat-fade", e.beatFade), "fa-flash", e.flash), Ke(Ke(t, "fa-spin-pulse", e.spinPulse), "fa-spin-reverse", e.spinReverse));
  return Object.keys(n).map(function(r) {
    return n[r] ? r : null;
  }).filter(function(r) {
    return r;
  });
}
function Hc(e) {
  if (e && rs(e) === "object" && e.prefix && e.iconName && e.icon)
    return e;
  if (Ko.icon)
    return Ko.icon(e);
  if (e === null)
    return null;
  if (rs(e) === "object" && e.prefix && e.iconName)
    return e;
  if (Array.isArray(e) && e.length === 2)
    return {
      prefix: e[0],
      iconName: e[1]
    };
  if (typeof e == "string")
    return {
      prefix: "fas",
      iconName: e
    };
}
var CE = /* @__PURE__ */ ht({
  name: "FontAwesomeIcon",
  props: {
    border: {
      type: Boolean,
      default: !1
    },
    fixedWidth: {
      type: Boolean,
      default: !1
    },
    flip: {
      type: [Boolean, String],
      default: !1,
      validator: function(t) {
        return [!0, !1, "horizontal", "vertical", "both"].indexOf(t) > -1;
      }
    },
    icon: {
      type: [Object, Array, String],
      required: !0
    },
    mask: {
      type: [Object, Array, String],
      default: null
    },
    maskId: {
      type: String,
      default: null
    },
    listItem: {
      type: Boolean,
      default: !1
    },
    pull: {
      type: String,
      default: null,
      validator: function(t) {
        return ["right", "left"].indexOf(t) > -1;
      }
    },
    pulse: {
      type: Boolean,
      default: !1
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: function(t) {
        return [90, 180, 270].indexOf(Number.parseInt(t, 10)) > -1;
      }
    },
    swapOpacity: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: null,
      validator: function(t) {
        return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(t) > -1;
      }
    },
    spin: {
      type: Boolean,
      default: !1
    },
    transform: {
      type: [String, Object],
      default: null
    },
    symbol: {
      type: [Boolean, String],
      default: !1
    },
    title: {
      type: String,
      default: null
    },
    titleId: {
      type: String,
      default: null
    },
    inverse: {
      type: Boolean,
      default: !1
    },
    bounce: {
      type: Boolean,
      default: !1
    },
    shake: {
      type: Boolean,
      default: !1
    },
    beat: {
      type: Boolean,
      default: !1
    },
    fade: {
      type: Boolean,
      default: !1
    },
    beatFade: {
      type: Boolean,
      default: !1
    },
    flash: {
      type: Boolean,
      default: !1
    },
    spinPulse: {
      type: Boolean,
      default: !1
    },
    spinReverse: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(t, n) {
    var r = n.attrs, s = ot(function() {
      return Hc(t.icon);
    }), o = ot(function() {
      return Js("classes", RE(t));
    }), i = ot(function() {
      return Js("transform", typeof t.transform == "string" ? Ko.transform(t.transform) : t.transform);
    }), a = ot(function() {
      return Js("mask", Hc(t.mask));
    }), c = ot(function() {
      return _E(s.value, Pt(Pt(Pt(Pt({}, o.value), i.value), a.value), {}, {
        symbol: t.symbol,
        title: t.title,
        titleId: t.titleId,
        maskId: t.maskId
      }));
    });
    hn(c, function(u) {
      if (!u)
        return NE("Could not find one or more icon(s)", s.value, a.value);
    }, {
      immediate: !0
    });
    var l = ot(function() {
      return c.value ? Df(c.value.abstract[0], {}, r) : null;
    });
    return function() {
      return l.value;
    };
  }
});
const DE = { class: "cadre-recherche-ressource" }, LE = { class: "input-recherche-ressource" }, PE = ["placeholder"], wE = ["disabled"], xE = { class: "elements-affiches-page-ressource" }, kE = /* @__PURE__ */ ht({
  __name: "RechercheRessource.ce",
  props: {
    nombreRessourcesTotal: { type: Number },
    nombreRessourcesAffichees: { type: Number }
  },
  emits: ["reinitialiserRecherche", "recommencerRechercheInput"],
  setup(e, { emit: t }) {
    const n = t, r = st(""), { t: s } = In(), o = () => {
      r.value = "", n("reinitialiserRecherche");
    }, i = Zl(
      () => n("recommencerRechercheInput", r.value),
      500
      // Buffer de 0,5s après input.
    );
    return (a, c) => (Se(), Ae("div", DE, [
      J("div", LE, [
        Dd(J("input", {
          class: "champ-recherche-ressource",
          "onUpdate:modelValue": c[0] || (c[0] = (l) => r.value = l),
          onInput: c[1] || (c[1] = //@ts-ignore
          (...l) => se(i) && se(i)(...l)),
          type: "text",
          placeholder: se(s)("recherche-ressource.recherche")
        }, null, 40, PE), [
          [
            op,
            r.value,
            void 0,
            { trim: !0 }
          ]
        ]),
        J("button", {
          class: "reinitialiser-recherche-ressource",
          onClick: o,
          disabled: r.value.length == 0
        }, [
          Ue(se(CE), { icon: ["fa", "xmark"] })
        ], 8, wE)
      ]),
      J("small", xE, ne(a.nombreRessourcesAffichees) + "/" + ne(a.nombreRessourcesTotal) + " " + ne(se(s)("recherche-ressource.elements-affiches").toUpperCase()), 1)
    ]));
  }
}), ME = ".cadre-recherche-ressource{display:flex;flex-direction:column;justify-content:center;padding:var(--ui-ressources-gar-padding, 1rem);margin:var(--ui-ressources-gar-margin, .6rem);background-color:#fff;border-radius:var(--ui-ressources-gar-card-border-radius, 1rem)}.input-recherche-ressource{display:flex;flex-direction:row;margin-bottom:var(--ui-ressources-gar-margin, .6rem)}.champ-recherche-ressource{box-sizing:border-box;width:100%;height:2rem;padding:0 .5rem;font-size:small;font-weight:700;outline:none;border:thin solid lightgrey;border-right:none;border-radius:var(--ui-ressources-gar-button-border-radius, 1.5rem) 0 0 var(--ui-ressources-gar-button-border-radius, 1.5rem)}.reinitialiser-recherche-ressource{display:flex;justify-content:center;align-items:center;width:2rem;height:2rem;padding:.5rem;background-color:var(--ui-ressources-gar-button-background-color, #0c9ee1);color:var(--ui-ressources-gar-button-text-color, #ffffff);border:none;border-radius:0 var(--ui-ressources-gar-button-border-radius, 1.5rem) var(--ui-ressources-gar-button-border-radius, 1.5rem) 0;cursor:pointer}.reinitialiser-recherche-ressource:disabled{background-color:#d3d3d3;cursor:not-allowed}.elements-affiches-page-ressource{text-align:center}", FE = /* @__PURE__ */ Hn(kE, [["styles", [ME]]]), UE = /* @__PURE__ */ jn(tg), GE = /* @__PURE__ */ jn(rg), jE = /* @__PURE__ */ jn(Tg), VE = /* @__PURE__ */ jn(kg), HE = /* @__PURE__ */ jn(R0), $E = /* @__PURE__ */ jn(FE), BE = () => {
  customElements.define("carte-ressource", UE), customElements.define("ui-ressources-gar", GE), customElements.define("legende-ressource", jE), customElements.define("liste-ressources", VE), customElements.define("page-ressource", HE), customElements.define("recherche-ressource", $E);
}, KE = {
  prefix: "fas",
  iconName: "xmark",
  icon: [384, 512, [128473, 10005, 10006, 10060, 215, "close", "multiply", "remove", "times"], "f00d", "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"]
}, zE = () => {
  hE.add(KE);
}, qE = {};
function WE(e, t) {
  return Se(), Ae("div");
}
const XE = /* @__PURE__ */ Hn(qE, [["render", WE]]), YE = ap(XE);
BE();
zE();
YE.use(Au);

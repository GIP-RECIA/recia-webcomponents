function eA(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const i in r)
        if (i !== "default" && !(i in e)) {
          const o = Object.getOwnPropertyDescriptor(r, i);
          o && Object.defineProperty(e, i, o.get ? o : {
            enumerable: !0,
            get: () => r[i]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var mo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ha(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var tA = { exports: {} };
(function(e) {
  var t = function(n) {
    var r = Object.prototype, i = r.hasOwnProperty, o = Object.defineProperty || function(N, z, R) {
      N[z] = R.value;
    }, s, u = typeof Symbol == "function" ? Symbol : {}, l = u.iterator || "@@iterator", f = u.asyncIterator || "@@asyncIterator", h = u.toStringTag || "@@toStringTag";
    function p(N, z, R) {
      return Object.defineProperty(N, z, {
        value: R,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), N[z];
    }
    try {
      p({}, "");
    } catch {
      p = function(z, R, W) {
        return z[R] = W;
      };
    }
    function g(N, z, R, W) {
      var ie = z && z.prototype instanceof A ? z : A, le = Object.create(ie.prototype), se = new Ce(W || []);
      return o(le, "_invoke", { value: te(N, R, se) }), le;
    }
    n.wrap = g;
    function v(N, z, R) {
      try {
        return { type: "normal", arg: N.call(z, R) };
      } catch (W) {
        return { type: "throw", arg: W };
      }
    }
    var E = "suspendedStart", y = "suspendedYield", b = "executing", w = "completed", k = {};
    function A() {
    }
    function T() {
    }
    function _() {
    }
    var I = {};
    p(I, l, function() {
      return this;
    });
    var B = Object.getPrototypeOf, M = B && B(B(G([])));
    M && M !== r && i.call(M, l) && (I = M);
    var H = _.prototype = A.prototype = Object.create(I);
    T.prototype = _, o(H, "constructor", { value: _, configurable: !0 }), o(
      _,
      "constructor",
      { value: T, configurable: !0 }
    ), T.displayName = p(
      _,
      h,
      "GeneratorFunction"
    );
    function Y(N) {
      ["next", "throw", "return"].forEach(function(z) {
        p(N, z, function(R) {
          return this._invoke(z, R);
        });
      });
    }
    n.isGeneratorFunction = function(N) {
      var z = typeof N == "function" && N.constructor;
      return z ? z === T || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (z.displayName || z.name) === "GeneratorFunction" : !1;
    }, n.mark = function(N) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(N, _) : (N.__proto__ = _, p(N, h, "GeneratorFunction")), N.prototype = Object.create(H), N;
    }, n.awrap = function(N) {
      return { __await: N };
    };
    function J(N, z) {
      function R(le, se, ve, Pe) {
        var we = v(N[le], N, se);
        if (we.type === "throw")
          Pe(we.arg);
        else {
          var Ee = we.arg, me = Ee.value;
          return me && typeof me == "object" && i.call(me, "__await") ? z.resolve(me.__await).then(function(et) {
            R("next", et, ve, Pe);
          }, function(et) {
            R("throw", et, ve, Pe);
          }) : z.resolve(me).then(function(et) {
            Ee.value = et, ve(Ee);
          }, function(et) {
            return R("throw", et, ve, Pe);
          });
        }
      }
      var W;
      function ie(le, se) {
        function ve() {
          return new z(function(Pe, we) {
            R(le, se, Pe, we);
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
          ve,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          ve
        ) : ve();
      }
      o(this, "_invoke", { value: ie });
    }
    Y(J.prototype), p(J.prototype, f, function() {
      return this;
    }), n.AsyncIterator = J, n.async = function(N, z, R, W, ie) {
      ie === void 0 && (ie = Promise);
      var le = new J(
        g(N, z, R, W),
        ie
      );
      return n.isGeneratorFunction(z) ? le : le.next().then(function(se) {
        return se.done ? se.value : le.next();
      });
    };
    function te(N, z, R) {
      var W = E;
      return function(le, se) {
        if (W === b)
          throw new Error("Generator is already running");
        if (W === w) {
          if (le === "throw")
            throw se;
          return U();
        }
        for (R.method = le, R.arg = se; ; ) {
          var ve = R.delegate;
          if (ve) {
            var Pe = ee(ve, R);
            if (Pe) {
              if (Pe === k) continue;
              return Pe;
            }
          }
          if (R.method === "next")
            R.sent = R._sent = R.arg;
          else if (R.method === "throw") {
            if (W === E)
              throw W = w, R.arg;
            R.dispatchException(R.arg);
          } else R.method === "return" && R.abrupt("return", R.arg);
          W = b;
          var we = v(N, z, R);
          if (we.type === "normal") {
            if (W = R.done ? w : y, we.arg === k)
              continue;
            return {
              value: we.arg,
              done: R.done
            };
          } else we.type === "throw" && (W = w, R.method = "throw", R.arg = we.arg);
        }
      };
    }
    function ee(N, z) {
      var R = z.method, W = N.iterator[R];
      if (W === s)
        return z.delegate = null, R === "throw" && N.iterator.return && (z.method = "return", z.arg = s, ee(N, z), z.method === "throw") || R !== "return" && (z.method = "throw", z.arg = new TypeError(
          "The iterator does not provide a '" + R + "' method"
        )), k;
      var ie = v(W, N.iterator, z.arg);
      if (ie.type === "throw")
        return z.method = "throw", z.arg = ie.arg, z.delegate = null, k;
      var le = ie.arg;
      if (!le)
        return z.method = "throw", z.arg = new TypeError("iterator result is not an object"), z.delegate = null, k;
      if (le.done)
        z[N.resultName] = le.value, z.next = N.nextLoc, z.method !== "return" && (z.method = "next", z.arg = s);
      else
        return le;
      return z.delegate = null, k;
    }
    Y(H), p(H, h, "Generator"), p(H, l, function() {
      return this;
    }), p(H, "toString", function() {
      return "[object Generator]";
    });
    function de(N) {
      var z = { tryLoc: N[0] };
      1 in N && (z.catchLoc = N[1]), 2 in N && (z.finallyLoc = N[2], z.afterLoc = N[3]), this.tryEntries.push(z);
    }
    function he(N) {
      var z = N.completion || {};
      z.type = "normal", delete z.arg, N.completion = z;
    }
    function Ce(N) {
      this.tryEntries = [{ tryLoc: "root" }], N.forEach(de, this), this.reset(!0);
    }
    n.keys = function(N) {
      var z = Object(N), R = [];
      for (var W in z)
        R.push(W);
      return R.reverse(), function ie() {
        for (; R.length; ) {
          var le = R.pop();
          if (le in z)
            return ie.value = le, ie.done = !1, ie;
        }
        return ie.done = !0, ie;
      };
    };
    function G(N) {
      if (N != null) {
        var z = N[l];
        if (z)
          return z.call(N);
        if (typeof N.next == "function")
          return N;
        if (!isNaN(N.length)) {
          var R = -1, W = function ie() {
            for (; ++R < N.length; )
              if (i.call(N, R))
                return ie.value = N[R], ie.done = !1, ie;
            return ie.value = s, ie.done = !0, ie;
          };
          return W.next = W;
        }
      }
      throw new TypeError(typeof N + " is not iterable");
    }
    n.values = G;
    function U() {
      return { value: s, done: !0 };
    }
    return Ce.prototype = {
      constructor: Ce,
      reset: function(N) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = s, this.done = !1, this.delegate = null, this.method = "next", this.arg = s, this.tryEntries.forEach(he), !N)
          for (var z in this)
            z.charAt(0) === "t" && i.call(this, z) && !isNaN(+z.slice(1)) && (this[z] = s);
      },
      stop: function() {
        this.done = !0;
        var N = this.tryEntries[0], z = N.completion;
        if (z.type === "throw")
          throw z.arg;
        return this.rval;
      },
      dispatchException: function(N) {
        if (this.done)
          throw N;
        var z = this;
        function R(Pe, we) {
          return le.type = "throw", le.arg = N, z.next = Pe, we && (z.method = "next", z.arg = s), !!we;
        }
        for (var W = this.tryEntries.length - 1; W >= 0; --W) {
          var ie = this.tryEntries[W], le = ie.completion;
          if (ie.tryLoc === "root")
            return R("end");
          if (ie.tryLoc <= this.prev) {
            var se = i.call(ie, "catchLoc"), ve = i.call(ie, "finallyLoc");
            if (se && ve) {
              if (this.prev < ie.catchLoc)
                return R(ie.catchLoc, !0);
              if (this.prev < ie.finallyLoc)
                return R(ie.finallyLoc);
            } else if (se) {
              if (this.prev < ie.catchLoc)
                return R(ie.catchLoc, !0);
            } else if (ve) {
              if (this.prev < ie.finallyLoc)
                return R(ie.finallyLoc);
            } else
              throw new Error("try statement without catch or finally");
          }
        }
      },
      abrupt: function(N, z) {
        for (var R = this.tryEntries.length - 1; R >= 0; --R) {
          var W = this.tryEntries[R];
          if (W.tryLoc <= this.prev && i.call(W, "finallyLoc") && this.prev < W.finallyLoc) {
            var ie = W;
            break;
          }
        }
        ie && (N === "break" || N === "continue") && ie.tryLoc <= z && z <= ie.finallyLoc && (ie = null);
        var le = ie ? ie.completion : {};
        return le.type = N, le.arg = z, ie ? (this.method = "next", this.next = ie.finallyLoc, k) : this.complete(le);
      },
      complete: function(N, z) {
        if (N.type === "throw")
          throw N.arg;
        return N.type === "break" || N.type === "continue" ? this.next = N.arg : N.type === "return" ? (this.rval = this.arg = N.arg, this.method = "return", this.next = "end") : N.type === "normal" && z && (this.next = z), k;
      },
      finish: function(N) {
        for (var z = this.tryEntries.length - 1; z >= 0; --z) {
          var R = this.tryEntries[z];
          if (R.finallyLoc === N)
            return this.complete(R.completion, R.afterLoc), he(R), k;
        }
      },
      catch: function(N) {
        for (var z = this.tryEntries.length - 1; z >= 0; --z) {
          var R = this.tryEntries[z];
          if (R.tryLoc === N) {
            var W = R.completion;
            if (W.type === "throw") {
              var ie = W.arg;
              he(R);
            }
            return ie;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(N, z, R) {
        return this.delegate = {
          iterator: G(N),
          resultName: z,
          nextLoc: R
        }, this.method === "next" && (this.arg = s), k;
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
})(tA);
var b5 = { exports: {} }, Wu = {}, w5 = { exports: {} }, Ve = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var D6;
function nA() {
  if (D6) return Ve;
  D6 = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), p = Symbol.iterator;
  function g(R) {
    return R === null || typeof R != "object" ? null : (R = p && R[p] || R["@@iterator"], typeof R == "function" ? R : null);
  }
  var v = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, E = Object.assign, y = {};
  function b(R, W, ie) {
    this.props = R, this.context = W, this.refs = y, this.updater = ie || v;
  }
  b.prototype.isReactComponent = {}, b.prototype.setState = function(R, W) {
    if (typeof R != "object" && typeof R != "function" && R != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, R, W, "setState");
  }, b.prototype.forceUpdate = function(R) {
    this.updater.enqueueForceUpdate(this, R, "forceUpdate");
  };
  function w() {
  }
  w.prototype = b.prototype;
  function k(R, W, ie) {
    this.props = R, this.context = W, this.refs = y, this.updater = ie || v;
  }
  var A = k.prototype = new w();
  A.constructor = k, E(A, b.prototype), A.isPureReactComponent = !0;
  var T = Array.isArray, _ = Object.prototype.hasOwnProperty, I = { current: null }, B = { key: !0, ref: !0, __self: !0, __source: !0 };
  function M(R, W, ie) {
    var le, se = {}, ve = null, Pe = null;
    if (W != null) for (le in W.ref !== void 0 && (Pe = W.ref), W.key !== void 0 && (ve = "" + W.key), W) _.call(W, le) && !B.hasOwnProperty(le) && (se[le] = W[le]);
    var we = arguments.length - 2;
    if (we === 1) se.children = ie;
    else if (1 < we) {
      for (var Ee = Array(we), me = 0; me < we; me++) Ee[me] = arguments[me + 2];
      se.children = Ee;
    }
    if (R && R.defaultProps) for (le in we = R.defaultProps, we) se[le] === void 0 && (se[le] = we[le]);
    return { $$typeof: e, type: R, key: ve, ref: Pe, props: se, _owner: I.current };
  }
  function H(R, W) {
    return { $$typeof: e, type: R.type, key: W, ref: R.ref, props: R.props, _owner: R._owner };
  }
  function Y(R) {
    return typeof R == "object" && R !== null && R.$$typeof === e;
  }
  function J(R) {
    var W = { "=": "=0", ":": "=2" };
    return "$" + R.replace(/[=:]/g, function(ie) {
      return W[ie];
    });
  }
  var te = /\/+/g;
  function ee(R, W) {
    return typeof R == "object" && R !== null && R.key != null ? J("" + R.key) : W.toString(36);
  }
  function de(R, W, ie, le, se) {
    var ve = typeof R;
    (ve === "undefined" || ve === "boolean") && (R = null);
    var Pe = !1;
    if (R === null) Pe = !0;
    else switch (ve) {
      case "string":
      case "number":
        Pe = !0;
        break;
      case "object":
        switch (R.$$typeof) {
          case e:
          case t:
            Pe = !0;
        }
    }
    if (Pe) return Pe = R, se = se(Pe), R = le === "" ? "." + ee(Pe, 0) : le, T(se) ? (ie = "", R != null && (ie = R.replace(te, "$&/") + "/"), de(se, W, ie, "", function(me) {
      return me;
    })) : se != null && (Y(se) && (se = H(se, ie + (!se.key || Pe && Pe.key === se.key ? "" : ("" + se.key).replace(te, "$&/") + "/") + R)), W.push(se)), 1;
    if (Pe = 0, le = le === "" ? "." : le + ":", T(R)) for (var we = 0; we < R.length; we++) {
      ve = R[we];
      var Ee = le + ee(ve, we);
      Pe += de(ve, W, ie, Ee, se);
    }
    else if (Ee = g(R), typeof Ee == "function") for (R = Ee.call(R), we = 0; !(ve = R.next()).done; ) ve = ve.value, Ee = le + ee(ve, we++), Pe += de(ve, W, ie, Ee, se);
    else if (ve === "object") throw W = String(R), Error("Objects are not valid as a React child (found: " + (W === "[object Object]" ? "object with keys {" + Object.keys(R).join(", ") + "}" : W) + "). If you meant to render a collection of children, use an array instead.");
    return Pe;
  }
  function he(R, W, ie) {
    if (R == null) return R;
    var le = [], se = 0;
    return de(R, le, "", "", function(ve) {
      return W.call(ie, ve, se++);
    }), le;
  }
  function Ce(R) {
    if (R._status === -1) {
      var W = R._result;
      W = W(), W.then(function(ie) {
        (R._status === 0 || R._status === -1) && (R._status = 1, R._result = ie);
      }, function(ie) {
        (R._status === 0 || R._status === -1) && (R._status = 2, R._result = ie);
      }), R._status === -1 && (R._status = 0, R._result = W);
    }
    if (R._status === 1) return R._result.default;
    throw R._result;
  }
  var G = { current: null }, U = { transition: null }, N = { ReactCurrentDispatcher: G, ReactCurrentBatchConfig: U, ReactCurrentOwner: I };
  function z() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Ve.Children = { map: he, forEach: function(R, W, ie) {
    he(R, function() {
      W.apply(this, arguments);
    }, ie);
  }, count: function(R) {
    var W = 0;
    return he(R, function() {
      W++;
    }), W;
  }, toArray: function(R) {
    return he(R, function(W) {
      return W;
    }) || [];
  }, only: function(R) {
    if (!Y(R)) throw Error("React.Children.only expected to receive a single React element child.");
    return R;
  } }, Ve.Component = b, Ve.Fragment = n, Ve.Profiler = i, Ve.PureComponent = k, Ve.StrictMode = r, Ve.Suspense = l, Ve.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = N, Ve.act = z, Ve.cloneElement = function(R, W, ie) {
    if (R == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + R + ".");
    var le = E({}, R.props), se = R.key, ve = R.ref, Pe = R._owner;
    if (W != null) {
      if (W.ref !== void 0 && (ve = W.ref, Pe = I.current), W.key !== void 0 && (se = "" + W.key), R.type && R.type.defaultProps) var we = R.type.defaultProps;
      for (Ee in W) _.call(W, Ee) && !B.hasOwnProperty(Ee) && (le[Ee] = W[Ee] === void 0 && we !== void 0 ? we[Ee] : W[Ee]);
    }
    var Ee = arguments.length - 2;
    if (Ee === 1) le.children = ie;
    else if (1 < Ee) {
      we = Array(Ee);
      for (var me = 0; me < Ee; me++) we[me] = arguments[me + 2];
      le.children = we;
    }
    return { $$typeof: e, type: R.type, key: se, ref: ve, props: le, _owner: Pe };
  }, Ve.createContext = function(R) {
    return R = { $$typeof: s, _currentValue: R, _currentValue2: R, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, R.Provider = { $$typeof: o, _context: R }, R.Consumer = R;
  }, Ve.createElement = M, Ve.createFactory = function(R) {
    var W = M.bind(null, R);
    return W.type = R, W;
  }, Ve.createRef = function() {
    return { current: null };
  }, Ve.forwardRef = function(R) {
    return { $$typeof: u, render: R };
  }, Ve.isValidElement = Y, Ve.lazy = function(R) {
    return { $$typeof: h, _payload: { _status: -1, _result: R }, _init: Ce };
  }, Ve.memo = function(R, W) {
    return { $$typeof: f, type: R, compare: W === void 0 ? null : W };
  }, Ve.startTransition = function(R) {
    var W = U.transition;
    U.transition = {};
    try {
      R();
    } finally {
      U.transition = W;
    }
  }, Ve.unstable_act = z, Ve.useCallback = function(R, W) {
    return G.current.useCallback(R, W);
  }, Ve.useContext = function(R) {
    return G.current.useContext(R);
  }, Ve.useDebugValue = function() {
  }, Ve.useDeferredValue = function(R) {
    return G.current.useDeferredValue(R);
  }, Ve.useEffect = function(R, W) {
    return G.current.useEffect(R, W);
  }, Ve.useId = function() {
    return G.current.useId();
  }, Ve.useImperativeHandle = function(R, W, ie) {
    return G.current.useImperativeHandle(R, W, ie);
  }, Ve.useInsertionEffect = function(R, W) {
    return G.current.useInsertionEffect(R, W);
  }, Ve.useLayoutEffect = function(R, W) {
    return G.current.useLayoutEffect(R, W);
  }, Ve.useMemo = function(R, W) {
    return G.current.useMemo(R, W);
  }, Ve.useReducer = function(R, W, ie) {
    return G.current.useReducer(R, W, ie);
  }, Ve.useRef = function(R) {
    return G.current.useRef(R);
  }, Ve.useState = function(R) {
    return G.current.useState(R);
  }, Ve.useSyncExternalStore = function(R, W, ie) {
    return G.current.useSyncExternalStore(R, W, ie);
  }, Ve.useTransition = function() {
    return G.current.useTransition();
  }, Ve.version = "18.3.1", Ve;
}
w5.exports = nA();
var c = w5.exports;
const ft = /* @__PURE__ */ Ha(c), tf = /* @__PURE__ */ eA({
  __proto__: null,
  default: ft
}, [c]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var A6;
function rA() {
  if (A6) return Wu;
  A6 = 1;
  var e = c, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(u, l, f) {
    var h, p = {}, g = null, v = null;
    f !== void 0 && (g = "" + f), l.key !== void 0 && (g = "" + l.key), l.ref !== void 0 && (v = l.ref);
    for (h in l) r.call(l, h) && !o.hasOwnProperty(h) && (p[h] = l[h]);
    if (u && u.defaultProps) for (h in l = u.defaultProps, l) p[h] === void 0 && (p[h] = l[h]);
    return { $$typeof: t, type: u, key: g, ref: v, props: p, _owner: i.current };
  }
  return Wu.Fragment = n, Wu.jsx = s, Wu.jsxs = s, Wu;
}
b5.exports = rA();
var re = b5.exports;
function Z1(e) {
  this.message = e;
}
Z1.prototype = new Error(), Z1.prototype.name = "InvalidCharacterError";
var I6 = typeof window < "u" && window.atob && window.atob.bind(window) || function(e) {
  var t = String(e).replace(/=+$/, "");
  if (t.length % 4 == 1) throw new Z1("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var n, r, i = 0, o = 0, s = ""; r = t.charAt(o++); ~r && (n = i % 4 ? 64 * n + r : r, i++ % 4) ? s += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0) r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r);
  return s;
};
function iA(e) {
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
      return decodeURIComponent(I6(n).replace(/(.)/g, function(r, i) {
        var o = i.charCodeAt(0).toString(16).toUpperCase();
        return o.length < 2 && (o = "0" + o), "%" + o;
      }));
    }(t);
  } catch {
    return I6(t);
  }
}
function Ed(e) {
  this.message = e;
}
function oA(e, t) {
  if (typeof e != "string") throw new Ed("Invalid token specified");
  var n = (t = t || {}).header === !0 ? 0 : 1;
  try {
    return JSON.parse(iA(e.split(".")[n]));
  } catch (r) {
    throw new Ed("Invalid token specified: " + r.message);
  }
}
Ed.prototype = new Error(), Ed.prototype.name = "InvalidTokenError";
function P6(e, t, n, r, i, o, s) {
  try {
    var u = e[o](s), l = u.value;
  } catch (f) {
    n(f);
    return;
  }
  u.done ? t(l) : Promise.resolve(l).then(r, i);
}
function sA(e) {
  return function() {
    var t = this, n = arguments;
    return new Promise(function(r, i) {
      var o = e.apply(t, n);
      function s(l) {
        P6(o, r, i, s, u, "next", l);
      }
      function u(l) {
        P6(o, r, i, s, u, "throw", l);
      }
      s(void 0);
    });
  };
}
function aA(e, t) {
  return uA(e) || lA(e, t) || cA(e, t) || dA();
}
function uA(e) {
  if (Array.isArray(e)) return e;
}
function lA(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r = [], i = !0, o = !1, s, u;
    try {
      for (n = n.call(e); !(i = (s = n.next()).done) && (r.push(s.value), !(t && r.length === t)); i = !0)
        ;
    } catch (l) {
      o = !0, u = l;
    } finally {
      try {
        !i && n.return != null && n.return();
      } finally {
        if (o) throw u;
      }
    }
    return r;
  }
}
function cA(e, t) {
  if (e) {
    if (typeof e == "string") return _6(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _6(e, t);
  }
}
function _6(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function dA() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function fA() {
  return q1.apply(this, arguments);
}
function q1() {
  return q1 = sA(/* @__PURE__ */ regeneratorRuntime.mark(function e() {
    var t, n, r, i, o, s, u, l, f, h = arguments;
    return regeneratorRuntime.wrap(function(g) {
      for (; ; )
        switch (g.prev = g.next) {
          case 0:
            return t = h.length > 0 && h[0] !== void 0 ? h[0] : {}, n = t.userInfoApiUrl, r = n === void 0 ? "/uPortal/api/v5-1/userinfo" : n, i = t.propertyTransforms, o = i === void 0 ? {} : i, s = h.length > 1 ? h[1] : void 0, g.prev = 2, g.next = 5, fetch(r, {
              method: "GET",
              credentials: "include"
            });
          case 5:
            if (u = g.sent, u.ok) {
              g.next = 8;
              break;
            }
            throw new Error(u.statusText);
          case 8:
            return g.next = 10, u.text();
          case 10:
            if (l = g.sent, f = hA(l), Object.entries(o).forEach(function(v) {
              var E = aA(v, 2), y = E[0], b = E[1];
              f.decoded[y] = b(f.decoded[y]);
            }), !s) {
              g.next = 15;
              break;
            }
            return g.abrupt("return", s(null, f));
          case 15:
            return g.abrupt("return", f);
          case 18:
            if (g.prev = 18, g.t0 = g.catch(2), console.error(g.t0), !s) {
              g.next = 23;
              break;
            }
            return g.abrupt("return", s(g.t0));
          case 23:
            throw g.t0;
          case 24:
          case "end":
            return g.stop();
        }
    }, e, null, [[2, 18]]);
  })), q1.apply(this, arguments);
}
function hA(e) {
  return {
    encoded: e,
    decoded: oA(e)
  };
}
let S5;
const pA = (e) => {
  S5 = e;
}, J1 = async () => {
  const { encoded: e, decoded: t } = await fA({ userInfoApiUrl: S5 });
  return { encoded: e, decoded: t };
}, mA = (e) => {
  const n = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"), r = decodeURIComponent(
    window.atob(n).split("").map((i) => "%" + ("00" + i.charCodeAt(0).toString(16)).slice(-2)).join("")
  );
  return JSON.parse(r);
};
function x5(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: gA } = Object.prototype, { getPrototypeOf: Fg } = Object, nf = /* @__PURE__ */ ((e) => (t) => {
  const n = gA.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), _r = (e) => (e = e.toLowerCase(), (t) => nf(t) === e), rf = (e) => (t) => typeof t === e, { isArray: Ua } = Array, vl = rf("undefined");
function vA(e) {
  return e !== null && !vl(e) && e.constructor !== null && !vl(e.constructor) && ur(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const k5 = _r("ArrayBuffer");
function EA(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && k5(e.buffer), t;
}
const CA = rf("string"), ur = rf("function"), D5 = rf("number"), of = (e) => e !== null && typeof e == "object", yA = (e) => e === !0 || e === !1, id = (e) => {
  if (nf(e) !== "object")
    return !1;
  const t = Fg(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, bA = _r("Date"), wA = _r("File"), SA = _r("Blob"), xA = _r("FileList"), kA = (e) => of(e) && ur(e.pipe), DA = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || ur(e.append) && ((t = nf(e)) === "formdata" || // detect form-data instance
  t === "object" && ur(e.toString) && e.toString() === "[object FormData]"));
}, AA = _r("URLSearchParams"), [IA, PA, _A, TA] = ["ReadableStream", "Request", "Response", "Headers"].map(_r), FA = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ll(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, i;
  if (typeof e != "object" && (e = [e]), Ua(e))
    for (r = 0, i = e.length; r < i; r++)
      t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), s = o.length;
    let u;
    for (r = 0; r < s; r++)
      u = o[r], t.call(null, e[u], u, e);
  }
}
function A5(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, i;
  for (; r-- > 0; )
    if (i = n[r], t === i.toLowerCase())
      return i;
  return null;
}
const I5 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, P5 = (e) => !vl(e) && e !== I5;
function Q1() {
  const { caseless: e } = P5(this) && this || {}, t = {}, n = (r, i) => {
    const o = e && A5(t, i) || i;
    id(t[o]) && id(r) ? t[o] = Q1(t[o], r) : id(r) ? t[o] = Q1({}, r) : Ua(r) ? t[o] = r.slice() : t[o] = r;
  };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && Ll(arguments[r], n);
  return t;
}
const BA = (e, t, n, { allOwnKeys: r } = {}) => (Ll(t, (i, o) => {
  n && ur(i) ? e[o] = x5(i, n) : e[o] = i;
}, { allOwnKeys: r }), e), MA = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), RA = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, OA = (e, t, n, r) => {
  let i, o, s;
  const u = {};
  if (t = t || {}, e == null) return t;
  do {
    for (i = Object.getOwnPropertyNames(e), o = i.length; o-- > 0; )
      s = i[o], (!r || r(s, e, t)) && !u[s] && (t[s] = e[s], u[s] = !0);
    e = n !== !1 && Fg(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, $A = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, LA = (e) => {
  if (!e) return null;
  if (Ua(e)) return e;
  let t = e.length;
  if (!D5(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, NA = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Fg(Uint8Array)), zA = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let i;
  for (; (i = r.next()) && !i.done; ) {
    const o = i.value;
    t.call(e, o[0], o[1]);
  }
}, jA = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, HA = _r("HTMLFormElement"), UA = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, i) {
    return r.toUpperCase() + i;
  }
), T6 = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), VA = _r("RegExp"), _5 = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  Ll(n, (i, o) => {
    let s;
    (s = t(i, o, e)) !== !1 && (r[o] = s || i);
  }), Object.defineProperties(e, r);
}, GA = (e) => {
  _5(e, (t, n) => {
    if (ur(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (ur(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, WA = (e, t) => {
  const n = {}, r = (i) => {
    i.forEach((o) => {
      n[o] = !0;
    });
  };
  return Ua(e) ? r(e) : r(String(e).split(t)), n;
}, KA = () => {
}, YA = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, Np = "abcdefghijklmnopqrstuvwxyz", F6 = "0123456789", T5 = {
  DIGIT: F6,
  ALPHA: Np,
  ALPHA_DIGIT: Np + Np.toUpperCase() + F6
}, XA = (e = 16, t = T5.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function ZA(e) {
  return !!(e && ur(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const qA = (e) => {
  const t = new Array(10), n = (r, i) => {
    if (of(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[i] = r;
        const o = Ua(r) ? [] : {};
        return Ll(r, (s, u) => {
          const l = n(s, i + 1);
          !vl(l) && (o[u] = l);
        }), t[i] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, JA = _r("AsyncFunction"), QA = (e) => e && (of(e) || ur(e)) && ur(e.then) && ur(e.catch), ne = {
  isArray: Ua,
  isArrayBuffer: k5,
  isBuffer: vA,
  isFormData: DA,
  isArrayBufferView: EA,
  isString: CA,
  isNumber: D5,
  isBoolean: yA,
  isObject: of,
  isPlainObject: id,
  isReadableStream: IA,
  isRequest: PA,
  isResponse: _A,
  isHeaders: TA,
  isUndefined: vl,
  isDate: bA,
  isFile: wA,
  isBlob: SA,
  isRegExp: VA,
  isFunction: ur,
  isStream: kA,
  isURLSearchParams: AA,
  isTypedArray: NA,
  isFileList: xA,
  forEach: Ll,
  merge: Q1,
  extend: BA,
  trim: FA,
  stripBOM: MA,
  inherits: RA,
  toFlatObject: OA,
  kindOf: nf,
  kindOfTest: _r,
  endsWith: $A,
  toArray: LA,
  forEachEntry: zA,
  matchAll: jA,
  isHTMLForm: HA,
  hasOwnProperty: T6,
  hasOwnProp: T6,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: _5,
  freezeMethods: GA,
  toObjectSet: WA,
  toCamelCase: UA,
  noop: KA,
  toFiniteNumber: YA,
  findKey: A5,
  global: I5,
  isContextDefined: P5,
  ALPHABET: T5,
  generateString: XA,
  isSpecCompliantForm: ZA,
  toJSONObject: qA,
  isAsyncFn: JA,
  isThenable: QA
};
function Ue(e, t, n, r, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i);
}
ne.inherits(Ue, Error, {
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
      config: ne.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const F5 = Ue.prototype, B5 = {};
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
  B5[e] = { value: e };
});
Object.defineProperties(Ue, B5);
Object.defineProperty(F5, "isAxiosError", { value: !0 });
Ue.from = (e, t, n, r, i, o) => {
  const s = Object.create(F5);
  return ne.toFlatObject(e, s, function(l) {
    return l !== Error.prototype;
  }, (u) => u !== "isAxiosError"), Ue.call(s, e.message, t, n, r, i), s.cause = e, s.name = e.name, o && Object.assign(s, o), s;
};
const eI = null;
function em(e) {
  return ne.isPlainObject(e) || ne.isArray(e);
}
function M5(e) {
  return ne.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function B6(e, t, n) {
  return e ? e.concat(t).map(function(i, o) {
    return i = M5(i), !n && o ? "[" + i + "]" : i;
  }).join(n ? "." : "") : t;
}
function tI(e) {
  return ne.isArray(e) && !e.some(em);
}
const nI = ne.toFlatObject(ne, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function sf(e, t, n) {
  if (!ne.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = ne.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(y, b) {
    return !ne.isUndefined(b[y]);
  });
  const r = n.metaTokens, i = n.visitor || h, o = n.dots, s = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && ne.isSpecCompliantForm(t);
  if (!ne.isFunction(i))
    throw new TypeError("visitor must be a function");
  function f(E) {
    if (E === null) return "";
    if (ne.isDate(E))
      return E.toISOString();
    if (!l && ne.isBlob(E))
      throw new Ue("Blob is not supported. Use a Buffer instead.");
    return ne.isArrayBuffer(E) || ne.isTypedArray(E) ? l && typeof Blob == "function" ? new Blob([E]) : Buffer.from(E) : E;
  }
  function h(E, y, b) {
    let w = E;
    if (E && !b && typeof E == "object") {
      if (ne.endsWith(y, "{}"))
        y = r ? y : y.slice(0, -2), E = JSON.stringify(E);
      else if (ne.isArray(E) && tI(E) || (ne.isFileList(E) || ne.endsWith(y, "[]")) && (w = ne.toArray(E)))
        return y = M5(y), w.forEach(function(A, T) {
          !(ne.isUndefined(A) || A === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? B6([y], T, o) : s === null ? y : y + "[]",
            f(A)
          );
        }), !1;
    }
    return em(E) ? !0 : (t.append(B6(b, y, o), f(E)), !1);
  }
  const p = [], g = Object.assign(nI, {
    defaultVisitor: h,
    convertValue: f,
    isVisitable: em
  });
  function v(E, y) {
    if (!ne.isUndefined(E)) {
      if (p.indexOf(E) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      p.push(E), ne.forEach(E, function(w, k) {
        (!(ne.isUndefined(w) || w === null) && i.call(
          t,
          w,
          ne.isString(k) ? k.trim() : k,
          y,
          g
        )) === !0 && v(w, y ? y.concat(k) : [k]);
      }), p.pop();
    }
  }
  if (!ne.isObject(e))
    throw new TypeError("data must be an object");
  return v(e), t;
}
function M6(e) {
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
function Bg(e, t) {
  this._pairs = [], e && sf(e, this, t);
}
const R5 = Bg.prototype;
R5.append = function(t, n) {
  this._pairs.push([t, n]);
};
R5.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, M6);
  } : M6;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function rI(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function O5(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || rI, i = n && n.serialize;
  let o;
  if (i ? o = i(t, n) : o = ne.isURLSearchParams(t) ? t.toString() : new Bg(t, n).toString(r), o) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class R6 {
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
    ne.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const $5 = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, iI = typeof URLSearchParams < "u" ? URLSearchParams : Bg, oI = typeof FormData < "u" ? FormData : null, sI = typeof Blob < "u" ? Blob : null, aI = {
  isBrowser: !0,
  classes: {
    URLSearchParams: iI,
    FormData: oI,
    Blob: sI
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Mg = typeof window < "u" && typeof document < "u", uI = ((e) => Mg && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product), lI = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", cI = Mg && window.location.href || "http://localhost", dI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Mg,
  hasStandardBrowserEnv: uI,
  hasStandardBrowserWebWorkerEnv: lI,
  origin: cI
}, Symbol.toStringTag, { value: "Module" })), Dr = {
  ...dI,
  ...aI
};
function fI(e, t) {
  return sf(e, new Dr.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, i, o) {
      return Dr.isNode && ne.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function hI(e) {
  return ne.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function pI(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const i = n.length;
  let o;
  for (r = 0; r < i; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function L5(e) {
  function t(n, r, i, o) {
    let s = n[o++];
    if (s === "__proto__") return !0;
    const u = Number.isFinite(+s), l = o >= n.length;
    return s = !s && ne.isArray(i) ? i.length : s, l ? (ne.hasOwnProp(i, s) ? i[s] = [i[s], r] : i[s] = r, !u) : ((!i[s] || !ne.isObject(i[s])) && (i[s] = []), t(n, r, i[s], o) && ne.isArray(i[s]) && (i[s] = pI(i[s])), !u);
  }
  if (ne.isFormData(e) && ne.isFunction(e.entries)) {
    const n = {};
    return ne.forEachEntry(e, (r, i) => {
      t(hI(r), i, n, 0);
    }), n;
  }
  return null;
}
function mI(e, t, n) {
  if (ne.isString(e))
    try {
      return (t || JSON.parse)(e), ne.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const Nl = {
  transitional: $5,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", i = r.indexOf("application/json") > -1, o = ne.isObject(t);
    if (o && ne.isHTMLForm(t) && (t = new FormData(t)), ne.isFormData(t))
      return i ? JSON.stringify(L5(t)) : t;
    if (ne.isArrayBuffer(t) || ne.isBuffer(t) || ne.isStream(t) || ne.isFile(t) || ne.isBlob(t) || ne.isReadableStream(t))
      return t;
    if (ne.isArrayBufferView(t))
      return t.buffer;
    if (ne.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let u;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return fI(t, this.formSerializer).toString();
      if ((u = ne.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return sf(
          u ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return o || i ? (n.setContentType("application/json", !1), mI(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Nl.transitional, r = n && n.forcedJSONParsing, i = this.responseType === "json";
    if (ne.isResponse(t) || ne.isReadableStream(t))
      return t;
    if (t && ne.isString(t) && (r && !this.responseType || i)) {
      const s = !(n && n.silentJSONParsing) && i;
      try {
        return JSON.parse(t);
      } catch (u) {
        if (s)
          throw u.name === "SyntaxError" ? Ue.from(u, Ue.ERR_BAD_RESPONSE, this, null, this.response) : u;
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
    FormData: Dr.classes.FormData,
    Blob: Dr.classes.Blob
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
ne.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Nl.headers[e] = {};
});
const gI = ne.toObjectSet([
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
]), vI = (e) => {
  const t = {};
  let n, r, i;
  return e && e.split(`
`).forEach(function(s) {
    i = s.indexOf(":"), n = s.substring(0, i).trim().toLowerCase(), r = s.substring(i + 1).trim(), !(!n || t[n] && gI[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, O6 = Symbol("internals");
function Ku(e) {
  return e && String(e).trim().toLowerCase();
}
function od(e) {
  return e === !1 || e == null ? e : ne.isArray(e) ? e.map(od) : String(e);
}
function EI(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const CI = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function zp(e, t, n, r, i) {
  if (ne.isFunction(r))
    return r.call(this, t, n);
  if (i && (t = n), !!ne.isString(t)) {
    if (ne.isString(r))
      return t.indexOf(r) !== -1;
    if (ne.isRegExp(r))
      return r.test(t);
  }
}
function yI(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function bI(e, t) {
  const n = ne.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(i, o, s) {
        return this[r].call(this, t, i, o, s);
      },
      configurable: !0
    });
  });
}
class Tn {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function o(u, l, f) {
      const h = Ku(l);
      if (!h)
        throw new Error("header name must be a non-empty string");
      const p = ne.findKey(i, h);
      (!p || i[p] === void 0 || f === !0 || f === void 0 && i[p] !== !1) && (i[p || l] = od(u));
    }
    const s = (u, l) => ne.forEach(u, (f, h) => o(f, h, l));
    if (ne.isPlainObject(t) || t instanceof this.constructor)
      s(t, n);
    else if (ne.isString(t) && (t = t.trim()) && !CI(t))
      s(vI(t), n);
    else if (ne.isHeaders(t))
      for (const [u, l] of t.entries())
        o(l, u, r);
    else
      t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = Ku(t), t) {
      const r = ne.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n)
          return i;
        if (n === !0)
          return EI(i);
        if (ne.isFunction(n))
          return n.call(this, i, r);
        if (ne.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Ku(t), t) {
      const r = ne.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || zp(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let i = !1;
    function o(s) {
      if (s = Ku(s), s) {
        const u = ne.findKey(r, s);
        u && (!n || zp(r, r[u], u, n)) && (delete r[u], i = !0);
      }
    }
    return ne.isArray(t) ? t.forEach(o) : o(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, i = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || zp(this, this[o], o, t, !0)) && (delete this[o], i = !0);
    }
    return i;
  }
  normalize(t) {
    const n = this, r = {};
    return ne.forEach(this, (i, o) => {
      const s = ne.findKey(r, o);
      if (s) {
        n[s] = od(i), delete n[o];
        return;
      }
      const u = t ? yI(o) : String(o).trim();
      u !== o && delete n[o], n[u] = od(i), r[u] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return ne.forEach(this, (r, i) => {
      r != null && r !== !1 && (n[i] = t && ne.isArray(r) ? r.join(", ") : r);
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
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[O6] = this[O6] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function o(s) {
      const u = Ku(s);
      r[u] || (bI(i, s), r[u] = !0);
    }
    return ne.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
Tn.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
ne.reduceDescriptors(Tn.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
ne.freezeMethods(Tn);
function jp(e, t) {
  const n = this || Nl, r = t || n, i = Tn.from(r.headers);
  let o = r.data;
  return ne.forEach(e, function(u) {
    o = u.call(n, o, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), o;
}
function N5(e) {
  return !!(e && e.__CANCEL__);
}
function Va(e, t, n) {
  Ue.call(this, e ?? "canceled", Ue.ERR_CANCELED, t, n), this.name = "CanceledError";
}
ne.inherits(Va, Ue, {
  __CANCEL__: !0
});
function z5(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new Ue(
    "Request failed with status code " + n.status,
    [Ue.ERR_BAD_REQUEST, Ue.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function wI(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function SI(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let i = 0, o = 0, s;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const f = Date.now(), h = r[o];
    s || (s = f), n[i] = l, r[i] = f;
    let p = o, g = 0;
    for (; p !== i; )
      g += n[p++], p = p % e;
    if (i = (i + 1) % e, i === o && (o = (o + 1) % e), f - s < t)
      return;
    const v = h && f - h;
    return v ? Math.round(g * 1e3 / v) : void 0;
  };
}
function xI(e, t) {
  let n = 0;
  const r = 1e3 / t;
  let i = null;
  return function() {
    const s = this === !0, u = Date.now();
    if (s || u - n > r)
      return i && (clearTimeout(i), i = null), n = u, e.apply(null, arguments);
    i || (i = setTimeout(() => (i = null, n = Date.now(), e.apply(null, arguments)), r - (u - n)));
  };
}
const Cd = (e, t, n = 3) => {
  let r = 0;
  const i = SI(50, 250);
  return xI((o) => {
    const s = o.loaded, u = o.lengthComputable ? o.total : void 0, l = s - r, f = i(l), h = s <= u;
    r = s;
    const p = {
      loaded: s,
      total: u,
      progress: u ? s / u : void 0,
      bytes: l,
      rate: f || void 0,
      estimated: f && u && h ? (u - s) / f : void 0,
      event: o,
      lengthComputable: u != null
    };
    p[t ? "download" : "upload"] = !0, e(p);
  }, n);
}, kI = Dr.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    let r;
    function i(o) {
      let s = o;
      return t && (n.setAttribute("href", s), s = n.href), n.setAttribute("href", s), {
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
    return r = i(window.location.href), function(s) {
      const u = ne.isString(s) ? i(s) : s;
      return u.protocol === r.protocol && u.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), DI = Dr.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, i, o) {
      const s = [e + "=" + encodeURIComponent(t)];
      ne.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), ne.isString(r) && s.push("path=" + r), ne.isString(i) && s.push("domain=" + i), o === !0 && s.push("secure"), document.cookie = s.join("; ");
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
function AI(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function II(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function j5(e, t) {
  return e && !AI(t) ? II(e, t) : t;
}
const $6 = (e) => e instanceof Tn ? { ...e } : e;
function ds(e, t) {
  t = t || {};
  const n = {};
  function r(f, h, p) {
    return ne.isPlainObject(f) && ne.isPlainObject(h) ? ne.merge.call({ caseless: p }, f, h) : ne.isPlainObject(h) ? ne.merge({}, h) : ne.isArray(h) ? h.slice() : h;
  }
  function i(f, h, p) {
    if (ne.isUndefined(h)) {
      if (!ne.isUndefined(f))
        return r(void 0, f, p);
    } else return r(f, h, p);
  }
  function o(f, h) {
    if (!ne.isUndefined(h))
      return r(void 0, h);
  }
  function s(f, h) {
    if (ne.isUndefined(h)) {
      if (!ne.isUndefined(f))
        return r(void 0, f);
    } else return r(void 0, h);
  }
  function u(f, h, p) {
    if (p in t)
      return r(f, h);
    if (p in e)
      return r(void 0, f);
  }
  const l = {
    url: o,
    method: o,
    data: o,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    withXSRFToken: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: u,
    headers: (f, h) => i($6(f), $6(h), !0)
  };
  return ne.forEach(Object.keys(Object.assign({}, e, t)), function(h) {
    const p = l[h] || i, g = p(e[h], t[h], h);
    ne.isUndefined(g) && p !== u || (n[h] = g);
  }), n;
}
const H5 = (e) => {
  const t = ds({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: i, xsrfCookieName: o, headers: s, auth: u } = t;
  t.headers = s = Tn.from(s), t.url = O5(j5(t.baseURL, t.url), e.params, e.paramsSerializer), u && s.set(
    "Authorization",
    "Basic " + btoa((u.username || "") + ":" + (u.password ? unescape(encodeURIComponent(u.password)) : ""))
  );
  let l;
  if (ne.isFormData(n)) {
    if (Dr.hasStandardBrowserEnv || Dr.hasStandardBrowserWebWorkerEnv)
      s.setContentType(void 0);
    else if ((l = s.getContentType()) !== !1) {
      const [f, ...h] = l ? l.split(";").map((p) => p.trim()).filter(Boolean) : [];
      s.setContentType([f || "multipart/form-data", ...h].join("; "));
    }
  }
  if (Dr.hasStandardBrowserEnv && (r && ne.isFunction(r) && (r = r(t)), r || r !== !1 && kI(t.url))) {
    const f = i && o && DI.read(o);
    f && s.set(i, f);
  }
  return t;
}, PI = typeof XMLHttpRequest < "u", _I = PI && function(e) {
  return new Promise(function(n, r) {
    const i = H5(e);
    let o = i.data;
    const s = Tn.from(i.headers).normalize();
    let { responseType: u } = i, l;
    function f() {
      i.cancelToken && i.cancelToken.unsubscribe(l), i.signal && i.signal.removeEventListener("abort", l);
    }
    let h = new XMLHttpRequest();
    h.open(i.method.toUpperCase(), i.url, !0), h.timeout = i.timeout;
    function p() {
      if (!h)
        return;
      const v = Tn.from(
        "getAllResponseHeaders" in h && h.getAllResponseHeaders()
      ), y = {
        data: !u || u === "text" || u === "json" ? h.responseText : h.response,
        status: h.status,
        statusText: h.statusText,
        headers: v,
        config: e,
        request: h
      };
      z5(function(w) {
        n(w), f();
      }, function(w) {
        r(w), f();
      }, y), h = null;
    }
    "onloadend" in h ? h.onloadend = p : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(p);
    }, h.onabort = function() {
      h && (r(new Ue("Request aborted", Ue.ECONNABORTED, i, h)), h = null);
    }, h.onerror = function() {
      r(new Ue("Network Error", Ue.ERR_NETWORK, i, h)), h = null;
    }, h.ontimeout = function() {
      let E = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const y = i.transitional || $5;
      i.timeoutErrorMessage && (E = i.timeoutErrorMessage), r(new Ue(
        E,
        y.clarifyTimeoutError ? Ue.ETIMEDOUT : Ue.ECONNABORTED,
        i,
        h
      )), h = null;
    }, o === void 0 && s.setContentType(null), "setRequestHeader" in h && ne.forEach(s.toJSON(), function(E, y) {
      h.setRequestHeader(y, E);
    }), ne.isUndefined(i.withCredentials) || (h.withCredentials = !!i.withCredentials), u && u !== "json" && (h.responseType = i.responseType), typeof i.onDownloadProgress == "function" && h.addEventListener("progress", Cd(i.onDownloadProgress, !0)), typeof i.onUploadProgress == "function" && h.upload && h.upload.addEventListener("progress", Cd(i.onUploadProgress)), (i.cancelToken || i.signal) && (l = (v) => {
      h && (r(!v || v.type ? new Va(null, e, h) : v), h.abort(), h = null);
    }, i.cancelToken && i.cancelToken.subscribe(l), i.signal && (i.signal.aborted ? l() : i.signal.addEventListener("abort", l)));
    const g = wI(i.url);
    if (g && Dr.protocols.indexOf(g) === -1) {
      r(new Ue("Unsupported protocol " + g + ":", Ue.ERR_BAD_REQUEST, e));
      return;
    }
    h.send(o || null);
  });
}, TI = (e, t) => {
  let n = new AbortController(), r;
  const i = function(l) {
    if (!r) {
      r = !0, s();
      const f = l instanceof Error ? l : this.reason;
      n.abort(f instanceof Ue ? f : new Va(f instanceof Error ? f.message : f));
    }
  };
  let o = t && setTimeout(() => {
    i(new Ue(`timeout ${t} of ms exceeded`, Ue.ETIMEDOUT));
  }, t);
  const s = () => {
    e && (o && clearTimeout(o), o = null, e.forEach((l) => {
      l && (l.removeEventListener ? l.removeEventListener("abort", i) : l.unsubscribe(i));
    }), e = null);
  };
  e.forEach((l) => l && l.addEventListener && l.addEventListener("abort", i));
  const { signal: u } = n;
  return u.unsubscribe = s, [u, () => {
    o && clearTimeout(o), o = null;
  }];
}, FI = function* (e, t) {
  let n = e.byteLength;
  if (!t || n < t) {
    yield e;
    return;
  }
  let r = 0, i;
  for (; r < n; )
    i = r + t, yield e.slice(r, i), r = i;
}, BI = async function* (e, t, n) {
  for await (const r of e)
    yield* FI(ArrayBuffer.isView(r) ? r : await n(String(r)), t);
}, L6 = (e, t, n, r, i) => {
  const o = BI(e, t, i);
  let s = 0;
  return new ReadableStream({
    type: "bytes",
    async pull(u) {
      const { done: l, value: f } = await o.next();
      if (l) {
        u.close(), r();
        return;
      }
      let h = f.byteLength;
      n && n(s += h), u.enqueue(new Uint8Array(f));
    },
    cancel(u) {
      return r(u), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, N6 = (e, t) => {
  const n = e != null;
  return (r) => setTimeout(() => t({
    lengthComputable: n,
    total: e,
    loaded: r
  }));
}, af = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", U5 = af && typeof ReadableStream == "function", tm = af && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), MI = U5 && (() => {
  let e = !1;
  const t = new Request(Dr.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
})(), z6 = 64 * 1024, nm = U5 && !!(() => {
  try {
    return ne.isReadableStream(new Response("").body);
  } catch {
  }
})(), yd = {
  stream: nm && ((e) => e.body)
};
af && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !yd[t] && (yd[t] = ne.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new Ue(`Response type '${t}' is not supported`, Ue.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const RI = async (e) => {
  if (e == null)
    return 0;
  if (ne.isBlob(e))
    return e.size;
  if (ne.isSpecCompliantForm(e))
    return (await new Request(e).arrayBuffer()).byteLength;
  if (ne.isArrayBufferView(e))
    return e.byteLength;
  if (ne.isURLSearchParams(e) && (e = e + ""), ne.isString(e))
    return (await tm(e)).byteLength;
}, OI = async (e, t) => {
  const n = ne.toFiniteNumber(e.getContentLength());
  return n ?? RI(t);
}, $I = af && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: i,
    cancelToken: o,
    timeout: s,
    onDownloadProgress: u,
    onUploadProgress: l,
    responseType: f,
    headers: h,
    withCredentials: p = "same-origin",
    fetchOptions: g
  } = H5(e);
  f = f ? (f + "").toLowerCase() : "text";
  let [v, E] = i || o || s ? TI([i, o], s) : [], y, b;
  const w = () => {
    !y && setTimeout(() => {
      v && v.unsubscribe();
    }), y = !0;
  };
  let k;
  try {
    if (l && MI && n !== "get" && n !== "head" && (k = await OI(h, r)) !== 0) {
      let I = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), B;
      ne.isFormData(r) && (B = I.headers.get("content-type")) && h.setContentType(B), I.body && (r = L6(I.body, z6, N6(
        k,
        Cd(l)
      ), null, tm));
    }
    ne.isString(p) || (p = p ? "cors" : "omit"), b = new Request(t, {
      ...g,
      signal: v,
      method: n.toUpperCase(),
      headers: h.normalize().toJSON(),
      body: r,
      duplex: "half",
      withCredentials: p
    });
    let A = await fetch(b);
    const T = nm && (f === "stream" || f === "response");
    if (nm && (u || T)) {
      const I = {};
      ["status", "statusText", "headers"].forEach((M) => {
        I[M] = A[M];
      });
      const B = ne.toFiniteNumber(A.headers.get("content-length"));
      A = new Response(
        L6(A.body, z6, u && N6(
          B,
          Cd(u, !0)
        ), T && w, tm),
        I
      );
    }
    f = f || "text";
    let _ = await yd[ne.findKey(yd, f) || "text"](A, e);
    return !T && w(), E && E(), await new Promise((I, B) => {
      z5(I, B, {
        data: _,
        headers: Tn.from(A.headers),
        status: A.status,
        statusText: A.statusText,
        config: e,
        request: b
      });
    });
  } catch (A) {
    throw w(), A && A.name === "TypeError" && /fetch/i.test(A.message) ? Object.assign(
      new Ue("Network Error", Ue.ERR_NETWORK, e, b),
      {
        cause: A.cause || A
      }
    ) : Ue.from(A, A && A.code, e, b);
  }
}), rm = {
  http: eI,
  xhr: _I,
  fetch: $I
};
ne.forEach(rm, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const j6 = (e) => `- ${e}`, LI = (e) => ne.isFunction(e) || e === null || e === !1, V5 = {
  getAdapter: (e) => {
    e = ne.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const i = {};
    for (let o = 0; o < t; o++) {
      n = e[o];
      let s;
      if (r = n, !LI(n) && (r = rm[(s = String(n)).toLowerCase()], r === void 0))
        throw new Ue(`Unknown adapter '${s}'`);
      if (r)
        break;
      i[s || "#" + o] = r;
    }
    if (!r) {
      const o = Object.entries(i).map(
        ([u, l]) => `adapter ${u} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let s = t ? o.length > 1 ? `since :
` + o.map(j6).join(`
`) : " " + j6(o[0]) : "as no adapter specified";
      throw new Ue(
        "There is no suitable adapter to dispatch the request " + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: rm
};
function Hp(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Va(null, e);
}
function H6(e) {
  return Hp(e), e.headers = Tn.from(e.headers), e.data = jp.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), V5.getAdapter(e.adapter || Nl.adapter)(e).then(function(r) {
    return Hp(e), r.data = jp.call(
      e,
      e.transformResponse,
      r
    ), r.headers = Tn.from(r.headers), r;
  }, function(r) {
    return N5(r) || (Hp(e), r && r.response && (r.response.data = jp.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = Tn.from(r.response.headers))), Promise.reject(r);
  });
}
const G5 = "1.7.2", Rg = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Rg[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const U6 = {};
Rg.transitional = function(t, n, r) {
  function i(o, s) {
    return "[Axios v" + G5 + "] Transitional option '" + o + "'" + s + (r ? ". " + r : "");
  }
  return (o, s, u) => {
    if (t === !1)
      throw new Ue(
        i(s, " has been removed" + (n ? " in " + n : "")),
        Ue.ERR_DEPRECATED
      );
    return n && !U6[s] && (U6[s] = !0, console.warn(
      i(
        s,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, s, u) : !0;
  };
};
function NI(e, t, n) {
  if (typeof e != "object")
    throw new Ue("options must be an object", Ue.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let i = r.length;
  for (; i-- > 0; ) {
    const o = r[i], s = t[o];
    if (s) {
      const u = e[o], l = u === void 0 || s(u, o, e);
      if (l !== !0)
        throw new Ue("option " + o + " must be " + l, Ue.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new Ue("Unknown option " + o, Ue.ERR_BAD_OPTION);
  }
}
const im = {
  assertOptions: NI,
  validators: Rg
}, io = im.validators;
class ss {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new R6(),
      response: new R6()
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
        let i;
        Error.captureStackTrace ? Error.captureStackTrace(i = {}) : i = new Error();
        const o = i.stack ? i.stack.replace(/^.+\n/, "") : "";
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
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = ds(this.defaults, n);
    const { transitional: r, paramsSerializer: i, headers: o } = n;
    r !== void 0 && im.assertOptions(r, {
      silentJSONParsing: io.transitional(io.boolean),
      forcedJSONParsing: io.transitional(io.boolean),
      clarifyTimeoutError: io.transitional(io.boolean)
    }, !1), i != null && (ne.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : im.assertOptions(i, {
      encode: io.function,
      serialize: io.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let s = o && ne.merge(
      o.common,
      o[n.method]
    );
    o && ne.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (E) => {
        delete o[E];
      }
    ), n.headers = Tn.concat(s, o);
    const u = [];
    let l = !0;
    this.interceptors.request.forEach(function(y) {
      typeof y.runWhen == "function" && y.runWhen(n) === !1 || (l = l && y.synchronous, u.unshift(y.fulfilled, y.rejected));
    });
    const f = [];
    this.interceptors.response.forEach(function(y) {
      f.push(y.fulfilled, y.rejected);
    });
    let h, p = 0, g;
    if (!l) {
      const E = [H6.bind(this), void 0];
      for (E.unshift.apply(E, u), E.push.apply(E, f), g = E.length, h = Promise.resolve(n); p < g; )
        h = h.then(E[p++], E[p++]);
      return h;
    }
    g = u.length;
    let v = n;
    for (p = 0; p < g; ) {
      const E = u[p++], y = u[p++];
      try {
        v = E(v);
      } catch (b) {
        y.call(this, b);
        break;
      }
    }
    try {
      h = H6.call(this, v);
    } catch (E) {
      return Promise.reject(E);
    }
    for (p = 0, g = f.length; p < g; )
      h = h.then(f[p++], f[p++]);
    return h;
  }
  getUri(t) {
    t = ds(this.defaults, t);
    const n = j5(t.baseURL, t.url);
    return O5(n, t.params, t.paramsSerializer);
  }
}
ne.forEach(["delete", "get", "head", "options"], function(t) {
  ss.prototype[t] = function(n, r) {
    return this.request(ds(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
ne.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(o, s, u) {
      return this.request(ds(u || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: s
      }));
    };
  }
  ss.prototype[t] = n(), ss.prototype[t + "Form"] = n(!0);
});
class Og {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; )
        r._listeners[o](i);
      r._listeners = null;
    }), this.promise.then = (i) => {
      let o;
      const s = new Promise((u) => {
        r.subscribe(u), o = u;
      }).then(i);
      return s.cancel = function() {
        r.unsubscribe(o);
      }, s;
    }, t(function(o, s, u) {
      r.reason || (r.reason = new Va(o, s, u), n(r.reason));
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
      token: new Og(function(i) {
        t = i;
      }),
      cancel: t
    };
  }
}
function zI(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function jI(e) {
  return ne.isObject(e) && e.isAxiosError === !0;
}
const om = {
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
Object.entries(om).forEach(([e, t]) => {
  om[t] = e;
});
function W5(e) {
  const t = new ss(e), n = x5(ss.prototype.request, t);
  return ne.extend(n, ss.prototype, t, { allOwnKeys: !0 }), ne.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(i) {
    return W5(ds(e, i));
  }, n;
}
const Ht = W5(Nl);
Ht.Axios = ss;
Ht.CanceledError = Va;
Ht.CancelToken = Og;
Ht.isCancel = N5;
Ht.VERSION = G5;
Ht.toFormData = sf;
Ht.AxiosError = Ue;
Ht.Cancel = Ht.CanceledError;
Ht.all = function(t) {
  return Promise.all(t);
};
Ht.spread = zI;
Ht.isAxiosError = jI;
Ht.mergeConfig = ds;
Ht.AxiosHeaders = Tn;
Ht.formToJSON = (e) => L5(ne.isHTMLForm(e) ? new FormData(e) : e);
Ht.getAdapter = V5.getAdapter;
Ht.HttpStatusCode = om;
Ht.default = Ht;
var K5 = "Expected a function", V6 = NaN, HI = "[object Symbol]", UI = /^\s+|\s+$/g, VI = /^[-+]0x[0-9a-f]+$/i, GI = /^0b[01]+$/i, WI = /^0o[0-7]+$/i, KI = parseInt, YI = typeof mo == "object" && mo && mo.Object === Object && mo, XI = typeof self == "object" && self && self.Object === Object && self, ZI = YI || XI || Function("return this")(), qI = Object.prototype, JI = qI.toString, QI = Math.max, eP = Math.min, Up = function() {
  return ZI.Date.now();
};
function tP(e, t, n) {
  var r, i, o, s, u, l, f = 0, h = !1, p = !1, g = !0;
  if (typeof e != "function")
    throw new TypeError(K5);
  t = G6(t) || 0, bd(n) && (h = !!n.leading, p = "maxWait" in n, o = p ? QI(G6(n.maxWait) || 0, t) : o, g = "trailing" in n ? !!n.trailing : g);
  function v(I) {
    var B = r, M = i;
    return r = i = void 0, f = I, s = e.apply(M, B), s;
  }
  function E(I) {
    return f = I, u = setTimeout(w, t), h ? v(I) : s;
  }
  function y(I) {
    var B = I - l, M = I - f, H = t - B;
    return p ? eP(H, o - M) : H;
  }
  function b(I) {
    var B = I - l, M = I - f;
    return l === void 0 || B >= t || B < 0 || p && M >= o;
  }
  function w() {
    var I = Up();
    if (b(I))
      return k(I);
    u = setTimeout(w, y(I));
  }
  function k(I) {
    return u = void 0, g && r ? v(I) : (r = i = void 0, s);
  }
  function A() {
    u !== void 0 && clearTimeout(u), f = 0, r = l = i = u = void 0;
  }
  function T() {
    return u === void 0 ? s : k(Up());
  }
  function _() {
    var I = Up(), B = b(I);
    if (r = arguments, i = this, l = I, B) {
      if (u === void 0)
        return E(l);
      if (p)
        return u = setTimeout(w, t), v(l);
    }
    return u === void 0 && (u = setTimeout(w, t)), s;
  }
  return _.cancel = A, _.flush = T, _;
}
function nP(e, t, n) {
  var r = !0, i = !0;
  if (typeof e != "function")
    throw new TypeError(K5);
  return bd(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), tP(e, t, {
    leading: r,
    maxWait: t,
    trailing: i
  });
}
function bd(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function rP(e) {
  return !!e && typeof e == "object";
}
function iP(e) {
  return typeof e == "symbol" || rP(e) && JI.call(e) == HI;
}
function G6(e) {
  if (typeof e == "number")
    return e;
  if (iP(e))
    return V6;
  if (bd(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = bd(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(UI, "");
  var n = GI.test(e);
  return n || WI.test(e) ? KI(e.slice(2), n ? 2 : 8) : VI.test(e) ? V6 : +e;
}
var oP = nP;
const nl = /* @__PURE__ */ Ha(oP), zl = Ht.create({
  timeout: "10000"
});
let El, wd, Y5;
const sP = (e) => {
  El = e;
}, aP = async () => {
  try {
    const {
      encoded: e,
      decoded: { exp: t, iat: n }
    } = await J1();
    El = `Bearer ${e}`, wd = (t - n) * 1e3 * 0.75, Y5 = nl(async () => {
      try {
        const { encoded: r } = await J1();
        El = `Bearer ${r}`;
      } catch {
      }
    }, wd);
  } catch {
  }
};
zl.interceptors.request.use(async (e) => (!wd && !El ? await aP() : wd && await Y5(), e.headers.Authorization = El, e));
var uP = {
  prefix: "fas",
  iconName: "circle-notch",
  icon: [512, 512, [], "f1ce", "M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"]
}, lP = {
  prefix: "fas",
  iconName: "users",
  icon: [640, 512, [], "f0c0", "M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"]
}, cP = {
  prefix: "fas",
  iconName: "floppy-disk",
  icon: [448, 512, [128190, 128426, "save"], "f0c7", "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"]
}, dP = {
  prefix: "fas",
  iconName: "triangle-exclamation",
  icon: [512, 512, [9888, "exclamation-triangle", "warning"], "f071", "M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"]
}, fP = { GJS_DEBUG_TOPICS: "JS ERROR;JS LOG", LESSOPEN: "| /usr/bin/lesspipe %s", USER: "quentin", npm_config_user_agent: "yarn/4.3.1 npm/? node/v20.15.0 linux x64", GIO_MODULE_DIR: "/home/quentin/snap/code/common/.cache/gio-modules", XDG_SESSION_TYPE: "wayland", GIT_ASKPASS: "/snap/code/163/usr/share/code/resources/app/extensions/git/dist/askpass.sh", GTK_EXE_PREFIX_VSCODE_SNAP_ORIG: "", npm_node_execpath: "/tmp/xfs-b9c0de56/node", GDK_BACKEND_VSCODE_SNAP_ORIG: "", SHLVL: "2", HOME: "/home/quentin", CHROME_DESKTOP: "code-url-handler.desktop", LOCPATH_VSCODE_SNAP_ORIG: "", OLDPWD: "/home/quentin/git/recia-webcomponents/packages/tldraw", TERM_PROGRAM_VERSION: "1.91.0", DESKTOP_SESSION: "ubuntu", GTK_PATH: "/snap/code/163/usr/lib/x86_64-linux-gnu/gtk-3.0", NVM_BIN: "/home/quentin/.nvm/versions/node/v20.15.0/bin", npm_package_json: "/home/quentin/git/recia-webcomponents/packages/tldraw/package.json", NVM_INC: "/home/quentin/.nvm/versions/node/v20.15.0/include/node", GTK_IM_MODULE_FILE: "/home/quentin/snap/code/common/.cache/immodules/immodules.cache", GIO_LAUNCHED_DESKTOP_FILE: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SHELL_SESSION_MODE: "ubuntu", GTK_MODULES: "gail:atk-bridge", GSETTINGS_SCHEMA_DIR_VSCODE_SNAP_ORIG: "", VSCODE_GIT_ASKPASS_MAIN: "/snap/code/163/usr/share/code/resources/app/extensions/git/dist/askpass-main.js", VSCODE_GIT_ASKPASS_NODE: "/snap/code/163/usr/share/code/code", MANAGERPID: "2751", DBUS_STARTER_BUS_TYPE: "session", SYSTEMD_EXEC_PID: "2903", DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus,guid=9983a870354527138352c54f66879b2d", COLORTERM: "truecolor", LIBVIRT_DEFAULT_URI: "qemu:///system", GIO_LAUNCHED_DESKTOP_FILE_PID: "11151", NVM_DIR: "/home/quentin/.nvm", IM_CONFIG_PHASE: "1", WAYLAND_DISPLAY: "wayland-0", LOGNAME: "quentin", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", JOURNAL_STREAM: "8:45293", _: "/home/quentin/.nvm/versions/node/v20.15.0/bin/yarn", XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: "/etc/xdg/xdg-ubuntu:/etc/xdg", XDG_SESSION_CLASS: "user", XDG_DATA_DIRS_VSCODE_SNAP_ORIG: "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", USERNAME: "quentin", TERM: "xterm-256color", GNOME_DESKTOP_SESSION_ID: "this-is-deprecated", PATH: "/tmp/xfs-b9c0de56:/tmp/xfs-a124c425:/home/quentin/.nvm/versions/node/v20.15.0/bin:/home/quentin/.sdkman/candidates/java/current/bin:/home/quentin/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin:/home/quentin/.local/share/JetBrains/Toolbox/scripts", SESSION_MANAGER: "local/DELL-QGuillemin:@/tmp/.ICE-unix/2903,unix/DELL-QGuillemin:/tmp/.ICE-unix/2903", SDKMAN_CANDIDATES_DIR: "/home/quentin/.sdkman/candidates", GTK_EXE_PREFIX: "/snap/code/163/usr", INVOCATION_ID: "172dfd29144f4a3ab8078b9a4e197fe2", npm_package_name: "@gip-recia/tldraw-webcomponent", XDG_MENU_PREFIX: "gnome-", BAMF_DESKTOP_FILE_HINT: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_TERMINAL_SCREEN: "/org/gnome/Terminal/screen/f72afa51_589a_4b92_a06b_36e030345315", GNOME_SETUP_DISPLAY: ":1", XDG_RUNTIME_DIR: "/run/user/1000", GDK_BACKEND: "x11", DISPLAY: ":0", LOCPATH: "/snap/code/163/usr/lib/locale", LANG: "fr_FR.UTF-8", XDG_CURRENT_DESKTOP: "Unity", GIO_MODULE_DIR_VSCODE_SNAP_ORIG: "", XMODIFIERS: "@im=ibus", XDG_SESSION_DESKTOP: "ubuntu", XAUTHORITY: "/run/user/1000/.mutter-Xwaylandauth.FQF5P2", LS_COLORS: "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:", VSCODE_GIT_IPC_HANDLE: "/run/user/1000/vscode-git-0200aebe89.sock", GNOME_TERMINAL_SERVICE: ":1.190", SDKMAN_DIR: "/home/quentin/.sdkman", SDKMAN_PLATFORM: "linuxx64", TERM_PROGRAM: "vscode", SSH_AGENT_LAUNCHER: "gnome-keyring", SSH_AUTH_SOCK: "/run/user/1000/keyring/ssh", GSETTINGS_SCHEMA_DIR: "/home/quentin/snap/code/163/.local/share/glib-2.0/schemas", ORIGINAL_XDG_CURRENT_DESKTOP: "ubuntu:GNOME", PROJECT_CWD: "/home/quentin/git/recia-webcomponents", SHELL: "/bin/bash", INSIDE_NAUTILUS_PYTHON: "", npm_package_version: "3.6.0", npm_lifecycle_event: "build", QT_ACCESSIBILITY: "1", NO_AT_BRIDGE: "1", GDMSESSION: "ubuntu", LESSCLOSE: "/usr/bin/lesspipe %s %s", GTK_PATH_VSCODE_SNAP_ORIG: "", GTK_IM_MODULE_FILE_VSCODE_SNAP_ORIG: "", GJS_DEBUG_OUTPUT: "stderr", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", QT_IM_MODULE: "ibus", JAVA_HOME: "/home/quentin/.sdkman/candidates/java/current", GPG_TTY: "/dev/pts/2", PWD: "/home/quentin/git/recia-webcomponents/packages/tldraw", BERRY_BIN_FOLDER: "/tmp/xfs-b9c0de56", npm_execpath: "/tmp/xfs-b9c0de56/yarn", XDG_CONFIG_DIRS: "/etc/xdg/xdg-ubuntu:/etc/xdg", NVM_CD_FLAGS: "", DBUS_STARTER_ADDRESS: "unix:path=/run/user/1000/bus,guid=9983a870354527138352c54f66879b2d", XDG_DATA_DIRS: "/home/quentin/snap/code/163/.local/share:/home/quentin/snap/code/163:/snap/code/163/usr/share:/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", VTE_VERSION: "6800", INIT_CWD: "/home/quentin/git/recia-webcomponents/packages/tldraw", NODE_ENV: "production", VITE_BASE_URI: "/", VITE_AXIOS_TIMEOUT: "10000" };
function W6(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function xe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? W6(Object(n), !0).forEach(function(r) {
      Yt(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : W6(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Sd(e) {
  "@babel/helpers - typeof";
  return Sd = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Sd(e);
}
function hP(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function pP(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function mP(e, t, n) {
  return t && pP(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function Yt(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function $g(e, t) {
  return vP(e) || CP(e, t) || X5(e, t) || bP();
}
function jl(e) {
  return gP(e) || EP(e) || X5(e) || yP();
}
function gP(e) {
  if (Array.isArray(e)) return sm(e);
}
function vP(e) {
  if (Array.isArray(e)) return e;
}
function EP(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function CP(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r = [], i = !0, o = !1, s, u;
    try {
      for (n = n.call(e); !(i = (s = n.next()).done) && (r.push(s.value), !(t && r.length === t)); i = !0)
        ;
    } catch (l) {
      o = !0, u = l;
    } finally {
      try {
        !i && n.return != null && n.return();
      } finally {
        if (o) throw u;
      }
    }
    return r;
  }
}
function X5(e, t) {
  if (e) {
    if (typeof e == "string") return sm(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return sm(e, t);
  }
}
function sm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function yP() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function bP() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var K6 = function() {
}, Lg = {}, Z5 = {}, q5 = null, J5 = {
  mark: K6,
  measure: K6
};
try {
  typeof window < "u" && (Lg = window), typeof document < "u" && (Z5 = document), typeof MutationObserver < "u" && (q5 = MutationObserver), typeof performance < "u" && (J5 = performance);
} catch {
}
var wP = Lg.navigator || {}, Y6 = wP.userAgent, X6 = Y6 === void 0 ? "" : Y6, Co = Lg, Et = Z5, Z6 = q5, v0 = J5;
Co.document;
var Ti = !!Et.documentElement && !!Et.head && typeof Et.addEventListener == "function" && typeof Et.createElement == "function", Q5 = ~X6.indexOf("MSIE") || ~X6.indexOf("Trident/"), E0, C0, y0, b0, w0, wi = "___FONT_AWESOME___", am = 16, e9 = "fa", t9 = "svg-inline--fa", fs = "data-fa-i2svg", um = "data-fa-pseudo-element", SP = "data-fa-pseudo-element-pending", Ng = "data-prefix", zg = "data-icon", q6 = "fontawesome-i2svg", xP = "async", kP = ["HTML", "HEAD", "STYLE", "SCRIPT"], n9 = function() {
  try {
    return fP.NODE_ENV === "production";
  } catch {
    return !1;
  }
}(), vt = "classic", Ft = "sharp", jg = [vt, Ft];
function Hl(e) {
  return new Proxy(e, {
    get: function(n, r) {
      return r in n ? n[r] : n[vt];
    }
  });
}
var Cl = Hl((E0 = {}, Yt(E0, vt, {
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
}), Yt(E0, Ft, {
  fa: "solid",
  fass: "solid",
  "fa-solid": "solid",
  fasr: "regular",
  "fa-regular": "regular",
  fasl: "light",
  "fa-light": "light",
  fast: "thin",
  "fa-thin": "thin"
}), E0)), yl = Hl((C0 = {}, Yt(C0, vt, {
  solid: "fas",
  regular: "far",
  light: "fal",
  thin: "fat",
  duotone: "fad",
  brands: "fab",
  kit: "fak"
}), Yt(C0, Ft, {
  solid: "fass",
  regular: "fasr",
  light: "fasl",
  thin: "fast"
}), C0)), bl = Hl((y0 = {}, Yt(y0, vt, {
  fab: "fa-brands",
  fad: "fa-duotone",
  fak: "fa-kit",
  fal: "fa-light",
  far: "fa-regular",
  fas: "fa-solid",
  fat: "fa-thin"
}), Yt(y0, Ft, {
  fass: "fa-solid",
  fasr: "fa-regular",
  fasl: "fa-light",
  fast: "fa-thin"
}), y0)), DP = Hl((b0 = {}, Yt(b0, vt, {
  "fa-brands": "fab",
  "fa-duotone": "fad",
  "fa-kit": "fak",
  "fa-light": "fal",
  "fa-regular": "far",
  "fa-solid": "fas",
  "fa-thin": "fat"
}), Yt(b0, Ft, {
  "fa-solid": "fass",
  "fa-regular": "fasr",
  "fa-light": "fasl",
  "fa-thin": "fast"
}), b0)), AP = /fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/, r9 = "fa-layers-text", IP = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i, PP = Hl((w0 = {}, Yt(w0, vt, {
  900: "fas",
  400: "far",
  normal: "far",
  300: "fal",
  100: "fat"
}), Yt(w0, Ft, {
  900: "fass",
  400: "fasr",
  300: "fasl",
  100: "fast"
}), w0)), i9 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], _P = i9.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), TP = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], ts = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, wl = /* @__PURE__ */ new Set();
Object.keys(yl[vt]).map(wl.add.bind(wl));
Object.keys(yl[Ft]).map(wl.add.bind(wl));
var FP = [].concat(jg, jl(wl), ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", ts.GROUP, ts.SWAP_OPACITY, ts.PRIMARY, ts.SECONDARY]).concat(i9.map(function(e) {
  return "".concat(e, "x");
})).concat(_P.map(function(e) {
  return "w-".concat(e);
})), rl = Co.FontAwesomeConfig || {};
function BP(e) {
  var t = Et.querySelector("script[" + e + "]");
  if (t)
    return t.getAttribute(e);
}
function MP(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
if (Et && typeof Et.querySelector == "function") {
  var RP = [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
  RP.forEach(function(e) {
    var t = $g(e, 2), n = t[0], r = t[1], i = MP(BP(n));
    i != null && (rl[r] = i);
  });
}
var o9 = {
  styleDefault: "solid",
  familyDefault: "classic",
  cssPrefix: e9,
  replacementClass: t9,
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
rl.familyPrefix && (rl.cssPrefix = rl.familyPrefix);
var Ia = xe(xe({}, o9), rl);
Ia.autoReplaceSvg || (Ia.observeMutations = !1);
var Te = {};
Object.keys(o9).forEach(function(e) {
  Object.defineProperty(Te, e, {
    enumerable: !0,
    set: function(n) {
      Ia[e] = n, il.forEach(function(r) {
        return r(Te);
      });
    },
    get: function() {
      return Ia[e];
    }
  });
});
Object.defineProperty(Te, "familyPrefix", {
  enumerable: !0,
  set: function(t) {
    Ia.cssPrefix = t, il.forEach(function(n) {
      return n(Te);
    });
  },
  get: function() {
    return Ia.cssPrefix;
  }
});
Co.FontAwesomeConfig = Te;
var il = [];
function OP(e) {
  return il.push(e), function() {
    il.splice(il.indexOf(e), 1);
  };
}
var oo = am, Vr = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function $P(e) {
  if (!(!e || !Ti)) {
    var t = Et.createElement("style");
    t.setAttribute("type", "text/css"), t.innerHTML = e;
    for (var n = Et.head.childNodes, r = null, i = n.length - 1; i > -1; i--) {
      var o = n[i], s = (o.tagName || "").toUpperCase();
      ["STYLE", "LINK"].indexOf(s) > -1 && (r = o);
    }
    return Et.head.insertBefore(t, r), e;
  }
}
var LP = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function Sl() {
  for (var e = 12, t = ""; e-- > 0; )
    t += LP[Math.random() * 62 | 0];
  return t;
}
function Ga(e) {
  for (var t = [], n = (e || []).length >>> 0; n--; )
    t[n] = e[n];
  return t;
}
function Hg(e) {
  return e.classList ? Ga(e.classList) : (e.getAttribute("class") || "").split(" ").filter(function(t) {
    return t;
  });
}
function s9(e) {
  return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function NP(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, '="').concat(s9(e[n]), '" ');
  }, "").trim();
}
function uf(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, ": ").concat(e[n].trim(), ";");
  }, "");
}
function Ug(e) {
  return e.size !== Vr.size || e.x !== Vr.x || e.y !== Vr.y || e.rotate !== Vr.rotate || e.flipX || e.flipY;
}
function zP(e) {
  var t = e.transform, n = e.containerWidth, r = e.iconWidth, i = {
    transform: "translate(".concat(n / 2, " 256)")
  }, o = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "), s = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), u = "rotate(".concat(t.rotate, " 0 0)"), l = {
    transform: "".concat(o, " ").concat(s, " ").concat(u)
  }, f = {
    transform: "translate(".concat(r / 2 * -1, " -256)")
  };
  return {
    outer: i,
    inner: l,
    path: f
  };
}
function jP(e) {
  var t = e.transform, n = e.width, r = n === void 0 ? am : n, i = e.height, o = i === void 0 ? am : i, s = e.startCentered, u = s === void 0 ? !1 : s, l = "";
  return u && Q5 ? l += "translate(".concat(t.x / oo - r / 2, "em, ").concat(t.y / oo - o / 2, "em) ") : u ? l += "translate(calc(-50% + ".concat(t.x / oo, "em), calc(-50% + ").concat(t.y / oo, "em)) ") : l += "translate(".concat(t.x / oo, "em, ").concat(t.y / oo, "em) "), l += "scale(".concat(t.size / oo * (t.flipX ? -1 : 1), ", ").concat(t.size / oo * (t.flipY ? -1 : 1), ") "), l += "rotate(".concat(t.rotate, "deg) "), l;
}
var HP = `:root, :host {
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
function a9() {
  var e = e9, t = t9, n = Te.cssPrefix, r = Te.replacementClass, i = HP;
  if (n !== e || r !== t) {
    var o = new RegExp("\\.".concat(e, "\\-"), "g"), s = new RegExp("\\--".concat(e, "\\-"), "g"), u = new RegExp("\\.".concat(t), "g");
    i = i.replace(o, ".".concat(n, "-")).replace(s, "--".concat(n, "-")).replace(u, ".".concat(r));
  }
  return i;
}
var J6 = !1;
function Vp() {
  Te.autoAddCss && !J6 && ($P(a9()), J6 = !0);
}
var UP = {
  mixout: function() {
    return {
      dom: {
        css: a9,
        insertCss: Vp
      }
    };
  },
  hooks: function() {
    return {
      beforeDOMElementCreation: function() {
        Vp();
      },
      beforeI2svg: function() {
        Vp();
      }
    };
  }
}, Si = Co || {};
Si[wi] || (Si[wi] = {});
Si[wi].styles || (Si[wi].styles = {});
Si[wi].hooks || (Si[wi].hooks = {});
Si[wi].shims || (Si[wi].shims = []);
var xr = Si[wi], u9 = [], VP = function e() {
  Et.removeEventListener("DOMContentLoaded", e), xd = 1, u9.map(function(t) {
    return t();
  });
}, xd = !1;
Ti && (xd = (Et.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(Et.readyState), xd || Et.addEventListener("DOMContentLoaded", VP));
function GP(e) {
  Ti && (xd ? setTimeout(e, 0) : u9.push(e));
}
function Ul(e) {
  var t = e.tag, n = e.attributes, r = n === void 0 ? {} : n, i = e.children, o = i === void 0 ? [] : i;
  return typeof e == "string" ? s9(e) : "<".concat(t, " ").concat(NP(r), ">").concat(o.map(Ul).join(""), "</").concat(t, ">");
}
function Q6(e, t, n) {
  if (e && e[t] && e[t][n])
    return {
      prefix: t,
      iconName: n,
      icon: e[t][n]
    };
}
var Gp = function(t, n, r, i) {
  var o = Object.keys(t), s = o.length, u = n, l, f, h;
  for (r === void 0 ? (l = 1, h = t[o[0]]) : (l = 0, h = r); l < s; l++)
    f = o[l], h = u(h, t[f], f, t);
  return h;
};
function WP(e) {
  for (var t = [], n = 0, r = e.length; n < r; ) {
    var i = e.charCodeAt(n++);
    if (i >= 55296 && i <= 56319 && n < r) {
      var o = e.charCodeAt(n++);
      (o & 64512) == 56320 ? t.push(((i & 1023) << 10) + (o & 1023) + 65536) : (t.push(i), n--);
    } else
      t.push(i);
  }
  return t;
}
function lm(e) {
  var t = WP(e);
  return t.length === 1 ? t[0].toString(16) : null;
}
function KP(e, t) {
  var n = e.length, r = e.charCodeAt(t), i;
  return r >= 55296 && r <= 56319 && n > t + 1 && (i = e.charCodeAt(t + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
function eE(e) {
  return Object.keys(e).reduce(function(t, n) {
    var r = e[n], i = !!r.icon;
    return i ? t[r.iconName] = r.icon : t[n] = r, t;
  }, {});
}
function cm(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.skipHooks, i = r === void 0 ? !1 : r, o = eE(t);
  typeof xr.hooks.addPack == "function" && !i ? xr.hooks.addPack(e, eE(t)) : xr.styles[e] = xe(xe({}, xr.styles[e] || {}), o), e === "fas" && cm("fa", t);
}
var S0, x0, k0, fa = xr.styles, YP = xr.shims, XP = (S0 = {}, Yt(S0, vt, Object.values(bl[vt])), Yt(S0, Ft, Object.values(bl[Ft])), S0), Vg = null, l9 = {}, c9 = {}, d9 = {}, f9 = {}, h9 = {}, ZP = (x0 = {}, Yt(x0, vt, Object.keys(Cl[vt])), Yt(x0, Ft, Object.keys(Cl[Ft])), x0);
function qP(e) {
  return ~FP.indexOf(e);
}
function JP(e, t) {
  var n = t.split("-"), r = n[0], i = n.slice(1).join("-");
  return r === e && i !== "" && !qP(i) ? i : null;
}
var p9 = function() {
  var t = function(o) {
    return Gp(fa, function(s, u, l) {
      return s[l] = Gp(u, o, {}), s;
    }, {});
  };
  l9 = t(function(i, o, s) {
    if (o[3] && (i[o[3]] = s), o[2]) {
      var u = o[2].filter(function(l) {
        return typeof l == "number";
      });
      u.forEach(function(l) {
        i[l.toString(16)] = s;
      });
    }
    return i;
  }), c9 = t(function(i, o, s) {
    if (i[s] = s, o[2]) {
      var u = o[2].filter(function(l) {
        return typeof l == "string";
      });
      u.forEach(function(l) {
        i[l] = s;
      });
    }
    return i;
  }), h9 = t(function(i, o, s) {
    var u = o[2];
    return i[s] = s, u.forEach(function(l) {
      i[l] = s;
    }), i;
  });
  var n = "far" in fa || Te.autoFetchSvg, r = Gp(YP, function(i, o) {
    var s = o[0], u = o[1], l = o[2];
    return u === "far" && !n && (u = "fas"), typeof s == "string" && (i.names[s] = {
      prefix: u,
      iconName: l
    }), typeof s == "number" && (i.unicodes[s.toString(16)] = {
      prefix: u,
      iconName: l
    }), i;
  }, {
    names: {},
    unicodes: {}
  });
  d9 = r.names, f9 = r.unicodes, Vg = lf(Te.styleDefault, {
    family: Te.familyDefault
  });
};
OP(function(e) {
  Vg = lf(e.styleDefault, {
    family: Te.familyDefault
  });
});
p9();
function Gg(e, t) {
  return (l9[e] || {})[t];
}
function QP(e, t) {
  return (c9[e] || {})[t];
}
function ns(e, t) {
  return (h9[e] || {})[t];
}
function m9(e) {
  return d9[e] || {
    prefix: null,
    iconName: null
  };
}
function e_(e) {
  var t = f9[e], n = Gg("fas", e);
  return t || (n ? {
    prefix: "fas",
    iconName: n
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function yo() {
  return Vg;
}
var Wg = function() {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};
function lf(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.family, r = n === void 0 ? vt : n, i = Cl[r][e], o = yl[r][e] || yl[r][i], s = e in xr.styles ? e : null;
  return o || s || null;
}
var tE = (k0 = {}, Yt(k0, vt, Object.keys(bl[vt])), Yt(k0, Ft, Object.keys(bl[Ft])), k0);
function cf(e) {
  var t, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = n.skipLookups, i = r === void 0 ? !1 : r, o = (t = {}, Yt(t, vt, "".concat(Te.cssPrefix, "-").concat(vt)), Yt(t, Ft, "".concat(Te.cssPrefix, "-").concat(Ft)), t), s = null, u = vt;
  (e.includes(o[vt]) || e.some(function(f) {
    return tE[vt].includes(f);
  })) && (u = vt), (e.includes(o[Ft]) || e.some(function(f) {
    return tE[Ft].includes(f);
  })) && (u = Ft);
  var l = e.reduce(function(f, h) {
    var p = JP(Te.cssPrefix, h);
    if (fa[h] ? (h = XP[u].includes(h) ? DP[u][h] : h, s = h, f.prefix = h) : ZP[u].indexOf(h) > -1 ? (s = h, f.prefix = lf(h, {
      family: u
    })) : p ? f.iconName = p : h !== Te.replacementClass && h !== o[vt] && h !== o[Ft] && f.rest.push(h), !i && f.prefix && f.iconName) {
      var g = s === "fa" ? m9(f.iconName) : {}, v = ns(f.prefix, f.iconName);
      g.prefix && (s = null), f.iconName = g.iconName || v || f.iconName, f.prefix = g.prefix || f.prefix, f.prefix === "far" && !fa.far && fa.fas && !Te.autoFetchSvg && (f.prefix = "fas");
    }
    return f;
  }, Wg());
  return (e.includes("fa-brands") || e.includes("fab")) && (l.prefix = "fab"), (e.includes("fa-duotone") || e.includes("fad")) && (l.prefix = "fad"), !l.prefix && u === Ft && (fa.fass || Te.autoFetchSvg) && (l.prefix = "fass", l.iconName = ns(l.prefix, l.iconName) || l.iconName), (l.prefix === "fa" || s === "fa") && (l.prefix = yo() || "fas"), l;
}
var t_ = /* @__PURE__ */ function() {
  function e() {
    hP(this, e), this.definitions = {};
  }
  return mP(e, [{
    key: "add",
    value: function() {
      for (var n = this, r = arguments.length, i = new Array(r), o = 0; o < r; o++)
        i[o] = arguments[o];
      var s = i.reduce(this._pullDefinitions, {});
      Object.keys(s).forEach(function(u) {
        n.definitions[u] = xe(xe({}, n.definitions[u] || {}), s[u]), cm(u, s[u]);
        var l = bl[vt][u];
        l && cm(l, s[u]), p9();
      });
    }
  }, {
    key: "reset",
    value: function() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function(n, r) {
      var i = r.prefix && r.iconName && r.icon ? {
        0: r
      } : r;
      return Object.keys(i).map(function(o) {
        var s = i[o], u = s.prefix, l = s.iconName, f = s.icon, h = f[2];
        n[u] || (n[u] = {}), h.length > 0 && h.forEach(function(p) {
          typeof p == "string" && (n[u][p] = f);
        }), n[u][l] = f;
      }), n;
    }
  }]), e;
}(), nE = [], ha = {}, va = {}, n_ = Object.keys(va);
function r_(e, t) {
  var n = t.mixoutsTo;
  return nE = e, ha = {}, Object.keys(va).forEach(function(r) {
    n_.indexOf(r) === -1 && delete va[r];
  }), nE.forEach(function(r) {
    var i = r.mixout ? r.mixout() : {};
    if (Object.keys(i).forEach(function(s) {
      typeof i[s] == "function" && (n[s] = i[s]), Sd(i[s]) === "object" && Object.keys(i[s]).forEach(function(u) {
        n[s] || (n[s] = {}), n[s][u] = i[s][u];
      });
    }), r.hooks) {
      var o = r.hooks();
      Object.keys(o).forEach(function(s) {
        ha[s] || (ha[s] = []), ha[s].push(o[s]);
      });
    }
    r.provides && r.provides(va);
  }), n;
}
function dm(e, t) {
  for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
    r[i - 2] = arguments[i];
  var o = ha[e] || [];
  return o.forEach(function(s) {
    t = s.apply(null, [t].concat(r));
  }), t;
}
function hs(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  var i = ha[e] || [];
  i.forEach(function(o) {
    o.apply(null, n);
  });
}
function xi() {
  var e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
  return va[e] ? va[e].apply(null, t) : void 0;
}
function fm(e) {
  e.prefix === "fa" && (e.prefix = "fas");
  var t = e.iconName, n = e.prefix || yo();
  if (t)
    return t = ns(n, t) || t, Q6(g9.definitions, n, t) || Q6(xr.styles, n, t);
}
var g9 = new t_(), i_ = function() {
  Te.autoReplaceSvg = !1, Te.observeMutations = !1, hs("noAuto");
}, o_ = {
  i2svg: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Ti ? (hs("beforeI2svg", t), xi("pseudoElements2svg", t), xi("i2svg", t)) : Promise.reject("Operation requires a DOM of some kind.");
  },
  watch: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.autoReplaceSvgRoot;
    Te.autoReplaceSvg === !1 && (Te.autoReplaceSvg = !0), Te.observeMutations = !0, GP(function() {
      a_({
        autoReplaceSvgRoot: n
      }), hs("watch", t);
    });
  }
}, s_ = {
  icon: function(t) {
    if (t === null)
      return null;
    if (Sd(t) === "object" && t.prefix && t.iconName)
      return {
        prefix: t.prefix,
        iconName: ns(t.prefix, t.iconName) || t.iconName
      };
    if (Array.isArray(t) && t.length === 2) {
      var n = t[1].indexOf("fa-") === 0 ? t[1].slice(3) : t[1], r = lf(t[0]);
      return {
        prefix: r,
        iconName: ns(r, n) || n
      };
    }
    if (typeof t == "string" && (t.indexOf("".concat(Te.cssPrefix, "-")) > -1 || t.match(AP))) {
      var i = cf(t.split(" "), {
        skipLookups: !0
      });
      return {
        prefix: i.prefix || yo(),
        iconName: ns(i.prefix, i.iconName) || i.iconName
      };
    }
    if (typeof t == "string") {
      var o = yo();
      return {
        prefix: o,
        iconName: ns(o, t) || t
      };
    }
  }
}, Kn = {
  noAuto: i_,
  config: Te,
  dom: o_,
  parse: s_,
  library: g9,
  findIconDefinition: fm,
  toHtml: Ul
}, a_ = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.autoReplaceSvgRoot, r = n === void 0 ? Et : n;
  (Object.keys(xr.styles).length > 0 || Te.autoFetchSvg) && Ti && Te.autoReplaceSvg && Kn.dom.i2svg({
    node: r
  });
};
function df(e, t) {
  return Object.defineProperty(e, "abstract", {
    get: t
  }), Object.defineProperty(e, "html", {
    get: function() {
      return e.abstract.map(function(r) {
        return Ul(r);
      });
    }
  }), Object.defineProperty(e, "node", {
    get: function() {
      if (Ti) {
        var r = Et.createElement("div");
        return r.innerHTML = e.html, r.children;
      }
    }
  }), e;
}
function u_(e) {
  var t = e.children, n = e.main, r = e.mask, i = e.attributes, o = e.styles, s = e.transform;
  if (Ug(s) && n.found && !r.found) {
    var u = n.width, l = n.height, f = {
      x: u / l / 2,
      y: 0.5
    };
    i.style = uf(xe(xe({}, o), {}, {
      "transform-origin": "".concat(f.x + s.x / 16, "em ").concat(f.y + s.y / 16, "em")
    }));
  }
  return [{
    tag: "svg",
    attributes: i,
    children: t
  }];
}
function l_(e) {
  var t = e.prefix, n = e.iconName, r = e.children, i = e.attributes, o = e.symbol, s = o === !0 ? "".concat(t, "-").concat(Te.cssPrefix, "-").concat(n) : o;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: xe(xe({}, i), {}, {
        id: s
      }),
      children: r
    }]
  }];
}
function Kg(e) {
  var t = e.icons, n = t.main, r = t.mask, i = e.prefix, o = e.iconName, s = e.transform, u = e.symbol, l = e.title, f = e.maskId, h = e.titleId, p = e.extra, g = e.watchable, v = g === void 0 ? !1 : g, E = r.found ? r : n, y = E.width, b = E.height, w = i === "fak", k = [Te.replacementClass, o ? "".concat(Te.cssPrefix, "-").concat(o) : ""].filter(function(H) {
    return p.classes.indexOf(H) === -1;
  }).filter(function(H) {
    return H !== "" || !!H;
  }).concat(p.classes).join(" "), A = {
    children: [],
    attributes: xe(xe({}, p.attributes), {}, {
      "data-prefix": i,
      "data-icon": o,
      class: k,
      role: p.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(y, " ").concat(b)
    })
  }, T = w && !~p.classes.indexOf("fa-fw") ? {
    width: "".concat(y / b * 16 * 0.0625, "em")
  } : {};
  v && (A.attributes[fs] = ""), l && (A.children.push({
    tag: "title",
    attributes: {
      id: A.attributes["aria-labelledby"] || "title-".concat(h || Sl())
    },
    children: [l]
  }), delete A.attributes.title);
  var _ = xe(xe({}, A), {}, {
    prefix: i,
    iconName: o,
    main: n,
    mask: r,
    maskId: f,
    transform: s,
    symbol: u,
    styles: xe(xe({}, T), p.styles)
  }), I = r.found && n.found ? xi("generateAbstractMask", _) || {
    children: [],
    attributes: {}
  } : xi("generateAbstractIcon", _) || {
    children: [],
    attributes: {}
  }, B = I.children, M = I.attributes;
  return _.children = B, _.attributes = M, u ? l_(_) : u_(_);
}
function rE(e) {
  var t = e.content, n = e.width, r = e.height, i = e.transform, o = e.title, s = e.extra, u = e.watchable, l = u === void 0 ? !1 : u, f = xe(xe(xe({}, s.attributes), o ? {
    title: o
  } : {}), {}, {
    class: s.classes.join(" ")
  });
  l && (f[fs] = "");
  var h = xe({}, s.styles);
  Ug(i) && (h.transform = jP({
    transform: i,
    startCentered: !0,
    width: n,
    height: r
  }), h["-webkit-transform"] = h.transform);
  var p = uf(h);
  p.length > 0 && (f.style = p);
  var g = [];
  return g.push({
    tag: "span",
    attributes: f,
    children: [t]
  }), o && g.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [o]
  }), g;
}
function c_(e) {
  var t = e.content, n = e.title, r = e.extra, i = xe(xe(xe({}, r.attributes), n ? {
    title: n
  } : {}), {}, {
    class: r.classes.join(" ")
  }), o = uf(r.styles);
  o.length > 0 && (i.style = o);
  var s = [];
  return s.push({
    tag: "span",
    attributes: i,
    children: [t]
  }), n && s.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [n]
  }), s;
}
var Wp = xr.styles;
function hm(e) {
  var t = e[0], n = e[1], r = e.slice(4), i = $g(r, 1), o = i[0], s = null;
  return Array.isArray(o) ? s = {
    tag: "g",
    attributes: {
      class: "".concat(Te.cssPrefix, "-").concat(ts.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(Te.cssPrefix, "-").concat(ts.SECONDARY),
        fill: "currentColor",
        d: o[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(Te.cssPrefix, "-").concat(ts.PRIMARY),
        fill: "currentColor",
        d: o[1]
      }
    }]
  } : s = {
    tag: "path",
    attributes: {
      fill: "currentColor",
      d: o
    }
  }, {
    found: !0,
    width: t,
    height: n,
    icon: s
  };
}
var d_ = {
  found: !1,
  width: 512,
  height: 512
};
function f_(e, t) {
  !n9 && !Te.showMissingIcons && e && console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
}
function pm(e, t) {
  var n = t;
  return t === "fa" && Te.styleDefault !== null && (t = yo()), new Promise(function(r, i) {
    if (xi("missingIconAbstract"), n === "fa") {
      var o = m9(e) || {};
      e = o.iconName || e, t = o.prefix || t;
    }
    if (e && t && Wp[t] && Wp[t][e]) {
      var s = Wp[t][e];
      return r(hm(s));
    }
    f_(e, t), r(xe(xe({}, d_), {}, {
      icon: Te.showMissingIcons && e ? xi("missingIconAbstract") || {} : {}
    }));
  });
}
var iE = function() {
}, mm = Te.measurePerformance && v0 && v0.mark && v0.measure ? v0 : {
  mark: iE,
  measure: iE
}, el = 'FA "6.5.2"', h_ = function(t) {
  return mm.mark("".concat(el, " ").concat(t, " begins")), function() {
    return v9(t);
  };
}, v9 = function(t) {
  mm.mark("".concat(el, " ").concat(t, " ends")), mm.measure("".concat(el, " ").concat(t), "".concat(el, " ").concat(t, " begins"), "".concat(el, " ").concat(t, " ends"));
}, Yg = {
  begin: h_,
  end: v9
}, sd = function() {
};
function oE(e) {
  var t = e.getAttribute ? e.getAttribute(fs) : null;
  return typeof t == "string";
}
function p_(e) {
  var t = e.getAttribute ? e.getAttribute(Ng) : null, n = e.getAttribute ? e.getAttribute(zg) : null;
  return t && n;
}
function m_(e) {
  return e && e.classList && e.classList.contains && e.classList.contains(Te.replacementClass);
}
function g_() {
  if (Te.autoReplaceSvg === !0)
    return ad.replace;
  var e = ad[Te.autoReplaceSvg];
  return e || ad.replace;
}
function v_(e) {
  return Et.createElementNS("http://www.w3.org/2000/svg", e);
}
function E_(e) {
  return Et.createElement(e);
}
function E9(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.ceFn, r = n === void 0 ? e.tag === "svg" ? v_ : E_ : n;
  if (typeof e == "string")
    return Et.createTextNode(e);
  var i = r(e.tag);
  Object.keys(e.attributes || []).forEach(function(s) {
    i.setAttribute(s, e.attributes[s]);
  });
  var o = e.children || [];
  return o.forEach(function(s) {
    i.appendChild(E9(s, {
      ceFn: r
    }));
  }), i;
}
function C_(e) {
  var t = " ".concat(e.outerHTML, " ");
  return t = "".concat(t, "Font Awesome fontawesome.com "), t;
}
var ad = {
  replace: function(t) {
    var n = t[0];
    if (n.parentNode)
      if (t[1].forEach(function(i) {
        n.parentNode.insertBefore(E9(i), n);
      }), n.getAttribute(fs) === null && Te.keepOriginalSource) {
        var r = Et.createComment(C_(n));
        n.parentNode.replaceChild(r, n);
      } else
        n.remove();
  },
  nest: function(t) {
    var n = t[0], r = t[1];
    if (~Hg(n).indexOf(Te.replacementClass))
      return ad.replace(t);
    var i = new RegExp("".concat(Te.cssPrefix, "-.*"));
    if (delete r[0].attributes.id, r[0].attributes.class) {
      var o = r[0].attributes.class.split(" ").reduce(function(u, l) {
        return l === Te.replacementClass || l.match(i) ? u.toSvg.push(l) : u.toNode.push(l), u;
      }, {
        toNode: [],
        toSvg: []
      });
      r[0].attributes.class = o.toSvg.join(" "), o.toNode.length === 0 ? n.removeAttribute("class") : n.setAttribute("class", o.toNode.join(" "));
    }
    var s = r.map(function(u) {
      return Ul(u);
    }).join(`
`);
    n.setAttribute(fs, ""), n.innerHTML = s;
  }
};
function sE(e) {
  e();
}
function C9(e, t) {
  var n = typeof t == "function" ? t : sd;
  if (e.length === 0)
    n();
  else {
    var r = sE;
    Te.mutateApproach === xP && (r = Co.requestAnimationFrame || sE), r(function() {
      var i = g_(), o = Yg.begin("mutate");
      e.map(i), o(), n();
    });
  }
}
var Xg = !1;
function y9() {
  Xg = !0;
}
function gm() {
  Xg = !1;
}
var kd = null;
function aE(e) {
  if (Z6 && Te.observeMutations) {
    var t = e.treeCallback, n = t === void 0 ? sd : t, r = e.nodeCallback, i = r === void 0 ? sd : r, o = e.pseudoElementsCallback, s = o === void 0 ? sd : o, u = e.observeMutationsRoot, l = u === void 0 ? Et : u;
    kd = new Z6(function(f) {
      if (!Xg) {
        var h = yo();
        Ga(f).forEach(function(p) {
          if (p.type === "childList" && p.addedNodes.length > 0 && !oE(p.addedNodes[0]) && (Te.searchPseudoElements && s(p.target), n(p.target)), p.type === "attributes" && p.target.parentNode && Te.searchPseudoElements && s(p.target.parentNode), p.type === "attributes" && oE(p.target) && ~TP.indexOf(p.attributeName))
            if (p.attributeName === "class" && p_(p.target)) {
              var g = cf(Hg(p.target)), v = g.prefix, E = g.iconName;
              p.target.setAttribute(Ng, v || h), E && p.target.setAttribute(zg, E);
            } else m_(p.target) && i(p.target);
        });
      }
    }), Ti && kd.observe(l, {
      childList: !0,
      attributes: !0,
      characterData: !0,
      subtree: !0
    });
  }
}
function y_() {
  kd && kd.disconnect();
}
function b_(e) {
  var t = e.getAttribute("style"), n = [];
  return t && (n = t.split(";").reduce(function(r, i) {
    var o = i.split(":"), s = o[0], u = o.slice(1);
    return s && u.length > 0 && (r[s] = u.join(":").trim()), r;
  }, {})), n;
}
function w_(e) {
  var t = e.getAttribute("data-prefix"), n = e.getAttribute("data-icon"), r = e.innerText !== void 0 ? e.innerText.trim() : "", i = cf(Hg(e));
  return i.prefix || (i.prefix = yo()), t && n && (i.prefix = t, i.iconName = n), i.iconName && i.prefix || (i.prefix && r.length > 0 && (i.iconName = QP(i.prefix, e.innerText) || Gg(i.prefix, lm(e.innerText))), !i.iconName && Te.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (i.iconName = e.firstChild.data)), i;
}
function S_(e) {
  var t = Ga(e.attributes).reduce(function(i, o) {
    return i.name !== "class" && i.name !== "style" && (i[o.name] = o.value), i;
  }, {}), n = e.getAttribute("title"), r = e.getAttribute("data-fa-title-id");
  return Te.autoA11y && (n ? t["aria-labelledby"] = "".concat(Te.replacementClass, "-title-").concat(r || Sl()) : (t["aria-hidden"] = "true", t.focusable = "false")), t;
}
function x_() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: Vr,
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
function uE(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: !0
  }, n = w_(e), r = n.iconName, i = n.prefix, o = n.rest, s = S_(e), u = dm("parseNodeAttributes", {}, e), l = t.styleParser ? b_(e) : [];
  return xe({
    iconName: r,
    title: e.getAttribute("title"),
    titleId: e.getAttribute("data-fa-title-id"),
    prefix: i,
    transform: Vr,
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
      attributes: s
    }
  }, u);
}
var k_ = xr.styles;
function b9(e) {
  var t = Te.autoReplaceSvg === "nest" ? uE(e, {
    styleParser: !1
  }) : uE(e);
  return ~t.extra.classes.indexOf(r9) ? xi("generateLayersText", e, t) : xi("generateSvgReplacementMutation", e, t);
}
var bo = /* @__PURE__ */ new Set();
jg.map(function(e) {
  bo.add("fa-".concat(e));
});
Object.keys(Cl[vt]).map(bo.add.bind(bo));
Object.keys(Cl[Ft]).map(bo.add.bind(bo));
bo = jl(bo);
function lE(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!Ti) return Promise.resolve();
  var n = Et.documentElement.classList, r = function(p) {
    return n.add("".concat(q6, "-").concat(p));
  }, i = function(p) {
    return n.remove("".concat(q6, "-").concat(p));
  }, o = Te.autoFetchSvg ? bo : jg.map(function(h) {
    return "fa-".concat(h);
  }).concat(Object.keys(k_));
  o.includes("fa") || o.push("fa");
  var s = [".".concat(r9, ":not([").concat(fs, "])")].concat(o.map(function(h) {
    return ".".concat(h, ":not([").concat(fs, "])");
  })).join(", ");
  if (s.length === 0)
    return Promise.resolve();
  var u = [];
  try {
    u = Ga(e.querySelectorAll(s));
  } catch {
  }
  if (u.length > 0)
    r("pending"), i("complete");
  else
    return Promise.resolve();
  var l = Yg.begin("onTree"), f = u.reduce(function(h, p) {
    try {
      var g = b9(p);
      g && h.push(g);
    } catch (v) {
      n9 || v.name === "MissingIcon" && console.error(v);
    }
    return h;
  }, []);
  return new Promise(function(h, p) {
    Promise.all(f).then(function(g) {
      C9(g, function() {
        r("active"), r("complete"), i("pending"), typeof t == "function" && t(), l(), h();
      });
    }).catch(function(g) {
      l(), p(g);
    });
  });
}
function D_(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  b9(e).then(function(n) {
    n && C9([n], t);
  });
}
function A_(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = (t || {}).icon ? t : fm(t || {}), i = n.mask;
    return i && (i = (i || {}).icon ? i : fm(i || {})), e(r, xe(xe({}, n), {}, {
      mask: i
    }));
  };
}
var I_ = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = n.transform, i = r === void 0 ? Vr : r, o = n.symbol, s = o === void 0 ? !1 : o, u = n.mask, l = u === void 0 ? null : u, f = n.maskId, h = f === void 0 ? null : f, p = n.title, g = p === void 0 ? null : p, v = n.titleId, E = v === void 0 ? null : v, y = n.classes, b = y === void 0 ? [] : y, w = n.attributes, k = w === void 0 ? {} : w, A = n.styles, T = A === void 0 ? {} : A;
  if (t) {
    var _ = t.prefix, I = t.iconName, B = t.icon;
    return df(xe({
      type: "icon"
    }, t), function() {
      return hs("beforeDOMElementCreation", {
        iconDefinition: t,
        params: n
      }), Te.autoA11y && (g ? k["aria-labelledby"] = "".concat(Te.replacementClass, "-title-").concat(E || Sl()) : (k["aria-hidden"] = "true", k.focusable = "false")), Kg({
        icons: {
          main: hm(B),
          mask: l ? hm(l.icon) : {
            found: !1,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: _,
        iconName: I,
        transform: xe(xe({}, Vr), i),
        symbol: s,
        title: g,
        maskId: h,
        titleId: E,
        extra: {
          attributes: k,
          styles: T,
          classes: b
        }
      });
    });
  }
}, P_ = {
  mixout: function() {
    return {
      icon: A_(I_)
    };
  },
  hooks: function() {
    return {
      mutationObserverCallbacks: function(n) {
        return n.treeCallback = lE, n.nodeCallback = D_, n;
      }
    };
  },
  provides: function(t) {
    t.i2svg = function(n) {
      var r = n.node, i = r === void 0 ? Et : r, o = n.callback, s = o === void 0 ? function() {
      } : o;
      return lE(i, s);
    }, t.generateSvgReplacementMutation = function(n, r) {
      var i = r.iconName, o = r.title, s = r.titleId, u = r.prefix, l = r.transform, f = r.symbol, h = r.mask, p = r.maskId, g = r.extra;
      return new Promise(function(v, E) {
        Promise.all([pm(i, u), h.iconName ? pm(h.iconName, h.prefix) : Promise.resolve({
          found: !1,
          width: 512,
          height: 512,
          icon: {}
        })]).then(function(y) {
          var b = $g(y, 2), w = b[0], k = b[1];
          v([n, Kg({
            icons: {
              main: w,
              mask: k
            },
            prefix: u,
            iconName: i,
            transform: l,
            symbol: f,
            maskId: p,
            title: o,
            titleId: s,
            extra: g,
            watchable: !0
          })]);
        }).catch(E);
      });
    }, t.generateAbstractIcon = function(n) {
      var r = n.children, i = n.attributes, o = n.main, s = n.transform, u = n.styles, l = uf(u);
      l.length > 0 && (i.style = l);
      var f;
      return Ug(s) && (f = xi("generateAbstractTransformGrouping", {
        main: o,
        transform: s,
        containerWidth: o.width,
        iconWidth: o.width
      })), r.push(f || o.icon), {
        children: r,
        attributes: i
      };
    };
  }
}, __ = {
  mixout: function() {
    return {
      layer: function(n) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = r.classes, o = i === void 0 ? [] : i;
        return df({
          type: "layer"
        }, function() {
          hs("beforeDOMElementCreation", {
            assembler: n,
            params: r
          });
          var s = [];
          return n(function(u) {
            Array.isArray(u) ? u.map(function(l) {
              s = s.concat(l.abstract);
            }) : s = s.concat(u.abstract);
          }), [{
            tag: "span",
            attributes: {
              class: ["".concat(Te.cssPrefix, "-layers")].concat(jl(o)).join(" ")
            },
            children: s
          }];
        });
      }
    };
  }
}, T_ = {
  mixout: function() {
    return {
      counter: function(n) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = r.title, o = i === void 0 ? null : i, s = r.classes, u = s === void 0 ? [] : s, l = r.attributes, f = l === void 0 ? {} : l, h = r.styles, p = h === void 0 ? {} : h;
        return df({
          type: "counter",
          content: n
        }, function() {
          return hs("beforeDOMElementCreation", {
            content: n,
            params: r
          }), c_({
            content: n.toString(),
            title: o,
            extra: {
              attributes: f,
              styles: p,
              classes: ["".concat(Te.cssPrefix, "-layers-counter")].concat(jl(u))
            }
          });
        });
      }
    };
  }
}, F_ = {
  mixout: function() {
    return {
      text: function(n) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = r.transform, o = i === void 0 ? Vr : i, s = r.title, u = s === void 0 ? null : s, l = r.classes, f = l === void 0 ? [] : l, h = r.attributes, p = h === void 0 ? {} : h, g = r.styles, v = g === void 0 ? {} : g;
        return df({
          type: "text",
          content: n
        }, function() {
          return hs("beforeDOMElementCreation", {
            content: n,
            params: r
          }), rE({
            content: n,
            transform: xe(xe({}, Vr), o),
            title: u,
            extra: {
              attributes: p,
              styles: v,
              classes: ["".concat(Te.cssPrefix, "-layers-text")].concat(jl(f))
            }
          });
        });
      }
    };
  },
  provides: function(t) {
    t.generateLayersText = function(n, r) {
      var i = r.title, o = r.transform, s = r.extra, u = null, l = null;
      if (Q5) {
        var f = parseInt(getComputedStyle(n).fontSize, 10), h = n.getBoundingClientRect();
        u = h.width / f, l = h.height / f;
      }
      return Te.autoA11y && !i && (s.attributes["aria-hidden"] = "true"), Promise.resolve([n, rE({
        content: n.innerHTML,
        width: u,
        height: l,
        transform: o,
        title: i,
        extra: s,
        watchable: !0
      })]);
    };
  }
}, B_ = new RegExp('"', "ug"), cE = [1105920, 1112319];
function M_(e) {
  var t = e.replace(B_, ""), n = KP(t, 0), r = n >= cE[0] && n <= cE[1], i = t.length === 2 ? t[0] === t[1] : !1;
  return {
    value: lm(i ? t[0] : t),
    isSecondary: r || i
  };
}
function dE(e, t) {
  var n = "".concat(SP).concat(t.replace(":", "-"));
  return new Promise(function(r, i) {
    if (e.getAttribute(n) !== null)
      return r();
    var o = Ga(e.children), s = o.filter(function(B) {
      return B.getAttribute(um) === t;
    })[0], u = Co.getComputedStyle(e, t), l = u.getPropertyValue("font-family").match(IP), f = u.getPropertyValue("font-weight"), h = u.getPropertyValue("content");
    if (s && !l)
      return e.removeChild(s), r();
    if (l && h !== "none" && h !== "") {
      var p = u.getPropertyValue("content"), g = ~["Sharp"].indexOf(l[2]) ? Ft : vt, v = ~["Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit"].indexOf(l[2]) ? yl[g][l[2].toLowerCase()] : PP[g][f], E = M_(p), y = E.value, b = E.isSecondary, w = l[0].startsWith("FontAwesome"), k = Gg(v, y), A = k;
      if (w) {
        var T = e_(y);
        T.iconName && T.prefix && (k = T.iconName, v = T.prefix);
      }
      if (k && !b && (!s || s.getAttribute(Ng) !== v || s.getAttribute(zg) !== A)) {
        e.setAttribute(n, A), s && e.removeChild(s);
        var _ = x_(), I = _.extra;
        I.attributes[um] = t, pm(k, v).then(function(B) {
          var M = Kg(xe(xe({}, _), {}, {
            icons: {
              main: B,
              mask: Wg()
            },
            prefix: v,
            iconName: A,
            extra: I,
            watchable: !0
          })), H = Et.createElementNS("http://www.w3.org/2000/svg", "svg");
          t === "::before" ? e.insertBefore(H, e.firstChild) : e.appendChild(H), H.outerHTML = M.map(function(Y) {
            return Ul(Y);
          }).join(`
`), e.removeAttribute(n), r();
        }).catch(i);
      } else
        r();
    } else
      r();
  });
}
function R_(e) {
  return Promise.all([dE(e, "::before"), dE(e, "::after")]);
}
function O_(e) {
  return e.parentNode !== document.head && !~kP.indexOf(e.tagName.toUpperCase()) && !e.getAttribute(um) && (!e.parentNode || e.parentNode.tagName !== "svg");
}
function fE(e) {
  if (Ti)
    return new Promise(function(t, n) {
      var r = Ga(e.querySelectorAll("*")).filter(O_).map(R_), i = Yg.begin("searchPseudoElements");
      y9(), Promise.all(r).then(function() {
        i(), gm(), t();
      }).catch(function() {
        i(), gm(), n();
      });
    });
}
var $_ = {
  hooks: function() {
    return {
      mutationObserverCallbacks: function(n) {
        return n.pseudoElementsCallback = fE, n;
      }
    };
  },
  provides: function(t) {
    t.pseudoElements2svg = function(n) {
      var r = n.node, i = r === void 0 ? Et : r;
      Te.searchPseudoElements && fE(i);
    };
  }
}, hE = !1, L_ = {
  mixout: function() {
    return {
      dom: {
        unwatch: function() {
          y9(), hE = !0;
        }
      }
    };
  },
  hooks: function() {
    return {
      bootstrap: function() {
        aE(dm("mutationObserverCallbacks", {}));
      },
      noAuto: function() {
        y_();
      },
      watch: function(n) {
        var r = n.observeMutationsRoot;
        hE ? gm() : aE(dm("mutationObserverCallbacks", {
          observeMutationsRoot: r
        }));
      }
    };
  }
}, pE = function(t) {
  var n = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return t.toLowerCase().split(" ").reduce(function(r, i) {
    var o = i.toLowerCase().split("-"), s = o[0], u = o.slice(1).join("-");
    if (s && u === "h")
      return r.flipX = !0, r;
    if (s && u === "v")
      return r.flipY = !0, r;
    if (u = parseFloat(u), isNaN(u))
      return r;
    switch (s) {
      case "grow":
        r.size = r.size + u;
        break;
      case "shrink":
        r.size = r.size - u;
        break;
      case "left":
        r.x = r.x - u;
        break;
      case "right":
        r.x = r.x + u;
        break;
      case "up":
        r.y = r.y - u;
        break;
      case "down":
        r.y = r.y + u;
        break;
      case "rotate":
        r.rotate = r.rotate + u;
        break;
    }
    return r;
  }, n);
}, N_ = {
  mixout: function() {
    return {
      parse: {
        transform: function(n) {
          return pE(n);
        }
      }
    };
  },
  hooks: function() {
    return {
      parseNodeAttributes: function(n, r) {
        var i = r.getAttribute("data-fa-transform");
        return i && (n.transform = pE(i)), n;
      }
    };
  },
  provides: function(t) {
    t.generateAbstractTransformGrouping = function(n) {
      var r = n.main, i = n.transform, o = n.containerWidth, s = n.iconWidth, u = {
        transform: "translate(".concat(o / 2, " 256)")
      }, l = "translate(".concat(i.x * 32, ", ").concat(i.y * 32, ") "), f = "scale(".concat(i.size / 16 * (i.flipX ? -1 : 1), ", ").concat(i.size / 16 * (i.flipY ? -1 : 1), ") "), h = "rotate(".concat(i.rotate, " 0 0)"), p = {
        transform: "".concat(l, " ").concat(f, " ").concat(h)
      }, g = {
        transform: "translate(".concat(s / 2 * -1, " -256)")
      }, v = {
        outer: u,
        inner: p,
        path: g
      };
      return {
        tag: "g",
        attributes: xe({}, v.outer),
        children: [{
          tag: "g",
          attributes: xe({}, v.inner),
          children: [{
            tag: r.icon.tag,
            children: r.icon.children,
            attributes: xe(xe({}, r.icon.attributes), v.path)
          }]
        }]
      };
    };
  }
}, Kp = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function mE(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e;
}
function z_(e) {
  return e.tag === "g" ? e.children : [e];
}
var j_ = {
  hooks: function() {
    return {
      parseNodeAttributes: function(n, r) {
        var i = r.getAttribute("data-fa-mask"), o = i ? cf(i.split(" ").map(function(s) {
          return s.trim();
        })) : Wg();
        return o.prefix || (o.prefix = yo()), n.mask = o, n.maskId = r.getAttribute("data-fa-mask-id"), n;
      }
    };
  },
  provides: function(t) {
    t.generateAbstractMask = function(n) {
      var r = n.children, i = n.attributes, o = n.main, s = n.mask, u = n.maskId, l = n.transform, f = o.width, h = o.icon, p = s.width, g = s.icon, v = zP({
        transform: l,
        containerWidth: p,
        iconWidth: f
      }), E = {
        tag: "rect",
        attributes: xe(xe({}, Kp), {}, {
          fill: "white"
        })
      }, y = h.children ? {
        children: h.children.map(mE)
      } : {}, b = {
        tag: "g",
        attributes: xe({}, v.inner),
        children: [mE(xe({
          tag: h.tag,
          attributes: xe(xe({}, h.attributes), v.path)
        }, y))]
      }, w = {
        tag: "g",
        attributes: xe({}, v.outer),
        children: [b]
      }, k = "mask-".concat(u || Sl()), A = "clip-".concat(u || Sl()), T = {
        tag: "mask",
        attributes: xe(xe({}, Kp), {}, {
          id: k,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        }),
        children: [E, w]
      }, _ = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: A
          },
          children: z_(g)
        }, T]
      };
      return r.push(_, {
        tag: "rect",
        attributes: xe({
          fill: "currentColor",
          "clip-path": "url(#".concat(A, ")"),
          mask: "url(#".concat(k, ")")
        }, Kp)
      }), {
        children: r,
        attributes: i
      };
    };
  }
}, H_ = {
  provides: function(t) {
    var n = !1;
    Co.matchMedia && (n = Co.matchMedia("(prefers-reduced-motion: reduce)").matches), t.missingIconAbstract = function() {
      var r = [], i = {
        fill: "currentColor"
      }, o = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      r.push({
        tag: "path",
        attributes: xe(xe({}, i), {}, {
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
      });
      var s = xe(xe({}, o), {}, {
        attributeName: "opacity"
      }), u = {
        tag: "circle",
        attributes: xe(xe({}, i), {}, {
          cx: "256",
          cy: "364",
          r: "28"
        }),
        children: []
      };
      return n || u.children.push({
        tag: "animate",
        attributes: xe(xe({}, o), {}, {
          attributeName: "r",
          values: "28;14;28;28;14;28;"
        })
      }, {
        tag: "animate",
        attributes: xe(xe({}, s), {}, {
          values: "1;0;1;1;0;1;"
        })
      }), r.push(u), r.push({
        tag: "path",
        attributes: xe(xe({}, i), {}, {
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        }),
        children: n ? [] : [{
          tag: "animate",
          attributes: xe(xe({}, s), {}, {
            values: "1;0;0;0;0;1;"
          })
        }]
      }), n || r.push({
        tag: "path",
        attributes: xe(xe({}, i), {}, {
          opacity: "0",
          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        }),
        children: [{
          tag: "animate",
          attributes: xe(xe({}, s), {}, {
            values: "0;0;1;1;0;0;"
          })
        }]
      }), {
        tag: "g",
        attributes: {
          class: "missing"
        },
        children: r
      };
    };
  }
}, U_ = {
  hooks: function() {
    return {
      parseNodeAttributes: function(n, r) {
        var i = r.getAttribute("data-fa-symbol"), o = i === null ? !1 : i === "" ? !0 : i;
        return n.symbol = o, n;
      }
    };
  }
}, V_ = [UP, P_, __, T_, F_, $_, L_, N_, j_, H_, U_];
r_(V_, {
  mixoutsTo: Kn
});
Kn.noAuto;
Kn.config;
Kn.library;
Kn.dom;
var vm = Kn.parse;
Kn.findIconDefinition;
Kn.toHtml;
var G_ = Kn.icon;
Kn.layer;
Kn.text;
Kn.counter;
var w9 = { exports: {} }, Yp, gE;
function W_() {
  if (gE) return Yp;
  gE = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Yp = e, Yp;
}
var Xp, vE;
function K_() {
  if (vE) return Xp;
  vE = 1;
  var e = W_();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Xp = function() {
    function r(s, u, l, f, h, p) {
      if (p !== e) {
        var g = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw g.name = "Invariant Violation", g;
      }
    }
    r.isRequired = r;
    function i() {
      return r;
    }
    var o = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: i,
      element: r,
      elementType: r,
      instanceOf: i,
      node: r,
      objectOf: i,
      oneOf: i,
      oneOfType: i,
      shape: i,
      exact: i,
      checkPropTypes: n,
      resetWarningCache: t
    };
    return o.PropTypes = o, o;
  }, Xp;
}
w9.exports = K_()();
var Y_ = w9.exports;
const We = /* @__PURE__ */ Ha(Y_);
var X_ = { GJS_DEBUG_TOPICS: "JS ERROR;JS LOG", LESSOPEN: "| /usr/bin/lesspipe %s", USER: "quentin", npm_config_user_agent: "yarn/4.3.1 npm/? node/v20.15.0 linux x64", GIO_MODULE_DIR: "/home/quentin/snap/code/common/.cache/gio-modules", XDG_SESSION_TYPE: "wayland", GIT_ASKPASS: "/snap/code/163/usr/share/code/resources/app/extensions/git/dist/askpass.sh", GTK_EXE_PREFIX_VSCODE_SNAP_ORIG: "", npm_node_execpath: "/tmp/xfs-b9c0de56/node", GDK_BACKEND_VSCODE_SNAP_ORIG: "", SHLVL: "2", HOME: "/home/quentin", CHROME_DESKTOP: "code-url-handler.desktop", LOCPATH_VSCODE_SNAP_ORIG: "", OLDPWD: "/home/quentin/git/recia-webcomponents/packages/tldraw", TERM_PROGRAM_VERSION: "1.91.0", DESKTOP_SESSION: "ubuntu", GTK_PATH: "/snap/code/163/usr/lib/x86_64-linux-gnu/gtk-3.0", NVM_BIN: "/home/quentin/.nvm/versions/node/v20.15.0/bin", npm_package_json: "/home/quentin/git/recia-webcomponents/packages/tldraw/package.json", NVM_INC: "/home/quentin/.nvm/versions/node/v20.15.0/include/node", GTK_IM_MODULE_FILE: "/home/quentin/snap/code/common/.cache/immodules/immodules.cache", GIO_LAUNCHED_DESKTOP_FILE: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SHELL_SESSION_MODE: "ubuntu", GTK_MODULES: "gail:atk-bridge", GSETTINGS_SCHEMA_DIR_VSCODE_SNAP_ORIG: "", VSCODE_GIT_ASKPASS_MAIN: "/snap/code/163/usr/share/code/resources/app/extensions/git/dist/askpass-main.js", VSCODE_GIT_ASKPASS_NODE: "/snap/code/163/usr/share/code/code", MANAGERPID: "2751", DBUS_STARTER_BUS_TYPE: "session", SYSTEMD_EXEC_PID: "2903", DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus,guid=9983a870354527138352c54f66879b2d", COLORTERM: "truecolor", LIBVIRT_DEFAULT_URI: "qemu:///system", GIO_LAUNCHED_DESKTOP_FILE_PID: "11151", NVM_DIR: "/home/quentin/.nvm", IM_CONFIG_PHASE: "1", WAYLAND_DISPLAY: "wayland-0", LOGNAME: "quentin", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", JOURNAL_STREAM: "8:45293", _: "/home/quentin/.nvm/versions/node/v20.15.0/bin/yarn", XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: "/etc/xdg/xdg-ubuntu:/etc/xdg", XDG_SESSION_CLASS: "user", XDG_DATA_DIRS_VSCODE_SNAP_ORIG: "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", USERNAME: "quentin", TERM: "xterm-256color", GNOME_DESKTOP_SESSION_ID: "this-is-deprecated", PATH: "/tmp/xfs-b9c0de56:/tmp/xfs-a124c425:/home/quentin/.nvm/versions/node/v20.15.0/bin:/home/quentin/.sdkman/candidates/java/current/bin:/home/quentin/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin:/home/quentin/.local/share/JetBrains/Toolbox/scripts", SESSION_MANAGER: "local/DELL-QGuillemin:@/tmp/.ICE-unix/2903,unix/DELL-QGuillemin:/tmp/.ICE-unix/2903", SDKMAN_CANDIDATES_DIR: "/home/quentin/.sdkman/candidates", GTK_EXE_PREFIX: "/snap/code/163/usr", INVOCATION_ID: "172dfd29144f4a3ab8078b9a4e197fe2", npm_package_name: "@gip-recia/tldraw-webcomponent", XDG_MENU_PREFIX: "gnome-", BAMF_DESKTOP_FILE_HINT: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_TERMINAL_SCREEN: "/org/gnome/Terminal/screen/f72afa51_589a_4b92_a06b_36e030345315", GNOME_SETUP_DISPLAY: ":1", XDG_RUNTIME_DIR: "/run/user/1000", GDK_BACKEND: "x11", DISPLAY: ":0", LOCPATH: "/snap/code/163/usr/lib/locale", LANG: "fr_FR.UTF-8", XDG_CURRENT_DESKTOP: "Unity", GIO_MODULE_DIR_VSCODE_SNAP_ORIG: "", XMODIFIERS: "@im=ibus", XDG_SESSION_DESKTOP: "ubuntu", XAUTHORITY: "/run/user/1000/.mutter-Xwaylandauth.FQF5P2", LS_COLORS: "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:", VSCODE_GIT_IPC_HANDLE: "/run/user/1000/vscode-git-0200aebe89.sock", GNOME_TERMINAL_SERVICE: ":1.190", SDKMAN_DIR: "/home/quentin/.sdkman", SDKMAN_PLATFORM: "linuxx64", TERM_PROGRAM: "vscode", SSH_AGENT_LAUNCHER: "gnome-keyring", SSH_AUTH_SOCK: "/run/user/1000/keyring/ssh", GSETTINGS_SCHEMA_DIR: "/home/quentin/snap/code/163/.local/share/glib-2.0/schemas", ORIGINAL_XDG_CURRENT_DESKTOP: "ubuntu:GNOME", PROJECT_CWD: "/home/quentin/git/recia-webcomponents", SHELL: "/bin/bash", INSIDE_NAUTILUS_PYTHON: "", npm_package_version: "3.6.0", npm_lifecycle_event: "build", QT_ACCESSIBILITY: "1", NO_AT_BRIDGE: "1", GDMSESSION: "ubuntu", LESSCLOSE: "/usr/bin/lesspipe %s %s", GTK_PATH_VSCODE_SNAP_ORIG: "", GTK_IM_MODULE_FILE_VSCODE_SNAP_ORIG: "", GJS_DEBUG_OUTPUT: "stderr", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", QT_IM_MODULE: "ibus", JAVA_HOME: "/home/quentin/.sdkman/candidates/java/current", GPG_TTY: "/dev/pts/2", PWD: "/home/quentin/git/recia-webcomponents/packages/tldraw", BERRY_BIN_FOLDER: "/tmp/xfs-b9c0de56", npm_execpath: "/tmp/xfs-b9c0de56/yarn", XDG_CONFIG_DIRS: "/etc/xdg/xdg-ubuntu:/etc/xdg", NVM_CD_FLAGS: "", DBUS_STARTER_ADDRESS: "unix:path=/run/user/1000/bus,guid=9983a870354527138352c54f66879b2d", XDG_DATA_DIRS: "/home/quentin/snap/code/163/.local/share:/home/quentin/snap/code/163:/snap/code/163/usr/share:/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", VTE_VERSION: "6800", INIT_CWD: "/home/quentin/git/recia-webcomponents/packages/tldraw", NODE_ENV: "production", VITE_BASE_URI: "/", VITE_AXIOS_TIMEOUT: "10000" };
function EE(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Hr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? EE(Object(n), !0).forEach(function(r) {
      pa(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : EE(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Dd(e) {
  "@babel/helpers - typeof";
  return Dd = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Dd(e);
}
function pa(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Z_(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function q_(e, t) {
  if (e == null) return {};
  var n = Z_(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Em(e) {
  return J_(e) || Q_(e) || eT(e) || tT();
}
function J_(e) {
  if (Array.isArray(e)) return Cm(e);
}
function Q_(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function eT(e, t) {
  if (e) {
    if (typeof e == "string") return Cm(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Cm(e, t);
  }
}
function Cm(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function tT() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nT(e) {
  var t, n = e.beat, r = e.fade, i = e.beatFade, o = e.bounce, s = e.shake, u = e.flash, l = e.spin, f = e.spinPulse, h = e.spinReverse, p = e.pulse, g = e.fixedWidth, v = e.inverse, E = e.border, y = e.listItem, b = e.flip, w = e.size, k = e.rotation, A = e.pull, T = (t = {
    "fa-beat": n,
    "fa-fade": r,
    "fa-beat-fade": i,
    "fa-bounce": o,
    "fa-shake": s,
    "fa-flash": u,
    "fa-spin": l,
    "fa-spin-reverse": h,
    "fa-spin-pulse": f,
    "fa-pulse": p,
    "fa-fw": g,
    "fa-inverse": v,
    "fa-border": E,
    "fa-li": y,
    "fa-flip": b === !0,
    "fa-flip-horizontal": b === "horizontal" || b === "both",
    "fa-flip-vertical": b === "vertical" || b === "both"
  }, pa(t, "fa-".concat(w), typeof w < "u" && w !== null), pa(t, "fa-rotate-".concat(k), typeof k < "u" && k !== null && k !== 0), pa(t, "fa-pull-".concat(A), typeof A < "u" && A !== null), pa(t, "fa-swap-opacity", e.swapOpacity), t);
  return Object.keys(T).map(function(_) {
    return T[_] ? _ : null;
  }).filter(function(_) {
    return _;
  });
}
function rT(e) {
  return e = e - 0, e === e;
}
function S9(e) {
  return rT(e) ? e : (e = e.replace(/[\-_\s]+(.)?/g, function(t, n) {
    return n ? n.toUpperCase() : "";
  }), e.substr(0, 1).toLowerCase() + e.substr(1));
}
var iT = ["style"];
function oT(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function sT(e) {
  return e.split(";").map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t;
  }).reduce(function(t, n) {
    var r = n.indexOf(":"), i = S9(n.slice(0, r)), o = n.slice(r + 1).trim();
    return i.startsWith("webkit") ? t[oT(i)] = o : t[i] = o, t;
  }, {});
}
function x9(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof t == "string")
    return t;
  var r = (t.children || []).map(function(l) {
    return x9(e, l);
  }), i = Object.keys(t.attributes || {}).reduce(function(l, f) {
    var h = t.attributes[f];
    switch (f) {
      case "class":
        l.attrs.className = h, delete t.attributes.class;
        break;
      case "style":
        l.attrs.style = sT(h);
        break;
      default:
        f.indexOf("aria-") === 0 || f.indexOf("data-") === 0 ? l.attrs[f.toLowerCase()] = h : l.attrs[S9(f)] = h;
    }
    return l;
  }, {
    attrs: {}
  }), o = n.style, s = o === void 0 ? {} : o, u = q_(n, iT);
  return i.attrs.style = Hr(Hr({}, i.attrs.style), s), e.apply(void 0, [t.tag, Hr(Hr({}, i.attrs), u)].concat(Em(r)));
}
var k9 = !1;
try {
  k9 = X_.NODE_ENV === "production";
} catch {
}
function aT() {
  if (!k9 && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function CE(e) {
  if (e && Dd(e) === "object" && e.prefix && e.iconName && e.icon)
    return e;
  if (vm.icon)
    return vm.icon(e);
  if (e === null)
    return null;
  if (e && Dd(e) === "object" && e.prefix && e.iconName)
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
function Zp(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? pa({}, e, t) : {};
}
var yE = {
  border: !1,
  className: "",
  mask: null,
  maskId: null,
  fixedWidth: !1,
  inverse: !1,
  flip: !1,
  icon: null,
  listItem: !1,
  pull: null,
  pulse: !1,
  rotation: null,
  size: null,
  spin: !1,
  spinPulse: !1,
  spinReverse: !1,
  beat: !1,
  fade: !1,
  beatFade: !1,
  bounce: !1,
  shake: !1,
  symbol: !1,
  title: "",
  titleId: null,
  transform: null,
  swapOpacity: !1
}, Ea = /* @__PURE__ */ ft.forwardRef(function(e, t) {
  var n = Hr(Hr({}, yE), e), r = n.icon, i = n.mask, o = n.symbol, s = n.className, u = n.title, l = n.titleId, f = n.maskId, h = CE(r), p = Zp("classes", [].concat(Em(nT(n)), Em((s || "").split(" ")))), g = Zp("transform", typeof n.transform == "string" ? vm.transform(n.transform) : n.transform), v = Zp("mask", CE(i)), E = G_(h, Hr(Hr(Hr(Hr({}, p), g), v), {}, {
    symbol: o,
    title: u,
    titleId: l,
    maskId: f
  }));
  if (!E)
    return aT("Could not find icon", h), null;
  var y = E.abstract, b = {
    ref: t
  };
  return Object.keys(n).forEach(function(w) {
    yE.hasOwnProperty(w) || (b[w] = n[w]);
  }), uT(y[0], b);
});
Ea.displayName = "FontAwesomeIcon";
Ea.propTypes = {
  beat: We.bool,
  border: We.bool,
  beatFade: We.bool,
  bounce: We.bool,
  className: We.string,
  fade: We.bool,
  flash: We.bool,
  mask: We.oneOfType([We.object, We.array, We.string]),
  maskId: We.string,
  fixedWidth: We.bool,
  inverse: We.bool,
  flip: We.oneOf([!0, !1, "horizontal", "vertical", "both"]),
  icon: We.oneOfType([We.object, We.array, We.string]),
  listItem: We.bool,
  pull: We.oneOf(["right", "left"]),
  pulse: We.bool,
  rotation: We.oneOf([0, 90, 180, 270]),
  shake: We.bool,
  size: We.oneOf(["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"]),
  spin: We.bool,
  spinPulse: We.bool,
  spinReverse: We.bool,
  symbol: We.oneOfType([We.bool, We.string]),
  title: We.string,
  titleId: We.string,
  transform: We.oneOfType([We.string, We.object]),
  swapOpacity: We.bool
};
var uT = x9.bind(null, ft.createElement), D9 = { exports: {} }, qp = {}, Jp = { exports: {} }, Qp = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bE;
function lT() {
  if (bE) return Qp;
  bE = 1;
  var e = c;
  function t(p, g) {
    return p === g && (p !== 0 || 1 / p === 1 / g) || p !== p && g !== g;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, i = e.useEffect, o = e.useLayoutEffect, s = e.useDebugValue;
  function u(p, g) {
    var v = g(), E = r({ inst: { value: v, getSnapshot: g } }), y = E[0].inst, b = E[1];
    return o(function() {
      y.value = v, y.getSnapshot = g, l(y) && b({ inst: y });
    }, [p, v, g]), i(function() {
      return l(y) && b({ inst: y }), p(function() {
        l(y) && b({ inst: y });
      });
    }, [p]), s(v), v;
  }
  function l(p) {
    var g = p.getSnapshot;
    p = p.value;
    try {
      var v = g();
      return !n(p, v);
    } catch {
      return !0;
    }
  }
  function f(p, g) {
    return g();
  }
  var h = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? f : u;
  return Qp.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : h, Qp;
}
var wE;
function cT() {
  return wE || (wE = 1, Jp.exports = lT()), Jp.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var SE;
function dT() {
  if (SE) return qp;
  SE = 1;
  var e = c, t = cT();
  function n(f, h) {
    return f === h && (f !== 0 || 1 / f === 1 / h) || f !== f && h !== h;
  }
  var r = typeof Object.is == "function" ? Object.is : n, i = t.useSyncExternalStore, o = e.useRef, s = e.useEffect, u = e.useMemo, l = e.useDebugValue;
  return qp.useSyncExternalStoreWithSelector = function(f, h, p, g, v) {
    var E = o(null);
    if (E.current === null) {
      var y = { hasValue: !1, value: null };
      E.current = y;
    } else y = E.current;
    E = u(function() {
      function w(I) {
        if (!k) {
          if (k = !0, A = I, I = g(I), v !== void 0 && y.hasValue) {
            var B = y.value;
            if (v(B, I)) return T = B;
          }
          return T = I;
        }
        if (B = T, r(A, I)) return B;
        var M = g(I);
        return v !== void 0 && v(B, M) ? B : (A = I, T = M);
      }
      var k = !1, A, T, _ = p === void 0 ? null : p;
      return [function() {
        return w(h());
      }, _ === null ? void 0 : function() {
        return w(_());
      }];
    }, [h, p, g, v]);
    var b = i(f, E[0], E[1]);
    return s(function() {
      y.hasValue = !0, y.value = b;
    }, [b]), l(b), b;
  }, qp;
}
D9.exports = dT();
var fT = D9.exports;
function hT(e, t = (r) => r, n) {
  let r = c.useRef();
  r.current || (r.current = new Map(e.getStates()));
  let i = c.useCallback(() => r.current ? r.current : /* @__PURE__ */ new Map(), []), o = fT.useSyncExternalStoreWithSelector(
    (u) => s(e, u),
    i,
    i,
    t,
    n
  ), s = c.useCallback(
    (u, l) => {
      let f = () => {
        r.current = new Map(u.getStates()), l();
      };
      return u.on("change", f), () => u.off("change", f);
    },
    []
  );
  return o;
}
function pT({
  isLoading: e,
  isError: t,
  isSaving: n,
  provider: r,
  darkMode: i
}) {
  return /* @__PURE__ */ re.jsxs("div", { className: "bottom-container", style: { color: i ? "#f8f9fa" : "var(--colors-text)" }, children: [
    r && /* @__PURE__ */ re.jsx(mT, { provider: r }),
    e && !t && /* @__PURE__ */ re.jsx(Ea, { icon: uP, spin: !0 }),
    t && !n && /* @__PURE__ */ re.jsx(Ea, { icon: dP, shake: !0 }),
    n && /* @__PURE__ */ re.jsx(Ea, { icon: cP, beatFade: !0 })
  ] });
}
function mT({ provider: e }) {
  const t = hT(e.awareness);
  return /* @__PURE__ */ re.jsxs("div", { children: [
    /* @__PURE__ */ re.jsx(Ea, { icon: lP, style: { marginRight: "8px" } }),
    t.size
  ] });
}
const gT = (e, t) => zl.post(e, t, {
  headers: { "Content-Type": "multipart/form-data" }
}), vT = (e, t) => zl.delete(`${e}/${t}`);
function A9(e) {
  const t = c.useCallback(
    async (r, i, o) => {
      try {
        const s = new FormData();
        s.append("name", o), s.append("file", i);
        const u = await gT(e, s);
        return `${e}/${u.data.uri}`;
      } catch {
        return !1;
      }
    },
    [e]
  ), n = c.useCallback(
    async (r, i) => {
      try {
        return await vT(e, i), !0;
      } catch {
        return !1;
      }
    },
    [e]
  );
  return {
    onAssetCreate: e ? t : void 0,
    onAssetDelete: e ? n : void 0
  };
}
const ET = [
  "ar",
  "da",
  "de",
  "en",
  "es",
  "fa",
  "fr",
  "gl",
  "he",
  "it",
  "ja",
  "ko_kr",
  "ku",
  "my",
  "nb_no",
  "ne",
  "nn_no",
  "pl",
  "pt_br",
  "pt_pt",
  "ru",
  "sv",
  "te",
  "th",
  "tr",
  "uk",
  "zh_cn",
  "zh_tw"
], I9 = (e, t = ET) => {
  if (t.includes(window.navigator.language)) return window.navigator.language;
  const r = window.navigator.languages.filter((i) => t.find((o) => i == o));
  return r.length > 0 ? r[0] : e;
}, CT = (e, t) => {
  const n = URL.createObjectURL(e), r = document.createElement("a");
  r.href = n, r.download = t, document.body.appendChild(r), r.dispatchEvent(
    new MouseEvent("click", {
      bubbles: !0,
      cancelable: !0,
      view: window
    })
  ), document.body.removeChild(r);
}, yT = (e, t) => `${e.document.name}${t ? " - " + t.name : ""}`, P9 = (e, t) => {
  CT(t.blob, yT(e, t));
}, Fn = () => /* @__PURE__ */ new Map(), ym = (e) => {
  const t = Fn();
  return e.forEach((n, r) => {
    t.set(r, n);
  }), t;
}, ni = (e, t, n) => {
  let r = e.get(t);
  return r === void 0 && e.set(t, r = n()), r;
}, bT = (e, t) => {
  const n = [];
  for (const [r, i] of e)
    n.push(t(i, r));
  return n;
}, wT = (e, t) => {
  for (const [n, r] of e)
    if (t(r, n))
      return !0;
  return !1;
}, wo = () => /* @__PURE__ */ new Set(), e1 = (e) => e[e.length - 1], ST = (e, t) => {
  for (let n = 0; n < t.length; n++)
    e.push(t[n]);
}, ki = Array.from, xT = (e, t) => {
  for (let n = 0; n < e.length; n++)
    if (t(e[n], n, e))
      return !0;
  return !1;
}, bm = Array.isArray;
class _9 {
  constructor() {
    this._observers = Fn();
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  on(t, n) {
    return ni(
      this._observers,
      /** @type {string} */
      t,
      wo
    ).add(n), n;
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  once(t, n) {
    const r = (...i) => {
      this.off(
        t,
        /** @type {any} */
        r
      ), n(...i);
    };
    this.on(
      t,
      /** @type {any} */
      r
    );
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  off(t, n) {
    const r = this._observers.get(t);
    r !== void 0 && (r.delete(n), r.size === 0 && this._observers.delete(t));
  }
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name The event name.
   * @param {Parameters<EVENTS[NAME]>} args The arguments that are applied to the event listener.
   */
  emit(t, n) {
    return ki((this._observers.get(t) || Fn()).values()).forEach((r) => r(...n));
  }
  destroy() {
    this._observers = Fn();
  }
}
class T9 {
  constructor() {
    this._observers = Fn();
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  on(t, n) {
    ni(this._observers, t, wo).add(n);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  once(t, n) {
    const r = (...i) => {
      this.off(t, r), n(...i);
    };
    this.on(t, r);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  off(t, n) {
    const r = this._observers.get(t);
    r !== void 0 && (r.delete(n), r.size === 0 && this._observers.delete(t));
  }
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @param {N} name The event name.
   * @param {Array<any>} args The arguments that are applied to the event listener.
   */
  emit(t, n) {
    return ki((this._observers.get(t) || Fn()).values()).forEach((r) => r(...n));
  }
  destroy() {
    this._observers = Fn();
  }
}
const Di = Math.floor, ud = Math.abs, Zg = (e, t) => e < t ? e : t, ws = (e, t) => e > t ? e : t, kT = Math.pow, F9 = (e) => e !== 0 ? e < 0 : 1 / e < 0, xE = 1, kE = 2, t1 = 4, n1 = 8, xl = 32, Ei = 64, Gn = 128, ff = 31, wm = 63, as = 127, DT = 2147483647, B9 = Number.MAX_SAFE_INTEGER, AT = Number.isInteger || ((e) => typeof e == "number" && isFinite(e) && Di(e) === e), IT = String.fromCharCode, PT = (e) => e.toLowerCase(), _T = /^\s*/g, TT = (e) => e.replace(_T, ""), FT = /([A-Z])/g, DE = (e, t) => TT(e.replace(FT, (n) => `${t}${PT(n)}`)), BT = (e) => {
  const t = unescape(encodeURIComponent(e)), n = t.length, r = new Uint8Array(n);
  for (let i = 0; i < n; i++)
    r[i] = /** @type {number} */
    t.codePointAt(i);
  return r;
}, kl = (
  /** @type {TextEncoder} */
  typeof TextEncoder < "u" ? new TextEncoder() : null
), MT = (e) => kl.encode(e), RT = kl ? MT : BT;
let ol = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8", { fatal: !0, ignoreBOM: !0 });
ol && ol.decode(new Uint8Array()).length === 1 && (ol = null);
class Vl {
  constructor() {
    this.cpos = 0, this.cbuf = new Uint8Array(100), this.bufs = [];
  }
}
const hn = () => new Vl(), qg = (e) => {
  let t = e.cpos;
  for (let n = 0; n < e.bufs.length; n++)
    t += e.bufs[n].length;
  return t;
}, It = (e) => {
  const t = new Uint8Array(qg(e));
  let n = 0;
  for (let r = 0; r < e.bufs.length; r++) {
    const i = e.bufs[r];
    t.set(i, n), n += i.length;
  }
  return t.set(new Uint8Array(e.cbuf.buffer, 0, e.cpos), n), t;
}, OT = (e, t) => {
  const n = e.cbuf.length;
  n - e.cpos < t && (e.bufs.push(new Uint8Array(e.cbuf.buffer, 0, e.cpos)), e.cbuf = new Uint8Array(ws(n, t) * 2), e.cpos = 0);
}, en = (e, t) => {
  const n = e.cbuf.length;
  e.cpos === n && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(n * 2), e.cpos = 0), e.cbuf[e.cpos++] = t;
}, Sm = en, Me = (e, t) => {
  for (; t > as; )
    en(e, Gn | as & t), t = Di(t / 128);
  en(e, as & t);
}, Jg = (e, t) => {
  const n = F9(t);
  for (n && (t = -t), en(e, (t > wm ? Gn : 0) | (n ? Ei : 0) | wm & t), t = Di(t / 64); t > 0; )
    en(e, (t > as ? Gn : 0) | as & t), t = Di(t / 128);
}, xm = new Uint8Array(3e4), $T = xm.length / 3, LT = (e, t) => {
  if (t.length < $T) {
    const n = kl.encodeInto(t, xm).written || 0;
    Me(e, n);
    for (let r = 0; r < n; r++)
      en(e, xm[r]);
  } else
    Ot(e, RT(t));
}, NT = (e, t) => {
  const n = unescape(encodeURIComponent(t)), r = n.length;
  Me(e, r);
  for (let i = 0; i < r; i++)
    en(
      e,
      /** @type {number} */
      n.codePointAt(i)
    );
}, us = kl && /** @type {any} */
kl.encodeInto ? LT : NT, hf = (e, t) => {
  const n = e.cbuf.length, r = e.cpos, i = Zg(n - r, t.length), o = t.length - i;
  e.cbuf.set(t.subarray(0, i), r), e.cpos += i, o > 0 && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(ws(n * 2, o)), e.cbuf.set(t.subarray(i)), e.cpos = o);
}, Ot = (e, t) => {
  Me(e, t.byteLength), hf(e, t);
}, Qg = (e, t) => {
  OT(e, t);
  const n = new DataView(e.cbuf.buffer, e.cpos, t);
  return e.cpos += t, n;
}, zT = (e, t) => Qg(e, 4).setFloat32(0, t, !1), jT = (e, t) => Qg(e, 8).setFloat64(0, t, !1), HT = (e, t) => (
  /** @type {any} */
  Qg(e, 8).setBigInt64(0, t, !1)
), AE = new DataView(new ArrayBuffer(4)), UT = (e) => (AE.setFloat32(0, e), AE.getFloat32(0) === e), Dl = (e, t) => {
  switch (typeof t) {
    case "string":
      en(e, 119), us(e, t);
      break;
    case "number":
      AT(t) && ud(t) <= DT ? (en(e, 125), Jg(e, t)) : UT(t) ? (en(e, 124), zT(e, t)) : (en(e, 123), jT(e, t));
      break;
    case "bigint":
      en(e, 122), HT(e, t);
      break;
    case "object":
      if (t === null)
        en(e, 126);
      else if (bm(t)) {
        en(e, 117), Me(e, t.length);
        for (let n = 0; n < t.length; n++)
          Dl(e, t[n]);
      } else if (t instanceof Uint8Array)
        en(e, 116), Ot(e, t);
      else {
        en(e, 118);
        const n = Object.keys(t);
        Me(e, n.length);
        for (let r = 0; r < n.length; r++) {
          const i = n[r];
          us(e, i), Dl(e, t[i]);
        }
      }
      break;
    case "boolean":
      en(e, t ? 120 : 121);
      break;
    default:
      en(e, 127);
  }
};
class IE extends Vl {
  /**
   * @param {function(Encoder, T):void} writer
   */
  constructor(t) {
    super(), this.w = t, this.s = null, this.count = 0;
  }
  /**
   * @param {T} v
   */
  write(t) {
    this.s === t ? this.count++ : (this.count > 0 && Me(this, this.count - 1), this.count = 1, this.w(this, t), this.s = t);
  }
}
const PE = (e) => {
  e.count > 0 && (Jg(e.encoder, e.count === 1 ? e.s : -e.s), e.count > 1 && Me(e.encoder, e.count - 2));
};
class ld {
  constructor() {
    this.encoder = new Vl(), this.s = 0, this.count = 0;
  }
  /**
   * @param {number} v
   */
  write(t) {
    this.s === t ? this.count++ : (PE(this), this.count = 1, this.s = t);
  }
  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array() {
    return PE(this), It(this.encoder);
  }
}
const _E = (e) => {
  if (e.count > 0) {
    const t = e.diff * 2 + (e.count === 1 ? 0 : 1);
    Jg(e.encoder, t), e.count > 1 && Me(e.encoder, e.count - 2);
  }
};
class r1 {
  constructor() {
    this.encoder = new Vl(), this.s = 0, this.count = 0, this.diff = 0;
  }
  /**
   * @param {number} v
   */
  write(t) {
    this.diff === t - this.s ? (this.s = t, this.count++) : (_E(this), this.count = 1, this.diff = t - this.s, this.s = t);
  }
  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array() {
    return _E(this), It(this.encoder);
  }
}
class VT {
  constructor() {
    this.sarr = [], this.s = "", this.lensE = new ld();
  }
  /**
   * @param {string} string
   */
  write(t) {
    this.s += t, this.s.length > 19 && (this.sarr.push(this.s), this.s = ""), this.lensE.write(t.length);
  }
  toUint8Array() {
    const t = new Vl();
    return this.sarr.push(this.s), this.s = "", us(t, this.sarr.join("")), hf(t, this.lensE.toUint8Array()), It(t);
  }
}
const So = (e) => new Error(e), Kr = () => {
  throw So("Method unimplemented");
}, Yr = () => {
  throw So("Unexpected case");
}, M9 = So("Unexpected end of array"), R9 = So("Integer out of Range");
class pf {
  /**
   * @param {Uint8Array} uint8Array Binary data to decode
   */
  constructor(t) {
    this.arr = t, this.pos = 0;
  }
}
const To = (e) => new pf(e), GT = (e) => e.pos !== e.arr.length, WT = (e, t) => {
  const n = new Uint8Array(e.arr.buffer, e.pos + e.arr.byteOffset, t);
  return e.pos += t, n;
}, fn = (e) => WT(e, He(e)), Pa = (e) => e.arr[e.pos++], He = (e) => {
  let t = 0, n = 1;
  const r = e.arr.length;
  for (; e.pos < r; ) {
    const i = e.arr[e.pos++];
    if (t = t + (i & as) * n, n *= 128, i < Gn)
      return t;
    if (t > B9)
      throw R9;
  }
  throw M9;
}, e4 = (e) => {
  let t = e.arr[e.pos++], n = t & wm, r = 64;
  const i = (t & Ei) > 0 ? -1 : 1;
  if (!(t & Gn))
    return i * n;
  const o = e.arr.length;
  for (; e.pos < o; ) {
    if (t = e.arr[e.pos++], n = n + (t & as) * r, r *= 128, t < Gn)
      return i * n;
    if (n > B9)
      throw R9;
  }
  throw M9;
}, KT = (e) => {
  let t = He(e);
  if (t === 0)
    return "";
  {
    let n = String.fromCodePoint(Pa(e));
    if (--t < 100)
      for (; t--; )
        n += String.fromCodePoint(Pa(e));
    else
      for (; t > 0; ) {
        const r = t < 1e4 ? t : 1e4, i = e.arr.subarray(e.pos, e.pos + r);
        e.pos += r, n += String.fromCodePoint.apply(
          null,
          /** @type {any} */
          i
        ), t -= r;
      }
    return decodeURIComponent(escape(n));
  }
}, YT = (e) => (
  /** @type any */
  ol.decode(fn(e))
), vo = ol ? YT : KT, t4 = (e, t) => {
  const n = new DataView(e.arr.buffer, e.arr.byteOffset + e.pos, t);
  return e.pos += t, n;
}, XT = (e) => t4(e, 4).getFloat32(0, !1), ZT = (e) => t4(e, 8).getFloat64(0, !1), qT = (e) => (
  /** @type {any} */
  t4(e, 8).getBigInt64(0, !1)
), JT = [
  (e) => {
  },
  // CASE 127: undefined
  (e) => null,
  // CASE 126: null
  e4,
  // CASE 125: integer
  XT,
  // CASE 124: float32
  ZT,
  // CASE 123: float64
  qT,
  // CASE 122: bigint
  (e) => !1,
  // CASE 121: boolean (false)
  (e) => !0,
  // CASE 120: boolean (true)
  vo,
  // CASE 119: string
  (e) => {
    const t = He(e), n = {};
    for (let r = 0; r < t; r++) {
      const i = vo(e);
      n[i] = Al(e);
    }
    return n;
  },
  (e) => {
    const t = He(e), n = [];
    for (let r = 0; r < t; r++)
      n.push(Al(e));
    return n;
  },
  fn
  // CASE 116: Uint8Array
], Al = (e) => JT[127 - Pa(e)](e);
class TE extends pf {
  /**
   * @param {Uint8Array} uint8Array
   * @param {function(Decoder):T} reader
   */
  constructor(t, n) {
    super(t), this.reader = n, this.s = null, this.count = 0;
  }
  read() {
    return this.count === 0 && (this.s = this.reader(this), GT(this) ? this.count = He(this) + 1 : this.count = -1), this.count--, /** @type {T} */
    this.s;
  }
}
class cd extends pf {
  /**
   * @param {Uint8Array} uint8Array
   */
  constructor(t) {
    super(t), this.s = 0, this.count = 0;
  }
  read() {
    if (this.count === 0) {
      this.s = e4(this);
      const t = F9(this.s);
      this.count = 1, t && (this.s = -this.s, this.count = He(this) + 2);
    }
    return this.count--, /** @type {number} */
    this.s;
  }
}
class i1 extends pf {
  /**
   * @param {Uint8Array} uint8Array
   */
  constructor(t) {
    super(t), this.s = 0, this.count = 0, this.diff = 0;
  }
  /**
   * @return {number}
   */
  read() {
    if (this.count === 0) {
      const t = e4(this), n = t & 1;
      this.diff = Di(t / 2), this.count = 1, n && (this.count = He(this) + 2);
    }
    return this.s += this.diff, this.count--, this.s;
  }
}
class QT {
  /**
   * @param {Uint8Array} uint8Array
   */
  constructor(t) {
    this.decoder = new cd(t), this.str = vo(this.decoder), this.spos = 0;
  }
  /**
   * @return {string}
   */
  read() {
    const t = this.spos + this.decoder.read(), n = this.str.slice(this.spos, t);
    return this.spos = t, n;
  }
}
const eF = crypto.getRandomValues.bind(crypto), O9 = () => eF(new Uint32Array(1))[0], tF = "10000000-1000-4000-8000" + -1e11, nF = () => tF.replace(
  /[018]/g,
  /** @param {number} c */
  (e) => (e ^ O9() & 15 >> e / 4).toString(16)
), xo = Date.now, FE = (e) => (
  /** @type {Promise<T>} */
  new Promise(e)
);
Promise.all.bind(Promise);
const BE = (e) => e === void 0 ? null : e;
class rF {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {string} key
   * @param {any} newValue
   */
  setItem(t, n) {
    this.map.set(t, n);
  }
  /**
   * @param {string} key
   */
  getItem(t) {
    return this.map.get(t);
  }
}
let $9 = new rF(), n4 = !0;
try {
  typeof localStorage < "u" && localStorage && ($9 = localStorage, n4 = !1);
} catch {
}
const L9 = $9, iF = (e) => n4 || addEventListener(
  "storage",
  /** @type {any} */
  e
), oF = (e) => n4 || removeEventListener(
  "storage",
  /** @type {any} */
  e
), sF = Object.assign, N9 = Object.keys, aF = (e, t) => {
  for (const n in e)
    t(e[n], n);
}, uF = (e, t) => {
  const n = [];
  for (const r in e)
    n.push(t(e[r], r));
  return n;
}, ME = (e) => N9(e).length, RE = (e) => N9(e).length, lF = (e) => {
  for (const t in e)
    return !1;
  return !0;
}, cF = (e, t) => {
  for (const n in e)
    if (!t(e[n], n))
      return !1;
  return !0;
}, z9 = (e, t) => Object.prototype.hasOwnProperty.call(e, t), dF = (e, t) => e === t || RE(e) === RE(t) && cF(e, (n, r) => (n !== void 0 || z9(t, r)) && t[r] === n), r4 = (e, t, n = 0) => {
  try {
    for (; n < e.length; n++)
      e[n](...t);
  } finally {
    n < e.length && r4(e, t, n + 1);
  }
}, fF = (e) => e, hF = (e, t) => e === t, sl = (e, t) => {
  if (e == null || t == null)
    return hF(e, t);
  if (e.constructor !== t.constructor)
    return !1;
  if (e === t)
    return !0;
  switch (e.constructor) {
    case ArrayBuffer:
      e = new Uint8Array(e), t = new Uint8Array(t);
    case Uint8Array: {
      if (e.byteLength !== t.byteLength)
        return !1;
      for (let n = 0; n < e.length; n++)
        if (e[n] !== t[n])
          return !1;
      break;
    }
    case Set: {
      if (e.size !== t.size)
        return !1;
      for (const n of e)
        if (!t.has(n))
          return !1;
      break;
    }
    case Map: {
      if (e.size !== t.size)
        return !1;
      for (const n of e.keys())
        if (!t.has(n) || !sl(e.get(n), t.get(n)))
          return !1;
      break;
    }
    case Object:
      if (ME(e) !== ME(t))
        return !1;
      for (const n in e)
        if (!z9(e, n) || !sl(e[n], t[n]))
          return !1;
      break;
    case Array:
      if (e.length !== t.length)
        return !1;
      for (let n = 0; n < e.length; n++)
        if (!sl(e[n], t[n]))
          return !1;
      break;
    default:
      return !1;
  }
  return !0;
}, pF = (e, t) => t.includes(e);
var j9 = { GJS_DEBUG_TOPICS: "JS ERROR;JS LOG", LESSOPEN: "| /usr/bin/lesspipe %s", USER: "quentin", npm_config_user_agent: "yarn/4.3.1 npm/? node/v20.15.0 linux x64", GIO_MODULE_DIR: "/home/quentin/snap/code/common/.cache/gio-modules", XDG_SESSION_TYPE: "wayland", GIT_ASKPASS: "/snap/code/163/usr/share/code/resources/app/extensions/git/dist/askpass.sh", GTK_EXE_PREFIX_VSCODE_SNAP_ORIG: "", npm_node_execpath: "/tmp/xfs-b9c0de56/node", GDK_BACKEND_VSCODE_SNAP_ORIG: "", SHLVL: "2", HOME: "/home/quentin", CHROME_DESKTOP: "code-url-handler.desktop", LOCPATH_VSCODE_SNAP_ORIG: "", OLDPWD: "/home/quentin/git/recia-webcomponents/packages/tldraw", TERM_PROGRAM_VERSION: "1.91.0", DESKTOP_SESSION: "ubuntu", GTK_PATH: "/snap/code/163/usr/lib/x86_64-linux-gnu/gtk-3.0", NVM_BIN: "/home/quentin/.nvm/versions/node/v20.15.0/bin", npm_package_json: "/home/quentin/git/recia-webcomponents/packages/tldraw/package.json", NVM_INC: "/home/quentin/.nvm/versions/node/v20.15.0/include/node", GTK_IM_MODULE_FILE: "/home/quentin/snap/code/common/.cache/immodules/immodules.cache", GIO_LAUNCHED_DESKTOP_FILE: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_SHELL_SESSION_MODE: "ubuntu", GTK_MODULES: "gail:atk-bridge", GSETTINGS_SCHEMA_DIR_VSCODE_SNAP_ORIG: "", VSCODE_GIT_ASKPASS_MAIN: "/snap/code/163/usr/share/code/resources/app/extensions/git/dist/askpass-main.js", VSCODE_GIT_ASKPASS_NODE: "/snap/code/163/usr/share/code/code", MANAGERPID: "2751", DBUS_STARTER_BUS_TYPE: "session", SYSTEMD_EXEC_PID: "2903", DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus,guid=9983a870354527138352c54f66879b2d", COLORTERM: "truecolor", LIBVIRT_DEFAULT_URI: "qemu:///system", GIO_LAUNCHED_DESKTOP_FILE_PID: "11151", NVM_DIR: "/home/quentin/.nvm", IM_CONFIG_PHASE: "1", WAYLAND_DISPLAY: "wayland-0", LOGNAME: "quentin", SDKMAN_CANDIDATES_API: "https://api.sdkman.io/2", JOURNAL_STREAM: "8:45293", _: "/home/quentin/.nvm/versions/node/v20.15.0/bin/yarn", XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: "/etc/xdg/xdg-ubuntu:/etc/xdg", XDG_SESSION_CLASS: "user", XDG_DATA_DIRS_VSCODE_SNAP_ORIG: "/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", USERNAME: "quentin", TERM: "xterm-256color", GNOME_DESKTOP_SESSION_ID: "this-is-deprecated", PATH: "/tmp/xfs-b9c0de56:/tmp/xfs-a124c425:/home/quentin/.nvm/versions/node/v20.15.0/bin:/home/quentin/.sdkman/candidates/java/current/bin:/home/quentin/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin:/home/quentin/.local/share/JetBrains/Toolbox/scripts", SESSION_MANAGER: "local/DELL-QGuillemin:@/tmp/.ICE-unix/2903,unix/DELL-QGuillemin:/tmp/.ICE-unix/2903", SDKMAN_CANDIDATES_DIR: "/home/quentin/.sdkman/candidates", GTK_EXE_PREFIX: "/snap/code/163/usr", INVOCATION_ID: "172dfd29144f4a3ab8078b9a4e197fe2", npm_package_name: "@gip-recia/tldraw-webcomponent", XDG_MENU_PREFIX: "gnome-", BAMF_DESKTOP_FILE_HINT: "/var/lib/snapd/desktop/applications/code_code.desktop", GNOME_TERMINAL_SCREEN: "/org/gnome/Terminal/screen/f72afa51_589a_4b92_a06b_36e030345315", GNOME_SETUP_DISPLAY: ":1", XDG_RUNTIME_DIR: "/run/user/1000", GDK_BACKEND: "x11", DISPLAY: ":0", LOCPATH: "/snap/code/163/usr/lib/locale", LANG: "fr_FR.UTF-8", XDG_CURRENT_DESKTOP: "Unity", GIO_MODULE_DIR_VSCODE_SNAP_ORIG: "", XMODIFIERS: "@im=ibus", XDG_SESSION_DESKTOP: "ubuntu", XAUTHORITY: "/run/user/1000/.mutter-Xwaylandauth.FQF5P2", LS_COLORS: "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:", VSCODE_GIT_IPC_HANDLE: "/run/user/1000/vscode-git-0200aebe89.sock", GNOME_TERMINAL_SERVICE: ":1.190", SDKMAN_DIR: "/home/quentin/.sdkman", SDKMAN_PLATFORM: "linuxx64", TERM_PROGRAM: "vscode", SSH_AGENT_LAUNCHER: "gnome-keyring", SSH_AUTH_SOCK: "/run/user/1000/keyring/ssh", GSETTINGS_SCHEMA_DIR: "/home/quentin/snap/code/163/.local/share/glib-2.0/schemas", ORIGINAL_XDG_CURRENT_DESKTOP: "ubuntu:GNOME", PROJECT_CWD: "/home/quentin/git/recia-webcomponents", SHELL: "/bin/bash", INSIDE_NAUTILUS_PYTHON: "", npm_package_version: "3.6.0", npm_lifecycle_event: "build", QT_ACCESSIBILITY: "1", NO_AT_BRIDGE: "1", GDMSESSION: "ubuntu", LESSCLOSE: "/usr/bin/lesspipe %s %s", GTK_PATH_VSCODE_SNAP_ORIG: "", GTK_IM_MODULE_FILE_VSCODE_SNAP_ORIG: "", GJS_DEBUG_OUTPUT: "stderr", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", QT_IM_MODULE: "ibus", JAVA_HOME: "/home/quentin/.sdkman/candidates/java/current", GPG_TTY: "/dev/pts/2", PWD: "/home/quentin/git/recia-webcomponents/packages/tldraw", BERRY_BIN_FOLDER: "/tmp/xfs-b9c0de56", npm_execpath: "/tmp/xfs-b9c0de56/yarn", XDG_CONFIG_DIRS: "/etc/xdg/xdg-ubuntu:/etc/xdg", NVM_CD_FLAGS: "", DBUS_STARTER_ADDRESS: "unix:path=/run/user/1000/bus,guid=9983a870354527138352c54f66879b2d", XDG_DATA_DIRS: "/home/quentin/snap/code/163/.local/share:/home/quentin/snap/code/163:/snap/code/163/usr/share:/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop", VTE_VERSION: "6800", INIT_CWD: "/home/quentin/git/recia-webcomponents/packages/tldraw", NODE_ENV: "production", VITE_BASE_URI: "/", VITE_AXIOS_TIMEOUT: "10000" };
const ko = typeof process < "u" && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]", H9 = typeof window < "u" && typeof document < "u" && !ko;
let Lr;
const mF = () => {
  if (Lr === void 0)
    if (ko) {
      Lr = Fn();
      const e = process.argv;
      let t = null;
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        r[0] === "-" ? (t !== null && Lr.set(t, ""), t = r) : t !== null && (Lr.set(t, r), t = null);
      }
      t !== null && Lr.set(t, "");
    } else typeof location == "object" ? (Lr = Fn(), (location.search || "?").slice(1).split("&").forEach((e) => {
      if (e.length !== 0) {
        const [t, n] = e.split("=");
        Lr.set(`--${DE(t, "-")}`, n), Lr.set(`-${DE(t, "-")}`, n);
      }
    })) : Lr = Fn();
  return Lr;
}, km = (e) => mF().has(e), Dm = (e) => BE(ko ? j9[e.toUpperCase().replaceAll("-", "_")] : L9.getItem(e)), gF = (e) => km("--" + e) || Dm(e) !== null;
gF("production");
const OE = ko && pF(j9.FORCE_COLOR, ["true", "1", "2"]), vF = !km("--no-colors") && (!ko || process.stdout.isTTY || OE) && (!ko || km("--color") || OE || Dm("COLORTERM") !== null || (Dm("TERM") || "").includes("color")), U9 = (e) => new Uint8Array(e), EF = (e, t, n) => new Uint8Array(e, t, n), CF = (e) => new Uint8Array(e), yF = (e) => {
  let t = "";
  for (let n = 0; n < e.byteLength; n++)
    t += IT(e[n]);
  return btoa(t);
}, bF = (e) => Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("base64"), wF = (e) => {
  const t = atob(e), n = U9(t.length);
  for (let r = 0; r < t.length; r++)
    n[r] = t.charCodeAt(r);
  return n;
}, SF = (e) => {
  const t = Buffer.from(e, "base64");
  return EF(t.buffer, t.byteOffset, t.byteLength);
}, xF = H9 ? yF : bF, kF = H9 ? wF : SF, DF = (e) => {
  const t = U9(e.byteLength);
  return t.set(e), t;
};
class AF {
  /**
   * @param {L} left
   * @param {R} right
   */
  constructor(t, n) {
    this.left = t, this.right = n;
  }
}
const mi = (e, t) => new AF(e, t);
typeof DOMParser < "u" && new DOMParser();
const IF = (e) => bT(e, (t, n) => `${n}:${t};`).join(""), Fi = Symbol, V9 = Fi(), G9 = Fi(), PF = Fi(), _F = Fi(), TF = Fi(), W9 = Fi(), FF = Fi(), i4 = Fi(), BF = Fi(), MF = (e) => {
  var r;
  e.length === 1 && ((r = e[0]) == null ? void 0 : r.constructor) === Function && (e = /** @type {Array<string|Symbol|Object|number>} */
  /** @type {[function]} */
  e[0]());
  const t = [];
  let n = 0;
  for (; n < e.length; n++) {
    const i = e[n];
    i === void 0 || i.constructor === String || i.constructor === Number || i.constructor === Object && t.push(JSON.stringify(i));
  }
  return t;
}, RF = {
  [V9]: mi("font-weight", "bold"),
  [G9]: mi("font-weight", "normal"),
  [PF]: mi("color", "blue"),
  [TF]: mi("color", "green"),
  [_F]: mi("color", "grey"),
  [W9]: mi("color", "red"),
  [FF]: mi("color", "purple"),
  [i4]: mi("color", "orange"),
  // not well supported in chrome when debugging node with inspector - TODO: deprecate
  [BF]: mi("color", "black")
}, OF = (e) => {
  var s;
  e.length === 1 && ((s = e[0]) == null ? void 0 : s.constructor) === Function && (e = /** @type {Array<string|Symbol|Object|number>} */
  /** @type {[function]} */
  e[0]());
  const t = [], n = [], r = Fn();
  let i = [], o = 0;
  for (; o < e.length; o++) {
    const u = e[o], l = RF[u];
    if (l !== void 0)
      r.set(l.left, l.right);
    else {
      if (u === void 0)
        break;
      if (u.constructor === String || u.constructor === Number) {
        const f = IF(r);
        o > 0 || f.length > 0 ? (t.push("%c" + u), n.push(f)) : t.push(u);
      } else
        break;
    }
  }
  for (o > 0 && (i = n, i.unshift(t.join(""))); o < e.length; o++) {
    const u = e[o];
    u instanceof Symbol || i.push(u);
  }
  return i;
}, K9 = vF ? OF : MF, $F = (...e) => {
  console.log(...K9(e)), Y9.forEach((t) => t.print(e));
}, LF = (...e) => {
  console.warn(...K9(e)), e.unshift(i4), Y9.forEach((t) => t.print(e));
}, Y9 = wo(), X9 = (e) => ({
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return this;
  },
  // @ts-ignore
  next: e
}), NF = (e, t) => X9(() => {
  let n;
  do
    n = e.next();
  while (!n.done && !t(n.value));
  return n;
}), o1 = (e, t) => X9(() => {
  const { done: n, value: r } = e.next();
  return { done: n, value: n ? void 0 : t(r) };
});
class o4 {
  /**
   * @param {number} clock
   * @param {number} len
   */
  constructor(t, n) {
    this.clock = t, this.len = n;
  }
}
class Wa {
  constructor() {
    this.clients = /* @__PURE__ */ new Map();
  }
}
const _a = (e, t, n) => t.clients.forEach((r, i) => {
  const o = (
    /** @type {Array<GC|Item>} */
    e.doc.store.clients.get(i)
  );
  for (let s = 0; s < r.length; s++) {
    const u = r[s];
    ab(e, o, u.clock, u.len, n);
  }
}), zF = (e, t) => {
  let n = 0, r = e.length - 1;
  for (; n <= r; ) {
    const i = Di((n + r) / 2), o = e[i], s = o.clock;
    if (s <= t) {
      if (t < s + o.len)
        return i;
      n = i + 1;
    } else
      r = i - 1;
  }
  return null;
}, Gl = (e, t) => {
  const n = e.clients.get(t.client);
  return n !== void 0 && zF(n, t.clock) !== null;
}, s4 = (e) => {
  e.clients.forEach((t) => {
    t.sort((i, o) => i.clock - o.clock);
    let n, r;
    for (n = 1, r = 1; n < t.length; n++) {
      const i = t[r - 1], o = t[n];
      i.clock + i.len >= o.clock ? i.len = ws(i.len, o.clock + o.len - i.clock) : (r < n && (t[r] = o), r++);
    }
    t.length = r;
  });
}, Am = (e) => {
  const t = new Wa();
  for (let n = 0; n < e.length; n++)
    e[n].clients.forEach((r, i) => {
      if (!t.clients.has(i)) {
        const o = r.slice();
        for (let s = n + 1; s < e.length; s++)
          ST(o, e[s].clients.get(i) || []);
        t.clients.set(i, o);
      }
    });
  return s4(t), t;
}, Il = (e, t, n, r) => {
  ni(e.clients, t, () => (
    /** @type {Array<DeleteItem>} */
    []
  )).push(new o4(n, r));
}, jF = () => new Wa(), HF = (e) => {
  const t = jF();
  return e.clients.forEach((n, r) => {
    const i = [];
    for (let o = 0; o < n.length; o++) {
      const s = n[o];
      if (s.deleted) {
        const u = s.id.clock;
        let l = s.length;
        if (o + 1 < n.length)
          for (let f = n[o + 1]; o + 1 < n.length && f.deleted; f = n[++o + 1])
            l += f.length;
        i.push(new o4(u, l));
      }
    }
    i.length > 0 && t.clients.set(r, i);
  }), t;
}, Ka = (e, t) => {
  Me(e.restEncoder, t.clients.size), ki(t.clients.entries()).sort((n, r) => r[0] - n[0]).forEach(([n, r]) => {
    e.resetDsCurVal(), Me(e.restEncoder, n);
    const i = r.length;
    Me(e.restEncoder, i);
    for (let o = 0; o < i; o++) {
      const s = r[o];
      e.writeDsClock(s.clock), e.writeDsLen(s.len);
    }
  });
}, a4 = (e) => {
  const t = new Wa(), n = He(e.restDecoder);
  for (let r = 0; r < n; r++) {
    e.resetDsCurVal();
    const i = He(e.restDecoder), o = He(e.restDecoder);
    if (o > 0) {
      const s = ni(t.clients, i, () => (
        /** @type {Array<DeleteItem>} */
        []
      ));
      for (let u = 0; u < o; u++)
        s.push(new o4(e.readDsClock(), e.readDsLen()));
    }
  }
  return t;
}, $E = (e, t, n) => {
  const r = new Wa(), i = He(e.restDecoder);
  for (let o = 0; o < i; o++) {
    e.resetDsCurVal();
    const s = He(e.restDecoder), u = He(e.restDecoder), l = n.clients.get(s) || [], f = Kt(n, s);
    for (let h = 0; h < u; h++) {
      const p = e.readDsClock(), g = p + e.readDsLen();
      if (p < f) {
        f < g && Il(r, s, f, g - f);
        let v = Xr(l, p), E = l[v];
        for (!E.deleted && E.id.clock < p && (l.splice(v + 1, 0, Md(t, E, p - E.id.clock)), v++); v < l.length && (E = l[v++], E.id.clock < g); )
          E.deleted || (g < E.id.clock + E.length && l.splice(v, 0, Md(t, E, g - E.id.clock)), E.delete(t));
      } else
        Il(r, s, p, g - p);
    }
  }
  if (r.clients.size > 0) {
    const o = new ps();
    return Me(o.restEncoder, 0), Ka(o, r), o.toUint8Array();
  }
  return null;
}, Z9 = O9;
class Ya extends _9 {
  /**
   * @param {DocOpts} opts configuration
   */
  constructor({ guid: t = nF(), collectionid: n = null, gc: r = !0, gcFilter: i = () => !0, meta: o = null, autoLoad: s = !1, shouldLoad: u = !0 } = {}) {
    super(), this.gc = r, this.gcFilter = i, this.clientID = Z9(), this.guid = t, this.collectionid = n, this.share = /* @__PURE__ */ new Map(), this.store = new ob(), this._transaction = null, this._transactionCleanups = [], this.subdocs = /* @__PURE__ */ new Set(), this._item = null, this.shouldLoad = u, this.autoLoad = s, this.meta = o, this.isLoaded = !1, this.isSynced = !1, this.whenLoaded = FE((f) => {
      this.on("load", () => {
        this.isLoaded = !0, f(this);
      });
    });
    const l = () => FE((f) => {
      const h = (p) => {
        (p === void 0 || p === !0) && (this.off("sync", h), f());
      };
      this.on("sync", h);
    });
    this.on("sync", (f) => {
      f === !1 && this.isSynced && (this.whenSynced = l()), this.isSynced = f === void 0 || f === !0, this.isSynced && !this.isLoaded && this.emit("load", [this]);
    }), this.whenSynced = l();
  }
  /**
   * Notify the parent document that you request to load data into this subdocument (if it is a subdocument).
   *
   * `load()` might be used in the future to request any provider to load the most current data.
   *
   * It is safe to call `load()` multiple times.
   */
  load() {
    const t = this._item;
    t !== null && !this.shouldLoad && ct(
      /** @type {any} */
      t.parent.doc,
      (n) => {
        n.subdocsLoaded.add(this);
      },
      null,
      !0
    ), this.shouldLoad = !0;
  }
  getSubdocs() {
    return this.subdocs;
  }
  getSubdocGuids() {
    return new Set(ki(this.subdocs).map((t) => t.guid));
  }
  /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @template T
   * @param {function(Transaction):T} f The function that should be executed as a transaction
   * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
   * @return T
   *
   * @public
   */
  transact(t, n = null) {
    return ct(this, t, n);
  }
  /**
   * Define a shared data type.
   *
   * Multiple calls of `ydoc.get(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `ydoc.get(name, Y.Array) === ydoc.get(name, Y.Array)`
   *
   * After this method is called, the type is also available on `ydoc.share.get(name)`.
   *
   * *Best Practices:*
   * Define all types right after the Y.Doc instance is created and store them in a separate object.
   * Also use the typed methods `getText(name)`, `getArray(name)`, ..
   *
   * @template {typeof AbstractType<any>} Type
   * @example
   *   const ydoc = new Y.Doc(..)
   *   const appState = {
   *     document: ydoc.getText('document')
   *     comments: ydoc.getArray('comments')
   *   }
   *
   * @param {string} name
   * @param {Type} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
   * @return {InstanceType<Type>} The created type. Constructed with TypeConstructor
   *
   * @public
   */
  get(t, n = (
    /** @type {any} */
    an
  )) {
    const r = ni(this.share, t, () => {
      const o = new n();
      return o._integrate(this, null), o;
    }), i = r.constructor;
    if (n !== an && i !== n)
      if (i === an) {
        const o = new n();
        o._map = r._map, r._map.forEach(
          /** @param {Item?} n */
          (s) => {
            for (; s !== null; s = s.left)
              s.parent = o;
          }
        ), o._start = r._start;
        for (let s = o._start; s !== null; s = s.right)
          s.parent = o;
        return o._length = r._length, this.share.set(t, o), o._integrate(this, null), /** @type {InstanceType<Type>} */
        o;
      } else
        throw new Error(`Type with the name ${t} has already been defined with a different constructor`);
    return (
      /** @type {InstanceType<Type>} */
      r
    );
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YArray<T>}
   *
   * @public
   */
  getArray(t = "") {
    return (
      /** @type {YArray<T>} */
      this.get(t, ya)
    );
  }
  /**
   * @param {string} [name]
   * @return {YText}
   *
   * @public
   */
  getText(t = "") {
    return this.get(t, Ba);
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YMap<T>}
   *
   * @public
   */
  getMap(t = "") {
    return (
      /** @type {YMap<T>} */
      this.get(t, Fa)
    );
  }
  /**
   * @param {string} [name]
   * @return {YXmlElement}
   *
   * @public
   */
  getXmlElement(t = "") {
    return (
      /** @type {YXmlElement<{[key:string]:string}>} */
      this.get(t, Ma)
    );
  }
  /**
   * @param {string} [name]
   * @return {YXmlFragment}
   *
   * @public
   */
  getXmlFragment(t = "") {
    return this.get(t, ms);
  }
  /**
   * Converts the entire document into a js object, recursively traversing each yjs type
   * Doesn't log types that have not been defined (using ydoc.getType(..)).
   *
   * @deprecated Do not use this method and rather call toJSON directly on the shared types.
   *
   * @return {Object<string, any>}
   */
  toJSON() {
    const t = {};
    return this.share.forEach((n, r) => {
      t[r] = n.toJSON();
    }), t;
  }
  /**
   * Emit `destroy` event and unregister all event handlers.
   */
  destroy() {
    ki(this.subdocs).forEach((n) => n.destroy());
    const t = this._item;
    if (t !== null) {
      this._item = null;
      const n = (
        /** @type {ContentDoc} */
        t.content
      );
      n.doc = new Ya({ guid: this.guid, ...n.opts, shouldLoad: !1 }), n.doc._item = t, ct(
        /** @type {any} */
        t.parent.doc,
        (r) => {
          const i = n.doc;
          t.deleted || r.subdocsAdded.add(i), r.subdocsRemoved.add(this);
        },
        null,
        !0
      );
    }
    this.emit("destroyed", [!0]), this.emit("destroy", [this]), super.destroy();
  }
}
class q9 {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(t) {
    this.restDecoder = t;
  }
  resetDsCurVal() {
  }
  /**
   * @return {number}
   */
  readDsClock() {
    return He(this.restDecoder);
  }
  /**
   * @return {number}
   */
  readDsLen() {
    return He(this.restDecoder);
  }
}
class J9 extends q9 {
  /**
   * @return {ID}
   */
  readLeftID() {
    return Ge(He(this.restDecoder), He(this.restDecoder));
  }
  /**
   * @return {ID}
   */
  readRightID() {
    return Ge(He(this.restDecoder), He(this.restDecoder));
  }
  /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */
  readClient() {
    return He(this.restDecoder);
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readInfo() {
    return Pa(this.restDecoder);
  }
  /**
   * @return {string}
   */
  readString() {
    return vo(this.restDecoder);
  }
  /**
   * @return {boolean} isKey
   */
  readParentInfo() {
    return He(this.restDecoder) === 1;
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readTypeRef() {
    return He(this.restDecoder);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number} len
   */
  readLen() {
    return He(this.restDecoder);
  }
  /**
   * @return {any}
   */
  readAny() {
    return Al(this.restDecoder);
  }
  /**
   * @return {Uint8Array}
   */
  readBuf() {
    return DF(fn(this.restDecoder));
  }
  /**
   * Legacy implementation uses JSON parse. We use any-decoding in v2.
   *
   * @return {any}
   */
  readJSON() {
    return JSON.parse(vo(this.restDecoder));
  }
  /**
   * @return {string}
   */
  readKey() {
    return vo(this.restDecoder);
  }
}
class UF {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(t) {
    this.dsCurrVal = 0, this.restDecoder = t;
  }
  resetDsCurVal() {
    this.dsCurrVal = 0;
  }
  /**
   * @return {number}
   */
  readDsClock() {
    return this.dsCurrVal += He(this.restDecoder), this.dsCurrVal;
  }
  /**
   * @return {number}
   */
  readDsLen() {
    const t = He(this.restDecoder) + 1;
    return this.dsCurrVal += t, t;
  }
}
class Ta extends UF {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(t) {
    super(t), this.keys = [], He(t), this.keyClockDecoder = new i1(fn(t)), this.clientDecoder = new cd(fn(t)), this.leftClockDecoder = new i1(fn(t)), this.rightClockDecoder = new i1(fn(t)), this.infoDecoder = new TE(fn(t), Pa), this.stringDecoder = new QT(fn(t)), this.parentInfoDecoder = new TE(fn(t), Pa), this.typeRefDecoder = new cd(fn(t)), this.lenDecoder = new cd(fn(t));
  }
  /**
   * @return {ID}
   */
  readLeftID() {
    return new Ca(this.clientDecoder.read(), this.leftClockDecoder.read());
  }
  /**
   * @return {ID}
   */
  readRightID() {
    return new Ca(this.clientDecoder.read(), this.rightClockDecoder.read());
  }
  /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */
  readClient() {
    return this.clientDecoder.read();
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readInfo() {
    return (
      /** @type {number} */
      this.infoDecoder.read()
    );
  }
  /**
   * @return {string}
   */
  readString() {
    return this.stringDecoder.read();
  }
  /**
   * @return {boolean}
   */
  readParentInfo() {
    return this.parentInfoDecoder.read() === 1;
  }
  /**
   * @return {number} An unsigned 8-bit integer
   */
  readTypeRef() {
    return this.typeRefDecoder.read();
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number}
   */
  readLen() {
    return this.lenDecoder.read();
  }
  /**
   * @return {any}
   */
  readAny() {
    return Al(this.restDecoder);
  }
  /**
   * @return {Uint8Array}
   */
  readBuf() {
    return fn(this.restDecoder);
  }
  /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @return {any}
   */
  readJSON() {
    return Al(this.restDecoder);
  }
  /**
   * @return {string}
   */
  readKey() {
    const t = this.keyClockDecoder.read();
    if (t < this.keys.length)
      return this.keys[t];
    {
      const n = this.stringDecoder.read();
      return this.keys.push(n), n;
    }
  }
}
class Q9 {
  constructor() {
    this.restEncoder = hn();
  }
  toUint8Array() {
    return It(this.restEncoder);
  }
  resetDsCurVal() {
  }
  /**
   * @param {number} clock
   */
  writeDsClock(t) {
    Me(this.restEncoder, t);
  }
  /**
   * @param {number} len
   */
  writeDsLen(t) {
    Me(this.restEncoder, t);
  }
}
class Wl extends Q9 {
  /**
   * @param {ID} id
   */
  writeLeftID(t) {
    Me(this.restEncoder, t.client), Me(this.restEncoder, t.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(t) {
    Me(this.restEncoder, t.client), Me(this.restEncoder, t.clock);
  }
  /**
   * Use writeClient and writeClock instead of writeID if possible.
   * @param {number} client
   */
  writeClient(t) {
    Me(this.restEncoder, t);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(t) {
    Sm(this.restEncoder, t);
  }
  /**
   * @param {string} s
   */
  writeString(t) {
    us(this.restEncoder, t);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(t) {
    Me(this.restEncoder, t ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(t) {
    Me(this.restEncoder, t);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(t) {
    Me(this.restEncoder, t);
  }
  /**
   * @param {any} any
   */
  writeAny(t) {
    Dl(this.restEncoder, t);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(t) {
    Ot(this.restEncoder, t);
  }
  /**
   * @param {any} embed
   */
  writeJSON(t) {
    us(this.restEncoder, JSON.stringify(t));
  }
  /**
   * @param {string} key
   */
  writeKey(t) {
    us(this.restEncoder, t);
  }
}
class eb {
  constructor() {
    this.restEncoder = hn(), this.dsCurrVal = 0;
  }
  toUint8Array() {
    return It(this.restEncoder);
  }
  resetDsCurVal() {
    this.dsCurrVal = 0;
  }
  /**
   * @param {number} clock
   */
  writeDsClock(t) {
    const n = t - this.dsCurrVal;
    this.dsCurrVal = t, Me(this.restEncoder, n);
  }
  /**
   * @param {number} len
   */
  writeDsLen(t) {
    t === 0 && Yr(), Me(this.restEncoder, t - 1), this.dsCurrVal += t;
  }
}
class ps extends eb {
  constructor() {
    super(), this.keyMap = /* @__PURE__ */ new Map(), this.keyClock = 0, this.keyClockEncoder = new r1(), this.clientEncoder = new ld(), this.leftClockEncoder = new r1(), this.rightClockEncoder = new r1(), this.infoEncoder = new IE(Sm), this.stringEncoder = new VT(), this.parentInfoEncoder = new IE(Sm), this.typeRefEncoder = new ld(), this.lenEncoder = new ld();
  }
  toUint8Array() {
    const t = hn();
    return Me(t, 0), Ot(t, this.keyClockEncoder.toUint8Array()), Ot(t, this.clientEncoder.toUint8Array()), Ot(t, this.leftClockEncoder.toUint8Array()), Ot(t, this.rightClockEncoder.toUint8Array()), Ot(t, It(this.infoEncoder)), Ot(t, this.stringEncoder.toUint8Array()), Ot(t, It(this.parentInfoEncoder)), Ot(t, this.typeRefEncoder.toUint8Array()), Ot(t, this.lenEncoder.toUint8Array()), hf(t, It(this.restEncoder)), It(t);
  }
  /**
   * @param {ID} id
   */
  writeLeftID(t) {
    this.clientEncoder.write(t.client), this.leftClockEncoder.write(t.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(t) {
    this.clientEncoder.write(t.client), this.rightClockEncoder.write(t.clock);
  }
  /**
   * @param {number} client
   */
  writeClient(t) {
    this.clientEncoder.write(t);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(t) {
    this.infoEncoder.write(t);
  }
  /**
   * @param {string} s
   */
  writeString(t) {
    this.stringEncoder.write(t);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(t) {
    this.parentInfoEncoder.write(t ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(t) {
    this.typeRefEncoder.write(t);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(t) {
    this.lenEncoder.write(t);
  }
  /**
   * @param {any} any
   */
  writeAny(t) {
    Dl(this.restEncoder, t);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(t) {
    Ot(this.restEncoder, t);
  }
  /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @param {any} embed
   */
  writeJSON(t) {
    Dl(this.restEncoder, t);
  }
  /**
   * Property keys are often reused. For example, in y-prosemirror the key `bold` might
   * occur very often. For a 3d application, the key `position` might occur very often.
   *
   * We cache these keys in a Map and refer to them via a unique number.
   *
   * @param {string} key
   */
  writeKey(t) {
    const n = this.keyMap.get(t);
    n === void 0 ? (this.keyClockEncoder.write(this.keyClock++), this.stringEncoder.write(t)) : this.keyClockEncoder.write(n);
  }
}
const VF = (e, t, n, r) => {
  r = ws(r, t[0].id.clock);
  const i = Xr(t, r);
  Me(e.restEncoder, t.length - i), e.writeClient(n), Me(e.restEncoder, r);
  const o = t[i];
  o.write(e, r - o.id.clock);
  for (let s = i + 1; s < t.length; s++)
    t[s].write(e, 0);
}, u4 = (e, t, n) => {
  const r = /* @__PURE__ */ new Map();
  n.forEach((i, o) => {
    Kt(t, o) > i && r.set(o, i);
  }), mf(t).forEach((i, o) => {
    n.has(o) || r.set(o, 0);
  }), Me(e.restEncoder, r.size), ki(r.entries()).sort((i, o) => o[0] - i[0]).forEach(([i, o]) => {
    VF(
      e,
      /** @type {Array<GC|Item>} */
      t.clients.get(i),
      i,
      o
    );
  });
}, GF = (e, t) => {
  const n = Fn(), r = He(e.restDecoder);
  for (let i = 0; i < r; i++) {
    const o = He(e.restDecoder), s = new Array(o), u = e.readClient();
    let l = He(e.restDecoder);
    n.set(u, { i: 0, refs: s });
    for (let f = 0; f < o; f++) {
      const h = e.readInfo();
      switch (ff & h) {
        case 0: {
          const p = e.readLen();
          s[f] = new or(Ge(u, l), p), l += p;
          break;
        }
        case 10: {
          const p = He(e.restDecoder);
          s[f] = new sr(Ge(u, l), p), l += p;
          break;
        }
        default: {
          const p = (h & (Ei | Gn)) === 0, g = new Ct(
            Ge(u, l),
            null,
            // left
            (h & Gn) === Gn ? e.readLeftID() : null,
            // origin
            null,
            // right
            (h & Ei) === Ei ? e.readRightID() : null,
            // right origin
            p ? e.readParentInfo() ? t.get(e.readString()) : e.readLeftID() : null,
            // parent
            p && (h & xl) === xl ? e.readString() : null,
            // parentSub
            Ab(e, h)
            // item content
          );
          s[f] = g, l += g.length;
        }
      }
    }
  }
  return n;
}, WF = (e, t, n) => {
  const r = [];
  let i = ki(n.keys()).sort((v, E) => v - E);
  if (i.length === 0)
    return null;
  const o = () => {
    if (i.length === 0)
      return null;
    let v = (
      /** @type {{i:number,refs:Array<GC|Item>}} */
      n.get(i[i.length - 1])
    );
    for (; v.refs.length === v.i; )
      if (i.pop(), i.length > 0)
        v = /** @type {{i:number,refs:Array<GC|Item>}} */
        n.get(i[i.length - 1]);
      else
        return null;
    return v;
  };
  let s = o();
  if (s === null)
    return null;
  const u = new ob(), l = /* @__PURE__ */ new Map(), f = (v, E) => {
    const y = l.get(v);
    (y == null || y > E) && l.set(v, E);
  };
  let h = (
    /** @type {any} */
    s.refs[
      /** @type {any} */
      s.i++
    ]
  );
  const p = /* @__PURE__ */ new Map(), g = () => {
    for (const v of r) {
      const E = v.id.client, y = n.get(E);
      y ? (y.i--, u.clients.set(E, y.refs.slice(y.i)), n.delete(E), y.i = 0, y.refs = []) : u.clients.set(E, [v]), i = i.filter((b) => b !== E);
    }
    r.length = 0;
  };
  for (; ; ) {
    if (h.constructor !== sr) {
      const E = ni(p, h.id.client, () => Kt(t, h.id.client)) - h.id.clock;
      if (E < 0)
        r.push(h), f(h.id.client, h.id.clock - 1), g();
      else {
        const y = h.getMissing(e, t);
        if (y !== null) {
          r.push(h);
          const b = n.get(
            /** @type {number} */
            y
          ) || { refs: [], i: 0 };
          if (b.refs.length === b.i)
            f(
              /** @type {number} */
              y,
              Kt(t, y)
            ), g();
          else {
            h = b.refs[b.i++];
            continue;
          }
        } else (E === 0 || E < h.length) && (h.integrate(e, E), p.set(h.id.client, h.id.clock + h.length));
      }
    }
    if (r.length > 0)
      h = /** @type {GC|Item} */
      r.pop();
    else if (s !== null && s.i < s.refs.length)
      h = /** @type {GC|Item} */
      s.refs[s.i++];
    else {
      if (s = o(), s === null)
        break;
      h = /** @type {GC|Item} */
      s.refs[s.i++];
    }
  }
  if (u.clients.size > 0) {
    const v = new ps();
    return u4(v, u, /* @__PURE__ */ new Map()), Me(v.restEncoder, 0), { missing: l, update: v.toUint8Array() };
  }
  return null;
}, KF = (e, t) => u4(e, t.doc.store, t.beforeState), YF = (e, t, n, r = new Ta(e)) => ct(t, (i) => {
  i.local = !1;
  let o = !1;
  const s = i.doc, u = s.store, l = GF(r, s), f = WF(i, u, l), h = u.pendingStructs;
  if (h) {
    for (const [g, v] of h.missing)
      if (v < Kt(u, g)) {
        o = !0;
        break;
      }
    if (f) {
      for (const [g, v] of f.missing) {
        const E = h.missing.get(g);
        (E == null || E > v) && h.missing.set(g, v);
      }
      h.update = Id([h.update, f.update]);
    }
  } else
    u.pendingStructs = f;
  const p = $E(r, i, u);
  if (u.pendingDs) {
    const g = new Ta(To(u.pendingDs));
    He(g.restDecoder);
    const v = $E(g, i, u);
    p && v ? u.pendingDs = Id([p, v]) : u.pendingDs = p || v;
  } else
    u.pendingDs = p;
  if (o) {
    const g = (
      /** @type {{update: Uint8Array}} */
      u.pendingStructs.update
    );
    u.pendingStructs = null, tb(i.doc, g);
  }
}, n, !1), tb = (e, t, n, r = Ta) => {
  const i = To(t);
  YF(i, e, n, new r(i));
}, XF = (e, t, n) => tb(e, t, n, J9), ZF = (e, t, n = /* @__PURE__ */ new Map()) => {
  u4(e, t.store, n), Ka(e, HF(t.store));
}, qF = (e, t = new Uint8Array([0]), n = new ps()) => {
  const r = nb(t);
  ZF(n, e, r);
  const i = [n.toUint8Array()];
  if (e.store.pendingDs && i.push(e.store.pendingDs), e.store.pendingStructs && i.push(mB(e.store.pendingStructs.update, t)), i.length > 1) {
    if (n.constructor === Wl)
      return hB(i.map((o, s) => s === 0 ? o : vB(o)));
    if (n.constructor === ps)
      return Id(i);
  }
  return i[0];
}, JF = (e, t) => qF(e, t, new Wl()), QF = (e) => {
  const t = /* @__PURE__ */ new Map(), n = He(e.restDecoder);
  for (let r = 0; r < n; r++) {
    const i = He(e.restDecoder), o = He(e.restDecoder);
    t.set(i, o);
  }
  return t;
}, nb = (e) => QF(new q9(To(e))), rb = (e, t) => (Me(e.restEncoder, t.size), ki(t.entries()).sort((n, r) => r[0] - n[0]).forEach(([n, r]) => {
  Me(e.restEncoder, n), Me(e.restEncoder, r);
}), e), eB = (e, t) => rb(e, mf(t.store)), tB = (e, t = new eb()) => (e instanceof Map ? rb(t, e) : eB(t, e), t.toUint8Array()), nB = (e) => tB(e, new Q9());
class rB {
  constructor() {
    this.l = [];
  }
}
const LE = () => new rB(), NE = (e, t) => e.l.push(t), zE = (e, t) => {
  const n = e.l, r = n.length;
  e.l = n.filter((i) => t !== i), r === e.l.length && console.error("[yjs] Tried to remove event handler that doesn't exist.");
}, ib = (e, t, n) => r4(e.l, [t, n]);
let Ca = class {
  /**
   * @param {number} client client id
   * @param {number} clock unique per client id, continuous number
   */
  constructor(t, n) {
    this.client = t, this.clock = n;
  }
};
const D0 = (e, t) => e === t || e !== null && t !== null && e.client === t.client && e.clock === t.clock, Ge = (e, t) => new Ca(e, t), iB = (e) => {
  for (const [t, n] of e.doc.share.entries())
    if (n === e)
      return t;
  throw Yr();
}, Ad = (e, t) => {
  for (; t !== null; ) {
    if (t.parent === e)
      return !0;
    t = /** @type {AbstractType<any>} */
    t.parent._item;
  }
  return !1;
}, ca = (e, t) => t === void 0 ? !e.deleted : t.sv.has(e.id.client) && (t.sv.get(e.id.client) || 0) > e.id.clock && !Gl(t.ds, e.id), Im = (e, t) => {
  const n = ni(e.meta, Im, wo), r = e.doc.store;
  n.has(t) || (t.sv.forEach((i, o) => {
    i < Kt(r, o) && _n(e, Ge(o, i));
  }), _a(e, t.ds, (i) => {
  }), n.add(t));
};
class ob {
  constructor() {
    this.clients = /* @__PURE__ */ new Map(), this.pendingStructs = null, this.pendingDs = null;
  }
}
const mf = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.clients.forEach((n, r) => {
    const i = n[n.length - 1];
    t.set(r, i.id.clock + i.length);
  }), t;
}, Kt = (e, t) => {
  const n = e.clients.get(t);
  if (n === void 0)
    return 0;
  const r = n[n.length - 1];
  return r.id.clock + r.length;
}, sb = (e, t) => {
  let n = e.clients.get(t.id.client);
  if (n === void 0)
    n = [], e.clients.set(t.id.client, n);
  else {
    const r = n[n.length - 1];
    if (r.id.clock + r.length !== t.id.clock)
      throw Yr();
  }
  n.push(t);
}, Xr = (e, t) => {
  let n = 0, r = e.length - 1, i = e[r], o = i.id.clock;
  if (o === t)
    return r;
  let s = Di(t / (o + i.length - 1) * r);
  for (; n <= r; ) {
    if (i = e[s], o = i.id.clock, o <= t) {
      if (t < o + i.length)
        return s;
      n = s + 1;
    } else
      r = s - 1;
    s = Di((n + r) / 2);
  }
  throw Yr();
}, oB = (e, t) => {
  const n = e.clients.get(t.client);
  return n[Xr(n, t.clock)];
}, dd = (
  /** @type {function(StructStore,ID):Item} */
  oB
), Pm = (e, t, n) => {
  const r = Xr(t, n), i = t[r];
  return i.id.clock < n && i instanceof Ct ? (t.splice(r + 1, 0, Md(e, i, n - i.id.clock)), r + 1) : r;
}, _n = (e, t) => {
  const n = (
    /** @type {Array<Item>} */
    e.doc.store.clients.get(t.client)
  );
  return n[Pm(e, n, t.clock)];
}, jE = (e, t, n) => {
  const r = t.clients.get(n.client), i = Xr(r, n.clock), o = r[i];
  return n.clock !== o.id.clock + o.length - 1 && o.constructor !== or && r.splice(i + 1, 0, Md(e, o, n.clock - o.id.clock + 1)), o;
}, sB = (e, t, n) => {
  const r = (
    /** @type {Array<GC|Item>} */
    e.clients.get(t.id.client)
  );
  r[Xr(r, t.id.clock)] = n;
}, ab = (e, t, n, r, i) => {
  if (r === 0)
    return;
  const o = n + r;
  let s = Pm(e, t, n), u;
  do
    u = t[s++], o < u.id.clock + u.length && Pm(e, t, o), i(u);
  while (s < t.length && t[s].id.clock < o);
};
class aB {
  /**
   * @param {Doc} doc
   * @param {any} origin
   * @param {boolean} local
   */
  constructor(t, n, r) {
    this.doc = t, this.deleteSet = new Wa(), this.beforeState = mf(t.store), this.afterState = /* @__PURE__ */ new Map(), this.changed = /* @__PURE__ */ new Map(), this.changedParentTypes = /* @__PURE__ */ new Map(), this._mergeStructs = [], this.origin = n, this.meta = /* @__PURE__ */ new Map(), this.local = r, this.subdocsAdded = /* @__PURE__ */ new Set(), this.subdocsRemoved = /* @__PURE__ */ new Set(), this.subdocsLoaded = /* @__PURE__ */ new Set(), this._needFormattingCleanup = !1;
  }
}
const HE = (e, t) => t.deleteSet.clients.size === 0 && !wT(t.afterState, (n, r) => t.beforeState.get(r) !== n) ? !1 : (s4(t.deleteSet), KF(e, t), Ka(e, t.deleteSet), !0), UE = (e, t, n) => {
  const r = t._item;
  (r === null || r.id.clock < (e.beforeState.get(r.id.client) || 0) && !r.deleted) && ni(e.changed, t, wo).add(n);
}, fd = (e, t) => {
  let n = e[t], r = e[t - 1], i = t;
  for (; i > 0; n = r, r = e[--i - 1]) {
    if (r.deleted === n.deleted && r.constructor === n.constructor && r.mergeWith(n)) {
      n instanceof Ct && n.parentSub !== null && /** @type {AbstractType<any>} */
      n.parent._map.get(n.parentSub) === n && n.parent._map.set(
        n.parentSub,
        /** @type {Item} */
        r
      );
      continue;
    }
    break;
  }
  const o = t - i;
  return o && e.splice(t + 1 - o, o), o;
}, uB = (e, t, n) => {
  for (const [r, i] of e.clients.entries()) {
    const o = (
      /** @type {Array<GC|Item>} */
      t.clients.get(r)
    );
    for (let s = i.length - 1; s >= 0; s--) {
      const u = i[s], l = u.clock + u.len;
      for (let f = Xr(o, u.clock), h = o[f]; f < o.length && h.id.clock < l; h = o[++f]) {
        const p = o[f];
        if (u.clock + u.len <= p.id.clock)
          break;
        p instanceof Ct && p.deleted && !p.keep && n(p) && p.gc(t, !1);
      }
    }
  }
}, lB = (e, t) => {
  e.clients.forEach((n, r) => {
    const i = (
      /** @type {Array<GC|Item>} */
      t.clients.get(r)
    );
    for (let o = n.length - 1; o >= 0; o--) {
      const s = n[o], u = Zg(i.length - 1, 1 + Xr(i, s.clock + s.len - 1));
      for (let l = u, f = i[l]; l > 0 && f.id.clock >= s.clock; f = i[l])
        l -= 1 + fd(i, l);
    }
  });
}, ub = (e, t) => {
  if (t < e.length) {
    const n = e[t], r = n.doc, i = r.store, o = n.deleteSet, s = n._mergeStructs;
    try {
      s4(o), n.afterState = mf(n.doc.store), r.emit("beforeObserverCalls", [n, r]);
      const u = [];
      n.changed.forEach(
        (l, f) => u.push(() => {
          (f._item === null || !f._item.deleted) && f._callObserver(n, l);
        })
      ), u.push(() => {
        n.changedParentTypes.forEach((l, f) => {
          f._dEH.l.length > 0 && (f._item === null || !f._item.deleted) && (l = l.filter(
            (h) => h.target._item === null || !h.target._item.deleted
          ), l.forEach((h) => {
            h.currentTarget = f, h._path = null;
          }), l.sort((h, p) => h.path.length - p.path.length), ib(f._dEH, l, n));
        });
      }), u.push(() => r.emit("afterTransaction", [n, r])), r4(u, []), n._needFormattingCleanup && TB(n);
    } finally {
      r.gc && uB(o, i, r.gcFilter), lB(o, i), n.afterState.forEach((h, p) => {
        const g = n.beforeState.get(p) || 0;
        if (g !== h) {
          const v = (
            /** @type {Array<GC|Item>} */
            i.clients.get(p)
          ), E = ws(Xr(v, g), 1);
          for (let y = v.length - 1; y >= E; )
            y -= 1 + fd(v, y);
        }
      });
      for (let h = s.length - 1; h >= 0; h--) {
        const { client: p, clock: g } = s[h].id, v = (
          /** @type {Array<GC|Item>} */
          i.clients.get(p)
        ), E = Xr(v, g);
        E + 1 < v.length && fd(v, E + 1) > 1 || E > 0 && fd(v, E);
      }
      if (!n.local && n.afterState.get(r.clientID) !== n.beforeState.get(r.clientID) && ($F(i4, V9, "[yjs] ", G9, W9, "Changed the client-id because another client seems to be using it."), r.clientID = Z9()), r.emit("afterTransactionCleanup", [n, r]), r._observers.has("update")) {
        const h = new Wl();
        HE(h, n) && r.emit("update", [h.toUint8Array(), n.origin, r, n]);
      }
      if (r._observers.has("updateV2")) {
        const h = new ps();
        HE(h, n) && r.emit("updateV2", [h.toUint8Array(), n.origin, r, n]);
      }
      const { subdocsAdded: u, subdocsLoaded: l, subdocsRemoved: f } = n;
      (u.size > 0 || f.size > 0 || l.size > 0) && (u.forEach((h) => {
        h.clientID = r.clientID, h.collectionid == null && (h.collectionid = r.collectionid), r.subdocs.add(h);
      }), f.forEach((h) => r.subdocs.delete(h)), r.emit("subdocs", [{ loaded: l, added: u, removed: f }, r, n]), f.forEach((h) => h.destroy())), e.length <= t + 1 ? (r._transactionCleanups = [], r.emit("afterAllTransactions", [r, e])) : ub(e, t + 1);
    }
  }
}, ct = (e, t, n = null, r = !0) => {
  const i = e._transactionCleanups;
  let o = !1, s = null;
  e._transaction === null && (o = !0, e._transaction = new aB(e, n, r), i.push(e._transaction), i.length === 1 && e.emit("beforeAllTransactions", [e]), e.emit("beforeTransaction", [e._transaction, e]));
  try {
    s = t(e._transaction);
  } finally {
    if (o) {
      const u = e._transaction === i[0];
      e._transaction = null, u && ub(i, 0);
    }
  }
  return s;
};
class cB {
  /**
   * @param {DeleteSet} deletions
   * @param {DeleteSet} insertions
   */
  constructor(t, n) {
    this.insertions = n, this.deletions = t, this.meta = /* @__PURE__ */ new Map();
  }
}
const VE = (e, t, n) => {
  _a(e, n.deletions, (r) => {
    r instanceof Ct && t.scope.some((i) => Ad(i, r)) && g4(r, !1);
  });
}, GE = (e, t, n) => {
  let r = null;
  const i = e.doc, o = e.scope;
  ct(i, (u) => {
    for (; t.length > 0 && e.currStackItem === null; ) {
      const l = i.store, f = (
        /** @type {StackItem} */
        t.pop()
      ), h = /* @__PURE__ */ new Set(), p = [];
      let g = !1;
      _a(u, f.insertions, (v) => {
        if (v instanceof Ct) {
          if (v.redone !== null) {
            let { item: E, diff: y } = rM(l, v.id);
            y > 0 && (E = _n(u, Ge(E.id.client, E.id.clock + y))), v = E;
          }
          !v.deleted && o.some((E) => Ad(
            E,
            /** @type {Item} */
            v
          )) && p.push(v);
        }
      }), _a(u, f.deletions, (v) => {
        v instanceof Ct && o.some((E) => Ad(E, v)) && // Never redo structs in stackItem.insertions because they were created and deleted in the same capture interval.
        !Gl(f.insertions, v.id) && h.add(v);
      }), h.forEach((v) => {
        g = Db(u, v, h, f.insertions, e.ignoreRemoteMapChanges, e) !== null || g;
      });
      for (let v = p.length - 1; v >= 0; v--) {
        const E = p[v];
        e.deleteFilter(E) && (E.delete(u), g = !0);
      }
      e.currStackItem = g ? f : null;
    }
    u.changed.forEach((l, f) => {
      l.has(null) && f._searchMarker && (f._searchMarker.length = 0);
    }), r = u;
  }, e);
  const s = e.currStackItem;
  if (s != null) {
    const u = r.changedParentTypes;
    e.emit("stack-item-popped", [{ stackItem: s, type: n, changedParentTypes: u, origin: e }, e]), e.currStackItem = null;
  }
  return s;
};
class dB extends _9 {
  /**
   * @param {AbstractType<any>|Array<AbstractType<any>>} typeScope Accepts either a single type, or an array of types
   * @param {UndoManagerOptions} options
   */
  constructor(t, {
    captureTimeout: n = 500,
    captureTransaction: r = (l) => !0,
    deleteFilter: i = () => !0,
    trackedOrigins: o = /* @__PURE__ */ new Set([null]),
    ignoreRemoteMapChanges: s = !1,
    doc: u = (
      /** @type {Doc} */
      bm(t) ? t[0].doc : t.doc
    )
  } = {}) {
    super(), this.scope = [], this.doc = u, this.addToScope(t), this.deleteFilter = i, o.add(this), this.trackedOrigins = o, this.captureTransaction = r, this.undoStack = [], this.redoStack = [], this.undoing = !1, this.redoing = !1, this.currStackItem = null, this.lastChange = 0, this.ignoreRemoteMapChanges = s, this.captureTimeout = n, this.afterTransactionHandler = (l) => {
      if (!this.captureTransaction(l) || !this.scope.some((b) => l.changedParentTypes.has(b)) || !this.trackedOrigins.has(l.origin) && (!l.origin || !this.trackedOrigins.has(l.origin.constructor)))
        return;
      const f = this.undoing, h = this.redoing, p = f ? this.redoStack : this.undoStack;
      f ? this.stopCapturing() : h || this.clear(!1, !0);
      const g = new Wa();
      l.afterState.forEach((b, w) => {
        const k = l.beforeState.get(w) || 0, A = b - k;
        A > 0 && Il(g, w, k, A);
      });
      const v = xo();
      let E = !1;
      if (this.lastChange > 0 && v - this.lastChange < this.captureTimeout && p.length > 0 && !f && !h) {
        const b = p[p.length - 1];
        b.deletions = Am([b.deletions, l.deleteSet]), b.insertions = Am([b.insertions, g]);
      } else
        p.push(new cB(l.deleteSet, g)), E = !0;
      !f && !h && (this.lastChange = v), _a(
        l,
        l.deleteSet,
        /** @param {Item|GC} item */
        (b) => {
          b instanceof Ct && this.scope.some((w) => Ad(w, b)) && g4(b, !0);
        }
      );
      const y = [{ stackItem: p[p.length - 1], origin: l.origin, type: f ? "redo" : "undo", changedParentTypes: l.changedParentTypes }, this];
      E ? this.emit("stack-item-added", y) : this.emit("stack-item-updated", y);
    }, this.doc.on("afterTransaction", this.afterTransactionHandler), this.doc.on("destroy", () => {
      this.destroy();
    });
  }
  /**
   * @param {Array<AbstractType<any>> | AbstractType<any>} ytypes
   */
  addToScope(t) {
    t = bm(t) ? t : [t], t.forEach((n) => {
      this.scope.every((r) => r !== n) && (n.doc !== this.doc && LF("[yjs#509] Not same Y.Doc"), this.scope.push(n));
    });
  }
  /**
   * @param {any} origin
   */
  addTrackedOrigin(t) {
    this.trackedOrigins.add(t);
  }
  /**
   * @param {any} origin
   */
  removeTrackedOrigin(t) {
    this.trackedOrigins.delete(t);
  }
  clear(t = !0, n = !0) {
    (t && this.canUndo() || n && this.canRedo()) && this.doc.transact((r) => {
      t && (this.undoStack.forEach((i) => VE(r, this, i)), this.undoStack = []), n && (this.redoStack.forEach((i) => VE(r, this, i)), this.redoStack = []), this.emit("stack-cleared", [{ undoStackCleared: t, redoStackCleared: n }]);
    });
  }
  /**
   * UndoManager merges Undo-StackItem if they are created within time-gap
   * smaller than `options.captureTimeout`. Call `um.stopCapturing()` so that the next
   * StackItem won't be merged.
   *
   *
   * @example
   *     // without stopCapturing
   *     ytext.insert(0, 'a')
   *     ytext.insert(1, 'b')
   *     um.undo()
   *     ytext.toString() // => '' (note that 'ab' was removed)
   *     // with stopCapturing
   *     ytext.insert(0, 'a')
   *     um.stopCapturing()
   *     ytext.insert(0, 'b')
   *     um.undo()
   *     ytext.toString() // => 'a' (note that only 'b' was removed)
   *
   */
  stopCapturing() {
    this.lastChange = 0;
  }
  /**
   * Undo last changes on type.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  undo() {
    this.undoing = !0;
    let t;
    try {
      t = GE(this, this.undoStack, "undo");
    } finally {
      this.undoing = !1;
    }
    return t;
  }
  /**
   * Redo last undo operation.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  redo() {
    this.redoing = !0;
    let t;
    try {
      t = GE(this, this.redoStack, "redo");
    } finally {
      this.redoing = !1;
    }
    return t;
  }
  /**
   * Are undo steps available?
   *
   * @return {boolean} `true` if undo is possible
   */
  canUndo() {
    return this.undoStack.length > 0;
  }
  /**
   * Are redo steps available?
   *
   * @return {boolean} `true` if redo is possible
   */
  canRedo() {
    return this.redoStack.length > 0;
  }
  destroy() {
    this.trackedOrigins.delete(this), this.doc.off("afterTransaction", this.afterTransactionHandler), super.destroy();
  }
}
function* fB(e) {
  const t = He(e.restDecoder);
  for (let n = 0; n < t; n++) {
    const r = He(e.restDecoder), i = e.readClient();
    let o = He(e.restDecoder);
    for (let s = 0; s < r; s++) {
      const u = e.readInfo();
      if (u === 10) {
        const l = He(e.restDecoder);
        yield new sr(Ge(i, o), l), o += l;
      } else if (ff & u) {
        const l = (u & (Ei | Gn)) === 0, f = new Ct(
          Ge(i, o),
          null,
          // left
          (u & Gn) === Gn ? e.readLeftID() : null,
          // origin
          null,
          // right
          (u & Ei) === Ei ? e.readRightID() : null,
          // right origin
          // @ts-ignore Force writing a string here.
          l ? e.readParentInfo() ? e.readString() : e.readLeftID() : null,
          // parent
          l && (u & xl) === xl ? e.readString() : null,
          // parentSub
          Ab(e, u)
          // item content
        );
        yield f, o += f.length;
      } else {
        const l = e.readLen();
        yield new or(Ge(i, o), l), o += l;
      }
    }
  }
}
class l4 {
  /**
   * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
   * @param {boolean} filterSkips
   */
  constructor(t, n) {
    this.gen = fB(t), this.curr = null, this.done = !1, this.filterSkips = n, this.next();
  }
  /**
   * @return {Item | GC | Skip |null}
   */
  next() {
    do
      this.curr = this.gen.next().value || null;
    while (this.filterSkips && this.curr !== null && this.curr.constructor === sr);
    return this.curr;
  }
}
class c4 {
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  constructor(t) {
    this.currClient = 0, this.startClock = 0, this.written = 0, this.encoder = t, this.clientStructs = [];
  }
}
const hB = (e) => Id(e, J9, Wl), pB = (e, t) => {
  if (e.constructor === or) {
    const { client: n, clock: r } = e.id;
    return new or(Ge(n, r + t), e.length - t);
  } else if (e.constructor === sr) {
    const { client: n, clock: r } = e.id;
    return new sr(Ge(n, r + t), e.length - t);
  } else {
    const n = (
      /** @type {Item} */
      e
    ), { client: r, clock: i } = n.id;
    return new Ct(
      Ge(r, i + t),
      null,
      Ge(r, i + t - 1),
      null,
      n.rightOrigin,
      n.parent,
      n.parentSub,
      n.content.splice(t)
    );
  }
}, Id = (e, t = Ta, n = ps) => {
  if (e.length === 1)
    return e[0];
  const r = e.map((h) => new t(To(h)));
  let i = r.map((h) => new l4(h, !0)), o = null;
  const s = new n(), u = new c4(s);
  for (; i = i.filter((g) => g.curr !== null), i.sort(
    /** @type {function(any,any):number} */
    (g, v) => {
      if (g.curr.id.client === v.curr.id.client) {
        const E = g.curr.id.clock - v.curr.id.clock;
        return E === 0 ? g.curr.constructor === v.curr.constructor ? 0 : g.curr.constructor === sr ? 1 : -1 : E;
      } else
        return v.curr.id.client - g.curr.id.client;
    }
  ), i.length !== 0; ) {
    const h = i[0], p = (
      /** @type {Item | GC} */
      h.curr.id.client
    );
    if (o !== null) {
      let g = (
        /** @type {Item | GC | null} */
        h.curr
      ), v = !1;
      for (; g !== null && g.id.clock + g.length <= o.struct.id.clock + o.struct.length && g.id.client >= o.struct.id.client; )
        g = h.next(), v = !0;
      if (g === null || // current decoder is empty
      g.id.client !== p || // check whether there is another decoder that has has updates from `firstClient`
      v && g.id.clock > o.struct.id.clock + o.struct.length)
        continue;
      if (p !== o.struct.id.client)
        ho(u, o.struct, o.offset), o = { struct: g, offset: 0 }, h.next();
      else if (o.struct.id.clock + o.struct.length < g.id.clock)
        if (o.struct.constructor === sr)
          o.struct.length = g.id.clock + g.length - o.struct.id.clock;
        else {
          ho(u, o.struct, o.offset);
          const E = g.id.clock - o.struct.id.clock - o.struct.length;
          o = { struct: new sr(Ge(p, o.struct.id.clock + o.struct.length), E), offset: 0 };
        }
      else {
        const E = o.struct.id.clock + o.struct.length - g.id.clock;
        E > 0 && (o.struct.constructor === sr ? o.struct.length -= E : g = pB(g, E)), o.struct.mergeWith(
          /** @type {any} */
          g
        ) || (ho(u, o.struct, o.offset), o = { struct: g, offset: 0 }, h.next());
      }
    } else
      o = { struct: (
        /** @type {Item | GC} */
        h.curr
      ), offset: 0 }, h.next();
    for (let g = h.curr; g !== null && g.id.client === p && g.id.clock === o.struct.id.clock + o.struct.length && g.constructor !== sr; g = h.next())
      ho(u, o.struct, o.offset), o = { struct: g, offset: 0 };
  }
  o !== null && (ho(u, o.struct, o.offset), o = null), d4(u);
  const l = r.map((h) => a4(h)), f = Am(l);
  return Ka(s, f), s.toUint8Array();
}, mB = (e, t, n = Ta, r = ps) => {
  const i = nb(t), o = new r(), s = new c4(o), u = new n(To(e)), l = new l4(u, !1);
  for (; l.curr; ) {
    const h = l.curr, p = h.id.client, g = i.get(p) || 0;
    if (l.curr.constructor === sr) {
      l.next();
      continue;
    }
    if (h.id.clock + h.length > g)
      for (ho(s, h, ws(g - h.id.clock, 0)), l.next(); l.curr && l.curr.id.client === p; )
        ho(s, l.curr, 0), l.next();
    else
      for (; l.curr && l.curr.id.client === p && l.curr.id.clock + l.curr.length <= g; )
        l.next();
  }
  d4(s);
  const f = a4(u);
  return Ka(o, f), o.toUint8Array();
}, lb = (e) => {
  e.written > 0 && (e.clientStructs.push({ written: e.written, restEncoder: It(e.encoder.restEncoder) }), e.encoder.restEncoder = hn(), e.written = 0);
}, ho = (e, t, n) => {
  e.written > 0 && e.currClient !== t.id.client && lb(e), e.written === 0 && (e.currClient = t.id.client, e.encoder.writeClient(t.id.client), Me(e.encoder.restEncoder, t.id.clock + n)), t.write(e.encoder, n), e.written++;
}, d4 = (e) => {
  lb(e);
  const t = e.encoder.restEncoder;
  Me(t, e.clientStructs.length);
  for (let n = 0; n < e.clientStructs.length; n++) {
    const r = e.clientStructs[n];
    Me(t, r.written), hf(t, r.restEncoder);
  }
}, gB = (e, t, n, r) => {
  const i = new n(To(e)), o = new l4(i, !1), s = new r(), u = new c4(s);
  for (let f = o.curr; f !== null; f = o.next())
    ho(u, t(f), 0);
  d4(u);
  const l = a4(i);
  return Ka(s, l), s.toUint8Array();
}, vB = (e) => gB(e, fF, Ta, Wl), WE = "You must not compute changes after the event-handler fired.";
class gf {
  /**
   * @param {T} target The changed type.
   * @param {Transaction} transaction
   */
  constructor(t, n) {
    this.target = t, this.currentTarget = t, this.transaction = n, this._changes = null, this._keys = null, this._delta = null, this._path = null;
  }
  /**
   * Computes the path from `y` to the changed type.
   *
   * @todo v14 should standardize on path: Array<{parent, index}> because that is easier to work with.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */
  get path() {
    return this._path || (this._path = EB(this.currentTarget, this.target));
  }
  /**
   * Check if a struct is deleted by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  deletes(t) {
    return Gl(this.transaction.deleteSet, t.id);
  }
  /**
   * @type {Map<string, { action: 'add' | 'update' | 'delete', oldValue: any, newValue: any }>}
   */
  get keys() {
    if (this._keys === null) {
      if (this.transaction.doc._transactionCleanups.length === 0)
        throw So(WE);
      const t = /* @__PURE__ */ new Map(), n = this.target;
      /** @type Set<string|null> */
      this.transaction.changed.get(n).forEach((i) => {
        if (i !== null) {
          const o = (
            /** @type {Item} */
            n._map.get(i)
          );
          let s, u;
          if (this.adds(o)) {
            let l = o.left;
            for (; l !== null && this.adds(l); )
              l = l.left;
            if (this.deletes(o))
              if (l !== null && this.deletes(l))
                s = "delete", u = e1(l.content.getContent());
              else
                return;
            else
              l !== null && this.deletes(l) ? (s = "update", u = e1(l.content.getContent())) : (s = "add", u = void 0);
          } else if (this.deletes(o))
            s = "delete", u = e1(
              /** @type {Item} */
              o.content.getContent()
            );
          else
            return;
          t.set(i, { action: s, oldValue: u });
        }
      }), this._keys = t;
    }
    return this._keys;
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {Array<{insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any>}>}
   */
  get delta() {
    return this.changes.delta;
  }
  /**
   * Check if a struct is added by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  adds(t) {
    return t.id.clock >= (this.transaction.beforeState.get(t.id.client) || 0);
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    let t = this._changes;
    if (t === null) {
      if (this.transaction.doc._transactionCleanups.length === 0)
        throw So(WE);
      const n = this.target, r = wo(), i = wo(), o = [];
      if (t = {
        added: r,
        deleted: i,
        delta: o,
        keys: this.keys
      }, /** @type Set<string|null> */
      this.transaction.changed.get(n).has(null)) {
        let u = null;
        const l = () => {
          u && o.push(u);
        };
        for (let f = n._start; f !== null; f = f.right)
          f.deleted ? this.deletes(f) && !this.adds(f) && ((u === null || u.delete === void 0) && (l(), u = { delete: 0 }), u.delete += f.length, i.add(f)) : this.adds(f) ? ((u === null || u.insert === void 0) && (l(), u = { insert: [] }), u.insert = u.insert.concat(f.content.getContent()), r.add(f)) : ((u === null || u.retain === void 0) && (l(), u = { retain: 0 }), u.retain += f.length);
        u !== null && u.retain === void 0 && l();
      }
      this._changes = t;
    }
    return (
      /** @type {any} */
      t
    );
  }
}
const EB = (e, t) => {
  const n = [];
  for (; t._item !== null && t !== e; ) {
    if (t._item.parentSub !== null)
      n.unshift(t._item.parentSub);
    else {
      let r = 0, i = (
        /** @type {AbstractType<any>} */
        t._item.parent._start
      );
      for (; i !== t._item && i !== null; )
        !i.deleted && i.countable && (r += i.length), i = i.right;
      n.unshift(r);
    }
    t = /** @type {AbstractType<any>} */
    t._item.parent;
  }
  return n;
}, cb = 80;
let f4 = 0;
class CB {
  /**
   * @param {Item} p
   * @param {number} index
   */
  constructor(t, n) {
    t.marker = !0, this.p = t, this.index = n, this.timestamp = f4++;
  }
}
const yB = (e) => {
  e.timestamp = f4++;
}, db = (e, t, n) => {
  e.p.marker = !1, e.p = t, t.marker = !0, e.index = n, e.timestamp = f4++;
}, bB = (e, t, n) => {
  if (e.length >= cb) {
    const r = e.reduce((i, o) => i.timestamp < o.timestamp ? i : o);
    return db(r, t, n), r;
  } else {
    const r = new CB(t, n);
    return e.push(r), r;
  }
}, vf = (e, t) => {
  if (e._start === null || t === 0 || e._searchMarker === null)
    return null;
  const n = e._searchMarker.length === 0 ? null : e._searchMarker.reduce((o, s) => ud(t - o.index) < ud(t - s.index) ? o : s);
  let r = e._start, i = 0;
  for (n !== null && (r = n.p, i = n.index, yB(n)); r.right !== null && i < t; ) {
    if (!r.deleted && r.countable) {
      if (t < i + r.length)
        break;
      i += r.length;
    }
    r = r.right;
  }
  for (; r.left !== null && i > t; )
    r = r.left, !r.deleted && r.countable && (i -= r.length);
  for (; r.left !== null && r.left.id.client === r.id.client && r.left.id.clock + r.left.length === r.id.clock; )
    r = r.left, !r.deleted && r.countable && (i -= r.length);
  return n !== null && ud(n.index - i) < /** @type {YText|YArray<any>} */
  r.parent.length / cb ? (db(n, r, i), n) : bB(e._searchMarker, r, i);
}, Pl = (e, t, n) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const i = e[r];
    if (n > 0) {
      let o = i.p;
      for (o.marker = !1; o && (o.deleted || !o.countable); )
        o = o.left, o && !o.deleted && o.countable && (i.index -= o.length);
      if (o === null || o.marker === !0) {
        e.splice(r, 1);
        continue;
      }
      i.p = o, o.marker = !0;
    }
    (t < i.index || n > 0 && t === i.index) && (i.index = ws(t, i.index + n));
  }
}, Ef = (e, t, n) => {
  const r = e, i = t.changedParentTypes;
  for (; ni(i, e, () => []).push(n), e._item !== null; )
    e = /** @type {AbstractType<any>} */
    e._item.parent;
  ib(r._eH, n, t);
};
class an {
  constructor() {
    this._item = null, this._map = /* @__PURE__ */ new Map(), this._start = null, this.doc = null, this._length = 0, this._eH = LE(), this._dEH = LE(), this._searchMarker = null;
  }
  /**
   * @return {AbstractType<any>|null}
   */
  get parent() {
    return this._item ? (
      /** @type {AbstractType<any>} */
      this._item.parent
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item|null} item
   */
  _integrate(t, n) {
    this.doc = t, this._item = n;
  }
  /**
   * @return {AbstractType<EventType>}
   */
  _copy() {
    throw Kr();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {AbstractType<EventType>}
   */
  clone() {
    throw Kr();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} _encoder
   */
  _write(t) {
  }
  /**
   * The first non-deleted item
   */
  get _first() {
    let t = this._start;
    for (; t !== null && t.deleted; )
      t = t.right;
    return t;
  }
  /**
   * Creates YEvent and calls all type observers.
   * Must be implemented by each type.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} _parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, n) {
    !t.local && this._searchMarker && (this._searchMarker.length = 0);
  }
  /**
   * Observe all events that are created on this type.
   *
   * @param {function(EventType, Transaction):void} f Observer function
   */
  observe(t) {
    NE(this._eH, t);
  }
  /**
   * Observe all events that are created by this type and its children.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  observeDeep(t) {
    NE(this._dEH, t);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(EventType,Transaction):void} f Observer function
   */
  unobserve(t) {
    zE(this._eH, t);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  unobserveDeep(t) {
    zE(this._dEH, t);
  }
  /**
   * @abstract
   * @return {any}
   */
  toJSON() {
  }
}
const fb = (e, t, n) => {
  t < 0 && (t = e._length + t), n < 0 && (n = e._length + n);
  let r = n - t;
  const i = [];
  let o = e._start;
  for (; o !== null && r > 0; ) {
    if (o.countable && !o.deleted) {
      const s = o.content.getContent();
      if (s.length <= t)
        t -= s.length;
      else {
        for (let u = t; u < s.length && r > 0; u++)
          i.push(s[u]), r--;
        t = 0;
      }
    }
    o = o.right;
  }
  return i;
}, hb = (e) => {
  const t = [];
  let n = e._start;
  for (; n !== null; ) {
    if (n.countable && !n.deleted) {
      const r = n.content.getContent();
      for (let i = 0; i < r.length; i++)
        t.push(r[i]);
    }
    n = n.right;
  }
  return t;
}, _l = (e, t) => {
  let n = 0, r = e._start;
  for (; r !== null; ) {
    if (r.countable && !r.deleted) {
      const i = r.content.getContent();
      for (let o = 0; o < i.length; o++)
        t(i[o], n++, e);
    }
    r = r.right;
  }
}, pb = (e, t) => {
  const n = [];
  return _l(e, (r, i) => {
    n.push(t(r, i, e));
  }), n;
}, wB = (e) => {
  let t = e._start, n = null, r = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      if (n === null) {
        for (; t !== null && t.deleted; )
          t = t.right;
        if (t === null)
          return {
            done: !0,
            value: void 0
          };
        n = t.content.getContent(), r = 0, t = t.right;
      }
      const i = n[r++];
      return n.length <= r && (n = null), {
        done: !1,
        value: i
      };
    }
  };
}, mb = (e, t) => {
  const n = vf(e, t);
  let r = e._start;
  for (n !== null && (r = n.p, t -= n.index); r !== null; r = r.right)
    if (!r.deleted && r.countable) {
      if (t < r.length)
        return r.content.getContent()[t];
      t -= r.length;
    }
}, Pd = (e, t, n, r) => {
  let i = n;
  const o = e.doc, s = o.clientID, u = o.store, l = n === null ? t._start : n.right;
  let f = [];
  const h = () => {
    f.length > 0 && (i = new Ct(Ge(s, Kt(u, s)), i, i && i.lastId, l, l && l.id, t, null, new gs(f)), i.integrate(e, 0), f = []);
  };
  r.forEach((p) => {
    if (p === null)
      f.push(p);
    else
      switch (p.constructor) {
        case Number:
        case Object:
        case Boolean:
        case Array:
        case String:
          f.push(p);
          break;
        default:
          switch (h(), p.constructor) {
            case Uint8Array:
            case ArrayBuffer:
              i = new Ct(Ge(s, Kt(u, s)), i, i && i.lastId, l, l && l.id, t, null, new Kl(new Uint8Array(
                /** @type {Uint8Array} */
                p
              ))), i.integrate(e, 0);
              break;
            case Ya:
              i = new Ct(Ge(s, Kt(u, s)), i, i && i.lastId, l, l && l.id, t, null, new Yl(
                /** @type {Doc} */
                p
              )), i.integrate(e, 0);
              break;
            default:
              if (p instanceof an)
                i = new Ct(Ge(s, Kt(u, s)), i, i && i.lastId, l, l && l.id, t, null, new Bi(p)), i.integrate(e, 0);
              else
                throw new Error("Unexpected content type in insert operation");
          }
      }
  }), h();
}, gb = () => So("Length exceeded!"), vb = (e, t, n, r) => {
  if (n > t._length)
    throw gb();
  if (n === 0)
    return t._searchMarker && Pl(t._searchMarker, n, r.length), Pd(e, t, null, r);
  const i = n, o = vf(t, n);
  let s = t._start;
  for (o !== null && (s = o.p, n -= o.index, n === 0 && (s = s.prev, n += s && s.countable && !s.deleted ? s.length : 0)); s !== null; s = s.right)
    if (!s.deleted && s.countable) {
      if (n <= s.length) {
        n < s.length && _n(e, Ge(s.id.client, s.id.clock + n));
        break;
      }
      n -= s.length;
    }
  return t._searchMarker && Pl(t._searchMarker, i, r.length), Pd(e, t, s, r);
}, SB = (e, t, n) => {
  let i = (t._searchMarker || []).reduce((o, s) => s.index > o.index ? s : o, { index: 0, p: t._start }).p;
  if (i)
    for (; i.right; )
      i = i.right;
  return Pd(e, t, i, n);
}, Eb = (e, t, n, r) => {
  if (r === 0)
    return;
  const i = n, o = r, s = vf(t, n);
  let u = t._start;
  for (s !== null && (u = s.p, n -= s.index); u !== null && n > 0; u = u.right)
    !u.deleted && u.countable && (n < u.length && _n(e, Ge(u.id.client, u.id.clock + n)), n -= u.length);
  for (; r > 0 && u !== null; )
    u.deleted || (r < u.length && _n(e, Ge(u.id.client, u.id.clock + r)), u.delete(e), r -= u.length), u = u.right;
  if (r > 0)
    throw gb();
  t._searchMarker && Pl(
    t._searchMarker,
    i,
    -o + r
    /* in case we remove the above exception */
  );
}, _d = (e, t, n) => {
  const r = t._map.get(n);
  r !== void 0 && r.delete(e);
}, h4 = (e, t, n, r) => {
  const i = t._map.get(n) || null, o = e.doc, s = o.clientID;
  let u;
  if (r == null)
    u = new gs([r]);
  else
    switch (r.constructor) {
      case Number:
      case Object:
      case Boolean:
      case Array:
      case String:
        u = new gs([r]);
        break;
      case Uint8Array:
        u = new Kl(
          /** @type {Uint8Array} */
          r
        );
        break;
      case Ya:
        u = new Yl(
          /** @type {Doc} */
          r
        );
        break;
      default:
        if (r instanceof an)
          u = new Bi(r);
        else
          throw new Error("Unexpected content type");
    }
  new Ct(Ge(s, Kt(o.store, s)), i, i && i.lastId, null, null, t, n, u).integrate(e, 0);
}, p4 = (e, t) => {
  const n = e._map.get(t);
  return n !== void 0 && !n.deleted ? n.content.getContent()[n.length - 1] : void 0;
}, Cb = (e) => {
  const t = {};
  return e._map.forEach((n, r) => {
    n.deleted || (t[r] = n.content.getContent()[n.length - 1]);
  }), t;
}, yb = (e, t) => {
  const n = e._map.get(t);
  return n !== void 0 && !n.deleted;
}, xB = (e, t) => {
  const n = {};
  return e._map.forEach((r, i) => {
    let o = r;
    for (; o !== null && (!t.sv.has(o.id.client) || o.id.clock >= (t.sv.get(o.id.client) || 0)); )
      o = o.left;
    o !== null && ca(o, t) && (n[i] = o.content.getContent()[o.length - 1]);
  }), n;
}, A0 = (e) => NF(
  e.entries(),
  /** @param {any} entry */
  (t) => !t[1].deleted
);
class kB extends gf {
}
class ya extends an {
  constructor() {
    super(), this._prelimContent = [], this._searchMarker = [];
  }
  /**
   * Construct a new YArray containing the specified items.
   * @template {Object<string,any>|Array<any>|number|null|string|Uint8Array} T
   * @param {Array<T>} items
   * @return {YArray<T>}
   */
  static from(t) {
    const n = new ya();
    return n.push(t), n;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, n) {
    super._integrate(t, n), this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    ), this._prelimContent = null;
  }
  /**
   * @return {YArray<T>}
   */
  _copy() {
    return new ya();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YArray<T>}
   */
  clone() {
    const t = new ya();
    return t.insert(0, this.toArray().map(
      (n) => n instanceof an ? (
        /** @type {typeof el} */
        n.clone()
      ) : n
    )), t;
  }
  get length() {
    return this._prelimContent === null ? this._length : this._prelimContent.length;
  }
  /**
   * Creates YArrayEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, n) {
    super._callObserver(t, n), Ef(this, t, new kB(this, t));
  }
  /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(1, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<T>} content The array of content
   */
  insert(t, n) {
    this.doc !== null ? ct(this.doc, (r) => {
      vb(
        r,
        this,
        t,
        /** @type {any} */
        n
      );
    }) : this._prelimContent.splice(t, 0, ...n);
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<T>} content Array of content to append.
   *
   * @todo Use the following implementation in all types.
   */
  push(t) {
    this.doc !== null ? ct(this.doc, (n) => {
      SB(
        n,
        this,
        /** @type {any} */
        t
      );
    }) : this._prelimContent.push(...t);
  }
  /**
   * Prepends content to this YArray.
   *
   * @param {Array<T>} content Array of content to prepend.
   */
  unshift(t) {
    this.insert(0, t);
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */
  delete(t, n = 1) {
    this.doc !== null ? ct(this.doc, (r) => {
      Eb(r, this, t, n);
    }) : this._prelimContent.splice(t, n);
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {T}
   */
  get(t) {
    return mb(this, t);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<T>}
   */
  toArray() {
    return hb(this);
  }
  /**
   * Returns a portion of this YArray into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<T>}
   */
  slice(t = 0, n = this.length) {
    return fb(this, t, n);
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array<any>}
   */
  toJSON() {
    return this.map((t) => t instanceof an ? t.toJSON() : t);
  }
  /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @template M
   * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
   * @return {Array<M>} A new array with each element being the result of the
   *                 callback function
   */
  map(t) {
    return pb(
      this,
      /** @type {any} */
      t
    );
  }
  /**
   * Executes a provided function once on every element of this YArray.
   *
   * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    _l(this, t);
  }
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return wB(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(XB);
  }
}
const DB = (e) => new ya();
class AB extends gf {
  /**
   * @param {YMap<T>} ymap The YArray that changed.
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed.
   */
  constructor(t, n, r) {
    super(t, n), this.keysChanged = r;
  }
}
class Fa extends an {
  /**
   *
   * @param {Iterable<readonly [string, any]>=} entries - an optional iterable to initialize the YMap
   */
  constructor(t) {
    super(), this._prelimContent = null, t === void 0 ? this._prelimContent = /* @__PURE__ */ new Map() : this._prelimContent = new Map(t);
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, n) {
    super._integrate(t, n), this._prelimContent.forEach((r, i) => {
      this.set(i, r);
    }), this._prelimContent = null;
  }
  /**
   * @return {YMap<MapType>}
   */
  _copy() {
    return new Fa();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YMap<MapType>}
   */
  clone() {
    const t = new Fa();
    return this.forEach((n, r) => {
      t.set(r, n instanceof an ? (
        /** @type {typeof value} */
        n.clone()
      ) : n);
    }), t;
  }
  /**
   * Creates YMapEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, n) {
    Ef(this, t, new AB(this, t, n));
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object<string,any>}
   */
  toJSON() {
    const t = {};
    return this._map.forEach((n, r) => {
      if (!n.deleted) {
        const i = n.content.getContent()[n.length - 1];
        t[r] = i instanceof an ? i.toJSON() : i;
      }
    }), t;
  }
  /**
   * Returns the size of the YMap (count of key/value pairs)
   *
   * @return {number}
   */
  get size() {
    return [...A0(this._map)].length;
  }
  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */
  keys() {
    return o1(
      A0(this._map),
      /** @param {any} v */
      (t) => t[0]
    );
  }
  /**
   * Returns the values for each element in the YMap Type.
   *
   * @return {IterableIterator<MapType>}
   */
  values() {
    return o1(
      A0(this._map),
      /** @param {any} v */
      (t) => t[1].content.getContent()[t[1].length - 1]
    );
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  entries() {
    return o1(
      A0(this._map),
      /** @param {any} v */
      (t) => (
        /** @type {any} */
        [t[0], t[1].content.getContent()[t[1].length - 1]]
      )
    );
  }
  /**
   * Executes a provided function on once on every key-value pair.
   *
   * @param {function(MapType,string,YMap<MapType>):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    this._map.forEach((n, r) => {
      n.deleted || t(n.content.getContent()[n.length - 1], r, this);
    });
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */
  delete(t) {
    this.doc !== null ? ct(this.doc, (n) => {
      _d(n, this, t);
    }) : this._prelimContent.delete(t);
  }
  /**
   * Adds or updates an element with a specified key and value.
   * @template {MapType} VAL
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {VAL} value The value of the element to add
   * @return {VAL}
   */
  set(t, n) {
    return this.doc !== null ? ct(this.doc, (r) => {
      h4(
        r,
        this,
        t,
        /** @type {any} */
        n
      );
    }) : this._prelimContent.set(t, n), n;
  }
  /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key
   * @return {MapType|undefined}
   */
  get(t) {
    return (
      /** @type {any} */
      p4(this, t)
    );
  }
  /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @return {boolean}
   */
  has(t) {
    return yb(this, t);
  }
  /**
   * Removes all elements from this YMap.
   */
  clear() {
    this.doc !== null ? ct(this.doc, (t) => {
      this.forEach(function(n, r, i) {
        _d(t, i, r);
      });
    }) : this._prelimContent.clear();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(ZB);
  }
}
const IB = (e) => new Fa(), go = (e, t) => e === t || typeof e == "object" && typeof t == "object" && e && t && dF(e, t);
class _m {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {number} index
   * @param {Map<string,any>} currentAttributes
   */
  constructor(t, n, r, i) {
    this.left = t, this.right = n, this.index = r, this.currentAttributes = i;
  }
  /**
   * Only call this if you know that this.right is defined
   */
  forward() {
    switch (this.right === null && Yr(), this.right.content.constructor) {
      case Xt:
        this.right.deleted || Xa(
          this.currentAttributes,
          /** @type {ContentFormat} */
          this.right.content
        );
        break;
      default:
        this.right.deleted || (this.index += this.right.length);
        break;
    }
    this.left = this.right, this.right = this.right.right;
  }
}
const KE = (e, t, n) => {
  for (; t.right !== null && n > 0; ) {
    switch (t.right.content.constructor) {
      case Xt:
        t.right.deleted || Xa(
          t.currentAttributes,
          /** @type {ContentFormat} */
          t.right.content
        );
        break;
      default:
        t.right.deleted || (n < t.right.length && _n(e, Ge(t.right.id.client, t.right.id.clock + n)), t.index += t.right.length, n -= t.right.length);
        break;
    }
    t.left = t.right, t.right = t.right.right;
  }
  return t;
}, I0 = (e, t, n, r) => {
  const i = /* @__PURE__ */ new Map(), o = r ? vf(t, n) : null;
  if (o) {
    const s = new _m(o.p.left, o.p, o.index, i);
    return KE(e, s, n - o.index);
  } else {
    const s = new _m(null, t._start, 0, i);
    return KE(e, s, n);
  }
}, bb = (e, t, n, r) => {
  for (; n.right !== null && (n.right.deleted === !0 || n.right.content.constructor === Xt && go(
    r.get(
      /** @type {ContentFormat} */
      n.right.content.key
    ),
    /** @type {ContentFormat} */
    n.right.content.value
  )); )
    n.right.deleted || r.delete(
      /** @type {ContentFormat} */
      n.right.content.key
    ), n.forward();
  const i = e.doc, o = i.clientID;
  r.forEach((s, u) => {
    const l = n.left, f = n.right, h = new Ct(Ge(o, Kt(i.store, o)), l, l && l.lastId, f, f && f.id, t, null, new Xt(u, s));
    h.integrate(e, 0), n.right = h, n.forward();
  });
}, Xa = (e, t) => {
  const { key: n, value: r } = t;
  r === null ? e.delete(n) : e.set(n, r);
}, wb = (e, t) => {
  for (; e.right !== null; ) {
    if (!(e.right.deleted || e.right.content.constructor === Xt && go(
      t[
        /** @type {ContentFormat} */
        e.right.content.key
      ] ?? null,
      /** @type {ContentFormat} */
      e.right.content.value
    ))) break;
    e.forward();
  }
}, Sb = (e, t, n, r) => {
  const i = e.doc, o = i.clientID, s = /* @__PURE__ */ new Map();
  for (const u in r) {
    const l = r[u], f = n.currentAttributes.get(u) ?? null;
    if (!go(f, l)) {
      s.set(u, f);
      const { left: h, right: p } = n;
      n.right = new Ct(Ge(o, Kt(i.store, o)), h, h && h.lastId, p, p && p.id, t, null, new Xt(u, l)), n.right.integrate(e, 0), n.forward();
    }
  }
  return s;
}, s1 = (e, t, n, r, i) => {
  n.currentAttributes.forEach((g, v) => {
    i[v] === void 0 && (i[v] = null);
  });
  const o = e.doc, s = o.clientID;
  wb(n, i);
  const u = Sb(e, t, n, i), l = r.constructor === String ? new Zr(
    /** @type {string} */
    r
  ) : r instanceof an ? new Bi(r) : new Ss(r);
  let { left: f, right: h, index: p } = n;
  t._searchMarker && Pl(t._searchMarker, n.index, l.getLength()), h = new Ct(Ge(s, Kt(o.store, s)), f, f && f.lastId, h, h && h.id, t, null, l), h.integrate(e, 0), n.right = h, n.index = p, n.forward(), bb(e, t, n, u);
}, YE = (e, t, n, r, i) => {
  const o = e.doc, s = o.clientID;
  wb(n, i);
  const u = Sb(e, t, n, i);
  e: for (; n.right !== null && (r > 0 || u.size > 0 && (n.right.deleted || n.right.content.constructor === Xt)); ) {
    if (!n.right.deleted)
      switch (n.right.content.constructor) {
        case Xt: {
          const { key: l, value: f } = (
            /** @type {ContentFormat} */
            n.right.content
          ), h = i[l];
          if (h !== void 0) {
            if (go(h, f))
              u.delete(l);
            else {
              if (r === 0)
                break e;
              u.set(l, f);
            }
            n.right.delete(e);
          } else
            n.currentAttributes.set(l, f);
          break;
        }
        default:
          r < n.right.length && _n(e, Ge(n.right.id.client, n.right.id.clock + r)), r -= n.right.length;
          break;
      }
    n.forward();
  }
  if (r > 0) {
    let l = "";
    for (; r > 0; r--)
      l += `
`;
    n.right = new Ct(Ge(s, Kt(o.store, s)), n.left, n.left && n.left.lastId, n.right, n.right && n.right.id, t, null, new Zr(l)), n.right.integrate(e, 0), n.forward();
  }
  bb(e, t, n, u);
}, xb = (e, t, n, r, i) => {
  let o = t;
  const s = Fn();
  for (; o && (!o.countable || o.deleted); ) {
    if (!o.deleted && o.content.constructor === Xt) {
      const f = (
        /** @type {ContentFormat} */
        o.content
      );
      s.set(f.key, f);
    }
    o = o.right;
  }
  let u = 0, l = !1;
  for (; t !== o; ) {
    if (n === t && (l = !0), !t.deleted) {
      const f = t.content;
      switch (f.constructor) {
        case Xt: {
          const { key: h, value: p } = (
            /** @type {ContentFormat} */
            f
          ), g = r.get(h) ?? null;
          (s.get(h) !== f || g === p) && (t.delete(e), u++, !l && (i.get(h) ?? null) === p && g !== p && (g === null ? i.delete(h) : i.set(h, g))), !l && !t.deleted && Xa(
            i,
            /** @type {ContentFormat} */
            f
          );
          break;
        }
      }
    }
    t = /** @type {Item} */
    t.right;
  }
  return u;
}, PB = (e, t) => {
  for (; t && t.right && (t.right.deleted || !t.right.countable); )
    t = t.right;
  const n = /* @__PURE__ */ new Set();
  for (; t && (t.deleted || !t.countable); ) {
    if (!t.deleted && t.content.constructor === Xt) {
      const r = (
        /** @type {ContentFormat} */
        t.content.key
      );
      n.has(r) ? t.delete(e) : n.add(r);
    }
    t = t.left;
  }
}, _B = (e) => {
  let t = 0;
  return ct(
    /** @type {Doc} */
    e.doc,
    (n) => {
      let r = (
        /** @type {Item} */
        e._start
      ), i = e._start, o = Fn();
      const s = ym(o);
      for (; i; ) {
        if (i.deleted === !1)
          switch (i.content.constructor) {
            case Xt:
              Xa(
                s,
                /** @type {ContentFormat} */
                i.content
              );
              break;
            default:
              t += xb(n, r, i, o, s), o = ym(s), r = i;
              break;
          }
        i = i.right;
      }
    }
  ), t;
}, TB = (e) => {
  const t = /* @__PURE__ */ new Set(), n = e.doc;
  for (const [r, i] of e.afterState.entries()) {
    const o = e.beforeState.get(r) || 0;
    i !== o && ab(
      e,
      /** @type {Array<Item|GC>} */
      n.store.clients.get(r),
      o,
      i,
      (s) => {
        !s.deleted && /** @type {Item} */
        s.content.constructor === Xt && s.constructor !== or && t.add(
          /** @type {any} */
          s.parent
        );
      }
    );
  }
  ct(n, (r) => {
    _a(e, e.deleteSet, (i) => {
      if (i instanceof or || !/** @type {YText} */
      i.parent._hasFormatting || t.has(
        /** @type {YText} */
        i.parent
      ))
        return;
      const o = (
        /** @type {YText} */
        i.parent
      );
      i.content.constructor === Xt ? t.add(o) : PB(r, i);
    });
    for (const i of t)
      _B(i);
  });
}, XE = (e, t, n) => {
  const r = n, i = ym(t.currentAttributes), o = t.right;
  for (; n > 0 && t.right !== null; ) {
    if (t.right.deleted === !1)
      switch (t.right.content.constructor) {
        case Bi:
        case Ss:
        case Zr:
          n < t.right.length && _n(e, Ge(t.right.id.client, t.right.id.clock + n)), n -= t.right.length, t.right.delete(e);
          break;
      }
    t.forward();
  }
  o && xb(e, o, t.right, i, t.currentAttributes);
  const s = (
    /** @type {AbstractType<any>} */
    /** @type {Item} */
    (t.left || t.right).parent
  );
  return s._searchMarker && Pl(s._searchMarker, t.index, -r + n), t;
};
class FB extends gf {
  /**
   * @param {YText} ytext
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed
   */
  constructor(t, n, r) {
    super(t, n), this.childListChanged = !1, this.keysChanged = /* @__PURE__ */ new Set(), r.forEach((i) => {
      i === null ? this.childListChanged = !0 : this.keysChanged.add(i);
    });
  }
  /**
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    if (this._changes === null) {
      const t = {
        keys: this.keys,
        delta: this.delta,
        added: /* @__PURE__ */ new Set(),
        deleted: /* @__PURE__ */ new Set()
      };
      this._changes = t;
    }
    return (
      /** @type {any} */
      this._changes
    );
  }
  /**
   * Compute the changes in the delta format.
   * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
   *
   * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
   *
   * @public
   */
  get delta() {
    if (this._delta === null) {
      const t = (
        /** @type {Doc} */
        this.target.doc
      ), n = [];
      ct(t, (r) => {
        const i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
        let s = this.target._start, u = null;
        const l = {};
        let f = "", h = 0, p = 0;
        const g = () => {
          if (u !== null) {
            let v = null;
            switch (u) {
              case "delete":
                p > 0 && (v = { delete: p }), p = 0;
                break;
              case "insert":
                (typeof f == "object" || f.length > 0) && (v = { insert: f }, i.size > 0 && (v.attributes = {}, i.forEach((E, y) => {
                  E !== null && (v.attributes[y] = E);
                }))), f = "";
                break;
              case "retain":
                h > 0 && (v = { retain: h }, lF(l) || (v.attributes = sF({}, l))), h = 0;
                break;
            }
            v && n.push(v), u = null;
          }
        };
        for (; s !== null; ) {
          switch (s.content.constructor) {
            case Bi:
            case Ss:
              this.adds(s) ? this.deletes(s) || (g(), u = "insert", f = s.content.getContent()[0], g()) : this.deletes(s) ? (u !== "delete" && (g(), u = "delete"), p += 1) : s.deleted || (u !== "retain" && (g(), u = "retain"), h += 1);
              break;
            case Zr:
              this.adds(s) ? this.deletes(s) || (u !== "insert" && (g(), u = "insert"), f += /** @type {ContentString} */
              s.content.str) : this.deletes(s) ? (u !== "delete" && (g(), u = "delete"), p += s.length) : s.deleted || (u !== "retain" && (g(), u = "retain"), h += s.length);
              break;
            case Xt: {
              const { key: v, value: E } = (
                /** @type {ContentFormat} */
                s.content
              );
              if (this.adds(s)) {
                if (!this.deletes(s)) {
                  const y = i.get(v) ?? null;
                  go(y, E) ? E !== null && s.delete(r) : (u === "retain" && g(), go(E, o.get(v) ?? null) ? delete l[v] : l[v] = E);
                }
              } else if (this.deletes(s)) {
                o.set(v, E);
                const y = i.get(v) ?? null;
                go(y, E) || (u === "retain" && g(), l[v] = y);
              } else if (!s.deleted) {
                o.set(v, E);
                const y = l[v];
                y !== void 0 && (go(y, E) ? y !== null && s.delete(r) : (u === "retain" && g(), E === null ? delete l[v] : l[v] = E));
              }
              s.deleted || (u === "insert" && g(), Xa(
                i,
                /** @type {ContentFormat} */
                s.content
              ));
              break;
            }
          }
          s = s.right;
        }
        for (g(); n.length > 0; ) {
          const v = n[n.length - 1];
          if (v.retain !== void 0 && v.attributes === void 0)
            n.pop();
          else
            break;
        }
      }), this._delta = n;
    }
    return (
      /** @type {any} */
      this._delta
    );
  }
}
class Ba extends an {
  /**
   * @param {String} [string] The initial value of the YText.
   */
  constructor(t) {
    super(), this._pending = t !== void 0 ? [() => this.insert(0, t)] : [], this._searchMarker = [], this._hasFormatting = !1;
  }
  /**
   * Number of characters of this text type.
   *
   * @type {number}
   */
  get length() {
    return this._length;
  }
  /**
   * @param {Doc} y
   * @param {Item} item
   */
  _integrate(t, n) {
    super._integrate(t, n);
    try {
      this._pending.forEach((r) => r());
    } catch (r) {
      console.error(r);
    }
    this._pending = null;
  }
  _copy() {
    return new Ba();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YText}
   */
  clone() {
    const t = new Ba();
    return t.applyDelta(this.toDelta()), t;
  }
  /**
   * Creates YTextEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, n) {
    super._callObserver(t, n);
    const r = new FB(this, t, n);
    Ef(this, t, r), !t.local && this._hasFormatting && (t._needFormattingCleanup = !0);
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */
  toString() {
    let t = "", n = this._start;
    for (; n !== null; )
      !n.deleted && n.countable && n.content.constructor === Zr && (t += /** @type {ContentString} */
      n.content.str), n = n.right;
    return t;
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @return {string}
   * @public
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {any} delta The changes to apply on this element.
   * @param {object}  opts
   * @param {boolean} [opts.sanitize] Sanitize input delta. Removes ending newlines if set to true.
   *
   *
   * @public
   */
  applyDelta(t, { sanitize: n = !0 } = {}) {
    this.doc !== null ? ct(this.doc, (r) => {
      const i = new _m(null, this._start, 0, /* @__PURE__ */ new Map());
      for (let o = 0; o < t.length; o++) {
        const s = t[o];
        if (s.insert !== void 0) {
          const u = !n && typeof s.insert == "string" && o === t.length - 1 && i.right === null && s.insert.slice(-1) === `
` ? s.insert.slice(0, -1) : s.insert;
          (typeof u != "string" || u.length > 0) && s1(r, this, i, u, s.attributes || {});
        } else s.retain !== void 0 ? YE(r, this, i, s.retain, s.attributes || {}) : s.delete !== void 0 && XE(r, i, s.delete);
      }
    }) : this._pending.push(() => this.applyDelta(t));
  }
  /**
   * Returns the Delta representation of this YText type.
   *
   * @param {Snapshot} [snapshot]
   * @param {Snapshot} [prevSnapshot]
   * @param {function('removed' | 'added', ID):any} [computeYChange]
   * @return {any} The Delta representation of this type.
   *
   * @public
   */
  toDelta(t, n, r) {
    const i = [], o = /* @__PURE__ */ new Map(), s = (
      /** @type {Doc} */
      this.doc
    );
    let u = "", l = this._start;
    function f() {
      if (u.length > 0) {
        const p = {};
        let g = !1;
        o.forEach((E, y) => {
          g = !0, p[y] = E;
        });
        const v = { insert: u };
        g && (v.attributes = p), i.push(v), u = "";
      }
    }
    const h = () => {
      for (; l !== null; ) {
        if (ca(l, t) || n !== void 0 && ca(l, n))
          switch (l.content.constructor) {
            case Zr: {
              const p = o.get("ychange");
              t !== void 0 && !ca(l, t) ? (p === void 0 || p.user !== l.id.client || p.type !== "removed") && (f(), o.set("ychange", r ? r("removed", l.id) : { type: "removed" })) : n !== void 0 && !ca(l, n) ? (p === void 0 || p.user !== l.id.client || p.type !== "added") && (f(), o.set("ychange", r ? r("added", l.id) : { type: "added" })) : p !== void 0 && (f(), o.delete("ychange")), u += /** @type {ContentString} */
              l.content.str;
              break;
            }
            case Bi:
            case Ss: {
              f();
              const p = {
                insert: l.content.getContent()[0]
              };
              if (o.size > 0) {
                const g = (
                  /** @type {Object<string,any>} */
                  {}
                );
                p.attributes = g, o.forEach((v, E) => {
                  g[E] = v;
                });
              }
              i.push(p);
              break;
            }
            case Xt:
              ca(l, t) && (f(), Xa(
                o,
                /** @type {ContentFormat} */
                l.content
              ));
              break;
          }
        l = l.right;
      }
      f();
    };
    return t || n ? ct(s, (p) => {
      t && Im(p, t), n && Im(p, n), h();
    }, "cleanup") : h(), i;
  }
  /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} [attributes] Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */
  insert(t, n, r) {
    if (n.length <= 0)
      return;
    const i = this.doc;
    i !== null ? ct(i, (o) => {
      const s = I0(o, this, t, !r);
      r || (r = {}, s.currentAttributes.forEach((u, l) => {
        r[l] = u;
      })), s1(o, this, s, n, r);
    }) : this._pending.push(() => this.insert(t, n, r));
  }
  /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object | AbstractType<any>} embed The Object that represents the embed.
   * @param {TextAttributes} [attributes] Attribute information to apply on the
   *                                    embed
   *
   * @public
   */
  insertEmbed(t, n, r) {
    const i = this.doc;
    i !== null ? ct(i, (o) => {
      const s = I0(o, this, t, !r);
      s1(o, this, s, n, r || {});
    }) : this._pending.push(() => this.insertEmbed(t, n, r || {}));
  }
  /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */
  delete(t, n) {
    if (n === 0)
      return;
    const r = this.doc;
    r !== null ? ct(r, (i) => {
      XE(i, I0(i, this, t, !0), n);
    }) : this._pending.push(() => this.delete(t, n));
  }
  /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */
  format(t, n, r) {
    if (n === 0)
      return;
    const i = this.doc;
    i !== null ? ct(i, (o) => {
      const s = I0(o, this, t, !1);
      s.right !== null && YE(o, this, s, n, r);
    }) : this._pending.push(() => this.format(t, n, r));
  }
  /**
   * Removes an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(t) {
    this.doc !== null ? ct(this.doc, (n) => {
      _d(n, this, t);
    }) : this._pending.push(() => this.removeAttribute(t));
  }
  /**
   * Sets or updates an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {any} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(t, n) {
    this.doc !== null ? ct(this.doc, (r) => {
      h4(r, this, t, n);
    }) : this._pending.push(() => this.setAttribute(t, n));
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {any} The queried attribute value.
   *
   * @public
   */
  getAttribute(t) {
    return (
      /** @type {any} */
      p4(this, t)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes() {
    return Cb(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(qB);
  }
}
const BB = (e) => new Ba();
class a1 {
  /**
   * @param {YXmlFragment | YXmlElement} root
   * @param {function(AbstractType<any>):boolean} [f]
   */
  constructor(t, n = () => !0) {
    this._filter = n, this._root = t, this._currentNode = /** @type {Item} */
    t._start, this._firstCall = !0;
  }
  [Symbol.iterator]() {
    return this;
  }
  /**
   * Get the next node.
   *
   * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
   *
   * @public
   */
  next() {
    let t = this._currentNode, n = t && t.content && /** @type {any} */
    t.content.type;
    if (t !== null && (!this._firstCall || t.deleted || !this._filter(n)))
      do
        if (n = /** @type {any} */
        t.content.type, !t.deleted && (n.constructor === Ma || n.constructor === ms) && n._start !== null)
          t = n._start;
        else
          for (; t !== null; )
            if (t.right !== null) {
              t = t.right;
              break;
            } else t.parent === this._root ? t = null : t = /** @type {AbstractType<any>} */
            t.parent._item;
      while (t !== null && (t.deleted || !this._filter(
        /** @type {ContentType} */
        t.content.type
      )));
    return this._firstCall = !1, t === null ? { value: void 0, done: !0 } : (this._currentNode = t, { value: (
      /** @type {any} */
      t.content.type
    ), done: !1 });
  }
}
class ms extends an {
  constructor() {
    super(), this._prelimContent = [];
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get firstChild() {
    const t = this._first;
    return t ? t.content.getContent()[0] : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, n) {
    super._integrate(t, n), this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    ), this._prelimContent = null;
  }
  _copy() {
    return new ms();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlFragment}
   */
  clone() {
    const t = new ms();
    return t.insert(0, this.toArray().map((n) => n instanceof an ? n.clone() : n)), t;
  }
  get length() {
    return this._prelimContent === null ? this._length : this._prelimContent.length;
  }
  /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */
  createTreeWalker(t) {
    return new a1(this, t);
  }
  /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
   *
   * @public
   */
  querySelector(t) {
    t = t.toUpperCase();
    const r = new a1(this, (i) => i.nodeName && i.nodeName.toUpperCase() === t).next();
    return r.done ? null : r.value;
  }
  /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * @todo Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
   *
   * @public
   */
  querySelectorAll(t) {
    return t = t.toUpperCase(), ki(new a1(this, (n) => n.nodeName && n.nodeName.toUpperCase() === t));
  }
  /**
   * Creates YXmlEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, n) {
    Ef(this, t, new OB(this, n, t));
  }
  /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */
  toString() {
    return pb(this, (t) => t.toString()).join("");
  }
  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, n = {}, r) {
    const i = t.createDocumentFragment();
    return r !== void 0 && r._createAssociation(i, this), _l(this, (o) => {
      i.insertBefore(o.toDOM(t, n, r), null);
    }), i;
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {number} index The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insert(t, n) {
    this.doc !== null ? ct(this.doc, (r) => {
      vb(r, this, t, n);
    }) : this._prelimContent.splice(t, 0, ...n);
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {null|Item|YXmlElement|YXmlText} ref The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insertAfter(t, n) {
    if (this.doc !== null)
      ct(this.doc, (r) => {
        const i = t && t instanceof an ? t._item : t;
        Pd(r, this, i, n);
      });
    else {
      const r = (
        /** @type {Array<any>} */
        this._prelimContent
      ), i = t === null ? 0 : r.findIndex((o) => o === t) + 1;
      if (i === 0 && t !== null)
        throw So("Reference item not found");
      r.splice(i, 0, ...n);
    }
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} [length=1] The number of elements to remove. Defaults to 1.
   */
  delete(t, n = 1) {
    this.doc !== null ? ct(this.doc, (r) => {
      Eb(r, this, t, n);
    }) : this._prelimContent.splice(t, n);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<YXmlElement|YXmlText|YXmlHook>}
   */
  toArray() {
    return hb(this);
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to append.
   */
  push(t) {
    this.insert(this.length, t);
  }
  /**
   * Prepends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to prepend.
   */
  unshift(t) {
    this.insert(0, t);
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {YXmlElement|YXmlText}
   */
  get(t) {
    return mb(this, t);
  }
  /**
   * Returns a portion of this YXmlFragment into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<YXmlElement|YXmlText>}
   */
  slice(t = 0, n = this.length) {
    return fb(this, t, n);
  }
  /**
   * Executes a provided function on once on every child element.
   *
   * @param {function(YXmlElement|YXmlText,number, typeof self):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    _l(this, t);
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(t) {
    t.writeTypeRef(QB);
  }
}
const MB = (e) => new ms();
class Ma extends ms {
  constructor(t = "UNDEFINED") {
    super(), this.nodeName = t, this._prelimAttrs = /* @__PURE__ */ new Map();
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling() {
    const t = this._item ? this._item.next : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling() {
    const t = this._item ? this._item.prev : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, n) {
    super._integrate(t, n), /** @type {Map<string, any>} */
    this._prelimAttrs.forEach((r, i) => {
      this.setAttribute(i, r);
    }), this._prelimAttrs = null;
  }
  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @return {YXmlElement}
   */
  _copy() {
    return new Ma(this.nodeName);
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlElement<KV>}
   */
  clone() {
    const t = new Ma(this.nodeName), n = this.getAttributes();
    return aF(n, (r, i) => {
      typeof r == "string" && t.setAttribute(i, r);
    }), t.insert(0, this.toArray().map((r) => r instanceof an ? r.clone() : r)), t;
  }
  /**
   * Returns the XML serialization of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {string} The string representation of this type.
   *
   * @public
   */
  toString() {
    const t = this.getAttributes(), n = [], r = [];
    for (const u in t)
      r.push(u);
    r.sort();
    const i = r.length;
    for (let u = 0; u < i; u++) {
      const l = r[u];
      n.push(l + '="' + t[l] + '"');
    }
    const o = this.nodeName.toLocaleLowerCase(), s = n.length > 0 ? " " + n.join(" ") : "";
    return `<${o}${s}>${super.toString()}</${o}>`;
  }
  /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {string} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(t) {
    this.doc !== null ? ct(this.doc, (n) => {
      _d(n, this, t);
    }) : this._prelimAttrs.delete(t);
  }
  /**
   * Sets or updates an attribute.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that is to be set.
   * @param {KV[KEY]} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(t, n) {
    this.doc !== null ? ct(this.doc, (r) => {
      h4(r, this, t, n);
    }) : this._prelimAttrs.set(t, n);
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {KV[KEY]|undefined} The queried attribute value.
   *
   * @public
   */
  getAttribute(t) {
    return (
      /** @type {any} */
      p4(this, t)
    );
  }
  /**
   * Returns whether an attribute exists
   *
   * @param {string} attributeName The attribute name to check for existence.
   * @return {boolean} whether the attribute exists.
   *
   * @public
   */
  hasAttribute(t) {
    return (
      /** @type {any} */
      yb(this, t)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @param {Snapshot} [snapshot]
   * @return {{ [Key in Extract<keyof KV,string>]?: KV[Key]}} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes(t) {
    return (
      /** @type {any} */
      t ? xB(this, t) : Cb(this)
    );
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, n = {}, r) {
    const i = t.createElement(this.nodeName), o = this.getAttributes();
    for (const s in o) {
      const u = o[s];
      typeof u == "string" && i.setAttribute(s, u);
    }
    return _l(this, (s) => {
      i.appendChild(s.toDOM(t, n, r));
    }), r !== void 0 && r._createAssociation(i, this), i;
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(t) {
    t.writeTypeRef(JB), t.writeKey(this.nodeName);
  }
}
const RB = (e) => new Ma(e.readKey());
class OB extends gf {
  /**
   * @param {YXmlElement|YXmlText|YXmlFragment} target The target on which the event is created.
   * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Transaction} transaction The transaction instance with wich the
   *                                  change was created.
   */
  constructor(t, n, r) {
    super(t, r), this.childListChanged = !1, this.attributesChanged = /* @__PURE__ */ new Set(), n.forEach((i) => {
      i === null ? this.childListChanged = !0 : this.attributesChanged.add(i);
    });
  }
}
class Td extends Fa {
  /**
   * @param {string} hookName nodeName of the Dom Node.
   */
  constructor(t) {
    super(), this.hookName = t;
  }
  /**
   * Creates an Item with the same effect as this Item (without position effect)
   */
  _copy() {
    return new Td(this.hookName);
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlHook}
   */
  clone() {
    const t = new Td(this.hookName);
    return this.forEach((n, r) => {
      t.set(r, n);
    }), t;
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object.<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type
   * @return {Element} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, n = {}, r) {
    const i = n[this.hookName];
    let o;
    return i !== void 0 ? o = i.createDom(this) : o = document.createElement(this.hookName), o.setAttribute("data-yjs-hook", this.hookName), r !== void 0 && r._createAssociation(o, this), o;
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(t) {
    t.writeTypeRef(eM), t.writeKey(this.hookName);
  }
}
const $B = (e) => new Td(e.readKey());
class Fd extends Ba {
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling() {
    const t = this._item ? this._item.next : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling() {
    const t = this._item ? this._item.prev : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  _copy() {
    return new Fd();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlText}
   */
  clone() {
    const t = new Fd();
    return t.applyDelta(this.toDelta()), t;
  }
  /**
   * Creates a Dom Element that mirrors this YXmlText.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, n, r) {
    const i = t.createTextNode(this.toString());
    return r !== void 0 && r._createAssociation(i, this), i;
  }
  toString() {
    return this.toDelta().map((t) => {
      const n = [];
      for (const i in t.attributes) {
        const o = [];
        for (const s in t.attributes[i])
          o.push({ key: s, value: t.attributes[i][s] });
        o.sort((s, u) => s.key < u.key ? -1 : 1), n.push({ nodeName: i, attrs: o });
      }
      n.sort((i, o) => i.nodeName < o.nodeName ? -1 : 1);
      let r = "";
      for (let i = 0; i < n.length; i++) {
        const o = n[i];
        r += `<${o.nodeName}`;
        for (let s = 0; s < o.attrs.length; s++) {
          const u = o.attrs[s];
          r += ` ${u.key}="${u.value}"`;
        }
        r += ">";
      }
      r += t.insert;
      for (let i = n.length - 1; i >= 0; i--)
        r += `</${n[i].nodeName}>`;
      return r;
    }).join("");
  }
  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(tM);
  }
}
const LB = (e) => new Fd();
class m4 {
  /**
   * @param {ID} id
   * @param {number} length
   */
  constructor(t, n) {
    this.id = t, this.length = n;
  }
  /**
   * @type {boolean}
   */
  get deleted() {
    throw Kr();
  }
  /**
   * Merge this struct with the item to the right.
   * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
   * Also this method does *not* remove right from StructStore!
   * @param {AbstractStruct} right
   * @return {boolean} wether this merged with right
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   * @param {number} encodingRef
   */
  write(t, n, r) {
    throw Kr();
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, n) {
    throw Kr();
  }
}
const NB = 0;
let or = class extends m4 {
  get deleted() {
    return !0;
  }
  delete() {
  }
  /**
   * @param {GC} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.constructor !== t.constructor ? !1 : (this.length += t.length, !0);
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, n) {
    n > 0 && (this.id.clock += n, this.length -= n), sb(t.doc.store, this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeInfo(NB), t.writeLen(this.length - n);
  }
  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(t, n) {
    return null;
  }
};
class Kl {
  /**
   * @param {Uint8Array} content
   */
  constructor(t) {
    this.content = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.content];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentBinary}
   */
  copy() {
    return new Kl(this.content);
  }
  /**
   * @param {number} offset
   * @return {ContentBinary}
   */
  splice(t) {
    throw Kr();
  }
  /**
   * @param {ContentBinary} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeBuf(this.content);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 3;
  }
}
const zB = (e) => new Kl(e.readBuf());
class Tl {
  /**
   * @param {number} len
   */
  constructor(t) {
    this.len = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.len;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !1;
  }
  /**
   * @return {ContentDeleted}
   */
  copy() {
    return new Tl(this.len);
  }
  /**
   * @param {number} offset
   * @return {ContentDeleted}
   */
  splice(t) {
    const n = new Tl(this.len - t);
    return this.len = t, n;
  }
  /**
   * @param {ContentDeleted} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.len += t.len, !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
    Il(t.deleteSet, n.id.client, n.id.clock, this.len), n.markDeleted();
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeLen(this.len - n);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 1;
  }
}
const jB = (e) => new Tl(e.readLen()), kb = (e, t) => new Ya({ guid: e, ...t, shouldLoad: t.shouldLoad || t.autoLoad || !1 });
class Yl {
  /**
   * @param {Doc} doc
   */
  constructor(t) {
    t._item && console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid."), this.doc = t;
    const n = {};
    this.opts = n, t.gc || (n.gc = !1), t.autoLoad && (n.autoLoad = !0), t.meta !== null && (n.meta = t.meta);
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.doc];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentDoc}
   */
  copy() {
    return new Yl(kb(this.doc.guid, this.opts));
  }
  /**
   * @param {number} offset
   * @return {ContentDoc}
   */
  splice(t) {
    throw Kr();
  }
  /**
   * @param {ContentDoc} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
    this.doc._item = n, t.subdocsAdded.add(this.doc), this.doc.shouldLoad && t.subdocsLoaded.add(this.doc);
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
    t.subdocsAdded.has(this.doc) ? t.subdocsAdded.delete(this.doc) : t.subdocsRemoved.add(this.doc);
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeString(this.doc.guid), t.writeAny(this.opts);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 9;
  }
}
const HB = (e) => new Yl(kb(e.readString(), e.readAny()));
class Ss {
  /**
   * @param {Object} embed
   */
  constructor(t) {
    this.embed = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.embed];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentEmbed}
   */
  copy() {
    return new Ss(this.embed);
  }
  /**
   * @param {number} offset
   * @return {ContentEmbed}
   */
  splice(t) {
    throw Kr();
  }
  /**
   * @param {ContentEmbed} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeJSON(this.embed);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 5;
  }
}
const UB = (e) => new Ss(e.readJSON());
class Xt {
  /**
   * @param {string} key
   * @param {Object} value
   */
  constructor(t, n) {
    this.key = t, this.value = n;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !1;
  }
  /**
   * @return {ContentFormat}
   */
  copy() {
    return new Xt(this.key, this.value);
  }
  /**
   * @param {number} _offset
   * @return {ContentFormat}
   */
  splice(t) {
    throw Kr();
  }
  /**
   * @param {ContentFormat} _right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} _transaction
   * @param {Item} item
   */
  integrate(t, n) {
    const r = (
      /** @type {YText} */
      n.parent
    );
    r._searchMarker = null, r._hasFormatting = !0;
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeKey(this.key), t.writeJSON(this.value);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 6;
  }
}
const VB = (e) => new Xt(e.readKey(), e.readJSON());
class Bd {
  /**
   * @param {Array<any>} arr
   */
  constructor(t) {
    this.arr = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.arr.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.arr;
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentJSON}
   */
  copy() {
    return new Bd(this.arr);
  }
  /**
   * @param {number} offset
   * @return {ContentJSON}
   */
  splice(t) {
    const n = new Bd(this.arr.slice(t));
    return this.arr = this.arr.slice(0, t), n;
  }
  /**
   * @param {ContentJSON} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.arr = this.arr.concat(t.arr), !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    const r = this.arr.length;
    t.writeLen(r - n);
    for (let i = n; i < r; i++) {
      const o = this.arr[i];
      t.writeString(o === void 0 ? "undefined" : JSON.stringify(o));
    }
  }
  /**
   * @return {number}
   */
  getRef() {
    return 2;
  }
}
const GB = (e) => {
  const t = e.readLen(), n = [];
  for (let r = 0; r < t; r++) {
    const i = e.readString();
    i === "undefined" ? n.push(void 0) : n.push(JSON.parse(i));
  }
  return new Bd(n);
};
class gs {
  /**
   * @param {Array<any>} arr
   */
  constructor(t) {
    this.arr = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.arr.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.arr;
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentAny}
   */
  copy() {
    return new gs(this.arr);
  }
  /**
   * @param {number} offset
   * @return {ContentAny}
   */
  splice(t) {
    const n = new gs(this.arr.slice(t));
    return this.arr = this.arr.slice(0, t), n;
  }
  /**
   * @param {ContentAny} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.arr = this.arr.concat(t.arr), !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    const r = this.arr.length;
    t.writeLen(r - n);
    for (let i = n; i < r; i++) {
      const o = this.arr[i];
      t.writeAny(o);
    }
  }
  /**
   * @return {number}
   */
  getRef() {
    return 8;
  }
}
const WB = (e) => {
  const t = e.readLen(), n = [];
  for (let r = 0; r < t; r++)
    n.push(e.readAny());
  return new gs(n);
};
class Zr {
  /**
   * @param {string} str
   */
  constructor(t) {
    this.str = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.str.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.str.split("");
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentString}
   */
  copy() {
    return new Zr(this.str);
  }
  /**
   * @param {number} offset
   * @return {ContentString}
   */
  splice(t) {
    const n = new Zr(this.str.slice(t));
    this.str = this.str.slice(0, t);
    const r = this.str.charCodeAt(t - 1);
    return r >= 55296 && r <= 56319 && (this.str = this.str.slice(0, t - 1) + "�", n.str = "�" + n.str.slice(1)), n;
  }
  /**
   * @param {ContentString} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.str += t.str, !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeString(n === 0 ? this.str : this.str.slice(n));
  }
  /**
   * @return {number}
   */
  getRef() {
    return 4;
  }
}
const KB = (e) => new Zr(e.readString()), YB = [
  DB,
  IB,
  BB,
  RB,
  MB,
  $B,
  LB
], XB = 0, ZB = 1, qB = 2, JB = 3, QB = 4, eM = 5, tM = 6;
class Bi {
  /**
   * @param {AbstractType<any>} type
   */
  constructor(t) {
    this.type = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.type];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentType}
   */
  copy() {
    return new Bi(this.type._copy());
  }
  /**
   * @param {number} offset
   * @return {ContentType}
   */
  splice(t) {
    throw Kr();
  }
  /**
   * @param {ContentType} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
    this.type._integrate(t.doc, n);
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
    let n = this.type._start;
    for (; n !== null; )
      n.deleted ? n.id.clock < (t.beforeState.get(n.id.client) || 0) && t._mergeStructs.push(n) : n.delete(t), n = n.right;
    this.type._map.forEach((r) => {
      r.deleted ? r.id.clock < (t.beforeState.get(r.id.client) || 0) && t._mergeStructs.push(r) : r.delete(t);
    }), t.changed.delete(this.type);
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
    let n = this.type._start;
    for (; n !== null; )
      n.gc(t, !0), n = n.right;
    this.type._start = null, this.type._map.forEach(
      /** @param {Item | null} item */
      (r) => {
        for (; r !== null; )
          r.gc(t, !0), r = r.left;
      }
    ), this.type._map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    this.type._write(t);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 7;
  }
}
const nM = (e) => new Bi(YB[e.readTypeRef()](e)), rM = (e, t) => {
  let n = t, r = 0, i;
  do
    r > 0 && (n = Ge(n.client, n.clock + r)), i = dd(e, n), r = n.clock - i.id.clock, n = i.redone;
  while (n !== null && i instanceof Ct);
  return {
    item: i,
    diff: r
  };
}, g4 = (e, t) => {
  for (; e !== null && e.keep !== t; )
    e.keep = t, e = /** @type {AbstractType<any>} */
    e.parent._item;
}, Md = (e, t, n) => {
  const { client: r, clock: i } = t.id, o = new Ct(
    Ge(r, i + n),
    t,
    Ge(r, i + n - 1),
    t.right,
    t.rightOrigin,
    t.parent,
    t.parentSub,
    t.content.splice(n)
  );
  return t.deleted && o.markDeleted(), t.keep && (o.keep = !0), t.redone !== null && (o.redone = Ge(t.redone.client, t.redone.clock + n)), t.right = o, o.right !== null && (o.right.left = o), e._mergeStructs.push(o), o.parentSub !== null && o.right === null && o.parent._map.set(o.parentSub, o), t.length = n, o;
}, ZE = (e, t) => xT(
  e,
  /** @param {StackItem} s */
  (n) => Gl(n.deletions, t)
), Db = (e, t, n, r, i, o) => {
  const s = e.doc, u = s.store, l = s.clientID, f = t.redone;
  if (f !== null)
    return _n(e, f);
  let h = (
    /** @type {AbstractType<any>} */
    t.parent._item
  ), p = null, g;
  if (h !== null && h.deleted === !0) {
    if (h.redone === null && (!n.has(h) || Db(e, h, n, r, i, o) === null))
      return null;
    for (; h.redone !== null; )
      h = _n(e, h.redone);
  }
  const v = h === null ? (
    /** @type {AbstractType<any>} */
    t.parent
  ) : (
    /** @type {ContentType} */
    h.content.type
  );
  if (t.parentSub === null) {
    for (p = t.left, g = t; p !== null; ) {
      let w = p;
      for (; w !== null && /** @type {AbstractType<any>} */
      w.parent._item !== h; )
        w = w.redone === null ? null : _n(e, w.redone);
      if (w !== null && /** @type {AbstractType<any>} */
      w.parent._item === h) {
        p = w;
        break;
      }
      p = p.left;
    }
    for (; g !== null; ) {
      let w = g;
      for (; w !== null && /** @type {AbstractType<any>} */
      w.parent._item !== h; )
        w = w.redone === null ? null : _n(e, w.redone);
      if (w !== null && /** @type {AbstractType<any>} */
      w.parent._item === h) {
        g = w;
        break;
      }
      g = g.right;
    }
  } else if (g = null, t.right && !i) {
    for (p = t; p !== null && p.right !== null && (p.right.redone || Gl(r, p.right.id) || ZE(o.undoStack, p.right.id) || ZE(o.redoStack, p.right.id)); )
      for (p = p.right; p.redone; ) p = _n(e, p.redone);
    if (p && p.right !== null)
      return null;
  } else
    p = v._map.get(t.parentSub) || null;
  const E = Kt(u, l), y = Ge(l, E), b = new Ct(
    y,
    p,
    p && p.lastId,
    g,
    g && g.id,
    v,
    t.parentSub,
    t.content.copy()
  );
  return t.redone = y, g4(b, !0), b.integrate(e, 0), b;
};
class Ct extends m4 {
  /**
   * @param {ID} id
   * @param {Item | null} left
   * @param {ID | null} origin
   * @param {Item | null} right
   * @param {ID | null} rightOrigin
   * @param {AbstractType<any>|ID|null} parent Is a type if integrated, is null if it is possible to copy parent from left or right, is ID before integration to search for it.
   * @param {string | null} parentSub
   * @param {AbstractContent} content
   */
  constructor(t, n, r, i, o, s, u, l) {
    super(t, l.getLength()), this.origin = r, this.left = n, this.right = i, this.rightOrigin = o, this.parent = s, this.parentSub = u, this.redone = null, this.content = l, this.info = this.content.isCountable() ? kE : 0;
  }
  /**
   * This is used to mark the item as an indexed fast-search marker
   *
   * @type {boolean}
   */
  set marker(t) {
    (this.info & n1) > 0 !== t && (this.info ^= n1);
  }
  get marker() {
    return (this.info & n1) > 0;
  }
  /**
   * If true, do not garbage collect this Item.
   */
  get keep() {
    return (this.info & xE) > 0;
  }
  set keep(t) {
    this.keep !== t && (this.info ^= xE);
  }
  get countable() {
    return (this.info & kE) > 0;
  }
  /**
   * Whether this item was deleted or not.
   * @type {Boolean}
   */
  get deleted() {
    return (this.info & t1) > 0;
  }
  set deleted(t) {
    this.deleted !== t && (this.info ^= t1);
  }
  markDeleted() {
    this.info |= t1;
  }
  /**
   * Return the creator clientID of the missing op or define missing items and return null.
   *
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(t, n) {
    if (this.origin && this.origin.client !== this.id.client && this.origin.clock >= Kt(n, this.origin.client))
      return this.origin.client;
    if (this.rightOrigin && this.rightOrigin.client !== this.id.client && this.rightOrigin.clock >= Kt(n, this.rightOrigin.client))
      return this.rightOrigin.client;
    if (this.parent && this.parent.constructor === Ca && this.id.client !== this.parent.client && this.parent.clock >= Kt(n, this.parent.client))
      return this.parent.client;
    if (this.origin && (this.left = jE(t, n, this.origin), this.origin = this.left.lastId), this.rightOrigin && (this.right = _n(t, this.rightOrigin), this.rightOrigin = this.right.id), this.left && this.left.constructor === or || this.right && this.right.constructor === or)
      this.parent = null;
    else if (!this.parent)
      this.left && this.left.constructor === Ct && (this.parent = this.left.parent, this.parentSub = this.left.parentSub), this.right && this.right.constructor === Ct && (this.parent = this.right.parent, this.parentSub = this.right.parentSub);
    else if (this.parent.constructor === Ca) {
      const r = dd(n, this.parent);
      r.constructor === or ? this.parent = null : this.parent = /** @type {ContentType} */
      r.content.type;
    }
    return null;
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, n) {
    if (n > 0 && (this.id.clock += n, this.left = jE(t, t.doc.store, Ge(this.id.client, this.id.clock - 1)), this.origin = this.left.lastId, this.content = this.content.splice(n), this.length -= n), this.parent) {
      if (!this.left && (!this.right || this.right.left !== null) || this.left && this.left.right !== this.right) {
        let r = this.left, i;
        if (r !== null)
          i = r.right;
        else if (this.parentSub !== null)
          for (i = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null; i !== null && i.left !== null; )
            i = i.left;
        else
          i = /** @type {AbstractType<any>} */
          this.parent._start;
        const o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
        for (; i !== null && i !== this.right; ) {
          if (s.add(i), o.add(i), D0(this.origin, i.origin)) {
            if (i.id.client < this.id.client)
              r = i, o.clear();
            else if (D0(this.rightOrigin, i.rightOrigin))
              break;
          } else if (i.origin !== null && s.has(dd(t.doc.store, i.origin)))
            o.has(dd(t.doc.store, i.origin)) || (r = i, o.clear());
          else
            break;
          i = i.right;
        }
        this.left = r;
      }
      if (this.left !== null) {
        const r = this.left.right;
        this.right = r, this.left.right = this;
      } else {
        let r;
        if (this.parentSub !== null)
          for (r = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null; r !== null && r.left !== null; )
            r = r.left;
        else
          r = /** @type {AbstractType<any>} */
          this.parent._start, this.parent._start = this;
        this.right = r;
      }
      this.right !== null ? this.right.left = this : this.parentSub !== null && (this.parent._map.set(this.parentSub, this), this.left !== null && this.left.delete(t)), this.parentSub === null && this.countable && !this.deleted && (this.parent._length += this.length), sb(t.doc.store, this), this.content.integrate(t, this), UE(
        t,
        /** @type {AbstractType<any>} */
        this.parent,
        this.parentSub
      ), /** @type {AbstractType<any>} */
      (this.parent._item !== null && /** @type {AbstractType<any>} */
      this.parent._item.deleted || this.parentSub !== null && this.right !== null) && this.delete(t);
    } else
      new or(this.id, this.length).integrate(t, 0);
  }
  /**
   * Returns the next non-deleted item
   */
  get next() {
    let t = this.right;
    for (; t !== null && t.deleted; )
      t = t.right;
    return t;
  }
  /**
   * Returns the previous non-deleted item
   */
  get prev() {
    let t = this.left;
    for (; t !== null && t.deleted; )
      t = t.left;
    return t;
  }
  /**
   * Computes the last content address of this Item.
   */
  get lastId() {
    return this.length === 1 ? this.id : Ge(this.id.client, this.id.clock + this.length - 1);
  }
  /**
   * Try to merge two items
   *
   * @param {Item} right
   * @return {boolean}
   */
  mergeWith(t) {
    if (this.constructor === t.constructor && D0(t.origin, this.lastId) && this.right === t && D0(this.rightOrigin, t.rightOrigin) && this.id.client === t.id.client && this.id.clock + this.length === t.id.clock && this.deleted === t.deleted && this.redone === null && t.redone === null && this.content.constructor === t.content.constructor && this.content.mergeWith(t.content)) {
      const n = (
        /** @type {AbstractType<any>} */
        this.parent._searchMarker
      );
      return n && n.forEach((r) => {
        r.p === t && (r.p = this, !this.deleted && this.countable && (r.index -= this.length));
      }), t.keep && (this.keep = !0), this.right = t.right, this.right !== null && (this.right.left = this), this.length += t.length, !0;
    }
    return !1;
  }
  /**
   * Mark this Item as deleted.
   *
   * @param {Transaction} transaction
   */
  delete(t) {
    if (!this.deleted) {
      const n = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      this.countable && this.parentSub === null && (n._length -= this.length), this.markDeleted(), Il(t.deleteSet, this.id.client, this.id.clock, this.length), UE(t, n, this.parentSub), this.content.delete(t);
    }
  }
  /**
   * @param {StructStore} store
   * @param {boolean} parentGCd
   */
  gc(t, n) {
    if (!this.deleted)
      throw Yr();
    this.content.gc(t), n ? sB(t, this, new or(this.id, this.length)) : this.content = new Tl(this.length);
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   */
  write(t, n) {
    const r = n > 0 ? Ge(this.id.client, this.id.clock + n - 1) : this.origin, i = this.rightOrigin, o = this.parentSub, s = this.content.getRef() & ff | (r === null ? 0 : Gn) | // origin is defined
    (i === null ? 0 : Ei) | // right origin is defined
    (o === null ? 0 : xl);
    if (t.writeInfo(s), r !== null && t.writeLeftID(r), i !== null && t.writeRightID(i), r === null && i === null) {
      const u = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      if (u._item !== void 0) {
        const l = u._item;
        if (l === null) {
          const f = iB(u);
          t.writeParentInfo(!0), t.writeString(f);
        } else
          t.writeParentInfo(!1), t.writeLeftID(l.id);
      } else u.constructor === String ? (t.writeParentInfo(!0), t.writeString(u)) : u.constructor === Ca ? (t.writeParentInfo(!1), t.writeLeftID(u)) : Yr();
      o !== null && t.writeString(o);
    }
    this.content.write(t, n);
  }
}
const Ab = (e, t) => iM[t & ff](e), iM = [
  () => {
    Yr();
  },
  // GC is not ItemContent
  jB,
  // 1
  GB,
  // 2
  zB,
  // 3
  KB,
  // 4
  UB,
  // 5
  VB,
  // 6
  nM,
  // 7
  WB,
  // 8
  HB,
  // 9
  () => {
    Yr();
  }
  // 10 - Skip is not ItemContent
], oM = 10;
class sr extends m4 {
  get deleted() {
    return !0;
  }
  delete() {
  }
  /**
   * @param {Skip} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.constructor !== t.constructor ? !1 : (this.length += t.length, !0);
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, n) {
    Yr();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeInfo(oM), Me(t.restEncoder, this.length - n);
  }
  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(t, n) {
    return null;
  }
}
const Ib = (
  /** @type {any} */
  typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : {}
), Pb = "__ $YJS$ __";
Ib[Pb] === !0 && console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");
Ib[Pb] = !0;
const _b = /* @__PURE__ */ new Map();
class sM {
  /**
   * @param {string} room
   */
  constructor(t) {
    this.room = t, this.onmessage = null, this._onChange = (n) => n.key === t && this.onmessage !== null && this.onmessage({ data: kF(n.newValue || "") }), iF(this._onChange);
  }
  /**
   * @param {ArrayBuffer} buf
   */
  postMessage(t) {
    L9.setItem(this.room, xF(CF(t)));
  }
  close() {
    oF(this._onChange);
  }
}
const aM = typeof BroadcastChannel > "u" ? sM : BroadcastChannel, v4 = (e) => ni(_b, e, () => {
  const t = wo(), n = new aM(e);
  return n.onmessage = (r) => t.forEach((i) => i(r.data, "broadcastchannel")), {
    bc: n,
    subs: t
  };
}), uM = (e, t) => (v4(e).subs.add(t), t), lM = (e, t) => {
  const n = v4(e), r = n.subs.delete(t);
  return r && n.subs.size === 0 && (n.bc.close(), _b.delete(e)), r;
}, da = (e, t, n = null) => {
  const r = v4(e);
  r.bc.postMessage(t), r.subs.forEach((i) => i(t, n));
}, Tb = 0, E4 = 1, Fb = 2, Tm = (e, t) => {
  Me(e, Tb);
  const n = nB(t);
  Ot(e, n);
}, Bb = (e, t, n) => {
  Me(e, E4), Ot(e, JF(t, n));
}, cM = (e, t, n) => Bb(t, n, fn(e)), Mb = (e, t, n) => {
  try {
    XF(t, fn(e), n);
  } catch (r) {
    console.error("Caught error while handling a Yjs update", r);
  }
}, dM = (e, t) => {
  Me(e, Fb), Ot(e, t);
}, fM = Mb, hM = (e, t, n, r) => {
  const i = He(e);
  switch (i) {
    case Tb:
      cM(e, t, n);
      break;
    case E4:
      Mb(e, n, r);
      break;
    case Fb:
      fM(e, n, r);
      break;
    default:
      throw new Error("Unknown message type");
  }
  return i;
}, pM = 0, mM = (e, t, n) => {
  switch (He(e)) {
    case pM:
      n(t, vo(e));
  }
}, u1 = 3e4;
class gM extends T9 {
  /**
   * @param {Y.Doc} doc
   */
  constructor(t) {
    super(), this.doc = t, this.clientID = t.clientID, this.states = /* @__PURE__ */ new Map(), this.meta = /* @__PURE__ */ new Map(), this._checkInterval = /** @type {any} */
    setInterval(() => {
      const n = xo();
      this.getLocalState() !== null && u1 / 2 <= n - /** @type {{lastUpdated:number}} */
      this.meta.get(this.clientID).lastUpdated && this.setLocalState(this.getLocalState());
      const r = [];
      this.meta.forEach((i, o) => {
        o !== this.clientID && u1 <= n - i.lastUpdated && this.states.has(o) && r.push(o);
      }), r.length > 0 && C4(this, r, "timeout");
    }, Di(u1 / 10)), t.on("destroy", () => {
      this.destroy();
    }), this.setLocalState({});
  }
  destroy() {
    this.emit("destroy", [this]), this.setLocalState(null), super.destroy(), clearInterval(this._checkInterval);
  }
  /**
   * @return {Object<string,any>|null}
   */
  getLocalState() {
    return this.states.get(this.clientID) || null;
  }
  /**
   * @param {Object<string,any>|null} state
   */
  setLocalState(t) {
    const n = this.clientID, r = this.meta.get(n), i = r === void 0 ? 0 : r.clock + 1, o = this.states.get(n);
    t === null ? this.states.delete(n) : this.states.set(n, t), this.meta.set(n, {
      clock: i,
      lastUpdated: xo()
    });
    const s = [], u = [], l = [], f = [];
    t === null ? f.push(n) : o == null ? t != null && s.push(n) : (u.push(n), sl(o, t) || l.push(n)), (s.length > 0 || l.length > 0 || f.length > 0) && this.emit("change", [{ added: s, updated: l, removed: f }, "local"]), this.emit("update", [{ added: s, updated: u, removed: f }, "local"]);
  }
  /**
   * @param {string} field
   * @param {any} value
   */
  setLocalStateField(t, n) {
    const r = this.getLocalState();
    r !== null && this.setLocalState({
      ...r,
      [t]: n
    });
  }
  /**
   * @return {Map<number,Object<string,any>>}
   */
  getStates() {
    return this.states;
  }
}
const C4 = (e, t, n) => {
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i];
    if (e.states.has(o)) {
      if (e.states.delete(o), o === e.clientID) {
        const s = (
          /** @type {MetaClientState} */
          e.meta.get(o)
        );
        e.meta.set(o, {
          clock: s.clock + 1,
          lastUpdated: xo()
        });
      }
      r.push(o);
    }
  }
  r.length > 0 && (e.emit("change", [{ added: [], updated: [], removed: r }, n]), e.emit("update", [{ added: [], updated: [], removed: r }, n]));
}, al = (e, t, n = e.states) => {
  const r = t.length, i = hn();
  Me(i, r);
  for (let o = 0; o < r; o++) {
    const s = t[o], u = n.get(s) || null, l = (
      /** @type {MetaClientState} */
      e.meta.get(s).clock
    );
    Me(i, s), Me(i, l), us(i, JSON.stringify(u));
  }
  return It(i);
}, vM = (e, t, n) => {
  const r = To(t), i = xo(), o = [], s = [], u = [], l = [], f = He(r);
  for (let h = 0; h < f; h++) {
    const p = He(r);
    let g = He(r);
    const v = JSON.parse(vo(r)), E = e.meta.get(p), y = e.states.get(p), b = E === void 0 ? 0 : E.clock;
    (b < g || b === g && v === null && e.states.has(p)) && (v === null ? p === e.clientID && e.getLocalState() != null ? g++ : e.states.delete(p) : e.states.set(p, v), e.meta.set(p, {
      clock: g,
      lastUpdated: i
    }), E === void 0 && v !== null ? o.push(p) : E !== void 0 && v === null ? l.push(p) : v !== null && (sl(v, y) || u.push(p), s.push(p)));
  }
  (o.length > 0 || u.length > 0 || l.length > 0) && e.emit("change", [{
    added: o,
    updated: u,
    removed: l
  }, n]), (o.length > 0 || s.length > 0 || l.length > 0) && e.emit("update", [{
    added: o,
    updated: s,
    removed: l
  }, n]);
}, EM = (e) => uF(e, (t, n) => `${encodeURIComponent(n)}=${encodeURIComponent(t)}`).join("&"), rs = 0, Rb = 3, ba = 1, CM = 2, Xl = [];
Xl[rs] = (e, t, n, r, i) => {
  Me(e, rs);
  const o = hM(
    t,
    e,
    n.doc,
    n
  );
  r && o === E4 && !n.synced && (n.synced = !0);
};
Xl[Rb] = (e, t, n, r, i) => {
  Me(e, ba), Ot(
    e,
    al(
      n.awareness,
      Array.from(n.awareness.getStates().keys())
    )
  );
};
Xl[ba] = (e, t, n, r, i) => {
  vM(
    n.awareness,
    fn(t),
    n
  );
};
Xl[CM] = (e, t, n, r, i) => {
  mM(
    t,
    n.doc,
    (o, s) => yM(n, s)
  );
};
const qE = 3e4, yM = (e, t) => console.warn(`Permission denied to access ${e.url}.
${t}`), Ob = (e, t, n) => {
  const r = To(t), i = hn(), o = He(r), s = e.messageHandlers[o];
  return /** @type {any} */ s ? s(i, r, e, n, o) : console.error("Unable to compute message"), i;
}, $b = (e) => {
  if (e.shouldConnect && e.ws === null) {
    const t = new e._WS(e.url);
    t.binaryType = "arraybuffer", e.ws = t, e.wsconnecting = !0, e.wsconnected = !1, e.synced = !1, t.onmessage = (n) => {
      e.wsLastMessageReceived = xo();
      const r = Ob(e, new Uint8Array(n.data), !0);
      qg(r) > 1 && t.send(It(r));
    }, t.onerror = (n) => {
      e.emit("connection-error", [n, e]);
    }, t.onclose = (n) => {
      e.emit("connection-close", [n, e]), e.ws = null, e.wsconnecting = !1, e.wsconnected ? (e.wsconnected = !1, e.synced = !1, C4(
        e.awareness,
        Array.from(e.awareness.getStates().keys()).filter(
          (r) => r !== e.doc.clientID
        ),
        e
      ), e.emit("status", [{
        status: "disconnected"
      }])) : e.wsUnsuccessfulReconnects++, setTimeout(
        $b,
        Zg(
          kT(2, e.wsUnsuccessfulReconnects) * 100,
          e.maxBackoffTime
        ),
        e
      );
    }, t.onopen = () => {
      e.wsLastMessageReceived = xo(), e.wsconnecting = !1, e.wsconnected = !0, e.wsUnsuccessfulReconnects = 0, e.emit("status", [{
        status: "connected"
      }]);
      const n = hn();
      if (Me(n, rs), Tm(n, e.doc), t.send(It(n)), e.awareness.getLocalState() !== null) {
        const r = hn();
        Me(r, ba), Ot(
          r,
          al(e.awareness, [
            e.doc.clientID
          ])
        ), t.send(It(r));
      }
    }, e.emit("status", [{
      status: "connecting"
    }]);
  }
}, l1 = (e, t) => {
  const n = e.ws;
  e.wsconnected && n && n.readyState === n.OPEN && n.send(t), e.bcconnected && da(e.bcChannel, t, e);
};
class bM extends T9 {
  /**
   * @param {string} serverUrl
   * @param {string} roomname
   * @param {Y.Doc} doc
   * @param {object} opts
   * @param {boolean} [opts.connect]
   * @param {awarenessProtocol.Awareness} [opts.awareness]
   * @param {Object<string,string>} [opts.params] specify url parameters
   * @param {typeof WebSocket} [opts.WebSocketPolyfill] Optionall provide a WebSocket polyfill
   * @param {number} [opts.resyncInterval] Request server state every `resyncInterval` milliseconds
   * @param {number} [opts.maxBackoffTime] Maximum amount of time to wait before trying to reconnect (we try to reconnect using exponential backoff)
   * @param {boolean} [opts.disableBc] Disable cross-tab BroadcastChannel communication
   */
  constructor(t, n, r, {
    connect: i = !0,
    awareness: o = new gM(r),
    params: s = {},
    WebSocketPolyfill: u = WebSocket,
    resyncInterval: l = -1,
    maxBackoffTime: f = 2500,
    disableBc: h = !1
  } = {}) {
    for (super(); t[t.length - 1] === "/"; )
      t = t.slice(0, t.length - 1);
    this.serverUrl = t, this.bcChannel = t + "/" + n, this.maxBackoffTime = f, this.params = s, this.roomname = n, this.doc = r, this._WS = u, this.awareness = o, this.wsconnected = !1, this.wsconnecting = !1, this.bcconnected = !1, this.disableBc = h, this.wsUnsuccessfulReconnects = 0, this.messageHandlers = Xl.slice(), this._synced = !1, this.ws = null, this.wsLastMessageReceived = 0, this.shouldConnect = i, this._resyncInterval = 0, l > 0 && (this._resyncInterval = /** @type {any} */
    setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const p = hn();
        Me(p, rs), Tm(p, r), this.ws.send(It(p));
      }
    }, l)), this._bcSubscriber = (p, g) => {
      if (g !== this) {
        const v = Ob(this, new Uint8Array(p), !1);
        qg(v) > 1 && da(this.bcChannel, It(v), this);
      }
    }, this._updateHandler = (p, g) => {
      if (g !== this) {
        const v = hn();
        Me(v, rs), dM(v, p), l1(this, It(v));
      }
    }, this.doc.on("update", this._updateHandler), this._awarenessUpdateHandler = ({ added: p, updated: g, removed: v }, E) => {
      const y = p.concat(g).concat(v), b = hn();
      Me(b, ba), Ot(
        b,
        al(o, y)
      ), l1(this, It(b));
    }, this._exitHandler = () => {
      C4(
        this.awareness,
        [r.clientID],
        "app closed"
      );
    }, ko && typeof process < "u" && process.on("exit", this._exitHandler), o.on("update", this._awarenessUpdateHandler), this._checkInterval = /** @type {any} */
    setInterval(() => {
      this.wsconnected && qE < xo() - this.wsLastMessageReceived && this.ws.close();
    }, qE / 10), i && this.connect();
  }
  get url() {
    const t = EM(this.params);
    return this.serverUrl + "/" + this.roomname + (t.length === 0 ? "" : "?" + t);
  }
  /**
   * @type {boolean}
   */
  get synced() {
    return this._synced;
  }
  set synced(t) {
    this._synced !== t && (this._synced = t, this.emit("synced", [t]), this.emit("sync", [t]));
  }
  destroy() {
    this._resyncInterval !== 0 && clearInterval(this._resyncInterval), clearInterval(this._checkInterval), this.disconnect(), ko && typeof process < "u" && process.off("exit", this._exitHandler), this.awareness.off("update", this._awarenessUpdateHandler), this.doc.off("update", this._updateHandler), super.destroy();
  }
  connectBc() {
    if (this.disableBc)
      return;
    this.bcconnected || (uM(this.bcChannel, this._bcSubscriber), this.bcconnected = !0);
    const t = hn();
    Me(t, rs), Tm(t, this.doc), da(this.bcChannel, It(t), this);
    const n = hn();
    Me(n, rs), Bb(n, this.doc), da(this.bcChannel, It(n), this);
    const r = hn();
    Me(r, Rb), da(
      this.bcChannel,
      It(r),
      this
    );
    const i = hn();
    Me(i, ba), Ot(
      i,
      al(this.awareness, [
        this.doc.clientID
      ])
    ), da(
      this.bcChannel,
      It(i),
      this
    );
  }
  disconnectBc() {
    const t = hn();
    Me(t, ba), Ot(
      t,
      al(this.awareness, [
        this.doc.clientID
      ], /* @__PURE__ */ new Map())
    ), l1(this, It(t)), this.bcconnected && (lM(this.bcChannel, this._bcSubscriber), this.bcconnected = !1);
  }
  disconnect() {
    this.shouldConnect = !1, this.disconnectBc(), this.ws !== null && this.ws.close();
  }
  connect() {
    this.shouldConnect = !0, !this.wsconnected && this.ws === null && ($b(this), this.connectBc());
  }
}
const wM = (e, t, n) => new bM(e, t, n, { connect: !0 }), SM = () => new Ya(), Lb = (e) => {
  const t = e.getText("persistanceApiUrl"), n = e.getText("assetsApiUrl"), r = e.getMap("shapes"), i = e.getMap("bindings"), o = e.getMap("assets"), s = new dB([r, i, o]);
  return {
    yPersistanceApiUrl: t,
    yAssetsApiUrl: n,
    yShapes: r,
    yBindings: i,
    yAssets: o,
    undoManager: s
  };
}, xM = (e, t) => {
  const { currentPageId: n } = t.state.appState, { assets: r } = t.document, { shapes: i, bindings: o } = t.document.pages[n], { yShapes: s, yBindings: u, yAssets: l } = Lb(e);
  e.transact(() => {
    s && u && l && (s.clear(), u.clear(), l.clear(), Object.entries(i).forEach(([f, h]) => {
      s.set(h.id, h);
    }), Object.entries(o).forEach(([f, h]) => {
      u.set(h.id, h);
    }), Object.entries(r).forEach(([f, h]) => {
      l.set(h.id, h);
    }));
  });
}, kM = async (e) => await zl.get(e), DM = async (e, t) => await zl.put(e, { data: t }), y4 = (e) => JSON.stringify({
  name: e.state.document.name,
  fileHandle: null,
  document: e.state.document,
  assets: e.state.document.assets
});
function Fm(e) {
  const t = c.useCallback(
    async (r) => {
      if (e)
        return await DM(e, y4(r));
    },
    [e]
  ), n = c.useCallback(
    async (r) => {
      if (!e) return;
      const i = await kM(e);
      i.data.data != "" && (r.loadDocument(JSON.parse(i.data.data).document), r.document.name = i.data.title);
    },
    [e]
  );
  return {
    onSaveProject: t,
    loadDocument: n
  };
}
function AM(e, t) {
  const n = c.useMemo(() => SM(), []), r = c.useMemo(() => wM(e, t, n), [e, t, n]);
  return {
    doc: n,
    provider: r,
    awareness: r.awareness
  };
}
var IM = Object.defineProperty, PM = (e, t, n) => t in e ? IM(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ne = (e, t, n) => (PM(e, typeof t != "symbol" ? t + "" : t, n), n), $e = class {
  static clamp(t, n, r) {
    return Math.max(n, typeof r < "u" ? Math.min(t, r) : t);
  }
  static clampV(t, n, r) {
    return t.map((i) => r ? $e.clamp(i, n, r) : $e.clamp(i, n));
  }
  static cross(t, n, r) {
    return (n[0] - t[0]) * (r[1] - t[1]) - (r[0] - t[0]) * (n[1] - t[1]);
  }
  static snap(t, n = 1) {
    return [Math.round(t[0] / n) * n, Math.round(t[1] / n) * n];
  }
}, P = $e;
Ne(P, "neg", (e) => [-e[0], -e[1]]), Ne(P, "add", (e, t) => [e[0] + t[0], e[1] + t[1]]), Ne(P, "addScalar", (e, t) => [e[0] + t, e[1] + t]), Ne(P, "sub", (e, t) => [e[0] - t[0], e[1] - t[1]]), Ne(P, "subScalar", (e, t) => [e[0] - t, e[1] - t]), Ne(P, "vec", (e, t) => [t[0] - e[0], t[1] - e[1]]), Ne(P, "mul", (e, t) => [e[0] * t, e[1] * t]), Ne(P, "mulV", (e, t) => [e[0] * t[0], e[1] * t[1]]), Ne(P, "div", (e, t) => [e[0] / t, e[1] / t]), Ne(P, "divV", (e, t) => [e[0] / t[0], e[1] / t[1]]), Ne(P, "per", (e) => [e[1], -e[0]]), Ne(P, "dpr", (e, t) => e[0] * t[0] + e[1] * t[1]), Ne(P, "cpr", (e, t) => e[0] * t[1] - t[0] * e[1]), Ne(P, "len2", (e) => e[0] * e[0] + e[1] * e[1]), Ne(P, "len", (e) => Math.hypot(e[0], e[1])), Ne(P, "pry", (e, t) => $e.dpr(e, t) / $e.len(t)), Ne(P, "uni", (e) => $e.div(e, $e.len(e))), Ne(P, "normalize", (e) => $e.uni(e)), Ne(P, "tangent", (e, t) => $e.uni($e.sub(e, t))), Ne(P, "dist2", (e, t) => $e.len2($e.sub(e, t))), Ne(P, "dist", (e, t) => Math.hypot(e[1] - t[1], e[0] - t[0])), Ne(P, "fastDist", (e, t) => {
  let n = [t[0] - e[0], t[1] - e[1]], r = [Math.abs(n[0]), Math.abs(n[1])], i = 1 / Math.max(r[0], r[1]);
  return i = i * (1.29289 - (r[0] + r[1]) * i * 0.29289), [n[0] * i, n[1] * i];
}), Ne(P, "ang", (e, t) => Math.atan2($e.cpr(e, t), $e.dpr(e, t))), Ne(P, "angle", (e, t) => Math.atan2(t[1] - e[1], t[0] - e[0])), Ne(P, "med", (e, t) => $e.mul($e.add(e, t), 0.5)), Ne(P, "rot", (e, t = 0) => [e[0] * Math.cos(t) - e[1] * Math.sin(t), e[0] * Math.sin(t) + e[1] * Math.cos(t)]), Ne(P, "rotWith", (e, t, n = 0) => {
  if (n === 0) return e;
  let r = Math.sin(n), i = Math.cos(n), o = e[0] - t[0], s = e[1] - t[1], u = o * i - s * r, l = o * r + s * i;
  return [u + t[0], l + t[1]];
}), Ne(P, "isEqual", (e, t) => e[0] === t[0] && e[1] === t[1]), Ne(P, "lrp", (e, t, n) => $e.add(e, $e.mul($e.sub(t, e), n))), Ne(P, "int", (e, t, n, r, i = 1) => {
  let o = ($e.clamp(n, r) - n) / (r - n);
  return $e.add($e.mul(e, 1 - o), $e.mul(t, i));
}), Ne(P, "ang3", (e, t, n) => {
  let r = $e.vec(t, e), i = $e.vec(t, n);
  return $e.ang(r, i);
}), Ne(P, "abs", (e) => [Math.abs(e[0]), Math.abs(e[1])]), Ne(P, "rescale", (e, t) => {
  let n = $e.len(e);
  return [t * e[0] / n, t * e[1] / n];
}), Ne(P, "isLeft", (e, t, n) => (t[0] - e[0]) * (n[1] - e[1]) - (n[0] - e[0]) * (t[1] - e[1])), Ne(P, "clockwise", (e, t, n) => $e.isLeft(e, t, n) > 0), Ne(P, "toFixed", (e) => e.map((t) => Math.round(t * 100) / 100)), Ne(P, "nearestPointOnLineThroughPoint", (e, t, n) => $e.add(e, $e.mul(t, $e.pry($e.sub(n, e), t)))), Ne(P, "distanceToLineThroughPoint", (e, t, n) => $e.dist(n, $e.nearestPointOnLineThroughPoint(e, t, n))), Ne(P, "nearestPointOnLineSegment", (e, t, n, r = !0) => {
  let i = $e.uni($e.sub(t, e)), o = $e.add(e, $e.mul(i, $e.pry($e.sub(n, e), i)));
  if (r) {
    if (o[0] < Math.min(e[0], t[0])) return e[0] < t[0] ? e : t;
    if (o[0] > Math.max(e[0], t[0])) return e[0] > t[0] ? e : t;
    if (o[1] < Math.min(e[1], t[1])) return e[1] < t[1] ? e : t;
    if (o[1] > Math.max(e[1], t[1])) return e[1] > t[1] ? e : t;
  }
  return o;
}), Ne(P, "distanceToLineSegment", (e, t, n, r = !0) => $e.dist(n, $e.nearestPointOnLineSegment(e, t, n, r))), Ne(P, "nearestPointOnBounds", (e, t) => [$e.clamp(t[0], e.minX, e.maxX), $e.clamp(t[1], e.minY, e.maxY)]), Ne(P, "distanceToBounds", (e, t) => $e.dist(t, $e.nearestPointOnBounds(e, t))), Ne(P, "nudge", (e, t, n) => $e.isEqual(e, t) ? e : $e.add(e, $e.mul($e.uni($e.sub(t, e)), n))), Ne(P, "nudgeAtAngle", (e, t, n) => [Math.cos(t) * n + e[0], Math.sin(t) * n + e[1]]), Ne(P, "toPrecision", (e, t = 4) => [+e[0].toPrecision(t), +e[1].toPrecision(t)]), Ne(P, "pointsBetween", (e, t, n = 6) => Array.from(Array(n)).map((r, i) => {
  let o = i / (n - 1), s = Math.min(1, 0.5 + Math.abs(0.5 - o));
  return [...$e.lrp(e, t, o), s];
})), Ne(P, "slope", (e, t) => e[0] === t[0] ? NaN : (e[1] - t[1]) / (e[0] - t[0])), Ne(P, "max", (...e) => [Math.max(...e.map((t) => t[0])), Math.max(...e.map((t) => t[1]))]), Ne(P, "min", (...e) => [Math.min(...e.map((t) => t[0])), Math.min(...e.map((t) => t[1]))]);
var oe = P;
function _M(e, t, n) {
  return Math.max(t, Math.min(e, n));
}
const yt = {
  toVector(e, t) {
    return e === void 0 && (e = t), Array.isArray(e) ? e : [e, e];
  },
  add(e, t) {
    return [e[0] + t[0], e[1] + t[1]];
  },
  sub(e, t) {
    return [e[0] - t[0], e[1] - t[1]];
  },
  addTo(e, t) {
    e[0] += t[0], e[1] += t[1];
  },
  subTo(e, t) {
    e[0] -= t[0], e[1] -= t[1];
  }
};
function JE(e, t, n) {
  return t === 0 || Math.abs(t) === 1 / 0 ? Math.pow(e, n * 5) : e * t * n / (t + n * e);
}
function QE(e, t, n, r = 0.15) {
  return r === 0 ? _M(e, t, n) : e < t ? -JE(t - e, n - t, r) + t : e > n ? +JE(e - n, n - t, r) + n : e;
}
function TM(e, [t, n], [r, i]) {
  const [[o, s], [u, l]] = e;
  return [QE(t, o, s, r), QE(n, u, l, i)];
}
function FM(e, t) {
  if (typeof e != "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function BM(e) {
  var t = FM(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function Nt(e, t, n) {
  return t = BM(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function eC(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Pt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? eC(Object(n), !0).forEach(function(r) {
      Nt(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : eC(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
const Nb = {
  pointer: {
    start: "down",
    change: "move",
    end: "up"
  },
  mouse: {
    start: "down",
    change: "move",
    end: "up"
  },
  touch: {
    start: "start",
    change: "move",
    end: "end"
  },
  gesture: {
    start: "start",
    change: "change",
    end: "end"
  }
};
function tC(e) {
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}
const MM = ["enter", "leave"];
function RM(e = !1, t) {
  return e && !MM.includes(t);
}
function OM(e, t = "", n = !1) {
  const r = Nb[e], i = r && r[t] || t;
  return "on" + tC(e) + tC(i) + (RM(n, i) ? "Capture" : "");
}
const $M = ["gotpointercapture", "lostpointercapture"];
function LM(e) {
  let t = e.substring(2).toLowerCase();
  const n = !!~t.indexOf("passive");
  n && (t = t.replace("passive", ""));
  const r = $M.includes(t) ? "capturecapture" : "capture", i = !!~t.indexOf(r);
  return i && (t = t.replace("capture", "")), {
    device: t,
    capture: i,
    passive: n
  };
}
function NM(e, t = "") {
  const n = Nb[e], r = n && n[t] || t;
  return e + r;
}
function Cf(e) {
  return "touches" in e;
}
function zb(e) {
  return Cf(e) ? "touch" : "pointerType" in e ? e.pointerType : "mouse";
}
function zM(e) {
  return Array.from(e.touches).filter((t) => {
    var n, r;
    return t.target === e.currentTarget || ((n = e.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, t.target));
  });
}
function jM(e) {
  return e.type === "touchend" || e.type === "touchcancel" ? e.changedTouches : e.targetTouches;
}
function jb(e) {
  return Cf(e) ? jM(e)[0] : e;
}
function Bm(e, t) {
  try {
    const n = t.clientX - e.clientX, r = t.clientY - e.clientY, i = (t.clientX + e.clientX) / 2, o = (t.clientY + e.clientY) / 2, s = Math.hypot(n, r);
    return {
      angle: -(Math.atan2(n, r) * 180) / Math.PI,
      distance: s,
      origin: [i, o]
    };
  } catch {
  }
  return null;
}
function HM(e) {
  return zM(e).map((t) => t.identifier);
}
function nC(e, t) {
  const [n, r] = Array.from(e.touches).filter((i) => t.includes(i.identifier));
  return Bm(n, r);
}
function c1(e) {
  const t = jb(e);
  return Cf(e) ? t.identifier : t.pointerId;
}
function Ra(e) {
  const t = jb(e);
  return [t.clientX, t.clientY];
}
const rC = 40, iC = 800;
function Hb(e) {
  let {
    deltaX: t,
    deltaY: n,
    deltaMode: r
  } = e;
  return r === 1 ? (t *= rC, n *= rC) : r === 2 && (t *= iC, n *= iC), [t, n];
}
function UM(e) {
  var t, n;
  const {
    scrollX: r,
    scrollY: i,
    scrollLeft: o,
    scrollTop: s
  } = e.currentTarget;
  return [(t = r ?? o) !== null && t !== void 0 ? t : 0, (n = i ?? s) !== null && n !== void 0 ? n : 0];
}
function VM(e) {
  const t = {};
  if ("buttons" in e && (t.buttons = e.buttons), "shiftKey" in e) {
    const {
      shiftKey: n,
      altKey: r,
      metaKey: i,
      ctrlKey: o
    } = e;
    Object.assign(t, {
      shiftKey: n,
      altKey: r,
      metaKey: i,
      ctrlKey: o
    });
  }
  return t;
}
function Rd(e, ...t) {
  return typeof e == "function" ? e(...t) : e;
}
function GM() {
}
function WM(...e) {
  return e.length === 0 ? GM : e.length === 1 ? e[0] : function() {
    let t;
    for (const n of e)
      t = n.apply(this, arguments) || t;
    return t;
  };
}
function oC(e, t) {
  return Object.assign({}, t, e || {});
}
const KM = 32;
class Ub {
  constructor(t, n, r) {
    this.ctrl = t, this.args = n, this.key = r, this.state || (this.state = {}, this.computeValues([0, 0]), this.computeInitial(), this.init && this.init(), this.reset());
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(t) {
    this.ctrl.state[this.key] = t;
  }
  get shared() {
    return this.ctrl.state.shared;
  }
  get eventStore() {
    return this.ctrl.gestureEventStores[this.key];
  }
  get timeoutStore() {
    return this.ctrl.gestureTimeoutStores[this.key];
  }
  get config() {
    return this.ctrl.config[this.key];
  }
  get sharedConfig() {
    return this.ctrl.config.shared;
  }
  get handler() {
    return this.ctrl.handlers[this.key];
  }
  reset() {
    const {
      state: t,
      shared: n,
      ingKey: r,
      args: i
    } = this;
    n[r] = t._active = t.active = t._blocked = t._force = !1, t._step = [!1, !1], t.intentional = !1, t._movement = [0, 0], t._distance = [0, 0], t._direction = [0, 0], t._delta = [0, 0], t._bounds = [[-1 / 0, 1 / 0], [-1 / 0, 1 / 0]], t.args = i, t.axis = void 0, t.memo = void 0, t.elapsedTime = t.timeDelta = 0, t.direction = [0, 0], t.distance = [0, 0], t.overflow = [0, 0], t._movementBound = [!1, !1], t.velocity = [0, 0], t.movement = [0, 0], t.delta = [0, 0], t.timeStamp = 0;
  }
  start(t) {
    const n = this.state, r = this.config;
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = t.target, n.currentTarget = t.currentTarget, n.lastOffset = r.from ? Rd(r.from, n) : n.offset, n.offset = n.lastOffset, n.startTime = n.timeStamp = t.timeStamp);
  }
  computeValues(t) {
    const n = this.state;
    n._values = t, n.values = this.config.transform(t);
  }
  computeInitial() {
    const t = this.state;
    t._initial = t._values, t.initial = t.values;
  }
  compute(t) {
    const {
      state: n,
      config: r,
      shared: i
    } = this;
    n.args = this.args;
    let o = 0;
    if (t && (n.event = t, r.preventDefault && t.cancelable && n.event.preventDefault(), n.type = t.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, VM(t)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, o = t.timeStamp - n.timeStamp, n.timeStamp = t.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const I = n._delta.map(Math.abs);
      yt.addTo(n._distance, I);
    }
    this.axisIntent && this.axisIntent(t);
    const [s, u] = n._movement, [l, f] = r.threshold, {
      _step: h,
      values: p
    } = n;
    if (r.hasCustomTransform ? (h[0] === !1 && (h[0] = Math.abs(s) >= l && p[0]), h[1] === !1 && (h[1] = Math.abs(u) >= f && p[1])) : (h[0] === !1 && (h[0] = Math.abs(s) >= l && Math.sign(s) * l), h[1] === !1 && (h[1] = Math.abs(u) >= f && Math.sign(u) * f)), n.intentional = h[0] !== !1 || h[1] !== !1, !n.intentional) return;
    const g = [0, 0];
    if (r.hasCustomTransform) {
      const [I, B] = p;
      g[0] = h[0] !== !1 ? I - h[0] : 0, g[1] = h[1] !== !1 ? B - h[1] : 0;
    } else
      g[0] = h[0] !== !1 ? s - h[0] : 0, g[1] = h[1] !== !1 ? u - h[1] : 0;
    this.restrictToAxis && !n._blocked && this.restrictToAxis(g);
    const v = n.offset, E = n._active && !n._blocked || n.active;
    E && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, t && (n.first && ("bounds" in r && (n._bounds = Rd(r.bounds, n)), this.setup && this.setup()), n.movement = g, this.computeOffset()));
    const [y, b] = n.offset, [[w, k], [A, T]] = n._bounds;
    n.overflow = [y < w ? -1 : y > k ? 1 : 0, b < A ? -1 : b > T ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const _ = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = TM(n._bounds, n.offset, _), n.delta = yt.sub(n.offset, v), this.computeMovement(), E && (!n.last || o > KM)) {
      n.delta = yt.sub(n.offset, v);
      const I = n.delta.map(Math.abs);
      yt.addTo(n.distance, I), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && o > 0 && (n.velocity = [I[0] / o, I[1] / o], n.timeDelta = o);
    }
  }
  emit() {
    const t = this.state, n = this.shared, r = this.config;
    if (t._active || this.clean(), (t._blocked || !t.intentional) && !t._force && !r.triggerAllEvents) return;
    const i = this.handler(Pt(Pt(Pt({}, n), t), {}, {
      [this.aliasKey]: t.values
    }));
    i !== void 0 && (t.memo = i);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function YM([e, t], n) {
  const r = Math.abs(e), i = Math.abs(t);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class Zl extends Ub {
  constructor(...t) {
    super(...t), Nt(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = yt.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = yt.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(t) {
    const n = this.state, r = this.config;
    if (!n.axis && t) {
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[zb(t)] : r.axisThreshold;
      n.axis = YM(n._movement, i);
    }
    n._blocked = (r.lockDirection || !!r.axis) && !n.axis || !!r.axis && r.axis !== n.axis;
  }
  restrictToAxis(t) {
    if (this.config.axis || this.config.lockDirection)
      switch (this.state.axis) {
        case "x":
          t[1] = 0;
          break;
        case "y":
          t[0] = 0;
          break;
      }
  }
}
const XM = (e) => e, sC = 0.15, Vb = {
  enabled(e = !0) {
    return e;
  },
  eventOptions(e, t, n) {
    return Pt(Pt({}, n.shared.eventOptions), e);
  },
  preventDefault(e = !1) {
    return e;
  },
  triggerAllEvents(e = !1) {
    return e;
  },
  rubberband(e = 0) {
    switch (e) {
      case !0:
        return [sC, sC];
      case !1:
        return [0, 0];
      default:
        return yt.toVector(e);
    }
  },
  from(e) {
    if (typeof e == "function") return e;
    if (e != null) return yt.toVector(e);
  },
  transform(e, t, n) {
    const r = e || n.shared.transform;
    return this.hasCustomTransform = !!r, r || XM;
  },
  threshold(e) {
    return yt.toVector(e, 0);
  }
}, ZM = 0, xs = Pt(Pt({}, Vb), {}, {
  axis(e, t, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection) return n;
  },
  axisThreshold(e = ZM) {
    return e;
  },
  bounds(e = {}) {
    if (typeof e == "function")
      return (o) => xs.bounds(e(o));
    if ("current" in e)
      return () => e.current;
    if (typeof HTMLElement == "function" && e instanceof HTMLElement)
      return e;
    const {
      left: t = -1 / 0,
      right: n = 1 / 0,
      top: r = -1 / 0,
      bottom: i = 1 / 0
    } = e;
    return [[t, n], [r, i]];
  }
}), aC = {
  ArrowRight: (e, t = 1) => [e * t, 0],
  ArrowLeft: (e, t = 1) => [-1 * e * t, 0],
  ArrowUp: (e, t = 1) => [0, -1 * e * t],
  ArrowDown: (e, t = 1) => [0, e * t]
};
class qM extends Zl {
  constructor(...t) {
    super(...t), Nt(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const t = this.state;
    t._pointerId = void 0, t._pointerActive = !1, t._keyboardActive = !1, t._preventScroll = !1, t._delayed = !1, t.swipe = [0, 0], t.tap = !1, t.canceled = !1, t.cancel = this.cancel.bind(this);
  }
  setup() {
    const t = this.state;
    if (t._bounds instanceof HTMLElement) {
      const n = t._bounds.getBoundingClientRect(), r = t.currentTarget.getBoundingClientRect(), i = {
        left: n.left - r.left + t.offset[0],
        right: n.right - r.right + t.offset[0],
        top: n.top - r.top + t.offset[1],
        bottom: n.bottom - r.bottom + t.offset[1]
      };
      t._bounds = xs.bounds(i);
    }
  }
  cancel() {
    const t = this.state;
    t.canceled || (t.canceled = !0, t._active = !1, setTimeout(() => {
      this.compute(), this.emit();
    }, 0));
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean(), this.state._pointerActive = !1, this.state._keyboardActive = !1, super.clean();
  }
  pointerDown(t) {
    const n = this.config, r = this.state;
    if (t.buttons != null && (Array.isArray(n.pointerButtons) ? !n.pointerButtons.includes(t.buttons) : n.pointerButtons !== -1 && n.pointerButtons !== t.buttons)) return;
    const i = this.ctrl.setEventIds(t);
    n.pointerCapture && t.target.setPointerCapture(t.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(t), this.setupPointer(t), r._pointerId = c1(t), r._pointerActive = !0, this.computeValues(Ra(t)), this.computeInitial(), n.preventScrollAxis && zb(t) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(t)) : n.delay > 0 ? (this.setupDelayTrigger(t), n.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
  }
  startPointerDrag(t) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(t), this.emit();
  }
  pointerMove(t) {
    const n = this.state, r = this.config;
    if (!n._pointerActive) return;
    const i = c1(t);
    if (n._pointerId !== void 0 && i !== n._pointerId) return;
    const o = Ra(t);
    if (document.pointerLockElement === t.target ? n._delta = [t.movementX, t.movementY] : (n._delta = yt.sub(o, n._values), this.computeValues(o)), yt.addTo(n._movement, n._delta), this.compute(t), n._delayed && n.intentional) {
      this.timeoutStore.remove("dragDelay"), n.active = !1, this.startPointerDrag(t);
      return;
    }
    if (r.preventScrollAxis && !n._preventScroll)
      if (n.axis)
        if (n.axis === r.preventScrollAxis || r.preventScrollAxis === "xy") {
          n._active = !1, this.clean();
          return;
        } else {
          this.timeoutStore.remove("startPointerDrag"), this.startPointerDrag(t);
          return;
        }
      else
        return;
    this.emit();
  }
  pointerUp(t) {
    this.ctrl.setEventIds(t);
    try {
      this.config.pointerCapture && t.target.hasPointerCapture(t.pointerId) && t.target.releasePointerCapture(t.pointerId);
    } catch {
    }
    const n = this.state, r = this.config;
    if (!n._active || !n._pointerActive) return;
    const i = c1(t);
    if (n._pointerId !== void 0 && i !== n._pointerId) return;
    this.state._pointerActive = !1, this.setActive(), this.compute(t);
    const [o, s] = n._distance;
    if (n.tap = o <= r.tapsThreshold && s <= r.tapsThreshold, n.tap && r.filterTaps)
      n._force = !0;
    else {
      const [u, l] = n._delta, [f, h] = n._movement, [p, g] = r.swipe.velocity, [v, E] = r.swipe.distance, y = r.swipe.duration;
      if (n.elapsedTime < y) {
        const b = Math.abs(u / n.timeDelta), w = Math.abs(l / n.timeDelta);
        b > p && Math.abs(f) > v && (n.swipe[0] = Math.sign(u)), w > g && Math.abs(h) > E && (n.swipe[1] = Math.sign(l));
      }
    }
    this.emit();
  }
  pointerClick(t) {
    !this.state.tap && t.detail > 0 && (t.preventDefault(), t.stopPropagation());
  }
  setupPointer(t) {
    const n = this.config, r = n.device;
    n.pointerLock && t.currentTarget.requestPointerLock(), n.pointerCapture || (this.eventStore.add(this.sharedConfig.window, r, "change", this.pointerMove.bind(this)), this.eventStore.add(this.sharedConfig.window, r, "end", this.pointerUp.bind(this)), this.eventStore.add(this.sharedConfig.window, r, "cancel", this.pointerUp.bind(this)));
  }
  pointerClean() {
    this.config.pointerLock && document.pointerLockElement === this.state.currentTarget && document.exitPointerLock();
  }
  preventScroll(t) {
    this.state._preventScroll && t.cancelable && t.preventDefault();
  }
  setupScrollPrevention(t) {
    this.state._preventScroll = !1, JM(t);
    const n = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
      passive: !1
    });
    this.eventStore.add(this.sharedConfig.window, "touch", "end", n), this.eventStore.add(this.sharedConfig.window, "touch", "cancel", n), this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, t);
  }
  setupDelayTrigger(t) {
    this.state._delayed = !0, this.timeoutStore.add("dragDelay", () => {
      this.state._step = [0, 0], this.startPointerDrag(t);
    }, this.config.delay);
  }
  keyDown(t) {
    const n = aC[t.key];
    if (n) {
      const r = this.state, i = t.shiftKey ? 10 : t.altKey ? 0.1 : 1;
      this.start(t), r._delta = n(this.config.keyboardDisplacement, i), r._keyboardActive = !0, yt.addTo(r._movement, r._delta), this.compute(t), this.emit();
    }
  }
  keyUp(t) {
    t.key in aC && (this.state._keyboardActive = !1, this.setActive(), this.compute(t), this.emit());
  }
  bind(t) {
    const n = this.config.device;
    t(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (t(n, "change", this.pointerMove.bind(this)), t(n, "end", this.pointerUp.bind(this)), t(n, "cancel", this.pointerUp.bind(this)), t("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (t("key", "down", this.keyDown.bind(this)), t("key", "up", this.keyUp.bind(this))), this.config.filterTaps && t("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function JM(e) {
  "persist" in e && typeof e.persist == "function" && e.persist();
}
const ql = typeof window < "u" && window.document && window.document.createElement;
function Gb() {
  return ql && "ontouchstart" in window;
}
function QM() {
  return Gb() || ql && window.navigator.maxTouchPoints > 1;
}
function eR() {
  return ql && "onpointerdown" in window;
}
function tR() {
  return ql && "exitPointerLock" in window.document;
}
function nR() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const rr = {
  isBrowser: ql,
  gesture: nR(),
  touch: Gb(),
  touchscreen: QM(),
  pointer: eR(),
  pointerLock: tR()
}, rR = 250, iR = 180, oR = 0.5, sR = 50, aR = 250, uR = 10, uC = {
  mouse: 0,
  touch: 0,
  pen: 8
}, lR = Pt(Pt({}, xs), {}, {
  device(e, t, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && rr.pointerLock, rr.touch && n ? "touch" : this.pointerLock ? "mouse" : rr.pointer && !i ? "pointer" : rr.touch ? "touch" : "mouse";
  },
  preventScrollAxis(e, t, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && e ? rR : void 0, !(!rr.touchscreen || n === !1))
      return e || (n !== void 0 ? "y" : void 0);
  },
  pointerCapture(e, t, {
    pointer: {
      capture: n = !0,
      buttons: r = 1,
      keys: i = !0
    } = {}
  }) {
    return this.pointerButtons = r, this.keys = i, !this.pointerLock && this.device === "pointer" && n;
  },
  threshold(e, t, {
    filterTaps: n = !1,
    tapsThreshold: r = 3,
    axis: i = void 0
  }) {
    const o = yt.toVector(e, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, o;
  },
  swipe({
    velocity: e = oR,
    distance: t = sR,
    duration: n = aR
  } = {}) {
    return {
      velocity: this.transform(yt.toVector(e)),
      distance: this.transform(yt.toVector(t)),
      duration: n
    };
  },
  delay(e = 0) {
    switch (e) {
      case !0:
        return iR;
      case !1:
        return 0;
      default:
        return e;
    }
  },
  axisThreshold(e) {
    return e ? Pt(Pt({}, uC), e) : uC;
  },
  keyboardDisplacement(e = uR) {
    return e;
  }
});
function Wb(e) {
  const [t, n] = e.overflow, [r, i] = e._delta, [o, s] = e._direction;
  (t < 0 && r > 0 && o < 0 || t > 0 && r < 0 && o > 0) && (e._movement[0] = e._movementBound[0]), (n < 0 && i > 0 && s < 0 || n > 0 && i < 0 && s > 0) && (e._movement[1] = e._movementBound[1]);
}
const cR = 30, dR = 100;
class fR extends Ub {
  constructor(...t) {
    super(...t), Nt(this, "ingKey", "pinching"), Nt(this, "aliasKey", "da");
  }
  init() {
    this.state.offset = [1, 0], this.state.lastOffset = [1, 0], this.state._pointerEvents = /* @__PURE__ */ new Map();
  }
  reset() {
    super.reset();
    const t = this.state;
    t._touchIds = [], t.canceled = !1, t.cancel = this.cancel.bind(this), t.turns = 0;
  }
  computeOffset() {
    const {
      type: t,
      movement: n,
      lastOffset: r
    } = this.state;
    t === "wheel" ? this.state.offset = yt.add(n, r) : this.state.offset = [(1 + n[0]) * r[0], n[1] + r[1]];
  }
  computeMovement() {
    const {
      offset: t,
      lastOffset: n
    } = this.state;
    this.state.movement = [t[0] / n[0], t[1] - n[1]];
  }
  axisIntent() {
    const t = this.state, [n, r] = t._movement;
    if (!t.axis) {
      const i = Math.abs(n) * cR - Math.abs(r);
      i < 0 ? t.axis = "angle" : i > 0 && (t.axis = "scale");
    }
  }
  restrictToAxis(t) {
    this.config.lockDirection && (this.state.axis === "scale" ? t[1] = 0 : this.state.axis === "angle" && (t[0] = 0));
  }
  cancel() {
    const t = this.state;
    t.canceled || setTimeout(() => {
      t.canceled = !0, t._active = !1, this.compute(), this.emit();
    }, 0);
  }
  touchStart(t) {
    this.ctrl.setEventIds(t);
    const n = this.state, r = this.ctrl.touchIds;
    if (n._active && n._touchIds.every((o) => r.has(o)) || r.size < 2) return;
    this.start(t), n._touchIds = Array.from(r).slice(0, 2);
    const i = nC(t, n._touchIds);
    i && this.pinchStart(t, i);
  }
  pointerStart(t) {
    if (t.buttons != null && t.buttons % 2 !== 1) return;
    this.ctrl.setEventIds(t), t.target.setPointerCapture(t.pointerId);
    const n = this.state, r = n._pointerEvents, i = this.ctrl.pointerIds;
    if (n._active && Array.from(r.keys()).every((s) => i.has(s)) || (r.size < 2 && r.set(t.pointerId, t), n._pointerEvents.size < 2)) return;
    this.start(t);
    const o = Bm(...Array.from(r.values()));
    o && this.pinchStart(t, o);
  }
  pinchStart(t, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(t), this.emit();
  }
  touchMove(t) {
    if (!this.state._active) return;
    const n = nC(t, this.state._touchIds);
    n && this.pinchMove(t, n);
  }
  pointerMove(t) {
    const n = this.state._pointerEvents;
    if (n.has(t.pointerId) && n.set(t.pointerId, t), !this.state._active) return;
    const r = Bm(...Array.from(n.values()));
    r && this.pinchMove(t, r);
  }
  pinchMove(t, n) {
    const r = this.state, i = r._values[1], o = n.angle - i;
    let s = 0;
    Math.abs(o) > 270 && (s += Math.sign(o)), this.computeValues([n.distance, n.angle - 360 * s]), r.origin = n.origin, r.turns = s, r._movement = [r._values[0] / r._initial[0] - 1, r._values[1] - r._initial[1]], this.compute(t), this.emit();
  }
  touchEnd(t) {
    this.ctrl.setEventIds(t), this.state._active && this.state._touchIds.some((n) => !this.ctrl.touchIds.has(n)) && (this.state._active = !1, this.compute(t), this.emit());
  }
  pointerEnd(t) {
    const n = this.state;
    this.ctrl.setEventIds(t);
    try {
      t.target.releasePointerCapture(t.pointerId);
    } catch {
    }
    n._pointerEvents.has(t.pointerId) && n._pointerEvents.delete(t.pointerId), n._active && n._pointerEvents.size < 2 && (n._active = !1, this.compute(t), this.emit());
  }
  gestureStart(t) {
    t.cancelable && t.preventDefault();
    const n = this.state;
    n._active || (this.start(t), this.computeValues([t.scale, t.rotation]), n.origin = [t.clientX, t.clientY], this.compute(t), this.emit());
  }
  gestureMove(t) {
    if (t.cancelable && t.preventDefault(), !this.state._active) return;
    const n = this.state;
    this.computeValues([t.scale, t.rotation]), n.origin = [t.clientX, t.clientY];
    const r = n._movement;
    n._movement = [t.scale - 1, t.rotation], n._delta = yt.sub(n._movement, r), this.compute(t), this.emit();
  }
  gestureEnd(t) {
    this.state._active && (this.state._active = !1, this.compute(t), this.emit());
  }
  wheel(t) {
    const n = this.config.modifierKey;
    n && (Array.isArray(n) ? !n.find((r) => t[r]) : !t[n]) || (this.state._active ? this.wheelChange(t) : this.wheelStart(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this)));
  }
  wheelStart(t) {
    this.start(t), this.wheelChange(t);
  }
  wheelChange(t) {
    "uv" in t || t.cancelable && t.preventDefault();
    const r = this.state;
    r._delta = [-Hb(t)[1] / dR * r.offset[0], 0], yt.addTo(r._movement, r._delta), Wb(r), this.state.origin = [t.clientX, t.clientY], this.compute(t), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    const n = this.config.device;
    n && (t(n, "start", this[n + "Start"].bind(this)), t(n, "change", this[n + "Move"].bind(this)), t(n, "end", this[n + "End"].bind(this)), t(n, "cancel", this[n + "End"].bind(this)), t("lostPointerCapture", "", this[n + "End"].bind(this))), this.config.pinchOnWheel && t("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const hR = Pt(Pt({}, Vb), {}, {
  device(e, t, {
    shared: n,
    pointer: {
      touch: r = !1
    } = {}
  }) {
    if (n.target && !rr.touch && rr.gesture) return "gesture";
    if (rr.touch && r) return "touch";
    if (rr.touchscreen) {
      if (rr.pointer) return "pointer";
      if (rr.touch) return "touch";
    }
  },
  bounds(e, t, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (s) => {
      const u = oC(Rd(n, s), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [u.min, u.max];
    }, o = (s) => {
      const u = oC(Rd(r, s), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [u.min, u.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), o()] : (s) => [i(s), o(s)];
  },
  threshold(e, t, n) {
    return this.lockDirection = n.axis === "lock", yt.toVector(e, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(e) {
    return e === void 0 ? "ctrlKey" : e;
  },
  pinchOnWheel(e = !0) {
    return e;
  }
});
class pR extends Zl {
  constructor(...t) {
    super(...t), Nt(this, "ingKey", "moving");
  }
  move(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.state._active ? this.moveChange(t) : this.moveStart(t), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(t) {
    this.start(t), this.computeValues(Ra(t)), this.compute(t), this.computeInitial(), this.emit();
  }
  moveChange(t) {
    if (!this.state._active) return;
    const n = Ra(t), r = this.state;
    r._delta = yt.sub(n, r._values), yt.addTo(r._movement, r._delta), this.computeValues(n), this.compute(t), this.emit();
  }
  moveEnd(t) {
    this.state._active && (this.state._active = !1, this.compute(t), this.emit());
  }
  bind(t) {
    t("pointer", "change", this.move.bind(this)), t("pointer", "leave", this.moveEnd.bind(this));
  }
}
const mR = Pt(Pt({}, xs), {}, {
  mouseOnly: (e = !0) => e
});
class gR extends Zl {
  constructor(...t) {
    super(...t), Nt(this, "ingKey", "scrolling");
  }
  scroll(t) {
    this.state._active || this.start(t), this.scrollChange(t), this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(t) {
    t.cancelable && t.preventDefault();
    const n = this.state, r = UM(t);
    n._delta = yt.sub(r, n._values), yt.addTo(n._movement, n._delta), this.computeValues(r), this.compute(t), this.emit();
  }
  scrollEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("scroll", "", this.scroll.bind(this));
  }
}
const vR = xs;
class ER extends Zl {
  constructor(...t) {
    super(...t), Nt(this, "ingKey", "wheeling");
  }
  wheel(t) {
    this.state._active || this.start(t), this.wheelChange(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(t) {
    const n = this.state;
    n._delta = Hb(t), yt.addTo(n._movement, n._delta), Wb(n), this.compute(t), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("wheel", "", this.wheel.bind(this));
  }
}
const CR = xs;
class yR extends Zl {
  constructor(...t) {
    super(...t), Nt(this, "ingKey", "hovering");
  }
  enter(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.start(t), this.computeValues(Ra(t)), this.compute(t), this.emit());
  }
  leave(t) {
    if (this.config.mouseOnly && t.pointerType !== "mouse") return;
    const n = this.state;
    if (!n._active) return;
    n._active = !1;
    const r = Ra(t);
    n._movement = n._delta = yt.sub(r, n._values), this.computeValues(r), this.compute(t), n.delta = n.movement, this.emit();
  }
  bind(t) {
    t("pointer", "enter", this.enter.bind(this)), t("pointer", "leave", this.leave.bind(this));
  }
}
const bR = Pt(Pt({}, xs), {}, {
  mouseOnly: (e = !0) => e
}), b4 = /* @__PURE__ */ new Map(), Mm = /* @__PURE__ */ new Map();
function wR(e) {
  b4.set(e.key, e.engine), Mm.set(e.key, e.resolver);
}
const SR = {
  key: "drag",
  engine: qM,
  resolver: lR
}, xR = {
  key: "hover",
  engine: yR,
  resolver: bR
}, kR = {
  key: "move",
  engine: pR,
  resolver: mR
}, DR = {
  key: "pinch",
  engine: fR,
  resolver: hR
}, AR = {
  key: "scroll",
  engine: gR,
  resolver: vR
}, IR = {
  key: "wheel",
  engine: ER,
  resolver: CR
};
function PR(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function _R(e, t) {
  if (e == null) return {};
  var n = PR(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
const TR = {
  target(e) {
    if (e)
      return () => "current" in e ? e.current : e;
  },
  enabled(e = !0) {
    return e;
  },
  window(e = rr.isBrowser ? window : void 0) {
    return e;
  },
  eventOptions({
    passive: e = !0,
    capture: t = !1
  } = {}) {
    return {
      passive: e,
      capture: t
    };
  },
  transform(e) {
    return e;
  }
}, FR = ["target", "eventOptions", "window", "enabled", "transform"];
function hd(e = {}, t) {
  const n = {};
  for (const [r, i] of Object.entries(t))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, e[r], r, e);
        break;
      case "object":
        n[r] = hd(e[r], i);
        break;
      case "boolean":
        i && (n[r] = e[r]);
        break;
    }
  return n;
}
function BR(e, t, n = {}) {
  const r = e, {
    target: i,
    eventOptions: o,
    window: s,
    enabled: u,
    transform: l
  } = r, f = _R(r, FR);
  if (n.shared = hd({
    target: i,
    eventOptions: o,
    window: s,
    enabled: u,
    transform: l
  }, TR), t) {
    const h = Mm.get(t);
    n[t] = hd(Pt({
      shared: n.shared
    }, f), h);
  } else
    for (const h in f) {
      const p = Mm.get(h);
      p && (n[h] = hd(Pt({
        shared: n.shared
      }, f[h]), p));
    }
  return n;
}
class Kb {
  constructor(t, n) {
    Nt(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = t, this._gestureKey = n;
  }
  add(t, n, r, i, o) {
    const s = this._listeners, u = NM(n, r), l = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, f = Pt(Pt({}, l), o);
    t.addEventListener(u, i, f);
    const h = () => {
      t.removeEventListener(u, i, f), s.delete(h);
    };
    return s.add(h), h;
  }
  clean() {
    this._listeners.forEach((t) => t()), this._listeners.clear();
  }
}
class MR {
  constructor() {
    Nt(this, "_timeouts", /* @__PURE__ */ new Map());
  }
  add(t, n, r = 140, ...i) {
    this.remove(t), this._timeouts.set(t, window.setTimeout(n, r, ...i));
  }
  remove(t) {
    const n = this._timeouts.get(t);
    n && window.clearTimeout(n);
  }
  clean() {
    this._timeouts.forEach((t) => void window.clearTimeout(t)), this._timeouts.clear();
  }
}
class RR {
  constructor(t) {
    Nt(this, "gestures", /* @__PURE__ */ new Set()), Nt(this, "_targetEventStore", new Kb(this)), Nt(this, "gestureEventStores", {}), Nt(this, "gestureTimeoutStores", {}), Nt(this, "handlers", {}), Nt(this, "config", {}), Nt(this, "pointerIds", /* @__PURE__ */ new Set()), Nt(this, "touchIds", /* @__PURE__ */ new Set()), Nt(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), OR(this, t);
  }
  setEventIds(t) {
    if (Cf(t))
      return this.touchIds = new Set(HM(t)), this.touchIds;
    if ("pointerId" in t)
      return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
  }
  applyHandlers(t, n) {
    this.handlers = t, this.nativeHandlers = n;
  }
  applyConfig(t, n) {
    this.config = BR(t, n, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const t of this.gestures)
      this.gestureEventStores[t].clean(), this.gestureTimeoutStores[t].clean();
  }
  effect() {
    return this.config.shared.target && this.bind(), () => this._targetEventStore.clean();
  }
  bind(...t) {
    const n = this.config.shared, r = {};
    let i;
    if (!(n.target && (i = n.target(), !i))) {
      if (n.enabled) {
        for (const s of this.gestures) {
          const u = this.config[s], l = lC(r, u.eventOptions, !!i);
          if (u.enabled) {
            const f = b4.get(s);
            new f(this, t, s).bind(l);
          }
        }
        const o = lC(r, n.eventOptions, !!i);
        for (const s in this.nativeHandlers)
          o(s, "", (u) => this.nativeHandlers[s](Pt(Pt({}, this.state.shared), {}, {
            event: u,
            args: t
          })), void 0, !0);
      }
      for (const o in r)
        r[o] = WM(...r[o]);
      if (!i) return r;
      for (const o in r) {
        const {
          device: s,
          capture: u,
          passive: l
        } = LM(o);
        this._targetEventStore.add(i, s, "", r[o], {
          capture: u,
          passive: l
        });
      }
    }
  }
}
function ta(e, t) {
  e.gestures.add(t), e.gestureEventStores[t] = new Kb(e, t), e.gestureTimeoutStores[t] = new MR();
}
function OR(e, t) {
  t.drag && ta(e, "drag"), t.wheel && ta(e, "wheel"), t.scroll && ta(e, "scroll"), t.move && ta(e, "move"), t.pinch && ta(e, "pinch"), t.hover && ta(e, "hover");
}
const lC = (e, t, n) => (r, i, o, s = {}, u = !1) => {
  var l, f;
  const h = (l = s.capture) !== null && l !== void 0 ? l : t.capture, p = (f = s.passive) !== null && f !== void 0 ? f : t.passive;
  let g = u ? r : OM(r, i, h);
  n && p && (g += "Passive"), e[g] = e[g] || [], e[g].push(o);
}, $R = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function LR(e) {
  const t = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in e)
    $R.test(i) ? (r.add(RegExp.lastMatch), n[i] = e[i]) : t[i] = e[i];
  return [n, t, r];
}
function na(e, t, n, r, i, o) {
  if (!e.has(n) || !b4.has(r))
    return;
  const s = n + "Start", u = n + "End", l = (f) => {
    let h;
    return f.first && s in t && t[s](f), n in t && (h = t[n](f)), f.last && u in t && t[u](f), h;
  };
  i[r] = l, o[r] = o[r] || {};
}
function NR(e, t) {
  const [n, r, i] = LR(e), o = {};
  return na(i, n, "onDrag", "drag", o, t), na(i, n, "onWheel", "wheel", o, t), na(i, n, "onScroll", "scroll", o, t), na(i, n, "onPinch", "pinch", o, t), na(i, n, "onMove", "move", o, t), na(i, n, "onHover", "hover", o, t), {
    handlers: o,
    config: t,
    nativeHandlers: r
  };
}
function zR(e, t = {}, n, r) {
  const i = ft.useMemo(() => new RR(e), []);
  if (i.applyHandlers(e, r), i.applyConfig(t, n), ft.useEffect(i.effect.bind(i)), ft.useEffect(() => i.clean.bind(i), []), t.target === void 0)
    return i.bind.bind(i);
}
function jR(e) {
  return e.forEach(wR), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: o,
      config: s
    } = NR(n, r || {});
    return zR(i, s, void 0, o);
  };
}
function HR(e, t) {
  return jR([SR, DR, AR, IR, kR, xR])(e, t || {});
}
function cC(e, t, n, r = (i) => i) {
  return e * r(0.5 - t * (0.5 - n));
}
function UR(e) {
  return [-e[0], -e[1]];
}
function wr(e, t) {
  return [e[0] + t[0], e[1] + t[1]];
}
function nr(e, t) {
  return [e[0] - t[0], e[1] - t[1]];
}
function br(e, t) {
  return [e[0] * t, e[1] * t];
}
function VR(e, t) {
  return [e[0] / t, e[1] / t];
}
function Yu(e) {
  return [e[1], -e[0]];
}
function dC(e, t) {
  return e[0] * t[0] + e[1] * t[1];
}
function GR(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}
function WR(e) {
  return Math.hypot(e[0], e[1]);
}
function KR(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function fC(e, t) {
  return KR(nr(e, t));
}
function Yb(e) {
  return VR(e, WR(e));
}
function YR(e, t) {
  return Math.hypot(e[1] - t[1], e[0] - t[0]);
}
function Xu(e, t, n) {
  let r = Math.sin(n), i = Math.cos(n), o = e[0] - t[0], s = e[1] - t[1], u = o * i - s * r, l = o * r + s * i;
  return [u + t[0], l + t[1]];
}
function Rm(e, t, n) {
  return wr(e, br(nr(t, e), n));
}
function hC(e, t, n) {
  return wr(e, br(t, n));
}
var { min: ra, PI: XR } = Math, pC = 0.275, Zu = XR + 1e-4;
function w4(e, t = {}) {
  let { size: n = 16, smoothing: r = 0.5, thinning: i = 0.5, simulatePressure: o = !0, easing: s = (G) => G, start: u = {}, end: l = {}, last: f = !1 } = t, { cap: h = !0, easing: p = (G) => G * (2 - G) } = u, { cap: g = !0, easing: v = (G) => --G * G * G + 1 } = l;
  if (e.length === 0 || n <= 0) return [];
  let E = e[e.length - 1].runningLength, y = u.taper === !1 ? 0 : u.taper === !0 ? Math.max(n, E) : u.taper, b = l.taper === !1 ? 0 : l.taper === !0 ? Math.max(n, E) : l.taper, w = Math.pow(n * r, 2), k = [], A = [], T = e.slice(0, 10).reduce((G, U) => {
    let N = U.pressure;
    if (o) {
      let z = ra(1, U.distance / n), R = ra(1, 1 - z);
      N = ra(1, G + (R - G) * (z * pC));
    }
    return (G + N) / 2;
  }, e[0].pressure), _ = cC(n, i, e[e.length - 1].pressure, s), I, B = e[0].vector, M = e[0].point, H = M, Y = M, J = H, te = !1;
  for (let G = 0; G < e.length; G++) {
    let { pressure: U } = e[G], { point: N, vector: z, distance: R, runningLength: W } = e[G];
    if (G < e.length - 1 && E - W < 3) continue;
    if (i) {
      if (o) {
        let me = ra(1, R / n), et = ra(1, 1 - me);
        U = ra(1, T + (et - T) * (me * pC));
      }
      _ = cC(n, i, U, s);
    } else _ = n / 2;
    I === void 0 && (I = _);
    let ie = W < y ? p(W / y) : 1, le = E - W < b ? v((E - W) / b) : 1;
    _ = Math.max(0.01, _ * Math.min(ie, le));
    let se = (G < e.length - 1 ? e[G + 1] : e[G]).vector, ve = G < e.length - 1 ? dC(z, se) : 1, Pe = dC(z, B) < 0 && !te, we = ve !== null && ve < 0;
    if (Pe || we) {
      let me = br(Yu(B), _);
      for (let et = 1 / 13, Zt = 0; Zt <= 1; Zt += et) Y = Xu(nr(N, me), N, Zu * Zt), k.push(Y), J = Xu(wr(N, me), N, Zu * -Zt), A.push(J);
      M = Y, H = J, we && (te = !0);
      continue;
    }
    if (te = !1, G === e.length - 1) {
      let me = br(Yu(z), _);
      k.push(nr(N, me)), A.push(wr(N, me));
      continue;
    }
    let Ee = br(Yu(Rm(se, z, ve)), _);
    Y = nr(N, Ee), (G <= 1 || fC(M, Y) > w) && (k.push(Y), M = Y), J = wr(N, Ee), (G <= 1 || fC(H, J) > w) && (A.push(J), H = J), T = U, B = z;
  }
  let ee = e[0].point.slice(0, 2), de = e.length > 1 ? e[e.length - 1].point.slice(0, 2) : wr(e[0].point, [1, 1]), he = [], Ce = [];
  if (e.length === 1) {
    if (!(y || b) || f) {
      let G = hC(ee, Yb(Yu(nr(ee, de))), -(I || _)), U = [];
      for (let N = 1 / 13, z = N; z <= 1; z += N) U.push(Xu(G, ee, Zu * 2 * z));
      return U;
    }
  } else {
    if (!(y || b && e.length === 1)) if (h) for (let U = 1 / 13, N = U; N <= 1; N += U) {
      let z = Xu(A[0], ee, Zu * N);
      he.push(z);
    }
    else {
      let U = nr(k[0], A[0]), N = br(U, 0.5), z = br(U, 0.51);
      he.push(nr(ee, N), nr(ee, z), wr(ee, z), wr(ee, N));
    }
    let G = Yu(UR(e[e.length - 1].vector));
    if (b || y && e.length === 1) Ce.push(de);
    else if (g) {
      let U = hC(de, G, _);
      for (let N = 1 / 29, z = N; z < 1; z += N) Ce.push(Xu(U, de, Zu * 3 * z));
    } else Ce.push(wr(de, br(G, _)), wr(de, br(G, _ * 0.99)), nr(de, br(G, _ * 0.99)), nr(de, br(G, _)));
  }
  return k.concat(Ce, A.reverse(), he);
}
function Za(e, t = {}) {
  var n;
  let { streamline: r = 0.5, size: i = 16, last: o = !1 } = t;
  if (e.length === 0) return [];
  let s = 0.15 + (1 - r) * 0.85, u = Array.isArray(e[0]) ? e : e.map(({ x: v, y: E, pressure: y = 0.5 }) => [v, E, y]);
  if (u.length === 2) {
    let v = u[1];
    u = u.slice(0, -1);
    for (let E = 1; E < 5; E++) u.push(Rm(u[0], v, E / 4));
  }
  u.length === 1 && (u = [...u, [...wr(u[0], [1, 1]), ...u[0].slice(2)]]);
  let l = [{ point: [u[0][0], u[0][1]], pressure: u[0][2] >= 0 ? u[0][2] : 0.25, vector: [1, 1], distance: 0, runningLength: 0 }], f = !1, h = 0, p = l[0], g = u.length - 1;
  for (let v = 1; v < u.length; v++) {
    let E = o && v === g ? u[v].slice(0, 2) : Rm(p.point, u[v], s);
    if (GR(p.point, E)) continue;
    let y = YR(E, p.point);
    if (h += y, v < g && !f) {
      if (h < i) continue;
      f = !0;
    }
    p = { point: E, pressure: u[v][2] >= 0 ? u[v][2] : 0.5, vector: Yb(nr(p.point, E)), distance: y, runningLength: h }, l.push(p);
  }
  return l[0].vector = ((n = l[1]) == null ? void 0 : n.vector) || [0, 0], l;
}
function ZR(e, t = {}) {
  return w4(Za(e, t), t);
}
var Jl = ZR, qR = Object.defineProperty, JR = Object.defineProperties, QR = Object.getOwnPropertyDescriptors, mC = Object.getOwnPropertySymbols, eO = Object.prototype.hasOwnProperty, tO = Object.prototype.propertyIsEnumerable, gC = (e, t, n) => t in e ? qR(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, S4 = (e, t) => {
  for (var n in t || (t = {})) eO.call(t, n) && gC(e, n, t[n]);
  if (mC) for (var n of mC(t)) tO.call(t, n) && gC(e, n, t[n]);
  return e;
}, x4 = (e, t) => JR(e, QR(t));
function ht(e, ...t) {
  return { didIntersect: t.length > 0, message: e, points: t };
}
function Fo(e, t, n = 0) {
  let r = [e[0] + t[0] / 2, e[1] + t[1] / 2], i = P.rotWith(e, r, n), o = P.rotWith(P.add(e, [t[0], 0]), r, n), s = P.rotWith(P.add(e, t), r, n), u = P.rotWith(P.add(e, [0, t[1]]), r, n);
  return [["top", [i, o]], ["right", [o, s]], ["bottom", [s, u]], ["left", [u, i]]];
}
function nO(e, t, n) {
  if (n === e || n === t) return !0;
  let r = Math.PI * 2, i = (t - e + r) % r, o = (n - e + r) % r;
  return i <= Math.PI != o > i;
}
function rO(e, t) {
  let n = P.slope(e[0], e[1]), r = P.slope(t[0], t[1]);
  if (n === r) return;
  if (Number.isNaN(n) && !Number.isNaN(r)) return [e[0][0], (e[0][0] - t[0][0]) * r + t[0][1]];
  if (Number.isNaN(r) && !Number.isNaN(n)) return [t[0][0], (t[0][0] - e[0][0]) * n + e[0][1]];
  let i = (n * e[0][0] - r * t[0][0] + t[0][1] - e[0][1]) / (n - r), o = r * (i - t[0][0]) + t[0][1];
  return [i, o];
}
function k4(e, t, n, r) {
  let [i, o] = e, [s, u] = t, [l, f] = n, [h, p] = r;
  if (u / s !== (p - f) / (h - l)) {
    let g = s * (p - f) - u * (h - l);
    if (g !== 0) {
      let v = ((o - f) * (h - l) - (i - l) * (p - f)) / g, E = ((o - f) * s - (i - l) * u) / g;
      if (v >= 0 && E >= 0 && E <= 1) return ht("intersection", [i + v * s, o + v * u]);
    }
  }
  return ht("no intersection");
}
function iO(e, t, n, r, i = 0) {
  return uO(n, r, i, e, t);
}
function Xb(e, t, n, r, i, o) {
  let s = e, u = P.mul(t, 999999999);
  return wa(s, u, n, r, i, o);
}
function pd(e, t, n, r = 0) {
  let { minX: i, minY: o, width: s, height: u } = n;
  return iO(e, t, [i, o], [s, u], r);
}
function Ql(e, t, n, r) {
  let i = P.sub(e, n), o = P.sub(r, n), s = P.sub(t, e), u = o[0] * i[1] - o[1] * i[0], l = s[0] * i[1] - s[1] * i[0], f = o[1] * s[0] - o[0] * s[1];
  if (u === 0 || l === 0) return ht("coincident");
  if (f === 0) return ht("parallel");
  if (f !== 0) {
    let h = u / f, p = l / f;
    if (0 <= h && h <= 1 && 0 <= p && p <= 1) return ht("intersection", P.add(e, P.mul(s, h)));
  }
  return ht("no intersection");
}
function oO(e, t, n, r) {
  return Zb(n, r, e, t);
}
function sO(e, t, n, r, i, o) {
  let s = P.angle(n, i), u = P.angle(n, o), l = yO(n, r, r, 0, e, t);
  if (!l.didIntersect) return ht("no intersection");
  let f = l.points.filter((h) => nO(s, u, P.angle(n, h)));
  return f.length === 0 ? ht("no intersection") : ht("intersection", ...f);
}
function D4(e, t, n, r) {
  let i = (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]), o = 2 * ((t[0] - e[0]) * (e[0] - n[0]) + (t[1] - e[1]) * (e[1] - n[1])), s = n[0] * n[0] + n[1] * n[1] + e[0] * e[0] + e[1] * e[1] - 2 * (n[0] * e[0] + n[1] * e[1]) - r * r, u = o * o - 4 * i * s;
  if (u < 0) return ht("outside");
  if (u === 0) return ht("tangent");
  let l = Math.sqrt(u), f = (-o + l) / (2 * i), h = (-o - l) / (2 * i);
  if ((f < 0 || f > 1) && (h < 0 || h > 1)) return f < 0 && h < 0 || f > 1 && h > 1 ? ht("outside") : ht("inside");
  let p = [];
  return 0 <= f && f <= 1 && p.push(P.lrp(e, t, f)), 0 <= h && h <= 1 && p.push(P.lrp(e, t, h)), ht("intersection", ...p);
}
function wa(e, t, n, r, i, o = 0) {
  if (r === 0 || i === 0 || P.isEqual(e, t)) return ht("no intersection");
  r = r < 0 ? r : -r, i = i < 0 ? i : -i, e = P.sub(P.rotWith(e, n, -o), n), t = P.sub(P.rotWith(t, n, -o), n);
  let s = P.sub(t, e), u = s[0] * s[0] / r / r + s[1] * s[1] / i / i, l = 2 * e[0] * s[0] / r / r + 2 * e[1] * s[1] / i / i, f = e[0] * e[0] / r / r + e[1] * e[1] / i / i - 1, h = [], p = l * l - 4 * u * f;
  if (p === 0) h.push(-l / 2 / u);
  else if (p > 0) {
    let v = Math.sqrt(p);
    h.push((-l + v) / 2 / u), h.push((-l - v) / 2 / u);
  }
  let g = h.filter((v) => v >= 0 && v <= 1).map((v) => P.add(n, P.add(e, P.mul(P.sub(t, e), v)))).map((v) => P.rotWith(v, n, o));
  return ht("intersection", ...g);
}
function A4(e, t, n) {
  return SO(n, e, t);
}
function I4(e, t, n) {
  let r = [];
  for (let i = 1; i < n.length; i++) {
    let o = Ql(e, t, n[i - 1], n[i]);
    o && r.push(...o.points);
  }
  return r.length === 0 ? ht("no intersection") : ht("intersection", ...n);
}
function aO(e, t, n) {
  let r = [];
  for (let i = 1; i < n.length + 1; i++) {
    let o = Ql(e, t, n[i - 1], n[i % n.length]);
    o && r.push(...o.points);
  }
  return r.length === 0 ? ht("no intersection") : ht("intersection", ...n);
}
function uO(e, t, n, r, i) {
  return Fo(e, t, n).reduce((o, [s, [u, l]]) => {
    let f = k4(r, i, u, l);
    return f && o.push(ht(s, ...f.points)), o;
  }, []).filter((o) => o.didIntersect);
}
function Zb(e, t, n, r) {
  return Fo(e, t).reduce((i, [o, [s, u]]) => {
    let l = Ql(n, r, s, u);
    return l && i.push(ht(o, ...l.points)), i;
  }, []).filter((i) => i.didIntersect);
}
function lO(e, t, n, r) {
  return Fo(e, t).reduce((i, [o, [s, u]]) => {
    let l = Zb(n, r, s, u);
    return i.push(...l.map((f) => ht(`${o} ${f.message}`, ...f.points))), i;
  }, []).filter((i) => i.didIntersect);
}
function cO(e, t, n, r, i, o) {
  return Fo(e, t).reduce((s, [u, [l, f]]) => {
    let h = mO(n, r, i, o, l, f);
    return h && s.push(x4(S4({}, h), { message: u })), s;
  }, []).filter((s) => s.didIntersect);
}
function dO(e, t, n, r) {
  return Fo(e, t).reduce((i, [o, [s, u]]) => {
    let l = D4(s, u, n, r);
    return l && i.push(x4(S4({}, l), { message: o })), i;
  }, []).filter((i) => i.didIntersect);
}
function fO(e, t, n, r, i, o = 0) {
  return Fo(e, t).reduce((s, [u, [l, f]]) => {
    let h = wa(l, f, n, r, i, o);
    return h && s.push(x4(S4({}, h), { message: u })), s;
  }, []).filter((s) => s.didIntersect);
}
function hO(e, t, n) {
  return Fo(e, t).reduce((r, [i, [o, s]]) => {
    let u = I4(o, s, n);
    return u.didIntersect && r.push(ht(i, ...u.points)), r;
  }, []).filter((r) => r.didIntersect);
}
function pO(e, t, n) {
  return Fo(e, t).reduce((r, [i, [o, s]]) => {
    let u = aO(o, s, n);
    return u.didIntersect && r.push(ht(i, ...u.points)), r;
  }, []).filter((r) => r.didIntersect);
}
function mO(e, t, n, r, i, o) {
  return sO(i, o, e, t, n, r);
}
function gO(e, t, n, r, i, o) {
  return cO(i, o, e, t, n, r);
}
function vO(e, t, n, r, i) {
  let { minX: o, minY: s, width: u, height: l } = i;
  return gO(e, t, n, r, [o, s], [u, l]);
}
function EO(e, t, n, r) {
  return D4(n, r, e, t);
}
function CO(e, t, n, r) {
  let i = n[0] - e[0], o = n[1] - e[1], s = Math.sqrt(i * i + o * o), u = (s * s - r * r + t * t) / (2 * s), l = Math.sqrt(t * t - u * u);
  return i /= s, o /= s, ht("intersection", [e[0] + i * u - o * l, e[1] + o * u + i * l], [e[0] + i * u + o * l, e[1] + o * u - i * l]);
}
function yO(e, t, n, r = 0, i, o) {
  return t === n ? D4(i, o, e, t) : wa(i, o, e, t, n, r);
}
function bO(e, t, n, r = 0, i, o) {
  return t === n ? dO(i, o, e, t) : fO(i, o, e, t, n, r);
}
function wO(e, t, n, r, i) {
  let { minX: o, minY: s, width: u, height: l } = i;
  return bO(e, t, n, r, [o, s], [u, l]);
}
function SO(e, t, n) {
  let { minX: r, minY: i, width: o, height: s } = e;
  return oO(t, n, [r, i], [o, s]);
}
function xO(e, t) {
  return lO([e.minX, e.minY], [e.width, e.height], [t.minX, t.minY], [t.width, t.height]);
}
function vC(e, t) {
  return DO(t, e);
}
function kO(e, t) {
  return qb(t, e);
}
function DO(e, t) {
  return hO([t.minX, t.minY], [t.width, t.height], e);
}
function qb(e, t) {
  return pO([t.minX, t.minY], [t.width, t.height], e);
}
var AO = Object.defineProperty, IO = Object.defineProperties, PO = Object.getOwnPropertyDescriptors, Od = Object.getOwnPropertySymbols, Jb = Object.prototype.hasOwnProperty, Qb = Object.prototype.propertyIsEnumerable, Om = (e, t, n) => t in e ? AO(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Qe = (e, t) => {
  for (var n in t || (t = {})) Jb.call(t, n) && Om(e, n, t[n]);
  if (Od) for (var n of Od(t)) Qb.call(t, n) && Om(e, n, t[n]);
  return e;
}, Gr = (e, t) => IO(e, PO(t)), qa = (e, t) => {
  var n = {};
  for (var r in e) Jb.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Od) for (var r of Od(e)) t.indexOf(r) < 0 && Qb.call(e, r) && (n[r] = e[r]);
  return n;
}, St = (e, t, n) => (Om(e, typeof t != "symbol" ? t + "" : t, n), n), P4 = c.createContext({});
function mn() {
  return c.useContext(P4);
}
var _O = ((e) => (e.TransformSelected = "transform_selected", e.TranslateSelected = "translate_selected", e.TransformAll = "transform_all", e.TranslateAll = "translate_all", e))(_O || {}), TO = ((e) => (e.Top = "top_edge", e.Right = "right_edge", e.Bottom = "bottom_edge", e.Left = "left_edge", e))(TO || {}), kr = ((e) => (e.TopLeft = "top_left_corner", e.TopRight = "top_right_corner", e.BottomRight = "bottom_right_corner", e.BottomLeft = "bottom_left_corner", e))(kr || {}), FO = ((e) => (e.minX = "minX", e.midX = "midX", e.maxX = "maxX", e.minY = "minY", e.midY = "midY", e.maxY = "maxY", e))(FO || {});
String.prototype.replaceAll || (String.prototype.replaceAll = function(e, t) {
  return Object.prototype.toString.call(e).toLowerCase() === "[object regexp]" ? this.replace(e, t) : this.replace(new RegExp(e, "g"), t);
});
var P0 = Math.PI * 2, Gt = class {
  static lerp(t, n, r) {
    return r = Gt.clamp(r, 0, 1), t * (1 - r) + n * r;
  }
  static lerpColor(t, n, r = 0.5) {
    function i(f) {
      let h = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(f);
      return [parseInt(h[1], 16), parseInt(h[2], 16), parseInt(h[3], 16)];
    }
    function o(f) {
      return "#" + ((1 << 24) + (f[0] << 16) + (f[1] << 8) + f[2]).toString(16).slice(1);
    }
    let s = i(t) || [0, 0, 0], u = i(n) || [0, 0, 0], l = s.slice();
    for (let f = 0; f < 3; f++) l[f] = Math.round(l[f] + r * (u[f] - s[f]));
    return o(l);
  }
  static modulate(t, n, r, i = !1) {
    let [o, s] = n, [u, l] = r, f = u + (t - o) / (s - o) * (l - u);
    return i ? u < l ? Math.max(Math.min(f, l), u) : Math.max(Math.min(f, u), l) : f;
  }
  static clamp(t, n, r) {
    return Math.max(n, typeof r < "u" ? Math.min(t, r) : t);
  }
  static deepClone(t) {
    if (t === null) return t;
    if (Array.isArray(t)) return [...t];
    if (typeof t == "object") {
      let n = Qe({}, t);
      return Object.keys(n).forEach((r) => n[r] = typeof t[r] == "object" ? Gt.deepClone(t[r]) : t[r]), n;
    }
    return t;
  }
  static rng(t = "") {
    let n = 0, r = 0, i = 0, o = 0;
    function s() {
      let u = n ^ n << 11;
      return n = r, r = i, i = o, o ^= (o >>> 19 ^ u ^ u >>> 8) >>> 0, o / 4294967296;
    }
    for (let u = 0; u < t.length + 64; u++) n ^= t.charCodeAt(u) | 0, s();
    return s;
  }
  static pointsToLineSegments(t, n = !1) {
    let r = [];
    for (let i = 1; i < t.length; i++) r.push([t[i - 1], t[i]]);
    return n && r.push([t[t.length - 1], t[0]]), r;
  }
  static getRectangleSides(t, n, r = 0) {
    let i = [t[0] + n[0] / 2, t[1] + n[1] / 2], o = P.rotWith(t, i, r), s = P.rotWith(P.add(t, [n[0], 0]), i, r), u = P.rotWith(P.add(t, n), i, r), l = P.rotWith(P.add(t, [0, n[1]]), i, r);
    return [["top", [o, s]], ["right", [s, u]], ["bottom", [u, l]], ["left", [l, o]]];
  }
  static circleFromThreePoints(t, n, r) {
    let [i, o] = t, [s, u] = n, [l, f] = r, h = i * (u - f) - o * (s - l) + s * f - l * u, p = (i * i + o * o) * (f - u) + (s * s + u * u) * (o - f) + (l * l + f * f) * (u - o), g = (i * i + o * o) * (s - l) + (s * s + u * u) * (l - i) + (l * l + f * f) * (i - s), v = -p / (2 * h), E = -g / (2 * h);
    return [v, E, Math.hypot(v - i, E - o)];
  }
  static perimeterOfEllipse(t, n) {
    let r = Math.pow(t - n, 2) / Math.pow(t + n, 2);
    return Math.PI * (t + n) * (1 + 3 * r / (10 + Math.sqrt(4 - 3 * r)));
  }
  static shortAngleDist(t, n) {
    let r = Math.PI * 2, i = (n - t) % r;
    return 2 * i % r - i;
  }
  static longAngleDist(t, n) {
    return Math.PI * 2 - Gt.shortAngleDist(t, n);
  }
  static lerpAngles(t, n, r) {
    return t + Gt.shortAngleDist(t, n) * r;
  }
  static angleDelta(t, n) {
    return Gt.shortAngleDist(t, n);
  }
  static getSweep(t, n, r) {
    return Gt.angleDelta(P.angle(t, n), P.angle(t, r));
  }
  static clampRadians(t) {
    return (Math.PI * 2 + t) % (Math.PI * 2);
  }
  static snapAngleToSegments(t, n) {
    let r = Math.PI * 2 / n;
    return Math.floor((Gt.clampRadians(t) + r / 2) / r) * r;
  }
  static isAngleBetween(t, n, r) {
    if (r === t || r === n) return !0;
    let i = (n - t + P0) % P0, o = (r - t + P0) % P0;
    return i <= Math.PI != o > i;
  }
  static degreesToRadians(t) {
    return t * Math.PI / 180;
  }
  static radiansToDegrees(t) {
    return t * 180 / Math.PI;
  }
  static getArcLength(t, n, r, i) {
    let o = Gt.getSweep(t, r, i);
    return n * (2 * Math.PI) * (o / (2 * Math.PI));
  }
  static getSweepFlag(t, n, r) {
    let i = P.angle(t, r);
    return (P.angle(t, n) - i + 3 * Math.PI) % (2 * Math.PI) - Math.PI > 0 ? 0 : 1;
  }
  static getLargeArcFlag(t, n, r) {
    let i = P.angle(r, t), o = (P.angle(r, n) - i + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
    return Math.abs(o) > Math.PI / 2 ? 0 : 1;
  }
  static getArcDashOffset(t, n, r, i, o) {
    let s = Gt.getSweepFlag(t, r, i), u = Gt.getArcLength(t, n, r, i);
    return -(s < 0 ? u : 2 * Math.PI * t[2] - u) / 2 + o;
  }
  static getEllipseDashOffset(t, n) {
    return -(2 * Math.PI * t[2]) / 2 + -n;
  }
  static pointInCircle(t, n, r) {
    return P.dist(t, n) <= r;
  }
  static pointInEllipse(t, n, r, i, o = 0) {
    o = o || 0;
    let s = Math.cos(o), u = Math.sin(o), l = P.sub(t, n), f = s * l[0] + u * l[1], h = u * l[0] - s * l[1];
    return f * f / (r * r) + h * h / (i * i) <= 1;
  }
  static pointInRect(t, n) {
    return !(t[0] < n[0] || t[0] > t[0] + n[0] || t[1] < n[1] || t[1] > t[1] + n[1]);
  }
  static pointInPolygon(t, n) {
    let r = 0;
    return n.forEach((i, o) => {
      let s = n[(o + 1) % n.length];
      i[1] <= t[1] ? s[1] > t[1] && P.cross(i, s, t) > 0 && (r += 1) : s[1] <= t[1] && P.cross(i, s, t) < 0 && (r -= 1);
    }), r !== 0;
  }
  static pointInBounds(t, n) {
    return !(t[0] < n.minX || t[0] > n.maxX || t[1] < n.minY || t[1] > n.maxY);
  }
  static pointInPolyline(t, n, r = 3) {
    for (let i = 1; i < n.length; i++) if (P.distanceToLineSegment(n[i - 1], n[i], t) < r) return !0;
    return !1;
  }
  static getBoundsSides(t) {
    return this.getRectangleSides([t.minX, t.minY], [t.width, t.height]);
  }
  static expandBounds(t, n) {
    return { minX: t.minX - n, minY: t.minY - n, maxX: t.maxX + n, maxY: t.maxY + n, width: t.width + n * 2, height: t.height + n * 2 };
  }
  static boundsCollide(t, n) {
    return !(t.maxX < n.minX || t.minX > n.maxX || t.maxY < n.minY || t.minY > n.maxY);
  }
  static boundsContain(t, n) {
    return t.minX < n.minX && t.minY < n.minY && t.maxY > n.maxY && t.maxX > n.maxX;
  }
  static boundsContained(t, n) {
    return Gt.boundsContain(n, t);
  }
  static boundsAreEqual(t, n) {
    return !(n.maxX !== t.maxX || n.minX !== t.minX || n.maxY !== t.maxY || n.minY !== t.minY);
  }
  static getBoundsFromPoints(t, n = 0) {
    let r = 1 / 0, i = 1 / 0, o = -1 / 0, s = -1 / 0;
    if (t.length < 2) r = 0, i = 0, o = 1, s = 1;
    else for (let [u, l] of t) r = Math.min(u, r), i = Math.min(l, i), o = Math.max(u, o), s = Math.max(l, s);
    return n !== 0 ? Gt.getBoundsFromPoints(t.map((u) => P.rotWith(u, [(r + o) / 2, (i + s) / 2], n))) : { minX: r, minY: i, maxX: o, maxY: s, width: Math.max(1, o - r), height: Math.max(1, s - i) };
  }
  static centerBounds(t, n) {
    let r = this.getBoundsCenter(t), i = n[0] - r[0], o = n[1] - r[1];
    return this.translateBounds(t, [i, o]);
  }
  static snapBoundsToGrid(t, n) {
    let r = Math.round(t.minX / n) * n, i = Math.round(t.minY / n) * n, o = Math.round(t.maxX / n) * n, s = Math.round(t.maxY / n) * n;
    return { minX: r, minY: i, maxX: o, maxY: s, width: Math.max(1, o - r), height: Math.max(1, s - i) };
  }
  static translateBounds(t, n) {
    return { minX: t.minX + n[0], minY: t.minY + n[1], maxX: t.maxX + n[0], maxY: t.maxY + n[1], width: t.width, height: t.height };
  }
  static rotateBounds(t, n, r) {
    let [i, o] = P.rotWith([t.minX, t.minY], n, r), [s, u] = P.rotWith([t.maxX, t.maxY], n, r);
    return { minX: i, minY: o, maxX: s, maxY: u, width: t.width, height: t.height };
  }
  static getRotatedEllipseBounds(t, n, r, i, o = 0) {
    let s = Math.cos(o), u = Math.sin(o), l = Math.hypot(r * s, i * u), f = Math.hypot(r * u, i * s);
    return { minX: t + r - l, minY: n + i - f, maxX: t + r + l, maxY: n + i + f, width: l * 2, height: f * 2 };
  }
  static getExpandedBounds(t, n) {
    let r = Math.min(t.minX, n.minX), i = Math.min(t.minY, n.minY), o = Math.max(t.maxX, n.maxX), s = Math.max(t.maxY, n.maxY), u = Math.abs(o - r), l = Math.abs(s - i);
    return { minX: r, minY: i, maxX: o, maxY: s, width: u, height: l };
  }
  static getCommonBounds(t) {
    if (t.length < 2) return t[0];
    let n = t[0];
    for (let r = 1; r < t.length; r++) n = Gt.getExpandedBounds(n, t[r]);
    return n;
  }
  static getRotatedCorners(t, n = 0) {
    let r = [t.minX + t.width / 2, t.minY + t.height / 2];
    return [[t.minX, t.minY], [t.maxX, t.minY], [t.maxX, t.maxY], [t.minX, t.maxY]].map((i) => P.rotWith(i, r, n));
  }
  static getTransformedBoundingBox(t, n, r, i = 0, o = !1) {
    let [s, u] = [t.minX, t.minY], [l, f] = [t.maxX, t.maxY], [h, p] = [t.minX, t.minY], [g, v] = [t.maxX, t.maxY];
    if (n === "center") return { minX: h + r[0], minY: p + r[1], maxX: g + r[0], maxY: v + r[1], width: g - h, height: v - p, scaleX: 1, scaleY: 1 };
    let [E, y] = P.rot(r, -i);
    switch (n) {
      case "top_edge":
      case "top_left_corner":
      case "top_right_corner": {
        p += y;
        break;
      }
      case "bottom_edge":
      case "bottom_left_corner":
      case "bottom_right_corner": {
        v += y;
        break;
      }
    }
    switch (n) {
      case "left_edge":
      case "top_left_corner":
      case "bottom_left_corner": {
        h += E;
        break;
      }
      case "right_edge":
      case "top_right_corner":
      case "bottom_right_corner": {
        g += E;
        break;
      }
    }
    let b = l - s, w = f - u, k = (g - h) / b, A = (v - p) / w, T = k < 0, _ = A < 0, I = Math.abs(g - h), B = Math.abs(v - p);
    if (o) {
      let M = b / w, H = M < I / B, Y = I * (A < 0 ? 1 : -1) * (1 / M), J = B * (k < 0 ? 1 : -1) * M;
      switch (n) {
        case "top_left_corner": {
          H ? p = v + Y : h = g + J;
          break;
        }
        case "top_right_corner": {
          H ? p = v + Y : g = h - J;
          break;
        }
        case "bottom_right_corner": {
          H ? v = p - Y : g = h - J;
          break;
        }
        case "bottom_left_corner": {
          H ? v = p - Y : h = g + J;
          break;
        }
        case "bottom_edge":
        case "top_edge": {
          let te = (h + g) / 2, ee = B * M;
          h = te - ee / 2, g = te + ee / 2;
          break;
        }
        case "left_edge":
        case "right_edge": {
          let te = (p + v) / 2, ee = I / M;
          p = te - ee / 2, v = te + ee / 2;
          break;
        }
      }
    }
    if (i % (Math.PI * 2) !== 0) {
      let M = [0, 0], H = P.med([s, u], [l, f]), Y = P.med([h, p], [g, v]);
      switch (n) {
        case "top_left_corner": {
          M = P.sub(P.rotWith([g, v], Y, i), P.rotWith([l, f], H, i));
          break;
        }
        case "top_right_corner": {
          M = P.sub(P.rotWith([h, v], Y, i), P.rotWith([s, f], H, i));
          break;
        }
        case "bottom_right_corner": {
          M = P.sub(P.rotWith([h, p], Y, i), P.rotWith([s, u], H, i));
          break;
        }
        case "bottom_left_corner": {
          M = P.sub(P.rotWith([g, p], Y, i), P.rotWith([l, u], H, i));
          break;
        }
        case "top_edge": {
          M = P.sub(P.rotWith(P.med([h, v], [g, v]), Y, i), P.rotWith(P.med([s, f], [l, f]), H, i));
          break;
        }
        case "left_edge": {
          M = P.sub(P.rotWith(P.med([g, p], [g, v]), Y, i), P.rotWith(P.med([l, u], [l, f]), H, i));
          break;
        }
        case "bottom_edge": {
          M = P.sub(P.rotWith(P.med([h, p], [g, p]), Y, i), P.rotWith(P.med([s, u], [l, u]), H, i));
          break;
        }
        case "right_edge": {
          M = P.sub(P.rotWith(P.med([h, p], [h, v]), Y, i), P.rotWith(P.med([s, u], [s, f]), H, i));
          break;
        }
      }
      [h, p] = P.sub([h, p], M), [g, v] = P.sub([g, v], M);
    }
    return g < h && ([g, h] = [h, g]), v < p && ([v, p] = [p, v]), { minX: h, minY: p, maxX: g, maxY: v, width: g - h, height: v - p, scaleX: (g - h) / (l - s || 1) * (T ? -1 : 1), scaleY: (v - p) / (f - u || 1) * (_ ? -1 : 1) };
  }
  static getTransformAnchor(t, n, r) {
    let i = t;
    switch (t) {
      case "top_left_corner": {
        n && r ? i = "bottom_right_corner" : n ? i = "top_right_corner" : r ? i = "bottom_left_corner" : i = "bottom_right_corner";
        break;
      }
      case "top_right_corner": {
        n && r ? i = "bottom_left_corner" : n ? i = "top_left_corner" : r ? i = "bottom_right_corner" : i = "bottom_left_corner";
        break;
      }
      case "bottom_right_corner": {
        n && r ? i = "top_left_corner" : n ? i = "bottom_left_corner" : r ? i = "top_right_corner" : i = "top_left_corner";
        break;
      }
      case "bottom_left_corner": {
        n && r ? i = "top_right_corner" : n ? i = "bottom_right_corner" : r ? i = "top_left_corner" : i = "top_right_corner";
        break;
      }
    }
    return i;
  }
  static getRelativeTransformedBoundingBox(t, n, r, i, o) {
    let s = (i ? n.maxX - r.maxX : r.minX - n.minX) / n.width, u = (o ? n.maxY - r.maxY : r.minY - n.minY) / n.height, l = r.width / n.width, f = r.height / n.height, h = t.minX + t.width * s, p = t.minY + t.height * u, g = t.width * l, v = t.height * f;
    return { minX: h, minY: p, maxX: h + g, maxY: p + v, width: g, height: v };
  }
  static getRotatedSize(t, n) {
    let r = P.div(t, 2), i = [[0, 0], [t[0], 0], t, [0, t[1]]].map((s) => P.rotWith(s, r, n)), o = Gt.getBoundsFromPoints(i);
    return [o.width, o.height];
  }
  static getBoundsCenter(t) {
    return [t.minX + t.width / 2, t.minY + t.height / 2];
  }
  static getBoundsWithCenter(t) {
    let n = Gt.getBoundsCenter(t);
    return Gr(Qe({}, t), { midX: n[0], midY: n[1] });
  }
  static getCommonTopLeft(t) {
    let n = [1 / 0, 1 / 0];
    return t.forEach((r) => {
      n[0] = Math.min(n[0], r[0]), n[1] = Math.min(n[1], r[1]);
    }), n;
  }
  static getFromCache(t, n, r) {
    let i = t.get(n);
    if (i === void 0 && (t.set(n, r()), i = t.get(n), i === void 0)) throw Error("Cache did not include item!");
    return i;
  }
  static uniqueId(t = "") {
    return t ? ((Number(t) ^ Math.random() * 16) >> Number(t) / 4).toString(16) : `10000000-1000-4000-8000-${1e11}`.replace(/[018]/g, Gt.uniqueId);
  }
  static rotateArray(t, n) {
    return t.map((r, i) => t[(i + n) % t.length]);
  }
  static debounce(t, n = 0) {
    let r;
    return function(...i) {
      clearTimeout(r), r = setTimeout(() => t.apply(i), n);
    };
  }
  static getSvgPathFromStroke(t, n = !0) {
    let r = t.length;
    if (r < 4) return "";
    let i = t[0], o = t[1], s = t[2], u = `M${i[0].toFixed(2)},${i[1].toFixed(2)} Q${o[0].toFixed(2)},${o[1].toFixed(2)} ${so(o[0], s[0]).toFixed(2)},${so(o[1], s[1]).toFixed(2)} T`;
    for (let l = 2, f = r - 1; l < f; l++) i = t[l], o = t[l + 1], u += `${so(i[0], o[0]).toFixed(2)},${so(i[1], o[1]).toFixed(2)} `;
    return n && (u += "Z"), u;
  }
  static getSvgPathFromStrokePoints(t, n = !1) {
    let r = t.length;
    if (r < 4) return "";
    let i = t[0].point, o = t[1].point, s = t[2].point, u = `M${i[0].toFixed(2)},${i[1].toFixed(2)} Q${o[0].toFixed(2)},${o[1].toFixed(2)} ${so(o[0], s[0]).toFixed(2)},${so(o[1], s[1]).toFixed(2)} T`;
    for (let l = 2, f = r - 1; l < f; l++) i = t[l].point, o = t[l + 1].point, u += `${so(i[0], o[0]).toFixed(2)},${so(i[1], o[1]).toFixed(2)} `;
    return n && (u += "Z"), u;
  }
  static getPerfectDashProps(t, n, r, i = 1, o = !0, s = 2) {
    let u, l, f;
    if (r.toLowerCase() === "dashed") u = n * s, f = 1, l = o ? (u / 2).toString() : "0";
    else if (r.toLowerCase() === "dotted") u = n / 100, f = 100, l = "0";
    else return { strokeDasharray: "none", strokeDashoffset: "none" };
    let h = Math.floor(t / u / (2 * f));
    h -= h % i, h = Math.max(h, 4);
    let p = Math.max(u, (t - h * u) / (o ? h : h - 1));
    return { strokeDasharray: [u, p].join(" "), strokeDashoffset: l };
  }
  static isMobileSafari() {
    if (typeof window > "u") return !1;
    let t = window.navigator.userAgent, n = !!t.match(/iPad/i) || !!t.match(/iPhone/i), r = !!t.match(/WebKit/i);
    return n && r && !t.match(/CriOS/i);
  }
  static throttle(t, n) {
    let r, i;
    return function(...o) {
      return r || (r = !0, setTimeout(() => r = !1, n), i = t(...o)), i;
    };
  }
  static isDarwin() {
    return /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
  }
  static metaKey(t) {
    return Gt.isDarwin() ? t.metaKey : t.ctrlKey;
  }
  static lns(t) {
    let n = t.split("");
    return n.push(...n.splice(0, Math.round(n.length / 5))), n.push(...n.splice(0, Math.round(n.length / 4))), n.push(...n.splice(0, Math.round(n.length / 3))), n.push(...n.splice(0, Math.round(n.length / 2))), n.reverse().map((r) => +r ? +r < 5 ? 5 + +r : +r > 5 ? +r - 5 : r : r).join("");
  }
}, $ = Gt;
St($, "getSnapPoints", (e, t, n) => {
  let r = Qe({}, e), i = [0, 0], o = [], s = { minX: { id: "minX", isSnapped: !1 }, midX: { id: "midX", isSnapped: !1 }, maxX: { id: "maxX", isSnapped: !1 }, minY: { id: "minY", isSnapped: !1 }, midY: { id: "midY", isSnapped: !1 }, maxY: { id: "maxY", isSnapped: !1 } }, u = ["midX", "minX", "maxX"], l = ["midY", "minY", "maxY"], f = t.map((E) => {
    let y = u.flatMap((w, k) => u.map((A, T) => {
      let _ = r[w] - E[A], I = Math.abs(_);
      return { f: w, t: A, gap: _, distance: I, isCareful: k === 0 || k + T === 3 };
    })), b = l.flatMap((w, k) => l.map((A, T) => {
      let _ = r[w] - E[A], I = Math.abs(_);
      return { f: w, t: A, gap: _, distance: I, isCareful: k === 0 || k + T === 3 };
    }));
    return [E, y, b];
  }), h = 1 / 0, p = 1 / 0, g = 1 / 0, v = 1 / 0;
  return f.forEach(([E, y, b]) => {
    y.forEach((w) => {
      w.distance < n && w.distance < g && (g = w.distance, h = w.gap);
    }), b.forEach((w) => {
      w.distance < n && w.distance < v && (v = w.distance, p = w.gap);
    });
  }), f.forEach(([E, y, b]) => {
    h !== 1 / 0 && y.forEach((w) => {
      Math.abs(w.gap - h) < 2 && (s[w.f] = Gr(Qe({}, s[w.f]), { isSnapped: !0, to: E[w.t], B: E, distance: w.distance }));
    }), p !== 1 / 0 && b.forEach((w) => {
      Math.abs(w.gap - p) < 2 && (s[w.f] = Gr(Qe({}, s[w.f]), { isSnapped: !0, to: E[w.t], B: E, distance: w.distance }));
    });
  }), i[0] = h === 1 / 0 ? 0 : h, i[1] = p === 1 / 0 ? 0 : p, r.minX -= i[0], r.midX -= i[0], r.maxX -= i[0], r.minY -= i[1], r.midY -= i[1], r.maxY -= i[1], u.forEach((E) => {
    let y = s[E];
    if (!y.isSnapped) return;
    let { id: b, B: w } = y, k = r[b];
    o.push(b === "minX" ? [[k, r.midY], [k, w.minY], [k, w.maxY]] : [[k, r.minY], [k, r.maxY], [k, w.minY], [k, w.maxY]]);
  }), l.forEach((E) => {
    let y = s[E];
    if (!y.isSnapped) return;
    let { id: b, B: w } = y, k = r[b];
    o.push(b === "midY" ? [[r.midX, k], [w.minX, k], [w.maxX, k]] : [[r.minX, k], [r.maxX, k], [w.minX, k], [w.maxX, k]]);
  }), { offset: i, snapLines: o };
}), St($, "deepMerge", (e, t) => {
  let n = Qe({}, e), r = Object.entries(t);
  for (let [i, o] of r) n[i] = o === Object(o) && !Array.isArray(o) ? Gt.deepMerge(n[i], o) : o;
  return n;
});
function so(e, t) {
  return (e + t) / 2;
}
var Hn = $;
function BO(e, t) {
  let n = c.useRef(void 0), r = c.useRef(void 0), i = c.useRef([0, 0]), o = c.useRef(0), { inputs: s, bounds: u, callbacks: l } = mn();
  c.useEffect(() => {
    let v = (E) => E.preventDefault();
    return document.addEventListener("gesturestart", v), document.addEventListener("gesturechange", v), () => {
      document.removeEventListener("gesturestart", v), document.removeEventListener("gesturechange", v);
    };
  }, []);
  let f = c.useCallback(({ event: v }) => {
    var E, y, b, w;
    if (v.preventDefault(), s.isPinching || v.timeStamp <= o.current) return;
    o.current = v.timeStamp;
    let [k, A, T] = MO(v);
    if ((v.altKey || v.ctrlKey || v.metaKey) && v.buttons === 0) {
      let B = [...(y = (E = s.pointer) == null ? void 0 : E.point) != null ? y : [u.width / 2, u.height / 2], T * 0.618], M = s.pan(B, v);
      (b = l.onZoom) == null || b.call(l, Gr(Qe({}, M), { delta: B }), v);
      return;
    }
    let _ = P.mul(v.shiftKey && !Hn.isDarwin() ? [A, 0] : [k, A], 0.5);
    if (P.isEqual(_, [0, 0])) return;
    let I = s.pan(_, v);
    (w = l.onPan) == null || w.call(l, I, v);
  }, [l, s, u]), h = c.useCallback(({ origin: v, event: E }) => {
    var y;
    if (E instanceof WheelEvent) return;
    let b = t.current;
    if (!b || !(E.target === b || b.contains(E.target))) return;
    let w = s.pinch(v, v);
    s.isPinching = !0, (y = l.onPinchStart) == null || y.call(l, w, E), r.current = w.point, n.current = w.origin, i.current = [0, 0];
  }, [l, s, u]), p = c.useCallback(({ origin: v, offset: E, event: y }) => {
    var b;
    if (y instanceof WheelEvent) return;
    let w = t.current;
    if (!(y.target === w || w != null && w.contains(y.target)) || !n.current) return;
    let k = s.pinch(v, n.current), A = P.sub(k.delta, i.current);
    i.current = k.delta, (b = l.onPinch) == null || b.call(l, Gr(Qe({}, k), { point: k.point, origin: n.current, delta: [...A, E[0]] }), y), r.current = v;
  }, [l, s, u]), g = c.useCallback(({ origin: v, event: E }) => {
    var y;
    let b = t.current;
    if (!(E.target === b || b != null && b.contains(E.target))) return;
    let w = s.pinch(v, v);
    s.isPinching = !1, (y = l.onPinchEnd) == null || y.call(l, w, E), r.current = void 0, n.current = void 0, i.current = [0, 0];
  }, []);
  HR({ onWheel: f, onPinchStart: h, onPinch: p, onPinchEnd: g }, { target: t, eventOptions: { passive: !1 }, pinch: { from: [e.current, 0], scaleBounds: () => ({ from: e.current, max: 5, min: 0.1 }) } });
}
var EC = 10;
function MO(e) {
  let { deltaY: t, deltaX: n } = e, r = 0;
  if (e.ctrlKey || e.metaKey) {
    let i = Math.sign(e.deltaY), o = Math.abs(e.deltaY), s = t;
    o > EC && (s = EC * i), r = s;
  }
  return [n, t, r];
}
function RO() {
  let { callbacks: e } = mn();
  c.useEffect(() => {
    function t() {
      var n;
      (n = e.onShapeBlur) == null || n.call(e);
    }
    return Hn.isMobileSafari() ? (document.addEventListener("focusout", t), () => document.removeEventListener("focusout", t)) : () => null;
  }, [e]);
}
function OO() {
  let { callbacks: e, inputs: t } = mn();
  return c.useMemo(() => ({ onPointerDown: (n) => {
    var r, i, o;
    if (n.dead || (n.dead = !0, !t.pointerIsValid(n))) return;
    if (n.currentTarget.setPointerCapture(n.pointerId), n.button === 2) {
      (r = e.onRightPointCanvas) == null || r.call(e, t.pointerDown(n, "canvas"), n);
      return;
    }
    let s = t.pointerDown(n, "canvas");
    n.button === 0 && ((i = e.onPointCanvas) == null || i.call(e, s, n)), (o = e.onPointerDown) == null || o.call(e, s, n);
  }, onPointerMove: (n) => {
    var r, i;
    if (n.dead || (n.dead = !0, !t.pointerIsValid(n))) return;
    let o = t.pointerMove(n, "canvas");
    n.buttons === 1 && n.currentTarget.hasPointerCapture(n.pointerId) && ((r = e.onDragCanvas) == null || r.call(e, o, n)), (i = e.onPointerMove) == null || i.call(e, o, n);
  }, onPointerUp: (n) => {
    var r, i, o, s, u;
    if (n.dead || (n.dead = !0, t.activePointer = void 0, !t.pointerIsValid(n))) return;
    let l = t.isDoubleClick(), f = t.pointerUp(n, "canvas");
    if (n.button === 2) {
      (r = e.onPointerUp) == null || r.call(e, f, n);
      return;
    }
    n.currentTarget.hasPointerCapture(n.pointerId) && ((i = n.currentTarget) == null || i.releasePointerCapture(n.pointerId)), n.button === 0 && (l && !(f.altKey || f.metaKey) && ((o = e.onDoubleClickCanvas) == null || o.call(e, f, n)), (s = e.onReleaseCanvas) == null || s.call(e, f, n)), (u = e.onPointerUp) == null || u.call(e, f, n);
  }, onDrop: e.onDrop, onDragOver: e.onDragOver }), [e, t]);
}
function $O(e) {
  let { rPageState: t, rSelectionBounds: n, callbacks: r, inputs: i } = c.useContext(P4);
  return c.useMemo(() => ({ onPointerDown: (o) => {
    var s, u, l, f, h, p, g;
    if (o.dead || (o.dead = !0, !i.pointerIsValid(o))) return;
    if (o.button === 2) {
      (s = r.onRightPointShape) == null || s.call(r, i.pointerDown(o, e), o);
      return;
    }
    let v = i.pointerDown(o, e);
    if ((u = o.currentTarget) == null || u.setPointerCapture(o.pointerId), n.current && $.pointInBounds(v.point, n.current) && !t.current.selectedIds.includes(e)) {
      o.button === 0 && ((l = r.onPointBounds) == null || l.call(r, i.pointerDown(o, "bounds"), o), (f = r.onPointShape) == null || f.call(r, v, o)), (h = r.onPointerDown) == null || h.call(r, v, o);
      return;
    }
    o.button === 0 && ((p = r.onPointShape) == null || p.call(r, v, o)), (g = r.onPointerDown) == null || g.call(r, v, o);
  }, onPointerUp: (o) => {
    var s, u, l, f;
    if (o.dead || (o.dead = !0, !i.pointerIsValid(o)) || o.button === 2) return;
    i.activePointer = void 0;
    let h = i.isDoubleClick(), p = i.pointerUp(o, e);
    o.pointerId && o.currentTarget.hasPointerCapture(o.pointerId) && ((s = o.currentTarget) == null || s.releasePointerCapture(o.pointerId)), o.button === 0 && (h && !(p.altKey || p.metaKey) && ((u = r.onDoubleClickShape) == null || u.call(r, p, o)), (l = r.onReleaseShape) == null || l.call(r, p, o)), (f = r.onPointerUp) == null || f.call(r, p, o);
  }, onPointerMove: (o) => {
    var s, u;
    if (o.dead || (o.dead = !0, o.buttons === 2 || !i.pointerIsValid(o) || i.pointer && o.pointerId !== i.pointer.pointerId)) return;
    let l = i.pointerMove(o, e);
    o.buttons === 1 && o.currentTarget.hasPointerCapture(o.pointerId) && ((s = r.onDragShape) == null || s.call(r, l, o)), (u = r.onPointerMove) == null || u.call(r, l, o);
  }, onPointerEnter: (o) => {
    var s;
    if (!i.pointerIsValid(o)) return;
    let u = i.pointerEnter(o, e);
    (s = r.onHoverShape) == null || s.call(r, u, o);
  }, onPointerLeave: (o) => {
    var s;
    if (!i.pointerIsValid(o)) return;
    let u = i.pointerEnter(o, e);
    (s = r.onUnhoverShape) == null || s.call(r, u, o);
  } }), [i, r, e]);
}
function ew(e, t, n, r, i, o = !1, s = !1, u, l) {
  let f = { shape: e, asset: e.assetId ? i[e.assetId] : void 0, meta: u, isChildOfSelected: s, isGhost: e.isGhost || o, isEditing: r.editingId === e.id, isBinding: l === e.id, isSelected: r.selectedIds.includes(e.id), isHovered: r.hoveredId === e.id || e.children !== void 0 && (r.hoveredId && e.children.includes(r.hoveredId) || e.children.some((h) => r.selectedIds.includes(h))) };
  t.push(f), e.children && (f.children = [], e.children.map((h) => n[h]).filter((h) => n[h.id]).sort((h, p) => h.childIndex - p.childIndex).forEach((h) => ew(h, f.children, n, r, i, f.isGhost, f.isSelected || f.isChildOfSelected, u)));
}
function LO(e, t) {
  return $.boundsContain(t, e) || $.boundsCollide(t, e);
}
function NO(e, t, n, r) {
  let { callbacks: i, shapeUtils: o, bounds: s } = mn(), u = c.useRef(), l = c.useRef(-1), f = c.useRef(/* @__PURE__ */ new Set()), h = c.useRef(/* @__PURE__ */ new Set()), { selectedIds: p, camera: g } = t, [v, E] = P.sub(P.div([0, 0], g.zoom), g.point), [y, b] = P.sub(P.div([s.width, s.height], g.zoom), g.point), w = { minX: v, minY: E, maxX: y, maxY: b, height: y - v, width: b - E }, k = h.current, A = f.current;
  k.clear(), A.clear(), Object.values(e.shapes).filter((I) => o[I.type].isStateful || p.includes(I.id) || LO(o[I.type].getBounds(I), w)).forEach((I) => {
    if (I.parentId === e.id) {
      A.add(I.id), k.add(I);
      return;
    }
    let B = e.shapes[I.parentId];
    if (B === void 0) throw Error(`A shape (${I.id}) has a parent (${I.parentId}) that does not exist!`);
    A.add(B.id), k.add(B);
  }), k.size !== l.current && (u.current && clearTimeout(u.current), u.current = requestAnimationFrame(() => {
    var I;
    (I = i.onRenderCountChange) == null || I.call(i, Array.from(A.values()));
  }), l.current = k.size);
  let T = t.bindingId ? e.bindings[t.bindingId].toId : void 0, _ = [];
  return k.forEach((I) => {
    if (I === void 0) throw Error("Rendered shapes included a missing shape");
    ew(I, _, e.shapes, t, n, I.isGhost, !1, r, T);
  }), _.sort((I, B) => I.shape.childIndex - B.shape.childIndex), _;
}
var d1 = /* @__PURE__ */ new Map();
function zO(e, t) {
  return Object.keys(t).reduce((n, r) => {
    let i = t[r];
    return i ? n + `${`--${e}-${r}`}: ${i};
` : n;
  }, "");
}
function jO(e, t, n = ":root") {
  c.useLayoutEffect(() => {
    let r = document.createElement("style"), i = zO(e, t);
    return r.setAttribute("id", `${e}-theme`), r.setAttribute("data-selector", n), r.innerHTML = `
        ${n} {
          ${i}
        }
      `, document.head.appendChild(r), () => {
      r && document.head.contains(r) && document.head.removeChild(r);
    };
  }, [e, t, n]);
}
function HO(e, t) {
  c.useLayoutEffect(() => {
    if (d1.get(e)) return () => {
    };
    let n = document.createElement("style");
    return n.innerHTML = t, n.setAttribute("id", e), document.head.appendChild(n), d1.set(e, n), () => {
      n && document.head.contains(n) && (document.head.removeChild(n), d1.delete(e));
    };
  }, [e, t]);
}
var UO = (e, ...t) => e.reduce((n, r, i) => n + r + (i < t.length ? t[i] : ""), ""), VO = { accent: "rgb(255, 0, 0)", brushFill: "rgba(0,0,0,.05)", brushStroke: "rgba(0,0,0,.25)", brushDashStroke: "rgba(0,0,0,.6)", selectStroke: "rgb(66, 133, 244)", selectFill: "rgba(65, 132, 244, 0.05)", binding: "rgba(65, 132, 244, 0.12)", background: "rgb(248, 249, 250)", foreground: "rgb(51, 51, 51)", grid: "rgba(144, 144, 144, 1)" }, GO = UO`
  .tl-container {
    --tl-zoom: 1;
    --tl-scale: calc(1 / var(--tl-zoom));
    --tl-padding: calc(64px * max(1, var(--tl-scale)));
    --tl-performance-all: auto;
    --tl-performance-selected: auto;
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
    z-index: 100;
    overflow: hidden;
    touch-action: none;
    overscroll-behavior: none;
    background-color: var(--tl-background);
  }
  .tl-container * {
    box-sizing: border-box;
  }
  .tl-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    touch-action: none;
    pointer-events: none;
  }
  .tl-grid {
    position: absolute;
    width: 100%;
    height: 100%;
    touch-action: none;
    pointer-events: none;
    user-select: none;
  }
  .tl-snap-line {
    stroke: var(--tl-accent);
    stroke-width: calc(1px * var(--tl-scale));
  }
  .tl-snap-point {
    stroke: var(--tl-accent);
    stroke-width: calc(1px * var(--tl-scale));
  }
  .tl-canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    touch-action: none;
    pointer-events: all;
    overflow: clip;
  }
  .tl-layer {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 0px;
    width: 0px;
    contain: layout style size;
  }
  .tl-absolute {
    position: absolute;
    top: 0px;
    left: 0px;
    transform-origin: center center;
    contain: layout style size;
  }
  .tl-positioned {
    position: absolute;
    top: 0px;
    left: 0px;
    transform-origin: center center;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    contain: layout style size;
    will-change: var(--tl-performance-all);
  }
  .tl-positioned-svg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    contain: layout style size;
  }
  .tl-positioned-div {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: var(--tl-padding);
    overflow: hidden;
    contain: layout style size;
  }
  .tl-positioned-selected {
    will-change: var(--tl-performance-selected);
  }
  .tl-inner-div {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .tl-stroke-hitarea {
    fill: none;
    stroke: transparent;
    stroke-width: calc(24px * var(--tl-scale));
    pointer-events: stroke;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .tl-fill-hitarea {
    fill: transparent;
    stroke: transparent;
    stroke-width: calc(24px * var(--tl-scale));
    pointer-events: all;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .tl-counter-scaled {
    transform: scale(var(--tl-scale));
  }
  .tl-dashed {
    stroke-dasharray: calc(2px * var(--tl-scale)), calc(2px * var(--tl-scale));
  }
  .tl-transparent {
    fill: transparent;
    stroke: transparent;
  }
  .tl-cursor-ns {
    cursor: ns-resize;
  }
  .tl-cursor-ew {
    cursor: ew-resize;
  }
  .tl-cursor-nesw {
    cursor: nesw-resize;
  }
  .tl-cursor-nwse {
    cursor: nwse-resize;
  }
  .tl-corner-handle {
    stroke: var(--tl-selectStroke);
    fill: var(--tl-background);
    stroke-width: calc(1.5px * var(--tl-scale));
  }
  .tl-rotate-handle {
    stroke: var(--tl-selectStroke);
    fill: var(--tl-background);
    stroke-width: calc(1.5px * var(--tl-scale));
    cursor: grab;
  }
  .tl-binding {
    fill: var(--tl-selectFill);
    stroke: var(--tl-selectStroke);
    stroke-width: calc(1px * var(--tl-scale));
    pointer-events: none;
  }
  .tl-user {
    left: calc(-15px * var(--tl-scale));
    top: calc(-15px * var(--tl-scale));
    height: calc(35px * var(--tl-scale));
    width: calc(35px * var(--tl-scale));
    transform: scale(var(--tl-scale));
    pointer-events: none;
    will-change: transform;
  }
  .tl-animated {
    transition: transform 200ms linear;
  }
  .tl-indicator {
    fill: transparent;
    stroke-width: calc(1.5px * var(--tl-scale));
    pointer-events: none;
  }
  .tl-user-indicator-bounds {
    border-style: solid;
    border-width: calc(1px * var(--tl-scale));
  }
  .tl-hovered {
    stroke: var(--tl-selectStroke);
  }
  .tl-selected {
    stroke: var(--tl-selectStroke);
  }
  .tl-locked {
    stroke-dasharray: calc(3px * var(--tl-scale)) calc(3px * var(--tl-scale));
  }
  .tl-editing {
    stroke-width: calc(2.5px * min(5, var(--tl-scale)));
  }
  .tl-performance {
    will-change: transform, contents;
  }
  .tl-clone-target {
    pointer-events: all;
  }
  .tl-clone-target:hover .tl-clone-button {
    opacity: 1;
  }
  .tl-clone-button-target {
    cursor: pointer;
    pointer-events: all;
  }
  .tl-clone-button-target:hover .tl-clone-button {
    fill: var(--tl-selectStroke);
  }
  .tl-clone-button {
    opacity: 0;
    r: calc(8px * var(--tl-scale));
    stroke-width: calc(1.5px * var(--tl-scale));
    stroke: var(--tl-selectStroke);
    fill: var(--tl-background);
  }
  .tl-bounds {
    pointer-events: none;
    contain: layout style size;
  }
  .tl-bounds-bg {
    stroke: none;
    fill: var(--tl-selectFill);
    pointer-events: all;
    contain: layout style size;
  }
  .tl-bounds-center {
    fill: transparent;
    stroke: var(--tl-selectStroke);
    stroke-width: calc(1.5px * var(--tl-scale));
  }
  .tl-brush {
    fill: var(--tl-brushFill);
    stroke: var(--tl-brushStroke);
    stroke-width: calc(1px * var(--tl-scale));
    pointer-events: none;
    contain: layout style size;
  }
  .tl-dashed-brush-line {
    fill: none;
    stroke: var(--tl-brushDashStroke);
    stroke-width: calc(1px * var(--tl-scale));
    pointer-events: none;
  }
  .tl-brush.dashed {
    stroke: none;
  }
  .tl-handle {
    pointer-events: all;
    cursor: grab;
  }
  .tl-handle:hover .tl-handle-bg {
    fill: var(--tl-selectFill);
  }
  .tl-handle:hover .tl-handle-bg > * {
    stroke: var(--tl-selectFill);
  }
  .tl-handle:active .tl-handle-bg {
    cursor: grabbing;
    fill: var(--tl-selectFill);
  }
  .tl-handle:active .tl-handle-bg > * {
    stroke: var(--tl-selectFill);
  }
  .tl-handle {
    fill: var(--tl-background);
    stroke: var(--tl-selectStroke);
    stroke-width: 1.5px;
  }
  .tl-handle-bg {
    fill: transparent;
    stroke: none;
    pointer-events: all;
    r: calc(16px / max(1, var(--tl-zoom)));
  }
  .tl-binding-indicator {
    fill: transparent;
    stroke: var(--tl-binding);
  }
  .tl-centered-g {
    transform: translate(var(--tl-padding), var(--tl-padding));
  }
  .tl-current-parent > *[data-shy='true'] {
    opacity: 1;
  }
  .tl-binding {
    fill: none;
    stroke: var(--tl-selectStroke);
    stroke-width: calc(2px * var(--tl-scale));
  }
  .tl-grid-dot {
    fill: var(--tl-grid);
  }
  .tl-erase-line {
    stroke-linejoin: round;
    stroke-linecap: round;
    pointer-events: none;
    fill: var(--tl-grid);
    opacity: 0.32;
  }
`;
function WO(e, t) {
  let n = c.useMemo(() => Qe(Qe({}, VO), e), [e]);
  jO("tl", n, t), HO("tl-canvas", GO);
}
function Sa(e) {
  let { callbacks: t, inputs: n } = mn(), r = c.useCallback((l) => {
    var f, h, p, g;
    if (l.dead || (l.dead = !0, !n.pointerIsValid(l))) return;
    (f = l.currentTarget) == null || f.setPointerCapture(l.pointerId);
    let v = n.pointerDown(l, e);
    if (l.button === 2) {
      (h = t.onRightPointBoundsHandle) == null || h.call(t, v, l);
      return;
    }
    l.button === 0 && ((p = t.onPointBoundsHandle) == null || p.call(t, v, l)), (g = t.onPointerDown) == null || g.call(t, v, l);
  }, [n, t, e]), i = c.useCallback((l) => {
    var f, h, p;
    if (l.dead || (l.dead = !0, l.button === 2 || !n.pointerIsValid(l))) return;
    let g = n.pointerUp(l, e), v = n.isDoubleClick();
    l.button === 0 && (v && !(g.altKey || g.metaKey) && ((f = t.onDoubleClickBoundsHandle) == null || f.call(t, g, l)), (h = t.onReleaseBoundsHandle) == null || h.call(t, g, l)), (p = t.onPointerUp) == null || p.call(t, g, l);
  }, [n, t, e]), o = c.useCallback((l) => {
    var f, h;
    if (l.dead || (l.dead = !0, !n.pointerIsValid(l)) || l.buttons === 2) return;
    let p = n.pointerMove(l, e);
    l.buttons === 1 && l.currentTarget.hasPointerCapture(l.pointerId) && ((f = t.onDragBoundsHandle) == null || f.call(t, p, l)), (h = t.onPointerMove) == null || h.call(t, p, l);
  }, [n, t, e]), s = c.useCallback((l) => {
    var f;
    !n.pointerIsValid(l) || (f = t.onHoverBoundsHandle) == null || f.call(t, n.pointerEnter(l, e), l);
  }, [n, t, e]), u = c.useCallback((l) => {
    var f;
    !n.pointerIsValid(l) || (f = t.onUnhoverBoundsHandle) == null || f.call(t, n.pointerEnter(l, e), l);
  }, [n, t, e]);
  return { onPointerDown: r, onPointerUp: i, onPointerEnter: s, onPointerMove: o, onPointerLeave: u };
}
function KO(e, t, n) {
  let r = c.useRef(), i = c.useRef();
  c.useLayoutEffect(() => {
    let { zoom: o, point: s } = n.camera, u = o !== r.current, l = s !== i.current;
    if (r.current = o, i.current = s, u || l) {
      let f = e.current;
      if (t && "current" in t) {
        let h = t.current;
        u && h && h.style.setProperty("--tl-zoom", o.toString()), f && f.style.setProperty("transform", `scale(${o}) translateX(${s[0]}px) translateY(${s[1]}px)`);
      }
    }
  }, [n.camera.zoom, n.camera.point]);
}
function CC(e, t) {
  return [(e[0] + t.point[0]) * t.zoom, (e[1] + t.point[1]) * t.zoom];
}
function f1(e, t) {
  return e[t.type];
}
function YO(e, t, n) {
  let { rSelectionBounds: r } = mn(), { selectedIds: i } = t, o = c.useRef(), s, u = 0, l = !1, f = !1;
  if (i.length === 1) {
    let p = i[0], g = e.shapes[p];
    if (!g) throw Error(`selectedIds is set to the id of a shape that doesn't exist: ${p}`);
    u = g.rotation || 0, l = g.isLocked || !1;
    let v = f1(n, g);
    s = v.hideBounds ? void 0 : v.getBounds(g);
  } else if (i.length > 1) {
    let p = i.map((g) => e.shapes[g]);
    u = 0, l = p.every((g) => g.isLocked), s = p.reduce((g, v, E) => E === 0 ? f1(n, v).getRotatedBounds(v) : Hn.getExpandedBounds(g, f1(n, v).getRotatedBounds(v)), {});
  }
  if (s) {
    let [p, g] = CC([s.minX, s.minY], t.camera), [v, E] = CC([s.maxX, s.maxY], t.camera);
    f = !!Object.values(e.bindings).find((y) => i.includes(y.toId) || i.includes(y.fromId)), r.current = { minX: p, minY: g, maxX: v, maxY: E, width: v - p, height: E - g };
  } else r.current = null;
  let h = o.current;
  return !h || !s ? o.current = s : s && h.minX === s.minX && h.minY === s.minY && h.maxX === s.maxX && h.maxY === s.maxY && (s = o.current), { bounds: s, rotation: u, isLocked: l, isLinked: f };
}
function XO(e) {
  let { inputs: t, callbacks: n } = mn();
  return c.useMemo(() => ({ onPointerDown: (r) => {
    var i, o, s;
    if (r.dead || (r.dead = !0, !t.pointerIsValid(r)) || r.button === 2) return;
    (i = r.currentTarget) == null || i.setPointerCapture(r.pointerId);
    let u = t.pointerDown(r, e);
    r.button === 0 && ((o = n.onPointHandle) == null || o.call(n, u, r)), (s = n.onPointerDown) == null || s.call(n, u, r);
  }, onPointerUp: (r) => {
    var i, o, s, u;
    if (r.dead || (r.dead = !0, !t.pointerIsValid(r)) || r.button === 2) return;
    let l = t.isDoubleClick(), f = t.pointerUp(r, e);
    r.currentTarget.hasPointerCapture(r.pointerId) && ((i = r.currentTarget) == null || i.releasePointerCapture(r.pointerId), r.button === 0 && (l && !(f.altKey || f.metaKey) && ((o = n.onDoubleClickHandle) == null || o.call(n, f, r)), (s = n.onReleaseHandle) == null || s.call(n, f, r))), (u = n.onPointerUp) == null || u.call(n, f, r);
  }, onPointerMove: (r) => {
    var i, o;
    if (r.dead || (r.dead = !0, !t.pointerIsValid(r)) || r.buttons === 2) return;
    let s = t.pointerMove(r, e);
    r.buttons === 1 && r.currentTarget.hasPointerCapture(r.pointerId) && ((i = n.onDragHandle) == null || i.call(n, s, r)), (o = n.onPointerMove) == null || o.call(n, s, r);
  }, onPointerEnter: (r) => {
    var i;
    if (!t.pointerIsValid(r)) return;
    let o = t.pointerEnter(r, e);
    (i = n.onHoverHandle) == null || i.call(n, o, r);
  }, onPointerLeave: (r) => {
    var i;
    if (!t.pointerIsValid(r)) return;
    let o = t.pointerEnter(r, e);
    (i = n.onUnhoverHandle) == null || i.call(n, o, r);
  } }), [t, n, e]);
}
function ZO(e) {
  let { bounds: t } = mn();
  c.useEffect(() => {
    let n = (o) => {
      o.preventDefault();
    }, r = (o) => {
      let s = o.touches[0].pageX, u = o.touches[0].radiusX || 0;
      (s - u < 10 || s + u > t.width - 10) && o.preventDefault();
    }, i = e.current;
    return i ? (i.addEventListener("gestureend", n), i.addEventListener("gesturechange", n), i.addEventListener("gesturestart", n), i.addEventListener("touchstart", r), () => {
      i && (i.removeEventListener("gestureend", n), i.removeEventListener("gesturechange", n), i.removeEventListener("gesturestart", n), i.removeEventListener("touchstart", r));
    }) : () => {
    };
  }, [e, t.width]);
}
function qO() {
  let { callbacks: e, inputs: t } = mn();
  return c.useMemo(() => ({ onPointerDown: (n) => {
    var r, i, o, s;
    if (n.dead || (n.dead = !0, !t.pointerIsValid(n))) return;
    if (n.button === 2) {
      (r = e.onRightPointBounds) == null || r.call(e, t.pointerDown(n, "bounds"), n);
      return;
    }
    let u = t.pointerDown(n, "bounds");
    (i = n.currentTarget) == null || i.setPointerCapture(n.pointerId), n.button === 0 && ((o = e.onPointBounds) == null || o.call(e, u, n)), (s = e.onPointerDown) == null || s.call(e, u, n);
  }, onPointerUp: (n) => {
    var r, i, o, s;
    if (n.dead || (n.dead = !0, n.button === 2) || (t.activePointer = void 0, !t.pointerIsValid(n))) return;
    let u = t.isDoubleClick(), l = t.pointerUp(n, "bounds");
    n.currentTarget.hasPointerCapture(n.pointerId) && ((r = n.currentTarget) == null || r.releasePointerCapture(n.pointerId)), n.button === 0 && (u && !(l.altKey || l.metaKey) && ((i = e.onDoubleClickBounds) == null || i.call(e, l, n)), (o = e.onReleaseBounds) == null || o.call(e, l, n)), (s = e.onPointerUp) == null || s.call(e, l, n);
  }, onPointerMove: (n) => {
    var r, i;
    if (n.dead || (n.dead = !0, !t.pointerIsValid(n))) return;
    n.buttons === 1 && n.currentTarget.hasPointerCapture(n.pointerId) && ((r = e.onDragBounds) == null || r.call(e, t.pointerMove(n, "bounds"), n));
    let o = t.pointerMove(n, "bounds");
    (i = e.onPointerMove) == null || i.call(e, o, n);
  }, onPointerEnter: (n) => {
    var r;
    !t.pointerIsValid(n) || (r = e.onHoverBounds) == null || r.call(e, t.pointerEnter(n, "bounds"), n);
  }, onPointerLeave: (n) => {
    var r;
    !t.pointerIsValid(n) || (r = e.onUnhoverBounds) == null || r.call(e, t.pointerEnter(n, "bounds"), n);
  } }), [t, e]);
}
function tw(e, t = 0) {
  let n = c.useRef(null);
  return c.useLayoutEffect(() => {
    let r = n.current, i = `
    translate(
      calc(${e.minX}px - var(--tl-padding)),
      calc(${e.minY}px - var(--tl-padding))
    )
    rotate(${t + (e.rotation || 0)}rad)`;
    r.style.setProperty("transform", i), r.style.setProperty("width", `calc(${Math.floor(e.width)}px + (var(--tl-padding) * 2))`), r.style.setProperty("height", `calc(${Math.floor(e.height)}px + (var(--tl-padding) * 2))`);
  }, [e, t]), n;
}
function JO() {
  let { inputs: e, callbacks: t } = mn();
  c.useEffect(() => {
    let n = (i) => {
      var o;
      (o = t.onKeyDown) == null || o.call(t, i.key, e.keydown(i), i);
    }, r = (i) => {
      var o;
      e.keyup(i), (o = t.onKeyUp) == null || o.call(t, i.key, e.keyup(i), i);
    };
    return window.addEventListener("keydown", n), window.addEventListener("keyup", r), () => {
      window.removeEventListener("keydown", n), window.removeEventListener("keyup", r);
    };
  }, [e, t]);
}
function QO(e, t) {
  c.useLayoutEffect(() => {
    if (t && "current" in t) {
      let n = t == null ? void 0 : t.current;
      if (!n) return;
      switch (e) {
        case "transform_selected": {
          n.style.setProperty("--tl-performance-all", "auto"), n.style.setProperty("--tl-performance-selected", "transform, contents");
          break;
        }
        case "transform_all": {
          n.style.setProperty("--tl-performance-all", "transform, contents"), n.style.setProperty("--tl-performance-selected", "transform, contents");
          break;
        }
        case "translate_selected": {
          n.style.setProperty("--tl-performance-all", "auto"), n.style.setProperty("--tl-performance-selected", "transform");
          break;
        }
        case "translate_all": {
          n.style.setProperty("--tl-performance-all", "transform"), n.style.setProperty("--tl-performance-selected", "transform");
          break;
        }
        default:
          n.style.setProperty("--tl-performance-all", "auto"), n.style.setProperty("--tl-performance-selected", "auto");
      }
    }
  }, [e]);
}
function e$(e) {
  var t = e, { id: n, bounds: r, rotation: i = 0, isGhost: o = !1, isSelected: s = !1, children: u } = t, l = qa(t, ["id", "bounds", "rotation", "isGhost", "isSelected", "children"]);
  let f = tw(r, i);
  return c.createElement("div", Qe({ id: n, ref: f, className: `tl-positioned${o ? " tl-ghost" : ""}${s ? " tl-positioned-selected" : ""}`, "aria-label": "container", "data-testid": "container" }, l), u);
}
var ec = c.memo(e$);
function t$({ brush: e, zoom: t, dashed: n }) {
  return c.createElement(ec, { bounds: e, rotation: 0 }, c.createElement(lr, null, c.createElement("rect", { className: "tl-brush" + (n ? " dashed" : ""), opacity: 1, x: 0, y: 0, width: e.width, height: e.height, "aria-label": "brush" }), n && c.createElement("g", { className: "tl-dashed-brush-line" }, c.createElement(_0, { x1: 0, y1: 0, x2: e.width, y2: 0, zoom: t }), c.createElement(_0, { x1: e.width, y1: 0, x2: e.width, y2: e.height, zoom: t }), c.createElement(_0, { x1: 0, y1: e.height, x2: e.width, y2: e.height, zoom: t }), c.createElement(_0, { x1: 0, y1: 0, x2: 0, y2: e.height, zoom: t }))));
}
var n$ = c.memo(t$);
function _0({ x1: e, y1: t, x2: n, y2: r, zoom: i }) {
  let o = Hn.getPerfectDashProps(Math.hypot(n - e, r - t), 1 / i, "dashed", 1, !0, 3);
  return c.createElement("line", { x1: e, y1: t, x2: n, y2: r, strokeWidth: 1 / i, strokeDasharray: o.strokeDasharray, strokeDashoffset: o.strokeDashoffset });
}
var r$ = c.memo(({ color: e }) => c.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 35 35", fill: "none", fillRule: "evenodd" }, c.createElement("g", { fill: "rgba(0,0,0,.2)", transform: "translate(1,1)" }, c.createElement("path", { d: "m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" }), c.createElement("path", { d: "m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" })), c.createElement("g", { fill: "white" }, c.createElement("path", { d: "m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" }), c.createElement("path", { d: "m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" })), c.createElement("g", { fill: e }, c.createElement("path", { d: "m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" }), c.createElement("path", { d: "m13 10.814v11.188l2.969-2.866.428-.139h4.768z" }))));
function i$({ points: e, zoom: t }) {
  if (e.length === 0) return null;
  let n = Hn.getSvgPathFromStroke(Jl(e, { size: 16 / t, start: { taper: !0 } }));
  return c.createElement("path", { d: n, className: "tl-erase-line" });
}
var o$ = c.memo(i$), yC = [[-1, 0.15, 64], [0.05, 0.375, 16], [0.15, 1, 4], [0.7, 2.5, 1]];
function s$({ grid: e, camera: t }) {
  return c.createElement("svg", { className: "tl-grid", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, c.createElement("defs", null, yC.map(([n, r, i], o) => {
    let s = i * e * t.zoom, u = t.point[0] * t.zoom, l = t.point[1] * t.zoom, f = u > 0 ? u % s : s + u % s, h = l > 0 ? l % s : s + l % s, p = t.zoom < r ? Hn.modulate(t.zoom, [n, r], [0, 1]) : 1;
    return c.createElement("pattern", { key: `grid-pattern-${o}`, id: `grid-${o}`, width: s, height: s, patternUnits: "userSpaceOnUse" }, c.createElement("circle", { className: "tl-grid-dot", cx: f, cy: h, r: 1, opacity: p }));
  })), yC.map((n, r) => c.createElement("rect", { key: `grid-rect-${r}`, width: "100%", height: "100%", fill: `url(#grid-${r})` })));
}
function a$({ camera: { zoom: e, point: t }, children: n }) {
  let r = 2.5 / e;
  return c.createElement("svg", { className: "tl-overlay" }, c.createElement("defs", null, c.createElement("g", { id: "tl-snap-point" }, c.createElement("path", { className: "tl-snap-point", d: `M ${-r},${-r} L ${r},${r} M ${-r},${r} L ${r},${-r}` }))), c.createElement("g", { transform: `scale(${e}) translate(${t})` }, n));
}
var u$ = c.memo(a$), lr = c.memo(c.forwardRef(function(e, t) {
  var n = e, { id: r, className: i = "", children: o } = n, s = qa(n, ["id", "className", "children"]);
  return c.createElement("svg", Qe({ ref: t, className: `tl-positioned-svg ${i}` }, s), c.createElement("g", { id: r, className: "tl-centered-g" }, o));
}));
function l$({ bounds: e, isLocked: t, isHidden: n }) {
  return c.createElement("rect", { className: ["tl-bounds-center", t ? "tl-dashed" : ""].join(" "), x: -1, y: -1, width: e.width + 2, height: e.height + 2, opacity: n ? 0 : 1, pointerEvents: "none", "aria-label": "center handle" });
}
var c$ = c.memo(l$), d$ = { right: 0, bottomRight: 45, bottom: 90, bottomLeft: 135, left: 180, topLeft: 225, top: 270, topRight: 315 };
function f$({ bounds: e, side: t, targetSize: n, size: r }) {
  let i = n * 2, o = { left: -i, topLeft: -i, bottomLeft: -i, right: e.width, topRight: e.width, bottomRight: e.width, top: e.width / 2 - i / 2, bottom: e.width / 2 - i / 2 }[t], s = { left: e.height / 2 - i / 2, right: e.height / 2 - i / 2, top: -i * 2, topLeft: -i, topRight: -i, bottom: e.height, bottomLeft: e.height, bottomRight: e.height }[t], { callbacks: u, inputs: l } = mn(), f = c.useCallback((h) => {
    var p;
    h.stopPropagation();
    let g = l.pointerDown(h, t);
    (p = u.onShapeClone) == null || p.call(u, g, h);
  }, [u.onShapeClone]);
  return c.createElement("g", { className: "tl-clone-target", transform: `translate(${o}, ${s})`, "aria-label": "clone button" }, c.createElement("rect", { className: "tl-transparent", width: n * 2, height: n * 2 }), c.createElement("g", { className: "tl-clone-button-target", onPointerDown: f, transform: `translate(${n}, ${n}) rotate(${d$[t]})` }, c.createElement("circle", { className: "tl-transparent ", r: n }), c.createElement("path", { className: "tl-clone-button", d: `M -${r / 2},-${r / 2} L ${r / 2},0 -${r / 2},${r / 2} Z`, strokeLinejoin: "round" })));
}
var ao = c.memo(f$);
function h$({ targetSize: e, size: t, bounds: n }) {
  return c.createElement(c.Fragment, null, c.createElement(ao, { targetSize: e, size: t, bounds: n, side: "top" }), c.createElement(ao, { targetSize: e, size: t, bounds: n, side: "right" }), c.createElement(ao, { targetSize: e, size: t, bounds: n, side: "bottom" }), c.createElement(ao, { targetSize: e, size: t, bounds: n, side: "left" }), c.createElement(ao, { targetSize: e, size: t, bounds: n, side: "topLeft" }), c.createElement(ao, { targetSize: e, size: t, bounds: n, side: "topRight" }), c.createElement(ao, { targetSize: e, size: t, bounds: n, side: "bottomLeft" }), c.createElement(ao, { targetSize: e, size: t, bounds: n, side: "bottomRight" }));
}
var p$ = c.memo(h$), m$ = { top_left_corner: "tl-cursor-nwse", top_right_corner: "tl-cursor-nesw", bottom_right_corner: "tl-cursor-nwse", bottom_left_corner: "tl-cursor-nesw" };
function g$({ size: e, targetSize: t, isHidden: n, corner: r, bounds: i }) {
  let o = Sa(r), s = r === "top_left_corner" || r === "top_right_corner", u = r === "top_left_corner" || r === "bottom_left_corner";
  return c.createElement("g", { opacity: n ? 0 : 1 }, c.createElement("rect", Qe({ className: "tl-transparent " + (n ? "" : m$[r]), "aria-label": "corner transparent", x: (u ? -1 : i.width + 1) - t, y: (s ? -1 : i.height + 1) - t, width: t * 2, height: t * 2, pointerEvents: n ? "none" : "all" }, o)), c.createElement("rect", { className: "tl-corner-handle", "aria-label": "corner handle", x: (u ? -1 : i.width + 1) - e / 2, y: (s ? -1 : i.height + 1) - e / 2, width: e, height: e, pointerEvents: "none" }));
}
var T0 = c.memo(g$), v$ = { top_edge: "tl-cursor-ns", right_edge: "tl-cursor-ew", bottom_edge: "tl-cursor-ns", left_edge: "tl-cursor-ew" };
function E$({ size: e, isHidden: t, bounds: n, edge: r }) {
  let i = Sa(r), o = r === "top_edge" || r === "bottom_edge", s = r === "right_edge" || r === "bottom_edge", { height: u, width: l } = n;
  return c.createElement("rect", Qe({ pointerEvents: t ? "none" : "all", className: "tl-transparent tl-edge-handle " + (t ? "" : v$[r]), "aria-label": `${r} handle`, opacity: t ? 0 : 1, x: o ? e / 2 : (s ? l + 1 : -1) - e / 2, y: o ? (s ? u + 1 : -1) - e / 2 : e / 2, width: o ? Math.max(0, l + 1 - e) : e, height: o ? e : Math.max(0, u + 1 - e) }, i));
}
var F0 = c.memo(E$);
function C$({ size: e, bounds: t, isHidden: n }) {
  let r = Sa("left"), i = Sa("center"), o = Sa("right");
  return c.createElement("g", { cursor: "grab", transform: `translate(${t.width / 2 - e * 4}, ${t.height + e * 2})`, "aria-label": "link handle" }, c.createElement("g", { className: "tl-transparent", pointerEvents: n ? "none" : "all" }, c.createElement("rect", Qe({ x: 0, y: 0, width: e * 2, height: e * 2 }, r)), c.createElement("rect", Qe({ x: e * 3, y: 0, width: e * 2, height: e * 2 }, i)), c.createElement("rect", Qe({ x: e * 6, y: 0, width: e * 2, height: e * 2 }, o))), c.createElement("g", { className: "tl-rotate-handle", transform: `translate(${e / 2}, ${e / 2})`, "aria-label": "link rotate handle" }, c.createElement("path", { d: `M 0,${e / 2} L ${e},${e} ${e},0 Z`, pointerEvents: "none", opacity: n ? 0 : 1 }), c.createElement("path", { transform: `translate(${e * 3}, 0)`, d: `M 0,0 L ${e},0 ${e / 2},${e} Z`, pointerEvents: "none", opacity: n ? 0 : 1 }), c.createElement("path", { transform: `translate(${e * 6}, 0)`, d: `M ${e},${e / 2} L 0,0 0,${e} Z`, pointerEvents: "none", opacity: n ? 0 : 1 })));
}
var y$ = c.memo(C$);
function b$({ bounds: e, targetSize: t, size: n, isHidden: r }) {
  let i = Sa("rotate");
  return c.createElement("g", { cursor: "grab", opacity: r ? 0 : 1 }, c.createElement("circle", Qe({ className: "tl-transparent", "aria-label": "rotate handle transparent", cx: e.width / 2, cy: n * -2, r: t, pointerEvents: r ? "none" : "all" }, i)), c.createElement("circle", { className: "tl-rotate-handle", "aria-label": "rotate handle", cx: e.width / 2, cy: n * -2, r: n / 2, pointerEvents: "none" }));
}
var w$ = c.memo(b$), S$ = function({ zoom: e, bounds: t, viewportWidth: n, rotation: r, isHidden: i, isLocked: o, hideCloneHandles: s, hideResizeHandles: u, hideRotateHandle: l, hideBindingHandles: f }) {
  let h = (n < 768 ? 16 : 8) / e, p = 8 / e, g = Math.min(t.width, t.height) * e, v = !l && !i && !o && g > 32, E = !i && !o && g > 24, y = !i && !o && g > 20, b = !s && g > 24;
  return c.createElement(ec, { bounds: t, rotation: r }, c.createElement(lr, null, c.createElement(c$, { bounds: t, isLocked: o, isHidden: i }), !u && !o ? c.createElement(c.Fragment, null, c.createElement(F0, { targetSize: h, size: p, bounds: t, edge: "top_edge", isHidden: !E }), c.createElement(F0, { targetSize: h, size: p, bounds: t, edge: "right_edge", isHidden: !E }), c.createElement(F0, { targetSize: h, size: p, bounds: t, edge: "bottom_edge", isHidden: !E }), c.createElement(F0, { targetSize: h, size: p, bounds: t, edge: "left_edge", isHidden: !E }), c.createElement(T0, { targetSize: h, size: p, bounds: t, isHidden: i || !y, corner: "top_left_corner" }), c.createElement(T0, { targetSize: h, size: p, bounds: t, isHidden: i || !y, corner: "top_right_corner" }), c.createElement(T0, { targetSize: h, size: p, bounds: t, isHidden: i || !y, corner: "bottom_right_corner" }), c.createElement(T0, { targetSize: h, size: p, bounds: t, isHidden: i || !y, corner: "bottom_left_corner" })) : null, v && c.createElement(w$, { targetSize: h, size: p, bounds: t, isHidden: !E }), b && c.createElement(p$, { bounds: t, targetSize: h, size: p }), !f && c.createElement(y$, { targetSize: h, size: p, bounds: t, isHidden: !E })));
}, x$ = c.memo(S$);
function k$({ bounds: e, rotation: t, isHidden: n }) {
  let r = qO();
  return c.createElement(ec, { bounds: e, rotation: t }, c.createElement(lr, null, c.createElement("rect", Qe({ className: "tl-bounds-bg", "aria-label": "bounds bg", width: e.width, height: e.height, opacity: n ? 0 : 1 }, r))));
}
var D$ = c.memo(k$);
function A$({ id: e, point: t }) {
  let n = XO(e);
  return c.createElement(ec, { bounds: Hn.translateBounds({ minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 }, t) }, c.createElement(lr, null, c.createElement("g", Qe({ className: "tl-handle", "aria-label": "handle" }, n), c.createElement("circle", { className: "tl-handle-bg", pointerEvents: "all" }), c.createElement("circle", { className: "tl-counter-scaled tl-handle", pointerEvents: "none", r: 4 }))));
}
var I$ = c.memo(A$);
function P$({ shape: e, zoom: t }) {
  if (e.handles === void 0) return null;
  let n = null, r = Object.values(e.handles).reduce((i, o) => {
    let s = P.add(o.point, e.point);
    return (!n || P.dist(s, n) * t >= 32) && (i.push(o), n = s), i;
  }, []);
  return r.length === 1 ? null : c.createElement(c.Fragment, null, r.map((i) => c.createElement(I$, { key: e.id + "_" + i.id, id: i.id, point: P.add(i.point, e.point) })));
}
var _$ = c.memo(P$);
function T$(e) {
  let t = e.utils.getRef(e.shape);
  return c.createElement(e.utils.Component, Qe({ ref: t }, e));
}
var F$ = c.memo(T$, (e, t) => e.isHovered !== t.isHovered || e.isSelected !== t.isSelected || e.isEditing !== t.isEditing || e.isBinding !== t.isBinding || e.isGhost !== t.isGhost || e.meta !== t.meta ? !1 : t.shape !== e.shape ? !t.utils.shouldRender(t.shape, e.shape) : !0);
function B$(e) {
  var t = e, { shape: n, utils: r, meta: i } = t, o = qa(t, ["shape", "utils", "meta"]);
  let { callbacks: s } = mn(), u = r.getBounds(n), l = $O(n.id);
  return c.createElement(ec, { id: n.id, bounds: u, rotation: n.rotation, "data-shape": n.type, isGhost: o.isGhost, isSelected: o.isSelected }, c.createElement(F$, Qe({ shape: n, utils: r, meta: i, events: l, bounds: u, onShapeChange: s.onShapeChange, onShapeBlur: s.onShapeBlur }, o)));
}
var M$ = c.memo(B$);
function R$(e) {
  var t = e, { shape: n, utils: r, meta: i, children: o } = t, s = qa(t, ["shape", "utils", "meta", "children"]);
  return c.createElement(c.Fragment, null, c.createElement(M$, Qe({ shape: n, utils: r[n.type], meta: i }, s)), o && o.map((u) => c.createElement(nw, Qe({ key: u.shape.id, utils: r }, u))));
}
var nw = c.memo(R$);
function O$({ isHovered: e = !1, isSelected: t = !1, isEditing: n = !1, shape: r, user: i, meta: o }) {
  let { shapeUtils: s } = mn(), u = s[r.type], l = u.getBounds(r), f = tw(l, r.rotation);
  return c.createElement("div", { ref: f, draggable: !1, className: ["tl-indicator", "tl-absolute", t && !i ? "tl-selected" : "tl-hovered", n ? "tl-editing" : "", r.isLocked ? "tl-locked" : ""].join(" ") }, c.createElement("svg", { width: "100%", height: "100%" }, c.createElement("g", { className: "tl-centered-g", stroke: i == null ? void 0 : i.color }, c.createElement(u.Indicator, { shape: r, meta: o, user: i, bounds: l, isSelected: t, isHovered: e }))));
}
var $m = c.memo(O$);
function $$({ page: e, pageState: t, assets: n, hideBounds: r, hideHandles: i, hideIndicators: o, hideBindingHandles: s, hideCloneHandles: u, hideRotateHandle: l, hideResizeHandles: f, meta: h }) {
  let { bounds: p, shapeUtils: g } = mn(), v = NO(e, t, n, h), { bounds: E, isLinked: y, isLocked: b, rotation: w } = YO(e, t, g), { selectedIds: k, hoveredId: A, editingId: T, camera: { zoom: _ } } = t, I = o, B = !0, M = !1, H, Y = k.map((J) => e.shapes[J]);
  if (Y.length === 1) {
    let J = Y[0];
    M = T === J.id, M && (I = !0);
    let te = g[J.type];
    B = u || !te.showCloneHandles, J.handles !== void 0 && !M && (H = J);
  }
  return c.createElement(c.Fragment, null, E && c.createElement(D$, { bounds: E, rotation: w, isHidden: r }), v.map((J) => c.createElement(nw, Qe({ key: J.shape.id, utils: g }, J))), !I && Y.map((J) => c.createElement($m, { key: "selected_" + J.id, shape: J, meta: h, isSelected: !0, isEditing: M })), !I && A && A !== T && c.createElement($m, { key: "hovered_" + A, shape: e.shapes[A], meta: h, isHovered: !0 }), E && c.createElement(x$, { zoom: _, bounds: E, viewportWidth: p.width, isLocked: b, rotation: w, isHidden: r, hideRotateHandle: l, hideResizeHandles: f, hideBindingHandles: s || !y, hideCloneHandles: B }), !i && H && c.createElement(_$, { shape: H, zoom: _ }));
}
var L$ = c.memo($$);
function N$({ snapLines: e }) {
  return c.createElement(c.Fragment, null, e.map((t, n) => c.createElement(j$, { key: n, snapLine: t })));
}
function z$({ snapLine: e }) {
  let t = Hn.getBoundsFromPoints(e);
  return c.createElement(c.Fragment, null, c.createElement("line", { className: "tl-snap-line", x1: t.minX, y1: t.minY, x2: t.maxX, y2: t.maxY }), e.map(([n, r], i) => c.createElement("use", { key: i, href: "#tl-snap-point", x: n, y: r })));
}
var j$ = c.memo(z$), H$ = c.memo(N$);
function U$({ user: e, Cursor: t }) {
  let n = c.useRef(null);
  return c.useLayoutEffect(() => {
    n.current && (n.current.style.transform = `translate(${e.point[0]}px, ${e.point[1]}px)`);
  }, [e.point]), c.createElement("div", { ref: n, className: `tl-absolute tl-user tl-counter-scaled ${e.session ? "" : "tl-animated"}` }, c.createElement(t, { id: e.id, color: e.color, metadata: e.metadata }));
}
function V$({ userId: e, users: t, Cursor: n }) {
  return c.createElement(c.Fragment, null, Object.values(t).filter((r) => r && r.id !== e).map((r) => c.createElement(U$, { key: r.id, user: r, Cursor: n })));
}
function G$({ userId: e, users: t, meta: n, page: r }) {
  let { shapeUtils: i } = mn();
  return c.createElement(c.Fragment, null, Object.values(t).filter(Boolean).filter((o) => o.id !== e && o.selectedIds.length > 0).map((o) => {
    let s = o.selectedIds.map((l) => r.shapes[l]).filter(Boolean);
    if (s.length === 0) return null;
    let u = Hn.getCommonBounds(s.map((l) => i[l.type].getBounds(l)));
    return c.createElement(c.Fragment, { key: o.id + "_shapes" }, c.createElement("div", { className: "tl-absolute tl-user-indicator-bounds", style: { backgroundColor: o.color + "0d", borderColor: o.color + "78", transform: `translate(${u.minX}px, ${u.minY}px)`, width: u.width, height: u.height, pointerEvents: "none" } }), s.map((l) => c.createElement($m, { key: `${o.id}_${l.id}_indicator`, shape: l, user: o, meta: n, isHovered: !0 })));
  }));
}
var W$ = (e) => {
  let t = e.parentElement;
  for (; t; ) {
    if (t === document.body) return document;
    let { overflowY: n } = window.getComputedStyle(t);
    if (t.scrollHeight > t.clientHeight && (n === "auto" || n === "scroll" || n === "overlay")) return t;
    t = t.parentElement;
  }
  return document;
};
function K$(e, t) {
  let { inputs: n, callbacks: r } = mn(), i = c.useRef(!1), o = c.useCallback(() => {
    var s, u;
    if (i.current) {
      let l = (s = e.current) == null ? void 0 : s.getBoundingClientRect();
      if (l) {
        let f = { minX: l.left, maxX: l.left + l.width, minY: l.top, maxY: l.top + l.height, width: l.width, height: l.height };
        n.bounds = f, t(f), (u = r.onBoundsChange) == null || u.call(r, f);
      }
    } else i.current = !0;
  }, [e, n, r.onBoundsChange]);
  c.useEffect(() => {
    let s = e.current ? W$(e.current) : document, u = $.debounce(o, 100);
    return s.addEventListener("scroll", u), window.addEventListener("resize", u), () => {
      s.removeEventListener("scroll", u), window.removeEventListener("resize", u);
    };
  }, []), c.useEffect(() => {
    let s = new ResizeObserver((u) => {
      n.isPinching || u[0].contentRect && o();
    });
    return e.current && s.observe(e.current), () => {
      s.disconnect();
    };
  }, [e, n]), c.useEffect(() => {
    o();
  }, [e]);
}
function Y$({ id: e, page: t, pageState: n, assets: r, snapLines: i, eraseLine: o, grid: s, users: u, userId: l, components: f = {}, meta: h, performanceMode: p, showDashedBrush: g, hideHandles: v, hideBounds: E, hideIndicators: y, hideBindingHandles: b, hideCloneHandles: w, hideResizeHandles: k, hideRotateHandle: A, hideGrid: T, onBoundsChange: _, hideCursors: I }) {
  var B;
  let M = c.useRef(null), H = c.useRef(n.camera.zoom);
  H.current = n.camera.zoom, BO(H, M), K$(M, _), RO(), ZO(M);
  let Y = c.useRef(null), J = c.useRef(null);
  KO(J, Y, n), QO(p, Y), JO();
  let te = OO();
  return c.createElement("div", { id: e, className: "tl-container", ref: Y }, c.createElement("div", Qe({ id: "canvas", className: "tl-absolute tl-canvas", ref: M }, te), !T && s && c.createElement(s$, { grid: s, camera: n.camera }), c.createElement("div", { ref: J, className: "tl-absolute tl-layer", "data-testid": "layer" }, c.createElement(L$, { page: t, pageState: n, assets: r, hideBounds: E, hideIndicators: y, hideHandles: v, hideBindingHandles: b, hideCloneHandles: w, hideResizeHandles: k, hideRotateHandle: A, meta: h }), u && l && c.createElement(G$, { userId: l, users: u, page: t, meta: h }), n.brush && c.createElement(n$, { brush: n.brush, dashed: g, zoom: n.camera.zoom }), u && !I && c.createElement(V$, { userId: l, users: u, Cursor: (B = f == null ? void 0 : f.Cursor) != null ? B : r$ })), c.createElement(u$, { camera: n.camera }, o && c.createElement(o$, { points: o, zoom: n.camera.zoom }), i && c.createElement(H$, { snapLines: i }))));
}
var X$ = c.memo(Y$), Z$ = 250, Lt = class {
  constructor() {
    St(this, "pointer"), St(this, "keyboard"), St(this, "keys", {}), St(this, "isPinching", !1), St(this, "bounds", { minX: 0, maxX: 640, minY: 0, maxY: 480, width: 640, height: 480 }), St(this, "pointerUpTime", 0), St(this, "activePointer"), St(this, "panStart", (t) => {
      var n, r;
      let { shiftKey: i, ctrlKey: o, metaKey: s, altKey: u } = t, l = { target: "wheel", pointerId: ((n = this.pointer) == null ? void 0 : n.pointerId) || 0, origin: ((r = this.pointer) == null ? void 0 : r.origin) || [0, 0], delta: [0, 0], pressure: 0.5, point: Lt.getPoint(t, this.bounds), shiftKey: i, ctrlKey: o, metaKey: s, altKey: u, spaceKey: this.keys[" "] };
      return this.pointer = l, l;
    }), St(this, "pan", (t, n) => {
      if (!this.pointer || this.pointer.target !== "wheel") return this.panStart(n);
      let { shiftKey: r, ctrlKey: i, metaKey: o, altKey: s } = n, u = this.pointer, l = Lt.getPoint(n, this.bounds), f = Gr(Qe({}, u), { target: "wheel", delta: t, point: l, shiftKey: r, ctrlKey: i, metaKey: o, altKey: s, spaceKey: this.keys[" "] });
      return this.pointer = f, f;
    }), St(this, "keydown", (t) => {
      var n, r;
      let { shiftKey: i, ctrlKey: o, metaKey: s, altKey: u } = t;
      return this.keys[t.key] = !0, { point: ((n = this.pointer) == null ? void 0 : n.point) || [0, 0], origin: ((r = this.pointer) == null ? void 0 : r.origin) || [0, 0], key: t.key, keys: Object.keys(this.keys), shiftKey: i, ctrlKey: o, metaKey: $.isDarwin() ? s : o, altKey: u };
    }), St(this, "keyup", (t) => {
      var n, r;
      let { shiftKey: i, ctrlKey: o, metaKey: s, altKey: u } = t;
      return delete this.keys[t.key], { point: ((n = this.pointer) == null ? void 0 : n.point) || [0, 0], origin: ((r = this.pointer) == null ? void 0 : r.origin) || [0, 0], key: t.key, keys: Object.keys(this.keys), shiftKey: i, ctrlKey: o, metaKey: $.isDarwin() ? s : o, altKey: u };
    });
  }
  pointerIsValid(t) {
    if ("pointerId" in t && this.activePointer && this.activePointer !== t.pointerId) return !1;
    if ("touches" in t) {
      let n = t.changedTouches[0];
      if (this.activePointer && this.activePointer !== n.identifier) return !1;
    }
    return !0;
  }
  touchStart(t, n) {
    let { shiftKey: r, ctrlKey: i, metaKey: o, altKey: s } = t, u = t.changedTouches[0];
    this.activePointer = u.identifier;
    let l = { target: n, pointerId: u.identifier, origin: Lt.getPoint(u, this.bounds), delta: [0, 0], point: Lt.getPoint(u, this.bounds), pressure: Lt.getPressure(u), shiftKey: r, ctrlKey: i, metaKey: $.isDarwin() ? o : i, altKey: s, spaceKey: this.keys[" "] };
    return this.pointer = l, l;
  }
  touchEnd(t, n) {
    let { shiftKey: r, ctrlKey: i, metaKey: o, altKey: s } = t, u = t.changedTouches[0], l = { target: n, pointerId: u.identifier, origin: Lt.getPoint(u, this.bounds), delta: [0, 0], point: Lt.getPoint(u, this.bounds), pressure: Lt.getPressure(u), shiftKey: r, ctrlKey: i, metaKey: $.isDarwin() ? o : i, altKey: s, spaceKey: this.keys[" "] };
    return this.pointer = l, this.activePointer = void 0, l;
  }
  touchMove(t, n) {
    let { shiftKey: r, ctrlKey: i, metaKey: o, altKey: s } = t, u = t.changedTouches[0], l = this.pointer, f = Lt.getPoint(u, this.bounds), h = l != null && l.point ? P.sub(f, l.point) : [0, 0], p = Gr(Qe({ origin: f }, l), { target: n, pointerId: u.identifier, point: f, delta: h, pressure: Lt.getPressure(u), shiftKey: r, ctrlKey: i, metaKey: $.isDarwin() ? o : i, altKey: s, spaceKey: this.keys[" "] });
    return this.pointer = p, p;
  }
  pointerDown(t, n) {
    let { shiftKey: r, ctrlKey: i, metaKey: o, altKey: s } = t, u = Lt.getPoint(t, this.bounds);
    this.activePointer = t.pointerId;
    let l = { target: n, pointerId: t.pointerId, origin: u, point: u, delta: [0, 0], pressure: Lt.getPressure(t), shiftKey: r, ctrlKey: i, metaKey: $.isDarwin() ? o : i, altKey: s, spaceKey: this.keys[" "] };
    return this.pointer = l, l;
  }
  pointerEnter(t, n) {
    let { shiftKey: r, ctrlKey: i, metaKey: o, altKey: s } = t, u = Lt.getPoint(t, this.bounds), l = { target: n, pointerId: t.pointerId, origin: u, delta: [0, 0], point: u, pressure: Lt.getPressure(t), shiftKey: r, ctrlKey: i, metaKey: $.isDarwin() ? o : i, altKey: s, spaceKey: this.keys[" "] };
    return this.pointer = l, l;
  }
  pointerMove(t, n) {
    let { shiftKey: r, ctrlKey: i, metaKey: o, altKey: s } = t, u = this.pointer, l = Lt.getPoint(t, this.bounds), f = u != null && u.point ? P.sub(l, u.point) : [0, 0], h = Gr(Qe({ origin: l }, u), { target: n, pointerId: t.pointerId, point: l, delta: f, pressure: Lt.getPressure(t), shiftKey: r, ctrlKey: i, metaKey: $.isDarwin() ? o : i, altKey: s, spaceKey: this.keys[" "] });
    return this.pointer = h, h;
  }
  pointerUp(t, n) {
    let { shiftKey: r, ctrlKey: i, metaKey: o, altKey: s } = t, u = this.pointer, l = Lt.getPoint(t, this.bounds), f = u != null && u.point ? P.sub(l, u.point) : [0, 0];
    this.activePointer = void 0;
    let h = Gr(Qe({ origin: l }, u), { target: n, pointerId: t.pointerId, point: l, delta: f, pressure: Lt.getPressure(t), shiftKey: r, ctrlKey: i, metaKey: $.isDarwin() ? o : i, altKey: s, spaceKey: this.keys[" "] });
    return this.pointer = h, this.pointerUpTime = performance.now(), h;
  }
  isDoubleClick() {
    if (!this.pointer) return !1;
    let { origin: t, point: n } = this.pointer, r = performance.now() - this.pointerUpTime < Z$ && P.dist(t, n) < 4;
    return r && (this.activePointer = void 0), r;
  }
  clear() {
    this.pointer = void 0;
  }
  resetDoubleClick() {
    this.pointerUpTime = 0;
  }
  pinch(t, n) {
    let { shiftKey: r, ctrlKey: i, metaKey: o, altKey: s } = this.keys, u = P.sub(n, t), l = { pointerId: 0, target: "pinch", origin: n, delta: u, point: P.sub(P.toFixed(t), [this.bounds.minX, this.bounds.minY]), pressure: 0.5, shiftKey: r, ctrlKey: i, metaKey: $.isDarwin() ? o : i, altKey: s, spaceKey: this.keys[" "] };
    return this.pointer = l, l;
  }
  reset() {
    this.pointerUpTime = 0, this.pointer = void 0, this.keyboard = void 0, this.activePointer = void 0, this.keys = {};
  }
  static getPoint(t, n) {
    return [+t.clientX.toFixed(2) - n.minX, +t.clientY.toFixed(2) - n.minY];
  }
  static getPressure(t) {
    return "pressure" in t && +t.pressure.toFixed(2) || 0.5;
  }
  static commandKey() {
    return $.isDarwin() ? "⌘" : "Ctrl";
  }
};
new Lt();
var q$ = Object.freeze({});
function J$(e) {
  var t = e, { id: n = "tl", shapeUtils: r, page: i, pageState: o, assets: s = q$, users: u, userId: l, theme: f, meta: h, snapLines: p, eraseLine: g, grid: v, containerRef: E, performanceMode: y, components: b, hideHandles: w = !1, hideIndicators: k = !1, hideCloneHandles: A = !1, hideBindingHandles: T = !1, hideResizeHandles: _ = !1, hideRotateHandles: I = !1, hideBounds: B = !1, hideGrid: M = !0, showDashedBrush: H = !1, hideCursors: Y } = t, J = qa(t, ["id", "shapeUtils", "page", "pageState", "assets", "users", "userId", "theme", "meta", "snapLines", "eraseLine", "grid", "containerRef", "performanceMode", "components", "hideHandles", "hideIndicators", "hideCloneHandles", "hideBindingHandles", "hideResizeHandles", "hideRotateHandles", "hideBounds", "hideGrid", "showDashedBrush", "hideCursors"]);
  WO(f, "#" + n);
  let te = c.useRef(null), ee = c.useRef(o);
  c.useEffect(() => {
    ee.current = o;
  }, [o]);
  let [de, he] = c.useState(() => ({ callbacks: J, shapeUtils: r, rSelectionBounds: te, rPageState: ee, bounds: { minX: 0, minY: 0, maxX: 1 / 0, maxY: 1 / 0, width: 1 / 0, height: 1 / 0 }, inputs: new Lt() })), Ce = c.useCallback((G) => {
    he((U) => Gr(Qe({}, U), { bounds: G }));
  }, []);
  return c.createElement(P4.Provider, { value: de }, c.createElement(X$, { id: n, page: i, pageState: o, assets: s, snapLines: p, eraseLine: g, grid: v, users: u, userId: l, externalContainerRef: E, hideBounds: B, hideIndicators: k, hideHandles: w, hideCloneHandles: A, hideBindingHandles: T, hideRotateHandle: I, hideResizeHandles: _, hideGrid: M, showDashedBrush: H, onBoundsChange: Ce, performanceMode: y, components: b, meta: h, hideCursors: Y }));
}
var Q$ = c.memo(J$), yf = c.memo(c.forwardRef(function(e, t) {
  var n = e, { children: r, className: i = "" } = n, o = qa(n, ["children", "className"]);
  return c.createElement("div", Qe({ ref: t, className: `tl-positioned-div ${i}`, draggable: !1 }, o), c.createElement("div", { className: "tl-inner-div" }, r));
})), Lm = class {
  constructor() {
    St(this, "refMap", /* @__PURE__ */ new Map()), St(this, "boundsCache", /* @__PURE__ */ new WeakMap()), St(this, "showCloneHandles", !1), St(this, "hideBounds", !1), St(this, "isStateful", !1), St(this, "shouldRender", (e, t) => !0), St(this, "getRef", (e) => (this.refMap.has(e.id) || this.refMap.set(e.id, c.createRef()), this.refMap.get(e.id))), St(this, "hitTestBounds", (e, t) => {
      let n = this.getBounds(e), r = Hn.getRotatedCorners(n, e.rotation);
      return r.every((i) => Hn.pointInBounds(i, t)) || qb(r, t).length > 0;
    }), St(this, "getRotatedBounds", (e) => Hn.getBoundsFromPoints(Hn.getRotatedCorners(this.getBounds(e), e.rotation)));
  }
};
St(Lm, "Component", (e) => c.forwardRef(e)), St(Lm, "Indicator", (e) => e);
/**
* String.prototype.replaceAll() polyfill
* https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
* @author Chris Ferdinandi
* @license MIT
*/
function Nm(e, t) {
  return Nm = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, r) {
    return n.__proto__ = r, n;
  }, Nm(e, t);
}
function eL(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Nm(e, t);
}
var tL = function(t, n) {
  return t === void 0 && (t = []), n === void 0 && (n = []), t.length !== n.length || t.some(function(r, i) {
    return !Object.is(r, n[i]);
  });
}, bC = {
  error: null
}, nL = /* @__PURE__ */ function(e) {
  eL(t, e);
  function t() {
    for (var r, i = arguments.length, o = new Array(i), s = 0; s < i; s++)
      o[s] = arguments[s];
    return r = e.call.apply(e, [this].concat(o)) || this, r.state = bC, r.resetErrorBoundary = function() {
      for (var u, l = arguments.length, f = new Array(l), h = 0; h < l; h++)
        f[h] = arguments[h];
      r.props.onReset == null || (u = r.props).onReset.apply(u, f), r.reset();
    }, r;
  }
  t.getDerivedStateFromError = function(i) {
    return {
      error: i
    };
  };
  var n = t.prototype;
  return n.reset = function() {
    this.setState(bC);
  }, n.componentDidCatch = function(i, o) {
    var s, u;
    (s = (u = this.props).onError) == null || s.call(u, i, o);
  }, n.componentDidUpdate = function(i, o) {
    var s = this.state.error, u = this.props.resetKeys;
    if (s !== null && o.error !== null && tL(i.resetKeys, u)) {
      var l, f;
      (l = (f = this.props).onResetKeysChange) == null || l.call(f, i.resetKeys, u), this.reset();
    }
  }, n.render = function() {
    var i = this.state.error, o = this.props, s = o.fallbackRender, u = o.FallbackComponent, l = o.fallback;
    if (i !== null) {
      var f = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (/* @__PURE__ */ c.isValidElement(l))
        return l;
      if (typeof s == "function")
        return s(f);
      if (u)
        return /* @__PURE__ */ c.createElement(u, f);
      throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop");
    }
    return this.props.children;
  }, t;
}(c.Component), zm = function(e, t) {
  return zm = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
  }, zm(e, t);
};
function cr(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  zm(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var ye = function() {
  return ye = Object.assign || function(t) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
  }, ye.apply(this, arguments);
};
function Ai(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  return n;
}
function ir(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, i = t.length, o; r < i; r++)
    (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
  return e.concat(o || Array.prototype.slice.call(t));
}
var rw = { exports: {} }, rt = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wC;
function rL() {
  if (wC) return rt;
  wC = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, o = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, h = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, E = e ? Symbol.for("react.lazy") : 60116, y = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
  function A(_) {
    if (typeof _ == "object" && _ !== null) {
      var I = _.$$typeof;
      switch (I) {
        case t:
          switch (_ = _.type, _) {
            case l:
            case f:
            case r:
            case o:
            case i:
            case p:
              return _;
            default:
              switch (_ = _ && _.$$typeof, _) {
                case u:
                case h:
                case E:
                case v:
                case s:
                  return _;
                default:
                  return I;
              }
          }
        case n:
          return I;
      }
    }
  }
  function T(_) {
    return A(_) === f;
  }
  return rt.AsyncMode = l, rt.ConcurrentMode = f, rt.ContextConsumer = u, rt.ContextProvider = s, rt.Element = t, rt.ForwardRef = h, rt.Fragment = r, rt.Lazy = E, rt.Memo = v, rt.Portal = n, rt.Profiler = o, rt.StrictMode = i, rt.Suspense = p, rt.isAsyncMode = function(_) {
    return T(_) || A(_) === l;
  }, rt.isConcurrentMode = T, rt.isContextConsumer = function(_) {
    return A(_) === u;
  }, rt.isContextProvider = function(_) {
    return A(_) === s;
  }, rt.isElement = function(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === t;
  }, rt.isForwardRef = function(_) {
    return A(_) === h;
  }, rt.isFragment = function(_) {
    return A(_) === r;
  }, rt.isLazy = function(_) {
    return A(_) === E;
  }, rt.isMemo = function(_) {
    return A(_) === v;
  }, rt.isPortal = function(_) {
    return A(_) === n;
  }, rt.isProfiler = function(_) {
    return A(_) === o;
  }, rt.isStrictMode = function(_) {
    return A(_) === i;
  }, rt.isSuspense = function(_) {
    return A(_) === p;
  }, rt.isValidElementType = function(_) {
    return typeof _ == "string" || typeof _ == "function" || _ === r || _ === f || _ === o || _ === i || _ === p || _ === g || typeof _ == "object" && _ !== null && (_.$$typeof === E || _.$$typeof === v || _.$$typeof === s || _.$$typeof === u || _.$$typeof === h || _.$$typeof === b || _.$$typeof === w || _.$$typeof === k || _.$$typeof === y);
  }, rt.typeOf = A, rt;
}
rw.exports = rL();
var iL = rw.exports, iw = iL, oL = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, sL = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, ow = {};
ow[iw.ForwardRef] = oL;
ow[iw.Memo] = sL;
function sw(e, t, n) {
  if (n === void 0 && (n = Error), !e)
    throw new n(t);
}
var Ye;
(function(e) {
  e[e.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", e[e.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", e[e.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", e[e.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", e[e.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", e[e.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", e[e.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", e[e.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", e[e.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", e[e.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", e[e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", e[e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", e[e.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", e[e.INVALID_TAG = 23] = "INVALID_TAG", e[e.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", e[e.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", e[e.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
})(Ye || (Ye = {}));
var gt;
(function(e) {
  e[e.literal = 0] = "literal", e[e.argument = 1] = "argument", e[e.number = 2] = "number", e[e.date = 3] = "date", e[e.time = 4] = "time", e[e.select = 5] = "select", e[e.plural = 6] = "plural", e[e.pound = 7] = "pound", e[e.tag = 8] = "tag";
})(gt || (gt = {}));
var Oa;
(function(e) {
  e[e.number = 0] = "number", e[e.dateTime = 1] = "dateTime";
})(Oa || (Oa = {}));
function SC(e) {
  return e.type === gt.literal;
}
function aL(e) {
  return e.type === gt.argument;
}
function aw(e) {
  return e.type === gt.number;
}
function uw(e) {
  return e.type === gt.date;
}
function lw(e) {
  return e.type === gt.time;
}
function cw(e) {
  return e.type === gt.select;
}
function dw(e) {
  return e.type === gt.plural;
}
function uL(e) {
  return e.type === gt.pound;
}
function fw(e) {
  return e.type === gt.tag;
}
function hw(e) {
  return !!(e && typeof e == "object" && e.type === Oa.number);
}
function jm(e) {
  return !!(e && typeof e == "object" && e.type === Oa.dateTime);
}
var pw = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, lL = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function cL(e) {
  var t = {};
  return e.replace(lL, function(n) {
    var r = n.length;
    switch (n[0]) {
      case "G":
        t.era = r === 4 ? "long" : r === 5 ? "narrow" : "short";
        break;
      case "y":
        t.year = r === 2 ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      case "M":
      case "L":
        t.month = ["numeric", "2-digit", "short", "long", "narrow"][r - 1];
        break;
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        t.day = ["numeric", "2-digit"][r - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      case "E":
        t.weekday = r === 4 ? "long" : r === 5 ? "narrow" : "short";
        break;
      case "e":
        if (r < 4)
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        t.weekday = ["short", "long", "narrow", "short"][r - 4];
        break;
      case "c":
        if (r < 4)
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        t.weekday = ["short", "long", "narrow", "short"][r - 4];
        break;
      case "a":
        t.hour12 = !0;
        break;
      case "b":
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      case "h":
        t.hourCycle = "h12", t.hour = ["numeric", "2-digit"][r - 1];
        break;
      case "H":
        t.hourCycle = "h23", t.hour = ["numeric", "2-digit"][r - 1];
        break;
      case "K":
        t.hourCycle = "h11", t.hour = ["numeric", "2-digit"][r - 1];
        break;
      case "k":
        t.hourCycle = "h24", t.hour = ["numeric", "2-digit"][r - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      case "m":
        t.minute = ["numeric", "2-digit"][r - 1];
        break;
      case "s":
        t.second = ["numeric", "2-digit"][r - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      case "z":
        t.timeZoneName = r < 4 ? "short" : "long";
        break;
      case "Z":
      case "O":
      case "v":
      case "V":
      case "X":
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  }), t;
}
var dL = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function fL(e) {
  if (e.length === 0)
    throw new Error("Number skeleton cannot be empty");
  for (var t = e.split(dL).filter(function(g) {
    return g.length > 0;
  }), n = [], r = 0, i = t; r < i.length; r++) {
    var o = i[r], s = o.split("/");
    if (s.length === 0)
      throw new Error("Invalid number skeleton");
    for (var u = s[0], l = s.slice(1), f = 0, h = l; f < h.length; f++) {
      var p = h[f];
      if (p.length === 0)
        throw new Error("Invalid number skeleton");
    }
    n.push({ stem: u, options: l });
  }
  return n;
}
function hL(e) {
  return e.replace(/^(.*?)-/, "");
}
var xC = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, mw = /^(@+)?(\+|#+)?[rs]?$/g, pL = /(\*)(0+)|(#+)(0+)|(0+)/g, gw = /^(0+)$/;
function kC(e) {
  var t = {};
  return e[e.length - 1] === "r" ? t.roundingPriority = "morePrecision" : e[e.length - 1] === "s" && (t.roundingPriority = "lessPrecision"), e.replace(mw, function(n, r, i) {
    return typeof i != "string" ? (t.minimumSignificantDigits = r.length, t.maximumSignificantDigits = r.length) : i === "+" ? t.minimumSignificantDigits = r.length : r[0] === "#" ? t.maximumSignificantDigits = r.length : (t.minimumSignificantDigits = r.length, t.maximumSignificantDigits = r.length + (typeof i == "string" ? i.length : 0)), "";
  }), t;
}
function vw(e) {
  switch (e) {
    case "sign-auto":
      return {
        signDisplay: "auto"
      };
    case "sign-accounting":
    case "()":
      return {
        currencySign: "accounting"
      };
    case "sign-always":
    case "+!":
      return {
        signDisplay: "always"
      };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return {
        signDisplay: "exceptZero"
      };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return {
        signDisplay: "never"
      };
  }
}
function mL(e) {
  var t;
  if (e[0] === "E" && e[1] === "E" ? (t = {
    notation: "engineering"
  }, e = e.slice(2)) : e[0] === "E" && (t = {
    notation: "scientific"
  }, e = e.slice(1)), t) {
    var n = e.slice(0, 2);
    if (n === "+!" ? (t.signDisplay = "always", e = e.slice(2)) : n === "+?" && (t.signDisplay = "exceptZero", e = e.slice(2)), !gw.test(e))
      throw new Error("Malformed concise eng/scientific notation");
    t.minimumIntegerDigits = e.length;
  }
  return t;
}
function DC(e) {
  var t = {}, n = vw(e);
  return n || t;
}
function gL(e) {
  for (var t = {}, n = 0, r = e; n < r.length; n++) {
    var i = r[n];
    switch (i.stem) {
      case "percent":
      case "%":
        t.style = "percent";
        continue;
      case "%x100":
        t.style = "percent", t.scale = 100;
        continue;
      case "currency":
        t.style = "currency", t.currency = i.options[0];
        continue;
      case "group-off":
      case ",_":
        t.useGrouping = !1;
        continue;
      case "precision-integer":
      case ".":
        t.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        t.style = "unit", t.unit = hL(i.options[0]);
        continue;
      case "compact-short":
      case "K":
        t.notation = "compact", t.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        t.notation = "compact", t.compactDisplay = "long";
        continue;
      case "scientific":
        t = ye(ye(ye({}, t), { notation: "scientific" }), i.options.reduce(function(l, f) {
          return ye(ye({}, l), DC(f));
        }, {}));
        continue;
      case "engineering":
        t = ye(ye(ye({}, t), { notation: "engineering" }), i.options.reduce(function(l, f) {
          return ye(ye({}, l), DC(f));
        }, {}));
        continue;
      case "notation-simple":
        t.notation = "standard";
        continue;
      case "unit-width-narrow":
        t.currencyDisplay = "narrowSymbol", t.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        t.currencyDisplay = "code", t.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        t.currencyDisplay = "name", t.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        t.currencyDisplay = "symbol";
        continue;
      case "scale":
        t.scale = parseFloat(i.options[0]);
        continue;
      case "rounding-mode-floor":
        t.roundingMode = "floor";
        continue;
      case "rounding-mode-ceiling":
        t.roundingMode = "ceil";
        continue;
      case "rounding-mode-down":
        t.roundingMode = "trunc";
        continue;
      case "rounding-mode-up":
        t.roundingMode = "expand";
        continue;
      case "rounding-mode-half-even":
        t.roundingMode = "halfEven";
        continue;
      case "rounding-mode-half-down":
        t.roundingMode = "halfTrunc";
        continue;
      case "rounding-mode-half-up":
        t.roundingMode = "halfExpand";
        continue;
      case "integer-width":
        if (i.options.length > 1)
          throw new RangeError("integer-width stems only accept a single optional option");
        i.options[0].replace(pL, function(l, f, h, p, g, v) {
          if (f)
            t.minimumIntegerDigits = h.length;
          else {
            if (p && g)
              throw new Error("We currently do not support maximum integer digits");
            if (v)
              throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (gw.test(i.stem)) {
      t.minimumIntegerDigits = i.stem.length;
      continue;
    }
    if (xC.test(i.stem)) {
      if (i.options.length > 1)
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      i.stem.replace(xC, function(l, f, h, p, g, v) {
        return h === "*" ? t.minimumFractionDigits = f.length : p && p[0] === "#" ? t.maximumFractionDigits = p.length : g && v ? (t.minimumFractionDigits = g.length, t.maximumFractionDigits = g.length + v.length) : (t.minimumFractionDigits = f.length, t.maximumFractionDigits = f.length), "";
      });
      var o = i.options[0];
      o === "w" ? t = ye(ye({}, t), { trailingZeroDisplay: "stripIfInteger" }) : o && (t = ye(ye({}, t), kC(o)));
      continue;
    }
    if (mw.test(i.stem)) {
      t = ye(ye({}, t), kC(i.stem));
      continue;
    }
    var s = vw(i.stem);
    s && (t = ye(ye({}, t), s));
    var u = mL(i.stem);
    u && (t = ye(ye({}, t), u));
  }
  return t;
}
var B0 = {
  "001": [
    "H",
    "h"
  ],
  AC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  AD: [
    "H",
    "hB"
  ],
  AE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  AF: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  AG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  AI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  AL: [
    "h",
    "H",
    "hB"
  ],
  AM: [
    "H",
    "hB"
  ],
  AO: [
    "H",
    "hB"
  ],
  AR: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  AS: [
    "h",
    "H"
  ],
  AT: [
    "H",
    "hB"
  ],
  AU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  AW: [
    "H",
    "hB"
  ],
  AX: [
    "H"
  ],
  AZ: [
    "H",
    "hB",
    "h"
  ],
  BA: [
    "H",
    "hB",
    "h"
  ],
  BB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BD: [
    "h",
    "hB",
    "H"
  ],
  BE: [
    "H",
    "hB"
  ],
  BF: [
    "H",
    "hB"
  ],
  BG: [
    "H",
    "hB",
    "h"
  ],
  BH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  BI: [
    "H",
    "h"
  ],
  BJ: [
    "H",
    "hB"
  ],
  BL: [
    "H",
    "hB"
  ],
  BM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BN: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  BO: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  BQ: [
    "H"
  ],
  BR: [
    "H",
    "hB"
  ],
  BS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BT: [
    "h",
    "H"
  ],
  BW: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  BY: [
    "H",
    "h"
  ],
  BZ: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CA: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  CC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CD: [
    "hB",
    "H"
  ],
  CF: [
    "H",
    "h",
    "hB"
  ],
  CG: [
    "H",
    "hB"
  ],
  CH: [
    "H",
    "hB",
    "h"
  ],
  CI: [
    "H",
    "hB"
  ],
  CK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CL: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  CM: [
    "H",
    "h",
    "hB"
  ],
  CN: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  CO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CP: [
    "H"
  ],
  CR: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  CU: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  CV: [
    "H",
    "hB"
  ],
  CW: [
    "H",
    "hB"
  ],
  CX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CY: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  CZ: [
    "H"
  ],
  DE: [
    "H",
    "hB"
  ],
  DG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  DJ: [
    "h",
    "H"
  ],
  DK: [
    "H"
  ],
  DM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  DO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  DZ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  EC: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  EE: [
    "H",
    "hB"
  ],
  EG: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  ER: [
    "h",
    "H"
  ],
  ES: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  ET: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  FI: [
    "H"
  ],
  FJ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  FM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FO: [
    "H",
    "h"
  ],
  FR: [
    "H",
    "hB"
  ],
  GA: [
    "H",
    "hB"
  ],
  GB: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GD: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GE: [
    "H",
    "hB",
    "h"
  ],
  GF: [
    "H",
    "hB"
  ],
  GG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GH: [
    "h",
    "H"
  ],
  GI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GL: [
    "H",
    "h"
  ],
  GM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GN: [
    "H",
    "hB"
  ],
  GP: [
    "H",
    "hB"
  ],
  GQ: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  GR: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  GT: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  GU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GW: [
    "H",
    "hB"
  ],
  GY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  HK: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  HN: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  HR: [
    "H",
    "hB"
  ],
  HU: [
    "H",
    "h"
  ],
  IC: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  ID: [
    "H"
  ],
  IE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IL: [
    "H",
    "hB"
  ],
  IM: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IN: [
    "h",
    "H"
  ],
  IO: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IQ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  IR: [
    "hB",
    "H"
  ],
  IS: [
    "H"
  ],
  IT: [
    "H",
    "hB"
  ],
  JE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  JM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  JO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  JP: [
    "H",
    "K",
    "h"
  ],
  KE: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  KG: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KH: [
    "hB",
    "h",
    "H",
    "hb"
  ],
  KI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KM: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KN: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KP: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KW: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  KY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KZ: [
    "H",
    "hB"
  ],
  LA: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  LB: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  LC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LI: [
    "H",
    "hB",
    "h"
  ],
  LK: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  LR: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LS: [
    "h",
    "H"
  ],
  LT: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  LU: [
    "H",
    "h",
    "hB"
  ],
  LV: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  LY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  MC: [
    "H",
    "hB"
  ],
  MD: [
    "H",
    "hB"
  ],
  ME: [
    "H",
    "hB",
    "h"
  ],
  MF: [
    "H",
    "hB"
  ],
  MG: [
    "H",
    "h"
  ],
  MH: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  ML: [
    "H"
  ],
  MM: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  MN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MP: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MQ: [
    "H",
    "hB"
  ],
  MR: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MS: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MT: [
    "H",
    "h"
  ],
  MU: [
    "H",
    "h"
  ],
  MV: [
    "H",
    "h"
  ],
  MW: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MX: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  MY: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  MZ: [
    "H",
    "hB"
  ],
  NA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  NC: [
    "H",
    "hB"
  ],
  NE: [
    "H"
  ],
  NF: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NI: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  NL: [
    "H",
    "hB"
  ],
  NO: [
    "H",
    "h"
  ],
  NP: [
    "H",
    "h",
    "hB"
  ],
  NR: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NU: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  OM: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PE: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  PF: [
    "H",
    "h",
    "hB"
  ],
  PG: [
    "h",
    "H"
  ],
  PH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PK: [
    "h",
    "hB",
    "H"
  ],
  PL: [
    "H",
    "h"
  ],
  PM: [
    "H",
    "hB"
  ],
  PN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  PR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PS: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PT: [
    "H",
    "hB"
  ],
  PW: [
    "h",
    "H"
  ],
  PY: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  QA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  RE: [
    "H",
    "hB"
  ],
  RO: [
    "H",
    "hB"
  ],
  RS: [
    "H",
    "hB",
    "h"
  ],
  RU: [
    "H"
  ],
  RW: [
    "H",
    "h"
  ],
  SA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SC: [
    "H",
    "h",
    "hB"
  ],
  SD: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SE: [
    "H"
  ],
  SG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SH: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SI: [
    "H",
    "hB"
  ],
  SJ: [
    "H"
  ],
  SK: [
    "H"
  ],
  SL: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SM: [
    "H",
    "h",
    "hB"
  ],
  SN: [
    "H",
    "h",
    "hB"
  ],
  SO: [
    "h",
    "H"
  ],
  SR: [
    "H",
    "hB"
  ],
  SS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  ST: [
    "H",
    "hB"
  ],
  SV: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  SX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  TC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TD: [
    "h",
    "H",
    "hB"
  ],
  TF: [
    "H",
    "h",
    "hB"
  ],
  TG: [
    "H",
    "hB"
  ],
  TH: [
    "H",
    "h"
  ],
  TJ: [
    "H",
    "h"
  ],
  TL: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  TM: [
    "H",
    "h"
  ],
  TN: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  TO: [
    "h",
    "H"
  ],
  TR: [
    "H",
    "hB"
  ],
  TT: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TW: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  TZ: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  UA: [
    "H",
    "hB",
    "h"
  ],
  UG: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  UM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  US: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  UY: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  UZ: [
    "H",
    "hB",
    "h"
  ],
  VA: [
    "H",
    "h",
    "hB"
  ],
  VC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VE: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  VG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VN: [
    "H",
    "h"
  ],
  VU: [
    "h",
    "H"
  ],
  WF: [
    "H",
    "hB"
  ],
  WS: [
    "h",
    "H"
  ],
  XK: [
    "H",
    "hB",
    "h"
  ],
  YE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  YT: [
    "H",
    "hB"
  ],
  ZA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  ZM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  ZW: [
    "H",
    "h"
  ],
  "af-ZA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "ar-001": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "ca-ES": [
    "H",
    "h",
    "hB"
  ],
  "en-001": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "es-BO": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-BR": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-EC": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-ES": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-GQ": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-PE": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "fr-CA": [
    "H",
    "h",
    "hB"
  ],
  "gl-ES": [
    "H",
    "h",
    "hB"
  ],
  "gu-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "hi-IN": [
    "hB",
    "h",
    "H"
  ],
  "it-CH": [
    "H",
    "h",
    "hB"
  ],
  "it-IT": [
    "H",
    "h",
    "hB"
  ],
  "kn-IN": [
    "hB",
    "h",
    "H"
  ],
  "ml-IN": [
    "hB",
    "h",
    "H"
  ],
  "mr-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "pa-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "ta-IN": [
    "hB",
    "h",
    "hb",
    "H"
  ],
  "te-IN": [
    "hB",
    "h",
    "H"
  ],
  "zu-ZA": [
    "H",
    "hB",
    "hb",
    "h"
  ]
};
function vL(e, t) {
  for (var n = "", r = 0; r < e.length; r++) {
    var i = e.charAt(r);
    if (i === "j") {
      for (var o = 0; r + 1 < e.length && e.charAt(r + 1) === i; )
        o++, r++;
      var s = 1 + (o & 1), u = o < 2 ? 1 : 3 + (o >> 1), l = "a", f = EL(t);
      for ((f == "H" || f == "k") && (u = 0); u-- > 0; )
        n += l;
      for (; s-- > 0; )
        n = f + n;
    } else i === "J" ? n += "H" : n += i;
  }
  return n;
}
function EL(e) {
  var t = e.hourCycle;
  if (t === void 0 && // @ts-ignore hourCycle(s) is not identified yet
  e.hourCycles && // @ts-ignore
  e.hourCycles.length && (t = e.hourCycles[0]), t)
    switch (t) {
      case "h24":
        return "k";
      case "h23":
        return "H";
      case "h12":
        return "h";
      case "h11":
        return "K";
      default:
        throw new Error("Invalid hourCycle");
    }
  var n = e.language, r;
  n !== "root" && (r = e.maximize().region);
  var i = B0[r || ""] || B0[n || ""] || B0["".concat(n, "-001")] || B0["001"];
  return i[0];
}
var h1, CL = new RegExp("^".concat(pw.source, "*")), yL = new RegExp("".concat(pw.source, "*$"));
function Ze(e, t) {
  return { start: e, end: t };
}
var bL = !!String.prototype.startsWith && "_a".startsWith("a", 1), wL = !!String.fromCodePoint, SL = !!Object.fromEntries, xL = !!String.prototype.codePointAt, kL = !!String.prototype.trimStart, DL = !!String.prototype.trimEnd, AL = !!Number.isSafeInteger, IL = AL ? Number.isSafeInteger : function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e && Math.abs(e) <= 9007199254740991;
}, Hm = !0;
try {
  var PL = Cw("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  Hm = ((h1 = PL.exec("a")) === null || h1 === void 0 ? void 0 : h1[0]) === "a";
} catch {
  Hm = !1;
}
var AC = bL ? (
  // Native
  function(t, n, r) {
    return t.startsWith(n, r);
  }
) : (
  // For IE11
  function(t, n, r) {
    return t.slice(r, r + n.length) === n;
  }
), Um = wL ? String.fromCodePoint : (
  // IE11
  function() {
    for (var t = [], n = 0; n < arguments.length; n++)
      t[n] = arguments[n];
    for (var r = "", i = t.length, o = 0, s; i > o; ) {
      if (s = t[o++], s > 1114111)
        throw RangeError(s + " is not a valid code point");
      r += s < 65536 ? String.fromCharCode(s) : String.fromCharCode(((s -= 65536) >> 10) + 55296, s % 1024 + 56320);
    }
    return r;
  }
), IC = (
  // native
  SL ? Object.fromEntries : (
    // Ponyfill
    function(t) {
      for (var n = {}, r = 0, i = t; r < i.length; r++) {
        var o = i[r], s = o[0], u = o[1];
        n[s] = u;
      }
      return n;
    }
  )
), Ew = xL ? (
  // Native
  function(t, n) {
    return t.codePointAt(n);
  }
) : (
  // IE 11
  function(t, n) {
    var r = t.length;
    if (!(n < 0 || n >= r)) {
      var i = t.charCodeAt(n), o;
      return i < 55296 || i > 56319 || n + 1 === r || (o = t.charCodeAt(n + 1)) < 56320 || o > 57343 ? i : (i - 55296 << 10) + (o - 56320) + 65536;
    }
  }
), _L = kL ? (
  // Native
  function(t) {
    return t.trimStart();
  }
) : (
  // Ponyfill
  function(t) {
    return t.replace(CL, "");
  }
), TL = DL ? (
  // Native
  function(t) {
    return t.trimEnd();
  }
) : (
  // Ponyfill
  function(t) {
    return t.replace(yL, "");
  }
);
function Cw(e, t) {
  return new RegExp(e, t);
}
var Vm;
if (Hm) {
  var PC = Cw("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  Vm = function(t, n) {
    var r;
    PC.lastIndex = n;
    var i = PC.exec(t);
    return (r = i[1]) !== null && r !== void 0 ? r : "";
  };
} else
  Vm = function(t, n) {
    for (var r = []; ; ) {
      var i = Ew(t, n);
      if (i === void 0 || yw(i) || RL(i))
        break;
      r.push(i), n += i >= 65536 ? 2 : 1;
    }
    return Um.apply(void 0, r);
  };
var FL = (
  /** @class */
  function() {
    function e(t, n) {
      n === void 0 && (n = {}), this.message = t, this.position = { offset: 0, line: 1, column: 1 }, this.ignoreTag = !!n.ignoreTag, this.locale = n.locale, this.requiresOtherClause = !!n.requiresOtherClause, this.shouldParseSkeletons = !!n.shouldParseSkeletons;
    }
    return e.prototype.parse = function() {
      if (this.offset() !== 0)
        throw Error("parser can only be used once");
      return this.parseMessage(0, "", !1);
    }, e.prototype.parseMessage = function(t, n, r) {
      for (var i = []; !this.isEOF(); ) {
        var o = this.char();
        if (o === 123) {
          var s = this.parseArgument(t, r);
          if (s.err)
            return s;
          i.push(s.val);
        } else {
          if (o === 125 && t > 0)
            break;
          if (o === 35 && (n === "plural" || n === "selectordinal")) {
            var u = this.clonePosition();
            this.bump(), i.push({
              type: gt.pound,
              location: Ze(u, this.clonePosition())
            });
          } else if (o === 60 && !this.ignoreTag && this.peek() === 47) {
            if (r)
              break;
            return this.error(Ye.UNMATCHED_CLOSING_TAG, Ze(this.clonePosition(), this.clonePosition()));
          } else if (o === 60 && !this.ignoreTag && Gm(this.peek() || 0)) {
            var s = this.parseTag(t, n);
            if (s.err)
              return s;
            i.push(s.val);
          } else {
            var s = this.parseLiteral(t, n);
            if (s.err)
              return s;
            i.push(s.val);
          }
        }
      }
      return { val: i, err: null };
    }, e.prototype.parseTag = function(t, n) {
      var r = this.clonePosition();
      this.bump();
      var i = this.parseTagName();
      if (this.bumpSpace(), this.bumpIf("/>"))
        return {
          val: {
            type: gt.literal,
            value: "<".concat(i, "/>"),
            location: Ze(r, this.clonePosition())
          },
          err: null
        };
      if (this.bumpIf(">")) {
        var o = this.parseMessage(t + 1, n, !0);
        if (o.err)
          return o;
        var s = o.val, u = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !Gm(this.char()))
            return this.error(Ye.INVALID_TAG, Ze(u, this.clonePosition()));
          var l = this.clonePosition(), f = this.parseTagName();
          return i !== f ? this.error(Ye.UNMATCHED_CLOSING_TAG, Ze(l, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
            val: {
              type: gt.tag,
              value: i,
              children: s,
              location: Ze(r, this.clonePosition())
            },
            err: null
          } : this.error(Ye.INVALID_TAG, Ze(u, this.clonePosition())));
        } else
          return this.error(Ye.UNCLOSED_TAG, Ze(r, this.clonePosition()));
      } else
        return this.error(Ye.INVALID_TAG, Ze(r, this.clonePosition()));
    }, e.prototype.parseTagName = function() {
      var t = this.offset();
      for (this.bump(); !this.isEOF() && ML(this.char()); )
        this.bump();
      return this.message.slice(t, this.offset());
    }, e.prototype.parseLiteral = function(t, n) {
      for (var r = this.clonePosition(), i = ""; ; ) {
        var o = this.tryParseQuote(n);
        if (o) {
          i += o;
          continue;
        }
        var s = this.tryParseUnquoted(t, n);
        if (s) {
          i += s;
          continue;
        }
        var u = this.tryParseLeftAngleBracket();
        if (u) {
          i += u;
          continue;
        }
        break;
      }
      var l = Ze(r, this.clonePosition());
      return {
        val: { type: gt.literal, value: i, location: l },
        err: null
      };
    }, e.prototype.tryParseLeftAngleBracket = function() {
      return !this.isEOF() && this.char() === 60 && (this.ignoreTag || // If at the opening tag or closing tag position, bail.
      !BL(this.peek() || 0)) ? (this.bump(), "<") : null;
    }, e.prototype.tryParseQuote = function(t) {
      if (this.isEOF() || this.char() !== 39)
        return null;
      switch (this.peek()) {
        case 39:
          return this.bump(), this.bump(), "'";
        case 123:
        case 60:
        case 62:
        case 125:
          break;
        case 35:
          if (t === "plural" || t === "selectordinal")
            break;
          return null;
        default:
          return null;
      }
      this.bump();
      var n = [this.char()];
      for (this.bump(); !this.isEOF(); ) {
        var r = this.char();
        if (r === 39)
          if (this.peek() === 39)
            n.push(39), this.bump();
          else {
            this.bump();
            break;
          }
        else
          n.push(r);
        this.bump();
      }
      return Um.apply(void 0, n);
    }, e.prototype.tryParseUnquoted = function(t, n) {
      if (this.isEOF())
        return null;
      var r = this.char();
      return r === 60 || r === 123 || r === 35 && (n === "plural" || n === "selectordinal") || r === 125 && t > 0 ? null : (this.bump(), Um(r));
    }, e.prototype.parseArgument = function(t, n) {
      var r = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF())
        return this.error(Ye.EXPECT_ARGUMENT_CLOSING_BRACE, Ze(r, this.clonePosition()));
      if (this.char() === 125)
        return this.bump(), this.error(Ye.EMPTY_ARGUMENT, Ze(r, this.clonePosition()));
      var i = this.parseIdentifierIfPossible().value;
      if (!i)
        return this.error(Ye.MALFORMED_ARGUMENT, Ze(r, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF())
        return this.error(Ye.EXPECT_ARGUMENT_CLOSING_BRACE, Ze(r, this.clonePosition()));
      switch (this.char()) {
        case 125:
          return this.bump(), {
            val: {
              type: gt.argument,
              // value does not include the opening and closing braces.
              value: i,
              location: Ze(r, this.clonePosition())
            },
            err: null
          };
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(Ye.EXPECT_ARGUMENT_CLOSING_BRACE, Ze(r, this.clonePosition())) : this.parseArgumentOptions(t, n, i, r);
        default:
          return this.error(Ye.MALFORMED_ARGUMENT, Ze(r, this.clonePosition()));
      }
    }, e.prototype.parseIdentifierIfPossible = function() {
      var t = this.clonePosition(), n = this.offset(), r = Vm(this.message, n), i = n + r.length;
      this.bumpTo(i);
      var o = this.clonePosition(), s = Ze(t, o);
      return { value: r, location: s };
    }, e.prototype.parseArgumentOptions = function(t, n, r, i) {
      var o, s = this.clonePosition(), u = this.parseIdentifierIfPossible().value, l = this.clonePosition();
      switch (u) {
        case "":
          return this.error(Ye.EXPECT_ARGUMENT_TYPE, Ze(s, l));
        case "number":
        case "date":
        case "time": {
          this.bumpSpace();
          var f = null;
          if (this.bumpIf(",")) {
            this.bumpSpace();
            var h = this.clonePosition(), p = this.parseSimpleArgStyleIfPossible();
            if (p.err)
              return p;
            var g = TL(p.val);
            if (g.length === 0)
              return this.error(Ye.EXPECT_ARGUMENT_STYLE, Ze(this.clonePosition(), this.clonePosition()));
            var v = Ze(h, this.clonePosition());
            f = { style: g, styleLocation: v };
          }
          var E = this.tryParseArgumentClose(i);
          if (E.err)
            return E;
          var y = Ze(i, this.clonePosition());
          if (f && AC(f == null ? void 0 : f.style, "::", 0)) {
            var b = _L(f.style.slice(2));
            if (u === "number") {
              var p = this.parseNumberSkeletonFromString(b, f.styleLocation);
              return p.err ? p : {
                val: { type: gt.number, value: r, location: y, style: p.val },
                err: null
              };
            } else {
              if (b.length === 0)
                return this.error(Ye.EXPECT_DATE_TIME_SKELETON, y);
              var w = b;
              this.locale && (w = vL(b, this.locale));
              var g = {
                type: Oa.dateTime,
                pattern: w,
                location: f.styleLocation,
                parsedOptions: this.shouldParseSkeletons ? cL(w) : {}
              }, k = u === "date" ? gt.date : gt.time;
              return {
                val: { type: k, value: r, location: y, style: g },
                err: null
              };
            }
          }
          return {
            val: {
              type: u === "number" ? gt.number : u === "date" ? gt.date : gt.time,
              value: r,
              location: y,
              style: (o = f == null ? void 0 : f.style) !== null && o !== void 0 ? o : null
            },
            err: null
          };
        }
        case "plural":
        case "selectordinal":
        case "select": {
          var A = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(","))
            return this.error(Ye.EXPECT_SELECT_ARGUMENT_OPTIONS, Ze(A, ye({}, A)));
          this.bumpSpace();
          var T = this.parseIdentifierIfPossible(), _ = 0;
          if (u !== "select" && T.value === "offset") {
            if (!this.bumpIf(":"))
              return this.error(Ye.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, Ze(this.clonePosition(), this.clonePosition()));
            this.bumpSpace();
            var p = this.tryParseDecimalInteger(Ye.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, Ye.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
            if (p.err)
              return p;
            this.bumpSpace(), T = this.parseIdentifierIfPossible(), _ = p.val;
          }
          var I = this.tryParsePluralOrSelectOptions(t, u, n, T);
          if (I.err)
            return I;
          var E = this.tryParseArgumentClose(i);
          if (E.err)
            return E;
          var B = Ze(i, this.clonePosition());
          return u === "select" ? {
            val: {
              type: gt.select,
              value: r,
              options: IC(I.val),
              location: B
            },
            err: null
          } : {
            val: {
              type: gt.plural,
              value: r,
              options: IC(I.val),
              offset: _,
              pluralType: u === "plural" ? "cardinal" : "ordinal",
              location: B
            },
            err: null
          };
        }
        default:
          return this.error(Ye.INVALID_ARGUMENT_TYPE, Ze(s, l));
      }
    }, e.prototype.tryParseArgumentClose = function(t) {
      return this.isEOF() || this.char() !== 125 ? this.error(Ye.EXPECT_ARGUMENT_CLOSING_BRACE, Ze(t, this.clonePosition())) : (this.bump(), { val: !0, err: null });
    }, e.prototype.parseSimpleArgStyleIfPossible = function() {
      for (var t = 0, n = this.clonePosition(); !this.isEOF(); ) {
        var r = this.char();
        switch (r) {
          case 39: {
            this.bump();
            var i = this.clonePosition();
            if (!this.bumpUntil("'"))
              return this.error(Ye.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, Ze(i, this.clonePosition()));
            this.bump();
            break;
          }
          case 123: {
            t += 1, this.bump();
            break;
          }
          case 125: {
            if (t > 0)
              t -= 1;
            else
              return {
                val: this.message.slice(n.offset, this.offset()),
                err: null
              };
            break;
          }
          default:
            this.bump();
            break;
        }
      }
      return {
        val: this.message.slice(n.offset, this.offset()),
        err: null
      };
    }, e.prototype.parseNumberSkeletonFromString = function(t, n) {
      var r = [];
      try {
        r = fL(t);
      } catch {
        return this.error(Ye.INVALID_NUMBER_SKELETON, n);
      }
      return {
        val: {
          type: Oa.number,
          tokens: r,
          location: n,
          parsedOptions: this.shouldParseSkeletons ? gL(r) : {}
        },
        err: null
      };
    }, e.prototype.tryParsePluralOrSelectOptions = function(t, n, r, i) {
      for (var o, s = !1, u = [], l = /* @__PURE__ */ new Set(), f = i.value, h = i.location; ; ) {
        if (f.length === 0) {
          var p = this.clonePosition();
          if (n !== "select" && this.bumpIf("=")) {
            var g = this.tryParseDecimalInteger(Ye.EXPECT_PLURAL_ARGUMENT_SELECTOR, Ye.INVALID_PLURAL_ARGUMENT_SELECTOR);
            if (g.err)
              return g;
            h = Ze(p, this.clonePosition()), f = this.message.slice(p.offset, this.offset());
          } else
            break;
        }
        if (l.has(f))
          return this.error(n === "select" ? Ye.DUPLICATE_SELECT_ARGUMENT_SELECTOR : Ye.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, h);
        f === "other" && (s = !0), this.bumpSpace();
        var v = this.clonePosition();
        if (!this.bumpIf("{"))
          return this.error(n === "select" ? Ye.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : Ye.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, Ze(this.clonePosition(), this.clonePosition()));
        var E = this.parseMessage(t + 1, n, r);
        if (E.err)
          return E;
        var y = this.tryParseArgumentClose(v);
        if (y.err)
          return y;
        u.push([
          f,
          {
            value: E.val,
            location: Ze(v, this.clonePosition())
          }
        ]), l.add(f), this.bumpSpace(), o = this.parseIdentifierIfPossible(), f = o.value, h = o.location;
      }
      return u.length === 0 ? this.error(n === "select" ? Ye.EXPECT_SELECT_ARGUMENT_SELECTOR : Ye.EXPECT_PLURAL_ARGUMENT_SELECTOR, Ze(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !s ? this.error(Ye.MISSING_OTHER_CLAUSE, Ze(this.clonePosition(), this.clonePosition())) : { val: u, err: null };
    }, e.prototype.tryParseDecimalInteger = function(t, n) {
      var r = 1, i = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (r = -1);
      for (var o = !1, s = 0; !this.isEOF(); ) {
        var u = this.char();
        if (u >= 48 && u <= 57)
          o = !0, s = s * 10 + (u - 48), this.bump();
        else
          break;
      }
      var l = Ze(i, this.clonePosition());
      return o ? (s *= r, IL(s) ? { val: s, err: null } : this.error(n, l)) : this.error(t, l);
    }, e.prototype.offset = function() {
      return this.position.offset;
    }, e.prototype.isEOF = function() {
      return this.offset() === this.message.length;
    }, e.prototype.clonePosition = function() {
      return {
        offset: this.position.offset,
        line: this.position.line,
        column: this.position.column
      };
    }, e.prototype.char = function() {
      var t = this.position.offset;
      if (t >= this.message.length)
        throw Error("out of bound");
      var n = Ew(this.message, t);
      if (n === void 0)
        throw Error("Offset ".concat(t, " is at invalid UTF-16 code unit boundary"));
      return n;
    }, e.prototype.error = function(t, n) {
      return {
        val: null,
        err: {
          kind: t,
          message: this.message,
          location: n
        }
      };
    }, e.prototype.bump = function() {
      if (!this.isEOF()) {
        var t = this.char();
        t === 10 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += t < 65536 ? 1 : 2);
      }
    }, e.prototype.bumpIf = function(t) {
      if (AC(this.message, t, this.offset())) {
        for (var n = 0; n < t.length; n++)
          this.bump();
        return !0;
      }
      return !1;
    }, e.prototype.bumpUntil = function(t) {
      var n = this.offset(), r = this.message.indexOf(t, n);
      return r >= 0 ? (this.bumpTo(r), !0) : (this.bumpTo(this.message.length), !1);
    }, e.prototype.bumpTo = function(t) {
      if (this.offset() > t)
        throw Error("targetOffset ".concat(t, " must be greater than or equal to the current offset ").concat(this.offset()));
      for (t = Math.min(t, this.message.length); ; ) {
        var n = this.offset();
        if (n === t)
          break;
        if (n > t)
          throw Error("targetOffset ".concat(t, " is at invalid UTF-16 code unit boundary"));
        if (this.bump(), this.isEOF())
          break;
      }
    }, e.prototype.bumpSpace = function() {
      for (; !this.isEOF() && yw(this.char()); )
        this.bump();
    }, e.prototype.peek = function() {
      if (this.isEOF())
        return null;
      var t = this.char(), n = this.offset(), r = this.message.charCodeAt(n + (t >= 65536 ? 2 : 1));
      return r ?? null;
    }, e;
  }()
);
function Gm(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function BL(e) {
  return Gm(e) || e === 47;
}
function ML(e) {
  return e === 45 || e === 46 || e >= 48 && e <= 57 || e === 95 || e >= 97 && e <= 122 || e >= 65 && e <= 90 || e == 183 || e >= 192 && e <= 214 || e >= 216 && e <= 246 || e >= 248 && e <= 893 || e >= 895 && e <= 8191 || e >= 8204 && e <= 8205 || e >= 8255 && e <= 8256 || e >= 8304 && e <= 8591 || e >= 11264 && e <= 12271 || e >= 12289 && e <= 55295 || e >= 63744 && e <= 64975 || e >= 65008 && e <= 65533 || e >= 65536 && e <= 983039;
}
function yw(e) {
  return e >= 9 && e <= 13 || e === 32 || e === 133 || e >= 8206 && e <= 8207 || e === 8232 || e === 8233;
}
function RL(e) {
  return e >= 33 && e <= 35 || e === 36 || e >= 37 && e <= 39 || e === 40 || e === 41 || e === 42 || e === 43 || e === 44 || e === 45 || e >= 46 && e <= 47 || e >= 58 && e <= 59 || e >= 60 && e <= 62 || e >= 63 && e <= 64 || e === 91 || e === 92 || e === 93 || e === 94 || e === 96 || e === 123 || e === 124 || e === 125 || e === 126 || e === 161 || e >= 162 && e <= 165 || e === 166 || e === 167 || e === 169 || e === 171 || e === 172 || e === 174 || e === 176 || e === 177 || e === 182 || e === 187 || e === 191 || e === 215 || e === 247 || e >= 8208 && e <= 8213 || e >= 8214 && e <= 8215 || e === 8216 || e === 8217 || e === 8218 || e >= 8219 && e <= 8220 || e === 8221 || e === 8222 || e === 8223 || e >= 8224 && e <= 8231 || e >= 8240 && e <= 8248 || e === 8249 || e === 8250 || e >= 8251 && e <= 8254 || e >= 8257 && e <= 8259 || e === 8260 || e === 8261 || e === 8262 || e >= 8263 && e <= 8273 || e === 8274 || e === 8275 || e >= 8277 && e <= 8286 || e >= 8592 && e <= 8596 || e >= 8597 && e <= 8601 || e >= 8602 && e <= 8603 || e >= 8604 && e <= 8607 || e === 8608 || e >= 8609 && e <= 8610 || e === 8611 || e >= 8612 && e <= 8613 || e === 8614 || e >= 8615 && e <= 8621 || e === 8622 || e >= 8623 && e <= 8653 || e >= 8654 && e <= 8655 || e >= 8656 && e <= 8657 || e === 8658 || e === 8659 || e === 8660 || e >= 8661 && e <= 8691 || e >= 8692 && e <= 8959 || e >= 8960 && e <= 8967 || e === 8968 || e === 8969 || e === 8970 || e === 8971 || e >= 8972 && e <= 8991 || e >= 8992 && e <= 8993 || e >= 8994 && e <= 9e3 || e === 9001 || e === 9002 || e >= 9003 && e <= 9083 || e === 9084 || e >= 9085 && e <= 9114 || e >= 9115 && e <= 9139 || e >= 9140 && e <= 9179 || e >= 9180 && e <= 9185 || e >= 9186 && e <= 9254 || e >= 9255 && e <= 9279 || e >= 9280 && e <= 9290 || e >= 9291 && e <= 9311 || e >= 9472 && e <= 9654 || e === 9655 || e >= 9656 && e <= 9664 || e === 9665 || e >= 9666 && e <= 9719 || e >= 9720 && e <= 9727 || e >= 9728 && e <= 9838 || e === 9839 || e >= 9840 && e <= 10087 || e === 10088 || e === 10089 || e === 10090 || e === 10091 || e === 10092 || e === 10093 || e === 10094 || e === 10095 || e === 10096 || e === 10097 || e === 10098 || e === 10099 || e === 10100 || e === 10101 || e >= 10132 && e <= 10175 || e >= 10176 && e <= 10180 || e === 10181 || e === 10182 || e >= 10183 && e <= 10213 || e === 10214 || e === 10215 || e === 10216 || e === 10217 || e === 10218 || e === 10219 || e === 10220 || e === 10221 || e === 10222 || e === 10223 || e >= 10224 && e <= 10239 || e >= 10240 && e <= 10495 || e >= 10496 && e <= 10626 || e === 10627 || e === 10628 || e === 10629 || e === 10630 || e === 10631 || e === 10632 || e === 10633 || e === 10634 || e === 10635 || e === 10636 || e === 10637 || e === 10638 || e === 10639 || e === 10640 || e === 10641 || e === 10642 || e === 10643 || e === 10644 || e === 10645 || e === 10646 || e === 10647 || e === 10648 || e >= 10649 && e <= 10711 || e === 10712 || e === 10713 || e === 10714 || e === 10715 || e >= 10716 && e <= 10747 || e === 10748 || e === 10749 || e >= 10750 && e <= 11007 || e >= 11008 && e <= 11055 || e >= 11056 && e <= 11076 || e >= 11077 && e <= 11078 || e >= 11079 && e <= 11084 || e >= 11085 && e <= 11123 || e >= 11124 && e <= 11125 || e >= 11126 && e <= 11157 || e === 11158 || e >= 11159 && e <= 11263 || e >= 11776 && e <= 11777 || e === 11778 || e === 11779 || e === 11780 || e === 11781 || e >= 11782 && e <= 11784 || e === 11785 || e === 11786 || e === 11787 || e === 11788 || e === 11789 || e >= 11790 && e <= 11798 || e === 11799 || e >= 11800 && e <= 11801 || e === 11802 || e === 11803 || e === 11804 || e === 11805 || e >= 11806 && e <= 11807 || e === 11808 || e === 11809 || e === 11810 || e === 11811 || e === 11812 || e === 11813 || e === 11814 || e === 11815 || e === 11816 || e === 11817 || e >= 11818 && e <= 11822 || e === 11823 || e >= 11824 && e <= 11833 || e >= 11834 && e <= 11835 || e >= 11836 && e <= 11839 || e === 11840 || e === 11841 || e === 11842 || e >= 11843 && e <= 11855 || e >= 11856 && e <= 11857 || e === 11858 || e >= 11859 && e <= 11903 || e >= 12289 && e <= 12291 || e === 12296 || e === 12297 || e === 12298 || e === 12299 || e === 12300 || e === 12301 || e === 12302 || e === 12303 || e === 12304 || e === 12305 || e >= 12306 && e <= 12307 || e === 12308 || e === 12309 || e === 12310 || e === 12311 || e === 12312 || e === 12313 || e === 12314 || e === 12315 || e === 12316 || e === 12317 || e >= 12318 && e <= 12319 || e === 12320 || e === 12336 || e === 64830 || e === 64831 || e >= 65093 && e <= 65094;
}
function Wm(e) {
  e.forEach(function(t) {
    if (delete t.location, cw(t) || dw(t))
      for (var n in t.options)
        delete t.options[n].location, Wm(t.options[n].value);
    else aw(t) && hw(t.style) || (uw(t) || lw(t)) && jm(t.style) ? delete t.style.location : fw(t) && Wm(t.children);
  });
}
function OL(e, t) {
  t === void 0 && (t = {}), t = ye({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, t);
  var n = new FL(e, t).parse();
  if (n.err) {
    var r = SyntaxError(Ye[n.err.kind]);
    throw r.location = n.err.location, r.originalMessage = n.err.message, r;
  }
  return t != null && t.captureLocation || Wm(n.val), n.val;
}
function zr(e, t) {
  var n = t && t.cache ? t.cache : HL, r = t && t.serializer ? t.serializer : jL, i = t && t.strategy ? t.strategy : LL;
  return i(e, {
    cache: n,
    serializer: r
  });
}
function $L(e) {
  return e == null || typeof e == "number" || typeof e == "boolean";
}
function bw(e, t, n, r) {
  var i = $L(r) ? r : n(r), o = t.get(i);
  return typeof o > "u" && (o = e.call(this, r), t.set(i, o)), o;
}
function ww(e, t, n) {
  var r = Array.prototype.slice.call(arguments, 3), i = n(r), o = t.get(i);
  return typeof o > "u" && (o = e.apply(this, r), t.set(i, o)), o;
}
function _4(e, t, n, r, i) {
  return n.bind(t, e, r, i);
}
function LL(e, t) {
  var n = e.length === 1 ? bw : ww;
  return _4(e, this, n, t.cache.create(), t.serializer);
}
function NL(e, t) {
  return _4(e, this, ww, t.cache.create(), t.serializer);
}
function zL(e, t) {
  return _4(e, this, bw, t.cache.create(), t.serializer);
}
var jL = function() {
  return JSON.stringify(arguments);
};
function T4() {
  this.cache = /* @__PURE__ */ Object.create(null);
}
T4.prototype.get = function(e) {
  return this.cache[e];
};
T4.prototype.set = function(e, t) {
  this.cache[e] = t;
};
var HL = {
  create: function() {
    return new T4();
  }
}, jr = {
  variadic: NL,
  monadic: zL
}, qr;
(function(e) {
  e.MISSING_VALUE = "MISSING_VALUE", e.INVALID_VALUE = "INVALID_VALUE", e.MISSING_INTL_API = "MISSING_INTL_API";
})(qr || (qr = {}));
var Bo = (
  /** @class */
  function(e) {
    cr(t, e);
    function t(n, r, i) {
      var o = e.call(this, n) || this;
      return o.code = r, o.originalMessage = i, o;
    }
    return t.prototype.toString = function() {
      return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    }, t;
  }(Error)
), _C = (
  /** @class */
  function(e) {
    cr(t, e);
    function t(n, r, i, o) {
      return e.call(this, 'Invalid values for "'.concat(n, '": "').concat(r, '". Options are "').concat(Object.keys(i).join('", "'), '"'), qr.INVALID_VALUE, o) || this;
    }
    return t;
  }(Bo)
), UL = (
  /** @class */
  function(e) {
    cr(t, e);
    function t(n, r, i) {
      return e.call(this, 'Value for "'.concat(n, '" must be of type ').concat(r), qr.INVALID_VALUE, i) || this;
    }
    return t;
  }(Bo)
), VL = (
  /** @class */
  function(e) {
    cr(t, e);
    function t(n, r) {
      return e.call(this, 'The intl string context variable "'.concat(n, '" was not provided to the string "').concat(r, '"'), qr.MISSING_VALUE, r) || this;
    }
    return t;
  }(Bo)
), yn;
(function(e) {
  e[e.literal = 0] = "literal", e[e.object = 1] = "object";
})(yn || (yn = {}));
function GL(e) {
  return e.length < 2 ? e : e.reduce(function(t, n) {
    var r = t[t.length - 1];
    return !r || r.type !== yn.literal || n.type !== yn.literal ? t.push(n) : r.value += n.value, t;
  }, []);
}
function Sw(e) {
  return typeof e == "function";
}
function md(e, t, n, r, i, o, s) {
  if (e.length === 1 && SC(e[0]))
    return [
      {
        type: yn.literal,
        value: e[0].value
      }
    ];
  for (var u = [], l = 0, f = e; l < f.length; l++) {
    var h = f[l];
    if (SC(h)) {
      u.push({
        type: yn.literal,
        value: h.value
      });
      continue;
    }
    if (uL(h)) {
      typeof o == "number" && u.push({
        type: yn.literal,
        value: n.getNumberFormat(t).format(o)
      });
      continue;
    }
    var p = h.value;
    if (!(i && p in i))
      throw new VL(p, s);
    var g = i[p];
    if (aL(h)) {
      (!g || typeof g == "string" || typeof g == "number") && (g = typeof g == "string" || typeof g == "number" ? String(g) : ""), u.push({
        type: typeof g == "string" ? yn.literal : yn.object,
        value: g
      });
      continue;
    }
    if (uw(h)) {
      var v = typeof h.style == "string" ? r.date[h.style] : jm(h.style) ? h.style.parsedOptions : void 0;
      u.push({
        type: yn.literal,
        value: n.getDateTimeFormat(t, v).format(g)
      });
      continue;
    }
    if (lw(h)) {
      var v = typeof h.style == "string" ? r.time[h.style] : jm(h.style) ? h.style.parsedOptions : r.time.medium;
      u.push({
        type: yn.literal,
        value: n.getDateTimeFormat(t, v).format(g)
      });
      continue;
    }
    if (aw(h)) {
      var v = typeof h.style == "string" ? r.number[h.style] : hw(h.style) ? h.style.parsedOptions : void 0;
      v && v.scale && (g = g * (v.scale || 1)), u.push({
        type: yn.literal,
        value: n.getNumberFormat(t, v).format(g)
      });
      continue;
    }
    if (fw(h)) {
      var E = h.children, y = h.value, b = i[y];
      if (!Sw(b))
        throw new UL(y, "function", s);
      var w = md(E, t, n, r, i, o), k = b(w.map(function(_) {
        return _.value;
      }));
      Array.isArray(k) || (k = [k]), u.push.apply(u, k.map(function(_) {
        return {
          type: typeof _ == "string" ? yn.literal : yn.object,
          value: _
        };
      }));
    }
    if (cw(h)) {
      var A = h.options[g] || h.options.other;
      if (!A)
        throw new _C(h.value, g, Object.keys(h.options), s);
      u.push.apply(u, md(A.value, t, n, r, i));
      continue;
    }
    if (dw(h)) {
      var A = h.options["=".concat(g)];
      if (!A) {
        if (!Intl.PluralRules)
          throw new Bo(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, qr.MISSING_INTL_API, s);
        var T = n.getPluralRules(t, { type: h.pluralType }).select(g - (h.offset || 0));
        A = h.options[T] || h.options.other;
      }
      if (!A)
        throw new _C(h.value, g, Object.keys(h.options), s);
      u.push.apply(u, md(A.value, t, n, r, i, g - (h.offset || 0)));
      continue;
    }
  }
  return GL(u);
}
function WL(e, t) {
  return t ? ye(ye(ye({}, e || {}), t || {}), Object.keys(e).reduce(function(n, r) {
    return n[r] = ye(ye({}, e[r]), t[r] || {}), n;
  }, {})) : e;
}
function KL(e, t) {
  return t ? Object.keys(e).reduce(function(n, r) {
    return n[r] = WL(e[r], t[r]), n;
  }, ye({}, e)) : e;
}
function p1(e) {
  return {
    create: function() {
      return {
        get: function(t) {
          return e[t];
        },
        set: function(t, n) {
          e[t] = n;
        }
      };
    }
  };
}
function YL(e) {
  return e === void 0 && (e = {
    number: {},
    dateTime: {},
    pluralRules: {}
  }), {
    getNumberFormat: zr(function() {
      for (var t, n = [], r = 0; r < arguments.length; r++)
        n[r] = arguments[r];
      return new ((t = Intl.NumberFormat).bind.apply(t, ir([void 0], n, !1)))();
    }, {
      cache: p1(e.number),
      strategy: jr.variadic
    }),
    getDateTimeFormat: zr(function() {
      for (var t, n = [], r = 0; r < arguments.length; r++)
        n[r] = arguments[r];
      return new ((t = Intl.DateTimeFormat).bind.apply(t, ir([void 0], n, !1)))();
    }, {
      cache: p1(e.dateTime),
      strategy: jr.variadic
    }),
    getPluralRules: zr(function() {
      for (var t, n = [], r = 0; r < arguments.length; r++)
        n[r] = arguments[r];
      return new ((t = Intl.PluralRules).bind.apply(t, ir([void 0], n, !1)))();
    }, {
      cache: p1(e.pluralRules),
      strategy: jr.variadic
    })
  };
}
var xw = (
  /** @class */
  function() {
    function e(t, n, r, i) {
      var o = this;
      if (n === void 0 && (n = e.defaultLocale), this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      }, this.format = function(l) {
        var f = o.formatToParts(l);
        if (f.length === 1)
          return f[0].value;
        var h = f.reduce(function(p, g) {
          return !p.length || g.type !== yn.literal || typeof p[p.length - 1] != "string" ? p.push(g.value) : p[p.length - 1] += g.value, p;
        }, []);
        return h.length <= 1 ? h[0] || "" : h;
      }, this.formatToParts = function(l) {
        return md(o.ast, o.locales, o.formatters, o.formats, l, void 0, o.message);
      }, this.resolvedOptions = function() {
        var l;
        return {
          locale: ((l = o.resolvedLocale) === null || l === void 0 ? void 0 : l.toString()) || Intl.NumberFormat.supportedLocalesOf(o.locales)[0]
        };
      }, this.getAst = function() {
        return o.ast;
      }, this.locales = n, this.resolvedLocale = e.resolveLocale(n), typeof t == "string") {
        if (this.message = t, !e.__parse)
          throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
        var s = i || {};
        s.formatters;
        var u = Ai(s, ["formatters"]);
        this.ast = e.__parse(t, ye(ye({}, u), { locale: this.resolvedLocale }));
      } else
        this.ast = t;
      if (!Array.isArray(this.ast))
        throw new TypeError("A message must be provided as a String or AST.");
      this.formats = KL(e.formats, r), this.formatters = i && i.formatters || YL(this.formatterCache);
    }
    return Object.defineProperty(e, "defaultLocale", {
      get: function() {
        return e.memoizedDefaultLocale || (e.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), e.memoizedDefaultLocale;
      },
      enumerable: !1,
      configurable: !0
    }), e.memoizedDefaultLocale = null, e.resolveLocale = function(t) {
      if (!(typeof Intl.Locale > "u")) {
        var n = Intl.NumberFormat.supportedLocalesOf(t);
        return n.length > 0 ? new Intl.Locale(n[0]) : new Intl.Locale(typeof t == "string" ? t : t[0]);
      }
    }, e.__parse = OL, e.formats = {
      number: {
        integer: {
          maximumFractionDigits: 0
        },
        currency: {
          style: "currency"
        },
        percent: {
          style: "percent"
        }
      },
      date: {
        short: {
          month: "numeric",
          day: "numeric",
          year: "2-digit"
        },
        medium: {
          month: "short",
          day: "numeric",
          year: "numeric"
        },
        long: {
          month: "long",
          day: "numeric",
          year: "numeric"
        },
        full: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      },
      time: {
        short: {
          hour: "numeric",
          minute: "numeric"
        },
        medium: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        },
        long: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        },
        full: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        }
      }
    }, e;
  }()
), vs;
(function(e) {
  e.FORMAT_ERROR = "FORMAT_ERROR", e.UNSUPPORTED_FORMATTER = "UNSUPPORTED_FORMATTER", e.INVALID_CONFIG = "INVALID_CONFIG", e.MISSING_DATA = "MISSING_DATA", e.MISSING_TRANSLATION = "MISSING_TRANSLATION";
})(vs || (vs = {}));
var tc = (
  /** @class */
  function(e) {
    cr(t, e);
    function t(n, r, i) {
      var o = this, s = i ? i instanceof Error ? i : new Error(String(i)) : void 0;
      return o = e.call(this, "[@formatjs/intl Error ".concat(n, "] ").concat(r, `
`).concat(s ? `
`.concat(s.message, `
`).concat(s.stack) : "")) || this, o.code = n, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(o, t), o;
    }
    return t;
  }(Error)
), XL = (
  /** @class */
  function(e) {
    cr(t, e);
    function t(n, r) {
      return e.call(this, vs.UNSUPPORTED_FORMATTER, n, r) || this;
    }
    return t;
  }(tc)
), ZL = (
  /** @class */
  function(e) {
    cr(t, e);
    function t(n, r) {
      return e.call(this, vs.INVALID_CONFIG, n, r) || this;
    }
    return t;
  }(tc)
), TC = (
  /** @class */
  function(e) {
    cr(t, e);
    function t(n, r) {
      return e.call(this, vs.MISSING_DATA, n, r) || this;
    }
    return t;
  }(tc)
), dr = (
  /** @class */
  function(e) {
    cr(t, e);
    function t(n, r, i) {
      var o = e.call(this, vs.FORMAT_ERROR, "".concat(n, `
Locale: `).concat(r, `
`), i) || this;
      return o.locale = r, o;
    }
    return t;
  }(tc)
), m1 = (
  /** @class */
  function(e) {
    cr(t, e);
    function t(n, r, i, o) {
      var s = e.call(this, "".concat(n, `
MessageID: `).concat(i == null ? void 0 : i.id, `
Default Message: `).concat(i == null ? void 0 : i.defaultMessage, `
Description: `).concat(i == null ? void 0 : i.description, `
`), r, o) || this;
      return s.descriptor = i, s.locale = r, s;
    }
    return t;
  }(dr)
), qL = (
  /** @class */
  function(e) {
    cr(t, e);
    function t(n, r) {
      var i = e.call(this, vs.MISSING_TRANSLATION, 'Missing message: "'.concat(n.id, '" for locale "').concat(r, '", using ').concat(n.defaultMessage ? "default message (".concat(typeof n.defaultMessage == "string" ? n.defaultMessage : n.defaultMessage.map(function(o) {
        var s;
        return (s = o.value) !== null && s !== void 0 ? s : JSON.stringify(o);
      }).join(), ")") : "id", " as fallback.")) || this;
      return i.descriptor = n, i;
    }
    return t;
  }(tc)
);
function ks(e, t, n) {
  return n === void 0 && (n = {}), t.reduce(function(r, i) {
    return i in e ? r[i] = e[i] : i in n && (r[i] = n[i]), r;
  }, {});
}
var JL = function(e) {
}, QL = function(e) {
}, kw = {
  formats: {},
  messages: {},
  timeZone: void 0,
  defaultLocale: "en",
  defaultFormats: {},
  fallbackOnEmptyString: !0,
  onError: JL,
  onWarn: QL
};
function Dw() {
  return {
    dateTime: {},
    number: {},
    message: {},
    relativeTime: {},
    pluralRules: {},
    list: {},
    displayNames: {}
  };
}
function Jo(e) {
  return {
    create: function() {
      return {
        get: function(t) {
          return e[t];
        },
        set: function(t, n) {
          e[t] = n;
        }
      };
    }
  };
}
function eN(e) {
  e === void 0 && (e = Dw());
  var t = Intl.RelativeTimeFormat, n = Intl.ListFormat, r = Intl.DisplayNames, i = zr(function() {
    for (var u, l = [], f = 0; f < arguments.length; f++)
      l[f] = arguments[f];
    return new ((u = Intl.DateTimeFormat).bind.apply(u, ir([void 0], l, !1)))();
  }, {
    cache: Jo(e.dateTime),
    strategy: jr.variadic
  }), o = zr(function() {
    for (var u, l = [], f = 0; f < arguments.length; f++)
      l[f] = arguments[f];
    return new ((u = Intl.NumberFormat).bind.apply(u, ir([void 0], l, !1)))();
  }, {
    cache: Jo(e.number),
    strategy: jr.variadic
  }), s = zr(function() {
    for (var u, l = [], f = 0; f < arguments.length; f++)
      l[f] = arguments[f];
    return new ((u = Intl.PluralRules).bind.apply(u, ir([void 0], l, !1)))();
  }, {
    cache: Jo(e.pluralRules),
    strategy: jr.variadic
  });
  return {
    getDateTimeFormat: i,
    getNumberFormat: o,
    getMessageFormat: zr(function(u, l, f, h) {
      return new xw(u, l, f, ye({ formatters: {
        getNumberFormat: o,
        getDateTimeFormat: i,
        getPluralRules: s
      } }, h || {}));
    }, {
      cache: Jo(e.message),
      strategy: jr.variadic
    }),
    getRelativeTimeFormat: zr(function() {
      for (var u = [], l = 0; l < arguments.length; l++)
        u[l] = arguments[l];
      return new (t.bind.apply(t, ir([void 0], u, !1)))();
    }, {
      cache: Jo(e.relativeTime),
      strategy: jr.variadic
    }),
    getPluralRules: s,
    getListFormat: zr(function() {
      for (var u = [], l = 0; l < arguments.length; l++)
        u[l] = arguments[l];
      return new (n.bind.apply(n, ir([void 0], u, !1)))();
    }, {
      cache: Jo(e.list),
      strategy: jr.variadic
    }),
    getDisplayNames: zr(function() {
      for (var u = [], l = 0; l < arguments.length; l++)
        u[l] = arguments[l];
      return new (r.bind.apply(r, ir([void 0], u, !1)))();
    }, {
      cache: Jo(e.displayNames),
      strategy: jr.variadic
    })
  };
}
function F4(e, t, n, r) {
  var i = e && e[t], o;
  if (i && (o = i[n]), o)
    return o;
  r(new XL("No ".concat(t, " format named: ").concat(n)));
}
function M0(e, t) {
  return Object.keys(e).reduce(function(n, r) {
    return n[r] = ye({ timeZone: t }, e[r]), n;
  }, {});
}
function FC(e, t) {
  var n = Object.keys(ye(ye({}, e), t));
  return n.reduce(function(r, i) {
    return r[i] = ye(ye({}, e[i] || {}), t[i] || {}), r;
  }, {});
}
function BC(e, t) {
  if (!t)
    return e;
  var n = xw.formats;
  return ye(ye(ye({}, n), e), { date: FC(M0(n.date, t), M0(e.date || {}, t)), time: FC(M0(n.time, t), M0(e.time || {}, t)) });
}
var Km = function(e, t, n, r, i) {
  var o = e.locale, s = e.formats, u = e.messages, l = e.defaultLocale, f = e.defaultFormats, h = e.fallbackOnEmptyString, p = e.onError, g = e.timeZone, v = e.defaultRichTextElements;
  n === void 0 && (n = { id: "" });
  var E = n.id, y = n.defaultMessage;
  sw(!!E, "[@formatjs/intl] An `id` must be provided to format a message. You can either:\n1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.io/docs/tooling/babel-plugin)\nor [@formatjs/ts-transformer](https://formatjs.io/docs/tooling/ts-transformer) OR\n2. Configure your `eslint` config to include [eslint-plugin-formatjs](https://formatjs.io/docs/tooling/linter#enforce-id)\nto autofix this issue");
  var b = String(E), w = (
    // In case messages is Object.create(null)
    // e.g import('foo.json') from webpack)
    // See https://github.com/formatjs/formatjs/issues/1914
    u && Object.prototype.hasOwnProperty.call(u, b) && u[b]
  );
  if (Array.isArray(w) && w.length === 1 && w[0].type === gt.literal)
    return w[0].value;
  if (!r && w && typeof w == "string" && !v)
    return w.replace(/'\{(.*?)\}'/gi, "{$1}");
  if (r = ye(ye({}, v), r || {}), s = BC(s, g), f = BC(f, g), !w) {
    if (h === !1 && w === "")
      return w;
    if ((!y || o && o.toLowerCase() !== l.toLowerCase()) && p(new qL(n, o)), y)
      try {
        var k = t.getMessageFormat(y, l, f, i);
        return k.format(r);
      } catch (A) {
        return p(new m1('Error formatting default message for: "'.concat(b, '", rendering default message verbatim'), o, n, A)), typeof y == "string" ? y : b;
      }
    return b;
  }
  try {
    var k = t.getMessageFormat(w, o, s, ye({ formatters: t }, i || {}));
    return k.format(r);
  } catch (A) {
    p(new m1('Error formatting message: "'.concat(b, '", using ').concat(y ? "default message" : "id", " as fallback."), o, n, A));
  }
  if (y)
    try {
      var k = t.getMessageFormat(y, l, f, i);
      return k.format(r);
    } catch (A) {
      p(new m1('Error formatting the default message for: "'.concat(b, '", rendering message verbatim'), o, n, A));
    }
  return typeof w == "string" ? w : typeof y == "string" ? y : b;
}, Aw = [
  "formatMatcher",
  "timeZone",
  "hour12",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "hourCycle",
  "dateStyle",
  "timeStyle",
  "calendar",
  // 'dayPeriod',
  "numberingSystem",
  "fractionalSecondDigits"
];
function bf(e, t, n, r) {
  var i = e.locale, o = e.formats, s = e.onError, u = e.timeZone;
  r === void 0 && (r = {});
  var l = r.format, f = ye(ye({}, u && { timeZone: u }), l && F4(o, t, l, s)), h = ks(r, Aw, f);
  return t === "time" && !h.hour && !h.minute && !h.second && !h.timeStyle && !h.dateStyle && (h = ye(ye({}, h), { hour: "numeric", minute: "numeric" })), n(i, h);
}
function tN(e, t) {
  for (var n = [], r = 2; r < arguments.length; r++)
    n[r - 2] = arguments[r];
  var i = n[0], o = n[1], s = o === void 0 ? {} : o, u = typeof i == "string" ? new Date(i || 0) : i;
  try {
    return bf(e, "date", t, s).format(u);
  } catch (l) {
    e.onError(new dr("Error formatting date.", e.locale, l));
  }
  return String(u);
}
function nN(e, t) {
  for (var n = [], r = 2; r < arguments.length; r++)
    n[r - 2] = arguments[r];
  var i = n[0], o = n[1], s = o === void 0 ? {} : o, u = typeof i == "string" ? new Date(i || 0) : i;
  try {
    return bf(e, "time", t, s).format(u);
  } catch (l) {
    e.onError(new dr("Error formatting time.", e.locale, l));
  }
  return String(u);
}
function rN(e, t) {
  for (var n = [], r = 2; r < arguments.length; r++)
    n[r - 2] = arguments[r];
  var i = n[0], o = n[1], s = n[2], u = s === void 0 ? {} : s, l = e.timeZone, f = e.locale, h = e.onError, p = ks(u, Aw, l ? { timeZone: l } : {});
  try {
    return t(f, p).formatRange(i, o);
  } catch (g) {
    h(new dr("Error formatting date time range.", e.locale, g));
  }
  return String(i);
}
function iN(e, t) {
  for (var n = [], r = 2; r < arguments.length; r++)
    n[r - 2] = arguments[r];
  var i = n[0], o = n[1], s = o === void 0 ? {} : o, u = typeof i == "string" ? new Date(i || 0) : i;
  try {
    return bf(e, "date", t, s).formatToParts(u);
  } catch (l) {
    e.onError(new dr("Error formatting date.", e.locale, l));
  }
  return [];
}
function oN(e, t) {
  for (var n = [], r = 2; r < arguments.length; r++)
    n[r - 2] = arguments[r];
  var i = n[0], o = n[1], s = o === void 0 ? {} : o, u = typeof i == "string" ? new Date(i || 0) : i;
  try {
    return bf(e, "time", t, s).formatToParts(u);
  } catch (l) {
    e.onError(new dr("Error formatting time.", e.locale, l));
  }
  return [];
}
var sN = [
  "style",
  "type",
  "fallback",
  "languageDisplay"
];
function aN(e, t, n, r) {
  var i = e.locale, o = e.onError, s = Intl.DisplayNames;
  s || o(new Bo(`Intl.DisplayNames is not available in this environment.
Try polyfilling it using "@formatjs/intl-displaynames"
`, qr.MISSING_INTL_API));
  var u = ks(r, sN);
  try {
    return t(i, u).of(n);
  } catch (l) {
    o(new dr("Error formatting display name.", i, l));
  }
}
var uN = [
  "type",
  "style"
], MC = Date.now();
function lN(e) {
  return "".concat(MC, "_").concat(e, "_").concat(MC);
}
function cN(e, t, n, r) {
  r === void 0 && (r = {});
  var i = Iw(e, t, n, r).reduce(function(o, s) {
    var u = s.value;
    return typeof u != "string" ? o.push(u) : typeof o[o.length - 1] == "string" ? o[o.length - 1] += u : o.push(u), o;
  }, []);
  return i.length === 1 ? i[0] : i.length === 0 ? "" : i;
}
function Iw(e, t, n, r) {
  var i = e.locale, o = e.onError;
  r === void 0 && (r = {});
  var s = Intl.ListFormat;
  s || o(new Bo(`Intl.ListFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-listformat"
`, qr.MISSING_INTL_API));
  var u = ks(r, uN);
  try {
    var l = {}, f = n.map(function(h, p) {
      if (typeof h == "object") {
        var g = lN(p);
        return l[g] = h, g;
      }
      return String(h);
    });
    return t(i, u).formatToParts(f).map(function(h) {
      return h.type === "literal" ? h : ye(ye({}, h), { value: l[h.value] || h.value });
    });
  } catch (h) {
    o(new dr("Error formatting list.", i, h));
  }
  return n;
}
var dN = ["type"];
function fN(e, t, n, r) {
  var i = e.locale, o = e.onError;
  r === void 0 && (r = {}), Intl.PluralRules || o(new Bo(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, qr.MISSING_INTL_API));
  var s = ks(r, dN);
  try {
    return t(i, s).select(n);
  } catch (u) {
    o(new dr("Error formatting plural.", i, u));
  }
  return "other";
}
var hN = ["numeric", "style"];
function pN(e, t, n) {
  var r = e.locale, i = e.formats, o = e.onError;
  n === void 0 && (n = {});
  var s = n.format, u = !!s && F4(i, "relative", s, o) || {}, l = ks(n, hN, u);
  return t(r, l);
}
function mN(e, t, n, r, i) {
  i === void 0 && (i = {}), r || (r = "second");
  var o = Intl.RelativeTimeFormat;
  o || e.onError(new Bo(`Intl.RelativeTimeFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-relativetimeformat"
`, qr.MISSING_INTL_API));
  try {
    return pN(e, t, i).format(n, r);
  } catch (s) {
    e.onError(new dr("Error formatting relative time.", e.locale, s));
  }
  return String(n);
}
var gN = [
  "style",
  "currency",
  "unit",
  "unitDisplay",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  // ES2020 NumberFormat
  "compactDisplay",
  "currencyDisplay",
  "currencySign",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "numberingSystem",
  // ES2023 NumberFormat
  "trailingZeroDisplay",
  "roundingPriority",
  "roundingIncrement",
  "roundingMode"
];
function Pw(e, t, n) {
  var r = e.locale, i = e.formats, o = e.onError;
  n === void 0 && (n = {});
  var s = n.format, u = s && F4(i, "number", s, o) || {}, l = ks(n, gN, u);
  return t(r, l);
}
function vN(e, t, n, r) {
  r === void 0 && (r = {});
  try {
    return Pw(e, t, r).format(n);
  } catch (i) {
    e.onError(new dr("Error formatting number.", e.locale, i));
  }
  return String(n);
}
function EN(e, t, n, r) {
  r === void 0 && (r = {});
  try {
    return Pw(e, t, r).formatToParts(n);
  } catch (i) {
    e.onError(new dr("Error formatting number.", e.locale, i));
  }
  return [];
}
function CN(e) {
  var t = e ? e[Object.keys(e)[0]] : void 0;
  return typeof t == "string";
}
function yN(e) {
  e.onWarn && e.defaultRichTextElements && CN(e.messages || {}) && e.onWarn(`[@formatjs/intl] "defaultRichTextElements" was specified but "message" was not pre-compiled. 
Please consider using "@formatjs/cli" to pre-compile your messages for performance.
For more details see https://formatjs.io/docs/getting-started/message-distribution`);
}
function bN(e, t) {
  var n = eN(t), r = ye(ye({}, kw), e), i = r.locale, o = r.defaultLocale, s = r.onError;
  return i ? !Intl.NumberFormat.supportedLocalesOf(i).length && s ? s(new TC('Missing locale data for locale: "'.concat(i, '" in Intl.NumberFormat. Using default locale: "').concat(o, '" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))) : !Intl.DateTimeFormat.supportedLocalesOf(i).length && s && s(new TC('Missing locale data for locale: "'.concat(i, '" in Intl.DateTimeFormat. Using default locale: "').concat(o, '" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))) : (s && s(new ZL('"locale" was not configured, using "'.concat(o, '" as fallback. See https://formatjs.io/docs/react-intl/api#intlshape for more details'))), r.locale = r.defaultLocale || "en"), yN(r), ye(ye({}, r), {
    formatters: n,
    formatNumber: vN.bind(null, r, n.getNumberFormat),
    formatNumberToParts: EN.bind(null, r, n.getNumberFormat),
    formatRelativeTime: mN.bind(null, r, n.getRelativeTimeFormat),
    formatDate: tN.bind(null, r, n.getDateTimeFormat),
    formatDateToParts: iN.bind(null, r, n.getDateTimeFormat),
    formatTime: nN.bind(null, r, n.getDateTimeFormat),
    formatDateTimeRange: rN.bind(null, r, n.getDateTimeFormat),
    formatTimeToParts: oN.bind(null, r, n.getDateTimeFormat),
    formatPlural: fN.bind(null, r, n.getPluralRules),
    // @ts-expect-error TODO: will get to this later
    formatMessage: Km.bind(null, r, n),
    // @ts-expect-error TODO: will get to this later
    $t: Km.bind(null, r, n),
    formatList: cN.bind(null, r, n.getListFormat),
    formatListToParts: Iw.bind(null, r, n.getListFormat),
    formatDisplayName: aN.bind(null, r, n.getDisplayNames)
  });
}
function _w(e) {
  sw(e, "[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.");
}
var Tw = ye(ye({}, kw), { textComponent: c.Fragment });
function wN(e) {
  return function(t) {
    return e(c.Children.toArray(t));
  };
}
function Ym(e, t) {
  if (e === t)
    return !0;
  if (!e || !t)
    return !1;
  var n = Object.keys(e), r = Object.keys(t), i = n.length;
  if (r.length !== i)
    return !1;
  for (var o = 0; o < i; o++) {
    var s = n[o];
    if (e[s] !== t[s] || !Object.prototype.hasOwnProperty.call(t, s))
      return !1;
  }
  return !0;
}
var B4 = typeof window < "u" && !window.__REACT_INTL_BYPASS_GLOBAL_CONTEXT__ ? window.__REACT_INTL_CONTEXT__ || (window.__REACT_INTL_CONTEXT__ = c.createContext(null)) : c.createContext(null);
B4.Consumer;
var SN = B4.Provider, xN = SN, kN = B4;
function tn() {
  var e = c.useContext(kN);
  return _w(e), e;
}
var Xm;
(function(e) {
  e.formatDate = "FormattedDate", e.formatTime = "FormattedTime", e.formatNumber = "FormattedNumber", e.formatList = "FormattedList", e.formatDisplayName = "FormattedDisplayName";
})(Xm || (Xm = {}));
var Zm;
(function(e) {
  e.formatDate = "FormattedDateParts", e.formatTime = "FormattedTimeParts", e.formatNumber = "FormattedNumberParts", e.formatList = "FormattedListParts";
})(Zm || (Zm = {}));
function Fw(e) {
  var t = function(n) {
    var r = tn(), i = n.value, o = n.children, s = Ai(n, ["value", "children"]), u = typeof i == "string" ? new Date(i || 0) : i, l = e === "formatDate" ? r.formatDateToParts(u, s) : r.formatTimeToParts(u, s);
    return o(l);
  };
  return t.displayName = Zm[e], t;
}
function nc(e) {
  var t = function(n) {
    var r = tn(), i = n.value, o = n.children, s = Ai(
      n,
      ["value", "children"]
    ), u = r[e](i, s);
    if (typeof o == "function")
      return o(u);
    var l = r.textComponent || c.Fragment;
    return c.createElement(l, null, u);
  };
  return t.displayName = Xm[e], t;
}
function Bw(e) {
  return e && Object.keys(e).reduce(function(t, n) {
    var r = e[n];
    return t[n] = Sw(r) ? wN(r) : r, t;
  }, {});
}
var RC = function(e, t, n, r) {
  for (var i = [], o = 4; o < arguments.length; o++)
    i[o - 4] = arguments[o];
  var s = Bw(r), u = Km.apply(void 0, ir([
    e,
    t,
    n,
    s
  ], i, !1));
  return Array.isArray(u) ? c.Children.toArray(u) : u;
}, OC = function(e, t) {
  var n = e.defaultRichTextElements, r = Ai(e, ["defaultRichTextElements"]), i = Bw(n), o = bN(ye(ye(ye({}, Tw), r), { defaultRichTextElements: i }), t), s = {
    locale: o.locale,
    timeZone: o.timeZone,
    fallbackOnEmptyString: o.fallbackOnEmptyString,
    formats: o.formats,
    defaultLocale: o.defaultLocale,
    defaultFormats: o.defaultFormats,
    messages: o.messages,
    onError: o.onError,
    defaultRichTextElements: i
  };
  return ye(ye({}, o), {
    formatMessage: RC.bind(
      null,
      s,
      // @ts-expect-error fix this
      o.formatters
    ),
    // @ts-expect-error fix this
    $t: RC.bind(null, s, o.formatters)
  });
};
function g1(e) {
  return {
    locale: e.locale,
    timeZone: e.timeZone,
    fallbackOnEmptyString: e.fallbackOnEmptyString,
    formats: e.formats,
    textComponent: e.textComponent,
    messages: e.messages,
    defaultLocale: e.defaultLocale,
    defaultFormats: e.defaultFormats,
    onError: e.onError,
    onWarn: e.onWarn,
    wrapRichTextChunksInFragment: e.wrapRichTextChunksInFragment,
    defaultRichTextElements: e.defaultRichTextElements
  };
}
var DN = (
  /** @class */
  function(e) {
    cr(t, e);
    function t() {
      var n = e !== null && e.apply(this, arguments) || this;
      return n.cache = Dw(), n.state = {
        cache: n.cache,
        intl: OC(g1(n.props), n.cache),
        prevConfig: g1(n.props)
      }, n;
    }
    return t.getDerivedStateFromProps = function(n, r) {
      var i = r.prevConfig, o = r.cache, s = g1(n);
      return Ym(i, s) ? null : {
        intl: OC(s, o),
        prevConfig: s
      };
    }, t.prototype.render = function() {
      return _w(this.state.intl), c.createElement(xN, { value: this.state.intl }, this.props.children);
    }, t.displayName = "IntlProvider", t.defaultProps = Tw, t;
  }(c.PureComponent)
);
function AN(e, t) {
  var n = e.values, r = Ai(e, ["values"]), i = t.values, o = Ai(t, ["values"]);
  return Ym(i, n) && Ym(r, o);
}
function Mw(e) {
  var t = tn(), n = t.formatMessage, r = t.textComponent, i = r === void 0 ? c.Fragment : r, o = e.id, s = e.description, u = e.defaultMessage, l = e.values, f = e.children, h = e.tagName, p = h === void 0 ? i : h, g = e.ignoreTag, v = { id: o, description: s, defaultMessage: u }, E = n(v, l, {
    ignoreTag: g
  });
  return typeof f == "function" ? f(Array.isArray(E) ? E : [E]) : p ? c.createElement(p, null, c.Children.toArray(E)) : c.createElement(c.Fragment, null, E);
}
Mw.displayName = "FormattedMessage";
var ge = c.memo(Mw, AN);
ge.displayName = "MemoizedFormattedMessage";
nc("formatDate");
nc("formatTime");
nc("formatNumber");
nc("formatList");
nc("formatDisplayName");
Fw("formatDate");
Fw("formatTime");
function be() {
  return be = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, be.apply(null, arguments);
}
function qu(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(i) {
    if (e == null || e(i), n === !1 || !i.defaultPrevented) return t == null ? void 0 : t(i);
  };
}
function Ja(e, t = []) {
  let n = [];
  function r(o, s) {
    const u = /* @__PURE__ */ c.createContext(s), l = n.length;
    n = [
      ...n,
      s
    ];
    function f(p) {
      const { scope: g, children: v, ...E } = p, y = (g == null ? void 0 : g[e][l]) || u, b = c.useMemo(
        () => E,
        Object.values(E)
      );
      return /* @__PURE__ */ c.createElement(y.Provider, {
        value: b
      }, v);
    }
    function h(p, g) {
      const v = (g == null ? void 0 : g[e][l]) || u, E = c.useContext(v);
      if (E) return E;
      if (s !== void 0) return s;
      throw new Error(`\`${p}\` must be used within \`${o}\``);
    }
    return f.displayName = o + "Provider", [
      f,
      h
    ];
  }
  const i = () => {
    const o = n.map((s) => /* @__PURE__ */ c.createContext(s));
    return function(u) {
      const l = (u == null ? void 0 : u[e]) || o;
      return c.useMemo(
        () => ({
          [`__scope${e}`]: {
            ...u,
            [e]: l
          }
        }),
        [
          u,
          l
        ]
      );
    };
  };
  return i.scopeName = e, [
    r,
    IN(i, ...t)
  ];
}
function IN(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map(
      (i) => ({
        useScope: i(),
        scopeName: i.scopeName
      })
    );
    return function(o) {
      const s = r.reduce((u, { useScope: l, scopeName: f }) => {
        const p = l(o)[`__scope${f}`];
        return {
          ...u,
          ...p
        };
      }, {});
      return c.useMemo(
        () => ({
          [`__scope${t.scopeName}`]: s
        }),
        [
          s
        ]
      );
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Rw = { exports: {} }, Pn = {}, v1 = { exports: {} }, E1 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $C;
function PN() {
  return $C || ($C = 1, function(e) {
    function t(U, N) {
      var z = U.length;
      U.push(N);
      e: for (; 0 < z; ) {
        var R = z - 1 >>> 1, W = U[R];
        if (0 < i(W, N)) U[R] = N, U[z] = W, z = R;
        else break e;
      }
    }
    function n(U) {
      return U.length === 0 ? null : U[0];
    }
    function r(U) {
      if (U.length === 0) return null;
      var N = U[0], z = U.pop();
      if (z !== N) {
        U[0] = z;
        e: for (var R = 0, W = U.length, ie = W >>> 1; R < ie; ) {
          var le = 2 * (R + 1) - 1, se = U[le], ve = le + 1, Pe = U[ve];
          if (0 > i(se, z)) ve < W && 0 > i(Pe, se) ? (U[R] = Pe, U[ve] = z, R = ve) : (U[R] = se, U[le] = z, R = le);
          else if (ve < W && 0 > i(Pe, z)) U[R] = Pe, U[ve] = z, R = ve;
          else break e;
        }
      }
      return N;
    }
    function i(U, N) {
      var z = U.sortIndex - N.sortIndex;
      return z !== 0 ? z : U.id - N.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var o = performance;
      e.unstable_now = function() {
        return o.now();
      };
    } else {
      var s = Date, u = s.now();
      e.unstable_now = function() {
        return s.now() - u;
      };
    }
    var l = [], f = [], h = 1, p = null, g = 3, v = !1, E = !1, y = !1, b = typeof setTimeout == "function" ? setTimeout : null, w = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function A(U) {
      for (var N = n(f); N !== null; ) {
        if (N.callback === null) r(f);
        else if (N.startTime <= U) r(f), N.sortIndex = N.expirationTime, t(l, N);
        else break;
        N = n(f);
      }
    }
    function T(U) {
      if (y = !1, A(U), !E) if (n(l) !== null) E = !0, Ce(_);
      else {
        var N = n(f);
        N !== null && G(T, N.startTime - U);
      }
    }
    function _(U, N) {
      E = !1, y && (y = !1, w(M), M = -1), v = !0;
      var z = g;
      try {
        for (A(N), p = n(l); p !== null && (!(p.expirationTime > N) || U && !J()); ) {
          var R = p.callback;
          if (typeof R == "function") {
            p.callback = null, g = p.priorityLevel;
            var W = R(p.expirationTime <= N);
            N = e.unstable_now(), typeof W == "function" ? p.callback = W : p === n(l) && r(l), A(N);
          } else r(l);
          p = n(l);
        }
        if (p !== null) var ie = !0;
        else {
          var le = n(f);
          le !== null && G(T, le.startTime - N), ie = !1;
        }
        return ie;
      } finally {
        p = null, g = z, v = !1;
      }
    }
    var I = !1, B = null, M = -1, H = 5, Y = -1;
    function J() {
      return !(e.unstable_now() - Y < H);
    }
    function te() {
      if (B !== null) {
        var U = e.unstable_now();
        Y = U;
        var N = !0;
        try {
          N = B(!0, U);
        } finally {
          N ? ee() : (I = !1, B = null);
        }
      } else I = !1;
    }
    var ee;
    if (typeof k == "function") ee = function() {
      k(te);
    };
    else if (typeof MessageChannel < "u") {
      var de = new MessageChannel(), he = de.port2;
      de.port1.onmessage = te, ee = function() {
        he.postMessage(null);
      };
    } else ee = function() {
      b(te, 0);
    };
    function Ce(U) {
      B = U, I || (I = !0, ee());
    }
    function G(U, N) {
      M = b(function() {
        U(e.unstable_now());
      }, N);
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, e.unstable_continueExecution = function() {
      E || v || (E = !0, Ce(_));
    }, e.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : H = 0 < U ? Math.floor(1e3 / U) : 5;
    }, e.unstable_getCurrentPriorityLevel = function() {
      return g;
    }, e.unstable_getFirstCallbackNode = function() {
      return n(l);
    }, e.unstable_next = function(U) {
      switch (g) {
        case 1:
        case 2:
        case 3:
          var N = 3;
          break;
        default:
          N = g;
      }
      var z = g;
      g = N;
      try {
        return U();
      } finally {
        g = z;
      }
    }, e.unstable_pauseExecution = function() {
    }, e.unstable_requestPaint = function() {
    }, e.unstable_runWithPriority = function(U, N) {
      switch (U) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          U = 3;
      }
      var z = g;
      g = U;
      try {
        return N();
      } finally {
        g = z;
      }
    }, e.unstable_scheduleCallback = function(U, N, z) {
      var R = e.unstable_now();
      switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? R + z : R) : z = R, U) {
        case 1:
          var W = -1;
          break;
        case 2:
          W = 250;
          break;
        case 5:
          W = 1073741823;
          break;
        case 4:
          W = 1e4;
          break;
        default:
          W = 5e3;
      }
      return W = z + W, U = { id: h++, callback: N, priorityLevel: U, startTime: z, expirationTime: W, sortIndex: -1 }, z > R ? (U.sortIndex = z, t(f, U), n(l) === null && U === n(f) && (y ? (w(M), M = -1) : y = !0, G(T, z - R))) : (U.sortIndex = W, t(l, U), E || v || (E = !0, Ce(_))), U;
    }, e.unstable_shouldYield = J, e.unstable_wrapCallback = function(U) {
      var N = g;
      return function() {
        var z = g;
        g = N;
        try {
          return U.apply(this, arguments);
        } finally {
          g = z;
        }
      };
    };
  }(E1)), E1;
}
var LC;
function _N() {
  return LC || (LC = 1, v1.exports = PN()), v1.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var NC;
function TN() {
  if (NC) return Pn;
  NC = 1;
  var e = c, t = _N();
  function n(a) {
    for (var d = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, m = 1; m < arguments.length; m++) d += "&args[]=" + encodeURIComponent(arguments[m]);
    return "Minified React error #" + a + "; visit " + d + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var r = /* @__PURE__ */ new Set(), i = {};
  function o(a, d) {
    s(a, d), s(a + "Capture", d);
  }
  function s(a, d) {
    for (i[a] = d, a = 0; a < d.length; a++) r.add(d[a]);
  }
  var u = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), l = Object.prototype.hasOwnProperty, f = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, h = {}, p = {};
  function g(a) {
    return l.call(p, a) ? !0 : l.call(h, a) ? !1 : f.test(a) ? p[a] = !0 : (h[a] = !0, !1);
  }
  function v(a, d, m, C) {
    if (m !== null && m.type === 0) return !1;
    switch (typeof d) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return C ? !1 : m !== null ? !m.acceptsBooleans : (a = a.toLowerCase().slice(0, 5), a !== "data-" && a !== "aria-");
      default:
        return !1;
    }
  }
  function E(a, d, m, C) {
    if (d === null || typeof d > "u" || v(a, d, m, C)) return !0;
    if (C) return !1;
    if (m !== null) switch (m.type) {
      case 3:
        return !d;
      case 4:
        return d === !1;
      case 5:
        return isNaN(d);
      case 6:
        return isNaN(d) || 1 > d;
    }
    return !1;
  }
  function y(a, d, m, C, S, D, F) {
    this.acceptsBooleans = d === 2 || d === 3 || d === 4, this.attributeName = C, this.attributeNamespace = S, this.mustUseProperty = m, this.propertyName = a, this.type = d, this.sanitizeURL = D, this.removeEmptyString = F;
  }
  var b = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
    b[a] = new y(a, 0, !1, a, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
    var d = a[0];
    b[d] = new y(d, 1, !1, a[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
    b[a] = new y(a, 2, !1, a.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
    b[a] = new y(a, 2, !1, a, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    b[a] = new y(a, 3, !1, a.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(a) {
    b[a] = new y(a, 3, !0, a, null, !1, !1);
  }), ["capture", "download"].forEach(function(a) {
    b[a] = new y(a, 4, !1, a, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(a) {
    b[a] = new y(a, 6, !1, a, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(a) {
    b[a] = new y(a, 5, !1, a.toLowerCase(), null, !1, !1);
  });
  var w = /[\-:]([a-z])/g;
  function k(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    var d = a.replace(
      w,
      k
    );
    b[d] = new y(d, 1, !1, a, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    var d = a.replace(w, k);
    b[d] = new y(d, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
    var d = a.replace(w, k);
    b[d] = new y(d, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(a) {
    b[a] = new y(a, 1, !1, a.toLowerCase(), null, !1, !1);
  }), b.xlinkHref = new y("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(a) {
    b[a] = new y(a, 1, !1, a.toLowerCase(), null, !0, !0);
  });
  function A(a, d, m, C) {
    var S = b.hasOwnProperty(d) ? b[d] : null;
    (S !== null ? S.type !== 0 : C || !(2 < d.length) || d[0] !== "o" && d[0] !== "O" || d[1] !== "n" && d[1] !== "N") && (E(d, m, S, C) && (m = null), C || S === null ? g(d) && (m === null ? a.removeAttribute(d) : a.setAttribute(d, "" + m)) : S.mustUseProperty ? a[S.propertyName] = m === null ? S.type === 3 ? !1 : "" : m : (d = S.attributeName, C = S.attributeNamespace, m === null ? a.removeAttribute(d) : (S = S.type, m = S === 3 || S === 4 && m === !0 ? "" : "" + m, C ? a.setAttributeNS(C, d, m) : a.setAttribute(d, m))));
  }
  var T = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, _ = Symbol.for("react.element"), I = Symbol.for("react.portal"), B = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), H = Symbol.for("react.profiler"), Y = Symbol.for("react.provider"), J = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), de = Symbol.for("react.suspense_list"), he = Symbol.for("react.memo"), Ce = Symbol.for("react.lazy"), G = Symbol.for("react.offscreen"), U = Symbol.iterator;
  function N(a) {
    return a === null || typeof a != "object" ? null : (a = U && a[U] || a["@@iterator"], typeof a == "function" ? a : null);
  }
  var z = Object.assign, R;
  function W(a) {
    if (R === void 0) try {
      throw Error();
    } catch (m) {
      var d = m.stack.trim().match(/\n( *(at )?)/);
      R = d && d[1] || "";
    }
    return `
` + R + a;
  }
  var ie = !1;
  function le(a, d) {
    if (!a || ie) return "";
    ie = !0;
    var m = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (d) if (d = function() {
        throw Error();
      }, Object.defineProperty(d.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(d, []);
        } catch (q) {
          var C = q;
        }
        Reflect.construct(a, [], d);
      } else {
        try {
          d.call();
        } catch (q) {
          C = q;
        }
        a.call(d.prototype);
      }
      else {
        try {
          throw Error();
        } catch (q) {
          C = q;
        }
        a();
      }
    } catch (q) {
      if (q && C && typeof q.stack == "string") {
        for (var S = q.stack.split(`
`), D = C.stack.split(`
`), F = S.length - 1, L = D.length - 1; 1 <= F && 0 <= L && S[F] !== D[L]; ) L--;
        for (; 1 <= F && 0 <= L; F--, L--) if (S[F] !== D[L]) {
          if (F !== 1 || L !== 1)
            do
              if (F--, L--, 0 > L || S[F] !== D[L]) {
                var j = `
` + S[F].replace(" at new ", " at ");
                return a.displayName && j.includes("<anonymous>") && (j = j.replace("<anonymous>", a.displayName)), j;
              }
            while (1 <= F && 0 <= L);
          break;
        }
      }
    } finally {
      ie = !1, Error.prepareStackTrace = m;
    }
    return (a = a ? a.displayName || a.name : "") ? W(a) : "";
  }
  function se(a) {
    switch (a.tag) {
      case 5:
        return W(a.type);
      case 16:
        return W("Lazy");
      case 13:
        return W("Suspense");
      case 19:
        return W("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = le(a.type, !1), a;
      case 11:
        return a = le(a.type.render, !1), a;
      case 1:
        return a = le(a.type, !0), a;
      default:
        return "";
    }
  }
  function ve(a) {
    if (a == null) return null;
    if (typeof a == "function") return a.displayName || a.name || null;
    if (typeof a == "string") return a;
    switch (a) {
      case B:
        return "Fragment";
      case I:
        return "Portal";
      case H:
        return "Profiler";
      case M:
        return "StrictMode";
      case ee:
        return "Suspense";
      case de:
        return "SuspenseList";
    }
    if (typeof a == "object") switch (a.$$typeof) {
      case J:
        return (a.displayName || "Context") + ".Consumer";
      case Y:
        return (a._context.displayName || "Context") + ".Provider";
      case te:
        var d = a.render;
        return a = a.displayName, a || (a = d.displayName || d.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef"), a;
      case he:
        return d = a.displayName || null, d !== null ? d : ve(a.type) || "Memo";
      case Ce:
        d = a._payload, a = a._init;
        try {
          return ve(a(d));
        } catch {
        }
    }
    return null;
  }
  function Pe(a) {
    var d = a.type;
    switch (a.tag) {
      case 24:
        return "Cache";
      case 9:
        return (d.displayName || "Context") + ".Consumer";
      case 10:
        return (d._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a = d.render, a = a.displayName || a.name || "", d.displayName || (a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return d;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ve(d);
      case 8:
        return d === M ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof d == "function") return d.displayName || d.name || null;
        if (typeof d == "string") return d;
    }
    return null;
  }
  function we(a) {
    switch (typeof a) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return a;
      case "object":
        return a;
      default:
        return "";
    }
  }
  function Ee(a) {
    var d = a.type;
    return (a = a.nodeName) && a.toLowerCase() === "input" && (d === "checkbox" || d === "radio");
  }
  function me(a) {
    var d = Ee(a) ? "checked" : "value", m = Object.getOwnPropertyDescriptor(a.constructor.prototype, d), C = "" + a[d];
    if (!a.hasOwnProperty(d) && typeof m < "u" && typeof m.get == "function" && typeof m.set == "function") {
      var S = m.get, D = m.set;
      return Object.defineProperty(a, d, { configurable: !0, get: function() {
        return S.call(this);
      }, set: function(F) {
        C = "" + F, D.call(this, F);
      } }), Object.defineProperty(a, d, { enumerable: m.enumerable }), { getValue: function() {
        return C;
      }, setValue: function(F) {
        C = "" + F;
      }, stopTracking: function() {
        a._valueTracker = null, delete a[d];
      } };
    }
  }
  function et(a) {
    a._valueTracker || (a._valueTracker = me(a));
  }
  function Zt(a) {
    if (!a) return !1;
    var d = a._valueTracker;
    if (!d) return !0;
    var m = d.getValue(), C = "";
    return a && (C = Ee(a) ? a.checked ? "true" : "false" : a.value), a = C, a !== m ? (d.setValue(a), !0) : !1;
  }
  function Xe(a) {
    if (a = a || (typeof document < "u" ? document : void 0), typeof a > "u") return null;
    try {
      return a.activeElement || a.body;
    } catch {
      return a.body;
    }
  }
  function ot(a, d) {
    var m = d.checked;
    return z({}, d, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: m ?? a._wrapperState.initialChecked });
  }
  function Li(a, d) {
    var m = d.defaultValue == null ? "" : d.defaultValue, C = d.checked != null ? d.checked : d.defaultChecked;
    m = we(d.value != null ? d.value : m), a._wrapperState = { initialChecked: C, initialValue: m, controlled: d.type === "checkbox" || d.type === "radio" ? d.checked != null : d.value != null };
  }
  function Mn(a, d) {
    d = d.checked, d != null && A(a, "checked", d, !1);
  }
  function nn(a, d) {
    Mn(a, d);
    var m = we(d.value), C = d.type;
    if (m != null) C === "number" ? (m === 0 && a.value === "" || a.value != m) && (a.value = "" + m) : a.value !== "" + m && (a.value = "" + m);
    else if (C === "submit" || C === "reset") {
      a.removeAttribute("value");
      return;
    }
    d.hasOwnProperty("value") ? Rn(a, d.type, m) : d.hasOwnProperty("defaultValue") && Rn(a, d.type, we(d.defaultValue)), d.checked == null && d.defaultChecked != null && (a.defaultChecked = !!d.defaultChecked);
  }
  function Yn(a, d, m) {
    if (d.hasOwnProperty("value") || d.hasOwnProperty("defaultValue")) {
      var C = d.type;
      if (!(C !== "submit" && C !== "reset" || d.value !== void 0 && d.value !== null)) return;
      d = "" + a._wrapperState.initialValue, m || d === a.value || (a.value = d), a.defaultValue = d;
    }
    m = a.name, m !== "" && (a.name = ""), a.defaultChecked = !!a._wrapperState.initialChecked, m !== "" && (a.name = m);
  }
  function Rn(a, d, m) {
    (d !== "number" || Xe(a.ownerDocument) !== a) && (m == null ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + m && (a.defaultValue = "" + m));
  }
  var si = Array.isArray;
  function _s(a, d, m, C) {
    if (a = a.options, d) {
      d = {};
      for (var S = 0; S < m.length; S++) d["$" + m[S]] = !0;
      for (m = 0; m < a.length; m++) S = d.hasOwnProperty("$" + a[m].value), a[m].selected !== S && (a[m].selected = S), S && C && (a[m].defaultSelected = !0);
    } else {
      for (m = "" + we(m), d = null, S = 0; S < a.length; S++) {
        if (a[S].value === m) {
          a[S].selected = !0, C && (a[S].defaultSelected = !0);
          return;
        }
        d !== null || a[S].disabled || (d = a[S]);
      }
      d !== null && (d.selected = !0);
    }
  }
  function Xf(a, d) {
    if (d.dangerouslySetInnerHTML != null) throw Error(n(91));
    return z({}, d, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
  }
  function O2(a, d) {
    var m = d.value;
    if (m == null) {
      if (m = d.children, d = d.defaultValue, m != null) {
        if (d != null) throw Error(n(92));
        if (si(m)) {
          if (1 < m.length) throw Error(n(93));
          m = m[0];
        }
        d = m;
      }
      d == null && (d = ""), m = d;
    }
    a._wrapperState = { initialValue: we(m) };
  }
  function $2(a, d) {
    var m = we(d.value), C = we(d.defaultValue);
    m != null && (m = "" + m, m !== a.value && (a.value = m), d.defaultValue == null && a.defaultValue !== m && (a.defaultValue = m)), C != null && (a.defaultValue = "" + C);
  }
  function L2(a) {
    var d = a.textContent;
    d === a._wrapperState.initialValue && d !== "" && d !== null && (a.value = d);
  }
  function N2(a) {
    switch (a) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Zf(a, d) {
    return a == null || a === "http://www.w3.org/1999/xhtml" ? N2(d) : a === "http://www.w3.org/2000/svg" && d === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a;
  }
  var lc, z2 = function(a) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(d, m, C, S) {
      MSApp.execUnsafeLocalFunction(function() {
        return a(d, m, C, S);
      });
    } : a;
  }(function(a, d) {
    if (a.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in a) a.innerHTML = d;
    else {
      for (lc = lc || document.createElement("div"), lc.innerHTML = "<svg>" + d.valueOf().toString() + "</svg>", d = lc.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
      for (; d.firstChild; ) a.appendChild(d.firstChild);
    }
  });
  function uu(a, d) {
    if (d) {
      var m = a.firstChild;
      if (m && m === a.lastChild && m.nodeType === 3) {
        m.nodeValue = d;
        return;
      }
    }
    a.textContent = d;
  }
  var lu = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, ik = ["Webkit", "ms", "Moz", "O"];
  Object.keys(lu).forEach(function(a) {
    ik.forEach(function(d) {
      d = d + a.charAt(0).toUpperCase() + a.substring(1), lu[d] = lu[a];
    });
  });
  function j2(a, d, m) {
    return d == null || typeof d == "boolean" || d === "" ? "" : m || typeof d != "number" || d === 0 || lu.hasOwnProperty(a) && lu[a] ? ("" + d).trim() : d + "px";
  }
  function H2(a, d) {
    a = a.style;
    for (var m in d) if (d.hasOwnProperty(m)) {
      var C = m.indexOf("--") === 0, S = j2(m, d[m], C);
      m === "float" && (m = "cssFloat"), C ? a.setProperty(m, S) : a[m] = S;
    }
  }
  var ok = z({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function qf(a, d) {
    if (d) {
      if (ok[a] && (d.children != null || d.dangerouslySetInnerHTML != null)) throw Error(n(137, a));
      if (d.dangerouslySetInnerHTML != null) {
        if (d.children != null) throw Error(n(60));
        if (typeof d.dangerouslySetInnerHTML != "object" || !("__html" in d.dangerouslySetInnerHTML)) throw Error(n(61));
      }
      if (d.style != null && typeof d.style != "object") throw Error(n(62));
    }
  }
  function Jf(a, d) {
    if (a.indexOf("-") === -1) return typeof d.is == "string";
    switch (a) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Qf = null;
  function eh(a) {
    return a = a.target || a.srcElement || window, a.correspondingUseElement && (a = a.correspondingUseElement), a.nodeType === 3 ? a.parentNode : a;
  }
  var th = null, Ts = null, Fs = null;
  function U2(a) {
    if (a = Tu(a)) {
      if (typeof th != "function") throw Error(n(280));
      var d = a.stateNode;
      d && (d = Fc(d), th(a.stateNode, a.type, d));
    }
  }
  function V2(a) {
    Ts ? Fs ? Fs.push(a) : Fs = [a] : Ts = a;
  }
  function G2() {
    if (Ts) {
      var a = Ts, d = Fs;
      if (Fs = Ts = null, U2(a), d) for (a = 0; a < d.length; a++) U2(d[a]);
    }
  }
  function W2(a, d) {
    return a(d);
  }
  function K2() {
  }
  var nh = !1;
  function Y2(a, d, m) {
    if (nh) return a(d, m);
    nh = !0;
    try {
      return W2(a, d, m);
    } finally {
      nh = !1, (Ts !== null || Fs !== null) && (K2(), G2());
    }
  }
  function cu(a, d) {
    var m = a.stateNode;
    if (m === null) return null;
    var C = Fc(m);
    if (C === null) return null;
    m = C[d];
    e: switch (d) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (C = !C.disabled) || (a = a.type, C = !(a === "button" || a === "input" || a === "select" || a === "textarea")), a = !C;
        break e;
      default:
        a = !1;
    }
    if (a) return null;
    if (m && typeof m != "function") throw Error(n(231, d, typeof m));
    return m;
  }
  var rh = !1;
  if (u) try {
    var du = {};
    Object.defineProperty(du, "passive", { get: function() {
      rh = !0;
    } }), window.addEventListener("test", du, du), window.removeEventListener("test", du, du);
  } catch {
    rh = !1;
  }
  function sk(a, d, m, C, S, D, F, L, j) {
    var q = Array.prototype.slice.call(arguments, 3);
    try {
      d.apply(m, q);
    } catch (ue) {
      this.onError(ue);
    }
  }
  var fu = !1, cc = null, dc = !1, ih = null, ak = { onError: function(a) {
    fu = !0, cc = a;
  } };
  function uk(a, d, m, C, S, D, F, L, j) {
    fu = !1, cc = null, sk.apply(ak, arguments);
  }
  function lk(a, d, m, C, S, D, F, L, j) {
    if (uk.apply(this, arguments), fu) {
      if (fu) {
        var q = cc;
        fu = !1, cc = null;
      } else throw Error(n(198));
      dc || (dc = !0, ih = q);
    }
  }
  function No(a) {
    var d = a, m = a;
    if (a.alternate) for (; d.return; ) d = d.return;
    else {
      a = d;
      do
        d = a, d.flags & 4098 && (m = d.return), a = d.return;
      while (a);
    }
    return d.tag === 3 ? m : null;
  }
  function X2(a) {
    if (a.tag === 13) {
      var d = a.memoizedState;
      if (d === null && (a = a.alternate, a !== null && (d = a.memoizedState)), d !== null) return d.dehydrated;
    }
    return null;
  }
  function Z2(a) {
    if (No(a) !== a) throw Error(n(188));
  }
  function ck(a) {
    var d = a.alternate;
    if (!d) {
      if (d = No(a), d === null) throw Error(n(188));
      return d !== a ? null : a;
    }
    for (var m = a, C = d; ; ) {
      var S = m.return;
      if (S === null) break;
      var D = S.alternate;
      if (D === null) {
        if (C = S.return, C !== null) {
          m = C;
          continue;
        }
        break;
      }
      if (S.child === D.child) {
        for (D = S.child; D; ) {
          if (D === m) return Z2(S), a;
          if (D === C) return Z2(S), d;
          D = D.sibling;
        }
        throw Error(n(188));
      }
      if (m.return !== C.return) m = S, C = D;
      else {
        for (var F = !1, L = S.child; L; ) {
          if (L === m) {
            F = !0, m = S, C = D;
            break;
          }
          if (L === C) {
            F = !0, C = S, m = D;
            break;
          }
          L = L.sibling;
        }
        if (!F) {
          for (L = D.child; L; ) {
            if (L === m) {
              F = !0, m = D, C = S;
              break;
            }
            if (L === C) {
              F = !0, C = D, m = S;
              break;
            }
            L = L.sibling;
          }
          if (!F) throw Error(n(189));
        }
      }
      if (m.alternate !== C) throw Error(n(190));
    }
    if (m.tag !== 3) throw Error(n(188));
    return m.stateNode.current === m ? a : d;
  }
  function q2(a) {
    return a = ck(a), a !== null ? J2(a) : null;
  }
  function J2(a) {
    if (a.tag === 5 || a.tag === 6) return a;
    for (a = a.child; a !== null; ) {
      var d = J2(a);
      if (d !== null) return d;
      a = a.sibling;
    }
    return null;
  }
  var Q2 = t.unstable_scheduleCallback, e3 = t.unstable_cancelCallback, dk = t.unstable_shouldYield, fk = t.unstable_requestPaint, Mt = t.unstable_now, hk = t.unstable_getCurrentPriorityLevel, oh = t.unstable_ImmediatePriority, t3 = t.unstable_UserBlockingPriority, fc = t.unstable_NormalPriority, pk = t.unstable_LowPriority, n3 = t.unstable_IdlePriority, hc = null, Br = null;
  function mk(a) {
    if (Br && typeof Br.onCommitFiberRoot == "function") try {
      Br.onCommitFiberRoot(hc, a, void 0, (a.current.flags & 128) === 128);
    } catch {
    }
  }
  var hr = Math.clz32 ? Math.clz32 : Ek, gk = Math.log, vk = Math.LN2;
  function Ek(a) {
    return a >>>= 0, a === 0 ? 32 : 31 - (gk(a) / vk | 0) | 0;
  }
  var pc = 64, mc = 4194304;
  function hu(a) {
    switch (a & -a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a;
    }
  }
  function gc(a, d) {
    var m = a.pendingLanes;
    if (m === 0) return 0;
    var C = 0, S = a.suspendedLanes, D = a.pingedLanes, F = m & 268435455;
    if (F !== 0) {
      var L = F & ~S;
      L !== 0 ? C = hu(L) : (D &= F, D !== 0 && (C = hu(D)));
    } else F = m & ~S, F !== 0 ? C = hu(F) : D !== 0 && (C = hu(D));
    if (C === 0) return 0;
    if (d !== 0 && d !== C && !(d & S) && (S = C & -C, D = d & -d, S >= D || S === 16 && (D & 4194240) !== 0)) return d;
    if (C & 4 && (C |= m & 16), d = a.entangledLanes, d !== 0) for (a = a.entanglements, d &= C; 0 < d; ) m = 31 - hr(d), S = 1 << m, C |= a[m], d &= ~S;
    return C;
  }
  function Ck(a, d) {
    switch (a) {
      case 1:
      case 2:
      case 4:
        return d + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return d + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function yk(a, d) {
    for (var m = a.suspendedLanes, C = a.pingedLanes, S = a.expirationTimes, D = a.pendingLanes; 0 < D; ) {
      var F = 31 - hr(D), L = 1 << F, j = S[F];
      j === -1 ? (!(L & m) || L & C) && (S[F] = Ck(L, d)) : j <= d && (a.expiredLanes |= L), D &= ~L;
    }
  }
  function sh(a) {
    return a = a.pendingLanes & -1073741825, a !== 0 ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function r3() {
    var a = pc;
    return pc <<= 1, !(pc & 4194240) && (pc = 64), a;
  }
  function ah(a) {
    for (var d = [], m = 0; 31 > m; m++) d.push(a);
    return d;
  }
  function pu(a, d, m) {
    a.pendingLanes |= d, d !== 536870912 && (a.suspendedLanes = 0, a.pingedLanes = 0), a = a.eventTimes, d = 31 - hr(d), a[d] = m;
  }
  function bk(a, d) {
    var m = a.pendingLanes & ~d;
    a.pendingLanes = d, a.suspendedLanes = 0, a.pingedLanes = 0, a.expiredLanes &= d, a.mutableReadLanes &= d, a.entangledLanes &= d, d = a.entanglements;
    var C = a.eventTimes;
    for (a = a.expirationTimes; 0 < m; ) {
      var S = 31 - hr(m), D = 1 << S;
      d[S] = 0, C[S] = -1, a[S] = -1, m &= ~D;
    }
  }
  function uh(a, d) {
    var m = a.entangledLanes |= d;
    for (a = a.entanglements; m; ) {
      var C = 31 - hr(m), S = 1 << C;
      S & d | a[C] & d && (a[C] |= d), m &= ~S;
    }
  }
  var st = 0;
  function i3(a) {
    return a &= -a, 1 < a ? 4 < a ? a & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var o3, lh, s3, a3, u3, ch = !1, vc = [], Ni = null, zi = null, ji = null, mu = /* @__PURE__ */ new Map(), gu = /* @__PURE__ */ new Map(), Hi = [], wk = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function l3(a, d) {
    switch (a) {
      case "focusin":
      case "focusout":
        Ni = null;
        break;
      case "dragenter":
      case "dragleave":
        zi = null;
        break;
      case "mouseover":
      case "mouseout":
        ji = null;
        break;
      case "pointerover":
      case "pointerout":
        mu.delete(d.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        gu.delete(d.pointerId);
    }
  }
  function vu(a, d, m, C, S, D) {
    return a === null || a.nativeEvent !== D ? (a = { blockedOn: d, domEventName: m, eventSystemFlags: C, nativeEvent: D, targetContainers: [S] }, d !== null && (d = Tu(d), d !== null && lh(d)), a) : (a.eventSystemFlags |= C, d = a.targetContainers, S !== null && d.indexOf(S) === -1 && d.push(S), a);
  }
  function Sk(a, d, m, C, S) {
    switch (d) {
      case "focusin":
        return Ni = vu(Ni, a, d, m, C, S), !0;
      case "dragenter":
        return zi = vu(zi, a, d, m, C, S), !0;
      case "mouseover":
        return ji = vu(ji, a, d, m, C, S), !0;
      case "pointerover":
        var D = S.pointerId;
        return mu.set(D, vu(mu.get(D) || null, a, d, m, C, S)), !0;
      case "gotpointercapture":
        return D = S.pointerId, gu.set(D, vu(gu.get(D) || null, a, d, m, C, S)), !0;
    }
    return !1;
  }
  function c3(a) {
    var d = zo(a.target);
    if (d !== null) {
      var m = No(d);
      if (m !== null) {
        if (d = m.tag, d === 13) {
          if (d = X2(m), d !== null) {
            a.blockedOn = d, u3(a.priority, function() {
              s3(m);
            });
            return;
          }
        } else if (d === 3 && m.stateNode.current.memoizedState.isDehydrated) {
          a.blockedOn = m.tag === 3 ? m.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a.blockedOn = null;
  }
  function Ec(a) {
    if (a.blockedOn !== null) return !1;
    for (var d = a.targetContainers; 0 < d.length; ) {
      var m = fh(a.domEventName, a.eventSystemFlags, d[0], a.nativeEvent);
      if (m === null) {
        m = a.nativeEvent;
        var C = new m.constructor(m.type, m);
        Qf = C, m.target.dispatchEvent(C), Qf = null;
      } else return d = Tu(m), d !== null && lh(d), a.blockedOn = m, !1;
      d.shift();
    }
    return !0;
  }
  function d3(a, d, m) {
    Ec(a) && m.delete(d);
  }
  function xk() {
    ch = !1, Ni !== null && Ec(Ni) && (Ni = null), zi !== null && Ec(zi) && (zi = null), ji !== null && Ec(ji) && (ji = null), mu.forEach(d3), gu.forEach(d3);
  }
  function Eu(a, d) {
    a.blockedOn === d && (a.blockedOn = null, ch || (ch = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, xk)));
  }
  function Cu(a) {
    function d(S) {
      return Eu(S, a);
    }
    if (0 < vc.length) {
      Eu(vc[0], a);
      for (var m = 1; m < vc.length; m++) {
        var C = vc[m];
        C.blockedOn === a && (C.blockedOn = null);
      }
    }
    for (Ni !== null && Eu(Ni, a), zi !== null && Eu(zi, a), ji !== null && Eu(ji, a), mu.forEach(d), gu.forEach(d), m = 0; m < Hi.length; m++) C = Hi[m], C.blockedOn === a && (C.blockedOn = null);
    for (; 0 < Hi.length && (m = Hi[0], m.blockedOn === null); ) c3(m), m.blockedOn === null && Hi.shift();
  }
  var Bs = T.ReactCurrentBatchConfig, Cc = !0;
  function kk(a, d, m, C) {
    var S = st, D = Bs.transition;
    Bs.transition = null;
    try {
      st = 1, dh(a, d, m, C);
    } finally {
      st = S, Bs.transition = D;
    }
  }
  function Dk(a, d, m, C) {
    var S = st, D = Bs.transition;
    Bs.transition = null;
    try {
      st = 4, dh(a, d, m, C);
    } finally {
      st = S, Bs.transition = D;
    }
  }
  function dh(a, d, m, C) {
    if (Cc) {
      var S = fh(a, d, m, C);
      if (S === null) Ph(a, d, C, yc, m), l3(a, C);
      else if (Sk(S, a, d, m, C)) C.stopPropagation();
      else if (l3(a, C), d & 4 && -1 < wk.indexOf(a)) {
        for (; S !== null; ) {
          var D = Tu(S);
          if (D !== null && o3(D), D = fh(a, d, m, C), D === null && Ph(a, d, C, yc, m), D === S) break;
          S = D;
        }
        S !== null && C.stopPropagation();
      } else Ph(a, d, C, null, m);
    }
  }
  var yc = null;
  function fh(a, d, m, C) {
    if (yc = null, a = eh(C), a = zo(a), a !== null) if (d = No(a), d === null) a = null;
    else if (m = d.tag, m === 13) {
      if (a = X2(d), a !== null) return a;
      a = null;
    } else if (m === 3) {
      if (d.stateNode.current.memoizedState.isDehydrated) return d.tag === 3 ? d.stateNode.containerInfo : null;
      a = null;
    } else d !== a && (a = null);
    return yc = a, null;
  }
  function f3(a) {
    switch (a) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
        return 4;
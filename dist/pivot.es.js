import On, { useState as ee, useMemo as vn, useEffect as rt, forwardRef as Qi, createElement as Zn, useRef as sn, useCallback as Zi } from "react";
function Vr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Rt = { exports: {} }, dt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var er;
function es() {
  if (er) return dt;
  er = 1;
  var e = On, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, s = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(o, p, u) {
    var c, f = {}, h = null, d = null;
    u !== void 0 && (h = "" + u), p.key !== void 0 && (h = "" + p.key), p.ref !== void 0 && (d = p.ref);
    for (c in p) r.call(p, c) && !i.hasOwnProperty(c) && (f[c] = p[c]);
    if (o && o.defaultProps) for (c in p = o.defaultProps, p) f[c] === void 0 && (f[c] = p[c]);
    return { $$typeof: t, type: o, key: h, ref: d, props: f, _owner: s.current };
  }
  return dt.Fragment = n, dt.jsx = a, dt.jsxs = a, dt;
}
var pt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tr;
function ts() {
  return tr || (tr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = On, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), o = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), y = Symbol.iterator, v = "@@iterator";
    function P(m) {
      if (m === null || typeof m != "object")
        return null;
      var C = y && m[y] || m[v];
      return typeof C == "function" ? C : null;
    }
    var j = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function S(m) {
      {
        for (var C = arguments.length, L = new Array(C > 1 ? C - 1 : 0), U = 1; U < C; U++)
          L[U - 1] = arguments[U];
        w("error", m, L);
      }
    }
    function w(m, C, L) {
      {
        var U = j.ReactDebugCurrentFrame, Z = U.getStackAddendum();
        Z !== "" && (C += "%s", L = L.concat([Z]));
        var te = L.map(function(X) {
          return String(X);
        });
        te.unshift("Warning: " + C), Function.prototype.apply.call(console[m], console, te);
      }
    }
    var F = !1, M = !1, b = !1, $ = !1, D = !1, I;
    I = Symbol.for("react.module.reference");
    function z(m) {
      return !!(typeof m == "string" || typeof m == "function" || m === r || m === i || D || m === s || m === u || m === c || $ || m === d || F || M || b || typeof m == "object" && m !== null && (m.$$typeof === h || m.$$typeof === f || m.$$typeof === a || m.$$typeof === o || m.$$typeof === p || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      m.$$typeof === I || m.getModuleId !== void 0));
    }
    function T(m, C, L) {
      var U = m.displayName;
      if (U)
        return U;
      var Z = C.displayName || C.name || "";
      return Z !== "" ? L + "(" + Z + ")" : L;
    }
    function A(m) {
      return m.displayName || "Context";
    }
    function R(m) {
      if (m == null)
        return null;
      if (typeof m.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof m == "function")
        return m.displayName || m.name || null;
      if (typeof m == "string")
        return m;
      switch (m) {
        case r:
          return "Fragment";
        case n:
          return "Portal";
        case i:
          return "Profiler";
        case s:
          return "StrictMode";
        case u:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof m == "object")
        switch (m.$$typeof) {
          case o:
            var C = m;
            return A(C) + ".Consumer";
          case a:
            var L = m;
            return A(L._context) + ".Provider";
          case p:
            return T(m, m.render, "ForwardRef");
          case f:
            var U = m.displayName || null;
            return U !== null ? U : R(m.type) || "Memo";
          case h: {
            var Z = m, te = Z._payload, X = Z._init;
            try {
              return R(X(te));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var _ = Object.assign, N = 0, B, H, G, ce, x, fe, xe;
    function g() {
    }
    g.__reactDisabledLog = !0;
    function de() {
      {
        if (N === 0) {
          B = console.log, H = console.info, G = console.warn, ce = console.error, x = console.group, fe = console.groupCollapsed, xe = console.groupEnd;
          var m = {
            configurable: !0,
            enumerable: !0,
            value: g,
            writable: !0
          };
          Object.defineProperties(console, {
            info: m,
            log: m,
            warn: m,
            error: m,
            group: m,
            groupCollapsed: m,
            groupEnd: m
          });
        }
        N++;
      }
    }
    function ge() {
      {
        if (N--, N === 0) {
          var m = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: _({}, m, {
              value: B
            }),
            info: _({}, m, {
              value: H
            }),
            warn: _({}, m, {
              value: G
            }),
            error: _({}, m, {
              value: ce
            }),
            group: _({}, m, {
              value: x
            }),
            groupCollapsed: _({}, m, {
              value: fe
            }),
            groupEnd: _({}, m, {
              value: xe
            })
          });
        }
        N < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ne = j.ReactCurrentDispatcher, Pe;
    function ke(m, C, L) {
      {
        if (Pe === void 0)
          try {
            throw Error();
          } catch (Z) {
            var U = Z.stack.trim().match(/\n( *(at )?)/);
            Pe = U && U[1] || "";
          }
        return `
` + Pe + m;
      }
    }
    var _e = !1, Oe;
    {
      var Ge = typeof WeakMap == "function" ? WeakMap : Map;
      Oe = new Ge();
    }
    function It(m, C) {
      if (!m || _e)
        return "";
      {
        var L = Oe.get(m);
        if (L !== void 0)
          return L;
      }
      var U;
      _e = !0;
      var Z = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var te;
      te = ne.current, ne.current = null, de();
      try {
        if (C) {
          var X = function() {
            throw Error();
          };
          if (Object.defineProperty(X.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(X, []);
            } catch (ye) {
              U = ye;
            }
            Reflect.construct(m, [], X);
          } else {
            try {
              X.call();
            } catch (ye) {
              U = ye;
            }
            m.call(X.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ye) {
            U = ye;
          }
          m();
        }
      } catch (ye) {
        if (ye && U && typeof ye.stack == "string") {
          for (var J = ye.stack.split(`
`), me = U.stack.split(`
`), se = J.length - 1, ae = me.length - 1; se >= 1 && ae >= 0 && J[se] !== me[ae]; )
            ae--;
          for (; se >= 1 && ae >= 0; se--, ae--)
            if (J[se] !== me[ae]) {
              if (se !== 1 || ae !== 1)
                do
                  if (se--, ae--, ae < 0 || J[se] !== me[ae]) {
                    var Te = `
` + J[se].replace(" at new ", " at ");
                    return m.displayName && Te.includes("<anonymous>") && (Te = Te.replace("<anonymous>", m.displayName)), typeof m == "function" && Oe.set(m, Te), Te;
                  }
                while (se >= 1 && ae >= 0);
              break;
            }
        }
      } finally {
        _e = !1, ne.current = te, ge(), Error.prepareStackTrace = Z;
      }
      var Qe = m ? m.displayName || m.name : "", Je = Qe ? ke(Qe) : "";
      return typeof m == "function" && Oe.set(m, Je), Je;
    }
    function Gt(m, C, L) {
      return It(m, !1);
    }
    function Kt(m) {
      var C = m.prototype;
      return !!(C && C.isReactComponent);
    }
    function He(m, C, L) {
      if (m == null)
        return "";
      if (typeof m == "function")
        return It(m, Kt(m));
      if (typeof m == "string")
        return ke(m);
      switch (m) {
        case u:
          return ke("Suspense");
        case c:
          return ke("SuspenseList");
      }
      if (typeof m == "object")
        switch (m.$$typeof) {
          case p:
            return Gt(m.render);
          case f:
            return He(m.type, C, L);
          case h: {
            var U = m, Z = U._payload, te = U._init;
            try {
              return He(te(Z), C, L);
            } catch {
            }
          }
        }
      return "";
    }
    var Me = Object.prototype.hasOwnProperty, ut = {}, Pt = j.ReactDebugCurrentFrame;
    function Ve(m) {
      if (m) {
        var C = m._owner, L = He(m.type, m._source, C ? C.type : null);
        Pt.setExtraStackFrame(L);
      } else
        Pt.setExtraStackFrame(null);
    }
    function Ot(m, C, L, U, Z) {
      {
        var te = Function.call.bind(Me);
        for (var X in m)
          if (te(m, X)) {
            var J = void 0;
            try {
              if (typeof m[X] != "function") {
                var me = Error((U || "React class") + ": " + L + " type `" + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof m[X] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw me.name = "Invariant Violation", me;
              }
              J = m[X](C, X, U, L, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (se) {
              J = se;
            }
            J && !(J instanceof Error) && (Ve(Z), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", U || "React class", L, X, typeof J), Ve(null)), J instanceof Error && !(J.message in ut) && (ut[J.message] = !0, Ve(Z), S("Failed %s type: %s", L, J.message), Ve(null));
          }
      }
    }
    var Qt = Array.isArray;
    function ct(m) {
      return Qt(m);
    }
    function Zt(m) {
      {
        var C = typeof Symbol == "function" && Symbol.toStringTag, L = C && m[Symbol.toStringTag] || m.constructor.name || "Object";
        return L;
      }
    }
    function en(m) {
      try {
        return At(m), !1;
      } catch {
        return !0;
      }
    }
    function At(m) {
      return "" + m;
    }
    function k(m) {
      if (en(m))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Zt(m)), At(m);
    }
    var O = j.ReactCurrentOwner, V = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Y, Q;
    function we(m) {
      if (Me.call(m, "ref")) {
        var C = Object.getOwnPropertyDescriptor(m, "ref").get;
        if (C && C.isReactWarning)
          return !1;
      }
      return m.ref !== void 0;
    }
    function ze(m) {
      if (Me.call(m, "key")) {
        var C = Object.getOwnPropertyDescriptor(m, "key").get;
        if (C && C.isReactWarning)
          return !1;
      }
      return m.key !== void 0;
    }
    function Ae(m, C) {
      typeof m.ref == "string" && O.current;
    }
    function We(m, C) {
      {
        var L = function() {
          Y || (Y = !0, S("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        L.isReactWarning = !0, Object.defineProperty(m, "key", {
          get: L,
          configurable: !0
        });
      }
    }
    function Ye(m, C) {
      {
        var L = function() {
          Q || (Q = !0, S("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        L.isReactWarning = !0, Object.defineProperty(m, "ref", {
          get: L,
          configurable: !0
        });
      }
    }
    var he = function(m, C, L, U, Z, te, X) {
      var J = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: m,
        key: C,
        ref: L,
        props: X,
        // Record the component responsible for creating this element.
        _owner: te
      };
      return J._store = {}, Object.defineProperty(J._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(J, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: U
      }), Object.defineProperty(J, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Z
      }), Object.freeze && (Object.freeze(J.props), Object.freeze(J)), J;
    };
    function Be(m, C, L, U, Z) {
      {
        var te, X = {}, J = null, me = null;
        L !== void 0 && (k(L), J = "" + L), ze(C) && (k(C.key), J = "" + C.key), we(C) && (me = C.ref, Ae(C, Z));
        for (te in C)
          Me.call(C, te) && !V.hasOwnProperty(te) && (X[te] = C[te]);
        if (m && m.defaultProps) {
          var se = m.defaultProps;
          for (te in se)
            X[te] === void 0 && (X[te] = se[te]);
        }
        if (J || me) {
          var ae = typeof m == "function" ? m.displayName || m.name || "Unknown" : m;
          J && We(X, ae), me && Ye(X, ae);
        }
        return he(m, J, me, Z, U, O.current, X);
      }
    }
    var Ne = j.ReactCurrentOwner, Wn = j.ReactDebugCurrentFrame;
    function Ke(m) {
      if (m) {
        var C = m._owner, L = He(m.type, m._source, C ? C.type : null);
        Wn.setExtraStackFrame(L);
      } else
        Wn.setExtraStackFrame(null);
    }
    var tn;
    tn = !1;
    function nn(m) {
      return typeof m == "object" && m !== null && m.$$typeof === t;
    }
    function Yn() {
      {
        if (Ne.current) {
          var m = R(Ne.current.type);
          if (m)
            return `

Check the render method of \`` + m + "`.";
        }
        return "";
      }
    }
    function qi(m) {
      return "";
    }
    var Jn = {};
    function Ui(m) {
      {
        var C = Yn();
        if (!C) {
          var L = typeof m == "string" ? m : m.displayName || m.name;
          L && (C = `

Check the top-level render call using <` + L + ">.");
        }
        return C;
      }
    }
    function Xn(m, C) {
      {
        if (!m._store || m._store.validated || m.key != null)
          return;
        m._store.validated = !0;
        var L = Ui(C);
        if (Jn[L])
          return;
        Jn[L] = !0;
        var U = "";
        m && m._owner && m._owner !== Ne.current && (U = " It was passed a child from " + R(m._owner.type) + "."), Ke(m), S('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', L, U), Ke(null);
      }
    }
    function Gn(m, C) {
      {
        if (typeof m != "object")
          return;
        if (ct(m))
          for (var L = 0; L < m.length; L++) {
            var U = m[L];
            nn(U) && Xn(U, C);
          }
        else if (nn(m))
          m._store && (m._store.validated = !0);
        else if (m) {
          var Z = P(m);
          if (typeof Z == "function" && Z !== m.entries)
            for (var te = Z.call(m), X; !(X = te.next()).done; )
              nn(X.value) && Xn(X.value, C);
        }
      }
    }
    function Hi(m) {
      {
        var C = m.type;
        if (C == null || typeof C == "string")
          return;
        var L;
        if (typeof C == "function")
          L = C.propTypes;
        else if (typeof C == "object" && (C.$$typeof === p || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        C.$$typeof === f))
          L = C.propTypes;
        else
          return;
        if (L) {
          var U = R(C);
          Ot(L, m.props, "prop", U, m);
        } else if (C.PropTypes !== void 0 && !tn) {
          tn = !0;
          var Z = R(C);
          S("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Z || "Unknown");
        }
        typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && S("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Vi(m) {
      {
        for (var C = Object.keys(m.props), L = 0; L < C.length; L++) {
          var U = C[L];
          if (U !== "children" && U !== "key") {
            Ke(m), S("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", U), Ke(null);
            break;
          }
        }
        m.ref !== null && (Ke(m), S("Invalid attribute `ref` supplied to `React.Fragment`."), Ke(null));
      }
    }
    var Kn = {};
    function Qn(m, C, L, U, Z, te) {
      {
        var X = z(m);
        if (!X) {
          var J = "";
          (m === void 0 || typeof m == "object" && m !== null && Object.keys(m).length === 0) && (J += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var me = qi();
          me ? J += me : J += Yn();
          var se;
          m === null ? se = "null" : ct(m) ? se = "array" : m !== void 0 && m.$$typeof === t ? (se = "<" + (R(m.type) || "Unknown") + " />", J = " Did you accidentally export a JSX literal instead of a component?") : se = typeof m, S("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", se, J);
        }
        var ae = Be(m, C, L, Z, te);
        if (ae == null)
          return ae;
        if (X) {
          var Te = C.children;
          if (Te !== void 0)
            if (U)
              if (ct(Te)) {
                for (var Qe = 0; Qe < Te.length; Qe++)
                  Gn(Te[Qe], m);
                Object.freeze && Object.freeze(Te);
              } else
                S("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Gn(Te, m);
        }
        if (Me.call(C, "key")) {
          var Je = R(m), ye = Object.keys(C).filter(function(Ki) {
            return Ki !== "key";
          }), rn = ye.length > 0 ? "{key: someKey, " + ye.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Kn[Je + rn]) {
            var Gi = ye.length > 0 ? "{" + ye.join(": ..., ") + ": ...}" : "{}";
            S(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, rn, Je, Gi, Je), Kn[Je + rn] = !0;
          }
        }
        return m === r ? Vi(ae) : Hi(ae), ae;
      }
    }
    function Wi(m, C, L) {
      return Qn(m, C, L, !0);
    }
    function Yi(m, C, L) {
      return Qn(m, C, L, !1);
    }
    var Ji = Yi, Xi = Wi;
    pt.Fragment = r, pt.jsx = Ji, pt.jsxs = Xi;
  }()), pt;
}
var nr;
function ns() {
  return nr || (nr = 1, process.env.NODE_ENV === "production" ? Rt.exports = es() : Rt.exports = ts()), Rt.exports;
}
var l = ns();
function ue(e, t, n) {
  if (!e) return null;
  if (typeof e == "object" && e !== null && "$ref" in e) {
    const s = e.$ref, i = s.match(/^#\/components\/([^/]+)\/(.+)$/);
    if (i && t) {
      const [, a, o] = i;
      n && a !== n && console.warn(`引用类别 ${a} 与期望类别 ${n} 不一致`);
      const p = t[a];
      if (p && typeof p == "object") {
        const u = p[o];
        if (u)
          return typeof u == "object" && u !== null && "$ref" in u ? ue(u, t, n) : u;
      }
      return console.warn(`找不到引用 ${s}`), null;
    }
    return console.warn(`不支持的引用格式 ${s}`), null;
  }
  return e;
}
const Wr = ({ value: e, className: t = "" }) => {
  const n = typeof e == "object" ? JSON.stringify(e, null, 2) : String(e);
  return /* @__PURE__ */ l.jsx("code", { className: `text-xs bg-gray-100 px-2 py-1 rounded font-mono break-all ${t}`, children: n });
}, rs = ({ values: e, className: t }) => {
  const [n, r] = ee(!1);
  return e.length === 0 ? null : /* @__PURE__ */ l.jsx("div", { className: t, children: e.map((s, i) => /* @__PURE__ */ l.jsx(Wr, { value: s }, i)) });
}, jt = ({ values: e, className: t }) => !e || e.length === 0 ? null : /* @__PURE__ */ l.jsxs("div", { className: t, children: [
  /* @__PURE__ */ l.jsx("h4", { className: "text-xs font-semibold mb-1 text-gray-500", children: "Allowed Values" }),
  /* @__PURE__ */ l.jsx(rs, { values: e, className: "flex flex-wrap gap-1" })
] }), vt = ({ value: e, className: t }) => e == null ? null : /* @__PURE__ */ l.jsxs("div", { className: `${t || ""}`, children: [
  /* @__PURE__ */ l.jsx("h4", { className: "text-xs font-semibold mb-1 text-gray-500", children: "默认值" }),
  /* @__PURE__ */ l.jsx(Wr, { value: e })
] }), $e = () => /* @__PURE__ */ l.jsx("span", { className: "bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded font-semibold", children: "deprecated" }), rr = {
  primary: "text-blue-800",
  // Was number, removed bg-blue-100
  secondary: "text-purple-800",
  // Was date, removed bg-purple-100
  success: "text-green-800",
  // Was identifier, removed bg-green-100
  warning: "text-yellow-800",
  // Was binary, removed bg-yellow-100
  danger: "text-red-800",
  // Was sensitive, removed bg-red-100
  neutral: "text-gray-500"
  // Was default, removed bg-gray-100
}, is = (e) => ["int32", "int64", "float", "double"].includes(e) ? "primary" : ["date", "date-time"].includes(e) ? "secondary" : ["email", "uuid", "uri", "hostname", "ipv4", "ipv6"].includes(e) ? "success" : ["byte", "binary"].includes(e) ? "warning" : ["password"].includes(e) ? "danger" : "neutral", Bt = ({ format: e, theme: t = "auto", className: n }) => {
  const r = t === "auto" ? is(e) : t, s = rr[r] || rr.neutral;
  return /* @__PURE__ */ l.jsx(
    "span",
    {
      className: `text-xs font-medium font-mono ${s} ${n || ""}`,
      children: e
    }
  );
}, ss = (e) => {
  switch (e) {
    case "query":
      return "bg-blue-100 text-blue-800";
    case "path":
      return "bg-green-100 text-green-800";
    case "header":
      return "bg-purple-100 text-purple-800";
    case "cookie":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}, ls = ({ type: e, className: t }) => {
  const n = ss(e);
  return /* @__PURE__ */ l.jsxs(
    "span",
    {
      className: `px-2 py-0.5 rounded text-xs font-medium ${n} ${t || ""}`,
      children: [
        "in: ",
        e
      ]
    }
  );
};
function as(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const os = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, us = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, cs = {};
function ir(e, t) {
  return (cs.jsx ? us : os).test(e);
}
const ds = /[ \t\n\f\r]/g;
function ps(e) {
  return typeof e == "object" ? e.type === "text" ? sr(e.value) : !1 : sr(e);
}
function sr(e) {
  return e.replace(ds, "") === "";
}
class St {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(t, n, r) {
    this.normal = n, this.property = t, r && (this.space = r);
  }
}
St.prototype.normal = {};
St.prototype.property = {};
St.prototype.space = void 0;
function Yr(e, t) {
  const n = {}, r = {};
  for (const s of e)
    Object.assign(n, s.property), Object.assign(r, s.normal);
  return new St(n, r, t);
}
function kn(e) {
  return e.toLowerCase();
}
let ve = class {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(t, n) {
    this.attribute = n, this.property = t;
  }
};
ve.prototype.attribute = "";
ve.prototype.booleanish = !1;
ve.prototype.boolean = !1;
ve.prototype.commaOrSpaceSeparated = !1;
ve.prototype.commaSeparated = !1;
ve.prototype.defined = !1;
ve.prototype.mustUseProperty = !1;
ve.prototype.number = !1;
ve.prototype.overloadedBoolean = !1;
ve.prototype.property = "";
ve.prototype.spaceSeparated = !1;
ve.prototype.space = void 0;
let fs = 0;
const W = Xe(), oe = Xe(), Jr = Xe(), E = Xe(), re = Xe(), it = Xe(), Se = Xe();
function Xe() {
  return 2 ** ++fs;
}
const wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: W,
  booleanish: oe,
  commaOrSpaceSeparated: Se,
  commaSeparated: it,
  number: E,
  overloadedBoolean: Jr,
  spaceSeparated: re
}, Symbol.toStringTag, { value: "Module" })), ln = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(wn)
);
class An extends ve {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(t, n, r, s) {
    let i = -1;
    if (super(t, n), lr(this, "space", s), typeof r == "number")
      for (; ++i < ln.length; ) {
        const a = ln[i];
        lr(this, ln[i], (r & wn[a]) === wn[a]);
      }
  }
}
An.prototype.defined = !0;
function lr(e, t, n) {
  n && (e[t] = n);
}
function at(e) {
  const t = {}, n = {};
  for (const [r, s] of Object.entries(e.properties)) {
    const i = new An(
      r,
      e.transform(e.attributes || {}, r),
      s,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (i.mustUseProperty = !0), t[r] = i, n[kn(r)] = r, n[kn(i.attribute)] = r;
  }
  return new St(t, n, e.space);
}
const Xr = at({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: oe,
    ariaAutoComplete: null,
    ariaBusy: oe,
    ariaChecked: oe,
    ariaColCount: E,
    ariaColIndex: E,
    ariaColSpan: E,
    ariaControls: re,
    ariaCurrent: null,
    ariaDescribedBy: re,
    ariaDetails: null,
    ariaDisabled: oe,
    ariaDropEffect: re,
    ariaErrorMessage: null,
    ariaExpanded: oe,
    ariaFlowTo: re,
    ariaGrabbed: oe,
    ariaHasPopup: null,
    ariaHidden: oe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: re,
    ariaLevel: E,
    ariaLive: null,
    ariaModal: oe,
    ariaMultiLine: oe,
    ariaMultiSelectable: oe,
    ariaOrientation: null,
    ariaOwns: re,
    ariaPlaceholder: null,
    ariaPosInSet: E,
    ariaPressed: oe,
    ariaReadOnly: oe,
    ariaRelevant: null,
    ariaRequired: oe,
    ariaRoleDescription: re,
    ariaRowCount: E,
    ariaRowIndex: E,
    ariaRowSpan: E,
    ariaSelected: oe,
    ariaSetSize: E,
    ariaSort: null,
    ariaValueMax: E,
    ariaValueMin: E,
    ariaValueNow: E,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function Gr(e, t) {
  return t in e ? e[t] : t;
}
function Kr(e, t) {
  return Gr(e, t.toLowerCase());
}
const hs = at({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: it,
    acceptCharset: re,
    accessKey: re,
    action: null,
    allow: null,
    allowFullScreen: W,
    allowPaymentRequest: W,
    allowUserMedia: W,
    alt: null,
    as: null,
    async: W,
    autoCapitalize: null,
    autoComplete: re,
    autoFocus: W,
    autoPlay: W,
    blocking: re,
    capture: null,
    charSet: null,
    checked: W,
    cite: null,
    className: re,
    cols: E,
    colSpan: null,
    content: null,
    contentEditable: oe,
    controls: W,
    controlsList: re,
    coords: E | it,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: W,
    defer: W,
    dir: null,
    dirName: null,
    disabled: W,
    download: Jr,
    draggable: oe,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: W,
    formTarget: null,
    headers: re,
    height: E,
    hidden: W,
    high: E,
    href: null,
    hrefLang: null,
    htmlFor: re,
    httpEquiv: re,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: W,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: W,
    itemId: null,
    itemProp: re,
    itemRef: re,
    itemScope: W,
    itemType: re,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: W,
    low: E,
    manifest: null,
    max: null,
    maxLength: E,
    media: null,
    method: null,
    min: null,
    minLength: E,
    multiple: W,
    muted: W,
    name: null,
    nonce: null,
    noModule: W,
    noValidate: W,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: W,
    optimum: E,
    pattern: null,
    ping: re,
    placeholder: null,
    playsInline: W,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: W,
    referrerPolicy: null,
    rel: re,
    required: W,
    reversed: W,
    rows: E,
    rowSpan: E,
    sandbox: re,
    scope: null,
    scoped: W,
    seamless: W,
    selected: W,
    shadowRootClonable: W,
    shadowRootDelegatesFocus: W,
    shadowRootMode: null,
    shape: null,
    size: E,
    sizes: null,
    slot: null,
    span: E,
    spellCheck: oe,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: E,
    step: null,
    style: null,
    tabIndex: E,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: W,
    useMap: null,
    value: oe,
    width: E,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: re,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: E,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: E,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: W,
    // Lists. Use CSS to reduce space between items instead
    declare: W,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: E,
    // `<img>` and `<object>`
    leftMargin: E,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: E,
    // `<body>`
    marginWidth: E,
    // `<body>`
    noResize: W,
    // `<frame>`
    noHref: W,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: W,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: W,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: E,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: oe,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: E,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: E,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: W,
    disableRemotePlayback: W,
    prefix: null,
    property: null,
    results: E,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Kr
}), ms = at({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: Se,
    accentHeight: E,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: E,
    amplitude: E,
    arabicForm: null,
    ascent: E,
    attributeName: null,
    attributeType: null,
    azimuth: E,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: E,
    by: null,
    calcMode: null,
    capHeight: E,
    className: re,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: E,
    diffuseConstant: E,
    direction: null,
    display: null,
    dur: null,
    divisor: E,
    dominantBaseline: null,
    download: W,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: E,
    enableBackground: null,
    end: null,
    event: null,
    exponent: E,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: E,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: it,
    g2: it,
    glyphName: it,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: E,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: E,
    horizOriginX: E,
    horizOriginY: E,
    id: null,
    ideographic: E,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: E,
    k: E,
    k1: E,
    k2: E,
    k3: E,
    k4: E,
    kernelMatrix: Se,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: E,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: E,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: E,
    overlineThickness: E,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: E,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: re,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: E,
    pointsAtY: E,
    pointsAtZ: E,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Se,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Se,
    rev: Se,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Se,
    requiredFeatures: Se,
    requiredFonts: Se,
    requiredFormats: Se,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: E,
    specularExponent: E,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: E,
    strikethroughThickness: E,
    string: null,
    stroke: null,
    strokeDashArray: Se,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: E,
    strokeOpacity: E,
    strokeWidth: null,
    style: null,
    surfaceScale: E,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Se,
    tabIndex: E,
    tableValues: null,
    target: null,
    targetX: E,
    targetY: E,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Se,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: E,
    underlineThickness: E,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: E,
    values: null,
    vAlphabetic: E,
    vMathematical: E,
    vectorEffect: null,
    vHanging: E,
    vIdeographic: E,
    version: null,
    vertAdvY: E,
    vertOriginX: E,
    vertOriginY: E,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: E,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Gr
}), Qr = at({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
  }
}), Zr = at({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Kr
}), ei = at({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), xs = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, gs = /[A-Z]/g, ar = /-[a-z]/g, ys = /^data[-\w.:]+$/i;
function bs(e, t) {
  const n = kn(t);
  let r = t, s = ve;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && ys.test(t)) {
    if (t.charAt(4) === "-") {
      const i = t.slice(5).replace(ar, vs);
      r = "data" + i.charAt(0).toUpperCase() + i.slice(1);
    } else {
      const i = t.slice(4);
      if (!ar.test(i)) {
        let a = i.replace(gs, js);
        a.charAt(0) !== "-" && (a = "-" + a), t = "data" + a;
      }
    }
    s = An;
  }
  return new s(r, t);
}
function js(e) {
  return "-" + e.toLowerCase();
}
function vs(e) {
  return e.charAt(1).toUpperCase();
}
const ks = Yr([Xr, hs, Qr, Zr, ei], "html"), Rn = Yr([Xr, ms, Qr, Zr, ei], "svg");
function ws(e) {
  return e.join(" ").trim();
}
var Ze = {}, an, or;
function Ns() {
  if (or) return an;
  or = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, t = /\n/g, n = /^\s*/, r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, s = /^:\s*/, i = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, a = /^[;\s]*/, o = /^\s+|\s+$/g, p = `
`, u = "/", c = "*", f = "", h = "comment", d = "declaration";
  an = function(v, P) {
    if (typeof v != "string")
      throw new TypeError("First argument must be a string");
    if (!v) return [];
    P = P || {};
    var j = 1, S = 1;
    function w(R) {
      var _ = R.match(t);
      _ && (j += _.length);
      var N = R.lastIndexOf(p);
      S = ~N ? R.length - N : S + R.length;
    }
    function F() {
      var R = { line: j, column: S };
      return function(_) {
        return _.position = new M(R), D(), _;
      };
    }
    function M(R) {
      this.start = R, this.end = { line: j, column: S }, this.source = P.source;
    }
    M.prototype.content = v;
    function b(R) {
      var _ = new Error(
        P.source + ":" + j + ":" + S + ": " + R
      );
      if (_.reason = R, _.filename = P.source, _.line = j, _.column = S, _.source = v, !P.silent) throw _;
    }
    function $(R) {
      var _ = R.exec(v);
      if (_) {
        var N = _[0];
        return w(N), v = v.slice(N.length), _;
      }
    }
    function D() {
      $(n);
    }
    function I(R) {
      var _;
      for (R = R || []; _ = z(); )
        _ !== !1 && R.push(_);
      return R;
    }
    function z() {
      var R = F();
      if (!(u != v.charAt(0) || c != v.charAt(1))) {
        for (var _ = 2; f != v.charAt(_) && (c != v.charAt(_) || u != v.charAt(_ + 1)); )
          ++_;
        if (_ += 2, f === v.charAt(_ - 1))
          return b("End of comment missing");
        var N = v.slice(2, _ - 2);
        return S += 2, w(N), v = v.slice(_), S += 2, R({
          type: h,
          comment: N
        });
      }
    }
    function T() {
      var R = F(), _ = $(r);
      if (_) {
        if (z(), !$(s)) return b("property missing ':'");
        var N = $(i), B = R({
          type: d,
          property: y(_[0].replace(e, f)),
          value: N ? y(N[0].replace(e, f)) : f
        });
        return $(a), B;
      }
    }
    function A() {
      var R = [];
      I(R);
      for (var _; _ = T(); )
        _ !== !1 && (R.push(_), I(R));
      return R;
    }
    return D(), A();
  };
  function y(v) {
    return v ? v.replace(o, f) : f;
  }
  return an;
}
var ur;
function Ss() {
  if (ur) return Ze;
  ur = 1;
  var e = Ze && Ze.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(Ze, "__esModule", { value: !0 }), Ze.default = n;
  var t = e(Ns());
  function n(r, s) {
    var i = null;
    if (!r || typeof r != "string")
      return i;
    var a = (0, t.default)(r), o = typeof s == "function";
    return a.forEach(function(p) {
      if (p.type === "declaration") {
        var u = p.property, c = p.value;
        o ? s(u, c, p) : c && (i = i || {}, i[u] = c);
      }
    }), i;
  }
  return Ze;
}
var ft = {}, cr;
function Cs() {
  if (cr) return ft;
  cr = 1, Object.defineProperty(ft, "__esModule", { value: !0 }), ft.camelCase = void 0;
  var e = /^--[a-zA-Z0-9_-]+$/, t = /-([a-z])/g, n = /^[^-]+$/, r = /^-(webkit|moz|ms|o|khtml)-/, s = /^-(ms)-/, i = function(u) {
    return !u || n.test(u) || e.test(u);
  }, a = function(u, c) {
    return c.toUpperCase();
  }, o = function(u, c) {
    return "".concat(c, "-");
  }, p = function(u, c) {
    return c === void 0 && (c = {}), i(u) ? u : (u = u.toLowerCase(), c.reactCompat ? u = u.replace(s, o) : u = u.replace(r, o), u.replace(t, a));
  };
  return ft.camelCase = p, ft;
}
var ht, dr;
function Es() {
  if (dr) return ht;
  dr = 1;
  var e = ht && ht.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  }, t = e(Ss()), n = Cs();
  function r(s, i) {
    var a = {};
    return !s || typeof s != "string" || (0, t.default)(s, function(o, p) {
      o && p && (a[(0, n.camelCase)(o, i)] = p);
    }), a;
  }
  return r.default = r, ht = r, ht;
}
var Ts = Es();
const Is = /* @__PURE__ */ Vr(Ts), ti = ni("end"), _n = ni("start");
function ni(e) {
  return t;
  function t(n) {
    const r = n && n.position && n.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function Ps(e) {
  const t = _n(e), n = ti(e);
  if (t && n)
    return { start: t, end: n };
}
function gt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? pr(e.position) : "start" in e || "end" in e ? pr(e) : "line" in e || "column" in e ? Nn(e) : "";
}
function Nn(e) {
  return fr(e && e.line) + ":" + fr(e && e.column);
}
function pr(e) {
  return Nn(e && e.start) + "-" + Nn(e && e.end);
}
function fr(e) {
  return e && typeof e == "number" ? e : 1;
}
class pe extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(t, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let s = "", i = {}, a = !1;
    if (n && ("line" in n && "column" in n ? i = { place: n } : "start" in n && "end" in n ? i = { place: n } : "type" in n ? i = {
      ancestors: [n],
      place: n.position
    } : i = { ...n }), typeof t == "string" ? s = t : !i.cause && t && (a = !0, s = t.message, i.cause = t), !i.ruleId && !i.source && typeof r == "string") {
      const p = r.indexOf(":");
      p === -1 ? i.ruleId = r : (i.source = r.slice(0, p), i.ruleId = r.slice(p + 1));
    }
    if (!i.place && i.ancestors && i.ancestors) {
      const p = i.ancestors[i.ancestors.length - 1];
      p && (i.place = p.position);
    }
    const o = i.place && "start" in i.place ? i.place.start : i.place;
    this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file, this.message = s, this.line = o ? o.line : void 0, this.name = gt(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual, this.expected, this.note, this.url;
  }
}
pe.prototype.file = "";
pe.prototype.name = "";
pe.prototype.reason = "";
pe.prototype.message = "";
pe.prototype.stack = "";
pe.prototype.column = void 0;
pe.prototype.line = void 0;
pe.prototype.ancestors = void 0;
pe.prototype.cause = void 0;
pe.prototype.fatal = void 0;
pe.prototype.place = void 0;
pe.prototype.ruleId = void 0;
pe.prototype.source = void 0;
const Dn = {}.hasOwnProperty, Os = /* @__PURE__ */ new Map(), As = /[A-Z]/g, Rs = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), _s = /* @__PURE__ */ new Set(["td", "th"]), ri = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Ds(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Us(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = qs(n, t.jsx, t.jsxs);
  }
  const s = {
    Fragment: t.Fragment,
    ancestors: [],
    components: t.components || {},
    create: r,
    elementAttributeNameCase: t.elementAttributeNameCase || "react",
    evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
    filePath: n,
    ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
    passKeys: t.passKeys !== !1,
    passNode: t.passNode || !1,
    schema: t.space === "svg" ? Rn : ks,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, i = ii(s, e, void 0);
  return i && typeof i != "string" ? i : s.create(
    e,
    s.Fragment,
    { children: i || void 0 },
    void 0
  );
}
function ii(e, t, n) {
  if (t.type === "element")
    return Ls(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Fs(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return $s(e, t, n);
  if (t.type === "mdxjsEsm")
    return zs(e, t);
  if (t.type === "root")
    return Ms(e, t, n);
  if (t.type === "text")
    return Bs(e, t);
}
function Ls(e, t, n) {
  const r = e.schema;
  let s = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (s = Rn, e.schema = s), e.ancestors.push(t);
  const i = li(e, t.tagName, !1), a = Hs(e, t);
  let o = Fn(e, t);
  return Rs.has(t.tagName) && (o = o.filter(function(p) {
    return typeof p == "string" ? !ps(p) : !0;
  })), si(e, a, i, t), Ln(a, o), e.ancestors.pop(), e.schema = r, e.create(t, i, a, n);
}
function Fs(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  kt(e, t.position);
}
function zs(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  kt(e, t.position);
}
function $s(e, t, n) {
  const r = e.schema;
  let s = r;
  t.name === "svg" && r.space === "html" && (s = Rn, e.schema = s), e.ancestors.push(t);
  const i = t.name === null ? e.Fragment : li(e, t.name, !0), a = Vs(e, t), o = Fn(e, t);
  return si(e, a, i, t), Ln(a, o), e.ancestors.pop(), e.schema = r, e.create(t, i, a, n);
}
function Ms(e, t, n) {
  const r = {};
  return Ln(r, Fn(e, t)), e.create(t, e.Fragment, r, n);
}
function Bs(e, t) {
  return t.value;
}
function si(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Ln(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function qs(e, t, n) {
  return r;
  function r(s, i, a, o) {
    const u = Array.isArray(a.children) ? n : t;
    return o ? u(i, a, o) : u(i, a);
  }
}
function Us(e, t) {
  return n;
  function n(r, s, i, a) {
    const o = Array.isArray(i.children), p = _n(r);
    return t(
      s,
      i,
      a,
      o,
      {
        columnNumber: p ? p.column - 1 : void 0,
        fileName: e,
        lineNumber: p ? p.line : void 0
      },
      void 0
    );
  }
}
function Hs(e, t) {
  const n = {};
  let r, s;
  for (s in t.properties)
    if (s !== "children" && Dn.call(t.properties, s)) {
      const i = Ws(e, s, t.properties[s]);
      if (i) {
        const [a, o] = i;
        e.tableCellAlignToStyle && a === "align" && typeof o == "string" && _s.has(t.tagName) ? r = o : n[a] = o;
      }
    }
  if (r) {
    const i = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    i[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function Vs(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const i = r.data.estree.body[0];
        i.type;
        const a = i.expression;
        a.type;
        const o = a.properties[0];
        o.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(o.argument)
        );
      } else
        kt(e, t.position);
    else {
      const s = r.name;
      let i;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const o = r.value.data.estree.body[0];
          o.type, i = e.evaluater.evaluateExpression(o.expression);
        } else
          kt(e, t.position);
      else
        i = r.value === null ? !0 : r.value;
      n[s] = /** @type {Props[keyof Props]} */
      i;
    }
  return n;
}
function Fn(e, t) {
  const n = [];
  let r = -1;
  const s = e.passKeys ? /* @__PURE__ */ new Map() : Os;
  for (; ++r < t.children.length; ) {
    const i = t.children[r];
    let a;
    if (e.passKeys) {
      const p = i.type === "element" ? i.tagName : i.type === "mdxJsxFlowElement" || i.type === "mdxJsxTextElement" ? i.name : void 0;
      if (p) {
        const u = s.get(p) || 0;
        a = p + "-" + u, s.set(p, u + 1);
      }
    }
    const o = ii(e, i, a);
    o !== void 0 && n.push(o);
  }
  return n;
}
function Ws(e, t, n) {
  const r = bs(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? as(n) : ws(n)), r.property === "style") {
      let s = typeof n == "object" ? n : Ys(e, String(n));
      return e.stylePropertyNameCase === "css" && (s = Js(s)), ["style", s];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? xs[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Ys(e, t) {
  try {
    return Is(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), s = new pe("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw s.file = e.filePath || void 0, s.url = ri + "#cannot-parse-style-attribute", s;
  }
}
function li(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const s = t.split(".");
    let i = -1, a;
    for (; ++i < s.length; ) {
      const o = ir(s[i]) ? { type: "Identifier", name: s[i] } : { type: "Literal", value: s[i] };
      a = a ? {
        type: "MemberExpression",
        object: a,
        property: o,
        computed: !!(i && o.type === "Literal"),
        optional: !1
      } : o;
    }
    r = a;
  } else
    r = ir(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const s = (
      /** @type {string | number} */
      r.value
    );
    return Dn.call(e.components, s) ? e.components[s] : s;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  kt(e);
}
function kt(e, t) {
  const n = new pe(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = ri + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Js(e) {
  const t = {};
  let n;
  for (n in e)
    Dn.call(e, n) && (t[Xs(n)] = e[n]);
  return t;
}
function Xs(e) {
  let t = e.replace(As, Gs);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Gs(e) {
  return "-" + e.toLowerCase();
}
const on = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, Ks = {};
function Qs(e, t) {
  const n = Ks, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, s = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return ai(e, r, s);
}
function ai(e, t, n) {
  if (Zs(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return hr(e.children, t, n);
  }
  return Array.isArray(e) ? hr(e, t, n) : "";
}
function hr(e, t, n) {
  const r = [];
  let s = -1;
  for (; ++s < e.length; )
    r[s] = ai(e[s], t, n);
  return r.join("");
}
function Zs(e) {
  return !!(e && typeof e == "object");
}
const mr = document.createElement("i");
function zn(e) {
  const t = "&" + e + ";";
  mr.innerHTML = t;
  const n = mr.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n
  );
}
function Fe(e, t, n, r) {
  const s = e.length;
  let i = 0, a;
  if (t < 0 ? t = -t > s ? 0 : s + t : t = t > s ? s : t, n = n > 0 ? n : 0, r.length < 1e4)
    a = Array.from(r), a.unshift(t, n), e.splice(...a);
  else
    for (n && e.splice(t, n); i < r.length; )
      a = r.slice(i, i + 1e4), a.unshift(t, 0), e.splice(...a), i += 1e4, t += 1e4;
}
function Ie(e, t) {
  return e.length > 0 ? (Fe(e, e.length, 0, t), e) : t;
}
const xr = {}.hasOwnProperty;
function el(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    tl(t, e[n]);
  return t;
}
function tl(e, t) {
  let n;
  for (n in t) {
    const s = (xr.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n];
    let a;
    if (i)
      for (a in i) {
        xr.call(s, a) || (s[a] = []);
        const o = i[a];
        nl(
          // @ts-expect-error Looks like a list.
          s[a],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function nl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  Fe(e, 0, 0, r);
}
function oi(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
function st(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Le = Ue(/[A-Za-z]/), Ce = Ue(/[\dA-Za-z]/), rl = Ue(/[#-'*+\--9=?A-Z^-~]/);
function Sn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Cn = Ue(/\d/), il = Ue(/[\dA-Fa-f]/), sl = Ue(/[!-/:-@[-`{-~]/);
function q(e) {
  return e !== null && e < -2;
}
function je(e) {
  return e !== null && (e < 0 || e === 32);
}
function K(e) {
  return e === -2 || e === -1 || e === 32;
}
const ll = Ue(new RegExp("\\p{P}|\\p{S}", "u")), al = Ue(/\s/);
function Ue(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function ot(e) {
  const t = [];
  let n = -1, r = 0, s = 0;
  for (; ++n < e.length; ) {
    const i = e.charCodeAt(n);
    let a = "";
    if (i === 37 && Ce(e.charCodeAt(n + 1)) && Ce(e.charCodeAt(n + 2)))
      s = 2;
    else if (i < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i)) || (a = String.fromCharCode(i));
    else if (i > 55295 && i < 57344) {
      const o = e.charCodeAt(n + 1);
      i < 56320 && o > 56319 && o < 57344 ? (a = String.fromCharCode(i, o), s = 1) : a = "�";
    } else
      a = String.fromCharCode(i);
    a && (t.push(e.slice(r, n), encodeURIComponent(a)), r = n + s + 1, a = ""), s && (n += s, s = 0);
  }
  return t.join("") + e.slice(r);
}
function ie(e, t, n, r) {
  const s = r ? r - 1 : Number.POSITIVE_INFINITY;
  let i = 0;
  return a;
  function a(p) {
    return K(p) ? (e.enter(n), o(p)) : t(p);
  }
  function o(p) {
    return K(p) && i++ < s ? (e.consume(p), o) : (e.exit(n), t(p));
  }
}
const ol = {
  tokenize: ul
};
function ul(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, s);
  let n;
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), ie(e, t, "linePrefix");
  }
  function s(o) {
    return e.enter("paragraph"), i(o);
  }
  function i(o) {
    const p = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = p), n = p, a(o);
  }
  function a(o) {
    if (o === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
      return;
    }
    return q(o) ? (e.consume(o), e.exit("chunkText"), i) : (e.consume(o), a);
  }
}
const cl = {
  tokenize: dl
}, gr = {
  tokenize: pl
};
function dl(e) {
  const t = this, n = [];
  let r = 0, s, i, a;
  return o;
  function o(w) {
    if (r < n.length) {
      const F = n[r];
      return t.containerState = F[1], e.attempt(F[0].continuation, p, u)(w);
    }
    return u(w);
  }
  function p(w) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, s && S();
      const F = t.events.length;
      let M = F, b;
      for (; M--; )
        if (t.events[M][0] === "exit" && t.events[M][1].type === "chunkFlow") {
          b = t.events[M][1].end;
          break;
        }
      j(r);
      let $ = F;
      for (; $ < t.events.length; )
        t.events[$][1].end = {
          ...b
        }, $++;
      return Fe(t.events, M + 1, 0, t.events.slice(F)), t.events.length = $, u(w);
    }
    return o(w);
  }
  function u(w) {
    if (r === n.length) {
      if (!s)
        return h(w);
      if (s.currentConstruct && s.currentConstruct.concrete)
        return y(w);
      t.interrupt = !!(s.currentConstruct && !s._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(gr, c, f)(w);
  }
  function c(w) {
    return s && S(), j(r), h(w);
  }
  function f(w) {
    return t.parser.lazy[t.now().line] = r !== n.length, a = t.now().offset, y(w);
  }
  function h(w) {
    return t.containerState = {}, e.attempt(gr, d, y)(w);
  }
  function d(w) {
    return r++, n.push([t.currentConstruct, t.containerState]), h(w);
  }
  function y(w) {
    if (w === null) {
      s && S(), j(0), e.consume(w);
      return;
    }
    return s = s || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: s,
      contentType: "flow",
      previous: i
    }), v(w);
  }
  function v(w) {
    if (w === null) {
      P(e.exit("chunkFlow"), !0), j(0), e.consume(w);
      return;
    }
    return q(w) ? (e.consume(w), P(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, o) : (e.consume(w), v);
  }
  function P(w, F) {
    const M = t.sliceStream(w);
    if (F && M.push(null), w.previous = i, i && (i.next = w), i = w, s.defineSkip(w.start), s.write(M), t.parser.lazy[w.start.line]) {
      let b = s.events.length;
      for (; b--; )
        if (
          // The token starts before the line ending…
          s.events[b][1].start.offset < a && // …and either is not ended yet…
          (!s.events[b][1].end || // …or ends after it.
          s.events[b][1].end.offset > a)
        )
          return;
      const $ = t.events.length;
      let D = $, I, z;
      for (; D--; )
        if (t.events[D][0] === "exit" && t.events[D][1].type === "chunkFlow") {
          if (I) {
            z = t.events[D][1].end;
            break;
          }
          I = !0;
        }
      for (j(r), b = $; b < t.events.length; )
        t.events[b][1].end = {
          ...z
        }, b++;
      Fe(t.events, D + 1, 0, t.events.slice($)), t.events.length = b;
    }
  }
  function j(w) {
    let F = n.length;
    for (; F-- > w; ) {
      const M = n[F];
      t.containerState = M[1], M[0].exit.call(t, e);
    }
    n.length = w;
  }
  function S() {
    s.write([null]), i = void 0, s = void 0, t.containerState._closeFlow = void 0;
  }
}
function pl(e, t, n) {
  return ie(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function yr(e) {
  if (e === null || je(e) || al(e))
    return 1;
  if (ll(e))
    return 2;
}
function $n(e, t, n) {
  const r = [];
  let s = -1;
  for (; ++s < e.length; ) {
    const i = e[s].resolveAll;
    i && !r.includes(i) && (t = i(t, n), r.push(i));
  }
  return t;
}
const En = {
  name: "attention",
  resolveAll: fl,
  tokenize: hl
};
function fl(e, t) {
  let n = -1, r, s, i, a, o, p, u, c;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          p = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const f = {
            ...e[r][1].end
          }, h = {
            ...e[n][1].start
          };
          br(f, -p), br(h, p), a = {
            type: p > 1 ? "strongSequence" : "emphasisSequence",
            start: f,
            end: {
              ...e[r][1].end
            }
          }, o = {
            type: p > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: h
          }, i = {
            type: p > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[n][1].start
            }
          }, s = {
            type: p > 1 ? "strong" : "emphasis",
            start: {
              ...a.start
            },
            end: {
              ...o.end
            }
          }, e[r][1].end = {
            ...a.start
          }, e[n][1].start = {
            ...o.end
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = Ie(u, [["enter", e[r][1], t], ["exit", e[r][1], t]])), u = Ie(u, [["enter", s, t], ["enter", a, t], ["exit", a, t], ["enter", i, t]]), u = Ie(u, $n(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), u = Ie(u, [["exit", i, t], ["enter", o, t], ["exit", o, t], ["exit", s, t]]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = Ie(u, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : c = 0, Fe(e, r - 1, n - r + 3, u), n = r + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function hl(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, s = yr(r);
  let i;
  return a;
  function a(p) {
    return i = p, e.enter("attentionSequence"), o(p);
  }
  function o(p) {
    if (p === i)
      return e.consume(p), o;
    const u = e.exit("attentionSequence"), c = yr(p), f = !c || c === 2 && s || n.includes(p), h = !s || s === 2 && c || n.includes(r);
    return u._open = !!(i === 42 ? f : f && (s || !h)), u._close = !!(i === 42 ? h : h && (c || !f)), t(p);
  }
}
function br(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const ml = {
  name: "autolink",
  tokenize: xl
};
function xl(e, t, n) {
  let r = 0;
  return s;
  function s(d) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), i;
  }
  function i(d) {
    return Le(d) ? (e.consume(d), a) : d === 64 ? n(d) : u(d);
  }
  function a(d) {
    return d === 43 || d === 45 || d === 46 || Ce(d) ? (r = 1, o(d)) : u(d);
  }
  function o(d) {
    return d === 58 ? (e.consume(d), r = 0, p) : (d === 43 || d === 45 || d === 46 || Ce(d)) && r++ < 32 ? (e.consume(d), o) : (r = 0, u(d));
  }
  function p(d) {
    return d === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : d === null || d === 32 || d === 60 || Sn(d) ? n(d) : (e.consume(d), p);
  }
  function u(d) {
    return d === 64 ? (e.consume(d), c) : rl(d) ? (e.consume(d), u) : n(d);
  }
  function c(d) {
    return Ce(d) ? f(d) : n(d);
  }
  function f(d) {
    return d === 46 ? (e.consume(d), r = 0, c) : d === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(d), e.exit("autolinkMarker"), e.exit("autolink"), t) : h(d);
  }
  function h(d) {
    if ((d === 45 || Ce(d)) && r++ < 63) {
      const y = d === 45 ? h : f;
      return e.consume(d), y;
    }
    return n(d);
  }
}
const qt = {
  partial: !0,
  tokenize: gl
};
function gl(e, t, n) {
  return r;
  function r(i) {
    return K(i) ? ie(e, s, "linePrefix")(i) : s(i);
  }
  function s(i) {
    return i === null || q(i) ? t(i) : n(i);
  }
}
const ui = {
  continuation: {
    tokenize: bl
  },
  exit: jl,
  name: "blockQuote",
  tokenize: yl
};
function yl(e, t, n) {
  const r = this;
  return s;
  function s(a) {
    if (a === 62) {
      const o = r.containerState;
      return o.open || (e.enter("blockQuote", {
        _container: !0
      }), o.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(a), e.exit("blockQuoteMarker"), i;
    }
    return n(a);
  }
  function i(a) {
    return K(a) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(a), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(a));
  }
}
function bl(e, t, n) {
  const r = this;
  return s;
  function s(a) {
    return K(a) ? ie(e, i, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a) : i(a);
  }
  function i(a) {
    return e.attempt(ui, t, n)(a);
  }
}
function jl(e) {
  e.exit("blockQuote");
}
const ci = {
  name: "characterEscape",
  tokenize: vl
};
function vl(e, t, n) {
  return r;
  function r(i) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(i), e.exit("escapeMarker"), s;
  }
  function s(i) {
    return sl(i) ? (e.enter("characterEscapeValue"), e.consume(i), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(i);
  }
}
const di = {
  name: "characterReference",
  tokenize: kl
};
function kl(e, t, n) {
  const r = this;
  let s = 0, i, a;
  return o;
  function o(f) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), p;
  }
  function p(f) {
    return f === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(f), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), i = 31, a = Ce, c(f));
  }
  function u(f) {
    return f === 88 || f === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(f), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), i = 6, a = il, c) : (e.enter("characterReferenceValue"), i = 7, a = Cn, c(f));
  }
  function c(f) {
    if (f === 59 && s) {
      const h = e.exit("characterReferenceValue");
      return a === Ce && !zn(r.sliceSerialize(h)) ? n(f) : (e.enter("characterReferenceMarker"), e.consume(f), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return a(f) && s++ < i ? (e.consume(f), c) : n(f);
  }
}
const jr = {
  partial: !0,
  tokenize: Nl
}, vr = {
  concrete: !0,
  name: "codeFenced",
  tokenize: wl
};
function wl(e, t, n) {
  const r = this, s = {
    partial: !0,
    tokenize: M
  };
  let i = 0, a = 0, o;
  return p;
  function p(b) {
    return u(b);
  }
  function u(b) {
    const $ = r.events[r.events.length - 1];
    return i = $ && $[1].type === "linePrefix" ? $[2].sliceSerialize($[1], !0).length : 0, o = b, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(b);
  }
  function c(b) {
    return b === o ? (a++, e.consume(b), c) : a < 3 ? n(b) : (e.exit("codeFencedFenceSequence"), K(b) ? ie(e, f, "whitespace")(b) : f(b));
  }
  function f(b) {
    return b === null || q(b) ? (e.exit("codeFencedFence"), r.interrupt ? t(b) : e.check(jr, v, F)(b)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), h(b));
  }
  function h(b) {
    return b === null || q(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), f(b)) : K(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), ie(e, d, "whitespace")(b)) : b === 96 && b === o ? n(b) : (e.consume(b), h);
  }
  function d(b) {
    return b === null || q(b) ? f(b) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), y(b));
  }
  function y(b) {
    return b === null || q(b) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), f(b)) : b === 96 && b === o ? n(b) : (e.consume(b), y);
  }
  function v(b) {
    return e.attempt(s, F, P)(b);
  }
  function P(b) {
    return e.enter("lineEnding"), e.consume(b), e.exit("lineEnding"), j;
  }
  function j(b) {
    return i > 0 && K(b) ? ie(e, S, "linePrefix", i + 1)(b) : S(b);
  }
  function S(b) {
    return b === null || q(b) ? e.check(jr, v, F)(b) : (e.enter("codeFlowValue"), w(b));
  }
  function w(b) {
    return b === null || q(b) ? (e.exit("codeFlowValue"), S(b)) : (e.consume(b), w);
  }
  function F(b) {
    return e.exit("codeFenced"), t(b);
  }
  function M(b, $, D) {
    let I = 0;
    return z;
    function z(N) {
      return b.enter("lineEnding"), b.consume(N), b.exit("lineEnding"), T;
    }
    function T(N) {
      return b.enter("codeFencedFence"), K(N) ? ie(b, A, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(N) : A(N);
    }
    function A(N) {
      return N === o ? (b.enter("codeFencedFenceSequence"), R(N)) : D(N);
    }
    function R(N) {
      return N === o ? (I++, b.consume(N), R) : I >= a ? (b.exit("codeFencedFenceSequence"), K(N) ? ie(b, _, "whitespace")(N) : _(N)) : D(N);
    }
    function _(N) {
      return N === null || q(N) ? (b.exit("codeFencedFence"), $(N)) : D(N);
    }
  }
}
function Nl(e, t, n) {
  const r = this;
  return s;
  function s(a) {
    return a === null ? n(a) : (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), i);
  }
  function i(a) {
    return r.parser.lazy[r.now().line] ? n(a) : t(a);
  }
}
const un = {
  name: "codeIndented",
  tokenize: Cl
}, Sl = {
  partial: !0,
  tokenize: El
};
function Cl(e, t, n) {
  const r = this;
  return s;
  function s(u) {
    return e.enter("codeIndented"), ie(e, i, "linePrefix", 5)(u);
  }
  function i(u) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? a(u) : n(u);
  }
  function a(u) {
    return u === null ? p(u) : q(u) ? e.attempt(Sl, a, p)(u) : (e.enter("codeFlowValue"), o(u));
  }
  function o(u) {
    return u === null || q(u) ? (e.exit("codeFlowValue"), a(u)) : (e.consume(u), o);
  }
  function p(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function El(e, t, n) {
  const r = this;
  return s;
  function s(a) {
    return r.parser.lazy[r.now().line] ? n(a) : q(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), s) : ie(e, i, "linePrefix", 5)(a);
  }
  function i(a) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(a) : q(a) ? s(a) : n(a);
  }
}
const Tl = {
  name: "codeText",
  previous: Pl,
  resolve: Il,
  tokenize: Ol
};
function Il(e) {
  let t = e.length - 4, n = 3, r, s;
  if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === "codeTextData") {
        e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    s === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (s = r) : (r === t || e[r][1].type === "lineEnding") && (e[s][1].type = "codeTextData", r !== s + 2 && (e[s][1].end = e[r - 1][1].end, e.splice(s + 2, r - s - 2), t -= r - s - 2, r = s + 2), s = void 0);
  return e;
}
function Pl(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Ol(e, t, n) {
  let r = 0, s, i;
  return a;
  function a(f) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(f);
  }
  function o(f) {
    return f === 96 ? (e.consume(f), r++, o) : (e.exit("codeTextSequence"), p(f));
  }
  function p(f) {
    return f === null ? n(f) : f === 32 ? (e.enter("space"), e.consume(f), e.exit("space"), p) : f === 96 ? (i = e.enter("codeTextSequence"), s = 0, c(f)) : q(f) ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), p) : (e.enter("codeTextData"), u(f));
  }
  function u(f) {
    return f === null || f === 32 || f === 96 || q(f) ? (e.exit("codeTextData"), p(f)) : (e.consume(f), u);
  }
  function c(f) {
    return f === 96 ? (e.consume(f), s++, c) : s === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(f)) : (i.type = "codeTextData", u(f));
  }
}
class Al {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(t, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(t, n, r) {
    const s = n || 0;
    this.setCursor(Math.trunc(t));
    const i = this.right.splice(this.right.length - s, Number.POSITIVE_INFINITY);
    return r && mt(this.left, r), i.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), mt(this.left, t);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(t) {
    this.setCursor(0), this.right.push(t);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(t) {
    this.setCursor(0), mt(this.right, t.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0))
      if (t < this.left.length) {
        const n = this.left.splice(t, Number.POSITIVE_INFINITY);
        mt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        mt(this.left, n.reverse());
      }
  }
}
function mt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function pi(e) {
  const t = {};
  let n = -1, r, s, i, a, o, p, u;
  const c = new Al(e);
  for (; ++n < c.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = c.get(n), n && r[1].type === "chunkFlow" && c.get(n - 1)[1].type === "listItemPrefix" && (p = r[1]._tokenizer.events, i = 0, i < p.length && p[i][1].type === "lineEndingBlank" && (i += 2), i < p.length && p[i][1].type === "content"))
      for (; ++i < p.length && p[i][1].type !== "content"; )
        p[i][1].type === "chunkText" && (p[i][1]._isInFirstContentOfListItem = !0, i++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Rl(c, n)), n = t[n], u = !0);
    else if (r[1]._container) {
      for (i = n, s = void 0; i--; )
        if (a = c.get(i), a[1].type === "lineEnding" || a[1].type === "lineEndingBlank")
          a[0] === "enter" && (s && (c.get(s)[1].type = "lineEndingBlank"), a[1].type = "lineEnding", s = i);
        else if (!(a[1].type === "linePrefix" || a[1].type === "listItemIndent")) break;
      s && (r[1].end = {
        ...c.get(s)[1].start
      }, o = c.slice(s, n), o.unshift(r), c.splice(s, n - s + 1, o));
    }
  }
  return Fe(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function Rl(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let s = t - 1;
  const i = [];
  let a = n._tokenizer;
  a || (a = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (a._contentTypeTextTrailing = !0));
  const o = a.events, p = [], u = {};
  let c, f, h = -1, d = n, y = 0, v = 0;
  const P = [v];
  for (; d; ) {
    for (; e.get(++s)[1] !== d; )
      ;
    i.push(s), d._tokenizer || (c = r.sliceStream(d), d.next || c.push(null), f && a.defineSkip(d.start), d._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = !0), a.write(c), d._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = void 0)), f = d, d = d.next;
  }
  for (d = n; ++h < o.length; )
    // Find a void token that includes a break.
    o[h][0] === "exit" && o[h - 1][0] === "enter" && o[h][1].type === o[h - 1][1].type && o[h][1].start.line !== o[h][1].end.line && (v = h + 1, P.push(v), d._tokenizer = void 0, d.previous = void 0, d = d.next);
  for (a.events = [], d ? (d._tokenizer = void 0, d.previous = void 0) : P.pop(), h = P.length; h--; ) {
    const j = o.slice(P[h], P[h + 1]), S = i.pop();
    p.push([S, S + j.length - 1]), e.splice(S, 2, j);
  }
  for (p.reverse(), h = -1; ++h < p.length; )
    u[y + p[h][0]] = y + p[h][1], y += p[h][1] - p[h][0] - 1;
  return u;
}
const _l = {
  resolve: Ll,
  tokenize: Fl
}, Dl = {
  partial: !0,
  tokenize: zl
};
function Ll(e) {
  return pi(e), e;
}
function Fl(e, t) {
  let n;
  return r;
  function r(o) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), s(o);
  }
  function s(o) {
    return o === null ? i(o) : q(o) ? e.check(Dl, a, i)(o) : (e.consume(o), s);
  }
  function i(o) {
    return e.exit("chunkContent"), e.exit("content"), t(o);
  }
  function a(o) {
    return e.consume(o), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, s;
  }
}
function zl(e, t, n) {
  const r = this;
  return s;
  function s(a) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), ie(e, i, "linePrefix");
  }
  function i(a) {
    if (a === null || q(a))
      return n(a);
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(a) : e.interrupt(r.parser.constructs.flow, n, t)(a);
  }
}
function fi(e, t, n, r, s, i, a, o, p) {
  const u = p || Number.POSITIVE_INFINITY;
  let c = 0;
  return f;
  function f(j) {
    return j === 60 ? (e.enter(r), e.enter(s), e.enter(i), e.consume(j), e.exit(i), h) : j === null || j === 32 || j === 41 || Sn(j) ? n(j) : (e.enter(r), e.enter(a), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), v(j));
  }
  function h(j) {
    return j === 62 ? (e.enter(i), e.consume(j), e.exit(i), e.exit(s), e.exit(r), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), d(j));
  }
  function d(j) {
    return j === 62 ? (e.exit("chunkString"), e.exit(o), h(j)) : j === null || j === 60 || q(j) ? n(j) : (e.consume(j), j === 92 ? y : d);
  }
  function y(j) {
    return j === 60 || j === 62 || j === 92 ? (e.consume(j), d) : d(j);
  }
  function v(j) {
    return !c && (j === null || j === 41 || je(j)) ? (e.exit("chunkString"), e.exit(o), e.exit(a), e.exit(r), t(j)) : c < u && j === 40 ? (e.consume(j), c++, v) : j === 41 ? (e.consume(j), c--, v) : j === null || j === 32 || j === 40 || Sn(j) ? n(j) : (e.consume(j), j === 92 ? P : v);
  }
  function P(j) {
    return j === 40 || j === 41 || j === 92 ? (e.consume(j), v) : v(j);
  }
}
function hi(e, t, n, r, s, i) {
  const a = this;
  let o = 0, p;
  return u;
  function u(d) {
    return e.enter(r), e.enter(s), e.consume(d), e.exit(s), e.enter(i), c;
  }
  function c(d) {
    return o > 999 || d === null || d === 91 || d === 93 && !p || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    d === 94 && !o && "_hiddenFootnoteSupport" in a.parser.constructs ? n(d) : d === 93 ? (e.exit(i), e.enter(s), e.consume(d), e.exit(s), e.exit(r), t) : q(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), f(d));
  }
  function f(d) {
    return d === null || d === 91 || d === 93 || q(d) || o++ > 999 ? (e.exit("chunkString"), c(d)) : (e.consume(d), p || (p = !K(d)), d === 92 ? h : f);
  }
  function h(d) {
    return d === 91 || d === 92 || d === 93 ? (e.consume(d), o++, f) : f(d);
  }
}
function mi(e, t, n, r, s, i) {
  let a;
  return o;
  function o(h) {
    return h === 34 || h === 39 || h === 40 ? (e.enter(r), e.enter(s), e.consume(h), e.exit(s), a = h === 40 ? 41 : h, p) : n(h);
  }
  function p(h) {
    return h === a ? (e.enter(s), e.consume(h), e.exit(s), e.exit(r), t) : (e.enter(i), u(h));
  }
  function u(h) {
    return h === a ? (e.exit(i), p(a)) : h === null ? n(h) : q(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), ie(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(h));
  }
  function c(h) {
    return h === a || h === null || q(h) ? (e.exit("chunkString"), u(h)) : (e.consume(h), h === 92 ? f : c);
  }
  function f(h) {
    return h === a || h === 92 ? (e.consume(h), c) : c(h);
  }
}
function yt(e, t) {
  let n;
  return r;
  function r(s) {
    return q(s) ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), n = !0, r) : K(s) ? ie(e, r, n ? "linePrefix" : "lineSuffix")(s) : t(s);
  }
}
const $l = {
  name: "definition",
  tokenize: Bl
}, Ml = {
  partial: !0,
  tokenize: ql
};
function Bl(e, t, n) {
  const r = this;
  let s;
  return i;
  function i(d) {
    return e.enter("definition"), a(d);
  }
  function a(d) {
    return hi.call(
      r,
      e,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(d);
  }
  function o(d) {
    return s = st(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), d === 58 ? (e.enter("definitionMarker"), e.consume(d), e.exit("definitionMarker"), p) : n(d);
  }
  function p(d) {
    return je(d) ? yt(e, u)(d) : u(d);
  }
  function u(d) {
    return fi(
      e,
      c,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(d);
  }
  function c(d) {
    return e.attempt(Ml, f, f)(d);
  }
  function f(d) {
    return K(d) ? ie(e, h, "whitespace")(d) : h(d);
  }
  function h(d) {
    return d === null || q(d) ? (e.exit("definition"), r.parser.defined.push(s), t(d)) : n(d);
  }
}
function ql(e, t, n) {
  return r;
  function r(o) {
    return je(o) ? yt(e, s)(o) : n(o);
  }
  function s(o) {
    return mi(e, i, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function i(o) {
    return K(o) ? ie(e, a, "whitespace")(o) : a(o);
  }
  function a(o) {
    return o === null || q(o) ? t(o) : n(o);
  }
}
const Ul = {
  name: "hardBreakEscape",
  tokenize: Hl
};
function Hl(e, t, n) {
  return r;
  function r(i) {
    return e.enter("hardBreakEscape"), e.consume(i), s;
  }
  function s(i) {
    return q(i) ? (e.exit("hardBreakEscape"), t(i)) : n(i);
  }
}
const Vl = {
  name: "headingAtx",
  resolve: Wl,
  tokenize: Yl
};
function Wl(e, t) {
  let n = e.length - 2, r = 3, s, i;
  return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (s = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[n][1].end
  }, i = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, Fe(e, r, n - r + 1, [["enter", s, t], ["enter", i, t], ["exit", i, t], ["exit", s, t]])), e;
}
function Yl(e, t, n) {
  let r = 0;
  return s;
  function s(c) {
    return e.enter("atxHeading"), i(c);
  }
  function i(c) {
    return e.enter("atxHeadingSequence"), a(c);
  }
  function a(c) {
    return c === 35 && r++ < 6 ? (e.consume(c), a) : c === null || je(c) ? (e.exit("atxHeadingSequence"), o(c)) : n(c);
  }
  function o(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), p(c)) : c === null || q(c) ? (e.exit("atxHeading"), t(c)) : K(c) ? ie(e, o, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
  }
  function p(c) {
    return c === 35 ? (e.consume(c), p) : (e.exit("atxHeadingSequence"), o(c));
  }
  function u(c) {
    return c === null || c === 35 || je(c) ? (e.exit("atxHeadingText"), o(c)) : (e.consume(c), u);
  }
}
const Jl = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], kr = ["pre", "script", "style", "textarea"], Xl = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Ql,
  tokenize: Zl
}, Gl = {
  partial: !0,
  tokenize: ta
}, Kl = {
  partial: !0,
  tokenize: ea
};
function Ql(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Zl(e, t, n) {
  const r = this;
  let s, i, a, o, p;
  return u;
  function u(g) {
    return c(g);
  }
  function c(g) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(g), f;
  }
  function f(g) {
    return g === 33 ? (e.consume(g), h) : g === 47 ? (e.consume(g), i = !0, v) : g === 63 ? (e.consume(g), s = 3, r.interrupt ? t : x) : Le(g) ? (e.consume(g), a = String.fromCharCode(g), P) : n(g);
  }
  function h(g) {
    return g === 45 ? (e.consume(g), s = 2, d) : g === 91 ? (e.consume(g), s = 5, o = 0, y) : Le(g) ? (e.consume(g), s = 4, r.interrupt ? t : x) : n(g);
  }
  function d(g) {
    return g === 45 ? (e.consume(g), r.interrupt ? t : x) : n(g);
  }
  function y(g) {
    const de = "CDATA[";
    return g === de.charCodeAt(o++) ? (e.consume(g), o === de.length ? r.interrupt ? t : A : y) : n(g);
  }
  function v(g) {
    return Le(g) ? (e.consume(g), a = String.fromCharCode(g), P) : n(g);
  }
  function P(g) {
    if (g === null || g === 47 || g === 62 || je(g)) {
      const de = g === 47, ge = a.toLowerCase();
      return !de && !i && kr.includes(ge) ? (s = 1, r.interrupt ? t(g) : A(g)) : Jl.includes(a.toLowerCase()) ? (s = 6, de ? (e.consume(g), j) : r.interrupt ? t(g) : A(g)) : (s = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(g) : i ? S(g) : w(g));
    }
    return g === 45 || Ce(g) ? (e.consume(g), a += String.fromCharCode(g), P) : n(g);
  }
  function j(g) {
    return g === 62 ? (e.consume(g), r.interrupt ? t : A) : n(g);
  }
  function S(g) {
    return K(g) ? (e.consume(g), S) : z(g);
  }
  function w(g) {
    return g === 47 ? (e.consume(g), z) : g === 58 || g === 95 || Le(g) ? (e.consume(g), F) : K(g) ? (e.consume(g), w) : z(g);
  }
  function F(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || Ce(g) ? (e.consume(g), F) : M(g);
  }
  function M(g) {
    return g === 61 ? (e.consume(g), b) : K(g) ? (e.consume(g), M) : w(g);
  }
  function b(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), p = g, $) : K(g) ? (e.consume(g), b) : D(g);
  }
  function $(g) {
    return g === p ? (e.consume(g), p = null, I) : g === null || q(g) ? n(g) : (e.consume(g), $);
  }
  function D(g) {
    return g === null || g === 34 || g === 39 || g === 47 || g === 60 || g === 61 || g === 62 || g === 96 || je(g) ? M(g) : (e.consume(g), D);
  }
  function I(g) {
    return g === 47 || g === 62 || K(g) ? w(g) : n(g);
  }
  function z(g) {
    return g === 62 ? (e.consume(g), T) : n(g);
  }
  function T(g) {
    return g === null || q(g) ? A(g) : K(g) ? (e.consume(g), T) : n(g);
  }
  function A(g) {
    return g === 45 && s === 2 ? (e.consume(g), B) : g === 60 && s === 1 ? (e.consume(g), H) : g === 62 && s === 4 ? (e.consume(g), fe) : g === 63 && s === 3 ? (e.consume(g), x) : g === 93 && s === 5 ? (e.consume(g), ce) : q(g) && (s === 6 || s === 7) ? (e.exit("htmlFlowData"), e.check(Gl, xe, R)(g)) : g === null || q(g) ? (e.exit("htmlFlowData"), R(g)) : (e.consume(g), A);
  }
  function R(g) {
    return e.check(Kl, _, xe)(g);
  }
  function _(g) {
    return e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), N;
  }
  function N(g) {
    return g === null || q(g) ? R(g) : (e.enter("htmlFlowData"), A(g));
  }
  function B(g) {
    return g === 45 ? (e.consume(g), x) : A(g);
  }
  function H(g) {
    return g === 47 ? (e.consume(g), a = "", G) : A(g);
  }
  function G(g) {
    if (g === 62) {
      const de = a.toLowerCase();
      return kr.includes(de) ? (e.consume(g), fe) : A(g);
    }
    return Le(g) && a.length < 8 ? (e.consume(g), a += String.fromCharCode(g), G) : A(g);
  }
  function ce(g) {
    return g === 93 ? (e.consume(g), x) : A(g);
  }
  function x(g) {
    return g === 62 ? (e.consume(g), fe) : g === 45 && s === 2 ? (e.consume(g), x) : A(g);
  }
  function fe(g) {
    return g === null || q(g) ? (e.exit("htmlFlowData"), xe(g)) : (e.consume(g), fe);
  }
  function xe(g) {
    return e.exit("htmlFlow"), t(g);
  }
}
function ea(e, t, n) {
  const r = this;
  return s;
  function s(a) {
    return q(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), i) : n(a);
  }
  function i(a) {
    return r.parser.lazy[r.now().line] ? n(a) : t(a);
  }
}
function ta(e, t, n) {
  return r;
  function r(s) {
    return e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), e.attempt(qt, t, n);
  }
}
const na = {
  name: "htmlText",
  tokenize: ra
};
function ra(e, t, n) {
  const r = this;
  let s, i, a;
  return o;
  function o(x) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(x), p;
  }
  function p(x) {
    return x === 33 ? (e.consume(x), u) : x === 47 ? (e.consume(x), M) : x === 63 ? (e.consume(x), w) : Le(x) ? (e.consume(x), D) : n(x);
  }
  function u(x) {
    return x === 45 ? (e.consume(x), c) : x === 91 ? (e.consume(x), i = 0, y) : Le(x) ? (e.consume(x), S) : n(x);
  }
  function c(x) {
    return x === 45 ? (e.consume(x), d) : n(x);
  }
  function f(x) {
    return x === null ? n(x) : x === 45 ? (e.consume(x), h) : q(x) ? (a = f, H(x)) : (e.consume(x), f);
  }
  function h(x) {
    return x === 45 ? (e.consume(x), d) : f(x);
  }
  function d(x) {
    return x === 62 ? B(x) : x === 45 ? h(x) : f(x);
  }
  function y(x) {
    const fe = "CDATA[";
    return x === fe.charCodeAt(i++) ? (e.consume(x), i === fe.length ? v : y) : n(x);
  }
  function v(x) {
    return x === null ? n(x) : x === 93 ? (e.consume(x), P) : q(x) ? (a = v, H(x)) : (e.consume(x), v);
  }
  function P(x) {
    return x === 93 ? (e.consume(x), j) : v(x);
  }
  function j(x) {
    return x === 62 ? B(x) : x === 93 ? (e.consume(x), j) : v(x);
  }
  function S(x) {
    return x === null || x === 62 ? B(x) : q(x) ? (a = S, H(x)) : (e.consume(x), S);
  }
  function w(x) {
    return x === null ? n(x) : x === 63 ? (e.consume(x), F) : q(x) ? (a = w, H(x)) : (e.consume(x), w);
  }
  function F(x) {
    return x === 62 ? B(x) : w(x);
  }
  function M(x) {
    return Le(x) ? (e.consume(x), b) : n(x);
  }
  function b(x) {
    return x === 45 || Ce(x) ? (e.consume(x), b) : $(x);
  }
  function $(x) {
    return q(x) ? (a = $, H(x)) : K(x) ? (e.consume(x), $) : B(x);
  }
  function D(x) {
    return x === 45 || Ce(x) ? (e.consume(x), D) : x === 47 || x === 62 || je(x) ? I(x) : n(x);
  }
  function I(x) {
    return x === 47 ? (e.consume(x), B) : x === 58 || x === 95 || Le(x) ? (e.consume(x), z) : q(x) ? (a = I, H(x)) : K(x) ? (e.consume(x), I) : B(x);
  }
  function z(x) {
    return x === 45 || x === 46 || x === 58 || x === 95 || Ce(x) ? (e.consume(x), z) : T(x);
  }
  function T(x) {
    return x === 61 ? (e.consume(x), A) : q(x) ? (a = T, H(x)) : K(x) ? (e.consume(x), T) : I(x);
  }
  function A(x) {
    return x === null || x === 60 || x === 61 || x === 62 || x === 96 ? n(x) : x === 34 || x === 39 ? (e.consume(x), s = x, R) : q(x) ? (a = A, H(x)) : K(x) ? (e.consume(x), A) : (e.consume(x), _);
  }
  function R(x) {
    return x === s ? (e.consume(x), s = void 0, N) : x === null ? n(x) : q(x) ? (a = R, H(x)) : (e.consume(x), R);
  }
  function _(x) {
    return x === null || x === 34 || x === 39 || x === 60 || x === 61 || x === 96 ? n(x) : x === 47 || x === 62 || je(x) ? I(x) : (e.consume(x), _);
  }
  function N(x) {
    return x === 47 || x === 62 || je(x) ? I(x) : n(x);
  }
  function B(x) {
    return x === 62 ? (e.consume(x), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(x);
  }
  function H(x) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), G;
  }
  function G(x) {
    return K(x) ? ie(e, ce, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(x) : ce(x);
  }
  function ce(x) {
    return e.enter("htmlTextData"), a(x);
  }
}
const Mn = {
  name: "labelEnd",
  resolveAll: aa,
  resolveTo: oa,
  tokenize: ua
}, ia = {
  tokenize: ca
}, sa = {
  tokenize: da
}, la = {
  tokenize: pa
};
function aa(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const s = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += s;
    }
  }
  return e.length !== n.length && Fe(e, 0, e.length, n), e;
}
function oa(e, t) {
  let n = e.length, r = 0, s, i, a, o;
  for (; n--; )
    if (s = e[n][1], i) {
      if (s.type === "link" || s.type === "labelLink" && s._inactive)
        break;
      e[n][0] === "enter" && s.type === "labelLink" && (s._inactive = !0);
    } else if (a) {
      if (e[n][0] === "enter" && (s.type === "labelImage" || s.type === "labelLink") && !s._balanced && (i = n, s.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else s.type === "labelEnd" && (a = n);
  const p = {
    type: e[i][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[i][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, u = {
    type: "label",
    start: {
      ...e[i][1].start
    },
    end: {
      ...e[a][1].end
    }
  }, c = {
    type: "labelText",
    start: {
      ...e[i + r + 2][1].end
    },
    end: {
      ...e[a - 2][1].start
    }
  };
  return o = [["enter", p, t], ["enter", u, t]], o = Ie(o, e.slice(i + 1, i + r + 3)), o = Ie(o, [["enter", c, t]]), o = Ie(o, $n(t.parser.constructs.insideSpan.null, e.slice(i + r + 4, a - 3), t)), o = Ie(o, [["exit", c, t], e[a - 2], e[a - 1], ["exit", u, t]]), o = Ie(o, e.slice(a + 1)), o = Ie(o, [["exit", p, t]]), Fe(e, i, e.length, o), e;
}
function ua(e, t, n) {
  const r = this;
  let s = r.events.length, i, a;
  for (; s--; )
    if ((r.events[s][1].type === "labelImage" || r.events[s][1].type === "labelLink") && !r.events[s][1]._balanced) {
      i = r.events[s][1];
      break;
    }
  return o;
  function o(h) {
    return i ? i._inactive ? f(h) : (a = r.parser.defined.includes(st(r.sliceSerialize({
      start: i.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(h), e.exit("labelMarker"), e.exit("labelEnd"), p) : n(h);
  }
  function p(h) {
    return h === 40 ? e.attempt(ia, c, a ? c : f)(h) : h === 91 ? e.attempt(sa, c, a ? u : f)(h) : a ? c(h) : f(h);
  }
  function u(h) {
    return e.attempt(la, c, f)(h);
  }
  function c(h) {
    return t(h);
  }
  function f(h) {
    return i._balanced = !0, n(h);
  }
}
function ca(e, t, n) {
  return r;
  function r(f) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), s;
  }
  function s(f) {
    return je(f) ? yt(e, i)(f) : i(f);
  }
  function i(f) {
    return f === 41 ? c(f) : fi(e, a, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(f);
  }
  function a(f) {
    return je(f) ? yt(e, p)(f) : c(f);
  }
  function o(f) {
    return n(f);
  }
  function p(f) {
    return f === 34 || f === 39 || f === 40 ? mi(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(f) : c(f);
  }
  function u(f) {
    return je(f) ? yt(e, c)(f) : c(f);
  }
  function c(f) {
    return f === 41 ? (e.enter("resourceMarker"), e.consume(f), e.exit("resourceMarker"), e.exit("resource"), t) : n(f);
  }
}
function da(e, t, n) {
  const r = this;
  return s;
  function s(o) {
    return hi.call(r, e, i, a, "reference", "referenceMarker", "referenceString")(o);
  }
  function i(o) {
    return r.parser.defined.includes(st(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(o) : n(o);
  }
  function a(o) {
    return n(o);
  }
}
function pa(e, t, n) {
  return r;
  function r(i) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(i), e.exit("referenceMarker"), s;
  }
  function s(i) {
    return i === 93 ? (e.enter("referenceMarker"), e.consume(i), e.exit("referenceMarker"), e.exit("reference"), t) : n(i);
  }
}
const fa = {
  name: "labelStartImage",
  resolveAll: Mn.resolveAll,
  tokenize: ha
};
function ha(e, t, n) {
  const r = this;
  return s;
  function s(o) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(o), e.exit("labelImageMarker"), i;
  }
  function i(o) {
    return o === 91 ? (e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelImage"), a) : n(o);
  }
  function a(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const ma = {
  name: "labelStartLink",
  resolveAll: Mn.resolveAll,
  tokenize: xa
};
function xa(e, t, n) {
  const r = this;
  return s;
  function s(a) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelLink"), i;
  }
  function i(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
  }
}
const cn = {
  name: "lineEnding",
  tokenize: ga
};
function ga(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), ie(e, t, "linePrefix");
  }
}
const zt = {
  name: "thematicBreak",
  tokenize: ya
};
function ya(e, t, n) {
  let r = 0, s;
  return i;
  function i(u) {
    return e.enter("thematicBreak"), a(u);
  }
  function a(u) {
    return s = u, o(u);
  }
  function o(u) {
    return u === s ? (e.enter("thematicBreakSequence"), p(u)) : r >= 3 && (u === null || q(u)) ? (e.exit("thematicBreak"), t(u)) : n(u);
  }
  function p(u) {
    return u === s ? (e.consume(u), r++, p) : (e.exit("thematicBreakSequence"), K(u) ? ie(e, o, "whitespace")(u) : o(u));
  }
}
const be = {
  continuation: {
    tokenize: ka
  },
  exit: Na,
  name: "list",
  tokenize: va
}, ba = {
  partial: !0,
  tokenize: Sa
}, ja = {
  partial: !0,
  tokenize: wa
};
function va(e, t, n) {
  const r = this, s = r.events[r.events.length - 1];
  let i = s && s[1].type === "linePrefix" ? s[2].sliceSerialize(s[1], !0).length : 0, a = 0;
  return o;
  function o(d) {
    const y = r.containerState.type || (d === 42 || d === 43 || d === 45 ? "listUnordered" : "listOrdered");
    if (y === "listUnordered" ? !r.containerState.marker || d === r.containerState.marker : Cn(d)) {
      if (r.containerState.type || (r.containerState.type = y, e.enter(y, {
        _container: !0
      })), y === "listUnordered")
        return e.enter("listItemPrefix"), d === 42 || d === 45 ? e.check(zt, n, u)(d) : u(d);
      if (!r.interrupt || d === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), p(d);
    }
    return n(d);
  }
  function p(d) {
    return Cn(d) && ++a < 10 ? (e.consume(d), p) : (!r.interrupt || a < 2) && (r.containerState.marker ? d === r.containerState.marker : d === 41 || d === 46) ? (e.exit("listItemValue"), u(d)) : n(d);
  }
  function u(d) {
    return e.enter("listItemMarker"), e.consume(d), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || d, e.check(
      qt,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      e.attempt(ba, h, f)
    );
  }
  function c(d) {
    return r.containerState.initialBlankLine = !0, i++, h(d);
  }
  function f(d) {
    return K(d) ? (e.enter("listItemPrefixWhitespace"), e.consume(d), e.exit("listItemPrefixWhitespace"), h) : n(d);
  }
  function h(d) {
    return r.containerState.size = i + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(d);
  }
}
function ka(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(qt, s, i);
  function s(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, ie(e, t, "listItemIndent", r.containerState.size + 1)(o);
  }
  function i(o) {
    return r.containerState.furtherBlankLines || !K(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, a(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(ja, t, a)(o));
  }
  function a(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, ie(e, e.attempt(be, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function wa(e, t, n) {
  const r = this;
  return ie(e, s, "listItemIndent", r.containerState.size + 1);
  function s(i) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "listItemIndent" && a[2].sliceSerialize(a[1], !0).length === r.containerState.size ? t(i) : n(i);
  }
}
function Na(e) {
  e.exit(this.containerState.type);
}
function Sa(e, t, n) {
  const r = this;
  return ie(e, s, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function s(i) {
    const a = r.events[r.events.length - 1];
    return !K(i) && a && a[1].type === "listItemPrefixWhitespace" ? t(i) : n(i);
  }
}
const wr = {
  name: "setextUnderline",
  resolveTo: Ca,
  tokenize: Ea
};
function Ca(e, t) {
  let n = e.length, r, s, i;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (s = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !i && e[n][1].type === "definition" && (i = n);
  const a = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[s][1].type = "setextHeadingText", i ? (e.splice(s, 0, ["enter", a, t]), e.splice(i + 1, 0, ["exit", e[r][1], t]), e[r][1].end = {
    ...e[i][1].end
  }) : e[r][1] = a, e.push(["exit", a, t]), e;
}
function Ea(e, t, n) {
  const r = this;
  let s;
  return i;
  function i(u) {
    let c = r.events.length, f;
    for (; c--; )
      if (r.events[c][1].type !== "lineEnding" && r.events[c][1].type !== "linePrefix" && r.events[c][1].type !== "content") {
        f = r.events[c][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f) ? (e.enter("setextHeadingLine"), s = u, a(u)) : n(u);
  }
  function a(u) {
    return e.enter("setextHeadingLineSequence"), o(u);
  }
  function o(u) {
    return u === s ? (e.consume(u), o) : (e.exit("setextHeadingLineSequence"), K(u) ? ie(e, p, "lineSuffix")(u) : p(u));
  }
  function p(u) {
    return u === null || q(u) ? (e.exit("setextHeadingLine"), t(u)) : n(u);
  }
}
const Ta = {
  tokenize: Ia
};
function Ia(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    qt,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, s, ie(e, e.attempt(this.parser.constructs.flow, s, e.attempt(_l, s)), "linePrefix"))
  );
  return n;
  function r(i) {
    if (i === null) {
      e.consume(i);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(i), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function s(i) {
    if (i === null) {
      e.consume(i);
      return;
    }
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const Pa = {
  resolveAll: gi()
}, Oa = xi("string"), Aa = xi("text");
function xi(e) {
  return {
    resolveAll: gi(e === "text" ? Ra : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, s = this.parser.constructs[e], i = n.attempt(s, a, o);
    return a;
    function a(c) {
      return u(c) ? i(c) : o(c);
    }
    function o(c) {
      if (c === null) {
        n.consume(c);
        return;
      }
      return n.enter("data"), n.consume(c), p;
    }
    function p(c) {
      return u(c) ? (n.exit("data"), i(c)) : (n.consume(c), p);
    }
    function u(c) {
      if (c === null)
        return !0;
      const f = s[c];
      let h = -1;
      if (f)
        for (; ++h < f.length; ) {
          const d = f[h];
          if (!d.previous || d.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function gi(e) {
  return t;
  function t(n, r) {
    let s = -1, i;
    for (; ++s <= n.length; )
      i === void 0 ? n[s] && n[s][1].type === "data" && (i = s, s++) : (!n[s] || n[s][1].type !== "data") && (s !== i + 2 && (n[i][1].end = n[s - 1][1].end, n.splice(i + 2, s - i - 2), s = i + 2), i = void 0);
    return e ? e(n, r) : n;
  }
}
function Ra(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], s = t.sliceStream(r);
      let i = s.length, a = -1, o = 0, p;
      for (; i--; ) {
        const u = s[i];
        if (typeof u == "string") {
          for (a = u.length; u.charCodeAt(a - 1) === 32; )
            o++, a--;
          if (a) break;
          a = -1;
        } else if (u === -2)
          p = !0, o++;
        else if (u !== -1) {
          i++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (o = 0), o) {
        const u = {
          type: n === e.length || p || o < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: i ? a : r.start._bufferIndex + a,
            _index: r.start._index + i,
            line: r.end.line,
            column: r.end.column - o,
            offset: r.end.offset - o
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...u.start
        }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(n, 0, ["enter", u, t], ["exit", u, t]), n += 2);
      }
      n++;
    }
  return e;
}
const _a = {
  42: be,
  43: be,
  45: be,
  48: be,
  49: be,
  50: be,
  51: be,
  52: be,
  53: be,
  54: be,
  55: be,
  56: be,
  57: be,
  62: ui
}, Da = {
  91: $l
}, La = {
  [-2]: un,
  [-1]: un,
  32: un
}, Fa = {
  35: Vl,
  42: zt,
  45: [wr, zt],
  60: Xl,
  61: wr,
  95: zt,
  96: vr,
  126: vr
}, za = {
  38: di,
  92: ci
}, $a = {
  [-5]: cn,
  [-4]: cn,
  [-3]: cn,
  33: fa,
  38: di,
  42: En,
  60: [ml, na],
  91: ma,
  92: [Ul, ci],
  93: Mn,
  95: En,
  96: Tl
}, Ma = {
  null: [En, Pa]
}, Ba = {
  null: [42, 95]
}, qa = {
  null: []
}, Ua = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Ba,
  contentInitial: Da,
  disable: qa,
  document: _a,
  flow: Fa,
  flowInitial: La,
  insideSpan: Ma,
  string: za,
  text: $a
}, Symbol.toStringTag, { value: "Module" }));
function Ha(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const s = {}, i = [];
  let a = [], o = [];
  const p = {
    attempt: $(M),
    check: $(b),
    consume: S,
    enter: w,
    exit: F,
    interrupt: $(b, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: v,
    events: [],
    now: y,
    parser: e,
    previous: null,
    sliceSerialize: h,
    sliceStream: d,
    write: f
  };
  let c = t.tokenize.call(u, p);
  return t.resolveAll && i.push(t), u;
  function f(T) {
    return a = Ie(a, T), P(), a[a.length - 1] !== null ? [] : (D(t, 0), u.events = $n(i, u.events, u), u.events);
  }
  function h(T, A) {
    return Wa(d(T), A);
  }
  function d(T) {
    return Va(a, T);
  }
  function y() {
    const {
      _bufferIndex: T,
      _index: A,
      line: R,
      column: _,
      offset: N
    } = r;
    return {
      _bufferIndex: T,
      _index: A,
      line: R,
      column: _,
      offset: N
    };
  }
  function v(T) {
    s[T.line] = T.column, z();
  }
  function P() {
    let T;
    for (; r._index < a.length; ) {
      const A = a[r._index];
      if (typeof A == "string")
        for (T = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === T && r._bufferIndex < A.length; )
          j(A.charCodeAt(r._bufferIndex));
      else
        j(A);
    }
  }
  function j(T) {
    c = c(T);
  }
  function S(T) {
    q(T) ? (r.line++, r.column = 1, r.offset += T === -3 ? 2 : 1, z()) : T !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    a[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = T;
  }
  function w(T, A) {
    const R = A || {};
    return R.type = T, R.start = y(), u.events.push(["enter", R, u]), o.push(R), R;
  }
  function F(T) {
    const A = o.pop();
    return A.end = y(), u.events.push(["exit", A, u]), A;
  }
  function M(T, A) {
    D(T, A.from);
  }
  function b(T, A) {
    A.restore();
  }
  function $(T, A) {
    return R;
    function R(_, N, B) {
      let H, G, ce, x;
      return Array.isArray(_) ? (
        /* c8 ignore next 1 */
        xe(_)
      ) : "tokenize" in _ ? (
        // Looks like a construct.
        xe([
          /** @type {Construct} */
          _
        ])
      ) : fe(_);
      function fe(ne) {
        return Pe;
        function Pe(ke) {
          const _e = ke !== null && ne[ke], Oe = ke !== null && ne.null, Ge = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(_e) ? _e : _e ? [_e] : [],
            ...Array.isArray(Oe) ? Oe : Oe ? [Oe] : []
          ];
          return xe(Ge)(ke);
        }
      }
      function xe(ne) {
        return H = ne, G = 0, ne.length === 0 ? B : g(ne[G]);
      }
      function g(ne) {
        return Pe;
        function Pe(ke) {
          return x = I(), ce = ne, ne.partial || (u.currentConstruct = ne), ne.name && u.parser.constructs.disable.null.includes(ne.name) ? ge() : ne.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            A ? Object.assign(Object.create(u), A) : u,
            p,
            de,
            ge
          )(ke);
        }
      }
      function de(ne) {
        return T(ce, x), N;
      }
      function ge(ne) {
        return x.restore(), ++G < H.length ? g(H[G]) : B;
      }
    }
  }
  function D(T, A) {
    T.resolveAll && !i.includes(T) && i.push(T), T.resolve && Fe(u.events, A, u.events.length - A, T.resolve(u.events.slice(A), u)), T.resolveTo && (u.events = T.resolveTo(u.events, u));
  }
  function I() {
    const T = y(), A = u.previous, R = u.currentConstruct, _ = u.events.length, N = Array.from(o);
    return {
      from: _,
      restore: B
    };
    function B() {
      r = T, u.previous = A, u.currentConstruct = R, u.events.length = _, o = N, z();
    }
  }
  function z() {
    r.line in s && r.column < 2 && (r.column = s[r.line], r.offset += s[r.line] - 1);
  }
}
function Va(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, s = t.end._index, i = t.end._bufferIndex;
  let a;
  if (n === s)
    a = [e[n].slice(r, i)];
  else {
    if (a = e.slice(n, s), r > -1) {
      const o = a[0];
      typeof o == "string" ? a[0] = o.slice(r) : a.shift();
    }
    i > 0 && a.push(e[s].slice(0, i));
  }
  return a;
}
function Wa(e, t) {
  let n = -1;
  const r = [];
  let s;
  for (; ++n < e.length; ) {
    const i = e[n];
    let a;
    if (typeof i == "string")
      a = i;
    else switch (i) {
      case -5: {
        a = "\r";
        break;
      }
      case -4: {
        a = `
`;
        break;
      }
      case -3: {
        a = `\r
`;
        break;
      }
      case -2: {
        a = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && s) continue;
        a = " ";
        break;
      }
      default:
        a = String.fromCharCode(i);
    }
    s = i === -2, r.push(a);
  }
  return r.join("");
}
function Ya(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      el([Ua, ...(e || {}).extensions || []])
    ),
    content: s(ol),
    defined: [],
    document: s(cl),
    flow: s(Ta),
    lazy: {},
    string: s(Oa),
    text: s(Aa)
  };
  return r;
  function s(i) {
    return a;
    function a(o) {
      return Ha(r, i, o);
    }
  }
}
function Ja(e) {
  for (; !pi(e); )
    ;
  return e;
}
const Nr = /[\0\t\n\r]/g;
function Xa() {
  let e = 1, t = "", n = !0, r;
  return s;
  function s(i, a, o) {
    const p = [];
    let u, c, f, h, d;
    for (i = t + (typeof i == "string" ? i.toString() : new TextDecoder(a || void 0).decode(i)), f = 0, t = "", n && (i.charCodeAt(0) === 65279 && f++, n = void 0); f < i.length; ) {
      if (Nr.lastIndex = f, u = Nr.exec(i), h = u && u.index !== void 0 ? u.index : i.length, d = i.charCodeAt(h), !u) {
        t = i.slice(f);
        break;
      }
      if (d === 10 && f === h && r)
        p.push(-3), r = void 0;
      else
        switch (r && (p.push(-5), r = void 0), f < h && (p.push(i.slice(f, h)), e += h - f), d) {
          case 0: {
            p.push(65533), e++;
            break;
          }
          case 9: {
            for (c = Math.ceil(e / 4) * 4, p.push(-2); e++ < c; ) p.push(-1);
            break;
          }
          case 10: {
            p.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      f = h + 1;
    }
    return o && (r && p.push(-5), t && p.push(t), p.push(null)), p;
  }
}
const Ga = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Ka(e) {
  return e.replace(Ga, Qa);
}
function Qa(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const s = n.charCodeAt(1), i = s === 120 || s === 88;
    return oi(n.slice(i ? 2 : 1), i ? 16 : 10);
  }
  return zn(n) || e;
}
const yi = {}.hasOwnProperty;
function Za(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), eo(n)(Ja(Ya(n).document().write(Xa()(e, t, !0))));
}
function eo(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: i(Ve),
      autolinkProtocol: I,
      autolinkEmail: I,
      atxHeading: i(He),
      blockQuote: i(Oe),
      characterEscape: I,
      characterReference: I,
      codeFenced: i(Ge),
      codeFencedFenceInfo: a,
      codeFencedFenceMeta: a,
      codeIndented: i(Ge, a),
      codeText: i(It, a),
      codeTextData: I,
      data: I,
      codeFlowValue: I,
      definition: i(Gt),
      definitionDestinationString: a,
      definitionLabelString: a,
      definitionTitleString: a,
      emphasis: i(Kt),
      hardBreakEscape: i(Me),
      hardBreakTrailing: i(Me),
      htmlFlow: i(ut, a),
      htmlFlowData: I,
      htmlText: i(ut, a),
      htmlTextData: I,
      image: i(Pt),
      label: a,
      link: i(Ve),
      listItem: i(Qt),
      listItemValue: h,
      listOrdered: i(Ot, f),
      listUnordered: i(Ot),
      paragraph: i(ct),
      reference: g,
      referenceString: a,
      resourceDestinationString: a,
      resourceTitleString: a,
      setextHeading: i(He),
      strong: i(Zt),
      thematicBreak: i(At)
    },
    exit: {
      atxHeading: p(),
      atxHeadingSequence: M,
      autolink: p(),
      autolinkEmail: _e,
      autolinkProtocol: ke,
      blockQuote: p(),
      characterEscapeValue: z,
      characterReferenceMarkerHexadecimal: ge,
      characterReferenceMarkerNumeric: ge,
      characterReferenceValue: ne,
      characterReference: Pe,
      codeFenced: p(P),
      codeFencedFence: v,
      codeFencedFenceInfo: d,
      codeFencedFenceMeta: y,
      codeFlowValue: z,
      codeIndented: p(j),
      codeText: p(N),
      codeTextData: z,
      data: z,
      definition: p(),
      definitionDestinationString: F,
      definitionLabelString: S,
      definitionTitleString: w,
      emphasis: p(),
      hardBreakEscape: p(A),
      hardBreakTrailing: p(A),
      htmlFlow: p(R),
      htmlFlowData: z,
      htmlText: p(_),
      htmlTextData: z,
      image: p(H),
      label: ce,
      labelText: G,
      lineEnding: T,
      link: p(B),
      listItem: p(),
      listOrdered: p(),
      listUnordered: p(),
      paragraph: p(),
      referenceString: de,
      resourceDestinationString: x,
      resourceTitleString: fe,
      resource: xe,
      setextHeading: p(D),
      setextHeadingLineSequence: $,
      setextHeadingText: b,
      strong: p(),
      thematicBreak: p()
    }
  };
  bi(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(k) {
    let O = {
      type: "root",
      children: []
    };
    const V = {
      stack: [O],
      tokenStack: [],
      config: t,
      enter: o,
      exit: u,
      buffer: a,
      resume: c,
      data: n
    }, Y = [];
    let Q = -1;
    for (; ++Q < k.length; )
      if (k[Q][1].type === "listOrdered" || k[Q][1].type === "listUnordered")
        if (k[Q][0] === "enter")
          Y.push(Q);
        else {
          const we = Y.pop();
          Q = s(k, we, Q);
        }
    for (Q = -1; ++Q < k.length; ) {
      const we = t[k[Q][0]];
      yi.call(we, k[Q][1].type) && we[k[Q][1].type].call(Object.assign({
        sliceSerialize: k[Q][2].sliceSerialize
      }, V), k[Q][1]);
    }
    if (V.tokenStack.length > 0) {
      const we = V.tokenStack[V.tokenStack.length - 1];
      (we[1] || Sr).call(V, void 0, we[0]);
    }
    for (O.position = {
      start: qe(k.length > 0 ? k[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: qe(k.length > 0 ? k[k.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Q = -1; ++Q < t.transforms.length; )
      O = t.transforms[Q](O) || O;
    return O;
  }
  function s(k, O, V) {
    let Y = O - 1, Q = -1, we = !1, ze, Ae, We, Ye;
    for (; ++Y <= V; ) {
      const he = k[Y];
      switch (he[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          he[0] === "enter" ? Q++ : Q--, Ye = void 0;
          break;
        }
        case "lineEndingBlank": {
          he[0] === "enter" && (ze && !Ye && !Q && !We && (We = Y), Ye = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Ye = void 0;
      }
      if (!Q && he[0] === "enter" && he[1].type === "listItemPrefix" || Q === -1 && he[0] === "exit" && (he[1].type === "listUnordered" || he[1].type === "listOrdered")) {
        if (ze) {
          let Be = Y;
          for (Ae = void 0; Be--; ) {
            const Ne = k[Be];
            if (Ne[1].type === "lineEnding" || Ne[1].type === "lineEndingBlank") {
              if (Ne[0] === "exit") continue;
              Ae && (k[Ae][1].type = "lineEndingBlank", we = !0), Ne[1].type = "lineEnding", Ae = Be;
            } else if (!(Ne[1].type === "linePrefix" || Ne[1].type === "blockQuotePrefix" || Ne[1].type === "blockQuotePrefixWhitespace" || Ne[1].type === "blockQuoteMarker" || Ne[1].type === "listItemIndent")) break;
          }
          We && (!Ae || We < Ae) && (ze._spread = !0), ze.end = Object.assign({}, Ae ? k[Ae][1].start : he[1].end), k.splice(Ae || Y, 0, ["exit", ze, he[2]]), Y++, V++;
        }
        if (he[1].type === "listItemPrefix") {
          const Be = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, he[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          ze = Be, k.splice(Y, 0, ["enter", Be, he[2]]), Y++, V++, We = void 0, Ye = !0;
        }
      }
    }
    return k[O][1]._spread = we, V;
  }
  function i(k, O) {
    return V;
    function V(Y) {
      o.call(this, k(Y), Y), O && O.call(this, Y);
    }
  }
  function a() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(k, O, V) {
    this.stack[this.stack.length - 1].children.push(k), this.stack.push(k), this.tokenStack.push([O, V || void 0]), k.position = {
      start: qe(O.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function p(k) {
    return O;
    function O(V) {
      k && k.call(this, V), u.call(this, V);
    }
  }
  function u(k, O) {
    const V = this.stack.pop(), Y = this.tokenStack.pop();
    if (Y)
      Y[0].type !== k.type && (O ? O.call(this, k, Y[0]) : (Y[1] || Sr).call(this, k, Y[0]));
    else throw new Error("Cannot close `" + k.type + "` (" + gt({
      start: k.start,
      end: k.end
    }) + "): it’s not open");
    V.position.end = qe(k.end);
  }
  function c() {
    return Qs(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function h(k) {
    if (this.data.expectingFirstListItemValue) {
      const O = this.stack[this.stack.length - 2];
      O.start = Number.parseInt(this.sliceSerialize(k), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function d() {
    const k = this.resume(), O = this.stack[this.stack.length - 1];
    O.lang = k;
  }
  function y() {
    const k = this.resume(), O = this.stack[this.stack.length - 1];
    O.meta = k;
  }
  function v() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function P() {
    const k = this.resume(), O = this.stack[this.stack.length - 1];
    O.value = k.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function j() {
    const k = this.resume(), O = this.stack[this.stack.length - 1];
    O.value = k.replace(/(\r?\n|\r)$/g, "");
  }
  function S(k) {
    const O = this.resume(), V = this.stack[this.stack.length - 1];
    V.label = O, V.identifier = st(this.sliceSerialize(k)).toLowerCase();
  }
  function w() {
    const k = this.resume(), O = this.stack[this.stack.length - 1];
    O.title = k;
  }
  function F() {
    const k = this.resume(), O = this.stack[this.stack.length - 1];
    O.url = k;
  }
  function M(k) {
    const O = this.stack[this.stack.length - 1];
    if (!O.depth) {
      const V = this.sliceSerialize(k).length;
      O.depth = V;
    }
  }
  function b() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function $(k) {
    const O = this.stack[this.stack.length - 1];
    O.depth = this.sliceSerialize(k).codePointAt(0) === 61 ? 1 : 2;
  }
  function D() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function I(k) {
    const V = this.stack[this.stack.length - 1].children;
    let Y = V[V.length - 1];
    (!Y || Y.type !== "text") && (Y = en(), Y.position = {
      start: qe(k.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, V.push(Y)), this.stack.push(Y);
  }
  function z(k) {
    const O = this.stack.pop();
    O.value += this.sliceSerialize(k), O.position.end = qe(k.end);
  }
  function T(k) {
    const O = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const V = O.children[O.children.length - 1];
      V.position.end = qe(k.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(O.type) && (I.call(this, k), z.call(this, k));
  }
  function A() {
    this.data.atHardBreak = !0;
  }
  function R() {
    const k = this.resume(), O = this.stack[this.stack.length - 1];
    O.value = k;
  }
  function _() {
    const k = this.resume(), O = this.stack[this.stack.length - 1];
    O.value = k;
  }
  function N() {
    const k = this.resume(), O = this.stack[this.stack.length - 1];
    O.value = k;
  }
  function B() {
    const k = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const O = this.data.referenceType || "shortcut";
      k.type += "Reference", k.referenceType = O, delete k.url, delete k.title;
    } else
      delete k.identifier, delete k.label;
    this.data.referenceType = void 0;
  }
  function H() {
    const k = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const O = this.data.referenceType || "shortcut";
      k.type += "Reference", k.referenceType = O, delete k.url, delete k.title;
    } else
      delete k.identifier, delete k.label;
    this.data.referenceType = void 0;
  }
  function G(k) {
    const O = this.sliceSerialize(k), V = this.stack[this.stack.length - 2];
    V.label = Ka(O), V.identifier = st(O).toLowerCase();
  }
  function ce() {
    const k = this.stack[this.stack.length - 1], O = this.resume(), V = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, V.type === "link") {
      const Y = k.children;
      V.children = Y;
    } else
      V.alt = O;
  }
  function x() {
    const k = this.resume(), O = this.stack[this.stack.length - 1];
    O.url = k;
  }
  function fe() {
    const k = this.resume(), O = this.stack[this.stack.length - 1];
    O.title = k;
  }
  function xe() {
    this.data.inReference = void 0;
  }
  function g() {
    this.data.referenceType = "collapsed";
  }
  function de(k) {
    const O = this.resume(), V = this.stack[this.stack.length - 1];
    V.label = O, V.identifier = st(this.sliceSerialize(k)).toLowerCase(), this.data.referenceType = "full";
  }
  function ge(k) {
    this.data.characterReferenceType = k.type;
  }
  function ne(k) {
    const O = this.sliceSerialize(k), V = this.data.characterReferenceType;
    let Y;
    V ? (Y = oi(O, V === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : Y = zn(O);
    const Q = this.stack[this.stack.length - 1];
    Q.value += Y;
  }
  function Pe(k) {
    const O = this.stack.pop();
    O.position.end = qe(k.end);
  }
  function ke(k) {
    z.call(this, k);
    const O = this.stack[this.stack.length - 1];
    O.url = this.sliceSerialize(k);
  }
  function _e(k) {
    z.call(this, k);
    const O = this.stack[this.stack.length - 1];
    O.url = "mailto:" + this.sliceSerialize(k);
  }
  function Oe() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Ge() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function It() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Gt() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Kt() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function He() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Me() {
    return {
      type: "break"
    };
  }
  function ut() {
    return {
      type: "html",
      value: ""
    };
  }
  function Pt() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Ve() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Ot(k) {
    return {
      type: "list",
      ordered: k.type === "listOrdered",
      start: null,
      spread: k._spread,
      children: []
    };
  }
  function Qt(k) {
    return {
      type: "listItem",
      spread: k._spread,
      checked: null,
      children: []
    };
  }
  function ct() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Zt() {
    return {
      type: "strong",
      children: []
    };
  }
  function en() {
    return {
      type: "text",
      value: ""
    };
  }
  function At() {
    return {
      type: "thematicBreak"
    };
  }
}
function qe(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function bi(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? bi(e, r) : to(e, r);
  }
}
function to(e, t) {
  let n;
  for (n in t)
    if (yi.call(t, n))
      switch (n) {
        case "canContainEols": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "transforms": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = t[n];
          r && Object.assign(e[n], r);
          break;
        }
      }
}
function Sr(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + gt({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + gt({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + gt({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function no(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return Za(r, {
      ...t.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: t.data("micromarkExtensions") || [],
      mdastExtensions: t.data("fromMarkdownExtensions") || []
    });
  }
}
function ro(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function io(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function so(e, t) {
  const n = t.value ? t.value + `
` : "", r = {};
  t.lang && (r.className = ["language-" + t.lang]);
  let s = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: n }]
  };
  return t.meta && (s.data = { meta: t.meta }), e.patch(t, s), s = e.applyData(t, s), s = { type: "element", tagName: "pre", properties: {}, children: [s] }, e.patch(t, s), s;
}
function lo(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function ao(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function oo(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), s = ot(r.toLowerCase()), i = e.footnoteOrder.indexOf(r);
  let a, o = e.footnoteCounts.get(r);
  o === void 0 ? (o = 0, e.footnoteOrder.push(r), a = e.footnoteOrder.length) : a = i + 1, o += 1, e.footnoteCounts.set(r, o);
  const p = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + s,
      id: n + "fnref-" + s + (o > 1 ? "-" + o : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(a) }]
  };
  e.patch(t, p);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [p]
  };
  return e.patch(t, u), e.applyData(t, u);
}
function uo(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function co(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function ji(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const s = e.all(t), i = s[0];
  i && i.type === "text" ? i.value = "[" + i.value : s.unshift({ type: "text", value: "[" });
  const a = s[s.length - 1];
  return a && a.type === "text" ? a.value += r : s.push({ type: "text", value: r }), s;
}
function po(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return ji(e, t);
  const s = { src: ot(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (s.title = r.title);
  const i = { type: "element", tagName: "img", properties: s, children: [] };
  return e.patch(t, i), e.applyData(t, i);
}
function fo(e, t) {
  const n = { src: ot(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function ho(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [n]
  };
  return e.patch(t, r), e.applyData(t, r);
}
function mo(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return ji(e, t);
  const s = { href: ot(r.url || "") };
  r.title !== null && r.title !== void 0 && (s.title = r.title);
  const i = {
    type: "element",
    tagName: "a",
    properties: s,
    children: e.all(t)
  };
  return e.patch(t, i), e.applyData(t, i);
}
function xo(e, t) {
  const n = { href: ot(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function go(e, t, n) {
  const r = e.all(t), s = n ? yo(n) : vi(t), i = {}, a = [];
  if (typeof t.checked == "boolean") {
    const c = r[0];
    let f;
    c && c.type === "element" && c.tagName === "p" ? f = c : (f = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(f)), f.children.length > 0 && f.children.unshift({ type: "text", value: " " }), f.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), i.className = ["task-list-item"];
  }
  let o = -1;
  for (; ++o < r.length; ) {
    const c = r[o];
    (s || o !== 0 || c.type !== "element" || c.tagName !== "p") && a.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !s ? a.push(...c.children) : a.push(c);
  }
  const p = r[r.length - 1];
  p && (s || p.type !== "element" || p.tagName !== "p") && a.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: i, children: a };
  return e.patch(t, u), e.applyData(t, u);
}
function yo(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = vi(n[r]);
  }
  return t;
}
function vi(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function bo(e, t) {
  const n = {}, r = e.all(t);
  let s = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++s < r.length; ) {
    const a = r[s];
    if (a.type === "element" && a.tagName === "li" && a.properties && Array.isArray(a.properties.className) && a.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const i = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0)
  };
  return e.patch(t, i), e.applyData(t, i);
}
function jo(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function vo(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function ko(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function wo(e, t) {
  const n = e.all(t), r = n.shift(), s = [];
  if (r) {
    const a = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(t.children[0], a), s.push(a);
  }
  if (n.length > 0) {
    const a = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, o = _n(t.children[1]), p = ti(t.children[t.children.length - 1]);
    o && p && (a.position = { start: o, end: p }), s.push(a);
  }
  const i = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(s, !0)
  };
  return e.patch(t, i), e.applyData(t, i);
}
function No(e, t, n) {
  const r = n ? n.children : void 0, i = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", a = n && n.type === "table" ? n.align : void 0, o = a ? a.length : t.children.length;
  let p = -1;
  const u = [];
  for (; ++p < o; ) {
    const f = t.children[p], h = {}, d = a ? a[p] : void 0;
    d && (h.align = d);
    let y = { type: "element", tagName: i, properties: h, children: [] };
    f && (y.children = e.all(f), e.patch(f, y), y = e.applyData(f, y)), u.push(y);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(t, c), e.applyData(t, c);
}
function So(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Cr = 9, Er = 32;
function Co(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), s = 0;
  const i = [];
  for (; r; )
    i.push(
      Tr(t.slice(s, r.index), s > 0, !0),
      r[0]
    ), s = r.index + r[0].length, r = n.exec(t);
  return i.push(Tr(t.slice(s), s > 0, !1)), i.join("");
}
function Tr(e, t, n) {
  let r = 0, s = e.length;
  if (t) {
    let i = e.codePointAt(r);
    for (; i === Cr || i === Er; )
      r++, i = e.codePointAt(r);
  }
  if (n) {
    let i = e.codePointAt(s - 1);
    for (; i === Cr || i === Er; )
      s--, i = e.codePointAt(s - 1);
  }
  return s > r ? e.slice(r, s) : "";
}
function Eo(e, t) {
  const n = { type: "text", value: Co(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function To(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Io = {
  blockquote: ro,
  break: io,
  code: so,
  delete: lo,
  emphasis: ao,
  footnoteReference: oo,
  heading: uo,
  html: co,
  imageReference: po,
  image: fo,
  inlineCode: ho,
  linkReference: mo,
  link: xo,
  listItem: go,
  list: bo,
  paragraph: jo,
  // @ts-expect-error: root is different, but hard to type.
  root: vo,
  strong: ko,
  table: wo,
  tableCell: So,
  tableRow: No,
  text: Eo,
  thematicBreak: To,
  toml: _t,
  yaml: _t,
  definition: _t,
  footnoteDefinition: _t
};
function _t() {
}
const ki = -1, Ut = 0, bt = 1, $t = 2, Bn = 3, qn = 4, Un = 5, Hn = 6, wi = 7, Ni = 8, Ir = typeof self == "object" ? self : globalThis, Po = (e, t) => {
  const n = (s, i) => (e.set(i, s), s), r = (s) => {
    if (e.has(s))
      return e.get(s);
    const [i, a] = t[s];
    switch (i) {
      case Ut:
      case ki:
        return n(a, s);
      case bt: {
        const o = n([], s);
        for (const p of a)
          o.push(r(p));
        return o;
      }
      case $t: {
        const o = n({}, s);
        for (const [p, u] of a)
          o[r(p)] = r(u);
        return o;
      }
      case Bn:
        return n(new Date(a), s);
      case qn: {
        const { source: o, flags: p } = a;
        return n(new RegExp(o, p), s);
      }
      case Un: {
        const o = n(/* @__PURE__ */ new Map(), s);
        for (const [p, u] of a)
          o.set(r(p), r(u));
        return o;
      }
      case Hn: {
        const o = n(/* @__PURE__ */ new Set(), s);
        for (const p of a)
          o.add(r(p));
        return o;
      }
      case wi: {
        const { name: o, message: p } = a;
        return n(new Ir[o](p), s);
      }
      case Ni:
        return n(BigInt(a), s);
      case "BigInt":
        return n(Object(BigInt(a)), s);
      case "ArrayBuffer":
        return n(new Uint8Array(a).buffer, a);
      case "DataView": {
        const { buffer: o } = new Uint8Array(a);
        return n(new DataView(o), a);
      }
    }
    return n(new Ir[i](a), s);
  };
  return r;
}, Pr = (e) => Po(/* @__PURE__ */ new Map(), e)(0), et = "", { toString: Oo } = {}, { keys: Ao } = Object, xt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Ut, t];
  const n = Oo.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [bt, et];
    case "Object":
      return [$t, et];
    case "Date":
      return [Bn, et];
    case "RegExp":
      return [qn, et];
    case "Map":
      return [Un, et];
    case "Set":
      return [Hn, et];
    case "DataView":
      return [bt, n];
  }
  return n.includes("Array") ? [bt, n] : n.includes("Error") ? [wi, n] : [$t, n];
}, Dt = ([e, t]) => e === Ut && (t === "function" || t === "symbol"), Ro = (e, t, n, r) => {
  const s = (a, o) => {
    const p = r.push(a) - 1;
    return n.set(o, p), p;
  }, i = (a) => {
    if (n.has(a))
      return n.get(a);
    let [o, p] = xt(a);
    switch (o) {
      case Ut: {
        let c = a;
        switch (p) {
          case "bigint":
            o = Ni, c = a.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + p);
            c = null;
            break;
          case "undefined":
            return s([ki], a);
        }
        return s([o, c], a);
      }
      case bt: {
        if (p) {
          let h = a;
          return p === "DataView" ? h = new Uint8Array(a.buffer) : p === "ArrayBuffer" && (h = new Uint8Array(a)), s([p, [...h]], a);
        }
        const c = [], f = s([o, c], a);
        for (const h of a)
          c.push(i(h));
        return f;
      }
      case $t: {
        if (p)
          switch (p) {
            case "BigInt":
              return s([p, a.toString()], a);
            case "Boolean":
            case "Number":
            case "String":
              return s([p, a.valueOf()], a);
          }
        if (t && "toJSON" in a)
          return i(a.toJSON());
        const c = [], f = s([o, c], a);
        for (const h of Ao(a))
          (e || !Dt(xt(a[h]))) && c.push([i(h), i(a[h])]);
        return f;
      }
      case Bn:
        return s([o, a.toISOString()], a);
      case qn: {
        const { source: c, flags: f } = a;
        return s([o, { source: c, flags: f }], a);
      }
      case Un: {
        const c = [], f = s([o, c], a);
        for (const [h, d] of a)
          (e || !(Dt(xt(h)) || Dt(xt(d)))) && c.push([i(h), i(d)]);
        return f;
      }
      case Hn: {
        const c = [], f = s([o, c], a);
        for (const h of a)
          (e || !Dt(xt(h))) && c.push(i(h));
        return f;
      }
    }
    const { message: u } = a;
    return s([o, { name: p, message: u }], a);
  };
  return i;
}, Or = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return Ro(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, Mt = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Pr(Or(e, t)) : structuredClone(e)
) : (e, t) => Pr(Or(e, t));
function _o(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function Do(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Lo(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || _o, r = e.options.footnoteBackLabel || Do, s = e.options.footnoteLabel || "Footnotes", i = e.options.footnoteLabelTagName || "h2", a = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let p = -1;
  for (; ++p < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[p]
    );
    if (!u)
      continue;
    const c = e.all(u), f = String(u.identifier).toUpperCase(), h = ot(f.toLowerCase());
    let d = 0;
    const y = [], v = e.footnoteCounts.get(f);
    for (; v !== void 0 && ++d <= v; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let S = typeof n == "string" ? n : n(p, d);
      typeof S == "string" && (S = { type: "text", value: S }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + h + (d > 1 ? "-" + d : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(p, d),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(S) ? S : [S]
      });
    }
    const P = c[c.length - 1];
    if (P && P.type === "element" && P.tagName === "p") {
      const S = P.children[P.children.length - 1];
      S && S.type === "text" ? S.value += " " : P.children.push({ type: "text", value: " " }), P.children.push(...y);
    } else
      c.push(...y);
    const j = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + h },
      children: e.wrap(c, !0)
    };
    e.patch(u, j), o.push(j);
  }
  if (o.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: i,
          properties: {
            ...Mt(a),
            id: "footnote-label"
          },
          children: [{ type: "text", value: s }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(o, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const Si = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(e) {
    if (e == null)
      return Mo;
    if (typeof e == "function")
      return Ht(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Fo(e) : zo(e);
    if (typeof e == "string")
      return $o(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Fo(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Si(e[n]);
  return Ht(r);
  function r(...s) {
    let i = -1;
    for (; ++i < t.length; )
      if (t[i].apply(this, s)) return !0;
    return !1;
  }
}
function zo(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Ht(n);
  function n(r) {
    const s = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let i;
    for (i in e)
      if (s[i] !== t[i]) return !1;
    return !0;
  }
}
function $o(e) {
  return Ht(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Ht(e) {
  return t;
  function t(n, r, s) {
    return !!(Bo(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      s || void 0
    ));
  }
}
function Mo() {
  return !0;
}
function Bo(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Ci = [], qo = !0, Ar = !1, Uo = "skip";
function Ho(e, t, n, r) {
  let s;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : s = t;
  const i = Si(s), a = r ? -1 : 1;
  o(e, void 0, [])();
  function o(p, u, c) {
    const f = (
      /** @type {Record<string, unknown>} */
      p && typeof p == "object" ? p : {}
    );
    if (typeof f.type == "string") {
      const d = (
        // `hast`
        typeof f.tagName == "string" ? f.tagName : (
          // `xast`
          typeof f.name == "string" ? f.name : void 0
        )
      );
      Object.defineProperty(h, "name", {
        value: "node (" + (p.type + (d ? "<" + d + ">" : "")) + ")"
      });
    }
    return h;
    function h() {
      let d = Ci, y, v, P;
      if ((!t || i(p, u, c[c.length - 1] || void 0)) && (d = Vo(n(p, c)), d[0] === Ar))
        return d;
      if ("children" in p && p.children) {
        const j = (
          /** @type {UnistParent} */
          p
        );
        if (j.children && d[0] !== Uo)
          for (v = (r ? j.children.length : -1) + a, P = c.concat(j); v > -1 && v < j.children.length; ) {
            const S = j.children[v];
            if (y = o(S, v, P)(), y[0] === Ar)
              return y;
            v = typeof y[1] == "number" ? y[1] : v + a;
          }
      }
      return d;
    }
  }
}
function Vo(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [qo, e] : e == null ? Ci : [e];
}
function Ei(e, t, n, r) {
  let s, i, a;
  typeof t == "function" ? (i = void 0, a = t, s = n) : (i = t, a = n, s = r), Ho(e, i, o, s);
  function o(p, u) {
    const c = u[u.length - 1], f = c ? c.children.indexOf(p) : void 0;
    return a(p, f, c);
  }
}
const Tn = {}.hasOwnProperty, Wo = {};
function Yo(e, t) {
  const n = t || Wo, r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = { ...Io, ...n.handlers }, o = {
    all: u,
    applyData: Xo,
    definitionById: r,
    footnoteById: s,
    footnoteCounts: i,
    footnoteOrder: [],
    handlers: a,
    one: p,
    options: n,
    patch: Jo,
    wrap: Ko
  };
  return Ei(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const f = c.type === "definition" ? r : s, h = String(c.identifier).toUpperCase();
      f.has(h) || f.set(h, c);
    }
  }), o;
  function p(c, f) {
    const h = c.type, d = o.handlers[h];
    if (Tn.call(o.handlers, h) && d)
      return d(o, c, f);
    if (o.options.passThrough && o.options.passThrough.includes(h)) {
      if ("children" in c) {
        const { children: v, ...P } = c, j = Mt(P);
        return j.children = o.all(c), j;
      }
      return Mt(c);
    }
    return (o.options.unknownHandler || Go)(o, c, f);
  }
  function u(c) {
    const f = [];
    if ("children" in c) {
      const h = c.children;
      let d = -1;
      for (; ++d < h.length; ) {
        const y = o.one(h[d], c);
        if (y) {
          if (d && h[d - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = Rr(y.value)), !Array.isArray(y) && y.type === "element")) {
            const v = y.children[0];
            v && v.type === "text" && (v.value = Rr(v.value));
          }
          Array.isArray(y) ? f.push(...y) : f.push(y);
        }
      }
    }
    return f;
  }
}
function Jo(e, t) {
  e.position && (t.position = Ps(e));
}
function Xo(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, s = e.data.hChildren, i = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const a = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: a };
      }
    n.type === "element" && i && Object.assign(n.properties, Mt(i)), "children" in n && n.children && s !== null && s !== void 0 && (n.children = s);
  }
  return n;
}
function Go(e, t) {
  const n = t.data || {}, r = "value" in t && !(Tn.call(n, "hProperties") || Tn.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Ko(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Rr(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function _r(e, t) {
  const n = Yo(e, t), r = n.one(e, void 0), s = Lo(n), i = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return s && i.children.push({ type: "text", value: `
` }, s), i;
}
function Qo(e, t) {
  return e && "run" in e ? async function(n, r) {
    const s = (
      /** @type {HastRoot} */
      _r(n, { file: r, ...t })
    );
    await e.run(s, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      _r(n, { file: r, ...e || t })
    );
  };
}
function Dr(e) {
  if (e)
    throw e;
}
var dn, Lr;
function Zo() {
  if (Lr) return dn;
  Lr = 1;
  var e = Object.prototype.hasOwnProperty, t = Object.prototype.toString, n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, s = function(u) {
    return typeof Array.isArray == "function" ? Array.isArray(u) : t.call(u) === "[object Array]";
  }, i = function(u) {
    if (!u || t.call(u) !== "[object Object]")
      return !1;
    var c = e.call(u, "constructor"), f = u.constructor && u.constructor.prototype && e.call(u.constructor.prototype, "isPrototypeOf");
    if (u.constructor && !c && !f)
      return !1;
    var h;
    for (h in u)
      ;
    return typeof h > "u" || e.call(u, h);
  }, a = function(u, c) {
    n && c.name === "__proto__" ? n(u, c.name, {
      enumerable: !0,
      configurable: !0,
      value: c.newValue,
      writable: !0
    }) : u[c.name] = c.newValue;
  }, o = function(u, c) {
    if (c === "__proto__")
      if (e.call(u, c)) {
        if (r)
          return r(u, c).value;
      } else return;
    return u[c];
  };
  return dn = function p() {
    var u, c, f, h, d, y, v = arguments[0], P = 1, j = arguments.length, S = !1;
    for (typeof v == "boolean" && (S = v, v = arguments[1] || {}, P = 2), (v == null || typeof v != "object" && typeof v != "function") && (v = {}); P < j; ++P)
      if (u = arguments[P], u != null)
        for (c in u)
          f = o(v, c), h = o(u, c), v !== h && (S && h && (i(h) || (d = s(h))) ? (d ? (d = !1, y = f && s(f) ? f : []) : y = f && i(f) ? f : {}, a(v, { name: c, newValue: p(S, y, h) })) : typeof h < "u" && a(v, { name: c, newValue: h }));
    return v;
  }, dn;
}
var eu = Zo();
const pn = /* @__PURE__ */ Vr(eu);
function In(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function tu() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...s) {
    let i = -1;
    const a = s.pop();
    if (typeof a != "function")
      throw new TypeError("Expected function as last argument, not " + a);
    o(null, ...s);
    function o(p, ...u) {
      const c = e[++i];
      let f = -1;
      if (p) {
        a(p);
        return;
      }
      for (; ++f < s.length; )
        (u[f] === null || u[f] === void 0) && (u[f] = s[f]);
      s = u, c ? nu(c, o)(...u) : a(null, ...u);
    }
  }
  function r(s) {
    if (typeof s != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + s
      );
    return e.push(s), t;
  }
}
function nu(e, t) {
  let n;
  return r;
  function r(...a) {
    const o = e.length > a.length;
    let p;
    o && a.push(s);
    try {
      p = e.apply(this, a);
    } catch (u) {
      const c = (
        /** @type {Error} */
        u
      );
      if (o && n)
        throw c;
      return s(c);
    }
    o || (p && p.then && typeof p.then == "function" ? p.then(i, s) : p instanceof Error ? s(p) : i(p));
  }
  function s(a, ...o) {
    n || (n = !0, t(a, ...o));
  }
  function i(a) {
    s(null, a);
  }
}
const De = { basename: ru, dirname: iu, extname: su, join: lu, sep: "/" };
function ru(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  Ct(e);
  let n = 0, r = -1, s = e.length, i;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; s--; )
      if (e.codePointAt(s) === 47) {
        if (i) {
          n = s + 1;
          break;
        }
      } else r < 0 && (i = !0, r = s + 1);
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e)
    return "";
  let a = -1, o = t.length - 1;
  for (; s--; )
    if (e.codePointAt(s) === 47) {
      if (i) {
        n = s + 1;
        break;
      }
    } else
      a < 0 && (i = !0, a = s + 1), o > -1 && (e.codePointAt(s) === t.codePointAt(o--) ? o < 0 && (r = s) : (o = -1, r = a));
  return n === r ? r = a : r < 0 && (r = e.length), e.slice(n, r);
}
function iu(e) {
  if (Ct(e), e.length === 0)
    return ".";
  let t = -1, n = e.length, r;
  for (; --n; )
    if (e.codePointAt(n) === 47) {
      if (r) {
        t = n;
        break;
      }
    } else r || (r = !0);
  return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function su(e) {
  Ct(e);
  let t = e.length, n = -1, r = 0, s = -1, i = 0, a;
  for (; t--; ) {
    const o = e.codePointAt(t);
    if (o === 47) {
      if (a) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (a = !0, n = t + 1), o === 46 ? s < 0 ? s = t : i !== 1 && (i = 1) : s > -1 && (i = -1);
  }
  return s < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  i === 0 || // The (right-most) trimmed path component is exactly `..`.
  i === 1 && s === n - 1 && s === r + 1 ? "" : e.slice(s, n);
}
function lu(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    Ct(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : au(n);
}
function au(e) {
  Ct(e);
  const t = e.codePointAt(0) === 47;
  let n = ou(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function ou(e, t) {
  let n = "", r = 0, s = -1, i = 0, a = -1, o, p;
  for (; ++a <= e.length; ) {
    if (a < e.length)
      o = e.codePointAt(a);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(s === a - 1 || i === 1)) if (s !== a - 1 && i === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (p = n.lastIndexOf("/"), p !== n.length - 1) {
              p < 0 ? (n = "", r = 0) : (n = n.slice(0, p), r = n.length - 1 - n.lastIndexOf("/")), s = a, i = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, s = a, i = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(s + 1, a) : n = e.slice(s + 1, a), r = a - s - 1;
      s = a, i = 0;
    } else o === 46 && i > -1 ? i++ : i = -1;
  }
  return n;
}
function Ct(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const uu = { cwd: cu };
function cu() {
  return "/";
}
function Pn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function du(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Pn(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return pu(e);
}
function pu(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
      const r = t.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const s = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw s.code = "ERR_INVALID_FILE_URL_PATH", s;
      }
    }
  return decodeURIComponent(t);
}
const fn = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class Ti {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(t) {
    let n;
    t ? Pn(t) ? n = { path: t } : typeof t == "string" || fu(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : uu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < fn.length; ) {
      const i = fn[r];
      i in n && n[i] !== void 0 && n[i] !== null && (this[i] = i === "history" ? [...n[i]] : n[i]);
    }
    let s;
    for (s in n)
      fn.includes(s) || (this[s] = n[s]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? De.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(t) {
    mn(t, "basename"), hn(t, "basename"), this.path = De.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? De.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(t) {
    Fr(this.basename, "dirname"), this.path = De.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? De.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(t) {
    if (hn(t, "extname"), Fr(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = De.join(this.dirname, this.stem + (t || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(t) {
    Pn(t) && (t = du(t)), mn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? De.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(t) {
    mn(t, "stem"), hn(t, "stem"), this.path = De.join(this.dirname || "", t + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(t, n, r) {
    const s = this.message(t, n, r);
    throw s.fatal = !0, s;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(t, n, r) {
    const s = this.message(t, n, r);
    return s.fatal = void 0, s;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(t, n, r) {
    const s = new pe(
      // @ts-expect-error: the overloads are fine.
      t,
      n,
      r
    );
    return this.path && (s.name = this.path + ":" + s.name, s.file = this.path), s.fatal = !1, this.messages.push(s), s;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function hn(e, t) {
  if (e && e.includes(De.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + De.sep + "`"
    );
}
function mn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function Fr(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function fu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const hu = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), s = r[e], i = function() {
      return s.apply(i, arguments);
    };
    return Object.setPrototypeOf(i, r), i;
  }
), mu = {}.hasOwnProperty;
class Vn extends hu {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = tu();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const t = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new Vn()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(pn(!0, {}, this.namespace)), t;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (yn("data", this.frozen), this.namespace[t] = n, this) : mu.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (yn("data", this.frozen), this.namespace = t, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const t = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const s = n.call(t, ...r);
      typeof s == "function" && this.transformers.use(s);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(t) {
    this.freeze();
    const n = Lt(t), r = this.parser || this.Parser;
    return xn("parse", r), r(String(n), n);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(t, n) {
    const r = this;
    return this.freeze(), xn("process", this.parser || this.Parser), gn("process", this.compiler || this.Compiler), n ? s(void 0, n) : new Promise(s);
    function s(i, a) {
      const o = Lt(t), p = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(p, o, function(c, f, h) {
        if (c || !f || !h)
          return u(c);
        const d = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          f
        ), y = r.stringify(d, h);
        yu(y) ? h.value = y : h.result = y, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          h
        );
      });
      function u(c, f) {
        c || !f ? a(c) : i ? i(f) : n(void 0, f);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(t) {
    let n = !1, r;
    return this.freeze(), xn("processSync", this.parser || this.Parser), gn("processSync", this.compiler || this.Compiler), this.process(t, s), $r("processSync", "process", n), r;
    function s(i, a) {
      n = !0, Dr(i), r = a;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(t, n, r) {
    zr(t), this.freeze();
    const s = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? i(void 0, r) : new Promise(i);
    function i(a, o) {
      const p = Lt(n);
      s.run(t, p, u);
      function u(c, f, h) {
        const d = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          f || t
        );
        c ? o(c) : a ? a(d) : r(void 0, d, h);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(t, n) {
    let r = !1, s;
    return this.run(t, n, i), $r("runSync", "run", r), s;
    function i(a, o) {
      Dr(a), s = o, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(t, n) {
    this.freeze();
    const r = Lt(n), s = this.compiler || this.Compiler;
    return gn("stringify", s), zr(t), s(t, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(t, ...n) {
    const r = this.attachers, s = this.namespace;
    if (yn("use", this.frozen), t != null) if (typeof t == "function")
      p(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? o(t) : a(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function i(u) {
      if (typeof u == "function")
        p(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [c, ...f] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          p(c, f);
        } else
          a(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function a(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(u.plugins), u.settings && (s.settings = pn(!0, s.settings, u.settings));
    }
    function o(u) {
      let c = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++c < u.length; ) {
          const f = u[c];
          i(f);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function p(u, c) {
      let f = -1, h = -1;
      for (; ++f < r.length; )
        if (r[f][0] === u) {
          h = f;
          break;
        }
      if (h === -1)
        r.push([u, ...c]);
      else if (c.length > 0) {
        let [d, ...y] = c;
        const v = r[h][1];
        In(v) && In(d) && (d = pn(!0, v, d)), r[h] = [u, d, ...y];
      }
    }
  }
}
const xu = new Vn().freeze();
function xn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function gn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function yn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function zr(e) {
  if (!In(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function $r(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function Lt(e) {
  return gu(e) ? e : new Ti(e);
}
function gu(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function yu(e) {
  return typeof e == "string" || bu(e);
}
function bu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const ju = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Mr = [], Br = { allowDangerousHtml: !0 }, vu = /^(https?|ircs?|mailto|xmpp)$/i, ku = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  { from: "className", id: "remove-classname" },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function Ii(e) {
  const t = wu(e), n = Nu(e);
  return Su(t.runSync(t.parse(n), n), e);
}
function wu(e) {
  const t = e.rehypePlugins || Mr, n = e.remarkPlugins || Mr, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Br } : Br;
  return xu().use(no).use(n).use(Qo, r).use(t);
}
function Nu(e) {
  const t = e.children || "", n = new Ti();
  return typeof t == "string" && (n.value = t), n;
}
function Su(e, t) {
  const n = t.allowedElements, r = t.allowElement, s = t.components, i = t.disallowedElements, a = t.skipHtml, o = t.unwrapDisallowed, p = t.urlTransform || Cu;
  for (const c of ku)
    Object.hasOwn(t, c.from) && ("" + c.from + (c.to ? "use `" + c.to + "` instead" : "remove it") + ju + c.id, void 0);
  return Ei(e, u), Ds(e, {
    Fragment: l.Fragment,
    components: s,
    ignoreInvalidStyle: !0,
    jsx: l.jsx,
    jsxs: l.jsxs,
    passKeys: !0,
    passNode: !0
  });
  function u(c, f, h) {
    if (c.type === "raw" && h && typeof f == "number")
      return a ? h.children.splice(f, 1) : h.children[f] = { type: "text", value: c.value }, f;
    if (c.type === "element") {
      let d;
      for (d in on)
        if (Object.hasOwn(on, d) && Object.hasOwn(c.properties, d)) {
          const y = c.properties[d], v = on[d];
          (v === null || v.includes(c.tagName)) && (c.properties[d] = p(String(y || ""), d, c));
        }
    }
    if (c.type === "element") {
      let d = n ? !n.includes(c.tagName) : i ? i.includes(c.tagName) : !1;
      if (!d && r && typeof f == "number" && (d = !r(c, f, h)), d && h && typeof f == "number")
        return o && c.children ? h.children.splice(f, 1, ...c.children) : h.children.splice(f, 1), f;
    }
  }
}
function Cu(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), s = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    s !== -1 && t > s || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    vu.test(e.slice(0, t)) ? e : ""
  );
}
const Eu = ({ description: e }) => /* @__PURE__ */ l.jsx("div", { className: "text-sm text-gray-500 prose max-w-none", children: /* @__PURE__ */ l.jsx(Ii, { children: e }) }), Tu = ({ name: e, required: t, deprecated: n }) => /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-2", children: [
  /* @__PURE__ */ l.jsx("span", { className: `font-mono text-sm font-medium ${n ? "line-through text-red-500" : ""}`, children: e }),
  t && /* @__PURE__ */ l.jsx("span", { className: "bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded font-semibold", children: "required" })
] }), wt = ({ schema: e, className: t }) => {
  const n = [];
  return e.minimum !== void 0 && n.push({ label: "Minimum", value: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    e.minimum,
    e.exclusiveMinimum && " (exclusive)"
  ] }) }), e.maximum !== void 0 && n.push({ label: "Maximum", value: /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    e.maximum,
    e.exclusiveMaximum && " (exclusive)"
  ] }) }), e.minLength !== void 0 && n.push({ label: "Min Length", value: e.minLength }), e.maxLength !== void 0 && n.push({ label: "Max Length", value: e.maxLength }), e.pattern && n.push({ label: "Pattern", value: /* @__PURE__ */ l.jsx("code", { className: "text-xs font-mono bg-gray-100 px-1 rounded", children: e.pattern }) }), e.minItems !== void 0 && n.push({ label: "Min Items", value: e.minItems }), e.maxItems !== void 0 && n.push({ label: "Max Items", value: e.maxItems }), e.uniqueItems && n.push({ label: "Unique Items", value: "true" }), e.minProperties !== void 0 && n.push({ label: "Min Properties", value: e.minProperties }), e.maxProperties !== void 0 && n.push({ label: "Max Properties", value: e.maxProperties }), n.length === 0 ? null : /* @__PURE__ */ l.jsxs("div", { className: t, children: [
    /* @__PURE__ */ l.jsx("h4", { className: "text-xs font-semibold mb-1", children: "Constraints" }),
    /* @__PURE__ */ l.jsx("ul", { className: "text-xs text-gray-600 pl-4 list-disc space-y-0.5", children: n.map((r) => /* @__PURE__ */ l.jsxs("li", { children: [
      /* @__PURE__ */ l.jsxs("span", { className: "font-medium", children: [
        r.label,
        ":"
      ] }),
      " ",
      r.value
    ] }, r.label)) })
  ] });
}, Iu = ({ style: e, className: t }) => /* @__PURE__ */ l.jsx(
  "span",
  {
    className: `px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 ${t || ""}`,
    children: e
  }
), qr = {
  primary: "text-blue-800",
  // number/integer
  secondary: "text-purple-800",
  // array
  success: "text-green-800",
  // string
  warning: "text-yellow-800",
  // boolean
  danger: "text-red-800",
  // (Currently unused, could be for invalid/error types)
  info: "text-indigo-800",
  // object
  neutral: "text-gray-500"
  // null & default (using the gray-500 from your last FormatBadge change)
}, Pu = (e) => {
  switch (e) {
    case "string":
      return "success";
    case "number":
    case "integer":
      return "primary";
    case "boolean":
      return "warning";
    case "array":
      return "secondary";
    case "object":
      return "info";
    case "null":
      return "neutral";
    default:
      return "neutral";
  }
}, lt = ({ type: e, theme: t = "auto", className: n, children: r }) => {
  const s = t === "auto" ? Pu(e) : t, i = qr[s] || qr.neutral;
  return /* @__PURE__ */ l.jsxs(
    "span",
    {
      className: `text-xs font-medium font-mono ${i} ${n || ""}`,
      children: [
        r || e,
        " "
      ]
    }
  );
}, le = ({ description: e, className: t }) => /* @__PURE__ */ l.jsx("div", { className: `text-sm text-gray-500 prose max-w-none ${t}`, children: /* @__PURE__ */ l.jsx(Ii, { children: e }) }), Vt = ({ examples: e, components: t }) => {
  const n = Object.entries(e).map(([r, s]) => {
    const i = ue(s, t, "examples");
    if (!i) {
      const a = s && typeof s == "object" && "$ref" in s ? s.$ref : "[unknown reference]";
      return console.warn(`[ExamplesDisplay] Failed to resolve example ref: ${a} for key ${r}`), null;
    }
    return { key: r, ...i };
  }).filter((r) => r !== null);
  return n.length === 0 ? null : /* @__PURE__ */ l.jsx("div", { className: "space-y-3", children: n.map((r) => /* @__PURE__ */ l.jsxs("div", { className: "border border-gray-200 rounded p-3", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex justify-between items-start mb-1", children: [
      /* @__PURE__ */ l.jsx("span", { className: "font-semibold text-sm", children: r.key }),
      r.summary && /* @__PURE__ */ l.jsx("span", { className: "text-xs text-gray-600 text-right", children: r.summary })
    ] }),
    r.description && /* @__PURE__ */ l.jsx(le, { description: r.description, className: "text-xs mb-2" }),
    r.value !== void 0 && /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx("pre", { className: "bg-gray-100 p-2 rounded font-mono text-xs overflow-x-auto", children: /* @__PURE__ */ l.jsx("code", { children: JSON.stringify(r.value, null, 2) }) }) })
  ] }, r.key)) });
}, Wt = ({
  isExpanded: e,
  onToggle: t,
  className: n
}) => /* @__PURE__ */ l.jsx(
  "button",
  {
    type: "button",
    onClick: t,
    className: `flex items-center text-xs font-medium text-gray-500 hover:text-gray-700 ${n || ""}`,
    "aria-expanded": e,
    children: /* @__PURE__ */ l.jsx(
      "svg",
      {
        className: `ml-1 h-4 w-4 transition-transform duration-200 ${e ? "rotate-180" : ""}`,
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
        children: /* @__PURE__ */ l.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
      }
    )
  }
), Pi = ({
  name: e,
  in: t,
  required: n,
  description: r,
  deprecated: s,
  schema: i,
  style: a,
  explode: o,
  examples: p,
  components: u,
  className: c
}) => {
  const [f, h] = ee(!1), d = i.default !== void 0 || i.enum || p || r || i.minimum !== void 0 || i.maximum !== void 0 || i.minLength !== void 0 || i.maxLength !== void 0 || i.pattern;
  return /* @__PURE__ */ l.jsxs("div", { className: `border rounded-md overflow-hidden ${s ? "border-red-300" : "border-gray-300"} ${c}`, children: [
    /* @__PURE__ */ l.jsxs("div", { className: "p-3 flex flex-wrap items-center justify-between gap-2", onClick: () => h(!f), children: [
      /* @__PURE__ */ l.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ l.jsx(Tu, { name: e, required: n, deprecated: s }),
        s && /* @__PURE__ */ l.jsx($e, {}),
        /* @__PURE__ */ l.jsx(ls, { type: t }),
        i.type && /* @__PURE__ */ l.jsx(lt, { type: i.type }),
        i.format && /* @__PURE__ */ l.jsx(Bt, { format: i.format }),
        a && /* @__PURE__ */ l.jsx(Iu, { style: a }),
        o && /* @__PURE__ */ l.jsx("span", { className: "bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded", children: "explode" })
      ] }),
      d && /* @__PURE__ */ l.jsx(
        Wt,
        {
          isExpanded: f,
          onToggle: () => h(!f),
          label: f ? "Hide details" : "Show details"
        }
      )
    ] }),
    f && d && /* @__PURE__ */ l.jsxs("div", { className: "p-4 border-t border-gray-200 flex flex-col gap-3", children: [
      r && /* @__PURE__ */ l.jsxs("div", { className: "", children: [
        /* @__PURE__ */ l.jsx("h4", { className: "text-xs font-semibold mb-1 text-gray-500", children: "Description" }),
        /* @__PURE__ */ l.jsx(Eu, { description: r })
      ] }),
      /* @__PURE__ */ l.jsx(vt, { value: i.default }),
      /* @__PURE__ */ l.jsx(jt, { values: i.enum || [] }),
      /* @__PURE__ */ l.jsx(wt, { schema: i }),
      p && Object.keys(p).length > 0 && /* @__PURE__ */ l.jsx(Vt, { examples: p, components: u })
    ] })
  ] });
};
function Oi(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var s = e.length;
    for (t = 0; t < s; t++) e[t] && (n = Oi(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Et() {
  for (var e, t, n = 0, r = "", s = arguments.length; n < s; n++) (e = arguments[n]) && (t = Oi(e)) && (r && (r += " "), r += t);
  return r;
}
const bn = {
  GET: { text: "text-green-600", bg: "bg-green-100" },
  POST: { text: "text-blue-600", bg: "bg-blue-100" },
  PUT: { text: "text-yellow-600", bg: "bg-yellow-100" },
  DELETE: { text: "text-red-600", bg: "bg-red-100" },
  PATCH: { text: "text-purple-600", bg: "bg-purple-100" },
  OPTIONS: { text: "text-gray-600", bg: "bg-gray-100" },
  HEAD: { text: "text-gray-600", bg: "bg-gray-100" }
}, Nt = ({ method: e, variant: t = "default", className: n }) => {
  const r = t === "compact" ? bn[e].text + " font-semibold text-xs" : bn[e].text + " " + bn[e].bg + " px-2 py-1 text-xs font-semibold rounded";
  return /* @__PURE__ */ l.jsx(
    "span",
    {
      className: Et(
        r,
        n
      ),
      children: e
    }
  );
}, jn = ({ path: e, isParameter: t = !1, className: n }) => /* @__PURE__ */ l.jsx(
  "span",
  {
    className: Et(
      "text-sm font-mono",
      t ? "text-blue-600" : "text-gray-800",
      n
    ),
    children: e
  }
), Ou = ({ path: e, className: t }) => {
  const n = e.split(/(?=\/)/g), r = (i) => /{([^}]+)}/.test(i), s = (i, a) => {
    if (r(i)) {
      const p = i.split(/{([^}]+)}/);
      return /* @__PURE__ */ l.jsx(On.Fragment, { children: p.map((u, c) => c % 2 === 0 ? u ? /* @__PURE__ */ l.jsx(jn, { path: u }, `${a}-${c}`) : null : /* @__PURE__ */ l.jsx(
        jn,
        {
          path: `{${u}}`,
          isParameter: !0
        },
        `${a}-${c}`
      )) }, a);
    }
    return /* @__PURE__ */ l.jsx(jn, { path: i }, a);
  };
  return /* @__PURE__ */ l.jsx("div", { className: Et("flex flex-wrap items-center", t), children: n.map((i, a) => s(i, a)) });
};
function Yt(e) {
  const t = e == null ? void 0 : e.components, n = vn(() => function(d, y) {
    return ue(d, t, y);
  }, [t]), r = (h) => {
    if (!h) return "未知";
    const d = n(h, "schemas");
    if (!d) return "未知";
    let y = d.type || "";
    if (y === "array" && d.items) {
      const v = r(d.items);
      return `${y}<${v}>`;
    }
    if (y === "object" || !y) {
      if (d.properties)
        return "object";
      if (d.allOf)
        return "allOf";
      if (d.oneOf)
        return "oneOf";
      if (d.anyOf)
        return "anyOf";
    }
    return d.format ? `${y}(${d.format})` : y || "未知";
  }, s = (h) => {
    var P, j;
    if (!h) return null;
    const d = n(h, "requestBodies");
    if (!d || !d.content) return null;
    const y = ["application/json", "application/xml", "*/*"];
    for (const S of y)
      if ((P = d.content[S]) != null && P.schema)
        return n(d.content[S].schema, "schemas") || null;
    const v = Object.keys(d.content)[0];
    return v && ((j = d.content[v]) != null && j.schema) && n(d.content[v].schema, "schemas") || null;
  }, i = (h) => {
    if (!h) return {};
    const d = n(h, "schemas");
    if (!d) return {};
    if (d.properties)
      return d.properties;
    if (d.type === "array" && d.items) {
      const y = n(d.items, "schemas");
      if (y != null && y.properties)
        return y.properties;
    }
    if (d.allOf) {
      const y = {};
      for (const v of d.allOf) {
        const P = i(v);
        Object.assign(y, P);
      }
      return y;
    }
    return {};
  };
  return {
    spec: e,
    components: t,
    resolve: n,
    getSchemaType: r,
    getRequestBodySchema: s,
    getSchemaProperties: i,
    processParameters: (h) => {
      if (!h || h.length === 0)
        return {};
      const d = {
        path: [],
        query: [],
        header: [],
        cookie: []
      };
      for (const y of h) {
        const v = n(y, "parameters");
        v && v.in && d[v.in].push(v);
      }
      return d;
    },
    processResponse: (h) => {
      var y;
      if (!h) return null;
      const d = n(h, "responses");
      if (!d) return null;
      if (d.content) {
        const v = ["application/json", "application/xml", "*/*"];
        for (const j of v)
          if ((y = d.content[j]) != null && y.schema)
            return {
              description: d.description || "",
              contentType: j,
              schema: n(d.content[j].schema, "schemas")
            };
        const P = Object.keys(d.content)[0];
        if (P)
          return {
            description: d.description || "",
            contentType: P,
            schema: n(d.content[P].schema, "schemas")
          };
      }
      return {
        description: d.description || "",
        contentType: "",
        schema: null
      };
    },
    getSchemaConstraints: (h) => {
      if (!h) return {};
      const d = n(h, "schemas");
      if (!d) return {};
      const y = {};
      return d.minimum !== void 0 && (y.minimum = d.minimum), d.maximum !== void 0 && (y.maximum = d.maximum), d.exclusiveMinimum !== void 0 && (y.exclusiveMinimum = d.exclusiveMinimum), d.exclusiveMaximum !== void 0 && (y.exclusiveMaximum = d.exclusiveMaximum), d.multipleOf !== void 0 && (y.multipleOf = d.multipleOf), d.minLength !== void 0 && (y.minLength = d.minLength), d.maxLength !== void 0 && (y.maxLength = d.maxLength), d.pattern !== void 0 && (y.pattern = d.pattern), d.minItems !== void 0 && (y.minItems = d.minItems), d.maxItems !== void 0 && (y.maxItems = d.maxItems), d.uniqueItems !== void 0 && (y.uniqueItems = d.uniqueItems), d.minProperties !== void 0 && (y.minProperties = d.minProperties), d.maxProperties !== void 0 && (y.maxProperties = d.maxProperties), d.required !== void 0 && (y.required = d.required), y;
    },
    getOperation: (h, d) => {
      if (!e.paths || !e.paths[h]) return null;
      const y = n(e.paths[h], "pathItems");
      if (!y) return null;
      const v = d.toLowerCase();
      return v in y ? n(y[v], "operations") : null;
    },
    getServers: () => e.servers || [],
    getOperationsByTag: () => {
      if (!e.paths) return {};
      const h = {};
      return e.tags && e.tags.forEach((d) => {
        h[d.name] = [];
      }), h.未分类 = [], Object.entries(e.paths).forEach(([d, y]) => {
        const v = n(y, "pathItems");
        if (!v) return;
        ["get", "post", "put", "delete", "patch", "options", "head", "trace"].forEach((j) => {
          if (j in v) {
            const S = n(v[j], "operations");
            if (!S) return;
            S.tags && S.tags.length > 0 ? S.tags.forEach((w) => {
              h[w] || (h[w] = []), h[w].push({ path: d, method: j, operation: S });
            }) : h.未分类.push({ path: d, method: j, operation: S });
          }
        });
      }), Object.keys(h).forEach((d) => {
        h[d].length === 0 && delete h[d];
      }), h;
    }
  };
}
const Au = ({ parameters: e, components: t, className: n }) => !e || e.length === 0 ? null : /* @__PURE__ */ l.jsxs("div", { className: n, children: [
  /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-semibold mb-3", children: "Parameters" }),
  /* @__PURE__ */ l.jsx("div", { className: "space-y-3", children: e.map((r, s) => {
    const i = ue(r, t, "parameters");
    if (!i) {
      const a = r && typeof r == "object" && "$ref" in r ? r.$ref : `[invalid parameter at index ${s}]`;
      return /* @__PURE__ */ l.jsxs("div", { className: "text-xs text-red-500 p-1 border border-dashed rounded", children: [
        "Failed to resolve parameter: ",
        a
      ] }, s);
    }
    return /* @__PURE__ */ l.jsx(
      Pi,
      {
        ...i,
        name: i.name,
        required: i.required ?? !1,
        schema: i.schema && "type" in i.schema ? i.schema : {},
        style: i.style
      },
      `${i.name} -${i.in} -${s} `
    );
  }) })
] }), Ai = ({ code: e, size: t = "small", className: n }) => {
  const s = String(e).charAt(0), i = () => {
    switch (s) {
      case "1":
        return "bg-blue-100 text-blue-800";
      // Informational
      case "2":
        return "bg-green-100 text-green-800";
      // Success
      case "3":
        return "bg-yellow-100 text-yellow-800";
      // Redirection
      case "4":
        return "bg-orange-100 text-orange-800";
      // Client Error
      case "5":
        return "bg-red-100 text-red-800";
      // Server Error
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, a = {
    small: "px-2 py-1 text-xs",
    medium: "px-3 py-1.5 text-sm"
  };
  return /* @__PURE__ */ l.jsx(
    "span",
    {
      className: Et(
        "font-semibold rounded",
        a[t],
        i(),
        n
      ),
      children: e
    }
  );
}, Ri = () => /* @__PURE__ */ l.jsx("span", { className: "bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded font-semibold", children: "required" }), Ru = {
  allOf: "All Of",
  anyOf: "Any Of",
  oneOf: "One Of",
  not: "Not"
}, _u = (e) => {
  const t = e.match(/^#\/components\/([^/]+)\/(.+)$/);
  return t ? t[2] : null;
}, Ft = ({
  keyword: e,
  subschemas: t,
  components: n,
  currentDepth: r,
  className: s
}) => {
  if (!t || t.length === 0)
    return null;
  const i = Ru[e], a = {
    allOf: "border-blue-300",
    anyOf: "border-green-300",
    oneOf: "border-purple-300",
    not: "border-red-300"
  }[e];
  return /* @__PURE__ */ l.jsxs("div", { className: `mt-3 p-3 border rounded ${a} ${s}`, children: [
    /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-semibold mb-2 text-gray-700", children: i }),
    /* @__PURE__ */ l.jsx("div", { className: "space-y-3", children: t.map((o, p) => {
      const c = typeof o == "object" && o !== null && "$ref" in o ? _u(o.$ref) : null;
      return /* @__PURE__ */ l.jsxs("div", { children: [
        c && /* @__PURE__ */ l.jsxs("div", { className: "text-xs font-medium text-gray-500 mb-1", children: [
          "引用: ",
          c
        ] }),
        /* @__PURE__ */ l.jsx(
          Tt,
          {
            schema: o,
            components: n,
            currentDepth: r + 1
          }
        )
      ] }, p);
    }) })
  ] });
}, Du = 10, Lu = ({ isExpanded: e }) => /* @__PURE__ */ l.jsx(
  "svg",
  {
    className: `w-3 h-3 transition-transform duration-200 ease-in-out ${e ? "rotate-90" : "rotate-0"}`,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    children: /* @__PURE__ */ l.jsx("path", { d: "M9 5l7 7-7 7" })
  }
), Fu = (e, t) => {
  if (!e) return "any";
  const n = ue(e, t, "schemas");
  return n ? n.type ? n.type : n.properties || typeof n.additionalProperties == "object" ? "object" : n.items ? "array" : n.allOf || n.anyOf || n.oneOf ? "composition" : "any" : "unresolved";
}, zu = ({ propName: e, propSchemaOrRef: t, isRequired: n, components: r, currentDepth: s, className: i }) => {
  const [a, o] = ee(!0), p = () => o(!a), u = ue(t, r, "schemas");
  if (!u) {
    const T = t && typeof t == "object" && "$ref" in t ? t.$ref : "[invalid schema]";
    return /* @__PURE__ */ l.jsx("div", { className: "pl-3 my-2 border-l-2 border-gray-200", children: /* @__PURE__ */ l.jsxs("div", { className: "font-mono font-medium text-sm mb-1 text-black", children: [
      e,
      " ",
      /* @__PURE__ */ l.jsxs("span", { className: "text-red-500 text-xs", children: [
        "Error resolving ",
        T
      ] })
    ] }) });
  }
  const {
    type: c,
    format: f,
    description: h,
    default: d,
    enum: y,
    deprecated: v,
    items: P,
    // For potential inline array display
    properties: j,
    // To decide if recursive call is needed
    ...S
  } = u;
  let w = c || "any", F = !1;
  const M = c === "object" || j || typeof S.additionalProperties == "object", b = c === "array" || P;
  let $ = "";
  M && (w = "object", F = !0), b && ($ = Fu(P, r), w = `array[${$}]`, $ === "object" && (F = !0));
  const D = F, I = F ? "w-3" : "w-7", z = F ? "w-4" : "w-0";
  return /* @__PURE__ */ l.jsxs("div", { className: Et("py-1", i), role: "property-item", children: [
    /* @__PURE__ */ l.jsxs(
      "div",
      {
        className: `group flex items-center flex-wrap gap-x-1 mb-0.5 ${F ? "cursor-pointer" : ""}`,
        onClick: F ? p : void 0,
        role: "property-item-header",
        children: [
          /* @__PURE__ */ l.jsx("div", { className: `${I} border-t border-gray-200 group-hover:border-gray-300 flex-shrink-0` }),
          /* @__PURE__ */ l.jsx("span", { className: `${z} inline-flex items-center justify-center h-5`, children: F && /* @__PURE__ */ l.jsx("span", { className: "text-gray-400", children: /* @__PURE__ */ l.jsx(Lu, { isExpanded: a }) }) }),
          /* @__PURE__ */ l.jsx("span", { className: "font-mono text-sm text-black group-hover:text-gray-900", children: e }),
          /* @__PURE__ */ l.jsx(lt, { type: w, children: w }),
          f && /* @__PURE__ */ l.jsx(Bt, { format: f, className: "text-gray-400" }),
          v && /* @__PURE__ */ l.jsx($e, {}),
          n && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
            /* @__PURE__ */ l.jsx("div", { className: "h-px self-center ml-1 flex-grow border-t border-transparent group-hover:border-gray-300 transition-colors duration-150" }),
            /* @__PURE__ */ l.jsx("div", { className: "flex-shrink-0 flex items-center", children: /* @__PURE__ */ l.jsx(Ri, {}) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ l.jsxs("div", { className: `pl-10 transition-all duration-300 ease-in-out overflow-hidden ${a ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`, role: "property-item-content", children: [
      h && /* @__PURE__ */ l.jsx(le, { description: h, className: "text-sm text-gray-500 mb-1 pt-0.5" }),
      d && /* @__PURE__ */ l.jsx(vt, { value: d, className: "text-xs text-gray-500 mb-0.5" }),
      y && /* @__PURE__ */ l.jsx(jt, { values: y || [], className: "text-xs text-gray-500 mb-0.5" }),
      Object.keys(S).length > 0 && /* @__PURE__ */ l.jsx(wt, { schema: { ...u, default: void 0, enum: void 0 }, className: "text-xs text-gray-500" }),
      D && /* @__PURE__ */ l.jsx("div", { className: "mt-1 pb-0.5", role: "property-item-content-children", children: /* @__PURE__ */ l.jsx(
        nt,
        {
          schema: u,
          components: r,
          _currentDepth: s + 1,
          className: "border-none p-0"
        }
      ) })
    ] })
  ] });
}, nt = ({
  schema: e,
  components: t,
  _currentDepth: n = 0,
  className: r
}) => {
  const s = typeof e == "object" && "$ref" in e, i = s ? e.$ref : null, a = ue(e, t, "schemas");
  if (!a) {
    const D = e && typeof e == "object" && "$ref" in e ? e.$ref : "[invalid schema object]";
    return /* @__PURE__ */ l.jsxs("div", { className: `text-xs text-red-500 p-1 border border-dashed rounded ${r}`, children: [
      "Failed to resolve schema: ",
      D
    ] });
  }
  if (n > Du)
    return /* @__PURE__ */ l.jsx("div", { className: `text-xs text-orange-500 p-1 border border-dashed rounded ${r}`, children: "Max schema depth reached. Possible circular reference." });
  const {
    type: o,
    format: p,
    description: u,
    default: c,
    enum: f,
    deprecated: h,
    properties: d,
    required: y,
    items: v,
    additionalProperties: P,
    allOf: j,
    anyOf: S,
    oneOf: w,
    not: F,
    ...M
  } = a, b = () => /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    j && /* @__PURE__ */ l.jsx(Ft, { keyword: "allOf", subschemas: j, components: t, currentDepth: n }),
    S && /* @__PURE__ */ l.jsx(Ft, { keyword: "anyOf", subschemas: S, components: t, currentDepth: n }),
    w && /* @__PURE__ */ l.jsx(Ft, { keyword: "oneOf", subschemas: w, components: t, currentDepth: n }),
    F && /* @__PURE__ */ l.jsx(Ft, { keyword: "not", subschemas: [F], components: t, currentDepth: n })
  ] }), $ = (D = !0) => /* @__PURE__ */ l.jsxs("div", { className: "space-y-2", children: [
    h && /* @__PURE__ */ l.jsx($e, {}),
    u && /* @__PURE__ */ l.jsx(le, { description: u, className: "text-sm mt-1" }),
    /* @__PURE__ */ l.jsx(vt, { value: c }),
    /* @__PURE__ */ l.jsx(jt, { values: f || [] }),
    D && /* @__PURE__ */ l.jsx(wt, { schema: a })
  ] });
  switch (o) {
    case "string":
    case "number":
    case "integer":
    case "boolean":
    case "null":
      return /* @__PURE__ */ l.jsxs("div", { className: `p-2 border rounded bg-gray-50/50 ${r}`, children: [
        /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
          o && /* @__PURE__ */ l.jsx(lt, { type: o }),
          p && /* @__PURE__ */ l.jsx(Bt, { format: p }),
          h && /* @__PURE__ */ l.jsx($e, {})
        ] }),
        u && /* @__PURE__ */ l.jsx(le, { description: u, className: "text-sm mt-1 mb-1" }),
        /* @__PURE__ */ l.jsx(vt, { value: c, className: "text-xs mb-1" }),
        /* @__PURE__ */ l.jsx(jt, { values: f || [], className: "text-xs mb-1" }),
        /* @__PURE__ */ l.jsx(wt, { schema: { ...a, default: void 0, enum: void 0, description: void 0, deprecated: void 0 }, className: "text-xs" }),
        b()
      ] });
    case "object":
      return /* @__PURE__ */ l.jsxs("div", { className: `${r}`, children: [
        n === 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
            /* @__PURE__ */ l.jsx(lt, { type: "object" }),
            h && /* @__PURE__ */ l.jsx($e, {})
          ] }),
          u && /* @__PURE__ */ l.jsx(le, { description: u, className: "text-sm text-gray-600 mt-1 mb-2" })
        ] }),
        b(),
        d && Object.keys(d).length > 0 && /* @__PURE__ */ l.jsx("div", { className: "mt-1 border-l border-gray-200", children: Object.entries(d).map(([D, I]) => /* @__PURE__ */ l.jsx(
          zu,
          {
            propName: D,
            propSchemaOrRef: I,
            isRequired: (y || []).includes(D),
            components: t,
            currentDepth: n
          },
          D
        )) }),
        P !== void 0 && P !== !1 && /* @__PURE__ */ l.jsxs("div", { className: "mt-2 pl-4 py-2 border-l border-dashed border-gray-300", children: [
          /* @__PURE__ */ l.jsx("h4", { className: "text-xs font-semibold italic text-gray-500 mb-1", children: "Additional Properties" }),
          P === !0 ? /* @__PURE__ */ l.jsx("span", { className: "text-sm text-gray-600", children: "Allowed: Yes (any type)" }) : /* @__PURE__ */ l.jsx(
            nt,
            {
              schema: P,
              components: t,
              _currentDepth: n + 1,
              className: "border-none p-0 mt-1"
            }
          )
        ] })
      ] });
    case "array":
      return /* @__PURE__ */ l.jsxs("div", { className: `${r}`, children: [
        n === 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
            s && i && /* @__PURE__ */ l.jsx("span", { className: "text-xs text-gray-500 italic", children: i }),
            /* @__PURE__ */ l.jsx(lt, { type: "array" }),
            h && /* @__PURE__ */ l.jsx($e, {})
          ] }),
          u && /* @__PURE__ */ l.jsx(le, { description: u, className: "text-sm text-gray-600 mt-1 mb-2" })
        ] }),
        b(),
        v ? /* @__PURE__ */ l.jsx("div", { className: "mt-1", children: /* @__PURE__ */ l.jsx(
          nt,
          {
            schema: v,
            components: t,
            _currentDepth: n + 1,
            className: "border-none p-0"
          }
        ) }) : /* @__PURE__ */ l.jsx("div", { className: "mt-1 text-xs text-orange-500 ml-1", children: "Array 'items' definition is missing." })
      ] });
    default:
      if (j || S || w || F)
        return /* @__PURE__ */ l.jsxs("div", { className: `p-2 border rounded border-dashed border-gray-300 ${r}`, children: [
          /* @__PURE__ */ l.jsx("span", { className: "text-xs text-gray-500 italic", children: "Composition Schema" }),
          h && /* @__PURE__ */ l.jsx($e, {}),
          u && /* @__PURE__ */ l.jsx(le, { description: u, className: "text-sm mt-1 mb-1" }),
          $(),
          b()
        ] });
      if (d || typeof P == "object") {
        console.warn("[SchemaDisplay] Schema treated as 'object' due to presence of 'properties' or 'additionalProperties':", a);
        const D = { ...a, type: "object" };
        return /* @__PURE__ */ l.jsx(nt, { schema: D, components: t, _currentDepth: n, className: r });
      }
      if (v) {
        console.warn("[SchemaDisplay] Schema treated as 'array' due to presence of 'items':", a);
        const D = { ...a, type: "array" };
        return /* @__PURE__ */ l.jsx(nt, { schema: D, components: t, _currentDepth: n, className: r });
      }
      return /* @__PURE__ */ l.jsxs("div", { className: `text-xs text-gray-500 p-1 border border-dashed rounded ${r}`, children: [
        "Unknown or underspecified schema type.",
        u && /* @__PURE__ */ l.jsx(le, { description: u, className: "block mt-1" }),
        b()
      ] });
  }
}, Tt = (e) => /* @__PURE__ */ l.jsx(nt, { ...e, _currentDepth: e.currentDepth || 0 }), $u = ({ status: e, response: t, components: n }) => {
  var i, a;
  const r = t.content ? Object.keys(t.content) : [], s = r.find((o) => o.includes("json")) || r[0];
  return /* @__PURE__ */ l.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ l.jsx(Ai, { code: e }),
      t.description && /* @__PURE__ */ l.jsx("span", { className: "text-gray-700 text-sm", children: t.description })
    ] }),
    r.length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx("div", { className: "flex flex-wrap gap-1", children: r.map((o) => /* @__PURE__ */ l.jsx(
        "span",
        {
          className: `inline-block px-2 py-1 text-xs font-mono rounded ${o === s ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`,
          children: o
        },
        o
      )) }) }),
      s && ((i = t.content) == null ? void 0 : i[s].schema) && /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx(
        Tt,
        {
          schema: t.content[s].schema,
          components: n,
          className: "border bg-white p-3 rounded"
        }
      ) }),
      s && ((a = t.content) == null ? void 0 : a[s].example) && /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx("pre", { className: "bg-white rounded p-3 text-xs overflow-x-auto border", children: /* @__PURE__ */ l.jsx("code", { children: JSON.stringify(t.content[s].example, null, 2) }) }) })
    ] }),
    t.headers && Object.keys(t.headers).length > 0 && /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx("div", { className: "border rounded overflow-hidden", children: /* @__PURE__ */ l.jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ l.jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ l.jsxs("tr", { children: [
        /* @__PURE__ */ l.jsx("th", { className: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "名称" }),
        /* @__PURE__ */ l.jsx("th", { className: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "描述" }),
        /* @__PURE__ */ l.jsx("th", { className: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "类型" })
      ] }) }),
      /* @__PURE__ */ l.jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: Object.entries(t.headers).map(([o, p]) => {
        const u = p, c = "$ref" in u ? ue(u, n, "headers") || { description: "引用对象" } : u;
        return /* @__PURE__ */ l.jsxs("tr", { children: [
          /* @__PURE__ */ l.jsx("td", { className: "px-3 py-2 text-sm font-mono", children: o }),
          /* @__PURE__ */ l.jsx("td", { className: "px-3 py-2 text-sm", children: c.description && /* @__PURE__ */ l.jsx(le, { description: c.description }) }),
          /* @__PURE__ */ l.jsx("td", { className: "px-3 py-2 text-sm", children: c.schema && "type" in c.schema ? c.schema.type : "未知" })
        ] }, o);
      }) })
    ] }) }) })
  ] });
}, Re = ({ title: e, className: t }) => /* @__PURE__ */ l.jsx("h4", { className: `font-semibold text-sm ${t}`, children: e }), Mu = ({
  responses: e,
  components: t,
  spec: n,
  className: r = ""
}) => {
  const [s, i] = ee(null), a = n ? Yt(n) : t ? { resolve: (f, h) => f, components: t } : null;
  if (!a)
    return /* @__PURE__ */ l.jsx("div", { className: "text-red-500", children: "缺少解析引用所需的组件定义" });
  const o = {
    "1xx": [],
    "2xx": [],
    "3xx": [],
    "4xx": [],
    "5xx": [],
    default: [],
    other: []
  };
  if (Object.keys(e).forEach((f) => {
    if (f === "default")
      o.default.push(f);
    else if (/^[1-5]\d\d$/.test(f)) {
      const h = `${f[0]}xx`;
      o[h].push(f);
    } else
      o.other.push(f);
  }), s === null) {
    for (const f of ["2xx", "default", "1xx", "3xx", "4xx", "5xx", "other"])
      if (o[f].length > 0) {
        i(o[f][0]);
        break;
      }
  }
  const p = Object.values(o).flat(), c = s ? ((f) => {
    const h = e[f];
    return h ? a.resolve(h, "responses") : null;
  })(s) : null;
  return /* @__PURE__ */ l.jsxs("div", { className: r, children: [
    /* @__PURE__ */ l.jsx(Re, { title: "响应", className: "text-lg font-medium mb-3" }),
    /* @__PURE__ */ l.jsx("div", { className: "mb-4", children: /* @__PURE__ */ l.jsx("div", { className: "flex flex-wrap gap-2", children: p.map((f) => /* @__PURE__ */ l.jsx(
      "button",
      {
        onClick: () => i(f),
        className: `px-3 py-1 text-sm rounded-full transition-colors ${f === s ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`,
        children: f === "default" ? "Default" : f
      },
      f
    )) }) }),
    s && c && /* @__PURE__ */ l.jsx("div", { className: "border rounded bg-gray-50 p-4", children: /* @__PURE__ */ l.jsx(
      $u,
      {
        status: s,
        response: c,
        components: a.components
      }
    ) }),
    (!s || !c) && /* @__PURE__ */ l.jsx("div", { className: "text-yellow-600 p-3 bg-yellow-50 rounded", children: p.length === 0 ? "未定义响应" : "无法解析所选响应" })
  ] });
}, _i = ({ externalDocs: e, className: t }) => /* @__PURE__ */ l.jsx("div", { className: `text-sm ${t}`, children: /* @__PURE__ */ l.jsx("a", { href: e.url, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline", children: e.description || "External Documentation" }) }), Di = ({
  requestBody: e,
  components: t,
  spec: n,
  className: r = ""
}) => {
  const s = n ? Yt(n) : t ? { resolve: (f, h) => f, components: t } : null;
  if (!s)
    return /* @__PURE__ */ l.jsx("div", { className: "text-red-500", children: "缺少解析引用所需的组件定义" });
  const i = s.resolve(e, "requestBodies");
  if (!i)
    return /* @__PURE__ */ l.jsx("div", { className: "text-red-500", children: "无法解析请求体" });
  const a = i.content;
  if (!a)
    return /* @__PURE__ */ l.jsx("div", { className: "text-yellow-500", children: "请求体无内容定义" });
  const o = Object.keys(a), p = o.find((f) => f.includes("json")) || o[0], u = a[p];
  if (!u || !u.schema)
    return /* @__PURE__ */ l.jsx("div", { className: "text-yellow-500", children: "请求体的内容类型未定义模式" });
  const c = u.schema;
  return /* @__PURE__ */ l.jsxs("div", { className: r, children: [
    /* @__PURE__ */ l.jsx(Re, { title: "请求体", className: "text-lg font-medium mb-3" }),
    i.required && /* @__PURE__ */ l.jsx("div", { className: "mb-2", children: /* @__PURE__ */ l.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800", children: "必填" }) }),
    i.description && /* @__PURE__ */ l.jsx("div", { className: "mb-4", children: /* @__PURE__ */ l.jsx(le, { description: i.description }) }),
    /* @__PURE__ */ l.jsx("div", { className: "mb-3", children: /* @__PURE__ */ l.jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: o.map((f) => /* @__PURE__ */ l.jsx(
      "span",
      {
        className: `inline-block px-2 py-1 text-xs font-mono rounded ${f === p ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`,
        children: f
      },
      f
    )) }) }),
    /* @__PURE__ */ l.jsx("div", { className: "mt-4", children: /* @__PURE__ */ l.jsx(
      Tt,
      {
        schema: c,
        components: s.components,
        className: "border rounded p-3 bg-gray-50"
      }
    ) }),
    u.example && /* @__PURE__ */ l.jsx("div", { className: "mt-4", children: /* @__PURE__ */ l.jsx("pre", { className: "bg-gray-50 rounded p-3 text-xs overflow-x-auto border", children: /* @__PURE__ */ l.jsx("code", { children: JSON.stringify(u.example, null, 2) }) }) })
  ] });
}, Bu = ({ requirement: e }) => /* @__PURE__ */ l.jsx("div", { className: "bg-gray-50 rounded p-2 text-xs", children: Object.entries(e).map(([t, n]) => /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-1", children: [
  /* @__PURE__ */ l.jsxs("span", { className: "font-semibold text-gray-700", children: [
    t,
    ":"
  ] }),
  n.length > 0 ? /* @__PURE__ */ l.jsxs("span", { className: "text-gray-600", children: [
    "[",
    n.join(", "),
    "]"
  ] }) : /* @__PURE__ */ l.jsx("span", { className: "text-gray-500 italic", children: "(no specific scopes required)" })
] }, t)) }), qu = ({ security: e, className: t }) => !e || e.length === 0 ? null : /* @__PURE__ */ l.jsxs("div", { className: t || "", children: [
  /* @__PURE__ */ l.jsx(Re, { title: "Security Requirements" }),
  /* @__PURE__ */ l.jsxs("div", { className: "space-y-2 mt-3", children: [
    e.map((n, r) => /* @__PURE__ */ l.jsx(Bu, { requirement: n }, r)),
    e.length > 1 && /* @__PURE__ */ l.jsx("p", { className: "text-xs text-gray-500 mt-2 italic", children: "注意：多个安全要求项表示可选择其中之一（OR 逻辑）。每个安全要求项内的多个方案表示需要全部满足（AND 逻辑）。" })
  ] })
] }), Jt = ({
  path: e,
  method: t,
  operation: n,
  components: r,
  className: s,
  onSelectOperation: i,
  spec: a
}) => {
  const [o, p] = ee(!1), [u, c] = ee(!1), f = a ? Yt(a) : null, h = (f == null ? void 0 : f.components) || r, d = n.parameters, y = n.requestBody, v = n.responses, P = n.security, j = n.externalDocs, S = () => {
    i && i(), w();
  }, w = () => p(!o);
  return /* @__PURE__ */ l.jsxs("div", { className: `border rounded overflow-hidden shadow-sm ${n.deprecated ? "border-red-300" : "border-gray-300"} ${s}`, children: [
    /* @__PURE__ */ l.jsxs(
      "div",
      {
        className: `p-3 flex justify-between items-center cursor-pointer ${n.deprecated ? "bg-red-50" : ""}`,
        onClick: S,
        children: [
          /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-3 flex-wrap", children: [
            /* @__PURE__ */ l.jsx(Nt, { method: t.toUpperCase() }),
            /* @__PURE__ */ l.jsx(Ou, { path: e, className: "break-all" }),
            n.summary && /* @__PURE__ */ l.jsxs("span", { className: "text-sm text-gray-700 hidden md:inline", children: [
              "- ",
              n.summary
            ] }),
            n.deprecated && /* @__PURE__ */ l.jsx($e, {})
          ] }),
          /* @__PURE__ */ l.jsx(Wt, { isExpanded: o, onToggle: w, label: "" })
        ]
      }
    ),
    o && /* @__PURE__ */ l.jsxs("div", { className: "divide-y divide-gray-200", children: [
      (n.summary || n.description || j) && /* @__PURE__ */ l.jsxs("div", { className: "p-4 space-y-2", children: [
        n.summary && /* @__PURE__ */ l.jsx(le, { className: "text-base font-medium md:hidden", description: n.summary }),
        n.description && /* @__PURE__ */ l.jsx("div", { className: "text-sm text-gray-700 prose max-w-none", children: /* @__PURE__ */ l.jsx(le, { description: n.description }) }),
        j && /* @__PURE__ */ l.jsx(_i, { externalDocs: j, className: "mt-2" })
      ] }),
      d && d.length > 0 && /* @__PURE__ */ l.jsx("div", { className: "p-4", children: /* @__PURE__ */ l.jsx(Au, { parameters: d, components: h }) }),
      y && /* @__PURE__ */ l.jsx("div", { className: "p-4", children: /* @__PURE__ */ l.jsx(Di, { requestBody: y, components: h }) }),
      v && /* @__PURE__ */ l.jsx("div", { className: "p-4", children: /* @__PURE__ */ l.jsx(Mu, { responses: v, components: h }) }),
      P && P.length > 0 && /* @__PURE__ */ l.jsx("div", { className: "p-4", children: /* @__PURE__ */ l.jsx(qu, { security: P }) })
    ] })
  ] });
}, Uu = ({
  name: e,
  callback: t,
  components: n,
  className: r
}) => {
  const s = ue(t, n, "callbacks");
  if (!s) {
    const i = t && typeof t == "object" && "$ref" in t ? t.$ref : "[invalid callback object]";
    return /* @__PURE__ */ l.jsxs("div", { className: `text-xs text-red-500 p-1 border border-dashed rounded ${r}`, children: [
      "Failed to resolve callback: ",
      i
    ] });
  }
  return /* @__PURE__ */ l.jsxs("div", { className: `p-4 border rounded bg-gray-50 ${r}`, children: [
    /* @__PURE__ */ l.jsxs("h3", { className: "text-lg font-semibold mb-3 font-mono", children: [
      "Callback: ",
      e
    ] }),
    Object.entries(s).map(([i, a]) => /* @__PURE__ */ l.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ l.jsxs("h4", { className: "text-md font-semibold mb-2 font-mono bg-gray-200 px-2 py-1 rounded inline-block", children: [
        "Expression: ",
        i
      ] }),
      (() => {
        const o = ue(a, n, "pathItems");
        if (!o) {
          const p = a && typeof a == "object" && "$ref" in a ? a.$ref : "[invalid pathItem object]";
          return /* @__PURE__ */ l.jsxs("div", { className: "text-xs text-red-500", children: [
            "Failed to resolve path item: ",
            p
          ] });
        }
        return /* @__PURE__ */ l.jsx("div", { className: "space-y-4 pl-4 border-l-2 mt-2", children: Object.entries(o).map(([p, u]) => ["get", "put", "post", "delete", "options", "head", "patch", "trace"].includes(p.toLowerCase()) ? /* @__PURE__ */ l.jsx(
          Jt,
          {
            path: i,
            method: p.toUpperCase(),
            operation: u,
            components: n,
            className: "shadow-none border-gray-300"
          },
          `${p}-${i}`
        ) : null) });
      })()
    ] }, i))
  ] });
};
function tt(e) {
  return e && !("$ref" in e);
}
const Li = ({
  name: e,
  required: t,
  schema: n,
  description: r,
  deprecated: s,
  style: i,
  explode: a,
  examples: o,
  components: p,
  className: u
}) => {
  const [c, f] = ee(!1), h = n && tt(n) && (n.default !== void 0 || n.enum || n.minimum !== void 0 || n.maximum !== void 0 || n.minLength !== void 0 || n.maxLength !== void 0 || n.pattern), d = r || h || o && Object.keys(o).length > 0;
  return /* @__PURE__ */ l.jsxs("div", { className: `mb-2 p-2 border rounded ${s ? "border-red-300 bg-red-50" : "border-gray-200"} ${u}`, children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "flex items-center flex-wrap gap-2", children: [
        /* @__PURE__ */ l.jsx("span", { className: `font-mono font-medium ${s ? "line-through text-red-500" : ""}`, children: e }),
        t && /* @__PURE__ */ l.jsx(Ri, {}),
        s && /* @__PURE__ */ l.jsx($e, {}),
        n && tt(n) && n.type && /* @__PURE__ */ l.jsx(lt, { type: n.type }),
        n && tt(n) && n.format && /* @__PURE__ */ l.jsx(Bt, { format: n.format }),
        i && /* @__PURE__ */ l.jsxs("span", { className: "bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded", children: [
          "style: ",
          i
        ] }),
        a && /* @__PURE__ */ l.jsx("span", { className: "bg-purple-100 text-purple-800 px-2 py-0.5 text-xs rounded", children: "explode" })
      ] }),
      d && /* @__PURE__ */ l.jsx(
        Wt,
        {
          isExpanded: c,
          onToggle: () => f(!c),
          label: c ? "Hide Details" : "Show Details"
        }
      )
    ] }),
    r && !c && /* @__PURE__ */ l.jsx("div", { className: "text-sm text-gray-600 truncate", children: /* @__PURE__ */ l.jsx(le, { description: r }) }),
    c && d && /* @__PURE__ */ l.jsxs("div", { className: "mt-3 pl-2 border-l-2 border-gray-200 space-y-4", children: [
      r && /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx(le, { description: r, className: "text-sm" }) }),
      n && tt(n) && /* @__PURE__ */ l.jsx(vt, { value: n.default }),
      n && tt(n) && /* @__PURE__ */ l.jsx(jt, { values: n.enum || [] }),
      n && tt(n) && /* @__PURE__ */ l.jsx(wt, { schema: n }),
      o && Object.keys(o).length > 0 && /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx(Vt, { examples: o, components: p }) })
    ] })
  ] });
}, Fi = ({ server: e, className: t }) => /* @__PURE__ */ l.jsxs("div", { className: `bg-gray-50 p-2 rounded ${t}`, children: [
  /* @__PURE__ */ l.jsx("div", { className: "text-xs font-semibold mb-1 font-mono break-all", children: e.url }),
  e.description && /* @__PURE__ */ l.jsx(le, { description: e.description, className: "text-xs mb-2" }),
  e.variables && Object.keys(e.variables).length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "mt-2", children: [
    /* @__PURE__ */ l.jsx("h5", { className: "text-xs font-medium mb-1", children: "Variables" }),
    /* @__PURE__ */ l.jsx("div", { className: "space-y-2", children: Object.entries(e.variables).map(([n, r]) => /* @__PURE__ */ l.jsxs("div", { className: "border border-gray-200 p-1.5 rounded bg-white text-xs", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between mb-0.5", children: [
        /* @__PURE__ */ l.jsx("span", { className: "font-mono font-medium", children: n }),
        /* @__PURE__ */ l.jsxs("span", { className: "bg-gray-200 px-1.5 py-0.5 rounded text-gray-700", children: [
          "Default: ",
          r.default
        ] })
      ] }),
      r.description && /* @__PURE__ */ l.jsx(le, { description: r.description, className: "text-xs mt-1 text-gray-600" }),
      r.enum && r.enum.length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "mt-1", children: [
        /* @__PURE__ */ l.jsx("span", { className: "font-medium", children: "Enum:" }),
        /* @__PURE__ */ l.jsx("div", { className: "flex flex-wrap gap-1 mt-0.5", children: r.enum.map((s) => /* @__PURE__ */ l.jsx("span", { className: "bg-gray-100 px-1.5 py-0.5 rounded font-mono", children: s }, s)) })
      ] })
    ] }, n)) })
  ] })
] }), zi = ({
  name: e,
  operationId: t,
  operationRef: n,
  parameters: r,
  requestBody: s,
  description: i,
  server: a,
  className: o
}) => {
  const [p, u] = ee(!1), c = i || r || s || a, f = t ? { type: "operationId", value: t } : n ? { type: "operationRef", value: n } : null;
  return /* @__PURE__ */ l.jsxs("div", { className: `mb-2 p-3 border rounded ${o || ""}`, children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ l.jsx("span", { className: "font-mono font-medium", children: e }),
        f && /* @__PURE__ */ l.jsxs("span", { className: `px-2 py-1 text-xs rounded ${f.type === "operationId" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`, children: [
          f.type,
          ": ",
          f.value
        ] })
      ] }),
      c && /* @__PURE__ */ l.jsx(
        Wt,
        {
          isExpanded: p,
          onToggle: () => u(!p),
          label: p ? "Hide Details" : "Show Details"
        }
      )
    ] }),
    i && !p && /* @__PURE__ */ l.jsx("div", { className: "text-sm text-gray-600 mt-1 truncate", children: /* @__PURE__ */ l.jsx(le, { description: i }) }),
    p && c && /* @__PURE__ */ l.jsxs("div", { className: "mt-3 pl-2 border-l-2 border-gray-200 space-y-4", children: [
      i && /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("h4", { className: "text-xs font-semibold mb-1", children: "Description" }),
        /* @__PURE__ */ l.jsx(le, { description: i, className: "text-sm" })
      ] }),
      r && Object.keys(r).length > 0 && /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("h4", { className: "text-xs font-semibold mb-1", children: "Parameters" }),
        /* @__PURE__ */ l.jsx("div", { className: "bg-gray-50 p-2 rounded text-xs space-y-1", children: Object.entries(r).map(([h, d]) => /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-[max-content_1fr] gap-x-2", children: [
          /* @__PURE__ */ l.jsxs("span", { className: "font-mono font-medium text-gray-700", children: [
            h,
            ":"
          ] }),
          /* @__PURE__ */ l.jsx("pre", { className: "font-mono bg-gray-100 px-1.5 py-0.5 rounded overflow-x-auto break-all", children: /* @__PURE__ */ l.jsx("code", { children: typeof d == "string" ? d : JSON.stringify(d) }) })
        ] }, h)) })
      ] }),
      s && /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("h4", { className: "text-xs font-semibold mb-1", children: "Request Body" }),
        /* @__PURE__ */ l.jsx("div", { className: "bg-gray-50 p-2 rounded text-xs", children: /* @__PURE__ */ l.jsx("pre", { className: "font-mono bg-gray-100 px-1.5 py-0.5 rounded overflow-x-auto break-all", children: /* @__PURE__ */ l.jsx("code", { children: typeof s == "string" ? s : JSON.stringify(s, null, 2) }) }) })
      ] }),
      a && /* @__PURE__ */ l.jsxs("div", { children: [
        /* @__PURE__ */ l.jsx("h4", { className: "text-xs font-semibold mb-1", children: "Server" }),
        /* @__PURE__ */ l.jsx(Fi, { server: a })
      ] })
    ] })
  ] });
}, Hu = ({ headers: e, components: t }) => {
  const n = Object.entries(e);
  return n.length === 0 ? null : /* @__PURE__ */ l.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-semibold uppercase text-gray-500 mb-2", children: "Headers" }),
    /* @__PURE__ */ l.jsx("div", { className: "space-y-3", children: n.map(([r, s]) => {
      const i = ue(s, t, "headers");
      if (!i) {
        const a = s && typeof s == "object" && "$ref" in s ? s.$ref : "[unknown reference]";
        return console.warn(`[HeadersSection] Failed to resolve header ref: ${a} for key ${r}`), /* @__PURE__ */ l.jsxs("div", { className: "text-xs text-red-500 p-1 border border-dashed rounded", children: [
          "Failed to resolve header: ",
          r,
          " (",
          a,
          ")"
        ] }, r);
      }
      return /* @__PURE__ */ l.jsx(
        Li,
        {
          name: r,
          description: i.description,
          required: i.required,
          deprecated: i.deprecated,
          schema: i.schema,
          style: i.style,
          explode: i.explode,
          examples: i.examples,
          components: t
        },
        r
      );
    }) })
  ] });
}, Vu = ({ links: e, components: t }) => {
  const n = Object.entries(e);
  return n.length === 0 ? null : /* @__PURE__ */ l.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-semibold uppercase text-gray-500 mb-2", children: "Links" }),
    /* @__PURE__ */ l.jsx("div", { className: "space-y-3", children: n.map(([r, s]) => {
      const i = ue(s, t, "links");
      if (!i) {
        const a = s && typeof s == "object" && "$ref" in s ? s.$ref : "[unknown reference]";
        return console.warn(`[LinksSection] Failed to resolve link ref: ${a} for key ${r}`), /* @__PURE__ */ l.jsxs("div", { className: "text-xs text-red-500 p-1 border border-dashed rounded", children: [
          "Failed to resolve link: ",
          r,
          " (",
          a,
          ")"
        ] }, r);
      }
      return /* @__PURE__ */ l.jsx(
        zi,
        {
          name: r,
          ...i
        },
        r
      );
    }) })
  ] });
}, Wu = ({
  mediaTypes: e,
  activeMediaType: t,
  onSelectMediaType: n
}) => e.length <= 1 ? null : /* @__PURE__ */ l.jsx("div", { className: "mb-2 border-b", children: /* @__PURE__ */ l.jsx("ul", { className: "flex flex-wrap -mb-px text-sm font-medium text-center", children: e.map((r) => /* @__PURE__ */ l.jsx("li", { className: "mr-2", children: /* @__PURE__ */ l.jsx(
  "button",
  {
    onClick: () => n(r),
    className: `inline-block p-2 border-b-2 rounded-t-lg ${t === r ? "text-blue-600 border-blue-600" : "border-transparent hover:text-gray-600 hover:border-gray-300"}`,
    children: r
  }
) }, r)) }) }), Yu = ({ content: e, components: t }) => {
  const n = Object.keys(e), [r, s] = ee(null);
  if (rt(() => {
    r === null && n.length > 0 && s(n[0]), r && !n.includes(r) && n.length > 0 && s(n[0]), n.length === 0 && s(null);
  }, [n, r]), n.length === 0)
    return null;
  const i = r ? e[r] : null;
  return /* @__PURE__ */ l.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-semibold uppercase text-gray-500 mb-2", children: "Content" }),
    /* @__PURE__ */ l.jsx(
      Wu,
      {
        mediaTypes: n,
        activeMediaType: r,
        onSelectMediaType: s
      }
    ),
    r && i && /* @__PURE__ */ l.jsxs("div", { className: "mt-3 bg-gray-50/60 p-4 rounded space-y-4", children: [
      i.schema && /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx(Tt, { schema: i.schema, components: t }) }),
      i.examples && Object.keys(i.examples).length > 0 && /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx(Vt, { examples: i.examples, components: t }) }),
      i.example !== void 0 && !i.examples && /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx("pre", { className: "bg-gray-100 p-2 rounded font-mono text-xs overflow-x-auto", children: /* @__PURE__ */ l.jsx("code", { children: JSON.stringify(i.example, null, 2) }) }) }),
      i.encoding && Object.keys(i.encoding).length > 0 && /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx("div", { className: "space-y-2", children: Object.entries(i.encoding).map(([a, o]) => /* @__PURE__ */ l.jsxs("div", { className: "border rounded p-2 bg-white", children: [
        /* @__PURE__ */ l.jsx("div", { className: "font-mono text-sm mb-1 font-medium", children: a }),
        /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-xs", children: [
          o.contentType && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
            /* @__PURE__ */ l.jsx("div", { className: "text-gray-600", children: "Content Type" }),
            /* @__PURE__ */ l.jsx("div", { className: "font-mono", children: o.contentType })
          ] }),
          o.style && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
            /* @__PURE__ */ l.jsx("div", { className: "text-gray-600", children: "Style" }),
            /* @__PURE__ */ l.jsx("div", { className: "font-mono", children: o.style })
          ] }),
          o.explode !== void 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
            /* @__PURE__ */ l.jsx("div", { className: "text-gray-600", children: "Explode" }),
            /* @__PURE__ */ l.jsx("div", { className: "font-mono", children: o.explode.toString() })
          ] }),
          o.allowReserved !== void 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
            /* @__PURE__ */ l.jsx("div", { className: "text-gray-600", children: "Allow Reserved" }),
            /* @__PURE__ */ l.jsx("div", { className: "font-mono", children: o.allowReserved.toString() })
          ] })
        ] })
      ] }, a)) }) })
    ] })
  ] });
}, Ju = ({
  code: e,
  response: t,
  components: n
}) => {
  const r = ue(t, n, "responses");
  if (!r) {
    const h = t && typeof t == "object" && "$ref" in t ? t.$ref : "[unknown reference]";
    return /* @__PURE__ */ l.jsxs("div", { className: "text-xs text-red-500 p-2 border rounded bg-red-50", children: [
      "无法显示响应 ",
      e,
      ": 引用 ",
      h,
      " 未解析或解析失败。"
    ] });
  }
  const { description: s, headers: i, content: a, links: o } = r, p = i && Object.keys(i).length > 0, u = a && Object.keys(a).length > 0, c = o && Object.keys(o).length > 0, f = p || u || c;
  return /* @__PURE__ */ l.jsxs("div", { className: "border rounded mb-4 overflow-hidden", children: [
    /* @__PURE__ */ l.jsx("div", { className: "p-3 bg-gray-50 flex items-center justify-between", children: /* @__PURE__ */ l.jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ l.jsx(Ai, { code: e }),
      s && /* @__PURE__ */ l.jsx(le, { description: s, className: "text-sm mb-0" })
    ] }) }),
    f && /* @__PURE__ */ l.jsxs("div", { className: "p-4 border-t", children: [
      p && /* @__PURE__ */ l.jsx(Hu, { headers: i, components: n }),
      u && /* @__PURE__ */ l.jsx(Yu, { content: a, components: n }),
      c && /* @__PURE__ */ l.jsx(Vu, { links: o, components: n })
    ] })
  ] });
}, $i = ({ name: e, scheme: t, className: n }) => {
  const r = () => {
    switch (t.type) {
      case "apiKey":
        return /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1", children: [
          /* @__PURE__ */ l.jsx("span", { className: "text-gray-600", children: "In:" }),
          " ",
          /* @__PURE__ */ l.jsx("span", { children: t.in }),
          /* @__PURE__ */ l.jsx("span", { className: "text-gray-600", children: "Name:" }),
          " ",
          /* @__PURE__ */ l.jsx("span", { children: t.name })
        ] });
      case "http":
        return /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1", children: [
          /* @__PURE__ */ l.jsx("span", { className: "text-gray-600", children: "Scheme:" }),
          " ",
          /* @__PURE__ */ l.jsx("span", { children: t.scheme }),
          t.bearerFormat && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
            /* @__PURE__ */ l.jsx("span", { className: "text-gray-600", children: "Bearer Format:" }),
            " ",
            /* @__PURE__ */ l.jsx("span", { children: t.bearerFormat })
          ] })
        ] });
      case "oauth2":
        return /* @__PURE__ */ l.jsxs("div", { children: [
          /* @__PURE__ */ l.jsx("h5", { className: "text-xs font-semibold mb-1 uppercase text-gray-500", children: "Flows:" }),
          /* @__PURE__ */ l.jsx("div", { className: "space-y-2", children: t.flows && Object.entries(t.flows).map(([s, i]) => /* @__PURE__ */ l.jsxs("div", { className: "p-2 border rounded bg-gray-100", children: [
            /* @__PURE__ */ l.jsx("h6", { className: "font-semibold capitalize mb-1", children: s }),
            /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-xs", children: [
              (i == null ? void 0 : i.authorizationUrl) && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
                /* @__PURE__ */ l.jsx("span", { className: "text-gray-600", children: "Authorization URL:" }),
                " ",
                /* @__PURE__ */ l.jsx("code", { className: "break-all", children: i.authorizationUrl })
              ] }),
              (i == null ? void 0 : i.tokenUrl) && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
                /* @__PURE__ */ l.jsx("span", { className: "text-gray-600", children: "Token URL:" }),
                " ",
                /* @__PURE__ */ l.jsx("code", { className: "break-all", children: i.tokenUrl })
              ] }),
              (i == null ? void 0 : i.refreshUrl) && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
                /* @__PURE__ */ l.jsx("span", { className: "text-gray-600", children: "Refresh URL:" }),
                " ",
                /* @__PURE__ */ l.jsx("code", { className: "break-all", children: i.refreshUrl })
              ] }),
              (i == null ? void 0 : i.scopes) && Object.keys(i.scopes).length > 0 && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
                /* @__PURE__ */ l.jsx("span", { className: "text-gray-600 self-start", children: "Scopes:" }),
                /* @__PURE__ */ l.jsx("div", { className: "space-y-0.5", children: Object.entries(i.scopes).map(([a, o]) => /* @__PURE__ */ l.jsxs("div", { children: [
                  /* @__PURE__ */ l.jsxs("code", { className: "font-mono bg-gray-200 px-1 rounded", children: [
                    a,
                    ":"
                  ] }),
                  " ",
                  o
                ] }, a)) })
              ] })
            ] })
          ] }, s)) })
        ] });
      case "openIdConnect":
        return /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1", children: [
          /* @__PURE__ */ l.jsx("span", { className: "text-gray-600", children: "OpenID Connect URL:" }),
          /* @__PURE__ */ l.jsx("a", { href: t.openIdConnectUrl, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline break-all", children: t.openIdConnectUrl })
        ] });
      case "mutualTLS":
        return /* @__PURE__ */ l.jsx("p", { className: "text-gray-600 italic", children: "Details for mutualTLS not specifically rendered." });
      default:
        return /* @__PURE__ */ l.jsxs("p", { className: "text-red-500", children: [
          "Unknown security scheme type: ",
          t.type
        ] });
    }
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `p-3 border rounded ${n}`, children: [
    /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ l.jsx("span", { className: "font-mono font-semibold", children: e }),
      /* @__PURE__ */ l.jsx("span", { className: "text-xs bg-gray-200 px-2 py-0.5 rounded capitalize", children: t.type })
    ] }),
    t.description && /* @__PURE__ */ l.jsx(le, { description: t.description, className: "text-sm mb-3" }),
    /* @__PURE__ */ l.jsx("div", { className: "text-sm", children: r() })
  ] });
}, Xu = ({
  name: e,
  pathItem: t,
  components: n,
  className: r
}) => {
  const s = [
    { method: "get", operation: t.get },
    { method: "post", operation: t.post },
    { method: "put", operation: t.put },
    { method: "delete", operation: t.delete }
  ].filter(({ operation: i }) => i);
  return /* @__PURE__ */ l.jsxs("div", { className: `border rounded-lg p-4 bg-gray-50 ${r || ""}`, children: [
    /* @__PURE__ */ l.jsxs("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: [
      "Webhook: ",
      /* @__PURE__ */ l.jsx("span", { className: "text-blue-600", children: e })
    ] }),
    t.description && /* @__PURE__ */ l.jsx("p", { className: "text-gray-600 mb-4", children: t.description }),
    /* @__PURE__ */ l.jsx("div", { className: "space-y-4", children: s.map(({ method: i, operation: a }) => /* @__PURE__ */ l.jsx(
      Jt,
      {
        path: `webhook:${e}`,
        method: i,
        operation: a,
        components: n,
        className: "border-none bg-white"
      },
      i
    )) })
  ] });
}, Gu = ({ activeType: e, selectedItemName: t, components: n }) => {
  var s, i;
  if (!e || !t || !n[e] || !((s = n[e]) != null && s[t]))
    return /* @__PURE__ */ l.jsx("div", { className: "text-gray-500 italic p-4", children: "请从列表中选择一项。" });
  const r = (i = n[e]) == null ? void 0 : i[t];
  if (!r) return /* @__PURE__ */ l.jsx("div", { className: "text-red-500 p-4", children: "错误：未找到所选项目。" });
  switch (e) {
    case "schemas":
      return /* @__PURE__ */ l.jsx(Tt, { schema: r, components: n });
    case "responses":
      return /* @__PURE__ */ l.jsx(
        Ju,
        {
          code: "Component",
          response: r,
          components: n
        }
      );
    case "parameters": {
      const p = r, u = p.schema && !("$ref" in p.schema) ? p.schema : {};
      return /* @__PURE__ */ l.jsx(
        Pi,
        {
          ...p,
          schema: u,
          components: n
        }
      );
    }
    case "examples":
      const a = r;
      return /* @__PURE__ */ l.jsx(Vt, { examples: { [t]: a }, components: n });
    case "requestBodies":
      return /* @__PURE__ */ l.jsx(Di, { requestBody: r, components: n });
    case "headers":
      return /* @__PURE__ */ l.jsx(Li, { name: t, ...r, components: n });
    case "securitySchemes":
      const o = ue(r, n, "securitySchemes");
      return o ? /* @__PURE__ */ l.jsx($i, { name: t, scheme: o }) : /* @__PURE__ */ l.jsx("div", { className: "text-red-500 p-4", children: "无法解析安全方案引用。" });
    case "links":
      return /* @__PURE__ */ l.jsx(zi, { name: t, ...r });
    case "callbacks":
      return /* @__PURE__ */ l.jsx(Uu, { name: t, callback: r, components: n });
    case "webhooks":
      return /* @__PURE__ */ l.jsx(
        Xu,
        {
          name: t,
          pathItem: r,
          components: n
        }
      );
    default:
      return /* @__PURE__ */ l.jsxs("div", { className: "text-red-500 p-4", children: [
        "错误：未知组件类型 '",
        e,
        "'。"
      ] });
  }
};
var Ku = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Qu = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ee = (e, t) => {
  const n = Qi(
    ({ color: r = "currentColor", size: s = 24, strokeWidth: i = 2, absoluteStrokeWidth: a, children: o, ...p }, u) => Zn(
      "svg",
      {
        ref: u,
        ...Ku,
        width: s,
        height: s,
        stroke: r,
        strokeWidth: a ? Number(i) * 24 / Number(s) : i,
        className: `lucide lucide-${Qu(e)}`,
        ...p
      },
      [
        ...t.map(([c, f]) => Zn(c, f)),
        ...(Array.isArray(o) ? o : [o]) || []
      ]
    )
  );
  return n.displayName = `${e}`, n;
}, Zu = Ee("Braces", [
  [
    "path",
    {
      d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",
      key: "ezmyqa"
    }
  ],
  [
    "path",
    {
      d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
      key: "e1hn23"
    }
  ]
]), ec = Ee("Check", [
  ["polyline", { points: "20 6 9 17 4 12", key: "10jjfj" }]
]), Xt = Ee("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]), Mi = Ee("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]), Bi = Ee("ChevronUp", [
  ["path", { d: "m18 15-6-6-6 6", key: "153udz" }]
]), tc = Ee("ChevronsDown", [
  ["path", { d: "m7 6 5 5 5-5", key: "1lc07p" }],
  ["path", { d: "m7 13 5 5 5-5", key: "1d48rs" }]
]), nc = Ee("ChevronsUp", [
  ["path", { d: "m17 11-5-5-5 5", key: "e8nh98" }],
  ["path", { d: "m17 18-5-5-5 5", key: "2avn1x" }]
]), rc = Ee("Code2", [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
]), ic = Ee("Copy", [
  [
    "rect",
    {
      width: "14",
      height: "14",
      x: "8",
      y: "8",
      rx: "2",
      ry: "2",
      key: "17jyea"
    }
  ],
  [
    "path",
    {
      d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
      key: "zix9uf"
    }
  ]
]), sc = Ee("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]), lc = Ee("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]), ac = Ee("Send", [
  ["path", { d: "m22 2-7 20-4-9-9-4Z", key: "1q3vgg" }],
  ["path", { d: "M22 2 11 13", key: "nzbqef" }]
]), oc = Ee("Terminal", [
  ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
  ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }]
]), uc = (e) => {
  const t = {};
  for (const n in e) {
    const r = n, s = e[r];
    s && Object.keys(s).length > 0 && (t[r] = Object.keys(s));
  }
  return t;
}, cc = ({ components: e, selectedSchema: t, className: n }) => {
  const r = vn(() => uc(e), [e]), s = vn(() => Object.keys(r), [r]), [i, a] = ee(null), [o, p] = ee(
    s.includes("schemas") ? "schemas" : s[0] || null
  ), u = (c, f) => {
    (i == null ? void 0 : i.type) === c && (i == null ? void 0 : i.name) === f ? a(null) : a({ type: c, name: f });
  };
  return rt(() => {
    const c = (f) => {
      const { name: h, type: d } = f.detail;
      d === "schemas" && (p("schemas"), u("schemas", h), setTimeout(() => {
        const y = document.getElementById(`schema-${h}`);
        y && y.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100));
    };
    return document.addEventListener("openapi-select-schema", c), () => {
      document.removeEventListener("openapi-select-schema", c);
    };
  }, []), rt(() => {
    t && (p("schemas"), u("schemas", t));
  }, [t]), s.length === 0 ? null : /* @__PURE__ */ l.jsxs("div", { className: `py-4 ${n}`, children: [
    /* @__PURE__ */ l.jsx("div", { className: "flex border-b mb-4 overflow-x-auto hide-scrollbar", children: s.map((c) => {
      var f;
      return /* @__PURE__ */ l.jsxs(
        "button",
        {
          className: `px-4 py-2 capitalize whitespace-nowrap ${o === c ? "border-b-2 border-blue-500 text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"}`,
          onClick: () => p(c),
          children: [
            c,
            /* @__PURE__ */ l.jsxs("span", { className: "ml-1 text-xs text-gray-500", children: [
              "(",
              ((f = r[c]) == null ? void 0 : f.length) || 0,
              ")"
            ] })
          ]
        },
        c
      );
    }) }),
    o && r[o] && /* @__PURE__ */ l.jsx("div", { className: "space-y-2", children: r[o].map((c) => /* @__PURE__ */ l.jsxs("div", { id: `schema-${c}`, className: "border rounded-md overflow-hidden bg-white", children: [
      /* @__PURE__ */ l.jsx(
        "div",
        {
          className: "flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100",
          onClick: () => u(o, c),
          children: /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ l.jsx("span", { className: "text-gray-500", children: (i == null ? void 0 : i.type) === o && (i == null ? void 0 : i.name) === c ? /* @__PURE__ */ l.jsx(Xt, { className: "h-5 w-5" }) : /* @__PURE__ */ l.jsx(Mi, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ l.jsx("h3", { className: "font-mono text-sm", children: c })
          ] })
        }
      ),
      (i == null ? void 0 : i.type) === o && (i == null ? void 0 : i.name) === c && /* @__PURE__ */ l.jsx("div", { className: "p-4 border-t", children: /* @__PURE__ */ l.jsx(
        Gu,
        {
          activeType: o,
          selectedItemName: c,
          components: e
        }
      ) })
    ] }, c)) })
  ] });
}, dc = ({ contact: e, className: t }) => /* @__PURE__ */ l.jsxs("div", { className: `text-sm ${t}`, children: [
  e.name && /* @__PURE__ */ l.jsx("div", { className: "font-semibold", children: e.name }),
  e.email && /* @__PURE__ */ l.jsxs("div", { children: [
    "Email: ",
    /* @__PURE__ */ l.jsx("a", { href: `mailto:${e.email}`, className: "text-blue-600 hover:underline", children: e.email })
  ] }),
  e.url && /* @__PURE__ */ l.jsxs("div", { children: [
    "URL: ",
    /* @__PURE__ */ l.jsx("a", { href: e.url, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline break-all", children: e.url })
  ] })
] }), pc = ({ license: e, className: t }) => /* @__PURE__ */ l.jsxs("div", { className: `text-sm ${t}`, children: [
  /* @__PURE__ */ l.jsx("div", { className: "font-semibold", children: e.name }),
  e.identifier && /* @__PURE__ */ l.jsxs("div", { className: "text-xs text-gray-600", children: [
    "Identifier: ",
    e.identifier
  ] }),
  e.url && /* @__PURE__ */ l.jsx("div", { children: /* @__PURE__ */ l.jsx("a", { href: e.url, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline break-all", children: e.url }) })
] }), fc = ({ info: e, className: t }) => /* @__PURE__ */ l.jsxs("div", { className: `py-6 ${t}`, children: [
  /* @__PURE__ */ l.jsx("h1", { className: "text-3xl font-bold mb-2", children: e.title }),
  /* @__PURE__ */ l.jsxs("div", { className: "text-lg text-gray-600 mb-4", children: [
    "Version: ",
    e.version
  ] }),
  e.description && /* @__PURE__ */ l.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ l.jsx("h2", { className: "text-xl font-semibold mb-2", children: "Description" }),
    /* @__PURE__ */ l.jsx(le, { description: e.description, className: "prose max-w-none" })
  ] }),
  e.termsOfService && /* @__PURE__ */ l.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ l.jsx("h2", { className: "text-xl font-semibold mb-2", children: "Terms of Service" }),
    /* @__PURE__ */ l.jsx("a", { href: e.termsOfService, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline break-all", children: e.termsOfService })
  ] }),
  /* @__PURE__ */ l.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
    e.contact && /* @__PURE__ */ l.jsxs("div", { children: [
      /* @__PURE__ */ l.jsx("h2", { className: "text-xl font-semibold mb-2", children: "Contact" }),
      /* @__PURE__ */ l.jsx(dc, { contact: e.contact })
    ] }),
    e.license && /* @__PURE__ */ l.jsxs("div", { children: [
      /* @__PURE__ */ l.jsx("h2", { className: "text-xl font-semibold mb-2", children: "License" }),
      /* @__PURE__ */ l.jsx(pc, { license: e.license })
    ] })
  ] })
] }), hc = ({ endpoint: e, method: t, parameters: n = [], requestBody: r, components: s, collapsible: i = !1, defaultCollapsed: a = !1 }) => {
  const [o, p] = ee("curl"), [u, c] = ee(!1), [f, h] = ee(a), d = () => {
    i && h(!f);
  }, y = r ? ue(r, s, "requestBodies") : void 0, v = n.map(
    (I) => ue(I, s, "parameters")
  ).filter(Boolean), j = (() => {
    if (!y || !y.content) return { example: "data" };
    const I = y.content["application/json"] ? "application/json" : Object.keys(y.content)[0];
    if (!I || !y.content[I].schema) return { example: "data" };
    const z = y.content[I].schema;
    if (!z) return { example: "data" };
    const T = ue(z, s, "schemas");
    if (!T) return { example: "data" };
    const A = {};
    return typeof T == "object" && "properties" in T && T.properties && Object.entries(T.properties).forEach(([R, _]) => {
      let N = "string";
      if (typeof _ == "object") {
        if ("type" in _)
          N = _.type;
        else if ("$ref" in _) {
          const B = ue(_, s, "schemas");
          B && typeof B == "object" && "type" in B && (N = B.type);
        }
      }
      switch (N) {
        case "string":
          A[R] = `example_${R}`;
          break;
        case "number":
        case "integer":
          A[R] = 123;
          break;
        case "boolean":
          A[R] = !0;
          break;
        case "array":
          A[R] = [];
          break;
        case "object":
          A[R] = {};
          break;
        default:
          A[R] = null;
      }
    }), Object.keys(A).length > 0 ? A : { example: "data" };
  })(), S = () => {
    let I = `curl -X ${t} "${e}"`;
    I += `    
 -H "Content-Type: application/json"`;
    const z = v.filter((T) => T.in === "query");
    if (z.length > 0) {
      const T = z.map((A) => `${A.name}=value`).join("&");
      I += `?${T}`;
    }
    return ["POST", "PUT", "PATCH"].includes(t) && y && (I += `    
 -d '${JSON.stringify(j, null, 2)}'`), I;
  }, w = () => `// Using fetch API
async function call${t}() {
  const response = await fetch("${e}", {
    method: "${t}",
    headers: {
      "Content-Type": "application/json"
    }${["POST", "PUT", "PATCH"].includes(t) && y ? `,
    body: JSON.stringify(
${JSON.stringify(j, null, 4).split(`
`).map((I) => "      " + I).join(`
`)}
    )` : ""}
  });

  const data = await response.json();
  return data;
}`, F = () => `# Using requests library
import requests

def call_${t.toLowerCase()}():
    url = "${e}"
    headers = {
        "Content-Type": "application/json"
    }
    ${["POST", "PUT", "PATCH"].includes(t) && y ? `
    payload = ${JSON.stringify(j, null, 4).split(`
`).map((I) => "    " + I).join(`
`)}

    response = requests.${t.toLowerCase()}(url, json=payload, headers=headers)
    ` : `
    response = requests.${t.toLowerCase()}(url, headers=headers)
    `}
    return response.json()`, M = () => {
    switch (o) {
      case "curl":
        return S();
      case "typescript":
        return w();
      case "python":
        return F();
      default:
        return "";
    }
  }, b = () => {
    navigator.clipboard.writeText(M()), c(!0), setTimeout(() => c(!1), 2e3);
  }, $ = (I) => {
    switch (I) {
      case "curl":
        return /* @__PURE__ */ l.jsx(oc, { size: 16 });
      case "typescript":
        return /* @__PURE__ */ l.jsx(Zu, { size: 16 });
      case "python":
        return /* @__PURE__ */ l.jsx(rc, { size: 16 });
    }
  }, D = [
    { id: "curl", label: "cURL" },
    { id: "typescript", label: "TypeScript" },
    { id: "python", label: "Python" }
  ];
  return /* @__PURE__ */ l.jsxs("div", { className: "border rounded-lg overflow-hidden shadow-sm bg-white transition-all", children: [
    /* @__PURE__ */ l.jsxs(
      "div",
      {
        className: `border-b bg-gray-50 px-4 py-3 flex items-center ${i ? "cursor-pointer" : ""}`,
        onClick: i ? d : void 0,
        children: [
          /* @__PURE__ */ l.jsx(Nt, { method: t.toUpperCase(), className: "mr-2" }),
          /* @__PURE__ */ l.jsx("div", { className: "text-sm text-gray-800 font-mono truncate overflow-hidden flex-grow", children: e }),
          i && /* @__PURE__ */ l.jsx("div", { className: "text-gray-500 ml-2", children: f ? /* @__PURE__ */ l.jsx(Xt, { size: 18 }) : /* @__PURE__ */ l.jsx(Bi, { size: 18 }) })
        ]
      }
    ),
    !f && /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx("div", { className: "px-4 py-3 border-b bg-gray-50", children: /* @__PURE__ */ l.jsx("div", { className: "flex space-x-1 p-1 bg-gray-100 rounded-md", children: D.map((I) => /* @__PURE__ */ l.jsxs(
        "button",
        {
          onClick: () => p(I.id),
          className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${o === I.id ? "bg-white text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`,
          children: [
            $(I.id),
            I.label
          ]
        },
        I.id
      )) }) }),
      /* @__PURE__ */ l.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ l.jsx("pre", { className: "bg-gray-900 text-gray-100 text-xs p-4 overflow-x-auto max-h-[400px] whitespace-pre-wrap break-words scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-950", children: /* @__PURE__ */ l.jsx("code", { children: M() }) }),
        /* @__PURE__ */ l.jsx(
          "button",
          {
            onClick: b,
            className: "absolute top-3 right-3 p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors",
            title: "复制代码",
            children: u ? /* @__PURE__ */ l.jsx(ec, { size: 16, className: "text-green-400" }) : /* @__PURE__ */ l.jsx(ic, { size: 16 })
          }
        )
      ] })
    ] })
  ] });
}, mc = ({
  security: e,
  securitySchemes: t,
  components: n,
  className: r
}) => {
  const s = e && e.length > 0, i = t && Object.keys(t).length > 0;
  if (!s && !i)
    return null;
  const a = (o, p) => {
    const u = Object.entries(o);
    return u.length === 0 ? null : /* @__PURE__ */ l.jsx("div", { className: "border rounded p-2 text-sm bg-gray-50", children: u.map(([c, f], h) => /* @__PURE__ */ l.jsxs("div", { className: `flex items-center gap-2 ${h > 0 ? "mt-1" : ""}`, children: [
      /* @__PURE__ */ l.jsx("span", { className: "font-mono font-semibold", children: c }),
      f.length > 0 && /* @__PURE__ */ l.jsxs("span", { className: "text-xs text-gray-600", children: [
        "Scopes: ",
        f.join(", ")
      ] }),
      f.length === 0 && /* @__PURE__ */ l.jsx("span", { className: "text-xs text-gray-500 italic", children: "(No specific scopes required)" })
    ] }, c)) }, p);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `py-6 ${r}`, children: [
    /* @__PURE__ */ l.jsx(Re, { title: "Security", className: "text-2xl mb-4" }),
    s && /* @__PURE__ */ l.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ l.jsx("h3", { className: "text-lg font-semibold mb-2", children: "Global Requirements" }),
      /* @__PURE__ */ l.jsx("p", { className: "text-sm text-gray-600 mb-3", children: "API calls must satisfy ONE of the following security requirement sets:" }),
      /* @__PURE__ */ l.jsx("div", { className: "space-y-2", children: e == null ? void 0 : e.map(a) })
    ] }),
    i && /* @__PURE__ */ l.jsxs("div", { className: s ? "mt-8" : "", children: [
      /* @__PURE__ */ l.jsx("h3", { className: "text-lg font-semibold mb-3", children: "Security Schemes" }),
      /* @__PURE__ */ l.jsx("div", { className: "space-y-4", children: Object.entries(t || {}).map(([o, p]) => {
        const u = ue(p, n, "securitySchemes");
        if (!u) {
          const c = p && typeof p == "object" && "$ref" in p ? p.$ref : "[unknown reference]";
          return /* @__PURE__ */ l.jsxs("div", { className: "text-xs text-red-500", children: [
            "Failed to resolve scheme: ",
            c
          ] }, o);
        }
        return /* @__PURE__ */ l.jsx($i, { name: o, scheme: u }, o);
      }) })
    ] })
  ] });
}, xc = ({ servers: e, className: t }) => !e || e.length === 0 ? null : /* @__PURE__ */ l.jsxs("div", { className: `py-4 ${t}`, children: [
  /* @__PURE__ */ l.jsx(Re, { title: "Servers", className: "text-xl mb-3" }),
  /* @__PURE__ */ l.jsx("div", { className: "space-y-4", children: e.map((n, r) => /* @__PURE__ */ l.jsx(Fi, { server: n, className: "border rounded" }, r)) })
] }), gc = ({
  operation: e,
  method: t,
  path: n,
  baseUrl: r = "",
  components: s,
  collapsible: i = !1,
  defaultCollapsed: a = !1
}) => {
  const [o, p] = ee({}), [u, c] = ee(""), [f, h] = ee(!1), [d, y] = ee(null), [v, P] = ee({
    "Content-Type": "application/json"
  }), [j, S] = ee(null), [w, F] = ee(a), M = () => {
    i && F(!w);
  }, b = () => {
    const N = [];
    return e.parameters && e.parameters.forEach((B) => {
      if ("$ref" in B) {
        const H = ue(B, s, "parameters");
        H && N.push(H);
      } else
        N.push(B);
    }), N;
  }, $ = () => e.requestBody ? e.requestBody : null, D = (N, B) => {
    p((H) => ({
      ...H,
      [N]: B
    }));
  }, I = (N) => {
    c(N);
  }, z = (N, B) => {
    P((H) => ({
      ...H,
      [N]: B
    }));
  }, T = () => {
    let N = r + n;
    const B = b();
    B.filter((G) => G.in === "path").forEach((G) => {
      const ce = o[G.name] || "";
      N = N.replace(`{${G.name}}`, encodeURIComponent(ce));
    });
    const H = B.filter((G) => G.in === "query" && o[G.name]).map((G) => `${G.name}=${encodeURIComponent(o[G.name] || "")}`);
    return H.length > 0 && (N += `?${H.join("&")}`), N;
  }, A = () => {
    const N = { ...v };
    return b().filter((H) => H.in === "header" && o[H.name]).forEach((H) => {
      N[H.name] = o[H.name] || "";
    }), N;
  }, R = async () => {
    try {
      h(!0), S(null), y(null);
      const N = T(), B = A(), H = $();
      let G;
      if (H && u)
        try {
          JSON.parse(u), G = u;
        } catch {
          S("请求体不是有效的JSON"), h(!1);
          return;
        }
      const ce = Date.now(), x = await fetch(N, {
        method: t.toUpperCase(),
        headers: B,
        body: ["GET", "HEAD"].includes(t.toUpperCase()) ? void 0 : G
      }), xe = Date.now() - ce, g = {};
      x.headers.forEach((ne, Pe) => {
        g[Pe] = ne;
      });
      let de = "";
      const ge = x.headers.get("content-type") || "";
      if (ge.includes("application/json")) {
        const ne = await x.json();
        de = JSON.stringify(ne, null, 2);
      } else ge.includes("text/") || ge.includes("application/xml") || ge.includes("application/javascript") ? de = await x.text() : de = "无法显示二进制响应内容";
      y({
        status: x.status,
        statusText: x.statusText,
        headers: g,
        body: de,
        time: xe
      });
    } catch (N) {
      console.error("请求错误:", N), S(N instanceof Error ? N.message : "发送请求时出错");
    } finally {
      h(!1);
    }
  }, _ = (N) => N >= 200 && N < 300 ? "bg-green-100 text-green-800" : N >= 400 && N < 500 ? "bg-yellow-100 text-yellow-800" : N >= 500 ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800";
  return /* @__PURE__ */ l.jsxs("div", { className: "border rounded-lg overflow-hidden shadow-sm bg-white transition-all", children: [
    /* @__PURE__ */ l.jsxs(
      "div",
      {
        className: `border-b bg-gray-50 px-4 py-3 flex items-center justify-between ${i ? "cursor-pointer" : ""}`,
        onClick: i ? M : void 0,
        children: [
          /* @__PURE__ */ l.jsxs("div", { className: "flex items-center min-w-0", children: [
            /* @__PURE__ */ l.jsx(Nt, { method: t.toUpperCase(), className: "mr-2 flex-shrink-0" }),
            /* @__PURE__ */ l.jsx("div", { className: "text-sm text-gray-800 font-mono truncate overflow-hidden", children: n })
          ] }),
          i && /* @__PURE__ */ l.jsx("div", { className: "text-gray-500 flex-shrink-0 ml-2", children: w ? /* @__PURE__ */ l.jsx(Xt, { size: 18 }) : /* @__PURE__ */ l.jsx(Bi, { size: 18 }) })
        ]
      }
    ),
    !w && /* @__PURE__ */ l.jsxs("div", { className: "p-4 space-y-4", children: [
      b().length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ l.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ l.jsx("h3", { className: "text-sm font-medium text-gray-700", children: "请求参数" }) }),
        /* @__PURE__ */ l.jsx("div", { className: "space-y-3", children: b().map((N) => /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-12 gap-2 items-start", children: [
          /* @__PURE__ */ l.jsx("div", { className: "col-span-4", children: /* @__PURE__ */ l.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ l.jsxs("span", { className: `text-sm ${N.required ? "font-semibold" : ""}`, children: [
              N.name,
              " ",
              N.required && /* @__PURE__ */ l.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ l.jsx("span", { className: "text-xs bg-gray-100 px-1 py-0.5 rounded", children: N.in })
          ] }) }),
          /* @__PURE__ */ l.jsx("div", { className: "col-span-8", children: /* @__PURE__ */ l.jsx(
            "input",
            {
              type: "text",
              value: o[N.name] || "",
              onChange: (B) => D(N.name, B.target.value),
              className: "w-full px-2 py-1 border rounded text-sm",
              placeholder: `输入${N.name}值`
            }
          ) })
        ] }, N.name)) })
      ] }),
      $() && /* @__PURE__ */ l.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ l.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ l.jsx("h3", { className: "text-sm font-medium text-gray-700", children: "请求体" }) }),
        /* @__PURE__ */ l.jsx("div", { className: "text-xs text-gray-500 mb-1", children: (() => {
          const N = $();
          return N && "description" in N && N.description || "请输入请求体数据";
        })() }),
        /* @__PURE__ */ l.jsx("div", { className: "bg-gray-50 p-1 rounded-md border", children: /* @__PURE__ */ l.jsx(
          "textarea",
          {
            className: "w-full bg-transparent p-2 font-mono text-sm resize-y",
            value: u,
            onChange: (N) => I(N.target.value),
            rows: 5,
            placeholder: "{ /* 请求体数据 */ }"
          }
        ) })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ l.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ l.jsx("h3", { className: "text-sm font-medium text-gray-700", children: "请求头" }) }),
        /* @__PURE__ */ l.jsxs("div", { className: "space-y-2", children: [
          Object.entries(v).map(([N, B]) => /* @__PURE__ */ l.jsxs("div", { className: "grid grid-cols-12 gap-2 items-center", children: [
            /* @__PURE__ */ l.jsx("div", { className: "col-span-4", children: /* @__PURE__ */ l.jsx(
              "input",
              {
                type: "text",
                value: N,
                onChange: (H) => {
                  const G = { ...v }, ce = G[N];
                  delete G[N], G[H.target.value] = ce, P(G);
                },
                className: "w-full px-2 py-1 border rounded text-sm",
                placeholder: "请求头名称"
              }
            ) }),
            /* @__PURE__ */ l.jsx("div", { className: "col-span-6", children: /* @__PURE__ */ l.jsx(
              "input",
              {
                type: "text",
                value: B,
                onChange: (H) => z(N, H.target.value),
                className: "w-full px-2 py-1 border rounded text-sm",
                placeholder: "值"
              }
            ) }),
            /* @__PURE__ */ l.jsx("div", { className: "col-span-2 flex justify-end", children: /* @__PURE__ */ l.jsx(
              "button",
              {
                onClick: () => {
                  const H = { ...v };
                  delete H[N], P(H);
                },
                className: "px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors",
                children: "删除"
              }
            ) })
          ] }, N)),
          /* @__PURE__ */ l.jsx(
            "button",
            {
              onClick: () => {
                P((N) => ({
                  ...N,
                  [`Header-${Object.keys(v).length}`]: ""
                }));
              },
              className: "text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors inline-flex items-center",
              children: "添加请求头"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ l.jsx("div", { className: "pt-2", children: /* @__PURE__ */ l.jsxs(
        "button",
        {
          onClick: R,
          disabled: f,
          className: `px-3 py-1.5 rounded-md text-white text-sm font-medium inline-flex items-center ${f ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} transition-colors`,
          children: [
            /* @__PURE__ */ l.jsx(ac, { size: 14, className: "mr-1.5" }),
            f ? "发送中..." : "发送请求"
          ]
        }
      ) }),
      j && /* @__PURE__ */ l.jsxs("div", { className: "mt-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-100", children: [
        /* @__PURE__ */ l.jsx("p", { className: "text-sm font-medium", children: "请求错误" }),
        /* @__PURE__ */ l.jsx("p", { className: "text-sm", children: j })
      ] }),
      d && /* @__PURE__ */ l.jsxs("div", { className: "mt-4 border rounded-md overflow-hidden", children: [
        /* @__PURE__ */ l.jsx("div", { className: "bg-gray-50 p-3 border-b flex justify-between items-center", children: /* @__PURE__ */ l.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ l.jsxs("span", { className: `px-2 py-1 rounded text-xs font-medium ${_(d.status)}`, children: [
            d.status,
            " ",
            d.statusText
          ] }),
          /* @__PURE__ */ l.jsxs("span", { className: "ml-2 text-sm text-gray-600", children: [
            d.time,
            "ms"
          ] })
        ] }) }),
        /* @__PURE__ */ l.jsxs("div", { className: "divide-y", children: [
          /* @__PURE__ */ l.jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "响应头" }),
            /* @__PURE__ */ l.jsx("div", { className: "bg-gray-50 p-3 rounded-md border overflow-x-auto", children: /* @__PURE__ */ l.jsx("pre", { className: "text-xs font-mono", children: Object.entries(d.headers).map(([N, B]) => `${N}: ${B}
`) }) })
          ] }),
          /* @__PURE__ */ l.jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ l.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "响应体" }),
            /* @__PURE__ */ l.jsx("div", { className: "bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto", children: /* @__PURE__ */ l.jsx("pre", { className: "text-xs font-mono whitespace-pre-wrap", children: d.body }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}, yc = ({
  openapi: e,
  activePath: t = null,
  onSelectOperation: n = () => {
  },
  onSelectSchema: r,
  className: s
}) => {
  var S;
  const [i, a] = ee({}), [o, p] = ee(""), [u, c] = ee(!1), f = (w) => {
    a((F) => ({
      ...F,
      [w]: !F[w]
    }));
  }, h = () => {
    const w = e.tags || [], F = {};
    w.forEach((M) => {
      F[M.name] = !1;
    }), a(F), c(!1);
  }, d = () => {
    const w = e.tags || [], F = {};
    w.forEach((M) => {
      F[M.name] = !0;
    }), a(F), c(!0);
  }, y = () => {
    u ? h() : d();
  }, v = (w, F, M) => {
    var $, D, I;
    if (!o) return !0;
    const b = o.toLowerCase();
    return w.toLowerCase().includes(b) || F.toLowerCase().includes(b) || (($ = M.summary) == null ? void 0 : $.toLowerCase().includes(b)) || ((D = M.description) == null ? void 0 : D.toLowerCase().includes(b)) || ((I = M.operationId) == null ? void 0 : I.toLowerCase().includes(b));
  }, P = e.tags || [], j = P.length > 0;
  return /* @__PURE__ */ l.jsxs("nav", { className: `sticky top-0 h-screen overflow-y-auto bg-gray-50 border-r border-gray-200 ${s}`, children: [
    /* @__PURE__ */ l.jsxs("div", { className: "sticky top-0 z-10 bg-slate-700 text-white px-4 py-2 shadow-md", children: [
      /* @__PURE__ */ l.jsx("h2", { className: "text-base font-semibold truncate", children: e.info.title }),
      /* @__PURE__ */ l.jsx("p", { className: "text-xs text-slate-300 mt-0.5 truncate", children: e.info.version })
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "px-4 py-2 border-b border-gray-200 sticky top-[53px] bg-gray-50 z-10", children: /* @__PURE__ */ l.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ l.jsx(
        "input",
        {
          type: "text",
          value: o,
          onChange: (w) => p(w.target.value),
          placeholder: "搜索API...",
          className: "w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
        }
      ),
      /* @__PURE__ */ l.jsx(lc, { className: "absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" })
    ] }) }),
    /* @__PURE__ */ l.jsxs("div", { className: "p-4", children: [
      j ? (
        // 有标签时的渲染
        /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ l.jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider text-gray-500", children: "接口" }),
            /* @__PURE__ */ l.jsx(
              "button",
              {
                onClick: y,
                className: "flex items-center text-xs text-gray-500 hover:text-gray-700 transition-colors",
                title: u ? "全部展开" : "全部折叠",
                children: u ? /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
                  /* @__PURE__ */ l.jsx(tc, { className: "h-3.5 w-3.5 mr-1" }),
                  /* @__PURE__ */ l.jsx("span", { children: "展开" })
                ] }) : /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
                  /* @__PURE__ */ l.jsx(nc, { className: "h-3.5 w-3.5 mr-1" }),
                  /* @__PURE__ */ l.jsx("span", { children: "折叠" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ l.jsx("ul", { className: "space-y-3", children: P.map((w) => {
            const F = i[w.name];
            return /* @__PURE__ */ l.jsxs("li", { className: "border-b border-gray-100 pb-2 last:border-0", children: [
              /* @__PURE__ */ l.jsxs(
                "div",
                {
                  className: "flex items-center justify-between cursor-pointer py-1.5 group",
                  onClick: () => f(w.name),
                  children: [
                    /* @__PURE__ */ l.jsxs("div", { className: "flex items-center", children: [
                      F ? /* @__PURE__ */ l.jsx(Mi, { className: "h-4 w-4 text-gray-500 mr-1.5" }) : /* @__PURE__ */ l.jsx(Xt, { className: "h-4 w-4 text-gray-500 mr-1.5" }),
                      /* @__PURE__ */ l.jsx("span", { className: "font-medium text-gray-700", children: w.name })
                    ] }),
                    w.description && /* @__PURE__ */ l.jsx(
                      "span",
                      {
                        className: "text-xs text-gray-400 group-hover:text-slate-600 transition-colors flex items-center",
                        title: w.description,
                        children: /* @__PURE__ */ l.jsx(sc, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ]
                }
              ),
              !F && /* @__PURE__ */ l.jsx("ul", { className: "pl-0 mt-1.5 space-y-0.5", children: Object.entries(e.paths).map(([M, b]) => Object.entries(b).filter(([D]) => ["get", "post", "put", "delete", "patch"].includes(D)).map(([D, I]) => {
                var T;
                if (!((T = I.tags) != null && T.includes(w.name)) || !v(M, D, I))
                  return null;
                const z = t === M;
                return /* @__PURE__ */ l.jsx("li", { children: /* @__PURE__ */ l.jsxs(
                  "button",
                  {
                    onClick: () => n(M, D, I),
                    className: `w-full text-left px-2.5 flex items-center gap-2 py-1 rounded-md text-sm transition-colors
                                    ${z ? "bg-slate-200 text-slate-800" : "text-gray-700 hover:bg-gray-100"}`,
                    title: I.summary || M,
                    children: [
                      /* @__PURE__ */ l.jsx("span", { className: "font-mono text-xs truncate flex-1", children: M }),
                      /* @__PURE__ */ l.jsx(Nt, { method: D.toUpperCase(), variant: "compact", className: "flex-shrink-0" })
                    ]
                  }
                ) }, `${D}-${M}`);
              }).filter(Boolean)) })
            ] }, w.name);
          }) })
        ] })
      ) : (
        // 无标签时直接显示所有路径
        /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3", children: "接口" }),
          /* @__PURE__ */ l.jsx("ul", { className: "space-y-0.5", children: Object.entries(e.paths).map(([w, F]) => Object.entries(F).filter(([b]) => ["get", "post", "put", "delete", "patch"].includes(b)).map(([b, $]) => {
            if (!v(w, b, $)) return null;
            const D = t === w;
            return /* @__PURE__ */ l.jsx("li", { children: /* @__PURE__ */ l.jsxs(
              "button",
              {
                onClick: () => n(w, b, $),
                className: `w-full text-left px-2.5 flex items-center gap-2 py-1 rounded-md text-sm
                          ${D ? "bg-slate-200 text-slate-800" : "text-gray-700 hover:bg-gray-100"}`,
                title: $.summary || w,
                children: [
                  /* @__PURE__ */ l.jsx("span", { className: "font-mono text-xs truncate flex-1", children: w }),
                  /* @__PURE__ */ l.jsx(Nt, { method: b.toUpperCase(), variant: "compact", className: "flex-shrink-0" })
                ]
              }
            ) }, `${b}-${w}`);
          }).filter(Boolean)) })
        ] })
      ),
      ((S = e.components) == null ? void 0 : S.schemas) && Object.keys(e.components.schemas).length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ l.jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3", children: "数据模型" }),
        /* @__PURE__ */ l.jsx("ul", { className: "space-y-0.5 pl-2", children: Object.keys(e.components.schemas).filter((w) => !o || w.toLowerCase().includes(o.toLowerCase())).map((w) => /* @__PURE__ */ l.jsx("li", { className: "group", children: /* @__PURE__ */ l.jsxs(
          "div",
          {
            className: "flex items-center py-0.5 px-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-700",
            onClick: () => r == null ? void 0 : r(w),
            children: [
              /* @__PURE__ */ l.jsx("span", { className: "h-2 w-2 rounded-full bg-slate-500 mr-2 flex-shrink-0" }),
              /* @__PURE__ */ l.jsx("span", { className: "font-mono text-xs truncate", children: w })
            ]
          }
        ) }, w)) })
      ] })
    ] })
  ] });
}, Ur = 280, Hr = 350, bc = 280, kc = ({ spec: e, className: t }) => {
  const [n, r] = ee(null), [s, i] = ee(null), [a, o] = ee(null), [p, u] = ee(bc), [c, f] = ee(!1), h = sn(null), d = sn(null), [y, v] = ee(null), P = sn(null), {
    getOperationsByTag: j,
    components: S,
    resolve: w
  } = Yt(e);
  rt(() => {
    d.current && d.current.style.setProperty("--sidebar-width", `${p}px`);
  }, [p]);
  const F = (D) => {
    D.preventDefault(), f(!0);
  };
  rt(() => {
    const D = (z) => {
      if (!c || !d.current) return;
      let T = z.clientX;
      T < Ur && (T = Ur), T > Hr && (T = Hr), d.current.style.setProperty("--sidebar-width", `${T}px`);
    }, I = () => {
      if (c && d.current) {
        const z = d.current.style.getPropertyValue("--sidebar-width"), T = parseInt(z, 10);
        isNaN(T) || u(T);
      }
      f(!1);
    };
    return c && (document.addEventListener("mousemove", D), document.addEventListener("mouseup", I)), () => {
      document.removeEventListener("mousemove", D), document.removeEventListener("mouseup", I);
    };
  }, [c]);
  const M = n ? { [n]: j()[n] || [] } : j(), b = Zi((D, I, z, T) => {
    i(D), o({
      path: I,
      method: z.toUpperCase(),
      operation: T
    }), setTimeout(() => {
      const A = document.getElementById(`operation-${D}`);
      A && A.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []), $ = (D) => {
    v(D), P.current && P.current.scrollIntoView({ behavior: "smooth", block: "start" }), setTimeout(() => {
      const I = new CustomEvent("openapi-select-schema", {
        detail: { name: D, type: "schemas" }
      });
      document.dispatchEvent(I);
    }, 300);
  };
  return rt(() => {
    const D = setTimeout(() => {
      if (!a)
        try {
          const I = j(), z = Object.keys(I);
          if (z.length > 0) {
            const T = z[0], A = I[T];
            if (A && A.length > 0) {
              const { path: R, method: _, operation: N } = A[0], B = N.operationId || `${_}-${R}`;
              b(B, R, _, N), console.log("Auto-selected operation:", B);
            }
          }
        } catch (I) {
          console.error("Error auto-selecting operation:", I);
        }
    }, 300);
    return () => clearTimeout(D);
  }, [e, b]), /* @__PURE__ */ l.jsxs("div", { ref: d, className: `flex min-h-screen ${t} ${c ? "select-none cursor-ew-resize" : ""}`, children: [
    /* @__PURE__ */ l.jsxs(
      "div",
      {
        ref: h,
        className: "flex-shrink-0 relative",
        style: { width: "var(--sidebar-width)" },
        children: [
          /* @__PURE__ */ l.jsx(
            yc,
            {
              openapi: e,
              onSelectOperation: (D, I, z) => {
                const T = z.operationId || `${I}-${D}`;
                b(T, D, I, z);
              },
              onSelectSchema: $
            }
          ),
          /* @__PURE__ */ l.jsx(
            "div",
            {
              className: "absolute top-0 right-0 bottom-0 w-1 bg-transparent hover:bg-slate-400 cursor-ew-resize z-10",
              onMouseDown: F
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ l.jsxs("main", { className: "flex-grow p-8 overflow-y-auto", children: [
      /* @__PURE__ */ l.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ l.jsx(Re, { title: "基本信息", className: "text-2xl mb-6 pb-2 border-b" }),
        e.info && /* @__PURE__ */ l.jsx(fc, { info: e.info })
      ] }),
      e.servers && e.servers.length > 0 && /* @__PURE__ */ l.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ l.jsx(Re, { title: "服务器", className: "text-2xl mb-6 pb-2 border-b" }),
        /* @__PURE__ */ l.jsx(xc, { servers: e.servers })
      ] }),
      /* @__PURE__ */ l.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ l.jsx(
          Re,
          {
            title: n ? `接口 "${n}"` : "所有接口",
            className: "text-2xl mb-6 pb-2 border-b"
          }
        ),
        Object.keys(M).length > 0 ? /* @__PURE__ */ l.jsx("div", { className: "space-y-8", children: Object.entries(M).map(([D, I]) => /* @__PURE__ */ l.jsxs("div", { className: "space-y-4", children: [
          D !== n && /* @__PURE__ */ l.jsx("h3", { className: "text-xl font-medium text-gray-700", children: D }),
          I.map(({ path: z, method: T, operation: A }) => {
            const R = A.operationId || `${T}-${z}`;
            return /* @__PURE__ */ l.jsx("div", { id: `operation-${R}`, children: /* @__PURE__ */ l.jsx(
              Jt,
              {
                onSelectOperation: () => b(R, z, T, A),
                path: z,
                method: T.toUpperCase(),
                operation: A,
                components: S
              }
            ) }, `${T}-${z}`);
          })
        ] }, D)) }) : n && /* @__PURE__ */ l.jsxs("div", { className: "text-gray-500 italic", children: [
          '没有找到标签为 "',
          n,
          '" 的操作。'
        ] })
      ] }),
      S && Object.keys(S).length > 0 && /* @__PURE__ */ l.jsxs("div", { ref: P, className: "mb-10", id: "components-section", children: [
        /* @__PURE__ */ l.jsx(Re, { title: "数据模型", className: "text-2xl mb-6 pb-2 border-b" }),
        /* @__PURE__ */ l.jsx(
          cc,
          {
            components: S,
            selectedSchema: y
          }
        )
      ] }),
      (e.security || (S == null ? void 0 : S.securitySchemes)) && /* @__PURE__ */ l.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ l.jsx(Re, { title: "安全设置", className: "text-2xl mb-6 pb-2 border-b" }),
        /* @__PURE__ */ l.jsx(
          mc,
          {
            security: e.security,
            securitySchemes: S == null ? void 0 : S.securitySchemes,
            components: S
          }
        )
      ] }),
      e.externalDocs && /* @__PURE__ */ l.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ l.jsx(Re, { title: "外部文档", className: "text-2xl mb-6 pb-2 border-b" }),
        /* @__PURE__ */ l.jsx(_i, { externalDocs: e.externalDocs })
      ] })
    ] }),
    a && /* @__PURE__ */ l.jsx("aside", { className: "w-1/3 max-w-screen-md flex-shrink-0 p-4 border-l bg-gray-50", children: /* @__PURE__ */ l.jsxs("div", { className: "sticky top-4", children: [
      /* @__PURE__ */ l.jsx(
        hc,
        {
          endpoint: a.path,
          method: a.method,
          components: S,
          requestBody: a.operation.requestBody,
          parameters: a.operation.parameters || [],
          collapsible: !0,
          defaultCollapsed: !1
        }
      ),
      /* @__PURE__ */ l.jsx("div", { className: "mt-6", children: /* @__PURE__ */ l.jsx(
        gc,
        {
          operation: a.operation,
          method: a.method,
          path: a.path,
          baseUrl: e.servers && e.servers.length > 0 ? e.servers[0].url : "",
          components: S,
          collapsible: !0,
          defaultCollapsed: !0
        }
      ) })
    ] }) })
  ] });
}, wc = ({
  path: e,
  pathItem: t,
  components: n,
  className: r
}) => {
  const s = [
    { method: "get", operation: t.get },
    { method: "put", operation: t.put },
    { method: "post", operation: t.post },
    { method: "delete", operation: t.delete },
    { method: "options", operation: t.options },
    { method: "head", operation: t.head },
    { method: "patch", operation: t.patch },
    { method: "trace", operation: t.trace }
  ].filter(({ operation: i }) => i);
  return /* @__PURE__ */ l.jsxs("div", { className: `space-y-4 ${r || ""}`, children: [
    /* @__PURE__ */ l.jsx("h2", { className: "text-xl font-semibold text-gray-900", children: e }),
    t.description && /* @__PURE__ */ l.jsx("p", { className: "text-gray-600", children: t.description }),
    /* @__PURE__ */ l.jsx("div", { className: "space-y-6", children: s.map(({ method: i, operation: a }) => /* @__PURE__ */ l.jsx(
      Jt,
      {
        path: e,
        method: i,
        operation: a,
        components: n
      },
      i
    )) })
  ] });
};
export {
  Gu as ComponentDetail,
  kc as OpenApiLayout,
  Jt as OperationBox,
  wc as PathItemDisplay,
  gc as TryItOutPanel,
  Xu as WebhookDisplay,
  Yt as useOpenApi
};

import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import { computed, resolveComponent, unref, withCtx, createVNode, createTextVNode, useSSRContext, createSSRApp, h as h$1 } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/inertia-vue3";
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t4) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2)
        Object.prototype.hasOwnProperty.call(r2, n2) && (t4[n2] = r2[n2]);
    }
    return t4;
  }, t.apply(this, arguments);
}
var e = String.prototype.replace, r = /%20/g, n = { default: "RFC3986", formatters: { RFC1738: function(t4) {
  return e.call(t4, r, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738", RFC3986: "RFC3986" }, o = Object.prototype.hasOwnProperty, i = Array.isArray, u = function() {
  for (var t4 = [], e2 = 0; e2 < 256; ++e2)
    t4.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t4;
}(), a = function(t4, e2) {
  for (var r2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2)
    void 0 !== t4[n2] && (r2[n2] = t4[n2]);
  return r2;
}, s = { arrayToObject: a, assign: function(t4, e2) {
  return Object.keys(e2).reduce(function(t5, r2) {
    return t5[r2] = e2[r2], t5;
  }, t4);
}, combine: function(t4, e2) {
  return [].concat(t4, e2);
}, compact: function(t4) {
  for (var e2 = [{ obj: { o: t4 }, prop: "o" }], r2 = [], n2 = 0; n2 < e2.length; ++n2)
    for (var o2 = e2[n2], u2 = o2.obj[o2.prop], a2 = Object.keys(u2), s2 = 0; s2 < a2.length; ++s2) {
      var f2 = a2[s2], c2 = u2[f2];
      "object" == typeof c2 && null !== c2 && -1 === r2.indexOf(c2) && (e2.push({ obj: u2, prop: f2 }), r2.push(c2));
    }
  return function(t5) {
    for (; t5.length > 1; ) {
      var e3 = t5.pop(), r3 = e3.obj[e3.prop];
      if (i(r3)) {
        for (var n3 = [], o3 = 0; o3 < r3.length; ++o3)
          void 0 !== r3[o3] && n3.push(r3[o3]);
        e3.obj[e3.prop] = n3;
      }
    }
  }(e2), t4;
}, decode: function(t4, e2, r2) {
  var n2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === r2)
    return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t5) {
    return n2;
  }
}, encode: function(t4, e2, r2, o2, i2) {
  if (0 === t4.length)
    return t4;
  var a2 = t4;
  if ("symbol" == typeof t4 ? a2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (a2 = String(t4)), "iso-8859-1" === r2)
    return escape(a2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
      return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
    });
  for (var s2 = "", f2 = 0; f2 < a2.length; ++f2) {
    var c2 = a2.charCodeAt(f2);
    45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || i2 === n.RFC1738 && (40 === c2 || 41 === c2) ? s2 += a2.charAt(f2) : c2 < 128 ? s2 += u[c2] : c2 < 2048 ? s2 += u[192 | c2 >> 6] + u[128 | 63 & c2] : c2 < 55296 || c2 >= 57344 ? s2 += u[224 | c2 >> 12] + u[128 | c2 >> 6 & 63] + u[128 | 63 & c2] : (c2 = 65536 + ((1023 & c2) << 10 | 1023 & a2.charCodeAt(f2 += 1)), s2 += u[240 | c2 >> 18] + u[128 | c2 >> 12 & 63] + u[128 | c2 >> 6 & 63] + u[128 | 63 & c2]);
  }
  return s2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, e2) {
  if (i(t4)) {
    for (var r2 = [], n2 = 0; n2 < t4.length; n2 += 1)
      r2.push(e2(t4[n2]));
    return r2;
  }
  return e2(t4);
}, merge: function t2(e2, r2, n2) {
  if (!r2)
    return e2;
  if ("object" != typeof r2) {
    if (i(e2))
      e2.push(r2);
    else {
      if (!e2 || "object" != typeof e2)
        return [e2, r2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !o.call(Object.prototype, r2)) && (e2[r2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2)
    return [e2].concat(r2);
  var u2 = e2;
  return i(e2) && !i(r2) && (u2 = a(e2, n2)), i(e2) && i(r2) ? (r2.forEach(function(r3, i2) {
    if (o.call(e2, i2)) {
      var u3 = e2[i2];
      u3 && "object" == typeof u3 && r3 && "object" == typeof r3 ? e2[i2] = t2(u3, r3, n2) : e2.push(r3);
    } else
      e2[i2] = r3;
  }), e2) : Object.keys(r2).reduce(function(e3, i2) {
    var u3 = r2[i2];
    return e3[i2] = o.call(e3, i2) ? t2(e3[i2], u3, n2) : u3, e3;
  }, u2);
} }, f = Object.prototype.hasOwnProperty, c = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, e2) {
  return t4 + "[" + e2 + "]";
}, repeat: function(t4) {
  return t4;
} }, l = Array.isArray, p = String.prototype.split, h = Array.prototype.push, y = function(t4, e2) {
  h.apply(t4, l(e2) ? e2 : [e2]);
}, d = Date.prototype.toISOString, b = n.default, v = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: s.encode, encodeValuesOnly: false, format: b, formatter: n.formatters[b], indices: false, serializeDate: function(t4) {
  return d.call(t4);
}, skipNulls: false, strictNullHandling: false }, m = function t3(e2, r2, n2, o2, i2, u2, a2, f2, c2, h2, d2, b2, m2, g2) {
  var j2, w2 = e2;
  if ("function" == typeof a2 ? w2 = a2(r2, w2) : w2 instanceof Date ? w2 = h2(w2) : "comma" === n2 && l(w2) && (w2 = s.maybeMap(w2, function(t4) {
    return t4 instanceof Date ? h2(t4) : t4;
  })), null === w2) {
    if (o2)
      return u2 && !m2 ? u2(r2, v.encoder, g2, "key", d2) : r2;
    w2 = "";
  }
  if ("string" == typeof (j2 = w2) || "number" == typeof j2 || "boolean" == typeof j2 || "symbol" == typeof j2 || "bigint" == typeof j2 || s.isBuffer(w2)) {
    if (u2) {
      var O2 = m2 ? r2 : u2(r2, v.encoder, g2, "key", d2);
      if ("comma" === n2 && m2) {
        for (var $2 = p.call(String(w2), ","), E2 = "", S2 = 0; S2 < $2.length; ++S2)
          E2 += (0 === S2 ? "" : ",") + b2(u2($2[S2], v.encoder, g2, "value", d2));
        return [b2(O2) + "=" + E2];
      }
      return [b2(O2) + "=" + b2(u2(w2, v.encoder, g2, "value", d2))];
    }
    return [b2(r2) + "=" + b2(String(w2))];
  }
  var R2, x2 = [];
  if (void 0 === w2)
    return x2;
  if ("comma" === n2 && l(w2))
    R2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (l(a2))
    R2 = a2;
  else {
    var C2 = Object.keys(w2);
    R2 = f2 ? C2.sort(f2) : C2;
  }
  for (var N = 0; N < R2.length; ++N) {
    var k = R2[N], T = "object" == typeof k && void 0 !== k.value ? k.value : w2[k];
    if (!i2 || null !== T) {
      var _ = l(w2) ? "function" == typeof n2 ? n2(r2, k) : r2 : r2 + (c2 ? "." + k : "[" + k + "]");
      y(x2, t3(T, _, n2, o2, i2, u2, a2, f2, c2, h2, d2, b2, m2, g2));
    }
  }
  return x2;
}, g = Object.prototype.hasOwnProperty, j = Array.isArray, w = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: s.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, $ = function(t4, e2) {
  return t4 && "string" == typeof t4 && e2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, E = function(t4, e2, r2, n2) {
  if (t4) {
    var o2 = r2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = r2.depth > 0 && /(\[[^[\]]*])/.exec(o2), a2 = u2 ? o2.slice(0, u2.index) : o2, s2 = [];
    if (a2) {
      if (!r2.plainObjects && g.call(Object.prototype, a2) && !r2.allowPrototypes)
        return;
      s2.push(a2);
    }
    for (var f2 = 0; r2.depth > 0 && null !== (u2 = i2.exec(o2)) && f2 < r2.depth; ) {
      if (f2 += 1, !r2.plainObjects && g.call(Object.prototype, u2[1].slice(1, -1)) && !r2.allowPrototypes)
        return;
      s2.push(u2[1]);
    }
    return u2 && s2.push("[" + o2.slice(u2.index) + "]"), function(t5, e3, r3, n3) {
      for (var o3 = n3 ? e3 : $(e3, r3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, a3 = t5[i3];
        if ("[]" === a3 && r3.parseArrays)
          u3 = [].concat(o3);
        else {
          u3 = r3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var s3 = "[" === a3.charAt(0) && "]" === a3.charAt(a3.length - 1) ? a3.slice(1, -1) : a3, f3 = parseInt(s3, 10);
          r3.parseArrays || "" !== s3 ? !isNaN(f3) && a3 !== s3 && String(f3) === s3 && f3 >= 0 && r3.parseArrays && f3 <= r3.arrayLimit ? (u3 = [])[f3] = o3 : "__proto__" !== s3 && (u3[s3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(s2, e2, r2, n2);
  }
}, S = function(t4, e2) {
  var r2 = function(t5) {
    if (!t5)
      return w;
    if (null != t5.decoder && "function" != typeof t5.decoder)
      throw new TypeError("Decoder has to be a function.");
    if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset)
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    return { allowDots: void 0 === t5.allowDots ? w.allowDots : !!t5.allowDots, allowPrototypes: "boolean" == typeof t5.allowPrototypes ? t5.allowPrototypes : w.allowPrototypes, arrayLimit: "number" == typeof t5.arrayLimit ? t5.arrayLimit : w.arrayLimit, charset: void 0 === t5.charset ? w.charset : t5.charset, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : w.charsetSentinel, comma: "boolean" == typeof t5.comma ? t5.comma : w.comma, decoder: "function" == typeof t5.decoder ? t5.decoder : w.decoder, delimiter: "string" == typeof t5.delimiter || s.isRegExp(t5.delimiter) ? t5.delimiter : w.delimiter, depth: "number" == typeof t5.depth || false === t5.depth ? +t5.depth : w.depth, ignoreQueryPrefix: true === t5.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof t5.interpretNumericEntities ? t5.interpretNumericEntities : w.interpretNumericEntities, parameterLimit: "number" == typeof t5.parameterLimit ? t5.parameterLimit : w.parameterLimit, parseArrays: false !== t5.parseArrays, plainObjects: "boolean" == typeof t5.plainObjects ? t5.plainObjects : w.plainObjects, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : w.strictNullHandling };
  }(e2);
  if ("" === t4 || null == t4)
    return r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? function(t5, e3) {
    var r3, n3 = {}, o3 = (e3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit), i3 = -1, u3 = e3.charset;
    if (e3.charsetSentinel)
      for (r3 = 0; r3 < o3.length; ++r3)
        0 === o3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[r3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[r3] && (u3 = "iso-8859-1"), i3 = r3, r3 = o3.length);
    for (r3 = 0; r3 < o3.length; ++r3)
      if (r3 !== i3) {
        var a3, f3, c2 = o3[r3], l2 = c2.indexOf("]="), p2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
        -1 === p2 ? (a3 = e3.decoder(c2, w.decoder, u3, "key"), f3 = e3.strictNullHandling ? null : "") : (a3 = e3.decoder(c2.slice(0, p2), w.decoder, u3, "key"), f3 = s.maybeMap($(c2.slice(p2 + 1), e3), function(t6) {
          return e3.decoder(t6, w.decoder, u3, "value");
        })), f3 && e3.interpretNumericEntities && "iso-8859-1" === u3 && (f3 = O(f3)), c2.indexOf("[]=") > -1 && (f3 = j(f3) ? [f3] : f3), n3[a3] = g.call(n3, a3) ? s.combine(n3[a3], f3) : f3;
      }
    return n3;
  }(t4, r2) : t4, o2 = r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var a2 = i2[u2], f2 = E(a2, n2[a2], r2, "string" == typeof t4);
    o2 = s.merge(o2, f2, r2);
  }
  return s.compact(o2);
};
class R {
  constructor(t4, e2, r2) {
    var n2, o2;
    this.name = t4, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (o2 = e2.wheres) ? o2 : {}, this.config = r2;
  }
  get template() {
    return `${this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : ""}/${this.definition.uri}`.replace(/\/+$/, "");
  }
  get parameterSegments() {
    var t4, e2;
    return null != (t4 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t5) => ({ name: t5.replace(/{|\??}/g, ""), required: !/\?}$/.test(t5) }))) ? t4 : [];
  }
  matchesUrl(t4) {
    if (!this.definition.methods.includes("GET"))
      return false;
    const e2 = this.template.replace(/(\/?){([^}?]*)(\??)}/g, (t5, e3, r3, n3) => {
      var o3;
      const i2 = `(?<${r3}>${(null == (o3 = this.wheres[r3]) ? void 0 : o3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i2})?` : `${e3}${i2}`;
    }).replace(/^\w+:\/\//, ""), [r2, n2] = t4.replace(/^\w+:\/\//, "").split("?"), o2 = new RegExp(`^${e2}/?$`).exec(r2);
    return !!o2 && { params: o2.groups, query: S(n2) };
  }
  compile(t4) {
    const e2 = this.parameterSegments;
    return e2.length ? this.template.replace(/{([^}?]+)(\??)}/g, (r2, n2, o2) => {
      var i2, u2, a2;
      if (!o2 && [null, void 0].includes(t4[n2]))
        throw new Error(`Ziggy error: '${n2}' parameter is required for route '${this.name}'.`);
      if (e2[e2.length - 1].name === n2 && ".*" === this.wheres[n2])
        return encodeURIComponent(null != (a2 = t4[n2]) ? a2 : "").replace(/%2F/g, "/");
      if (this.wheres[n2] && !new RegExp(`^${o2 ? `(${this.wheres[n2]})?` : this.wheres[n2]}$`).test(null != (i2 = t4[n2]) ? i2 : ""))
        throw new Error(`Ziggy error: '${n2}' parameter does not match required format '${this.wheres[n2]}' for route '${this.name}'.`);
      return encodeURIComponent(null != (u2 = t4[n2]) ? u2 : "");
    }).replace(/\/+$/, "") : this.template;
  }
}
class x extends String {
  constructor(e2, r2, n2 = true, o2) {
    if (super(), this.t = null != o2 ? o2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2])
        throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new R(e2, this.t.routes[e2], this.t), this.u = this.l(r2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t4) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t4)).filter((t4) => "_query" !== t4).reduce((e3, r2) => t({}, e3, { [r2]: this.u[r2] }), {});
    return this.i.compile(this.u) + function(t4, e3) {
      var r2, o2 = t4, i2 = function(t5) {
        if (!t5)
          return v;
        if (null != t5.encoder && "function" != typeof t5.encoder)
          throw new TypeError("Encoder has to be a function.");
        var e4 = t5.charset || v.charset;
        if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset)
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var r3 = n.default;
        if (void 0 !== t5.format) {
          if (!f.call(n.formatters, t5.format))
            throw new TypeError("Unknown format option provided.");
          r3 = t5.format;
        }
        var o3 = n.formatters[r3], i3 = v.filter;
        return ("function" == typeof t5.filter || l(t5.filter)) && (i3 = t5.filter), { addQueryPrefix: "boolean" == typeof t5.addQueryPrefix ? t5.addQueryPrefix : v.addQueryPrefix, allowDots: void 0 === t5.allowDots ? v.allowDots : !!t5.allowDots, charset: e4, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : v.charsetSentinel, delimiter: void 0 === t5.delimiter ? v.delimiter : t5.delimiter, encode: "boolean" == typeof t5.encode ? t5.encode : v.encode, encoder: "function" == typeof t5.encoder ? t5.encoder : v.encoder, encodeValuesOnly: "boolean" == typeof t5.encodeValuesOnly ? t5.encodeValuesOnly : v.encodeValuesOnly, filter: i3, format: r3, formatter: o3, serializeDate: "function" == typeof t5.serializeDate ? t5.serializeDate : v.serializeDate, skipNulls: "boolean" == typeof t5.skipNulls ? t5.skipNulls : v.skipNulls, sort: "function" == typeof t5.sort ? t5.sort : null, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : v.strictNullHandling };
      }(e3);
      "function" == typeof i2.filter ? o2 = (0, i2.filter)("", o2) : l(i2.filter) && (r2 = i2.filter);
      var u2 = [];
      if ("object" != typeof o2 || null === o2)
        return "";
      var a2 = c[e3 && e3.arrayFormat in c ? e3.arrayFormat : e3 && "indices" in e3 ? e3.indices ? "indices" : "repeat" : "indices"];
      r2 || (r2 = Object.keys(o2)), i2.sort && r2.sort(i2.sort);
      for (var s2 = 0; s2 < r2.length; ++s2) {
        var p2 = r2[s2];
        i2.skipNulls && null === o2[p2] || y(u2, m(o2[p2], p2, a2, i2.strictNullHandling, i2.skipNulls, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset));
      }
      var h2 = u2.join(i2.delimiter), d2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (d2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? d2 + h2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t4, e3) => "boolean" == typeof t4 ? Number(t4) : e3(t4) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.v();
    let r2 = {};
    const [n2, o2] = Object.entries(this.t.routes).find(([t4, n3]) => r2 = new R(t4, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, r2, { route: o2 });
  }
  v() {
    const { host: t4, pathname: e2, search: r2 } = this.h();
    return (this.t.absolute ? t4 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + r2;
  }
  current(e2, r2) {
    const { name: n2, params: o2, query: i2, route: u2 } = this.p();
    if (!e2)
      return n2;
    const a2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r2) || !a2)
      return a2;
    const s2 = new R(n2, u2, this.t);
    r2 = this.l(r2, s2);
    const f2 = t({}, o2, i2);
    return !(!Object.values(r2).every((t4) => !t4) || Object.values(f2).some((t4) => void 0 !== t4)) || Object.entries(r2).every(([t4, e3]) => f2[t4] == e3);
  }
  h() {
    var t4, e2, r2, n2, o2, i2;
    const { host: u2 = "", pathname: a2 = "", search: s2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t4 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t4 : u2, pathname: null != (r2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? r2 : a2, search: null != (o2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? o2 : s2 };
  }
  get params() {
    const { params: e2, query: r2 } = this.p();
    return t({}, e2, r2);
  }
  has(t4) {
    return Object.keys(this.t.routes).includes(t4);
  }
  l(e2 = {}, r2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = r2.parameterSegments.filter(({ name: t4 }) => !this.t.defaults[t4]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, r3, o2) => t({}, e3, n2[o2] ? { [n2[o2].name]: r3 } : "object" == typeof r3 ? r3 : { [r3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(r2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.m(r2), this.g(e2, r2));
  }
  m(e2) {
    return e2.parameterSegments.filter(({ name: t4 }) => this.t.defaults[t4]).reduce((e3, { name: r2 }, n2) => t({}, e3, { [r2]: this.t.defaults[r2] }), {});
  }
  g(e2, { bindings: r2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [o2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t4 }) => t4 === o2))
        return t({}, e3, { [o2]: i2 });
      if (!i2.hasOwnProperty(r2[o2])) {
        if (!i2.hasOwnProperty("id"))
          throw new Error(`Ziggy error: object passed as '${o2}' parameter is missing route model binding key '${r2[o2]}'.`);
        r2[o2] = "id";
      }
      return t({}, e3, { [o2]: i2[r2[o2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
  check(t4) {
    return this.has(t4);
  }
}
const C = { install: (t4, e2) => {
  const r2 = (t5, r3, n2, o2 = e2) => function(t6, e3, r4, n3) {
    const o3 = new x(t6, e3, r4, n3);
    return t6 ? o3.toString() : o3;
  }(t5, r3, n2, o2);
  t4.mixin({ methods: { route: r2 } }), parseInt(t4.version) > 2 && t4.provide("route", r2);
} };
const _imports_0 = "/build/assets/lsn-logo-72964939.png";
const _sfc_main = {
  __name: "MainLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const flashSuccess = computed(() => page.props.value.flash.success);
    const user = computed(() => page.props.value.user);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(`<!--[--><header class="border-b border-gray-200 w-full"><div class="container mx-auto"><nav class="p-4 flex items-center justify-between"><div class="text-xl text-[#81b29a] font-bold text-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "tracking-tight"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} class="object-cover"${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "w-10 h-10" }, [
                createVNode("img", {
                  src: _imports_0,
                  class: "object-cover"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(user)) {
        _push(`<div class="flex gap-4 items-center text-gray-500">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("account.organisation.index")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_font_awesome_icon, { icon: "fa-solid fa-house" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_font_awesome_icon, { icon: "fa-solid fa-house" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="text-sm">Hello, ${ssrInterpolate(unref(user).name)}!</div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("organisation.create"),
          class: "bg-[#81b29a] hover:bg-[#9BCCB4] text-white font-medium p-2 rounded-md"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`+ Submit an organisation`);
            } else {
              return [
                createTextVNode("+ Submit an organisation")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("logout"),
          method: "delete",
          as: "button"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Logout`);
            } else {
              return [
                createTextVNode("Logout")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("user-account.create")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Register`);
            } else {
              return [
                createTextVNode("Register")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` | `);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Sign in`);
            } else {
              return [
                createTextVNode("Sign in")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</nav></div></header><main class="container mx-auto p-4 w-full">`);
      if (unref(flashSuccess)) {
        _push(`<div class="mb-4 border rounded-md shadow-sm border-green-200 bg-green-50 p-2">${ssrInterpolate(unref(flashSuccess))}</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`Default`);
      }, _push, _parent);
      _push(`</main><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/MainLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Account/Index.vue": () => import("./assets/Index-c999d335.mjs"), "./Pages/Auth/Login.vue": () => import("./assets/Login-58fdcd18.mjs"), "./Pages/Index/Components/Filters.vue": () => import("./assets/Filters-5f4aa51a.mjs"), "./Pages/Index/Index.vue": () => import("./assets/Index-82ce4e79.mjs"), "./Pages/Index/Show.vue": () => import("./assets/Show-5893438b.mjs"), "./Pages/Organisation/Create.vue": () => import("./assets/Create-ba4ac8fa.mjs"), "./Pages/Organisation/Edit.vue": () => import("./assets/Edit-3d78009e.mjs"), "./Pages/Organisation/Index.vue": () => import("./assets/Index-93b2a75b.mjs"), "./Pages/Organisation/Show.vue": () => import("./assets/Show-236e41e0.mjs"), "./Pages/UserAccount/Create.vue": () => import("./assets/Create-a5b3a795.mjs") });
      const page2 = pages[`./Pages/${name}.vue`];
      page2.default.layout = page2.default.layout || _sfc_main;
      return page2;
    },
    setup({ App, props, plugin }) {
      return createSSRApp({
        render: () => h$1(App, props)
      }).use(plugin).use(C);
    }
  })
);

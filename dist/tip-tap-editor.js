import { ref as Fs, defineComponent as dr, provide as xa, markRaw as Nu, reactive as Ih, h as fr, render as Sa, getCurrentInstance as Ph, watchEffect as Bh, nextTick as Hh, unref as Fh, onBeforeUnmount as Dl, onMounted as Du, customRef as zh, createElementBlock as P, openBlock as D, createElementVNode as v, createVNode as kn, createCommentVNode as _, createTextVNode as Ki, toDisplayString as V, Transition as Lu, withCtx as rt, withDirectives as Fe, normalizeStyle as zs, renderSlot as Ru, vShow as Iu, createBlock as qt, resolveComponent as Xt, normalizeClass as De, withModifiers as Ne, Fragment as it, renderList as yn, vModelSelect as Hi, vModelText as Kn, vModelCheckbox as Vh } from "vue";
function be(n) {
  this.content = n;
}
be.prototype = {
  constructor: be,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, i = r.find(n), s = r.content.slice();
    return i == -1 ? s.push(t || n, e) : (s[i + 1] = e, t && (s[i] = t)), new be(s);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new be(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new be([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new be(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), s = r.find(n);
    return i.splice(s == -1 ? i.length : s, 0, e, t), new be(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = be.from(n), n.size ? new be(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = be.from(n), n.size ? new be(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = be.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
be.from = function(n) {
  if (n instanceof be) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new be(e);
};
function Pu(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let i = n.child(r), s = e.child(r);
    if (i == s) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(s))
      return t;
    if (i.isText && i.text != s.text) {
      for (let o = 0; i.text[o] == s.text[o]; o++)
        t++;
      return t;
    }
    if (i.content.size || s.content.size) {
      let o = Pu(i.content, s.content, t + 1);
      if (o != null)
        return o;
    }
    t += i.nodeSize;
  }
}
function Bu(n, e, t, r) {
  for (let i = n.childCount, s = e.childCount; ; ) {
    if (i == 0 || s == 0)
      return i == s ? null : { a: t, b: r };
    let o = n.child(--i), l = e.child(--s), a = o.nodeSize;
    if (o == l) {
      t -= a, r -= a;
      continue;
    }
    if (!o.sameMarkup(l))
      return { a: t, b: r };
    if (o.isText && o.text != l.text) {
      let c = 0, u = Math.min(o.text.length, l.text.length);
      for (; c < u && o.text[o.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (o.content.size || l.content.size) {
      let c = Bu(o.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
class A {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, i = 0, s) {
    for (let o = 0, l = 0; l < t; o++) {
      let a = this.content[o], c = l + a.nodeSize;
      if (c > e && r(a, i + l, s || null, o) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, t - u), r, i + u);
      }
      l = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, r, i) {
    let s = "", o = !0;
    return this.nodesBetween(e, t, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (o ? o = !1 : s += r), s += c;
    }, 0), s;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, r = e.firstChild, i = this.content.slice(), s = 0;
    for (t.isText && t.sameMarkup(r) && (i[i.length - 1] = t.withText(t.text + r.text), s = 1); s < e.content.length; s++)
      i.push(e.content[s]);
    return new A(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], i = 0;
    if (t > e)
      for (let s = 0, o = 0; o < t; s++) {
        let l = this.content[s], a = o + l.nodeSize;
        a > e && ((o < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - o), Math.min(l.text.length, t - o)) : l = l.cut(Math.max(0, e - o - 1), Math.min(l.content.size, t - o - 1))), r.push(l), i += l.nodeSize), o = a;
      }
    return new A(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? A.empty : e == 0 && t == this.content.length ? this : new A(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let i = this.content.slice(), s = this.size + t.nodeSize - r.nodeSize;
    return i[e] = t, new A(i, s);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new A([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new A(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, r, t), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return Pu(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Bu(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e, t = -1) {
    if (e == 0)
      return wi(0, e);
    if (e == this.size)
      return wi(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, i = 0; ; r++) {
      let s = this.child(r), o = i + s.nodeSize;
      if (o >= e)
        return o == e || t > 0 ? wi(r + 1, o) : wi(r, i);
      i = o;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return A.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new A(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return A.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      r += s.nodeSize, i && s.isText && e[i - 1].sameMarkup(s) ? (t || (t = e.slice(0, i)), t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)) : t && t.push(s);
    }
    return new A(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return A.empty;
    if (e instanceof A)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new A([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
A.empty = new A([], 0);
const lo = { index: 0, offset: 0 };
function wi(n, e) {
  return lo.index = n, lo.offset = e, lo;
}
function qi(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!qi(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !qi(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let te = class Vo {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      if (this.eq(s))
        return e;
      if (this.type.excludes(s.type))
        t || (t = e.slice(0, i));
      else {
        if (s.type.excludes(this.type))
          return e;
        !r && s.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), r = !0), t && t.push(s);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && qi(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let i = r.create(t.attrs);
    return r.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return Vo.none;
    if (e instanceof Vo)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
te.none = [];
class Ji extends Error {
}
class O {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let r = Fu(this.content, e + this.openStart, t);
    return r && new O(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new O(Hu(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return O.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new O(A.fromJSON(e, t.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, i = 0;
    for (let s = e.firstChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.firstChild)
      r++;
    for (let s = e.lastChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.lastChild)
      i++;
    return new O(e, r, i);
  }
}
O.empty = new O(A.empty, 0, 0);
function Hu(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), s = n.maybeChild(r), { index: o, offset: l } = n.findIndex(t);
  if (i == e || s.isText) {
    if (l != t && !n.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != o)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, s.copy(Hu(s.content, e - i - 1, t - i - 1)));
}
function Fu(n, e, t, r) {
  let { index: i, offset: s } = n.findIndex(e), o = n.maybeChild(i);
  if (s == e || o.isText)
    return n.cut(0, e).append(t).append(n.cut(e));
  let l = Fu(o.content, e - s - 1, t);
  return l && n.replaceChild(i, o.copy(l));
}
function $h(n, e, t) {
  if (t.openStart > n.depth)
    throw new Ji("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Ji("Inconsistent open depths");
  return zu(n, e, t, 0);
}
function zu(n, e, t, r) {
  let i = n.index(r), s = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let o = zu(n, e, t, r + 1);
    return s.copy(s.content.replaceChild(i, o));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let o = n.parent, l = o.content;
      return xn(o, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: o, end: l } = _h(t, n);
      return xn(s, $u(n, o, l, e, r));
    }
  else return xn(s, Gi(n, e, r));
}
function Vu(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Ji("Cannot join " + e.type.name + " onto " + n.type.name);
}
function $o(n, e, t) {
  let r = n.node(t);
  return Vu(r, e.node(t)), r;
}
function Cn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function Tr(n, e, t, r) {
  let i = (e || n).node(t), s = 0, o = e ? e.index(t) : i.childCount;
  n && (s = n.index(t), n.depth > t ? s++ : n.textOffset && (Cn(n.nodeAfter, r), s++));
  for (let l = s; l < o; l++)
    Cn(i.child(l), r);
  e && e.depth == t && e.textOffset && Cn(e.nodeBefore, r);
}
function xn(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function $u(n, e, t, r, i) {
  let s = n.depth > i && $o(n, e, i + 1), o = r.depth > i && $o(t, r, i + 1), l = [];
  return Tr(null, n, i, l), s && o && e.index(i) == t.index(i) ? (Vu(s, o), Cn(xn(s, $u(n, e, t, r, i + 1)), l)) : (s && Cn(xn(s, Gi(n, e, i + 1)), l), Tr(e, t, i, l), o && Cn(xn(o, Gi(t, r, i + 1)), l)), Tr(r, null, i, l), new A(l);
}
function Gi(n, e, t) {
  let r = [];
  if (Tr(null, n, t, r), n.depth > t) {
    let i = $o(n, e, t + 1);
    Cn(xn(i, Gi(n, e, t + 1)), r);
  }
  return Tr(e, null, t, r), new A(r);
}
function _h(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let s = t - 1; s >= 0; s--)
    i = e.node(s).copy(A.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class $r {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return r ? e.child(t).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let s = 0; s < e; s++)
      i += r.child(s).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return te.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), i = e.maybeChild(t);
    if (!r) {
      let l = r;
      r = i, i = l;
    }
    let s = r.marks;
    for (var o = 0; o < s.length; o++)
      s[o].type.spec.inclusive === !1 && (!i || !s[o].isInSet(i.marks)) && (s = s[o--].removeFromSet(s));
    return s;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, i = e.parent.maybeChild(e.index());
    for (var s = 0; s < r.length; s++)
      r[s].type.spec.inclusive === !1 && (!i || !r[s].isInSet(i.marks)) && (r = r[s--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new Yi(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], i = 0, s = t;
    for (let o = e; ; ) {
      let { index: l, offset: a } = o.content.findIndex(s), c = s - a;
      if (r.push(o, l, i + a), !c || (o = o.child(l), o.isText))
        break;
      s = c - 1, i += a + 1;
    }
    return new $r(t, r, s);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = Ma.get(e);
    if (r)
      for (let s = 0; s < r.elts.length; s++) {
        let o = r.elts[s];
        if (o.pos == t)
          return o;
      }
    else
      Ma.set(e, r = new jh());
    let i = r.elts[r.i] = $r.resolve(e, t);
    return r.i = (r.i + 1) % Wh, i;
  }
}
class jh {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Wh = 12, Ma = /* @__PURE__ */ new WeakMap();
class Yi {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Uh = /* @__PURE__ */ Object.create(null);
let Qt = class _o {
  /**
  @internal
  */
  constructor(e, t, r, i = te.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || A.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, r, i = 0) {
    this.content.nodesBetween(e, t, r, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.
  */
  textBetween(e, t, r, i) {
    return this.content.textBetween(e, t, r, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, r) {
    return this.type == e && qi(this.attrs, t || e.defaultAttrs || Uh) && te.sameSet(this.marks, r || te.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new _o(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new _o(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return O.empty;
    let i = this.resolve(e), s = this.resolve(t), o = r ? 0 : i.sharedDepth(t), l = i.start(o), c = i.node(o).content.cut(i.pos - l, s.pos - l);
    return new O(c, i.depth - o, s.depth - o);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return $h(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return $r.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return $r.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (s) => (r.isInSet(s.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), _u(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = A.empty, i = 0, s = r.childCount) {
    let o = this.contentMatchAt(e).matchFragment(r, i, s), l = o && o.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < s; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let s = this.contentMatchAt(e).matchType(r), o = s && s.matchFragment(this.content, t);
    return o ? o.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = te.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!te.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let i = A.fromJSON(e, t.content), s = e.nodeType(t.type).create(t.attrs, i, r);
    return s.type.checkAttrs(s.attrs), s;
  }
};
Qt.prototype.text = void 0;
class Xi extends Qt {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : _u(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new Xi(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Xi(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function _u(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class Tn {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new Kh(e, t);
    if (r.next == null)
      return Tn.empty;
    let i = ju(r);
    r.next && r.err("Unexpected trailing text");
    let s = Zh(Qh(i));
    return ep(s, r), s;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let i = this;
    for (let s = t; i && s < r; s++)
      i = i.matchType(e.child(s).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, r = 0) {
    let i = [this];
    function s(o, l) {
      let a = o.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return A.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < o.next.length; c++) {
        let { type: u, next: d } = o.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(d) == -1) {
          i.push(d);
          let f = s(d, l.concat(u));
          if (f)
            return f;
        }
      }
      return null;
    }
    return s(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), s = i.match;
      if (s.matchType(e)) {
        let o = [];
        for (let l = i; l.type; l = l.via)
          o.push(l.type);
        return o.reverse();
      }
      for (let o = 0; o < s.next.length; o++) {
        let { type: l, next: a } = s.next[o];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && t(r.next[i].next);
    }
    return t(this), e.map((r, i) => {
      let s = i + (r.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < r.next.length; o++)
        s += (o ? ", " : "") + r.next[o].type.name + "->" + e.indexOf(r.next[o].next);
      return s;
    }).join(`
`);
  }
}
Tn.empty = new Tn(!0);
class Kh {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function ju(n) {
  let e = [];
  do
    e.push(qh(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function qh(n) {
  let e = [];
  do
    e.push(Jh(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Jh(n) {
  let e = Xh(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Gh(n, e);
    else
      break;
  return e;
}
function Aa(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Gh(n, e) {
  let t = Aa(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = Aa(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Yh(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let i = [];
  for (let s in t) {
    let o = t[s];
    o.isInGroup(e) && i.push(o);
  }
  return i.length == 0 && n.err("No node type or group '" + e + "' found"), i;
}
function Xh(n) {
  if (n.eat("(")) {
    let e = ju(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Yh(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Qh(n) {
  let e = [[]];
  return i(s(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(o, l, a) {
    let c = { term: a, to: l };
    return e[o].push(c), c;
  }
  function i(o, l) {
    o.forEach((a) => a.to = l);
  }
  function s(o, l) {
    if (o.type == "choice")
      return o.exprs.reduce((a, c) => a.concat(s(c, l)), []);
    if (o.type == "seq")
      for (let a = 0; ; a++) {
        let c = s(o.exprs[a], l);
        if (a == o.exprs.length - 1)
          return c;
        i(c, l = t());
      }
    else if (o.type == "star") {
      let a = t();
      return r(l, a), i(s(o.expr, a), a), [r(a)];
    } else if (o.type == "plus") {
      let a = t();
      return i(s(o.expr, l), a), i(s(o.expr, a), a), [r(a)];
    } else {
      if (o.type == "opt")
        return [r(l)].concat(s(o.expr, l));
      if (o.type == "range") {
        let a = l;
        for (let c = 0; c < o.min; c++) {
          let u = t();
          i(s(o.expr, a), u), a = u;
        }
        if (o.max == -1)
          i(s(o.expr, a), a);
        else
          for (let c = o.min; c < o.max; c++) {
            let u = t();
            r(a, u), i(s(o.expr, a), u), a = u;
          }
        return [r(a)];
      } else {
        if (o.type == "name")
          return [r(l, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Wu(n, e) {
  return e - n;
}
function Ea(n, e) {
  let t = [];
  return r(e), t.sort(Wu);
  function r(i) {
    let s = n[i];
    if (s.length == 1 && !s[0].term)
      return r(s[0].to);
    t.push(i);
    for (let o = 0; o < s.length; o++) {
      let { term: l, to: a } = s[o];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function Zh(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Ea(n, 0));
  function t(r) {
    let i = [];
    r.forEach((o) => {
      n[o].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        Ea(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let s = e[r.join(",")] = new Tn(r.indexOf(n.length - 1) > -1);
    for (let o = 0; o < i.length; o++) {
      let l = i[o][1].sort(Wu);
      s.next.push({ type: i[o][0], next: e[l.join(",")] || t(l) });
    }
    return s;
  }
}
function ep(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], s = !i.validEnd, o = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      o.push(a.name), s && !(a.isText || a.hasRequiredAttrs()) && (s = !1), r.indexOf(c) == -1 && r.push(c);
    }
    s && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Uu(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Ku(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let i = e && e[r];
    if (i === void 0) {
      let s = n[r];
      if (s.hasDefault)
        i = s.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = i;
  }
  return t;
}
function qu(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${i}`);
  for (let i in n) {
    let s = n[i];
    s.validate && s.validate(e[i]);
  }
}
function Ju(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new np(n, r, e[r]);
  return t;
}
let Ta = class Gu {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Ju(e, r.attrs), this.defaultAttrs = Uu(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == Tn.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : Ku(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Qt(this, this.computeAttrs(e), A.from(t), te.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = A.from(t), this.checkContent(t), new Qt(this, this.computeAttrs(e), t, te.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = A.from(t), t.size) {
      let o = this.contentMatch.fillBefore(t);
      if (!o)
        return null;
      t = o.append(t);
    }
    let i = this.contentMatch.matchFragment(t), s = i && i.fillBefore(A.empty, !0);
    return s ? new Qt(this, e, t.append(s), te.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(e) {
    qu(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : te.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((s, o) => r[s] = new Gu(s, t, o));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function tp(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let s = i === null ? "null" : typeof i;
    if (r.indexOf(s) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${s}`);
  };
}
class np {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? tp(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Vs {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Ju(e, i.attrs), this.excluded = null;
    let s = Uu(this.attrs);
    this.instance = s ? new te(this, s) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new te(this, Ku(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((s, o) => r[s] = new Vs(s, i++, t, o)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    qu(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class Yu {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = be.from(e.nodes), t.marks = be.from(e.marks || {}), this.nodes = Ta.compile(this.spec.nodes, this), this.marks = Vs.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let s = this.nodes[i], o = s.spec.content || "", l = s.spec.marks;
      if (s.contentMatch = r[o] || (r[o] = Tn.parse(o, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!s.isInline || !s.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = s;
      }
      s.markSet = l == "_" ? null : l ? Oa(this, l.split(" ")) : l == "" || !s.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let s = this.marks[i], o = s.spec.excludes;
      s.excluded = o == null ? [s] : o == "" ? [] : Oa(this, o.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this), this.markFromJSON = this.markFromJSON.bind(this), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof Ta) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new Xi(r, r.defaultAttrs, e, te.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  Deserialize a node from its JSON representation. This method is
  bound.
  */
  nodeFromJSON(e) {
    return Qt.fromJSON(this, e);
  }
  /**
  Deserialize a mark from its JSON representation. This method is
  bound.
  */
  markFromJSON(e) {
    return te.fromJSON(this, e);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function Oa(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], s = n.marks[i], o = s;
    if (s)
      t.push(s);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(o = a);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function rp(n) {
  return n.tag != null;
}
function ip(n) {
  return n.style != null;
}
class Zt {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (rp(i))
        this.tags.push(i);
      else if (ip(i)) {
        let s = /[^=]*/.exec(i.style)[0];
        r.indexOf(s) < 0 && r.push(s), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let s = e.nodes[i.node];
      return s.contentMatch.matchType(s);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let r = new Da(this, t, !1);
    return r.addAll(e, te.none, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new Da(this, t, !0);
    return r.addAll(e, te.none, t.from, t.to), O.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let s = this.tags[i];
      if (lp(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || t.matchesContext(s.context))) {
        if (s.getAttrs) {
          let o = s.getAttrs(e);
          if (o === !1)
            continue;
          s.attrs = o || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, r, i) {
    for (let s = i ? this.styles.indexOf(i) + 1 : 0; s < this.styles.length; s++) {
      let o = this.styles[s], l = o.style;
      if (!(l.indexOf(e) != 0 || o.context && !r.matchesContext(o.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
        if (o.getAttrs) {
          let a = o.getAttrs(t);
          if (a === !1)
            continue;
          o.attrs = a || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function r(i) {
      let s = i.priority == null ? 50 : i.priority, o = 0;
      for (; o < t.length; o++) {
        let l = t[o];
        if ((l.priority == null ? 50 : l.priority) < s)
          break;
      }
      t.splice(o, 0, i);
    }
    for (let i in e.marks) {
      let s = e.marks[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = La(o)), o.mark || o.ignore || o.clearMark || (o.mark = i);
      });
    }
    for (let i in e.nodes) {
      let s = e.nodes[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = La(o)), o.node || o.ignore || o.mark || (o.node = i);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new Zt(e, Zt.schemaRules(e)));
  }
}
const Xu = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, sp = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Qu = { ol: !0, ul: !0 }, _r = 1, jo = 2, Or = 4;
function Na(n, e, t) {
  return e != null ? (e ? _r : 0) | (e === "full" ? jo : 0) : n && n.whitespace == "pre" ? _r | jo : t & ~Or;
}
class ki {
  constructor(e, t, r, i, s, o) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = o, this.content = [], this.activeMarks = te.none, this.match = s || (o & Or ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(A.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & _r)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let s = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - i[0].length));
      }
    }
    let t = A.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(A.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Xu.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Da {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, s, o = Na(null, t.preserveWhitespace, 0) | (r ? Or : 0);
    i ? s = new ki(i.type, i.attrs, te.none, !0, t.topMatch || i.type.contentMatch, o) : r ? s = new ki(null, null, te.none, !0, null, o) : s = new ki(e.schema.topNodeType, null, te.none, !0, null, o), this.nodes = [s], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let r = e.nodeValue, i = this.top, s = i.options & jo ? "full" : this.localPreserveWS || (i.options & _r) > 0;
    if (s === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (s)
        s !== "full" ? r = r.replace(/\r?\n|\r/g, " ") : r = r.replace(/\r\n?/g, `
`);
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let o = i.content[i.content.length - 1], l = e.previousSibling;
        (!o || l && l.nodeName == "BR" || o.isText && /[ \t\r\n\u000c]$/.test(o.text)) && (r = r.slice(1));
      }
      r && this.insertNode(this.parser.schema.text(r), t, !/\S/.test(r)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, r) {
    let i = this.localPreserveWS, s = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let o = e.nodeName.toLowerCase(), l;
    Qu.hasOwnProperty(o) && this.parser.normalizeLists && op(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : sp.hasOwnProperty(o))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (Xu.hasOwnProperty(o))
        s.content.length && s.content[0].isInline && this.open && (this.open--, s = this.top), c = !0, s.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let d = a && a.skip ? t : this.readStyles(e, t);
      d && this.addAll(e, d), c && this.sync(s), this.needsBlock = u;
    } else {
      let c = this.readStyles(e, t);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let s = this.parser.matchedStyles[i], o = r.getPropertyValue(s);
        if (o)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(s, o, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? t = t.filter((c) => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r, i) {
    let s, o;
    if (t.node)
      if (o = this.parser.schema.nodes[t.node], o.isLeaf)
        this.insertNode(o.create(t.attrs), r, e.nodeName == "BR") || this.leafFallback(e, r);
      else {
        let a = this.enter(o, t.attrs || null, r, t.preserveWhitespace);
        a && (s = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      r = r.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r, !1));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a, r), this.findAround(e, a, !1);
    }
    s && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r, i) {
    let s = r || 0;
    for (let o = r ? e.childNodes[r] : e.firstChild, l = i == null ? null : e.childNodes[i]; o != l; o = o.nextSibling, ++s)
      this.findAtPoint(e, s), this.addDOM(o, t);
    this.findAtPoint(e, s);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t, r) {
    let i, s;
    for (let o = this.open, l = 0; o >= 0; o--) {
      let a = this.nodes[o], c = a.findWrapping(e);
      if (c && (!i || i.length > c.length + l) && (i = c, s = a, !c.length))
        break;
      if (a.solid) {
        if (r)
          break;
        l += 2;
      }
    }
    if (!i)
      return null;
    this.sync(s);
    for (let o = 0; o < i.length; o++)
      t = this.enterInner(i[o], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t, r) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let s = this.textblockFromContext();
      s && (t = this.enterInner(s, null, t));
    }
    let i = this.findPlace(e, t, r);
    if (i) {
      this.closeExtra();
      let s = this.top;
      s.match && (s.match = s.match.matchType(e.type));
      let o = te.none;
      for (let l of i.concat(e.marks))
        (s.type ? s.type.allowsMarkType(l.type) : Ra(l.type, e.type)) && (o = l.addToSet(o));
      return s.content.push(e.mark(o)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r, i) {
    let s = this.findPlace(e.create(t), r, !1);
    return s && (s = this.enterInner(e, t, r, !0, i)), s;
  }
  // Open a node of the given type
  enterInner(e, t, r, i = !1, s) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let l = Na(e, s, o.options);
    o.options & Or && o.content.length == 0 && (l |= Or);
    let a = te.none;
    return r = r.filter((c) => (o.type ? o.type.allowsMarkType(c.type) : Ra(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new ki(e, t, a, i, null, l)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--) {
      if (this.nodes[t] == e)
        return this.open = t, !0;
      this.localPreserveWS && (this.nodes[t].options |= _r);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), s = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), o = (l, a) => {
      for (; l >= 0; l--) {
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= s; a--)
            if (o(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= s ? r.node(a - s).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          a--;
        }
      }
      return !0;
    };
    return o(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function op(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Qu.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function lp(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function La(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function Ra(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
      continue;
    let s = [], o = (l) => {
      s.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: u } = l.edge(a);
        if (c == e || s.indexOf(u) < 0 && o(u))
          return !0;
      }
    };
    if (o(i.contentMatch))
      return !0;
  }
}
class Pn {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = ao(t).createDocumentFragment());
    let i = r, s = [];
    return e.forEach((o) => {
      if (s.length || o.marks.length) {
        let l = 0, a = 0;
        for (; l < s.length && a < o.marks.length; ) {
          let c = o.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(s[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < s.length; )
          i = s.pop()[1];
        for (; a < o.marks.length; ) {
          let c = o.marks[a++], u = this.serializeMark(c, o.isInline, t);
          u && (s.push([c, i]), i.appendChild(u.dom), i = u.contentDOM || u.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(o, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: i } = Fi(ao(t), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let s = this.serializeMark(e.marks[i], e.isInline, t);
      s && ((s.contentDOM || s.dom).appendChild(r), r = s.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let i = this.marks[e.type.name];
    return i && Fi(ao(r), i(e, t), null, e.attrs);
  }
  static renderSpec(e, t, r = null, i) {
    return Fi(e, t, r, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new Pn(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = Ia(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return Ia(e.marks);
  }
}
function Ia(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function ao(n) {
  return n.document || window.document;
}
const Pa = /* @__PURE__ */ new WeakMap();
function ap(n) {
  let e = Pa.get(n);
  return e === void 0 && Pa.set(n, e = cp(n)), e;
}
function cp(n) {
  let e = null;
  function t(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let i = 0; i < r.length; i++)
            t(r[i]);
      else
        for (let i in r)
          t(r[i]);
  }
  return t(n), e;
}
function Fi(n, e, t, r) {
  if (typeof e == "string")
    return { dom: n.createTextNode(e) };
  if (e.nodeType != null)
    return { dom: e };
  if (e.dom && e.dom.nodeType != null)
    return e;
  let i = e[0], s;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (s = ap(r)) && s.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let o = i.indexOf(" ");
  o > 0 && (t = i.slice(0, o), i = i.slice(o + 1));
  let l, a = t ? n.createElementNS(t, i) : n.createElement(i), c = e[1], u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let d in c)
      if (c[d] != null) {
        let f = d.indexOf(" ");
        f > 0 ? a.setAttributeNS(d.slice(0, f), d.slice(f + 1), c[d]) : a.setAttribute(d, c[d]);
      }
  }
  for (let d = u; d < e.length; d++) {
    let f = e[d];
    if (f === 0) {
      if (d < e.length - 1 || d > u)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else {
      let { dom: h, contentDOM: p } = Fi(n, f, t, r);
      if (a.appendChild(h), p) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = p;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const Zu = 65535, ed = Math.pow(2, 16);
function up(n, e) {
  return n + e * ed;
}
function Ba(n) {
  return n & Zu;
}
function dp(n) {
  return (n - (n & Zu)) / ed;
}
const td = 1, nd = 2, zi = 4, rd = 8;
class Wo {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & rd) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (td | zi)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (nd | zi)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & zi) > 0;
  }
}
class Ve {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Ve.empty)
      return Ve.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Ba(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + dp(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0, s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], u = this.ranges[l + o], d = a + c;
      if (e <= d) {
        let f = c ? e == a ? -1 : e == d ? 1 : t : t, h = a + i + (f < 0 ? 0 : u);
        if (r)
          return h;
        let p = e == (t < 0 ? a : d) ? null : up(l / 3, e - a), m = e == a ? nd : e == d ? td : zi;
        return (t < 0 ? e != a : e != d) && (m |= rd), new Wo(h, m, p);
      }
      i += u - c;
    }
    return r ? e + i : new Wo(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Ba(t), s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], u = a + c;
      if (e <= u && l == i * 3)
        return !0;
      r += this.ranges[l + o] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
      let o = this.ranges[i], l = o - (this.inverted ? s : 0), a = o + (this.inverted ? 0 : s), c = this.ranges[i + t], u = this.ranges[i + r];
      e(l, l + c, a, a + u), s += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new Ve(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? Ve.empty : new Ve(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Ve.empty = new Ve([]);
class jr {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e, t, r = 0, i = e ? e.length : 0) {
    this.mirror = t, this.from = r, this.to = i, this._maps = e || [], this.ownData = !(e || t);
  }
  /**
  The step maps in this mapping.
  */
  get maps() {
    return this._maps;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new jr(this._maps, this.mirror, e, t);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this._maps.length; t < e._maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e._maps[t], i != null && i < t ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this._maps.length + e._maps.length; t >= 0; t--) {
      let i = e.getMirror(t);
      this.appendMap(e._maps[t].invert(), i != null && i > t ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new jr();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this._maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0;
    for (let s = this.from; s < this.to; s++) {
      let o = this._maps[s], l = o.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(s);
        if (a != null && a > s && a < this.to) {
          s = a, e = this._maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new Wo(e, i, null);
  }
}
const co = /* @__PURE__ */ Object.create(null);
class Me {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Ve.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = co[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in co)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return co[e] = t, t.prototype.jsonID = e, t;
  }
}
class de {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new de(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new de(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return de.ok(e.replace(t, r, i));
    } catch (s) {
      if (s instanceof Ji)
        return de.fail(s.message);
      throw s;
    }
  }
}
function Ll(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let s = n.child(i);
    s.content.size && (s = s.copy(Ll(s.content, e, s))), s.isInline && (s = e(s, t, i)), r.push(s);
  }
  return A.fromArray(r);
}
class Jt extends Me {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), s = new O(Ll(t.content, (o, l) => !o.isAtom || !l.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i), t.openStart, t.openEnd);
    return de.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new ht(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Jt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Jt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Jt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new Jt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Me.jsonID("addMark", Jt);
class ht extends Me {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new O(Ll(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return de.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Jt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new ht(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof ht && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new ht(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new ht(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Me.jsonID("removeMark", ht);
class Gt extends Me {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return de.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return de.fromReplace(e, this.pos, this.pos + 1, new O(A.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new Gt(this.pos, t.marks[i]);
        return new Gt(this.pos, this.mark);
      }
    }
    return new On(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Gt(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new Gt(t.pos, e.markFromJSON(t.mark));
  }
}
Me.jsonID("addNodeMark", Gt);
class On extends Me {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return de.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return de.fromReplace(e, this.pos, this.pos + 1, new O(A.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new Gt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new On(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new On(t.pos, e.markFromJSON(t.mark));
  }
}
Me.jsonID("removeNodeMark", On);
class he extends Me {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, i = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && Uo(e, this.from, this.to) ? de.fail("Structure replace would overwrite content") : de.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Ve([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new he(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new he(t.pos, Math.max(t.pos, r.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof he) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? O.empty : new O(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new he(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? O.empty : new O(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new he(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new he(t.from, t.to, O.fromJSON(e, t.slice), !!t.structure);
  }
}
Me.jsonID("replace", he);
class pe extends Me {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, i, s, o, l = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = i, this.slice = s, this.insert = o, this.structure = l;
  }
  apply(e) {
    if (this.structure && (Uo(e, this.from, this.gapFrom) || Uo(e, this.gapTo, this.to)))
      return de.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return de.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? de.fromReplace(e, this.from, this.to, r) : de.fail("Content does not fit in gap");
  }
  getMap() {
    return new Ve([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new pe(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), s = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || s > r.pos ? null : new pe(t.pos, r.pos, i, s, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new pe(t.from, t.to, t.gapFrom, t.gapTo, O.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Me.jsonID("replaceAround", pe);
function Uo(n, e, t) {
  let r = n.resolve(e), i = t - e, s = r.depth;
  for (; i > 0 && s > 0 && r.indexAfter(s) == r.node(s).childCount; )
    s--, i--;
  if (i > 0) {
    let o = r.node(s).maybeChild(r.indexAfter(s));
    for (; i > 0; ) {
      if (!o || o.isLeaf)
        return !0;
      o = o.firstChild, i--;
    }
  }
  return !1;
}
function fp(n, e, t, r) {
  let i = [], s = [], o, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + a.nodeSize, t), p = r.addToSet(d);
      for (let m = 0; m < d.length; m++)
        d[m].isInSet(p) || (o && o.to == f && o.mark.eq(d[m]) ? o.to = h : i.push(o = new ht(f, h, d[m])));
      l && l.to == f ? l.to = h : s.push(l = new Jt(f, h, r));
    }
  }), i.forEach((a) => n.step(a)), s.forEach((a) => n.step(a));
}
function hp(n, e, t, r) {
  let i = [], s = 0;
  n.doc.nodesBetween(e, t, (o, l) => {
    if (!o.isInline)
      return;
    s++;
    let a = null;
    if (r instanceof Vs) {
      let c = o.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(o.marks) && (a = [r]) : a = o.marks;
    if (a && a.length) {
      let c = Math.min(l + o.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let d = a[u], f;
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          p.step == s - 1 && d.eq(i[h].style) && (f = p);
        }
        f ? (f.to = c, f.step = s) : i.push({ style: d, from: Math.max(l, e), to: c, step: s });
      }
    }
  }), i.forEach((o) => n.step(new ht(o.from, o.to, o.style)));
}
function Rl(n, e, t, r = t.contentMatch, i = !0) {
  let s = n.doc.nodeAt(e), o = [], l = e + 1;
  for (let a = 0; a < s.childCount; a++) {
    let c = s.child(a), u = l + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      o.push(new he(l, u, O.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        t.allowsMarkType(c.marks[f].type) || n.step(new ht(l, u, c.marks[f]));
      if (i && c.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new O(A.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), o.push(new he(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(A.empty, !0);
    n.replace(l, l, new O(a, 0, 0));
  }
  for (let a = o.length - 1; a >= 0; a--)
    n.step(o[a]);
}
function pp(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function hr(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let i = n.$from.node(r), s = n.$from.index(r), o = n.$to.indexAfter(r);
    if (r < n.depth && i.canReplace(s, o, t))
      return r;
    if (r == 0 || i.type.spec.isolating || !pp(i, s, o))
      break;
  }
  return null;
}
function mp(n, e, t) {
  let { $from: r, $to: i, depth: s } = e, o = r.before(s + 1), l = i.after(s + 1), a = o, c = l, u = A.empty, d = 0;
  for (let p = s, m = !1; p > t; p--)
    m || r.index(p) > 0 ? (m = !0, u = A.from(r.node(p).copy(u)), d++) : a--;
  let f = A.empty, h = 0;
  for (let p = s, m = !1; p > t; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, f = A.from(i.node(p).copy(f)), h++) : c++;
  n.step(new pe(a, c, o, l, new O(u.append(f), d, h), u.size - d, !0));
}
function Il(n, e, t = null, r = n) {
  let i = gp(n, e), s = i && yp(r, e);
  return s ? i.map(Ha).concat({ type: e, attrs: t }).concat(s.map(Ha)) : null;
}
function Ha(n) {
  return { type: n, attrs: null };
}
function gp(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.contentMatchAt(r).findWrapping(e);
  if (!s)
    return null;
  let o = s.length ? s[0] : e;
  return t.canReplaceWith(r, i, o) ? s : null;
}
function yp(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.child(r), o = e.contentMatch.findWrapping(s.type);
  if (!o)
    return null;
  let a = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : o;
}
function bp(n, e, t) {
  let r = A.empty;
  for (let o = t.length - 1; o >= 0; o--) {
    if (r.size) {
      let l = t[o].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = A.from(t[o].type.create(t[o].attrs, r));
  }
  let i = e.start, s = e.end;
  n.step(new pe(i, s, i, s, new O(r, 0, 0), t.length, !0));
}
function vp(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = n.steps.length;
  n.doc.nodesBetween(e, t, (o, l) => {
    let a = typeof i == "function" ? i(o) : i;
    if (o.isTextblock && !o.hasMarkup(r, a) && wp(n.doc, n.mapping.slice(s).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && sd(n, o, l, s), Rl(n, n.mapping.slice(s).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(s), d = u.map(l, 1), f = u.map(l + o.nodeSize, 1);
      return n.step(new pe(d, f, d + 1, f - 1, new O(A.from(r.create(a, null, o.marks)), 0, 0), 1, !0)), c === !0 && id(n, o, l, s), !1;
    }
  });
}
function id(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.isText) {
      let o, l = /\r?\n|\r/g;
      for (; o = l.exec(i.text); ) {
        let a = n.mapping.slice(r).map(t + 1 + s + o.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function sd(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let o = n.mapping.slice(r).map(t + 1 + s);
      n.replaceWith(o, o + 1, e.type.schema.text(`
`));
    }
  });
}
function wp(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function kp(n, e, t, r, i) {
  let s = n.doc.nodeAt(e);
  if (!s)
    throw new RangeError("No node at given position");
  t || (t = s.type);
  let o = t.create(r, null, i || s.marks);
  if (s.isLeaf)
    return n.replaceWith(e, e + s.nodeSize, o);
  if (!t.validContent(s.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new pe(e, e + s.nodeSize, e + 1, e + s.nodeSize - 1, new O(A.from(o), 0, 0), 1, !0));
}
function Rt(n, e, t = 1, r) {
  let i = n.resolve(e), s = i.depth - t, o = r && r[r.length - 1] || i.parent;
  if (s < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > s; c--, u--) {
    let d = i.node(c), f = i.index(c);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), p = r && r[u + 1];
    p && (h = h.replaceChild(0, p.type.create(p.attrs)));
    let m = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !m.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(s), a = r && r[0];
  return i.node(s).canReplaceWith(l, l, a ? a.type : i.node(s + 1).type);
}
function Cp(n, e, t = 1, r) {
  let i = n.doc.resolve(e), s = A.empty, o = A.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    s = A.from(i.node(l).copy(s));
    let u = r && r[c];
    o = A.from(u ? u.type.create(u.attrs, o) : i.node(l).copy(o));
  }
  n.step(new he(e, e, new O(s.append(o), t, t), !0));
}
function sn(n, e) {
  let t = n.resolve(e), r = t.index();
  return od(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function xp(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let s = e.child(i), o = s.type == r ? n.type.schema.nodes.text : s.type;
    if (t = t.matchType(o), !t || !n.type.allowsMarks(s.marks))
      return !1;
  }
  return t.validEnd;
}
function od(n, e) {
  return !!(n && e && !n.isLeaf && xp(n, e));
}
function $s(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let s, o, l = r.index(i);
    if (i == r.depth ? (s = r.nodeBefore, o = r.nodeAfter) : t > 0 ? (s = r.node(i + 1), l++, o = r.node(i).maybeChild(l)) : (s = r.node(i).maybeChild(l - 1), o = r.node(i + 1)), s && !s.isTextblock && od(s, o) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function Sp(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, s = n.doc.resolve(e - t), o = s.node().type;
  if (i && o.inlineContent) {
    let u = o.whitespace == "pre", d = !!o.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    sd(n, u.node(), u.before(), l);
  }
  o.inlineContent && Rl(n, e + t - 1, o, s.node().contentMatchAt(s.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new he(c, a.map(e + t, -1), O.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    id(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function Mp(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.index(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.before(i + 1);
      if (s > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.indexAfter(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.after(i + 1);
      if (s < r.node(i).childCount)
        return null;
    }
  return null;
}
function ld(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let i = t.content;
  for (let s = 0; s < t.openStart; s++)
    i = i.firstChild.content;
  for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
    for (let o = r.depth; o >= 0; o--) {
      let l = o == r.depth ? 0 : r.pos <= (r.start(o + 1) + r.end(o + 1)) / 2 ? -1 : 1, a = r.index(o) + (l > 0 ? 1 : 0), c = r.node(o), u = !1;
      if (s == 1)
        u = c.canReplace(a, a, i);
      else {
        let d = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        u = d && c.canReplaceWith(a, a, d[0]);
      }
      if (u)
        return l == 0 ? r.pos : l < 0 ? r.before(o + 1) : r.after(o + 1);
    }
  return null;
}
function _s(n, e, t = e, r = O.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), s = n.resolve(t);
  return ad(i, s, r) ? new he(e, t, r) : new Ap(i, s, r).fit();
}
function ad(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class Ap {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = A.empty;
    for (let i = 0; i <= e.depth; i++) {
      let s = e.node(i);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = A.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let s = this.placed, o = r.depth, l = i.depth;
    for (; o && l && s.childCount == 1; )
      s = s.firstChild.content, o--, l--;
    let a = new O(s, o, l);
    return e > -1 ? new pe(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new he(r.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let s = t.firstChild;
      if (t.childCount > 1 && (i = 0), s.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      t = s.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, s = null;
        r ? (s = uo(this.unplaced.content, r - 1).firstChild, i = s.content) : i = this.unplaced.content;
        let o = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, d = null;
          if (t == 1 && (o ? c.matchType(o.type) || (d = c.fillBefore(A.from(o), !1)) : s && a.compatibleContent(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, inject: d };
          if (t == 2 && o && (u = c.findWrapping(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, wrap: u };
          if (s && c.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = uo(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new O(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = uo(e, t);
    if (i.childCount <= 1 && t > 0) {
      let s = e.size - t <= t + i.size;
      this.unplaced = new O(Sr(e, t - 1, 1), t - 1, s ? t - 1 : r);
    } else
      this.unplaced = new O(Sr(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: s }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (s)
      for (let m = 0; m < s.length; m++)
        this.openFrontierNode(s[m]);
    let o = this.unplaced, l = r ? r.content : o.content, a = o.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (o.content.size - o.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), g = d.matchType(m.type);
      if (!g)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (d = g, u.push(cd(m.mark(f.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = Mr(this.placed, t, A.from(u)), this.frontier[t].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = l; m < h; m++) {
      let y = g.lastChild;
      this.frontier.push({ type: y.type, match: y.contentMatchAt(y.childCount) }), g = y.content;
    }
    this.unplaced = p ? e == 0 ? O.empty : new O(Sr(o.content, e - 1, 1), e - 1, h < 0 ? o.openEnd : e - 1) : new O(Sr(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !fo(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), o = fo(e, t, i, r, s);
      if (o) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = fo(e, l, c, a, !0);
          if (!u || u.childCount)
            continue e;
        }
        return { depth: t, fit: o, move: s ? e.doc.resolve(e.after(t + 1)) : e };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = Mr(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), s = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Mr(this.placed, this.depth, A.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(A.empty, !0);
    t.childCount && (this.placed = Mr(this.placed, this.frontier.length, t));
  }
}
function Sr(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Sr(n.firstChild.content, e - 1, t)));
}
function Mr(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Mr(n.lastChild.content, e - 1, t)));
}
function uo(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function cd(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, cd(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(A.empty, !0)))), n.copy(r);
}
function fo(n, e, t, r, i) {
  let s = n.node(e), o = i ? n.indexAfter(e) : n.index(e);
  if (o == s.childCount && !t.compatibleContent(s.type))
    return null;
  let l = r.fillBefore(s.content, !0, o);
  return l && !Ep(t, s.content, o) ? l : null;
}
function Ep(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function Tp(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Op(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), s = n.doc.resolve(t);
  if (ad(i, s, r))
    return n.step(new he(e, t, r));
  let o = dd(i, n.doc.resolve(t));
  o[o.length - 1] == 0 && o.pop();
  let l = -(i.depth + 1);
  o.unshift(l);
  for (let f = i.depth, h = i.pos - 1; f > 0; f--, h--) {
    let p = i.node(f).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    o.indexOf(f) > -1 ? l = f : i.before(f) == h && o.splice(1, 0, -f);
  }
  let a = o.indexOf(l), c = [], u = r.openStart;
  for (let f = r.content, h = 0; ; h++) {
    let p = f.firstChild;
    if (c.push(p), h == r.openStart)
      break;
    f = p.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let h = c[f], p = Tp(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let m = 0; m < o.length; m++) {
        let g = o[(m + a) % o.length], y = !0;
        g < 0 && (y = !1, g = -g);
        let w = i.node(g - 1), C = i.index(g - 1);
        if (w.canReplaceWith(C, C, p.type, p.marks))
          return n.replace(i.before(g), y ? s.after(g) : t, new O(ud(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = o.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = o[f];
    h < 0 || (e = i.before(h), t = s.after(h));
  }
}
function ud(n, e, t, r, i) {
  if (e < t) {
    let s = n.firstChild;
    n = n.replaceChild(0, s.copy(ud(s.content, e + 1, t, r, s)));
  }
  if (e > r) {
    let s = i.contentMatchAt(0), o = s.fillBefore(n).append(n);
    n = o.append(s.matchFragment(o).fillBefore(A.empty, !0));
  }
  return n;
}
function Np(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = Mp(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new O(A.from(r), 0, 0));
}
function Dp(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t), s = dd(r, i);
  for (let o = 0; o < s.length; o++) {
    let l = s[o], a = o == s.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return n.delete(r.before(l), i.after(l));
  }
  for (let o = 1; o <= r.depth && o <= i.depth; o++)
    if (e - r.start(o) == r.depth - o && t > r.end(o) && i.end(o) - t != i.depth - o && r.start(o - 1) == i.start(o - 1) && r.node(o - 1).canReplace(r.index(o - 1), i.index(o - 1)))
      return n.delete(r.before(o), t);
  n.delete(e, t);
}
function dd(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let s = n.start(i);
    if (s < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (s == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == s - 1) && t.push(i);
  }
  return t;
}
class Zn extends Me {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return de.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let s in t.attrs)
      r[s] = t.attrs[s];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return de.fromReplace(e, this.pos, this.pos + 1, new O(A.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Ve.empty;
  }
  invert(e) {
    return new Zn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Zn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Zn(t.pos, t.attr, t.value);
  }
}
Me.jsonID("attr", Zn);
class Wr extends Me {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return de.ok(r);
  }
  getMap() {
    return Ve.empty;
  }
  invert(e) {
    return new Wr(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new Wr(t.attr, t.value);
  }
}
Me.jsonID("docAttr", Wr);
let tr = class extends Error {
};
tr = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
tr.prototype = Object.create(Error.prototype);
tr.prototype.constructor = tr;
tr.prototype.name = "TransformError";
class Pl {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new jr();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new tr(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = O.empty) {
    let i = _s(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new O(A.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, O.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, r) {
    return Op(this, e, t, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, r) {
    return Np(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Dp(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return mp(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return Sp(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return bp(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return vp(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return kp(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Zn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Wr(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new Gt(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof te)
      t.isInSet(r.marks) && this.step(new On(e, t));
    else {
      let i = r.marks, s, o = [];
      for (; s = t.isInSet(i); )
        o.push(new On(e, s)), i = s.removeFromSet(i);
      for (let l = o.length - 1; l >= 0; l--)
        this.step(o[l]);
    }
    return this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split (with the outermost nodes coming first).
  */
  split(e, t = 1, r) {
    return Cp(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return fp(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return hp(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Rl(this, e, t, r), this;
  }
}
const ho = /* @__PURE__ */ Object.create(null);
class $ {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new fd(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = O.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let s = e.steps.length, o = this.ranges;
    for (let l = 0; l < o.length; l++) {
      let { $from: a, $to: c } = o[l], u = e.mapping.slice(s);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? O.empty : t), l == 0 && Va(e, s, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      let { $from: o, $to: l } = i[s], a = e.mapping.slice(r), c = a.map(o.pos), u = a.map(l.pos);
      s ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), Va(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let i = e.parent.inlineContent ? new F(e) : qn(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let s = e.depth - 1; s >= 0; s--) {
      let o = t < 0 ? qn(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, r) : qn(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, r);
      if (o)
        return o;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new je(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return qn(e, e, 0, 0, 1) || new je(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return qn(e, e, e.content.size, e.childCount, -1) || new je(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = ho[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in ho)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return ho[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return F.between(this.$anchor, this.$head).getBookmark();
  }
}
$.prototype.visible = !0;
class fd {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Fa = !1;
function za(n) {
  !Fa && !n.parent.inlineContent && (Fa = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class F extends $ {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    za(e), za(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return $.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new F(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = O.empty) {
    if (super.replace(e, t), t == O.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof F && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new js(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new F(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let i = e.resolve(t);
    return new this(i, r == t ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let i = e.pos - t.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let s = $.findFrom(t, r, !0) || $.findFrom(t, -r, !0);
      if (s)
        t = s.$head;
      else
        return $.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = ($.findFrom(e, -r, !0) || $.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new F(e, t);
  }
}
$.jsonID("text", F);
class js {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new js(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return F.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class B extends $ {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: i } = t.mapResult(this.anchor), s = e.resolve(i);
    return r ? $.near(s) : new B(s);
  }
  content() {
    return new O(A.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof B && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Bl(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new B(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new B(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
B.prototype.visible = !1;
$.jsonID("node", B);
class Bl {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new js(r, r) : new Bl(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && B.isSelectable(r) ? new B(t) : $.near(t);
  }
}
class je extends $ {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = O.empty) {
    if (t == O.empty) {
      e.delete(0, e.doc.content.size);
      let r = $.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new je(e);
  }
  map(e) {
    return new je(e);
  }
  eq(e) {
    return e instanceof je;
  }
  getBookmark() {
    return Lp;
  }
}
$.jsonID("all", je);
const Lp = {
  map() {
    return this;
  },
  resolve(n) {
    return new je(n);
  }
};
function qn(n, e, t, r, i, s = !1) {
  if (e.inlineContent)
    return F.create(n, t);
  for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
    let l = e.child(o);
    if (l.isAtom) {
      if (!s && B.isSelectable(l))
        return B.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = qn(n, l, t + i, i < 0 ? l.childCount : 0, i, s);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Va(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof he || i instanceof pe))
    return;
  let s = n.mapping.maps[r], o;
  s.forEach((l, a, c, u) => {
    o == null && (o = u);
  }), n.setSelection($.near(n.doc.resolve(o), t));
}
const $a = 1, Ci = 2, _a = 4;
class Rp extends Pl {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | $a) & ~Ci, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & $a) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= Ci, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return te.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & Ci) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~Ci, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || te.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, t, r) {
    let i = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), r = r ?? t, !e)
        return this.deleteRange(t, r);
      let s = this.storedMarks;
      if (!s) {
        let o = this.doc.resolve(t);
        s = r == t ? o.marks() : o.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, i.text(e, s)), this.selection.empty || this.setSelection($.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= _a, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & _a) > 0;
  }
}
function ja(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Ar {
  constructor(e, t, r) {
    this.name = e, this.init = ja(t.init, r), this.apply = ja(t.apply, r);
  }
}
const Ip = [
  new Ar("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new Ar("selection", {
    init(n, e) {
      return n.selection || $.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new Ar("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new Ar("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class po {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = Ip.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new Ar(r.key, r.spec.state, r));
    });
  }
}
class Xn {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let i = this.config.plugins[r];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let s = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let l = this.config.plugins[o];
        if (l.spec.appendTransaction) {
          let a = i ? i[o].n : 0, c = i ? i[o].state : this, u = a < t.length && l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, r);
          if (u && r.filterTransaction(u, o)) {
            if (u.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let d = 0; d < this.config.plugins.length; d++)
                i.push(d < o ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(u), r = r.applyInner(u), s = !0;
          }
          i && (i[o] = { state: r, n: t.length });
        }
      }
      if (!s)
        return { state: r, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new Xn(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let s = r[i];
      t[s.name] = s.apply(e, this[s.name], this, t);
    }
    return t;
  }
  /**
  Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new Rp(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new po(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new Xn(t);
    for (let i = 0; i < t.fields.length; i++)
      r[t.fields[i].name] = t.fields[i].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let t = new po(this.schema, e.plugins), r = t.fields, i = new Xn(t);
    for (let s = 0; s < r.length; s++) {
      let o = r[s].name;
      i[o] = this.hasOwnProperty(o) ? this[o] : r[s].init(e, i);
    }
    return i;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], s = i.spec.state;
        s && s.toJSON && (t[r] = s.toJSON.call(i, this[i.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new po(e.schema, e.plugins), s = new Xn(i);
    return i.fields.forEach((o) => {
      if (o.name == "doc")
        s.doc = Qt.fromJSON(e.schema, t.doc);
      else if (o.name == "selection")
        s.selection = $.fromJSON(s.doc, t.selection);
      else if (o.name == "storedMarks")
        t.storedMarks && (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, l)) {
              s[o.name] = c.fromJSON.call(a, e, t[l], s);
              return;
            }
          }
        s[o.name] = o.init(e, s);
      }
    }), s;
  }
}
function hd(n, e, t) {
  for (let r in n) {
    let i = n[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = hd(i, e, {})), t[r] = i;
  }
  return t;
}
class le {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && hd(e.props, this, this.props), this.key = e.key ? e.key.key : pd("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const mo = /* @__PURE__ */ Object.create(null);
function pd(n) {
  return n in mo ? n + "$" + ++mo[n] : (mo[n] = 0, n + "$");
}
class ue {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = pd(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const ve = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, nr = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let Ko = null;
const Ot = function(n, e, t) {
  let r = Ko || (Ko = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, Pp = function() {
  Ko = null;
}, Nn = function(n, e, t, r) {
  return t && (Wa(n, e, t, r, -1) || Wa(n, e, t, r, 1));
}, Bp = /^(img|br|input|textarea|hr)$/i;
function Wa(n, e, t, r, i) {
  for (var s; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (i < 0 ? 0 : Ye(n))) {
      let o = n.parentNode;
      if (!o || o.nodeType != 1 || ii(n) || Bp.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = ve(n) + (i < 0 ? 0 : 1), n = o;
    } else if (n.nodeType == 1) {
      let o = n.childNodes[e + (i < 0 ? -1 : 0)];
      if (o.nodeType == 1 && o.contentEditable == "false")
        if (!((s = o.pmViewDesc) === null || s === void 0) && s.ignoreForSelection)
          e += i;
        else
          return !1;
      else
        n = o, e = i < 0 ? Ye(n) : 0;
    } else
      return !1;
  }
}
function Ye(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Hp(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = Ye(n);
    } else if (n.parentNode && !ii(n))
      e = ve(n), n = n.parentNode;
    else
      return null;
  }
}
function Fp(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !ii(n))
      e = ve(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function zp(n, e, t) {
  for (let r = e == 0, i = e == Ye(n); r || i; ) {
    if (n == t)
      return !0;
    let s = ve(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && s == 0, i = i && s == Ye(n);
  }
}
function ii(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const Ws = function(n) {
  return n.focusNode && Nn(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function pn(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function Vp(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function $p(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: Math.min(Ye(r.offsetNode), r.offset) };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: Math.min(Ye(r.startContainer), r.startOffset) };
  }
}
const gt = typeof navigator < "u" ? navigator : null, Ua = typeof document < "u" ? document : null, on = gt && gt.userAgent || "", qo = /Edge\/(\d+)/.exec(on), md = /MSIE \d/.exec(on), Jo = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(on), Re = !!(md || Jo || qo), en = md ? document.documentMode : Jo ? +Jo[1] : qo ? +qo[1] : 0, ot = !Re && /gecko\/(\d+)/i.test(on);
ot && +(/Firefox\/(\d+)/.exec(on) || [0, 0])[1];
const Go = !Re && /Chrome\/(\d+)/.exec(on), Ce = !!Go, gd = Go ? +Go[1] : 0, Ee = !Re && !!gt && /Apple Computer/.test(gt.vendor), rr = Ee && (/Mobile\/\w+/.test(on) || !!gt && gt.maxTouchPoints > 2), Ge = rr || (gt ? /Mac/.test(gt.platform) : !1), _p = gt ? /Win/.test(gt.platform) : !1, Dt = /Android \d/.test(on), si = !!Ua && "webkitFontSmoothing" in Ua.documentElement.style, jp = si ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Wp(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function St(n, e) {
  return typeof n == "number" ? n : n[e];
}
function Up(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function Ka(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, i = n.someProp("scrollMargin") || 5, s = n.dom.ownerDocument;
  for (let o = t || n.dom; o; ) {
    if (o.nodeType != 1) {
      o = nr(o);
      continue;
    }
    let l = o, a = l == s.body, c = a ? Wp(s) : Up(l), u = 0, d = 0;
    if (e.top < c.top + St(r, "top") ? d = -(c.top - e.top + St(i, "top")) : e.bottom > c.bottom - St(r, "bottom") && (d = e.bottom - e.top > c.bottom - c.top ? e.top + St(i, "top") - c.top : e.bottom - c.bottom + St(i, "bottom")), e.left < c.left + St(r, "left") ? u = -(c.left - e.left + St(i, "left")) : e.right > c.right - St(r, "right") && (u = e.right - c.right + St(i, "right")), u || d)
      if (a)
        s.defaultView.scrollBy(u, d);
      else {
        let h = l.scrollLeft, p = l.scrollTop;
        d && (l.scrollTop += d), u && (l.scrollLeft += u);
        let m = l.scrollLeft - h, g = l.scrollTop - p;
        e = { left: e.left - m, top: e.top - g, right: e.right - m, bottom: e.bottom - g };
      }
    let f = a ? "fixed" : getComputedStyle(o).position;
    if (/^(fixed|sticky)$/.test(f))
      break;
    o = f == "absolute" ? o.offsetParent : nr(o);
  }
}
function Kp(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, i;
  for (let s = (e.left + e.right) / 2, o = t + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
    let l = n.root.elementFromPoint(s, o);
    if (!l || l == n.dom || !n.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= t - 20) {
      r = l, i = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: yd(n.dom) };
}
function yd(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = nr(r))
    ;
  return e;
}
function qp({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  bd(t, r == 0 ? 0 : r - e);
}
function bd(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: i, left: s } = n[t];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let jn = null;
function Jp(n) {
  if (n.setActive)
    return n.setActive();
  if (jn)
    return n.focus(jn);
  let e = yd(n);
  n.focus(jn == null ? {
    get preventScroll() {
      return jn = { preventScroll: !0 }, !0;
    }
  } : void 0), jn || (jn = !1, bd(e, 0));
}
function vd(n, e) {
  let t, r = 2e8, i, s = 0, o = e.top, l = e.top, a, c;
  for (let u = n.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let f;
    if (u.nodeType == 1)
      f = u.getClientRects();
    else if (u.nodeType == 3)
      f = Ot(u).getClientRects();
    else
      continue;
    for (let h = 0; h < f.length; h++) {
      let p = f[h];
      if (p.top <= o && p.bottom >= l) {
        o = Math.max(p.bottom, o), l = Math.min(p.top, l);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < r) {
          t = u, r = m, i = m && t.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (s = d + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = u, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (s = d + 1);
    }
  }
  return !t && a && (t = a, i = c, r = 0), t && t.nodeType == 3 ? Gp(t, i) : !t || r && t.nodeType == 1 ? { node: n, offset: s } : vd(t, i);
}
function Gp(n, e) {
  let t = n.nodeValue.length, r = document.createRange();
  for (let i = 0; i < t; i++) {
    r.setEnd(n, i + 1), r.setStart(n, i);
    let s = Vt(r, 1);
    if (s.top != s.bottom && Hl(e, s))
      return { node: n, offset: i + (e.left >= (s.left + s.right) / 2 ? 1 : 0) };
  }
  return { node: n, offset: 0 };
}
function Hl(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function Yp(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function Xp(n, e, t) {
  let { node: r, offset: i } = vd(e, t), s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let o = r.getBoundingClientRect();
    s = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, i, s);
}
function Qp(n, e, t, r) {
  let i = -1;
  for (let s = e, o = !1; s != n.dom; ) {
    let l = n.docView.nearestDesc(s, !0), a;
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM) && // Ignore elements with zero-size bounding rectangles
    ((a = l.dom.getBoundingClientRect()).width || a.height) && (l.node.isBlock && l.parent && (!o && a.left > r.left || a.top > r.top ? i = l.posBefore : (!o && a.right < r.left || a.bottom < r.top) && (i = l.posAfter), o = !0), !l.contentDOM && i < 0 && !l.node.isText))
      return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    s = l.dom.parentNode;
  }
  return i > -1 ? i : n.docView.posFromDOM(e, t, -1);
}
function wd(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), s = i; ; ) {
      let o = n.childNodes[s];
      if (o.nodeType == 1) {
        let l = o.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (Hl(e, c))
            return wd(o, e, c);
        }
      }
      if ((s = (s + 1) % r) == i)
        break;
    }
  return n;
}
function Zp(n, e) {
  let t = n.dom.ownerDocument, r, i = 0, s = $p(t, e.left, e.top);
  s && ({ node: r, offset: i } = s);
  let o = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), l;
  if (!o || !n.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = n.dom.getBoundingClientRect();
    if (!Hl(e, c) || (o = wd(n.dom, e, c), !o))
      return null;
  }
  if (Ee)
    for (let c = o; r && c; c = nr(c))
      c.draggable && (r = void 0);
  if (o = Yp(o, e), r) {
    if (ot && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let u = r.childNodes[i], d;
      u.nodeName == "IMG" && (d = u.getBoundingClientRect()).right <= e.left && d.bottom > e.top && i++;
    }
    let c;
    si && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == n.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = n.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = Qp(n, r, i, e));
  }
  l == null && (l = Xp(n, o, e));
  let a = n.docView.nearestDesc(o, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function qa(n) {
  return n.top < n.bottom || n.left < n.right;
}
function Vt(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (qa(r))
      return r;
  }
  return Array.prototype.find.call(t, qa) || n.getBoundingClientRect();
}
const em = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function kd(n, e, t) {
  let { node: r, offset: i, atom: s } = n.docView.domFromPos(e, t < 0 ? -1 : 1), o = si || ot;
  if (r.nodeType == 3)
    if (o && (em.test(r.nodeValue) || (t < 0 ? !i : i == r.nodeValue.length))) {
      let a = Vt(Ot(r, i, i), t);
      if (ot && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = Vt(Ot(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let u = Vt(Ot(r, i, i + 1), -1);
          if (u.top != a.top)
            return kr(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, u = t < 0 ? 1 : -1;
      return t < 0 && !i ? (c++, u = -1) : t >= 0 && i == r.nodeValue.length ? (a--, u = 1) : t < 0 ? a-- : c++, kr(Vt(Ot(r, a, c), u), u < 0);
    }
  if (!n.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && i && (t < 0 || i == Ye(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return go(a.getBoundingClientRect(), !1);
    }
    if (s == null && i < Ye(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return go(a.getBoundingClientRect(), !0);
    }
    return go(r.getBoundingClientRect(), t >= 0);
  }
  if (s == null && i && (t < 0 || i == Ye(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? Ot(a, Ye(a) - (o ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return kr(Vt(c, 1), !1);
  }
  if (s == null && i < Ye(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? Ot(a, 0, o ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return kr(Vt(c, -1), !0);
  }
  return kr(Vt(r.nodeType == 3 ? Ot(r) : r, -t), t >= 0);
}
function kr(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function go(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function Cd(n, e, t) {
  let r = n.state, i = n.root.activeElement;
  r != e && n.updateState(e), i != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), i != n.dom && i && i.focus();
  }
}
function tm(n, e, t) {
  let r = e.selection, i = t == "up" ? r.$from : r.$to;
  return Cd(n, e, () => {
    let { node: s } = n.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let l = n.docView.nearestDesc(s, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        s = l.contentDOM || l.dom;
        break;
      }
      s = l.dom.parentNode;
    }
    let o = kd(n, i.pos, 1);
    for (let l = s.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = Ot(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let u = a[c];
        if (u.bottom > u.top + 1 && (t == "up" ? o.top - u.top > (u.bottom - o.top) * 2 : u.bottom - o.bottom > (o.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const nm = /[\u0590-\u08ac]/;
function rm(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, s = !i, o = i == r.parent.content.size, l = n.domSelection();
  return l ? !nm.test(r.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? s : o : Cd(n, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: u, anchorOffset: d } = n.domSelectionRange(), f = l.caretBidiLevel;
    l.modify("move", t, "character");
    let h = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: p, focusOffset: m } = n.domSelectionRange(), g = p && !h.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
    try {
      l.collapse(u, d), a && (a != u || c != d) && l.extend && l.extend(a, c);
    } catch {
    }
    return f != null && (l.caretBidiLevel = f), g;
  }) : r.pos == r.start() || r.pos == r.end();
}
let Ja = null, Ga = null, Ya = !1;
function im(n, e, t) {
  return Ja == e && Ga == t ? Ya : (Ja = e, Ga = t, Ya = t == "up" || t == "down" ? tm(n, e, t) : rm(n, e, t));
}
const Xe = 0, Xa = 1, bn = 2, yt = 3;
class oi {
  constructor(e, t, r, i) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = i, this.dirty = Xe, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let i = this.children[t];
      if (i == e)
        return r;
      r += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = t > ve(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (i == null && t == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !0;
            break;
          }
          if (s.nextSibling)
            break;
        }
    }
    return i ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let s = this.getDesc(i), o;
      if (s && (!t || s.node))
        if (r && (o = s.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
          r = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let i = e; i; i = i.parentNode) {
      let s = this.getDesc(i);
      if (s)
        return s.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let i = this.children[t], s = r + i.size;
      if (r == e && s != r) {
        for (; !i.border && i.children.length; )
          for (let o = 0; o < i.children.length; o++) {
            let l = i.children[o];
            if (l.size) {
              i = l;
              break;
            }
          }
        return i;
      }
      if (e < s)
        return i.descAt(e - r - i.border);
      r = s;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let s = 0; r < this.children.length; r++) {
      let o = this.children[r], l = s + o.size;
      if (l > e || o instanceof Sd) {
        i = e - s;
        break;
      }
      s = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, t);
    for (let s; r && !(s = this.children[r - 1]).size && s instanceof xd && s.side >= 0; r--)
      ;
    if (t <= 0) {
      let s, o = !0;
      for (; s = r ? this.children[r - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); r--, o = !1)
        ;
      return s && t && o && !s.border && !s.domAtom ? s.domFromPos(s.size, t) : { node: this.contentDOM, offset: s ? ve(s.dom) + 1 : 0 };
    } else {
      let s, o = !0;
      for (; s = r < this.children.length ? this.children[r] : null, !(!s || s.dom.parentNode == this.contentDOM); r++, o = !1)
        ;
      return s && o && !s.border && !s.domAtom ? s.domFromPos(0, t) : { node: this.contentDOM, offset: s ? ve(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, s = -1;
    for (let o = r, l = 0; ; l++) {
      let a = this.children[l], c = o + a.size;
      if (i == -1 && e <= c) {
        let u = o + a.border;
        if (e >= u && t <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, t, u);
        e = o;
        for (let d = l; d > 0; d--) {
          let f = this.children[d - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            i = ve(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > t || l == this.children.length - 1)) {
        t = c;
        for (let u = l + 1; u < this.children.length; u++) {
          let d = this.children[u];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(-1)) {
            s = ve(d.dom);
            break;
          }
          t += d.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: i, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, r, i = !1) {
    let s = Math.min(e, t), o = Math.max(e, t);
    for (let h = 0, p = 0; h < this.children.length; h++) {
      let m = this.children[h], g = p + m.size;
      if (s > p && o < g)
        return m.setSelection(e - p - m.border, t - p - m.border, r, i);
      p = g;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = t == e ? l : this.domFromPos(t, t ? -1 : 1), c = r.root.getSelection(), u = r.domSelectionRange(), d = !1;
    if ((ot || Ee) && e == t) {
      let { node: h, offset: p } = l;
      if (h.nodeType == 3) {
        if (d = !!(p && h.nodeValue[p - 1] == `
`), d && p == h.nodeValue.length)
          for (let m = h, g; m; m = m.parentNode) {
            if (g = m.nextSibling) {
              g.nodeName == "BR" && (l = a = { node: g.parentNode, offset: ve(g) + 1 });
              break;
            }
            let y = m.pmViewDesc;
            if (y && y.node && y.node.isBlock)
              break;
          }
      } else {
        let m = h.childNodes[p - 1];
        d = m && (m.nodeName == "BR" || m.contentEditable == "false");
      }
    }
    if (ot && u.focusNode && u.focusNode != a.node && u.focusNode.nodeType == 1) {
      let h = u.focusNode.childNodes[u.focusOffset];
      h && h.contentEditable == "false" && (i = !0);
    }
    if (!(i || d && Ee) && Nn(l.node, l.offset, u.anchorNode, u.anchorOffset) && Nn(a.node, a.offset, u.focusNode, u.focusOffset))
      return;
    let f = !1;
    if ((c.extend || e == t) && !d) {
      c.collapse(l.node, l.offset);
      try {
        e != t && c.extend(a.node, a.offset), f = !0;
      } catch {
      }
    }
    if (!f) {
      if (e > t) {
        let p = l;
        l = a, a = p;
      }
      let h = document.createRange();
      h.setEnd(a.node, a.offset), h.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(h);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, t) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let s = this.children[i], o = r + s.size;
      if (r == o ? e <= o && t >= r : e < o && t > r) {
        let l = r + s.border, a = o - s.border;
        if (e >= l && t <= a) {
          this.dirty = e == r || t == o ? bn : Xa, e == l && t == a && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = yt : s.markDirty(e - l, t - l);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? bn : yt;
      }
      r = o;
    }
    this.dirty = bn;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? bn : Xa;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  get ignoreForSelection() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class xd extends oi {
  constructor(e, t, r, i) {
    let s, o = t.type.toDOM;
    if (typeof o == "function" && (o = o(r, () => {
      if (!s)
        return i;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !t.type.spec.raw) {
      if (o.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(o), o = l;
      }
      o.contentEditable = "false", o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), this.widget = t, this.widget = t, s = this;
  }
  matchesWidget(e) {
    return this.dirty == Xe && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get ignoreForSelection() {
    return !!this.widget.type.spec.relaxedSide;
  }
  get side() {
    return this.widget.type.side;
  }
}
class sm extends oi {
  constructor(e, t, r, i) {
    super(e, [], t, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class Dn extends oi {
  constructor(e, t, r, i, s) {
    super(e, [], r, i), this.mark = t, this.spec = s;
  }
  static create(e, t, r, i) {
    let s = i.nodeViews[t.type.name], o = s && s(t, i, r);
    return (!o || !o.dom) && (o = Pn.renderSpec(document, t.type.spec.toDOM(t, r), null, t.attrs)), new Dn(e, t, o.dom, o.contentDOM || o.dom, o);
  }
  parseRule() {
    return this.dirty & yt || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != yt && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != Xe) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = Xe;
    }
  }
  slice(e, t, r) {
    let i = Dn.create(this.parent, this.mark, !0, r), s = this.children, o = this.size;
    t < o && (s = Xo(s, t, o, r)), e > 0 && (s = Xo(s, 0, e, r));
    for (let l = 0; l < s.length; l++)
      s[l].parent = i;
    return i.children = s, i;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class tn extends oi {
  constructor(e, t, r, i, s, o, l, a, c) {
    super(e, [], s, o), this.node = t, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = l;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, t, r, i, s, o) {
    let l = s.nodeViews[t.type.name], a, c = l && l(t, s, () => {
      if (!a)
        return o;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, i), u = c && c.dom, d = c && c.contentDOM;
    if (t.isText) {
      if (!u)
        u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else u || ({ dom: u, contentDOM: d } = Pn.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
    !d && !t.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), t.type.spec.draggable && (u.draggable = !0));
    let f = u;
    return u = Ed(u, r, t), c ? a = new om(e, t, r, i, u, d || null, f, c, s, o + 1) : t.isText ? new Us(e, t, r, i, u, f, s) : new tn(e, t, r, i, u, d || null, f, s, o + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => A.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == Xe && e.eq(this.node) && Qi(t, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, t) {
    let r = this.node.inlineContent, i = t, s = e.composing ? this.localCompositionInfo(e, t) : null, o = s && s.pos > -1 ? s : null, l = s && s.pos < 0, a = new am(this, o && o.node, e);
    dm(this.node, this.innerDeco, (c, u, d) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !d && a.syncToMarks(u == this.node.childCount ? te.none : this.node.child(u).marks, r, e), a.placeWidget(c, e, i);
    }, (c, u, d, f) => {
      a.syncToMarks(c.marks, r, e);
      let h;
      a.findNodeMatch(c, u, d, f) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (h = a.findIndexWithChild(s.node)) > -1 && a.updateNodeAt(c, u, d, h, e) || a.updateNextNode(c, u, d, e, f, i) || a.addNode(c, u, d, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == bn) && (o && this.protectLocalComposition(e, o), Md(this.contentDOM, this.children, e), rr && fm(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof F) || r < t || i > t + this.node.content.size)
      return null;
    let s = e.input.compositionNode;
    if (!s || !this.dom.contains(s.parentNode))
      return null;
    if (this.node.inlineContent) {
      let o = s.nodeValue, l = hm(this.node.content, o, r - t, i - t);
      return l < 0 ? null : { node: s, pos: l, text: o };
    } else
      return { node: s, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: i }) {
    if (this.getDesc(t))
      return;
    let s = t;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let o = new sm(this, s, t, i);
    e.input.compositionNodes.push(o), this.children = Xo(this.children, r, r + i.length, e, o);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, i) {
    return this.dirty == yt || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, i), !0);
  }
  updateInner(e, t, r, i) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = Xe;
  }
  updateOuterDeco(e) {
    if (Qi(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = Ad(this.dom, this.nodeDOM, Yo(this.outerDeco, this.node, t), Yo(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0);
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function Qa(n, e, t, r, i) {
  Ed(r, e, n);
  let s = new tn(void 0, n, e, t, r, r, r, i, 0);
  return s.contentDOM && s.updateChildren(i, 0), s;
}
class Us extends tn {
  constructor(e, t, r, i, s, o, l) {
    super(e, t, r, i, s, null, o, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, i) {
    return this.dirty == yt || this.dirty != Xe && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != Xe || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = Xe, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let i = this.node.cut(e, t), s = document.createTextNode(i.text);
    return new Us(this.parent, i, this.outerDeco, this.innerDeco, s, s, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = yt);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class Sd extends oi {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Xe && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class om extends tn {
  constructor(e, t, r, i, s, o, l, a, c, u) {
    super(e, t, r, i, s, o, l, c, u), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, i) {
    if (this.dirty == yt)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let s = this.spec.update(e, t, r);
      return s && this.updateInner(e, t, r, i), s;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r.root) : super.setSelection(e, t, r, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function Md(n, e, t) {
  let r = n.firstChild, i = !1;
  for (let s = 0; s < e.length; s++) {
    let o = e[s], l = o.dom;
    if (l.parentNode == n) {
      for (; l != r; )
        r = Za(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, n.insertBefore(l, r);
    if (o instanceof Dn) {
      let a = r ? r.previousSibling : n.lastChild;
      Md(o.contentDOM, o.children, t), r = a ? a.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = Za(r), i = !0;
  i && t.trackWrites == n && (t.trackWrites = null);
}
const Nr = function(n) {
  n && (this.nodeName = n);
};
Nr.prototype = /* @__PURE__ */ Object.create(null);
const vn = [new Nr()];
function Yo(n, e, t) {
  if (n.length == 0)
    return vn;
  let r = t ? vn[0] : new Nr(), i = [r];
  for (let s = 0; s < n.length; s++) {
    let o = n[s].type.attrs;
    if (o) {
      o.nodeName && i.push(r = new Nr(o.nodeName));
      for (let l in o) {
        let a = o[l];
        a != null && (t && i.length == 1 && i.push(r = new Nr(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function Ad(n, e, t, r) {
  if (t == vn && r == vn)
    return e;
  let i = e;
  for (let s = 0; s < r.length; s++) {
    let o = r[s], l = t[s];
    if (s) {
      let a;
      l && l.nodeName == o.nodeName && i != n && (a = i.parentNode) && a.nodeName.toLowerCase() == o.nodeName || (a = document.createElement(o.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = vn[0]), i = a;
    }
    lm(i, l || vn[0], o);
  }
  return i;
}
function lm(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      i.indexOf(r[s]) == -1 && n.classList.remove(r[s]);
    for (let s = 0; s < i.length; s++)
      r.indexOf(i[s]) == -1 && n.classList.add(i[s]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        n.style.removeProperty(i[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function Ed(n, e, t) {
  return Ad(n, n, vn, Yo(e, t, n.nodeType != 1));
}
function Qi(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function Za(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class am {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = cm(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, r) {
    let i = 0, s = this.stack.length >> 1, o = Math.min(s, e.length);
    for (; i < o && (i == s - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < s; )
      this.destroyRest(), this.top.dirty = Xe, this.index = this.stack.pop(), this.top = this.stack.pop(), s--;
    for (; s < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let l = -1;
      for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
        let c = this.top.children[a];
        if (c.matchesMark(e[s]) && !this.isLocked(c.dom)) {
          l = a;
          break;
        }
      }
      if (l > -1)
        l > this.index && (this.changed = !0, this.destroyBetween(this.index, l)), this.top = this.top.children[this.index];
      else {
        let a = Dn.create(this.top, e[s], t, r);
        this.top.children.splice(this.index, 0, a), this.top = a, this.changed = !0;
      }
      this.index = 0, s++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, r, i) {
    let s = -1, o;
    if (i >= this.preMatch.index && (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && o.matchesNode(e, t, r))
      s = this.top.children.indexOf(o, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          s = l;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, t, r, i, s) {
    let o = this.top.children[i];
    return o.dirty == yt && o.dom == o.contentDOM && (o.dirty = bn), o.update(e, t, r, s) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, r, i, s, o) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof tn) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != s)
          return !1;
        let u = a.dom, d, f = this.isLocked(u) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != yt && Qi(t, a.outerDeco));
        if (!f && a.update(e, t, r, i))
          return this.destroyBetween(this.index, l), a.dom != u && (this.changed = !0), this.index++, !0;
        if (!f && (d = this.recreateWrapper(a, e, t, r, i, o)))
          return this.destroyBetween(this.index, l), this.top.children[this.index] = d, d.contentDOM && (d.dirty = bn, d.updateChildren(i, o + 1), d.dirty = Xe), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, r, i, s, o) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Qi(r, e.outerDeco) || !i.eq(e.innerDeco))
      return null;
    let l = tn.create(this.top, t, r, i, s, o);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, i, s) {
    let o = tn.create(this.top, e, t, r, i, s);
    o.contentDOM && o.updateChildren(i, s + 1), this.top.children.splice(this.index++, 0, o), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new xd(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof Dn; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof Us) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((Ee || Ce) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new Sd(this.top, [], r, null);
      t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function cm(n, e) {
  let t = e, r = t.children.length, i = n.childCount, s = /* @__PURE__ */ new Map(), o = [];
  e: for (; i > 0; ) {
    let l;
    for (; ; )
      if (r) {
        let c = t.children[r - 1];
        if (c instanceof Dn)
          t = c, r = c.children.length;
        else {
          l = c, r--;
          break;
        }
      } else {
        if (t == e)
          break e;
        r = t.parent.children.indexOf(t), t = t.parent;
      }
    let a = l.node;
    if (a) {
      if (a != n.child(i - 1))
        break;
      --i, s.set(l, i), o.push(l);
    }
  }
  return { index: i, matched: s, matches: o.reverse() };
}
function um(n, e) {
  return n.type.side - e.type.side;
}
function dm(n, e, t, r) {
  let i = e.locals(n), s = 0;
  if (i.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      r(u, i, e.forChild(s, u), c), s += u.nodeSize;
    }
    return;
  }
  let o = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let u, d;
    for (; o < i.length && i[o].to == s; ) {
      let g = i[o++];
      g.widget && (u ? (d || (d = [u])).push(g) : u = g);
    }
    if (u)
      if (d) {
        d.sort(um);
        for (let g = 0; g < d.length; g++)
          t(d[g], c, !!a);
      } else
        t(u, c, !!a);
    let f, h;
    if (a)
      h = -1, f = a, a = null;
    else if (c < n.childCount)
      h = c, f = n.child(c++);
    else
      break;
    for (let g = 0; g < l.length; g++)
      l[g].to <= s && l.splice(g--, 1);
    for (; o < i.length && i[o].from <= s && i[o].to > s; )
      l.push(i[o++]);
    let p = s + f.nodeSize;
    if (f.isText) {
      let g = p;
      o < i.length && i[o].from < g && (g = i[o].from);
      for (let y = 0; y < l.length; y++)
        l[y].to < g && (g = l[y].to);
      g < p && (a = f.cut(g - s), f = f.cut(0, g - s), p = g, h = -1);
    } else
      for (; o < i.length && i[o].to < p; )
        o++;
    let m = f.isInline && !f.isLeaf ? l.filter((g) => !g.inline) : l.slice();
    r(f, m, e.forChild(s, f), h), s = p;
  }
}
function fm(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function hm(n, e, t, r) {
  for (let i = 0, s = 0; i < n.childCount && s <= r; ) {
    let o = n.child(i++), l = s;
    if (s += o.nodeSize, !o.isText)
      continue;
    let a = o.text;
    for (; i < n.childCount; ) {
      let c = n.child(i++);
      if (s += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (s >= t) {
      if (s >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= t)
        return l + c;
      if (t == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function Xo(n, e, t, r, i) {
  let s = [];
  for (let o = 0, l = 0; o < n.length; o++) {
    let a = n[o], c = l, u = l += a.size;
    c >= t || u <= e ? s.push(a) : (c < e && s.push(a.slice(0, e - c, r)), i && (s.push(i), i = void 0), u > t && s.push(a.slice(t - c, a.size, r)));
  }
  return s;
}
function Fl(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let i = n.docView.nearestDesc(t.focusNode), s = i && i.size == 0, o = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (o < 0)
    return null;
  let l = r.resolve(o), a, c;
  if (Ws(t)) {
    for (a = o; i && !i.node; )
      i = i.parent;
    let d = i.node;
    if (i && d.isAtom && B.isSelectable(d) && i.parent && !(d.isInline && zp(t.focusNode, t.focusOffset, i.dom))) {
      let f = i.posBefore;
      c = new B(o == f ? l : r.resolve(f));
    }
  } else {
    if (t instanceof n.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
      let d = o, f = o;
      for (let h = 0; h < t.rangeCount; h++) {
        let p = t.getRangeAt(h);
        d = Math.min(d, n.docView.posFromDOM(p.startContainer, p.startOffset, 1)), f = Math.max(f, n.docView.posFromDOM(p.endContainer, p.endOffset, -1));
      }
      if (d < 0)
        return null;
      [a, o] = f == n.state.selection.anchor ? [f, d] : [d, f], l = r.resolve(o);
    } else
      a = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (a < 0)
      return null;
  }
  let u = r.resolve(a);
  if (!c) {
    let d = e == "pointer" || n.state.selection.head < l.pos && !s ? 1 : -1;
    c = zl(n, u, l, d);
  }
  return c;
}
function Td(n) {
  return n.editable ? n.hasFocus() : Nd(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function It(n, e = !1) {
  let t = n.state.selection;
  if (Od(n, t), !!Td(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && Ce) {
      let r = n.domSelectionRange(), i = n.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && Nn(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      mm(n);
    else {
      let { anchor: r, head: i } = t, s, o;
      ec && !(t instanceof F) && (t.$from.parent.inlineContent || (s = tc(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (o = tc(n, t.to))), n.docView.setSelection(r, i, n, e), ec && (s && nc(s), o && nc(o)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && pm(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const ec = Ee || Ce && gd < 63;
function tc(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), i = r < t.childNodes.length ? t.childNodes[r] : null, s = r ? t.childNodes[r - 1] : null;
  if (Ee && i && i.contentEditable == "false")
    return yo(i);
  if ((!i || i.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (i)
      return yo(i);
    if (s)
      return yo(s);
  }
}
function yo(n) {
  return n.contentEditable = "true", Ee && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function nc(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function pm(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != i) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!Td(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function mm(n) {
  let e = n.domSelection(), t = document.createRange();
  if (!e)
    return;
  let r = n.cursorWrapper.dom, i = r.nodeName == "IMG";
  i ? t.setStart(r.parentNode, ve(r) + 1) : t.setStart(r, 0), t.collapse(!0), e.removeAllRanges(), e.addRange(t), !i && !n.state.selection.visible && Re && en <= 11 && (r.disabled = !0, r.disabled = !1);
}
function Od(n, e) {
  if (e instanceof B) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (rc(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    rc(n);
}
function rc(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function zl(n, e, t, r) {
  return n.someProp("createSelectionBetween", (i) => i(n, e, t)) || F.between(e, t, r);
}
function ic(n) {
  return n.editable && !n.hasFocus() ? !1 : Nd(n);
}
function Nd(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function gm(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return Nn(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Qo(n, e) {
  let { $anchor: t, $head: r } = n.selection, i = e > 0 ? t.max(r) : t.min(r), s = i.parent.inlineContent ? i.depth ? n.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return s && $.findFrom(s, e);
}
function $t(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function sc(n, e, t) {
  let r = n.state.selection;
  if (r instanceof F)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!s || s.isText || !s.isLeaf)
        return !1;
      let o = n.state.doc.resolve(i.pos + s.nodeSize * (e < 0 ? -1 : 1));
      return $t(n, new F(r.$anchor, o));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = Qo(n.state, e);
        return i && i instanceof B ? $t(n, i) : !1;
      } else if (!(Ge && t.indexOf("m") > -1)) {
        let i = r.$head, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, o;
        if (!s || s.isText)
          return !1;
        let l = e < 0 ? i.pos - s.nodeSize : i.pos;
        return s.isAtom || (o = n.docView.descAt(l)) && !o.contentDOM ? B.isSelectable(s) ? $t(n, new B(e < 0 ? n.state.doc.resolve(i.pos - s.nodeSize) : i)) : si ? $t(n, new F(n.state.doc.resolve(e < 0 ? l : l + s.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof B && r.node.isInline)
      return $t(n, new F(e > 0 ? r.$to : r.$from));
    {
      let i = Qo(n.state, e);
      return i ? $t(n, i) : !1;
    }
  }
}
function Zi(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Dr(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function Wn(n, e) {
  return e < 0 ? ym(n) : bm(n);
}
function ym(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i, s, o = !1;
  for (ot && t.nodeType == 1 && r < Zi(t) && Dr(t.childNodes[r], -1) && (o = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let l = t.childNodes[r - 1];
        if (Dr(l, -1))
          i = t, s = --r;
        else if (l.nodeType == 3)
          t = l, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (Dd(t))
        break;
      {
        let l = t.previousSibling;
        for (; l && Dr(l, -1); )
          i = t.parentNode, s = ve(l), l = l.previousSibling;
        if (l)
          t = l, r = Zi(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  o ? Zo(n, t, r) : i && Zo(n, i, s);
}
function bm(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i = Zi(t), s, o;
  for (; ; )
    if (r < i) {
      if (t.nodeType != 1)
        break;
      let l = t.childNodes[r];
      if (Dr(l, 1))
        s = t, o = ++r;
      else
        break;
    } else {
      if (Dd(t))
        break;
      {
        let l = t.nextSibling;
        for (; l && Dr(l, 1); )
          s = l.parentNode, o = ve(l) + 1, l = l.nextSibling;
        if (l)
          t = l, r = 0, i = Zi(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = i = 0;
        }
      }
    }
  s && Zo(n, s, o);
}
function Dd(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function vm(n, e) {
  for (; n && e == n.childNodes.length && !ii(n); )
    e = ve(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function wm(n, e) {
  for (; n && !e && !ii(n); )
    e = ve(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Zo(n, e, t) {
  if (e.nodeType != 3) {
    let s, o;
    (o = vm(e, t)) ? (e = o, t = 0) : (s = wm(e, t)) && (e = s, t = s.nodeValue.length);
  }
  let r = n.domSelection();
  if (!r)
    return;
  if (Ws(r)) {
    let s = document.createRange();
    s.setEnd(e, t), s.setStart(e, t), r.removeAllRanges(), r.addRange(s);
  } else r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && It(n);
  }, 50);
}
function oc(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(Ce || _p) && t.parent.inlineContent) {
    let i = n.coordsAtPos(e);
    if (e > t.start()) {
      let s = n.coordsAtPos(e - 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let s = n.coordsAtPos(e + 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function lc(n, e, t) {
  let r = n.state.selection;
  if (r instanceof F && !r.empty || t.indexOf("s") > -1 || Ge && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: s } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = Qo(n.state, e);
    if (o && o instanceof B)
      return $t(n, o);
  }
  if (!i.parent.inlineContent) {
    let o = e < 0 ? i : s, l = r instanceof je ? $.near(o, e) : $.findFrom(o, e);
    return l ? $t(n, l) : !1;
  }
  return !1;
}
function ac(n, e) {
  if (!(n.state.selection instanceof F))
    return !0;
  let { $head: t, $anchor: r, empty: i } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (s && !s.isText) {
    let o = n.state.tr;
    return e < 0 ? o.delete(t.pos - s.nodeSize, t.pos) : o.delete(t.pos, t.pos + s.nodeSize), n.dispatch(o), !0;
  }
  return !1;
}
function cc(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function km(n) {
  if (!Ee || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    cc(n, r, "true"), setTimeout(() => cc(n, r, "false"), 20);
  }
  return !1;
}
function Cm(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function xm(n, e) {
  let t = e.keyCode, r = Cm(e);
  if (t == 8 || Ge && t == 72 && r == "c")
    return ac(n, -1) || Wn(n, -1);
  if (t == 46 && !e.shiftKey || Ge && t == 68 && r == "c")
    return ac(n, 1) || Wn(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || Ge && t == 66 && r == "c") {
    let i = t == 37 ? oc(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return sc(n, i, r) || Wn(n, i);
  } else if (t == 39 || Ge && t == 70 && r == "c") {
    let i = t == 39 ? oc(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return sc(n, i, r) || Wn(n, i);
  } else {
    if (t == 38 || Ge && t == 80 && r == "c")
      return lc(n, -1, r) || Wn(n, -1);
    if (t == 40 || Ge && t == 78 && r == "c")
      return km(n) || lc(n, 1, r) || Wn(n, 1);
    if (r == (Ge ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function Vl(n, e) {
  n.someProp("transformCopied", (h) => {
    e = h(e, n);
  });
  let t = [], { content: r, openStart: i, openEnd: s } = e;
  for (; i > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, s--;
    let h = r.firstChild;
    t.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null), r = h.content;
  }
  let o = n.someProp("clipboardSerializer") || Pn.fromSchema(n.state.schema), l = Hd(), a = l.createElement("div");
  a.appendChild(o.serializeFragment(r, { document: l }));
  let c = a.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = Bd[c.nodeName.toLowerCase()]); ) {
    for (let h = u.length - 1; h >= 0; h--) {
      let p = l.createElement(u[h]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), d++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${s}${d ? ` -${d}` : ""} ${JSON.stringify(t)}`);
  let f = n.someProp("clipboardTextSerializer", (h) => h(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: f, slice: e };
}
function Ld(n, e, t, r, i) {
  let s = i.parent.type.spec.code, o, l;
  if (!t && !e)
    return null;
  let a = e && (r || s || !t);
  if (a) {
    if (n.someProp("transformPastedText", (f) => {
      e = f(e, s || r, n);
    }), s)
      return e ? new O(A.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0) : O.empty;
    let d = n.someProp("clipboardTextParser", (f) => f(e, i, r, n));
    if (d)
      l = d;
    else {
      let f = i.marks(), { schema: h } = n.state, p = Pn.fromSchema(h);
      o = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = o.appendChild(document.createElement("p"));
        m && g.appendChild(p.serializeNode(h.text(m, f)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (d) => {
      t = d(t, n);
    }), o = Em(t), si && Tm(o);
  let c = o && o.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let d = +u[3]; d > 0; d--) {
      let f = o.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      o = f;
    }
  if (l || (l = (n.someProp("clipboardParser") || n.someProp("domParser") || Zt.fromSchema(n.state.schema)).parseSlice(o, {
    preserveWhitespace: !!(a || u),
    context: i,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !Sm.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    l = Om(uc(l, +u[1], +u[2]), u[4]);
  else if (l = O.maxOpen(Mm(l.content, i), !0), l.openStart || l.openEnd) {
    let d = 0, f = 0;
    for (let h = l.content.firstChild; d < l.openStart && !h.type.spec.isolating; d++, h = h.firstChild)
      ;
    for (let h = l.content.lastChild; f < l.openEnd && !h.type.spec.isolating; f++, h = h.lastChild)
      ;
    l = uc(l, d, f);
  }
  return n.someProp("transformPasted", (d) => {
    l = d(l, n);
  }), l;
}
const Sm = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Mm(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)), s, o = [];
    if (n.forEach((l) => {
      if (!o)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return o = null;
      if (c = o.length && s.length && Id(a, s, l, o[o.length - 1], 0))
        o[o.length - 1] = c;
      else {
        o.length && (o[o.length - 1] = Pd(o[o.length - 1], s.length));
        let u = Rd(l, a);
        o.push(u), i = i.matchType(u.type), s = a;
      }
    }), o)
      return A.from(o);
  }
  return n;
}
function Rd(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, A.from(n));
  return n;
}
function Id(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let s = Id(n, e, t, r.lastChild, i + 1);
    if (s)
      return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (r.contentMatchAt(r.childCount).matchType(i == n.length - 1 ? t.type : n[i + 1]))
      return r.copy(r.content.append(A.from(Rd(t, n, i + 1))));
  }
}
function Pd(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, Pd(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(A.empty, !0);
  return n.copy(t.append(r));
}
function el(n, e, t, r, i, s) {
  let o = e < 0 ? n.firstChild : n.lastChild, l = o.content;
  return n.childCount > 1 && (s = 0), i < r - 1 && (l = el(l, e, t, r, i + 1, s)), i >= t && (l = e < 0 ? o.contentMatchAt(0).fillBefore(l, s <= i).append(l) : l.append(o.contentMatchAt(o.childCount).fillBefore(A.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, o.copy(l));
}
function uc(n, e, t) {
  return e < n.openStart && (n = new O(el(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new O(el(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const Bd = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let dc = null;
function Hd() {
  return dc || (dc = document.implementation.createHTMLDocument("title"));
}
let bo = null;
function Am(n) {
  let e = window.trustedTypes;
  return e ? (bo || (bo = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", { createHTML: (t) => t })), bo.createHTML(n)) : n;
}
function Em(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = Hd().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), i;
  if ((i = r && Bd[r[1].toLowerCase()]) && (n = i.map((s) => "<" + s + ">").join("") + n + i.map((s) => "</" + s + ">").reverse().join("")), t.innerHTML = Am(n), i)
    for (let s = 0; s < i.length; s++)
      t = t.querySelector(i[s]) || t;
  return t;
}
function Tm(n) {
  let e = n.querySelectorAll(Ce ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function Om(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: i, openStart: s, openEnd: o } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = A.from(a.create(r[l + 1], i)), s++, o++;
  }
  return new O(i, s, o);
}
const Te = {}, Oe = {}, Nm = { touchstart: !0, touchmove: !0 };
class Dm {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "", button: 0 }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function Lm(n) {
  for (let e in Te) {
    let t = Te[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      Im(n, r) && !$l(n, r) && (n.editable || !(r.type in Oe)) && t(n, r);
    }, Nm[e] ? { passive: !0 } : void 0);
  }
  Ee && n.dom.addEventListener("input", () => null), tl(n);
}
function Yt(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function Rm(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function tl(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => $l(n, r));
  });
}
function $l(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function Im(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function Pm(n, e) {
  !$l(n, e) && Te[e.type] && (n.editable || !(e.type in Oe)) && Te[e.type](n, e);
}
Oe.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !zd(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(Dt && Ce && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), rr && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (i) => i(n, pn(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else n.someProp("handleKeyDown", (r) => r(n, t)) || xm(n, t) ? t.preventDefault() : Yt(n, "key");
};
Oe.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
Oe.keypress = (n, e) => {
  let t = e;
  if (zd(n, t) || !t.charCode || t.ctrlKey && !t.altKey || Ge && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof F) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode), s = () => n.state.tr.insertText(i).scrollIntoView();
    !/[\r\n]/.test(i) && !n.someProp("handleTextInput", (o) => o(n, r.$from.pos, r.$to.pos, i, s)) && n.dispatch(s()), t.preventDefault();
  }
};
function Ks(n) {
  return { left: n.clientX, top: n.clientY };
}
function Bm(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function _l(n, e, t, r, i) {
  if (r == -1)
    return !1;
  let s = n.state.doc.resolve(r);
  for (let o = s.depth + 1; o > 0; o--)
    if (n.someProp(e, (l) => o > s.depth ? l(n, t, s.nodeAfter, s.before(o), i, !0) : l(n, t, s.node(o), s.before(o), i, !1)))
      return !0;
  return !1;
}
function er(n, e, t) {
  if (n.focused || n.focus(), n.state.selection.eq(e))
    return;
  let r = n.state.tr.setSelection(e);
  r.setMeta("pointer", !0), n.dispatch(r);
}
function Hm(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && B.isSelectable(r) ? (er(n, new B(t)), !0) : !1;
}
function Fm(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, i;
  t instanceof B && (r = t.node);
  let s = n.state.doc.resolve(e);
  for (let o = s.depth + 1; o > 0; o--) {
    let l = o > s.depth ? s.nodeAfter : s.node(o);
    if (B.isSelectable(l)) {
      r && t.$from.depth > 0 && o >= t.$from.depth && s.before(t.$from.depth + 1) == t.$from.pos ? i = s.before(t.$from.depth) : i = s.before(o);
      break;
    }
  }
  return i != null ? (er(n, B.create(n.state.doc, i)), !0) : !1;
}
function zm(n, e, t, r, i) {
  return _l(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (s) => s(n, e, r)) || (i ? Fm(n, t) : Hm(n, t));
}
function Vm(n, e, t, r) {
  return _l(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (i) => i(n, e, r));
}
function $m(n, e, t, r) {
  return _l(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (i) => i(n, e, r)) || _m(n, t, r);
}
function _m(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (er(n, F.create(r, 0, r.content.size)), !0) : !1;
  let i = r.resolve(e);
  for (let s = i.depth + 1; s > 0; s--) {
    let o = s > i.depth ? i.nodeAfter : i.node(s), l = i.before(s);
    if (o.inlineContent)
      er(n, F.create(r, l + 1, l + 1 + o.content.size));
    else if (B.isSelectable(o))
      er(n, B.create(r, l));
    else
      continue;
    return !0;
  }
}
function jl(n) {
  return es(n);
}
const Fd = Ge ? "metaKey" : "ctrlKey";
Te.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = jl(n), i = Date.now(), s = "singleClick";
  i - n.input.lastClick.time < 500 && Bm(t, n.input.lastClick) && !t[Fd] && n.input.lastClick.button == t.button && (n.input.lastClick.type == "singleClick" ? s = "doubleClick" : n.input.lastClick.type == "doubleClick" && (s = "tripleClick")), n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: s, button: t.button };
  let o = n.posAtCoords(Ks(t));
  o && (s == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new jm(n, o, t, !!r)) : (s == "doubleClick" ? Vm : $m)(n, o.pos, o.inside, t) ? t.preventDefault() : Yt(n, "pointer"));
};
class jm {
  constructor(e, t, r, i) {
    this.view = e, this.pos = t, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[Fd], this.allowDefault = r.shiftKey;
    let s, o;
    if (t.inside > -1)
      s = e.state.doc.nodeAt(t.inside), o = t.inside;
    else {
      let u = e.state.doc.resolve(t.pos);
      s = u.parent, o = u.depth ? u.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.dom.nodeType == 1 ? a.dom : null;
    let { selection: c } = e.state;
    (r.button == 0 && s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof B && c.from <= o && c.to > o) && (this.mightDrag = {
      node: s,
      pos: o,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && ot && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), Yt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => It(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Ks(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Yt(this.view, "pointer") : zm(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    Ee && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    Ce && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (er(this.view, $.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : Yt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), Yt(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
Te.touchstart = (n) => {
  n.input.lastTouch = Date.now(), jl(n), Yt(n, "pointer");
};
Te.touchmove = (n) => {
  n.input.lastTouch = Date.now(), Yt(n, "pointer");
};
Te.contextmenu = (n) => jl(n);
function zd(n, e) {
  return n.composing ? !0 : Ee && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const Wm = Dt ? 5e3 : -1;
Oe.compositionstart = Oe.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$to;
    if (e.selection instanceof F && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      n.markCursor = n.state.storedMarks || t.marks(), es(n, !0), n.markCursor = null;
    else if (es(n, !e.selection.empty), ot && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let i = r.focusNode, s = r.focusOffset; i && i.nodeType == 1 && s != 0; ) {
        let o = s < 0 ? i.lastChild : i.childNodes[s - 1];
        if (!o)
          break;
        if (o.nodeType == 3) {
          let l = n.domSelection();
          l && l.collapse(o, o.nodeValue.length);
          break;
        } else
          i = o, s = -1;
      }
    }
    n.input.composing = !0;
  }
  Vd(n, Wm);
};
Oe.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, Vd(n, 20));
};
function Vd(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => es(n), e));
}
function $d(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Km()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function Um(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = Hp(e.focusNode, e.focusOffset), r = Fp(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let i = r.pmViewDesc, s = n.domObserver.lastChangedTextNode;
    if (t == s || r == s)
      return s;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (n.input.compositionNode == r) {
      let o = t.pmViewDesc;
      if (!(!o || !o.isText(t.nodeValue)))
        return r;
    }
  }
  return t || r;
}
function Km() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function es(n, e = !1) {
  if (!(Dt && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), $d(n), e || n.docView && n.docView.dirty) {
      let t = Fl(n), r = n.state.selection;
      return t && !t.eq(r) ? n.dispatch(n.state.tr.setSelection(t)) : (n.markCursor || e) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? n.dispatch(n.state.tr.deleteSelection()) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function qm(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const Ur = Re && en < 15 || rr && jp < 604;
Te.copy = Oe.cut = (n, e) => {
  let t = e, r = n.state.selection, i = t.type == "cut";
  if (r.empty)
    return;
  let s = Ur ? null : t.clipboardData, o = r.content(), { dom: l, text: a } = Vl(n, o);
  s ? (t.preventDefault(), s.clearData(), s.setData("text/html", l.innerHTML), s.setData("text/plain", a)) : qm(n, l), i && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Jm(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function Gm(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? Kr(n, r.value, null, i, e) : Kr(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function Kr(n, e, t, r, i) {
  let s = Ld(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, i, s || O.empty)))
    return !0;
  if (!s)
    return !1;
  let o = Jm(s), l = o ? n.state.tr.replaceSelectionWith(o, r) : n.state.tr.replaceSelection(s);
  return n.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function _d(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
Oe.paste = (n, e) => {
  let t = e;
  if (n.composing && !Dt)
    return;
  let r = Ur ? null : t.clipboardData, i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && Kr(n, _d(r), r.getData("text/html"), i, t) ? t.preventDefault() : Gm(n, t);
};
class jd {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const Ym = Ge ? "altKey" : "ctrlKey";
function Wd(n, e) {
  let t = n.someProp("dragCopies", (r) => !r(e));
  return t ?? !e[Ym];
}
Te.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let i = n.state.selection, s = i.empty ? null : n.posAtCoords(Ks(t)), o;
  if (!(s && s.pos >= i.from && s.pos <= (i instanceof B ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      o = B.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let d = n.docView.nearestDesc(t.target, !0);
      d && d.node.type.spec.draggable && d != n.docView && (o = B.create(n.state.doc, d.posBefore));
    }
  }
  let l = (o || n.state.selection).content(), { dom: a, text: c, slice: u } = Vl(n, l);
  (!t.dataTransfer.files.length || !Ce || gd > 120) && t.dataTransfer.clearData(), t.dataTransfer.setData(Ur ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", Ur || t.dataTransfer.setData("text/plain", c), n.dragging = new jd(u, Wd(n, t), o);
};
Te.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
Oe.dragover = Oe.dragenter = (n, e) => e.preventDefault();
Oe.drop = (n, e) => {
  let t = e, r = n.dragging;
  if (n.dragging = null, !t.dataTransfer)
    return;
  let i = n.posAtCoords(Ks(t));
  if (!i)
    return;
  let s = n.state.doc.resolve(i.pos), o = r && r.slice;
  o ? n.someProp("transformPasted", (p) => {
    o = p(o, n);
  }) : o = Ld(n, _d(t.dataTransfer), Ur ? null : t.dataTransfer.getData("text/html"), !1, s);
  let l = !!(r && Wd(n, t));
  if (n.someProp("handleDrop", (p) => p(n, t, o || O.empty, l))) {
    t.preventDefault();
    return;
  }
  if (!o)
    return;
  t.preventDefault();
  let a = o ? ld(n.state.doc, s.pos, o) : s.pos;
  a == null && (a = s.pos);
  let c = n.state.tr;
  if (l) {
    let { node: p } = r;
    p ? p.replace(c) : c.deleteSelection();
  }
  let u = c.mapping.map(a), d = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1, f = c.doc;
  if (d ? c.replaceRangeWith(u, u, o.content.firstChild) : c.replaceRange(u, u, o), c.doc.eq(f))
    return;
  let h = c.doc.resolve(u);
  if (d && B.isSelectable(o.content.firstChild) && h.nodeAfter && h.nodeAfter.sameMarkup(o.content.firstChild))
    c.setSelection(new B(h));
  else {
    let p = c.mapping.map(a);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, g, y, w) => p = w), c.setSelection(zl(n, h, c.doc.resolve(p)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
Te.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && It(n);
  }, 20));
};
Te.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
Te.beforeinput = (n, e) => {
  if (Ce && Dt && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (s) => s(n, pn(8, "Backspace")))))
        return;
      let { $cursor: i } = n.state.selection;
      i && i.pos > 0 && n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in Oe)
  Te[n] = Oe[n];
function qr(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class ts {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || Sn, this.side = this.spec.side || 0;
  }
  map(e, t, r, i) {
    let { pos: s, deleted: o } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return o ? null : new xe(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof ts && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && qr(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class nn {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Sn;
  }
  map(e, t, r, i) {
    let s = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r, o = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= o ? null : new xe(s, o, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof nn && qr(this.attrs, e.attrs) && qr(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof nn;
  }
  destroy() {
  }
}
class Wl {
  constructor(e, t) {
    this.attrs = e, this.spec = t || Sn;
  }
  map(e, t, r, i) {
    let s = e.mapResult(t.from + i, 1);
    if (s.deleted)
      return null;
    let o = e.mapResult(t.to + i, -1);
    return o.deleted || o.pos <= s.pos ? null : new xe(s.pos - r, o.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from), s;
    return i == t.from && !(s = e.child(r)).isText && i + s.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof Wl && qr(this.attrs, e.attrs) && qr(this.spec, e.spec);
  }
  destroy() {
  }
}
class xe {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new xe(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new xe(e, e, new ts(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, i) {
    return new xe(e, t, new nn(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, i) {
    return new xe(e, t, new Wl(r, i));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof nn;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof ts;
  }
}
const Jn = [], Sn = {};
class ie {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : Jn, this.children = t.length ? t : Jn;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? ns(t, e, 0, Sn) : ke;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let i = [];
    return this.findInner(e ?? 0, t ?? 1e9, i, 0, r), i;
  }
  findInner(e, t, r, i, s) {
    for (let o = 0; o < this.local.length; o++) {
      let l = this.local[o];
      l.from <= t && l.to >= e && (!s || s(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < t && this.children[o + 1] > e) {
        let l = this.children[o] + 1;
        this.children[o + 2].findInner(e - l, t - l, r, i + l, s);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == ke || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || Sn);
  }
  /**
  @internal
  */
  mapInner(e, t, r, i, s) {
    let o;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(t, a) ? (o || (o = [])).push(a) : s.onRemove && s.onRemove(this.local[l].spec);
    }
    return this.children.length ? Xm(this.children, o || [], e, t, r, i, s) : o ? new ie(o.sort(Mn), Jn) : ke;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == ke ? ie.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let i, s = 0;
    e.forEach((l, a) => {
      let c = a + r, u;
      if (u = Kd(t, l, c)) {
        for (i || (i = this.children.slice()); s < i.length && i[s] < a; )
          s += 3;
        i[s] == a ? i[s + 2] = i[s + 2].addInner(l, u, c + 1) : i.splice(s, 0, a, a + l.nodeSize, ns(u, l, c + 1, Sn)), s += 3;
      }
    });
    let o = Ud(s ? qd(t) : t, -r);
    for (let l = 0; l < o.length; l++)
      o[l].type.valid(e, o[l]) || o.splice(l--, 1);
    return new ie(o.length ? this.local.concat(o).sort(Mn) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == ke ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, i = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let o, l = r[s] + t, a = r[s + 1] + t;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) && d.from > l && d.to < a && (e[u] = null, (o || (o = [])).push(d));
      if (!o)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[s + 2].removeInner(o, l + 1);
      c != ke ? r[s + 2] = c : (r.splice(s, 3), s -= 3);
    }
    if (i.length) {
      for (let s = 0, o; s < e.length; s++)
        if (o = e[s])
          for (let l = 0; l < i.length; l++)
            i[l].eq(o, t) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new ie(i, r) : ke;
  }
  forChild(e, t) {
    if (this == ke)
      return this;
    if (t.isLeaf)
      return ie.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let s = e + 1, o = s + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < o && a.to > s && a.type instanceof nn) {
        let c = Math.max(s, a.from) - s, u = Math.min(o, a.to) - s;
        c < u && (i || (i = [])).push(a.copy(c, u));
      }
    }
    if (i) {
      let l = new ie(i.sort(Mn), Jn);
      return r ? new Wt([l, r]) : l;
    }
    return r || ke;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof ie) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return Ul(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == ke)
      return Jn;
    if (e.inlineContent || !this.local.some(nn.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof nn || t.push(this.local[r]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
ie.empty = new ie([], []);
ie.removeOverlap = Ul;
const ke = ie.empty;
class Wt {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, Sn));
    return Wt.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return ie.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].forChild(e, t);
      s != ke && (s instanceof Wt ? r = r.concat(s.members) : r.push(s));
    }
    return Wt.from(r);
  }
  eq(e) {
    if (!(e instanceof Wt) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].localsInner(e);
      if (s.length)
        if (!t)
          t = s;
        else {
          r && (t = t.slice(), r = !1);
          for (let o = 0; o < s.length; o++)
            t.push(s[o]);
        }
    }
    return t ? Ul(r ? t : t.sort(Mn)) : Jn;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return ke;
      case 1:
        return e[0];
      default:
        return new Wt(e.every((t) => t instanceof ie) ? e : e.reduce((t, r) => t.concat(r instanceof ie ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++)
      this.members[t].forEachSet(e);
  }
}
function Xm(n, e, t, r, i, s, o) {
  let l = n.slice();
  for (let c = 0, u = s; c < t.maps.length; c++) {
    let d = 0;
    t.maps[c].forEach((f, h, p, m) => {
      let g = m - p - (h - f);
      for (let y = 0; y < l.length; y += 3) {
        let w = l[y + 1];
        if (w < 0 || f > w + u - d)
          continue;
        let C = l[y] + u - d;
        h >= C ? l[y + 1] = f <= C ? -2 : -1 : f >= u && g && (l[y] += g, l[y + 1] += g);
      }
      d += g;
    }), u = t.maps[c].map(u, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let u = t.map(n[c] + s), d = u - i;
      if (d < 0 || d >= r.content.size) {
        a = !0;
        continue;
      }
      let f = t.map(n[c + 1] + s, -1), h = f - i, { index: p, offset: m } = r.content.findIndex(d), g = r.maybeChild(p);
      if (g && m == d && m + g.nodeSize == h) {
        let y = l[c + 2].mapInner(t, g, u + 1, n[c] + s + 1, o);
        y != ke ? (l[c] = d, l[c + 1] = h, l[c + 2] = y) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = Qm(l, n, e, t, i, s, o), u = ns(c, r, 0, o);
    e = u.local;
    for (let d = 0; d < l.length; d += 3)
      l[d + 1] < 0 && (l.splice(d, 3), d -= 3);
    for (let d = 0, f = 0; d < u.children.length; d += 3) {
      let h = u.children[d];
      for (; f < l.length && l[f] < h; )
        f += 3;
      l.splice(f, 0, u.children[d], u.children[d + 1], u.children[d + 2]);
    }
  }
  return new ie(e.sort(Mn), l);
}
function Ud(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new xe(i.from + e, i.to + e, i.type));
  }
  return t;
}
function Qm(n, e, t, r, i, s, o) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let d = a.local[u].map(r, i, c);
      d ? t.push(d) : o.onRemove && o.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + s + 1);
  return t;
}
function Kd(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, i = null;
  for (let s = 0, o; s < n.length; s++)
    (o = n[s]) && o.from > t && o.to < r && ((i || (i = [])).push(o), n[s] = null);
  return i;
}
function qd(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function ns(n, e, t, r) {
  let i = [], s = !1;
  e.forEach((l, a) => {
    let c = Kd(n, l, a + t);
    if (c) {
      s = !0;
      let u = ns(c, l, t + a + 1, r);
      u != ke && i.push(a, a + l.nodeSize, u);
    }
  });
  let o = Ud(s ? qd(n) : n, -t).sort(Mn);
  for (let l = 0; l < o.length; l++)
    o[l].type.valid(e, o[l]) || (r.onRemove && r.onRemove(o[l].spec), o.splice(l--, 1));
  return o.length || i.length ? new ie(o, i) : ke;
}
function Mn(n, e) {
  return n.from - e.from || n.to - e.to;
}
function Ul(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let s = e[i];
        if (s.from == r.from) {
          s.to != r.to && (e == n && (e = n.slice()), e[i] = s.copy(s.from, r.to), fc(e, i + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, s.from), fc(e, i, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function fc(n, e, t) {
  for (; e < n.length && Mn(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function vo(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != ke && e.push(r);
  }), n.cursorWrapper && e.push(ie.create(n.state.doc, [n.cursorWrapper.deco])), Wt.from(e);
}
const Zm = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, eg = Re && en <= 11;
class tg {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class ng {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new tg(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      Re && en <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), eg && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Zm)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (ic(this.view)) {
      if (this.suppressingSelectionUpdates)
        return It(this.view);
      if (Re && en <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && Nn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), r;
    for (let s = e.focusNode; s; s = nr(s))
      t.add(s);
    for (let s = e.anchorNode; s; s = nr(s))
      if (t.has(s)) {
        r = s;
        break;
      }
    let i = r && this.view.docView.nearestDesc(r);
    if (i && i.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && ic(e) && !this.ignoreSelectionChange(r), s = -1, o = -1, l = !1, a = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let d = this.registerMutation(t[u], a);
        d && (s = s < 0 ? d.from : Math.min(d.from, s), o = o < 0 ? d.to : Math.max(d.to, o), d.typeOver && (l = !0));
      }
    if (ot && a.length) {
      let u = a.filter((d) => d.nodeName == "BR");
      if (u.length == 2) {
        let [d, f] = u;
        d.parentNode && d.parentNode.parentNode == f.parentNode ? f.remove() : d.remove();
      } else {
        let { focusNode: d } = this.currentSelection;
        for (let f of u) {
          let h = f.parentNode;
          h && h.nodeName == "LI" && (!d || sg(e, d) != h) && f.remove();
        }
      }
    }
    let c = null;
    s < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && Ws(r) && (c = Fl(e)) && c.eq($.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, It(e), this.currentSelection.set(r), e.scrollToSelection()) : (s > -1 || i) && (s > -1 && (e.docView.markDirty(s, o), rg(e)), this.handleDOMChange(s, o, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || It(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let d = e.addedNodes[u];
        t.push(d), d.nodeType == 3 && (this.lastChangedTextNode = d);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, s = e.nextSibling;
      if (Re && en <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: f } = e.addedNodes[u];
          (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (i = d), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (s = f);
        }
      let o = i && i.parentNode == e.target ? ve(i) + 1 : 0, l = r.localPosFromDOM(e.target, o, -1), a = s && s.parentNode == e.target ? ve(s) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : (this.lastChangedTextNode = e.target, {
      from: r.posAtStart,
      to: r.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: e.target.nodeValue == e.oldValue
    });
  }
}
let hc = /* @__PURE__ */ new WeakMap(), pc = !1;
function rg(n) {
  if (!hc.has(n) && (hc.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = ot, pc)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), pc = !0;
  }
}
function mc(n, e) {
  let t = e.startContainer, r = e.startOffset, i = e.endContainer, s = e.endOffset, o = n.domAtPos(n.state.selection.anchor);
  return Nn(o.node, o.offset, i, s) && ([t, r, i, s] = [i, s, t, r]), { anchorNode: t, anchorOffset: r, focusNode: i, focusOffset: s };
}
function ig(n, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(n.root)[0];
    if (i)
      return mc(n, i);
  }
  let t;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), t = i.getTargetRanges()[0];
  }
  return n.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", r, !0), t ? mc(n, t) : null;
}
function sg(n, e) {
  for (let t = e.parentNode; t && t != n.dom; t = t.parentNode) {
    let r = n.docView.nearestDesc(t, !0);
    if (r && r.node.isBlock)
      return t;
  }
  return null;
}
function og(n, e, t) {
  let { node: r, fromOffset: i, toOffset: s, from: o, to: l } = n.docView.parseRange(e, t), a = n.domSelectionRange(), c, u = a.anchorNode;
  if (u && n.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: a.anchorOffset }], Ws(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), Ce && n.input.lastKeyCode === 8)
    for (let g = s; g > i; g--) {
      let y = r.childNodes[g - 1], w = y.pmViewDesc;
      if (y.nodeName == "BR" && !w) {
        s = g;
        break;
      }
      if (!w || w.size)
        break;
    }
  let d = n.state.doc, f = n.someProp("domParser") || Zt.fromSchema(n.state.schema), h = d.resolve(o), p = null, m = f.parse(r, {
    topNode: h.parent,
    topMatch: h.parent.contentMatchAt(h.index()),
    topOpen: !0,
    from: i,
    to: s,
    preserveWhitespace: h.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: lg,
    context: h
  });
  if (c && c[0].pos != null) {
    let g = c[0].pos, y = c[1] && c[1].pos;
    y == null && (y = g), p = { anchor: g + o, head: y + o };
  }
  return { doc: m, sel: p, from: o, to: l };
}
function lg(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (Ee && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || Ee && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const ag = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function cg(n, e, t, r, i) {
  let s = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let M = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, I = Fl(n, M);
    if (I && !n.state.selection.eq(I)) {
      if (Ce && Dt && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (j) => j(n, pn(13, "Enter"))))
        return;
      let N = n.state.tr.setSelection(I);
      M == "pointer" ? N.setMeta("pointer", !0) : M == "key" && N.scrollIntoView(), s && N.setMeta("composition", s), n.dispatch(N);
    }
    return;
  }
  let o = n.state.doc.resolve(e), l = o.sharedDepth(t);
  e = o.before(l + 1), t = n.state.doc.resolve(t).after(l + 1);
  let a = n.state.selection, c = og(n, e, t), u = n.state.doc, d = u.slice(c.from, c.to), f, h;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (f = n.state.selection.to, h = "end") : (f = n.state.selection.from, h = "start"), n.input.lastKeyCode = null;
  let p = fg(d.content, c.doc.content, c.from, f, h);
  if (p && n.input.domChangeCount++, (rr && n.input.lastIOSEnter > Date.now() - 225 || Dt) && i.some((M) => M.nodeType == 1 && !ag.test(M.nodeName)) && (!p || p.endA >= p.endB) && n.someProp("handleKeyDown", (M) => M(n, pn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof F && !a.empty && a.$head.sameParent(a.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let M = gc(n, n.state.doc, c.sel);
        if (M && !M.eq(n.state.selection)) {
          let I = n.state.tr.setSelection(M);
          s && I.setMeta("composition", s), n.dispatch(I);
        }
      }
      return;
    }
  n.state.selection.from < n.state.selection.to && p.start == p.endB && n.state.selection instanceof F && (p.start > n.state.selection.from && p.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? p.start = n.state.selection.from : p.endA < n.state.selection.to && p.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (p.endB += n.state.selection.to - p.endA, p.endA = n.state.selection.to)), Re && en <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let m = c.doc.resolveNoCache(p.start - c.from), g = c.doc.resolveNoCache(p.endB - c.from), y = u.resolve(p.start), w = m.sameParent(g) && m.parent.inlineContent && y.end() >= p.endA, C;
  if ((rr && n.input.lastIOSEnter > Date.now() - 225 && (!w || i.some((M) => M.nodeName == "DIV" || M.nodeName == "P")) || !w && m.pos < c.doc.content.size && (!m.sameParent(g) || !m.parent.inlineContent) && !/\S/.test(c.doc.textBetween(m.pos, g.pos, "", "")) && (C = $.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && C.head > m.pos) && n.someProp("handleKeyDown", (M) => M(n, pn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > p.start && dg(u, p.start, p.endA, m, g) && n.someProp("handleKeyDown", (M) => M(n, pn(8, "Backspace")))) {
    Dt && Ce && n.domObserver.suppressSelectionUpdates();
    return;
  }
  Ce && p.endB == p.start && (n.input.lastChromeDelete = Date.now()), Dt && !w && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, g = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(M) {
      return M(n, pn(13, "Enter"));
    });
  }, 20));
  let b = p.start, S = p.endA, k = (M) => {
    let I = M || n.state.tr.replace(b, S, c.doc.slice(p.start - c.from, p.endB - c.from));
    if (c.sel) {
      let N = gc(n, I.doc, c.sel);
      N && !(Ce && n.composing && N.empty && (p.start != p.endB || n.input.lastChromeDelete < Date.now() - 100) && (N.head == b || N.head == I.mapping.map(S) - 1) || Re && N.empty && N.head == b) && I.setSelection(N);
    }
    return s && I.setMeta("composition", s), I.scrollIntoView();
  }, T;
  if (w) {
    if (m.pos == g.pos) {
      Re && en <= 11 && m.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => It(n), 20));
      let M = k(n.state.tr.delete(b, S)), I = u.resolve(p.start).marksAcross(u.resolve(p.endA));
      I && M.ensureMarks(I), n.dispatch(M);
    } else if (
      // Adding or removing a mark
      p.endA == p.endB && (T = ug(m.parent.content.cut(m.parentOffset, g.parentOffset), y.parent.content.cut(y.parentOffset, p.endA - y.start())))
    ) {
      let M = k(n.state.tr);
      T.type == "add" ? M.addMark(b, S, T.mark) : M.removeMark(b, S, T.mark), n.dispatch(M);
    } else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let M = m.parent.textBetween(m.parentOffset, g.parentOffset), I = () => k(n.state.tr.insertText(M, b, S));
      n.someProp("handleTextInput", (N) => N(n, b, S, M, I)) || n.dispatch(I());
    }
  } else
    n.dispatch(k());
}
function gc(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : zl(n, e.resolve(t.anchor), e.resolve(t.head));
}
function ug(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, i = t, s = r, o, l, a;
  for (let u = 0; u < r.length; u++)
    i = r[u].removeFromSet(i);
  for (let u = 0; u < t.length; u++)
    s = t[u].removeFromSet(s);
  if (i.length == 1 && s.length == 0)
    l = i[0], o = "add", a = (u) => u.mark(l.addToSet(u.marks));
  else if (i.length == 0 && s.length == 1)
    l = s[0], o = "remove", a = (u) => u.mark(l.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(a(e.child(u)));
  if (A.from(c).eq(n))
    return { mark: l, type: o };
}
function dg(n, e, t, r, i) {
  if (
    // The content must have shrunk
    t - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    wo(r, !0, !1) < i.pos
  )
    return !1;
  let s = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = s.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let o = n.resolve(wo(s, !0, !0));
  return !o.parent.isTextblock || o.pos > t || wo(o, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function wo(n, e, t) {
  let r = n.depth, i = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, i++, e = !1;
  if (t) {
    let s = n.node(r).maybeChild(n.indexAfter(r));
    for (; s && !s.isLeaf; )
      s = s.firstChild, i++;
  }
  return i;
}
function fg(n, e, t, r, i) {
  let s = n.findDiffStart(e, t);
  if (s == null)
    return null;
  let { a: o, b: l } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (i == "end") {
    let a = Math.max(0, s - Math.min(o, l));
    r -= o + a - s;
  }
  if (o < s && n.size < e.size) {
    let a = r <= s && r >= o ? s - r : 0;
    s -= a, s && s < e.size && yc(e.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), l = s + (l - o), o = s;
  } else if (l < s) {
    let a = r <= s && r >= l ? s - r : 0;
    s -= a, s && s < n.size && yc(n.textBetween(s - 1, s + 1)) && (s += a ? 1 : -1), o = s + (o - l), l = s;
  }
  return { start: s, endA: o, endB: l };
}
function yc(n) {
  if (n.length != 2)
    return !1;
  let e = n.charCodeAt(0), t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class Jd {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Dm(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(Cc), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = wc(this), vc(this), this.nodeViews = kc(this), this.docView = Qa(this.state.doc, bc(this), vo(this), this.dom, this), this.domObserver = new ng(this, (r, i, s, o) => cg(this, r, i, s, o)), this.domObserver.start(), Lm(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && tl(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(Cc), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let i = this.state, s = !1, o = !1;
    e.storedMarks && this.composing && ($d(this), o = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let h = kc(this);
      pg(h, this.nodeViews) && (this.nodeViews = h, s = !0);
    }
    (l || t.handleDOMEvents != this._props.handleDOMEvents) && tl(this), this.editable = wc(this), vc(this);
    let a = vo(this), c = bc(this), u = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", d = s || !this.docView.matchesNode(e.doc, c, a);
    (d || !e.selection.eq(i.selection)) && (o = !0);
    let f = u == "preserve" && o && this.dom.style.overflowAnchor == null && Kp(this);
    if (o) {
      this.domObserver.stop();
      let h = d && (Re || Ce) && !this.composing && !i.selection.empty && !e.selection.empty && hg(i.selection, e.selection);
      if (d) {
        let p = Ce ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = Um(this)), (s || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = Qa(e.doc, c, a, this.dom, this)), p && !this.trackWrites && (h = !0);
      }
      h || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && gm(this)) ? It(this, h) : (Od(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : f && qp(f);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (t) => t(this))) if (this.state.selection instanceof B) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && Ka(this, t.getBoundingClientRect(), e);
      } else
        Ka(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node, i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let s = r.from + (this.state.doc.content.size - t.doc.content.size);
      (s > 0 && this.state.doc.nodeAt(s)) == r.node && (i = s);
    }
    this.dragging = new jd(e.slice, e.move, i < 0 ? void 0 : B.create(this.state.doc, i));
  }
  someProp(e, t) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = t ? t(r) : r))
      return i;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let l = this.directPlugins[o].props[e];
      if (l != null && (i = t ? t(l) : l))
        return i;
    }
    let s = this.state.plugins;
    if (s)
      for (let o = 0; o < s.length; o++) {
        let l = s[o].props[e];
        if (l != null && (i = t ? t(l) : l))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (Re) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && Jp(this.dom), It(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return Zp(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return kd(this, e, t);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, t, r = -1) {
    let i = this.docView.posFromDOM(e, t, r);
    if (i == null)
      throw new RangeError("DOM position not inside the editor");
    return i;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, t) {
    return im(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return Kr(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return Kr(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Serialize the given slice as it would be if it was copied from
  this editor. Returns a DOM element that contains a
  representation of the slice as its children, a textual
  representation, and the transformed slice (which can be
  different from the given input due to hooks like
  [`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).
  */
  serializeForClipboard(e) {
    return Vl(this, e);
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (Rm(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], vo(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, Pp());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return Pm(this, e);
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? Ee && this.root.nodeType === 11 && Vp(this.dom.ownerDocument) == this.dom && ig(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
Jd.prototype.dispatch = function(n) {
  let e = this._props.dispatchTransaction;
  e ? e.call(this, n) : this.updateState(this.state.apply(n));
};
function bc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [xe.node(0, n.state.doc.content.size, e)];
}
function vc(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: xe.widget(n.state.selection.from, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function wc(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function hg(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function kc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function pg(n, e) {
  let t = 0, r = 0;
  for (let i in n) {
    if (n[i] != e[i])
      return !0;
    t++;
  }
  for (let i in e)
    r++;
  return t != r;
}
function Cc(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var rn = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, rs = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, mg = typeof navigator < "u" && /Mac/.test(navigator.platform), gg = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var we = 0; we < 10; we++) rn[48 + we] = rn[96 + we] = String(we);
for (var we = 1; we <= 24; we++) rn[we + 111] = "F" + we;
for (var we = 65; we <= 90; we++)
  rn[we] = String.fromCharCode(we + 32), rs[we] = String.fromCharCode(we);
for (var ko in rn) rs.hasOwnProperty(ko) || (rs[ko] = rn[ko]);
function yg(n) {
  var e = mg && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || gg && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? rs : rn)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const bg = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), vg = typeof navigator < "u" && /Win/.test(navigator.platform);
function wg(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      s = !0;
    else if (/^mod$/i.test(a))
      bg ? o = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (t = "Alt-" + t), i && (t = "Ctrl-" + t), o && (t = "Meta-" + t), s && (t = "Shift-" + t), t;
}
function kg(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[wg(t)] = n[t];
  return e;
}
function Co(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function Cg(n) {
  return new le({ props: { handleKeyDown: Gd(n) } });
}
function Gd(n) {
  let e = kg(n);
  return function(t, r) {
    let i = yg(r), s, o = e[Co(i, r)];
    if (o && o(t.state, t.dispatch, t))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[Co(i, r, !1)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.altKey || r.metaKey || r.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
      !(vg && r.ctrlKey && r.altKey) && (s = rn[r.keyCode]) && s != i) {
        let l = e[Co(s, r)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const Kl = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Yd(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Xd = (n, e, t) => {
  let r = Yd(n, t);
  if (!r)
    return !1;
  let i = ql(r);
  if (!i) {
    let o = r.blockRange(), l = o && hr(o);
    return l == null ? !1 : (e && e(n.tr.lift(o, l).scrollIntoView()), !0);
  }
  let s = i.nodeBefore;
  if (lf(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (ir(s, "end") || B.isSelectable(s)))
    for (let o = r.depth; ; o--) {
      let l = _s(n.doc, r.before(o), r.after(o), O.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(ir(s, "end") ? $.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : B.create(a.doc, i.pos - s.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (o == 1 || r.node(o - 1).childCount > 1)
        break;
    }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - s.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, xg = (n, e, t) => {
  let r = Yd(n, t);
  if (!r)
    return !1;
  let i = ql(r);
  return i ? Qd(n, i, e) : !1;
}, Sg = (n, e, t) => {
  let r = ef(n, t);
  if (!r)
    return !1;
  let i = Jl(r);
  return i ? Qd(n, i, e) : !1;
};
function Qd(n, e, t) {
  let r = e.nodeBefore, i = r, s = e.pos - 1;
  for (; !i.isTextblock; s--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let o = e.nodeAfter, l = o, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let c = _s(n.doc, s, a, O.empty);
  if (!c || c.from != s || c instanceof he && c.slice.size >= a - s)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(F.create(u.doc, s)), t(u.scrollIntoView());
  }
  return !0;
}
function ir(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Zd = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    s = ql(r);
  }
  let o = s && s.nodeBefore;
  return !o || !B.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(B.create(n.doc, s.pos - o.nodeSize)).scrollIntoView()), !0);
};
function ql(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function ef(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const tf = (n, e, t) => {
  let r = ef(n, t);
  if (!r)
    return !1;
  let i = Jl(r);
  if (!i)
    return !1;
  let s = i.nodeAfter;
  if (lf(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (ir(s, "start") || B.isSelectable(s))) {
    let o = _s(n.doc, r.before(), r.after(), O.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let l = n.tr.step(o);
        l.setSelection(ir(s, "start") ? $.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : B.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, nf = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    s = Jl(r);
  }
  let o = s && s.nodeAfter;
  return !o || !B.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(B.create(n.doc, s.pos)).scrollIntoView()), !0);
};
function Jl(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const Mg = (n, e) => {
  let t = n.selection, r = t instanceof B, i;
  if (r) {
    if (t.node.isTextblock || !sn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = $s(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let s = n.tr.join(i);
    r && s.setSelection(B.create(s.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(s.scrollIntoView());
  }
  return !0;
}, Ag = (n, e) => {
  let t = n.selection, r;
  if (t instanceof B) {
    if (t.node.isTextblock || !sn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = $s(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Eg = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), s = i && hr(i);
  return s == null ? !1 : (e && e(n.tr.lift(i, s).scrollIntoView()), !0);
}, rf = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Gl(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Tg = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), s = t.indexAfter(-1), o = Gl(i.contentMatchAt(s));
  if (!o || !i.canReplaceWith(s, s, o))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, o.createAndFill());
    a.setSelection($.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, sf = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof je || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let s = Gl(i.parent.contentMatchAt(i.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let o = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(o, s.createAndFill());
    l.setSelection(F.create(l.doc, o + 1)), e(l.scrollIntoView());
  }
  return !0;
}, of = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let s = t.before();
    if (Rt(n.doc, s))
      return e && e(n.tr.split(s).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && hr(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function Og(n) {
  return (e, t) => {
    let { $from: r, $to: i } = e.selection;
    if (e.selection instanceof B && e.selection.node.isBlock)
      return !r.parentOffset || !Rt(e.doc, r.pos) ? !1 : (t && t(e.tr.split(r.pos).scrollIntoView()), !0);
    if (!r.depth)
      return !1;
    let s = [], o, l, a = !1, c = !1;
    for (let h = r.depth; ; h--)
      if (r.node(h).isBlock) {
        a = r.end(h) == r.pos + (r.depth - h), c = r.start(h) == r.pos - (r.depth - h), l = Gl(r.node(h - 1).contentMatchAt(r.indexAfter(h - 1))), s.unshift(a && l ? { type: l } : null), o = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let u = e.tr;
    (e.selection instanceof F || e.selection instanceof je) && u.deleteSelection();
    let d = u.mapping.map(r.pos), f = Rt(u.doc, d, s.length, s);
    if (f || (s[0] = l ? { type: l } : null, f = Rt(u.doc, d, s.length, s)), !f)
      return !1;
    if (u.split(d, s.length, s), !a && c && r.node(o).type != l) {
      let h = u.mapping.map(r.before(o)), p = u.doc.resolve(h);
      l && r.node(o - 1).canReplaceWith(p.index(), p.index() + 1, l) && u.setNodeMarkup(u.mapping.map(r.before(o)), l);
    }
    return t && t(u.scrollIntoView()), !0;
  };
}
const Ng = Og(), Dg = (n, e) => {
  let { $from: t, to: r } = n.selection, i, s = t.sharedDepth(r);
  return s == 0 ? !1 : (i = t.before(s), e && e(n.tr.setSelection(B.create(n.doc, i))), !0);
};
function Lg(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, s = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(s - 1, s) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(i.isTextblock || sn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function lf(n, e, t, r) {
  let i = e.nodeBefore, s = e.nodeAfter, o, l, a = i.type.spec.isolating || s.type.spec.isolating;
  if (!a && Lg(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (o = (l = i.contentMatchAt(i.childCount)).findWrapping(s.type)) && l.matchType(o[0] || s.type).validEnd) {
    if (t) {
      let h = e.pos + s.nodeSize, p = A.empty;
      for (let y = o.length - 1; y >= 0; y--)
        p = A.from(o[y].create(null, p));
      p = A.from(i.copy(p));
      let m = n.tr.step(new pe(e.pos - 1, h, e.pos, h, new O(p, 1, 0), o.length, !0)), g = m.doc.resolve(h + 2 * o.length);
      g.nodeAfter && g.nodeAfter.type == i.type && sn(m.doc, g.pos) && m.join(g.pos), t(m.scrollIntoView());
    }
    return !0;
  }
  let u = s.type.spec.isolating || r > 0 && a ? null : $.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && hr(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (c && ir(s, "start", !0) && ir(i, "end")) {
    let h = i, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let m = s, g = 1;
    for (; !m.isTextblock; m = m.firstChild)
      g++;
    if (h.canReplace(h.childCount, h.childCount, m.content)) {
      if (t) {
        let y = A.empty;
        for (let C = p.length - 1; C >= 0; C--)
          y = A.from(p[C].copy(y));
        let w = n.tr.step(new pe(e.pos - p.length, e.pos + s.nodeSize, e.pos + g, e.pos + s.nodeSize - g, new O(y, p.length, 0), 0, !0));
        t(w.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function af(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, s = i.depth;
    for (; i.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return i.node(s).isTextblock ? (t && t(e.tr.setSelection(F.create(e.doc, n < 0 ? i.start(s) : i.end(s)))), !0) : !1;
  };
}
const Rg = af(-1), Ig = af(1);
function Pg(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: s } = t.selection, o = i.blockRange(s), l = o && Il(o, n, e);
    return l ? (r && r(t.tr.wrap(o, l).scrollIntoView()), !0) : !1;
  };
}
function xc(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let s = 0; s < t.selection.ranges.length && !i; s++) {
      let { $from: { pos: o }, $to: { pos: l } } = t.selection.ranges[s];
      t.doc.nodesBetween(o, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            i = !0;
          else {
            let u = t.doc.resolve(c), d = u.index();
            i = u.parent.canReplaceWith(d, d + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let s = t.tr;
      for (let o = 0; o < t.selection.ranges.length; o++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[o];
        s.setBlockType(l, a, n, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
function Yl(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Yl(Kl, Xd, Zd);
Yl(Kl, tf, nf);
Yl(rf, sf, of, Ng);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Bg(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: s } = t.selection, o = i.blockRange(s);
    if (!o)
      return !1;
    let l = r ? t.tr : null;
    return Hg(l, o, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Hg(n, e, t, r = null) {
  let i = !1, s = e, o = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = o.resolve(e.start - 2);
    s = new Yi(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new Yi(e.$from, o.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Il(s, t, r, e);
  return l ? (n && Fg(n, e, l, i, t), !0) : !1;
}
function Fg(n, e, t, r, i) {
  let s = A.empty;
  for (let u = t.length - 1; u >= 0; u--)
    s = A.from(t[u].type.create(t[u].attrs, s));
  n.step(new pe(e.start - (r ? 2 : 0), e.end, e.start, e.end, new O(s, 0, 0), t.length, !0));
  let o = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (o = u + 1);
  let l = t.length - o, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && Rt(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function zg(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (o) => o.childCount > 0 && o.firstChild.type == n);
    return s ? t ? r.node(s.depth - 1).type == n ? Vg(e, t, n, s) : $g(e, t, s) : !0 : !1;
  };
}
function Vg(n, e, t, r) {
  let i = n.tr, s = r.end, o = r.$to.end(r.depth);
  s < o && (i.step(new pe(s - 1, o, s, o, new O(A.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Yi(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
  const l = hr(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(s, -1) - 1);
  return sn(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function $g(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let s = r.doc.resolve(t.start), o = s.nodeAfter;
  if (r.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = s.node(-1), u = s.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, o.content.append(a ? A.empty : A.from(i))))
    return !1;
  let d = s.pos, f = d + o.nodeSize;
  return r.step(new pe(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new O((l ? A.empty : A.from(i.copy(A.empty))).append(a ? A.empty : A.from(i.copy(A.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function _g(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!s)
      return !1;
    let o = s.startIndex;
    if (o == 0)
      return !1;
    let l = s.parent, a = l.child(o - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, u = A.from(c ? n.create() : null), d = new O(A.from(n.create(null, A.from(l.type.create(null, u)))), c ? 3 : 1, 0), f = s.start, h = s.end;
      t(e.tr.step(new pe(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function qs(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t, { doc: i } = t, { storedMarks: s } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return s;
    },
    get selection() {
      return r;
    },
    get doc() {
      return i;
    },
    get tr() {
      return r = t.selection, i = t.doc, s = t.storedMarks, t;
    }
  };
}
class Js {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: r } = this, { view: i } = t, { tr: s } = r, o = this.buildProps(s);
    return Object.fromEntries(Object.entries(e).map(([l, a]) => [l, (...u) => {
      const d = a(...u)(o);
      return !s.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(s), d;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: i, state: s } = this, { view: o } = i, l = [], a = !!e, c = e || s.tr, u = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(c), l.every((f) => f === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([f, h]) => [f, (...m) => {
        const g = this.buildProps(c, t), y = h(...m)(g);
        return l.push(y), d;
      }])),
      run: u
    };
    return d;
  }
  createCan(e) {
    const { rawCommands: t, state: r } = this, i = !1, s = e || r.tr, o = this.buildProps(s, i);
    return {
      ...Object.fromEntries(Object.entries(t).map(([a, c]) => [a, (...u) => c(...u)({ ...o, dispatch: void 0 })])),
      chain: () => this.createChain(s, i)
    };
  }
  buildProps(e, t = !0) {
    const { rawCommands: r, editor: i, state: s } = this, { view: o } = i, l = {
      tr: e,
      editor: i,
      view: o,
      state: qs({
        state: s,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([a, c]) => [a, (...u) => c(...u)(l)]));
      }
    };
    return l;
  }
}
class jg {
  constructor() {
    this.callbacks = {};
  }
  on(e, t) {
    return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
  }
  emit(e, ...t) {
    const r = this.callbacks[e];
    return r && r.forEach((i) => i.apply(this, t)), this;
  }
  off(e, t) {
    const r = this.callbacks[e];
    return r && (t ? this.callbacks[e] = r.filter((i) => i !== t) : delete this.callbacks[e]), this;
  }
  once(e, t) {
    const r = (...i) => {
      this.off(e, r), t.apply(this, i);
    };
    return this.on(e, r);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
function L(n, e, t) {
  return n.config[e] === void 0 && n.parent ? L(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? L(n.parent, e, t) : null
  }) : n.config[e];
}
function Gs(n) {
  const e = n.filter((i) => i.type === "extension"), t = n.filter((i) => i.type === "node"), r = n.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function cf(n) {
  const e = [], { nodeExtensions: t, markExtensions: r } = Gs(n), i = [...t, ...r], s = {
    default: null,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return n.forEach((o) => {
    const l = {
      name: o.name,
      options: o.options,
      storage: o.storage,
      extensions: i
    }, a = L(o, "addGlobalAttributes", l);
    if (!a)
      return;
    a().forEach((u) => {
      u.types.forEach((d) => {
        Object.entries(u.attributes).forEach(([f, h]) => {
          e.push({
            type: d,
            name: f,
            attribute: {
              ...s,
              ...h
            }
          });
        });
      });
    });
  }), i.forEach((o) => {
    const l = {
      name: o.name,
      options: o.options,
      storage: o.storage
    }, a = L(o, "addAttributes", l);
    if (!a)
      return;
    const c = a();
    Object.entries(c).forEach(([u, d]) => {
      const f = {
        ...s,
        ...d
      };
      typeof (f == null ? void 0 : f.default) == "function" && (f.default = f.default()), f != null && f.isRequired && (f == null ? void 0 : f.default) === void 0 && delete f.default, e.push({
        type: o.name,
        name: u,
        attribute: f
      });
    });
  }), e;
}
function ge(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
function Q(...n) {
  return n.filter((e) => !!e).reduce((e, t) => {
    const r = { ...e };
    return Object.entries(t).forEach(([i, s]) => {
      if (!r[i]) {
        r[i] = s;
        return;
      }
      if (i === "class") {
        const l = s ? String(s).split(" ") : [], a = r[i] ? r[i].split(" ") : [], c = l.filter((u) => !a.includes(u));
        r[i] = [...a, ...c].join(" ");
      } else if (i === "style") {
        const l = s ? s.split(";").map((u) => u.trim()).filter(Boolean) : [], a = r[i] ? r[i].split(";").map((u) => u.trim()).filter(Boolean) : [], c = /* @__PURE__ */ new Map();
        a.forEach((u) => {
          const [d, f] = u.split(":").map((h) => h.trim());
          c.set(d, f);
        }), l.forEach((u) => {
          const [d, f] = u.split(":").map((h) => h.trim());
          c.set(d, f);
        }), r[i] = Array.from(c.entries()).map(([u, d]) => `${u}: ${d}`).join("; ");
      } else
        r[i] = s;
    }), r;
  }, {});
}
function nl(n, e) {
  return e.filter((t) => t.type === n.type.name).filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : {
    [t.name]: n.attrs[t.name]
  }).reduce((t, r) => Q(t, r), {});
}
function uf(n) {
  return typeof n == "function";
}
function W(n, e = void 0, ...t) {
  return uf(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Wg(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function Ug(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function Sc(n, e) {
  return "style" in n ? n : {
    ...n,
    getAttrs: (t) => {
      const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (r === !1)
        return !1;
      const i = e.reduce((s, o) => {
        const l = o.attribute.parseHTML ? o.attribute.parseHTML(t) : Ug(t.getAttribute(o.name));
        return l == null ? s : {
          ...s,
          [o.name]: l
        };
      }, {});
      return { ...r, ...i };
    }
  };
}
function Mc(n) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(n).filter(([e, t]) => e === "attrs" && Wg(t) ? !1 : t != null)
  );
}
function Kg(n, e) {
  var t;
  const r = cf(n), { nodeExtensions: i, markExtensions: s } = Gs(n), o = (t = i.find((c) => L(c, "topNode"))) === null || t === void 0 ? void 0 : t.name, l = Object.fromEntries(i.map((c) => {
    const u = r.filter((y) => y.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((y, w) => {
      const C = L(w, "extendNodeSchema", d);
      return {
        ...y,
        ...C ? C(c) : {}
      };
    }, {}), h = Mc({
      ...f,
      content: W(L(c, "content", d)),
      marks: W(L(c, "marks", d)),
      group: W(L(c, "group", d)),
      inline: W(L(c, "inline", d)),
      atom: W(L(c, "atom", d)),
      selectable: W(L(c, "selectable", d)),
      draggable: W(L(c, "draggable", d)),
      code: W(L(c, "code", d)),
      whitespace: W(L(c, "whitespace", d)),
      linebreakReplacement: W(L(c, "linebreakReplacement", d)),
      defining: W(L(c, "defining", d)),
      isolating: W(L(c, "isolating", d)),
      attrs: Object.fromEntries(u.map((y) => {
        var w;
        return [y.name, { default: (w = y == null ? void 0 : y.attribute) === null || w === void 0 ? void 0 : w.default }];
      }))
    }), p = W(L(c, "parseHTML", d));
    p && (h.parseDOM = p.map((y) => Sc(y, u)));
    const m = L(c, "renderHTML", d);
    m && (h.toDOM = (y) => m({
      node: y,
      HTMLAttributes: nl(y, u)
    }));
    const g = L(c, "renderText", d);
    return g && (h.toText = g), [c.name, h];
  })), a = Object.fromEntries(s.map((c) => {
    const u = r.filter((g) => g.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((g, y) => {
      const w = L(y, "extendMarkSchema", d);
      return {
        ...g,
        ...w ? w(c) : {}
      };
    }, {}), h = Mc({
      ...f,
      inclusive: W(L(c, "inclusive", d)),
      excludes: W(L(c, "excludes", d)),
      group: W(L(c, "group", d)),
      spanning: W(L(c, "spanning", d)),
      code: W(L(c, "code", d)),
      attrs: Object.fromEntries(u.map((g) => {
        var y;
        return [g.name, { default: (y = g == null ? void 0 : g.attribute) === null || y === void 0 ? void 0 : y.default }];
      }))
    }), p = W(L(c, "parseHTML", d));
    p && (h.parseDOM = p.map((g) => Sc(g, u)));
    const m = L(c, "renderHTML", d);
    return m && (h.toDOM = (g) => m({
      mark: g,
      HTMLAttributes: nl(g, u)
    })), [c.name, h];
  }));
  return new Yu({
    topNode: o,
    nodes: l,
    marks: a
  });
}
function xo(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function Ac(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
function Xl(n, e) {
  const t = Pn.fromSchema(e).serializeFragment(n), i = document.implementation.createHTMLDocument().createElement("div");
  return i.appendChild(t), i.innerHTML;
}
const qg = (n, e = 500) => {
  let t = "";
  const r = n.parentOffset;
  return n.parent.nodesBetween(Math.max(0, r - e), r, (i, s, o, l) => {
    var a, c;
    const u = ((c = (a = i.type.spec).toText) === null || c === void 0 ? void 0 : c.call(a, {
      node: i,
      pos: s,
      parent: o,
      index: l
    })) || i.textContent || "%leaf%";
    t += i.isAtom && !i.isText ? u : u.slice(0, Math.max(0, r - s));
  }), t;
};
function Ql(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
class Ys {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Jg = (n, e) => {
  if (Ql(e))
    return e.exec(n);
  const t = e(n);
  if (!t)
    return null;
  const r = [t.text];
  return r.index = t.index, r.input = n, r.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(t.replaceWith)), r;
};
function xi(n) {
  var e;
  const { editor: t, from: r, to: i, text: s, rules: o, plugin: l } = n, { view: a } = t;
  if (a.composing)
    return !1;
  const c = a.state.doc.resolve(r);
  if (
    // check for code node
    c.parent.type.spec.code || !((e = c.nodeBefore || c.nodeAfter) === null || e === void 0) && e.marks.find((f) => f.type.spec.code)
  )
    return !1;
  let u = !1;
  const d = qg(c) + s;
  return o.forEach((f) => {
    if (u)
      return;
    const h = Jg(d, f.find);
    if (!h)
      return;
    const p = a.state.tr, m = qs({
      state: a.state,
      transaction: p
    }), g = {
      from: r - (h[0].length - s.length),
      to: i
    }, { commands: y, chain: w, can: C } = new Js({
      editor: t,
      state: m
    });
    f.handler({
      state: m,
      range: g,
      match: h,
      commands: y,
      chain: w,
      can: C
    }) === null || !p.steps.length || (p.setMeta(l, {
      transform: p,
      from: r,
      to: i,
      text: s
    }), a.dispatch(p), u = !0);
  }), u;
}
function Gg(n) {
  const { editor: e, rules: t } = n, r = new le({
    state: {
      init() {
        return null;
      },
      apply(i, s, o) {
        const l = i.getMeta(r);
        if (l)
          return l;
        const a = i.getMeta("applyInputRules");
        return !!a && setTimeout(() => {
          let { text: u } = a;
          typeof u == "string" ? u = u : u = Xl(A.from(u), o.schema);
          const { from: d } = a, f = d + u.length;
          xi({
            editor: e,
            from: d,
            to: f,
            text: u,
            rules: t,
            plugin: r
          });
        }), i.selectionSet || i.docChanged ? null : s;
      }
    },
    props: {
      handleTextInput(i, s, o, l) {
        return xi({
          editor: e,
          from: s,
          to: o,
          text: l,
          rules: t,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (i) => (setTimeout(() => {
          const { $cursor: s } = i.state.selection;
          s && xi({
            editor: e,
            from: s.pos,
            to: s.pos,
            text: "",
            rules: t,
            plugin: r
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(i, s) {
        if (s.key !== "Enter")
          return !1;
        const { $cursor: o } = i.state.selection;
        return o ? xi({
          editor: e,
          from: o.pos,
          to: o.pos,
          text: `
`,
          rules: t,
          plugin: r
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return r;
}
function Yg(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Si(n) {
  return Yg(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Xs(n, e) {
  const t = { ...n };
  return Si(n) && Si(e) && Object.keys(e).forEach((r) => {
    Si(e[r]) && Si(n[r]) ? t[r] = Xs(n[r], e[r]) : t[r] = e[r];
  }), t;
}
class lt {
  constructor(e = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = W(L(this, "addOptions", {
      name: this.name
    }))), this.storage = W(L(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new lt(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => Xs(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new lt(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = W(L(t, "addOptions", {
      name: t.name
    })), t.storage = W(L(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const o = i.marks();
      if (!!!o.find((c) => (c == null ? void 0 : c.type.name) === t.name))
        return !1;
      const a = o.find((c) => (c == null ? void 0 : c.type.name) === t.name);
      return a && r.removeStoredMark(a), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
}
function Xg(n) {
  return typeof n == "number";
}
class df {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Qg = (n, e, t) => {
  if (Ql(e))
    return [...n.matchAll(e)];
  const r = e(n, t);
  return r ? r.map((i) => {
    const s = [i.text];
    return s.index = i.index, s.input = n, s.data = i.data, i.replaceWith && (i.text.includes(i.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), s.push(i.replaceWith)), s;
  }) : [];
};
function Zg(n) {
  const { editor: e, state: t, from: r, to: i, rule: s, pasteEvent: o, dropEvent: l } = n, { commands: a, chain: c, can: u } = new Js({
    editor: e,
    state: t
  }), d = [];
  return t.doc.nodesBetween(r, i, (h, p) => {
    if (!h.isTextblock || h.type.spec.code)
      return;
    const m = Math.max(r, p), g = Math.min(i, p + h.content.size), y = h.textBetween(m - p, g - p, void 0, "￼");
    Qg(y, s.find, o).forEach((C) => {
      if (C.index === void 0)
        return;
      const b = m + C.index + 1, S = b + C[0].length, k = {
        from: t.tr.mapping.map(b),
        to: t.tr.mapping.map(S)
      }, T = s.handler({
        state: t,
        range: k,
        match: C,
        commands: a,
        chain: c,
        can: u,
        pasteEvent: o,
        dropEvent: l
      });
      d.push(T);
    });
  }), d.every((h) => h !== null);
}
let Mi = null;
const ey = (n) => {
  var e;
  const t = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (e = t.clipboardData) === null || e === void 0 || e.setData("text/html", n), t;
};
function ty(n) {
  const { editor: e, rules: t } = n;
  let r = null, i = !1, s = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, l;
  try {
    l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  } catch {
    l = null;
  }
  const a = ({ state: u, from: d, to: f, rule: h, pasteEvt: p }) => {
    const m = u.tr, g = qs({
      state: u,
      transaction: m
    });
    if (!(!Zg({
      editor: e,
      state: g,
      from: Math.max(d - 1, 0),
      to: f.b - 1,
      rule: h,
      pasteEvent: p,
      dropEvent: l
    }) || !m.steps.length)) {
      try {
        l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
      } catch {
        l = null;
      }
      return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, m;
    }
  };
  return t.map((u) => new le({
    // we register a global drag handler to track the current drag source element
    view(d) {
      const f = (p) => {
        var m;
        r = !((m = d.dom.parentElement) === null || m === void 0) && m.contains(p.target) ? d.dom.parentElement : null, r && (Mi = e);
      }, h = () => {
        Mi && (Mi = null);
      };
      return window.addEventListener("dragstart", f), window.addEventListener("dragend", h), {
        destroy() {
          window.removeEventListener("dragstart", f), window.removeEventListener("dragend", h);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (d, f) => {
          if (s = r === d.dom.parentElement, l = f, !s) {
            const h = Mi;
            h && setTimeout(() => {
              const p = h.state.selection;
              p && h.commands.deleteRange({ from: p.from, to: p.to });
            }, 10);
          }
          return !1;
        },
        paste: (d, f) => {
          var h;
          const p = (h = f.clipboardData) === null || h === void 0 ? void 0 : h.getData("text/html");
          return o = f, i = !!(p != null && p.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (d, f, h) => {
      const p = d[0], m = p.getMeta("uiEvent") === "paste" && !i, g = p.getMeta("uiEvent") === "drop" && !s, y = p.getMeta("applyPasteRules"), w = !!y;
      if (!m && !g && !w)
        return;
      if (w) {
        let { text: S } = y;
        typeof S == "string" ? S = S : S = Xl(A.from(S), h.schema);
        const { from: k } = y, T = k + S.length, M = ey(S);
        return a({
          rule: u,
          state: h,
          from: k,
          to: { b: T },
          pasteEvt: M
        });
      }
      const C = f.doc.content.findDiffStart(h.doc.content), b = f.doc.content.findDiffEnd(h.doc.content);
      if (!(!Xg(C) || !b || C === b.b))
        return a({
          rule: u,
          state: h,
          from: C,
          to: b,
          pasteEvt: o
        });
    }
  }));
}
function ny(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return Array.from(new Set(e));
}
class Qn {
  constructor(e, t) {
    this.splittableMarks = [], this.editor = t, this.extensions = Qn.resolve(e), this.schema = Kg(this.extensions, t), this.setupExtensions();
  }
  /**
   * Returns a flattened and sorted extension list while
   * also checking for duplicated extensions and warns the user.
   * @param extensions An array of Tiptap extensions
   * @returns An flattened and sorted array of Tiptap extensions
   */
  static resolve(e) {
    const t = Qn.sort(Qn.flatten(e)), r = ny(t.map((i) => i.name));
    return r.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${r.map((i) => `'${i}'`).join(", ")}]. This can lead to issues.`), t;
  }
  /**
   * Create a flattened array of extensions by traversing the `addExtensions` field.
   * @param extensions An array of Tiptap extensions
   * @returns A flattened array of Tiptap extensions
   */
  static flatten(e) {
    return e.map((t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage
      }, i = L(t, "addExtensions", r);
      return i ? [t, ...this.flatten(i())] : t;
    }).flat(10);
  }
  /**
   * Sort extensions by priority.
   * @param extensions An array of Tiptap extensions
   * @returns A sorted array of Tiptap extensions by priority
   */
  static sort(e) {
    return e.sort((r, i) => {
      const s = L(r, "priority") || 100, o = L(i, "priority") || 100;
      return s > o ? -1 : s < o ? 1 : 0;
    });
  }
  /**
   * Get all commands from the extensions.
   * @returns An object with all commands where the key is the command name and the value is the command function
   */
  get commands() {
    return this.extensions.reduce((e, t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage,
        editor: this.editor,
        type: xo(t.name, this.schema)
      }, i = L(t, "addCommands", r);
      return i ? {
        ...e,
        ...i()
      } : e;
    }, {});
  }
  /**
   * Get all registered Prosemirror plugins from the extensions.
   * @returns An array of Prosemirror plugins
   */
  get plugins() {
    const { editor: e } = this, t = Qn.sort([...this.extensions].reverse()), r = [], i = [], s = t.map((o) => {
      const l = {
        name: o.name,
        options: o.options,
        storage: o.storage,
        editor: e,
        type: xo(o.name, this.schema)
      }, a = [], c = L(o, "addKeyboardShortcuts", l);
      let u = {};
      if (o.type === "mark" && L(o, "exitable", l) && (u.ArrowRight = () => lt.handleExit({ editor: e, mark: o })), c) {
        const m = Object.fromEntries(Object.entries(c()).map(([g, y]) => [g, () => y({ editor: e })]));
        u = { ...u, ...m };
      }
      const d = Cg(u);
      a.push(d);
      const f = L(o, "addInputRules", l);
      Ac(o, e.options.enableInputRules) && f && r.push(...f());
      const h = L(o, "addPasteRules", l);
      Ac(o, e.options.enablePasteRules) && h && i.push(...h());
      const p = L(o, "addProseMirrorPlugins", l);
      if (p) {
        const m = p();
        a.push(...m);
      }
      return a;
    }).flat();
    return [
      Gg({
        editor: e,
        rules: r
      }),
      ...ty({
        editor: e,
        rules: i
      }),
      ...s
    ];
  }
  /**
   * Get all attributes from the extensions.
   * @returns An array of attributes
   */
  get attributes() {
    return cf(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: e } = this, { nodeExtensions: t } = Gs(this.extensions);
    return Object.fromEntries(t.filter((r) => !!L(r, "addNodeView")).map((r) => {
      const i = this.attributes.filter((a) => a.type === r.name), s = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: e,
        type: ge(r.name, this.schema)
      }, o = L(r, "addNodeView", s);
      if (!o)
        return [];
      const l = (a, c, u, d, f) => {
        const h = nl(a, i);
        return o()({
          // pass-through
          node: a,
          view: c,
          getPos: u,
          decorations: d,
          innerDecorations: f,
          // tiptap-specific
          editor: e,
          extension: r,
          HTMLAttributes: h
        });
      };
      return [r.name, l];
    }));
  }
  /**
   * Go through all extensions, create extension storages & setup marks
   * & bind editor event listener.
   */
  setupExtensions() {
    this.extensions.forEach((e) => {
      var t;
      this.editor.extensionStorage[e.name] = e.storage;
      const r = {
        name: e.name,
        options: e.options,
        storage: e.storage,
        editor: this.editor,
        type: xo(e.name, this.schema)
      };
      e.type === "mark" && (!((t = W(L(e, "keepOnSplit", r))) !== null && t !== void 0) || t) && this.splittableMarks.push(e.name);
      const i = L(e, "onBeforeCreate", r), s = L(e, "onCreate", r), o = L(e, "onUpdate", r), l = L(e, "onSelectionUpdate", r), a = L(e, "onTransaction", r), c = L(e, "onFocus", r), u = L(e, "onBlur", r), d = L(e, "onDestroy", r);
      i && this.editor.on("beforeCreate", i), s && this.editor.on("create", s), o && this.editor.on("update", o), l && this.editor.on("selectionUpdate", l), a && this.editor.on("transaction", a), c && this.editor.on("focus", c), u && this.editor.on("blur", u), d && this.editor.on("destroy", d);
    });
  }
}
class fe {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = W(L(this, "addOptions", {
      name: this.name
    }))), this.storage = W(L(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new fe(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => Xs(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new fe({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = W(L(t, "addOptions", {
      name: t.name
    })), t.storage = W(L(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function ff(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: s = `

`, textSerializers: o = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (a, c, u, d) => {
    var f;
    a.isBlock && c > r && (l += s);
    const h = o == null ? void 0 : o[a.type.name];
    if (h)
      return u && (l += h({
        node: a,
        pos: c,
        parent: u,
        index: d,
        range: e
      })), !1;
    a.isText && (l += (f = a == null ? void 0 : a.text) === null || f === void 0 ? void 0 : f.slice(Math.max(r, c) - c, i - c));
  }), l;
}
function Zl(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
const ry = fe.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new le({
        key: new ue("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, { ranges: s } = i, o = Math.min(...s.map((u) => u.$from.pos)), l = Math.max(...s.map((u) => u.$to.pos)), a = Zl(t);
            return ff(r, { from: o, to: l }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: a
            });
          }
        }
      })
    ];
  }
}), iy = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges());
}), !0), sy = (n = !1) => ({ commands: e }) => e.setContent("", n), oy = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: s, $to: o }) => {
    n.doc.nodesBetween(s.pos, o.pos, (l, a) => {
      if (l.type.isText)
        return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(a)), f = c.resolve(u.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h)
        return;
      const p = hr(h);
      if (l.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, m);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, ly = (n) => (e) => n(e), ay = () => ({ state: n, dispatch: e }) => sf(n, e), cy = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, s = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const o = r.mapping.map(e);
  return r.insert(o, s.content), r.setSelection(new F(r.doc.resolve(o - 1))), !0;
}, uy = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const i = n.selection.$anchor;
  for (let s = i.depth; s > 0; s -= 1)
    if (i.node(s).type === r.type) {
      if (e) {
        const l = i.before(s), a = i.after(s);
        n.delete(l, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, dy = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = ge(n, t.schema), s = e.selection.$anchor;
  for (let o = s.depth; o > 0; o -= 1)
    if (s.node(o).type === i) {
      if (r) {
        const a = s.before(o), c = s.after(o);
        e.delete(a, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, fy = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, hy = () => ({ state: n, dispatch: e }) => Kl(n, e), py = () => ({ commands: n }) => n.keyboardShortcut("Enter"), my = () => ({ state: n, dispatch: e }) => Tg(n, e);
function is(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Ql(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function hf(n, e, t = {}) {
  return n.find((r) => r.type === e && is(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])),
    t
  ));
}
function Ec(n, e, t = {}) {
  return !!hf(n, e, t);
}
function ea(n, e, t) {
  var r;
  if (!n || !e)
    return;
  let i = n.parent.childAfter(n.parentOffset);
  if ((!i.node || !i.node.marks.some((u) => u.type === e)) && (i = n.parent.childBefore(n.parentOffset)), !i.node || !i.node.marks.some((u) => u.type === e) || (t = t || ((r = i.node.marks[0]) === null || r === void 0 ? void 0 : r.attrs), !hf([...i.node.marks], e, t)))
    return;
  let o = i.index, l = n.start() + i.offset, a = o + 1, c = l + i.node.nodeSize;
  for (; o > 0 && Ec([...n.parent.child(o - 1).marks], e, t); )
    o -= 1, l -= n.parent.child(o).nodeSize;
  for (; a < n.parent.childCount && Ec([...n.parent.child(a).marks], e, t); )
    c += n.parent.child(a).nodeSize, a += 1;
  return {
    from: l,
    to: c
  };
}
function ln(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const gy = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const s = ln(n, r.schema), { doc: o, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const d = ea(a, s, e);
    if (d && d.from <= c && d.to >= u) {
      const f = F.create(o, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, yy = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function ta(n) {
  return n instanceof F;
}
function Lt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function pf(n, e = null) {
  if (!e)
    return null;
  const t = $.atStart(n), r = $.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const i = t.from, s = r.to;
  return e === "all" ? F.create(n, Lt(0, i, s), Lt(n.content.size, i, s)) : F.create(n, Lt(e, i, s), Lt(e, i, s));
}
function mf() {
  return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function Qs() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const by = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: s }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const o = () => {
    (Qs() || mf()) && r.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && n === null || n === !1)
    return !0;
  if (s && n === null && !ta(t.state.selection))
    return o(), !0;
  const l = pf(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return s && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, vy = (n, e) => (t) => n.every((r, i) => e(r, { ...t, index: i })), wy = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e), gf = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && gf(r);
  }
  return n;
};
function Ai(n) {
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return gf(t);
}
function Jr(n, e, t) {
  if (n instanceof Qt || n instanceof A)
    return n;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const r = typeof n == "object" && n !== null, i = typeof n == "string";
  if (r)
    try {
      if (Array.isArray(n) && n.length > 0)
        return A.fromArray(n.map((l) => e.nodeFromJSON(l)));
      const o = e.nodeFromJSON(n);
      return t.errorOnInvalidContent && o.check(), o;
    } catch (s) {
      if (t.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: s });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", s), Jr("", e, t);
    }
  if (i) {
    if (t.errorOnInvalidContent) {
      let o = !1, l = "";
      const a = new Yu({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: e.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (c) => (o = !0, l = typeof c == "string" ? c : c.outerHTML, null)
              }
            ]
          }
        })
      });
      if (t.slice ? Zt.fromSchema(a).parseSlice(Ai(n), t.parseOptions) : Zt.fromSchema(a).parse(Ai(n), t.parseOptions), t.errorOnInvalidContent && o)
        throw new Error("[tiptap error]: Invalid HTML content", { cause: new Error(`Invalid element found: ${l}`) });
    }
    const s = Zt.fromSchema(e);
    return t.slice ? s.parseSlice(Ai(n), t.parseOptions).content : s.parse(Ai(n), t.parseOptions);
  }
  return Jr("", e, t);
}
function ky(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const i = n.steps[r];
  if (!(i instanceof he || i instanceof pe))
    return;
  const s = n.mapping.maps[r];
  let o = 0;
  s.forEach((l, a, c, u) => {
    o === 0 && (o = u);
  }), n.setSelection($.near(n.doc.resolve(o), t));
}
const Cy = (n) => !("type" in n), xy = (n, e, t) => ({ tr: r, dispatch: i, editor: s }) => {
  var o;
  if (i) {
    t = {
      parseOptions: s.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    const a = (g) => {
      s.emit("contentError", {
        editor: s,
        error: g,
        disableCollaboration: () => {
          s.storage.collaboration && (s.storage.collaboration.isDisabled = !0);
        }
      });
    }, c = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !s.options.enableContentCheck && s.options.emitContentError)
      try {
        Jr(e, s.schema, {
          parseOptions: c,
          errorOnInvalidContent: !0
        });
      } catch (g) {
        a(g);
      }
    try {
      l = Jr(e, s.schema, {
        parseOptions: c,
        errorOnInvalidContent: (o = t.errorOnInvalidContent) !== null && o !== void 0 ? o : s.options.enableContentCheck
      });
    } catch (g) {
      return a(g), !1;
    }
    let { from: u, to: d } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, f = !0, h = !0;
    if ((Cy(l) ? l : [l]).forEach((g) => {
      g.check(), f = f ? g.isText && g.marks.length === 0 : !1, h = h ? g.isBlock : !1;
    }), u === d && h) {
      const { parent: g } = r.doc.resolve(u);
      g.isTextblock && !g.type.spec.code && !g.childCount && (u -= 1, d += 1);
    }
    let m;
    if (f) {
      if (Array.isArray(e))
        m = e.map((g) => g.text || "").join("");
      else if (e instanceof A) {
        let g = "";
        e.forEach((y) => {
          y.text && (g += y.text);
        }), m = g;
      } else typeof e == "object" && e && e.text ? m = e.text : m = e;
      r.insertText(m, u, d);
    } else
      m = l, r.replaceWith(u, d, m);
    t.updateSelection && ky(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", { from: u, text: m }), t.applyPasteRules && r.setMeta("applyPasteRules", { from: u, text: m });
  }
  return !0;
}, Sy = () => ({ state: n, dispatch: e }) => Mg(n, e), My = () => ({ state: n, dispatch: e }) => Ag(n, e), Ay = () => ({ state: n, dispatch: e }) => Xd(n, e), Ey = () => ({ state: n, dispatch: e }) => tf(n, e), Ty = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = $s(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Oy = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = $s(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Ny = () => ({ state: n, dispatch: e }) => xg(n, e), Dy = () => ({ state: n, dispatch: e }) => Sg(n, e);
function yf() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Ly(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      s = !0;
    else if (/^mod$/i.test(a))
      Qs() || yf() ? o = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), o && (t = `Meta-${t}`), s && (t = `Shift-${t}`), t;
}
const Ry = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const s = Ly(n).split(/-(?!$)/), o = s.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), l = new KeyboardEvent("keydown", {
    key: o === "Space" ? " " : o,
    altKey: s.includes("Alt"),
    ctrlKey: s.includes("Ctrl"),
    metaKey: s.includes("Meta"),
    shiftKey: s.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, l));
  });
  return a == null || a.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && i && r.maybeStep(u);
  }), !0;
};
function Gr(n, e, t = {}) {
  const { from: r, to: i, empty: s } = n.selection, o = e ? ge(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (d, f) => {
    if (d.isText)
      return;
    const h = Math.max(r, f), p = Math.min(i, f + d.nodeSize);
    l.push({
      node: d,
      from: h,
      to: p
    });
  });
  const a = i - r, c = l.filter((d) => o ? o.name === d.node.type.name : !0).filter((d) => is(d.node.attrs, t, { strict: !1 }));
  return s ? !!c.length : c.reduce((d, f) => d + f.to - f.from, 0) >= a;
}
const Iy = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = ge(n, t.schema);
  return Gr(t, i, e) ? Eg(t, r) : !1;
}, Py = () => ({ state: n, dispatch: e }) => of(n, e), By = (n) => ({ state: e, dispatch: t }) => {
  const r = ge(n, e.schema);
  return zg(r)(e, t);
}, Hy = () => ({ state: n, dispatch: e }) => rf(n, e);
function Zs(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Tc(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Fy = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = Zs(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (s = ge(n, r.schema)), l === "mark" && (o = ln(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (c, u) => {
      s && s === c.type && t.setNodeMarkup(u, void 0, Tc(c.attrs, e)), o && c.marks.length && c.marks.forEach((d) => {
        o === d.type && t.addMark(u, u + c.nodeSize, o.create(Tc(d.attrs, e)));
      });
    });
  }), !0) : !1;
}, zy = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Vy = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new je(n.doc);
    n.setSelection(t);
  }
  return !0;
}, $y = () => ({ state: n, dispatch: e }) => Zd(n, e), _y = () => ({ state: n, dispatch: e }) => nf(n, e), jy = () => ({ state: n, dispatch: e }) => Dg(n, e), Wy = () => ({ state: n, dispatch: e }) => Ig(n, e), Uy = () => ({ state: n, dispatch: e }) => Rg(n, e);
function rl(n, e, t = {}, r = {}) {
  return Jr(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Ky = (n, e = !1, t = {}, r = {}) => ({ editor: i, tr: s, dispatch: o, commands: l }) => {
  var a, c;
  const { doc: u } = s;
  if (t.preserveWhitespace !== "full") {
    const d = rl(n, i.schema, t, {
      errorOnInvalidContent: (a = r.errorOnInvalidContent) !== null && a !== void 0 ? a : i.options.enableContentCheck
    });
    return o && s.replaceWith(0, u.content.size, d).setMeta("preventUpdate", !e), !0;
  }
  return o && s.setMeta("preventUpdate", !e), l.insertContentAt({ from: 0, to: u.content.size }, n, {
    parseOptions: t,
    errorOnInvalidContent: (c = r.errorOnInvalidContent) !== null && c !== void 0 ? c : i.options.enableContentCheck
  });
};
function bf(n, e) {
  const t = ln(e, n.schema), { from: r, to: i, empty: s } = n.selection, o = [];
  s ? (n.storedMarks && o.push(...n.storedMarks), o.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    o.push(...a.marks);
  });
  const l = o.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function qy(n, e) {
  const t = new Pl(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Jy(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function Gy(n, e, t) {
  const r = [];
  return n.nodesBetween(e.from, e.to, (i, s) => {
    t(i) && r.push({
      node: i,
      pos: s
    });
  }), r;
}
function vf(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: r
      };
  }
}
function na(n) {
  return (e) => vf(e.$from, n);
}
function wf(n, e) {
  const t = {
    from: 0,
    to: n.content.size
  };
  return ff(n, t, e);
}
function Yy(n, e) {
  const t = ge(e, n.schema), { from: r, to: i } = n.selection, s = [];
  n.doc.nodesBetween(r, i, (l) => {
    s.push(l);
  });
  const o = s.reverse().find((l) => l.type.name === t.name);
  return o ? { ...o.attrs } : {};
}
function kf(n, e) {
  const t = Zs(typeof e == "string" ? e : e.name, n.schema);
  return t === "node" ? Yy(n, e) : t === "mark" ? bf(n, e) : {};
}
function Xy(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Qy(n) {
  const e = Xy(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((s, o) => o !== r).some((s) => t.oldRange.from >= s.oldRange.from && t.oldRange.to <= s.oldRange.to && t.newRange.from >= s.newRange.from && t.newRange.to <= s.newRange.to));
}
function Zy(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((i, s) => {
    const o = [];
    if (i.ranges.length)
      i.forEach((l, a) => {
        o.push({ from: l, to: a });
      });
    else {
      const { from: l, to: a } = t[s];
      if (l === void 0 || a === void 0)
        return;
      o.push({ from: l, to: a });
    }
    o.forEach(({ from: l, to: a }) => {
      const c = e.slice(s).map(l, -1), u = e.slice(s).map(a), d = e.invert().map(c, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), Qy(r);
}
function ra(n, e, t) {
  const r = [];
  return n === e ? t.resolve(n).marks().forEach((i) => {
    const s = t.resolve(n), o = ea(s, i.type);
    o && r.push({
      mark: i,
      ...o
    });
  }) : t.nodesBetween(n, e, (i, s) => {
    !i || (i == null ? void 0 : i.nodeSize) === void 0 || r.push(...i.marks.map((o) => ({
      from: s,
      to: s + i.nodeSize,
      mark: o
    })));
  }), r;
}
function Vi(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((s) => s.type === e && s.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function il(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, s = e ? ln(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((d) => s ? s.name === d.type.name : !0).find((d) => is(d.attrs, t, { strict: !1 }));
  let o = 0;
  const l = [];
  if (i.forEach(({ $from: d, $to: f }) => {
    const h = d.pos, p = f.pos;
    n.doc.nodesBetween(h, p, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const y = Math.max(h, g), w = Math.min(p, g + m.nodeSize), C = w - y;
      o += C, l.push(...m.marks.map((b) => ({
        mark: b,
        from: y,
        to: w
      })));
    });
  }), o === 0)
    return !1;
  const a = l.filter((d) => s ? s.name === d.mark.type.name : !0).filter((d) => is(d.mark.attrs, t, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), c = l.filter((d) => s ? d.mark.type !== s && d.mark.type.excludes(s) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= o;
}
function e0(n, e, t = {}) {
  if (!e)
    return Gr(n, null, t) || il(n, null, t);
  const r = Zs(e, n.schema);
  return r === "node" ? Gr(n, e, t) : r === "mark" ? il(n, e, t) : !1;
}
function Oc(n, e) {
  const { nodeExtensions: t } = Gs(e), r = t.find((o) => o.name === n);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, s = W(L(r, "group", i));
  return typeof s != "string" ? !1 : s.split(" ").includes("list");
}
function eo(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
  var r;
  if (t) {
    if (n.type.name === "hardBreak")
      return !0;
    if (n.isText)
      return /^\s*$/m.test((r = n.text) !== null && r !== void 0 ? r : "");
  }
  if (n.isText)
    return !n.text;
  if (n.isAtom || n.isLeaf)
    return !1;
  if (n.content.childCount === 0)
    return !0;
  if (e) {
    let i = !0;
    return n.content.forEach((s) => {
      i !== !1 && (eo(s, { ignoreWhitespace: t, checkChildren: e }) || (i = !1));
    }), i;
  }
  return !1;
}
function t0(n) {
  return n instanceof B;
}
function Cf(n, e, t) {
  const i = n.state.doc.content.size, s = Lt(e, 0, i), o = Lt(t, 0, i), l = n.coordsAtPos(s), a = n.coordsAtPos(o, -1), c = Math.min(l.top, a.top), u = Math.max(l.bottom, a.bottom), d = Math.min(l.left, a.left), f = Math.max(l.right, a.right), h = f - d, p = u - c, y = {
    top: c,
    bottom: u,
    left: d,
    right: f,
    width: h,
    height: p,
    x: d,
    y: c
  };
  return {
    ...y,
    toJSON: () => y
  };
}
function n0(n, e, t) {
  var r;
  const { selection: i } = e;
  let s = null;
  if (ta(i) && (s = i.$cursor), s) {
    const l = (r = n.storedMarks) !== null && r !== void 0 ? r : s.marks();
    return !!t.isInSet(l) || !l.some((a) => a.type.excludes(t));
  }
  const { ranges: o } = i;
  return o.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (u, d, f) => {
      if (c)
        return !1;
      if (u.isInline) {
        const h = !f || f.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
const r0 = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: s } = t, { empty: o, ranges: l } = s, a = ln(n, r.schema);
  if (i)
    if (o) {
      const c = bf(r, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else
      l.forEach((c) => {
        const u = c.$from.pos, d = c.$to.pos;
        r.doc.nodesBetween(u, d, (f, h) => {
          const p = Math.max(h, u), m = Math.min(h + f.nodeSize, d);
          f.marks.find((y) => y.type === a) ? f.marks.forEach((y) => {
            a === y.type && t.addMark(p, m, a.create({
              ...y.attrs,
              ...e
            }));
          }) : t.addMark(p, m, a.create(e));
        });
      });
  return n0(r, t, a);
}, i0 = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), s0 = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const s = ge(n, t.schema);
  let o;
  return t.selection.$anchor.sameParent(t.selection.$head) && (o = t.selection.$anchor.parent.attrs), s.isTextblock ? i().command(({ commands: l }) => xc(s, { ...o, ...e })(t) ? !0 : l.clearNodes()).command(({ state: l }) => xc(s, { ...o, ...e })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, o0 = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = Lt(n, 0, r.content.size), s = B.create(r, i);
    e.setSelection(s);
  }
  return !0;
}, l0 = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: s } = typeof n == "number" ? { from: n, to: n } : n, o = F.atStart(r).from, l = F.atEnd(r).to, a = Lt(i, o, l), c = Lt(s, o, l), u = F.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, a0 = (n) => ({ state: e, dispatch: t }) => {
  const r = ge(n, e.schema);
  return _g(r)(e, t);
};
function Nc(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const c0 = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: s, doc: o } = e, { $from: l, $to: a } = s, c = i.extensionManager.attributes, u = Vi(c, l.node().type.name, l.node().attrs);
  if (s instanceof B && s.node.isBlock)
    return !l.parentOffset || !Rt(o, l.pos) ? !1 : (r && (n && Nc(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  const d = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : Jy(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0, p = Rt(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && Rt(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0), r) {
    if (p && (s instanceof F && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const m = e.mapping.map(l.before()), g = e.doc.resolve(m);
      l.node(-1).canReplaceWith(g.index(), g.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && Nc(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, u0 = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: s }) => {
  var o;
  const l = ge(n, r.schema), { $from: a, $to: c } = r.selection, u = r.selection.node;
  if (u && u.isBlock || a.depth < 2 || !a.sameParent(c))
    return !1;
  const d = a.node(-1);
  if (d.type !== l)
    return !1;
  const f = s.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== l || a.index(-2) !== a.node(-2).childCount - 1)
      return !1;
    if (i) {
      let y = A.empty;
      const w = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let M = a.depth - w; M >= a.depth - 3; M -= 1)
        y = A.from(a.node(M).copy(y));
      const C = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3, b = {
        ...Vi(f, a.node().type.name, a.node().attrs),
        ...e
      }, S = ((o = l.contentMatch.defaultType) === null || o === void 0 ? void 0 : o.createAndFill(b)) || void 0;
      y = y.append(A.from(l.createAndFill(null, S) || void 0));
      const k = a.before(a.depth - (w - 1));
      t.replace(k, a.after(-C), new O(y, 4 - w, 0));
      let T = -1;
      t.doc.nodesBetween(k, t.doc.content.size, (M, I) => {
        if (T > -1)
          return !1;
        M.isTextblock && M.content.size === 0 && (T = I + 1);
      }), T > -1 && t.setSelection(F.near(t.doc.resolve(T))), t.scrollIntoView();
    }
    return !0;
  }
  const h = c.pos === a.end() ? d.contentMatchAt(0).defaultType : null, p = {
    ...Vi(f, d.type.name, d.attrs),
    ...e
  }, m = {
    ...Vi(f, a.node().type.name, a.node().attrs),
    ...e
  };
  t.delete(a.pos, c.pos);
  const g = h ? [
    { type: l, attrs: p },
    { type: h, attrs: m }
  ] : [{ type: l, attrs: p }];
  if (!Rt(t.doc, a.pos, 2))
    return !1;
  if (i) {
    const { selection: y, storedMarks: w } = r, { splittableMarks: C } = s.extensionManager, b = w || y.$to.parentOffset && y.$from.marks();
    if (t.split(a.pos, 2, g).scrollIntoView(), !b || !i)
      return !0;
    const S = b.filter((k) => C.includes(k.type.name));
    t.ensureMarks(S);
  }
  return !0;
}, So = (n, e) => {
  const t = na((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && sn(n.doc, t.pos) && n.join(t.pos), !0;
}, Mo = (n, e) => {
  const t = na((o) => o.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && sn(n.doc, r) && n.join(r), !0;
}, d0 = (n, e, t, r = {}) => ({ editor: i, tr: s, state: o, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = ge(n, o.schema), p = ge(e, o.schema), { selection: m, storedMarks: g } = o, { $from: y, $to: w } = m, C = y.blockRange(w), b = g || m.$to.parentOffset && m.$from.marks();
  if (!C)
    return !1;
  const S = na((k) => Oc(k.type.name, d))(m);
  if (C.depth >= 1 && S && C.depth - S.depth <= 1) {
    if (S.node.type === h)
      return c.liftListItem(p);
    if (Oc(S.node.type.name, d) && h.validContent(S.node.content) && l)
      return a().command(() => (s.setNodeMarkup(S.pos, h), !0)).command(() => So(s, h)).command(() => Mo(s, h)).run();
  }
  return !t || !b || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => So(s, h)).command(() => Mo(s, h)).run() : a().command(() => {
    const k = u().wrapInList(h, r), T = b.filter((M) => f.includes(M.type.name));
    return s.ensureMarks(T), k ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => So(s, h)).command(() => Mo(s, h)).run();
}, f0 = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: s = !1 } = t, o = ln(n, r.schema);
  return il(r, o, e) ? i.unsetMark(o, { extendEmptyMarkRange: s }) : i.setMark(o, e);
}, h0 = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const s = ge(n, r.schema), o = ge(e, r.schema), l = Gr(r, s, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(o, a) : i.setNode(s, { ...a, ...t });
}, p0 = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = ge(n, t.schema);
  return Gr(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, m0 = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let s;
    if (i.spec.isInputRules && (s = i.getState(n))) {
      if (e) {
        const o = n.tr, l = s.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1)
          o.step(l.steps[a].invert(l.docs[a]));
        if (s.text) {
          const a = o.doc.resolve(s.from).marks();
          o.replaceWith(s.from, s.to, n.schema.text(s.text, a));
        } else
          o.delete(s.from, s.to);
      }
      return !0;
    }
  }
  return !1;
}, g0 = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, { empty: r, ranges: i } = t;
  return r || e && i.forEach((s) => {
    n.removeMark(s.$from.pos, s.$to.pos);
  }), !0;
}, y0 = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  var s;
  const { extendEmptyMarkRange: o = !1 } = e, { selection: l } = t, a = ln(n, r.schema), { $from: c, empty: u, ranges: d } = l;
  if (!i)
    return !0;
  if (u && o) {
    let { from: f, to: h } = l;
    const p = (s = c.marks().find((g) => g.type === a)) === null || s === void 0 ? void 0 : s.attrs, m = ea(c, a, p);
    m && (f = m.from, h = m.to), t.removeMark(f, h, a);
  } else
    d.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, a);
    });
  return t.removeStoredMark(a), !0;
}, b0 = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = Zs(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (s = ge(n, r.schema)), l === "mark" && (o = ln(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    const c = a.$from.pos, u = a.$to.pos;
    let d, f, h, p;
    t.selection.empty ? r.doc.nodesBetween(c, u, (m, g) => {
      s && s === m.type && (h = Math.max(g, c), p = Math.min(g + m.nodeSize, u), d = g, f = m);
    }) : r.doc.nodesBetween(c, u, (m, g) => {
      g < c && s && s === m.type && (h = Math.max(g, c), p = Math.min(g + m.nodeSize, u), d = g, f = m), g >= c && g <= u && (s && s === m.type && t.setNodeMarkup(g, void 0, {
        ...m.attrs,
        ...e
      }), o && m.marks.length && m.marks.forEach((y) => {
        if (o === y.type) {
          const w = Math.max(g, c), C = Math.min(g + m.nodeSize, u);
          t.addMark(w, C, o.create({
            ...y.attrs,
            ...e
          }));
        }
      }));
    }), f && (d !== void 0 && t.setNodeMarkup(d, void 0, {
      ...f.attrs,
      ...e
    }), o && f.marks.length && f.marks.forEach((m) => {
      o === m.type && t.addMark(h, p, o.create({
        ...m.attrs,
        ...e
      }));
    }));
  }), !0) : !1;
}, v0 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = ge(n, t.schema);
  return Pg(i, e)(t, r);
}, w0 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = ge(n, t.schema);
  return Bg(i, e)(t, r);
};
var k0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: iy,
  clearContent: sy,
  clearNodes: oy,
  command: ly,
  createParagraphNear: ay,
  cut: cy,
  deleteCurrentNode: uy,
  deleteNode: dy,
  deleteRange: fy,
  deleteSelection: hy,
  enter: py,
  exitCode: my,
  extendMarkRange: gy,
  first: yy,
  focus: by,
  forEach: vy,
  insertContent: wy,
  insertContentAt: xy,
  joinBackward: Ay,
  joinDown: My,
  joinForward: Ey,
  joinItemBackward: Ty,
  joinItemForward: Oy,
  joinTextblockBackward: Ny,
  joinTextblockForward: Dy,
  joinUp: Sy,
  keyboardShortcut: Ry,
  lift: Iy,
  liftEmptyBlock: Py,
  liftListItem: By,
  newlineInCode: Hy,
  resetAttributes: Fy,
  scrollIntoView: zy,
  selectAll: Vy,
  selectNodeBackward: $y,
  selectNodeForward: _y,
  selectParentNode: jy,
  selectTextblockEnd: Wy,
  selectTextblockStart: Uy,
  setContent: Ky,
  setMark: r0,
  setMeta: i0,
  setNode: s0,
  setNodeSelection: o0,
  setTextSelection: l0,
  sinkListItem: a0,
  splitBlock: c0,
  splitListItem: u0,
  toggleList: d0,
  toggleMark: f0,
  toggleNode: h0,
  toggleWrap: p0,
  undoInputRule: m0,
  unsetAllMarks: g0,
  unsetMark: y0,
  updateAttributes: b0,
  wrapIn: v0,
  wrapInList: w0
});
const C0 = fe.create({
  name: "commands",
  addCommands() {
    return {
      ...k0
    };
  }
}), x0 = fe.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new le({
        key: new ue("tiptapDrop"),
        props: {
          handleDrop: (n, e, t, r) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: e,
              slice: t,
              moved: r
            });
          }
        }
      })
    ];
  }
}), S0 = fe.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new le({
        key: new ue("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), M0 = new ue("focusEvents"), A0 = fe.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new le({
        key: M0,
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              n.isFocused = !0;
              const r = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, t) => {
              n.isFocused = !1;
              const r = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), E0 = fe.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: o }) => [
      () => o.undoInputRule(),
      // maybe convert first text block node to default node
      () => o.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: d } = a, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, m = p.parent.type.spec.isolating, g = d.pos - d.parentOffset, y = m && p.parent.childCount === 1 ? g === d.pos : $.atStart(c).from === f;
        return !u || !h.type.isTextblock || h.textContent.length || !y || y && d.parent.type.name === "paragraph" ? !1 : o.clearNodes();
      }),
      () => o.deleteSelection(),
      () => o.joinBackward(),
      () => o.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: o }) => [
      () => o.deleteSelection(),
      () => o.deleteCurrentNode(),
      () => o.joinForward(),
      () => o.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: o }) => [
        () => o.newlineInCode(),
        () => o.createParagraphNear(),
        () => o.liftEmptyBlock(),
        () => o.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = {
      ...r
    }, s = {
      ...r,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Qs() || yf() ? s : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new le({
        key: new ue("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (n.some((m) => m.getMeta("composition")))
            return;
          const r = n.some((m) => m.docChanged) && !e.doc.eq(t.doc), i = n.some((m) => m.getMeta("preventClearDocument"));
          if (!r || i)
            return;
          const { empty: s, from: o, to: l } = e.selection, a = $.atStart(e.doc).from, c = $.atEnd(e.doc).to;
          if (s || !(o === a && l === c) || !eo(t.doc))
            return;
          const f = t.tr, h = qs({
            state: t,
            transaction: f
          }), { commands: p } = new Js({
            editor: this.editor,
            state: h
          });
          if (p.clearNodes(), !!f.steps.length)
            return f;
        }
      })
    ];
  }
}), T0 = fe.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new le({
        key: new ue("tiptapPaste"),
        props: {
          handlePaste: (n, e, t) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: e,
              slice: t
            });
          }
        }
      })
    ];
  }
}), O0 = fe.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new le({
        key: new ue("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
class mn {
  get name() {
    return this.node.type.name;
  }
  constructor(e, t, r = !1, i = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = e, this.editor = t, this.currentNode = i;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) !== null && e !== void 0 ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let t = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      t = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: t, to: r }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0)
      return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), t = this.resolvedPos.doc.resolve(e);
    return new mn(t, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new mn(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new mn(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((t, r) => {
      const i = t.isBlock && !t.isTextblock, s = t.isAtom && !t.isText, o = this.pos + r + (s ? 0 : 1), l = this.resolvedPos.doc.resolve(o);
      if (!i && l.depth <= this.depth)
        return;
      const a = new mn(l, this.editor, i, i ? t : null);
      i && (a.actualDepth = this.depth + 1), e.push(new mn(l, this.editor, i, i ? t : null));
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, t = {}) {
    let r = null, i = this.parent;
    for (; i && !r; ) {
      if (i.node.type.name === e)
        if (Object.keys(t).length > 0) {
          const s = i.node.attrs, o = Object.keys(t);
          for (let l = 0; l < o.length; l += 1) {
            const a = o[l];
            if (s[a] !== t[a])
              break;
          }
        } else
          r = i;
      i = i.parent;
    }
    return r;
  }
  querySelector(e, t = {}) {
    return this.querySelectorAll(e, t, !0)[0] || null;
  }
  querySelectorAll(e, t = {}, r = !1) {
    let i = [];
    if (!this.children || this.children.length === 0)
      return i;
    const s = Object.keys(t);
    return this.children.forEach((o) => {
      r && i.length > 0 || (o.node.type.name === e && s.every((a) => t[a] === o.node.attrs[a]) && i.push(o), !(r && i.length > 0) && (i = i.concat(o.querySelectorAll(e, t, r))));
    }), i;
  }
  setAttribute(e) {
    const { tr: t } = this.editor.state;
    t.setNodeMarkup(this.from, void 0, {
      ...this.node.attrs,
      ...e
    }), this.editor.view.dispatch(t);
  }
}
const N0 = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function D0(n, e, t) {
  const r = document.querySelector("style[data-tiptap-style]");
  if (r !== null)
    return r;
  const i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.setAttribute("data-tiptap-style", ""), i.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(i), i;
}
let L0 = class extends jg {
  constructor(e = {}) {
    super(), this.isFocused = !1, this.isInitialized = !1, this.extensionStorage = {}, this.options = {
      element: document.createElement("div"),
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      enableContentCheck: !1,
      emitContentError: !1,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: t }) => {
        throw t;
      },
      onPaste: () => null,
      onDrop: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("contentError", this.options.onContentError), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: t, slice: r, moved: i }) => this.options.onDrop(t, r, i)), this.on("paste", ({ event: t, slice: r }) => this.options.onPaste(t, r)), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && document && (this.css = D0(N0, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(e = {}) {
    this.options = {
      ...this.options,
      ...e
    }, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(e, t = !0) {
    this.setOptions({ editable: e }), t && this.emit("update", { editor: this, transaction: this.state.tr });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.view.state;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   * @returns The new editor state
   */
  registerPlugin(e, t) {
    const r = uf(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], i = this.state.reconfigure({ plugins: r });
    return this.view.updateState(i), i;
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKeyToRemove The plugins name
   * @returns The new editor state or undefined if the editor is destroyed
   */
  unregisterPlugin(e) {
    if (this.isDestroyed)
      return;
    const t = this.state.plugins;
    let r = t;
    if ([].concat(e).forEach((s) => {
      const o = typeof s == "string" ? `${s}$` : s.key;
      r = r.filter((l) => !l.key.startsWith(o));
    }), t.length === r.length)
      return;
    const i = this.state.reconfigure({
      plugins: r
    });
    return this.view.updateState(i), i;
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    var e, t;
    const i = [...this.options.enableCoreExtensions ? [
      S0,
      ry.configure({
        blockSeparator: (t = (e = this.options.coreExtensionOptions) === null || e === void 0 ? void 0 : e.clipboardTextSerializer) === null || t === void 0 ? void 0 : t.blockSeparator
      }),
      C0,
      A0,
      E0,
      O0,
      x0,
      T0
    ].filter((s) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[s.name] !== !1 : !0) : [], ...this.options.extensions].filter((s) => ["extension", "node", "mark"].includes(s == null ? void 0 : s.type));
    this.extensionManager = new Qn(i, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new Js({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView() {
    var e;
    let t;
    try {
      t = rl(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
    } catch (o) {
      if (!(o instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(o.message))
        throw o;
      this.emit("contentError", {
        editor: this,
        error: o,
        disableCollaboration: () => {
          this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((l) => l.name !== "collaboration"), this.createExtensionManager();
        }
      }), t = rl(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
    }
    const r = pf(t, this.options.autofocus);
    this.view = new Jd(this.options.element, {
      ...this.options.editorProps,
      attributes: {
        // add `role="textbox"` to the editor element
        role: "textbox",
        ...(e = this.options.editorProps) === null || e === void 0 ? void 0 : e.attributes
      },
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: Xn.create({
        doc: t,
        selection: r || void 0
      })
    });
    const i = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(i), this.createNodeViews(), this.prependClass();
    const s = this.view.dom;
    s.editor = this;
  }
  /**
   * Creates all node views.
   */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `tiptap ${this.view.dom.className}`;
  }
  captureTransaction(e) {
    this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
    const t = this.capturedTransaction;
    return this.capturedTransaction = null, t;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(e) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = e;
        return;
      }
      e.steps.forEach((o) => {
        var l;
        return (l = this.capturedTransaction) === null || l === void 0 ? void 0 : l.step(o);
      });
      return;
    }
    const t = this.state.apply(e), r = !this.state.selection.eq(t.selection);
    this.emit("beforeTransaction", {
      editor: this,
      transaction: e,
      nextState: t
    }), this.view.updateState(t), this.emit("transaction", {
      editor: this,
      transaction: e
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: e
    });
    const i = e.getMeta("focus"), s = e.getMeta("blur");
    i && this.emit("focus", {
      editor: this,
      event: i.event,
      transaction: e
    }), s && this.emit("blur", {
      editor: this,
      event: s.event,
      transaction: e
    }), !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
      editor: this,
      transaction: e
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(e) {
    return kf(this.state, e);
  }
  isActive(e, t) {
    const r = typeof e == "string" ? e : null, i = typeof e == "string" ? t : e;
    return e0(this.state, r, i);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return Xl(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(e) {
    const { blockSeparator: t = `

`, textSerializers: r = {} } = e || {};
    return wf(this.state.doc, {
      blockSeparator: t,
      textSerializers: {
        ...Zl(this.schema),
        ...r
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return eo(this.state.doc);
  }
  /**
   * Get the number of characters for the current document.
   *
   * @deprecated
   */
  getCharacterCount() {
    return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'), this.state.doc.content.size - 2;
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    if (this.emit("destroy"), this.view) {
      const e = this.view.dom;
      e && e.editor && delete e.editor, this.view.destroy();
    }
    this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var e;
    return !(!((e = this.view) === null || e === void 0) && e.docView);
  }
  $node(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelector(e, t)) || null;
  }
  $nodes(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelectorAll(e, t)) || null;
  }
  $pos(e) {
    const t = this.state.doc.resolve(e);
    return new mn(t, this);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function sr(n) {
  return new Ys({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = W(n.getAttributes, void 0, r);
      if (i === !1 || i === null)
        return null;
      const { tr: s } = e, o = r[r.length - 1], l = r[0];
      if (o) {
        const a = l.search(/\S/), c = t.from + l.indexOf(o), u = c + o.length;
        if (ra(t.from, t.to, e.doc).filter((h) => h.mark.type.excluded.find((m) => m === n.type && m !== h.mark.type)).filter((h) => h.to > c).length)
          return null;
        u < t.to && s.delete(u, t.to), c > t.from && s.delete(t.from + a, c);
        const f = t.from + a + o.length;
        s.addMark(t.from + a, f, n.type.create(i || {})), s.removeStoredMark(n.type);
      }
    }
  });
}
function R0(n) {
  return new Ys({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = W(n.getAttributes, void 0, r) || {}, { tr: s } = e, o = t.from;
      let l = t.to;
      const a = n.type.create(i);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let u = o + c;
        u > l ? u = l : l = u + r[1].length;
        const d = r[0][r[0].length - 1];
        s.insertText(d, o + r[0].length - 1), s.replaceWith(u, l, a);
      } else if (r[0]) {
        const c = n.type.isInline ? o : o - 1;
        s.insert(c, n.type.create(i)).delete(s.mapping.map(o), s.mapping.map(l));
      }
      s.scrollIntoView();
    }
  });
}
function sl(n) {
  return new Ys({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = e.doc.resolve(t.from), s = W(n.getAttributes, void 0, r) || {};
      if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), n.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, s);
    }
  });
}
function Yr(n) {
  return new Ys({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: i }) => {
      const s = W(n.getAttributes, void 0, r) || {}, o = e.tr.delete(t.from, t.to), a = o.doc.resolve(t.from).blockRange(), c = a && Il(a, n.type, s);
      if (!c)
        return null;
      if (o.wrap(a, c), n.keepMarks && n.editor) {
        const { selection: d, storedMarks: f } = e, { splittableMarks: h } = n.editor.extensionManager, p = f || d.$to.parentOffset && d.$from.marks();
        if (p) {
          const m = p.filter((g) => h.includes(g.type.name));
          o.ensureMarks(m);
        }
      }
      if (n.keepAttributes) {
        const d = n.type.name === "bulletList" || n.type.name === "orderedList" ? "listItem" : "taskList";
        i().updateAttributes(d, s).run();
      }
      const u = o.doc.resolve(t.from - 1).nodeBefore;
      u && u.type === n.type && sn(o.doc, t.from - 1) && (!n.joinPredicate || n.joinPredicate(r, u)) && o.join(t.from - 1);
    }
  });
}
class ce {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = W(L(this, "addOptions", {
      name: this.name
    }))), this.storage = W(L(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ce(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => Xs(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new ce(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = W(L(t, "addOptions", {
      name: t.name
    })), t.storage = W(L(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
class I0 {
  constructor(e, t, r) {
    this.isDragging = !1, this.component = e, this.editor = t.editor, this.options = {
      stopEvent: null,
      ignoreMutation: null,
      ...r
    }, this.extension = t.extension, this.node = t.node, this.decorations = t.decorations, this.innerDecorations = t.innerDecorations, this.view = t.view, this.HTMLAttributes = t.HTMLAttributes, this.getPos = t.getPos, this.mount();
  }
  mount() {
  }
  get dom() {
    return this.editor.view.dom;
  }
  get contentDOM() {
    return null;
  }
  onDragStart(e) {
    var t, r, i, s, o, l, a;
    const { view: c } = this.editor, u = e.target, d = u.nodeType === 3 ? (t = u.parentElement) === null || t === void 0 ? void 0 : t.closest("[data-drag-handle]") : u.closest("[data-drag-handle]");
    if (!this.dom || !((r = this.contentDOM) === null || r === void 0) && r.contains(u) || !d)
      return;
    let f = 0, h = 0;
    if (this.dom !== d) {
      const w = this.dom.getBoundingClientRect(), C = d.getBoundingClientRect(), b = (i = e.offsetX) !== null && i !== void 0 ? i : (s = e.nativeEvent) === null || s === void 0 ? void 0 : s.offsetX, S = (o = e.offsetY) !== null && o !== void 0 ? o : (l = e.nativeEvent) === null || l === void 0 ? void 0 : l.offsetY;
      f = C.x - w.x + b, h = C.y - w.y + S;
    }
    const p = this.dom.cloneNode(!0);
    (a = e.dataTransfer) === null || a === void 0 || a.setDragImage(p, f, h);
    const m = this.getPos();
    if (typeof m != "number")
      return;
    const g = B.create(c.state.doc, m), y = c.state.tr.setSelection(g);
    c.dispatch(y);
  }
  stopEvent(e) {
    var t;
    if (!this.dom)
      return !1;
    if (typeof this.options.stopEvent == "function")
      return this.options.stopEvent({ event: e });
    const r = e.target;
    if (!(this.dom.contains(r) && !(!((t = this.contentDOM) === null || t === void 0) && t.contains(r))))
      return !1;
    const s = e.type.startsWith("drag"), o = e.type === "drop";
    if ((["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(r.tagName) || r.isContentEditable) && !o && !s)
      return !0;
    const { isEditable: a } = this.editor, { isDragging: c } = this, u = !!this.node.type.spec.draggable, d = B.isSelectable(this.node), f = e.type === "copy", h = e.type === "paste", p = e.type === "cut", m = e.type === "mousedown";
    if (!u && d && s && e.target === this.dom && e.preventDefault(), u && s && !c && e.target === this.dom)
      return e.preventDefault(), !1;
    if (u && a && !c && m) {
      const g = r.closest("[data-drag-handle]");
      g && (this.dom === g || this.dom.contains(g)) && (this.isDragging = !0, document.addEventListener("dragend", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("drop", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("mouseup", () => {
        this.isDragging = !1;
      }, { once: !0 }));
    }
    return !(c || o || f || h || p || m && d);
  }
  /**
   * Called when a DOM [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) or a selection change happens within the view.
   * @return `false` if the editor should re-read the selection or re-parse the range around the mutation
   * @return `true` if it can safely be ignored.
   */
  ignoreMutation(e) {
    return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({ mutation: e }) : this.node.isLeaf || this.node.isAtom ? !0 : e.type === "selection" || this.dom.contains(e.target) && e.type === "childList" && (Qs() || mf()) && this.editor.isFocused && [
      ...Array.from(e.addedNodes),
      ...Array.from(e.removedNodes)
    ].every((r) => r.isContentEditable) ? !1 : this.contentDOM === e.target && e.type === "attributes" ? !0 : !this.contentDOM.contains(e.target);
  }
  /**
   * Update the attributes of the prosemirror node.
   */
  updateAttributes(e) {
    this.editor.commands.command(({ tr: t }) => {
      const r = this.getPos();
      return typeof r != "number" ? !1 : (t.setNodeMarkup(r, void 0, {
        ...this.node.attrs,
        ...e
      }), !0);
    });
  }
  /**
   * Delete the node.
   */
  deleteNode() {
    const e = this.getPos();
    if (typeof e != "number")
      return;
    const t = e + this.node.nodeSize;
    this.editor.commands.deleteRange({ from: e, to: t });
  }
}
function Ln(n) {
  return new df({
    find: n.find,
    handler: ({ state: e, range: t, match: r, pasteEvent: i }) => {
      const s = W(n.getAttributes, void 0, r, i);
      if (s === !1 || s === null)
        return null;
      const { tr: o } = e, l = r[r.length - 1], a = r[0];
      let c = t.to;
      if (l) {
        const u = a.search(/\S/), d = t.from + a.indexOf(l), f = d + l.length;
        if (ra(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((g) => g === n.type && g !== p.mark.type)).filter((p) => p.to > d).length)
          return null;
        f < t.to && o.delete(f, t.to), d > t.from && o.delete(t.from + u, d), c = t.from + u + l.length, o.addMark(t.from + u, c, n.type.create(s || {})), o.removeStoredMark(n.type);
      }
    }
  });
}
function P0(n) {
  return n.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function B0(n) {
  return new df({
    find: n.find,
    handler({ match: e, chain: t, range: r, pasteEvent: i }) {
      const s = W(n.getAttributes, void 0, e, i), o = W(n.getContent, void 0, s);
      if (s === !1 || s === null)
        return null;
      const l = { type: n.type.name, attrs: s };
      o && (l.content = o), e.input && t().deleteRange(r).insertContentAt(r.from, l);
    }
  });
}
var Ie = "top", Ze = "bottom", et = "right", Pe = "left", ia = "auto", li = [Ie, Ze, et, Pe], or = "start", Xr = "end", H0 = "clippingParents", xf = "viewport", Cr = "popper", F0 = "reference", Dc = /* @__PURE__ */ li.reduce(function(n, e) {
  return n.concat([e + "-" + or, e + "-" + Xr]);
}, []), Sf = /* @__PURE__ */ [].concat(li, [ia]).reduce(function(n, e) {
  return n.concat([e, e + "-" + or, e + "-" + Xr]);
}, []), z0 = "beforeRead", V0 = "read", $0 = "afterRead", _0 = "beforeMain", j0 = "main", W0 = "afterMain", U0 = "beforeWrite", K0 = "write", q0 = "afterWrite", J0 = [z0, V0, $0, _0, j0, W0, U0, K0, q0];
function bt(n) {
  return n ? (n.nodeName || "").toLowerCase() : null;
}
function We(n) {
  if (n == null)
    return window;
  if (n.toString() !== "[object Window]") {
    var e = n.ownerDocument;
    return e && e.defaultView || window;
  }
  return n;
}
function Rn(n) {
  var e = We(n).Element;
  return n instanceof e || n instanceof Element;
}
function Qe(n) {
  var e = We(n).HTMLElement;
  return n instanceof e || n instanceof HTMLElement;
}
function sa(n) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = We(n).ShadowRoot;
  return n instanceof e || n instanceof ShadowRoot;
}
function G0(n) {
  var e = n.state;
  Object.keys(e.elements).forEach(function(t) {
    var r = e.styles[t] || {}, i = e.attributes[t] || {}, s = e.elements[t];
    !Qe(s) || !bt(s) || (Object.assign(s.style, r), Object.keys(i).forEach(function(o) {
      var l = i[o];
      l === !1 ? s.removeAttribute(o) : s.setAttribute(o, l === !0 ? "" : l);
    }));
  });
}
function Y0(n) {
  var e = n.state, t = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var i = e.elements[r], s = e.attributes[r] || {}, o = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : t[r]), l = o.reduce(function(a, c) {
        return a[c] = "", a;
      }, {});
      !Qe(i) || !bt(i) || (Object.assign(i.style, l), Object.keys(s).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const Mf = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: G0,
  effect: Y0,
  requires: ["computeStyles"]
};
function mt(n) {
  return n.split("-")[0];
}
var An = Math.max, ss = Math.min, lr = Math.round;
function ol() {
  var n = navigator.userAgentData;
  return n != null && n.brands && Array.isArray(n.brands) ? n.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function Af() {
  return !/^((?!chrome|android).)*safari/i.test(ol());
}
function ar(n, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var r = n.getBoundingClientRect(), i = 1, s = 1;
  e && Qe(n) && (i = n.offsetWidth > 0 && lr(r.width) / n.offsetWidth || 1, s = n.offsetHeight > 0 && lr(r.height) / n.offsetHeight || 1);
  var o = Rn(n) ? We(n) : window, l = o.visualViewport, a = !Af() && t, c = (r.left + (a && l ? l.offsetLeft : 0)) / i, u = (r.top + (a && l ? l.offsetTop : 0)) / s, d = r.width / i, f = r.height / s;
  return {
    width: d,
    height: f,
    top: u,
    right: c + d,
    bottom: u + f,
    left: c,
    x: c,
    y: u
  };
}
function oa(n) {
  var e = ar(n), t = n.offsetWidth, r = n.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: n.offsetLeft,
    y: n.offsetTop,
    width: t,
    height: r
  };
}
function Ef(n, e) {
  var t = e.getRootNode && e.getRootNode();
  if (n.contains(e))
    return !0;
  if (t && sa(t)) {
    var r = e;
    do {
      if (r && n.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Pt(n) {
  return We(n).getComputedStyle(n);
}
function X0(n) {
  return ["table", "td", "th"].indexOf(bt(n)) >= 0;
}
function an(n) {
  return ((Rn(n) ? n.ownerDocument : (
    // $FlowFixMe[prop-missing]
    n.document
  )) || window.document).documentElement;
}
function to(n) {
  return bt(n) === "html" ? n : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    n.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    n.parentNode || // DOM Element detected
    (sa(n) ? n.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    an(n)
  );
}
function Lc(n) {
  return !Qe(n) || // https://github.com/popperjs/popper-core/issues/837
  Pt(n).position === "fixed" ? null : n.offsetParent;
}
function Q0(n) {
  var e = /firefox/i.test(ol()), t = /Trident/i.test(ol());
  if (t && Qe(n)) {
    var r = Pt(n);
    if (r.position === "fixed")
      return null;
  }
  var i = to(n);
  for (sa(i) && (i = i.host); Qe(i) && ["html", "body"].indexOf(bt(i)) < 0; ) {
    var s = Pt(i);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || e && s.willChange === "filter" || e && s.filter && s.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function ai(n) {
  for (var e = We(n), t = Lc(n); t && X0(t) && Pt(t).position === "static"; )
    t = Lc(t);
  return t && (bt(t) === "html" || bt(t) === "body" && Pt(t).position === "static") ? e : t || Q0(n) || e;
}
function la(n) {
  return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
}
function Lr(n, e, t) {
  return An(n, ss(e, t));
}
function Z0(n, e, t) {
  var r = Lr(n, e, t);
  return r > t ? t : r;
}
function Tf() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Of(n) {
  return Object.assign({}, Tf(), n);
}
function Nf(n, e) {
  return e.reduce(function(t, r) {
    return t[r] = n, t;
  }, {});
}
var eb = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, Of(typeof e != "number" ? e : Nf(e, li));
};
function tb(n) {
  var e, t = n.state, r = n.name, i = n.options, s = t.elements.arrow, o = t.modifiersData.popperOffsets, l = mt(t.placement), a = la(l), c = [Pe, et].indexOf(l) >= 0, u = c ? "height" : "width";
  if (!(!s || !o)) {
    var d = eb(i.padding, t), f = oa(s), h = a === "y" ? Ie : Pe, p = a === "y" ? Ze : et, m = t.rects.reference[u] + t.rects.reference[a] - o[a] - t.rects.popper[u], g = o[a] - t.rects.reference[a], y = ai(s), w = y ? a === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, C = m / 2 - g / 2, b = d[h], S = w - f[u] - d[p], k = w / 2 - f[u] / 2 + C, T = Lr(b, k, S), M = a;
    t.modifiersData[r] = (e = {}, e[M] = T, e.centerOffset = T - k, e);
  }
}
function nb(n) {
  var e = n.state, t = n.options, r = t.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || Ef(e.elements.popper, i) && (e.elements.arrow = i));
}
const rb = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: tb,
  effect: nb,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function cr(n) {
  return n.split("-")[1];
}
var ib = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function sb(n, e) {
  var t = n.x, r = n.y, i = e.devicePixelRatio || 1;
  return {
    x: lr(t * i) / i || 0,
    y: lr(r * i) / i || 0
  };
}
function Rc(n) {
  var e, t = n.popper, r = n.popperRect, i = n.placement, s = n.variation, o = n.offsets, l = n.position, a = n.gpuAcceleration, c = n.adaptive, u = n.roundOffsets, d = n.isFixed, f = o.x, h = f === void 0 ? 0 : f, p = o.y, m = p === void 0 ? 0 : p, g = typeof u == "function" ? u({
    x: h,
    y: m
  }) : {
    x: h,
    y: m
  };
  h = g.x, m = g.y;
  var y = o.hasOwnProperty("x"), w = o.hasOwnProperty("y"), C = Pe, b = Ie, S = window;
  if (c) {
    var k = ai(t), T = "clientHeight", M = "clientWidth";
    if (k === We(t) && (k = an(t), Pt(k).position !== "static" && l === "absolute" && (T = "scrollHeight", M = "scrollWidth")), k = k, i === Ie || (i === Pe || i === et) && s === Xr) {
      b = Ze;
      var I = d && k === S && S.visualViewport ? S.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        k[T]
      );
      m -= I - r.height, m *= a ? 1 : -1;
    }
    if (i === Pe || (i === Ie || i === Ze) && s === Xr) {
      C = et;
      var N = d && k === S && S.visualViewport ? S.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        k[M]
      );
      h -= N - r.width, h *= a ? 1 : -1;
    }
  }
  var j = Object.assign({
    position: l
  }, c && ib), K = u === !0 ? sb({
    x: h,
    y: m
  }, We(t)) : {
    x: h,
    y: m
  };
  if (h = K.x, m = K.y, a) {
    var Y;
    return Object.assign({}, j, (Y = {}, Y[b] = w ? "0" : "", Y[C] = y ? "0" : "", Y.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + m + "px)" : "translate3d(" + h + "px, " + m + "px, 0)", Y));
  }
  return Object.assign({}, j, (e = {}, e[b] = w ? m + "px" : "", e[C] = y ? h + "px" : "", e.transform = "", e));
}
function ob(n) {
  var e = n.state, t = n.options, r = t.gpuAcceleration, i = r === void 0 ? !0 : r, s = t.adaptive, o = s === void 0 ? !0 : s, l = t.roundOffsets, a = l === void 0 ? !0 : l, c = {
    placement: mt(e.placement),
    variation: cr(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Rc(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Rc(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const lb = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: ob,
  data: {}
};
var Ei = {
  passive: !0
};
function ab(n) {
  var e = n.state, t = n.instance, r = n.options, i = r.scroll, s = i === void 0 ? !0 : i, o = r.resize, l = o === void 0 ? !0 : o, a = We(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return s && c.forEach(function(u) {
    u.addEventListener("scroll", t.update, Ei);
  }), l && a.addEventListener("resize", t.update, Ei), function() {
    s && c.forEach(function(u) {
      u.removeEventListener("scroll", t.update, Ei);
    }), l && a.removeEventListener("resize", t.update, Ei);
  };
}
const cb = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: ab,
  data: {}
};
var ub = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function $i(n) {
  return n.replace(/left|right|bottom|top/g, function(e) {
    return ub[e];
  });
}
var db = {
  start: "end",
  end: "start"
};
function Ic(n) {
  return n.replace(/start|end/g, function(e) {
    return db[e];
  });
}
function aa(n) {
  var e = We(n), t = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: r
  };
}
function ca(n) {
  return ar(an(n)).left + aa(n).scrollLeft;
}
function fb(n, e) {
  var t = We(n), r = an(n), i = t.visualViewport, s = r.clientWidth, o = r.clientHeight, l = 0, a = 0;
  if (i) {
    s = i.width, o = i.height;
    var c = Af();
    (c || !c && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: s,
    height: o,
    x: l + ca(n),
    y: a
  };
}
function hb(n) {
  var e, t = an(n), r = aa(n), i = (e = n.ownerDocument) == null ? void 0 : e.body, s = An(t.scrollWidth, t.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), o = An(t.scrollHeight, t.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -r.scrollLeft + ca(n), a = -r.scrollTop;
  return Pt(i || t).direction === "rtl" && (l += An(t.clientWidth, i ? i.clientWidth : 0) - s), {
    width: s,
    height: o,
    x: l,
    y: a
  };
}
function ua(n) {
  var e = Pt(n), t = e.overflow, r = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + i + r);
}
function Df(n) {
  return ["html", "body", "#document"].indexOf(bt(n)) >= 0 ? n.ownerDocument.body : Qe(n) && ua(n) ? n : Df(to(n));
}
function Rr(n, e) {
  var t;
  e === void 0 && (e = []);
  var r = Df(n), i = r === ((t = n.ownerDocument) == null ? void 0 : t.body), s = We(r), o = i ? [s].concat(s.visualViewport || [], ua(r) ? r : []) : r, l = e.concat(o);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Rr(to(o)))
  );
}
function ll(n) {
  return Object.assign({}, n, {
    left: n.x,
    top: n.y,
    right: n.x + n.width,
    bottom: n.y + n.height
  });
}
function pb(n, e) {
  var t = ar(n, !1, e === "fixed");
  return t.top = t.top + n.clientTop, t.left = t.left + n.clientLeft, t.bottom = t.top + n.clientHeight, t.right = t.left + n.clientWidth, t.width = n.clientWidth, t.height = n.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Pc(n, e, t) {
  return e === xf ? ll(fb(n, t)) : Rn(e) ? pb(e, t) : ll(hb(an(n)));
}
function mb(n) {
  var e = Rr(to(n)), t = ["absolute", "fixed"].indexOf(Pt(n).position) >= 0, r = t && Qe(n) ? ai(n) : n;
  return Rn(r) ? e.filter(function(i) {
    return Rn(i) && Ef(i, r) && bt(i) !== "body";
  }) : [];
}
function gb(n, e, t, r) {
  var i = e === "clippingParents" ? mb(n) : [].concat(e), s = [].concat(i, [t]), o = s[0], l = s.reduce(function(a, c) {
    var u = Pc(n, c, r);
    return a.top = An(u.top, a.top), a.right = ss(u.right, a.right), a.bottom = ss(u.bottom, a.bottom), a.left = An(u.left, a.left), a;
  }, Pc(n, o, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Lf(n) {
  var e = n.reference, t = n.element, r = n.placement, i = r ? mt(r) : null, s = r ? cr(r) : null, o = e.x + e.width / 2 - t.width / 2, l = e.y + e.height / 2 - t.height / 2, a;
  switch (i) {
    case Ie:
      a = {
        x: o,
        y: e.y - t.height
      };
      break;
    case Ze:
      a = {
        x: o,
        y: e.y + e.height
      };
      break;
    case et:
      a = {
        x: e.x + e.width,
        y: l
      };
      break;
    case Pe:
      a = {
        x: e.x - t.width,
        y: l
      };
      break;
    default:
      a = {
        x: e.x,
        y: e.y
      };
  }
  var c = i ? la(i) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (s) {
      case or:
        a[c] = a[c] - (e[u] / 2 - t[u] / 2);
        break;
      case Xr:
        a[c] = a[c] + (e[u] / 2 - t[u] / 2);
        break;
    }
  }
  return a;
}
function Qr(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = r === void 0 ? n.placement : r, s = t.strategy, o = s === void 0 ? n.strategy : s, l = t.boundary, a = l === void 0 ? H0 : l, c = t.rootBoundary, u = c === void 0 ? xf : c, d = t.elementContext, f = d === void 0 ? Cr : d, h = t.altBoundary, p = h === void 0 ? !1 : h, m = t.padding, g = m === void 0 ? 0 : m, y = Of(typeof g != "number" ? g : Nf(g, li)), w = f === Cr ? F0 : Cr, C = n.rects.popper, b = n.elements[p ? w : f], S = gb(Rn(b) ? b : b.contextElement || an(n.elements.popper), a, u, o), k = ar(n.elements.reference), T = Lf({
    reference: k,
    element: C,
    placement: i
  }), M = ll(Object.assign({}, C, T)), I = f === Cr ? M : k, N = {
    top: S.top - I.top + y.top,
    bottom: I.bottom - S.bottom + y.bottom,
    left: S.left - I.left + y.left,
    right: I.right - S.right + y.right
  }, j = n.modifiersData.offset;
  if (f === Cr && j) {
    var K = j[i];
    Object.keys(N).forEach(function(Y) {
      var J = [et, Ze].indexOf(Y) >= 0 ? 1 : -1, Z = [Ie, Ze].indexOf(Y) >= 0 ? "y" : "x";
      N[Y] += K[Z] * J;
    });
  }
  return N;
}
function yb(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = t.boundary, s = t.rootBoundary, o = t.padding, l = t.flipVariations, a = t.allowedAutoPlacements, c = a === void 0 ? Sf : a, u = cr(r), d = u ? l ? Dc : Dc.filter(function(p) {
    return cr(p) === u;
  }) : li, f = d.filter(function(p) {
    return c.indexOf(p) >= 0;
  });
  f.length === 0 && (f = d);
  var h = f.reduce(function(p, m) {
    return p[m] = Qr(n, {
      placement: m,
      boundary: i,
      rootBoundary: s,
      padding: o
    })[mt(m)], p;
  }, {});
  return Object.keys(h).sort(function(p, m) {
    return h[p] - h[m];
  });
}
function bb(n) {
  if (mt(n) === ia)
    return [];
  var e = $i(n);
  return [Ic(n), e, Ic(e)];
}
function vb(n) {
  var e = n.state, t = n.options, r = n.name;
  if (!e.modifiersData[r]._skip) {
    for (var i = t.mainAxis, s = i === void 0 ? !0 : i, o = t.altAxis, l = o === void 0 ? !0 : o, a = t.fallbackPlacements, c = t.padding, u = t.boundary, d = t.rootBoundary, f = t.altBoundary, h = t.flipVariations, p = h === void 0 ? !0 : h, m = t.allowedAutoPlacements, g = e.options.placement, y = mt(g), w = y === g, C = a || (w || !p ? [$i(g)] : bb(g)), b = [g].concat(C).reduce(function(wt, nt) {
      return wt.concat(mt(nt) === ia ? yb(e, {
        placement: nt,
        boundary: u,
        rootBoundary: d,
        padding: c,
        flipVariations: p,
        allowedAutoPlacements: m
      }) : nt);
    }, []), S = e.rects.reference, k = e.rects.popper, T = /* @__PURE__ */ new Map(), M = !0, I = b[0], N = 0; N < b.length; N++) {
      var j = b[N], K = mt(j), Y = cr(j) === or, J = [Ie, Ze].indexOf(K) >= 0, Z = J ? "width" : "height", G = Qr(e, {
        placement: j,
        boundary: u,
        rootBoundary: d,
        altBoundary: f,
        padding: c
      }), ee = J ? Y ? et : Pe : Y ? Ze : Ie;
      S[Z] > k[Z] && (ee = $i(ee));
      var ae = $i(ee), ye = [];
      if (s && ye.push(G[K] <= 0), l && ye.push(G[ee] <= 0, G[ae] <= 0), ye.every(function(wt) {
        return wt;
      })) {
        I = j, M = !1;
        break;
      }
      T.set(j, ye);
    }
    if (M)
      for (var Be = p ? 3 : 1, He = function(nt) {
        var kt = b.find(function(Fn) {
          var Ct = T.get(Fn);
          if (Ct)
            return Ct.slice(0, nt).every(function(zn) {
              return zn;
            });
        });
        if (kt)
          return I = kt, "break";
      }, Ue = Be; Ue > 0; Ue--) {
        var tt = He(Ue);
        if (tt === "break") break;
      }
    e.placement !== I && (e.modifiersData[r]._skip = !0, e.placement = I, e.reset = !0);
  }
}
const wb = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: vb,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Bc(n, e, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: n.top - e.height - t.y,
    right: n.right - e.width + t.x,
    bottom: n.bottom - e.height + t.y,
    left: n.left - e.width - t.x
  };
}
function Hc(n) {
  return [Ie, et, Ze, Pe].some(function(e) {
    return n[e] >= 0;
  });
}
function kb(n) {
  var e = n.state, t = n.name, r = e.rects.reference, i = e.rects.popper, s = e.modifiersData.preventOverflow, o = Qr(e, {
    elementContext: "reference"
  }), l = Qr(e, {
    altBoundary: !0
  }), a = Bc(o, r), c = Bc(l, i, s), u = Hc(a), d = Hc(c);
  e.modifiersData[t] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: c,
    isReferenceHidden: u,
    hasPopperEscaped: d
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": d
  });
}
const Cb = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: kb
};
function xb(n, e, t) {
  var r = mt(n), i = [Pe, Ie].indexOf(r) >= 0 ? -1 : 1, s = typeof t == "function" ? t(Object.assign({}, e, {
    placement: n
  })) : t, o = s[0], l = s[1];
  return o = o || 0, l = (l || 0) * i, [Pe, et].indexOf(r) >= 0 ? {
    x: l,
    y: o
  } : {
    x: o,
    y: l
  };
}
function Sb(n) {
  var e = n.state, t = n.options, r = n.name, i = t.offset, s = i === void 0 ? [0, 0] : i, o = Sf.reduce(function(u, d) {
    return u[d] = xb(d, e.rects, s), u;
  }, {}), l = o[e.placement], a = l.x, c = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += a, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = o;
}
const Mb = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Sb
};
function Ab(n) {
  var e = n.state, t = n.name;
  e.modifiersData[t] = Lf({
    reference: e.rects.reference,
    element: e.rects.popper,
    placement: e.placement
  });
}
const Eb = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Ab,
  data: {}
};
function Tb(n) {
  return n === "x" ? "y" : "x";
}
function Ob(n) {
  var e = n.state, t = n.options, r = n.name, i = t.mainAxis, s = i === void 0 ? !0 : i, o = t.altAxis, l = o === void 0 ? !1 : o, a = t.boundary, c = t.rootBoundary, u = t.altBoundary, d = t.padding, f = t.tether, h = f === void 0 ? !0 : f, p = t.tetherOffset, m = p === void 0 ? 0 : p, g = Qr(e, {
    boundary: a,
    rootBoundary: c,
    padding: d,
    altBoundary: u
  }), y = mt(e.placement), w = cr(e.placement), C = !w, b = la(y), S = Tb(b), k = e.modifiersData.popperOffsets, T = e.rects.reference, M = e.rects.popper, I = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, N = typeof I == "number" ? {
    mainAxis: I,
    altAxis: I
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, I), j = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, K = {
    x: 0,
    y: 0
  };
  if (k) {
    if (s) {
      var Y, J = b === "y" ? Ie : Pe, Z = b === "y" ? Ze : et, G = b === "y" ? "height" : "width", ee = k[b], ae = ee + g[J], ye = ee - g[Z], Be = h ? -M[G] / 2 : 0, He = w === or ? T[G] : M[G], Ue = w === or ? -M[G] : -T[G], tt = e.elements.arrow, wt = h && tt ? oa(tt) : {
        width: 0,
        height: 0
      }, nt = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Tf(), kt = nt[J], Fn = nt[Z], Ct = Lr(0, T[G], wt[G]), zn = C ? T[G] / 2 - Be - Ct - kt - N.mainAxis : He - Ct - kt - N.mainAxis, Ht = C ? -T[G] / 2 + Be + Ct + Fn + N.mainAxis : Ue + Ct + Fn + N.mainAxis, Vn = e.elements.arrow && ai(e.elements.arrow), ci = Vn ? b === "y" ? Vn.clientTop || 0 : Vn.clientLeft || 0 : 0, gr = (Y = j == null ? void 0 : j[b]) != null ? Y : 0, ui = ee + zn - gr - ci, di = ee + Ht - gr, yr = Lr(h ? ss(ae, ui) : ae, ee, h ? An(ye, di) : ye);
      k[b] = yr, K[b] = yr - ee;
    }
    if (l) {
      var br, fi = b === "x" ? Ie : Pe, hi = b === "x" ? Ze : et, xt = k[S], Ft = S === "y" ? "height" : "width", vr = xt + g[fi], un = xt - g[hi], wr = [Ie, Pe].indexOf(y) !== -1, pi = (br = j == null ? void 0 : j[S]) != null ? br : 0, mi = wr ? vr : xt - T[Ft] - M[Ft] - pi + N.altAxis, gi = wr ? xt + T[Ft] + M[Ft] - pi - N.altAxis : un, yi = h && wr ? Z0(mi, xt, gi) : Lr(h ? mi : vr, xt, h ? gi : un);
      k[S] = yi, K[S] = yi - xt;
    }
    e.modifiersData[r] = K;
  }
}
const Nb = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Ob,
  requiresIfExists: ["offset"]
};
function Db(n) {
  return {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  };
}
function Lb(n) {
  return n === We(n) || !Qe(n) ? aa(n) : Db(n);
}
function Rb(n) {
  var e = n.getBoundingClientRect(), t = lr(e.width) / n.offsetWidth || 1, r = lr(e.height) / n.offsetHeight || 1;
  return t !== 1 || r !== 1;
}
function Ib(n, e, t) {
  t === void 0 && (t = !1);
  var r = Qe(e), i = Qe(e) && Rb(e), s = an(e), o = ar(n, i, t), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (r || !r && !t) && ((bt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  ua(s)) && (l = Lb(e)), Qe(e) ? (a = ar(e, !0), a.x += e.clientLeft, a.y += e.clientTop) : s && (a.x = ca(s))), {
    x: o.left + l.scrollLeft - a.x,
    y: o.top + l.scrollTop - a.y,
    width: o.width,
    height: o.height
  };
}
function Pb(n) {
  var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), r = [];
  n.forEach(function(s) {
    e.set(s.name, s);
  });
  function i(s) {
    t.add(s.name);
    var o = [].concat(s.requires || [], s.requiresIfExists || []);
    o.forEach(function(l) {
      if (!t.has(l)) {
        var a = e.get(l);
        a && i(a);
      }
    }), r.push(s);
  }
  return n.forEach(function(s) {
    t.has(s.name) || i(s);
  }), r;
}
function Bb(n) {
  var e = Pb(n);
  return J0.reduce(function(t, r) {
    return t.concat(e.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function Hb(n) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(n());
      });
    })), e;
  };
}
function Fb(n) {
  var e = n.reduce(function(t, r) {
    var i = t[r.name];
    return t[r.name] = i ? Object.assign({}, i, r, {
      options: Object.assign({}, i.options, r.options),
      data: Object.assign({}, i.data, r.data)
    }) : r, t;
  }, {});
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}
var Fc = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function zc() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function zb(n) {
  n === void 0 && (n = {});
  var e = n, t = e.defaultModifiers, r = t === void 0 ? [] : t, i = e.defaultOptions, s = i === void 0 ? Fc : i;
  return function(l, a, c) {
    c === void 0 && (c = s);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Fc, s),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, d = [], f = !1, h = {
      state: u,
      setOptions: function(y) {
        var w = typeof y == "function" ? y(u.options) : y;
        m(), u.options = Object.assign({}, s, u.options, w), u.scrollParents = {
          reference: Rn(l) ? Rr(l) : l.contextElement ? Rr(l.contextElement) : [],
          popper: Rr(a)
        };
        var C = Bb(Fb([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = C.filter(function(b) {
          return b.enabled;
        }), p(), h.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var y = u.elements, w = y.reference, C = y.popper;
          if (zc(w, C)) {
            u.rects = {
              reference: Ib(w, ai(C), u.options.strategy === "fixed"),
              popper: oa(C)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(N) {
              return u.modifiersData[N.name] = Object.assign({}, N.data);
            });
            for (var b = 0; b < u.orderedModifiers.length; b++) {
              if (u.reset === !0) {
                u.reset = !1, b = -1;
                continue;
              }
              var S = u.orderedModifiers[b], k = S.fn, T = S.options, M = T === void 0 ? {} : T, I = S.name;
              typeof k == "function" && (u = k({
                state: u,
                options: M,
                name: I,
                instance: h
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Hb(function() {
        return new Promise(function(g) {
          h.forceUpdate(), g(u);
        });
      }),
      destroy: function() {
        m(), f = !0;
      }
    };
    if (!zc(l, a))
      return h;
    h.setOptions(c).then(function(g) {
      !f && c.onFirstUpdate && c.onFirstUpdate(g);
    });
    function p() {
      u.orderedModifiers.forEach(function(g) {
        var y = g.name, w = g.options, C = w === void 0 ? {} : w, b = g.effect;
        if (typeof b == "function") {
          var S = b({
            state: u,
            name: y,
            instance: h,
            options: C
          }), k = function() {
          };
          d.push(S || k);
        }
      });
    }
    function m() {
      d.forEach(function(g) {
        return g();
      }), d = [];
    }
    return h;
  };
}
var Vb = [cb, Eb, lb, Mf, Mb, wb, Nb, rb, Cb], $b = /* @__PURE__ */ zb({
  defaultModifiers: Vb
}), _b = "tippy-box", Rf = "tippy-content", jb = "tippy-backdrop", If = "tippy-arrow", Pf = "tippy-svg-arrow", hn = {
  passive: !0,
  capture: !0
}, Bf = function() {
  return document.body;
};
function Wb(n, e) {
  return {}.hasOwnProperty.call(n, e);
}
function Ao(n, e, t) {
  if (Array.isArray(n)) {
    var r = n[e];
    return r ?? (Array.isArray(t) ? t[e] : t);
  }
  return n;
}
function da(n, e) {
  var t = {}.toString.call(n);
  return t.indexOf("[object") === 0 && t.indexOf(e + "]") > -1;
}
function Hf(n, e) {
  return typeof n == "function" ? n.apply(void 0, e) : n;
}
function Vc(n, e) {
  if (e === 0)
    return n;
  var t;
  return function(r) {
    clearTimeout(t), t = setTimeout(function() {
      n(r);
    }, e);
  };
}
function Ub(n, e) {
  var t = Object.assign({}, n);
  return e.forEach(function(r) {
    delete t[r];
  }), t;
}
function Kb(n) {
  return n.split(/\s+/).filter(Boolean);
}
function Gn(n) {
  return [].concat(n);
}
function $c(n, e) {
  n.indexOf(e) === -1 && n.push(e);
}
function qb(n) {
  return n.filter(function(e, t) {
    return n.indexOf(e) === t;
  });
}
function Jb(n) {
  return n.split("-")[0];
}
function ls(n) {
  return [].slice.call(n);
}
function _c(n) {
  return Object.keys(n).reduce(function(e, t) {
    return n[t] !== void 0 && (e[t] = n[t]), e;
  }, {});
}
function Ir() {
  return document.createElement("div");
}
function Zr(n) {
  return ["Element", "Fragment"].some(function(e) {
    return da(n, e);
  });
}
function Gb(n) {
  return da(n, "NodeList");
}
function Yb(n) {
  return da(n, "MouseEvent");
}
function Xb(n) {
  return !!(n && n._tippy && n._tippy.reference === n);
}
function Qb(n) {
  return Zr(n) ? [n] : Gb(n) ? ls(n) : Array.isArray(n) ? n : ls(document.querySelectorAll(n));
}
function Eo(n, e) {
  n.forEach(function(t) {
    t && (t.style.transitionDuration = e + "ms");
  });
}
function jc(n, e) {
  n.forEach(function(t) {
    t && t.setAttribute("data-state", e);
  });
}
function Zb(n) {
  var e, t = Gn(n), r = t[0];
  return r != null && (e = r.ownerDocument) != null && e.body ? r.ownerDocument : document;
}
function e1(n, e) {
  var t = e.clientX, r = e.clientY;
  return n.every(function(i) {
    var s = i.popperRect, o = i.popperState, l = i.props, a = l.interactiveBorder, c = Jb(o.placement), u = o.modifiersData.offset;
    if (!u)
      return !0;
    var d = c === "bottom" ? u.top.y : 0, f = c === "top" ? u.bottom.y : 0, h = c === "right" ? u.left.x : 0, p = c === "left" ? u.right.x : 0, m = s.top - r + d > a, g = r - s.bottom - f > a, y = s.left - t + h > a, w = t - s.right - p > a;
    return m || g || y || w;
  });
}
function To(n, e, t) {
  var r = e + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(i) {
    n[r](i, t);
  });
}
function Wc(n, e) {
  for (var t = e; t; ) {
    var r;
    if (n.contains(t))
      return !0;
    t = t.getRootNode == null || (r = t.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var ft = {
  isTouch: !1
}, Uc = 0;
function t1() {
  ft.isTouch || (ft.isTouch = !0, window.performance && document.addEventListener("mousemove", Ff));
}
function Ff() {
  var n = performance.now();
  n - Uc < 20 && (ft.isTouch = !1, document.removeEventListener("mousemove", Ff)), Uc = n;
}
function n1() {
  var n = document.activeElement;
  if (Xb(n)) {
    var e = n._tippy;
    n.blur && !e.state.isVisible && n.blur();
  }
}
function r1() {
  document.addEventListener("touchstart", t1, hn), window.addEventListener("blur", n1);
}
var i1 = typeof window < "u" && typeof document < "u", s1 = i1 ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function Un(n) {
  var e = n === "destroy" ? "n already-" : " ";
  return [n + "() was called on a" + e + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function Kc(n) {
  var e = /[ \t]{2,}/g, t = /^[ \t]*/gm;
  return n.replace(e, " ").replace(t, "").trim();
}
function o1(n) {
  return Kc(`
  %ctippy.js

  %c` + Kc(n) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function zf(n) {
  return [
    o1(n),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var ei;
process.env.NODE_ENV !== "production" && l1();
function l1() {
  ei = /* @__PURE__ */ new Set();
}
function Nt(n, e) {
  if (n && !ei.has(e)) {
    var t;
    ei.add(e), (t = console).warn.apply(t, zf(e));
  }
}
function al(n, e) {
  if (n && !ei.has(e)) {
    var t;
    ei.add(e), (t = console).error.apply(t, zf(e));
  }
}
function a1(n) {
  var e = !n, t = Object.prototype.toString.call(n) === "[object Object]" && !n.addEventListener;
  al(e, ["tippy() was passed", "`" + String(n) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), al(t, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var Vf = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, c1 = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, $e = Object.assign({
  appendTo: Bf,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, Vf, c1), u1 = Object.keys($e), d1 = function(e) {
  process.env.NODE_ENV !== "production" && _f(e, []);
  var t = Object.keys(e);
  t.forEach(function(r) {
    $e[r] = e[r];
  });
};
function $f(n) {
  var e = n.plugins || [], t = e.reduce(function(r, i) {
    var s = i.name, o = i.defaultValue;
    if (s) {
      var l;
      r[s] = n[s] !== void 0 ? n[s] : (l = $e[s]) != null ? l : o;
    }
    return r;
  }, {});
  return Object.assign({}, n, t);
}
function f1(n, e) {
  var t = e ? Object.keys($f(Object.assign({}, $e, {
    plugins: e
  }))) : u1, r = t.reduce(function(i, s) {
    var o = (n.getAttribute("data-tippy-" + s) || "").trim();
    if (!o)
      return i;
    if (s === "content")
      i[s] = o;
    else
      try {
        i[s] = JSON.parse(o);
      } catch {
        i[s] = o;
      }
    return i;
  }, {});
  return r;
}
function qc(n, e) {
  var t = Object.assign({}, e, {
    content: Hf(e.content, [n])
  }, e.ignoreAttributes ? {} : f1(n, e.plugins));
  return t.aria = Object.assign({}, $e.aria, t.aria), t.aria = {
    expanded: t.aria.expanded === "auto" ? e.interactive : t.aria.expanded,
    content: t.aria.content === "auto" ? e.interactive ? null : "describedby" : t.aria.content
  }, t;
}
function _f(n, e) {
  n === void 0 && (n = {}), e === void 0 && (e = []);
  var t = Object.keys(n);
  t.forEach(function(r) {
    var i = Ub($e, Object.keys(Vf)), s = !Wb(i, r);
    s && (s = e.filter(function(o) {
      return o.name === r;
    }).length === 0), Nt(s, ["`" + r + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var h1 = function() {
  return "innerHTML";
};
function cl(n, e) {
  n[h1()] = e;
}
function Jc(n) {
  var e = Ir();
  return n === !0 ? e.className = If : (e.className = Pf, Zr(n) ? e.appendChild(n) : cl(e, n)), e;
}
function Gc(n, e) {
  Zr(e.content) ? (cl(n, ""), n.appendChild(e.content)) : typeof e.content != "function" && (e.allowHTML ? cl(n, e.content) : n.textContent = e.content);
}
function ul(n) {
  var e = n.firstElementChild, t = ls(e.children);
  return {
    box: e,
    content: t.find(function(r) {
      return r.classList.contains(Rf);
    }),
    arrow: t.find(function(r) {
      return r.classList.contains(If) || r.classList.contains(Pf);
    }),
    backdrop: t.find(function(r) {
      return r.classList.contains(jb);
    })
  };
}
function jf(n) {
  var e = Ir(), t = Ir();
  t.className = _b, t.setAttribute("data-state", "hidden"), t.setAttribute("tabindex", "-1");
  var r = Ir();
  r.className = Rf, r.setAttribute("data-state", "hidden"), Gc(r, n.props), e.appendChild(t), t.appendChild(r), i(n.props, n.props);
  function i(s, o) {
    var l = ul(e), a = l.box, c = l.content, u = l.arrow;
    o.theme ? a.setAttribute("data-theme", o.theme) : a.removeAttribute("data-theme"), typeof o.animation == "string" ? a.setAttribute("data-animation", o.animation) : a.removeAttribute("data-animation"), o.inertia ? a.setAttribute("data-inertia", "") : a.removeAttribute("data-inertia"), a.style.maxWidth = typeof o.maxWidth == "number" ? o.maxWidth + "px" : o.maxWidth, o.role ? a.setAttribute("role", o.role) : a.removeAttribute("role"), (s.content !== o.content || s.allowHTML !== o.allowHTML) && Gc(c, n.props), o.arrow ? u ? s.arrow !== o.arrow && (a.removeChild(u), a.appendChild(Jc(o.arrow))) : a.appendChild(Jc(o.arrow)) : u && a.removeChild(u);
  }
  return {
    popper: e,
    onUpdate: i
  };
}
jf.$$tippy = !0;
var p1 = 1, Ti = [], Oo = [];
function m1(n, e) {
  var t = qc(n, Object.assign({}, $e, $f(_c(e)))), r, i, s, o = !1, l = !1, a = !1, c = !1, u, d, f, h = [], p = Vc(ui, t.interactiveDebounce), m, g = p1++, y = null, w = qb(t.plugins), C = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, b = {
    // properties
    id: g,
    reference: n,
    popper: Ir(),
    popperInstance: y,
    props: t,
    state: C,
    plugins: w,
    // methods
    clearDelayTimeouts: mi,
    setProps: gi,
    setContent: yi,
    show: Th,
    hide: Oh,
    hideWithInteractivity: Nh,
    enable: wr,
    disable: pi,
    unmount: Dh,
    destroy: Lh
  };
  if (!t.render)
    return process.env.NODE_ENV !== "production" && al(!0, "render() function has not been supplied."), b;
  var S = t.render(b), k = S.popper, T = S.onUpdate;
  k.setAttribute("data-tippy-root", ""), k.id = "tippy-" + b.id, b.popper = k, n._tippy = b, k._tippy = b;
  var M = w.map(function(x) {
    return x.fn(b);
  }), I = n.hasAttribute("aria-expanded");
  return Vn(), Be(), ee(), ae("onCreate", [b]), t.showOnCreate && vr(), k.addEventListener("mouseenter", function() {
    b.props.interactive && b.state.isVisible && b.clearDelayTimeouts();
  }), k.addEventListener("mouseleave", function() {
    b.props.interactive && b.props.trigger.indexOf("mouseenter") >= 0 && J().addEventListener("mousemove", p);
  }), b;
  function N() {
    var x = b.props.touch;
    return Array.isArray(x) ? x : [x, 0];
  }
  function j() {
    return N()[0] === "hold";
  }
  function K() {
    var x;
    return !!((x = b.props.render) != null && x.$$tippy);
  }
  function Y() {
    return m || n;
  }
  function J() {
    var x = Y().parentNode;
    return x ? Zb(x) : document;
  }
  function Z() {
    return ul(k);
  }
  function G(x) {
    return b.state.isMounted && !b.state.isVisible || ft.isTouch || u && u.type === "focus" ? 0 : Ao(b.props.delay, x ? 0 : 1, $e.delay);
  }
  function ee(x) {
    x === void 0 && (x = !1), k.style.pointerEvents = b.props.interactive && !x ? "" : "none", k.style.zIndex = "" + b.props.zIndex;
  }
  function ae(x, R, z) {
    if (z === void 0 && (z = !0), M.forEach(function(q) {
      q[x] && q[x].apply(q, R);
    }), z) {
      var X;
      (X = b.props)[x].apply(X, R);
    }
  }
  function ye() {
    var x = b.props.aria;
    if (x.content) {
      var R = "aria-" + x.content, z = k.id, X = Gn(b.props.triggerTarget || n);
      X.forEach(function(q) {
        var Ae = q.getAttribute(R);
        if (b.state.isVisible)
          q.setAttribute(R, Ae ? Ae + " " + z : z);
        else {
          var Ke = Ae && Ae.replace(z, "").trim();
          Ke ? q.setAttribute(R, Ke) : q.removeAttribute(R);
        }
      });
    }
  }
  function Be() {
    if (!(I || !b.props.aria.expanded)) {
      var x = Gn(b.props.triggerTarget || n);
      x.forEach(function(R) {
        b.props.interactive ? R.setAttribute("aria-expanded", b.state.isVisible && R === Y() ? "true" : "false") : R.removeAttribute("aria-expanded");
      });
    }
  }
  function He() {
    J().removeEventListener("mousemove", p), Ti = Ti.filter(function(x) {
      return x !== p;
    });
  }
  function Ue(x) {
    if (!(ft.isTouch && (a || x.type === "mousedown"))) {
      var R = x.composedPath && x.composedPath()[0] || x.target;
      if (!(b.props.interactive && Wc(k, R))) {
        if (Gn(b.props.triggerTarget || n).some(function(z) {
          return Wc(z, R);
        })) {
          if (ft.isTouch || b.state.isVisible && b.props.trigger.indexOf("click") >= 0)
            return;
        } else
          ae("onClickOutside", [b, x]);
        b.props.hideOnClick === !0 && (b.clearDelayTimeouts(), b.hide(), l = !0, setTimeout(function() {
          l = !1;
        }), b.state.isMounted || kt());
      }
    }
  }
  function tt() {
    a = !0;
  }
  function wt() {
    a = !1;
  }
  function nt() {
    var x = J();
    x.addEventListener("mousedown", Ue, !0), x.addEventListener("touchend", Ue, hn), x.addEventListener("touchstart", wt, hn), x.addEventListener("touchmove", tt, hn);
  }
  function kt() {
    var x = J();
    x.removeEventListener("mousedown", Ue, !0), x.removeEventListener("touchend", Ue, hn), x.removeEventListener("touchstart", wt, hn), x.removeEventListener("touchmove", tt, hn);
  }
  function Fn(x, R) {
    zn(x, function() {
      !b.state.isVisible && k.parentNode && k.parentNode.contains(k) && R();
    });
  }
  function Ct(x, R) {
    zn(x, R);
  }
  function zn(x, R) {
    var z = Z().box;
    function X(q) {
      q.target === z && (To(z, "remove", X), R());
    }
    if (x === 0)
      return R();
    To(z, "remove", d), To(z, "add", X), d = X;
  }
  function Ht(x, R, z) {
    z === void 0 && (z = !1);
    var X = Gn(b.props.triggerTarget || n);
    X.forEach(function(q) {
      q.addEventListener(x, R, z), h.push({
        node: q,
        eventType: x,
        handler: R,
        options: z
      });
    });
  }
  function Vn() {
    j() && (Ht("touchstart", gr, {
      passive: !0
    }), Ht("touchend", di, {
      passive: !0
    })), Kb(b.props.trigger).forEach(function(x) {
      if (x !== "manual")
        switch (Ht(x, gr), x) {
          case "mouseenter":
            Ht("mouseleave", di);
            break;
          case "focus":
            Ht(s1 ? "focusout" : "blur", yr);
            break;
          case "focusin":
            Ht("focusout", yr);
            break;
        }
    });
  }
  function ci() {
    h.forEach(function(x) {
      var R = x.node, z = x.eventType, X = x.handler, q = x.options;
      R.removeEventListener(z, X, q);
    }), h = [];
  }
  function gr(x) {
    var R, z = !1;
    if (!(!b.state.isEnabled || br(x) || l)) {
      var X = ((R = u) == null ? void 0 : R.type) === "focus";
      u = x, m = x.currentTarget, Be(), !b.state.isVisible && Yb(x) && Ti.forEach(function(q) {
        return q(x);
      }), x.type === "click" && (b.props.trigger.indexOf("mouseenter") < 0 || o) && b.props.hideOnClick !== !1 && b.state.isVisible ? z = !0 : vr(x), x.type === "click" && (o = !z), z && !X && un(x);
    }
  }
  function ui(x) {
    var R = x.target, z = Y().contains(R) || k.contains(R);
    if (!(x.type === "mousemove" && z)) {
      var X = Ft().concat(k).map(function(q) {
        var Ae, Ke = q._tippy, $n = (Ae = Ke.popperInstance) == null ? void 0 : Ae.state;
        return $n ? {
          popperRect: q.getBoundingClientRect(),
          popperState: $n,
          props: t
        } : null;
      }).filter(Boolean);
      e1(X, x) && (He(), un(x));
    }
  }
  function di(x) {
    var R = br(x) || b.props.trigger.indexOf("click") >= 0 && o;
    if (!R) {
      if (b.props.interactive) {
        b.hideWithInteractivity(x);
        return;
      }
      un(x);
    }
  }
  function yr(x) {
    b.props.trigger.indexOf("focusin") < 0 && x.target !== Y() || b.props.interactive && x.relatedTarget && k.contains(x.relatedTarget) || un(x);
  }
  function br(x) {
    return ft.isTouch ? j() !== x.type.indexOf("touch") >= 0 : !1;
  }
  function fi() {
    hi();
    var x = b.props, R = x.popperOptions, z = x.placement, X = x.offset, q = x.getReferenceClientRect, Ae = x.moveTransition, Ke = K() ? ul(k).arrow : null, $n = q ? {
      getBoundingClientRect: q,
      contextElement: q.contextElement || Y()
    } : n, Ca = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(bi) {
        var _n = bi.state;
        if (K()) {
          var Rh = Z(), oo = Rh.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(vi) {
            vi === "placement" ? oo.setAttribute("data-placement", _n.placement) : _n.attributes.popper["data-popper-" + vi] ? oo.setAttribute("data-" + vi, "") : oo.removeAttribute("data-" + vi);
          }), _n.attributes.popper = {};
        }
      }
    }, dn = [{
      name: "offset",
      options: {
        offset: X
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !Ae
      }
    }, Ca];
    K() && Ke && dn.push({
      name: "arrow",
      options: {
        element: Ke,
        padding: 3
      }
    }), dn.push.apply(dn, (R == null ? void 0 : R.modifiers) || []), b.popperInstance = $b($n, k, Object.assign({}, R, {
      placement: z,
      onFirstUpdate: f,
      modifiers: dn
    }));
  }
  function hi() {
    b.popperInstance && (b.popperInstance.destroy(), b.popperInstance = null);
  }
  function xt() {
    var x = b.props.appendTo, R, z = Y();
    b.props.interactive && x === Bf || x === "parent" ? R = z.parentNode : R = Hf(x, [z]), R.contains(k) || R.appendChild(k), b.state.isMounted = !0, fi(), process.env.NODE_ENV !== "production" && Nt(b.props.interactive && x === $e.appendTo && z.nextElementSibling !== k, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function Ft() {
    return ls(k.querySelectorAll("[data-tippy-root]"));
  }
  function vr(x) {
    b.clearDelayTimeouts(), x && ae("onTrigger", [b, x]), nt();
    var R = G(!0), z = N(), X = z[0], q = z[1];
    ft.isTouch && X === "hold" && q && (R = q), R ? r = setTimeout(function() {
      b.show();
    }, R) : b.show();
  }
  function un(x) {
    if (b.clearDelayTimeouts(), ae("onUntrigger", [b, x]), !b.state.isVisible) {
      kt();
      return;
    }
    if (!(b.props.trigger.indexOf("mouseenter") >= 0 && b.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(x.type) >= 0 && o)) {
      var R = G(!1);
      R ? i = setTimeout(function() {
        b.state.isVisible && b.hide();
      }, R) : s = requestAnimationFrame(function() {
        b.hide();
      });
    }
  }
  function wr() {
    b.state.isEnabled = !0;
  }
  function pi() {
    b.hide(), b.state.isEnabled = !1;
  }
  function mi() {
    clearTimeout(r), clearTimeout(i), cancelAnimationFrame(s);
  }
  function gi(x) {
    if (process.env.NODE_ENV !== "production" && Nt(b.state.isDestroyed, Un("setProps")), !b.state.isDestroyed) {
      ae("onBeforeUpdate", [b, x]), ci();
      var R = b.props, z = qc(n, Object.assign({}, R, _c(x), {
        ignoreAttributes: !0
      }));
      b.props = z, Vn(), R.interactiveDebounce !== z.interactiveDebounce && (He(), p = Vc(ui, z.interactiveDebounce)), R.triggerTarget && !z.triggerTarget ? Gn(R.triggerTarget).forEach(function(X) {
        X.removeAttribute("aria-expanded");
      }) : z.triggerTarget && n.removeAttribute("aria-expanded"), Be(), ee(), T && T(R, z), b.popperInstance && (fi(), Ft().forEach(function(X) {
        requestAnimationFrame(X._tippy.popperInstance.forceUpdate);
      })), ae("onAfterUpdate", [b, x]);
    }
  }
  function yi(x) {
    b.setProps({
      content: x
    });
  }
  function Th() {
    process.env.NODE_ENV !== "production" && Nt(b.state.isDestroyed, Un("show"));
    var x = b.state.isVisible, R = b.state.isDestroyed, z = !b.state.isEnabled, X = ft.isTouch && !b.props.touch, q = Ao(b.props.duration, 0, $e.duration);
    if (!(x || R || z || X) && !Y().hasAttribute("disabled") && (ae("onShow", [b], !1), b.props.onShow(b) !== !1)) {
      if (b.state.isVisible = !0, K() && (k.style.visibility = "visible"), ee(), nt(), b.state.isMounted || (k.style.transition = "none"), K()) {
        var Ae = Z(), Ke = Ae.box, $n = Ae.content;
        Eo([Ke, $n], 0);
      }
      f = function() {
        var dn;
        if (!(!b.state.isVisible || c)) {
          if (c = !0, k.offsetHeight, k.style.transition = b.props.moveTransition, K() && b.props.animation) {
            var so = Z(), bi = so.box, _n = so.content;
            Eo([bi, _n], q), jc([bi, _n], "visible");
          }
          ye(), Be(), $c(Oo, b), (dn = b.popperInstance) == null || dn.forceUpdate(), ae("onMount", [b]), b.props.animation && K() && Ct(q, function() {
            b.state.isShown = !0, ae("onShown", [b]);
          });
        }
      }, xt();
    }
  }
  function Oh() {
    process.env.NODE_ENV !== "production" && Nt(b.state.isDestroyed, Un("hide"));
    var x = !b.state.isVisible, R = b.state.isDestroyed, z = !b.state.isEnabled, X = Ao(b.props.duration, 1, $e.duration);
    if (!(x || R || z) && (ae("onHide", [b], !1), b.props.onHide(b) !== !1)) {
      if (b.state.isVisible = !1, b.state.isShown = !1, c = !1, o = !1, K() && (k.style.visibility = "hidden"), He(), kt(), ee(!0), K()) {
        var q = Z(), Ae = q.box, Ke = q.content;
        b.props.animation && (Eo([Ae, Ke], X), jc([Ae, Ke], "hidden"));
      }
      ye(), Be(), b.props.animation ? K() && Fn(X, b.unmount) : b.unmount();
    }
  }
  function Nh(x) {
    process.env.NODE_ENV !== "production" && Nt(b.state.isDestroyed, Un("hideWithInteractivity")), J().addEventListener("mousemove", p), $c(Ti, p), p(x);
  }
  function Dh() {
    process.env.NODE_ENV !== "production" && Nt(b.state.isDestroyed, Un("unmount")), b.state.isVisible && b.hide(), b.state.isMounted && (hi(), Ft().forEach(function(x) {
      x._tippy.unmount();
    }), k.parentNode && k.parentNode.removeChild(k), Oo = Oo.filter(function(x) {
      return x !== b;
    }), b.state.isMounted = !1, ae("onHidden", [b]));
  }
  function Lh() {
    process.env.NODE_ENV !== "production" && Nt(b.state.isDestroyed, Un("destroy")), !b.state.isDestroyed && (b.clearDelayTimeouts(), b.unmount(), ci(), delete n._tippy, b.state.isDestroyed = !0, ae("onDestroy", [b]));
  }
}
function Bn(n, e) {
  e === void 0 && (e = {});
  var t = $e.plugins.concat(e.plugins || []);
  process.env.NODE_ENV !== "production" && (a1(n), _f(e, t)), r1();
  var r = Object.assign({}, e, {
    plugins: t
  }), i = Qb(n);
  if (process.env.NODE_ENV !== "production") {
    var s = Zr(r.content), o = i.length > 1;
    Nt(s && o, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var l = i.reduce(function(a, c) {
    var u = c && m1(c, r);
    return u && a.push(u), a;
  }, []);
  return Zr(n) ? l[0] : l;
}
Bn.defaultProps = $e;
Bn.setDefaultProps = d1;
Bn.currentInput = ft;
Object.assign({}, Mf, {
  effect: function(e) {
    var t = e.state, r = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow);
  }
});
Bn.setDefaultProps({
  render: jf
});
class g1 {
  constructor({ editor: e, element: t, view: r, tippyOptions: i = {}, updateDelay: s = 250, shouldShow: o }) {
    this.preventHide = !1, this.shouldShow = ({ view: l, state: a, from: c, to: u }) => {
      const { doc: d, selection: f } = a, { empty: h } = f, p = !d.textBetween(c, u).length && ta(a.selection), m = this.element.contains(document.activeElement);
      return !(!(l.hasFocus() || m) || h || p || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.dragstartHandler = () => {
      this.hide();
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: l }) => {
      var a;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      l != null && l.relatedTarget && (!((a = this.element.parentNode) === null || a === void 0) && a.contains(l.relatedTarget)) || (l == null ? void 0 : l.relatedTarget) !== this.editor.view.dom && this.hide();
    }, this.tippyBlurHandler = (l) => {
      this.blurHandler({ event: l });
    }, this.handleDebouncedUpdate = (l, a) => {
      const c = !(a != null && a.selection.eq(l.state.selection)), u = !(a != null && a.doc.eq(l.state.doc));
      !c && !u || (this.updateDebounceTimer && clearTimeout(this.updateDebounceTimer), this.updateDebounceTimer = window.setTimeout(() => {
        this.updateHandler(l, c, u, a);
      }, this.updateDelay));
    }, this.updateHandler = (l, a, c, u) => {
      var d, f, h;
      const { state: p, composing: m } = l, { selection: g } = p;
      if (m || !a && !c)
        return;
      this.createTooltip();
      const { ranges: w } = g, C = Math.min(...w.map((k) => k.$from.pos)), b = Math.max(...w.map((k) => k.$to.pos));
      if (!((d = this.shouldShow) === null || d === void 0 ? void 0 : d.call(this, {
        editor: this.editor,
        element: this.element,
        view: l,
        state: p,
        oldState: u,
        from: C,
        to: b
      }))) {
        this.hide();
        return;
      }
      (f = this.tippy) === null || f === void 0 || f.setProps({
        getReferenceClientRect: ((h = this.tippyOptions) === null || h === void 0 ? void 0 : h.getReferenceClientRect) || (() => {
          if (t0(p.selection)) {
            let k = l.nodeDOM(C);
            if (k) {
              const T = k.dataset.nodeViewWrapper ? k : k.querySelector("[data-node-view-wrapper]");
              if (T && (k = T.firstChild), k)
                return k.getBoundingClientRect();
            }
          }
          return Cf(l, C, b);
        })
      }), this.show();
    }, this.editor = e, this.element = t, this.view = r, this.updateDelay = s, o && (this.shouldShow = o), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = i, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = Bn(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    const { state: r } = e, i = r.selection.from !== r.selection.to;
    if (this.updateDelay > 0 && i) {
      this.handleDebouncedUpdate(e, t);
      return;
    }
    const s = !(t != null && t.selection.eq(e.state.selection)), o = !(t != null && t.doc.eq(e.state.doc));
    this.updateHandler(e, s, o, t);
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.removeEventListener("dragstart", this.dragstartHandler), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const Wf = (n) => new le({
  key: typeof n.pluginKey == "string" ? new ue(n.pluginKey) : n.pluginKey,
  view: (e) => new g1({ view: e, ...n })
});
fe.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "bubbleMenu",
      updateDelay: void 0,
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Wf({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        updateDelay: this.options.updateDelay,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
class y1 {
  getTextContent(e) {
    return wf(e, { textSerializers: Zl(this.editor.schema) });
  }
  constructor({ editor: e, element: t, view: r, tippyOptions: i = {}, shouldShow: s }) {
    this.preventHide = !1, this.shouldShow = ({ view: o, state: l }) => {
      const { selection: a } = l, { $anchor: c, empty: u } = a, d = c.depth === 1, f = c.parent.isTextblock && !c.parent.type.spec.code && !c.parent.textContent && c.parent.childCount === 0 && !this.getTextContent(c.parent);
      return !(!o.hasFocus() || !u || !d || !f || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: o }) => {
      var l;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      o != null && o.relatedTarget && (!((l = this.element.parentNode) === null || l === void 0) && l.contains(o.relatedTarget)) || (o == null ? void 0 : o.relatedTarget) !== this.editor.view.dom && this.hide();
    }, this.tippyBlurHandler = (o) => {
      this.blurHandler({ event: o });
    }, this.editor = e, this.element = t, this.view = r, s && (this.shouldShow = s), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = i, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = Bn(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "right",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    var r, i, s;
    const { state: o } = e, { doc: l, selection: a } = o, { from: c, to: u } = a;
    if (t && t.doc.eq(l) && t.selection.eq(a))
      return;
    if (this.createTooltip(), !((r = this.shouldShow) === null || r === void 0 ? void 0 : r.call(this, {
      editor: this.editor,
      view: e,
      state: o,
      oldState: t
    }))) {
      this.hide();
      return;
    }
    (i = this.tippy) === null || i === void 0 || i.setProps({
      getReferenceClientRect: ((s = this.tippyOptions) === null || s === void 0 ? void 0 : s.getReferenceClientRect) || (() => Cf(e, c, u))
    }), this.show();
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const Uf = (n) => new le({
  key: typeof n.pluginKey == "string" ? new ue(n.pluginKey) : n.pluginKey,
  view: (e) => new y1({ view: e, ...n })
});
fe.create({
  name: "floatingMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "floatingMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Uf({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
const b1 = dr({
  name: "BubbleMenu",
  props: {
    pluginKey: {
      type: [String, Object],
      default: "bubbleMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    updateDelay: {
      type: Number,
      default: void 0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = Fs(null);
    return Du(() => {
      const { updateDelay: r, editor: i, pluginKey: s, shouldShow: o, tippyOptions: l } = n;
      i.registerPlugin(Wf({
        updateDelay: r,
        editor: i,
        element: t.value,
        pluginKey: s,
        shouldShow: o,
        tippyOptions: l
      }));
    }), Dl(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return fr("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
function Yc(n) {
  return zh((e, t) => ({
    get() {
      return e(), n;
    },
    set(r) {
      n = r, requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          t();
        });
      });
    }
  }));
}
class Kf extends L0 {
  constructor(e = {}) {
    return super(e), this.contentComponent = null, this.appContext = null, this.reactiveState = Yc(this.view.state), this.reactiveExtensionStorage = Yc(this.extensionStorage), this.on("beforeTransaction", ({ nextState: t }) => {
      this.reactiveState.value = t, this.reactiveExtensionStorage.value = this.extensionStorage;
    }), Nu(this);
  }
  get state() {
    return this.reactiveState ? this.reactiveState.value : this.view.state;
  }
  get storage() {
    return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
  }
  /**
   * Register a ProseMirror plugin.
   */
  registerPlugin(e, t) {
    const r = super.registerPlugin(e, t);
    return this.reactiveState && (this.reactiveState.value = r), r;
  }
  /**
   * Unregister a ProseMirror plugin.
   */
  unregisterPlugin(e) {
    const t = super.unregisterPlugin(e);
    return this.reactiveState && t && (this.reactiveState.value = t), t;
  }
}
const v1 = dr({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(n) {
    const e = Fs(), t = Ph();
    return Bh(() => {
      const r = n.editor;
      r && r.options.element && e.value && Hh(() => {
        if (!e.value || !r.options.element.firstChild)
          return;
        const i = Fh(e.value);
        e.value.append(...r.options.element.childNodes), r.contentComponent = t.ctx._, t && (r.appContext = {
          ...t.appContext,
          // Vue internally uses prototype chain to forward/shadow injects across the entire component chain
          // so don't use object spread operator or 'Object.assign' and just set `provides` as is on editor's appContext
          // @ts-expect-error forward instance's 'provides' into appContext
          provides: t.provides
        }), r.setOptions({
          element: i
        }), r.createNodeViews();
      });
    }), Dl(() => {
      const r = n.editor;
      r && (r.contentComponent = null, r.appContext = null);
    }), { rootEl: e };
  },
  render() {
    return fr("div", {
      ref: (n) => {
        this.rootEl = n;
      }
    });
  }
});
dr({
  name: "FloatingMenu",
  props: {
    pluginKey: {
      // TODO: TypeScript breaks :(
      // type: [String, Object as PropType<Exclude<FloatingMenuPluginProps['pluginKey'], string>>],
      type: null,
      default: "floatingMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = Fs(null);
    return Du(() => {
      const { pluginKey: r, editor: i, tippyOptions: s, shouldShow: o } = n;
      i.registerPlugin(Uf({
        pluginKey: r,
        editor: i,
        element: t.value,
        tippyOptions: s,
        shouldShow: o
      }));
    }), Dl(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return fr("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
const w1 = dr({
  name: "NodeViewContent",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return fr(this.as, {
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-node-view-content": ""
    });
  }
}), k1 = dr({
  name: "NodeViewWrapper",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  inject: ["onDragStart", "decorationClasses"],
  render() {
    var n, e;
    return fr(this.as, {
      // @ts-ignore
      class: this.decorationClasses,
      style: {
        whiteSpace: "normal"
      },
      "data-node-view-wrapper": "",
      // @ts-ignore (https://github.com/vuejs/vue-next/issues/3031)
      onDragstart: this.onDragStart
    }, (e = (n = this.$slots).default) === null || e === void 0 ? void 0 : e.call(n));
  }
});
class qf {
  constructor(e, { props: t = {}, editor: r }) {
    this.editor = r, this.component = Nu(e), this.el = document.createElement("div"), this.props = Ih(t), this.renderedComponent = this.renderComponent();
  }
  get element() {
    return this.renderedComponent.el;
  }
  get ref() {
    var e, t, r, i;
    return !((t = (e = this.renderedComponent.vNode) === null || e === void 0 ? void 0 : e.component) === null || t === void 0) && t.exposed ? this.renderedComponent.vNode.component.exposed : (i = (r = this.renderedComponent.vNode) === null || r === void 0 ? void 0 : r.component) === null || i === void 0 ? void 0 : i.proxy;
  }
  renderComponent() {
    let e = fr(this.component, this.props);
    return this.editor.appContext && (e.appContext = this.editor.appContext), typeof document < "u" && this.el && Sa(e, this.el), { vNode: e, destroy: () => {
      this.el && Sa(null, this.el), this.el = null, e = null;
    }, el: this.el ? this.el.firstElementChild : null };
  }
  updateProps(e = {}) {
    Object.entries(e).forEach(([t, r]) => {
      this.props[t] = r;
    }), this.renderComponent();
  }
  destroy() {
    this.renderedComponent.destroy();
  }
}
class C1 extends I0 {
  mount() {
    const e = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      innerDecorations: this.innerDecorations,
      view: this.view,
      selected: !1,
      extension: this.extension,
      HTMLAttributes: this.HTMLAttributes,
      getPos: () => this.getPos(),
      updateAttributes: (i = {}) => this.updateAttributes(i),
      deleteNode: () => this.deleteNode()
    }, t = this.onDragStart.bind(this);
    this.decorationClasses = Fs(this.getDecorationClasses());
    const r = dr({
      extends: { ...this.component },
      props: Object.keys(e),
      template: this.component.template,
      setup: (i) => {
        var s, o;
        return xa("onDragStart", t), xa("decorationClasses", this.decorationClasses), (o = (s = this.component).setup) === null || o === void 0 ? void 0 : o.call(s, i, {
          expose: () => {
          }
        });
      },
      // add support for scoped styles
      // @ts-ignore
      // eslint-disable-next-line
      __scopeId: this.component.__scopeId,
      // add support for CSS Modules
      // @ts-ignore
      // eslint-disable-next-line
      __cssModules: this.component.__cssModules,
      // add support for vue devtools
      // @ts-ignore
      // eslint-disable-next-line
      __name: this.component.__name,
      // @ts-ignore
      // eslint-disable-next-line
      __file: this.component.__file
    });
    this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this), this.editor.on("selectionUpdate", this.handleSelectionUpdate), this.renderer = new qf(r, {
      editor: this.editor,
      props: e
    });
  }
  /**
   * Return the DOM element.
   * This is the element that will be used to display the node view.
   */
  get dom() {
    if (!this.renderer.element || !this.renderer.element.hasAttribute("data-node-view-wrapper"))
      throw Error("Please use the NodeViewWrapper component for your node view.");
    return this.renderer.element;
  }
  /**
   * Return the content DOM element.
   * This is the element that will be used to display the rich-text content of the node.
   */
  get contentDOM() {
    return this.node.isLeaf ? null : this.dom.querySelector("[data-node-view-content]");
  }
  /**
   * On editor selection update, check if the node is selected.
   * If it is, call `selectNode`, otherwise call `deselectNode`.
   */
  handleSelectionUpdate() {
    const { from: e, to: t } = this.editor.state.selection, r = this.getPos();
    if (typeof r == "number")
      if (e <= r && t >= r + this.node.nodeSize) {
        if (this.renderer.props.selected)
          return;
        this.selectNode();
      } else {
        if (!this.renderer.props.selected)
          return;
        this.deselectNode();
      }
  }
  /**
   * On update, update the React component.
   * To prevent unnecessary updates, the `update` option can be used.
   */
  update(e, t, r) {
    const i = (s) => {
      this.decorationClasses.value = this.getDecorationClasses(), this.renderer.updateProps(s);
    };
    if (typeof this.options.update == "function") {
      const s = this.node, o = this.decorations, l = this.innerDecorations;
      return this.node = e, this.decorations = t, this.innerDecorations = r, this.options.update({
        oldNode: s,
        oldDecorations: o,
        newNode: e,
        newDecorations: t,
        oldInnerDecorations: l,
        innerDecorations: r,
        updateProps: () => i({ node: e, decorations: t, innerDecorations: r })
      });
    }
    return e.type !== this.node.type ? !1 : (e === this.node && this.decorations === t && this.innerDecorations === r || (this.node = e, this.decorations = t, this.innerDecorations = r, i({ node: e, decorations: t, innerDecorations: r })), !0);
  }
  /**
   * Select the node.
   * Add the `selected` prop and the `ProseMirror-selectednode` class.
   */
  selectNode() {
    this.renderer.updateProps({
      selected: !0
    }), this.renderer.element && this.renderer.element.classList.add("ProseMirror-selectednode");
  }
  /**
   * Deselect the node.
   * Remove the `selected` prop and the `ProseMirror-selectednode` class.
   */
  deselectNode() {
    this.renderer.updateProps({
      selected: !1
    }), this.renderer.element && this.renderer.element.classList.remove("ProseMirror-selectednode");
  }
  getDecorationClasses() {
    return this.decorations.map((e) => e.type.attrs.class).flat().join(" ");
  }
  destroy() {
    this.renderer.destroy(), this.editor.off("selectionUpdate", this.handleSelectionUpdate);
  }
}
function x1(n, e) {
  return (t) => {
    if (!t.editor.contentComponent)
      return {};
    const r = typeof n == "function" && "__vccOpts" in n ? n.__vccOpts : n;
    return new C1(r, t, e);
  };
}
const S1 = {
  toolbar: {
    headings: {
      normal: "Normal",
      h1: "Titre 1",
      h2: "Titre 2",
      h3: "Titre 3"
    },
    undo: "Annuler",
    bold: "Gras",
    italic: "Italique",
    underline: "Souligné",
    strike: "Barré",
    highlight: "Surligner",
    textColor: "Couleur du texte",
    align: {
      left: "Aligner à gauche",
      center: "Centrer",
      right: "Aligner à droite",
      justify: "Justifier"
    },
    list: {
      bullet: "Liste à puces",
      ordered: "Liste ordonnée"
    },
    link: {
      title: "Lien",
      modal_title: "Insérer un lien",
      url: "Saisissez une URL"
    },
    image: {
      title: "Image",
      import: "Importer",
      url: "Via URL",
      url_title: "Lien",
      url_insert: "Insérer",
      media: "Média",
      modal_title: "Insérer une image",
      import_drag: "Glissez déposez ou",
      import_download: "cliquez pour télécharger",
      youtube: "Vidéo"
    },
    table: {
      modal_title: "Insérer un tableau",
      columns: "Colonnes",
      rows: "Lignes",
      header: "Inclure en-tête",
      delete: "Supprimer",
      add_column_before: "Ajouter une colonne avant"
    },
    video: {
      modal_title: "Insérer une vidéo",
      url: "Saisissez une URL de vidéo"
    },
    insert: "Insérer",
    format: "Format",
    panel: {
      title: "Volet d'informations",
      type: {
        info: "Informations",
        warning: "Avertissement",
        error: "Erreur"
      }
    }
  },
  placeholder: {
    default: "Commencez à écrire..."
  },
  modal: {
    close: "Fermer"
  },
  mediaLibrary: {
    title: "Bibliothèque de médias",
    upload: "Télécharger",
    url: "URL",
    files: "Fichiers",
    file: "Fichier",
    search: {
      placeholder: "Tapez pour rechercher...",
      button: "Rechercher"
    },
    attributes: {
      title: "Informations",
      dimensions: "Dimensions",
      uploaded_by: "Téléchargé par"
    },
    actions: {
      delete: {
        title: "Supprimer",
        confirm: "Confirmer la suppression"
      },
      insert: "Insérer"
    }
  }
}, M1 = {
  toolbar: {
    headings: {
      normal: "Normal",
      h1: "Heading 1",
      h2: "Heading 2",
      h3: "Heading 3"
    },
    undo: "Undo",
    bold: "Bold",
    italic: "Italic",
    underline: "Underline",
    strike: "Strikethrough",
    highlight: "Highlight",
    textColor: "Text Color",
    align: {
      left: "Align Left",
      center: "Center",
      right: "Align Right",
      justify: "Justify"
    },
    list: {
      bullet: "Bullet List",
      ordered: "Ordered List"
    },
    link: {
      title: "Link",
      modal_title: "Insert a Link",
      url: "Enter a URL"
    },
    image: {
      title: "Image",
      import: "Import",
      url: "Via URL",
      url_title: "Link",
      url_insert: "Insert",
      media: "Media",
      modal_title: "Insert an Image",
      import_drag: "Drag and drop or",
      import_download: "click to upload",
      youtube: "Video"
    },
    table: {
      modal_title: "Insert a Table",
      columns: "Columns",
      rows: "Rows",
      header: "Include Header",
      delete: "Delete",
      add_column_before: "Add Column Before"
    },
    video: {
      modal_title: "Insert a Video",
      url: "Enter a Video URL"
    },
    insert: "Insert",
    format: "Format",
    panel: {
      title: "Section",
      type: {
        info: "Informations",
        warning: "Warning",
        error: "Error"
      }
    }
  },
  placeholder: {
    default: "Start writing..."
  },
  modal: {
    close: "Close"
  },
  mediaLibrary: {
    title: "Media Library",
    upload: "Upload",
    url: "URL",
    files: "Files",
    file: "File",
    search: {
      placeholder: "Type to search...",
      button: "Search"
    },
    attributes: {
      title: "Information",
      dimensions: "Dimensions",
      uploaded_by: "Uploaded by"
    },
    actions: {
      delete: {
        title: "Delete",
        confirm: "Confirm Deletion"
      },
      insert: "Insert"
    }
  }
}, no = {
  methods: {
    translate: function(n, e) {
      const t = {
        fr: S1,
        en: M1
      };
      try {
        var r = n.split(".").reduce(function(i, s, o) {
          return typeof i == "object" ? i[s] : t[e][i][s];
        });
      } catch (i) {
        console.warn("No translation found for namespace %s using locale %s (%s)", n, e, i);
      }
      return r;
    }
  }
}, Hn = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, A1 = {
  name: "Popover",
  components: {},
  props: {
    // Icon name from Font Awesome
    icon: {
      type: String,
      required: !1
    },
    // Text to display for toggle button
    text: {
      type: String,
      required: !1
    },
    // Position of the popover content
    position: {
      type: String,
      default: "bottom"
      // top, bottom, left, right
    },
    // Style object for the popover content
    popoverContentStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    id: "popover-" + Math.random().toString(36).substr(2, 9),
    isOpen: !1
  }),
  created() {
    this.calculatePosition(), document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    calculatePosition() {
      const n = this.$refs.popoverContent;
      if (n) {
        const e = n.children[0].offsetWidth, t = n.children[0].offsetHeight, r = n.previousElementSibling.offsetWidth, i = n.previousElementSibling.offsetHeight, s = 10;
        switch (this.position) {
          case "top":
            n.style.left = `calc(50% - ${e / 2}px)`, n.style.bottom = `${i + s}px`;
            break;
          case "left":
            n.style.top = `calc(50% - ${t / 2}px)`, n.style.right = `${r + s}px`;
            break;
          case "right":
            n.style.top = `calc(50% - ${t / 2}px)`, n.style.left = `${r + s}px`;
            break;
          case "bottom":
          default:
            n.style.left = "-4px", n.style.top = `${i + s}px`;
            break;
        }
      }
    },
    onClickToggle() {
      this.isOpen = !this.isOpen, this.isOpen && this.calculatePosition();
    },
    onFocusOut() {
      this.isOpen = !1;
    },
    handleClickOutside(n) {
      n.target.closest("#" + this.id) || (this.isOpen = !1);
    }
  }
}, E1 = ["id"], T1 = { key: 0 }, O1 = { class: "material-symbols-outlined" }, N1 = ["id"];
function D1(n, e, t, r, i, s) {
  return D(), P("div", {
    id: n.id,
    class: "popover-container",
    onFocusout: e[1] || (e[1] = (...o) => s.onFocusOut && s.onFocusOut(...o))
  }, [
    v("div", {
      onClick: e[0] || (e[0] = (...o) => s.onClickToggle && s.onClickToggle(...o))
    }, [
      t.text ? (D(), P("span", T1, [
        Ki(V(t.text) + " ", 1),
        e[2] || (e[2] = v("span", { class: "material-symbols-outlined" }, "keyboard_arrow_down", -1))
      ])) : _("", !0),
      v("span", O1, V(t.icon), 1)
    ]),
    kn(Lu, { name: "fade" }, {
      default: rt(() => [
        Fe(v("div", {
          class: "popover-content tw-shadow tw-rounded",
          ref: "popoverContent",
          id: "popover-content-" + n.id,
          style: zs(t.popoverContentStyle)
        }, [
          Ru(n.$slots, "default", {}, void 0, !0)
        ], 12, N1), [
          [Iu, n.isOpen]
        ])
      ]),
      _: 3
    })
  ], 40, E1);
}
const L1 = /* @__PURE__ */ Hn(A1, [["render", D1], ["__scopeId", "data-v-d2fe65a0"]]), R1 = {
  props: {
    name: {
      type: String,
      required: !0
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "auto"
    },
    transition: {
      type: String,
      default: "fade"
    },
    delay: {
      type: Number,
      default: 0
    },
    clickToClose: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      isOpened: !1
    };
  },
  mounted() {
    this.open();
  },
  methods: {
    open() {
      this.$emit("beforeOpen"), this.isOpened = !0, this.$refs.modal_container.style.width = this.width, this.$refs.modal_container.style.height = this.height, this.$refs.modal_container.style.zIndex = 999999, this.$refs.modal_container.style.opacity = 1;
    },
    close() {
      this.$refs.modal_container.style.zIndex = -999999, this.$refs.modal_container.style.opacity = 0, this.$emit("closed");
    },
    onFocusOut() {
      this.clickToClose && this.close();
    }
  }
}, I1 = ["id"];
function P1(n, e, t, r, i, s) {
  return D(), qt(Lu, {
    name: t.transition,
    duration: t.delay
  }, {
    default: rt(() => [
      Fe(v("div", {
        id: "modal___" + t.name,
        class: "modal___container",
        ref: "modal_container",
        onFocusout: e[0] || (e[0] = (...o) => s.onFocusOut && s.onFocusOut(...o))
      }, [
        Ru(n.$slots, "default", {}, void 0, !0)
      ], 40, I1), [
        [Iu, i.isOpened]
      ])
    ]),
    _: 3
  }, 8, ["name", "duration"]);
}
const Jf = /* @__PURE__ */ Hn(R1, [["render", P1], ["__scopeId", "data-v-eaff321e"]]), B1 = {
  name: "Toolbar",
  components: {
    Modal: Jf,
    Popover: L1,
    BubbleMenu: b1
  },
  mixins: [no],
  props: {
    editorProp: {
      type: Kf,
      required: !0
    },
    // Extensions to display in the toolbar
    extensions: {
      type: Array,
      required: !0
    },
    displayMediaLibrary: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  inject: ["locale"],
  emits: ["importImage", "showMediaLibrary"],
  data() {
    return {
      heading: 0,
      fontFamily: "Arial",
      fontSize: "16px",
      color: "#000",
      lineHeight: 1.15,
      // Extensions values
      fontSizes: [
        "8px",
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "24px"
      ],
      lineHeights: [
        {
          label: "1.15",
          value: 1.15
        },
        {
          label: "1.50",
          value: 1.5
        },
        {
          label: "Double",
          value: 3
        }
      ],
      editor: void 0,
      locale: this.locale,
      urlIconNotFound: !1,
      // Image
      imageModal: !1,
      imageMethod: "import",
      imageImported: null,
      // Table
      tableModal: !1,
      tableColumns: 3,
      tableRows: 3,
      tableHeader: !0,
      // Video
      videoModal: !1,
      videoUrl: "",
      // Link
      linkModal: !1,
      linkUrl: ""
    };
  },
  watch: {
    // Extensions
    heading: {
      handler(n) {
        this.triggerHeading(n);
      }
    },
    fontFamily: {
      handler(n) {
        this.setFontFamily(n);
      }
    },
    fontSize: {
      handler(n) {
        this.setFontSize(n);
      }
    },
    color: {
      handler(n) {
        this.setColor(n);
      }
    }
  },
  mounted() {
    this.editor = this.editorProp;
  },
  beforeUnmount() {
  },
  methods: {
    triggerHeading(n) {
      const e = n >= 1 && n <= 3;
      this.editor.chain().focus().toggleHeading({ level: e ? n : 4 }).run();
    },
    setFontFamily(n) {
      this.editor.chain().focus().setFontFamily(n).run();
    },
    setFontSize(n) {
      this.editor.chain().focus().setFontSize(n).run();
    },
    setColor(n) {
      this.editor.chain().focus().setColor(n).run();
    },
    setTextAlign(n) {
      this.editor.chain().focus().setTextAlign(n).run(), this.editor.chain().focus().setImgPosition(n).run(), this.editor.chain().focus().setFilePosition(n).run(), this.editor.chain().focus().setVideoPosition(n).run();
    },
    setLink() {
      const n = this.editor.getAttributes("link").href, e = window.prompt("URL", n);
      if (e !== null) {
        if (e === "") {
          this.editor.chain().focus().extendMarkRange("link").unsetLink().run();
          return;
        }
        this.editor.chain().focus().extendMarkRange("link").setLink({ href: e }).run();
      }
    },
    openImageModal() {
      this.imageModal = !0;
    },
    openYoutubeModal() {
      this.videoModal = !0;
    },
    openTableModal() {
      this.tableModal = !0;
    },
    openLinkModal() {
      this.linkModal = !0;
    },
    importFromComputer() {
      document.getElementById("import_file").click();
    },
    copyLink(n) {
      navigator.clipboard.writeText(n);
    },
    addPanel() {
      this.editor.chain().focus().insertContent('<div data-plugin="panel" data-type="info"><div><p></p></div></div>').run(), this.$refs.insertPopover.onFocusOut();
    }
  },
  computed: {
    headingLevels() {
      var n = [];
      return this.extensions.includes("h1") && n.push(1), this.extensions.includes("h2") && n.push(2), this.extensions.includes("h3") && n.push(3), n;
    },
    displaySeparator() {
      return this.extensions.includes("left") || this.extensions.includes("center") || this.extensions.includes("right") || this.extensions.includes("justify") || this.extensions.includes("ul") || this.extensions.includes("ol") || this.extensions.includes("table");
    },
    toolbarClasses() {
      return this.$attrs.toolbar_classes === void 0 ? "" : this.$attrs.toolbar_classes;
    },
    colors() {
      return this.$attrs.palette === void 0 ? "" : this.$attrs.palette;
    },
    fontFamilies() {
      return this.$attrs.font_families === void 0 ? "" : this.$attrs.font_families;
    }
  }
}, H1 = { class: "editor-toolbar--list" }, F1 = ["value"], z1 = ["value"], V1 = {
  key: 0,
  value: 0
}, $1 = ["value"], _1 = ["title"], j1 = ["title"], W1 = ["title"], U1 = { class: "editor-image--popover" }, K1 = ["title"], q1 = ["title"], J1 = ["title"], G1 = ["title"], Y1 = ["title"], X1 = ["title"], Q1 = ["title"], Z1 = ["title"], ev = ["title"], tv = ["title"], nv = ["title"], rv = { class: "editor-color-picker--popover" }, iv = ["onClick"], sv = ["title"], ov = ["title"], lv = ["title"], av = ["title"], cv = ["title"], uv = ["title"], dv = ["title"], fv = ["title"], hv = ["title"], pv = ["title"], mv = ["title"], gv = { class: "editor-image--popover" }, yv = ["title"], bv = ["title"], vv = ["title"], wv = { class: "insert-image--modal-head" }, kv = { class: "insert-image--modal-head-title" }, Cv = { style: { "margin-top": "0" } }, xv = ["title"], Sv = { class: "insert-image--modal-content" }, Mv = {
  key: 0,
  class: "insert-image--import-file"
}, Av = {
  key: 1,
  class: "insert-image--from-url"
}, Ev = { for: "image-url" }, Tv = { class: "insert-image--from-url-button" }, Ov = { class: "insert-video--modal-head" }, Nv = { class: "insert-video--modal-head-title" }, Dv = { style: { "margin-top": "0" } }, Lv = ["title"], Rv = { class: "insert-video--modal-content" }, Iv = { class: "insert-video--input" }, Pv = { for: "video-url" }, Bv = { class: "insert-video--button" }, Hv = { class: "insert-link--modal-head" }, Fv = { class: "insert-link--modal-head-title" }, zv = { style: { "margin-top": "0" } }, Vv = ["title"], $v = { class: "insert-link--modal-content" }, _v = { class: "insert-link--input" }, jv = { for: "link-url" }, Wv = { class: "insert-link--button" }, Uv = { class: "insert-table--modal-head" }, Kv = { class: "insert-table--modal-head-title" }, qv = { style: { "margin-top": "0" } }, Jv = ["title"], Gv = { class: "insert-table--modal-content" }, Yv = { class: "insert-table--inputs" }, Xv = { class: "insert-table--input" }, Qv = { for: "table-columns" }, Zv = { class: "insert-table--input" }, ew = { for: "table-rows" }, tw = { class: "insert-table--input-header" }, nw = { for: "table-header" }, rw = { class: "insert-table--button" };
function iw(n, e, t, r, i, s) {
  var a, c, u;
  const o = Xt("popover"), l = Xt("modal");
  return this.editor ? (D(), P("div", {
    key: 0,
    class: De(["editor-toolbar", s.toolbarClasses])
  }, [
    v("ul", H1, [
      this.extensions.includes("history") ? (D(), P("li", {
        key: 0,
        onClick: e[0] || (e[0] = Ne((d) => this.editor.chain().focus().undo().run(), ["stop", "prevent"]))
      }, e[50] || (e[50] = [
        v("span", { class: "material-symbols-outlined" }, "undo", -1)
      ]))) : _("", !0),
      this.extensions.includes("history") ? (D(), P("li", {
        key: 1,
        onClick: e[1] || (e[1] = Ne((d) => i.editor.chain().focus().redo().run(), ["stop", "prevent"]))
      }, e[51] || (e[51] = [
        v("span", { class: "material-symbols-outlined" }, "redo", -1)
      ]))) : _("", !0),
      this.extensions.includes("fontFamily") ? Fe((D(), P("select", {
        key: 2,
        "onUpdate:modelValue": e[2] || (e[2] = (d) => i.fontFamily = d)
      }, [
        (D(!0), P(it, null, yn(s.fontFamilies, (d) => (D(), P("option", {
          key: d,
          value: d
        }, V(d), 9, F1))), 128))
      ], 512)), [
        [Hi, i.fontFamily]
      ]) : _("", !0),
      this.extensions.includes("fontSize") ? Fe((D(), P("select", {
        key: 3,
        "onUpdate:modelValue": e[3] || (e[3] = (d) => i.fontSize = d)
      }, [
        (D(!0), P(it, null, yn(i.fontSizes, (d) => (D(), P("option", {
          key: d,
          value: d
        }, V(d), 9, z1))), 128))
      ], 512)), [
        [Hi, i.fontSize]
      ]) : _("", !0),
      this.extensions.includes("h1") || this.extensions.includes("h2") || this.extensions.includes("h3") ? Fe((D(), P("select", {
        key: 4,
        "onUpdate:modelValue": e[4] || (e[4] = (d) => i.heading = d)
      }, [
        (D(), P("option", V1, V(n.translate("toolbar.headings.normal", this.locale)), 1)),
        (D(!0), P(it, null, yn(s.headingLevels, (d) => (D(), P("option", {
          key: d,
          value: d
        }, V(n.translate("toolbar.headings.h" + d, this.locale)), 9, $1))), 128))
      ], 512)), [
        [Hi, i.heading]
      ]) : _("", !0),
      this.extensions.includes("bold") ? (D(), P("li", {
        key: 5,
        title: n.translate("toolbar.bold", this.locale),
        onClick: e[5] || (e[5] = Ne((d) => i.editor.chain().focus().toggleBold().run(), ["stop", "prevent"]))
      }, e[52] || (e[52] = [
        v("span", { class: "material-symbols-outlined" }, "format_bold", -1)
      ]), 8, _1)) : _("", !0),
      this.extensions.includes("italic") ? (D(), P("li", {
        key: 6,
        title: n.translate("toolbar.italic", this.locale),
        onClick: e[6] || (e[6] = Ne((d) => i.editor.chain().focus().toggleItalic().run(), ["stop", "prevent"]))
      }, e[53] || (e[53] = [
        v("span", { class: "material-symbols-outlined" }, "format_italic", -1)
      ]), 8, j1)) : _("", !0),
      this.extensions.includes("bold") || this.extensions.includes("italic") || this.extensions.includes("underline") || this.extensions.includes("strike") || this.extensions.includes("highlight") || this.extensions.includes("codeblock") ? (D(), P("li", {
        key: 7,
        title: n.translate("toolbar.format", this.locale),
        class: "editor-image"
      }, [
        kn(o, { icon: "more_horiz" }, {
          default: rt(() => [
            v("ul", U1, [
              this.extensions.includes("underline") ? (D(), P("li", {
                key: 0,
                class: "image-item",
                title: n.translate("toolbar.underline", this.locale),
                onClick: e[7] || (e[7] = Ne((d) => i.editor.chain().focus().toggleUnderline().run(), ["stop", "prevent"]))
              }, [
                e[54] || (e[54] = v("span", { class: "material-symbols-outlined" }, "format_underlined", -1)),
                v("span", null, V(n.translate("toolbar.underline", this.locale)), 1)
              ], 8, K1)) : _("", !0),
              this.extensions.includes("strike") ? (D(), P("li", {
                key: 1,
                class: "image-item",
                title: n.translate("toolbar.strike", this.locale),
                onClick: e[8] || (e[8] = Ne((d) => i.editor.chain().focus().toggleStrike().run(), ["stop", "prevent"]))
              }, [
                e[55] || (e[55] = v("span", { class: "material-symbols-outlined" }, "format_clear", -1)),
                v("span", null, V(n.translate("toolbar.strike", this.locale)), 1)
              ], 8, q1)) : _("", !0),
              this.extensions.includes("highlight") ? (D(), P("li", {
                key: 2,
                class: "image-item",
                title: n.translate("toolbar.highlight", this.locale),
                onClick: e[9] || (e[9] = Ne((d) => i.editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run(), ["stop", "prevent"]))
              }, [
                e[56] || (e[56] = v("span", { class: "material-symbols-outlined" }, "format_ink_highlighter", -1)),
                v("span", null, V(n.translate("toolbar.highlight", this.locale)), 1)
              ], 8, J1)) : _("", !0),
              this.extensions.includes("codeblock") ? (D(), P("li", {
                key: 3,
                class: "image-item",
                title: n.translate("toolbar.codeblock", this.locale),
                onClick: e[10] || (e[10] = Ne((d) => i.editor.chain().focus().toggleCodeBlock().run(), ["stop", "prevent"]))
              }, e[57] || (e[57] = [
                v("span", { class: "material-symbols-outlined" }, "code_blocks", -1),
                v("span", null, "Code", -1)
              ]), 8, G1)) : _("", !0)
            ])
          ]),
          _: 1
        })
      ], 8, W1)) : _("", !0),
      this.extensions.includes("left") ? (D(), P("li", {
        key: 8,
        title: n.translate("toolbar.align.left", this.locale),
        class: De({ "is-active": i.editor.isActive({ textAlign: "left" }) }),
        onClick: e[11] || (e[11] = Ne((d) => s.setTextAlign("left"), ["stop", "prevent"]))
      }, e[58] || (e[58] = [
        v("span", { class: "material-symbols-outlined" }, "format_align_left", -1)
      ]), 10, Y1)) : _("", !0),
      this.extensions.includes("center") ? (D(), P("li", {
        key: 9,
        title: n.translate("toolbar.align.center", this.locale),
        class: De({ "is-active": i.editor.isActive({ textAlign: "center" }) }),
        onClick: e[12] || (e[12] = Ne((d) => s.setTextAlign("center"), ["stop", "prevent"]))
      }, e[59] || (e[59] = [
        v("span", { class: "material-symbols-outlined" }, "format_align_center", -1)
      ]), 10, X1)) : _("", !0),
      this.extensions.includes("right") ? (D(), P("li", {
        key: 10,
        title: n.translate("toolbar.align.right", this.locale),
        class: De({ "is-active": i.editor.isActive({ textAlign: "right" }) }),
        onClick: e[13] || (e[13] = Ne((d) => s.setTextAlign("right"), ["stop", "prevent"]))
      }, e[60] || (e[60] = [
        v("span", { class: "material-symbols-outlined" }, "format_align_right", -1)
      ]), 10, Q1)) : _("", !0),
      this.extensions.includes("justify") ? (D(), P("li", {
        key: 11,
        title: n.translate("toolbar.align.justify", this.locale),
        class: De([{ "is-active": i.editor.isActive({ textAlign: "justify" }) }, "menubar__button"]),
        onClick: e[14] || (e[14] = Ne((d) => s.setTextAlign("justify"), ["stop", "prevent"]))
      }, e[61] || (e[61] = [
        v("span", { class: "material-symbols-outlined" }, "format_align_justify", -1)
      ]), 10, Z1)) : _("", !0),
      this.extensions.includes("ul") ? (D(), P("li", {
        key: 12,
        class: De({ "is-active": i.editor.isActive("bulletList") }),
        title: n.translate("toolbar.list.bullet", this.locale),
        onClick: e[15] || (e[15] = Ne((d) => i.editor.chain().focus().toggleBulletList().run(), ["stop", "prevent"]))
      }, e[62] || (e[62] = [
        v("span", { class: "material-symbols-outlined" }, "format_list_bulleted", -1)
      ]), 10, ev)) : _("", !0),
      this.extensions.includes("ol") ? (D(), P("li", {
        key: 13,
        class: De({ "is-active": i.editor.isActive("orderedList") }),
        title: n.translate("toolbar.list.ordered", this.locale),
        onClick: e[16] || (e[16] = Ne((d) => i.editor.chain().focus().toggleOrderedList().run(), ["stop", "prevent"]))
      }, e[63] || (e[63] = [
        v("span", { class: "material-symbols-outlined" }, "format_list_numbered", -1)
      ]), 10, tv)) : _("", !0),
      this.extensions.includes("color") ? (D(), P("li", {
        key: 14,
        title: n.translate("toolbar.textColor", this.locale),
        class: "editor-color-picker"
      }, [
        kn(o, { icon: "format_color_fill" }, {
          default: rt(() => [
            v("div", rv, [
              (D(!0), P(it, null, yn(s.colors, (d) => (D(), P("span", {
                onClick: (f) => s.setColor(d.value),
                style: zs({ backgroundColor: d.value, border: "1px solid grey", margin: "2px" })
              }, null, 12, iv))), 256))
            ])
          ]),
          _: 1
        })
      ], 8, nv)) : _("", !0),
      this.extensions.includes("link") ? (D(), P("li", {
        key: 15,
        class: "image-item",
        title: n.translate("toolbar.link.title", this.locale),
        onClick: e[17] || (e[17] = (...d) => s.openLinkModal && s.openLinkModal(...d))
      }, e[64] || (e[64] = [
        v("span", { class: "material-symbols-outlined" }, "link", -1)
      ]), 8, sv)) : _("", !0),
      this.extensions.includes("image") ? (D(), P("li", {
        key: 16,
        class: "image-item",
        title: n.translate("toolbar.image.title", this.locale),
        onClick: e[18] || (e[18] = (...d) => s.openImageModal && s.openImageModal(...d))
      }, e[65] || (e[65] = [
        v("span", { class: "material-symbols-outlined" }, "image", -1)
      ]), 8, ov)) : _("", !0),
      this.extensions.includes("table") && !((a = i.editor) != null && a.isActive("table")) ? (D(), P("li", {
        key: 17,
        onClick: e[19] || (e[19] = (...d) => s.openTableModal && s.openTableModal(...d))
      }, e[66] || (e[66] = [
        v("span", { class: "material-symbols-outlined" }, "table", -1)
      ]))) : _("", !0),
      this.extensions.includes("link") && ((c = i.editor) != null && c.isActive("link")) ? (D(), P(it, { key: 18 }, [
        e[68] || (e[68] = v("li", { class: "editor-separator" }, null, -1)),
        v("li", {
          onClick: e[20] || (e[20] = (d) => i.editor.chain().focus().extendMarkRange("link").unsetLink().run())
        }, e[67] || (e[67] = [
          v("span", { class: "material-symbols-outlined" }, "link_off", -1)
        ]))
      ], 64)) : _("", !0),
      this.extensions.includes("table") && ((u = i.editor) != null && u.isActive("table")) ? (D(), P(it, { key: 19 }, [
        e[77] || (e[77] = v("li", { class: "editor-separator" }, null, -1)),
        v("li", {
          onClick: e[21] || (e[21] = (d) => {
            var f;
            return (f = i.editor) == null ? void 0 : f.commands.deleteTable();
          }),
          title: n.translate("toolbar.table.delete", this.locale)
        }, e[69] || (e[69] = [
          v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            class: "h-5 w-5",
            fill: "currentColor"
          }, [
            v("path", { d: "M15.46,15.88L16.88,14.46L19,16.59L21.12,14.46L22.54,15.88L20.41,18L22.54,20.12L21.12,21.54L19,19.41L16.88,21.54L15.46,20.12L17.59,18L15.46,15.88M4,3H18A2,2 0 0,1 20,5V12.08C18.45,11.82 16.92,12.18 15.68,13H12V17H13.08C12.97,17.68 12.97,18.35 13.08,19H4A2,2 0 0,1 2,17V5A2,2 0 0,1 4,3M4,7V11H10V7H4M12,7V11H18V7H12M4,13V17H10V13H4Z" })
          ], -1)
        ]), 8, lv),
        v("li", {
          onClick: e[22] || (e[22] = (d) => {
            var f;
            return (f = i.editor) == null ? void 0 : f.commands.addColumnBefore();
          }),
          title: n.translate("toolbar.table.add_column_before", this.locale)
        }, e[70] || (e[70] = [
          v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            class: "h-5 w-5",
            fill: "currentColor"
          }, [
            v("path", { d: "M13,2A2,2 0 0,0 11,4V20A2,2 0 0,0 13,22H22V2H13M20,10V14H13V10H20M20,16V20H13V16H20M20,4V8H13V4H20M9,11H6V8H4V11H1V13H4V16H6V13H9V11Z" })
          ], -1)
        ]), 8, av),
        v("li", {
          onClick: e[23] || (e[23] = (d) => {
            var f;
            return (f = i.editor) == null ? void 0 : f.commands.addColumnAfter();
          }),
          title: n.translate("toolbar.table.add_column_after", this.locale)
        }, e[71] || (e[71] = [
          v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            class: "h-5 w-5",
            fill: "currentColor"
          }, [
            v("path", { d: "M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z" })
          ], -1)
        ]), 8, cv),
        v("li", {
          onClick: e[24] || (e[24] = (d) => {
            var f;
            return (f = i.editor) == null ? void 0 : f.commands.deleteColumn();
          }),
          title: n.translate("toolbar.table.delete_column", this.locale)
        }, e[72] || (e[72] = [
          v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            class: "h-5 w-5",
            fill: "currentColor"
          }, [
            v("path", { d: "M4,2H11A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M17.59,12L15,9.41L16.41,8L19,10.59L21.59,8L23,9.41L20.41,12L23,14.59L21.59,16L19,13.41L16.41,16L15,14.59L17.59,12Z" })
          ], -1)
        ]), 8, uv),
        v("li", {
          onClick: e[25] || (e[25] = (d) => {
            var f;
            return (f = i.editor) == null ? void 0 : f.commands.addRowBefore();
          }),
          title: n.translate("toolbar.table.add_row_before", this.locale)
        }, e[73] || (e[73] = [
          v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            class: "h-5 w-5",
            fill: "currentColor"
          }, [
            v("path", { d: "M22,14A2,2 0 0,0 20,12H4A2,2 0 0,0 2,14V21H4V19H8V21H10V19H14V21H16V19H20V21H22V14M4,14H8V17H4V14M10,14H14V17H10V14M20,14V17H16V14H20M11,10H13V7H16V5H13V2H11V5H8V7H11V10Z" })
          ], -1)
        ]), 8, dv),
        v("li", {
          onClick: e[26] || (e[26] = (d) => {
            var f;
            return (f = i.editor) == null ? void 0 : f.commands.addRowAfter();
          }),
          title: n.translate("toolbar.table.add_row_after", this.locale)
        }, e[74] || (e[74] = [
          v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            class: "h-5 w-5",
            fill: "currentColor"
          }, [
            v("path", { d: "M22,10A2,2 0 0,1 20,12H4A2,2 0 0,1 2,10V3H4V5H8V3H10V5H14V3H16V5H20V3H22V10M4,10H8V7H4V10M10,10H14V7H10V10M20,10V7H16V10H20M11,14H13V17H16V19H13V22H11V19H8V17H11V14Z" })
          ], -1)
        ]), 8, fv),
        v("li", {
          onClick: e[27] || (e[27] = (d) => {
            var f;
            return (f = i.editor) == null ? void 0 : f.commands.deleteRow();
          }),
          title: n.translate("toolbar.table.delete_row", this.locale)
        }, e[75] || (e[75] = [
          v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            class: "h-5 w-5",
            fill: "currentColor"
          }, [
            v("path", { d: "M9.41,13L12,15.59L14.59,13L16,14.41L13.41,17L16,19.59L14.59,21L12,18.41L9.41,21L8,19.59L10.59,17L8,14.41L9.41,13M22,9A2,2 0 0,1 20,11H4A2,2 0 0,1 2,9V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V9M4,9H8V6H4V9M10,9H14V6H10V9M16,9H20V6H16V9Z" })
          ], -1)
        ]), 8, hv),
        v("li", {
          onClick: e[28] || (e[28] = (d) => {
            var f;
            return (f = i.editor) == null ? void 0 : f.commands.mergeOrSplit();
          }),
          title: n.translate("toolbar.table.merge_or_split", this.locale)
        }, e[76] || (e[76] = [
          v("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            class: "h-5 w-5",
            fill: "currentColor"
          }, [
            v("path", { d: "M5,10H3V4H11V6H5V10M19,18H13V20H21V14H19V18M5,18V14H3V20H11V18H5M21,4H13V6H19V10H21V4M8,13V15L11,12L8,9V11H3V13H8M16,11V9L13,12L16,15V13H21V11H16Z" })
          ], -1)
        ]), 8, pv)
      ], 64)) : _("", !0),
      t.displayMediaLibrary || this.extensions.includes("youtube") || this.extensions.includes("panel") ? (D(), P("li", {
        key: 20,
        title: n.translate("toolbar.insert", this.locale),
        class: "editor-image"
      }, [
        kn(o, {
          icon: "add",
          ref: "insertPopover"
        }, {
          default: rt(() => [
            v("ul", gv, [
              t.displayMediaLibrary ? (D(), P("li", {
                key: 0,
                class: "image-item",
                onClick: e[29] || (e[29] = (d) => n.$emit("showMediaLibrary")),
                title: n.translate("toolbar.image.media", this.locale)
              }, [
                e[78] || (e[78] = v("span", { class: "material-symbols-outlined" }, "photo_library", -1)),
                v("span", null, V(n.translate("toolbar.image.media", this.locale)), 1)
              ], 8, yv)) : _("", !0),
              this.extensions.includes("youtube") ? (D(), P("li", {
                key: 1,
                class: "image-item",
                onClick: e[30] || (e[30] = (...d) => s.openYoutubeModal && s.openYoutubeModal(...d)),
                title: n.translate("toolbar.image.youtube", this.locale)
              }, [
                e[79] || (e[79] = v("span", { class: "material-symbols-outlined" }, "movie", -1)),
                v("span", null, V(n.translate("toolbar.image.youtube", this.locale)), 1)
              ], 8, bv)) : _("", !0),
              this.extensions.includes("panel") ? (D(), P("li", {
                key: 2,
                class: "image-item",
                onClick: e[31] || (e[31] = (...d) => s.addPanel && s.addPanel(...d)),
                title: n.translate("toolbar.panel.title", this.locale)
              }, [
                e[80] || (e[80] = v("span", { class: "material-symbols-outlined" }, "info", -1)),
                v("span", null, V(n.translate("toolbar.panel.title", this.locale)), 1)
              ], 8, vv)) : _("", !0)
            ])
          ]),
          _: 1
        })
      ], 8, mv)) : _("", !0),
      i.imageModal ? (D(), qt(l, {
        key: 21,
        class: "insert-image",
        name: "insert-image",
        resizable: !0,
        draggable: !0,
        "click-to-close": !1,
        width: "40%"
      }, {
        default: rt(() => [
          v("div", wv, [
            v("div", kv, [
              v("h2", Cv, V(n.translate("toolbar.image.modal_title", this.locale)), 1),
              v("span", {
                title: n.translate("modal.close", this.locale),
                class: "material-symbols-outlined",
                onClick: e[32] || (e[32] = (d) => i.imageModal = !1)
              }, "close", 8, xv)
            ])
          ]),
          v("div", Sv, [
            v("ul", null, [
              v("li", {
                class: De(["image-item", i.imageMethod === "import" ? "active" : ""]),
                onClick: e[33] || (e[33] = (d) => i.imageMethod = "import")
              }, [
                v("span", null, V(n.translate("toolbar.image.import", this.locale)), 1)
              ], 2),
              v("li", {
                class: De(["image-item", i.imageMethod === "url" ? "active" : ""]),
                onClick: e[34] || (e[34] = (d) => i.imageMethod = "url")
              }, [
                v("span", null, V(n.translate("toolbar.image.url", this.locale)), 1)
              ], 2)
            ]),
            i.imageMethod === "import" ? (D(), P("div", Mv, [
              v("input", {
                type: "file",
                id: "import_file",
                accept: "image/*",
                style: { display: "none" },
                onChange: e[35] || (e[35] = (d) => {
                  n.$emit("importImage", d), i.imageModal = !1;
                })
              }, null, 32),
              v("div", {
                class: "insert-image--import-file-dz",
                onClick: e[36] || (e[36] = (...d) => s.importFromComputer && s.importFromComputer(...d))
              }, [
                v("div", null, [
                  v("span", null, [
                    Ki(V(n.translate("toolbar.image.import_drag", this.locale)) + " ", 1),
                    v("u", null, V(n.translate("toolbar.image.import_download", this.locale)), 1)
                  ]),
                  e[81] || (e[81] = v("span", { class: "material-symbols-outlined" }, "cloud_upload", -1))
                ])
              ])
            ])) : _("", !0),
            i.imageMethod === "url" ? (D(), P("div", Av, [
              v("label", Ev, V(n.translate("toolbar.image.url_title", this.locale)), 1),
              Fe(v("input", {
                type: "text",
                id: "image-url",
                "onUpdate:modelValue": e[37] || (e[37] = (d) => i.imageImported = d),
                placeholder: "https://example.com/image.jpg"
              }, null, 512), [
                [Kn, i.imageImported]
              ]),
              v("div", Tv, [
                v("button", {
                  onClick: e[38] || (e[38] = (d) => {
                    i.editor.chain().focus().setImage({ src: i.imageImported }).run(), i.imageImported = null, i.imageModal = !1;
                  })
                }, V(n.translate("toolbar.image.url_insert", this.locale)), 1)
              ])
            ])) : _("", !0)
          ])
        ]),
        _: 1
      })) : _("", !0),
      i.videoModal ? (D(), qt(l, {
        key: 22,
        class: "insert-video",
        name: "insert-video",
        resizable: !0,
        draggable: !0,
        "click-to-close": !1,
        width: "40%"
      }, {
        default: rt(() => [
          v("div", Ov, [
            v("div", Nv, [
              v("h2", Dv, V(n.translate("toolbar.video.modal_title", this.locale)), 1),
              v("span", {
                title: n.translate("modal.close", this.locale),
                class: "material-symbols-outlined",
                onClick: e[39] || (e[39] = (d) => i.videoModal = !1)
              }, "close", 8, Lv)
            ])
          ]),
          v("div", Rv, [
            v("div", Iv, [
              v("label", Pv, V(n.translate("toolbar.video.url", this.locale)), 1),
              Fe(v("input", {
                type: "text",
                id: "video-url",
                "onUpdate:modelValue": e[40] || (e[40] = (d) => i.videoUrl = d),
                placeholder: "https://youtube.com"
              }, null, 512), [
                [Kn, i.videoUrl]
              ])
            ]),
            v("div", Bv, [
              v("button", {
                onClick: e[41] || (e[41] = (d) => {
                  i.editor.commands.setYoutubeVideo({ src: i.videoUrl, width: 400, height: 300 }), i.videoModal = !1;
                })
              }, V(n.translate("toolbar.image.url_insert", this.locale)), 1)
            ])
          ])
        ]),
        _: 1
      })) : _("", !0),
      i.linkModal ? (D(), qt(l, {
        key: 23,
        class: "insert-link",
        name: "insert-link",
        resizable: !0,
        draggable: !0,
        "click-to-close": !1,
        width: "40%"
      }, {
        default: rt(() => [
          v("div", Hv, [
            v("div", Fv, [
              v("h2", zv, V(n.translate("toolbar.link.modal_title", this.locale)), 1),
              v("span", {
                title: n.translate("modal.close", this.locale),
                class: "material-symbols-outlined",
                onClick: e[42] || (e[42] = (d) => i.linkModal = !1)
              }, "close", 8, Vv)
            ])
          ]),
          v("div", $v, [
            v("div", _v, [
              v("label", jv, V(n.translate("toolbar.link.url", this.locale)), 1),
              Fe(v("input", {
                type: "text",
                id: "link-url",
                "onUpdate:modelValue": e[43] || (e[43] = (d) => i.linkUrl = d),
                placeholder: "https://example.com"
              }, null, 512), [
                [Kn, i.linkUrl]
              ])
            ]),
            v("div", Wv, [
              v("button", {
                onClick: e[44] || (e[44] = (d) => {
                  i.editor.chain().focus().extendMarkRange("link").setLink({ href: i.linkUrl }).run(), i.linkModal = !1;
                })
              }, V(n.translate("toolbar.image.url_insert", this.locale)), 1)
            ])
          ])
        ]),
        _: 1
      })) : _("", !0),
      i.tableModal ? (D(), qt(l, {
        key: 24,
        class: "insert-table",
        name: "insert-table",
        resizable: !0,
        draggable: !0,
        "click-to-close": !1,
        width: "40%"
      }, {
        default: rt(() => [
          v("div", Uv, [
            v("div", Kv, [
              v("h2", qv, V(n.translate("toolbar.table.modal_title", this.locale)), 1),
              v("span", {
                title: n.translate("modal.close", this.locale),
                class: "material-symbols-outlined",
                onClick: e[45] || (e[45] = (d) => i.tableModal = !1)
              }, "close", 8, Jv)
            ])
          ]),
          v("div", Gv, [
            v("div", Yv, [
              v("div", Xv, [
                v("label", Qv, V(n.translate("toolbar.table.columns", this.locale)), 1),
                Fe(v("input", {
                  type: "text",
                  id: "table-columns",
                  "onUpdate:modelValue": e[46] || (e[46] = (d) => i.tableColumns = d),
                  placeholder: "3"
                }, null, 512), [
                  [Kn, i.tableColumns]
                ])
              ]),
              v("div", Zv, [
                v("label", ew, V(n.translate("toolbar.table.rows", this.locale)), 1),
                Fe(v("input", {
                  type: "text",
                  id: "table-rows",
                  "onUpdate:modelValue": e[47] || (e[47] = (d) => i.tableRows = d),
                  placeholder: "3"
                }, null, 512), [
                  [Kn, i.tableRows]
                ])
              ])
            ]),
            v("div", tw, [
              Fe(v("input", {
                type: "checkbox",
                id: "table-header",
                "onUpdate:modelValue": e[48] || (e[48] = (d) => i.tableHeader = d)
              }, null, 512), [
                [Vh, i.tableHeader]
              ]),
              v("label", nw, V(n.translate("toolbar.table.header", this.locale)), 1)
            ]),
            v("div", rw, [
              v("button", {
                onClick: e[49] || (e[49] = (d) => {
                  i.editor.chain().focus().insertTable({ rows: i.tableRows, cols: i.tableColumns, withHeaderRow: i.tableHeader }).run(), i.tableModal = !1;
                })
              }, V(n.translate("toolbar.image.url_insert", this.locale)), 1)
            ])
          ])
        ]),
        _: 1
      })) : _("", !0)
    ])
  ], 2)) : _("", !0);
}
const sw = /* @__PURE__ */ Hn(B1, [["render", iw]]), ow = ce.create({
  name: "doc",
  topNode: !0,
  content: "block+"
}), lw = ce.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["p", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: n }) => n.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), aw = ce.create({
  name: "text",
  group: "inline"
}), cw = ce.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  linebreakReplacement: !0,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", Q(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: n, chain: e, state: t, editor: r }) => n.first([
        () => n.exitCode(),
        () => n.command(() => {
          const { selection: i, storedMarks: s } = t;
          if (i.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: o } = this.options, { splittableMarks: l } = r.extensionManager, a = s || i.$to.parentOffset && i.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: u }) => {
            if (u && a && o) {
              const d = a.filter((f) => l.includes(f.type.name));
              c.ensureMarks(d);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), uw = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, dw = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, fw = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, hw = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, pw = lt.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (n) => n.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (n) => n.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["strong", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: n }) => n.setMark(this.name),
      toggleBold: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetBold: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      sr({
        find: uw,
        type: this.type
      }),
      sr({
        find: fw,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Ln({
        find: dw,
        type: this.type
      }),
      Ln({
        find: hw,
        type: this.type
      })
    ];
  }
}), mw = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, gw = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, yw = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, bw = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, vw = lt.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (n) => n.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (n) => n.type.name === this.name
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["em", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: n }) => n.setMark(this.name),
      toggleItalic: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetItalic: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      sr({
        find: mw,
        type: this.type
      }),
      sr({
        find: yw,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Ln({
        find: gw,
        type: this.type
      }),
      Ln({
        find: bw,
        type: this.type
      })
    ];
  }
}), ww = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, kw = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, Cw = lt.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["s", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: n }) => n.setMark(this.name),
      toggleStrike: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetStrike: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      sr({
        find: ww,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Ln({
        find: kw,
        type: this.type
      })
    ];
  }
}), xw = lt.create({
  name: "underline",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "u"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("underline") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["u", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands: n }) => n.setMark(this.name),
      toggleUnderline: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetUnderline: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
}), Sw = /^```([a-z]+)?[\s\n]$/, Mw = /^~~~([a-z]+)?[\s\n]$/, Aw = ce.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      defaultLanguage: null,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: this.options.defaultLanguage,
        parseHTML: (n) => {
          var e;
          const { languageClassPrefix: t } = this.options, s = [...((e = n.firstElementChild) === null || e === void 0 ? void 0 : e.classList) || []].filter((o) => o.startsWith(t)).map((o) => o.replace(t, ""))[0];
          return s || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "pre",
      Q(this.options.HTMLAttributes, e),
      [
        "code",
        {
          class: n.attrs.language ? this.options.languageClassPrefix + n.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (n) => ({ commands: e }) => e.setNode(this.name, n),
      toggleCodeBlock: (n) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", n)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty: n, $anchor: e } = this.editor.state.selection, t = e.pos === 1;
        return !n || e.parent.type.name !== this.name ? !1 : t || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      // exit node on triple enter
      Enter: ({ editor: n }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: e } = n, { selection: t } = e, { $from: r, empty: i } = t;
        if (!i || r.parent.type !== this.type)
          return !1;
        const s = r.parentOffset === r.parent.nodeSize - 2, o = r.parent.textContent.endsWith(`

`);
        return !s || !o ? !1 : n.chain().command(({ tr: l }) => (l.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor: n }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: e } = n, { selection: t, doc: r } = e, { $from: i, empty: s } = t;
        if (!s || i.parent.type !== this.type || !(i.parentOffset === i.parent.nodeSize - 2))
          return !1;
        const l = i.after();
        return l === void 0 ? !1 : r.nodeAt(l) ? n.commands.command(({ tr: c }) => (c.setSelection($.near(r.resolve(l))), !0)) : n.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      sl({
        find: Sw,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      }),
      sl({
        find: Mw,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new le({
        key: new ue("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (n, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const t = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), i = r ? JSON.parse(r) : void 0, s = i == null ? void 0 : i.mode;
            if (!t || !s)
              return !1;
            const { tr: o, schema: l } = n.state, a = l.text(t.replace(/\r\n?/g, `
`));
            return o.replaceSelectionWith(this.type.create({ language: s }, a)), o.selection.$from.parent.type !== this.type && o.setSelection(F.near(o.doc.resolve(Math.max(0, o.selection.from - 2)))), o.setMeta("paste", !0), n.dispatch(o), !0;
          }
        }
      })
    ];
  }
}), Ew = ce.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((n) => ({
      tag: `h${n}`,
      attrs: { level: n }
    }));
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`, Q(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.setNode(this.name, n) : !1,
      toggleHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.toggleNode(this.name, "paragraph", n) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((n, e) => ({
      ...n,
      [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((n) => sl({
      find: new RegExp(`^(#{${Math.min(...this.options.levels)},${n}})\\s$`),
      type: this.type,
      getAttributes: {
        level: n
      }
    }));
  }
}), Tw = (n) => {
  if (!n.children.length)
    return;
  const e = n.querySelectorAll("span");
  e && e.forEach((t) => {
    var r, i;
    const s = t.getAttribute("style"), o = (i = (r = t.parentElement) === null || r === void 0 ? void 0 : r.closest("span")) === null || i === void 0 ? void 0 : i.getAttribute("style");
    t.setAttribute("style", `${o};${s}`);
  });
}, Ow = lt.create({
  name: "textStyle",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {},
      mergeNestedSpanStyles: !1
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? (this.options.mergeNestedSpanStyles && Tw(n), {}) : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ tr: n }) => {
        const { selection: e } = n;
        return n.doc.nodesBetween(e.from, e.to, (t, r) => {
          if (t.isTextblock)
            return !0;
          t.marks.filter((i) => i.type === this.type).some((i) => Object.values(i.attrs).some((s) => !!s)) || n.removeMark(r, r + t.nodeSize, this.type);
        }), !0;
      }
    };
  }
}), Nw = fe.create({
  name: "textAlign",
  addOptions() {
    return {
      types: [],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: null
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (n) => {
              const e = n.style.textAlign;
              return this.options.alignments.includes(e) ? e : this.options.defaultAlignment;
            },
            renderHTML: (n) => n.textAlign ? { style: `text-align: ${n.textAlign}` } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setTextAlign: (n) => ({ commands: e }) => this.options.alignments.includes(n) ? this.options.types.map((t) => e.updateAttributes(t, { textAlign: n })).every((t) => t) : !1,
      unsetTextAlign: () => ({ commands: n }) => this.options.types.map((e) => n.resetAttributes(e, "textAlign")).every((e) => e),
      toggleTextAlign: (n) => ({ editor: e, commands: t }) => this.options.alignments.includes(n) ? e.isActive({ textAlign: n }) ? t.unsetTextAlign() : t.setTextAlign(n) : !1
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-l": () => this.editor.commands.setTextAlign("left"),
      "Mod-Shift-e": () => this.editor.commands.setTextAlign("center"),
      "Mod-Shift-r": () => this.editor.commands.setTextAlign("right"),
      "Mod-Shift-j": () => this.editor.commands.setTextAlign("justify")
    };
  }
}), Dw = fe.create({
  name: "fontFamily",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: (n) => n.style.fontFamily,
            renderHTML: (n) => n.fontFamily ? {
              style: `font-family: ${n.fontFamily}`
            } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontFamily: (n) => ({ chain: e }) => e().setMark("textStyle", { fontFamily: n }).run(),
      unsetFontFamily: () => ({ chain: n }) => n().setMark("textStyle", { fontFamily: null }).removeEmptyTextStyle().run()
    };
  }
});
var Lw = /* @__PURE__ */ fe.create({
  name: "fontSize",
  addOptions: function() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes: function() {
    return [{
      types: this.options.types,
      attributes: {
        fontSize: {
          default: null,
          parseHTML: function(t) {
            return t.style.fontSize.replace(/['"]+/g, "");
          },
          renderHTML: function(t) {
            return t.fontSize ? {
              style: "font-size: " + t.fontSize
            } : {};
          }
        }
      }
    }];
  },
  addCommands: function() {
    return {
      setFontSize: function(t) {
        return function(r) {
          var i = r.chain;
          return i().setMark("textStyle", {
            fontSize: t
          }).run();
        };
      },
      unsetFontSize: function() {
        return function(t) {
          var r = t.chain;
          return r().setMark("textStyle", {
            fontSize: null
          }).removeEmptyTextStyle().run();
        };
      }
    };
  }
});
const Rw = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/, Iw = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g, Pw = lt.create({
  name: "highlight",
  addOptions() {
    return {
      multicolor: !1,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return this.options.multicolor ? {
      color: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-color") || n.style.backgroundColor,
        renderHTML: (n) => n.color ? {
          "data-color": n.color,
          style: `background-color: ${n.color}; color: inherit`
        } : {}
      }
    } : {};
  },
  parseHTML() {
    return [
      {
        tag: "mark"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["mark", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setHighlight: (n) => ({ commands: e }) => e.setMark(this.name, n),
      toggleHighlight: (n) => ({ commands: e }) => e.toggleMark(this.name, n),
      unsetHighlight: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight()
    };
  },
  addInputRules() {
    return [
      sr({
        find: Rw,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Ln({
        find: Iw,
        type: this.type
      })
    ];
  }
}), Bw = fe.create({
  name: "color",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (n) => {
              var e;
              return (e = n.style.color) === null || e === void 0 ? void 0 : e.replace(/['"]+/g, "");
            },
            renderHTML: (n) => n.color ? {
              style: `color: ${n.color}`
            } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setColor: (n) => ({ chain: e }) => e().setMark("textStyle", { color: n }).run(),
      unsetColor: () => ({ chain: n }) => n().setMark("textStyle", { color: null }).removeEmptyTextStyle().run()
    };
  }
});
var dl, fl;
if (typeof WeakMap < "u") {
  let n = /* @__PURE__ */ new WeakMap();
  dl = (e) => n.get(e), fl = (e, t) => (n.set(e, t), t);
} else {
  const n = [];
  let t = 0;
  dl = (r) => {
    for (let i = 0; i < n.length; i += 2)
      if (n[i] == r) return n[i + 1];
  }, fl = (r, i) => (t == 10 && (t = 0), n[t++] = r, n[t++] = i);
}
var oe = class {
  constructor(n, e, t, r) {
    this.width = n, this.height = e, this.map = t, this.problems = r;
  }
  // Find the dimensions of the cell at the given position.
  findCell(n) {
    for (let e = 0; e < this.map.length; e++) {
      const t = this.map[e];
      if (t != n) continue;
      const r = e % this.width, i = e / this.width | 0;
      let s = r + 1, o = i + 1;
      for (let l = 1; s < this.width && this.map[e + l] == t; l++)
        s++;
      for (let l = 1; o < this.height && this.map[e + this.width * l] == t; l++)
        o++;
      return { left: r, top: i, right: s, bottom: o };
    }
    throw new RangeError(`No cell with offset ${n} found`);
  }
  // Find the left side of the cell at the given position.
  colCount(n) {
    for (let e = 0; e < this.map.length; e++)
      if (this.map[e] == n)
        return e % this.width;
    throw new RangeError(`No cell with offset ${n} found`);
  }
  // Find the next cell in the given direction, starting from the cell
  // at `pos`, if any.
  nextCell(n, e, t) {
    const { left: r, right: i, top: s, bottom: o } = this.findCell(n);
    return e == "horiz" ? (t < 0 ? r == 0 : i == this.width) ? null : this.map[s * this.width + (t < 0 ? r - 1 : i)] : (t < 0 ? s == 0 : o == this.height) ? null : this.map[r + this.width * (t < 0 ? s - 1 : o)];
  }
  // Get the rectangle spanning the two given cells.
  rectBetween(n, e) {
    const {
      left: t,
      right: r,
      top: i,
      bottom: s
    } = this.findCell(n), {
      left: o,
      right: l,
      top: a,
      bottom: c
    } = this.findCell(e);
    return {
      left: Math.min(t, o),
      top: Math.min(i, a),
      right: Math.max(r, l),
      bottom: Math.max(s, c)
    };
  }
  // Return the position of all cells that have the top left corner in
  // the given rectangle.
  cellsInRect(n) {
    const e = [], t = {};
    for (let r = n.top; r < n.bottom; r++)
      for (let i = n.left; i < n.right; i++) {
        const s = r * this.width + i, o = this.map[s];
        t[o] || (t[o] = !0, !(i == n.left && i && this.map[s - 1] == o || r == n.top && r && this.map[s - this.width] == o) && e.push(o));
      }
    return e;
  }
  // Return the position at which the cell at the given row and column
  // starts, or would start, if a cell started there.
  positionAt(n, e, t) {
    for (let r = 0, i = 0; ; r++) {
      const s = i + t.child(r).nodeSize;
      if (r == n) {
        let o = e + n * this.width;
        const l = (n + 1) * this.width;
        for (; o < l && this.map[o] < i; ) o++;
        return o == l ? s - 1 : this.map[o];
      }
      i = s;
    }
  }
  // Find the table map for the given table node.
  static get(n) {
    return dl(n) || fl(n, Hw(n));
  }
};
function Hw(n) {
  if (n.type.spec.tableRole != "table")
    throw new RangeError("Not a table node: " + n.type.name);
  const e = Fw(n), t = n.childCount, r = [];
  let i = 0, s = null;
  const o = [];
  for (let c = 0, u = e * t; c < u; c++) r[c] = 0;
  for (let c = 0, u = 0; c < t; c++) {
    const d = n.child(c);
    u++;
    for (let p = 0; ; p++) {
      for (; i < r.length && r[i] != 0; ) i++;
      if (p == d.childCount) break;
      const m = d.child(p), { colspan: g, rowspan: y, colwidth: w } = m.attrs;
      for (let C = 0; C < y; C++) {
        if (C + c >= t) {
          (s || (s = [])).push({
            type: "overlong_rowspan",
            pos: u,
            n: y - C
          });
          break;
        }
        const b = i + C * e;
        for (let S = 0; S < g; S++) {
          r[b + S] == 0 ? r[b + S] = u : (s || (s = [])).push({
            type: "collision",
            row: c,
            pos: u,
            n: g - S
          });
          const k = w && w[S];
          if (k) {
            const T = (b + S) % e * 2, M = o[T];
            M == null || M != k && o[T + 1] == 1 ? (o[T] = k, o[T + 1] = 1) : M == k && o[T + 1]++;
          }
        }
      }
      i += g, u += m.nodeSize;
    }
    const f = (c + 1) * e;
    let h = 0;
    for (; i < f; ) r[i++] == 0 && h++;
    h && (s || (s = [])).push({ type: "missing", row: c, n: h }), u++;
  }
  (e === 0 || t === 0) && (s || (s = [])).push({ type: "zero_sized" });
  const l = new oe(e, t, r, s);
  let a = !1;
  for (let c = 0; !a && c < o.length; c += 2)
    o[c] != null && o[c + 1] < t && (a = !0);
  return a && zw(l, o, n), l;
}
function Fw(n) {
  let e = -1, t = !1;
  for (let r = 0; r < n.childCount; r++) {
    const i = n.child(r);
    let s = 0;
    if (t)
      for (let o = 0; o < r; o++) {
        const l = n.child(o);
        for (let a = 0; a < l.childCount; a++) {
          const c = l.child(a);
          o + c.attrs.rowspan > r && (s += c.attrs.colspan);
        }
      }
    for (let o = 0; o < i.childCount; o++) {
      const l = i.child(o);
      s += l.attrs.colspan, l.attrs.rowspan > 1 && (t = !0);
    }
    e == -1 ? e = s : e != s && (e = Math.max(e, s));
  }
  return e;
}
function zw(n, e, t) {
  n.problems || (n.problems = []);
  const r = {};
  for (let i = 0; i < n.map.length; i++) {
    const s = n.map[i];
    if (r[s]) continue;
    r[s] = !0;
    const o = t.nodeAt(s);
    if (!o)
      throw new RangeError(`No cell with offset ${s} found`);
    let l = null;
    const a = o.attrs;
    for (let c = 0; c < a.colspan; c++) {
      const u = (i + c) % n.width, d = e[u * 2];
      d != null && (!a.colwidth || a.colwidth[c] != d) && ((l || (l = Vw(a)))[c] = d);
    }
    l && n.problems.unshift({
      type: "colwidth mismatch",
      pos: s,
      colwidth: l
    });
  }
}
function Vw(n) {
  if (n.colwidth) return n.colwidth.slice();
  const e = [];
  for (let t = 0; t < n.colspan; t++) e.push(0);
  return e;
}
function Se(n) {
  let e = n.cached.tableNodeTypes;
  if (!e) {
    e = n.cached.tableNodeTypes = {};
    for (const t in n.nodes) {
      const r = n.nodes[t], i = r.spec.tableRole;
      i && (e[i] = r);
    }
  }
  return e;
}
var Ut = new ue("selectingCells");
function pr(n) {
  for (let e = n.depth - 1; e > 0; e--)
    if (n.node(e).type.spec.tableRole == "row")
      return n.node(0).resolve(n.before(e + 1));
  return null;
}
function $w(n) {
  for (let e = n.depth; e > 0; e--) {
    const t = n.node(e).type.spec.tableRole;
    if (t === "cell" || t === "header_cell") return n.node(e);
  }
  return null;
}
function at(n) {
  const e = n.selection.$head;
  for (let t = e.depth; t > 0; t--)
    if (e.node(t).type.spec.tableRole == "row") return !0;
  return !1;
}
function ro(n) {
  const e = n.selection;
  if ("$anchorCell" in e && e.$anchorCell)
    return e.$anchorCell.pos > e.$headCell.pos ? e.$anchorCell : e.$headCell;
  if ("node" in e && e.node && e.node.type.spec.tableRole == "cell")
    return e.$anchor;
  const t = pr(e.$head) || _w(e.$head);
  if (t)
    return t;
  throw new RangeError(`No cell found around position ${e.head}`);
}
function _w(n) {
  for (let e = n.nodeAfter, t = n.pos; e; e = e.firstChild, t++) {
    const r = e.type.spec.tableRole;
    if (r == "cell" || r == "header_cell") return n.doc.resolve(t);
  }
  for (let e = n.nodeBefore, t = n.pos; e; e = e.lastChild, t--) {
    const r = e.type.spec.tableRole;
    if (r == "cell" || r == "header_cell")
      return n.doc.resolve(t - e.nodeSize);
  }
}
function hl(n) {
  return n.parent.type.spec.tableRole == "row" && !!n.nodeAfter;
}
function jw(n) {
  return n.node(0).resolve(n.pos + n.nodeAfter.nodeSize);
}
function fa(n, e) {
  return n.depth == e.depth && n.pos >= e.start(-1) && n.pos <= e.end(-1);
}
function Gf(n, e, t) {
  const r = n.node(-1), i = oe.get(r), s = n.start(-1), o = i.nextCell(n.pos - s, e, t);
  return o == null ? null : n.node(0).resolve(s + o);
}
function In(n, e, t = 1) {
  const r = { ...n, colspan: n.colspan - t };
  return r.colwidth && (r.colwidth = r.colwidth.slice(), r.colwidth.splice(e, t), r.colwidth.some((i) => i > 0) || (r.colwidth = null)), r;
}
function Yf(n, e, t = 1) {
  const r = { ...n, colspan: n.colspan + t };
  if (r.colwidth) {
    r.colwidth = r.colwidth.slice();
    for (let i = 0; i < t; i++) r.colwidth.splice(e, 0, 0);
  }
  return r;
}
function Ww(n, e, t) {
  const r = Se(e.type.schema).header_cell;
  for (let i = 0; i < n.height; i++)
    if (e.nodeAt(n.map[t + i * n.width]).type != r)
      return !1;
  return !0;
}
var ne = class Et extends $ {
  // A table selection is identified by its anchor and head cells. The
  // positions given to this constructor should point _before_ two
  // cells in the same table. They may be the same, to select a single
  // cell.
  constructor(e, t = e) {
    const r = e.node(-1), i = oe.get(r), s = e.start(-1), o = i.rectBetween(
      e.pos - s,
      t.pos - s
    ), l = e.node(0), a = i.cellsInRect(o).filter((u) => u != t.pos - s);
    a.unshift(t.pos - s);
    const c = a.map((u) => {
      const d = r.nodeAt(u);
      if (!d)
        throw RangeError(`No cell with offset ${u} found`);
      const f = s + u + 1;
      return new fd(
        l.resolve(f),
        l.resolve(f + d.content.size)
      );
    });
    super(c[0].$from, c[0].$to, c), this.$anchorCell = e, this.$headCell = t;
  }
  map(e, t) {
    const r = e.resolve(t.map(this.$anchorCell.pos)), i = e.resolve(t.map(this.$headCell.pos));
    if (hl(r) && hl(i) && fa(r, i)) {
      const s = this.$anchorCell.node(-1) != r.node(-1);
      return s && this.isRowSelection() ? Et.rowSelection(r, i) : s && this.isColSelection() ? Et.colSelection(r, i) : new Et(r, i);
    }
    return F.between(r, i);
  }
  // Returns a rectangular slice of table rows containing the selected
  // cells.
  content() {
    const e = this.$anchorCell.node(-1), t = oe.get(e), r = this.$anchorCell.start(-1), i = t.rectBetween(
      this.$anchorCell.pos - r,
      this.$headCell.pos - r
    ), s = {}, o = [];
    for (let a = i.top; a < i.bottom; a++) {
      const c = [];
      for (let u = a * t.width + i.left, d = i.left; d < i.right; d++, u++) {
        const f = t.map[u];
        if (s[f]) continue;
        s[f] = !0;
        const h = t.findCell(f);
        let p = e.nodeAt(f);
        if (!p)
          throw RangeError(`No cell with offset ${f} found`);
        const m = i.left - h.left, g = h.right - i.right;
        if (m > 0 || g > 0) {
          let y = p.attrs;
          if (m > 0 && (y = In(y, 0, m)), g > 0 && (y = In(
            y,
            y.colspan - g,
            g
          )), h.left < i.left) {
            if (p = p.type.createAndFill(y), !p)
              throw RangeError(
                `Could not create cell with attrs ${JSON.stringify(y)}`
              );
          } else
            p = p.type.create(y, p.content);
        }
        if (h.top < i.top || h.bottom > i.bottom) {
          const y = {
            ...p.attrs,
            rowspan: Math.min(h.bottom, i.bottom) - Math.max(h.top, i.top)
          };
          h.top < i.top ? p = p.type.createAndFill(y) : p = p.type.create(y, p.content);
        }
        c.push(p);
      }
      o.push(e.child(a).copy(A.from(c)));
    }
    const l = this.isColSelection() && this.isRowSelection() ? e : o;
    return new O(A.from(l), 1, 1);
  }
  replace(e, t = O.empty) {
    const r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      const { $from: l, $to: a } = i[o], c = e.mapping.slice(r);
      e.replace(
        c.map(l.pos),
        c.map(a.pos),
        o ? O.empty : t
      );
    }
    const s = $.findFrom(
      e.doc.resolve(e.mapping.slice(r).map(this.to)),
      -1
    );
    s && e.setSelection(s);
  }
  replaceWith(e, t) {
    this.replace(e, new O(A.from(t), 0, 0));
  }
  forEachCell(e) {
    const t = this.$anchorCell.node(-1), r = oe.get(t), i = this.$anchorCell.start(-1), s = r.cellsInRect(
      r.rectBetween(
        this.$anchorCell.pos - i,
        this.$headCell.pos - i
      )
    );
    for (let o = 0; o < s.length; o++)
      e(t.nodeAt(s[o]), i + s[o]);
  }
  // True if this selection goes all the way from the top to the
  // bottom of the table.
  isColSelection() {
    const e = this.$anchorCell.index(-1), t = this.$headCell.index(-1);
    if (Math.min(e, t) > 0) return !1;
    const r = e + this.$anchorCell.nodeAfter.attrs.rowspan, i = t + this.$headCell.nodeAfter.attrs.rowspan;
    return Math.max(r, i) == this.$headCell.node(-1).childCount;
  }
  // Returns the smallest column selection that covers the given anchor
  // and head cell.
  static colSelection(e, t = e) {
    const r = e.node(-1), i = oe.get(r), s = e.start(-1), o = i.findCell(e.pos - s), l = i.findCell(t.pos - s), a = e.node(0);
    return o.top <= l.top ? (o.top > 0 && (e = a.resolve(s + i.map[o.left])), l.bottom < i.height && (t = a.resolve(
      s + i.map[i.width * (i.height - 1) + l.right - 1]
    ))) : (l.top > 0 && (t = a.resolve(s + i.map[l.left])), o.bottom < i.height && (e = a.resolve(
      s + i.map[i.width * (i.height - 1) + o.right - 1]
    ))), new Et(e, t);
  }
  // True if this selection goes all the way from the left to the
  // right of the table.
  isRowSelection() {
    const e = this.$anchorCell.node(-1), t = oe.get(e), r = this.$anchorCell.start(-1), i = t.colCount(this.$anchorCell.pos - r), s = t.colCount(this.$headCell.pos - r);
    if (Math.min(i, s) > 0) return !1;
    const o = i + this.$anchorCell.nodeAfter.attrs.colspan, l = s + this.$headCell.nodeAfter.attrs.colspan;
    return Math.max(o, l) == t.width;
  }
  eq(e) {
    return e instanceof Et && e.$anchorCell.pos == this.$anchorCell.pos && e.$headCell.pos == this.$headCell.pos;
  }
  // Returns the smallest row selection that covers the given anchor
  // and head cell.
  static rowSelection(e, t = e) {
    const r = e.node(-1), i = oe.get(r), s = e.start(-1), o = i.findCell(e.pos - s), l = i.findCell(t.pos - s), a = e.node(0);
    return o.left <= l.left ? (o.left > 0 && (e = a.resolve(
      s + i.map[o.top * i.width]
    )), l.right < i.width && (t = a.resolve(
      s + i.map[i.width * (l.top + 1) - 1]
    ))) : (l.left > 0 && (t = a.resolve(s + i.map[l.top * i.width])), o.right < i.width && (e = a.resolve(
      s + i.map[i.width * (o.top + 1) - 1]
    ))), new Et(e, t);
  }
  toJSON() {
    return {
      type: "cell",
      anchor: this.$anchorCell.pos,
      head: this.$headCell.pos
    };
  }
  static fromJSON(e, t) {
    return new Et(e.resolve(t.anchor), e.resolve(t.head));
  }
  static create(e, t, r = t) {
    return new Et(e.resolve(t), e.resolve(r));
  }
  getBookmark() {
    return new Uw(this.$anchorCell.pos, this.$headCell.pos);
  }
};
ne.prototype.visible = !1;
$.jsonID("cell", ne);
var Uw = class Xf {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Xf(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    const t = e.resolve(this.anchor), r = e.resolve(this.head);
    return t.parent.type.spec.tableRole == "row" && r.parent.type.spec.tableRole == "row" && t.index() < t.parent.childCount && r.index() < r.parent.childCount && fa(t, r) ? new ne(t, r) : $.near(r, 1);
  }
};
function Kw(n) {
  if (!(n.selection instanceof ne)) return null;
  const e = [];
  return n.selection.forEachCell((t, r) => {
    e.push(
      xe.node(r, r + t.nodeSize, { class: "selectedCell" })
    );
  }), ie.create(n.doc, e);
}
function qw({ $from: n, $to: e }) {
  if (n.pos == e.pos || n.pos < e.pos - 6) return !1;
  let t = n.pos, r = e.pos, i = n.depth;
  for (; i >= 0 && !(n.after(i + 1) < n.end(i)); i--, t++)
    ;
  for (let s = e.depth; s >= 0 && !(e.before(s + 1) > e.start(s)); s--, r--)
    ;
  return t == r && /row|table/.test(n.node(i).type.spec.tableRole);
}
function Jw({ $from: n, $to: e }) {
  let t, r;
  for (let i = n.depth; i > 0; i--) {
    const s = n.node(i);
    if (s.type.spec.tableRole === "cell" || s.type.spec.tableRole === "header_cell") {
      t = s;
      break;
    }
  }
  for (let i = e.depth; i > 0; i--) {
    const s = e.node(i);
    if (s.type.spec.tableRole === "cell" || s.type.spec.tableRole === "header_cell") {
      r = s;
      break;
    }
  }
  return t !== r && e.parentOffset === 0;
}
function Gw(n, e, t) {
  const r = (e || n).selection, i = (e || n).doc;
  let s, o;
  if (r instanceof B && (o = r.node.type.spec.tableRole)) {
    if (o == "cell" || o == "header_cell")
      s = ne.create(i, r.from);
    else if (o == "row") {
      const l = i.resolve(r.from + 1);
      s = ne.rowSelection(l, l);
    } else if (!t) {
      const l = oe.get(r.node), a = r.from + 1, c = a + l.map[l.width * l.height - 1];
      s = ne.create(i, a + 1, c);
    }
  } else r instanceof F && qw(r) ? s = F.create(i, r.from) : r instanceof F && Jw(r) && (s = F.create(i, r.$from.start(), r.$from.end()));
  return s && (e || (e = n.tr)).setSelection(s), e;
}
var Yw = new ue("fix-tables");
function Qf(n, e, t, r) {
  const i = n.childCount, s = e.childCount;
  e: for (let o = 0, l = 0; o < s; o++) {
    const a = e.child(o);
    for (let c = l, u = Math.min(i, o + 3); c < u; c++)
      if (n.child(c) == a) {
        l = c + 1, t += a.nodeSize;
        continue e;
      }
    r(a, t), l < i && n.child(l).sameMarkup(a) ? Qf(n.child(l), a, t + 1, r) : a.nodesBetween(0, a.content.size, r, t + 1), t += a.nodeSize;
  }
}
function Zf(n, e) {
  let t;
  const r = (i, s) => {
    i.type.spec.tableRole == "table" && (t = Xw(n, i, s, t));
  };
  return e ? e.doc != n.doc && Qf(e.doc, n.doc, 0, r) : n.doc.descendants(r), t;
}
function Xw(n, e, t, r) {
  const i = oe.get(e);
  if (!i.problems) return r;
  r || (r = n.tr);
  const s = [];
  for (let a = 0; a < i.height; a++) s.push(0);
  for (let a = 0; a < i.problems.length; a++) {
    const c = i.problems[a];
    if (c.type == "collision") {
      const u = e.nodeAt(c.pos);
      if (!u) continue;
      const d = u.attrs;
      for (let f = 0; f < d.rowspan; f++) s[c.row + f] += c.n;
      r.setNodeMarkup(
        r.mapping.map(t + 1 + c.pos),
        null,
        In(d, d.colspan - c.n, c.n)
      );
    } else if (c.type == "missing")
      s[c.row] += c.n;
    else if (c.type == "overlong_rowspan") {
      const u = e.nodeAt(c.pos);
      if (!u) continue;
      r.setNodeMarkup(r.mapping.map(t + 1 + c.pos), null, {
        ...u.attrs,
        rowspan: u.attrs.rowspan - c.n
      });
    } else if (c.type == "colwidth mismatch") {
      const u = e.nodeAt(c.pos);
      if (!u) continue;
      r.setNodeMarkup(r.mapping.map(t + 1 + c.pos), null, {
        ...u.attrs,
        colwidth: c.colwidth
      });
    } else if (c.type == "zero_sized") {
      const u = r.mapping.map(t);
      r.delete(u, u + e.nodeSize);
    }
  }
  let o, l;
  for (let a = 0; a < s.length; a++)
    s[a] && (o == null && (o = a), l = a);
  for (let a = 0, c = t + 1; a < i.height; a++) {
    const u = e.child(a), d = c + u.nodeSize, f = s[a];
    if (f > 0) {
      let h = "cell";
      u.firstChild && (h = u.firstChild.type.spec.tableRole);
      const p = [];
      for (let g = 0; g < f; g++) {
        const y = Se(n.schema)[h].createAndFill();
        y && p.push(y);
      }
      const m = (a == 0 || o == a - 1) && l == a ? c + 1 : d - 1;
      r.insert(r.mapping.map(m), p);
    }
    c = d;
  }
  return r.setMeta(Yw, { fixTables: !0 });
}
function vt(n) {
  const e = n.selection, t = ro(n), r = t.node(-1), i = t.start(-1), s = oe.get(r);
  return { ...e instanceof ne ? s.rectBetween(
    e.$anchorCell.pos - i,
    e.$headCell.pos - i
  ) : s.findCell(t.pos - i), tableStart: i, map: s, table: r };
}
function eh(n, { map: e, tableStart: t, table: r }, i) {
  let s = i > 0 ? -1 : 0;
  Ww(e, r, i + s) && (s = i == 0 || i == e.width ? null : 0);
  for (let o = 0; o < e.height; o++) {
    const l = o * e.width + i;
    if (i > 0 && i < e.width && e.map[l - 1] == e.map[l]) {
      const a = e.map[l], c = r.nodeAt(a);
      n.setNodeMarkup(
        n.mapping.map(t + a),
        null,
        Yf(c.attrs, i - e.colCount(a))
      ), o += c.attrs.rowspan - 1;
    } else {
      const a = s == null ? Se(r.type.schema).cell : r.nodeAt(e.map[l + s]).type, c = e.positionAt(o, i, r);
      n.insert(n.mapping.map(t + c), a.createAndFill());
    }
  }
  return n;
}
function Qw(n, e) {
  if (!at(n)) return !1;
  if (e) {
    const t = vt(n);
    e(eh(n.tr, t, t.left));
  }
  return !0;
}
function Zw(n, e) {
  if (!at(n)) return !1;
  if (e) {
    const t = vt(n);
    e(eh(n.tr, t, t.right));
  }
  return !0;
}
function ek(n, { map: e, table: t, tableStart: r }, i) {
  const s = n.mapping.maps.length;
  for (let o = 0; o < e.height; ) {
    const l = o * e.width + i, a = e.map[l], c = t.nodeAt(a), u = c.attrs;
    if (i > 0 && e.map[l - 1] == a || i < e.width - 1 && e.map[l + 1] == a)
      n.setNodeMarkup(
        n.mapping.slice(s).map(r + a),
        null,
        In(u, i - e.colCount(a))
      );
    else {
      const d = n.mapping.slice(s).map(r + a);
      n.delete(d, d + c.nodeSize);
    }
    o += u.rowspan;
  }
}
function tk(n, e) {
  if (!at(n)) return !1;
  if (e) {
    const t = vt(n), r = n.tr;
    if (t.left == 0 && t.right == t.map.width) return !1;
    for (let i = t.right - 1; ek(r, t, i), i != t.left; i--) {
      const s = t.tableStart ? r.doc.nodeAt(t.tableStart - 1) : r.doc;
      if (!s)
        throw RangeError("No table found");
      t.table = s, t.map = oe.get(s);
    }
    e(r);
  }
  return !0;
}
function nk(n, e, t) {
  var r;
  const i = Se(e.type.schema).header_cell;
  for (let s = 0; s < n.width; s++)
    if (((r = e.nodeAt(n.map[s + t * n.width])) == null ? void 0 : r.type) != i)
      return !1;
  return !0;
}
function th(n, { map: e, tableStart: t, table: r }, i) {
  var s;
  let o = t;
  for (let c = 0; c < i; c++) o += r.child(c).nodeSize;
  const l = [];
  let a = i > 0 ? -1 : 0;
  nk(e, r, i + a) && (a = i == 0 || i == e.height ? null : 0);
  for (let c = 0, u = e.width * i; c < e.width; c++, u++)
    if (i > 0 && i < e.height && e.map[u] == e.map[u - e.width]) {
      const d = e.map[u], f = r.nodeAt(d).attrs;
      n.setNodeMarkup(t + d, null, {
        ...f,
        rowspan: f.rowspan + 1
      }), c += f.colspan - 1;
    } else {
      const d = a == null ? Se(r.type.schema).cell : (s = r.nodeAt(e.map[u + a * e.width])) == null ? void 0 : s.type, f = d == null ? void 0 : d.createAndFill();
      f && l.push(f);
    }
  return n.insert(o, Se(r.type.schema).row.create(null, l)), n;
}
function rk(n, e) {
  if (!at(n)) return !1;
  if (e) {
    const t = vt(n);
    e(th(n.tr, t, t.top));
  }
  return !0;
}
function ik(n, e) {
  if (!at(n)) return !1;
  if (e) {
    const t = vt(n);
    e(th(n.tr, t, t.bottom));
  }
  return !0;
}
function sk(n, { map: e, table: t, tableStart: r }, i) {
  let s = 0;
  for (let c = 0; c < i; c++) s += t.child(c).nodeSize;
  const o = s + t.child(i).nodeSize, l = n.mapping.maps.length;
  n.delete(s + r, o + r);
  const a = /* @__PURE__ */ new Set();
  for (let c = 0, u = i * e.width; c < e.width; c++, u++) {
    const d = e.map[u];
    if (!a.has(d)) {
      if (a.add(d), i > 0 && d == e.map[u - e.width]) {
        const f = t.nodeAt(d).attrs;
        n.setNodeMarkup(n.mapping.slice(l).map(d + r), null, {
          ...f,
          rowspan: f.rowspan - 1
        }), c += f.colspan - 1;
      } else if (i < e.height && d == e.map[u + e.width]) {
        const f = t.nodeAt(d), h = f.attrs, p = f.type.create(
          { ...h, rowspan: f.attrs.rowspan - 1 },
          f.content
        ), m = e.positionAt(i + 1, c, t);
        n.insert(n.mapping.slice(l).map(r + m), p), c += h.colspan - 1;
      }
    }
  }
}
function ok(n, e) {
  if (!at(n)) return !1;
  if (e) {
    const t = vt(n), r = n.tr;
    if (t.top == 0 && t.bottom == t.map.height) return !1;
    for (let i = t.bottom - 1; sk(r, t, i), i != t.top; i--) {
      const s = t.tableStart ? r.doc.nodeAt(t.tableStart - 1) : r.doc;
      if (!s)
        throw RangeError("No table found");
      t.table = s, t.map = oe.get(t.table);
    }
    e(r);
  }
  return !0;
}
function Xc(n) {
  const e = n.content;
  return e.childCount == 1 && e.child(0).isTextblock && e.child(0).childCount == 0;
}
function lk({ width: n, height: e, map: t }, r) {
  let i = r.top * n + r.left, s = i, o = (r.bottom - 1) * n + r.left, l = i + (r.right - r.left - 1);
  for (let a = r.top; a < r.bottom; a++) {
    if (r.left > 0 && t[s] == t[s - 1] || r.right < n && t[l] == t[l + 1])
      return !0;
    s += n, l += n;
  }
  for (let a = r.left; a < r.right; a++) {
    if (r.top > 0 && t[i] == t[i - n] || r.bottom < e && t[o] == t[o + n])
      return !0;
    i++, o++;
  }
  return !1;
}
function Qc(n, e) {
  const t = n.selection;
  if (!(t instanceof ne) || t.$anchorCell.pos == t.$headCell.pos)
    return !1;
  const r = vt(n), { map: i } = r;
  if (lk(i, r)) return !1;
  if (e) {
    const s = n.tr, o = {};
    let l = A.empty, a, c;
    for (let u = r.top; u < r.bottom; u++)
      for (let d = r.left; d < r.right; d++) {
        const f = i.map[u * i.width + d], h = r.table.nodeAt(f);
        if (!(o[f] || !h))
          if (o[f] = !0, a == null)
            a = f, c = h;
          else {
            Xc(h) || (l = l.append(h.content));
            const p = s.mapping.map(f + r.tableStart);
            s.delete(p, p + h.nodeSize);
          }
      }
    if (a == null || c == null)
      return !0;
    if (s.setNodeMarkup(a + r.tableStart, null, {
      ...Yf(
        c.attrs,
        c.attrs.colspan,
        r.right - r.left - c.attrs.colspan
      ),
      rowspan: r.bottom - r.top
    }), l.size) {
      const u = a + 1 + c.content.size, d = Xc(c) ? a + 1 : u;
      s.replaceWith(d + r.tableStart, u + r.tableStart, l);
    }
    s.setSelection(
      new ne(s.doc.resolve(a + r.tableStart))
    ), e(s);
  }
  return !0;
}
function Zc(n, e) {
  const t = Se(n.schema);
  return ak(({ node: r }) => t[r.type.spec.tableRole])(n, e);
}
function ak(n) {
  return (e, t) => {
    var r;
    const i = e.selection;
    let s, o;
    if (i instanceof ne) {
      if (i.$anchorCell.pos != i.$headCell.pos) return !1;
      s = i.$anchorCell.nodeAfter, o = i.$anchorCell.pos;
    } else {
      if (s = $w(i.$from), !s) return !1;
      o = (r = pr(i.$from)) == null ? void 0 : r.pos;
    }
    if (s == null || o == null || s.attrs.colspan == 1 && s.attrs.rowspan == 1)
      return !1;
    if (t) {
      let l = s.attrs;
      const a = [], c = l.colwidth;
      l.rowspan > 1 && (l = { ...l, rowspan: 1 }), l.colspan > 1 && (l = { ...l, colspan: 1 });
      const u = vt(e), d = e.tr;
      for (let h = 0; h < u.right - u.left; h++)
        a.push(
          c ? {
            ...l,
            colwidth: c && c[h] ? [c[h]] : null
          } : l
        );
      let f;
      for (let h = u.top; h < u.bottom; h++) {
        let p = u.map.positionAt(h, u.left, u.table);
        h == u.top && (p += s.nodeSize);
        for (let m = u.left, g = 0; m < u.right; m++, g++)
          m == u.left && h == u.top || d.insert(
            f = d.mapping.map(p + u.tableStart, 1),
            n({ node: s, row: h, col: m }).createAndFill(a[g])
          );
      }
      d.setNodeMarkup(
        o,
        n({ node: s, row: u.top, col: u.left }),
        a[0]
      ), i instanceof ne && d.setSelection(
        new ne(
          d.doc.resolve(i.$anchorCell.pos),
          f ? d.doc.resolve(f) : void 0
        )
      ), t(d);
    }
    return !0;
  };
}
function ck(n, e) {
  return function(t, r) {
    if (!at(t)) return !1;
    const i = ro(t);
    if (i.nodeAfter.attrs[n] === e) return !1;
    if (r) {
      const s = t.tr;
      t.selection instanceof ne ? t.selection.forEachCell((o, l) => {
        o.attrs[n] !== e && s.setNodeMarkup(l, null, {
          ...o.attrs,
          [n]: e
        });
      }) : s.setNodeMarkup(i.pos, null, {
        ...i.nodeAfter.attrs,
        [n]: e
      }), r(s);
    }
    return !0;
  };
}
function uk(n) {
  return function(e, t) {
    if (!at(e)) return !1;
    if (t) {
      const r = Se(e.schema), i = vt(e), s = e.tr, o = i.map.cellsInRect(
        n == "column" ? {
          left: i.left,
          top: 0,
          right: i.right,
          bottom: i.map.height
        } : n == "row" ? {
          left: 0,
          top: i.top,
          right: i.map.width,
          bottom: i.bottom
        } : i
      ), l = o.map((a) => i.table.nodeAt(a));
      for (let a = 0; a < o.length; a++)
        l[a].type == r.header_cell && s.setNodeMarkup(
          i.tableStart + o[a],
          r.cell,
          l[a].attrs
        );
      if (s.steps.length == 0)
        for (let a = 0; a < o.length; a++)
          s.setNodeMarkup(
            i.tableStart + o[a],
            r.header_cell,
            l[a].attrs
          );
      t(s);
    }
    return !0;
  };
}
function eu(n, e, t) {
  const r = e.map.cellsInRect({
    left: 0,
    top: 0,
    right: n == "row" ? e.map.width : 1,
    bottom: n == "column" ? e.map.height : 1
  });
  for (let i = 0; i < r.length; i++) {
    const s = e.table.nodeAt(r[i]);
    if (s && s.type !== t.header_cell)
      return !1;
  }
  return !0;
}
function ti(n, e) {
  return e = e || { useDeprecatedLogic: !1 }, e.useDeprecatedLogic ? uk(n) : function(t, r) {
    if (!at(t)) return !1;
    if (r) {
      const i = Se(t.schema), s = vt(t), o = t.tr, l = eu("row", s, i), a = eu(
        "column",
        s,
        i
      ), u = (n === "column" ? l : n === "row" ? a : !1) ? 1 : 0, d = n == "column" ? {
        left: 0,
        top: u,
        right: 1,
        bottom: s.map.height
      } : n == "row" ? {
        left: u,
        top: 0,
        right: s.map.width,
        bottom: 1
      } : s, f = n == "column" ? a ? i.cell : i.header_cell : n == "row" ? l ? i.cell : i.header_cell : i.cell;
      s.map.cellsInRect(d).forEach((h) => {
        const p = h + s.tableStart, m = o.doc.nodeAt(p);
        m && o.setNodeMarkup(p, f, m.attrs);
      }), r(o);
    }
    return !0;
  };
}
ti("row", {
  useDeprecatedLogic: !0
});
ti("column", {
  useDeprecatedLogic: !0
});
var dk = ti("cell", {
  useDeprecatedLogic: !0
});
function fk(n, e) {
  if (e < 0) {
    const t = n.nodeBefore;
    if (t) return n.pos - t.nodeSize;
    for (let r = n.index(-1) - 1, i = n.before(); r >= 0; r--) {
      const s = n.node(-1).child(r), o = s.lastChild;
      if (o)
        return i - 1 - o.nodeSize;
      i -= s.nodeSize;
    }
  } else {
    if (n.index() < n.parent.childCount - 1)
      return n.pos + n.nodeAfter.nodeSize;
    const t = n.node(-1);
    for (let r = n.indexAfter(-1), i = n.after(); r < t.childCount; r++) {
      const s = t.child(r);
      if (s.childCount) return i + 1;
      i += s.nodeSize;
    }
  }
  return null;
}
function tu(n) {
  return function(e, t) {
    if (!at(e)) return !1;
    const r = fk(ro(e), n);
    if (r == null) return !1;
    if (t) {
      const i = e.doc.resolve(r);
      t(
        e.tr.setSelection(F.between(i, jw(i))).scrollIntoView()
      );
    }
    return !0;
  };
}
function hk(n, e) {
  const t = n.selection.$anchor;
  for (let r = t.depth; r > 0; r--)
    if (t.node(r).type.spec.tableRole == "table")
      return e && e(
        n.tr.delete(t.before(r), t.after(r)).scrollIntoView()
      ), !0;
  return !1;
}
function Oi(n, e) {
  const t = n.selection;
  if (!(t instanceof ne)) return !1;
  if (e) {
    const r = n.tr, i = Se(n.schema).cell.createAndFill().content;
    t.forEachCell((s, o) => {
      s.content.eq(i) || r.replace(
        r.mapping.map(o + 1),
        r.mapping.map(o + s.nodeSize - 1),
        new O(i, 0, 0)
      );
    }), r.docChanged && e(r);
  }
  return !0;
}
function pk(n) {
  if (!n.size) return null;
  let { content: e, openStart: t, openEnd: r } = n;
  for (; e.childCount == 1 && (t > 0 && r > 0 || e.child(0).type.spec.tableRole == "table"); )
    t--, r--, e = e.child(0).content;
  const i = e.child(0), s = i.type.spec.tableRole, o = i.type.schema, l = [];
  if (s == "row")
    for (let a = 0; a < e.childCount; a++) {
      let c = e.child(a).content;
      const u = a ? 0 : Math.max(0, t - 1), d = a < e.childCount - 1 ? 0 : Math.max(0, r - 1);
      (u || d) && (c = pl(
        Se(o).row,
        new O(c, u, d)
      ).content), l.push(c);
    }
  else if (s == "cell" || s == "header_cell")
    l.push(
      t || r ? pl(
        Se(o).row,
        new O(e, t, r)
      ).content : e
    );
  else
    return null;
  return mk(o, l);
}
function mk(n, e) {
  const t = [];
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    for (let o = s.childCount - 1; o >= 0; o--) {
      const { rowspan: l, colspan: a } = s.child(o).attrs;
      for (let c = i; c < i + l; c++)
        t[c] = (t[c] || 0) + a;
    }
  }
  let r = 0;
  for (let i = 0; i < t.length; i++) r = Math.max(r, t[i]);
  for (let i = 0; i < t.length; i++)
    if (i >= e.length && e.push(A.empty), t[i] < r) {
      const s = Se(n).cell.createAndFill(), o = [];
      for (let l = t[i]; l < r; l++)
        o.push(s);
      e[i] = e[i].append(A.from(o));
    }
  return { height: e.length, width: r, rows: e };
}
function pl(n, e) {
  const t = n.createAndFill();
  return new Pl(t).replace(0, t.content.size, e).doc;
}
function gk({ width: n, height: e, rows: t }, r, i) {
  if (n != r) {
    const s = [], o = [];
    for (let l = 0; l < t.length; l++) {
      const a = t[l], c = [];
      for (let u = s[l] || 0, d = 0; u < r; d++) {
        let f = a.child(d % a.childCount);
        u + f.attrs.colspan > r && (f = f.type.createChecked(
          In(
            f.attrs,
            f.attrs.colspan,
            u + f.attrs.colspan - r
          ),
          f.content
        )), c.push(f), u += f.attrs.colspan;
        for (let h = 1; h < f.attrs.rowspan; h++)
          s[l + h] = (s[l + h] || 0) + f.attrs.colspan;
      }
      o.push(A.from(c));
    }
    t = o, n = r;
  }
  if (e != i) {
    const s = [];
    for (let o = 0, l = 0; o < i; o++, l++) {
      const a = [], c = t[l % e];
      for (let u = 0; u < c.childCount; u++) {
        let d = c.child(u);
        o + d.attrs.rowspan > i && (d = d.type.create(
          {
            ...d.attrs,
            rowspan: Math.max(1, i - d.attrs.rowspan)
          },
          d.content
        )), a.push(d);
      }
      s.push(A.from(a));
    }
    t = s, e = i;
  }
  return { width: n, height: e, rows: t };
}
function yk(n, e, t, r, i, s, o) {
  const l = n.doc.type.schema, a = Se(l);
  let c, u;
  if (i > e.width)
    for (let d = 0, f = 0; d < e.height; d++) {
      const h = t.child(d);
      f += h.nodeSize;
      const p = [];
      let m;
      h.lastChild == null || h.lastChild.type == a.cell ? m = c || (c = a.cell.createAndFill()) : m = u || (u = a.header_cell.createAndFill());
      for (let g = e.width; g < i; g++) p.push(m);
      n.insert(n.mapping.slice(o).map(f - 1 + r), p);
    }
  if (s > e.height) {
    const d = [];
    for (let p = 0, m = (e.height - 1) * e.width; p < Math.max(e.width, i); p++) {
      const g = p >= e.width ? !1 : t.nodeAt(e.map[m + p]).type == a.header_cell;
      d.push(
        g ? u || (u = a.header_cell.createAndFill()) : c || (c = a.cell.createAndFill())
      );
    }
    const f = a.row.create(null, A.from(d)), h = [];
    for (let p = e.height; p < s; p++) h.push(f);
    n.insert(n.mapping.slice(o).map(r + t.nodeSize - 2), h);
  }
  return !!(c || u);
}
function nu(n, e, t, r, i, s, o, l) {
  if (o == 0 || o == e.height) return !1;
  let a = !1;
  for (let c = i; c < s; c++) {
    const u = o * e.width + c, d = e.map[u];
    if (e.map[u - e.width] == d) {
      a = !0;
      const f = t.nodeAt(d), { top: h, left: p } = e.findCell(d);
      n.setNodeMarkup(n.mapping.slice(l).map(d + r), null, {
        ...f.attrs,
        rowspan: o - h
      }), n.insert(
        n.mapping.slice(l).map(e.positionAt(o, p, t)),
        f.type.createAndFill({
          ...f.attrs,
          rowspan: h + f.attrs.rowspan - o
        })
      ), c += f.attrs.colspan - 1;
    }
  }
  return a;
}
function ru(n, e, t, r, i, s, o, l) {
  if (o == 0 || o == e.width) return !1;
  let a = !1;
  for (let c = i; c < s; c++) {
    const u = c * e.width + o, d = e.map[u];
    if (e.map[u - 1] == d) {
      a = !0;
      const f = t.nodeAt(d), h = e.colCount(d), p = n.mapping.slice(l).map(d + r);
      n.setNodeMarkup(
        p,
        null,
        In(
          f.attrs,
          o - h,
          f.attrs.colspan - (o - h)
        )
      ), n.insert(
        p + f.nodeSize,
        f.type.createAndFill(
          In(f.attrs, 0, o - h)
        )
      ), c += f.attrs.rowspan - 1;
    }
  }
  return a;
}
function iu(n, e, t, r, i) {
  let s = t ? n.doc.nodeAt(t - 1) : n.doc;
  if (!s)
    throw new Error("No table found");
  let o = oe.get(s);
  const { top: l, left: a } = r, c = a + i.width, u = l + i.height, d = n.tr;
  let f = 0;
  function h() {
    if (s = t ? d.doc.nodeAt(t - 1) : d.doc, !s)
      throw new Error("No table found");
    o = oe.get(s), f = d.mapping.maps.length;
  }
  yk(d, o, s, t, c, u, f) && h(), nu(d, o, s, t, a, c, l, f) && h(), nu(d, o, s, t, a, c, u, f) && h(), ru(d, o, s, t, l, u, a, f) && h(), ru(d, o, s, t, l, u, c, f) && h();
  for (let p = l; p < u; p++) {
    const m = o.positionAt(p, a, s), g = o.positionAt(p, c, s);
    d.replace(
      d.mapping.slice(f).map(m + t),
      d.mapping.slice(f).map(g + t),
      new O(i.rows[p - l], 0, 0)
    );
  }
  h(), d.setSelection(
    new ne(
      d.doc.resolve(t + o.positionAt(l, a, s)),
      d.doc.resolve(t + o.positionAt(u - 1, c - 1, s))
    )
  ), e(d);
}
var bk = Gd({
  ArrowLeft: Ni("horiz", -1),
  ArrowRight: Ni("horiz", 1),
  ArrowUp: Ni("vert", -1),
  ArrowDown: Ni("vert", 1),
  "Shift-ArrowLeft": Di("horiz", -1),
  "Shift-ArrowRight": Di("horiz", 1),
  "Shift-ArrowUp": Di("vert", -1),
  "Shift-ArrowDown": Di("vert", 1),
  Backspace: Oi,
  "Mod-Backspace": Oi,
  Delete: Oi,
  "Mod-Delete": Oi
});
function _i(n, e, t) {
  return t.eq(n.selection) ? !1 : (e && e(n.tr.setSelection(t).scrollIntoView()), !0);
}
function Ni(n, e) {
  return (t, r, i) => {
    if (!i) return !1;
    const s = t.selection;
    if (s instanceof ne)
      return _i(
        t,
        r,
        $.near(s.$headCell, e)
      );
    if (n != "horiz" && !s.empty) return !1;
    const o = nh(i, n, e);
    if (o == null) return !1;
    if (n == "horiz")
      return _i(
        t,
        r,
        $.near(t.doc.resolve(s.head + e), e)
      );
    {
      const l = t.doc.resolve(o), a = Gf(l, n, e);
      let c;
      return a ? c = $.near(a, 1) : e < 0 ? c = $.near(t.doc.resolve(l.before(-1)), -1) : c = $.near(t.doc.resolve(l.after(-1)), 1), _i(t, r, c);
    }
  };
}
function Di(n, e) {
  return (t, r, i) => {
    if (!i) return !1;
    const s = t.selection;
    let o;
    if (s instanceof ne)
      o = s;
    else {
      const a = nh(i, n, e);
      if (a == null) return !1;
      o = new ne(t.doc.resolve(a));
    }
    const l = Gf(o.$headCell, n, e);
    return l ? _i(
      t,
      r,
      new ne(o.$anchorCell, l)
    ) : !1;
  };
}
function vk(n, e) {
  const t = n.state.doc, r = pr(t.resolve(e));
  return r ? (n.dispatch(n.state.tr.setSelection(new ne(r))), !0) : !1;
}
function wk(n, e, t) {
  if (!at(n.state)) return !1;
  let r = pk(t);
  const i = n.state.selection;
  if (i instanceof ne) {
    r || (r = {
      width: 1,
      height: 1,
      rows: [
        A.from(
          pl(Se(n.state.schema).cell, t)
        )
      ]
    });
    const s = i.$anchorCell.node(-1), o = i.$anchorCell.start(-1), l = oe.get(s).rectBetween(
      i.$anchorCell.pos - o,
      i.$headCell.pos - o
    );
    return r = gk(r, l.right - l.left, l.bottom - l.top), iu(n.state, n.dispatch, o, l, r), !0;
  } else if (r) {
    const s = ro(n.state), o = s.start(-1);
    return iu(
      n.state,
      n.dispatch,
      o,
      oe.get(s.node(-1)).findCell(s.pos - o),
      r
    ), !0;
  } else
    return !1;
}
function kk(n, e) {
  var t;
  if (e.ctrlKey || e.metaKey) return;
  const r = su(n, e.target);
  let i;
  if (e.shiftKey && n.state.selection instanceof ne)
    s(n.state.selection.$anchorCell, e), e.preventDefault();
  else if (e.shiftKey && r && (i = pr(n.state.selection.$anchor)) != null && ((t = No(n, e)) == null ? void 0 : t.pos) != i.pos)
    s(i, e), e.preventDefault();
  else if (!r)
    return;
  function s(a, c) {
    let u = No(n, c);
    const d = Ut.getState(n.state) == null;
    if (!u || !fa(a, u))
      if (d) u = a;
      else return;
    const f = new ne(a, u);
    if (d || !n.state.selection.eq(f)) {
      const h = n.state.tr.setSelection(f);
      d && h.setMeta(Ut, a.pos), n.dispatch(h);
    }
  }
  function o() {
    n.root.removeEventListener("mouseup", o), n.root.removeEventListener("dragstart", o), n.root.removeEventListener("mousemove", l), Ut.getState(n.state) != null && n.dispatch(n.state.tr.setMeta(Ut, -1));
  }
  function l(a) {
    const c = a, u = Ut.getState(n.state);
    let d;
    if (u != null)
      d = n.state.doc.resolve(u);
    else if (su(n, c.target) != r && (d = No(n, e), !d))
      return o();
    d && s(d, c);
  }
  n.root.addEventListener("mouseup", o), n.root.addEventListener("dragstart", o), n.root.addEventListener("mousemove", l);
}
function nh(n, e, t) {
  if (!(n.state.selection instanceof F)) return null;
  const { $head: r } = n.state.selection;
  for (let i = r.depth - 1; i >= 0; i--) {
    const s = r.node(i);
    if ((t < 0 ? r.index(i) : r.indexAfter(i)) != (t < 0 ? 0 : s.childCount)) return null;
    if (s.type.spec.tableRole == "cell" || s.type.spec.tableRole == "header_cell") {
      const l = r.before(i), a = e == "vert" ? t > 0 ? "down" : "up" : t > 0 ? "right" : "left";
      return n.endOfTextblock(a) ? l : null;
    }
  }
  return null;
}
function su(n, e) {
  for (; e && e != n.dom; e = e.parentNode)
    if (e.nodeName == "TD" || e.nodeName == "TH")
      return e;
  return null;
}
function No(n, e) {
  const t = n.posAtCoords({
    left: e.clientX,
    top: e.clientY
  });
  return t && t ? pr(n.state.doc.resolve(t.pos)) : null;
}
var Ck = class {
  constructor(e, t) {
    this.node = e, this.defaultCellMinWidth = t, this.dom = document.createElement("div"), this.dom.className = "tableWrapper", this.table = this.dom.appendChild(document.createElement("table")), this.table.style.setProperty(
      "--default-cell-min-width",
      `${t}px`
    ), this.colgroup = this.table.appendChild(document.createElement("colgroup")), ml(e, this.colgroup, this.table, t), this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(e) {
    return e.type != this.node.type ? !1 : (this.node = e, ml(
      e,
      this.colgroup,
      this.table,
      this.defaultCellMinWidth
    ), !0);
  }
  ignoreMutation(e) {
    return e.type == "attributes" && (e.target == this.table || this.colgroup.contains(e.target));
  }
};
function ml(n, e, t, r, i, s) {
  var o;
  let l = 0, a = !0, c = e.firstChild;
  const u = n.firstChild;
  if (u) {
    for (let d = 0, f = 0; d < u.childCount; d++) {
      const { colspan: h, colwidth: p } = u.child(d).attrs;
      for (let m = 0; m < h; m++, f++) {
        const g = i == f ? s : p && p[m], y = g ? g + "px" : "";
        if (l += g || r, g || (a = !1), c)
          c.style.width != y && (c.style.width = y), c = c.nextSibling;
        else {
          const w = document.createElement("col");
          w.style.width = y, e.appendChild(w);
        }
      }
    }
    for (; c; ) {
      const d = c.nextSibling;
      (o = c.parentNode) == null || o.removeChild(c), c = d;
    }
    a ? (t.style.width = l + "px", t.style.minWidth = "") : (t.style.width = "", t.style.minWidth = l + "px");
  }
}
var _e = new ue(
  "tableColumnResizing"
);
function xk({
  handleWidth: n = 5,
  cellMinWidth: e = 25,
  defaultCellMinWidth: t = 100,
  View: r = Ck,
  lastColumnResizable: i = !0
} = {}) {
  const s = new le({
    key: _e,
    state: {
      init(o, l) {
        var a, c;
        const u = (c = (a = s.spec) == null ? void 0 : a.props) == null ? void 0 : c.nodeViews, d = Se(l.schema).table.name;
        return r && u && (u[d] = (f, h) => new r(f, t, h)), new Sk(-1, !1);
      },
      apply(o, l) {
        return l.apply(o);
      }
    },
    props: {
      attributes: (o) => {
        const l = _e.getState(o);
        return l && l.activeHandle > -1 ? { class: "resize-cursor" } : {};
      },
      handleDOMEvents: {
        mousemove: (o, l) => {
          Mk(o, l, n, i);
        },
        mouseleave: (o) => {
          Ak(o);
        },
        mousedown: (o, l) => {
          Ek(o, l, e, t);
        }
      },
      decorations: (o) => {
        const l = _e.getState(o);
        if (l && l.activeHandle > -1)
          return Lk(o, l.activeHandle);
      },
      nodeViews: {}
    }
  });
  return s;
}
var Sk = class ji {
  constructor(e, t) {
    this.activeHandle = e, this.dragging = t;
  }
  apply(e) {
    const t = this, r = e.getMeta(_e);
    if (r && r.setHandle != null)
      return new ji(r.setHandle, !1);
    if (r && r.setDragging !== void 0)
      return new ji(t.activeHandle, r.setDragging);
    if (t.activeHandle > -1 && e.docChanged) {
      let i = e.mapping.map(t.activeHandle, -1);
      return hl(e.doc.resolve(i)) || (i = -1), new ji(i, t.dragging);
    }
    return t;
  }
};
function Mk(n, e, t, r) {
  if (!n.editable) return;
  const i = _e.getState(n.state);
  if (i && !i.dragging) {
    const s = Ok(e.target);
    let o = -1;
    if (s) {
      const { left: l, right: a } = s.getBoundingClientRect();
      e.clientX - l <= t ? o = ou(n, e, "left", t) : a - e.clientX <= t && (o = ou(n, e, "right", t));
    }
    if (o != i.activeHandle) {
      if (!r && o !== -1) {
        const l = n.state.doc.resolve(o), a = l.node(-1), c = oe.get(a), u = l.start(-1);
        if (c.colCount(l.pos - u) + l.nodeAfter.attrs.colspan - 1 == c.width - 1)
          return;
      }
      rh(n, o);
    }
  }
}
function Ak(n) {
  if (!n.editable) return;
  const e = _e.getState(n.state);
  e && e.activeHandle > -1 && !e.dragging && rh(n, -1);
}
function Ek(n, e, t, r) {
  var i;
  if (!n.editable) return !1;
  const s = (i = n.dom.ownerDocument.defaultView) != null ? i : window, o = _e.getState(n.state);
  if (!o || o.activeHandle == -1 || o.dragging)
    return !1;
  const l = n.state.doc.nodeAt(o.activeHandle), a = Tk(n, o.activeHandle, l.attrs);
  n.dispatch(
    n.state.tr.setMeta(_e, {
      setDragging: { startX: e.clientX, startWidth: a }
    })
  );
  function c(d) {
    s.removeEventListener("mouseup", c), s.removeEventListener("mousemove", u);
    const f = _e.getState(n.state);
    f != null && f.dragging && (Nk(
      n,
      f.activeHandle,
      lu(f.dragging, d, t)
    ), n.dispatch(
      n.state.tr.setMeta(_e, { setDragging: null })
    ));
  }
  function u(d) {
    if (!d.which) return c(d);
    const f = _e.getState(n.state);
    if (f && f.dragging) {
      const h = lu(f.dragging, d, t);
      au(
        n,
        f.activeHandle,
        h,
        r
      );
    }
  }
  return au(
    n,
    o.activeHandle,
    a,
    r
  ), s.addEventListener("mouseup", c), s.addEventListener("mousemove", u), e.preventDefault(), !0;
}
function Tk(n, e, { colspan: t, colwidth: r }) {
  const i = r && r[r.length - 1];
  if (i) return i;
  const s = n.domAtPos(e);
  let l = s.node.childNodes[s.offset].offsetWidth, a = t;
  if (r)
    for (let c = 0; c < t; c++)
      r[c] && (l -= r[c], a--);
  return l / a;
}
function Ok(n) {
  for (; n && n.nodeName != "TD" && n.nodeName != "TH"; )
    n = n.classList && n.classList.contains("ProseMirror") ? null : n.parentNode;
  return n;
}
function ou(n, e, t, r) {
  const i = t == "right" ? -r : r, s = n.posAtCoords({
    left: e.clientX + i,
    top: e.clientY
  });
  if (!s) return -1;
  const { pos: o } = s, l = pr(n.state.doc.resolve(o));
  if (!l) return -1;
  if (t == "right") return l.pos;
  const a = oe.get(l.node(-1)), c = l.start(-1), u = a.map.indexOf(l.pos - c);
  return u % a.width == 0 ? -1 : c + a.map[u - 1];
}
function lu(n, e, t) {
  const r = e.clientX - n.startX;
  return Math.max(t, n.startWidth + r);
}
function rh(n, e) {
  n.dispatch(
    n.state.tr.setMeta(_e, { setHandle: e })
  );
}
function Nk(n, e, t) {
  const r = n.state.doc.resolve(e), i = r.node(-1), s = oe.get(i), o = r.start(-1), l = s.colCount(r.pos - o) + r.nodeAfter.attrs.colspan - 1, a = n.state.tr;
  for (let c = 0; c < s.height; c++) {
    const u = c * s.width + l;
    if (c && s.map[u] == s.map[u - s.width]) continue;
    const d = s.map[u], f = i.nodeAt(d).attrs, h = f.colspan == 1 ? 0 : l - s.colCount(d);
    if (f.colwidth && f.colwidth[h] == t) continue;
    const p = f.colwidth ? f.colwidth.slice() : Dk(f.colspan);
    p[h] = t, a.setNodeMarkup(o + d, null, { ...f, colwidth: p });
  }
  a.docChanged && n.dispatch(a);
}
function au(n, e, t, r) {
  const i = n.state.doc.resolve(e), s = i.node(-1), o = i.start(-1), l = oe.get(s).colCount(i.pos - o) + i.nodeAfter.attrs.colspan - 1;
  let a = n.domAtPos(i.start(-1)).node;
  for (; a && a.nodeName != "TABLE"; )
    a = a.parentNode;
  a && ml(
    s,
    a.firstChild,
    a,
    r,
    l,
    t
  );
}
function Dk(n) {
  return Array(n).fill(0);
}
function Lk(n, e) {
  var t;
  const r = [], i = n.doc.resolve(e), s = i.node(-1);
  if (!s)
    return ie.empty;
  const o = oe.get(s), l = i.start(-1), a = o.colCount(i.pos - l) + i.nodeAfter.attrs.colspan - 1;
  for (let c = 0; c < o.height; c++) {
    const u = a + c * o.width;
    if ((a == o.width - 1 || o.map[u] != o.map[u + 1]) && (c == 0 || o.map[u] != o.map[u - o.width])) {
      const d = o.map[u], f = l + d + s.nodeAt(d).nodeSize - 1, h = document.createElement("div");
      h.className = "column-resize-handle", (t = _e.getState(n)) != null && t.dragging && r.push(
        xe.node(
          l + d,
          l + d + s.nodeAt(d).nodeSize,
          {
            class: "column-resize-dragging"
          }
        )
      ), r.push(xe.widget(f, h));
    }
  }
  return ie.create(n.doc, r);
}
function Rk({
  allowTableNodeSelection: n = !1
} = {}) {
  return new le({
    key: Ut,
    // This piece of state is used to remember when a mouse-drag
    // cell-selection is happening, so that it can continue even as
    // transactions (which might move its anchor cell) come in.
    state: {
      init() {
        return null;
      },
      apply(e, t) {
        const r = e.getMeta(Ut);
        if (r != null) return r == -1 ? null : r;
        if (t == null || !e.docChanged) return t;
        const { deleted: i, pos: s } = e.mapping.mapResult(t);
        return i ? null : s;
      }
    },
    props: {
      decorations: Kw,
      handleDOMEvents: {
        mousedown: kk
      },
      createSelectionBetween(e) {
        return Ut.getState(e.state) != null ? e.state.selection : null;
      },
      handleTripleClick: vk,
      handleKeyDown: bk,
      handlePaste: wk
    },
    appendTransaction(e, t, r) {
      return Gw(
        r,
        Zf(r, t),
        n
      );
    }
  });
}
function gl(n, e) {
  return e ? ["width", `${Math.max(e, n)}px`] : ["min-width", `${n}px`];
}
function cu(n, e, t, r, i, s) {
  var o;
  let l = 0, a = !0, c = e.firstChild;
  const u = n.firstChild;
  if (u !== null)
    for (let d = 0, f = 0; d < u.childCount; d += 1) {
      const { colspan: h, colwidth: p } = u.child(d).attrs;
      for (let m = 0; m < h; m += 1, f += 1) {
        const g = i === f ? s : p && p[m], y = g ? `${g}px` : "";
        if (l += g || r, g || (a = !1), c) {
          if (c.style.width !== y) {
            const [w, C] = gl(r, g);
            c.style.setProperty(w, C);
          }
          c = c.nextSibling;
        } else {
          const w = document.createElement("col"), [C, b] = gl(r, g);
          w.style.setProperty(C, b), e.appendChild(w);
        }
      }
    }
  for (; c; ) {
    const d = c.nextSibling;
    (o = c.parentNode) === null || o === void 0 || o.removeChild(c), c = d;
  }
  a ? (t.style.width = `${l}px`, t.style.minWidth = "") : (t.style.width = "", t.style.minWidth = `${l}px`);
}
class Ik {
  constructor(e, t) {
    this.node = e, this.cellMinWidth = t, this.dom = document.createElement("div"), this.dom.className = "tableWrapper", this.table = this.dom.appendChild(document.createElement("table")), this.colgroup = this.table.appendChild(document.createElement("colgroup")), cu(e, this.colgroup, this.table, t), this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(e) {
    return e.type !== this.node.type ? !1 : (this.node = e, cu(e, this.colgroup, this.table, this.cellMinWidth), !0);
  }
  ignoreMutation(e) {
    return e.type === "attributes" && (e.target === this.table || this.colgroup.contains(e.target));
  }
}
function Pk(n, e, t, r) {
  let i = 0, s = !0;
  const o = [], l = n.firstChild;
  if (!l)
    return {};
  for (let d = 0, f = 0; d < l.childCount; d += 1) {
    const { colspan: h, colwidth: p } = l.child(d).attrs;
    for (let m = 0; m < h; m += 1, f += 1) {
      const g = t === f ? r : p && p[m];
      i += g || e, g || (s = !1);
      const [y, w] = gl(e, g);
      o.push([
        "col",
        { style: `${y}: ${w}` }
      ]);
    }
  }
  const a = s ? `${i}px` : "", c = s ? "" : `${i}px`;
  return { colgroup: ["colgroup", {}, ...o], tableWidth: a, tableMinWidth: c };
}
function uu(n, e) {
  return n.createAndFill();
}
function Bk(n) {
  if (n.cached.tableNodeTypes)
    return n.cached.tableNodeTypes;
  const e = {};
  return Object.keys(n.nodes).forEach((t) => {
    const r = n.nodes[t];
    r.spec.tableRole && (e[r.spec.tableRole] = r);
  }), n.cached.tableNodeTypes = e, e;
}
function Hk(n, e, t, r, i) {
  const s = Bk(n), o = [], l = [];
  for (let c = 0; c < t; c += 1) {
    const u = uu(s.cell);
    if (u && l.push(u), r) {
      const d = uu(s.header_cell);
      d && o.push(d);
    }
  }
  const a = [];
  for (let c = 0; c < e; c += 1)
    a.push(s.row.createChecked(null, r && c === 0 ? o : l));
  return s.table.createChecked(null, a);
}
function Fk(n) {
  return n instanceof ne;
}
const Li = ({ editor: n }) => {
  const { selection: e } = n.state;
  if (!Fk(e))
    return !1;
  let t = 0;
  const r = vf(e.ranges[0].$from, (s) => s.type.name === "table");
  return r == null || r.node.descendants((s) => {
    if (s.type.name === "table")
      return !1;
    ["tableCell", "tableHeader"].includes(s.type.name) && (t += 1);
  }), t === e.ranges.length ? (n.commands.deleteTable(), !0) : !1;
}, zk = ce.create({
  name: "table",
  // @ts-ignore
  addOptions() {
    return {
      HTMLAttributes: {},
      resizable: !1,
      handleWidth: 5,
      cellMinWidth: 25,
      // TODO: fix
      View: Ik,
      lastColumnResizable: !0,
      allowTableNodeSelection: !1
    };
  },
  content: "tableRow+",
  tableRole: "table",
  isolating: !0,
  group: "block",
  parseHTML() {
    return [{ tag: "table" }];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    const { colgroup: t, tableWidth: r, tableMinWidth: i } = Pk(n, this.options.cellMinWidth);
    return [
      "table",
      Q(this.options.HTMLAttributes, e, {
        style: r ? `width: ${r}` : `min-width: ${i}`
      }),
      t,
      ["tbody", 0]
    ];
  },
  addCommands() {
    return {
      insertTable: ({ rows: n = 3, cols: e = 3, withHeaderRow: t = !0 } = {}) => ({ tr: r, dispatch: i, editor: s }) => {
        const o = Hk(s.schema, n, e, t);
        if (i) {
          const l = r.selection.from + 1;
          r.replaceSelectionWith(o).scrollIntoView().setSelection(F.near(r.doc.resolve(l)));
        }
        return !0;
      },
      addColumnBefore: () => ({ state: n, dispatch: e }) => Qw(n, e),
      addColumnAfter: () => ({ state: n, dispatch: e }) => Zw(n, e),
      deleteColumn: () => ({ state: n, dispatch: e }) => tk(n, e),
      addRowBefore: () => ({ state: n, dispatch: e }) => rk(n, e),
      addRowAfter: () => ({ state: n, dispatch: e }) => ik(n, e),
      deleteRow: () => ({ state: n, dispatch: e }) => ok(n, e),
      deleteTable: () => ({ state: n, dispatch: e }) => hk(n, e),
      mergeCells: () => ({ state: n, dispatch: e }) => Qc(n, e),
      splitCell: () => ({ state: n, dispatch: e }) => Zc(n, e),
      toggleHeaderColumn: () => ({ state: n, dispatch: e }) => ti("column")(n, e),
      toggleHeaderRow: () => ({ state: n, dispatch: e }) => ti("row")(n, e),
      toggleHeaderCell: () => ({ state: n, dispatch: e }) => dk(n, e),
      mergeOrSplit: () => ({ state: n, dispatch: e }) => Qc(n, e) ? !0 : Zc(n, e),
      setCellAttribute: (n, e) => ({ state: t, dispatch: r }) => ck(n, e)(t, r),
      goToNextCell: () => ({ state: n, dispatch: e }) => tu(1)(n, e),
      goToPreviousCell: () => ({ state: n, dispatch: e }) => tu(-1)(n, e),
      fixTables: () => ({ state: n, dispatch: e }) => (e && Zf(n), !0),
      setCellSelection: (n) => ({ tr: e, dispatch: t }) => {
        if (t) {
          const r = ne.create(e.doc, n.anchorCell, n.headCell);
          e.setSelection(r);
        }
        return !0;
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.goToNextCell() ? !0 : this.editor.can().addRowAfter() ? this.editor.chain().addRowAfter().goToNextCell().run() : !1,
      "Shift-Tab": () => this.editor.commands.goToPreviousCell(),
      Backspace: Li,
      "Mod-Backspace": Li,
      Delete: Li,
      "Mod-Delete": Li
    };
  },
  addProseMirrorPlugins() {
    return [
      ...this.options.resizable && this.editor.isEditable ? [
        xk({
          handleWidth: this.options.handleWidth,
          cellMinWidth: this.options.cellMinWidth,
          defaultCellMinWidth: this.options.cellMinWidth,
          View: this.options.View,
          lastColumnResizable: this.options.lastColumnResizable
        })
      ] : [],
      Rk({
        allowTableNodeSelection: this.options.allowTableNodeSelection
      })
    ];
  },
  extendNodeSchema(n) {
    const e = {
      name: n.name,
      options: n.options,
      storage: n.storage
    };
    return {
      tableRole: W(L(n, "tableRole", e))
    };
  }
}), Vk = ce.create({
  name: "tableCell",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (n) => {
          const e = n.getAttribute("colwidth");
          return e ? e.split(",").map((r) => parseInt(r, 10)) : null;
        }
      }
    };
  },
  tableRole: "cell",
  isolating: !0,
  parseHTML() {
    return [
      { tag: "td" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["td", Q(this.options.HTMLAttributes, n), 0];
  }
}), $k = ce.create({
  name: "tableHeader",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (n) => {
          const e = n.getAttribute("colwidth");
          return e ? e.split(",").map((r) => parseInt(r, 10)) : null;
        }
      }
    };
  },
  tableRole: "header_cell",
  isolating: !0,
  parseHTML() {
    return [
      { tag: "th" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["th", Q(this.options.HTMLAttributes, n), 0];
  }
}), _k = ce.create({
  name: "tableRow",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "(tableCell | tableHeader)*",
  tableRole: "row",
  parseHTML() {
    return [
      { tag: "tr" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["tr", Q(this.options.HTMLAttributes, n), 0];
  }
}), jk = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", Wk = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", ur = (n, e) => {
  for (const t in e)
    n[t] = e[t];
  return n;
}, yl = "numeric", bl = "ascii", vl = "alpha", Pr = "asciinumeric", Er = "alphanumeric", wl = "domain", ih = "emoji", Uk = "scheme", Kk = "slashscheme", Do = "whitespace";
function qk(n, e) {
  return n in e || (e[n] = []), e[n];
}
function wn(n, e, t) {
  e[yl] && (e[Pr] = !0, e[Er] = !0), e[bl] && (e[Pr] = !0, e[vl] = !0), e[Pr] && (e[Er] = !0), e[vl] && (e[Er] = !0), e[Er] && (e[wl] = !0), e[ih] && (e[wl] = !0);
  for (const r in e) {
    const i = qk(r, t);
    i.indexOf(n) < 0 && i.push(n);
  }
}
function Jk(n, e) {
  const t = {};
  for (const r in e)
    e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function Le(n = null) {
  this.j = {}, this.jr = [], this.jd = null, this.t = n;
}
Le.groups = {};
Le.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(n) {
    const e = this, t = e.j[n];
    if (t)
      return t;
    for (let r = 0; r < e.jr.length; r++) {
      const i = e.jr[r][0], s = e.jr[r][1];
      if (s && i.test(n))
        return s;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(n, e = !1) {
    return e ? n in this.j : !!this.go(n);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(n, e, t, r) {
    for (let i = 0; i < n.length; i++)
      this.tt(n[i], e, t, r);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(n, e, t, r) {
    r = r || Le.groups;
    let i;
    return e && e.j ? i = e : (i = new Le(e), t && r && wn(e, t, r)), this.jr.push([n, i]), i;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(n, e, t, r) {
    let i = this;
    const s = n.length;
    if (!s)
      return i;
    for (let o = 0; o < s - 1; o++)
      i = i.tt(n[o]);
    return i.tt(n[s - 1], e, t, r);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(n, e, t, r) {
    r = r || Le.groups;
    const i = this;
    if (e && e.j)
      return i.j[n] = e, e;
    const s = e;
    let o, l = i.go(n);
    if (l ? (o = new Le(), ur(o.j, l.j), o.jr.push.apply(o.jr, l.jr), o.jd = l.jd, o.t = l.t) : o = new Le(), s) {
      if (r)
        if (o.t && typeof o.t == "string") {
          const a = ur(Jk(o.t, r), t);
          wn(s, a, r);
        } else t && wn(s, t, r);
      o.t = s;
    }
    return i.j[n] = o, o;
  }
};
const U = (n, e, t, r, i) => n.ta(e, t, r, i), se = (n, e, t, r, i) => n.tr(e, t, r, i), du = (n, e, t, r, i) => n.ts(e, t, r, i), E = (n, e, t, r, i) => n.tt(e, t, r, i), Tt = "WORD", kl = "UWORD", sh = "ASCIINUMERICAL", oh = "ALPHANUMERICAL", ni = "LOCALHOST", Cl = "TLD", xl = "UTLD", Wi = "SCHEME", Yn = "SLASH_SCHEME", ha = "NUM", Sl = "WS", pa = "NL", Br = "OPENBRACE", Hr = "CLOSEBRACE", as = "OPENBRACKET", cs = "CLOSEBRACKET", us = "OPENPAREN", ds = "CLOSEPAREN", fs = "OPENANGLEBRACKET", hs = "CLOSEANGLEBRACKET", ps = "FULLWIDTHLEFTPAREN", ms = "FULLWIDTHRIGHTPAREN", gs = "LEFTCORNERBRACKET", ys = "RIGHTCORNERBRACKET", bs = "LEFTWHITECORNERBRACKET", vs = "RIGHTWHITECORNERBRACKET", ws = "FULLWIDTHLESSTHAN", ks = "FULLWIDTHGREATERTHAN", Cs = "AMPERSAND", xs = "APOSTROPHE", Ss = "ASTERISK", _t = "AT", Ms = "BACKSLASH", As = "BACKTICK", Es = "CARET", Kt = "COLON", ma = "COMMA", Ts = "DOLLAR", ct = "DOT", Os = "EQUALS", ga = "EXCLAMATION", Je = "HYPHEN", Fr = "PERCENT", Ns = "PIPE", Ds = "PLUS", Ls = "POUND", zr = "QUERY", ya = "QUOTE", lh = "FULLWIDTHMIDDLEDOT", ba = "SEMI", ut = "SLASH", Vr = "TILDE", Rs = "UNDERSCORE", ah = "EMOJI", Is = "SYM";
var ch = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ALPHANUMERICAL: oh,
  AMPERSAND: Cs,
  APOSTROPHE: xs,
  ASCIINUMERICAL: sh,
  ASTERISK: Ss,
  AT: _t,
  BACKSLASH: Ms,
  BACKTICK: As,
  CARET: Es,
  CLOSEANGLEBRACKET: hs,
  CLOSEBRACE: Hr,
  CLOSEBRACKET: cs,
  CLOSEPAREN: ds,
  COLON: Kt,
  COMMA: ma,
  DOLLAR: Ts,
  DOT: ct,
  EMOJI: ah,
  EQUALS: Os,
  EXCLAMATION: ga,
  FULLWIDTHGREATERTHAN: ks,
  FULLWIDTHLEFTPAREN: ps,
  FULLWIDTHLESSTHAN: ws,
  FULLWIDTHMIDDLEDOT: lh,
  FULLWIDTHRIGHTPAREN: ms,
  HYPHEN: Je,
  LEFTCORNERBRACKET: gs,
  LEFTWHITECORNERBRACKET: bs,
  LOCALHOST: ni,
  NL: pa,
  NUM: ha,
  OPENANGLEBRACKET: fs,
  OPENBRACE: Br,
  OPENBRACKET: as,
  OPENPAREN: us,
  PERCENT: Fr,
  PIPE: Ns,
  PLUS: Ds,
  POUND: Ls,
  QUERY: zr,
  QUOTE: ya,
  RIGHTCORNERBRACKET: ys,
  RIGHTWHITECORNERBRACKET: vs,
  SCHEME: Wi,
  SEMI: ba,
  SLASH: ut,
  SLASH_SCHEME: Yn,
  SYM: Is,
  TILDE: Vr,
  TLD: Cl,
  UNDERSCORE: Rs,
  UTLD: xl,
  UWORD: kl,
  WORD: Tt,
  WS: Sl
});
const Mt = /[a-z]/, xr = new RegExp("\\p{L}", "u"), Lo = new RegExp("\\p{Emoji}", "u"), At = /\d/, Ro = /\s/, fu = "\r", Io = `
`, Gk = "️", Yk = "‍", Po = "￼";
let Ri = null, Ii = null;
function Xk(n = []) {
  const e = {};
  Le.groups = e;
  const t = new Le();
  Ri == null && (Ri = hu(jk)), Ii == null && (Ii = hu(Wk)), E(t, "'", xs), E(t, "{", Br), E(t, "}", Hr), E(t, "[", as), E(t, "]", cs), E(t, "(", us), E(t, ")", ds), E(t, "<", fs), E(t, ">", hs), E(t, "（", ps), E(t, "）", ms), E(t, "「", gs), E(t, "」", ys), E(t, "『", bs), E(t, "』", vs), E(t, "＜", ws), E(t, "＞", ks), E(t, "&", Cs), E(t, "*", Ss), E(t, "@", _t), E(t, "`", As), E(t, "^", Es), E(t, ":", Kt), E(t, ",", ma), E(t, "$", Ts), E(t, ".", ct), E(t, "=", Os), E(t, "!", ga), E(t, "-", Je), E(t, "%", Fr), E(t, "|", Ns), E(t, "+", Ds), E(t, "#", Ls), E(t, "?", zr), E(t, '"', ya), E(t, "/", ut), E(t, ";", ba), E(t, "~", Vr), E(t, "_", Rs), E(t, "\\", Ms), E(t, "・", lh);
  const r = se(t, At, ha, {
    [yl]: !0
  });
  se(r, At, r);
  const i = se(r, Mt, sh, {
    [Pr]: !0
  }), s = se(r, xr, oh, {
    [Er]: !0
  }), o = se(t, Mt, Tt, {
    [bl]: !0
  });
  se(o, At, i), se(o, Mt, o), se(i, At, i), se(i, Mt, i);
  const l = se(t, xr, kl, {
    [vl]: !0
  });
  se(l, Mt), se(l, At, s), se(l, xr, l), se(s, At, s), se(s, Mt), se(s, xr, s);
  const a = E(t, Io, pa, {
    [Do]: !0
  }), c = E(t, fu, Sl, {
    [Do]: !0
  }), u = se(t, Ro, Sl, {
    [Do]: !0
  });
  E(t, Po, u), E(c, Io, a), E(c, Po, u), se(c, Ro, u), E(u, fu), E(u, Io), se(u, Ro, u), E(u, Po, u);
  const d = se(t, Lo, ah, {
    [ih]: !0
  });
  E(d, "#"), se(d, Lo, d), E(d, Gk, d);
  const f = E(d, Yk);
  E(f, "#"), se(f, Lo, d);
  const h = [[Mt, o], [At, i]], p = [[Mt, null], [xr, l], [At, s]];
  for (let m = 0; m < Ri.length; m++)
    zt(t, Ri[m], Cl, Tt, h);
  for (let m = 0; m < Ii.length; m++)
    zt(t, Ii[m], xl, kl, p);
  wn(Cl, {
    tld: !0,
    ascii: !0
  }, e), wn(xl, {
    utld: !0,
    alpha: !0
  }, e), zt(t, "file", Wi, Tt, h), zt(t, "mailto", Wi, Tt, h), zt(t, "http", Yn, Tt, h), zt(t, "https", Yn, Tt, h), zt(t, "ftp", Yn, Tt, h), zt(t, "ftps", Yn, Tt, h), wn(Wi, {
    scheme: !0,
    ascii: !0
  }, e), wn(Yn, {
    slashscheme: !0,
    ascii: !0
  }, e), n = n.sort((m, g) => m[0] > g[0] ? 1 : -1);
  for (let m = 0; m < n.length; m++) {
    const g = n[m][0], w = n[m][1] ? {
      [Uk]: !0
    } : {
      [Kk]: !0
    };
    g.indexOf("-") >= 0 ? w[wl] = !0 : Mt.test(g) ? At.test(g) ? w[Pr] = !0 : w[bl] = !0 : w[yl] = !0, du(t, g, g, w);
  }
  return du(t, "localhost", ni, {
    ascii: !0
  }), t.jd = new Le(Is), {
    start: t,
    tokens: ur({
      groups: e
    }, ch)
  };
}
function uh(n, e) {
  const t = Qk(e.replace(/[A-Z]/g, (l) => l.toLowerCase())), r = t.length, i = [];
  let s = 0, o = 0;
  for (; o < r; ) {
    let l = n, a = null, c = 0, u = null, d = -1, f = -1;
    for (; o < r && (a = l.go(t[o])); )
      l = a, l.accepts() ? (d = 0, f = 0, u = l) : d >= 0 && (d += t[o].length, f++), c += t[o].length, s += t[o].length, o++;
    s -= d, o -= f, c -= d, i.push({
      t: u.t,
      // token type/name
      v: e.slice(s - c, s),
      // string value
      s: s - c,
      // start index
      e: s
      // end index (excluding)
    });
  }
  return i;
}
function Qk(n) {
  const e = [], t = n.length;
  let r = 0;
  for (; r < t; ) {
    let i = n.charCodeAt(r), s, o = i < 55296 || i > 56319 || r + 1 === t || (s = n.charCodeAt(r + 1)) < 56320 || s > 57343 ? n[r] : n.slice(r, r + 2);
    e.push(o), r += o.length;
  }
  return e;
}
function zt(n, e, t, r, i) {
  let s;
  const o = e.length;
  for (let l = 0; l < o - 1; l++) {
    const a = e[l];
    n.j[a] ? s = n.j[a] : (s = new Le(r), s.jr = i.slice(), n.j[a] = s), n = s;
  }
  return s = new Le(t), s.jr = i.slice(), n.j[e[o - 1]] = s, s;
}
function hu(n) {
  const e = [], t = [];
  let r = 0, i = "0123456789";
  for (; r < n.length; ) {
    let s = 0;
    for (; i.indexOf(n[r + s]) >= 0; )
      s++;
    if (s > 0) {
      e.push(t.join(""));
      for (let o = parseInt(n.substring(r, r + s), 10); o > 0; o--)
        t.pop();
      r += s;
    } else
      t.push(n[r]), r++;
  }
  return e;
}
const ri = {
  defaultProtocol: "http",
  events: null,
  format: pu,
  formatHref: pu,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function va(n, e = null) {
  let t = ur({}, ri);
  n && (t = ur(t, n instanceof va ? n.o : n));
  const r = t.ignoreTags, i = [];
  for (let s = 0; s < r.length; s++)
    i.push(r[s].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = i;
}
va.prototype = {
  o: ri,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(n) {
    return n;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(n) {
    return this.get("validate", n.toString(), n);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(n, e, t) {
    const r = e != null;
    let i = this.o[n];
    return i && (typeof i == "object" ? (i = t.t in i ? i[t.t] : ri[n], typeof i == "function" && r && (i = i(e, t))) : typeof i == "function" && r && (i = i(e, t.t, t)), i);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(n, e, t) {
    let r = this.o[n];
    return typeof r == "function" && e != null && (r = r(e, t.t, t)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(n) {
    const e = n.render(this);
    return (this.get("render", null, n) || this.defaultRender)(e, n.t, n);
  }
};
function pu(n) {
  return n;
}
function dh(n, e) {
  this.t = "token", this.v = n, this.tk = e;
}
dh.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
   */
  toHref(n) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(n) {
    const e = this.toString(), t = n.get("truncate", e, this), r = n.get("format", e, this);
    return t && r.length > t ? r.substring(0, t) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(n) {
    return n.get("formatHref", this.toHref(n.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(n = ri.defaultProtocol) {
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(n) {
    return {
      type: this.t,
      value: this.toFormattedString(n),
      isLink: this.isLink,
      href: this.toFormattedHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(n) {
    return n.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(n) {
    const e = this, t = this.toHref(n.get("defaultProtocol")), r = n.get("formatHref", t, this), i = n.get("tagName", t, e), s = this.toFormattedString(n), o = {}, l = n.get("className", t, e), a = n.get("target", t, e), c = n.get("rel", t, e), u = n.getObj("attributes", t, e), d = n.getObj("events", t, e);
    return o.href = r, l && (o.class = l), a && (o.target = a), c && (o.rel = c), u && ur(o, u), {
      tagName: i,
      attributes: o,
      content: s,
      eventListeners: d
    };
  }
};
function io(n, e) {
  class t extends dh {
    constructor(i, s) {
      super(i, s), this.t = n;
    }
  }
  for (const r in e)
    t.prototype[r] = e[r];
  return t.t = n, t;
}
const mu = io("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), gu = io("text"), Zk = io("nl"), Pi = io("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(n = ri.defaultProtocol) {
    return this.hasProtocol() ? this.v : `${n}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const n = this.tk;
    return n.length >= 2 && n[0].t !== ni && n[1].t === Kt;
  }
}), qe = (n) => new Le(n);
function eC({
  groups: n
}) {
  const e = n.domain.concat([Cs, Ss, _t, Ms, As, Es, Ts, Os, Je, ha, Fr, Ns, Ds, Ls, ut, Is, Vr, Rs]), t = [xs, Kt, ma, ct, ga, Fr, zr, ya, ba, fs, hs, Br, Hr, cs, as, us, ds, ps, ms, gs, ys, bs, vs, ws, ks], r = [Cs, xs, Ss, Ms, As, Es, Ts, Os, Je, Br, Hr, Fr, Ns, Ds, Ls, zr, ut, Is, Vr, Rs], i = qe(), s = E(i, Vr);
  U(s, r, s), U(s, n.domain, s);
  const o = qe(), l = qe(), a = qe();
  U(i, n.domain, o), U(i, n.scheme, l), U(i, n.slashscheme, a), U(o, r, s), U(o, n.domain, o);
  const c = E(o, _t);
  E(s, _t, c), E(l, _t, c), E(a, _t, c);
  const u = E(s, ct);
  U(u, r, s), U(u, n.domain, s);
  const d = qe();
  U(c, n.domain, d), U(d, n.domain, d);
  const f = E(d, ct);
  U(f, n.domain, d);
  const h = qe(mu);
  U(f, n.tld, h), U(f, n.utld, h), E(c, ni, h);
  const p = E(d, Je);
  E(p, Je, p), U(p, n.domain, d), U(h, n.domain, d), E(h, ct, f), E(h, Je, p);
  const m = E(h, Kt);
  U(m, n.numeric, mu);
  const g = E(o, Je), y = E(o, ct);
  E(g, Je, g), U(g, n.domain, o), U(y, r, s), U(y, n.domain, o);
  const w = qe(Pi);
  U(y, n.tld, w), U(y, n.utld, w), U(w, n.domain, o), U(w, r, s), E(w, ct, y), E(w, Je, g), E(w, _t, c);
  const C = E(w, Kt), b = qe(Pi);
  U(C, n.numeric, b);
  const S = qe(Pi), k = qe();
  U(S, e, S), U(S, t, k), U(k, e, S), U(k, t, k), E(w, ut, S), E(b, ut, S);
  const T = E(l, Kt), M = E(a, Kt), I = E(M, ut), N = E(I, ut);
  U(l, n.domain, o), E(l, ct, y), E(l, Je, g), U(a, n.domain, o), E(a, ct, y), E(a, Je, g), U(T, n.domain, S), E(T, ut, S), E(T, zr, S), U(N, n.domain, S), U(N, e, S), E(N, ut, S);
  const j = [
    [Br, Hr],
    // {}
    [as, cs],
    // []
    [us, ds],
    // ()
    [fs, hs],
    // <>
    [ps, ms],
    // （）
    [gs, ys],
    // 「」
    [bs, vs],
    // 『』
    [ws, ks]
    // ＜＞
  ];
  for (let K = 0; K < j.length; K++) {
    const [Y, J] = j[K], Z = E(S, Y);
    E(k, Y, Z), E(Z, J, S);
    const G = qe(Pi);
    U(Z, e, G);
    const ee = qe();
    U(Z, t), U(G, e, G), U(G, t, ee), U(ee, e, G), U(ee, t, ee), E(G, J, S), E(ee, J, S);
  }
  return E(i, ni, w), E(i, pa, Zk), {
    start: i,
    tokens: ch
  };
}
function tC(n, e, t) {
  let r = t.length, i = 0, s = [], o = [];
  for (; i < r; ) {
    let l = n, a = null, c = null, u = 0, d = null, f = -1;
    for (; i < r && !(a = l.go(t[i].t)); )
      o.push(t[i++]);
    for (; i < r && (c = a || l.go(t[i].t)); )
      a = null, l = c, l.accepts() ? (f = 0, d = l) : f >= 0 && f++, i++, u++;
    if (f < 0)
      i -= u, i < r && (o.push(t[i]), i++);
    else {
      o.length > 0 && (s.push(Bo(gu, e, o)), o = []), i -= f, u -= f;
      const h = d.t, p = t.slice(i - u, i);
      s.push(Bo(h, e, p));
    }
  }
  return o.length > 0 && s.push(Bo(gu, e, o)), s;
}
function Bo(n, e, t) {
  const r = t[0].s, i = t[t.length - 1].e, s = e.slice(r, i);
  return new n(s, t);
}
const nC = typeof console < "u" && console && console.warn || (() => {
}), rC = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", re = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function iC() {
  return Le.groups = {}, re.scanner = null, re.parser = null, re.tokenQueue = [], re.pluginQueue = [], re.customSchemes = [], re.initialized = !1, re;
}
function yu(n, e = !1) {
  if (re.initialized && nC(`linkifyjs: already initialized - will not register custom scheme "${n}" ${rC}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  re.customSchemes.push([n, e]);
}
function sC() {
  re.scanner = Xk(re.customSchemes);
  for (let n = 0; n < re.tokenQueue.length; n++)
    re.tokenQueue[n][1]({
      scanner: re.scanner
    });
  re.parser = eC(re.scanner.tokens);
  for (let n = 0; n < re.pluginQueue.length; n++)
    re.pluginQueue[n][1]({
      scanner: re.scanner,
      parser: re.parser
    });
  return re.initialized = !0, re;
}
function wa(n) {
  return re.initialized || sC(), tC(re.parser.start, n, uh(re.scanner.start, n));
}
wa.scan = uh;
function fh(n, e = null, t = null) {
  if (e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const r = new va(t), i = wa(n), s = [];
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    l.isLink && (!e || l.t === e) && r.check(l) && s.push(l.toFormattedObject(r));
  }
  return s;
}
function oC(n) {
  return n.length === 1 ? n[0].isLink : n.length === 3 && n[1].isLink ? ["()", "[]"].includes(n[0].value + n[2].value) : !1;
}
function lC(n) {
  return new le({
    key: new ue("autolink"),
    appendTransaction: (e, t, r) => {
      const i = e.some((c) => c.docChanged) && !t.doc.eq(r.doc), s = e.some((c) => c.getMeta("preventAutolink"));
      if (!i || s)
        return;
      const { tr: o } = r, l = qy(t.doc, [...e]);
      if (Zy(l).forEach(({ newRange: c }) => {
        const u = Gy(r.doc, c, (h) => h.isTextblock);
        let d, f;
        if (u.length > 1 ? (d = u[0], f = r.doc.textBetween(d.pos, d.pos + d.node.nodeSize, void 0, " ")) : u.length && r.doc.textBetween(c.from, c.to, " ", " ").endsWith(" ") && (d = u[0], f = r.doc.textBetween(d.pos, c.to, void 0, " ")), d && f) {
          const h = f.split(" ").filter((y) => y !== "");
          if (h.length <= 0)
            return !1;
          const p = h[h.length - 1], m = d.pos + f.lastIndexOf(p);
          if (!p)
            return !1;
          const g = wa(p).map((y) => y.toObject(n.defaultProtocol));
          if (!oC(g))
            return !1;
          g.filter((y) => y.isLink).map((y) => ({
            ...y,
            from: m + y.start + 1,
            to: m + y.end + 1
          })).filter((y) => r.schema.marks.code ? !r.doc.rangeHasMark(y.from, y.to, r.schema.marks.code) : !0).filter((y) => n.validate(y.value)).filter((y) => n.shouldAutoLink(y.value)).forEach((y) => {
            ra(y.from, y.to, r.doc).some((w) => w.mark.type === n.type) || o.addMark(y.from, y.to, n.type.create({
              href: y.href
            }));
          });
        }
      }), !!o.steps.length)
        return o;
    }
  });
}
function aC(n) {
  return new le({
    key: new ue("handleClickLink"),
    props: {
      handleClick: (e, t, r) => {
        var i, s;
        if (r.button !== 0 || !e.editable)
          return !1;
        let o = r.target;
        const l = [];
        for (; o.nodeName !== "DIV"; )
          l.push(o), o = o.parentNode;
        if (!l.find((f) => f.nodeName === "A"))
          return !1;
        const a = kf(e.state, n.type.name), c = r.target, u = (i = c == null ? void 0 : c.href) !== null && i !== void 0 ? i : a.href, d = (s = c == null ? void 0 : c.target) !== null && s !== void 0 ? s : a.target;
        return c && u ? (window.open(u, d), !0) : !1;
      }
    }
  });
}
function cC(n) {
  return new le({
    key: new ue("handlePasteLink"),
    props: {
      handlePaste: (e, t, r) => {
        const { state: i } = e, { selection: s } = i, { empty: o } = s;
        if (o)
          return !1;
        let l = "";
        r.content.forEach((c) => {
          l += c.textContent;
        });
        const a = fh(l, { defaultProtocol: n.defaultProtocol }).find((c) => c.isLink && c.value === l);
        return !l || !a ? !1 : n.editor.commands.setMark(n.type, {
          href: a.href
        });
      }
    }
  });
}
const uC = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;
function fn(n, e) {
  const t = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp"
  ];
  return e && e.forEach((r) => {
    const i = typeof r == "string" ? r : r.scheme;
    i && t.push(i);
  }), !n || n.replace(uC, "").match(new RegExp(
    // eslint-disable-next-line no-useless-escape
    `^(?:(?:${t.join("|")}):|[^a-z]|[a-z0-9+.-]+(?:[^a-z+.-:]|$))`,
    "i"
  ));
}
const dC = lt.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  exitable: !0,
  onCreate() {
    this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((n) => {
      if (typeof n == "string") {
        yu(n);
        return;
      }
      yu(n.scheme, n.optionalSlashes);
    });
  },
  onDestroy() {
    iC();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      defaultProtocol: "http",
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      isAllowedUri: (n, e) => !!fn(n, e.protocols),
      validate: (n) => !!n,
      shouldAutoLink: (n) => !!n
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(n) {
          return n.getAttribute("href");
        }
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "a[href]",
        getAttrs: (n) => {
          const e = n.getAttribute("href");
          return !e || !this.options.isAllowedUri(e, {
            defaultValidate: (t) => !!fn(t, this.options.protocols),
            protocols: this.options.protocols,
            defaultProtocol: this.options.defaultProtocol
          }) ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return this.options.isAllowedUri(n.href, {
      defaultValidate: (e) => !!fn(e, this.options.protocols),
      protocols: this.options.protocols,
      defaultProtocol: this.options.defaultProtocol
    }) ? ["a", Q(this.options.HTMLAttributes, n), 0] : [
      "a",
      Q(this.options.HTMLAttributes, { ...n, href: "" }),
      0
    ];
  },
  addCommands() {
    return {
      setLink: (n) => ({ chain: e }) => {
        const { href: t } = n;
        return this.options.isAllowedUri(t, {
          defaultValidate: (r) => !!fn(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? e().setMark(this.name, n).setMeta("preventAutolink", !0).run() : !1;
      },
      toggleLink: (n) => ({ chain: e }) => {
        const { href: t } = n;
        return this.options.isAllowedUri(t, {
          defaultValidate: (r) => !!fn(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? e().toggleMark(this.name, n, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run() : !1;
      },
      unsetLink: () => ({ chain: n }) => n().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addPasteRules() {
    return [
      Ln({
        find: (n) => {
          const e = [];
          if (n) {
            const { protocols: t, defaultProtocol: r } = this.options, i = fh(n).filter((s) => s.isLink && this.options.isAllowedUri(s.value, {
              defaultValidate: (o) => !!fn(o, t),
              protocols: t,
              defaultProtocol: r
            }));
            i.length && i.forEach((s) => e.push({
              text: s.value,
              data: {
                href: s.href
              },
              index: s.start
            }));
          }
          return e;
        },
        type: this.type,
        getAttributes: (n) => {
          var e;
          return {
            href: (e = n.data) === null || e === void 0 ? void 0 : e.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const n = [], { protocols: e, defaultProtocol: t } = this.options;
    return this.options.autolink && n.push(lC({
      type: this.type,
      defaultProtocol: this.options.defaultProtocol,
      validate: (r) => this.options.isAllowedUri(r, {
        defaultValidate: (i) => !!fn(i, e),
        protocols: e,
        defaultProtocol: t
      }),
      shouldAutoLink: this.options.shouldAutoLink
    })), this.options.openOnClick === !0 && n.push(aC({
      type: this.type
    })), this.options.linkOnPaste && n.push(cC({
      editor: this.editor,
      defaultProtocol: this.options.defaultProtocol,
      type: this.type
    })), n;
  }
}), fC = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/, hh = ce.create({
  name: "image",
  addOptions() {
    return {
      inline: !1,
      allowBase64: !1,
      HTMLAttributes: {}
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  draggable: !0,
  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? "img[src]" : 'img[src]:not([src^="data:"])'
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["img", Q(this.options.HTMLAttributes, n)];
  },
  addCommands() {
    return {
      setImage: (n) => ({ commands: e }) => e.insertContent({
        type: this.name,
        attrs: n
      })
    };
  },
  addInputRules() {
    return [
      R0({
        find: fC,
        type: this.type,
        getAttributes: (n) => {
          const [, , e, t, r] = n;
          return { src: t, alt: e, title: r };
        }
      })
    ];
  }
}), hC = hh.extend({
  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      style: {
        default: "width: 100%; height: auto; cursor: pointer;",
        parseHTML: (n) => {
          const e = n.getAttribute("width");
          return e ? `width: ${e}px; height: auto; cursor: pointer;` : `${n.style.cssText}`;
        }
      },
      title: {
        default: null
      },
      loading: {
        default: null
      },
      srcset: {
        default: null
      },
      sizes: {
        default: null
      },
      crossorigin: {
        default: null
      },
      usemap: {
        default: null
      },
      ismap: {
        default: null
      },
      width: {
        default: null
      },
      height: {
        default: null
      },
      referrerpolicy: {
        default: null
      },
      longdesc: {
        default: null
      },
      decoding: {
        default: null
      },
      class: {
        default: null
      },
      id: {
        default: null
      },
      name: {
        default: null
      },
      draggable: {
        default: !0
      },
      tabindex: {
        default: null
      },
      "aria-label": {
        default: null
      },
      "aria-labelledby": {
        default: null
      },
      "aria-describedby": {
        default: null
      }
    };
  },
  addNodeView() {
    return ({ node: n, editor: e, getPos: t }) => {
      const { view: r, options: { editable: i } } = e, { style: s } = n.attrs, o = document.createElement("div"), l = document.createElement("div"), a = document.createElement("img"), c = "width: 24px; height: 24px; cursor: pointer;", u = () => {
        if (typeof t == "function") {
          const g = Object.assign(Object.assign({}, n.attrs), { style: `${a.style.cssText}` });
          r.dispatch(r.state.tr.setNodeMarkup(t(), null, g));
        }
      }, d = () => {
        const g = document.createElement("div"), y = document.createElement("img"), w = document.createElement("img"), C = document.createElement("img"), b = (k) => {
          k.target.style.opacity = 0.3;
        }, S = (k) => {
          k.target.style.opacity = 1;
        };
        g.setAttribute("style", "position: absolute; top: 0%; left: 50%; width: 100px; height: 25px; z-index: 999; background-color: rgba(255, 255, 255, 0.7); border-radius: 4px; border: 2px solid #6C6C6C; cursor: pointer; transform: translate(-50%, -50%); display: flex; justify-content: space-between; align-items: center; padding: 0 10px;"), y.setAttribute("src", "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_align_left/default/20px.svg"), y.setAttribute("style", c), y.addEventListener("mouseover", b), y.addEventListener("mouseout", S), w.setAttribute("src", "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_align_center/default/20px.svg"), w.setAttribute("style", c), w.addEventListener("mouseover", b), w.addEventListener("mouseout", S), C.setAttribute("src", "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_align_right/default/20px.svg"), C.setAttribute("style", c), C.addEventListener("mouseover", b), C.addEventListener("mouseout", S), y.addEventListener("click", () => {
          a.setAttribute("style", `${a.style.cssText} margin: 0 auto 0 0;`), u();
        }), w.addEventListener("click", () => {
          a.setAttribute("style", `${a.style.cssText} margin: 0 auto;`), u();
        }), C.addEventListener("click", () => {
          a.setAttribute("style", `${a.style.cssText} margin: 0 0 0 auto;`), u();
        }), g.appendChild(y), g.appendChild(w), g.appendChild(C), l.appendChild(g);
      };
      if (o.setAttribute("style", "display: flex;"), o.appendChild(l), l.setAttribute("style", `${s}`), l.appendChild(a), Object.entries(n.attrs).forEach(([g, y]) => {
        y != null && a.setAttribute(g, y);
      }), !i)
        return { dom: a };
      const f = [
        "top: -4px; left: -4px; cursor: nwse-resize;",
        "top: -4px; right: -4px; cursor: nesw-resize;",
        "bottom: -4px; left: -4px; cursor: nesw-resize;",
        "bottom: -4px; right: -4px; cursor: nwse-resize;"
      ];
      let h = !1, p, m;
      return l.addEventListener("click", () => {
        if (l.childElementCount > 3)
          for (let g = 0; g < 5; g++)
            l.removeChild(l.lastChild);
        d(), l.setAttribute("style", `position: relative; border: 1px dashed #6C6C6C; ${s} cursor: pointer;`), Array.from({ length: 4 }, (g, y) => {
          const w = document.createElement("div");
          w.setAttribute("style", `position: absolute; width: 9px; height: 9px; border: 1.5px solid #6C6C6C; border-radius: 50%; ${f[y]}`), w.addEventListener("mousedown", (C) => {
            C.preventDefault(), h = !0, p = C.clientX, m = l.offsetWidth;
            const b = (k) => {
              if (!h)
                return;
              const T = y % 2 === 0 ? -(k.clientX - p) : k.clientX - p, M = m + T;
              l.style.width = M + "px", a.style.width = M + "px";
            }, S = () => {
              h && (h = !1), u(), document.removeEventListener("mousemove", b), document.removeEventListener("mouseup", S);
            };
            document.addEventListener("mousemove", b), document.addEventListener("mouseup", S);
          }), l.appendChild(w);
        });
      }), document.addEventListener("click", (g) => {
        const y = g.target;
        if (!(l.contains(y) || y.style.cssText === c)) {
          const C = l.getAttribute("style"), b = C == null ? void 0 : C.replace("border: 1px dashed #6C6C6C;", "");
          if (l.setAttribute("style", b), l.childElementCount > 3)
            for (let S = 0; S < 5; S++)
              l.removeChild(l.lastChild);
        }
      }), {
        dom: o
      };
    };
  }
});
function pC(n) {
  var e;
  const { char: t, allowSpaces: r, allowToIncludeChar: i, allowedPrefixes: s, startOfLine: o, $position: l } = n, a = r && !i, c = P0(t), u = new RegExp(`\\s${c}$`), d = o ? "^" : "", f = i ? "" : c, h = a ? new RegExp(`${d}${c}.*?(?=\\s${f}|$)`, "gm") : new RegExp(`${d}(?:^)?${c}[^\\s${f}]*`, "gm"), p = ((e = l.nodeBefore) === null || e === void 0 ? void 0 : e.isText) && l.nodeBefore.text;
  if (!p)
    return null;
  const m = l.pos - p.length, g = Array.from(p.matchAll(h)).pop();
  if (!g || g.input === void 0 || g.index === void 0)
    return null;
  const y = g.input.slice(Math.max(0, g.index - 1), g.index), w = new RegExp(`^[${s == null ? void 0 : s.join("")}\0]?$`).test(y);
  if (s !== null && !w)
    return null;
  const C = m + g.index;
  let b = C + g[0].length;
  return a && u.test(p.slice(b - 1, b + 1)) && (g[0] += " ", b += 1), C < l.pos && b >= l.pos ? {
    range: {
      from: C,
      to: b
    },
    query: g[0].slice(t.length),
    text: g[0]
  } : null;
}
const mC = new ue("suggestion");
function gC({ pluginKey: n = mC, editor: e, char: t = "@", allowSpaces: r = !1, allowToIncludeChar: i = !1, allowedPrefixes: s = [" "], startOfLine: o = !1, decorationTag: l = "span", decorationClass: a = "suggestion", command: c = () => null, items: u = () => [], render: d = () => ({}), allow: f = () => !0, findSuggestionMatch: h = pC }) {
  let p;
  const m = d == null ? void 0 : d(), g = new le({
    key: n,
    view() {
      return {
        update: async (y, w) => {
          var C, b, S, k, T, M, I;
          const N = (C = this.key) === null || C === void 0 ? void 0 : C.getState(w), j = (b = this.key) === null || b === void 0 ? void 0 : b.getState(y.state), K = N.active && j.active && N.range.from !== j.range.from, Y = !N.active && j.active, J = N.active && !j.active, Z = !Y && !J && N.query !== j.query, G = Y || K && Z, ee = Z || K, ae = J || K && Z;
          if (!G && !ee && !ae)
            return;
          const ye = ae && !G ? N : j, Be = y.dom.querySelector(`[data-decoration-id="${ye.decorationId}"]`);
          p = {
            editor: e,
            range: ye.range,
            query: ye.query,
            text: ye.text,
            items: [],
            command: (He) => c({
              editor: e,
              range: ye.range,
              props: He
            }),
            decorationNode: Be,
            // virtual node for popper.js or tippy.js
            // this can be used for building popups without a DOM node
            clientRect: Be ? () => {
              var He;
              const { decorationId: Ue } = (He = this.key) === null || He === void 0 ? void 0 : He.getState(e.state), tt = y.dom.querySelector(`[data-decoration-id="${Ue}"]`);
              return (tt == null ? void 0 : tt.getBoundingClientRect()) || null;
            } : null
          }, G && ((S = m == null ? void 0 : m.onBeforeStart) === null || S === void 0 || S.call(m, p)), ee && ((k = m == null ? void 0 : m.onBeforeUpdate) === null || k === void 0 || k.call(m, p)), (ee || G) && (p.items = await u({
            editor: e,
            query: ye.query
          })), ae && ((T = m == null ? void 0 : m.onExit) === null || T === void 0 || T.call(m, p)), ee && ((M = m == null ? void 0 : m.onUpdate) === null || M === void 0 || M.call(m, p)), G && ((I = m == null ? void 0 : m.onStart) === null || I === void 0 || I.call(m, p));
        },
        destroy: () => {
          var y;
          p && ((y = m == null ? void 0 : m.onExit) === null || y === void 0 || y.call(m, p));
        }
      };
    },
    state: {
      // Initialize the plugin's internal state.
      init() {
        return {
          active: !1,
          range: {
            from: 0,
            to: 0
          },
          query: null,
          text: null,
          composing: !1
        };
      },
      // Apply changes to the plugin state from a view transaction.
      apply(y, w, C, b) {
        const { isEditable: S } = e, { composing: k } = e.view, { selection: T } = y, { empty: M, from: I } = T, N = { ...w };
        if (N.composing = k, S && (M || e.view.composing)) {
          (I < w.range.from || I > w.range.to) && !k && !w.composing && (N.active = !1);
          const j = h({
            char: t,
            allowSpaces: r,
            allowToIncludeChar: i,
            allowedPrefixes: s,
            startOfLine: o,
            $position: T.$from
          }), K = `id_${Math.floor(Math.random() * 4294967295)}`;
          j && f({
            editor: e,
            state: b,
            range: j.range,
            isActive: w.active
          }) ? (N.active = !0, N.decorationId = w.decorationId ? w.decorationId : K, N.range = j.range, N.query = j.query, N.text = j.text) : N.active = !1;
        } else
          N.active = !1;
        return N.active || (N.decorationId = null, N.range = { from: 0, to: 0 }, N.query = null, N.text = null), N;
      }
    },
    props: {
      // Call the keydown hook if suggestion is active.
      handleKeyDown(y, w) {
        var C;
        const { active: b, range: S } = g.getState(y.state);
        return b && ((C = m == null ? void 0 : m.onKeyDown) === null || C === void 0 ? void 0 : C.call(m, { view: y, event: w, range: S })) || !1;
      },
      // Setup decorator on the currently active suggestion.
      decorations(y) {
        const { active: w, range: C, decorationId: b } = g.getState(y);
        return w ? ie.create(y.doc, [
          xe.inline(C.from, C.to, {
            nodeName: l,
            class: a,
            "data-decoration-id": b
          })
        ]) : null;
      }
    }
  });
  return g;
}
const yC = new ue("mention"), bC = ce.create({
  name: "mention",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {},
      renderText({ options: n, node: e }) {
        var t;
        return `${n.suggestion.char}${(t = e.attrs.label) !== null && t !== void 0 ? t : e.attrs.id}`;
      },
      deleteTriggerWithBackspace: !1,
      renderHTML({ options: n, node: e }) {
        var t;
        return [
          "span",
          Q(this.HTMLAttributes, n.HTMLAttributes),
          `${n.suggestion.char}${(t = e.attrs.label) !== null && t !== void 0 ? t : e.attrs.id}`
        ];
      },
      suggestion: {
        char: "@",
        pluginKey: yC,
        command: ({ editor: n, range: e, props: t }) => {
          var r, i, s;
          const o = n.view.state.selection.$to.nodeAfter;
          ((r = o == null ? void 0 : o.text) === null || r === void 0 ? void 0 : r.startsWith(" ")) && (e.to += 1), n.chain().focus().insertContentAt(e, [
            {
              type: this.name,
              attrs: t
            },
            {
              type: "text",
              text: " "
            }
          ]).run(), (s = (i = n.view.dom.ownerDocument.defaultView) === null || i === void 0 ? void 0 : i.getSelection()) === null || s === void 0 || s.collapseToEnd();
        },
        allow: ({ state: n, range: e }) => {
          const t = n.doc.resolve(e.from), r = n.schema.nodes[this.name];
          return !!t.parent.type.contentMatch.matchType(r);
        }
      }
    };
  },
  group: "inline",
  inline: !0,
  selectable: !1,
  atom: !0,
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-id"),
        renderHTML: (n) => n.id ? {
          "data-id": n.id
        } : {}
      },
      label: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-label"),
        renderHTML: (n) => n.label ? {
          "data-label": n.label
        } : {}
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    if (this.options.renderLabel !== void 0)
      return console.warn("renderLabel is deprecated use renderText and renderHTML instead"), [
        "span",
        Q({ "data-type": this.name }, this.options.HTMLAttributes, e),
        this.options.renderLabel({
          options: this.options,
          node: n
        })
      ];
    const t = { ...this.options };
    t.HTMLAttributes = Q({ "data-type": this.name }, this.options.HTMLAttributes, e);
    const r = this.options.renderHTML({
      options: t,
      node: n
    });
    return typeof r == "string" ? [
      "span",
      Q({ "data-type": this.name }, this.options.HTMLAttributes, e),
      r
    ] : r;
  },
  renderText({ node: n }) {
    return this.options.renderLabel !== void 0 ? (console.warn("renderLabel is deprecated use renderText and renderHTML instead"), this.options.renderLabel({
      options: this.options,
      node: n
    })) : this.options.renderText({
      options: this.options,
      node: n
    });
  },
  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.command(({ tr: n, state: e }) => {
        let t = !1;
        const { selection: r } = e, { empty: i, anchor: s } = r;
        return i ? (e.doc.nodesBetween(s - 1, s, (o, l) => {
          if (o.type.name === this.name)
            return t = !0, n.insertText(this.options.deleteTriggerWithBackspace ? "" : this.options.suggestion.char || "", l, l + o.nodeSize), !1;
        }), t) : !1;
      })
    };
  },
  addProseMirrorPlugins() {
    return [
      gC({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
}), vC = fe.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new le({
        key: new ue("placeholder"),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            const t = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: r } = e, i = [];
            if (!t)
              return null;
            const s = this.editor.isEmpty;
            return n.descendants((o, l) => {
              const a = r >= l && r <= l + o.nodeSize, c = !o.isLeaf && eo(o);
              if ((a || !this.options.showOnlyCurrent) && c) {
                const u = [this.options.emptyNodeClass];
                s && u.push(this.options.emptyEditorClass);
                const d = xe.node(l, l + o.nodeSize, {
                  class: u.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: o,
                    pos: l,
                    hasAnchor: a
                  }) : this.options.placeholder
                });
                i.push(d);
              }
              return this.options.includeChildren;
            }), ie.create(n, i);
          }
        }
      })
    ];
  }
}), wC = ce.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", Q(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), kC = "listItem", bu = "textStyle", vu = /^(\d+)\.\s$/, CC = ce.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (n) => n.hasAttribute("start") ? parseInt(n.getAttribute("start") || "", 10) : 1
      },
      type: {
        default: null,
        parseHTML: (n) => n.getAttribute("type")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    const { start: e, ...t } = n;
    return e === 1 ? ["ol", Q(this.options.HTMLAttributes, t), 0] : ["ol", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(kC, this.editor.getAttributes(bu)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let n = Yr({
      find: vu,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Yr({
      find: vu,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(bu) }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
      editor: this.editor
    })), [
      n
    ];
  }
}), xC = "listItem", wu = "textStyle", ku = /^\s*([-+*])\s$/, SC = ce.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(xC, this.editor.getAttributes(wu)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let n = Yr({
      find: ku,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Yr({
      find: ku,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(wu),
      editor: this.editor
    })), [
      n
    ];
  }
}), MC = /^\s*>\s$/, AC = ce.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["blockquote", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: n }) => n.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: n }) => n.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: n }) => n.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      Yr({
        find: MC,
        type: this.type
      })
    ];
  }
});
var Ps = 200, me = function() {
};
me.prototype.append = function(e) {
  return e.length ? (e = me.from(e), !this.length && e || e.length < Ps && this.leafAppend(e) || this.length < Ps && e.leafPrepend(this) || this.appendInner(e)) : this;
};
me.prototype.prepend = function(e) {
  return e.length ? me.from(e).append(this) : this;
};
me.prototype.appendInner = function(e) {
  return new EC(this, e);
};
me.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? me.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
me.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
me.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
me.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(s, o) {
    return i.push(e(s, o));
  }, t, r), i;
};
me.from = function(e) {
  return e instanceof me ? e : e && e.length ? new ph(e) : me.empty;
};
var ph = /* @__PURE__ */ function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, s) {
    return i == 0 && s == this.length ? this : new e(this.values.slice(i, s));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, s, o, l) {
    for (var a = s; a < o; a++)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, s, o, l) {
    for (var a = s - 1; a >= o; a--)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= Ps)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= Ps)
      return new e(i.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(me);
me.empty = new ph([]);
var EC = /* @__PURE__ */ function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i < l && this.left.forEachInner(r, i, Math.min(s, l), o) === !1 || s > l && this.right.forEachInner(r, Math.max(i - l, 0), Math.min(this.length, s) - l, o + l) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i > l && this.right.forEachInvertedInner(r, i - l, Math.max(s, l) - l, o + l) === !1 || s < l && this.left.forEachInvertedInner(r, Math.min(i, l), s, o) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, i) {
    if (r == 0 && i == this.length)
      return this;
    var s = this.left.length;
    return i <= s ? this.left.slice(r, i) : r >= s ? this.right.slice(r - s, i - s) : this.left.slice(r, s).append(this.right.slice(0, i - s));
  }, e.prototype.leafAppend = function(r) {
    var i = this.right.leafAppend(r);
    if (i)
      return new e(this.left, i);
  }, e.prototype.leafPrepend = function(r) {
    var i = this.left.leafPrepend(r);
    if (i)
      return new e(i, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
}(me);
const TC = 500;
class st {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, s;
    t && (i = this.remapping(r, this.items.length), s = i.maps.length);
    let o = e.tr, l, a, c = [], u = [];
    return this.items.forEach((d, f) => {
      if (!d.step) {
        i || (i = this.remapping(r, f + 1), s = i.maps.length), s--, u.push(d);
        return;
      }
      if (i) {
        u.push(new dt(d.map));
        let h = d.step.map(i.slice(s)), p;
        h && o.maybeStep(h).doc && (p = o.mapping.maps[o.mapping.maps.length - 1], c.push(new dt(p, void 0, void 0, c.length + u.length))), s--, p && i.appendMap(p, s);
      } else
        o.maybeStep(d.step);
      if (d.selection)
        return l = i ? d.selection.map(i.slice(s)) : d.selection, a = new st(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: o, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, i) {
    let s = [], o = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]), f = new dt(e.mapping.maps[u], d, t), h;
      (h = a && a.merge(f)) && (f = h, u ? s.pop() : l = l.slice(0, l.length - 1)), s.push(f), t && (o++, t = void 0), i || (a = f);
    }
    let c = o - r.depth;
    return c > NC && (l = OC(l, c), o -= c), new st(l.append(s), o);
  }
  remapping(e, t) {
    let r = new jr();
    return this.items.forEach((i, s) => {
      let o = i.mirrorOffset != null && s - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, o);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new st(this.items.append(e.map((t) => new dt(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - t), s = e.mapping, o = e.steps.length, l = this.eventCount;
    this.items.forEach((f) => {
      f.selection && l--;
    }, i);
    let a = t;
    this.items.forEach((f) => {
      let h = s.getMirror(--a);
      if (h == null)
        return;
      o = Math.min(o, h);
      let p = s.maps[h];
      if (f.step) {
        let m = e.steps[h].invert(e.docs[h]), g = f.selection && f.selection.map(s.slice(a + 1, h));
        g && l++, r.push(new dt(p, m, g));
      } else
        r.push(new dt(p));
    }, i);
    let c = [];
    for (let f = t; f < o; f++)
      c.push(new dt(s.maps[f]));
    let u = this.items.slice(0, i).append(c).append(r), d = new st(u, l);
    return d.emptyItemCount() > TC && (d = d.compress(this.items.length - r.length)), d;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, i = [], s = 0;
    return this.items.forEach((o, l) => {
      if (l >= e)
        i.push(o), o.selection && s++;
      else if (o.step) {
        let a = o.step.map(t.slice(r)), c = a && a.getMap();
        if (r--, c && t.appendMap(c, r), a) {
          let u = o.selection && o.selection.map(t.slice(r));
          u && s++;
          let d = new dt(c.invert(), a, u), f, h = i.length - 1;
          (f = i.length && i[h].merge(d)) ? i[h] = f : i.push(d);
        }
      } else o.map && r--;
    }, this.items.length, 0), new st(me.from(i.reverse()), s);
  }
}
st.empty = new st(me.empty, 0);
function OC(n, e) {
  let t;
  return n.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return t = i, !1;
  }), n.slice(t);
}
class dt {
  constructor(e, t, r, i) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new dt(t.getMap().invert(), t, this.selection);
    }
  }
}
class jt {
  constructor(e, t, r, i, s) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = i, this.prevComposition = s;
  }
}
const NC = 20;
function DC(n, e, t, r) {
  let i = t.getMeta(En), s;
  if (i)
    return i.historyState;
  t.getMeta(IC) && (n = new jt(n.done, n.undone, null, 0, -1));
  let o = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (o && o.getMeta(En))
    return o.getMeta(En).redo ? new jt(n.done.addTransform(t, void 0, r, Ui(e)), n.undone, Cu(t.mapping.maps), n.prevTime, n.prevComposition) : new jt(n.done, n.undone.addTransform(t, void 0, r, Ui(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let l = t.getMeta("composition"), a = n.prevTime == 0 || !o && n.prevComposition != l && (n.prevTime < (t.time || 0) - r.newGroupDelay || !LC(t, n.prevRanges)), c = o ? Ho(n.prevRanges, t.mapping) : Cu(t.mapping.maps);
    return new jt(n.done.addTransform(t, a ? e.selection.getBookmark() : void 0, r, Ui(e)), st.empty, c, t.time, l ?? n.prevComposition);
  } else return (s = t.getMeta("rebased")) ? new jt(n.done.rebased(t, s), n.undone.rebased(t, s), Ho(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new jt(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), Ho(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function LC(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, i) => {
    for (let s = 0; s < e.length; s += 2)
      r <= e[s + 1] && i >= e[s] && (t = !0);
  }), t;
}
function Cu(n) {
  let e = [];
  for (let t = n.length - 1; t >= 0 && e.length == 0; t--)
    n[t].forEach((r, i, s, o) => e.push(s, o));
  return e;
}
function Ho(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let i = e.map(n[r], 1), s = e.map(n[r + 1], -1);
    i <= s && t.push(i, s);
  }
  return t;
}
function RC(n, e, t) {
  let r = Ui(e), i = En.get(e).spec.config, s = (t ? n.undone : n.done).popEvent(e, r);
  if (!s)
    return null;
  let o = s.selection.resolve(s.transform.doc), l = (t ? n.done : n.undone).addTransform(s.transform, e.selection.getBookmark(), i, r), a = new jt(t ? l : s.remaining, t ? s.remaining : l, null, 0, -1);
  return s.transform.setSelection(o).setMeta(En, { redo: t, historyState: a });
}
let Fo = !1, xu = null;
function Ui(n) {
  let e = n.plugins;
  if (xu != e) {
    Fo = !1, xu = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        Fo = !0;
        break;
      }
  }
  return Fo;
}
const En = new ue("history"), IC = new ue("closeHistory");
function PC(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new le({
    key: En,
    state: {
      init() {
        return new jt(st.empty, st.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return DC(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, i = r == "historyUndo" ? gh : r == "historyRedo" ? yh : null;
          return i ? (t.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function mh(n, e) {
  return (t, r) => {
    let i = En.getState(t);
    if (!i || (n ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let s = RC(i, t, n);
      s && r(e ? s.scrollIntoView() : s);
    }
    return !0;
  };
}
const gh = mh(!1, !0), yh = mh(!0, !0), BC = fe.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => gh(n, e),
      redo: () => ({ state: n, dispatch: e }) => yh(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [
      PC(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
});
function HC(n = {}) {
  return new le({
    view(e) {
      return new FC(e, n);
    }
  });
}
class FC {
  constructor(e, t) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = (r = t.width) !== null && r !== void 0 ? r : 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((i) => {
      let s = (o) => {
        this[i](o);
      };
      return e.dom.addEventListener(i, s), { name: i, handler: s };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
  }
  update(e, t) {
    this.cursorPos != null && t.doc != e.state.doc && (this.cursorPos > e.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, r, i = this.editorView.dom, s = i.getBoundingClientRect(), o = s.width / i.offsetWidth, l = s.height / i.offsetHeight;
    if (t) {
      let d = e.nodeBefore, f = e.nodeAfter;
      if (d || f) {
        let h = this.editorView.nodeDOM(this.cursorPos - (d ? d.nodeSize : 0));
        if (h) {
          let p = h.getBoundingClientRect(), m = d ? p.bottom : p.top;
          d && f && (m = (m + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2);
          let g = this.width / 2 * l;
          r = { left: p.left, right: p.right, top: m - g, bottom: m + g };
        }
      }
    }
    if (!r) {
      let d = this.editorView.coordsAtPos(this.cursorPos), f = this.width / 2 * o;
      r = { left: d.left - f, right: d.left + f, top: d.top, bottom: d.bottom };
    }
    let a = this.editorView.dom.offsetParent;
    this.element || (this.element = a.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
    let c, u;
    if (!a || a == document.body && getComputedStyle(a).position == "static")
      c = -pageXOffset, u = -pageYOffset;
    else {
      let d = a.getBoundingClientRect(), f = d.width / a.offsetWidth, h = d.height / a.offsetHeight;
      c = d.left - a.scrollLeft * f, u = d.top - a.scrollTop * h;
    }
    this.element.style.left = (r.left - c) / o + "px", this.element.style.top = (r.top - u) / l + "px", this.element.style.width = (r.right - r.left) / o + "px", this.element.style.height = (r.bottom - r.top) / l + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), i = r && r.type.spec.disableDropCursor, s = typeof i == "function" ? i(this.editorView, t, e) : i;
    if (t && !s) {
      let o = t.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let l = ld(this.editorView.state.doc, o, this.editorView.dragging.slice);
        l != null && (o = l);
      }
      this.setCursor(o), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
  }
}
const zC = fe.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      HC(this.options)
    ];
  }
}), VC = /^((?:https?:)?\/\/)?((?:www|m|music)\.)?((?:youtube\.com|youtu.be|youtube-nocookie\.com))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/, $C = /^((?:https?:)?\/\/)?((?:www|m|music)\.)?((?:youtube\.com|youtu.be|youtube-nocookie\.com))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/g, bh = (n) => n.match(VC), _C = (n, e) => e ? "https://www.youtube-nocookie.com/embed/videoseries?list=" : n ? "https://www.youtube-nocookie.com/embed/" : "https://www.youtube.com/embed/", jC = (n) => n.searchParams.has("v") ? { id: n.searchParams.get("v") } : n.hostname === "youtu.be" || n.pathname.includes("shorts") || n.pathname.includes("live") ? { id: n.pathname.split("/").pop() } : n.searchParams.has("list") ? { id: n.searchParams.get("list"), isPlaylist: !0 } : null, WC = (n) => {
  var e;
  const { url: t, allowFullscreen: r, autoplay: i, ccLanguage: s, ccLoadPolicy: o, controls: l, disableKBcontrols: a, enableIFrameApi: c, endTime: u, interfaceLanguage: d, ivLoadPolicy: f, loop: h, modestBranding: p, nocookie: m, origin: g, playlist: y, progressBarColor: w, startAt: C, rel: b } = n;
  if (!bh(t))
    return null;
  if (t.includes("/embed/"))
    return t;
  const S = new URL(t), { id: k, isPlaylist: T } = (e = jC(S)) !== null && e !== void 0 ? e : {};
  if (!k)
    return null;
  const M = new URL(`${_C(m, T)}${k}`);
  return S.searchParams.has("t") && M.searchParams.set("start", S.searchParams.get("t").replaceAll("s", "")), r === !1 && M.searchParams.set("fs", "0"), i && M.searchParams.set("autoplay", "1"), s && M.searchParams.set("cc_lang_pref", s), o && M.searchParams.set("cc_load_policy", "1"), l || M.searchParams.set("controls", "0"), a && M.searchParams.set("disablekb", "1"), c && M.searchParams.set("enablejsapi", "1"), u && M.searchParams.set("end", u.toString()), d && M.searchParams.set("hl", d), f && M.searchParams.set("iv_load_policy", f.toString()), h && M.searchParams.set("loop", "1"), p && M.searchParams.set("modestbranding", "1"), g && M.searchParams.set("origin", g), y && M.searchParams.set("playlist", y), C && M.searchParams.set("start", C.toString()), w && M.searchParams.set("color", w), b !== void 0 && M.searchParams.set("rel", b.toString()), M.toString();
}, UC = ce.create({
  name: "youtube",
  addOptions() {
    return {
      addPasteHandler: !0,
      allowFullscreen: !0,
      autoplay: !1,
      ccLanguage: void 0,
      ccLoadPolicy: void 0,
      controls: !0,
      disableKBcontrols: !1,
      enableIFrameApi: !1,
      endTime: 0,
      height: 480,
      interfaceLanguage: void 0,
      ivLoadPolicy: 0,
      loop: !1,
      modestBranding: !1,
      HTMLAttributes: {},
      inline: !1,
      nocookie: !1,
      origin: "",
      playlist: "",
      progressBarColor: void 0,
      width: 640,
      rel: 1
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  draggable: !0,
  addAttributes() {
    return {
      src: {
        default: null
      },
      start: {
        default: 0
      },
      width: {
        default: this.options.width
      },
      height: {
        default: this.options.height
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-youtube-video] iframe"
      }
    ];
  },
  addCommands() {
    return {
      setYoutubeVideo: (n) => ({ commands: e }) => bh(n.src) ? e.insertContent({
        type: this.name,
        attrs: n
      }) : !1
    };
  },
  addPasteRules() {
    return this.options.addPasteHandler ? [
      B0({
        find: $C,
        type: this.type,
        getAttributes: (n) => ({ src: n.input })
      })
    ] : [];
  },
  renderHTML({ HTMLAttributes: n }) {
    const e = WC({
      url: n.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      startAt: n.start || 0,
      rel: this.options.rel
    });
    return n.src = e, [
      "div",
      { "data-youtube-video": "" },
      [
        "iframe",
        Q(this.options.HTMLAttributes, {
          width: this.options.width,
          height: this.options.height,
          allowfullscreen: this.options.allowFullscreen,
          autoplay: this.options.autoplay,
          ccLanguage: this.options.ccLanguage,
          ccLoadPolicy: this.options.ccLoadPolicy,
          disableKBcontrols: this.options.disableKBcontrols,
          enableIFrameApi: this.options.enableIFrameApi,
          endTime: this.options.endTime,
          interfaceLanguage: this.options.interfaceLanguage,
          ivLoadPolicy: this.options.ivLoadPolicy,
          loop: this.options.loop,
          modestBranding: this.options.modestBranding,
          origin: this.options.origin,
          playlist: this.options.playlist,
          progressBarColor: this.options.progressBarColor,
          rel: this.options.rel
        }, n)
      ]
    ];
  }
});
function Bt(n) {
  return Array.isArray ? Array.isArray(n) : kh(n) === "[object Array]";
}
function KC(n) {
  if (typeof n == "string")
    return n;
  let e = n + "";
  return e == "0" && 1 / n == -1 / 0 ? "-0" : e;
}
function qC(n) {
  return n == null ? "" : KC(n);
}
function pt(n) {
  return typeof n == "string";
}
function vh(n) {
  return typeof n == "number";
}
function JC(n) {
  return n === !0 || n === !1 || GC(n) && kh(n) == "[object Boolean]";
}
function wh(n) {
  return typeof n == "object";
}
function GC(n) {
  return wh(n) && n !== null;
}
function ze(n) {
  return n != null;
}
function zo(n) {
  return !n.trim().length;
}
function kh(n) {
  return n == null ? n === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(n);
}
const YC = "Incorrect 'index' type", XC = (n) => `Invalid value for key ${n}`, QC = (n) => `Pattern length exceeds max of ${n}.`, ZC = (n) => `Missing ${n} property in key`, ex = (n) => `Property 'weight' in key '${n}' must be a positive integer`, Su = Object.prototype.hasOwnProperty;
class tx {
  constructor(e) {
    this._keys = [], this._keyMap = {};
    let t = 0;
    e.forEach((r) => {
      let i = Ch(r);
      this._keys.push(i), this._keyMap[i.id] = i, t += i.weight;
    }), this._keys.forEach((r) => {
      r.weight /= t;
    });
  }
  get(e) {
    return this._keyMap[e];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function Ch(n) {
  let e = null, t = null, r = null, i = 1, s = null;
  if (pt(n) || Bt(n))
    r = n, e = Mu(n), t = Ml(n);
  else {
    if (!Su.call(n, "name"))
      throw new Error(ZC("name"));
    const o = n.name;
    if (r = o, Su.call(n, "weight") && (i = n.weight, i <= 0))
      throw new Error(ex(o));
    e = Mu(o), t = Ml(o), s = n.getFn;
  }
  return { path: e, id: t, weight: i, src: r, getFn: s };
}
function Mu(n) {
  return Bt(n) ? n : n.split(".");
}
function Ml(n) {
  return Bt(n) ? n.join(".") : n;
}
function nx(n, e) {
  let t = [], r = !1;
  const i = (s, o, l) => {
    if (ze(s))
      if (!o[l])
        t.push(s);
      else {
        let a = o[l];
        const c = s[a];
        if (!ze(c))
          return;
        if (l === o.length - 1 && (pt(c) || vh(c) || JC(c)))
          t.push(qC(c));
        else if (Bt(c)) {
          r = !0;
          for (let u = 0, d = c.length; u < d; u += 1)
            i(c[u], o, l + 1);
        } else o.length && i(c, o, l + 1);
      }
  };
  return i(n, pt(e) ? e.split(".") : e, 0), r ? t : t[0];
}
const rx = {
  // Whether the matches should be included in the result set. When `true`, each record in the result
  // set will include the indices of the matched characters.
  // These can consequently be used for highlighting purposes.
  includeMatches: !1,
  // When `true`, the matching function will continue to the end of a search pattern even if
  // a perfect match has already been located in the string.
  findAllMatches: !1,
  // Minimum number of characters that must be matched before a result is considered a match
  minMatchCharLength: 1
}, ix = {
  // When `true`, the algorithm continues searching to the end of the input even if a perfect
  // match is found before the end of the same input.
  isCaseSensitive: !1,
  // When `true`, the algorithm will ignore diacritics (accents) in comparisons
  ignoreDiacritics: !1,
  // When true, the matching function will continue to the end of a search pattern even if
  includeScore: !1,
  // List of properties that will be searched. This also supports nested properties.
  keys: [],
  // Whether to sort the result list, by score
  shouldSort: !0,
  // Default sort function: sort by ascending score, ascending index
  sortFn: (n, e) => n.score === e.score ? n.idx < e.idx ? -1 : 1 : n.score < e.score ? -1 : 1
}, sx = {
  // Approximately where in the text is the pattern expected to be found?
  location: 0,
  // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
  // (of both letters and location), a threshold of '1.0' would match anything.
  threshold: 0.6,
  // Determines how close the match must be to the fuzzy location (specified above).
  // An exact letter match which is 'distance' characters away from the fuzzy location
  // would score as a complete mismatch. A distance of '0' requires the match be at
  // the exact location specified, a threshold of '1000' would require a perfect match
  // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
  distance: 100
}, ox = {
  // When `true`, it enables the use of unix-like search commands
  useExtendedSearch: !1,
  // The get function to use when fetching an object's properties.
  // The default will search nested paths *ie foo.bar.baz*
  getFn: nx,
  // When `true`, search will ignore `location` and `distance`, so it won't matter
  // where in the string the pattern appears.
  // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
  ignoreLocation: !1,
  // When `true`, the calculation for the relevance score (used for sorting) will
  // ignore the field-length norm.
  // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
  ignoreFieldNorm: !1,
  // The weight to determine how much field length norm effects scoring.
  fieldNormWeight: 1
};
var H = {
  ...ix,
  ...rx,
  ...sx,
  ...ox
};
const lx = /[^ ]+/g;
function ax(n = 1, e = 3) {
  const t = /* @__PURE__ */ new Map(), r = Math.pow(10, e);
  return {
    get(i) {
      const s = i.match(lx).length;
      if (t.has(s))
        return t.get(s);
      const o = 1 / Math.pow(s, 0.5 * n), l = parseFloat(Math.round(o * r) / r);
      return t.set(s, l), l;
    },
    clear() {
      t.clear();
    }
  };
}
class ka {
  constructor({
    getFn: e = H.getFn,
    fieldNormWeight: t = H.fieldNormWeight
  } = {}) {
    this.norm = ax(t, 3), this.getFn = e, this.isCreated = !1, this.setIndexRecords();
  }
  setSources(e = []) {
    this.docs = e;
  }
  setIndexRecords(e = []) {
    this.records = e;
  }
  setKeys(e = []) {
    this.keys = e, this._keysMap = {}, e.forEach((t, r) => {
      this._keysMap[t.id] = r;
    });
  }
  create() {
    this.isCreated || !this.docs.length || (this.isCreated = !0, pt(this.docs[0]) ? this.docs.forEach((e, t) => {
      this._addString(e, t);
    }) : this.docs.forEach((e, t) => {
      this._addObject(e, t);
    }), this.norm.clear());
  }
  // Adds a doc to the end of the index
  add(e) {
    const t = this.size();
    pt(e) ? this._addString(e, t) : this._addObject(e, t);
  }
  // Removes the doc at the specified index of the index
  removeAt(e) {
    this.records.splice(e, 1);
    for (let t = e, r = this.size(); t < r; t += 1)
      this.records[t].i -= 1;
  }
  getValueForItemAtKeyId(e, t) {
    return e[this._keysMap[t]];
  }
  size() {
    return this.records.length;
  }
  _addString(e, t) {
    if (!ze(e) || zo(e))
      return;
    let r = {
      v: e,
      i: t,
      n: this.norm.get(e)
    };
    this.records.push(r);
  }
  _addObject(e, t) {
    let r = { i: t, $: {} };
    this.keys.forEach((i, s) => {
      let o = i.getFn ? i.getFn(e) : this.getFn(e, i.path);
      if (ze(o)) {
        if (Bt(o)) {
          let l = [];
          const a = [{ nestedArrIndex: -1, value: o }];
          for (; a.length; ) {
            const { nestedArrIndex: c, value: u } = a.pop();
            if (ze(u))
              if (pt(u) && !zo(u)) {
                let d = {
                  v: u,
                  i: c,
                  n: this.norm.get(u)
                };
                l.push(d);
              } else Bt(u) && u.forEach((d, f) => {
                a.push({
                  nestedArrIndex: f,
                  value: d
                });
              });
          }
          r.$[s] = l;
        } else if (pt(o) && !zo(o)) {
          let l = {
            v: o,
            n: this.norm.get(o)
          };
          r.$[s] = l;
        }
      }
    }), this.records.push(r);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    };
  }
}
function xh(n, e, { getFn: t = H.getFn, fieldNormWeight: r = H.fieldNormWeight } = {}) {
  const i = new ka({ getFn: t, fieldNormWeight: r });
  return i.setKeys(n.map(Ch)), i.setSources(e), i.create(), i;
}
function cx(n, { getFn: e = H.getFn, fieldNormWeight: t = H.fieldNormWeight } = {}) {
  const { keys: r, records: i } = n, s = new ka({ getFn: e, fieldNormWeight: t });
  return s.setKeys(r), s.setIndexRecords(i), s;
}
function Bi(n, {
  errors: e = 0,
  currentLocation: t = 0,
  expectedLocation: r = 0,
  distance: i = H.distance,
  ignoreLocation: s = H.ignoreLocation
} = {}) {
  const o = e / n.length;
  if (s)
    return o;
  const l = Math.abs(r - t);
  return i ? o + l / i : l ? 1 : o;
}
function ux(n = [], e = H.minMatchCharLength) {
  let t = [], r = -1, i = -1, s = 0;
  for (let o = n.length; s < o; s += 1) {
    let l = n[s];
    l && r === -1 ? r = s : !l && r !== -1 && (i = s - 1, i - r + 1 >= e && t.push([r, i]), r = -1);
  }
  return n[s - 1] && s - r >= e && t.push([r, s - 1]), t;
}
const gn = 32;
function dx(n, e, t, {
  location: r = H.location,
  distance: i = H.distance,
  threshold: s = H.threshold,
  findAllMatches: o = H.findAllMatches,
  minMatchCharLength: l = H.minMatchCharLength,
  includeMatches: a = H.includeMatches,
  ignoreLocation: c = H.ignoreLocation
} = {}) {
  if (e.length > gn)
    throw new Error(QC(gn));
  const u = e.length, d = n.length, f = Math.max(0, Math.min(r, d));
  let h = s, p = f;
  const m = l > 1 || a, g = m ? Array(d) : [];
  let y;
  for (; (y = n.indexOf(e, p)) > -1; ) {
    let T = Bi(e, {
      currentLocation: y,
      expectedLocation: f,
      distance: i,
      ignoreLocation: c
    });
    if (h = Math.min(T, h), p = y + u, m) {
      let M = 0;
      for (; M < u; )
        g[y + M] = 1, M += 1;
    }
  }
  p = -1;
  let w = [], C = 1, b = u + d;
  const S = 1 << u - 1;
  for (let T = 0; T < u; T += 1) {
    let M = 0, I = b;
    for (; M < I; )
      Bi(e, {
        errors: T,
        currentLocation: f + I,
        expectedLocation: f,
        distance: i,
        ignoreLocation: c
      }) <= h ? M = I : b = I, I = Math.floor((b - M) / 2 + M);
    b = I;
    let N = Math.max(1, f - I + 1), j = o ? d : Math.min(f + I, d) + u, K = Array(j + 2);
    K[j + 1] = (1 << T) - 1;
    for (let J = j; J >= N; J -= 1) {
      let Z = J - 1, G = t[n.charAt(Z)];
      if (m && (g[Z] = +!!G), K[J] = (K[J + 1] << 1 | 1) & G, T && (K[J] |= (w[J + 1] | w[J]) << 1 | 1 | w[J + 1]), K[J] & S && (C = Bi(e, {
        errors: T,
        currentLocation: Z,
        expectedLocation: f,
        distance: i,
        ignoreLocation: c
      }), C <= h)) {
        if (h = C, p = Z, p <= f)
          break;
        N = Math.max(1, 2 * f - p);
      }
    }
    if (Bi(e, {
      errors: T + 1,
      currentLocation: f,
      expectedLocation: f,
      distance: i,
      ignoreLocation: c
    }) > h)
      break;
    w = K;
  }
  const k = {
    isMatch: p >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(1e-3, C)
  };
  if (m) {
    const T = ux(g, l);
    T.length ? a && (k.indices = T) : k.isMatch = !1;
  }
  return k;
}
function fx(n) {
  let e = {};
  for (let t = 0, r = n.length; t < r; t += 1) {
    const i = n.charAt(t);
    e[i] = (e[i] || 0) | 1 << r - t - 1;
  }
  return e;
}
const Bs = String.prototype.normalize ? (n) => n.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "") : (n) => n;
class Sh {
  constructor(e, {
    location: t = H.location,
    threshold: r = H.threshold,
    distance: i = H.distance,
    includeMatches: s = H.includeMatches,
    findAllMatches: o = H.findAllMatches,
    minMatchCharLength: l = H.minMatchCharLength,
    isCaseSensitive: a = H.isCaseSensitive,
    ignoreDiacritics: c = H.ignoreDiacritics,
    ignoreLocation: u = H.ignoreLocation
  } = {}) {
    if (this.options = {
      location: t,
      threshold: r,
      distance: i,
      includeMatches: s,
      findAllMatches: o,
      minMatchCharLength: l,
      isCaseSensitive: a,
      ignoreDiacritics: c,
      ignoreLocation: u
    }, e = a ? e : e.toLowerCase(), e = c ? Bs(e) : e, this.pattern = e, this.chunks = [], !this.pattern.length)
      return;
    const d = (h, p) => {
      this.chunks.push({
        pattern: h,
        alphabet: fx(h),
        startIndex: p
      });
    }, f = this.pattern.length;
    if (f > gn) {
      let h = 0;
      const p = f % gn, m = f - p;
      for (; h < m; )
        d(this.pattern.substr(h, gn), h), h += gn;
      if (p) {
        const g = f - gn;
        d(this.pattern.substr(g), g);
      }
    } else
      d(this.pattern, 0);
  }
  searchIn(e) {
    const { isCaseSensitive: t, ignoreDiacritics: r, includeMatches: i } = this.options;
    if (e = t ? e : e.toLowerCase(), e = r ? Bs(e) : e, this.pattern === e) {
      let m = {
        isMatch: !0,
        score: 0
      };
      return i && (m.indices = [[0, e.length - 1]]), m;
    }
    const {
      location: s,
      distance: o,
      threshold: l,
      findAllMatches: a,
      minMatchCharLength: c,
      ignoreLocation: u
    } = this.options;
    let d = [], f = 0, h = !1;
    this.chunks.forEach(({ pattern: m, alphabet: g, startIndex: y }) => {
      const { isMatch: w, score: C, indices: b } = dx(e, m, g, {
        location: s + y,
        distance: o,
        threshold: l,
        findAllMatches: a,
        minMatchCharLength: c,
        includeMatches: i,
        ignoreLocation: u
      });
      w && (h = !0), f += C, w && b && (d = [...d, ...b]);
    });
    let p = {
      isMatch: h,
      score: h ? f / this.chunks.length : 1
    };
    return h && i && (p.indices = d), p;
  }
}
class cn {
  constructor(e) {
    this.pattern = e;
  }
  static isMultiMatch(e) {
    return Au(e, this.multiRegex);
  }
  static isSingleMatch(e) {
    return Au(e, this.singleRegex);
  }
  search() {
  }
}
function Au(n, e) {
  const t = n.match(e);
  return t ? t[1] : null;
}
class hx extends cn {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(e) {
    const t = e === this.pattern;
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class px extends cn {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(e) {
    const r = e.indexOf(this.pattern) === -1;
    return {
      isMatch: r,
      score: r ? 0 : 1,
      indices: [0, e.length - 1]
    };
  }
}
class mx extends cn {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(e) {
    const t = e.startsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class gx extends cn {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(e) {
    const t = !e.startsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, e.length - 1]
    };
  }
}
class yx extends cn {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(e) {
    const t = e.endsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [e.length - this.pattern.length, e.length - 1]
    };
  }
}
class bx extends cn {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(e) {
    const t = !e.endsWith(this.pattern);
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, e.length - 1]
    };
  }
}
class Mh extends cn {
  constructor(e, {
    location: t = H.location,
    threshold: r = H.threshold,
    distance: i = H.distance,
    includeMatches: s = H.includeMatches,
    findAllMatches: o = H.findAllMatches,
    minMatchCharLength: l = H.minMatchCharLength,
    isCaseSensitive: a = H.isCaseSensitive,
    ignoreDiacritics: c = H.ignoreDiacritics,
    ignoreLocation: u = H.ignoreLocation
  } = {}) {
    super(e), this._bitapSearch = new Sh(e, {
      location: t,
      threshold: r,
      distance: i,
      includeMatches: s,
      findAllMatches: o,
      minMatchCharLength: l,
      isCaseSensitive: a,
      ignoreDiacritics: c,
      ignoreLocation: u
    });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(e) {
    return this._bitapSearch.searchIn(e);
  }
}
class Ah extends cn {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(e) {
    let t = 0, r;
    const i = [], s = this.pattern.length;
    for (; (r = e.indexOf(this.pattern, t)) > -1; )
      t = r + s, i.push([r, t - 1]);
    const o = !!i.length;
    return {
      isMatch: o,
      score: o ? 0 : 1,
      indices: i
    };
  }
}
const Al = [
  hx,
  Ah,
  mx,
  gx,
  bx,
  yx,
  px,
  Mh
], Eu = Al.length, vx = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/, wx = "|";
function kx(n, e = {}) {
  return n.split(wx).map((t) => {
    let r = t.trim().split(vx).filter((s) => s && !!s.trim()), i = [];
    for (let s = 0, o = r.length; s < o; s += 1) {
      const l = r[s];
      let a = !1, c = -1;
      for (; !a && ++c < Eu; ) {
        const u = Al[c];
        let d = u.isMultiMatch(l);
        d && (i.push(new u(d, e)), a = !0);
      }
      if (!a)
        for (c = -1; ++c < Eu; ) {
          const u = Al[c];
          let d = u.isSingleMatch(l);
          if (d) {
            i.push(new u(d, e));
            break;
          }
        }
    }
    return i;
  });
}
const Cx = /* @__PURE__ */ new Set([Mh.type, Ah.type]);
class xx {
  constructor(e, {
    isCaseSensitive: t = H.isCaseSensitive,
    ignoreDiacritics: r = H.ignoreDiacritics,
    includeMatches: i = H.includeMatches,
    minMatchCharLength: s = H.minMatchCharLength,
    ignoreLocation: o = H.ignoreLocation,
    findAllMatches: l = H.findAllMatches,
    location: a = H.location,
    threshold: c = H.threshold,
    distance: u = H.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: t,
      ignoreDiacritics: r,
      includeMatches: i,
      minMatchCharLength: s,
      findAllMatches: l,
      ignoreLocation: o,
      location: a,
      threshold: c,
      distance: u
    }, e = t ? e : e.toLowerCase(), e = r ? Bs(e) : e, this.pattern = e, this.query = kx(this.pattern, this.options);
  }
  static condition(e, t) {
    return t.useExtendedSearch;
  }
  searchIn(e) {
    const t = this.query;
    if (!t)
      return {
        isMatch: !1,
        score: 1
      };
    const { includeMatches: r, isCaseSensitive: i, ignoreDiacritics: s } = this.options;
    e = i ? e : e.toLowerCase(), e = s ? Bs(e) : e;
    let o = 0, l = [], a = 0;
    for (let c = 0, u = t.length; c < u; c += 1) {
      const d = t[c];
      l.length = 0, o = 0;
      for (let f = 0, h = d.length; f < h; f += 1) {
        const p = d[f], { isMatch: m, indices: g, score: y } = p.search(e);
        if (m) {
          if (o += 1, a += y, r) {
            const w = p.constructor.type;
            Cx.has(w) ? l = [...l, ...g] : l.push(g);
          }
        } else {
          a = 0, o = 0, l.length = 0;
          break;
        }
      }
      if (o) {
        let f = {
          isMatch: !0,
          score: a / o
        };
        return r && (f.indices = l), f;
      }
    }
    return {
      isMatch: !1,
      score: 1
    };
  }
}
const El = [];
function Sx(...n) {
  El.push(...n);
}
function Tl(n, e) {
  for (let t = 0, r = El.length; t < r; t += 1) {
    let i = El[t];
    if (i.condition(n, e))
      return new i(n, e);
  }
  return new Sh(n, e);
}
const Hs = {
  AND: "$and",
  OR: "$or"
}, Ol = {
  PATH: "$path",
  PATTERN: "$val"
}, Nl = (n) => !!(n[Hs.AND] || n[Hs.OR]), Mx = (n) => !!n[Ol.PATH], Ax = (n) => !Bt(n) && wh(n) && !Nl(n), Tu = (n) => ({
  [Hs.AND]: Object.keys(n).map((e) => ({
    [e]: n[e]
  }))
});
function Eh(n, e, { auto: t = !0 } = {}) {
  const r = (i) => {
    let s = Object.keys(i);
    const o = Mx(i);
    if (!o && s.length > 1 && !Nl(i))
      return r(Tu(i));
    if (Ax(i)) {
      const a = o ? i[Ol.PATH] : s[0], c = o ? i[Ol.PATTERN] : i[a];
      if (!pt(c))
        throw new Error(XC(a));
      const u = {
        keyId: Ml(a),
        pattern: c
      };
      return t && (u.searcher = Tl(c, e)), u;
    }
    let l = {
      children: [],
      operator: s[0]
    };
    return s.forEach((a) => {
      const c = i[a];
      Bt(c) && c.forEach((u) => {
        l.children.push(r(u));
      });
    }), l;
  };
  return Nl(n) || (n = Tu(n)), r(n);
}
function Ex(n, { ignoreFieldNorm: e = H.ignoreFieldNorm }) {
  n.forEach((t) => {
    let r = 1;
    t.matches.forEach(({ key: i, norm: s, score: o }) => {
      const l = i ? i.weight : null;
      r *= Math.pow(
        o === 0 && l ? Number.EPSILON : o,
        (l || 1) * (e ? 1 : s)
      );
    }), t.score = r;
  });
}
function Tx(n, e) {
  const t = n.matches;
  e.matches = [], ze(t) && t.forEach((r) => {
    if (!ze(r.indices) || !r.indices.length)
      return;
    const { indices: i, value: s } = r;
    let o = {
      indices: i,
      value: s
    };
    r.key && (o.key = r.key.src), r.idx > -1 && (o.refIndex = r.idx), e.matches.push(o);
  });
}
function Ox(n, e) {
  e.score = n.score;
}
function Nx(n, e, {
  includeMatches: t = H.includeMatches,
  includeScore: r = H.includeScore
} = {}) {
  const i = [];
  return t && i.push(Tx), r && i.push(Ox), n.map((s) => {
    const { idx: o } = s, l = {
      item: e[o],
      refIndex: o
    };
    return i.length && i.forEach((a) => {
      a(s, l);
    }), l;
  });
}
class mr {
  constructor(e, t = {}, r) {
    this.options = { ...H, ...t }, this.options.useExtendedSearch, this._keyStore = new tx(this.options.keys), this.setCollection(e, r);
  }
  setCollection(e, t) {
    if (this._docs = e, t && !(t instanceof ka))
      throw new Error(YC);
    this._myIndex = t || xh(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  add(e) {
    ze(e) && (this._docs.push(e), this._myIndex.add(e));
  }
  remove(e = () => !1) {
    const t = [];
    for (let r = 0, i = this._docs.length; r < i; r += 1) {
      const s = this._docs[r];
      e(s, r) && (this.removeAt(r), r -= 1, i -= 1, t.push(s));
    }
    return t;
  }
  removeAt(e) {
    this._docs.splice(e, 1), this._myIndex.removeAt(e);
  }
  getIndex() {
    return this._myIndex;
  }
  search(e, { limit: t = -1 } = {}) {
    const {
      includeMatches: r,
      includeScore: i,
      shouldSort: s,
      sortFn: o,
      ignoreFieldNorm: l
    } = this.options;
    let a = pt(e) ? pt(this._docs[0]) ? this._searchStringList(e) : this._searchObjectList(e) : this._searchLogical(e);
    return Ex(a, { ignoreFieldNorm: l }), s && a.sort(o), vh(t) && t > -1 && (a = a.slice(0, t)), Nx(a, this._docs, {
      includeMatches: r,
      includeScore: i
    });
  }
  _searchStringList(e) {
    const t = Tl(e, this.options), { records: r } = this._myIndex, i = [];
    return r.forEach(({ v: s, i: o, n: l }) => {
      if (!ze(s))
        return;
      const { isMatch: a, score: c, indices: u } = t.searchIn(s);
      a && i.push({
        item: s,
        idx: o,
        matches: [{ score: c, value: s, norm: l, indices: u }]
      });
    }), i;
  }
  _searchLogical(e) {
    const t = Eh(e, this.options), r = (l, a, c) => {
      if (!l.children) {
        const { keyId: d, searcher: f } = l, h = this._findMatches({
          key: this._keyStore.get(d),
          value: this._myIndex.getValueForItemAtKeyId(a, d),
          searcher: f
        });
        return h && h.length ? [
          {
            idx: c,
            item: a,
            matches: h
          }
        ] : [];
      }
      const u = [];
      for (let d = 0, f = l.children.length; d < f; d += 1) {
        const h = l.children[d], p = r(h, a, c);
        if (p.length)
          u.push(...p);
        else if (l.operator === Hs.AND)
          return [];
      }
      return u;
    }, i = this._myIndex.records, s = {}, o = [];
    return i.forEach(({ $: l, i: a }) => {
      if (ze(l)) {
        let c = r(t, l, a);
        c.length && (s[a] || (s[a] = { idx: a, item: l, matches: [] }, o.push(s[a])), c.forEach(({ matches: u }) => {
          s[a].matches.push(...u);
        }));
      }
    }), o;
  }
  _searchObjectList(e) {
    const t = Tl(e, this.options), { keys: r, records: i } = this._myIndex, s = [];
    return i.forEach(({ $: o, i: l }) => {
      if (!ze(o))
        return;
      let a = [];
      r.forEach((c, u) => {
        a.push(
          ...this._findMatches({
            key: c,
            value: o[u],
            searcher: t
          })
        );
      }), a.length && s.push({
        idx: l,
        item: o,
        matches: a
      });
    }), s;
  }
  _findMatches({ key: e, value: t, searcher: r }) {
    if (!ze(t))
      return [];
    let i = [];
    if (Bt(t))
      t.forEach(({ v: s, i: o, n: l }) => {
        if (!ze(s))
          return;
        const { isMatch: a, score: c, indices: u } = r.searchIn(s);
        a && i.push({
          score: c,
          key: e,
          value: s,
          idx: o,
          norm: l,
          indices: u
        });
      });
    else {
      const { v: s, n: o } = t, { isMatch: l, score: a, indices: c } = r.searchIn(s);
      l && i.push({ score: a, key: e, value: s, norm: o, indices: c });
    }
    return i;
  }
}
mr.version = "7.1.0";
mr.createIndex = xh;
mr.parseIndex = cx;
mr.config = H;
mr.parseQuery = Eh;
Sx(xx);
const Dx = {
  props: {
    // List of items to display
    items: {
      type: Array,
      required: !0
    },
    // Function to execute when an item is selected
    command: {
      type: Function,
      required: !0
    }
  },
  data() {
    return {
      selectedIndex: 0
    };
  },
  watch: {
    items() {
      this.selectedIndex = 0;
    }
  },
  methods: {
    onKeyDown({ event: n }) {
      return n.key === "ArrowUp" ? (this.upHandler(), !0) : n.key === "ArrowDown" ? (this.downHandler(), !0) : n.key === "Enter" ? (this.enterHandler(), !0) : !1;
    },
    upHandler() {
      this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length;
    },
    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
    },
    enterHandler() {
      this.selectItem(this.selectedIndex);
    },
    selectItem(n) {
      const e = this.items[n];
      e && this.command({ id: e.value });
    }
  }
}, Lx = { class: "editor-suggestions--dropdown-menu" }, Rx = ["onClick"], Ix = {
  key: 1,
  class: "item"
};
function Px(n, e, t, r, i, s) {
  return D(), P("div", Lx, [
    t.items.length ? (D(!0), P(it, { key: 0 }, yn(t.items, (o, l) => (D(), P("button", {
      class: De({ "is-selected": l === i.selectedIndex }),
      key: l,
      onClick: (a) => s.selectItem(l)
    }, V(o.label), 11, Rx))), 128)) : (D(), P("div", Ix, " No result "))
  ]);
}
const Bx = /* @__PURE__ */ Hn(Dx, [["render", Px]]), Hx = function() {
  return {
    items({ query: n, editor: e }) {
      const r = new mr([...e.options.suggestions], {
        keys: ["label"]
      }).search(n);
      return n === "" ? e.options.suggestions : r.map((i) => i.item);
    },
    char: "/",
    allowSpaces: !0,
    render: () => {
      let n, e;
      return {
        onStart: (t) => {
          n = new qf(Bx, {
            // using vue 2:
            // parent: this,
            // propsData: props,
            // using vue 3:
            props: t,
            editor: t.editor
          }), t.clientRect && (e = Bn("body", {
            getReferenceClientRect: t.clientRect,
            appendTo: () => document.body,
            content: n.element,
            showOnCreate: !0,
            interactive: !0,
            trigger: "manual",
            placement: "bottom-start",
            theme: "editor"
          }));
        },
        onUpdate(t) {
          n.updateProps(t), t.clientRect && e[0].setProps({
            getReferenceClientRect: t.clientRect
          });
        },
        onKeyDown(t) {
          var r;
          return t.event.key === "Escape" ? (e[0].hide(), !0) : (r = n.ref) == null ? void 0 : r.onKeyDown(t);
        },
        onExit() {
          e[0].destroy(), n.destroy();
        }
      };
    }
  };
}, Fx = [
  {
    label: "Noir",
    value: "#1e1e1e"
  },
  {
    label: "Grey 1",
    value: "#b4b4b4"
  },
  {
    label: "Grey 2",
    value: "#757575"
  },
  {
    label: "Brown",
    value: "#8b511f"
  },
  {
    label: "Orange 1",
    value: "#ff6900"
  },
  {
    label: "Orange 2",
    value: "#cc4b00"
  },
  {
    label: "Green 1",
    value: "#98d432"
  },
  {
    label: "Green 2",
    value: "#008a35"
  },
  {
    label: "Blue 1",
    value: "#0073e5"
  },
  {
    label: "Blue 2",
    value: "#0644ae"
  },
  {
    label: "Red 1",
    value: "#eb0000"
  },
  {
    label: "Red 2",
    value: "#c00016"
  },
  {
    label: "Purple 1",
    value: "#d292ef"
  },
  {
    label: "Purple 2",
    value: "#9600c7"
  }
], zx = {
  name: "MediaLibrary",
  props: {
    files: {
      type: Array
    },
    deleteUrl: {
      type: String
    }
  },
  components: {
    Modal: Jf
  },
  mixins: [no],
  inject: ["locale"],
  emits: ["insertImage", "closeMediaLibrary"],
  data() {
    return {
      medias: [],
      current_media: {},
      search: "",
      locale: this.locale
    };
  },
  created() {
    this.medias = this.files, this.current_media = this.medias[0];
  },
  methods: {
    closeModal() {
    },
    deleteFile() {
      confirm(this.translate("mediaLibrary.actions.delete.confirm", this.locale)) && fetch(this.deleteUrl + "&file=" + this.current_media.name, {
        method: "DELETE"
      }).then((n) => n.json()).then((n) => {
        n.success && (this.medias = this.medias.filter((e) => e.name !== this.current_media.name), this.current_media = this.medias[0]);
      }).catch((n) => console.error(n));
    },
    readableFileSize(n) {
      const t = n ?? 0;
      if (!t)
        return "0 kb";
      const r = t / 1024;
      return r > 1024 ? `${(r / 1024).toFixed(2)} mb` : `${r.toFixed(2)} kb`;
    }
  },
  computed: {
    computedMedias: function(n) {
      return this.search ? this.medias.filter((e) => e.name.toLowerCase().includes(this.search.toLowerCase())) : this.medias;
    }
  }
}, Vx = { class: "media-library--modal-head" }, $x = { class: "media-library--modal-head-title" }, _x = { style: { "margin-top": "0" } }, jx = ["title"], Wx = { class: "media-library--modal-content" }, Ux = { class: "media-library--file-explorer" }, Kx = { class: "media-library--file-explorer-filters" }, qx = { style: { "margin-bottom": "0", "margin-top": "0" } }, Jx = ["placeholder"], Gx = { class: "media-library--file-explorer-files" }, Yx = ["onClick"], Xx = ["src", "alt"], Qx = { class: "media-library--file-name" }, Zx = {
  key: 0,
  class: "media-library--file-size"
}, eS = { class: "media-library--file-preview" }, tS = { class: "media-library--file-preview-image" }, nS = ["src", "alt"], rS = { class: "media-library--informations" }, iS = { class: "media-library--file-name" }, sS = {
  key: 0,
  class: "media-library--file-size"
}, oS = { key: 1 }, lS = { style: { "margin-bottom": "0" } }, aS = { class: "media-library--attributes" }, cS = { class: "media-library--attribute" }, uS = { class: "media-library--attribute-name" }, dS = { class: "media-library--actions" };
function fS(n, e, t, r, i, s) {
  const o = Xt("modal");
  return D(), qt(o, {
    class: "media-library",
    name: "edit",
    resizable: !0,
    draggable: !0,
    "click-to-close": !1,
    onClosed: s.closeModal,
    width: "70em",
    height: "90vh"
  }, {
    default: rt(() => [
      v("div", Vx, [
        v("div", $x, [
          v("h1", _x, V(n.translate("mediaLibrary.title", this.locale)), 1),
          v("span", {
            title: n.translate("modal.close", this.locale),
            class: "material-symbols-outlined",
            onClick: e[0] || (e[0] = (l) => n.$emit("closeMediaLibrary"))
          }, "close", 8, jx)
        ])
      ]),
      v("div", Wx, [
        v("div", Ux, [
          v("div", Kx, [
            v("h3", qx, [
              s.computedMedias.length > 1 ? (D(), P(it, { key: 0 }, [
                Ki(V(s.computedMedias.length + " " + n.translate("mediaLibrary.files", this.locale)), 1)
              ], 64)) : (D(), P(it, { key: 1 }, [
                Ki(V(s.computedMedias.length + " " + n.translate("mediaLibrary.file", this.locale)), 1)
              ], 64))
            ]),
            Fe(v("input", {
              type: "text",
              class: "media-library--searchbar",
              "onUpdate:modelValue": e[1] || (e[1] = (l) => i.search = l),
              placeholder: n.translate("mediaLibrary.search.placeholder", this.locale)
            }, null, 8, Jx), [
              [Kn, i.search]
            ])
          ]),
          v("div", Gx, [
            (D(!0), P(it, null, yn(s.computedMedias, (l) => (D(), P("div", {
              class: De(["media-library--file", i.current_media.name === l.name ? "media-library--selected" : ""]),
              key: l.name,
              onClick: (a) => i.current_media = l
            }, [
              v("div", null, [
                v("img", {
                  src: l.url,
                  alt: l.name
                }, null, 8, Xx),
                v("span", Qx, V(l.name), 1)
              ]),
              l.size ? (D(), P("span", Zx, V(s.readableFileSize(l.size)), 1)) : _("", !0)
            ], 10, Yx))), 128))
          ])
        ]),
        v("div", eS, [
          v("div", tS, [
            v("img", {
              src: i.current_media.url,
              alt: i.current_media.name
            }, null, 8, nS)
          ]),
          v("div", rS, [
            v("h2", iS, V(i.current_media.name), 1),
            i.current_media.size ? (D(), P("span", sS, V(s.readableFileSize(i.current_media.size)), 1)) : _("", !0),
            i.current_media.attributes ? (D(), P("div", oS, [
              v("h3", lS, V(n.translate("mediaLibrary.attributes.title", this.locale)), 1),
              e[5] || (e[5] = v("hr", null, null, -1)),
              v("div", aS, [
                (D(!0), P(it, null, yn(i.current_media.attributes, (l) => (D(), P("div", null, [
                  v("div", cS, [
                    v("span", uS, V(n.translate("mediaLibrary.attributes." + l.name, this.locale)), 1),
                    v("span", null, V(l.value), 1)
                  ]),
                  e[4] || (e[4] = v("hr", null, null, -1))
                ]))), 256))
              ])
            ])) : _("", !0),
            v("div", dS, [
              t.deleteUrl ? (D(), P("button", {
                key: 0,
                type: "button",
                onClick: e[2] || (e[2] = (...l) => s.deleteFile && s.deleteFile(...l))
              }, V(n.translate("mediaLibrary.actions.delete.title", this.locale)), 1)) : _("", !0),
              v("button", {
                type: "button",
                class: "media-library--actions-insert",
                onClick: e[3] || (e[3] = (l) => {
                  n.$emit("insertImage", i.current_media.url), n.$emit("closeMediaLibrary");
                })
              }, V(n.translate("mediaLibrary.actions.insert", this.locale)), 1)
            ])
          ])
        ])
      ])
    ]),
    _: 1
  }, 8, ["onClosed"]);
}
const hS = /* @__PURE__ */ Hn(zx, [["render", fS]]), pS = {
  components: {
    NodeViewWrapper: k1,
    NodeViewContent: w1
  },
  props: {
    editor: Object,
    node: Object,
    updateAttributes: Function
  },
  mixins: [no],
  inject: ["locale"],
  data() {
    var n;
    return {
      selectedType: ((n = this.node) == null ? void 0 : n.attrs.type) || "info",
      icons: [
        { value: "info", label: this.translate("toolbar.panel.type.info") },
        { value: "warning", label: this.translate("toolbar.panel.type.warning") },
        { value: "error", label: this.translate("toolbar.panel.type.error") }
      ]
    };
  },
  computed: {
    icon() {
      switch (this.selectedType) {
        case "warning":
          return "warning";
        case "error":
          return "error";
        default:
          return "info";
      }
    },
    iconColor() {
      switch (this.selectedType) {
        case "warning":
          return "#b38405";
        case "error":
          return "#a60e15";
        default:
          return "#525b85";
      }
    },
    isActive() {
      var i;
      const { state: n } = this.editor, { from: e, to: t } = n.selection, r = (i = this.getPos) == null ? void 0 : i.call(this);
      return typeof r != "number" ? !1 : e >= r && t <= r + this.node.nodeSize;
    }
  },
  watch: {
    selectedType(n) {
      this.node && n !== this.node.attrs.type && this.updateAttributes({ type: n });
    }
  },
  methods: {
    /*updateType(event) {
      if (!this.node) return;
      this.selectedType = value;
    }*/
  }
}, mS = {
  key: 0,
  class: "info-panel__actions"
}, gS = { value: "info" }, yS = { value: "warning" }, bS = { value: "error" }, vS = { class: "info-panel--block" };
function wS(n, e, t, r, i, s) {
  const o = Xt("NodeViewContent"), l = Xt("NodeViewWrapper");
  return D(), qt(l, {
    class: De(`info-panel info-panel--${i.selectedType}`)
  }, {
    default: rt(() => [
      s.isActive ? (D(), P("div", mS, [
        Fe(v("select", {
          "onUpdate:modelValue": e[0] || (e[0] = (a) => i.selectedType = a),
          class: "info-panel__select"
        }, [
          v("option", gS, V(n.translate("toolbar.panel.type.info", this.locale)), 1),
          v("option", yS, V(n.translate("toolbar.panel.type.warning", this.locale)), 1),
          v("option", bS, V(n.translate("toolbar.panel.type.error", this.locale)), 1)
        ], 512), [
          [Hi, i.selectedType]
        ])
      ])) : _("", !0),
      v("div", vS, [
        v("span", {
          class: "material-symbols-outlined",
          style: zs({ color: s.iconColor })
        }, V(s.icon), 5),
        kn(o, { class: "info-panel__content" })
      ])
    ]),
    _: 1
  }, 8, ["class"]);
}
const kS = /* @__PURE__ */ Hn(pS, [["render", wS]]), CS = ce.create({
  name: "panel",
  group: "block",
  content: "block+",
  selectable: !0,
  defining: !0,
  isolating: !0,
  addAttributes() {
    return {
      type: {
        default: "info",
        parseHTML: (n) => n.getAttribute("data-type") || "info",
        renderHTML: (n) => ({ "data-type": n.type })
      },
      draggable: {
        default: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-plugin='panel']",
        contentElement: "div"
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "div",
      Q({ "data-plugin": "panel", "data-type": n.attrs.type }),
      ["span", { class: "material-symbols-outlined" }, n.attrs.type],
      ["div", 0]
    ];
  },
  addNodeView() {
    return x1(kS);
  },
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor: n }) => {
        const { state: e, dispatch: t } = n, { selection: r } = e, { $from: i, $to: s } = r, o = i.node(-1), l = (o == null ? void 0 : o.type.name) === "panel", a = s.parentOffset === s.parent.content.size;
        if (l && a) {
          const c = i.after(i.depth - 1);
          return t(
            e.tr.insert(c, e.schema.nodes.paragraph.create()).scrollIntoView()
          ), !0;
        }
        return !1;
      }
    };
  }
}), Ou = [
  "bold",
  "italic",
  "strike",
  "underline",
  "h1",
  "h2",
  "h3",
  "link",
  //"hr",
  "codeblock",
  "image",
  "ul",
  "ol",
  "left",
  "center",
  "right",
  "justify",
  "blockquote",
  "history",
  "table",
  "color",
  "fontFamily",
  "fontSize",
  "highlight",
  "youtube",
  "panel"
], xS = {
  name: "TipTapEditor",
  components: {
    MediaLibrary: hS,
    Toolbar: sw,
    EditorContent: v1
  },
  mixins: [no],
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    // Locale language for the editor (en, fr)
    locale: {
      type: String,
      default: "en",
      required: !0,
      validator: (n) => [
        "en",
        "fr"
      ].includes(n)
    },
    // Output format for the editor (html, json)
    outputFormat: {
      type: String,
      default: "html",
      validator: (n) => [
        "html",
        "json"
      ].includes(n)
    },
    // Upload URL for images
    uploadUrl: {
      type: String,
      default: ""
    },
    deleteMediaUrl: {
      type: String,
      default: ""
    },
    // Suggestions for the mention plugin
    suggestions: {
      type: Array,
      required: !1,
      default: () => []
    },
    // Class for the mention suggestions
    suggestionsClass: {
      type: String,
      default: "mention"
    },
    // Preset for the toolbar (basic, full or custom). If custom, you need to provide the plugins
    preset: {
      type: String,
      default: "basic",
      required: !0,
      validator: (n) => [
        "basic",
        "full",
        "custom"
      ].includes(n)
    },
    // Plugins for the toolbar
    plugins: {
      type: Array,
      required: !1,
      default: () => [],
      validator: (n) => n.every(
        (e) => typeof e == "string" && Ou.includes(e)
      )
    },
    // Placeholder for the editor
    placeholder: {
      type: String,
      required: !1,
      default() {
        return "placeholder.default";
      }
    },
    // Palette colors for the editor
    palette: {
      type: Array,
      required: !1,
      default: () => Fx,
      validator: (n) => n.every(
        (e) => typeof e == "object"
      )
    },
    // Font families for the editor
    fontFamilies: {
      type: Array,
      required: !1,
      default: () => [
        "Arial",
        "Calibri",
        "Helvetica",
        "Times New Roman",
        "Comic Sans MS",
        "Caveat"
      ]
    },
    mediaFiles: {
      type: Array,
      required: !1,
      default: () => []
    },
    wrapperClasses: {
      type: Array,
      default: () => ["editor-wrapper"]
    },
    // Class for the toolbar
    toolbarClasses: {
      type: Array
    },
    // Class for the editor content
    editorContentClasses: {
      type: Array
    },
    editorContentHeight: {
      type: String,
      default: "auto"
    }
  },
  emits: ["update:modelValue", "uploadedImage"],
  data() {
    return {
      editor: void 0,
      extensions: [],
      pluginsDisplayed: [],
      displayMediaLibrary: !1,
      showMediaLibrary: !1
    };
  },
  provide() {
    return {
      locale: this.$props.locale
    };
  },
  watch: {
    modelValue(n) {
      var e = this.editor.getHTML() === n;
      this.$props.outputFormat === "json" && (e = JSON.stringify(this.editor.getJSON()) === JSON.stringify(n)), !e && this.editor.commands.setContent(n, !1);
    },
    // Extensions
    suggestions(n) {
      this.editor && this.editor.setOptions({ suggestions: n });
    }
  },
  mounted() {
    this.$props.mediaFiles.length > 0 && (this.displayMediaLibrary = !0), this.getPluginsDisplayed(), this.getEditorExtensions(), this.editor = new Kf({
      extensions: this.extensions,
      content: this.modelValue,
      suggestions: this.suggestions,
      onUpdate: () => {
        this.$props.outputFormat === "html" ? this.$emit("update:modelValue", this.editor.getHTML()) : this.$emit("update:modelValue", this.editor.getJSON());
      },
      editorProps: {
        handleDrop: (n, e, t, r) => this.dropEventHandler(n, e, t, r)
      }
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
  methods: {
    // Get the plugins displayed in the toolbar
    getPluginsDisplayed() {
      this.preset === "full" ? this.pluginsDisplayed = Ou : this.preset === "custom" ? this.pluginsDisplayed = this.plugins : this.pluginsDisplayed = [
        "bold",
        "italic",
        "underline",
        "link",
        "history"
      ];
    },
    // Get the extensions for the editor
    getEditorExtensions() {
      this.extensions = [
        ow,
        cw,
        lw,
        aw,
        Ow,
        zC,
        vC.configure({
          placeholder: this.translate(this.placeholder, this.locale)
        }),
        Aw,
        dC.configure({
          openOnClick: !1,
          defaultProtocol: "https"
        }),
        pw,
        vw,
        Cw,
        xw,
        Ew.configure({
          levels: [1, 2, 3]
        }),
        SC,
        wC,
        CC,
        AC,
        BC,
        Dw.configure({
          types: ["textStyle"]
        }),
        Lw.configure({
          types: ["textStyle"]
        }),
        Pw.configure({
          multicolor: !0
        }),
        Bw.configure({
          types: ["textStyle"]
        }),
        Nw.configure({
          types: ["heading", "paragraph"]
        }),
        zk.configure({
          resizable: !1,
          allowTableNodeSelection: !0
        }),
        _k,
        $k,
        Vk,
        hh.configure({
          allowBase64: !0
        }),
        hC,
        UC.configure({
          controls: !0,
          nocookie: !0
        }),
        CS
      ], this.suggestions.length > 0 && (this.extensions = this.extensions.concat([
        bC.configure({
          HTMLAttributes: {
            class: this.suggestions_class
          },
          renderText({ options: n, node: e }) {
            return "test";
          },
          renderHTML({ options: n, node: e }) {
            return [
              "span",
              n.HTMLAttributes,
              `${e.attrs.label ?? e.attrs.id}`
            ];
          },
          suggestion: Hx(this.suggestions)
        })
      ]));
    },
    // Upload the image to the server
    async uploadImage(n) {
      return new Promise((e, t) => {
        const r = new FormData();
        r.append("file", n), fetch(this.$props.uploadUrl, {
          method: "POST",
          body: r
        }).then((i) => i.json()).then((i) => {
          this.$emit("uploadedImage", i), e(i);
        }).catch((i) => {
          console.error("There was an error uploading the image", i), t(i);
        });
      });
    },
    // Handle the drop event
    dropEventHandler(n, e, t, r) {
      if (!r && e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        let i = e.dataTransfer.files[0], s = (i.size / 1024 / 1024).toFixed(4);
        return (i.type === "image/jpeg" || i.type === "image/png") && s < 10 ? this.uploadImage(i).then((o) => {
          const { schema: l } = n.state, a = n.posAtCoords({ left: e.clientX, top: e.clientY }), c = l.nodes.image.create({ src: o.url }), u = n.state.tr.insert(a.pos, c);
          return n.dispatch(u);
        }) : window.alert("Images need to be in jpg or png format and less than 10mb in size."), !0;
      }
      return !1;
    },
    // Handle the paste event
    pasteEventHandler(n) {
      if (n.clipboardData.files.length > 0)
        for (var e = 0; e < n.clipboardData.files.length; e++)
          n.clipboardData.files[e].type.includes("image") && this.uploadImage(n.clipboardData.files[e]).then((t) => {
            this.editor.chain().focus().setImage({ src: t.url }).run();
          });
    },
    importImage(n) {
      if (n.target.files.length > 0)
        for (var e = 0; e < n.target.files.length; e++)
          n.target.files[e].type.includes("image") && this.uploadImage(n.target.files[e]).then((t) => {
            this.insertImage(t.url);
          });
    },
    insertImage(n) {
      this.editor.chain().focus().setImage({ src: n }).run();
    }
  }
};
function SS(n, e, t, r, i, s) {
  const o = Xt("toolbar"), l = Xt("editor-content"), a = Xt("media-library");
  return this.editor ? (D(), P("div", {
    key: 0,
    class: De(t.wrapperClasses)
  }, [
    kn(o, {
      onImportImage: s.importImage,
      onShowMediaLibrary: e[0] || (e[0] = (c) => i.showMediaLibrary = !0),
      "editor-prop": this.editor,
      extensions: i.pluginsDisplayed,
      "display-media-library": i.displayMediaLibrary,
      toolbar_classes: t.toolbarClasses,
      palette: t.palette,
      font_families: t.fontFamilies
    }, null, 8, ["onImportImage", "editor-prop", "extensions", "display-media-library", "toolbar_classes", "palette", "font_families"]),
    v("div", {
      class: De(["editor-content", t.editorContentClasses]),
      style: zs({ height: this.editorContentHeight })
    }, [
      kn(l, {
        onPaste: s.pasteEventHandler,
        editor: i.editor,
        style: { height: "100%" }
      }, null, 8, ["onPaste", "editor"])
    ], 6),
    i.showMediaLibrary ? (D(), qt(a, {
      key: 0,
      files: t.mediaFiles,
      "delete-url": t.deleteMediaUrl,
      onCloseMediaLibrary: e[1] || (e[1] = (c) => i.showMediaLibrary = !1),
      onInsertImage: s.insertImage
    }, null, 8, ["files", "delete-url", "onInsertImage"])) : _("", !0)
  ], 2)) : _("", !0);
}
const TS = /* @__PURE__ */ Hn(xS, [["render", SS]]);
export {
  TS as default
};

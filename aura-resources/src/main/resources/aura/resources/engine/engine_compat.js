/*
 * Copyright (C) 2017 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Engine = {})));
}(this, (function (exports) { 'use strict';

var compareDocumentPosition = Node.prototype.compareDocumentPosition;
var DOCUMENT_POSITION_CONTAINS = Node.DOCUMENT_POSITION_CONTAINS;
var assert = {
    invariant: function (value, msg) {
        if (!value) {
            throw new Error("Invariant Violation: " + msg);
        }
    },
    isTrue: function (value, msg) {
        if (!value) {
            throw new Error("Assert Violation: " + msg);
        }
    },
    isFalse: function (value, msg) {
        if (value) {
            throw new Error("Assert Violation: " + msg);
        }
    },
    block: function (fn) {
        fn();
    },
    vnode: function (vnode) {
        assert.isTrue(vnode && "sel" in vnode && "data" in vnode && "children" in vnode && "text" in vnode && "elm" in vnode && "key" in vnode, vnode + " is not a vnode.");
    },
    vm: function (vm) {
        assert.isTrue(vm && "component" in vm, vm + " is not a vm.");
    },
    fail: function (msg) {
        throw new Error(msg);
    },
    logError: function (msg) {
        try {
            throw new Error(msg);
        }
        catch (e) {
            console.error(e);
        }
    },
    logWarning: function (msg) {
        try {
            throw new Error(msg);
        }
        catch (e) {
            console.warn(e);
        }
    },
    childNode: function (container, node, msg) {
        assert.isTrue(compareDocumentPosition.call(node, container) & DOCUMENT_POSITION_CONTAINS, msg || node + " must be a child node of " + container);
    }
};

var freeze = Object.freeze;
var seal = Object.seal;
var keys = Object.keys;
var create = Object.create;
var assign = Object.assign;
var defineProperty = Object.defineProperty;
var getPrototypeOf = Object.getPrototypeOf;
var setPrototypeOf = Object.setPrototypeOf;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var defineProperties = Object.defineProperties;
var hasOwnProperty = Object.hasOwnProperty;
var isArray = Array.isArray;
var _a$1 = Array.prototype;
var ArrayFilter = _a$1.filter;
var ArraySlice = _a$1.slice;
var ArraySplice = _a$1.splice;
var ArrayIndexOf = _a$1.indexOf;
var ArrayPush = _a$1.push;
var ArrayMap = _a$1.map;
var forEach = _a$1.forEach;
function isUndefined(obj) {
    return obj === undefined;
}
function isNull(obj) {
    return obj === null;
}

function isFunction(obj) {
    return typeof obj === 'function';
}
function isObject(obj) {
    return typeof obj === 'object';
}
function isString(obj) {
    return typeof obj === 'string';
}

function isPromise(obj) {
    return typeof obj === 'object' && obj === Promise.resolve(obj);
}
var OtS = {}.toString;
function toString$1(obj) {
    if (obj && typeof obj === 'object' && !obj.toString) {
        return OtS.call(obj);
    }
    return obj + '';
}

// Few more execptions that are using the attribute name to match the property in lowercase.
// this list was compiled from https://msdn.microsoft.com/en-us/library/ms533062(v=vs.85).aspx
// and https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
// Note: this list most be in sync with the compiler as well.
var HTMLPropertyNamesWithLowercasedReflectiveAttributes = [
    'accessKey',
    'readOnly',
    'tabIndex',
    'bgColor',
    'colSpan',
    'rowSpan',
    'contentEditable',
    'dateTime',
    'formAction',
    'isMap',
    'maxLength',
    'useMap',
];
// Global HTML Attributes & Properties
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
var GlobalHTMLProperties = {
    accessKey: {
        attribute: 'accesskey',
    },
    accessKeyLabel: {
        readOnly: true,
    },
    className: {
        attribute: 'class',
        error: "Using property \"className\" is an anti-pattern because of slow runtime behavior and conflicting with classes provided by the owner element. Instead use property \"classList\".",
    },
    contentEditable: {
        attribute: 'contenteditable',
    },
    isContentEditable: {
        readOnly: true,
    },
    contextMenu: {
        attribute: 'contextmenu',
    },
    dataset: {
        readOnly: true,
        msg: 'Using property "dataset" is an anti-pattern. Instead declare \`static observedAttributes = ["data-foo"]\` and use \`attributeChangedCallback(attrName, oldValue, newValue)\` to get a notification each time the attribute changes.',
    },
    dir: {
        attribute: 'dir',
    },
    draggable: {
        attribute: 'draggable',
        experimental: true,
    },
    dropzone: {
        attribute: 'dropzone',
        readOnly: true,
        experimental: true,
    },
    hidden: {
        attribute: 'hidden',
    },
    itemScope: {
        attribute: 'itemscope',
        experimental: true,
    },
    itemType: {
        attribute: 'itemtype',
        readOnly: true,
        experimental: true,
    },
    itemId: {
        attribute: 'itemid',
        experimental: true,
    },
    itemRef: {
        attribute: 'itemref',
        readOnly: true,
        experimental: true,
    },
    itemProp: {
        attribute: 'itemprop',
        readOnly: true,
        experimental: true,
    },
    itemValue: {
        experimental: true,
    },
    lang: {
        attribute: 'lang',
    },
    offsetHeight: {
        readOnly: true,
        experimental: true,
    },
    offsetLeft: {
        readOnly: true,
        experimental: true,
    },
    offsetParent: {
        readOnly: true,
        experimental: true,
    },
    offsetTop: {
        readOnly: true,
        experimental: true,
    },
    offsetWidth: {
        readOnly: true,
        experimental: true,
    },
    properties: {
        readOnly: true,
        experimental: true,
    },
    spellcheck: {
        experimental: true,
    },
    style: {
        attribute: 'style',
        error: "Using property or attribute \"style\" is an anti-pattern. Instead use property \"classList\".",
    },
    tabIndex: {
        attribute: 'tabindex',
    },
    title: {
        attribute: 'title',
    },
    translate: {
        experimental: true,
    },
    // additional global attributes that are not present in the link above.
    role: {
        attribute: 'role',
    },
    slot: {
        attribute: 'slot',
        experimental: true,
        error: "Using property or attribute \"slot\" is an anti-pattern."
    }
};
// TODO: complete this list with Element properties
// https://developer.mozilla.org/en-US/docs/Web/API/Element
// TODO: complete this list with Node properties
// https://developer.mozilla.org/en-US/docs/Web/API/Node

function getLinkedElement$1(classList) {
    return classList[ViewModelReflection].vnode.elm;
}
// This needs some more work. ClassList is a weird DOM api because it
// is a TokenList, but not an Array. For now, we are just implementing
// the simplest one.
// https://www.w3.org/TR/dom/#domtokenlist
function ClassList(vm) {
    assert.vm(vm);
    defineProperty(this, ViewModelReflection, {
        value: vm,
        writable: false,
        enumerable: false,
        configurable: false,
    });
}
ClassList.prototype = {
    add: function () {
        var vm = this[ViewModelReflection];
        var cmpClasses = vm.cmpClasses;
        var elm = getLinkedElement$1(this);
        // Add specified class values. If these classes already exist in attribute of the element, then they are ignored.
        forEach.call(arguments, function (className) {
            className = className + '';
            if (!cmpClasses[className]) {
                cmpClasses[className] = true;
                // this is not only an optimization, it is also needed to avoid adding the same
                // class twice when the initial diffing algo kicks in without an old vm to track
                // what was already added to the DOM.
                if (vm.idx) {
                    // we intentionally make a sync mutation here and also keep track of the mutation
                    // for a possible rehydration later on without having to rehydrate just now.
                    elm.classList.add(className);
                }
            }
        });
    },
    remove: function () {
        var vm = this[ViewModelReflection];
        var cmpClasses = vm.cmpClasses;
        var elm = getLinkedElement$1(this);
        // Remove specified class values.
        forEach.call(arguments, function (className) {
            className = className + '';
            if (cmpClasses[className]) {
                cmpClasses[className] = false;
                // this is not only an optimization, it is also needed to avoid removing the same
                // class twice when the initial diffing algo kicks in without an old vm to track
                // what was already added to the DOM.
                if (vm.idx) {
                    // we intentionally make a sync mutation here when needed and also keep track of the mutation
                    // for a possible rehydration later on without having to rehydrate just now.
                    var ownerClass = vm.vnode.data.class;
                    // This is only needed if the owner is not forcing that class to be present in case of conflicts.
                    if (isUndefined(ownerClass) || !ownerClass[className]) {
                        elm.classList.remove(className);
                    }
                }
            }
        });
    },
    item: function (index) {
        var vm = this[ViewModelReflection];
        var cmpClasses = vm.cmpClasses;
        // Return class value by index in collection.
        return getOwnPropertyNames(cmpClasses)
            .filter(function (className) { return cmpClasses[className + '']; })[index] || null;
    },
    toggle: function (className, force) {
        var vm = this[ViewModelReflection];
        var cmpClasses = vm.cmpClasses;
        // When only one argument is present: Toggle class value; i.e., if class exists then remove it and return false, if not, then add it and return true.
        // When a second argument is present: If the second argument evaluates to true, add specified class value, and if it evaluates to false, remove it.
        if (arguments.length > 1) {
            if (force) {
                this.add(className);
            }
            else if (!force) {
                this.remove(className);
            }
            return !!force;
        }
        if (cmpClasses[className]) {
            this.remove(className);
            return false;
        }
        this.add(className);
        return true;
    },
    contains: function (className) {
        var vm = this[ViewModelReflection];
        var cmpClasses = vm.cmpClasses;
        // Checks if specified class value exists in class attribute of the element.
        return !!cmpClasses[className];
    },
    toString: function () {
        var vm = this[ViewModelReflection];
        var cmpClasses = vm.cmpClasses;
        return getOwnPropertyNames(cmpClasses).filter(function (className) { return cmpClasses[className + '']; }).join(' ');
    }
};

var topLevelContextSymbol = Symbol('Top Level Context');
var currentContext = {};
currentContext[topLevelContextSymbol] = true;
function establishContext(ctx) {
    currentContext = ctx;
}

var nextTickCallbackQueue = [];
var SPACE_CHAR = 32;
var EmptyObject = seal(create(null));
function flushCallbackQueue() {
    assert.invariant(nextTickCallbackQueue.length, "If callbackQueue is scheduled, it is because there must be at least one callback on this pending queue instead of " + nextTickCallbackQueue + ".");
    var callbacks = nextTickCallbackQueue;
    nextTickCallbackQueue = []; // reset to a new queue
    for (var i = 0, len = callbacks.length; i < len; i += 1) {
        callbacks[i]();
    }
}
function addCallbackToNextTick(callback) {
    assert.isTrue(isFunction(callback), "addCallbackToNextTick() can only accept a function callback as first argument instead of " + callback);
    if (nextTickCallbackQueue.length === 0) {
        Promise.resolve().then(flushCallbackQueue);
    }
    // TODO: eventually, we might want to have priority when inserting callbacks
    ArrayPush.call(nextTickCallbackQueue, callback);
}
var CAMEL_REGEX = /-([a-z])/g;
var attrNameToPropNameMap = create(null);
function getPropNameFromAttrName(attrName) {
    var propName = attrNameToPropNameMap[attrName];
    if (!propName) {
        propName = attrName.replace(CAMEL_REGEX, function (g) { return g[1].toUpperCase(); });
        attrNameToPropNameMap[attrName] = propName;
    }
    return propName;
}
var CAPS_REGEX = /[A-Z]/g;
/**
 * This dictionary contains the mapping between property names
 * and the corresponding attribute name. This helps to trigger observable attributes.
 */
var propNameToAttributeNameMap = {
    // these are exceptions to the rule that cannot be inferred via `CAPS_REGEX`
    className: 'class',
    htmlFor: 'for',
};
// Few more exceptions where the attribute name matches the property in lowercase.
HTMLPropertyNamesWithLowercasedReflectiveAttributes.forEach(function (propName) {
    propNameToAttributeNameMap[propName] = propName.toLowerCase();
});
function getAttrNameFromPropName(propName) {
    var attrName = propNameToAttributeNameMap[propName];
    if (!attrName) {
        attrName = propName.replace(CAPS_REGEX, function (match) { return '-' + match.toLowerCase(); });
        propNameToAttributeNameMap[propName] = attrName;
    }
    return attrName;
}
function toAttributeValue(raw) {
    // normalizing attrs from compiler into HTML global attributes
    if (raw === true) {
        raw = '';
    }
    else if (raw === false) {
        raw = null;
    }
    return raw !== null ? raw + '' : null;
}
function noop() { }
var classNameToClassMap = create(null);
function getMapFromClassName(className) {
    var map = classNameToClassMap[className];
    if (map) {
        return map;
    }
    map = {};
    var start = 0;
    var i, len = className.length;
    for (i = 0; i < len; i++) {
        if (className.charCodeAt(i) === SPACE_CHAR) {
            if (i > start) {
                map[className.slice(start, i)] = true;
            }
            start = i + 1;
        }
    }
    if (i > start) {
        map[className.slice(start, i)] = true;
    }
    classNameToClassMap[className] = map;
    assert.block(function () {
        // just to make sure that this object never changes as part of the diffing algo
        freeze(map);
    });
    return map;
}

var hooks = ['wiring', 'rehydrated', 'connected', 'disconnected', 'piercing'];
/* eslint-enable */
var Services = create(null);
function register(service) {
    assert.isTrue(isObject(service), "Invalid service declaration, " + service + ": service must be an object");
    for (var i = 0; i < hooks.length; ++i) {
        var hookName = hooks[i];
        if (hookName in service) {
            var l = Services[hookName];
            if (isUndefined(l)) {
                Services[hookName] = l = [];
            }
            l.push(service[hookName]);
        }
    }
}
function invokeServiceHook(vm, cbs) {
    assert.vm(vm);
    assert.isTrue(isArray(cbs) && cbs.length > 0, "Optimize invokeServiceHook() to be invoked only when needed");
    var component = vm.component, data = vm.vnode.data, def = vm.def, context = vm.context;
    for (var i = 0, len = cbs.length; i < len; ++i) {
        cbs[i].call(undefined, component, data, def, context);
    }
}

function insert(vnode) {
    assert.vnode(vnode);
    var vm = vnode.vm;
    assert.vm(vm);
    assert.isFalse(vm.idx, vm + " is already inserted.");
    addInsertionIndex(vm);
    var isDirty = vm.isDirty, connectedCallback = vm.component.connectedCallback;
    if (isDirty) {
        // this code path guarantess that when patching the custom element for the first time,
        // the body is computed only after the element is in the DOM, otherwise the hooks
        // for any children's vnode are not going to be useful.
        rehydrate(vm);
    }
    var connected = Services.connected;
    if (connected) {
        addCallbackToNextTick(function () { return invokeServiceHook(vm, connected); });
    }
    if (connectedCallback && connectedCallback !== noop) {
        addCallbackToNextTick(function () { return invokeComponentMethod(vm, 'connectedCallback'); });
    }
    console.log("\"" + vm + "\" was inserted.");
}
function destroy(vnode) {
    assert.vnode(vnode);
    var vm = vnode.vm;
    assert.vm(vm);
    assert.isTrue(vm.idx, vm + " is not inserted.");
    removeInsertionIndex(vm);
    // just in case it comes back, with this we guarantee re-rendering it
    vm.isDirty = true;
    var disconnected = Services.disconnected;
    var disconnectedCallback = vm.component.disconnectedCallback;
    clearListeners(vm);
    if (disconnected) {
        addCallbackToNextTick(function () { return invokeServiceHook(vm, disconnected); });
    }
    if (disconnectedCallback && disconnectedCallback !== noop) {
        addCallbackToNextTick(function () { return invokeComponentMethod(vm, 'disconnectedCallback'); });
    }
    console.log("\"" + vm + "\" was destroyed.");
}
function postpatch(oldVnode, vnode) {
    assert.vnode(vnode);
    assert.vm(vnode.vm);
    if (vnode.vm.idx === 0) {
        // when inserting a root element, or when reusing a DOM element for a new
        // component instance, the insert() hook is never called because the element
        // was already in the DOM before creating the instance, and diffing the
        // vnode, for that, we wait until the patching process has finished, and we
        // use the postpatch() hook to trigger the connectedCallback logic.
        insert(vnode);
        // Note: we don't have to worry about destroy() hook being called before this
        // one because they never happen in the same patching mechanism, only one
        // of them is called. In the case of the insert() hook, we use the value of `idx`
        // to dedupe the calls since they both can happen in the same patching process.
    }
}
var lifeCycleHooks = {
    insert: insert,
    destroy: destroy,
    postpatch: postpatch,
};

var CHAR_S = 115;
var CHAR_V = 118;
var CHAR_G = 103;
var EmptyData = create(null);
var NamespaceAttributeForSVG = 'http://www.w3.org/2000/svg';
function addNS(data, children, sel) {
    data.ns = NamespaceAttributeForSVG;
    if (isUndefined(children) || sel === 'foreignObject') {
        return;
    }
    var len = children.length;
    for (var i_1 = 0; i_1 < len; ++i_1) {
        var child = children[i_1];
        var data_1 = child.data;
        if (data_1 !== undefined) {
            var grandChildren = child.children;
            addNS(data_1, grandChildren, child.sel);
        }
    }
}
// [v]node node
function v(sel, data, children, text, elm, Ctor) {
    data = data || EmptyData;
    var key = data.key;
    // Try to identify the owner, but for root elements and other special cases, we
    // can just fallback to 0 which means top level creation.
    var uid = vmBeingRendered ? vmBeingRendered.uid : 0;
    var vnode = { sel: sel, data: data, children: children, text: text, elm: elm, key: key, Ctor: Ctor, uid: uid };
    assert.block(function devModeCheck() {
        // adding toString to all vnodes for debuggability
        vnode.toString = function () { return "[object:vnode " + sel + "]"; };
    });
    return vnode;
}
// [h]tml node
function h(sel, data, children) {
    assert.isTrue(isString(sel), "h() 1st argument sel must be a string.");
    assert.isTrue(isObject(data), "h() 2nd argument data must be an object.");
    assert.isTrue(isArray(children), "h() 3rd argument children must be an array.");
    // checking reserved internal data properties
    assert.invariant(data.class === undefined, "vnode.data.class should be undefined when calling h().");
    var classMap = data.classMap, className = data.className, style = data.style, styleMap = data.styleMap;
    assert.isFalse(className && classMap, "vnode.data.className and vnode.data.classMap ambiguous declaration.");
    data.class = classMap || (className && getMapFromClassName(className));
    assert.isFalse(styleMap && style, "vnode.data.styleMap and vnode.data.style ambiguous declaration.");
    assert.block(function devModeCheck() {
        if (style && !isString(style)) {
            assert.logWarning("Invalid 'style' attribute passed to <" + sel + "> should be a string value, and will be ignored.");
        }
    });
    data.style = styleMap || (style && style + '');
    assert.block(function devModeCheck() {
        children.forEach(function (vnode) {
            if (vnode === null) {
                return;
            }
            assert.vnode(vnode);
        });
    });
    if (sel.length === 3 && sel.charCodeAt(0) === CHAR_S && sel.charCodeAt(1) === CHAR_V && sel.charCodeAt(2) === CHAR_G) {
        addNS(data, children, sel);
    }
    return v(sel, data, children);
}
// [c]ustom element node
function c(sel, Ctor, data) {
    // The compiler produce AMD modules that do not support circular dependencies
    // We need to create an indirection to circumvent those cases.
    // We could potentially move this check to the definition
    if (Ctor.__circular__) {
        Ctor = Ctor();
    }
    assert.isTrue(isString(sel), "c() 1st argument sel must be a string.");
    assert.isTrue(isFunction(Ctor), "c() 2nd argument Ctor must be a function.");
    assert.isTrue(isObject(data), "c() 3nd argument data must be an object.");
    // checking reserved internal data properties
    assert.invariant(data.class === undefined, "vnode.data.class should be undefined when calling c().");
    var key = data.key, slotset = data.slotset, styleMap = data.styleMap, style = data.style, attrs = data.attrs, on = data.on, className = data.className, classMap = data.classMap, _props = data.props;
    assert.isTrue(arguments.length < 4, "Compiler Issue: Custom elements expect up to 3 arguments, received " + arguments.length + " instead.");
    data = { hook: lifeCycleHooks, key: key, slotset: slotset, attrs: attrs, on: on, _props: _props };
    assert.isFalse(className && classMap, "vnode.data.className and vnode.data.classMap ambiguous declaration.");
    data.class = classMap || (className && getMapFromClassName(className));
    assert.isFalse(styleMap && style, "vnode.data.styleMap and vnode.data.style ambiguous declaration.");
    assert.block(function devModeCheck() {
        if (style && !isString(style)) {
            assert.logWarning("Invalid 'style' attribute passed to <" + sel + "> should be a string value, and will be ignored.");
        }
    });
    data.style = styleMap || (style && style + '');
    return v(sel, data, [], undefined, undefined, Ctor);
}
// [i]terable node
function i(items, factory) {
    var len = (items && items.length) || 0; // supporting arrays and objects alike
    var last = len ? (len - 1) : 0;
    var list = [];
    var _loop_1 = function (i_2) {
        var vnode = factory(items[i_2], i_2, i_2 === 0, i_2 === last);
        if (isArray(vnode)) {
            ArrayPush.apply(list, vnode);
        }
        else {
            ArrayPush.call(list, vnode);
        }
        assert.block(function devModeCheck() {
            var vnodes = isArray(vnode) ? vnode : [vnode];
            vnodes.forEach(function (vnode) {
                if (vnode && isObject(vnode) && vnode.sel && vnode.Ctor && isUndefined(vnode.key)) {
                    // TODO - it'd be nice to log the owner component rather than the iteration children
                    assert.logWarning("Missing \"key\" attribute in iteration with child \"" + toString$1(vnode.Ctor.name) + "\", index " + i_2 + " of " + len + ". Instead set a unique \"key\" attribute value on all iteration children so internal state can be preserved during rehydration.");
                }
            });
        });
    };
    for (var i_2 = 0; i_2 < len; i_2 += 1) {
        _loop_1(i_2);
    }
    return list;
}
/**
 * [f]lattening
 */
function f(items) {
    assert.isTrue(isArray(items), 'flattening api can only work with arrays.');
    var len = items.length;
    var flattened = [];
    for (var i_3 = 0; i_3 < len; i_3 += 1) {
        var item = items[i_3];
        if (isArray(item)) {
            ArrayPush.apply(flattened, item);
        }
        else {
            ArrayPush.call(flattened, item);
        }
    }
    return flattened;
}
// [t]ext node
function t(value) {
    return v(undefined, undefined, undefined, value);
}
// [d]ynamic value to produce a text vnode
function d(value) {
    if (value === undefined || value === null) {
        return null;
    }
    return v(undefined, undefined, undefined, value);
}
// [b]ind function
function b(fn) {
    assert.vm(vmBeingRendered);
    function handler(event) {
        // TODO: only if the event is `composed` it can be dispatched
        invokeComponentCallback(handler.vm, handler.fn, handler.vm.component, [event]);
    }
    handler.vm = vmBeingRendered;
    handler.fn = fn;
    return handler;
}



var api = Object.freeze({
	v: v,
	h: h,
	c: c,
	i: i,
	f: f,
	t: t,
	d: d,
	b: b
});

function compat(fn) {
    fn();
}

/*eslint-enable*/
var TargetSlot = Symbol();
var MembraneSlot = Symbol();
function isReplicable(value) {
    var type = typeof value;
    return value && (type === 'object' || type === 'function');
}
function getReplica(membrane, value) {
    if (isNull(value)) {
        return value;
    }
    value = unwrap(value);
    if (!isReplicable(value)) {
        return value;
    }
    assert.isTrue(membrane instanceof Membrane, "getReplica() first argument must be a membrane.");
    var cells = membrane.cells;
    var r = cells.get(value);
    if (r) {
        return r;
    }
    var replica = new XProxy(value, membrane); // eslint-disable-line no-undef
    cells.set(value, replica);
    return replica;
}
var Membrane = (function () {
    function Membrane(handler) {
        this.handler = handler;
        this.cells = new WeakMap();
    }
    Membrane.prototype.get = function (target, key) {
        if (key === TargetSlot) {
            return target;
        }
        else if (key === MembraneSlot) {
            return this;
        }
        return this.handler.get(this, target, key);
    };
    Membrane.prototype.set = function (target, key, newValue) {
        return this.handler.set(this, target, key, newValue);
    };
    Membrane.prototype.deleteProperty = function (target, key) {
        if (key === TargetSlot) {
            return false;
        }
        return this.handler.deleteProperty(this, target, key);
    };
    Membrane.prototype.apply = function (target, thisArg, argumentsList) {
        thisArg = unwrap(thisArg);
        argumentsList = unwrap(argumentsList);
        if (isArray(argumentsList)) {
            argumentsList = ArrayMap.call(argumentsList, unwrap);
        }
        return this.handler.apply(this, target, thisArg, argumentsList);
    };
    Membrane.prototype.construct = function (target, argumentsList, newTarget) {
        argumentsList = unwrap(argumentsList);
        if (isArray(argumentsList)) {
            argumentsList = ArrayMap.call(argumentsList, unwrap);
        }
        return this.handler.construct(this, target, argumentsList, newTarget);
    };
    return Membrane;
}());
function unwrap(replicaOrAny) {
    return (replicaOrAny && replicaOrAny[TargetSlot]) || replicaOrAny;
}

/*eslint-enable*/
function getLinkedMembrane(replicaOrAny) {
    var target = unwrap(replicaOrAny);
    if (target !== replicaOrAny) {
        return replicaOrAny[MembraneSlot];
    }
}
var lastRevokeFn;
var ProxyCompat = function Proxy(target, handler) {
    var targetIsFunction = isFunction(target);
    var targetIsArray = isArray(target);
    assert.invariant(isObject(target) || targetIsFunction, "Cannot create proxy with a non-object as target");
    assert.invariant(isObject(handler), "new Proxy expects the second argument to a CompatProxyHandler");
    var get = handler.get, set = handler.set, apply = handler.apply, construct = handler.construct;
    assert.invariant(isFunction(get) && isFunction(set) && isFunction(apply) && isFunction(construct), "CompatProxyHandler requires get, set, apply and construct traps to be defined.");
    // Construct revoke function, and set lastRevokeFn so that Proxy.revocable can steal it.
    // The caller might get the wrong revoke function if a user replaces or wraps XProxy
    // to call itself, but that seems unlikely especially when using the polyfill.
    var throwRevoked = function (trap) { }; // eslint-disable-line no-unused-vars
    lastRevokeFn = function () {
        throwRevoked = function (trap) {
            throw new TypeError("Cannot perform '" + trap + "' on a proxy that has been revoked");
        };
    };
    // Define proxy as Object, or Function (if either it's callable, or apply is set).
    var proxy = this; // reusing the already created object, eventually the prototype will be resetted
    if (targetIsFunction) {
        proxy = function Proxy() {
            var usingNew = (this && this.constructor === proxy);
            var args = ArraySlice.call(arguments);
            throwRevoked(usingNew ? 'construct' : 'apply');
            if (usingNew) {
                return construct.call(handler, target, args, this);
            }
            else {
                return apply.call(handler, target, this, args);
            }
        };
    }
    function linkProperty(target, handler, key, enumerable) {
        // arrays are usually mutable, but objects are not... normally, in compat mode they will use the accessor keys
        // instead of interacting with the object directly, but if they bypass that for some reason, having the right
        // value for configurable helps to detect those early errors.
        var configurable = targetIsArray;
        var desc = {
            enumerable: enumerable,
            configurable: configurable,
            get: function () {
                throwRevoked('get');
                return get.call(handler, target, key);
            },
            set: function (value) {
                throwRevoked('set');
                var result = set.call(handler, target, key, value);
                if (result === false) {
                    throw new TypeError("'set' on proxy: trap returned falsish for property '" + key + "'");
                }
            },
        };
        Object.defineProperty(proxy, key, desc);
    }
    // Clone enumerable properties
    for (var key in target) {
        linkProperty(target, handler, key, true);
    }
    // Set the prototype, or clone all prototype methods (always required if a getter is provided).
    var proto = getPrototypeOf(target);
    setPrototypeOf(proxy, proto);
    if (targetIsArray) {
        linkProperty(target, handler, 'length', false);
    }
    linkProperty(target, handler, MembraneSlot, false);
    linkProperty(target, handler, TargetSlot, false);
    return proxy;
};
ProxyCompat.revocable = function (target, handler) {
    var p = new XProxy(target, handler);
    return {
        proxy: p,
        revoke: lastRevokeFn,
    };
};
function getKeyCompat(replicaOrAny, key) {
    var membrane = getLinkedMembrane(replicaOrAny);
    return membrane ? membrane.get(unwrap(replicaOrAny), key) : replicaOrAny[key];
}
function callKeyCompat(replicaOrAny, key) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var membrane = getLinkedMembrane(replicaOrAny);
    var context = membrane ? unwrap(replicaOrAny) : replicaOrAny;
    var fn = membrane ? membrane.get(context, key) : replicaOrAny[key];
    return fn.apply(replicaOrAny, args);
}
function setKeyCompat(replicaOrAny, key, newValue, originalReturnValue) {
    var membrane = getLinkedMembrane(replicaOrAny);
    if (membrane) {
        membrane.set(unwrap(replicaOrAny), key, newValue);
    }
    else {
        // non-proxified assignment
        replicaOrAny[key] = newValue;
    }
    return arguments.length === 4 ? originalReturnValue : newValue;
}
function deleteKeyCompat(replicaOrAny, key) {
    var membrane = getLinkedMembrane(replicaOrAny);
    if (membrane) {
        membrane.deleteProperty(unwrap(replicaOrAny), key);
        return;
    }
    // non-profixied delete
    delete replicaOrAny[key];
}
function inKeyCompat(replicaOrAny, key) {
    var membrane = getLinkedMembrane(replicaOrAny);
    if (membrane) {
        return membrane.has(unwrap(replicaOrAny), key);
    }
    return key in replicaOrAny;
}
function iterableKeyCompat(replicaOrAny) {
    var membrane = getLinkedMembrane(replicaOrAny);
    var target = membrane ? unwrap(replicaOrAny) : replicaOrAny;
    var keyedObj = create(null);
    for (var i in target) {
        keyedObj[i] = void 0;
    }
    return keyedObj;
}
// transpilation
// 1. member expressions e.g.: `obj.x.y.z` => `getKey(obj, 'x', 'y', 'z')`
// 2. assignment of member expressions e.g.: `obj.x.y.z = 1;` => `setKey(getKey(obj, 'x', 'y'), 'z', 1)`
// 3. delete operator e.g.: `delete obj.x.y.z` => `deleteKey(getKey(obj, 'x', 'y'), 'z')`
// 4. in operator e.g.: `"z" in obj.x.y` => `inKey(getKey(obj, 'x', 'y'), 'z')`
// 5. for in operator `for (let i in obj)` => `for (let i in iterableKey(obj))`
// patches
// [*] Object.prototype.hasOwnProperty should be patched as a general rule
// [ ] Object.propertyIsEnumerable should be patched
// [*] Array.isArray
function compatIsArray(replicaOrAny) {
    return isArray(unwrap(replicaOrAny));
}
function compatKeys(replicaOrAny) {
    return keys(unwrap(replicaOrAny));
}
function compatGetOwnPropertyNames(replicaOrAny) {
    return getOwnPropertyNames(unwrap(replicaOrAny));
}
function compatHasOwnProperty(key) {
    var replicaOrAny = this;
    return hasOwnProperty.call(unwrap(replicaOrAny), key);
}
function compatAssign(replicaOrAny) {
    if (replicaOrAny == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(unwrap(replicaOrAny));
    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
            var iterator = unwrap(nextSource);
            for (var nextKey in iterator) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (hasOwnProperty.call(iterator, nextKey)) {
                    exports.setKey(to, nextKey, exports.getKey(nextSource, nextKey));
                }
            }
        }
    }
    return to;
}
// trap `preventExtensions` can be covered by a patched version of:
// [ ] Object.preventExtensions()
// [ ] Reflect.preventExtensions()
// trap `getOwnPropertyDescriptor` can be covered by a patched version of:
// [ ] Object.getOwnPropertyDescriptor()
// [ ] Reflect.getOwnPropertyDescriptor()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty
// trap `defineProperty` can be covered by a patched version of:
// [ ] Object.defineProperty()
// [ ] Reflect.defineProperty()
// trap `deleteProperty` can be covered by the transpilation and the patched version of:
// [ ] Reflect.deleteProperty()
// trap `ownKeys` can be covered by a patched version of:
// [*] Object.getOwnPropertyNames()
// [ ] Object.getOwnPropertySymbols()
// [*] Object.keys()
// [ ] Reflect.ownKeys()
// trap `isExtensible` can be covered by a patched version of:
// [ ] Object.isExtensible()
// [ ] Reflect.isExtensible()
// trap `setPrototypeOf` can be covered by a patched version of:
// [ ] Object.setPrototypeOf()
// [ ] Reflect.setPrototypeOf()
var XProxy = typeof Proxy !== "undefined" ? Proxy : undefined;






// enable/disable is meant to be used by our test infrastructure only
function enableCompatMode() {
    XProxy = ProxyCompat;
    exports.getKey = getKeyCompat;
    exports.callKey = callKeyCompat;
    exports.setKey = setKeyCompat;
    exports.deleteKey = deleteKeyCompat;
    exports.inKey = inKeyCompat;
    exports.iterableKey = iterableKeyCompat;
    Array.isArray = compatIsArray;
    assign(Object, {
        keys: compatKeys,
        getOwnPropertyNames: compatGetOwnPropertyNames,
        assign: compatAssign,
    });
    assign(Object.prototype, {
        hasOwnProperty: compatHasOwnProperty,
    });
}

// initialization
compat(function () {
    enableCompatMode();
});

var EmptySlots = create(null);
function getSlotsetValue(slotset, slotName) {
    assert.isTrue(isObject(slotset), "Invalid slotset value " + toString$1(slotset));
    // TODO: mark slotName as reactive
    return slotset && slotset[slotName];
}
var slotsetProxyHandler = {
    get: function (slotset, key) { return getSlotsetValue(slotset, key); },
    set: function () {
        assert.logError("$slotset object cannot be mutated from template.");
        return false;
    },
    deleteProperty: function () {
        assert.logError("$slotset object cannot be mutated from template.");
        return false;
    },
    apply: function () {
        assert.fail("invalid call invocation from slotset");
    },
    construct: function () {
        assert.fail("invalid construction invocation from slotset");
    },
};
function validateSlots(vm, html) {
    var _a = vm.cmpSlots, cmpSlots = _a === void 0 ? EmptySlots : _a;
    var _b = html.slots, slots = _b === void 0 ? [] : _b;
    for (var slotName in cmpSlots) {
        if (ArrayIndexOf.call(slots, slotName) === -1) {
            // TODO: this should never really happen because the compiler should always validate
            console.warn("Ignoring unknown provided slot name \"" + slotName + "\" in " + vm + ". This is probably a typo on the slot attribute.");
        }
    }
}
function validateFields(vm, html) {
    var component = vm.component;
    // validating identifiers used by template that should be provided by the component
    var _a = html.ids, ids = _a === void 0 ? [] : _a;
    ids.forEach(function (propName) {
        if (!(propName in component)) {
            console.warn("The template rendered by " + vm + " references `this." + propName + "`, which is not declared. This is likely a typo in the template.");
        }
        else if (hasOwnProperty.call(component, propName)) {
            assert.fail(component + "'s template is accessing `this." + toString$1(propName) + "` directly, which is considered a private field. Instead access it via a getter or make it reactive by moving it to `this.state." + toString$1(propName) + "`.");
        }
    });
}
function validateTemplate(vm, html) {
    validateSlots(vm, html);
    validateFields(vm, html);
}
function evaluateTemplate(vm, html) {
    assert.vm(vm);
    assert.isTrue(isFunction(html), "evaluateTemplate() second argument must be a function instead of " + html);
    // TODO: add identity to the html functions
    var component = vm.component, context = vm.context, _a = vm.cmpSlots, cmpSlots = _a === void 0 ? EmptySlots : _a, cmpTemplate = vm.cmpTemplate;
    // reset the cache momizer for template when needed
    if (html !== cmpTemplate) {
        context.tplCache = create(null);
        vm.cmpTemplate = html;
        assert.block(function devModeCheck() {
            validateTemplate(vm, html);
        });
    }
    assert.isTrue(isObject(context.tplCache), "vm.context.tplCache must be an object associated to " + cmpTemplate + ".");
    var _b = XProxy.revocable(cmpSlots, slotsetProxyHandler), slotset = _b.proxy, slotsetRevoke = _b.revoke;
    var vnodes = html.call(undefined, api, component, slotset, context.tplCache);
    assert.invariant(isArray(vnodes), "Compiler should produce html functions that always return an array.");
    slotsetRevoke();
    return vnodes;
}

function attemptToEvaluateResolvedTemplate(vm, html, originalPromise) {
    var context = vm.context;
    if (originalPromise !== context.tplPromise) {
        // resolution of an old promise that is not longer relevant, ignoring it.
        return;
    }
    if (isFunction(html)) {
        context.tplResolvedValue = html;
        assert.block(function devModeCheck() {
            if (html === vm.cmpTemplate) {
                assert.logError("component " + vm.component + " is returning a new promise everytime the render() method is invoked, even though the promise resolves to the same template " + html + ". You should cache the promise outside of the render method, and return the same promise everytime, otherwise you will incurr in some performance penalty.");
            }
        });
        // forcing the vm to be dirty so it can render its content.
        vm.isDirty = true;
        rehydrate(vm);
    }
    else if (!isUndefined(html)) {
        assert.fail("The template rendered by " + vm + " must return an imported template tag (e.g.: `import html from \"./mytemplate.html\"`) or undefined, instead, it has returned " + html + ".");
    }
    // if the promise resolves to `undefined`, do nothing...
}
function deferredTemplate(vm, html) {
    assert.vm(vm);
    assert.isTrue(isPromise(html), "deferredTemplate() second argument must be a promise instead of " + html);
    var context = vm.context;
    var tplResolvedValue = context.tplResolvedValue, tplPromise = context.tplPromise;
    if (html !== tplPromise) {
        context.tplPromise = html;
        context.tplResolvedValue = undefined;
        html.then(function (fn) { return attemptToEvaluateResolvedTemplate(vm, fn, html); });
    }
    else if (tplResolvedValue) {
        // if multiple invokes to render() return the same promise, we can rehydrate using the
        // underlaying resolved value of that promise.
        return evaluateTemplate(vm, tplResolvedValue);
    }
    return [];
}

var isRendering = false;
var vmBeingRendered = null;
function invokeComponentCallback(vm, fn, fnCtx, args) {
    var context = vm.context;
    var ctx = currentContext;
    establishContext(context);
    var result, error;
    try {
        // TODO: membrane proxy for all args that are objects
        result = fn.apply(fnCtx, args);
    }
    catch (e) {
        error = e;
    }
    establishContext(ctx);
    if (error) {
        throw error; // rethrowing the original error after restoring the context
    }
    return result;
}
function invokeComponentMethod(vm, methodName, args) {
    var component = vm.component;
    return invokeComponentCallback(vm, component[methodName], component, args);
}
function invokeComponentConstructor(vm, Ctor) {
    var context = vm.context;
    var ctx = currentContext;
    establishContext(context);
    var component, error;
    try {
        component = new Ctor();
    }
    catch (e) {
        error = e;
    }
    establishContext(ctx);
    if (error) {
        throw error; // rethrowing the original error after restoring the context
    }
    return component;
}
function invokeComponentRenderMethod(vm) {
    var component = vm.component, context = vm.context;
    var ctx = currentContext;
    establishContext(context);
    var isRenderingInception = isRendering;
    var vmBeingRenderedInception = vmBeingRendered;
    isRendering = true;
    vmBeingRendered = vm;
    var result, error;
    try {
        var html = component.render();
        if (isFunction(html)) {
            result = evaluateTemplate(vm, html);
        }
        else if (isPromise(html)) {
            result = deferredTemplate(vm, html);
        }
        else if (!isUndefined(html)) {
            assert.fail("The template rendered by " + vm + " must return an imported template tag (e.g.: `import html from \"./mytemplate.html\"`) or undefined, instead, it has returned " + html + ".");
        }
    }
    catch (e) {
        error = e;
    }
    isRendering = isRenderingInception;
    vmBeingRendered = vmBeingRenderedInception;
    establishContext(ctx);
    if (error) {
        throw error; // rethrowing the original error after restoring the context
    }
    return result || [];
}
function invokeComponentAttributeChangedCallback(vm, attrName, oldValue, newValue) {
    var component = vm.component, context = vm.context;
    var attributeChangedCallback = component.attributeChangedCallback;
    if (isUndefined(attributeChangedCallback)) {
        return;
    }
    var ctx = currentContext;
    establishContext(context);
    var error;
    try {
        component.attributeChangedCallback(attrName, oldValue, newValue);
    }
    catch (e) {
        error = e;
    }
    establishContext(ctx);
    if (error) {
        throw error; // rethrowing the original error after restoring the context
    }
}

var TargetToReactiveRecordMap = new WeakMap();
function notifyListeners(target, key) {
    var reactiveRecord = TargetToReactiveRecordMap.get(target);
    if (reactiveRecord) {
        var value = reactiveRecord[key];
        if (value) {
            var len = value.length;
            for (var i = 0; i < len; i += 1) {
                var vm = value[i];
                assert.vm(vm);
                console.log("Marking " + vm + " as dirty: property \"" + toString$1(key) + "\" of " + toString$1(target) + " was set to a new value.");
                if (!vm.isDirty) {
                    markComponentAsDirty(vm);
                    console.log("Scheduling " + vm + " for rehydration due to mutation.");
                    scheduleRehydration(vm);
                }
            }
        }
    }
}
function subscribeToSetHook(vm, target, key) {
    assert.vm(vm);
    var reactiveRecord = TargetToReactiveRecordMap.get(target);
    if (isUndefined(reactiveRecord)) {
        var newRecord = create(null);
        reactiveRecord = newRecord;
        TargetToReactiveRecordMap.set(target, newRecord);
    }
    var value = reactiveRecord[key];
    if (isUndefined(value)) {
        value = [];
        reactiveRecord[key] = value;
    }
    else if (value[0] === vm) {
        return; // perf optimization considering that most subscriptions will come from the same vm
    }
    if (ArrayIndexOf.call(value, vm) === -1) {
        ArrayPush.call(value, vm);
        // we keep track of the sets that vm is listening from to be able to do some clean up later on
        ArrayPush.call(vm.deps, value);
    }
}

/*eslint-enable*/
var ReplicableToReplicaMap = new WeakMap();
function propertyGetter(target, key) {
    if (key === TargetSlot) {
        return target;
    }
    else if (key === MembraneSlot) {
        return propertyProxyHandler;
    }
    var value = target[key];
    if (isRendering && vmBeingRendered) {
        subscribeToSetHook(vmBeingRendered, target, key);
    }
    return (value && isObject(value)) ? getPropertyProxy(value) : value;
}
function propertySetter(target, key, value) {
    if (isRendering) {
        assert.logError("Setting property \"" + toString$1(key) + "\" of " + toString$1(target) + " during the rendering process of " + vmBeingRendered + " is invalid. The render phase must have no side effects on the state of any component.");
        return false;
    }
    var oldValue = target[key];
    if (oldValue !== value) {
        target[key] = value;
        notifyListeners(target, key);
    }
    else if (key === 'length' && isArray(target)) {
        // fix for issue #236: push will add the new index, and by the time length
        // is updated, the internal length is already equal to the new length value
        // therefore, the oldValue is equal to the value. This is the forking logic
        // to support this use case.
        notifyListeners(target, key);
    }
    return true;
}
function propertyDelete(target, key) {
    delete target[key];
    notifyListeners(target, key);
    return true;
}
var propertyProxyHandler = {
    get: propertyGetter,
    set: propertySetter,
    deleteProperty: propertyDelete,
    apply: function (target /*, thisArg: any, argArray?: any*/) {
        assert.fail("invalid call invocation for property proxy " + target);
    },
    construct: function (target /*, argArray: any, newTarget?: any*/) {
        assert.fail("invalid construction invocation for property proxy " + target);
    },
};
function getPropertyProxy(value) {
    assert.isTrue(isObject(value), "perf-optimization: avoid calling this method for non-object value.");
    // TODO: Provide a holistic way to deal with built-ins, right now we just care ignore Date
    if (isNull(value) || value.constructor === Date) {
        return value;
    }
    value = unwrap(value);
    assert.block(function devModeCheck() {
        var isNode = value instanceof Node;
        assert.invariant(!isNode, "Do not store references to DOM Nodes. Instead use `this.querySelector()` and `this.querySelectorAll()` to find the nodes when needed.");
    });
    var proxy = ReplicableToReplicaMap.get(value);
    if (proxy) {
        return proxy;
    }
    proxy = new XProxy(value, propertyProxyHandler);
    ReplicableToReplicaMap.set(value, proxy);
    return proxy;
}

/* eslint-enable */
function piercingHook(membrane, target, key, value) {
    var vm = membrane.handler.vm;
    assert.vm(vm);
    var piercing = Services.piercing;
    if (piercing) {
        var component = vm.component, data = vm.vnode.data, def = vm.def, context = vm.context;
        var result_1 = value;
        var next_1 = true;
        var callback = function (newValue) {
            next_1 = false;
            result_1 = newValue;
        };
        for (var i = 0, len = piercing.length; next_1 && i < len; ++i) {
            piercing[i].call(undefined, component, data, def, context, target, key, value, callback);
        }
        return result_1 === value ? getReplica(membrane, result_1) : result_1;
    }
}
var PiercingMembraneHandler = (function () {
    function PiercingMembraneHandler(vm) {
        assert.vm(vm);
        this.vm = vm;
    }
    PiercingMembraneHandler.prototype.get = function (membrane, target, key) {
        if (key === OwnerKey) {
            return undefined;
        }
        var value = target[key];
        return piercingHook(membrane, target, key, value);
    };
    PiercingMembraneHandler.prototype.set = function (membrane, target, key, newValue) {
        target[key] = newValue;
        return true;
    };
    PiercingMembraneHandler.prototype.deleteProperty = function (membrane, target, key) {
        delete target[key];
        return true;
    };
    PiercingMembraneHandler.prototype.apply = function (membrane, targetFn, thisArg, argumentsList) {
        return getReplica(membrane, targetFn.apply(thisArg, argumentsList));
    };
    PiercingMembraneHandler.prototype.construct = function (membrane, targetFn, argumentsList, newTarget) {
        assert.isTrue(newTarget, "construct handler expects a 3rd argument with a newly created object that will be ignored in favor of the wrapped constructor.");
        return getReplica(membrane, new (targetFn.bind.apply(targetFn, [void 0].concat(argumentsList)))());
    };
    return PiercingMembraneHandler;
}());
function pierce(vm, value) {
    assert.vm(vm);
    var membrane = vm.membrane;
    if (!membrane) {
        var handler = new PiercingMembraneHandler(vm);
        membrane = new Membrane(handler);
        vm.membrane = membrane;
    }
    return getReplica(membrane, value);
}

/*eslint-enable*/
var vmBeingConstructed = null;
function isBeingConstructed(vm) {
    assert.vm(vm);
    return vmBeingConstructed === vm;
}
function createComponent(vm, Ctor) {
    assert.vm(vm);
    // create the component instance
    var vmBeingConstructedInception = vmBeingConstructed;
    vmBeingConstructed = vm;
    var component = invokeComponentConstructor(vm, Ctor);
    vmBeingConstructed = vmBeingConstructedInception;
    assert.isTrue(vm.component === component, "Invalid construction for " + vm + ", maybe you are missing the call to super() on classes extending Element.");
}
function linkComponent(vm) {
    assert.vm(vm);
    var elm = vm.vnode.elm, component = vm.component, _a = vm.def, publicMethodsConfig = _a.methods, publicProps = _a.props;
    var descriptors = {};
    var _loop_1 = function (key) {
        var getter = (function (component, key) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return component[key].apply(component, args);
        }).bind(undefined, component, key);
        descriptors[key] = {
            get: function () { return getter; }
        };
    };
    // expose public methods as props on the Element
    for (var key in publicMethodsConfig) {
        _loop_1(key);
    }
    for (var key in publicProps) {
        var getter = publicProps[key].getter;
        if (isUndefined(getter)) {
            // default getter
            getter = (function runGetter(vm, key) {
                return this[key];
            }).bind(component, vm, key);
        }
        else {
            // original getter
            getter = getter.bind(component);
        }
        var setter = (function runSetter(vm, key, value) {
            if (vm.vnode.isRoot) {
                // logic for setting new properties of the element directly from the DOM
                // will only be allowed for root elements created via createElement()
                // proxifying before storing it is a must for public props
                value = isObject(value) ? getPropertyProxy(value) : value;
                updateComponentProp(vm, key, value);
            }
            else {
                assert.logError("Invalid attempt to set property " + key + " from " + vm + " to a new value. This property was decorated with @api, and can only be changed via the template.");
            }
        }).bind(component, vm, key);
        descriptors[key] = {
            get: getter,
            set: setter,
        };
    }
    defineProperties(elm, descriptors);
    // wiring service
    var wire = vm.def.wire;
    if (wire) {
        var wiring = Services.wiring;
        if (wiring) {
            invokeServiceHook(vm, wiring);
        }
    }
}
function clearListeners(vm) {
    assert.vm(vm);
    var deps = vm.deps;
    var len = deps.length;
    if (len) {
        for (var i = 0; i < len; i += 1) {
            var set = deps[i];
            var pos = ArrayIndexOf.call(deps[i], vm);
            assert.invariant(pos > -1, "when clearing up deps, the vm must be part of the collection.");
            ArraySplice.call(set, pos, 1);
        }
        deps.length = 0;
    }
}
function updateComponentProp(vm, propName, newValue) {
    assert.vm(vm);
    var cmpProps = vm.cmpProps, _a = vm.def, publicProps = _a.props, observedAttrs = _a.observedAttrs;
    assert.invariant(!isRendering, vmBeingRendered + ".render() method has side effects on the state of " + vm + "." + propName);
    var propDef = publicProps[propName];
    if (isUndefined(propDef)) {
        // TODO: this should never really happen because the compiler should always validate
        console.warn("Ignoring unknown public property " + propName + " of " + vm + ". This is likely a typo on the corresponding attribute \"" + getAttrNameFromPropName(propName) + "\".");
        return;
    }
    assert.isFalse(propDef.getter && !propDef.setter, "Invalid attempt to set a new value for property " + propName + " of " + vm + " that does not has a setter.");
    var setter = propDef.setter;
    if (setter) {
        setter.call(vm.component, newValue);
        return;
    }
    var oldValue = cmpProps[propName];
    if (oldValue !== newValue) {
        assert.block(function devModeCheck() {
            if (isObject(newValue)) {
                assert.invariant(getPropertyProxy(newValue) === newValue, "updateComponentProp() should always received proxified object values instead of " + newValue + " in " + vm + ".");
            }
        });
        cmpProps[propName] = newValue;
        var attrName = getAttrNameFromPropName(propName);
        if (attrName in observedAttrs) {
            invokeComponentAttributeChangedCallback(vm, attrName, oldValue, newValue);
        }
        notifyListeners(cmpProps, propName);
    }
}
function resetComponentProp(vm, propName) {
    assert.vm(vm);
    var cmpProps = vm.cmpProps, _a = vm.def, publicPropsConfig = _a.props, observedAttrs = _a.observedAttrs;
    assert.invariant(!isRendering, vmBeingRendered + ".render() method has side effects on the state of " + vm + "." + propName);
    var propDef = publicPropsConfig[propName];
    if (isUndefined(propDef)) {
        // not need to log the error here because we will do it on updateComponentProp()
        return;
    }
    var newValue = undefined;
    var setter = propDef.setter;
    if (setter) {
        setter.call(vm.component, newValue);
        return;
    }
    var oldValue = cmpProps[propName];
    if (oldValue !== newValue) {
        cmpProps[propName] = newValue;
        var attrName = getAttrNameFromPropName(propName);
        if (attrName in observedAttrs) {
            invokeComponentAttributeChangedCallback(vm, attrName, oldValue, newValue);
        }
        notifyListeners(cmpProps, propName);
    }
}
function createComponentListener() {
    return function handler(event) {
        dispatchComponentEvent(handler.vm, event);
    };
}
function addComponentEventListener(vm, eventName, newHandler) {
    assert.vm(vm);
    assert.invariant(!isRendering, vmBeingRendered + ".render() method has side effects on the state of " + vm + " by adding a new event listener for \"" + eventName + "\".");
    var cmpEvents = vm.cmpEvents, cmpListener = vm.cmpListener;
    if (isUndefined(cmpEvents)) {
        // this piece of code must be in sync with modules/component-events
        vm.cmpEvents = cmpEvents = create(null);
        vm.cmpListener = cmpListener = createComponentListener();
        cmpListener.vm = vm;
    }
    if (isUndefined(cmpEvents[eventName])) {
        cmpEvents[eventName] = [];
        // this is not only an optimization, it is also needed to avoid adding the same
        // listener twice when the initial diffing algo kicks in without an old vm to track
        // what was already added to the DOM.
        if (!vm.isDirty) {
            // if the element is already in the DOM and rendered, we intentionally make a sync mutation
            // here and also keep track of the mutation for a possible rehydration later on without having
            // to rehydrate just now.
            var elm = vm.vnode.elm;
            elm.addEventListener(eventName, cmpListener, false);
        }
    }
    assert.block(function devModeCheck() {
        if (cmpEvents[eventName] && ArrayIndexOf.call(cmpEvents[eventName], newHandler) !== -1) {
            assert.logWarning(vm + " has duplicate listeners for event \"" + eventName + "\". Instead add the event listener in the connectedCallback() hook.");
        }
    });
    ArrayPush.call(cmpEvents[eventName], newHandler);
}
function removeComponentEventListener(vm, eventName, oldHandler) {
    assert.vm(vm);
    assert.invariant(!isRendering, vmBeingRendered + ".render() method has side effects on the state of " + vm + " by removing an event listener for \"" + eventName + "\".");
    var cmpEvents = vm.cmpEvents;
    if (cmpEvents) {
        var handlers = cmpEvents[eventName];
        var pos = handlers && ArrayIndexOf.call(handlers, oldHandler);
        if (handlers && pos > -1) {
            ArraySplice.call(cmpEvents[eventName], pos, 1);
            return;
        }
    }
    assert.block(function devModeCheck() {
        assert.logWarning("Did not find event listener " + oldHandler + " for event \"" + eventName + "\" on " + vm + ". Instead only remove an event listener once.");
    });
}
function dispatchComponentEvent(vm, event) {
    assert.vm(vm);
    assert.invariant(event instanceof Event, "dispatchComponentEvent() must receive an event instead of " + event);
    var cmpEvents = vm.cmpEvents, component = vm.component;
    var type = event.type;
    assert.invariant(cmpEvents && cmpEvents[type] && cmpEvents[type].length, "dispatchComponentEvent() should only be invoked if there is at least one listener in queue for " + type + " on " + vm + ".");
    var handlers = cmpEvents[type];
    var uninterrupted = true;
    var stopImmediatePropagation = event.stopImmediatePropagation;
    event.stopImmediatePropagation = function () {
        uninterrupted = false;
        stopImmediatePropagation.call(this);
    };
    var e = pierce(vm, event);
    for (var i = 0, len = handlers.length; uninterrupted && i < len; i += 1) {
        // TODO: only if the event is `composed` it can be dispatched
        invokeComponentCallback(vm, handlers[i], component, [e]);
    }
    // restoring original methods
    event.stopImmediatePropagation = stopImmediatePropagation;
}
function addComponentSlot(vm, slotName, newValue) {
    assert.vm(vm);
    assert.invariant(!isRendering, vmBeingRendered + ".render() method has side effects on the state of slot " + slotName + " in " + vm);
    assert.isTrue(isArray(newValue) && newValue.length > 0, "Slots can only be set to a non-empty array, instead received " + toString$1(newValue) + " for slot " + slotName + " in " + vm + ".");
    var cmpSlots = vm.cmpSlots;
    var oldValue = cmpSlots && cmpSlots[slotName];
    // TODO: hot-slots names are those slots used during the last rendering cycle, and only if
    // one of those is changed, the vm should be marked as dirty.
    // TODO: Issue #133
    if (!isArray(newValue)) {
        newValue = undefined;
    }
    if (oldValue !== newValue) {
        if (isUndefined(cmpSlots)) {
            vm.cmpSlots = cmpSlots = create(null);
        }
        cmpSlots[slotName] = newValue;
        console.log("Marking " + vm + " as dirty: a new value for slot \"" + slotName + "\" was added.");
        if (!vm.isDirty) {
            markComponentAsDirty(vm);
        }
    }
}
function removeComponentSlot(vm, slotName) {
    assert.vm(vm);
    assert.invariant(!isRendering, vmBeingRendered + ".render() method has side effects on the state of slot " + slotName + " in " + vm);
    // TODO: hot-slots names are those slots used during the last rendering cycle, and only if
    // one of those is changed, the vm should be marked as dirty.
    var cmpSlots = vm.cmpSlots;
    if (cmpSlots && cmpSlots[slotName]) {
        cmpSlots[slotName] = undefined; // delete will de-opt the cmpSlots, better to set it to undefined
        console.log("Marking " + vm + " as dirty: the value of slot \"" + slotName + "\" was removed.");
        if (!vm.isDirty) {
            markComponentAsDirty(vm);
        }
    }
}
function renderComponent(vm) {
    assert.vm(vm);
    assert.invariant(vm.isDirty, vm + " is not dirty.");
    console.log(vm + " is being updated.");
    clearListeners(vm);
    var vnodes = invokeComponentRenderMethod(vm);
    vm.isDirty = false;
    vm.fragment = vnodes;
    assert.invariant(isArray(vnodes), vm + ".render() should always return an array of vnodes instead of " + vnodes);
    var renderedCallback = vm.component.renderedCallback;
    if (renderedCallback && renderedCallback !== noop) {
        addCallbackToNextTick(function () { return invokeComponentMethod(vm, 'renderedCallback'); });
    }
    var rehydrated = Services.rehydrated;
    if (rehydrated) {
        addCallbackToNextTick(function () { return invokeServiceHook(vm, rehydrated); });
    }
}
function markComponentAsDirty(vm) {
    assert.vm(vm);
    assert.isFalse(vm.isDirty, "markComponentAsDirty() for " + vm + " should not be called when the componet is already dirty.");
    assert.isFalse(isRendering, "markComponentAsDirty() for " + vm + " cannot be called during rendering of " + vmBeingRendered + ".");
    vm.isDirty = true;
}

var _a$2 = Element.prototype;
var querySelector = _a$2.querySelector;
var querySelectorAll = _a$2.querySelectorAll;
function getLinkedElement$2(root) {
    return root[ViewModelReflection].vnode.elm;
}
function shadowRootQuerySelector(shadowRoot, selector) {
    var vm = shadowRoot[ViewModelReflection];
    assert.isFalse(isBeingConstructed(vm), "this.root.querySelector() cannot be called during the construction of the custom element for " + this + " because no content has been rendered yet.");
    var elm = getLinkedElement$2(shadowRoot);
    return pierce(vm, elm).querySelector(selector);
}
function shadowRootQuerySelectorAll(shadowRoot, selector) {
    var vm = shadowRoot[ViewModelReflection];
    assert.isFalse(isBeingConstructed(vm), "this.root.querySelectorAll() cannot be called during the construction of the custom element for " + this + " because no content has been rendered yet.");
    var elm = getLinkedElement$2(shadowRoot);
    return pierce(vm, elm).querySelectorAll(selector);
}
function Root(vm) {
    assert.vm(vm);
    defineProperty(this, ViewModelReflection, {
        value: vm,
        writable: false,
        enumerable: false,
        configurable: false,
    });
}
Root.prototype = {
    get mode() {
        return 'closed';
    },
    get host() {
        return this[ViewModelReflection].component;
    },
    querySelector: function (selector) {
        var _this = this;
        var node = shadowRootQuerySelector(this, selector);
        assert.block(function () {
            var vm = _this[ViewModelReflection];
            if (!node && vm.component.querySelector(selector)) {
                assert.logWarning("this.root.querySelector() can only return elements from the template declaration of " + vm.component + ". It seems that you are looking for elements that were passed via slots, in which case you should use this.querySelector() instead.");
            }
        });
        return node;
    },
    querySelectorAll: function (selector) {
        var _this = this;
        var nodeList = shadowRootQuerySelectorAll(this, selector);
        assert.block(function () {
            var vm = _this[ViewModelReflection];
            if (nodeList.length === 0 && vm.component.querySelectorAll(selector).length) {
                assert.logWarning("this.root.querySelectorAll() can only return elements from template declaration of " + vm.component + ". It seems that you are looking for elements that were passed via slots, in which case you should use this.querySelectorAll() instead.");
            }
        });
        return nodeList;
    },
    toString: function () {
        var vm = this[ViewModelReflection];
        return "Current ShadowRoot for " + vm.component;
    }
};
function getFirstMatch(vm, elm, selector) {
    var nodeList = querySelectorAll.call(elm, selector);
    // search for all, and find the first node that is owned by the VM in question.
    for (var i = 0, len = nodeList.length; i < len; i += 1) {
        if (isNodeOwnedByVM(vm, nodeList[i])) {
            return pierce(vm, nodeList[i]);
        }
    }
    return null;
}
function getAllMatches(vm, elm, selector) {
    var nodeList = querySelectorAll.call(elm, selector);
    var filteredNodes = ArrayFilter.call(nodeList, function (node) { return isNodeOwnedByVM(vm, node); });
    return pierce(vm, filteredNodes);
}
function isParentNodeKeyword(key) {
    return (key === 'parentNode' || key === 'parentElement');
}
// Registering a service to enforce the shadowDOM semantics via the Raptor membrane implementation
register({
    piercing: function (component, data, def, context, target, key, value, callback) {
        var vm = component[ViewModelReflection];
        var elm = vm.vnode.elm; // eslint-disable-line no-undef
        if (value) {
            if (value === querySelector) {
                // TODO: it is possible that they invoke the querySelector() function via call or apply to set a new context, what should
                // we do in that case? Right now this is essentially a bound function, but the original is not.
                return callback(function (selector) { return getFirstMatch(vm, target, selector); });
            }
            if (value === querySelectorAll) {
                // TODO: it is possible that they invoke the querySelectorAll() function via call or apply to set a new context, what should
                // we do in that case? Right now this is essentially a bound function, but the original is not.
                return callback(function (selector) { return getAllMatches(vm, target, selector); });
            }
            if (isParentNodeKeyword(key)) {
                if (value === elm) {
                    // walking up via parent chain might end up in the shadow root element
                    return callback(component.root);
                }
                else if (target[OwnerKey] !== value[OwnerKey]) {
                    // cutting out access to something outside of the shadow of the current target (usually slots)
                    return callback();
                }
            }
            if (value === elm) {
                // prevent access to the original Host element
                return callback(component);
            }
        }
    }
});

var ViewModelReflection = Symbol('internal');
function getLinkedElement(cmp) {
    return cmp[ViewModelReflection].vnode.elm;
}
function querySelectorAllFromComponent(cmp, selectors) {
    var elm = getLinkedElement(cmp);
    return elm.querySelectorAll(selectors);
}
function createPublicPropertyDescriptor(propName, originalPropertyDescriptor) {
    function getter() {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        var propName = getter.propName, origGetter = getter.origGetter;
        if (isBeingConstructed(vm)) {
            assert.logError(vm + " constructor should not read the value of property \"" + propName + "\". The owner component has not yet set the value. Instead use the constructor to set default values for properties.");
            return;
        }
        if (origGetter) {
            return origGetter.call(vm.component);
        }
        var cmpProps = vm.cmpProps;
        if (isRendering) {
            // this is needed because the proxy used by template is not sufficient
            // for public props accessed from within a getter in the component.
            subscribeToSetHook(vmBeingRendered, cmpProps, propName);
        }
        return cmpProps[propName];
    }
    getter.propName = propName;
    getter.origGetter = originalPropertyDescriptor && originalPropertyDescriptor.get;
    function setter(value) {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        var propName = setter.propName, origSetter = setter.origSetter;
        if (!isBeingConstructed(vm)) {
            assert.logError(vm + " can only set a new value for property \"" + propName + "\" during construction.");
            return;
        }
        if (origSetter) {
            origSetter.call(vm.component, value);
            return;
        }
        var cmpProps = vm.cmpProps;
        // proxifying before storing it is a must for public props
        cmpProps[propName] = isObject(value) ? getPropertyProxy(value) : value;
    }
    setter.propName = propName;
    setter.origSetter = originalPropertyDescriptor && originalPropertyDescriptor.set;
    var descriptor = {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    };
    return descriptor;
}
function createWiredPropertyDescriptor(propName) {
    function getter() {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        var cmpWired = vm.cmpWired;
        if (isUndefined(cmpWired)) {
            cmpWired = vm.cmpWired = getPropertyProxy(create(null)); // lazy creation of the value
        }
        var value = cmpWired[propName];
        if (isRendering) {
            // this is needed because the proxy used by template is not sufficient
            // for public props accessed from within a getter in the component.
            subscribeToSetHook(vmBeingRendered, cmpWired, propName);
        }
        return value;
    }
    function setter(value) {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        if (!value || !isObject(value)) {
            assert.logError(vm + " failed to set new value into property \"" + propName + "\". It can only be set to an object.");
            return;
        }
        var cmpWired = vm.cmpWired;
        if (isUndefined(cmpWired)) {
            cmpWired = vm.cmpWired = getPropertyProxy(create(null)); // lazy creation of the value
        }
        cmpWired[propName] = isObject(value) ? getPropertyProxy(value) : value;
        notifyListeners(cmpWired, propName);
    }
    var descriptor = {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    };
    return descriptor;
}
// This should be as performant as possible, while any initialization should be done lazily
function ComponentElement() {
    assert.vm(vmBeingConstructed, "Invalid construction.");
    assert.vnode(vmBeingConstructed.vnode, "Invalid construction.");
    var vnode = vmBeingConstructed.vnode;
    assert.invariant(vnode.elm instanceof HTMLElement, "Component creation requires a DOM element to be associated to " + vnode + ".");
    vmBeingConstructed.component = this;
    this[ViewModelReflection] = vmBeingConstructed;
}
ComponentElement.prototype = {
    // Raptor.Element APIs
    renderedCallback: noop,
    render: noop,
    // Web Component - The Good Parts
    connectedCallback: noop,
    disconnectedCallback: noop,
    // HTML Element - The Good Parts
    dispatchEvent: function (event) {
        var _this = this;
        var elm = getLinkedElement(this);
        assert.block(function () {
            var vm = _this[ViewModelReflection];
            assert.isFalse(isBeingConstructed(vm), "this.dispatchEvent() should not be called during the construction of the custom element for " + _this + " because no one is listening for the event \"" + event.type + "\" just yet.");
            if (vm.idx === 0) {
                assert.logWarning("Unreachable event \"" + event.type + "\" dispatched from disconnected element " + _this + ". Events can only reach the parent element after the element is connected(via connectedCallback) and before the element is disconnected(via disconnectedCallback).");
            }
        });
        // custom elements will rely on the DOM dispatchEvent mechanism
        return elm.dispatchEvent(event);
    },
    addEventListener: function (type, listener) {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        assert.block(function devModeCheck() {
            if (arguments.length > 2) {
                // TODO: can we synthetically implement `passive` and `once`? Capture is probably ok not supporting it.
                assert.logWarning("this.addEventListener() on " + vm + " does not support more than 2 arguments. Options to make the listener passive, once or capture are not allowed at the top level of the component's fragment.");
            }
        });
        addComponentEventListener(vm, type, listener);
    },
    removeEventListener: function (type, listener) {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        assert.block(function devModeCheck() {
            if (arguments.length > 2) {
                assert.logWarning("this.removeEventListener() on " + vm + " does not support more than 2 arguments. Options to make the listener passive or capture are not allowed at the top level of the component's fragment.");
            }
        });
        removeComponentEventListener(vm, type, listener);
    },
    getAttribute: function (attrName) {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        var attrs = vm.vnode.data.attrs;
        if (!attrName) {
            if (arguments.length === 0) {
                throw new TypeError("Failed to execute `getAttribute` on " + vm + ": 1 argument is required, got 0.");
            }
            return null;
        }
        // logging errors for experimentals and special attributes
        assert.block(function devModeCheck() {
            var propName = getPropNameFromAttrName(attrName);
            var publicPropsConfig = vm.def.props;
            if (publicPropsConfig[propName]) {
                throw new ReferenceError("Attribute \"" + attrName + "\" corresponds to public property " + propName + " from " + vm + ". Instead use `this." + propName + "`. Only use `getAttribute()` to access global HTML attributes.");
            }
            else if (GlobalHTMLProperties[propName] && GlobalHTMLProperties[propName].attribute) {
                var _a = GlobalHTMLProperties[propName], error = _a.error, experimental = _a.experimental;
                if (error) {
                    console.error(error);
                }
                else if (experimental) {
                    console.error("Attribute `" + attrName + "` is an experimental attribute that is not standardized or supported by all browsers. Property \"" + propName + "\" and attribute \"" + attrName + "\" are ignored.");
                }
            }
        });
        // normalizing attrs from compiler into HTML global attributes
        var raw = attrs && attrName in attrs ? attrs[attrName] : null;
        return toAttributeValue(raw);
    },
    getBoundingClientRect: function () {
        var elm = getLinkedElement(this);
        assert.isFalse(isBeingConstructed(this[ViewModelReflection]), "this.getBoundingClientRect() should not be called during the construction of the custom element for " + this + " because the element is not yet in the DOM, instead, you can use it in one of the available life-cycle hooks.");
        return elm.getBoundingClientRect();
    },
    querySelector: function (selectors) {
        var _this = this;
        var vm = this[ViewModelReflection];
        assert.isFalse(isBeingConstructed(vm), "this.querySelector() cannot be called during the construction of the custom element for " + this + " because no children has been added to this element yet.");
        var nodeList = querySelectorAllFromComponent(this, selectors);
        for (var i = 0, len = nodeList.length; i < len; i += 1) {
            if (wasNodePassedIntoVM(vm, nodeList[i])) {
                // TODO: locker service might need to return a membrane proxy
                return pierce(vm, nodeList[i]);
            }
        }
        assert.block(function () {
            if (shadowRootQuerySelector(_this.root, selectors)) {
                assert.logWarning("this.querySelector() can only return elements that were passed into " + vm.component + " via slots. It seems that you are looking for elements from your template declaration, in which case you should use this.root.querySelector() instead.");
            }
        });
        return null;
    },
    querySelectorAll: function (selectors) {
        var _this = this;
        var vm = this[ViewModelReflection];
        assert.isFalse(isBeingConstructed(vm), "this.querySelectorAll() cannot be called during the construction of the custom element for " + this + " because no children has been added to this element yet.");
        var nodeList = querySelectorAllFromComponent(this, selectors);
        // TODO: locker service might need to do something here
        var filteredNodes = ArrayFilter.call(nodeList, function (node) { return wasNodePassedIntoVM(vm, node); });
        assert.block(function () {
            if (filteredNodes.length === 0 && shadowRootQuerySelectorAll(_this.root, selectors).length) {
                assert.logWarning("this.querySelectorAll() can only return elements that were passed into " + vm.component + " via slots. It seems that you are looking for elements from your template declaration, in which case you should use this.root.querySelectorAll() instead.");
            }
        });
        return pierce(vm, filteredNodes);
    },
    get tagName() {
        var elm = getLinkedElement(this);
        return elm.tagName + ''; // avoiding side-channeling
    },
    get tabIndex() {
        var elm = getLinkedElement(this);
        return elm.tabIndex;
    },
    set tabIndex(value) {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        assert.isFalse(isRendering, "Setting property \"tabIndex\" of " + toString(value) + " during the rendering process of " + vmBeingRendered + " is invalid. The render phase must have no side effects on the state of any component.");
        if (isBeingConstructed(vm)) {
            assert.fail("Setting property \"tabIndex\" during the construction process of " + vm + " is invalid.");
            return;
        }
        var elm = getLinkedElement(this);
        elm.tabIndex = value;
    },
    get classList() {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        var classListObj = vm.classListObj;
        // lazy creation of the ClassList Object the first time it is accessed.
        if (isUndefined(classListObj)) {
            vm.cmpClasses = {};
            classListObj = new ClassList(vm);
            vm.classListObj = classListObj;
        }
        return classListObj;
    },
    get root() {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        var cmpRoot = vm.cmpRoot;
        // lazy creation of the ShadowRoot Object the first time it is accessed.
        if (isUndefined(cmpRoot)) {
            cmpRoot = new Root(vm);
            vm.cmpRoot = cmpRoot;
        }
        return cmpRoot;
    },
    get state() {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        var cmpState = vm.cmpState;
        if (isUndefined(cmpState)) {
            cmpState = vm.cmpState = getPropertyProxy(create(null)); // lazy creation of the cmpState
        }
        return cmpState;
    },
    set state(newState) {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        if (!newState || !isObject(newState) || isArray(newState)) {
            assert.logError(vm + " failed to set new state to " + newState + ". `this.state` can only be set to an object.");
            return;
        }
        vm.cmpState = getPropertyProxy(newState); // lazy creation of the cmpState
    },
    toString: function () {
        var vm = this[ViewModelReflection];
        assert.vm(vm);
        var _a = vm.vnode, sel = _a.sel, attrs = _a.data.attrs;
        var is = attrs && attrs.is;
        return "<" + sel + (is ? ' is="${is}' : '') + ">";
    },
};
// Global HTML Attributes
assert.block(function devModeCheck() {
    getOwnPropertyNames(GlobalHTMLProperties).forEach(function (propName) {
        if (propName in ComponentElement.prototype) {
            return; // no need to redefine something that we are already exposing
        }
        defineProperty(ComponentElement.prototype, propName, {
            get: function () {
                var vm = this[ViewModelReflection];
                assert.vm(vm);
                var _a = GlobalHTMLProperties[propName], error = _a.error, attribute = _a.attribute, readOnly = _a.readOnly, experimental = _a.experimental;
                var msg = [];
                msg.push("Accessing the global HTML property \"" + propName + "\" in " + vm + " is disabled.");
                if (error) {
                    msg.push(error);
                }
                else {
                    if (experimental) {
                        msg.push("This is an experimental property that is not standardized or supported by all browsers. Property \"" + propName + "\" and attribute \"" + attribute + "\" are ignored.");
                    }
                    if (readOnly) {
                        // TODO - need to improve this message
                        msg.push("Property is read-only.");
                    }
                    if (attribute) {
                        msg.push("\"Instead access it via the reflective attribute \"" + attribute + "\" with one of these techniques:");
                        msg.push("  * Use `this.getAttribute(\"" + attribute + "\")` to access the attribute value. This option is best suited for accessing the value in a getter during the rendering process.");
                        msg.push("  * Declare `static observedAttributes = [\"" + attribute + "\"]` and use `attributeChangedCallback(attrName, oldValue, newValue)` to get a notification each time the attribute changes. This option is best suited for reactive programming, eg. fetching new data each time the attribute is updated.");
                    }
                }
                console.log(msg.join('\n'));
                return; // explicit undefined
            },
            enumerable: false,
        });
    });
});
freeze(ComponentElement);
seal(ComponentElement.prototype);

/**
 * This module is responsible for producing the ComponentDef object that is always
 * accessible via `vm.def`. This is lazily created during the creation of the first
 * instance of a component class, and shared across all instances.
 *
 * This structure can be used to synthetically create proxies, and understand the
 * shape of a component. It is also used internally to apply extra optimizations.
 */
/*eslint-enable*/
var observableHTMLAttrs;
assert.block(function devModeCheck() {
    observableHTMLAttrs = getOwnPropertyNames(GlobalHTMLProperties).reduce(function (acc, key) {
        var globalProperty = GlobalHTMLProperties[key];
        if (globalProperty && globalProperty.attribute) {
            acc[globalProperty.attribute] = true;
        }
        return acc;
    }, create(null));
});
var CtorToDefMap = new WeakMap();
var COMPUTED_GETTER_MASK = 1;
var COMPUTED_SETTER_MASK = 2;
function isElementComponent(Ctor, protoSet) {
    protoSet = protoSet || [];
    if (!Ctor || ArrayIndexOf.call(protoSet, Ctor) >= 0) {
        return false; // null, undefined, or circular prototype definition
    }
    var proto = getPrototypeOf(Ctor);
    if (proto === ComponentElement) {
        return true;
    }
    getComponentDef(proto); // ensuring that the prototype chain is already expanded
    ArrayPush.call(protoSet, Ctor);
    return isElementComponent(proto, protoSet);
}
function createComponentDef(Ctor) {
    assert.isTrue(isElementComponent(Ctor), Ctor + " is not a valid component, or does not extends Element from \"engine\". You probably forgot to add the extend clause on the class declaration.");
    var name = Ctor.name;
    assert.isTrue(name && isString(name), toString$1(Ctor) + " should have a \"name\" property with string value, but found " + name + ".");
    assert.isTrue(Ctor.constructor, "Missing " + name + ".constructor, " + name + " should have a \"constructor\" property.");
    var props = getPublicPropertiesHash(Ctor);
    var methods = getPublicMethodsHash(Ctor);
    var observedAttrs = getObservedAttributesHash(Ctor);
    var wire = getWireHash(Ctor);
    var proto = Ctor.prototype;
    for (var propName in props) {
        var propDef = props[propName];
        // initializing getters and setters for each public prop on the target prototype
        var descriptor = getOwnPropertyDescriptor(proto, propName);
        var isComputed = descriptor && (isFunction(descriptor.get) || isFunction(descriptor.set));
        assert.invariant(!descriptor || isComputed, "Invalid " + name + ".prototype." + propName + " definition, it cannot be a prototype definition if it is a public property. Instead use the constructor to define it.");
        var config = propDef.config;
        if (COMPUTED_GETTER_MASK & config) {
            assert.isTrue(isObject(descriptor) && isFunction(descriptor.get), "Missing getter for property " + propName + " decorated with @api in " + name);
            propDef.getter = descriptor.get;
        }
        if (COMPUTED_SETTER_MASK & config) {
            assert.isTrue(isObject(descriptor) && isFunction(descriptor.set), "Missing setter for property " + propName + " decorated with @api in " + name);
            propDef.setter = descriptor.set;
        }
        defineProperty(proto, propName, createPublicPropertyDescriptor(propName, descriptor));
    }
    if (wire) {
        for (var propName in wire) {
            var descriptor = getOwnPropertyDescriptor(proto, propName);
            // for decorated methods we need to do nothing
            if (isUndefined(wire[propName].method)) {
                // initializing getters and setters for each public prop on the target prototype
                var isComputed = descriptor && (isFunction(descriptor.get) || isFunction(descriptor.set));
                assert.invariant(!descriptor || isComputed, "Invalid " + name + ".prototype." + propName + " definition, it cannot be a prototype definition if it is a property decorated with the @wire decorator.");
                defineProperty(proto, propName, createWiredPropertyDescriptor(propName));
            }
        }
    }
    var superProto = getPrototypeOf(Ctor);
    if (superProto !== ComponentElement) {
        var superDef = getComponentDef(superProto);
        props = assign(create(null), superDef.props, props);
        methods = assign(create(null), superDef.methods, methods);
        wire = (superDef.wire || wire) ? assign(create(null), superDef.wire, wire) : undefined;
    }
    var def = {
        name: name,
        wire: wire,
        props: props,
        methods: methods,
        observedAttrs: observedAttrs,
    };
    assert.block(function devModeCheck() {
        getOwnPropertyNames(observedAttrs).forEach(function (observedAttributeName) {
            var camelName = getPropNameFromAttrName(observedAttributeName);
            var propDef = props[camelName];
            if (propDef) {
                if (propDef.setter) {
                    assert.fail("Invalid entry \"" + observedAttributeName + "\" in component " + name + " observedAttributes. Use existing \"" + camelName + "\" setter to track changes.");
                }
                else if (observedAttributeName !== getAttrNameFromPropName(camelName)) {
                    assert.fail("Invalid entry \"" + observedAttributeName + "\" in component " + name + " observedAttributes. Did you mean \"" + getAttrNameFromPropName(camelName) + "\"?");
                }
            }
            else if (!observableHTMLAttrs[camelName]) {
                if (GlobalHTMLProperties[camelName] && GlobalHTMLProperties[camelName].attribute) {
                    assert.fail("Invalid entry \"" + observedAttributeName + "\" in component " + name + " observedAttributes. \"" + observedAttributeName + "\" is not a valid global HTML Attribute. Did you mean \"" + GlobalHTMLProperties[camelName].attribute + "\"? See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes");
                }
                else {
                    assert.fail("Invalid entry \"" + observedAttributeName + "\" in component " + name + " observedAttributes. \"" + observedAttributeName + "\" is not a valid global HTML Attribute. See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes");
                }
            }
        });
        freeze(Ctor.prototype);
        freeze(wire);
        freeze(props);
        freeze(methods);
        freeze(observedAttrs);
        for (var key in def) {
            defineProperty(def, key, {
                configurable: false,
                writable: false,
            });
        }
    });
    return def;
}
function getWireHash(target) {
    var wire = target.wire;
    if (!wire || !getOwnPropertyNames(wire).length) {
        return;
    }
    assert.block(function devModeCheck() {
        // TODO: check that anything in `wire` is correctly defined in the prototype
    });
    return assign(create(null), wire);
}
function getPublicPropertiesHash(target) {
    var props = target.publicProps;
    if (!props || !getOwnPropertyNames(props).length) {
        return EmptyObject;
    }
    return getOwnPropertyNames(props).reduce(function (propsHash, propName) {
        assert.block(function devModeCheck() {
            if (GlobalHTMLProperties[propName] && GlobalHTMLProperties[propName].attribute) {
                var _a = GlobalHTMLProperties[propName], error = _a.error, attribute = _a.attribute, experimental = _a.experimental;
                var msg = [];
                if (error) {
                    msg.push(error);
                }
                else if (experimental) {
                    msg.push("\"" + propName + "\" is an experimental property that is not standardized or supported by all browsers. Property \"" + propName + "\" and attribute \"" + attribute + "\" are ignored.");
                }
                else {
                    msg.push("\"" + propName + "\" is a global HTML property. Instead access it via the reflective attribute \"" + attribute + "\" with one of these techniques:");
                    msg.push("  * Use `this.getAttribute(\"" + attribute + "\")` to access the attribute value. This option is best suited for accessing the value in a getter during the rendering process.");
                    msg.push("  * Declare `static observedAttributes = [\"" + attribute + "\"]` and use `attributeChangedCallback(attrName, oldValue, newValue)` to get a notification each time the attribute changes. This option is best suited for reactive programming, eg. fetching new data each time the attribute is updated.");
                }
                console.error(msg.join('\n'));
            }
        });
        propsHash[propName] = assign({ config: 0 }, props[propName]);
        return propsHash;
    }, create(null));
}
function getPublicMethodsHash(target) {
    var publicMethods = target.publicMethods;
    if (!publicMethods || !publicMethods.length) {
        return EmptyObject;
    }
    return publicMethods.reduce(function (methodsHash, methodName) {
        methodsHash[methodName] = 1;
        assert.block(function devModeCheck() {
            assert.isTrue(isFunction(target.prototype[methodName]), "Component \"" + target.name + "\" should have a method `" + methodName + "` instead of " + target.prototype[methodName] + ".");
            freeze(target.prototype[methodName]);
        });
        return methodsHash;
    }, create(null));
}
function getObservedAttributesHash(target) {
    var observedAttributes = target.observedAttributes;
    if (!observedAttributes || !observedAttributes.length) {
        return EmptyObject;
    }
    return observedAttributes.reduce(function (observedAttributes, attrName) {
        observedAttributes[attrName] = 1;
        return observedAttributes;
    }, create(null));
}
function getComponentDef(Ctor) {
    var def = CtorToDefMap.get(Ctor);
    if (def) {
        return def;
    }
    def = createComponentDef(Ctor);
    CtorToDefMap.set(Ctor, def);
    return def;
}

var idx = 0;
var uid = 0;
var OwnerKey = Symbol('key');
function addInsertionIndex(vm) {
    assert.vm(vm);
    assert.invariant(vm.idx === 0, vm + " is already locked to a previously generated idx.");
    vm.idx = ++idx;
}
function removeInsertionIndex(vm) {
    assert.vm(vm);
    assert.invariant(vm.idx > 0, vm + " is not locked to a previously generated idx.");
    vm.idx = 0;
}
function createVM(vnode) {
    assert.vnode(vnode);
    assert.invariant(vnode.elm instanceof HTMLElement, "VM creation requires a DOM element to be associated to vnode " + vnode + ".");
    var Ctor = vnode.Ctor;
    var def = getComponentDef(Ctor);
    console.log("[object:vm " + def.name + "] is being initialized.");
    uid += 1;
    var vm = {
        uid: uid,
        idx: 0,
        isScheduled: false,
        isDirty: true,
        def: def,
        context: {},
        cmpProps: {},
        cmpWired: undefined,
        cmpState: undefined,
        cmpSlots: undefined,
        cmpEvents: undefined,
        cmpListener: undefined,
        cmpClasses: undefined,
        cmpTemplate: undefined,
        cmpRoot: undefined,
        classListObj: undefined,
        component: undefined,
        vnode: vnode,
        // used to store the latest result of the render method
        fragment: [],
        // used to track down all object-key pairs that makes this vm reactive
        deps: [],
    };
    assert.block(function devModeCheck() {
        vm.toString = function () {
            return "[object:vm " + def.name + " (" + vm.idx + ")]";
        };
    });
    vnode.vm = vm;
    createComponent(vm, Ctor);
    linkComponent(vm);
    assert.block(function devModeCheck() {
        var attributeChangedCallback = vm.component.attributeChangedCallback, observedAttrs = vm.def.observedAttrs;
        if (observedAttrs.length && isUndefined(attributeChangedCallback)) {
            console.warn(vm + " has static observedAttributes set to [\"" + keys(observedAttrs).join('", "') + "\"] but it is missing the attributeChangedCallback() method to watch for changes on those attributes. Double check for typos on the name of the callback.");
        }
    });
    return vm;
}
function relinkVM(vm, vnode) {
    assert.vm(vm);
    assert.vnode(vnode);
    assert.isTrue(vnode.elm instanceof HTMLElement, "Only DOM elements can be linked to their corresponding component.");
    assert.invariant(vm.component, "vm.component is required to be defined before " + vm + " gets linked to " + vnode + ".");
    vnode.vm = vm;
    vm.vnode = vnode;
}
function rehydrate(vm) {
    assert.vm(vm);
    if (vm.idx && vm.isDirty) {
        var vnode = vm.vnode;
        assert.isTrue(vnode.elm instanceof HTMLElement, "rehydration can only happen after " + vm + " was patched the first time.");
        assert.invariant(isArray(vnode.children), "Rendered " + vm + ".children should always have an array of vnodes instead of " + toString$1(vnode.children));
        // when patch() is invoked from within the component life-cycle due to
        // a dirty state, we create a new VNode (oldVnode) with the exact same data was used
        // to patch this vnode the last time, mimic what happen when the
        // owner re-renders, but we do so by keeping the vnode originally used by parent
        // as the source of true, in case the parent tries to rehydrate against that one.
        var oldVnode = assign({}, vnode);
        vnode.children = [];
        patch(oldVnode, vnode);
    }
    vm.isScheduled = false;
}
var rehydrateQueue = [];
function flushRehydrationQueue() {
    assert.invariant(rehydrateQueue.length, "If rehydrateQueue was scheduled, it is because there must be at least one VM on this pending queue instead of " + rehydrateQueue + ".");
    var vms = rehydrateQueue.sort(function (a, b) { return a.idx > b.idx; });
    rehydrateQueue = []; // reset to a new queue
    for (var i = 0, len = vms.length; i < len; i += 1) {
        rehydrate(vms[i]);
    }
}
function scheduleRehydration(vm) {
    assert.vm(vm);
    if (!vm.isScheduled) {
        vm.isScheduled = true;
        if (rehydrateQueue.length === 0) {
            addCallbackToNextTick(flushRehydrationQueue);
        }
        ArrayPush.call(rehydrateQueue, vm);
    }
}
function isNodeOwnedByVM(vm, node) {
    assert.vm(vm);
    assert.invariant(node instanceof Node, "isNodeOwnedByVM() should be called with a node as the second argument instead of " + node);
    assert.childNode(vm.vnode.elm, node, "isNodeOwnedByVM() should never be called with a node that is not a child node of " + vm);
    // @ts-ignore
    return node[OwnerKey] === vm.uid;
}
function wasNodePassedIntoVM(vm, node) {
    assert.vm(vm);
    assert.invariant(node instanceof Node, "isNodePassedToVM() should be called with a node as the second argument instead of " + node);
    assert.childNode(vm.vnode.elm, node, "isNodePassedToVM() should never be called with a node that is not a child node of " + vm);
    var ownerUid = vm.vnode.uid;
    // TODO: we need to walk the parent path here as well, in case they passed it via slots multiple times
    // @ts-ignore
    return node[OwnerKey] === ownerUid;
}

// this hook will set up the component instance associated to the new vnode,
// and link the new vnode with the corresponding component
function initializeComponent(oldVnode, vnode) {
    var Ctor = vnode.Ctor;
    if (isUndefined(Ctor)) {
        return;
    }
    /**
     * The reason why we do the initialization here instead of prepatch or any other hook
     * is because the creation of the component does require the element to be available.
     */
    assert.invariant(vnode.elm, vnode + ".elm should be ready.");
    if (oldVnode.vm && oldVnode.Ctor === Ctor) {
        assert.invariant(vnode.elm === oldVnode.elm, vnode + ".elm should always match the oldVnode's   element.");
        relinkVM(oldVnode.vm, vnode);
    }
    else {
        createVM(vnode);
    }
    assert.invariant(vnode.vm.component, "vm " + vnode.vm + " should have a component and element associated to it.");
}
var componentInit = {
    create: initializeComponent,
    update: initializeComponent,
};

function syncProps(oldVnode, vnode) {
    var vm = vnode.vm;
    if (isUndefined(vm)) {
        return;
    }
    var oldProps = oldVnode.data._props;
    var newProps = vnode.data._props;
    // infuse key-value pairs from _props into the component
    if (oldProps !== newProps && (oldProps || newProps)) {
        var key = void 0, cur = void 0;
        oldProps = oldProps || EmptyObject;
        newProps = newProps || EmptyObject;
        // removed props should be reset in component's props
        for (key in oldProps) {
            if (!(key in newProps)) {
                resetComponentProp(vm, key);
            }
        }
        // new or different props should be set in component's props
        for (key in newProps) {
            cur = newProps[key];
            if (!(key in oldProps) || oldProps[key] != cur) {
                updateComponentProp(vm, key, cur);
            }
        }
    }
    // Note: _props, which comes from api.c()'s data.props, is only used to populate
    //       public props, and any other alien key added to it by the compiler will be
    //       ignored, and a warning is shown.
}
var componentProps = {
    create: syncProps,
    update: syncProps,
};

function observeAttributes(oldVnode, vnode) {
    var vm = vnode.vm;
    if (isUndefined(vm)) {
        return;
    }
    var observedAttrs = vm.def.observedAttrs;
    if (observedAttrs.length === 0) {
        return; // nothing to observe
    }
    var oldAttrs = oldVnode.data.attrs;
    var newAttrs = vnode.data.attrs;
    if (oldAttrs === newAttrs || (isUndefined(oldAttrs) && isUndefined(newAttrs))) {
        return;
    }
    // infuse key-value pairs from _props into the component
    var key, cur;
    oldAttrs = oldAttrs || EmptyObject;
    newAttrs = newAttrs || EmptyObject;
    // removed props should be reset in component's props
    for (key in oldAttrs) {
        if (key in observedAttrs && !(key in newAttrs)) {
            invokeComponentAttributeChangedCallback(vm, key, oldAttrs[key], null);
        }
    }
    // new or different props should be set in component's props
    for (key in newAttrs) {
        if (key in observedAttrs) {
            cur = newAttrs[key];
            if (!(key in oldAttrs) || oldAttrs[key] != cur) {
                invokeComponentAttributeChangedCallback(vm, key, oldAttrs[key], cur);
            }
        }
    }
}
var componentAttrs = {
    create: observeAttributes,
    update: observeAttributes,
};

function removeAllCmpEventListeners(vnode) {
    var vm = vnode.vm;
    if (isUndefined(vm)) {
        return;
    }
    var on = vm.cmpEvents, listener = vm.listener;
    if (on && listener) {
        var elm = vnode.elm;
        var name = void 0;
        for (name in on) {
            elm.removeEventListener(name, listener, false);
        }
        vm.listener = undefined;
    }
}
function updateCmpEventListeners(oldVnode, vnode) {
    var vm = vnode.vm;
    if (isUndefined(vm)) {
        return;
    }
    var oldVm = oldVnode.vm;
    if (oldVm === vm) {
        return;
    }
    var oldOn = (oldVm && oldVm.cmpEvents) || EmptyObject;
    var _a = vm.cmpEvents, on = _a === void 0 ? EmptyObject : _a;
    if (oldOn === on) {
        return;
    }
    var elm = vnode.elm;
    var oldElm = oldVnode.elm;
    var listener = vm.cmpListener = (oldVm && oldVm.cmpListener) || createComponentListener();
    listener.vm = vm;
    var name;
    for (name in on) {
        if (isUndefined(oldOn[name])) {
            elm.addEventListener(name, listener, false);
        }
    }
    for (name in oldOn) {
        if (isUndefined(on[name])) {
            oldElm.removeEventListener(name, listener, false);
        }
    }
}
var eventListenersModule = {
    create: updateCmpEventListeners,
    update: updateCmpEventListeners,
    destroy: removeAllCmpEventListeners
};

function syncClassNames(oldVnode, vnode) {
    var vm = vnode.vm;
    if (isUndefined(vm)) {
        return;
    }
    var oldVm = oldVnode.vm;
    if (oldVm === vm) {
        return;
    }
    var oldClass = (oldVm && oldVm.cmpClasses) || EmptyObject;
    var _a = vm.cmpClasses, klass = _a === void 0 ? EmptyObject : _a;
    if (oldClass === klass) {
        return;
    }
    var elm = vnode.elm, _b = vnode.data.class, ownerClass = _b === void 0 ? EmptyObject : _b;
    var name;
    for (name in oldClass) {
        // remove only if it was removed from within the instance and it is not set from owner
        if (oldClass[name] && !klass[name] && !ownerClass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        if (klass[name] && !oldClass[name]) {
            elm.classList.add(name);
        }
    }
}
var componentClasses = {
    create: syncClassNames,
    update: syncClassNames,
};

function update(oldVnode, vnode) {
    var vm = vnode.vm;
    if (isUndefined(vm)) {
        return;
    }
    var oldSlots = oldVnode.data.slotset;
    var newSlots = vnode.data.slotset;
    // infuse key-value pairs from slotset into the component
    if (oldSlots !== newSlots && (oldSlots || newSlots)) {
        var key = void 0, cur = void 0;
        oldSlots = oldSlots || EmptyObject;
        newSlots = newSlots || EmptyObject;
        // removed slots should be removed from component's slotset
        for (key in oldSlots) {
            if (!(key in newSlots)) {
                removeComponentSlot(vm, key);
            }
        }
        // new or different slots should be set in component's slotset
        for (key in newSlots) {
            cur = newSlots[key];
            if (!(key in oldSlots) || oldSlots[key] != cur) {
                if (cur && cur.length) {
                    addComponentSlot(vm, key, cur);
                }
                else {
                    removeComponentSlot(vm, key);
                }
            }
        }
    }
}
var componentSlotset = {
    create: update,
    update: update,
};

function rerender(oldVnode, vnode) {
    var vm = vnode.vm;
    if (isUndefined(vm)) {
        return;
    }
    var children = vnode.children;
    // if diffing is against an inserted VM, it means the element is already
    // in the DOM and we can compute its body.
    if (vm.idx && vm.isDirty) {
        assert.invariant(oldVnode.children !== children, "If component is dirty, the children collections must be different. In theory this should never happen.");
        renderComponent(vm);
    }
    // replacing the vnodes in the children array without replacing the array itself
    // because the engine has a hard reference to the original array object.
    children.length = 0;
    ArrayPush.apply(children, vm.fragment);
}
var componentChildren = {
    create: rerender,
    update: rerender,
};

// TODO: eventually use the one shipped by snabbdom directly
function update$1(oldVnode, vnode) {
    var oldProps = oldVnode.data.props;
    var props = vnode.data.props;
    if (isUndefined(oldProps) && isUndefined(props)) {
        return;
    }
    if (oldProps === props) {
        return;
    }
    oldProps = oldProps || EmptyObject;
    props = props || EmptyObject;
    var key, cur, old;
    var elm = vnode.elm;
    for (key in oldProps) {
        if (!(key in props)) {
            if (vnode.isRoot) {
                // custom elements created programatically prevent you from
                // deleting the property because it has a set/get to update
                // the corresponding component, in this case, we just set it
                // to undefined, which has the same effect.
                elm[key] = undefined;
            }
            else {
                delete elm[key];
            }
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur) {
            if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
                // only touching the dom if the prop really changes.
                assert.block(function devModeCheck() {
                    if (elm[key] === cur && old !== undefined && !vnode.isRoot) {
                        console.warn("Unneccessary update of property \"" + key + "\" in " + elm + ", it has the same value in " + (vnode.vm || vnode) + ".");
                    }
                });
                elm[key] = cur;
            }
        }
    }
}
var props = {
    create: update$1,
    update: update$1,
};

var array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}

function createElement$1(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.nodeValue = text;
}
function getTextContent(node) {
    return node.nodeValue;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    // Performance optimization over `return node.nodeType === 3;`
    return node.splitText !== undefined;
}
function isComment(node) {
    return node.nodeType === 8;
}
var htmlDomApi = {
    createElement: createElement$1,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};

function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = { sel: "", data: {}, children: [] };
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i$$1, map = {}, key, ch;
    for (i$$1 = beginIdx; i$$1 <= endIdx; ++i$$1) {
        ch = children[i$$1];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i$$1;
        }
    }
    return map;
}
var hooks$1 = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
// export { h } from './h';
// export { thunk } from './thunk';
function init(modules, domApi) {
    var i$$1, j, cbs = {};
    var api = domApi !== undefined ? domApi : htmlDomApi;
    for (i$$1 = 0; i$$1 < hooks$1.length; ++i$$1) {
        cbs[hooks$1[i$$1]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks$1[i$$1]];
            if (hook !== undefined) {
                cbs[hooks$1[i$$1]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c$$1 = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return v(api.tagName(elm).toLowerCase() + id + c$$1, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i$$1, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i$$1 = data.hook) && isDef(i$$1 = i$$1.init)) {
                i$$1(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i$$1 = data.ns) ? api.createElementNS(i$$1, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.id = sel.slice(hash + 1, dot);
            if (dotIdx > 0)
                elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
            for (i$$1 = 0; i$$1 < cbs.create.length; ++i$$1)
                cbs.create[i$$1](emptyNode, vnode);
            if (array(children)) {
                for (i$$1 = 0; i$$1 < children.length; ++i$$1) {
                    var ch = children[i$$1];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i$$1 = vnode.data.hook; // Reuse variable
            if (isDef(i$$1)) {
                if (i$$1.create)
                    i$$1.create(emptyNode, vnode);
                if (i$$1.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i$$1, j, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i$$1 = data.hook) && isDef(i$$1 = i$$1.destroy))
                i$$1(vnode);
            for (i$$1 = 0; i$$1 < cbs.destroy.length; ++i$$1)
                cbs.destroy[i$$1](vnode);
            if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i$$1 = vnode.children[j];
                    if (i$$1 != null && typeof i$$1 !== "string") {
                        invokeDestroyHook(i$$1);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i$$1, hook;
        if (isDef(i$$1 = vnode.data) && isDef(hook = i$$1.hook) && isDef(i$$1 = hook.prepatch)) {
            i$$1(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode)
            return;
        if (vnode.data !== undefined) {
            for (i$$1 = 0; i$$1 < cbs.update.length; ++i$$1)
                cbs.update[i$$1](oldVnode, vnode);
            i$$1 = vnode.data.hook;
            if (isDef(i$$1) && isDef(i$$1 = i$$1.update))
                i$$1(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i$$1 = hook.postpatch)) {
            i$$1(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i$$1, elm, parent;
        var insertedVnodeQueue = [];
        for (i$$1 = 0; i$$1 < cbs.pre.length; ++i$$1)
            cbs.pre[i$$1]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i$$1 = 0; i$$1 < insertedVnodeQueue.length; ++i$$1) {
            insertedVnodeQueue[i$$1].data.hook.insert(insertedVnodeQueue[i$$1]);
        }
        for (i$$1 = 0; i$$1 < cbs.post.length; ++i$$1)
            cbs.post[i$$1]();
        return vnode;
    };
}

var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var ColonCharCode = 58;
var XCharCode = 120;
function updateAttrs(oldVnode, vnode) {
    var oldAttrs = oldVnode.data.attrs;
    var attrs = vnode.data.attrs;
    if (!oldAttrs && !attrs) {
        return;
    }
    if (oldAttrs === attrs) {
        return;
    }
    var elm = vnode.elm;
    var key;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];
        if (old !== cur) {
            if (cur === true) {
                elm.setAttribute(key, "");
            }
            else if (cur === false) {
                elm.removeAttribute(key);
            }
            else {
                if (key.charCodeAt(0) !== XCharCode) {
                    elm.setAttribute(key, cur);
                }
                else if (key.charCodeAt(3) === ColonCharCode) {
                    // Assume xml namespace
                    elm.setAttributeNS(xmlNS, key, cur);
                }
                else if (key.charCodeAt(5) === ColonCharCode) {
                    // Assume xlink namespace
                    elm.setAttributeNS(xlinkNS, key, cur);
                }
                else {
                    elm.setAttribute(key, cur);
                }
            }
        }
    }
    // remove removed attributes
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
var attributesModule = {
    create: updateAttrs,
    update: updateAttrs
};

var DashCharCode = 45;
function updateStyle(oldVnode, vnode) {
    var oldStyle = oldVnode.data.style;
    var style = vnode.data.style;
    if (!oldStyle && !style) {
        return;
    }
    if (oldStyle === style) {
        return;
    }
    oldStyle = oldStyle || {};
    style = style || {};
    var name;
    var elm = vnode.elm;
    if (isString(style)) {
        elm.style.cssText = style;
    }
    else {
        if (isString(oldStyle)) {
            elm.style.cssText = '';
        }
        else {
            for (name in oldStyle) {
                if (!(name in style)) {
                    elm.style.removeProperty(name);
                }
            }
        }
        for (name in style) {
            var cur = style[name];
            if (cur !== oldStyle[name]) {
                if (name.charCodeAt(0) === DashCharCode && name.charCodeAt(1) === DashCharCode) {
                    // if the name is prefied with --, it will be considered a variable, and setProperty() is needed
                    elm.style.setProperty(name, cur);
                }
                else {
                    elm.style[name] = cur;
                }
            }
        }
    }
}
var styleModule = {
    create: updateStyle,
    update: updateStyle,
};

function updateClass(oldVnode, vnode) {
    var _a = oldVnode.data.class, oldClass = _a === void 0 ? EmptyObject : _a;
    var elm = vnode.elm, _b = vnode.data.class, klass = _b === void 0 ? EmptyObject : _b;
    if (oldClass === klass) {
        return;
    }
    var innerClass = (vnode.vm && vnode.vm.cmpClasses) || EmptyObject;
    var name;
    for (name in oldClass) {
        // remove only if it is not in the new class collection and it is not set from within the instance
        if (!klass[name] && !innerClass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        if (!oldClass[name]) {
            elm.classList.add(name);
        }
    }
}
var classes = {
    create: updateClass,
    update: updateClass
};

function handleEvent(event, vnode) {
    var type = event.type;
    var on = vnode.data.on;
    var handler = on && on[type];
    // call event handler if exists
    if (handler) {
        handler.call(undefined, event);
    }
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function removeAllEventListeners(vnode) {
    var on = vnode.data.on, listener = vnode.listener;
    if (on && listener) {
        var elm = vnode.elm;
        var name = void 0;
        for (name in on) {
            elm.removeEventListener(name, listener, false);
        }
        vnode.listener = undefined;
    }
}
function updateEventListeners(oldVnode, vnode) {
    var _a = oldVnode.data.on, oldOn = _a === void 0 ? EmptyObject : _a;
    var _b = vnode.data.on, on = _b === void 0 ? EmptyObject : _b;
    if (oldOn === on) {
        return;
    }
    var elm = vnode.elm;
    var oldElm = oldVnode.elm;
    var listener = vnode.listener = oldVnode.listener || createListener();
    listener.vnode = vnode;
    var name;
    for (name in on) {
        if (isUndefined(oldOn[name])) {
            elm.addEventListener(name, listener, false);
        }
    }
    for (name in oldOn) {
        if (isUndefined(on[name])) {
            oldElm.removeEventListener(name, listener, false);
        }
    }
}
var eventListenersModule$1 = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: removeAllEventListeners
};

function updateUID(oldVnode, vnode) {
    var oldUid = oldVnode.uid;
    var elm = vnode.elm, uid = vnode.uid;
    if (uid === oldUid) {
        return;
    }
    // @ts-ignore
    elm[OwnerKey] = uid;
}
var uidModule = {
    create: updateUID,
    update: updateUID,
};

var patch = init([
    componentInit,
    componentSlotset,
    componentProps,
    componentAttrs,
    eventListenersModule,
    componentClasses,
    componentChildren,
    props,
    attributesModule,
    classes,
    styleModule,
    eventListenersModule$1,
    uidModule,
]);

var _a = Element.prototype;
var getAttribute = _a.getAttribute;
var setAttribute = _a.setAttribute;
var removeAttribute = _a.removeAttribute;
function linkAttributes(element, vm) {
    assert.vm(vm);
    var _a = vm.def, propsConfig = _a.props, observedAttrs = _a.observedAttrs;
    // replacing mutators and accessors on the element itself to catch any mutation
    element.getAttribute = function (attrName) {
        attrName = attrName.toLocaleLowerCase();
        var propName = getPropNameFromAttrName(attrName);
        if (propsConfig[propName]) {
            assert.logError("Invalid attribute \"" + attrName + "\" for " + vm + ". Instead access the public property with `element." + propName + ";`.");
            return;
        }
        return getAttribute.call(element, attrName);
    };
    element.setAttribute = function (attrName, newValue) {
        attrName = attrName.toLocaleLowerCase();
        var propName = getPropNameFromAttrName(attrName);
        if (propsConfig[propName]) {
            assert.logError("Invalid attribute \"" + attrName + "\" for " + vm + ". Instead update the public property with `element." + propName + " = value;`.");
            return;
        }
        var oldValue = getAttribute.call(element, attrName);
        setAttribute.call(element, attrName, newValue);
        newValue = getAttribute.call(element, attrName);
        if (attrName in observedAttrs && oldValue !== newValue) {
            invokeComponentAttributeChangedCallback(vm, attrName, oldValue, newValue);
        }
    };
    element.removeAttribute = function (attrName) {
        attrName = attrName.toLocaleLowerCase();
        var propName = getPropNameFromAttrName(attrName);
        if (propsConfig[propName]) {
            assert.logError("Invalid attribute \"" + attrName + "\" for " + vm + ". Instead update the public property with `element." + propName + " = undefined;`.");
            return;
        }
        assert.block(function devModeCheck() {
            var propName = getPropNameFromAttrName(attrName);
            if (propsConfig[propName]) {
                updateComponentProp(vm, propName, newValue);
                if (vm.isDirty) {
                    console.log("Scheduling " + vm + " for rehydration.");
                    scheduleRehydration(vm);
                }
            }
        });
        var oldValue = getAttribute.call(element, attrName);
        removeAttribute.call(element, attrName);
        var newValue = getAttribute.call(element, attrName);
        if (attrName in observedAttrs && oldValue !== newValue) {
            invokeComponentAttributeChangedCallback(vm, attrName, oldValue, newValue);
        }
    };
}
function getInitialProps(element, Ctor) {
    var config = getComponentDef(Ctor).props;
    var props = {};
    for (var propName in config) {
        if (propName in element) {
            props[propName] = element[propName];
        }
    }
    return props;
}
function getInitialSlots(element, Ctor) {
    var slotNames = getComponentDef(Ctor).slotNames;
    if (isUndefined(slotNames)) {
        return;
    }
    // TODO: implement algo to resolve slots
    return undefined;
}
/**
 * This algo mimics 2.5 of web component specification somehow:
 * https://www.w3.org/TR/custom-elements/#upgrades
 */
function upgradeElement(element, Ctor) {
    if (isUndefined(Ctor)) {
        throw new TypeError("Invalid Component Definition: " + Ctor + ".");
    }
    var props = getInitialProps(element, Ctor);
    var slotset = getInitialSlots(element, Ctor);
    var tagName = element.tagName.toLowerCase();
    var vnode = c(tagName, Ctor, { props: props, slotset: slotset, className: element.className || undefined });
    vnode.isRoot = true;
    // TODO: eventually after updating snabbdom we can use toVNode(element)
    // as the first argument to reconstruct the vnode that represents the
    // current state.
    var vm = patch(element, vnode).vm;
    linkAttributes(element, vm);
}
/**
 * This method is almost identical to document.createElement
 * (https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
 * with the slightly difference that in the options, you can pass the `is`
 * property set to a Constructor instead of just a string value. E.g.:
 *
 * const el = createElement('x-foo', { is: FooCtor });
 *
 * If the value of `is` attribute is not a constructor,
 * then we fallback to the normal Web-Components workflow.
 */
function createElement(tagName, options) {
    if (options === void 0) { options = {}; }
    var Ctor = isFunction(options.is) ? options.is : null;
    var element = document.createElement(tagName, Ctor ? null : options);
    if (Ctor && element instanceof HTMLElement) {
        upgradeElement(element, Ctor);
    }
    return element;
}
// TODO: how can a user dismount a component and kick in the destroy mechanism?

exports.createElement = createElement;
exports.getComponentDef = getComponentDef;
exports.Element = ComponentElement;
exports.register = register;
exports.unwrap = unwrap;

Object.defineProperty(exports, '__esModule', { value: true });

})));
/** version: 0.12.4 */

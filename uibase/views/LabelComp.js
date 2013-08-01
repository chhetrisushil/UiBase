/**
 * @filename: LabelComp
 * @author: schhetri
 * @date: 02/08/13
 * @time: 1:08 AM
 */
(function (window, UIBase, JSgoodies, undefined) {
    "use strict";
    var Label;

    Label = JSgoodies.Class({
        __$el: null, // __ signifies the private nature of the variable
        __opts: null,
        observers: {
            text: function (val, fn) {
                this.__$el.text((fn) ? fn(val) : val);
            }
        },

        init: function (conf) {
            this.__$el = $('<label />');
            this.__opts = conf || {};
            if (this.__opts.render) {
                this.render();
            }
        },

        render: function () {
            var opts = this.__opts,
                text = opts.text;
            if (text) {
                this.__$el.text(text);
            }
        },

        getEl: function () {
            return this.__$el;
        },

        updateText: function (comp, on, fn) {
            if (!$.isFunction(comp.addObserver)) {
                throw new Error('Given Object is not an Observable Component');
            }
            comp.addObserver(on, $.proxy(function (value) {
                this.__$el.text((fn) ? fn(value) : value);
            }, this));
        },

        update: function (prop, fn) {
            var _self = this;
            return function (val) {
                var args = Array.prototype.slice.call(arguments);
                if (fn) {
                    args[args.length] = fn;
                }
                _self.observers[prop] && _self.observers[prop].apply(_self, args);
            };
        }
    })._extends(UIBase.Component);

    UIBase.Label = Label;
})(this, this.uibase || (this.uibase = {}), this.JSgoodies);
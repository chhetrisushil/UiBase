/**
 * @filename: Select
 * @author: schhetri
 * @date: 27/07/13
 * @time: 10:55 AM
 */
(function (window, UIBase, JSgoodies, undefined) {
    "use strict";
    var Select;

    Select = JSgoodies.Class({
        __$el: null, // __ signifies the private nature of the variable
        __opts: null,

        init: function (conf) {
            this.__$el = $('<select />');
            this.__opts = conf || {};
            if (this.__opts.render) {
                this.render();
            }
            this.bindEvent();
        },

        render: function () {
            var opts = this.__opts,
                options = opts.options,
                html = '';
            if (options) {
                options.forEach(function (option) {
                    html += '<option value="' + option.value + '">' + option.text + '</option>';
                });

                this.__$el.html(html);
            }
        },

        bindEvent: function () {
            var _self = this;
            this.__$el.on('change', function () {
                _self.fireObserver('value', $(this).val());
            });
        },

        getEl: function () {
            return this.__$el;
        }
    })._extends(UIBase.Component);

    UIBase.Select = Select;
})(this, this.uibase || (this.uibase = {}), this.JSgoodies);
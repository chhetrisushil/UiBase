;(function(ub) {
    "use strict";

    ub.Views = ub.Views || {};

    var Label = ub.Utils.Class({

        extends: ub.Component,

        construct: function(config) {
            var v = this;

            this._super(config);

            v._text = config.text || "";
            v._el = $("<span>").text(v._text);

            v._inPorts.text = function(observable) {
                v._outPorts.text = observable; //observable.clone()
                var ob = new ub.Observer(function(text) {
                    v._text = text;
                    v._el.text(text);
                });
                return observable.subscribe(ob);
            };
        },

        render: function() {
            return this._el;
        }
    });

    ub.Views.Label = Label;

})(window.uibase);

(function(ub) {
    "use strict";

    var utils = ub.Utils;

    /* Simple JavaScript Inheritance
     * By John Resig http://ejohn.org/
     * MIT Licensed.
     */
    // Inspired by base2 and Prototype
    
    var initializing = false,
        fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    var __extend = function(prop) {
        var Parent = this,
            _super = Parent.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new Parent();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] === "function" &&
                typeof _super[name] === "function" && fnTest.test(prop[name]) ?
                (function(name, fn) {
                    return function() {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                    prop[name];
        }

        // The dummy class constructor

        function Class() {
            // All construction is actually done in the construct method
            if ( !initializing && this.construct )
                this.construct.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        //Class.extend = arguments.callee;

        return Class;
    };

    utils.Class = function(config) {
        var parent = config["extends"],
            Child,
            instanceProps;

        instanceProps = utils.extend({}, config);
        delete instanceProps["extends"];
        delete instanceProps["static"];

        if (parent) {
            Child = __extend.apply(parent, [instanceProps]);
        } else {
            Child = __extend.apply(function() {}, [instanceProps]);
        }

        utils.extend(Child, config["static"]);

        //TODO: Find a better way to inherit static properties
        if (parent) utils.extend(Child, parent);

        return Child;
    };

})(window.uibase);
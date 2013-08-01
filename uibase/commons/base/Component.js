/**
 * @filename: Component
 * @author: schhetri
 * @date: 27/07/13
 * @time: 10:42 AM
 */
(function (window, UIBase, JSgoodies, undefined) {
    "use strict";
    /**
     * Component class is just a stub for now. Any abstract method should be added in Component class
     * @type {Class}
     */
    var Component = JSgoodies.Class({isComponent: true})._extends(JSgoodies.ObservableClass);

    UIBase.Component = Component;
})(this, this.uibase || (this.uibase = {}), this.JSgoodies);

/**
 * @filename: App
 * @author: schhetri
 * @date: 27/07/13
 * @time: 11:15 AM
 */
(function (window, UIBase, JSgoodies, undefined) {
    "use strict";
    var App = JSgoodies.Class({
            init: function () {
                var select = new UIBase.Select({
                        render: true,
                        options: [
                            {
                                text: 'One',
                                value: 1
                            },
                            {
                                text: 'Two',
                                value: 2
                            }
                        ]
                    }),
                    label = new UIBase.Label({render: true, text: 'No Value'}),
                    label2 = new UIBase.Label({render: true, text: 'Second Label'}),
                    label3 = new UIBase.Label({render: true, text: 'Third Label'}),
                    label4 = new UIBase.Label({render: true, text: 'Fourth Label'});

                //pre-defined method exposed to update the property
                label.updateText(select, 'value');

                //pre-defined method exposed to update the property with a function to alter the final result
                label2.updateText(select, 'value', function (v) {return 'text is '+(parseInt(v,10)+1);});

                // adding observer to the object itself on a property change
                //NOTE: label3.update is a curry function which behaves as a handler
                select.addObserver('value', label3.update('text', function (v) {return 'text is '+(parseInt(v,10)+3);}));
                select.addObserver('value', label4.update('text'));

                $('body')
                    .append(select.getEl())
                    .append('<br />')
                    .append(label.getEl())
                    .append('<br />')
                    .append(label2.getEl())
                    .append('<br />')
                    .append(label3.getEl())
                    .append('<br />')
                    .append(label4.getEl());
            }
        }),
        app = new App();
})(this, this.uibase || (this.uibase = {}), this.JSgoodies);
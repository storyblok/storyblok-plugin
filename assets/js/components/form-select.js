/*! UIkit 2.27.2 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {

    var component;

    if (window.UIkit2sb) {
        component = addon(UIkit2sb);
    }

    if (typeof define == 'function' && define.amd) {
        define('uikit-form-select', ['uikit'], function(){
            return component || addon(UIkit2sb);
        });
    }

})(function(UI){

    "use strict";

    UI.component('formSelect', {

        defaults: {
            target: '>span:first',
            activeClass: 'sb-active'
        },

        boot: function() {
            // init code
            UI.ready(function(context) {

                UI.$('[data-sb-form-select]', context).each(function(){

                    var ele = UI.$(this);

                    if (!ele.data('formSelect')) {
                        UI.formSelect(ele, UI.Utils.options(ele.attr('data-sb-form-select')));
                    }
                });
            });
        },

        init: function() {

            var $this = this;

            this.target  = this.find(this.options.target);
            this.select  = this.find('select');

            // init + on change event
            this.select.on({

                change: (function(){

                    var select = $this.select[0], fn = function(){

                        try {

                            if($this.options.target === 'input') {
                                $this.target.val(select.options[select.selectedIndex].text);
                            } else {
                                $this.target.text(select.options[select.selectedIndex].text);
                            }

                        } catch(e) {}

                        $this.element[$this.select.val() ? 'addClass':'removeClass']($this.options.activeClass);

                        return fn;
                    };

                    return fn();
                })(),

                focus: function(){ $this.target.addClass('sb-focus') },
                blur: function(){ $this.target.removeClass('sb-focus') },
                mouseenter: function(){ $this.target.addClass('sb-hover') },
                mouseleave: function(){ $this.target.removeClass('sb-hover') }
            });

            this.element.data("formSelect", this);
        }
    });

    return UI.formSelect;
});

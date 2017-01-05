/*! UIkit 2.27.2 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {

    var component;

    if (window.UIkit2sb) {
        component = addon(UIkit2sb);
    }

    if (typeof define == 'function' && define.amd) {
        define('uikit-search', ['uikit'], function(){
            return component || addon(UIkit2sb);
        });
    }

})(function(UI){

    "use strict";

    UI.component('search', {
        defaults: {
            msgResultsHeader   : 'Search Results',
            msgMoreResults     : 'More Results',
            msgNoResults       : 'No results found',
            template           : '<ul class="sb-nav sb-nav-search sb-autocomplete-results">\
                                      {{#msgResultsHeader}}<li class="sb-nav-header sb-skip">{{msgResultsHeader}}</li>{{/msgResultsHeader}}\
                                      {{#items && items.length}}\
                                          {{~items}}\
                                          <li data-url="{{!$item.url}}">\
                                              <a href="{{!$item.url}}">\
                                                  {{{$item.title}}}\
                                                  {{#$item.text}}<div>{{{$item.text}}}</div>{{/$item.text}}\
                                              </a>\
                                          </li>\
                                          {{/items}}\
                                          {{#msgMoreResults}}\
                                              <li class="sb-nav-divider sb-skip"></li>\
                                              <li class="sb-search-moreresults" data-moreresults="true"><a href="#" onclick="jQuery(this).closest(\'form\').submit();">{{msgMoreResults}}</a></li>\
                                          {{/msgMoreResults}}\
                                      {{/end}}\
                                      {{^items.length}}\
                                        {{#msgNoResults}}<li class="sb-skip"><a>{{msgNoResults}}</a></li>{{/msgNoResults}}\
                                      {{/end}}\
                                  </ul>',

            renderer: function(data) {

                var opts = this.options;

                this.dropdown.append(this.template({items:data.results || [], msgResultsHeader:opts.msgResultsHeader, msgMoreResults: opts.msgMoreResults, msgNoResults: opts.msgNoResults}));
                this.show();
            }
        },

        boot: function() {

            // init code
            UI.$html.on('focus.search.uikit', '[data-sb-search]', function(e) {
                var ele =UI.$(this);

                if (!ele.data('search')) {
                    UI.search(ele, UI.Utils.options(ele.attr('data-sb-search')));
                }
            });
        },

        init: function() {
            var $this = this;

            this.autocomplete = UI.autocomplete(this.element, this.options);

            this.autocomplete.dropdown.addClass('sb-dropdown-search');

            this.autocomplete.input.on("keyup", function(){
                $this.element[$this.autocomplete.input.val() ? 'addClass':'removeClass']('sb-active');
            }).closest("form").on("reset", function(){
                $this.value = '';
                $this.element.removeClass('sb-active');
            });

            this.on('selectitem.uk.autocomplete', function(e, data) {
                if (data.url) {
                  location.href = data.url;
                } else if(data.moreresults) {
                  $this.autocomplete.input.closest('form').submit();
                }
            });

            this.element.data('search', this);
        }
    });
});

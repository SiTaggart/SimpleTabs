(function($) {

    /**
    * SimpleTabs plugin
    * @method simpleTabs
    * @param element, options
    */
    $.simpleTabs = function(element, options) {

        //defaults, not actually needed yet
        var defaults = {
            foo: 'bar',
            onFoo: function() {}
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;
        
        /**
        * Methid for initialising the simpleTabs
        * @method init
        * @for simpleTabs
        */
        plugin.init = function() {
            //set settings with defaults
            plugin.settings = $.extend({}, defaults, options);
            //build the tabs from ui
            plugin.buildTabs();
            //bind tab events
            plugin.bindEvents();
        }
        /**
        * Menthod used to build the tab html
        * @method buildTabs
        * @for simpleTabs
        */
        plugin.buildTabs = function() {

            //grab the headings, panels and inactive tabs
            plugin.$tabHeadings = $element.find('.om-tab-heading');
            plugin.$tabPanels = $element.find('.om-tab-panel');
            plugin.$inactivetabPanels = $element.find('[data-active="false"]');

            //build the elements used to create the tab list for tab switching
            var $tabList = $('<ul />', {'class': 'om-tab-list'}),
                $tabListItem = $('<li />', {'class': 'om-tab-list-item'}),
                $tabListItemHolder;
            
            //for each tab heading, build a tab and append it to the list
            plugin.$tabHeadings.each(function(index) {
                //clone list item
                $tabListItemHolder = $tabListItem.clone();
                //if the panel is inactive, add a class to he heading
                if($(this).next().attr('data-active') == 'false') $(this).addClass('om-tab-heading-inactive');
                //append the heading to the list item
                $tabListItemHolder.append($(this));
                //add the list item to the list of tabs
                $tabList.append($tabListItemHolder);
            });

            //add a class to all inavtive tab panels
            plugin.$inactivetabPanels.addClass('om-tab-panel-inactive');

            //prepend the tab list to the tab element
            $element.prepend($tabList);
            //indicate the tabs are ready by adding a class
            $element.addClass('om-tabs-active');
            
            //check if we have to open specific tab
            var defaultTabIndex = 0;
            plugin.setCurrentTab(defaultTabIndex);
          
        }
        /**
        * Mehtod to bind the events
        * @method bindEvents
        * @for SimpleTabs
        */
        plugin.bindEvents = function() {
            //on heading tab click
            plugin.$tabHeadings.bind('click', function(event) {
                //stop is inactive
                if($(this).hasClass('om-tab-heading-inactive')) return;
                //change the tab, pass in click event
                plugin.changeTab(event);
            });
        }
        /**
        * MEthod used to change a tab
        * @method changeTab
        * @for simpleTabs
        * @param click event
        */
        plugin.changeTab = function(e) {
            //grab current tab from event target (the one you clicked on) and find it's index
            var $currentTab = $(e.target);
                currentIndex = plugin.$tabHeadings.index($currentTab);
            
            //trigger and event called change which can be used outside of the plugin for a callback
            $element.trigger('change');
            //reset the tabs
            plugin.resetCurrentTab();
            //set current tab to the new tabs index
            plugin.setCurrentTab(currentIndex);
        }
        /**
        * Method to reset al tabs
        * @method resetCurrentTab
        * @for simpleTabs
        */
        plugin.resetCurrentTab = function() {
            //remove active class from panels
            plugin.$tabPanels.removeClass('om-tab-panel-active');
            //remove active class from headings
            plugin.$tabHeadings.parent().removeClass('om-tab-list-item-active');
        }
        /**
        * Method used set the current tab
        * @method setCurrentTab
        * @for simpleTab
        * @param index of clicked tab / tab to set as current
        */
        plugin.setCurrentTab = function(i) {
            //set the panel based on the index as the active panel
            plugin.$tabPanels.eq(i).addClass('om-tab-panel-active');
            //set the tab heading based on the index as the active tab
            plugin.$tabHeadings.eq(i).parent().addClass('om-tab-list-item-active');
        }

        var foo_private_method = function() {
            // code goes here
        }
        //initialise the plugin
        plugin.init();

    }
    //add as a jQuery funciton
    $.fn.simpleTabs = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('simpleTabs')) {
                var plugin = new $.simpleTabs(this, options);
                $(this).data('simpleTabs', plugin);
            }
        });

    }

})(jQuery);
/* Copyright 2015, Clippings Ltd. Licensed under BSD-3-Clause
 * See license text at https://github.com/clippings/date-ago/blob/master/LICENSE */

 /* exported DateAgo */

var DateAgo = (function ($) {

    'use strict'

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME                = 'dateAgo'
    var DATA_KEY            = 'dateAgo'

    var Selector = {
        WIDGET   : '[data-update="date-ago"]'
    }

    var Default = {
        interval: 5000,
        seconds: 'less than a minute ago',
        minute: 'about a minute ago',
        minutes: '%d minutes ago',
        hour: 'about an hour ago',
        hours: 'about %d hours ago',
        day: 'yesterday',
        days: '%d days ago',
        month: 'about a month ago',
        months: '%d months ago',
        year: 'about a year ago',
        years: '%d years ago'
    }

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    /**
     * @param  {jQuery} element
     * @param  {Object} options
     */
    function DateAgo(element, options) {
        this.$element = $(element)
        this._options  = this._getOptions(options || {})

        setInterval($.proxy(this.update, this), this._options.interval)
    }

    // getters

    DateAgo.Default = Default

    DateAgo.NAME = NAME

    DateAgo.DATA_KEY = DATA_KEY

    DateAgo.prototype.options = function () {
        return this._options
    }

    // public

    /**
     * Update an option directly
     *
     * @param  {String} name
     * @param  {mixed} value
     */
    DateAgo.prototype.option = function (name, value) {
        this._options[name] = value
    }

    DateAgo.humanize = function (miliseconds) {
        var seconds = Math.abs(miliseconds) / 1000
        var minutes = seconds / 60
        var hours = minutes / 60
        var days = hours / 24
        var years = days / 365

        return seconds < 45 && ['seconds', Math.round(seconds)] ||
            seconds < 90 && ['minute', 1] ||
            minutes < 45 && ['minutes', Math.round(minutes)] ||
            minutes < 90 && ['hour', 1] ||
            hours < 24 && ['hours', Math.round(hours)] ||
            hours < 42 && ['day', 1] ||
            days < 30 && ['days', Math.round(days)] ||
            days < 45 && ['month', 1] ||
            days < 365 && ['months', Math.round(days / 30)] ||
            years < 1.5 && ['year', 1] ||
            ['years', Math.round(years)]
    }

    DateAgo.prototype.humanize = function (miliseconds) {
        var text = DateAgo.humanize(miliseconds)
        return this._options[text[0]].replace('%d', text[1])
    }

    DateAgo.prototype.update = function () {
        var date = new Date(this.$element.attr('title'))
        var distance = (new Date().getTime() - date.getTime())

        this.$element.text(this.humanize(distance))
    }

    // private
    // ------------------------------------------------------------------------

    DateAgo.prototype._getOptions = function (options) {
        return $.extend(true, {}, Default, options)
    }

    // static

    DateAgo._jQueryInterface = function (config, a1, a2, a3) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data(DATA_KEY)
            var _config = $.extend(
                true,
                {},
                Default,
                $this.data(),
                typeof config === 'object' && config
            )

            if (!data) {
                data = new DateAgo(this, _config)
                $this.data(DATA_KEY, data)
            }

            if (typeof config === 'string') {
                data[config](a1, a2, a3)
            }
        })
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document)
        .ready(function () {
            $(Selector.WIDGET)[NAME]('update')
        })
        .ajaxComplete(function () {
            $(Selector.WIDGET)[NAME]('update')
        })

    /**
    * ------------------------------------------------------------------------
    * jQuery
    * ------------------------------------------------------------------------
    */

    $.fn[NAME]         = DateAgo._jQueryInterface
    $.fn[NAME].DateAgo = DateAgo

    return DateAgo

})(jQuery)

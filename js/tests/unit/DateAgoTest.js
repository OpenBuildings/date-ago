$(function () {
    'use strict'

    QUnit.test('constructor and options', function (assert) {
        var dateAgo = new DateAgo($('#static'))
        var options = dateAgo.options()
        var dateAgoCustom = new DateAgo($('#static'), { interval: 1000 })

        assert.deepEqual(options, DateAgo.Default)
        assert.deepEqual(1000, dateAgoCustom.options().interval)

        dateAgo.option('interval', 300)
        assert.deepEqual(300, dateAgo.options().interval)
    })

    QUnit.test('events', function (assert) {
        var $element = $('#updated')

        assert.notEqual($element.text(), 'text')

        $element.attr('title', (new Date()).toUTCString())
        $element.text('something')

        $.event.trigger('ajaxComplete')

        assert.equal($element.text(), 'less than a minute ago')
    })

    QUnit.test('methods', function (assert) {
        var $element = $('#static')
        var dateAgo = $element.dateAgo({ interval: 7000 }).data('dateAgo')

        assert.ok(dateAgo instanceof DateAgo)
        assert.equal(7000, dateAgo.options().interval)

        $element.attr('title', (new Date()).toUTCString())
        $element.text('something')

        $element.dateAgo('update')

        assert.equal($element.text(), 'less than a minute ago')
    })

    QUnit.test('static humanize method', function (assert) {
        var seconds = 1000
        var minutes = 60 * seconds
        var hours = 60 * minutes
        var days = 24 * hours
        var months = 30 * days

        assert.deepEqual(DateAgo.humanize(10 * seconds), ['seconds', 10])
        assert.deepEqual(DateAgo.humanize(60 * seconds), ['minute', 1])
        assert.deepEqual(DateAgo.humanize(70 * seconds), ['minute', 1])
        assert.deepEqual(DateAgo.humanize(2 * minutes), ['minutes', 2])
        assert.deepEqual(DateAgo.humanize(8 * minutes), ['minutes', 8])
        assert.deepEqual(DateAgo.humanize(hours), ['hour', 1])
        assert.deepEqual(DateAgo.humanize(3 * hours), ['hours', 3])
        assert.deepEqual(DateAgo.humanize(20 * hours), ['hours', 20])
        assert.deepEqual(DateAgo.humanize(30 * hours), ['day', 1])
        assert.deepEqual(DateAgo.humanize(50 * hours), ['days', 2])
        assert.deepEqual(DateAgo.humanize(5 * days), ['days', 5])
        assert.deepEqual(DateAgo.humanize(30 * days), ['month', 1])
        assert.deepEqual(DateAgo.humanize(35 * days), ['month', 1])
        assert.deepEqual(DateAgo.humanize(50 * days), ['months', 2])
        assert.deepEqual(DateAgo.humanize(15 * months), ['year', 1])
        assert.deepEqual(DateAgo.humanize(20 * months), ['years', 2])
    })

    QUnit.test('humanize method', function (assert) {
        var dateAgo = new DateAgo($('static'))
        var seconds = 1000
        var minutes = 60 * seconds
        var hours = 60 * minutes
        var days = 24 * hours
        var months = 30 * days

        assert.deepEqual(dateAgo.humanize(10 * seconds), 'less than a minute ago')
        assert.deepEqual(dateAgo.humanize(60 * seconds), 'about a minute ago')
        assert.deepEqual(dateAgo.humanize(70 * seconds), 'about a minute ago')
        assert.deepEqual(dateAgo.humanize(2 * minutes), '2 minutes ago')
        assert.deepEqual(dateAgo.humanize(8 * minutes), '8 minutes ago')
        assert.deepEqual(dateAgo.humanize(hours), 'about an hour ago')
        assert.deepEqual(dateAgo.humanize(3 * hours), 'about 3 hours ago')
        assert.deepEqual(dateAgo.humanize(20 * hours), 'about 20 hours ago')
        assert.deepEqual(dateAgo.humanize(30 * hours), 'yesterday')
        assert.deepEqual(dateAgo.humanize(50 * hours), '2 days ago')
        assert.deepEqual(dateAgo.humanize(5 * days), '5 days ago')
        assert.deepEqual(dateAgo.humanize(30 * days), 'about a month ago')
        assert.deepEqual(dateAgo.humanize(35 * days), 'about a month ago')
        assert.deepEqual(dateAgo.humanize(50 * days), '2 months ago')
        assert.deepEqual(dateAgo.humanize(15 * months), 'about a year ago')
        assert.deepEqual(dateAgo.humanize(20 * months), '2 years ago')
    })
})

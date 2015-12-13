Date Ago
========

[![Build Status](https://travis-ci.org/clippings/date-ago.svg?branch=master)](https://travis-ci.org/clippings/date-ago)
[![Dependency Status](https://david-dm.org/clippings/date-ago.svg)](https://david-dm.org/clippings/date-ago)
[![devDependency Status](https://david-dm.org/clippings/date-ago/dev-status.svg)](https://david-dm.org/clippings/date-ago#info=devDependencies)

Display "date ago" dynamically with javascript

## Instalation

Using [jspm](http://jspm.io/):

    jspm install npm:clippings-date-ago

Using npm:

    npm install clippings-date-ago

Manual:

Download [latest release](https://github.com/clippings/date-ago/releases/latest)

``` html
<script type="text/javascript" src="dist/js/date-ago.min.js"></script>
```

Usage
-----

``` html
<span
 title="2015-12-01"
 data-update="date-ago">
    Some text that will be overwritten
</span>
```

This will display a date dynamically based on the offset from current date on the client computer, showing "less than a minute ago, 8 minutes ago etc."

It will update the text every 5 seconds by default.

Default values
--------------

You can change the default values of all the instances by modifying class variables:

``` javascript
DateAgo.Default.interval = 3000 // 3 Seconds
DateAgo.Default.minute = 'maybe a minute' // Shown if its "about a minute"

// All the default values are:
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
```

You can also change these values individually on each div tag with date attribute:

``` html
<span
 title="2015-12-01"
 data-interval="6000"
 data-hour="within the hour"
 data-update="date-ago">
</span>
```

Javascript interface
--------------------

The plugin object is saved as the data-attribute "dateAgo" you can retrieve it and call its methods:

``` javascript
var dateAgo = $('... some selector').data('dateAgo')

// Set option dinamically
dateAgo.option('interval', 50000)

// Get the humanized value for a miliseconds offset
dateAgo.humanize(10800000) // about 3 hours ago

// Force update
dateAgo.update()
```

You can also call the static method "humanize" that will return a template for a given millisecond offset

``` javascript
DateAgo.humanize(10800000) // ['hours', 3]
```

License
-------

Copyright (c) 2015, Clippings Ltd. Developed by Ivan Kerin

Under BSD-3-Clause license, read LICENSE file.

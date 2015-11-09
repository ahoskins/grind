grind
=======

grind is an experiment to allow viewing a spectrum of news and blogs, grouped by sentiment analysis.  The goal is to provide well-rounded consumption of opinions and stances on a particular issue or topic.

This project was done in 36 hours, and was a submission for Hack the North 2015 in Waterloo, Canada.

There is also an agnostic, RESTful backend written in C#, at [grind-back](https://github.com/udeyrishi/grind-back).

Check out the [demo](http://www.grindonline.co) (forgive the slow page load, the Dyno is probably sound asleep :sleeping:)

tech
=====

it's a small web app built with React and Node.  The most interesting part of this project is the UI, because it's a bit unconventional compared to other news consumption web sites.  The concept of the UI is based on a stack -- where articles are being 'popped' off the stack one-by-one, and dropped into one of three sentiment categories: negative, neutral, and positive.

The sentiment analysis itself is happening on the backend, using a pretty snazzy machine learning platform called [indico](https://indico.io/).  The fetching of the articles/blogs is also happening on the backend using [webhose](https://webhose.io/).  The backend exposes these as a RESTful interface.

building locally
=====
    $ cd grind
    $ npm install
    $ node app.js

watch for subsequent changes with:

    $ npm run watch



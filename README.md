# generator-meteor [![Build Status](https://secure.travis-ci.org/Pent/generator-meteor.png?branch=master)](https://travis-ci.org/Pent/generator-meteor)

A [Meteor](http://meteor.com) project generator for [Yeoman](http://yeoman.io).

[![NPM](https://nodei.co/npm/generator-meteor.png)](https://nodei.co/npm/generator-meteor/)

## Prerequisites
* [Meteorite](https://github.com/oortcloud/meteorite)
* [nodejs](http://nodejs.com)
* [yeoman](http://yeoman.io)

To install meteorite from npm, run:

```
$ npm install -g meteorite
```

To install yeoman from npm, run:

```
$ npm install -g yo
```

### The Best Instructions You'll See All Day

To install generator-meteor from npm, run:

```
$ npm install -g generator-meteor
```

Create a new project directory:

```
$ mkdir your-new-project && cd $_
```

Initiate the generator:

```
$ yo meteor
```

Sync the smart.json packages using Meteorite:

```
$ mrt update
```

Finally, run Meteor:

```
$ meteor
```

## *NEW* View and Collection Generators
Generator-Meteor now supports primitive scaffolding using Yeoman sub-generators

To generate a new Meteor Collection, try using:

```
$ yo meteor:collection yourCollectionName
```

To generate a new Meteor Template view/events/helper, try this one out:

```
$ yo meteor:view viewName
```

These generators will be extended over time and I hope you make good use of them!

## Structure Generated with Iron-Router Enabled
```
/
    .meteor/
        .gitignore
        packages
        release
    client/
        compatibility/
        lib/
            subscriptions.js
        styles/
            theme.css
        views/
            common/
            home.html
            home.js
            layout.html
        routes.js
    lib/
        collections.js
    private/
    public/
        fonts/
        images/
        robots.txt
    server/
        publications.js
        security.js
        server.js
    .gitignore <- contains sensible defaults for files/folders to ignore
    LICENSE <- default empty license file
    smart.json <- meteorite package definition
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

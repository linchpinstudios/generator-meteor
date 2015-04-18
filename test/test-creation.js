/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-generator').assert;
var _s      = require('underscore.string');

describe('meteor generator', function () {
  describe('generation of files intact', function() {
    var meteor;
    var expected = [
      'client/client.js',
      'client/lib/subscriptions.js',
      'client/views/home.js',
      'client/views/home.html',
      'client/views/common/loading.html',
      'lib/collections.js',
      'public/robots.txt',
      'server/publications.js',
      'server/server.js',
      'server/security.js',
      '.meteor/.gitignore',
      '.meteor/release',
      '.gitignore',
      '.jshintrc',
      '.travis.yml',
      '.editorconfig',
      'LICENSE',
      'README.md',
      '.meteor/packages',
      'client/views/layout.html',
      'client/routes.js',
      'client/styles/theme.css'
    ];

    var mockPrompts = {
      ironRouter: true,
      bootstrap: true
    };

    var mockOptions = {
      'skip-install': true
    };

    beforeEach(function () {
      meteor = helpers
      .run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, '.tmp'))
      .withGenerators([[helpers.createDummyGenerator(), 'mocha:app']]);
    });

    it('should copy over files', function(done) {
      meteor.withOptions(mockOptions).on('end', function(failures) {
        assert.file(expected);
        done();
      });
    });
  });
});


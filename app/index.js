'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MeteorGenerator = module.exports = function MeteorGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(MeteorGenerator, yeoman.generators.Base);

MeteorGenerator.prototype.welcome = function welcome() {
  // welcome message
  console.log(this.yeoman);
};

MeteorGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'ironRouter',
    message: 'Would you include Iron Router?',
    default: true
  },{
    type: 'confirm',
    name: 'less',
    message: 'Will you be using LESS?',
    default: true
  },{
    type: 'confirm',
    name: 'bs',
    message: 'Would you like to include Bootstrap with LESS?',
    default: true
  }];

  this.prompt(prompts, function (answers) {
    this.ironRouter = answers.ironRouter;
    this.less = answers.less;
    this.bs = answers.bs;
    cb();
  }.bind(this));
};

// generate the basic scaffolding for a Meteor project
MeteorGenerator.prototype.app = function app() {
  this.mkdir('client');
  this.mkdir('client/compatibility');
  this.mkdir('client/styles');
  this.mkdir('client/lib');
  this.mkdir('client/views');
  this.mkdir('lib');
  this.mkdir('server');
  this.mkdir('public');
  this.mkdir('public/fonts');
  this.mkdir('public/images');
  this.mkdir('private');
  this.mkdir('packages');
  this.mkdir('.meteor');

  this.copy('client/client.js', 'client/client.js');
  this.copy('client/lib/subscriptions.js', 'client/lib/subscriptions.js');
  this.copy('client/views/home.js', 'client/views/home.js');
  this.copy('client/views/home.html', 'client/views/home.html');
  this.copy('lib/collections.js', 'lib/collections.js');
  this.copy('public/robots.txt', 'public/robots.txt');
  this.copy('server/publications.js', 'server/publications.js');
  this.copy('server/server.js', 'server/server.js');
  this.copy('server/security.js', 'server/security.js');
  this.copy('.meteor/gitignore', '.meteor/.gitignore');
  this.copy('.meteor/release', '.meteor/release');
  this.copy('gitignore', '.gitignore');
  this.copy('LICENSE', 'LICENSE');
  this.copy('README.md', 'README.md');
};

var packages = [
  'standard-app-packages',
  'accounts-base',
  'accounts-password'
];

var smartPackages = {
  "meteor": {
    "git": "https://github.com/meteor/meteor.git",
    "branch": "master"
  },
  "packages": {
  }
};

MeteorGenerator.prototype.addRouter = function addRouter() {
  if(this.ironRouter) {
    this.copy('client/routes.js', 'client/routes.js');
    this.copy('iron-router/layout.html', 'client/views/layout.html');
    packages.push('iron-router');
    smartPackages.packages["iron-router"] = {};
  } else {
    this.copy('client/views/layout.html', 'client/views/layout.html');
  }
};

MeteorGenerator.prototype.addLess = function addLess() {
  if(this.less) {
    this.copy('client/styles/theme.css', 'client/styles/theme.less');
    packages.push('less');
  } else {
    this.copy('client/styles/theme.css', 'client/styles/theme.css');
  }
};

MeteorGenerator.prototype.addBs = function addBs() {
  if(this.bs) {
    packages.push('bootstrap3-less');
    smartPackages.packages["bootstrap3-less"] = {};
  }
};

MeteorGenerator.prototype.done = function done() {
  this.write('.meteor/packages', packages.join('\n'));
  this.write('smart.json', JSON.stringify(smartPackages, null, 2));
}
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

//construct generator
var Generator = module.exports = function Generator(args, options) {
  //retrieve additional arguments, inheritance in js???!
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', {type: String, required: false});
  //set appname from argument-defined appname or get the path
  this.appname = this.appname || path.basename(process.cwd());
  //clean appname up to use as a variable
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
  // welcome message
  console.log(this.yeoman);
};

Generator.prototype.askFor = function askFor() {
  var cb = this.async(),
    prompts = [{
      type: 'confirm',
      name: 'ironRouter',
      message: 'Shall we include Iron Router?',
      default: true
    }, {
      type: 'confirm',
      name: 'bootstrap',
      message: 'Shall we include Bootstrap?',
      default: true
    }];

  this.prompt(prompts, function (answers) {
    this.ironRouter = answers.ironRouter;
    this.bootstrap = answers.bootstrap;
    cb();
  }.bind(this));
};

// generate the basic scaffolding for a Meteor project
Generator.prototype.app = function app() {
  this.mkdir('client');
  this.mkdir('client/compatibility');
  this.mkdir('client/styles');
  this.mkdir('client/lib');
  this.mkdir('client/views');
  this.mkdir('client/views/common');
  this.mkdir('lib');
  this.mkdir('server');
  this.mkdir('server/lib');
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
  this.copy('client/views/common/loading.html', 'client/views/common/loading.html');
  this.copy('lib/collections.js', 'lib/collections.js');
  this.copy('public/robots.txt', 'public/robots.txt');
  this.copy('server/publications.js', 'server/publications.js');
  this.copy('server/server.js', 'server/server.js');
  this.copy('server/security.js', 'server/security.js');
  this.copy('.meteor/gitignore', '.meteor/.gitignore');
  this.copy('.meteor/release', '.meteor/release');
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');
  this.copy('travis', '.travis.yml');
  this.copy('editorconfig', '.editorconfig');
  this.copy('LICENSE', 'LICENSE');
  this.copy('README.md', 'README.md');
};

var packages = [
  'standard-app-packages'
];

var smartPackages = {
  "packages": {}
};

Generator.prototype.addRouter = function addRouter() {
  if (this.ironRouter) {
    this.copy('client/routes.js', 'client/routes.js');
    this.copy('iron-router/layout.html', 'client/views/layout.html');
    packages.push('iron:router');
  } else {
    this.copy('client/views/layout.html', 'client/views/layout.html');
  }
};

Generator.prototype.addBootstrap = function addBootstrap() {
  if (this.bootstrap) {
    packages.push('bootstrap');
  }
  this.copy('client/styles/theme.css', 'client/styles/theme.css');
};

Generator.prototype.done = function done() {
  this.write('.meteor/packages', packages.join('\n'));
  this.write('smart.json', JSON.stringify(smartPackages, null, 2));
};

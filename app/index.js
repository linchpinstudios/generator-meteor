'use strict';
var util = require('util');
var path = require('path');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

//construct generator
var Generator = module.exports = function Generator(args, options) {
  //retrieve additional arguments, inheritance in js???!
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', {type: String, required: false});
  //set appname from argument-defined appname or get the path
  this.appname = this.appname || path.basename(process.cwd());
  //clean appname up to use as a variable
  this.appname = _s(this.appname).camelize().slugify().humanize();
  this.packages = [
    'standard-app-packages'
  ];
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
  // welcome message
  if (!this.options['skip-welcome-message']) {
    this.log(yosay());
  }
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
  mkdirp('client/compatibility');
  mkdirp('client/styles');
  mkdirp('client/lib');
  mkdirp('client/views/common');
  mkdirp('lib');
  mkdirp('server/lib');
  mkdirp('public/fonts');
  mkdirp('public/images');
  mkdirp('private');
  mkdirp('.meteor');

  this.copy('client/client.js', 'client/client.js');
  this.copy('client/lib/subscriptions.js', 'client/lib/subscriptions.js');
  this.copy('client/views/home/home.js', 'client/views/home/home.js');
  this.copy('client/views/home/home.jade', 'client/views/home/home.jade');
  this.copy('client/views/home/home.scss', 'client/views/home/home.scss');
  this.copy('client/views/common/loading.jade', 'client/views/common/loading.jade');
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

Generator.prototype.addRouter = function addRouter() {
  if (this.ironRouter) {
    this.copy('client/routes.js', 'client/routes.js');
    this.copy('iron-router/layout.jade', 'client/views/layout.jade');
    this.packages.push('iron:router');
  } else {
    this.copy('client/views/layout.jade', 'client/views/layout.jade');
  }
};

Generator.prototype.addBootstrap = function addBootstrap() {
  if (this.bootstrap) {
    this.packages.push('twbs:bootstrap');
  }
  this.copy('client/styles/theme.scss', 'client/styles/theme.scss');
  this.copy('client/styles/_variables.scss', 'client/styles/_variables.scss');
  this.copy('client/styles/partials/_buttons.scss', 'client/styles/partials/_buttons.scss');
  this.copy('client/styles/partials/_fonts.scss', 'client/styles/partials/_fonts.scss');
  this.copy('client/styles/partials/_icons.scss', 'client/styles/partials/_icons.scss');
  this.copy('client/styles/partials/_inputs.scss', 'client/styles/partials/_inputs.scss');
  this.copy('client/styles/partials/_layout.scss', 'client/styles/partials/_layout.scss');
  this.copy('client/styles/partials/_list.scss', 'client/styles/partials/_list.scss');
  this.copy('client/styles/partials/_mixins.scss', 'client/styles/partials/_mixins.scss');
  this.copy('client/styles/partials/_type.scss', 'client/styles/partials/_type.scss');
  this.copy('client/styles/partials/_visibility.scss', 'client/styles/partials/_visibility.scss');
};

Generator.prototype.done = function done() {
  this.write('.meteor/packages', this.packages.join('\n'));
};

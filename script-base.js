'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.classyName = _s(this.name).classify();
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.writeTemplate = function writeTemplate(source, destination) {
  yeoman.generators.Base.prototype.template.apply(this, [source, destination]);
};

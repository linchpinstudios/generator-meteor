'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.classyName = this._.classify(this.name);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.writeTemplate = function writeTemplate(source, destination) {
  yeoman.generators.Base.prototype.template.apply(this, [source, destination]);
};

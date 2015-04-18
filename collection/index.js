'use strict'
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  scriptBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));
};

util.inherits(Generator, scriptBase);

Generator.prototype.createCollectionEntries = function createCollectionEntries() {
  //todo add collection entries to end of file
  this.writeTemplate('client/lib/subscriptions.js', path.join('client/lib/', this.name + '.js'));
  this.writeTemplate('lib/collections.js', path.join('lib/', this.name + '.js'));
  this.writeTemplate('server/publications.js', path.join('server/', this.name + '.js'));
};

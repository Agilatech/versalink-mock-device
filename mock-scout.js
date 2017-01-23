
const options = require('./options');

const Scout = require('zetta-scout');
const mock = require('./mock');
const util = require('util');

const MockScout = module.exports = function(opts) {
    
  // see if any of the options were overridden in the server

  if (typeof opts !== 'undefined') {
    // copy all options defined in the server
    for (const key in opts) {
      if (typeof opts[key] !== 'undefined') {
        options[key] = opts[key];
      }
    }
  }

  Scout.call(this);
};

util.inherits(MockScout, Scout);

MockScout.prototype.init = function(next) {

  const Mock = new mock(options);

  const query = this.server.where({name: 'MOCK'});
  
  const self = this;
  this.server.find(query, function(err, results) {
    if (results[0]) {
      self.provision(results[0], Mock, options);
      self.server.info('Provisioned known device MOCK');
    } else {
      self.discover(Mock, options);
      self.server.info('Discovered new device MOCK');
    }
  });

  next();

};

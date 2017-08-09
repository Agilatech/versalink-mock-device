
const options = require('./options');

const Scout = require('zetta-scout');
const Mock = require('./mock');

module.exports = class MockScout extends Scout {

  constructor(opts) {

    super();

    if (typeof opts !== 'undefined') {
      // copy all options defined in the server
      for (const key in opts) {
        if (typeof opts[key] !== 'undefined') {
          options[key] = opts[key];
        }
      }
    }

    if (options.name === undefined) { options.name = "MOCK" }
    this.name = options.name;

    this.mock = new Mock(options);

  }

  init(next) {
    const query = this.server.where({name: this.name});
  
    const self = this;

    this.server.find(query, function(err, results) {
      if (!err) {
        if (results[0]) {
          self.provision(results[0], self.mock);
          self.server.info('Provisioned known device ' + self.name);
        } else {
          self.discover(self.mock);
          self.server.info('Discovered new device ' + self.name);
        }
      }
      else {
        self.server.error(err);
      }
    });

    next();
  }

}
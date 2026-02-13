const autoBind = require('auto-bind-js');

module.exports = class controller {
  constructor() {
    autoBind(this);
  }
};

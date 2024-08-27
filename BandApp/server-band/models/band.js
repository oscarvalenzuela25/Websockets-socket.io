const uuid = require('uuid');

class Band {
  constructor(name) {
    this.id = uuid.v4();
    this.name = name;
    this.votes = 0;
  }
}

module.exports = Band;

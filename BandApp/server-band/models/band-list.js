const Band = require('./band');

class BandList {
  constructor() {
    this.bands = [
      new Band('Metallica'),
      new Band('Queen'),
      new Band('Bon Jovi'),
      new Band('Heroes del Silencio'),
    ];
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }

  removeBand(bandId) {
    this.bands = this.bands.filter(band => band.id !== bandId);
  }

  getBands() {
    return this.bands;
  }

  increaseVote(bandId) {
    this.bands = this.bands.map(band => {
      if (band.id === bandId) {
        band.votes += 1;
        return band;
      }
      return band;
    });
  }

  changeBandName(bandId, bandName) {
    this.bands = this.bands.map(band => {
      if (band.id === bandId) {
        band.name = bandName;
        return band;
      }
      return band;
    });
  }
}

module.exports = BandList;

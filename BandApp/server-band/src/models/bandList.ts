import Band from './band';

class BandList {
  private bands: Band[];

  constructor() {
    this.bands = [
      new Band('Metallica'),
      new Band('Queen'),
      new Band('Bon Jovi'),
      new Band('Heroes del Silencio'),
    ];
  }

  addBand(name: string) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }

  removeBand(bandId: string) {
    this.bands = this.bands.filter(band => band.id !== bandId);
  }

  getBands() {
    return this.bands;
  }

  increaseVote(bandId: string) {
    this.bands = this.bands.map(band => {
      if (band.id === bandId) {
        band.votes += 1;
        return band;
      }
      return band;
    });
  }

  changeBandName(bandId: string, bandName: string) {
    this.bands = this.bands.map(band => {
      if (band.id === bandId) {
        band.name = bandName;
        return band;
      }
      return band;
    });
  }
}

export default BandList;

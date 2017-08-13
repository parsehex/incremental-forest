import config from '../config';

export default function createMap(map) {
  // map is a 1D array of map tiles
  // each tile is an array containing refs to objects on that tile
  this.map = [];

  const len = config.mapHeight * config.mapWidth;
  for (let i = 0; i < len; i++) {
    this.map[i] = [];
  }
}

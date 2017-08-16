import devtools from './devtools';

export default {
  gameWidth: 480,
  gameHeight: 352,
  mapWidth: devtools.enabled && devtools.testMap ? devtools.testMapSize[0] : 30,
  mapHeight: devtools.enabled && devtools.testMap ? devtools.testMapSize[1] : 30,
  tileWidth: 32,
  tileHeight: 32,
};

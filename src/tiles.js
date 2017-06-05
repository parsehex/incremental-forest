import { nextCoord } from './utils';

export function tile() {
  return pixelToTile({
    x: this.x,
    y: this.y,
  });
}

export function nextTile(tile, faceDirection) {
  tile = tile || this.tile;
  faceDirection = faceDirection || this.faceDirection;

  return nextCoord(tile, faceDirection, 1);
}

export function pixelToTile(pixelCoord) {
  return {
    x: Math.floor(pixelCoord.x / 32),
    y: Math.floor(pixelCoord.y / 32),
  };
}

export function tileToPixel(tileCoord) {
  return {
    x: (tileCoord.x * 32) + 16,
    y: (tileCoord.y * 32) + 16,
  };
}

export function alignToGrid(pixelCoord) {
  if (pixelCoord.x % 16 === 0 && pixelCoord.y % 16 === 0) return pixelCoord;

  // perhaps not the most efficient way to do this
  return tileToPixel(pixelToTile(pixelCoord));
}

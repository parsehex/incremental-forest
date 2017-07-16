export function pixelToTile(pixX, pixY) {
  return {
    x: Math.floor(pixX / 32),
    y: Math.floor(pixY / 32),
  };
}

export function tileToPixel(tileX, tileY) {
  return {
    x: (tileX * 32) + 16,
    y: (tileY * 32) + 16,
  };
}

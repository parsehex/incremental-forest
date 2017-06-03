export function alignToGrid(pixelCoord) {
  if (pixelCoord.x % 16 === 0 && pixelCoord.y % 16 === 0) return pixelCoord;

  // perhaps not the most efficient way to do this
  return tileToPixel(pixelToTile(pixelCoord));
}

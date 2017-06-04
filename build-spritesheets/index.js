const Jimp    = require("jimp");
const fs      = require('fs');
const path    = require('path');
const spritesheets = require('./spritesheets.json');

const pathPrefix = '../assets';

function processArgs() {
  // make a list of any arguments passed to command
  const args = [];
  for (let i = 2; i < process.argv.length; i++) {
    args.push(process.argv[i]);
  }

  // if no args passed just build all spritesheets
  if (args.length === 0) return;

  // remove spritesheets not specified in args
  for (let i = spritesheets.length - 1; i >= 0; i--) {
    if (!args.includes(spritesheets[i].name)) {
      spritesheets.splice(i, 1);
    }
  }
}

// loop through each spritesheet specified in json
for (let i = 0; i < spritesheets.length; i++) {
  const { name, sprites } = spritesheets[i];

  // spritesheet should as wide as (number of sprites * 32px)
  const width  = sprites.length * 32;
  const height = 32;

  // create a new image for this spritesheet
  new Jimp(width, height, function (err, spritesheet) {
    const promises = [];

    // loop through sprites
    for (let i = 0; i < sprites.length; i++) {
      // read sprite at specified file, call concat once read to composite into spritesheet
      let spritePath = path.join(__dirname, pathPrefix, sprites[i]);
      promises.push(
        Jimp.read(spritePath).then(concat.bind(null, i, spritesheet))
      );
    }

    // once all sprites are composited to the spritesheet, write the spritesheet image to disk
    Promise.all(promises).then(function() {
      spritesheet.write(path.join(__dirname, pathPrefix, '/spritesheets/', name + '.png'));
    })
  });
}

function concat(i, spritesheet, sprite) {
  // composite (concat) the sprite to the spritesheet
  spritesheet.composite(sprite, i * 32, 0);
}

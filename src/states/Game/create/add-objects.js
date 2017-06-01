import frames from '../../../sprite-frames';
import { centerOfObject } from '../../../utils';

import Tree from '../../../sprites/Tree';
import Generator from '../../../sprites/Generator';

export default function addObjects() {
  this.objects = {
    trees: [],
    generators: [],
  };

  trees.call(this);
  generators.call(this);
}

function trees() {
  const treesArr = this.map.objects.trees;
  for (let i = 0, len = treesArr.length; i < len; i++) {
    const treeStart = centerOfObject(treesArr[i], this.map);

    const tree = new Tree({
      game: this.game,
      x: treeStart.x,
      y: treeStart.y,
    });

    this.objects.trees.push(tree);

    this.game.add.existing(tree);
  }
}
function generators() {
  const genArr = this.map.objects.generators;
  for (let i = 0, len = genArr.length; i < len; i++) {
    const genStart = centerOfObject(genArr[i], this.map);

    const generator = new Generator({
      game: this.game,
      x: genStart.x,
      y: genStart.y,
    });

    this.objects.generators.push(generator);

    this.game.add.existing(generator);
  }
}

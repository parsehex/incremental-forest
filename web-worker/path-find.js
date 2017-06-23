const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
function convertPath(path) {
  for (let i = 0; i < path.length; i++) {
    path[i] = directions[path[i]];
  }
  return path;
}

let firstRun = true;
onmessage = function(event) {
  // expect posted message data to be in a certain format
  if (!Array.isArray(event.data)) throw new Error('pass an array to worker');

  let timing = true;

  let now;
  if (timing) now = performance.now();

  let path = findPath(event.data);
  if (path) path.path = convertPath(path.path);

  postMessage(path);

  if (timing) console.log(performance.now() - now);
}

function shuffle(array) {
  // https://stackoverflow.com/a/2450976
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function findPath(data) {
  const fastMap =           data[0],
        fastObjects =       data[1],
        collidableObjects = data[2];

  const mapWidth =          data[3],
        mapHeight =         data[4];

  let queue =             [],
      checkedTiles =      [],
      start =             data[5],
      target =            data[6],
      random =            data[7];

  if (typeof target === 'string') {
    target = [target];
  }

  const targetIsArray = Array.isArray(target);

  if (targetIsArray) {
    let includes = false;
    for (let i = 0; i < target.length; i++) {
      if (fastObjects.includes(target[i])) {
        includes = true;
        break;
      }
    }

    if (!includes) return;
  }

  const startLocation = {
    x: start.x,
    y: start.y,
    path: [],
    walkable: true,
  };

  queue.push(startLocation);

  checkedTiles.push(startLocation.x + ',' + startLocation.y);

  while (queue.length) {
    let item = queue[0];

    const directions = random ? shuffle([0, 2, 1, 3]) : [0, 1, 2, 3];

    for (let i = 0; i < directions.length; i++) {
      const direction = processDirection(item, directions[i]);
      if (direction) return direction;
    }

    // remove first item in queue
    queue.shift();
  }

  function processDirection(location, direction) {
    const result = checkDirection(location, direction);

    const coordName = result.x + ',' + result.y;

    // don't want to check the same tile twice
    if (checkedTiles.includes(coordName)) return;

    // add the resulting tile to checkedTiles
    checkedTiles.push(coordName);

    // result is out of bounds
    if (result.outOfBounds) return;

    let isTarget = false;
    if (targetIsArray) {
      isTarget = checkTargetType(result, target);
    } else if (target === null) {
      isTarget = checkTargetEmpty(result);
    } else {
      isTarget = checkTargetLocation(result);
    }

    if (isTarget) {
      // result is the target
      return result;
    } else if (result.walkable) {
      // result isn't target but is still walkable; add to queue to check
      queue.push(result);
    }
  }

  function checkTargetType(location, targetTypes) {
    const mapTile = fastMap[location.y][location.x];

    if (mapTile.length === 0) return false;

    for (let i = 0; i < targetTypes.length; i++) {
      if (mapTile.includes(targetTypes[i])) {
        return true;
      }
    }
  }

  function checkTargetEmpty(location) {
    return fastMap[location.y][location.x].length === 0;
  }

  function checkTargetLocation(location) {
    if (location.x === target.x && location.y === target.y) return true;

    return false;
  }

  function checkDirection(location, direction) {
    // manually clone location object
    location = {
      x: location.x,
      y: location.y,
      path: location.path.slice(), // clones location.path (quicker than JSON.parse+stringify)
      walkable: location.walkable,
    };

    location.path.push(direction);

    location.walkable = true;

    // update location coords based on direction
    nextCoord(location, direction);
    const { x, y } = location;

    if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) {
      location.outOfBounds = true;
      return location;
    }

    const mapTile = fastMap[y][x];

    for (let i = 0; i < collidableObjects.length; i++) {
      if (mapTile.includes(collidableObjects[i])) {
        location.walkable = false;
        break;
      }
    }

    return location;
  }
}

// utility function dependencies
function nextCoord(coord, direction) {
  if (direction === 0) {
    coord.y = coord.y - 1;
  } else if (direction === 1) {
    coord.y = coord.y + 1;
  } else if (direction === 2) {
    coord.x = coord.x - 1;
  } else if (direction === 3) {
    coord.x = coord.x + 1;
  }
}

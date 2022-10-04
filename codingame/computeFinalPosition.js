function computeFinalPosition(width, height, position, portalA, portalB, moves) {
  // Write your code here
  // To debug: console.error('Debug messages...');
  let x = position[0];
  let y = position[1];

  for (let moveAction of moves) {
      if ((moveAction === 'U') && (y - 1 >= 0)) {
          y -= 1;
      }

      if ((moveAction === 'D') && (y + 1 < height)) {
          y += 1;
      }

      if ((moveAction === 'R') && (x + 1 < width)) {
          x += 1;
      }

      if ((moveAction === 'L') && (x - 1 >= 0)) {
          x -= 1;
      }

      if ((x === portalA[0]) && (y == portalA[1])) {
          x = portalB[0];
          y = portalB[1];
      } else if ((x === portalB[0]) && (y == portalB[1])) {
          x = portalA[0];
          y = portalA[1];
      }
  }

  return [x, y];
}

/* Ignore and do not change the code below */
// #region main
const width = parseInt(readline());
const height = parseInt(readline());
const moves = readline();
const position = readline().split(' ').map(j => parseInt(j));
const portalA = readline().split(' ').map(j => parseInt(j));
const portalB = readline().split(' ').map(j => parseInt(j));
const oldWrite = process.stdout.write;
process.stdout.write = chunk => { console.error(chunk); return true }
const finalPosition = computeFinalPosition(width, height, position, portalA, portalB, moves);
process.stdout.write = oldWrite;
for (let i = 0; i < 2; i++) {
  console.log(finalPosition[i]);
}
// #endregion

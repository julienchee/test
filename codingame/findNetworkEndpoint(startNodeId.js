function findNetworkEndpoint(startNodeId, fromIds, toIds) {
  // Write your code here
  // To debug: console.error('Debug messages...');
  let finalNodeId = startNodeId;
  let nRepeated = 0;
  let traveledIds = [];

  do {
    traveledIds.push(finalNodeId);
    indexOfFinalNodeId = fromIds.indexOf(finalNodeId);

    if (indexOfFinalNodeId !== -1) {
      nextNodeId = toIds[indexOfFinalNodeId];

      if (traveledIds.includes(nextNodeId)) {
        break;
      }

      finalNodeId = nextNodeId;
    } else {
      break;
    }

    nRepeated++;
  } while (nRepeated <= fromIds.length);

  return finalNodeId;
}

/* Ignore and do not change the code below */
// #region main
const startNodeId = parseInt(readline());
const n = parseInt(readline());
const fromIds = readline().split(' ').map(j => parseInt(j)).slice(0, n);
const toIds = readline().split(' ').map(j => parseInt(j)).slice(0, n);
const oldWrite = process.stdout.write;
process.stdout.write = chunk => { console.error(chunk); return true }
const endPointId = findNetworkEndpoint(startNodeId, fromIds, toIds);
process.stdout.write = oldWrite;
console.log(endPointId);
// #endregion

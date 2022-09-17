function createCells(size) {
  const cells = [];
  let i = 0;
  for (let j = 0; j < size; j++) {
    for (let k = 0; k < size; k++) {
      cells.push([j, k, ++i]);
    }
  }

  return cells;
}

export default createCells;

function shuffleCells(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const [row1, column1, value1] = array[i];
    const [row2, column2, value2] = array[j];
    array[i] = [row1, column1, value2];
    array[j] = [row2, column2, value1];
  }
}

export default shuffleCells;

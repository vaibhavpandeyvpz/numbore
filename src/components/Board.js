import { useEffect, useState } from "react";
import createCells from "../utilities/createCells";
import shuffleCells from "../utilities/shuffleCells";

function Board({ size = 3 }) {
  const [cells, setCells] = useState([]);
  const [max, setMax] = useState(1);
  const [isFinished, setFinished] = useState(false);

  const checkIfFinished = () => {
    let i = 1;
    for (let j = 0; j < cells.length; j++) {
      const [, , value] = cells[j];
      if (value !== i++) return;
    }

    setFinished(true);
  };

  const resetBoard = () => {
    const cells = createCells(size);
    shuffleCells(cells);
    setCells(cells);
    setFinished(false);
  };

  const swapCurrentWithMax = (i) => {
    const swapped = cells.map(([row, column, value]) => {
      if (value === i) {
        return [row, column, max];
      } else if (value === max) {
        return [row, column, i];
      }

      return [row, column, value];
    });

    setCells(swapped);
    checkIfFinished();
  };

  const handleCellClick = (e, i) => {
    e.preventDefault();
    // current
    const [row1, column1] = cells.find(([_, __, value]) => value === i);
    // max
    const [row2, column2] = cells.find(([_, __, value]) => value === max);
    // if we can go up
    if (row1 > 0) {
      const canGoUp = row2 === row1 - 1 && column1 === column2;
      if (canGoUp) {
        swapCurrentWithMax(i);
        return;
      }
    }

    // if we can go down
    if (row1 < max - 1) {
      const canGoDown = row2 === row1 + 1 && column1 === column2;
      if (canGoDown) {
        swapCurrentWithMax(i);
        return;
      }
    }

    // if we can go left
    if (column1 > 0) {
      const canGoLeft = column2 === column1 - 1 && row1 === row2;
      if (canGoLeft) {
        swapCurrentWithMax(i);
        return;
      }
    }

    // if we can go right
    if (column1 < max - 1) {
      const canGoRight = column2 === column1 + 1 && row1 === row2;
      if (canGoRight) {
        swapCurrentWithMax(i);
      }
    }
  };

  const handleRestartClick = (e) => {
    e.preventDefault();
    resetBoard();
  };

  useEffect(() => {
    resetBoard();
    setMax(size * size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const chunks = [];
  for (let i = 0; i < cells.length; i += size) {
    const chunk = cells.slice(i, i + size);
    chunks.push(chunk);
  }

  return (
    <>
      <table cellPadding={0} cellSpacing={0}>
        <tbody>
          {chunks.map((columns) => (
            <tr>
              {columns.map(([_, __, value]) => (
                <td>
                  <button
                    disabled={value === max}
                    onClick={(e) => handleCellClick(e, value)}
                  >
                    {value === max ? "-" : value}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isFinished && (
        <p>
          You won the f**king game!{" "}
          <a href="/" onClick={(e) => handleRestartClick(e)}>
            Restart?
          </a>
        </p>
      )}
    </>
  );
}

export default Board;

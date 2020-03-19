import React, { useState } from 'react';
import ReactDom from 'react-dom';
import styles from './index.scss';

function FunButton(props) {
  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        className={props.buttonStyle}
        onClick={props.onClick}
      >
        <div>click me</div>
      </button>
    </div>
  );
}

function Board(props) {
  function buttons(i) {
    return (
      <FunButton
        key={`ReactAskMeToGiveItAKey ${i}`}
        onClick={() => props.Click(i)}
        buttonStyle={props.buttonArray[i]}
      />
    );
  }

  const { arrayNumber } = props;

  function buttonClusters(number) {
    const button = [];

    for (let i = 0; i < number; i += 1) {
      button.push(buttons(i));
    }

    return button;
  }

  return (
    <div className={styles.buttonBoard}>
      {buttonClusters(arrayNumber)}
    </div>
  );
}

function App() {
  const [arrayNumber, setArrayNumber] = useState(1);
  // Use array to record changing of button states
  const [buttonArray, setButtonArray] = useState(Array(arrayNumber).fill(styles.buttonUnclick));

  function Click(i) {
    // Distinguish button states between "clicked" and "Unclick"
    const buttonArrayCopy = buttonArray.slice();
    buttonArrayCopy[i] === styles.buttonUnclick
      ? buttonArrayCopy[i] = styles.buttonClicked
      : buttonArrayCopy[i] = styles.buttonUnclick;
    setButtonArray(buttonArrayCopy);
  }

  function Reset() {
    setButtonArray(Array(arrayNumber).fill(styles.buttonUnclick));
  }

  function Allset() {
    setButtonArray(Array(arrayNumber).fill(styles.buttonClicked));
  }

  function add() {
    // add new item to buttonArray
    const buttonArrayCopy = buttonArray.slice();
    buttonArrayCopy.push(styles.buttonUnclick);
    setButtonArray(buttonArrayCopy);

    // increase array length after reset
    let arrayNumberCopy = arrayNumber;
    arrayNumberCopy += 1;
    setArrayNumber(arrayNumberCopy);
  }

  function deleteButton() {
    if (arrayNumber > 0) {
    // delete last item from buttonArray
      const buttonArrayCopy = buttonArray.slice();
      buttonArrayCopy.pop();
      setButtonArray(buttonArrayCopy);

      // decrease array length after reset
      let arrayNumberCopy = arrayNumber;
      arrayNumberCopy -= 1;
      setArrayNumber(arrayNumberCopy);
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleButton}>
        <div className={styles.titleButtonSet}>
          <button
            type="button"
            className={`${styles.addButton} ${styles.fnButton}`}
            onClick={add}
          >
            Add
          </button>
        </div>
        <div className={styles.titleButtonSet}>
          <button
            type="button"
            className={`${styles.resetButton} ${styles.fnButton}`}
            onClick={Reset}
          >
            Reset
          </button>
        </div>
        <div className={styles.titleButtonSet}>
          <button
            type="button"
            className={`${styles.allSetButton} ${styles.fnButton}`}
            onClick={Allset}
          >
            All set
          </button>
        </div>
        <div className={styles.titleButtonSet}>
          <button
            type="button"
            className={`${styles.deleteButton} ${styles.fnButton}`}
            onClick={deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
      <Board
        buttonArray={buttonArray}
        Click={Click}
        arrayNumber={arrayNumber}
      />
    </div>
  );
}

ReactDom.render(
  <App />,
  document.getElementById('root'),
);

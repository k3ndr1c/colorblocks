import React, { useState } from 'react';
import './App.css';
import ColorBlock from '../ColorBlock';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export default function App() {

  function shuffleArray(arr) {
    let a = [...arr];
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
  function getArray() {
    const array = [40, 50, 60, 70, 80, 90, 100]
    const arr = array.map((item, index) => ({
      id: `item-${index}`,
      value: `${item}`,
    }));

    return shuffleArray(arr);
  }

  const [correct, setCorrect] = useState(null);
  const [hue, setHue] = useState(Math.floor(Math.random() * 360));
  const [saturationArray, setSaturationArray] = useState(getArray());

  function getListStyle() {
    return {
      display: 'flex',
      alignItems: 'center',
      padding: 16,
      overflow: 'visible',
      borderColor: 'azure',
    };
  }

  function handleCheckCorrect() {
    for (let i = 0; i < saturationArray.length - 1; i++) {
      if (saturationArray[i] > saturationArray[i+1]) {
        setCorrect(false);
        return;
      }
    }
    setCorrect(true);
  }

  function getValue(val) {
    return (val / 10) - 4;
  }

  function newGame() {
    setCorrect(null);
    setHue(Math.floor(Math.random() * 360));
    setSaturationArray(getArray());
  }
  
  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result) {

    if (!result.destination) {
      return;
    }

    const items = reorder(
      saturationArray,
      result.source.index,
      result.destination.index
    );

    setSaturationArray(items);
  }


  return (
    <div className="container">
      <h1>
        Colorblocks
      </h1>
      <div className="instructions">
        Order the colors by value from darkest to lightest shade.
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div 
              ref={provided.innerRef}
              style={getListStyle()}
              {...provided.droppableProps}
            >
              {saturationArray.map((item, index) => (
                <ColorBlock
                  item={item}
                  index={index}
                  hue={hue}
                >
                  {correct != null ? getValue(item.value) : null}
                </ColorBlock>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div
        onClick={handleCheckCorrect}
        className="button"
      >
        Show
      </div>
      <div
        onClick={newGame}
        className="button"
      >
        New Game
      </div>
    </div>
  );
}

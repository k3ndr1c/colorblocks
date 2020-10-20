import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


export default function ColorBlock({ hue, item, index, children }) {

  function getBlockStyle(saturation, draggableStyle) {
    return {
      backgroundColor: `hsl(${hue}, ${saturation}%, 50%)`,
      height: '50px',
      width: '50px',
      display: 'flex',
      userSelect: 'none',
      padding: 16,
      margin: '0 16px 0 0',
      ...draggableStyle,
    }
  }
  
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getBlockStyle(
            item.value,
            provided.draggableProps.style
            )}
        >
          { children }
        </div>
      )}
    </Draggable>
  )
}
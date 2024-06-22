import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const SortableList = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    { id: 4, text: "Item 4" },
    { id: 5, text: "Item 5" },
    { id: 6, text: "Item 6" },
    { id: 7, text: "Item 7" },
    { id: 8, text: "Item 8" },
    { id: 9, text: "Item 9" },
    { id: 10, text: "Item 10" },
  ]);

  const DraggableItem = ({ item, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "ITEM",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: "ITEM",
      hover: (draggedItem) => {
        const dragIndex = draggedItem.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        moveItem(dragIndex, hoverIndex);
        draggedItem.index = hoverIndex;
      },
    });

    const moveItem = (dragIndex, hoverIndex) => {
      const draggedItem = items[dragIndex];
      const updatedItems = [...items];
      updatedItems.splice(dragIndex, 1);
      updatedItems.splice(hoverIndex, 0, draggedItem);
      setItems(updatedItems);
    };

    return (
      <div ref={drop}>
        <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            backgroundColor: "#f0f0f0",
            padding: "10px",
            marginBottom: "5px",
            cursor: "move",
          }}>
          {item.text}
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ textAlign: "center" }}>
        <h1>React Drag & Drop</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "300px",
              border: "1px solid #ccc",
              padding: "10px",
            }}>
            {items.map((item, index) => (
              <DraggableItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default SortableList;

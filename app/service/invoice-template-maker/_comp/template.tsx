import React, { useState, useRef } from 'react';

interface Item {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

const demoItems: Item[] = [
  { id: '1', description: 'Web Development Services', quantity: 10, unitPrice: 50.0 },
  { id: '2', description: 'Graphic Design Services', quantity: 5, unitPrice: 30.0 },
  { id: '3', description: 'Monthly Hosting Fee', quantity: 1, unitPrice: 100.0 },
];

const DraggableTable: React.FC = () => {
  const [items, setItems] = useState<Item[]>(demoItems);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null); // To track the currently dragged item
  const draggedItemRef = useRef<Item | null>(null);

  const handleDragStart = (e: React.DragEvent, item: Item, index: number) => {
    draggedItemRef.current = item;
    setDraggingIndex(index); // Set the index of the dragged item
    e.dataTransfer.effectAllowed = 'move'; // Allows moving the item
    e.dataTransfer.setData('text/plain', item.id); // Storing item ID in transfer data
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Prevent default to allow drop
  };

  const handleDrop = (e: React.DragEvent, targetItem: Item, targetIndex: number) => {
    e.preventDefault();

    const draggedItem = draggedItemRef.current;
    if (draggedItem && draggedItem.id !== targetItem.id) {
      const newItems = [...items];
      const draggedIndex = newItems.findIndex((item) => item.id === draggedItem.id);
      const targetIndex = newItems.findIndex((item) => item.id === targetItem.id);

      // Remove the dragged item from its original position
      newItems.splice(draggedIndex, 1);

      // Insert the dragged item at the target position
      newItems.splice(targetIndex, 0, draggedItem);

      // Update the state to reflect the new order
      setItems(newItems);
      setDraggingIndex(null); // Reset the dragged item after drop
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      {/* Invoice Header with Logo and Details */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Invoice Logo */}
          <img 
            src="https://via.placeholder.com/100" // Replace with your logo URL
            alt="Invoice Logo"
            style={{ width: '100px', height: 'auto' }}
          />
          {/* Invoice Details (Number and Date) */}
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ margin: 0 }}>Invoice #123456</h2>
            <p style={{ margin: 0 }}>Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Invoice Table with Draggable Items */}
      <h2>Invoice Items</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Description</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Quantity</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Unit Price (TK)</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Total (TK)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item, index)}
              style={{
                cursor: 'move',
                backgroundColor: draggingIndex === index ? '#e0f7fa' : '#f9f9f9', // Change background color when dragging
                borderBottom: draggingIndex === index ? '2px solid #00796b' : '1px solid #ddd', // Border change for dragged item
                padding: '10px',
                transition: 'background-color 0.3s, border-bottom 0.3s', // Smooth transition for background and border
                boxShadow: draggingIndex === index ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none', // Add shadow for dragged item
              }}
            >
              <td style={{ padding: '10px', textAlign: 'left' }}>{item.description}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{item.quantity}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{item.unitPrice.toFixed(2)}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>
                {(item.quantity * item.unitPrice).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DraggableTable;

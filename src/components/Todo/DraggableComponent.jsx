import React, { useState } from 'react';

function DraggableComponent(props) {
  const [position, setPosition] = useState({ x: 550, y: 380 });

  // Обработчик события нажатия кнопки мыши
  function handleMouseDown(event) {
    // Запоминаем координаты мыши при нажатии кнопки
    const startX = event.pageX - position.x;
    const startY = event.pageY - position.y;

    // Добавляем обработчики событий перемещения и отпускания кнопки мыши
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Обработчик события перемещения мыши
    function handleMouseMove(event) {
      // Вычисляем новые координаты компоненты
      const newLeft = event.pageX - startX;
      const newTop = event.pageY - startY;

      // Обновляем состояние компоненты
      setPosition({ x: newLeft, y: newTop });
    }

    // Обработчик события отпускания кнопки мыши
    function handleMouseUp() {
      // Удаляем обработчики событий перемещения и отпускания кнопки мыши
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }

  // Возвращаем компоненту с установленными стилями для позиционирования
  return (
    <div
      style={{
        position: 'absolute',
        top: position.y + 'px',
        left: position.x + 'px',
        cursor: 'move'
      }}
      onMouseDown={handleMouseDown}
    >
      {props.children}
    </div>
  );
}

export default DraggableComponent;
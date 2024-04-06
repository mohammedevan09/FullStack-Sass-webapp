'use client'

import { DragDropContext } from 'react-beautiful-dnd'

export const DndContext = ({ children, onDragEnd }) => {
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
    </div>
  )
}

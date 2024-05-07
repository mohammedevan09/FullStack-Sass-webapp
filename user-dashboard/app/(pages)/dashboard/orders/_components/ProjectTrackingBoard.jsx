'use client'

import { updateOrderApi } from '@/api/orderApi'
import { DndContext } from '@/components/others/DndContext'
import { RemoveIcon } from '@/staticData/Icon'
import { useEffect, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import toast from 'react-hot-toast'

const ProjectTrackingBoard = ({ order, link }) => {
  const initialProjectTrackingBoard = [
    {
      title: 'To do',
      id: 0,
      fields: order?.projectTrackingBoard?.todo,
    },
    {
      title: 'In progress',
      id: 1,
      fields: order?.projectTrackingBoard?.inProgress,
    },
    {
      title: 'Complete',
      id: 2,
      fields: order?.projectTrackingBoard?.complete,
    },
  ]

  const [data, setData] = useState([])
  const [saveButton, setSaveButton] = useState(false)

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return

    const newData = [...data]
    const sourceIndex = source.index
    const destinationIndex = destination.index

    if (source.droppableId === destination.droppableId) {
      // If dragging within the same Droppable
      const droppableIndex = parseInt(
        source.droppableId.replace('droppable', '')
      )
      const items = [...newData[droppableIndex].fields]
      const [removed] = items.splice(sourceIndex, 1)
      items.splice(destinationIndex, 0, removed)
      newData[droppableIndex].fields = items
    } else {
      // If dragging from one Droppable to another
      const sourceDroppableIndex = parseInt(
        source.droppableId.replace('droppable', '')
      )
      const destDroppableIndex = parseInt(
        destination.droppableId.replace('droppable', '')
      )

      const sourceItems = [...newData[sourceDroppableIndex].fields]
      const destItems = [...newData[destDroppableIndex].fields]

      const [removed] = sourceItems.splice(sourceIndex, 1)
      destItems.splice(destinationIndex, 0, removed)

      newData[sourceDroppableIndex].fields = sourceItems
      newData[destDroppableIndex].fields = destItems
    }
    setData(newData)
    setSaveButton(true)
  }

  const handleAddTodo = (e) => {
    e.preventDefault()
    const inputValue = e.target.elements.todo.value.trim()
    if (inputValue) {
      const updatedProjectTracking = data.map((item) => {
        if (item.title === 'To do') {
          return {
            ...item,
            fields: [
              ...item.fields,
              { _id: Math.random().toString(), title: inputValue },
            ],
          }
        }
        return item
      })
      setData(updatedProjectTracking)
      e.target.elements.todo.value = ''
      setSaveButton(true)
    }
  }

  const handleRemoveTodo = (e, index) => {
    e.preventDefault()
    const updatedProjectTracking = data.map((item) => {
      if (item.title === 'To do') {
        const updatedFields = item.fields.filter((_, idx) => idx !== index)
        return {
          ...item,
          fields: updatedFields,
        }
      }
      return item
    })
    setData(updatedProjectTracking)
    setSaveButton(true)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setData(initialProjectTrackingBoard)
    setSaveButton(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const newData = data.map((item) => {
        return {
          ...item,
          fields: item.fields.map(({ title }) => ({ title })),
        }
      })
      await updateOrderApi(
        {
          projectTrackingBoard: {
            todo: newData[0]?.fields,
            inProgress: newData[1]?.fields,
            complete: newData[2]?.fields,
          },
        },
        link
      )
      setSaveButton(false)
      toast.success('Project Tracking board updated!')
    } catch (error) {
      toast.error('Sorry, Cannot update!')
    }
  }

  useEffect(() => {
    setData(initialProjectTrackingBoard)
  }, [])

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="py-5 px-5 bg-white rounded-[10px] grid gap-4 board-shadow">
        <div className="md:flex grid md:gap-4 gap-8 md:justify-between items-start  md:text-base text-sm font-medium">
          {data?.map((item, i) => {
            return (
              <div key={i} className="w-full text-center">
                <div
                  className={`w-full py-2 bg-opacity-20 rounded-[5px] flex justify-center items-center gap-2 md:mb-0 mb-10 mx-auto ${
                    item?.title?.toLocaleLowerCase() === 'to do'
                      ? 'bg-rose-600'
                      : item?.title?.toLocaleLowerCase() === 'complete'
                      ? 'bg-green-500'
                      : 'bg-blue-600'
                  }`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      item?.title?.toLocaleLowerCase() === 'to do'
                        ? 'bg-rose-600'
                        : item?.title?.toLocaleLowerCase() === 'complete'
                        ? 'bg-green-500'
                        : 'bg-blue-600'
                    }`}
                  />
                  {item?.title}
                </div>
                <div className="border border-[#d9e8ff] my-5 md:block hidden" />
                <Droppable key={i} droppableId={`droppable${i}`}>
                  {(provided, snapshot) => (
                    <div
                      className="grid gap-5 text-sm font-medium pb-[70px]"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {item?.fields?.map((subitem, index) => (
                        <Draggable
                          key={subitem?._id}
                          draggableId={subitem?._id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              className={`text-gray-600 rounded-[5px] py-2 px-3 w-full flex justify-between gap-2 font-semibold ${
                                item?.title === 'To do'
                                  ? 'bg-[#ff00001a]'
                                  : item?.title === 'Complete'
                                  ? 'bg-[#01910121]'
                                  : 'bg-[#0000ff1c]'
                              }`}
                            >
                              <div></div>
                              {subitem?.title}
                              {item?.title === 'To do' ? (
                                <button
                                  onClick={(e) => handleRemoveTodo(e, index)}
                                  className="text-red-600"
                                >
                                  <RemoveIcon />
                                </button>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {item?.title === 'To do' && (
                        <form
                          onSubmit={handleAddTodo}
                          className="flex h-[34px] svg-shadow rounded-md overflow-hidden"
                        >
                          <input
                            type="text"
                            name="todo"
                            placeholder={`Add To do`}
                            className="w-full px-3 rounded-md"
                          />
                          <button
                            type="submit"
                            className="bg-rose-400 text-white rounded-sm px-4 py-1"
                          >
                            Add
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            )
          })}
        </div>
        {saveButton && (
          <div className="w-full flex justify-end items-center font-bold -mt-12">
            <button
              className="text-blue-600 px-4 py-1 hover:scale-110 rounded-[4px] transition"
              onClick={handleCancel}
            >
              Reset
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-1 hover:scale-110 rounded-[4px] transition"
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>
        )}
      </div>
    </DndContext>
  )
}

export default ProjectTrackingBoard

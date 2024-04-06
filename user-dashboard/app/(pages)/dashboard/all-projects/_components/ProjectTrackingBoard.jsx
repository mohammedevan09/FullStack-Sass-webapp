'use client'

import { RemoveIcon } from '@/staticData/Icon'
import { useEffect, useState } from 'react'

const ProjectTrackingBoard = ({ order }) => {
  const initialTodo = order?.projectTrackingBoard?.todo
  const [trackingData, setTrackingData] = useState(order?.projectTrackingBoard)
  const [saveButton, setSaveButton] = useState(false)

  const projectTracking = [
    {
      track: 'To do',
      names: trackingData.todo,
    },
    {
      track: 'In progress',
      names: trackingData.inProgress,
    },
    {
      track: 'Complete',
      names: trackingData.complete,
    },
  ]

  const handleAddTodo = (e) => {
    e.preventDefault()
    const inputValue = e.target.elements.todo.value.trim()
    if (inputValue) {
      setTrackingData({
        ...trackingData,
        todo: [...trackingData?.todo, { title: inputValue }],
      })
      e.target.elements.todo.value = ''
      setSaveButton(true)
    }
  }

  const handleRemoveTodo = (e, index) => {
    e.preventDefault()
    let updatedTodo = trackingData?.todo.filter((item, i) => index !== i)
    setTrackingData({
      ...trackingData,
      todo: updatedTodo,
    })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setTrackingData({
      ...trackingData,
      todo: initialTodo,
    })
    setSaveButton(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
  }

  return (
    <div className="py-5 md:px-10 px-5 bg-white rounded-[20px] grid gap-4">
      <div className="md:flex grid md:gap-4 gap-8 md:justify-between items-start  md:text-base text-sm font-medium">
        {projectTracking?.map((item, i) => {
          return (
            <div key={i} className="w-full text-center">
              <div className="border border-stone-300 my-5 md:hidden block" />
              <div
                className={`w-[130px] h-[34px] bg-opacity-20 rounded-[5px] flex justify-center items-center gap-2 md:mb-0 mb-10 mx-auto ${
                  item?.track?.toLocaleLowerCase() === 'to do'
                    ? 'bg-rose-600'
                    : item?.track?.toLocaleLowerCase() === 'complete'
                    ? 'bg-green-500'
                    : 'bg-blue-600'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    item?.track?.toLocaleLowerCase() === 'to do'
                      ? 'bg-rose-600'
                      : item?.track?.toLocaleLowerCase() === 'complete'
                      ? 'bg-green-500'
                      : 'bg-blue-600'
                  }`}
                />
                {item?.track}
              </div>
              <div className="border border-stone-200 my-5 md:block hidden" />
              <div className="grid gap-5 text-sm font-medium">
                {item?.names?.map((subitem, index) => {
                  if (subitem?.title && subitem.title.trim() !== '') {
                    return (
                      <div
                        key={index + i * Math.random()}
                        className={`text-gray-700 rounded-[5px] border border-neutral-400 py-2 px-3 w-full flex justify-between gap-2`}
                      >
                        <div></div>
                        {subitem?.title}
                        {item?.track === 'To do' ? (
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
                    )
                  }
                })}
                {item?.track === 'To do' && (
                  <form
                    onSubmit={handleAddTodo}
                    className="flex h-[34px] svg-shadow rounded-sm overflow-hidden"
                  >
                    <input
                      type="text"
                      name="todo"
                      placeholder={`Add To do`}
                      className="w-full px-3"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-1"
                    >
                      Add
                    </button>
                  </form>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {saveButton && (
        <div className="w-full flex justify-end items-center font-bold">
          <button
            className="text-blue-600 px-4 py-1 hover:scale-110 rounded-[4px] disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-1 hover:scale-110 rounded-[4px] disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={handleSave}
          >
            SAVE
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectTrackingBoard

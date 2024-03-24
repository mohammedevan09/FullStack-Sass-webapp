'use client'

import { useEffect, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { DndContext } from './DndContext'
import { cardsData } from './Card'
import FormLabelEditModal from '../modals/othersModal/FormLabelEditModal'
import { InputFieldEditIcon } from '@/staticData/Icon'

const FormExample = () => {
  const [data, setData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingLabel, setEditingLabel] = useState(null)

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(data))]
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split('droppable')[1]
      )
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId.split('droppable')[1]
      )
      const [item] = newData[oldDroppableIndex].components.splice(
        source.index,
        1
      )
      newData[newDroppableIndex].components.splice(destination.index, 0, item)
      setData([...newData])
    } else {
      const newData = [...JSON.parse(JSON.stringify(data))]
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split('droppable')[1]
      )
      const [item] = newData[droppableIndex].components.splice(source.index, 1)
      newData[droppableIndex].components.splice(destination.index, 0, item)
      setData([...newData])
    }
  }
  useEffect(() => {
    setData(cardsData)
  }, [])

  // console.log(data)

  const editClick = (comp) => {
    setNewName(comp?.name)
    setOpenModal(true)
    setEditingLabel(comp)
  }

  const handleNewLabel = () => {
    setData((prevData) => {
      const components = prevData[0]?.components || []
      const updatedComponents = components.map((d) => {
        if (d?.id === editingLabel?.id) {
          return { ...d, name: newName }
        }
        return d
      })

      prevData[0] = { ...prevData[0], components: updatedComponents }

      return prevData
    })
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 justify-between my-2 flex-col lg:flex-row">
        {data.map((val, index) => {
          return (
            <Droppable key={index} droppableId={`droppable${index}`}>
              {(provided) => (
                <div
                  className="w-full"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {val?.id === 0 ? (
                    <>
                      <div className="p-5 w-full bg-white  border-gray-400 rounded-[9px]">
                        {val?.components?.length === 0 ? (
                          <h2 className="text-gray-400 text-sm text-center h-24 flex justify-center items-center">
                            No fields yet...
                          </h2>
                        ) : (
                          <>
                            {' '}
                            {val.components?.map((component, index) => (
                              <Draggable
                                key={component.id}
                                draggableId={component.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className="my-5 grid"
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                  >
                                    <div className="flex justify-between">
                                      <label
                                        htmlFor={component?.id}
                                        className="text-sm font-semibold tracking-tight mb-1"
                                      >
                                        {component?.name}
                                      </label>
                                      <InputFieldEditIcon
                                        onClick={() => editClick(component)}
                                      />
                                    </div>
                                    {component?.type === 'radio' ? (
                                      <div className="flex gap-4 text-sm font-medium mt-2">
                                        <div className="flex gap-1 items-center">
                                          <input
                                            type={component?.type}
                                            id="yes-custom"
                                            name="custom-form"
                                            value="yes"
                                            className="w-4 h-4"
                                          />
                                          <label htmlFor="yes-custom">
                                            Yes
                                          </label>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                          <input
                                            type={component?.type}
                                            id="no-custom"
                                            name="custom-form"
                                            value="no"
                                            className="w-4 h-4"
                                          />
                                          <label htmlFor="no-custom">No</label>
                                        </div>
                                      </div>
                                    ) : (
                                      <input
                                        type={component?.type}
                                        className={`w-full border border-[#cdcdcd] font-medium placeholder:font-normal rounded-[4px] bg-[none] text-sm text-left px-4 ${
                                          component?.className || 'h-[38px]'
                                        }`}
                                        id={component?.id}
                                        placeholder={component?.placeholder}
                                      />
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            <div className="flex justify-center items-center gap-3 w-full">
                              <button className="bg-blue-800 p-2 rounded text-lg font-semibold w-full text-white btn-hover">
                                Save form
                              </button>
                            </div>
                          </>
                        )}
                        {provided.placeholder}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-5 w-full bg-white  border-gray-400 rounded-[9px]">
                        <h2 className="text-center font-bold mb-6 text-gray-700">
                          {val.title}
                        </h2>
                        {val.components?.map((component, index) => (
                          <Draggable
                            key={component.id}
                            draggableId={component.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="mx-1 my-3 font-bold text-sm text-gray-500 flex items-center gap-2"
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  height={'17'}
                                  width={'17'}
                                  fill={'grey'}
                                >
                                  <path d={component?.path}></path>
                                </svg>
                                {component?.name}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </>
                  )}
                </div>
              )}
            </Droppable>
          )
        })}
      </div>
      {openModal && (
        <FormLabelEditModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleNewLabel={handleNewLabel}
          newName={newName}
          setNewName={setNewName}
        />
      )}
    </DndContext>
  )
}

export default FormExample

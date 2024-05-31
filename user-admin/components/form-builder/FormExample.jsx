'use client'

import { useEffect, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { DndContext } from '../others/DndContext'
import { cardsData } from './FormsData'
import FormLabelEditModal from '../modals/FormAndFeedbackModal/FormLabelEditModal'
import { InputFieldEditIcon, NoteIcon } from '@/staticData/Icon'
import Labels from '../others/Labels'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createFormApi, updateFormApi } from '@/api/formApi'
import { useSelector } from 'react-redux'
import { showTeamMemberErrorToast } from '@/utils/toastUtils'

const FormExample = ({
  form,
  isSubmitting,
  handleSubmit,
  text,
  isValid,
  reset,
  searchParams,
}) => {
  const router = useRouter()

  const { userInfo } = useSelector((state) => state?.user)

  const [data, setData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [newField, setNewField] = useState('')
  const [editingLabel, setEditingLabel] = useState(null)

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
  }

  useEffect(() => {
    const updatedCardData = [
      {
        ...cardsData[0],
        fields: form?.fields || [],
      },
      {
        ...cardsData[1],
        fields: (cardsData[1]?.fields || []).filter(
          (field) => !form?.fields?.some((f) => f.id === field.id)
        ),
      },
    ]
    setData(updatedCardData)
  }, [form])

  // console.log(data)

  const editClick = (comp) => {
    setNewField(comp)
    setOpenModal(true)
    setEditingLabel(comp)
  }

  const handleNewField = () => {
    setData((prevData) => {
      const fields = prevData[0]?.fields || []
      const updatedFields = fields.map((inp) => {
        if (inp?.label === editingLabel?.label) {
          let updatedField = {
            ...inp,
            label: newField?.label,
            placeholder: newField?.placeholder,
          }

          if (newField?.optional !== undefined) {
            updatedField = {
              ...updatedField,
              optional: newField?.optional,
            }
          }
          if (newField?.options && newField.options.length > 0) {
            updatedField = {
              ...updatedField,
              options: newField?.options,
            }
          }
          return updatedField
        }
        return inp
      })
      prevData[0] = { ...prevData[0], fields: updatedFields }
      return prevData
    })
  }

  const handleSave = async (formData) => {
    if (userInfo?.creatorId) {
      return showTeamMemberErrorToast()
    }
    if (isValid) {
      let newFormData
      try {
        if (form?._id) {
          newFormData = await updateFormApi(
            {
              ...formData,
              description: text || form?.description,
              fields: [...data[0]?.fields],
            },
            form?._id,
            userInfo?.token
          )
        } else {
          newFormData = await createFormApi(
            {
              ...formData,
              formCategoryId: searchParams?.categoryId,
              userId: userInfo?._id,
              description: text,
              fields: [...data[0]?.fields],
            },
            userInfo?.token
          )
          router.push(
            `/forms/formsByCategory/${newFormData?._id}?categoryId=${newFormData?.formCategoryId}`
          )
        }
        reset()
        toast.success('Form saved successfully!')
      } catch (error) {
        toast.error('Sorry, Form saving failed!')
      }
    }
  }

  return (
    <>
      <DndContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 justify-between my-2 flex-col lg:flex-row">
          {data.map((val, index) => {
            return (
              <Droppable key={index} droppableId={`droppable${index}`}>
                {(provided, snapshot) => (
                  <div
                    className="w-full"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {val?.id === 0 ? (
                      <>
                        <div className="p-5 w-full bg-white  border-gray-400 rounded-[9px]">
                          {val?.fields?.length === 0 ? (
                            <>
                              <h2 className="text-gray-400 text-lg text-center h-24 flex justify-center items-center">
                                No fields yet...
                              </h2>
                            </>
                          ) : (
                            <>
                              {' '}
                              {val.fields?.map((field, index) => (
                                <Draggable
                                  key={field?.id}
                                  draggableId={field?.id.toString()}
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
                                        <Labels
                                          htmlFor={field?.id}
                                          name={field?.label}
                                          optional={field?.optional}
                                        />

                                        <InputFieldEditIcon
                                          onClick={() => editClick(field)}
                                        />
                                      </div>
                                      {field?.type === 'radio' ||
                                      field?.type === 'checkbox' ? (
                                        <div
                                          className={`grid gap-4 text-sm font-medium mt-2`}
                                        >
                                          {field?.options?.map((opt, idx) => {
                                            return (
                                              <div
                                                className="flex gap-1 items-center"
                                                key={idx}
                                              >
                                                <input
                                                  type={field?.type}
                                                  id={`${opt?.value}-${index}`}
                                                  name={`custom-form-${index}`}
                                                  value={opt?.label}
                                                  className="w-4 h-4"
                                                />
                                                <label
                                                  htmlFor={`${opt?.value}-${index}`}
                                                >
                                                  {opt?.label}
                                                </label>
                                              </div>
                                            )
                                          })}
                                        </div>
                                      ) : (
                                        <input
                                          type={field?.type}
                                          className={`w-full border border-[#cdcdcd] font-medium placeholder:font-normal rounded-[4px] bg-[none] text-sm text-left px-4 ${
                                            field?.className || 'h-[38px]'
                                          }`}
                                          id={field?.id}
                                          placeholder={field?.placeholder}
                                        />
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                              <button
                                className="bg-blue-800 p-2 rounded text-lg font-semibold w-full text-white btn-hover relative bottom-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                                onClick={handleSubmit(handleSave)}
                              >
                                Save form
                              </button>
                            </>
                          )}
                        </div>
                        <div className="flex items-center mt-1 mb-4 font-medium text-gray-600">
                          <NoteIcon /> Title and description will be in the form
                          by default.
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-5 w-full bg-white  border-gray-400 rounded-[9px]">
                          <h2 className="text-center font-bold mb-6 text-gray-700">
                            {val.title}
                          </h2>
                          {val.fields?.map((field, index) => (
                            <Draggable
                              key={field?.id}
                              draggableId={field?.id.toString()}
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
                                    <path d={field?.path}></path>
                                  </svg>
                                  {field?.label}
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
            handleNewField={handleNewField}
            newField={newField}
            setNewField={setNewField}
          />
        )}
      </DndContext>
    </>
  )
}

export default FormExample

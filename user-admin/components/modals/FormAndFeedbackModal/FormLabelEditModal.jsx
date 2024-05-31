'use client'

import { motion } from 'framer-motion'
import WrappingModal from '../WrappingModal'
import { Input2 } from '@/components/others/Input'
import Labels from '@/components/others/Labels'
import { useState } from 'react'
import { RemoveIcon } from '@/staticData/Icon'

const FormLabelEditModal = ({
  openModal,
  setOpenModal,
  handleNewField,
  newField,
  setNewField,
}) => {
  const [option, setOption] = useState('')

  const handleAddOption = (e) => {
    e.preventDefault()
    setNewField({
      ...newField,
      options: [
        ...newField?.options,
        {
          label: option,
          value: option?.split(' ').join('-').toLocaleLowerCase(),
        },
      ],
    })
    setOption('')
  }

  const handleRemoveOption = (e, deleteOption) => {
    e.preventDefault()
    setNewField({
      ...newField,
      options: newField?.options?.filter(
        (opt) => opt?.value !== deleteOption?.value
      ),
    })
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div className="grid bg-white pt-10 pb-4 sm:px-12 px-8 rounded-[20px] w-full">
        <h3 className="sm:text-2xl text-xl font-semibold tracking-tight mx-auto mb-8">
          Edit Form Field
        </h3>
        <div className="grid gap-5">
          <div className="grid">
            <Labels htmlFor={newField?.label} name={'Label'} />
            <Input2
              id={newField?.label}
              type="text"
              validationRules={{
                value: newField?.label,
                onChange: (e) =>
                  setNewField((prev) => {
                    return { ...prev, label: e.target?.value }
                  }),
              }}
            />
          </div>
          {newField?.type !== 'radio' && newField?.type !== 'checkbox' ? (
            <>
              <div className="grid">
                <Labels htmlFor={newField?.placeholder} name={'Placeholder'} />
                <Input2
                  id={newField?.placeholder}
                  placeholder={newField?.placeholder}
                  type="text"
                  validationRules={{
                    value: newField?.placeholder,
                    onChange: (e) =>
                      setNewField((prev) => {
                        return { ...prev, placeholder: e.target?.value }
                      }),
                  }}
                />
              </div>
            </>
          ) : (
            <div className={`grid gap-5`}>
              <form
                onSubmit={handleAddOption}
                className="flex h-[34px] svg-shadow rounded-sm overflow-hidden"
              >
                <input
                  type="text"
                  placeholder={`Add options service`}
                  className="w-full px-3"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                />

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={option === ''}
                >
                  Add
                </button>
              </form>
              <div className="grid gap-2 ml-2">
                {newField?.options?.map((opt, idx) => (
                  <div className="flex items-center justify-between" key={idx}>
                    <div className="flex gap-2 items-center">
                      <input
                        type={newField?.type}
                        id={`${opt?.value}-${idx + newField?.label}`}
                        name={`custom-form-${newField?.label}`}
                        value={opt?.label}
                        className="w-4 h-4"
                      />
                      <label htmlFor={`${opt?.value}-${idx + newField?.label}`}>
                        {opt?.label}
                      </label>
                    </div>
                    <button
                      onClick={(e) => handleRemoveOption(e, opt)}
                      className="text-red-600"
                    >
                      <RemoveIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex mt-6 items-center gap-1">
          <Labels htmlFor={'optional'} name={'Optional - '} className="mb-0" />
          <button
            className={`py-[2px] font-medium px-4 text-white rounded-full text-sm ${
              newField?.optional ? 'bg-blue-400' : 'bg-red-400'
            }`}
            onClick={(e) => {
              e.preventDefault()
              setNewField((prev) => {
                return { ...prev, optional: !newField?.optional }
              })
            }}
          >
            {newField?.optional ? 'True' : 'False'}
          </button>
        </div>
        <div className="flex items-center gap-3 mt-10">
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full p-2 text-blue-800 rounded-[9px] text-lg font-semibold leading-7"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-2 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7"
            onClick={() => {
              setOpenModal(false)
              handleNewField()
            }}
          >
            Save
          </motion.button>
        </div>
      </div>
    </WrappingModal>
  )
}

export default FormLabelEditModal

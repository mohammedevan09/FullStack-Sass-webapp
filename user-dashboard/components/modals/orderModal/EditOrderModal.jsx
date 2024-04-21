'use client'

import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import { Input2 } from '@/components/others/Input'
import { LabelsTwo } from '@/components/others/Labels'
import ErrorMessage from '@/components/others/ErrorMessage'
import { updateOrderApi } from '@/api/orderApi'
import toast from 'react-hot-toast'

const EditOrderModal = ({
  openModal,
  setOpenModal,
  register,
  errors,
  isValid,
  isDirty,
  fields,
  handleSubmit,
  setOrderData,
  link,
  reset,
}) => {
  const handleEdit = async (data) => {
    if (isValid) {
      try {
        const updated = await updateOrderApi(data, link)
        setOrderData(updated)
        reset(updated)
        toast.success('Updated successfully!')
        reset()
        setOpenModal(false)
      } catch (error) {
        toast.error('Updating failed!')
      }
    }
  }

  return (
    <>
      <WrappingModal modalOpen={openModal}>
        <div className="grid bg-white pt-10 pb-4 px-8 rounded-[20px] sm:w-[500px] w-[360px]">
          <h3 className="xs:text-2xl text-xl font-semibold tracking-tight mx-auto">
            Edit your order information
          </h3>
          <div className="w-full h-[0px] border border-neutral-300 mt-5 mb-10"></div>
          <div className="grid gap-5">
            <div className="grid">
              <LabelsTwo htmlFor={'project-title'} name={'Project Title'} />
              <Input2
                id={'project-title'}
                placeholder={'Ex: Andrea’s personal web development'}
                type={'text'}
                validationRules={{
                  ...register('title', {
                    required: {
                      value: true,
                      message: 'Title is required',
                    },
                  }),
                }}
              />
              <ErrorMessage errors={errors?.title} />
            </div>
            <div className="grid">
              <LabelsTwo
                htmlFor={'Describe-the-projects'}
                name={'Describe the Business/projects.'}
              />
              <Input2
                id={'Describe-the-projects'}
                placeholder={'Example: its an salon business in new York etc.'}
                type={'text'}
                className={'h-[81.66px]'}
                validationRules={{
                  ...register('description', {
                    required: {
                      value: true,
                      message: 'Description is required',
                    },
                  }),
                }}
              />
              <ErrorMessage errors={errors?.description} />
            </div>
            {fields?.map((field, i) => {
              return (
                <div className="grid" key={i}>
                  <LabelsTwo htmlFor={field?._id} name={field?.label} />
                  {field?.type !== 'radio' && field?.type !== 'checkbox' ? (
                    <Input2
                      id={field?._id}
                      placeholder={field?.placeholder}
                      type={field?.type}
                      validationRules={{
                        ...register(`additionalInfo[${field?.label}]`, {
                          required: {
                            value: !field?.optional,
                            message: `${field?.label} is required`,
                          },
                        }),
                      }}
                    />
                  ) : (
                    <>
                      {field?.options?.map((opt, idx) => (
                        <div className="flex gap-2 items-center" key={idx}>
                          <input
                            type={field?.type}
                            id={`${opt?.value}-${idx + field?.label}`}
                            name={`custom-form-${field?.label}`}
                            value={opt?.label}
                            className="w-4 h-4"
                            {...register(`additionalInfo[${field?.label}]`, {
                              required: {
                                value: !field?.optional,
                                message: `${field?.label} is required`,
                              },
                            })}
                          />
                          <label
                            htmlFor={`${opt?.value}-${idx + field?.label}`}
                          >
                            {opt?.label}
                          </label>
                        </div>
                      ))}
                    </>
                  )}
                  <ErrorMessage
                    errors={errors?.additionalInfo?.[field?.label]}
                  />
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-3 mt-9 mb-5">
            <motion.button
              whileHover={{ scale: 1.07 }}
              className="w-full px-4 py-2 text-blue-800 rounded-[9px] bg-white text-xl font-semibold"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="w-full px-4 py-2 bg-blue-800 rounded-[9px] text-white text-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isDirty}
              onClick={handleSubmit(handleEdit)}
            >
              Save
            </motion.button>
          </div>
        </div>
      </WrappingModal>
    </>
  )
}

export default EditOrderModal

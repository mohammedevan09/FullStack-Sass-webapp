'use client'

import { LabelsTwo } from '@/components/others/Labels'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import { Input2 } from '@/components/others/Input'
import { ErrorMessageTwo } from '@/components/others/ErrorMessage'

const CustomFormModal = ({
  openModal,
  setOpenModal,
  register,
  service,
  errors,
  isValid,
  setCheckOutModal,
}) => {
  const { fields } = service.form

  return (
    <>
      <WrappingModal modalOpen={openModal}>
        <div className="grid bg-white pt-10 pb-4 sm:px-12 px-8 rounded-[20px] w-full">
          <h3 className="xs:text-2xl text-xl font-semibold tracking-tight mx-auto">
            Provide project details & questionnaire
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
              <ErrorMessageTwo errors={errors?.title} />
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
              <ErrorMessageTwo errors={errors?.description} />
            </div>
            {fields?.map((field, i) => {
              return (
                <div className="grid" key={i}>
                  <LabelsTwo
                    htmlFor={field?._id}
                    name={field?.label}
                    optional={field?.optional}
                  />
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
                  <ErrorMessageTwo
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
              disabled={!isValid}
              onClick={() => {
                setOpenModal(false)
                setCheckOutModal(true)
              }}
            >
              Next
            </motion.button>
          </div>
        </div>
      </WrappingModal>
    </>
  )
}

export default CustomFormModal

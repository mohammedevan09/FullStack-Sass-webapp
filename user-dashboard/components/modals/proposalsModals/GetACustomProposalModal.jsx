'use client'

import { Input2 } from '@/components/others/Input'
import { LabelsTwo } from '@/components/others/Labels'
import WrappingModal from '../WrappingModal'
import { motion } from 'framer-motion'
import YesNoRadioInput from '@/components/others/YesNoRadioInput'
import { CloseIcon } from '@/staticData/Icon'
import { useForm } from 'react-hook-form'
import ErrorMessage from '@/components/others/ErrorMessage'
import { useSelector } from 'react-redux'
import { createProposalApi, updateProposalApi } from '@/api/proposalApi'
import toast from 'react-hot-toast'

const GetACustomProposalModal = ({
  setOpenSubModal,
  setOpenModal,
  openModal,
  existedData,
}) => {
  const { userInfo } = useSelector((state) => state?.user)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: existedData
      ? {
          ...existedData,
          details: {
            ...existedData?.details,
            lastProposalBy: userInfo?._id,
          },
        }
      : {
          userId: userInfo?._id,
          details: {
            lastProposalBy: userInfo?._id,
          },
        },
    mode: 'onChange',
  })

  const handleSave = async (data) => {
    if (isValid) {
      try {
        toast.loading('Processing, please wait!', { duration: 600 })
        data.totalAmount = parseInt(data.totalAmount)
        data.timeline = parseInt(data.timeline)
        if (existedData) {
          await updateProposalApi(data, existedData?._id)
        } else {
          await createProposalApi(data)
        }
        toast.success('Successfully submitted proposal request!')
        setOpenModal(false)
        setOpenSubModal(true)
      } catch (error) {
        toast.error('Cannot create proposal request!')
        setOpenModal(false)
      }
    }
  }

  return (
    <WrappingModal modalOpen={openModal}>
      <div
        className="absolute top-3 right-3 cursor-pointer"
        onClick={() => setOpenModal(false)}
      >
        <CloseIcon color={'#7a93ff'} />
      </div>
      <form className="grid bg-white pt-16 pb-10 sm:px-8 px-4 rounded-[20px] w-full">
        <h3 className="sm:text-2xl text-lg font-semibold tracking-tight mx-auto">
          Provide project details & questionnaire
        </h3>
        <div className="w-full h-[0px] border border-neutral-300 mt-5 mb-14"></div>
        <div className="grid gap-5">
          <div className="grid">
            <LabelsTwo
              className="text-sm"
              htmlFor={'project-title'}
              name={'Project Title'}
            />
            <Input2
              className={'border-[#cdcdcd]'}
              id={'project-title'}
              placeholder={'Ex: Andrea’s personal web development'}
              type={'text'}
              validationRules={{
                ...register('title', {
                  required: {
                    value: true,
                    message: 'Title is required!',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.title} />
          </div>
          <div className="grid">
            <LabelsTwo
              className="text-sm"
              htmlFor={'Describe-the-projects'}
              name={'Describe the projects.'}
            />
            <Input2
              className={'border-[#cdcdcd]'}
              id={'Describe-the-projects'}
              placeholder={'Example: its an salon business in new York etc.'}
              type={'text'}
              validationRules={{
                ...register('description'),
              }}
            />
          </div>
          <div className="grid gap-4">
            <h2 className="font-bold text-xl mt-4">Executive Summary</h2>
            <div>
              <Input2
                className={'border-[#cdcdcd]'}
                placeholder={
                  'Describe the problems your project aims to solve.'
                }
                type={'text'}
                validationRules={{
                  ...register('details.executive_summary.problem_overview', {
                    required: {
                      value: true,
                      message: 'Problem overview is required!',
                    },
                  }),
                }}
              />
              <ErrorMessage
                errors={errors?.details?.executive_summary?.problem_overview}
              />
            </div>
            <div>
              <Input2
                className={'border-[#cdcdcd]'}
                placeholder={'Describe the desired solution for your project.'}
                type={'text'}
                validationRules={{
                  ...register('details.executive_summary.problem_solution', {
                    required: {
                      value: true,
                      message: 'Problem Solution is required!',
                    },
                  }),
                }}
              />
              <ErrorMessage
                errors={errors?.details?.executive_summary?.problem_solution}
              />
            </div>
          </div>

          <div className="grid gap-5">
            <h2 className="font-bold text-xl mt-4">Scope of Work</h2>
            <div>
              <Input2
                className={'border-[#cdcdcd]'}
                placeholder={'List the features you require for your project.'}
                type={'text'}
                validationRules={{
                  ...register('details.scope_of_work.features', {
                    required: {
                      value: true,
                      message: 'Features is required!',
                    },
                  }),
                }}
              />
              <ErrorMessage errors={errors?.details?.scope_of_work?.features} />
            </div>
            <div>
              <Input2
                className={'border-[#c5c5c5]'}
                placeholder={
                  'Describe the resources you can provide for the project.'
                }
                type={'text'}
                validationRules={{
                  ...register('details.scope_of_work.resources_required', {
                    required: {
                      value: true,
                      message:
                        'Write some resources which you will give us later!',
                    },
                  }),
                }}
              />
              <ErrorMessage
                errors={errors?.details?.scope_of_work?.resources_required}
              />
            </div>
          </div>

          <div className="grid mt-6">
            <LabelsTwo className="text-sm" htmlFor={'budget'} name={'Budget'} />
            <Input2
              className={'border-[#cdcdcd]'}
              id={'budget'}
              placeholder={'Ex: 800-1000$'}
              type={'number'}
              validationRules={{
                ...register('totalAmount', {
                  required: {
                    value: true,
                    message: 'Budget is required',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.totalAmount} />
          </div>
          <div className="grid">
            <LabelsTwo
              className="text-sm"
              htmlFor={'Timeline'}
              name={'Timeline  (Days)'}
            />
            <Input2
              className={'border-[#cdcdcd]'}
              id={'Timeline'}
              placeholder={'Ex: 30, 60, 90'}
              type={'number'}
              validationRules={{
                ...register('timeline', {
                  required: {
                    value: true,
                    message: 'Timeline is required',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.timeline} />
          </div>
          <YesNoRadioInput
            name={'Do you need a virtual meeting for this project discussion?'}
            radioFor={'virtual-meeting'}
            yesClick={() => setValue('details.isMeeting', true)}
            noClick={() => setValue('details.isMeeting', false)}
          />
        </div>
        <div className="flex items-center gap-3 mt-14">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-4 bg-blue-800 rounded-[9px] text-white text-lg font-semibold leading-7"
            onClick={handleSubmit(handleSave)}
          >
            Send me a custom proposal
          </motion.button>
        </div>
      </form>
    </WrappingModal>
  )
}

export default GetACustomProposalModal

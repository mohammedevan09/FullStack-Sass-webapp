'use client'

import { createFeedbackApi } from '@/api/feedback'
import ErrorMessage from '@/components/others/ErrorMessage'
import ReactSelect from '@/components/others/ReactSelect'
import { showTeamMemberErrorToast } from '@/utils/toastUtils'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const MainFeedbackPage = ({ options }) => {
  const [val, setVal] = useState('')

  const router = useRouter()

  const { userInfo } = useSelector((state) => state?.user)

  const data = useMemo(() => {
    return options?.reduce((acc, curr) => {
      acc.push({
        value: curr?._id,
        label: curr?.name,
      })
      return acc
    }, [])
  }, [options])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      details: '',
      feedbackCategoryId: '',
      userId: userInfo?._id,
    },
    mode: 'onChange',
  })

  const onChange = (selectedOption) => {
    setVal(selectedOption)
    if (selectedOption?.value) {
      setValue('feedbackCategoryId', selectedOption?.value, {
        shouldDirty: true,
      })
      clearErrors('feedbackCategoryId')
    } else {
      setValue('feedbackCategoryId', '', {
        shouldDirty: true,
      })
      setError('feedbackCategoryId', {
        type: 'manual',
        message: 'Please select an issue',
      })
    }
  }

  const handleSave = async (formData) => {
    if (userInfo?.creatorId) {
      return showTeamMemberErrorToast()
    }
    if (isValid) {
      try {
        await createFeedbackApi(formData)
        toast.success('Feedback send successfully')
        router.push('/dashboard/feedback/thanks')
      } catch (error) {
        toast.error('Cannot send any feedback, Try again later!')
      }
    }
  }

  return (
    <div className="flex items-center w-full">
      <div className="grid items-center sm:py-8 py-4 bg-white xs:px-9 px-2 rounded-[15px] my-28 lg:w-[800px] sm:w-[600px] w-full mx-auto">
        <h1 className=" text-center lg:text-[32px] sm:text-2xl text-xl font-semibold mx-auto">
          We’re always open to improve our partner’s experience & our services
        </h1>
        <h3 className="lg:text-xl sm:text-base text-sm lg:my-7 my-5 mx-auto text-center">
          Fillout the form & let us know how we can improve the services & our
          partner portal experience
        </h3>
        <div className="text-slate-700 lg:text-xl sm:text-lg xs:text-base text-sm font-semibold grid">
          <label htmlFor="issue">Select an issues</label>

          <ReactSelect onChange={onChange} data={data} val={val} />
          <ErrorMessage errors={errors?.feedbackCategoryId} />
          <label htmlFor="Details">Details</label>
          <textarea
            name="Details"
            id="Details"
            cols="30"
            rows="4"
            className="border border-gray-300 outline-none rounded-[5px] p-3 text-sm"
            {...register('details', {
              required: {
                value: true,
                message: 'Details is required!',
              },
            })}
          ></textarea>
          <ErrorMessage errors={errors?.details} />
        </div>
        <button
          className="w-full text-center text-base font-semibold py-2 rounded-md leading-7 mt-8 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition bg-blue-800 text-white"
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit(handleSave)}
        >
          Send Feedback
        </button>
      </div>
    </div>
  )
}

export default MainFeedbackPage

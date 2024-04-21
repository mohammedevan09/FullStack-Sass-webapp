'use client'

import { createGuideApi, updateGuideApi } from '@/api/guideApi'
import ErrorMessage from '@/components/others/ErrorMessage'
import Input from '@/components/others/Input'
import Labels from '@/components/others/Labels'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import BackButton from '@/components/others/BackButton'
import { useSelector } from 'react-redux'
import DeleteGuideModal from '@/components/modals/guideModal/DeleteGuideModal'

const MainSingleGuidePage = ({ guide }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { userInfo } = useSelector((state) => state?.user)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    reset,
    watch,
  } = useForm({
    defaultValues: guide,
    resetOptions: {
      keepDirtyValues: true,
    },
    mode: 'onChange',
  })

  const handleSave = async (formData) => {
    if (isValid) {
      let newGuide
      try {
        if (guide?._id) {
          newGuide = await updateGuideApi(formData, guide?._id)
        } else {
          newGuide = await createGuideApi({
            ...formData,
            creatorId: userInfo?._id,
          })
          router.push(`/how-to-guide/${newGuide?._id}`)
        }
        reset(newGuide)
        toast.success('Tutorial/Guide saved successfully!')
      } catch (error) {
        toast.error('Sorry, Tutorial/Guide saving failed!')
      }
    }
  }

  const guideLink = watch('link')

  return (
    <>
      <div className="sm:mt-16 mt-10 sm:mb-14 mb-8 w-full grid gap-6">
        <BackButton title={'Go Back'} link={`/how-to-guide`} />
        <div className="flex justify-between gap-3 items-center">
          <h1 className="text-2xl font-bold">
            {guide?._id ? guide?.title : 'Add New Custom tutorial'}
          </h1>
          <button
            className={`py-1 px-4 bg-rose-600 rounded-[9px] text-white text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition ${
              guide?._id ? 'block' : 'hidden'
            }`}
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete
          </button>
        </div>
        <div className="grid gap-5 bg-white rounded-lg sm:px-10 xs:px-5 px-2 py-4">
          <div className="grid">
            <Labels
              textSize={'text-sm'}
              htmlFor={'title'}
              name={'Video Title'}
            />
            <Input
              left={true}
              id={'title'}
              placeholder={'Ex: How to do this?'}
              type={'text'}
              cn={'w-full'}
              cnb={'rounded-[4px] bg-[none] text-sm'}
              cnh={'h-[38px]'}
              borderColor={'border-[#cdcdcd]'}
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
            <Labels textSize={'text-sm'} htmlFor={'Link'} name={'Video Link'} />
            <Input
              left={true}
              id={'link'}
              placeholder={'Ex: https://www.youtube.com/embed/....'}
              type={'text'}
              cn={'w-full'}
              cnb={'rounded-[4px] bg-[none] text-sm'}
              cnh={'h-[38px]'}
              borderColor={'border-[#cdcdcd]'}
              validationRules={{
                ...register('link', {
                  required: {
                    value: true,
                    message: 'Link is required!',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.link} />
          </div>
          <iframe
            className="sm:w-[499px] w-[350px] sm:h-[279px] h-[220px] sm:mx-0 mx-auto"
            src={guideLink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
        <div className="flex items-center gap-3 mt-5 mb-3">
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="w-full py-2 text-blue-800 rounded-[9px] text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !isDirty}
            onClick={() => reset()}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full py-2 bg-blue-600 rounded-[9px] text-white text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !isDirty}
            onClick={handleSubmit(handleSave)}
          >
            Save
          </motion.button>
        </div>
      </div>
      {openDeleteModal && (
        <DeleteGuideModal
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          guide={guide}
        />
      )}
    </>
  )
}

export default MainSingleGuidePage

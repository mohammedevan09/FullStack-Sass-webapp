'use client'

import {
  createFeedbackCategoryApi,
  deleteFeedbackCategoryApi,
  updateFeedbackCategoryApi,
} from '@/api/feedback'
import CategoryModal from '@/components/modals/FormAndFeedbackModal/CategoryModal'
import DeleteCategoryModal from '@/components/modals/FormAndFeedbackModal/DeleteCategoryModal'
import FormCategoryTable from '@/components/tables/FormCategoryTable'
import { showTeamMemberErrorToast } from '@/utils/toastUtils'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const FeedbackCategory = ({ feedbackCategories }) => {
  const [feedbackCategoryModal, setFeedbackCategoryModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [categories, setCategories] = useState(feedbackCategories || [])
  const [item, setItem] = useState(null)

  const { userInfo } = useSelector((state) => state?.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      creatorId: userInfo?._id,
    },

    mode: 'onChange',
  })

  useEffect(() => {
    if (item) {
      reset(item)
    } else {
      reset({
        name: '',
        description: '',
        creatorId: userInfo?._id || '',
      })
    }
  }, [item, reset, userInfo?._id])

  return (
    <>
      <button
        className="mx-auto py-2 px-4 mb-2 bg-blue-800 hover:scale-105 text-white font-semibold rounded-[5px] text-center transition sm:my-10 my-8"
        onClick={(e) => {
          e.preventDefault()
          if (userInfo?.creatorId) {
            return showTeamMemberErrorToast()
          } else {
            setItem(null)
            setFeedbackCategoryModal(true)
          }
        }}
      >
        Add a new Feedback category
      </button>
      <div className="bg-white rounded-[20px]">
        <FormCategoryTable
          formCategoryData={categories}
          title={'Feedback Category'}
          setItem={setItem}
          setEditModel={setFeedbackCategoryModal}
          setRemoveModal={setDeleteModal}
          link={`/feedback/feedbackByCategory?id=`}
          userInfo={userInfo}
        />
      </div>
      {feedbackCategoryModal && (
        <CategoryModal
          openModal={feedbackCategoryModal}
          setOpenModal={setFeedbackCategoryModal}
          api={createFeedbackCategoryApi}
          updateApi={updateFeedbackCategoryApi}
          setCategories={setCategories}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          isValid={isValid}
          register={register}
          item={item}
        />
      )}
      {deleteModal && (
        <DeleteCategoryModal
          openModal={deleteModal}
          setOpenModal={setDeleteModal}
          category={item}
          api={deleteFeedbackCategoryApi}
          setCategories={setCategories}
        />
      )}
    </>
  )
}

export default FeedbackCategory

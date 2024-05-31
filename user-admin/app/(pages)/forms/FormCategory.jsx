'use client'

import {
  createFormCategoryApi,
  deleteFormCategoryById,
  updateFormCategoryApi,
} from '@/api/formApi'
import CategoryModal from '@/components/modals/FormAndFeedbackModal/CategoryModal'
import DeleteCategoryModal from '@/components/modals/FormAndFeedbackModal/DeleteCategoryModal'
import DeleteFormModal from '@/components/modals/FormAndFeedbackModal/DeleteFormModal'
import FormCategoryTable from '@/components/tables/FormCategoryTable'
import { showTeamMemberErrorToast } from '@/utils/toastUtils'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const FormCategory = ({ formCategories }) => {
  const [formCategoryModal, setFormCategoryModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [categories, setCategories] = useState(formCategories || [])
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
  }, [item, reset, userInfo])

  return (
    <>
      <button
        className=" mx-auto py-2 px-4 mb-2 bg-blue-800 hover:scale-105 text-white font-semibold rounded-[5px] text-center transition sm:my-10 my-8"
        onClick={(e) => {
          e.preventDefault()
          if (userInfo?.creatorId) {
            return showTeamMemberErrorToast()
          } else {
            setItem(null)
            setFormCategoryModal(true)
          }
        }}
      >
        Add a new Form category
      </button>
      <div className="bg-white rounded-[20px]">
        <FormCategoryTable
          formCategoryData={categories}
          title={'Form Category'}
          setEditModel={setFormCategoryModal}
          setItem={setItem}
          setRemoveModal={setDeleteModal}
          link={`/forms/formsByCategory?id=`}
          userInfo={userInfo}
        />
      </div>
      {formCategoryModal && (
        <CategoryModal
          openModal={formCategoryModal}
          setOpenModal={setFormCategoryModal}
          api={createFormCategoryApi}
          updateApi={updateFormCategoryApi}
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
          api={deleteFormCategoryById}
          setCategories={setCategories}
        />
      )}
    </>
  )
}

export default FormCategory

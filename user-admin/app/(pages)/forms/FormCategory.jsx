'use client'

import FormCategoryModal from '@/components/modals/FormModal/FormCategoryModal'
import FormCategoryTable from '@/components/tables/FormCategoryTable'
import { useState } from 'react'

const FormCategory = ({ formCategories }) => {
  const [formCategoryModal, setFormCategoryModal] = useState(false)
  return (
    <>
      <button
        className=" mx-auto py-2 px-4 mb-2 bg-blue-800 hover:scale-105 text-white font-semibold rounded-[5px] text-center transition sm:my-10 my-8"
        onClick={() => setFormCategoryModal(true)}
      >
        Add a new Form category
      </button>
      <div className="bg-white rounded-[20px]">
        <FormCategoryTable
          formCategoryData={formCategories}
          title={'Form Category'}
        />
      </div>
      {formCategoryModal && (
        <FormCategoryModal
          openModal={formCategoryModal}
          setOpenModal={setFormCategoryModal}
        />
      )}
    </>
  )
}

export default FormCategory

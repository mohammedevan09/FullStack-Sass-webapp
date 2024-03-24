'use client'

import FormCategoryTable from '@/components/tables/FormCategoryTable'

const FormCategory = ({ formCategories }) => {
  return (
    <div className="bg-white rounded-[20px] sm:my-8 my-6">
      <FormCategoryTable
        formCategoryData={formCategories}
        title={'Form Category'}
      />
    </div>
  )
}

export default FormCategory

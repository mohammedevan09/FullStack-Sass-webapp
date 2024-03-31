'use client'

import JsonToText from '@/lib/JsonToText'
import { FormsByCategoryIdIcon } from '@/staticData/Icon'
import Link from 'next/link'
import '../../../../components/text-editor/tiptapstyle.css'
import BackButton from '@/components/others/BackButton'

const MainFormsByCategory = ({ formCategory, forms, searchParams }) => {
  return (
    <div className="lg:w-full w-screen px-7 pt-8 overflow-x-scroll">
      <BackButton title={'Go Back'} link={'/forms'} />
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold">{formCategory?.name}</h1>
          <h2 className="text-base font-semibold text-gray-500">
            {formCategory?.description}
          </h2>
        </div>{' '}
        <Link
          href={`/forms/formsByCategory/new?categoryId=${searchParams?.id}`}
          className="w-[130px] h-[34px] btn-hover rounded-[5px] text-center flex items-center justify-center"
        >
          Create New +
        </Link>
      </div>
      <div className="bg-zinc-400 w-full h-[1px] mt-3 mb-6" />
      <div className="grid items-center gap-3">
        {forms?.map((item, i) => (
          <div key={item?._id} className="flex justify-between items-start">
            <div className="flex gap-2">
              <FormsByCategoryIdIcon />
              <div className="grid">
                <p className="font-semibold text-base">{item?.name}</p>
                <span className="text-sm text-gray-600 tiptap">
                  {JsonToText(item?.description, false)}
                </span>
              </div>
            </div>
            <Link
              href={`/forms/formsByCategory/${item?._id}?categoryId=${item?.formCategoryId}`}
              className="w-[120px] h-[34px] text-blue-500 hover:text-blue-700 hover:text-lg transition-1 duration-75 font-medium rounded-[5px] text-center"
            >
              View details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainFormsByCategory

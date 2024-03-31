'use client'

import ErrorMessage from '@/components/ErrorMessage'
import Input from '@/components/Input'
import Labels from '@/components/Labels'
import FormExample from '@/components/form-builder/FormExample'
import DeleteFormModal from '@/components/modals/FormModal/DeleteFormModal'
import BackButton from '@/components/others/BackButton'
import MainEditor from '@/components/text-editor/MainEditor'
import JsonToText from '@/lib/JsonToText'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const MainFormPage = ({ form, searchParams }) => {
  // console.log(form)
  const [text, setText] = useState('')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      ...form,
    },
    resetOptions: {
      keepDirtyValues: true,
    },
    mode: 'onChange',
  })

  return (
    <>
      <div className="sm:mt-16 mt-10 sm:mb-14 mb-8 w-full grid gap-6">
        <BackButton
          title={'Go Back'}
          link={`/forms/formsByCategory?id=${searchParams?.categoryId}`}
        />
        <div className="flex justify-between gap-3 items-center">
          <h1 className="sm:text-3xl text-2xl font-bold">
            {form?._id ? `Your Form ${form?.name}` : 'Add New Custom Form'}
          </h1>
          <button
            className={`py-1 px-4 bg-rose-600 rounded-[9px] text-white text-lg font-semibold leading-7 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition ${
              form?._id ? 'block' : 'hidden'
            }`}
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete form
          </button>
        </div>
        <div className="grid gap-5 bg-white rounded-lg sm:px-10 xs:px-5 px-2 py-4">
          <div className="grid">
            <Labels
              textSize={'text-sm'}
              htmlFor={'form-name'}
              name={'Form Name'}
            />
            <Input
              left={true}
              id={'form-name'}
              placeholder={'For your reference'}
              type={'text'}
              cn={'w-full'}
              cnb={'rounded-[4px] bg-[none] text-sm'}
              cnh={'h-[38px]'}
              borderColor={'border-[#cdcdcd]'}
              validationRules={{
                ...register('name', {
                  required: {
                    value: true,
                    message: 'Form name is required!',
                  },
                }),
              }}
            />
            <ErrorMessage errors={errors?.name} />
          </div>
          <div className="grid">
            <Labels
              textSize={'text-sm'}
              htmlFor={'form-info'}
              name={'Form Description '}
              optional={true}
            />
            <MainEditor
              setText={setText}
              defaultText={JsonToText(form.description)}
            />
          </div>
        </div>
        <div>
          <h2 className="font-bold sm:text-xl text-base text-gray-600 mt-4">
            Drag and drop fields into your form here…
          </h2>
          <FormExample
            handleSubmit={handleSubmit}
            form={form}
            text={text}
            isValid={isValid}
            reset={reset}
            isSubmitting={isSubmitting}
            searchParams={searchParams}
          />
        </div>
      </div>
      {openDeleteModal && (
        <DeleteFormModal
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          form={form}
          searchParams={searchParams}
        />
      )}
    </>
  )
}

export default MainFormPage

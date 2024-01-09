'use client'

import Input from '@/components/Input'
import Labels from '@/components/Labels'
import DndExample from '@/components/form-builder/DndExample'
import MainEditor from '@/components/text-editor/MainEditor'
import { useState } from 'react'

const MainFormPage = () => {
  const [text, setText] = useState('')

  // console.log(text)

  return (
    <div className="sm:mt-16 mt-10 sm:mb-14 mb-8 w-full grid gap-6">
      <h1 className="sm:text-3xl text-2xl font-bold">Add New Custom Form</h1>
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
          />
        </div>
        <div className="grid">
          <Labels
            textSize={'text-sm'}
            htmlFor={'form-info'}
            name={'Form Information'}
            optional={true}
          />
          <MainEditor setText={setText} />
        </div>
      </div>
      <h2 className="font-bold sm:text-xl text-base text-gray-600">
        Drag and drop fields into your form here…
      </h2>
      <DndExample />
    </div>
  )
}

export default MainFormPage

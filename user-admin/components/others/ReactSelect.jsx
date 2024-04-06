'use client'

import { useMemo, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

const ReactSelect = ({ data, placeholder, setValue }) => {
  const [val, setVal] = useState('')

  const formattedData = useMemo(() => {
    return data?.reduce((acc, curr) => {
      acc.push({
        value: curr?._id,
        label: curr?.name?.toUpperCase(),
      })
      return acc
    }, [])
  }, [data])

  const onChange = (selectedOption) => {
    setVal(selectedOption)
    setValue('form', selectedOption?.value, { shouldDirty: true })
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      width: '100%',
      boxShadow: 'none',
      padding: '0 4px',
      color: 'black',
      fontWeight: '600',
      border: 'none',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
      width: '100%',
      backgroundColor: 'white',
      fontSize: '14px',
      padding: '2px 9px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#000000bf',
      fontSize: '14px',
      padding: '2px 9px',
    }),
    input: (provided) => ({
      ...provided,
      color: 'black',
      fontSize: '14px',
      padding: '0px 9px',
      border: 'none',
      width: '100%',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
      width: '100%',
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: '4px 5px',
      backgroundColor: 'white',
      width: '100%',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      border: 'none',
      color: 'black',
      fontSize: '14px',
      padding: '2px 9px',
      '&:hover': {
        backgroundColor: '#dbdbdb',
        color: 'black',
        cursor: 'pointer',
      },
      fontWeight: '600',
    }),
  }

  const newPlaceholder = formattedData?.find((f) => f?.value === placeholder)

  return (
    <div className="flex items-center justify-between w-full border-b border-white mt-4">
      <Select
        isClearable
        options={formattedData}
        components={animatedComponents}
        value={val}
        onChange={onChange}
        styles={customStyles}
        closeMenuOnSelect={true}
        placeholder={
          (newPlaceholder && `Form running- ${newPlaceholder?.label}`) ||
          'Select form'
        }
        //   getOptionLabel={(option) => option.name}
        //   getOptionValue={(option) => option.id}
        //   className="react-select-container genresDD"
      />
    </div>
  )
}

export default ReactSelect

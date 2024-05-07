'use client'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

const ReactSelect = ({ data, onChange, val, placeholder }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      width: '100%',
      boxShadow: 'none',
      padding: '0 4px',
      color: 'black',
      fontWeight: '600',
      border: '1px solid #d1d5db',
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
      color: '#0000005e',
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

  return (
    <div className="w-full border-b border-white my-2">
      <Select
        isClearable
        options={data}
        components={animatedComponents}
        value={val}
        onChange={onChange}
        styles={customStyles}
        closeMenuOnSelect={true}
        placeholder={placeholder || 'Ex - Admin issue'}
      />
    </div>
  )
}

export default ReactSelect

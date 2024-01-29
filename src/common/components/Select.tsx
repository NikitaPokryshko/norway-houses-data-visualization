import React from 'react'

const Select = ({ options, onChange, value, disabledMap = {} }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <select
      name='from'
      autoComplete='from'
      className='cursor-pointer mt-1 mx-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm md:pe-8 py-1' // Added pr-8 for padding on the right
      onChange={handleChange}
      value={value}
    >
      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          disabled={disabledMap[opt.value]}
        >
          {opt.label}
        </option>
      ))}
    </select>
  )
}

export default Select

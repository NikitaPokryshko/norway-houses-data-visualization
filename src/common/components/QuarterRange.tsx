import React from 'react'
import Select from './Select'

const QuarterRange = ({
  from,
  to,
  options,
  handleFromChange,
  handleToChange,
}) => {
  const selectedToIndex = options.findIndex((o) => o.value === to)
  const disabledFromMap = options
    .slice(selectedToIndex + 1, options.length)
    .reduce((acc, cur) => {
      acc[cur.value] = true
      return acc
    }, {})

  return (
    <div className='sm:container sm:mx-auto'>
      <Select
        onChange={handleFromChange}
        value={from}
        options={options}
        disabledMap={disabledFromMap}
      />
      <Select onChange={handleToChange} value={to} options={options} />
    </div>
  )
}

export default QuarterRange

import React from 'react'
import Select from './Select'

const QuarterRange = ({ from, to, options, handleFromChange, handleToChange }) => {
  const selectedToIndex = options.findIndex(o => o.value === to);
  const disabledFromMap = options.slice(selectedToIndex + 1, options.length).reduce((acc, cur) => {
    acc[cur.value] = true
    return acc;
  }, {})

  return (
    <div className="container mx-auto md:container md:mx-auto ">
      <Select
        onChange={handleFromChange}
        value={from}
        options={options}
        disabledMap={disabledFromMap}
      />
      <Select
        onChange={handleToChange}
        value={to}
        options={options}
      />
    </div>
  );
}

export default QuarterRange;

import { Select, SelectItem } from '@nextui-org/react'
import React from 'react'

interface SelectInputProps {
  value: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
}

function SelectInput({ value, options, onChange }: SelectInputProps) {
  return (
    <Select
      onChange={(e) => {
        onChange(e.target.value)
      }}
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  )
}

export default SelectInput

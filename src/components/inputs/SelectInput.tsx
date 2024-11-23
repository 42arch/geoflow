import React from 'react'
import { Select, SelectItem } from '../ui/select'

interface SelectInputProps {
  value: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
}

function SelectInput({ value, options, onChange }: SelectInputProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => {
        onChange(v)
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

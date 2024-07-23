import { NumberInput as NumberInputType } from '@/helpers/types'
import { Input } from '@nextui-org/react'

interface NumberInputProps extends NumberInputType {
  value: number
  onChange: (value: number) => void
}

function NumberInput({ value, step, disabled, onChange }: NumberInputProps) {
  return (
    <Input
      type='number'
      step={step}
      value={String(value)}
      disabled={disabled}
      onChange={(e) => {
        onChange(Number(e.target.value))
      }}
      className='nodrag'
    />
  )
}

export default NumberInput

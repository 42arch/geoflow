import { NumberInput as NumberInputType } from '@/helpers/types'
import { Input } from '@nextui-org/react'

interface NumberInputProps extends NumberInputType {
  value: number
  onChange: (value: number) => void
}

function NumberInput({ value, step, precision, onChange }: NumberInputProps) {
  return (
    <Input
      type='number'
      step={step}
      value={String(value)}
      onChange={(e) => {
        onChange(Number(e.target.value))
      }}
      className='nodrag'
    />
  )
}

export default NumberInput

import { Input } from '@nextui-org/react'

function NumberInput({
  value,
  step,
  onChange
}: {
  value: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <Input
      type='number'
      variant='bordered'
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

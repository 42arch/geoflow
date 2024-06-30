import { Input } from '@/components/ui/input'

interface InputProps {
  value: number
  onChange: (value: number) => void
}

function NumberInput({ value, onChange }: InputProps) {
  return (
    <Input
      type='number'
      className='nodrag h-6'
      value={value}
      onChange={(e) => {
        onChange(Number(e.target.value))
      }}
    />
  )
}

export default NumberInput

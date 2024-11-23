import { TextInput as TextInputType } from '@/helpers/types'
import { Input } from '../ui/input'

interface TextInputProps extends TextInputType {
  value: string
  onChange: (value: string) => void
}

function TextInput({ value, disabled, onChange }: TextInputProps) {
  return (
    <Input
      value={value}
      disabled={disabled}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      className='nodrag'
    />
  )
}

export default TextInput

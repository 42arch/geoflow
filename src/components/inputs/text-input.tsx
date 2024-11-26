import { Input } from '../ui/input'

interface TextInputProps {
  value: string
  disabled?: boolean
  onChange: (value: string) => void
}

function TextInput({ value, disabled, onChange }: TextInputProps) {
  return (
    <div className='space-y-2'>
      <Input
        value={value}
        disabled={disabled}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        className='nodrag'
      />
    </div>
  )
}

export default TextInput

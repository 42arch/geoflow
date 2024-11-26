import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SelectOption } from '@/types'

interface SelectInputProps {
  value: string
  options: SelectOption[]
  disabled?: boolean
  onChange: (v: string) => void
}

function SelectInput({ value, options, disabled, onChange }: SelectInputProps) {
  return (
    <div className='space-y-2'>
      <Select defaultValue={value} disabled={disabled} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder='Select option' />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectInput

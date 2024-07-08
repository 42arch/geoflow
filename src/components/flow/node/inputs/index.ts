import { Input } from '@/helpers/types'
import NumberInput from './NumberInput'
import DataInput from './DataInput'

export const InputMap: Record<Input['kind'], () => JSX.Element> = {
  number: NumberInput,
  color: NumberInput,
  data: DataInput
}

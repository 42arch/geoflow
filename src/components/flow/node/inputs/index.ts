import { Input } from '@/helpers/types'
import NumberInput from './NumberInput'

export const InputMap: Record<Input['kind'], () => JSX.Element> = {
  number: NumberInput,
  color: NumberInput
}

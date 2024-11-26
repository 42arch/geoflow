import { NodeFunction, SelectOption } from '@/types'

export enum MathOperation {
  ADD = 'add',
  SUBTRACT = 'sub',
  MULTIPLY = 'mul',
  DIVIDE = 'div',
  POWER = 'pow',
  LOG = 'log',
  MAXIMUM = 'max',
  MINIMUM = 'min',
  MODULO = 'mod',
  PERCENT = 'percent'
}

export const MATH_OPERATION_OPTIONS: SelectOption[] = [
  { label: 'Add: a + b', value: MathOperation.ADD },
  { label: 'Substract: a - b', value: MathOperation.SUBTRACT },
  { label: 'Multiply: a × b', value: MathOperation.MULTIPLY },
  { label: 'Divide: a ÷ b', value: MathOperation.DIVIDE },
  { label: 'Exponent: a ^ b', value: MathOperation.POWER },
  { label: 'Maximun: max(a, b)', value: MathOperation.MAXIMUM },
  { label: 'Minimum: min(a, b)', value: MathOperation.MINIMUM }
]

export const MATH_OPERATION_VALUE = MATH_OPERATION_OPTIONS[0].value

const math: NodeFunction = (a: number, operation: string, b: number) => {
  switch (operation) {
    case MathOperation.ADD:
      return [a + b]
    case MathOperation.SUBTRACT:
      return [a - b]
    case MathOperation.MULTIPLY:
      return [a * b]
    case MathOperation.DIVIDE:
      return [a / b]
    case MathOperation.POWER:
      return [Math.pow(a, b)]
    case MathOperation.MAXIMUM:
      return [Math.max(a, b)]
    case MathOperation.MINIMUM:
      return [Math.min(a, b)]
    default:
      return []
  }
}

export default math

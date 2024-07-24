import { Input, NodeState } from '@/helpers/types'
import math from './math'

export const nodeSchemaToFn: Record<string, (inputs: Input[]) => void> = {
  math: (inputs) =>
    math(
      inputs[1].value as string,
      inputs[0].value as number,
      inputs[2].value as number
    )
}

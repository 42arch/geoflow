import { NodeState } from '@/helpers/types'
import math from './math'

export const nodeSchemaToFn: Record<string, (node: NodeState) => void> = {
  // 'math': (node) => math(node.inputs[1], )
}

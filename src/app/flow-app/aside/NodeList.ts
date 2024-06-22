import { NodeState } from '@/helpers/types'

const NodeList: NodeState[] = [
  {
    name: 'number',
    schemaId: 'number',
    inputs: [
      {
        type: 'Number',
        value: 0,
        hasHandle: true
      }
    ],
    outputs: [
      {
        type: 'Number',
        value: 0,
        hasHandle: true
      }
    ]
  },
  {
    name: 'Parse Number',
    schemaId: 'parse-number',
    inputs: [
      {
        type: 'Number',
        value: 0,
        hasHandle: true
      }
    ],
    outputs: [
      {
        type: 'Number',
        value: 0,
        hasHandle: true
      }
    ]
  }
]

export default NodeList

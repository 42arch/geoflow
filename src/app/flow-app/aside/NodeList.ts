import { NodeState } from '@/helpers/types'

const NodeList: NodeState[] = [
  {
    name: 'number',
    schemaId: 'number',
    inputs: [
      {
        kind: 'number',
        default: 0,
        precision: 1,
        step: 1,
        id: 0,
        label: '数字',
        description: '输入数字',
        optional: false,
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
    name: 'Color',
    schemaId: 'color',
    inputs: [
      {
        kind: 'number',
        default: 0,
        precision: 1,
        step: 1,
        id: 0,
        label: 'R: ',
        description: '输入r',
        optional: false,
        hasHandle: true
      },
      {
        kind: 'number',
        default: 0,
        precision: 1,
        step: 1,
        id: 1,
        label: 'G: ',
        description: '输入g',
        optional: false,
        hasHandle: true
      },
      {
        kind: 'number',
        default: 0,
        precision: 1,
        step: 1,
        id: 2,
        label: 'B: ',
        description: '输入b',
        optional: false,
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

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
        hasHandle: false
      }
    ],
    outputs: [
      {
        id: 0,
        kind: 'number',
        value: 0,
        hasHandle: true
      }
    ],
    func: (inputs: number) => {
      return inputs + 2
    }
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
        id: 0,
        kind: 'color',
        value: undefined,
        hasHandle: true
      }
    ],
    func: (inputs: [number, number, number]) => {
      return `rgb(${(inputs[0], inputs[1], inputs[2])})`
    }
  },
  {
    name: 'Display',
    schemaId: 'display',
    hasEffect: true,
    inputs: [
      {
        kind: 'data',
        id: 0,
        label: '',
        description: '显示数据',
        optional: false,
        hasHandle: true
      }
    ],
    outputs: [
      {
        kind: 'Display',
        id: 0,
        hasHandle: false,
        value: undefined
      }
    ]
  }
]

export default NodeList

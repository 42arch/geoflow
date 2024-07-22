import type { NodeState } from './types'

export const NODE_LIST: NodeState[] = [
  {
    name: 'Test Node',
    type: 'TEST_NODE',
    schemaId: 'TEST_NODE',
    inputs: [
      {
        id: 1,
        kind: 'number',
        label: '数字输入',
        hasHandle: true,
        defaultValue: 0,
        precision: 1,
        step: 0.1
      },
      {
        id: 2,
        kind: 'number',
        label: '数字输入2',
        hasHandle: true,
        defaultValue: 0,
        precision: 1,
        step: 10
      }
    ],
    outputs: [
      {
        id: 1,
        kind: 'number',
        hasHandle: true,
        value: 0
      }
    ]
  },
  {
    name: 'Number Node',
    type: 'NUMBER_NODE',
    schemaId: 'NUMBER_NODE',
    inputs: [
      {
        id: 1,
        kind: 'number',
        label: '数字输入',
        hasHandle: false,
        defaultValue: 0,
        precision: 1,
        step: 0.1
      }
    ],
    outputs: [
      {
        id: 1,
        kind: 'number',
        hasHandle: true,
        value: 0
      }
    ]
  }
  // {
  //   name: 'Handle Node',
  //   type: 'HANDLE_NODE'
  // },
  // {
  //   name: 'View Node',
  //   type: 'VIEW_NODE'
  // }
]

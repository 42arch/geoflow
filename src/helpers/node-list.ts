import type { NodeState } from './types'
import { MATH_OPERATION_OPTIONS } from '@/functions/math'
import { TEST_DATA_OPTIONS } from '@/functions/test-data'

export const NODE_LIST: NodeState[] = [
  {
    name: 'Test Data',
    type: 'TEST_DATA',
    schemaId: 'test_data',
    inputs: [
      {
        id: 1,
        kind: 'select',
        label: 'select data',
        value: '',
        hasHandle: false,
        options: TEST_DATA_OPTIONS
      }
    ],
    outputs: [
      {
        id: 1,
        kind: 'table',
        hasHandle: true,
        value: []
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
        value: 0,
        precision: 1,
        step: 0.1
      }
    ],
    outputs: [
      {
        id: 1,
        kind: 'generic',
        hasHandle: true,
        value: 0
      }
    ]
  },
  {
    name: 'Math Node',
    type: 'MATH_NODE',
    schemaId: 'math',
    inputs: [
      {
        id: 1,
        kind: 'number',
        label: '数字输入',
        hasHandle: true,
        value: 0,
        precision: 1,
        step: 1
      },
      {
        id: 2,
        kind: 'select',
        label: '操作',
        value: '',
        hasHandle: false,
        options: MATH_OPERATION_OPTIONS
      },
      {
        id: 2,
        kind: 'number',
        label: '数字输入',
        hasHandle: true,
        value: 0,
        precision: 1,
        step: 1
      }
    ],
    outputs: [
      {
        id: 1,
        kind: 'generic',
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

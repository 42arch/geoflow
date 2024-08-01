import { STRING_FILTER_OPTIONS } from '@/functions/filter'
import type { DataSet, NodeState } from './types'
import { MATH_OPERATION_OPTIONS } from '@/functions/math'
import { TEST_DATA_OPTIONS } from '@/functions/test-data'

const DEFAULT_DATASET_VALUE: DataSet = {
  data: [],
  properties: {
    columns: []
  }
}

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
        value: TEST_DATA_OPTIONS[0].value,
        hasHandle: false,
        options: TEST_DATA_OPTIONS
      }
    ],
    outputs: [
      {
        id: 1,
        kind: 'dataset',
        hasHandle: true,
        value: DEFAULT_DATASET_VALUE
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
        value: MATH_OPERATION_OPTIONS[0].value,
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
  },
  {
    name: 'Filter Node',
    type: 'FILTER_NODE',
    schemaId: 'filter',
    inputs: [
      {
        id: 1,
        kind: 'dataset',
        label: '数据集输入',
        hasHandle: true,
        value: DEFAULT_DATASET_VALUE
      },
      {
        id: 2,
        kind: 'select',
        label: '数据集列名',
        value: '',
        hasHandle: false,
        hasDynamicOptions: true,
        dynamicOptionsDependency: [1, 'properties.columns'],
        // dependencyId: 1,
        // deppendecyField: 'properties.columns',
        options: []
      },
      {
        id: 3,
        kind: 'select',
        label: '操作',
        value: STRING_FILTER_OPTIONS[0].value,
        hasHandle: false,
        options: STRING_FILTER_OPTIONS
      },
      {
        id: 4,
        kind: 'text',
        label: '条件值',
        hasHandle: true,
        value: ''
      }
    ],
    outputs: [
      {
        id: 1,
        kind: 'dataset',
        hasHandle: true,
        value: DEFAULT_DATASET_VALUE
      }
    ]
  },
  {
    name: 'Table View',
    type: 'TABLE_VIEW',
    schemaId: 'table-view',
    inputs: [
      {
        id: 1,
        kind: 'dataset',
        label: '数据集输入',
        hasHandle: true,
        value: DEFAULT_DATASET_VALUE
      }
    ],
    outputs: [
      {
        id: 1,
        kind: 'table-view',
        hasHandle: false,
        value: DEFAULT_DATASET_VALUE
      }
    ]
  }
]

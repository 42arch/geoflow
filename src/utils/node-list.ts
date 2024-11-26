import geojsonFile from '@/functions/geojson-file'
import math, {
  MATH_OPERATION_OPTIONS,
  MATH_OPERATION_VALUE
} from '@/functions/math'
import simplify from '@/functions/simplify'
import { NodeData } from '@/types'

export const NODE_LIST: NodeData[] = [
  {
    type: 'geojson-file',
    hasEffect: true,
    func: geojsonFile,
    inputs: [
      {
        id: 'file-input',
        hasHandle: false,
        label: 'geojson',
        labelPosition: 'top',
        kind: 'geojson-file',
        value: null
      }
    ],
    outputs: [
      {
        id: '',
        hasHandle: true,
        kind: 'geojson',
        value: null
      },
      {
        id: '',
        hasHandle: true,
        kind: 'text',
        value: ''
      }
    ]
  },
  {
    type: 'simplify',
    hasEffect: true,
    func: simplify,
    inputs: [
      {
        id: 'simplify-input',
        hasHandle: true,
        kind: 'geojson',
        value: null
      },
      {
        id: 'simplify-tolerance',
        hasHandle: true,
        label: 'Tolerance',
        kind: 'number',
        step: 0.1,
        minValue: 0,
        maxValue: 100,
        value: 1
      },
      {
        id: '',
        hasHandle: false,
        label: 'High Quality',
        kind: 'boolean',
        value: false
      }
    ],
    outputs: [
      {
        id: 'geojson-output',
        hasHandle: true,
        kind: 'geojson',
        value: null
      }
    ]
  },
  {
    type: 'number',
    hasEffect: true,
    func: (v: number) => [v],
    inputs: [
      {
        id: '',
        hasHandle: true,
        label: 'num',
        kind: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: '',
        hasHandle: true,
        kind: 'number',
        value: 0
      }
    ]
  },
  {
    type: 'text',
    hasEffect: true,
    func: (v: string) => [v],
    inputs: [
      {
        id: '',
        hasHandle: true,
        kind: 'text',
        value: ''
      }
    ],
    outputs: [
      {
        id: '',
        hasHandle: true,
        kind: 'text',
        value: ''
      }
    ]
  },
  {
    type: 'math',
    hasEffect: true,
    func: math,
    inputs: [
      {
        id: '',
        hasHandle: true,
        label: 'Number A',
        kind: 'number',
        value: 0
      },
      {
        id: '',
        hasHandle: false,
        label: 'Operation',
        kind: 'select',
        options: MATH_OPERATION_OPTIONS,
        value: MATH_OPERATION_VALUE
      },
      {
        id: '',
        hasHandle: true,
        label: 'Number B',
        kind: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: '',
        hasHandle: true,
        kind: 'number',
        value: 0
      }
    ]
  },
  {
    type: 'add-ten',
    hasEffect: true,
    func: (v: number) => [v + 10],
    inputs: [
      {
        id: 'add-ten-number-input',
        hasHandle: true,
        label: 'input',
        kind: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: 'add-ten-number-outout',
        hasHandle: true,
        kind: 'number',
        value: 0
      }
    ]
  },
  {
    type: 'long-time-add',
    hasEffect: true,
    func: (v: number) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([v + 10])
        }, 5000)
      }),
    inputs: [
      {
        id: 'long-time-add-number-input',
        hasHandle: true,
        label: 'input',
        kind: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: 'long-time-add-number-outout',
        hasHandle: true,
        kind: 'number',
        value: 0
      }
    ]
  },
  {
    type: 'number-viewer',
    hasEffect: true,
    func: (v: number) => [v],
    inputs: [
      {
        id: 'viewer-input',
        hasHandle: true,
        label: '',
        kind: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: 'viewer-output',
        hasHandle: true,
        kind: 'number',
        value: 0
      }
    ]
  },
  {
    type: 'geojson-viewer',
    hasEffect: true,
    func: (v: object) => [v],
    inputs: [
      {
        id: '',
        hasHandle: true,
        kind: 'geojson',
        value: null
      }
    ],
    outputs: [
      {
        id: '',
        hasHandle: false,
        kind: 'geojson-viewer',
        value: null
      }
    ]
  }
]

import { NodeData } from '@/types'
import { simplify } from '@turf/turf'

export const NODE_LIST: NodeData[] = [
  {
    type: 'geojson-file',
    hasEffect: true,
    isPending: false,
    func: (v: any) => [v],
    inputs: [
      {
        id: 'file-input',
        hasHandle: false,
        label: 'geojson',
        kind: 'geojson-file',
        value: null
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
    type: 'simplify',
    hasEffect: true,
    isPending: false,
    func: (...args: any) => [simplify(args[0], { tolerance: args[1] })],
    inputs: [
      {
        id: 'simplify-input',
        hasHandle: true,
        label: 'geojson',
        kind: 'geojson',
        value: null
      },
      {
        id: 'simplify-tolerance',
        hasHandle: true,
        label: 'tolerance',
        kind: 'number',
        step: 0.1,
        minValue: 0,
        maxValue: 10,
        value: 0.1
      },
      {
        id: '',
        hasHandle: false,
        label: 'highQuality',
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
    isPending: false,
    func: (v: number) => [v],
    inputs: [
      {
        id: 'number-number-input',
        hasHandle: true,
        label: 'num',
        kind: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: 'number-number-outout',
        hasHandle: true,
        kind: 'number',
        value: 0
      }
    ]
  },
  {
    type: 'add-ten',
    hasEffect: true,
    isPending: false,
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
    isPending: false,
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
    type: 'add-number',
    hasEffect: true,
    isPending: false,
    func: (v1: number, v2: number) => [v1 + v2],
    inputs: [
      {
        id: 'add-number-input-1',
        hasHandle: true,
        label: 'input 1',
        kind: 'number',
        value: 0
      },
      {
        id: 'add-number-input-2',
        hasHandle: true,
        label: 'input 2',
        kind: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: 'add-number-output',
        hasHandle: true,
        kind: 'number',
        value: 0
      }
    ]
  },
  {
    type: 'number-viewer',
    hasEffect: true,
    isPending: false,
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
    isPending: false,
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

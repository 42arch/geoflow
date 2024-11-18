import { NodeData } from '@/types'

export const NODE_LIST: NodeData[] = [
  {
    type: 'number',
    hasEffect: true,
    isPending: false,
    func: (v: number) => [v],
    inputs: [
      {
        id: 'number-number-input',
        hasHandle: true,
        type: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: 'number-number-outout',
        hasHandle: true,
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
        type: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: 'add-ten-number-outout',
        hasHandle: true,
        value: 0
      }
    ]
  },
  {
    type: 'add-ten-two',
    hasEffect: true,
    isPending: false,
    func: (v: number) => [v, v + 10],
    inputs: [
      {
        id: 'add-ten-number-input',
        hasHandle: true,
        type: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: 'add-ten-number-outout',
        hasHandle: true,
        value: 0
      },
      {
        id: 'add-ten-number-outout',
        hasHandle: true,
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
        type: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: 'long-time-add-number-outout',
        hasHandle: true,
        value: 0
      }
    ]
  },
  {
    type: 'multify-four',
    hasEffect: true,
    isPending: false,
    func: (v: number) => [v * 4],
    inputs: [
      {
        id: 'multify-four-input',
        hasHandle: true,
        type: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: 'multify-four-output',
        hasHandle: true,
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
        type: 'number',
        value: 0
      },
      {
        id: 'add-number-input-2',
        hasHandle: true,
        type: 'number',
        value: 0
      }
    ],
    outputs: [
      {
        id: 'add-number-output',
        hasHandle: true,
        value: 0
      }
    ]
  },
  {
    type: 'viewer',
    hasEffect: true,
    isPending: false,
    func: (v: number) => [v],
    inputs: [{ id: 'viewer-input', hasHandle: true, type: 'number', value: 0 }],
    outputs: [
      {
        id: 'viewer-output',
        hasHandle: true,
        value: 0
      }
    ]
  }
]

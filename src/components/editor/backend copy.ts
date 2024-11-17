import { MATH_OPERATION_OPTIONS } from '@/functions/math'
import { SelectOption } from '@/helpers/types'
import { createId } from '@/utils/create-id'
import {
  Edge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  Node
} from '@xyflow/react'
import { cloneDeep } from 'lodash-es'

export type NumberInput = {
  id: string
  hasHandle: boolean
  type: 'number'
  value: number
}

export type SelectInput = {
  id: string
  hasHandle: boolean
  type: 'select'
  options: SelectOption[]
  value: string
}

export type Input = NumberInput | SelectInput
export type Output = { id: string; hasHandle: boolean; value: any }

export type NodeData = {
  type: string
  hasEffect: boolean
  isPending?: boolean
  func: (...args: any[]) => void
  inputs: Input[]
  outputs: Output[]
}

export const NODE_LIST: NodeData[] = [
  {
    type: 'number',
    hasEffect: true,
    isPending: false,
    func: (v: number) => v,
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
    func: (v: number) => v + 10,
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
    type: 'long-time-add',
    hasEffect: true,
    isPending: false,
    func: (v: number) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(v + 10)
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
    func: (v: number) => v * 4,
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
    func: (v1: number, v2: number) => v1 + v2,
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
    func: (v: number) => v,
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

type Callback = (data: {
  status: 'finish' | 'running' | 'paused'
  node: Node<NodeData>
}) => void

export class Executor {
  public status: 'finish' | 'running' | 'paused'
  private nodes: Node<NodeData>[]
  private edges: Edge[]
  private nodesMap: Map<string, Node<NodeData>>
  private edgesMap: Map<string, Edge>
  private currentNode: Node<NodeData>
  private nodePromises: Map<string, Promise<void>>
  private callback: Callback | undefined

  constructor(nodes: Node<NodeData>[], edges: Edge[]) {
    this.status = 'finish'
    this.nodes = nodes
    this.edges = edges
    this.nodesMap = new Map(nodes.map((node) => [node.id, node]))
    this.edgesMap = new Map(edges.map((edge) => [edge.id, edge]))
    this.currentNode = nodes[0]

    this.nodePromises = new Map()
  }

  watch(callback: Callback) {
    this.callback = callback
  }

  async run() {
    this.status = 'running'
    this.pendingAllNodes()
    const startNodes = this.getStartNodes()
    console.log('start', startNodes)
    for (let node of startNodes) {
      await this.handleNode(node)
    }
  }

  update(nodes: Node<NodeData>[], edges: Edge[]) {
    this.nodes = nodes
    this.edges = edges
    // console.log('update', this.nodes, this.edges)

    this.currentNode = nodes[0]
  }

  async handleNode(node: Node<NodeData>) {
    this.currentNode = node
    const currentNode = node
    const prevNodes = getIncomers(currentNode, this.nodes, this.edges)

    // 等待所有前置节点完成
    if (prevNodes.length > 0) {
      try {
        await Promise.all(prevNodes.map((n) => this.nodePromises.get(n.id)))
      } catch (error) {
        console.error('Error waiting for previous nodes:', error)
      }
    }

    // 为当前节点创建一个Promise
    const nodePromise = (async () => {
      const { inputs, outputs, func } = currentNode.data
      const inputValues = inputs.map((i) => i.value)
      const result = await func(...inputValues)
      const newNode = cloneDeep(currentNode)
      const nextNodes = getOutgoers(currentNode, this.nodes, this.edges)

      const newOutput = outputs[0]
      newOutput.value = result

      newNode.data = {
        ...currentNode.data,
        outputs: [newOutput]
      }

      newNode.data.isPending = false
      this.callback?.({
        status: this.status,
        node: newNode
      })
      if (nextNodes.length) {
        for (let nextNode of nextNodes) {
          const edges = getConnectedEdges([newNode, nextNode], this.edges)
          for (let edge of edges) {
            const output = newNode.data.outputs.find(
              (o) => o.id === edge.sourceHandle
            )
            if (output) {
              nextNode.data.inputs.forEach((i) => {
                if (i.id === edge.targetHandle) {
                  i.value = output?.value
                }
              })
            }
          }
          this.handleNode(nextNode)
        }
      }
    })()

    // 存储当前节点的Promise
    this.nodePromises.set(node.id, nodePromise)

    // 执行并等待完成
    await nodePromise
  }

  getStartNodes() {
    const inDegree: Record<string, number> = {}

    this.nodes.forEach((node) => {
      inDegree[node.id] = 0
    })
    this.edges.forEach((edge) => {
      inDegree[edge.target]++
    })

    return this.nodes.filter((node) => inDegree[node.id] === 0)
  }

  pendingAllNodes() {
    this.nodes.forEach((node) => {
      this.callback?.({
        status: this.status,
        node: node
      })
      node.data.isPending = true
    })
  }
}

import EventEmitter from '@/core/event-emitter'
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
  private currentNode: Node<NodeData>
  private pausedQueue: Node<NodeData>[] = []
  private eventEmitter: EventEmitter
  private callback: Callback | undefined

  constructor(nodes: Node<NodeData>[], edges: Edge[]) {
    this.eventEmitter = new EventEmitter()
    this.status = 'finish'
    this.nodes = nodes
    this.edges = edges
    // this.nodesMap = new Map(nodes.map((node) => [node.id, node]))
    // this.edgesMap = new Map(edges.map((edge) => [edge.id, edge]))
    this.currentNode = nodes[0]
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
    // 如果当前是暂停状态，将节点加入暂停队列
    if (this.status === 'paused') {
      if (!this.pausedQueue.some((n) => n.id === node.id)) {
        this.pausedQueue.push(node)
      }
      return
    }

    this.currentNode = node
    const currentNode = node
    const prevNodes = getIncomers(currentNode, this.nodes, this.edges)

    // 如果有pending的前置节点，订阅它们的完成事件
    if (prevNodes.some((n) => n.data.isPending)) {
      const handlePrevNodesComplete = () => {
        // 检查所有前置节点是否都完成
        if (!prevNodes.some((n) => n.data.isPending)) {
          // 所有前置节点都完成了，执行当前节点
          this.executeNode(currentNode)
        }
      }

      // 订阅所有前置节点的完成事件
      prevNodes.forEach((prevNode) => {
        this.eventEmitter.on(
          `nodeComplete:${prevNode.id}`,
          handlePrevNodesComplete
        )
      })
      return
    }

    // 如果没有pending的前置节点，直接执行
    await this.executeNode(currentNode)
  }

  private async executeNode(node: Node<NodeData>) {
    // 如果是暂停状态，将节点加入暂停队列并返回
    console.log('status', this.status)
    if (this.status === 'paused') {
      if (!this.pausedQueue.some((n) => n.id === node.id)) {
        this.pausedQueue.push(node)
      }
      return
    }

    const { inputs, outputs, func } = node.data
    const inputValues = inputs.map((i) => i.value)

    try {
      const result = await func(...inputValues)
      const newNode = cloneDeep(node)
      const newOutput = outputs[0]
      newOutput.value = result

      newNode.data = {
        ...node.data,
        outputs: [newOutput],
        isPending: false
      }

      // 更新节点状态
      this.callback?.({
        status: this.status,
        node: newNode
      })

      // 更新 nodes 数组中的节点状态
      const nodeIndex = this.nodes.findIndex((n) => n.id === node.id)
      if (nodeIndex !== -1) {
        this.nodes[nodeIndex] = newNode
      }

      // 通知节点完成
      this.eventEmitter.emit(`nodeComplete:${node.id}`, newNode)

      // 处理后续节点
      const nextNodes = getOutgoers(newNode, this.nodes, this.edges)
      for (const nextNode of nextNodes) {
        // if (this.status === 'paused') {
        //   if (!this.pausedQueue.some((n) => n.id === nextNode.id)) {
        //     // 在添加到暂停队列前更新输入值
        //     this.updateNodeInputs(nextNode)
        //     this.pausedQueue.push(nextNode)
        //   }
        //   continue
        // }

        // 更新下一个节点的输入值
        this.updateNodeInputs(nextNode)
        await this.handleNode(nextNode)
      }
    } catch (error) {
      console.error('Error executing node:', error)
    }
  }

  cleanup() {
    // 清理所有事件监听
    this.nodes.forEach((node) => {
      this.eventEmitter.off(`nodeComplete:${node.id}`, () => {})
    })
  }

  pause() {
    this.status = 'paused'
  }

  resume() {
    this.status = 'running'

    // 按照正确的依赖顺序处理暂停队列中的节点
    const nodesToProcess = this.sortNodesByDependencies(this.pausedQueue)
    this.pausedQueue = []

    // 继续执行暂停的节点
    nodesToProcess.forEach((node) => {
      // 更新节点的输入值
      this.updateNodeInputs(node)
      this.handleNode(node)
    })

    this.eventEmitter.emit('executionResumed')
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

  // 添加节点排序方法
  private sortNodesByDependencies(nodes: Node<NodeData>[]): Node<NodeData>[] {
    const sorted: Node<NodeData>[] = []
    const visited = new Set<string>()

    const visit = (node: Node<NodeData>) => {
      if (visited.has(node.id)) return
      visited.add(node.id)

      // 先处理前置节点
      const prevNodes = getIncomers(node, this.nodes, this.edges)
      prevNodes.forEach((prevNode) => {
        if (nodes.some((n) => n.id === prevNode.id)) {
          visit(prevNode)
        }
      })

      sorted.push(node)
    }

    nodes.forEach((node) => visit(node))
    return sorted
  }

  // 添加更新节点输入值的方法
  private updateNodeInputs(node: Node<NodeData>) {
    const prevNodes = getIncomers(node, this.nodes, this.edges)

    prevNodes.forEach((prevNode) => {
      const edges = getConnectedEdges([prevNode, node], this.edges)
      edges.forEach((edge) => {
        const output = prevNode.data.outputs.find(
          (o) => o.id === edge.sourceHandle
        )
        if (output) {
          const input = node.data.inputs.find((i) => i.id === edge.targetHandle)
          if (input) {
            input.value = output.value
          }
        }
      })
    })
  }
}

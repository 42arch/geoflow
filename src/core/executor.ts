import { EdgeType, NodeType } from '@/types'
import { getConnectedEdges, getIncomers, getOutgoers } from '@xyflow/react'
import { cloneDeep } from 'lodash-es'
import EventEmitter from './event-emitter'

type Status = 'running' | 'paused' | 'idle'

type Callback = (data: { status: Status; node: NodeType }) => void

export class Executor {
  public status: Status
  private nodes: NodeType[]
  private edges: EdgeType[]
  private pausedQueue: NodeType[] = []
  private eventEmitter: EventEmitter
  private callback: Callback | undefined
  private controller: AbortController

  constructor(nodes: NodeType[], edges: EdgeType[]) {
    this.eventEmitter = new EventEmitter()
    this.status = 'idle'
    this.nodes = nodes
    this.edges = edges
    this.controller = new AbortController()
  }

  public watch(callback: Callback) {
    this.callback = callback
  }

  public async run() {
    this.status = 'running'
    this.pendingAllNodes()
    const startNodes = this.getStartNodes()
    for (let node of startNodes) {
      await this.handleNode(node)
    }
  }

  public update(nodes: NodeType[], edges: EdgeType[]) {
    this.nodes = nodes
    this.edges = edges
  }

  private async handleNode(node: NodeType) {
    // if the status of executor is paused, push this node to the paused queue, and then do nothing.
    if (this.status === 'paused') {
      if (!this.pausedQueue.some((n) => n.id === node.id)) {
        this.pausedQueue.push(node)
      }
      return
    }

    const currentNode = node
    // const prevNodes = getIncomers(currentNode, this.nodes, this.edges)
    // if (prevNodes.some((n) => n.data.isPending)) {
    //   const handlePrevNodesComplete = async () => {
    //     if (!prevNodes.some((n) => n.data.isPending)) {
    //       await this.executeNode(currentNode)
    //     }
    //   }

    //   for (let prevNode of prevNodes) {
    //     this.eventEmitter.on(
    //       `nodeComplete:${prevNode.id}`,
    //       handlePrevNodesComplete
    //     )
    //   }

    //   return
    // }

    await this.executeNode(currentNode)
  }

  private async executeNode(node: NodeType) {
    if (this.status === 'paused') {
      if (!this.pausedQueue.some((n) => n.id === node.id)) {
        this.pausedQueue.push(node)
      }
      return
    }

    const { inputs, outputs, func } = node.data
    const inputValues = inputs.map((i) => i.value)

    try {
      // const result = await func(...inputValues)
      const result = (await this.asyncFunc(
        func,
        inputValues
      )) as unknown as any[]
      const newNode = cloneDeep(node)

      const newOutputs = outputs.map((output, idx) => {
        return {
          ...output,
          value: result[idx]
        }
      })

      newNode.data = {
        ...node.data,
        outputs: newOutputs,
        isPending: false
      }

      // update node
      this.callback?.({
        status: this.status,
        node: newNode
      })

      // 更新 nodes 数组中的节点状态
      const nodeIndex = this.nodes.findIndex((n) => n.id === node.id)
      if (nodeIndex !== -1) {
        this.nodes[nodeIndex] = newNode
      }

      // 处理后续节点
      const nextNodes = getOutgoers(newNode, this.nodes, this.edges)
      for (const nextNode of nextNodes) {
        this.updateNodeInputs(nextNode)
        await this.handleNode(nextNode)
      }
    } catch (error) {
      console.error('Error executing node:', error)
    }
  }

  public cleanup() {
    // 清理所有事件监听
    this.nodes.forEach((node) => {
      this.eventEmitter.off(`nodeComplete:${node.id}`, () => {})
    })
  }

  public pause() {
    this.status = 'paused'
  }

  public resume() {
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
  }

  // Get all start nodes: if a node have no source handle, it's a start node.
  private getStartNodes() {
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

  //
  private sortNodesByDependencies(nodes: NodeType[]): NodeType[] {
    const sorted: NodeType[] = []
    const visited = new Set<string>()

    const visit = (node: NodeType) => {
      if (visited.has(node.id)) return
      visited.add(node.id)

      // 先处理前置节点
      const prevNodes = getIncomers(node, this.nodes, this.edges)
      for (let prevNode of prevNodes) {
        if (nodes.some((n) => n.id === prevNode.id)) {
          visit(prevNode)
        }
      }

      sorted.push(node)
    }

    nodes.forEach((node) => visit(node))
    return sorted
  }

  // Using the outputs of previous nodes to update the input value of the current node.
  private updateNodeInputs(node: NodeType) {
    const prevNodes = getIncomers(node, this.nodes, this.edges)

    for (let prevNode of prevNodes) {
      const edges = getConnectedEdges([prevNode, node], this.edges)
      for (let edge of edges) {
        const output = prevNode.data.outputs.find(
          (o) => o.id === edge.sourceHandle
        )
        if (output) {
          const input = node.data.inputs.find((i) => i.id === edge.targetHandle)
          if (input) {
            input.value = output.value
          }
        }
      }
    }
  }

  private asyncFunc(func: (...args: any[]) => void, values: any[]) {
    const promise = Promise.resolve().then(() => {
      try {
        return func(...values)
      } catch (error) {
        return Promise.reject(error)
      }
    })
    return promise
  }
}

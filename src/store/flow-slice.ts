import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  getOutgoers
} from 'reactflow'
import { StateCreator } from 'zustand'

export interface FlowSlice {
  nodes: Node<any>[]
  edges: Edge<any>[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  // onDrop: DragEventHandler<HTMLDivElement>
  addNode: (node: Node<any>) => void
  updateNode: (node: Node<any>) => void
  setNodes: (nodes: Node<any>[]) => void
  setEdges: (edges: Edge<any>[]) => void
}

export const createFlowSlice: StateCreator<FlowSlice, [], [], FlowSlice> = (
  set,
  get
) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    })
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges)
    })
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges)
    })
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    })
  },
  updateNode: (node) => {
    const oldNodes = get().nodes
    const edges = get().edges
    const targets = getOutgoers(node, oldNodes, edges)

    const newNodes = oldNodes.map((n) => {
      if (n.id === node.id) {
        return {
          ...n,
          data: {
            ...node.data
          }
        }
      }
      if (targets.find((o) => o.id === n.id)) {
        return {
          ...n,
          data: {
            ...n.data,
            input: node.data.output
          }
        }
      }

      return n
    })

    set({
      nodes: newNodes
    })
  },
  setNodes: (nodes: Node[]) => set({ nodes }),
  setEdges: (edges: Edge[]) => set({ edges })
})

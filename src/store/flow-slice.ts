import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges
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
    const oldNodes = get().nodes.filter((n) => n.id != node.id)
    set({
      nodes: [...oldNodes, node]
    })
  },
  setNodes: (nodes: Node[]) => set({ nodes }),
  setEdges: (edges: Edge[]) => set({ edges })
})

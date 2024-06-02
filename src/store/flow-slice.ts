import { Edge, Node } from 'reactflow'
import { StateCreator } from 'zustand'

export interface FlowSlice {
  nodes: Node[]
  edges: Edge[]
}

export const createFlowSlice: StateCreator<FlowSlice, [], [], FlowSlice> = (
  set
) => ({
  nodes: [],
  edges: []
})

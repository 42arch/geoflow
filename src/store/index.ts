import { create } from 'zustand'
import { FlowSlice, createFlowSlice } from './flow-slice'

export const useFlowStore = create<FlowSlice>()((...a) => ({
  ...createFlowSlice(...a)
}))

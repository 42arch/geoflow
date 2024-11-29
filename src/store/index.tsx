import { create } from 'zustand'
import { createFlowSlice, FlowSlice } from './flow-slice'

export const useFlowApp = create<FlowSlice>()((...a) => ({
  ...createFlowSlice(...a)
}))

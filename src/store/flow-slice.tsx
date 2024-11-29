import { StateCreator } from 'zustand'
import { Executor } from '@/core/executor'

export interface FlowSlice {
  executor: Executor | null
  setExecutor: (executor: Executor | null) => void
}

export const createFlowSlice: StateCreator<FlowSlice, [], [], FlowSlice> = (
  set
) => ({
  executor: null,
  setExecutor: (executor: Executor | null) => {
    set({
      executor: executor
    })
  }
})

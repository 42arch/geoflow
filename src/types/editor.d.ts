import { Node, Edge } from '@xyflow/react'

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

export type SelectOption = {
  value: string
  label: string
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
  _meta?: {
    isPending: boolean
    duration: number
  }
}

export type NodeType = Node<NodeData>
export type EdgeType = Edge

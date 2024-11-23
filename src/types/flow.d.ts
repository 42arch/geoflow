import { Node, Edge } from '@xyflow/react'

interface InputBase {
  readonly id: string
  readonly hasHandle: boolean
  readonly label?: string
}

export interface NumberInput extends InputBase {
  readonly kind: 'number'
  value: number
}

export interface SelectInput extends InputBase {
  readonly kind: 'select'
  options: SelectOption[]
  value: string
}

export interface GeojsonFileInput extends InputBase {
  readonly kind: 'geojson-file'
  value: object | null
}

export interface GeojsonInput extends InputBase {
  readonly kind: 'geojson'
  value: object | null
}

export type SelectOption = {
  value: string
  label: string
}

export type Input = NumberInput | SelectInput | GeojsonFileInput | GeojsonInput

export type InputKind = Input['kind']

export interface OutputBase {
  readonly id: string
  readonly hasHandle: boolean
  readonly label?: string
}

export interface NumberOutput extends OutputBase {
  readonly kind: 'number'
  value: number
}

export interface GeojsonOutput extends OutputBase {
  readonly kind: 'geojson'
  value: object | null
}

export interface GeojsonViewerOutput extends OutputBase {
  readonly kind: 'geojson-viewer'
  value: object | null
}

export type Output = NumberOutput | GeojsonOutput | GeojsonViewerOutput
export type OutputKind = Output['kind']

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

export type HandleType = 'input' | 'output'

export type NodeType = Node<NodeData>
export type EdgeType = Edge

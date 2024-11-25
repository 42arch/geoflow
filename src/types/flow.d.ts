import { Node, Edge } from '@xyflow/react'
import { FeatureCollection } from 'geojson'

interface InputBase {
  id?: string
  readonly hasHandle: boolean
  readonly label?: string
  readonly labelPosition?: 'top' | 'left'
  _state?: {
    isConnected: boolean
  }
}

export interface NumberInput extends InputBase {
  readonly kind: 'number'
  value: number
  minValue?: number
  maxValue?: number
  step?: number
}

export interface BooleanInput extends InputBase {
  readonly kind: 'boolean'
  value: boolean
}

export interface SelectInput extends InputBase {
  readonly kind: 'select'
  options: SelectOption[]
  value: string
}

export interface GeojsonFileInput extends InputBase {
  readonly kind: 'geojson-file'
  value: FeatureCollection | null
}

export interface GeojsonInput extends InputBase {
  readonly kind: 'geojson'
  value: FeatureCollection | null
}

export type SelectOption = {
  value: string
  label: string
}

export type Input =
  | NumberInput
  | BooleanInput
  | SelectInput
  | GeojsonFileInput
  | GeojsonInput

export type InputKind = Input['kind']

export type ValueKind =
  | 'number'
  | 'geojson-point'
  | 'geojson-line'
  | 'geojson-polygon'

export interface OutputBase {
  id: string
  readonly hasHandle: boolean
  readonly label?: string
}

export interface NumberOutput extends OutputBase {
  readonly kind: 'number'
  value: number
}

export interface GeojsonOutput extends OutputBase {
  readonly kind: 'geojson'
  value: FeatureCollection | null
}

export interface GeojsonViewerOutput extends OutputBase {
  readonly kind: 'geojson-viewer'
  value: FeatureCollection | null
}

export type Output = NumberOutput | GeojsonOutput | GeojsonViewerOutput
export type OutputKind = Output['kind']

export type NodeState = {
  isPending: boolean
  duration: number
}

export type NodeData = {
  type: string
  hasEffect: boolean
  func: (...args: any[]) => void
  inputs: Input[]
  outputs: Output[]
  _state?: NodeState
}

export type HandleType = 'input' | 'output'

export type NodeType = Node<NodeData>
export type EdgeType = Edge

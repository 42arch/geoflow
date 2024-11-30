import { Node, Edge } from '@xyflow/react'
import { FeatureCollection } from 'geojson'

export type DataArray = Record<string, string | number>[]

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

export interface TextInput extends InputBase {
  readonly kind: 'text'
  value: string
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

export interface TableInput extends InputBase {
  readonly kind: 'table'
  value: DataArray
}

export type SelectOption = {
  value: string
  label: string
}

export type Input =
  | NumberInput
  | TextInput
  | BooleanInput
  | SelectInput
  | GeojsonFileInput
  | GeojsonInput
  | TableInput

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

export interface TextOutput extends OutputBase {
  readonly kind: 'text'
  value: string
}

export interface GeojsonOutput extends OutputBase {
  readonly kind: 'geojson'
  value: FeatureCollection | null
}

export interface TableOutput extends OutputBase {
  readonly kind: 'table'
  value: DataArray
}

export interface GeojsonViewerOutput extends OutputBase {
  readonly kind: 'geojson-viewer'
  value: FeatureCollection | null
}

export type Output =
  | NumberOutput
  | TextOutput
  | GeojsonOutput
  | GeojsonViewerOutput
  | TableOutput

export type OutputKind = Output['kind']

export type NodeState = {
  isPending: boolean
  duration: number
}

export type NodeFunction = (...args: any[]) => any[] | Promise<any[]>

export type NodeData = {
  type: string
  autoRun: boolean
  func: NodeFunction
  inputs: Input[]
  outputs: Output[]
  _state?: NodeState
}

export type HandleType = 'input' | 'output'

export type NodeType = Node<NodeData, 'common'>
export type EdgeType = Edge

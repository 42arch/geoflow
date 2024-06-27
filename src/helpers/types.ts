export type NodeState = {
  name: string
  schemaId: string
  // isAutomatic: boolean
  inputs: Input[]
  outputs: { type: InputValueType; value: any; hasHandle: boolean }[]
}

export interface NodeData {
  schemaId: string
}

export type InputValueType = 'Number' | 'Table' | 'Geojson' | 'File'

export type HandleType = 'input' | 'output'

export type Metadata = {
  name: string
  description: string
  Icon: string
}

export type Input = NumberInput | ColorInput
type InputKind = Input['kind']
interface InputBase {
  readonly id: number
  readonly kind: InputKind
  readonly label: string
  readonly hasHandle: boolean
  readonly description: string
  readonly optional: boolean
}

export interface NumberInput extends InputBase {
  readonly kind: 'number'
  readonly default: number
  readonly min?: number | null
  readonly max?: number | null
  readonly precision: number
  readonly step: number
}

export interface ColorInput extends InputBase {
  readonly kind: 'color'
  readonly default: string
}

// export type Input = NumberInpu

export type NodeState = {
  name: string
  type: string
  schemaId: string
  inputs: Input[]
  outputs: Output[]
}

// export type NodeData = {
//   label: string
// }

// export type NodeState = {
//   name: string
//   type: string
//   label: string
//   // schemaId: string
//   // hasEffect?: boolean
//   // isAutomatic: boolean
//   // func?: (args: any) => any
//   // inputs: Input[]
//   // outputs: Output[]
// }

// export interface NodeData {
//   schemaId: string
// }

export type InputValueType = 'Number' | 'Table' | 'Geojson' | 'File'

export type HandleType = 'input' | 'output'

export type Metadata = {
  name: string
  description: string
  Icon: string
}

// export type Input = NumberInput | ColorInput | DataInput
export type Input = NumberInput | SelectInput

export type InputKind = Input['kind']

export type Output = GenericOutput

export type OutputKind = Output['kind']

export interface OutputBase {
  readonly id: number
  readonly kind: OutputKind
  readonly hasHandle: boolean
}

interface InputBase {
  readonly id: number
  readonly kind: InputKind
  readonly label: string
  readonly hasHandle: boolean
  disabled?: boolean
  // readonly description: string
  // readonly optional: boolean
  // defaultValue?: any
}

export interface NumberInput extends InputBase {
  readonly kind: 'number'
  readonly value: number
  readonly min?: number | null
  readonly max?: number | null
  readonly precision: number
  readonly step: number
}

export interface SelectOption {
  value: string
  label: string
}

export interface SelectInput extends InputBase {
  readonly kind: 'select'
  readonly value: number
  readonly options: SelectOption[]
}

export interface GenericOutput extends OutputBase {
  readonly kind: 'generic'
  value: number
}

// export interface ColorInput extends InputBase {
//   readonly kind: 'color'
//   readonly default: string
// }

// export interface DataInput extends InputBase {
//   readonly kind: 'data'
// }

// export type Input = NumberInpu

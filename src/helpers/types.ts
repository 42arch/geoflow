export type TableData = { key: string; [key: string]: string | number }[]

export type DataSet = {
  data: TableData
  properties: {
    columns: string[]
  }
}

export type InputValue = Input['value']

export type NodeState = {
  name: string
  type: string
  schemaId: string
  inputs: Input[]
  outputs: Output[]
}

export type InputValueType = 'Number' | 'Dataset' | 'Geojson' | 'File'

export type HandleType = 'input' | 'output'

export type Metadata = {
  name: string
  description: string
  Icon: string
}

// export type Input = NumberInput | ColorInput | DataInput
export type Input = NumberInput | TextInput | SelectInput | DataSetInput

export type InputKind = Input['kind']

export type Output = GenericOutput | DataSetOutput | TableViewOutput

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

export interface TextInput extends InputBase {
  readonly kind: 'text'
  readonly value: string
}

export interface SelectOption {
  value: string
  label: string
}

export interface SelectInput extends InputBase {
  readonly kind: 'select'
  readonly value: string
  readonly hasDynamicOptions?: boolean
  dynamicOptionsDependency?: [number, string] // input id, object path
  options: SelectOption[]
}

export interface DataSetInput extends InputBase {
  readonly kind: 'dataset'
  readonly value: DataSet
}

export interface GenericOutput extends OutputBase {
  readonly kind: 'generic'
  value: number | string
}

export interface DataSetOutput extends OutputBase {
  readonly kind: 'dataset'
  value: DataSet
}

export interface TableViewOutput extends OutputBase {
  readonly kind: 'table-view'
  value: DataSet
}

export type NodeState = {
  name: string
  schemaId: string
  // isAutomatic: boolean
  inputs: { type: InputValueType; value: any; hasHandle: boolean }[]
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

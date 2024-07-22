import { NODE_LIST } from '@/helpers/node-list'

export function createNodeData(schemaId: string) {
  const node = NODE_LIST.find((node) => node.schemaId === schemaId)
  if (!node) return {}
  return node
}

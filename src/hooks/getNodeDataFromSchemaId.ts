import NodeList from '@/app/flow-app/aside/NodeList'

function getNodeDataFromSchemaId(schemaId: string) {
  const nodeState = NodeList.find((ns) => ns.schemaId === schemaId)
  return nodeState
}

export default getNodeDataFromSchemaId

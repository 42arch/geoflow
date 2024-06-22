import NodeList from '@/app/flow-app/aside/NodeList'
import { NodeData } from '@/helpers/types'

function useNodeStateFromData(data: NodeData) {
  const { schemaId } = data
  const nodeState = NodeList.find((ns) => ns.schemaId === schemaId)
  return nodeState
}

export default useNodeStateFromData

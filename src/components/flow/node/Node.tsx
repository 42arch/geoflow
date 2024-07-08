import NodeContainer from './NodeContainer'
import NodeHeader from './NodeHeader'
import NodeBody from './NodeBody'
import { NodeData, NodeState } from '@/helpers/types'

export interface NodeProps {
  data: NodeState
  id: string
}

function CustomNode({ id, data }: NodeProps) {
  console.log('data', data)

  const nodeState = data

  if (nodeState === undefined) return

  return (
    <NodeContainer>
      <NodeHeader nodeState={nodeState} />
      <NodeBody nodeState={nodeState} nodeId={id} />
    </NodeContainer>
  )
}

export default CustomNode

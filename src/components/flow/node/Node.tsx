import NodeContainer from './NodeContainer'
import NodeHeader from './NodeHeader'
import NodeBody from './NodeBody'
import useNodeStateFromData from '@/hooks/useNodeStateFromData'
import { NodeData } from '@/helpers/types'

export interface NodeProps {
  data: NodeData
  id: string
}

function CustomNode({ id, data }: NodeProps) {
  const nodeState = useNodeStateFromData(data)

  if (nodeState === undefined) return

  return (
    <NodeContainer>
      <NodeHeader nodeState={nodeState} />
      <NodeBody />
    </NodeContainer>
  )
}

export default CustomNode

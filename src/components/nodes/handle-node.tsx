import { memo, useEffect } from 'react'
import {
  Position,
  NodeProps,
  useReactFlow,
  Handle,
  useHandleConnections,
  useNodesData
} from '@xyflow/react'

function HandleNode({ id }: NodeProps) {
  const { updateNodeData } = useReactFlow()
  const connections = useHandleConnections({
    type: 'target'
  })
  const nodeData = useNodesData(connections[0]?.source)

  useEffect(() => {
    updateNodeData(id, { text: nodeData?.data?.text?.toUpperCase() })
  }, [id, nodeData, updateNodeData])

  return (
    <div
      style={{
        background: '#eee',
        color: '#222',
        padding: 10,
        fontSize: 12,
        borderRadius: 10
      }}
    >
      <Handle
        type='target'
        position={Position.Left}
        isConnectable={connections.length === 0}
      />
      <div>uppercase transform</div>
      <Handle type='source' position={Position.Right} />
    </div>
  )
}

export default memo(HandleNode)

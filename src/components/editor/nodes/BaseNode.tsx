import React, { memo } from 'react'

export interface NodeProps {
  // data: NodeState
  id: string
}

function BaseNode({ id }: NodeProps) {
  return <div className=''>BaseNode</div>
}

export default memo(BaseNode)

import { NodeState } from '@/helpers/types'

interface Props {
  nodeState: NodeState
}

function NodeHeader({ nodeState }: Props) {
  const { name } = nodeState

  return (
    <div className='text-sm'>
      <span>{name}</span>
    </div>
  )
}

export default NodeHeader

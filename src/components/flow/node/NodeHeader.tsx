import { NodeState } from '@/helpers/types'

interface Props {
  nodeState: NodeState
}

function NodeHeader({ nodeState }: Props) {
  const { name } = nodeState

  return (
    <div className='flex h-[32px] items-center justify-center px-2 text-sm font-bold'>
      <span>{name}</span>
    </div>
  )
}

export default NodeHeader

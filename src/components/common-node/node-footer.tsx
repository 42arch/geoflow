import { NodeState } from '@/types'

interface NodeFooterProps {
  state?: NodeState
}

function NodeFooter({ state }: NodeFooterProps) {
  return (
    <div className='flex h-8 items-center justify-center rounded-b-md bg-zinc-200 px-4'>
      {state?.isPending ? 'pending' : ''}
    </div>
  )
}

export default NodeFooter

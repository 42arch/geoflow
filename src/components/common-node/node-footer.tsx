interface NodeFooterProps {
  isPending: boolean
}

function NodeFooter({ isPending }: NodeFooterProps) {
  return (
    <div className='flex h-4 items-center justify-center rounded-b-md bg-default-200 px-4'>
      {isPending ? 'pending' : ''}
    </div>
  )
}

export default NodeFooter

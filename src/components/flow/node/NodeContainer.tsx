import { PropsWithChildren } from 'react'

interface Props {}

function NodeContainer({ children }: PropsWithChildren<Props>) {
  return (
    <div className='rounded-md border-2 border-zinc-500 bg-white'>
      {children}
    </div>
  )
}

export default NodeContainer

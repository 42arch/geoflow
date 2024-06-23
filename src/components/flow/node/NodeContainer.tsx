import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function NodeContainer({ children }: Props) {
  return (
    <div className='rounded-md border-2 border-zinc-500 px-4'>{children}</div>
  )
}

export default NodeContainer

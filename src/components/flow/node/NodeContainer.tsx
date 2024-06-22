import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function NodeContainer({ children }: Props) {
  return <div>{children}</div>
}

export default NodeContainer

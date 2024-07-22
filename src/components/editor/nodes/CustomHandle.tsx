import { PropsWithChildren } from 'react'
import { Handle, HandleType, Position } from '@xyflow/react'

interface CustomHandleProps {
  id: string
  type: HandleType
}

function CustomHandle({
  id,
  type,
  children
}: PropsWithChildren<CustomHandleProps>) {
  return (
    <div className='relative w-full'>
      <Handle
        type={type}
        position={type === 'source' ? Position.Right : Position.Left}
        id={id}
        style={{
          backgroundColor: '#a83a3a'
        }}
      />
      <div className='px-2'>{children}</div>
    </div>
  )
}

export default CustomHandle

import { PropsWithChildren } from 'react'
import { Handle, HandleType, Position } from '@xyflow/react'
import { getHandleColor } from '@/utils/theme'
import { InputKind, OutputKind } from '@/types'

interface CustomHandleProps {
  id: string
  kind: InputKind | OutputKind
  type: HandleType
}

function CustomHandle({
  id,
  type,
  kind,
  children
}: PropsWithChildren<CustomHandleProps>) {
  const color = getHandleColor(kind)
  return (
    <div className='relative w-full'>
      <Handle
        type={type}
        position={type === 'source' ? Position.Right : Position.Left}
        id={id}
        style={{
          backgroundColor: color
        }}
      />
      <div className='px-3'>{children}</div>
    </div>
  )
}

export default CustomHandle

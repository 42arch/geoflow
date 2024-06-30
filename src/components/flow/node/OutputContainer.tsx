import { Output } from '@/helpers/types'
import { Handle, Position } from '@xyflow/react'
import { PropsWithChildren } from 'react'

interface OutputHandleProps {
  index: number
}

function OutoutHandle({
  // nodeId,
  index,
  children
}: PropsWithChildren<OutputHandleProps>) {
  return (
    <>
      <Handle
        isConnectable
        type='source'
        key={index}
        id={`output-${index}`}
        position={Position.Right}
        style={{
          width: 8,
          height: 8
        }}
      />
      {children}
    </>
  )
}

interface OutputContainerProps {
  output: Output
}

function OutputContainer({ output }: OutputContainerProps) {
  const { value, hasHandle, kind, id } = output

  console.log('output', output)

  return (
    <div className='flex flex-row justify-end'>
      <div className='rounded bg-slate-500 text-sm'>{value}</div>

      {hasHandle && <OutoutHandle index={id} />}
    </div>
  )
}

export default OutputContainer

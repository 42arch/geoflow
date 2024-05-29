import { useCallback } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'

type NodeData = {
  value: number
}

export default function InputNode({ data }: NodeProps<NodeData>) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <div>
        <label htmlFor='text'>Text:</label>
        <input id='text' name='text' onChange={onChange} className='nodrag' />
      </div>
      <Handle type='source' position={Position.Right} id='a' />
    </>
  )
}

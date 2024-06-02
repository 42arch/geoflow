import { ChangeEventHandler } from 'react'
import {
  Handle,
  NodeProps,
  Position,
  useNodes,
  useReactFlow,
  useStore
} from 'reactflow'

type NodeData = {
  value: string
}

export default function InputNode({ id, data }: NodeProps<NodeData>) {
  const { setNodes } = useReactFlow()

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === id) {
          return {
            ...n,
            data: {
              ...data,
              value: e.target.value
            }
          }
        }
        return n
      })
    )
  }

  return (
    <>
      <div>
        <label htmlFor='text'>Input:</label>
        <input
          id='text'
          name='text'
          type='number'
          // defaultValue={}
          onChange={onChange}
          className='nodrag border-2 border-slate-400'
        />
      </div>
      <Handle type='source' position={Position.Bottom} id='a' />
    </>
  )
}

import useSourceTarget from '@/hooks/useSourceTarget'
import { ChangeEventHandler } from 'react'
import { Handle, Node, Position, useReactFlow } from 'reactflow'

type NodeData = {
  input: any
  output: any
}

export default function HandleNode(props: Node<NodeData>) {
  const { setNodes } = useReactFlow()

  const { sources, targets } = useSourceTarget(props)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === props.id) {
          return {
            ...n,
            data: {
              ...props.data,
              output: e.target.value
            }
          }
        }
        if (targets.find((o) => o.id === n.id)) {
          return {
            ...n,
            data: {
              ...n.data,
              input: e.target.value
            }
          }
        }
        return n
      })
    )
  }

  return (
    <>
      <Handle type='target' position={Position.Top} id='a' />
      <div className='flex w-[140px] flex-col gap-2 border-2 border-slate-500 p-2'>
        <p>Handle Node</p>
        <div className=''>
          <span>{props?.data.input}</span>
        </div>
        <input
          type='number'
          className='border-2 border-slate-400'
          id='b'
          onChange={onChange}
        />
      </div>

      <Handle type='source' position={Position.Bottom} id='b' />
    </>
  )
}

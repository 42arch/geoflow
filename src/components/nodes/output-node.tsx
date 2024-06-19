import { Handle, NodeProps, Position, useReactFlow } from 'reactflow'

type NodeData = {
  input: any
  output: any
}

export default function OutputNode(props: NodeProps<NodeData>) {
  const { setNodes } = useReactFlow()

  return (
    <>
      <Handle type='target' position={Position.Top} id='a' />
      <div className=''>
        <p>Output Node</p>
        <div>{props?.data.input}</div>
      </div>

      <Handle type='source' position={Position.Bottom} id='b' />
    </>
  )
}

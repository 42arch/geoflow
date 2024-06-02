import { Handle, NodeProps, Position, useNodes, useStore } from 'reactflow'

type NodeData = {
  result: string
}

export default function HandleNode({ data }: NodeProps<NodeData>) {
  console.log(9999, data)

  const nodes = useNodes()

  const inputNode = useStore((s) => s.nodeInternals.get('3'))

  console.log('inputNode', inputNode)

  return (
    <>
      <Handle type='target' position={Position.Top} id='a' />
      <div className='w-[140px] border-2 border-slate-500 p-2'>
        <p>a: </p>
        <span>{inputNode?.data.value}</span>
      </div>
      <Handle type='source' position={Position.Bottom} id='b' />
    </>
  )
}

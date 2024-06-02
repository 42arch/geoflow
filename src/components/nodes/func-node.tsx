import { Handle, NodeProps, Position, useNodes, useStore } from 'reactflow'

type NodeData = {
  result: string
}

export default function FuncNode({ data }: NodeProps<NodeData>) {
  const nodes = useNodes()

  const inputNode = useStore((s) => s.nodeInternals.get('3'))

  console.log('inputNode', inputNode)

  return (
    <>
      <Handle type='target' position={Position.Left} id='a' />
      <div className='border-2 border-slate-500 p-2'>
        <p>Result:</p>
        <span>{inputNode?.data.value}</span>
      </div>
      <Handle type='source' position={Position.Right} id='a' />
    </>
  )
}

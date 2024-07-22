import { DragEvent } from 'react'
import { NODE_LIST } from '@/helpers/node-list'
import { NodeState } from '@/helpers/types'

function NodeItem({ nodeState }: { nodeState: NodeState }) {
  const onDragStart = (event: DragEvent<HTMLDivElement>, schemaId: string) => {
    event.dataTransfer.setData('application/reactflow', schemaId)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className='inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-default-100 py-4 text-default-700 transition-transform-colors-opacity hover:opacity-80'
      draggable
      onDragStart={(event) => onDragStart(event, nodeState.schemaId)}
    >
      {nodeState.name}
    </div>
  )
}

function Sider() {
  return (
    <div className='h-full p-4'>
      <div className=''>Search Bar</div>
      <div className='flex select-none flex-col gap-3 py-2'>
        {NODE_LIST.map((node) => (
          <NodeItem key={node.type} nodeState={node} />
        ))}
      </div>
    </div>
  )
}

export default Sider

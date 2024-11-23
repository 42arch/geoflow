import { NODE_LIST } from '@/utils/node-list'
import { DragEvent } from 'react'

function NodeItem({ type }: { type: string }) {
  const onDragStart = (event: DragEvent<HTMLDivElement>, type: string) => {
    event.dataTransfer.setData('application/reactflow', type)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className='inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border bg-default-100 py-4 text-default-700 transition-transform-colors-opacity hover:opacity-80'
      draggable
      onDragStart={(event) => onDragStart(event, type)}
    >
      {type}
    </div>
  )
}

function Sider() {
  return (
    <div className='h-full '>
      <div className=''>Search Bar</div>
      <div className='flex select-none flex-col gap-3 py-2'>
        {NODE_LIST.map((node) => (
          <NodeItem key={node.type} type={node.type} />
        ))}
      </div>
    </div>
  )
}

export default Sider

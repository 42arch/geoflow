import { DragEvent } from 'react'
import NodeList from './NodeList'
import { NodeData, NodeState } from '@/helpers/types'

export default function Aside() {
  const onDragStart = (event: DragEvent<HTMLDivElement>, node: NodeState) => {
    const nodeData: NodeData = {
      schemaId: node.schemaId
    }
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(nodeData)
    )
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className='flex w-full flex-wrap items-start justify-around gap-4 p-2 '>
      {NodeList.map((n) => (
        <div
          key={n.name}
          draggable
          onDragStart={(event) => onDragStart(event, n)}
          className='flex h-12 w-12 items-center justify-center rounded-md bg-slate-200 text-xs'
        >
          {n.name}
        </div>
      ))}
    </div>
  )
}

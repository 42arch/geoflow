import { DragEvent } from 'react'

const nodes: { label: string }[] = [
  {
    label: 'input'
  },
  {
    label: 'handle'
  },
  {
    label: 'output'
  }
]

export default function Aside() {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className='flex w-full flex-wrap items-start justify-around gap-4 p-2 '>
      {nodes.map((n) => (
        <div
          key={n.label}
          draggable
          onDragStart={(event) => onDragStart(event, n.label)}
          className='flex h-12 w-12 items-center justify-center rounded-md bg-slate-200 text-xs'
        >
          {n.label}
        </div>
      ))}
    </div>
  )
}

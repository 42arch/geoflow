import { MATH_OPERATION_OPTIONS } from '@/functions/math'
import { DragEvent } from 'react'
import { NODE_LIST } from '../editor/backend'

// export const NODE_LIST: {
//   type: string
//   inputs: any[]
//   output: string | number
// }[] = [
//   {
//     type: 'number',
//     inputs: [0],
//     output: 0
//   },
//   {
//     type: 'math',
//     inputs: [0, MATH_OPERATION_OPTIONS[0].value, 0],
//     output: 0
//   },
//   {
//     type: 'viewer',
//     inputs: [0],
//     output: 0
//   }
// ]

function NodeItem({ type }: { type: string }) {
  const onDragStart = (event: DragEvent<HTMLDivElement>, type: string) => {
    event.dataTransfer.setData('application/reactflow', type)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className='inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-default-100 py-4 text-default-700 transition-transform-colors-opacity hover:opacity-80'
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

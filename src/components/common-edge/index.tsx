import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow
} from '@xyflow/react'
import { LinkBreak } from '@phosphor-icons/react'

function CommonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition
}: EdgeProps) {
  const { setEdges } = useReactFlow()
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })

  return (
    <>
      <BaseEdge
        path={edgePath}
        style={{
          pointerEvents: 'all',
          stroke: '#99d032'
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`
          }}
          className='nodrag nopan border-1.5 border-default-500 bg-default-200 pointer-events-auto absolute cursor-pointer rounded-full p-1'
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id))
          }}
        >
          <LinkBreak size={12} />
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export default CommonEdge

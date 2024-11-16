import { findAllPathsFromSourcesToTargets } from '@/utils/find-path'
import { Button } from '@nextui-org/react'
import { Play } from '@phosphor-icons/react'
import { Node, useEdges, useNodes, useReactFlow } from '@xyflow/react'
import math, { MATH_OPERATION_OPTIONS } from '@/functions/math'
import { useCallback, useEffect, useRef } from 'react'
import { Executor, NodeData, runFlow } from '../editor/backend'

const TypeToFunc = {
  number: (v: number) => v,
  math: (v1: number, op: string, v2: number) => math(v1, op, v2),
  viewer: (v: number) => v
}

function Header() {
  const { updateNodeData } = useReactFlow()
  const nodes = useNodes<Node<NodeData>>()
  const edges = useEdges()
  const { setNodes } = useReactFlow()
  const executorRef = useRef<Executor>()

  useEffect(() => {
    if (!executorRef.current) {
      executorRef.current = new Executor(nodes, edges)
    } else {
      executorRef.current.update(nodes, edges)
    }
    executorRef.current.watch((data) => {
      console.log('watch', data.node.id, data.node.data.isPending)
      updateNodeData(data.node.id, data.node.data)
    })
  }, [nodes, edges])

  const handleRun = useCallback(() => {
    executorRef.current?.run()

    // setNodes([...newNodes])
  }, [nodes, edges])

  return (
    <div className='flex items-center gap-3'>
      <Button
        size='sm'
        variant='bordered'
        color='success'
        isIconOnly
        aria-label='Run'
        onClick={handleRun}
      >
        <Play size={16} weight='fill' color='#56d794' />
      </Button>
    </div>
  )
}

export default Header

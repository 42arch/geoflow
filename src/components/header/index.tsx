import { findAllPathsFromSourcesToTargets } from '@/utils/find-path'
import { Button } from '@nextui-org/react'
import { Pause, Play } from '@phosphor-icons/react'
import { Node, useEdges, useNodes, useReactFlow } from '@xyflow/react'
import math, { MATH_OPERATION_OPTIONS } from '@/functions/math'
import { useCallback, useEffect, useRef } from 'react'
import { Executor, NodeData } from '../editor/backend'

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
      console.log('watch', data.status, data.node.id)
      updateNodeData(data.node.id, data.node.data)
    })
  }, [nodes, edges])

  const handleRun = useCallback(() => {
    executorRef.current?.run()
  }, [])

  const handlePause = useCallback(() => {
    executorRef.current?.pause()
  }, [])

  const handleResume = useCallback(() => {
    executorRef.current?.resume()
  }, [])

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
      <Button
        size='sm'
        variant='bordered'
        color='danger'
        isIconOnly
        aria-label='Run'
        onClick={handlePause}
      >
        <Pause size={16} weight='fill' color='#d11e11' />
      </Button>
      <Button
        size='sm'
        variant='bordered'
        color='success'
        isIconOnly
        aria-label='Run'
        onClick={handleResume}
      >
        <Play size={16} weight='fill' color='#56d794' />
      </Button>
    </div>
  )
}

export default Header

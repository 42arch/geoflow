import { Pause, Play } from '@phosphor-icons/react'
import { useEdges, useNodes, useReactFlow } from '@xyflow/react'
import { useCallback, useEffect, useRef } from 'react'
import { EdgeType, NodeType } from '@/types'
import { Executor } from '@/core/executor'
import { Button } from '@/components/ui/button'

function Header() {
  const { updateNodeData } = useReactFlow()
  const nodes = useNodes<NodeType>()
  const edges = useEdges<EdgeType>()
  const executorRef = useRef<Executor>()

  useEffect(() => {
    if (!executorRef.current) {
      executorRef.current = new Executor(nodes, edges)
    } else {
      executorRef.current.update(nodes, edges)
    }
    executorRef.current.watch((data) => {
      // console.log('watch', data.status, data.node.id)
      updateNodeData(data.node.id, data.node.data)
    })
  }, [nodes, edges, updateNodeData])

  const onRun = useCallback(() => {
    executorRef.current?.run()
  }, [])

  const onPause = useCallback(() => {
    executorRef.current?.pause()
  }, [])

  const onResume = useCallback(() => {
    executorRef.current?.resume()
  }, [])

  return (
    <div className='flex items-center gap-3'>
      <Button
        size='icon'
        variant='outline'
        color='success'
        aria-label='Run'
        onClick={onRun}
      >
        <Play size={16} weight='fill' color='#56d794' />
      </Button>
      <Button
        size='icon'
        variant='outline'
        color='danger'
        aria-label='Run'
        onClick={onPause}
      >
        <Pause size={16} weight='fill' color='#d11e11' />
      </Button>
      <Button
        size='icon'
        variant='outline'
        color='success'
        aria-label='Run'
        onClick={onResume}
      >
        <Play size={16} weight='fill' color='#56d794' />
      </Button>
    </div>
  )
}

export default Header

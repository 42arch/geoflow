import { Pause, Play } from '@phosphor-icons/react'
import { useEdges, useNodes, useReactFlow } from '@xyflow/react'
import { useCallback, useEffect } from 'react'
import { EdgeType, NodeType } from '@/types'
import { Executor } from '@/core/executor'
import { Button } from '@/components/ui/button'
import { useFlowApp } from '@/store'

function Header() {
  const { updateNodeData } = useReactFlow()
  const nodes = useNodes<NodeType>()
  const edges = useEdges<EdgeType>()
  const { executor, setExecutor } = useFlowApp()

  useEffect(() => {
    if (!executor) {
      setExecutor(new Executor(nodes, edges))
    } else {
      executor.update(nodes, edges)
    }

    executor?.watch((data) => {
      updateNodeData(data.node.id, data.node.data)
    })
  }, [nodes, edges, executor, setExecutor, updateNodeData])

  const onRun = useCallback(() => {
    executor?.run()
  }, [executor])

  const onPause = useCallback(() => {
    executor?.pause()
  }, [executor])

  const onResume = useCallback(() => {
    executor?.resume()
  }, [executor])

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

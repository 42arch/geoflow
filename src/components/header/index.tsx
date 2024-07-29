import { findAllPathsFromSourcesToTargets } from '@/utils/find-path'
import { Button } from '@nextui-org/react'
import { Play } from '@phosphor-icons/react'
import { useEdges, useNodes } from '@xyflow/react'
import { useCallback } from 'react'

function Header() {
  const nodes = useNodes()
  const edges = useEdges()

  const handleRun = useCallback(() => {
    const paths = findAllPathsFromSourcesToTargets(nodes, edges)
    const linkedNodes = paths.map((path) => {
      return path.map((id) => nodes.find((node) => node.id === id))
    })
    console.log('run', linkedNodes)
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

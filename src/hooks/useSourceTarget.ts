import { useFlowStore } from '@/store'
import { Node, getIncomers, getOutgoers } from 'reactflow'

function useSourceTarget(nodeProps: Node) {
  const { nodes, edges } = useFlowStore()

  const sources = getIncomers(nodeProps, nodes, edges)
  const targets = getOutgoers(nodeProps, nodes, edges)

  return {
    sources,
    targets
  }
}

export default useSourceTarget

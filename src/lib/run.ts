import { Edge, Node } from 'reactflow'

export const runProcess = (nodes: Node[], edges: Edge[]) => {
  const handleNodes = nodes.filter((n) => n.type === 'handle')
  let result
  handleNodes.forEach((n) => {
    result = Number(n.data.input) + Number(n.data.output)
  })
  console.log(handleNodes, result)

  return result
}

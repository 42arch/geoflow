import { Edge, Node } from '@xyflow/react'

export const findAllPathsFromSourcesToTargets = (
  nodes: Node[],
  edges: Edge[]
): string[][] => {
  const adjList: Record<string, string[]> = {}
  const inDegree: Record<string, number> = {}
  const outDegree: Record<string, number> = {}

  // Initialize in-degree and out-degree counts
  nodes.forEach((node) => {
    inDegree[node.id] = 0
    outDegree[node.id] = 0
  })

  // Create adjacency list and calculate in-degree and out-degree
  edges.forEach((edge) => {
    if (!adjList[edge.source]) {
      adjList[edge.source] = []
    }
    adjList[edge.source].push(edge.target)
    inDegree[edge.target]++
    outDegree[edge.source]++
  })

  // Find all source nodes (nodes with no in-edges)
  const sources = nodes
    .filter((node) => inDegree[node.id] === 0)
    .map((node) => node.id)

  // Find all target nodes (nodes with no out-edges)
  const targets = nodes
    .filter((node) => outDegree[node.id] === 0)
    .map((node) => node.id)

  const paths: Set<string> = new Set()
  const visited: Set<string> = new Set()

  const dfs = (currentNode: string, path: string[]) => {
    path.push(currentNode)
    if (!adjList[currentNode] || adjList[currentNode].length === 0) {
      paths.add(path.join(' -> '))
    } else {
      visited.add(currentNode)
      for (const neighbor of adjList[currentNode]) {
        if (!visited.has(neighbor)) {
          dfs(neighbor, path)
        }
      }
      visited.delete(currentNode)
    }
    path.pop()
  }

  // Find all paths from each source to each target
  sources.forEach((source) => {
    targets.forEach((target) => {
      if (source !== target) {
        dfs(source, [])
      }
    })
  })

  return Array.from(paths).map((path) => path.split(' -> '))
}

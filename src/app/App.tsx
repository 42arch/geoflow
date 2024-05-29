import InputNode from '@/components/nodes/input-node'
import { useCallback, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  useNodesState,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect
} from 'reactflow'
import 'reactflow/dist/style.css'

const initialNodes: Node[] = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } }
]

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }]

const nodeTypes = {
  input: InputNode
}

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  )
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  )
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  )

  const executeChain = () => {
    const nodeMap = new Map()
    nodes.forEach((node) => nodeMap.set(node.id, node))

    let currentNode = nodeMap.get('1') // 从输入节点开始
    let output = currentNode.data.value

    while (true) {
      const nextEdge = edges.find((edge) => edge.source === currentNode.id)
      if (!nextEdge) break

      currentNode = nodeMap.get(nextEdge.target)
      if (currentNode.type === 'module' && currentNode.data.func) {
        output = currentNode.data.func(output)
      }
    }

    console.log('Final Output:', output)
  }

  return (
    <div className='h-full w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      />
      <button
        className='absolute right-5 top-5 z-30 border-2 border-red-50'
        onClick={executeChain}
      >
        run
      </button>
    </div>
  )
}

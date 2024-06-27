import { DragEventHandler, useCallback, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  ReactFlowInstance,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,
  Node,
  Edge
} from '@xyflow/react'
import { nanoid } from 'nanoid'
import '@xyflow/react/dist/style.css'
import CustomNode from '@/components/flow/node/Node'
import './flow.css'

const nodeTypes = {
  custom: CustomNode
}

export default function Flow() {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null)

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  )

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault()
      const nodeDataString = event.dataTransfer.getData('application/reactflow')
      if (typeof nodeDataString === 'undefined' || !nodeDataString) {
        return
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })
      if (!position) return
      const newNode = {
        id: nanoid(),
        type: 'custom',
        position,
        data: JSON.parse(nodeDataString)
      }
      setNodes((nds) => [...nds, newNode])
      // addNode(newNode)
    },
    [reactFlowInstance]
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={onDragOver}
      fitView
      nodeTypes={nodeTypes}
    >
      <Background />
      <Controls />
    </ReactFlow>
  )
}

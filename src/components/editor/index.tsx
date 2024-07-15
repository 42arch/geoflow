import { DragEventHandler, useCallback, useState } from 'react'
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState
} from '@xyflow/react'
import type { Node, Edge, Connection, ReactFlowInstance } from '@xyflow/react'
import { nanoid } from 'nanoid'
import '@xyflow/react/dist/style.css'

function Editor() {
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
      const nodeType = event.dataTransfer.getData('application/reactflow')

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })
      if (!position) return

      const newNode = {
        id: `${nodeType}-${nanoid()}`,
        // id: nodeData.name,
        type: 'default',
        position,
        data: { label: `${nodeType} node` }
      }
      setNodes((nds) => [...nds, newNode])
    },
    [reactFlowInstance]
  )

  return (
    <ReactFlow
      className='p-2'
      // nodeTypes={{}}
      nodes={nodes}
      edges={edges}
      onInit={setReactFlowInstance}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDragOver={onDragOver}
      onDrop={onDrop}
      fitView
    >
      <Controls />
      <Background />
    </ReactFlow>
  )
}

export default Editor

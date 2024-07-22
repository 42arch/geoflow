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
import './style.css'
import BaseNode from './nodes/BaseNode'
import { createNodeData } from '@/utils/node-utils'

const nodeTypes = {
  default: BaseNode
}

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
      const schemaId = event.dataTransfer.getData('application/reactflow')

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })
      if (!position) return

      const newNode = {
        id: `${schemaId}-${nanoid()}`,
        // id: nodeData.name,
        type: 'default',
        position,
        data: createNodeData(schemaId)
      }
      setNodes((nds) => [...nds, newNode])
    },
    [reactFlowInstance]
  )

  return (
    <ReactFlow
      className='p-2'
      nodeTypes={nodeTypes}
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

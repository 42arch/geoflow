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
import type {
  Node,
  Edge,
  Connection,
  ReactFlowInstance,
  EdgeProps
} from '@xyflow/react'
import { nanoid } from 'nanoid'
import { createNodeData } from '@/utils/node-utils'
import '@xyflow/react/dist/style.css'
import './style.css'
import CustomEdge from './CustomEdge'
import NumberNode from '../custom-nodes/NumberNode'
import MathNode from '../custom-nodes/MathNode'
import ViewerNode from '../custom-nodes/ViewerNode'
import { NODE_LIST } from './backend'
import CustomNode from '../custom-nodes/CustomNode'
import { cloneDeep } from 'lodash-es'
import { createId } from '@/utils/create-id'

const nodeTypes = {
  // number: NumberNode,
  // math: MathNode,
  // viewer: ViewerNode
  custom: CustomNode
}

const edgeTypes = {
  custom: CustomEdge
}

function Editor() {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null)

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, type: 'custom' }
      setEdges((eds) => addEdge(edge, eds))
    },
    [setEdges]
  )

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault()
      const type = event.dataTransfer.getData('application/reactflow')

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })
      if (!position) return

      const newNodeList = cloneDeep(NODE_LIST)
      const data = newNodeList.find((n) => n.type === type)
      data?.inputs.forEach((input) => {
        input.id = `${input.id}-${createId()}`
      })
      data?.outputs.forEach((output) => {
        output.id = `${output.id}-${createId()}`
      })

      const newNode = {
        id: `${type}-${createId()}`,
        // id: nodeData.name,
        type: 'custom',
        position,
        data: data || {}
        // data: createNodeData(schemaId)
      }

      setNodes((nds) => [...nds, newNode])
    },
    [reactFlowInstance]
  )

  return (
    <ReactFlow
      className='p-2'
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
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

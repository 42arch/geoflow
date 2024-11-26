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
import '@xyflow/react/dist/style.css'
import CommonEdge from '../common-edge'
import CommonNode from '../common-node'
import { cloneDeep } from 'lodash-es'
import { createId } from '@/utils/create-id'
import { NODE_LIST } from '@/utils/node-list'
import { NodeData, NodeType } from '@/types'
import './style.css'

const nodeTypes = {
  common: CommonNode
}

const edgeTypes = {
  common: CommonEdge
}

function FlowCanvas() {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null)

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const onConnect = useCallback(
    (connection: Connection) => {
      const { source, sourceHandle, target, targetHandle } = connection
      const sourceNode = nodes.find((node) => node.id === source)
      const targetNode = nodes.find((node) => node.id === target)
      if (sourceNode && targetNode) {
        // these types should be fixed
        const sourceData = sourceNode.data as NodeData
        const targetData = targetNode.data as NodeData

        const outputHandle = sourceData.outputs.find(
          (ouput) => ouput.id === sourceHandle
        )
        const inputHandle = targetData.inputs.find(
          (input) => input.id === targetHandle
        )
        if (outputHandle?.kind === inputHandle?.kind) {
          const edge = { ...connection, type: 'common' }
          setEdges((eds) => addEdge(edge, eds))
        }
      }
    },
    [nodes, setEdges]
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
      if (!data) return

      data.inputs.forEach((input) => {
        input.id = `${input.id}-${createId()}`
        input._state = {
          isConnected: false
        }
      })
      data.outputs.forEach((output) => {
        output.id = `${output.id}-${createId()}`
      })
      data._state = {
        isPending: false,
        duration: 0
      }

      const newNode: NodeType = {
        id: `${type}-${createId()}`,
        type: 'common',
        position,
        dragHandle: '.drag-handle__custom',
        data: data || {}
      }
      setNodes((nds) => [...nds, newNode])
    },
    [reactFlowInstance, setNodes]
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
      proOptions={{
        hideAttribution: true
      }}
      fitView
    >
      <Controls />
      <Background />
    </ReactFlow>
  )
}

export default FlowCanvas

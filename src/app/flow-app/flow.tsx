import HandleNode from '@/components/nodes/handle-node'
import InputNode from '@/components/nodes/input-node'
import { DragEventHandler, useCallback, useState } from 'react'
import ReactFlow, { Background, Controls, ReactFlowInstance } from 'reactflow'
import OutputNode from '@/components/nodes/output-node'
import { useFlowStore } from '@/store'
import 'reactflow/dist/style.css'
import { nanoid } from 'nanoid'

const nodeTypes = {
  input: InputNode,
  handle: HandleNode,
  output: OutputNode
}

export default function Flow() {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null)

  const { nodes, edges, addNode, onConnect, onNodesChange, onEdgesChange } =
    useFlowStore()

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault()
      const type = event.dataTransfer.getData('application/reactflow')
      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })
      if (!position) return
      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { label: `${type} node` }
      }
      addNode(newNode)
    },
    [addNode, reactFlowInstance]
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

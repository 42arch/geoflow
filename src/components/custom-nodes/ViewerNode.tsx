import React, { useEffect, useState } from 'react'
import NodeHeader from '../editor/nodes/NodeHeader'
import NodeFooter from '../editor/nodes/NodeFooter'
import GenericOutput from '../outputs/GenericOutput'
import CustomHandle from '../editor/nodes/CustomHandle'
import {
  NodeProps,
  useReactFlow,
  Node,
  useHandleConnections,
  useNodesData
} from '@xyflow/react'

export type ViewerNode = Node<
  {
    inputs: [number]
    output: number
  },
  'viewer'
>

function ViewerNode({ id, data }: NodeProps<ViewerNode>) {
  const { inputs, output } = data
  const { updateNodeData } = useReactFlow()

  const connections = useHandleConnections({
    type: 'target',
    id: 'viewer-input'
  })
  const nodesData = useNodesData(connections?.[0]?.source)

  const [value, setValue] = useState<number>(inputs[0])

  // useEffect(() => {
  //   updateNodeData(id, {
  //     inputs: [value],
  //     output: value
  //   })
  // }, [value])

  useEffect(() => {
    if (nodesData) {
      const output = nodesData.data.output as number
      setValue(output)
    }
  }, [nodesData])

  return (
    <div className='flex min-w-60 flex-col rounded-md border-1.5 border-default-200 bg-default-200'>
      <NodeHeader label='Viewer' />
      <div className='my-2 flex w-full flex-col justify-around gap-2 bg-default-200'>
        <div className='flex flex-col gap-2 bg-default-100 py-2'>
          <CustomHandle id='viewer-input' type='target'>
            <div className='h-8'></div>
          </CustomHandle>
        </div>
        <div className='bg-default-100 py-2'>
          <GenericOutput value={output} />
        </div>
      </div>
      <NodeFooter />
    </div>
  )
}

export default ViewerNode

import NodeHeader from '../editor/nodes/NodeHeader'
import NodeFooter from '../editor/nodes/NodeFooter'
import {
  NodeProps,
  useReactFlow,
  Node,
  useHandleConnections,
  useNodesData
} from '@xyflow/react'
import { NodeData } from '../editor/backend'
import OutputContainer from './OutputContainer'
import InputContainer from './InputContianer'

export type CustomNode = Node<NodeData, 'custom'>

function CustomNode({ id, data }: NodeProps<CustomNode>) {
  const { inputs, outputs } = data

  const { updateNodeData } = useReactFlow()

  const handleValueChange = (inputId: string, v: string | number) => {
    const newInputs = inputs.map((i) => {
      if (i.id === inputId) {
        return {
          ...i,
          value: v
        }
      } else {
        return i
      }
    })
    updateNodeData(id, {
      inputs: newInputs,
      outputs: outputs
    })
  }

  return (
    <div className='flex min-w-60 flex-col rounded-md border-1.5 border-default-200 bg-default-200'>
      <NodeHeader label={data.type} />
      <div className='my-2 flex w-full flex-col justify-around gap-2 bg-default-200'>
        <div className='flex flex-col gap-2 bg-default-100 py-2'>
          {inputs.map((input, idx) => (
            <InputContainer
              key={idx}
              {...input}
              onChange={(v) => {
                handleValueChange(input.id, v)
              }}
            />
          ))}
        </div>
        <div className='bg-default-100 py-2'>
          {outputs.map((output, idx) => (
            <OutputContainer key={idx} {...output} />
          ))}
        </div>
      </div>
      <NodeFooter isPending={!!data.isPending} />
    </div>
  )
}

export default CustomNode

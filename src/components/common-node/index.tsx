import { NodeProps, useReactFlow, Node } from '@xyflow/react'
import NodeHeader from './node-header'
import NodeFooter from './node-footer'
import { NodeData } from '@/types'
import OutputContainer from './output-container'
import InputContainer from './input-container'

export type CommonNode = Node<NodeData, 'common'>

function CommonNode({ id, data }: NodeProps<CommonNode>) {
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
    <div className='border-1.5 flex min-w-60 flex-col rounded-md bg-zinc-50'>
      <NodeHeader label={data.type} />
      <div className='flex w-full flex-col justify-around gap-2 bg-zinc-100 py-2'>
        <div className='flex flex-col gap-2 py-2'>
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

export default CommonNode

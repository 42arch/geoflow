import { Input, NodeState } from '@/helpers/types'
import { memo, useCallback } from 'react'
import NodeHeader from './NodeHeader'
import InputContainer from './InputContainer'
import OutputContainer from './OutputContainer'
import { useReactFlow } from '@xyflow/react'
import { executeFunction } from '@/functions'
import NodeFooter from './NodeFooter'

export interface NodeProps {
  data: NodeState
  id: string
}

function BaseNode({ id, data }: NodeProps) {
  const { updateNodeData } = useReactFlow()

  const { inputs, outputs, schemaId } = data

  const handleInputChange = useCallback(
    (v: Input['value'], index: number) => {
      const newInputs = inputs.map((input, idx) => {
        if (idx === index) {
          const newInput = { ...input }
          newInput.value = v
          return newInput
        } else {
          return input
        }
      })

      const args = newInputs.map((i) => i.value)

      const result = executeFunction(schemaId, ...args)

      const newOutputs = outputs.map((output, idx) => ({
        ...output,
        value: result
      }))

      updateNodeData(id, {
        inputs: newInputs,
        outputs: newOutputs
      })
    },
    [inputs, outputs]
  )

  return (
    <div className='flex min-w-60 flex-col rounded-md border-1.5 border-default-200 bg-default-200'>
      <NodeHeader label={data.name} />
      <div className='my-2 flex w-full flex-col justify-around gap-2 bg-default-200'>
        <div className='flex flex-col gap-2 bg-default-100 py-2'>
          {inputs.map((input, index) => (
            <InputContainer
              key={index}
              id={index}
              input={input}
              onChange={(v) => handleInputChange(v, index)}
            />
          ))}
        </div>
        <div className='bg-default-100 py-2'>
          {outputs.map((output, index) => (
            <OutputContainer key={index} id={index} output={output} />
          ))}
        </div>
      </div>
      <NodeFooter />
    </div>
  )
}

export default memo(BaseNode)

import { Input, NodeState } from '@/helpers/types'
import React, { memo, useCallback } from 'react'
import NodeHeader from './NodeHeader'
import InputContainer from './InputContainer'
import OutputContainer from './OutputContainer'
import { useReactFlow } from '@xyflow/react'
import { executeFunction } from '@/functions'

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
    <div className='flex flex-col'>
      <NodeHeader label={data.name} />
      <div className='flex w-full flex-col justify-around gap-2 pb-2'>
        {inputs.map((input, index) => (
          <InputContainer
            key={index}
            id={index}
            input={input}
            onChange={(v) => handleInputChange(v, index)}
          />
        ))}

        {outputs.map((output, index) => (
          <OutputContainer key={index} id={index} output={output} />
        ))}
      </div>
    </div>
  )
}

export default memo(BaseNode)

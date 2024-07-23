import { Input, NodeState } from '@/helpers/types'
import React, { memo, useCallback } from 'react'
import CustomHandle from './CustomHandle'
import NodeHeader from './NodeHeader'
import InputContainer from './InputContainer'
import OutputContainer from './OutputContainer'
import { useReactFlow } from '@xyflow/react'

export interface NodeProps {
  data: NodeState
  id: string
}

function BaseNode({ id, data }: NodeProps) {
  const { updateNodeData } = useReactFlow()
  const { inputs, outputs } = data

  const handleInputChange = useCallback((v: Input['value'], index: number) => {
    const newInputs = inputs.map((input, idx) => {
      if (idx === index) {
        return { ...input, value: v }
      } else {
        return input
      }
    })

    const newOutputs = outputs.map((output, idx) => ({
      ...output,
      value: v
    }))
    updateNodeData(id, {
      inputs: newInputs,
      outputs: newOutputs
    })
  }, [])

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

import { DataSetInput, InputValue, NodeState } from '@/helpers/types'
import { memo, useEffect, useState } from 'react'
import NodeHeader from './NodeHeader'
import InputContainer from './InputContainer'
import OutputContainer from './OutputContainer'
import { useReactFlow } from '@xyflow/react'
import { executeFunction } from '@/functions'
import NodeFooter from './NodeFooter'
import { getObjectValue } from '@/utils/object'

export interface NodeProps {
  data: NodeState
  id: string
}

function BaseNode({ id, data }: NodeProps) {
  const { updateNodeData } = useReactFlow()

  const { inputs, outputs, schemaId } = data
  const [inputValues, setInputValues] = useState<InputValue[]>(
    inputs.map((i) => i.value)
  )

  useEffect(() => {
    const newInputs = inputs.map((input, idx) => {
      return {
        ...input,
        value: inputValues[idx]
      }
    })
    const result = executeFunction(schemaId, ...inputValues)

    const newOutputs = outputs.map((output, idx) => ({
      ...output,
      value: result
    }))

    updateNodeData(id, {
      inputs: newInputs,
      outputs: newOutputs
    })
  }, [inputValues])

  return (
    <div className='flex min-w-60 flex-col rounded-md border-1.5 border-default-200 bg-default-200'>
      <NodeHeader label={data.name} />
      <div className='my-2 flex w-full flex-col justify-around gap-2 bg-default-200'>
        <div className='flex flex-col gap-2 bg-default-100 py-2'>
          {inputs.map((input, index, originInputs) => {
            if (input.kind === 'select' && input.dynamicOptionsDependency) {
              const depInput = originInputs[
                input.dynamicOptionsDependency[0] - 1
              ] as DataSetInput
              const newOptions = getObjectValue(
                depInput.value,
                input.dynamicOptionsDependency[1]
              )
              input.options = newOptions.map((i: string) => ({
                label: i,
                value: i
              }))
            }
            return (
              <InputContainer
                key={index}
                id={index}
                input={input}
                onChange={(v) => {
                  setInputValues((prev) => {
                    const newValues = [...prev]
                    newValues[index] = v
                    return newValues
                  })
                }}
              />
            )
          })}
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

import { NodeState } from '@/helpers/types'
import InputContainer from './inputs/InputContainer'
import OutputContainer from './OutputContainer'
import { useReactFlow } from '@xyflow/react'
import { useEffect, useState } from 'react'
import DisplayContainer from './DisplayContainer'

interface Props {
  nodeId: string
  nodeState: NodeState
}

function NodeBody({ nodeId, nodeState }: Props) {
  const { outputs, inputs, hasEffect, func } = nodeState

  const [inputValues, setInputValues] = useState<any[]>([])

  const [displayValue, setDisplayValue] = useState<any>()

  useEffect(() => {
    if (hasEffect) {
      setDisplayValue('x')
    }
  }, [hasEffect])

  const { updateNodeData } = useReactFlow()

  return (
    <div className='px-2'>
      {inputs.map((input, idx) => (
        <InputContainer
          key={idx}
          nodeId={nodeId}
          input={input}
          onValueChange={(v) => {
            const newValues = [...inputValues]
            newValues[idx] = v
            setInputValues(newValues)

            const outputValues = func ? func(newValues[0]) : newValues[0]

            const newOutputs = outputs.map((output, idx) => ({
              ...output,
              value: outputValues
            }))
            updateNodeData(nodeId, {
              // input: newInputs,
              outputs: newOutputs
            })
          }}
        />
      ))}

      {hasEffect && <DisplayContainer value={displayValue} />}

      <div className=''>
        {outputs.map((output, idx) => (
          <OutputContainer key={idx} output={output} />
        ))}
      </div>
    </div>
  )
}

export default NodeBody

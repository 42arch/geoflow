import { NodeState } from '@/helpers/types'
import InputContainer from './inputs/InputContainer'
import OutputContainer from './OutputContainer'
import { useReactFlow } from '@xyflow/react'

interface Props {
  nodeId: string
  nodeState: NodeState
}

function NodeBody({ nodeId, nodeState }: Props) {
  const { outputs, inputs } = nodeState

  const { updateNodeData } = useReactFlow()

  return (
    <div className='px-2'>
      {inputs.map((input, idx) => (
        <InputContainer
          key={idx}
          nodeId={nodeId}
          input={input}
          onValueChange={(v) => {
            const newOutputs = outputs.map((output, idx) => ({
              ...output,
              value: v
            }))
            updateNodeData(nodeId, {
              outputs: newOutputs
            })
          }}
        />
      ))}

      <div className=''>
        {outputs.map((output, idx) => (
          <OutputContainer key={idx} output={output} />
        ))}
      </div>
    </div>
  )
}

export default NodeBody

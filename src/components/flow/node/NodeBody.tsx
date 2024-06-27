import { NodeState } from '@/helpers/types'
import { InputMap } from './inputs'
import InputContainer from './inputs/InputContainer'

interface Props {
  nodeState: NodeState
}

function NodeBody({ nodeState }: Props) {
  const { outputs, inputs } = nodeState

  console.log(inputs)

  return (
    <div className='px-2'>
      {inputs.map((input, idx) => (
        <InputContainer key={idx} input={input} />
      ))}
    </div>
  )
}

export default NodeBody

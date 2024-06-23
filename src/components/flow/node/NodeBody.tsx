import { NodeState } from '@/helpers/types'
import { InputMap } from './inputs'

interface Props {
  nodeState: NodeState
}

function NodeBody({ nodeState }: Props) {
  const { outputs, inputs } = nodeState

  console.log(inputs)

  return (
    <div>
      {inputs.map((input) => {
        const InputElement = InputMap[input.type]
        return <div>{<InputElement />}</div>
      })}
    </div>
  )
}

export default NodeBody

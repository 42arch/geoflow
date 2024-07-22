import NumberInput from '@/components/inputs/NumberInput'
import { Input, InputKind, NodeState } from '@/helpers/types'
import CustomHandle from './CustomHandle'
import { memo, useEffect, useState } from 'react'
import { useHandleConnections, useNodesData } from '@xyflow/react'

const InputComponents: Readonly<
  Record<InputKind, (props: any) => JSX.Element>
> = {
  number: NumberInput
}

interface InputPorps {
  id: number
  input: Input
}
function InputContainer({ id, input }: InputPorps) {
  const { kind, defaultValue, hasHandle } = input
  const InputComp = InputComponents[kind]

  const [value, setValue] = useState(defaultValue)

  const connections = useHandleConnections({
    type: 'target',
    id: `${id}`
  })
  const nodesData = useNodesData(connections?.[0].source)

  useEffect(() => {
    if (nodesData?.data) {
      const nodeStateData = nodesData.data as NodeState
      const outputs = nodeStateData.outputs
      setValue(outputs[0].value)
    }
  }, [nodesData])

  console.log('InputContainer', input)

  if (!hasHandle) {
    return (
      <InputComp
        value={value}
        step={input.step}
        onChange={(v: number) => {
          console.log(v)
          setValue(v)
        }}
      />
    )
  }

  return (
    <CustomHandle id={String(id)} type='target'>
      <InputComp
        value={value}
        step={input.step}
        onChange={(v: number) => {
          console.log(v)
          setValue(v)
        }}
      />
    </CustomHandle>
  )
}

export default memo(InputContainer)

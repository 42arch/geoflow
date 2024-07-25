import NumberInput from '@/components/inputs/NumberInput'
import { Input, InputKind, InputValue, NodeState } from '@/helpers/types'
import CustomHandle from './CustomHandle'
import { memo, useEffect, useState } from 'react'
import { useHandleConnections, useNodesData } from '@xyflow/react'
import SelectInput from '@/components/inputs/SelectInput'

const InputComponents: Readonly<
  Record<InputKind, (props: any) => JSX.Element>
> = {
  number: NumberInput,
  select: SelectInput
}

interface InputPorps {
  id: number
  input: Input
  onChange: (value: Input['value']) => void
}
function InputContainer({ id, input, onChange }: InputPorps) {
  const { kind, value: initialValue, hasHandle } = input

  const InputComp = InputComponents[kind]

  const [value, setValue] = useState<InputValue>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const connections = useHandleConnections({
    type: 'target',
    id: `${id}`
  })

  const isConnected = connections.length > 0

  const nodesData = useNodesData(connections?.[0]?.source)

  useEffect(() => {
    if (nodesData?.data) {
      const nodeStateData = nodesData.data as NodeState
      const outputs = nodeStateData.outputs
      const output = outputs[0]

      if (output.kind === 'generic') {
        setValue(output.value)
        onChange(output.value)
      }
    }
  }, [nodesData])

  if (!hasHandle) {
    return (
      <div className='px-2'>
        <InputComp
          {...input}
          value={value}
          disabled={isConnected}
          onChange={(v: Input['value']) => {
            onChange(v)
          }}
        />
      </div>
    )
  }

  return (
    <CustomHandle id={String(id)} type='target'>
      <InputComp
        {...input}
        value={value}
        disabled={isConnected}
        onChange={(v: Input['value']) => {
          onChange(v)
        }}
      />
    </CustomHandle>
  )
}

export default memo(InputContainer)

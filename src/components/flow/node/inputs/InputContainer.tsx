import { Input, Output } from '@/helpers/types'
import { PropsWithChildren, useEffect, useState } from 'react'
import { InputMap } from '.'
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow
} from '@xyflow/react'

interface InputHandleProps {
  index: number
}

function InputHandle({ index, children }: PropsWithChildren<InputHandleProps>) {
  const top = 32 + 16 + 32 * index

  return (
    <>
      <Handle
        isConnectable
        type='target'
        key={index}
        id={`input-${index}`}
        position={Position.Left}
        style={{
          width: 8,
          height: 8,
          top: top
        }}
      />
      {children}
    </>
  )
}

interface InputContainerProps {
  nodeId: string
  input: Input
  onValueChange: (value: any) => void
}

function InputContainer({
  nodeId,
  input,
  onValueChange,
  children
}: PropsWithChildren<InputContainerProps>) {
  {
    const { label, hasHandle, id, default: defaultValue } = input
    const InputElement = InputMap[input.kind]

    const [value, setValue] = useState(defaultValue)

    const connections = useHandleConnections({
      type: 'target',
      id: `input-${id}`
    })
    const nodeData = useNodesData(connections[0]?.source)
    console.log(`input-${id}`, connections, nodeData)

    useEffect(() => {
      setValue(nodeData?.data?.outputs[0].value)
    }, [nodeData])

    let inputElement = (
      <InputElement
        value={value}
        onChange={(v) => {
          console.log('change', v)
          setValue(v)
          onValueChange(v)
        }}
      />
    )

    if (hasHandle) {
      inputElement = <InputHandle index={id}>{inputElement}</InputHandle>
    }

    return (
      <div className='flex flex-row py-1'>
        <span className='mr-4'>{label}</span>
        {inputElement}
      </div>
    )
  }
}

export default InputContainer

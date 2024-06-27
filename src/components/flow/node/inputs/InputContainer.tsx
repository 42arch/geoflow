import { Input } from '@/helpers/types'
import { PropsWithChildren } from 'react'
import { InputMap } from '.'
import { Handle, Position } from '@xyflow/react'

interface InputHandleProps {
  index: number
}

function InputHandle({ index, children }: PropsWithChildren<InputHandleProps>) {
  const top = 32 + 16 + 32 * index

  return (
    <>
      <Handle
        isConnectable
        type='source'
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
  input: Input
}

function InputContainer({
  input,
  children
}: PropsWithChildren<InputContainerProps>) {
  {
    const { label, hasHandle, id } = input
    const InputElement = InputMap[input.kind]
    let inputElement = <InputElement />

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

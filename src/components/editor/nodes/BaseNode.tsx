import { NodeState } from '@/helpers/types'
import React, { memo } from 'react'
import CustomHandle from './CustomHandle'
import NodeHeader from './NodeHeader'
import { Input } from '@nextui-org/react'
import InputContainer from './InputContainer'

export interface NodeProps {
  data: NodeState
  id: string
}

function BaseNode({ id, data }: NodeProps) {
  return (
    <div className='flex min-h-32 flex-col'>
      <NodeHeader label={data.name} />
      <div className='flex w-full flex-col justify-around gap-2 pb-2'>
        {data.inputs.map((input, index) => (
          <InputContainer key={index} id={index} input={input} />
        ))}
        {/* <CustomHandle id='1' type='target'>
          <Input size='sm' variant='bordered' />
        </CustomHandle>
        <CustomHandle id='2' type='target'>
          <Input size='sm' variant='bordered' />
        </CustomHandle>
        <CustomHandle id='3' type='source'>
          <Input size='sm' variant='bordered' />
        </CustomHandle> */}
      </div>

      {/* <div>{data.label}</div> */}
    </div>
  )
}

export default memo(BaseNode)

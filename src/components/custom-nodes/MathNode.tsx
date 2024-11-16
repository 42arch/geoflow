import React, { useEffect, useMemo, useState } from 'react'
import NodeHeader from '../editor/nodes/NodeHeader'
import NodeFooter from '../editor/nodes/NodeFooter'
import NumberInput from '../inputs/NumberInput'
import GenericOutput from '../outputs/GenericOutput'
import CustomHandle from '../editor/nodes/CustomHandle'
import SelectInput from '../inputs/SelectInput'
import math, { MATH_OPERATION_OPTIONS } from '@/functions/math'
import {
  NodeProps,
  Node,
  useReactFlow,
  useHandleConnections,
  useNodesData
} from '@xyflow/react'

export type MathNode = Node<
  {
    inputs: [number, string, number]
    output: number
  },
  'math'
>

function MathNode({ id, data }: NodeProps<MathNode>) {
  const { inputs, output } = data
  const { updateNodeData } = useReactFlow()

  const connections1 = useHandleConnections({
    type: 'target',
    id: 'math-input-1'
  })
  const connections3 = useHandleConnections({
    type: 'target',
    id: 'math-input-3'
  })

  const nodesData1 = useNodesData([connections1?.[0]?.source])
  const nodesData3 = useNodesData([connections3?.[0]?.source])

  const [values, setValues] = useState<{
    input1: number
    input2: string
    input3: number
  }>({
    input1: inputs[0],
    input2: inputs[1],
    input3: inputs[2]
  })

  // useEffect(() => {
  //   const { input1, input2, input3 } = values
  //   const result = math(input1, input2, input3)
  //   updateNodeData(id, {
  //     inputs: [input1, input2, input3],
  //     output: result
  //   })
  // }, [values])

  useEffect(() => {
    if (nodesData1.length) {
      setValues((prev) => ({
        ...prev,
        input1: nodesData1[0].data.output as number
      }))
    }
    if (nodesData3.length) {
      setValues((prev) => ({
        ...prev,
        input3: nodesData3[0].data.output as number
      }))
    }
  }, [nodesData1, nodesData3])

  return (
    <div className='flex min-w-60 flex-col rounded-md border-1.5 border-default-200 bg-default-200'>
      <NodeHeader label='Math' />
      <div className='my-2 flex w-full flex-col justify-around gap-2 bg-default-200'>
        <div className='flex flex-col gap-2 bg-default-100 py-2'>
          <CustomHandle id='math-input-1' type='target'>
            <NumberInput
              value={values.input1}
              step={1}
              onChange={(v) => {
                setValues((prev) => ({
                  ...prev,
                  input1: v
                }))
              }}
            />
          </CustomHandle>
          <SelectInput
            value={values.input2}
            options={MATH_OPERATION_OPTIONS}
            onChange={(v) => {
              setValues((prev) => ({
                ...prev,
                input2: v
              }))
            }}
          />
          <CustomHandle id='math-input-3' type='target'>
            <NumberInput
              value={values.input3}
              step={1}
              onChange={(v) => {
                setValues((prev) => ({
                  ...prev,
                  input3: v
                }))
              }}
            />
          </CustomHandle>
        </div>
        <div className='bg-default-100 py-2'>
          <CustomHandle id='math-output' type='source'>
            <GenericOutput value={output || 0} />
          </CustomHandle>
        </div>
      </div>
      <NodeFooter />
    </div>
  )
}

export default MathNode

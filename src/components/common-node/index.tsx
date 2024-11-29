import { NodeProps, useReactFlow, Node } from '@xyflow/react'
import NodeHeader from './node-header'
import NodeFooter from './node-footer'
import { NodeData } from '@/types'
import OutputContainer from './output-container'
import InputContainer from './input-container'
import { Separator } from '../ui/separator'
import NodeMenu from './node-menu'
import { useFlowApp } from '@/store'
import { useCallback } from 'react'
import { debounce } from 'lodash-es'

export type CommonNode = Node<NodeData, 'common'>

function CommonNode(props: NodeProps<CommonNode>) {
  const { id, data } = props
  const { inputs, outputs, _state } = data

  const { executor } = useFlowApp()
  const { updateNodeData } = useReactFlow()

  const onValueChange = useCallback(
    (inputId: string, v: string | number) => {
      const newInputs = inputs.map((i) => {
        if (i.id === inputId) {
          return {
            ...i,
            value: v
          }
        } else {
          return i
        }
      })
      updateNodeData(id, {
        inputs: newInputs,
        outputs: outputs
      })
      // Important: Run the executor after a delay.
      // Why?: Ensure that all auto-run nodes execute automatically whenever any input is triggered.
      // todo: add autoRun parameter.
      const debRun = debounce(() => {
        executor?.run()
      }, 800)

      debRun()
    },
    [executor, id, inputs, outputs, updateNodeData]
  )

  return (
    <NodeMenu {...props}>
      <div className='border-1.5 flex min-w-60 flex-col rounded-md bg-zinc-50'>
        <NodeHeader label={data.type} />
        <div className='flex w-full flex-col justify-around gap-2 bg-zinc-100 py-2'>
          <div className='flex flex-col gap-2 py-2'>
            {inputs.map((input, idx) => (
              <InputContainer
                key={idx}
                {...input}
                onChange={(v) => {
                  if (input.id) {
                    onValueChange(input.id, v)
                  }
                }}
              />
            ))}
          </div>
          <Separator />
          <div className='bg-zinc-100 '>
            {outputs.map((output, idx) => (
              <OutputContainer key={idx} {...output} />
            ))}
          </div>
        </div>
        <NodeFooter state={_state} />
      </div>
    </NodeMenu>
  )
}

export default CommonNode

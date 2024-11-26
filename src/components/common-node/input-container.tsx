import { Input, InputKind } from '@/types'
import CustomHandle from './custom-handle'
import NumberInput from '../inputs/number-input'
import SelectInput from '../inputs/select-input'
import GeoJSONFileInput from '../inputs/geojson-file-input'
import GeoJSONInput from '../inputs/geojson-input'
import BooleanInput from '../inputs/boolean-input'
import { cn } from '@/utils/cn'
import {
  useHandleConnections,
  useNodeId,
  useNodesData,
  useReactFlow
} from '@xyflow/react'
import { useEffect } from 'react'
import TextInput from '../inputs/text-input'

type Props = Input & {
  onChange: (v: string | number) => void
}

const InputComponents: Record<InputKind, React.ComponentType<any>> = {
  number: NumberInput,
  text: TextInput,
  boolean: BooleanInput,
  select: SelectInput,
  geojson: GeoJSONInput,
  'geojson-file': GeoJSONFileInput
}

export function InputWrapper(
  props: Props & { className?: string; disabled?: boolean }
) {
  const InputComp = InputComponents[props.kind]

  return (
    <div
      className={cn(
        props.className,
        'flex h-9 w-full justify-center',
        props.labelPosition === 'top' ? 'flex-col' : 'flex-row items-center'
      )}
    >
      {props.label ? (
        <div
          className={cn(
            props.labelPosition === 'top' ? 'text-center text-sm' : 'w-24'
          )}
        >
          {props.label}
        </div>
      ) : (
        ''
      )}
      <div className='flex-grow'>
        <InputComp {...props} disabled={props.disabled} />
      </div>
    </div>
  )
}

export function InputContainer(props: Props) {
  const nodeId = useNodeId()
  const hasHandle = props.hasHandle
  const nodeData = useNodesData(nodeId!)
  const { updateNodeData } = useReactFlow()

  const connections = useHandleConnections({ type: 'target', id: props.id })
  const disabled = connections.length > 0

  useEffect(() => {
    if (nodeData) {
      const newData = nodeData.data
      updateNodeData(props.id!, {
        ...newData,
        _state: {
          isConnected: disabled
        }
      })
    }
  }, [disabled, nodeData, props.id, updateNodeData])

  return (
    <>
      {!hasHandle ? (
        <InputWrapper {...props} disabled={disabled} className='px-3' />
      ) : (
        <CustomHandle id={props.id!} type='target' kind={props.kind}>
          <InputWrapper {...props} disabled={disabled} />
        </CustomHandle>
      )}
    </>
  )
}

export default InputContainer

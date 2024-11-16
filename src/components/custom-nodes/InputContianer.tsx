import { Input } from '../editor/backend'
import CustomHandle from '../editor/nodes/CustomHandle'
import NumberInput from '../inputs/NumberInput'
import SelectInput from '../inputs/SelectInput'

type Props = Input & {
  onChange: (v: string | number) => void
}

export function InputContainer(props: Props) {
  const hasHandle = props.hasHandle
  const onChange = props.onChange

  return (
    <>
      {!hasHandle ? (
        <>
          {props.type === 'number' && (
            <NumberInput step={1} value={props.value} onChange={onChange} />
          )}
          {props.type === 'select' && (
            <SelectInput
              value={props.value}
              options={props.options}
              onChange={onChange}
            />
          )}
        </>
      ) : (
        <CustomHandle id={props.id} type='target'>
          {props.type === 'number' && (
            <NumberInput step={1} value={props.value} onChange={onChange} />
          )}
          {props.type === 'select' && (
            <SelectInput
              value={props.value}
              options={props.options}
              onChange={onChange}
            />
          )}
        </CustomHandle>
      )}
    </>
  )
}

export default InputContainer

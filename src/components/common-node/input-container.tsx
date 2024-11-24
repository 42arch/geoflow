import { Input, InputKind } from '@/types'
import CustomHandle from './custom-handle'
import NumberInput from '../inputs/number-input'
import SelectInput from '../inputs/SelectInput'
import GeoJSONFileInput from '../inputs/geojson-file-input'
import GeoJSONInput from '../inputs/geojson-input'
import BooleanInput from '../inputs/boolean-input'

type Props = Input & {
  onChange: (v: string | number) => void
}

const InputComponents: Record<InputKind, React.ComponentType<any>> = {
  number: NumberInput,
  boolean: BooleanInput,
  select: SelectInput,
  geojson: GeoJSONInput,
  'geojson-file': GeoJSONFileInput
}

export function InputContainer(props: Props) {
  const hasHandle = props.hasHandle
  const onChange = props.onChange

  const InputComp = InputComponents[props.kind]

  return (
    <>
      {!hasHandle ? (
        <div className='mx-2'>
          <InputComp {...props} />
        </div>
      ) : (
        <CustomHandle id={props.id} type='target'>
          <InputComp {...props} />
        </CustomHandle>
      )}
    </>
  )
}

export default InputContainer

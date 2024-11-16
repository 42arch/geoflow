import { Output } from '../editor/backend'
import CustomHandle from '../editor/nodes/CustomHandle'
import GenericOutput from '../outputs/GenericOutput'

export function OutputContainer({ id, hasHandle, value }: Output) {
  return (
    <>
      {hasHandle ? (
        <CustomHandle id={id} type='source'>
          <GenericOutput value={value} />
        </CustomHandle>
      ) : (
        <GenericOutput value={value} />
      )}
    </>
  )
}

export default OutputContainer

import { Output, OutputKind } from '@/types'
import CustomHandle from './custom-handle'
import GenericOutput from '../outputs/generic-output'
import GeoJSONOutput from '../outputs/geojson-output'
import GeoJSONViewerOutput from '../outputs/geojson-viewer-output'
import TableOutput from '../outputs/table-output'

const OutputComponents: Record<
  OutputKind,
  React.ComponentType<{ value: any }>
> = {
  number: GenericOutput,
  text: GenericOutput,
  geojson: GeoJSONOutput,
  'geojson-viewer': GeoJSONViewerOutput,
  table: TableOutput
}

export function OutputContainer({ id, hasHandle, value, kind }: Output) {
  const OutputComp = OutputComponents[kind]

  return (
    <>
      {hasHandle ? (
        <CustomHandle id={id} type='source' kind={kind}>
          <OutputComp value={value} />
        </CustomHandle>
      ) : (
        <OutputComp value={value} />
      )}
    </>
  )
}

export default OutputContainer

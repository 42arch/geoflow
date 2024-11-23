import { Output, OutputKind } from '@/types'
import CustomHandle from './custom-handle'
import GenericOutput from '../outputs/generic-output'
import GeoJSONOutput from '../outputs/geojson-output'
import GeoJSONViewerOutput from '../outputs/geojson-viewer-output'

const OutputComponents: Record<
  OutputKind,
  React.ComponentType<{ value: any }>
> = {
  number: GenericOutput,
  geojson: GeoJSONOutput,
  'geojson-viewer': GeoJSONViewerOutput
}

export function OutputContainer({ id, hasHandle, value, kind }: Output) {
  const OutputComp = OutputComponents[kind]

  return (
    <>
      {hasHandle ? (
        <CustomHandle id={id} type='source'>
          <OutputComp value={value} />
        </CustomHandle>
      ) : (
        <OutputComp value={value} />
      )}
    </>
  )
}

export default OutputContainer

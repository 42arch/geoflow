import { NodeFunction, SelectOption } from '@/types'
import { buffer as turfBuffer } from '@turf/turf'
import { FeatureCollection, GeometryObject } from 'geojson'

export const UNIT_OPTIONS: SelectOption[] = [
  {
    label: 'Kilometers',
    value: 'kilometers'
  },
  {
    label: 'Meters',
    value: 'meters'
  }
]

export const UNIT_VALUE = UNIT_OPTIONS[0].value

const buffer: NodeFunction = (
  data: FeatureCollection<GeometryObject>,
  radius: number,
  units: string,
  steps: string
) => {
  //@ts-ignore: turf type issue
  const result = turfBuffer(data, radius, {
    units: units,
    steps: steps
  })

  console.log('buffer', result)

  return [result]
}

export default buffer

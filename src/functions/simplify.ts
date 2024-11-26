import { NodeFunction } from '@/types'
import { simplify as turfSimplify } from '@turf/turf'
import { FeatureCollection } from 'geojson'

const simplify: NodeFunction = (
  data: FeatureCollection,
  tolerance: number,
  highQuality: boolean
) => {
  const result = turfSimplify(data, {
    tolerance: tolerance,
    highQuality: highQuality
  })
  return [result]
}

export default simplify

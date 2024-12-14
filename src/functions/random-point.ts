import { randomPoint as turfRandomPoint } from '@turf/turf'
import { NodeFunction } from '@/types'
import { BBox } from 'geojson'

const randomPoint: NodeFunction = (count: number, bbox?: BBox) => {
  const result = turfRandomPoint(count, {
    bbox
  })
  return [result]
}

export default randomPoint

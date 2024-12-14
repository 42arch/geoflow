import { randomLineString as turfRandomLineString } from '@turf/turf'
import { NodeFunction } from '@/types'
import { BBox } from 'geojson'

const randomLine: NodeFunction = (
  count: number,
  bbox: BBox,
  numVertices: number,
  maxLength?: number,
  maxRotation?: number
) => {
  const result = turfRandomLineString(count, {
    bbox,
    num_vertices: numVertices,
    max_length: maxLength,
    max_rotation: maxRotation
  })
  return [result]
}

export default randomLine

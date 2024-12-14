import { randomPolygon as turfRandomPolygon } from '@turf/turf'
import { NodeFunction } from '@/types'
import { BBox } from 'geojson'

const randomPolygon: NodeFunction = (
  count: number,
  bbox: BBox,
  numVertices: number,
  maxRadialLength?: number
) => {
  const result = turfRandomPolygon(count, {
    bbox,
    num_vertices: numVertices,
    max_radial_length: maxRadialLength
  })
  return [result]
}

export default randomPolygon

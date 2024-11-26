import { NodeFunction } from '@/types'
import { booleanPointInPolygon } from '@turf/turf'
import { Feature, FeatureCollection, Point, Polygon } from 'geojson'

const pointInPolygon: NodeFunction = (
  point: FeatureCollection<Point>,
  polygon: FeatureCollection<Polygon>
) => {
  const result = booleanPointInPolygon(point, polygon)
}

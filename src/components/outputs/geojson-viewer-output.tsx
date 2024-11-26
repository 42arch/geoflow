import { useEffect } from 'react'
import {
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification
} from 'mapbox-gl'
import Map, { Layer, Source, useMap } from 'react-map-gl'
import { bbox } from '@turf/turf'
import { FeatureCollection } from 'geojson'

const pointStyle: CircleLayerSpecification = {
  id: 'point',
  source: 'geojson-source',
  type: 'circle',
  filter: ['==', '$type', 'Point'],
  paint: {
    'circle-color': '#0059ff',
    'circle-radius': 5,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff'
  }
}

const lineStyle: LineLayerSpecification = {
  id: 'line',
  source: 'geojson-source',
  type: 'line',
  filter: ['==', '$type', 'LineString'],
  paint: {
    'line-width': 3,
    'line-color': '#0059ff'
  }
}

const polygonStyle: FillLayerSpecification = {
  id: 'polygon',
  source: 'geojson-source',
  type: 'fill',
  filter: ['==', '$type', 'Polygon'],
  paint: {
    'fill-antialias': true,
    'fill-color': '#0059ff',
    'fill-opacity': 0.7,
    'fill-outline-color': '#ffffff'
  }
}

interface Props {
  value: FeatureCollection
}

function GeoJsonLayer({ value }: Props) {
  const { current: map } = useMap()
  useEffect(() => {
    if (value) {
      const bound = bbox(value)
      map?.fitBounds(
        [
          [bound[0], bound[1]],
          [bound[2], bound[3]]
        ],
        { padding: 10 }
      )
    }
  }, [value])
  return (
    <Source id='geojson-source' type='geojson' data={value}>
      <Layer {...lineStyle} />
      <Layer {...pointStyle} />
      <Layer {...polygonStyle} />
    </Source>
  )
}

export default function GeoJSONViewerOutput({ value }: Props) {
  return (
    <div className='h-[200px] w-full p-1'>
      <Map
        mapboxAccessToken='pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 1
        }}
        attributionControl={false}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <GeoJsonLayer value={value} />
      </Map>
    </div>
  )
}
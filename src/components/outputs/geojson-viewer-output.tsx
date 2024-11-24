import { useEffect } from 'react'
import { LineLayerSpecification } from 'mapbox-gl'
import Map, { Layer, Source, useMap } from 'react-map-gl'
import { bbox } from '@turf/turf'
import { FeatureCollection } from 'geojson'

const lineStyle: LineLayerSpecification = {
  id: 'line',
  source: 'geojson-source',
  type: 'line',
  filter: ['==', '$type', 'LineString'],
  paint: {
    'line-width': 4,
    'line-color': '#0059ff'
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

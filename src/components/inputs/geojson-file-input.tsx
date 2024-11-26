import { Input } from '@/components/ui/input'

interface GeoJSONFileInputProps {
  onChange: (v: File | undefined) => void
}

export default function GeoJSONFileInput({ onChange }: GeoJSONFileInputProps) {
  return (
    <Input
      id='input-30'
      className='p-0 pe-3 file:me-3 file:border-0 file:border-e'
      type='file'
      accept='.json,.geojson'
      onChange={(e) => {
        const file = e.target.files?.[0]
        onChange(file)
      }}
    />
  )
}

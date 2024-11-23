import { Input } from '@/components/ui/input'

interface GeoJSONFileInputProps {
  onChange: (v: object | null) => void
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
        if (!file) {
          onChange(null)
          return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const content = JSON.parse(event.target?.result as string)

            console.log(44444, content)

            onChange(content)
          } catch (error) {
            console.error('Error parsing GeoJSON file:', error)
            onChange(null)
          }
        }
        reader.readAsText(file)
      }}
    />
  )
}

import { Minus, Plus } from 'lucide-react'
import { Button, Group, Input, NumberField } from 'react-aria-components'

interface NumberInputProps {
  value: number
  step?: number
  onChange: (v: number) => void
}

export default function NumberInput({
  value,
  step = 1,
  onChange
}: NumberInputProps) {
  return (
    <NumberField
      defaultValue={value}
      value={value}
      step={step}
      minValue={0}
      onChange={onChange}
    >
      <div className='space-y-2'>
        <Group className='border-input data-[focus-within]:border-ring data-[focus-within]:ring-ring/20 relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border text-sm shadow-sm shadow-black/5 transition-shadow data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px]'>
          <Button
            slot='decrement'
            className='border-input text-muted-foreground/80 hover:bg-accent -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-lg border bg-background text-sm transition-shadow hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          >
            <Minus size={16} strokeWidth={2} aria-hidden='true' />
          </Button>
          <Input className='w-full grow bg-background px-3 py-2 text-center tabular-nums text-foreground focus:outline-none' />
          <Button
            slot='increment'
            className='border-input text-muted-foreground/80 hover:bg-accent -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-lg border bg-background text-sm transition-shadow hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          >
            <Plus size={16} strokeWidth={2} aria-hidden='true' />
          </Button>
        </Group>
      </div>
    </NumberField>
  )
}

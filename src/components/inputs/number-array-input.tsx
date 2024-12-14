import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button, Group, Input, NumberField } from 'react-aria-components'

interface NumberArrayInputProps {
  value: number[]
  disabled?: boolean
  options: {
    minValue: number
    maxValue: number
    step: number
  }[]
  onChange: (v: number[]) => void
}

export default function NumberArrayInput({
  value,
  options,
  onChange
}: NumberArrayInputProps) {
  return (
    <div className='space-y-2'>
      <div className='flex w-full items-center justify-center gap-2'>
        {options.map((option, idx) => (
          <NumberField
            maxValue={option.maxValue}
            minValue={option.minValue}
            step={option.step}
            defaultValue={value[idx]}
            key={idx}
            onChange={(v) => {
              const newValue = value.map((i, index) => (index === idx ? v : i))
              onChange(newValue)
            }}
          >
            <Group className='relative inline-flex h-9 items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20'>
              <Input className='w-16 bg-background px-3 py-2 tabular-nums text-foreground focus:outline-none' />
              <div className='flex h-[calc(100%+2px)] flex-col'>
                <Button
                  slot='increment'
                  className='-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <ChevronUp size={12} strokeWidth={2} aria-hidden='true' />
                </Button>
                <Button
                  slot='decrement'
                  className='-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <ChevronDown size={12} strokeWidth={2} aria-hidden='true' />
                </Button>
              </div>
            </Group>
          </NumberField>
        ))}
      </div>
    </div>
  )
}

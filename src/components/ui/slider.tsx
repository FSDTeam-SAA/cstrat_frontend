import * as SliderPrimitive from '@radix-ui/react-slider';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type SliderProps = {
  className?: string;
  min: number;
  max: number;
  step: number;
  minStepsBetweenThumbs?: number;
  value?: number[];
  onValueChange?: (values: number[]) => void;
};

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, min, max, step, minStepsBetweenThumbs = 0, value, onValueChange, ...props }, ref) => {
    const initialValue = value && value.length > 0 ? value : [min, max];
    const [localValues, setLocalValues] = useState<number[]>(initialValue);

    useEffect(() => {
      if (value && value.length > 0) {
        setLocalValues([...value]);
      }
    }, [value]);

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues);
      onValueChange?.(newValues);
    };

    return (
      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        value={localValues}
        onValueChange={handleValueChange}
        className={cn('relative mb-6 flex w-full touch-none select-none items-center', className)}
        {...props}
      >
        <SliderPrimitive.Track className="dark:!bg-pinkGradient/20 relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="dark:bg-pinkGradient absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {localValues.map((value, index) => (
          <React.Fragment key={index}>
            <div
              className="absolute text-center"
              style={{ left: `calc(${((value - min) / (max - min)) * 100}% + 0px)`, top: `10px` }}
            />
            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  },
);

Slider.displayName = 'Slider';

export { Slider };

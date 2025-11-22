import { cn } from '@/utils/cn';
import * as React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  label: string;
  error?: string;
}

function Input({ className, type, label, error, value, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className={cn(
          'flex items-center gap-2 text-sm font-medium leading-none select-none',
          error ? 'text-red-500' : 'text-gray-600',
        )}
      >
        {label}
      </label>
      <input
        type={type}
        data-slot="input"
        aria-invalid={!!error}
        value={value || ''}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-primary',
          'aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export { Input };

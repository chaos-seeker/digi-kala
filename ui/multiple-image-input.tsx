'use client';

import { cn } from '@/utils/cn';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

interface MultipleImageInputProps {
  label: string;
  value?: string[];
  onChange: (images: string[]) => void;
  error?: string;
  className?: string;
}

export function MultipleImageInput({
  label,
  value = [],
  onChange,
  error,
  className,
}: MultipleImageInputProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const promises = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64Images) => {
      onChange([...value, ...base64Images]);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        className={cn(
          'flex items-center gap-2 text-sm font-medium leading-none select-none text-right',
          error ? 'text-red-500' : 'text-gray-600',
        )}
      >
        {label}
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {value.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-md border border-gray-200"
          >
            <Image
              src={image}
              alt={`تصویر ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 flex items-center justify-center size-6 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}

        <div
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-primary hover:bg-gray-100"
        >
          <ImageIcon className="size-8 text-gray-400" />
          <span className="text-xs text-gray-600 text-center">
            افزودن تصویر
          </span>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        aria-invalid={!!error}
      />
      {error && (
        <span className="text-xs text-red-500 text-right">{error}</span>
      )}
    </div>
  );
}

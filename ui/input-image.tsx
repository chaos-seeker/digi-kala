'use client';

import { cn } from '@/utils/cn';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

interface InputImageProps {
  label: string;
  value?: string | File | null;
  onChange: (file: File | null, preview: string | null) => void;
  error?: string;
  className?: string;
}

export function InputImage({
  label,
  value,
  onChange,
  error,
  className,
}: InputImageProps) {
  const [preview, setPreview] = React.useState<string | null>(
    typeof value === 'string' ? value : null,
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (typeof value === 'string') {
      setPreview(value);
    } else if (value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setPreview(previewUrl);
        onChange(file, previewUrl);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onChange(null, null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        className={cn(
          'flex items-center gap-2 text-sm font-medium leading-none select-none',
          error ? 'text-red-500' : 'text-gray-600',
        )}
      >
        {label}
      </label>
      <div className="relative">
        {preview ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-md border border-gray-200">
            <Image src={preview} alt="Preview" fill className="object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 flex items-center justify-center size-8 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors hover:border-primary hover:bg-gray-100"
          >
            <ImageIcon className="size-12 text-gray-400" />
            <span className="text-sm text-gray-600">
              برای انتخاب تصویر کلیک کنید
            </span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-invalid={!!error}
        />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

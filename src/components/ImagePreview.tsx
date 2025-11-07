'use client';

import { Button } from '@/components/ui/button';
import type { CatGenerationResult } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Copy, Download, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ImagePreviewProps {
  result: CatGenerationResult | null;
  isLoading: boolean;
}

export function ImagePreview({ result, isLoading }: ImagePreviewProps) {
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="flex h-full min-h-[380px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        <div className="space-y-2">
          <p className="text-lg font-semibold">No cat yet.</p>
          <p className="text-sm">Describe your dream cat and Catforge will conjure it once you hit forge.</p>
        </div>
      </div>
    );
  }

  const handleCopy = async (url: string) => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link', error);
    }
  };

  const mediaWrapperClasses = cn(
    'relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950',
    isLoading && 'opacity-60'
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Prompt</p>
        <p className="mt-1 text-base leading-relaxed text-slate-900 dark:text-slate-100">
          {result.prompt}
        </p>
        {result.billingNote && (
          <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
            {result.billingNote}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={mediaWrapperClasses}>
          <Image
            src={result.imageUrl}
            alt="Generated cat"
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="default"
              className="gap-2"
              onClick={() => handleCopy(result.imageUrl)}
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy Image URL'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => window.open(result.imageUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Open Image
            </Button>

            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={async () => {
                try {
                  const response = await fetch(result.imageUrl);
                  const blob = await response.blob();
                  const downloadUrl = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = downloadUrl;
                  link.download = 'catforge-image.png';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(downloadUrl);
                } catch (error) {
                  console.error('Failed to download image', error);
                }
              }}
            >
              <Download className="h-4 w-4" />
              Download Image
            </Button>
          </div>
        </div>
      </div>

      {/* Animation output removed now that Sora is unavailable */}
    </div>
  );
}

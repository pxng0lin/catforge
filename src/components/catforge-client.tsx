'use client';

import { useState, useTransition } from 'react';

import { generateCat } from '@/app/actions/generate';
import { CatForgeForm } from '@/components/Form';
import { ImagePreview } from '@/components/ImagePreview';
import { Loader } from '@/components/Loader';
import type { CatFormValues, CatGenerationResult } from '@/lib/types';
import { EchoSignIn } from '@merit-systems/echo-next-sdk/client';

interface CatForgeClientProps {
  signedIn: boolean;
}

export function CatForgeClient({ signedIn }: CatForgeClientProps) {
  const [result, setResult] = useState<CatGenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (values: CatFormValues) => {
    if (!signedIn) {
      setError('Please sign in to generate your cat.');
      return;
    }

    startTransition(() => {
      setError(null);
      generateCat(values)
        .then(setResult)
        .catch(err => {
          setError(err instanceof Error ? err.message : 'Failed to generate cat');
        });
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
      <CatForgeForm
        onSubmit={handleSubmit}
        isPending={isPending}
        disabled={!signedIn}
      />

      <div className="space-y-6">
        {isPending && <Loader label="Forging your cat via Echo..." />}
        <ImagePreview result={result} isLoading={isPending} />
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}
        {!signedIn && (
          <div className="rounded-xl border border-border/60 bg-muted/40 p-6 text-center">
            <p className="text-sm font-medium text-foreground">
              Connect your Echo account to start forging cats.
            </p>
            <div className="mt-4 flex justify-center">
              <EchoSignIn />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

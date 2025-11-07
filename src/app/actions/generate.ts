'use server';

import { generateEchoImage } from '@/lib/echo';
import type { CatFormValues, CatGenerationResult, CatTheme } from '@/lib/types';
import { buildPrompt, CAT_THEMES } from '@/lib/utils';

function normaliseTheme(theme: CatTheme) {
  return CAT_THEMES.includes(theme) ? theme : 'pop';
}

function sanitiseText(value: string) {
  return value.trim();
}

export async function generateCat(form: CatFormValues): Promise<CatGenerationResult> {
  const values: CatFormValues = {
    ...form,
    city: sanitiseText(form.city),
    colour: sanitiseText(form.colour),
    scenery: sanitiseText(form.scenery),
    theme: normaliseTheme(form.theme),
  };

  const prompt = buildPrompt(values);

  const image = await generateEchoImage({
    prompt,
  });

  return {
    prompt,
    imageUrl: image.url,
    billingNote:
      'Usage-based pricing is handled automatically by Echo according to your configured provider rates.',
  };
}

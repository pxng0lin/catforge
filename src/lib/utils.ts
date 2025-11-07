import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CatFormValues, CatTheme } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CAT_THEMES: CatTheme[] = [
  'pop',
  'retro',
  'goth',
  'comic',
  'fantasy',
  'cyberpunk',
  'surreal',
  'vaporwave',
  'noir',
  'dreamcore',
] as const;

const THEME_FLAVORS: Record<CatTheme, string> = {
  pop: 'bold pop-art patterns, neon gradients, glossy reflections, playful stickers',
  retro: '70s retro futurism, warm film grain, soft vignette, analogue imperfections',
  goth: 'dramatic gothic ambiance, moody chiaroscuro lighting, ornate textures',
  comic: 'dynamic comic-book ink lines, halftone shading, exaggerated motion swooshes',
  fantasy: 'epic fantasy illustration, shimmering magic particles, enchanted atmosphere',
  cyberpunk: 'neon cyberpunk skyline glow, holographic UI glyphs, chrome details',
  surreal: 'dreamlike surreal composition, unexpected scale shifts, floating props',
  vaporwave: 'vaporwave pastel gradients, synthwave grid horizon, nostalgic glitch art',
  noir: 'noir-inspired high-contrast lighting, smoky ambience, cinematic framing',
  dreamcore: 'liminal dreamcore haze, soft diffused glow, whimsical floating motifs',
};

export function buildPrompt(values: CatFormValues) {
  const city = values.city.trim() || 'an unknown city';
  const colour = values.colour.trim() || 'mysterious';
  const scenery = values.scenery.trim() || 'whimsical chaos';
  const theme = values.theme || 'pop';

  const mood = THEME_FLAVORS[theme] ?? THEME_FLAVORS.pop;

  return [
    `Ultra-creative illustration of a ${colour} cat causing legendary chaos in ${city}.`,
    `Scene inspiration: ${scenery}.`,
    `Stylistic direction: ${mood}.`,
    'Tone: mischievous, meme-worthy, joyful, irresistibly shareable.',
    'Rendering: cinematic lighting, volumetric glow, UHD detail, rich texture, bokeh sparks.',
    'Freeze the moment with crisp focus and an expressive, over-the-top posture.',
  ].join(' ');
}

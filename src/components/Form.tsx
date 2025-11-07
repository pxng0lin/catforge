'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CatFormValues } from '@/lib/types';
import { CAT_THEMES } from '@/lib/utils';

interface CatForgeFormProps {
  onSubmit: (values: CatFormValues) => void;
  isPending: boolean;
  disabled?: boolean;
}

const INITIAL_VALUES: CatFormValues = {
  city: '',
  colour: '',
  scenery: '',
  theme: 'pop',
};

const formatThemeLabel = (theme: CatFormValues['theme']) =>
  theme
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export function CatForgeForm({
  onSubmit,
  isPending,
  disabled = false,
}: CatForgeFormProps) {
  const [values, setValues] = useState<CatFormValues>(INITIAL_VALUES);

  const isDisabled = disabled || isPending;

  const handleInputChange =
    (key: keyof CatFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues(prev => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  const handleThemeChange = (theme: CatFormValues['theme']) => {
    setValues(prev => ({
      ...prev,
      theme,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-lg backdrop-blur"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Forge your cat
        </h2>
        <p className="text-sm text-muted-foreground">
          Describe the cat, set the vibe, and catforge will handle the rest.
        </p>
        {disabled ? (
          <div className="rounded-md border border-dashed border-indigo-400/50 bg-indigo-500/10 p-3 text-sm text-indigo-100">
            Please sign in with Echo to unlock the forge.
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          <span className="font-medium text-slate-100">City</span>
          <Input
            id="city"
            placeholder="Tokyo, Moon Base Alpha, Atlantis..."
            value={values.city}
            disabled={isDisabled}
            onChange={handleInputChange('city')}
            required
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span className="font-medium text-slate-100">Colour</span>
          <Input
            id="colour"
            placeholder="Neon orange, galaxy purple..."
            value={values.colour}
            disabled={isDisabled}
            onChange={handleInputChange('colour')}
            required
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
          <span className="font-medium text-slate-100">Scenery</span>
          <Input
            id="scenery"
            placeholder="Hoverboards, ramen stalls, floating castles..."
            value={values.scenery}
            disabled={isDisabled}
            onChange={handleInputChange('scenery')}
            required
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span className="font-medium text-slate-100">Theme</span>
          <Select
            value={values.theme}
            onValueChange={value =>
              handleThemeChange(value as CatFormValues['theme'])
            }
            disabled={isDisabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pick a vibe" />
            </SelectTrigger>
            <SelectContent>
              {CAT_THEMES.map(theme => (
                <SelectItem key={theme} value={theme}>
                  {formatThemeLabel(theme)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

      </div>

      <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-200 shadow-inner">
        <p className="font-semibold text-slate-100">Billing</p>
        <p className="mt-1 text-xs text-slate-400">
          Echo bills this generation automatically based on your configured provider rates. Check your Echo dashboard for usage details once the cat is forged.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full sm:w-auto"
        disabled={isDisabled}
      >
        {isPending ? 'Summoning…' : 'Forge my cat'}
      </Button>
    </form>
  );
}

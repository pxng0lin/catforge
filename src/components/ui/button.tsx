import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 focus-visible:ring-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-400',
        destructive:
          'bg-destructive text-white shadow-md hover:bg-destructive/80 focus-visible:ring-destructive/40 dark:bg-destructive',
        outline:
          'border border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-100 dark:border-white/30 dark:bg-slate-900/60 dark:text-white dark:hover:bg-white/10',
        secondary:
          'bg-slate-900 text-white shadow-sm hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700',
        ghost:
          'text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/10',
        link: 'text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-300',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
export function TextLink({ className, ...props }: ComponentProps<'a'>) {
  return <a className={cn('text-link', className)} {...props} />;
}

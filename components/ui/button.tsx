import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
type Variant = 'primary' | 'secondary';
export function Button({
  className,
  variant = 'primary',
  ...props
}: ComponentProps<'button'> & { variant?: Variant }) {
  return (
    <button
      className={cn('button', `button-${variant}`, className)}
      {...props}
    />
  );
}
export function ButtonLink({
  className,
  variant = 'primary',
  ...props
}: ComponentProps<'a'> & { variant?: Variant }) {
  return (
    <a className={cn('button', `button-${variant}`, className)} {...props} />
  );
}

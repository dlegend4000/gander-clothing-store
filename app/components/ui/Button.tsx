import {cn} from '~/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-sm',
        size === 'lg' && 'px-8 py-4 text-base',
        variant === 'primary' &&
          'bg-zinc-900 text-white hover:bg-zinc-700 active:bg-zinc-800',
        variant === 'secondary' &&
          'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
        variant === 'outline' &&
          'border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white',
        variant === 'ghost' && 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100',
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

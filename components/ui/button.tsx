import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'gradient' | 'dark';
  icon?: boolean;
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = 'gradient',
  icon = true,
  className = '',
}: ButtonProps) {
  const baseClasses =
    'group inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-all duration-300 hover:shadow-lg';

  const variantClasses = {
    gradient:
      'bg-gradient-to-r from-primary via-primary to-primary-light text-white border-2 border-white/20 hover:border-white/40 hover:shadow-primary/30',
    dark: 'bg-gray-900 text-white border-2 border-gray-800 hover:bg-gray-800 hover:border-gray-700',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {children}
      {icon && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

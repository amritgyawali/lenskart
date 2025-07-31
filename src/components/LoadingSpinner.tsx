import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const variantClasses = {
  default: 'text-gray-500',
  primary: 'text-blue-600',
  secondary: 'text-gray-400',
};

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default', 
  className,
  text 
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="flex flex-col items-center space-y-2">
        <Loader2 
          className={cn(
            'animate-spin',
            sizeClasses[size],
            variantClasses[variant]
          )} 
        />
        {text && (
          <p className={cn('text-sm', variantClasses[variant])}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

export function PageLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <LoadingSpinner size="xl" variant="primary" text={text} />
    </div>
  );
}

export function LoadingOverlay({ 
  isVisible, 
  text = 'Loading...' 
}: { 
  isVisible: boolean; 
  text?: string; 
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6">
        <LoadingSpinner size="lg" variant="primary" text={text} />
      </div>
    </div>
  );
}

export function ButtonLoader({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <Loader2 
      className={cn(
        'animate-spin',
        size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
      )} 
    />
  );
}
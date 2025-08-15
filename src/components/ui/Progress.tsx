import React from 'react';
import { cn } from '../../utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  className,
  showText = true,
  size = 'md'
}) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={cn('w-full', className)}>
      {showText && (
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{current} of {total}</span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', heights[size])}>
        <div
          className={cn('bg-blue-600 transition-all duration-300 ease-out', heights[size])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="text-xs text-gray-500 mt-1 text-center">
          {Math.round(percentage)}% complete
        </div>
      )}
    </div>
  );
};

interface StepProgressProps {
  steps: Array<{
    id: string;
    title: string;
    status: 'completed' | 'current' | 'pending';
  }>;
  className?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({ steps, className }) => {
  return (
    <nav aria-label="Progress" className={className}>
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className={cn(
            'relative',
            stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20 flex-1' : ''
          )}>
            <>
              {step.status === 'completed' ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-blue-600" />
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                    <svg
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </>
              ) : step.status === 'current' ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white"
                    aria-current="step"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                    <span className="h-2.5 w-2.5 rounded-full bg-transparent" aria-hidden="true" />
                  </div>
                </>
              )}
              <span className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 w-20 text-center">
                {step.title}
              </span>
            </>
          </li>
        ))}
      </ol>
    </nav>
  );
};

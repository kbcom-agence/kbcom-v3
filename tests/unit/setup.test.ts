import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('Setup Validation', () => {
  it('should merge Tailwind classes correctly', () => {
    const result = cn('text-primary', 'bg-gray-100');
    expect(result).toContain('text-primary');
    expect(result).toContain('bg-gray-100');
  });

  it('should handle conflicting classes with twMerge', () => {
    const result = cn('p-4', 'p-6');
    // twMerge should keep only p-6
    expect(result).toBe('p-6');
  });

  it('should handle conditional classes', () => {
    const result = cn('base-class', {
      'conditional-class': true,
      'not-applied': false,
    });
    expect(result).toContain('base-class');
    expect(result).toContain('conditional-class');
    expect(result).not.toContain('not-applied');
  });
});

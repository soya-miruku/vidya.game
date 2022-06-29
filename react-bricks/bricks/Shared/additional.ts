export type Padding = 'xxl' | 'xl' | 'lg' | 'sm' | 'none';
export type NumColumns = 1 | 2 | 3 | 4;
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Gap = 'sm' | 'md' | 'lg';
export type BlurAmount = 'none' | 'sm' | 'md' | 'lg';
export type Round = 'none' | 'sm' | 'md' | 'lg';

export interface ICustomKnobProps {
  id: string;
  value: any;
  onChange: any;
  isValid: boolean;
  errorMessage?: string;
}
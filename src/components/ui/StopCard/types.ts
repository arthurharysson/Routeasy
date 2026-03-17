import { ReactNode } from 'react';

export type StopType = 'origin' | 'delivery' | 'destination';

export interface StopCardProps {
  label: string;
  address: string;
  type: StopType;
  icon: ReactNode;
  drag?: () => void;
  isActive?: boolean;
}

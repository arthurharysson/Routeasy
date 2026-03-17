import { ReactNode } from 'react';

export type MetricTrend = 'up' | 'down';

export interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  percentage: string;
  trend: MetricTrend;
  size?: 'large' | 'small';
}

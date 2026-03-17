export type ActivityStatus = 'completed' | 'in_progress' | 'cancelled';

export interface ActivityCardProps {
  name: string;
  date: string;
  distanceKm: number;
  totalStops: number;
  status: ActivityStatus;
  mapImage?: string;
  onPress?: () => void;
}

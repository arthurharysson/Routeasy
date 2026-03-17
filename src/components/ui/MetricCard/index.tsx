import { Text, View } from 'react-native';
import { MetricCardProps } from './types';

export default function MetricCard({
  icon,
  label,
  value,
  percentage,
  trend,
  size = 'small',
}: MetricCardProps) {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';
  const trendIcon = trend === 'up' ? '↗' : '↘';

  return (
    <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
      <View className="flex-row items-start justify-between">
        <View className="bg-indigo-50 rounded-xl p-2">{icon}</View>
        <Text className={`text-sm font-medium ${trendColor}`}>
          {trendIcon} {percentage}
        </Text>
      </View>

      <Text className={`text-gray-500 mt-3 ${size === 'large' ? 'text-base' : 'text-sm'}`}>
        {label}
      </Text>
      <Text className={`font-bold text-gray-900 mt-1 ${size === 'large' ? 'text-3xl' : 'text-2xl'}`}>
        {value}
      </Text>
    </View>
  );
}

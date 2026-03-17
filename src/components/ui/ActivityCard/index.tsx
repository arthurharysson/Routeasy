import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ActivityCardProps, ActivityStatus } from './types';

const statusLabel: Record<ActivityStatus, string> = {
  completed: 'CONCLUÍDO',
  in_progress: 'EM ANDAMENTO',
  cancelled: 'CANCELADO',
};

const statusStyles: Record<ActivityStatus, { bg: string; text: string }> = {
  completed: { bg: 'bg-green-100', text: 'text-green-700' },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-700' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700' },
};

export default function ActivityCard({
  name,
  date,
  distanceKm,
  totalStops,
  status,
  mapImage,
  onPress,
}: ActivityCardProps) {
  const { bg, text } = statusStyles[status];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center bg-white rounded-2xl p-3 mb-3 shadow-sm"
    >
      {mapImage ? (
        <Image
          source={{ uri: mapImage }}
          className="w-16 h-16 rounded-xl mr-3"
          resizeMode="cover"
        />
      ) : (
        <View className="w-16 h-16 rounded-xl mr-3 bg-indigo-100" />
      )}

      <View className="flex-1">
        <Text className="text-gray-900 font-semibold text-base">{name}</Text>
        <Text className="text-gray-400 text-xs mt-0.5">
          {date} • {distanceKm} km • {totalStops} paradas
        </Text>
        <View className={`self-start mt-2 px-2 py-0.5 rounded-full ${bg}`}>
          <Text className={`text-xs font-bold ${text}`}>
            {statusLabel[status]}
          </Text>
        </View>
      </View>

      <Text className="text-gray-400 text-lg ml-2">›</Text>
    </TouchableOpacity>
  );
}

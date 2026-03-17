import { GripVertical } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { StopCardProps, StopType } from './types';

const iconBgByType: Record<StopType, string> = {
  origin: 'bg-green-100',
  delivery: 'bg-indigo-100',
  destination: 'bg-gray-100',
};

const borderByType: Record<StopType, string> = {
  origin: 'border-l-4 border-l-green-400',
  delivery: 'border-l-4 border-l-indigo-500',
  destination: 'border-l-4 border-l-gray-400',
};

export default function StopCard({
  label,
  address,
  type,
  icon,
  drag,
  isActive,
}: StopCardProps) {
  return (
    <View
      className={[
        'flex-row items-center bg-white rounded-2xl px-4 py-3 mb-3 shadow-sm',
        borderByType[type],
        isActive ? 'opacity-80 scale-105' : '',
      ].join(' ')}
    >
      <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${iconBgByType[type]}`}>
        {icon}
      </View>

      <View className="flex-1">
        <Text className="text-gray-900 font-semibold text-sm">{label}</Text>
        <Text className="text-gray-400 text-xs mt-0.5">{address}</Text>
      </View>

      <TouchableOpacity onLongPress={drag} delayLongPress={100}>
        <GripVertical size={20} color="#d1d5db" />
      </TouchableOpacity>
    </View>
  );
}

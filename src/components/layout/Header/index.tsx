import { Bell, Navigation } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: top }} className="flex-row items-center justify-between px-5 pb-4 bg-white">
      <View className="flex-row items-center gap-2">
        <View className="bg-indigo-100 rounded-full p-1.5">
          <Navigation size={18} color="#6366f1" />
        </View>
        <Text className="text-base font-bold text-gray-900 tracking-widest">ROUTEASY</Text>
      </View>

      <View className="flex-row items-center gap-4">
        <TouchableOpacity>
          <Bell size={24} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            className="w-9 h-9 rounded-full"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

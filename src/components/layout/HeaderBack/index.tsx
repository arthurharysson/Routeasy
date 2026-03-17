import { ArrowLeft, CircleUserRound } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderBackProps {
  title: string;
  onBack?: () => void;
}

export default function HeaderBack({ title, onBack }: HeaderBackProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: top }} className="flex-row items-center justify-between px-5 pb-4 bg-white">
      <TouchableOpacity onPress={onBack} className="w-9 h-9 items-center justify-center">
        <ArrowLeft size={22} color="#374151" />
      </TouchableOpacity>

      <Text className="text-base font-bold text-indigo-500 tracking-widest">{title}</Text>

      <TouchableOpacity className="w-9 h-9 items-center justify-center">
        <CircleUserRound size={26} color="#374151" />
      </TouchableOpacity>
    </View>
  );
}

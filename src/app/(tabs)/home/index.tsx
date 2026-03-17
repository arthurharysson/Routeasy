import Header from '@/components/layout/Header';
import ActivityCard from '@/components/ui/ActivityCard';
import Button from '@/components/ui/Button';
import MetricCard from '@/components/ui/MetricCard';
import { ArrowUpDown, Clock, MapPin, PlusCircle } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const recentActivities = [
  {
    id: '1',
    name: 'Downtown Loop #42',
    date: 'Hoje',
    distanceKm: 4.2,
    totalStops: 12,
    status: 'completed' as const,
  },
  {
    id: '2',
    name: 'Industrial Zone B',
    date: 'Ontem',
    distanceKm: 18.5,
    totalStops: 8,
    status: 'completed' as const,
  },
];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <Header />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View className="mt-6 mb-6">
          <Text className="text-3xl font-bold text-gray-900">Bem-vindo, Arthur</Text>
          <Text className="text-gray-400 mt-1">Sua próxima rota está otimizada e pronta.</Text>
        </View>

        {/* Large metric card */}
        <MetricCard
          size="large"
          icon={<ArrowUpDown size={22} color="#6366f1" />}
          label="Distância Total"
          value="142,5 km"
          percentage="+12%"
          trend="up"
        />

        {/* Small metric cards */}
        <View className="flex-row gap-3 mt-3">
          <MetricCard
            icon={<MapPin size={20} color="#6366f1" />}
            label="Paradas Feitas"
            value="28"
            percentage="+5%"
            trend="up"
          />
          <MetricCard
            icon={<Clock size={20} color="#6366f1" />}
            label="Tempo Economizado"
            value="45 min"
            percentage="-8%"
            trend="down"
          />
        </View>

        {/* Primary button */}
        <View className="mt-6">
          <Button
            label="Iniciar Nova Rota"
            size="lg"
            icon={<PlusCircle size={22} color="#fff" />}
            onPress={() => {}}
          />
        </View>

        {/* Recent activity */}
        <View className="flex-row items-center justify-between mt-8 mb-4">
          <Text className="text-lg font-bold text-gray-900">Atividade Recente</Text>
          <TouchableOpacity>
            <Text className="text-indigo-500 font-medium">Ver Tudo</Text>
          </TouchableOpacity>
        </View>

        {recentActivities.map((item) => (
          <ActivityCard key={item.id} {...item} onPress={() => {}} />
        ))}
      </ScrollView>
    </View>
  );
}

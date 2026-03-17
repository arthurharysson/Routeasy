import HeaderBack from '@/components/layout/HeaderBack';
import Button from '@/components/ui/Button';
import StopCard from '@/components/ui/StopCard';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Home, MapPin, PlusCircle, Search, Sparkles, Truck } from 'lucide-react-native';
import { ReactElement, useMemo, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type StopType = 'origin' | 'delivery' | 'destination';

interface Stop {
  id: string;
  label: string;
  address: string;
  type: StopType;
}

const INITIAL_STOPS: Stop[] = [
  { id: '1', label: 'Ponto de Partida', address: 'Av. Paulista, 1000 - Bela Vista', type: 'origin' },
  { id: '2', label: 'Entrega 01', address: 'Rua Augusta, 150 - Consolação', type: 'delivery' },
  { id: '3', label: 'Entrega 02', address: 'Alameda Santos, 222 - Cerqueira César', type: 'delivery' },
  { id: '4', label: 'Destino Final', address: 'Rua Oscar Freire, 800 - Jardins', type: 'destination' },
];

const stopIcon: Record<StopType, ReactElement> = {
  origin: <Home size={18} color="#16a34a" />,
  delivery: <Truck size={18} color="#6366f1" />,
  destination: <MapPin size={18} color="#ef4444" />,
};

export default function RoutesScreen() {
  const [stops, setStops] = useState<Stop[]>(INITIAL_STOPS);
  const [search, setSearch] = useState('');
  const { top } = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '85%'], []);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Stop>) => (
    <StopCard
      label={item.label}
      address={item.address}
      type={item.type}
      icon={stopIcon[item.type]}
      drag={drag}
      isActive={isActive}
    />
  );

  return (
    <View className="flex-1">
      {/* Map background */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -7.2136,
          longitude: -39.3153,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />

      {/* Floating header */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <HeaderBack title="Otimização de Rota" />
      </View>

      {/* Bottom sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 24 }}
        handleIndicatorStyle={{ backgroundColor: '#d1d5db', width: 40 }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Sheet title */}
          <View className="mb-5 mt-1">
            <Text className="text-2xl font-bold text-gray-900">Planejar Trajeto</Text>
            <Text className="text-gray-400 text-sm mt-1">
              Adicione suas paradas para encontrar o caminho mais rápido.
            </Text>
          </View>

          {/* Search input */}
          <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 mb-5">
            <Search size={18} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-3 text-gray-700 text-sm"
              placeholder="Adicionar novo endereço..."
              placeholderTextColor="#9ca3af"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Draggable stops */}
          <DraggableFlatList
            data={stops}
            keyExtractor={(item) => item.id}
            onDragEnd={({ data }) => setStops(data)}
            renderItem={renderItem}
            scrollEnabled={false}
          />

          {/* Add stop */}
          <TouchableOpacity className="flex-row items-center justify-center border border-dashed border-gray-300 rounded-2xl py-3 mb-5 gap-2">
            <PlusCircle size={18} color="#9ca3af" />
            <Text className="text-gray-400 text-sm">Adicionar outra parada</Text>
          </TouchableOpacity>

          {/* Optimize button */}
          <Button
            label="OTIMIZAR ROTA"
            size="lg"
            icon={<Sparkles size={20} color="#fff" />}
            onPress={() => {}}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

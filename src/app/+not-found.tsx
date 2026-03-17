import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Não encontrado' }} />
      <View className="flex-1 items-center justify-center">
        <Text>Tela não encontrada.</Text>
        <Link href="/home">Voltar para o início</Link>
      </View>
    </>
  );
}

# Implementation Tasks

## Tasks

- [x] 1. Configurar dependências externas
  - Instalar `expo-location`, `react-native-maps`, `react-native-draggable-flatlist`, `@googlemaps/polyline-codec`
  - Configurar permissões de localização no `app.json` (iOS e Android)
  - _Requirements: 2.1, 2.2_

- [ ] 2. Criar tipos globais
  - Criar `src/types/index.ts` com `Address`, `Waypoint`, `OptimizedRoute`, `JourneyState`, `JourneyStatus`
  - _Requirements: 1.2, 3.2, 5.4_

- [ ] 3. Implementar integração com Geocoding API
  - Criar `src/lib/api/geocoding.ts` com `getPlacesAutocomplete` e `getGeocodeByPlaceId`
  - Criar `src/lib/services/geocoding.ts` com `searchAddresses` e `geocodeAddress`
  - _Requirements: 1.1, 1.8, 2.4_

- [ ] 4. Implementar integração com Routes API
  - Criar `src/lib/api/routes.ts` com `postOptimizeRoute`
  - Criar `src/lib/services/routes.ts` com `calculateOptimizedRoute`
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [ ] 5. Criar JourneyContext
  - Criar `src/context/JourneyContext.tsx` com estado e actions da jornada
  - Expor hook `useJourney()`
  - Envolver o layout raiz com o Provider
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 6. Implementar tela Home — cadastro de endereços
  - Criar `src/app/(tabs)/Home/index.tsx`
  - Criar `AddressSearchInput` com autocomplete e debounce
  - Criar `AddressList` com drag-and-drop e remoção de itens
  - Validar duplicatas e limite de 25 endereços
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_

- [ ] 7. Implementar obtenção do Ponto de Partida via GPS
  - Solicitar permissão de localização ao abrir o app
  - Obter coordenadas e setar como origin no contexto
  - Tratar negação de permissão e timeout de 10s com fallback manual
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 8. Implementar tela Map — exibição da rota
  - Criar `src/app/(tabs)/Map/index.tsx`
  - Criar `RouteMap` com polyline decodificada, marcadores numerados e marcador de origem
  - Implementar `fitToCoordinates` para enquadrar todos os pontos
  - Criar `WaypointCallout` com endereço e número de sequência
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 9. Implementar cálculo de rota e exibição de resumo
  - Botão "Calcular Rota" na tela Home chama `calculateOptimizedRoute`
  - Exibir loading e desabilitar botão durante o cálculo
  - Exibir tempo total e distância total após o cálculo
  - Navegar para a tela Map após sucesso
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 10. Implementar tela Navigation — navegação turn-by-turn
  - Criar `src/app/(tabs)/Navigation/index.tsx`
  - Criar `DirectionBanner` com instrução de direção atual
  - Criar `WaypointProgress` com lista de waypoints e status de conclusão
  - Atualizar posição em tempo real via `expo-location` watchPositionAsync
  - Detectar chegada ao waypoint e avançar para o próximo
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 11. Implementar recálculo de rota por desvio
  - Monitorar distância entre posição atual e rota
  - Recalcular via Routes API quando desvio > 50m
  - _Requirements: 5.6_

- [ ] 12. Implementar gerenciamento de estado da jornada
  - Botões de pausar/retomar navegação
  - Confirmação antes de encerrar jornada com progresso
  - Reset completo do estado ao confirmar encerramento
  - Tela de conclusão ao finalizar todos os waypoints
  - _Requirements: 5.5, 5.7, 6.1, 6.2, 6.3, 6.4_

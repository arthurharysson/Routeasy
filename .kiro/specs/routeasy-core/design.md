# Design Document

## Overview

Arquitetura do Routeasy baseada em React Native (Expo) com Expo Router, NativeWind para estilização, e integração com Google Cloud APIs (Geocoding, Routes). O estado global da jornada é gerenciado via React Context. A navegação entre telas usa o sistema de tabs do Expo Router.

---

## Architecture

### Estrutura de Telas

```
src/app/(tabs)/
├── Home/
│   ├── index.tsx                        # Tela de cadastro de endereços
│   └── _components/
│       ├── AddressSearchInput/index.tsx  # Input com autocomplete
│       ├── AddressList/index.tsx         # Lista drag-and-drop de endereços
│       └── AddressListItem/index.tsx     # Item individual da lista
├── Map/
│   ├── index.tsx                        # Tela do mapa com rota
│   └── _components/
│       ├── RouteMap/index.tsx            # Mapa com polyline e marcadores
│       └── WaypointCallout/index.tsx     # Callout ao tocar no marcador
└── Navigation/
    ├── index.tsx                        # Tela de navegação turn-by-turn
    └── _components/
        ├── DirectionBanner/index.tsx     # Instrução de direção atual
        └── WaypointProgress/index.tsx    # Progresso dos waypoints
```

### Componentes Globais

```
src/components/
├── ui/
│   ├── Button/index.tsx
│   ├── Input/index.tsx
│   └── LoadingOverlay/index.tsx
└── layout/
    └── Header/index.tsx
```

### Integração com APIs

```
src/lib/
├── api/
│   ├── geocoding.ts     # getPlacesAutocomplete, getGeocodeByAddress
│   └── routes.ts        # postOptimizeRoute
└── services/
    ├── geocoding.ts     # searchAddresses, geocodeAddress
    └── routes.ts        # calculateOptimizedRoute
```

### Estado Global

```
src/context/
└── JourneyContext.tsx   # Estado da jornada (endereços, rota, navegação)
```

---

## Data Models

### Address

```ts
type Address = {
  id: string;
  label: string;          // Endereço formatado para exibição
  placeId: string;        // Google Place ID
  coordinates: {
    lat: number;
    lng: number;
  };
};
```

### Waypoint

```ts
type Waypoint = Address & {
  sequenceIndex: number;  // Posição na rota otimizada
  completed: boolean;
};
```

### OptimizedRoute

```ts
type OptimizedRoute = {
  waypoints: Waypoint[];
  totalDistanceMeters: number;
  totalDurationSeconds: number;
  encodedPolyline: string;  // Polyline codificada para exibição no mapa
};
```

### JourneyState

```ts
type JourneyStatus = 'idle' | 'planning' | 'navigating' | 'paused' | 'completed';

type JourneyState = {
  status: JourneyStatus;
  origin: Address | null;
  addresses: Address[];
  route: OptimizedRoute | null;
  currentWaypointIndex: number;
};
```

---

## Components

### JourneyContext

Provê e gerencia o estado global da jornada. Exposto via hook `useJourney()`.

```ts
type JourneyContextValue = {
  state: JourneyState;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  reorderAddresses: (from: number, to: number) => void;
  setOrigin: (address: Address) => void;
  setRoute: (route: OptimizedRoute) => void;
  startNavigation: () => void;
  pauseNavigation: () => void;
  resumeNavigation: () => void;
  completeWaypoint: (index: number) => void;
  resetJourney: () => void;
};
```

### AddressSearchInput

- Chama `searchAddresses` do service com debounce de 300ms
- Exibe lista de sugestões abaixo do input
- Ao selecionar, chama `addAddress` do contexto

### RouteMap

- Usa `react-native-maps` para renderizar o mapa
- Recebe `encodedPolyline` e decodifica para array de coordenadas
- Renderiza `Marker` numerado para cada waypoint
- Ajusta câmera via `fitToCoordinates` para enquadrar todos os pontos

### DirectionBanner

- Exibe a instrução de direção atual da etapa ativa
- Atualiza conforme o GPS avança na rota

---

## API Integration

### Geocoding API — `lib/api/geocoding.ts`

```ts
// GET /maps/api/place/autocomplete/json
export const getPlacesAutocomplete = (input: string, sessionToken: string) => { ... }

// GET /maps/api/geocode/json
export const getGeocodeByPlaceId = (placeId: string) => { ... }
```

### Routes API — `lib/api/routes.ts`

```ts
// POST https://routes.googleapis.com/directions/v2:computeRoutes
export const postOptimizeRoute = (origin: Address, waypoints: Address[]) => { ... }
```

Campos do body:
- `origin`: coordenadas do Ponto_de_Partida
- `destination`: último waypoint (Routes API exige origin + destination + intermediates)
- `intermediates`: waypoints intermediários
- `optimizeWaypointOrder: true`
- `travelMode: "DRIVE"`
- `routingPreference: "TRAFFIC_AWARE"`

---

## External Libraries

| Biblioteca | Uso |
|---|---|
| `react-native-maps` | Renderização do mapa, marcadores e polyline |
| `expo-location` | Acesso ao GPS do dispositivo |
| `react-native-draggable-flatlist` | Drag-and-drop na lista de endereços |
| `@googlemaps/polyline-codec` | Decodificação da polyline codificada da Routes API |

---
inclusion: always
---

# Arquitetura do Projeto

## Estrutura de Telas

Padrão inspirado no Next.js — cada tela é uma pasta com `index.tsx` dentro.

```
src/app/(tabs)/Home/index.tsx
src/app/(tabs)/Profile/index.tsx
```

Componentes exclusivos de uma tela ficam em `_components` dentro da própria pasta:

```
src/app/(tabs)/Home/_components/RouteCard/index.tsx
```

## Componentes Globais

Pasta `components/` dividida em:

- `components/ui/` — componentes reutilizáveis (botões, cards, inputs, etc.)
- `components/layout/` — componentes estruturais fixos, não reutilizáveis

```
src/components/ui/Button/index.tsx
src/components/layout/Header/index.tsx
```

## Integração com APIs

Pasta `lib/` com duas subpastas:

### `lib/api/`
Define as rotas, método HTTP e query params. O nome da função sempre começa com o método HTTP:

| Método | Prefixo da função |
|--------|-------------------|
| GET    | `get`             |
| POST   | `post`            |
| PUT    | `put`             |
| DELETE | `delete`          |

Exemplos:
```ts
// lib/api/clients.ts
export const getClients = () => { ... }
export const postClient = (data) => { ... }
export const putClient = (uuid, data) => { ... }
```

### `lib/services/`
Chama as funções de `api/` e contém a lógica de negócio. O nome da função descreve a ação:

| API           | Service           |
|---------------|-------------------|
| `getClients`  | `findClients`     |
| `getClient`   | `findClientByUuid`|
| `postClient`  | `createClient`    |
| `putClient`   | `updateClient`    |

Exemplos:
```ts
// lib/services/clients.ts
export const findClients = async () => {
  const data = await getClients()
  // lógica aqui
  return data
}
```

## Resumo da Estrutura

```
src/
├── app/
│   └── (tabs)/
│       └── Home/
│           ├── index.tsx
│           └── _components/
├── components/
│   ├── ui/
│   └── layout/
└── lib/
    ├── api/
    └── services/
```

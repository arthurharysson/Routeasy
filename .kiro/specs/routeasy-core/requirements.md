# Requirements Document

## Introduction

O Routeasy é um app mobile para entregadores que precisam visitar múltiplos endereços em uma única jornada. O usuário cadastra os endereços de destino, e o app calcula e exibe a rota otimizada usando as APIs do Google Cloud (Routes API). A navegação acontece dentro do próprio app, sem redirecionamento externo.

Este documento cobre o fluxo principal: cadastro de endereços e cálculo/exibição de rota otimizada.

---

## Glossary

- **App**: O aplicativo mobile Routeasy (React Native / Expo)
- **Entregador**: Usuário final do app — pessoa que precisa visitar múltiplos endereços
- **Endereço**: Localização física composta por logradouro, número, cidade e estado
- **Lista_de_Enderecos**: Conjunto de endereços cadastrados pelo Entregador para uma jornada
- **Rota_Otimizada**: Sequência de endereços calculada pela Routes_API que minimiza o tempo ou distância total de deslocamento
- **Routes_API**: Google Cloud Routes API, responsável pelo cálculo de rotas otimizadas
- **Geocoding_API**: Google Cloud Geocoding API, responsável por converter endereços textuais em coordenadas geográficas
- **Mapa**: Componente visual que exibe a Rota_Otimizada com marcadores e polyline
- **Waypoint**: Ponto intermediário de parada dentro de uma Rota_Otimizada
- **Ponto_de_Partida**: Localização atual do Entregador, usada como origem da Rota_Otimizada
- **Navegacao_Integrada**: Funcionalidade de guia turn-by-turn exibida dentro do App, sem abrir aplicativos externos

---

## Requirements

### Requirement 1: Cadastro de Endereços

**User Story:** Como Entregador, quero cadastrar múltiplos endereços de entrega, para que eu possa definir todos os destinos da minha jornada antes de iniciar a rota.

#### Acceptance Criteria

1. THE App SHALL exibir um campo de busca de endereço com autocomplete alimentado pela Geocoding_API
2. WHEN o Entregador seleciona um endereço sugerido pelo autocomplete, THE App SHALL adicionar o endereço à Lista_de_Enderecos
3. WHEN o Entregador adiciona um endereço à Lista_de_Enderecos, THE App SHALL exibir o endereço adicionado em uma lista ordenada por ordem de inserção
4. THE App SHALL permitir que o Entregador adicione no mínimo 2 e no máximo 25 endereços à Lista_de_Enderecos
5. WHEN o Entregador tenta adicionar um endereço já presente na Lista_de_Enderecos, THE App SHALL exibir uma mensagem de erro informando que o endereço é duplicado e não adicionar o endereço novamente
6. WHEN o Entregador remove um endereço da Lista_de_Enderecos, THE App SHALL atualizar a lista removendo apenas o endereço selecionado
7. WHEN o Entregador reordena os endereços na Lista_de_Enderecos via drag-and-drop, THE App SHALL persistir a nova ordem na Lista_de_Enderecos
8. IF a Geocoding_API retornar erro ao buscar sugestões de endereço, THEN THE App SHALL exibir uma mensagem de erro descritiva e manter o campo de busca ativo

---

### Requirement 2: Obtenção do Ponto de Partida

**User Story:** Como Entregador, quero que o app use minha localização atual como ponto de partida, para que a rota calculada comece de onde eu estou.

#### Acceptance Criteria

1. WHEN o Entregador abre o App pela primeira vez, THE App SHALL solicitar permissão de acesso à localização do dispositivo
2. WHEN o Entregador concede permissão de localização, THE App SHALL obter as coordenadas GPS atuais e definir como Ponto_de_Partida
3. IF o Entregador negar a permissão de localização, THEN THE App SHALL exibir uma mensagem explicando que a localização é necessária para calcular a rota e oferecer a opção de inserir o Ponto_de_Partida manualmente
4. WHEN o Entregador insere o Ponto_de_Partida manualmente, THE App SHALL validar o endereço via Geocoding_API antes de aceitar
5. IF o dispositivo não retornar coordenadas GPS em até 10 segundos, THEN THE App SHALL exibir uma mensagem de timeout e oferecer a opção de inserir o Ponto_de_Partida manualmente

---

### Requirement 3: Cálculo de Rota Otimizada

**User Story:** Como Entregador, quero que o app calcule automaticamente a melhor sequência de visitas, para que eu percorra todos os endereços no menor tempo possível.

#### Acceptance Criteria

1. WHEN o Entregador aciona o cálculo de rota com pelo menos 2 endereços na Lista_de_Enderecos, THE App SHALL enviar o Ponto_de_Partida e todos os endereços da Lista_de_Enderecos para a Routes_API
2. WHEN a Routes_API retorna a Rota_Otimizada, THE App SHALL exibir a sequência otimizada de Waypoints ao Entregador
3. THE App SHALL exibir o tempo total estimado e a distância total da Rota_Otimizada em unidades legíveis (horas/minutos e quilômetros)
4. WHEN o Entregador aciona o cálculo de rota com menos de 2 endereços na Lista_de_Enderecos, THE App SHALL exibir uma mensagem informando que são necessários pelo menos 2 endereços
5. IF a Routes_API retornar erro durante o cálculo, THEN THE App SHALL exibir uma mensagem de erro descritiva e permitir que o Entregador tente novamente
6. WHILE o cálculo de rota estiver em andamento, THE App SHALL exibir um indicador de carregamento e desabilitar o botão de calcular rota

---

### Requirement 4: Exibição da Rota no Mapa

**User Story:** Como Entregador, quero visualizar a rota otimizada em um mapa, para que eu tenha uma visão clara do trajeto completo.

#### Acceptance Criteria

1. WHEN a Rota_Otimizada é calculada com sucesso, THE App SHALL exibir o Mapa com a polyline do trajeto completo
2. THE Mapa SHALL exibir marcadores numerados para cada Waypoint na sequência otimizada
3. THE Mapa SHALL exibir um marcador distinto para o Ponto_de_Partida
4. WHEN o Entregador toca em um marcador de Waypoint no Mapa, THE App SHALL exibir o endereço completo e o número de sequência daquele ponto
5. THE Mapa SHALL ajustar o zoom automaticamente para enquadrar todos os Waypoints e o Ponto_de_Partida na tela
6. IF o dispositivo não tiver conexão com a internet ao tentar exibir o Mapa, THEN THE App SHALL exibir uma mensagem informando que a conexão é necessária para carregar o mapa

---

### Requirement 5: Navegação Integrada

**User Story:** Como Entregador, quero iniciar a navegação turn-by-turn dentro do app, para que eu possa seguir a rota sem precisar trocar de aplicativo.

#### Acceptance Criteria

1. WHEN o Entregador aciona o início da navegação, THE App SHALL iniciar a Navegacao_Integrada a partir do Ponto_de_Partida em direção ao primeiro Waypoint da Rota_Otimizada
2. WHILE a Navegacao_Integrada estiver ativa, THE App SHALL exibir a instrução de direção atual (ex: "Vire à direita em 200m")
3. WHILE a Navegacao_Integrada estiver ativa, THE App SHALL atualizar a posição do Entregador no Mapa em tempo real usando o GPS do dispositivo
4. WHEN o Entregador chega a um Waypoint durante a Navegacao_Integrada, THE App SHALL marcar o Waypoint como concluído e exibir a instrução para o próximo destino
5. WHEN o Entregador conclui todos os Waypoints, THE App SHALL exibir uma tela de conclusão informando que todas as entregas foram realizadas
6. WHEN o Entregador se desvia da Rota_Otimizada em mais de 50 metros, THE App SHALL recalcular a rota a partir da posição atual do Entregador
7. IF o GPS do dispositivo perder sinal durante a Navegacao_Integrada, THEN THE App SHALL exibir um aviso de perda de sinal e pausar as atualizações de posição até o sinal ser restabelecido

---

### Requirement 6: Gerenciamento de Estado da Jornada

**User Story:** Como Entregador, quero poder pausar e retomar a navegação, para que eu possa lidar com imprevistos sem perder o progresso da jornada.

#### Acceptance Criteria

1. WHEN o Entregador pausa a Navegacao_Integrada, THE App SHALL preservar o estado atual da jornada, incluindo Waypoints concluídos e posição na Rota_Otimizada
2. WHEN o Entregador retoma a Navegacao_Integrada após uma pausa, THE App SHALL restaurar o estado da jornada e continuar a partir do último Waypoint não concluído
3. WHEN o Entregador encerra a jornada manualmente antes de concluir todos os Waypoints, THE App SHALL exibir uma confirmação antes de descartar o progresso
4. WHEN o Entregador confirma o encerramento da jornada, THE App SHALL limpar a Lista_de_Enderecos e retornar à tela inicial de cadastro de endereços

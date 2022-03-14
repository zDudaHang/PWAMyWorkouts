# Prova de conceito para PWA

Esse projeto foi feito para colocar os conceitos e funcionalidades da PWA em prática \
Algumas funcionalidades que foram colocadas em prática:
- Permitir instalar a aplicação
- Notificações
- Funcionalidades off-line

**Atenção**: Essa aplicação não deve ser colocada em produção porque apresenta problemas de segurança e certos cenários comuns em produção não foram tratados para manter a simplicidade!

## Como rodar a aplicação

Nas seções seguintes, será demonstrado como rodar tanto o servidor (back) como o cliente (front) para permitir testar a aplicação como um todo

### Instalando os pacotes
Primeiro, verifique se os seguintes pacotes estão instalados:
- Node.js com versão igual ou maior a 16
- NPM
- Yarn
- Docker
- Docker Compose

### Rodando o back-end

#### Preparando a base de dados
Primeiro, verifique se não há nenhum container do docker rodando na porta 5432:5432 ou outra aplicação rodando na porta 5432\
Se estiver tudo certo, vá para o diretório raiz do projeto

`cd my-workout`

Em seguinda, rode o seguinte comando para criar a base de dados:

`docker-compose up -d database`

Para verificar se criou corretamente, execute o seguinte comando:

`docker ps`

Nesse momento, você deve ver um container rodando na porta `5432:5432` com o nome `my-workout-database`

#### Preparando as variáveis de ambiente do Node (.env)

Crie um arquivo chamado `.env` na raiz do projeto do servidor (`my-workout/back`)\
Em seguida, crie as seguintes variáveis de ambiente:

- `VAPID_PUBLIC_KEY` e `VAPID_PRIVATE_KEY`: Chaves VAPID para permitir as notificações. ([como gerar](https://developers.google.com/web/fundamentals/push-notifications/sending-messages-with-web-push-libraries#sending_push_messages))
- `PUSH_EMAIL` : um e-mail para permitir as notificações (pode ser qualquer um)
- `DATABASE_URL`: url de conexão do banco de dados, se você estiver rodando no `localhost` será `postgresql://postgres:admin@localhost:5432/my-workout-database`

Caso queira mudar a porta que o servidor irá rodar (por padrão é `8000`), defina a variável de ambiente `PORT`

#### Rodando o servidor

Por fim, execute os seguintes comandos:

`cd back`\
`yarn install`\
`yarn start`

Se estiver tudo certo, as seguintes mensagens devem aparecer:
```
[server] Database was created successfully !
[server]: The push route was successfully added
[server]: The api routes were successfully added
[server]: Server is running at <porta_escolhida>
```

### Rodando o front-end

#### Preparando as variáveis de ambiente do Node (.env)

Crie um arquivo chamado `.env` na raiz do projeto do cliente (`my-workout/front`)\
Em seguida, crie a seguinte variável de ambiente:

- `REACT_APP_VAPID_PUBLIC_KEY`: O mesmo valor que foi dado para a `VAPID_PUBLIC_KEY`

#### Rodando o cliente

Por fim, execute os seguintes comandos em um novo terminal:

`cd front`\
`yarn install`\
`yarn start`

Depois de alguns segundos, uma nova janela ou aba do navegador deve ser aberta com a interface da aplicação

## Ferramentas para testar as funcionaliades do PWA:
[Como simular uma perda de conexão](https://developers.google.com/web/ilt/pwa/tools-for-pwa-developers#simulate_offline_behavior) \
[Vendo o manifesto](https://developers.google.com/web/ilt/pwa/tools-for-pwa-developers#inspect_the_manifest) \
[Vendo o service worker e interagindo com ele](https://developers.google.com/web/ilt/pwa/tools-for-pwa-developers#interact_with_service_workers_in_the_browser) \
[Vendo a Cache](https://developers.google.com/web/ilt/pwa/tools-for-pwa-developers#inspect_cache_storage) \
[Vendo a IndexedDB](https://developers.google.com/web/ilt/pwa/tools-for-pwa-developers#check_indexeddb) \
[Como instalar um PWA pelo Chrome](https://support.google.com/chrome/answer/9658361?hl=pt-BR&co=GENIE.Platform%3DDesktop)

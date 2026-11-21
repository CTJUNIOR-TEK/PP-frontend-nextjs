# E-mail da CT — Template Next.js (Capacitação Continuada 2026/2)

Este é o **Sistema de E-mails do Projeto Piloto** (feito originalmente em React + Vite) reescrito com as stacks que a CT usa em projetos reais. Ele é o **ponto de partida** da Capacitação Continuada: você vai transformá-lo no **Instagram da CT**.

Antes de mudar qualquer coisa, entenda como ele funciona. Saber explicar a arquitetura faz parte da avaliação.

## Stack

| Tecnologia | Uso |
| --- | --- |
| **Next.js 16** (App Router) | Rotas, layouts, Server Components, Server Actions, Proxy |
| **TypeScript** | Tipagem do projeto inteiro |
| **Tailwind CSS v4** | Estilização (tokens da CT em `src/app/globals.css`) |
| **Axios** | Chamadas ao backend (somente no servidor) |
| **Zod** | Validação dos formulários e das variáveis de ambiente |
| **React Icons** | Ícones (família Phosphor: `react-icons/pi`) |
| **Vitest + Testing Library** | Testes automatizados |

## Como rodar

Pré-requisitos: Node 20.9+ e o backend do Projeto Piloto rodando (por padrão em `http://localhost:3333`).

```bash
cp .env.example .env.local   # ajuste API_URL se precisar
npm install
npm run dev                  # http://localhost:3000
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `npm start` | Build e servidor de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Checagem de tipos (`tsc --noEmit`) |
| `npm test` / `npm run test:watch` | Testes (Vitest) |
| `npm run check` | Lint + typecheck + testes: rode antes de cada commit |

## Arquitetura

```
src/
├── app/                      # Rotas (App Router)
│   ├── (auth)/               # Grupo de rotas públicas: /login, /cadastro
│   ├── (app)/                # Grupo de rotas autenticadas (layout com menu)
│   │   ├── entrada/          # GET /my-emails
│   │   ├── enviados/         # GET /sent-emails + DELETE /email/:id
│   │   ├── enviar/           # POST /email
│   │   ├── email/[id]/       # GET /email/:id (rota dinâmica)
│   │   ├── perfil/           # GET /me, PATCH /my-name, PATCH /my-image
│   │   ├── loading.tsx       # Skeleton enquanto o servidor busca dados
│   │   └── error.tsx         # Tela de erro (ex.: backend fora do ar)
│   ├── logout/route.ts       # Route Handler: limpa o cookie e vai para /login
│   └── layout.tsx            # Layout raiz (fonte, metadata)
├── proxy.ts                  # Protege rotas (o antigo "middleware")
├── actions/                  # Server Actions ("use server"): mutações
├── services/                 # Chamadas HTTP à API + mappers DTO → modelo
├── schemas/                  # Schemas Zod (validação de formulários)
├── types/                    # Tipos da API (DTO) e da interface
├── lib/                      # Sessão, Axios, erros, utilitários
└── components/               # ui/ (genéricos), layout/, emails/, profile/, auth/
```

### Fluxo de dados

```
Leitura:  page.tsx (Server Component) → services/* → Axios → API
Escrita:  <form action={...}> (Client) → actions/* (Server Action) → Zod → services/* → API
                                                         └→ revalidatePath() atualiza a tela
```

- **Páginas são Server Components.** Elas buscam dados direto com `await`, sem `useEffect` nem `useState`. O carregamento aparece pelo `loading.tsx` e os erros pelo `error.tsx`.
- **Formulários usam Server Actions + `useActionState`.** A action valida com Zod e devolve um `FormState` com erros por campo, mensagem geral e os valores digitados.
- **Services isolam a API.** Os nomes do backend (`titulo`, `enviado_por`, `jaVisto`...) são convertidos em `services/mappers.ts`. Se o contrato mudar, só os services e os mappers mudam.

### Autenticação

1. `loginAction` envia `POST /login` e salva o JWT num **cookie httpOnly** (`ct_token`). O JavaScript do navegador nunca lê o token.
2. `src/proxy.ts` roda antes de cada rota. Sem sessão válida, manda para `/login`. Com sessão, tira o usuário de `/login` e `/cadastro`. Ele lê o `exp` do JWT para detectar token vencido.
3. Os services leem o cookie no servidor (`lib/session.ts`) e mandam `Authorization: Bearer <token>`. Se a API responder 401, o usuário vai para `/logout`.
4. Logout (`logoutAction`): apaga o cookie e redireciona para `/login`.

> Como toda chamada à API sai do **servidor do Next**, o backend não precisa de CORS e a `API_URL` não vai para o navegador. Por isso ela **não** usa o prefixo `NEXT_PUBLIC_`.

### Peculiaridades do backend (já tratadas)

- `GET /email/:id` responde **400 em caso de sucesso**. Veja o `validateStatus` em `services/email.service.ts`.
- O backend usa 401 tanto para token inválido quanto para regras de negócio (ex.: apagar um e-mail já visto). Por isso `authedRequest` aceita `redirectOnUnauthorized: false`.

## Do Vite (PP 2025) para o Next (este template)

| Antes (Vite) | Agora (Next) |
| --- | --- |
| `react-router-dom` + `App.tsx` | Pastas em `src/app/` (rotas por arquivo) |
| Sidebar copiada em cada página | Um `layout.tsx` compartilhado pelo grupo `(app)` |
| `useEffect` + `useState` para buscar dados | `async` Server Components |
| `js-cookie` (token legível pelo JS) | Cookie httpOnly definido no servidor |
| Sem proteção de rotas | `proxy.ts` |
| `react-hook-form` + `zodResolver` | Server Actions + `useActionState` + Zod |
| Erros só no `console.log` | Mensagens por campo e gerais na tela |
| `window.location.reload()` | `revalidatePath()` / `router.refresh()` |
| `@phosphor-icons/react` | `react-icons/pi` (mesmos ícones Phosphor) |
| Layout fixo em px | Responsivo (sidebar no desktop, menu em gaveta no celular) |

## Testes

Os testes ficam junto do código (`*.test.ts(x)`). Os de exemplo cobrem:

- schemas Zod (`schemas/schemas.test.ts`)
- utilitários de JWT, erros e formulário (`lib/*.test.ts`)
- mappers da API (`services/mappers.test.ts`)
- proxy de autenticação (`proxy.test.ts`)
- uma Server Action com mocks de rede, cookies e navegação (`actions/auth.test.ts`)
- componentes (`components/**/*.test.tsx`)

**Preserve e estenda esses testes.** Toda funcionalidade nova do Instagram deve vir com testes.

## Próximos passos (Instagram da CT)

Leia o documento da Capacitação Continuada e o Guia de Capacitação. Em resumo:

- Troque o domínio "e-mails" por "posts": `types/`, `services/`, `schemas/`, `actions/` e as rotas em `app/(app)/`.
- Upload de imagem por arquivo (seleção e drag-and-drop), com validação de tipo (PNG/JPEG/WebP) e tamanho (5 MB), preview e feedback de progresso.
- Edição e exclusão de posts só para o autor, com confirmação antes de excluir.
- Duas funcionalidades novas, de sua escolha.
- Crie seu **AGENTS.md** e pelo menos **duas Skills**. O AGENTS.md atual traz só o bloco que o próprio Next gera: mantenha esse bloco e escreva o contexto do projeto abaixo dele.

> ⚠️ Esta versão do Next.js tem mudanças em relação ao que você (e a IA) talvez conheça. Por exemplo, `middleware` virou `proxy`, `params` é uma Promise e `error.tsx` recebe `retry`. A documentação da versão instalada está em `node_modules/next/dist/docs/`.

**Nunca** coloque tokens, senhas ou o conteúdo do `.env` em prompts de IA.

# 🚀 Pronto para Cozinha

Um aplicativo web para gerenciar pedidos para a cozinha de restaurantes, tornando o fluxo de pedidos mais fácil e organizado.

## 📚 Índice
- [Sobre](#sobre)
- [Instalação](#instalação)
- [Uso](#uso)
- [Tecnologias](#tecnologias)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Sobre

O projeto "Pronto para Cozinha" é uma solução web desenvolvida para otimizar o fluxo de pedidos em cozinhas de restaurantes. Ele conecta garçons e a equipe da cozinha de forma eficiente, garantindo agilidade e organização no atendimento.

**Para Garçons:**

- **Pedidos via Celular:** O garçom pode registrar pedidos diretamente de um celular.
- **Seleção de Mesa/Viagem:** Opção de associar o pedido a uma mesa específica ou marcá-lo para viagem.
- **Cardápio Interativo:** Escolha de itens do cardápio com a possibilidade de adicionar observações personalizadas para cada item.
- **Envio Direto para a Cozinha:** Pedidos são enviados instantaneamente para a tela da cozinha.

![Descrição do GIF](./public/Gravando%202025-08-13%20095326.gif)

**Para a Cozinha:**

- **Visualização em Tablet:** Pedidos são exibidos em tempo real na tela de um tablet.
- **Gerenciamento Intuitivo:** Com um único toque, o pedido é movido da lista de "pendentes" para uma lista lateral de "prontos".
- **Recuperação de Pedidos:** Caso necessário, pedidos marcados como "prontos" podem ser facilmente retornados à tela principal de "pendentes" com um clique duplo.

![Descrição do GIF](./public/Gravando%202025-08-13%20100952.gif)

Nosso objetivo é agilizar o processo de atendimento, reduzir erros e melhorar a comunicação entre a equipe do restaurante, resultando em uma experiência mais fluida para clientes e funcionários.

## Instalação

Para configurar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone https://github.com/LeonelPrestes/pronto-para-cozinha.git
cd pronto-para-cozinha
```

2. Instale as dependências do frontend:

```bash
npm install
```

3. Instale as dependências do backend (API):

```bash
cd api
npm install
cd ..
```

## Uso

Para iniciar o aplicativo:

1. Inicie o servidor da API (no diretório raiz do projeto):

```bash
npm run server
```

2. Em um novo terminal, inicie o aplicativo frontend:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173` (ou outra porta, se indicado pelo Vite).

## Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- 🖥️ **Frontend:** React, TypeScript, Vite, Tailwind CSS, Shadcn/ui
- ⚙️ **Backend:** Node.js, Express
- 📦 **Outras:** Radix UI, React Hook Form, React Router DOM, TanStack Query

## Contribuindo

Contribuições são bem-vindas! Para contribuir com o projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma nova branch para sua feature (`git checkout -b feature/sua-feature`).
3. Faça suas alterações e commit-as (`git commit -m 'feat: Adiciona nova funcionalidade'`).
4. Envie para a branch original (`git push origin feature/sua-feature`).
5. Crie um Pull Request.

Por favor, certifique-se de que seu código siga as diretrizes de estilo do projeto e que todos os testes passem.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/licença-MIT-blue)



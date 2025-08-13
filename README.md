# 🚀 Pronto para Cozinha

Um aplicativo web para gerenciar receitas e listas de compras, tornando a culinária mais fácil e organizada.

## 📚 Índice
- [Sobre](#sobre)
- [Instalação](#instalação)
- [Uso](#uso)
- [Tecnologias](#tecnologias)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Sobre

O projeto "Pronto para Cozinha" visa simplificar o processo de planejamento de refeições e gerenciamento de ingredientes. Com ele, você pode:

- Criar e organizar suas receitas favoritas.
- Gerar listas de compras automaticamente com base nas receitas selecionadas.
- Acompanhar os ingredientes disponíveis em sua despensa.

Nosso objetivo é reduzir o desperdício de alimentos e otimizar o tempo gasto na cozinha, proporcionando uma experiência culinária mais eficiente e prazerosa.

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



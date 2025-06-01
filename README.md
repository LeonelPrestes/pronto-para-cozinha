# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b836532c-9473-452c-92ff-daa8c0ff5bdc

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b836532c-9473-452c-92ff-daa8c0ff5bdc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b836532c-9473-452c-92ff-daa8c0ff5bdc) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

Agora sobre a instalação no restaurante! Aqui está o guia completo:

🏪 Instalação no Restaurante (Setup Offline)
1. Preparação do Notebook (Servidor Central)
Pré-requisitos:

Node.js (versão 18+)
Git
Passos:

Exportar o projeto:

Clique em "Export to GitHub" no Lovable
Clone o repositório no notebook
Instalar dependências:


cd seu-projeto
npm install
Configurar para produção:


npm run build
npm start
Obter o IP do notebook:

Windows: ipconfig
O IP será algo como 192.168.1.100
2. Configuração da Rede Wi-Fi
Cenário ideal:

Todos os dispositivos conectados na mesma rede Wi-Fi
Notebook rodando o servidor na porta 3000
URL de acesso: http://192.168.1.100:3000
3. Configuração dos Dispositivos
📱 Smartphone (Garçom):

Abrir navegador
Acessar: http://IP-DO-NOTEBOOK:3000/garcom
Adicionar à tela inicial (PWA)
Usar em modo retrato
📟 Tablet (Cozinha):

Abrir navegador
Acessar: http://IP-DO-NOTEBOOK:3000/cozinha
Adicionar à tela inicial
Usar em modo paisagem
Recomendo usar modo tela cheia
4. Script de Inicialização Automática
Para o notebook iniciar o sistema automaticamente:

Windows - Criar iniciar-sistema.bat:


@echo off
cd C:\caminho\para\seu\projeto
npm start
pause
Linux/Mac - Criar script de inicialização:


#!/bin/bash
cd /caminho/para/seu/projeto
npm start
5. Configurações Recomendadas
Notebook:

Desabilitar suspensão automática
Configurar inicialização automática do script
Deixar sempre conectado na energia
Dispositivos móveis:

Desabilitar bloqueio de tela automático
Configurar para não suspender o Wi-Fi
Adicionar o app à tela inicial
6. Teste do Sistema
Teste básico:

Notebook rodando o servidor
Tablet acessa /cozinha
Smartphone acessa /garcom
Teste de comunicação:

Garçom faz um pedido
Verifica se aparece na cozinha instantaneamente
Teste offline:

Desconectar internet
Sistema deve continuar funcionando localmente
🚨 Troubleshooting Comum
Não consegue acessar: Verificar firewall do Windows
Pedidos não aparecem: Verificar se estão na mesma rede
App lento: Considerar usar cabo ethernet no notebook
Quer que eu detalhe algum passo específico ou tem alguma dúvida sobre a instalação?



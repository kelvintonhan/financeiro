# Projeto Financeiro

O projeto Financeiro é uma aplicação web desenvolvida com o framework Next.js, utilizando uma variedade de tecnologias como React, Firebase e Tailwind CSS. O objetivo deste projeto é oferecer uma solução para gerenciamento financeiro pessoal, permitindo aos usuários registrar despesas e receitas, visualizar gráficos e manter controle sobre suas finanças.

Este projeto faz parte do Trabalho de Conclusão de Curso da pós-graduação em Desenvolvimento Full-stack da Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS).

## Funcionalidades Principais

* Registro de despesas e receitas pessoais.
* Visualização de gráficos para análise financeira.
* Autenticação de usuários utilizando Firebase.
* Interface responsiva para acesso em diferentes dispositivos.

## Instalação

1. Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.
2. Clone este repositório para sua máquina local.
3. Navegue até o diretório do projeto no terminal.
4. Execute o seguinte comando para instalar as dependências:

npm install
ou
yarn install

## Configuração do Firebase

1. Crie um projeto no Console do Firebase.
2. Obtenha as credenciais do seu projeto (apiKey, authDomain, etc.).
3. Cole as credenciais no arquivo lib/firebase/index.js.

## Uso

* Após instalar as dependências e configurar o Firebase, execute o seguinte comando para iniciar o servidor de desenvolvimento:

npm run dev
ou
yarn dev

* O servidor será iniciado em http://localhost:3000. Você pode acessar esta URL em seu navegador para visualizar o aplicativo.

## Estrutura do Projeto

* /pages: Contém os componentes React que definem as páginas do aplicativo.
* /components: Contém componentes reutilizáveis que são compartilhados entre diferentes partes do aplicativo.
* /lib: Contém utilitários e configurações compartilhadas, incluindo a integração com o Firebase.
* /public: Contém arquivos estáticos, como imagens e ícones.
* jsconfig.json, next.config.mjs, postcss.config.js, tailwind.config.js: Arquivos de configuração do Next.js, PostCSS e Tailwind CSS.
# Projeto Final - Controle de Estoque (AVA03)

**Autor:** Romário Lima

## 1\. Ideia e Objetivo

*(**Instrução:** Romário, coloque aqui a descrição original do seu projeto que você escreveu para a `ava01`, explicando o que ele faz, qual problema ele resolve e para quem se destina.)*

Este projeto é um aplicativo móvel para gerenciamento de estoque, desenvolvido como avaliação final da disciplina de Programação Mobile. O objetivo é permitir que o usuário realize operações básicas de CRUD (Criar, Ler, Atualizar e Deletar) para controlar produtos, registrando seu nome, quantidade e preço. A aplicação foi construída com um backend em Node.js e um frontend em React Native, seguindo um fluxo de trabalho DevOps que inclui containerização com Docker para garantir portabilidade e facilidade de distribuição.

## 2\. Capturas de Tela (Screenshots)

*(**Instrução:** Adicione aqui 2 ou 3 capturas de tela principais do seu aplicativo em funcionamento. Você pode fazer o upload das imagens para o próprio repositório GitHub e depois substituir as URLs abaixo.)*

**Tela Principal (Lista de Produtos)**
![Imagem do WhatsApp de 2025-08-30 à(s) 16 57 43_b92ffd4a](https://github.com/user-attachments/assets/74136337-1481-4f74-8d1b-db0661ac056e)


**Tela de Adicionar Produto**
![Imagem do WhatsApp de 2025-08-30 à(s) 16 57 47_86236a80](https://github.com/user-attachments/assets/46e47bcf-e9e8-4781-8dcf-b60f3135b4a5)


## 3\. Stack de Tecnologias

  * **Frontend (Mobile):** React Native, Expo
  * **Backend:** Node.js, Express.js
  * **Banco de Dados:** Knex.js, SQLite
  * **Containerização:** Docker, Docker Compose
  * **Exposição de Rede:** Localtunnel
  * **Geração de Build:** Expo EAS Build

## 4\. Tutorial Completo para Execução do Ambiente

Este guia detalha os passos para configurar e executar todo o ambiente de desenvolvimento, do backend em contêiner ao aplicativo móvel.

### Pré-requisitos

  * [Node.js](https://nodejs.org/) (v18 ou superior)
  * [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  * [Git](https://git-scm.com/)

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/Romarriolima/ava03.git
cd ava03
```

### Passo 2: Executar o Backend com Docker

Toda a API está contida em uma imagem Docker, tornando a execução do ambiente extremamente simples.

1.  Navegue até a pasta da API:
    ```bash
    cd api-estoque
    ```
2.  Construa a imagem Docker. Este comando vai ler o `Dockerfile` e instalar todas as dependências da API:
    ```bash
    docker build -t Romarriolima/ava03-api-estoque .
    ```
3.  Inicie o contêiner a partir da imagem que acabamos de criar. A API estará disponível em `http://localhost:3000`:
    ```bash
    docker run -d -p 3000:3000 --name container-api-estoque Romarriolima/ava03-api-estoque
    ```
    *Para verificar se o contêiner está rodando, use o comando `docker ps`.*

### Passo 3: Expor a API com Localtunnel

Para que o aplicativo no celular possa se comunicar com a API rodando no seu computador, precisamos expô-la para a internet.

1.  Em um **novo terminal**, execute o comando abaixo. Ele criará uma URL pública apontando para a porta `3000` do seu computador.
    ```bash
    npx localtunnel --port 3000 --subdomain ava03-estoque-api
    ```
2.  A URL gerada será `https://ava03-estoque-api.loca.lt`.
3.  **Mantenha este terminal aberto** durante todo o uso do aplicativo.

### Passo 4: Instalar e Executar o Protótipo (`.apk`)

O aplicativo móvel foi configurado para se comunicar com a URL pública gerada no passo anterior.

1.  Baixe o arquivo `.apk` disponibilizado neste repositório.
2.  Transfira o arquivo para um dispositivo Android e instale-o.
3.  Abra o aplicativo. Com o contêiner Docker e o Localtunnel rodando, todas as funcionalidades de CRUD (listar, adicionar, editar e excluir produtos) estarão operacionais.

-----

### (Bônus) Executando com Docker Compose

Para simplificar ainda mais a execução do backend, um arquivo `docker-compose.yml` foi incluído.

1.  Navegue até a pasta `api-estoque`.
2.  Execute o comando:
    ```bash
    docker-compose up -d
    ```
    *Este único comando irá construir a imagem (se necessário) e iniciar o contêiner com as configurações corretas.*
3.  Para parar o serviço, use `docker-compose down`.

### (Opcional) Gerando um novo `.apk`

Caso deseje gerar uma nova versão do protótipo:

1.  Instale o Expo EAS CLI: `npm install -g eas-cli`
2.  Navegue até a pasta do frontend: `cd app-estoque`
3.  Faça o login: `eas login`
4.  Configure o projeto: `eas build:configure` (usando o ID `com.romariolima1.appestoque`)
5.  Inicie o build: `eas build --platform android --profile preview`
>>>>>>> master

# Dockerfile

# 1. Imagem base do Node.js
FROM node:18-alpine

# 2. Diretório de trabalho dentro do contêiner
WORKDIR /app

# 3. Copia os arquivos de dependência para aproveitar o cache
COPY package.json ./
COPY package-lock.json ./

# 4. Instala as dependências
RUN npm install

# 5. Copia todo o código da API (incluindo o .sqlite3)
COPY . .

# 6. Expõe a porta que sua API usa
EXPOSE 3000

# 7. Comando para iniciar a aplicação
CMD [ "npm", "start" ]
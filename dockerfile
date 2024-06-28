# syntax=docker/dockerfile:1

# Use a imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação Next.js
RUN npm run build

# Exponha a porta que a aplicação vai usar
EXPOSE 3001

# Comando para iniciar a aplicaçãoa
CMD ["npm", "start"]

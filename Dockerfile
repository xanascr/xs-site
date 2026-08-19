FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
RUN npm ci
COPY . .

# Compilador XanaScript: clona o repo e aponta o playground pra ele
RUN apk add --no-cache git \
  && git clone --depth 1 https://github.com/xanascr/xs.git /xanascript

ENV XS_BIN=/xanascript/bin/xs.js

EXPOSE 3010
CMD ["node", "app.js"]
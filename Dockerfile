FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN chmod +x scripts/**/*.sh scripts/**/*.js

CMD ["npm", "start"]

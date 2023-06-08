FROM node:20-alpine

WORKDIR /app-node

EXPOSE 3001

COPY . .

RUN npm install

ENTRYPOINT npm start

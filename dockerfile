FROM node:18.14.0

WORKDIR /app-node
ENV PORT=3459
ENV DB_URL = mongodb+srv://smolak:pablo123@bddoscrias.v9neqx8.mongodb.net/plataforma
EXPOSE 3459

COPY . .

RUN npm install

ENTRYPOINT npm run start

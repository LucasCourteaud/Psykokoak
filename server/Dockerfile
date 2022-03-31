FROM node:16.13

WORKDIR /app

COPY ./package*.json ./

RUN npm install

RUN npm install express

COPY . ./

ENV PORT=8080

EXPOSE 8080

CMD node index.js
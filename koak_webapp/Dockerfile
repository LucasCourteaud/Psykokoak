FROM node:16.13

WORKDIR /app

COPY . ./

RUN mkdir -p /mobile_app/

RUN ln -s /mobile_app/mobile.apk public/client.apk

COPY ./package*.json ./

RUN npm install

ENV PORT=8081

EXPOSE 8081

CMD npm start
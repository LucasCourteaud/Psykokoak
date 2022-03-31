FROM node:16.13

WORKDIR /app

COPY ./package*.json ./

RUN npm install

RUN npm i @react-navigation/core

RUN npm i --global expo-cli

COPY . ./

RUN expo login -u cpt.aled -p epitech42

COPY script.sh .

RUN ./script.sh

RUN mkdir /app_mobile/

RUN cp app.apk /app_mobile/
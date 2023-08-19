FROM node:18.10-alpine

RUN npm install -g @angular/cli

WORKDIR /usr/src/app

EXPOSE 4200
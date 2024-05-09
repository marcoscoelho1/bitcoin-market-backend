FROM node:20-alpine3.19

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

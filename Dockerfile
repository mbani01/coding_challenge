FROM node:latest as base

WORKDIR /usr/src/app
COPY package*.json ./

# dev env config
FROM base as dev
ENV NODE_ENV=dev
RUN npm ci
COPY . .
CMD [ "npm", "run", "start" ]
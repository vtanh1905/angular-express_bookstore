FROM node:14-alpine as base

WORKDIR /src
COPY package.*.json /
COPY swagger.json /
EXPOSE 3000

FROM base as dev
ENV NODE_ENV=development
RUN npm i
COPY . /
CMD ['nodemon', "src/app.ts"]
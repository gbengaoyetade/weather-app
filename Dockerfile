
FROM node:14.15.0-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . ./

EXPOSE 3000

CMD ["yarn", "start"]
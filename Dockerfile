FROM node:18-alpine3.15

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

# RUN apk add --no-cache make gcc g++ python3 && \
#   yarn install && \
#   yarn add --force bcrypt --build-from-source && \
#   apk del make gcc g++ python3

RUN yarn install

COPY prisma ./prisma/

COPY . .

RUN npx prisma generate

CMD ["yarn", "dev"]
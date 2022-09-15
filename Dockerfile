FROM node:18-alpine3.15

WORKDIR /app

COPY package*.json ./

# RUN apk add --no-cache make gcc g++ python && \
#   yarn install && \
#   yarn install --force bcrypt --build-from-source && \
#   apk del make gcc g++ python

RUN yarn install

COPY prisma ./prisma/

COPY . .

RUN npx prisma generate

CMD ["yarn", "dev"]
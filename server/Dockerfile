FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY init-mongo.sh /app/init-mongo.sh

RUN npm run build

RUN apk add --no-cache mongodb-tools

RUN chmod +x /app/init-mongo.sh

CMD ["sh", "init-mongo.sh"]

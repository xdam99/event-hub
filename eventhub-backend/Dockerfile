FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY src/infrastructure/database/schema.prisma ./src/infrastructure/database/

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx ts-node src/api/app.ts"]

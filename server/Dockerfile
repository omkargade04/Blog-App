FROM node:22

WORKDIR /usr/src/app

COPY . .

RUN npm install

# Copying source code
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src


# Generating Prisma client
RUN npx prisma generate

# Building TypeScript code
RUN npm run build

EXPOSE 8000

CMD ["node", "./dist/src/app.js"]

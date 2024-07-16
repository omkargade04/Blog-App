# install dependencies
FROM node:14-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# build the application
FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# run the application
FROM node:14-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]

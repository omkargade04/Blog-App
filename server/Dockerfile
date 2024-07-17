FROM node:22 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma

COPY  tsconfig.json ./

COPY src ./src

# Install dependencies with retry logic
RUN npm install || \
    (sleep 1 && npm install) || \
    (sleep 3 && npm install) || \
    (sleep 5 && npm install)

# Generate Prisma files
RUN npx prisma generate

# Building the project
RUN npm run build

# Production Stage
FROM node:22

# Set working directory
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

# Expose the port the app runs on
EXPOSE 10000

# Start the server
CMD ["npm", "start"]

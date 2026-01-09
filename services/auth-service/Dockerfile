FROM node:20-alpine AS base

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm install -g turbo
RUN turbo prune --scope=@el-sawah/auth-service --docker

FROM base AS installer
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npx prisma generate --schema=services/auth-service/prisma/schema.prisma
RUN npm run build --filter=@el-sawah/auth-service

FROM base AS runner
WORKDIR /app
COPY --from=installer /app .
CMD ["node", "services/auth-service/dist/main"]

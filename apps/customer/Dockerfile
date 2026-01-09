FROM node:20-alpine AS base

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm install -g turbo
RUN turbo prune --scope=@el-sawah/customer --docker

FROM base AS installer
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN npm run build --filter=@el-sawah/customer

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=installer /app/apps/customer/.next/standalone ./
COPY --from=installer /app/apps/customer/.next/static ./apps/customer/.next/static
COPY --from=installer /app/apps/customer/public ./apps/customer/public

CMD ["node", "apps/customer/server.js"]

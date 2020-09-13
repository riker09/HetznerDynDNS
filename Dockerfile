FROM node:14-alpine AS base

WORKDIR /app


## BUILD
FROM base AS build

ADD . .

RUN npm ci && \
    npm run build


## FINAL
FROM base AS final

ADD package*.json ./

RUN npm install --no-save --production

COPY --from=build /app/dist ./dist

EXPOSE 3000

HEALTHCHECK --start-period=5s \
    CMD wget --spider -q 127.0.0.1:3000/health || exit 1

CMD ["node", "dist/main.js"]
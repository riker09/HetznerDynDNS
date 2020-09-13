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

CMD ["node", "dist/main.js"]
FROM node:18.17.1-alpine as clairview-website-build


WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./.yarnrc.yml .
COPY ./.yarn/releases /app/.yarn/releases
COPY ./tools/eslint-rules /app/tools/eslint-rules
COPY ./packages/clairview-website/package.json /app/packages/clairview-website/package.json

RUN yarn

COPY ./packages/clairview-website /app/packages/clairview-website
RUN npx nx build clairview-website

FROM node:18.17.1-alpine as clairview-website

WORKDIR /app/packages/clairview-website

COPY --from=clairview-website-build /app /app

WORKDIR /app/packages/clairview-website

LABEL org.opencontainers.image.source=https://github.com/digitranslab/clairview
LABEL org.opencontainers.image.description="This image provides a consistent and reproducible environment for the website."

CMD ["/bin/sh", "-c", "npx nx start"]
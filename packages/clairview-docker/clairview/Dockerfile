# Base image for common dependencies
FROM node:18.17.1-alpine as common-deps

WORKDIR /app

# Copy only the necessary files for dependency resolution
COPY ./package.json ./yarn.lock ./.yarnrc.yml ./tsconfig.base.json ./nx.json /app/
COPY ./.yarn/releases /app/.yarn/releases

COPY ./packages/clairview-emails/package.json /app/packages/clairview-emails/
COPY ./packages/clairview-server/package.json /app/packages/clairview-server/
COPY ./packages/clairview-server/patches /app/packages/clairview-server/patches
COPY ./packages/clairview-ui/package.json /app/packages/clairview-ui/
COPY ./packages/clairview-shared/package.json /app/packages/clairview-shared/
COPY ./packages/clairview-front/package.json /app/packages/clairview-front/

# Install all dependencies
RUN yarn && yarn cache clean && npx nx reset


# Build the back
FROM common-deps as clairview-server-build

# Copy sourcecode after installing dependences to accelerate subsequents builds
COPY ./packages/clairview-emails /app/packages/clairview-emails
COPY ./packages/clairview-shared /app/packages/clairview-shared
COPY ./packages/clairview-server /app/packages/clairview-server

RUN npx nx run clairview-server:build
RUN mv /app/packages/clairview-server/dist /app/packages/clairview-server/build
RUN npx nx run clairview-server:build:packageJson
RUN mv /app/packages/clairview-server/dist/package.json /app/packages/clairview-server/package.json
RUN rm -rf /app/packages/clairview-server/dist
RUN mv /app/packages/clairview-server/build /app/packages/clairview-server/dist

RUN yarn workspaces focus --production clairview-emails clairview-shared clairview-server


# Build the front
FROM common-deps as clairview-front-build

ARG REACT_APP_SERVER_BASE_URL

COPY ./packages/clairview-front /app/packages/clairview-front
COPY ./packages/clairview-ui /app/packages/clairview-ui
COPY ./packages/clairview-shared /app/packages/clairview-shared
RUN npx nx build clairview-front


# Final stage: Run the application
FROM node:18.17.1-alpine as clairview

# Used to run healthcheck in docker
RUN apk add --no-cache curl jq

RUN npm install -g tsx

RUN apk add --no-cache postgresql-client

COPY ./packages/clairview-docker/clairview/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
WORKDIR /app/packages/clairview-server

ARG REACT_APP_SERVER_BASE_URL
ENV REACT_APP_SERVER_BASE_URL $REACT_APP_SERVER_BASE_URL
ARG SENTRY_RELEASE
ENV SENTRY_RELEASE $SENTRY_RELEASE

# Copy built applications from previous stages
COPY --chown=1000 --from=clairview-server-build /app /app
COPY --chown=1000 --from=clairview-server-build /app/packages/clairview-server /app/packages/clairview-server
COPY --chown=1000 --from=clairview-front-build /app/packages/clairview-front/build /app/packages/clairview-server/dist/front

# Set metadata and labels
LABEL org.opencontainers.image.source=https://github.com/digitranslab/clairview
LABEL org.opencontainers.image.description="This image provides a consistent and reproducible environment for the backend and frontend, ensuring it deploys faster and runs the same way regardless of the deployment environment."

RUN mkdir /app/.local-storage
RUN chown -R 1000 /app

# Use non root user with uid 1000
USER 1000

CMD ["node", "dist/src/main"]
ENTRYPOINT ["/app/entrypoint.sh"]

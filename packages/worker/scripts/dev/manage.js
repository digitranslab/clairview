#!/usr/bin/env node
const { parsed: existingConfig } = require("dotenv").config()
const updateDotEnv = require("update-dotenv")

async function init() {
  let config = {
    SELF_HOSTED: "1",
    PORT: "4002",
    CLUSTER_PORT: "10000",
    JWT_SECRET: "testsecret",
    INTERNAL_API_KEY: "clairview",
    MINIO_ACCESS_KEY: "clairview",
    MINIO_SECRET_KEY: "clairview",
    REDIS_URL: "localhost:6379",
    REDIS_PASSWORD: "clairview",
    MINIO_URL: "http://localhost:4004",
    COUCH_DB_URL: "http://clairview:clairview@localhost:4005",
    COUCH_DB_USERNAME: "clairview",
    COUCH_DB_PASSWORD: "clairview",
    // empty string is false
    MULTI_TENANCY: "",
    DISABLE_ACCOUNT_PORTAL: "1",
    ACCOUNT_PORTAL_URL: "http://localhost:10001",
    ACCOUNT_PORTAL_API_KEY: "clairview",
    PLATFORM_URL: "http://localhost:10000",
    APPS_URL: "http://localhost:4001",
    SERVICE: "worker-service",
    DEPLOYMENT_ENVIRONMENT: "development",
    ENABLE_EMAIL_TEST_MODE: "1",
    HTTP_LOGGING: "0",
    VERSION: "0.0.0+local",
    PASSWORD_MIN_LENGTH: "1",
  }

  config = { ...config, ...existingConfig }

  await updateDotEnv(config)
}

// if more than init required use this to determine the command type
//const managementCommand = process.argv.slice(2)[0]

// for now only one command
let command = init

command()
  .then(() => {
    console.log("Done! 🎉")
  })
  .catch(err => {
    console.error(
      "Something went wrong while managing clairview dev worker:",
      err.message
    )
  })
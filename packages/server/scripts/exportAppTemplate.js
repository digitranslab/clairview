#!/usr/bin/env node
const yargs = require("yargs")
const fs = require("fs")
const { join } = require("path")
require("../src/db").init()
const { db: dbCore } = require("@clairview/backend-core")
// load environment
const env = require("../src/environment")
const {
  USER_METDATA_PREFIX,
  LINK_USER_METADATA_PREFIX,
} = require("../src/db/utils")

// Script to export a chosen clairview app into a package
// Usage: ./scripts/exportAppTemplate.js export --name=Funky --appId=appId

yargs
  .command(
    "export",
    "Export an existing clairview application to the .clairview/templates directory",
    {
      name: {
        description: "The name of the newly exported template",
        alias: "n",
        type: "string",
      },
      appId: {
        description: "The appId of the application you want to export",
        alias: "app",
        type: "string",
      },
    },
    async args => {
      if (!env.isDev()) {
        throw "Only works in dev"
      }
      const name = args.name,
        appId = args.appId
      console.log("Exporting app..")
      if (name == null || appId == null) {
        console.error(
          "Unable to export without a name and app ID being specified, check help for more info."
        )
        return
      }
      const exportPath = join(process.cwd(), name, "db")
      fs.ensureDirSync(exportPath)
      const writeStream = fs.createWriteStream(join(exportPath, "dump.text"))
      // perform couch dump

      await dbCore.doWithDB(appId, async db => {
        return db.dump(writeStream, {
          filter: doc =>
            !(
              doc._id.includes(USER_METDATA_PREFIX) ||
              doc.includes(LINK_USER_METADATA_PREFIX)
            ),
        })
      })
      console.log(`Template ${name} exported to ${exportPath}`)
    }
  )
  .help()
  .alias("help", "h").argv

import { Command } from "../structures/Command"
import { CommandWord } from "../constants"
import { success, error } from "../utils"
import { AnalyticsClient } from "./Client"

const client = new AnalyticsClient()

async function optOut() {
  try {
    // opt them out
    client.disable()
    console.log(
      success(
        "Successfully opted out of Clairview analytics. You can opt in at any time by running 'clair analytics opt-in'"
      )
    )
  } catch (err: any) {
    console.log(
      error(
        `Error opting out of Clairview analytics. Please try again later - ${err}`
      )
    )
  }
}

async function optIn() {
  try {
    // opt them in
    client.enable()
    console.log(
      success(
        "Successfully opted in to Clairview analytics. Thank you for helping us make Clairview better!"
      )
    )
  } catch (err) {
    console.log(
      error("Error opting in to Clairview analytics. Please try again later.")
    )
  }
}

async function status() {
  try {
    console.log(success(`Clairview analytics ${client.status()}`))
  } catch (err) {
    console.log(
      error("Error fetching analytics status. Please try again later.")
    )
  }
}

export default new Command(`${CommandWord.ANALYTICS}`)
  .addHelp("Control the analytics you send to Clairview.")
  .addSubOption("--optin", "Opt in to sending analytics to Clairview", optIn)
  .addSubOption("--optout", "Opt out of sending analytics to Clairview.", optOut)
  .addSubOption(
    "--status",
    "Check whether you are currently opted in to Clairview analytics.",
    status
  )

import env from "../environment"
import { constants, utils } from "@clairview/backend-core"
import { BBContext } from "@clairview/types"

/**
 * This is a restricted endpoint in the cloud.
 * Ensure that the correct API key has been supplied.
 */
export default async (ctx: BBContext, next: any) => {
  if (!env.SELF_HOSTED && !env.DISABLE_ACCOUNT_PORTAL) {
    const apiKey = ctx.request.headers[constants.Header.API_KEY]
    if (!apiKey) {
      ctx.throw(403, "Unauthorized")
    }

    if (Array.isArray(apiKey)) {
      ctx.throw(403, "Unauthorized")
    }

    if (!utils.isValidInternalAPIKey(apiKey)) {
      ctx.throw(403, "Unauthorized")
    }
  }

  return next()
}
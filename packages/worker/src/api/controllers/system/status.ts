import { accounts, env as coreEnv } from "@clairview/backend-core"
import { Ctx, SystemStatusResponse } from "@clairview/types"
import env from "../../../environment"

export const fetch = async (ctx: Ctx<void, SystemStatusResponse>) => {
  let status: SystemStatusResponse | undefined
  if (!env.SELF_HOSTED && !env.DISABLE_ACCOUNT_PORTAL) {
    status = await accounts.getStatus()
  }

  if (!status) {
    status = {
      health: {
        passing: true,
      },
    }
  }

  if (coreEnv.VERSION) {
    status.version = coreEnv.VERSION
  }

  ctx.body = status
}

import { users } from "@clairview/backend-core"
import { quotas } from "@budibase/pro"
import { QuotaUsageType, StaticQuotaName } from "@clairview/types"

export const run = async () => {
  const userCount = await users.getUserCount()
  console.log(`Syncing user count: ${userCount}`)
  await quotas.setUsage(userCount, StaticQuotaName.USERS, QuotaUsageType.STATIC)
}

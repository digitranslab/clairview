import { users } from "@clairview/backend-core"
import { quotas } from "@budibase/pro"
import { QuotaUsageType, StaticQuotaName } from "@clairview/types"

export const run = async () => {
  const creatorCount = await users.getCreatorCount()
  console.log(`Syncing creator count: ${creatorCount}`)
  await quotas.setUsage(
    creatorCount,
    StaticQuotaName.CREATORS,
    QuotaUsageType.STATIC
  )
}

import { context } from "@clairview/backend-core"
import { User } from "@clairview/types"

export function get(userId: string) {
  const db = context.getAppDB()
  return db.get<User>(userId)
}

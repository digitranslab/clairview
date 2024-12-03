import { Table, TableSourceType } from "@clairview/types"
import { isExternalTableID } from "../../../integrations/utils"
import { docIds } from "@clairview/backend-core"

export function isExternal(opts: { table?: Table; tableId?: string }): boolean {
  if (opts.table && opts.table.sourceType === TableSourceType.EXTERNAL) {
    return true
  } else if (opts.tableId && isExternalTableID(opts.tableId)) {
    return true
  }
  return false
}

export function isTable(table: any): table is Table {
  return table._id && docIds.isTableId(table._id)
}

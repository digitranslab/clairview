import { Ctx } from "@clairview/types"
import { IsolatedVM } from "../../jsRunner/vm"
import { iifeWrapper, UserScriptError } from "@clairview/string-templates"

export async function execute(ctx: Ctx) {
  const { script, context } = ctx.request.body
  const vm = new IsolatedVM()
  try {
    ctx.body = vm.withContext(context, () => vm.execute(iifeWrapper(script)))
  } catch (err: any) {
    if (err.code === UserScriptError.code) {
      throw err.userScriptError
    }
    throw err
  }
}

export async function save(ctx: Ctx) {
  ctx.throw(501, "Not currently implemented")
}
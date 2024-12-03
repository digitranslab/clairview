import {
  UserCtx,
  PostEventPublishRequest,
  EventPublishType,
} from "@clairview/types"
import { events } from "@clairview/backend-core"

export async function publish(ctx: UserCtx<PostEventPublishRequest, void>) {
  switch (ctx.request.body.type) {
    case EventPublishType.ENVIRONMENT_VARIABLE_UPGRADE_PANEL_OPENED:
      await events.environmentVariable.upgradePanelOpened(ctx.user._id!)
      break
    default:
      ctx.throw(400, "Invalid publish event type.")
  }
  ctx.status = 200
}

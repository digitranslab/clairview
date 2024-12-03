import { BaseSocket } from "./websocket"
import authorized from "../middleware/authorized"
import http from "http"
import Koa from "koa"
import { permissions } from "@clairview/backend-core"

export default class ClientAppWebsocket extends BaseSocket {
  constructor(app: Koa, server: http.Server) {
    super(app, server, "/socket/client", [authorized(permissions.BUILDER)])
  }
}

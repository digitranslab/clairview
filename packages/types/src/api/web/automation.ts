import { DocumentDestroyResponse } from "@clairview/nano"
import { Automation } from "../../documents"

export interface DeleteAutomationResponse extends DocumentDestroyResponse {}

export interface FetchAutomationResponse {
  automations: Automation[]
}

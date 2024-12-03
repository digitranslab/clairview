export const ApiKeyAuth = {
  type: "apiKey",
  in: "header",
  name: "x-clairview-api-key",
  description:
    "Your individual API key, this will provide access based on the configured RBAC settings of your user.",
}

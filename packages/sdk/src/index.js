import * as ClairviewApi from "../sdk"

export default class SDK {
  applications = new ClairviewApi.ApplicationsApi()
  queries = new ClairviewApi.QueriesApi()
  rows = new ClairviewApi.RowsApi()
  tables = new ClairviewApi.TablesApi()
  users = new ClairviewApi.UsersApi()

  constructor({ apiKey, host }) {
    let ApiClient = new ClairviewApi.ApiClient()

    // Default to current host
    ApiClient.basePath = `${host || ""}/api/public/v1`
    ApiClient.authentications["ApiKeyAuth"].apiKey = apiKey

    this.applications = new ClairviewApi.ApplicationsApi(ApiClient)
    this.queries = new ClairviewApi.QueriesApi(ApiClient)
    this.rows = new ClairviewApi.RowsApi(ApiClient)
    this.tables = new ClairviewApi.TablesApi(ApiClient)
    this.users = new ClairviewApi.UsersApi(ApiClient)
  }
}

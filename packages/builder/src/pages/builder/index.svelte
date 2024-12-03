<script>
  import { redirect } from "@roxi/routify"
  import { auth } from "stores/portal"
  import { sdk } from "@clairview/shared-core"

  auth.checkQueryString()

  $: {
    if (sdk.users.hasBuilderPermissions($auth.user)) {
      $redirect(`./portal`)
    } else if ($auth.user) {
      $redirect(`./apps`)
    }
  }
</script>

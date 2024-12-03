<script>
  import { Button } from "@clairview/bbui"
  import { goto } from "@roxi/routify"
  import { auth, admin, licensing } from "stores/portal"
  import { sdk } from "@clairview/shared-core"
</script>

{#if !$licensing.isEnterprisePlan && !$licensing.isEnterpriseTrial}
  {#if $admin.cloud && $auth?.user?.accountPortalAccess}
    <Button
      cta
      size="M"
      on:click
      on:click={() => {
        window.open($admin.accountPortalUrl + "/portal/upgrade", "_blank")
      }}
    >
      Upgrade
    </Button>
  {:else if !$admin.cloud && sdk.users.isAdmin($auth.user)}
    <Button
      cta
      size="M"
      on:click={() => $goto("/builder/portal/account/upgrade")}
      on:click
    >
      Upgrade
    </Button>
  {/if}
{/if}

<script>
  import { UserAvatar } from "@clairview/frontend-core"

  export let row
</script>

{#if row?.user?.email}
  <UserAvatar user={row.user} />
{/if}

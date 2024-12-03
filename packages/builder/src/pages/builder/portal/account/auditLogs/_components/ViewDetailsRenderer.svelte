<script>
  import { ActionButton } from "@clairview/bbui"
  import { getContext } from "svelte"

  export let row
  const auditLogs = getContext("auditLogs")
  const onClick = e => {
    e.stopPropagation()
    auditLogs.viewDetails(row)
  }
</script>

<ActionButton size="S" on:click={onClick}>Details</ActionButton>

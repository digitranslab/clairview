<script>
  import { Icon } from "@clairview/bbui"
  import { sdk } from "@clairview/shared-core"

  export let value
  export let row

  $: count = getCount(row, value)

  const getCount = (row, value) => {
    return sdk.users.hasAppBuilderPermissions(row)
      ? row.builder.apps.length +
          Object.keys(row.roles || {}).filter(appId =>
            row.builder.apps.includes(appId)
          ).length
      : Object.keys(value || {}).length
  }
</script>

<div class="align">
  <div class="spacing">
    <Icon name="WebPage" />
  </div>
  {count}
</div>

<style>
  .align {
    display: flex;
    overflow: hidden;
  }
  .spacing {
    margin-right: var(--spacing-m);
  }
</style>

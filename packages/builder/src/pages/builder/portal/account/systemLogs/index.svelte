<script>
  import { Layout, Heading, Body, Button } from "@clairview/bbui"
  import { downloadStream } from "@clairview/frontend-core"
  import Spinner from "components/common/Spinner.svelte"

  import { API } from "api"

  let loading = false

  async function download() {
    loading = true
    try {
      await downloadStream(await API.getSystemLogs())
    } finally {
      loading = false
    }
  }
</script>

<Layout noPadding>
  <Heading>System logs</Heading>
  <Body>Download your latest logs to share with the Clairview team</Body>
  <div class="download-button">
    <Button cta on:click={download} disabled={loading}>
      <div class="button-content">
        {#if loading}
          <Spinner size="10" />
        {/if}
        Download
      </div>
    </Button>
  </div>
</Layout>

<style>
  .button-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-m);
  }
</style>

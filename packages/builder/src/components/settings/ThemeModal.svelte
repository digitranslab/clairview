<script>
  import { ModalContent, Select } from "@clairview/bbui"
  import { themeStore } from "stores/portal"
  import { ThemeOptions } from "@clairview/shared-core"
</script>

<ModalContent title="Theme">
  <Select
    options={ThemeOptions}
    bind:value={$themeStore.theme}
    placeholder={null}
    getOptionLabel={x => x.name}
    getOptionValue={x => x.id}
  />
</ModalContent>

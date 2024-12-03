<script>
  import { ColorPicker } from "@clairview/bbui"
  import { themeStore } from "stores/builder"

  export let value
</script>

<ColorPicker {value} on:change spectrumTheme={$themeStore.theme} />

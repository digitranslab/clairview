<script>
  import Logo from "assets/bb-emblem.svg"
  import { goto } from "@roxi/routify"
  import { organisation } from "stores/portal"
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions-->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<img
  src={$organisation.logoUrl || Logo}
  alt="Clairview Logo"
  on:click={() => $goto("./apps")}
/>

<style>
  img {
    width: 30px;
    height: 30px;
  }
</style>

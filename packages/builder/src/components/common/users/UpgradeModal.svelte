<script>
  import { ModalContent } from "@clairview/bbui"
  import { licensing } from "stores/portal"

  export let isOwner
</script>

<ModalContent
  onConfirm={() =>
    isOwner
      ? $licensing.goToUpgradePage()
      : window.open("https://clairview.com/pricing/", "_blank")}
  confirmText={isOwner ? "Upgrade" : "View plans"}
  title="Upgrade to add more users"
>
  <div>
    Free plan is limited to {$licensing.license.quotas.usage.static.users.value}
    users. Upgrade your plan to add more users.
  </div>
</ModalContent>

<style>
</style>

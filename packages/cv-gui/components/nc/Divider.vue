<script lang="ts" setup>
const props = defineProps<{
  dividerClass?: string
}>()

const dividerClass = toRef(props, 'dividerClass')
</script>

<template>
  <a-divider :class="dividerClass" class="cv-divider" />
</template>

<style lang="scss">
.cv-divider.ant-divider {
  @apply my-1.25;
}
</style>

<script setup lang="ts">
/**
 * ## Known Issue and Fix
 * - **Issue**: When conditionally rendering `NcMenuItem` using `v-if` without a corresponding `v-else` fallback,
 *   Vue may throw a
 * `NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`.
 *
 * - This issue occurs specifically when the `NcMenu` is open, and the condition changes dynamically (e.g., during runtime state changes)
 *
 * - **Fix**: Use `v-show` instead of `v-if` when no replacement (fallback) node is provided. This keeps the element
 *   in the DOM but toggles its visibility, preventing the DOM manipulation issue.
 */
import type { StyleValue } from '@vue/runtime-dom'

defineProps<{
  style?: StyleValue
  disabled?: boolean | number
}>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="w-full" :style="style">
    <a-menu-item v-bind="$attrs" :disabled="Boolean(disabled)" class="cv-menu-item">
      <div class="cv-menu-item-inner">
        <slot />
      </div>
    </a-menu-item>
  </div>
</template>

<style lang="scss">
.ant-dropdown-menu-item.cv-menu-item {
  @apply p-2 mx-1.5 font-normal text-sm xs:(text-base py-3 px-3.5 mx-0) rounded-md overflow-hidden hover:bg-gray-100;
}

.cv-menu-item-inner {
  @apply flex flex-row items-center gap-x-2 text-sm;
}

.cv-menu-item > .ant-dropdown-menu-title-content {
  // Not Icon
  :not(.cv-icon):not(.material-symbols) {
    line-height: 1.5;
  }

  @apply flex flex-row items-center;
}

.cv-menu-item::after {
  background: none;
}
</style>

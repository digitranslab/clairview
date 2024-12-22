<script lang="ts" setup>
const props = defineProps<{
  popupOffset?: number[]
}>()

const slots = useSlots()
</script>

<template>
  <a-sub-menu :popup-offset="props.popupOffset" class="cv-sub-menu" popup-class-name="cv-submenu-popup">
    <template #title>
      <div class="cv-submenu-title flex flex-row items-center gap-x-1.5 py-1.75 justify-between group">
        <div class="flex flex-row items-center gap-x-2">
          <slot name="title" />
        </div>

        <slot v-if="slots.expandIcon" name="expandIcon" />
        <GeneralIcon v-else icon="arrowRight" class="cv-submenu-arrow text-base" />
      </div>
    </template>

    <template #expandIcon> </template>
    <div class="py-1.5">
      <slot />
    </div>
  </a-sub-menu>
</template>

<style lang="scss">
.ant-dropdown-menu-submenu.cv-sub-menu {
  @apply flex mx-1.5 rounded-md overflow-hidden !hover:bg-gray-100;

  &:not(.ant-dropdown-menu-submenu-disabled) {
    .cv-submenu-title {
      @apply hover:text-gray-800;
    }

    .cv-submenu-arrow {
      @apply text-gray-600 group-hover:text-gray-800;
    }
  }
}

.cv-sub-menu > .ant-dropdown-menu-submenu-title {
  @apply pl-2 py-0 w-full;
}

.ant-dropdown-menu-submenu .ant-dropdown-menu-submenu-title:hover {
  @apply !bg-gray-100;
}

.cv-submenu-popup {
  @apply !rounded-lg border-1 border-gray-50;
}
.cv-submenu-popup .ant-dropdown-menu.ant-dropdown-menu-sub {
  @apply !rounded-lg !shadow-lg shadow-gray-200;
}

.cv-menu-item::after {
  background: none;
}
</style>

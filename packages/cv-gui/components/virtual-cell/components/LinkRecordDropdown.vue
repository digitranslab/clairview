<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  isOpen: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
})

const emits = defineEmits(['update:isOpen'])

const isOpen = useVModel(props, 'isOpen', emits)

const ncLinksDropdownRef = ref<HTMLDivElement>()

const randomClass = `link-records_${Math.floor(Math.random() * 99999)}`

const addOrRemoveClass = (add: boolean = false) => {
  const dropdownRoot = ncLinksDropdownRef.value?.parentElement?.parentElement?.parentElement?.parentElement as HTMLElement
  if (dropdownRoot) {
    if (add) {
      dropdownRoot.classList.add('inset-0', 'cv-link-dropdown-root', `cv-root-${randomClass}`)
    } else {
      dropdownRoot.classList.remove('inset-0', 'cv-link-dropdown-root', `cv-root-${randomClass}`)
    }
  }
}

watch(
  isOpen,
  (next) => {
    if (next) {
      onClickOutside(document.querySelector(`.${randomClass}`)! as HTMLDivElement, (e) => {
        const targetEl = e?.target as HTMLElement
        if (!targetEl?.classList.contains(`cv-root-${randomClass}`) || targetEl?.closest(`.cv-${randomClass}`)) {
          return
        }
        isOpen.value = false

        addOrRemoveClass(false)
      })
    } else {
      addOrRemoveClass(false)
    }
  },
  { flush: 'post' },
)

watch([ncLinksDropdownRef, isOpen], () => {
  if (!ncLinksDropdownRef.value) return

  if (isOpen.value) {
    addOrRemoveClass(true)
  } else {
    addOrRemoveClass(false)
  }
})
</script>

<template>
  <NcDropdown
    :visible="isOpen"
    placement="bottom"
    :overlay-class-name="`cv-links-dropdown !min-w-[540px] xs:(!min-w-[90vw]) ${isOpen ? 'active' : ''}`"
    :class="`.cv-${randomClass}`"
  >
    <slot />
    <template #overlay>
      <div ref="ncLinksDropdownRef" class="cv-links-dropdown-wrapper" :class="`${randomClass}`">
        <slot name="overlay" />
      </div>
    </template>
  </NcDropdown>
</template>

<style lang="scss">
.cv-links-dropdown {
  @apply rounded-xl !border-gray-200;
  z-index: 1000 !important;
}
.cv-link-dropdown-root {
  z-index: 1000;
}

.cv-links-dropdown-wrapper {
  @apply h-[412px] w-[540px] xs:(w-[90vw] min-h-[312px] h-[312px]);
  overflow-y: auto;
  overflow-x: hidden;
  resize: vertical;
  min-height: 412px;
  max-height: 700px;
  max-width: 540px;
}
</style>

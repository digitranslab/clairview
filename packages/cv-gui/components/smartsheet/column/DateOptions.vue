<script setup lang="ts">
import { UITypes, dateFormats, dateMonthFormats } from 'clairview-sdk'

const props = defineProps<{
  value: any
}>()

const emit = defineEmits(['update:value'])

const vModel = useVModel(props, 'value', emit)

// set default value
vModel.value.meta = {
  ...columnDefaultMeta[UITypes.Date],
  ...(vModel.value.meta || {}),
}
</script>

<template>
  <a-form-item>
    <a-select
      v-model:value="vModel.meta.date_format"
      show-search
      class="cv-date-select"
      dropdown-class-name="cv-dropdown-date-format"
    >
      <template #suffixIcon>
        <GeneralIcon icon="arrowDown" class="text-gray-700" />
      </template>
      <a-select-option v-for="(format, i) of [...dateFormats, ...dateMonthFormats]" :key="i" :value="format">
        <div class="w-full flex gap-2 justify-between items-center">
          {{ format }}
          <component
            :is="iconMap.check"
            v-if="vModel.meta.date_format === format"
            id="cv-selected-item-icon"
            class="text-primary w-4 h-4"
          />
        </div>
      </a-select-option>
    </a-select>
  </a-form-item>
</template>

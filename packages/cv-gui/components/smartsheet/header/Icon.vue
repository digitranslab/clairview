<script lang="ts" setup>
import type { ColumnType } from 'clairview-sdk'
import { isVirtualCol } from 'clairview-sdk'

const { column } = defineProps<{ column: ColumnType }>()
</script>

<template>
  <SmartsheetHeaderVirtualCellIcon v-if="isVirtualCol(column)" :column-meta="column" />
  <SmartsheetHeaderCellIcon v-else :column-meta="column" />
</template>

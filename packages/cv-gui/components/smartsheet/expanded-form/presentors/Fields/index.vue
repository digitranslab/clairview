<script setup lang="ts">
import { type ColumnType } from 'clairview-sdk'

/* interface */

const props = defineProps<{
  store: ReturnType<typeof useProvideExpandedFormStore>
  rowId?: string
  fields: ColumnType[]
  hiddenFields: ColumnType[]
  isUnsavedDuplicatedRecordExist: boolean
  isUnsavedFormExist: boolean
  isLoading: boolean
  isSaving: boolean
  newRecordSubmitBtnText?: string
}>()

const emits = defineEmits(['copy:record-url', 'delete:row', 'save'])

const rowId = toRef(props, 'rowId')
const fields = toRef(props, 'fields')
const hiddenFields = toRef(props, 'hiddenFields')
const isUnsavedDuplicatedRecordExist = toRef(props, 'isUnsavedDuplicatedRecordExist')
const isUnsavedFormExist = toRef(props, 'isUnsavedFormExist')
const isLoading = toRef(props, 'isLoading')
const isSaving = toRef(props, 'isSaving')
const newRecordSubmitBtnText = toRef(props, 'newRecordSubmitBtnText')

/* stores */

const { commentsDrawer, changedColumns, isNew, loadRow: _loadRow, row: _row } = props.store

const { isUIAllowed } = useRoles()
const { isMobileMode } = useGlobal()

/* flags */

const showRightSections = computed(() => !isNew.value && commentsDrawer.value && isUIAllowed('commentList'))

const canEdit = computed(() => isUIAllowed('dataEdit'))
</script>

<script lang="ts">
export default {
  name: 'ExpandedFormPresentorsFields',
}
</script>

<template>
  <div class="h-full flex flex-row">
    <div
      class="h-full flex xs:w-full flex-col overflow-hidden"
      :class="{
        'w-full': !showRightSections,
        'flex-1': showRightSections,
      }"
    >
      <SmartsheetExpandedFormPresentorsFieldsColumns
        :store="props.store"
        :fields="fields"
        :hidden-fields="hiddenFields"
        :is-loading="isLoading"
      />

      <div
        v-if="canEdit"
        class="w-full flex items-center justify-end px-2 xs:(p-0 gap-x-4 justify-between)"
        :class="{
          'xs(border-t-1 border-gray-200)': !isNew,
        }"
      >
        <div v-if="!isNew && isMobileMode" class="p-2">
          <NcDropdown placement="bottomRight" class="p-2">
            <NcButton :disabled="isLoading" class="cv-expand-form-more-actions" type="secondary" size="small">
              <GeneralIcon :class="isLoading ? 'text-gray-300' : 'text-gray-700'" class="text-md" icon="threeDotVertical" />
            </NcButton>

            <template #overlay>
              <NcMenu>
                <NcMenuItem class="text-gray-700" @click="_loadRow()">
                  <div v-e="['c:row-expand:reload']" class="flex gap-2 items-center" data-testid="cv-expanded-form-reload">
                    <component :is="iconMap.reload" class="cursor-pointer" />
                    {{ $t('general.reload') }}
                  </div>
                </NcMenuItem>
                <NcMenuItem v-if="rowId" class="text-gray-700" @click="!isNew ? emits('copy:record-url') : () => {}">
                  <div v-e="['c:row-expand:copy-url']" class="flex gap-2 items-center" data-testid="cv-expanded-form-copy-url">
                    <component :is="iconMap.copy" class="cursor-pointer cv-duplicate-row" />
                    {{ $t('labels.copyRecordURL') }}
                  </div>
                </NcMenuItem>
                <NcDivider />
                <NcMenuItem
                  v-if="isUIAllowed('dataEdit') && !isNew"
                  v-e="['c:row-expand:delete']"
                  class="!text-red-500 !hover:bg-red-50"
                  @click="!isNew && emits('delete:row')"
                >
                  <div data-testid="cv-expanded-form-delete">
                    <component :is="iconMap.delete" class="cursor-pointer cv-delete-row" />
                    Delete record
                  </div>
                </NcMenuItem>
              </NcMenu>
            </template>
          </NcDropdown>
        </div>
        <div v-if="isMobileMode" class="p-2">
          <NcButton
            v-e="['c:row-expand:save']"
            :disabled="changedColumns.size === 0 && !isUnsavedFormExist"
            :loading="isSaving"
            class="cv-expand-form-save-btn !xs:(text-sm) !px-2"
            :class="{
              '!h-7': !isMobileMode,
            }"
            data-testid="cv-expanded-form-save"
            type="primary"
            :size="isMobileMode ? 'small' : 'xsmall'"
            @click="emits('save')"
          >
            <div class="xs:px-1">{{ newRecordSubmitBtnText ?? isNew ? 'Create Record' : 'Save Record' }}</div>
          </NcButton>
        </div>
      </div>
      <div v-else class="p-2" />
    </div>
    <div
      v-if="showRightSections && !isUnsavedDuplicatedRecordExist"
      class="cv-comments-drawer border-l-1 relative border-gray-200 bg-gray-50 w-1/3 max-w-[400px] min-w-0 h-full xs:hidden rounded-br-2xl"
      :class="{
        active: commentsDrawer && isUIAllowed('commentList'),
      }"
    >
      <SmartsheetExpandedFormSidebar :store="store" />
    </div>
  </div>
</template>

<style lang="scss">
.cv-drawer-expanded-form {
  @apply xs:my-0;

  .ant-drawer-content-wrapper {
    @apply !h-[90vh];
    .ant-drawer-content {
      @apply rounded-t-2xl;
    }
  }
}

.cv-expanded-cell-header {
  @apply w-full text-gray-500 !font-weight-500 !text-sm xs:(text-gray-600 mb-2 !text-small) pr-3;

  svg.cv-cell-icon,
  svg.cv-virtual-cell-icon {
    @apply !w-3.5 !h-3.5;
  }
}

.cv-expanded-cell-header > :nth-child(2) {
  @apply !text-sm xs:!text-small;
}
.cv-expanded-cell-header > :first-child {
  @apply !text-md pl-2 xs:(pl-0 -ml-0.5);
}
.cv-expanded-cell-header:not(.cv-cell-expanded-form-header) > :first-child {
  @apply pl-0;
}

.cv-drawer-expanded-form .cv-modal {
  @apply !p-0;
}
</style>

<style lang="scss" scoped>
:deep(.ant-select-selector) {
  @apply !xs:(h-full);
}

.cv-data-cell {
  @apply !rounded-lg;
  transition: all 0.3s;

  &:not(.cv-readonly-div-data-cell):not(.cv-system-field):not(.cv-attachment-cell):not(.cv-virtual-cell-button) {
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  }
  &:not(:focus-within):hover:not(.cv-readonly-div-data-cell):not(.cv-system-field):not(.cv-virtual-cell-button) {
    @apply !border-1;
    &:not(.cv-attachment-cell):not(.cv-virtual-cell-button) {
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.24);
    }
  }

  &.cv-readonly-div-data-cell,
  &.cv-system-field {
    @apply !border-gray-200;

    .cv-cell,
    .cv-virtual-cell {
      @apply text-gray-400;
    }
  }
  &.cv-readonly-div-data-cell:focus-within,
  &.cv-system-field:focus-within {
    @apply !border-gray-200;
  }

  &:focus-within:not(.cv-readonly-div-data-cell):not(.cv-system-field) {
    @apply !shadow-selected;
  }

  &:has(.cv-virtual-cell-qrcode .cv-qrcode-container),
  &:has(.cv-virtual-cell-barcode .cv-barcode-container) {
    @apply !border-none px-0 !rounded-none;
    :deep(.cv-virtual-cell-qrcode),
    :deep(.cv-virtual-cell-barcode) {
      @apply px-0;
      & > div {
        @apply !px-0;
      }
      .barcode-wrapper {
        @apply ml-0;
      }
    }
    :deep(.cv-virtual-cell-qrcode) {
      img {
        @apply !h-[84px] border-1 border-solid border-gray-200 rounded;
      }
    }
    :deep(.cv-virtual-cell-barcode) {
      .cv-barcode-container {
        @apply border-1 rounded-lg border-gray-200 h-[64px] max-w-full p-2;
        svg {
          @apply !h-full;
        }
      }
    }
  }
}

.cv-mentioned-cell {
  box-shadow: 0px 0px 0px 2px var(--ant-primary-color-outline) !important;
  @apply !border-brand-500 !border-1;
}

.cv-data-cell:focus-within {
  @apply !border-1 !border-brand-500;
}

:deep(.cv-system-field input) {
  @apply bg-transparent;
}
:deep(.cv-data-cell .cv-cell .cv-cell-field) {
  @apply px-2;
}
:deep(.cv-data-cell .cv-virtual-cell .cv-cell-field) {
  @apply px-2;
}
:deep(.cv-data-cell .cv-cell-field.cv-lookup-cell .cv-cell-field) {
  @apply px-0;
}
</style>

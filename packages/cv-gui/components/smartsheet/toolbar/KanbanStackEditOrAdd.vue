<script setup lang="ts">
const { isUIAllowed } = useRoles()

const { groupingFieldColumn } = useKanbanViewStoreOrThrow()

const isLocked = inject(IsLockedInj, ref(false))

const IsPublic = inject(IsPublicInj, ref(false))

const open = ref(false)

useMenuCloseOnEsc(open)

const handleSubmit = async () => {
  open.value = false
}

provide(IsKanbanInj, ref(true))
</script>

<template>
  <a-dropdown
    v-if="!IsPublic && isUIAllowed('fieldEdit')"
    v-model:visible="open"
    :trigger="['click']"
    overlay-class-name="cv-dropdown-kanban-add-edit-stack-menu"
  >
    <div class="cv-kanban-btn">
      <a-button
        v-e="['c:kanban:edit-or-add-stack']"
        class="cv-kanban-add-edit-stack-menu-btn cv-toolbar-btn"
        :disabled="isLocked"
      >
        <div class="flex items-center gap-1">
          <component :is="iconMap.edit" v-if="groupingFieldColumn" />
          <component :is="iconMap.plus" v-else />
          <span class="capitalize ml-1 text-sm">
            {{ groupingFieldColumn ? 'Edit' : 'Add' }}
            Stack
          </span>
        </div>
      </a-button>
    </div>
    <template #overlay>
      <div class="cv-edit-or-add-provider-wrapper">
        <LazySmartsheetColumnEditOrAddProvider
          v-if="open"
          :column="groupingFieldColumn"
          @submit="handleSubmit"
          @cancel="open = false"
          @click.stop
          @keydown.stop
        />
      </div>
    </template>
  </a-dropdown>
</template>

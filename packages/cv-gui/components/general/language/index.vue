<template>
  <a-dropdown
    class="select-none color-transition cursor-pointer"
    :trigger="['click']"
    overlay-class-name="cv-dropdown-menu-translate"
  >
    <div v-bind="$attrs" class="flex items-center justify-center">
      <MaterialSymbolsTranslate class="text-base cv-menu-translate" />
    </div>

    <template #overlay>
      <a-menu class="cv-scrollbar-dark-md min-w-64 max-h-90vh overflow-auto !p-1 m-1 rounded-md border-1 border-gray-200">
        <div class="m-1.5"><GeneralLanguageMenu /></div>
      </a-menu>
    </template>
  </a-dropdown>
</template>

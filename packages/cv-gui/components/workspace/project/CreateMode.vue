<script lang="ts" setup>
import NcCreateBasePlaceholder from '~icons/cv-icons/create-base-placeholder'
import NcCreateBaseWithAiPlaceholder from '~icons/cv-icons/create-base-with-ai-placeholder'

interface Props {
  aiMode: boolean | null
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['update:aiMode'])

const aiMode = useVModel(props, 'aiMode', emit)

const { isFeatureEnabled } = useBetaFeatureToggle()

onMounted(() => {
  if (!isFeatureEnabled(FEATURE_FLAG.AI_FEATURES)) {
    aiMode.value = false
  }
})
</script>

<template>
  <div v-if="isFeatureEnabled(FEATURE_FLAG.AI_FEATURES)" class="cv-create-base-wrapper">
    <div v-e="['c:base:create-blank']" class="cv-create-base" @click="aiMode = false">
      <div class="cv-placeholder-icon-wrapper">
        <component :is="NcCreateBasePlaceholder" class="cv-placeholder-icon stroke-transparent" />
      </div>
      <div class="cv-create-base-content">
        <div class="cv-create-base-content-title">
          <GeneralIcon icon="plus" class="h-4 w-4 !text-cv-content-gray-subtle" />
          Start from scratch
        </div>
        <div class="cv-create-base-content-subtitle">Build your Base according to your specific requirements.</div>
      </div>
    </div>
    <div v-e="['c:base:build-with-ai']" class="cv-create-base-ai" @click="aiMode = true">
      <div class="cv-placeholder-icon-wrapper">
        <component :is="NcCreateBaseWithAiPlaceholder" class="cv-placeholder-icon stroke-transparent" />
      </div>
      <div class="cv-create-base-content">
        <div class="cv-create-base-content-title">
          <GeneralIcon icon="ncAutoAwesome" class="h-4 w-4 !text-cv-fill-purple-dark" />
          Build Base with AI
        </div>
        <div class="cv-create-base-content-subtitle">Quickly build your ideal Base with all tables, views and fields.</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cv-create-base-wrapper {
  @apply flex gap-4;

  & > div {
    @apply rounded-xl flex flex-col border-1 w-[288px] overflow-hidden cursor-pointer transition-all;

    .cv-placeholder-icon-wrapper {
      @apply border-b-1 h-[180px] flex items-center justify-center;

      .cv-placeholder-icon {
        @apply flex-none;
      }
    }

    &.cv-create-base {
      @apply border-brand-200;

      &:hover {
        box-shadow: 0px 12px 16px -4px rgba(51, 102, 255, 0.12), 0px 4px 6px -2px rgba(51, 102, 255, 0.08);
      }

      .cv-placeholder-icon-wrapper {
        @apply border-brand-200 bg-cv-bg-brand;
      }
    }

    &.cv-create-base-ai {
      @apply border-purple-200;

      &:hover {
        box-shadow: 0px 12px 16px -4px rgba(125, 38, 205, 0.12), 0px 4px 6px -2px rgba(125, 38, 205, 0.08);
      }

      .cv-placeholder-icon-wrapper {
        @apply border-purple-200 bg-cv-bg-purple-light;
      }
    }

    .cv-create-base-content {
      @apply px-4 py-3 flex flex-col gap-2;

      .cv-create-base-content-title {
        @apply flex items-center gap-2 text-base text-cv-content-gray font-bold;
      }

      .cv-create-base-content-subtitle {
        @apply text-small leading-[18px] text-cv-content-gray-muted;
      }
    }
  }
}
</style>

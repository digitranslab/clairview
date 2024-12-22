<script lang="ts" setup>
import { useTitle } from '@vueuse/core'

const route = useRoute()

useShare()

const { te, t } = useI18n()

// todo: fix this
// const { hasSidebar, isOpen } = useSidebar('cv-left-sidebar')
const hasSidebar = ref(true)
const isOpen = ref(true)

const { signOut, user } = useGlobal()
const { clearWorkspaces } = useWorkspace()

const email = computed(() => user.value?.email ?? '---')

const refreshSidebar = ref(false)

useTitle(route.meta?.title && te(route.meta.title) ? `${t(route.meta.title)}` : 'ClairView')

const isPublic = computed(() => route.meta?.public)

watch(hasSidebar, (val) => {
  if (!val) {
    refreshSidebar.value = true
    nextTick(() => {
      refreshSidebar.value = false
    })
  }
})

const logout = async () => {
  await signOut({
    redirectToSignin: true,
  })
  await clearWorkspaces()
}
</script>

<script lang="ts">
export default {
  name: 'DefaultLayout',
}
</script>

<template>
  <a-layout>
    <a-layout-header class="max-h-[var(--new-header-height)] !px-2">
      <div class="flex w-full h-full items-center cv-header-content">
        <div class="flex-1 min-w-0 w-50">
          <nuxt-link :to="isPublic ? '' : '/'">
            <img src="~/assets/img/brand/clairview-full.png" class="h-11" />
          </nuxt-link>
        </div>

        <div v-if="$route.name === 'index-index'" class="flex gap-1">
          <!-- <a-button class="!text-inherit" data-testid="cv-dash-nav-workspaces"> Projects</a-button -->
          <!-- <a-button ghost class="!text-inherit" data-testid="cv-dash-nav-explore"> Template</a-button>
          <a-button ghost class="!text-inherit" data-testid="cv-dash-nav-help"> Help</a-button> -->
        </div>
        <div class="flex-1 min-w-0 flex justify-end gap-2">
          <div class="flex flex-row flex-grow">
            <slot name="navbar" />
          </div>
          <!-- <div v-if="isHomeScreen" class="cv-quick-action-wrapper" data-testid="cv-quick-action-wrapper">
            <MaterialSymbolsSearch class="cv-quick-action-icon" />
            <input class="" placeholder="Quick Actions" />

            <span class="cv-quick-action-shortcut">⌘ K</span>
          </div> -->

          <div v-if="!isPublic" class="flex items-center">
            <NotificationMenu class="mr-2" data-testid="cv-notification-bell-icon" />
          </div>

          <a-dropdown v-if="!isPublic" :trigger="['click']" overlay-class-name="cv-dropdown-user-accounts-menu">
            <div class="flex items-center gap-1 cursor-pointer" data-testid="cv-ws-account-menu-dropdown">
              <div
                class="h-8.5 w-8.5 rounded-full text-xs bg-secondary flex items-center justify-center font-weight-bold text-black uppercase"
              >
                {{ email ? email.split('@')[0].slice(0, 2) : 'A' }}
              </div>
              <MaterialSymbolsKeyboardArrowDownRounded />
            </div>

            <template #overlay>
              <a-menu class="!py-0 leading-8 !rounded min-w-40">
                <a-menu-item key="0" data-testid="cv-menu-accounts__user-settings" class="!rounded-t">
                  <nuxt-link v-e="['c:navbar:user:email']" class="cv-base-menu-item group !no-underline" to="/account/users">
                    <MdiAccountCircleOutline class="mt-1 group-hover:text-accent" />&nbsp;
                    <div class="prose group-hover:text-primary">
                      <div>{{ $t('labels.account') }}</div>
                      <div class="text-xs text-gray-500">{{ email }}</div>
                    </div>
                  </nuxt-link>
                </a-menu-item>

                <a-menu-divider class="!m-0" />
                <!-- <a-menu-item v-if="isUIAllowed('superAdminAppStore')" key="0" class="!rounded-t">
                  <nuxt-link
                    v-e="['c:settings:appstore', { page: true }]"
                    class="cv-base-menu-item group !no-underline"
                    to="/admin/users"
                  >
                    <MdiShieldAccountOutline class="mt-1 group-hover:text-accent" />&nbsp;
                    <span class="prose group-hover:text-primary">{{ $t('title.accountManagement') }}</span>
                  </nuxt-link>
                </a-menu-item> -->

                <a-menu-divider class="!m-0" />

                <a-menu-item key="1" class="!rounded-b group" data-testid="cv-menu-accounts__sign-out">
                  <div
                    v-e="['a:navbar:user:sign-out']"
                    class="cv-base-menu-item group"
                    data-testid="cv-logout-btn"
                    @click="logout"
                  >
                    <MdiLogout class="group-hover:text-accent" />&nbsp;

                    <span class="prose group-hover:text-primary">
                      {{ $t('general.signOut') }}
                    </span>
                  </div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
    <!--    todo: change class name -->
    <a-layout class="cv-root">
      <a-layout-sider
        v-if="hasSidebar"
        ref="sidebar"
        :collapsed="!isOpen"
        width="250"
        collapsed-width="50"
        class="relative shadow-md h-full z-1 cv-left-sidebar h-[calc(100vh_-_var(--new-header-height))] !shadow-none border-gray-100 border-r-1 !overflow-x-hidden"
        :trigger="null"
        collapsible
        theme="light"
      >
        <slot name="sidebar" />
      </a-layout-sider>
      <div class="w-full h-[calc(100vh_-_var(--new-header-height))]">
        <slot></slot>
      </div>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
.cv-workspace-avatar {
  @apply min-w-6 h-6 rounded-[6px] flex items-center justify-center text-white font-weight-bold uppercase;
  font-size: 0.7rem;
}

.cv-workspace-list {
  .cv-workspace-list-item {
    @apply flex gap-2 items-center;
  }

  :deep(.ant-menu-item) {
    @apply relative;

    & .color-band {
      @apply opacity-0 absolute w-2 h-7 -left-1 top-[6px] bg-[#4351E8] rounded-[99px] trasition-opacity;
    }
  }

  :deep(.ant-menu-item-selected, .ant-menu-item-active) .color-band {
    @apply opacity-100;
  }

  .cv-workspace-menu {
    @apply opacity-0 transition-opactity;
  }

  :deep(.ant-menu-item:hover) .cv-workspace-menu {
    @apply opacity-100;
  }
}

:deep(.cv-workspace-list .ant-menu-item) {
  @apply !my-0;
}

.cv-workspace-group {
  .cv-workspace-group-item {
    &:hover {
      @apply bg-primary bg-opacity-3 text-primary;
    }

    &.active {
      @apply bg-primary bg-opacity-8 text-primary;
    }

    @apply h-[40px] px-4 flex items-center gap-2 cursor-pointer;

    .cv-icon {
      @apply w-6;
    }
  }
}

// todo:  apply globally at windicss level
.cv-root {
  @apply text-[#4B5563];
}

.cv-collab-list {
  .cv-collab-list-item {
    @apply flex gap-2 py-2 px-4 items-center;

    .cv-collab-avatar {
      @apply w-6 h-6 rounded-full flex items-center justify-center text-white font-weight-bold uppercase;
      font-size: 0.7rem;
    }
  }
}

:deep(.ant-tabs-nav-list) {
  @apply ml-6;
}

.ant-layout-header {
  @apply !h-20 bg-transparent;
  border-bottom: 1px solid #f5f5f5;
}

.cv-quick-action-wrapper {
  @apply relative;

  input {
    @apply h-10 w-60 bg-gray-100 rounded-md pl-9 pr-5 mr-2;
  }

  .cv-quick-action-icon {
    @apply absolute left-2 top-6;
  }

  .cv-quick-action-shortcut {
    @apply text-gray-400 absolute right-4 top-0;
  }
}

:deep(.ant-tabs-tab:not(ant-tabs-tab-active)) {
  @apply !text-gray-500;
}

:deep(.ant-tabs-content) {
  @apply !min-h-25 !h-full;
}
</style>

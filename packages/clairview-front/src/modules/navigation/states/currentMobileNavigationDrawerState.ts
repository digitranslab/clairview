import { createState } from 'clairview-ui';

export const currentMobileNavigationDrawerState = createState<
  'main' | 'settings'
>({
  key: 'currentMobileNavigationDrawerState',
  defaultValue: 'main',
});

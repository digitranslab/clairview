import { createState } from 'clairview-ui';

export const isRightDrawerMinimizedState = createState<boolean>({
  key: 'ui/layout/is-right-drawer-minimized',
  defaultValue: false,
});

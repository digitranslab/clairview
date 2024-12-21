import { createState } from 'clairview-ui';

export const isRightDrawerOpenState = createState<boolean>({
  key: 'ui/layout/is-right-drawer-open',
  defaultValue: false,
});

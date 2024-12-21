import { createState } from 'clairview-ui';

export const canCreateActivityState = createState<boolean>({
  key: 'canCreateActivityState',
  defaultValue: false,
});

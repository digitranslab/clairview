import { createState } from 'clairview-ui';

export const isActivityInCreateModeState = createState<boolean>({
  key: 'isActivityInCreateModeState',
  defaultValue: false,
});

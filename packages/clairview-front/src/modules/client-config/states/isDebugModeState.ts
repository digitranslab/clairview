import { createState } from 'clairview-ui';

export const isDebugModeState = createState<boolean>({
  key: 'isDebugModeState',
  defaultValue: false,
});

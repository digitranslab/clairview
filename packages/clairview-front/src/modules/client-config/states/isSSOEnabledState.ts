import { createState } from 'clairview-ui';

export const isSSOEnabledState = createState<boolean>({
  key: 'isSSOEnabledState',
  defaultValue: false,
});

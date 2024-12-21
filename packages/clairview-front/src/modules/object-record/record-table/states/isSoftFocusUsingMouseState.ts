import { createState } from 'clairview-ui';

export const isSoftFocusUsingMouseState = createState<boolean>({
  key: 'isSoftFocusUsingMouseState',
  defaultValue: false,
});

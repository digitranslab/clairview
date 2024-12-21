import { createState } from 'clairview-ui';

export const previousDropdownFocusIdState = createState<string | null>({
  key: 'previousDropdownFocusIdState',
  defaultValue: null,
});

import { createState } from 'clairview-ui';

export const activeDropdownFocusIdState = createState<string | null>({
  key: 'activeDropdownFocusIdState',
  defaultValue: null,
});

import { createState } from 'clairview-ui';

export const internalHotkeysEnabledScopesState = createState<string[]>({
  key: 'internalHotkeysEnabledScopesState',
  defaultValue: [],
});

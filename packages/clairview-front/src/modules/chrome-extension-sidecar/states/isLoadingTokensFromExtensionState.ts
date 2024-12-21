import { createState } from 'clairview-ui';

export const isLoadingTokensFromExtensionState = createState<boolean | null>({
  key: 'isLoadingTokensFromExtensionState',
  defaultValue: null,
});

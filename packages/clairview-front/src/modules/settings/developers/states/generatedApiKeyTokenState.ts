import { createState } from 'clairview-ui';

export const apiKeyTokenState = createState<string | null>({
  key: 'apiKeyTokenState',
  defaultValue: null,
});

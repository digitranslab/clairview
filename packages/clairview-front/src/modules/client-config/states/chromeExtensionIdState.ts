import { createState } from 'clairview-ui';

export const chromeExtensionIdState = createState<string | null | undefined>({
  key: 'chromeExtensionIdState',
  defaultValue: null,
});

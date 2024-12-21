import { createState } from 'clairview-ui';

export const currentPageLocationState = createState<string>({
  key: 'currentPageLocationState',
  defaultValue: '',
});

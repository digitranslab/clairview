import { createState } from 'clairview-ui';

export const previousUrlState = createState<string>({
  key: 'previousUrlState',
  defaultValue: '',
});

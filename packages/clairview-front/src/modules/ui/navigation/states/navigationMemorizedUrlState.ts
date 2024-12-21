import { createState } from 'clairview-ui';

export const navigationMemorizedUrlState = createState<string>({
  key: 'navigationMemorizedUrlState',
  defaultValue: '/',
});

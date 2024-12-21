import { createState } from 'clairview-ui';

export const isCurrentUserLoadedState = createState<boolean>({
  key: 'isCurrentUserLoadedState',
  defaultValue: false,
});

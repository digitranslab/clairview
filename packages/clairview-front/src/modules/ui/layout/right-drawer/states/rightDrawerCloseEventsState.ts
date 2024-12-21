import { createState } from 'clairview-ui';

export const rightDrawerCloseEventState = createState<Event | null>({
  key: 'rightDrawerCloseEventState',
  defaultValue: null,
});

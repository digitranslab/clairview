import { createState } from 'clairview-ui';

export const isUpsertingActivityInDBState = createState<boolean>({
  key: 'isUpsertingActivityInDBState',
  defaultValue: false,
});

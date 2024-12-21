import { createState } from 'clairview-ui';

export const isVerifyPendingState = createState<boolean>({
  key: 'isVerifyPendingState',
  defaultValue: false,
});

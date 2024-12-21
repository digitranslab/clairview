import { createState } from 'clairview-ui';

export const isDeveloperDefaultSignInPrefilledState = createState<boolean>({
  key: 'isDeveloperDefaultSignInPrefilledState',
  defaultValue: false,
});

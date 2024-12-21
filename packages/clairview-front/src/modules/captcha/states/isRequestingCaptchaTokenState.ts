import { createState } from 'clairview-ui';

export const isRequestingCaptchaTokenState = createState<boolean>({
  key: 'isRequestingCaptchaTokenState',
  defaultValue: false,
});

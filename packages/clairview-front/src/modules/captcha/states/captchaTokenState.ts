import { createState } from 'clairview-ui';

export const captchaTokenState = createState<string | undefined>({
  key: 'captchaTokenState',
  defaultValue: undefined,
});

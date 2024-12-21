import { createState } from 'clairview-ui';

export const isCaptchaScriptLoadedState = createState<boolean>({
  key: 'isCaptchaScriptLoadedState',
  defaultValue: false,
});

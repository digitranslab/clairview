import { createState } from 'clairview-ui';

import { Captcha } from '~/generated/graphql';

export const captchaProviderState = createState<Captcha | null>({
  key: 'captchaProviderState',
  defaultValue: null,
});

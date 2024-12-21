import { createState } from 'clairview-ui';

import { Billing } from '~/generated/graphql';

export const billingState = createState<Billing | null>({
  key: 'billingState',
  defaultValue: null,
});

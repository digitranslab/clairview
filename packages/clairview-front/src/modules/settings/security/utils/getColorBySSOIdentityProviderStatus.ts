/* @license Enterprise */

import { ThemeColor } from 'clairview-ui';
import { SsoIdentityProviderStatus } from '~/generated/graphql';

export const getColorBySSOIdentityProviderStatus: Record<
  SsoIdentityProviderStatus,
  ThemeColor
> = {
  Active: 'green',
  Inactive: 'gray',
  Error: 'red',
};

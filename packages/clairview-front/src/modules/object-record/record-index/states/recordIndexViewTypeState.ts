import { createState } from 'clairview-ui';

import { ViewType } from '@/views/types/ViewType';

export const recordIndexViewTypeState = createState<ViewType | undefined>({
  key: 'recordIndexViewTypeState',
  defaultValue: undefined,
});

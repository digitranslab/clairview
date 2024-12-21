import { createState } from 'clairview-ui';

import { Sort } from '@/object-record/object-sort-dropdown/types/Sort';

export const recordIndexSortsState = createState<Sort[]>({
  key: 'recordIndexSortsState',
  defaultValue: [],
});

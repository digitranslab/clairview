import { createState } from 'clairview-ui';

import { Filter } from '@/object-record/object-filter-dropdown/types/Filter';

export const recordIndexFiltersState = createState<Filter[]>({
  key: 'recordIndexFiltersState',
  defaultValue: [],
});

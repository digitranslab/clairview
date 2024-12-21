import { ViewFilterGroup } from '@/views/types/ViewFilterGroup';
import { createState } from 'clairview-ui';

export const recordIndexViewFilterGroupsState = createState<ViewFilterGroup[]>({
  key: 'recordIndexViewFilterGroupsState',
  defaultValue: [],
});

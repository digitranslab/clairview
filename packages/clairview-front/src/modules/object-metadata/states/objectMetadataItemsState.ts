import { createState } from 'clairview-ui';

import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';

export const objectMetadataItemsState = createState<ObjectMetadataItem[]>({
  key: 'objectMetadataItemsState',
  defaultValue: [],
});

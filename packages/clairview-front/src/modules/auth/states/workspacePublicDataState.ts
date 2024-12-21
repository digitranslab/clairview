import { createState } from 'clairview-ui';
import { PublicWorkspaceDataOutput } from '~/generated/graphql';

export const workspacePublicDataState =
  createState<PublicWorkspaceDataOutput | null>({
    key: 'workspacePublicDataState',
    defaultValue: null,
  });

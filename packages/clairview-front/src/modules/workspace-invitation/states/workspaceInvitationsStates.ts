import { createState } from 'clairview-ui';
import { WorkspaceInvitation } from '@/workspace-member/types/WorkspaceMember';

export const workspaceInvitationsState = createState<
  Omit<WorkspaceInvitation, '__typename'>[]
>({
  key: 'workspaceInvitationsState',
  defaultValue: [],
});

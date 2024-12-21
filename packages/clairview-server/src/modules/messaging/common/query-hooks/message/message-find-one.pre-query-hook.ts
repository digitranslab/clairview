/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';

import { WorkspaceQueryHookInstance } from 'src/engine/api/graphql/workspace-query-runner/workspace-query-hook/interfaces/workspace-query-hook.interface';
import { FindOneResolverArgs } from 'src/engine/api/graphql/workspace-resolver-builder/interfaces/workspace-resolvers-builder.interface';

import { WorkspaceQueryHook } from 'src/engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator';
import { AuthContext } from 'src/engine/core-modules/auth/types/auth-context.type';
import { ClairviewORMManager } from 'src/engine/clairview-orm/clairview-orm.manager';
import { CanAccessMessageThreadService } from 'src/modules/messaging/common/query-hooks/message/can-access-message-thread.service';
import { MessageChannelMessageAssociationWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message-channel-message-association.workspace-entity';

@WorkspaceQueryHook(`message.findOne`)
export class MessageFindOnePreQueryHook implements WorkspaceQueryHookInstance {
  constructor(
    private readonly canAccessMessageThreadService: CanAccessMessageThreadService,
    private readonly clairviewORMManager: ClairviewORMManager,
  ) {}

  async execute(
    authContext: AuthContext,
    objectName: string,
    payload: FindOneResolverArgs,
  ): Promise<FindOneResolverArgs> {
    if (!authContext.user?.id) {
      throw new NotFoundException('User id is required');
    }

    const messageChannelMessageAssociationRepository =
      await this.clairviewORMManager.getRepository<MessageChannelMessageAssociationWorkspaceEntity>(
        'messageChannelMessageAssociation',
      );

    const messageChannelMessageAssociations =
      await messageChannelMessageAssociationRepository.find({
        where: {
          messageId: payload?.filter?.id?.eq,
        },
      });

    if (messageChannelMessageAssociations.length === 0) {
      throw new NotFoundException();
    }

    await this.canAccessMessageThreadService.canAccessMessageThread(
      authContext.user.id,
      authContext.workspace.id,
      messageChannelMessageAssociations,
    );

    return payload;
  }
}

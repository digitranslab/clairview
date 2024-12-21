import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { v4 } from 'uuid';

import { ClairviewORMManager } from 'src/engine/clairview-orm/clairview-orm.manager';
import { MessageChannelMessageAssociationWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message-channel-message-association.workspace-entity';
import { MessageThreadWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message-thread.workspace-entity';
import { MessageWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message.workspace-entity';
import { MessageWithParticipants } from 'src/modules/messaging/message-import-manager/types/message';

@Injectable()
export class MessagingMessageService {
  constructor(private readonly clairviewORMManager: ClairviewORMManager) {}

  public async saveMessagesWithinTransaction(
    messages: MessageWithParticipants[],
    messageChannelId: string,
    transactionManager: EntityManager,
  ): Promise<Map<string, string>> {
    const messageChannelMessageAssociationRepository =
      await this.clairviewORMManager.getRepository<MessageChannelMessageAssociationWorkspaceEntity>(
        'messageChannelMessageAssociation',
      );

    const messageRepository =
      await this.clairviewORMManager.getRepository<MessageWorkspaceEntity>(
        'message',
      );

    const messageThreadRepository =
      await this.clairviewORMManager.getRepository<MessageThreadWorkspaceEntity>(
        'messageThread',
      );

    const messageExternalIdsAndIdsMap = new Map<string, string>();

    for (const message of messages) {
      const existingMessageChannelMessageAssociation =
        await messageChannelMessageAssociationRepository.findOne(
          {
            where: {
              messageExternalId: message.externalId,
              messageChannelId: messageChannelId,
            },
          },
          transactionManager,
        );

      if (existingMessageChannelMessageAssociation) {
        continue;
      }

      const existingMessage = await messageRepository.findOne({
        where: {
          headerMessageId: message.headerMessageId,
        },
      });

      if (existingMessage) {
        await messageChannelMessageAssociationRepository.insert(
          {
            messageChannelId,
            messageId: existingMessage.id,
            messageExternalId: message.externalId,
            messageThreadExternalId: message.messageThreadExternalId,
          },
          transactionManager,
        );

        continue;
      }

      const existingThread = await messageThreadRepository.findOne(
        {
          where: {
            messages: {
              messageChannelMessageAssociations: {
                messageThreadExternalId: message.messageThreadExternalId,
                messageChannelId,
              },
            },
          },
        },
        transactionManager,
      );

      let newOrExistingMessageThreadId = existingThread?.id;

      if (!existingThread) {
        newOrExistingMessageThreadId = v4();

        await messageThreadRepository.insert(
          { id: newOrExistingMessageThreadId },
          transactionManager,
        );
      }

      const newMessageId = v4();

      await messageRepository.insert(
        {
          id: newMessageId,
          headerMessageId: message.headerMessageId,
          subject: message.subject,
          receivedAt: message.receivedAt,
          text: message.text,
          messageThreadId: newOrExistingMessageThreadId,
        },
        transactionManager,
      );

      messageExternalIdsAndIdsMap.set(message.externalId, newMessageId);

      await messageChannelMessageAssociationRepository.insert(
        {
          messageChannelId,
          messageId: newMessageId,
          messageExternalId: message.externalId,
          messageThreadExternalId: message.messageThreadExternalId,
          direction: message.direction,
        },
        transactionManager,
      );
    }

    return messageExternalIdsAndIdsMap;
  }
}

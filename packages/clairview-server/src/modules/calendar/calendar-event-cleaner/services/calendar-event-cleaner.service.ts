import { Injectable } from '@nestjs/common';

import { Any, IsNull } from 'typeorm';

import { ClairviewORMManager } from 'src/engine/clairview-orm/clairview-orm.manager';
import { deleteUsingPagination } from 'src/modules/messaging/message-cleaner/utils/delete-using-pagination.util';

@Injectable()
export class CalendarEventCleanerService {
  constructor(private readonly clairviewORMManager: ClairviewORMManager) {}

  public async cleanWorkspaceCalendarEvents(workspaceId: string) {
    const calendarEventRepository =
      await this.clairviewORMManager.getRepository('calendarEvent');

    await deleteUsingPagination(
      workspaceId,
      500,
      async (limit, offset) => {
        const nonAssociatedCalendarEvents = await calendarEventRepository.find({
          where: {
            calendarChannelEventAssociations: {
              id: IsNull(),
            },
          },
          take: limit,
          skip: offset,
        });

        return nonAssociatedCalendarEvents.map(({ id }) => id);
      },
      async (ids) => {
        await calendarEventRepository.delete({ id: Any(ids) });
      },
    );
  }
}

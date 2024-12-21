import { Injectable } from '@nestjs/common';

import { WorkflowAction } from 'src/modules/workflow/workflow-executor/interfaces/workflow-action.interface';

import { ClairviewORMManager } from 'src/engine/clairview-orm/clairview-orm.manager';
import {
  RecordCRUDActionException,
  RecordCRUDActionExceptionCode,
} from 'src/modules/workflow/workflow-executor/workflow-actions/record-crud/exceptions/record-crud-action.exception';
import { WorkflowDeleteRecordActionInput } from 'src/modules/workflow/workflow-executor/workflow-actions/record-crud/types/workflow-record-crud-action-input.type';
import { WorkflowActionResult } from 'src/modules/workflow/workflow-executor/workflow-actions/types/workflow-action-result.type';

@Injectable()
export class DeleteRecordWorkflowAction implements WorkflowAction {
  constructor(private readonly clairviewORMManager: ClairviewORMManager) {}

  async execute(
    workflowActionInput: WorkflowDeleteRecordActionInput,
  ): Promise<WorkflowActionResult> {
    const repository = await this.clairviewORMManager.getRepository(
      workflowActionInput.objectName,
    );

    const objectRecord = await repository.findOne({
      where: {
        id: workflowActionInput.objectRecordId,
      },
    });

    if (!objectRecord) {
      throw new RecordCRUDActionException(
        `Failed to delete: Record ${workflowActionInput.objectName} with id ${workflowActionInput.objectRecordId} not found`,
        RecordCRUDActionExceptionCode.RECORD_NOT_FOUND,
      );
    }

    await repository.update(workflowActionInput.objectRecordId, {
      deletedAt: new Date(),
    });

    return {
      result: objectRecord,
    };
  }
}

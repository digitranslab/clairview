import { Injectable } from '@nestjs/common';

import { WorkflowAction } from 'src/modules/workflow/workflow-executor/interfaces/workflow-action.interface';

import { ClairviewORMManager } from 'src/engine/clairview-orm/clairview-orm.manager';
import { WorkflowCreateRecordActionInput } from 'src/modules/workflow/workflow-executor/workflow-actions/record-crud/types/workflow-record-crud-action-input.type';
import { WorkflowActionResult } from 'src/modules/workflow/workflow-executor/workflow-actions/types/workflow-action-result.type';

@Injectable()
export class CreateRecordWorkflowAction implements WorkflowAction {
  constructor(private readonly clairviewORMManager: ClairviewORMManager) {}

  async execute(
    workflowActionInput: WorkflowCreateRecordActionInput,
  ): Promise<WorkflowActionResult> {
    const repository = await this.clairviewORMManager.getRepository(
      workflowActionInput.objectName,
    );

    const objectRecord = await repository.save(
      workflowActionInput.objectRecord,
    );

    return {
      result: objectRecord,
    };
  }
}

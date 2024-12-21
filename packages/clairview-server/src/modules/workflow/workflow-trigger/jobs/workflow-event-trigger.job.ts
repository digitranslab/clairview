import { Scope } from '@nestjs/common';

import { Process } from 'src/engine/core-modules/message-queue/decorators/process.decorator';
import { Processor } from 'src/engine/core-modules/message-queue/decorators/processor.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { FieldActorSource } from 'src/engine/metadata-modules/field-metadata/composite-types/actor.composite-type';
import { ClairviewORMManager } from 'src/engine/clairview-orm/clairview-orm.manager';
import {
  WorkflowVersionStatus,
  WorkflowVersionWorkspaceEntity,
} from 'src/modules/workflow/common/standard-objects/workflow-version.workspace-entity';
import { WorkflowWorkspaceEntity } from 'src/modules/workflow/common/standard-objects/workflow.workspace-entity';
import { WorkflowRunnerWorkspaceService } from 'src/modules/workflow/workflow-runner/workspace-services/workflow-runner.workspace-service';
import {
  WorkflowTriggerException,
  WorkflowTriggerExceptionCode,
} from 'src/modules/workflow/workflow-trigger/exceptions/workflow-trigger.exception';

export type WorkflowEventTriggerJobData = {
  workspaceId: string;
  workflowId: string;
  payload: object;
};

@Processor({ queueName: MessageQueue.workflowQueue, scope: Scope.REQUEST })
export class WorkflowEventTriggerJob {
  constructor(
    private readonly clairviewORMManager: ClairviewORMManager,
    private readonly workflowRunnerWorkspaceService: WorkflowRunnerWorkspaceService,
  ) {}

  @Process(WorkflowEventTriggerJob.name)
  async handle(data: WorkflowEventTriggerJobData): Promise<void> {
    const workflowRepository =
      await this.clairviewORMManager.getRepository<WorkflowWorkspaceEntity>(
        'workflow',
      );

    const workflow = await workflowRepository.findOneByOrFail({
      id: data.workflowId,
    });

    if (!workflow.lastPublishedVersionId) {
      throw new WorkflowTriggerException(
        'Workflow has no published version',
        WorkflowTriggerExceptionCode.INTERNAL_ERROR,
      );
    }

    const workflowVersionRepository =
      await this.clairviewORMManager.getRepository<WorkflowVersionWorkspaceEntity>(
        'workflowVersion',
      );

    const workflowVersion = await workflowVersionRepository.findOneByOrFail({
      id: workflow.lastPublishedVersionId,
    });

    if (workflowVersion.status !== WorkflowVersionStatus.ACTIVE) {
      throw new WorkflowTriggerException(
        'Workflow version is not active',
        WorkflowTriggerExceptionCode.INTERNAL_ERROR,
      );
    }

    await this.workflowRunnerWorkspaceService.run(
      data.workspaceId,
      workflow.lastPublishedVersionId,
      data.payload,
      {
        source: FieldActorSource.WORKFLOW,
        name: workflow.name,
      },
    );
  }
}

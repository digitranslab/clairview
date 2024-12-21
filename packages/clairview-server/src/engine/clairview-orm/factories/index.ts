import { EntitySchemaColumnFactory } from 'src/engine/clairview-orm/factories/entity-schema-column.factory';
import { EntitySchemaRelationFactory } from 'src/engine/clairview-orm/factories/entity-schema-relation.factory';
import { EntitySchemaFactory } from 'src/engine/clairview-orm/factories/entity-schema.factory';
import { ScopedWorkspaceContextFactory } from 'src/engine/clairview-orm/factories/scoped-workspace-context.factory';
import { WorkspaceDatasourceFactory } from 'src/engine/clairview-orm/factories/workspace-datasource.factory';

export const entitySchemaFactories = [
  EntitySchemaColumnFactory,
  EntitySchemaRelationFactory,
  EntitySchemaFactory,
  WorkspaceDatasourceFactory,
  ScopedWorkspaceContextFactory,
];

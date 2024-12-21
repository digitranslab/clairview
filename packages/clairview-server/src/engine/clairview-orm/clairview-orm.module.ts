import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSourceModule } from 'src/engine/metadata-modules/data-source/data-source.module';
import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { WorkspaceMetadataCacheModule } from 'src/engine/metadata-modules/workspace-metadata-cache/workspace-metadata-cache.module';
import { entitySchemaFactories } from 'src/engine/clairview-orm/factories';
import { EntitySchemaFactory } from 'src/engine/clairview-orm/factories/entity-schema.factory';
import { ClairviewORMGlobalManager } from 'src/engine/clairview-orm/clairview-orm-global.manager';
import { ClairviewORMManager } from 'src/engine/clairview-orm/clairview-orm.manager';
import { WorkspaceCacheStorageModule } from 'src/engine/workspace-cache-storage/workspace-cache-storage.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([ObjectMetadataEntity], 'metadata'),
    DataSourceModule,
    WorkspaceCacheStorageModule,
    WorkspaceMetadataCacheModule,
  ],
  providers: [
    ...entitySchemaFactories,
    ClairviewORMManager,
    ClairviewORMGlobalManager,
  ],
  exports: [EntitySchemaFactory, ClairviewORMManager, ClairviewORMGlobalManager],
})
export class ClairviewORMModule {}

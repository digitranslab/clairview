import { Module } from '@nestjs/common';

import { FeatureFlagModule } from 'src/engine/core-modules/feature-flag/feature-flag.module';
import { ClairviewORMModule } from 'src/engine/clairview-orm/clairview-orm.module';
import { FavoriteFolderDeletionListener } from 'src/modules/favorite-folder/listeners/favorite-folder.listener';

@Module({
  imports: [ClairviewORMModule, FeatureFlagModule],
  providers: [FavoriteFolderDeletionListener],
})
export class FavoriteFolderModule {}

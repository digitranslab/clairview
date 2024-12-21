import { WorkspaceFieldIndex } from 'src/engine/clairview-orm/decorators/workspace-field-index.decorator';
import { metadataArgsStorage } from 'src/engine/clairview-orm/storage/metadata-args.storage';

export function WorkspaceJoinColumn(
  relationPropertyKey: string,
): PropertyDecorator {
  return (object, propertyKey) => {
    metadataArgsStorage.addJoinColumns({
      target: object.constructor,
      relationName: relationPropertyKey,
      joinColumn: propertyKey.toString(),
    });

    // Register index for join column
    WorkspaceFieldIndex()(object, propertyKey);
  };
}

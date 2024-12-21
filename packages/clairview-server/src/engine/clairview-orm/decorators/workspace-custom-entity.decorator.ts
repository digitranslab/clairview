import { metadataArgsStorage } from 'src/engine/clairview-orm/storage/metadata-args.storage';
import { TypedReflect } from 'src/utils/typed-reflect';

export function WorkspaceCustomEntity(options = {}): ClassDecorator {
  return (target) => {
    const gate = TypedReflect.getMetadata(
      'workspace:gate-metadata-args',
      target,
    );

    metadataArgsStorage.addExtendedEntities({
      target,
      gate,
    });
  };
}

import { CustomException } from 'src/utils/custom-exception';

export class ClairviewORMException extends CustomException {
  code: ClairviewORMExceptionCode;
  constructor(message: string, code: ClairviewORMExceptionCode) {
    super(message, code);
  }
}

export enum ClairviewORMExceptionCode {
  METADATA_VERSION_NOT_FOUND = 'METADATA_VERSION_NOT_FOUND',
  METADATA_VERSION_MISMATCH = 'METADATA_VERSION_MISMATCH',
  METADATA_COLLECTION_NOT_FOUND = 'METADATA_COLLECTION_NOT_FOUND',
  WORKSPACE_SCHEMA_NOT_FOUND = 'WORKSPACE_SCHEMA_NOT_FOUND',
}

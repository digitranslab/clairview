import { Document } from "../document"

export enum FieldType {
  /**
   * a primitive type, stores a string, called Text within Clairview. This is one of the default
   * types of Clairview, if an external type is not fully understood, we will treat it as text.
   */
  STRING = "string",
  /**
   * similar to string type, called Long Form Text within Clairview. This is mainly a frontend
   * orientated type which enables a larger text input area. This can also be used
   * in conjunction with the 'useRichText' option to support a markdown editor/viewer.
   */
  LONGFORM = "longform",
  /**
   * similar to string type, called Options within Clairview. This works very similarly to
   * the string type within the backend, but is validated to a list of options. This will
   * display a <select> input within the builder/client.
   */
  OPTIONS = "options",
  /**
   * a primitive type, stores a number, as a floating point, called Number within Clairview.
   * this type will always represent numbers as reals/floating point - there is no integer only
   * type within Clairview.
   */
  NUMBER = "number",
  /**
   * a primitive type, stores a boolean, called Boolean within Clairview. This is often represented
   * as a toggle or checkbox within forms/grids.
   */
  BOOLEAN = "boolean",
  /**
   * a JSON type, this type is always an array of strings, called Multi-select within Clairview.
   * This type can be compared to the options type, as it functions similarly, but allows picking
   * multiple options rather than a single option.
   */
  ARRAY = "array",
  /**
   * a string type, this is always a string when input/returned from the API, called Date/Time within
   * Clairview. We utilise ISO date strings for representing dates, this type has a range of subtypes
   * to restrict it to date only, time only and ignore timezone capabilities.
   */
  DATETIME = "datetime",
  /**
   * a JSON type, an array of metadata about files held in object storage, called Attachment List within
   * Clairview. To utilise this type there is an API for uploading files to Clairview, which returns metadata
   * that can be stored against columns of this type. Currently this is not supported on external databases.
   */
  ATTACHMENTS = "attachment",
  /**
   * a JSON type, similar to the attachments type, called Attachment within Clairview. This type functions
   * much the same as the attachment list, but only holds a single attachment metadata as an object.
   * This simplifies the binding experience of using this column type.
   */
  ATTACHMENT_SINGLE = "attachment_single",
  /**
   * a complex type, called Relationships within Clairview. This is the most complex type of Clairview,
   * nothing should be stored against rows under link columns; this type simply represents the
   * relationship between tables as part of the table schema. When rows are input to the Clairview API
   * relationships to be made are represented as a list of row IDs to link. When rows are returned
   * from the Clairview API it will contain a list of row IDs and display column values of the related rows.
   */
  LINK = "link",
  /**
   * a complex type, called Formulas within Clairview. This type has two variants, static and dynamic, with
   * static only being supported against internal tables. Dynamic formulas calculate a provided HBS/JS binding
   * based on the row context and enrich it when rows are being returned from the API. Static bindings calculate
   * this when rows are being stored, so that the formula output can be searched upon within the DB.
   */
  FORMULA = "formula",
  /**
   * a complex type, called Auto Column within Clairview. This type has a few variants, with options such as a
   * date for created at/updated at, an auto ID column with auto-increments as rows are saved and a user
   * relationship type which stores the created by/updated by user details. These subtypes all depend on the
   * date, number of link types respectively. There is one case where these will be executed in the browser,
   * that is part of the initial formula definition, the formula will be live evaluated in the browser.
   */
  AUTO = "auto",
  /**
   * A complex type, called an AI column within Clairview. This type is only supported against internal tables
   * and calculates the output based on a chosen operation (summarise text, translation etc) which passes to
   * the configured Clairview Large Language Model to retrieve the output and write it back into the row.
   * AI fields function in a similar fashion to static formulas, and possess many of the same characteristics.
   */
  AI = "ai",
  /**
   * a JSON type, called JSON within Clairview. This type allows any arbitrary JSON to be input to this column
   * type, which will be represented as a JSON object in the row. This type depends on a schema being
   * provided to make the JSON searchable/bindable, the JSON cannot be fully dynamic.
   */
  JSON = "json",
  /**
   * @deprecated an internal type, this is an old deprecated type which is no longer used - still represented to note it
   * could appear in very old tables.
   */
  INTERNAL = "internal",
  /**
   * a string type, called Barcode/QR within Clairview. This type is used to denote to forms to that this column
   * should be filled in using a camera to read a barcode, there is a form component which will be used when this
   * type is found. The column will contain the contents of any barcode scanned.
   */
  BARCODEQR = "barcodeqr",
  /**
   * a JSON type, called Signature within Clairview. This type functions much the same as ATTACHMENTS but restricted
   * only to signatures.
   */
  SIGNATURE_SINGLE = "signature_single",
  /**
   * a string type, this allows representing very large integers, but they are held/managed within Clairview as
   * strings. When stored in external databases Clairview will attempt to use a real big integer type and depend
   * on the database parsing the string to this type as part of saving.
   */
  BIGINT = "bigint",
  /**
   * a JSON type, called Users within Clairview. It will hold an array of strings. This type is used to represent a link to an internal Clairview
   * resource, like a user or group, today only users are supported. This type will be represented as an
   * array of internal resource IDs (e.g. user IDs) within the row - this ID list will be enriched with
   * the full resources when rows are returned from the API. The full resources can be input to the API, or
   * an array of resource IDs, the API will squash these down and validate them before saving the row.
   */
  BB_REFERENCE = "bb_reference",
  /**
   * a string type, called User within Clairview. Same logic as `bb_reference`, storing a single id as string instead of an array
   */
  BB_REFERENCE_SINGLE = "bb_reference_single",
}

export const JsonTypes = [
  FieldType.ATTACHMENT_SINGLE,
  FieldType.ATTACHMENTS,
  // only BB_REFERENCE is JSON, it's an array, BB_REFERENCE_SINGLE is a string type
  FieldType.BB_REFERENCE,
  FieldType.JSON,
  FieldType.ARRAY,
]

export type FormulaResponseType =
  | FieldType.STRING
  | FieldType.NUMBER
  | FieldType.BOOLEAN
  | FieldType.DATETIME

export const NumericTypes = [FieldType.NUMBER, FieldType.BIGINT]

export function isNumeric(type: FieldType) {
  return NumericTypes.includes(type)
}

export const GroupByTypes = [
  FieldType.STRING,
  FieldType.LONGFORM,
  FieldType.OPTIONS,
  FieldType.NUMBER,
  FieldType.BOOLEAN,
  FieldType.DATETIME,
  FieldType.BIGINT,
]

export function canGroupBy(type: FieldType) {
  return GroupByTypes.includes(type)
}

export interface RowAttachment {
  size: number
  name: string
  extension: string
  key?: string
  // Populated on read
  url?: string
}

export interface Row extends Document {
  type?: string
  tableId?: string
  _viewId?: string
  [key: string]: any
}

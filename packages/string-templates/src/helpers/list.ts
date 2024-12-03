import { date, duration } from "./date"

/* 
@clairview/handlebars-helpers is not treeshakeable, so we can't use the barrel files.
Otherwise, we have issues when generating the isolated-vm bundle because of the treeshaking
*/
/* eslint-disable local-rules/no-clairview-imports */
// @ts-expect-error
import math from "@clairview/handlebars-helpers/lib/math"
// @ts-expect-error
import array from "@clairview/handlebars-helpers/lib/array"
// @ts-expect-error
import number from "@clairview/handlebars-helpers/lib/number"
// @ts-expect-error
import url from "@clairview/handlebars-helpers/lib/url"
// @ts-expect-error
import string from "@clairview/handlebars-helpers/lib/string"
// @ts-expect-error
import comparison from "@clairview/handlebars-helpers/lib/comparison"
// @ts-expect-error
import object from "@clairview/handlebars-helpers/lib/object"
// @ts-expect-error
import regex from "@clairview/handlebars-helpers/lib/regex"
// @ts-expect-error
import uuid from "@clairview/handlebars-helpers/lib/uuid"
/* eslint-enable local-rules/no-clairview-imports */

// https://github.com/evanw/esbuild/issues/56
const externalCollections = {
  math,
  array,
  number,
  url,
  string,
  comparison,
  object,
  regex,
  uuid,
}

export const helpersToRemoveForJs = ["sortBy"]

const addedHelpers = {
  date: date,
  duration: duration,
}

let helpers: Record<string, any>

export function getJsHelperList() {
  if (helpers) {
    return helpers
  }

  helpers = {}
  for (let collection of Object.values(externalCollections)) {
    for (let [key, func] of Object.entries<any>(collection)) {
      // Handlebars injects the hbs options to the helpers by default. We are adding an empty {} as a last parameter to simulate it
      helpers[key] = (...props: any) => func(...props, {})
    }
  }
  helpers = {
    ...helpers,
    ...addedHelpers,
  }

  for (const toRemove of helpersToRemoveForJs) {
    delete helpers[toRemove]
  }
  Object.freeze(helpers)
  return helpers
}

const { writeFileSync, readFileSync } = require('fs');
// import {mergeSwaggerSchema} from "../../src";

const swaggerEE =  JSON.parse(readFileSync('../clairview/src/ee/schema/swagger.json', 'utf8'));
const swaggerCE = JSON.parse(readFileSync('../clairview/src/schema/swagger.json', 'utf8'));
const swagger = {
...swaggerCE,
...swaggerEE,
  paths: {
...swaggerCE.paths,
...swaggerEE.paths,
},
  components: {
  ...swaggerCE.components,
  ...swaggerEE.components,
      schemas: {
    ...swaggerCE.components.schemas,
    ...swaggerEE.components.schemas,
    },
    responses: {
    ...swaggerCE.components.responses,
    ...swaggerEE.components.responses,
    },
  },
};

writeFileSync('cv_swagger.json', JSON.stringify(swagger));

import collections from '#shared/system/collections/addon.js';

/* Shared definition (Table + fields + Versions) plus the type registry */
import '#shared/system/collections/types.js';

/* Core */
import '#collections/core/materialize.js';
import '#collections/core/addon.js';

/* Pipelines — collection definitions */
import '#collections/core/pipelines/crud/create.js';
import '#collections/core/pipelines/crud/update.js';
import '#collections/core/pipelines/crud/delete.js';

/* Pipelines — collection items */
import '#collections/core/pipelines/items/create.js';
import '#collections/core/pipelines/items/update.js';
import '#collections/core/pipelines/items/delete.js';

/* Commands — collection definitions */
import '#collections/items/commands/crud/create.js';
import '#collections/items/commands/crud/update.js';
import '#collections/items/commands/crud/delete.js';
import '#collections/items/commands/crud/list.js';
import '#collections/items/commands/crud/get.js';

/* Commands — collection items */
import '#collections/items/commands/items/create.js';
import '#collections/items/commands/items/update.js';
import '#collections/items/commands/items/delete.js';
import '#collections/items/commands/items/list.js';
import '#collections/items/commands/items/get.js';

export default collections;

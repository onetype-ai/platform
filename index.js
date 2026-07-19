import './kernel/env.js';

import onetype from '@onetype/framework';
import '@onetype/framework/commands';
import '@onetype/framework/database';

/* Register */
import './kernel/core/register/middlewares.js';
import './kernel/core/register/emitters.js';


/* Addons */
import '#collections/load.js';
import '#runtimes/load.js';
import '#packages/load.js';

/* Workspace */
import './addons/workspace/users/back/load.js';
import './addons/workspace/tokens/back/load.js';

/* Items */
import './kernel/items/assets/assets.js';
import './kernel/items/database/primary.js';
import './kernel/items/commands/health.js';
import './kernel/items/commands/html.js';
import './kernel/items/html/icons.js';

/* Boot */
await onetype.Middleware('boot');
onetype.Emit('boot');

/* Servers */
await import('./kernel/items/servers/http.js');

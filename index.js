import './back/env.js';

import onetype from '@onetype/framework';
import '@onetype/framework/commands';
import '@onetype/framework/database';

/* Register */
import './back/core/register/middlewares.js';
import './back/core/register/emitters.js';


/* Addons */
import '#collections/load.js';
import '#runtimes/load.js';
import '#packages/load.js';

/* Workspace */
import './addons/workspace/teams/back/load.js';
import './addons/workspace/users/back/load.js';
import './addons/workspace/projects/back/load.js';
import './addons/workspace/tokens/back/load.js';

/* Items */
import './back/items/assets/assets.js';
import './back/items/database/primary.js';
import './back/items/commands/health.js';
import './back/items/commands/crawl.js';
import './back/items/commands/run.js';
import './back/items/commands/html.js';
import './back/items/html/icons.js';

/* Boot */
await onetype.Middleware('boot');
onetype.Emit('boot');

/* Servers */
await import('./back/items/servers/http.js');

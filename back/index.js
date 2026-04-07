import './env.js';

import commands from '@onetype/framework/commands';
import database from '@onetype/framework/database';

/* Services */
import '#auth-service/load.js';
import '#elements-service/load.js';

/* Addons */
import '#sites/load.js';
import '#fonts/load.js';
import '#categories/load.js';
import '#extensions/load.js';

/* Services */
import '@onetype/framework/services/cloudflare/images';

/* Items */
import './items/assets/assets.js';
import './items/database/primary.js';
import './items/commands/health.js';
import './items/commands/crawl.js';
import './items/commands/html.js';
import './items/html/fonts.js';
import './items/html/icons.js';

/* Servers */
import './items/servers/http.js';

/* Expose */
commands.Fn('expose', 'commands:run', '/api/commands/run');

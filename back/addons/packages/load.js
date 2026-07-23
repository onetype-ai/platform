import platform from '#platform/addon.js';

import './addon.js';

import './_/schemas/manifest.js';
import './_/schemas/package.js';

import './_/emitters/enable.js';
import './_/emitters/disable.js';

import './functions/sync.js';
import './functions/load.js';
import './functions/do.save.js';
import './functions/get.scoped.js';
import './functions/exposed/one.js';
import './functions/exposed/many.js';
import './functions/exposed/limits.js';
import './functions/exposed/enable.js';
import './functions/exposed/disable.js';

import './item/functions/is.blocked.js';
import './item/functions/is.scoped.js';
import './item/functions/is.dependant.js';
import './item/functions/find.order.js';
import './item/functions/load.back.js';
import './item/functions/load.front.js';
import './item/functions/enable.js';
import './item/functions/disable.js';
import './item/catch/modified.js';

import './items/commands/many.js';
import './items/commands/one.js';
import './items/commands/enable.js';
import './items/commands/disable.js';

import './items/config/packages.js';

import './listeners/middlewares/platform.boot.js';
import './listeners/middlewares/servers.http.request.js';

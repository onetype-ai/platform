import platform from './addon.js';

import assets from '@onetype/framework/assets';
import commands from '@onetype/framework/commands';

import './functions/do.author.js';
import './functions/run.server.js';
import './functions/exposed/reload.js';

import './items/commands/reload.js';

import './_/middlewares/boot.js';
import './_/middlewares/reload.js';
import './_/emitters/boot.js';
import './_/emitters/reload.js';

import './_/assets/platform.js';

import './items/database/primary.js';
import './items/commands/health.js';
import './items/commands/html.js';
import './items/html/assets.js.js';
import './items/html/assets.css.js';
import './items/html/state.js';

import './listeners/emitters/platform.boot.js';

import './addons/config/load.js';
import './addons/runtimes/load.js';
import './addons/packages/load.js';
import './addons/users/load.js';
import './addons/tokens/load.js';

assets.Fn('get.import', ['framework'], 100);
assets.Fn('get.import', ['commands'], 200);
assets.Fn('get.import', ['database'], 300);
assets.Fn('get.import', ['elements'], 400);
assets.Fn('get.import', ['pages'], 410);
assets.Fn('get.import', ['directives'], 420);
assets.Fn('get.import', ['float'], 430);
assets.Fn('get.import', ['platform'], 500);

assets.get.commands();

commands.Fn('do.expose', 'commands:run', '/api/commands/run');

await onetype.Middleware('platform.boot');
await onetype.Emit('platform.boot');

platform.Fn('run.server');

export default platform;

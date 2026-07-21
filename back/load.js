import platform from './addon.js';

/* Functions */
import './functions/author.js';
import './functions/exposed/reload.js';

/* Commands */
import './commands/reload.js';

/* Register */
import './_/register/middlewares.js';
import './_/register/emitters.js';

/* Assets */
import './_/assets/platform.js';

/* Items */
import './items/assets/assets.js';
import './items/database/primary.js';
import './items/commands/health.js';
import './items/commands/html.js';
import './items/commands/run.js';
import './items/html/assets.js.js';
import './items/html/assets.css.js';
import './items/html/state.js';

/* Listeners */
import './listeners/boot.js';

/* Boot */
await onetype.Middleware('platform.boot');
await onetype.Emit('platform.boot');

/* Servers */
await import('./items/servers/http.js');

export default platform;

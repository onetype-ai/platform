import platform from './addon.js';

/* Functions */
import './functions/author.js';
import './functions/exposed/reload.js';

/* Commands */
import './commands/reload.js';

/* Register */
import './core/register/middlewares.js';
import './core/register/emitters.js';

/* Items */
import './items/assets/assets.js';
import './items/database/primary.js';
import './items/commands/health.js';
import './items/commands/html.js';
import './items/commands/run.js';
import './items/html/state.js';
import './items/html/icons.js';

/* Servers */
import './items/servers/http.js';

platform.Fn('author');

export default platform;

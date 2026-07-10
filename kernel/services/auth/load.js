import auth from '#auth-service/addon.js';

/* Client */
import '#auth-service/items/clients/auth.js';

/* Commands */
import '#auth-service/items/commands/me.js';

/* Listeners */
import '#auth-service/core/listeners/http.js';

export default auth;

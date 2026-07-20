import config from './addon.js';

/* Emitters */
import './core/emitters/set.js';

/* Functions */
import './functions/read.js';
import './functions/write.js';
import './functions/exposed/get.js';
import './functions/exposed/set.js';
import './functions/exposed/one.js';
import './functions/exposed/many.js';

/* Item */
import './item/functions/value.js';
import './item/catch/added.js';
import './item/catch/modified.js';
import './item/catch/removed.js';

export default config;

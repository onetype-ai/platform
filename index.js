import onetype from '@onetype/framework';
import { resolve } from 'path';

/* Framework */
import '@onetype/framework/commands';
import '@onetype/framework/pipelines';
import '@onetype/framework/canon';
import '@onetype/framework/database';
import '@onetype/framework/servers';
import '@onetype/framework/assets';
import '@onetype/framework/html';

/* Addons */
import '#config/load.js';
import '#runtimes/load.js';
import '#packages/load.js';

/* Environment */
process.loadEnvFile(resolve(process.cwd(), '.env'));

/* Strict */
onetype.strict = true;

/* Platform */
await import('#platform/load.js');

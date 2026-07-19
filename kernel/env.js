import { resolve } from 'path';

process.loadEnvFile(resolve(process.cwd(), '.env'));

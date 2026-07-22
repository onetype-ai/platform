import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const entry = fileURLToPath(new URL('./index.js', import.meta.url));

const run = () =>
{
    const child = spawn(process.execPath, [entry], { stdio: 'inherit' });

    child.on('exit', (code, signal) =>
    {
        code === 75 ? run() : process.exit(signal ? 0 : code);
    });
};

run();

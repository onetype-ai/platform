// CDP eval helper. Connects to a running Chrome (--remote-debugging-port=9222),
// evaluates JS in the page, prints the result. Captures console logs + exceptions.
//
// Usage:
//   node docs/devtools/cdp.mjs "document.title"
//   node docs/devtools/cdp.mjs --file docs/devtools/snippet.js
//   echo "1+1" | node docs/devtools/cdp.mjs -
//
// Env:
//   CDP_PORT  (default 9222)
//   CDP_MATCH (substring to pick the tab, default "localhost:3000")

import {readFileSync} from 'node:fs';

const port = process.env.CDP_PORT || '9222';
const match = process.env.CDP_MATCH || 'localhost:3000';

const arg = process.argv[2];
let expression;

if(arg === '--file')
{
	expression = readFileSync(process.argv[3], 'utf8');
}
else if(arg === '-')
{
	expression = readFileSync(0, 'utf8');
}
else
{
	expression = arg;
}

if(!expression)
{
	console.error('No expression. Pass a string, --file <path>, or - for stdin.');
	process.exit(2);
}

const targets = await fetch(`http://localhost:${port}/json`).then(response => response.json());
const page = targets.find(target => target.type === 'page' && (target.url || '').includes(match)) || targets.find(target => target.type === 'page');

if(!page)
{
	console.error(`No page target found. Tabs:\n` + targets.map(target => `  ${target.type}  ${target.url}`).join('\n'));
	process.exit(3);
}

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let id = 0;

function send(method, params)
{
	return new Promise((resolve) =>
	{
		const message = ++id;
		pending.set(message, resolve);
		socket.send(JSON.stringify({id: message, method, params}));
	});
}

socket.addEventListener('message', (event) =>
{
	const data = JSON.parse(event.data);

	if(data.id && pending.has(data.id))
	{
		pending.get(data.id)(data);
		pending.delete(data.id);
	}
	else if(data.method === 'Runtime.consoleAPICalled')
	{
		const text = data.params.args.map(arg => arg.value !== undefined ? arg.value : (arg.description || arg.type)).join(' ');
		console.log(`[console.${data.params.type}]`, text);
	}
	else if(data.method === 'Runtime.exceptionThrown')
	{
		const detail = data.params.exceptionDetails;
		console.log('[exception]', detail.exception?.description || detail.text);
	}
});

await new Promise((resolve) => socket.addEventListener('open', resolve));

await send('Runtime.enable', {});

// Always wrap in an async IIFE so top-level await and statements work.
// If the snippet has a return/statements, run it as a body; otherwise as an expression.
const body = /\breturn\b|;|\bawait\b/.test(expression) ? expression : `return (${expression});`;

const result = await send('Runtime.evaluate', {
	expression: `(async () => { ${body} })()`,
	awaitPromise: true,
	returnByValue: true,
	allowUnsafeEvalBlocklist: false
});

if(result.result?.exceptionDetails || result.result?.subtype === 'error')
{
	console.log('[eval error]', JSON.stringify(result.result, null, 2));
}
else
{
	const value = result.result?.result?.value;
	console.log(typeof value === 'string' ? value : JSON.stringify(value, null, 2));
}

// give late console logs a tick to flush
await new Promise((resolve) => setTimeout(resolve, 150));
socket.close();
process.exit(0);

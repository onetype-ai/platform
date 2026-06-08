// Capture a screenshot of the page (or a region) via CDP. Saves PNG to given path.
// Usage: node docs/devtools/screenshot.mjs <outPath> [clipX clipY clipW clipH]

import {writeFileSync} from 'node:fs';

const port = process.env.CDP_PORT || '9222';
const match = process.env.CDP_MATCH || 'localhost:3000';

const out = process.argv[2] || '/tmp/shot.png';
const clip = process.argv.length >= 7 ? {
	x: Number(process.argv[3]), y: Number(process.argv[4]),
	width: Number(process.argv[5]), height: Number(process.argv[6]), scale: 1
} : null;

const targets = await fetch(`http://localhost:${port}/json`).then(response => response.json());
const page = targets.find(target => target.type === 'page' && (target.url || '').includes(match)) || targets.find(target => target.type === 'page');

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
});

await new Promise((resolve) => socket.addEventListener('open', resolve));

const params = { format: 'png' };

if(clip)
{
	params.clip = clip;
}

const result = await send('Page.captureScreenshot', params);

writeFileSync(out, Buffer.from(result.result.data, 'base64'));
console.log('saved ' + out);

socket.close();
process.exit(0);

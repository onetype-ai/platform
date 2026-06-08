// Dispatch a REAL mouse click at (x, y) via CDP Input domain, then evaluate a probe.
// Usage: node docs/devtools/click.mjs <x> <y> [probeFile]

import {readFileSync} from 'node:fs';

const port = process.env.CDP_PORT || '9222';
const match = process.env.CDP_MATCH || 'localhost:3000';

const x = Number(process.argv[2]);
const y = Number(process.argv[3]);
const probeFile = process.argv[4];

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
	else if(data.method === 'Runtime.consoleAPICalled')
	{
		const text = data.params.args.map(arg => arg.value !== undefined ? arg.value : (arg.description || arg.type)).join(' ');
		console.log(`[console.${data.params.type}]`, text);
	}
});

await new Promise((resolve) => socket.addEventListener('open', resolve));
await send('Runtime.enable', {});

await send('Input.dispatchMouseEvent', {type: 'mouseMoved', x, y});
await send('Input.dispatchMouseEvent', {type: 'mousePressed', x, y, button: 'left', clickCount: 1});
await send('Input.dispatchMouseEvent', {type: 'mouseReleased', x, y, button: 'left', clickCount: 1});

const probe = probeFile ? readFileSync(probeFile, 'utf8') : `
const out = {};
for(const slot of document.querySelectorAll('.slot')){
  const name = (slot.getAttribute('class')||'').replace('slot','').trim();
  const r = slot.getBoundingClientRect();
  out[name] = Math.round(r.width)+'x'+Math.round(r.height);
}
return JSON.stringify(out);`;

// measure across several frames
const expression = `(async () => {
  const log = [];
  const probe = () => { ${probe} };
  for(let i=0;i<8;i++){ await new Promise(r=>requestAnimationFrame(r)); log.push('f'+i+': '+probe()); }
  await new Promise(r=>setTimeout(r,400));
  log.push('settled: '+probe());
  return JSON.stringify(log, null, 2);
})()`;

const result = await send('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true});
console.log(result.result?.result?.value || JSON.stringify(result.result, null, 2));

await new Promise((resolve) => setTimeout(resolve, 150));
socket.close();
process.exit(0);

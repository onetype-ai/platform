// Resize the viewport via CDP, then read panel position to verify it repositions.
// Usage: node docs/devtools/resize.mjs <width> <height>

const port = process.env.CDP_PORT || '9222';
const match = process.env.CDP_MATCH || 'localhost:3000';

const width = Number(process.argv[2]) || 1000;
const height = Number(process.argv[3]) || 800;

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

await send('Emulation.setDeviceMetricsOverride', {
	width, height, deviceScaleFactor: 1, mobile: false
});

const result = await send('Runtime.evaluate', {
	expression: `(() => {
		const box = document.querySelector('.e-5ea275cd .box');
		if(!box) return JSON.stringify({ panel: false, innerWidth: window.innerWidth });
		const rect = box.getBoundingClientRect();
		return JSON.stringify({ panel: true, innerWidth: window.innerWidth, x: Math.round(rect.x), w: Math.round(rect.width), rightGap: Math.round(window.innerWidth - rect.right) });
	})()`,
	returnByValue: true
});

console.log(result.result?.result?.value);

socket.close();
process.exit(0);

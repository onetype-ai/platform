import './addon.js';

const system = {};
const modules = {};
const ui = {};
const workspace = {};

$ot.system = {};
$ot.modules = {};
$ot.ui = {};
$ot.workspace = {};

$ot.boot = new Promise((resolve) =>
{
	onetype.EmitOn('modules.settings.ready', async () =>
	{
		await onetype.Middleware('boot');

		resolve();
	});
});

$ot.navigate = async ({ app = undefined, mode = undefined } = {}) =>
{
	if(app !== undefined)
	{
		await (app === null ? $ot.ui.apps.close() : $ot.ui.apps.open(app));
	}

	if(mode !== undefined)
	{
		await $ot.ui.modes.switch(mode);
	}
};

onetype.EmitOn('@error', (error) =>
{
	console.log(error);
});

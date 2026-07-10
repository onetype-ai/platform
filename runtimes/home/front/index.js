const system = {};
const modules = {};
const ui = {};

$ot.system = {};
$ot.modules = {};
$ot.ui = {};

$ot.boot = new Promise((resolve) =>
{
	onetype.EmitOn('modules.settings.ready', async () =>
	{
		await onetype.Middleware('boot');

		resolve();
	});
});

$ot.navigate = async ({ app = undefined, mode = undefined, data = undefined, project = undefined } = {}) =>
{
	if(app !== undefined)
	{
		await (app === null ? $ot.ui.apps.close() : $ot.ui.apps.open(app));
	}

	if(mode !== undefined)
	{
		await $ot.ui.modes.switch(mode);
	}

	if(data !== undefined)
	{
		await $ot.ui.layouts.data(data);
	}

	if(project !== undefined)
	{
		await (project === null ? $ot.projects.close() : $ot.projects.open(project));
	}
};

onetype.EmitOn('@error', (error) =>
{
	console.log(error);
});

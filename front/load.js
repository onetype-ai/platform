$ot.platform = {};

$ot.boot = new Promise((resolve) =>
{
	onetype.EmitOn('@document.ready', async () =>
	{
		await onetype.Middleware('boot');

		resolve();
	});
});

onetype.EmitOn('@error', (error) =>
{
	console.log(error);
});

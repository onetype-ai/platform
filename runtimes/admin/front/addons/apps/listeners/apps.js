onetype.EmitOn('ui.apps.open', () =>
{
	ui.apps.Fn('theme');
});

onetype.EmitOn('ui.apps.close', () =>
{
	ui.apps.Fn('theme');
});

$ot.boot.then(() =>
{
	ui.apps.Fn('theme');
});

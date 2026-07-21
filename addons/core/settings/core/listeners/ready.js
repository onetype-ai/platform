onetype.EmitOn('onetype.document.ready', async () =>
{
	await $ot.system.persistence.load();

	$ot.modules.settings.Fn('init');

	onetype.Emit('modules.settings.ready');
});

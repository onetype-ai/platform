ui.screens = onetype.Addon('ui.screens', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique screen id, namespaced by the addon that registers it, like auth.login.'
	});

	addon.Field('route', {
		type: 'string',
		description: 'URL path the screen lives on. Opening the screen writes it into the address bar, loading the path opens the screen.'
	});

	addon.Field('app', {
		type: 'string',
		description: 'App the screen belongs to. Opening the screen opens the app, opening another app closes the screen. Empty closes the active app while the screen is open.'
	});

	addon.Field('mode', {
		type: 'string',
		description: 'Mode the screen switches to on open. Switching to another mode closes the screen. Empty leaves modes alone.'
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		description: 'Prop schema for screen level data, merged into the global layouts data shape.'
	});

	addon.Field('metadata', {
		type: 'object',
		value: {},
		description: 'Provenance of the screen, the addon that registered it.'
	});
});

$ot.ui.screens = {
	active: () => ui.screens.Fn('active'),
	open: (id) => $ot.command('ui:screens:open', { id }),
	close: () => $ot.command('ui:screens:close', {})
};

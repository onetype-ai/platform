ui.screens = onetype.Addon('ui.screens', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique screen id, namespaced by the addon that registers it, like auth.login.'
	});

	addon.Field('route', {
		type: 'string|array',
		each: {
			type: 'string',
			description: 'A single route pattern.'
		},
		description: 'URL patterns the screen lives on, like /developer/elements/:id. Opening the screen writes the best matching pattern into the address bar, loading a matching path opens the screen with its parameters.'
	});

	addon.Field('app', {
		type: 'string',
		description: 'App the screen belongs to. Opening the screen opens the app, opening another app closes the screen. Empty closes the active app while the screen is open.'
	});

	addon.Field('mode', {
		type: 'string',
		description: 'Mode the screen switches to on open. Switching modes opens the sibling screen of the new mode, or closes the screen when the mode has none. Empty leaves modes alone.'
	});

	addon.Field('isDefault', {
		type: 'boolean',
		value: false,
		description: 'Marks the screen a mode switch opens when the mode has more than one.'
	});

	addon.Field('params', {
		type: 'object',
		value: {},
		description: 'Route parameter name to layouts data key. Parameters from the URL fill the data on open, data changes rebuild the URL.'
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
	open: (id, parameters) => $ot.command('ui:screens:open', parameters ? { id, parameters } : { id }),
	close: () => $ot.command('ui:screens:close', {})
};

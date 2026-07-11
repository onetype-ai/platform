ui.modes = onetype.Addon('ui.modes', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique mode id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position in the modes bar.'
	});

	addon.Field('condition', {
		type: 'object',
		value: {},
		config: {
			app: {
				type: 'array|boolean',
				value: [],
				each: { type: 'string' },
				description: 'App ids the mode shows in. Empty array means every app. True means any app must be active, false means only while no app is active.'
			},
			screen: {
				type: 'array',
				value: [],
				each: { type: 'string' },
				description: 'Screen ids the item shows on. Empty means every screen and the shell.'
			},
			user: {
				type: 'boolean',
				value: false,
				description: 'When true, the mode shows only while a user is logged in.'
			},
			project: {
				type: 'boolean',
				value: false,
				description: 'When true, the mode shows only while a project is active.'
			},
			permission: {
				type: 'array',
				value: [],
				each: { type: 'string' },
				description: 'Permission ids required to see the mode. Empty means no permission needed.'
			},
			callback: {
				type: 'function',
				description: 'Custom check called with the item. Return false to hide. Runs after user, project and permission pass.'
			}
		},
		description: 'Visibility rules. Empty object means the mode shows everywhere.'
	});

	addon.Field('isDefault', {
		type: 'boolean',
		value: false,
		description: 'Marks the mode the app starts in when none is saved.'
	});

	addon.Field('icon', {
		type: 'string',
		required: true,
		description: 'Material Symbols icon name.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Mode name, shown as the icon tooltip.'
	});

	addon.Field('onActivate', {
		type: 'function',
		description: 'Called with the mode item when the mode becomes active.'
	});

	addon.Field('onDeactivate', {
		type: 'function',
		description: 'Called with the mode item when another mode takes over.'
	});

	addon.Field('isActive', {
		type: 'boolean',
		value: false,
		description: 'Computed. True when this mode is the current one, the visible mode out of the active ones.'
	}, (value, item) =>
	{
		return $ot.ui.modes.active()?.Get('id') === item.Get('id');
	});
});

$ot.ui.modes = {
	active: () => ui.modes.Fn('active'),
	switch: (id) => $ot.command('ui:modes:switch', { id })
};

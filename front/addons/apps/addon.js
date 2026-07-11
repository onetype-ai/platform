ui.apps = onetype.Addon('ui.apps', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'App slug, used as the launcher id. Stable text key like builder or collections.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'App name, shown as the icon tooltip.'
	});

	addon.Field('icon', {
		type: 'string',
		required: true,
		description: 'Material Symbols icon name.'
	});

	addon.Field('description', {
		type: 'string',
		description: 'One line on what the app does, shown in the apps list.'
	});

	addon.Field('color', {
		type: 'string',
		description: 'Accent color of the app, a hex or rgba value. CSS variables are not allowed, the color drives the brand theme while the app is active.'
	});

	addon.Field('scheme', {
		type: 'string',
		value: 'studio',
		options: ['midnight', 'studio', 'daylight', 'eclipse'],
		description: 'Color scheme while the app is active. Midnight is dark shell with a dark workspace, studio is dark shell with a light workspace, daylight is light shell with a light workspace, eclipse is light shell with a dark workspace.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position on the rail.'
	});

	addon.Field('position', {
		type: 'string',
		value: 'top',
		options: ['top', 'bottom'],
		description: 'Rail group the app icon goes into.'
	});

	addon.Field('condition', {
		type: 'object',
		value: {},
		config: {
			mode: {
				type: 'array|boolean',
				value: [],
				each: { type: 'string' },
				description: 'Mode ids the app shows in. Empty array means every mode. True means any mode must be active, false means only while no mode is active.'
			},
			user: {
				type: 'boolean',
				value: false,
				description: 'When true, the app shows only while a user is logged in.'
			},
			project: {
				type: 'boolean',
				value: false,
				description: 'When true, the app shows only while a project is active.'
			},
			permission: {
				type: 'array',
				value: [],
				each: { type: 'string' },
				description: 'Permission ids required to see the app. Empty means no permission needed.'
			},
			callback: {
				type: 'function',
				description: 'Custom check called with the item. Return false to hide. Runs after mode, user, project and permission pass.'
			}
		},
		description: 'Visibility rules. Empty object means the app shows everywhere.'
	});

	addon.Field('isVisible', {
		type: 'boolean',
		value: true,
		description: 'Shows the app on the dock rail. When false the app still exists and can be switched to, it just has no icon.'
	});

	addon.Field('render', {
		type: 'string|function',
		description: 'Panel content. When set, clicking the app toggles a dock panel instead of switching.'
	});

	addon.Field('badge', {
		type: 'boolean|string|number',
		description: 'Small marker on the dock icon. A short label or count. True renders a plain dot.'
	});

	addon.Field('links', {
		type: 'array',
		value: [],
		each: {
			type: 'object',
			config: {
				icon: {
					type: 'string',
					value: '',
					description: 'Material Symbols icon name. Empty renders only the name.'
				},
				name: {
					type: 'string',
					required: true,
					description: 'Link text.'
				},
				onClick: {
					type: 'function',
					description: 'Called with the link on click.'
				}
			}
		},
		description: 'Quick links shown under the application in the launcher.'
	});

	addon.Field('isActive', {
		type: 'boolean',
		value: false,
		description: 'Computed. True when this app is the active one.'
	}, (value, item) =>
	{
		return $ot.ui.apps.active()?.Get('id') === item.Get('id');
	});

	addon.Field('onActivate', {
		type: 'function',
		description: 'Called with the app item when the app becomes active.'
	});

	addon.Field('onDeactivate', {
		type: 'function',
		description: 'Called with the app item when another app takes over.'
	});
});

$ot.ui.apps = {
	active: () => ui.apps.ItemGet($ot.modules.settings.get('ui.apps.active', null)),
	open: (id) => $ot.command('ui:apps:open', { id }),
	close: () => $ot.command('ui:apps:close')
};

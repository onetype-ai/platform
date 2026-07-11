ui.dock = onetype.Addon('ui.dock', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique item id.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Item name, shown as the icon tooltip.'
	});

	addon.Field('icon', {
		type: 'string',
		required: true,
		description: 'Material Symbols icon name.'
	});

	addon.Field('color', {
		type: 'string',
		description: 'Accent color used while the item is active.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position on the rail.'
	});

	addon.Field('isActive', {
		type: 'boolean|function',
		value: false,
		description: 'Whether the item is highlighted as active. A function is called with the item on every render, so the state stays live.'
	});

	addon.Field('condition', {
		type: 'object',
		value: {},
		config: {
			app: {
				type: 'array|boolean',
				value: [],
				each: { type: 'string' },
				description: 'App ids the item shows in. Empty array means every app. True means any app must be active, false means only while no app is active.'
			},
			screen: {
				type: 'array',
				value: [],
				each: { type: 'string' },
				description: 'Screen ids the item shows on. Empty means every screen and the shell.'
			},
			mode: {
				type: 'array|boolean',
				value: [],
				each: { type: 'string' },
				description: 'Mode ids the item shows in. Empty array means every mode. True means any mode must be active, false means only while no mode is active.'
			},
			user: {
				type: 'boolean',
				value: false,
				description: 'When true, the item shows only while a user is logged in.'
			},
			project: {
				type: 'boolean',
				value: false,
				description: 'When true, the item shows only while a project is active.'
			},
			permission: {
				type: 'array',
				value: [],
				each: { type: 'string' },
				description: 'Permission ids required to see the item. Empty means no permission needed.'
			},
			callback: {
				type: 'function',
				description: 'Custom check called with the item. Return false to hide. Runs after mode, user, project and permission pass.'
			}
		},
		description: 'Visibility rules. Empty object means the item shows everywhere.'
	});

	addon.Field('position', {
		type: 'string',
		value: 'top',
		options: ['top', 'bottom'],
		description: 'Rail group the icon goes into.'
	});

	addon.Field('onClick', {
		type: 'function',
		description: 'Called with the item on click.'
	});

	addon.Field('render', {
		type: 'string|function',
		description: 'Content shown to the right of the rail while this item is open. When set, clicking the item opens or closes it instead of running click.'
	});

	addon.Field('panel', {
		type: 'object',
		value: {},
		config: {
			title: {
				type: 'string',
				value: '',
				description: 'Panel heading. Empty hides it.'
			},
			description: {
				type: 'string',
				value: '',
				description: 'One line under the title. Empty hides it.'
			},
			actions: {
				type: 'array',
				value: [],
				each: {
					type: 'object',
					config: {
						icon: {
							type: 'string',
							required: true,
							description: 'Material Symbols icon name.'
						},
						tooltip: {
							type: 'string',
							value: '',
							description: 'Tooltip text. Empty renders no tooltip.'
						},
						onClick: {
							type: 'function',
							description: 'Called with the action on click.'
						}
					}
				},
				description: 'Icon buttons in the panel header.'
			},
			close: {
				type: 'boolean',
				value: false,
				description: 'Shows the close button in the panel header.'
			}
		},
		description: 'Chrome of the open panel. Empty object renders a bare panel, the header appears only while title, description, actions or close are set.'
	});

	addon.Field('badge', {
		type: 'boolean|string|number',
		description: 'Small marker on the icon. A short label or count. True renders a plain dot.'
	});

	addon.Field('isOpen', {
		type: 'boolean',
		value: false,
		description: 'Computed. True when this item is the one open on the rail. Reads and writes through the persisted ui.dock.open setting.'
	},
	(value, item) => $ot.modules.settings.get('ui.dock.open', null) === item.Get('id'),
	(value, previous, item) =>
	{
		$ot.modules.settings.set('ui.dock.open', value ? item.Get('id') : null);

		return value;
	});
});

$ot.ui.dock = {
	open: (id) => $ot.command('ui:dock:open', { id }),
	close: () => $ot.command('ui:dock:close')
};

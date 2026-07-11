ui.layouts = onetype.Addon('ui.layouts', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique item id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position inside the slot.'
	});

	addon.Field('isActive', {
		type: 'boolean',
		value: false,
		description: 'Whether the item is open. Toggled through the ui:layouts:open and ui:layouts:close commands.'
	});

	addon.Field('condition', {
		type: 'object',
		value: {},
		config: {
			app: {
				type: 'array',
				value: [],
				each: { type: 'string' },
				description: 'App ids the item belongs to. Empty means every app. The primary filter, everything keys off the active app.'
			},
			mode: {
				type: 'array',
				value: [],
				each: { type: 'string' },
				description: 'Mode ids the item belongs to. Empty means every mode.'
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
		description: 'Visibility rules on top of the app filter. Empty object means no extra rules.'
	});

	addon.Field('screen', {
		type: 'array',
		value: [],
		each: {
			type: 'string',
			description: 'A screen id the item belongs to.'
		},
		description: 'Screens the item shows on. Empty means every screen and the shell, like the app condition.'
	});

	addon.Field('zone', {
		type: 'string',
		value: 'root',
		description: 'Layout instance the item renders into. Nested layouts declare their own zone.'
	});

	addon.Field('slot', {
		type: 'string',
		required: true,
		options: ['top', 'bottom', 'left', 'right', 'center'],
		description: 'Slot of the layout the item goes into.'
	});

	addon.Field('config', {
		type: 'object',
		value: {},
		description: 'Prop schema for the render. Merged with every other item config into one global data shape, validated and shared across all renders.'
	});

	addon.Field('render', {
		type: 'string|function',
		required: true,
		description: 'Content of the item, an HTML string or a render function.'
	});
});

$ot.ui.layouts = {
	open: (id, data) => $ot.command('ui:layouts:open', data ? { id, data } : { id }),
	close: (id) => $ot.command('ui:layouts:close', { id }),
	toggle: (id, data) => $ot.command('ui:layouts:toggle', data ? { id, data } : { id }),
	data: (values) => $ot.command('ui:layouts:data', { values })
};

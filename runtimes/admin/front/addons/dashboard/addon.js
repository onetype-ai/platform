ui.dashboard = onetype.Addon('ui.dashboard', (addon) =>
{
	addon.sections = onetype.Addon('ui.dashboard.sections', (addon) =>
	{
		addon.Field('id', {
			type: 'string',
			required: true,
			description: 'Unique section id. Widgets join a section through their section field.'
		});

		addon.Field('title', {
			type: 'string',
			description: 'Section heading shown above its widgets. Empty renders the widgets without a heading.'
		});

		addon.Field('description', {
			type: 'string',
			description: 'One line under the section title.'
		});

		addon.Field('icon', {
			type: 'string',
			description: 'Material Symbols icon name shown next to the title.'
		});

		addon.Field('color', {
			type: 'string',
			options: ['brand', 'blue', 'red', 'orange', 'green'],
			description: 'Accent color of the section heading. Empty keeps it neutral.'
		});

		addon.Field('background', {
			type: 'number',
			description: 'Background depth from 1 to 3. When set, the whole section renders as its own bordered panel with the heading and widgets inside. Empty keeps the section flat, just a heading above the grid.'
		});

		addon.Field('order', {
			type: 'number',
			value: 1,
			description: 'Sort position of the section on the board, lower first.'
		});

		addon.Field('condition', {
			type: 'object',
			value: {},
			config: {
				app: {
					type: 'array|boolean',
					value: [],
					each: { type: 'string' },
					description: 'App ids the section shows in. Empty array means every app. True means any app must be active, false means only while no app is active.'
				},
				mode: {
					type: 'array|boolean',
					value: [],
					each: { type: 'string' },
					description: 'Mode ids the section shows in. Empty array means every mode. True means any mode must be active, false means only while no mode is active.'
				},
				user: {
					type: 'boolean',
					value: false,
					description: 'When true, the section shows only while a user is logged in.'
				},
				permission: {
					type: 'array',
					value: [],
					each: { type: 'string' },
					description: 'Permission ids required to see the section. Empty means no permission needed.'
				},
				callback: {
					type: 'function',
					description: 'Custom check called with the section item. Return false to hide. Runs after mode, user and permission pass.'
				}
			},
			description: 'Visibility rules. Empty object means the section shows everywhere its widgets do.'
		});
	});

	addon.widgets = onetype.Addon('ui.dashboard.widgets', (addon) =>
	{
		addon.Field('id', {
			type: 'string',
			required: true,
			description: 'Unique widget id.'
		});

		addon.Field('title', {
			type: 'string',
			description: 'Widget heading shown in the card header.'
		});

		addon.Field('description', {
			type: 'string',
			description: 'One line under the title, for context or the current range.'
		});

		addon.Field('icon', {
			type: 'string',
			description: 'Material Symbols icon name shown in the card header.'
		});

		addon.Field('color', {
			type: 'string',
			options: ['brand', 'blue', 'red', 'orange', 'green'],
			description: 'Accent color of the widget, drives the icon, deltas and chart strokes. Empty keeps it neutral.'
		});

		addon.Field('type', {
			type: 'string',
			required: true,
			description: 'What the widget renders as. Matches the id of a registered ui.dashboard.types item. Third parties register new types, the shipped ones are numbers, line, bar, list, donut, table, actions, gauge, progress, status and timeline.'
		});

		addon.Field('section', {
			type: 'string',
			description: 'ID of the section the widget belongs to. Empty places it in the default ungrouped area.'
		});

		addon.Field('span', {
			type: 'number',
			value: 4,
			description: 'Width of the widget in grid columns, from 1 to 12. The board is a 12 column grid.'
		});

		addon.Field('height', {
			type: 'number',
			description: 'Fixed body height in pixels. Empty lets the widget size to its content.'
		});

		addon.Field('order', {
			type: 'number',
			value: 1,
			description: 'Sort position inside the section, lower first.'
		});

		addon.Field('refresh', {
			type: 'number',
			description: 'Seconds between automatic data refreshes. Empty means the data is resolved once and never polled.'
		});

		addon.Field('condition', {
			type: 'object',
			value: {},
			config: {
				app: {
					type: 'array|boolean',
					value: [],
					each: { type: 'string' },
					description: 'App ids the widget shows in. Empty array means every app. True means any app must be active, false means only while no app is active.'
				},
				mode: {
					type: 'array|boolean',
					value: [],
					each: { type: 'string' },
					description: 'Mode ids the widget shows in. Empty array means every mode. True means any mode must be active, false means only while no mode is active.'
				},
				user: {
					type: 'boolean',
					value: false,
					description: 'When true, the widget shows only while a user is logged in.'
				},
				permission: {
					type: 'array',
					value: [],
					each: { type: 'string' },
					description: 'Permission ids required to see the widget. Empty means no permission needed.'
				},
				callback: {
					type: 'function',
					description: 'Custom check called with the widget item. Return false to hide. Runs after mode, user and permission pass.'
				}
			},
			description: 'Visibility rules. Empty object means the widget shows everywhere.'
		});

		addon.Field('data', {
			type: 'object|function',
			value: {},
			description: 'Widget data matching the config of its type. A function is called on every resolve and may return a promise, so it can read a command or a store. The card shows loading, error and empty states around it.'
		});
	});

	addon.types = onetype.Addon('ui.dashboard.types', (addon) =>
	{
		addon.Field('id', {
			type: 'string',
			required: true,
			description: 'Unique type id, referenced by a widget through its type field, like numbers or gauge.'
		});

		addon.Field('config', {
			type: 'object',
			value: {},
			description: 'Schema of the payload this type reads, validated and defaulted before the render runs. Same shape as an element config.'
		});

		addon.Field('render', {
			type: 'function',
			required: true,
			description: 'Render function returning the type body as an HTML string. Runs with the resolved payload and the widget color, and gets its own scoped root class like every named render.'
		});
	});
});

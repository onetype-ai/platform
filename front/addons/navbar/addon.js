ui.navbar = onetype.Addon('ui.navbar', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Unique item id.'
	});

	addon.Field('order', {
		type: 'number',
		value: 1,
		description: 'Sort position inside the area.'
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
				description: 'Custom check called with the item. Return false to hide. Runs after app, mode, user, project and permission pass.'
			}
		},
		description: 'Visibility rules. Empty object means the item shows everywhere.'
	});

	addon.Field('position', {
		type: 'string',
		required: true,
		options: ['left', 'center', 'right'],
		description: 'Area of the bar the item goes into.'
	});

	addon.Field('type', {
		type: 'string',
		value: 'default',
		options: ['default', 'separator'],
		description: 'What the item is. default renders the item, separator draws a divider.'
	});

	addon.Field('popup', {
		type: 'object',
		config: {
			type: {
				type: 'string',
				value: 'default',
				options: ['default', 'drawer', 'dropdown'],
				description: 'Surface kind. default opens a centered surface, drawer docks to a screen edge, dropdown anchors to the button.'
			},
			title: {
				type: 'string',
				description: 'Surface heading. Passing a title or description gives the surface its chrome, without both it renders bare.'
			},
			description: {
				type: 'string',
				description: 'Surface subheading below the title.'
			},
			width: {
				type: 'string',
				options: ['s', 'm', 'l'],
				description: 'Surface width preset.'
			},
			padding: {
				type: 'string',
				options: ['none', 's', 'm', 'l'],
				description: 'Surface content padding preset.'
			},
			position: {
				type: 'string|object',
				description: 'Where the surface sits. A place name like center, right, left, top or bottom for default and drawer, or an {x, y} object for dropdowns.'
			},
			offset: {
				type: 'object',
				config: {
					x: {
						type: 'number',
						value: 0,
						description: 'Horizontal offset in pixels.'
					},
					y: {
						type: 'number',
						value: 4,
						description: 'Vertical offset in pixels.'
					}
				},
				description: 'Dropdown offset from its anchor.'
			},
			backdrop: {
				type: 'number',
				description: 'Backdrop opacity between 0 and 1.'
			},
			closeable: {
				type: 'boolean',
				value: true,
				description: 'Whether clicking outside closes the surface.'
			},
			escape: {
				type: 'boolean',
				value: true,
				description: 'Whether the Escape key closes the surface.'
			},
			render: {
				type: 'string|function',
				required: true,
				description: 'Surface content.'
			},
			onOpen: {
				type: 'function',
				description: 'Called with the overlay item after the surface opens.'
			},
			onClose: {
				type: 'function',
				description: 'Called after the surface closes.'
			}
		},
		description: 'Floating surface the item opens on click. Without it the click runs onClick.'
	});

	addon.Field('icon', {
		type: 'string',
		description: 'Material Symbols icon name.'
	});

	addon.Field('name', {
		type: 'string',
		description: 'Button text.'
	});

	addon.Field('tooltip', {
		type: 'string',
		description: 'Hover tooltip, useful for icon only items.'
	});

	addon.Field('color', {
		type: 'string',
		description: 'Accent color used while the item is active.'
	});

	addon.Field('badge', {
		type: 'boolean|string|number',
		description: 'Small marker on the item. A short label or count. True renders a plain dot.'
	});

	addon.Field('isActive', {
		type: 'boolean|function',
		value: false,
		description: 'Shows the active pill on the item. A function is called with the item on every render, so the state stays live.'
	});

	addon.Field('isOpen', {
		type: 'boolean',
		value: false,
		description: 'Computed. True when this item is the one whose surface is open. Reads through the ui.navbar.open setting.'
	},
	(value, item) => $ot.modules.settings.get('ui.navbar.open', null) === item.Get('id'));

	addon.Field('onClick', {
		type: 'function',
		description: 'Called with the item on click, before the type behavior runs.'
	});

	addon.Field('render', {
		type: 'string|function',
		description: 'Inline content, how the item renders in the bar instead of the default button.'
	});
});

$ot.ui.navbar = {
	opened: () => ui.navbar.ItemGet($ot.modules.settings.get('ui.navbar.open', null)),
	open: (id) => $ot.command('ui:navbar:open', { id }),
	close: () => $ot.command('ui:navbar:close')
};

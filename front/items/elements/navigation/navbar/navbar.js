onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'navigation-navbar',
		icon: 'toolbar',
		name: 'Navbar',
		description: 'Top toolbar with left, center and right areas, logo, buttons, separators, dropdowns and popups.',
		category: 'Navigation',
		collection: 'Home',
		author: 'OneType',
		config: {
			logo: {
				type: 'string',
				value: '',
				description: 'Logo image URL. Links to /.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background of the whole bar, a depth on the bg scale. Lines and hover states follow it, nested controls sit one depth above. 0 renders transparent, without background or borders.'
			},
			items: {
				type: 'array',
				value: [
					{ id: 'projects', icon: 'stacks', label: 'Projects', active: true },
					{ id: 'docs', icon: 'menu_book', label: 'Docs' },
					{ id: 'split', type: 'separator' },
					{ id: 'search', icon: 'search', tooltip: 'Search', position: 'right' },
					{ id: 'alerts', icon: 'notifications', tooltip: 'Notifications', badge: 2, position: 'right' }
				],
				description: 'Toolbar items.',
				each: {
					type: 'object',
					config: {
						id: {
							type: 'string',
							description: 'Unique item id.'
						},
						type: {
							type: 'string',
							value: 'default',
							options: ['default', 'separator'],
							description: 'What the item is. default renders the item, separator draws a divider.'
						},
						popup: {
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
									options: ['s', 'm', 'l'],
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
							description: 'Floating surface the item opens on click. Without it the click runs the click handler.'
						},
						position: {
							type: 'string',
							value: 'left',
							options: ['left', 'center', 'right'],
							description: 'Area of the bar the item goes into.'
						},
						icon: {
							type: 'string',
							description: 'Material icon name.'
						},
						label: {
							type: 'string',
							description: 'Button text.'
						},
						tooltip: {
							type: 'string',
							description: 'Tooltip text, useful for icon only items.'
						},
						active: {
							type: 'boolean',
							value: false,
							description: 'Shows the active pill on the item.'
						},
						color: {
							type: 'string',
							value: 'var(--ot-brand)',
							description: 'Accent color used while the item is active.'
						},
						badge: {
							type: 'boolean|string|number',
							description: 'Small marker on the item. A short label or count. True renders a plain dot.'
						},
						click: {
							type: 'function',
							description: 'Called with the item on click, before the type behavior runs. Ignored on separators and dropdowns.'
						},
						render: {
							type: 'string|function',
							description: 'Inline content, how the item renders in the bar instead of the default button.'
						}
					}
				}
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.left = [];
			this.center = [];
			this.right = [];

			this.Compute(() =>
			{
				this.left = this.items.filter((item) => (item.position ? item.position : 'left') === 'left');
				this.center = this.items.filter((item) => item.position === 'center');
				this.right = this.items.filter((item) => item.position === 'right');
			});

			/* ===== HELPERS ===== */

			this.kind = (item) =>
			{
				return item.type ? item.type : 'default';
			};

			this.key = (item) =>
			{
				return item.id;
			};

			this.tooltip = (item) =>
			{
				return item.tooltip ? { text: item.tooltip, position: { x: 'center', y: 'bottom' } } : null;
			};

			this.classes = (item) =>
			{
				return 'item' + (item.active ? ' active' : '');
			};

			this.node = (item) =>
			{
				return typeof item.render === 'function' ? item.render({ background: Math.min(this.background + 1, 3) }) : item.render;
			};

			this.content = (item) =>
			{
				return typeof item.popup.render === 'function' ? item.popup.render : () => item.popup.render;
			};

			/* ===== HANDLERS ===== */

			this.click = (item) =>
			{
				item.click && item.click(item);

				if(!item.popup || (item.popup.type ? item.popup.type : 'default') === 'dropdown')
				{
					return;
				}

				const options = { ...item.popup };

				delete options.type;
				delete options.render;

				$ot.float.drawer({
					...options,
					content: this.content(item),
					position: options.position ? options.position : (item.popup.type === 'drawer' ? 'right' : 'center'),
					clean: !options.title && !options.description
				});
			};

			/* ===== RENDER ===== */

			const inner = `
				<i ot-if="item.icon">{{ item.icon }}</i>
				<span ot-if="item.label" class="label">{{ item.label }}</span>
				<span ot-if="item.badge" class="badge">{{ item.badge === true ? '' : item.badge }}</span>
			`;

			const zone = (position) => `
				<div ot-for="item in ${position}" :ot-key="key(item)" class="entry">
					<div ot-if="kind(item) === 'separator'" class="separator"></div>
					<div ot-if="kind(item) === 'default' && item.render" class="node" ot-node="node(item)"></div>
					<button :data-navbar-id="item.id" ot-if="kind(item) === 'default' && !item.render && item.popup && (item.popup.type ? item.popup.type : 'default') === 'dropdown'" :class="classes(item)" :style="'--color: ' + (item.color ? item.color : 'var(--ot-brand)')" :ot-tooltip="tooltip(item)" :ot-popup="content(item)" ot-click="click(item)">${inner}</button>
					<button :data-navbar-id="item.id" ot-if="kind(item) === 'default' && !item.render && (!item.popup || (item.popup.type ? item.popup.type : 'default') !== 'dropdown')" :class="classes(item)" :style="'--color: ' + (item.color ? item.color : 'var(--ot-brand)')" :ot-tooltip="tooltip(item)" ot-click="click(item)">${inner}</button>
				</div>
			`;

			return /* html */ `
				<div :class="'box bg-' + background">
					<div class="zone left">
						<a ot-if="logo" class="logo" href="/">
							<img :src="logo" alt="" />
						</a>
						${zone('left')}
					</div>
					<div class="zone center">${zone('center')}</div>
					<div class="zone right">${zone('right')}</div>
				</div>
			`;
		}
	});
});

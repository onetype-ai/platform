onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'navigation-dock',
		icon: 'dock_to_right',
		name: 'Dock',
		description: 'Slim icon rail with top and bottom items, separators, tooltips and a floating side panel with optional header.',
		category: 'Navigation',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ icon: 'home', label: 'Home', isActive: true },
					{ icon: 'search', label: 'Search', hint: 'Cmd K' },
					{ icon: 'database', label: 'Data', badge: 3 },
					{ icon: 'notifications', label: 'Notifications', badge: true },
					{ type: 'separator' },
					{ icon: 'extension', label: 'Packages' },
					{ icon: 'settings', label: 'Settings', placement: 'bottom' }
				],
				description: 'Rail items.',
				each: {
					type: 'object',
					config: {
						type: {
							type: 'string',
							value: 'item',
							options: ['item', 'separator'],
							description: 'Item kind. A separator renders a divider line.'
						},
						placement: {
							type: 'string',
							value: 'top',
							options: ['top', 'bottom'],
							description: 'Rail end the item sticks to.'
						},
						icon: {
							type: 'string',
							description: 'Material icon name.'
						},
						label: {
							type: 'string',
							description: 'Tooltip text.'
						},
						hint: {
							type: 'string',
							value: '',
							description: 'Shortcut hint shown next to the tooltip text, like Cmd K.'
						},
						isActive: {
							type: 'boolean',
							value: false,
							description: 'Whether the item is the active one.'
						},
						isOpen: {
							type: 'boolean',
							value: false,
							description: 'Whether the side panel of this item is open. One item at most should be open.'
						},
						isDisabled: {
							type: 'boolean',
							value: false,
							description: 'Dims the item and ignores clicks.'
						},
						color: {
							type: 'string',
							description: 'Accent color used while the item is active. Empty follows the background hover tone, so the item always matches the dock background.'
						},
						onClick: {
							type: 'function',
							description: 'Called with the item on click. Ignored when render is set.'
						},
						render: {
							type: 'string|function',
							description: 'Panel content shown to the right of the rail while this item is the open one.'
						},
						badge: {
							type: 'boolean|string|number',
							description: 'Small marker on the icon. A short label or count. Empty renders a plain dot.'
						}
					}
				}
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background of the whole rail, a depth on the bg scale. Hover and colorless active states use the matching hover tone, so they always follow the rail. 0 renders transparent, without background or borders.'
			},
			panel: {
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
						description: 'Shows the close button in the header. Escape asks the panel to close either way.'
					},
					width: {
						type: 'number',
						value: 380,
						description: 'Width of the panel in pixels.'
					},
					min: {
						type: 'number',
						value: 280,
						description: 'Minimum width the panel can be resized to.'
					},
					max: {
						type: 'number',
						value: 640,
						description: 'Maximum width the panel can be resized to.'
					},
					onResize: {
						type: 'function',
						description: 'Called with the new width in pixels once the panel resize ends.'
					},
					onClose: {
						type: 'function',
						description: 'Called when the close button or Escape asks the panel to close.'
					}
				},
				description: 'Panel sizing, chrome and behavior. The header renders only while title, description, actions or close are set.'
			}
		},
		render: function()
		{
			this.top = [];
			this.bottom = [];
			this.opened = null;

			this.Compute(() =>
			{
				this.top = this.items.filter((item) => (item.placement ? item.placement : 'top') === 'top');
				this.bottom = this.items.filter((item) => item.placement === 'bottom');
				const opened = this.items.find((item) => item.isOpen && item.render);
				this.opened = opened ? opened : null;
			});

			this.tooltip = (item) =>
			{
				if(!item.label)
				{
					return null;
				}

				return {
					text: item.hint ? item.label + '  ·  ' + item.hint : item.label,
					position: { x: 'right', y: 'center' }
				};
			};

			this.click = (item) =>
			{
				!item.isDisabled && item.onClick && item.onClick(item);
			};

			this.content = () =>
			{
				return typeof this.opened.render === 'function' ? this.opened.render(this.opened) : this.opened.render;
			};

			this.chrome = () =>
			{
				return !!(this.panel.title || this.panel.description || this.panel.actions.length || this.panel.close);
			};

			this.dismiss = (event) =>
			{
				event.key === 'Escape' && this.opened && this.panel.onClose && this.panel.onClose();
			};

			this.OnMounted(() => document.addEventListener('keydown', this.dismiss));
			this.OnDestroy(() => document.removeEventListener('keydown', this.dismiss));

			const stack = (placement) => `
				<div class="stack ${placement}">
					<div ot-for="item in ${placement}" :ot-key="item.id + ':' + item.isActive + ':' + item.isOpen">
						<div ot-if="item.type === 'separator'" class="separator"></div>
						<div ot-if="item.type !== 'separator'" :class="'item' + (item.isActive || item.isOpen ? ' active' : '') + (item.isDisabled ? ' disabled' : '') + (item.color ? '' : ' neutral')" :style="item.color ? '--color: ' + item.color : null" :ot-tooltip="tooltip(item)" ot-click="click(item)">
							<span class="indicator"></span>
							<i>{{ item.icon }}</i>
							<span ot-if="item.badge" class="badge">{{ item.badge === true ? '' : item.badge }}</span>
						</div>
					</div>
				</div>
			`;

			return /* html */ `
				<aside :class="'box bg-' + background">
					${stack('top')}
					${stack('bottom')}
					<div ot-if="opened" class="panel" :ot-resize="{ edge: ['right'], width: panel.width, min: panel.min, max: panel.max, onResize: (event) => panel.onResize && panel.onResize(event.width) }">
						<div ot-if="chrome()" class="head">
							<div class="text">
								<div ot-if="panel.title" class="title">{{ panel.title }}</div>
								<div ot-if="panel.description" class="description">{{ panel.description }}</div>
							</div>
							<div class="tools">
								<div ot-for="action in panel.actions" :ot-key="action.icon" class="tool" :ot-tooltip="action.tooltip ? { text: action.tooltip, position: { x: 'center', y: 'bottom' } } : null" ot-click="action.onClick && action.onClick(action)"><i>{{ action.icon }}</i></div>
								<div ot-if="panel.close" class="tool" ot-click="panel.onClose && panel.onClose()"><i>close</i></div>
							</div>
						</div>
						<div class="body" ot-node="content()" :ot-key="opened.id"></div>
					</div>
				</aside>
			`;
		}
	});
});

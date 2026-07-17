onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'navigation-sidebar',
		icon: 'side_navigation',
		name: 'Sidebar',
		description: 'Recursive navigation tree with sections, collapsible items, live search, item actions and badges.',
		category: 'Navigation',
		collection: 'Home',
		author: 'OneType',
		config: {
			title: {
				type: 'string',
				value: 'Documentation',
				description: 'Header title.'
			},
			subtitle: {
				type: 'string',
				description: 'Header subtitle.'
			},
			version: {
				type: 'string',
				description: 'Version pill in the header.'
			},
			search: {
				type: 'boolean',
				value: true,
				description: 'Shows the search input that filters the tree live.'
			},
			items: {
				type: 'array',
				value: [
					{ label: 'Getting started', icon: 'rocket_launch', items: [
						{ label: 'Introduction', value: 'introduction' },
						{ label: 'Installation', value: 'installation' },
						{ label: 'First package', value: 'first-package', badge: 'New' }
					] },
					{ label: 'Platform', icon: 'hub', items: [
						{ label: 'Commands', value: 'commands' },
						{ label: 'Database', value: 'database' },
						{ label: 'Runtimes', value: 'runtimes', soon: true }
					] },
					{ label: 'Changelog', value: 'changelog', icon: 'history', placement: 'bottom' }
				],
				each: {
					type: 'object',
					config: {
						icon: {
							type: 'string',
							description: 'Material icon name.'
						},
						label: {
							type: 'string',
							description: 'Item text.'
						},
						value: {
							type: 'string',
							description: 'Value sent on click. Items without a value only toggle their children.'
						},
						badge: {
							type: 'string|number',
							description: 'Badge after the label.'
						},
						count: {
							type: 'string|number',
							description: 'Count on the right. Sections without one count their children.'
						},
						placement: {
							type: 'string',
							value: 'top',
							options: ['top', 'bottom'],
							description: 'Sidebar end the root item sticks to. Read only on root items.'
						},
						soon: {
							type: 'boolean',
							description: 'Marks the item as coming soon and ignores clicks.'
						},
						disabled: {
							type: 'boolean',
							description: 'Dims the item and ignores clicks.'
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
										description: 'Tooltip text. Empty renders no tooltip.'
									},
									onClick: {
										type: 'function',
										description: 'Called with { event, action, item } on click.'
									}
								}
							},
							description: 'Icon buttons shown on the right while the item is hovered.'
						},
						items: {
							type: 'array',
							value: [],
							each: {
								type: 'object',
								description: 'Nested item, the same shape as its parent item.'
							},
							description: 'Nested children, each the same shape as this item, any depth.'
						}
					}
				},
				description: 'Tree items. Every item nests its own items through the items key, any depth. Root items with children render as sections.'
			},
			active: {
				type: 'string',
				value: 'installation',
				description: 'Active item value.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background of the sidebar, a depth on the bg scale. Lines and hover states follow it, the search input sits one depth above. 0 renders transparent, without background or borders.'
			},
			_click: {
				type: 'function',
				description: 'Called with { event, value } when an item is clicked.'
			}
		},
		render: function()
		{
			this.query = '';
			this.collapsed = {};

			const build = () =>
			{
				const query = this.query.trim().toLowerCase();

				const matches = (item) =>
				{
					return !query || String(item.label ? item.label : '').toLowerCase().includes(query);
				};

				const prune = (items) =>
				{
					return (items ? items : []).map((item) =>
					{
						if(matches(item))
						{
							return item;
						}

						const children = prune(item.items);

						return children.length ? { ...item, items: children } : null;
					}).filter(Boolean);
				};

				const count = (items) =>
				{
					return (items ? items : []).reduce((sum, item) => sum + (item.items && item.items.length ? count(item.items) : 1), 0);
				};

				const flatten = (items, depth, path, out, offset) =>
				{
					(items ? items : []).forEach((item, index) =>
					{
						const key = path + '/' + (item.value ? item.value : (item.label ? item.label : index));
						const children = item.items ? item.items : [];
						const open = this.searching || !this.collapsed[key];
						const section = !depth && !!children.length;

						out.push({
							...item,
							key,
							depth,
							open,
							section,
							indent: depth ? depth - 1 + offset : 0,
							parent: !!children.length,
							count: section && item.count == null ? count(children) : item.count,
							active: !item.soon && !item.disabled && !!item.value && item.value === this.active,
							hasActions: !!(item.actions ? item.actions : []).length
						});

						if(children.length && open)
						{
							flatten(children, depth + 1, key, out, section ? (item.icon ? 1 : 0) : offset);
						}
					});

					return out;
				};

				const prepare = (items) =>
				{
					return flatten(query ? prune(items) : items, 0, '', [], 0);
				};

				this.searching = !!query;
				this.top = prepare(this.items.filter((item) => (item.placement ? item.placement : 'top') === 'top'));
				this.bottom = prepare(this.items.filter((item) => item.placement === 'bottom'));

				this.shell = ['box', 'bg-' + this.background].join(' ');
				this.finder = Math.min(this.background + 1, 3);
				this.hasHead = !!this.title || !!this.subtitle || !!this.version || !!this.Slots.top;
				this.hasFoot = !!this.Slots.bottom;
				this.empty = this.searching && !this.top.length && !this.bottom.length;
			};

			this.Compute(build);

			this.state = (row) =>
			{
				const kind = row.section ? 'section' : 'entry';

				return kind
					+ (row.indent ? ' child child-' + row.indent : '')
					+ (row.active ? ' active' : '')
					+ (row.soon ? ' soon' : '')
					+ (row.disabled ? ' disabled' : '')
					+ (row.hasActions ? ' has-actions' : '');
			};

			this.toggle = (row) =>
			{
				this.collapsed = { ...this.collapsed, [row.key]: !this.collapsed[row.key] };
				build();
			};

			this.input = ({ value }) =>
			{
				this.query = value;
				build();
			};

			this.handle = (row, event) =>
			{
				if(row.soon || row.disabled)
				{
					return;
				}

				if(row.parent && !row.value)
				{
					return this.toggle(row);
				}

				if(this._click)
				{
					this._click({ event, value: row });
				}
			};

			this.act = (action, row, event) =>
			{
				action.onClick && action.onClick({ event, action, item: row });
			};

			const tree = (source) => /* html */ `
				<div
					ot-for="row in ${source}"
					:ot-key="row.key"
					:class="state(row)"
					:style="row.indent ? '--depth: ' + row.indent : null"
					ot-click="({ event }) => handle(row, event)"
				>
					<i ot-if="!row.section && row.parent" :class="'chev' + (row.open ? ' open' : '') + (row.icon ? ' swap' : '')" ot-click.stop="() => toggle(row)">expand_more</i>
					<i ot-if="row.icon" class="icon">{{ row.icon }}</i>
					<span class="text">{{ row.label }}</span>
					<span class="meta">
						<span ot-if="row.badge" class="badge">{{ row.badge }}</span>
						<span ot-if="row.count != null && !row.badge" class="count">{{ row.count }}</span>
						<span ot-if="row.soon" class="soon">Soon</span>
					</span>
					<span ot-if="row.hasActions" class="actions">
						<span ot-for="action in row.actions" :ot-key="action.icon" class="action" :ot-tooltip="action.tooltip ? { text: action.tooltip, position: { x: 'center', y: 'top' } } : null" ot-click.stop="({ event }) => act(action, row, event)"><i>{{ action.icon }}</i></span>
					</span>
					<span ot-if="row.section" class="action" ot-click.stop="() => toggle(row)"><i :class="'chevron' + (row.open ? ' open' : '')">expand_more</i></span>
				</div>
			`;

			return /* html */ `
				<aside :class="shell">
					<header ot-if="hasHead" class="head">
						<slot name="top"></slot>
						<div class="heading">
							<span ot-if="title" class="title">{{ title }}</span>
							<span ot-if="version" class="pill">{{ version }}</span>
						</div>
						<span ot-if="subtitle" class="caption">{{ subtitle }}</span>
					</header>

					<div ot-if="search" class="finder">
						<e-form-input icon="search" placeholder="Search..." :value="query" :clearable="true" :background="finder" :_input="input" :_change="input"></e-form-input>
					</div>

					<nav class="tree ot-scrollbar">
						${tree('top')}
						<div ot-if="empty" class="blank">No results for "{{ query }}"</div>
					</nav>

					<nav ot-if="bottom.length" class="tree bottom">${tree('bottom')}</nav>

					<footer ot-if="hasFoot" class="foot">
						<slot name="bottom"></slot>
					</footer>
				</aside>
			`;
		}
	});
});

onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'views-tree',
		icon: 'account_tree',
		name: 'Tree View',
		description: 'Hierarchy view built for thousands of nodes: collapsed lazy branches, a search that prunes the tree, badges, counts, side meta, async children and full keyboard walking.',
		category: 'Views',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ id: 'home', title: 'Home', icon: 'web', color: 'brand' },
					{ id: 'product', title: 'Product', subtitle: 'Everything the platform sells', icon: 'category', color: 'blue', children: [
						{ id: 'features', title: 'Features', icon: 'star', color: 'blue', badge: 'New' },
						{ id: 'pricing', title: 'Pricing', icon: 'sell', color: 'blue', meta: 'updated Jul 12' },
						{ id: 'changelog', title: 'Changelog', icon: 'history', color: 'blue' }
					] },
					{ id: 'blog', title: 'Blog', icon: 'article', color: 'green', children: [
						{ id: 'engineering', title: 'Engineering', icon: 'terminal', color: 'green', children: [
							{ id: 'shell', title: 'Designing the OneType shell', icon: 'draft', color: 'green' },
							{ id: 'database', title: 'One database for everything', icon: 'draft', color: 'green' }
						] },
						{ id: 'company', title: 'Company', icon: 'apartment', color: 'green', children: [
							{ id: 'marketplace', title: 'Marketplace economics', icon: 'draft', color: 'green' }
						] }
					] },
					{ id: 'docs', title: 'Docs', icon: 'menu_book', color: 'orange', children: [
						{ id: 'start', title: 'Getting started', icon: 'rocket_launch', color: 'orange' },
						{ id: 'framework', title: 'Framework', icon: 'extension', color: 'orange' },
						{ id: 'packages', title: 'Packages', icon: 'deployed_code', color: 'orange' }
					] },
					{ id: 'about', title: 'About', icon: 'info', color: 'brand' }
				],
				each: {
					type: 'object',
					description: 'A single node: id, title, optional subtitle, icon, color, badge, meta, disabled, and children as an array of the same shape or an async callback(node) resolving them.'
				},
				description: 'Nodes of the first level, nested through children.'
			},
			search: {
				type: 'boolean',
				value: true,
				description: 'Shows the search field that prunes the tree to matching branches as you type.'
			},
			placeholder: {
				type: 'string',
				value: 'Search the tree...',
				description: 'Placeholder of the search field.'
			},
			controls: {
				type: 'boolean',
				value: true,
				description: 'Shows the expand all and collapse all actions next to the search.'
			},
			counts: {
				type: 'boolean',
				value: true,
				description: 'Shows the number of descendants on every branch.'
			},
			active: {
				type: 'string',
				description: 'Id of the selected node.'
			},
			empty: {
				type: 'string',
				value: 'No entries yet.',
				description: 'Message shown while there are no nodes.'
			},
			background: {
				type: 'number',
				value: 0,
				options: [0, 1, 2, 3],
				description: 'Background depth the tree sits on. Rows highlight one step above.'
			},
			_open: {
				type: 'function',
				description: 'Called with { value } holding the node when a row is opened by click or Enter.'
			},
			_toggle: {
				type: 'function',
				description: 'Called with { value, open } when a branch expands or collapses.'
			}
		},
		render: function()
		{
			this.state = {};
			this.loaded = {};
			this.loading = {};
			this.query = '';
			this.current = this.active ? this.active : '';

			/* ===== DATA ===== */

			this.kids = (node) =>
			{
				if(Array.isArray(node.children))
				{
					return node.children;
				}

				if(typeof node.children === 'function')
				{
					return this.loaded[node.id] ? this.loaded[node.id] : [];
				}

				return [];
			};

			this.branch = (node) =>
			{
				return Array.isArray(node.children) ? node.children.length > 0 : typeof node.children === 'function';
			};

			this.total = (node) =>
			{
				const children = this.kids(node);

				return children.reduce((sum, child) => sum + 1 + this.total(child), 0);
			};

			this.matches = (node, query) =>
			{
				const own = [node.title, node.subtitle, node.badge, node.id].some((text) => text ? String(text).toLowerCase().includes(query) : false);

				return own ? true : this.kids(node).some((child) => this.matches(child, query));
			};

			this.opened = (node) =>
			{
				const query = this.query.trim().toLowerCase();

				if(query)
				{
					return this.kids(node).some((child) => this.matches(child, query));
				}

				return !!this.state[node.id];
			};

			this.rows = () =>
			{
				const query = this.query.trim().toLowerCase();
				const out = [];

				const walk = (nodes, depth) =>
				{
					for(const node of nodes)
					{
						if(query && !this.matches(node, query))
						{
							continue;
						}

						out.push({ node, depth, branch: this.branch(node), open: this.opened(node), loading: !!this.loading[node.id] });

						if(this.branch(node) && this.opened(node))
						{
							walk(this.kids(node), depth + 1);
						}
					}
				};

				walk(this.items, 0);

				return out;
			};

			/* ===== HANDLERS ===== */

			this.toggle = async (node) =>
			{
				if(!this.branch(node))
				{
					return;
				}

				if(typeof node.children === 'function' && !this.loaded[node.id])
				{
					this.loading = { ...this.loading, [node.id]: true };

					const children = await node.children(node);

					this.loaded = { ...this.loaded, [node.id]: Array.isArray(children) ? children : [] };
					this.loading = { ...this.loading, [node.id]: false };
				}

				const open = !this.state[node.id];

				this.state = { ...this.state, [node.id]: open };

				if(this._toggle)
				{
					this._toggle({ value: node, open });
				}
			};

			this.pick = (node) =>
			{
				if(node.disabled)
				{
					return;
				}

				this.current = node.id;

				if(this._open)
				{
					this._open({ value: node });
				}
			};

			this.everything = (open) =>
			{
				const state = {};

				const walk = (nodes) =>
				{
					for(const node of nodes)
					{
						if(this.branch(node))
						{
							state[node.id] = open;
							walk(this.kids(node));
						}
					}
				};

				walk(this.items);

				this.state = state;
			};

			this.type = () => ({ value }) =>
			{
				this.query = value;
			};

			this.key = () => ({ event }) =>
			{
				const list = this.rows();

				if(!list.length || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(event.key))
				{
					return;
				}

				event.preventDefault();

				const index = list.findIndex((row) => row.node.id === this.current);
				const row = index >= 0 ? list[index] : null;

				if(event.key === 'ArrowDown')
				{
					this.current = list[Math.min(index + 1, list.length - 1)].node.id;
				}
				else if(event.key === 'ArrowUp')
				{
					this.current = list[Math.max(index - 1, 0)].node.id;
				}
				else if(event.key === 'ArrowRight' && row && row.branch && !row.open)
				{
					this.toggle(row.node);
				}
				else if(event.key === 'ArrowLeft' && row && row.branch && row.open)
				{
					this.toggle(row.node);
				}
				else if(event.key === 'Enter' && row)
				{
					this.pick(row.node);
				}
			};

			/* ===== CLASSES ===== */

			this.stamp = (row) =>
			{
				const list = ['row', row.node.color ? row.node.color : 'brand'];

				if(row.node.id === this.current)
				{
					list.push('active');
				}

				if(row.node.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="'box bg-' + background" tabindex="0" ot-keydown="key()">
					<div ot-if="search || controls" class="top">
						<div ot-if="search" class="find">
							<i>search</i>
							<input type="text" :placeholder="placeholder" ot-input="type()" ot-key="tree-search" />
						</div>
						<div ot-if="controls" class="tools">
							<button :ot-tooltip="'Expand all'" ot-click="() => everything(true)"><i>unfold_more</i></button>
							<button :ot-tooltip="'Collapse all'" ot-click="() => everything(false)"><i>unfold_less</i></button>
						</div>
					</div>
					<div ot-if="!rows().length" class="void">{{ query ? 'Nothing matches.' : empty }}</div>
					<div class="rows">
						<div ot-for="row in rows()" :ot-key="row.node.id" :class="stamp(row)" :style="'padding-left: ' + (row.depth * 22 + 8) + 'px'" ot-click="() => pick(row.node)">
							<span ot-if="row.branch" :class="row.open ? 'caret turned' : 'caret'" ot-click.stop="() => toggle(row.node)"><i :class="row.loading ? 'spin' : ''">{{ row.loading ? 'progress_activity' : 'chevron_right' }}</i></span>
							<span ot-if="!row.branch" class="caret leaf"></span>
							<span ot-if="row.node.icon" class="tile"><i>{{ row.node.icon }}</i></span>
							<span class="words">
								<span class="title">{{ row.node.title }}</span>
								<span ot-if="row.node.subtitle" class="subtitle">{{ row.node.subtitle }}</span>
							</span>
							<span ot-if="row.node.badge" class="chip">{{ row.node.badge }}</span>
							<span ot-if="counts && row.branch && total(row.node)" class="count">{{ total(row.node) }}</span>
							<span ot-if="row.node.meta" class="meta">{{ row.node.meta }}</span>
						</div>
					</div>
				</div>
			`;
		}
	});
});

onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'views-tree',
		icon: 'account_tree',
		name: 'Tree View',
		description: 'Hierarchical listing view with collapsible parent entries, indent rails, tinted icons and child counts, nesting without a depth limit.',
		category: 'Views',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ id: 'home', title: 'Home', icon: 'web', color: 'brand' },
					{ id: 'product', title: 'Product', icon: 'category', color: 'blue', children: [
						{ id: 'features', title: 'Features', icon: 'star', color: 'blue' },
						{ id: 'pricing', title: 'Pricing', icon: 'sell', color: 'blue' },
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
					description: 'A single entry with id, title, icon, color, an optional badge and optional children of the same shape.'
				},
				description: 'Entries of the first level, nested through children.'
			},
			empty: {
				type: 'string',
				value: 'No entries yet.',
				description: 'Message shown while there are no entries.'
			},
			_open: {
				type: 'function',
				description: 'Called with { event, value } when an entry row is opened.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.state = {};

			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.rows = this.items.map((item) => ({
					key: item.id,
					item: item,
					title: item.title,
					icon: item.icon ? item.icon : 'description',
					color: item.color ? item.color : 'brand',
					badge: item.badge,
					children: Array.isArray(item.children) ? item.children : []
				}));
			});

			/* ===== HANDLERS ===== */

			this.shown = (row) =>
			{
				return this.state[row.key] !== false;
			};

			this.toggle = (row) =>
			{
				this.state = { ...this.state, [row.key]: !this.shown(row) };
			};

			this.open = (event, item) =>
			{
				if(this._open)
				{
					this._open({ event, value: item });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="_open ? 'box clickable' : 'box'">
					<div ot-for="row in rows" :ot-key="row.key" class="node">
						<div class="row" ot-click="({ event }) => open(event, row.item)">
							<i
								ot-if="row.children.length"
								:class="shown(row) ? 'caret turned' : 'caret'"
								ot-click.stop="() => toggle(row)"
							>chevron_right</i>
							<span ot-if="!row.children.length" class="gap"></span>
							<span :class="'lead ' + row.color"><i>{{ row.icon }}</i></span>
							<span class="title">{{ row.title }}</span>
							<span ot-if="row.badge" :class="'badge ' + row.color">{{ row.badge }}</span>
							<span ot-if="row.children.length" class="count">{{ row.children.length }}</span>
						</div>
						<div ot-if="row.children.length && shown(row)" class="children">
							<e-views-tree :items="row.children" :_open="_open"></e-views-tree>
						</div>
					</div>
					<div ot-if="!rows.length" class="empty">{{ empty }}</div>
				</div>
			`;
		}
	});
});

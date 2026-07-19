onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'views-graph',
		icon: 'graph_3',
		name: 'Graph View',
		description: 'Hierarchy drawn as a quiet wide canvas in the board language: kind-labeled cards flowing top to bottom with descriptions, detail rows, item lists and footers, wired by soft connectors.',
		category: 'Views',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ id: 'ceo', title: 'Vera Antić', subtitle: 'Chief Executive', avatar: 'VA', color: 'brand', badge: 'Lead', meta: '12 yrs', description: 'Keeps the whole company pointed at one goal and clears the road when teams collide.', tags: ['strategy', 'hiring'], children: [
						{ id: 'product', title: 'Marko Ilić', subtitle: 'Product', avatar: 'MI', color: 'blue', description: 'Turns customer noise into a roadmap people actually ship.', rows: [{ label: 'Focus', value: 'Q3 launch' }, { label: 'Squad', value: '6 people' }], children: [
							{ id: 'design', title: 'Sara Perić', subtitle: 'Design', avatar: 'SP', color: 'green', description: 'Owns the design system and the face of every screen.', list: [{ icon: 'palette', label: 'design:tokens' }, { icon: 'brush', label: 'design:review' }] },
							{ id: 'research', title: 'Ivan Simić', subtitle: 'Research', avatar: 'IS', color: 'orange', description: 'Talks to users so nobody has to guess.' }
						] },
						{ id: 'engineering', title: 'Lena Kovač', subtitle: 'Engineering', avatar: 'LK', color: 'red', description: 'Runs the platform and mobile squads, allergic to flaky builds.', list: [{ icon: 'terminal', label: 'ci:deploy' }, { icon: 'bug_report', label: 'ci:test' }] }
					] }
				],
				each: {
					type: 'object',
					description: 'A single node: id, title, subtitle, description, avatar text, color, badge as the kind label, meta, tags array, rows as { label, value }, list as { icon, label, sublabel, badge } with a listLabel caption, and children of the same shape.'
				},
				description: 'Nodes of the first level, nested through children.'
			},
			active: {
				type: 'string',
				description: 'Id of the selected node.'
			},
			empty: {
				type: 'string',
				value: 'Nothing to draw yet.',
				description: 'Message shown while there are no nodes.'
			},
			background: {
				type: 'number',
				value: 0,
				options: [0, 1, 2, 3],
				description: 'Background depth the canvas sits on. Cards sit one step above.'
			},
			_open: {
				type: 'function',
				description: 'Called with { value } holding the node when a card is opened.'
			}
		},
		render: function()
		{
			const WIDTH = 300;
			const GAP_X = 32;
			const GAP_Y = 70;
			const PAD = 24;

			this.current = this.active ? this.active : '';

			this.measure = (node) =>
			{
				let height = 34 + 42;

				if(node.description)
				{
					height = height + 42;
				}

				if(Array.isArray(node.rows) && node.rows.length)
				{
					height = height + node.rows.length * 22 + 12;
				}

				if(Array.isArray(node.list) && node.list.length)
				{
					height = height + node.list.length * 38 + 26;
				}

				if(node.avatar || (Array.isArray(node.tags) && node.tags.length))
				{
					height = height + 34;
				}

				return height + 10;
			};

			this.layout = () =>
			{
				const cards = [];
				const links = [];
				const levels = [];
				let cursor = 0;

				const walk = (node, depth, parent) =>
				{
					const children = Array.isArray(node.children) ? node.children : [];
					const card = { node, depth, x: 0, y: 0, height: this.measure(node) };

					levels[depth] = Math.max(levels[depth] ? levels[depth] : 0, card.height);
					cards.push(card);

					if(children.length)
					{
						for(const child of children)
						{
							walk(child, depth + 1, card);
						}

						const mine = cards.filter((entry) => children.includes(entry.node));

						card.x = (Math.min(...mine.map((entry) => entry.x)) + Math.max(...mine.map((entry) => entry.x))) / 2;
					}
					else
					{
						card.x = PAD + cursor * (WIDTH + GAP_X);
						cursor = cursor + 1;
					}

					if(parent)
					{
						links.push({ id: parent.node.id + '-' + node.id, child: card, parent: parent, color: node.color ? node.color : 'brand' });
					}
				};

				for(const node of this.items)
				{
					walk(node, 0, null);
				}

				const tops = [];
				let running = PAD;

				for(let depth = 0; depth < levels.length; depth++)
				{
					tops[depth] = running;
					running = running + levels[depth] + GAP_Y;
				}

				for(const card of cards)
				{
					card.y = tops[card.depth];
				}

				for(const link of links)
				{
					const x1 = link.parent.x + WIDTH / 2;
					const y1 = link.parent.y + link.parent.height;
					const x2 = link.child.x + WIDTH / 2;
					const y2 = link.child.y;
					const bend = (y2 - y1) / 2;

					link.d = 'M ' + x1 + ' ' + y1 + ' C ' + x1 + ' ' + (y1 + bend) + ', ' + x2 + ' ' + (y2 - bend) + ', ' + x2 + ' ' + y2;
					link.x1 = x1;
					link.y1 = y1;
					link.x2 = x2;
					link.y2 = y2;
				}

				const width = Math.max(...cards.map((card) => card.x)) + WIDTH + PAD;
				const height = running - GAP_Y + PAD;

				return { cards, links, width, height };
			};

			this.pick = (node) =>
			{
				this.current = node.id;

				if(this._open)
				{
					this._open({ value: node });
				}
			};

			this.stamp = (card) =>
			{
				const list = ['card', card.node.color ? card.node.color : 'brand'];

				if(card.node.id === this.current)
				{
					list.push('active');
				}

				return list.join(' ');
			};

			this.place = (card) =>
			{
				return 'left: ' + card.x + 'px; top: ' + card.y + 'px; width: ' + WIDTH + 'px; min-height: ' + card.height + 'px;';
			};

			this.frame = () =>
			{
				const { width, height } = this.layout();

				return 'width: ' + width + 'px; height: ' + height + 'px;';
			};

			return /* html */ `
				<div :class="'box bg-' + background + ' ot-scrollbar'">
					<div ot-if="!items.length" class="void">{{ empty }}</div>
					<div ot-if="items.length" class="plane" :style="frame()">
						<svg class="wires" :style="frame()">
							<path ot-for="link in layout().links" :ot-key="link.id" :class="link.color" :d="link.d"></path>
							<circle ot-for="link in layout().links" :ot-key="'dot-' + link.id" :class="link.color" :cx="link.x2" :cy="link.y2" r="3"></circle>
						</svg>
						<div ot-for="card in layout().cards" :ot-key="card.node.id" :class="stamp(card)" :style="place(card)" ot-click="() => pick(card.node)">
							<div class="head">
								<span class="dot"></span>
								<span class="kind">{{ card.node.badge ? card.node.badge : 'Node' }}</span>
								<span ot-if="card.node.meta" class="meta">{{ card.node.meta }}</span>
							</div>
							<div class="words">
								<span class="title">{{ card.node.title }}</span>
								<span ot-if="card.node.subtitle" class="subtitle">{{ card.node.subtitle }}</span>
							</div>
							<p ot-if="card.node.description" class="description">{{ card.node.description }}</p>
							<div ot-if="card.node.rows && card.node.rows.length" class="grid">
								<div ot-for="row in card.node.rows" :ot-key="row.label" class="pair">
									<span class="label">{{ row.label }}</span>
									<span class="value">{{ row.value }}</span>
								</div>
							</div>
							<div ot-if="card.node.list && card.node.list.length" class="list">
								<span class="caption">{{ card.node.listLabel ? card.node.listLabel : 'Items' }} · {{ card.node.list.length }}</span>
								<div ot-for="entry in card.node.list" :ot-key="entry.label" class="entry">
									<i ot-if="entry.icon">{{ entry.icon }}</i>
									<span class="lines">
										<span class="name">{{ entry.label }}</span>
										<span ot-if="entry.sublabel" class="sub">{{ entry.sublabel }}</span>
									</span>
									<span ot-if="entry.badge" class="mark">{{ entry.badge }}</span>
								</div>
							</div>
							<div ot-if="card.node.avatar || (card.node.tags && card.node.tags.length)" class="footer">
								<span ot-if="card.node.avatar" class="avatar" :ot-tooltip="card.node.title">{{ card.node.avatar }}</span>
								<span ot-if="card.node.tags && card.node.tags.length" class="tags">
									<span ot-for="tag in card.node.tags" :ot-key="tag" class="tag">{{ tag }}</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			`;
		}
	});
});

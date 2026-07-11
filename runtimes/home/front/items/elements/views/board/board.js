onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'views-board',
		icon: 'view_kanban',
		name: 'Board View',
		description: 'Kanban listing view with entries grouped into columns by a field, each column with a colored header, count and stacked entry cards.',
		category: 'Views',
		collection: 'Home',
		author: 'OneType',
		config: {
			field: {
				type: 'string',
				value: 'status',
				description: 'Item property the entries group by.'
			},
			columns: {
				type: 'array',
				value: [
					{ value: 'draft', label: 'Draft', color: 'orange' },
					{ value: 'review', label: 'In review', color: 'blue' },
					{ value: 'published', label: 'Published', color: 'green' },
					{ value: 'archived', label: 'Archived', color: 'red' }
				],
				each: {
					type: 'object',
					config: {
						value: {
							type: 'string',
							description: 'Field value the column collects.'
						},
						label: {
							type: 'string',
							description: 'Column header label.'
						},
						color: {
							type: 'string',
							value: 'brand',
							options: ['brand', 'blue', 'red', 'orange', 'green'],
							description: 'Column accent color.'
						}
					}
				},
				description: 'Columns left to right. Empty derives them from the values found on the items.'
			},
			items: {
				type: 'array',
				value: [
					{ id: 1, title: 'Designing the OneType shell', description: 'How the editor chrome became a quiet, floating surface.', status: 'published', author: { name: 'Dejan Tomić' }, date: 'Jul 8' },
					{ id: 2, title: 'One database for everything', description: 'Collections, entries and relations on a single store.', status: 'draft', author: { name: 'Stefan Pakić' }, date: 'Jul 6' },
					{ id: 3, title: 'Marketplace economics', description: 'What packages and templates earn on one platform.', status: 'review', author: { name: 'Mila Kovač' }, date: 'Jul 5' },
					{ id: 4, title: 'Commands as the universal API', description: 'Every action is a command an AI can drive.', status: 'published', author: { name: 'Dejan Tomić' }, date: 'Jul 2' },
					{ id: 5, title: 'Packages, not plugins', description: 'Why the platform is built from installable packages.', status: 'review', author: { name: 'Stefan Pakić' }, date: 'Jun 28' },
					{ id: 6, title: 'Automation that writes itself', description: 'Agents compose workflows from exposed commands.', status: 'draft', author: { name: 'Ana Ilić' }, date: 'Jun 24' },
					{ id: 7, title: 'The first hundred packages', description: 'A tour through the opening marketplace catalog.', status: 'archived', author: { name: 'Marko Babić' }, date: 'Jun 12' }
				],
				each: {
					type: 'object',
					description: 'A single entry with id, title, description, the group field value, author and date.'
				},
				description: 'Entries distributed into the columns.'
			},
			background: {
				type: 'number',
				value: 2,
				options: [1, 2, 3],
				description: 'Background depth of the entry cards from 1 to 3.'
			},
			_open: {
				type: 'function',
				description: 'Called with { event, value } when an entry card is opened.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			const card = (item) =>
			{
				const author = item.author && typeof item.author === 'object' ? item.author : (item.author ? { name: String(item.author) } : null);

				return {
					key: item.id,
					item: item,
					title: item.title,
					description: item.description,
					image: item.image,
					author: author ? { name: author.name, initials: author.name.split(' ').map((word) => word.charAt(0)).slice(0, 2).join(''), color: author.color ? author.color : 'brand' } : null,
					date: item.date
				};
			};

			this.Compute(() =>
			{
				const columns = this.columns.length ? this.columns : [...new Set(this.items.map((item) => String(item[this.field])))].map((value) => ({ value, label: value, color: 'brand' }));

				this.lanes = columns.map((column) =>
				{
					const entries = this.items.filter((item) => String(item[this.field]) === column.value);

					return {
						key: column.value,
						label: column.label,
						color: column.color ? column.color : 'brand',
						count: entries.length,
						cards: entries.map(card)
					};
				});
			});

			/* ===== HANDLERS ===== */

			this.open = (event, item) =>
			{
				if(this._open)
				{
					this._open({ event, value: item });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="_open ? 'box clickable ot-scrollbar' : 'box ot-scrollbar'">
					<div ot-for="lane in lanes" :ot-key="lane.key" :class="'lane ' + lane.color">
						<div class="head">
							<span class="dot"></span>
							<span class="label">{{ lane.label }}</span>
							<span class="count">{{ lane.count }}</span>
						</div>
						<div class="cards">
							<div ot-for="card in lane.cards" :ot-key="card.key" :class="'card bg-' + background" ot-click="({ event }) => open(event, card.item)">
								<img ot-if="card.image" class="cover" :src="card.image" loading="lazy" />
								<span class="title">{{ card.title }}</span>
								<span ot-if="card.description" class="description">{{ card.description }}</span>
								<span ot-if="card.author || card.date" class="footer">
									<span ot-if="card.author" :class="'avatar ' + card.author.color" :ot-tooltip="{ text: card.author.name, position: { x: 'center', y: 'top' } }">{{ card.author.initials }}</span>
									<span ot-if="card.date" class="date">{{ card.date }}</span>
								</span>
							</div>
							<div ot-if="!lane.cards.length" class="blank">Nothing here</div>
						</div>
					</div>
				</div>
			`;
		}
	});
});

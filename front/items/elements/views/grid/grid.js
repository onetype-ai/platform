onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'views-grid',
		icon: 'grid_on',
		name: 'Grid View',
		description: 'Database grid listing view with a hairline cell mesh, numbered rows, typed column headers and spreadsheet style cell selection.',
		category: 'Views',
		collection: 'Home',
		author: 'OneType',
		config: {
			fields: {
				type: 'array',
				value: [
					{ key: 'title', label: 'Title', type: 'text', width: '2fr' },
					{ key: 'status', label: 'Status', type: 'status' },
					{ key: 'author', label: 'Author', type: 'user' },
					{ key: 'tags', label: 'Tags', type: 'tags' },
					{ key: 'views', label: 'Views', type: 'number' },
					{ key: 'date', label: 'Updated', type: 'date' }
				],
				each: {
					type: 'object',
					config: {
						key: {
							type: 'string',
							description: 'Item property the column reads.'
						},
						label: {
							type: 'string',
							description: 'Column header label.'
						},
						type: {
							type: 'string',
							value: 'text',
							options: ['text', 'number', 'date', 'status', 'user', 'tags', 'image'],
							description: 'Cell renderer for the column. Status reads label and color, user reads name and color, tags reads an array of strings.'
						},
						width: {
							type: 'string',
							description: 'Grid track for the column, like 2fr or 200px. Columns default to minmax(140px, 1fr).'
						}
					}
				},
				description: 'Columns left to right.'
			},
			items: {
				type: 'array',
				value: [
					{ id: 1, title: 'Designing the OneType shell', status: { label: 'Published', color: 'green' }, author: { name: 'Dejan Tomić' }, tags: ['Design', 'Platform'], views: 4218, date: 'Jul 8, 2026' },
					{ id: 2, title: 'One database for everything', status: { label: 'Draft', color: 'orange' }, author: { name: 'Stefan Pakić' }, tags: ['Engineering'], views: 1730, date: 'Jul 6, 2026' },
					{ id: 3, title: 'Marketplace economics', status: { label: 'In review', color: 'blue' }, author: { name: 'Mila Kovač' }, tags: ['Business', 'Marketplace'], views: 2963, date: 'Jul 5, 2026' },
					{ id: 4, title: 'Commands as the universal API', status: { label: 'Published', color: 'green' }, author: { name: 'Dejan Tomić' }, tags: ['Engineering', 'AI'], views: 5127, date: 'Jul 2, 2026' },
					{ id: 5, title: 'Packages, not plugins', status: { label: 'Published', color: 'green' }, author: { name: 'Stefan Pakić' }, tags: ['Platform'], views: 3841, date: 'Jun 28, 2026' },
					{ id: 6, title: 'Automation that writes itself', status: { label: 'Draft', color: 'orange' }, author: { name: 'Ana Ilić' }, tags: ['AI'], views: 924, date: 'Jun 24, 2026' }
				],
				each: {
					type: 'object',
					description: 'A single entry keyed by the column keys, with a unique id.'
				},
				description: 'Entries top to bottom.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [1, 2, 3],
				description: 'Surface depth of the grid, 1 sits on the canvas and 3 on the deepest panel. 0 renders transparent cells straight on the canvas.'
			},
			group: {
				type: 'string',
				description: 'Item property rows group under. Rows sharing a value render below one section row, items without it fall under Other. Empty disables grouping.'
			},
			empty: {
				type: 'string',
				value: 'No entries yet.',
				description: 'Message shown while there are no entries.'
			},
			_select: {
				type: 'function',
				description: 'Called with { event, value } when a cell is selected, value holding the item and the field key.'
			},
			_open: {
				type: 'function',
				description: 'Called with { event, value } when an entry is opened through its row number.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.active = { row: null, key: null };

			this.icons = {
				text: 'notes',
				number: 'tag',
				date: 'calendar_today',
				status: 'flag',
				user: 'person',
				tags: 'sell',
				image: 'image'
			};

			/* ===== DATA ===== */

			const cell = (item, field) =>
			{
				const value = item[field.key];
				const result = { key: field.key, type: field.type, value: value == null ? '' : value };

				if(field.type === 'status')
				{
					result.label = typeof value === 'object' ? value.label : String(result.value);
					result.color = typeof value === 'object' && value.color ? value.color : 'brand';
				}

				if(field.type === 'user')
				{
					result.name = typeof value === 'object' ? value.name : String(result.value);
					result.color = typeof value === 'object' && value.color ? value.color : 'brand';
					result.initials = result.name.split(' ').map((word) => word.charAt(0)).slice(0, 2).join('');
				}

				if(field.type === 'tags')
				{
					result.shown = Array.isArray(value) ? value.slice(0, 2) : [];
					result.more = Array.isArray(value) && value.length > 2 ? value.length - 2 : 0;
				}

				return result;
			};

			this.Compute(() =>
			{
				this.rows = this.items.map((item, index) => ({
					key: item.id,
					item: item,
					number: index + 1,
					cells: this.fields.map((definition) => cell(item, definition))
				}));

				this.template = '44px ' + this.fields.map((definition) => definition.width ? definition.width : 'minmax(140px, 1fr)').join(' ');

				if(this.group)
				{
					const sections = {};

					this.rows.forEach((row) =>
					{
						const label = row.item[this.group] ? String(row.item[this.group]) : 'Other';

						if(!sections[label])
						{
							sections[label] = { label, rows: [] };
						}

						sections[label].rows.push(row);
					});

					this.sections = Object.values(sections);
				}
				else
				{
					this.sections = [{ label: '', rows: this.rows }];
				}
			});

			/* ===== HANDLERS ===== */

			this.select = (event, row, cell) =>
			{
				this.active = { row: row.key, key: cell.key };

				if(this._select)
				{
					this._select({ event, value: { item: row.item, field: cell.key } });
				}
			};

			this.open = (event, row) =>
			{
				if(this._open)
				{
					this._open({ event, value: row.item });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="'box ot-scrollbar' + (background ? ' bg-' + background : ' clear')">
					<div class="grid" :style="'grid-template-columns: ' + template">
						<div class="cell head corner">#</div>
						<div ot-for="field in fields" :ot-key="field.key" class="cell head">
							<i>{{ icons[field.type] }}</i>
							<span>{{ field.label }}</span>
						</div>
						<div ot-for="section in sections" :ot-key="section.label" class="band">
							<div ot-if="section.label" class="cell section"><span>{{ section.label }}</span><span class="count">{{ section.rows.length }}</span></div>
							<div ot-for="row in section.rows" :ot-key="row.key" class="line">
								<div :class="_open ? 'cell number openable' : 'cell number'" ot-click="({ event }) => open(event, row)">
									<span class="index">{{ row.number }}</span>
									<i class="reveal">open_in_full</i>
								</div>
								<div
									ot-for="cell in row.cells"
									:ot-key="cell.key"
									:class="'cell' + (active.row === row.key && active.key === cell.key ? ' active' : '')"
									ot-click="({ event }) => select(event, row, cell)"
								>
									<span ot-if="cell.type === 'text'" class="text">{{ cell.value }}</span>
									<span ot-if="cell.type === 'number'" class="digit">{{ cell.value }}</span>
									<span ot-if="cell.type === 'date'" class="date">{{ cell.value }}</span>
									<span ot-if="cell.type === 'status'" :class="'pill ' + cell.color"><span class="dot"></span>{{ cell.label }}</span>
									<span ot-if="cell.type === 'user'" :class="'user ' + cell.color"><span class="avatar">{{ cell.initials }}</span><span class="name">{{ cell.name }}</span></span>
									<span ot-if="cell.type === 'tags'" class="tags"><span ot-for="tag in cell.shown" :ot-key="tag" class="tag">{{ tag }}</span><span ot-if="cell.more" class="more">+{{ cell.more }}</span></span>
									<img ot-if="cell.type === 'image' && cell.value" class="thumb" :src="cell.value" />
								</div>
							</div>
						</div>
					</div>
					<div ot-if="!rows.length" class="empty">{{ empty }}</div>
				</div>
			`;
		}
	});
});

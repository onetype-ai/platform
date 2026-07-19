onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'views-table',
		icon: 'table',
		name: 'Table View',
		description: 'Listing view with typed columns: text, status pills, people, tags, dates, numbers and thumbnails, sorted by clicking a header.',
		category: 'Views',
		collection: 'Home',
		author: 'OneType',
		config: {
			fields: {
				type: 'array',
				value: [
					{ key: 'title', label: 'Title', type: 'text' },
					{ key: 'status', label: 'Status', type: 'status' },
					{ key: 'author', label: 'Author', type: 'user' },
					{ key: 'tags', label: 'Tags', type: 'tags' },
					{ key: 'date', label: 'Updated', type: 'date', align: 'right' }
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
						align: {
							type: 'string',
							value: 'left',
							options: ['left', 'right'],
							description: 'Cell alignment.'
						},
						width: {
							type: 'string',
							description: 'Grid track for the column, like 2fr or 200px. The first column defaults to minmax(0, 1fr), the rest to max-content.'
						}
					}
				},
				description: 'Columns left to right.'
			},
			items: {
				type: 'array',
				value: [
					{ id: 1, title: 'Designing the OneType shell', status: { label: 'Published', color: 'green' }, author: { name: 'Dejan Tomić' }, tags: ['Design', 'Platform'], date: 'Jul 8, 2026' },
					{ id: 2, title: 'One database for everything', status: { label: 'Draft', color: 'orange' }, author: { name: 'Stefan Pakić' }, tags: ['Engineering'], date: 'Jul 6, 2026' },
					{ id: 3, title: 'Marketplace economics', status: { label: 'In review', color: 'blue' }, author: { name: 'Mila Kovač' }, tags: ['Business', 'Marketplace'], date: 'Jul 5, 2026' },
					{ id: 4, title: 'Commands as the universal API', status: { label: 'Published', color: 'green' }, author: { name: 'Dejan Tomić' }, tags: ['Engineering', 'AI'], date: 'Jul 2, 2026' },
					{ id: 5, title: 'Packages, not plugins', status: { label: 'Published', color: 'green' }, author: { name: 'Stefan Pakić' }, tags: ['Platform'], date: 'Jun 28, 2026' },
					{ id: 6, title: 'Automation that writes itself', status: { label: 'Draft', color: 'orange' }, author: { name: 'Ana Ilić' }, tags: ['AI'], date: 'Jun 24, 2026' }
				],
				each: {
					type: 'object',
					description: 'A single entry keyed by the column keys, with a unique id.'
				},
				description: 'Entries top to bottom.'
			},
			empty: {
				type: 'string',
				value: 'No entries yet.',
				description: 'Message shown while there are no entries.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the table surface from 1 to 3. Empty renders it bare. 0 renders transparent, without background or borders.'
			},
			_open: {
				type: 'function',
				description: 'Called with { event, value } when an entry row is opened.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.sorted = { key: '', direction: 1 };

			/* ===== DATA ===== */

			const raw = (item, field) =>
			{
				const value = item[field.key];

				if(value == null)
				{
					return '';
				}

				if(field.type === 'status')
				{
					return typeof value === 'object' ? value.label : String(value);
				}

				if(field.type === 'user')
				{
					return typeof value === 'object' ? value.name : String(value);
				}

				if(field.type === 'tags')
				{
					return value.length;
				}

				if(field.type === 'number')
				{
					return Number(value);
				}

				return String(value);
			};

			const cell = (item, field) =>
			{
				const value = item[field.key];
				const result = { key: field.key, type: field.type, align: field.align, value: value == null ? '' : value };

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
					result.shown = Array.isArray(value) ? value.slice(0, 3) : [];
					result.more = Array.isArray(value) && value.length > 3 ? value.length - 3 : 0;
				}

				return result;
			};

			this.Compute(() =>
			{
				const entries = [...this.items];
				const field = this.fields.find((candidate) => candidate.key === this.sorted.key);

				if(field)
				{
					entries.sort((left, right) =>
					{
						const a = raw(left, field);
						const b = raw(right, field);

						if(typeof a === 'number' && typeof b === 'number')
						{
							return (a - b) * this.sorted.direction;
						}

						return String(a).localeCompare(String(b)) * this.sorted.direction;
					});
				}

				this.rows = entries.map((item) => ({ key: item.id, item, cells: this.fields.map((definition) => cell(item, definition)) }));
				this.template = this.fields.map((definition, index) => definition.width ? definition.width : (index === 0 ? 'minmax(0, 1fr)' : 'max-content')).join(' ');
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box'];

				if(this.background || this.background === 0)
				{
					list.push('bg-' + this.background);
				}

				if(this._open)
				{
					list.push('clickable');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.order = (field) =>
			{
				const direction = this.sorted.key === field.key ? this.sorted.direction * -1 : 1;

				this.sorted = { key: field.key, direction };
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
				<div :class="classes()">
					<div class="grid" :style="'grid-template-columns: ' + template">
						<div class="row head">
							<div
								ot-for="field in fields"
								:ot-key="field.key"
								:class="'th' + (field.align === 'right' ? ' right' : '') + (sorted.key === field.key ? ' active' : '')"
								ot-click="() => order(field)"
							>
								<span>{{ field.label }}</span>
								<i :class="sorted.key === field.key && sorted.direction === -1 ? 'flip' : ''">arrow_upward</i>
							</div>
						</div>
						<div ot-for="row in rows" :ot-key="row.key" class="row" ot-click="({ event }) => open(event, row.item)">
							<div ot-for="cell in row.cells" :ot-key="cell.key" :class="'td' + (cell.align === 'right' ? ' right' : '')">
								<span ot-if="cell.type === 'text'" class="text">{{ cell.value }}</span>
								<span ot-if="cell.type === 'number'" class="number">{{ cell.value }}</span>
								<span ot-if="cell.type === 'date'" class="date">{{ cell.value }}</span>
								<span ot-if="cell.type === 'status'" :class="'pill ' + cell.color"><span class="dot"></span>{{ cell.label }}</span>
								<span ot-if="cell.type === 'user'" :class="'user ' + cell.color"><span class="avatar">{{ cell.initials }}</span><span class="name">{{ cell.name }}</span></span>
								<span ot-if="cell.type === 'tags'" class="tags"><span ot-for="tag in cell.shown" :ot-key="tag" class="tag">{{ tag }}</span><span ot-if="cell.more" class="more">+{{ cell.more }}</span></span>
								<img ot-if="cell.type === 'image' && cell.value" class="thumb" :src="cell.value" />
							</div>
						</div>
					</div>
					<div ot-if="!rows.length" class="empty">{{ empty }}</div>
				</div>
			`;
		}
	});
});

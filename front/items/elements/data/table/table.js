onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'data-table',
		icon: 'table',
		name: 'Table',
		description: 'Clean data table with aligned columns, badge cells, click to sort headers, selection with bulk actions and endlessly nested child tables.',
		category: 'Data',
		collection: 'Home',
		author: 'OneType',
		config: {
			columns: {
				type: 'array',
				value: [
					{ key: 'build', label: 'Build' },
					{ key: 'environment', label: 'Environment' },
					{ key: 'duration', label: 'Duration', align: 'right' },
					{ key: 'status', label: 'Status', align: 'right', badge: true }
				],
				each: {
					type: 'object',
					config: {
						key: {
							type: 'string',
							description: 'Row field the column reads.'
						},
						label: {
							type: 'string',
							description: 'Header text.'
						},
						align: {
							type: 'string',
							value: 'left',
							options: ['left', 'right'],
							description: 'Cell alignment.'
						},
						badge: {
							type: 'boolean',
							value: false,
							description: 'Renders the cell as a colored pill, reading the color from the row field key plus Color.'
						},
						sortable: {
							type: 'boolean',
							value: true,
							description: 'Click on the header sorts by this column.'
						},
						width: {
							type: 'string',
							description: 'Grid track for the column, like 2fr, auto or 200px. The first column defaults to minmax(0, 1fr), the rest to auto.'
						},
						wrap: {
							type: 'boolean',
							value: false,
							description: 'Wraps long cell text into multiple lines instead of truncating it.'
						}
					}
				},
				description: 'Columns left to right.'
			},
		rows: {
				type: 'array',
				value: [
					{ build: '#214', environment: 'production', duration: '38s', status: 'live', statusColor: 'green', table: {
						columns: [
							{ key: 'step', label: 'Step' },
							{ key: 'time', label: 'Time', align: 'right' },
							{ key: 'state', label: 'State', align: 'right', badge: true }
						],
						rows: [
							{ step: 'Install packages', time: '12s', state: 'done', stateColor: 'green' },
							{ step: 'Build bundle', time: '21s', state: 'done', stateColor: 'green', table: {
								columns: [
									{ key: 'file', label: 'File' },
									{ key: 'size', label: 'Size', align: 'right' }
								],
								rows: [
									{ file: 'build.js', size: '812 kb' },
									{ file: 'build.css', size: '96 kb' }
								]
							} },
							{ step: 'Deploy to edge', time: '5s', state: 'done', stateColor: 'green' }
						]
					} },
					{ build: '#213', environment: 'preview', duration: '41s', status: 'ready', statusColor: 'blue' },
					{ build: '#212', environment: 'preview', duration: '55s', status: 'failed', statusColor: 'red', table: {
						columns: [
							{ key: 'step', label: 'Step' },
							{ key: 'time', label: 'Time', align: 'right' },
							{ key: 'state', label: 'State', align: 'right', badge: true }
						],
						rows: [
							{ step: 'Install packages', time: '14s', state: 'done', stateColor: 'green' },
							{ step: 'Build bundle', time: '41s', state: 'failed', stateColor: 'red' }
						]
					} },
					{ build: '#211', environment: 'production', duration: '36s', status: 'live', statusColor: 'green' },
					{ build: '#210', environment: 'staging', duration: '48s', status: 'ready', statusColor: 'blue' }
				],
				each: {
					type: 'object',
					description: 'A single row keyed by the column keys. An optional table key with columns and rows nests a child table under the row.'
				},
				description: 'Rows top to bottom.'
			},
			empty: {
				type: 'string',
				value: 'No data',
				description: 'Message shown while there are no rows.'
			},
			selectable: {
				type: 'boolean',
				value: false,
				description: 'Checkbox column with select all in the header.'
			},
			actions: {
				type: 'array',
				value: [
					{ icon: 'download', label: 'Export', color: 'blue' },
					{ icon: 'replay', label: 'Rebuild', color: 'orange' },
					{ icon: 'delete', label: 'Delete', color: 'red' }
				],
				each: {
					type: 'object',
					config: {
						icon: {
							type: 'string',
							description: 'Action icon.'
						},
						label: {
							type: 'string',
							description: 'Action text.'
						},
						color: {
							type: 'string',
							value: 'brand',
							options: ['brand', 'blue', 'red', 'orange', 'green'],
							description: 'Action accent color.'
						},
						onClick: {
							type: 'function',
							description: 'Called with { rows } holding the selected rows.'
						}
					}
				},
				description: 'Bulk actions shown in a floating bar while rows are selected.'
			},
			_select: {
				type: 'function',
				description: 'Called with { rows } after every selection change.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_click: {
				type: 'function',
				description: 'Called with { event, row } on row click. Makes the rows interactive.'
			}
		},
		render: function()
		{
			this.by = '';
			this.direction = 1;
			this.selected = {};
			this.expanded = {};

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box'];

				if(this.background || this.background === 0)
				{
					list.push('bg-' + this.background);
				}

				if(this._click)
				{
					list.push('clickable');
				}

				return list.join(' ');
			};

			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.nests = this.rows.some((row) => row.table);

				const lead = (this.selectable ? 'auto ' : '') + (this.nests ? 'auto ' : '');

				this.template = lead + this.columns.map((column, index) => column.width ? column.width : (index === 0 ? 'minmax(0, 1fr)' : 'auto')).join(' ');

				const rows = [...this.rows];

				if(this.by)
				{
					const direction = this.direction;

					rows.sort((first, second) =>
					{
						const a = first[this.by];
						const b = second[this.by];

						if(typeof a === 'number' && typeof b === 'number')
						{
							return (a - b) * direction;
						}

						return String(a).localeCompare(String(b), undefined, { numeric: true }) * direction;
					});
				}

				this.list = rows;
			});

			/* ===== HANDLERS ===== */

			this.sort = (column) =>
			{
				if(column.sortable === false)
				{
					return;
				}

				if(this.by === column.key)
				{
					this.direction = this.direction * -1;
					this.by = column.key;
					return;
				}

				this.direction = 1;
				this.by = column.key;
			};

			this.arrow = (column) =>
			{
				if(this.by !== column.key)
				{
					return '';
				}

				return this.direction === 1 ? 'arrow_upward' : 'arrow_downward';
			};

			this.chosen = () =>
			{
				return this.rows.filter((row, index) => this.selected[index]);
			};

			this.notify = () =>
			{
				if(this._select)
				{
					this._select({ rows: this.chosen() });
				}
			};

			this.count = () =>
			{
				return Object.values(this.selected).filter(Boolean).length;
			};

			this.mark = (row) =>
			{
				const index = this.rows.indexOf(row);

				this.selected = { ...this.selected, [index]: !this.selected[index] };
				this.notify();
			};

			this.all = () =>
			{
				const full = this.count() === this.rows.length;
				const next = {};

				this.rows.forEach((row, index) => next[index] = !full);

				this.selected = next;
				this.notify();
			};

			this.clear = () =>
			{
				this.selected = {};
				this.notify();
			};

			this.run = (action) =>
			{
				if(action.onClick)
				{
					action.onClick({ rows: this.chosen() });
				}
			};

			this.unfold = (row) =>
			{
				const index = this.rows.indexOf(row);

				this.expanded = { ...this.expanded, [index]: !this.expanded[index] };
			};

			this.opened = (row) =>
			{
				return !!this.expanded[this.rows.indexOf(row)];
			};

			this.checked = (row) =>
			{
				return !!this.selected[this.rows.indexOf(row)];
			};

			this.pick = (row, event) =>
			{
				if(this._click)
				{
					this._click({ event, row });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div class="grid" :style="'grid-template-columns: ' + template">
						<div class="row head">
							<div ot-if="nests"></div>
							<div ot-if="selectable">
								<button type="button" :class="count() && count() === rows.length ? 'check on' : (count() ? 'check some' : 'check')" ot-click="all">
									<i>{{ count() && count() === rows.length ? 'check' : (count() ? 'remove' : '') }}</i>
								</button>
							</div>
							<div ot-for="column in columns" :ot-key="column.key">
								<button type="button" :class="'th ' + column.align" ot-click="() => sort(column)">
									<span>{{ column.label }}</span>
									<i ot-if="arrow(column)">{{ arrow(column) }}</i>
								</button>
							</div>
						</div>
						<div ot-for="row in list" :ot-key="JSON.stringify(row)" :class="'row' + (checked(row) ? ' selected' : '') + (row.table && opened(row) ? ' open' : '')" ot-click="({ event }) => pick(row, event)">
							<div ot-if="nests">
								<button ot-if="row.table" type="button" :class="opened(row) ? 'fold-toggle open' : 'fold-toggle'" ot-click.stop="() => unfold(row)"><i>chevron_right</i></button>
							</div>
							<div ot-if="selectable">
								<button type="button" :class="checked(row) ? 'check on' : 'check'" ot-click.stop="() => mark(row)">
									<i ot-if="checked(row)">check</i>
								</button>
							</div>
							<div ot-for="column in columns" :ot-key="column.key">
								<div :class="'td ' + column.align + (column.wrap ? ' wrap' : '')">
									<span ot-if="!column.badge" class="value">{{ row[column.key] }}</span>
									<span ot-if="column.badge" :class="'pill ' + (row[column.key + 'Color'] ? row[column.key + 'Color'] : 'brand')">{{ row[column.key] }}</span>
								</div>
							</div>
							<div ot-if="row.table && opened(row)" class="fold">
								<e-data-table :columns="row.table.columns" :rows="row.table.rows" :selectable="false"></e-data-table>
							</div>
						</div>
					</div>
					<div ot-if="!list.length" class="empty">{{ empty }}</div>
					<div ot-if="selectable && count()" class="bulk">
						<span class="total">{{ count() }} selected</span>
						<div class="tools">
							<div ot-for="action in actions" :ot-key="action.label">
								<button type="button" :class="'tool ' + action.color" ot-click="() => run(action)">
									<i ot-if="action.icon">{{ action.icon }}</i>
									<span>{{ action.label }}</span>
								</button>
							</div>
						</div>
						<button type="button" class="dismiss" ot-click="clear"><i>close</i></button>
					</div>
				</div>
			`;
		}
	});
});

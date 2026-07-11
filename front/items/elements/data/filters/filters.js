onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'data-filters',
		icon: 'filter_alt',
		name: 'Filters',
		description: 'Filter panel with collapsible groups: search, option lists with counts, toggles, selects and dates, reporting one value object.',
		category: 'Data',
		collection: 'Home',
		author: 'OneType',
		config: {
			groups: {
				type: 'array',
				value: [
					{ id: 'query', type: 'search', placeholder: 'Search entries...' },
					{ id: 'status', label: 'Status', type: 'options', options: [
						{ value: 'published', label: 'Published', count: 3 },
						{ value: 'draft', label: 'Draft', count: 2 },
						{ value: 'review', label: 'In review', count: 1 }
					] },
					{ id: 'author', label: 'Author', type: 'options', options: [
						{ value: 'dejan', label: 'Dejan Tomić', count: 2 },
						{ value: 'stefan', label: 'Stefan Pakić', count: 2 },
						{ value: 'mila', label: 'Mila Kovač', count: 1 },
						{ value: 'ana', label: 'Ana Ilić', count: 1 }
					] },
					{ id: 'tags', label: 'Tags', type: 'options', options: [
						{ value: 'design', label: 'Design', count: 1 },
						{ value: 'engineering', label: 'Engineering', count: 2 },
						{ value: 'platform', label: 'Platform', count: 2 },
						{ value: 'ai', label: 'AI', count: 2 }
					] },
					{ id: 'cover', label: 'Only with cover', type: 'toggle' },
					{ id: 'after', label: 'Updated after', type: 'date' }
				],
				each: {
					type: 'object',
					config: {
						id: {
							type: 'string',
							description: 'Key of the group inside the value object.'
						},
						label: {
							type: 'string',
							description: 'Group label. Search groups render without one.'
						},
						type: {
							type: 'string',
							value: 'options',
							options: ['search', 'options', 'single', 'select', 'toggle', 'date'],
							description: 'Control the group renders. Options is a multi check list, single picks one value.'
						},
						options: {
							type: 'array',
							value: [],
							each: {
								type: 'object',
								config: {
									value: {
										type: 'string|number',
										description: 'Option value stored in the state.'
									},
									label: {
										type: 'string',
										description: 'Option label.'
									},
									count: {
										type: 'number',
										description: 'Matching entries shown after the label.'
									}
								}
							},
							description: 'Choices for options, single and select groups.'
						},
						placeholder: {
							type: 'string',
							description: 'Placeholder for search, select and date groups.'
						},
						collapsed: {
							type: 'boolean',
							value: false,
							description: 'Start the group collapsed.'
						}
					}
				},
				description: 'Filter groups top to bottom.'
			},
			value: {
				type: 'object',
				value: {},
				description: 'Filter state keyed by group id: strings for search, select, single and date, arrays for options, booleans for toggles.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [1, 2, 3],
				description: 'Background depth of the panel surface from 1 to 3.'
			},
			_change: {
				type: 'function',
				description: 'Called with { value } holding the whole filter state whenever any group changes.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.state = { ...this.value };
			this.closed = {};

			/* ===== DATA ===== */

			this.picked = (group) =>
			{
				const current = this.state[group.id];

				return Array.isArray(current) ? current : (current == null || current === '' ? [] : [current]);
			};

			this.count = (group) =>
			{
				if(group.type === 'toggle')
				{
					return this.state[group.id] ? 1 : 0;
				}

				return this.picked(group).length;
			};

			this.active = () =>
			{
				return this.groups.reduce((total, group) => total + (group.type === 'search' ? 0 : this.count(group)), 0);
			};

			this.shown = (group) =>
			{
				return this.closed[group.id] === undefined ? !group.collapsed : !this.closed[group.id];
			};

			/* ===== HANDLERS ===== */

			const report = () =>
			{
				if(this._change)
				{
					this._change({ value: { ...this.state } });
				}
			};

			this.assign = (group, value) =>
			{
				this.state = { ...this.state, [group.id]: value };

				report();
			};

			this.mark = (group, option) =>
			{
				const current = this.picked(group);
				const value = current.includes(option.value) ? current.filter((entry) => entry !== option.value) : (group.type === 'single' ? [option.value] : [...current, option.value]);

				this.assign(group, group.type === 'single' ? (value.length ? value[0] : '') : value);
			};

			this.fold = (group) =>
			{
				this.closed = { ...this.closed, [group.id]: this.shown(group) };
			};

			this.clear = () =>
			{
				this.state = {};

				report();
			};

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box'];

				if(this.background)
				{
					list.push('bg-' + this.background);
				}

				return list.join(' ');
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div ot-if="active()" class="bar">
						<span class="total">{{ active() }} active</span>
						<span class="reset" ot-click="clear">Clear all</span>
					</div>
					<div ot-for="group in groups" :ot-key="group.id" class="group">
						<e-form-input
							ot-if="group.type === 'search'"
							icon="search"
							:placeholder="group.placeholder ? group.placeholder : 'Search...'"
							:value="state[group.id] ? state[group.id] : ''"
							:clearable="true"
							:background="2"
							:_input="({ value }) => assign(group, value)"
						></e-form-input>
						<div ot-if="group.type !== 'search' && group.type !== 'toggle'" class="head" ot-click="() => fold(group)">
							<span class="label">{{ group.label }}</span>
							<span ot-if="count(group)" class="badge">{{ count(group) }}</span>
							<i :class="shown(group) ? 'caret turned' : 'caret'">chevron_right</i>
						</div>
						<div ot-if="group.type !== 'search' && group.type !== 'toggle' && shown(group)" class="body">
							<div ot-if="group.type === 'options' || group.type === 'single'" class="choices">
								<div
									ot-for="option in group.options"
									:ot-key="option.value"
									:class="picked(group).includes(option.value) ? 'choice checked' : 'choice'"
									ot-click="() => mark(group, option)"
								>
									<span :class="group.type === 'single' ? 'mark round' : 'mark'"><i>check</i></span>
									<span class="text">{{ option.label }}</span>
									<span ot-if="option.count != null" class="amount">{{ option.count }}</span>
								</div>
							</div>
							<e-form-select
								ot-if="group.type === 'select'"
								:options="group.options"
								:value="state[group.id] ? state[group.id] : ''"
								:placeholder="group.placeholder ? group.placeholder : 'Pick...'"
								:background="2"
								:_change="({ value }) => assign(group, value)"
							></e-form-select>
							<e-form-date
								ot-if="group.type === 'date'"
								:value="state[group.id] ? state[group.id] : ''"
								:background="2"
								:_change="({ value }) => assign(group, value)"
							></e-form-date>
						</div>
						<div ot-if="group.type === 'toggle'" class="switch">
							<span class="label">{{ group.label }}</span>
							<e-form-toggle :value="!!state[group.id]" :_change="({ value }) => assign(group, value)"></e-form-toggle>
						</div>
					</div>
				</div>
			`;
		}
	});
});

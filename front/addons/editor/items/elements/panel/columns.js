elements.ItemAdd({
	id: 'panel-columns',
	icon: 'view_column',
	name: 'Panel Columns',
	description: 'Column layout editor for a section.',
	category: 'Editor',
	author: 'OneType',
	config: {
		section: {
			type: 'object',
			value: {}
		},
		_update: {
			type: 'function'
		}
	},
	render: function()
	{
		this.columns = () =>
		{
			return this.section.columns || [{ width: 1 }];
		};

		this.total = () =>
		{
			return this.columns().reduce((sum, column) => sum + column.width, 0);
		};

		this.percent = (column) =>
		{
			return Math.round((column.width / this.total()) * 100);
		};

		this.add = () =>
		{
			const columns = [...this.columns()];

			if(columns.length >= 6)
			{
				return;
			}

			columns.push({ width: 1, elements: [] });
			this._update('columns', columns);
		};

		this.remove = (index) =>
		{
			const columns = [...this.columns()];

			if(columns.length <= 1)
			{
				return;
			}

			columns.splice(index, 1);
			this._update('columns', columns);
		};

		this.resize = (index, value) =>
		{
			const width = Math.max(1, Math.min(6, parseInt(value) || 1));
			const columns = [...this.columns()];

			columns[index] = { ...columns[index], width: width };
			this._update('columns', columns);
		};

		this.preset = (widths) =>
		{
			const existing = this.columns();
			const columns = widths.map((width, index) =>
			{
				const elements = existing[index] ? (existing[index].elements || []) : [];

				return { width: width, elements: elements };
			});

			this._update('columns', columns);
		};

		this.container = () =>
		{
			return this.section.container !== false;
		};

		this.toggleContainer = () =>
		{
			this._update('container', !this.container());
		};

		this.gap = () =>
		{
			return this.section.gap || 16;
		};

		this.changeGap = ({ value }) =>
		{
			const parsed = parseInt(value) || 0;

			this._update('gap', Math.max(0, Math.min(64, parsed)));
		};

		this.presets = [
			{ label: '1', widths: [1] },
			{ label: '1 / 1', widths: [1, 1] },
			{ label: '2 / 1', widths: [2, 1] },
			{ label: '1 / 2', widths: [1, 2] },
			{ label: '1 / 1 / 1', widths: [1, 1, 1] },
			{ label: '1 / 2 / 1', widths: [1, 2, 1] },
			{ label: '1 / 1 / 1 / 1', widths: [1, 1, 1, 1] }
		];

		return `
			<div class="holder">
				<div class="group">
					<span class="label">Layout</span>
					<div class="presets">
						<button ot-for="item in presets" class="preset" ot-click="() => preset(item.widths)">
							<div class="bars">
								<div ot-for="width in item.widths" class="bar" :style="'flex: ' + width"></div>
							</div>
						</button>
					</div>
				</div>
				<div class="group">
					<div class="row">
						<span class="label">Columns</span>
						<button ot-if="columns().length < 6" class="add" ot-click="add"><i>add</i></button>
					</div>
					<div class="columns">
						<div ot-for="column in columns()" class="column">
							<div class="info">
								<span class="index">{{ $index + 1 }}</span>
								<span class="size">{{ percent(column) }}%</span>
							</div>
							<div class="controls">
								<e-form-input :value="String(column.width)" :variant="['bg-2', 'border', 'size-s']" :_change="({ value }) => resize($index, value)"></e-form-input>
								<span class="unit">fr</span>
								<button ot-if="columns().length > 1" class="remove" ot-click="() => remove($index)"><i>close</i></button>
							</div>
						</div>
					</div>
				</div>
				<div class="group">
					<div class="row">
						<span class="label">Container</span>
						<e-form-toggle :value="container()" :variant="['bg-3', 'size-s']" :_change="toggleContainer"></e-form-toggle>
					</div>
				</div>
				<div class="group">
					<span class="label">Gap</span>
					<div class="row">
						<e-form-input :value="String(gap())" :variant="['bg-2', 'border', 'size-s']" :_change="changeGap"></e-form-input>
						<span class="unit">px</span>
					</div>
				</div>
			</div>
		`;
	}
});

elements.ItemAdd({
	id: 'editor-section',
	icon: 'view_agenda',
	name: 'Editor Section',
	description: 'A section in the editor canvas with column layout.',
	category: 'Editor',
	author: 'OneType',
	config: {
		section: {
			type: 'object',
			value: {}
		},
		selected: {
			type: 'boolean',
			value: false
		},
		active: {
			type: 'string',
			value: ''
		},
		_select: {
			type: 'function'
		},
		_update: {
			type: 'function'
		},
		_remove: {
			type: 'function'
		},
		_add: {
			type: 'function'
		},
		_choose: {
			type: 'function'
		},
		_picker: {
			type: 'function'
		}
	},
	render: function()
	{
		this.select = (event) =>
		{
			event.stopPropagation();

			if(this._select)
			{
				this._select(this.section.id);
			}
		};

		this.remove = (event) =>
		{
			event.stopPropagation();

			if(this._remove)
			{
				this._remove(this.section.id);
			}
		};

		this.add = (event) =>
		{
			event.stopPropagation();

			if(this._add)
			{
				this._add(this.section.id);
			}
		};

		this.forward = (elementId, sectionId) =>
		{
			if(this._choose)
			{
				this._choose(elementId, sectionId);
			}
		};

		this.picker = (sectionId, columnIndex) =>
		{
			if(this._picker)
			{
				this._picker(sectionId, columnIndex);
			}
		};

		this.grid = () =>
		{
			const columns = this.section.columns || [{ width: 1 }];

			return columns.map(column => 'minmax(0, ' + column.width + 'fr)').join(' ');
		};

		this.style = () =>
		{
			const section = this.section;
			const styles = [];

			styles.push('grid-template-columns: ' + this.grid());
			styles.push('gap: ' + (section.gap || 16) + 'px');

			if(section.padding)
			{
				const p = section.padding;

				styles.push('padding: ' + (p.top || 0) + 'px ' + (p.right || 0) + 'px ' + (p.bottom || 0) + 'px ' + (p.left || 0) + 'px');
			}

			if(section.background)
			{
				styles.push('background: ' + section.background);
			}

			if(section.border)
			{
				if(section.border.top)
				{
					styles.push('border-top: ' + section.border.top);
				}

				if(section.border.bottom)
				{
					styles.push('border-bottom: ' + section.border.bottom);
				}
			}

			return styles.join('; ');
		};

		this.containerStyle = () =>
		{
			const section = this.section;
			const styles = [];

			if(section.container !== false)
			{
				styles.push('max-width: 1200px');
				styles.push('margin: 0 auto');
				styles.push('width: 100%');
			}

			if(section.margin)
			{
				const m = section.margin;

				styles.push('margin-top: ' + (m.top || 0) + 'px');
				styles.push('margin-bottom: ' + (m.bottom || 0) + 'px');
			}

			return styles.join('; ');
		};

		this.cols = () =>
		{
			return this.section.columns || [{ width: 1, elements: [] }];
		};

		return `
			<div :class="'holder' + (selected ? ' selected' : '')" ot-click="select">
				<div class="actions" ot-if="selected">
					<button class="action" ot-click.stop="() => {}"><i>drag_indicator</i></button>
					<button class="action danger" ot-click="remove"><i>delete</i></button>
				</div>
				<div class="container" :style="containerStyle()">
					<div class="grid" :style="style()">
						<e-editor-column ot-for="column in cols()" :column="column" :index="$index" :sid="section.id" :active="active" :_pick="picker" :_select="forward"></e-editor-column>
					</div>
				</div>
				<div class="divider" ot-click="add">
					<div class="line"></div>
					<button class="button"><i>add</i></button>
					<div class="line"></div>
				</div>
			</div>
		`;
	}
});

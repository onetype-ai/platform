elements.ItemAdd({
	id: 'editor-column',
	icon: 'view_column',
	name: 'Editor Column',
	description: 'A column inside a section grid that renders elements as iframe previews.',
	category: 'Editor',
	author: 'OneType',
	config: {
		column: {
			type: 'object',
			value: {}
		},
		index: {
			type: 'number',
			value: 0
		},
		sid: {
			type: 'string',
			value: ''
		},
		active: {
			type: 'string',
			value: ''
		},
		_select: {
			type: 'function'
		},
		_pick: {
			type: 'function'
		}
	},
	render: function()
	{
		this.items = () =>
		{
			return this.column.elements || [];
		};

		this.empty = () =>
		{
			return this.items().length === 0;
		};

		this.open = (event) =>
		{
			event.stopPropagation();

			if(this._pick)
			{
				this._pick(this.sid, this.index);
			}
		};

		this.choose = ({ event }) =>
		{
			event.stopPropagation();

			const node = event.currentTarget;
			const id = node.getAttribute('data-id');

			if(this._select && id)
			{
				this._select(id, this.sid);
			}
		};

		this.preview = (element) =>
		{
			return 'https://preview.elements.onetype.ai/' + element.type + '?single:boolean=true';
		};

		this.label = (element) =>
		{
			return element.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
		};

		return `
			<div class="holder">
				<div ot-if="empty()" class="empty" ot-click="open">
					<i>add_circle_outline</i>
					<span>Add Element</span>
				</div>
				<div ot-if="!empty()" class="content">
					<div ot-for="element in items()" :data-id="element.id" :class="'element' + (active === element.id ? ' selected' : '')" ot-click.stop="choose">
						<div class="outline"></div>
						<iframe :src="preview(element)" class="frame" scrolling="no"></iframe>
					</div>
					<button class="add" ot-click="open">
						<i>add</i>
					</button>
				</div>
			</div>
		`;
	}
});

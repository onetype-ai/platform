elements.ItemAdd({
	id: 'panel-background',
	icon: 'format_color_fill',
	name: 'Panel Background',
	description: 'Background color controls for a section.',
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
		this.value = () =>
		{
			return this.section.background || '';
		};

		this.change = ({ value }) =>
		{
			this._update('background', value || '');
		};

		this.clear = () =>
		{
			this._update('background', '');
		};

		return `
			<div class="holder">
				<div class="group">
					<div class="row">
						<span class="label">Background</span>
						<button ot-if="value()" class="clear" ot-click="clear"><i>close</i></button>
					</div>
					<e-form-color :value="value()" :variant="['bg-2', 'border', 'size-s']" :_change="change"></e-form-color>
				</div>
			</div>
		`;
	}
});

elements.ItemAdd({
	id: 'panel-border',
	icon: 'border_top',
	name: 'Panel Border',
	description: 'Border controls for a section.',
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
		this.border = () =>
		{
			return this.section.border || { top: '', bottom: '' };
		};

		this.topEnabled = () =>
		{
			return !!this.border().top;
		};

		this.bottomEnabled = () =>
		{
			return !!this.border().bottom;
		};

		this.toggle = (side) =>
		{
			const border = { ...this.border() };

			if(border[side])
			{
				border[side] = '';
			}
			else
			{
				border[side] = '1px solid rgba(0, 0, 0, 0.1)';
			}

			this._update('border', border);
		};

		return `
			<div class="holder">
				<div class="group">
					<span class="label">Border</span>
					<div class="borders">
						<div class="border-row">
							<i>border_top</i>
							<span class="side-label">Top</span>
							<e-form-toggle :value="topEnabled()" :variant="['bg-3', 'size-s']" :_change="() => toggle('top')"></e-form-toggle>
						</div>
						<div class="border-row">
							<i>border_bottom</i>
							<span class="side-label">Bottom</span>
							<e-form-toggle :value="bottomEnabled()" :variant="['bg-3', 'size-s']" :_change="() => toggle('bottom')"></e-form-toggle>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});

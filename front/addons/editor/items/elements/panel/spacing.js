elements.ItemAdd({
	id: 'panel-spacing',
	icon: 'padding',
	name: 'Panel Spacing',
	description: 'Padding and margin controls for a section.',
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
		this.padding = () =>
		{
			return this.section.padding || { top: 40, right: 24, bottom: 40, left: 24 };
		};

		this.margin = () =>
		{
			return this.section.margin || { top: 0, bottom: 0 };
		};

		this.changePadding = (side, { value }) =>
		{
			const padding = { ...this.padding() };

			padding[side] = Math.max(0, Math.min(200, parseInt(value) || 0));
			this._update('padding', padding);
		};

		this.changeMargin = (side, { value }) =>
		{
			const margin = { ...this.margin() };

			margin[side] = Math.max(0, Math.min(200, parseInt(value) || 0));
			this._update('margin', margin);
		};

		return `
			<div class="holder">
				<div class="group">
					<span class="label">Padding</span>
					<div class="box">
						<div class="side top">
							<e-form-input :value="String(padding().top)" :variant="['bg-2', 'border', 'size-s']" :_change="(data) => changePadding('top', event, data)"></e-form-input>
						</div>
						<div class="middle">
							<div class="side left">
								<e-form-input :value="String(padding().left)" :variant="['bg-2', 'border', 'size-s']" :_change="(data) => changePadding('left', event, data)"></e-form-input>
							</div>
							<div class="center"></div>
							<div class="side right">
								<e-form-input :value="String(padding().right)" :variant="['bg-2', 'border', 'size-s']" :_change="(data) => changePadding('right', event, data)"></e-form-input>
							</div>
						</div>
						<div class="side bottom">
							<e-form-input :value="String(padding().bottom)" :variant="['bg-2', 'border', 'size-s']" :_change="(data) => changePadding('bottom', event, data)"></e-form-input>
						</div>
					</div>
				</div>
				<div class="group">
					<span class="label">Margin</span>
					<div class="margin">
						<div class="field">
							<span class="side-label">Top</span>
							<e-form-input :value="String(margin().top)" :variant="['bg-2', 'border', 'size-s']" :_change="(data) => changeMargin('top', event, data)"></e-form-input>
							<span class="unit">px</span>
						</div>
						<div class="field">
							<span class="side-label">Bottom</span>
							<e-form-input :value="String(margin().bottom)" :variant="['bg-2', 'border', 'size-s']" :_change="(data) => changeMargin('bottom', event, data)"></e-form-input>
							<span class="unit">px</span>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});

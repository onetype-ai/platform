ui.dashboard.types.Item({
	id: 'progress',
	config: {
		color: { type: 'string', value: '', description: 'Accent color name inherited from the widget.' },
		payload: {
			type: 'object',
			value: {},
			config: {
				bars: {
					type: 'array',
					value: [],
					each: {
						type: 'object',
						config: {
							label: { type: 'string', value: '', description: 'Row label.' },
							value: { type: 'string', value: '', description: 'Value readout on the right, like 12 / 32 GB.' },
							percent: { type: 'number', value: 0, description: 'Fill of the track, 0 to 100.' },
							color: { type: 'string', value: '', description: 'Bar color name. Empty uses the widget accent.' }
						}
					},
					description: 'Bars top to bottom.'
				}
			},
			description: 'Progress data.'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			this.empty = !(this.payload.bars || []).length;
			this.bars = (this.payload.bars || []).map((bar) =>
			{
				return { ...bar, color: bar.color || this.color || 'brand' };
			});
		});

		this.fill = (bar) =>
		{
			return 'width: ' + Math.min(Math.max(bar.percent, 0), 100) + '%; background: linear-gradient(90deg, var(--ot-' + bar.color + '-hover), var(--ot-' + bar.color + '))';
		};

		return `
			<div class="box">
				<div ot-if="empty" class="empty">No data</div>
				<div ot-for="bar in bars" :ot-key="bar.label" class="bar">
					<div class="head">
						<span class="label">{{ bar.label }}</span>
						<span ot-if="bar.value" class="value">{{ bar.value }}</span>
					</div>
					<div class="track">
						<div class="fill" :style="fill(bar)"></div>
					</div>
				</div>
			</div>
		`;
	}
});

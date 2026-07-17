onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'charts-bar',
		icon: 'bar_chart',
		name: 'Bar',
		description: 'Vertical bar chart with per-bar colors, values above the bars and labels below.',
		category: 'Charts',
		collection: 'Home',
		author: 'OneType',
		config: {
			bars: {
				type: 'array',
				value: [
					{ label: 'Starter', value: 412, color: 'blue' },
					{ label: 'Pro', value: 268, color: 'green' },
					{ label: 'Business', value: 94, color: 'orange' }
				],
				each: {
					type: 'object',
					config: {
						label: {
							type: 'string',
							description: 'Category label under the bar.'
						},
						value: {
							type: 'number',
							value: 0,
							description: 'Bar value, scaled against the largest bar.'
						},
						color: {
							type: 'string',
							value: 'brand',
							options: ['brand', 'blue', 'red', 'orange', 'green'],
							description: 'Bar color name.'
						}
					}
				},
				description: 'Bars to draw, left to right.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth from 1 to 3, renders the chart on its own bordered surface. 0 renders transparent, without background or borders.'
			},
			glow: {
				type: 'string',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Colored glow on top of the surface. Empty renders no glow.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box'];

				if(this.background || this.background === 0)
				{
					list.push('bg-' + this.background);
				}

				return list.join(' ');
			};

			/* ===== DATA ===== */

			this.Compute(() =>
			{
				const bars = this.bars;
				const max = Math.max(...bars.map((bar) => bar.value), 1);

				this.empty = !bars.length;

				this.columns = bars.map((bar) =>
				{
					return {
						label: bar.label,
						value: bar.value,
						color: bar.color,
						height: Math.max((bar.value / max) * 100, 2)
					};
				});
			});

			/* ===== HANDLERS ===== */

			this.style = (bar) =>
			{
				return 'height: ' + bar.height + '%; background: linear-gradient(180deg, var(--ot-' + bar.color + ') 0%, var(--ot-' + bar.color + '-hover) 100%)';
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div ot-if="empty" class="empty">No data</div>
					<div ot-if="!empty" class="bars">
						<div ot-for="bar in columns" :ot-key="bar.label" class="col">
							<div class="track">
								<span class="value">{{ bar.value }}</span>
								<div class="bar" :style="style(bar)"></div>
							</div>
							<span class="label">{{ bar.label }}</span>
						</div>
					</div>
				</div>
			`;
		}
	});
});

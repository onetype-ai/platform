onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'charts-donut',
		icon: 'donut_small',
		name: 'Donut',
		description: 'Donut chart with a center total, caption and a legend with per-segment values.',
		category: 'Charts',
		collection: 'Home',
		author: 'OneType',
		config: {
			label: {
				type: 'string',
				value: 'visits',
				description: 'Caption under the center total.'
			},
			segments: {
				type: 'array',
				value: [
					{ name: 'Organic', value: 54, color: 'green' },
					{ name: 'Direct', value: 28, color: 'blue' },
					{ name: 'Social', value: 18, color: 'orange' }
				],
				each: {
					type: 'object',
					config: {
						name: {
							type: 'string',
							description: 'Segment name in the legend.'
						},
						value: {
							type: 'number',
							value: 0,
							description: 'Segment value, summed into the total.'
						},
						color: {
							type: 'string',
							options: ['brand', 'blue', 'red', 'orange', 'green'],
							description: 'Segment color name. Empty picks from the palette.'
						}
					}
				},
				description: 'Segments of the ring.'
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
			const palette = ['brand', 'blue', 'green', 'orange', 'red'];
			const radius = 42;
			const circumference = 2 * Math.PI * radius;

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
				const segments = this.segments.filter((segment) => segment.value > 0);
				const total = segments.reduce((sum, segment) => sum + segment.value, 0);

				this.empty = !total;
				this.total = total;

				let offset = 0;

				this.arcs = segments.map((segment, index) =>
				{
					const fraction = segment.value / total;
					const length = fraction * circumference;
					const arc = {
						name: segment.name,
						value: segment.value,
						color: segment.color ? segment.color : palette[index % palette.length],
						dash: length + ' ' + (circumference - length),
						shift: -offset
					};

					offset += length;

					return arc;
				});
			});

			/* ===== HANDLERS ===== */

			this.ring = (arc) =>
			{
				return 'stroke: var(--ot-' + arc.color + '); stroke-dasharray: ' + arc.dash + '; stroke-dashoffset: ' + arc.shift;
			};

			this.dot = (arc) =>
			{
				return 'background: var(--ot-' + arc.color + ')';
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div ot-if="empty" class="empty">No data</div>
					<div ot-if="!empty" class="chart">
						<div class="ring">
							<svg viewBox="0 0 100 100">
								<circle class="track" cx="50" cy="50" r="42"></circle>
								<circle ot-for="arc in arcs" :ot-key="arc.name" class="arc" cx="50" cy="50" r="42" :style="ring(arc)"></circle>
							</svg>
							<div class="center">
								<span class="total">{{ total }}</span>
								<span ot-if="label" class="caption">{{ label }}</span>
							</div>
						</div>
						<div class="legend">
							<span ot-for="arc in arcs" :ot-key="'k' + arc.name" class="key">
								<span class="dot" :style="dot(arc)"></span>
								<span class="name">{{ arc.name }}</span>
								<span class="value">{{ arc.value }}</span>
							</span>
						</div>
					</div>
				</div>
			`;
		}
	});
});

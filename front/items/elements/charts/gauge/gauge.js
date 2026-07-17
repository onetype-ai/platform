onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'charts-gauge',
		icon: 'speed',
		name: 'Gauge',
		description: 'Half circle gauge with a value arc, center display and a muted caption.',
		category: 'Charts',
		collection: 'Home',
		author: 'OneType',
		config: {
			value: {
				type: 'number',
				value: 68,
				description: 'Current value.'
			},
			min: {
				type: 'number',
				value: 0,
				description: 'Range start.'
			},
			max: {
				type: 'number',
				value: 100,
				description: 'Range end.'
			},
			display: {
				type: 'string',
				value: '68%',
				description: 'Text shown in the center. Empty shows the value.'
			},
			caption: {
				type: 'string',
				value: 'Utilization',
				description: 'Muted caption under the value.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Arc color.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth from 1 to 3, renders the gauge on its own bordered surface. 0 renders transparent, without background or borders.'
			},
			glow: {
				type: 'string',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Colored glow on top of the surface. Empty renders no glow.'
			}
		},
		render: function()
		{
			const radius = 54;
			const length = Math.PI * radius;

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
				const value = Math.min(Math.max(this.value, this.min), this.max);
				const fraction = this.max > this.min ? (value - this.min) / (this.max - this.min) : 0;
				this.shown = this.display ? this.display : String(this.value);
				this.dash = (fraction * length) + ' ' + length;
			});

			/* ===== HANDLERS ===== */

			this.arc = () =>
			{
				return 'stroke: var(--ot-' + this.color + '); stroke-dasharray: ' + this.dash;
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div class="gauge">
						<svg viewBox="0 0 120 66">
							<path class="track" d="M6 60 A54 54 0 0 1 114 60"></path>
							<path class="fill" d="M6 60 A54 54 0 0 1 114 60" :style="arc()"></path>
						</svg>
						<div class="center">
							<span class="value">{{ shown }}</span>
							<span ot-if="caption" class="caption">{{ caption }}</span>
						</div>
					</div>
				</div>
			`;
		}
	});
});

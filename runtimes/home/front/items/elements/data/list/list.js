onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'data-list',
		icon: 'list',
		name: 'List',
		description: 'Ranked list with icons, labels, trailing values, an optional progress fill behind each row and row clicks.',
		category: 'Data',
		collection: 'Home',
		author: 'OneType',
		config: {
			rows: {
				type: 'array',
				value: [
					{ icon: 'description', label: '/pricing', sublabel: '12,480 views', value: '+8%', percent: 88, color: 'green' },
					{ icon: 'description', label: '/features', sublabel: '9,120 views', value: '+3%', percent: 64, color: 'blue' },
					{ icon: 'description', label: '/blog/launch', sublabel: '6,840 views', value: '-2%', percent: 48, color: 'red' },
					{ icon: 'description', label: '/docs', sublabel: '4,210 views', value: '+11%', percent: 30, color: 'orange' }
				],
				each: {
					type: 'object',
					config: {
						icon: {
							type: 'string',
							description: 'Leading Material Symbols icon.'
						},
						label: {
							type: 'string',
							description: 'Row title.'
						},
						sublabel: {
							type: 'string',
							description: 'Muted text under the label.'
						},
						value: {
							type: 'string|number',
							description: 'Trailing value.'
						},
						percent: {
							type: 'number',
							description: 'Fill of the progress bar behind the row, 0 to 100. Empty draws no bar.'
						},
						color: {
							type: 'string',
							value: 'brand',
							options: ['brand', 'blue', 'red', 'orange', 'green'],
							description: 'Bar and value color.'
						},
						onClick: {
							type: 'function',
							description: 'Called with the row on click. Makes the row interactive.'
						}
					}
				},
				description: 'Rows top to bottom.'
			},
			background: {
				type: 'number',
				value: 2,
				options: [0, 1, 2, 3, 4],
				description: 'Background depth of the surface from 1 to 4. Zero renders the list bare, without a surface.'
			},
			blur: {
				type: 'boolean',
				value: false,
				description: 'Translucent blurred surface instead of a solid one. Applies while background is set.'
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

				if(this.background)
				{
					list.push('bg-' + this.background);

					if(this.blur)
					{
						list.push('blur');
					}

					if(this.glow)
					{
						list.push('glow-' + this.glow);
					}
				}

				return list.join(' ');
			};

			this.state = (row) =>
			{
				return row.onClick ? 'row ' + row.color + ' clickable' : 'row ' + row.color;
			};

			/* ===== HANDLERS ===== */

			this.bar = (row) =>
			{
				return 'width: ' + Math.min(Math.max(row.percent, 0), 100) + '%';
			};

			this.run = (row) =>
			{
				if(row.onClick)
				{
					row.onClick(row);
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div ot-if="!rows.length" class="empty">No data</div>
					<div ot-for="row in rows" :ot-key="row.label" :class="state(row)" ot-click="() => run(row)">
						<div ot-if="row.percent != null" class="fill" :style="bar(row)"></div>
					<i ot-if="row.icon" class="lead">{{ row.icon }}</i>
						<div class="text">
							<span class="label">{{ row.label }}</span>
							<span ot-if="row.sublabel" class="sub">{{ row.sublabel }}</span>
						</div>
						<span ot-if="row.value !== '' && row.value != null" class="value">{{ row.value }}</span>
					</div>
				</div>
			`;
		}
	});
});

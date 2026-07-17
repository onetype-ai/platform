onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'cards-info',
		icon: 'info',
		name: 'Info Card',
		description: 'Structured detail card with icon, title, status pill, key value rows and an optional notice.',
		category: 'Cards',
		collection: 'Home',
		author: 'OneType',
		config: {
			icon: {
				type: 'string',
				value: 'dns',
				description: 'Icon in the tile next to the title.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the icon tile.'
			},
			title: {
				type: 'string',
				value: 'Production',
				description: 'Card title.'
			},
			description: {
				type: 'string',
				value: 'Main deployment target',
				description: 'Muted line under the title.'
			},
			status: {
				type: 'object',
				value: { text: 'Operational', color: 'green' },
				config: {
					text: {
						type: 'string',
						description: 'Status label.'
					},
					color: {
						type: 'string',
						value: 'green',
						options: ['brand', 'blue', 'red', 'orange', 'green'],
						description: 'Status color.'
					}
				},
				description: 'Status pill in the top right corner. Empty object hides it.'
			},
			rows: {
				type: 'array',
				value: [
					{ label: 'Region', value: 'eu-central' },
					{ label: 'Version', value: '2.4.1' },
					{ label: 'Uptime', value: '99.98%' }
				],
				each: {
					type: 'object',
					config: {
						label: {
							type: 'string',
							description: 'Row label on the left.'
						},
						value: {
							type: 'string|number',
							description: 'Row value on the right.'
						}
					}
				},
				description: 'Key value rows.'
			},
			notice: {
				type: 'object',
				value: {},
				config: {
					text: {
						type: 'string',
						description: 'Notice text.'
					},
					color: {
						type: 'string',
						value: 'orange',
						options: ['brand', 'blue', 'red', 'orange', 'green'],
						description: 'Notice accent color.'
					}
				},
				description: 'Highlighted notice pinned to the bottom. Empty object hides it.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the card surface from 1 to 3. 0 renders transparent, without background or borders.'
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
				const list = ['box', this.color, 'bg-' + this.background];

				return list.join(' ');
			};

			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.pill = this.status && this.status.text ? this.status : null;
				this.warning = this.notice && this.notice.text ? this.notice : null;
			});

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div ot-if="icon || title || description || pill" class="head">
						<div ot-if="icon" class="tile"><i>{{ icon }}</i></div>
						<div class="text">
							<h3 ot-if="title" class="title">{{ title }}</h3>
							<span ot-if="description" class="description">{{ description }}</span>
						</div>
						<span ot-if="pill" :class="'status ' + pill.color">
							<span class="dot"></span>
							<span>{{ pill.text }}</span>
						</span>
					</div>
					<div ot-if="rows.length" class="rows">
						<div ot-for="row in rows" :ot-key="row.label" class="row">
							<span class="label">{{ row.label }}</span>
							<span class="value">{{ row.value }}</span>
						</div>
					</div>
					<div ot-if="warning" :class="'notice ' + warning.color">{{ warning.text }}</div>
				</div>
			`;
		}
	});
});

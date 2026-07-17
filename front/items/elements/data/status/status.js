onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'data-status',
		icon: 'monitor_heart',
		name: 'Status',
		description: 'Status page board with an overall banner, pulsing status dots, latency values and an uptime history strip per service.',
		category: 'Data',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ label: 'Edge network', sublabel: '12 regions', value: '28ms', status: 'up', history: ['up', 'up', 'up', 'up', 'warn', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up'] },
					{ label: 'Database', sublabel: 'primary', value: '6ms', status: 'up', history: ['up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up', 'up'] },
					{ label: 'Build queue', sublabel: '3 pending', value: 'busy', status: 'warn', history: ['up', 'up', 'up', 'warn', 'warn', 'up', 'up', 'up', 'up', 'down', 'up', 'up', 'up', 'up', 'up', 'warn', 'up', 'up', 'up', 'up', 'up', 'warn', 'warn', 'warn'] },
					{ label: 'Image CDN', sublabel: 'idle', value: '—', status: 'idle', history: [] }
				],
				each: {
					type: 'object',
					config: {
						label: {
							type: 'string',
							description: 'Service name.'
						},
						sublabel: {
							type: 'string',
							description: 'Muted text under the name.'
						},
						value: {
							type: 'string|number',
							description: 'Trailing value, like latency.'
						},
						status: {
							type: 'string',
							value: 'idle',
							options: ['up', 'warn', 'down', 'idle'],
							description: 'Current state, drives the dot and the banner.'
						},
						history: {
							type: 'array',
							value: [],
							each: {
								type: 'string',
								options: ['up', 'warn', 'down'],
								description: 'State of a single tick.'
							},
							description: 'Uptime history ticks, oldest first. Empty hides the strip.'
						}
					}
				},
				description: 'Services top to bottom.'
			},
			banner: {
				type: 'boolean',
				value: true,
				description: 'Shows the overall state banner computed from the items.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the surface from 1 to 3. 0 renders transparent, without background or borders.'
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
				const active = this.items.filter((item) => item.status !== 'idle');

				if(active.some((item) => item.status === 'down'))
				{
					this.overall = { state: 'down', icon: 'error', text: 'Major outage in progress' };
				}
				else if(active.some((item) => item.status === 'warn'))
				{
					this.overall = { state: 'warn', icon: 'warning', text: 'Degraded performance' };
				}
				else
				{
					this.overall = { state: 'up', icon: 'check_circle', text: 'All systems operational' };
				}
			});

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div ot-if="banner" :class="'banner ' + overall.state">
						<i>{{ overall.icon }}</i>
						<span>{{ overall.text }}</span>
					</div>
					<div ot-if="!items.length" class="empty">No services</div>
					<div ot-for="item in items" :ot-key="item.label" class="row">
						<span :class="'dot ' + item.status"></span>
						<div class="text">
							<span class="label">{{ item.label }}</span>
							<span ot-if="item.sublabel" class="sub">{{ item.sublabel }}</span>
						</div>
						<div ot-if="item.history.length" class="strip">
							<div ot-for="(tick, index) in item.history" :ot-key="index">
								<span :class="'tick ' + tick"></span>
							</div>
						</div>
						<span ot-if="item.value !== '' && item.value != null" class="value">{{ item.value }}</span>
					</div>
				</div>
			`;
		}
	});
});

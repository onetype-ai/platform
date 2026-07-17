onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'navigation-steps',
		icon: 'format_list_numbered',
		name: 'Steps',
		description: 'Stepper navigation with done, active and upcoming states and a connector line.',
		category: 'Navigation',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ id: 'account', label: 'Account', description: 'Name and workspace URL.' },
					{ id: 'team', label: 'Invite the team', description: 'Add people by email.' },
					{ id: 'apps', label: 'Install apps', description: 'Pick your first packages.' },
					{ id: 'done', label: 'Finish', description: 'Review and launch.' }
				],
				each: {
					type: 'object',
					config: {
						id: {
							type: 'string',
							description: 'Unique step id.'
						},
						label: {
							type: 'string',
							description: 'Step label.'
						},
						description: {
							type: 'string',
							description: 'Step description below the label.'
						},
						icon: {
							type: 'string',
							description: 'Icon for the upcoming state instead of the number.'
						},
						disabled: {
							type: 'boolean',
							description: 'Prevent selecting this step.'
						}
					}
				},
				description: 'Steps in order.'
			},
			active: {
				type: 'string',
				value: 'team',
				description: 'Active step id. Everything before it renders as done.'
			},
			orientation: {
				type: 'string',
				value: 'vertical',
				options: ['vertical', 'horizontal'],
				description: 'Layout direction.'
			},
			connected: {
				type: 'boolean',
				value: true,
				description: 'Draw a connector line between the steps.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_change: {
				type: 'function',
				description: 'Called with { event, value } when a step is selected.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			this.Compute(() =>
			{
				const activeIndex = this.items.findIndex((entry) => entry.id === this.active);

				this.computed = this.items.map((entry, index) =>
				{
					let status = 'upcoming';

					if(activeIndex !== -1)
					{
						if(index < activeIndex)
						{
							status = 'done';
						}
						else if(index === activeIndex)
						{
							status = 'active';
						}
					}

					return { ...entry, status, number: index + 1 };
				});
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.orientation];

				if(this.background || this.background === 0)
				{
					list.push('bg-' + this.background);
				}

				if(this.connected)
				{
					list.push('connected');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.select = (event, item) =>
			{
				if(item.disabled)
				{
					return;
				}

				this.active = item.id;

				if(this._change)
				{
					this._change({ event, value: item.id });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<nav :class="classes()">
					<button
						ot-for="item in computed"
						:ot-key="item.id"
						type="button"
						:class="'step ' + item.status + (item.disabled ? ' disabled' : '')"
						ot-click="({ event }) => select(event, item)"
					>
						<span class="marker">
							<i ot-if="item.status === 'done'">check</i>
							<i ot-if="item.status !== 'done' && item.icon">{{ item.icon }}</i>
							<span ot-if="item.status !== 'done' && !item.icon" class="number">{{ item.number }}</span>
						</span>
						<span class="text">
							<span class="label">{{ item.label }}</span>
							<span ot-if="item.description" class="description">{{ item.description }}</span>
						</span>
					</button>
				</nav>
			`;
		}
	});
});

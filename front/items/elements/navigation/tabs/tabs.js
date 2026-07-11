onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'navigation-tabs',
		icon: 'tab',
		name: 'Tabs',
		description: 'Tabbed navigation with tones, icons, counts and optional content panels.',
		category: 'Navigation',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ id: 'overview', label: 'Overview', icon: 'dashboard' },
					{ id: 'activity', label: 'Activity', icon: 'history', count: 12 },
					{ id: 'members', label: 'Members', icon: 'group', count: 4 },
					{ id: 'settings', label: 'Settings', icon: 'tune' }
				],
				each: {
					type: 'object',
					config: {
						id: {
							type: 'string',
							description: 'Unique tab id.'
						},
						label: {
							type: 'string',
							description: 'Tab label.'
						},
						icon: {
							type: 'string',
							description: 'Tab icon.'
						},
						count: {
							type: 'string|number',
							description: 'Count badge after the label.'
						},
						href: {
							type: 'string',
							description: 'Link URL. When set the tab navigates instead of switching.'
						},
						target: {
							type: 'string',
							description: 'Link target while href is set.'
						},
						disabled: {
							type: 'boolean',
							description: 'Disabled state of the tab.'
						},
						content: {
							type: 'string',
							description: 'Panel HTML content shown below while the tab is active.'
						}
					}
				},
				description: 'Tabs left to right.'
			},
			active: {
				type: 'string',
				value: 'overview',
				description: 'Active tab id. Empty activates the first tab.'
			},
			tone: {
				type: 'string',
				value: 'underline',
				options: ['underline', 'pills', 'contained', 'segmented'],
				description: 'Visual tone of the tabs.'
			},
			stretch: {
				type: 'boolean',
				value: false,
				description: 'Stretch to the container width with evenly sized tabs.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [1, 2, 3],
				description: 'Background depth of the track surface from 1 to 3.'
			},
			_change: {
				type: 'function',
				description: 'Called with { event, value } when the active tab changes.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			if(!this.active && this.items.length)
			{
				this.active = this.items[0].id;
			}

			this.Compute(() =>
			{
				this.contentItems = this.items.filter((item) => item.content);
				this.hasContent = this.contentItems.length > 0;
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.tone];

				if(this.background)
				{
					list.push('bg-' + this.background);
				}

				if(this.stretch)
				{
					list.push('stretch');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.select = (item, event) =>
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
				<div :class="classes()">
					<nav class="tabs">
						<a
							ot-for="item in items"
							:ot-key="item.id"
							:class="'tab' + (active === item.id ? ' active' : '') + (item.disabled ? ' disabled' : '')"
							:href="item.href ? item.href : 'javascript:void(0)'"
							:target="item.target"
							ot-click="({ event }) => select(item, event)"
						>
							<i ot-if="item.icon">{{ item.icon }}</i>
							<span ot-if="item.label" class="label">{{ item.label }}</span>
							<span ot-if="item.count != null" class="count">{{ item.count }}</span>
						</a>
					</nav>
					<div ot-if="hasContent" class="body">
						<div
							ot-for="item in contentItems"
							:ot-key="item.id"
							:class="'panel' + (active === item.id ? ' active' : '')"
						>
							<span ot-html="item.content"></span>
						</div>
					</div>
				</div>
			`;
		}
	});
});

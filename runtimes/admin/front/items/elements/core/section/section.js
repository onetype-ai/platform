onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'core-section',
		icon: 'view_agenda',
		name: 'Section',
		description: 'Content section with eyebrow, icon, title, description, collapsible state and an actions slot.',
		category: 'Core',
		collection: 'Home',
		author: 'OneType',
		config: {
			eyebrow: {
				type: 'string',
				description: 'Uppercase label above the title.'
			},
			icon: {
				type: 'string',
				value: 'tune',
				description: 'Leading icon in a brand tinted box.'
			},
			title: {
				type: 'string',
				value: 'General settings',
				description: 'Section title.'
			},
			description: {
				type: 'string',
				value: 'Name, region and defaults for this workspace.',
				description: 'Helper text below the title.'
			},
			collapsible: {
				type: 'boolean',
				value: true,
				description: 'Enable the expand and collapse toggle on the header.'
			},
			collapsed: {
				type: 'boolean',
				value: false,
				description: 'Start collapsed.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the section surface from 1 to 3. 0 renders transparent, without background or borders.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.hasHeader = !!this.title || !!this.description || !!this.eyebrow || !!this.icon || !!this.Slots.actions;
				this.hasActions = !!this.Slots.actions;
				this.isCollapsible = !!this.collapsible && !!this.title;
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.background || this.background === 0 ? 'bg-' + this.background : 'bare'];

				if(this.isCollapsible)
				{
					list.push('collapsible');
				}

				if(this.collapsed)
				{
					list.push('collapsed');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.toggle = () =>
			{
				if(!this.isCollapsible)
				{
					return;
				}

				this.collapsed = !this.collapsed;
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<section :class="classes()">
					<header ot-if="hasHeader" class="head">
						<div class="head-main" ot-click="toggle">
							<div ot-if="icon" class="icon"><i>{{ icon }}</i></div>
							<div class="text">
								<div ot-if="eyebrow" class="eyebrow">{{ eyebrow }}</div>
								<h3 ot-if="title" class="title">{{ title }}</h3>
								<p ot-if="description" class="description">{{ description }}</p>
							</div>
							<i ot-if="isCollapsible" class="chevron">expand_more</i>
						</div>
						<div ot-if="hasActions" class="actions">
							<slot name="actions"></slot>
						</div>
					</header>
					<div ot-if="!collapsed" class="content">
						<slot name="content"></slot>
					</div>
				</section>
			`;
		}
	});
});

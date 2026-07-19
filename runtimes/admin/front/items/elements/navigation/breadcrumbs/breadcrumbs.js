onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'navigation-breadcrumbs',
		icon: 'route',
		name: 'Breadcrumbs',
		description: 'Path trail for detail pages: clickable crumbs with hover pills, chevron separators and the current page pinned at the end.',
		category: 'Navigation',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ label: 'Connect', icon: 'hub' },
					{ label: 'Providers' },
					{ label: 'Slack' }
				],
				each: {
					type: 'object',
					config: {
						label: {
							type: 'string',
							description: 'Crumb label.'
						},
						icon: {
							type: 'string',
							description: 'Material Symbols icon before the label.'
						},
						href: {
							type: 'string',
							description: 'Link target. Ignored when onClick is set.'
						},
						onClick: {
							type: 'function',
							description: 'Called with the crumb on click.'
						}
					}
				},
				description: 'Crumbs left to right. The last one is the current page and never clicks.'
			}
		},
		render: function()
		{
			this.Compute(() =>
			{
				this.crumbs = this.items.map((item, index) => ({
					...item,
					key: index + ':' + item.label,
					current: index === this.items.length - 1,
					clickable: index !== this.items.length - 1 && !!(item.onClick || item.href)
				}));
			});

			this.open = (crumb) =>
			{
				if(!crumb.clickable)
				{
					return;
				}

				if(crumb.onClick)
				{
					crumb.onClick(crumb);
					return;
				}

				window.location.href = crumb.href;
			};

			return /* html */ `
				<nav class="box">
					<div ot-for="crumb in crumbs" :ot-key="crumb.key" class="step">
						<span
							:class="crumb.current ? 'crumb current' : (crumb.clickable ? 'crumb clickable' : 'crumb')"
							ot-click="() => open(crumb)"
						>
							<i ot-if="crumb.icon">{{ crumb.icon }}</i>
							<span class="label">{{ crumb.label }}</span>
						</span>
						<i ot-if="!crumb.current" class="separator">chevron_right</i>
					</div>
				</nav>
			`;
		}
	});
});

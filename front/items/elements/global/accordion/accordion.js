onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'global-accordion',
		icon: 'expand_more',
		name: 'Accordion',
		description: 'Expandable panels with icon tiles, smooth height animation, single or multiple open mode.',
		category: 'Global',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ id: 'install', icon: 'download', title: 'How do I install a package?', description: 'Marketplace basics', content: 'Open the marketplace, pick a package and press install. The package lands in your project immediately and every update ships through the same channel.' },
					{ id: 'domains', icon: 'language', title: 'Can I bring my own domain?', description: 'DNS and SSL', content: 'Yes. Point your domain to our edge, pick which runtime it serves, and SSL certificates are issued automatically within a minute.' },
					{ id: 'billing', icon: 'credit_card', title: 'How does billing work?', description: 'Plans and invoices', content: 'Billing runs per workspace. Every plan includes unlimited drafts, and you only pay for published sites.' }
				],
				each: {
					type: 'object',
					config: {
						id: {
							type: 'string',
							description: 'Unique panel identifier.'
						},
						title: {
							type: 'string',
							description: 'Header title.'
						},
						description: {
							type: 'string',
							description: 'Muted line under the title.'
						},
						icon: {
							type: 'string',
							description: 'Icon in the tile before the title.'
						},
						content: {
							type: 'string',
							description: 'Panel body HTML.'
						},
						badge: {
							type: 'string',
							description: 'Small chip on the right of the header.'
						},
						disabled: {
							type: 'boolean',
							value: false,
							description: 'Dims the panel and blocks the toggle.'
						}
					}
				},
				description: 'Panels top to bottom.'
			},
			active: {
				type: 'string|array',
				description: 'Open panel id, or an array of ids while multiple is on.'
			},
			multiple: {
				type: 'boolean',
				value: false,
				description: 'Allow more than one open panel.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the open state.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_change: {
				type: 'function',
				description: 'Called with { event, value } after every toggle.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.color];

				if(this.background || this.background === 0)
				{
					list.push('bg-' + this.background);
				}

				return list.join(' ');
			};

			this.state = (item) =>
			{
				const list = ['item'];

				if(this.opened(item))
				{
					list.push('open');
				}

				if(item.disabled)
				{
					list.push('disabled');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.opened = (item) =>
			{
				if(Array.isArray(this.active))
				{
					return this.active.includes(item.id);
				}

				return this.active === item.id;
			};

			this.toggle = (item, event) =>
			{
				if(item.disabled)
				{
					return;
				}

				let next;

				if(this.multiple)
				{
					const current = Array.isArray(this.active) ? [...this.active] : [];
					const index = current.indexOf(item.id);

					if(index === -1)
					{
						current.push(item.id);
					}
					else
					{
						current.splice(index, 1);
					}

					next = current;
				}
				else
				{
					next = this.active === item.id ? null : item.id;
				}

				this.active = next;

				if(this._change)
				{
					this._change({ event, value: next });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div ot-for="item in items" :ot-key="item.id" :class="state(item)">
						<button type="button" class="head" ot-click="({ event }) => toggle(item, event)">
							<div ot-if="item.icon" class="tile"><i>{{ item.icon }}</i></div>
							<div class="text">
								<span class="title">{{ item.title }}</span>
								<span ot-if="item.description" class="description">{{ item.description }}</span>
							</div>
							<span ot-if="item.badge" class="chip">{{ item.badge }}</span>
							<i class="chevron">expand_more</i>
						</button>
						<div class="panel">
							<div class="inner">
								<div class="content"><span ot-html="item.content"></span></div>
							</div>
						</div>
					</div>
				</div>
			`;
		}
	});
});

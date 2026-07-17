onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'cards-profile',
		icon: 'account_circle',
		name: 'Profile Card',
		description: 'Person card with avatar, verified name, role, short bio and a stats row.',
		category: 'Cards',
		collection: 'Home',
		author: 'OneType',
		config: {
			avatar: {
				type: 'string',
				description: 'Avatar image URL. Empty renders initials.'
			},
			name: {
				type: 'string',
				value: 'Dejan Tomić',
				description: 'Person name.'
			},
			role: {
				type: 'string',
				value: 'Founder',
				description: 'Role or title under the name.'
			},
			verified: {
				type: 'boolean',
				value: true,
				description: 'Shows a verified mark next to the name.'
			},
			description: {
				type: 'string',
				value: 'Building OneType. Design systems, editors and the web.',
				description: 'Short bio, clamped to two lines.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the initials and verified mark.'
			},
			stats: {
				type: 'array',
				value: [
					{ label: 'Projects', value: '24' },
					{ label: 'Packages', value: '9' },
					{ label: 'Followers', value: '1.2k' }
				],
				each: {
					type: 'object',
					config: {
						label: {
							type: 'string',
							description: 'Stat label under the value.'
						},
						value: {
							type: 'string|number',
							description: 'Stat value.'
						}
					}
				},
				description: 'Stats row pinned to the bottom.'
			},
			href: {
				type: 'string',
				description: 'Link target. When set the card renders as a link.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the card surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_click: {
				type: 'function',
				description: 'Called with { event } on click. Overrides the href navigation.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.color, 'bg-' + this.background];

				if(this._click || this.href)
				{
					list.push('clickable');
				}

				return list.join(' ');
			};

			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.initials = this.name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase();
			});

			/* ===== HANDLERS ===== */

			this.open = (event) =>
			{
				if(this._click)
				{
					this._click({ event });
					return;
				}

				if(this.href)
				{
					window.location.href = this.href;
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()" ot-click="({ event }) => open(event)">
					<div class="head">
						<img ot-if="avatar" class="avatar" :src="avatar" alt="" />
						<span ot-if="!avatar" class="initials">{{ initials }}</span>
						<div class="text">
							<span class="name">
								<span>{{ name }}</span>
								<i ot-if="verified">verified</i>
							</span>
							<span ot-if="role" class="role">{{ role }}</span>
						</div>
					</div>
					<p ot-if="description" class="description">{{ description }}</p>
					<div ot-if="stats.length" class="stats">
						<div ot-for="stat in stats" :ot-key="stat.label" class="stat">
							<span class="value">{{ stat.value }}</span>
							<span class="label">{{ stat.label }}</span>
						</div>
					</div>
				</div>
			`;
		}
	});
});

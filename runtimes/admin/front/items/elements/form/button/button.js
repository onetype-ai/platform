onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'form-button',
		icon: 'smart_button',
		name: 'Button',
		description: 'Button with accent colors, tones, icons, link mode and a loading state.',
		category: 'Form',
		collection: 'Home',
		author: 'OneType',
		config: {
			text: {
				type: 'string',
				value: 'Create workspace',
				description: 'Button label. Empty with an icon renders an icon only button.'
			},
			icon: {
				type: 'string',
				value: 'add',
				description: 'Icon on the left side of the label.'
			},
			iconRight: {
				type: 'string',
				description: 'Icon on the right side of the label.'
			},
			href: {
				type: 'string',
				description: 'Link target. When set the button renders as an anchor.'
			},
			target: {
				type: 'string',
				options: ['_blank', '_self', '_parent', '_top'],
				description: 'Anchor target while href is set.'
			},
			type: {
				type: 'string',
				value: 'button',
				options: ['button', 'submit', 'reset'],
				description: 'Button type attribute.'
			},
			color: {
				type: 'string',
				value: 'brand',
				options: ['brand', 'blue', 'red', 'orange', 'green', 'dark'],
				description: 'Accent color. Pairs with the tone.'
			},
			tone: {
				type: 'string',
				value: 'solid',
				options: ['solid', 'soft', 'outline', 'ghost', 'link'],
				description: 'Visual tone of the button.'
			},
			stretch: {
				type: 'boolean',
				value: false,
				description: 'Stretch to the container width.'
			},
			tooltip: {
				type: 'string',
				description: 'Tooltip text shown on hover.'
			},
			disabled: {
				type: 'boolean',
				value: false,
				description: 'Disabled state.'
			},
			loading: {
				type: 'boolean',
				value: false,
				description: 'Loading state with a spinner.'
			},
			_click: {
				type: 'function',
				description: 'Called with { event } on click.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.iconOnly = !this.text && (!!this.icon || !!this.iconRight);
				this.isLink = !!this.href;
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box', this.tone, this.color];

				if(this.stretch)
				{
					list.push('stretch');
				}

				if(this.iconOnly)
				{
					list.push('icon-only');
				}

				if(this.disabled)
				{
					list.push('disabled');
				}

				if(this.loading)
				{
					list.push('loading');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.click = ({ event }) =>
			{
				if(this.disabled || this.loading)
				{
					return;
				}

				if(this._click)
				{
					this._click({ event });
				}
			};

			/* ===== RENDER ===== */

			const body = /* html */ `
				<span ot-if="loading" class="spin"><i>progress_activity</i></span>
				<span ot-if="!loading" class="body">
					<i ot-if="icon" class="left">{{ icon }}</i>
					<span ot-if="text" class="text">{{ text }}</span>
					<i ot-if="iconRight" class="right">{{ iconRight }}</i>
				</span>
			`;

			if(this.isLink)
			{
				return /* html */ `
					<a :class="classes()" :href="href" :target="target ? target : null" :ot-tooltip="tooltip ? { text: tooltip, position: { x: 'center', y: 'top' } } : null" ot-click="click">
						${body}
					</a>
				`;
			}

			return /* html */ `
				<button :class="classes()" :type="type" :disabled="disabled" :ot-tooltip="tooltip ? { text: tooltip, position: { x: 'center', y: 'top' } } : null" ot-click="click">
					${body}
				</button>
			`;
		}
	});
});

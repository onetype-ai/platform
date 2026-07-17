onetype.AddonReady('elements', (elements) =>
{
	const ICONS = {
		brand: 'bolt',
		blue: 'info',
		red: 'error',
		orange: 'warning',
		green: 'check_circle'
	};

	elements.ItemAdd({
		id: 'global-notice',
		icon: 'info',
		name: 'Notice',
		description: 'Notice banner with an icon tile, title, text, optional action button and a dismiss control.',
		category: 'Global',
		collection: 'Home',
		author: 'OneType',
		config: {
			title: {
				type: 'string',
				value: 'Update available',
				description: 'Notice title.'
			},
			text: {
				type: 'string',
				value: 'A new version of the forms package is ready to install.',
				description: 'Supporting text under the title.'
			},
			icon: {
				type: 'string',
				description: 'Icon override. Empty resolves from the color: info, warning, error, check or bolt.'
			},
			color: {
				type: 'string',
				value: 'blue',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Accent color of the notice.'
			},
			action: {
				type: 'string',
				description: 'Action button label. Empty hides the button.'
			},
			closable: {
				type: 'boolean',
				value: false,
				description: 'Shows the dismiss button and hides the notice on click.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the banner from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_click: {
				type: 'function',
				description: 'Called with { event } when the action button is clicked.'
			},
			_close: {
				type: 'function',
				description: 'Called with { event } when the notice is dismissed.'
			}
		},
		render: function()
		{
			this.visible = true;

			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.symbol = this.icon ? this.icon : ICONS[this.color];
			});

			/* ===== HANDLERS ===== */

			this.run = (event) =>
			{
				if(this._click)
				{
					this._click({ event });
				}
			};

			this.dismiss = (event) =>
			{
				this.visible = false;

				if(this._close)
				{
					this._close({ event });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div ot-if="visible" :class="'box bg-' + background + ' ' + color">
					<div class="rail"></div>
					<div class="tile"><i>{{ symbol }}</i></div>
					<div class="body">
						<span ot-if="title" class="title">{{ title }}</span>
						<span ot-if="text" class="text">{{ text }}</span>
					</div>
					<button ot-if="action" type="button" class="action" ot-click="({ event }) => run(event)">{{ action }}</button>
					<button ot-if="closable" type="button" class="close" ot-click="({ event }) => dismiss(event)"><i>close</i></button>
				</div>
			`;
		}
	});
});

onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'views-map',
		icon: 'map',
		name: 'Map View',
		description: 'Spatial listing view with entries as pulsing pins on an abstract map canvas, positioned by percentage coordinates with hover labels.',
		category: 'Views',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ id: 1, title: 'Belgrade HQ', description: 'Platform core team', x: 18, y: 34, color: 'brand' },
					{ id: 2, title: 'Novi Sad studio', description: 'Design systems', x: 30, y: 58, color: 'blue' },
					{ id: 3, title: 'Berlin meetup', description: 'Community event', x: 46, y: 26, color: 'green' },
					{ id: 4, title: 'London launch', description: 'Marketplace opening', x: 62, y: 50, color: 'orange' },
					{ id: 5, title: 'New York pop up', description: 'Creator sessions', x: 78, y: 30, color: 'green' },
					{ id: 6, title: 'Tokyo workshop', description: 'Automation lab', x: 87, y: 62, color: 'red' }
				],
				each: {
					type: 'object',
					description: 'A single entry with id, title, description, x and y as percentages of the canvas and an accent color.'
				},
				description: 'Entries pinned onto the canvas.'
			},
			empty: {
				type: 'string',
				value: 'No locations yet.',
				description: 'Message shown while there are no entries.'
			},
			_open: {
				type: 'function',
				description: 'Called with { event, value } when a pin is opened.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.active = null;

			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.pins = this.items.map((item) => ({
					key: item.id,
					item: item,
					title: item.title,
					description: item.description,
					x: Math.min(Math.max(Number(item.x), 2), 98),
					y: Math.min(Math.max(Number(item.y), 4), 92),
					color: item.color ? item.color : 'brand'
				}));
			});

			/* ===== HANDLERS ===== */

			this.open = (event, pin) =>
			{
				this.active = this.active === pin.key ? null : pin.key;

				if(this._open)
				{
					this._open({ event, value: pin.item });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div class="box">
					<span
						ot-for="pin in pins"
						:ot-key="pin.key"
						:class="'pin ' + pin.color + (active === pin.key ? ' active' : '')"
						:style="'left: ' + pin.x + '%; top: ' + pin.y + '%'"
						ot-click="({ event }) => open(event, pin)"
					>
						<span class="pulse"></span>
						<span class="dot"></span>
						<span class="label">
							<span class="name">{{ pin.title }}</span>
							<span ot-if="pin.description" class="detail">{{ pin.description }}</span>
						</span>
					</span>
					<span ot-if="!pins.length" class="empty">{{ empty }}</span>
				</div>
			`;
		}
	});
});

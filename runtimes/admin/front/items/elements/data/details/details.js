onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'data-details',
		icon: 'list_alt',
		name: 'Details',
		description: 'Key value card: labeled rows with typed formatting — text, mono, chips, people with avatars, statuses with colors, links and dates.',
		category: 'Data',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ label: 'Status', value: 'Working', type: 'status', color: 'orange' },
					{ label: 'Assignee', value: 'Mila Kovač', type: 'person' },
					{ label: 'Repository', value: 'onetype-ai/platform', type: 'link', href: 'https://github.com/onetype-ai/platform' },
					{ label: 'Version', value: '2.4.1', type: 'mono' },
					{ label: 'Tags', value: ['design', 'front', 'tokens'], type: 'chips' },
					{ label: 'Created', value: 'Jul 12, 2026', type: 'date' },
					{ label: 'Description', value: 'One card that carries every fact worth knowing about the thing above it.' }
				],
				each: {
					type: 'object',
					config: {
						label: {
							type: 'string',
							required: true,
							description: 'Row label on the left.'
						},
						value: {
							type: 'any',
							description: 'Row value: a string, a number, or an array of strings for chips.'
						},
						type: {
							type: 'string',
							value: 'text',
							options: ['text', 'mono', 'chips', 'person', 'status', 'link', 'date'],
							description: 'How the value is formatted.'
						},
						color: {
							type: 'string',
							value: 'brand',
							options: ['brand', 'blue', 'red', 'orange', 'green'],
							description: 'Accent color for status and person types.'
						},
						icon: {
							type: 'string',
							description: 'Icon before the value, any type.'
						},
						href: {
							type: 'string',
							description: 'Address the link type opens in a new tab.'
						}
					},
					description: 'A single detail row.'
				},
				description: 'Rows of the card, top to bottom.'
			},
			columns: {
				type: 'number',
				value: 1,
				options: [1, 2],
				description: 'How many rows sit side by side.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the card surface. 0 renders transparent, without background or borders.'
			}
		},
		render: function()
		{
			this.initials = (name) => String(name).split(' ').map((word) => word.charAt(0)).slice(0, 2).join('');

			this.chips = (value) => Array.isArray(value) ? value : [value];

			this.blank = (value) => value === null || value === undefined || value === '' || (Array.isArray(value) && !value.length);

			this.classes = () =>
			{
				const list = ['box', 'bg-' + this.background, 'columns-' + this.columns];

				return list.join(' ');
			};

			return /* html */ `
				<div :class="classes()">
					<div ot-for="item in items" :class="'row ' + (item.color ? item.color : 'brand')">
						<span class="label">{{ item.label }}</span>
						<span ot-if="blank(item.value)" class="value empty">—</span>
						<span ot-if="!blank(item.value) && (!item.type || item.type === 'text')" class="value"><i ot-if="item.icon">{{ item.icon }}</i>{{ item.value }}</span>
						<span ot-if="!blank(item.value) && item.type === 'mono'" class="value mono"><i ot-if="item.icon">{{ item.icon }}</i>{{ item.value }}</span>
						<span ot-if="!blank(item.value) && item.type === 'date'" class="value date"><i>{{ item.icon ? item.icon : 'calendar_today' }}</i>{{ item.value }}</span>
						<span ot-if="!blank(item.value) && item.type === 'status'" class="value"><span class="status"><span class="dot"></span>{{ item.value }}</span></span>
						<span ot-if="!blank(item.value) && item.type === 'person'" class="value person"><span class="avatar">{{ initials(item.value) }}</span>{{ item.value }}</span>
						<span ot-if="!blank(item.value) && item.type === 'chips'" class="value wraps"><span ot-for="chip in chips(item.value)" class="chip">{{ chip }}</span></span>
						<a ot-if="!blank(item.value) && item.type === 'link'" class="value anchor" :href="item.href" target="_blank"><i ot-if="item.icon">{{ item.icon }}</i>{{ item.value }}<i class="out">north_east</i></a>
					</div>
				</div>
			`;
		}
	});
});

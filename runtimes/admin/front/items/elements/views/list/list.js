onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'views-list',
		icon: 'list',
		name: 'List View',
		description: 'Compact listing view with one entry per row: leading thumbnail or icon, title with inline excerpt, tags, status and date.',
		category: 'Views',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ id: 1, title: 'Designing the OneType shell', description: 'How the editor chrome became a quiet, floating surface.', image: 'https://picsum.photos/id/1018/96/96', status: { label: 'Published', color: 'green' }, tags: ['Design'], date: 'Jul 8, 2026' },
					{ id: 2, title: 'One database for everything', description: 'Collections, entries and relations on a single universal store.', icon: 'database', color: 'green', status: { label: 'Draft', color: 'orange' }, tags: ['Engineering'], date: 'Jul 6, 2026' },
					{ id: 3, title: 'Marketplace economics', description: 'What packages, templates and integrations earn on one platform.', image: 'https://picsum.photos/id/1015/96/96', status: { label: 'In review', color: 'blue' }, tags: ['Business'], date: 'Jul 5, 2026' },
					{ id: 4, title: 'Commands as the universal API', description: 'Every action in the platform is a command an AI can drive.', icon: 'terminal', color: 'brand', status: { label: 'Published', color: 'green' }, tags: ['Engineering', 'AI'], date: 'Jul 2, 2026' },
					{ id: 5, title: 'Packages, not plugins', description: 'Why the whole platform is built from installable packages.', image: 'https://picsum.photos/id/1084/96/96', status: { label: 'Published', color: 'green' }, tags: ['Platform'], date: 'Jun 28, 2026' },
					{ id: 6, title: 'Automation that writes itself', description: 'Agents compose workflows from the commands packages expose.', icon: 'smart_toy', color: 'blue', status: { label: 'Draft', color: 'orange' }, tags: ['AI'], date: 'Jun 24, 2026' }
				],
				each: {
					type: 'object',
					description: 'A single entry with id, title, description, image or icon with color, status, tags and date.'
				},
				description: 'Entries top to bottom.'
			},
			empty: {
				type: 'string',
				value: 'No entries yet.',
				description: 'Message shown while there are no entries.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the list surface from 1 to 3. Empty renders it bare. 0 renders transparent, without background or borders.'
			},
			_open: {
				type: 'function',
				description: 'Called with { event, value } when an entry row is opened.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			this.Compute(() =>
			{
				this.rows = this.items.map((item) =>
				{
					const status = item.status && typeof item.status === 'object' ? item.status : (item.status ? { label: String(item.status), color: 'brand' } : null);

					return {
						key: item.id,
						item: item,
						title: item.title,
						description: item.description,
						image: item.image,
						icon: item.icon ? item.icon : 'article',
						color: item.color ? item.color : 'brand',
						status: status ? { label: status.label, color: status.color ? status.color : 'brand' } : null,
						tags: Array.isArray(item.tags) ? item.tags.slice(0, 2) : [],
						date: item.date
					};
				});
			});

			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box'];

				if(this.background || this.background === 0)
				{
					list.push('bg-' + this.background);
				}

				if(this._open)
				{
					list.push('clickable');
				}

				return list.join(' ');
			};

			/* ===== HANDLERS ===== */

			this.open = (event, item) =>
			{
				if(this._open)
				{
					this._open({ event, value: item });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div ot-for="row in rows" :ot-key="row.key" class="row" ot-click="({ event }) => open(event, row.item)">
						<span :class="'lead ' + row.color">
							<img ot-if="row.image" :src="row.image" loading="lazy" />
							<i ot-if="!row.image">{{ row.icon }}</i>
						</span>
						<span class="main">
							<span class="title">{{ row.title }}</span>
							<span ot-if="row.description" class="description">{{ row.description }}</span>
						</span>
						<span class="tags">
							<span ot-for="tag in row.tags" :ot-key="tag" class="tag">{{ tag }}</span>
						</span>
						<span ot-if="row.status" :class="'pill ' + row.status.color"><span class="dot"></span>{{ row.status.label }}</span>
						<span ot-if="row.date" class="date">{{ row.date }}</span>
						<i class="go">chevron_right</i>
					</div>
					<div ot-if="!rows.length" class="empty">{{ empty }}</div>
				</div>
			`;
		}
	});
});

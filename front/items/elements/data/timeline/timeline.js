onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'data-timeline',
		icon: 'timeline',
		name: 'Timeline',
		description: 'Vertical activity feed with connected icon nodes, titles, details, badges and times.',
		category: 'Data',
		collection: 'Home',
		author: 'OneType',
		config: {
			events: {
				type: 'array',
				value: [
					{ icon: 'rocket_launch', title: 'Production deploy finished', detail: 'Build #214, 38s', time: '4m ago', color: 'green' },
					{ icon: 'extension', title: 'Package forms updated', detail: '1.2.0 to 1.3.0', time: '26m ago', color: 'blue', badge: 'auto' },
					{ icon: 'person_add', title: 'New collaborator joined', detail: 'ana@studio.com accepted the invite', time: '1h ago', color: 'orange' },
					{ icon: 'error', title: 'Build failed on preview', detail: 'Missing env variable, retried', time: '2h ago', color: 'red' }
				],
				each: {
					type: 'object',
					config: {
						icon: {
							type: 'string',
							description: 'Node icon.'
						},
						title: {
							type: 'string',
							description: 'Event title.'
						},
						detail: {
							type: 'string',
							description: 'Muted text under the title.'
						},
						time: {
							type: 'string',
							description: 'Right aligned time label.'
						},
						badge: {
							type: 'string',
							description: 'Small chip next to the title. Empty hides it.'
						},
						color: {
							type: 'string',
							value: 'brand',
							options: ['brand', 'blue', 'red', 'orange', 'green'],
							description: 'Accent color of the node and badge.'
						},
						onClick: {
							type: 'function',
							description: 'Called with the event on click. Makes the row interactive.'
						}
					}
				},
				description: 'Events top to bottom, newest first.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			glow: {
				type: 'string',
				options: ['brand', 'blue', 'red', 'orange', 'green'],
				description: 'Colored glow on top of the surface. Empty renders no glow.'
			}
		},
		render: function()
		{
			/* ===== CLASSES ===== */

			this.classes = () =>
			{
				const list = ['box'];

				if(this.background || this.background === 0)
				{
					list.push('bg-' + this.background);
				}

				return list.join(' ');
			};

			this.state = (event) =>
			{
				return event.onClick ? 'event ' + event.color + ' clickable' : 'event ' + event.color;
			};

			/* ===== HANDLERS ===== */

			this.run = (event) =>
			{
				if(event.onClick)
				{
					event.onClick(event);
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="classes()">
					<div ot-if="!events.length" class="empty">No activity yet</div>
					<div ot-if="events.length" class="feed">
						<div ot-for="event in events" :ot-key="event.title + ':' + event.time" :class="state(event)" ot-click="() => run(event)">
							<div class="node">
								<div class="dot"><i>{{ event.icon }}</i></div>
							</div>
							<div class="body">
								<div class="row">
									<span class="title">{{ event.title }}</span>
									<span ot-if="event.badge" class="chip">{{ event.badge }}</span>
									<span ot-if="event.time" class="time">{{ event.time }}</span>
								</div>
								<span ot-if="event.detail" class="detail">{{ event.detail }}</span>
							</div>
						</div>
					</div>
				</div>
			`;
		}
	});
});

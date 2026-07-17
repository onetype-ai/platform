onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'views-timeline',
		icon: 'timeline',
		name: 'Timeline View',
		description: 'Gantt style listing view with entries as colored range bars on a shared time axis, month gridlines and a today marker.',
		category: 'Views',
		collection: 'Home',
		author: 'OneType',
		config: {
			items: {
				type: 'array',
				value: [
					{ id: 1, title: 'Platform launch prep', start: '2026-06-08', end: '2026-07-02', color: 'brand' },
					{ id: 2, title: 'Design system pass', start: '2026-06-12', end: '2026-06-26', color: 'blue' },
					{ id: 3, title: 'CMS beta', start: '2026-06-24', end: '2026-07-18', color: 'green' },
					{ id: 4, title: 'Marketplace opening', start: '2026-07-06', end: '2026-08-03', color: 'orange' },
					{ id: 5, title: 'Onboarding flows', start: '2026-07-14', end: '2026-07-30', color: 'blue' },
					{ id: 6, title: 'Launch campaign', start: '2026-07-28', end: '2026-08-21', color: 'red' },
					{ id: 7, title: 'Community program', start: '2026-08-04', end: '2026-08-28', color: 'green' }
				],
				each: {
					type: 'object',
					description: 'A single entry with id, title, start and end dates formatted as YYYY-MM-DD and an accent color.'
				},
				description: 'Entries top to bottom, each spanning its date range.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the timeline surface from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_open: {
				type: 'function',
				description: 'Called with { event, value } when a range bar is opened.'
			}
		},
		render: function()
		{
			/* ===== DATA ===== */

			const day = 86400000;

			const parse = (value) =>
			{
				const [year, month, date] = String(value).split('-').map(Number);

				return new Date(year, month - 1, date ? date : 1).getTime();
			};

			const pretty = (value) =>
			{
				return new Date(parse(value)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
			};

			this.Compute(() =>
			{
				const entries = this.items.filter((item) => item.start && item.end);

				if(!entries.length)
				{
					this.lanes = [];
					this.ticks = [];
					this.today = -1;

					return;
				}

				const from = Math.min(...entries.map((item) => parse(item.start)));
				const until = Math.max(...entries.map((item) => parse(item.end)));
				const pad = Math.max((until - from) * 0.04, day * 2);
				const min = from - pad;
				const max = until + pad;
				const span = max - min;
				const place = (time) => ((time - min) / span) * 100;

				this.lanes = entries.map((item) => ({
					key: item.id,
					item: item,
					title: item.title,
					color: item.color ? item.color : 'brand',
					left: place(parse(item.start)),
					width: Math.max(place(parse(item.end) + day) - place(parse(item.start)), 1.5),
					range: pretty(item.start) + ' – ' + pretty(item.end)
				}));

				const ticks = [];
				const cursor = new Date(min);

				cursor.setDate(1);

				while(cursor.getTime() <= max)
				{
					if(cursor.getTime() >= min)
					{
						ticks.push({
							key: cursor.getFullYear() + '-' + cursor.getMonth(),
							label: cursor.toLocaleDateString('en-US', { month: 'short' }),
							left: place(cursor.getTime())
						});
					}

					cursor.setMonth(cursor.getMonth() + 1);
				}

				this.ticks = ticks;
				this.today = place(Date.now());
			});

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
				<div :class="_open ? 'box clickable bg-' + background : 'box bg-' + background">
					<div class="names">
						<span class="axis"></span>
						<span ot-for="lane in lanes" :ot-key="lane.key" class="name">{{ lane.title }}</span>
					</div>
					<div class="field">
						<span ot-for="tick in ticks" :ot-key="tick.key" class="line" :style="'left: ' + tick.left + '%'"></span>
						<span ot-if="today >= 0 && today <= 100" class="today" :style="'left: ' + today + '%'"></span>
						<div class="axis">
							<span ot-for="tick in ticks" :ot-key="tick.key" class="tick" :style="'left: ' + tick.left + '%'">{{ tick.label }}</span>
						</div>
						<div ot-for="lane in lanes" :ot-key="lane.key" class="row">
							<span
								:class="'bar ' + lane.color"
								:style="'left: ' + lane.left + '%; width: ' + lane.width + '%'"
								:ot-tooltip="{ text: lane.range, position: { x: 'center', y: 'top' } }"
								ot-click="({ event }) => open(event, lane.item)"
							>
								<span class="text">{{ lane.title }}</span>
							</span>
						</div>
					</div>
					<div ot-if="!lanes.length" class="empty">No scheduled entries yet.</div>
				</div>
			`;
		}
	});
});

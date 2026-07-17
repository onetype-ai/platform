onetype.AddonReady('elements', (elements) =>
{
	elements.ItemAdd({
		id: 'views-calendar',
		icon: 'calendar_month',
		name: 'Calendar View',
		description: 'Monthly calendar listing view with entries as colored chips on their dates, month navigation and a highlighted today.',
		category: 'Views',
		collection: 'Home',
		author: 'OneType',
		config: {
			month: {
				type: 'string',
				value: '2026-07',
				description: 'Month shown first, formatted as YYYY-MM. Empty opens the current month.'
			},
			items: {
				type: 'array',
				value: [
					{ id: 1, title: 'Designing the OneType shell', date: '2026-07-08', color: 'green' },
					{ id: 2, title: 'One database for everything', date: '2026-07-06', color: 'orange' },
					{ id: 3, title: 'Marketplace economics', date: '2026-07-05', color: 'blue' },
					{ id: 4, title: 'Commands as the universal API', date: '2026-07-02', color: 'green' },
					{ id: 5, title: 'Weekly editorial sync', date: '2026-07-13', color: 'brand' },
					{ id: 6, title: 'Launch teaser campaign', date: '2026-07-13', color: 'red' },
					{ id: 7, title: 'Automation that writes itself', date: '2026-07-13', color: 'orange' },
					{ id: 8, title: 'Packages, not plugins', date: '2026-07-13', color: 'green' },
					{ id: 9, title: 'Community AMA', date: '2026-07-21', color: 'blue' },
					{ id: 10, title: 'Marketplace beta opens', date: '2026-07-24', color: 'brand' }
				],
				each: {
					type: 'object',
					description: 'A single entry with id, title, a date formatted as YYYY-MM-DD and an accent color.'
				},
				description: 'Entries placed on their dates.'
			},
			background: {
				type: 'number',
				value: 1,
				options: [0, 1, 2, 3],
				description: 'Background depth of the day cells from 1 to 3. 0 renders transparent, without background or borders.'
			},
			_open: {
				type: 'function',
				description: 'Called with { event, value } when an entry chip is opened.'
			}
		},
		render: function()
		{
			/* ===== STATE ===== */

			this.shift = 0;
			this.weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

			/* ===== DATA ===== */

			const stamp = (date) =>
			{
				return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
			};

			const base = () =>
			{
				if(/^\d{4}-\d{2}$/.test(this.month))
				{
					const [year, month] = this.month.split('-').map(Number);

					return new Date(year, month - 1, 1);
				}

				const now = new Date();

				return new Date(now.getFullYear(), now.getMonth(), 1);
			};

			this.Compute(() =>
			{
				const start = base();
				const current = new Date(start.getFullYear(), start.getMonth() + this.shift, 1);
				const map = {};

				for(const item of this.items)
				{
					if(!map[item.date])
					{
						map[item.date] = [];
					}

					map[item.date].push({ key: item.id, item, title: item.title, color: item.color ? item.color : 'brand' });
				}

				const cursor = new Date(current);
				cursor.setDate(1 - ((cursor.getDay() + 6) % 7));

				const today = stamp(new Date());
				const days = [];

				for(let index = 0; index < 42; index++)
				{
					const iso = stamp(cursor);
					const chips = map[iso] ? map[iso] : [];

					days.push({
						key: iso,
						number: cursor.getDate(),
						out: cursor.getMonth() !== current.getMonth(),
						today: iso === today,
						chips: chips.slice(0, 3),
						more: chips.length > 3 ? chips.length - 3 : 0
					});

					cursor.setDate(cursor.getDate() + 1);
				}

				this.days = days;
				this.label = current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
			});

			/* ===== HANDLERS ===== */

			this.previous = () =>
			{
				this.shift = this.shift - 1;
			};

			this.next = () =>
			{
				this.shift = this.shift + 1;
			};

			this.today = () =>
			{
				const from = base();
				const now = new Date();

				this.shift = (now.getFullYear() - from.getFullYear()) * 12 + now.getMonth() - from.getMonth();
			};

			this.open = (event, item) =>
			{
				if(this._open)
				{
					this._open({ event, value: item });
				}
			};

			/* ===== RENDER ===== */

			return /* html */ `
				<div :class="background || background === 0 ? 'box bg-' + background : 'box'">
					<div class="bar">
						<span class="label">{{ label }}</span>
						<span class="controls">
							<button type="button" ot-click="previous"><i>chevron_left</i></button>
							<button type="button" class="now" ot-click="today">Today</button>
							<button type="button" ot-click="next"><i>chevron_right</i></button>
						</span>
					</div>
					<div class="names">
						<span ot-for="name in weekdays" :ot-key="name">{{ name }}</span>
					</div>
					<div class="grid">
						<div ot-for="day in days" :ot-key="day.key" :class="'day' + (day.out ? ' out' : '') + (day.today ? ' today' : '')">
							<span class="number">{{ day.number }}</span>
							<span
								ot-for="chip in day.chips"
								:ot-key="chip.key"
								:class="'chip ' + chip.color"
								ot-click="({ event }) => open(event, chip.item)"
							>
								<span class="dot"></span>
								<span class="text">{{ chip.title }}</span>
							</span>
							<span ot-if="day.more" class="more">+{{ day.more }} more</span>
						</div>
					</div>
				</div>
			`;
		}
	});
});

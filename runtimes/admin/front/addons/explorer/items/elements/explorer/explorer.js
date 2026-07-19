elements.ItemAdd({
	id: 'explorer',
	icon: 'search',
	name: 'Explorer',
	description: 'Universal search over everything in the editor: applications, modes, pages, commands and settings.',
	category: 'Explorer',
	metadata: { addon: 'ui.explorer' },
	render: function()
	{
		this.query = '';
		this.groups = [];
		this.index = 0;
		this.total = 0;

		const refresh = () =>
		{
			let flat = 0;

			this.groups = ui.explorer.Fn('search', this.query).map((group) =>
			{
				group.results = group.results.map((entry) => ({ ...entry, flat: flat++ }));

				return group;
			});

			this.total = flat;
			this.index = 0;
		};

		refresh();

		this.OnMounted(() =>
		{
			const input = this.Element && this.Element.querySelector('input');

			input && input.focus();
		});

		this.input = ({ value }) =>
		{
			this.query = value;
			refresh();
		};

		this.run = (entry) =>
		{
			$ot.float.close();

			$ot.ui.explorer.run(entry.id);
		};

		this.scroll = () =>
		{
			if(!this.index)
			{
				this.Element.querySelector('.groups').scrollTop = 0;

				return;
			}

			const entry = this.Element.querySelectorAll('.entry')[this.index];

			if(entry)
			{
				entry.scrollIntoView({ block: 'nearest' });
			}
		};

		this.key = ({ event }) =>
		{
			if(event.key === 'ArrowDown' || event.key === 'ArrowUp')
			{
				event.preventDefault();
				this.index = Math.max(0, Math.min(this.total - 1, this.index + (event.key === 'ArrowDown' ? 1 : -1)));
				this.scroll();
			}

			if(event.key === 'Enter')
			{
				for(const group of this.groups)
				{
					const entry = group.results.find((result) => result.flat === this.index);

					if(entry)
					{
						return this.run(entry);
					}
				}
			}
		};

		return `
			<div class="box">
				<div class="field">
					<i>search</i>
					<input :value="query" spellcheck="false" placeholder="Search apps, modes, pages, commands, settings..." ot-input="input" ot-keydown="key">
					<kbd>esc</kbd>
				</div>
				<div class="groups ot-scrollbar">
					<div ot-for="group in groups" :ot-key="group.id" class="group">
						<div class="name">{{ group.group }}</div>
						<div ot-for="entry in group.results" :ot-key="entry.id" :class="'entry' + (entry.flat === index ? ' active' : '')" ot-click="run(entry)">
							<i>{{ entry.icon }}</i>
							<span class="label">{{ entry.label }}</span>
							<span class="hint ot-truncate">{{ entry.hint }}</span>
						</div>
					</div>
					<div ot-if="!groups.length && query" class="empty">Nothing matches.</div>
				</div>
				<div class="foot">
					<span class="tip"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
					<span class="tip"><kbd>↵</kbd> open</span>
					<span class="tip"><kbd>prefix:</kbd> narrow down</span>
				</div>
			</div>
		`;
	}
});

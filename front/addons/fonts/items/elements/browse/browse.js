elements.ItemAdd({
	id: 'fonts-browse',
	icon: 'font_download',
	name: 'Font Browser',
	description: 'Search and pick fonts from a curated library.',
	category: 'Fonts',
	author: 'OneType',
	config: {
		selected: {
			type: 'array',
			value: []
		},
		max: {
			type: 'number',
			value: 2
		},
		_change: {
			type: 'function'
		}
	},
	render: function()
	{
		this.results = [];
		this.search = '';
		this.loaded = {};

		this.load = (font) =>
		{
			if(this.loaded[font.slug])
			{
				return;
			}

			this.loaded[font.slug] = true;

			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://fonts.bunny.net/css?family=' + encodeURIComponent(font.name) + ':400,700';
			document.head.appendChild(link);
		};

		this.selected.forEach(font => this.load(font));

		this.fetch = async (search) =>
		{
			let query = fonts.Find().sort('name', 'asc').limit(14);

			if(search)
			{
				query = query.filter('name', '%' + search + '%', 'ILIKE');
			}
			else
			{
				query = query.filter('popular', true);
			}

			const items = await query.many();

			this.results = items.map(item => item.data);
			this.results.forEach(font => this.load(font));
		};
		this.fetch('');

		this.input = ({ value }) =>
		{
			this.search = value;
			this.fetch(value);
		};

		this.pick = (id) =>
		{
			const ids = this.selected.map(font => font.id);
			const index = ids.indexOf(id);

			if(index === -1)
			{
				if(ids.length >= this.max)
				{
					this.selected.shift();
				}

				const font = this.results.find(font => font.id === id);

				if(font)
				{
					this.selected.push(font);
				}
			}
			else
			{
				if(this.selected.length > 1)
				{
					this.selected.splice(index, 1);
				}
			}

			this.results = [...this.results];

			if(this._change)
			{
				this._change({ value: [...this.selected] });
			}
		};

		this.active = (id) =>
		{
			return this.selected.some(font => font.id === id);
		};

		return `
			<div class="holder">
				<div class="tags">
					<span ot-if="!selected.length" class="none">None selected</span>
					<span ot-for="font in selected" class="tag" :style="'font-family: ' + font.name">{{ font.name }}</span>
				</div>
				<e-form-input :value="search" placeholder="Search fonts..." icon="search" :variant="['bg-3', 'border']" :_input="input"></e-form-input>
				<div class="grid">
					<div ot-for="font in results" :class="'option' + (active(font.id) ? ' active' : '')" ot-click="pick(font.id)" :style="'font-family: ' + font.name">
						<span class="name">{{ font.name }}</span>
					</div>
				</div>
				<e-status-empty ot-if="search && !results.length" icon="search_off" title="No fonts found" :description="'No results for &quot;' + search + '&quot;'"></e-status-empty>
			</div>
		`;
	}
});

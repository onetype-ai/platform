elements.ItemAdd({
	id: 'extensions-browse',
	icon: 'extension',
	name: 'Extension Browser',
	description: 'Browse and pick extensions for a site.',
	category: 'Extensions',
	author: 'OneType',
	config: {
		selected: {
			type: 'array',
			value: []
		},
		_change: {
			type: 'function'
		}
	},
	render: function()
	{
		this.items = [];

		extensions.Find().sort('order', 'asc').many().then(results =>
		{
			this.items = results.map(item => item.data);
		});

		this.toggle = (id) =>
		{
			const ids = this.selected.map(item => item.id);
			const index = ids.indexOf(id);

			if(index === -1)
			{
				const item = this.items.find(item => item.id === id);

				if(item)
				{
					this.selected.push(item);
				}
			}
			else
			{
				this.selected.splice(index, 1);
			}

			this.items = [...this.items];

			if(this._change)
			{
				this._change({ value: [...this.selected] });
			}
		};

		this.active = (id) =>
		{
			return this.selected.some(item => item.id === id);
		};

		return `
			<div class="holder">
				<div ot-if="items.length" class="grid">
					<div ot-for="item in items" :class="'option' + (active(item.id) ? ' active' : '')" ot-click="toggle(item.id)">
						<i class="icon">{{ item.icon }}</i>
						<span class="label">{{ item.name }}</span>
					</div>
				</div>
				<e-status-empty ot-if="!items.length" icon="extension" title="No extensions" description="No extensions available."></e-status-empty>
			</div>
		`;
	}
});

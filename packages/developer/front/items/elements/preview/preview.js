elements.ItemAdd({
	id: 'developer-preview',
	icon: 'preview',
	name: 'Developer Preview',
	description: 'Live preview of one element on a canvas, or a grid overview of the whole library.',
	category: 'Developer',
	metadata: { addon: 'developer' },
	config: {
		element: {
			type: 'string',
			value: '',
			description: 'Id of the element to render.'
		},
		payload: {
			type: 'object',
			value: {},
			description: 'Prop overrides applied to the rendered element.'
		}
	},
	render: function()
	{
		this.Compute(() =>
		{
			this.groups = this.element ? [] : developer.Fn('list');
		});

		this.node = () =>
		{
			return elements.Render(this.element, { ...this.payload }).Element;
		};

		this.open = (item) =>
		{
			$ot.ui.layouts.data({ developerElement: item.id, developerProps: {} });
		};

		return `
			<div class="box">
				<div ot-if="element" class="stage">
					<div ot-node="node()" :ot-key="element + ':' + JSON.stringify(payload)"></div>
				</div>
				<div ot-if="!element" class="overview">
					<div ot-for="group in groups" :ot-key="group.category" class="group">
						<div class="label">{{ group.category }}</div>
						<div class="grid">
							<div ot-for="item in group.items" :ot-key="item.id">
								<div class="card" ot-click="open(item)">
									<i>{{ item.icon }}</i>
									<div class="name">{{ item.name }}</div>
									<div class="description">{{ item.description }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});

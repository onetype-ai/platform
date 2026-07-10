elements.ItemAdd({
	id: 'developer-element',
	icon: 'preview',
	name: 'Developer Element',
	description: 'Live preview canvas for a single element, with an empty state while nothing is selected.',
	category: 'Developer',
	metadata: { addon: 'developer' },
	config: {
		element: {
			type: 'string',
			value: '',
			description: 'Id of the element to render.'
		}
	},
	render: function()
	{
		this.node = () =>
		{
			return elements.Render(this.element, {}).Element;
		};

		return `
			<div class="box">
				<div ot-if="element" class="stage">
					<div ot-node="node()" :ot-key="element"></div>
				</div>
				<div ot-if="!element" class="empty">
					<e-status-empty
						icon="left_click"
						title="No element selected"
						description="Pick an element from the list on the left to preview it here."
					></e-status-empty>
				</div>
			</div>
		`;
	}
});

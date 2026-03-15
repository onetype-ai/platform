elements.ItemAdd({
	id: 'editor-canvas',
	icon: 'dashboard',
	name: 'Editor Canvas',
	description: 'Main editor canvas.',
	category: 'Editor',
	author: 'OneType',
	config: {},
	render: function()
	{
		this.zoom = 100;
		this.items = [];

		const init = () =>
		{
			this.items = Object.values(editor.canvas.Items())
				.filter(item => item.Get('active'))
				.sort((a, b) => a.Get('order') - b.Get('order'))
				.map(item => item.data);
		};

		const callback = (item) =>
		{
			if(item.addon.GetName() === 'editor.canvas')
			{
				init();
			}
		};

		init();

		this.On('@addon.item.added', callback);
		this.On('@addon.item.modified', callback);
		this.On('@addon.item.removed', callback);

		this.setZoom = (value) =>
		{
			this.zoom = Math.max(25, Math.min(200, value));
		};

		this.wheel = (event) =>
		{
			if(event.ctrlKey || event.metaKey)
			{
				event.preventDefault();

				const delta = event.deltaY > 0 ? -5 : 5;

				this.setZoom(this.zoom + delta);
			}
		};

		this.gridStyle = () =>
		{
			const s = 20 * (this.zoom / 100);

			return 'background-size: ' + s + 'px ' + s + 'px, ' + s + 'px ' + s + 'px, ' + (s * 5) + 'px ' + (s * 5) + 'px, ' + (s * 5) + 'px ' + (s * 5) + 'px;';
		};

		this.content = (item) =>
		{
			return editor.canvas.Render(item.id).Element;
		};

		return `
			<div class="holder">
				<div class="canvas">
					<div class="corner"></div>
					<e-editor-ruler direction="horizontal" :visible="true" :zoom="zoom" :scroll="0"></e-editor-ruler>
					<e-editor-ruler direction="vertical" :visible="true" :zoom="zoom" :scroll="0"></e-editor-ruler>
					<div class="area ot-scrollbar" :style="gridStyle()" ot-wheel.prevent="wheel">
						<div ot-if="items.length" class="viewports">
							<div ot-for="item in items">
								<e-editor-viewport :width="item.width || 1440" :zoom="zoom" :label="item.label || ''">
									<div slot="content" ot-node="content(item)"></div>
								</e-editor-viewport>
							</div>
						</div>
						<div ot-if="!items.length" class="viewports">
							<e-editor-viewport :width="1440" :zoom="zoom" label="No page selected">
								<div slot="content" class="empty">
									<i>description</i>
									<span>Select a page</span>
								</div>
							</e-editor-viewport>
						</div>
					</div>
				</div>
			</div>
		`;
	}
});

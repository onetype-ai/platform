onetype.AddonReady('elements', () => 
{
	elements.ItemAdd({
		id: 'editor-tabs',
		icon: 'tab',
		name: 'Editor Tabs',
		description: 'Side panel with tabbed content.',
		category: 'Editor',
		author: 'OneType',
		config: {
			position: {
				type: 'string',
				value: 'left',
				option: ['left', 'right']
			}
		},
		render: function()
		{
			this.items = [];

			const init = () =>
			{
				this.items = Object.values(editor.tabs.Items()).sort((a, b) => a.Get('order') - b.Get('order')).map((item) => item.data).filter(item => item.position === this.position);
			};

			const callback = (item) =>
			{
				if(item.addon.GetName() === 'editor.tabs')
				{
					init();
				}
			};

			init();

			this.On('@addon.item.added', callback);
			this.On('@addon.item.modified', callback);
			this.On('@addon.item.removed', callback);

			this.content = () =>
			{
				const item = this.items.find((item) => item.active && item.position === this.position);

				if(!item)
				{
					return elements.Render('status-empty', {title: ''}).Element;
				}

				return editor.tabs.Render(item.id).Element;
			}

			this.classes = (item) =>
			{
				return item.active ? 'tab active' : 'tab';
			};

			this.select = (item) => 
			{
				editor.tabs.Fn('activate', item.id);
			}

			return `
				<div :class="'holder ' + position">
					<div ot-if="items.length" class="header">
						<div ot-for="item in items">
							<div :class="classes(item)" :data-id="item.id" ot-click="select(item)">
								<i :ot-tooltip="!item.active ? item.title : null">{{ item.icon }}</i>
								<span ot-if="item.active">{{ item.title }}</span>
							</div>
						</div>
					</div>
					<div class="content">
						<div ot-node="content()"></div>
					</div>
				</div>
			`;
		}
	});
});


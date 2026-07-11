elements.ItemAdd({
	id: 'dock-bar',
	icon: 'dock_to_right',
	name: 'Dock Rail',
	description: 'Vertical rail that renders the dock items.',
	category: 'Dock',
	metadata: { addon: 'ui.dock' },
	render: function()
	{
		const refresh = () =>
		{
			const list = ui.dock.Fn('list');
			const open = list.find((item) => item.isOpen) || null;

			this.panel = {
				width: $ot.modules.settings.get('ui.dock.width', 380),
				min: 280,
				max: 640,
				onResize: (width) => $ot.modules.settings.set('ui.dock.width', width),
				onClose: () => $ot.ui.dock.close(),
				...(open?.panel || {})
			};

			this.items = list.map((item) => ({
				id: item.id,
				icon: item.icon,
				label: item.label,
				color: item.color,
				isActive: item.isActive,
				isOpen: item.isOpen,
				placement: item.position,
				badge: item.badge,
				render: item.render ? () => ui.dock.Render(item.id).Element : null,
				onClick: () =>
				{
					onetype.Emit('ui.dock.click', { id: item.id });

					if(item.render)
					{
						return item.isOpen ? $ot.ui.dock.close() : $ot.ui.dock.open(item.id);
					}

					item.onClick && item.onClick(item);
				}
			}));
		};

		refresh();

		this.On('@addon.item.added', (item) => item.addon.GetName() === 'ui.dock' && refresh());
		this.On('@addon.item.removed', (item) => item.addon.GetName() === 'ui.dock' && refresh());

		this.On('ui.dock.open', refresh);
		this.On('ui.dock.close', refresh);
		this.On('ui.apps.open', refresh);
		this.On('ui.apps.close', refresh);
		this.On('ui.modes.switch', refresh);
		this.On('projects.open', refresh);
		this.On('projects.close', refresh);

		return `<e-navigation-dock :items="items" :panel="panel"></e-navigation-dock>`;
	}
});

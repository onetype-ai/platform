onetype.AddonReady('ui.layouts', (layouts) =>
{
	layouts.Item({
		id: 'settings-sidebar',
		isActive: true,
		condition: { app: ['settings'] },
		zone: 'root',
		slot: 'left',
		render: function()
		{
			const data = $ot.ui.layouts.Fn('data');

			const build = () =>
			{
				const groups = $ot.modules.settings.Fn('groups', '').map((group) =>
				{
					return { icon: group.icon, label: group.label, value: 'group:' + group.id };
				});

				const scopes = Object.values($ot.modules.settings.Fn('scopes')).map((scope) =>
				{
					return { icon: scope.icon || 'category', label: scope.label, value: 'scope:' + scope.id };
				});

				const items = [{ label: 'Addons', items: groups }];

				if(scopes.length)
				{
					items.push({ label: 'Scopes', items: scopes });
				}

				return items;
			};

			this.items = build();

			this.active = data.scope ? 'scope:' + data.scope : (data.group ? 'group:' + data.group : this.items[0]?.items[0]?.value || '');

			this.On('@addon.item.added', (item) => item.addon.GetName() === 'modules.settings' && (this.items = build()));
			this.On('@addon.item.removed', (item) => item.addon.GetName() === 'modules.settings' && (this.items = build()));
			this.On('modules.settings.scope', () => { this.items = build(); });

			this.select = (event) =>
			{
				const value = event.value.value;
				const [kind, id] = value.split(':');

				this.active = value;

				$ot.ui.layouts.open('settings-content', kind === 'scope' ? { scope: id } : { group: id });
			};

			return `<e-admin-navigation-sidebar :items="items" :active="active" :_click="select"></e-admin-navigation-sidebar>`;
		}
	});
});

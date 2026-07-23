onetype.AddonReady('ui.layouts', (layouts) =>
{
    layouts.Item({
        id: 'platform.settings.sidebar',
        isActive: true,
        condition: { app: ['settings'] },
        zone: 'root',
        slot: 'left',
        render: function()
        {
            const data = $ot.ui.layouts.Fn('data');

            const build = () =>
            {
                const groups = platform.settings.Fn('get.groups', '').map((group) =>
                {
                    return { icon: group.icon, label: group.label, value: 'group:' + group.id };
                });

                const scopes = Object.values(platform.settings.Fn('get.scopes')).map((scope) =>
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

            this.On('@addon.item.added', (item) => item.addon.GetName() === 'platform.settings' && (this.items = build()));
            this.On('@addon.item.removed', (item) => item.addon.GetName() === 'platform.settings' && (this.items = build()));
            this.On('platform.settings.scope', () => { this.items = build(); });

            this.select = (event) =>
            {
                const value = event.value.value;
                const [kind, id] = value.split(':');

                this.active = value;

                $ot.ui.layouts.open('platform.settings.content', kind === 'scope' ? { scope: id } : { group: id });
            };

            return `<e-admin-navigation-sidebar :items="items" :active="active" :_click="select"></e-admin-navigation-sidebar>`;
        }
    });
});

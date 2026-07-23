onetype.AddonReady('elements', (elements) =>
{
    elements.Item({
        id: 'platform-shortcuts-panel',
        addon: 'platform.shortcuts',
        name: 'Shortcuts Panel',
        description: 'Every registered shortcut, grouped, with an enable toggle and key rebinding per row.',
        render: function()
        {
            this.recording = null;
            this.listener = null;
            this.query = '';

            const refresh = () =>
            {
                this.groups = platform.shortcuts.list(this.query);
            };

            refresh();

            this.On('@addon.item.added', (item) => item.addon.GetName() === 'shortcuts' && refresh());
            this.On('@addon.item.removed', (item) => item.addon.GetName() === 'shortcuts' && refresh());

            this.On('platform.shortcuts.toggle', refresh);
            this.On('platform.shortcuts.rebind', refresh);

            this.change = (row) =>
            {
                return ({ value }) =>
                {
                    this.cancel();

                    commands.Fn('run', 'shortcuts:toggle', { id: row.id, enabled: value });
                };
            };

            this.cancel = () =>
            {
                if(this.listener)
                {
                    window.removeEventListener('keydown', this.listener, true);
                    this.listener = null;
                }

                this.recording = null;
            };

            this.record = (row) =>
            {
                const repeated = this.recording === row.id;

                this.cancel();

                if(repeated)
                {
                    return;
                }

                this.recording = row.id;

                this.listener = (event) =>
                {
                    event.preventDefault();
                    event.stopPropagation();

                    if(event.key === 'Escape')
                    {
                        this.cancel();

                        return;
                    }

                    if(['Control', 'Alt', 'Shift', 'Meta'].includes(event.key))
                    {
                        return;
                    }

                    const combination = platform.shortcuts.parse(event);

                    this.cancel();

                    commands.Fn('run', 'shortcuts:rebind', { id: row.id, key: combination });
                };

                window.addEventListener('keydown', this.listener, true);
            };

            this.reset = (row) =>
            {
                this.cancel();

                commands.Fn('run', 'shortcuts:rebind', { id: row.id });
            };

            this.OnUnmounted(() => this.cancel());

            this.input = ({ value }) =>
            {
                this.query = value;
                refresh();
            };

            return `
                <div class="box">
                    <div class="finder">
                        <e-admin-form-input icon="search" placeholder="Search platform.shortcuts..." :value="query" :clearable="true" :background="3" :_input="input" :_change="input"></e-admin-form-input>
                    </div>
                    <div ot-if="!groups.length && query" class="blank">No shortcuts match "{{ query }}"</div>
                    <div ot-for="group in groups" :ot-key="group.name" class="group">
                        <div class="head">
                            <span class="title">{{ group.name }}</span>
                            <span class="count">{{ group.shortcuts.length }}</span>
                        </div>
                        <div ot-for="row in group.shortcuts" :ot-key="row.id + ':' + row.enabled" :class="row.enabled ? 'row' : 'row disabled'">
                            <div class="info">
                                <span class="name ot-truncate">{{ row.name }}</span>
                                <span ot-if="row.description" class="description">{{ row.description }}</span>
                            </div>
                            <span class="keys">
                                <i ot-if="row.custom" class="reset" :ot-tooltip="{ text: 'Restore default key', position: { x: 'center', y: 'top' } }" ot-click="reset(row)">history</i>
                                <kbd :class="recording === row.id ? 'recording' : (row.custom ? 'custom' : '')" :ot-tooltip="{ text: 'Click, then press the new keys', position: { x: 'center', y: 'top' } }" ot-click="record(row)">{{ recording === row.id ? 'Press keys' : row.key }}</kbd>
                            </span>
                            <e-admin-form-toggle :value="row.enabled" :_change="change(row)"></e-admin-form-toggle>
                        </div>
                    </div>
                </div>
            `;
        }
    });
});

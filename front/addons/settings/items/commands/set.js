onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'settings:set',
        addon: 'platform.settings',
        description: 'Set a setting value. Persists it through the setting storage, syncs the settings state and emits platform.settings.change. The value must match the setting control, string for input, number for number, boolean for toggle, one of the options for select, array for list.',
        exposed: true,
        in: {
            id: {
                type: 'string',
                required: true,
                description: 'ID of the setting to change. Must match a registered setting item.'
            },
            value: {
                type: 'any',
                required: true,
                description: 'New value for the setting. Validated against the setting control.'
            },
            instance: {
                type: 'string',
                description: 'Scope instance to write for, like a user id. Scoped settings without it write to the active instance.'
            }
        },
        out: {
            id: {
                type: 'string',
                description: 'ID of the setting that changed.'
            },
            value: {
                type: 'any',
                description: 'Value the setting now holds.'
            }
        },
        callback: function(properties, resolve)
        {
            const item = platform.settings.ItemGet(properties.id);

            if(!item)
            {
                return resolve(null, 'Setting ' + properties.id + ' not found.', 404);
            }

            const control = item.Get('type');
            const types = { input: 'string', toggle: 'boolean', transfer: 'array' };

            if(types[control])
            {
                try
                {
                    onetype.DataDefineOne(properties.value, { type: types[control], required: true });
                }
                catch(error)
                {
                    return resolve(null, 'Setting ' + properties.id + ' expects ' + types[control] + ': ' + error.message, 400);
                }
            }

            if(control === 'select' && Array.isArray(item.Get('options')))
            {
                const allowed = item.Get('options').map((option) => option && typeof option === 'object' ? option.value : option);

                if(!allowed.includes(properties.value))
                {
                    return resolve(null, 'Setting ' + properties.id + ' expects one of: ' + allowed.join(', ') + '.', 400);
                }
            }

            const scope = item.Get('scope');

            if(scope && !properties.instance && !platform.settings.Fn('get.active', scope))
            {
                return resolve(null, 'Setting ' + properties.id + ' is scoped to ' + scope + ', pass an instance.', 400);
            }

            platform.settings.set(properties.id, properties.value, properties.instance || null);

            const suffix = scope ? ' for ' + scope + ' ' + (properties.instance || platform.settings.Fn('get.active', scope)) : '';

            resolve({ id: properties.id, value: properties.value }, 'Setting ' + properties.id + suffix + ' set to ' + JSON.stringify(properties.value) + '.');
        }
    });
});

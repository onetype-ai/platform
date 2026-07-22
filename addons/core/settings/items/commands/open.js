onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'settings:open',
        addon: 'settings',
        description: 'Open settings in a side panel. Without input it shows everything searchable. Bind it to one group for a single addon, or to a scope and instance for the settings of one user, collection or similar.',
        exposed: true,
        in: {
            group: {
                type: 'string',
                description: 'Addon id to show only that group of settings.'
            },
            scope: {
                type: 'string',
                description: 'Scope id, like user. Combined with instance it shows the settings of that one instance.'
            },
            instance: {
                type: 'string',
                description: 'Scope instance id, like a user id. Locks the panel to that instance.'
            }
        },
        out: {
            title: {
                type: 'string',
                description: 'Title of the opened panel.'
            }
        },
        callback: function(properties, resolve)
        {
            let title = 'Settings';
            let description = '';

            if(properties.scope)
            {
                const scope = $ot.modules.settings.Fn('scopes')[properties.scope];

                if(!scope)
                {
                    return resolve(null, 'Scope ' + properties.scope + ' not found.', 404);
                }

                title = scope.label + ' settings';

                if(properties.instance)
                {
                    const options = typeof scope.options === 'function' ? scope.options() : scope.options || [];
                    const match = options.find((option) => option.value === properties.instance);

                    description = match ? match.label : properties.instance;
                }
            }
            else if(properties.group)
            {
                const group = $ot.modules.settings.Fn('groups', '').find((entry) => entry.id === properties.group);

                if(!group)
                {
                    return resolve(null, 'Settings group ' + properties.group + ' not found.', 404);
                }

                title = group.label + ' settings';
            }

            const attributes = [];

            properties.group && attributes.push('group="' + properties.group + '"');
            properties.scope && attributes.push('scope="' + properties.scope + '"');
            properties.instance && attributes.push('instance="' + properties.instance + '"');

            $ot.float.drawer({
                title,
                description,
                position: 'right',
                width: 'l',
                padding: 'none',
                content: '<e-settings-content ' + attributes.join(' ') + '></e-settings-content>'
            });

            resolve({ title }, title + (description ? ' for ' + description : '') + ' opened.');
        }
    });
});

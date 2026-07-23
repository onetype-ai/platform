onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'collaborators:leave',
        addon: 'platform.collaborators',
        description: 'Leave the editor. The avatar and the cursor of the collaborator disappear.',
        exposed: true,
        in: {
            id: {
                type: 'string',
                required: true,
                description: 'ID of the collaborator that leaves.'
            }
        },
        out: {
            id: {
                type: 'string',
                description: 'ID of the collaborator that left.'
            }
        },
        callback: function(properties, resolve)
        {
            const item = platform.collaborators.ItemGet(properties.id);

            if(!item)
            {
                return resolve(null, 'Collaborator ' + properties.id + ' is not in the editor.', 404);
            }

            const name = item.Get('name');

            platform.collaborators.ItemRemove(properties.id);
            platform.collaborators.StoreDelete('cursor:' + properties.id);

            onetype.Emit('platform.collaborators.leave', { id: properties.id });

            resolve({ id: properties.id }, 'Collaborator ' + name + ' left the editor.');
        }
    });
});

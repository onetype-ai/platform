const runtimes = onetype.Addon('runtimes', (addon) =>
{
    addon.Field('id', {
        type: 'string',
        required: true,
        description: 'Stable text key like core or site. Domains map to a runtime by id, packages declare which runtimes they belong to.'
    });

    addon.Field('name', {
        type: 'string',
        required: true,
        description: 'Runtime name shown when a domain picks which runtime it serves.'
    });

    addon.Field('description', {
        type: 'string',
        description: 'Short one line description of what this runtime loads and what it is for.'
    });

    addon.Field('domain', {
        type: 'string',
        value: '',
        description: 'Hostname this runtime answers on, like admin.example.com. A star serves every domain that nothing else claims, empty answers nowhere.'
    });

    addon.Field('path', {
        type: 'string',
        value: '/',
        description: 'Base path the runtime lives under on its domain, like / or /admin. Requests outside it belong to another runtime.'
    });
});

export default runtimes;

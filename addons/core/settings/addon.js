$ot.modules.settings = onetype.Addon('modules.settings', (addon) =>
{
    addon.Field('id', {
        type: 'string',
        required: true,
        description: 'Unique setting id, like apps.active.'
    });

    addon.Field('label', {
        type: 'string',
        description: 'Human readable setting name, shown in the settings app.'
    });

    addon.Field('description', {
        type: 'string',
        description: 'What the setting controls.'
    });

    addon.Field('type', {
        type: 'string',
        options: ['input', 'toggle', 'select', 'transfer', 'table'],
        description: 'Control the setting renders as in the settings app. input is text, toggle on or off, select one of options, transfer picks a set out of options, table shows options as read only rows. Settings without a type hold internal state and stay out of the UI.'
    });

    addon.Field('options', {
        type: 'array|function',
        value: [],
        each: { type: 'any' },
        description: 'Source data for the control. Choices for select and transfer, rows for table. Plain values, objects, or a function returning them.'
    });

    addon.Field('columns', {
        type: 'array',
        value: [],
        each: { type: 'object' },
        description: 'Columns for the table control, with id, label, type and width per column.'
    });

    addon.Field('value', {
        type: 'any',
        description: 'Current value. Empty until something sets it.'
    });

    addon.Field('default', {
        type: 'any',
        description: 'Value used while nothing is set.'
    });

    addon.Field('scope', {
        type: 'string',
        description: 'Scope the setting belongs to, like user. Scoped settings hold one value per scope instance and resolve against the active instance. Without a scope the setting is global.'
    });

    addon.Field('storage', {
        type: 'string',
        value: 'local',
        options: ['local', 'database', 'custom'],
        description: 'Where the value is kept. local is the browser, database follows the account, custom means the owning addon keeps the data itself and settings only projects it.'
    });

    addon.Field('onChange', {
        type: 'function',
        description: 'Called with the new value and the setting item after the value changes, before $ot.modules.settings.change fires.'
    });

    addon.Field('metadata', {
        type: 'object',
        value: {},
        description: 'Ownership tags. The addon key names the addon the setting belongs to.'
    });
});

Object.assign($ot.modules.settings, {
    get: (id, fallback, instance) => $ot.modules.settings.Fn('get', id, fallback, instance),
    set: (id, value, instance) => $ot.modules.settings.Fn('set', id, value, instance)
});

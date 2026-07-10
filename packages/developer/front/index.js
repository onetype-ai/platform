const developer = onetype.Addon('developer', (addon) =>
{
	addon.addons = onetype.Addon('developer.addons', (addon) =>
	{
		addon.Field('id', {
			type: 'string',
			required: true,
			description: 'Unique entry id, the addon name it documents.'
		});

		addon.Field('group', {
			type: 'string',
			description: 'Group the addon belongs to, like system, ui or modules.'
		});

		addon.Field('name', {
			type: 'string',
			description: 'Display name of the addon.'
		});

		addon.Field('description', {
			type: 'string',
			description: 'What the addon does, one or two sentences.'
		});

		addon.Field('content', {
			type: 'string|function',
			description: 'Detail content shown when the addon is opened, markdown or a render function.'
		});
	});
});

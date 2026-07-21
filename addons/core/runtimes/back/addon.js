const runtimes = onetype.Addon('runtimes', (addon) =>
{
	addon.Field('slug', {
		type: 'string',
		required: true,
		description: 'Stable text key like core or site. Domains map to a runtime by slug, packages declare which runtimes they belong to.'
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
		description: 'Hostname this runtime answers on, like admin.example.com. Empty serves every domain that nothing else claims.'
	});

	addon.Field('modules', {
		type: 'array',
		value: [],
		each: {
			type: 'string',
			options: ['shortcuts', 'collaborators'],
			description: 'Name of a module folder under modules.'
		},
		description: 'Modules this runtime loads on top of its base, like shortcuts, sources or actions.'
	});

	addon.Field('path', {
		type: 'string',
		value: '/',
		description: 'Base path the runtime lives under on its domain, like / or /admin. Requests outside it belong to another runtime.'
	});
});

export default runtimes;

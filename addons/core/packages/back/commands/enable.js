import packages from '#packages/addon.js';

packages.CommandAdd({
	id: 'enable',
	description: 'Enable a package on the instance. The package loads on the next boot.',
	exposed: true,
	method: 'POST',
	endpoint: '/api/packages/:slug/enable',
	in: {
		slug: {
			type: 'string',
			required: true,
			description: 'Slug of the package to enable.'
		}
	},
	out: 'platform.package',
	callback: async function(properties, resolve)
	{
		const item = packages.one(properties.slug);

		if(!item)
		{
			return resolve(null, 'Package ' + properties.slug + ' not found.', 404);
		}

		if(item.Get('status') === 'enabled')
		{
			return resolve(null, 'Package ' + properties.slug + ' is already enabled.', 400);
		}

		packages.enable(item.Get('slug'));

		if(item.Get('status') === 'blocked')
		{
			return resolve(item.GetData(), 'Package ' + item.Get('slug') + ' is enabled but will not load. ' + item.Get('message'));
		}

		resolve(item.GetData(), 'Package ' + item.Get('slug') + ' is now enabled.');
	}
});

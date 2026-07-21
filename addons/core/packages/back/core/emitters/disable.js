onetype.EmitRegister('platform.packages.disable', {
	description: 'Fires after a package is disabled on the instance. The package stops loading on the next boot.',
	metadata: { addon: 'packages' },
	config: {
		slug: {
			type: 'string',
			description: 'Slug of the package that was disabled.'
		}
	}
});

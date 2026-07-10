import onetype from '@onetype/framework';

const config = onetype.Addon('config', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		description: 'Item id, always kernel since there is a single config item for the kernel.'
	});

	addon.Field('version', {
		type: 'string',
		required: true,
		description: 'Semver version of the core this container runs.'
	});

	addon.Field('domains', {
		type: 'object',
		value: {},
		required: true,
		description: 'Map of host to runtime slug. The Host header of each request picks which runtime is served.'
	});
});

export default config;

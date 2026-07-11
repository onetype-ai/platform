import onetype from '@onetype/framework';

const types = onetype.Addon('collections.types', (addon) =>
{
	addon.Field('id', {
		type: 'string',
		required: true,
		description: 'Type key used as the second argument of Field, like text, richtext or reference.'
	});

	addon.Field('name', {
		type: 'string',
		required: true,
		description: 'Display name shown in the field palette.'
	});

	addon.Field('icon', {
		type: 'string',
		required: true,
		description: 'Material Symbols icon name shown in the field palette.'
	});

	addon.Field('group', {
		type: 'string',
		required: true,
		options: ['text', 'numbers', 'content', 'structure', 'relations'],
		description: 'Palette group the type belongs to.'
	});

	addon.Field('type', {
		type: 'string',
		required: true,
		options: ['string', 'number', 'boolean', 'date', 'object', 'array', 'reference'],
		description: 'Storage type the engine maps the field to: scalars can take a slot column, object and array live in the document.'
	});

	addon.Field('slot', {
		type: 'boolean',
		value: true,
		description: 'Whether the field competes for a slot column. Long content like richtext skips slots and lives in the document.'
	});
});

export default types;

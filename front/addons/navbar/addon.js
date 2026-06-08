const navbar = onetype.Addon('navbar', (addon) =>
{
	addon.Field('id', ['string|number', null, true]);
	addon.Field('order', ['number', 1]);
	addon.Field('active', ['boolean', true]);
	addon.Field('app', ['array', []]);
	addon.Field('mode', ['array', []]);
	addon.Field('position', {
		type: 'string',
		required: true,
		options: ['left', 'center', 'right']
	});
	addon.Field('type', {
		type: 'string',
		value: 'default',
		options: ['default', 'dropdown', 'popup']
	});
	addon.Field('icon', ['string', null]);
	addon.Field('label', ['string', null]);
	addon.Field('tooltip', ['string', null]);
	addon.Field('selected', ['boolean', false]);
	addon.Field('onClick', ['function', null]);
	addon.Field('config', ['object', {}]);
	addon.Field('data', ['object', {}]);
	addon.Field('render', ['string|function', null]);
});

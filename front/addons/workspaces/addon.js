const workspaces = onetype.Addon('workspaces', (addon) =>
{
	addon.Field('id', ['string', null, true]);
	addon.Field('name', ['string', null, true]);
	addon.Field('icon', ['string', null]);
});

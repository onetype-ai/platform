import onetype from '@onetype/framework';
import collections from '#shared/system/collections/addon.js';

/* Materialize a collection definition into a live runtime addon (Table + Field +
   Versions + Translations). database auto-sync then creates/updates the real table.
   Idempotent: onetype.Addon reuses by name, so calling again re-applies the schema.
   The addon name embeds the slug so version/translation rows partition by collection. */

collections.Fn('materialize', function(definition)
{
	const types = onetype.AddonGet('collections.types');

	return onetype.Addon('collection:' + definition.slug, (addon) =>
	{
		addon.Field('id', ['string']);
		addon.Field('team_id', { type: 'string' }, null, null, true);
		addon.Field('site_id', { type: 'string' }, null, null, true);

		for(const field of definition.fields)
		{
			const type = types.ItemGet(field.type);
			const define = type ? [...type.Get('define')] : ['string'];

			addon.Field(field.name, define);
		}

		addon.Field('created_at', ['string']);
		addon.Field('updated_at', ['string']);
		addon.Field('deleted_at', ['string']);

		addon.Table('collection_' + definition.slug);
		addon.Versions('*');

		const translatable = definition.fields.filter((field) => field.translatable).map((field) => field.name);

		if(translatable.length)
		{
			addon.Translations(translatable);
		}
	});
});

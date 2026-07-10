import commands from '@onetype/framework/commands';
import collections from '#shared/system/collections/addon.js';

commands.Item({
	id: 'collections:items:list',
	exposed: true,
	method: 'GET',
	endpoint: '/api/collections/:slug/items',
	description: 'List items in a collection, with filters, sort, pagination and language.',
	in: {
		slug: ['string', null, true],
		filters: { type: 'array', value: [], each: { type: 'object', config: 'database.filter' } },
		page: ['number', 1],
		limit: ['number', 10],
		sort_field: ['string'],
		sort_direction: ['string', 'DESC']
	},
	out: {
		items: { type: 'array', value: [], each: { type: 'object' } },
		total: ['number', 0, true],
		page: ['number', 1, true],
		limit: ['number', 10, true]
	},
	callback: async function(properties, resolve)
	{
		if(!this.http.state.user)
		{
			return resolve(null, 'Login required.', 401);
		}

		const team = this.http.state.user.team.id;
		const addon = await collections.Fn('addon', properties.slug, team);

		if(!addon)
		{
			return resolve(null, 'Collection "' + properties.slug + '" not found.', 404);
		}

		const context = { language: this.http.state.language || null, languages: this.http.state.languages || null };
		const scope = () => addon.Find(context).filter('team_id', team);

		const query = scope();

		for(const filter of properties.filters || [])
		{
			query.filter(filter.field, filter.value, filter.operator);
		}

		query.sort(properties.sort_field || 'id', properties.sort_direction || 'DESC').limit(properties.limit).page(properties.page);

		const [items, total] = await Promise.all([query.many(), scope().count()]);

		resolve({ items: items.map((item) => item.GetData()), total, page: properties.page, limit: properties.limit });
	}
});

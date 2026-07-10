import commands from '@onetype/framework/commands';
import collections from '#shared/system/collections/addon.js';

commands.Item({
	id: 'collections:list',
	exposed: true,
	method: 'GET',
	endpoint: '/api/collections',
	description: 'List the team\'s collection definitions.',
	in: 'database.query',
	out: {
		items: { type: 'array', value: [], each: { type: 'object', config: 'collection' } },
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
		const scope = () => collections.Find().filter('team_id', team).filter('deleted_at', null, 'NULL');

		const query = scope();

		for(const filter of properties.filters || [])
		{
			query.filter(filter.field, filter.value, filter.operator);
		}

		query.sort(properties.sort_field || 'name', properties.sort_direction || 'ASC').limit(properties.limit).page(properties.page);

		const [items, total] = await Promise.all([query.many(), scope().count()]);

		resolve({ items: items.map((item) => item.GetData()), total, page: properties.page, limit: properties.limit });
	}
});

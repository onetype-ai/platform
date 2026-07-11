import collections from '../addon.js';
import types from '../types.js';

const POOLS = {
	string: ['t1', 't2', 't3'],
	number: ['n1', 'n2'],
	date: ['d1'],
	reference: ['r1', 'r2'],
	boolean: ['b1']
};

collections.Fn('slots', function(fields)
{
	const pools = {};
	const slots = {};

	for(const [type, list] of Object.entries(POOLS))
	{
		pools[type] = [...list];
	}

	for(const field of fields)
	{
		const type = types.ItemGet(field.type);

		if(!type || !type.Get('slot'))
		{
			continue;
		}

		const pool = pools[type.Get('type')];

		if(pool && pool.length)
		{
			slots[field.name] = pool.shift();
		}
	}

	return slots;
});

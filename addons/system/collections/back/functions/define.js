import collections from '../addon.js';
import types from '../types.js';

const STORAGE = {
	string: 'string',
	number: 'number',
	boolean: 'boolean',
	date: 'string',
	object: 'object',
	array: 'array',
	reference: 'number'
};

collections.Fn('define', function(field, slot)
{
	const storage = types.ItemGet(field.type).Get('type');
	const define = { type: STORAGE[storage] };
	const metadata = {};

	if(field.value !== null && field.value !== undefined)
	{
		define.value = field.value;
	}

	if(field.required)
	{
		define.required = true;
	}

	if(field.description)
	{
		define.description = field.description;
	}

	if(storage === 'date')
	{
		metadata.cast = 'date';
	}

	if(slot)
	{
		metadata.column = slot;
	}

	if(Object.keys(metadata).length)
	{
		define.metadata = metadata;
	}

	return define;
});

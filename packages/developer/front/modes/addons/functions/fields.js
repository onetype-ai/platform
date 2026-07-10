developer.Fn('addons.fields', function(id)
{
	const addon = onetype.Addons()[id];

	if(!addon)
	{
		return [];
	}

	const config = {};

	for(const field of Object.values(addon.fields.data))
	{
		if(field.define && typeof field.define === 'object' && !Array.isArray(field.define))
		{
			config[field.name] = field.define;
		}
		else
		{
			config[field.name] = {};
		}
	}

	return onetype.DataDescribe(config);
});
